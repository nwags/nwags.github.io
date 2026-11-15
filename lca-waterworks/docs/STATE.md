# Project state

## Current intent

- Repository: `nwags/nwags.github.io`, branch `main`. Integration baseline: `561c616a70799c6f276b4fe188a58b88743c2f7b`.
- Parallel routes: `/lca-waterworks/` (JavaScript), `/lca-waterworks-powerbi/` (Power BI), `/lca-waterworks-tableau/` (initial native Tableau edition). No edition replaces another.
- JavaScript interface 0.3; reference model 0.2.0; scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Publish useful, accurately scoped educational examples. Tableau currently has Overview and Financing, not Power BI's full ten-page scope. Its remaining views are deferred deliverables, not abandoned or hidden functionality.
- Native workbooks/projects, extracts and private execution records stay outside the public repository. Public BI models must contain only public/synthetic information.

## Latest milestone — Tableau Public supplied and companion integrated, November 15, 2026

### Observed provider evidence

The owner supplied a screenshot of the Tableau Public view titled **WaterWorks — Overview and Financing**, plus its complete generated Share code. The hosted Overview visibly renders Suburban Water / Central: $38.30 bill, 27.2 cash days, 1.53 coverage proxy and $43,516,250 capital, with the independence disclosure and prepared-scenario description. This is owner-provided browser evidence, not an independent anonymous interaction test.

The canonical workbook/view identity in that code is `WaterWorksOverviewandFinancing/01Overview`. The earlier development-filename publication is not the integration target. The owner confirmed that the new visualization's Tableau Public thumbnail now looks correct; no thumbnail or provider-account changes are needed or performed.

### Implementation

- Replaced the pending host with the supplied Tableau Public object/loader integration. Preserved workbook/view identity, host, static-image paths and Overview default.
- Changed `tabs=no` to `tabs=yes`; retained the toolbar. This exposes published sheets only, not missing dashboards or sheets excluded from publication.
- Kept the native 1280-pixel desktop width in a keyboard-focusable horizontal scroll region. Reserved 1420 pixels vertically for Financing (1320 pixels), tabs and toolbar; this is not a native mobile-layout redesign.
- Retained the unchanged shared sticky notice, parallel navigation, direct-report links, no-script preview labeling and a loader-error fallback.
- Removed pending/noindex metadata and added a third stacked homepage Online link, explicitly described as the initial Overview and Financing edition.
- Added the remaining-view matrix to ROADMAP.md. No workbook, extract, assumptions, formulas, JavaScript application, Power BI host, shared stylesheet or Excel file changed.

### Verification boundaries

Observed authoring checks: eight HTML/embed/homepage contract tests passed; embed.js passed Node syntax checking. In-memory Chromium host checks passed at 1920x1080, 1440x1000, 768x1024, 390x844, 320x568 and 844x390. No page-level horizontal overflow; narrow-screen scrolling stays within the report region. Sticky notice, visible keyboard skip link, simulated loader failure and no-script fallback passed. The three homepage links stack using existing card-specific inline styles; that isolated test did not load the full external homepage stylesheet.

These host checks substitute a size-only box at the external-loader boundary. They do not render Tableau's remote visuals. External Tableau retrieval and container requests were unavailable; independent anonymous loading, tab switching, parameter changes, full-screen behavior and physical-device rendering remain UNVERIFIED. Pages build/deploy must be checked for this integration commit, separately from repository writes and host tests. Do not describe the fixture screenshot as a live Tableau preview.

Committed static test: `lca-waterworks-tableau/tests/test_embed.py`. It checks provider identity, tabs/toolbar, direct fallbacks, scope labels, notice/navigation/accessibility, loader sizing, no-script labeling and three homepage links.

## Tableau native checkpoints and scope

### T01d native acceptance

The owner's November 15 Desktop screenshots identify `WaterWorks_Tableau_T01d` and visibly show **33 PASS arithmetic only entries**, with **33 marks / 33 rows by 1 column**.

Suburban Water / Central Financing shows $43,516,250 capital, $17,751,000 borrowing, $0 grants and $10,273,448 display-rounded reserve draw. The complete paired capital/funding chart, annual sources/uses, full color keys, readable two-line notice and explanatory footer render. This is not a controlled latency benchmark or every-scenario visual test. The later Tableau Public screenshot adds hosted Overview evidence.

T01d artifact SHA-256: `599af9bf0edfc12d21a0c68567fa0ea5d29f71e7601618767877ba27c1cc5a55`. The native artifact is not committed. Scope: two dashboards, thirteen supporting worksheets, three divisions, eleven scenarios; five chart families (bills, cash/target, sources, uses, paired capital/funding). Comparison is fixed to the selected division's Central reference. No arbitrary assumptions or live optimizer. Public sheet availability must be checked; Desktop existence does not establish publication.

### T01c and repair history

Owner November 14 screenshots showed all 33 native arithmetic passes and sampled controls. City / Central: $126.58 bill, 306.9 cash days, 2.33 coverage and $262,634,500 capital. Suburban Water / Additional borrowing: $38.30 bill, 206.1 cash days, 1.33 coverage, $43,516,250 capital; Financing: $28,546,196 borrowing, $0 grants, $1,559,022 reserve draw. Selected cash diverged from Central while bill paths coincided.

T01c resolved missing workbook/layout metadata, absent extracts and incompatible legacy layout attributes after adopting the owner's native seed. Both extracts came from that seed. Preserve the working format/connections rather than repeat conversion.

T01d changed presentation only: notice, scope, headings, coverage-proxy wording, Amount (USD), full display-only keys, Overview 1280x900 and Financing 1280x1320. Hyper files/CSVs stayed byte-identical to T01c; all 72 calculation elements, parameters, filters, encodings, connections, format manifest and worksheet IDs were preserved. ZIP/XML/path, presentation-diff, zone, 26-key and approximate font checks passed. CSV arithmetic passed all 33 cases, maximum absolute remainder about $0.000000075. Native observations are separate evidence.

Arithmetic acceptance is not policy feasibility, source authority or approval to adopt rates/borrow. Missing comparison, customer detail, history, capital reconciliation, evidence, rules, glossary and integration pages remain in the completion matrix.

## Existing Power BI and homepage milestones

Companion commit `a8418fb382cf8ce4b46d8698933dce3a8b929383`: actual owner-supplied Publish-to-web URL, Overview default, responsive host, full-screen support, fallbacks, unchanged sticky notice and explicit scope. Pages run `43632052719` build/deploy was observed successful in the earlier session.

Homepage commit `a4b4660f474e262a31fe48f60599ca4ef2ffc96b`: stacked JavaScript/Power BI Online links; pending wording removed. Pages run `43642918489` succeeded. Positive owner feedback is not independent comprehensive anonymous testing. Tableau staging commit `561c616a70799c6f276b4fe188a58b88743c2f7b` was explicitly pending until receipt of the actual code.

Earlier Power BI host tests: six contracts and six Chromium sizes passed overflow, notice and keyboard checks. Shared notice matched blob `b83ef465086702e71ce67e9434e1fd9acb8c362e`. Fixtures used about:blank, not Microsoft visuals; external requests were unavailable. No new full independent hosted review is claimed.

### Power BI v09

Owner Desktop acceptance: ten columns, 33 rows, **307.3 ms**, all checks **PASS arithmetic only** user-confirmed because the last column was off-screen. Service screenshots showed populated Overview, ten-page navigation and disclosures; public-code creation and integration followed. A later refresh date does not change the evidence cutoff.

Scope: 33 cases / 165 annual rows; ten pages, 106 visuals, 27 tables and 89 measures. Ten chart families: bill, cash, sources, uses, paired capital/funding, comparison bill/cash, capital program, historical customer-class volume and operating expense. Also bills, bridges, evidence, assumptions, glossary and synthetic ERP specification. Earlier live engine/search/override tables are absent, not hidden. Fixed account: 5,000 monthly gallons equivalent, 5/8-inch meter, one EDU where applicable, common wastewater rate 1.

Generic builder/recipe: `../lca-waterworks-powerbi/tools/`; README includes checksums. Reference identity `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`; engine blob `71a6cc3a0b59589cb288eb073a654bb32551ca56`.

Prior authoring checks: 6,600 comparisons matched frozen reference exactly; 6,435 prepared metrics differed by at most about 9.1e-13; cash/capital identities below $0.00001; 605 bill components matched 165 annual bills; static checks of 122 schema documents, 138 bindings and ten layouts. These are not independent economic validation, live optimization or every-interaction timing. Complete local builder logs, independent v09 worker review and full hosted page-by-page review were not claimed.

### Earlier v07/v08

Owner observations confirmed loading/refresh after version.json, Measures naming and bare-text type repairs. Fifteen v07 pages inspected; City follow-up cleared apparent stale-division issue. v08 repair updated fifteen pages/nineteen tables, preserved 95 data tables, inspected 1,018 visuals and 1,085 JSON documents. Populated rows/suppressed misleading totals rendered; PUB08 captions remained.

Combined v08 acceptance exhausted memory after about 226 seconds. Correct City capital $262,634,500 took 69.525 seconds original, 0.4416 direct-engine, 59.479 candidate-first, 62.8355 query-scoped constant optimizer. Not controlled benchmarks; neither rewrite accepted. Sole attribution to optimizer enumeration unsupported. Full v08 reconciliation/solver parity remain unverified, not repaired by v09. Preserve development checkpoints.

## JavaScript baseline and limitations

Interface 0.3 has separate ledgers, detailed 2027 bridges, component tariffs, detailed/condensed capital, eleven presets, live assumptions/finite optimization, JSON/CSV, financing, glossary and synthetic validation. Recorded 2027 closing cash: $7,546,095 / $10,447,425 / $53,947,019. Detailed capital $361.312m versus condensed $355.712m; City 2029 $5.6m discrepancy disclosed. Debt/grants/capital receipts remain separate from recurring receipts; no interfund pooling.

Historical tests: 38 numerical/chart tests, 33 presets, 286 links, fingerprints/import rejection, cash, tariff, financing-cap, grant/debt timing and optimizer checks. Independent reviews remain in review documents. These are not new native/live tests.

Cost blends, revenue exposure, grants, investment income, class allocation, agreements, City add-on eligibility and financing approvals include judgments/assumptions, not calibrated probabilities or approvals. Baseline debt principal beyond 2031 is not reconstructed; schedules conflict. No live Munis connection. Public-data scope and evidence cutoff stay unchanged.

## Next objective

Check Pages deployment and the new companion signed out: Overview/Financing navigation, scenario/division changes, direct fallback and sticky host notice. Check public audit availability if published. Then implement the next bounded Tableau tranche in ROADMAP.md: independent scenario comparison and customer detail using the same snapshot. No model fork or parity claim before acceptance. Other pages are explicit deliverables, not hidden tabs.

Provider-side removal/revocation is required to withdraw direct public access. Production governance, ERP extracts, full debt schedules, agreements and finance-reviewed allocations remain separate work.
