# Phase-wise Search Growth Master Plan (SEO + GEO + AEO + pSEO)

Last Updated: 2026-03-12  
Owner: Sadhaka Search Growth Team  
Review Cadence: Bi-weekly during active execution
Next Review Due: 2026-03-26
Canonical Role: Strategic sequencing, stop/go gates, and phase orchestration across SEO/GEO/AEO/pSEO.
Primary Inputs: Status scorecard, baseline reports, template matrix, recurring tracker evidence.
Primary Outputs: Priority sequence, phase exits, sprint checklists, and scale constraints.
Primary System: `.agents/skills/search-growth-system`

---

## 1) Objective

Execute the AEO/GEO/SEO strategy in a validation-first sequence that matches current maturity:

- Strong implementation across SEO/GEO/AEO infrastructure
- Weak external proof (indexing breadth, non-homepage impressions, GA4 conversion visibility)

Core rule:

> Do not scale page production faster than validation capacity.

---

## 2) Current State Snapshot (Starting Point)

Reference docs:
- `plans/seo-aeo-geo-status-scorecard.md`
- `plans/google-search-baseline-review-2026-03-09.md`
- `plans/pseo-template-decision-matrix.md`
- `plans/seo-recurring-operations-tracker.md`

### Evidence summary
- GSC baseline visibility concentrated on homepage
- GA4 tracked custom events baseline sparse/zero in queried window
- AEO assets are implemented (`/brand-facts`, `brand-facts.json`, answer hubs)
- pSEO template decisions exist (scale/improve/pause), but validation is incomplete
- IndexNow workflow exists but production readiness has depended on env configuration

---

## 3) Phase Plan Overview

| Phase | Name | Timeline | Primary Outcome |
|---|---|---|---|
| 0 | Operating Alignment | Day 0–2 | Single source of truth, owners, and gates locked |
| 1 | Validation First | Week 1–2 | Indexing + GA4 + watchlist proof established |
| 2 | AEO Proof Loop | Week 2–4 | Prompt-test baseline and citation improvements underway |
| 3 | pSEO Gated Expansion | Month 2 | Scale only healthy templates; patch weak templates |
| 4 | Canonical Entity Graph | Month 2–3 | Ontology + canonical entity blueprint system live |
| 5 | Shloka + Curriculum Layer | Month 3–4 | Reference-depth + track-based learning layer expanded |
| 6 | GEO/LLM Ingestion Surfaces | Month 4 | AI-facing discoverability and exports hardened |
| 7 | Ops Automation & Reliability | Month 4+ | Recurring jobs observable, repeatable, and validated |

---

## 4) Detailed Execution by Phase

## Phase 0 — Operating Alignment (Day 0–2)

### Actions
1. Use `plans/seo-aeo-geo-status-scorecard.md` as canonical status register.
2. Enforce status model across workstreams: **Implemented → Validated → Successful**.
3. Lock owner map:
   - Engineering (infra, schema, indexing ops)
   - SEO/Content (pages, refreshes, linking, prompt alignment)
   - Analytics/Growth (GSC/GA4 validation + KPI snapshots)

### Deliverables
- This master plan accepted as execution baseline
- Weekly + monthly operating ritual owner-assigned

### Exit criteria
- No ambiguity on priorities, owners, and stop conditions

---

## Phase 1 — Validation First (Week 1–2) [Highest Priority]

### Actions
1. Build and run a 20-URL watchlist using `plans/priority-url-watchlist-template.csv`.
2. For each URL: record sitemap presence, internal-link support, IndexNow submit date, GSC inspect date, index status, first impression date.
3. Validate GA4 events in DebugView + standard reports:
   - `faith_finder_quiz_start`
   - `faith_finder_quiz_complete`
   - `faith_finder_email_capture`
   - `faith_finder_result_view`
   - `faith_finder_result_share`
   - `seo_article_read`, `cta_click`, `path_explore`, `app_open`
4. Validate IndexNow readiness and run submissions:
   - `npm run indexnow:check:prod`
   - `npm run indexnow:submit:prod`
5. Resolve production blockers (especially `INDEXNOW_KEY`, optional submit token, deployment sync).

### Dependencies
- Production environment variable access
- GSC property access
- GA4 property access

### Exit criteria
- >=70% watchlist URLs indexed or moving through active recrawl
- Priority GA4 events visible in production reporting
- Submission pipeline working end-to-end with artifacts

---

## Phase 2 — AEO Proof Loop (Week 2–4)

### Actions
1. Execute `plans/aeo-prompt-testing-matrix.md` on ChatGPT, Perplexity, Claude, Gemini.
2. Log citation/mention/accuracy scores for brand facts + answer hubs + supporting pages.
3. Run one refresh pass on weak pages using answer-first standards:
   - tighter opening answer blocks
   - stronger FAQ phrasing from prompt language
   - clearer chooser/comparison structures
4. Start citation seeding with relevant partners and resource pages.

### Deliverables
- Baseline prompt-testing sheet with scores
- Updated answer pages for lowest-performing prompts

### Exit criteria
- Clear before/after AEO benchmark exists
- Early uplift visible in mention/citation quality

---

## Phase 3 — pSEO Gated Expansion (Month 2)

### Decisions (from `plans/pseo-template-decision-matrix.md`)

#### Scale now
- Concept pages (`what-is-*`)
- Sanskrit lexicon pages
- Bhagavad Gita shloka pages

#### Improve before scaling
- Comparison pages
- BG chapter pages
- Practice-goal pages

### Actions
1. Expand only Scale-Now families in controlled waves.
2. Patch Improve families before any large expansion:
   - remove/replace thin placeholders
   - add unique FAQs
   - add missing schema where required
3. Re-run indexing and impression checks at template-family level.

### Exit criteria
- Template-level scale governed by evidence, not volume ambition

---

## Phase 4 — Canonical Entity Graph & Ontology (Month 2–3)

### Actions
1. Create versioned ontology artifact (`yaml/json`) with entity groups:
   - texts, concepts, practices, personae, lineages, schools
2. For each entity define:
   - slug, canonical definition, related entities, canonical user questions, priority
3. Build high-priority page blueprint format:
   - direct definition
   - scriptural basis
   - lineage/school variation
   - practical application
   - FAQ + linked shlokas/tracks

### Deliverables
- v1 ontology with 80–100 core entities
- Canonical page blueprint pack for priority entities

### Exit criteria
- Canonical entity model is production-ready for structured expansion

---

## Phase 5 — Shloka Corpus + Curriculum Layer (Month 3–4)

### Actions
1. Normalize verse data into one canonical schema.
2. Ensure stable URL structure and cross-links:
   - shloka ↔ concept ↔ track
3. Add practical application summaries (“In practice”) where missing.
4. Launch/expand flagship learning tracks:
   - Bhagavad Gita for Beginners
   - Vedanta Fundamentals
   - Paths of Yoga
   - Daily Sadhana Toolkit
   - Gita for Decision-Making

### Deliverables
- Consistent shloka corpus with metadata quality controls
- 5 structured learning-track surfaces with schema

### Exit criteria
- Sadhaka differentiates on both reference granularity and guided learning pathways

---

## Phase 6 — GEO/LLM Ingestion Surfaces (Month 4)

### Actions
1. Refresh `llms.txt` and `llms-full.txt` priority ordering to reflect canonical assets.
2. Add compact AI summaries to core entity/track templates where appropriate.
3. Publish machine-readable exports (JSON/CSV) with clear reuse/licensing notes.

### Deliverables
- LLM-facing discovery layer aligned with latest ontology and tracks
- Public machine-readable exports for ingestion workflows

### Exit criteria
- AI retrieval surfaces point to canonical, high-signal assets

---

## Phase 7 — Ops Automation & Reliability (Month 4+)

### Actions
1. Implement recurring job registry + run history persistence.
2. Implement scheduler and manual-trigger endpoints.
3. Persist validation payloads for each run.
4. Add observability + failure alerting for partial/failed runs.

### Reference
- Implementation path already defined in `plans/seo-recurring-operations-tracker.md` (Sections 6–10).

### Exit criteria
- Search operations are deterministic, queryable, and resilient

---

## 5) KPI Framework by Stage

## Foundation / Validation KPIs (Phase 1–2)
- Watchlist URL indexation rate
- First-impression count across watchlist URLs
- GA4 event visibility rate (tracked events returning data)
- Prompt-test mention/citation baseline

## Scale KPIs (Phase 3–5)
- Indexed URLs by template family
- % template URLs receiving impressions
- CTR and avg position movement on refreshed pages
- Internal-link coverage quality for new template waves

## System KPIs (Phase 6–7)
- AI retrieval/citation quality trend (manual matrix)
- Publish→submit→first impression latency
- Recurring job completion rate + validation pass rate

---

## 6) Stop / Go Gates

## Stop conditions (do not scale)
- Watchlist indexation remains weak
- GA4 events still not visible in production reports
- Template family shows thin-content or duplication patterns

## Go conditions (allow next-scale wave)
- Validation KPIs pass for current wave
- Prompt-test quality stable/improving for priority intents
- Internal linking + schema checks passed per runbook

---

## 7) Immediate 14-Day Sprint (Execution Checklist)

- [ ] Configure production `INDEXNOW_KEY` and verify with `npm run indexnow:check:prod`
- [ ] Submit all priority batches using `npm run indexnow:submit:prod`
- [ ] Populate and run 20-URL watchlist with inspection status
- [ ] Validate all priority GA4 events in production reports
- [ ] Execute first complete AEO prompt test matrix and record baseline
- [ ] Refresh weakest 3 answer pages based on prompt findings
- [ ] Re-run indexing + inspection on refreshed pages

---

## 8) Required Companion Docs (Keep Updated)

- `plans/seo-aeo-geo-status-scorecard.md`
- `plans/seo-recurring-operations-tracker.md`
- `plans/seo-growth-dashboard.md`
- `plans/update-seo-scorecard.md`
- `plans/google-api-setup.md`
- `plans/aeo-prompt-testing-matrix.md`
- `plans/pseo-template-decision-matrix.md`
- `plans/google-search-baseline-review-2026-03-09.md`
- `plans/priority-url-watchlist-template.csv`

This file acts as the orchestration layer across all the above.
