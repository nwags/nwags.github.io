# Project state

## Current intent

- Repository: `nwags/nwags.github.io`, branch `main`; this checkpoint starts from `1b5e49a323c1ca3d78396a0746bef30c6867f634`.
- Three independent routes: `/lca-waterworks/`, `/lca-waterworks-powerbi/`, `/lca-waterworks-tableau/`. Preserve the working public editions while replacing Tableau only after the owner opens and publishes the expanded workbook.
- Reference model 0.2.0; JavaScript interface 0.3; scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Owner priority: get the remaining populated Tableau tabs online before exhaustive detail/presentation refinement. The earlier sequential T02/T03/T04 release gates are superseded by a single broad coverage pass. Material errors, opening failures and confidentiality violations still block publication; cosmetic imperfections do not.
- Native workbooks, extracts and private execution records remain conversation/local artifacts, not committed to this public repository. Only public/synthetic information belongs in public BI publications.

## Latest milestone — T02 expanded-tabs candidate

Artifact: `WaterWorks_Tableau_T02_FullTabs.twbx`, 213267 bytes, SHA-256 `4ec1609ddc67ece5ecbafd4ad790818c2692bbbdca534fe12496ad640d1f3576`. Delivered as a conversation attachment, not published to Tableau Public or added to the repository. Guide, validation JSON and support archive accompany it.

### Implemented in the candidate

Ten populated native dashboards, plus the original standalone `Acceptance - all 33 cases` audit worksheet: eleven intended visible tabs. There are 37 worksheets and nineteen embedded Hyper extracts; supporting worksheet windows are hidden, not deleted.

1. **01 Overview:** existing cards and Central-reference charts preserved.
2. **02 Financing:** existing source/use/capital-funding dashboard preserved.
3. **03 Scenario comparison:** independent comparison parameter; selected/comparator bill and cash paths; 2031 difference cards; all-eleven-preset summaries within the selected division.
4. **04 Customer bill detail:** quarterly fixed/usage/add-on chart and exact component table; annual/quarterly cards. The account remains fixed; quarterly amounts are explicitly distinguished from monthly equivalents.
5. **05 Capital plan reconciliation:** detailed all-division program, detailed/condensed reconciliation and administration bridge; the City 2029 $5.6m discrepancy remains explicit.
6. **06 Customers and history:** service-area water-volume indices and units, all-division historical operating expense and published revenue categories. Service-area selection is separate from financial reporting division; totals/subtotals must not be summed indiscriminately.
7. **07 Settings and evidence:** stored scenario settings, shared/division assumptions, descriptions and frozen model identity. Inputs are read-only prepared settings.
8. **08 Rules and agreements:** nine source-register entries preserving scope, evidence, implementation, status and source. No new legal verification is claimed.
9. **09 Glossary and sources:** fifty glossary entries and twenty-one source references as native tables.
10. **10 Audit and integration:** all-case audit, selected annual cash ledger and five synthetic integration-domain records. No production ERP connection.

The two original dashboard names are unchanged. Overview still compares against Central; independent comparison is on tab 03. Every new dashboard is 1280x1320 or smaller, within the current host's reserved tall-report layout. Long native tables can scroll and may need subsequent width/typography refinement.

### Source and implementation boundaries

The original two Hyper files and both CSVs are byte-identical to T01d. The original thirteen worksheet definitions, format manifest and source/extract connections are preserved. Additional data came from the exact saved Power BI Scenario Explorer v09 package, not new web estimates or a third financial model. Seventeen additional extracts carry 4684 records. No arbitrary financial what-if engine or live optimizer is introduced.

The fixed account remains 5000 monthly billable gallons equivalent, 5/8-inch meter, one EDU where applicable, common wastewater rate 1. Negative cash/days remain modeled shortfalls, not forced to zero or described as broken data. The historical-trend selection shown by the owner remains a conditional result, not an actual LCA financial forecast.

### Verification observed in the authoring environment

- Official Hyper API was installed locally using a checksum-pinned package. Actual database queries opened all nineteen extracts. The original annual/chart rows were compared to their CSVs by logical keys; all 4684 additional records were read back and compared with generated records.
- Annual and five-year cash/source/use/capital identities passed for all 33 cases using actual extract rows; maximum absolute remainder approximately $0.000000030.
- 605 quarterly component records reconciled with 165 annual bills; maximum difference approximately $0.00000000000023.
- Detailed capital total $361,312,000, condensed total $355,712,000 and unique City 2029 $5,600,000 difference verified.
- ZIP integrity, XML parsing, packaged file paths, enabled extracts, field bindings, unique identifiers, dashboard worksheet references and nonoverlapping element bounds passed.
- The installed-build schema reference was consulted to avoid unsupported zoom values; new text tables use fit-width. This is not a claim of complete schema validation.

**UNVERIFIED:** native Tableau Desktop opening/rendering of T02, compilation/execution of its added Tableau calculations, native all-case result on T02, publication of T02, and hosted T02 interactions. Do not relabel T01d's native pass as a T02 native pass. The artifact is a broad first-pass candidate, not an already deployed ten-dashboard report or pixel-identical cross-platform implementation.

### Tooling and repository scope

A single isolated read-only GitHub Actions job on `build/tableau-t02-20261115` retrieved the official Tableau Hyper API wheel with SHA-256 verification. Commit `220a8ea3073c42964286089df87b09404dc731b6`, run `43795817108`, completed successfully. It accessed no native workbook or financial records, used one runner and retained tooling for one day. The branch is not merged into main. Extract generation and validation then ran locally. No independent worker review is claimed.

This main-branch checkpoint changes documentation only. No website markup, provider settings, published workbook, JavaScript code/model, Power BI report, shared CSS or Excel file is altered. Website text must continue describing the currently published two-dashboard edition until T02 publication is confirmed.

## Current public baseline — T01d

Canonical Tableau identity: `WaterWorksOverviewandFinancing/01Overview`, title **WaterWorks — Overview and Financing**. The owner supplied its actual embed and hosted screenshots. Three visible tabs now work: Overview, Financing and the standalone audit. The navigation blocker is resolved; do not restart provider-setting or extract-conversion troubleshooting.

Owner evidence establishes hosted Overview and full Financing, plus signed-out direct Tableau Public Overview access. T01c/T01d Desktop screenshots visibly show all 33 PASS arithmetic only results. The hosted audit tab is visible, but its 33 individual hosted results were not newly inspected. No comprehensive live latency benchmark or every-case browser verification is claimed.

T01d artifact SHA-256: `599af9bf0edfc12d21a0c68567fa0ea5d29f71e7601618767877ba27c1cc5a55`. Preserve the seed and native-tested T01c/T01d. Central Suburban Water: $38.30 bill, 27.2 cash days, 1.53 coverage, $43,516,250 capital, $17,751,000 borrowing, $0 grants and $10,273,448 rounded reserve draw. Additional borrowing: 206.1 days, 1.33 coverage, $28,546,196 borrowing and $1,559,022 reserve draw. City Central: $126.58, 306.9 days, 2.33 coverage and $262,634,500 capital.

## Existing website and analytical checkpoints

- Reciprocal links `f34aecffa964f4efb11195444595064f47445c3e`, Pages run `43786532403`: build/deploy observed successful previously. JavaScript/Power BI link to Tableau; stale pending-embed copy removed. Eighteen static and eighteen in-memory viewport cases passed. Fixtures did not execute remote reports.
- Tableau integration `480e11058e77d19b12faa3039e778fcdbc019985`, run `43717917597`: build/deploy observed successful. Exact public identity, tabs/toolbar requests, direct fallback, persistent notice and third homepage link. Provider's published tab display was resolved by the owner afterward.
- Power BI integration `a8418fb382cf8ce4b46d8698933dce3a8b929383`, run `43632052719`: build/deploy previously successful. Initial homepage cleanup `a4b4660f474e262a31fe48f60599ca4ef2ffc96b`, run `43642918489`, also successful.
- Power BI v09: 33 native arithmetic cases user-confirmed in 307.3ms; ten pages, 106 visuals, 27 tables, 89 measures. Prepared results, no live optimizer. Published/embedded. Its reference fingerprint remains `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`.
- JavaScript retains live assumptions/finite optimization, component tariffs, separate ledgers, capital reconciliation, eleven presets, history, evidence, rules, glossary and synthetic validation. Historical checks: 38 numerical/chart tests, 33 presets, 286 links plus financial/import/optimizer invariants; not rerun as native T02 execution.
- Preserve v08 development work. Earlier performance/memory problems led to prepared v09; no later complete live-solver parity claim is made.

Detailed earlier history and verification distinctions remain in the preceding version-controlled state: https://github.com/nwags/nwags.github.io/blob/1b5e49a323c1ca3d78396a0746bef30c6867f634/lca-waterworks/docs/STATE.md.

## Next objective

Owner opens the expanded TWBX on the Dell 5510, confirms it loads with populated new tabs, and publishes it over the intended existing Tableau Public item. Do not require exhaustive screenshot collection or finishing every cosmetic detail before publication. Retain Show Sheets as Tabs; confirm the intended ten dashboards plus audit are included. The current public workbook is not changed automatically by receiving the artifact.

After confirmed publication, reconcile website scope copy from two dashboards to expanded coverage and check the actual embed identity. Correct material errors; record cosmetic/advanced-interaction items as follow-ups. Preserve other editions and source cutoff. Arithmetic/feasibility are not authority to adopt rates or borrow. Baseline debt principal beyond 2031 and other disclosed assumptions remain unresolved; no live Munis connection. Provider-side deletion/revocation is required to withdraw direct public access. Production/internal-data work remains separate.
