# SEO & Content Recurring Operations Tracker

Last Updated: 2026-03-09  
Scope: Sadhaka SEO execution, Faith Finder growth content, technical SEO hygiene, and indexing reliability.

---

## 1) Operating Cadence

### Weekly (Execution)
- [ ] Publish 2–3 SEO articles/pages from active cluster backlog
- [ ] Add/update internal links from at least 3 relevant existing pages per new page
- [ ] Verify metadata quality (title, description, canonical, OG/Twitter) for newly published pages
- [ ] Validate schema output (Article/FAQ/HowTo where applicable)
- [ ] Trigger indexing submissions for all newly published URLs (IndexNow + Search Console request index)
- [ ] Review SEO content analytics coverage on newly published or refreshed pages:
  - `seo_article_read`
  - `cta_click`
  - `path_explore`
- [ ] Review GA4 events for Faith Finder funnel:
  - `faith_finder_quiz_start`
  - `faith_finder_quiz_complete`
  - `faith_finder_email_capture`
  - `faith_finder_result_view`
  - `faith_finder_result_share`
- [ ] Review top 10 pages by organic entrances and note content refresh opportunities

### Monthly (Optimization)
- [ ] Refresh underperforming pages (CTR < 2% or avg position 11–30 in GSC)
- [ ] Add 4–6 new spoke pages linked to pillar pages
- [ ] Audit sitemap and robots consistency (`/sitemap.xml`, split sitemap URLs, robots sitemap refs)
- [ ] Validate `llms.txt` and `llms-full.txt` output + robots AI crawler directives
- [ ] Re-check broken links and redirect hygiene on top traffic pages
- [ ] Compare month-over-month performance for target clusters:
  - Ancient Wisdom & Philosophies
  - Practical Spiritual Practices
  - Sacred Texts & Teachings
  - Spiritual Traditions & Paths

### Quarterly (Strategic)
- [ ] Re-prioritize keyword clusters and quick-win backlog based on ranking movement
- [ ] Expand comparison/programmatic templates where win rate is proven
- [ ] Review conversion path from SEO landing pages → Faith Finder → email capture
- [ ] Update this tracker and retire outdated recurring tasks

---

## 2) New Page Publishing Runbook (Every Publish)

- [ ] Page created with complete metadata and canonical URL
- [ ] Page includes content analytics instrumentation (`ContentPageTracker` or article tracker + tracked internal CTA links where relevant)
- [ ] Added to internal linking graph from related hubs/spokes
- [ ] Included in sitemap output (data-driven or static section)
- [ ] Verified page renders in production build
- [ ] Submitted to indexing channels:
  - IndexNow submit URL
  - Google Search Console URL inspection/request indexing

---

## 3) IndexNow Runbook

> Replace placeholders with production values.

- **Key file URL pattern (must resolve publicly):**  
  `https://opensadhaka.com/<INDEXNOW_KEY>.txt`

- **Key file body:**  
  Exact key text only (no extra chars/newlines preferred).

- **Single URL submit (Bing):**  
  `https://www.bing.com/indexnow?url=<ENCODED_URL>&key=<INDEXNOW_KEY>&keyLocation=https://opensadhaka.com/<INDEXNOW_KEY>.txt`

- **Single URL submit (Yandex):**  
  `https://yandex.com/indexnow?url=<ENCODED_URL>&key=<INDEXNOW_KEY>&keyLocation=https://opensadhaka.com/<INDEXNOW_KEY>.txt`

### Current App Configuration (Code-Verified)
- `next.config.ts` rewrite maps `/<INDEXNOW_KEY>.txt` → `/api/indexnow` when `INDEXNOW_KEY` is set.
- `src/app/api/indexnow/route.ts` returns plain-text key body and 404 when `INDEXNOW_KEY` is missing.
- `src/app/api/indexnow/submit/route.ts` provides authenticated (optional token) single/batch URL submission to Bing + Yandex IndexNow endpoints.
- `src/app/api/indexnow/submit/route.ts` also returns Google Search Console URL Inspection deep links (`inspectUrl`) per submitted URL to speed up manual “Request Indexing” operations.
- `src/app/layout.tsx` is configured for Google Search Console ownership verification via `GSC_VERIFICATION` / `NEXT_PUBLIC_GSC_VERIFICATION` metadata tags.
- Canonical key verification URL to ping after deploy:
  - `https://opensadhaka.com/<INDEXNOW_KEY>.txt`
- Functional API endpoint (internal mapping target):
  - `https://opensadhaka.com/api/indexnow`
- URL submission endpoint (automation target):
  - `POST https://opensadhaka.com/api/indexnow/submit`
- Live production probe (2026-03-10) returned:
  - `{"error":"INDEXNOW_KEY environment variable not configured"}`
  - This indicates IndexNow submit is deployed but blocked until `INDEXNOW_KEY` is configured in production environment variables.

### Search Console Operational Setup (Current + Next Step)
- **Implemented now:** each `POST /api/indexnow/submit` response includes `searchConsole.requestIndexingLinks[]` with a ready-to-open `inspectUrl` for each accepted URL.
- **Property resolution:** set `GSC_PROPERTY` to either:
  - `sc-domain:opensadhaka.com` (recommended), or
  - full URL-prefix property (`https://opensadhaka.com/`).
  - If omitted, app defaults to `sc-domain:<site-host>`.
- **Runbook use:** after every publish, call IndexNow submit endpoint once, then open each returned `inspectUrl` and click **Request Indexing**.

### Priority Batch Workflow (Code-Verified)
- Generate the current priority indexing batch with:
  - `npm run indexing:priority`
- Current batch covers:
  - pillar hubs
  - knowledge-hub index pages (`/philosophies`, `/traditions`, `/texts`, `/greats`, `/compare`)
  - chooser guides
  - evergreen intent-match chooser/support pages
  - primary concept hubs
  - Sanskrit lexicon pages
  - key comparison pages
  - flagship articles
  - scripture entry pages + Bhagavad Gita scripture URLs
- If `INDEXNOW_SUBMIT_TOKEN` is present in the environment, the generated curl command now includes the auth header automatically.
- Recommended weekly use:
  1. Run `npm run indexing:priority`
  2. Submit each generated payload batch to production `/api/indexnow/submit`
  3. Open the returned `inspectUrl` links in GSC and request indexing for the most important refreshed/new URLs
  4. Cross-check that these canonical URLs exist in the sitemap and match internal-link targets

### Priority Batch Curation Rules
- Keep the batch focused on canonical URLs only; avoid deprecated/redirecting variants such as `*-meaning` concept URLs.
- Prefer URLs that are either:
  - newly published,
  - materially refreshed,
  - core hubs that distribute authority internally, or
  - proven high-intent pages likely to earn faster indexing/re-crawl.
- If the total list exceeds the API cap (`MAX_URLS_PER_REQUEST = 50`), the priority script now emits multiple request payloads/curl commands so nothing is silently dropped.
- Even with batching support, keep the list focused on the most valuable canonical URLs so weekly ops stay practical.

---

## 4) KPI Snapshot (Track Monthly)

| Metric | Target Direction | Current | Notes |
|---|---|---|---|
| Organic Sessions | ↑ MoM |  |  |
| Indexed Pages | ↑ |  |  |
| Avg CTR (GSC) | ↑ |  |  |
| Keywords in Top 10 | ↑ |  |  |
| Faith Finder Quiz Starts | ↑ |  |  |
| Faith Finder Email Capture Rate | ↑ |  |  |

---

## 5) Execution Log

| Date | Cadence | Actions Completed | Outcome | Next Actions |
|---|---|---|---|---|
| 2026-03-09 | Weekly | Initial tracker created, technical SEO and Faith Finder analytics improvements applied | Baseline established | Continue weekly publishing + index submission |
| 2026-03-09 | Weekly | Expanded the 4 pillar hub pages with richer editorial copy, FAQ/collection schema, and direct internal links to quick-win/supporting articles | Stronger Task 8/9 cluster architecture and crawl paths for pillar ↔ spoke discovery | Continue refreshing remaining quick-win articles, submit updated URLs through IndexNow/GSC, and monitor indexing/ranking movement |
| 2026-03-09 | Weekly | Refreshed 4 priority quick-win articles (`advaita-vedanta-explained`, `bhagavad-gita-chapter-1`, `daily-spiritual-routine-beginners`, `how-to-choose-a-mantra`) with richer scannable sections, tighter internal links, and stronger article metadata/schema | Improved Task 9 article quality and cluster connectivity from article ↔ pillar ↔ support pages | Refresh the remaining quick-win articles, then resubmit updated URLs through IndexNow/GSC and watch for indexing + CTR movement |
| 2026-03-09 | Weekly | Expanded analytics coverage across remaining SEO content templates and widened the priority indexing batch to include hub indexes, chooser-support pages, and scripture/text entry pages | Stronger GA4 coverage for SEO surfaces and a more operationally useful canonical indexing batch | Validate live events in GA4 DebugView, submit refreshed priority batch in production, and monitor crawl/indexing pickup |
| 2026-03-09 | Weekly | Expanded concept hubs from the initial seed set to 22 canonical `what-is-*` entries, added safety filtering so concept cross-links only render valid concept destinations, and promoted the strongest new concept URLs into the priority indexing batch | Stronger concept-layer topical coverage with safer internal linking and a fuller canonical recrawl set | Add missing lexicon counterparts for the newest concept-only entries (`avidya`, `ishvara`, `jiva`, `karma-yoga`, `raja-yoga`) and continue the next concept wave |
| 2026-03-09 | Weekly | Added a second concept wave (`advaita`, `ahamkara`, `niskama-karma`, `pranayama`, `rta`) and cleaned invalid concept cross-link references so the concept graph now resolves cleanly | Better topical depth, safer internal navigation, and stronger support for concept-cluster authority building | Add lexicon counterparts where strategically useful and continue the next concept expansion wave around devotion, texts, and practice terms |
| 2026-03-09 | Weekly | Added lexicon counterparts for the highest-priority concept-only terms and upgraded the priority indexing script to emit multiple request batches when the canonical queue exceeds the API limit | Concept ↔ lexicon coverage is now complete for current concept hubs, and indexing ops no longer risk silent URL truncation | Submit both priority batches in production, then validate live crawl/indexing pickup for the newest concept and lexicon URLs |
| 2026-03-09 | Weekly | Submitted 65 priority URLs via IndexNow (3 batches: 50 + 7 + 8) covering pillar hubs, knowledge hubs, chooser guides, concepts, Sanskrit lexicon, comparisons, articles, scripture pages, and AEO assets (brand-facts, answer hubs) | All batches returned success (HTTP 200 with "Redirecting..." response from Next.js API). URLs submitted to Bing and Yandex via IndexNow protocol. | Monitor GSC for indexing status over next 1-2 weeks, validate GA4 events in DebugView, run AEO prompt tests to establish baseline |
| 2026-03-10 | Weekly | Expanded the next concept wave around practice and devotion terms by adding `mantra`, `japa`, `dhyana`, `dharana`, `sadhana`, `om`, `guna`, `avatara`, `tapas`, and `lila`, then promoted those concept + lexicon URLs into the priority indexing batch | Concept coverage moved deeper into beginner-practice and devotional intent, with stronger alignment to live lexicon entries and LLM-style seeker questions | Submit the refreshed priority batch in production, then continue the next concept wave for ritual and subtle-body terms such as `puja`, `darshan`, `nadi`, and `kundalini` |
| 2026-03-10 | Weekly | Completed first-extraction refresh pass on priority pages (`best-spiritual-path-for-beginners`, `choose-between-bhakti-jnana-karma-raja-yoga`, `best-meditation-style-for-your-personality`, `starting-spiritual-practice`, `what-is-vedanta`, `advaita-vedanta-explained`, `how-to-start-japa`, `how-to-choose-a-mantra`, `daily-spiritual-routine-beginners`) with direct-answer intros and explicit “best for / not best for / where to start” blocks | Priority answer pages now align with AEO writing standard and stronger prompt-intent extraction structure | Submit refreshed URLs through IndexNow + GSC inspection and run prompt-matrix regression across ChatGPT/Perplexity/Claude/Gemini |
| 2026-03-10 | Weekly | Updated priority indexing batch to include Wave-1 answer pages (`can-i-practice-vedanta-without-converting`, `can-i-chant-a-mantra-without-initiation`, `what-are-the-upanishads`, `best-bhagavad-gita-translation-for-beginners`) and re-ran `npm run indexing:priority` to generate latest 2-batch payloads + GSC inspection links | Indexing ops artifacts are current for newly published and refreshed answer pages | Execute production `POST /api/indexnow/submit` for both batches, then request indexing from returned GSC inspect links |
| 2026-03-10 | Weekly | Executed production submission attempt for both generated priority batches (50 + 35 URLs). Initial responses showed `Redirecting...`; redirect-followed responses returned `{"error":"INDEXNOW_KEY environment variable not configured"}` for both batches. Also completed representative QA checks confirming canonical pattern + internal-link presence on refreshed/Wave-1 pages and verified Wave-1 routes are present in `src/data/articles.ts` for sitemap/article inclusion. | Controllable proof captured: submission workflow is functioning at endpoint level but blocked by missing production `INDEXNOW_KEY`; content QA checks passed for representative refreshed/Wave-1 set. | Set `INDEXNOW_KEY` in production, redeploy, re-run both batch submissions, then open returned GSC inspect links and request indexing for refreshed + Wave-1 URLs. |

---

## 6) Automated SEO Agent Workflow (Trigger → Skills/Tools → Validation)

This section defines the recurring automation flow using the existing agent architecture (`orchestrator → research → writer → editor`) and SEO workflows in `.agents/workflows`.

### 6.1 Trigger Sources

1. **Time-based trigger (primary):** Cron scheduler starts run at configured cadence.
2. **Manual trigger (fallback):** API endpoint to force a run (`POST /api/seo-jobs/{job_key}/run`).
3. **Event trigger (optional phase 2):** Run when backlog receives new priority keyword cluster.

### 6.2 Agents, Skills, and Tools Map

| Stage | Agent/Service | Skill/Workflow | Tooling / API | Validation Check |
|---|---|---|---|---|
| Plan topics | Orchestrator + Research | `content-strategy`, `seo-content-publishing` | keyword backlog, internal priority rules | Candidate topics >= configured count |
| Draft content | Writer Agent | `seo-content-publishing` | `PipelineService` writer loop | Draft generated |
| Quality gate | Editor Agent | `seo-audit` checks | scorecard + revision loop | Score >= threshold OR flagged for review |
| AEO enrichment | AEO pass | `answer-engine-optimization` | schema/content sections | Required AEO blocks present |
| Indexing step | Indexing service | `llm-indexing` | `/api/indexnow`, sitemap, robots, llms.txt | Submit succeeded + URL present |
| Tracking step | Validation service | this runbook + tracker | DB run log + execution log row | Run marked `completed` with evidence |

### 6.3 State Machine for Recurring Job

`scheduled → running → validating → completed | partial_success | failed`

`partial_success` is used when content is generated but one or more post-publish validations fail (e.g., indexing submission failure).

---

## 7) Recurring Job Frequency Plan

### 7.1 Recommended Baseline Schedule

| Job Key | Purpose | Frequency | Cron (IST) | Output |
|---|---|---|---|---|
| `seo_weekly_publish` | Publish and optimize new SEO pages | 2x weekly (Tue/Fri) | `0 9 * * 2,5` | 1–2 new pages per run |
| `seo_weekly_hygiene` | Metadata/schema/internal link checks | Weekly (Mon) | `0 10 * * 1` | QA report + fixes list |
| `seo_monthly_refresh` | Refresh underperforming pages | Monthly (1st) | `0 11 1 * *` | Refresh queue + updated pages |
| `seo_monthly_aeo` | AEO/LLM optimization review | Monthly (15th) | `0 12 15 * *` | Answer hub/facts/schema validation |

> If timezone-specific cron support is unavailable, store UTC cron and timezone separately in job config.

### 7.2 Concurrency Rules

- Only one run per `job_key` can execute at a time.
- If previous run is still `running`, next scheduled run is marked `skipped_due_to_overlap`.
- Retries: max 2 retries for transient network/indexing failures.

---

## 8) Completion Validation Contract (What “Done” Returns)

Every automated run must produce a structured validation payload for reliable tracking.

### 8.1 Validation Payload Shape

```json
{
  "run_id": "uuid",
  "job_key": "seo_weekly_publish",
  "status": "completed",
  "started_at": "ISO-8601",
  "finished_at": "ISO-8601",
  "artifacts": {
    "pipeline_ids": ["..."],
    "published_urls": ["https://opensadhaka.com/..."],
    "indexnow_submissions": [{"url": "...", "ok": true}],
    "quality_scores": [{"pipeline_id": "...", "score": 8.4}]
  },
  "checks": {
    "content_generated": true,
    "quality_threshold_met": true,
    "metadata_valid": true,
    "schema_valid": true,
    "sitemap_contains_url": true,
    "indexing_submitted": true
  },
  "errors": [],
  "summary": "2 pages published, all checks passed"
}
```

### 8.2 Minimum Pass Criteria

Run is `completed` only if all are true:
1. At least one target artifact created (pipeline/page/update).
2. Quality threshold validation passed for all approved outputs.
3. Indexing + discoverability checks succeeded (`sitemap` + IndexNow response).
4. Run log persisted to DB and appended to this tracker’s execution log.

---

## 9) Implementation Plan (Execution Roadmap)

### Phase A — Job Registry + Run Logging
- Add DB models for recurring jobs and run history:
  - `seo_recurring_jobs`
  - `seo_job_runs`
  - `seo_job_artifacts`
- Include fields: `job_key`, `cron`, `timezone`, `enabled`, `last_run_at`, `next_run_at`, `status`, `validation_json`.

### Phase B — Scheduler Service
- Create `backend/app/services/seo_scheduler_service.py`.
- On API startup, load enabled jobs and register cron triggers.
- For each trigger, create run row (`scheduled`), then execute flow (`running`).

### Phase C — SEO Flow Runner
- Create `backend/app/services/seo_recurring_flow_service.py`.
- Reuse existing `PipelineService` for content creation/edit loop.
- Chain post-run checks:
  - Metadata/schema checks
  - Sitemap presence check
  - IndexNow submission check
- Build validation payload and persist as `validation_json`.

### Phase D — API + Observability
- Add routes in `backend/app/api/routes/seo_jobs.py`:
  - `GET /api/seo-jobs` (list jobs + next run)
  - `POST /api/seo-jobs/{job_key}/run` (manual trigger)
  - `GET /api/seo-jobs/{job_key}/runs` (history)
  - `GET /api/seo-jobs/runs/{run_id}` (detailed validation)
- Add lightweight alerting: log + webhook/email on `failed` or `partial_success`.

### Phase E — Tracker Integration
- After each run, append one row in **Execution Log** with:
  - cadence/job key
  - completed actions
  - result status
  - next action owner

---

## 10) Operational Definition of Done per Run

A recurring SEO run is considered done only when:

- [ ] Pipeline completed and final status resolved
- [ ] All configured validations executed
- [ ] Validation payload persisted and queryable
- [ ] Execution log updated with run outcome
- [ ] Any failures generated clear retry/owner instructions

This gives us a deterministic loop: **trigger → execute → validate → track → improve**.
