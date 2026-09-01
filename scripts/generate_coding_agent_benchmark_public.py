#!/usr/bin/env python3
"""Generate public-safe Coding Agent Benchmark data and static preview.

The website is a read-only consumer of one pinned reviewed Phase 3 authority.
This script intentionally emits only fields needed by the public report/frontier.
"""
from __future__ import annotations

import argparse
import json
import math
import subprocess
import sys
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

BENCHMARK_COMMIT = "79f790fdd9067e33a29e0409c15f8890068ff22d"
AUTHORITY_PATH = "results/phase3/reporting/phase3_current_reviewed_comparison_20260825.json"
AUTHORITY_BLOB = "cab9730ac38cb10fe571004c13d82dcf193c393e"
AUTHORITY_SCHEMA = "phase3-current-reviewed-comparison-v4"
REVIEWED_AT = "2026-08-25"

DISPLAY_LABELS = {
    "router-anthropic-fable-5": "Claude Fable 5",
    "router-anthropic-haiku-sanitized": "Claude Haiku 4.5",
    "router-anthropic-opus": "Claude Opus 4.7",
    "router-anthropic-sonnet": "Claude Sonnet 4.6",
    "router-deepseek-flash": "DeepSeek V4 Flash",
    "router-deepseek-pro": "DeepSeek V4 Pro",
    "router-gemini-3.1-pro": "Gemini 3.1 Pro Preview",
    "router-gemini-flash": "Gemini 3.5 Flash",
    "router-glm-5.1": "GLM 5.1",
    "router-glm-5.2": "GLM 5.2",
    "router-gpt-5.4": "GPT-5.4",
    "router-gpt-5.5": "GPT-5.5",
    "router-grok-build-0.1": "Grok Build 0.1",
    "router-kimi-k2.6": "Kimi K2.6",
    "router-kimi-k3": "Kimi K3",
    "router-qwen-3.7-plus": "Qwen 3.7 Plus",
}

PROVIDER_LABELS = {
    "anthropic": "Anthropic",
    "deepseek": "DeepSeek",
    "google-gemini": "Google Gemini",
    "zai-glm": "Z.AI / GLM",
    "openai": "OpenAI",
    "xai": "xAI",
    "moonshot-kimi": "Moonshot / Kimi",
    "dashscope-qwen": "Alibaba / Qwen",
}


def git_text(repo: Path, spec: str) -> str:
    proc = subprocess.run(
        ["git", "-C", str(repo), "show", spec],
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return proc.stdout


def git_blob(repo: Path, spec: str) -> str:
    proc = subprocess.run(
        ["git", "-C", str(repo), "rev-parse", spec],
        check=True,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    return proc.stdout.strip()


def decimal_ratio(value: str, denominator: int) -> str | None:
    if denominator <= 0:
        return None
    result = (Decimal(value) / Decimal(denominator)).quantize(
        Decimal("0.00000001"), rounding=ROUND_HALF_UP
    )
    return format(result.normalize(), "f")


def build_public_data(authority: dict) -> dict:
    if authority.get("schemaVersion") != AUTHORITY_SCHEMA:
        raise ValueError(f"Unexpected authority schema: {authority.get('schemaVersion')!r}")
    if authority.get("reviewedAt") != REVIEWED_AT:
        raise ValueError(f"Unexpected reviewedAt: {authority.get('reviewedAt')!r}")

    scopes = authority["scopes"]
    core = scopes["phase3-core"]
    extended = scopes["phase3-extended"]
    if core["armCount"] != 15 or extended["armCount"] != 16:
        raise ValueError("Pinned scope cardinality changed")
    if core["trialCount"] != 900 or extended["trialCount"] != 960:
        raise ValueError("Pinned scope trial totals changed")

    core_ids = {arm["armId"] for arm in core["arms"]}
    rows = []
    for arm in extended["arms"]:
        arm_id = arm["armId"]
        selected_cost = arm.get("selectedCostUsd")
        trial_count = int(arm["trialCount"])
        clean_success_count = int(arm["cleanSuccessCount"])
        rows.append(
            {
                "armId": arm_id,
                "displayLabel": DISPLAY_LABELS.get(arm_id, arm_id),
                "backendModel": arm["backendModel"],
                "provider": arm["provider"],
                "providerLabel": PROVIDER_LABELS.get(arm["provider"], arm["provider"]),
                "trialCount": trial_count,
                "successCount": int(arm["successCount"]),
                "cleanSuccessCount": clean_success_count,
                "passRate": float(arm["passRate"]),
                "selectedCostUsd": selected_cost,
                "selectedCostRelation": arm.get("selectedCostRelation"),
                "selectedCostBasis": arm.get("selectedCostBasis"),
                "selectedCostConfidence": arm.get("selectedCostConfidence"),
                "selectedCostPerAttemptUsd": decimal_ratio(selected_cost, trial_count) if selected_cost else None,
                "selectedCostPerCleanSuccessUsd": decimal_ratio(selected_cost, clean_success_count) if selected_cost else None,
                "evidenceClass": arm.get("evidenceClass"),
                "providerBillingReconciliationStatus": arm.get("providerBillingReconciliationStatus"),
                "selectedTrialCostAllocationStatus": arm.get("selectedTrialCostAllocationStatus"),
                "selectedOutcomeCostAllocationStatus": arm.get("selectedOutcomeCostAllocationStatus"),
                "scopeMembership": ["phase3-core", "phase3-extended"] if arm_id in core_ids else ["phase3-extended"],
            }
        )

    rows.sort(key=lambda row: (-row["passRate"], Decimal(row["selectedCostUsd"] or "Infinity"), row["armId"]))
    return {
        "schemaVersion": "coding-agent-benchmark-public-v1",
        "generatedFrom": {
            "repository": "nwags/cc-deepseek-benchmark",
            "commit": BENCHMARK_COMMIT,
            "authorityPath": AUTHORITY_PATH,
            "authorityBlob": AUTHORITY_BLOB,
            "authoritySchema": AUTHORITY_SCHEMA,
            "reviewedAt": REVIEWED_AT,
        },
        "scopes": {
            "phase3-core": {
                "label": "Core reviewed scope",
                "armCount": core["armCount"],
                "trialCount": core["trialCount"],
                "successCount": core["successCount"],
            },
            "phase3-extended": {
                "label": "Extended reviewed scope",
                "armCount": extended["armCount"],
                "trialCount": extended["trialCount"],
                "successCount": extended["successCount"],
            },
        },
        "arms": rows,
    }


def relation_symbol(relation: str) -> str:
    return {"exact": "circle", "estimate": "diamond", "lower_bound": "triangle"}.get(relation, "circle")


def svg_preview(data: dict) -> str:
    rows = [r for r in data["arms"] if r["selectedCostUsd"] is not None]
    costs = [float(r["selectedCostUsd"]) for r in rows]
    rates = [float(r["passRate"]) for r in rows]
    lo_x, hi_x = math.log10(min(costs) * 0.75), math.log10(max(costs) * 1.25)
    lo_y, hi_y = max(0.15, min(rates) - 0.05), min(0.85, max(rates) + 0.04)
    W, H = 960, 520
    left, right, top, bottom = 80, 28, 42, 68
    pw, ph = W-left-right, H-top-bottom
    x = lambda c: left + (math.log10(c)-lo_x)/(hi_x-lo_x)*pw
    y = lambda r: top + (hi_y-r)/(hi_y-lo_y)*ph

    # Pareto frontier: increasing cost, keep strict quality improvements.
    frontier=[]
    best=-1.0
    for row in sorted(rows, key=lambda r: float(r["selectedCostUsd"])):
        if row["passRate"] > best:
            frontier.append(row); best=row["passRate"]

    provider_colors = {
        "anthropic":"#7c3aed","deepseek":"#0f766e","google-gemini":"#2563eb","zai-glm":"#ca8a04",
        "openai":"#111827","xai":"#64748b","moonshot-kimi":"#c2410c","dashscope-qwen":"#be123c"
    }
    out=[f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
         '<title id="title">Selected provider-aware cost versus pass rate</title>',
         '<desc id="desc">Extended reviewed Phase 3 scope. Marker shape shows exact, estimate, or lower-bound cost relation.</desc>',
         '<rect width="100%" height="100%" rx="18" fill="#fff"/>']
    for pct in (0.2,0.3,0.4,0.5,0.6,0.7,0.8):
        if lo_y <= pct <= hi_y:
            yy=y(pct); out.append(f'<line x1="{left}" y1="{yy:.1f}" x2="{W-right}" y2="{yy:.1f}" stroke="#e5e7eb"/>')
            out.append(f'<text x="{left-12}" y="{yy+4:.1f}" text-anchor="end" font-family="system-ui" font-size="12" fill="#64748b">{pct:.0%}</text>')
    for tick in (1,2,5,10,20,50):
        if min(costs)*0.75 <= tick <= max(costs)*1.25:
            xx=x(tick); out.append(f'<line x1="{xx:.1f}" y1="{top}" x2="{xx:.1f}" y2="{H-bottom}" stroke="#eef2f7"/>')
            out.append(f'<text x="{xx:.1f}" y="{H-bottom+28}" text-anchor="middle" font-family="system-ui" font-size="12" fill="#64748b">${tick}</text>')
    if len(frontier)>1:
        points=' '.join(f'{x(float(r["selectedCostUsd"])):.1f},{y(r["passRate"]):.1f}' for r in frontier)
        out.append(f'<polyline points="{points}" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    for row in rows:
        cx,cy=x(float(row["selectedCostUsd"])),y(row["passRate"]); color=provider_colors.get(row["provider"],"#475569")
        shape=relation_symbol(row["selectedCostRelation"])
        title=f'{row["displayLabel"]}: {row["passRate"]:.1%}, ${float(row["selectedCostUsd"]):.2f} {row["selectedCostRelation"].replace("_"," ")}'
        if shape=="circle":
            marker=f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="7" fill="{color}" stroke="#fff" stroke-width="2"/>'
        elif shape=="diamond":
            marker=f'<rect x="{cx-6:.1f}" y="{cy-6:.1f}" width="12" height="12" rx="1" transform="rotate(45 {cx:.1f} {cy:.1f})" fill="{color}" stroke="#fff" stroke-width="2"/>'
        else:
            marker=f'<path d="M {cx:.1f} {cy-8:.1f} L {cx+7:.1f} {cy+6:.1f} L {cx-7:.1f} {cy+6:.1f} Z" fill="{color}" stroke="#fff" stroke-width="2"/>'
        out.append(f'<g><title>{title}</title>{marker}</g>')
        if row in frontier:
            anchor = "start" if cx < W * 0.72 else "end"
            dx = 10 if anchor == "start" else -10
            out.append(f'<text x="{cx+dx:.1f}" y="{cy-10:.1f}" text-anchor="{anchor}" font-family="system-ui" font-size="11" font-weight="650" fill="#334155">{row["displayLabel"]}</text>')
    out += [
        f'<line x1="{left}" y1="{H-bottom}" x2="{W-right}" y2="{H-bottom}" stroke="#94a3b8"/>',
        f'<line x1="{left}" y1="{top}" x2="{left}" y2="{H-bottom}" stroke="#94a3b8"/>',
        f'<text x="{left+pw/2:.1f}" y="{H-16}" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="600" fill="#172033">Selected cost for 60 attempts (USD, log scale)</text>',
        f'<text x="18" y="{top+ph/2:.1f}" transform="rotate(-90 18 {top+ph/2:.1f})" text-anchor="middle" font-family="system-ui" font-size="14" font-weight="600" fill="#172033">Pass rate</text>',
        '<g transform="translate(610 22)" font-family="system-ui" font-size="11" fill="#475569">',
        '<circle cx="0" cy="0" r="5" fill="#334155"/><text x="10" y="4">Exact</text>',
        '<rect x="60" y="-5" width="10" height="10" transform="rotate(45 65 0)" fill="#334155"/><text x="76" y="4">Estimate</text>',
        '<path d="M 145 -6 L 151 5 L 139 5 Z" fill="#334155"/><text x="158" y="4">Lower bound</text>',
        '</g>',
        '</svg>'
    ]
    return '\n'.join(out)+"\n"


def write_or_check(path: Path, content: str, check: bool) -> bool:
    if check:
        actual = path.read_text() if path.exists() else None
        if actual != content:
            print(f"DRIFT: {path}", file=sys.stderr)
            return False
        return True
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    return True


def main() -> int:
    parser=argparse.ArgumentParser()
    parser.add_argument("--benchmark-repo", type=Path, required=True)
    parser.add_argument("--site-root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--check", action="store_true")
    args=parser.parse_args()
    spec=f"{BENCHMARK_COMMIT}:{AUTHORITY_PATH}"
    blob=git_blob(args.benchmark_repo, spec)
    if blob != AUTHORITY_BLOB:
        raise SystemExit(f"Pinned authority blob mismatch: expected {AUTHORITY_BLOB}, got {blob}")
    authority=json.loads(git_text(args.benchmark_repo, spec))
    public=build_public_data(authority)
    data_text=json.dumps(public, indent=2, sort_keys=False)+"\n"
    svg=svg_preview(public)
    ok=True
    ok &= write_or_check(args.site_root/"docs/coding-agent-benchmark/public-benchmark-data.json", data_text, args.check)
    ok &= write_or_check(args.site_root/"assets/coding-agent-benchmark/phase3-selected-cost-frontier-preview.svg", svg, args.check)
    return 0 if ok else 1

if __name__ == "__main__":
    raise SystemExit(main())
