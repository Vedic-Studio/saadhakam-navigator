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
- Canonical key verification URL to ping after deploy:
  - `https://opensadhaka.com/<INDEXNOW_KEY>.txt`
- Functional API endpoint (internal mapping target):
  - `https://opensadhaka.com/api/indexnow`
- URL submission endpoint (automation target):
  - `POST https://opensadhaka.com/api/indexnow/submit`

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
