# Sadhaka Tactical Traffic Plan — May 19, 2026

**Owner**: Ankit · **Window covered**: 2026-05-19 → 2026-08-19 (90 days) · **Previous plan**: `docs/seo/2026-05-07-gsc-traffic-strategy.md` and `RAMP_UP_PLAN.md` (still valid — this doc is the 12-day refresh)

> **The one-line diagnosis**: We are not failing on content quality or keyword targeting. We are failing on three specific things: (1) Google has not yet adopted our new SERP titles, (2) we are absent from the top-10 organic results on every canonical head-term query that matters, and (3) our brand term and our biggest topic gap (Tantra) are leaking thousands of impressions because of presentation + content depth issues. The plan below sequences fixes by ROI per hour, not by easiness.

---

## 1. What the data actually says (fresh as of 2026-05-17)

### 1.1 Headline numbers

| Metric | Last 28d (2026-04-19 → 2026-05-17) | Prior 28d | Δ |
|---|---|---|---|
| Clicks | **60** | 37 | +62% |
| Impressions | **18,468** | 9,392 | +97% |
| Site CTR | **0.32%** | 0.39% | -18% |
| 90d clicks | **103** | — | — |
| 16-month clicks | **103** | — | (all traffic is from last 90 days) |

Read this carefully: **impressions doubled, clicks went up 62%, CTR went DOWN.** Google is feeding us more visibility but our SERP presentation isn't converting it. This is the textbook signature of a site that has indexation + relevance signals but is losing the click battle.

### 1.2 Where the impressions are going (28d, top zero-click pages)

| Page | Impr | Pos | Clicks | Lost vs benchmark |
|---|---|---|---|---|
| `/what-is-maya` | 552 | 7.2 | 0 | **-19** |
| `/advaita-vedanta-explained` | 554 | 8.0 | 0 | **-14** |
| `/compare/ashtavakra-gita-vs-bhagavad-gita` | 533 | 7.6 | 1 | **-13** |
| `/how-to-start-japa` | 470 | 8.7 | 0 | -11 |
| `/texts/bhagavad-gita/chapter-6/shloka-11` | 207 | 6.2 | 0 | -10 |
| `/daily-spiritual-routine-beginners` | 289 | 6.9 | 1 | -9 |
| `/compare` | 367 | 8.6 | 0 | -9 |
| `/how-karma-dharma-work` | 338 | 7.9 | 0 | -9 |
| `/learn/sanskrit/nirvana` | 341 | 8.0 | 0 | -9 |
| `/philosophies` | 336 | 8.9 | 0 | -8 |

**Why this matters**: every one of these pages has a strong new title shipped in the codebase. Sample:
- `/what-is-maya` → `"What is Maya? The 3 Levels of Reality (Not 'Illusion')"`
- `/advaita-vedanta-explained` → `"Advaita Vedanta Explained: Shankara's 9 Core Teachings"`
- `/how-to-start-japa` → `"How to Start Japa: A 7-Step Beginner Guide (Mantra & Mala)"` — **live on production, confirmed via WebFetch**
- `/daily-spiritual-routine-beginners` → `"Daily Spiritual Routine: A 5-Step Morning for Beginners"`
- `/how-karma-dharma-work` → `"Karma and Dharma: The 4 Laws Beyond Reward & Punishment"`

So the rewrites are deployed. CTR is still 0%. That tells us **Google is either still showing the OLD title in SERPs (4-12 week refresh lag), OR is auto-rewriting our titles in the SERP** (Google does this on ~30% of pages). We need to verify which, then react. This is §3.1 below.

### 1.3 Where Sadhaka actually shows up on Google right now (verified via live search 2026-05-19)

| Query | Sadhaka in top 10? | Who owns the SERP |
|---|---|---|
| `what is sanatan dharma` | **No** | Wikipedia, Britannica, AcharyaPrashant, ISKCON, Yogapedia, Hinduwebsite |
| `what is maya in advaita vedanta` | **No** | Wikipedia, Vedanta Society of SoCal, advaitamandscience.org, wisdomlib, Quora |
| `advaita vs dvaita differences` | **No** | hinduwebsite.com, innerspiritualawakening, ijcrt papers, Quora |
| `tantra meaning hindu philosophy` | **No** | Wikipedia, hinduwebsite, hareesh.org, Britannica, British Museum |
| `six darshanas hindu philosophy` | **No** | ocoy.org, New Acropolis, Wikipedia, esamskriti |
| `how to start japa meditation beginners` | **Yes, #5** | insighttimer, meditation.study, realitypathing, yogainternational, **Sadhaka**, ananda.org |
| `opensadhaka.com` (brand) | **Yes, #1** | Sadhaka (homepage) |

**Read this honestly**: we rank for the queries where the SERP is sparsely populated (japa, brand). We do NOT rank for ANY query where Wikipedia/Britannica/Vedanta Society compete. GSC tells us we're getting 552 impressions for /what-is-maya at pos 7.2, but Google's live SERP for "what is maya in advaita vedanta" doesn't show us in top 10 — that means we're picking up impressions on long-tail variants, not the canonical query.

### 1.4 Topic clusters by performance (28d)

| Cluster | Pages | Clicks | Impr | Clicks/page | Verdict |
|---|---|---|---|---|---|
| **jyotish/panchang** | 42 | 11 | 915 | **0.26** | Top performer per page — keep building |
| **compare** | 43 | 8 | 2,976 | 0.19 | High volume, low CTR — fix titles + expand |
| **editorial** | 224 | 19 | 9,627 | 0.08 | Biggest sink — needs surgery |
| **stotras** | 243 | 17 | 1,063 | 0.07 | Deep moat but invisible — needs entry-point pages |
| **learn (sanskrit)** | 52 | 3 | 2,142 | 0.06 | Strong long-tail academic signal, weak title CTR |
| **texts (BG/Upanishad)** | 51 | 2 | 707 | 0.04 | Sleeper opportunity, especially BG verses |
| **mantras** | 2* | 0 | 39 | — | Index has 33 pages — most are not getting impressions |
| **deities** | 32 | 0 | 155 | 0 | Effectively dead |
| **greats / texts hub** | 3 | 0 | 22 | 0 | Effectively dead |

\* Indexed counts differ — most are not getting impressions yet.

**Key reads from this table:**
- **Panchang per-page CTR (0.26) is 4x our editorial average.** This is the validated winning template. Build more.
- **Editorial is the largest impression source (9,627) but lowest clicks-per-page.** The CTR rewrites should help once Google rotates them. If they don't, this is the bucket that needs E-E-A-T surgery.
- **Stotras with 1,063 impressions, 243 pages — that's 4.4 impr/page average.** Verse-level pages are not getting discovered. They need entry-point hub pages with strong cross-linking and llms.txt inclusion.
- **Deities are getting 155 impressions with zero clicks — almost certainly thin content + no entity weight.**

### 1.5 Top 10 queries by impressions (28d, "what people are actually searching for that we show up for")

| Query | Impr | Pos | CTR | Where we lose |
|---|---|---|---|---|
| `sadhaka` (brand!) | **222** | 9.9 | 0% | Wiktionary owns the SERP for the noun |
| `tantra` | **147** | 79 | 0% | Pos 79 = page 8 — content gap |
| `what is tantra` | **110** | 81 | 0% | Same |
| `ashtavakra gita vs bhagavad gita` | 78 | 8.8 | 0% | CTR rewrite pending |
| `rakhigarhi largest harappan site` | 50 | 8.4 | 0% | Sanatan-history sleeper |
| `nirvana sanskrit etymology` | 45 | 8.4 | 0% | Academic long-tail — our zone |
| `what does tantra mean` | 44 | 74.7 | 0% | Same as tantra |
| `what is tantra mean` | 40 | 75.1 | 0% | Same |
| `tantra defined` | 36 | 75.8 | 0% | Same |
| `yoga philosophy and psychology` | 33 | 31.7 | 0% | Adjacent to our compare/psychology-vs-yoga-philosophy winner |

**Read this honestly**:
- The brand-term `sadhaka` is the loudest signal of unrealized value: 222 impressions, zero clicks, ranking page 1. Wiktionary owns the slot for the Sanskrit definition; we look like another dictionary entry.
- Four of the top 10 impression-generating queries are the Tantra cluster (361 combined impressions, all 0% CTR at pos 70+). **This is the single biggest topic gap on the site.**
- Sanskrit etymology and Sanatan-history are sleeper winners — building more of these = more long-tail clicks.

---

## 2. What's changed in 12 days since the May 7 plan

| Item | May 7 state | May 19 state | Status |
|---|---|---|---|
| GSC API rebuild | Broken | Working via ADC | ✅ Done |
| /llms-full.txt 500 error | Broken | Returns 200, ~65-75k words | ✅ Done |
| /llms.txt expansion | ~75 articles listed | ~180 URLs — still missing 1,000-name Sahasranama corpus and full pSEO catalog | ⚠️ Partial |
| Phase 1 CTR rewrites (titles + meta) | Not started | ~15 pages have new titles in codebase, deployed to production | ✅ Shipped, ❌ not yet adopted by Google in SERP |
| /about Person schema + named editor | Missing | **Still missing** — no Person JSON-LD, no founder, no foundingDate, no stats block | ❌ Not done |
| Phase 1.5 AEO blocks (38 articles missing) | 38 missing | Unverified — likely similar | ❌ Not done |
| OG tag templating + 8 category-default images | Not done | Not verified | ❌ Likely not done |
| Internal linking cascade (T10 Wave B) | Not done | Not verified | ❌ Likely not done |
| 28d clicks | 25 | 60 (+140%) | 📈 Growth (driven by impression growth, not CTR) |
| 28d CTR | 0.49% | 0.32% | 📉 Worse (the alarming signal) |
| Sadhaka entity presence on Wikipedia/Reddit | 0 | 0 | ❌ Not started |

**Net read**: Phase 0 plumbing is fixed. Phase 1 CTR rewrites are in production but Google hasn't rotated them yet. **The entity work (the highest-leverage thing on the table) hasn't started.**

---

## 3. The diagnosis — three layered problems

### 3.1 SERP title adoption lag + Google rewriting

We deployed strong titles. GSC still shows old titles at 0% CTR. Two competing hypotheses:

**Hypothesis A — Google hasn't refreshed yet.** Title changes typically take 2-6 weeks to appear in SERPs because Google needs to re-crawl, re-evaluate, and update the index. We shipped these between 2026-04-25 and 2026-05-10. Earliest visible CTR uplift: late May. Latest: late June.

**Hypothesis B — Google is rewriting our titles in the SERP.** Google rewrites ~30% of all titles, more aggressively on niche sites with low domain authority. Signals it considers: query intent match, keyword stuffing, brand suffix appropriateness, click history. Our `| Sadhaka` suffix is a known rewrite trigger when domain authority is low.

**How to verify**: spot-check 5 of the rewritten-title pages on live Google SERPs over the next 14 days. If the new title appears, we're in Hypothesis A — wait. If Google shows the old title or a rewritten version, we're in Hypothesis B — adjust title formula to look less like marketing copy and more like an objective answer.

**Action — this week**: build a 30-min title verification routine. Search 8 queries on incognito Google, screenshot SERP, log which title Google chose. Track in `docs/analytics-snapshots/title-adoption-tracker.md`.

### 3.2 Authority gap on canonical head queries

Even if Google adopts our new titles, we won't rank #1 for "what is sanatan dharma" or "what is maya" because the SERP is owned by Wikipedia, Britannica, Vedanta Society, ISKCON, hinduwebsite. These sites have:
- 100x our domain authority
- Decades of inbound citation
- Wikipedia entries pointing to them
- University and .gov links

The path forward is NOT to try to outrank Wikipedia on the head query. The path forward is:

1. **Carve narrower long-tail queries that we CAN win** (we already do: "ashtavakra gita vs bhagavad gita", "nirvana sanskrit etymology", "nisargadatta vs ramana", "krishna saptami tithi"). Build 5x more of these.
2. **Build entity weight so that LLMs and Google Knowledge Graph see Sadhaka as a recognized brand**. This is where Wikipedia, Reddit, and YouTube citations matter — they're how LLMs learn "this is a credible source for X."
3. **Win the Tantra cluster** where the head SERP is less authority-locked (hareesh.org, British Museum, esamskriti are all individual sites — beatable with depth).

### 3.3 Topic gaps where Google sees us as relevant but we're thin

**Tantra**: 612 impressions over 22 queries at pos 70-95, all 0% CTR. Google has decided we're "somehow related" but ranks us deep because content is thin. This is the largest single content gap on the site by impression-count.

**Yoga foundational**: 121 impressions across 48 yoga queries at 0% CTR. We have very little canonical yoga content.

**Six darshanas, identity of atman-brahman, schools of Vedanta**: low-volume but high-intent academic queries that map perfectly to our voice. We get traffic on them today (15 impr for "six darshanas") but we don't have the canonical answer pages.

### 3.4 Brand-term hemorrhage

`sadhaka` query: 222 impressions, zero clicks, position 9.9. Wiktionary, Sanskrit dictionaries, and sacred-texts.com own positions 1-8. Our homepage SERP listing doesn't disambiguate — searchers looking for the Sanskrit definition click Wiktionary, searchers looking for our platform also click Wiktionary because our snippet doesn't read as "this is the website you want."

---

## 4. THIS WEEK (May 19 – May 25) — Five high-leverage actions

> If you do only these five things, traffic will not double. But the rest of the plan is gated on them.

### Action 1 — Verify title adoption + diagnose Hypothesis A vs B (1 hour)

Search these queries on Google incognito and screenshot top 3 results. Compare to expected title (left column).

| Page | Expected new title | Verify on |
|---|---|---|
| `/what-is-maya` | "What is Maya? The 3 Levels of Reality (Not 'Illusion')" | `what is maya advaita vedanta` |
| `/advaita-vedanta-explained` | "Advaita Vedanta Explained: Shankara's 9 Core Teachings" | `advaita vedanta explained` |
| `/how-to-start-japa` | "How to Start Japa: A 7-Step Beginner Guide" | `how to start japa meditation` (we know we rank #5 here) |
| `/how-karma-dharma-work` | "Karma and Dharma: The 4 Laws Beyond Reward & Punishment" | `how karma and dharma work` |
| `/daily-spiritual-routine-beginners` | "Daily Spiritual Routine: A 5-Step Morning for Beginners" | `daily spiritual routine beginners` |

If Google is showing the new titles → wait 4 more weeks, then re-measure CTR.
If Google is showing the old `[Topic] | Sadhaka` titles → wait 2 more weeks (refresh lag).
If Google is showing rewritten versions → drop the `| Sadhaka` suffix sitewide and re-deploy.

**Output**: `docs/analytics-snapshots/2026-05-19-title-adoption-check.md`.

### Action 2 — Rebuild /about as the entity anchor (3-4 hours)

This is **the single highest-leverage thing on the page-level table**. Without entity weight, even ranked pages don't get LLM citations. The named-editor + Person schema is the keystone.

What ships on /about by end of week:

- **Named founder + editor**: "Edited by Ankit Mishra" above fold, with photo, jobTitle, brief bio (3 sentences).
- **Person JSON-LD**: name, jobTitle ("Founder & Editor"), description, sameAs (Twitter `@ankit_pfc`, LinkedIn, GitHub), knowsAbout ["Sanatan Dharma", "Advaita Vedanta", "Bhagavad Gita", "Sanskrit", "Vedic philosophy"], alumniOf if applicable, image URL.
- **Organization schema upgrades**: foundingDate (2025-XX), slogan, knowsAbout array (12+ topics), sameAs (X, LinkedIn, GitHub, YouTube once live), `numberOfEmployees: 1`, `award` if applicable.
- **Visible stats block** wrapped in `<p data-speakable>`: "75 long-form articles · 1,000+ Sahasranama verses indexed · 6 darshanas covered · 11 sourced anti-myth claims · 2,000+ Sanskrit etymology entries".
- **Editorial standards anchor**: `#editorial-standards` section already exists per audit — verify still there.
- **Sourcing policy**: 100-word block describing the kb/claims framework (primary text → claim file → verdict tag → public route).

Use `/seo-optimize` to verify GEO Citability ≥8/10 on the page after.

### Action 3 — Rewrite the homepage SERP for the brand-term query (1 hour)

`sadhaka` (the query) is 222 impressions/month at 0 clicks. Two homepage edits capture the 5-10% of that volume that is looking for a website, not a dictionary entry.

**Current homepage title**: unknown — check.
**New title**: `"Sadhaka — Open Library of Vedanta, Sanskrit Texts & Daily Sadhana"` (60 chars, includes "Sadhaka" exact match in first word position, signals "this is a website not a dictionary")
**New meta description**: `"Sadhaka (Sanskrit: a seeker). Also the open library for Vedanta, Upanishads, stotras, Sanskrit etymology, and daily sadhana — free to read."` (148 chars)
**Add Organization sameAs**: link to Wikidata once we have an entry; otherwise to social profiles.

This is one PR, one file. Ship today.

### Action 4 — Surface the kb/claims publicly as `/claims/<slug>` (4-6 hours)

We have 11 sourced anti-myth claim files in `backend/app/knowledge/kb/claims/`. They are not publicly routed. This is unique content nobody else has structured this way — and it is exactly what LLMs cite when answering "is it true that Sushruta invented plastic surgery / Aryabhata calculated π / etc."

Today's task: build the public route `/claims/[slug]/page.tsx` (dynamic) that:
- Reads from `backend/app/knowledge/kb/claims/<slug>.md`
- Renders each claim with: popular framing, sub-claims with verdict tags (true/partial/false/disputed), primary sources, related kb concepts, FAQ block
- Emits `ClaimReview` schema or `Article` schema with `Quotation` references to primary sources
- Adds an index page at `/claims` listing all 11 claims

Then:
- Add 11 entries to `/llms.txt`
- Add `/sitemap/claims.xml` and reference from sitemap index
- Submit IndexNow batch

After this ships, the Sushruta-claim, Aryabhata-claim, etc. become public AEO-targets. We are the canonical source for "what's actually true about [popular Sanatan claim]" — a space Wikipedia handles narrowly and Wikipedia-skeptics don't trust.

Add at minimum 5 more claim files to the kb/claims/ pipeline as a follow-up sprint: Sushruta surgery, Surya Siddhanta NASA-match, Vimana aircraft, Ramayana radiocarbon, Saraswati river.

### Action 5 — Ship the Tantra pillar page (4-6 hours)

Tantra cluster is 612 impressions, all at pos 70-95. Google has decided we're relevant. The blocker is content depth.

Today's task: rewrite `/what-is-tantra` from whatever exists into a 2,500-word pillar with:

- **AEO opening block** (60-100 words, `<p data-speakable>`): "Tantra is a body of practical scripture (Sanskrit *tantra* = 'loom, system, framework') outside the Vedic canon, dating from ~6th century CE. It comprises **Āgamas** (Shaiva), **Tantras** (Shakta), and **Saṃhitās** (Vaishnava). Tantra is not synonymous with sexual ritual; that is one fringe school (Vamachara) within a tradition that is overwhelmingly devotional, ritual, and philosophical. Tantric practice centers on mantra, yantra, mudra, kundalini, and the worship of Shakti as the active power of Brahman."
- **Etymology + textual landscape**: tan- root, Āgamas/Tantras/Saṃhitās tripartite division
- **5 schools**: Shaiva (Kashmir + Saiddhāntika), Shakta (Sri Vidya + Kali Kula), Vaishnava (Pāñcarātra), Buddhist tantra (Vajrayāna), Kaula
- **Pancha-makara discourse**: literal vs symbolic interpretation
- **Modern misreadings** (lead with this — high search intent for "is tantra just sex"): Pierre Bernard / Osho / Western neo-tantra vs classical tantra
- **Primary sources block**: Kularnava Tantra, Mahanirvana Tantra, Vijñāna Bhairava, Saundarya Lahari, with named chapter/verse citations
- **FAQ ≥4**: "Is tantra Hindu or Buddhist?", "Is tantra against the Vedas?", "What is left-hand vs right-hand tantra?", "Can you learn tantra without a guru?"
- **Inline citation hyperlinks** ≥3 (to wisdomlib, sacred-texts, or our own kb entries)
- **Internal links**: to /what-is-kundalini, /what-is-shakti, /compare/tantra-vs-vedanta (write this stub next), /what-is-mantra
- **dateModified** bumped

Pass through `/seo-optimize` voice + AEO + Citability gates.

Then queue 4 spoke pages for next week: `/what-is-shaiva-tantra`, `/what-is-shakta-tantra`, `/pancha-makara-explained`, `/compare/tantra-vs-vedanta`.

---

## 5. THIS MONTH (May 19 – June 16) — Four parallel streams

> Ship in this order; don't context-switch mid-week.

### Stream A — Finish the Phase 1 plumbing (week 2)

The May 7 plan listed 7 Phase 1 tasks. Phase 0 is done. Phase 1 is half-done. Finish:

| ID | Task | Effort | Why now |
|---|---|---|---|
| 1.1c | Stats block on /about | already in Action 2 above | Entity anchor |
| 1.3a | HowTo schema on 8 practice articles (japa, japa, daily-routine, mantra-choice, etc.) | 0.5d | Unlocks AIO HowTo carousel eligibility |
| 1.4a-b | OG tag templating + 8 category-default OG images | 2d | Closes T7; every page should emit complete OG tags pointing to canonical |
| 1.5a | AEO direct-answer blocks for the remaining 38 articles | 1d (batch) | The Citability publish-gate requires this |
| 1.6a-d | Internal linking cascade — relatedLinks(slug, topic) + orphan fix | 3d | Closes T10 Wave B; 31 orphan pages currently |
| 1.7a | IndexNow + Google Indexing API mass re-submit after the above ships | 0.5d | New schema + new linking → fresh-crawl trigger |
| Extra | Expand /llms.txt to include all Sahasranama verses + all pSEO entries + Last-Updated header | 3h | Was Phase 0.3 — only partially done |

**Acceptance gate at end of Stream A**: all 75 articles have AEO blocks; 0 orphan pages; OG tags valid on sample of 20 pages; new sitemap entries discoverable on Bing + Google.

### Stream B — Tantra cluster build-out (weeks 2-3)

Build out the cluster around the pillar from Action 5:

- `/what-is-shaiva-tantra` (Kashmir Shaivism + Saiddhāntika split)
- `/what-is-shakta-tantra` (Sri Vidya, Kali Kula, 10 Mahavidyas)
- `/what-is-vaishnava-tantra` (Pāñcarātra)
- `/compare/tantra-vs-vedanta`
- `/compare/tantra-vs-yoga`
- `/compare/dakshinachara-vs-vamachara`
- `/pancha-makara-explained`
- `/64-tantras-list` (pSEO data-driven listing)

Each: 1,500+ words, AEO opening, 3+ FAQs, 2+ inline citations, internal links to pillar and 2-3 sibling pages. Voice + Citability gates.

Expected lift: capture the 612 impressions currently at pos 75-95 and rotate them to pos 5-15 within 8 weeks of crawl-indexing.

### Stream C — Sleeper expansions (weeks 3-4)

Three high-signal-low-effort expansions:

1. **Comparison cluster: 43 → 80 pages.** Comparison pages have 2x the per-page click rate of editorial. Prioritize:
   - 8 Bhagavad Gita comparisons: `/compare/uddhava-gita-vs-bhagavad-gita`, `/compare/anu-gita-vs-bhagavad-gita`, `/compare/ribhu-gita-vs-bhagavad-gita`, `/compare/avadhuta-gita-vs-bhagavad-gita`, `/compare/yoga-vasishtha-vs-bhagavad-gita`, `/compare/devi-gita-vs-bhagavad-gita`, `/compare/ganesha-gita-vs-bhagavad-gita`, `/compare/bhagavad-gita-vs-upanishads`
   - 5 Vedanta school comparisons: `/compare/advaita-vs-vishishtadvaita`, `/compare/advaita-vs-dvaitadvaita`, `/compare/advaita-vs-shuddhadvaita`, `/compare/advaita-vs-achintya-bheda-abheda`, `/compare/all-five-schools-of-vedanta` (the canonical answer page for "what are the schools of Vedanta")
   - 6 modern bridges (proven winner pattern): `/compare/cbt-vs-vedanta`, `/compare/stoicism-vs-vedanta`, `/compare/secular-buddhism-vs-advaita`, `/compare/simulation-theory-vs-maya`, `/compare/consciousness-hard-problem-vs-vedanta`, `/compare/jung-archetypes-vs-deities`

   These use the data-driven template (`src/data/comparisons.ts`). Add to the data file, no separate TSX needed. Each shipped pair = one new indexable page.

2. **Sanatan-history corpus** — `/sanatan-history/evidence/rakhigarhi-largest-site` is currently 50 impr at pos 8.4 = an early winner with zero clicks. Build out 10 more:
   - `/sanatan-history/evidence/mehrgarh-neolithic-continuity` (currently 49 impr pos 33 — needs depth)
   - `/sanatan-history/evidence/dholavira-water-systems`
   - `/sanatan-history/evidence/mohenjo-daro-priest-king`
   - `/sanatan-history/evidence/sarasvati-sindhu-thesis`
   - `/sanatan-history/dynasties/gupta` (we're at pos 70 for "maurya" — sleeper)
   - `/sanatan-history/dynasties/chola`
   - `/sanatan-history/dynasties/vijayanagara`
   - `/sanatan-history/eras/vedic-age-timeline`

3. **Sanskrit etymology deep-completion** — `/learn/sanskrit/nirvana` at 341 impr pos 8.0 is the third-best impression page on the site. Audit the existing 67 promoted pages and ensure each has: Devanagari, IAST, Pāṇinian morphology (root + suffix), Monier-Williams citation, primary-text attestation (2 verses minimum), 3 FAQs. This is the academic-grade moat we're already partially winning.

Then promote 30 more from `src/data/sanskritVocab.ts` (we have 3,330 candidates). Prioritize by inferred search volume: `dharma`, `karma`, `atman`, `brahman`, `samadhi`, `samskara`, `prakriti`, `purusha`, `jiva`, `mukti`, `tapas`, `yajna`, `dhyana`, `dharana`, `pratyahara`, `niyama`, `yama`, `siddhi`, `kundalini`, `chakra`, `nadi`, `prana`, `apana`, `vyana`, `udana`, `samana`, `manas`, `buddhi`, `ahamkara`, `chitta` — these are the ones with established search intent.

### Stream D — Entity flywheel (ongoing, all 4 weeks)

This is the slowest, highest-leverage stream. Start now; results compound over 12-24 weeks.

| Task | Cadence | Where to act |
|---|---|---|
| Wikipedia editor account warm-up | 14 days of 20+ unrelated edits (no Sadhaka links) | en.wikipedia.org |
| Reddit posting | 2-3 high-value answers/week on r/hinduism, r/AdvaitaVedanta, r/Sanskrit, r/IndianHistory, r/Buddhism | Reddit |
| Quora posting | 2-3 high-value answers/week on Sanatan / Vedanta / Bhagavad Gita topic spaces | Quora |
| Backlink outreach to academic + reference sites | 5 outreach emails/week | Manual; track in outreach-tracker.md |
| Podcast pitching | 3-5 pitches/week starting week 2 | Manual |

Specific Reddit targeting (highest-leverage first):
- `r/AdvaitaVedanta` (40k) — answer questions like "what's the difference between maya and avidya" with a 200-word answer + link to /what-is-maya
- `r/hinduism` (230k) — answer "best Bhagavad Gita translation for beginners" with the canonical short answer + link to a comparison post
- `r/Sanskrit` (90k) — answer Sanskrit etymology questions with our /learn/sanskrit pages
- `r/IndianHistory` — Rakhigarhi, Saraswati, archaeology questions with /sanatan-history pages

Rules: 5:1 value-to-link ratio. Never spam. Track every link and upvote count weekly.

---

## 6. NEXT 90 DAYS — Strategic projects

### Project P1 — Brand entity build (weeks 5-12)

The single biggest lever for LLM citation. Sequenced:

- Weeks 5-6: Wikipedia editor account has 14+ days reputation. Begin attempting Sadhaka citations on existing Wikipedia articles (NOT a new article for Sadhaka). Target 8 articles: `Sanātana Dharma`, `Advaita Vedanta`, `Maya (religion)`, `Bhagavad Gita`, `Shiva Tandava Stotra`, `Vishnu Sahasranama`, `Lalita Sahasranama`, `Adi Shankara`. One edit/week. Use our content as ONE of multiple sources, never the only one.
- Weeks 6-8: Establish YouTube channel `@opensadhaka`. Upload 1 talking-head video per week, each repurposed from a top article (japa, maya, advaita, karma, etc.). 5-7 minutes. Each video description includes the article URL + summary. YouTube has 0.737 correlation with AI citation per recent research.
- Weeks 8-12: First podcast appearances. Target: Sanatan podcast hosts (Pragyata, Indica Today, The Sanatan Dharma Podcast, Vedanta Voice, etc.). 4-6 appearances total. Each one drops the URL.

Acceptance gates:
- Week 12: Wikipedia external links live on 3+ articles
- Week 12: 8 YouTube videos published
- Week 12: 2+ podcast appearances live with link drops

### Project P2 — Mass content-depth pass on 75 editorial articles (weeks 5-9)

The 75 existing editorial articles need to graduate from Citability 6-7/10 to ≥8/10. The May 7 plan §3 has the exact per-article checklist:
- Add 2+ inline citation hyperlinks within prose
- Add 1+ Sanskrit-original quotable formula (Devanagari + IAST + named verse)
- Add 1+ statistic with attribution
- Bump dateModified ONLY if substantive edit
- Voice ≥35/50, AEO PASS, Citability ≥8/10

Pace: 15 articles per week × 5 weeks. Use `/seo-optimize` per article. Batch commits.

### Project P3 — Programmatic SEO scaling (weeks 9-12)

After P1 and P2 land, scale pSEO from ~190 to 1,000+ pages. Prioritize by per-page click data:

1. Panchang archive: `/panchang/daily/[date]` for 730 dates (last + next 365). Server-rendered with hourly revalidate. This is where the proven highest-CTR cluster lives.
2. Ashtottara (108 names) per top deity — 10 deities × 108 names = 1,080 pages. Pattern already proven with Vishnu/Lalita Sahasranama. Each name: meaning, etymology, mythological context, 3 FAQs.
3. Festival pages — 50 festivals with year-aware date generation.
4. Sanskrit glossary expansion to 250 entries (from current ~67 promoted).
5. Comparison cluster to 150 (from current 43).

Each addition gets added to `/llms.txt`, sitemap, IndexNow submission.

---

## 7. STOP doing

Per the May 7 plan §8 and the new evidence:

1. **Stop publishing new editorial articles until /about is fixed + 38 missing AEO blocks ship**. Pouring new content into a broken funnel is wasted.
2. **Stop adding pSEO categories that have zero clicks** (deities, mantras-as-pSEO, greats). Fix the existing categories first.
3. **Stop using `| Sadhaka` suffix in titles** if title verification (Action 1) shows Google is rewriting our titles. The suffix triggers Google's title-rewrite heuristic on low-DA sites.
4. **Stop bumping dateModified cosmetically.** Only when there's a real content delta (≥150 words or new section).
5. **Stop chasing head-term queries owned by Wikipedia/Britannica.** Win the long-tail, then bring the entity weight to compete on heads later.
6. **Stop building new content templates.** Existing templates (compare, learn/sanskrit, jyotish/panchang, stotras) have proven signal. Use them.

---

## 8. Single dashboard metric + measurement cadence

### The one metric that matters

**Weekly site CTR**. From 0.32% today, target 1.5%+ within 8 weeks. If we hit 1.5%, we've fixed the SERP presentation funnel. After that, the metric switches to **monthly clicks**, targeting 1,000+ by week 16.

### Cadence

Every Monday morning, 30 seconds:

```bash
node scripts/gsc-diagnose.mjs > docs/analytics-snapshots/$(date +%Y-%m-%d)-gsc-diagnose.txt
node scripts/gsc-pull-comprehensive.mjs
node scripts/gsc-analyze.mjs
```

Plus once GA4 is connected (currently `GA4_PROPERTY_ID` not set in `.env.local`):
```bash
node scripts/ga4-pull-snapshot.mjs --days 28
```

This unlocks the AI-referrer breakdown (chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com referrers) — the only direct measure of LLM traffic.

**Weekly review** every Monday, generate a 5-line summary in `docs/analytics-snapshots/YYYY-MM-DD-weekly.md`:
- Total clicks this week vs prior week
- Top 3 click winners and 3 click losers (pages)
- CTR delta on the top-20 zero-click pages from §1.2
- Any new entrants (pages with first-time impressions)
- Action item for the week ahead

**Monthly LLM-citation probe**: ask each of these queries to ChatGPT, Perplexity, Claude.ai, Gemini, and Bing Copilot. Log whether Sadhaka is cited and at what position.

| Probe query | Why |
|---|---|
| what is maya in advaita vedanta | Baseline canonical |
| advaita vs dvaita differences | Comparison canonical |
| best bhagavad gita translation for beginners | Recommendation intent |
| is sushruta the father of plastic surgery | KB-claim test |
| what is the meaning of tantra in hindu philosophy | Tantra cluster test |
| how to start japa meditation | We know we rank #5 on Google here — test LLM parity |
| six darshanas of indian philosophy | Canonical reference |
| ramana maharshi vs nisargadatta maharaj | Niche-canonical we win on Google |
| what is sanatan dharma | Brand-adjacent canonical |
| how to read the upanishads as a beginner | Practical canonical |

Track in `docs/analytics-snapshots/ai-citation-probes-YYYY-MM-DD.md`.

### Quarterly gate (week 12, 2026-08-12)

| Metric | Today | Q1 target |
|---|---|---|
| 28d clicks | 60 | **400** (~7x) |
| 28d impressions | 18,468 | 60,000+ |
| Site CTR | 0.32% | **1.5%+** |
| Pages with ≥1 click in 28d | ~15 | 80+ |
| Brand query `sadhaka` CTR | 0% | 5%+ |
| LLM citations in 10-query probe | 0-1 | **3+** |
| Wikipedia external links | 0 | 1+ |
| Reddit posts with >25 upvotes | 0 | 5+ |
| Total indexed pages (GSC) | ~2,400 | 3,500+ (with pSEO scaling) |

If CTR doesn't move from 0.32% → 1.0%+ by week 6, escalate to full E-E-A-T audit and adjust strategy. Don't keep pouring content into a broken funnel.

---

## 9. Resume prompts for each action

Paste any of these into a fresh Claude Code session.

### Action 1 — Title adoption check
```
Read docs/seo/2026-05-19-tactical-traffic-plan.md §4 Action 1.

Search Google incognito for these queries and tell me which title Google is showing for our page in the SERP:
1. "what is maya advaita vedanta" → look for /what-is-maya
2. "advaita vedanta explained" → look for /advaita-vedanta-explained
3. "how to start japa meditation" → look for /how-to-start-japa
4. "how karma and dharma work" → look for /how-karma-dharma-work
5. "daily spiritual routine beginners" → look for /daily-spiritual-routine-beginners

Compare against the expected new titles in the plan. Log results to docs/analytics-snapshots/2026-05-19-title-adoption-check.md with verdict: Hypothesis A (waiting for refresh), Hypothesis B (Google rewriting), or C (deployment didn't actually ship).
```

### Action 2 — /about entity anchor
```
Read docs/seo/2026-05-19-tactical-traffic-plan.md §4 Action 2 and RAMP_UP_PLAN.md §3 Phase 1.1.

Rebuild /about as the entity anchor. Specifically:
1. Add named editor "Ankit Mishra" with byline above fold, photo, 3-sentence bio.
2. Embed Person JSON-LD: name, jobTitle, description, sameAs (X @ankit_pfc, LinkedIn, GitHub), knowsAbout array.
3. Extend Organization schema: foundingDate, slogan, knowsAbout (12+ topics), sameAs.
4. Add visible stats block: "75 long-form articles · 1,000+ Sahasranama verses indexed · 6 darshanas covered · 11 sourced anti-myth claims · 2,000+ Sanskrit etymology entries". Wrap in <p data-speakable>.
5. Confirm #editorial-standards section is present.
6. Run /seo-optimize on /about to confirm Citability ≥8/10.

Verify: schema.org Rich Results Test shows Person + Organization eligibility. View source confirms all schema present.
```

### Action 3 — Homepage brand-term rewrite
```
Rewrite the homepage SERP for the brand query "sadhaka" (222 impr/month at 0% CTR).

New title (60 chars): "Sadhaka — Open Library of Vedanta, Sanskrit Texts & Daily Sadhana"
New meta description (148 chars): "Sadhaka (Sanskrit: a seeker). Also the open library for Vedanta, Upanishads, stotras, Sanskrit etymology, and daily sadhana — free to read."

Edit the homepage page.tsx metadata block. Then verify Organization schema has sameAs links to all live social profiles + Wikidata once we have an entry.

Build + lint + test before commit.
```

### Action 4 — Public /claims/ route
```
Read docs/seo/2026-05-19-tactical-traffic-plan.md §4 Action 4.

Build the public route /claims/[slug]/page.tsx that:
1. Reads from backend/app/knowledge/kb/claims/<slug>.md
2. Renders: popular framing, decomposed sub-claims with verdict tags, primary sources, related kb concepts, FAQ block
3. Emits ClaimReview schema (or Article + Quotation if simpler)
4. Index page at /claims listing all 11 current claim files
5. Add to /llms.txt
6. Add sitemap entry /sitemap/claims.xml referenced from sitemap index
7. Run IndexNow submit

Current claim files: ancient-heliocentrism, arthashastra-intelligence, aryan-invasion-migration, ayurgenomics-prakriti, fibonacci-virahanka, gamblers-lament, indian-zero, nyaya-first-order-logic, panini-formal-grammar, pingala-binary-numbers, + 1 more.

Build + lint + test. Commit with: "feat(claims): public /claims/[slug] route exposing 11 kb claim files".
```

### Action 5 — Tantra pillar
```
Read docs/seo/2026-05-19-tactical-traffic-plan.md §4 Action 5.

Rewrite /what-is-tantra into the 2,500-word pillar described in the plan. Use the voice skill (no slop, no em-dash, "Sanatan" not "Hindu", lineage transparency). Run /seo-optimize for voice ≥35/50, AEO PASS, Citability ≥8/10 publish gates.

After it ships, queue 4 spoke pages:
- /what-is-shaiva-tantra
- /what-is-shakta-tantra
- /pancha-makara-explained
- /compare/tantra-vs-vedanta

Each links back to the pillar. Pillar links forward to all spokes. Add all to articles.ts metadata. Add to Header, Footer, DiscoverSection per CLAUDE.md.
```

---

## 10. The one-paragraph version

We have 60 clicks per 28 days against 18,468 impressions (0.32% site CTR). Title rewrites are deployed but Google hasn't rotated them yet — the highest-confidence read is that CTR will climb 2-4x within 6-8 weeks just from SERP refresh. The biggest single content gap is Tantra (612 impressions at pos 70-95) and the biggest single brand gap is /about lacking a named editor + Person schema, which is why LLMs can't disambiguate Sadhaka as an entity. The five things to do this week: (1) verify Google has adopted the new titles, (2) rebuild /about as the entity anchor, (3) rewrite homepage SERP for the `sadhaka` brand query bleeding 222 impressions/month, (4) surface the kb/claims framework as a public /claims/ route, (5) ship the Tantra pillar page. The four parallel streams for the rest of the month: finish Phase 1 plumbing (AEO blocks + OG tags + internal linking), build out the Tantra cluster (8 spokes), expand the three sleeper categories (comparisons, sanatan-history, sanskrit etymology), and start the entity flywheel (Wikipedia warm-up + Reddit + podcasts). Stop publishing new editorial articles until /about ships and the 38 missing AEO blocks are written. Stop adding new pSEO categories until existing dead ones (deities, mantras-pSEO) get pruned or repaired. The one metric to watch: weekly site CTR. Today 0.32%. Target 1.5% by week 8. If we don't cross 1.0% by week 6, escalate to full E-E-A-T audit before any more content work.

---

**Plan owner**: Ankit Mishra
**Generated from**: live GSC pull 2026-05-17, live SERP audit 2026-05-19, /about audit 2026-05-19, /llms.txt audit 2026-05-19
**Supersedes (partially)**: `docs/seo/2026-05-07-gsc-traffic-strategy.md` and `RAMP_UP_PLAN.md` Phase 1 — both still valid but this is the 12-day refresh
**Source files**:
- Latest GSC dump: `data/gsc/gsc-dump-2026-05-17.json`
- Latest GSC analysis: stdout of `node scripts/gsc-analyze.mjs`
- KB claims: `backend/app/knowledge/kb/claims/`
- Article registry: `src/data/articles.ts`
- Comparison data: `src/data/comparisons.ts` (60+ pairs)
- Sanskrit vocab: `src/data/sanskritVocab.ts` (3,330 entries, 67 promoted)
