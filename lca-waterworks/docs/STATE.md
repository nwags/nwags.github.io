# Project state

## Current intent

- Project: Sample LCA WaterWorks BI.
- Repository: `nwags/nwags.github.io`, public GitHub Pages.
- Parallel routes: `nwags.com/lca-waterworks/` retains the JavaScript implementation; `nwags.com/lca-waterworks-powerbi/` is the separate native Power BI embedding shell. Neither replaces the other.
- Website/tool maintenance branch: `main`. Native Power BI project definitions and loaded data remain outside the public repository.
- JavaScript interface: **0.3**; model: **0.2.0**; scenario schema **2.0**; evidence cutoff **November 7, 2026, America/New_York**; horizon **2027–2031**.
- Objective: publish a credible, bounded educational Power BI prototype alongside the existing JavaScript model. Validate the functionality actually exposed; do not require production completeness or full native optimizer parity to release a deliberately narrower edition. See the bounded release gate in [ROADMAP.md](ROADMAP.md).
- Missing evidence becomes visible assumptions and sensitivities, not fabricated verified terms.
- No production ERP connection, credentials or private supporting material belongs in this public repository.

## Release priority and native checkpoint — November 13, 2026

The immediate milestone is a useful public prototype, not a production rate-setting system. Retain the three divisions, customer bills, capital and financing views, representative scenario comparisons, evidence, glossary and independent-analysis notices. Known material arithmetic errors and an unusable default experience remain blockers; exhaustive optimization, live ERP integration and cosmetic perfection do not.

This is a priority and acceptance-scope clarification, not an implemented reduction of report capabilities. Preserve the working v08 development project. A curated native scenario-explorer edition with prevalidated outputs is a possible fallback if live recalculation cannot meet the release's usability bar. Any such edition must be labeled honestly and distinguish scenario selection from arbitrary live what-if calculation and optimization. Do not silently remove controls or claim full equivalence with the JavaScript version. Hiding an optimizer page alone does not isolate its dependencies in shared reporting measures.

### Latest observed native evidence

Evidence here is user-supplied Windows execution output and screenshots, not a remotely observed Desktop session.

- The v08 PowerShell repair completed on the Windows Desktop host: 15 pages, 19 annual/other tables updated, 95 original data-table definitions unchanged, 1,018 original visuals updated, and 1,085 JSON documents parsed. The original financial-engine measures were preserved by the repair.
- The generated local project is `C:\WaterWorksLab\WaterWorks_Publication_v08\WaterWorks_Publication_v08.pbip`.
- Refreshed v08 renders populated City results on pages 01, 02 and 15. Misleading annual table grand totals are visibly absent. Public labels still expose internal `PUB08 Table` measure names; captions and low-contrast titles need cleanup. The screenshots do not establish complete v08 visual or interaction acceptance.
- The combined native period-acceptance query failed with an insufficient-memory message after approximately 226 seconds. The cause is not yet established.
- A later diagnostic returned blanks while the model reported missing data. After refresh, City / Central / Manual capital returned exactly $262,634,500 with zero difference from the reference. The missing-data detour is not a financial pass or proof about memory usage.
- Observed query timings: original Total capital 69.525 seconds and approximately one minute on rerun; direct manual engine 0.4416 seconds; candidate-first routing 59.479 seconds; original measure with query-scoped BestCandidate = -1 override 62.8355 seconds. Each populated test returned the same capital result. These are individual observations, not controlled cold/warm-cache benchmarks.
- The candidate-first rewrite is not an accepted performance fix. The constant optimizer override also remained slow, so attributing the delay solely to candidate enumeration is unsupported. No diagnostic override is approved for installation in the production model.
- Full native three-division period reconciliation, optimizer parity and published-Service performance remain unverified. The quick direct-engine observation does not validate the whole report's responsiveness.

No additional native repair or public embedding was performed in this state/roadmap update. The report is still unpublished and the companion iframe remains inactive.

## Power BI publication candidate — November 12, 2026

### Observed native v07 state

User-supplied Desktop output and screenshots confirm that the corrected project opens, its M queries load and all 15 report pages have been visually inspected. The missing report version metadata, rejected Measures table name and invalid M text-type declarations were repaired locally. Sample headline results for all three reporting divisions agree with the reference to displayed precision. Follow-up screenshots confirm City-specific ledgers on pages 01 and 15; the earlier suspected division-filter defect is no longer established.

Presentation problems identified in v07 included annual flow measures displaying 2031-only values under ambiguous Total rows and the capital bridge summing year-end balances at its grand total. A review of packaged DAX also identified a customer-class trend expression whose CALCULATE filter replaced the class filter.

### v08 repair design

`../lca-waterworks-powerbi/tools/Repair-WaterWorks-Publication-v08.ps1` creates a separate local publication candidate from the selected, saved v07 PBIP. It does not overwrite source files or publish a report. It preserves the 15-page structure, original financial-engine measures and original data tables, and adds:

- Presentation measures with explicit annual-flow, opening/closing-balance and minimum-ratio aggregation.
- Hidden ambiguous table grand totals and a labeled 2027–2031 reconciliation summary on page 15.
- Cash-identity and capital-funding residual checks, preserving blank results for invalid scenarios.
- Customer-class trend filtering using KEEPFILTERS, and zero delayed-grant presentation only for valid scenarios.
- Larger table/selector text, dropdown selectors and shortened planning-status messages.
- An independence disclosure at the top and bottom of every native report page. These are not sticky canvas elements; the separate website's sticky notice remains necessary.

Only generic repair code is published in this repository, not the native report/model or internal data. No new chart family or financial assumption is introduced.

### Validation boundary

A Python-generated equivalent repair output was checked against the packaged source: 1,085 JSON/schema documents, 1,163 field bindings, 15 page bounds, 20 tables without grand totals, and 95 byte-identical original data-table definitions passed. The existing financial-engine measure definitions were preserved. The JavaScript reference was rerun for 33 presets / 165 annual rows, with cash and capital reconciliation checks passing.

**These structural and reference checks are not full Power BI DAX/runtime acceptance.** The subsequent native v08 execution, screenshots and failed/isolated acceptance tests are recorded in the November 13 checkpoint above. Native period-summary correctness and performance are still open.

Publication remains pending. No public Power BI embed URL is configured, and the companion page continues to show its pending state.

## Parallel Power BI site and visible independence notice — November 9, 2026

- All four public WaterWorks HTML pages include the same **sticky, nondismissible independence notice**, shared by `site-notice.css`.
- A separate `/lca-waterworks-powerbi/` static, **JavaScript-free iframe shell** is prepared; it explicitly displays **Power BI report connection pending**. The iframe has no URL and is hidden: it is NOT a functioning embedded report yet.
- Service publication, tenant permission, actual public embed code and live iframe acceptance remain pending. No credential or Power BI report data is added to GitHub Pages.
- The original JavaScript model, financial data and tests are unchanged by the site-only and native-repair-tool updates.
- The sticky banner states this is an independent educational exercise, not LCA-affiliated or endorsed, nor a definitive or fully representative financial assessment.

## JavaScript milestone

**Interface 0.3 implementation and local validation are complete.** The existing numerical model and baseline remain version 0.2.0. The GitHub Pages workflow publishes the committed static tree; its run status is the authoritative deployment result.

## Completed

- Three independent executable ledgers: Suburban Water, Suburban Wastewater, City Division.
- Exact detailed 2027 cash bridges: closing unrestricted cash $7,546,095; $10,447,425; $53,947,019. Grants, capital receipts, other capital payments, lease, debt and operating costs stay separate.
- Capital uses detailed project schedules plus administration: $361.312m. Original condensed cash total $355.712m remains selectable. The $5.6m City 2029 source difference is disclosed, not silently resolved.
- Exact proposed 2027 and adopted 2026 tariff components; meter charges, five water blocks, common sewer alternatives and City water/sewer/CCRC/AO lines. Freeze reproduces actual 2026 components.
- Separate fixed/variable/add-on uplifts, exposed account/volume growth, industrial shock, residual customer receipts, revenue allocation, costs, grants, debt, cash/coverage and City rule assumptions.
- Central planning defaults use approved budget, proposed tariffs, full capital and published drivers with a judgmental 25% historical cost-trend blend. Published-driver and full-history alternatives remain explicit.
- Eleven named scenarios; shared account/policy comparisons include bills, cash, coverage, capital, borrowing, remaining incremental debt and next-year payment. Preset labels become Custom after edits; comparison delta names its baseline.
- Precise City CPI convention researched; other contractual gaps use explicit scenario assumptions. Numerical tests do not certify rate adoption, covenants or eligible cost recovery.
- Deeper 2016–2025 class units/volume/revenue and cost evidence, with statistical-table scope and classification limitations preserved.
- Separate `model.html` explanation with diagram, current manual and guides; bounded worker orchestration and synthetic ERP pathway updated.
- Scenario JSON and CSV carry `dataRevision`, a SHA-256 fingerprint of normalized inputs, years and tariff research data. JSON imports require matching version, cutoff and fingerprint and recalculate results.
- Annual cash-source and cash-use stacks, paired capital/funding columns, exact annual tables and a five-year capital/cash bridge. Planned and additional borrowing remain separate; opening reserves are not annual receipts.
- A shared chart manifest defines all new financial categories and formulas. The same raw ledger rows drive the charts and exports.
- A 50-term glossary has stable links from controls, chart keys, the manual and model explanation. Contextual glossary links open separately to preserve the selected scenario.

## JavaScript verification observed

- **38 tests passed, 0 failed** in the recorded combined test run. The original 34 engine tests were also independently rerun during model review. Coverage includes cash identities, exact tariff examples/freezes, capital reconciliation, financing caps, grant timing, separate growth channels, industrial shock, demand elasticity, City ceiling assumptions, debt timing, valid optimizer outputs, import identity and synthetic schema rejection.
- Four additional chart-contract tests cover all 33 division/preset combinations, annual cash and five-year capital identities, grant/debt timing, no duplicate receipt categories, raw precision, funding excess and glossary keys.
- Browser preview inspected annual sources, uses and capital funding, plus City additional borrowing. The bridge reconciles and the glossary navigation preserves the selected scenario.
- Independent review completed two passes plus targeted fixes. Initial 16 findings and follow-up report are retained under `docs/reviews/`; current summary is `docs/MODEL_REVIEW.md`.
- Reviewer independently recomputed the baseline SHA-256 and tested mutation sensitivity, all three fund round-trips and wrong/missing fingerprint rejection.
- Browser preview: dashboard and model/manual visually inspected; all three divisions respond; City tariff components match published example; Common Rate 2 and exact freeze work; optimization produces a feasible result; changing account usage refreshes bills and invalidates the optimized label; capital/customer tables and nine rule rows render; synthetic fixture reconciles; scenario JSON download and re-import succeed.
- No application-origin error observed in the inspected browser console; unrelated browser-extension metadata errors appeared.
- Checked 286 local HTML links and fragments across the four application pages with no missing targets; no duplicate HTML IDs. JSON files parse, JavaScript syntax checks pass and git whitespace checks pass.
- Separate physical mobile-device verification is not claimed. Responsive styles are implemented.

## Workers and resources

The controller integrates changes and owns browser QA/publication. Research, implementation and independent review use bounded assignments with separate write ownership. The financing presentation was reviewed against the unchanged numerical ledger, shared category contract and scenario fixtures. Workers do not publish, contact stakeholders or connect production systems.

## Material limitations retained

- The cost blend and forward revenue mix are judgmental, not calibrated probabilities or a cost-of-service study.
- City 2029 capital and some published cash balances conflict internally; both source interpretations remain visible.
- City 2027 capital reclassification preserves total cash but its project mapping is inferred.
- Wastewater future debt service retains a published schedule after the budget omits an earlier proposed 2027 draw. Base principal after 2031 is not reconstructed.
- Future grant receipts, constant fees/investment income, class/contract mapping, City add-on eligibility and future approvals remain assumptions.
- The finite optimizer searches a declared family, not all feasible policies. The single-fund synthetic connector is isolated from the three-division financial model.

## Next objective

Prepare a bounded, responsive publication edition and verify its exposed baseline/scenario calculations. Avoid open-ended routing experiments as the sole path to release. Preserve the complete v08 development project and explain any proposed reduction of live controls before implementing it. Correct public captions and confirm independence disclosures. Then publish only public/synthetic content to Power BI Service, obtain the actual approved Publish-to-web URL, and activate only the separate companion iframe. Verify both sites and persistent notices without replacing the JavaScript implementation.

A production successor separately needs finance-reviewed category mappings, billing determinants, project schedules, executed agreements and a full debt ledger in an approved environment. The completed JavaScript revision plan is archived under `docs/exec-plans/completed/`.
