# ERP integration and portability guide

## Verified context and limits

LCA’s [2025 ACFR](https://www.lcawaterworks.org/wp-content/uploads/2026/10/LCA-ACFR-2025.pdf), printed page 3, describes completion of a financial-system upgrade in 2025. Its [January 12, 2026 Munis project review](https://www.lcawaterworks.org/wp-content/uploads/2026/01/Munis-ERP-Upgrade-LCA-Board-Project-Review-011226.pdf), pages 3–6, reports a July 1, 2025 actual go-live, a new GL string, utility-billing conversion work, and intermunicipal agreement complexity remaining outside Munis. These are dated public statements; present configuration and interfaces are unverified.

Tyler publishes an [Enterprise ERP API catalog](https://www.tylertech.com/products/enterprise-erp/api-catalog) and [Data & Insights Gateway plugin documentation](https://support.socrata.com/hc/en-us/articles/360033948453-Data-Insights-Gateway-Available-Plugins). These establish general integration possibilities, not LCA’s licenses, enabled modules, tenant endpoints, access rights, or available fields. No production endpoint is specified or called by this project.

## What the current demonstration accepts

[The fixture](../data/mock-erp.json) is entirely fictional. The `validateMock` function in [model.mjs](../model.mjs) implements schema `1.0` with six **metrics**, not six record fields:

| Metric | Synthetic USD control total |
|---|---:|
| `customer_receipts` | 19,000,000 |
| `other_receipts` | 1,000,000 |
| `operating_expense` | 14,000,000 |
| `debt_service` | 3,200,000 |
| `capital_spending` | 10,000,000 |
| `borrowing` | 4,000,000 |

Root fields are `schemaVersion`, `synthetic`, `asOf`, `description`, `records`, and `controlTotals`. Record fields are `recordId`, `fund`, `fiscalYear`, `metric`, `amount`, `currency`, `basis`, `sourceSystem`, `sourceBatch`, and `synthetic`.

The validator requires schema `1.0`, synthetic flags, valid calendar date, 1–1,000 records, unique `MOCK-` identifiers, fund `SUBURBAN_WATER`, year 2027, USD, cash basis, allowed metrics, and finite nonnegative amounts up to $1 billion. It rejects unexpected fields. Metric sums must match all six control totals within $0.005. Validation demonstrates the contract only; it does not certify extraction completeness or ledger reconciliation. Importing this fixture does not replace the public model baseline.

## Proposed production path — not implemented

Begin with an authorized, read-only export from an approved reporting environment. Confirm source reports, access owner, refresh schedule, licensing, and data definitions before evaluating a supported API or connector. Keep extraction and credentials outside GitHub Pages.

A future versioned canonical aggregate should add period, system, service, customer class, fund restriction, cash/accrual basis, actual/budget status, metric, amount, units, extract timestamp, source batch, source report, mapping version, and transformation version. Preserve original amounts. Keep missing, zero, and unavailable distinct. These additions require a new schema; the current validator deliberately rejects them.

Maintain effective-dated GL-to-fund/system/class mappings, including reconciliation across the 2025 conversion. Reject unmapped or duplicate rows. Reconcile source counts and totals to independent approved reports before and after aggregation; explain timing differences and eliminations. Do not silently net funds or infer restricted-cash availability. Maintain agreements, covenants, allocation rules, amendments, and applicability in a separate versioned constraint register linked to the relevant dimensions.

## Connector acceptance workflow

1. Agree the data owner, reporting period, permitted fields, accounting basis, freshness threshold, and control reports.
2. Extract into a controlled staging environment; record batch identity and provenance.
3. Validate schema, mappings, duplicates, period completeness, signs, units, and stale-data status.
4. Reconcile by period/fund/system/class; quarantine failures instead of publishing partial success.
5. Compare approved model aggregates and golden scenarios with the existing engine; record tolerances and exceptions.
6. Release only reviewed public aggregates to the demonstration. Record observation time and reconciliation status.

These are future acceptance steps, not completed connector tests. The public repository and browser accept only synthetic fixtures or approved public aggregates. Never place customer identifiers, addresses, usage histories, payroll, account-level balances, or credentials here. Aggregation alone does not establish privacy; the data owner must review small groups and disclosure risk.

## Excel and Power BI migration

Export annual scenario rows with model version, cutoff, settings, units, and source links. Use Power Query for controlled ingestion; retain year/fund/system/class dimensions. Reproduce these nominal-USD equations before extending the model:

| Result | Excel structured-reference formula |
|---|---|
| Revenue | `=[@customer]+[@other]` |
| Ending cash | `=[@openingCash]+[@revenue]-[@opex]-[@debtService]-[@capex]+[@baseBorrowing]+[@extraBorrowing]+[@grants]` |
| Cash days | `=[@cash]/[@opex]*365` |
| Coverage proxy | `=([@revenue]-[@opex])/[@debtService]` |
| Annual bill | `=[@monthlyBill]*12` |

Use equivalent DAX measures within one year and fund; use `DIVIDE` for ratios and flag zero denominators. Cash is a period-end balance: do not sum it across years. Preserve debt timing, compounded rate ratios, and constraints from model `0.1.0`. Compare every annual result against exported golden scenarios; matching charts alone is insufficient. Coverage remains a demonstration proxy until agreement-specific definitions are verified.
