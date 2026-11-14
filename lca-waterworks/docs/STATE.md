# Project state

## Current intent

- Project: Sample LCA WaterWorks BI; repository `nwags/nwags.github.io`, branch `main`.
- Parallel routes: `/lca-waterworks/` keeps the JavaScript application; `/lca-waterworks-powerbi/` hosts the separate native Power BI iframe. Neither replaces the other.
- JavaScript interface 0.3; reference model 0.2.0; scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Immediate objective: publish a useful, honestly scoped scenario-explorer prototype, not a production rate-setting system or a fully equivalent native optimizer.
- Native projects, loaded data and local execution records remain outside the public repository. Public/synthetic data only; no credentials, internal customer records or private supporting material.

## Latest milestone — Power BI Service publication, November 14, 2026

Evidence is user-reported publication success and screenshots of the report in Power BI Service, not a remotely operated Microsoft account:

- The user published `WaterWorks_ScenarioExplorer_v09` from Desktop and confirmed access to the report in Power BI Service from the Linux host.
- The Service overview screenshot shows ten page-navigation entries, populated Suburban Water / Central values ($38.30 monthly bill equivalent in 2031, 27.2 minimum cash days, 1.53x minimum coverage, $43.52m five-year capital), and rendered bill/cash charts.
- The native independence notice and the prepared-scenarios / not-live-optimization scope are visible in the Service report. The snapshot remains tied to the November 7 evidence cutoff; a later Service data-refresh date is not a new evidence cutoff.
- The attempt to create a public embed code produced: `Contact your admin to enable embed code creation`. The immediate blocker is permission to create new Publish-to-web codes in the Microsoft tenant. No admin rights, policy configuration, or changes to those settings have been verified.
- This is successful authenticated Service publication, NOT anonymous public embedding. The normal Service report URL is not a substitute for the generated public iframe URL.
- The screenshot establishes overview rendering, not complete Service interaction, mobile, performance, or all-page acceptance.

Next: an authorized tenant administrator must review the Publish-to-web setting and new-code creation permission, preferably scoped to a security group of approved publishers rather than the entire organization. Group scoping controls who may publish; it does not make the resulting report private. Do not weaken unrelated security settings, purchase capacity solely to address this message, or change the working financial model as a response to this administrative blocker.

No Microsoft tenant setting was changed by this documentation update. The companion iframe remains inactive pending the actual authorized public embed code. The JavaScript site and both website notices remain unchanged.

## Scenario Explorer v09 — native arithmetic acceptance

Following the decision to prioritize a bounded public prototype, the user authorized continuing with a separate prepared-scenario edition. The complete v08 development project is preserved; JavaScript controls and existing Excel files are unchanged.

Evidence is the user's Power BI Desktop screenshot and explicit follow-up, not a remotely executed Desktop session:

- `WaterWorks_ScenarioExplorer_v09` opened with populated model tables and query results.
- The Explorer acceptance query completed successfully with 10 columns and 33 rows in **307.3 milliseconds** on the observed run.
- The user confirmed that all 33 entries in the final column read **`PASS arithmetic only`**. The screenshot's rightmost check/residual columns were outside the visible area, so the all-row pass is user-confirmed rather than independently transcribed from that image.
- The visible City and Suburban Wastewater central-case values agree with the previously recorded reference results to displayed precision.
- This establishes native arithmetic acceptance for selection/aggregation of the prepared cases. It does not establish live optimization, arbitrary what-if calculation, financial-policy feasibility of every scenario, or independent economic validation.
- The 307.3 ms is one measured query duration, not a guarantee for every visual, every interaction, or published Service performance. No comparative cold/warm-cache benchmark is claimed.
- No local builder execution log was supplied in that checkpoint; the successful native query proves the candidate exists and has loaded data, not every individual builder safeguard.

Do not prolong v08 routing experiments as a release prerequisite for v09. Before anonymous public embedding, review disclosures and underlying model data for public suitability and confirm the exposed Service interactions.

### Implemented candidate

The generic local builder and data-free authoring recipe are under `../lca-waterworks-powerbi/tools/`. They create a NEW PBIP from the saved v08 public snapshot without modifying or executing the old financial engine. See the companion README for exact build/acceptance instructions and file checksums.

- Three divisions x eleven named presets = 33 cases / 165 annual rows.
- Ten native report pages, 106 visuals, 27 tables and 89 measures.
- All ten existing chart families retained, with customer bill components, financing bridges, source history, assumptions, glossary and synthetic integration specification.
- The old `_Engine`, `_Result`, `_BestCandidate`, candidate search and arbitrary override controls are ABSENT, not merely hidden.
- Runtime interaction selects/compares stored reference-model outputs and aggregates them natively. It does NOT perform live optimization or arbitrary new what-if calculation.
- Fixed illustrative account: 5,000 monthly billable gallons equivalent, 5/8-inch meter and 1 EDU where applicable; common wastewater rate 1. The account and prepared-scenario boundary are disclosed in the report.
- Friendly measure names, explicit balance/flow summaries, no ambiguous table grand totals, and independence notices on each native page. The native notices do not stick during scrolling; both website banners remain necessary.

Reference identity: `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`. The inspected JavaScript engine's Git blob `71a6cc3a0b59589cb288eb073a654bb32551ca56` matches the repository source at the baseline commit.

### Authoring checks previously performed

An equivalent output was generated locally, using the extracted original package and the frozen reference model:

- Fresh JavaScript simulation: 33 scenarios, 165 annual rows, 6,600 numeric comparisons; maximum difference zero.
- Stored prepared metrics: 6,435 comparisons with fresh reference-derived values; maximum difference approximately 9.1e-13.
- Annual source/use/cash identities, continuity and all period capital-funding/cash bridges passed; residuals below $0.00001.
- 605 reconstructed tariff bill-component rows match all 165 annual bills.
- 122 JSON/schema documents, 138 field bindings, 10 report-page bounds and layout intersections passed static checks.
- Structural inspection found no old live-engine/optimizer dependency or external data connection.

These equivalent-output checks were not native acceptance at the time they were recorded. Subsequent native query and Service publication evidence are recorded above. A complete v09 page-by-page Service interaction/performance review remains unverified; no independent worker review is claimed.

The acceptance query, `Explorer acceptance`, covers all 33 division/preset combinations with nonblank values and cash/capital residuals. Each residual must be within $0.01 of zero. This validates native filtering/aggregation of prepared outputs, not independent economic forecasts or live solver behavior.

### Publication boundary

The existing companion iframe remains hidden and has no report URL. Authenticated Power BI Service publication has succeeded, but anonymous public embedding is blocked pending administrator authorization. Only generic local authoring tools and documentation are committed publicly; no native project or source financial rows are added by this checkpoint.

## Earlier native v07/v08 evidence retained

User-supplied Windows output and screenshots established that the project loads and the M sources refresh after repairs to missing `version.json`, the rejected `Measures` name and invalid bare `text` types. All 15 v07 report pages were visually inspected. City-specific ledgers on pages 01 and 15 follow the division selection; the earlier apparent stale-division issue was not a confirmed persistent defect.

The v08 repair ran successfully on Windows: 15 pages, 19 tables changed, 95 data-table definitions preserved, 1,018 visuals updated, and 1,085 JSON files parsed. Native screenshots confirmed populated rows and hidden misleading totals, but internal `PUB08` captions and presentation issues remained.

The combined v08 acceptance query failed with insufficient memory after approximately 226 seconds. Individual City/Central/Manual capital queries returned $262,634,500 correctly, with these observed runtimes: original measure 69.525 seconds and about a minute on rerun; direct engine 0.4416 seconds; candidate-first routing 59.479 seconds; query-scoped constant optimizer override 62.8355 seconds. These were not controlled cache benchmarks. Neither routing rewrite was an accepted fix; attributing all delay to optimizer enumeration is unsupported.

The complete v08 native reconciliation and optimizer parity remain unverified. Its project and diagnostic queries are development artifacts, not silently corrected or published by v09.

## JavaScript baseline and prior observed checks

The unchanged JavaScript application provides three separate fund ledgers, detailed 2027 cash bridges, component tariffs, selectable detailed versus condensed capital, eleven presets, manual assumptions, finite optimization, scenario JSON/CSV, financing charts, glossary and synthetic ERP validation.

Recorded reference figures: 2027 closing unrestricted cash $7,546,095 / $10,447,425 / $53,947,019; detailed capital $361.312m versus condensed $355.712m. The $5.6m City 2029 discrepancy is disclosed. Grants, borrowing and capital receipts remain distinct from recurring receipts; no interfund pooling.

Earlier observed verification: 38 combined model/chart tests; 33 preset combinations; 286 local links; source fingerprint, import rejection, cash identities, tariff examples, financing caps, grant/debt timing and optimizer feasibility checks. Independent model reviews are retained under `reviews/`. These historical tests are not a new native v09 or live-site verification. Separate physical mobile verification was not claimed.

## Limitations and durable boundaries

The cost-history blend and revenue exposure are judgments, not calibrated probabilities. Future grant timing, investment income, class allocations, executed agreements, City add-on eligibility and financing approvals remain assumptions. Baseline debt principal after 2031 is not reconstructed. Detailed and condensed source schedules conflict. Numerical feasibility is not authority to adopt rates or borrow. Synthetic ERP documentation is not a live Munis integration.

No new chart family or financial assumption is introduced in v09. Source dates and model identity are preserved rather than presenting this snapshot as current operational data. Prepared scenarios that violate financial targets must remain visible as such.

## Next objective

Establish authorized tenant-administrator access and permit new public embed codes for the approved publisher scope. Review the public/synthetic boundary and remaining Service interactions, create the genuine Publish-to-web iframe URL, and activate only `/lca-waterworks-powerbi/`. Verify anonymous access and both site notices without replacing `/lca-waterworks/`. A normal authenticated Service URL or secure-embed URL is not an anonymous public replacement.

Production work remains a separate milestone: finance-reviewed allocations, billing determinants, executed agreements, full debt schedules and governed internal ERP extracts.
