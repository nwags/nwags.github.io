# CEO demonstration guide — three-division planning

## Intent and preparation

Demonstrate how a business analyst makes five-year rate and funding tradeoffs inspectable: customer bills, annual cash, capital delivery, financing, uncertainty, and agreement assumptions. The executable divisions are **Suburban Water, Suburban Wastewater, and City Division**, with separate financial boundaries. This is an independent public-data prototype, not an LCA forecast or adopted tariff recommendation.

Allow 10–12 minutes. Open the dashboard, user manual, and Model methods page. Evidence cutoff: **November 7, 2026, America/New_York**. Model: **0.2.0**. Scenario schema: **2.0**. Select a division and the **Central planning estimate** preset before beginning. Export any case that must be retained; a comparison held in browser memory is not a durable scenario record.

The central case preserves the approved 2027 budget anchor, uses detailed project capital, and blends future operating-cost growth with 25% weight on observed 2020–2025 cost growth. Later years are derived. The **Published drivers** preset removes that historical cost blend, while **Condensed capital table** changes the capital basis as well. Neither is a claim that LCA published the exact resulting cash forecast.

## Demonstration sequence

| Time | Action | Point to establish |
| --- | --- | --- |
| 0–1 minute | Show division selector, horizon, and cutoff. | All three divisions are executable; their cash, debt, and assumptions remain separate. Customer rates for 2027 are proposals at this cutoff. |
| 1–2 minutes | Open Evidence & assumptions, then Model methods. | Published annual budgets, capital plans, tariffs, and historical actuals answer different questions. The source attachments and locators make the reconciliation reviewable. |
| 2–3 minutes | In Suburban Water, show the starting tariff and bill lines; save a comparison. | At 15,000 gallons/quarter and a 5/8-inch meter, proposed 2027 common water is $408.40/year. A 0% extra uplift means the planned tariff path remains in effect. |
| 3–4 minutes | Change fixed and usage uplifts independently, then select Freeze 2026 tariffs. | A literal component freeze is different from zero incremental uplift. Fixed/variable fund revenue shares are declared assumptions, not the household bill split. |
| 4–5 minutes | Compare Central, Published drivers, Historical trend, and Cost pressure in Scenarios. | The chosen history weight, industrial demand, expense drift, investment income, and capital costs change financial outcomes. Manual edits are labeled Custom. These are cases, not probabilities. |
| 5–6 minutes | Select Suburban Wastewater and compare Common Rate 1 and 2 bill scopes. | Collection-only and collection-plus-treatment are different services. The whole fund is predominantly municipal/contract business; the common residential percentage cannot scale every dollar of receipts. |
| 6–7 minutes | Select City. Show core, water/sewer CCRC, and AO bill components, then the CPI rule. | Proposed 2027 combined bill is $1,212.32/year for the example. The CPI-plus-margin ceiling applies to core charges, while capital/AO and municipal agreements have separate treatment. |
| 7–8 minutes | Explore the City core CPI flag and explicit lease-amendment assumption. | An above-ceiling core case remains analytically available with a visible assumption. Selecting an assumption does not create an executed amendment or certify legality. |
| 8–9 minutes | Open Capital plan; compare detailed projects with condensed cash capital. | The City 2029 detailed schedule exceeds the condensed value by $5.6 million. Grants, borrowing, and required projects must remain visible; terminal obligations matter. |
| 9–10 minutes | Run Find rate path with the chosen lever; tighten a bill/cash constraint if useful. | Retail, balanced contract, and City add-on levers have different exposures and permissions. The result is the best candidate in a finite family; no feasible candidate is an informative result. |
| 10–11 minutes | Open Customers & trends, then Data connections. | Customer units, gallons, industrial loads, and accounting classes are distinct. The ERP example is an isolated synthetic Suburban Water validator, not a production or three-fund connector. |
| 11–12 minutes | Export scenario JSON and cash-flow CSV. | Keep settings, evidence, assumptions, and cash calculations together. Identify which billing determinants and agreements should replace the highest-impact assumptions in a governed pilot. |

A shorter eight-minute presentation can use one financial division in detail, show the other two scopes and City rule briefly, and leave the connector demonstration to the linked guide.

## Explain the controls accurately

**Starting path and incremental change.** Planned tariffs begin with exact proposed 2027 components and declared future growth. Freeze 2026 tariffs begins with actual 2026 components. Five annual fixed and usage uplifts compound above that selected path; City adds a separate capital/AO series. Zero extra uplift does not imply zero total annual price growth. A 2% uplift above 3% planned component growth is 5.06% total growth before rounding.

**Customer exposure.** The 2025 ACFR supplies an approximately 91.67% named customer-charge share of Suburban Water service revenue, excluding fire service, and a 4.485% Common Rate share of Suburban Wastewater service charges. Applying those shares forward is assumed. Other Wastewater Funds can contain additional service types; the remainder is not proven to be entirely wholesale. City combined retail exposure defaults to an explicitly assumed 70%, with 50% and 90% sensitivity cases. Its generic ACFR “User Charges” row must not be relabeled municipal revenue without further evidence.

**Receipt mix.** Defaults within exposed receipts are 30% fixed / 70% variable for Suburban Water and Wastewater, and 40% fixed core / 50% variable core / 10% capital-AO for City. These are editable billing-mix assumptions. Account growth acts on exposed fixed receipts; separate volume growth acts on variable and City add-on receipts. Defaults are 1% for both Suburban Water proxies and 0% for the other divisions. The historical preset uses observed account and volume trends separately where available. Industrial shocks act through the assumed exposed industrial variable share, while the illustrated household's usage remains unchanged. Do not describe historical revenue shares as exact usage-response weights.

**Costs and capital.** Extra O&M drift begins in 2028; 2027 operating expense remains anchored. Historical cost blending affects later-year growth. Capital overrun increases planned cash spending and does not remove required projects. Grant delay can move receipts past 2031. Incremental borrowing is limited by remaining capital need after existing sources, begins repayment the next year, and leaves a reported balance and annual obligation after the horizon.

**Cash and coverage.** Closing cash rolls from opening unrestricted cash through operating and capital receipts, grants, borrowing, disclosed conversions, operating expense, lease payments, other capital payments, debt service, and capital spending. Cash days and the coverage proxy measure different things. Editable 180-day and 1.20× defaults are planning targets; their definitions are not asserted to match every actual covenant.

**City rule.** The lease's original rule uses CPI-U Northeast Region, not seasonally adjusted, annual change to June 30 of the prior calendar year, plus 2.5 percentage points through 2032, with a zero floor. Published 2027 core growth is 6.8%; the model's later 3.3% CPI and 5.8% core path are assumptions. Capital/AO growth has separate assumed status. The rule does not cap the combined bill or the Suburban divisions.

## Describe the optimizer without overstating it

The finite search tests level, earlier, and later uplift patterns at 0.1-percentage-point resolution. Other cost, demand, and financing settings remain fixed. Retail changes fixed and usage uplifts together; Balanced also applies the path's highest uplift as residual contract drift; City add-ons changes only capital/AO uplifts. Contract drift and future add-on recovery remain explicit assumptions.

Lowest peak annual bill increase prioritizes the highest modeled annual household bill change, then cumulative bills, then variation. Lowest five-year bill prioritizes cumulative nominal bills, then peak increase and variation. A result passes all implemented financial checks and the selected agreement-assumption rule. It is not a global optimum, a tariff recommendation, or a legal approval. The former one-fund 5.4% example is not a result of this model and must not be reused.

## Questions to invite

- Which balance of household bills, reserve capacity, capital delivery, and financing risk should govern the decision?
- Which targets are management policies, and which are binding covenants with specific definitions?
- Which customer and municipal groups need their own billing determinants or contracts?
- How should industrial flow, strength, allocations, and concentration risk be separated?
- Which future projects are mandatory, and which timing choices are actually available?
- What evidence should replace the City retail-exposure, fixed/variable mix, and CCRC assumptions first?
- Who owns tariff, billing, general-ledger, debt, grant, and agreement reconciliation?

## Responses to likely challenges

**Why enable all three divisions with incomplete agreements?** The model makes the available public rules operational and labels unverified applications. This permits inspectable scenario analysis while preserving distinct financial boundaries. An assumption is not presented as a verified agreement term.

**Why no probability of success?** The public snapshots do not establish calibrated joint distributions for demand, cost, capital delivery, and funding. Named cases reveal sensitivity; a production stage can estimate and backtest distributions using consistent actuals.

**Why does the result differ from an original capital-plan cash line?** The model preserves final budget anchors and distinguishes detailed projects, condensed capital cash, historical cost blending, lease/capital payment components, and future funding. Each reconciliation is visible. Do not attribute a derived liquidity shortfall to an LCA-published forecast.

**Why no live ERP connection?** The synthetic schema 1.0 fixture demonstrates validation and control totals for Suburban Water. It does not establish authentication, completeness, a live Munis interface, or three-fund extraction. A governed pilot needs reviewed aggregate data and finance reconciliation inside the appropriate environment.

**What can be reused?** The static interface, deterministic model, tariff structures, financial identities, source/status register, scenario schema, CSV ledger, and review cases. Excel or Power BI can use the same definitions after input reconciliation.

## Reproducible handoff

Export schema 2.0 / model 0.2.0 scenario JSON plus the cash-flow CSV. Import validates the model/schema, cutoff, exact baseline fingerprint and settings, then recalculates; old 0.1 one-fund scenarios are rejected rather than silently migrated. Preserve the chosen division, preset or Custom label, annual component uplifts, receipt shares, capital basis, funding assumptions, and any City amendment assumption. A useful pilot milestone is a finance-reviewed baseline for each selected fund, verified class/contract mappings, an approval register, and a reconciled aggregate extract.
