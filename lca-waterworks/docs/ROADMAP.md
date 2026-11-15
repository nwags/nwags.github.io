# Staged delivery plan

## Current milestone — integrate the initial public Tableau edition

The owner prioritized getting Tableau online before full parity. T01d passed native all-33 arithmetic checks and was published to Tableau Public as **WaterWorks — Overview and Financing**. The owner supplied its actual generated Share code and a populated hosted Overview screenshot. The companion uses `WaterWorksOverviewandFinancing/01Overview`, enables workbook tabs, retains the sticky independence notice and adds a third stacked homepage link. Verify Pages deployment and signed-out hosted operation separately; see STATE.md.

This is an initial **two-dashboard** Tableau edition, not completion of the broader Tableau deliverable. The owner explicitly asked about the remaining tabs. Showing existing workbook tabs does not implement the missing views. Further authoring must preserve the working release and common financial snapshot.

### Release and maintenance gates

1. Preserve T01c/T01d and the native seed/extract connections. Retain the November 7, 2026 evidence cutoff. All-33 native arithmetic acceptance is recorded for both checkpoints.
2. Keep clear opening selections: Suburban Water / Central on Overview. Supporting sheets may be hidden, not deleted; hiding is not data privacy.
3. Public-suitability applies to the entire model/extract. Never add confidential ERP/customer information to this public workbook.
4. Use the supplied readable-name workbook/view identity, not the older development-filename publication. The host enables tabs and toolbar; the actual published sheets must still be checked.
5. Verify the deployed host signed out, sample controls, both dashboards, any published audit sheet, full financing chart and sticky host notice. Direct/full-screen views rely on native disclosures.
6. Preserve JavaScript/Power BI applications and Excel. No workbook or financial changes are part of host integration. Withdrawal requires deleting/restricting the provider-side public item, not merely removing an embed.

## Tableau completion matrix — Power BI v09 reference

Track analytical content, not pixel-identical layouts. The packaged v09 reference has ten pages; the older v07/v08 development reports had fifteen. JavaScript retains live inputs/optimization that neither prepared-scenario BI edition currently replicates.

| Power BI v09 area | Current Tableau status | Remaining work / acceptance |
|---|---|---|
| 01 Overview | Implemented; native and owner-hosted Overview evidence | Independent comparator and explicit planning-status summary; consistent headline definitions. |
| 02 Financing & capital funding | Core cards/charts implemented; native full-chart evidence | Traceable annual/five-year bridge tables; verify flow sums versus opening/closing balances and hosted navigation. |
| 03 Compare prepared scenarios | Not built | Selected/comparator controls and multiple-scenario bill/cash views; compare within one division/account without duplicating annual rows. |
| 04 Illustrative customer account | Bill totals only | Fixed, usage and add-on detail; reconcile 605 components to 165 annual bills; do not imply arbitrary account recalculation. |
| 05 Capital plan reconciliation | Aggregate capital/funding only | Division/project schedule and detailed-versus-condensed reconciliation; preserve the $5.6m City 2029 difference. |
| 06 Customers & historical evidence | Not built | Customer-class volume and audited operating-expense histories with correct service-area scope, units and definitions. |
| 07 Scenario settings & evidence | Short scope/cutoff notes only | Full selected-preset assumptions, input identity, evidence status and source discrepancies. |
| 08 Rules & agreements | Not built | Native rules register; distinguish assumptions, source evidence and unresolved authority. No claim of legal approval. |
| 09 Glossary & sources | Host links to shared web documentation only | Native glossary/source views; website links are not a completed native tab. |
| 10 Audit & integration | All-33 arithmetic worksheet passes in Desktop | Detailed cash checks and synthetic ERP mapping; verify published audit access. No live Munis connection. |

### Bounded implementation tranches

**T02 — comparison and customer detail:** extend a separate copy with an independent comparator, scenario-comparison dashboards and bill components. Reuse the v09 snapshot; keep annual and component-level data separate to prevent double counting. Gate: native controls, all-33 checks and bill sums, then screenshot review.

**T03 — capital and historical evidence:** add capital reconciliation and the historical chart families. Gate: source/reference parity, units, dates and geography; do not silently equate reporting divisions with service areas.

**T04 — explanation and audit:** add scenario/evidence, rules, glossary/sources and audit/integration dashboards, planning-status labels and bridge details. Gate: native readability and content/definition parity against the ten-page reference.

Use one sequential integration stream for the shared workbook. Changes overlap in XML, data definitions and extracts; mechanical mappings/tests do not warrant maximum effort or competing workbook writers. Apply stronger review to aggregation, parameter scope and financial semantics. Preserve a passing checkpoint at each tranche; claim independent review only when actually executed.

Publish increments to the intended Tableau workbook after native checks, preserving or deliberately updating its canonical URL. Do not fork the financial model, introduce untested schemas or label prepared outputs as live optimization. The working initial release need not wait for those additions.

## Existing Power BI companion

`/lca-waterworks-powerbi/` remains parallel to `/lca-waterworks/`. v09 passed the owner's 33-case native query in 307.3 ms, was published to Service and embedded using its real public URL. Earlier Pages build/deploy succeeded. Independent full anonymous page/interaction review remains a separate check.

Contents include three divisions, eleven presets, ten chart families, bill components, bridges, evidence, assumptions, glossary and synthetic integration. No arbitrary new input recalculation or native live solver. Preserve v08 development artifacts and JavaScript controls. Generic builder/data-free recipe: `../lca-waterworks-powerbi/tools/`; native models stay outside the repository.

Future revisions require 33 nonblank native arithmetic rows, residuals within $0.01, default-account bill parity, correct flow/balance summaries, usable hosted behavior, public-safe data and accurate disclosures. One query duration is not a performance guarantee. Revoke provider public codes to withdraw access.

## Existing JavaScript milestone

Interface 0.3/model 0.2.0 includes separate ledgers, component tariffs, capital reconciliation, presets, history, model explanation, financing and glossary. Earlier checks are in STATE.md and the completed adversarial-revision plan. Embedding another edition changes none of those calculations, assumptions or the Excel counterpart. JavaScript optimization remains a separate capability.

## Durable stage gates

- **M0 — Define:** decisions, scope, source hierarchy, independence and fund boundaries; explain each edition's actual capabilities.
- **M1 — Evidence:** preserve budgets/audits/capital/tariff/agreement units, dates, scope and status; missing evidence stays explicit.
- **M2 — Model:** check ledgers, bills and constraints against independent arithmetic; no interfund pooling or silent deletion of required capital.
- **M3 — Interface:** accessible financial views, accurate controls, comparison, evidence drilldowns and integration explanation.
- **M4 — Review:** methods/manual/glossary; distinguish static, native, live, source and policy validation.
- **M5 — Publish:** preserve unrelated portfolio content, verify served behavior and record checkpoints. Repository writes, Pages deployment and provider rendering are distinct.

## Separate production pathway

Live ERP, cost-of-service allocation, calibrated forecasts, complete debt principal, executed agreements and policy recommendations require governed internal evidence and authorized staff review. They are not prerequisites to an honestly bounded educational example, nor capabilities it should imply.
