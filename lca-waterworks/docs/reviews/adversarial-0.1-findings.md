# Adversarial review before revision

Review date: 2026-11-08. Reviewer examined the current implementation without changing repository files or browser state. Repository: `lca-waterworks`. Observed branch: `work/lca-adversarial-revision-2026-11-07`; HEAD: `fbc30d19b127a25ecabc3694670295d576078b1c`; initial working tree clean. Published implementation version examined: `0.1.0`.

The user's new objective supersedes the first release's deliberate one-fund restriction. It does not authorize making up source facts: use explicit, editable assumptions where evidence is absent, preserve fund boundaries, and distinguish numerical planning from legal certification.

## Executive judgment

The arithmetic is internally consistent, but that is a substantially narrower achievement than a defensible financial model. All 19 existing tests passed during this review. Several tests encode the chosen transformations rather than independently validating their accounting meaning. The most consequential problem is the absence of a category-level bridge between the annual cash budget, the conceptual capital plan, and the modeled revenue/expense/financing channels. Expanding the existing aggregate formula to three funds without that bridge would create predictable grant and coverage errors.

The primary deficiencies are: accounting categories that are adequate for a one-year cash identity but inappropriate for common future growth transformations; a residential tariff proxy applied to all rate-sensitive receipts; no distinction between connection growth and usage growth; capital financing caps that overlook already embedded capital receipts; and a comparison interface that exposes little of the financial tradeoff. The long caveats disclose many limitations, but disclosure does not make those limitations meet the newly requested capability.

Severity meanings: **P0** blocks a financially credible expanded default; **P1** materially changes decisions or violates the revised intended scope; **P2** misleads users or weakens reproducibility; **P3** clarity/maintenance. VERIFIED means directly observed in code, source text, or execution. INFERRED means a consequence or risk requiring source reconciliation, not a confirmed source accounting error.

## P0-1: Do not extend aggregate cash revenue and coverage formulas to all funds

**Evidence (VERIFIED):** `data/baseline.json:authorityBudget2027` gives Suburban Wastewater cash revenue $30,345,659 and City cash revenue $91,706,633. October 26 packet PDF p.16, locally `research/revision-financials/oct26-packet.txt` lines 699–734, separately records wastewater grants $5,725,000 and City grants $10,966,220. The executive-summary totals include those receipts. Published coverage is 4.04x and 2.54x, whereas mechanically applying `(aggregate revenue - aggregate expense) / debt service` produces materially higher ratios. `model.mjs:buildReference/simulate` uses exactly that aggregate formula for the presently supported water fund.

**Risk (INFERRED expansion failure):** adding planned grants as a new funding line while retaining them in total revenue doubles their cash benefit. Counting capital grants as operating coverage fabricates debt capacity. City also has lease payments, noncapital interest, borrowing/repayment and capital-expense categories that differ from suburban treatment; source cash acquisition is $50,697,500 while summary capital expense is $55,897,500. These require a bridge, not a copied water template.

**Acceptance:** each fund reproduces its 2027 cash movement and ending unrestricted cash from independent source lines; each grant is represented exactly once; grant removal changes cash by its exact amount and does not change operating revenue or coverage numerator; debt principal, interest, City lease/noncapital payments and capital adjustments are separately reconciled. Published covenant ratios are shown as source facts; a model coverage measure must have its own named numerator/denominator and fund-specific adjustment assumptions. Never claim a source covenant pass from an approximate ratio.

## P0-2: Reanchoring proves cash arithmetic, not comparability of expense categories

**Evidence (VERIFIED):** `model.mjs:32` applies `15,183,495 * CIP_opex[t] / 13,312,885`. The budget amount is $8,618,300 supplier payments + $6,013,596 employee payments + $551,599 **other capital cash payments** (packet PDF p.16). `docs/METHODOLOGY.md` acknowledges inclusion of other capital payments. `app.mjs:111,121` calls the entire $1,870,610 difference a higher cash operating expense/material budget update. Both source snapshots are retained, but there is no category bridge proving the difference is an O&M level change.

**Consequences:** operating drift compounds capital-related payments; expense cash-days denominators include those payments; later years propagate a heterogeneous first-year level uplift across the entire CIP profile. This is an assumption, not a verified correction. It can drive the default's apparent required rate increase. Current default ending cash falls from $7,546,095 in 2027 to $3,215,460.75 in 2031; optimized level increases are 5.4%.

**Acceptance:** identify operating cash costs, capital-related nonproject payments, debt, and project capex independently; reconcile how CIP and budget classify them. Preserve exact 2027 cash even when moving categories. Apply recurring cost growth only to appropriate recurring categories; show unresolved residual explicitly with an editable continuation assumption. Rename the scenario to indicate reanchoring assumptions until its bridge is proven. A test must compare source categories, not merely reproduce the code's ratio formula.

**Important restraint:** deleting $551,599 from expense is not an acceptable correction; it would falsely improve cash. The payment must move to its proper cash-flow category and retain a justified future schedule.

## P1-3: Revised scope requires all three funds and editable assumption-backed rules

**Evidence (VERIFIED):** `index.html:23`, `app.mjs:163`, and `model.mjs` hard-code Suburban Water execution. `authorityBudget2027` merely displays the other two systems. The previous design is now obsolete relative to explicit user intent.

**Acceptance:** fund selection runs independent cash, costs, capital, financing, constraints and appropriate bills; changing one fund never changes another fund's cash. An authority view sums compatible dollar flows but does not average or pool cash-days/coverage. Unknown contractual adjustments become conspicuous editable assumptions and scenario statuses. A user can explore a hypothetical parameter without a legal gate disabling the model. Financial feasibility and approval verification remain distinct.

## P1-4: Capital cap omits capital fees and reimbursements already embedded in revenue

**Evidence (VERIFIED):** `model.mjs:73–74` caps grants and extra borrowing only against capex less planned borrowing. Budget `capitalFeeAndOtherCashReceipts=$1,086,054` enters `other` revenue and therefore `capitalFromOperations`. With `grantAnnual=5,000,000` and `extraDebtShare=50`, planned debt + extra debt + grants equals all capex in every year, while another $1,086,054 of capital fees/reimbursements still enters cash. Total identified capital-related receipts exceed project capex by $1,086,054 each year in that probe.

**Interpretation:** some receipts may be legally unrestricted or pay other capital expenses; this review does not assert an illegal use or exact double count. However, the comment that proceeds cannot inflate operating liquidity by exceeding capital spending is broader than the implemented check. The source's capital-purpose channels are not modeled sufficiently to support it.

**Acceptance:** separate operating receipts, investment receipts, tapping/capital fees, reimbursements, existing grants, new grants and borrowing. For each cap, state eligible expenditure base and which existing funding offsets it. Check dedicated funding against eligible costs or carry excess into explicitly restricted/project balances. Show operating contribution separately from capital contributions. All flows must still satisfy the cash identity.

## P1-5: Rate indices fail exact tariff-freeze semantics and cannot support fixed/variable design

**Evidence (VERIFIED):** `model.mjs:53,60,92` starts with the proposed 2027 tariff then divides by a 3.5% index. Both tariff components receive one multiplier. Proposed fixed charge rises from $36.50 to $38.20 per quarter (4.66%); variable price rises from $4.14 to $4.26/kgal (2.90%). A 0% 2027 index is therefore not the actual 2026 tariff.

Observed annual freeze probe:

| Monthly gallons | Actual 2026 tariff | Model 2027 with 0% index |
|---:|---:|---:|
|500|$170.84|$172.33|
|5,000|$394.40|$394.59|
|15,000|$891.20|$888.50|

**Acceptance:** independent fixed and variable controls anchored to actual component tariffs; unchanged components reproduce actual 2026 bills at all tested usage levels; proposed 2027 default reproduces $408.40 at 5,000 gallons/month exactly. Show the resulting bill change at representative low/typical/high usage, not a single nominal index. Applicable blocks, meters, wastewater fixed charges and City fee components need explicit handling or visible scope assumptions. Components must have visible units and billing frequency.

## P1-6: Residential component weights cannot stand in for industrial-heavy fund revenue

**Evidence (VERIFIED):** `model.mjs:55–65` derives the fund variable-revenue share from a 5,000-gallon residential bill. Historical data already includes large and other industrial volume separately; approximately half the 2025 Western Lehigh volume is industrial. Volume share is not revenue share, and Western Lehigh is not the full fund. `rateExposure=0` freezes only the *difference from the reference*; the whole base customer line still grows with baseline rates. This is a sensitivity calibration, not a class revenue forecast.

**Acceptance:** represent at least residential/nonresidential or residential/industrial/other fixed and volume revenue channels, with sourced shares where possible and editable assumptions elsewhere. Class shares sum to the modeled customer receipts; volume shares must not be silently reused as revenue shares. A zero fixed increase changes no fixed receipts; a zero volume increase changes no unit price; exposure controls have explicit absolute-versus-relative semantics. Household usage remains independent from fund demand. Publish class data scope, year and actual/forecast status next to the controls.

## P1-7: Connection growth and consumption growth are confounded

**Evidence (VERIFIED):** `model.mjs:62–66` multiplies all customer receipts by one customer/usage growth ratio; no extra operating cost, tapping fee, industrial volume, per-connection usage or capacity channel responds. `app.mjs` labels this 'Annual customer / usage growth.' The source CIP text says the 1% assumption reflects expected **new customer connections**, while historical units served are explicitly not connections.

**Acceptance:** separate customer/connection growth from usage per customer and industrial demand, or at minimum expose a clear mapping of the aggregate assumption. Fixed receipts respond to billed accounts/units; volumetric receipts respond to customers × usage × unit price. Incremental variable operating costs and capital-related connection receipts need an explicit response assumption, even if zero. Validate zero-usage growth changes no fixed revenue and pure connection growth affects fixed and variable channels coherently. Avoid calibrating entire-fund defaults directly from Western Lehigh statistics.

## P1-8: A fixed five-year objective rewards shifting burdens outside the window

**Evidence (VERIFIED):** extra draws occur at year-end; 2031 draws have no modeled debt service before the horizon ends. `optimize` minimizes five-year household bills or peak rate, with funding held fixed. It reports only **extra** remaining debt; remaining planned debt is not in the horizon summary. It is not presently a financing optimizer, so no claim is made that it secretly searches debt. But a user comparing a high-debt scenario with a cash-funded scenario sees an incomplete cost comparison.

**Acceptance:** keep the cash planning window but show terminal extra and planned debt where available, next-year debt service, and full incremental debt service/interest or present value for hypothetical borrowing. If planned outstanding principal cannot be determined, mark it unavailable rather than implying zero. Include terminal obligations in scenario comparison. Identify end-year borrowing timing as an assumption and optionally expose draw/payment timing. Do not label the cheapest five-year bill as lowest total economic cost or equitable outcome.

## P1-9: Baseline/defaults need a declared evidence-led hierarchy

**Evidence (VERIFIED):** defaults include 100% future investment income retention, 100% rate exposure, zero elasticity, $35,000 income and generic growth. These are disclosed assumptions. Investment income stays $831,720 each future year despite cash declining sharply; no yields or balances link them. Historical data is descriptive only.

**Acceptance:** name the main preset 'planned/base case' with the latest approved budget, adopted conceptual CIP and proposed tariff status. Show which values are published plans, historical estimates, and judgmental continuations. Add selectable published-plan, flat-tariff, pressure, and historical-trend sensitivities; do not call any objectively 'most likely' without a defensible estimator. Investment yield and eligible balances should reconcile where possible; an explicit income sensitivity is acceptable where balance classification is unresolved. Explain why choosing a default is reasonable rather than treating missing evidence as a reason to disable it.

## P2-10: Saved comparison does not compare financial plans

**Evidence (VERIFIED):** `app.mjs:74–84` uses saved settings for the bill line only. Cash chart always uses the reference, current policy minimum and current cash. No saved comparison appears in cash/coverage/funding/terminal debt or annual tables. Saved comparison silently uses current household usage/income (documented in tooltip name, not a full comparison contract). There is one unnamed transient slot.

**Acceptance:** independent 'scenario' and 'compare with' preset selectors or named saved scenarios. Identical comparison basis for fund, years and household use is visible. Show absolute and delta bills, cash, coverage, capital, grants and debt; label each line with the chosen scenario. '$0.00 vs reference' becomes 'Same as [named comparator]' or shows both values and a signed difference with year/units. Saving/loading a scenario should preserve its name and settings and make any normalization explicit.

## P2-11: UI labels can diverge from active state

**Evidence (VERIFIED by code inspection):** `events()` updates `preset` only on reset/preset selection; manual edits, import and optimization leave its old label. Objective selection has no change handler, so a displayed optimization result can describe a different objective than the current select. Imported `extraDebtTerm` can be 5–40 years, but there is no term control and `controls` help always says 20-year payments. Invalid numeric input retains valid model state while its visible input remains invalid; export/optimize are still enabled.

**Acceptance:** show 'Custom / modified [preset]' after edits; objective change invalidates or visibly timestamps old search output; expose and synchronize every financially active imported parameter including debt term. Invalid input must not export a file that appears to reflect the displayed value—either restore/identify last valid values or disable dependent actions until fixed. Test actual UI events, not only pure model functions.

## P2-12: Scenario schema lacks dataset identity and comparison/objective state

**Evidence (VERIFIED):** `exportScenario` records model version, cutoff, settings and output, but no data fingerprint, selected fund, scenario name, comparison, optimizer objective or source content version. Import checks a hard-coded `0.1.0` and cutoff, then recalculates using local baseline. Same-date baseline changes can produce different results under apparently matching metadata. CSV uses `data.modelVersion` while JSON uses `MODEL_VERSION`, allowing disagreement after an incomplete bump.

**Acceptance:** schema includes fund, stable baseline/data version or content fingerprint, all active settings, name/preset provenance, comparison identity and objective where relevant. Import validates against the actual engine constant and baseline identity, recomputes outputs, and reports an intentional migration if versions differ. One authoritative version source. Round-trip each fund and altered loan term; test invalid numbers, wrong fund, unsupported old schema, changed data and edited result rows.

## P2-13: Liquidity and coverage names need category specificity

**Evidence (VERIFIED):** cash-days uses year-end unrestricted cash and the composite expense denominator. Unrestricted investments $3,148,223 are deliberately excluded; restricted cash is excluded correctly. 2027 cash-only days are 181.4, whereas adding unrestricted investments yields 257.08 days. This does **not** prove investments should be spent, but the difference is decision-relevant. Annual ending cash alone cannot prove within-year liquidity, especially with year-end debt draws.

**Acceptance:** show cash-only and separately identified potentially liquid investments; maintain excluded/restricted balances visibly. Name cash-days denominator. Do not imply all unrestricted investments are legally inaccessible; state the model treatment. Annual feasibility is explicitly year-end feasibility, with timing risk or quarterly stress as a separate capability. Coverage numerator excludes financing proceeds and distinguishes capital receipts/adjustments from recurring operating surplus.

## P2-14: 'Preserves all capital' is not a project-level capital model

**Evidence (VERIFIED):** code retains cash-flow capex totaling $43,516,250 versus the direct project table $41,435,000; it has no project rows, timing choices or regulatory classification. The $2,081,250 difference is retained but not explained by component. Blanket overrun applies to every cash capital dollar. The optimizer cannot remove projects, which is protective, but docs cannot claim required-project logic has been implemented.

**Acceptance:** reconcile direct projects and cash-flow additions/overhead; display project/category schedules and fund totals. At minimum, identify mandatory/regulatory/protected work separately from discretionary timing assumptions. If timing controls are introduced, prohibit or explicitly gate deferral of protected work; project totals and cash spending must bridge. Explain distinction between conceptual plan, spending expectation and approved individual project funding. No unsupported claim that annual project cash equals physical completion.

## P2-15: Affordability and equity are not measured by one illustrative household

**Evidence (VERIFIED):** `householdBurden` divides water-only annual bill by constant $35,000 income; optimizer objective uses one household at selected usage. Source caveats are sound, but no income distribution, assistance, combined sewer bill, low/high-use burden or class equity is modeled. Introducing fixed/variable controls without multi-usage comparisons makes distributional harm easy to hide.

**Acceptance:** show low/typical/high consumption and income cases, clarify annual-versus-monthly units, combined services when available, and assumption status. Do not label a result affordable from a bill/income ratio alone. Under fixed/variable reallocation with unchanged aggregate revenue, show how each household segment changes. Any fairness criterion must be a named explicit constraint/objective rather than inferred from aggregate feasibility. Permit a simple documented assumption set instead of blocking exploration for lack of household microdata.

## P2-16: Missing model explanation page and weak chart/audit presentation

**Evidence (VERIFIED):** `index.html` links a guide and external Markdown methodology, but no dedicated diagram/page. SVG charts encode whole-dollar or million-dollar rounded hover values; funding bars suppress negative widths via `Math.max(0,value)`. Cash comparisons use scenario-specific minimum against baseline cash without explaining denominator changes. Annual tables round dollars to millions and omit beginning cash, although CSV preserves it.

**Acceptance:** dedicated accessible model page with a compact dependency diagram: source categories → customers/prices/demand → operating surplus → capital/funding → cash/debt constraints → household outcomes. Separate funds and excluded/unknown channels visible. Document equations and a worked year, with source/assumption labels. Include beginning cash in audit table, exact-dollar detail/export, negative funding deficit visualization, and comparative thresholds calculated consistently for each scenario. Charts have readable names/units, zero-line/sign semantics, and a table alternative.

## Verification performed and limits

- Read local AGENTS, STATE, methodology, baseline, model, app, HTML and 19 model tests.
- Executed `node --test tests/model.test.mjs`: 19 passed, 0 failed.
- Executed independent Node probes of default cash/coverage/bills, three freeze-tariff usage levels, full-grant/high-debt capital-funding totals, and cash/investment liquidity distinctions.
- Inspected local primary-source extractions of the Suburban CIP and October 26 packet. No live source/adoption status refresh was performed by this reviewer; the two assigned primary-source workers own that verification.
- No repository edits, browser interaction, publication, external contact, or extra agents. This report is the only artifact created by the reviewer.
- No confirmed arithmetic failure was found in the existing water-only default ledger. The main blockers are semantics, source bridging, and expanded-scope correctness. Existing disclosure prevents several claims from being outright false, but it does not make the implementation satisfy the revised scope.

## Focused second-pass gates

1. Independently recalculate each fund's 2027 cash bridge and grant treatment from source rows.
2. Zero changes reproduce the selected actual/component tariff anchor; proposed preset reproduces published bills at multiple usages.
3. Class revenues reconcile; fixed/variable/connection/usage effects follow separate channels; household inspection does not alter fund demand.
4. Existing and new capital funding are counted once, with eligible-cost caps and restricted balances handled explicitly.
5. Same funding, different rates: compare cash and coverage; same rates, different debt: compare terminal obligations as well as bills.
6. Optimize independently recomputed candidate feasibility under the chosen objective and thresholds; verify no unreported equity, total-cost or global-optimum claim.
7. Import/export and UI state agree for each fund, scenario/comparator, nondefault debt term and invalid input.
8. The model page matches the executed equations and labels unavailable data as unavailable.

Next objective: review revised engine/data interfaces and source bridges before UI polish or publication. Ready for a bounded second pass after integration.
