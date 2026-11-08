# Worker orchestration guide

## Purpose and authority

Use bounded worker chats to maintain a reproducible CEO demonstration for `nwags/nwags.github.io`, served within `nwags.com/lca-waterworks/`. The browser runs static HTML/JavaScript without an AI service or production ERP connection. Workers assist development; they are not part of the deployed application.

Read [AGENTS.md](../AGENTS.md), [STATE.md](STATE.md), and [ROADMAP.md](ROADMAP.md) before assigning work. STATE is the only changing progress record. This guide describes a process, not a claim that a stage has passed. The controller records the current branch, commit, milestone, cutoff, ownership, observed checks, and next objective there.

The present model covers **Suburban Water, 2027–2031**. Allentown and wastewater remain separate reference scopes. The final 2027 budget anchors the reference; CIP capital, financing, and operating-cost growth inform derived 2028–2031 scenarios. Those scenarios are not LCA forecasts. Preserve the documented budget/CIP reconciliation.

## Stages and acceptance gates

| Stage | Worker output | Gate before advancing |
|---|---|---|
| 1. Evidence and constraints | Two independent packets: primary financial/tariff evidence; PA applicability and executed agreement evidence | Every consequential value has scope, units, dates, source locator, and evidence status; proposed tariffs remain distinct from adopted/effective tariffs |
| 2. Feature and gap plan | Decision-to-control map, missing evidence, bounded follow-up questions | Each control has a purpose, equation, plausible range, and assumption or source; missing constraints are visible |
| 3. Targeted research | Answers to specific model gaps, revised assumptions | At most two focused passes per material gap; unresolved items become explicit assumptions, locked features, or escalation items |
| 4. Model | Versioned inputs, deterministic equations, finite candidate search, meaningful checks | Cash/revenue/debt reconcile; mandatory capital remains protected; fund boundaries and numerical constraints hold |
| 5. Independent review | Source reconciliation, hand calculations, peer-model comparison, severity-ranked findings | Critical calculation or misleading-status findings resolved; disagreements recorded with evidence |
| 6. Dashboard | Controls, comparison, stress cases, provenance, exports, synthetic connector panel | Browser behavior matches the frozen model contract; infeasibility and agreement status remain separate |
| 7. Guides and CEO rehearsal | User manual, methodology, source guide, demonstration sequence | Instructions match the actual build; the demonstration explains tradeoffs and unresolved production needs |
| 8. Integration and release | Consolidated changes and observed verification | Controller alone handles repository integration and any publication authorized by the user |

After the model contract is frozen, dashboard work may run alongside independent review in disjoint files. A review change to the contract returns dependent work to the relevant gate. Do not silently revise definitions to make checks pass.

## Execution and resource budget

Use repository-aware coding chats for implementation and review; browsing-capable research chats for source discovery. Use a standard workhorse model with low/medium reasoning for retrieval, extraction, mechanical implementation, and guides. Use a reasoning-capable model with high reasoning for legal applicability, architecture, financial modeling, or independent challenge. A faster model is sufficient when inputs and acceptance criteria are explicit. Escalate after a concrete failed check, conflicting material evidence, or unresolved architecture decision; maximum effort is exceptional.

Limit discovery to **two independent researchers plus one controller**. Later, pair one implementer with one independent reviewer under the controller. Remain within the actual session allowance. Workers do not spawn further workers. If model or effort selection is unavailable, inherit the current setting and report it honestly. Do not assume current product pricing or limits.

## Evidence and decision rules

Label inputs **VERIFIED**, **DERIVED**, **ASSUMED**, or **UNRESOLVED**. Separately record document status: actual, budget, proposed, adopted, effective, or projection. Preserve original amounts and units alongside transformations. Peer comparisons require matched service scope, billing period, usage, customer class, and cash/debt definitions.

Numerical feasibility means only that implemented checks passed. It does not establish legal applicability, municipal agreement compliance, financing authority, or tariff approval. Restricted funds, Allentown obligations, wastewater, and Suburban Water cannot be pooled to improve a result. Scenario stress counts or judgmental weights are not empirical probabilities.

The finite optimizer reports the candidate family, grid resolution, objective, candidates tested, and feasible count. It makes no claim of a global continuous optimum.

## Running the workflow

Copy [controller.md](../workers/controller.md) into the controller chat, select briefs from [stages.md](../workers/stages.md), and require [handoff-template.md](../workers/handoff-template.md) on every return. Assign exact file ownership before work starts. Allow one correction cycle for a failed handoff, then reassess scope or escalate the specific blocker. Stop completed workers instead of keeping open-ended research loops running.

At milestones report intent, completed work, observed verification, deviations, risks, current state, and next objective. A useful CEO rehearsal follows baseline → tradeoffs → candidate or infeasibility → stress → evidence trail → production decisions.
