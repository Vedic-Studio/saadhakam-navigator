# GSC Traffic Strategy — Sadhaka

**Date**: 2026-05-07
**Window**: 28 days (2026-04-07 → 2026-05-05); deltas vs prior 28d (2026-03-09 → 2026-04-06)
**Source**: GSC Search Analytics API + Sitemaps API, full pull at `data/gsc/gsc-dump-2026-05-05.json`
**Author**: Generated from analysis at `data/gsc/gsc-analysis-2026-05-05.json`

---

## TL;DR — the only number that matters

| Metric | Last 28d | Prior 28d | Δ |
|---|---|---|---|
| Clicks | **52** | 25 | +108% |
| Impressions | **16,074** | 5,153 | +212% |
| Site CTR | **0.32%** | 0.49% | **−35%** |
| Avg position (28d top page) | varies | varies | improving |
| 90d clicks | 78 | — | — |
| 16-month clicks | 78 | — | (i.e. all our traffic is from the last 90 days) |

**Impressions tripled, CTR collapsed, clicks barely grew.** Google is feeding us 600+ daily impressions vs 270 a month ago, but our SERP presentation is so weak that almost nobody clicks. We are sliding into a CTR death spiral: more visibility, no engagement → next ranking refresh, Google demotes us. We have **at most one quarter** to fix CTR before the algorithm reads our user-engagement signals as "no one wants this" and pulls the impressions back.

The single highest-leverage action right now is **NOT writing more content**. It is rewriting **titles, meta descriptions, and OG tags** for the ~25 pages currently ranking pos 5-15 with hundreds of impressions and zero clicks. Writing more articles before fixing the SERP presentation is pouring water into a leaky bucket.

---

## 1. Diagnosis — three problems stacked

### Problem 1: CTR catastrophe on already-ranking pages

We rank in striking distance (pos 5-15) for ~25 pages, but our CTR on those positions is 0.0–0.5% versus a 2.4–7.2% benchmark. Lost clicks at benchmark CTR for **just the top 10 of these pages = ~104 clicks/month** — i.e. doubling our entire site traffic by changing titles alone.

The page-level worst offenders (28d, sorted by clicks lost at benchmark for that position):

| Page | Pos | Impr | CTR | Bench | Lost @ bench |
|---|---|---|---|---|---|
| `/what-is-maya` | 6.5 | 330 | **0.00%** | 4.7% | −16 |
| `/advaita-vedanta-explained` | 8.0 | 592 | **0.00%** | 2.6% | −15 |
| `/compare/ashtavakra-gita-vs-bhagavad-gita` | 7.9 | 562 | 0.53% | 2.6% | −12 |
| `/` (homepage) | 9.2 | 508 | **0.00%** | 2.4% | −12 |
| `/compare` (hub) | 7.4 | 256 | **0.00%** | 3.5% | −9 |
| `/how-karma-dharma-work` | 8.9 | 372 | **0.00%** | 2.4% | −9 |
| `/how-to-start-japa` | 10.2 | 382 | **0.00%** | 2.2% | −8 |
| `/learn/sanskrit/nirvana` | 8.3 | 298 | **0.00%** | 2.6% | −8 |
| `/philosophies` (hub) | 8.7 | 348 | **0.00%** | 2.4% | −8 |
| `/daily-spiritual-routine-beginners` | 7.5 | 317 | 0.32% | 2.6% | −7 |
| `/compare/atman-vs-brahman` | 16.8 | 196 | 0.00% | 1.0% | −2 |
| `/learn/sanskrit/karma` | 12.7 | 179 | 0.00% | 1.0% | −2 |
| `/how-to-read-upanishads-western-beginner` | 8.5 | 176 | 0.00% | 2.6% | −5 |
| `/learn/sanskrit/moksha` | 6.5 | 152 | 0.00% | 4.7% | −7 |
| `/can-i-chant-a-mantra-without-initiation` | 9.5 | 125 | 0.00% | 2.4% | −3 |

These are **already winning the ranking battle and losing the SERP click battle**. The cost to fix is one PR per page (title + meta + maybe OG image). Estimated total fix cost: 1–2 days. Estimated lift: ~100 clicks/month.

### Problem 2: Topic gaps where Google sees us as relevant but we're thin

We get matched to ~600+ impressions on **Tantra** queries, ranking deep at pos 75–95 — Google has decided our content is *somehow related*, but ranks it deep because we don't have authoritative coverage. The site has no real Tantra hub.

| Cluster | 28d impr | 28d clicks | CTR | Top query position |
|---|---|---|---|---|
| **tantra** (22 queries) | **612** | 0 | 0.0% | pos 70-95 (deep) |
| **vedanta / advaita / atman / brahman** (65 queries) | 221 | 0 | 0.0% | pos 5-15 mostly |
| **bhagavad gita** (51 queries) | 390 | 1 | 0.3% | pos 7-9 cluster |
| **sanskrit etymology + words** (140 queries) | 461 | 1 | 0.2% | varies; long-tail academic queries rank 4-15 |
| **ashtavakra gita** (12 queries) | 282 | 1 | 0.4% | pos 7-9 |
| **panchang / tithi** (36 queries) | 95 | 2 | **2.1%** | pos 6-10 (best CTR cluster) |
| **upanishads** (54 queries) | 116 | 0 | 0.0% | pos 8-76 mixed |
| **yoga (general)** (48 queries) | 121 | 0 | 0.0% | varies |
| **mantra (Sanskrit framing)** (38 queries) | 148 | 1 | 0.7% | pos 10-55 |

Tantra is the loudest signal: huge volume, terrible position, no clicks. The fix is content depth + entity weight, not titles. **A pillar Tantra cluster (hub + 8-12 spokes covering Shaiva / Shakta / Vaishnava / kundalini / pancha-makara / Vamachara vs Dakshinachara / 64 tantras / ritual structure) pays back the moment we publish.**

### Problem 3: Entity invisibility on our own brand name

`sadhaka` query — **394 impressions in 28 days, position 9.7, ZERO clicks.** People are searching the word "sadhaka," landing us on page 1, and choosing other results. Either:
- Our title/meta doesn't include the word "Sadhaka" prominently (Google bolds matches in SERP)
- Other authority sources (Wikipedia, dictionaries) own the SERP for the meaning of "sadhaka" and our brand listing reads as one more dictionary entry
- We don't show up as a "brand" — no Knowledge Panel, no Wikipedia, no consistent named editor

This is the entity-authority problem from the May 2026 thesis (`memory/project_traffic_strategy_thesis.md`) made concrete: even when Google ranks us page 1, the SERP doesn't read as "this is the Sadhaka platform."

### Problem 4 (latent): geographic and device CTR collapse

| Country | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| India | 22 | 2,911 | **0.76%** | 11.0 |
| USA | 6 | 6,672 | 0.09% | 14.4 |
| Canada | 5 | 481 | 1.04% | 16.7 |
| Turkey | 4 | 131 | 3.05% | 7.6 |
| Netherlands | 3 | 110 | 2.73% | 15.1 |

USA gives us **2.3× more impressions than India but 73% fewer clicks**. US SERPs are more competitive: more authority sites in the same SERP, more sitelinks, more "answer box" features pushing organic results below the fold. Our titles don't carry the US-friendly cues (year qualifiers, "complete guide", "the [topic] explained"). India audience clicks because the topic is culturally close; US audience needs harder click-triggers.

| Device | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| **Desktop** | 22 | 11,670 | **0.19%** | 17.2 |
| Mobile | 25 | 3,558 | 0.70% | 10.2 |
| Tablet | 5 | 76 | 6.58% | 8.8 |

Desktop accounts for 73% of impressions but only 0.19% CTR. Desktop SERP is more crowded (sitebar features, more results visible, comparison shopping behavior). The same titles read as "click magnet" on mobile and "boring" on desktop because of the surrounding context.

---

## 2. What's working — double down

These are the validated signals from 28d data. Each gets dedicated investment in the plan below.

### 2.1 Comparison pages (`/compare/*`) are the workhorse

41 pages produced **14 clicks (27% of total clicks)** off **2,324 impressions** at 0.6% CTR. Best clicks-per-page of any cluster. Specific wins:

- `/compare/ashtavakra-gita-vs-bhagavad-gita` — 562 impr, pos 7.9, owns the entire "[X gita] vs [Y gita]" cluster
- `/compare/ramana-maharshi-vs-nisargadatta-maharaj` — pos 5.9, 1.5% CTR
- `/compare/psychology-vs-yoga-philosophy` — pos 20, still pulling 3 clicks
- `/compare/japa-vs-meditation` — pos 8.4, 1 click in 33 impr
- `/compare/mantra-vs-prayer` — pos 15.6
- `/compare/mindfulness-vs-dhyana` — pos 14.4

**Action**: take the comparison cluster from 41 → 200 pages. Every "X vs Y" pair we plausibly cover is winnable. Exact list curated below in §4.

### 2.2 Sanskrit etymology pages are sleeper hits

Long-tail academic queries rank pos 4-15:
- `nirvana sanskrit nirvāṇa meaning blowing out extinguishing etymology` — 39 impr, pos 8.7
- `sanskrit buddhi etymology ktin` — 12 impr, pos 4.8
- `etymology of karma sanskrit root kr` — 13 impr, pos 8.3
- `etymology of moksha in sanskrit` — 9 impr, pos 7.7

This means: **academic-grade Sanskrit etymology is a moat we already partially own**. The `/learn/sanskrit/<word>` pages are getting indexed and matched on academic queries. This is the IEP/Britannica niche we're competing for, and we're winning it on long-tail.

**Action**: prioritize completion + depth on the existing 72 sanskrit pages. Add Pāṇinian morphology, Monier-Williams citation, IAST + Devanagari, primary-source attestation per word.

### 2.3 Panchang / Tithi pages have the highest CTR of any cluster (2.1%)

- `/jyotish/panchang/tithis/krishna-tritiya` — 1.83% CTR at pos 6.6
- `/jyotish/panchang/tithis/krishna-saptami` — 3.13% CTR at pos 7.5
- `/jyotish/panchang/tithis/shukla-dashami` — 145 impr, pos 8.8

People searching `krishna tritiya` or `krishna saptami` have transactional intent (today's tithi for puja/fasting). Our pages match that intent.

**Action**: complete all 30 tithi pages with daily-relevant content (date-aware "today is Krishna Tritiya" hero block, planetary lord, recommended practices, paksha context). Add daily-panchang archive at `/panchang/daily/<date>` for 365 calendar pages with proper `datePublished` rotation.

### 2.4 The single best page: `/10-powerful-sanskrit-mantras`

492 impr, pos 15.9, 5 clicks, **1.02% CTR (above benchmark for that position)**. This is the only page on the site getting above-benchmark CTR at scale. It has a power phrase ("powerful"), a number ("10"), and topic specificity ("Sanskrit mantras"). Format works.

**Action**: replicate this title pattern across 10 spoke articles (e.g. "10 Powerful Shiva Mantras for [intent]", "10 Verses from the Bhagavad Gita Every [audience] Should Know"). Listicle format with numbered hook is winning on every device.

### 2.5 Sanatan-history dynastic pages

- `/sanatan-history/dynasties/brihadratha` — 187 impr, pos 10.4, 1 click
- `/sanatan-history/evidence/rakhigarhi-largest-site` — 141 impr, pos 11.1

These are newer entrants (zero impressions in prior 28d). They're getting indexed and matched. The "Rakhigarhi" topic specifically is currently a hot area in popular Indian history discourse (Harappan continuity debate). This is a content corner where we can build authority quickly.

**Action**: expand `/sanatan-history/` with a coherent timeline cluster (dynasties hub + 15-20 dynasty pages, evidence hub + 10-12 archaeological evidence pages, 5-8 high-controversy popular-claim pages tied to `kb/claims/*`).

---

## 3. CTR surgery — the highest-leverage 1-week sprint

This is the single highest-ROI work on the table. Each fix takes ~30 minutes (rewrite title + meta + maybe an OG image regeneration). Estimated lift: **+80 to +120 clicks/month from these 15 pages alone**, before any new content ships.

### 3.1 Title formula that works on this site (validated by `/10-powerful-sanskrit-mantras`)

The pattern is: **[Number/Power Word] + [Specific Topic] + [Year/Audience qualifier] | Sadhaka**

Examples that should replace current titles:

| Page | Current pattern (likely) | Proposed |
|---|---|---|
| `/what-is-maya` | "What is Maya? \| Sadhaka" | **"What is Māyā? Advaita Vedanta's Most Misunderstood Concept (2026 Guide)"** |
| `/advaita-vedanta-explained` | "Advaita Vedanta Explained \| Sadhaka" | **"Advaita Vedanta Explained: Non-Dualism in 12 Minutes (with Verses)"** |
| `/how-karma-dharma-work` | "How Karma and Dharma Work \| Sadhaka" | **"How Karma and Dharma Actually Work — From the Gita and Upanishads"** |
| `/how-to-start-japa` | "How to Start Japa \| Sadhaka" | **"How to Start Japa: 7-Step Beginner's Guide to Mantra Repetition"** |
| `/learn/sanskrit/nirvana` | "Nirvana \| Sanskrit Dictionary \| Sadhaka" | **"Nirvāṇa Meaning: Sanskrit Etymology, Buddhist vs Vedic Sense"** |
| `/learn/sanskrit/karma` | "Karma \| Sanskrit Dictionary \| Sadhaka" | **"Karma Meaning: Sanskrit Root Kṛ, Vedic Roots, Modern Misuse"** |
| `/learn/sanskrit/moksha` | "Moksha \| Sanskrit Dictionary \| Sadhaka" | **"Mokṣa Meaning: Sanskrit Etymology and Liberation in 4 Schools"** |
| `/can-i-chant-a-mantra-without-initiation` | (probably as-is) | **"Can You Chant a Mantra Without Initiation? Honest Answer From the Texts"** |
| `/how-to-read-upanishads-western-beginner` | (probably as-is) | **"How to Read the Upanishads as a Western Beginner: A 6-Step Plan"** |
| `/daily-spiritual-routine-beginners` | (probably as-is) | **"A Realistic Daily Spiritual Routine for Beginners (90 Days, 30 Min)"** |
| `/compare/ashtavakra-gita-vs-bhagavad-gita` | (probably as-is) | **"Ashtavakra Gita vs Bhagavad Gita: Side-by-Side Differences and Which to Read First"** |
| `/compare/atman-vs-brahman` | (probably as-is) | **"Atman vs Brahman: The Identity That Defines Advaita Vedanta"** |
| `/compare/ramana-maharshi-vs-nisargadatta-maharaj` | (probably as-is) | **"Ramana Maharshi vs Nisargadatta Maharaj: Two Paths to the Same Self"** |
| `/philosophies` | "Philosophies \| Sadhaka" | **"The 6 Orthodox Schools of Sanatan Dharma — Darśana Explained"** |
| `/compare` | "Compare \| Sadhaka" | **"Sanatan Dharma Compared: Side-by-Side Guides to Philosophy & Practice"** |
| `/` | "Sadhaka" or vague | **"Sadhaka — Sanatan Philosophy, Texts & Practice for Modern Seekers"** |

Click-trigger ingredients used:
1. **Number** ("7-Step", "12 Minutes", "6 Schools", "90 Days") — sets expectation, increases scannability
2. **Power phrase** ("Most Misunderstood", "Honest Answer", "Actually Works", "Side-by-Side") — promises specificity
3. **Year qualifier** for evergreen pages where freshness matters ("2026 Guide") — bumps Google's freshness signal AND CTR
4. **Audience cue** ("Beginner", "Western", "Modern Seekers") — selects the click
5. **Specific source attribution** ("From the Gita", "Sanskrit Etymology", "From the Texts") — the E-E-A-T signal LLMs and skeptical Google searchers reward
6. **Search-mirror exact match** — title contains the exact query string verbatim wherever possible (Google bolds it in SERP)

### 3.2 Meta description formula

Open with a one-sentence direct answer (mirrors the `<p data-speakable>` AEO block, since Google sometimes uses meta-description for the snippet vs sometimes pulls from body — meta-description is the conservative bet). Then a comma-separated value list of "what's inside". Cap at 155 chars. Year qualifier where relevant.

Example for `/what-is-maya`:
> *Māyā in Advaita Vedanta is not "illusion" — it is the cognitive overlay that hides Brahman. 12-min explainer with verses, etymology, and the 3 functions.*

### 3.3 OG image audit

Each of the 15 pages above also needs the OG image checked: 1200×630, page-specific, includes the article's exact title in legible type, includes the Sadhaka mark in the corner, contrasts well at small sizes (Twitter card, link previews, Discord embeds). If the current OG image is the generic site OG, replace.

### 3.4 Implementation as one PR per cluster

Rather than 15 separate PRs, batch:
- **PR 1**: Top 5 lost-clicks pages (maya, advaita-vedanta-explained, ashtavakra-vs-gita, /, compare hub) — biggest dollar value
- **PR 2**: Sanskrit pages (nirvana, karma, moksha + 3 more high-impression sanskrit/<word>)
- **PR 3**: Compare cluster (atman-vs-brahman, ramana-vs-nisargadatta, plus 8 other compare/* pages with ≥30 impr at pos ≤20)
- **PR 4**: Hubs (/, /philosophies, /compare, /traditions, /texts, /greats)
- **PR 5**: Seeker-intent / how-to spokes (japa, daily-routine, mantra-without-initiation, upanishads-western-beginner)

Each PR also bumps `dateModified` on the article and updates `data-speakable` opening paragraph if needed (per `seo-optimize` skill).

After all 5 PRs ship: re-pull GSC data 4 weeks later. If CTR doesn't move from 0.32% → ≥1.5%, the problem is deeper (E-E-A-T, missing schema, branded SERP) and we escalate to entity-authority work.

---

## 4. Topic gaps — content ramp-up priority list

Order by `(impr / current position)` × `cluster_volume_signal` ÷ `effort`. Top to bottom is the order to attack.

### 4.1 Tier-S — must ship in next 30 days

**T1. Tantra pillar cluster** (signal: 612 impr / 22 queries / pos 70-95)
- `/what-is-tantra` — currently bombing at pos 77; needs full rewrite. Currently has the wrong ranking signal — short answer + thin body. Restructure as 2,500+ word pillar with shastra context (Āgamas vs Nigamas), 5 schools (Shaiva, Shakta, Vaishnava, Kaula, Buddhist), pancha-makara discourse, modern misreadings, and explicit Sadhaka stance from the texts.
- New spokes:
  - `/what-is-shaiva-tantra` — Kashmir Shaivism vs Saiddhāntika
  - `/what-is-shakta-tantra` — Sri Vidya, Kali Kula, 10 Mahavidyas
  - `/what-is-vaishnava-tantra` — Pāñcarātra and Pāñcarātrika Āgamas
  - `/tantra-vs-vedanta` (compare/)
  - `/tantra-vs-yoga` (compare/)
  - `/tantra-vs-tantric-buddhism` (compare/)
  - `/dakshinachara-vs-vamachara` (compare/)
  - `/64-tantras-list` — pSEO-style canonical list with brief descriptions
  - `/what-is-kundalini` — already on the list, link to it from Tantra hub
  - `/pancha-makara-explained` — definitive explainer of the 5M's discourse with shastra positions

T1 gates: pillar ships first → spokes follow in 2 batches of 3-4. Each links back to pillar. Pillar links to all spokes. Add to Header→More + Footer→Practice + DiscoverSection.

**T2. Vedanta CTR rescue + cluster expansion** (signal: 221 impr / 65 queries / pos 5-15 / 0% CTR)
- CTR rescue is in §3 — that lands first.
- After CTR fix, expand to fill query gaps:
  - "internet encyclopedia of philosophy advaita vedanta brahman atman" — write our own version (`/atman-brahman-identity-explained`) that competes with IEP/SEP on the doctrine of identity.
  - "stanford encyclopedia advaita vedanta atman brahman identity" — same target.
  - "advaita vs dvaita" cluster — already exists, expand with `/advaita-vs-vishishtadvaita`, `/advaita-vs-dvaitadvaita`, `/advaita-vs-shuddhadvaita`, `/advaita-vs-achintya-bheda-abheda` (5 schools of Vedanta)
  - "six orthodox darshanas" — there's a 15-impression query for the literal list — write `/six-orthodox-darshanas-explained` as the canonical answer page.

**T3. Bhagavad Gita comparison cluster** (signal: 282 impr on ashtavakra alone, pos 7-9)
- Existing winner: `/compare/ashtavakra-gita-vs-bhagavad-gita`
- Add: `/compare/uddhava-gita-vs-bhagavad-gita`, `/compare/anu-gita-vs-bhagavad-gita`, `/compare/ribhu-gita-vs-bhagavad-gita`, `/compare/avadhuta-gita-vs-bhagavad-gita`, `/compare/yoga-vasishtha-vs-bhagavad-gita`, `/compare/devi-gita-vs-bhagavad-gita`, `/compare/ganesha-gita-vs-bhagavad-gita`, `/compare/bhagavad-gita-vs-upanishads`
- Each follows the proven /compare format: 100-word direct answer + 4-tab comparison (origin, audience, doctrine, recommended order).

**T4. Sanskrit `/learn/sanskrit/` deep-completion** (signal: 461 impr, 140 queries, academic CTR potential)
- Audit the 72 existing pages. Each needs: Devanagari, IAST, Pāṇinian morphology (root + suffix), Monier-Williams citation, primary-text attestation (≥2 verses), comparative semantics across schools, 3 FAQs.
- Expand 72 → 200 by promoting the most-searched entries from `src/data/sanskritVocab.ts`.

**T5. Panchang/Tithi completion** (signal: best CTR cluster on site, daily-search intent)
- Complete all 30 tithi pages with date-aware hero, lord, paksha context.
- Build `/panchang/today` → renders today's tithi/nakshatra/karana/yoga (server-rendered with hourly revalidate).
- Build `/panchang/daily/<YYYY-MM-DD>` for 365 archive pages.
- Festivals layer: `/festivals/<slug>` for 50 principal festivals, each with year-specific date generation.

### 4.2 Tier-A — ship in days 30-60

**T6. Comparison cluster expansion (41 → 150 pages)**

The 41 existing comparison pages average 0.34 clicks/page — 5x the editorial average. Mass-produce in priority order:

- Philosophy adjacents (10 pairs from existing 6 darshanas)
- Deity pairs by tradition (≈50 high-traffic pairs: Shiva-Vishnu, Krishna-Rama, Lakshmi-Saraswati, Durga-Kali, etc.)
- Practice pairs (mantra-prayer ✓ done; expand: chant-recite, dhyana-dharana, asana-pranayama, samyama-samadhi)
- Text pairs (gita-upanishads ✓ in queue; rigveda-samaveda, ashtavakra-yoga-vasishtha, etc.)
- Modern bridges (already partially won: psychology-vs-yoga-philosophy, mindfulness-vs-dhyana — expand: cbt-vs-vedanta, stoicism-vs-vedanta ✓, secular-buddhism-vs-advaita, simulation-theory-vs-maya)

Each compare page uses the validated template: TL;DR opener, 4-tab side-by-side, "which one for what audience" recommendation, 3 FAQs.

**T7. Mantra cluster build-out (33 → 200)**

Current cluster strength: `/10-powerful-sanskrit-mantras` (the only above-benchmark CTR on the site). Expand:
- `/mantras/<deity>/<intent>` pattern — e.g. `/mantras/shiva/protection`, `/mantras/durga/courage`, `/mantras/saraswati/learning`
- Listicle spokes following the proven pattern: `/10-powerful-shiva-mantras`, `/10-powerful-vedic-mantras`, `/10-powerful-mantras-for-protection`, `/10-bija-mantras-explained`
- Educational depth: `/what-is-bija-mantra`, `/what-is-mahavakya`, `/what-is-gayatri-mantra` (canonical answer page, distinct from any one page on `/mantras/gayatri`)

**T8. Sanatan-history corpus**

Surprise winner: dynasty pages getting impressions and 1 click already. Build out:
- Dynasties hub with 20-25 dynasty pages (Maurya, Gupta, Chola, Vijayanagara, Maratha, Pala, Pandya, etc.)
- Evidence hub with 15 archaeological/textual evidence pages (Rakhigarhi already winning — add Mehrgarh, Dholavira, Mohenjo-daro, Sarasvati-Sindhu thesis, Aryan migration debate, Mathura excavations, Hampi, etc.)
- Controversy / claims hub — paired with `kb/claims/*` infrastructure: every popular-but-distorted historical claim gets a sub-claim decomposition page (Sushruta surgery, Aryabhata heliocentrism, Pāṇini grammar = algorithm, Surya Siddhanta NASA-match, etc.). This is also a strong LLM-citation play — these are the exact claims LLMs get asked about.

### 4.3 Tier-B — days 60-90

**T9. Kundalini / awakening / energy work cluster** — query data shows people searching kundalini, energy, prana etc. but our coverage is thin. Build hub + 6 spokes.

**T10. Stotras/Sahasranama analysis depth** — 1,000+ name pages exist with seeded meaning but no analysis. Each name with ≥5 impressions needs analysis fields filled. Prioritize names that show up in query logs.

**T11. BG chapter completion** — Ch 1 done; Ch 2-18 verses are seeded but analysis is partial. The query "bhagavad gita chapter 4" already shows pos 52 (we exist but rank deep). Complete the analysis layer.

**T12. Yoga foundational cluster** — 121 impressions across 48 yoga queries with 0 clicks; we have very little authoritative yoga content. Build `/what-is-yoga` (canonical), `/8-limbs-of-yoga-explained`, `/types-of-yoga`, the four-paths cluster (jnana/bhakti/karma/raja yoga), and a hatha/raja/laya/kundalini comparison set.

---

## 5. Entity authority — the LLM-citation moat

The thesis (`memory/project_traffic_strategy_thesis.md`) is right: **content quality is not the bottleneck.** What's missing is the entity graph. LLMs cite Britannica because LLMs were trained on Britannica + 200 sites that link to Britannica. They will cite Sadhaka when:
- Wikipedia has a page for opensadhaka.com OR for Sadhaka as a publication
- Reddit threads link to Sadhaka articles
- YouTube videos cite Sadhaka
- Podcasts mention Sadhaka by name
- Other authority sites in the niche (Hindu American Foundation, Vedanta Society, Indica Today, Pragyata, etc.) link to specific Sadhaka articles

### 5.1 Owned-property entity work (week 1)

- **`/about` page**: confirm Person schema for the named editor (you, with Sanskrit + philosophy credentials, Twitter/LinkedIn links). Confirm Organization schema with founder, founding date (2025/2026), domain, sameAs to social profiles. Confirm `editorial-standards` section with explicit sourcing policy, named claim-decomposition method, and the kb/claims framework.
- **`llms.txt` audit**: confirm coverage of the 1,000-name Sahasranama corpus and the full pSEO catalog (per the thesis bottleneck #1). Confirm `llms-full.txt` is 200 OK in production (was 500'ing at audit time).
- **Branded SERP**: build `/sadhaka-the-platform` or `/about/sadhaka-meaning` page that owns the disambiguation between (a) the Sanskrit word "sādhaka" and (b) Sadhaka the publication. Title: "Sadhaka — Sanskrit Meaning and the Sadhaka Platform". This is what shows up when someone searches "sadhaka" and we currently get 394 impressions on it.

### 5.2 Off-property entity work (weeks 2-12)

Priority order, hardest-first but highest-leverage:

1. **Wikipedia**: open a draft Wikipedia article for "Sadhaka (publication)" or contribute notable cited content from Sadhaka articles into existing Wikipedia entries on Advaita, Bhagavad Gita, Tantra, etc. Wikipedia is the single highest-weight entity edge in the LLM citation graph. Target: 3 mentions in Wikipedia within 12 weeks.
2. **Reddit**: identify 8-10 high-value subreddits (r/hinduism, r/AdvaitaVedanta, r/bhagavadgita, r/Buddhism, r/Sanskrit, r/IndianHistory). Submit ONE high-value cited Sadhaka article per subreddit per month. Engage in comments. Build karma. Reddit links are the second-strongest LLM citation signal after Wikipedia.
3. **YouTube**: produce 1 short video per top-performing article (5-7 minutes), link in description, embed on the article page. YouTube is the third-largest entity graph edge. Target: 12 videos in 90 days.
4. **Podcasts**: appear on 4-6 Indic / philosophy podcasts as a guest. Drop the URL each time. Podcasts feed Apple/Spotify/Google indices that some LLM training pipelines use.
5. **Authority backlinks**: identify 20 authority sites in the Indic-thought ecosystem (Indica Today, Pragyata, Swarajya magazine, Hindu American Foundation, Vedanta Society of New York, IndicYatra, Sanskriti, Indica Books, etc.) and pitch one link per site over 12 weeks. Even 5 of these landing meaningfully shifts the trust graph.

### 5.3 Schema layer

Confirm every page emits the right structured data per `seo-optimize` skill §11.5:
- All pages: `WebPage`, `BreadcrumbList`
- Articles: `Article` with named `author` (Person), `publisher` (Organization), `datePublished`, `dateModified`, `image`, `articleBody` extract
- Hubs/listings: `CollectionPage`
- FAQs: `FAQPage` with `mainEntity` array
- How-tos: `HowTo` with `step` array
- Glossary: `DefinedTerm` (the Sanskrit pages should use this)
- Quotes from texts: use `Quotation` with `creator` and `isPartOf`

LLMs (especially Perplexity, Gemini) explicitly use schema as a citation-pickup signal.

### 5.4 The Knowledge-Base claim graph as moat

`backend/app/knowledge/kb/claims/*` is unique to Sadhaka. Every popular-but-distorted Sanatan claim ("Sushruta invented plastic surgery", "Surya Siddhanta predicted NASA's distance to the moon", "Aryabhata calculated π to 4 decimals", etc.) gets a structured decomposition with verdict tags and primary sources.

LLMs hunting for grounded answers on these claims will increasingly find Sadhaka because:
- Each claim file is a clean, citable atom (one `kb/claim` slug = one URL)
- The decomposition pattern is unique (sub-claim → verdict → source) — easy for LLMs to extract
- Primary sources are named (text + chapter + verse), which trips the "cite original source" instinct in modern LLM RLHF

**Action**: surface the claims publicly. Build a `/claims/<slug>` route that renders each kb/claim as a public AEO-optimized page. Cross-link from articles. Add to llms.txt. Submit to Google indexing API. Target: 50 claims live in 8 weeks.

---

## 6. Twelve-week phased plan

### Phase 0 — unblock (week 1)

Ship before any new content work. All these are already partially done per the thesis but need verification:

- [ ] Verify `https://www.opensadhaka.com/llms-full.txt` returns 200, contains the full corpus
- [ ] Verify `llms.txt` includes Sahasranama + pSEO
- [ ] CTR surgery PRs 1-5 (§3.4) — 15 pages get new titles + meta + maybe OG
- [ ] /about page audit: Person + Organization schema, named editor, founding date, editorial standards
- [ ] /sadhaka-the-platform disambiguation page launched
- [ ] Sitemap status confirmed (all 16 sitemaps downloaded with 0 errors — currently true per dump)
- [ ] Resubmit IndexNow for any pages whose titles changed

Gate to phase 1: 4 weeks after CTR PRs ship, re-pull GSC. If site CTR moves from 0.32% → ≥1.5%, gate passes. If not, escalate to schema/E-E-A-T deep audit before more content.

### Phase 1 — topic gaps where Google already sees us (weeks 2-5)

Drive the Tier-S work in §4.1:
- [ ] Tantra pillar + 8 spokes (week 2-3)
- [ ] Vedanta cluster expansion (Atman-Brahman identity, 6-darshanas, 5-schools-of-Vedanta) (week 3)
- [ ] BG comparison cluster (8 new compare pages) (week 4)
- [ ] Sanskrit deep-completion (top 50 by impression) + 30 new entries (week 4-5)
- [ ] Panchang completion + daily-panchang archive infra (week 5)

Each ships through `/seo-optimize` and the publish gate (Citability ≥8/10, AEO PASS, Voice ≥35/50).

### Phase 2 — entity graph + cluster scaling (weeks 6-9)

- [ ] First Wikipedia citation/edit attempt (week 6)
- [ ] Comparison cluster: 41 → 100 (week 6-7)
- [ ] Mantra cluster: 33 → 100 (week 7-8)
- [ ] Sanatan-history corpus: dynasties hub + 15 dynasty pages, evidence hub + 10 evidence pages (week 8-9)
- [ ] kb/claims public route launched + 30 claim pages (week 8-9)
- [ ] First Reddit/YouTube distribution batch (week 6-9, 1 piece per platform per week)

### Phase 3 — depth + scaling (weeks 10-12)

- [ ] BG chapter analysis completion (week 10-11)
- [ ] Sahasranama analysis completion for top-impression names (week 11-12)
- [ ] Yoga foundational cluster (week 11)
- [ ] Festivals + 50 festival pages (week 12)
- [ ] Re-audit: full GSC pull, full GEO citability re-score, entity graph audit

### Quarterly gate

End of week 12, re-pull GSC. Targets:

| Metric | Today (28d) | Q1 target (28d ending week 12) |
|---|---|---|
| Clicks | 52 | **350+** (≥7x) |
| Impressions | 16,074 | 50,000+ |
| Site CTR | 0.32% | **1.5%+** |
| Pages with ≥1 click | ~15 | 80+ |
| Branded query CTR (`sadhaka`) | 0.0% | 5%+ |
| LLM citations (manual sample of 10 queries across ChatGPT/Perplexity) | 0-1 | **3+** |

If we miss CTR target at week 4 or click target at week 12, we stop new content work and escalate to a full E-E-A-T + entity audit (named editor verification, link graph audit, Wikipedia presence).

---

## 7. Measurement framework — keep this honest

### 7.1 Weekly cadence

Every Monday, run:
```bash
node scripts/gsc-pull-comprehensive.mjs    # 14 datasets, ~30s
node scripts/gsc-analyze.mjs               # writes data/gsc/gsc-analysis-<date>.json + stdout summary
```

Track week-over-week deltas in:
- Site total clicks, impressions, CTR
- Top 10 pages clicks, CTR, position
- Top 10 queries clicks, CTR, position
- New entries (pages with first-time impressions)
- Falling pages (impressions down >30% WoW for high-value pages)

### 7.2 Monthly cadence

- Manual LLM-citation check: ask 10 canonical queries to ChatGPT, Perplexity, Claude, Gemini. Record whether opensadhaka.com is cited and at what position in the citation list. (See `seo-geo` workflow.)
- Wikipedia / Reddit / YouTube mention count.
- Backlink delta from Bing Webmaster + Common Crawl (`seo-backlinks` workflow).

### 7.3 Quarterly cadence

- Full GEO citability re-score across the 20 highest-impression pages.
- Full E-E-A-T audit (`seo-content` workflow).
- Refresh this strategy doc with the new GSC data.

### 7.4 The single dashboard metric

**Weekly site CTR** is the metric to watch. Everything else is a means to that end, until we hit 1.5%. After we cross 1.5%, the metric switches to **monthly clicks** (because then it's ranking volume, not click conversion, that bottlenecks growth).

---

## 8. What NOT to do

These are the anti-patterns the data exposes:

1. **Do not write new content before the CTR sprint ships.** New pages enter the same broken SERP-presentation funnel. Fix the funnel first.
2. **Do not chase keywords where we rank pos 70+ unless the topic-cluster volume is huge** (Tantra is the exception). For everything else, ranking pos 70 means the content needs structural rework, not minor SEO tweaks.
3. **Do not "refresh" articles with cosmetic edits to bump dateModified.** That's a tactic that worked in 2018; it now signals manipulative intent. Only bump `dateModified` when there's a substantive content change (≥150 word delta, or new section, or new sourced claim).
4. **Do not rewrite prose in the editorial articles right now.** The thesis is correct: content quality is not the bottleneck. The 2026-04-11 handover lists 38 articles missing AEO blocks — those are still worth populating per the publish-gate rule, but rewriting prose for prose's sake is misallocation.
5. **Do not add more pSEO categories before the existing categories prove out.** Comparison pages are the validated winner. Mantra pages and Sanskrit pages have signal. Tantra is a pillar opportunity. Don't ship festival pages or new pSEO until existing categories show clicks.
6. **Do not go after generic high-volume queries** (e.g. "yoga", "meditation"). They're owned by major media + .gov + .edu + Healthline. We win on long-tail intent + niche depth.
7. **Do not create thin "alternatives" or "vs" pages just because the template exists.** Each compare page must have a real, defensible side-by-side answer with named primary sources.

---

## 9. Files referenced

- Raw GSC pull: `data/gsc/gsc-dump-2026-05-05.json`
- Analysis output: `data/gsc/gsc-analysis-2026-05-05.json`
- Pull script: `scripts/gsc-pull-comprehensive.mjs`
- Analyze script: `scripts/gsc-analyze.mjs`
- Strategic context: `~/.claude/projects/-Users-ankitmishra-Developer-Sadhaka/memory/project_traffic_strategy_thesis.md`
- SEO optimization skill: `.claude/skills/seo-optimize/SKILL.md` §11.5 (Citability scoring)
- Voice rules: `~/.claude/skills/sadhaka-voice.md`
- Knowledge base claims: `backend/app/knowledge/kb/claims/`
- Prior handover (CTR-adjacent work): `docs/handover/2026-04-11-seo-optimization-phase1.md`
- Prior handover (mass re-optimization): `docs/handover/2026-04-17-llm-traffic-sections-3-4.md`
- Articles registry: `src/data/articles.ts`
- Sanskrit vocab: `src/data/sanskritVocab.ts`

---

## 10. The one-paragraph version

We have 16,000 monthly impressions and 52 clicks because our SERP presentation is broken on pages we already rank pos 5-15 for. The single highest-leverage move is rewriting titles + meta + OG for ~25 specific pages this week — that alone projects to 100+ extra clicks/month. After CTR is fixed, the second move is filling the Tantra topic cluster (Google sees us as relevant, ranks us deep because content is thin) and expanding the comparison-page cluster (our validated winner per page). The third move is entity authority: Wikipedia, Reddit, YouTube, and a public route for the kb/claims so LLMs have something to cite. Targets: 350+ clicks/month and 1.5%+ CTR by end of week 12. If CTR doesn't move four weeks after the title-rewrite sprint ships, escalate to a full E-E-A-T audit before any more content work.
