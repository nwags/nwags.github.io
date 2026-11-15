# Project state

## Current intent

- Project: Sample LCA WaterWorks BI; repository `nwags/nwags.github.io`, branch `main`.
- Existing routes: `/lca-waterworks/` is the JavaScript application; `/lca-waterworks-powerbi/` embeds the separate native Power BI report. Neither replaces the other.
- Third route: `/lca-waterworks-tableau/` now has an explicitly pending host shell. No Tableau Public URL has been supplied; no working Tableau embed or homepage Online label is claimed.
- JavaScript interface 0.3; reference model 0.2.0; scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Current priority: publish the working two-dashboard Tableau initial edition before expanding it. Additional chart families and evidence views remain planned, not first-release prerequisites. This is a staged release, not full cross-platform parity.
- Native workbook/project files, extracts and private execution records remain outside this public repository. Only public/synthetic information is eligible for public BI publication.

## Latest milestone — Tableau T01d native acceptance, November 15, 2026

Evidence: the owner's three new Tableau Desktop Public Edition screenshots labeled November 15, 2026. These are owner-supplied native observations, not a remotely executed Desktop session.

- The title bar identifies `WaterWorks_Tableau_T01d`.
- Its acceptance worksheet visibly displays **33 `PASS arithmetic only` entries**, with **33 marks / 33 rows by 1 column** in the status bar. This is native T01d evidence, superseding the earlier unverified candidate state.
- Suburban Water / Central Financing shows $43,516,250 five-year capital, $17,751,000 borrowing, $0 grants and $10,273,448 reserve draw (display-rounded).
- The complete paired capital/funding chart is now visible for 2027–2031. Annual sources and uses, the full-text color keys and the explanation of the capital/funding gap render.
- The two-line independence disclosure is readable in the financing-top screenshot. The bottom note distinguishes reserve draw/build and preserves the November 7 evidence cutoff.
- The new screenshots do not independently demonstrate T01d Overview rendering, new parameter changes, every case's visual appearance, or measured latency. T01c sampled control behavior remains earlier evidence, not a substitute for an unobserved T01d interaction.
- Arithmetic acceptance is not financial-policy feasibility, an authoritative LCA forecast, unrestricted what-if calculation or live optimization.

### Immediate publication path

The owner explicitly prioritized getting Tableau hosted alongside the other two editions sooner. Advance the current T01d workbook to Tableau Public as an **initial Overview and Financing edition**. Preserve T01c/T01d local checkpoints. Do not introduce another XML rebuild or data-source conversion as a release prerequisite.

Before uploading, set Suburban Water / Central on Overview and save. Supporting sheets used by the dashboards may be hidden, not deleted; retain `Acceptance - all 33 cases` as a visible audit. Publish through Tableau Public, verify Overview/Financing navigation and a representative parameter change in the browser, then obtain the actual Share embed code. Public-suitability applies to all underlying data, not only displayed marks.

The new host shell reuses the unchanged sticky independence stylesheet, links to the existing editions and model explanations, and labels the narrower scope. It has no fabricated provider URL, iframe or embed script; it retains noindex and is not advertised as Online. Activate it and add the third stacked homepage link only after receiving the real Tableau Public code and checking the published report. No native file, extract, credentials or source data is added by this host preparation.

Observed host checks: static checks of pending/noindex state, no invented embed/scripts, scope wording, parallel links, unique IDs and notice inclusion passed. In-memory Chromium checks at 1440x900, 768x1024, 390x844 and 320x568 found no horizontal host overflow, confirmed the notice remains at the top on scrolling, and a visible keyboard skip link. The test inlined the exact shared CSS (Git blob `b83ef465086702e71ce67e9434e1fd9acb8c362e`); it did not test a live Tableau report. Direct external requests were unavailable. Pages deployment must be checked separately for the resulting commit.

## Tableau baseline and authoring history

### T01c native checkpoint

The owner's November 14 screenshots showed T01c's populated Overview and Financing, plus all 33 arithmetic passes. City / Central: $126.58 bill, 306.9 minimum cash days, 2.33 coverage, $262,634,500 capital. Suburban Water / Additional borrowing: $38.30 bill, 206.1 minimum cash days, 1.33 coverage and $43,516,250 capital; Financing showed $28,546,196 borrowing, $0 grants and $1,559,022 reserve draw. The selected cash path separated from Central while bill paths coincided. Those screenshots established sampled division/scenario behavior, not timing or public publication.

The two-dashboard foundation contains thirteen supporting worksheets, three divisions, eleven prepared scenarios and five chart families: bill path, cash/target, annual sources, annual uses and paired capital/funding. Comparison is against the same division's Central reference. No arbitrary financial recalculation or live optimizer is implemented.

T01c superseded failed T01/T01a/T01b opening attempts: missing workbook/layout metadata, absent extracts and incompatible legacy layout attributes after adopting the owner's native seed format. Both extracts came from that Tableau-generated seed. Preserve its validated format and connection definitions.

### T01d authoring checks retained

Conversation artifact `WaterWorks_Tableau_T01d.twbx`, SHA-256 `599af9bf0edfc12d21a0c68567fa0ea5d29f71e7601618767877ba27c1cc5a55`, was a presentation-only revision, not committed here.

Changes: two-line disclosure; visitor-facing scope; shorter headings; coverage-proxy wording; Amount (USD) display caption; full-text display-only color keys; Overview 1280x900 and Financing 1280x1320. All 26 key entries used existing chart series and colors. Keys are not interactive highlight controls.

Both `.hyper` files and CSVs remained byte-identical to T01c. All 72 calculation elements, parameters, filters, worksheet encodings, source/extract definitions, format manifest and worksheet identifiers were preserved. Authoring checks covered ZIP/XML/path integrity, allowed presentation-only differences, zone bounds/separation, color-key mapping and approximate font fit for 35 text objects. Source-CSV arithmetic passed all 33 cases with maximum absolute remainder approximately $0.000000075. Those static checks are separate from the native T01d observations recorded above.

Remaining Tableau content: independent comparator selection, expanded comparison views, bill-component detail, historical/capital evidence, assumptions, glossary and integration presentation. Retain these as subsequent scope; do not imply the initial edition already contains them or that public release abandons them.

## Existing public Power BI and homepage milestones

The owner supplied the Microsoft-generated Publish-to-web iframe after the public-publication success dialog. The companion uses that exact URL and `pageName=Overview`. The earlier tenant-administration blocker is superseded. No tenant credentials, DNS challenges or administrator-session details are stored here.

- Companion integration commit: `a8418fb382cf8ce4b46d8698933dce3a8b929383`. Pages build/deploy jobs for run `43632052719` were observed successful in the earlier session.
- Homepage commit: `a4b4660f474e262a31fe48f60599ca4ef2ffc96b`. Separate stacked JavaScript/Power BI links are marked Online; stale pending wording removed. Pages build/deploy jobs for run `43642918489` were observed successful.
- The owner described the result as good; this is not an independent end-to-end anonymous interaction test.
- Current-turn baseline main was rechecked at `aad9d21b3dd1be21d24b12ec8e503964b2006bcd`. This checkpoint modifies only the new Tableau host and planning/state documentation; existing websites, shared CSS and models stay unchanged.

### Companion implementation and host checks

Active iframe, responsive sizing, full-screen support, accessible title, usage instructions and direct fallback links; pending placeholder/noindex removed. Shared sticky notice unchanged. Direct/full-screen report views rely on their own disclosures. Prepared-scenario limits, evidence cutoff and illustrative account are explicit. Host integration changed no financial calculations, data, Excel workbook or chart family.

Earlier six HTML/embed contract tests passed. In-memory Chromium at six desktop/tablet/phone sizes passed overflow, sticky notice and keyboard checks; shared notice matched Git blob `b83ef465086702e71ce67e9434e1fd9acb8c362e`. Those checks used about:blank in the test frame, not Microsoft's visuals. External requests were unavailable. Independent full signed-out report interaction and physical-device tests remain unverified. Deployment, host layout and external-report rendering are separate observations.

## Scenario Explorer v09 — arithmetic acceptance and scope

The separate prepared-scenario edition was authorized after v08 performance problems. Preserve v08, JavaScript controls and Excel files.

The owner's Desktop screenshot showed ten columns and 33 rows in **307.3 ms**; the owner confirmed all final checks **PASS arithmetic only** because that column was off-screen. Visible City/Wastewater central results matched reference values. Service screenshots subsequently showed a populated overview, ten page-navigation entries, charts and disclosures; public-code creation and website integration followed. A refresh date is not a revised evidence cutoff.

These establish native prepared-result arithmetic and publication, not independent economic validity, live optimization, every scenario's feasibility, or a controlled performance benchmark. Complete page-by-page Service review and independent v09 worker review are not claimed. No complete local builder execution log was supplied at acceptance.

Scope: 33 cases / 165 annual rows; ten report pages, 106 visuals, 27 tables and 89 measures. Ten chart families: bill, cash, sources, uses, paired capital/funding, comparison bills/cash, capital program, historical customer-class volume and operating expense. Also bill components, financial bridges, evidence, assumptions, glossary and synthetic ERP specification. Old `_Engine`, `_Result`, `_BestCandidate`, candidate search and arbitrary overrides are absent, not hidden. The fixed account is 5,000 monthly gallons equivalent, 5/8-inch meter and one EDU where applicable; common wastewater rate 1. Balance/flow distinctions and suppressed misleading totals are retained.

Generic builder and data-free recipe: `../lca-waterworks-powerbi/tools/`; companion README contains rebuild checksums. Reference identity: `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`. JavaScript engine blob: `71a6cc3a0b59589cb288eb073a654bb32551ca56`.

Authoring checks: 6,600 comparisons matched fresh frozen-reference simulation exactly; 6,435 stored metrics differed by at most approximately 9.1e-13; cash/capital bridges reconciled below $0.00001; 605 bill components matched 165 annual bills. Static checks covered 122 schema documents, 138 bindings and ten page layouts, with no old engine/optimizer or external data dependency. These checks are separate from native/live validation.

## Earlier v07/v08 evidence retained

Owner observations established loading/M refresh after repairs to version.json, rejected Measures table naming and bare text types. All fifteen v07 pages were visually inspected; City follow-up cleared the apparent stale-division issue. v08 repair: fifteen pages, nineteen tables updated, 95 data tables preserved, 1,018 visuals and 1,085 JSON documents inspected. Populated rows and suppressed totals were visible; PUB08 captions remained.

Combined v08 acceptance exhausted memory after about 226 seconds. Correct City/Central/Manual capital $262,634,500 took 69.525 seconds on the original path, 0.4416 direct-engine, 59.479 candidate-first and 62.8355 with a query-scoped constant optimizer. Not controlled cache tests; neither rewrite accepted. Sole attribution to optimizer enumeration unsupported. Full v08 reconciliation and native solver parity remain unverified, not repaired by v09.

## JavaScript baseline and earlier checks

Separate fund ledgers, detailed 2027 bridges, component tariffs, detailed/condensed capital, eleven presets, live assumptions/finite optimization, JSON/CSV export, financing charts, glossary and synthetic validation. Recorded 2027 closing cash: $7,546,095 / $10,447,425 / $53,947,019. Detailed capital $361.312m versus condensed $355.712m; City 2029 $5.6m difference disclosed. Debt/grants/capital receipts remain separate from recurring receipts; no interfund pooling.

Historical checks: 38 numerical/chart tests, 33 presets, 286 local links, fingerprints/import rejection, cash identities, tariffs, funding caps, grant/debt timing and optimizer feasibility. Prior independent reviews remain in the review documents. These are not new live-site/native-Tableau checks; physical mobile verification was not claimed.

## Limitations and next objective

Cost blends and revenue exposure are judgments, not calibrated probabilities. Future grants, investment income, class allocation, executed agreements, City add-on eligibility and financing approvals remain assumptions. Baseline debt principal beyond 2031 is not reconstructed; source schedules conflict. Arithmetic/planning feasibility is not authority to adopt rates or borrow. Synthetic ERP documentation is not a live Munis connection.

Next: publish T01d as the initial two-dashboard Tableau edition; check hosted navigation and representative controls; obtain the actual public embed; activate `/lca-waterworks-tableau/` and add the third stacked homepage link. Do not require completion of the later views first. Preserve existing editions and the evidence cutoff; distinguish staged host availability from a working embedded workbook.

Independent signed-out checks remain separate maintenance work. Provider-side deletion/revocation is required to withdraw direct public access; removing the host alone is insufficient. Production scope remains separate: finance-reviewed allocations, billing determinants, complete debt schedules, executed agreements and governed ERP extracts.
