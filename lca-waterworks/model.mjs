/** Pure, deterministic public-data demonstration. All money is nominal USD. */
export const MODEL_VERSION = '0.1.0';
export const sum = xs => xs.reduce((a,b) => a+b,0);
const EPS = 1e-7;
const bounded = (v,lo,hi,name) => {
  if (typeof v !== 'number' || !Number.isFinite(v) || v < lo || v > hi) throw new Error(`${name} must be between ${lo} and ${hi}.`);
  return v;
};

export function defaultSettings(data) {
  return {rates:[...data.referenceRatePct], opexDrift:0, customerGrowth:1, capexOverrun:0, extraDebtShare:0,
    extraDebtRate:4.5, extraDebtTerm:20, grantAnnual:0, investmentIncomeRetention:100, elasticity:0, rateExposure:100,
    minCash:180, minDscr:1.2, maxRate:15, billCeiling:0, usage:5000, income:35000};
}

export function validateSettings(s) {
  if (!s || !Array.isArray(s.rates) || s.rates.length !== 5) throw new Error('Exactly five annual rate inputs are required.');
  s.rates.forEach((v,i)=>bounded(v,-5,25,`Rate for ${2027+i}`));
  for(const [k,lo,hi] of [['opexDrift',-2,5],['customerGrowth',-3,4],['capexOverrun',0,50],['extraDebtShare',0,50],
    ['extraDebtRate',0,15],['extraDebtTerm',5,40],['grantAnnual',0,5000000],['investmentIncomeRetention',0,100],['elasticity',-.4,0],['rateExposure',0,100],
    ['minCash',0,500],['minDscr',1,3],['maxRate',0,25],['billCeiling',0,500],['usage',500,15000],['income',5000,300000]]) bounded(s[k],lo,hi,k);
  if (!Number.isInteger(s.extraDebtTerm)) throw new Error('Extra debt term must be a whole number of years.');
  return s;
}

export function buildReference(data) {
  const b=data.budget2027, c=data.cip;
  let customer=b.customerCashReceipts, cash=b.openingCash;
  const other=b.totalCashRevenue-b.customerCashReceipts;
  return data.years.map((year,i)=>{
    if (i) customer *= (1+data.referenceRatePct[i]/100)*(1+data.referenceGrowthPct/100);
    const opex=b.cashOperatingExpense*c.cashOperatingExpense[i]/c.cashOperatingExpense[0];
    const debtService=i===0?b.debtService:c.currentDebtService[i]+c.newDebtService[i];
    const capex=c.cashFlowCapex[i], borrowing=c.newBorrowing[i];
    const openingCash=cash, revenue=customer+other, netFlow=revenue-opex-debtService-capex+borrowing;
    cash+=netFlow;
    return {year,customer,other,revenue,opex,debtService,capex,borrowing,openingCash,cash,netFlow,
      cashDays:cash/opex*365, dscr:(revenue-opex)/debtService,
      status:i===0?'2027 approved budget with proposed rates':'derived scenario; not an LCA forecast'};
  });
}

export function annuityPayment(principal, annualRate, years) {
  if (principal===0) return 0;
  if (annualRate===0) return principal/years;
  return principal*annualRate/(1-Math.pow(1+annualRate,-years));
}

export function simulate(data, settings) {
  const s=validateSettings(settings), reference=buildReference(data), b=data.budget2027;
  let cash=b.openingCash, rateRatio=1, referenceBillScale=1;
  const loans=[], rows=[];
  const monthlyProposed=data.tariff['2027'].quarterlyFixed/3 + s.usage/1000*data.tariff['2027'].perThousandGallons;
  // This household component mix is an explicit proxy for the fund's variable-revenue share.
  const variableShare=(s.usage/1000*data.tariff['2027'].perThousandGallons)/monthlyProposed;
  // Use the published typical household, not the user's selected usage, to avoid changing fund revenue when a household control moves.
  const fundVariableShare=(5000/1000*data.tariff['2027'].perThousandGallons)/(data.tariff['2027'].quarterlyFixed/3+5000/1000*data.tariff['2027'].perThousandGallons);
  for (let i=0;i<5;i++) {
    const base=reference[i];
    rateRatio *= (1+s.rates[i]/100)/(1+data.referenceRatePct[i]/100);
    if(i) referenceBillScale*=1+data.referenceRatePct[i]/100;
    const growthRatio=Math.pow((1+s.customerGrowth/100)/(1+data.referenceGrowthPct/100),i+1);
    const exposed=s.rateExposure/100;
    const demandEffect=Math.pow(rateRatio,s.elasticity);
    const priceRevenueFactor=(1-exposed)+exposed*rateRatio*((1-fundVariableShare)+fundVariableShare*demandEffect);
    const customer=base.customer*growthRatio*priceRevenueFactor;
    const other=base.other-(i>0?b.investmentIncome*(1-s.investmentIncomeRetention/100):0);
    const revenue=customer+other;
    const opex=base.opex*Math.pow(1+s.opexDrift/100,i+1);
    const capex=base.capex*(1+s.capexOverrun/100);
    // Hypothetical grants and extra debt can fund only the remaining capital need.
    // Their proceeds cannot inflate operating liquidity by exceeding capital spending.
    const grants=Math.min(s.grantAnnual,Math.max(0,capex-base.borrowing));
    const extraBorrowing=Math.min(base.capex*s.extraDebtShare/100,Math.max(0,capex-base.borrowing-grants));
    let extraDebtService=0, extraInterest=0, extraPrincipal=0;
    for (const loan of loans) {
      const interest=loan.balance*s.extraDebtRate/100;
      const principal=Math.min(loan.balance,Math.max(0,loan.payment-interest));
      loan.balance-=principal;
      extraDebtService+=interest+principal; extraInterest+=interest; extraPrincipal+=principal;
    }
    // New draws occur at year end, with level annual payments beginning the following year.
    if(extraBorrowing>0) loans.push({balance:extraBorrowing,payment:annuityPayment(extraBorrowing,s.extraDebtRate/100,s.extraDebtTerm)});
    const debtService=base.debtService+extraDebtService;
    const openingCash=cash;
    const netFlow=revenue-opex-debtService-capex+base.borrowing+extraBorrowing+grants;
    cash+=netFlow;
    const monthlyBill=monthlyProposed*referenceBillScale*rateRatio;
    const referenceMonthlyBill=monthlyProposed*referenceBillScale;
    const cashDays=cash/opex*365, dscr=(revenue-opex)/debtService, requiredCash=s.minCash*opex/365;
    const failures=[];
    if(cash < -EPS) failures.push('Negative cash');
    if(cashDays+EPS<s.minCash) failures.push('Cash days');
    if(dscr+EPS<s.minDscr) failures.push('Debt coverage');
    if(s.rates[i]>s.maxRate+EPS) failures.push('Rate-change bound');
    if(s.billCeiling>0 && monthlyBill>s.billCeiling+EPS) failures.push('Household bill ceiling');
    rows.push({year:base.year,rate:s.rates[i],rateRatio,customer,other,revenue,opex,capex,baseBorrowing:base.borrowing,
      extraBorrowing,grants,baseDebtService:base.debtService,extraDebtService,extraInterest,extraPrincipal,debtService,
      extraDebtOutstanding:sum(loans.map(l=>l.balance)),openingCash,cash,netFlow,cashDays,requiredCash,dscr,monthlyBill,
      referenceMonthlyBill,annualBill:monthlyBill*12,householdBurden:monthlyBill*12/s.income,failures,
      capitalFromOperations:revenue-opex-debtService,capitalCoverage:(revenue-opex-debtService)/capex});
  }
  const failures=rows.flatMap(r=>r.failures.map(rule=>({year:r.year,rule})));
  const approvals=[];
  if(s.extraDebtShare>0) approvals.push('Additional borrowing is hypothetical and requires financing and project approvals.');
  if(s.grantAnnual>0) approvals.push('Additional grant funding is hypothetical; no award or eligibility is established.');
  if(s.rates.some((r,i)=>Math.abs(r-data.referenceRatePct[i])>EPS)) approvals.push('The selected rate path is an analytical scenario, not an adopted tariff.');
  return {version:MODEL_VERSION,rows,reference,feasible:failures.length===0,failures,approvals,
    minCashDays:Math.min(...rows.map(r=>r.cashDays)),minDscr:Math.min(...rows.map(r=>r.dscr)),
    totalHouseholdBill:sum(rows.map(r=>r.annualBill)),maxRate:Math.max(...s.rates),
    totalCapital:sum(rows.map(r=>r.capex)),totalBorrowing:sum(rows.map(r=>r.baseBorrowing+r.extraBorrowing)),
    totalGrants:sum(rows.map(r=>r.grants)),totalOperatingCapital:sum(rows.map(r=>r.capitalFromOperations)),
    extraDebtOutstanding:rows.at(-1).extraDebtOutstanding,variableShare};
}

export function optimize(data, settings, objective='smooth') {
  validateSettings(settings);
  if(!['smooth','bill'].includes(objective)) throw new Error('Unknown optimization objective.');
  // Exhaustive search of this declared finite family, not a global continuous optimum.
  const patterns=[{name:'Level',offsets:[0,0,0,0,0]},{name:'Earlier increases',offsets:[2,1,0,-1,-2]},
    {name:'Later increases',offsets:[-2,-1,0,1,2]}];
  let best=null, tested=0, feasibleCount=0;
  const seen=new Set(), candidates=[];
  for(let step=0;step<=Math.floor(settings.maxRate*10+EPS);step++) for(const p of patterns) {
    const rates=p.offsets.map(o=>Math.round(Math.max(0,Math.min(settings.maxRate,step/10+o))*10)/10);
    if(rates.some(r=>r>settings.maxRate+EPS)) continue;
    const key=rates.join(','); if(seen.has(key)) continue; seen.add(key); tested++;
    const result=simulate(data,{...settings,rates});
    if(!result.feasible) continue;
    feasibleCount++;
    const smoothness=sum(rates.slice(1).map((r,i)=>(r-rates[i])**2));
    const score=objective==='smooth'?[result.maxRate,smoothness,result.totalHouseholdBill]:[result.totalHouseholdBill,result.maxRate,smoothness];
    const candidate={name:p.name,rates,result,score}; candidates.push(candidate);
    if(!best || score.some((v,i)=>v<best.score[i]-EPS && score.slice(0,i).every((x,j)=>Math.abs(x-best.score[j])<=EPS))) best=candidate;
  }
  candidates.sort((a,b)=>a.result.totalHouseholdBill-b.result.totalHouseholdBill);
  return {best,tested,feasibleCount,objective,resolutionPct:0.1,patterns:patterns.map(p=>p.name),
    alternatives:candidates.filter(c=>c.name!==best?.name).filter((c,i,a)=>a.findIndex(x=>x.name===c.name)===i).slice(0,2)};
}

export function stressTests(data,settings) {
  validateSettings(settings);
  const cases=[
    {name:'Selected scenario',change:'No changes',patch:{}},
    {name:'Faster operating costs',change:'+1 percentage point annual O&M drift',patch:{opexDrift:Math.min(5,settings.opexDrift+1)}},
    {name:'Slower customer growth',change:'Annual customer/usage growth lower by 1 percentage point',patch:{customerGrowth:Math.max(-3,settings.customerGrowth-1)}},
    {name:'Capital cost pressure',change:'+10 percentage points on planned capital costs',patch:{capexOverrun:Math.min(50,settings.capexOverrun+10)}},
    {name:'No additional grants',change:'All hypothetical additional grants removed',patch:{grantAnnual:0}},
    {name:'Higher new-debt interest',change:'+2 percentage points on extra borrowing only',patch:{extraDebtRate:Math.min(15,settings.extraDebtRate+2)}},
    {name:'No future investment income',change:'Remove budget investment income only in 2028–2031; a limiting case',patch:{investmentIncomeRetention:0}},
    {name:'Joint adverse case',change:'O&M +1pp, growth −1pp, capital +10pp, no extra grants, extra-debt interest +2pp, no future investment income',patch:{opexDrift:Math.min(5,settings.opexDrift+1),customerGrowth:Math.max(-3,settings.customerGrowth-1),capexOverrun:Math.min(50,settings.capexOverrun+10),grantAnnual:0,extraDebtRate:Math.min(15,settings.extraDebtRate+2),investmentIncomeRetention:0}}
  ];
  return cases.map(c=>({...c,result:simulate(data,{...settings,...c.patch})}));
}

export function exportScenario(data,settings,result) {
  validateSettings(settings);
  return {schemaVersion:'1.0',modelVersion:MODEL_VERSION,dataCutoff:data.cutoff,scope:data.scope,settings,
    referenceMethod:'2027 approved budget anchor with derived 2028–2031 growth and CIP financing; not an adopted LCA forecast',
    numericalFeasibility:result.feasible,legalApproval:'not established',rows:result.rows,
    sourceUrls:data.sources.map(s=>s.url)};
}

export function validateMock(payload) {
  const errors=[],warnings=[];
  if(!payload || typeof payload!=='object' || Array.isArray(payload)) return {valid:false,errors:['Root must be an object.'],warnings,totals:{}};
  const rootFields=['schemaVersion','synthetic','asOf','description','records','controlTotals'];
  if(Object.keys(payload).some(k=>!rootFields.includes(k))) errors.push('Unexpected root fields. Only the documented synthetic schema is permitted.');
  if(payload.schemaVersion!=='1.0') errors.push('schemaVersion must be 1.0.');
  if(payload.synthetic!==true) errors.push('Only explicitly synthetic fixtures are accepted by this public demo.');
  if(!Array.isArray(payload.records)||payload.records.length===0||payload.records.length>1000) errors.push('Provide 1–1,000 records.');
  if(!payload.controlTotals || typeof payload.controlTotals!=='object' || Array.isArray(payload.controlTotals)) errors.push('controlTotals is required.');
  const ids=new Set(), totals={},allowedMetrics=['customer_receipts','other_receipts','operating_expense','debt_service','capital_spending','borrowing'];
  if(payload.controlTotals && Object.keys(payload.controlTotals).some(k=>!allowedMetrics.includes(k))) errors.push('Unexpected control-total metric.');
  for(const [i,r] of (Array.isArray(payload.records)?payload.records:[]).entries()) {
    if(!r||typeof r!=='object'||Array.isArray(r)){errors.push(`Record ${i+1}: object required.`);continue;}
    const allowed=['recordId','fund','fiscalYear','metric','amount','currency','basis','sourceSystem','sourceBatch','synthetic'];
    if(Object.keys(r).some(k=>!allowed.includes(k))) errors.push(`Record ${i+1}: unexpected fields. No customer or personal fields are permitted.`);
    if(typeof r.recordId!=='string'||!/^MOCK-[A-Z0-9-]{1,45}$/.test(r.recordId)) errors.push(`Record ${i+1}: invalid synthetic identifier.`);
    if(ids.has(r.recordId)) errors.push(`Record ${i+1}: duplicate record identifier.`); ids.add(r.recordId);
    if(r.fund!=='SUBURBAN_WATER') errors.push(`Record ${i+1}: unsupported fund; no pooling is permitted.`);
    if(r.fiscalYear!==2027) errors.push(`Record ${i+1}: this fixture requires fiscal year 2027.`);
    if(!allowedMetrics.includes(r.metric)) errors.push(`Record ${i+1}: unknown metric.`);
    if(typeof r.amount!=='number'||!Number.isFinite(r.amount)||r.amount<0||r.amount>1e9) errors.push(`Record ${i+1}: invalid nonnegative amount.`);
    if(r.currency!=='USD'||r.basis!=='cash'||r.synthetic!==true) errors.push(`Record ${i+1}: USD, cash basis, and synthetic=true are required.`);
    if(typeof r.sourceSystem!=='string'||typeof r.sourceBatch!=='string') errors.push(`Record ${i+1}: source system and batch are required.`);
    if(allowedMetrics.includes(r.metric)&&Number.isFinite(r.amount)) totals[r.metric]=(totals[r.metric]??0)+r.amount;
  }
  for(const metric of allowedMetrics) {
    const control=payload.controlTotals?.[metric];
    if(typeof control!=='number'||!Number.isFinite(control)) errors.push(`Missing numeric control total: ${metric}.`);
    else if(Math.abs((totals[metric]??0)-control)>0.005) errors.push(`Control total mismatch: ${metric}.`);
  }
  const date=typeof payload.asOf==='string' && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(payload.asOf)?new Date(`${payload.asOf}T00:00:00Z`):null;
  if(!date || !Number.isFinite(date.getTime()) || date.toISOString().slice(0,10)!==payload.asOf) errors.push('A valid YYYY-MM-DD asOf date is required.');
  warnings.push('Synthetic contract validation only. No production extraction, authentication, completeness, or source-to-ledger certification is established.');
  return {valid:errors.length===0,errors,warnings,totals,count:payload.records?.length??0,asOf:payload.asOf};
}
