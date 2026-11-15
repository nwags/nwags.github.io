# Staged delivery plan

## Immediate milestone — publish the working Tableau initial edition

The owner has prioritized hosting Tableau alongside the already published JavaScript and Power BI editions sooner rather than waiting for complete feature parity. T01d has owner-observed native acceptance: all 33 arithmetic checks pass, the financing page and full paired capital/funding chart render, and its disclosure and color keys are readable. See [STATE.md](STATE.md) for exact evidence and remaining limits.

Publish the current **Overview and Financing** dashboards plus the arithmetic audit as an explicitly limited initial edition. Do not add another workbook-generation or extract-conversion cycle before publication. Remaining chart families, independent comparator, detailed bills, history and evidence views stay on the roadmap as incremental improvements, not release blockers. Known materially misleading figures still block release.

### Tableau release gates

1. Preserve T01c/T01d local native-tested checkpoints and the frozen November 7, 2026 snapshot. No new financial assumptions, formula changes or data-source rewrites are needed for this release.
2. Save clear opening selections: Suburban Water / Central planning estimate, Overview active. Hide supporting dashboard sheets rather than deleting them; retain the all-case audit worksheet. This is navigation cleanup, not data privacy.
3. Publish from Desktop Public Edition to the owner's existing Tableau Public profile. All underlying data must remain suitable for unrestricted access; no internal ERP/customer data.
4. Verify the published Overview and Financing pages, a division/scenario change and the audit. No claim of hosted speed or functionality follows from the Desktop screenshots alone.
5. Obtain the actual Share embed code/public view URL. The prepared `/lca-waterworks-tableau/` host has no fabricated URL and remains explicitly pending/noindex until connected. Preserve dashboard navigation and a direct fallback in the real embed.
6. Verify the deployed page signed out, with readable disclosure and usable navigation. Add the third stacked homepage Online link only when the public report is actually connected. Existing JavaScript/Power BI applications and Excel are unchanged.

## Existing public Power BI companion

Publish a credible educational scenario explorer, not a production rate-setting system. `/lca-waterworks-powerbi/` remains parallel to, not a replacement for, `/lca-waterworks/`.

The user authorized a prepared-scenario edition after the v08 calculation-performance problems. v09 passed the owner-run 33-case native arithmetic check, was published to Service, and received an owner-supplied public embed URL. The companion embeds that URL with a persistent notice; Pages build/deploy succeeded. Independent full anonymous rendering and interaction remain separate checks; see STATE.md.

It retains three divisions, eleven prepared scenarios, fixed/usage bill components, ten chart families, financing/capital analysis, assumptions, evidence, glossary and synthetic integration specification. It does not expose arbitrary new recalculation or live optimization. Preserve the full v08 development project and JavaScript controls.

The generic builder reads the local public snapshot, checks identity/arithmetic and creates a separate native project. Native project/model data remain outside this public repository. The [companion README](../../lca-waterworks-powerbi/README.md) records checksums, rebuild instructions, embedding and withdrawal procedures.

### Release and maintenance gates

1. Reconcile every exposed prepared scenario: cash continuity, funding identities and default-account bills. Blanks never count as passes.
2. Native Explorer acceptance requires 33 populated rows and residuals within $0.01. The owner's 307.3 ms query/all-pass confirmation satisfy that gate for the current snapshot only.
3. Inspect pages and interactions, captions, balance/flow semantics and scope. Do not claim arbitrary what-if parity with JavaScript.
4. Measure actual hosted behavior. One query duration does not guarantee every visual or interaction.
5. Keep all model data public-safe. The real supplied Microsoft iframe uses Overview; retain notice and verify anonymous access.
6. Revoke the provider's public code to withdraw direct public access. Removing an iframe alone is insufficient; never replace a public model with confidential data.

### Subsequent work, not initial-release blockers

Live Munis integration, comprehensive agreement verification, calibrated stochastic forecasts, full cost-of-service allocation and native optimizer parity remain later milestones. Cosmetic perfection is not required; known misleading figures and unsupported claims must be corrected. Do not install diagnostic overrides or label stored scenarios as live optimization.

## Existing JavaScript milestone

Interface 0.3 / model 0.2.0 includes three-fund revision, component tariffs, capital reconciliation, presets, customer history, model explanation, financing charts and glossary. Prior checks: STATE.md and the [completed revision plan](exec-plans/completed/adversarial-revision.md). Hosting another edition changes no financial assumptions or chart families in the existing applications; Excel is unchanged.

## M0 — Define the decision

Establish the horizon, decisions, source hierarchy, model boundary and website architecture. Preserve independent operation, transparent assumptions and fund separation; explain each edition's supported scope.

## M1 — Collect and reconcile evidence

Research budgets, audited history, capital, tariffs, agreements and peer methods. Preserve units, dates, scope and status. Missing evidence stays explicit; do not invent verified terms.

## M2 — Build and challenge the model

Check ledgers, bills, constraints and declared optimization boundaries against independent arithmetic/reference cases. Do not pool funds or silently remove mandatory capital.

## M3 — Build the demonstration

Provide accessible financial views, scenario comparison, evidence drilldowns and integration explanation. Exposed controls must match actual behavior.

## M4 — Explain and review

Maintain methods, glossary, manual and integration guides. Distinguish static checks, native execution, live verification, data limitations and stakeholder authority.

## M5 — Publish and hand off

Deploy parallel editions, verify served results, record versions/validation, and preserve unrelated portfolio content. Repository changes, Pages deployment and third-party report operation are distinct checkpoints.

## Production pathway

Reconcile customer-class history, agreements, approved tariffs, restricted balances, covenants and project funding with authorized staff. Governed ERP extraction and operational deployment require a separate scope and approval.
