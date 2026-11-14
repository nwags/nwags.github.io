# Project state

## Current intent

- Project: Sample LCA WaterWorks BI; repository `nwags/nwags.github.io`, branch `main`.
- Parallel routes: `/lca-waterworks/` keeps the JavaScript application; `/lca-waterworks-powerbi/` embeds the separate native Power BI report. Neither replaces the other.
- JavaScript interface 0.3; reference model 0.2.0; scenario schema 2.0; horizon 2027–2031; evidence cutoff November 7, 2026.
- Objective: a useful, honestly scoped educational scenario explorer, not production rate setting or a fully equivalent native optimizer.
- Native project definitions, loaded financial data and private execution records remain outside this public repository. Only public/synthetic information is eligible for the Microsoft public report.

## Latest milestone — public embed configured, November 14, 2026

The owner supplied the complete Microsoft-generated Publish-to-web iframe after screenshots showed the public-publication success dialog. The prior tenant-administration blocker is superseded by that observed success. No tenant credentials, verification challenges or administrator-session details are stored here.

### Implemented

- Activated `#powerbi-report` on the separate companion page with the exact supplied public URL and `pageName=Overview`.
- Removed the pending placeholder, the iframe's hidden state, and the pending noindex metadata.
- Added full-width responsive frame sizing, full-screen support, an accessible title, concise usage guidance and two direct-public-report fallback links.
- Retained the shared sticky independence notice, unchanged. Native report/direct/full-screen views rely on their own report disclosures; they cannot inherit the host's sticky banner.
- Clearly labeled v09 as prepared-scenario comparison, not arbitrary live what-if calculation or live optimization. The evidence cutoff and fixed illustrative account are explicit.
- The JavaScript application, shared notice stylesheet, original financial data/calculations, Excel workbook and native report definitions are unchanged by this host integration. No new chart family was introduced.

### Verification observed

- Six dependency-free HTML/embed contract tests passed: exact iframe URL/default page, fallback consistency, independence notice, prepared-scenario/parallel-site scope, absence of host calculation scripts, and accessible/unique identifiers.
- In-memory Chromium host-layout checks passed at 1920x1080, 1440x1000, 768x1024, 390x844, 320x568 and 844x390. No horizontal host overflow; the notice stayed at the viewport top after scrolling; the keyboard skip link remained visible.
- The shared notice bytes used in the local check matched the existing Git blob `b83ef465086702e71ce67e9434e1fd9acb8c362e`.
- Offline layout checks used an `about:blank` iframe only in the test fixture. They did not simulate or verify the Microsoft report's visuals.
- External site/report requests were unavailable in the authoring environment. Independent live anonymous loading, slicer/page interaction and physical-device rendering remain unverified. Deployment status must be checked using the Pages workflow for the integration commit; a repository change alone is not proof of live deployment.

### Owner-provided Microsoft evidence

- The owner published v09 to Power BI Service and supplied screenshots of the overview with ten page-navigation entries, populated Suburban Water/Central values, charts and the report's independence disclosure.
- The earlier `Contact your admin to enable embed code creation` message was followed by public-publication success and the complete public iframe supplied for this integration.
- These observations establish Service publication and code creation, not independent signed-out verification of the companion site.

## Scenario Explorer v09 — arithmetic acceptance and scope

The user authorized this separate prepared-scenario edition after v08 performance problems. Preserve the full v08 development project, the JavaScript controls and existing Excel files.

### Native acceptance

The user's Desktop screenshot shows the Explorer acceptance query completed with ten columns and 33 rows in **307.3 milliseconds**. The user explicitly confirmed all 33 final checks read **PASS arithmetic only**. The check column was outside the screenshot's visible region, so the all-row pass is user-confirmed. Visible City and Wastewater central values agree with reference results to displayed precision.

This establishes native selection/aggregation arithmetic for prepared outputs, not independent financial forecasts, live optimization, arbitrary new what-if calculations or feasibility of every scenario. The duration is one observed query, not a controlled performance benchmark or guarantee for all Service interactions. No complete local builder execution log was supplied in that checkpoint.

### Edition contents

- Three divisions x eleven named presets = 33 cases / 165 annual rows.
- Ten native report pages, 106 visuals, 27 tables and 89 measures.
- Ten chart families: bill, cash, annual sources, annual uses, paired capital/funding, comparison bills, comparison cash, capital program, historical customer-class volume, historical operating expense.
- Bill components, financing bridges, source history, assumptions, glossary and synthetic ERP integration specification.
- The old `_Engine`, `_Result`, `_BestCandidate`, candidate search and arbitrary override tables are absent, not hidden.
- Fixed account: 5,000 monthly billable gallons equivalent, 5/8-inch meter and 1 EDU where applicable; common wastewater rate 1.
- Friendly display names, explicit balance-versus-flow summaries, no ambiguous grand totals, and independence notices on native pages.

The generic builder and data-free recipe remain under `../lca-waterworks-powerbi/tools/`; see the companion README for checksums and native rebuild instructions. They create a new project from the saved public snapshot without overwriting the source.

Reference identity: `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`. The inspected JavaScript engine blob was `71a6cc3a0b59589cb288eb073a654bb32551ca56`.

### Authoring checks retained

An equivalent candidate was generated locally from the packaged source and frozen reference engine. Fresh simulation of 33 cases / 165 rows yielded 6,600 numeric comparisons with zero maximum difference. The 6,435 prepared metric records differed from fresh derived values by at most approximately 9.1e-13. Annual cash/source/use continuity and period cash/capital bridges reconciled below $0.00001. All 605 reconstructed bill components matched the 165 annual bills. Static checks covered 122 schema documents, 138 bindings and ten page layouts; no old engine/optimizer dependency or external data connection was found.

These authoring checks are distinct from native acceptance and live report behavior. Full page-by-page Service/anonymous interaction review and an independent v09 worker review are not claimed.

## Earlier native v07/v08 evidence retained

Owner output/screenshots established native loading and M refresh after fixing missing `version.json`, the rejected `Measures` name and bare `text` type expressions. All 15 v07 pages were visually inspected. Follow-up City screenshots cleared the apparent stale-division ledger issue; it was not a confirmed persistent defect.

The v08 repair ran on Windows: 15 pages, 19 tables updated, 95 original data tables preserved, 1,018 visuals updated and 1,085 JSON documents parsed. Native screenshots showed populated rows and suppressed misleading totals, but internal PUB08 captions remained.

Combined v08 acceptance failed with insufficient memory after approximately 226 seconds. Individual City/Central/Manual capital queries returned $262,634,500: original measure 69.525 seconds and about one minute on rerun; direct engine 0.4416 seconds; candidate-first 59.479 seconds; query-scoped constant optimizer override 62.8355 seconds. These were not controlled cache tests. Neither routing rewrite was accepted; attributing all delay to optimizer enumeration was unsupported. Full v08 reconciliation and native solver parity remain unverified and were not silently repaired by v09.

## JavaScript baseline and earlier checks

The unchanged JavaScript application provides separate fund ledgers, detailed 2027 cash bridges, component tariffs, detailed/condensed capital alternatives, eleven presets, live assumptions and finite optimization, scenario JSON/CSV, financing charts, glossary and synthetic validation.

Recorded reference figures: 2027 closing cash $7,546,095 / $10,447,425 / $53,947,019; detailed capital $361.312m versus condensed $355.712m. The $5.6m City 2029 difference remains explicit. Grants, debt and capital receipts stay separate from recurring receipts; no interfund pooling.

Earlier checks: 38 combined numerical/chart tests, 33 preset combinations, 286 local links, fingerprint/import rejection, cash identities, tariff examples, funding caps, grant/debt timing and optimizer feasibility. Prior independent model reviews remain under the review documents. These historical checks are not new live-site or native-v09 verification. Physical mobile verification was not claimed.

## Limitations and next objective

Historical-cost blends and future revenue exposure are judgments, not calibrated probabilities. Future grants, investment income, customer-class allocation, executed agreements, City add-on eligibility and financing approvals remain assumptions. Baseline debt principal after 2031 is not reconstructed. Detailed/condensed schedules conflict. Numerical feasibility is not authority to adopt rates or borrow; synthetic ERP documentation is not a live Munis integration.

Next: confirm the Pages deployment for this integration commit; independently check the public companion in a signed-out browser, select divisions/scenarios, navigate report pages, and verify the persistent host notice. Preserve the JavaScript route and evidence cutoff. If the public code is revoked, update the companion honestly; removing the iframe alone does not revoke Microsoft's direct public report.

Production work remains separate: finance-reviewed allocations, billing determinants, full debt schedules, executed agreements and governed ERP extracts.
