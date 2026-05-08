# Sadhaka Traffic Ramp-Up Plan

**Owner:** Ankit · **Created:** 2026-05-07 · **Horizon:** 12 weeks (through 2026-07-30) · **Status:** Active

> **Goal:** Move opensadhaka.com from "minuscule traffic with high SERP impressions and ~zero CTR" to **#1 ranking on Google for the canonical Sanatan / Sadhaka / Vedanta query set**, with simultaneous citation flywheel inside ChatGPT, Perplexity, Google AI Overviews, Claude, and Bing Copilot.

---

## 0. TL;DR — what's actually wrong, and how we fix it

The audit found three layers of failure, in this order of leverage:

1. **Measurement is broken.** The GSC service-account project (`#575787169950`) has been deleted by Google. We cannot pull current impressions, CTR, or query data via the API. Any optimization without GSC is shadow-boxing. **Fix in 24h.**
2. **Presentation kills CTR even when we rank.** Meta titles default to a `[Topic] | Sadhaka` formula. No power words, no year qualifier, no benefit framing, no curiosity hook. Meanwhile our content is structurally strong — so high impressions × poor presentation = the exact symptom the user describes.
3. **We have no entity in the LLM/Wikipedia/Reddit graph.** Content quality already beats most niche competitors (Britannica, vedabase.io, learnreligions.com), but no LLM has heard of opensadhaka.com because the domain has zero Wikipedia citations, zero Reddit mention density, zero podcast appearances. Without the citation flywheel, the 77% Google→AI-citation correlation never fires for us.

The plan below sequences fixes by **ROI per week of work**, not by ease.

---

## 1. Diagnostic snapshot (2026-05-07)

### 1.1 What's already working (do not re-do)

| Surface | State |
|---|---|
| Schema bundles | ~1,175 pages emit Article + WebPage + Breadcrumb + FAQ JSON-LD |
| AEO direct-answer blocks | Present on ~50% of editorial articles (38 of 77 done; 38 still missing) |
| /llms.txt | Present, well-formed, lists 75 articles |
| /about page | Has Organization + AboutPage + BreadcrumbList JSON-LD; `#editorial-standards` anchor |
| robots.txt | Open to all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended, anthropic-ai); blocks Bytespider + CCBot (correct) |
| Speakable schema | On pSEO templates (concepts, deities, mantras, compare) |
| Sitemap | Index + child sitemaps under /sitemap.xml + /sitemap/[id] (T3 done) |
| Self-canonical | Fixed across leaf pages (T1 done) |
| Place schema | 15 archaeological sites have geo + address (T2 done) |
| Privacy + Terms | Live (T5 done — recovered 3,410 broken links) |
| Meta description length | Clamped to 120–160 chars (T6 done) |
| ISR | Added to slow SSR leaf routes (T9 done) |
| Hub→leaf cascade | Header/Footer + prev/next links (T10 Wave A done) |
| IKS knowledge base | 52 atom files (shastra/text/person/concept/claim) at `backend/app/knowledge/kb/` |

### 1.2 Critical defects (block ramp-up — fix in Phase 0)

| Defect | Severity | Evidence | Phase |
|---|---|---|---|
| **GSC API project deleted** | 🔴 P0 | `Project #575787169950 has been deleted` on every API call | 0.1 |
| **/llms-full.txt returns HTTP 500** | 🔴 P0 | Confirmed via WebFetch 2026-05-07. Robots.txt advertises this URL. Every LLM following the pointer hits a 500. | 0.2 |
| **/about has no named editor/founder/Person schema** | 🔴 P0 | Confirmed via WebFetch. Without an attributed human voice, LLMs cannot disambiguate "who is opensadhaka.com" — falls back to link authority alone. | 1.1 |
| **No Wikipedia or Reddit footprint for "opensadhaka"** | 🔴 P0 | Confirmed via WebSearch — zero results on either platform. Perplexity weights Reddit at 46.7% of citations; Wikipedia is the #1 LLM training/post-training corpus. | 2.x |
| **38 of 77 articles still missing AEO direct-answer block** | 🟠 P1 | Per `2026-04-11-seo-optimization-phase1.md` handover §1G | 1.5 |
| **2,368 pages with incomplete OG tags + 1,875 with OG-URL ≠ canonical** | 🟠 P1 | T7 still pending in Ahrefs remediation plan | 1.4 |
| **31 orphan pages + 1,839 pages (73%) with only 1 dofollow inlink** | 🟠 P1 | T10 Wave B still pending | 1.6 |
| **Stotras + full pSEO catalog absent from /llms.txt** | 🟠 P1 | 1,000-name Sahasranama corpus is invisible to AI routers | 0.3 |
| **No `knowsAbout`, `foundingDate`, `slogan` on Organization schema** | 🟠 P1 | Required for Google Knowledge Panel + LLM entity extraction | 1.1 |
| **No HowTo schema on practice articles** | 🟡 P2 | Practice/how-to articles ineligible for AIO HowTo carousel | 1.3 |
| **No inline source citations (only footer Sources block)** | 🟡 P2 | ChatGPT Search + Perplexity weight inline citation density as a quality proxy | 2.2 |
| **IndexNow batch never resubmitted post-cleanup** | 🟡 P2 | T8 still pending; 1,639 pages awaiting | 1.7 |

### 1.3 Inventory snapshot

| Category | Count | Template | Notes |
|---|---|---|---|
| Editorial articles registered in `articles.ts` | 77 | `src/app/<slug>/page.tsx` (51) and `src/app/(editorial)/<slug>/page.tsx` (26) | 38 missing AEO |
| Concepts (pSEO) | 67 | `src/app/(concepts)/[slug]/page.tsx` | Source: `src/data/concepts.ts` |
| Deities (pSEO) | 47 | `src/app/deities/[slug]/page.tsx` | |
| Mantras (pSEO) | 33 | `src/app/mantras/[slug]/page.tsx` | |
| Comparisons (pSEO) | 58 | `src/app/compare/[slug]/page.tsx` | Source: `src/data/comparisons.ts` (2,005 lines) |
| Sanskrit glossary | ~67 promoted of 2,000+ terms | `src/app/learn/sanskrit/[word]/page.tsx` | Source: `src/data/sanskritVocab.ts` (3,270 lines) |
| Practices | 9 | `src/app/practices/[practice]/page.tsx` | Add HowTo schema |
| Traditions | 7 | `src/app/traditions/[slug]/page.tsx` | |
| Texts | 4 | `src/app/texts/[slug]/page.tsx` | |
| Greats | 5 | `src/app/greats/[slug]/page.tsx` | |
| Philosophies | 8 | `src/app/philosophies/[slug]/page.tsx` | |
| Stotras (verse-level) | Shiva Tandava (16 verses) + Vishnu/Lalita Sahasranama (1,000 names each, meaning seeded, analysis pending) + Navagraha | 4 dynamic templates under `/stotras/<stotra>/[verse]` | Massive depth signal — but invisible in llms.txt |
| BG shlokas | Ch1 fully seeded; Ch2–18 ~706 verses partial | `/texts/bhagavad-gita/<chapter>[/<shloka>]` | Analysis fields incomplete |
| Jyotish | Nakshatras / Rashis / Grahas | `src/app/jyotish/<type>/[slug]/page.tsx` | |
| Sanatan history | 15 archaeological sites + researchers + evidence + eras | `src/app/sanatan-history/<type>/[slug]/page.tsx` | |
| Tools | Faith Finder, Vedic Clock, Panchang | static + dynamic | Faith Finder has SoftwareApplication schema |
| Hubs | 3 (`ancient-wisdom-philosophies`, `sacred-texts-teachings`, `spiritual-traditions-paths`) | `src/app/(hubs)/<slug>/page.tsx` | All have BreadcrumbList |
| **Total static pages** | **~2,470** | | |

---

## 2. Strategic thesis — why we are where we are

### 2.1 The bottleneck is NOT content quality

The seo-geo audit scored Sadhaka **72/100 GEO-readiness**, with a passage-by-passage analysis confirming our `what-is-maya`, `advaita-vedanta-explained`, `fear-of-death-advaita-vedanta`, and `bhagavad-gita-complete-guide` articles already produce highly extractable, source-attributed passages that meet or exceed Britannica, Stanford Encyclopedia of Philosophy, vedabase.io, and learnreligions.com on the same queries.

We do not need to write more or rewrite what we have to be cite-worthy. We need to:
1. Be **discoverable** by the surfaces (fix /llms-full.txt, expand /llms.txt to stotras + pSEO catalog).
2. Be **identifiable** as an entity (named editor, Person schema, Organization completeness, Wikipedia mention).
3. Be **clickable** at the SERP (CTR-optimized titles + descriptions).
4. Be **referenced** in the citation graph LLMs trust (Wikipedia, Reddit, YouTube, podcast).

### 2.2 The bottleneck IS authority distribution + presentation

The user's stated symptom — "high impressions, very low CTR" — is the textbook signature of a site that:
- Is being crawled and indexed (impressions confirm Google sees us)
- Is positioned reasonably (otherwise we wouldn't even register impressions)
- Has SERP titles/descriptions that don't earn the click

The Ahrefs data confirms this from another angle: **73% of pages have only 1 dofollow inlink**, meaning even if a page ranks, the link-equity flow into it from other Sadhaka pages can't push it to position 1. Hub pages at PR 34–40 are not passing equity downstream.

### 2.3 What 2026 SEO/GEO actually rewards

Distilled from the May 2026 research pass:

| Signal | Weight | Sadhaka state |
|---|---|---|
| Page-1 Google ranking → AI citation | 77% correlation | Mixed — strong on long-tail, weak on canonical queries |
| Wikipedia citation | #1 LLM training/post-training corpus signal | **Zero presence** |
| Reddit mention density | 46.7% of Perplexity citations | **Zero presence** |
| YouTube mention | 23.3% of AIO citations; 0.737 correlation with AI mentions | **Zero presence** |
| Multi-modal content (text + image + video + schema) | 78% of featured AI sources | Text + schema only |
| Stats + citations + quotations density | +30–40% AI citation visibility | Strong on ~10 articles, weak on rest |
| Pages updated within 2 months | +28% AI citation rate | Mixed; need to bump dateModified on re-optimized articles |
| Entity density 15+ named entities/page | 4.8x AIO selection probability | Generally good |
| E-E-A-T signals (named author, primary citations, datestamps) | 96% of AI citations come from sources with strong E-E-A-T | Datestamps yes; named author **NO** |
| Power-word + year + emotional title | +20–40% CTR | **Currently using vanilla titles** |

The single highest-leverage gap on this table is **"Wikipedia citation × 0% present"** — and the second highest is **"Power-word title × 0% present"**.

---

## 3. Twelve-week ramp plan

### Phase 0 — Emergency + Measurement (Days 0–5, 2026-05-08 to 2026-05-12)

> Without measurement we cannot prove we're improving. Without llms-full.txt we lose Claude/Anthropic + every RAG-indexer. Both must be live before Phase 1.

| ID | Task | Owner | Acceptance | Effort |
|---|---|---|---|---|
| **0.1** | ✅ **DONE 2026-05-07.** New project `sadhaka-seo` + APIs enabled. Service-account path abandoned (GSC UI rejected new SA email even with valid IAM auth). Auth now via **gcloud ADC** (user OAuth). Scripts run with `GSC_AUTH=adc`. See handover for setup. First baseline saved at `docs/analytics-snapshots/2026-05-07-gsc-baseline.txt`. | Ankit | `GSC_AUTH=adc node scripts/gsc-diagnose.mjs` returns 16 sitemaps + top pages | done |
| **0.2** | Diagnose + fix /llms-full.txt 500 error. Likely cause: route handler timing-out or memory limit on 2,470-page concatenation. Move to ISR with `revalidate=86400`, or pre-build at deploy time and serve as static. | Ankit | `curl -I https://www.opensadhaka.com/llms-full.txt` returns 200 | 2–4h |
| **0.3** | Expand /llms.txt to include the 4 stotras + their verse pages, all Vishnu/Lalita Sahasranama verses, full pSEO catalog (concepts, deities, mantras, comparisons, philosophies, traditions, texts, greats, practices). Add `Last-Updated: <date>` header. Wire `npm run llms:generate` into post-deploy. | Ankit | New `/llms.txt` shows ≥1,500 URL entries; `Last-Updated` field present; auto-regenerated on next deploy | 3h |
| **0.4** | Set up Bing Webmaster Tools property + verify domain. Submit sitemap. Register IndexNow key. | Ankit | Bing WMT shows verified property + sitemap accepted | 1h |
| **0.5** | Set up GA4 → BigQuery export OR create `scripts/weekly-snapshot.mjs` that pulls GSC top 200 queries by impressions, top 200 pages by CTR, and writes `docs/analytics-snapshots/YYYY-MM-DD-snapshot.md`. Run weekly. Schedule via `/loop` or cron. | Ankit | First snapshot file lands on 2026-05-12 | 3h |
| **0.6** | Open new Cloudflare/CDN account + verify mail DKIM/SPF/DMARC for `@opensadhaka.com` (needed for outreach campaigns in Phase 2). | Ankit | Sending test mail from `editor@opensadhaka.com` lands in Gmail Inbox without spam flag | 2h |

**Phase 0 gate:** GSC API live + llms-full.txt 200 + first snapshot generated.

---

### Phase 1 — CTR + Entity Anchoring (Weeks 1–3, 2026-05-13 to 2026-06-02)

> The user's #1 stated issue. Every action below is selected for fastest CTR uplift on existing-impressions traffic. We will not write any new content this phase.

#### 1.1 Entity / E-E-A-T anchoring (Week 1, 2 days)

| ID | Task | Acceptance |
|---|---|---|
| **1.1a** | Add named editor (Ankit Mishra) + author byline to /about. Embed Person JSON-LD with `name`, `jobTitle`, `description`, `sameAs` (LinkedIn, X/@ankit_pfc, GitHub), `knowsAbout` array. | View source on /about reveals Person schema with all fields |
| **1.1b** | Extend Organization schema on /about with `foundingDate`, `slogan`, `award` (if any), `numberOfEmployees`, `knowsAbout` array of 12+ topics, `sameAs` (X, LinkedIn, YouTube once live). | schema.org validator passes; Google Rich Results Test shows Organization eligibility |
| **1.1c** | Add stats block to /about (visible HTML, not schema): "77 long-form articles · 1,000+ Sahasranama verses analyzed · 6 darshanas covered · 52 sourced claims in IKS knowledge base". Wrap in `<p data-speakable>`. | Stats render above fold on /about |
| **1.1d** | Add `<author>` bylines + `<time>` published/modified to every article template. Where `dateModified` is older than 60 days but content hasn't changed, bump it on next re-optimization (don't bump artificially). | Every editorial article shows author + dates above fold |

#### 1.2 CTR emergency rewrite (Week 1–2, 4 days)

| ID | Task | Acceptance |
|---|---|---|
| **1.2a** | After Phase 0.1 lands, pull GSC top 100 queries by impressions for last 28 days. For each query, identify the ranking page, the current `<title>`, the CTR. Sort by `impressions × (1 − CTR)` to find the biggest CTR-bleed pages. | `docs/analytics-snapshots/ctr-bleed-2026-05-13.md` lists top 50 candidates |
| **1.2b** | Rewrite top 50 titles + descriptions using the [CTR template library](#71-ctr-power-templates-for-the-spiritual-niche) below. Each rewrite goes through the voice skill + a CTR scoring rubric (power word ≥1, query exact-match yes, length 50–60 chars, year qualifier where evergreen, benefit framing, no `Sadhaka` suffix bloat). Commit in batches of 10. | All 50 titles updated; titles in build output match new spec |
| **1.2c** | Build a `scripts/ctr-rewrite-test.mjs` that snapshots SERP titles via DataForSEO (or manual browser pulls) and stores baseline. Re-run weekly to confirm Google adopts the new title (not always — Google rewrites in ~30% of cases). | Script writes weekly diff to `docs/analytics-snapshots/title-adoption-YYYY-MM-DD.md` |

#### 1.3 HowTo schema rollout (Week 2, 1 day)

| ID | Task | Acceptance |
|---|---|---|
| **1.3a** | Add HowTo schema to all how-to / practice articles: `how-to-start-japa`, `how-to-start-meditating-daily`, `how-to-choose-a-mantra`, `daily-spiritual-routine-beginners`, `practical-spiritual-practices`, `how-to-study-indian-philosophy-home`, `how-to-learn-sanskrit`, `how-to-spot-fake-spiritual-guru`. Each: numbered steps, required materials, expected duration, named tools. | Google Rich Results Test shows HowTo eligibility for all 8 |

#### 1.4 OG tag templating (Week 2, 1 day) — closes T7

| ID | Task | Acceptance |
|---|---|---|
| **1.4a** | Update metadata helper in `src/lib/seo/index.ts` so every page emits: `og:title` (= page title without `\| Sadhaka`), `og:description` (= meta description), `og:url` (= canonical), `og:image` (= category default fallback), `og:type` (= `article` for articles, `website` for hubs/pSEO), `og:site_name` (= Sadhaka). | Sample 10 pages: all 6 OG tags present, `og:url === canonical` |
| **1.4b** | Generate 8 category-default OG images via the `seo-image-gen` skill: Editorial, BG, Sahasranama, Stotra, Sanskrit, Concept, Deity, Sanatan-history. Wire fallbacks. | 8 images live in `public/og/`; pages without explicit OG image inherit category default |

#### 1.5 AEO block completion (Week 2, 1 day) — closes 1G

| ID | Task | Acceptance |
|---|---|---|
| **1.5a** | Write 60–100 word direct-answer blocks for the 38 articles still missing them (full list in `2026-04-11-seo-optimization-phase1.md` §1G). Each must be a standalone, citable answer to the article's primary query. Use the voice skill (no AI slop, no em-dash, no "Hindu" → use "Sanatan Dharma" or named school). Wrap in `<p data-speakable>`. | All 77 articles have AEO blocks; speakable schema attribute present |

#### 1.6 Internal linking cascade (Week 3, 3 days) — closes T10 Wave B

| ID | Task | Acceptance |
|---|---|---|
| **1.6a** | Build `src/lib/internal-links/map.ts` exporting `relatedLinks(pageSlug, topic, concepts) → 3–5 links`. Seed from `src/data/concepts.ts` + `src/data/sanskritVocab.ts`. | Module exists with passing test for 10 sample slugs |
| **1.6b** | Render related links at the bottom of every leaf page template (article, pSEO, stotra verse, BG shloka). | Sampled leaf page shows 3–5 contextual related links above the FAQ section |
| **1.6c** | Inventory the 31 orphan pages from Ahrefs CSV. For each, identify nearest hub and add a contextual link from the hub. | Orphan count = 0 in next Ahrefs crawl |
| **1.6d** | Panchang daily engine: every day's panchang page picks 3–5 deep links based on tithi/nakshatra/deity. Pure data lookup. | Today's panchang shows 3–5 contextual links |

#### 1.7 IndexNow + GSC re-submission (Week 3, 0.5 day) — closes T8

| ID | Task | Acceptance |
|---|---|---|
| **1.7a** | Run `npm run indexnow:submit:prod` after T7 + 1.5 + 1.6 land. Submit via Google Indexing API for top 200 pages. Submit via Bing Webmaster IndexNow. | All three confirm receipt; GSC shows fresh-crawl events for ≥150 of 200 within 7 days |

**Phase 1 gates (week-3 review on 2026-06-02):**
- Average SERP CTR for top-50 queries: **+50% vs Phase 0 baseline**
- AEO blocks: 77/77 (100%)
- OG-tag-incomplete pages: <100
- Orphan pages: 0
- HowTo schema: live on 8 articles
- /about Person + Organization schemas live with full field set

---

### Phase 2 — Brand Mention Flywheel + Content Depth (Weeks 4–8, 2026-06-03 to 2026-07-07)

> CTR fixes only help us where we already rank. To break into the top 3 for canonical queries (where Britannica, Wikipedia, Sadhguru, vedabase.io live), we need entity authority. That comes from being **mentioned** by names that already have authority. Five weeks of compounding outreach + content depth.

#### 2.1 Wikipedia entry campaign (Week 4–8, ongoing)

> Wikipedia is the #1 LLM training/post-training corpus. A single accepted external link on `Sanātana Dharma`, `Maya (religion)`, or `Advaita Vedanta` is worth more for AI visibility than 1,000 backlinks from random domains.

| ID | Task | Acceptance |
|---|---|---|
| **2.1a** | Create Wikipedia editor account (`@AnkitMishraVedanta` or similar). Spend 2 weeks doing 20+ minor, value-adding edits on unrelated articles (build editor reputation). Do NOT add Sadhaka links during this period. | Wikipedia user page shows ≥20 edits, age >14 days |
| **2.1b** | Identify 8 candidate Wikipedia articles where Sadhaka content genuinely improves the citation: `Sanātana Dharma`, `Advaita Vedanta`, `Maya (religion)`, `Bhagavad Gita`, `Shiva Tandava Stotra`, `Vishnu Sahasranama`, `Lalita Sahasranama`, `Adi Shankara`. For each, find the specific paragraph our content uniquely substantiates. | `docs/research/2026-05-15-wikipedia-target-paragraphs.md` lists 8 candidates with the exact paragraph + Sadhaka URL |
| **2.1c** | Submit 1 edit per week starting Week 6 (after reputation built). Each edit adds new sourced content with the Sadhaka link as **one of multiple sources**, never as the only source. Wait for community approval / revert before next edit. | At least 3 of 8 edits accepted by end of Week 8 |
| **2.1d** | If "Sadhaka (website)" qualifies for its own Wikipedia article (need notability — citations from secondary sources first), draft that for Week 12+. | Draft prepared, parked until podcast + press mentions accumulate |

#### 2.2 Reddit answer campaign (Week 4–8, weekly)

> Perplexity weights Reddit at 46.7% of citations. ChatGPT also pulls heavily from Reddit for recommendation queries. The fastest non-Wikipedia path to the LLM citation graph.

| ID | Task | Acceptance |
|---|---|---|
| **2.2a** | Create / use existing Reddit account on `r/hinduism` (230k), `r/advaitavedanta` (40k), `r/yoga` (900k), `r/spirituality` (1M), `r/Buddhism` (650k for cross-pollination on Vedanta-vs-Buddhism). Karma >1k preferred. | Account active in target subs |
| **2.2b** | Post 2–3 high-quality answers per week. Strict rules: answer adds genuine value first, link to Sadhaka second, link only when the article truly answers what the asker is missing. Target queries: "best resource for learning Advaita", "what's the difference between maya and illusion", "best Bhagavad Gita translation", "how to start daily spiritual practice", "is Isha Foundation a cult", "trauma-sensitive meditation guide". | ≥10 answers posted per month, ≥3 with upvotes >25 |
| **2.2c** | Track each post in `docs/analytics-snapshots/reddit-seeding-tracker.md`: post URL, query targeted, Sadhaka URL linked, upvotes, referrals to GA4. | Monthly review shows ≥1 post with ≥100 upvotes by end of Week 8 |

#### 2.3 Mass re-optimize 77 articles to Citability ≥8/10 (Weeks 4–7)

> This is **Section 3** of the LLM-traffic plan from `2026-04-17-llm-traffic-sections-3-4.md`. Detailed prompt in that handover. Per-article checklist:

| Sub-task per article | Why |
|---|---|
| Add 2+ inline source citation hyperlinks within prose (not just footer) | ChatGPT Search + Perplexity weight inline citation density |
| Add 1+ Sanskrit-original quotable formula per article (Devanagari + transliteration + named source verse) | Highest-citability passage type |
| Add 1+ statistic or quantitative claim with attribution | +30–40% AI visibility per research data |
| Bump `dateModified` if substantive edit (don't bump artificially) | +28% AI citation rate for pages updated within 60 days |
| Ensure ≥3 standalone extractable passages | Required for AEO direct-answer eligibility |
| Ensure FAQ ≥4 (hub) or ≥3 (spoke) | Required for FAQPage rich result |
| Cite from `kb/claims/*.md` for any sensational popular claim, or seed new kb/claim file | Required for the "Sushruta invented plastic surgery" / "Surya Siddhanta = NASA" anti-bullshit policy |
| Voice score ≥35/50, AEO block PASS, GEO Citability ≥8/10 | Project's publish gates |

| ID | Task | Acceptance |
|---|---|---|
| **2.3a** | Sprint 1 hubs first: `what-is-sanatan-dharma`, `vedas-upanishads-bhagavad-gita-guide`. Then Sprint 1 spokes (8). | All 10 Sprint-1 articles at Citability ≥8 by end of Week 4 |
| **2.3b** | Batch 2 (12 articles): all `vedanta-*`, `*-and-vedanta`, `christian-mysticism-and-vedanta`, `sufi-mysticism-and-vedanta`, `nietzsche-and-vedanta`, `carl-jung-and-vedanta`, `existentialism-and-vedanta`, `consciousness-hard-problem-vedanta`, `vedanta-vs-buddhism`, `vedanta-vs-tantra`. | 12 articles at gate by end of Week 5 |
| **2.3c** | Batch 3 (15 articles): meditation/practice cluster (`how-to-start-meditating-daily`, `meditation-for-anxiety-overthinking`, `meditation-for-burnout`, `meditation-for-trauma-survivors`, `which-meditation-for-me`, `best-meditation-style-for-your-personality`, `how-to-start-japa`, `how-to-choose-a-mantra`, `daily-spiritual-routine-beginners`, `practical-spiritual-practices`, `kundalini-awakening`, `what-is-kriya-yoga`, `what-is-tantra`, `how-to-spot-fake-spiritual-guru`, `do-you-need-a-guru`). | 15 articles at gate by end of Week 6 |
| **2.3d** | Batch 4 (15 articles): people/places/critique cluster (`ramana-maharshi-who-am-i`, `paramahansa-yogananda-teachings`, `isha-foundation-sadhguru`, `adi-shankaracharya-life-teachings`, `red-flags-yoga-studios`, `online-yoga-teacher-training-worth-it`, `celebrity-spiritual-courses-review`, `spiritual-travel-india-guide`, `rishikesh-vs-dharamshala`, `silent-meditation-retreats-india`, `indian-ashram-etiquette-packing`, `sacred-sites-india`, `kailasa-temple-ellora`, `kailasa-vs-ajanta-caves`, `most-powerful-shiva-temples-india`). | 15 articles at gate by end of Week 7 |
| **2.3e** | Batch 5 (remaining 25 articles + the 3 unregistered: `difference-between-yoga-and-vedanta`, `vedanta-vs-tantra`, `yoga-sutras-complete-guide`). Register the 3 in `articles.ts`. | 25 articles + 3 newly-registered at gate by end of Week 7 |
| **2.3f** | Output `docs/reports/aeo-rerun-2026-07-07.md` summarizing starting vs ending Citability distribution + kb-claim additions. | Report committed |

#### 2.4 Sprint 2 + Sprint 3 article completion (Weeks 5–7, parallel with 2.3)

| ID | Task | Acceptance |
|---|---|---|
| **2.4a** | Sprint 2 completion: 2 pending articles (`practical-spiritual-practices`, `difference-between-yoga-and-vedanta`). | Live + at gate |
| **2.4b** | Sprint 3 (7 articles per `MEMORY.md` content plan): BG complete guide enrichment, Upanishads hub, Yoga Sutras hub, tradition spokes. | All 7 live + at gate |

#### 2.5 BG shloka completion campaign (Weeks 6–8)

> Chapters 2–18 have ~706 verses with structure but partial analysis. Each completed shloka adds a depth signal that no Sanatan-niche site can match. Use the `sahasranama-content` agent module pattern (see `docs/agents/03-sahasranama-content.md`).

| ID | Task | Acceptance |
|---|---|---|
| **2.5a** | Complete analysis fields for BG Ch 2 (47 verses). Commit one chapter at a time. | Ch2 analysis complete with literary, philosophical, contextual fields per shloka |
| **2.5b** | Continue Ch 3, 4, 5, 6 (high-traffic chapters). | Ch 3–6 complete by end of Week 7 |
| **2.5c** | Continue Ch 7–18 in priority order (Ch 12 — Bhakti Yoga, Ch 18 — Moksha summary, then chronological). | Ch 7–18 complete by end of Week 8 |

#### 2.6 Outreach for podcast + press (Weeks 5–8)

| ID | Task | Acceptance |
|---|---|---|
| **2.6a** | Build target list: 30 podcasts in spiritual-philosophy / Indian-civilization niche (e.g. `The Sanatan Dharma Podcast`, `Vedanta Voice`, `India Wisdom School`, `Yoga in the Wisdom Tradition`, `Wisdom of the Sages`, `Buddhist Geeks` for cross-tradition). | List in `docs/research/2026-05-20-podcast-outreach-targets.md` |
| **2.6b** | Pitch template: "I built opensadhaka.com — the largest English Sanatan Dharma reference, 77 long-form articles + 1,000-name sahasranama analyses + Vedic Clock. Happy to discuss [specific topic angle relevant to the show]." | 3–5 outreach emails per week from Week 5 |
| **2.6c** | Aim for 1 podcast booking by Week 8. YouTube-hosted preferred (YouTube mention has 0.737 correlation with AI citation). | ≥1 booked recording |
| **2.6d** | Press outreach: Scroll.in, The Wire, Mint Lounge, Caravan, Outlook India — angle = "the open-source Wikipedia for Sanatan Dharma". | ≥1 pitch sent per week from Week 6 |

#### 2.7 Backlink outreach (Weeks 4–8, 5 manual / week)

| ID | Task | Acceptance |
|---|---|---|
| **2.7a** | Identify 30 academic + reference sites in Indian philosophy: vedabase.io, swamij.com, shankaracharya.org, advaita-vedanta.org, yogavasishtha.org, sanskrit.ksu.edu (Kansas State Sanskrit Library), philosophy.lander.edu (Indian philosophy section), ramana-maharshi.org, sivanandaonline.org. | List in `docs/research/2026-05-13-backlink-outreach-targets.md` |
| **2.7b** | For each: identify a specific page where Sadhaka content genuinely adds (e.g. our `mithya-vs-illusion` distinction is sharper than most). Email a brief value pitch. | 5 outreach emails per week; track replies in `outreach-tracker.md` |

**Phase 2 gates (week-8 review on 2026-07-07):**
- All 77 articles at GEO Citability ≥8/10
- BG Ch 2–6 analysis complete; Ch 7–18 underway
- ≥3 Wikipedia external link edits live (or at minimum, queued for review)
- ≥30 Reddit posts, ≥1 viral (>100 upvotes)
- ≥1 podcast recording booked
- ≥10 backlink outreach replies (positive or negative — want signal)

---

### Phase 3 — pSEO Scaling + Multi-Modal Expansion (Weeks 9–12, 2026-07-08 to 2026-08-04)

> This is **Section 4** of the LLM-traffic plan. Goal: take pSEO from ~190 to 2,000+ pages, launch YouTube channel, ship the first wave of multi-modal content.

#### 3.1 Sanskrit glossary expansion 67 → 250 (Week 9)

| ID | Task | Acceptance |
|---|---|---|
| **3.1a** | Pull `src/data/sanskritVocab.ts` entries by inferred search volume (use DataForSEO MCP if connected, else manual top-N). Promote 183 more terms to full concept pages with: Devanagari, transliteration, etymology, primary-text citation, related concepts (3–5 internal links), 3 FAQs. | 250 concept pages live; build passes |
| **3.1b** | Add to /llms.txt + sitemap. Submit IndexNow batch. | All 183 new pages indexed within 7 days |

#### 3.2 Comparisons expansion 58 → 200 (Week 9–10)

| ID | Task | Acceptance |
|---|---|---|
| **3.2a** | Generate 142 new "X vs Y" pages via the `seo-competitor-pages` skill pattern. Inputs: every adjacent pair in philosophies, every deity/deity within tradition, every practice/practice. Each: comparison table, TL;DR, deep-dive, 4 FAQs, internal links to both subjects. | 200 comparisons live |
| **3.2b** | Brief check on cannibalization: ensure no two comparison pages target identical query intent. | Review log + dedup commit |

#### 3.3 Mantras expansion 33 → 150 (Week 10)

| ID | Task | Acceptance |
|---|---|---|
| **3.3a** | Add 117 canonical mantras: full Vedic suktas, Shaiva/Shakta/Vaishnava mantras, Navagraha mantras, common bija mantras. Each: Devanagari, IAST transliteration, word-by-word meaning, shastra context, 4 FAQs. Optional but high-leverage: audio link (creative-commons sources). | 150 mantra pages live |

#### 3.4 Deity ashtottara (108 names) for top 10 deities (Week 10–11)

> Adds ~1,080 named-entity-rich pages. Pattern already proven via Vishnu/Lalita Sahasranama.

| ID | Task | Acceptance |
|---|---|---|
| **3.4a** | Seed ashtottara JSON for: Shiva, Ganesha, Hanuman, Krishna, Rama, Saraswati, Lakshmi, Durga, Surya, Subrahmanya. | 10 ashtottara JSONs in `content/stotras/<deity>-ashtottara.json` |
| **3.4b** | Wire dynamic route `/stotras/<deity>-ashtottara/[name-slug]`. Per name: meaning, literary analysis, mythological context, related names, 3 FAQs. | 1,080 pages live + indexed |

#### 3.5 Festival pages + daily Panchang archive (Week 11)

| ID | Task | Acceptance |
|---|---|---|
| **3.5a** | Build `/festivals/[slug]` for 50 principal festivals: Navaratri, Maha Shivaratri, Diwali, Janmashtami, Holi, Raksha Bandhan, Ram Navami, Hanuman Jayanti, Krishna Janmashtami, Vasant Panchami, Ganesh Chaturthi, Onam, Pongal, Akshaya Tritiya, Guru Purnima, etc. Each: significance, mythological story, observance practices, dates (lunar pattern), Article schema with `temporalCoverage`. | 50 festival pages live |
| **3.5b** | `/panchang/daily/[date]` archive: pre-build last 365 days + future 365 days. Each page: tithi, nakshatra, yoga, karana, vara, sun/moon timings, deity-of-day, festival-on-day, 3–5 contextual links to relevant deities/practices. ISR with `revalidate=86400`. | 730 panchang pages indexed + crawled within 14 days |

#### 3.6 HowTo schema rollout to 100+ pages (Week 11)

| ID | Task | Acceptance |
|---|---|---|
| **3.6a** | Extend HowTo schema beyond the 8 from Phase 1 to all 100 practice pages, mantra pages with chanting protocol, and applicable concept pages. | Schema validator confirms HowTo eligibility on 100+ pages |

#### 3.7 YouTube launch (Week 11–12)

> 23.3% of AIO citations are YouTube. 0.737 correlation between YouTube mention and AI citation. **Highest-leverage multi-modal play.**

| ID | Task | Acceptance |
|---|---|---|
| **3.7a** | Set up @opensadhaka YouTube channel. Brand banner, About description (with link to opensadhaka.com), trailer video. Verify channel. | Channel live with verified custom URL |
| **3.7b** | Convert top 10 articles into YouTube videos (3–8 min each, talking-head + B-roll + text overlay). Use the existing voice / writing — adapt for spoken delivery. Produce in batches of 2 per week. | 10 videos live by end of Week 12 |
| **3.7c** | Each video description: 200-word summary + link to source article + 5 chapter timestamps + transcript. This produces a YouTube-Sadhaka backlink that AI Overviews can match-and-cite. | All 10 video descriptions follow template |
| **3.7d** | Submit channel to YouTube Search Console; enable closed captions + auto-transcripts (AI search engines parse YouTube transcripts). | Captions + transcripts live for all 10 videos |

#### 3.8 Sacred Sites pSEO category (Week 12, optional stretch)

| ID | Task | Acceptance |
|---|---|---|
| **3.8a** | Build `/sacred-sites/[slug]` for 50–100 sites: 12 Jyotirlingas, 51 Shakti Peethas, 108 Divya Desams (top 30), Char Dham, Sapta Puri. Each: location (Place schema with geo), significance, deity, festivals, visit guide. | First 50 sites live |

**Phase 3 gates (week-12 review on 2026-08-04):**
- pSEO total: 2,000+ pages live + indexed
- YouTube channel live, 10 videos published, ≥1 video referenced in an AI search response
- ≥1 Wikipedia external link accepted
- Ranking position 1–3 for at least 3 of: `what is sanatan dharma`, `what is maya in vedanta`, `advaita vs dvaita`, `best bhagavad gita translation for beginners`, `how to start japa`, `kundalini awakening symptoms`
- Total clicks: ≥10x Phase 0 baseline
- Indexed pages: ~4,500+

---

## 4. Ongoing parallel workstreams (every week, all phases)

### 4.1 Editorial cadence

| Cadence | Output | Skill |
|---|---|---|
| 3–5 articles per week | New editorial articles via `/idea-sourcer → /content-planner → /write-article → /seo-optimize` pipeline | Pipeline already validated |
| 1 newsletter per 2 weeks | Deep essay via `/write-newsletter` (essayist intellectual voice, no SEO step) | Pipeline already validated |
| 2–3 X posts per week | Daily observations / commentary via `/write-x` (@ankit_pfc voice) | Skill at `~/.claude/skills/write-x/` |
| 5–10 Reddit answers per month | Per Phase 2.2 cadence | — |

### 4.2 Outreach

| Cadence | Output |
|---|---|
| 1 Wikipedia edit per week (after Week 6) | Per Phase 2.1c |
| 5 backlink outreach emails per week | Per Phase 2.7b |
| 3–5 podcast pitches per week | Per Phase 2.6b |
| 1 press pitch per week | Per Phase 2.6d |

### 4.3 Distribution multipliers (post-Phase-3 ongoing)

- **YouTube:** 1 new video per week (post-launch)
- **X threads:** 1 thread per week from a high-citability article passage
- **LinkedIn long-form:** 1 essay per 2 weeks (essayist tone, citation-rich)
- **Substack/newsletter syndication:** cross-post 50% of long essays for distribution
- **Quora answers:** 2–3 per week on `Indian philosophy`, `Vedanta`, `Sanatan Dharma` topic spaces

### 4.4 Measurement (per Phase 0.5 + weekly retro)

Weekly snapshot via `/loop` runs:

```
/loop weekly run scripts/weekly-snapshot.mjs and write summary to docs/analytics-snapshots/
```

Tracks per snapshot:
- GSC: total clicks, impressions, average CTR, average position (last 7 days vs prior 7 days)
- GSC: top 50 queries by impressions; flag any with CTR <2% or position 4–10 (CTR-bleed candidates)
- GSC: top 20 pages by clicks growth; top 20 pages by clicks loss
- GA4: total sessions, organic / direct / referral / AI-referrer breakdown
- AI referrer trace: count of `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, `copilot.microsoft.com` referrers
- Bing WMT: indexed page count
- Ahrefs: health score (run `/retro` workflow monthly)

Monthly: full Ahrefs audit + competitor delta vs vedabase.io, isha.sadhguru.org, britannica.com Vedanta articles, learnreligions.com Hindu section.

---

## 5. Tasks index (flat, sortable)

| ID | Phase | Title | Effort | Depends on | Owner | ETA |
|---|---|---|---|---|---|---|
| 0.1 | 0 | Rebuild GSC service account | 2h | — | Ankit | 2026-05-08 |
| 0.2 | 0 | Fix /llms-full.txt 500 | 4h | — | Ankit | 2026-05-08 |
| 0.3 | 0 | Expand /llms.txt to stotras + pSEO | 3h | 0.2 | Ankit | 2026-05-09 |
| 0.4 | 0 | Bing Webmaster setup | 1h | — | Ankit | 2026-05-09 |
| 0.5 | 0 | Weekly snapshot script | 3h | 0.1 | Ankit | 2026-05-12 |
| 0.6 | 0 | Outreach mail (DKIM/SPF) | 2h | — | Ankit | 2026-05-12 |
| 1.1a–d | 1 | Entity / E-E-A-T anchor on /about + article templates | 1d | — | Ankit | 2026-05-15 |
| 1.2a–c | 1 | Top-50 CTR rewrite | 4d | 0.1 | Ankit | 2026-05-22 |
| 1.3a | 1 | HowTo schema on 8 practice articles | 1d | — | Ankit | 2026-05-22 |
| 1.4a–b | 1 | OG tag templating + 8 default images (T7) | 2d | — | Ankit | 2026-05-22 |
| 1.5a | 1 | AEO blocks for remaining 38 articles | 1d | — | Ankit | 2026-05-22 |
| 1.6a–d | 1 | Internal linking cascade (T10 Wave B) + orphan fix | 3d | — | Ankit | 2026-05-29 |
| 1.7a | 1 | IndexNow + Indexing API mass resubmit (T8) | 0.5d | 1.4–1.6 | Ankit | 2026-06-02 |
| 2.1a | 2 | Wikipedia editor reputation (≥20 minor edits) | 14d cal | — | Ankit | 2026-06-17 |
| 2.1b | 2 | 8 Wikipedia target paragraphs identified | 1d | — | Ankit | 2026-06-10 |
| 2.1c | 2 | Wikipedia edits with Sadhaka citation (1/wk) | weekly | 2.1a | Ankit | 2026-06-17 to 2026-07-07 |
| 2.2a–c | 2 | Reddit answer campaign (10/month) | weekly | — | Ankit | ongoing |
| 2.3a–f | 2 | Mass re-optimize 77 articles to Citability ≥8 | 4 wks | 0.x done | Ankit + content-pipeline | 2026-06-03 to 2026-07-07 |
| 2.4a–b | 2 | Sprint 2 + Sprint 3 articles (9 articles) | 3 wks | — | Ankit + content-pipeline | 2026-06-24 |
| 2.5a–c | 2 | BG shloka analysis Ch 2–18 | 3 wks | — | Ankit + content-pipeline | 2026-07-07 |
| 2.6a–d | 2 | Podcast + press outreach | 4 wks | 0.6 | Ankit | 2026-07-07 |
| 2.7a–b | 2 | Backlink outreach (5/wk) | weekly | 0.6 | Ankit | ongoing |
| 3.1a–b | 3 | Sanskrit glossary 67→250 | 1 wk | — | Ankit + content-pipeline | 2026-07-14 |
| 3.2a–b | 3 | Comparisons 58→200 | 2 wks | — | Ankit + content-pipeline | 2026-07-21 |
| 3.3a | 3 | Mantras 33→150 | 1 wk | — | Ankit + content-pipeline | 2026-07-21 |
| 3.4a–b | 3 | Deity ashtottara × 10 | 2 wks | — | Ankit + content-pipeline | 2026-07-28 |
| 3.5a–b | 3 | Festival pages × 50 + Panchang daily × 730 | 1 wk | — | Ankit + data | 2026-07-28 |
| 3.6a | 3 | HowTo schema → 100 pages | 0.5 wk | — | Ankit | 2026-07-28 |
| 3.7a–d | 3 | YouTube launch + 10 videos | 2 wks | — | Ankit | 2026-08-04 |
| 3.8a | 3 | Sacred Sites pSEO (50 sites, stretch) | 1 wk | — | Ankit | 2026-08-04 stretch |

---

## 6. KPI dashboard (review weekly)

### 6.1 Baselines to capture in Phase 0.5

| Metric | Source | Baseline (fill in 2026-05-12) | Target W4 | Target W8 | Target W12 |
|---|---|---|---|---|---|
| Total clicks (GSC, last 7 days) | GSC API | __ | +30% | +150% | +1000% |
| Total impressions (GSC, last 7 days) | GSC API | __ | +50% | +300% | +1500% |
| Average CTR (GSC, last 7 days) | GSC API | __ | +50% | +100% | +200% |
| Average position (GSC, last 7 days) | GSC API | __ | -2 positions | -5 positions | top 3 for 5 canonical queries |
| Indexed pages (GSC) | GSC | __ | +5% | +15% | +90% (with pSEO scaling) |
| Bing indexed pages | Bing WMT | __ | +5% | +15% | +90% |
| Organic referrers from AI surfaces (GA4) | `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, `copilot.microsoft.com` | __ | 5+ /day | 25+ /day | 100+ /day |
| Wikipedia external links live | manual | 0 | 0 (reputation building) | 1+ | 3+ |
| Reddit posts with >25 upvotes linking Sadhaka | manual | 0 | 1 | 5 | 12 |
| YouTube subscribers | YouTube | 0 | 0 | 0 | 100+ |
| Ahrefs Domain Rating | Ahrefs | __ | +1 | +3 | +5 |
| Ahrefs referring domains | Ahrefs | __ | +5 | +25 | +60 |
| Ahrefs site health score | Ahrefs | (was 34% on 13-Apr; T1–T10 Wave A should have lifted to ~85%+) | 85%+ | 90%+ | 92%+ |

### 6.2 Canonical query target set (the queries we want to OWN)

Track ranking position weekly via DataForSEO MCP or manual SERP check:

| Query | Current intent owner | Sadhaka target page | Target rank by W12 |
|---|---|---|---|
| what is sanatan dharma | Britannica, Wikipedia | /what-is-sanatan-dharma | top 3 |
| sanatan dharma vs hinduism | Wikipedia, learnreligions | /what-is-sanatan-dharma#difference | featured snippet |
| advaita vedanta explained | vedabase.io, britannica | /advaita-vedanta-explained | top 3 |
| what is maya in vedanta | various low-authority blogs | /what-is-maya | #1 |
| advaita vs dvaita | vedabase.io | /advaita-vs-dvaita | #1 |
| best bhagavad gita translation for beginners | Reddit threads | /best-bhagavad-gita-translation-for-beginners | top 3 |
| how to start japa meditation | various wellness blogs | /how-to-start-japa | top 3 |
| kundalini awakening symptoms | wellness sites, Mooji.org | /kundalini-awakening | top 5 |
| dark night of the soul vs spiritual bypassing | various | /dark-night-of-the-soul | #1 (low competition, unique angle) |
| meditation for trauma survivors | various therapy blogs | /meditation-for-trauma-survivors | top 5 |
| ramana maharshi who am i | Ramana Maharshi ashram | /ramana-maharshi-who-am-i | top 5 |
| isha foundation cult | various critique sites + Reddit | /isha-foundation-sadhguru | top 3 |
| vedanta vs buddhism | Wikipedia, vedabase | /vedanta-vs-buddhism | top 5 |
| how to learn sanskrit | sanskrit.ksu.edu, Coursera | /how-to-learn-sanskrit | top 5 |
| spiritual antidote to hustle culture | various productivity blogs | /spiritual-antidote-to-hustle-culture | #1 (low competition) |

### 6.3 AI-surface citation targets

By W12, Sadhaka should be cited by name in AI responses for at least 3 of the canonical queries above. Manual probe weekly:

```bash
# Test queries weekly
# 1. ChatGPT (Search): "what is maya in vedanta" — check sources
# 2. Perplexity: "advaita vs dvaita" — check sources
# 3. Google AI Overview: "best bhagavad gita translation for beginners"
# 4. Claude (with web): "what is sanatan dharma"
# 5. Bing Copilot: "isha foundation criticisms"
```

Track in `docs/analytics-snapshots/ai-citation-probes-YYYY-MM-DD.md`.

---

## 7. Reference assets

### 7.1 CTR power templates for the spiritual niche

Use these as the rewrite menu for Phase 1.2b. All ≤60 chars. Spiritual niche has lower tolerance for clickbait — power words must feel earned, not shouted.

| Pattern | Example title | When to use |
|---|---|---|
| `[Practice]: The [N] [Powerful/Real/True] [Methods/Mistakes] (2026 Guide)` | Japa: The 3 True Methods (2026 Beginner Guide) | how-to articles |
| `What is [X]? The [Real/True/Honest] Answer (Not [Misconception])` | What is Maya? The Real Answer (Not "the World is Fake") | concept hubs |
| `[X] vs [Y]: [Sharp Differentiator]` | Advaita vs Dvaita: Why the Self Question Splits Vedanta | comparison |
| `[X]: [Specific Outcome] in [Specific Time]` | Daily Meditation: Calm in 14 Days (Vedic Method) | practice |
| `The [Hidden/Forgotten/Real] [Concept] [Mainstream] Misses` | The Real Karma the Internet Gets Wrong | corrective hub |
| `Why [Authority Says X]: A [Lineage] Guide` | Why the Gita Says Act Without Attachment: Shankara's Reading | philosophical |
| `[N] Signs of [Outcome] (and [Counter-signal])` | 6 Red Flags of a Fake Guru (and What a Real One Does) | discernment |
| `[Practice] for [Emotion / Condition]: [What Works], [What Doesn't]` | Meditation for Trauma: What Works, What Backfires | wellness |

**Power words allowed in our voice (no AI slop):** real, true, honest, hidden, forgotten, complete, beginner, sharp, decisive, ancient, modern, classical, sourced, traditional, lineage, primary-source, scholarly, careful, direct, plain.

**Power words to AVOID:** ultimate, mind-blowing, secret, simple trick, shocking, unbelievable, top, best (unless followed by qualifier like "best for X").

### 7.2 Meta description CTR template

Pattern: `[answer in plain words]. [credential / specificity hook]. [intent-matching reassurance].` (140–155 chars)

Example: `Maya doesn't mean the world is fake. It means the world has conditional reality. A precise guide rooted in Shankara's commentaries.` (148 chars)

### 7.3 Existing skills to invoke per task

| Task | Skill |
|---|---|
| Per-article re-optimize (Phase 2.3) | `/seo-optimize` |
| New article writing (Phase 2.4) | `/write-article` |
| Newsletter (parallel cadence) | `/write-newsletter` |
| X / Twitter posts | `/write-x` |
| Image/OG generation | `seo-image-gen` skill via banana MCP |
| Schema validation | `seo-schema` skill |
| Backlink analysis | `seo-backlinks` skill |
| Local SEO (sacred sites with Place schema) | `seo-local` |
| Content planning | `/content-planner` |
| Idea generation | `/idea-sourcer` |
| Post-publish review | `/debrief` |
| Programmatic SEO | `seo-programmatic` skill |
| Competitor pages | `seo-competitor-pages` skill |

---

## 8. Risks + counter-moves

| Risk | Counter-move |
|---|---|
| GCP project rebuild blocks Phase 0 indefinitely | Fall back to manual GSC via web UI; export weekly CSV; defer scripts/automation |
| Wikipedia community rejects all 8 target paragraph edits | Pivot to citing-secondary-sources strategy: get cited by 3 academic / journalism sources first, then re-attempt Wikipedia |
| Reddit campaign comes off as spam → bans | Lead with 5 value-only answers per linked post (5:1 ratio); never link in own subreddit posts; never link unless directly answers asker |
| Mass re-optimization breaks voice consistency | Hard gate: voice score ≥35/50 before commit; reject if AI-slop creeps in |
| pSEO scaling triggers thin-content / doorway penalty | Hard gate: 300-word minimum unique content per page; cluster review before each batch |
| YouTube launch absorbs more time than budgeted | Cap at 10 videos in Phase 3; defer scaling to post-W12 only if signal warrants |
| Algorithm update mid-plan invalidates assumptions | Monthly /retro reviews algorithm signal; this plan is pivotable at any phase boundary |
| Competitor (e.g. Sadhguru/Isha) launches a competing reference site | Differentiation = lineage transparency + primary citations + scholarly tone; we don't compete on celebrity, we compete on rigor |
| Wikipedia editor account flagged as COI | Use 14-day reputation period; disclose interest on user page if asked; second-account fallback ready |

---

## 9. Resume prompts (paste into a fresh session for each task)

Each phase task above has a clear scope. Below are the high-leverage resume prompts; the rest are derivable from the table.

### Phase 0.1 — Rebuild GSC service account
```
The GCP project for opensadhaka.com's GSC API has been deleted (`Project #575787169950`).
Walk me through:
1. Creating a new Google Cloud project named `sadhaka-seo`
2. Enabling Google Search Console API + Google Indexing API
3. Creating a service account with Search Console permissions
4. Generating + downloading a JSON key
5. Replacing /Users/ankitmishra/Developer/Sadhaka/.data/google-service-account.json
6. Adding the service account email as an Owner of the sc-domain:opensadhaka.com property in Search Console
7. Verify by running `node scripts/gsc-diagnose.mjs`
```

### Phase 0.2 — Fix /llms-full.txt 500
```
Production /llms-full.txt returns HTTP 500. Diagnose. Look at:
- src/app/llms-full.txt/route.ts (or wherever it's served)
- scripts/generate-llms-txt.mjs (the generator)
- Vercel function logs if accessible
Likely cause: timeout or memory cap on building a 2,470-page concatenation.
Fix options: ISR (revalidate=86400), pre-build at deploy time, or paginate.
Ship the fix + add a route handler test that asserts HTTP 200 + non-empty body.
```

### Phase 1.1 — Entity anchoring on /about
```
Add named editor + Person schema + Organization schema completeness to /about.

Read RAMP_UP_PLAN.md §1.1 and §3 Phase 1.1 a–d. Specifically:
- Add Ankit Mishra as named editor with byline above fold
- Embed Person JSON-LD: name, jobTitle, description, sameAs (LinkedIn, X/@ankit_pfc, GitHub), knowsAbout
- Extend Organization schema with foundingDate, slogan, knowsAbout array (12+ topics), sameAs
- Add visible stats block: "77 long-form articles · 1,000+ Sahasranama verses analyzed · 6 darshanas covered · 52 sourced claims"
- Wrap stats in <p data-speakable>
- Update src/app/(editorial)/_components/ArticleLayout.tsx (or equivalent) so every article shows author byline + datePublished + dateModified above fold

Verify: schema.org validator passes; rich results test shows Person + Organization eligibility.
```

### Phase 1.2 — Top-50 CTR rewrite
```
GSC is now live (Phase 0.1 done). Pull last-28-days top 100 queries by impressions.
For each, identify the ranking page, current title, current CTR. Sort by `impressions × (1 − CTR)`.

For top 50 candidates:
1. Read RAMP_UP_PLAN.md §7.1 (CTR power templates) and §7.2 (description template)
2. Rewrite title to ≤60 chars, with power word, query exact-match, year qualifier where evergreen
3. Rewrite meta description to 140–155 chars: answer + credential + reassurance
4. Run through voice skill for slop check
5. Commit in batches of 10 with message: `seo(ctr): rewrite top-N titles + descriptions for CTR uplift`

Track in docs/analytics-snapshots/ctr-bleed-2026-05-13.md.
```

### Phase 2.3 — Mass re-optimize 77 articles
```
Read RAMP_UP_PLAN.md §3 Phase 2.3 + 2026-04-17-llm-traffic-sections-3-4.md §Section 3.

Per article:
1. Add 2+ inline source citation hyperlinks within prose
2. Add 1+ Sanskrit-original quotable formula (Devanagari + IAST + named source)
3. Add 1+ statistic with attribution
4. Bump dateModified if substantive (don't bump artificially)
5. Run /seo-optimize — Citability must score ≥8/10
6. Voice score ≥35/50, AEO block PASS

Start with Sprint 1 hubs. Batch 5–8 articles per commit: `seo(aeo): re-optimize <N> articles to Citability ≥8`.
After each batch: npm run build && npm run lint && npm run test:run.
```

### Phase 2.1c — Wikipedia edit
```
Read RAMP_UP_PLAN.md §3 Phase 2.1 + docs/research/2026-05-15-wikipedia-target-paragraphs.md.

Today's target paragraph: <paste the specific paragraph + Wikipedia article + Sadhaka URL>.

Draft the edit:
1. Identify what factual content the existing paragraph is missing
2. Write the addition (2–3 sentences, NPOV, sourced)
3. Cite Sadhaka as ONE of the multiple sources (vedabase.io, scholarly source, Sadhaka — never Sadhaka alone)
4. Add to Wikipedia
5. Watch for revert; if reverted, adjust phrasing per reviewer feedback and resubmit

Log the edit + outcome in docs/research/wikipedia-edit-log.md.
```

### Phase 3.1 — Sanskrit glossary expansion
```
Read RAMP_UP_PLAN.md §3 Phase 3.1.

Expand /learn/sanskrit/ from 67 to 250 entries.

Source: src/data/sanskritVocab.ts (~2,000 entries). Pull search volume via DataForSEO MCP if connected; else use the manual priority list in docs/research/2026-07-08-sanskrit-priority-list.md.

Per new entry:
- Devanagari original
- IAST transliteration
- Etymology (root + suffix breakdown)
- Primary text citation (Vedas / Upanishads / Gita verse where applicable)
- 3 related concepts (internal links)
- 3 FAQs
- AEO direct-answer block (60–100 words)

Batch 30 entries per session per CLAUDE.md token cap. After each batch:
- npm run llms:generate
- npm run build && npm run lint && npm run test:run
- commit with `seo(pseo): expand sanskrit glossary +<N> entries`
- IndexNow submit
```

---

## 10. Closing — what success looks like on 2026-08-04

By the end of Week 12, Sadhaka should:
- Rank in the top 3 on Google for at least 5 of the 15 canonical queries in §6.2
- Be cited by name in at least 3 AI-surface responses (ChatGPT, Perplexity, AIO, Claude, Copilot)
- Have at least 1 Wikipedia article externally linking to opensadhaka.com
- Have at least 12 Reddit posts with >25 upvotes referencing our content
- Be receiving 100+ AI-referrer sessions per day in GA4
- Have ~4,500 indexed pages (vs ~2,470 today) with no doorway / thin-content flagging
- Have a YouTube channel with 10 videos and growing subscribers
- Have a measurement loop running weekly via the snapshot script

If we hit even half these targets, the citation flywheel will be self-sustaining: more Reddit + Wikipedia + YouTube → more LLM mentions → more AI-referred clicks → more brand searches → more Google Knowledge Graph weight → higher rankings → more clicks → repeat.

---

**Plan owner:** Ankit Mishra
**Plan reviewed by:** _(pending — recommend `/plan-ceo-review` then `/plan-eng-review` before executing Phase 0)_
**Resume prompt:** "Continue Sadhaka traffic ramp-up from RAMP_UP_PLAN.md. Status: pre-Phase-0. Begin with task 0.1 (rebuild GSC service account)."
