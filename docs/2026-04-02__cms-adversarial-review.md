# Adversarial Review: Sadhaka CMS, Pipeline & Dashboard

## Context

The Sadhaka project has a multi-layered content system: a Python backend pipeline (orchestrator/research/writer/editor agents), a Next.js CMS layer (storage, versioning, editorial workflow), an analytics dashboard, and Claude Code skills for content generation. The CricTracker project represents the gold standard — a battle-tested 7-step linear pipeline with deterministic quality gates, structured learnings, explicit model routing, and a dual-dashboard system. This review compares the two and identifies what needs to change for the Sadhaka system to match CricTracker's reliability and effectiveness.

---

## Verdict: The CMS is architecturally sound but operationally incomplete

The CMS has good bones — typed schemas, versioned content, editorial stages, pipeline materialization. But it fails the "run 20 articles through it" stress test. CricTracker's pipeline has survived hundreds of articles; Sadhaka's has survived maybe a handful. The gaps below are ordered by impact.

---

## 1. CRITICAL: Pipeline <> CMS Integration is Fragile

### Problem
The pipeline (Python backend) and CMS (Next.js) are connected by thin API proxies with no contract enforcement. The materialization endpoint (`/api/pipelines/[id]/materialize/route.ts`) fetches from the backend, extracts an artifact, and calls `upsertCmsArticleDraft()` — but there's no schema validation on what comes back from the backend. If the backend changes its output format, the frontend silently ingests garbage.

### CricTracker comparison
CricTracker's pipeline writes markdown files with mandatory tracking artifacts at every step. Each artifact has a known structure. The backend DB is a read-only cache of these files — single source of truth is always the markdown. In Sadhaka, the source of truth is split: backend DB for pipeline state, CMS DB for editorial state, filesystem for content. Three places to go wrong.

### Fix
- Add Zod schemas to validate pipeline backend responses at the proxy boundary (`src/app/api/pipelines/` routes)
- Define a `MaterializationContract` type that both backend output and CMS input must satisfy
- Add an integration test that creates a pipeline, runs it to approval, materializes, and verifies CMS state

### Files
- `src/app/api/pipelines/[id]/materialize/route.ts`
- `src/lib/pipelines/types.ts`
- `src/lib/cms/storage.ts`

---

## 2. CRITICAL: No Deterministic Quality Gate

### Problem
CricTracker has `exclusion_scan.py` — a regex-based scanner that catches specific AI anti-patterns (tricolons, false agency, mic-drops, em dashes, throat-clearing, etc.) with zero tolerance at editor Pass 0 and score deductions at the scoring step. This runs deterministically — same input, same output, every time.

Sadhaka relies entirely on LLM evaluation (the voice skill + editor agent scoring). LLMs are non-deterministic. An article that passes today might fail tomorrow with the same content. There's no programmatic anti-slop scan.

### CricTracker comparison
CricTracker's editor agent runs the exclusion scan as Pass 0 before any LLM evaluation. Violations are caught with regex, not vibes. The scorer also runs the scan as a pre-check, deducting from Authenticity automatically. This two-layer deterministic + LLM approach is dramatically more reliable.

### Fix
- Port `exclusion_scan.py` concept to Sadhaka: create `src/lib/cms/exclusion-scan.ts` with regex patterns for known anti-patterns
- Wire it into the editor agent's scoring flow as a mandatory pre-check
- Run it on CMS content save as a warning (not blocking, but surfaced in UI)
- Add the scan results to the ScoreCard component so editors see violations

### Files (new + modified)
- `src/lib/cms/exclusion-scan.ts` (new)
- `src/lib/cms/exclusion-scan.test.ts` (new)
- `backend/app/agents/editor.py` (add deterministic pass)
- `src/components/cms/editor-desk/ScoreCard.tsx` (show violations)

---

## 3. CRITICAL: CMS Storage Layer Has Data Integrity Risks

### Problem
Three specific issues in `src/lib/cms/storage.ts`:

**a) Silent SQLite errors.** `runSql()` uses `execFileSync("sqlite3", ..., { stdio: "ignore" })`. All errors — constraint violations, disk full, permission denied — are silently swallowed. The caller has no idea if the write succeeded.

**b) Race condition in version numbering.** `saveCmsContent()` does SELECT MAX(version)+1 then INSERT as separate operations. Two concurrent saves to the same slug will both compute the same next version number. The UNIQUE constraint will fail silently (see issue a).

**c) Filesystem-database inconsistency.** `persistLocalVersion()` writes files first, then updates the database. If the DB write fails (silently, per issue a), you have orphaned files with no DB record.

### CricTracker comparison
CricTracker uses markdown files as the single source of truth. The DB is a read-only cache populated by `tracking_sync.py`. There's no two-phase commit problem because writes only go to one place.

### Fix
- Replace `{ stdio: "ignore" }` with proper error capture and throw on failure
- Use SQLite's `INSERT ... RETURNING` or wrap version numbering in a transaction
- Reverse the write order: DB first, then filesystem (easier to retry file writes)
- Add a consistency check function that compares DB records against filesystem
- For PostgreSQL: add a transaction wrapper around version save + article update

### Files
- `src/lib/cms/storage.ts` (lines 118-128, 409-426, 862-897)

---

## 4. HIGH: No Structured Learnings System

### Problem
CricTracker has a battle-tested learnings system: per-skill directories with structured frontmatter (date, article, type, source, skill, confidence, confirm_after), a reading protocol (summary.md > 10 most recent > all), and confidence calibration (High/Medium/Low). The `/debrief` skill saves learnings that feed back into idea-sourcer and content-planner.

Sadhaka has a `/debrief` skill but the learnings infrastructure is thin. There's no structured reading protocol, no confidence calibration beyond what the skill prompt says, and no evidence the feedback loop is actually wired to influence future pipeline runs.

### Fix
- Create `.claude/skills/debrief/learnings/` directory structure mirroring CricTracker's pattern
- Add learnings reading protocol to each Sadhaka skill prompt (idea-sourcer, content-planner, write-article)
- Define a standard frontmatter schema for Sadhaka learnings
- Wire the debrief skill to save learnings with confidence calibration
- Add a `summary.md` consolidation trigger when learnings exceed 10 files

### Files
- `.claude/skills/debrief/` (modify skill, add learnings dirs)
- `.claude/skills/write-article.md` (add learnings reading step)
- `.claude/skills/content-planner.md` (add learnings reading step)
- `.claude/skills/idea-sourcer.md` (add learnings reading step)

---

## 5. HIGH: Missing Batch Production Mode

### Problem
CricTracker's "Fast Track" mode is a key efficiency lever. For batched content (same template, different entities), the first article runs the full 7-step pipeline. Subsequent articles skip idea-sourcer and producer, spot-check research, and only checkpoint at draft/score. This cuts human checkpoints from 5 to 3.

Sadhaka has no batch concept. Every article goes through the same pipeline regardless of whether it's the 10th spoke article in a cluster. The pipeline doesn't know about sibling articles.

### Fix
- Add `batch_id` and `batch_template_slug` fields to the pipeline creation flow
- When `batch_template_slug` is set, auto-populate research brief from the template article's research
- Skip the human checkpoint for research on batch articles (auto-advance)
- Add batch progress tracking to the QueuePage (show "3/8 complete" for a batch)
- Pass sibling article context to the writer agent so it varies structure

### Files
- `src/lib/pipelines/types.ts` (add batch fields)
- `backend/app/services/pipeline_service.py` (add fast-track logic)
- `backend/app/models/pipeline.py` (add batch_id, batch_template_slug columns)
- `src/components/cms/editor-desk/QueuePage.tsx` (batch progress UI)

---

## 6. HIGH: Model Routing is Implicit

### Problem
CricTracker explicitly documents which model to use at each pipeline step and why: Sonnet for drafting (less verbose, better rhythm), Opus for editing/scoring (challenges assumptions, structural rewrites). The model routing is intentional and tested.

Sadhaka's backend agents don't have explicit model routing. The orchestrator doesn't specify model selection.

### Fix
- Add `model` field to PipelineConfig (orchestrator.py)
- Map each agent step to a specific model: research=sonnet, write=sonnet, edit=opus
- Log which model was used for each output (add `model` to ContentOutput)
- Surface model info in PipelineReviewPage

### Files
- `backend/app/agents/orchestrator.py`
- `backend/app/services/pipeline_service.py`
- `backend/app/models/pipeline.py`
- `src/components/cms/editor-desk/PipelineReviewPage.tsx`

---

## 7. HIGH: Dashboard Doesn't Connect to CMS Actions

### Problem
The analytics dashboard and CMS editor desk are separate surfaces with no cross-linking. The strategic audit identifies P1 articles needing work, but there's no "Edit in CMS" button. The CMS queue doesn't show analytics performance.

### Fix
- Add "Open in Editor Desk" links from editorial queue items
- Add a performance summary card to ReviewPage.tsx
- Add "View Analytics" from ArticleCard
- Add `analyticsSnapshot` to CmsArticleDetail type

### Files
- `src/app/analytics/AnalyticsDashboard.tsx`
- `src/components/cms/editor-desk/ReviewPage.tsx`
- `src/components/cms/editor-desk/ArticleCard.tsx`
- `src/lib/cms/types.ts`

---

## 8. MEDIUM: Test Coverage is Dangerously Low for CMS Core

### Problem
`src/lib/cms/storage.ts` — the entire persistence layer — has zero tests. API route tests mock the storage layer entirely, so they'd pass even if storage.ts was completely broken.

### Fix
- Create `src/lib/cms/storage.test.ts` testing all critical functions
- Create `backend/tests/` with Python pipeline service tests
- Add integration tests for the full pipeline-to-CMS flow

---

## 9. MEDIUM: No Tracking Artifacts Per Pipeline Step

CricTracker mandates filesystem tracking artifacts at every step. Sadhaka saves outputs to DB blobs with no standardized structure and no local-file audit trail.

---

## 10. MEDIUM: Dashboard is a 1037-line Monolith

`AnalyticsDashboard.tsx` needs decomposition into sub-components with lazy loading and individual tests.

---

## 11. LOW: Editing Existing Content Uses a Different Path Than Generation

Pipeline-generated content goes through quality gates. Hand-edited content in the CMS bypasses all of them. Need re-score and exclusion-scan buttons on the review page.

---

## Summary: Priority Implementation Order

| # | Issue | Severity | Effort |
|---|-------|----------|--------|
| 1 | Pipeline-CMS contract validation | Critical | Small |
| 2 | Deterministic exclusion scan | Critical | Medium |
| 3 | CMS storage data integrity | Critical | Medium |
| 4 | Structured learnings system | High | Medium |
| 5 | Batch production mode | High | Large |
| 6 | Explicit model routing | High | Small |
| 7 | Dashboard <> CMS cross-linking | High | Medium |
| 8 | CMS storage test coverage | Medium | Medium |
| 9 | Pipeline step tracking artifacts | Medium | Medium |
| 10 | Dashboard decomposition | Medium | Medium |
| 11 | Edit-path quality gates | Low | Medium |
