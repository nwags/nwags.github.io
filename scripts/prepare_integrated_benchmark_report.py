#!/usr/bin/env python3
"""Prepare an unpublished website candidate from a hash-pinned review report.

This consumes accepted scientific evidence; it never runs a benchmark, reads
credentials, connects to a DB, commits, pushes, or publishes. The report remains
a review draft. --check compares expected bytes without writing site files.
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import html
import io
import json
import re
import subprocess
import zipfile
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

BASE = "79f790fdd9067e33a29e0409c15f8890068ff22d"
AUTHORITY = "results/phase3/reporting/phase3_current_reviewed_comparison_20260825.json"
MANUSCRIPT = "INTEGRATED_FINAL_REPORT_REVISED_20261027.md"
PDF = "CLAUDE_CODE_BACKEND_BENCHMARK_REVISED_REVIEW_20261027.pdf"
MANUSCRIPT_SHA = "f2666d148222872835652e43f8c7b66e560971be7148d249ea9dc6bb3dc1630e"
PDF_SHA = "6b16e3ce4f1ad741fd06930dc884f3b2604efc9b5b00f4036c1d3c2cb5cc1442"
DATA_FILES = [
    "arm_comparison.csv", "cost_chronology.csv", "task_profiles.csv", "task_family_profiles.csv",
    "failure_composition_by_arm.csv", "output_tokens_by_outcome.csv", "token_usage_scopes.csv",
    "thinking_event_metadata_by_arm.csv", "retained_configuration_by_arm.csv", "evidence_claim_matrix.csv",
    "tested_not_tested_matrix.csv", "dashboard_surface_review.csv", "source_inventory.csv",
    "source_reference_map.json", "validation_summary.json", "revision_analysis_summary.json",
    "exact_reviewed_trial_membership.csv", "phase3-core_derived_membership_manifest.json",
    "phase3-extended_derived_membership_manifest.json",
]


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read_rows(path: Path) -> list[dict]:
    with path.open(newline="") as f:
        return list(csv.DictReader(f))


def money(value: str | Decimal) -> str:
    return "$" + format(Decimal(value).quantize(Decimal(".01"), rounding=ROUND_HALF_UP), ",.2f")


def build(report: Path, benchmark: Path, site: Path) -> dict[str, bytes]:
    if subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=benchmark, text=True).strip() != BASE:
        raise ValueError("Benchmark HEAD differs from the reviewed baseline")
    if subprocess.check_output(["git", "diff", "HEAD", "--name-only"], cwd=benchmark, text=True).strip():
        raise ValueError("Tracked benchmark source has local changes")
    text = (report / MANUSCRIPT).read_text()
    pdf = (report / "output/pdf" / PDF).read_bytes()
    if digest(text.encode()) != MANUSCRIPT_SHA or digest(pdf) != PDF_SHA:
        raise ValueError("Review manuscript/PDF changed; review and update pins explicitly")
    root = report.parents[2]
    for row in read_rows(report / "PACKAGE_CONTENTS_SHA256.csv"):
        p = root / row["repository_relative_path"]
        if digest(p.read_bytes()) != row["sha256"]:
            raise ValueError(f"Review package fingerprint changed: {p.name}")

    data = json.loads((site / "docs/coding-agent-benchmark/public-benchmark-data.json").read_text())
    if data["generatedFrom"]["commit"] != BASE or data["generatedFrom"]["authorityPath"] != AUTHORITY:
        raise ValueError("Website's scientific authority is not the pinned V4 source")
    arms = read_rows(report / "validation/arm_comparison.csv")
    public = {a["armId"]: a for a in data["arms"]}
    if len(arms) != 16 or len(public) != 16 or {r["arm_id"] for r in arms} != set(public):
        raise ValueError("Unexpected arm cardinality")
    for row in arms:
        a = public[row["arm_id"]]
        if (int(row["raw_successes"]) != a["successCount"] or int(row["clean_successes"]) != a["cleanSuccessCount"]
                or Decimal(row["selected_cost_usd"]) != Decimal(a["selectedCostUsd"])
                or row["selected_relation"] != a["selectedCostRelation"]):
            raise ValueError(f"Report and website disagree: {row['arm_id']}")
    if sum(int(a["raw_successes"]) for a in arms) != 562 or sum(int(a["clean_successes"]) for a in arms) != 543:
        raise ValueError("Unexpected quality totals")
    selected_total = sum(Decimal(a["selected_cost_usd"]) for a in arms)
    if selected_total != Decimal("343.4494304572"):
        raise ValueError("Unexpected selected cost total")

    result = {}
    prefix = "docs/coding-agent-benchmark/report/"
    result[prefix + MANUSCRIPT] = text.encode()
    result[prefix + PDF] = pdf
    for p in sorted((report / "figures").glob("*.png")):
        result[prefix + "figures/" + p.name] = p.read_bytes()
    if len([p for p in result if "/figures/" in p]) != 7:
        raise ValueError("Expected all seven figures")

    # Fixed ZIP metadata makes the downloadable evidence bundle reproducible.
    bundle = io.BytesIO()
    with zipfile.ZipFile(bundle, "w", zipfile.ZIP_DEFLATED, compresslevel=8) as z:
        for name in DATA_FILES:
            raw = (report / "validation" / name).read_bytes()
            entry = zipfile.ZipInfo("validation/" + name, date_time=(1980, 1, 1, 0, 0, 0))
            entry.compress_type = zipfile.ZIP_DEFLATED
            z.writestr(entry, raw)
    result[prefix + "analysis-data.zip"] = bundle.getvalue()

    by_arm = {r["arm_id"]: r for r in arms}
    cards = []
    for aid, title, note in [
        ("router-deepseek-flash", "Value reference", "Qualified rate estimate; 40 of 60 attempts are both raw and clean successes."),
        ("router-kimi-k3", "Highest observed score", "Qualified estimate with incomplete dated-pricing provenance; timeout risk remains material."),
        ("router-gpt-5.5", "Exact billing and faster runtime", "Exact selected-run provider bill; shorter retained median runtime than Kimi K3."),
    ]:
        r = by_arm[aid]
        cards.append(f'<div class="finding"><h3>{title}</h3><strong>{html.escape(public[aid]["displayLabel"])}</strong>'
                     f'<p>{r["raw_successes"]}/60 raw; {r["clean_successes"]}/60 clean<br>{money(r["selected_cost_usd"])} for 60 trials<br>'
                     f'{float(r["median_retained_runtime_seconds"]):.1f} seconds median runtime</p><p>{note}</p></div>')
    rows = []
    for r in arms:
        a = public[r["arm_id"]]
        if r["provider_billed_cost_usd"]:
            basis = "Exact provider bill"
        elif r["selected_relation"] == "exact":
            basis = "Exact retained-usage reconstruction; no invoice"
        elif r["selected_relation"] == "lower_bound":
            basis = "Retained-usage lower bound"
        elif r["arm_id"] == "router-glm-5.1":
            basis = "Partial estimate; cache classification unresolved"
        else:
            basis = "Qualified rate estimate"
        allocation = "Unavailable: provider aggregate" if r["outcome_allocation"] == "unavailable_provider_aggregate" else "Unavailable: no reviewed outcome join" if r["outcome_allocation"] == "unavailable_no_reviewed_outcome_join" else "Available under reviewed basis"
        rows.append(f'<tr data-arm="{r["arm_id"]}"><td class="model"><strong>{html.escape(a["displayLabel"])}</strong></td>'
                    f'<td>{html.escape(a["providerLabel"])}</td><td class="numeric">{r["raw_successes"]}</td><td class="numeric">{r["clean_successes"]}</td>'
                    f'<td class="numeric">{money(r["selected_cost_usd"])}</td><td class="numeric">{money(r["cost_per_clean_success_ratio_usd"])}</td>'
                    f'<td class="evidence"><span class="relation {r["selected_relation"]}">{basis}</span></td><td class="evidence">{allocation}</td></tr>')
    stats = "".join(f'<div class="stat"><strong>{number}</strong><span>{label}</span></div>' for number, label in [
        (16, "extended arms"), (960, "selected trials"), (562, "raw successes"), (543, "clean successes")])
    summary = (site / "scripts/templates/benchmark-summary.html").read_text()
    for key, value in {"scope_stats": stats, "finding_cards": "".join(cards), "arm_rows": "".join(rows),
                       "selected_total": money(selected_total), "pdf_name": PDF, "manuscript_name": MANUSCRIPT}.items():
        summary = summary.replace("{{" + key + "}}", value)
    if "{{" in summary:
        raise ValueError("Unresolved summary template field")
    summary = re.sub(r'(<img\b[^>]*\bsrc="([^"]+)"[^>]*>)', r'<a href="\2">\1</a>', summary)
    result["docs/coding-agent-benchmark/index.html"] = summary.encode()

    # Disable dollar-delimited math so ordinary currency stays literal.
    body = subprocess.check_output(["pandoc", "--from=gfm-tex_math_dollars", "--to=html5", "--wrap=none"],
                                   input=text.split("\n", 1)[1], text=True)
    body = body.replace("<table>", '<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable report table"><table>').replace("</table>", "</table></div>")
    body = re.sub(r'<p><img (.*?) /></p>\s*<p><em>(Figure .*?)</em></p>',
                  r'<figure><img \1 loading="lazy" decoding="async"><figcaption>\2</figcaption></figure>', body, flags=re.S)
    body = re.sub(r'(<img\b[^>]*\bsrc="([^"]+)"[^>]*>)', r'<a href="\2">\1</a>', body)
    section_ids = {html.unescape(re.sub(r"<[^>]+>", "", title)): ident
                   for ident, title in re.findall(r'<h[23] id="([^"]+)">(.*?)</h[23]>', body)}
    for alias, heading in {
        "methods": "2. Methods",
        "task-family-profiles": "3.4 Task-family profiles",
        "token-categories-cache-effects-and-missing-generated-token-splits": "3.5 Token categories, cache effects, and missing generated-token splits",
        "challenges-to-the-findings-mitigations-and-residual-uncertainty": "5. Challenges to the findings, mitigations, and residual uncertainty",
    }.items():
        summary = summary.replace("report/index.html#" + alias, "report/index.html#" + section_ids[heading])
    result["docs/coding-agent-benchmark/index.html"] = summary.encode()
    toc = "".join(f'<a href="#{ident}">{title}</a>' for ident, title in re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', body))
    full = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Claude Code backend benchmark: integrated research report</title><meta name="description" content="Revised research report with methodology, seven figures, quality/cost/risk findings, token analysis, uncertainty, and evidence matrices.">
<link rel="stylesheet" href="../benchmark-report.css"></head><body><a class="skip-link" href="#main">Skip to report</a>
<header class="topbar"><div class="shell"><a class="brand" href="../../../index.html">Nicholas Wagner</a><nav aria-label="Report navigation"><a href="../index.html">Benchmark summary</a><a href="../phase3-selected-cost-frontier.html">Interactive frontier</a></nav></div></header>
<div class="shell hero paper"><p class="eyebrow">Integrated research report</p><h1>Claude Code backend benchmark: quality, cost, and operational risk</h1>
<p class="status"><strong>Revised review draft — October 27, 2026.</strong> Controller/human approval is pending. This prepared website candidate has not been published.</p>
<div class="links"><a href="{PDF}">Review PDF (28 pages)</a><a href="{MANUSCRIPT}">Authoritative Markdown</a><a href="analysis-data.zip">Analytical data ZIP</a><a href="report-manifest.json">Source fingerprints</a></div><p>Figures open at full size when selected.</p><nav class="contents" aria-label="Paper sections">{toc}</nav></div>
<main id="main" class="shell paper">{body}</main><footer class="footer"><div class="shell">Source manuscript and PDF fingerprints are recorded in the report manifest. Markdown controls. Historical evidence; no new benchmark execution.</div></footer></body></html>
'''
    result[prefix + "index.html"] = full.encode()
    manifest = {
        "schema": "integrated-benchmark-website-review-v1", "report_status": "revised_review_draft_pending_controller_human",
        "report_date": "2026-10-27", "website_preparation_date": "2026-10-29", "publication_authorized": False,
        "benchmark_commit": BASE, "authority_path": AUTHORITY, "authority_review_date": "2026-08-25",
        "source_report_sha256": MANUSCRIPT_SHA, "source_pdf_sha256": PDF_SHA, "pdf_pages": 28,
        "raw_successes": 562, "clean_successes": 543, "trials": 960, "arms": 16,
        "selected_cost_usd_source_precision": str(selected_total), "displayed_selected_cost_usd": money(selected_total),
        "selected_cost_qualification": "mixed bills/reconstructions/estimates/lower bounds; not an exact invoice total or global lower bound",
        "files": [{"path": path.removeprefix(prefix), "bytes": len(raw), "sha256": digest(raw)}
                  for path, raw in sorted(result.items()) if path.startswith(prefix)],
        "safety": "No paid runs, provider probes, DB/R2 writes, migrations, phase activation, push, merge, or publication.",
    }
    result[prefix + "report-manifest.json"] = (json.dumps(manifest, indent=2) + "\n").encode()
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report-dir", type=Path, required=True)
    parser.add_argument("--benchmark-repo", type=Path, required=True)
    parser.add_argument("--site-root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    expected = build(args.report_dir.resolve(), args.benchmark_repo.resolve(), args.site_root.resolve())
    drift = []
    for relative, raw in expected.items():
        p = args.site_root / relative
        if args.check:
            if not p.is_file() or p.read_bytes() != raw:
                drift.append(relative)
        else:
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes(raw)
    if drift:
        raise SystemExit("DRIFT: " + ", ".join(drift))
    print(f"{'Verified' if args.check else 'Prepared'} {len(expected)} local website files; review status retained.")


if __name__ == "__main__":
    main()
