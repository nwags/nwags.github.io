# Financial and model glossary

Plain-English definitions for the WaterWorks planning model 0.2.0. The [interactive glossary](../glossary.html) has stable anchors used by the dashboard; [structured JSON](../data/glossary.json) carries the same entries for other analytical tools. Definitions follow the implemented [model](../model.mjs), [methodology](METHODOLOGY.md), [constraint register](CONSTRAINTS.md) and [data guide](DATA_GUIDE.md).

## Chart and model conventions

All financing charts use unrounded rows from the selected division and scenario. Display amounts are nominal USD. Opening cash is a stock, not an annual source. Sources minus uses reconcile to net movement. Capital funding is an aggregate timing comparison with no project earmarking or approval claim. See the shared [chart manifest](../finance-charts.mjs) for ordered series, colors, units and formulas.

## Revenue versus cash receipts

Revenue is income recognized under an accounting basis. A cash receipt is money actually received. Recognition and collection can happen in different periods. Borrowing and selling an investment can bring in cash without creating operating revenue.

**In this model:** The annual planning ledger uses cash receipts and payments. Historical service-charge revenue and operating expense are accounting evidence with different timing and scope; do not assume they equal the cash ledger.

Related: Customer receipts, Borrowing / debt draw, Investment conversions.

## Customer receipts

Cash collected from customers for the division’s services, including modeled retail and residual contract or other customer amounts.

**In this model:** customer = fixedReceipts + usageReceipts + addonReceipts + contractReceipts. The illustrated household bill does not determine these total receipts.

Related: Retail exposure / receipt allocation, Fixed charge / fixed receipts, Variable / usage charge.

## Operating receipts

Cash from service operations plus other operating receipts and investment income under this model’s planning convention. This grouping is a model definition, not a statement of formal accounting classification.

**In this model:** operatingReceipts = customer + otherOperating + investment. Grants, capital fees, borrowing and investment conversions are outside this grouping.

Related: Coverage proxy / DSCR, Investment income, Revenue versus cash receipts.

## Investment income

Cash interest or other investment earnings. Earning interest is different from converting the underlying investment into cash.

**In this model:** investment is a separate receipt series. The investment-retention control changes the 2028–2031 nominal baseline; 2027 remains anchored. No balance-and-yield forecast is reconstructed.

Related: Investment conversions, Operating receipts.

## Investment conversions

Moving an existing investment into cash releases an asset already held. The amount converted is not new income.

**In this model:** investmentConversions is included in cash sources but excluded from operating receipts and the coverage numerator. It does not automatically make restricted investments spendable.

Related: Investment income, Restricted cash, Annual cash sources.

## Annual cash sources

All modeled inflows during a year: customer and other operating receipts, investment income, capital receipts, grants, borrowing and investment conversions.

**In this model:** cashSources equals receipts + baseBorrowing + extraBorrowing + investmentConversions. Opening cash is a starting stock, not a receipt during the year.

Related: Annual cash uses, Opening and ending cash, Borrowing / debt draw.

## Annual cash uses

All modeled outflows during a year: operating payments, lease payments, other capital payments, debt service and capital spending.

**In this model:** cashUses = operatingExpense + lease + otherCapitalPayments + baseDebtService + extraDebtService + capex. Positive uses are plotted upward; the cash bridge subtracts them.

Related: Annual cash sources, Net cash movement / cash surplus or shortfall, Capex / capital spending.

## Borrowing / debt draw

Cash received from a lender that creates an obligation to repay principal, normally with interest. A loan can improve today’s cash while adding future payments.

**In this model:** Planned and additional borrowing stay separate. Incremental borrowing is capped after existing capital funding; additional loans begin payments the next year. Borrowing is excluded from operating income and the coverage numerator.

Related: Debt service, Principal, Interest, Remaining incremental debt / terminal obligations.

## Grants / contributions

Funding or contributions expected from outside parties. A grant is distinct from a repayable loan, but its award, eligibility, timing and conditions still matter.

**In this model:** Planned and additional grants are separate receipts. Retention and delay controls are assumptions; receipts delayed beyond 2031 do not support cash inside the horizon. No selected amount establishes an award.

Related: Borrowing / debt draw, Identified capital funding, Scenario assumption / evidence status.

## Capital receipts / fees

Cash receipts associated with capital, such as capacity or capital-related fees, kept separate from customer operating receipts.

**In this model:** capitalReceipts remains a distinct baseline series and is deducted before capping hypothetical additional grants and borrowing. It is excluded from the coverage numerator.

Related: Identified capital funding, Customer receipts, Coverage proxy / DSCR.

## Identified capital funding

The chart’s sum of planned borrowing, additional borrowing, planned grants, additional grants and capital receipts during the year.

**In this model:** This aggregate timing comparison does not allocate a source to a specific project or certify eligibility, earmarking or approval. Operating surplus and unrestricted reserves can also support capital cash needs.

Related: Capital less identified funding, Grants / contributions, Borrowing / debt draw, Capex / capital spending.

## Capital less identified funding

The positive difference between capital spending and the identified borrowing, grants and capital receipts in that year.

**In this model:** capitalResidual = max(0, capex − identifiedCapitalFunding). It is not a cash deficit or a required new loan. The separate excess measure is max(0, identifiedCapitalFunding − capex). Inspect all cash sources, uses and ending cash.

Related: Identified capital funding, Net cash movement / cash surplus or shortfall, Unrestricted cash / liquidity.

## Debt service

Payments on debt, generally principal plus interest. Debt service is an outflow; a new debt draw is an inflow.

**In this model:** debtService = baseDebtService + extraDebtService. The cash ledger and coverage denominator include both. The published baseline schedule does not supply a complete principal/interest split or remaining-liability rollforward.

Related: Principal, Interest, Coverage proxy / DSCR, Borrowing / debt draw.

## Principal

The amount borrowed that remains to be repaid, excluding interest. Paying principal reduces the outstanding loan balance.

**In this model:** Additional-loan balances are rolled forward to estimate outstanding incremental principal after 2031. Remaining baseline principal is not estimated from the published service schedule.

Related: Interest, Debt service, Remaining incremental debt / terminal obligations.

## Interest

The charge for using borrowed money, usually calculated as a rate applied to outstanding principal over time.

**In this model:** Incremental loans use the selected fixed annual interest rate and term with level annuity payments. Changing that rate does not reprice the published base debt-service schedule.

Related: Principal, Level annuity payment, Debt service.

## Level annuity payment

A loan structure with a generally constant periodic payment; the shares of interest and principal change as the balance is repaid.

**In this model:** Annual payment = P × r / (1 − (1+r)^−n), with r as a decimal annual rate and n as years. At zero interest it is P/n. Payments start the year after each additional draw.

Related: Interest, Principal, Remaining incremental debt / terminal obligations.

## Remaining incremental debt / terminal obligations

The additional loan principal still outstanding at the end of the model horizon, plus the continuing payment obligations beyond it.

**In this model:** The dashboard reports extra principal after 2031 and estimated additional annual payment in 2032. These are incremental loans only; they are not the division’s full debt balance.

Related: Principal, Borrowing / debt draw, Level annuity payment.

## Capex / capital spending

Cash spent on long-lived assets or improvements, such as treatment facilities, mains and major rehabilitation. Capital cash spending differs from annual depreciation expense or a bill’s capital charge.

**In this model:** capex follows the selected project or condensed cash schedule, adjusted for the overrun assumption. Required project scope is retained. Separate other capital payments are not silently folded into this series.

Related: CIP — capital improvement plan, Opex / O&M / operating cash payments, Other capital payments.

## Opex / O&M / operating cash payments

The recurring cash costs of running the system, such as labor, energy, chemicals and maintenance. O&M means operations and maintenance.

**In this model:** operatingExpense is the cash-payment path anchored to 2027, with later growth blended from plan drivers and historical expense growth. It is the sole cash-days denominator and excludes debt, lease and capital payments.

Related: Capex / capital spending, Cash days / days of operating cash, Historical cost-trend blend.

## Other capital payments

Cash outflows in the source bridge that are distinct from modeled project capital spending, operating expense, lease payments and debt service.

**In this model:** otherCapitalPayments is a separate uses series to preserve source classification and avoid counting it twice. It affects cash but is excluded from the coverage numerator.

Related: Capex / capital spending, Annual cash uses, Coverage proxy / DSCR.

## Lease payments

Cash paid under a lease or concession arrangement, shown separately from operating payments and debt service.

**In this model:** lease reduces both annual cash and the planning coverage numerator. Its inclusion here does not establish a legal covenant definition or agreement interpretation.

Related: Annual cash uses, Coverage proxy / DSCR.

## Restricted cash

Cash whose use is limited by law, contract, covenant or another binding condition. A positive balance does not automatically make it available for ordinary operations or any capital project.

**In this model:** Restricted balances are excluded from modeled spendable cash. The dashboard does not release restrictions or infer permitted uses from an aggregate report.

Related: Unrestricted cash / liquidity, Opening and ending cash, Identified capital funding.

## Unrestricted cash / liquidity

Cash available within the modeled division boundary without the specific restrictions excluded by the source bridge. Liquidity describes capacity to make payments when due.

**In this model:** Ending unrestricted cash rolls forward from opening cash plus net cash movement. Other divisions’ cash and unconverted investments are not silently added. A positive balance can still miss a chosen cash-days target.

Related: Restricted cash, Cash days / days of operating cash, Net cash movement / cash surplus or shortfall.

## Opening and ending cash

Opening cash is the balance at the start of the year. Ending cash is the balance after the year’s inflows and outflows. These are stocks measured at a point in time.

**In this model:** cash = openingCash + netFlow. Each next year starts with the previous closing balance. Opening cash is excluded from annual sources to distinguish reserves from new inflows.

Related: Annual cash sources, Net cash movement / cash surplus or shortfall, Unrestricted cash / liquidity.

## Net cash movement / cash surplus or shortfall

Annual inflows less annual outflows. Positive movement adds to reserves; negative movement draws reserves down. Negative movement does not by itself mean the ending balance is below zero.

**In this model:** netFlow = cashSources − cashUses. Check ending cash and targets as well as the movement. Capital residual is a separate, narrower comparison.

Related: Opening and ending cash, Capital less identified funding, Cash days / days of operating cash.

## Coverage proxy / DSCR

A planning ratio comparing cash available before debt service with the debt payments due. DSCR means debt-service coverage ratio; an actual covenant can use different permitted adjustments and definitions.

**In this model:** coverage = (customer + otherOperating + investment − operatingExpense − lease) / debtService. Capital fees, grants, debt draws and investment conversions are excluded from the numerator. If debt service is zero the ratio is not applicable. The selected floor is not a verified covenant.

Related: Debt service, Operating receipts, Planning feasibility / constraint.

## Cash days / days of operating cash

The number of days of operating payments that the ending unrestricted balance could cover at that year’s average daily operating cost.

**In this model:** cashDays = cash / operatingExpense × 365. requiredCash = operatingExpense / 365 × selected minimum days. Debt service, lease and capital are outside this denominator; a target is a planning assumption.

Related: Unrestricted cash / liquidity, Opex / O&M / operating cash payments, Planning feasibility / constraint.

## Tariff / rate schedule

The rules and unit prices used to calculate a customer’s charge for a defined service, class, meter and billing period.

**In this model:** Use the relevant service scope and period. 2027 component tariffs are proposed at the evidence cutoff; later reference growth and incremental uplifts are explicit scenario assumptions.

Related: Fixed charge / fixed receipts, Variable / usage charge, Incremental tariff uplift.

## Fixed charge / fixed receipts

A customer charge that does not vary directly with the illustrated gallons in the billing period, often linked to meter size or service availability.

**In this model:** The bill’s fixed line is calculated from tariff components. The fund’s fixedReceipts uses an assumed share of exposed customer receipts and a separate account-growth factor; one household’s bill is not that allocation.

Related: Variable / usage charge, Retail exposure / receipt allocation, Customer receipts.

## Variable / usage charge

A charge that varies with billable usage, such as dollars per 1,000 gallons. Marginal blocks apply each block’s rate only to usage inside that block.

**In this model:** usageReceipts responds to the assumed usage share, tariff ratio, volume growth, industrial shock and optional elasticity. Common wastewater alternatives can have different billable-usage rules.

Related: Fixed charge / fixed receipts, Price elasticity / demand response, Retail exposure / receipt allocation.

## EDU — equivalent dwelling unit

A standardized unit representing a dwelling-equivalent level of service or capacity. It is not necessarily the number of people, meters or actual gallons.

**In this model:** Applicable wastewater fixed components use the selected EDU count. Other agreements can define allocation differently; this household example does not reconstruct all commercial or industrial EDU determinations.

Related: Tariff / rate schedule, Variable / usage charge.

## CCRC — capital cost recovery charge

A separately identified capital-related charge collected from the applicable City customer through the tariff. It is customer money, distinct from an outside grant or a repayable loan. Collection is also distinct from a project’s cash spending in that year.

**In this model:** City bill components include water and sewer capital recovery. Forward add-on shares and growth are assumptions; the model does not certify eligible-project allocation or duplicate pass-throughs already embedded in published prices.

Related: Capex / capital spending, AO — administrative order, Retail exposure / receipt allocation.

## AO — administrative order

A regulatory order; in the City bill context, AO refers to the separately identified administrative-order fee.

**In this model:** The City calculator shows its applicable fee component. Forward add-on receipt share and growth are assumptions. The fee does not itself establish the cost, timing or eligibility of every compliance project.

Related: CCRC — capital cost recovery charge, Capex / capital spending, Tariff / rate schedule.

## CPI — consumer price index

An index of consumer prices. An annual CPI percentage measures change in the index; the chosen geography, period and seasonal convention matter.

**In this model:** The City core-ceiling proxy uses max(0, selected CPI + 2.5 percentage points). The documented agreement convention is Northeast CPI-U, not seasonally adjusted, annual change through the prior June. Future CPI inputs are assumptions.

Related: Percent versus percentage points, Incremental tariff uplift, Scenario assumption / evidence status.

## CAGR — compound annual growth rate

The constant yearly rate that would turn a starting value into an ending value over a stated number of intervals. It does not say that every intervening year grew at that rate.

**In this model:** CAGR = ((end / start)^(1 / number of years) − 1) × 100%. Historical expense CAGR is one scenario growth input, not pure inflation or a causal forecast.

Related: Historical cost-trend blend, CPI — consumer price index.

## Historical cost-trend blend

A selected mix of published annual expense-growth drivers and observed historical operating-expense growth.

**In this model:** From 2028, growth = plan growth × (1 − historyWeight/100) + historical growth × historyWeight/100 + extra O&M drift/100. The 25% central weight is judgment, not a calibrated probability.

Related: CAGR — compound annual growth rate, Scenario prior / judgmental weight, Opex / O&M / operating cash payments.

## Retail exposure / receipt allocation

The assumed fraction of customer receipts that responds to the modeled retail tariff components. It is different from the residential share of accounts or all division cash sources.

**In this model:** Within exposed receipts, fixed, usage and applicable City add-on shares are modeled separately. Residual contract/other customer receipts use a different drift. Grants, borrowing and investment income are not scaled as retail sales.

Related: Customer receipts, Fixed charge / fixed receipts, Scenario assumption / evidence status.

## Price elasticity / demand response

A sensitivity describing how usage changes relative to a price change. A negative value represents lower modeled demand when the relevant usage price rises.

**In this model:** Zero means no modeled price response. The selected value affects exposed variable and City add-on receipts using a relative price index; it does not change the illustrative household gallons. This is an assumption, not a measured response.

Related: Variable / usage charge, Retail exposure / receipt allocation.

## Incremental tariff uplift

A scenario percentage applied on top of the selected reference tariff path. Zero uplift keeps that reference path, which can already include annual growth.

**In this model:** Fixed, usage and City add-on uplifts compound separately. Freeze 2026 tariffs is a distinct starting path. Maximum uplift bounds the implemented search/policy control, not necessarily total bill growth or legal authority.

Related: Tariff / rate schedule, Percent versus percentage points, Planning feasibility / constraint.

## Percent versus percentage points

A percentage is a proportional change or share. A percentage point is an absolute difference between two percentages: growth increasing from 3% to 5% is an increase of 2 percentage points.

**In this model:** O&M drift and CPI-plus-margin use additive percentage points. Tariff uplifts multiply a reference price path; combining 5% growth and a 2% uplift gives 7.1%, not 7%.

Related: CPI — consumer price index, Incremental tariff uplift.

## Scenario prior / judgmental weight

A starting belief or judgment used to frame a scenario. A weight becomes a calibrated probability only when supported by an appropriate evidence-based estimation method.

**In this model:** The named scenarios have no measured likelihoods. The 25% historical-cost blend is a formula weight, not a 25% probability. A central planning estimate is a starting scenario, not a statistically proven most likely outcome.

Related: Scenario assumption / evidence status, Historical cost-trend blend.

## Scenario assumption / evidence status

A declared input used to explore a conditional result. Verified source amounts, derived calculations, assumptions and unresolved items describe different levels and kinds of evidence.

**In this model:** Changing a grant, debt, exposure, CPI or agreement control creates an analytical case. It does not establish an award, executed agreement, approved rate or observed customer behavior. Export settings and the data fingerprint to preserve the case.

Related: Planning feasibility / constraint, Scenario prior / judgmental weight.

## Planning feasibility / constraint

A result passes the numerical checks actually implemented under its selected assumptions. A constraint is one of those tests, such as a cash-days floor or bill ceiling.

**In this model:** Every modeled year is checked. Financial-target status and City rule flags are distinct; neither certifies legal compliance or approval. A failed finite search rules out its tested candidate family, not every possible policy.

Related: Coverage proxy / DSCR, Cash days / days of operating cash, Finite optimizer / feasible rate path.

## Finite optimizer / feasible rate path

A search that compares a specified set of candidate rate paths and keeps a passing candidate according to the selected objective.

**In this model:** The model checks level, earlier and later shapes on a 0.1-percentage-point grid. It does not establish a global continuous optimum. Costs, financing and other selected assumptions remain in force.

Related: Planning feasibility / constraint, Incremental tariff uplift, Scenario assumption / evidence status.

## CIP — capital improvement plan

A multiyear schedule of planned capital projects and associated estimates. A plan can identify expected funding without proving each future receipt or approval.

**In this model:** The 2027–2031 detailed project basis and original condensed cash basis remain selectable. The City 2029 source difference is disclosed; the optimizer does not remove required projects.

Related: Capex / capital spending, Identified capital funding.

## Nominal dollars / model horizon

Nominal amounts are dollars of the year shown, without removing inflation. The horizon is the span of years explicitly simulated.

**In this model:** Amounts are nominal USD for 2027–2031. Five-year sums are not discounted present values. Delayed grants and outstanding additional debt beyond 2031 are reported separately.

Related: Remaining incremental debt / terminal obligations, CPI — consumer price index, Grants / contributions.

## Division / fund boundary

The reporting and modeling boundary within which receipts, expenses, cash and financing are kept.

**In this model:** Suburban Water, Suburban Wastewater and City Division each run independently. A combined reporting total does not authorize moving cash between divisions. City includes water and sewer within its own reporting scope.

Related: Unrestricted cash / liquidity, Customer receipts.

## Capital coverage / planned capital requirement

A capital-coverage measure compares available funding or internally generated resources with a defined capital requirement. The precise numerator, denominator and policy meaning depend on the source document. It is different from coverage of debt payments.

**In this model:** The dashboard does not reconstruct or certify an LCA capital-coverage ratio. Its identified-funding comparison displays cash amounts against capex. Its separate coverage proxy divides operating cash available by debt service; that proxy must not be relabeled capital coverage.

Related: Coverage proxy / DSCR, Identified capital funding, Capex / capital spending.

## Cash generated after recurring and other capital payments

Cash from customer, other operating and investment receipts remaining after operating payments, lease, all debt service and separate other capital payments. It can support project capital or add to reserves.

**In this model:** The five-year bridge calculates customer + otherOperating + investment − operatingExpense − lease − debtService − otherCapitalPayments. This is a disclosed whole-division cash bridge convention, not an approved project-funding allocation or accounting income.

Related: Net cash movement / cash surplus or shortfall, Capital less identified funding, Coverage proxy / DSCR.

## Reserve draw / reserve build

Using cash held at the beginning of a period to support payments reduces reserves. Receiving more cash than is spent builds reserves.

**In this model:** The five-year financing bridge shows opening unrestricted cash minus final unrestricted cash. A positive value is a reserve draw; a negative value is a reserve build. It reconciles the entire selected division and does not earmark reserves to projects.

Related: Opening and ending cash, Unrestricted cash / liquidity, Cash generated after recurring and other capital payments.
