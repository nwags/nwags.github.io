/** Independent public-data planning model. Nominal USD; no interfund pooling. */
export const MODEL_VERSION='0.2.0';
export const sum=a=>a.reduce((x,y)=>x+y,0);
const clone=x=>JSON.parse(JSON.stringify(x));
const cents=x=>Math.round((x+Number.EPSILON)*100)/100;
const factor=(a,i)=>a.slice(0,i+1).reduce((x,y)=>x*(1+y/100),1);

export function defaultSettings(data,fundId='suburbanWater') {
 const f=data.funds[fundId];if(!f)throw new Error('Unknown reporting division.');
 return {fundId,tariffPath:'planned',fixedAdjustments:[0,0,0,0,0],usageAdjustments:[0,0,0,0,0],addonAdjustments:[0,0,0,0,0],
  historyWeight:25,opexDrift:0,customerGrowth:f.planVolumeGrowthPct,volumeGrowth:f.planVolumeGrowthPct,industrialShock:0,industrialShare:f.industrialSharePct,
  retailExposure:f.retailExposurePct,fixedShare:f.fixedSharePct,addonShare:f.addonSharePct,contractDrift:0,elasticity:0,
  capexOverrun:0,capitalBasis:'project',grantRetention:100,grantDelay:0,extraGrantAnnual:0,extraDebtShare:0,extraDebtRate:4.5,extraDebtTerm:20,
  investmentRetention:100,minCash:180,minCoverage:1.2,maxUplift:12,billCeiling:0,cpi:[4.3,3.3,3.3,3.3,3.3],assumeLeaseAmendment:false,
  optimizationLever:fundId==='city'?'addons':fundId==='suburbanWastewater'?'balanced':'retail',usage:5000,income:35000,meter:'5/8',billType:f.defaultBillType,edu:1};
}
export function validateSettings(s,data) {
 const errors=[];
 if(!s||typeof s!=='object'||Array.isArray(s))return ['Settings must be an object.'];
 if(!data.funds[s.fundId])return ['Unknown reporting division.'];
 const keys=Object.keys(defaultSettings(data,s.fundId));
 if(Object.keys(s).some(k=>!keys.includes(k))||keys.some(k=>!(k in s)))errors.push('Settings fields do not match model 0.2.0.');
 const ranges={historyWeight:[0,100],opexDrift:[-5,15],customerGrowth:[-10,10],volumeGrowth:[-10,10],industrialShock:[-80,50],industrialShare:[0,100],retailExposure:[0,100],fixedShare:[0,100],addonShare:[0,100],contractDrift:[-10,20],elasticity:[-1,0],capexOverrun:[0,50],grantRetention:[0,100],grantDelay:[0,3],extraGrantAnnual:[0,20000000],extraDebtShare:[0,100],extraDebtRate:[0,15],extraDebtTerm:[5,40],investmentRetention:[0,150],minCash:[0,730],minCoverage:[0,5],maxUplift:[0,25],billCeiling:[0,10000],usage:[0,100000000],income:[1000,1000000],edu:[1,10000]};
 for(const [key,[lo,hi]] of Object.entries(ranges))if(typeof s[key]!=='number'||!Number.isFinite(s[key])||s[key]<lo||s[key]>hi)errors.push(`${key} must be between ${lo} and ${hi}.`);
 for(const key of ['fixedAdjustments','usageAdjustments','addonAdjustments','cpi']){const lo=key==='cpi'?-5:-30,hi=key==='cpi'?15:30;if(!Array.isArray(s[key])||s[key].length!==5||s[key].some(v=>typeof v!=='number'||!Number.isFinite(v)||v<lo||v>hi))errors.push(`${key}: five values between ${lo} and ${hi} required.`);}
 if(s.fixedShare+s.addonShare>100)errors.push('Fixed and add-on shares cannot exceed 100% of exposed receipts.');
 if(s.fundId!=='city'&&s.addonShare!==0)errors.push('Only City has the separate add-on revenue bucket.');
 if(!['planned','freeze2026'].includes(s.tariffPath))errors.push('Unknown tariff starting path.');
 if(!['project','cashTable'].includes(s.capitalBasis))errors.push('Unknown capital basis.');
 if(!['retail','balanced','addons'].includes(s.optimizationLever)||(s.optimizationLever==='addons'&&s.fundId!=='city'))errors.push('Unsupported optimization lever.');
 if(typeof s.assumeLeaseAmendment!=='boolean')errors.push('Lease amendment assumption must be boolean.');
 if(!Number.isInteger(s.grantDelay)||!Number.isInteger(s.extraDebtTerm))errors.push('Grant delay and debt term must be whole years.');
 const meters=data.tariffs?.[s.fundId]?.['2026']?.[s.fundId==='city'?'waterFixed':'fixedCharges']?.map(v=>v.meterInch)??['5/8'];
 if(!meters.includes(s.meter))errors.push('Unsupported meter size for this division.');
 const types=s.fundId==='suburbanWastewater'?['common1','common2','washington']:s.fundId==='suburbanWater'?['standard','welshtown']:['standard'];
 if(!types.includes(s.billType))errors.push('Unsupported illustrative bill tariff.');
 if(s.billType==='welshtown'&&!Object.hasOwn(data.tariffs.suburbanWater.welshtown.minimumByMeterInch,s.meter))errors.push('No published Welshtown minimum for this meter.');
 return errors;
}
export function blockCharge(gallons,upperBounds,prices){let lower=0,total=0;for(let j=0;j<prices.length;j++){const upper=upperBounds[j]??Infinity;total+=Math.max(0,Math.min(gallons,upper)-lower)/1000*prices[j];lower=upper;}return total;}
/** Round each billing line; monthly result is an equivalent, not a billing frequency. */
export function calculateBill(data,s,index=0,historical=false) {
 const f=data.funds[s.fundId],t=data.tariffs[s.fundId],frozen=historical||s.tariffPath==='freeze2026',year=frozen?'2026':'2027';
 const growth=frozen?1:(1+f.futureTariffGrowthPct/100)**index;
 const mod=kind=>historical?1:factor(s[kind==='fixed'?'fixedAdjustments':kind==='addon'?'addonAdjustments':'usageAdjustments'],index);
 let period='quarter',lines=[];
 const add=(label,kind,raw,rate,unit)=>lines.push({label,kind,raw:raw*mod(kind),amount:cents(raw*mod(kind)),rate:rate==null?null:rate*mod(kind),unit});
 if(s.fundId==='suburbanWater'){
  if(s.billType==='welshtown'){
   add('Minimum: includes first 8,000 gallons / quarter','fixed',t.welshtown.minimumByMeterInch[s.meter]*growth,null,'quarter');
   add('Usage above included allowance','usage',Math.max(0,s.usage*3-8000)/1000*t.welshtown.usdPerKgalExcess*growth,t.welshtown.usdPerKgalExcess*growth,'per 1,000 excess gallons');
  }else{
   const fixed=t[year].fixedCharges.find(v=>v.meterInch===s.meter);period=fixed.period;const months=period==='quarter'?3:1;
   add('Water fixed service charge','fixed',fixed.usd*growth,fixed.usd*growth,period);
   const bounds=t[year].monthlyBlockUpperGallons.map(v=>v==null?null:v*months);
   add('Water usage: marginal declining blocks','usage',blockCharge(s.usage*months,bounds,t[year].usdPerKgal.map(v=>v*growth)),t[year].usdPerKgal[0]*growth,'first block / 1,000 gallons');
  }
 }else if(s.fundId==='suburbanWastewater'){
  const tariff=s.billType==='washington'?t.washington['2026and2027']:t[s.billType][year];
  const g=s.billType==='washington'&&index===0?1:growth;
  add(s.billType==='washington'?'Sewer fixed charge per customer':'Sewer fixed charge per EDU','fixed',(tariff.quarterlyFixedPerEdu??tariff.quarterlyFixedPerCustomer)*(s.billType==='washington'?1:s.edu)*g,(tariff.quarterlyFixedPerEdu??tariff.quarterlyFixedPerCustomer)*g,s.billType==='washington'?'quarter / customer':'quarter / EDU');
  add('Sewer billable usage','usage',s.usage*3/1000*tariff.perKgal*g,tariff.perKgal*g,'per 1,000 gallons');
 }else{
  const tariff=t[year],wf=tariff.waterFixed.find(v=>v.meterInch===s.meter),sf=tariff.sewerFixed.find(v=>v.meterInch===s.meter);period=wf.period;const kgal=s.usage*(period==='quarter'?3:1)/1000;
  add('Water fixed service charge','fixed',wf.usd*growth,wf.usd*growth,period);
  add('Water usage','usage',kgal*tariff.waterPerKgal*growth,tariff.waterPerKgal*growth,'per 1,000 gallons');
  add('Water capital cost recovery','addon',kgal*tariff.waterCcrcPerKgal*growth,tariff.waterCcrcPerKgal*growth,'per 1,000 gallons');
  add('Sewer fixed service charge','fixed',sf.usd*growth,sf.usd*growth,period);
  add('Sewer usage','usage',kgal*tariff.sewerPerKgal*growth,tariff.sewerPerKgal*growth,'per 1,000 gallons');
  add('Sewer capital cost recovery','addon',kgal*tariff.sewerCcrcPerKgal*growth,tariff.sewerCcrcPerKgal*growth,'per 1,000 gallons');
  add('Administrative-order fee','addon',kgal*tariff.aoPerKgal*growth,tariff.aoPerKgal*growth,'per 1,000 gallons');
 }
 const periods=period==='quarter'?4:12,periodTotal=cents(sum(lines.map(v=>v.amount)));
 const groups=Object.fromEntries(['fixed','usage','addon'].map(k=>[k,sum(lines.filter(v=>v.kind===k).map(v=>v.raw))*periods]));
 return {period,lines,periodTotal,annual:periodTotal*periods,monthly:periodTotal*periods/12,groups};
}
export function annuityPayment(principal,rate,years){if(!principal)return 0;const r=rate/100;return r===0?principal/years:principal*r/(1-(1+r)**-years);}
function run(data,s){
 const f=data.funds[s.fundId],p=f.plan,defaults=defaultSettings(data,s.fundId);
 let cash=f.budget.openingUnrestrictedCash,opex=f.budget.cashOperatingExpense;
 const loans=[],rows=[],violations=[],ruleFlags=[];
 const benchmark={...s,meter:'5/8',billType:f.defaultBillType,usage:5000,edu:1},referenceBenchmark={...defaults,usage:5000};
 const scheduledGrants=data.years.map((_,i)=>p.grants[i]*s.grantRetention/100),grantsAfterHorizon=sum(scheduledGrants.filter((_,i)=>i+s.grantDelay>=5));
 for(let i=0;i<5;i++){
  const year=data.years[i],bill=calculateBill(data,s,i),b=calculateBill(data,benchmark,i),ref=calculateBill(data,referenceBenchmark,i);
  const ratio=kind=>ref.groups[kind]?b.groups[kind]/ref.groups[kind]:1;
  const fixedRatio=ratio('fixed'),usageRatio=ratio('usage'),addonRatio=ratio('addon');
  const accountFactor=((1+s.customerGrowth/100)/(1+f.planVolumeGrowthPct/100))**(i+1),volumeFactor=((1+s.volumeGrowth/100)/(1+f.planVolumeGrowthPct/100))**(i+1),industrialFactor=1+s.industrialShock/100*s.industrialShare/100;
  const exposed=s.retailExposure/100,fixed=s.fixedShare/100,addon=s.addonShare/100,variable=1-fixed-addon;
  const volumePriceRatio=variable+addon>0?(usageRatio*variable+addonRatio*addon)/(variable+addon):1,priceResponse=volumePriceRatio**s.elasticity;
  const fixedReceipts=p.customerReceipts[i]*exposed*fixed*fixedRatio*accountFactor;
  const usageReceipts=p.customerReceipts[i]*exposed*variable*usageRatio*volumeFactor*priceResponse*industrialFactor;
  const addonReceipts=p.customerReceipts[i]*exposed*addon*addonRatio*volumeFactor*priceResponse*industrialFactor;
  const contractReceipts=p.customerReceipts[i]*(1-exposed)*(1+s.contractDrift/100)**(i+1);
  const customer=fixedReceipts+usageReceipts+addonReceipts+contractReceipts;
  // Preserve approved 2027 level; blend growth only from 2028.
  if(i>0){const planGrowth=p.operatingExpense[i]/p.operatingExpense[i-1]-1;const blended=planGrowth*(1-s.historyWeight/100)+f.historyOpexGrowthPct/100*s.historyWeight/100;opex*=1+blended+s.opexDrift/100;}
  const operatingExpense=opex,investment=p.investmentIncome[i]*(i===0?1:s.investmentRetention/100),otherOperating=p.otherOperatingReceipts[i],capitalReceipts=p.capitalReceipts[i],otherCapitalPayments=p.otherCapitalPayments[i],lease=p.leasePayments[i];
  const baseCapex=(s.capitalBasis==='cashTable'?p.publishedCashCapex:p.capex)[i],capex=baseCapex*(1+s.capexOverrun/100);
  const plannedGrants=i-s.grantDelay>=0?scheduledGrants[i-s.grantDelay]:0,baseBorrowing=p.borrowing[i];
  // Existing plan sources remain visible. Cap incremental sources after existing capital contributions.
  const remainingNeed=Math.max(0,capex-baseBorrowing-plannedGrants-capitalReceipts),extraGrants=Math.min(s.extraGrantAnnual,remainingNeed),extraBorrowing=Math.min(capex*s.extraDebtShare/100,remainingNeed-extraGrants);
  let extraDebtService=0;
  for(const loan of loans){const interest=loan.balance*s.extraDebtRate/100,payment=Math.min(loan.payment,loan.balance+interest);loan.balance=Math.max(0,loan.balance+interest-payment);extraDebtService+=payment;}
  if(extraBorrowing>0)loans.push({balance:extraBorrowing,payment:annuityPayment(extraBorrowing,s.extraDebtRate,s.extraDebtTerm)});
  const debtService=p.debtService[i]+extraDebtService,operatingReceipts=customer+otherOperating+investment,grants=plannedGrants+extraGrants,receipts=operatingReceipts+capitalReceipts+grants;
  const netFlow=receipts+baseBorrowing+extraBorrowing+p.investmentConversions[i]-operatingExpense-lease-otherCapitalPayments-debtService-capex,openingCash=cash;cash+=netFlow;
  const cashDays=cash/operatingExpense*365,coverageNumerator=operatingReceipts-operatingExpense-lease,coverage=debtService?coverageNumerator/debtService:null,requiredCash=operatingExpense/365*s.minCash;
  const priorBill=i?calculateBill(data,s,i-1).annual:calculateBill(data,s,0,true).annual,annualBillChangePct=priorBill?(bill.annual/priorBill-1)*100:0,failures=[];
  if(cash<-.005)failures.push('negative unrestricted cash');
  if(cashDays<s.minCash-1e-8)failures.push(`cash below ${s.minCash} days`);
  if(coverage!==null&&coverage<s.minCoverage-1e-8)failures.push(`coverage proxy below ${s.minCoverage}×`);
  if(s.billCeiling&&bill.monthly>s.billCeiling+.005)failures.push('monthly bill above ceiling');
  const uplift=Math.max(s.fixedAdjustments[i],s.usageAdjustments[i],s.addonAdjustments[i],s.contractDrift);
  if(uplift>s.maxUplift+1e-8)failures.push('uplift exceeds selected search/policy limit');
  const coreBase=s.tariffPath==='freeze2026'?0:i===0?6.8:f.futureTariffGrowthPct;
  const coreGrowth=Math.max((1+coreBase/100)*(1+s.fixedAdjustments[i]/100)-1,(1+coreBase/100)*(1+s.usageAdjustments[i]/100)-1)*100,cityCeiling=Math.max(0,s.cpi[i]+2.5),ceilingExceeded=s.fundId==='city'&&coreGrowth>cityCeiling+.015;
  if(ceilingExceeded)ruleFlags.push(`${year}: core-growth proxy ${coreGrowth.toFixed(2)}% exceeds CPI + margin ${cityCeiling.toFixed(2)}%.`);
  failures.forEach(reason=>violations.push({year,reason}));
  rows.push({year,openingCash,customer,fixedReceipts,usageReceipts,addonReceipts,contractReceipts,otherOperating,investment,capitalReceipts,plannedGrants,extraGrants,grants,receipts,operatingExpense,lease,otherCapitalPayments,debtService,baseDebtService:p.debtService[i],extraDebtService,capex,baseBorrowing,extraBorrowing,investmentConversions:p.investmentConversions[i],netFlow,cash,cashDays,requiredCash,coverage,coverageNumerator,monthlyBill:bill.monthly,annualBill:bill.annual,annualBillChangePct,bill,failures,ceilingExceeded,coreGrowth,cityCeiling,fundingCapacity:remainingNeed,industrialFactor,accountFactor,volumeFactor,priceResponse});
 }
 const extraDebtOutstanding=sum(loans.map(v=>v.balance)),annualExtraDebtAfterHorizon=sum(loans.map(v=>v.payment));
 return {rows,violations,ruleFlags,financiallyFeasible:violations.length===0,feasible:violations.length===0&&(s.assumeLeaseAmendment||ruleFlags.length===0),minCashDays:Math.min(...rows.map(r=>r.cashDays)),minCoverage:Math.min(...rows.map(r=>r.coverage??Infinity)),endingCash:cash,totalCapital:sum(rows.map(r=>r.capex)),totalBills:sum(rows.map(r=>r.annualBill)),totalBorrowing:sum(rows.map(r=>r.baseBorrowing+r.extraBorrowing)),totalGrants:sum(rows.map(r=>r.grants)),extraDebtOutstanding,annualExtraDebtAfterHorizon,grantsAfterHorizon,baselineDebtAfterHorizon:'Not estimated; published base debt service is a schedule, not a full liability rollforward.'};
}
export function simulate(data,s){const errors=validateSettings(s,data);if(errors.length)throw new Error(errors.join(' '));const result=run(data,s),referenceSettings={...defaultSettings(data,s.fundId),usage:s.usage,income:s.income,meter:s.meter,billType:s.billType,edu:s.edu},reference=run(data,referenceSettings);return {...result,reference:reference.rows,referenceEndingCash:reference.endingCash,settings:clone(s)};}
export function buildReference(data,fundId='suburbanWater'){return run(data,defaultSettings(data,fundId)).rows;}
export function scenarioPresets(data,fundId){
 const d=defaultSettings(data,fundId),h=data.funds[fundId].historicalVolumeGrowthPct,accounts=data.funds[fundId].historicalAccountGrowthPct,make=(id,name,description,changes={})=>({id,name,description,settings:{...clone(d),...changes}});
 return [make('central','Central planning estimate','Approved budget + detailed capital; 25% historical cost-trend blend.'),make('plan','Published drivers','No historical cost blend; detailed project capital. A derived budget anchor, not LCA’s published cash forecast.',{historyWeight:0}),make('cash-table','Condensed capital table','Published cost drivers and original condensed cash capital; City 2029 is $5.6m below detailed projects.',{historyWeight:0,capitalBasis:'cashTable'}),make('freeze','Freeze 2026 tariffs','Hold every modeled fixed, usage and City add-on component at its actual 2026 value.',{tariffPath:'freeze2026'}),make('history','Historical trend','Full cost CAGR; separate observed water-unit and volume trends; sewer demand remains at plan.',{historyWeight:100,customerGrowth:accounts,volumeGrowth:h}),make('industry','Industrial demand −20%','20% less usage within the exposed industrial revenue proxy; household use unchanged.',{industrialShock:-20}),make('pressure','Cost pressure','Extra O&M +2 points/year from 2028; capital +10%; future investment receipts 50%.',{opexDrift:2,capexOverrun:10,investmentRetention:50}),make('grant-delay','Grants delayed two years','Move planned grant cash two years later; show receipts beyond 2031 separately.',{grantDelay:2}),make('debt','Additional borrowing','Up to 25% of capital with extra 20-year debt at 4.5%, capped after existing capital sources.',{extraDebtShare:25}),make('mix-low','Lower retail exposure','Test the uncertain receipt share responding to household tariffs.',{retailExposure:fundId==='city'?50:fundId==='suburbanWastewater'?4.485321104813042:80}),make('mix-high','Higher retail exposure','Broader exposed retail share; noncustomer cash stays unscaled.',{retailExposure:fundId==='city'?90:fundId==='suburbanWastewater'?20:100})];
}
/** Exhaustive finite family; other assumptions and financing held fixed. */
export function optimize(data,s,objective='peak'){
 const errors=validateSettings(s,data);if(errors.length)throw new Error(errors.join(' '));if(!['peak','bills'].includes(objective))throw new Error('Unknown objective.');
 const patterns=[[0,0,0,0,0],[2,1,0,-1,-2],[-2,-1,0,1,2]],seen=new Set();let checked=0,feasibleCount=0,best=null;
 const lexLess=(a,b)=>a.some((v,i)=>v<b[i]-1e-8&&a.slice(0,i).every((x,j)=>Math.abs(x-b[j])<1e-8));
 for(let tick=0;tick<=Math.floor(s.maxUplift*10);tick++)for(const pattern of patterns){
  const rates=pattern.map(v=>Math.round(Math.min(s.maxUplift,Math.max(0,tick/10+v))*10)/10),key=rates.join(',');if(seen.has(key))continue;seen.add(key);const candidate=clone(s);
  if(candidate.optimizationLever==='addons')candidate.addonAdjustments=rates;else{candidate.fixedAdjustments=rates;candidate.usageAdjustments=rates;}
  if(candidate.optimizationLever==='balanced')candidate.contractDrift=Math.max(...rates);
  if(validateSettings(candidate,data).length)continue;
  const result=run(data,candidate);checked++;if(!result.feasible)continue;feasibleCount++;
  const peak=Math.max(...result.rows.map(r=>r.annualBillChangePct)),smooth=sum(result.rows.slice(1).map((r,i)=>(r.annualBillChangePct-result.rows[i].annualBillChangePct)**2)),score=objective==='peak'?[peak,result.totalBills,smooth]:[result.totalBills,peak,smooth];
  if(!best||lexLess(score,best.score))best={settings:candidate,result,score};
 }
 return {best,checked,feasibleCount,objective,search:'0.1-point grid; level, earlier and later uplift patterns; no global-optimum claim'};
}
export function exportScenario(data,s,name='Custom scenario'){const r=simulate(data,s);return {schemaVersion:'2.0',modelVersion:MODEL_VERSION,cutoff:data.cutoff,dataRevision:data.dataRevision,name,settings:clone(s),assumptions:data.funds[s.fundId].assumptions,financiallyFeasible:r.financiallyFeasible,implementedChecksPass:r.feasible,legalApproval:'Not certified; explicit assumptions remain subject to review',rows:r.rows,terminal:{extraDebtOutstanding:r.extraDebtOutstanding,annualExtraDebtAfterHorizon:r.annualExtraDebtAfterHorizon,grantsAfterHorizon:r.grantsAfterHorizon,baselineDebt:r.baselineDebtAfterHorizon},sourceUrls:data.sources.map(v=>v.url)};}
export function importScenario(data,payload){if(!payload||payload.schemaVersion!=='2.0'||payload.modelVersion!==MODEL_VERSION||payload.cutoff!==data.cutoff||payload.dataRevision!==data.dataRevision)throw new Error('Scenario must match model 0.2.0, cutoff 2026-11-07 and the exact baseline data fingerprint. Older scenarios are not silently migrated.');const errors=validateSettings(payload.settings,data);if(errors.length)throw new Error(errors.join(' '));return clone(payload.settings);}

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
