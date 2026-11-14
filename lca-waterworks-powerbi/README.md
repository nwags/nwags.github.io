# WaterWorks Power BI companion

Public route: `https://nwags.com/lca-waterworks-powerbi/`.

The existing JavaScript application remains at `https://nwags.com/lca-waterworks/`. This companion does not replace it. The host page contains no calculation JavaScript: it embeds the native report served by Microsoft and retains the shared sticky independence disclosure.

## Embed configured — November 14, 2026

The owner supplied the complete Microsoft-generated Publish-to-web iframe after seeing the public-publication success dialog. `index.html` now embeds that exact HTTPS `app.powerbi.com/view` URL, including `pageName=Overview`; its token is a public-report identifier, not a credential. The former pending placeholder and hidden iframe have been removed.

The iframe uses the available width and a bounded viewport-relative height. A direct public-report link remains available for a new tab, a narrow screen, or loading problems. The shared notice remains visible on host-page scroll. The report's full-screen view or direct Microsoft page cannot inherit that host notice; the native report retains its own disclosures.

This integration changes no native calculations, financial data, chart family, Excel workbook, JavaScript engine, or tenant setting. Microsoft hosts the report and may serve it independently of this website. Do not put confidential data into the model while Publish to web is active.

### Observed verification and limits

- The owner's native acceptance returned 33 cases in 307.3 milliseconds; the owner confirmed every final check was `PASS arithmetic only`.
- Owner screenshots established authenticated Service rendering and the public embed-code success dialog.
- Host integration checks verified one visible iframe with the exact supplied URL, `pageName=Overview`, an accessible title, full-screen support, and two matching direct links. No host script or credential is added.
- In-memory Chromium host-layout checks passed at 1920x1080, 1440x1000, 768x1024, 390x844, 320x568 and 844x390: no horizontal host overflow, sticky notice retained after scrolling, and visible keyboard skip link. The shared notice stylesheet matched its unchanged repository blob.
- The external iframe was replaced with `about:blank` ONLY in the offline layout fixture. No report visuals were simulated. These checks do not establish anonymous Microsoft report rendering or mobile report interaction.
- Direct external web/browser access was unavailable to the authoring environment. The GitHub Pages workflow is the deployment authority. Confirm the deployed page in a signed-out browser, exercise report selections and page navigation, and inspect the notice while scrolling.

## Scenario Explorer v09 scope

The report filters and compares **prepared scenario outputs**. It does not recompute arbitrary assumptions or perform live optimization. The full v08 development project and JavaScript controls remain unchanged.

Three divisions, eleven named presets and five years (2027–2031) produce 33 cases / 165 annual rows. The evidence cutoff is November 7, 2026; a later Service refresh does not advance it. Ten report pages, 106 visuals, 27 tables and 89 measures replace the large development model. The old `_Engine`, `_Result`, `_BestCandidate`, candidate enumeration and numeric override tables are absent, not merely hidden.

Pages: overview; financing and capital funding; scenario comparison; illustrative customer account; capital-plan reconciliation; customers and historical evidence; scenario settings and evidence; rules and agreements; glossary and sources; audit and integration.

All ten existing chart families are retained: bill, cash, annual sources, annual uses, paired capital/funding, comparison bills, comparison cash, capital program, historical customer-class volume, and historical operating expenses. Bill components and financing bridges remain tables.

The illustrative account is fixed to the stored presets: 5,000 billable gallons per month equivalent, a 5/8-inch meter and one EDU where relevant. Suburban wastewater uses common sewer rate 1. This is not full tariff-design or arbitrary what-if parity with the JavaScript application.

## Local builder and data boundary

`tools/Build-WaterWorks-ScenarioExplorer-v09.ps1` reads an allowlist of public/synthetic literal tables in a saved local v08 PBIP. `tools/ScenarioExplorer-v09.recipe.txt` is GZip/base64 JSON containing generic report templates, DAX, labels and schemas, not source financial records or executable PowerShell.

The native project, model data, local project paths and build logs remain outside this repository. The builder does not upload, publish, change execution policy, install software or overwrite the source. It refuses an existing destination and pending query changes. Use Windows PowerShell 5.1 or later with Desktop closed.

SHA-256:
- Builder: `d3312bf5f6807bb680b64f5ce20e078653320e5fbbfa93217303870b1eaaa05e`
- Recipe: `e24d7f40f46b6da2ef7f2b95acf032f73e2a0710c39b6a92ac3da1b32c166d97`

Parameters: `ProjectPath` selects the saved v08 `.pbip`; `RecipePath` selects the downloaded recipe; `Destination` must be a new folder outside the source. The builder creates `WaterWorks_ScenarioExplorer_v09.pbip`, `README.txt`, and `V09_BUILD_RESULT.json`.

It checks the frozen identity, 33 unique cases, 6,435 stored metrics, annual source/use/cash continuity, period funding/cash identities, and default-account bill components. It confirms source-file hashes are unchanged.

## Numerical acceptance retained

The equivalent candidate was checked against the frozen JavaScript reference: 6,600 numeric comparisons (maximum difference zero), 6,435 stored metrics (maximum difference approximately 9.1e-13), and 605 bill-component rows reconciling to 165 annual bills. Period residuals were below $0.00001. Structural checks covered 122 schema documents, 138 field bindings and ten page layouts.

For future model updates, run `Explorer acceptance` in native Desktop: require 33 populated rows and `PASS arithmetic only` for each, with cash/capital residuals within $0.01 of zero. This verifies filtering and aggregation, not independent economic validation or solver behavior. A scenario may pass arithmetic while failing financial targets. Some presets coincide for a division; identical curves are not necessarily an error.

## Maintenance and withdrawal

- Keep the HTML iframe URL and both direct links identical, including the intended default page. Use only an actual owner-approved Microsoft-generated public URL.
- Test any republished report against the frozen evidence or explicitly version a new snapshot. Do not silently describe prepared outputs as live optimization.
- If Microsoft revokes the code, restore an honest unavailable state; do not show fabricated report results.
- To withdraw public access, revoke the Publish-to-web code in Power BI Service as well as removing the website iframe. Removing the iframe alone does not revoke the direct public report.
- Keep sensitive records, credentials and production ERP data out of this public report and repository.

Official references:
- https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview
- https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-publish-to-web

Run the dependency-free embed regression checks with `python -m unittest discover -s lca-waterworks-powerbi/tests -v`. The older v08 repair tool is retained for development history, not as the v09 publication path.
