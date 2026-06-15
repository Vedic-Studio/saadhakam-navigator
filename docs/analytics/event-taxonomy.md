# Sadhaka Event Taxonomy

GA4 property: `G-S3DHYPPG9R`. Naming convention: `object_action`, lowercase with
underscores (per the `analytics-tracking` skill). Context lives in event
properties, not in the event name.

This document is the source of truth for the growth-instrumentation events from
the June 2026 user-map & growth plan
(`docs/2026-06-15__sadhaka__user-map-growth-engagement-plan__v1.md`, sections 4 and 5).

How events reach GA4:
- The analytics bridge in `src/app/layout.tsx` exposes `window.sadhaka.*`
  helpers; each helper calls a `sendEvent` wrapper that runs
  `window.gtag('event', name, params)`.
- Client React components (for example `src/components/AnalyticsTracker.tsx`)
  may import TypeScript modules and call `window.sadhaka.*` or `window.gtag`
  directly. The inline layout bridge script cannot import modules.
- `undefined` properties are dropped by gtag, so optional properties are passed
  as `value || undefined`.

Status legend:
- SHIPPED: wired and firing in this workstream.
- DEFERRED: specified here only. The underlying feature does not exist yet, so
  the event is NOT wired. The "Wired in phase" column states when it lands.

Phase legend (from the 12-week roadmap, plan section 6):
- P1 = weeks 4 to 12 feature builds (mala counter, Today surface, learning path,
  fact cards).
- P2 = email-capture moments layered on top of P1 loops.

---

## Summary table

| Event | Status | Wired in phase | Persona | Loop | Key properties |
|-------|--------|----------------|---------|------|----------------|
| `return_visit` | SHIPPED | P0 (now) | All | Retention primitive | days_since_last, visit_count |
| `cta_click` (source_template enrichment) | SHIPPED | P0 (now) | All | Read to act | source_template (added) |
| `faith_finder_quiz_start` (source_template enrichment) | SHIPPED | P0 (now) | All | Read to act | source_template (added) |
| `streak_day` | DEFERRED | P1 | Practitioner | HABIT | streak_len, cluster |
| `mantra_audio_play` | DEFERRED | P1 | Practitioner | HABIT | mantra_id, deity, duration_pct |
| `panchang_view` | DEFERRED | P1 | Practitioner (daily-return cohort) | HABIT / daily-return | date, tithi, vara, nakshatra |
| `path_step_complete` | DEFERRED | P1 | Student | MASTERY-PATH | path_id, step_n, total_steps |
| `verse_bookmark` | DEFERRED | P1 | Student | MASTERY-PATH | verse_id, cluster |
| `outbound_share` | DEFERRED | P1 | Civilizational | IDENTITY-SHARE | platform, content_type, url |

---

## The `source_template` property (enrichment, SHIPPED)

A shared property added to `cta_click` and `faith_finder_quiz_start` that records
which page-template surface the interaction came from. It lets us attribute
conversions and CTA clicks back to the template that drove them, so a later
workstream can compare, for example, mantra pages against comparison pages as
conversion sources.

- Type: string (enum below).
- Optional: omitted (left `undefined`, so gtag drops it) when the caller does not
  pass it. Existing call sites keep working unchanged.
- Passed as the last argument: `ctaClick(label, destination, context, sourceTemplate)`
  and `quizStart(context, sourceTemplate)`.
- Type definition: `SadhakaSourceTemplate` in `src/types/sadhaka-analytics.d.ts`.

### Canonical allowed values

```
homepage
concept-essay
article
comparison
biography
mantra
verse
evidence
dynasty
panchang
stotra
hub
faith-finder
today
```

A later workstream wires the actual call sites to pass the matching value for
each page template. Until then, the property simply stays absent.

---

## SHIPPED events

### `return_visit`

- Name: `return_visit`
- Trigger: fires once per browser session, on first mount of `AnalyticsTracker`,
  when the visitor has at least one prior counted session
  (`isReturn === true`, i.e. `visit_count > 1`).
- Wiring: `src/components/AnalyticsTracker.tsx` reads prior state from
  `localStorage` (`sadhaka_return_visit_v1`), computes via the pure module
  `src/lib/analytics/returnVisit.ts`, persists the next state, and guards the
  single fire with a `sessionStorage` flag (`sadhaka_return_visit_fired`).
- Maps to: all personas. This is the retention primitive (plan feature P0-c).
  Today `app_open` ~= `first_visit` ~= `session_start`, so there is no returner
  signal; this event creates one and makes the daily-return cohort measurable.
- Properties:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `days_since_last` | number | integer >= 0 | Whole days between now and the last visit. 0 when the gap is under 24 hours. |
  | `visit_count` | number | integer >= 2 when fired | Session count including this session. Only emitted when > 1. |

- Example gtag call:

  ```javascript
  window.gtag('event', 'return_visit', {
    days_since_last: 3,
    visit_count: 4,
  });
  ```

### `cta_click` (existing event, enriched)

- Name: `cta_click`
- Trigger: unchanged. Fires from `window.sadhaka.ctaClick(label, destination, context, sourceTemplate)`
  when a tracked call-to-action is clicked.
- Change in this workstream: added the optional `source_template` property.
- Maps to: all personas, the read-to-act gate (plan Gate 2).
- New property:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `source_template` | string | the source_template enum above | Optional; dropped when not passed. |

- Example gtag call (with the new property):

  ```javascript
  window.gtag('event', 'cta_click', {
    cta_label: 'Start the Faith Finder',
    cta_destination: '/faith-finder',
    source_template: 'mantra',
    // ...existing journey properties (journey_id, page_template, etc.)
  });
  ```

### `faith_finder_quiz_start` (existing event, enriched)

- Name: `faith_finder_quiz_start`
- Trigger: unchanged. Fires from `window.sadhaka.quizStart(context, sourceTemplate)`
  when the Faith Finder quiz begins.
- Change in this workstream: added the optional `source_template` property.
- Maps to: all personas; the Faith Finder is the cross-persona routing front door
  (plan section 4.2).
- New property:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `source_template` | string | the source_template enum above | Optional; dropped when not passed. |

- Example gtag call (with the new property):

  ```javascript
  window.gtag('event', 'faith_finder_quiz_start', {
    quiz_name: 'faith_finder',
    source_template: 'homepage',
    // ...existing journey properties
  });
  ```

---

## DEFERRED events (spec only, NOT wired)

These six events are defined for the upcoming feature builds. The features do not
exist yet, so nothing is wired. Each maps to a persona loop from plan sections 4.3
and 4.4.

### `streak_day`

- Name: `streak_day`
- Trigger: fires once per day when a user completes the daily practice on the
  "Aaj ka Sadhaka" Today surface (a tap-to-count or audio-play that counts toward
  the consecutive-day streak). Feature P1-a.
- Maps to: Persona 1 Practitioner, HABIT loop (keystone retention loop).
- Properties:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `streak_len` | number | integer >= 1 | Current consecutive-day streak length including today. |
  | `cluster` | string | content-cluster id (for example `navagraha-mantra`, `panchang`) | Which content cluster the day's practice belonged to. |

- Maps-to detail: plan feature P1-a, success metric "first return_visit visit_count>1
  cohort > 15 percent".
- Wired in phase: P1.
- Example gtag call:

  ```javascript
  window.gtag('event', 'streak_day', {
    streak_len: 7,
    cluster: 'navagraha-mantra',
  });
  ```

### `mantra_audio_play`

- Name: `mantra_audio_play`
- Trigger: fires when a user plays mantra audio on a mantra page (and on
  progress milestones, see `duration_pct`). Feature P0-a / P1.
- Maps to: Persona 1 Practitioner, HABIT loop. The core action on the
  highest-volume cluster (the om-bram-brim page alone has 934 impressions) which
  currently fires zero action events.
- Properties:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `mantra_id` | string | mantra slug (for example `om-bram-brim`) | Identifies the mantra played. |
  | `deity` | string | deity / graha name (for example `budha`, `surya`, `chandra`) | The planetary deity the mantra addresses. |
  | `duration_pct` | number | integer 0 to 100 | Percent of the audio listened to at the time of the event. |

- Wired in phase: P1 (audio asset is the one non-trivial build, plan risk note).
- Example gtag call:

  ```javascript
  window.gtag('event', 'mantra_audio_play', {
    mantra_id: 'om-bram-brim',
    deity: 'budha',
    duration_pct: 100,
  });
  ```

### `panchang_view`

- Name: `panchang_view`
- Trigger: fires on view of a Panchang / Today surface that shows the day's
  almanac. Feature P1-a. This event defines the daily-return cohort.
- Maps to: Persona 1 Practitioner as the daily-return cohort; the HABIT /
  daily-return loop. Cluster G (panchang) is the only inherently daily-recurring
  intent and currently sits at 0.2 percent CTR with no return mechanic.
- Properties:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `date` | string | ISO date `YYYY-MM-DD` | The calendar date being viewed. |
  | `tithi` | string | tithi name (for example `shukla-panchami`) | The lunar day. |
  | `vara` | string | weekday name (for example `budhavara`) | The vara, which binds the day's recommended mantra. |
  | `nakshatra` | string | nakshatra name (for example `pushya`) | The lunar mansion for the day. |

- Wired in phase: P1.
- Example gtag call:

  ```javascript
  window.gtag('event', 'panchang_view', {
    date: '2026-06-15',
    tithi: 'shukla-panchami',
    vara: 'budhavara',
    nakshatra: 'pushya',
  });
  ```

### `path_step_complete`

- Name: `path_step_complete`
- Trigger: fires when a user marks a step of a learning path complete. Feature P1-c.
- Maps to: Persona 2 Verse Student, MASTERY-PATH loop. `path_explore` has 25 users
  but no completion event today, so the loop is half-instrumented.
- Properties:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `path_id` | string | learning-path slug | Identifies the path. |
  | `step_n` | number | integer >= 1 | The step just completed (1-indexed). |
  | `total_steps` | number | integer >= 1 | Total steps in the path, for goal-gradient progress. |

- Maps-to detail: plan feature P1-c, success metric "path completion > 25 percent".
- Wired in phase: P1.
- Example gtag call:

  ```javascript
  window.gtag('event', 'path_step_complete', {
    path_id: 'darshanas-foundations',
    step_n: 3,
    total_steps: 8,
  });
  ```

### `verse_bookmark`

- Name: `verse_bookmark`
- Trigger: fires when a user bookmarks (saves) a verse. Feature P1-c.
- Maps to: Persona 2 Verse Student, MASTERY-PATH loop. This is the Student's
  investment action (the saved-library Zeigarnik open loop) and is untracked today.
- Properties:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `verse_id` | string | verse id (for example `bg-6-11`, `vsn-shloka-83`) | Identifies the bookmarked verse. |
  | `cluster` | string | content-cluster id (for example `bhagavad-gita`, `vishnu-sahasranama`) | The cluster the verse belongs to. |

- Maps-to detail: plan feature P1-c, success metric ">= 1 bookmark for 30 percent
  of path-enrollers".
- Wired in phase: P1.
- Example gtag call:

  ```javascript
  window.gtag('event', 'verse_bookmark', {
    verse_id: 'vsn-shloka-83',
    cluster: 'vishnu-sahasranama',
  });
  ```

### `outbound_share`

- Name: `outbound_share`
- Trigger: fires when a user shares content outward, for example the one-tap
  "share this comparison" branded fact card. Feature P1-b.
- Maps to: Persona 3 Civilizational Arguer, IDENTITY-SHARE loop. The only persona
  whose core job is distribution; they rank top-5, so each share is compounding
  acquisition. Only the legacy `faith_finder_result_share` exists today (1 fire in
  90 days); `outbound_share` is the general primitive.
- Properties:

  | Property | Type | Allowed values | Notes |
  |----------|------|----------------|-------|
  | `platform` | string | `twitter`, `whatsapp`, `facebook`, `copy_link`, `native_share`, `other` | The share destination. |
  | `content_type` | string | `comparison`, `fact_card`, `article`, `verse`, `mantra` | The kind of content shared. |
  | `url` | string | absolute or path URL | The URL that was shared. |

- Maps-to detail: plan feature P1-b, success metric "shares from 1 to >= 30 per
  90 days".
- Wired in phase: P1.
- Example gtag call:

  ```javascript
  window.gtag('event', 'outbound_share', {
    platform: 'whatsapp',
    content_type: 'fact_card',
    url: 'https://opensadhaka.com/sanatan-history/evidence/rakhigarhi',
  });
  ```
