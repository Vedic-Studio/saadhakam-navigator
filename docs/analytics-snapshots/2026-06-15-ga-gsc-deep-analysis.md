# GA4 + GSC Deep Analysis — 2026-06-15

**Data window:** GSC 28d = 2026-05-16 → 2026-06-13 · 90d back to 2026-03-16 · 16mo back to 2025-02-13
**Property:** `sc-domain:opensadhaka.com` · **Auth used:** ADC (gcloud) · **Raw dump:** `data/gsc/gsc-dump-2026-06-13.json` · **Analysis JSON:** `data/gsc/gsc-analysis-2026-06-13.json`

---

## 0. Pipeline health (read this first — two pipes are broken)

| Source | Status | Detail |
|---|---|---|
| GSC via **ADC** | ✅ working | `gsc-pull-comprehensive.mjs` + `gsc-analyze.mjs` + `gsc-diagnose.mjs` (with `GSC_AUTH=adc`) all pulled clean. |
| GSC via **service account** | ❌ **403 forbidden** | `gsc-pull-snapshot.mjs` (and anything using `.data/google-service-account.json`) fails: *"User does not have sufficient permission for site."* The SA `sadhaka-gsc-reporting@sadhaka-seo.iam` is **not** a verified user on the property. |
| **GA4** (behavioral) | ❌ **no access, both paths** | (a) `GA4_PROPERTY_ID` is unset in every env/config. (b) Service account: GA4 Admin auth OK but **0 properties visible** → never granted access. (c) ADC: `ACCESS_TOKEN_SCOPE_INSUFFICIENT` (ADC logged in without the analytics scope). |

**Consequence:** we have **zero behavioral data** — no sessions, engagement rate, traffic-source mix, faith-finder quiz funnel, email-capture conversions, or AI-engine referral tracking (chatgpt/perplexity/claude). Everything below is **GSC-only** (search-side). This GA4 gap was flagged on May 19 and is still open.

**To fix GA4 (user actions, ~10 min):** grant `sadhaka-gsc-reporting@sadhaka-seo.iam.gserviceaccount.com` *Viewer* on the GA4 property, find the numeric property ID (Admin → Property Settings), and add `GA4_PROPERTY_ID=<id>` to `.env.local`. Then `npm run analytics:snapshot:ga4 -- --check` verifies. (Alternatively re-run `gcloud auth application-default login --scopes=...analytics.readonly` and add an ADC path to the GA4 script.)

---

## 1. Headline: the CTR rewrites finally got adopted — traffic is inflecting up

The single most important finding. Weekly clicks/CTR over 90 days:

```
2026-03-15 →  1 clk ·  599 impr · 0.17%
2026-03-29 → 10 clk · 2060 impr · 0.49%
2026-04-19 → 21 clk · 5502 impr · 0.38%
2026-05-03 →  9 clk · 3981 impr · 0.23%   ← trough
2026-05-17 → 18 clk · 3266 impr · 0.55%
2026-05-24 → 33 clk · 4297 impr · 0.77%
2026-05-31 → 50 clk · 5282 impr · 0.95%
2026-06-07 → 54 clk · 4916 impr · 1.10%   ← latest
```

- **28d clicks: 156 vs prior-28d 64 = +143.8%.** Impressions flat (~19.1k both windows) → **this is entirely a CTR/presentation win, not a visibility win.**
- **Site CTR 0.81% (28d), 1.10% (last 7d)** — up from 0.32% on May 19. The May-7 dashboard target was 1.5% by "week 8"; we're tracking toward it ahead of impressions growth.
- **Interpretation:** the title/meta rewrites that were "deployed but not yet rotated by Google" on May 19 have now been adopted. The lever worked. Impressions are the *next* ceiling.

---

## 2. The core problem (unchanged): a discoverability surplus with a click deficit

- **1,230 distinct pages have earned impressions over 16 months; 1,087 of them (88%) have never earned a single click.** Google is surfacing the corpus broadly but it converts to clicks only at the very head.
- 16mo totals: **258 clicks / 47,220 impressions (0.55% lifetime CTR).** Essentially *all* traffic is from the last 90 days (252 of 258 clicks).
- Diagnosis from May still holds: the bottleneck is **entity authority + SERP presentation**, not content volume. We rank (often pos 5-12) but get out-clicked by Wikipedia/wisdomlib/Britannica on shared SERPs, and the long tail surfaces at pos 8-50 where CTR is near zero by definition.

---

## 3. Issues & errors, ranked

### 🔴 P1 — www / non-www host duplication (canonical leak)
Both `https://www.opensadhaka.com/...` and bare `https://opensadhaka.com/...` are indexed as separate URLs.
- **48 non-www URLs leaking 486 impressions / 4 clicks in 28d**, each a duplicate of an existing www page.
- Worst offenders: `/texts/bhagavad-gita/chapter-10/shloka-36` (80 impr non-www), `/mantras/...budhaya-namah` (63 impr non-www, *on top of* 910 on www), `/stotras/lalita-sahasranama/trigu-mb` ranking **pos 1.9** on the wrong host.
- **Impact:** splits ranking signals across two hosts, dilutes consolidation, wastes crawl budget. **Fix:** enforce a single host with a 301 from non-www → www (Vercel domain redirect / `next.config.ts` redirect or middleware) and confirm canonical tags all point to www. Verify `NEXT_PUBLIC_SITE_URL` is the www origin everywhere.

### 🔴 P1 — the biggest impression magnet converts at ~0%
`/mantras/om-bram-brim-braum-sah-budhaya-namah` (Budha/Mercury beej mantra): **973 impr combined, 6 clicks = 0.62% CTR at pos 7.6.** It is the single largest impression generator on the site and it leaks almost all of it. Query "om bram brim" alone = 169 impr, 0 clicks, pos 8.2. The whole navagraha-mantra cluster shares this profile (`...suryaya namah`, `...chandraya namah` etc.). **Fix:** title/meta rewrite tuned to the actual queries (transliteration + "meaning, benefits, how to chant"), plus an AEO answer block. This one page is worth more than most new articles.

### 🟠 P2 — high-rank / zero-click factual pages (zero-click SERP capture)
`/sanatan-history/evidence/rakhigarhi-largest-site`: **426 impr, 0 clicks at avg pos 4.3.** Drill-down shows it ranks **pos 2-3 for "rakhigarhi size compared to mohenjo-daro", "rakhigarhi size hectares"** etc. — pure factual/numeric queries Google answers in-SERP (featured snippet / AI Overview) without a click. Same pattern on `/sanatan-history/dynasties/brihadratha` (332 impr, 0 clk, pos 8) and `/compare/ashtavakra-gita-vs-bhagavad-gita` (251 impr, 0 clk).
- This is **half-loss, half-opportunity**: we're likely being *cited* (GEO win) but earning no traffic. **Action:** (a) confirm via live SERP whether an AI Overview / snippet is quoting us; (b) restructure these pages so the snippet answers the narrow fact but the title/teaser baits the click for the fuller comparison ("…and 6 other things excavation revealed").

### 🟠 P2 — desktop is the dead channel
Desktop: **10,333 impr but only 41 clicks (0.40% CTR, avg pos 12.4).** Mobile: 7,892 impr, 113 clicks (1.43%, pos 7.8). Desktop gets *more* impressions but ranks ~5 positions worse and converts 3.5× lower. Worth a desktop-specific SERP audit (title truncation, sitelinks, above-the-fold on desktop template).

### 🟡 P3 — brand-term bleed persists
`sadhaka` = **123 impr, 0 clicks, pos 10.3**; `sadhaka meaning`, `sadhaka ai`, `yoga sadhaka` all 0-click. Wiktionary owns the noun SERP. Still not captured (was on the May 19 list). Homepage title/meta + Org `sameAs` → Wikidata is the cheap fix. Also note `site:www.opensadhaka.com` showing 46 impr at pos 40 is just someone auditing us — ignore.

### 🟡 P3 — sitemaps clean, no GSC-side errors
16/16 sitemaps registered, **0 errors**. No coverage errors surfaced by the diagnostic. The "✗ errors=0" rendering in `gsc-analyze` is a cosmetic glyph bug, not a real error (cross-checked against `gsc-diagnose`, which shows all ✓). Indexing health is not the problem here.

---

## 4. What's working (double down)

- **Vishnu Sahasranama long-tail** is the quiet winner. `stotras` is now the #1 click category (**67 clicks / 444 pages**), led by shloka-83 (10 clk, pos 6.5), shloka-27 (6 clk, pos 7.3), shloka-87, shloka-103. Verse-level pages rank pos 2-7 for "Nth shloka of vishnu sahasranamam". The 1000-name seed is paying off at the verse level — **finishing the per-name analysis is high-ROI.**
- **`/10-powerful-sanskrit-mantras`**: 17 clicks, top page, pos 13.5 — and it's still on page 2. Pushing this to page 1 (internal links + depth) is a clear win; it already out-clicks everything at a worse position.
- **TRANSLATED_RESULT** is our best-converting search appearance (153 impr, **3.27% CTR**) — Google is serving translated versions to non-English users. India (78 clk, 1.19%) + UAE/France (2.8% CTR) suggest a real non-Western-English audience. Hreflang / language signals could amplify this.
- **Geography:** India 78 clk / USA 27 clk are the volume; AUS/UAE/FRA convert higher on thin volume.

---

## 5. Striking-distance (pos 8-20, ≥50 impr) — quick wins
Thin this window (impressions are concentrated): `om bram brim` (169 impr, pos 8.2), `sadhaka` (123, pos 10.3), `shukla panchami` (71, pos 8.1). All three map to fixes already listed above (navagraha mantra rewrite, brand fix, panchang page). The broader CTR-underperformer list (lost clicks at benchmark) is the better work queue:

```
-31 clk  rakhigarhi-largest-site            426 impr  0.00%  pos 4.3   (zero-click factual)
-20 clk  om-bram-brim-braum-sah-budhaya     910 impr  0.44%  pos 7.6   (mantra rewrite)
-9  clk  vishnu-sahasranama/shloka-46       240 impr  0.83%  pos 6.5
-9  clk  dynasties/brihadratha              332 impr  0.00%  pos 8.0
-9  clk  bhagavad-gita/ch6/shloka-11        263 impr  0.00%  pos 7.4
-7  clk  ramana vs nisargadatta             256 impr  0.78%  pos 7.0
-6  clk  ashtavakra-gita-vs-bhagavad-gita   251 impr  0.00%  pos 8.8
```

---

## 6. Recommended next actions (priority order)

1. **Fix GA4 access** (user, 10 min) — we are flying blind on conversions/engagement/AI-referrals. Highest leverage because it unblocks all behavioral measurement.
2. **Kill the host duplication** — 301 non-www → www, audit canonicals. Stops signal-splitting across 48+ URLs.
3. **Rewrite the navagraha mantra cluster** (titles/meta/AEO blocks) — ~973 impr from one page at 0.6% CTR is the largest single recoverable pool.
4. **Triage the zero-click factual pages** (rakhigarhi, brihadratha, comparisons) — confirm AI-Overview citation; rewrite teasers to bait the click.
5. **Finish Vishnu Sahasranama per-name analysis** — the only proven, compounding content win in the data.
6. **Homepage brand-term fix** for `sadhaka` — cheap, still unaddressed since May.
7. **Re-fix the service-account path** (or standardize on ADC) so `analytics:snapshot:gsc`/`ga4` npm scripts work without manual `GSC_AUTH=adc`.

**Dashboard metric to keep watching:** weekly site CTR. 0.17% (Mar) → 1.10% (now). Target 1.5%. The next phase is lifting *impressions* (entity authority), since CTR gains alone are near their ceiling on a flat impression base.

---

## 7. GA4 behavioral data — NOW UNBLOCKED (added 2026-06-15, property 526473437)

GA4 access was granted (service account → Viewer) and `GA4_PROPERTY_ID=526473437` set. This is the behavioral half that was missing from §0–6. It **substantially changes the strategic read**: the site is far less Google-dependent than GSC alone implied.

### 7.1 Traffic mix (28d: 2026-05-18 → 2026-06-14) — 615 sessions / 534 users / 1,174 pageviews
| Channel | Sessions | Share | Engagement |
|---|---|---|---|
| (direct) / none | 199 | 32% | 13% ⚠️ |
| google / organic | 179 | 29% | 45% |
| **AI assistants (ChatGPT 115 + Perplexity 2)** | **117** | **19%** | 22-59% |
| bing / organic | 57 | 9% | 51% |
| duckduckgo / yahoo / ecosia | ~40 | 7% | 50-67% |
| copilot | ~9 | 1.5% | 25-60% |

**The headline GA4 finding: ~19% of all sessions come from AI assistants (almost all ChatGPT), and this was 100% invisible in GSC.** Combined with Bing/DDG/Yahoo/Ecosia/Copilot (~17%), **non-Google sources drive ~36% of traffic.** Google organic is only ~29%. The GEO/AEO investment (llms.txt, AEO blocks, the claims corpus) is working — and the §3 "zero-click factual pages" (Rakhigarhi etc.) that earn 0 Google clicks are very likely the pages being *cited* in ChatGPT. They are not dead weight; they are GEO assets.

### 7.2 Growth — sessions nearly tripled off the May plateau (90d weekly)
```
Mar 17 →  35 ·  Apr ~70 plateau · May 13 → 80 · May 20 → 121 · May 27 → 159 · Jun 3 → 193 · Jun 10-14 (5d) → 123 (~172/wk pace)
```
Mirrors the GSC click acceleration. 90d totals: 1,179 sessions / 965 users / 2,441 pageviews.

### 7.3 Conversion layer is the real bottleneck now 🔴
The faith-finder quiz is the site's primary lead magnet, and it is converting ≈0:
```
/faith-finder pageviews: 18  →  faith_finder_quiz_start: 7  →  quiz_complete: 1  →  email_capture: 1
```
Out of 615 sessions, 1 email captured. cta_click=36 total. Traffic is growing fast but there is no working capture mechanism to convert it. With AI/organic now sending real engaged users, **fixing the faith-finder funnel (or adding a simpler email capture) is the highest-leverage conversion work.** `seo_article_read` fired 456× — readers ARE engaging with content; they just have nothing to convert into.

### 7.4 Other GA4 signals
- **Engagement rate 35.8%** overall is low, dragged down by the 199 (direct)/13% bucket. Organic + AI engage at 45-67%. The (direct) cohort (high new-user %, 13% engagement, paired with 596 `app_open` events) looks partly bot/untagged/referrer-stripped — treat "direct" volume with suspicion; real engaged traffic is organic + AI.
- **GA4 top pages differ from GSC top clicks:** `/stotras/shiva-tandava-stotram` is the #1 GA4 page (84 pv) but barely appears in GSC clicks → its audience comes from direct/AI/referral, not Google search. The stotra corpus has a real off-search audience.
- **Microsoft ecosystem matters:** Bing organic (57) + Copilot (~9) ≈ 11%. Worth keeping Bing/IndexNow submission healthy.

### 7.5 Revised priorities given GA4
1. **Fix the faith-finder conversion funnel** (new #1 — traffic is here, capture is broken).
2. Keep feeding the GEO engine (it's 19% of traffic): finish the claims public routing, AEO blocks, llms.txt completeness — these drive the ChatGPT citations.
3. The Google-CTR work (§1-5) still matters but Google is now only ~29% of the pie — weight effort accordingly.
4. Add weekly **AI-referral sessions** and **email captures** to the dashboard alongside site CTR.
