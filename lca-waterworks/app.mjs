import {defaultSettings,simulate,optimize,stressTests,exportScenario,validateSettings,validateMock,buildReference,sum} from './model.mjs';

const $=id=>document.getElementById(id);
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const usd=(v,d=2)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:d,maximumFractionDigits:d}).format(v);
const num=(v,d=1)=>new Intl.NumberFormat('en-US',{minimumFractionDigits:d,maximumFractionDigits:d}).format(v);
const millions=v=>`${v<0?'−':''}$${num(Math.abs(v)/1e6,2)}m`;
const pct=(v,d=1)=>`${num(v,d)}%`;
const link=(url,title)=>`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(title)}</a>`;
let data,settings,current,comparison=null,optimizationMessage='',stressStale=true;
const controls=[
  {id:'opexDrift',label:'Extra annual O&M growth',min:-2,max:5,step:.1,unit:'pp',help:'Compounds above the capital plan’s expense-growth profile; 0 preserves the reference.'},
  {id:'customerGrowth',label:'Annual customer / usage growth',min:-3,max:4,step:.1,unit:'%',help:'1% follows the capital plan. A fund-level receipts proxy, not a calibrated demand forecast.'},
  {id:'capexOverrun',label:'Capital cost increase',min:0,max:50,step:1,unit:'%',help:'Applies to the full published capital spending schedule. No projects are removed.'},
  {id:'extraDebtShare',label:'Extra debt share of capital',min:0,max:50,step:1,unit:'%',help:'Hypothetical borrowing above the plan, capped at remaining capital needs. Approval is not established.'},
  {id:'extraDebtRate',label:'Interest on extra borrowing',min:0,max:15,step:.25,unit:'%',help:'20-year level payments start the following year. Published baseline debt service remains unchanged.'},
  {id:'grantAnnual',label:'Additional grant support',min:0,max:5000000,step:100000,unit:'grant',help:'Up to this amount each year, limited to unfunded capital. Hypothetical; no award is assumed at the default of $0.'},
  {id:'investmentIncomeRetention',label:'Future investment income retained',min:0,max:100,step:10,unit:'%',help:'2028–2031 share of the budget’s $831,720 annual investment income. 100% holds it flat; 0% is a limiting case. 2027 remains anchored.'}
];

function chart(target,series,{money=false,million=false,zero=true,title='Chart',years=data.years}={}){
  const width=480,height=225,p={l:46,r:16,t:20,b:34};
  const all=series.flatMap(s=>s.values),vmin=Math.min(...all),vmax=Math.max(...all);
  let low=zero?Math.min(0,vmin):vmin-(vmax-vmin)*.15;
  let high=vmax+(vmax-low)*.12;
  if(Math.abs(high-low)<.001){high=low+1;}
  const x=i=>p.l+i*(width-p.l-p.r)/(years.length-1),y=v=>height-p.b-(v-low)/(high-low)*(height-p.t-p.b);
  const f=v=>million?`$${num(v/1e6,1)}m`:money?usd(v,0):num(v,0);
  let svg=`<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>`;
  for(let j=0;j<5;j++){const v=low+(high-low)*j/4,yy=y(v);svg+=`<line class="gridline" x1="${p.l}" x2="${width-p.r}" y1="${yy}" y2="${yy}"/><text x="${p.l-9}" y="${yy+3}" text-anchor="end">${f(v)}</text>`;}
  years.forEach((yr,i)=>{svg+=`<text x="${x(i)}" y="${height-10}" text-anchor="middle">${yr}</text>`;});
  for(const s of series){const path=s.values.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');
    svg+=`<path d="${path}" fill="none" stroke="${s.color}" stroke-width="${s.dash?1.8:2.7}" ${s.dash?'stroke-dasharray="5 5"':''}/>`;
    s.values.forEach((v,i)=>{svg+=`<circle cx="${x(i)}" cy="${y(v)}" r="${s.dash?2.5:3.7}" fill="${s.color}"><title>${esc(s.name)} · ${years[i]}: ${f(v)}</title></circle>`;});
  }
  svg+='</svg>'; $(target).innerHTML=svg;
}

function buildControls(){
  $('rate-controls').innerHTML=data.years.map((year,i)=>`<div class="rate-row"><label for="rate-${i}">${year}</label><input id="range-${i}" type="range" min="-5" max="25" step="0.1" aria-label="${year} rate index slider"><span class="number-unit"><input id="rate-${i}" type="number" min="-5" max="25" step="0.1" aria-label="${year} rate index percentage"><span>%</span></span></div>`).join('');
  $('cost-controls').innerHTML=controls.map(c=>`<div class="slider-control"><label for="${c.id}"><span>${c.label}</span><output id="out-${c.id}" for="${c.id}"></output></label><input id="${c.id}" type="range" min="${c.min}" max="${c.max}" step="${c.step}"><p>${c.help}</p></div>`).join('');
  for(let i=0;i<5;i++) for(const prefix of ['rate','range']) $(`${prefix}-${i}`).addEventListener('input',e=>{
    const v=e.target.valueAsNumber;if(!Number.isFinite(v)||v< -5||v>25){showInputError('Annual rate changes must be between −5% and 25%.');return;}
    settings.rates[i]=v;$(`${prefix==='rate'?'range':'rate'}-${i}`).value=v;changed();
  });
  for(const c of controls) $(c.id).addEventListener('input',e=>{settings[c.id]=e.target.valueAsNumber;changed();});
  for(const id of ['minCash','minDscr','maxRate','billCeiling','usage','income']) $(id).addEventListener('input',e=>{
    const proposed={...settings,[id]:e.target.valueAsNumber};try{validateSettings(proposed);settings=proposed;changed();}catch(err){showInputError(err.message);}
  });
}
function showInputError(message){$('scenario-status').className='scenario-status error';$('scenario-status').textContent=`Input needs attention: ${message} The charts retain the last valid scenario.`;}
function syncControls(){
  for(let i=0;i<5;i++){$(`rate-${i}`).value=settings.rates[i];$(`range-${i}`).value=settings.rates[i];}
  for(const c of controls)$(c.id).value=settings[c.id];
  for(const id of ['minCash','minDscr','maxRate','billCeiling','usage','income'])$(id).value=settings[id];
  for(const id of ['elasticity','rateExposure'])if($(id))$(id).value=settings[id];
}
function changed(){optimizationMessage='';stressStale=true;render();$('stress-results').innerHTML='<div class="empty-state">The scenario has changed. Run the stress tests to refresh these results.</div>';}

function render(){
  current=simulate(data,settings);
  for(const c of controls)$(`out-${c.id}`).textContent=c.unit==='grant'?`${millions(settings[c.id])}/yr`:`${num(settings[c.id],c.step<1?1:0)}${c.unit==='pp'?' pp':'%'}`;
  const failedYears=[...new Set(current.failures.map(f=>f.year))];
  $('scenario-status').className='scenario-status'+(current.feasible?'':' warning');
  $('scenario-status').innerHTML=`<strong>${current.feasible?'All five years meet the selected financial tests.':`Financial target not met in ${failedYears.join(', ')}.`}</strong> ${current.feasible?'This is numerical feasibility within the stated model.':'Review the highlighted annual metrics or search for a rate path.'}<br>2027 uses the approved budget with proposed rates. 2028–2031 are derived scenarios. Agreement and approval status remains unresolved.`;
  const end=current.rows.at(-1), first=current.rows[0];
  const referenceBill=end.referenceMonthlyBill;
  const kpis=[
    {label:'2031 monthly water bill',value:usd(end.monthlyBill),context:`${usd(end.monthlyBill-referenceBill)} vs reference`,bad:false},
    {label:'Lowest cash days',value:num(current.minCashDays,0),context:`Policy minimum: ${num(settings.minCash,0)} days`,bad:current.minCashDays<settings.minCash},
    {label:'Lowest debt coverage',value:`${num(current.minDscr,2)}×`,context:`Planning proxy · target ${num(settings.minDscr,2)}×`,bad:current.minDscr<settings.minDscr},
    {label:'Five-year capital spending',value:millions(current.totalCapital),context:'Full cash-flow schedule retained',bad:false}
  ];
  $('kpis').innerHTML=kpis.map(k=>`<div class="kpi"><span class="label">${k.label}</span><strong class="value ${k.bad?'negative':''}">${k.value}</strong><span class="context">${k.context}</span></div>`).join('');
  const billSeries=[{name:'Reference scenario',values:current.rows.map(r=>r.referenceMonthlyBill),color:'#9baca9',dash:true}];
  if(comparison){const cmp=simulate(data,{...comparison,usage:settings.usage,income:settings.income});billSeries.push({name:'Saved comparison at current household use',values:cmp.rows.map(r=>r.monthlyBill),color:'#c98842',dash:true});}
  billSeries.push({name:'Scenario',values:current.rows.map(r=>r.monthlyBill),color:'#0b756c'});
  $('comparison-legend').hidden=!comparison;
  chart('bill-chart',billSeries,{money:true,title:'Monthly common residential water bill, 2027 to 2031'});
  chart('cash-chart',[
    {name:'Reference cash',values:current.reference.map(r=>r.cash),color:'#9baca9',dash:true},
    {name:'Policy minimum',values:current.rows.map(r=>r.requiredCash),color:'#c98842',dash:true},
    {name:'Scenario cash',values:current.rows.map(r=>r.cash),color:'#0b756c'}
  ],{million:true,title:'Year-end Suburban Water cash and policy minimum, 2027 to 2031'});
  renderFunding();renderFinancialTable();renderDecisionNotes();
  $('optimizer-result').innerHTML=optimizationMessage;
}

function renderFunding(){
  const reserveUse=data.budget2027.openingCash-current.rows.at(-1).cash;
  const rows=[['Capital program',current.totalCapital,'cost'],['Cash after debt service',current.totalOperatingCapital,''],['Planned + extra borrowing',current.totalBorrowing,'finance'],['Hypothetical new grants',current.totalGrants,'finance'],[reserveUse>=0?'Draw from opening cash':'Addition to cash',Math.abs(reserveUse),'gap']];
  const max=Math.max(...rows.map(r=>Math.abs(r[1])),1);
  $('funding-chart').innerHTML=`<div class="funding-rows">${rows.map(([name,value,cls])=>`<div class="funding-row"><span>${name}</span><div class="funding-track"><div class="funding-bar ${cls}" style="width:${Math.max(0,value)/max*100}%"></div></div><span>${millions(value)}</span></div>`).join('')}</div>`;
  $('funding-note').textContent=`Cash after operating expenses and debt service + borrowing + grants ${reserveUse>=0?'+ opening-cash draw':'− cash accumulation'} = capital spending. Planned borrowing totals ${millions(sum(data.cip.newBorrowing))}.${current.extraDebtOutstanding>0?` Extra debt outstanding in 2031 is ${millions(current.extraDebtOutstanding)} and remains payable after this five-year window.`:' No additional borrowing is selected.'}`;
}
function renderFinancialTable(){
  const definitions=[
    ['Rate index change','rate',v=>pct(v,1)],['Customer cash receipts','customer',millions],['Other cash receipts','other',millions],['Total cash revenue','revenue',millions,'total'],
    ['Cash operating expenses','opex',millions],['Debt service','debtService',millions],['Cash after debt service','capitalFromOperations',millions],
    ['Capital spending','capex',millions],['Planned new borrowing','baseBorrowing',millions],['Additional borrowing','extraBorrowing',millions],['Additional grants','grants',millions],
    ['Net cash movement','netFlow',millions],['Ending unrestricted cash','cash',millions,'total'],['Cash days','cashDays',v=>num(v,1)],['Debt coverage proxy','dscr',v=>`${num(v,2)}×`],
    ['Cash contribution / capex','capitalCoverage',v=>pct(v*100)],['Monthly water bill','monthlyBill',usd],['Annual water bill','annualBill',usd],['Water bill / household income','householdBurden',v=>pct(v*100,2)]
  ];
  $('financial-table').innerHTML=`<table><caption class="chart-note">All money in nominal USD; “m” means millions. 2028–2031 are model calculations.</caption><thead><tr><th scope="col">Metric</th>${data.years.map(y=>`<th scope="col">${y}</th>`).join('')}</tr></thead><tbody>${definitions.map(([name,key,f,cls])=>`<tr class="${cls??''}"><th scope="row">${name}</th>${current.rows.map(r=>{const bad=(key==='cash'&&r.cash<0)||(key==='cashDays'&&r.cashDays<settings.minCash)||(key==='dscr'&&r.dscr<settings.minDscr)||(key==='rate'&&r.rate>settings.maxRate)||(key==='monthlyBill'&&settings.billCeiling>0&&r.monthlyBill>settings.billCeiling);return `<td class="${bad?'bad':''}">${f(r[key])}</td>`;}).join('')}</tr>`).join('')}</tbody></table>`;
}
function renderDecisionNotes(){
  const last=current.rows.at(-1),firstCash=current.rows.find(r=>r.cashDays<settings.minCash),notes=[];
  if(firstCash)notes.push(`The first liquidity shortfall is in <strong>${firstCash.year}</strong>: ${num(firstCash.cashDays,1)} cash days against ${num(settings.minCash,0)}. The gap is ${usd(firstCash.requiredCash-firstCash.cash,0)}. This is a model policy shortfall, not a finding of a legal covenant breach.`);
  else notes.push(`The modeled cash floor is maintained in every year. The smallest margin above it is ${num(Math.min(...current.rows.map(r=>r.cashDays-settings.minCash)),1)} days.`);
  notes.push(`At ${num(settings.usage,0)} gallons per month, the illustrated household pays ${usd(current.totalHouseholdBill)} over five years. The 2031 water bill is ${pct(last.householdBurden*100,2)} of an assumed ${usd(settings.income,0)} annual income. Sewer and other household costs are outside this calculation.`);
  notes.push(`The 2027 budget has ${millions(data.budget2027.cashOperatingExpense-data.cip.cashOperatingExpense[0])} more cash operating expense than the CIP’s first-year projection. Carrying the budget anchor forward changes the outlook. <a href="#evidence" data-tab-link="evidence">Inspect the reconciliation</a>.`);
  if(current.approvals.length)notes.push(...current.approvals.map(esc));
  if(settings.extraDebtShare>0)notes.push(`Extra borrowing has ${millions(current.extraDebtOutstanding)} of principal outstanding at the end of 2031. The horizon does not capture the full repayment burden.`);
  notes.push('Capital work is held intact. Rate-class cost allocation, Welshtown treatment, new industrial loads, future signatory charges, and all governing approvals require a fuller model before a rate proposal.');
  $('decision-notes').innerHTML=`<ul>${notes.map(n=>`<li>${n}</li>`).join('')}</ul>`;
  bindTabLinks($('decision-notes'));
}

function renderEvidence(){
  const b=data.budget2027,c=data.cip,ref=buildReference(data),src=id=>data.sources.find(s=>s.id===id);
  const rows=[['Customer receipts / user charges',c.userCharges[0],b.customerCashReceipts,'Different measures: cash receipts versus CIP user charges'],['Total revenue in each cash model',c.userCharges[0]+c.otherOperatingRevenue[0]+c.nonOperatingRevenue[0],b.totalCashRevenue,'Model uses budget cash receipts'],['Cash operating expense',c.cashOperatingExpense[0],b.cashOperatingExpense,'Material budget update'],['Capital cash spending',c.cashFlowCapex[0],b.capitalSpending,'Same schedule'],['New borrowing',c.newBorrowing[0],b.newBorrowing,'Same first-year amount'],['Year-end unrestricted cash',c.endingCash[0],b.endingCash,'Different opening balance and operating assumptions']];
  $('evidence-content').innerHTML=`<div class="callout"><strong>Two published planning snapshots are not interchangeable.</strong> The original CIP cash-flow model uses 3% annual rates and 1% growth. The annual budget updates the first-year costs and receipts. This demonstration rebuilds the ledger from the budget anchor and uses the CIP’s later spending, debt, and growth profile. The resulting 2028–2031 values are <strong>derived scenarios</strong>.</div>
    <div class="content-grid"><article class="card full-width"><div class="card-heading"><div><p class="eyebrow">Reconciliation</p><h3>2027 capital-plan model versus 2027 budget</h3></div><span class="badge derived">Separate snapshots</span></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Metric</th><th>Original CIP</th><th>Annual budget</th><th>Treatment</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${usd(r[1],0)}</td><td>${usd(r[2],0)}</td><td>${r[3]}</td></tr>`).join('')}</tbody></table></div><p class="chart-note">Sources: ${link(src('lca-oct26-packet').url,'October 26 packet, PDF pp. 13, 16, 18')} and ${link(src('lca-suburban-cip').url,'Suburban capital plan, printed pp. 3–4')}. The source tables retain “as of 09-24-26” headers; the revised values are in the October 26 approval packet.</p></article>
    <article class="card"><p class="eyebrow">A changed cash outlook</p><h3>Published CIP and derived reference</h3><div id="evidence-cash-chart" class="chart"></div><div class="legend"><span><i class="dot teal"></i>2027 budget + derived later years</span><span><i class="line grey"></i>Original CIP projection</span></div><p class="chart-note">The difference is a scenario reconciliation, not an assertion that LCA forecasts a cash shortfall.</p></article>
    <article class="card"><p class="eyebrow">Status matters</p><h3>Suburban Water customer cash receipts</h3><div class="table-wrap"><table><thead><tr><th>Period</th><th>Cash receipts</th><th>Status</th></tr></thead><tbody>${data.cashReceiptsHistory.map(r=>`<tr><td>${r.year}</td><td>${usd(r.value,0)}</td><td>${r.status==='actual_in_budget_schedule'?'Actual in budget schedule':r.status==='forecast'?'Forecast':'Budget'}</td></tr>`).join('')}</tbody></table></div><p class="chart-note">${link(src('lca-oct26-packet').url,'October 26 packet, PDF p. 16')}. One actual year and two planning values are not a calibrated historical time series. Do not fit a trend across these statuses.</p><div class="callout">The reference’s 1% growth comes from the CIP planning assumption. It is not estimated from these three observations.</div></article>
    <article class="card full-width"><p class="eyebrow">Separate funds</p><h3>2027 authority context</h3><div class="table-wrap"><table><thead><tr><th>Fund</th><th>Cash revenue</th><th>Cash expense</th><th>Capital</th><th>New borrowing</th><th>Reported coverage</th></tr></thead><tbody>${data.authorityBudget2027.map(r=>`<tr><th>${r.fund}</th><td>${millions(r.cashRevenue)}</td><td>${millions(r.cashExpense)}</td><td>${millions(r.capitalSpending)}</td><td>${millions(r.newBorrowing)}</td><td>${num(r.reportedDscr,2)}×</td></tr>`).join('')}</tbody></table></div><p class="chart-note">The published coverage ratios have fund-specific indenture adjustments. This table reports them as published; it does not recompute City or wastewater coverage from the aggregate revenue figures or pool their cash.</p></article>
    <article class="card full-width"><p class="eyebrow">Comparable usage, different services</p><h3>Published residential bill examples</h3><div class="table-wrap"><table class="data-table"><thead><tr><th>System</th><th>Service</th><th>2026 annual</th><th>Proposed 2027 annual</th></tr></thead><tbody>${data.billComparisons.map(r=>`<tr><td>${esc(r.system)}</td><td>${esc(r.scope)}</td><td>${usd(r.annual2026)}</td><td>${usd(r.annual2027)}</td></tr>`).join('')}</tbody></table></div><p class="chart-note">15,000 gallons per quarter; typical 5/8-inch water meter where applicable. ${link(src('lca-final-budget').url,'Final budget slides, PDF pp. 12–15')}. These are service-specific examples, not a ranking of utility efficiency. The $557 suburban sewer summary is an average, not either common-rate tariff.</p></article></div>
    <div class="section-heading" style="margin-top:30px"><p class="eyebrow">Source register</p><h2>Inspect the originals</h2><p>Each input retains its source, date, unit, and transformation. <a href="data/baseline.json" download>Download the baseline JSON</a> or <a href="https://github.com/nwags/nwags.github.io/blob/main/lca-waterworks/docs/METHODOLOGY.md">read the model guide</a>.</p></div><div class="source-list">${data.sources.map(s=>`<article class="source-entry"><h4>${link(s.url,s.title)}</h4><p>${esc(s.locator)}</p><p><strong>${esc(s.status)}</strong></p><p>Retrieved ${esc(s.retrieved)}${s.sha256?' · SHA-256 recorded in baseline JSON':''}</p></article>`).join('')}</div>`;
  chart('evidence-cash-chart',[{name:'Original CIP cash',values:c.endingCash,color:'#9baca9',dash:true},{name:'Reanchored reference',values:ref.map(r=>r.cash),color:'#0b756c'}],{million:true,title:'Original capital plan projected cash versus the derived reference'});
  renderHistory();
}

function renderHistory(){
  const h=data.historicalOperations,source=data.sources.find(s=>s.id===h.sourceId),last=h.years.length-1;
  const annualChange=xs=>(xs[last]/xs[last-1]-1)*100,cagr=xs=>(Math.pow(xs[last]/xs[0],1/last)-1)*100;
  const industrialShare=(h.largeIndustrialSalesThousandGallons[last]+h.otherIndustrialSalesThousandGallons[last])/h.salesThousandGallons[last]*100;
  const section=document.createElement('section');section.innerHTML=`<div class="section-heading"><p class="eyebrow">Ten years of reported operating history</p><h2>Customer growth and water use move differently</h2><p>${esc(h.scope)} · ${esc(h.status)}. Customer counts mean units served, not connections.</p></div><div class="content-grid"><article class="card"><h3>Volume and units served · 2016 = 100</h3><div id="history-chart" class="chart"></div><div class="legend"><span><i class="dot teal"></i>Water sales</span><span><i class="line amber"></i>Units served</span></div><p class="chart-note">Indexed series share a scale. These are historical operating statistics, not the 2027–2031 financial forecast.</p></article><article class="card"><h3>What the history suggests examining</h3><p class="explain">From 2016–2025, water sales grew ${pct(cagr(h.salesThousandGallons),2)} per year on a compound basis; units served grew ${pct(cagr(h.customerUnits),2)}. In 2025, sales changed ${pct(annualChange(h.salesThousandGallons),2)} while units changed ${pct(annualChange(h.customerUnits),2)}.</p><p class="explain">Large and other industrial customers account for ${pct(industrialShare,1)} of this service area's 2025 sales volume. That concentration motivates separate industrial scenarios, rather than a residential-only demand assumption.</p><div class="callout">Descriptive trends do not identify price elasticity or establish a future growth rate. The model's 1% growth remains the published CIP planning assumption.</div></article><article class="card full-width"><div class="table-wrap"><table><thead><tr><th>Year</th><th>Water sales · million gallons</th><th>Units served at year end</th></tr></thead><tbody>${h.years.map((y,i)=>`<tr><td>${y}</td><td>${num(h.salesThousandGallons[i]/1000,3)}</td><td>${num(h.customerUnits[i],0)}</td></tr>`).join('')}</tbody></table></div><p class="chart-note">${link(source.url,'2025 ACFR, printed p. 127 / PDF p. 145')}. ${esc(h.notes)} Growth rates are derived from the displayed series; no probability distribution is fitted.</p></article></div>`;
  $('evidence-content').prepend(section);
  chart('history-chart',[{name:'Water sales index',values:h.salesThousandGallons.map(v=>v/h.salesThousandGallons[0]*100),color:'#0b756c'},{name:'Units served index',values:h.customerUnits.map(v=>v/h.customerUnits[0]*100),color:'#c98842',dash:true}],{years:h.years,zero:false,title:'Western Lehigh service area historical volume and units served, indexed to 2016'});
}

function renderAssumptions(){
  $('stress-results').innerHTML='<div class="empty-state">Run the tests to see which conditions put pressure on the current rate path.</div>';
  const assumptions=[
    ['2027 financial anchor','Approved budget / proposed tariffs','Exact source cash receipts, expense, debt service, capital, and borrowing. The modeled closing cash reconciles to $7,546,095.'],
    ['2028–2031 customer receipts','Derived','Reanchor on 2027 cash receipts. Apply the selected rate index and growth. The reference uses 3% rates and 1% growth from the CIP.'],
    ['Operating costs','Derived','Apply the original CIP year-to-year expense-growth factors to the revised 2027 budget expense. The O&M slider adds a compounding drift.'],
    ['Other receipts','Assumed / sensitivity','The reference holds the 2027 total of $2,105,008 flat. Its $831,720 annual investment income is not tied to future balances or yields. A dedicated control reduces that income in 2028–2031; the limiting zero-income stress removes $3,326,880 cumulatively. Other receipts do not increase with the rate slider.'],
    ['Rate exposure','Assumed','Default 100% of customer cash receipts responds to the scenario index, matching the aggregated planning simplification. Actual class and exception shares need validation.'],
    ['Price response','Assumed','Default elasticity is zero, consistent with the reference. Optional negative elasticity affects the variable component only. Its fund-wide variable share is proxied by the typical residential bill, not measured customer-class data.'],
    ['Capital and planned debt','Published plan / assumed execution','All capital cash spending and planned borrowing are retained. Later debt service follows the CIP. Project timing, loan approvals, and final amounts can change.'],
    ['Additional financing','Hypothetical','Default zero grants and extra borrowing. Grants and borrowing are capped to remaining capital need. Extra borrowing is repaid over 20 years starting the following year.'],
    ['Cash and debt targets','Model policy','180 days and 1.20× are initial planning thresholds. This proxy does not certify indenture compliance. Restricted cash and all investment balances are excluded from spendable cash.'],
    ['Household affordability','Illustrative','A constant 5,000 gallons/month and $35,000 annual household income are editable examples. The ratio covers water only. It is not a universal affordability standard.'],
    ['Stress scenarios','Judgmental possibilities','Named changes and their joint adverse combination are deliberately disclosed. No probability or fitted joint distribution is assigned.']
  ];
  $('assumptions-content').innerHTML=`<div class="card"><div class="card-heading"><div><p class="eyebrow">Model sensitivity</p><h3>Two assumptions to test before a rate study</h3></div></div><div class="content-grid"><label class="input-row" for="rateExposure"><span>Rate-sensitive share of customer receipts <small>Actual class shares require billing extracts</small></span><span class="number-unit"><input id="rateExposure" type="number" min="0" max="100" step="5" value="100">%</span></label><label class="input-row" for="elasticity"><span>Price elasticity of variable usage <small>0 means no response; −0.1 is an illustrative prior</small></span><input id="elasticity" type="number" min="-0.4" max="0" step="0.05" value="0"></label></div></div><article class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Assumption</th><th>Evidence class</th><th>Meaning and limitation</th></tr></thead><tbody>${assumptions.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div></article><div class="callout amber-callout"><strong>What would justify probabilistic forecasts?</strong> A consistent actuals history by fund and customer class, weather and demand covariates, grant-stage evidence, and capital outturns. Fit and backtest the marginal distributions, then validate dependence. The current stress tests do not supply a probability of success.</div>`;
  for(const id of ['rateExposure','elasticity'])$(id).addEventListener('input',e=>{const proposed={...settings,[id]:e.target.valueAsNumber};try{validateSettings(proposed);settings=proposed;changed();}catch(err){showInputError(err.message);}});
}

async function renderRules(){
  try{const response=await fetch('data/constraints.json');if(!response.ok)throw Error('unavailable');const rules=await response.json();
    $('rules-content').innerHTML=`<div class="callout"><strong>Optimization scope is deliberately limited.</strong> The executable model covers Suburban Water fund sensitivities. City lease formulas, wastewater signatory allocations, and customer-class cost-of-service design are not editable optimization variables. The constraint register records what is verified and what remains open.</div><article class="card"><div class="table-wrap"><table class="data-table"><thead><tr><th>Scope / rule</th><th>Status</th><th>Dashboard treatment</th><th>Evidence</th></tr></thead><tbody>${rules.rules.map(r=>`<tr><td><strong>${esc(r.scope)}</strong><br>${esc(r.rule)}</td><td><span class="badge ${r.status==='Verified'?'':'unresolved'}">${esc(r.status)}</span></td><td>${esc(r.treatment)}</td><td>${link(r.url,r.locator)}</td></tr>`).join('')}</tbody></table></div></article><div class="callout amber-callout">${esc(rules.summary)}</div><p><a href="https://github.com/nwags/nwags.github.io/blob/main/lca-waterworks/docs/CONSTRAINTS.md">Read the full constraint register</a> · <a href="https://github.com/nwags/nwags.github.io/blob/main/lca-waterworks/docs/MODEL_COMPARISON.md">Review comparable public rate models</a></p>`;
  }catch{$('rules-content').innerHTML='<div class="callout amber-callout">The full constraint register is unavailable. Numerical feasibility does not establish agreement compliance. Read the <a href="https://github.com/nwags/nwags.github.io/blob/main/lca-waterworks/docs/CONSTRAINTS.md">constraint guide</a> before interpreting any scenario.</div>';}
}

function renderMock(result){
  $('connection-results').innerHTML=`<div class="scenario-status ${result.valid?'':'error'}" style="margin-top:20px"><strong>${result.valid?'Synthetic extract reconciled to its control totals.':'Extract rejected.'}</strong> ${result.valid?`${result.count} records; as of ${esc(result.asOf)}. The public model is unchanged.`:'Correct the issues below before using this fixture.'}</div>${result.errors.length?`<ul class="error-list">${result.errors.map(e=>`<li>${esc(e)}</li>`).join('')}</ul>`:''}<div class="table-wrap"><table><thead><tr><th>Canonical metric</th><th>Aggregate USD</th></tr></thead><tbody>${Object.entries(result.totals).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${usd(v)}</td></tr>`).join('')}</tbody></table></div><p class="chart-note">${result.warnings.map(esc).join(' ')}</p>`;
}

function download(name,content,mime='application/json'){
  const url=URL.createObjectURL(new Blob([content],{type:mime}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function setTab(id,focus=false){
  const ids=['plan','evidence','assumptions','rules','connections'];if(!ids.includes(id))return;
  ids.forEach(x=>{$(`tab-${x}`).setAttribute('aria-selected',x===id?'true':'false');$(`tab-${x}`).tabIndex=x===id?0:-1;$(`panel-${x}`).hidden=x!==id;});
  if(focus)$(`tab-${id}`).focus();
}
function bindTabLinks(root=document){root.querySelectorAll('[data-tab-link]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();setTab(a.dataset.tabLink,true);}));}
function events(){
  document.querySelectorAll('[data-tab]').forEach(b=>{b.addEventListener('click',()=>setTab(b.dataset.tab));b.addEventListener('keydown',e=>{const ids=['plan','evidence','assumptions','rules','connections'];let i=ids.indexOf(b.dataset.tab);if(e.key==='ArrowRight')i=(i+1)%ids.length;else if(e.key==='ArrowLeft')i=(i+ids.length-1)%ids.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=ids.length-1;else return;e.preventDefault();setTab(ids[i],true);});});bindTabLinks();
  $('reset').addEventListener('click',()=>{settings=defaultSettings(data);$('preset').value='baseline';comparison=null;syncControls();changed();});
  $('preset').addEventListener('change',e=>{settings=defaultSettings(data);if(e.target.value==='freeze')settings.rates=[0,0,0,0,0];if(e.target.value==='pressure')Object.assign(settings,{opexDrift:1,customerGrowth:0,capexOverrun:10});syncControls();changed();});
  $('save-scenario').addEventListener('click',()=>{comparison=structuredClone(settings);render();$('save-scenario').textContent='Comparison saved';setTimeout(()=>$('save-scenario').textContent='Save comparison',1600);});
  $('export-scenario').addEventListener('click',()=>download('waterworks-scenario.json',JSON.stringify(exportScenario(data,settings,current),null,2)));
  $('export-csv').addEventListener('click',()=>{const keys=['year','rate','openingCash','customer','other','revenue','opex','baseDebtService','extraDebtService','debtService','capex','baseBorrowing','extraBorrowing','grants','netFlow','cash','cashDays','requiredCash','dscr','monthlyBill','annualBill','householdBurden','extraInterest','extraPrincipal','extraDebtOutstanding'];download('waterworks-financial-plan.csv',['modelVersion','dataCutoff',...keys].join(',')+'\n'+current.rows.map(r=>[data.modelVersion,data.cutoff,...keys.map(k=>r[k])].join(',')).join('\n'),'text/csv');});
  $('import-scenario').addEventListener('change',async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>200000)throw Error('Scenario files must be smaller than 200 KB.');const payload=JSON.parse(await file.text());if(payload.schemaVersion!=='1.0'||payload.modelVersion!=='0.1.0'||payload.dataCutoff!==data.cutoff)throw Error('Scenario schema, model version, or data cutoff does not match this release.');validateSettings(payload.settings);settings=structuredClone(payload.settings);syncControls();changed();}catch(err){showInputError(err.message);}finally{e.target.value='';}});
  $('optimize').addEventListener('click',()=>{const button=$('optimize');button.disabled=true;button.textContent='Searching…';setTimeout(()=>{try{const result=optimize(data,settings,$('objective').value);if(result.best){settings={...settings,rates:result.best.rates};syncControls();optimizationMessage=`<strong>Best feasible path in the disclosed search: ${esc(result.best.name)}.</strong> ${result.best.rates.map((r,i)=>`${data.years[i]}: ${pct(r)}`).join(' · ')}<br>${result.tested} unique candidates tested; ${result.feasibleCount} feasible. Objective: ${result.objective==='smooth'?'minimize the highest annual increase, then changes between years, then five-year bills':'minimize the five-year nominal household bill, then peak increase and changes between years'}. Resolution: 0.1 percentage point. Families: level, earlier increases, later increases. This is not a global continuous optimum or a tariff recommendation.`;}else{optimizationMessage=`<strong>No feasible path in the ${result.tested}-candidate search.</strong> The selected policy targets, rate bound, funding assumptions, and bill ceiling cannot all be met within this finite family. Your scenario is unchanged. Inspect the failed constraints; removing required projects is not an available shortcut.`;}stressStale=true;render();$('stress-results').innerHTML='<div class="empty-state">Run stress tests for the newly selected rate path.</div>';}catch(err){showInputError(err.message);}finally{button.disabled=false;button.innerHTML='Find rate path'; }},30);});
  $('run-stress').addEventListener('click',()=>{const cases=stressTests(data,settings);$('stress-results').innerHTML=`<div class="table-wrap"><table class="data-table"><thead><tr><th>Test</th><th>Change</th><th>Lowest cash days</th><th>Lowest coverage</th><th>Result</th></tr></thead><tbody>${cases.map(c=>{const changed=Object.entries(c.patch).some(([k,v])=>settings[k]!==v);const noExposure=(c.name==='No additional grants'&&settings.grantAnnual===0)||(c.name==='Higher new-debt interest'&&settings.extraDebtShare===0);return `<tr><td>${esc(c.name)}</td><td>${esc(c.change)}${noExposure?'<br><em>No exposure in this selected plan.</em>':!changed&&c.name!=='Selected scenario'?'<br><em>Already at this test bound.</em>':''}</td><td>${num(c.result.minCashDays,1)}</td><td>${num(c.result.minDscr,2)}×</td><td><span class="badge ${c.result.feasible?'':'unresolved'}">${c.result.feasible?'Meets model tests':'Target missed'}</span></td></tr>`;}).join('')}</tbody></table></div><p class="chart-note">These are named, judgmental scenarios. Counts of passing tests are not a probability of success. Unchanged or unexposed cases do not provide additional evidence of robustness.</p>`;stressStale=false;});
  $('load-mock').addEventListener('click',async()=>{try{const r=await fetch('data/mock-erp.json');if(!r.ok)throw Error('Fixture unavailable.');renderMock(validateMock(await r.json()));}catch(err){renderMock({valid:false,errors:[err.message],warnings:[],totals:{}});}});
  $('import-mock').addEventListener('change',async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>500000)throw Error('Use a JSON fixture smaller than 500 KB.');renderMock(validateMock(JSON.parse(await file.text())));}catch(err){renderMock({valid:false,errors:[err.message],warnings:[],totals:{}});}finally{e.target.value='';}});
}

async function start(){
  const r=await fetch('data/baseline.json');if(!r.ok)throw Error('The versioned public baseline could not be loaded.');data=await r.json();settings=defaultSettings(data);
  buildControls();renderEvidence();renderAssumptions();syncControls();events();render();await renderRules();
  $('connection-guide').innerHTML='<div class="callout"><strong>Production pathway:</strong> approved read-only exports or a documented licensed interface; fund and customer-class mapping; source control totals; reconciliation to the general ledger; reviewed aggregate inputs; a versioned model refresh. The public demo never receives live ERP credentials or identifiable records.</div><p><a href="https://github.com/nwags/nwags.github.io/blob/main/lca-waterworks/docs/ERP_INTEGRATION.md">ERP integration and Power BI/Excel migration</a> · <a href="https://github.com/nwags/nwags.github.io/blob/main/lca-waterworks/docs/ORCHESTRATION.md">Worker orchestration and stage gates</a></p>';
  document.documentElement.dataset.ready='true';
}
start().catch(err=>{showInputError(err.message);$('optimize').disabled=true;console.error(err);});
