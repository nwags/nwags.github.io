# Data provenance, refresh and analyst guide

## Evidence rules

Use `data/baseline.json` as the versioned numeric input and source register. It preserves the 2027 final budget, the original 2027–2031 capital-plan snapshot, exact household tariff components, and separate authority fund context. `data/constraints.json` is the UI's concise rule register; [CONSTRAINTS.md](CONSTRAINTS.md) holds interpretation and outstanding evidence.

Every consequential value needs: source URL, publication/adoption date where available, retrieved date, page/table locator, fund/system, unit, fiscal period, accounting basis, actual/forecast/budget/proposed status, and the transformation into the model. A document's printed date, upload month and approval date can differ. Do not treat a page header alone as the adoption date.

Use these evidence classes consistently:

| Class | Meaning | Example |
| --- | --- | --- |
| Verified source value | Directly transcribed and checked in a primary public record | 2027 budget ending cash |
| Derived value | Reproducible arithmetic from named inputs | Reanchored 2029 expense |
| Planning assumption | Selected judgement, not measured behavior | 100% aggregate rate exposure |
| Proposed | A published proposal without verified adoption at the cutoff | 2027 tariff components |
| Unresolved | Required evidence or applicability remains open | Exact indenture covenant definition |

The cutoff is November 7, 2026. An event scheduled after the cutoff cannot be counted as completed. The [2027 rate page](https://www.lcawaterworks.org/2027-rates/) and final budget slides scheduled rate adoption for November 9. Refresh that status only after inspecting the subsequent official record. The October 26 approved budget may use proposed rates; these statuses can coexist.

## Baseline refresh procedure

1. Open `AGENTS.md`, `docs/STATE.md`, the active stage brief, and the current JSON before collecting data. Confirm branch, model version, scope, cutoff and current verification.
2. Inventory new official finance documents, rate resolutions, minutes, agreements and capital plans. Preserve prior snapshots. Fetch only public sources or explicitly approved internal aggregates.
3. Extract tables and visually check the original pages. OCR/transcripts are discovery aids, not controlling numeric or legal sources. Record hashes of downloaded source PDFs when available; hashes identify the reviewed bytes, not ongoing validity.
4. Reconcile customer receipts, other receipts, expense, debt, capital, borrowing, opening and closing cash independently. Explain every residual, basis difference, restriction and rounding discrepancy. Do not force a balance with an unnamed plug.
5. Separate actuals from forecasts, budgets and proposals. Preserve all fund and service boundaries. Retain source-specific coverage definitions. Do not fit a trend to a mixture of actual and planned values.
6. Rebuild the reference and compare it with both the prior release and original published projection. Explain why differences arise; never silently splice closing cash from one snapshot into another's cash flows.
7. Review the rule register. A document's existence or council authorization does not prove all conditions, execution, amendments, termination rights and approvals have been captured.
8. Update data/model versions when appropriate, the methodology, user guide, stage state and fixture documentation. Old scenario imports should fail clearly if their version no longer matches.
9. Run the focused tests and a browser check of affected workflows. Give the independent reviewer the original tables and expected identities, not just the author's interpretation.
10. Publish the reviewed aggregate/public release through the repository. Production private data belongs in an approved internal environment, not this public site.

## Information that should be collected next

| Information | Why it matters | First acceptable evidence |
| --- | --- | --- |
| 5–10 years of consistent fund actuals | Separates trends from budgets and unusual periods | Audited financial tables and reconciled cash bridge |
| Billing by class, meter, municipality and tariff | Replaces a uniform rate index and exposure proxy | Approved de-identified aggregate billing export |
| Fixed and volumetric revenue shares | Models pricing structure and demand response | Tariff-aware billed quantities and receipts |
| Weather, billed volume, connections, large users | Distinguishes growth, conservation and industrial shocks | Comparable annual/monthly series with definitions |
| Capital project timing and outturn costs | Estimates overrun/timing priors and required work | Approved CIP plus completed-project actuals |
| Complete debt and reserve schedules | Produces covenant-compliant coverage and liquidity | Current indentures, amendments, amortization, fund restrictions |
| Executed municipal and wholesale agreements | Defines allocable costs, formulas and decision rights | Signed agreement set, amendments and legal applicability review |
| Industrial expansions and signatory charges | Avoids a misleading incomplete revenue requirement | Approved contracts and documented financial treatment |
| Low-income affordability and assistance | Tests distributional effects and practicable mitigation | Public ACS aggregates plus approved assistance/arrears aggregates |
| ERP interface and reporting environment | Designs a supportable refresh process | LCA/Tyler-confirmed versions, licensed interfaces and sample exports |

The public October 26 packet's included rate-study discussion describes prior consulting work and the need for another rate study. Published capital planning is therefore not a substitute for current class cost allocation. See [MODEL_COMPARISON.md](MODEL_COMPARISON.md).

## How to use priors responsibly

For each uncertain driver, store the parameter, unit, central assumption, plausible range, source or judgement, applicable period, dependencies, reviewer and validation status. Start with deterministic scenarios when the data do not support a distribution. A range is not a 90% interval unless there is a defensible probability model behind it.

If sufficient actuals become available, isolate structural breaks, reconcile definitions, and backtest a simple baseline before adding complexity. Fit growth and demand separately where possible; distinguish nominal expense inflation from volume and project mix. Test dependence between drought, demand, operating expense, capital cost and household hardship. A Monte Carlo model with independent arbitrary draws would create false confidence.

The demo displays named stresses and a joint adverse case, without assigning probabilities. Changing a judgemental prior is visible and reversible. A future model can add distributions only after recording why they fit the evidence.

## Analyst review checklist

- Does the rate index affect only the intended receipts and service scope?
- Do all annual and five-year cash identities reconcile without pooling funds?
- Are restricted balances, debt proceeds, capital grants and revenue distinguished?
- Are both cash sufficiency and coverage tested annually?
- Does any financing benefit remain after accounting for debt service and the post-2031 balance?
- Are the bill's meter, use, service inclusions and year clear?
- Are proposal and adoption statuses correct at the evidence cutoff?
- Are failed constraints and unavailable legal evidence visible to the reader?
- Could an unchanged stress test be mistaken for an independent success?
- Can another analyst reproduce the results from the saved settings and source version?

## Export and Power BI/Excel portability

Use **Export scenario** for a full settings snapshot and **Download table CSV** for annual results. Keep the JSON next to the CSV when reviewing outside the dashboard. CSV rows include model version and evidence cutoff, then numeric nominal-USD outputs, one row per year; rates are percentage points as displayed, `dscr` is a multiple, and `cashDays` is days. A JSON scenario is not a verified ERP import.

The model is intentionally independent of ChatGPT. The formulas in [METHODOLOGY.md](METHODOLOGY.md) can be implemented in an Excel workbook, Power Query transformations and a Power BI semantic model. Match the same baseline reconciliation and financial invariant tests before comparing visual outputs. See [ERP_INTEGRATION.md](ERP_INTEGRATION.md) for canonical mappings and the production pathway.
