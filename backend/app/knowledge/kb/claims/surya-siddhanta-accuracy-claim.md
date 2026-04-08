---
slug: surya-siddhanta-accuracy-claim
title: "Is the Surya Siddhanta 'within 1% of NASA' on orbital periods?"
type: claim
aliases: [surya siddhanta accuracy, surya siddhanta nasa, surya siddhanta planetary periods]
updated: 2026-04-09
confidence: medium
claim_type: numerical
status: partially-supported
scope: "Whether the Surya Siddhanta's numerical parameters for planetary and lunar motion match modern values at the 1% level, and in what sense."
anchors:
  texts: [surya-siddhanta]
  people: [plofker]
  concepts: []
sources:
  - "W. D. Whitney & Ebenezer Burgess, 'Translation of the Surya Siddhanta', Journal of the American Oriental Society 6 (1858) — early translation, use with care"
  - "Kim Plofker, Mathematics in India: 500 BCE – 1800 CE, Princeton 2009, ch. 3"
  - "David Pingree, 'History of Mathematical Astronomy in India' in Dictionary of Scientific Biography (1981)"
---

## Plain-language statement

A popular claim says the Surya Siddhanta (a Siddhanta-period Indian astronomical treatise) computes planetary orbital periods to "within 1% of NASA values" or even "within a few seconds." The defensible version is narrower and more interesting: for some parameters — notably the sidereal year and lunar month — the Surya Siddhanta is remarkably close to modern values (within a fraction of a percent, sometimes within seconds on the lunar period). For other parameters — including several planetary periods — the error is larger, in some cases hours to days. A blanket "all orbits within 1% of NASA" overstates.

## Decomposed sub-claims

1. **"The Surya Siddhanta's value for the sidereal year is accurate to within a few minutes of the modern value."** — **Supported, with the caveat that the exact figure depends on which recension of the text is used.** The classical figure is in the range 365.2588 days; the modern sidereal year is ~365.2564 days. The error is on the order of minutes per year, not days.
2. **"The Surya Siddhanta's lunar month is accurate to within a few seconds of the modern value."** — **Supported.** Whitney's 1858 evaluation notes accuracy on the order of a second per month — remarkable for any pre-telescopic culture.
3. **"The Surya Siddhanta's planetary periods are all within 1% of modern values."** — **Partially supported, scope-dependent.** Mercury, Venus, and Mars are within a few minutes per period in Whitney's analysis. Jupiter is within several hours. Saturn is off by about six and a half days per revolution. Calling the last "within 1%" requires a loose reading of "within 1%."
4. **"The Surya Siddhanta is the product of pre-telescopic naked-eye astronomy."** — **Supported.** The tradition predates the telescope by centuries. That makes the accuracy of the lunar and solar parameters genuinely remarkable.
5. **"The Surya Siddhanta's model is heliocentric."** — **Not supported.** The model is geocentric, like Ptolemaic astronomy and unlike Aryabhata's partial (but debated) heliocentric hints. Claims that "ancient India had heliocentrism" typically conflate Aryabhata with Surya Siddhanta, or read later interpretations back into the text.
6. **"Modern statistical corrections can bring the Surya Siddhanta model to NASA-level accuracy."** — **Supported only with caveats.** Recent technical papers apply polynomial corrections to the Surya Siddhanta framework and report improved fit to JPL ephemerides. These corrections are modern additions; the unmodified classical parameters do not achieve this accuracy.

## Evidence for

- **Primary**: The Surya Siddhanta text itself (various recensions).
- **Modern scholarship**:
  - Whitney's 1858 JAOS translation includes a parameter-by-parameter accuracy evaluation. This is an "early translation" in the sense tagged in SCHEMA.md — use with cross-checking — but its numerical analysis is the baseline.
  - Plofker (2009) situates the accuracy claims in their textual and historical context.
  - David Pingree's work on Indian mathematical astronomy is the authoritative modern treatment.
  - Recent technical papers (Bhusal 2025, others) compare Surya Siddhanta parameters to JPL ephemerides with explicit error bounds for each planet.

## Evidence against / counterpoints

- Whitney's own numbers make clear that Saturn's period is off by ~6.5 days per revolution — calling this "within 1%" requires dividing 6.5 days by Saturn's ~29.5-year period, which yields ~0.06% if you take the ratio, but 6.5 days is not "within a second" and the viral framing blurs these.
- The classical parameters were refined over time through multiple recensions. "The Surya Siddhanta" is not one fixed text; there are meaningful differences across manuscript traditions, and the accuracy figures depend on which recension is used.
- The model is geocentric and epicyclic, structurally similar to Ptolemy. The accuracy reflects careful observational data and algebraic fitting, not a physically superior model.

## Scope boundaries

- This claim is **not** denying that the Surya Siddhanta is an impressive work of pre-telescopic astronomy. It is — and the lunar and solar parameters are particularly striking.
- This claim is **not** about whether India had careful astronomical observation. It did, clearly, for centuries.
- This claim **is** pushing back against the specific "within 1% of NASA" viral framing, which selectively cites the best-fit parameters while hiding the worse ones and also misrepresents what "1%" means.

## Reusable examples

- **The lunar month.** Surya Siddhanta: ~29.5305556 days. Modern: ~29.5305888 days. Difference: ~0.4 seconds. This is the parameter that powers most of the "remarkable accuracy" claims and it is genuinely remarkable.
- **The sidereal year.** Surya Siddhanta: 365.2588 days (common figure). Modern: 365.2564 days. Error: ~3.5 minutes per year. Still impressive for naked-eye astronomy.
- **Saturn's period.** Surya Siddhanta's figure is off by about 6.5 days per revolution relative to the modern value. This is within 0.06% of the period but is also the parameter least compatible with the "within a few seconds" framing.
- **What "within 1%" means.** If a claim cites "1% of NASA," always ask: "1% of what? The period, the position at a given date, the synodic period, the orbital elements?" The honest answer varies by parameter and is why the blanket claim misleads.

## When this claim matters

- When a reader lands on "Surya Siddhanta accuracy," "ancient India astronomy NASA," or "did ancient India know orbital mechanics."
- When writing any piece on the history of Indian astronomy. Getting the scope right is the credibility move.
- When arguing with either a debunker ("it's all wrong") or a hype-promoter ("it's all perfect") — this claim lets you hold the defensible middle with receipts.
