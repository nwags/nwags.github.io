# Independent numerical and scope review

**Date:** 2026-11-08.
**Reviewer:** data and model-comparison worker, separate from the implementation controller.
**Scope:** `lca-waterworks/model.mjs`, `data/baseline.json`, and `tests/model.test.mjs`; supporting methodology and optimizer labels were also inspected. No repository files were edited by this worker.
**Conclusion:** No blocking arithmetic, fund-pooling, or financing double-count defect was found in this bounded review. This is a review of the implemented demonstration and its disclosed assumptions, not certification of tariffs, covenants, agreements, or forecast accuracy.

## Reviewed file versions

| File | Observed SHA-256 |
| --- | --- |
| `model.mjs` | `ab8b9a11c25aa85bb0672e0cc3d8add16e5e53ba8f96ade8f1358627ad7fb0ba` |
| `data/baseline.json` | `6fcec480cc66b062172eac9231cc93a2b38a7a2151a46c0f9b5c8e7e9173f395` |
| `tests/model.test.mjs` | `dc73b5e68ca92291b991abc6e6d8271cdd44f3c8587b7b431fc637ef59fc6f37` |

The findings apply to these observed versions. Later integration changes need the controller's normal validation.

## Observed checks and results

### 1. Published first-year ledger: exact reconciliation

An independent literal calculation reproduced:

`11,598,553 + 22,589,638 − 15,183,495 − 3,923,351 − 13,186,250 + 5,651,000 = 7,546,095`.

The model's 2027 cash days were **181.4025476** and its simplified debt-coverage proxy was **1.88770849**, matching the published rounded 181.4 days and 1.89×. The proposed common residential bill at 5,000 gallons/month was exactly **$408.40/year** using the actual fixed and volume tariff components. The 2027 rate increase is already embedded in the anchor: the default scenario does not apply another 3.5% increase to its receipts.

**Primary sources:** [October 26 board packet](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2026October26-BoardAgendaLCA.pdf), PDF pages 13, 16 and 18; [final budget presentation](https://www.lcawaterworks.org/wp-content/uploads/2026/10/LCA-2027-Budget-Final-Review-Approval-102626.pdf), PDF page 8 and household examples.

### 2. Reanchored later years: recalculated, not spliced

The independent calculation started from the final-budget customer receipts and opening cash, applied 1.03 × 1.01 to later customer receipts, scaled operating expense by the original CIP's relative expense levels, used explicit later debt-service totals, and rebuilt each annual ledger. It agreed with the implementation within $0.000001.

| Year | Derived closing cash, USD | Derived cash days | Coverage proxy |
| --- | ---: | ---: | ---: |
| 2027 | 7,546,095.00 | 181.40 | 1.8877 |
| 2028 | 6,562,713.25 | 151.69 | 1.7051 |
| 2029 | 5,537,984.03 | 123.63 | 1.7198 |
| 2030 | 4,364,129.75 | 94.09 | 1.7618 |
| 2031 | 3,215,460.75 | 66.96 | 1.8228 |

These are outputs of the demonstration bridge, **not LCA's published five-year cash forecast**. The code preserves the original CIP ending cash separately and does not copy those balances into the reanchored cash ledger. The material difference in 2027 operating-expense levels is disclosed in the methodology.

**Primary source for the original schedule:** [2027–2031 Suburban Division Capital Plan](https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Suburban-Division.pdf), printed pages 3–4 / PDF pages 6–7.

### 3. Rate exposure and fund separation

The implementation scales customer receipts rather than total authority revenue. Other cash receipts stay at $2,105,008 in the reference. An independent zero-exposure probe changed all selected rate indices to 10% and confirmed customer receipts remained equal to the default reference.

The reviewed test suite also changes other-fund cash, restricted cash, and investments to very large values and verifies that the Suburban Water calculation remains unchanged. The code does not pool City or wastewater balances. The source's ending capital unrestricted cash is included once; restricted cash and investments are excluded from modeled spendable cash.

### 4. Additional debt: positive-interest calculation checked

An independent 20%-of-capital, 4.5%, 20-year debt probe produced a 2027 extra draw of **$2,637,250**. The first payment occurs in 2028, as documented. Its separately calculated annual payment was **$202,741.611619**, comprising first-year interest of **$118,676.25** and principal of **$84,065.361619**. These agreed with the implementation.

Across that five-year probe, terminal additional debt was **$7,970,398.739438**. Outstanding balances are reported, preventing the first five years' lower cash payments from concealing the post-2031 liability. Baseline CIP debt service already contains baseline planned borrowing; the implementation adds debt service only for the separate extra-debt cohorts. No duplicate annuity payment was added for baseline loans.

Additional grant and borrowing amounts are capped against capital spending. Proceeds enter the cash ledger, not the modeled operating-coverage numerator. Full capital spending remains in every scenario.

### 5. Optimizer: independent enumeration and ordering agreed

The reviewer separately generated the disclosed path family, removed duplicates, simulated every candidate, filtered annual financial tests, and lexicographically sorted the feasible results using a separate comparator. At the default settings:

| Check | Observed result |
| --- | --- |
| Unique candidate paths | 453 |
| Numerically feasible candidates | 287 |
| Lowest peak increase path | 5.4%, 5.4%, 5.4%, 5.4%, 5.4% |
| Lowest peak path: five-year household bill total | $2,316.529020 |
| Lowest peak path: minimum cash days | 181.117886 |
| Lowest nominal household-bill path | 6.2%, 5.2%, 4.2%, 3.2%, 2.2% |
| Lowest bill path: five-year household bill total | $2,277.807580 |
| Lowest bill path: minimum cash days | 184.075400 |

Both independently ordered paths matched `optimize`. The UI and methodology label the result as the best feasible path **within the disclosed finite family**, state the 0.1-percentage-point resolution, and separate numerical feasibility from tariff/adoption status. The implementation does not claim a global continuous optimum.

### 6. Existing tests: actually run

Observed execution of `node --test lca-waterworks/tests/model.test.mjs` completed with **18 tests passed, 0 failed**, exit status 0. The independent numerical probes described above also completed with exit status 0 and the final message `INDEPENDENT_CHECKS_PASSED`.

The existing tests cover the source anchor, ledger reconciliation, household/fund independence, rate exposure, excluded cash buckets, debt timing, financing caps, elasticity calibration, optimizer feasibility, infeasibility, bounds, export reproduction, and synthetic ERP validation/rejection. Passing these tests does not validate unknown agreements or future financial assumptions.

## Material limitations, not newly discovered arithmetic defects

### A. Flat investment income has a meaningful effect

The reference keeps **$831,720 of annual investment income** unchanged even as modeled cash falls. The methodology explicitly discloses that interest is not recalculated from balances. This is defensible as a transparent demonstration simplification, but it materially affects results.

A bounded sensitivity calculation removes that income in the four derived years, while preserving the published 2027 anchor. The cumulative change is **$3,326,880**, moving 2031 ending cash from **$3,215,460.75** to **−$111,419.25**, with all other assumptions unchanged. This is an illustrative limiting case, not a forecast that actual investment income will be zero. A production model should separately represent investable balances, cash timing, restricted investment earnings, and interest-rate assumptions.

### B. Fund-wide rate exposure and demand mix are proxies

The default 100% exposure assumes all customer cash receipts respond to the selected aggregate index. The variable-revenue share is proxied by a typical residential bill, while the underlying fund includes other classes and special arrangements. Changing the illustrative household's usage correctly does not change the fund forecast, but this separation does not make the residential revenue mix a measured fund-wide mix.

The methodology and UI identify these as assumptions. The demonstration can show sensitivity; it cannot establish class cost causation, a specific municipality's permitted increase, or the correct industrial demand response. The production replacement needs billing determinants and service/class/contract mappings, not only a general-ledger total.

### C. Coverage and liquidity targets remain planning proxies

The simplified 2027 coverage ratio reconciles to the published rounded figure. That does not establish the later covenant numerator, permitted adjustments, pledged revenues, or all debt restrictions. The 180-day cash and 1.20× coverage defaults are editable planning assumptions. The capital unrestricted cash component's actual operating availability is also a production-policy question. These limitations are already disclosed.

### D. A zero 2027 index is not an exact historical tariff freeze

The model maps the 3.5% planning index to the actual proposed 2027 fixed and volume components. Consequently, changing the 2027 index to zero scales those components by 1/1.035; it does not exactly restore the different 2026 fixed and volume components. At 5,000 gallons/month this would yield about $394.5894 rather than the actual 2026 $394.40 annual bill. The methodology explicitly explains the distinction. Retain that explanation wherever index controls are presented as a rate scenario.

### E. The finite search omits other policy choices

The search examines only three path shapes, nonnegative increases, and the current funding assumptions. It does not optimize tariff component shares, classes, project schedules, grants, financing structure, or post-2031 costs. The UI's finite-family label is correct. A failure within this search does not establish that all possible financing or tariff designs are infeasible.

## Review disposition

The current implementation is internally coherent for a bounded, independent Suburban Water sensitivity demonstration. There is no numerical blocker from this review. Retain the source bridge, assumption disclosures, separate legal/approval status, finite-family optimizer label, synthetic-connector label, and terminal-debt display. The interest-income and customer-class issues are production-model requirements and useful model-review topics, not evidence of an undisclosed arithmetic failure.

Comparator evidence and its source-review limits are recorded in `MODEL_COMPARISON.md`. No additional historical extraction, external contact, repository mutation, or publication was performed for this review.

## Follow-up: investment-income sensitivity control

**Reviewed 2026-11-08 after the controller's narrow update.** The model now has `investmentIncomeRetention`, bounded from 0% to 100% and defaulting to 100%. It changes investment-income receipts only in 2028–2031. The zero-income limiting stress and joint adverse stress both use 0% retention. No implementation files were edited by this reviewer.

| Follow-up file | Observed SHA-256 |
| --- | --- |
| `model.mjs` | `ebece8d14129dc452e4491f037b369f8359728e64dafb4cbd9c7686d114c654f` |
| `data/baseline.json` | `6fcec480cc66b062172eac9231cc93a2b38a7a2151a46c0f9b5c8e7e9173f395` |
| `tests/model.test.mjs` | `0e8e94843715a228ced18cf64c0285b1cbe4bdc7fd56fbb9ca36d1ae48a4c687` |

Observed execution of the updated test suite completed with **19 passed, 0 failed**, exit status 0. A separate narrow probe also completed with exit status 0 and `FOLLOWUP_CHECKS_PASSED`. That probe confirmed the entire 2027 result row remains identical at 100%, 50%, and 0% retention, including **$7,546,095 ending cash**. Customer receipts, operating costs, debt, capital, borrowing, grants, and household bills are unchanged by this control. The annual cash identity still holds.

| Retention in 2028–2031 | Annual future other receipts | 2031 closing cash | Reduction from default |
| --- | ---: | ---: | ---: |
| 100% default | $2,105,008 | $3,215,460.75 | $0 |
| 50% | $1,689,148 | $1,552,020.75 | $1,663,440 |
| 0% limiting case | $1,273,288 | −$111,419.25 | $3,326,880 |

The probe verified each year's cumulative cash difference, not only the terminal value. It also confirmed that the standalone zero-income stress exactly reproduces the zero-retention scenario, that the joint adverse stress includes the same setting, and that negative, above-100, missing, and nonfinite settings are rejected.

**Default optimizer results remain unchanged:** 453 unique candidates, 287 feasible; lowest peak path **[5.4, 5.4, 5.4, 5.4, 5.4]%** with $2,316.529020 in five-year household bills; lowest bill path **[6.2, 5.2, 4.2, 3.2, 2.2]%** with $2,277.807580 in five-year household bills. Stress scenarios now number eight.

**Disposition:** no defect found in this narrow change. The earlier flat-interest finding is now directly testable through the control and stress cases. The default remains the disclosed flat-income assumption; a production model still needs balance-based investment earnings rather than interpreting the retention percentage as a calibrated forecast.
