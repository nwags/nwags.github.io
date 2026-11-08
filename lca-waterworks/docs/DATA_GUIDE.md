# Data provenance, refresh and analyst guide

## Evidence rules

Use `data/baseline.json` as the versioned numeric input and source register. The revised data preserve the 2027 approved-budget cash bridges, original 2027–2031 capital-plan schedules for all three funds, the project-table reconciliation, household tariff components, historical class data and explicit assumptions. Suburban Water, Suburban Wastewater and City Division remain separate model scopes. `data/constraints.json` is the UI's concise rule register; [CONSTRAINTS.md](CONSTRAINTS.md) holds interpretation and outstanding evidence.

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

## Financial evidence and central reference

The central reference anchors 2027 to the approved budget and uses project-table capital including allocated administration. The model's 2028–2031 operating levels are derived budget-anchored scenarios. Original CIP levels, grant assumptions and borrowing schedules remain visible comparisons. An adopted conceptual capital plan is not authorization for every project, grant award or debt issue. Rates used in the approved budget were still proposed at the November 7 cutoff. Source: [LCA finances](https://www.lcawaterworks.org/lca-finances/) and [October 26 packet](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2026October26-BoardAgendaLCA.pdf), PDF 13, 16 and 18.

| Detailed 2027 cash bridge, USD | Suburban Water | Suburban Wastewater | City Division |
| --- | ---: | ---: | ---: |
| Opening unrestricted cash |11,598,553|10,356,798|59,300,576|
| Customer receipts |20,484,630|22,234,061|69,839,693|
| Other operating receipts |187,234|159,737|811,234|
| Supplier + employee cash payments |14,631,896|18,147,802|27,796,458|
| Lease payments |0|0|1,442,981|
| Capital acquisition payments, raw schedule |13,186,250|10,116,250|50,697,500|
| Other capital cash payments, raw schedule |551,599|517,251|6,126,740|
| Debt service, raw cash schedule |3,923,351|1,473,730|19,170,291|
| New debt draws |5,651,000|0|8,173,780|
| Grants, already included in composite revenue |0|5,725,000|10,966,220|
| Investment income |831,720|493,366|3,214,772|
| Ending unrestricted cash |7,546,095|10,447,425|53,947,019|
| Restricted cash, excluded from spendable balance |1,893,397|366,401|83,823,303|

The table omits fee/meter/reimbursement receipts for space; these remain separate source categories in the complete bridge. All three complete detailed bridges reconcile exactly. SWW has a $1 investment conversion. Executive summary City closing cash is $1 lower, and summary SWW debt service is $1 lower.

**Category warning:** Water summary expense $15,183,495 includes $551,599 other capital cash payments; it is not pure operating cash expense. Wastewater summary expense similarly includes $517,251. City headline capital $55,897,500 exceeds raw acquisition payments by $5.2 million; moving that amount from other capital payments is an inferred normalization. Raw and normalized groupings have identical total cash burden. City summary expense/debt categories also differ by an offsetting $119,066. Do not present the original CIP versus summary expense gap as an automatically verified cost update. [MODEL_COMPARISON.md](MODEL_COMPARISON.md) explains the bridge.

## Capital evidence and the central $361.312 million plan

The project schedules total Water $41.435 million, Wastewater $53.080 million, City water $160.975 million, City wastewater $97.497 million and Administration $8.325 million: $361.312 million. Administration is allocated into fund capital before modeling and must not be added again. City receives 50% per the administrative plan; the remaining 25% per suburban fund is inferred from the cash-table differences.

| Central capital including administration, USD |2027|2028|2029|2030|2031|
| --- | ---: | ---: | ---: | ---: | ---: |
| Water |13,186,250|12,536,250|6,541,250|5,836,250|5,416,250|
| Wastewater |10,116,250|23,231,250|16,356,250|3,431,250|2,026,250|
| City |55,897,500|72,487,500|53,819,500|41,812,500|38,617,500|

A material **source conflict** remains: City condensed cash flow has 2029 capital of $48,219,500, $5.6 million below project tables plus administration. Its funding narrative uses wastewater $91.897 million while the project table totals $97.497 million. Project AD-S-21 has $5.6 million in 2029, an exact magnitude match; the reason for omission is unverified. The central reference retains the full project-table amount and the original condensed cash interpretation is a named alternative. Original City closing cash also fails annual rollforward beyond rounding; always calculate model cash from source flows.

Sources: [Suburban plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Suburban-Division.pdf), printed 3–4 and 36–37; [City plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Allentown-Division.pdf), printed 3–6 and 51, with printed 51 at physical PDF 55; [Administration plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Administration.pdf), printed 3–4. City cash PDF 7, City projects PDF 55 and budget PDF 16 were visually checked during revision.

**Financing comparability:** Wastewater budget 2027 borrowing is zero against CIP $2.175 million. Subsequent published debt service therefore remains a schedule assumption when paired with the budget anchor. City grants of $3.3 million in 2028 and $3 million in 2029 include projected future awards. Wastewater 2028 contributions of $4.275 million are planned. Show grant reduction/delay and financing changes as sensitivities; do not call planned inflows secured funds.

## Historical costs, growth and customer classes

The [2025 ACFR](https://www.lcawaterworks.org/wp-content/uploads/2026/10/LCA-ACFR-2025.pdf) provides fund actuals for 2023–2025 in the management discussion, ten-year expense data on printed 97 / PDF 112, whole-fund revenue classes on printed 96 / PDF 111 and volume/customer units on printed 127 / PDF 145. Statistical tables are historical supplementary information; do not extend the audit opinion indiscriminately to every statistic.

| Operating expense excluding depreciation/amortization, USD |2023|2024|2025|2020–25 CAGR|
| --- | ---: | ---: | ---: | ---: |
| Water |9,456,991|11,332,546|11,109,287|9.00%|
| Wastewater |14,348,853|15,328,127|15,153,547|6.50%|
| City |21,006,279|20,858,080|24,755,178|6.97%|

These are comparable **accrual** operating expenses excluding depreciation/amortization, not supplier/employee cash outflows or the budget summary's broader cost grouping. Median annual changes over 2021–2025 are 10.21%, 6.82% and 8.52%. They include staffing, service and cost mix, so use them as historical cost stress context rather than pure inflation forecasts. CIP relative expense growth is a transparent planning reference when rebased to 2027; the resulting forecast is derived. Published volume assumptions of 1% for Water and 0% for City are reference judgments, not empirically certain growth.

Western Lehigh 2025 industrial volume is 1,963,211 thousand gallons, or 51.89% of area sales; residential volume is 1,175,926 thousand gallons, or 31.08%. Industrial represents ten units served while residential represents 22,212. Total area volume is 3,783,596 thousand gallons and units served total 22,922. Large industrial alone is 623,041 thousand gallons. **Units served are not customer connections.** Western Lehigh covers Central Lehigh, Upper Milford, Arcadia West, Beverly Hills and Emmaus Consecutive; it excludes Northern Lehigh, Northampton and City.

Whole Suburban Water 2025 charges for service total $17,802,780. Large industrial plus industrial revenue is $6,248,656 (35.10%); residential is $7,722,775 (43.38%). These are whole-fund revenue shares; Western Lehigh volume shares have a narrower geographic scope. Commercial/small-industrial/institutional/other volume includes municipal sales. Never label these independent scopes as one exact class allocation or treat revenue shares as measured marginal tariff exposure.

City class labels include Industrial, Commercial/Institutional, Residential, User Charges, Other and fire charges. The generic User Charges amount of $23,459,676 does not establish municipal or sewer-only scope. Preserve source labels. A whole-City retail exposure, fixed/variable split or industrial revenue allocation is a **selectable assumption** until mapped billing aggregates exist. City industrial units jump from 471 to 959 in 2025 without an inspected explanation; avoid using that class count change as an economic-growth default. Customer units, per-unit demand, industrial shocks and rates should remain separate drivers.

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

Named stresses and selectable scenario assumptions support decision exploration. Any scenario weights are illustrative analyst judgments until calibrated; they must not be presented as measured LCA probabilities or a probability of success. Changing a judgmental prior must remain visible and reversible.

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
