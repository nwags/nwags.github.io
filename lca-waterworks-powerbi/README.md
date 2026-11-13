# WaterWorks Power BI companion website

Route: `https://nwags.com/lca-waterworks-powerbi/`

This is the **parallel Power BI website**, not a replacement for `https://nwags.com/lca-waterworks/`. The existing JavaScript model continues to run separately. This directory hosts a static, JavaScript-free iframe shell. Its persistent public independence notice is shared from `../lca-waterworks/site-notice.css`.

## Publication state

**Report connection pending.** The native v07 project has been opened and refreshed in Power BI Desktop and all 15 pages have been visually inspected through user-supplied screenshots. Selected three-division results and ledger interactions have been checked. Total-row semantics, report disclosure and readability require the v08 revision and native acceptance.

A `.pbip` project cannot be rendered directly by GitHub Pages or an iframe. The companion page intentionally shows a pending state. Its iframe has no `src` and remains hidden until the real, approved public report URL is supplied. No public embed is currently configured.

Changing project state and validation boundaries are recorded in [the project state](../lca-waterworks/docs/STATE.md).

## Local v08 repair

[Repair-WaterWorks-Publication-v08.ps1](tools/Repair-WaterWorks-Publication-v08.ps1) is a readable, guarded Windows PowerShell utility. It accepts `-ProjectPath` and `-Destination`; omitting the project path opens a file picker. It requires the corrected, saved v07 `.pbip`, Power BI Desktop closed and no unapplied query changes.

It creates a separate publication candidate and never overwrites the original. It does not publish, upload report data, install software, change execution policy or replace the financial-engine measures. It adds explicit flow/balance presentation measures, disables ambiguous grand totals, adds a page 15 period reconciliation, preserves class filtering in the historical-volume chart, distinguishes zero delayed grants from invalid results, and improves labels and disclosures. All 15 pages remain.

Report-page disclosures appear at the top and bottom; they are not sticky Power BI canvas elements. The website's sticky notice remains necessary. The repair is a candidate, not a claim of native acceptance.

The generic script is public; the native report and semantic model remain outside this repository. No private source data or supporting materials are included here.

### Checks before publication

1. Open the new `WaterWorks_Publication_v08.pbip` and Refresh in Desktop. Its local `.pbi` cache is intentionally not copied.
2. Inspect pages 01, 02, 10 and 15, the notices on all pages, selector behavior and readable table text. Verify division changes and active override behavior.
3. Run `V08 period acceptance.dax` in DAX Query view. Both cash and capital reconciliation residuals should be within one cent of zero. A reconciliation PASS alone does not establish policy feasibility or source accuracy.
4. Run the retained canonical-case and finite-optimizer acceptance queries. Inspect the winning candidate behavior and runtime performance as well as reference counts.
5. Verify every data source and drilldown is **public or synthetic**. Do not include private customer records, credentials, restricted authority material or internal ERP extracts.

PowerShell execution and native v08 DAX/rendering acceptance remain pending on the Windows host. Schema/field checks of an equivalent generated repair output and reference-model arithmetic checks are documented separately in project state; they are not substitutes for those native tests.

## Finish the integration

1. After native acceptance, publish from Power BI Desktop to the intended Power BI Service workspace. Desktop publishing includes the loaded model data; a separate PBIX conversion is not required.
2. Confirm the tenant permits **Publish to web**, the author has the applicable permissions/license and the report meets Microsoft's eligibility requirements.
3. In Power BI Service select **File > Embed report > Publish to web (public)**. Review the public exposure warning, then obtain the actual generated iframe `src` URL. Do not invent a report URL.
4. Set that exact URL as `src` on `#powerbi-report` in this directory's `index.html`, remove `hidden`, and replace the pending block/status with the verified report state. Remove `noindex` only after successful public verification.
5. Test anonymously, check desktop and mobile sizing, interactions and scrolling, and ensure the persistent independence notice remains visible. Preserve navigation to the JavaScript version.

Publish to web exposes the report and its underlying data publicly, not merely to visitors of nwags.com. Secure authenticated embedding is a different architecture and does not provide an anonymous public portfolio experience. No tokens, credentials or backend secrets belong in GitHub Pages.

Official Microsoft documentation:
- https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-overview
- https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-publish-to-web
- https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-embed-secure
