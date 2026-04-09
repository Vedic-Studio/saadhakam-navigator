# Vedic Clock Build Phases

This document breaks down [Vedic Clock Research Report.md](/Users/ankitmishra/Developer/Sadhaka/Vedic%20Clock%20Research%20Report.md) into smaller execution phases and agentic workstreams without changing the report's technical choices, effort bands, or validation targets.

## Non-negotiable constraints from the report

- The platform must be deterministic, explainable, scalable, and auditable.
- The day boundary is sunrise, not midnight.
- The public-facing default should support the 30 muhurtas model with fixed 48-minute muhurtas, while allowing a disclosed variable sunrise-to-sunrise partition mode.
- The recommended production ayanamsha choice is library-defined Lahiri as implemented by Swiss Ephemeris.
- The required computation pipeline is: UTC and tzdb handling, sunrise and sunset engine, ephemeris engine, then Panchanga derivation.
- Validation must include NOAA reference equations, independent ephemeris cross-checking, and golden-reference comparison against IMD/PAC Rashtriya Panchang outputs.
- Provenance must expose algorithm version, ephemeris version, tzdb version, ayanamsha convention, and sunrise model.

## Delivery model for this build

The report's delivery bands and cost ranges were written for a conventional small product team. They are not the right planning model for this project if you are doing the bulk of implementation yourself with AI agents and occasional review help from friends.

Use this operating model instead:

- Builder model: one primary builder, supported by AI agents for implementation, analysis, refactors, test generation, and documentation.
- Human support model: occasional backend review, architecture review, and PR review from experienced friends.
- Planning basis: optimize for dependency order, verification gates, and reduction of rework, not for headcount-based budgeting.

Practical delivery bands for a solo builder with strong AI leverage:

- Phase 0 to MVP foundation: `2 to 6 weeks`
- MVP release candidate: `4 to 8 weeks`
- V1 with converters, charts, exports, and validation harness: `8 to 16 weeks`
- V2 with multi-engine accuracy modes and explanation layer: `3 to 6 months`

What will actually move the timeline:

- How quickly conventions are frozen in Phase 0.
- Whether Swiss Ephemeris licensing is resolved early or avoided.
- How much verification coverage is automated against NOAA and Rashtriya Panchang.
- How often you pause implementation to redesign architecture midstream.
- How much UI polish is included before the computation core is trusted.

Recommended execution stance for a solo builder:

- Keep one production path at a time.
- Ship baseline accuracy before gold accuracy.
- Treat provenance and validation as core product work, not later cleanup.
- Use friend review for numerics, API boundaries, and release readiness, not for basic implementation throughput.

## Phase 0: Convention Lock and Source Governance

Purpose: remove ambiguity before any production computation is written.

Success criteria:
- Every convention with output impact is fixed and versioned.
- Every external source has an owner, update policy, and licensing note.
- No unresolved ambiguity remains for sunrise, ayanamsha, tithi, yoga, nakshatra, karaṇa, timezone, or provenance display.

Agentic tasks:
- Product and domain agent:
- Freeze the first-release convention registry:
- `ayanamsha = lahiri`
- `muhurta_mode_default = fixed_48min`
- `sunrise_model = noaa_90.833`
- `vedic_day_boundary = sunrise`
- `panchanga_scope = vara, tithi, nakshatra, yoga, karana`
- Research and compliance agent:
- Confirm source stack exactly as recommended in the report:
- Tier A: JPL DE440 or DE441, IERS conventions, IANA tzdb
- Tier B: Swiss Ephemeris and NOAA equations
- Tier C: IMD/PAC Rashtriya Panchang for verification
- Legal and licensing agent:
- Review Swiss Ephemeris commercial licensing before it is accepted as a production dependency.
- Review Sanskrit text licensing and usage notes for any hosted verses or translations.
- Architecture agent:
- Define provenance schema fields and immutable version tags.

Dependencies:
- None. This phase must finish before implementation starts.

Main risk:
- Shipping before convention lock will create silent output drift and make later verification unreliable.

## Phase 1: Time Foundation and Reproducibility Layer

Purpose: make time handling correct before astronomical logic is layered on top.

Success criteria:
- UTC is the internal storage format.
- Local civil time is derived from tzdb using a real IANA tzid.
- TT conversion, leap-second handling, and versioned tzdb access are testable and reproducible.

Agentic tasks:
- Backend time agent:
- Build the internal time pipeline: UTC in, tzdb-based local time out, TT conversion for ephemeris evaluation.
- Data platform agent:
- Pin and package tzdb snapshots inside the compute image.
- QA and regression agent:
- Create timezone edge-case tests around offset changes and historical timezone transitions.
- Provenance agent:
- Emit tzdb version and time-conversion mode in every computation response.

Dependencies:
- Phase 0 convention lock.

Main risk:
- Incorrect timezone or leap-second handling will poison all downstream sunrise and Panchanga values.

## Phase 2: Sunrise and Sunset Engine

Purpose: establish the sunrise-anchored day model the rest of the platform depends on.

Success criteria:
- Sunrise, sunset, and solar noon are computed with NOAA equations using zenith `90.833°`.
- The engine supports local-date sunrise lookup and previous or next sunrise lookup.
- The sunrise-day boundary logic is correct for `t < sunrise_today`.

Agentic tasks:
- Astronomy engine agent:
- Implement NOAA-based solar declination, equation of time, hour angle, sunrise, sunset, and solar noon.
- API agent:
- Expose sunrise-day primitives as standalone internal APIs before they are embedded in the full clock endpoint.
- QA agent:
- Create regression tests against known NOAA sample dates and locations.
- Edge-case agent:
- Document unsupported or degraded cases for extreme latitudes, because the report notes limitations there.

Dependencies:
- Phase 1 time foundation.

Main risk:
- If sunrise is wrong, the Vedic day, muhurta index, and all user-facing day-boundary behavior become wrong.

## Phase 3: Ephemeris and Sidereal Core

Purpose: compute Sun and Moon longitudes correctly and reproducibly.

Success criteria:
- Tropical Sun and Moon ecliptic longitudes are available at a given instant.
- Sidereal conversion is available using Lahiri ayanamsha.
- Cross-engine comparison exists between the primary engine and an independent engine.

Agentic tasks:
- Astronomy platform agent:
- Integrate the primary ephemeris engine.
- Accuracy and validation agent:
- Stand up an independent comparison path so Sun and Moon longitude outputs can be diffed.
- Infrastructure agent:
- Pin ephemeris assets and versions inside the build image.
- Domain review agent:
- Approve Lahiri implementation and name it exactly in the convention registry and UI.

Dependencies:
- Phase 1 time foundation.
- Swiss Ephemeris licensing clearance if Swiss Ephemeris is used in production.

Main risk:
- Quiet ephemeris or ayanamsha drift will invalidate Panchanga outputs while looking plausible to users.

## Phase 4: Panchanga Kernel

Purpose: turn astronomical state into deterministic tithi, nakshatra, yoga, and karaṇa outputs.

Success criteria:
- Tithi is derived from wrapped lunar-solar elongation in 12-degree segments.
- Yoga is derived from sidereal solar plus lunar longitude in 27 equal segments of `13°20'`.
- Nakshatra is derived from sidereal lunar longitude in 27 equal segments of `13°20'`.
- Karaṇa is derived from half-tithi boundaries in 6-degree segments using a documented mapping table.
- Boundary-finding is implemented and tested for end times.

Agentic tasks:
- Panchanga engine agent:
- Implement exact segmentation formulas and boundary solvers.
- Numerical methods agent:
- Add robust bracketing and root-finding for tithi, yoga, nakshatra, and karaṇa end times.
- Domain correctness agent:
- Freeze and test the karaṇa mapping table against the report's fixed versus movable requirement.
- QA agent:
- Add continuity tests around `0/360` wrap and boundary transitions.

Dependencies:
- Phase 3 ephemeris core.

Main risk:
- Boundary-time bugs are more damaging than label bugs because they break observance trust and are hard to diagnose after release.

## Phase 5: Vedic Day and Muhurta Engine

Purpose: combine sunrise-day logic with public-facing Vedic time displays.

Success criteria:
- The system correctly computes the sunrise-to-sunrise owning day for any instant.
- Fixed 48-minute muhurta mode works as the default public mode.
- Variable sunrise-to-sunrise 30-way partition mode exists as an explicitly disclosed alternate mode.

Agentic tasks:
- Time-model agent:
- Implement `sunrise_today`, `sunrise_next`, and `minutes_from_sunrise` calculations exactly as the report pseudocode specifies.
- API agent:
- Return `sunrise_day_start`, `sunrise_day_end`, `muhurta_index`, and elapsed position within the muhurta.
- UX and content agent:
- Write the explanation for why fixed mode and variable mode can differ.
- QA agent:
- Test pre-sunrise ownership and rollover into the prior sunrise day.

Dependencies:
- Phase 2 sunrise engine.
- Phase 4 Panchanga kernel.

Main risk:
- If the product mixes fixed and variable muhurta semantics without disclosure, users will interpret correct outputs as defects.

## Phase 6: Versioned Compute API and Provenance Registry

Purpose: expose results through a stable service boundary with reproducibility built in.

Success criteria:
- A versioned stateless computation service exists.
- A provenance registry exists and every response includes exact conventions and versions.
- Caching keys match the report guidance.

Agentic tasks:
- API platform agent:
- Implement `/api/v1/vedic-clock/now` and internal compute endpoints for sunrise, Panchanga, and conversion primitives.
- Provenance agent:
- Emit ephemeris version, tzdb version, code version, ayanamsha, muhurta mode, and sunrise model.
- Performance agent:
- Add cache keys for sunrise and sunset by rounded `lat, lon, date, model`.
- Performance agent:
- Add boundary cache keys for tithi and yoga intervals by date range, ayanamsha, and ephemeris.
- Security agent:
- Apply API hardening aligned with the report's OWASP guidance: authentication, authorization, rate limits, inventory, and version management.

Dependencies:
- Phases 1 through 5.

Main risk:
- Without provenance, correctness cannot be audited after source data or code versions change.

## Phase 7: MVP Product Surface

Purpose: ship the report's MVP scope without mixing in V1 or V2 complexity.

Success criteria:
- Live clock face exists.
- Civil time and Vedic time can be shown together.
- Basic Panchanga values and end times are visible.
- Provenance drawer is visible to the user.

Agentic tasks:
- Frontend product agent:
- Build the live clock face with toggle support for civil 24-hour and 30-muhurta modes.
- Frontend product agent:
- Surface sunrise, sunset, day start, day end, tithi, nakshatra, yoga, karaṇa, and provenance.
- UX agent:
- Add the "explain this now" pattern for at least one core field in MVP, even if the richer retrieval layer is deferred.
- Accessibility agent:
- Ensure the interface exposes time values and calculation details in a screen-reader friendly way.

Dependencies:
- Phase 6 API and provenance layer.

Main risk:
- A visually complete UI without visible provenance will look finished while still failing the report's explainability requirement.

## Phase 8: Verification Harness and Release Gate

Purpose: prevent incorrect outputs from reaching production.

Success criteria:
- NOAA regression tests pass.
- Independent ephemeris diff tests pass within agreed tolerances.
- Golden-reference comparison against IMD/PAC Rashtriya Panchang is automated for supported cities and dates.
- Release is blocked on verification failures.

Agentic tasks:
- Validation agent:
- Build NOAA-based unit regression coverage for sunrise and equation-of-time outputs.
- Accuracy agent:
- Compare Sun and Moon longitudes across two engines.
- Almanac verification agent:
- Build the Rashtriya Panchang comparison harness for tithi, nakshatra, yoga, sunrise, and sunset.
- Release engineering agent:
- Wire the full validation suite into CI and deployment gates.

Dependencies:
- Phases 2 through 6.

Main risk:
- Spot checks are insufficient. The report explicitly calls for systematic regression against IMD/PAC outputs in the stronger validation mode.

## Phase 9: Production Hardening

Purpose: make the system stable under real load and safe to operate.

Success criteria:
- Cache hit rates and latency are measurable.
- Build images contain pinned ephemeris and tzdb assets.
- Error budgets and rollback procedures exist.
- Historical reproducibility is preserved across deployments.

Agentic tasks:
- SRE agent:
- Define deployment topology, health checks, rollback, and incident response for the compute service.
- Performance agent:
- Measure hot-path latency for `now` queries and optimize cache effectiveness.
- Observability agent:
- Add logs, metrics, and traces keyed by computation mode and provenance version.
- Release management agent:
- Prevent silent dependency upgrades to ephemeris data, tzdb, or convention tables.

Dependencies:
- Phase 8 verification gate.

Main risk:
- Production instability here is not just uptime risk. It is trust risk if a version drift changes answers for the same inputs.

## Phase 10: V1 Expansion

Purpose: deliver the report's V1 scope after the computation core is trusted.

Success criteria:
- Converters exist for civil time and Vedic units.
- Charts and exports are available.
- Validation harness is mature and part of normal delivery.
- Embed and share features are stable.

Agentic tasks:
- Product agent:
- Build converters for civil time, muhurta, ghaṭī, and nāḍikā.
- Frontend data-visualization agent:
- Add sunrise-to-sunrise charts, muhurta starts, and tithi change visualizations.
- Platform agent:
- Ship export formats, including developer-facing JSON export.
- Performance agent:
- Harden share and embed endpoints with cache-aware generation.

Dependencies:
- MVP release plus stable verification harness.

Main risk:
- Expanding feature surface before validation maturity will multiply debugging cost.

## Phase 11: V2 Accuracy and Education Layer

Purpose: deliver the report's advanced product and research layer.

Success criteria:
- Multi-engine accuracy modes exist.
- Explanations are retrieval-backed and tied to exact provenance.
- Localization and accessibility polish are complete.

Agentic tasks:
- Accuracy agent:
- Add baseline versus gold computation modes, keeping provenance explicit.
- LLM and retrieval agent:
- Build explanation service over licensed Sanskrit verses, translations, curated notes, and internal "how we compute" documents.
- Localization agent:
- Add localization without altering core computation semantics.
- Accessibility agent:
- Finalize structured educational mode and inclusive interaction patterns.

Dependencies:
- Stable V1 platform.

Main risk:
- Explanations that are not provenance-bound can introduce interpretive drift and contradict the engine.

## Recommended agent sequencing

Order of execution:
1. Convention and licensing
2. Time foundation
3. Sunrise engine
4. Ephemeris core
5. Panchanga kernel
6. Vedic day and muhurta engine
7. API and provenance
8. MVP UI
9. Verification gate
10. Production hardening
11. V1 expansion
12. V2 accuracy and explanation layers

Parallelizable work:
- Licensing review can run in parallel with architecture drafting.
- Frontend design can start once the API contract and provenance schema are frozen.
- Validation harness construction can start as soon as sunrise and Panchanga primitives exist.
- Documentation work can begin in Phase 0 and continue alongside implementation.

## Production release gates

Do not ship production until all of the following are true:

- Convention registry is frozen and versioned.
- Swiss Ephemeris licensing position is resolved.
- tzdb and ephemeris versions are pinned in the deployable artifact.
- NOAA sunrise regressions pass.
- Cross-engine longitude checks pass.
- Rashtriya Panchang comparison coverage passes for the supported release matrix.
- Provenance is visible in both API responses and UI.
- Rollback and observability are in place.

## Mapping back to the report timeline

The report's timeline remains intact. This breakdown simply expands it into execution phases:

- Foundations:
- Convention choices
- Time foundation
- Ephemeris integration
- Sunrise and sunset engine
- MVP:
- Vedic day and muhurta engine
- Panchanga core
- Provenance endpoints and docs
- V1:
- Converters
- Charts
- Exports
- Validation harness
- Caching hardening
- V2:
- Multi-engine accuracy modes
- LLM explanations and retrieval
- Localization
- Accessibility polish
