# Phase 2 Foundation — Public API (Round 1 handover)

This is the stable, tested base that the four parallel Round 1 feature agents
build on. It ships three things: a client user-state store, typed event
wrappers for the six deferred growth events, and `getPanchangForDate`. Treat the
signatures below as fixed contracts. Everything here is SSR-safe (App Router,
React 19): no module-top-level or render-time access to `window` /
`localStorage`; the React hooks read storage in `useEffect` after mount.

Source files:

- `src/lib/userState/` (`index.ts`, `streak.ts`, `bookmarks.ts`, `storage.ts`, `hooks.ts`)
- `src/lib/analytics/events.ts`
- `src/lib/jyotish.ts` (the `getPanchangForDate` addition)

Event property names match `docs/analytics/event-taxonomy.md` exactly.

---

## 1. User-state store — `@/lib/userState`

Versioned localStorage key: `sadhaka_user_state_v1` (holds streak + bookmarks).
The store NEVER writes the return-visit key; it only reads it (see visit count).

### Hooks (client components only)

```ts
import { useStreak, useBookmarks, useVisitCount } from "@/lib/userState";
```

#### `useStreak(): { count: number; recordToday: () => void }`

- `count` — current consecutive-day streak. `0` on the server and until the
  effect hydrates on the client; becomes the real value after mount.
- `recordToday()` — records today (visitor-local calendar day) as an active day,
  applies the grace-day rule, and persists. Idempotent within the same calendar
  day (calling it twice on one day does nothing the second time).
- It does NOT fire the `streak_day` event. After calling `recordToday()`, read
  the updated `count` and call `trackStreakDay(count, cluster)` yourself (see §2).

Grace-day rule (one grace day per streak, non-replenishing), implemented in the
pure `recordActiveDay(state, todayYmd)`:

| Gap (calendar days since last active) | Result |
|---------------------------------------|--------|
| first ever (none recorded) | `count = 1`, grace fresh |
| 0 (same day) | unchanged (idempotent) |
| 1 (consecutive) | `count + 1`, grace flag unchanged |
| 2 (one missed day), grace available | `count + 1`, grace now used |
| 2 (one missed day), grace already used | reset to `count = 1`, grace fresh |
| 3+ (multiple missed days) | reset to `count = 1`, grace fresh |

The gap is computed from `YYYY-MM-DD` calendar parts at UTC midnight, not raw
millisecond differences, so it is timezone-drift-free. Each streak absorbs
exactly one missed day; a second miss breaks it. Grace replenishes only when the
streak itself resets.

#### `useBookmarks()`

```ts
{
  bookmarks: Bookmark[];                                  // oldest first
  isBookmarked: (verseId: string) => boolean;
  toggle: (verseId: string, cluster: string) => void;     // add if absent, remove if present
}
```

- `Bookmark = { verseId: string; cluster: string; savedAt: number }`.
- De-duplicated by `verseId`; the first save wins (its `savedAt`/`cluster` are
  kept). `bookmarks` is `[]` on the server and until hydration.
- `toggle()` persists but does NOT fire `verse_bookmark`. After a toggle that
  results in an add, call `trackVerseBookmark(verseId, cluster)` yourself.

#### `useVisitCount(): number`

- Read-only. Returns the session count AnalyticsTracker maintains in
  `sadhaka_return_visit_v1`. `0` on the server, until hydration, and before
  AnalyticsTracker has run once. Never writes that key.

### Pure helpers / accessors (also exported from `@/lib/userState`)

For non-React callers and tests:

- `recordActiveDay(state: StreakState, todayYmd: string): StreakState`
- `calendarDaysBetween(lastYmd: string, todayYmd: string): number | null`
- `INITIAL_STREAK_STATE`, `type StreakState`
- `addBookmark`, `removeBookmark`, `toggleBookmark`, `hasBookmark`,
  `normalizeBookmarks`, `type Bookmark`
- `readUserState()`, `writeUserState(state)`, `normalizeUserState(unknown)`,
  `createInitialUserState()`, `readVisitCount()`, `type UserState`
- `USER_STATE_STORAGE_KEY`, `RETURN_VISIT_STORAGE_KEY`

`StreakState = { count: number; lastActiveYmd: string | null; graceUsed: boolean }`.

---

## 2. Event wrappers — `@/lib/analytics/events`

Each wrapper is SSR-safe, calls `window.gtag?.('event', name, params)`, and drops
properties whose value is `undefined` or `""`. A legitimate numeric `0` (e.g.
`duration_pct: 0`) is preserved. This TypeScript module is the canonical contract
(do not inline these into the `layout.tsx` bridge).

```ts
import {
  trackStreakDay,
  trackMantraAudioPlay,
  trackPanchangView,
  trackPathStepComplete,
  trackVerseBookmark,
  trackOutboundShare,
} from "@/lib/analytics/events";
```

| Wrapper | Event | Params (GA4) |
|---------|-------|--------------|
| `trackStreakDay(streakLen: number, cluster: string)` | `streak_day` | `{ streak_len, cluster }` |
| `trackMantraAudioPlay(mantraId: string, deity: string, durationPct: number)` | `mantra_audio_play` | `{ mantra_id, deity, duration_pct }` |
| `trackPanchangView({ date, tithi, vara, nakshatra? })` | `panchang_view` | `{ date, tithi, vara, nakshatra }` (nakshatra optional) |
| `trackPathStepComplete(pathId: string, stepN: number, totalSteps: number)` | `path_step_complete` | `{ path_id, step_n, total_steps }` |
| `trackVerseBookmark(verseId: string, cluster: string)` | `verse_bookmark` | `{ verse_id, cluster }` |
| `trackOutboundShare({ platform, contentType, url })` | `outbound_share` | `{ platform, content_type, url }` |

Literal unions:

- `SharePlatform = 'twitter' | 'whatsapp' | 'facebook' | 'copy_link' | 'native_share' | 'other'`
- `ShareContentType = 'comparison' | 'fact_card' | 'article' | 'verse' | 'mantra'`

Argument object types are exported too: `PanchangViewParams`, `OutboundShareParams`.

Matching (optional) method signatures also exist on `window.sadhaka`
(`streakDay`, `mantraAudioPlay`, `panchangView`, `pathStepComplete`,
`verseBookmark`, `outboundShare`) in `src/types/sadhaka-analytics.d.ts`, for
consistency only — prefer importing the module.

---

## 3. `getPanchangForDate` — `@/lib/jyotish`

```ts
import { getPanchangForDate, DEFAULT_PANCHANG_CITY_ID } from "@/lib/jyotish";

getPanchangForDate(date: Date | string): PanchangForDate
```

```ts
interface PanchangForDate {
  date: string;                  // YYYY-MM-DD (the resolved civil day)
  tithi: {
    slug: string;
    name: string;
    paksha: "Shukla" | "Krishna";
    number: number;              // 1..15
  };
  vara: Vara;                    // FULL Vara object — includes vara.rulingGraha
  nakshatra: { slug: string; name: string } | null;
}
```

- Default location: **Varanasi** (`DEFAULT_PANCHANG_CITY_ID === "varanasi"`), the
  canonical spiritual reference city and first preset in
  `vedicClockPresetCities`. Tithi/nakshatra are computed for Varanasi's civil day
  (`Asia/Kolkata`).
- Wraps `buildVedicClockResponse({ cityId: "varanasi", date })` and reshapes it.
- `vara` is the **full** `Vara` (from `@/data/panchang`) so Round 1 can bind the
  day's mantra via `vara.rulingGraha` (e.g. `budhavara` → `budha`). The vara is
  weekday-deterministic and stable for a fixed date regardless of wall clock.
- A `YYYY-MM-DD` string is used verbatim; any other string or a `Date` is
  normalised to the Varanasi civil day. Throws on an unparseable date.
- `nakshatra` is **available** from the vedic-clock response and returned as
  `{ slug, name }`. It is `null` only in the defensive case where the response
  could not resolve a lunar mansion (sentinel slug `"unknown"`); in practice the
  underlying model always resolves one.

---

## Notes for Round 1

- The store deliberately does not fire analytics. Wire UI -> store hook, then
  UI -> the matching `track*` wrapper, so the firing decision stays in the
  feature component.
- All store reads/writes happen in effects/handlers. Do not call `readUserState`
  or the hooks during render or at module top level.
- `getPanchangForDate` is pure for a fixed date and safe to call in a Server
  Component (it does not touch `window`).
- Tests live next to each module (`*.test.ts` / `hooks.test.tsx`). Mirror that
  style when extending.
