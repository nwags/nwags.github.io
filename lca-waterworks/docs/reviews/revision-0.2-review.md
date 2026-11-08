# Revision engine review — v0.2.0

Date: 2026-11-08. Scope: normalized three-fund data, `scripts/build-data.py`, `model.mjs`, independent execution probes. Root owns repository implementation; reviewer changed only this research report. UI/source integration is pending a separate bounded pass.

## Judgment

The revised model materially improves accounting transparency and fund coverage. All three 2027 cash ledgers reconcile exactly, published proposed bills match their examples, and true 2026 tariff freezes reproduce historical bills. Financial channels now separate operating receipts, capital receipts, grants, debt, other capital payments and City lease payments.

The bounded engine pass found four concrete defects. Root fixed three while review was active, and independent retesting confirmed those fixes. The fourth is an optimizer validation bug that must be resolved before applying optimizer output. A separate historical-growth classification issue remains material to preset semantics. The default ledger and source numbers are not implicated by either remaining issue.

## Findings and disposition

### R1 — P1: Optimizer can return settings that the public simulator rejects

**Status: observed, fix pending at report creation.**

`optimize` validates the starting settings, then calls private `run` directly on generated candidates. The balanced lever assigns `contractDrift = max(rates)`. `maxUplift` allows 25, while `contractDrift` validates only through 20.

Reproduction: Suburban Water defaults with `optimizationLever='balanced', maxUplift=25, opexDrift=5, minCash=0, minCoverage=3, capexOverrun=50, grantRetention=0, historyWeight=100`; call objective `bills`.

Observed result: fixed/usage arrays `[24,23,22,21,20]`, contract drift 24; `validateSettings(best.settings,data)` returns `contractDrift must be between -10 and 20.` The same failure occurred at O&M drift 10 and 15. Applying the result through `simulate` therefore throws instead of displaying the allegedly feasible path.

**Acceptance:** validate every generated candidate or constrain the candidate space to the public domain. Every returned best result must pass `validateSettings` and `simulate`; search counts must distinguish candidate-generation exclusions if relevant. Test the exact reproduction as well as defaults.

### R2 — P1: A search-lever selection changed financial feasibility

**Status: fixed by root; independently rechecked.**

Originally, uplift policy included `contractDrift` only when `optimizationLever==='balanced'`. The exact same cash/bill scenario with contract drift 20 and max uplift 12 passed all checks with retail lever, but failed five annual checks with balanced lever. Root changed the policy check to include contract drift independently of lever selection. The two scenarios now return identical violations.

### R3 — P1: Washington's fixed charge incorrectly scaled by EDUs

**Status: fixed by root; independently rechecked.**

The source field is `$124 per customer per quarter`; the first engine multiplied it by EDU and labeled it per EDU. Changing EDU 1 to 2 doubled the fixed charge despite one illustrated customer. Root now ignores EDU for this tariff and uses the correct label. Independent annual-bill equality at EDU 1 and 2 passed.

### R4 — P1: City add-on price changes bypassed elasticity

**Status: fixed by root; independently rechecked.**

Originally, price response depended only on the usage/core price ratio. With elasticity -1, a 30% City add-on increase left demand response equal to 1, although the add-on is charged volumetrically. This privileged the default City optimization lever.

Root now weights the core usage and add-on ratios using their declared revenue shares before applying demand response to both volume-related channels. Independent add-on-only probe now produces price response below 1. Fixed receipts and nonexposed contract receipts remain independent from that demand response.

### R5 — P1/P2: Historical volume CAGR is applied as account growth to fixed revenue

**Status: observed semantic mismatch; decision/fix pending.**

`scenarioPresets(...,'history')` supplies historical **water volume** CAGR to `customerGrowth`; `run` then applies its factor to both fixed and volume receipts as an account-growth proxy. City water volume CAGR is -0.394%, whereas customer units CAGR is +0.506%. Those represent opposite directions for fixed-service growth. Suburban Water uses Western Lehigh volume CAGR 1.141%, while Western Lehigh units CAGR is 1.837%, and the full fund also includes other service areas.

**Acceptance:** preferably separate account growth from usage per account; otherwise use an explicitly scoped units/account proxy for the fixed-revenue growth parameter and accurately describe the historical preset. A volume trend should not silently become a fixed-account trend. If an aggregate sensitivity remains intentionally used, label this exact limitation visibly and avoid suggesting empirical account calibration. Do not silently describe Western Lehigh as the full Suburban Water fund.

### R6 — P2: Scenario matching still lacks a baseline identity

**Status: unresolved design gap.**

Import checks schema, model version and cutoff, but not baseline content identity. The same model/cutoff can be edited while an old scenario continues to import and silently produces different outputs. Output rows are correctly recalculated and cannot inject results.

**Acceptance:** add a stable baseline version or content fingerprint to exports and validate it at import, or strictly enforce a model version bump for every financially material baseline change and document that contract. UI should preserve or visibly restore exported scenario names; model import currently returns settings only.

## Independent observed verification

The reviewer ran **99 focused invariant checks**, all passing after the first three root fixes. These are individual assertions in an independent execution probe, not 99 separate repository test cases.

Checked across all three funds:

- 2027 ending unrestricted cash equals source: Water $7,546,095; Wastewater $10,447,425; City $53,947,019.
- Customer receipts equal fixed + usage + add-on + nonexposed receipts in every year.
- Each year's opening cash plus every classified cash inflow minus every classified cash outflow equals ending cash.
- The 2026 freeze produces constant historical bills over all five years: Water $394.40; Common Rate 1 $367.80; City $1,116.48 at the standard illustrated usage.
- Proposed 2027 bills independently observed: Water $408.40; Common Rate 1 $387.00; City $1,212.32.
- Incremental grant/debt totals do not exceed capex less existing debt, grants and capital receipts.
- Three-year delayed grants plus grants remaining after the horizon equal retained original scheduled grants.
- Extra debt service and terminal principal match an independent five-year amortization calculation with 6% interest and five-year terms.
- Export/import recalculates original results even when exported output rows are maliciously changed.
- Fixed-price changes do not change core usage or contract receipts at zero elasticity.
- Household usage, income, meter and bill-type changes leave fund cash unchanged in 15 fund-year comparisons.
- The three corrected defects above have passing focused regressions.

Default central results observed before any changes to the historical preset:

| Fund | 2031 cash | Minimum operating coverage proxy | Numerical/implemented checks |
|---|---:|---:|---|
| Suburban Water | $1,325,105.37 | 1.5255x | Fails cash floor |
| Suburban Wastewater | $6,791,324.42 | 0.7922x | Fails selected tests |
| City | $33,928,469.46 | 2.3279x | Passes |

Default finite optimizer probes searched 363 candidates per objective. Water peak objective found uniform 2.5-point additional annual uplifts; Water bills objective found `[3.7,2.7,1.7,0.7,0]`. Wastewater default balanced objective found retail `[0,0.4,1.4,2.4,3.4]` with 3.4% contract drift. City retained zero add-on uplift because its default already passes. These outputs remain snapshots of the examined assumptions, not recommendations or proof of a global optimum.

## Assumptions that need visible UI/source treatment

- The 25% historical accrual-cost / 75% CIP-growth blend is a policy judgment, not a calibrated most-probable estimate. Its impact should be shown against the no-blend preset.
- Wastewater 2028 CIP costs fall approximately 6.66%; blending with positive historical CAGR materially changes that planned decline.
- City 2029 detailed project capital is $5.6m above condensed cash capital. The selectable alternative preserves the unresolved source conflict; neither should be labeled a proven correction.
- City 2027 reclassification of $5.2m from other capital payments to headline capex preserves cash but remains inferred at project level.
- Wastewater future debt service retains a CIP schedule after the 2027 budget omits a previously planned draw. This is a conservative schedule assumption, not a liability reconciliation.
- Flat future capital receipts, other capital payments and investment income remain significant continuation assumptions.
- Balanced optimization changes residual contract receipts as well as illustrated retail bills. The bill objective does not measure the financial burden on those counterparties and must not be called a fairness or total-customer-cost objective.
- City CPI inputs currently establish the compliance threshold; the planned tariff path uses 5.8% separately. The UI must make that distinction clear or wire the intended economic behavior explicitly.

## Next bounded pass

Recheck the invalid optimizer candidate and historical-growth fix, then inspect UI state/comparison semantics, data identity, model-page equations, default/source labels and exact bill line items. No publication or external contact was performed by this reviewer.

## Static integration follow-up

Reviewed the integrated `app.mjs`, `index.html`, `model.html`, and `guide.html` without opening a browser or changing implementation files.

**Engine fixes independently verified:**

- R1 reproduction now evaluates 563 valid candidates, finds no feasible candidate, and returns `best=null`. The invalid contract drift 24 candidate is excluded. A rejected candidate is preferable to returning a scenario the public engine cannot load.
- R5 now has separate `customerGrowth` and `volumeGrowth`. In all three funds, an account-only change modifies fixed receipts while preserving usage/add-on receipts; a volume-only change modifies usage receipts while preserving fixed receipts. Historical presets use distinct account and volume source CAGRs. City uses +0.5055% units versus -0.39395% volume; Water uses the explicitly scoped Western Lehigh +1.8365% units and +1.1410% volume.

**Main release issue found in static UI review:** comparison `Targets met` currently evaluates every named preset against that preset's default targets, while the current scenario may have different selected targets. Saved scenarios can have different thresholds again. The displayed table does not state those thresholds. Observed concrete contrast: City default passes; the same rates and flows with a 730-day minimum fail. A viewer who raised the current cash target can still see a named comparison marked successful against an unstated 180-day threshold. Either normalize comparison policy thresholds explicitly to current settings or show that each row uses its own targets and expose them. The scenario comparison must not imply that pass/fail is on a common basis when it is not.

**Smaller concrete integration corrections sent to root:**

- `index.html` points to `model.html#optimization`, but the destination id is `search`. A local fragment check independently confirmed the broken link.
- The bill-components card always shows `2027 proposal`, including exact-2026-freeze and custom tariffs. Make the badge identify the displayed scenario, preserving proposed status only for the unadjusted proposal.
- Changing the illustrative account after optimization clears the search result but leaves the `Optimized scenario` name. Usage affects the objective and bill-ceiling feasibility, so the old optimum should become custom or be labeled previously optimized.
- The model page's displayed cash equation omits investment conversions. The engine and manual include them; Wastewater has a $1 conversion in the exact 2027 bridge.
- The Customers heading calls all public history audited. Water sales/unit tables are statistical ACFR content; the audit status should not be extended to them merely because they appear alongside audited financial statements.

**Positive integration findings:** all three funds have enabled controls; fixed/usage/add-on controls and assumed allocations are visible; preset and financial edits mark settings Custom; shared household scope is explicitly stated for comparisons; saved comparisons now include cash, coverage, capital, borrowing and terminal debt; invalid settings disable optimize/save/exports; debt term is visible; imports recalculate rows; the model page explains fund boundaries and the source conflict. The guide accurately distinguishes the synthetic legacy fixture from the three-fund model.

Baseline SHA-256 identity is being added by root and was not yet verified in this follow-up. Browser event behavior and visual layout remain root-owned validation. No new cash arithmetic blocker was found in this static pass.

## Final targeted disposition

**Final reviewer status: no unresolved release blocker found within the reviewed engine, data-identity and static integration scope.** This supersedes the earlier pending-fix statuses above. Browser verification and publication are controller responsibilities and are not certified by this report.

Observed final checks on 2026-11-08:

- All six numbered engine/data findings R1–R6 are resolved. Generated optimizer candidates are validated; feasibility does not depend on search lever; Washington uses the correct customer unit; elasticity includes City volumetric add-ons; account and volume trends are separate; scenario imports require the baseline fingerprint.
- `comparisonContext()` now normalizes account inputs, cash floor, coverage floor, bill ceiling, uplift limit, City CPI and amendment assumption for every comparison. The table explicitly describes this shared basis and calls the result “Shared checks met.” An independent City probe at a 730-day minimum now fails the comparator just as it fails the selected scenario.
- Inspected the dynamic bill-status badge, optimized-to-custom account-input handler, corrected `#search` link, complete model-page cash equation including investment conversions, and corrected public-history heading. Each reported static correction is present.
- The account handler now listens to `input`; root is retesting actual browser interactions. This review confirms the handler wiring, not a browser event observation.
- Independently recomputed SHA-256 over normalized years, fund data and tariff data. It exactly matches the stored fingerprint: `sha256:3955c58456c7dd31767d96910b8b962dce111a7c4862f9d7d6c78fa9f3f89da3`.
- Changed a tariff value only in the review process's in-memory copy and confirmed that the fingerprint changes. No source files were modified by that probe.
- For each of the three funds, JSON export/import preserves the exact settings with matching fingerprint, rejects a wrong fingerprint, and rejects a missing fingerprint. CSV includes `dataRevision` in both its header and every output row.
- Independently ran the current repository suite: **34 tests passed, 0 failed**. These are distinct from the earlier 99 independent invariant assertions and should not be added together as a count of separate tests.

Remaining matters are disclosed model assumptions, not newly discovered implementation blockers: the judgmental historical-cost blend, assumed class and variable shares, scoped historical demand proxies, the City capital source conflict and inferred reclassification, unmatched future Wastewater base debt-service schedule, future nominal receipts, and unestimated baseline debt beyond 2031. The revision makes these visible and permits scenario analysis; it does not establish calibrated probabilities, cost-of-service equity, legal approval or a full liability forecast.
