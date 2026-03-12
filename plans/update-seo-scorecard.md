# SEO Scorecard Update Runbook

Last Updated: 2026-03-12  
Owner: Sadhaka Search Growth Team  
Review Cadence: Weekly evidence check, monthly formal refresh  
Next Review Due: 2026-03-19  
Canonical Role: Single maintenance workflow for updating scorecard, dashboard, tracker, and phase plan signals.  
Primary Inputs: GSC data, GA4 data, watchlist status, indexing script outputs, recurring tracker logs.  
Primary Outputs: Updated scorecard evidence, refreshed dashboard freshness panel, execution-log records, and plan-level decision updates.

> **Companion Documents:**
> - `plans/seo-aeo-geo-status-scorecard.md` — Canonical status register
> - `plans/seo-growth-dashboard.md` — Thin executive overview
> - `plans/seo-recurring-operations-tracker.md` — Cadence + execution log
> - `plans/phasewise-search-growth-master-plan.md` — Stop/go gates and phase sequencing
> - `plans/google-api-setup.md` — API credential and access setup

---

## 1) When to run this workflow

Run this workflow in any of the following cases:
- **Weekly control pass** (light update)
- **Monthly formal scorecard refresh** (full evidence pass)
- **Post-major event** (new indexing wave, major GA4 validation, prompt-test cycle)

---

## 2) Inputs required

- Search Console access for `sc-domain:opensadhaka.com` (or URL-prefix property)
- GA4 access for production property
- `plans/priority-url-watchlist-template.csv`
- `plans/seo-recurring-operations-tracker.md`
- `plans/seo-aeo-geo-status-scorecard.md`
- `plans/phasewise-search-growth-master-plan.md`
- Script outputs from:
  - `npm run indexing:priority`
  - `npm run indexnow:check:prod`
  - `npm run indexnow:submit:prod`

---

## 3) Pre-flight checklist

- [ ] Confirm GSC property access is working
- [ ] Confirm GA4 property access is working
- [ ] Confirm current review window dates (last 7d / 28d)
- [ ] Confirm production env status for IndexNow (`INDEXNOW_KEY`)
- [ ] Confirm latest watchlist file has current priority URLs

---

## 4) Step-by-step workflow

## Step A — Generate indexing artifacts

Run:

```bash
npm run indexing:priority
npm run indexnow:check:prod
```

If readiness is green, run:

```bash
npm run indexnow:submit:prod
```

Record:
- readiness result
- batch counts
- submission success/failure status
- artifact path (`/tmp/indexnow-submit-results.json`)

## Step B — Review watchlist state

For each watchlist URL, capture:
- sitemap presence
- IndexNow submission date
- GSC inspection date
- index status
- first impression date (if any)

## Step C — Gather GSC evidence

Capture:
- page-cluster impressions/clicks/CTR
- indexed vs excluded by major template family
- movement in non-homepage visibility

## Step D — Gather GA4 evidence

Validate production visibility for:
- `faith_finder_quiz_start`
- `faith_finder_quiz_complete`
- `faith_finder_email_capture`
- `faith_finder_result_view`
- `faith_finder_result_share`
- `seo_article_read`
- `cta_click`
- `path_explore`
- `app_open`

## Step E — Decide status updates

Use the status model in scorecard:
- **Implemented**: feature is built/configured
- **Validated**: external systems show evidence
- **Successful**: measurable outcomes present

Only change an initiative status if fresh evidence supports it.

---

## 5) Update rules by document

## `plans/seo-aeo-geo-status-scorecard.md`
Update when evidence affects:
- implementation/validation/success read
- practical next-step checklist
- baseline interpretation
- evidence update log row

## `plans/seo-growth-dashboard.md`
Update every run:
- top blockers
- what needs review now
- freshness tracker (`Last Updated`, `Next Review Due`)
- latest evidence artifacts links

## `plans/seo-recurring-operations-tracker.md`
Update every run:
- append one execution log row
- update KPI snapshot if new values exist

## `plans/phasewise-search-growth-master-plan.md`
Update only if stop/go gates or phase sequencing change.

---

## 6) Evidence logging format

Use this row format in scorecard evidence log:

| Date | Updated By | Evidence Sources Reviewed | Sections Updated | Status Change Summary |
|---|---|---|---|---|
| YYYY-MM-DD | <owner> | GSC, GA4, watchlist, index artifacts | <section names> | <what changed> |

Use this row format in tracker execution log:

| Date | Cadence | Actions Completed | Outcome | Next Actions |
|---|---|---|---|---|
| YYYY-MM-DD | Weekly/Monthly | <actions> | <result> | <next owner/action> |

---

## 7) Decision thresholds (practical)

Use these conservative thresholds:
- move **Implemented → Validated** only when external evidence exists (GSC/GA4/provider response)
- move **Validated → Successful** only when trend-level outcomes appear (not one-off blips)
- avoid changing status when evidence is partial or ambiguous; log blocker instead

---

## 8) Output checklist

- [ ] Scorecard updated (if warranted)
- [ ] Dashboard refreshed
- [ ] Tracker execution log appended
- [ ] Next review dates updated
- [ ] Blockers and owners documented

---

## 9) Common failure modes

- Missing GSC access or wrong property scope
- GA4 events not visible due to environment mismatch
- `INDEXNOW_KEY` not configured in production
- stale watchlist missing newly published URLs
- status changed without sufficient evidence

When blocked, document blocker + owner + next action in dashboard and tracker.