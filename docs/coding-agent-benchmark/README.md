# Coding-agent benchmark website — November 24, 2026 research edition

Historical evidence is pinned to `nwags/cc-deepseek-benchmark@79f790fdd9067e33a29e0409c15f8890068ff22d`. The report summarizes the 16-arm, 960-trial reviewed population; the selected cost is a mixture of evidence classes, not an invoice total. No new trials or fresh live dashboard, DB, R2, private provider export or full raw-artifact verification are represented by this edition.

## Reproduce or verify

Use the pinned benchmark checkout with all additive review/edition directories, or its report-only descendant containing the original evidence unchanged. The report-only successor may add files in the five dated report directories; changes to original tracked evidence are refused. Python and Pandoc are required. The PDF is generated from the authoritative Markdown using the benchmark edition's `build_pdf.py`; the site builder verifies the actual approved PDF bytes rather than regenerating them. Regeneration may change binary fingerprints; inspect new output before changing pins.

```bash
python3 scripts/prepare_integrated_benchmark_release.py \
  --benchmark-repo /path/to/benchmark \
  --report-dir /path/to/benchmark/docs/reports/integrated-final-review-20261027 \
  --release-dir /path/to/benchmark/docs/reports/integrated-final-report-20261124 \
  --check
```

`--check` is read-only; omit it only to regenerate the website report. The summary template is `scripts/templates/benchmark-summary-release.html`. The previous October and November review generators are preserved for historical reproduction, not for overwriting this edition. The public JSON and analytical ZIP retain the reviewed evidence exactly. The report manifest records artifact hashes and the edition date; deployment/approval is a separate Git/PR decision.

The interactive chart consumes `public-benchmark-data.json`, distinguishes cost authority by marker shape and uses provider colors. The full paper and summary are static HTML. The canonical web résumé is `resume.html`; regenerate its PDF using `scripts/build_resume_pdf.py` with BeautifulSoup and WeasyPrint, then review the rendered result. No builder authorizes publication or executes benchmark operations.
