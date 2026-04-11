## Panchang follow-up handover — 2026-04-11

### Scope reviewed
- `src/components/panchang/CitySelector.tsx`
- `src/components/panchang/PanchangClient.tsx`
- `src/components/panchang/PanchangAtAGlance.tsx`
- `src/components/panchang/SunMoonPanel.tsx`
- `src/components/panchang/DailyTimingGuide.tsx`
- `src/components/panchang/DayTimeline.tsx`
- `src/components/jyotish/VedicClockClient.tsx`
- `src/components/jyotish/VedicClockClient.test.tsx`
- `src/lib/vedic-clock/transitions.ts`
- `src/lib/vedic-clock/hindu-calendar.ts`
- `src/lib/vedic-clock/core.ts`
- `src/lib/vedic-clock/schema.ts`
- `src/lib/vedic-clock/core.test.ts`
- `src/lib/vedic-clock/astronomy.test.ts`
- `src/data/rashis.ts`
- existing panchang tests: `PanchangClient.test.tsx`, `DayTimeline.test.tsx`

### What was done
- Reassessed the requested work list and confirmed the main buckets:
  1. `CitySelector` compact prop bug
  2. missing backend and UI tests
  3. `VedicClockClient` test failures / expectation drift
  4. optional `DayTimeline` mobile auto-centering
  5. `scratch.ts` cleanup
- Confirmed `PanchangClient.tsx` passes `compact` into `CitySelector` at line ~181-188, but `CitySelector.tsx` currently does **not** accept a `compact` prop. This is the DOM warning source.
- Confirmed current `CitySelector` implementation always renders the verbose layout with:
  - map pin
  - “Showing timings for” prefix
  - selected city name
  - native `<select>`
  - “Use my location” button
- Reviewed component targets for missing tests and identified their current render contracts:
  - `PanchangAtAGlance` renders 6 cards: vara, tithi, nakshatra, yoga, karana, moon rashi
  - `SunMoonPanel` renders 6 items: sunrise, solar noon, sunset, day length, moonrise, moonset
  - `DailyTimingGuide` renders auspicious and cautionary sections with status pills (`Active`, `Past`, `Upcoming`, `Standard`)
- Reviewed `DayTimeline.tsx` and confirmed current mobile behavior is still `overflow-x-auto` with `min-w-[900px]`; no auto-centering logic exists yet.
- Checked `git status` and confirmed `scratch.ts` is already deleted in the working tree (`D  scratch.ts`).
- Confirmed there are many unrelated modified files in `src/app/**/page.tsx`; avoid touching those while finishing this task.

### Findings on tests

#### Existing `VedicClockClient` test status
- Ran:
  - `npm run test:run -- src/components/jyotish/VedicClockClient.test.tsx`
- Result during investigation:
  - **15 passed, 1 failed**
  - only failing test was:
    - `does not synthesize cross-date preview state from stale astronomy`
- Important note: the user task summary said there were 9 failures, but the current repo state only reproduced **1** failure in that file.

#### Why that `VedicClockClient` test fails
- The failure occurs before the assertion about stale cross-date preview behavior.
- Initial render stays in the loading skeleton state, so the test cannot find `2026-04-09T05:41`.
- This likely means the test’s mock payload shape is stale relative to the current `VedicClockResponse` contract / render path.
- Notable drift observed:
  - `VedicClockClient.tsx` expects `panchanga.yoga` and `panchanga.karana` as strings in some places.
  - Current schema in `src/lib/vedic-clock/schema.ts` defines both as structured field objects.
  - `core.ts` currently returns structured objects for yoga and karana.
  - `VedicClockClient.test.tsx` still uses the old payload shape in parts of the fixture.
- This mismatch should be resolved before treating the remaining test as a real behavior regression.

#### Backend test fixture data gathered
- `getHinduCalendarContext` was successfully probed via `tsx`; stable outputs collected:
  - `2026-04-09T06:15:00.000Z`, solar longitude `355.18223965680244`, tithi `15` ->
    - `Chaitra`
    - `चैत्र`
    - `Krishna`
    - `Vikram Samvat 2083`
  - `2027-01-14T05:00:00.000Z`, solar longitude `269.5454819089499`, tithi `14` ->
    - `Pausha`
    - `पौष`
    - `Shukla`
    - `Vikram Samvat 2083`
  - `2026-05-15T00:00:00.000Z`, solar longitude `10`, tithi `2` ->
    - `Vaishakha`
    - `वैशाख`
    - `Shukla`
    - `Vikram Samvat 2083`
- Attempted to probe `findNextTransition`, but direct `tsx` execution hit an `astronomy-engine` ESM export/runtime issue outside Vitest. No reliable transition fixture values were captured yet.
- Existing stable astronomical fixtures are available in `src/lib/vedic-clock/astronomy.test.ts` and `src/lib/vedic-clock/core.test.ts`; those are the best starting point for deriving transition expectations inside proper Vitest tests.

### What is **not** done yet
- No source files were edited for this task.
- No tests were added.
- No `CitySelector` fix was implemented.
- No `DayTimeline` mobile enhancement was implemented.
- No verification rerun was completed after changes, because no changes were made.

### Recommended next implementation order
1. **Fix `CitySelector` compact prop**
   - Add `compact?: boolean` to props.
   - In compact mode, render inline layout only:
     - city name
     - dropdown trigger / select
     - location button
   - Omit “Showing timings for”.
   - Ensure `compact` is not forwarded to DOM.

2. **Add backend tests**
   - `src/lib/vedic-clock/hindu-calendar.test.ts`
     - use the captured fixtures above.
   - `src/data/rashis.test.ts`
     - assert 12 entries, unique slugs, required fields.
   - `src/lib/vedic-clock/transitions.test.ts`
     - derive expected values by calling `buildVedicClockResponse` in Vitest and/or using existing astronomy fixture dates.
     - avoid shell/tsx probing; use Vitest runtime where module resolution already works.

3. **Add UI tests**
   - `PanchangAtAGlance.test.tsx`
   - `SunMoonPanel.test.tsx`
   - `DailyTimingGuide.test.tsx`
   - Best approach: reuse a valid `VedicClockResponse` fixture shaped like `schema.ts`, not the stale shape from `VedicClockClient.test.tsx`.

4. **Fix `VedicClockClient.test.tsx`**
   - First update fixture shape to match current schema / component expectations.
   - Then re-run just that test file.
   - The currently reproduced failure is the cross-date preview test, but fixture normalization may reveal/resolve others.

5. **Optional `DayTimeline` mobile improvement**
   - Add `ref` to scroll container.
   - On mount / payload change, compute active muhurta center and scroll it into view on smaller viewports.
   - Add or update test only if behavior can be asserted safely in jsdom.

6. **Final verification**
   - `npm run test:run`
   - `npm run build`

### Repo state cautions
- `scratch.ts` is already staged as deleted in working tree; keep that deletion.
- There are many unrelated modified article page files in `src/app/**`. Do not include them in this Panchang follow-up work.
- `src/components/jyotish/VedicClockClient.tsx` is already modified in working tree before this handover; inspect before editing so you do not overwrite unrelated changes.
