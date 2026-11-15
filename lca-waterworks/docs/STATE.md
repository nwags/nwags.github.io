# Project state

## Current intent

- Project: Sample LCA WaterWorks BI; repository `nwags/nwags.github.io`, branch `main`.
- Existing routes: `/lca-waterworks/` is the JavaScript application; `/lca-waterworks-powerbi/` embeds the separate native Power BI report. Neither replaces the other.
- Planned third route: `/lca-waterworks-tableau/`. Tableau remains a local development edition; no Tableau Public URL or website activation is verified.
- JavaScript interface 0.3; reference model 0.2.0; scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Objective: useful, honestly scoped educational demonstrations, not production rate setting or claims of equivalent live optimizers in every BI platform.
- Native workbook/project files, extracts and private execution records remain outside this public repository. Only public/synthetic information is eligible for public BI publication.

## Latest milestone — Tableau T01c native acceptance

Evidence: the owner's Tableau Desktop Public Edition screenshots labeled November 14, 2026, inspected in the conversation. These are native observations supplied by the owner, not execution in the authoring environment.

- T01c opens with populated Overview and Financing dashboards using the two extracts from the owner's Tableau-generated seed workbook.
- The acceptance worksheet visibly displays all **33 entries as `PASS arithmetic only`**. The status bar confirms **33 marks / 33 rows by 1 column**. This is directly visible, unlike the earlier Power BI screenshot whose last column required owner confirmation.
- City Division / Central: $126.58 bill in 2031, 306.9 displayed minimum cash days, 2.33 minimum coverage, $262,634,500 five-year capital.
- Suburban Water / Additional borrowing, Overview: $38.30 bill, 206.1 displayed minimum cash days, 1.33 minimum coverage, $43,516,250 capital. The selected cash path separates from the Central reference while the bill paths coincide.
- The same borrowing selection is visible on Financing: $28,546,196 total borrowing, $0 grants, and $1,559,022 displayed reserve draw. Annual source/use charts render. The lower paired capital/funding chart is cut off in the screenshot, so complete inspection of that chart is not established.
- These observations verify the sampled division/scenario behavior and the native 33-case arithmetic worksheet. They do not establish financial-policy feasibility, authoritative LCA forecasts, Tableau Public publication, every visual, or measured interaction latency.

### Tableau scope and preserved checkpoint

T01c has two dashboards, thirteen supporting worksheets, three divisions, eleven prepared scenarios and five chart families: bill path, cash/target, annual sources, annual uses, and paired capital/funding. Comparison is against the same division's Central reference. No arbitrary financial recalculation or live optimizer is implemented.

T01c supersedes the unsuccessful T01/T01a/T01b opening attempts. The sequence addressed missing workbook/layout metadata, missing extracts, and incompatible legacy layout attributes after adopting the native seed's format declarations. Preserve the working T01c checkpoint and the owner's seed; do not restart source conversion or change the validated format manifest as a cosmetic fix.

### T01d presentation-only candidate

A separate `WaterWorks_Tableau_T01d.twbx` was generated as a conversation artifact, not committed to this public repository. SHA-256: `599af9bf0edfc12d21a0c68567fa0ea5d29f71e7601618767877ba27c1cc5a55`.

- Expanded two-line independence disclosure; visitor-facing scope description; shorter headings; explicit coverage-proxy wording; Amount (USD) display caption instead of Value.
- Full-text color keys replace cramped horizontal legends. The keys are display-only, not clickable highlight controls; the division/scenario parameter behavior is preserved. All 26 key entries are derived from the existing chart-data series and unchanged color mapping.
- More vertical space for keys and notes: Overview 1280 x 900, Financing 1280 x 1320.
- Both `.hyper` files and both CSVs are byte-for-byte identical to T01c. All 72 calculation elements, parameter values/domains, filters, worksheet encodings, source/extract definitions, format manifest and worksheet identifiers are preserved. Dashboard worksheet membership is unchanged.
- Observed authoring checks: ZIP integrity, XML parsing, packaged extract paths, allowed presentation-only XML differences, zone bounds/separation, 26 key mappings, and approximate font-fit checks for 35 text objects passed. Source-CSV reconciliation passed for 33 cases with maximum absolute remainder approximately $0.000000075.
- These are not native T01d rendering, binary-extract query, or complete Tableau-schema tests. Native T01d opening/rendering remains UNVERIFIED. The T01c native pass must not be relabeled as a native T01d execution.

No new data model, chart family, report publication or website change was made in this checkpoint. Remaining Tableau chart families, independent comparator selection, bill-component detail, historical/capital evidence, assumptions, glossary and audit/integration presentation remain planned. This local two-dashboard foundation is not silently considered full parity with Power BI or JavaScript.

## Existing public Power BI and homepage milestones

The owner supplied the Microsoft-generated Publish-to-web iframe after the public-publication success dialog. The companion uses that exact URL and `pageName=Overview`. The earlier tenant-administration blocker is superseded. No tenant credentials, DNS challenges or administrator-session details are stored here.

- Companion integration commit: `a8418fb382cf8ce4b46d8698933dce3a8b929383`. GitHub Pages build/deploy jobs for run `43632052719` were observed successful in the earlier session.
- Homepage update commit: `a4b4660f474e262a31fe48f60599ca4ef2ffc96b`. The WaterWorks card has separate stacked JavaScript and embedded-Power-BI links, both marked Online; stale pending-embed wording was removed. Pages build/deploy jobs for run `43642918489` were observed successful in that session.
- The owner subsequently described the result as good. This is owner feedback, not an independent end-to-end anonymous report-interaction test.
- Live repository main was rechecked at `a4b4660f474e262a31fe48f60599ca4ef2ffc96b` before this documentation update. No website, shared stylesheet or model change is part of this checkpoint.

### Companion implementation

The iframe is active, with full-width responsive sizing, full-screen support, an accessible title, usage guidance and direct-public-report fallback links. The pending placeholder/noindex were removed. The shared sticky independence notice is unchanged. Native report/direct/full-screen views rely on report disclosures; they cannot inherit the host's sticky banner.

The page explicitly describes prepared-scenario comparison, not arbitrary what-if calculation or live optimization, and identifies the evidence cutoff and fixed illustrative account. JavaScript calculations, original financial data, shared notice, Excel workbook and native report definitions were unchanged by host integration. No new chart family was introduced.

### Earlier host checks

Six HTML/embed contract tests passed: exact iframe/default page, fallback consistency, notice, scope/parallel-site wording, no host calculation scripts and accessible/unique identifiers. In-memory Chromium host-layout checks passed at six desktop/tablet/phone sizes, with no horizontal host overflow, a sticky notice and a visible keyboard skip link. The shared notice bytes matched Git blob `b83ef465086702e71ce67e9434e1fd9acb8c362e`.

Those offline checks used an `about:blank` iframe in the fixture and did not verify Microsoft's live visuals. External site/report requests were unavailable from that authoring environment. Independent anonymous loading, full report-page/slicer interaction and physical-device rendering remain unverified. Deployment, host layout and external-report rendering are distinct checks.

## Scenario Explorer v09 — arithmetic acceptance and scope

The separate prepared-scenario edition was authorized after v08 performance problems. Preserve the v08 development project, JavaScript controls and Excel files.

### Native and Service evidence

The owner's Desktop screenshot shows ten columns and 33 query rows completed in **307.3 milliseconds**. The owner confirmed all 33 final checks read **PASS arithmetic only**; that last column was outside the screenshot. Visible City/Wastewater central results match reference values to displayed precision.

The owner published v09 to Power BI Service and supplied a populated overview screenshot with ten page-navigation entries, Suburban Water/Central values, charts and independence/scope disclosures. A later Service refresh date does not change the evidence cutoff.

This establishes native selection/aggregation arithmetic, Service publication and public-code creation, not independent economic validity, live optimization, every scenario's feasibility, or a controlled performance benchmark. Complete page-by-page Service review and independent worker review are not claimed. No complete local builder execution log was supplied at the native acceptance checkpoint.

### Edition contents

Three divisions x eleven presets = 33 cases / 165 annual rows; ten report pages, 106 visuals, 27 tables and 89 measures. Ten chart families: bill, cash, sources, uses, paired capital/funding, comparison bills, comparison cash, capital program, historical customer-class volume and historical operating expense. Also bill components, financing bridges, evidence, assumptions, glossary and synthetic ERP specification.

The old `_Engine`, `_Result`, `_BestCandidate`, candidate search and arbitrary override tables are absent, not hidden. Fixed account: 5,000 monthly billable gallons equivalent, 5/8-inch meter and one EDU where applicable; common wastewater rate 1. Balance/flow summaries are explicit; ambiguous grand totals are suppressed.

The generic builder/data-free recipe remain under `../lca-waterworks-powerbi/tools/`; see the companion README for rebuild checksums. Native artifacts stay outside the repository. Reference identity: `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`. Inspected JavaScript engine blob: `71a6cc3a0b59589cb288eb073a654bb32551ca56`.

### Authoring checks retained

Equivalent local output: 6,600 comparisons across 33 cases/165 annual rows matched fresh frozen-reference simulation exactly. The 6,435 prepared metric records differed by at most approximately 9.1e-13; annual/period cash and capital bridges reconciled below $0.00001; 605 bill components matched 165 annual bills. Static checks covered 122 schema documents, 138 bindings and ten page layouts; no old engine/optimizer dependency or external data connection was found. These checks are separate from native and live validation.

## Earlier v07/v08 evidence retained

Owner screenshots/output established loading and M refresh after repairs to `version.json`, the rejected `Measures` table name and bare `text` types. All fifteen v07 pages were visually inspected; follow-up City screenshots cleared the apparent stale-division ledger issue.

The v08 repair ran on Windows: fifteen pages, nineteen tables updated, 95 original data tables preserved, 1,018 visuals updated and 1,085 JSON files parsed. Rows rendered and misleading totals were suppressed; internal PUB08 captions remained.

Combined v08 acceptance ran out of memory after approximately 226 seconds. Correct City/Central/Manual capital results of $262,634,500 took 69.525 seconds on the original path, 0.4416 seconds direct-engine, 59.479 seconds candidate-first and 62.8355 seconds with a query-scoped constant optimizer override. These were not controlled cache benchmarks. Neither rewrite was accepted; attribution of all delay to optimizer enumeration is unsupported. Full v08 reconciliation and native solver parity remain unverified and were not repaired by v09.

## JavaScript baseline and earlier checks

The existing application has separate fund ledgers, detailed 2027 bridges, component tariffs, detailed/condensed capital options, eleven presets, live assumptions and finite optimization, scenario JSON/CSV, financing charts, glossary and synthetic validation.

Recorded 2027 closing cash: $7,546,095 / $10,447,425 / $53,947,019. Detailed capital $361.312m versus condensed $355.712m, with the $5.6m City 2029 difference explicit. Debt, grants and capital receipts remain separate from recurring receipts; no interfund pooling.

Earlier checks: 38 numerical/chart tests, 33 presets, 286 local links, fingerprint/import rejection, cash identities, tariffs, funding caps, grant/debt timing and optimizer feasibility. Prior independent reviews remain in the review documents. These historical tests are not new native-Tableau/live-site verification; physical mobile verification was not claimed.

## Limitations and next objective

Cost-history blends and revenue exposure are judgments, not calibrated probabilities. Future grants, investment income, customer-class allocation, executed agreements, City add-on eligibility and financing approvals remain assumptions. Baseline debt principal after 2031 is not reconstructed. Detailed/condensed schedules conflict. Arithmetic or planning feasibility is not authority to adopt rates or borrow. Synthetic ERP documentation is not a live Munis integration.

Next: retain T01c as the native-tested Tableau baseline, inspect the presentation-only T01d copy including the entire financing chart, and extend the remaining Tableau views against the same snapshot. Validate added data/view mappings before Tableau Public publication. Activate only the planned third route after obtaining its actual public embed; do not mark an unpublished Tableau edition Online. Preserve both existing sites and the evidence cutoff.

Independent signed-out checks of existing embeds remain separate maintenance work. Revoking a provider's public code, not merely removing the host iframe, is required to withdraw its direct public access. Production work remains separate: finance-reviewed allocation, billing determinants, complete debt schedules, executed agreements and governed ERP extracts.
