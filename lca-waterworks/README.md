# WaterWorks Rate Planning Lab

An independent public-data business-analysis demonstration for the Lehigh County Authority context, published within Nicholas Wagner's existing static portfolio. The working model covers **Suburban Water**, 2027–2031. Allentown and wastewater are separate reference systems. This is not an LCA product or an adopted rate study.

## Start here

- [Interactive dashboard](https://nwags.com/lca-waterworks/)
- [User manual](https://nwags.com/lca-waterworks/guide.html)
- [CEO demonstration](docs/CEO_DEMO.md)
- [Model methodology](docs/METHODOLOGY.md)
- [Data provenance and refresh guide](docs/DATA_GUIDE.md)
- [Constraint register](docs/CONSTRAINTS.md)
- [Comparison with public rate models](docs/MODEL_COMPARISON.md)
- [ERP integration](docs/ERP_INTEGRATION.md)
- [Worker orchestration](docs/ORCHESTRATION.md)
- [Current state](docs/STATE.md) and [roadmap](docs/ROADMAP.md)

## What runs

Static HTML, CSS, JavaScript modules, and versioned JSON. Calculations run in the visitor's browser without an AI service, API key, database, analytics tracker, or ERP connection. The existing GitHub Pages deployment serves the project directory. No build step is required. Local JSON imports are read in browser memory; exports are downloaded to the user's device. Reloading loses unsaved settings and the comparison.

The pure numerical engine is `model.mjs`; `app.mjs` renders the dashboard. Sources and statuses are in `data/baseline.json` and `data/constraints.json`. `data/mock-erp.json` contains fictional integration records. All money is nominal USD. Evidence cutoff: **November 7, 2026**; 2027 rates remain proposals at that cutoff, although the annual budget had been approved.

## Validation

Command 1 — From the repository root, run the deterministic financial and input-validation checks:

```sh
node --test lca-waterworks/tests/model.test.mjs
```

Use a static HTTP server to review locally; ES module and JSON loading are not supported by opening `index.html` as a `file:` URL. The deployed site and user guide work without a local toolchain. Runtime dependencies: a modern JavaScript browser. Development checks use Node's built-in test runner.

## Extension boundaries

Preserve fund separation, exact source status, the original CIP snapshot, and the distinction between financial feasibility and legal authority. Do not treat the model's coverage proxy as an indenture calculation. Do not upload real ERP extracts, personal information, credentials, or nonpublic agreements to this public repository. Follow `AGENTS.md` and the staged worker briefs before extending the scope.

The original user-facing project goal includes a later production model. That requires reviewed agreements, class-level cost allocation, reconciled internal data, validated cash and debt definitions, and an approved deployment inside LCA's systems. The demonstration is designed to make that work explicit and reusable.
