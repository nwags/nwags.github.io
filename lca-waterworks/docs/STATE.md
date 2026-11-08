# Project state

Release candidate observed November 8, 2026 UTC. Financial/rate evidence cutoff: November 7, 2026.

## Intent and repository

- Repository: `nwags/nwags.github.io`, public static GitHub Pages with custom domain `nwags.com`.
- Working branch: `work/lca-waterworks-demo-2026-11-07`.
- Verified starting/main commit before publication: `83fd7cbe047c06de3f1fd057d4f7a9627c712992`.
- Objective: a CEO demonstration of five-year customer-rate tradeoffs, transparent public evidence, constraints, uncertainty, reproducibility, and a future ERP path.
- Horizon: 2027–2031. Executable scope: Suburban Water fund sensitivities and common 5/8-inch residential water bills.
- Website path: `/lca-waterworks/`; existing portfolio receives one project card.
- Runtime: static HTML/CSS/JavaScript/JSON, no build step, AI dependency, live ERP connection, credentials or analytics tracker.

## Milestones

M0–M4 are complete for the bounded demonstration. M5 publication is ready, pending observed deployment. This is not completion of a production rate study or legal applicability review.

## Completed and verified

- Reconciled the final 2027 budget to exact closing unrestricted cash of $7,546,095 and proposed typical annual bill of $408.40.
- Preserved the original CIP snapshot and recalculated 2028–2031 from the final-budget anchor; future values are labeled derived scenarios.
- Extracted and visually checked 2016–2025 Western Lehigh operating history from the 2025 ACFR, retaining service scope and units-served footnotes.
- Implemented five annual rate indices, cost/growth/capital/financing controls, future investment-income sensitivity, household impact, annual cash/coverage tests, a finite optimizer, eight named stress cases, comparison, JSON import/export and CSV export.
- Integrated 11 governance rows, separate financial/approval statuses, source/assumption explanations, synthetic ERP validation, a browser user manual and associated guides.
- Completed independent model and comparator review. The reviewer recalculated the ledger, positive-interest debt case and all 453 default optimizer candidates. Default peak result: 5.4% in each year; bill objective: 6.2%, 5.2%, 4.2%, 3.2%, 2.2%. These are finite-family results, not recommendations.
- Added the investment-income control in response to review. Its 0% future-income limiting case preserves 2027 and reduces terminal cash by exactly $3,326,880; independent follow-up found no defect.
- Observed 19 model tests pass, zero failures. Syntax checks pass. Checked 43 local documentation/HTML links with no missing targets and no duplicate HTML IDs. Whitespace check passed.
- Browser preview: visually inspected dashboard, history and manual; observed successful optimization, explicit infeasibility, eight stress rows, 11 governance rows, synthetic reconciliation, JSON download and re-import. No application-origin errors were found in the inspected console log. The browser extension emitted unrelated metadata errors.

## Worker boundaries and outputs

The controller integrated code and handled browser/source checks. Three separate workers handled (1) governance, (2) data/method comparisons and independent numeric review, and (3) orchestration/ERP guides. They inherited the session execution configuration; no claim of cheaper-model execution is made. Workers did not publish, contact stakeholders, or access production data. Research was narrowed to concrete handoffs when broader retrieval stopped contributing to this release.

- Durable method: `docs/METHODOLOGY.md`, `docs/DATA_GUIDE.md`, `docs/CONSTRAINTS.md`, `docs/MODEL_COMPARISON.md`.
- Independent checks: `docs/MODEL_REVIEW.md`, including reviewed hashes and follow-up.
- User and CEO materials: `guide.html`, `docs/CEO_DEMO.md`.
- Reusable process: `docs/ORCHESTRATION.md`, `workers/`.
- Integration: `docs/ERP_INTEGRATION.md`, synthetic fixture and validator.

## Deviations and material limitations

The executable first release is deliberately one fund, rather than all systems. Complete executed Allentown/municipal agreements, allocations and covenant definitions were not available in a fully validated set, so those optimizations remain unavailable. No global continuous optimum, calibrated probability of success, cost-of-service tariff, or legal pass is claimed. Philadelphia and Wellington were compared at the public-method/process level; their consultant workbooks were not independently reproduced.

Future investment income, rate-sensitive class shares, demand response, customer growth, capital outturns, and post-2031 liabilities remain model assumptions or production requirements. Historical volume and customer growth are descriptive; they do not automatically calibrate the future fund forecast. The browser implementation includes responsive CSS, but a separate physical mobile-device test has not been observed.

## Next objective

Publish and verify the actual GitHub Pages URL, then replace this release-candidate state with observed commit/deployment details. The subsequent production milestone is one finance-reviewed fund cash bridge, tariff/class mapping, current agreement applicability matrix and reconciled internal aggregate extract in an approved environment.
