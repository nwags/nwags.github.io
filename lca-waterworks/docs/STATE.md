# Project state

## Current intent

- Repository `nwags/nwags.github.io`, branch `main`; this documentation checkpoint starts from `f34aecffa964f4efb11195444595064f47445c3e`.
- Three parallel routes: `/lca-waterworks/` (JavaScript), `/lca-waterworks-powerbi/` (Power BI), `/lca-waterworks-tableau/` (initial Tableau edition). No edition replaces another.
- JavaScript interface 0.3 / reference model 0.2.0 / scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Current objective: preserve the working public Tableau edition and proceed with T02 scenario comparison and customer-bill detail. The initial workbook-navigation blocker is resolved by owner-provided hosted evidence; additional analytical pages are development work, not hidden tabs.
- Native workbooks, extracts and private execution records stay outside this public repository. Public BI models contain only public/synthetic information.

## Latest checkpoint — hosted Tableau navigation confirmed, November 15, 2026

### Observed evidence

The owner reported that the change worked and the Tableau dashboard now shows three tabs. The supplied full-page screenshot of the deployed companion visibly shows **01 Overview**, **02 Financing** and **Acceptance - all 33 cases**, with **02 Financing** selected and populated inside the website.

- Suburban Water / Central Financing displays $43,516,250 five-year capital, $17,751,000 borrowing, $0 grants and $10,273,448 display-rounded reserve draw.
- Annual cash-source/use charts, the full paired capital/funding chart, category keys and explanatory footnotes render in the host.
- Both the host independence banner and native report disclosure are visible. The screenshot does not independently demonstrate scroll behavior; earlier local host tests covered stickiness.
- Earlier owner screenshots already established hosted Overview rendering and signed-out direct Tableau Public Overview access. The new screenshot establishes hosted Financing rendering and three-tab visibility. It does not establish that the hosted audit's 33 entries were opened and reviewed, every parameter combination, a controlled latency measurement or the sign-in state of this particular screenshot.
- The owner did not specify every setting changed. Record the observable resolution, not an invented sequence of provider-side actions. No further sheet-toggle, extract conversion, workbook repair or republishing step is required just to repeat this checkpoint.

The initial release is now demonstrated with functioning hosted Overview/Financing access and an exposed audit tab. Native all-33 arithmetic acceptance remains established separately for T01c and T01d. This is not full analytical parity with Power BI or JavaScript, nor financial-policy approval.

### Changes in this checkpoint

Documentation only: record the hosted milestone and advance the roadmap to T02. No workbook, extracts, financial model, website HTML/CSS/scripts, provider settings or existing published report was changed. No new runtime tests or deployment claim is made for this documentation update.

## Previous checkpoint — reciprocal links and missing Tableau tabs

The owner's earlier full-page screenshots showed a populated Overview on the deployed companion and direct Tableau Public viz, but no sheet navigation. The direct Public page showed Sign Up / Sign In, supporting owner-observed signed-out access. At that checkpoint Financing/audit navigation remained unresolved; the latest evidence above supersedes that blocker.

### Host repair retained

- Added Tableau links to the JavaScript and Power BI headers and footers. Added Power BI to the JavaScript header; the Tableau page already links to both other editions.
- Removed stale `Power BI companion (embed pending)` text from the JavaScript scope note and included both live companion links there.
- Scoped header wrapping keeps the extra links visible at narrow widths without changing shared CSS or other application pages.
- The Tableau embed requests `tabs=yes` and `toolbar=yes`, preserving its supplied workbook/view identity. Those host requests alone did not prove provider-side tab availability.
- No workbook, extract, financial data, formulas, application code, shared notice, Power BI iframe, Tableau loader or homepage changed in the reciprocal-link repair.

### Provider investigation retained

The signed-in Tableau Public authoring screenshot subsequently showed both **02 Financing** and **Acceptance - all 33 cases** in the readable-name workbook. The owner was directed to the published visualization's settings rather than its authoring sheet menu, and to check individual Publish selections only if necessary. The owner then confirmed success as recorded above. No remote Tableau settings were changed by the assistant.

References: https://help.salesforce.com/s/articleView?id=001473332&language=en_US&type=1 (Edit Details → Show Sheets as Tabs); https://help.tableau.com/current/pro/desktop/en-us/embed_list.htm (host tabs parameter). These explain the controls; they are not evidence of which actions the owner ultimately performed.

### Earlier observed verification

- 18 static tests passed: eight Tableau embed contracts, four reciprocal-navigation tests, six Power BI embed contracts.
- In-memory Chromium passed six viewport sizes on each of the three hosts (18 cases): cross-links visible and contained, no pairwise cross-link overlap, sticky notice and keyboard skip link.
- Layout fixtures inline the actual CSS, omit scripts and substitute about:blank for remote frames. They do not execute hosted BI reports or test the JavaScript model.
- Byte/content guards preserved JavaScript dashboard panels, application/model scripts, shared styles, Power BI main content/iframe and the Tableau host.
- External/provider retrieval was unavailable in that authoring environment. Owner screenshots supply current browser evidence; they are not independent execution by the assistant.

## Published host checkpoints

- Reciprocal-navigation repair `f34aecffa964f4efb11195444595064f47445c3e`, Pages run `43786532403`: build and deploy observed successful in the preceding session. This commit was rechecked as main before the present documentation update.
- Tableau integration `480e11058e77d19b12faa3039e778fcdbc019985`, Pages run `43717917597`: build and deploy observed successful. Exact supplied identity `WaterWorksOverviewandFinancing/01Overview`; shared sticky notice, direct fallback, tabs/toolbar requests, fixed-width scroll region, third stacked homepage Online link. Owner reported the Tableau Public thumbnail resolved.
- Power BI integration `a8418fb382cf8ce4b46d8698933dce3a8b929383`, run `43632052719`: build/deploy previously observed successful. Real Publish-to-web URL with Overview default; responsive host and fallback links.
- Homepage two-edition cleanup `a4b4660f474e262a31fe48f60599ca4ef2ffc96b`, run `43642918489`: build/deploy previously observed successful. Tableau became the third stacked link in 480e110.
- Host checks do not substitute for provider execution. Direct/full-screen reports cannot inherit a host's sticky banner.

## Tableau native baseline

T01d artifact SHA-256 `599af9bf0edfc12d21a0c68567fa0ea5d29f71e7601618767877ba27c1cc5a55`. Preserve the user's seed plus working T01c/T01d checkpoints and validated format/connection declarations.

Owner screenshots visibly show all **33 PASS arithmetic only** results in T01c and T01d, with 33 marks / 33 rows. T01d Financing renders full sources/uses and paired capital/funding charts, readable disclosure and complete keys. Suburban Water / Central cards: $43,516,250 capital, $17,751,000 borrowing, $0 grants, $10,273,448 rounded reserve draw. Hosted Overview screenshot: $38.30 bill, 27.2 minimum cash days, 1.53 coverage proxy, $43,516,250 capital.

T01c sampled controls: City / Central $126.58 bill, 306.9 days, 2.33 coverage, $262,634,500 capital. Suburban Water / Additional borrowing $38.30 bill, 206.1 days, 1.33 coverage, $43,516,250 capital; $28,546,196 total borrowing, $0 grants, $1,559,022 reserve draw. Cash diverges from Central; bills coincide.

Current content: two dashboards, thirteen supporting worksheets, three divisions, eleven scenarios and five chart families (bill, cash/target, sources, uses, paired capital/funding). Comparison is fixed to Central within the selected division. No arbitrary new assumptions or live optimizer. The audit tab is now visible on the hosted companion; its all-33 results remain directly observed in Desktop, not newly inspected in the hosted audit.

T01d was presentation-only: byte-identical Hyper/CSV files; all 72 calculation elements, parameters, filters, encodings and format/connection definitions preserved from T01c. Static package/diff/key/font checks and source arithmetic passed; subsequent owner screenshots supply native evidence. Earlier failed openings involved workbook/layout metadata, missing extracts and incompatible legacy layout attributes; those are no longer current blockers.

## Other analytical baselines

Power BI v09: owner-run query returned 33 rows / ten columns in 307.3 ms, all checks user-confirmed PASS arithmetic only. Ten pages, 106 visuals, 27 tables, 89 measures; all ten chart families, bills, bridges, evidence, assumptions, glossary and synthetic ERP specification. No native live optimizer or arbitrary override controls. Service publication and code creation are owner-observed; all-case policy feasibility and comprehensive live performance are not claimed.

Reference identity `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`; inspected engine blob `71a6cc3a0b59589cb288eb073a654bb32551ca56`. Generic v09 builder/data-free recipe remain under `../lca-waterworks-powerbi/tools/`. Prior authoring checks: 6,600 comparisons exactly matched frozen reference; 6,435 metric comparisons differed by at most about 9.1e-13; cash/capital identities below $0.00001; 605 bill components matched 165 annual bills. Distinct from native/hosted tests.

JavaScript retains separate ledgers, component tariffs, detailed/condensed capital, eleven presets, editable assumptions, finite optimization, exports, history, financing, glossary and synthetic validation. Recorded 2027 closing cash: $7,546,095 / $10,447,425 / $53,947,019. Detailed capital $361.312m versus condensed $355.712m; City 2029 $5.6m discrepancy remains disclosed. Historical checks: 38 numerical/chart tests, 33 presets, 286 links, fingerprints/import rejection and financial/optimizer invariants. Not rerun as native BI validation here.

Preserve the v08 development model: combined acceptance exhausted memory and routing experiments did not provide a fix. Correct City capital $262,634,500 took 69.525 seconds original, 0.4416 direct-engine, 59.479 candidate-first and 62.8355 with constant optimizer override; not controlled benchmarks. Full v08 solver parity remains unverified, not repaired by v09.

Earlier authoring, repair and deployment history remains in the version-controlled pre-navigation state: https://github.com/nwags/nwags.github.io/blob/480e11058e77d19b12faa3039e778fcdbc019985/lca-waterworks/docs/STATE.md.

## Next objective and boundaries

Proceed with **T02 comparison/customer detail** in a separate working copy while keeping the current public release intact. Add independent selected/comparator scenarios and customer fixed/usage/add-on bill detail using the same snapshot and tested connections. Then T03 capital/history and T04 evidence/rules/glossary/audit, per ROADMAP.md. Missing later views are not hidden tabs. No replacement workbook or T02 implementation is claimed by this checkpoint.

Keep the fixed account (5,000 monthly gallons equivalent, 5/8-inch meter, one EDU where applicable, common wastewater rate 1), cutoff and fund separation. Cost blends, exposure, grants, investment income, allocations, agreements and approvals include judgments, not calibrated probabilities or legal approval. Baseline debt principal beyond 2031 is not reconstructed. No live Munis connection. Provider-side removal/revocation is necessary to withdraw direct public access; removing the host alone is insufficient. Production governance/ERP/internal-data work remains separate.
