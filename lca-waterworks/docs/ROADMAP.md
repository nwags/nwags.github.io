# Staged delivery plan

## Current milestone — complete navigation for the initial public Tableau edition

The owner prioritized getting Tableau online before full parity. T01d passed native all-33 arithmetic checks and was published to Tableau Public as **WaterWorks — Overview and Financing**. The owner supplied the actual generated Share code and hosted Overview screenshots. The companion uses `WaterWorksOverviewandFinancing/01Overview`, requests tabs, retains the sticky independence notice and has a third stacked homepage link. Pages build/deploy for integration 480e110 succeeded; owner screenshots now show Overview on both the host and signed-out Public page.

Neither screenshot exposes the other workbook sheets. Resolve this before treating workbook navigation as complete. The host already requests `tabs=yes`: verify **Show Sheets as Tabs** in the published viz's Edit Details/settings. If enabled but Financing is absent, inspect that exact public copy before replacing it from the native-tested T01d workbook. Do not infer published sheet availability from Desktop alone. Reciprocal website links are repaired independently; no financial-model or extract rewrite is needed.

This is an initial **two-dashboard** edition, not completion of the broader Tableau deliverable. Additional analytical views remain deferred deliverables, not hidden functionality. Preserve the working release and common financial snapshot.

### Release and maintenance gates

1. Preserve T01c/T01d, the native seed/extract connections and November 7, 2026 cutoff. Native all-33 arithmetic acceptance is recorded for both checkpoints.
2. Keep clear defaults: Suburban Water / Central on Overview. Supporting sheets may be hidden, not deleted; hiding is not privacy.
3. All model data must be suitable for public access. No confidential ERP/customer information.
4. Use the readable-name workbook identity, not the older development-filename publication. Host tab/toolbar requests, provider tab settings and actual published sheet inventory are separate checks.
5. Verify signed-out Overview/Financing/audit navigation, controls, full financing chart and host notice. Direct/full-screen views rely on native disclosures.
6. Preserve other editions and Excel. Withdrawal requires provider-side removal/restriction, not just deleting the embed.

## Tableau completion matrix — Power BI v09 reference

Track analytical content, not pixel-identical layouts. Published Power BI v09 has ten pages; the earlier v07/v08 development reports had fifteen. JavaScript retains live inputs/optimization that neither prepared-scenario BI edition replicates.

| Power BI v09 area | Current Tableau status | Remaining work / acceptance |
|---|---|---|
| 01 Overview | Implemented; native and owner-hosted evidence | Independent comparator and explicit planning-status summary; consistent headline definitions. |
| 02 Financing & capital funding | Native cards/charts verified; public navigation unresolved | Fix published access; annual/five-year bridge tables; flow sums versus opening/closing balances. |
| 03 Compare prepared scenarios | Not built | Independent selected/comparator controls and multiple-scenario bill/cash views; no duplicated annual rows. |
| 04 Illustrative customer account | Bill totals only | Fixed, usage and add-on detail; reconcile 605 components to 165 annual bills; no arbitrary account-recalculation claim. |
| 05 Capital plan reconciliation | Aggregate capital/funding only | Division/project schedule and detailed/condensed reconciliation; preserve City 2029 $5.6m difference. |
| 06 Customers & historical evidence | Not built | Customer-class volume and audited operating-expense histories; correct scope, units and definitions. |
| 07 Scenario settings & evidence | Short scope/cutoff notes only | Selected-preset assumptions, source identity, evidence status and discrepancies. |
| 08 Rules & agreements | Not built | Native rules register; separate assumptions, evidence and unresolved authority. |
| 09 Glossary & sources | Shared web links only | Native glossary/source views; web links do not count as completed native tabs. |
| 10 Audit & integration | All-33 worksheet passes in Desktop; public access unverified | Published audit access, detailed cash checks and synthetic ERP mapping; no live Munis connection. |

### Bounded implementation tranches

**T02 — comparison and customer detail:** separate working copy; independent comparator, scenario-comparison dashboards and bill components. Reuse v09 snapshot; keep annual/component grains separate. Gate: native controls, all-33 checks, bill sums and screenshot review.

**T03 — capital and historical evidence:** capital reconciliation and historical chart families. Gate: source/reference parity, dates, units and geography; do not equate reporting divisions with service areas.

**T04 — explanation and audit:** scenario/evidence, rules, glossary/sources, audit/integration, planning status and bridge details. Gate: native readability and semantic parity against the ten-page reference.

Use one sequential workbook integration stream because definitions/extracts overlap. Routine mappings/tests do not require maximum effort or parallel competing writers; apply stronger review to aggregation, parameter scope and financial semantics. Preserve passing checkpoints and claim independent review only if executed.

Publish increments after native checks, preserving or deliberately updating the canonical URL. Do not fork the model, introduce untested formats or describe stored outputs as live optimization. The initial release remains available during additions.

## Existing editions and durable gates

Power BI v09 is separately published/embedded and passed the owner's 33-case native query in 307.3 ms. Scope: ten chart families, bill components, bridges, evidence, assumptions, glossary and synthetic integration; no arbitrary-input recalculation or native live solver. Preserve v08. Generic builder/recipe are under `../lca-waterworks-powerbi/tools/`; native models stay outside this repository.

JavaScript interface 0.3/model 0.2.0 retains separate ledgers, tariffs, capital reconciliation, presets, history, live controls/finite optimization, financing and glossary. Other embeds change none of its calculations, assumptions or the Excel counterpart. Validation history is in STATE.md and the completed revision plan.

Future changes require nonblank native arithmetic results, residuals within $0.01, bill parity, correct flow/balance summaries, accessible controls, honest capability labels and public-safe data. One query duration is not a performance guarantee. Repository writes, Pages deployment and provider interaction are distinct checkpoints.

M0 defines decisions, boundaries, source hierarchy and independence. M1 preserves evidence units/dates/status. M2 checks ledger/bill/constraint invariants without fund pooling or silent capital removal. M3 exposes accurate, accessible controls and financial views. M4 maintains methods/manual/glossary and distinguishes static, native, live and policy review. M5 verifies served behavior and preserves unrelated portfolio content.

## Separate production pathway

Live ERP, cost-of-service allocation, calibrated forecasts, complete debt principal, executed agreements and policy recommendations require governed internal evidence and authorized staff review. They are not prerequisites to an honestly bounded educational example, nor capabilities it should imply.
