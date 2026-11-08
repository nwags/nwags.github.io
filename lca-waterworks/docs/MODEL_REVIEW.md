# Independent model review — current release 0.2.0

Evidence cutoff: November 7, 2026. The controller implemented the revision; a separate reviewer challenged source semantics, equations, candidate validity, reproducibility and UI state. Browser verification and publication are recorded in [STATE.md](STATE.md).

## Disposition

The final targeted review found **no unresolved release blocker within its engine, data-identity and static-integration scope**. This is an implementation review of an independent planning demonstration, not a certification of LCA rate authority, financial forecasts or covenants.

## Consequential findings and corrections

| Finding | Correction | Observed verification |
|---|---|---|
| Aggregate receipts would double-count grants in additional divisions | Separate customer, other operating, investment, capital and grant channels | All three detailed 2027 cash bridges reconcile exactly |
| Other capital payments were compounded as operating expense | Separate operating cash costs, lease and other capital payments; explicit future assumptions | Independent annual ledger identities and source bridges |
| Published capital tables disagree by $5.6m | Default detailed project schedule, selectable original condensed schedule, disclosed conflict | $361.312m versus $355.712m; City 2029 difference is exact |
| Uniform rate index did not reproduce actual prior tariffs | Fixed/usage/add-on components and literal 2026 path | Four proposed annual examples and freezes across usage levels |
| Household tariff mix stood in for fund-wide billing determinants | Explicit revenue exposure and fixed/variable assumptions; separate account and volume channels | Household changes leave fund cash unchanged; growth channels independently checked |
| Incremental funding cap omitted existing capital receipts | Subtract planned debt, grants and capital receipts before incremental finance | Funding caps hold in all three divisions |
| City add-on optimization bypassed demand response | Weighted core-usage/add-on price response | Add-on increase changes demand at nonzero elasticity |
| Washington charge incorrectly scaled with EDU | Per-customer fixed charge stays independent of EDU | Published fixed charge reproduced |
| Search could produce an input rejected by the model | Validate every candidate before evaluation | Former high-uplift failure now yields no feasible candidate |
| Feasibility depended on selected optimization lever | Policy uplift bound independent of lever | Same financial settings yield same violations |
| Comparison targets and tariff badges could be misleading | Shared current targets, named comparator, dynamic tariff status and Custom edits | Static review and browser interaction checks |
| Same version/cutoff could hide different baseline inputs | SHA-256 `dataRevision` in JSON/CSV; exact import match | Independent hash recomputation, mutation and mismatch checks |

## Verification scope

The reviewer ran 99 focused assertions and 15 household/fund independence comparisons during development, then independently reran the current repository's **34 passing tests** and targeted final fixes. Numbers from different passes are not additive coverage claims. The finite optimizer was tested for valid candidates and implemented feasibility, not proved globally optimal.

The final source fingerprint independently matched `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`. Input changes require rebuilding it and rerunning compatibility checks. Presentation-only edits do not alter that fingerprint.

## Review evidence

- [Initial adversarial findings against version 0.1](reviews/adversarial-0.1-findings.md).
- [Revision engine and integration review, including final disposition](reviews/revision-0.2-review.md). Earlier pending findings in that chronology are superseded by its final section.
- [Original version 0.1 review](reviews/model-0.1-review.md), retained as historical evidence only.
- [Current methodology](METHODOLOGY.md), [data guide](DATA_GUIDE.md), [constraints](CONSTRAINTS.md), and [public-model comparison](MODEL_COMPARISON.md).

Remaining uncertainty concerns evidence and policy assumptions disclosed in the application: historical cost blending, incomplete billing mix, City capital/expense classifications, the unmatched future wastewater debt schedule, projected grants and future eligible recovery. A production model must replace these with reconciled internal records and reviewed agreement definitions.
