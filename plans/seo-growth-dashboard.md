# SEO Growth Dashboard (Control Panel)

Last Updated: 2026-03-12  
Owner: Sadhaka Search Growth Team  
Review Cadence: Weekly control pass  
Next Review Due: 2026-03-19  
Canonical Role: Thin executive summary, blocker tracker, and document freshness panel.  
Primary Inputs: Status scorecard, recurring tracker, phase master plan, watchlist checks, validation artifacts.  
Primary Outputs: Weekly focus, review priorities, and maintenance navigation links.

> **Usage Note:** This dashboard is a derived orientation layer. It is **not** the canonical status register.

> **Companion Documents:**
> - `plans/seo-aeo-geo-status-scorecard.md` — Canonical initiative-by-initiative status
> - `plans/phasewise-search-growth-master-plan.md` — Phase orchestration and stop/go gates
> - `plans/seo-recurring-operations-tracker.md` — Execution cadence and run logs
> - `plans/update-seo-scorecard.md` — Maintenance workflow
> - `plans/google-api-setup.md` — API setup and access checklist

---

## 1) Current phase and read

- **Current Phase:** Foundation / Early Discovery (Validation-first)
- **Primary Constraint:** Validation capacity is still the bottleneck, not page production capacity.
- **Current Focus:** Indexing proof, GA4 event visibility, and non-homepage impression growth.

---

## 2) Top blockers

| Priority | Blocker | Owner | Impact | Current State | Next Action |
|---|---|---|---|---|---|
| P1 | Production IndexNow readiness | Engineering | Delays discovery/re-crawl velocity | Previously blocked by missing `INDEXNOW_KEY` during production checks | Validate env status and re-run `npm run indexnow:check:prod` |
| P1 | Sparse GA4 evidence in baseline windows | Analytics/Growth | Weak conversion proof from SEO traffic | Baseline showed no custom event rows | Run production event validation and document result in scorecard/tracker |
| P1 | Non-homepage indexing breadth is limited | SEO + Engineering | Constrains pSEO/AEO impact proof | Homepage dominates known baseline visibility | Maintain watchlist and push index + inspection loop |
| P2 | Prompt-test execution cadence not yet evidenced | SEO/Content | Limits AEO optimization loop | Matrix exists; recurring benchmark evidence pending | Execute matrix and log outcomes in scorecard |

---

## 3) What needs review now

- [ ] Run weekly control pass from `plans/update-seo-scorecard.md`
- [ ] Validate production indexing readiness and submission artifacts
- [ ] Update watchlist statuses for current priority URLs
- [ ] Confirm GA4 visibility for priority event set
- [ ] Append execution-log row in recurring tracker

---

## 4) Freshness / latency tracker

| Asset | Role | Last Updated | Next Review Due | Owner | Status Note |
|---|---|---|---|---|---|
| `plans/seo-aeo-geo-status-scorecard.md` | Canonical status register | 2026-03-12 | 2026-03-19 | Search Growth Team | Needs fresh external evidence pass |
| `plans/phasewise-search-growth-master-plan.md` | Strategic sequencing | 2026-03-12 | 2026-03-26 | Search Growth Team | Current phase plan active |
| `plans/seo-growth-dashboard.md` | Thin control panel (derived) | 2026-03-12 | 2026-03-19 | Search Growth Team | Keep summary-only; no initiative deep-dives |
| `plans/seo-recurring-operations-tracker.md` | Execution cadence + log | 2026-03-09 | 2026-03-19 | Search Growth Team | Weekly control checklist added |
| `plans/update-seo-scorecard.md` | Maintenance runbook | 2026-03-12 | 2026-03-19 | Search Growth Team | New canonical update procedure |
| `plans/google-api-setup.md` | API setup dependency | 2026-03-12 | 2026-04-12 | Engineering / Analytics | Verify service-account access before automation |

---

## 5) Quick links

## Core docs
- Status scorecard: `plans/seo-aeo-geo-status-scorecard.md`
- Master plan: `plans/phasewise-search-growth-master-plan.md`
- Recurring tracker: `plans/seo-recurring-operations-tracker.md`
- Scorecard runbook: `plans/update-seo-scorecard.md`

## Supporting docs
- Baseline review: `plans/google-search-baseline-review-2026-03-09.md`
- Prompt tests: `plans/aeo-prompt-testing-matrix.md`
- pSEO decisions: `plans/pseo-template-decision-matrix.md`
- Watchlist template: `plans/priority-url-watchlist-template.csv`

## External systems
- Google Search Console: <https://search.google.com/search-console>
- Google Analytics 4: <https://analytics.google.com/>

---

## 6) Latest evidence artifacts

| Date | Artifact | Purpose |
|---|---|---|
| 2026-03-09 | `plans/google-search-baseline-review-2026-03-09.md` | Baseline GSC/GA4 state snapshot |
| 2026-03-10 | `scripts/check-indexnow-prod.mjs` + `scripts/submit-priority-indexnow.mjs` outputs | IndexNow readiness + batched submission evidence loop |
| 2026-03-12 | `plans/phase5-ga4-event-validation-2026-03-12.md` | Event validation tracking reference |
| 2026-03-12 | `plans/seo-aeo-geo-status-scorecard.md` (evidence log update row) | Governance and control-layer alignment evidence |

---

## 7) Recommended next actions

## Now
- Run the weekly update runbook end-to-end once and log outputs.

## This week
- Confirm IndexNow readiness and submission success.
- Update scorecard evidence log with new validation artifacts.
- Record GA4 event visibility outcomes for priority events.

## Later
- Begin API-backed report extraction after access setup is confirmed.
- Keep Ahrefs integration deferred until validation loops are stable.