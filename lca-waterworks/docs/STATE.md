# Project state

## Current intent

- Repository `nwags/nwags.github.io`, branch `main`; publication-copy baseline `38bb76b6e0ed9c6e3656f5d64863fd730dea218c`.
- Preserve three parallel public routes: `/lca-waterworks/`, `/lca-waterworks-powerbi/`, `/lca-waterworks-tableau/`.
- Reference model 0.2.0; JavaScript interface 0.3; horizon 2027–2031; evidence cutoff November 7, 2026.
- Owner priority: publish broad populated Tableau coverage before exhaustive presentation refinement. Opening and material calculation errors block publication; cosmetic issues are follow-up work.
- Native workbooks, extracts and private execution records remain outside this public repository. Only public/synthetic information belongs in public BI models.

## Latest milestone — expanded Tableau publication observed, November 16, 2026

Owner screenshots show the expanded workbook inside the existing companion website. This supersedes the earlier unopened-candidate and publication-pending states.

### Observed evidence

- Expanded tab navigation includes visible numbered tabs 01–08 and an overflow arrow. Not every tab fits in the screenshot.
- Hosted **01 Overview**, Suburban Water / Central: $38.30 monthly equivalent, 27.2 minimum cash days, 1.53 coverage proxy and $43,516,250 capital.
- Hosted **04 Customer bill detail**, City Division / Historical trend: $126.58 monthly equivalent, $379.73 quarterly and $1,518.92 annual, with populated quarterly component bars and exact invoice-line rows.
- Host and native independence notices are visible. Static screenshots alone do not demonstrate scroll behavior or every interaction.
- Earlier owner Desktop screenshots of T02a showed populated scenario comparison and customer detail, establishing native opening and these sampled calculations.

The current embed identity remains `WaterWorksOverviewandFinancing/01Overview`; it is not renamed or replaced. These observations establish expanded hosted delivery, not the exact overwrite sequence, remote binary checksum, every hosted tab or scenario, a fresh all-33 T02a audit run, or the sign-in state of these particular screenshots. No further upload or opening-repair cycle is required merely to repeat this milestone.

### Website reconciliation

Updated Tableau host headings and scope to **WaterWorks: Tableau Scenario Explorer** and **10 dashboards + arithmetic audit**. Removed the obsolete two-dashboard/planned-view wording. Overview still compares with Central; tab 03 permits an independent comparator. Homepage Tableau description now reflects the expanded edition.

Provider URLs, embed parameters, loader, CSS, shared notice and reciprocal navigation are unchanged. No Tableau workbook, extract, financial data, formulas, JavaScript application, Power BI report or Excel file changed. Updated host tests and roadmap. Check this commit's Pages deployment separately from the write and provider evidence.

### Observed authoring checks

- Reopened the exact delivered T02a: SHA-256 `460a82ac60c10b7f81b755d3118c97397d825fb853c41add312dc22a29cf8191`; ten dashboards, 37 worksheets and nineteen Hyper files.
- Edited HTML/test baselines match current repository Git blob hashes before modification.
- Eight Tableau host contracts and six Power BI embed contracts passed. The latter use the previously retrieved embed fixture; no new Power BI Service test is claimed.
- Additional guards preserve all provider links, parameters, scripts and the host disclosure.
- Six offline Chromium layout cases passed: Tableau host and homepage at 1440x1000, 768x1024 and 390x844. Checked overflow, host sticky notice and stacked homepage links. External resources were blocked; this did not run Tableau's remote report.
- No financial or native Tableau tests were rerun for this copy-only update. Current owner screenshots and earlier database checks remain distinct evidence.

## Expanded release scope

Ten dashboards: Overview; Financing; Scenario comparison; Customer bill detail; Capital plan reconciliation; Customers and history; Settings and evidence; Rules and agreements; Glossary and sources; Audit and integration. Standalone **Acceptance - all 33 cases** is the eleventh intended visible tab. Supporting worksheets remain hidden from ordinary navigation, not deleted. Hosted pages outside supplied screenshots remain uninspected here.

Three divisions x eleven scenarios x five years = 165 annual records. Overview uses Central; independent comparison is on tab 03. Bills distinguish quarterly invoice lines from annual/monthly equivalents. Historical service-area selection is separate from financial reporting division. No arbitrary financial recalculation, live optimizer or live Munis connection.

Retain the November 7 cutoff and fixed account: 5,000 monthly gallons equivalent, 5/8-inch meter, one EDU where applicable, common wastewater rate 1. Negative cash/days remain modeled shortfalls, not clipped to zero. Arithmetic reconciliation is not financial-policy feasibility or authority to adopt rates or borrow.

## Retained repair and data evidence

T02 failed native opening with one misplaced source-style block and fourteen unsupported text-wrap hints. T02a moved the block and removed those hints only. Nineteen extracts and nineteen CSVs, 345 calculation elements, parameters, filters and connections were preserved. Qualified schema comparison eliminated the fifteen reported defects but retained one diagnostic also present in native-working T01d; no clean full-schema certificate was claimed. Owner T02a screenshots subsequently established opening.

T02 creation queried all nineteen extracts: 4,684 added records matched generated records, all 33 annual/five-year cash/capital cases reconciled, and 605 components matched 165 annual bills. Detailed capital $361,312,000 versus condensed $355,712,000 preserves City 2029's $5,600,000 difference. These database checks do not validate every Tableau calculation/visual.

T01c/T01d native all-33 passes remain historical checks, not a fresh T02a audit execution. Preserve T01d and the seed as fallback. Full prior repair, tooling, model and deployment history remains at https://github.com/nwags/nwags.github.io/blob/38bb76b6e0ed9c6e3656f5d64863fd730dea218c/lca-waterworks/docs/STATE.md. Tooling branch `build/tableau-t02-20261115` stays separate from main.

## Next objective

Keep the expanded release available. Verify the copy-change deployment, then collect specific readability/navigation defects without restarting an exhaustive prepublication gate. Prioritize material errors; table widths, long labels, Overview whitespace and mobile layouts can be refined incrementally. Unsampled hosted pages/audit rows remain follow-up checks, not fabricated completed validation.

Keep the JavaScript/Power BI/Excel behavior and public provider identity stable. Production ERP, complete debt principal, internal billing determinants, executed agreements and governed operational analysis are separate work. Removing a website embed alone does not withdraw provider-side public access.
