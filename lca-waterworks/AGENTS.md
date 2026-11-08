# LCA WaterWorks demonstration

## Intent

Build an independently operated, public-data example of five-year water and wastewater rate planning for 2027–2031. The dashboard must explain the relationship among customer bills, operating costs, capital work, financing, liquidity, and uncertainty. It is an independent portfolio demonstration, not an LCA tariff proposal or an adopted financial forecast.

## Sources of truth

- `docs/STATE.md`: changing project state and latest observed validation.
- `docs/ROADMAP.md`: staged objectives and acceptance criteria.
- `docs/ORCHESTRATION.md` and `workers/`: controller and bounded worker handoffs.
- `data/`: versioned public-source extractions, assumptions, and provenance.
- `docs/METHODOLOGY.md`: equations, scope, and model limits.
- `docs/CONSTRAINTS.md`: applicability, implemented rules, unresolved agreements.

Live repository and source evidence outrank remembered values. Distinguish verified, derived, assumed, and unresolved values. Check effective dates and proposed/adopted/actual/forecast status. Do not treat a board discussion or secondary summary as the governing agreement.

## Invariants

1. Keep cash, debt, revenues, and constraints within their documented fund/system boundaries. Do not silently net interfund balances or allocate costs without evidence.
2. Preserve original source amounts and units. Calculations and normalization must be reproducible; do not scale non-rate revenue as if it were retail sales.
3. Show a model-feasible result only after checking every implemented constraint. Legal and agreement verification is a separate status, never inferred from numerical feasibility.
4. Unverified contract limits, approvals, borrowing, grants, or customer-class allocations must remain visible as assumptions or unresolved gates.
5. Protect mandatory/regulatory capital work. Do not let the optimizer make a plan affordable by silently eliminating required work or using restricted cash.
6. The browser must run the demonstration without an AI service, server secret, or production ERP connection. Synthetic connector fixtures must be clearly identified.
7. Keep private interview, household, customer, employee, and account data out of this public repository.
8. Do not copy the uploaded meeting transcript into public source files. Use public document citations and concise timestamped analytical notes.
9. Compare rate studies on equivalent units, service scope, customer usage, and financial definitions. Never infer causation from peer rankings.
10. Separate estimated scenario weights from empirically calibrated probabilities. Do not report model assumptions as measured LCA behavior.

## Work boundaries

Workers change only their assigned files, return evidence and observed verification, and do not commit, merge, publish, contact LCA, or connect production systems. The controller integrates and reviews changes. Use the existing static GitHub Pages architecture. Scope website additions to this directory and an explicitly reviewed portfolio link.

## Validation

Use focused financial invariants, hand-calculated cases, source reconciliation, optimizer feasibility checks, malformed-import checks, and browser interaction/accessibility checks. Do not claim a test, deployment, or approval succeeded without observed output. Update `docs/STATE.md` after material changes.
