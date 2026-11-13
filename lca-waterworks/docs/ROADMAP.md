# Staged delivery plan

## Current revision — interface 0.3, model 0.2.0

The original one-fund release is superseded by the three-division model. Research, component tariffs, capital reconciliation, named comparisons, customer evidence, model diagram, documentation and independent review are complete. The financing extension adds annual sources and uses, paired capital and identified funding, exact annual and five-year cash bridges, and a 50-term glossary. See [STATE.md](STATE.md) for observed validation and remaining limits.

All three divisions remain analytically enabled with explicit assumptions. Missing agreements do not reinstate disabled features. Acceptance criteria and the revision findings are in [the completed revision plan](exec-plans/completed/adversarial-revision.md).

## Immediate milestone — a bounded public Power BI prototype

Release priority clarified November 13, 2026: publish a credible, useful educational demonstration, not a production rate-setting system. Complete and verify a small end-to-end analytical experience before expanding advanced functionality. The parallel Power BI site does not replace the JavaScript site.

The initial release should demonstrate all three reporting divisions, customer bills and fixed/usage components, capital spending, financing sources and uses, meaningful scenario comparison, transparent evidence/assumptions, and a synthetic ERP integration specification. Preserve the existing chart families; do not introduce new financial assumptions or claim full functional equivalence without verification.

### Acceptance required for the exposed functionality

1. Reconcile the published baseline and a bounded representative set of exposed scenarios for every division: opening cash plus inflows less outflows equals closing cash; capital funding reconciles; sampled tariff bills agree with the declared formulas. Missing results cannot count as passing tests.
2. Remove materially misleading totals, stale labels and claims of unsupported behavior. Distinguish balances from flows, assumptions from verified sources, and numerical feasibility from authority to adopt a policy.
3. Test the default opening page and exposed controls in Desktop and the published Service report. Core interactions must be usable without repeated memory failures or minute-long routine recalculations. Do not infer deployment performance from one isolated fast query.
4. Retain the independent-exercise disclosure and evidence cutoff in the report and persistent notices on both websites. Publish public/synthetic data only; review the model's underlying data, not just visible pages.
5. Obtain and verify the actual Power BI embed URL, activate only `/lca-waterworks-powerbi/`, test anonymous access and navigation, and preserve `/lca-waterworks/` unchanged.

### Work that need not block this first release

A live Munis/ERP connection, complete executed-agreement verification, calibrated stochastic forecasts, comprehensive cost-of-service allocation, full native optimizer parity, and cosmetic perfection belong to later milestones. Known material errors in the exposed functionality remain release blockers; a disclaimer is not a substitute for correcting them.

The native live optimizer remains a development capability until correctness and performance are established. If it cannot meet the initial release's usability bar, recommend an explicitly narrower published experience rather than prolong open-ended routing experiments. Preserve the full development project. Do not silently remove optimization or label precomputed scenarios as live optimization. Merely hiding a page does not isolate an expensive dependency in shared reporting measures.

A possible fallback is a curated set of validated scenario outputs loaded into the native Power BI semantic model, with responsive native filtering and comparisons. This is a proposed fallback, not an implemented change or a claim of arbitrary what-if recalculation. Any reduction in exposed controls must be explained and deliberately selected before implementation. The JavaScript analytical controls remain available independently.

## M0 — Define the decision

Establish the horizon, user decisions, source hierarchy, model boundary, and website architecture. Preserve independent operation, transparent assumptions, and fund separation. Gate: a clear answer to what the demonstration can and cannot optimize.

## M1 — Collect and reconcile evidence

Research current rate schedules, adopted budgets, audited history, capital plans, governing legislation, concessions, municipal agreements, and peer methods. Follow missing inputs back to additional sources. Gate: every baseline value has a source, units, period, system, status, and transformation; unresolved rules remain explicit.

## M2 — Build and challenge the model

Implement a deterministic financial ledger, bill calculations, scenario assumptions, and a bounded optimizer with explicit objectives and feasibility checks. Compare its structure against public utility planning models. Gate: independently checked arithmetic, source reconciliation, infeasibility handling, and no implicit interfund transfers.

## M3 — Build the demonstration

Create an accessible static dashboard with five-year controls, charts, constraints, source drilldowns, scenario export, and a synthetic ERP contract demonstration. Gate: controls and outputs respond correctly, evidence labels remain visible, and no production integration is implied.

## M4 — Explain and review

Produce the user manual, model/assumption guide, user guidance, integration guide, and controller/worker briefs. A worker other than the implementer reviews model semantics and numerical claims. Gate: observed issues resolved or explicitly retained as limitations, documentation matches the shipped behavior.

## M5 — Publish and hand off

Publish under the existing portfolio without replacing unrelated content, verify the served result, record the exact commit and validation, and identify the next evidence-driven objective. Gate: a live or explicitly blocked delivery with reproducible local source and no claims of legal approval.

## Subsequent production pathway

Reconcile full customer-class and fund-level histories, executed agreements and amendments, official rate approvals, restricted balances, debt covenant definitions and approved capital schedules. Validate calibrated forecasts and controlled ERP extracts with LCA staff. Only then consider policy recommendations or deployment into an authority-operated BI environment.
