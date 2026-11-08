# Project state

## Current intent

- Project: Sample LCA WaterWorks BI.
- Repository: `nwags/nwags.github.io`, public GitHub Pages, `nwags.com/lca-waterworks/`.
- Integration branch: `work/waterworks-financial-views`; publication branch: `main`.
- Interface: **0.3**; model: **0.2.0**; scenario schema **2.0**; evidence cutoff **November 7, 2026, America/New_York**; horizon **2027–2031**.
- Objective: make financing, expenditures, receipts and remaining reserves understandable alongside the existing three-division rate, capital and scenario model.
- Latest user direction supersedes the original one-fund scope and disabled analytical controls. Missing evidence becomes visible assumptions and sensitivities, not fabricated verified terms.
- Runtime: static HTML/CSS/JavaScript/JSON. No production ERP, credentials, analytics or AI runtime.

## Milestone

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
- A 50-term glossary has stable links from controls, chart keys, the manual and model explanation. Contextual glossary links open separately to preserve the current scenario.

## Verification observed

- **38 tests passed, 0 failed** in the current combined test run. The original 34 engine tests were also independently rerun during model review. Coverage includes cash identities, exact tariff examples/freezes, capital reconciliation, financing caps, grant timing, separate growth channels, industrial shock, demand elasticity, City ceiling assumptions, debt timing, valid optimizer outputs, import identity and synthetic schema rejection.
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

A production successor needs finance-reviewed category mappings, billing determinants, project schedules, executed agreements and a full debt ledger in an approved environment. The completed revision plan is archived under `docs/exec-plans/completed/`.
