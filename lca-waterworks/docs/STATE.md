# Project state

## Current intent

- Repository `nwags/nwags.github.io`, branch `main`; this navigation repair starts from `480e11058e77d19b12faa3039e778fcdbc019985`.
- Three parallel routes: `/lca-waterworks/` (JavaScript), `/lca-waterworks-powerbi/` (Power BI), `/lca-waterworks-tableau/` (initial Tableau edition). No edition replaces another.
- JavaScript interface 0.3 / reference model 0.2.0 / scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Current objective: repair reciprocal website navigation and expose the existing published Tableau sheets before adding the remaining Tableau views. A working Overview is not proof of working workbook navigation.
- Native workbooks, extracts and private execution records stay outside this public repository. Public BI models contain only public/synthetic information.

## Latest checkpoint — cross-links and missing Tableau tabs, November 15, 2026

### Owner evidence

The owner supplied full-page screenshots of the deployed Tableau companion and direct Tableau Public viz. Both render the populated Overview and native independence notice. The direct Public screenshot shows Sign Up / Sign In, supporting owner-observed signed-out access. Neither shows sheet navigation; the owner reports only Overview is reachable. The host screenshot also shows the shared independence banner.

This establishes owner-observed public Overview rendering, not successful Financing/audit navigation, all parameter interactions, provider permissions or independent browser execution here. The earlier broad signed-out-rendering uncertainty is narrowed by these screenshots, while navigation remains unresolved.

### Implemented host repair

- Added Tableau links to the JavaScript and Power BI headers and footers. Added Power BI to the JavaScript header; the Tableau page already links to both other editions.
- Removed stale `Power BI companion (embed pending)` text from the JavaScript scope note and included both live companion links there.
- Scoped header wrapping keeps the extra links visible at narrow widths without changing the shared CSS or other application pages.
- The Tableau embed already requests `tabs=yes` and `toolbar=yes`; those parameters and its exact supplied workbook/view identity remain unchanged. Requests are not proof that the provider exposes tabs.
- No workbook, extract, financial data, formulas, JavaScript application code, shared notice stylesheet, Power BI iframe, Tableau loader or homepage was changed.

### Provider-side next step

In the owner's signed-in Tableau Public session, open **WaterWorks — Overview and Financing**, then its Edit Details/viz settings and check **Show Sheets as Tabs** (some interfaces label it Show Sheets). Do not change global profile settings or the older development-filename publication.

If the published setting is enabled but Financing is still absent, inspect the sheets present in that exact published copy before replacing it from the native-tested T01d workbook. Local existence of Financing and the audit is verified; inclusion in the readable-name public copy remains UNVERIFIED. No remote Tableau settings were changed or claimed as changed here. Do not invent a Financing URL or regenerate extracts as a navigation fix.

References: https://help.salesforce.com/s/articleView?id=001473332&language=en_US&type=1 (Edit Details → Show Sheets as Tabs); https://help.tableau.com/current/pro/desktop/en-us/embed_list.htm (host tabs parameter).

### Observed verification

- 18 static tests passed: eight existing Tableau embed contracts, four new reciprocal-navigation tests, six Power BI embed contracts.
- In-memory Chromium checks passed at six viewport sizes on each of the three hosts (18 cases): cross-links visible and contained in the header, no pairwise cross-link overlap, sticky notice and keyboard skip link.
- Layout fixtures inline the actual CSS, omit scripts and substitute about:blank for remote frames. They do not execute either hosted BI report or test the JavaScript model.
- Byte/content guards confirm the JavaScript dashboard panels, application/model scripts, shared styles, Power BI main content/iframe and entire Tableau host are unchanged.
- Direct external/provider retrieval was unavailable from this environment. Screenshots supply current browser evidence. Deployment of this repair must be checked separately from the repository write and local tests.

## Published host checkpoints

- Tableau integration `480e11058e77d19b12faa3039e778fcdbc019985`, Pages run `43717917597`: build and deploy observed successful. Exact supplied identity `WaterWorksOverviewandFinancing/01Overview`; shared sticky notice, direct fallback, tabs/toolbar requests, fixed-width scroll region, third stacked homepage Online link. Owner reports thumbnail resolved. No provider account changes made.
- Power BI integration `a8418fb382cf8ce4b46d8698933dce3a8b929383`, run `43632052719`: build/deploy previously observed successful. Real Publish-to-web URL with Overview default; responsive host and fallback links.
- Homepage two-edition cleanup `a4b4660f474e262a31fe48f60599ca4ef2ffc96b`, run `43642918489`: build/deploy previously observed successful. Tableau became the third stacked link in 480e110.
- Earlier host contract/layout checks are recorded in the prior state snapshot below. They are not a substitute for remote report execution. Direct/full-screen reports cannot inherit a host's sticky banner.

## Tableau native baseline

T01d artifact SHA-256 `599af9bf0edfc12d21a0c68567fa0ea5d29f71e7601618767877ba27c1cc5a55`. Preserve the user's seed plus working T01c/T01d checkpoints and validated format/connection declarations.

Owner screenshots visibly show all **33 PASS arithmetic only** results in T01c and T01d, with 33 marks / 33 rows. T01d Financing renders full sources/uses and paired capital/funding charts, readable disclosure and complete color keys. Suburban Water / Central cards: $43,516,250 capital, $17,751,000 borrowing, $0 grants, $10,273,448 rounded reserve draw. Hosted Overview screenshot: $38.30 bill, 27.2 minimum cash days, 1.53 coverage proxy, $43,516,250 capital.

T01c sampled control evidence: City / Central $126.58 bill, 306.9 days, 2.33 coverage, $262,634,500 capital. Suburban Water / Additional borrowing $38.30 bill, 206.1 days, 1.33 coverage, $43,516,250 capital; $28,546,196 total borrowing, $0 grants, $1,559,022 reserve draw. Cash diverges from Central; bills coincide.

Current content: two dashboards, thirteen supporting worksheets, three divisions, eleven prepared scenarios and five chart families (bill, cash/target, sources, uses, paired capital/funding). Comparison is fixed to Central within the selected division. No arbitrary new assumptions or live optimizer. Local arithmetic audit availability does not establish its publication.

T01d was presentation-only: byte-identical Hyper/CSV files; all 72 calculation elements, parameters, filters, encodings and format/connection definitions preserved from T01c. Static package/diff/key/font checks and source arithmetic passed; subsequent owner screenshots supply native evidence. Earlier failed openings involved workbook/layout metadata, missing extracts, and incompatible legacy layout attributes; those are not current navigation blockers.

## Other analytical baselines

Power BI v09: owner-run query returned 33 rows / ten columns in 307.3 ms, all checks user-confirmed PASS arithmetic only. Ten pages, 106 visuals, 27 tables, 89 measures; all ten chart families, bills, bridges, evidence, assumptions, glossary and synthetic ERP specification. No native live optimizer or arbitrary override controls. Service publication and code creation are owner-observed; all-case policy feasibility and comprehensive live performance are not claimed.

Reference identity `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`; inspected engine blob `71a6cc3a0b59589cb288eb073a654bb32551ca56`. Generic v09 builder/data-free recipe remain under `../lca-waterworks-powerbi/tools/`. Prior authoring checks: 6,600 comparisons exactly matched frozen reference; 6,435 metric comparisons differed by at most about 9.1e-13; cash/capital identities below $0.00001; 605 bill components matched 165 annual bills. Those are distinct from native/hosted tests.

JavaScript retains separate ledgers, component tariffs, detailed/condensed capital, eleven presets, editable assumptions, finite optimization, exports, history, financing, glossary and synthetic validation. Recorded 2027 closing cash: $7,546,095 / $10,447,425 / $53,947,019. Detailed capital $361.312m versus condensed $355.712m; City 2029 $5.6m discrepancy remains disclosed. Historical checks: 38 numerical/chart tests, 33 presets, 286 links, fingerprints/import rejection and financial/optimizer invariants. Not rerun as native BI validation in this checkpoint.

The v08 development model remains preserved: earlier combined acceptance exhausted memory and routing experiments did not provide a fix. Correct City capital $262,634,500 took 69.525 seconds original, 0.4416 direct-engine, 59.479 candidate-first and 62.8355 with constant optimizer override; not controlled benchmarks. Full v08 solver parity remains unverified, not repaired by v09.

Detailed earlier authoring, repair and deployment history is retained in the version-controlled pre-navigation state: https://github.com/nwags/nwags.github.io/blob/480e11058e77d19b12faa3039e778fcdbc019985/lca-waterworks/docs/STATE.md.

## Next objective and boundaries

Confirm the reciprocal-link deployment, then owner-check Tableau Public Show Sheets as Tabs and the actual published sheet inventory. Verify Overview → Financing → audit navigation in a signed-out browser. Afterward proceed with T02 comparison/customer detail, then T03 capital/history and T04 evidence/rules/glossary/audit as tracked in ROADMAP.md. Missing later views are not hidden tabs.

Keep fixed account assumptions (5,000 monthly gallons equivalent, 5/8-inch meter, one EDU where applicable, common wastewater rate 1), source cutoff and fund separation. Cost blends, exposure, grants, investment income, allocations, agreements and approvals include judgments, not measured probabilities or legal approval. Baseline debt principal beyond 2031 is not reconstructed. No live Munis connection. Provider-side removal/revocation is necessary to withdraw direct public access; deleting a host embed alone is insufficient. Production governance/ERP/internal-data work remains separate.
