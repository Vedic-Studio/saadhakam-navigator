# Vedic Clock 7-Day Build Plan

This plan is for the light public version you described:

- one clock page on the website
- one working backend
- people can visit, choose a location, and click a few buttons
- correctness prioritized over feature count

This plan is mapped to the current repo:

- Next.js app in [src/app/page.tsx](/Users/ankitmishra/Developer/Sadhaka/src/app/page.tsx)
- existing Jyotish domain data in [src/lib/jyotish.ts](/Users/ankitmishra/Developer/Sadhaka/src/lib/jyotish.ts) and [src/lib/jyotish-daily.ts](/Users/ankitmishra/Developer/Sadhaka/src/lib/jyotish-daily.ts)
- existing Python backend in [backend/app/main.py](/Users/ankitmishra/Developer/Sadhaka/backend/app/main.py)

## Build choice

For a one-week public MVP, use the Next.js app as both frontend and backend.

Reason:
- one deployment target
- fewer moving parts
- faster debugging
- easier to keep API and UI changes in one place

Do not use the separate Python backend for this first release unless you discover a hard requirement that the Next app cannot handle.

## Strict scope

Ship only this:

- one `/vedic-clock` page
- one backend route returning current clock data
- location support:
- `Use my location`
- `Ujjain`
- `Varanasi`
- one manual refresh button
- one details drawer or panel
- fields returned:
- local civil time
- sunrise
- sunset
- sunrise-day start
- sunrise-day end
- current muhurta in fixed `48` minute mode
- `tithi`
- `nakshatra`
- `yoga`
- `karana`
- provenance:
- `ayanamsha`
- `muhurta_mode`
- `sunrise_model`
- `tzid`
- `code_version`

Cut from week one:

- variable muhurta mode
- user accounts
- exports
- sharing
- charts
- embeddings
- multi-engine accuracy modes
- retrieval or LLM explainers
- Rashtriya Panchang full automation harness
- separate Python compute service

## Suggested implementation shape

Frontend:
- new route at `src/app/vedic-clock/page.tsx`
- one client component for location actions and refresh
- one server or fetch layer calling your own route handler

Backend:
- route handler at `src/app/api/vedic-clock/route.ts`
- internal compute modules in `src/lib/vedic-clock/*`

Suggested module split:
- `src/lib/vedic-clock/types.ts`
- `src/lib/vedic-clock/constants.ts`
- `src/lib/vedic-clock/sunrise.ts`
- `src/lib/vedic-clock/time.ts`
- `src/lib/vedic-clock/panchanga.ts`
- `src/lib/vedic-clock/format.ts`
- `src/lib/vedic-clock/locations.ts`
- `src/lib/vedic-clock/index.ts`

Tests:
- `src/lib/vedic-clock/*.test.ts`

## Day 1: Freeze conventions and API contract

Goal:
- no ambiguity remains in week one scope

Deliverables:
- convention file with:
- `ayanamsha = lahiri`
- `muhurta_mode = fixed_48min`
- `sunrise_model = noaa_90.833`
- `vedic_day_boundary = sunrise`
- location presets for Ujjain and Varanasi
- API response contract written down
- `/vedic-clock` page skeleton added

Agent tasks:
- architecture agent:
- define request and response shape for `/api/vedic-clock`
- implementation agent:
- create `src/lib/vedic-clock` module scaffold
- frontend agent:
- add empty page shell and loading state
- review agent:
- check that no week-one feature has leaked beyond strict scope

Cut rule:
- if a field is not needed for the first public page, it does not get implemented on day 1

## Day 2: Build time and sunrise core

Goal:
- reliable civil time plus sunrise-day primitives

Deliverables:
- timezone-aware local time conversion
- sunrise, sunset, and sunrise-day ownership logic
- tests for:
- `t < sunrise_today`
- date rollover
- Ujjain and Varanasi sample outputs

Agent tasks:
- implementation agent:
- build `time.ts` and `sunrise.ts`
- test agent:
- add regression tests around sunrise-day boundary behavior
- review agent:
- check sign conventions and longitude handling

Cut rule:
- if NOAA math becomes noisy, ship minute-level correctness first and tighten later the same week

## Day 3: Build Panchanga compute core

Goal:
- current values compute end to end

Deliverables:
- `tithi`
- `nakshatra`
- `yoga`
- `karana`
- current muhurta index and elapsed minutes
- provenance object returned with every compute result

Implementation note:
- if full ephemeris integration threatens the timeline, ship a constrained first version backed by a clearly versioned and reviewable computation path, then harden after launch

Agent tasks:
- implementation agent:
- build `panchanga.ts`
- data agent:
- wire existing Jyotish labels from current repo data where useful
- test agent:
- add formula and boundary tests
- review agent:
- check wrap-around logic at `0/360`

Cut rule:
- do not add secondary Panchanga limbs or interpretive content this day

## Day 4: Expose backend route and wire fetch flow

Goal:
- website can request real clock data from a working backend

Deliverables:
- `src/app/api/vedic-clock/route.ts`
- query support for `lat`, `lon`, and `tz`
- clean JSON response
- page wired to live data

Agent tasks:
- backend agent:
- build the route handler and validation
- frontend agent:
- fetch and render live response states
- QA agent:
- test invalid location inputs and missing params
- security agent:
- add basic rate-safety and input validation

Cut rule:
- no auth, no database, no persistence

## Day 5: Build the actual public page

Goal:
- the product feels real and clear

Deliverables:
- polished `vedic-clock` page
- location buttons:
- `Use my location`
- `Ujjain`
- `Varanasi`
- refresh button
- details panel showing provenance and calculation notes

UI priorities:
- show the current clock state immediately
- make location switching obvious
- make provenance visible
- avoid dense walls of text

Agent tasks:
- frontend design agent:
- implement final page layout and interaction states
- content agent:
- write the short calculation details copy
- accessibility agent:
- verify keyboard and screen-reader basics

Cut rule:
- if styling starts taking too long, preserve clarity and responsiveness over visual flourishes

## Day 6: Verification and bug fixing

Goal:
- remove the bugs that would break trust in public

Deliverables:
- tests for:
- sunrise-day rollover
- timezone handling
- muhurta indexing
- Panchanga output formatting
- manual spot checks on:
- Ujjain
- Varanasi
- current local machine timezone versus `Asia/Kolkata`

Agent tasks:
- QA agent:
- expand test coverage around edge cases
- review agent:
- inspect output for off-by-one errors and wrap bugs
- deployment-readiness agent:
- confirm response time and loading behavior are acceptable

Cut rule:
- no new features on day 6

## Day 7: Deploy and stabilize

Goal:
- public, usable, and not fragile

Deliverables:
- deployed page
- deployed API route
- smoke test on production
- fallback error state if geolocation fails
- final README or short doc for how the clock works

Agent tasks:
- deployment agent:
- build and deploy the Next app
- QA agent:
- smoke test the live URL on desktop and mobile
- documentation agent:
- add a short implementation note and conventions note
- review agent:
- verify production matches local output for the same inputs

Cut rule:
- if production bugs appear, fix correctness and stability before polishing copy or visuals

## Hard release checklist

Do not call the week done unless all of these are true:

- `/vedic-clock` loads in production
- `/api/vedic-clock` returns valid data
- Ujjain and Varanasi buttons work
- `Use my location` has a fallback if permissions are denied
- sunrise-day boundary works across pre-sunrise cases
- provenance is visible
- tests cover the main compute paths
- the page remains usable if the API request fails

## Daily working style

Use your AI agents like this:

- implementation agents for writing modules and tests
- review agents for catching numerics mistakes, API leaks, and off-by-one errors
- UI agents only after the route contract is stable
- do not run multiple agents on the same file set at once

Use friends for:
- reviewing numerics or astronomy assumptions
- checking backend API boundaries
- reviewing the production-ready PR before deploy

Do not use friends for:
- broad exploratory redesign in the middle of the week
- optional feature brainstorming before MVP is live

## Fastest path warning

The main way this slips is by trying to make it a full Panchanga platform in week one.

The fastest successful version is:
- one page
- one route
- two preset cities
- one geolocation flow
- one fixed muhurta mode
- visible provenance

Anything beyond that is week-two work.
