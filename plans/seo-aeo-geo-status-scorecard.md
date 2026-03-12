# SEO, AEO, GEO Status Scorecard

Last Updated: 2026-03-09 (Reviewed: 2026-03-09)  
Owner: Sadhaka Search Growth Team
Review Cadence: Monthly (with weekly evidence checks)
Next Review Due: 2026-03-19
Canonical Role: Canonical evidence-based status register for SEO, GEO, AEO, indexing, and measurement.
Primary Inputs: GSC, GA4, priority watchlist, recurring tracker logs, prompt testing matrix.
Primary Outputs: Initiative status changes, priority decisions, and validation/success readouts.
Site: `opensadhaka.com`  
Scope: SEO foundations, pSEO, AEO/GEO, indexing operations, analytics, and validation.

> **Companion Documents:**
> - `plans/phasewise-search-growth-master-plan.md` — Strategic sequencing and stop/go gates
> - `plans/seo-aeo-geo-execution-roadmap.md` — Execution plan and priorities
> - `plans/google-search-baseline-review-2026-03-09.md` — GSC/GA4 baseline data
> - `plans/pseo-template-decision-matrix.md` — Template-by-template decisions
> - `plans/aeo-prompt-testing-matrix.md` — AI prompt testing protocol
> - `plans/seo-recurring-operations-tracker.md` — Recurring operations cadence
> - `plans/update-seo-scorecard.md` — Step-by-step scorecard maintenance workflow
> - `plans/seo-growth-dashboard.md` — Thin executive summary and freshness panel

---

## 1) Why this document exists

Sadhaka now has multiple search-related initiatives running at once. They are related, but they are **not the same thing**:

- **SEO** = ranking in classic search engines like Google and Bing.
- **pSEO** = scaling search coverage using templates, entities, and long-tail pages.
- **GEO / LLM discoverability** = making the site understandable and retrievable by AI systems.
- **AEO** = shaping how AI assistants answer recommendation-style or brand/entity questions.
- **Indexing operations** = getting new and updated URLs discovered quickly.
- **Measurement** = proving that all of the above is actually producing traffic, rankings, and conversions.

This scorecard separates those initiatives into:

1. **Goal** — what we are trying to achieve  
2. **Implementation status** — what is built in the repo  
3. **Validation status** — what we can prove is functioning  
4. **Success status** — what we can prove is generating outcomes

---

## 2) How to think about “done”

Use this 3-level model for every initiative:

### Level 1 — Implemented
The feature exists in code/content and is configured correctly.

Examples:
- `llms.txt` resolves
- a page emits canonical + metadata + schema
- sitemap contains the page
- IndexNow submission endpoint works

### Level 2 — Validated
We have evidence that external systems received and processed it.

Examples:
- URL is indexed in Google Search Console
- GA4 events fire in DebugView
- IndexNow providers return success
- sitemap URLs show impressions in GSC

### Level 3 — Successful
We can see measurable business/search outcomes.

Examples:
- impressions and clicks increase
- rankings improve
- indexed pages increase
- AI assistants cite the site more often
- organic landing pages drive Faith Finder starts and email captures

---

## 3) Executive status summary

| Initiative | Goal | Implementation | Validation | Success Proof | Current Read |
|---|---|---:|---:|---:|---|
| Technical SEO foundation | Crawlability, indexability, metadata, canonicals, schema | High | Medium | Low-Medium | Strong foundation, limited external proof captured |
| Content SEO / topical authority | Build pillar + spoke content clusters | Medium | Low-Medium | Low | Good early rollout, still early-stage performance proof |
| Programmatic SEO (pSEO) | Scale long-tail/entity coverage | Medium | Low | Low | Real implementation exists, but far from full target scale |
| GEO / LLM discoverability | Help AI systems crawl and understand the site | High | Medium | Low | Good infra in place, limited citation proof |
| AEO recommendation layer | Influence AI answer/recommendation outputs | High | Low | Low | Brand facts + answer hubs live, needs prompt testing |
| Indexing operations | Fast discovery of new/updated pages | High | Medium | Low-Medium | Strong infra, depends on consistent use |
| Analytics + SEO measurement | Prove traffic, ranking, and conversion impact | Medium | Low-Medium | Low | Instrumentation exists; reporting layer is thin |
| Recurring SEO automation | Run and validate SEO work reliably | Low-Medium | Low | Low | Tracker and plan exist, automation not fully implemented |

---

## 3.1) Google Search Baseline Data (2026-03-09)

> Source: `plans/google-search-baseline-review-2026-03-09.md`

### Search Console — Last 28 Days

| Metric | Value |
|---|---:|
| Total Impressions | 29 |
| Total Clicks | 1 |
| CTR | 3.45% |
| Average Position | 13.45 |
| Page Types with Visibility | Homepage only |

### Page-Type Visibility Breakdown

| Page Type | Impressions | Clicks | CTR | Avg Position |
|---|---:|---:|---:|---:|
| Homepage | 29 | 1 | 3.45% | 13.45 |
| Editorial articles | 0 | 0 | — | — |
| Answer hubs | 0 | 0 | — | — |
| Brand facts | 0 | 0 | — | — |
| Concept pages | 0 | 0 | — | — |
| Sanskrit word pages | 0 | 0 | — | — |
| Gita chapter pages | 0 | 0 | — | — |
| Gita shloka pages | 0 | 0 | — | — |
| Comparison pages | 0 | 0 | — | — |
| Practice-goal pages | 0 | 0 | — | — |

### GA4 Baseline — Last 28 Days

| Metric | Value |
|---|---:|
| Organic landing page sessions | 0 rows returned |
| Tracked custom events | 0 rows returned |

### Tracked Events Queried

- `faith_finder_quiz_start`
- `faith_finder_quiz_complete`
- `faith_finder_email_capture`
- `faith_finder_result_view`
- `faith_finder_result_share`
- `seo_article_read`
- `cta_click`
- `app_open`
- `path_explore`

### Baseline Interpretation

| Initiative | Current Signal |
|---|---|
| Technical SEO | Implemented, but still awaiting broader search response |
| Content SEO | Little to no confirmed search visibility yet |
| pSEO | No evidence of traction yet in GSC baseline |
| AEO answer hubs | Built, but too early for measurable search/AI response |
| Brand facts | Built, but not yet visible in baseline |
| Faith Finder analytics | Instrumented in code, not yet visible in GA4 baseline |
| Measurement system | Working technically, but current dataset is sparse |

### Key Insight

> **Search visibility is currently concentrated on the homepage, while deeper SEO/AEO assets and tracked funnel events have not yet produced measurable baseline volume.**

This means the site is still in the **foundation / early discovery phase**, not in the optimization-at-scale phase. The priority is:
1. Indexing and discovery validation
2. Event validation in production
3. Proof that non-homepage pages are starting to earn impressions

---

## 4) Initiative-by-initiative analysis

## 4.1 Technical SEO foundation

### Goal
Ensure search engines can crawl, understand, canonicalize, and index the site correctly.

### Evidence found in the repo
- `src/app/robots.ts`
  - allows standard crawlers
  - includes AI/LLM crawlers
  - references `sitemap.xml`, `llms.txt`, and `llms-full.txt`
- `src/app/sitemap.ts`
  - generates multiple sitemap groups (`core`, `philosophies`, `traditions`, `texts`, `greats`, `concepts`, `comparisons`, `topics`, `practices`, `shlokas`, `sanskrit`, `articles`)
- `src/app/layout.tsx`
  - sitewide metadata base
  - default title/description
  - robots directives
  - canonical base
  - Open Graph / Twitter metadata
  - Google Search Console verification support
  - Organization + WebSite JSON-LD
- many route files use `metadata` or `generateMetadata` and define canonicals
- breadcrumb schema is implemented through `src/components/Breadcrumbs.tsx` and several page-level schemas

### What is complete
- Robots present
- Sitemap present and fairly comprehensive
- Canonicals widely present
- Sitewide metadata present
- Core JSON-LD present
- Many key pages have page-specific metadata

### What is partial
- Not every page pattern has equally rich schema coverage
- Some pages are stronger than others in terms of metadata depth
- Core Web Vitals monitoring is not yet visible as an operational system in the repo
- No embedded evidence yet that indexed page counts match expected sitemap counts

### Current status
- **Implementation:** High
- **Validation:** Medium
- **Success proof:** Low-Medium

### Completion checklist
- [x] `robots.txt` equivalent exists
- [x] `sitemap.xml` equivalent exists
- [x] canonical logic exists
- [x] default metadata exists
- [x] page-level metadata exists on key pages
- [x] Organization / WebSite schema exists
- [ ] sitemap coverage is reconciled against indexed coverage
- [ ] Core Web Vitals monitoring is operationalized

### How to validate completion
- Open and verify:
  - `/robots.txt`
  - `/sitemap.xml`
  - split sitemap URLs
- Confirm a sample of URLs contain:
  - `<title>`
  - meta description
  - canonical
  - OG/Twitter metadata
  - expected JSON-LD
- In GSC:
  - compare submitted vs indexed counts
  - inspect 10 sample URLs from each major template

### How to validate success
- Indexed pages trend up
- Coverage exclusions stay controlled
- Search impressions begin appearing across all major sections
- CTR improves on refreshed pages

### KPIs
- indexed pages
- impressions by sitemap group
- clicks by page type
- CTR by page
- average position by page cluster

---

## 4.2 Content SEO / topical authority

### Goal
Build authority around the 4 editorial pillars and capture informational search demand.

### Planned pillars
1. Ancient Wisdom & Philosophies  
2. Practical Spiritual Practices  
3. Sacred Texts & Teachings  
4. Spiritual Traditions & Paths

### Evidence found in the repo
- `plans/seo-content-strategy-sadhaka.md` defines the 4-pillar strategy
- pillar pages exist, including:
  - `/ancient-wisdom-philosophies`
  - `/practical-spiritual-practices`
  - `/sacred-texts-teachings`
  - `/spiritual-traditions-paths`
- article registry exists in `src/data/articles.ts`
- article pages exist for early priority topics such as:
  - `what-is-vedanta`
  - `advaita-vedanta-explained`
  - `bhagavad-gita-chapter-1`
  - `daily-spiritual-routine-beginners`
  - `how-to-choose-a-mantra`
  - `how-to-start-japa`
  - `10-powerful-sanskrit-mantras`
  - `adi-shankaracharya-life-teachings`
  - `non-duality-vs-dualism`
  - `shaivism-vs-vaishnavism`
- `src/components/ArticleLayout.tsx`
  - emits `Article` schema
  - emits `FAQPage` schema
  - adds breadcrumbs
  - includes related links
  - routes readers toward Faith Finder
- `plans/seo-recurring-operations-tracker.md` shows that pillar pages and several quick-win articles were already refreshed

### What is complete
- Pillar strategy is translated into live pages
- Quick-win article rollout has started
- Articles use reusable metadata + schema structure
- Internal linking between hub/spoke/support pages exists

### What is partial
- The full quick-win + spoke expansion plan is not complete yet
- No strong evidence yet of refresh decisions driven by GSC data
- No visible reporting layer for ranking movement by pillar

### Current status
- **Implementation:** Medium
- **Validation:** Low-Medium
- **Success proof:** Low

### Completion checklist
- [x] 4 pillar pages exist
- [x] initial quick-win article batch exists
- [x] reusable article metadata structure exists
- [x] FAQ and Article schema implemented on article templates
- [x] internal linking exists
- [ ] full quick-win backlog published
- [ ] spoke expansion per pillar completed
- [ ] refresh workflow tied to GSC evidence

### How to validate completion
- Count published pages vs planned backlog
- Verify each new article has:
  - target keyword
  - unique metadata
  - related internal links
  - FAQ schema
  - placement in sitemap
- Check that new pages are linked from at least 3 relevant existing pages

### How to validate success
- Pages gain impressions within 1–3 weeks
- Target terms enter GSC query reports
- Pages with position 11–30 can be refreshed into higher visibility
- Pillar pages begin earning branded + non-branded entrances

### KPIs
- organic sessions by pillar
- clicks by article
- CTR by article
- average position by article
- organic-to-Faith-Finder conversion rate by landing page

---

## 4.3 Programmatic SEO (pSEO)

### Goal
Scale long-tail coverage with repeatable templates and entity pages.

### Evidence found in the repo
- `src/app/[slug]/page.tsx`
  - generates `what-is-*` and `*-meaning` concept pages
- `src/app/texts/bhagavad-gita/chapter-[chapter]/page.tsx`
  - chapter pages exist
- `src/app/texts/bhagavad-gita/chapter-[chapter]/shloka-[shloka]/page.tsx`
  - shloka pages exist
- `src/app/practices/[practice]/for/[goal]/page.tsx`
  - combinatorial practice-goal pages exist
- `src/app/learn/sanskrit/[word]/page.tsx`
  - Sanskrit word pages exist
- `src/app/compare/[slug]/page.tsx`
  - comparison pages exist
- `src/app/sitemap.ts`
  - includes these page types in sitemap generation

### What is complete
- Core pSEO route architecture exists
- Sitemap includes pSEO page groups
- Metadata exists on major dynamic templates
- Some templates include FAQ schema and breadcrumb schema

### What is partial
- Full scale envisioned in the master pSEO guide is not yet reached
- Not all templates appear equally rich in depth/uniqueness
- Chapter pages are lighter than the aspirational content spec
- No automated internal-link injection system visible
- No indexed-vs-generated audit visible yet

### Current status
- **Implementation:** Medium
- **Validation:** Low
- **Success proof:** Low

### Completion checklist
- [x] concept templates exist
- [x] chapter templates exist
- [x] shloka templates exist
- [x] practice-goal templates exist
- [x] Sanskrit learning templates exist
- [x] comparison templates exist
- [x] pSEO URLs appear in sitemap
- [x] template-by-template thin-content risk reviewed (see `plans/pseo-template-decision-matrix.md`)
- [ ] indexed coverage verified by template type
- [ ] cannibalization review performed
- [ ] full backlog scale reached

### Template Decision Matrix (from `plans/pseo-template-decision-matrix.md`)

| Template | Decision | Content Depth | Schema | Action Required |
|---|---|---|---|---|
| Concept Pages (`what-is-*`) | **SCALE NOW** ✅ | 9/10 | FAQPage, Article, BreadcrumbList | Expand to 50+ concepts |
| Sanskrit Lexicon | **SCALE NOW** ✅ | 9/10 | FAQPage, DefinedTerm | Expand to match concepts |
| BG Shloka Pages | **SCALE NOW** ✅ | 9/10 | FAQPage | Verify seeding, fix placeholder |
| Comparison Pages | **IMPROVE** ⚠️ | 7/10 | FAQPage (generic) | Fix thin content, add unique FAQs |
| BG Chapter Pages | **IMPROVE** ⚠️ | 6/10 | None | Add FAQ schema, expand summaries |
| Practice-Goal Pages | **IMPROVE** ⚠️ | 5/10 | None | Develop unique content model |

### Current pSEO Scale

| Template | URLs Generated | Status |
|---|---:|---|
| Concept Pages | 22 | Ready to scale |
| Sanskrit Lexicon | Matches concepts | Ready to scale |
| BG Chapters | 18 | Needs improvement |
| BG Shlokas | Depends on seeding | Ready to scale |
| Comparisons | Multiple | Needs content audit |
| Practice-Goal | 11 | Needs content model |

### How to validate completion
- Count generated URLs per template type
- Confirm static params cover intended entities
- Check that metadata varies meaningfully per URL
- Review a sample of 10 pages per template for uniqueness and depth

### How to validate success
- More pSEO URLs become indexed over time
- Long-tail queries appear in GSC
- Impressions distribute across many pSEO URLs
- Low rates of “Crawled - currently not indexed”, “Duplicate”, and “Soft 404”

### KPIs
- total pSEO URLs generated
- indexed pSEO URLs
- % of pSEO URLs with impressions
- % of pSEO URLs with clicks
- exclusions by template type

---

## 4.4 GEO / LLM discoverability

### Goal
Make Sadhaka easy for LLM crawlers and AI systems to discover, parse, and retrieve.

### Evidence found in the repo
- `src/app/llms.txt/route.ts`
  - LLM-facing overview document exists
- `src/app/llms-full.txt/route.ts`
  - fuller LLM context map exists
- `src/app/api/llm-content/route.ts`
  - markdown endpoint exists for entities and content types
- `src/app/robots.ts`
  - explicitly allows GPTBot, ClaudeBot, PerplexityBot, Anthropic, Cohere, etc.
- many content pages use FAQ schema, Article schema, CollectionPage schema, and BreadcrumbList schema

### What is complete
- LLM discovery files exist
- AI crawler permissions exist
- LLM-oriented markdown representations exist
- core entity/content architecture is reasonably machine-readable

### What is partial
- No proof yet of citation or retrieval performance
- No external directory submission evidence yet
- No standardized AI prompt-testing workflow documented in the repo

### Current status
- **Implementation:** High
- **Validation:** Medium
- **Success proof:** Low

### Completion checklist
- [x] `llms.txt` exists
- [x] `llms-full.txt` exists
- [x] robots allow major AI bots
- [x] LLM markdown endpoint exists
- [x] many entity pages have structured data
- [ ] prompt-testing runbook exists
- [ ] AI referral tracking baseline exists

### How to validate completion
- Open:
  - `/llms.txt`
  - `/llms-full.txt`
  - `/api/llm-content?type=...&slug=...`
- verify AI bots are allowed in `/robots.txt`
- inspect several entity pages for clean headings + structured schema

### How to validate success
- AI assistants increasingly cite or summarize Sadhaka correctly
- AI-generated brand/entity descriptions are more accurate
- referral traffic appears from AI surfaces where measurable

### KPIs
- AI referral traffic
- manual citation rate for target prompts
- accuracy of AI responses to brand/entity questions

---

## 4.5 AEO / answer-engine recommendation layer

### Goal
Be chosen or cited by AI assistants when users ask recommendation-style or brand/entity questions.

### Planned workflow requirements
The workflow in `.agents/workflows/answer-engine-optimization.md` calls for:
- Answer Intent Map
- answer hub pages
- `/brand-facts`
- `/.well-known/brand-facts.json`
- specific schema for recommendation-oriented assets
- external citations / third-party mentions

### Evidence found in the repo
All core AEO assets are now implemented.

### What is complete
- `/brand-facts` page with Organization, AboutPage, and FAQPage schemas
- `/.well-known/brand-facts.json` machine-readable brand facts
- `/best-spiritual-path-for-beginners` answer hub with ItemList + FAQPage schemas
- `/choose-between-bhakti-jnana-karma-raja-yoga` answer hub with chooser framework
- `/best-meditation-style-for-your-personality` answer hub with chooser framework
- AEO prompt testing matrix defined (`plans/aeo-prompt-testing-matrix.md`)
- FAQ and collection schemas support answerability
- External authoritative references linked from answer hubs

### What is partial
- No formal third-party citation campaign yet
- Prompt testing needs to be run and results recorded

### Current status
- **Implementation:** High
- **Validation:** Low
- **Success proof:** Low

### Completion checklist
- [x] answer intent map created (via prompt testing matrix)
- [x] answer hub pages published (3 hubs live)
- [x] `/brand-facts` page published
- [x] `/.well-known/brand-facts.json` published
- [x] recommendation-specific schema added (ItemList, FAQPage)
- [ ] third-party citation campaign underway
- [ ] prompt testing executed with baseline results

### How to validate completion
- confirm files/pages exist
- validate JSON format for `brand-facts.json`
- check hub pages use the intended recommendation structure

### How to validate success
- run repeatable prompts in ChatGPT, Perplexity, Claude, Gemini
- compare whether Sadhaka is cited before vs after rollout
- track AI referrals and brand mention accuracy

### KPIs
- AI citation frequency
- AI answer accuracy for brand facts
- recommendation prompt win rate
- AI referral sessions

---

## 4.6 Indexing operations

### Goal
Accelerate discovery and submission of new or refreshed URLs.

### Evidence found in the repo
- `next.config.ts`
  - rewrites `/<INDEXNOW_KEY>.txt` to `/api/indexnow`
- `src/app/api/indexnow/route.ts`
  - serves the key content when configured
- `src/app/api/indexnow/submit/route.ts`
  - submits URLs to Bing + Yandex
  - supports single/batch URLs
  - returns Search Console inspection deep links
  - supports optional auth token
- tracker includes publishing runbook and IndexNow runbook

### What is complete
- key verification route exists
- URL submission endpoint exists
- provider responses are handled
- Search Console deep-link workflow exists

### What is partial
- Google indexing still depends on manual action
- no persistent automated run-history system yet in code
- proof of improved indexing speed has not been captured yet

### Current status
- **Implementation:** High
- **Validation:** Medium
- **Success proof:** Low-Medium

### Completion checklist
- [x] key serving route exists
- [x] submission endpoint exists
- [x] Bing/Yandex providers configured
- [x] Search Console inspection links generated
- [x] tracker runbook exists
- [ ] run logs persist automatically
- [ ] publish-to-first-impression timing is measured

### How to validate completion
- confirm `https://opensadhaka.com/<INDEXNOW_KEY>.txt` resolves publicly
- test POST submissions to `/api/indexnow/submit`
- confirm returned provider statuses are successful
- confirm target URL is in sitemap immediately after publish

### How to validate success
- newly published pages are indexed faster
- first impressions appear sooner after publish
- fewer pages remain undiscovered for long periods

### KPIs
- publish → sitemap latency
- publish → submission latency
- publish → first impression latency
- publish → indexed latency

---

## 4.7 Analytics + SEO measurement

### Goal
Measure whether SEO traffic is translating into product engagement and conversions.

### Evidence found in the repo
- `src/app/layout.tsx`
  - GA4 script installed
  - event bridge installed
- Faith Finder events implemented:
  - `faith_finder_quiz_start`
  - `faith_finder_quiz_complete`
  - `faith_finder_email_capture`
  - `faith_finder_result_view`
  - `faith_finder_result_share`
- additional events implemented:
  - `seo_article_read`
  - `cta_click`
  - `app_open`
  - `path_explore`
- tracker defines KPI categories for organic sessions, indexed pages, CTR, top-10 keywords, quiz starts, and email capture rate

### What is complete
- instrumentation exists
- key funnel events exist
- KPI categories are defined

### What is partial
- no reporting artifact in repo with populated KPI values
- no visible dashboard definition layer
- no evidence yet of SEO cohort reporting (organic landing page → conversion)

### Current status
- **Implementation:** Medium
- **Validation:** Low-Medium
- **Success proof:** Low

### Completion checklist
- [x] GA4 installed
- [x] Faith Finder funnel events implemented
- [x] additional engagement events implemented
- [x] KPI categories defined in tracker
- [ ] GA4 DebugView validation completed
- [ ] conversions configured and reviewed
- [ ] SEO landing-page reporting operationalized

### How to validate completion
- test all events in GA4 DebugView
- confirm key events are registered in GA4
- confirm attribution from organic landing pages is visible

### How to validate success
- SEO landings drive quiz starts
- quiz starts lead to email capture
- higher-performing pages correlate with stronger engagement and CTA performance

### KPIs
- organic sessions
- engaged sessions from organic
- quiz start rate from organic
- result-view rate from organic
- email capture rate from organic
- CTA click rate from SEO landings

---

## 4.8 Recurring SEO operations and automation

### Goal
Run publishing, hygiene, AEO review, and refresh work on a repeatable system instead of ad hoc effort.

### Evidence found in the repo
- `plans/seo-recurring-operations-tracker.md` defines:
  - weekly cadence
  - monthly cadence
  - quarterly cadence
  - publish runbook
  - IndexNow runbook
  - KPI snapshot
  - execution log
  - validation payload contract
  - future scheduler/job architecture

### What is complete
- excellent operational planning
- clear definition of “done” for recurring jobs

### What is partial
- scheduler/job registry/run history APIs appear planned, not fully implemented
- execution tracking is still mostly human-driven

### Current status
- **Implementation:** Low-Medium
- **Validation:** Low
- **Success proof:** Low

### Completion checklist
- [x] tracker exists
- [x] cadence defined
- [x] validation contract defined
- [ ] job registry implemented
- [ ] scheduler implemented
- [ ] recurring flow runner implemented
- [ ] API observability for jobs implemented

### How to validate completion
- ensure runs create machine-readable logs
- ensure every run captures artifacts + checks + errors

### How to validate success
- recurring jobs reliably complete
- SEO work does not depend on memory/manual follow-through
- failures are visible quickly and recoverable

### KPIs
- scheduled runs completed
- failed vs partial-success runs
- average validation pass rate
- time from content creation to submission

---

## 5) Current priorities by impact

## Priority 1 — Move from implementation to proof
Most important next step is not building more pages blindly. It is proving what is already working.

### Do now
- reconcile sitemap URLs vs indexed URLs in GSC
- review impressions/clicks/CTR by page cluster
- validate GA4 events in DebugView and standard reports
- track publish → index → first-impression timing

---

## Priority 2 — Close the AEO gap ✅ COMPLETE
GEO infrastructure is ahead of AEO implementation.

### Completed
- [x] created `/brand-facts` page with comprehensive schemas
- [x] created `/.well-known/brand-facts.json` machine-readable file
- [x] created 3 answer hub pages for high-intent question patterns:
  - `/best-spiritual-path-for-beginners`
  - `/choose-between-bhakti-jnana-karma-raja-yoga`
  - `/best-meditation-style-for-your-personality`
- [x] defined repeatable prompt tests for AI assistants (`plans/aeo-prompt-testing-matrix.md`)

### Remaining
- [ ] Run prompt tests and record baseline results
- [ ] Third-party citation strategy

---

## Priority 3 — Expand pSEO only after template validation 🔄 IN PROGRESS
Do not scale page counts aggressively until current templates prove they index and earn impressions.

### Completed
- [x] audited thin-content risk by template type (see `plans/pseo-template-decision-matrix.md`)
- [x] assigned scale/improve/pause decisions per template
- [x] defined expansion sequence

### Decisions Summary
| Template | Decision |
|---|---|
| Concept Pages | **SCALE NOW** ✅ |
| Sanskrit Lexicon | **SCALE NOW** ✅ |
| BG Shloka Pages | **SCALE NOW** ✅ |
| Comparison Pages | **IMPROVE** ⚠️ |
| BG Chapter Pages | **IMPROVE** ⚠️ |
| Practice-Goal Pages | **IMPROVE** ⚠️ |

### Do next
- confirm indexing rate of existing pSEO pages (GSC data needed)
- expand SCALE NOW templates (concepts, lexicon, shlokas)
- improve weak templates before scaling

---

## Priority 4 — Turn the tracker into an evidence system
The tracker already defines the right operating model. The next step is to make it queryable and reliable.

### Do later
- implement recurring job registry
- log run artifacts and validation payloads
- expose run history via API or dashboard

---

## 6) Definition of done by initiative

## SEO is “done” when
- technical foundation is live
- content is published and internally linked
- pages are indexed
- pages earn impressions/clicks
- rankings move or CTR improves

## pSEO is “done” when
- templates exist
- URLs generate correctly
- pages are indexed at healthy rates
- pages earn distributed long-tail impressions
- low-value/thin pages are controlled

## GEO is “done” when
- AI bots can crawl key assets
- LLM context files are live
- machine-readable content endpoints exist
- AI systems consistently retrieve accurate information

## AEO is “done” when
- recommendation-oriented assets exist
- brand-facts assets exist
- prompt tests show improved citation/recommendation behavior
- AI referrals and mention quality improve

## Indexing ops is “done” when
- all new pages are submitted quickly
- submission success is tracked
- indexing latency is measurable and improving

## Measurement is “done” when
- GSC + GA4 baselines exist
- page groups can be compared over time
- SEO can be tied to quiz starts, email capture, or app engagement

---

## 7) Practical next-step checklist

### Immediate
- [ ] export GSC page-level data by page cluster
- [ ] validate all Faith Finder and SEO engagement events in GA4
- [ ] create a monthly KPI snapshot with real numbers
- [ ] identify which page types are indexed vs excluded

### Near-term
- [x] build `brand-facts` page
- [x] build `/.well-known/brand-facts.json`
- [x] define 3–5 answer-hub targets (3 hubs live)
- [ ] run manual AI prompt tests and record results
- [ ] expand SCALE NOW pSEO templates (concepts, lexicon, shlokas)
- [ ] improve weak pSEO templates (comparisons, chapters, practice-goal)

### Later
- [ ] automate recurring SEO job tracking
- [ ] persist validation payloads
- [ ] add dashboards or exported reports for indexed coverage and conversion impact

---

## 8) Bottom-line read

### Current Phase: Foundation / Early Discovery

Based on the Google Search baseline data (2026-03-09), the site is still in the **foundation / early discovery phase**, not in the optimization-at-scale phase.

### Baseline Reality Check

| Metric | Current Value | Target | Gap |
|---|---:|---:|---|
| Total Impressions (28d) | 29 | 1,000+ | Significant |
| Total Clicks (28d) | 1 | 50+ | Significant |
| Page Types with Visibility | Homepage only | All major templates | Significant |
| Organic Landing Pages | 0 rows | Multiple clusters | Significant |
| Tracked Events in GA4 | 0 rows | All events visible | Validation needed |

### Strongest areas right now
- **Technical SEO foundation** — robots, sitemap, canonicals, metadata, core schema
- **Indexing workflow infrastructure** — IndexNow endpoints, GSC deep links
- **GEO / LLM crawlability groundwork** — llms.txt, llms-full.txt, AI bot permissions
- **AEO recommendation layer** — brand facts, answer hubs, prompt testing matrix (newly complete)
- **pSEO route architecture** — 6 template types with decision matrix

### Mid-stage areas
- **Content cluster rollout** — 4 pillars + 10 articles live, expansion ongoing
- **Schema coverage** — good on articles, gaps on some pSEO templates
- **Analytics instrumentation** — events defined, needs DebugView validation

### Weakest / least-complete areas
- **Search visibility proof** — only homepage shows impressions
- **GA4 event validation** — 0 events returned in baseline query
- **pSEO scale execution** — templates exist but far from target scale
- **Automated recurring operations** — tracker exists, automation not implemented

### Key Insight

> **The infrastructure is now strong enough to measure SEO/AEO performance, but the actual live signal is still very small.**

The priority is:
1. **Indexing and discovery validation** — Get non-homepage pages indexed
2. **Event validation in production** — Confirm GA4 events fire correctly
3. **Proof of impressions** — See non-homepage pages earning impressions

### What this means strategically

- **Do not scale page production faster than validation capacity**
- **Focus on proof over production** — validate what exists before building more
- **Prioritize indexing** — submit URLs, check GSC coverage, fix exclusions
- **Run AEO prompt tests** — establish baseline before optimizing further

The project is **well past the planning stage** and **meaningfully implemented**, but still early in terms of **evidence-driven validation**. The

---

## 9) Evidence update log

| Date | Updated By | Evidence Sources Reviewed | Sections Updated | Status Change Summary |
|---|---|---|---|---|
| 2026-03-09 | Search Growth Team | GSC baseline, GA4 baseline, repository implementation audit | Executive summary, initiative analysis, practical next steps | Initial baseline captured |
