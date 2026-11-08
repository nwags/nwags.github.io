# WaterWorks Rate Planning Lab

An independent public-data business-analysis demonstration for the Lehigh County Authority context, published within Nicholas Wagner's existing static portfolio. Model **0.2.0** executes **Suburban Water, Suburban Wastewater and City Division** independently for 2027–2031. City includes water and sewer; reporting totals do not pool cash. This is not an LCA product or an adopted rate study.

## Start here

- [Interactive dashboard](https://nwags.com/lca-waterworks/)
- [User manual](https://nwags.com/lca-waterworks/guide.html)
- [How the model works](model.html)
- [CEO demonstration](docs/CEO_DEMO.md)
- [Model methodology](docs/METHODOLOGY.md)
- [Data provenance and refresh guide](docs/DATA_GUIDE.md)
- [Constraint register](docs/CONSTRAINTS.md)
- [Comparison with public rate models](docs/MODEL_COMPARISON.md)
- [ERP integration](docs/ERP_INTEGRATION.md)
- [Worker orchestration](docs/ORCHESTRATION.md)
- [Current state](docs/STATE.md) and [roadmap](docs/ROADMAP.md)

## What runs

Static HTML, CSS, JavaScript modules, and versioned JSON. Calculations run in the visitor's browser without an AI service, API key, database, analytics tracker, or ERP connection. The existing GitHub Pages deployment serves the project directory. No build step is required. Local JSON imports are read in browser memory; exports are downloaded to the user's device. Reloading loses unsaved settings and saved in-page comparisons. Each division retains its own settings while the page remains open.

The pure numerical engine is `model.mjs`; `app.mjs` renders the dashboard. Sources and statuses are in `data/baseline.json` and `data/constraints.json`. `data/mock-erp.json` contains an isolated legacy schema 1.0, single-fund fictional contract demonstration; its six metrics do not update the three-fund baseline. All money is nominal USD. Evidence cutoff: **November 7, 2026**; 2027 rates remain proposals at that cutoff, although the annual budget had been approved.

## Planning behavior

The central estimate preserves the approved 2027 cash budget, uses full project capital including administration ($361.312 million), and blends future operating growth from 75% CIP annual growth and 25% historical cost CAGR. The original condensed cash interpretation is selectable: City 2029 differs by $5.6 million. Other derived assumptions include retail exposure and fixed/usage shares, grant timing, financing and future tariff growth. Annual component uplifts start at zero above the selected tariff path; an exact 2026 component freeze is a separate option.

The dashboard calculates component bills, shows annual ledger failures, compares named scenarios and enumerates a disclosed finite optimizer family. Household gallons do not define fund revenue mix. Planning coverage excludes capital receipts, grants and borrowing. Contractual paths and an amendment scenario can be explored through explicitly labeled assumptions; missing agreement evidence remains visible and does not certify legal applicability. See the methodology for all equations and the data guide for source conflicts.

Scenario reproducibility requires both the **engine version and the exact data identity**: `dataRevision` SHA-256 fingerprint of normalized model inputs and tariff data. Preserve those with settings, fund, cutoff, source versions and exports. A same-version engine with different baseline data is not the same analysis; the current importer rejects a different fingerprint, engine version or cutoff. Historical review documents retain their original reviewed versions and must not be read as validation of this revision.

## Validation

Command 1 — From the repository root, run the deterministic financial and input-validation checks:

```sh
node --test lca-waterworks/tests/model.test.mjs
```

Use a static HTTP server to review locally; ES module and JSON loading are not supported by opening `index.html` as a `file:` URL. The deployed site and user guide work without a local toolchain. Runtime dependencies: a modern JavaScript browser. Development checks use Node's built-in test runner.

## Extension boundaries

Preserve fund separation, exact source status, the original CIP snapshot, and the distinction between financial feasibility and legal authority. Do not treat the model's coverage proxy as an indenture calculation. Do not upload real ERP extracts, personal information, credentials, or nonpublic agreements to this public repository. Follow `AGENTS.md` and the staged worker briefs before extending the scope.

The original user-facing project goal includes a later production model. That requires reviewed agreements, class-level cost allocation, reconciled internal data, validated cash and debt definitions, and an approved deployment inside LCA's systems. The demonstration is designed to make that work explicit and reusable.
