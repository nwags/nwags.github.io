# WaterWorks Power BI companion website

Route: `https://nwags.com/lca-waterworks-powerbi/`

This directory is a **static, JS-free Power BI embedding shell**, not a clone of the existing JavaScript financial engine. Its persistent public independence notice is shared from `../lca-waterworks/site-notice.css`.

## Publication state

**Pending native validation and Power BI service publication.** A `.pbip` project cannot be rendered directly by GitHub Pages or an iframe. The page intentionally shows an explicit pending state instead of an empty/false result. The iframe is inert (no `src`, `hidden`) until a real report URL is supplied. Do not describe this page as an already working Power BI report.

## Finish the integration

1. On a Windows machine with Power BI Desktop, open the separate native project `WaterWorks/WaterWorks.pbip`. Check that Power Query, semantic model/DAX, slicers, all 15 report pages and numerical acceptance fixtures actually work. Do not treat previous structural checks as runtime validation.
2. Confirm every data source and every drilldown is **public or synthetic**. Do not include customer records, credentials, restricted LCA content, or internal ERP sources.
3. Publish the report to a Power BI service workspace for public dissemination. The tenant administrator must permit **Publish to web**; availability/licensing is tenant-specific.
4. In Power BI service select **File > Embed report > Publish to web (public)**, and copy its actual generated iframe `src` URL. It typically belongs to `https://app.powerbi.com/view?r=...`; do not invent one.
5. Set that URL as the `src` on `#powerbi-report` in `index.html`, remove its `hidden` attribute, and replace the `.pbi-placeholder` pending block and status text with the actual report state. Remove `<meta name="robots" content="noindex,follow">` only after successful publication.
6. Verify the public URL on desktop and phone, report visibility anonymously, report interactions, persistent banner while scrolling, source provenance, and equivalence to the reference scenario fixtures. Retain no server-side secrets in GitHub Pages.

Public embedding makes the Power BI report and underlying publicly exposed data accessible to anyone, even outside nwags.com. Only proceed for genuinely public data. If public embedding is disabled, secure iframe embedding requires authenticated users and applicable licenses; it does not produce an anonymous public portfolio experience.

Official Microsoft documentation:
- https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-publish-to-web
- https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-embed-secure

The separate native Power BI project file is intentionally **not** placed in this public website repository.
