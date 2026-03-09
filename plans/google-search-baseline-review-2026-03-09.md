# Google Search Baseline Review

Date: 2026-03-09  
Sources:
- Google Search Console property: `sc-domain:opensadhaka.com`
- Google Analytics 4 property: `526473437`
- Local exports:
  - `temp_cache/google-baseline/gsc-baseline.json`
  - `temp_cache/google-baseline/baseline.json`

---

## 1) Executive summary

This is an **early baseline**, not yet a performance story.

### What the data says right now
- **Search Console:** only the homepage is showing meaningful visibility in the pulled sample.
- **GA4 Organic landing pages:** no organic landing-page sessions returned for the last 28 days.
- **Tracked GA4 custom events:** no tracked events returned for the last 28 days.

### Current interpretation
- The site is either **very early in search visibility**, or most of the new SEO/AEO pages have **not yet been indexed / surfaced in GSC impressions**.
- GA4 is reachable through the Data API now, but the queried organic and tracked-event datasets currently return **zero rows**.
- This means we now have a working baseline pipeline, but the current result is mostly: **homepage-only search visibility + no measurable funnel activity in the queried window**.

---

## 2) Search Console baseline

## Last 28 days
- Impressions: **29**
- Clicks: **1**
- CTR: **3.45%**
- Average position: **13.45**
- Page types with visibility: **homepage only**

## Last 90 days
- Same result as last 28 days in this pull
- No additional page-type visibility surfaced in the returned dataset

## Observed page-type distribution

| Page type | Impressions | Clicks | CTR | Avg Position |
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

## Interpretation

This suggests one of the following:
- most pages are still too new to surface in GSC data,
- indexing/discovery is still lagging,
- Google is not yet rewarding the deeper page set,
- or the domain has not yet built enough authority/crawl confidence for broader URL discovery.

At the moment, **the homepage is the only confirmed search asset with visible traction** in this baseline pull.

---

## 3) GA4 baseline

## Organic landing pages — last 28 days
- Rows returned: **0**
- Organic landing-page page-type breakdown: **none returned**

## Tracked custom events — last 28 days
Tracked events queried:
- `faith_finder_quiz_start`
- `faith_finder_quiz_complete`
- `faith_finder_email_capture`
- `faith_finder_result_view`
- `faith_finder_result_share`
- `seo_article_read`
- `cta_click`
- `app_open`
- `path_explore`

Rows returned: **0**

## Interpretation

There are a few plausible explanations:

1. **Traffic volume is genuinely near-zero** in the queried window.
2. **GA4 has not yet collected enough matching traffic/events** for these specific dimensions and filters.
3. **Custom events exist in code but are not being triggered often in production.**
4. **Events are firing but not appearing in the queried reporting window yet** due to low volume or implementation/debug gaps.

---

## 4) Event implementation check vs data returned

## Implemented in code
From `src/app/layout.tsx`, the following event bridge exists:

- `faith_finder_quiz_start`
- `faith_finder_quiz_complete`
- `faith_finder_email_capture`
- `faith_finder_result_view`
- `faith_finder_result_share`
- `seo_article_read`
- `cta_click`
- `app_open`
- `path_explore`

## Called in product flows
Confirmed calls exist in the codebase for:
- quiz start
- quiz complete
- email capture
- result view
- share result

## Gap between implementation and reporting
The instrumentation exists, but the reporting baseline currently shows **zero tracked events** in the API query window.

That means this is now a **validation problem**, not just an implementation problem.

---

## 5) What this baseline means strategically

## The good news
- Search Console access works.
- GA4 Data API access now works.
- The site has at least some Google visibility.
- We now have a repeatable baseline pull workflow.

## The bad news
- SEO visibility is still extremely thin.
- New article, pSEO, and AEO pages are not yet visible in the pulled GSC baseline.
- Organic landing page reporting is currently empty.
- Tracked SEO/Faith Finder custom events are not yet showing up in the queried GA4 reports.

## Practical conclusion
You are still in the **foundation / early discovery phase**, not in the optimization-at-scale phase.

The most important work now is:
1. **indexing and discovery validation**
2. **event validation in production**
3. **proof that non-homepage pages are starting to earn impressions**

---

## 6) Immediate next actions

## A. Search Console
- inspect these URLs manually in GSC:
  - `/brand-facts`
  - `/best-spiritual-path-for-beginners`
  - `/choose-between-bhakti-jnana-karma-raja-yoga`
  - `/best-meditation-style-for-your-personality`
  - 3–5 core editorial articles
- confirm whether they are:
  - indexed
  - discovered but not indexed
  - crawled but not indexed
  - excluded for another reason

## B. Indexing workflow
- submit the new AEO URLs via:
  - IndexNow endpoint
  - Search Console request indexing flow
- re-check them after crawl lag

## C. GA4 event validation
- use GA4 DebugView in production or preview to explicitly test:
  - quiz start
  - quiz complete
  - email capture
  - result view
  - share result
- verify whether the event names appear exactly as expected
- verify whether any of them are marked as key events/conversions

## D. Re-run baseline after validation
- after deploy + indexing submission + GA4 DebugView tests
- rerun the baseline pull in 7–14 days

---

## 7) Priority interpretation by initiative

| Initiative | Current signal |
|---|---|
| Technical SEO | Implemented, but still awaiting broader search response |
| Content SEO | Little to no confirmed search visibility yet |
| pSEO | No evidence of traction yet in GSC baseline |
| AEO answer hubs | Built, but too early for measurable search/AI response |
| Brand facts | Built, but not yet visible in baseline |
| Faith Finder analytics | Instrumented in code, not yet visible in GA4 baseline |
| Measurement system | Working technically, but current dataset is sparse |

---

## 8) Bottom line

The infrastructure is now strong enough to measure SEO/AEO performance, but the actual live signal is still very small.

Right now, the honest summary is:

> **Search visibility is currently concentrated on the homepage, while deeper SEO/AEO assets and tracked funnel events have not yet produced measurable baseline volume in the pulled data window.**

That does not mean the strategy is wrong. It means the site is still in the stage where **indexation, crawl response, and initial visibility** matter more than fine-grained optimization.
