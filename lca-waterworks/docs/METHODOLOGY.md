# Model methodology

Version 0.1.0 · Evidence cutoff November 7, 2026 · Horizon 2027–2031

## 1. Decision and scope

The model asks how annual rate indices, operating costs, customer/usage growth, capital costs, and financing assumptions change Suburban Water liquidity, debt-service capacity, and an illustrative household water bill. It preserves the entire published capital cash-spending schedule. It does not allocate costs among municipalities or customer classes, alter contractual City charges, calculate wastewater signatory allocations, or recommend an adopted tariff.

The account of legal and agreement constraints is in [CONSTRAINTS.md](CONSTRAINTS.md). A feasible model result means only that the stated arithmetic tests pass under the selected inputs. All scenarios retain an unresolved agreement/adoption status. Sources below are public LCA records, with original URLs and locators in [baseline.json](../data/baseline.json).

## 2. Source hierarchy and reconciliation

The [October 26, 2026 board packet](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2026October26-BoardAgendaLCA.pdf), PDF pp. 13, 16 and 18, supplies the 2027 cash budget. [Final approval slides](https://www.lcawaterworks.org/wp-content/uploads/2026/10/LCA-2027-Budget-Final-Review-Approval-102626.pdf) supply the financial summary, household examples, and rate-adoption timeline. [LCA's finance page](https://www.lcawaterworks.org/lca-finances/) identifies budget approval and the conceptual nature of capital-plan adoption.

The [2027–2031 Suburban capital plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Suburban-Division.pdf), printed pp. 3–4 / PDF pp. 6–7, supplies the original multiyear projection. It uses a different first-year expense and receipts snapshot. Its original values are preserved rather than silently merged into the approved budget.

| 2027 cash item | Approved budget anchor, USD | Treatment |
| --- | ---: | --- |
| Opening unrestricted cash | 11,598,553 | Cash-flow schedule; executive summary is $1 lower |
| Customer cash receipts | 20,484,630 | Subject to rate/growth sensitivity |
| Other operating cash receipts | 187,234 | Held flat in reference |
| Capital fee and other receipts | 1,086,054 | Held flat in reference |
| Investment income | 831,720 | Held flat; no balance-based recalculation |
| Total cash revenue | 22,589,638 | Sum of the four receipt categories |
| Cash operating expense | 15,183,495 | Budget cash categories; includes $551,599 other capital cash payments |
| Debt service | 3,923,351 | First-year approved budget amount |
| Capital cash spending | 13,186,250 | Full cash-flow schedule |
| New borrowing | 5,651,000 | Published planned funding, not unrestricted revenue |
| Ending unrestricted cash | 7,546,095 | Exactly reproduced by the ledger |

The identity is opening cash + revenue − operating expense − debt service − capital spending + new borrowing = closing cash. Closing cash comprises $7,309,406 operating unrestricted cash and $236,689 capital unrestricted cash. A separate $1,893,397 restricted-cash balance and $3,148,223 investment balance are excluded from model spendable cash. An identical $236,689 appears in an escrow line in the source; it is a different source category and is not counted again.

Original CIP first-year cash operating expense is $13,312,885, **$1,870,610 below the approved budget anchor**. Original CIP closing cash is $6,656,587; it starts from different cash and operating assumptions. The model never starts with the budget cash balance and then copies the CIP's later closing balances. That would break the ledger.

Cash-flow capital spending totals **$43,516,250** over five years. The direct project table totals $41,435,000. The model uses the cash-flow schedule consistently; it does not assume the difference can be removed. Planned borrowing totals **$17,751,000**. No separate Suburban Water grant award is presumed from another division's grant discussion.

## 3. Derived reference for 2028–2031

Let t=0 represent 2027. Dollar amounts retain full floating-point precision until display.

- Customer receipts begin at $20,484,630. For each later reference year, multiply by 1.03 × 1.01. The 3% rate and 1% growth assumptions come from the CIP; the dollar anchor comes from the budget.
- Other reference receipts remain $2,105,008 annually. This includes investment income and capital-related receipts, so it is a simplifying assumption rather than a forecast of collections or returns. A separate retention control reduces the $831,720 investment-income component in 2028–2031 while preserving the 2027 budget anchor. Zero future income is a limiting sensitivity case, not a forecast; it reduces terminal cash by $3,326,880 relative to the default. The model does not derive income from a cash/investment yield schedule.
- Reference operating expense in year t equals $15,183,495 × (original CIP expense in year t / original CIP 2027 expense). This preserves the CIP's successive expense growth factors while updating their level.
- Reference 2027 debt service is the budget amount. Later years use CIP current-debt plus new-debt service. Those schedules already include the plan's borrowing; the demo does not add another payment for the same baseline loans.
- Capital spending and planned borrowing use each year's CIP cash-flow amounts.
- The ledger recomputes closing cash in every year.

These later values are **our derived reference scenario, not an approved LCA forecast**. The difference between the original CIP and the reanchored cash line is a consequence of explicit modelling choices, not a claim that LCA predicts a shortfall. A production refresh must reconcile the two source schedules with finance staff and rebuild future interest income, expenditures and receipts from approved assumptions.

## 4. Scenario transformations

### Rates and customer growth

The reference rate indices are [3.5, 3, 3, 3, 3] percent. The cumulative relative rate factor through year t is the product of (1 + selected index/100) / (1 + reference index/100). The selected growth factor relative to the reference is ((1 + selected growth/100) / 1.01) raised to t+1. Therefore a changed growth input affects 2027 as well as subsequent years.

The rate-sensitive share defaults to 100% of customer cash receipts. This is a disclosed aggregate simplification, not evidence that all customer classes or special systems have identical rates. A reduced exposure share allows sensitivity testing; a real class-level billing extract is required to replace it. Other cash receipts do not respond to rate changes.

At zero elasticity, customer receipts equal reference customer receipts × relative growth × [(1 − exposure) + exposure × relative rate]. Optional negative elasticity adds a demand-response factor (relative rate raised to elasticity) to the variable component only. The fund's variable-revenue share is proxied by the variable share in the published 5,000-gallon/month residential bill, not by measured class revenue. Changing the household usage control never changes fund revenue. Elasticity is relative to the reference price path, so the default reference remains calibrated when elasticity is changed alone.

These are sensitivity functions. They do not estimate new connections, industrial usage, weather response, water losses, collections, arrears, or price elasticity from actual billing data.

### Operating and capital costs

Selected operating expense equals reference expense × (1 + extra annual O&M drift/100) raised to t+1. The drift is an additional compounding growth factor. It is not an independently forecast CPI series, and multiplying growth factors differs slightly from simply adding their percentage points.

Capital cost increases multiply the entire capital schedule by 1 + selected increase/100. The control cannot be negative, and the optimizer cannot omit projects. The model does not determine which projects are legally required, reschedule work, or establish procurement and project approvals.

### Additional grants and debt

Both default to zero. Additional annual grants are capped at capital spending less planned borrowing. Additional borrowing equals the selected share of baseline capital spending, capped again at capital spending less planned borrowing and additional grants. This prevents surplus modeled proceeds from funding unrelated operating spending.

Extra loans are drawn at year end. Level annual payments begin in the following year, at the selected interest rate. The browser's standard controls use a 20-year term; the validated scenario schema supports whole terms of 5–40 years. Payment equals principal × interest / [1 − (1 + interest)^(-term)], or principal / term when interest is zero. Interest is applied to each outstanding balance; principal reduces that balance. Ending extra debt is shown because most of it remains after 2031. No present-value comparison, issuance cost, refinancing, variable-rate reset on existing loans, or covenant approval is assumed.

Grants and debt proceeds enter the capital cash ledger; they do not increase the operating coverage numerator. Hypothetical financing is not an identified award, commitment, loan authorization, or subsidy.

## 5. Household bill and affordability illustration

The [published water schedule](https://www.lcawaterworks.org/customer-service/rates/water-rates/) and [2027 proposals](https://www.lcawaterworks.org/2027-rates/) provide the common residential 5/8-inch example. Quarterly fixed charges are $36.50 for 2026 and $38.20 proposed for 2027; volume charges are $4.14 and $4.26 per 1,000 gallons respectively. At 15,000 gallons per quarter, annual bills are exactly $394.40 and $408.40.

The proposed 2027 monthly equivalent is fixed charge / 3 + monthly gallons / 1,000 × volume charge. The model scales that bill using the cumulative relative rate factor and the reference's subsequent 3% annual increases. Both bill components scale together; this is not a redesign of fixed/variable shares or blocks. The 3.5% 2027 planning index maps to the exact proposed components; the household's exact increase is approximately 3.55%. Consequently, a zero 2027 index is an index freeze and does not exactly recreate the 2026 component tariff. Consult the published 2026 comparison for the actual historical bill.

Usage is limited to 500–15,000 gallons/month for this illustration. Welshtown Road, sprinkler charges, other meter sizes, special agreements and other tariff blocks are outside its scope. Monthly figures are equivalents of a quarterly tariff, not a statement about billing frequency.

Annual water bill / selected annual household income is an illustrative burden measure. Default income of $35,000 is an assumption, not a census statistic. It excludes sewer, taxes, rent, energy and other basic costs and does not establish affordability. A serious affordability study needs local income distributions, low-income household use, arrears and disconnections, assistance eligibility, and combined essential-service bills.

## 6. Financial tests

Each year must satisfy all selected tests:

1. Closing cash is nonnegative.
2. Closing cash / that year's cash operating expense × 365 is at least the cash-days floor.
3. (Cash revenue − cash operating expense) / debt service meets the coverage floor.
4. The annual rate index does not exceed the selected maximum.
5. If enabled, the illustrated monthly bill in **every year** is at or below the selected nominal-dollar ceiling.

Initial floors are 180 days and 1.20×. They are editable planning assumptions, not asserted legal covenants. The 2027 simplified coverage proxy happens to reconcile to the published rounded 1.89×, but that does not prove later indenture compliance. Published City and wastewater coverage ratios use different adjustments and are displayed only as published. They must not be recomputed by dividing their displayed aggregate revenues and expenses.

The cash contribution / capital ratio is cash after operating expense and debt service divided by capital spending. It is not Allentown's contractual Capital Cost Recovery Charge, which has a separate formula and approval process.

## 7. Optimization and interpretation

The browser enumerates a disclosed finite family rather than solving a global continuous optimization problem. Center values run from 0 to the selected maximum at 0.1-percentage-point resolution. Each center generates three five-year paths: level [0,0,0,0,0] offsets; earlier increases [+2,+1,0,−1,−2]; and later increases [−2,−1,0,+1,+2]. Values are clipped to zero and the maximum, rounded to 0.1 point, and duplicate paths removed. Manual scenarios may use negative indices down to −5%; the search only considers nonnegative increases.

Each candidate is fully simulated and rejected if any annual test fails. The lowest-peak objective orders feasible paths by highest annual increase, then the sum of squared changes between successive years, then total five-year nominal household bills. The lowest-bill objective orders by total nominal household bills, then highest annual increase, then year-to-year changes. These are lexicographic priorities, not hidden weighted sums. There is no discounting, welfare function, class equity objective, or legal compliance objective.

With default inputs and a 15% bound, 453 unique candidates are checked. The lowest-peak result is a level 5.4% index path. This is an illustrative result for this release's specific assumptions. The original reference misses the selected cash floor in 2028–2031. Neither observation is a proposed LCA rate action. A failure to find a candidate means no feasible path exists **within this finite family**, not that every possible rate/funding design is impossible.

## 8. Possibilities and stress tests

The named stresses are O&M drift +1 point, customer growth −1 point, capital cost +10 points, removal of hypothetical grants, extra-debt interest +2 points, removal of investment income in 2028–2031, and their joint adverse combination. Inputs stop at the published validation bounds. If an input already reaches the bound, the UI says so. A grant or interest case with no exposure is identified as unchanged; it does not count as new robustness evidence.

These are judgmental possibilities. No frequency, probability of success, confidence interval, or Bayesian posterior is assigned. Calibration would require consistent actuals, policy/regime annotations, weather and consumption data, capital outturns, and grant-stage histories. Marginal distributions and dependence would need validation and out-of-sample testing before running a probabilistic forecast.

## 9. Reproducibility and limits

Scenario JSON includes schema version, model version, evidence cutoff, settings, output rows, scope and source URLs. Imports must match this release's schema, model and cutoff; outputs are recalculated from settings. The annual CSV is an audit/migration output, not a complete scenario backup. Calculations run locally without external APIs. Source changes require a deliberate versioned refresh; the live dashboard does not silently fetch revised financial inputs.

Tests cover cash identities, source anchors, fund separation, debt timing, financing caps, household/fund independence, input rejection, optimization feasibility/infeasibility and scenario reproduction. They cannot validate unknown agreements or unobserved operational behavior. The independent review and release observations belong in [STATE.md](STATE.md).
