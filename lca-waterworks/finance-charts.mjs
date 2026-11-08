/** Shared presentation contract. All amounts are nominal USD from one simulate() run.
 * No allocation, authorization or accounting recognition is inferred by a chart.
 */
const series=(key,label,color,glossary)=>({key,label,color,glossary});
const sources=[
 series('customer','Customer receipts','#0b756c','customer-receipts'),
 series('otherOperating','Other operating receipts','#547d9b','operating-receipts'),
 series('investment','Investment income received','#8a7d35','investment-income'),
 series('capitalReceipts','Capital receipts / fees','#a17f4f','capital-receipts'),
 series('plannedGrants','Planned grants / contributions','#699b69','grants'),
 series('extraGrants','Additional grants','#8ebfa1','grants'),
 series('baseBorrowing','Planned borrowing','#725b9d','borrowing'),
 series('extraBorrowing','Additional borrowing','#aa87bf','borrowing'),
 series('investmentConversions','Investment conversions','#71858a','investment-conversions')
];
const uses=[
 series('operatingExpense','Operating cash payments','#0b756c','opex'),
 series('lease','Lease payments','#547d9b','lease-payments'),
 series('otherCapitalPayments','Other capital payments','#a17f4f','other-capital-payments'),
 series('baseDebtService','Base debt service','#725b9d','debt-service'),
 series('extraDebtService','Additional debt service','#aa87bf','debt-service'),
 series('capex','Capital spending','#c58b42','capex')
];
const funding=['baseBorrowing','extraBorrowing','plannedGrants','extraGrants','capitalReceipts'].map(key=>sources.find(s=>s.key===key));
export const FINANCE_CHART_MANIFEST={
 contractVersion:'1.0',modelVersion:'0.2.0',category:'year',categories:[2027,2028,2029,2030,2031],
 units:'nominal USD',displayUnits:'USD millions',tableUnits:'nominal USD to cents',
 boundary:'One selected division and scenario. No interdivision pooling.',
 charts:{sources:{id:'cash-sources',title:'Annual cash sources',type:'stacked-column',series:sources},uses:{id:'cash-uses',title:'Annual cash uses',type:'stacked-column',series:uses},capital:{id:'capital-funding',title:'Capital spending and identified funding',type:'grouped-stacked-column',spending:uses.find(s=>s.key==='capex'),series:funding}},
 formulas:{
 cashSources:{fields:sources.map(s=>s.key),expression:'customer + otherOperating + investment + capitalReceipts + plannedGrants + extraGrants + baseBorrowing + extraBorrowing + investmentConversions'},
 cashUses:{fields:uses.map(s=>s.key),expression:'operatingExpense + lease + otherCapitalPayments + baseDebtService + extraDebtService + capex'},
 identifiedCapitalFunding:{fields:funding.map(s=>s.key),expression:'baseBorrowing + extraBorrowing + plannedGrants + extraGrants + capitalReceipts'},
 capitalResidual:{expression:'max(0, capex - identifiedCapitalFunding)'},
 capitalFundingExcess:{expression:'max(0, identifiedCapitalFunding - capex)'},
 netFlow:{expression:'cashSources - cashUses'},
 cash:{expression:'openingCash + netFlow'}
 },
 notes:[
 'Opening cash is a stock carried into the year and is excluded from annual sources.',
 'Borrowing is financing and creates repayment obligations; it is not operating income.',
 'Investment conversions release previously held investments; they are not new income.',
 'The capital comparison is an aggregate timing comparison, not a project allocation or earmarking claim. Borrowing, grants and fees are not certified approved or available for every project.',
 'Capital less identified funding may be supported by operating surplus or opening unrestricted reserves. It is not the annual cash deficit. Funding above capital remains visible and is not silently capped.',
 'Debt service includes principal and interest. The existing published base schedule is not a complete debt rollforward; do not infer separate principal or interest where not supplied.',
 'Series and totals use full-precision run rows. Display rounding does not change calculations.'
 ]
};
export function financeChartRows(rows){
 const total=(r,list)=>list.reduce((n,s)=>n+r[s.key],0);
 return rows.map(r=>{const cashSources=total(r,sources),cashUses=total(r,uses),identifiedCapitalFunding=total(r,funding);return {...r,cashSources,cashUses,identifiedCapitalFunding,capitalResidual:Math.max(0,r.capex-identifiedCapitalFunding),capitalFundingExcess:Math.max(0,identifiedCapitalFunding-r.capex)};});
}
