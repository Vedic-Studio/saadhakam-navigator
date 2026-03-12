# SEO / AEO / GEO Execution Roadmap

Last Updated: 2026-03-09  
Companion doc: `plans/seo-aeo-geo-status-scorecard.md`

> **Status: Deprecated (Control-Layer Migration)**
>
> This file is retained for historical context only. Active orchestration now lives in:
> - `plans/phasewise-search-growth-master-plan.md` (strategy + sequencing)
> - `plans/seo-aeo-geo-status-scorecard.md` (canonical status)
> - `plans/seo-recurring-operations-tracker.md` (cadence + execution log)
> - `plans/seo-growth-dashboard.md` (thin control panel)
>
> Do not use this file as the active execution source of truth.

---

## 1) Purpose

This roadmap converts the status audit into a practical execution plan.

It answers four questions:

1. **What should we build next?**  
2. **What should we validate in GSC / GA4 before building more?**  
3. **What should we postpone?**  
4. **What counts as “done” for SEO, AEO, GEO, pSEO, and indexing?**

The key principle is:

> **Do not scale page production faster than validation capacity.**

Sadhaka already has strong technical SEO and good GEO groundwork. The next stage should focus on **proof, prioritization, and selective expansion**.

---

## 2) Strategic recommendation in one sentence

For the next cycle, the right move is:

**validate the current SEO/pSEO base, close the AEO gap, and only then scale the templates that show evidence of indexing and traction.**

---

## 3) Workstreams

This roadmap is organized into 5 workstreams:

1. **Validation & measurement**
2. **AEO asset buildout**
3. **pSEO quality gating and selective scale**
4. **Content SEO expansion**
5. **Operations & automation**

---

## 4) Recommended sequence

## Phase 1 — Validate what already exists (highest priority)

### Goal
Turn implemented work into provable performance signals.

### Why this comes first
Right now, Sadhaka has more implementation than proof. Before building a lot more pages, we need to know:

- which templates are indexing
- which sections are earning impressions
- which content clusters are showing traction
- whether SEO traffic is reaching Faith Finder and email capture

### Tasks

#### 4.1 GSC validation pass
- export page-level data from Google Search Console for the last 28 and 90 days
- group URLs into these buckets:
  - pillar pages
  - article pages
  - concept pages (`what-is-*`, `*-meaning`)
  - Gita chapter pages
  - Gita shloka pages
  - Sanskrit word pages
  - comparison pages
  - practices/goal pages
- for each bucket, measure:
  - indexed count
  - impressions
  - clicks
  - CTR
  - avg position
  - excluded pages count

#### 4.2 Coverage / indexing audit
- compare sitemap URLs vs indexed URLs
- inspect at least 10 URLs per template type in GSC URL Inspection
- classify non-indexed URLs by likely cause:
  - thin / low-value
  - duplicate / near-duplicate
  - crawled but not indexed
  - discovered but not indexed
  - technical issue

#### 4.3 GA4 validation pass
- verify all implemented events in DebugView:
  - `faith_finder_quiz_start`
  - `faith_finder_quiz_complete`
  - `faith_finder_email_capture`
  - `faith_finder_result_view`
  - `faith_finder_result_share`
  - `seo_article_read`
  - `cta_click`
  - `app_open`
  - `path_explore`
- confirm events appear in standard reports
- define which ones are marked as conversions

#### 4.4 KPI baseline snapshot
- populate a recurring monthly snapshot with actual values for:
  - organic sessions
  - indexed pages
  - CTR
  - keywords in top 10
  - quiz starts from organic
  - email capture rate from organic

### Deliverables
- one spreadsheet or report with URL clusters + SEO metrics
- one GSC coverage summary
- one GA4 validation checklist
- one KPI baseline snapshot

### What counts as done for Phase 1
- every major URL template has a measurable indexed/impressions picture
- GA4 event instrumentation is validated
- the team can tell which sections are working and which are not

---

## Phase 2 — Close the AEO gap (next highest priority)

### Goal
Add the missing recommendation-layer assets that support AI answer engines.

### Why this comes second
Sadhaka already has GEO infrastructure (`llms.txt`, `llms-full.txt`, AI bot access, markdown endpoints), but **true AEO assets are mostly missing**.

### What to build next

#### 4.5 Brand facts layer
Build:
- `/brand-facts`
- `/.well-known/brand-facts.json`

Include:
- what Sadhaka is
- category / positioning
- primary use cases
- supported content areas
- trust signals
- ownership / publisher details
- product / service facts where relevant
- public support/contact references

#### 4.6 Answer hubs
Create 3–5 answer-hub pages around recommendation-style queries where Sadhaka has a right to win or be cited.

Candidate patterns:
- best spiritual path for beginners
- best meditation style for your personality
- how to choose between bhakti, jnana, karma, and raja yoga
- best way to start learning Vedanta
- how to find a spiritual practice that fits your temperament

Each hub should contain:
- TL;DR answer block
- structured comparison table
- ranked / guided options
- practical chooser framework
- FAQ section
- citations / references
- clear path into Faith Finder or a relevant pillar

#### 4.7 AEO testing protocol
Create a simple repeatable prompt-test matrix for:
- ChatGPT
- Perplexity
- Claude
- Gemini

Test prompts in 3 buckets:
- brand/entity questions
- recommendation questions
- comparison questions

Record:
- whether Sadhaka is cited
- whether descriptions are accurate
- which competitor/content source is currently winning

### Deliverables
- live `brand-facts` page
- live `brand-facts.json`
- 3–5 answer-hub pages
- prompt-test sheet with baseline results

### What counts as done for Phase 2
- Sadhaka has assets specifically designed for answer engines, not just search engines
- brand facts are machine-readable
- prompt testing becomes repeatable instead of anecdotal

---

## Phase 3 — Gate pSEO expansion with evidence

### Goal
Decide what to scale, what to improve, and what to slow down.

### Why this comes before more expansion
You already have working pSEO architecture. The mistake now would be to massively expand page counts before knowing which templates are healthy.

### Tasks

#### 4.8 Template quality review
Review each template type for:
- unique metadata quality
- content depth
- internal links
- query-intent fit
- duplication/thin risk

Template types to review:
- concept pages
- Sanskrit word pages
- comparison pages
- practice-goal pages
- Gita chapter pages
- Gita shloka pages

#### 4.9 Template decision matrix
For each template, assign one of:
- **Scale now**
- **Improve before scaling**
- **Pause / de-prioritize**

Suggested logic:
- **Scale now** if indexed rate is healthy and impressions are appearing
- **Improve** if pages exist but indexing is weak or content feels thin
- **Pause** if the template is large-volume but low-value and likely to create crawl/index bloat

#### 4.10 Strengthen weak templates first
Likely candidates for improvement before scale:
- Gita chapter pages
- some large template sets that may be too thin relative to intent

Upgrade areas:
- richer summaries
- more internal links
- visible related entities
- more comparison / FAQ blocks
- stronger user next steps

### Deliverables
- template-by-template scorecard
- scale/improve/pause decision table
- prioritized list of which pSEO families to expand next

### What counts as done for Phase 3
- pSEO growth decisions are based on indexation + search response, not ambition alone

---

## Phase 4 — Expand content SEO based on real demand

### Goal
Publish more only where we see signal or clear strategic fit.

### Recommended content priorities

#### 4.11 Expand strong editorial clusters
Continue building around the 4 pillar pages, but bias publishing toward:
- topics already showing impressions
- topics adjacent to pages ranking on page 2
- comparison / chooser content with strong intent

#### 4.12 Refresh before replace
Before publishing too many new pieces, refresh pages that are:
- position 11–30
- CTR under 2%
- getting impressions but weak clicks

Typical refresh actions:
- rewrite titles and meta descriptions
- add tighter intros
- strengthen FAQ blocks
- improve internal links
- clarify intent match

#### 4.13 Connect SEO to product entry points
Prioritize content that can naturally route into:
- Faith Finder
- article-to-quiz journeys
- guided chooser pages
- app-open or CTA flows

### Deliverables
- refreshed priority pages list
- next 8–12 content targets ranked by expected impact
- internal-linking checklist for each publish

### What counts as done for Phase 4
- new publishing is guided by live SEO signal and conversion pathways

---

## Phase 5 — Operationalize recurring SEO work

### Goal
Make the tracker real as an operating system, not just a plan.

### Tasks

#### 4.14 Manual operating rhythm first
Keep a lightweight manual rhythm until reporting is stable:
- weekly publishing + index submission
- weekly top-page review
- monthly GSC/GA4 snapshot
- monthly AEO prompt test

#### 4.15 Then automate
Once the manual loop is stable, implement:
- recurring job registry
- run history
- validation payload storage
- observability endpoints
- failed-run alerts

### Deliverables
- repeatable monthly SEO review ritual
- stable tracker updates
- eventual job automation roadmap

### What counts as done for Phase 5
- SEO operations are measurable and repeatable even when no one remembers them manually

---

## 5) What to build next vs what to validate next

## Build next

### Highest-priority build tasks
1. `/brand-facts`
2. `/.well-known/brand-facts.json`
3. 3–5 answer-hub pages
4. improvements to weak pSEO templates after review
5. reporting artifact / KPI snapshot doc or dashboard layer

## Validate next

### Highest-priority validation tasks
1. GSC indexed vs submitted by template type
2. page-level impressions/clicks/CTR by cluster
3. GA4 DebugView and conversion validation
4. publish → index → first impression timing
5. AI prompt-testing baseline

---

## 6) What to postpone

The following should be deferred until validation catches up:

### Postpone for now
- massive pSEO volume expansion across every planned family
- large new template launches without first measuring current template health
- heavy automation work before KPI/reporting discipline exists
- broad AEO expansion before the first 3–5 answer hubs are tested
- aggressive new publishing beyond what can be indexed, tracked, and refreshed properly

### Why postpone
Because scaling too early creates:
- crawl/index bloat
- thin-page risk
- more ambiguous reporting
- more maintenance load
- harder attribution of what actually works

---

## 7) Decision rules

Use these rules for the next cycle.

### Rule 1 — Don’t scale a template family until it shows life
A template family should not be aggressively expanded until:
- sample URLs are indexed
- sample URLs receive impressions
- the content is clearly unique enough

### Rule 2 — Refresh page-2 winners before publishing too much net-new content
If a page is already near ranking, improving it is often higher leverage than publishing another untouched article.

### Rule 3 — Build AEO assets where product/brand clarity matters most
Prioritize brand facts and chooser pages before speculative answer-engine experiments.

### Rule 4 — Tie SEO work to downstream product value
Whenever possible, prefer topics that can route users toward:
- Faith Finder
- deeper cluster exploration
- email capture
- app usage

---

## 8) Definitions of done by initiative

## SEO is done when
- technical SEO is live
- content is internally linked
- pages are indexed
- pages earn impressions and clicks
- rankings or CTR improve after optimization

## GEO is done when
- AI crawlers can access the site
- LLM context files are live
- machine-readable content endpoints exist
- AI systems can retrieve accurate summaries of key entities

## AEO is done when
- brand-facts assets exist
- answer-hub pages exist
- prompt tests show improved answer quality/citation behavior
- referral or citation evidence improves over time

## pSEO is done when
- templates generate correctly
- indexation is healthy by template family
- thin/duplicate risk is controlled
- long-tail impressions are distributed across many URLs

## Indexing operations are done when
- all newly published pages are submitted fast
- provider responses are logged
- indexing latency is measurable and improving

## Measurement is done when
- GSC and GA4 baselines are recorded
- landing pages are grouped meaningfully
- SEO impact can be tied to quiz starts, email capture, and engagement

---

## 9) 30 / 60 / 90 day plan

## Next 30 days
- validate GSC coverage and page-cluster performance
- validate GA4 events and conversions
- establish KPI baseline
- build `brand-facts` page and JSON
- define answer-hub targets

## Next 60 days
- publish first answer hubs
- refresh page-2 / low-CTR opportunities
- upgrade weak pSEO templates
- run first formal AI prompt-testing cycle

## Next 90 days
- scale only the templates and clusters showing positive signals
- begin lightweight observability for recurring SEO work
- decide whether to automate recurring runs and validation payloads

---

## 10) Suggested ownership split

### Technical / engineering
- `brand-facts.json`
- answer-hub page templates
- reporting helpers
- automation / scheduler work

### SEO / content
- GSC analysis
- CTR refreshes
- topic prioritization
- internal linking reviews
- prompt-test documentation

### Growth / analytics
- GA4 validation
- conversion setup
- monthly KPI snapshot
- organic-to-Faith-Finder funnel review

---

## 11) Immediate action list

If we wanted the simplest next move, it would be:

1. **Export GSC data by page type**  
2. **Validate GA4 events and conversions**  
3. **Build `brand-facts` + `brand-facts.json`**  
4. **Choose 3 answer-hub pages**  
5. **Review pSEO templates and mark each one: scale / improve / pause**

That is the highest-leverage version of “option 2.”
