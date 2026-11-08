import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {defaultSettings,buildReference,simulate,optimize,stressTests,annuityPayment,validateSettings,validateMock,exportScenario,sum} from '../model.mjs';

const data=JSON.parse(await readFile(new URL('../data/baseline.json',import.meta.url),'utf8'));
const fixture=JSON.parse(await readFile(new URL('../data/mock-erp.json',import.meta.url),'utf8'));
const defaults=defaultSettings(data);
const near=(a,b,tolerance=1e-6)=>assert.ok(Math.abs(a-b)<=tolerance,`${a} differs from ${b}`);

test('approved 2027 cash ledger and exact proposed typical bill reconcile independently',()=>{
  const r=simulate(data,defaults).rows[0];
  const closing=11598553+22589638-15183495-3923351-13186250+5651000;
  assert.equal(closing,7546095); near(r.cash,closing);
  near(r.cashDays,7546095/15183495*365);
  near(r.dscr,(22589638-15183495)/3923351);
  near(r.annualBill,4*(38.20+15*4.26));
  near(r.customer,20484630); near(r.other,187234+1086054+831720);
  assert.equal(Math.round(r.cashDays*10)/10,data.budget2027.reportedCashDays);
  assert.equal(Math.round(r.dscr*100)/100,data.budget2027.reportedDscr);
});

test('later reference values are recalculated from the final budget, not old CIP cash',()=>{
  const r=buildReference(data);
  near(r[1].customer,20484630*1.03*1.01);
  near(r[1].opex,15183495*13845400/13312885);
  near(r[1].debtService,3600227+871239);
  near(r[1].other,2105008);
  assert.notEqual(r[0].cash,data.cip.endingCash[0]);
  r.forEach((row,i)=>{
    near(row.openingCash,i?r[i-1].cash:11598553);
    near(row.cash,row.openingCash+row.revenue-row.opex-row.debtService-row.capex+row.borrowing);
  });
});

test('default scenario exactly reproduces every reference ledger row',()=>{
  const result=simulate(data,defaults);
  for(let i=0;i<5;i++) for(const key of ['customer','revenue','opex','debtService','capex','openingCash','cash','cashDays','dscr']) near(result.rows[i][key],result.reference[i][key]);
  near(result.totalCapital,43516250); near(result.totalBorrowing,17751000);
  assert.equal(result.feasible,false);
  assert.deepEqual([...new Set(result.failures.map(x=>x.year))],[2028,2029,2030,2031]);
});

test('household usage and income affect household outputs, not fund finances or demand proxy',()=>{
  const a=simulate(data,{...defaults,elasticity:-.15,rates:[5,5,5,5,5]});
  const b=simulate(data,{...defaults,elasticity:-.15,rates:[5,5,5,5,5],usage:10000,income:70000});
  a.rows.forEach((r,i)=>{near(r.cash,b.rows[i].cash);near(r.customer,b.rows[i].customer);});
  assert.ok(b.rows[0].monthlyBill>a.rows[0].monthlyBill);
  assert.ok(b.rows[0].householdBurden<a.rows[0].householdBurden);
});

test('no other fund, restricted cash, or investment balance is silently spendable',()=>{
  const altered=structuredClone(data);
  altered.authorityBudget2027[1].endingCash=1e12;
  altered.authorityBudget2027[2].endingCash=1e12;
  altered.budget2027.restrictedCash=1e12;
  altered.budget2027.unrestrictedInvestments=1e12;
  assert.deepEqual(simulate(altered,defaults).rows,simulate(data,defaults).rows);
});

test('fund-wide exposure is explicit and non-rate receipts do not grow with rates',()=>{
  const a=simulate(data,{...defaults,rateExposure:0});
  const b=simulate(data,{...defaults,rateExposure:0,rates:[10,10,10,10,10]});
  a.rows.forEach((r,i)=>{near(r.revenue,b.rows[i].revenue);near(r.other,2105008);});
  assert.ok(b.rows[4].monthlyBill>a.rows[4].monthlyBill);
});

test('extra debt has next-year payments and outstanding balances reconcile',()=>{
  near(annuityPayment(100000,0,20),5000);
  near(annuityPayment(0,.045,20),0);
  const r=simulate(data,{...defaults,extraDebtShare:20,extraDebtRate:0,extraDebtTerm:20}).rows;
  near(r[0].extraDebtService,0);
  near(r[0].extraDebtOutstanding,13186250*.2);
  near(r[1].extraDebtService,r[0].extraBorrowing/20);
  r.forEach((row,i)=>{
    near(row.extraDebtOutstanding,(i?r[i-1].extraDebtOutstanding:0)+row.extraBorrowing-row.extraPrincipal);
    near(row.extraDebtService,row.extraPrincipal+row.extraInterest);
    near(row.debtService,row.baseDebtService+row.extraDebtService);
  });
});

test('capital financing is capped, grants do not enter coverage, and full cash identity holds',()=>{
  const a=simulate(data,defaults),b=simulate(data,{...defaults,grantAnnual:5000000,extraDebtShare:50});
  for(const [i,r] of b.rows.entries()){
    assert.ok(r.baseBorrowing+r.extraBorrowing+r.grants<=r.capex+1e-7);
    near(r.cash,r.openingCash+r.revenue-r.opex-r.debtService-r.capex+r.baseBorrowing+r.extraBorrowing+r.grants);
    near(r.revenue,a.rows[i].revenue);
    near(r.dscr,(r.revenue-r.opex)/r.debtService);
  }
  near(sum(b.rows.map(r=>r.capitalFromOperations+r.baseBorrowing+r.extraBorrowing+r.grants))+11598553-b.rows[4].cash,b.totalCapital);
});

test('negative elasticity reduces receipts at a higher index, while preserving reference calibration',()=>{
  const s={...defaults,rates:[8,8,8,8,8]};
  const a=simulate(data,s),b=simulate(data,{...s,elasticity:-.2});
  b.rows.forEach((r,i)=>assert.ok(r.customer<a.rows[i].customer));
  near(simulate(data,{...defaults,elasticity:-.2}).rows[0].customer,20484630);
});

test('finite search returns a feasible level path; a lower peak within this family fails',()=>{
  const r=optimize(data,defaults,'smooth');
  assert.ok(r.best); assert.equal(r.best.name,'Level');
  assert.deepEqual(r.best.rates,[5.4,5.4,5.4,5.4,5.4]);
  assert.ok(r.tested>400&&r.tested<500);
  assert.equal(simulate(data,{...defaults,rates:r.best.rates}).feasible,true);
  assert.equal(optimize(data,{...defaults,maxRate:5.3},'smooth').best,null);
});

test('bill objective reports no worse bill than peak objective within the same family',()=>{
  const peak=optimize(data,defaults,'smooth'),bill=optimize(data,defaults,'bill');
  assert.ok(bill.best.result.totalHouseholdBill<=peak.best.result.totalHouseholdBill+1e-7);
  assert.equal(bill.best.result.feasible,true);
});

test('infeasibility is explicit and neither optimizer mutates supplied settings',()=>{
  const s={...defaults,maxRate:0},before=structuredClone(s);
  const r=optimize(data,s);
  assert.equal(r.best,null);assert.equal(r.feasibleCount,0);assert.deepEqual(s,before);
  assert.equal(optimize(data,{...defaults,billCeiling:1}).best,null);
});

test('bill ceiling applies every year and negative cash cannot pass a zero cash-days floor',()=>{
  const r=simulate(data,{...defaults,billCeiling:33,minCash:0,rates:[3.5,25,25,25,25]});
  assert.ok(r.rows[0].failures.includes('Household bill ceiling'));
  const adverse=simulate(data,{...defaults,rates:[-5,-5,-5,-5,-5],minCash:0,capexOverrun:50,opexDrift:5});
  assert.ok(adverse.rows.some(r=>r.failures.includes('Negative cash')));
});

test('stress scenarios disclose unchanged grant and interest cases and adverse changes hurt liquidity',()=>{
  const s=stressTests(data,defaults);
  assert.equal(s.length,8);
  assert.deepEqual(s[4].result.rows,s[0].result.rows);
  assert.deepEqual(s[5].result.rows,s[0].result.rows);
  assert.ok(s.at(-1).result.minCashDays<s[0].result.minCashDays);
});

test('investment-income sensitivity preserves 2027 and removes only the selected future amount',()=>{
  const base=simulate(data,defaults),zero=simulate(data,{...defaults,investmentIncomeRetention:0}),half=simulate(data,{...defaults,investmentIncomeRetention:50});
  near(zero.rows[0].cash,base.rows[0].cash);
  near(base.rows[4].cash-zero.rows[4].cash,4*831720);
  near(base.rows[4].cash-half.rows[4].cash,2*831720);
  for(let i=1;i<5;i++){near(base.rows[i].other-zero.rows[i].other,831720);near(zero.rows[i].customer,base.rows[i].customer);}
  assert.throws(()=>validateSettings({...defaults,investmentIncomeRetention:101}));
});

test('invalid and missing model inputs are rejected before calculation',()=>{
  for(const patch of [{rates:[3,3]},{rates:[3,3,3,3,NaN]},{opexDrift:Infinity},{minDscr:0},{grantAnnual:-1},{extraDebtTerm:20.5},{usage:15001}]) assert.throws(()=>validateSettings({...defaults,...patch}));
});

test('scenario export carries versions, evidence cutoff, legal status, and reproducible settings',()=>{
  const r=simulate(data,defaults),x=JSON.parse(JSON.stringify(exportScenario(data,defaults,r)));
  assert.equal(x.legalApproval,'not established');assert.equal(x.dataCutoff,data.cutoff);
  assert.equal(x.modelVersion,data.modelVersion);assert.equal(x.sourceUrls.length,data.sources.length);
  assert.deepEqual(simulate(data,x.settings).rows,r.rows);
});

test('synthetic ERP fixture validates and reconciles to independent control totals',()=>{
  const r=validateMock(fixture);assert.equal(r.valid,true);assert.equal(r.count,6);
  near(r.totals.customer_receipts,19000000);near(r.totals.operating_expense,14000000);
});

test('ERP rejection covers duplicates, fund mixing, personal fields, basis, dates, and missing totals',()=>{
  const mutations=[
    x=>x.records.push(structuredClone(x.records[0])),
    x=>x.records[0].fund='CITY',
    x=>x.records[0].customerName='Private name',
    x=>x.records[0].basis='accrual',
    x=>x.records[0].amount=-1,
    x=>x.synthetic=false,
    x=>x.asOf='2026-02-30',
    x=>delete x.controlTotals.borrowing,
    x=>x.customerRecords=[],
    x=>x.controlTotals.unrecognized=10
  ];
  for(const mutate of mutations){const x=structuredClone(fixture);mutate(x);assert.equal(validateMock(x).valid,false);}
  assert.equal(validateMock(null).valid,false);
});
