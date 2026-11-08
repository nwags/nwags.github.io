import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {defaultSettings,scenarioPresets,simulate} from '../model.mjs';
import {FINANCE_CHART_MANIFEST,financeChartRows} from '../finance-charts.mjs';
const read=name=>JSON.parse(fs.readFileSync(new URL('../data/'+name,import.meta.url),'utf8'));
const data={...read('baseline.json'),tariffs:read('tariffs.json')};
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} differs from ${b}`);
test('all division presets reconcile cash sources, uses and the full-period capital bridge',()=>{
 for(const fundId of Object.keys(data.funds))for(const p of scenarioPresets(data,fundId)){
  const rows=financeChartRows(simulate(data,p.settings).rows);
  for(const r of rows){close(r.cashSources-r.cashUses,r.netFlow);close(r.openingCash+r.netFlow,r.cash);close(r.capitalResidual-r.capitalFundingExcess,r.capex-r.identifiedCapitalFunding);}
  const sum=k=>rows.reduce((n,r)=>n+r[k],0);
  const generated=rows.reduce((n,r)=>n+r.customer+r.otherOperating+r.investment-r.operatingExpense-r.lease-r.debtService-r.otherCapitalPayments,0);
  close(sum('capex'),sum('identifiedCapitalFunding')+generated+sum('investmentConversions')+rows[0].openingCash-rows.at(-1).cash);
 }
});
test('additional borrowing and delayed grants remain separate cash categories',()=>{
 const s={...defaultSettings(data,'city'),grantDelay:2,grantRetention:75,extraGrantAnnual:250000,extraDebtShare:35,extraDebtRate:5.25,extraDebtTerm:15,capexOverrun:12};
 const rows=financeChartRows(simulate(data,s).rows);
 assert.equal(rows[0].plannedGrants,0);
 assert.ok(rows.some(r=>r.extraBorrowing>0));
 assert.equal(rows[0].extraDebtService,0);
 assert.ok(rows[1].extraDebtService>0);
 for(const r of rows){close(r.cashSources,r.receipts+r.baseBorrowing+r.extraBorrowing+r.investmentConversions);close(r.cashUses,r.operatingExpense+r.lease+r.otherCapitalPayments+r.debtService+r.capex);}
});
test('chart categories resolve to the glossary and totals use distinct primitive fields',()=>{
 const ids=new Set(read('glossary.json').terms.map(t=>t.id));
 for(const chart of Object.values(FINANCE_CHART_MANIFEST.charts)){
  const items=[...(chart.spending?[chart.spending]:[]),...chart.series];
  assert.equal(new Set(items.map(s=>s.key)).size,items.length);
  for(const s of items){assert.ok(ids.has(s.glossary),s.glossary);assert.match(s.color,/^#[0-9a-f]{6}$/i);}
 }
 assert.ok(!FINANCE_CHART_MANIFEST.formulas.cashSources.fields.includes('grants'));
 assert.ok(!FINANCE_CHART_MANIFEST.formulas.cashUses.fields.includes('debtService'));
});
test('finance presentation retains original amounts and discloses funding above capital',()=>{
 const original=simulate(data,defaultSettings(data,'suburbanWater')).rows[0];
 const r={...original,capex:100,baseBorrowing:120,extraBorrowing:0,plannedGrants:0,extraGrants:0,capitalReceipts:0};
 const presented=financeChartRows([r])[0];
 assert.equal(presented.identifiedCapitalFunding,120);
 assert.equal(presented.capitalResidual,0);
 assert.equal(presented.capitalFundingExcess,20);
 for(const key of Object.keys(r))assert.deepEqual(presented[key],r[key]);
});
