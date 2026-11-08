# CEO demonstration guide

## Purpose

Show how a business analyst can make rate tradeoffs inspectable: customer impact, annual cash sufficiency, capital funding, uncertainty, evidence and approval boundaries. The demonstration uses public LCA context and a reproducible Suburban Water model. It is an independent prototype, not a management forecast or rate recommendation.

Allow 8–10 minutes. Open the dashboard and user guide before the meeting. Select **Reset** so the presentation begins at the documented reference. If discussing an exported scenario, import the matching version rather than trying to recreate sliders from memory.

## Demonstration sequence

| Time | Action | Point to make |
| --- | --- | --- |
| 0–1 minute | Show the horizon, scope note and evidence cutoff | Separate Suburban Water from Allentown and wastewater. State that 2027 rates were proposed at this cutoff. |
| 1–2 minutes | Open Public evidence | The final annual budget and the earlier CIP financial projection are different snapshots. The model reconciles them rather than hiding the difference. |
| 2–3 minutes | Return to the reference annual plan | 2027 closing cash reproduces $7,546,095 and the typical proposed bill is $408.40/year. Later years are derived. Coverage and cash days answer different questions. |
| 3–4 minutes | Save comparison; select Find rate path with Lowest peak annual increase | Under the default assumptions, the finite search finds a level 5.4% index path. Explain the tested families and show the cost to the illustrated household. |
| 4–6 minutes | Run Assumptions & stress | Higher costs or slower growth can undermine a path that passed the central case. A passing-test count is not a probability. |
| 6–7 minutes | Adjust costs/funding or apply a tight rate/bill bound and search again | Infeasibility is an informative result. The model does not remove required work or borrow unlimited amounts to manufacture a green status. |
| 7–8 minutes | Open Rules & agreements | Some constraints are verified; full agreement applicability remains unresolved. Passing the financial tests does not authorize a tariff. |
| 8–9 minutes | Validate the mock ERP extract | Demonstrate record checks, fund mapping and control totals. No production connection or real customer information is involved. |
| 9–10 minutes | Export the scenario and identify the next decision | Ask which service scope, policy priorities and internal evidence should lead a production pilot. |

## Useful questions to invite

- Should the primary objective be lower peak increases, lower cumulative bills, stronger liquidity, or a defined balance across those goals?
- Which financial policies are management targets and which are actual contractual covenants?
- Which customer classes and municipalities must be modeled separately?
- Which capital commitments are fixed, and who can approve changes to discretionary timing?
- How should low-income household impacts and assistance be evaluated alongside revenue adequacy?
- Which upcoming industrial or wholesale changes materially alter the plan?
- Which staff own the tariff, debt, billing, general-ledger and agreement data?

## Interpretation of the default example

The reference uses 2027's approved budget cash values and the exact proposed common residential bill, followed by a derived 2028–2031 profile. It carries the final budget's higher operating expense forward using CIP growth factors. Consequently, its cash outcome differs from the original published CIP. Do not say that LCA has forecast the modeled liquidity gap.

The 5.4% result depends on a 180-day cash target, 1.20× planning coverage target, 1% growth, the stated expense profile, full planned capital spending, no additional grants/debt, flat future investment income, and an aggregate rate-response proxy. The new investment-income retention control and limiting stress make this material assumption testable. It is only the best path in the stated finite search for the selected objective. It is not a regulatory ceiling, approved policy, class cost allocation, or rate advice.

The scenario's household figure covers common residential water only at the chosen use. A lower-income burden ratio based on one assumed income is a teaching example, not an affordability assessment of LCA customers. Allentown's combined bills include different services and charges and cannot be compared as if they were the same product.

## When challenged

**Why only one executable fund?** Public fund separation and different agreement structures matter. A shared set of sliders would imply allocation freedoms that have not been established. Other systems remain visible as sourced context while their governing models are specified.

**Why no probability of success?** The current public snapshots do not establish calibrated joint distributions for costs, demand and financing. Named scenarios make the assumptions inspectable. The next stage can estimate and backtest priors using consistent actuals.

**Why not connect Munis now?** A public demo should not receive operational credentials or identifiable data. The mock shows the contract and reconciliation process. A production pilot would use an approved read-only extract or documented licensed interface inside LCA's environment.

**What can be reused?** The static UI, deterministic calculation engine, test cases, canonical data model, provenance/constraint registers and worker handoff process. Excel and Power BI implementations can use the same model definitions and verification cases.

## Proposed production-pilot outcome

A useful next milestone is one finance-approved fund cash bridge, one tariff/class mapping, one agreement applicability review, one reconciled internal aggregate extract, and an independently checked five-year scenario. Expand only after that baseline is reproducible. The staged briefs in `workers/` make each work package concrete and reviewable.
