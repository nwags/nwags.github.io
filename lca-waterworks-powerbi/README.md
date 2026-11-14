# WaterWorks Power BI companion

Public route: `https://nwags.com/lca-waterworks-powerbi/`.

The existing JavaScript application remains at `https://nwags.com/lca-waterworks/`. This companion does not replace it. The website is a static iframe host with a persistent independence disclosure. **The iframe is still inactive: no public Power BI report URL has been configured.**

## Scenario Explorer v09 — publication candidate

The first publication edition is a separate native Power BI report that filters and compares **prepared scenario outputs**. It does not recompute arbitrary assumptions or perform live optimization. The full v08 development project and JavaScript controls remain unchanged.

Scope: three divisions, eleven named presets, 2027–2031; evidence cutoff November 7, 2026. Ten report pages, 106 visuals, 27 model tables and 89 measures replace the large development model. The old `_Engine`, `_Result`, `_BestCandidate`, candidate enumeration and numeric override tables are absent, not merely hidden.

Pages: overview; financing and capital funding; scenario comparison; illustrative customer account; capital-plan reconciliation; customers and historical evidence; scenario settings and evidence; rules and agreements; glossary and sources; audit and integration.

The ten chart families are retained: bill, cash, annual sources, annual uses, paired capital/funding, comparison bills, comparison cash, capital program, historical customer-class volume, and historical operating expenses. Bill components and financing bridges remain tables. No new financial assumptions or chart families are introduced; existing Excel and JavaScript files are not changed.

The illustrative account is fixed to the stored presets: 5,000 billable gallons per month equivalent, a 5/8-inch meter and one EDU where relevant. Suburban wastewater uses common sewer rate 1. This is not full arbitrary tariff-design parity with the JavaScript application.

## Local builder and data boundary

`tools/Build-WaterWorks-ScenarioExplorer-v09.ps1` reads an allowlist of public/synthetic literal tables in a saved local v08 PBIP. `tools/ScenarioExplorer-v09.recipe.txt` is GZip/base64 JSON containing generic report templates, DAX, labels and schemas, not source financial records or executable PowerShell.

Only the builder and data-free recipe are stored here. The generated native report, semantic-model data, local project paths and execution logs stay outside this repository. The builder never uploads files, publishes a report, changes execution policy, installs software or overwrites the source. It refuses an existing destination and pending query changes. Use Windows PowerShell 5.1 or later with Desktop closed.

File SHA-256 values:

- Builder: `d3312bf5f6807bb680b64f5ce20e078653320e5fbbfa93217303870b1eaaa05e`
- Recipe: `e24d7f40f46b6da2ef7f2b95acf032f73e2a0710c39b6a92ac3da1b32c166d97`

Parameters: `ProjectPath` is the saved local v08 `.pbip`; `RecipePath` is the downloaded recipe; `Destination` must be a new folder outside the source. The normal destination is `C:\WaterWorksLab\WaterWorks_ScenarioExplorer_v09`. It creates `WaterWorks_ScenarioExplorer_v09.pbip`, `README.txt`, and `V09_BUILD_RESULT.json`.

The builder checks the frozen model identity, 33 unique cases, 6,435 stored metrics, annual cash sources/uses and continuity, period cash/capital identities, and independently reconstructed default-account bill components. It confirms source-file hashes are unchanged.

## Validation already observed

An equivalent candidate was generated and inspected locally:

- 33 scenarios / 165 annual rows were recomputed with the frozen JavaScript reference engine: 6,600 numeric comparisons, maximum difference zero.
- 6,435 stored metric records agreed with the reference-derived values, maximum difference approximately 9.1e-13.
- 605 tariff bill-component rows reconciled to the 165 annual bills.
- Cash and capital-funding residuals were below $0.00001 for every case.
- 122 JSON/schema documents, 138 field bindings, 10 page bounds and layout intersections passed static checks.
- Old engine/optimizer dependencies and external data connections are absent.

**Neither the Windows PowerShell builder nor the new report has been executed in Power BI Desktop by the authoring environment.** The equivalent-output checks are not native runtime, visual-rendering or performance acceptance. Faster interaction is the architectural goal, not a measured claim yet.

## Native acceptance

Open the new PBIP, refresh once to load the embedded snapshot tables, then save. No gateway, live website, ERP credentials or local external-data path is required. Set explicit report selections before publishing: Suburban Water, Central planning estimate, comparator Central planning estimate. The measures have disclosed defaults when slicers are clear, but selected values are clearer to visitors.

Run `Explorer acceptance` in DAX Query view. It must return 33 rows, populated results, and `PASS arithmetic only` in every row. `CashResidual` and `CapitalResidual` must each be within $0.01 of zero. This checks native selection and aggregation of prepared results, not a live optimization run or independent confirmation of LCA forecasts. Do not update model definitions from a diagnostic query.

Inspect all ten report pages, division/preset changes, default account bill lines, comparison selections, financial targets and disclosures. Record opening, query and interaction performance. A prepared scenario may fail its financial targets while passing arithmetic reconciliation. Some presets coincide for a given division; identical curves are not necessarily an error.

## Finish publication

1. After native acceptance, review all underlying model tables for public suitability, not just visible pages.
2. Publish from Desktop to the authorized Power BI Service workspace. Publishing to Service is not itself anonymous public embedding.
3. In Service, obtain the actual code through **File > Embed report > Publish to web (public)**, if account/tenant permissions allow.
4. Set the exact generated Microsoft URL on `#powerbi-report` in `index.html`; remove its `hidden` attribute and replace the pending block/status. Do not invent an embed URL or store access tokens here.
5. Verify anonymous access, report interactions, navigation and the website's persistent banner on desktop/mobile. Remove the pending `noindex` only after successful publication.

Publish to web exposes the report and underlying model data publicly, including outside this site. Only public or synthetic data is eligible. Native report notices are ordinary report elements, not sticky canvas elements; keep the host website's persistent notice.

Official references:
- https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview
- https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-publish-to-web

The full v08 repair tool is retained for development history; it is not the v09 publication path.
