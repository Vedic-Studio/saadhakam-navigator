# Content Audit Layer Review

**Date**: 2026-04-01  
**Scope**: New strategic content-audit layer built on top of the existing GSC + GA4 analytics stack  
**Primary files**:
- `src/lib/analytics/content-audit.ts`
- `src/lib/analytics/types.ts`
- `src/app/api/analytics/content-audit/route.ts`
- `src/app/api/analytics/content-audit/route.test.ts`

---

## What was added

This work introduces a new joined analytics layer that moves the dashboard from raw reporting into strategic content decision support.

Instead of looking at Google Search Console, GA4, and article metadata separately, the new layer combines them into a single audit payload that can answer questions like:

- Which articles attract the right audience?
- Which articles get traffic but do not qualify readers downstream?
- Which pages should be refreshed, expanded, deprioritized, or repaired for AEO/LLM visibility?
- Where are citeability gaps across direct answers, `llms-full.txt`, internal linking, and brand authority framing?

The endpoint now exposed at `GET /api/analytics/content-audit` returns a strategic portfolio-level audit rather than only operational metrics.

---

## What the new audit layer does

### 1. Pulls a 90-day current range plus previous comparison range

The service computes:

- a current 90-day window
- a previous 90-day comparison window
- a 2-day offset to avoid incomplete recent analytics data

This gives the audit enough history to be useful for content decisions, while still supporting directional deltas.

### 2. Joins multiple data sources into one row per article

For each article in `src/data/articles.ts`, the service joins:

- **GSC page data**: clicks, impressions, CTR, position
- **GSC query data**: top queries relevant to the article
- **GSC country data**: market-quality and geo-fit signals
- **GA4 landing page data**: sessions, engaged sessions, engagement rate, average engagement time
- **GA4 event data**: article reads, CTA clicks, path explores, quiz completes, email captures, result views/shares, app opens
- **Repository metadata**: route, title, pillar, keyword, publish date, direct-answer coverage, CTA target, related-link depth

This produces a normalized `pageRows` table of `ContentPerformanceRow` objects.

### 3. Scores ICP fit instead of just traffic

Each article gets an ICP score composed from four parts:

- **Intent fit**: based on keyword/title classification into high, medium, mixed, or low intent
- **Geo fit**: weighted share of clicks from priority countries
- **Behavior fit**: engagement inferred from article reads, CTA clicks, path exploration, and engagement rate
- **Qualification fit**: strongest downstream quality signals, especially quiz completion and email capture

This is the most important conceptual shift in the implementation: the system is not treating traffic as success by default. It is trying to rank content by how well it attracts and qualifies the right visitor.

### 4. Assigns a decision bucket per page

Every article is mapped into a strategic action bucket:

- `double-down`
- `improve-ctr-rank`
- `improve-conversion-path`
- `expand-cluster`
- `aeo-llm-repair`
- `deprioritize-or-contain`
- `monitor`

This makes the output immediately usable for editorial prioritization rather than requiring manual interpretation row by row.

### 5. Adds citeability / AEO / LLM-readiness analysis

The audit includes a `citeabilityAudit` section that explicitly surfaces:

- ArticleLayout coverage
- direct-answer coverage
- whether `llms-full.txt` includes full editorial bodies
- whether brand-facts authority framing needs improvement
- infrastructure-level priorities for AEO and LLM visibility

This is strategically valuable because it turns AEO readiness into a first-class reporting concern rather than an afterthought.

### 6. Produces an action-ready output structure

The payload includes:

- executive summary
- methodology notes and instrumentation caveats
- scorecards by pillar, route family, and decision bucket
- winners, ranking opportunities, conversion leaks, cluster expansion targets, deprioritized pages, AEO/LLM repairs
- top queries, countries, source/mediums, and referrers
- citeability audit
- action plan with refresh/build/internal-link/AEO/instrumentation recommendations

This is already shaped more like a content operating system than a simple analytics response.

---

## Implementation review

## Strengths

### Strategic joining logic is the right move

The implementation correctly recognizes that content decisions should not live in separate GSC and GA4 views. Joining visibility, behavior, and metadata into one article-level model is the right foundation for a serious editorial dashboard.

### Decision buckets are useful and legible

The bucket model makes the output reviewable by non-engineering stakeholders. Content, SEO, and product can all understand what `double-down`, `improve-conversion-path`, or `aeo-llm-repair` mean.

### Qualification signals are weighted above vanity metrics

Using quiz completion and email capture as stronger signals than page views is a strong product-thinking decision. It aligns the audit with actual business value instead of raw traffic.

### AEO / LLM concerns are built into the model

The code does not treat AEO as separate commentary. It integrates direct-answer presence, link depth, CTA completeness, `llms-full.txt`, and brand-facts gaps into the audit itself.

### Types are well-expanded

`src/lib/analytics/types.ts` cleanly models the new payload. The shape is explicit, reusable, and strong enough to support future dashboard rewiring.

### Route is simple and correct

`GET /api/analytics/content-audit` is thin, uses `force-dynamic`, disables caching, and returns predictable 500 handling. This is appropriate for an internal analytics endpoint.

### Route tests cover the contract

The route test validates:

- success response
- cache header
- payload shape expectations
- error handling when the service throws

That is sufficient coverage for the route boundary.

---

## Current limitations / caveats

### 1. Dashboard UI is not yet wired to this payload

The current `AnalyticsDashboard.tsx` still renders the older 28-day GSC + GA4 summary experience. It does not yet consume:

- portfolio scorecards
- decision buckets
- pageRows
- citeability audit
- action plan

So the data layer is ready, but the strategic value is still trapped behind the API until the UI is updated.

### 2. Top query matching is heuristic

Top queries are associated to articles by checking whether the query contains the first token of the primary keyword. That is usable as a first pass, but it can misattribute or under-attribute queries on broader topics.

### 3. Some ICP scoring is still inferred rather than explicit

Behavior fit and qualification fit are sensible, but they are still proxy-based. Without cleaner attribution between article CTA interactions and downstream quiz/email actions, the score remains strategic rather than precise.

### 4. Article coverage depends on `articles` mapping quality

The audit only sees what is represented in `src/data/articles.ts`. Any missing or stale mapping there will reduce audit completeness.

### 5. AEO flags are still relatively lightweight

Current flags cover:

- missing direct-answer metadata
- thin related links
- missing CTA target

This is a strong start, but future versions could inspect schema richness, answer placement, section clarity, outbound citations, and answer brevity consistency.

### 6. Infrastructure caveats are surfaced but not solved

The audit correctly calls out:

- `llms-full.txt` not exposing full editorial bodies
- brand-facts authority framing being too generic
- incomplete article-to-quiz attribution

These are valuable findings, but they still need separate implementation work.

---

## Recommended next steps

## Phase 1 definition: Audit validation + contract freeze

Phase 1 should be treated as a **shared foundation phase**, not as isolated review work.
Its purpose is to make the new content-audit layer trustworthy enough that later agents can build:

- the strategic dashboard UI
- editorial work queues
- instrumentation improvements
- AEO / citeability follow-up

without reopening the meaning of the payload on every downstream task.

### Phase 1 objective

**Validate, calibrate, and freeze a v1 contract for the content-audit layer so Phase 2 UI agents and Phase 3+ operations agents can work independently on top of stable assumptions.**

### Why this is the correct first phase

The repository already has the core backend layer:

- `src/lib/analytics/content-audit.ts`
- `src/lib/analytics/types.ts`
- `src/app/api/analytics/content-audit/route.ts`
- `src/app/api/analytics/content-audit/route.test.ts`

But the active dashboard still renders the older operational 28-day GSC + GA4 view in `src/app/analytics/AnalyticsDashboard.tsx`.

That means the highest-leverage next move is **not** immediately building UI. The highest-leverage move is to ensure the audit payload is reliable, interpretable, and contract-stable before multiple agents begin consuming it in parallel.

### Phase 1 done-when criteria

Phase 1 is complete only when all of the following are true:

1. `GET /api/analytics/content-audit` has been reviewed against live data quality.
2. Coverage against `src/data/articles.ts` has been checked and any mismatches are documented or fixed.
3. Decision buckets and ICP scores have been spot-checked across representative pages.
4. Threshold or heuristic changes have been made only where portfolio-level patterns justify them.
5. Query-to-article matching has either been safely improved or explicitly frozen as a known limitation.
6. A v1 payload contract is documented for dashboard/UI agents.
7. A structured handoff exists for Phase 2 dashboard work and Phase 3 editorial operations work.

### Phase 1 workstreams

#### Workstream A — Coverage and payload integrity

Purpose: verify that the layer is complete and internally consistent before downstream agents rely on it.

Tasks:

- verify every intended article in `src/data/articles.ts` appears in `pageRows`
- flag pages with zero GSC and zero GA4 data
- flag missing `primaryKeyword`, `footerCta`, `aeoAnswer`, or thin related-link depth
- confirm derived sections are consistent with `pageRows`
  - `winners`
  - `rankingOpportunities`
  - `conversionLeaks`
  - `clusterExpansion`
  - `deprioritized`
  - `aeoLlmRepairs`
- confirm portfolio scorecards aggregate correctly from underlying rows
- strengthen tests where output behavior is still implicit

Outputs:

- coverage report
- payload integrity checklist
- regression tests for bucketing / scorecards / action-plan derivation

#### Workstream B — Bucket and scoring calibration

Purpose: ensure Phase 3 work queues are based on strategically meaningful classifications.

Tasks:

- create a 10-15 page review set spanning all major decision buckets
- manually review representative pages against their assigned bucket
- evaluate whether current thresholds are over- or under-classifying pages
- adjust only if changes improve classification across the portfolio rather than rescuing one page at a time

Priority tuning points:

- strong-traffic threshold
- impression threshold for ranking opportunities
- position range for CTR/rank opportunities
- `relatedLinkDepth` threshold for cluster expansion
- scoring weights across intent, geo, behavior, and qualification

Outputs:

- calibration memo
- approved threshold adjustments
- updated implementation/tests if tuning is accepted

#### Workstream C — Query matching reliability

Purpose: reduce false confidence in `topQueries` before the dashboard surfaces them prominently.

Current limitation:

- queries are attached to articles using a first-token match against the primary keyword

Tasks:

- inspect false positives / false negatives across sample pages
- test whether a safer heuristic can be adopted without large complexity
- if safe, implement a v1 improvement
- if not safe, freeze as an explicit limitation and reflect that in dashboard wording

Outputs:

- query-matching review note
- heuristic improvement or documented limitation

#### Workstream D — Downstream contract and handoff

Purpose: make later phases parallelizable.

Tasks:

- mark which fields in `ContentAuditData` are safe for UI consumption now
- mark which fields are directional only and likely to improve after instrumentation work
- define the minimum Phase 2 strategic dashboard surface
- define the Phase 3 editorial queue schema
- extract deferred instrumentation tasks so they do not leak into Phase 1 scope

Outputs:

- dashboard contract note
- editorial queue schema
- deferred instrumentation backlog

### Phase 1 acceptance rules

Use these rules to keep the phase aligned with the rest of the roadmap:

- **No isolated tuning**: do not adjust logic to fix a single page if it worsens portfolio consistency.
- **No premature UI coupling**: Phase 1 may define the UI contract, but should not let UI needs distort the underlying analytics model.
- **No instrumentation scope creep**: log instrumentation gaps clearly, but defer implementation unless required to validate an already-exposed metric.
- **No hidden assumptions**: every field that downstream agents rely on should be marked as stable, directional, or caveated.

### Phase 1 recommended branch / merge structure for multiple agents

To work well with multiple agents, Phase 1 should run with one lead and multiple specialized branches.

#### Lead agent responsibilities

The lead agent owns:

- final scope lock
- shared issue taxonomy
- sample-page review set
- merge sequencing
- final contract freeze

The lead agent should work first and last, not do every implementation task.

#### Parallel agent lanes

**Agent A — Data contract / integrity**

- inspect `src/lib/analytics/content-audit.ts`
- inspect `src/lib/analytics/types.ts`
- expand tests in `src/app/api/analytics/content-audit/route.test.ts` and any new service tests
- produce coverage and consistency findings

**Agent B — Bucket / scoring calibration**

- review representative pages across decision buckets
- propose threshold updates with portfolio-wide reasoning
- coordinate with Agent A before changing type-level assumptions

**Agent C — Query heuristic / search relevance**

- review `topQueries` attachment quality
- propose or implement safe heuristic improvements
- document residual limitations for Phase 2 UI wording

**Agent D — Product handoff / dashboard-operating model**

- define which audit fields are safe to render in the strategic dashboard
- define priority tables and queue schema for editorial operations
- convert infra gaps into a deferred backlog for later phases

### Merge order

Recommended merge order:

1. lead agent creates the shared Phase 1 contract note and issue taxonomy
2. Agent A lands integrity findings and any required contract-safe fixes
3. Agent B lands threshold tuning after reviewing Agent A findings
4. Agent C lands query heuristic changes or limitation notes
5. Agent D lands the Phase 2 / Phase 3 handoff spec
6. lead agent performs final reconciliation and freezes Phase 1 outputs

This order reduces rework because downstream handoff should reflect the final validated payload, not a moving target.

### Phase 1 deliverables

By the end of Phase 1, the team should have:

- a validated content-audit payload
- a coverage report against `src/data/articles.ts`
- a calibration memo for scoring and decision buckets
- a query-matching reliability note
- stronger automated regression coverage
- a frozen v1 dashboard contract
- an editorial queue mapping for Phase 3
- a clearly deferred instrumentation backlog for Phase 4

## Phase 1: Review and validate the audit output

### Step 1. Hit the endpoint and inspect live payload quality

Review:

- whether all expected articles appear in `pageRows`
- whether decision buckets feel directionally correct
- whether top queries look plausibly attached to each article
- whether `biggestLeaks`, `growthBets`, and `actionPlan` read sensibly

### Step 2. Spot-check 10-15 important pages manually

Use representative pages across buckets:

- a likely winner
- a likely conversion leak
- a likely cluster expansion target
- a likely AEO repair target
- a likely deprioritized page

Confirm whether the assigned bucket matches editorial intuition.

### Step 3. Tune thresholds if needed

Likely tuning points:

- traffic threshold for “strong traffic”
- impression threshold for CTR/ranking opportunities
- related-link depth threshold
- scoring weights across intent, geo, behavior, and qualification

---

## Phase 2: Rewire the dashboard UI

### Step 4. Add a new content audit view to the analytics dashboard

Recommended UI blocks:

- **Executive summary cards**: winners, leaks, growth bets, AEO risks
- **Decision bucket summary**: counts and qualified conversions by bucket
- **Portfolio scorecards**: by pillar and route family
- **Priority tables**: winners, CTR opportunities, conversion leaks, AEO repairs
- **Citeability panel**: direct-answer coverage, `llms-full.txt` status, brand-facts status
- **Action plan panel**: refresh now, build next, internal-link fixes, infra fixes

### Step 5. Keep the existing dashboard, but separate operational vs strategic layers

Recommended structure:

- **Operational tab**: current GSC + GA4 performance view
- **Strategic tab**: content-audit layer

This avoids overloading one screen while preserving the usefulness of the current dashboard.

---

## Phase 3: Content operations follow-up

### Step 6. Turn each decision bucket into a work queue

Suggested owner mapping:

- `double-down` → content expansion / update / internal-link amplification
- `improve-ctr-rank` → title/meta/intro rewrite tests
- `improve-conversion-path` → CTA placement, bridge copy, quiz-path alignment
- `expand-cluster` → new spoke article planning
- `aeo-llm-repair` → direct-answer blocks, related links, citeability upgrades
- `deprioritize-or-contain` → do not invest heavily until strategic reason appears

### Step 7. Convert output into an editorial sprint board

For each shortlisted page, create fields for:

- bucket
- ICP score
- traffic snapshot
- qualification snapshot
- AEO flags
- proposed fix
- owner
- target date

---

## Phase 4: Instrumentation improvements

### Step 8. Improve article-to-quiz attribution

Add stronger event context to CTA and downstream quiz actions so the system can attribute qualification more confidently back to the originating article.

Recommended additions:

- source article route
- CTA slot/location
- template/archetype
- pillar
- entry path into quiz

### Step 9. Add template markers to analytics

Track whether a page is:

- ArticleLayout article
- hub page
- pSEO page
- comparison page
- conversion bridge page

This will make future portfolio analysis more insightful than route-family alone.

### Step 10. Extend downstream qualification events

Consider capturing:

- email verified vs submitted
- result detail viewed
- follow-up CTA clicked
- app/account progression

That would make qualification fit more robust.

---

## Phase 5: AEO / citeability infrastructure work

### Step 11. Upgrade `llms-full.txt`

Current audit finding: metadata and FAQs are exposed, but full editorial substance is not.

Recommended action:

- expose richer article body summaries or markdown exports
- ensure direct-answer blocks are included in machine-readable form
- prioritize high-value pages first

### Step 12. Upgrade brand authority framing

Current audit finding: `brand-facts` is present but still too generic about authority model and editorial method.

Recommended action:

- articulate editorial standards
- explain source-grounding and verification method
- clarify canonical authority model
- make this visible both for humans and machine-readable systems

### Step 13. Backfill direct-answer coverage on priority pages

Use the audit’s AEO repair list to prioritize pages missing strong answer blocks or sufficient related-link support.

---

## Potential action items

## Immediate actions

- Review the live `GET /api/analytics/content-audit` payload with 10-15 sample pages
- Validate whether bucket assignments are strategically correct
- Decide threshold adjustments before wiring the UI
- Create a dashboard spec for the new strategic audit view

## Near-term actions

- Rewire `src/app/analytics/AnalyticsDashboard.tsx` to support a content-audit tab or section
- Add tables/cards for winners, CTR opportunities, conversion leaks, and AEO repairs
- Turn audit output into a weekly editorial prioritization workflow
- Create a first sprint from `refreshNow`, `buildNext`, and `internalLinkFixes`

## Infrastructure actions

- Improve article-to-quiz attribution in analytics events
- Add page template/archetype markers to analytics payloads
- Upgrade `llms-full.txt` to include more editorial substance
- Strengthen `brand-facts` authority and editorial-method framing
- Backfill direct answers and related-link depth on priority pages

---

## Suggested review questions

Use these while reviewing the audit:

1. Do the decision buckets match real editorial intuition?
2. Are the ICP weights aligned with what “qualified traffic” should mean for Sadhaka?
3. Are quiz completions and email captures the right dominant qualification signals?
4. Which pages are being misclassified because attribution is still too weak?
5. Should AEO/LLM readiness stay in this same audit, or eventually become its own deeper layer?
6. What should appear on the first version of the dashboard UI versus later iterations?

---

## Bottom line

This is a strong and strategically meaningful addition to the analytics stack.

The core win is not just the new endpoint. The real win is the model: content is now being evaluated as a portfolio of acquisition, qualification, and citeability assets rather than a set of disconnected page metrics.

The next highest-leverage move is to make the audit visible and operable by wiring it into the dashboard UI and turning the decision buckets into an actual content workflow.