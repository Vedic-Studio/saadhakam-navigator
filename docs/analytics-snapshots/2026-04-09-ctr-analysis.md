# CTR Analysis — Sadhaka / opensadhaka.com

**Window:** 2026-03-10 → 2026-04-06 (28 days, GSC default lag of 2 days)
**Pulled:** 2026-04-09 via `/api/analytics/gsc-ctr-audit`
**Raw data:** `2026-04-09-gsc-ctr-audit-minimpr{25,50}.json`

GA4 data not included — `GA4_PROPERTY_ID` env var is not set anywhere (neither `.env.local` nor on Vercel), so referrer-by-AI-engine breakdown is unavailable. See §5.

---

## 1. Headline Numbers

| Metric | Value |
|---|---|
| Clicks | **25** |
| Impressions | **4,911** |
| CTR | **0.51%** |
| Avg. position | **16.48** |
| Daily impressions | ~175 |
| Daily clicks | <1 |
| Rich-result / AI-Overview impressions | **0** |

The site had **zero search-appearance-enriched impressions** in 28 days. No AI Overviews. No featured snippets. No rich cards. No video carousels. Sadhaka is only competing in the plain-blue-link SERP space, which is the slice of the SERP with the lowest CTR.

## 2. Diagnosis — What "Improve CTR" Actually Means Here

**This is not primarily a CTR-optimization problem.** It's a visibility stack with three layers, and CTR is the thinnest:

1. **Rank layer** — most pages rank position 15+. CTR at pos 15 is ~1.5% by benchmark; you can't "improve CTR" your way out of page 2.
2. **Appearance layer** — zero rich results. A page ranking #6 in plain blue links gets ~5% CTR; the same page with an AI Overview citation can be the only thing seen. Sadhaka is not competing on this layer at all.
3. **Snippet layer** (title + meta description) — for the ~10 pages that DO rank top 10, most get 0% CTR. This is the one true CTR problem and it's salvageable this week.

Fix all three in order of payoff, not in the order the question was asked.

## 3. The CTR-Only Work (Priority P1 — do this week)

Pages ranking in the top 10 with abnormally low CTR. These are where a better title/description converts impressions you already have into clicks without needing rank work.

| Page | Pos | Impr | Clicks | CTR | Expected CTR | Missed clicks |
|---|---|---|---|---|---|---|
| `/daily-spiritual-routine-beginners` | **5.7** | 171 | 0 | 0.00% | ~7% | **~12** |
| `/mantras/om-bram-brim-braum-sah-budhaya-namah` | 8.2 | 311 | 2 | 0.64% | ~3% | ~7 |
| `/practical-spiritual-practices` | 7.0 | 55 | 0 | 0.00% | ~4% | ~2 |
| `/compare/adi-shankaracharya-vs-ramanuja` | 7.8 | 66 | 0 | 0.00% | ~4% | ~3 |
| `/how-to-start-japa` | 8.5 | 227 | 3 | 1.32% | ~3% | ~4 |
| `/learn/sanskrit/bhakti` | 7.2 | 109 | 0 | 0.00% | ~4% | ~4 |
| `/ramana-maharshi-who-am-i` | 7.8 | 56 | 0 | 0.00% | ~4% | ~2 |
| `/how-to-read-upanishads-western-beginner` | 8.3 | 68 | 0 | 0.00% | ~3% | ~2 |
| `/what-is-prasad` | 10.4 | 199 | 1 | 0.50% | ~2.5% | ~4 |
| `/jyotish/panchang/tithis/shukla-panchami` | 9.0 | 115 | 1 | 0.87% | ~2.5% | ~2 |

**Combined missed clicks: ~42 clicks** — i.e., ~2.7× Sadhaka's entire current monthly traffic, from snippet rewrites alone.

### What to actually change

For each page, audit the `<title>` and meta description. The failure patterns I'd expect (cannot confirm without viewing each SERP):

1. **Title = slug-echo.** Something like "Daily Spiritual Routine for Beginners | Sadhaka". Generic. Does not telegraph a specific outcome, timing, or authority. Rewrite to lead with a number, an outcome, or a specific claim: *"A 20-Minute Daily Sadhana for Beginners (Morning/Evening Split)"*, *"Daily Spiritual Routine for Beginners: A Vedanta Teacher's 7-Step Template"*.
2. **Meta description = first paragraph slice.** Rewrite each as ≤155 characters, **second-person**, with a concrete promise and a primary-source credential. "Build a morning japa + evening svadhyaya routine in 20 minutes. Rooted in Upanishad sources, step-by-step."
3. **For the mantra pages** — title should include *meaning* and *when to chant*, not just the transliteration. A searcher who types `om bram brim braum sah budhaya namah` is not literate in the mantra; they want "what is this and how do I use it". Lead with that.
4. **For `/compare/*`** — comparison titles win with a *verdict-sounding* phrasing. "Shankara vs. Ramanuja: Seven Real Disagreements" outperforms "Adi Shankaracharya vs Ramanuja".
5. **For `/learn/sanskrit/*`** — these are fighting Wiktionary and sacred-texts.com for one-word intents. The only way to win CTR at position 7-12 is a title that promises *more than a definition*: *"Bhakti: Not Devotion in the Western Sense (Shankara vs. Ramanuja)"*.

### Verification after changes

- Wait 7 days (GSC reindex lag), re-run `/api/analytics/gsc-ctr-audit`, compare per-page CTR.
- Target: each of these ten pages >= 2% CTR within one reporting window.

## 4. The Rank-Then-CTR Work (Priority P2)

Pages with 50+ impressions ranking position 12+ — CTR is rate-limited by rank. These need rank work first.

| Page | Pos | Impr | Note |
|---|---|---|---|
| `/what-is-mantra` | **68.0** | 77 | Topic authority gap — pillar page should rank ≤5 |
| `/what-is-purushartha` | 39.8 | 51 | Short content or weak internal linking |
| `/learn/sanskrit/mantra` | 37.9 | 69 | Duplicated intent with `/what-is-mantra` — pick one canonical |
| `/learn/sanskrit/samskara` | 26.8 | 73 | Sanskrit-dictionary page losing to Wiktionary |
| `/learn/sanskrit/dharana` | 25.7 | 77 | Same |
| `/10-powerful-sanskrit-mantras` | 20.8 | 263 | **Highest-impression page on the site.** Rank fix here alone is the single biggest traffic lever. |
| `/philosophies` | 20.6 | 73 | Hub page ranking page 2 — hub pages should rank ≤10 |
| `/learn/sanskrit/moksha` | 17.5 | 97 | Cannibalizing `/what-is-moksha` if that exists |
| `/shaivism-vs-vaishnavism` | 16.4 | 58 | Comparison page with weak top-of-funnel signal |
| `/learn/sanskrit/prakriti` | 16.0 | 170 | Cannibalization candidate |

### Keyword cannibalization flag
`/learn/sanskrit/*` pages and the editorial `/what-is-*` / `/<concept>-explained` pages are likely targeting the same intents. GSC can't tell you which; you need to grep internal links and canonical tags. Quick test: for any Sanskrit term that has both `/learn/sanskrit/X` and `/what-is-X`, decide which is canonical and 301 the other.

## 5. The Missing Layer (Priority P0 — and the real ceiling)

**Zero AI Overview presence in 28 days.**

This is the loudest finding in the dataset and the reason why CTR optimization has a low ceiling today. Google's AI Overviews are eating informational query click-through at the top of the SERP; if you're not in them, the downstream CTR math doesn't matter much.

Sadhaka is nominally optimized for this via the `/llms.txt`, `/llms-full.txt`, `aeoAnswer` blocks, and JSON-LD already in the codebase. But being indexed in `llms.txt` is not the same as being *cited* by Google's AI Overview algorithm, which is a separate model that reads actual SERP pages and scores them for extractability and trust.

What this dataset specifically tells us to check:

1. **Run the `/seo-optimize` GEO Citability Assessment (§11.5) on the top-10 traffic pages right now.** The pages in §3 above are the ones ranking well in plain blue links — they should be the AI Overview candidates. If they score <8/10 on GEO Citability, rewrite the opening + add an explicit atomic-claim / trust-signal / comparison layer. This is the publish gate that was added to CLAUDE.md in the migration batch but hasn't been retroactively applied to existing content.
2. **Verify the schema layer is actually emitting**, not just written in source. `Article` + `FAQPage` schema on every article. `Organization` schema sitewide. View-source on `/daily-spiritual-routine-beginners` and confirm the JSON-LD is there. Google AI Overviews weights structured data heavily.
3. **Run the 7-phase answer-engine-optimization workflow Phase 1** (Answer Intent Research) for the Advaita cluster. Query ChatGPT / Perplexity / Google AI Overviews for 15 canonical Vedanta questions. Log whether Sadhaka is cited. If the answer is "never," you have a crawler-trust problem, not a content problem, and you need to fix the earned-citations signal first (Wikidata entry, scholarly outreach, etc. — Phase 6 of that workflow).

## 6. The Brand-Term Anomaly (Priority P2 — cheap fix)

Query `sadhaka`: 270 impressions, **0 clicks**, avg position 8.4.

People are literally searching the brand name, Sadhaka appears on page 1, and nobody clicks. The most likely causes, in decreasing order of probability:

1. **"Sadhaka" is a common Sanskrit noun** (= "seeker," "practitioner"). Most searchers typing this word are asking Google for the Sanskrit definition, not the website. Wiktionary, Wisdomlib, sacred-texts.com will be positions 1-7 above Sadhaka and will satisfy the query.
2. **The homepage title and meta description are not branded.** If the title is something like "Sadhaka — Vedanta, Upanishads, Classical Yoga Schools" and the first snippet line is a mission statement, there's nothing for a Sanskrit-definition searcher to latch onto.
3. **No sitelinks** — if the homepage had sitelinks in the SERP (About, Articles, Stotras), CTR would rise substantially.

### Fix
- Rewrite the homepage `<title>` to explicitly disambiguate: *"Sadhaka (opensadhaka.com) — The Living Library of Vedanta and Classical Sadhana"*. This signals both "this is a website," and "yes, 'sadhaka' is the name, and it's the word you searched for."
- Rewrite the homepage meta description to answer the definitional question in the first half and lead into the site in the second: *"Sadhaka (Sanskrit: a practitioner, one who seeks). Also the open library for Vedanta, Upanishad study, stotras, and daily sadhana — free to read."*
- Add or repair `Organization` schema with `sameAs` → Wikidata / any verified profiles. This unlocks brand-SERP sitelinks over time.
- **Do NOT try to outrank Wiktionary for the definition.** Instead, claim the *second* impression by making the brand SERP irresistible to the 5-10% of searchers who were actually looking for a website.

## 7. Instrumentation Fixes (Priority P1 — prerequisite for all of the above)

Sadhaka's analytics pipeline is broken on production. Cannot measure any of the recommended work without fixing these first:

1. **GSC is broken on Vercel.** `/api/analytics/gsc` returns 500: `ENOENT: no such file or directory, open '/var/task/.data/google-service-account.json'`. The service-account key file is under `.data/` which is `.gitignore`'d, so Vercel has no copy of it. **Fix:** stop reading from disk. Store the service account JSON as a base64-encoded Vercel environment variable (`GOOGLE_SERVICE_ACCOUNT_JSON_B64`), decode at runtime in `src/lib/google-auth.ts`. Fall back to the file path only for local dev.
2. **GA4 is broken everywhere.** `/api/analytics/ga4` returns 500: `GA4_PROPERTY_ID is required to fetch GA4 analytics data`. The env var is set in neither `.env.local` nor on Vercel. **Fix:** get the numeric property ID from Google Analytics admin (not the `G-S3DHYPPG9R` measurement ID — the numeric Property ID shown in Admin → Property Settings) and set it in both places.
3. **Content-audit endpoint is broken downstream** of GA4. Fixing (2) unblocks this.
4. **Add `searchAppearance` query** to the existing `fetchContentAuditData()` audit when you're already in `content-audit.ts`. The new `fetchGscCtrAudit()` includes it; the old dashboard does not. Cross-check should live in one place.

## 8. What to Do With the Data Pipeline Going Forward

`fetchGscCtrAudit()` is the minimum viable CTR diagnostic. Before the next iteration:

- Wire it into the dashboard UI at `/dashboard` (or whatever route is the analytics landing page) so the top-10 CTR opportunities surface on every load, not only when I curl the endpoint.
- Add a weekly cron (Vercel Cron) that snapshots the output to `docs/analytics-snapshots/YYYY-MM-DD-gsc-ctr-audit.json`, so period-over-period comparison is possible without manual re-pulls.
- Once GA4_PROPERTY_ID is set, add a sister function `fetchAiEngineReferrerData()` that queries GA4 for `sessionSourceMedium` filtered to `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, and aggregates by landing page. This closes the "are AI engines actually sending traffic yet" question that the GSC-only pull cannot answer.

## 9. Order of Operations (the TL;DR)

1. **Fix GSC/GA4 prod credentials** (§7) — prerequisite, ~1 hour.
2. **Rewrite titles and meta descriptions for the ten pages in §3** — biggest payoff per unit of time. Expected gain: ~30-40 extra clicks/month immediately, i.e., 2× the current monthly traffic.
3. **Run GEO Citability Assessment on those same ten pages** and rewrite their opening-direct-answer blocks to score ≥8/10 (§5). This is what unblocks AI Overview presence.
4. **Fix the homepage brand-term snippet** (§6).
5. **Rank work on the P2 pages** (§4) — structural content gaps and internal linking, a multi-week sprint.
6. **Phase 1 Answer Intent Research** on the top-2 clusters (Advaita + Mantras/Japa, since those are where existing traffic lives) to drive sprint 2 of content.

Step 1 is non-negotiable; everything else is measurement-blind without it. Step 2 is cheap; don't conflate it with steps 3 and onward even though they touch the same pages.
