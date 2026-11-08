# Bounded governance review — LCA WaterWorks BI demonstration

Research date: November 8, 2026. Rate evidence cutoff: November 7, 2026. Projection period: 2027–2031.

## Intended use and outcome

The defensible initial scope is **Suburban Water fund sensitivity analysis**. The prototype can show the financial effects of transparent assumptions, including user-selected revenue growth, operating costs, capital spending, financing proxies, and reserve targets. A financially feasible scenario is not an adopted tariff, a borrowing authorization, or a finding of legal compliance.

Allentown, wastewater, wholesale, signatory, and Welshtown customer-rate optimization remain unavailable. This is a scope boundary arising from missing current agreement and allocation evidence. It is not a conclusion that these systems could never be modeled.

The [constraint JSON](../data/constraints.json) uses the app-requested structure: `{"rules":[{"scope","rule","status","treatment","url","locator"}],"summary"}`, with a stable `id` added to each row. The permitted status values are **Verified** and **Applicability unresolved**. A verified statute or approval record does not verify every current contract or legal application.

## Evidence and implementation decisions

| Issue | Evidence and scope | Prototype treatment |
| --- | --- | --- |
| Authority rate setting | [53 Pa.C.S. § 5607(d)(9)](https://www.legis.state.pa.us/WU01/LI/LI/CT/HTM/53/00.056.007.000..HTM) and [Act 43 of 2021, § 1](https://www.legis.state.pa.us/WU01/LI/LI/US/HTM/2021/0/0043..HTM) provide the statutory rate framework, including reasonable and uniform rates, financial obligations, safe and adequate service, and specified judicial review. | Show statutory review flags; financial tests alone do not resolve these standards. No generic PUC percentage cap is verified. |
| Service-area benefit | The project-revenue paragraph of § 5607(d)(9) applies to an authority serving more than one municipality and includes a benefit-to-the-entire-service-area condition. | Keep fund/project accounting separate and require supported allocations. Do not encode a universal transfer ban. |
| Allentown amendment chain | [City Council R85](https://allentownpa.legistar.com/LegislationDetail.aspx?GUID=0252BB7A-E462-4BDB-9350-02C85E2EAD8E&ID=4590278&Options=&Search=), file 15-3680, enactment 30026, passed August 12, 2020, records approval of an integrated settlement and agreement amendments. | Require executed agreements and subsequent amendments. The original 2013 lease alone is insufficient. |
| Historical rate escalator | [Official 2017 overview](https://lehighcountyauthority.org/wp-content/uploads/Lease-Overview-LCA-Board-Meeting-040917.pdf), physical pages 17–18, describes CPI + 2.5 percentage points through 2032 and CPI + 2.0 thereafter. | Reference only. Verify Schedule 3 / § 7.1(e), CPI details, and amendments before implementation. Do not apply to Suburban Water. |
| City capital charges | [Posted 2020 amendment](https://www.lehighcountyauthority.org/wp-content/uploads/2020/07/Amendment-to-the-Lease-Agreement.pdf), § 2, physical pages 2–3, changes CCRC treatment. | Current executed terms and project approvals remain required; City controls are disabled. |
| Rate-relief coverage | Same posted amendment, § 8, physical pages 11–13, uses 1.70 within conditional Allentown rate-relief provisions. | Do not treat 1.70 as a general bond covenant or Suburban Water requirement. |
| Municipal and wholesale allocations | [Official settlement page](https://www.lehighcountyauthority.org/ourwaterourfuture/) identifies separate water-supply and capital-charge agreements. | No wastewater, wholesale, or signatory optimization without agreement-specific inputs and allocation methods. |
| 2027 adoption | [Final 2027 budget presentation](https://www.lcawaterworks.org/wp-content/uploads/2026/10/LCA-2027-Budget-Final-Review-Approval-102626.pdf), PDF page 20, schedules rate adoption for November 9. No later adoption is assumed. | Preserve PROPOSED labels at the November 7 cutoff. November 9 is prospective, not evidence of adoption. Budget approval is separate. |
| Financing and capital approvals | [LCA finances](https://www.lcawaterworks.org/lca-finances/) distinguishes capital-plan adoption from future budget, project and bond approvals; current covenant definitions remain unverified here. | Label numeric floors as assumptions. Forecast feasibility does not approve financing or projects. |
| Welshtown | A current applicable tariff and agreement set have not been validated. | Exclude Welshtown-specific rate and allocation optimization. |

The posted 2020 amendment is a public draft with a blank execution date. Its § 18, physical page 17, also contains an effectiveness condition tied to bondholder consent. Council approval is verified; this register does not certify execution or effectiveness of every draft provision.

## Documents needed to expand scope

1. **Adopted 2027 rates:** board resolution, complete meter/class/system schedules, units, effective dates, and any exceptions. These determine the defensible starting tariff and customer-bill calculator.
2. **Allentown agreement chain:** executed May 1, 2013 concession/lease, Schedule 3 and § 7.1(e), complete executed 2020 settlement/amendment packet, evidence of effectiveness, and all later amendments. These determine the actual escalation formula and contractual obligations.
3. **Capital cost recovery:** executed CCRC memorandum and amendments, City-approved project register, recoverable debt/capital balances, and effective charge schedules. These determine which costs can enter City retail charges and when.
4. **Wholesale and signatory allocation:** executed 2009 water-supply agreement and later amendments, current wastewater signatory agreements, flow/strength/capacity definitions, allocation calculations, and related project approvals. These determine municipal and intersystem charges.
5. **Suburban Water financing:** current indentures and loan agreements, amendments, revenue and debt-service definitions, reserve restrictions, required coverage tests, and borrowing/project approvals. These replace illustrative dashboard floors with actual document-specific checks.
6. **Capital and operating baseline:** approved 2027–2031 capital plan, project timing and funding sources, debt schedules, reconciled unrestricted/restricted balances, operating forecasts, and allocation reconciliations. These are necessary to avoid counting a cost, debt payment, reserve, or transfer twice.
7. **Welshtown expansion:** a specific adopted rate schedule, service/ownership agreements, accounting boundary, and supported allocation method. Until then the prototype cannot calculate a Welshtown rate.

## Source and inference discipline

- Statutory standards are review requirements, not a claim that a single numerical rule can determine compliance.
- A public resolution approving an agreement and an executed effective agreement are distinct evidence states.
- Historical presentations can explain contract structure but cannot substitute for current executed terms.
- Proposed, adopted, effective, actual, and forecast values must remain distinguishable in data and UI labels.
- An affordability target, reserve floor, debt-coverage floor, growth assumption, or objective weight is a planning assumption unless a specific binding source establishes otherwise.
- No conclusion here authorizes using another system's funds, changing customer-class cost allocation, or imposing a pass-through charge.
- The JSON links the prospective rate-adoption schedule and the published Welshtown exception; neither establishes a complete effective tariff or agreement set.

## Research limits

This is a bounded prototype constraint register, not an exhaustive legal review. Exact current CPI mechanics, executed amendment effectiveness, City CCRC approvals, municipal allocation terms, and current Suburban Water covenant definitions remain unresolved. The scope gates make those limits visible while allowing a transparent Suburban Water sensitivity demonstration.
