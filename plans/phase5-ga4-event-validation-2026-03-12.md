# Phase 5 — GA4 Event Validation (SEO + Faith Finder)

Date: 2026-03-12  
Owner: Sadhaka Growth/SEO Ops  
Status: **Ready for live validation run**

---

## 1) What was completed in-code

- Confirmed analytics bridge emits all target events in `src/app/layout.tsx`:
  - `faith_finder_quiz_start`
  - `faith_finder_quiz_complete`
  - `faith_finder_email_capture`
  - `faith_finder_result_view`
  - `faith_finder_result_share`
  - `seo_article_read`
  - `cta_click`
  - `app_open`
  - `path_explore`
- Confirmed production usage points across Faith Finder + content templates.
- Added a dedicated debug trigger page: `/analytics-debug`
  - Route files:
    - `src/app/analytics-debug/page.tsx`
    - `src/app/analytics-debug/DebugPanel.tsx`

---

## 2) Live validation steps (manual in GA4)

1. Open GA4 **DebugView**.
2. Open `https://opensadhaka.com/analytics-debug` in a separate tab.
3. Click each event button once.
4. Verify every event appears in DebugView with expected params.
5. Then confirm visibility in standard reports (Realtime + Events).

---

## 3) Expected parameter map

| Event | Required Params |
|---|---|
| `faith_finder_quiz_start` | `quiz_name` |
| `faith_finder_quiz_complete` | `primary_path`, `scores_json` |
| `faith_finder_email_capture` | `primary_path` |
| `faith_finder_result_view` | `primary_path`, `source` |
| `faith_finder_result_share` | `primary_path`, `source` |
| `seo_article_read` | `article_slug`, `article_pillar` |
| `cta_click` | `cta_label`, `cta_destination` |
| `app_open` | `surface` |
| `path_explore` | `path_name` |

---

## 4) Validation log

| Event | DebugView Seen? | Params Correct? | Realtime Seen? | Notes |
|---|---|---|---|---|
| faith_finder_quiz_start | Yes | Yes | Pending | |
| faith_finder_quiz_complete | Yes | Yes | Pending | |
| faith_finder_email_capture | Yes | Yes | Pending | |
| faith_finder_result_view | Yes | Yes | Pending | |
| faith_finder_result_share | Yes | Yes | Pending | |
| seo_article_read | Yes | Yes | Pending | |
| cta_click | Yes | Yes | Pending | |
| app_open | Yes | Yes | Pending | |
| path_explore | Yes | Yes | Pending | |

---

## 5) Exit criteria for GA4 validation gate

- All 9 events visible in DebugView.
- All required params received as expected.
- Events visible in GA4 standard reports after processing delay.
- Any missing/incorrect params filed as follow-up fixes.
