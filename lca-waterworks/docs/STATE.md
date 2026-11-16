# Project state

## Current intent

- Repository: `nwags/nwags.github.io`, branch `main`; this repair checkpoint starts from `d139fe8eb249b390be40fcfd046ce45ef105b586`.
- Three independent routes: `/lca-waterworks/`, `/lca-waterworks-powerbi/`, `/lca-waterworks-tableau/`. Preserve the working public editions while replacing Tableau only after the owner opens and publishes the expanded workbook.
- Reference model 0.2.0; JavaScript interface 0.3; scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Owner priority: publish the remaining populated Tableau tabs before exhaustive detail/presentation refinement. One broad coverage release supersedes the earlier sequential T02/T03/T04 gates. Opening failures, material errors and confidentiality problems still block publication; cosmetic imperfections do not.
- Native workbooks, extracts and private execution records remain conversation/local artifacts, not committed here. Only public/synthetic information belongs in public BI publications.

## Latest checkpoint — T02 opening failure; T02a targeted repair

### Observed failure and cause

The owner attempted `WaterWorks_Tableau_T02_FullTabs.twbx` and supplied D2E8DA72 with fifteen XML diagnostics: one unexpected `style` element at line 1042 and fourteen invalid `text-wrap` format values at lines 3266, 3478, 3526, 3550, 3622, 3646, 3670, 3694, 3718, 3742, 3766, 3790, 3814 and 3838. This supersedes T02's earlier merely-unverified native-opening status: that delivered candidate failed to open.

The exact delivered T02 package was reopened and fingerprinted. The comparison-color style for WaterWorks Annual was appended after object-graph rather than before semantic-values. Fourteen new table worksheets contained unsupported optional text-wrap hints. These are workbook-generation defects, not account, extract or publication-setting problems.

### Repaired conversation artifact

`WaterWorks_Tableau_T02a_FullTabs.twbx`: 213240 bytes; SHA-256 `460a82ac60c10b7f81b755d3118c97397d825fb853c41add312dc22a29cf8191`.

- Moved the existing Annual comparison-color style intact to after layout and before semantic-values.
- Removed fourteen `<format attr="text-wrap" value="on"/>` hints. Source text, tables and their calculations remain intact; wrapping/readability can be refined later.
- All nineteen Hyper files and nineteen CSV files are byte-for-byte identical to T02.
- All 345 calculation elements (including repeated worksheet declarations), parameter definitions, filters, field encodings, connections and workbook-format declarations are unchanged.
- All ten dashboards, 37 worksheets and intended eleven visible tabs are retained. No reduction to the two-dashboard edition.
- Structural allowed-change comparison verifies only the style relocation and fourteen removed formatting hints, apart from workbook-member naming/whitespace. ZIP, XML, packaged extract paths and style-position checks passed.

The README and validation JSON accompany the repaired conversation artifact. No new extract conversion, seed workbook, user-installed tool, account change or software reinstall is required.

### Comparative schema diagnostics and limits

Retrieved Tableau's official 2026.3 XSD pinned to Git blob `11640d5a9d1a80fba661fd3011471e36c804a85a`. A single read-only job on the existing isolated `build/tableau-t02-20261115` tooling branch downloaded only that public schema; no workbook or financial records were uploaded. Tooling commit `206d7720c8e2d12c1a87def5e12e12feee12ad3f`, run `43802830349`, completed successfully. That branch remains separate from main.

The published XSD imports user:UserAttributes-AG and xml:base without providing their definitions. Local helper schemas supplied those imports for lxml diagnostics; all Tableau structural rules stayed unchanged. This is a qualified comparative check, not an unmodified standalone-XSD certificate.

Original T02 produces sixteen diagnostics: the fifteen owner-reported defects plus a trailing-workbook-child diagnostic. Repaired T02a produces only that same trailing-child diagnostic, exactly matching previously native-working T01d. All fifteen owner-reported defects are eliminated. Retained the known-working workbook manifest/root instead of changing them merely to satisfy the baseline diagnostic. **Do not claim a clean full-schema pass.**

**UNVERIFIED:** T02a native Desktop opening/rendering, compilation/execution of new Tableau calculations, native all-case result, expanded publication and hosted interactions. T01d's native pass is not a T02a native pass. Data queries were not rerun for this formatting-only repair; byte identity preserves the data checked during T02 creation.

## Expanded candidate scope — unchanged by T02a

Ten populated native dashboards plus standalone **Acceptance - all 33 cases**; nineteen included extracts, 37 worksheets. Supporting worksheets are hidden, not deleted.

1. **01 Overview:** existing cards and Central-reference charts.
2. **02 Financing:** existing source/use/capital-funding analysis.
3. **03 Scenario comparison:** independent comparator; bill/cash paths, 2031 difference cards and all-eleven-preset summaries within one division.
4. **04 Customer bill detail:** quarterly fixed/usage/add-on chart and exact lines, annual/quarterly cards; fixed illustrative account.
5. **05 Capital plan reconciliation:** all-division program, detailed/condensed schedules, administration bridge and City 2029 $5.6m difference.
6. **06 Customers and history:** service-area water-volume indices/units, historical operating expense and revenue classes. Service-area and financial-division selectors remain distinct.
7. **07 Settings and evidence:** stored settings, shared/division assumptions, scenario descriptions and model identity; not editable financial assumptions.
8. **08 Rules and agreements:** nine source-register entries with scope/evidence/implementation/status/source; no new legal verification.
9. **09 Glossary and sources:** fifty glossary entries and twenty-one source references.
10. **10 Audit and integration:** all-case audit, selected annual cash ledger and five synthetic ERP domain mappings; no production connection.

Original dashboard names remain unchanged; Overview still compares against Central and tab 03 provides the independent comparator. New dashboards are no larger than 1280x1320, within the host's existing tall-report allocation. Detailed tables can need later readability refinements. Do not call the new views published before owner confirmation.

## T02 authoring evidence retained

Failed-opening T02 artifact: 213267 bytes, SHA-256 `4ec1609ddc67ece5ecbafd4ad790818c2692bbbdca534fe12496ad640d1f3576`. Its data/database checks remain distinct from the failed XML opening.

Original two Hyper files, paired CSVs, thirteen worksheets and native format/connections were preserved from T01d. Additional data came from the exact saved Power BI v09 snapshot, not fresh web estimates or a third financial model. Seventeen added extracts contain 4684 records.

Observed during T02 creation: actual Hyper queries opened all nineteen extracts, original rows matched source CSVs, all added records were read back, 33 annual/five-year reconciliations passed (maximum remainder about $0.000000030), and 605 quarterly bill components matched 165 annual bills (difference about $0.00000000000023). Detailed capital $361,312,000 versus condensed $355,712,000 retains the unique City 2029 $5,600,000 difference. Static ZIP/field/path/layout checks passed but missed the now-repaired XML defects.

Hyper tooling retrieval used one isolated read-only job: branch `build/tableau-t02-20261115`, commit `220a8ea3073c42964286089df87b09404dc731b6`, run `43795817108`, success observed. No independent worker review or complete native expanded-workbook test is claimed.

Full prior authoring and scope record: https://github.com/nwags/nwags.github.io/blob/d139fe8eb249b390be40fcfd046ce45ef105b586/lca-waterworks/docs/STATE.md.

## Working public baseline — T01d

Canonical Tableau identity `WaterWorksOverviewandFinancing/01Overview`; title **WaterWorks — Overview and Financing**. Owner evidence establishes hosted Overview and full Financing, three visible tabs including audit, and signed-out direct Public Overview access. Native T01c/T01d screenshots show all 33 PASS arithmetic only rows. Hosted audit rows and comprehensive interaction timing were not newly inspected.

T01d SHA-256 `599af9bf0edfc12d21a0c68567fa0ea5d29f71e7601618767877ba27c1cc5a55`. Preserve it and the owner's seed. Central Suburban Water: $38.30 bill, 27.2 days, 1.53 coverage, $43,516,250 capital, $17,751,000 borrowing, $0 grants and $10,273,448 rounded reserve draw. Additional borrowing: 206.1 days, 1.33 coverage, $28,546,196 borrowing, $1,559,022 reserve draw. City Central: $126.58, 306.9 days, 2.33 coverage, $262,634,500 capital.

The navigation blocker is resolved. Do not repeat provider-tab or extract-conversion troubleshooting for this XML repair.

## Existing website and analytical checkpoints

- Reciprocal links `f34aecffa964f4efb11195444595064f47445c3e`, Pages run `43786532403`: build/deploy previously observed successful; eighteen static and eighteen local viewport cases passed, without executing remote reports.
- Tableau integration `480e11058e77d19b12faa3039e778fcdbc019985`, run `43717917597`: build/deploy successful; owner resolved provider tab display afterward. Exact identity, notices, fallback and third homepage link retained.
- Power BI integration `a8418fb382cf8ce4b46d8698933dce3a8b929383`, run `43632052719`, and homepage cleanup `a4b4660f474e262a31fe48f60599ca4ef2ffc96b`, run `43642918489`: build/deploy previously successful.
- Power BI v09: 33 native arithmetic cases user-confirmed in 307.3ms; ten pages, 106 visuals, 27 tables, 89 measures. Prepared results, no live optimizer. Fingerprint `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`.
- JavaScript retains live assumptions/finite optimization, tariffs, separate ledgers, capital reconciliation, eleven presets, history, evidence, rules, glossary and synthetic validation. Earlier 38 numerical/chart tests, 33 presets and 286 links are historical checks, not new native expanded-Tableau tests. Preserve v08 development artifacts and earlier performance findings.

## Next objective and boundaries

Open **T02a**, not failed T02, on the Dell 5510. Confirm error-free opening, eleven intended tabs, and populated new comparison/bill views. Then publish over the intended existing Tableau Public item with tabs enabled. No exhaustive screenshot collection or cosmetic-perfect gate is required. If another opening/calculation error appears, retain its exact text rather than overwrite the working public report blindly.

After expanded publication is confirmed, update website scope wording and verify the actual embed identity. No live website, report, extracts, model, Power BI, Excel or provider settings changed in this repair; main-branch changes are documentation only. No deployment-success claim is made for this documentation update.

Retain the frozen cutoff and fixed account: 5000 monthly billable gallons equivalent, 5/8-inch meter, one EDU where applicable, common wastewater rate 1. Negative cash/days are modeled shortfalls, not clipped to zero. Arithmetic/policy feasibility is not authority to adopt rates or borrow. Baseline principal beyond 2031 and other disclosed assumptions remain unresolved. No live Munis connection; production/internal-data work is separate. Provider-side revocation/removal is required to withdraw direct public access.
