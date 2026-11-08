# Model methodology

Model 0.2.0 · Evidence cutoff November 7, 2026 · Horizon 2027–2031 · Nominal USD

## Decision, scope and evidence

The model asks how customer tariff components, receipt exposure, demand assumptions, operating costs, capital and financing affect each reporting division's cash and an illustrative household bill. Suburban Water, Suburban Wastewater and City Division execute as independent ledgers. City includes both water and sewer. Reporting totals do not authorize interfund transfers. A numerically feasible scenario is not an adopted rate, cost-of-service allocation, management forecast or agreement approval.

Source amounts, derived calculations, planning assumptions and unresolved applicability have separate statuses. The October 26 approved budget uses rates that were still proposals at the November 7 cutoff. The [official finance page](https://www.lcawaterworks.org/lca-finances/) establishes approval context and says further project and financing authorization will be sought. Detailed assumptions and the source register are in [baseline.json](../data/baseline.json); [DATA_GUIDE.md](DATA_GUIDE.md) explains categories and [CONSTRAINTS.md](CONSTRAINTS.md) records agreement limits.

The primary numerical sources are:

- [October 26 board packet](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2026October26-BoardAgendaLCA.pdf), PDF 13 executive summary, 16 detailed cash flows and 18 cash buckets.
- [Suburban capital plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Suburban-Division.pdf), printed 3–4 Water and 36–37 Wastewater.
- [City capital plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Allentown-Division.pdf), printed 3–6 and 51; physical PDF 7 contains the condensed cash table and PDF 55 contains printed 51.
- [Administration plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Administration.pdf), printed 3–4 allocations and projects.
- [2025 ACFR](https://www.lcawaterworks.org/wp-content/uploads/2026/10/LCA-ACFR-2025.pdf), printed 96 revenue classes, 97 expense trends and 127 volume/customer units. Audited fund statements and supplementary statistical tables have different evidentiary status.
- [2027 tariff proposals](https://www.lcawaterworks.org/2027-rates/) and published service-specific rate schedules recorded in the data source register.

## 2027 cash anchors and category normalization

The complete detailed cash schedule reconciles to these unrestricted balances:

| USD | Suburban Water | Suburban Wastewater | City Division |
| --- | ---: | ---: | ---: |
| Opening unrestricted cash |11,598,553|10,356,798|59,300,576|
| Customer receipts |20,484,630|22,234,061|69,839,693|
| Supplier and employee cash expense |14,631,896|18,147,802|27,796,458|
| Raw capital acquisition payments |13,186,250|10,116,250|50,697,500|
| Raw other capital cash payments |551,599|517,251|6,126,740|
| Lease payments |0|0|1,442,981|
| Raw cash debt service |3,923,351|1,473,730|19,170,291|
| New debt draws |5,651,000|0|8,173,780|
| Grants |0|5,725,000|10,966,220|
| Ending unrestricted cash |7,546,095|10,447,425|53,947,019|

Other operating receipts, investment income, capital fees and other receipts complete the ledger. Restricted balances and unrestricted investments are not added to spendable modeled cash. Capital unrestricted cash remains part of the source unrestricted total, with availability for particular uses subject to policy review. City summary ending cash is $1 lower. Wastewater detailed debt service is $1 above summary and includes a $1 investment conversion.

Water summary expense $15,183,495 includes $551,599 other capital cash payments; Wastewater summary expense $18,665,053 similarly includes $517,251. Therefore the summary caption does not define pure operating cash outflows. Comparing it directly with CIP operating expense does not establish a verified update to the same category. For Water the unexplained difference against detailed operating cash expense is $1,319,011, rather than the $1,870,610 difference against the broader summary grouping.

City headline capital $55,897,500 is formed by an **inferred reclassification** of $5.2 million from raw other capital payments to raw capital acquisition payments. Residual other capital payments are $926,740. This normalization preserves total cash burden. Normalized nondebt/noncapex cost is $30,166,179; the summary instead has $30,047,113 expense and $19,289,357 debt service, an offsetting $119,066 classification difference. The raw bridge remains the evidence; normalization is explicitly an analytical grouping.

## Capital reconciliation

The central project-table interpretation totals **$361,312,000**, including allocated administration. Direct project totals are Water $41.435 million, Wastewater $53.080 million, City water $160.975 million, City wastewater $97.497 million and Administration $8.325 million.

| Capital including administration, USD |2027|2028|2029|2030|2031|
| --- | ---: | ---: | ---: | ---: | ---: |
| Suburban Water |13,186,250|12,536,250|6,541,250|5,836,250|5,416,250|
| Suburban Wastewater |10,116,250|23,231,250|16,356,250|3,431,250|2,026,250|
| City central interpretation |55,897,500|72,487,500|53,819,500|41,812,500|38,617,500|

Administration is already included and must not be added again. City 50% allocation is explicit; the 25% allocation to each suburban fund is inferred from exact project-versus-cash differences.

Original condensed cash tables total $355,712,000. City 2029 is $48,219,500 in that table, $5.6 million below water projects $32.86 million + wastewater projects $20.197 million + administration $0.7625 million. The City funding narrative wastewater amount is $91.897 million versus project-table $97.497 million. Project AD-S-21 has $5.6 million in 2029, matching the discrepancy, but its omission is not explained. The central reference retains full project-table capital; a named alternative preserves original condensed cash capital. This is a source interpretation, not a newly adopted plan.

Published City ending cash also fails annual rollforward by $547,148, $567,501, $588,616 and $610,526 in 2028–2031. Derived model cash is always calculated from flows. No hidden residual or source closing-balance plug is inserted. Water reconciles; Wastewater residuals are $1 rounding.

## Central future profile and historical cost blend

Let i = 0 denote 2027. The central settings preserve budget 2027 expense and receipts. Later base customer receipts equal:

`budget customer receipts 2027 × (published CIP user charges in year i / CIP user charges 2027)`.

These CIP charge profiles may include rate changes, volume and cost allocation; they are not all retail tariff paths. In particular, Wastewater's volatile published user-charge changes include signatory and pretreatment economics. Additional retail scenarios act on the defined exposed share of this profile.

For i > 0, annual operating growth is:

`(1 − w) × (CIP operating expense[i] / CIP operating expense[i−1] − 1) + w × historical cost CAGR + extra O&M drift`.

Operating expense compounds from the preceding modeled level. The central history weight w is **25%**, a selectable judgment. The historical CAGR uses comparable 2020–2025 accrual operating expense excluding depreciation/amortization: approximately 9.00% Water, 6.50% Wastewater and 6.97% City. It includes staffing, activity and cost mix, not just inflation. Cash payments and accrual cost history are different bases; the blend is a transparent scenario assumption, not an estimated causal model.

The Published drivers preset sets w = 0; Historical trend sets w = 100%. Neither reproduces published CIP closing cash because the annual budget anchor, normalized categories and source conflicts remain explicit. O&M drift affects growth from 2028, leaving the 2027 operating expense anchor intact.

Other operating receipts, capital fees and other capital payments remain at the named nominal profiles, generally flat. Investment income is held at its 2027 level by default, with a retention factor in 2028–2031; it is not recalculated from a yield or cash balance. Lease payments and future baseline debt service follow the documented schedule. Original CIP debt service includes borrowing assumptions: Wastewater budget 2027 omits CIP borrowing $2.175 million. Consequently future baseline debt is a **schedule sensitivity**, not a reconstructed liability rollforward.

## Household tariff calculation

Bill calculation uses meter size, selected service/system, fixed charges, usage charges and, for City, capital recovery and administrative-order components. Line items are rounded to cents at the source billing-period level; period totals annualize to a monthly equivalent. This does not change actual billing frequency. Water uses marginal declining blocks, not an average price applied to all use. Welshtown minimum and included gallons are separate; Wastewater EDU and municipality options retain distinct source schedules.

The planned starting path uses proposed 2027 components, then annual component growth of 3% Water, an assumed 5% Wastewater and 5.8% City. City 5.8% is a CIP planning driver, not an adopted future tariff; Wastewater 5% is an assumption. Five fixed, usage and add-on uplift arrays default to zero. An uplift compounds on top of the starting path, so a zero uplift does **not** mean zero annual bill growth. Each component's cumulative adjustment through i is the product of `(1 + uplift[j]/100)` for j = 0…i.

The optional true 2026 freeze starts with actual 2026 components and removes future base growth. It freezes all modeled components when uplifts remain zero. A manually selected uplift can still change a frozen starting path. Welshtown and Washington use the source-specific shared 2026/2027 structures documented in the data.

Household gallons and income affect its bill and burden illustration. They never define fund revenue shares. Annual bill / selected household income is a nominal illustrative burden, not a full affordability analysis or census estimate. Income distributions, combined essential-service costs, arrears and assistance eligibility remain outside this aggregate model.

## Fund receipt response and component exposure

To avoid using household gallons to define the fund, the engine calculates adjustment ratios using a **fixed benchmark** of a 5/8-inch meter, 5,000 gallons/month, the division's standard bill type and one EDU. Each adjusted component amount is divided by the default planned-path benchmark amount. Selected household bills may use different inputs without changing these fund ratios.

Let R be base customer receipts, e retail exposure, f fixed share, a add-on share, u = 1 − f − a, and F/U/A the benchmark component ratios. Let:

- N = `[(1 + selected account growth) / (1 + plan volume growth)]^(i+1)` for fixed receipts;
- V = `[(1 + selected volume growth) / (1 + plan volume growth)]^(i+1)` for usage and add-on receipts;
- D = `[(u × U + a × A) / (u + a)]^elasticity`, with elasticity between −1 and 0; the price ratio is 1 when u + a = 0;
- I = `1 + industrial shock × industrial share`, expressing both percentages as fractions;
- C = `(1 + nonretail contract drift)^(i+1)`.

Then modeled customer receipts equal:

`R × [ e × f × F × N + e × u × U × V × D × I + e × a × A × V × D × I + (1 − e) × C ]`.

Account growth and aggregate volume growth are **separate proxies**: account growth scales exposed fixed receipts; volume growth scales usage and add-on receipts. Both can affect 2027 when changed from their default planning values. They default to the same published plan proxy (1% Water; 0% City and Wastewater), not two independently estimated causal parameters. Aggregate volume growth must not also be multiplied by account growth; doing so would double count growth. Industrial shock affects usage and add-on receipts, leaving fixed and nonretail receipts unchanged. Elasticity likewise affects usage/add-on exposure using their weighted component price index, so a City add-on increase can affect price response. These functions are sensitivities, not calibrated behavioral estimates.

| Receipt parameter | Water | Wastewater | City |
| --- | ---: | ---: | ---: |
| Retail exposure, approximate |91.674%|4.485%|70% assumed|
| Fixed share within exposure |30% assumed|30% assumed|40% assumed|
| Usage share within exposure |70% assumed|70% assumed|50% assumed|
| Add-on share within exposure |0%|0%|10% assumed|

Water exposure is an evidence-informed proxy; Wastewater reflects the narrow known common-rate share rather than all retail activity. City aggregate billing mapping is unresolved, so 70% is an explicit assumption with lower/higher scenarios. Generic City “User Charges” is not verified municipal or sewer-only revenue. The historical preset uses Western Lehigh units-served CAGR about 1.84% and volume CAGR about 1.14% as whole-Water proxies, and City water units CAGR about 0.51% and volume CAGR about −0.39% as combined-City proxies. Those geographic and service extrapolations are explicit assumptions; units served are not connections. No independent sewer volume history is substituted. No fixed/variable share is inferred from the selected household's bill. Industrial volume and revenue geography must retain the ACFR scope notes in the data guide.

Capital fees, grants, investment income and borrowing are never multiplied by retail tariff ratios. Nonretail contract drift is an assumed economic change, not an executed municipal allocation formula.

## Cash, additional financing and post-horizon obligations

Each year uses:

`closing cash = opening cash + customer receipts + other operating receipts + investment income + capital receipts + grants + base borrowing + extra borrowing + investment conversions − operating cash expense − lease − other capital payments − total debt service − capex`.

Capex equals the selected capital interpretation times `(1 + capital overrun)`. The optimizer cannot silently eliminate required projects. Existing capital sources remain visible. Additional financing capacity is `max(0, capex − base borrowing − retained/delayed planned grants − capital receipts)`. Extra grants use up to this capacity; extra borrowing uses the remaining capacity and cannot exceed the selected share of capex. This prevents incremental proceeds from filling unrelated operating gaps while preserving disclosed baseline source mismatches.

Planned grant retention and whole-year delay modify scheduled receipts. Delayed amounts beyond 2031 are disclosed separately and do not support cash inside the horizon. No projected grant cycle is represented as an awarded commitment.

Extra loans are drawn in the current year and begin level annual payments in the next year. For principal P, annual rate r and term n, payment is `P × r / [1 − (1 + r)^(-n)]`; at r = 0, it is P/n. Terms are whole years between 5 and 40; default 20 years at 4.5%. Each year's interest accrues on outstanding extra balances before principal repayment. The final extra debt balance and annual extra payment continuing after 2031 are reported. Baseline post-2031 debt is not reconstructed. No issuance costs, refinancing or variable-rate reset is modeled.

## Financial and agreement tests

The engine calculates these annual quantities:

- Cash days = closing unrestricted cash / operating cash expense × 365. Lease and other capital payments are outside this denominator.
- Planning coverage numerator = customer receipts + other operating receipts + investment income − operating cash expense − lease payments.
- Planning coverage = that numerator / total debt service. **Capital fees, grants, borrowing and investment conversions are excluded.** Other capital cash payments remain outside this particular proxy numerator; inspect the cash ledger separately.
- Annual bill growth compares the selected household bill with the prior selected year; 2027 compares with actual 2026 components.

Every year must meet nonnegative cash, selected cash-day and planning coverage floors, optional monthly bill ceiling and selected maximum uplift. Default floors of 180 days and 1.20× are editable planning assumptions. Published indenture ratios remain source values with distinct covenant definitions. Numerical similarity does not prove legal compliance.

City core-growth proxy uses the planned 2027 6.8% core rate driver and subsequent 5.8% driver, compounded with the larger fixed/usage uplift. The modeled ceiling is `max(0, selected CPI + 2.5 percentage points)`. CPI defaults [4.3, 3.3, 3.3, 3.3, 3.3] are scenario inputs. This proxy is a disclosed interpretation; the full executed agreement and amendment applicability remain unresolved. An exceeded ceiling creates rule flags. Without the explicit amendment assumption, those flags prevent implemented-check feasibility; enabling the assumption allows the modeled exception while retaining flags. It does not certify an amendment or approval.

The result separates financial feasibility from all implemented checks. Neither is a legal certification. Additional approvals and cost-allocation evidence remain in the constraint register.

## Finite optimizer

The browser enumerates three uplift shapes on a 0.1 percentage-point grid: level, earlier [+2,+1,0,−1,−2] and later [−2,−1,0,+1,+2], relative to a grid center. Candidate uplifts clip to zero and the selected maximum; duplicates are removed. These are **additional annual component uplifts**, not absolute tariff or bill growth rates. Manual settings can also use negative adjustments within validation bounds; the search family is nonnegative.

The selected lever determines which assumptions are searched:

- Retail: apply the same candidate array to fixed and usage components; other settings remain fixed.
- Balanced: the retail array plus a uniform nonretail contract drift equal to the candidate's largest uplift. This is an assumed contract pathway, not unilateral municipal tariff authority.
- City add-ons: apply the candidate array to add-on components, retaining core fixed/usage settings.

Every candidate is validated and runs the complete annual ledger and rule checks. Contract drift counts toward the uplift policy limit independently of the chosen optimizer lever. The peak objective ranks feasible candidates by highest **annual household bill growth**, then total five-year nominal bills, then squared year-to-year bill-growth changes. The bills objective ranks by total nominal bills, then peak bill growth, then smoothness. No discounted welfare, class equity or legal objective is hidden in the score.

A result is optimal only within this finite family and selected lever. No feasible candidate means none was found in that family under those settings. It does not prove all possible rate/funding designs impossible. An add-on search may have a different feasible set from retail or balanced assumptions.

## Scenarios, comparisons and reproducibility

The named central case uses the 2027 budget, project-table capital and 25% historical cost blend. Named alternatives include Published drivers, original Condensed capital table, actual 2026 tariff freeze, historical trend, industrial demand reduction, cost pressure, grant delay, additional debt and lower/higher retail exposure. The selected scenario is compared with the **named central case** for the same division and household dimensions. A published source balance is not an unexplained comparison line.

These scenarios are judgmental possibilities. No empirical probability of success, confidence interval or posterior is claimed. If scenario weights are displayed, they are assumed decision weights. Calibration would require consistent historical cash and billing aggregates, weather and activity data, project outturns, grant histories, structural-break annotations and out-of-sample validation.

Exports contain schema 2.0, model 0.2.0, cutoff, exact `dataRevision` SHA-256 fingerprint, settings, assumptions, annual outputs, terminal exposures and source URLs. Import requires matching versions, cutoff and baseline fingerprint and recalculates results; older one-fund scenarios are not silently migrated. No AI service, server secret or production ERP is required. The synthetic connector remains a separate schema demonstration with its own supported fund scope; it is not evidence of production connectivity.

The equations can be reproduced in Excel or a Power BI semantic model. Preserve signed cash categories, fund boundaries, proposed/adopted status, the project conflict, cents rounding and explicit assumptions before comparing outputs. [MODEL_REVIEW.md](MODEL_REVIEW.md) and [STATE.md](STATE.md) hold observed validation; this methodology does not claim checks that have not run.
