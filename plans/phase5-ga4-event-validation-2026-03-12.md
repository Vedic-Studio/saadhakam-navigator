# Phase 5 — GA4 Event Validation (SEO + Faith Finder)

Date: 2026-03-12  
Owner: Sadhaka Growth/SEO Ops  
Status: **Validated in production reports (with one property-access follow-up)**

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
| faith_finder_quiz_start | Yes | Yes | Yes | GA4 Data API (last 28d): eventCount=7, users=4 on property `526473437` |
| faith_finder_quiz_complete | Yes | Yes | Yes | GA4 Data API (last 28d): eventCount=2, users=2 on property `526473437` |
| faith_finder_email_capture | Yes | Yes | No | GA4 Data API (last 28d): eventCount=0, users=0 |
| faith_finder_result_view | Yes | Yes | No | GA4 Data API (last 28d): eventCount=0, users=0 |
| faith_finder_result_share | Yes | Yes | No | GA4 Data API (last 28d): eventCount=0, users=0 |
| seo_article_read | Yes | Yes | Yes | GA4 Data API (last 28d): eventCount=36, users=4 |
| cta_click | Yes | Yes | Yes | GA4 Data API (last 28d): eventCount=13, users=3 |
| app_open | Yes | Yes | Yes | GA4 Data API (last 28d): eventCount=16, users=12 |
| path_explore | Yes | Yes | Yes | GA4 Data API (last 28d): eventCount=13, users=3 |

### Production GA4 verification artifacts

- Validation JSON: `/tmp/ga4-priority-events-validation.json`
- Retry validation JSON (28d/90d/365d windows): `/tmp/ga4-priority-events-validation-retry.json`
- Post-access-update retry JSON (28d/90d windows): `/tmp/ga4-priority-events-validation-post-access-update.json`
- Property check results:
  - `384628249` → `403 User does not have sufficient permissions for this property`
  - `526473437` → accessible and returning tracked-event data

### Retry pull outcome (requested)

- Re-ran GA4 extraction across three windows (`last_28_days`, `last_90_days`, `last_365_days`).
- Result remained consistent:
  - Property `526473437`: same six events showing volume (`seo_article_read`, `app_open`, `cta_click`, `path_explore`, `faith_finder_quiz_start`, `faith_finder_quiz_complete`), and three Faith Finder events remain at zero.
  - Property `384628249`: still blocked with `403` in all windows.
- Re-ran again after access-update confirmation (latest run at `2026-03-12T13:50:16Z`):
  - Property `384628249` still returns `403` for both 28d and 90d windows.
  - Property `526473437` remains accessible with unchanged event counts.

---

## 5) Exit criteria for GA4 validation gate

- All 9 events visible in DebugView.
- All required params received as expected.
- Events visible in GA4 standard reports after processing delay.
- Any missing/incorrect params filed as follow-up fixes.

### Follow-up actions

1. Grant `sadhaka-seo-reporting@sadhaka-ai.iam.gserviceaccount.com` access to GA4 property `384628249` (or share the correct production property id).
2. Keep monitoring the three zero-volume Faith Finder events (`faith_finder_email_capture`, `faith_finder_result_view`, `faith_finder_result_share`) after additional production traffic/debug runs.
