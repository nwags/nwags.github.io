"""Normalize versioned public extractions. No network, credentials or private data."""
import json
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data'
e = json.loads((DATA / 'public-evidence.json').read_text())
t = json.loads((DATA / 'tariffs.json').read_text())
sources = json.loads((DATA / 'sources-v1.json').read_text())
known_urls = {s['url'] for s in sources}
for sid, source in t['sources'].items():
    if source['url'] not in known_urls:
        sources.append({'id': sid, 'title': sid, 'url': source['url'], 'locator': source['locator'], 'status': source['status']})
        known_urls.add(source['url'])
for sid, title, url in [
    ('city-cip', '2027–2031 City Division capital plan', 'https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Allentown-Division.pdf'),
    ('admin-cip', '2027–2031 Administration capital plan', 'https://www.lcawaterworks.org/wp-content/uploads/2026/10/2027-2031-Capital-Plan-Administration.pdf')]:
    if url not in known_urls:
        sources.append({'id': sid, 'title': title, 'url': url, 'status': 'Adopted capital plan, October 2026'})

funds = {}
for fid, name, service, future, growth, mix, fixed, addons, industrial in [
    ('suburbanWater', 'Suburban Water', 'Water', 3, 1, 16320546 / 17802780 * 100, 30, 0, 38.2870524062),
    ('suburbanWastewater', 'Suburban Wastewater', 'Sewer', 5, 0, 823922 / 18369298 * 100, 30, 0, 10),
    ('city', 'City Division', 'Water + sewer', 5.8, 0, 70, 40, 10, 3.3333968412)]:
    b = e['budget2027Bridge'][fid]
    c = e['cip'][fid]['rows']
    capex = [-v for v in c['Capex']]
    planned_capex = list(capex)
    if fid == 'city':
        planned_capex = e['plannedCapitalReconciliation']['cityProjectTablePlusAllocatedAdmin']
    fees = b['tappingCapitalFees'] + b['meterSales'] + b['inspectionReviewReimbursements'] + b['otherCapitalCashReceipts']
    other_capital = b['otherCapitalCashPayments'] - (5200000 if fid == 'city' else 0)
    grant_key = 'Grants' if fid == 'city' else 'Contributions'
    grants = list(c.get(grant_key, [0] * 5))
    grants[0] = b['grants']
    borrowing = list(c.get('Capital Funding From New Debt', c.get('Proceeds From NEW Debt')))
    borrowing[0] = b['debtDraws']
    debt = [-a-bb for a, bb in zip(c['Debt Service - Current Debt'], c['Debt Service - NEW Debt'])]
    debt[0] = b['debtService']
    lease = [-v for v in c.get('Annual Lease & Other Payments', [0] * 5)]
    expense_history = e['expenseHistory']['funds'][fid]
    funds[fid] = {
        'id': fid, 'name': name, 'service': service, 'budget': b,
        'defaultBillType': 'common1' if fid == 'suburbanWastewater' else 'standard',
        'futureTariffGrowthPct': future,
        'planVolumeGrowthPct': growth,
        'retailExposurePct': mix, 'fixedSharePct': fixed, 'addonSharePct': addons,
        'industrialSharePct': industrial,
        'historyOpexGrowthPct': expense_history['metrics']['cagr2020to2025Pct'],
        'historicalVolumeGrowthPct': 1.140973886732 if fid == 'suburbanWater' else -0.393948283396 if fid == 'city' else 0,
        'historicalAccountGrowthPct': 1.836521043765 if fid == 'suburbanWater' else 0.505507937425 if fid == 'city' else 0,
        'historicalDemandScope': 'Western Lehigh water history used as a disclosed Suburban Water proxy' if fid == 'suburbanWater' else 'City water history used as a disclosed combined-division demand proxy' if fid == 'city' else 'No complete wastewater class demand series; plan assumptions retained',
        'plan': {
            'customerReceipts': [b['customerCashReceipts'] * v / c['User Charges'][0] for v in c['User Charges']],
            'otherOperatingReceipts': [b['otherOperatingCashReceipts'] * (v / c['Other Operating Revenues'][0] if c['Other Operating Revenues'][0] else 1) for v in c['Other Operating Revenues']],
            'operatingExpense': [b['cashOperatingExpense'] * v / c['Operating expenses'][0] for v in c['Operating expenses']],
            'publishedOperatingExpense': [-v for v in c['Operating expenses']],
            'capitalReceipts': [fees] * 5,
            'otherCapitalPayments': [other_capital] * 5,
            'investmentIncome': [b['investmentIncome']] * 5,
            'investmentConversions': [b['investmentConversions'], 0, 0, 0, 0],
            'leasePayments': lease, 'debtService': debt, 'borrowing': borrowing,
            'grants': grants, 'capex': planned_capex, 'publishedCashCapex': capex,
            'publishedEndingCash': c['Unrestricted Cash Balance'],
            'publishedCoverage': c['DEBT SERVICE COVERAGE RATIO']
        },
        'assumptions': [
            '2027 uses the detailed approved budget cash ledger. Rates remain proposed at the evidence cutoff.',
            '2028–2031 customer receipts preserve the published CIP profile relative to the 2027 budget; that profile includes more than household tariff growth.',
            'Future operating cash expense uses published CIP growth, blended 75% plan / 25% historical 2020–2025 accrual-cost CAGR in the central case. The blend is judgment, not statistical calibration.',
            'Other capital payments, capital receipts and investment income are held at 2027 nominal amounts unless a scenario changes them.',
            'Future base debt service is the published schedule, not a reconstructed amortization ledger. Remaining baseline principal after 2031 is not estimated.'
        ] + ([
            '2027 City capital groups move $5.2m from other capital payments into the headline capital schedule, preserving the exact cash total. Project-level mapping is inferred.',
            'Central City 2029 capital is $53.8195m from detailed project tables plus administration. The published condensed cash table is $5.6m lower.',
            '70% retail exposure and its 40% fixed / 50% core usage / 10% add-on split are explicit planning assumptions; the ACFR does not fully map the categories.'
        ] if fid == 'city' else [
            'The 2027 budget has no new borrowing, whereas the older CIP had $2.175m. Future published debt service is retained as a conservative schedule sensitivity.',
            'Common-rate retail exposure is proxied by the 2025 common-rate accounting share (4.49%). Residual receipts are not all verified wholesale; separate contract/other controls apply.',
            'The industrial share within exposed usage is a 10% sensitivity assumption; public class-level sewer billing determinants are incomplete.'
        ] if fid == 'suburbanWastewater' else [
            '2025 named customer-class revenue is 91.67% of water service charges. The remainder includes fire-service revenue; no household rate multiplier is applied to it by default.',
            'The 30% fixed / 70% variable revenue split is assumed pending billing determinants; industrial usage sensitivity uses a 2025 class-revenue proxy.'
        ])
    }

out = {'schemaVersion': '2.0', 'modelVersion': '0.2.0', 'cutoff': e['cutoff'],
       'years': e['years'], 'funds': funds, 'sources': sources,
       'capitalReconciliation': e['plannedCapitalReconciliation'],
       'defaultRationale': 'Best-supported central planning estimate: approved 2027 cash budget, proposed 2027 component tariffs, detailed project capital, published future revenue/funding profiles, and a 25% historical cost-trend blend. It is an independent scenario, not an adopted LCA forecast or a calibrated most-probable outcome.'}
out['dataRevision'] = 'sha256:' + hashlib.sha256(json.dumps({'years': e['years'], 'funds': funds, 'tariffs': t}, sort_keys=True, separators=(',', ':')).encode()).hexdigest()
(DATA / 'baseline.json').write_text(json.dumps(out, indent=2) + '\n')
print('Normalized three divisions; capital total', sum(sum(f['plan']['capex']) for f in funds.values()))
