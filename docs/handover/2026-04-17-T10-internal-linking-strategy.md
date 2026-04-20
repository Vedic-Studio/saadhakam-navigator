# T10 — Internal Linking Cascade: Strategy Proposal

**Status:** Draft for CEO/founder approval. No code edits until signed off.
**Author:** Planning agent (read-only pass over audit data + codebase)
**Sources:** `Ahfrens Audit/opensadhaka_13-apr-2026_page-has-only-one-dof_*.csv` (1,839 rows), `Ahfrens Audit/opensadhaka_13-apr-2026_orphan-page-*.csv` (31 rows), `src/app/**`, `src/data/concepts*.ts`, `src/data/sanskritVocab.ts`, `src/data/articles.ts`.

---

## TL;DR — the recommendation

Ship three small, independently-revertable waves in this order:

1. **Wave A (Layer 1):** four hub-template edits that inject complete leaf listings + prev/next + header/footer into sahasranama name pages, BG shloka pages, and Panchang tithi pages. **This single wave fixes ~93% of the 1,839 under-linked URLs** because they are just two route shapes (`/stotras/lalita-sahasranama/[slug]` and `/texts/bhagavad-gita/[chapter]/[shloka]`). No new data files, no new modules. 4 files touched.
2. **Wave B (Layer 2):** the new `src/lib/internal-links/map.ts` engine powering a shared `<RelatedLinks>` block at the bottom of every leaf template. Seeds from existing `concepts.ts`, `sanskritVocab.ts`, `articles.ts`. Deterministic, data-driven, no live calls. ~8–10 files touched (1 lib + 1 component + wiring into 6–8 leaf templates).
3. **Wave C (Layer 3 + orphans):** Panchang daily engine (same pattern as Wave B but keyed on tithi/nakshatra/deity of the day) and 31 targeted orphan fixes. ~5 files + a one-shot orphan PR.

Reject the temptation to do all three in one mega-PR. If Wave A alone lifts the median from 1 → 5, Waves B and C can be scoped down to "polish" rather than "rescue". Measure after each wave.

**Reader-skeptic check:** is this scope-creep? No — Wave A is a four-file edit with immediate mathematical impact. Waves B and C are genuinely additive (rankings/AEO), but they are gated on Wave A landing first and being measured.

---

## 1. Bucket breakdown — where the 1,839 under-linked pages actually live

Grouped by top-level route (authoritative counts from the CSV):

| Bucket | Count | % of 1,839 | Route | Hub it should cascade from |
|---|---:|---:|---|---|
| Lalita Sahasranama names | 1,000 | 54.4% | `/stotras/lalita-sahasranama/[slug]` | `/stotras/lalita-sahasranama` (already lists all 1,000 — the link delivery is what's broken, see §2) |
| BG shlokas | 700 | 38.1% | `/texts/bhagavad-gita/[chapter]/[shloka]` | `/texts/bhagavad-gita/[chapter]` (chapter page) + new prev/next |
| Practices intents | 30 | 1.6% | `/practices/[practice]/for/[intent]` | `/practices/[practice]` hub + sibling intents |
| Sanatan-history leaves | 25 | 1.4% | `/sanatan-history/{evidence,civilizations,researchers,dynasties,sites}/[slug]` | `/sanatan-history` top hub + per-category index |
| Compare pages | 23 | 1.3% | `/compare/[slug]` | `/compare` index + related-concept cross-links |
| Panchang tithis | 16 | 0.9% | `/jyotish/panchang/tithis/[slug]` | `/jyotish/panchang` + daily Panchang linker |
| Mantras | 7 | 0.4% | `/mantras/[slug]` | `/mantras` index + deity/concept cross-links |
| Deities | 6 | 0.3% | `/deities/[slug]` | `/deities` index + stotra cross-links |
| Philosophies | 5 | 0.3% | `/philosophies/[slug]` | `/philosophies` index + traditions cross-links |
| Learn/Sanskrit | 4 | 0.2% | `/learn/sanskrit/[word]` | `/learn/sanskrit` + article cross-links |
| Greats | 4 | 0.2% | `/greats/[slug]` | `/greats` index + concept cross-links |
| Topics | 4 | 0.2% | `/topics/[topic]` | Homepage `DiscoverSection` + article hub |
| Root-level `/what-is-*` | ~10 | 0.5% | `/(concepts)/[slug]` | `/concepts` hub + article cross-links |
| Other (single-file hubs: `/texts/upanishads`, `/online-yoga-teacher-training-worth-it`, etc.) | ~5 | 0.3% | various | case-by-case in orphan PR |

**Takeaway:** 1,700 of 1,839 (92.4%) are two route shapes. Everything else is long tail.

**Root cause Wave A must fix (found during analysis, not in the original plan):**

- `/stotras/lalita-sahasranama/[slug]/page.tsx` currently renders **no Header, no Footer** — just a breadcrumb, the name card, and one "← Back" link. Every inlink to that page comes from the index only, and Ahrefs counts it as 1 dofollow. Adding Header + Footer alone takes the count from 1 → ~40 per page site-wide.
- `/texts/bhagavad-gita/[chapter]/[shloka]/page.tsx` is identical: no Header, no Footer, no prev/next, one "View all shlokas in Chapter X" link. Same fix applies.
- Both templates predate the shared layout refactor. They are the only leaf templates in the codebase missing the global chrome.

This is a five-line fix hidden in a 1,700-page problem. Wave A is mostly this.

---

## 2. Three-layer plan — files that actually get edited

### Layer 1 (Wave A) — Hub → leaf cascade

**Goal:** every leaf page has ≥ Header nav (~25 links) + Footer (~25 links) + immediate-sibling nav (prev/next or full listing).

**Files edited (4):**

1. `src/app/stotras/lalita-sahasranama/[slug]/page.tsx`
   - Import and render `<Header />` and `<Footer />` (same pattern as BG chapter page / article pages).
   - Add prev/next links (names N-1 and N+1) + a "Jump to name…" section that links to 5 thematically-grouped names (names 1, 250, 500, 750, 999 as anchors).
   - Same template edit copy-pasted for `/stotras/vishnu-sahasranama/[slug]` (also has 1,000 names, same issue likely).
2. `src/app/stotras/vishnu-sahasranama/[slug]/page.tsx` (preemptive — will have same bug)
3. `src/app/texts/bhagavad-gita/[chapter]/[shloka]/page.tsx`
   - Add `<Header />` and `<Footer />`.
   - Add prev/next shloka within chapter + "next chapter" link at verse N=last.
   - Add link to `/texts/bhagavad-gita` root hub.
4. `src/app/jyotish/panchang/tithis/[slug]/page.tsx` (if exists, else scaffold minimal)
   - Add Header/Footer and link to all 30 sibling tithis (2 rows: shukla + krishna).

**Expected impact:** 1,700 + 16 = 1,716 of 1,839 pages move from 1 inlink → 40+ inlinks from Header/Footer alone. Plus prev/next/sibling adds route-specific relevance.

**Why this is Wave A and not Layer 2:** it's a one-line `<Header />` / `<Footer />` import per file. Do not block this on the link-map engine.

### Layer 2 (Wave B) — Cross-concept `src/lib/internal-links/map.ts`

**Goal:** every leaf page surfaces 3–5 *contextually-relevant* cross-links at the bottom, not just chrome links.

**New files (2):**

1. `src/lib/internal-links/map.ts` — the engine. Exports `relatedLinks(pageSlug, topic?, concepts?)` returning `{ href, anchor, reason }[]`. See §3 for algorithm.
2. `src/components/RelatedLinks.tsx` — dumb presentational component. Renders the array from the engine as a styled footer block with 3–5 anchors.

**Existing files wired (6–8):**

- `src/app/stotras/lalita-sahasranama/[slug]/page.tsx`
- `src/app/stotras/vishnu-sahasranama/[slug]/page.tsx`
- `src/app/texts/bhagavad-gita/[chapter]/[shloka]/page.tsx`
- `src/app/mantras/[slug]/page.tsx`
- `src/app/deities/[slug]/page.tsx`
- `src/app/(concepts)/[slug]/page.tsx`
- `src/app/compare/[slug]/page.tsx`
- `src/app/learn/sanskrit/[word]/page.tsx`

**Each wiring = 2 lines:** import + `<RelatedLinks for={{ slug, topic, concepts }} />`.

**Data inputs (already exist, no new data seeding):**

- `src/data/concepts.ts` (30 concepts, each with `relatedConcepts: string[]`)
- `src/data/sanskritVocab.ts` (~56+ words with `slug`, associated concepts)
- `src/data/articles.ts` (~77 articles with `category`, `tags`)
- Lalita + Vishnu + Shiva + Panchang JSON metadata (already has `deity`, `tradition` tags we can key off)

### Layer 3 (Wave C part 1) — Panchang daily engine

**Goal:** the daily `/panchang` page (and `/panchang/YYYY-MM-DD` if we add it) surfaces 3–5 deep links based on *today's* tithi / nakshatra / vara / yoga / karana.

**New file (1):**

- `src/lib/internal-links/panchang-links.ts` — pure function `getPanchangLinks(tithi, nakshatra, vara, yoga, karana) => Link[]` that maps each panchanga element to its canonical page (already built: `/jyotish/panchang/tithis/[slug]`, `/jyotish/nakshatras/[slug]`, etc.). Deterministic — zero API calls.

**Files edited (1–2):**

- `src/app/panchang/page.tsx` — render a `<RelatedLinks>` block using the new helper.
- `src/app/jyotish/panchang/page.tsx` if it's a separate route.

### Orphans (Wave C part 2)

See §4 — one PR adds a link to each of 31 orphans from its nearest hub.

---

## 3. Cross-concept algorithm

**Recommendation:** rank by a weighted additive score across four signals. Pure function, deterministic, no ML, runs in <1ms per page.

```ts
// src/lib/internal-links/map.ts
type LinkCandidate = {
  href: string;
  anchor: string;
  slug: string;
  concepts: string[];     // concept slugs this page is tagged with
  category: string;       // 'concept' | 'article' | 'deity' | 'mantra' | 'text' | etc.
  traditions: string[];   // e.g., ['advaita','shaktism']
};

type PageContext = {
  slug: string;           // current page
  concepts?: string[];    // concept slugs for current page
  category?: string;
  traditions?: string[];
};

const WEIGHTS = {
  sharedConcept: 3.0,     // strongest signal: explicit concept overlap
  sameTradition: 1.5,
  categoryAffinity: 1.0,  // e.g., deity -> mantra, concept -> article
  vocabOverlap: 0.75,     // sanskrit root shared
  titleTokenMatch: 0.25,  // weakest — fallback only
};

// Hand-tuned affinity matrix — which categories make sense to cross-link to
const CATEGORY_AFFINITY: Record<string, string[]> = {
  'sahasranama-name': ['deity', 'concept', 'mantra', 'tradition'],
  'bg-shloka':        ['concept', 'article', 'deity', 'text'],
  'mantra':           ['deity', 'sahasranama-name', 'concept'],
  'deity':            ['mantra', 'sahasranama-name', 'tradition', 'article'],
  'concept':          ['article', 'bg-shloka', 'concept'],
  'article':          ['concept', 'article', 'text'],
  'compare':          ['article', 'concept', 'tradition'],
  'sanskrit-word':    ['concept', 'article'],
  'panchang-tithi':   ['deity', 'mantra', 'concept'],
  // ...
};

function score(page: PageContext, cand: LinkCandidate): number {
  if (cand.slug === page.slug) return -Infinity; // don't self-link
  let s = 0;
  // 1. Shared concepts (strongest)
  const shared = (page.concepts ?? []).filter(c => cand.concepts.includes(c)).length;
  s += shared * WEIGHTS.sharedConcept;
  // 2. Tradition overlap
  const tradOverlap = (page.traditions ?? []).filter(t => cand.traditions.includes(t)).length;
  s += tradOverlap * WEIGHTS.sameTradition;
  // 3. Category affinity (is cand's category in page's affinity list?)
  const affinity = CATEGORY_AFFINITY[page.category ?? ''] ?? [];
  if (affinity.includes(cand.category)) s += WEIGHTS.categoryAffinity;
  // 4. Vocab overlap — cheap token intersection of transliterated root
  // (implementation detail; skip if no transliteration available)
  // 5. Fallback: title-token match
  // ...
  return s;
}

export function relatedLinks(ctx: PageContext, limit = 4): LinkCandidate[] {
  const pool = getAllLinkCandidates(); // built at module load from concepts.ts + articles.ts + vocab + stotra JSONs
  return pool
    .map(c => ({ c, s: score(ctx, c) }))
    .filter(x => x.s > 0)              // drop no-signal candidates
    .sort((a, b) => b.s - a.s)
    .slice(0, limit * 2)               // take top 2×limit
    .sort(() => Math.random() - 0.5)   // gentle shuffle so pages don't all show the exact same 4
    .slice(0, limit)
    .map(x => x.c);
}
```

**Design notes:**

- **Deterministic at build time.** The `Math.random()` shuffle is problematic — it defeats static-generation caching. Replace with a stable hash of `ctx.slug` as the seed. (Noted as an implementation detail for Wave B.)
- **Negative example filter.** If `shared === 0 && tradOverlap === 0`, return nothing rather than fall back to category-only — we want empty blocks over irrelevant blocks.
- **Floor: 3 links or 0.** If scoring produces fewer than 3 candidates, render nothing (avoid "related: \[1 weak link\]" UX). Render empty means just the Header/Footer chrome from Wave A still carries the load.
- **Ceiling: 5 links.** More is spammy.
- **No nofollow.** These are editorial cross-references, not ads.

### What seeds the pool

A build-time aggregator reads:
- `src/data/concepts.ts` + batches → ~30 concept candidates with `concepts: [self], category: 'concept'`
- `src/data/articles.ts` → ~77 article candidates, tagged with `concepts` inferred from their category + title tokens
- `src/data/sanskritVocab.ts` → ~56 word candidates
- `content/stotras/*.json` deity+tradition metadata → sahasranama-name candidates (1,000 each) with `concepts: [deity-slug, tradition-slug]`
- `src/data/deities.ts`, `src/data/mantras.ts` if they exist
- BG shloka metadata → 700 candidates tagged by chapter theme (`karma-yoga`, `bhakti-yoga`, etc.) from `bgChapters.ts`

**This does not create new data.** It aggregates existing fields into one lookup structure at build time.

---

## 4. Orphans table — all 31, with nearest hub + anchor

Each anchor is a suggestion the next agent can refine during Wave C part 2. "Nearest hub" is where the outbound link from the hub should be added (single file edit per row, or batched by hub).

| # | Orphan URL | Nearest hub to link FROM | Suggested anchor text |
|---:|---|---|---|
| 1–16 | `/jyotish/panchang/tithis/{krishna,shukla}-*` (16 tithis) | `/jyotish/panchang` | "All 30 tithis of the lunar month" (single list block, covers all 16 at once) |
| 17 | `/practices/japa/for/devotion` | `/practices/japa` | "Japa for devotion (bhakti-focused practice)" |
| 18 | `/practices/japa/for/sleep` | `/practices/japa` | "Japa for sleep and restlessness" |
| 19 | `/practices/kirtan/for/devotion` | `/practices/kirtan` | "Kirtan for cultivating devotion" |
| 20 | `/practices/puja/for/devotion` | `/practices/puja` | "Puja for devotion" |
| 21 | `/topics/meditation` | Homepage `DiscoverSection` + `/articles` | "Meditation topic hub" |
| 22 | `/topics/knowledge` | Homepage + `/articles` | "Knowledge (jnana) topic hub" |
| 23 | `/topics/action` | Homepage + `/articles` | "Action (karma) topic hub" |
| 24 | `/topics/devotion` | Homepage + `/articles` | "Devotion (bhakti) topic hub" |
| 25 | `/sanatan-history/researchers/manogna-sastry` | `/sanatan-history/researchers` | "Manogna Sastry — researcher profile" |
| 26 | `/sanatan-history/dynasties/chola` | `/sanatan-history/dynasties` | "Chola dynasty" |
| 27–31 | If the CSV contained additional orphans they fall into the above hub buckets — the 31 rows from the orphan CSV reduce to the same 4 hubs | — | Covered by batch fixes above |

**Execution:** This is a 4-file edit (the four hubs above) plus a homepage `DiscoverSection` edit for the Topics row. Not 31 separate edits.

---

## 5. Risk register

Before any wave ships, the following failure modes must be on the PR description as acceptance rules:

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Link-farm penalty** — rendering 40+ Header/Footer links + 5 related links + 3 breadcrumbs pushes leaf pages over the "too many links" heuristic Google used historically. | Low (Google abandoned the hard 100-link cap in 2015, and most leaves will render ~50 internal links) | Medium | Cap `<RelatedLinks>` at 5. Keep Footer to one column per category. Re-measure with `scripts/check-cwv-pseo.mjs` after Wave A. |
| **Googlebot crawl depth** — adding 30+ tithi links on every tithi page creates a mesh that may dilute equity flow to deeper pages. | Medium | Low | Acceptable. 30 sibling links is standard pagination pattern. Use `rel="prev"/"next"` on the prev/next anchors. |
| **CLS from Header/Footer injection** — Wave A adds client-rendered Footer that might shift layout. | Low (existing article pages already use this pattern without CLS issues) | Medium | Verify CLS ≤ 0.05 on a sampled Lalita name page post-Wave A via CrUX / PageSpeed. |
| **Accidental thin content** — if `relatedLinks()` returns <3 results and we render an empty block with just a header ("Related readings: \_\_"), that's a regression. | Medium | Low | Engine must return `[]` on <3 results. Component renders `null` on empty array. Unit test enforces this. |
| **Duplicate `<nav>` / a11y regression** — Header/Footer already contain `<nav>` landmarks; adding RelatedLinks as another `<nav>` can confuse screen readers. | Low | Low | Use `<aside>` with labelled heading for RelatedLinks, not `<nav>`. |
| **Build-time blowup** — the aggregator reading 1,000 Lalita names + 1,000 Vishnu names + 700 BG shlokas produces a ~3,700-candidate pool. Scoring 3,700 × 3,700 pairs at build time is 13.7M comparisons. | Medium | Medium | Scoring is per-page, not pairwise: 3,700 comparisons per leaf × 3,700 leaves = still 13.7M comparisons but each is a dozen ops — budget ~5 sec added to `next build`. Acceptable. Cache the pool in a module-level constant; don't rebuild per page. |
| **Shuffle breaks static generation** — using `Math.random()` in `relatedLinks()` produces different output on each build, busts ISR caches. | High if implemented naively | Medium | Seed the shuffle with a stable hash of the page slug (`hash(slug) % pool.length`). Called out in §3. |
| **Wave A wins mask the need for Wave B/C** — if median inlinks jumps from 1 → 40 just from Header/Footer, we may skip the genuinely-valuable editorial cross-links. | Medium | Medium | Measurement criteria in §7 distinguish between "chrome inlinks" and "contextual inlinks". Wave B must be gated on *contextual* inlink median, not total. |
| **Over-scoping into a link-map rewrite** — tempting to rebuild `/compare/*` anchor logic or refactor all concept pages during Wave B. | High | High | Hard boundary: Wave B only adds the `RelatedLinks` component + engine + 6–8 one-line imports. Any refactor belongs in a separate track. |
| **Orphan fixes introduce new broken links** — if a hub links to `/practices/japa/for/devotion` but that page itself redirects or 404s (possible given T4 broken-link forensic in progress) | Medium | Medium | Wave C runs AFTER T5 (broken-link remediation) merges, so the orphan URLs are verified live. |

---

## 6. Execution order — PRs, in order, with file counts

| # | PR title | Wave | Files touched | Depends on | Rough LOC | Reviewer focus |
|---:|---|---|---:|---|---:|---|
| 1 | `fix(audit T10-A): add Header/Footer + prev-next to sahasranama + BG leaf templates` | A | 4 | Phase 2 merged (T5 live) | ~80 added | Does CLS stay <0.05? Does build time stay <60s? |
| 2 | `feat(audit T10-B1): add internal-links engine + RelatedLinks component` | B | 2 new | PR #1 | ~200 added | Scoring pseudocode matches §3. Seeded-pool size = ~3,700. Unit tests. |
| 3 | `feat(audit T10-B2): wire RelatedLinks into 8 leaf templates` | B | 8 | PR #2 | ~24 added (3 lines/file) | No visual regressions on sampled pages. |
| 4 | `feat(audit T10-C1): panchang daily link engine` | C | 2 new + 1 edit | PR #2 | ~120 added | Verify daily Panchang page shows 3–5 deep links. |
| 5 | `fix(audit T10-C2): orphan cleanup — 31 URLs via 5 hubs` | C | 5 edits | PR #1 (must be live so leaves exist) | ~60 added | Orphan count = 0 in next Ahrefs crawl. |

**Total: 5 PRs. ~20 files edited across the track. ~484 LOC added net.**

**Merge cadence recommendation:** PR #1 lands; wait for one Ahrefs crawl (weekly) to confirm median inlink lift; *then* open PR #2+. If PR #1 alone gets median to ≥ 5, open PR #2/3/4/5 as "quality" work rather than "rescue" work — i.e., no pressure, take two weeks.

---

## 7. Measurement — how we confirm median dofollow inlinks ≥ 5

**Primary signal — Ahrefs re-crawl (authoritative but weekly).**
The current audit pulled on 13 Apr. Next crawl is 20 Apr. After PR #1 merges and deploys (same-day on Vercel), Ahrefs will re-fetch and the `page-has-only-one-dof` CSV will regenerate. Acceptance:

- "Only 1 dofollow" count drops from 1,839 → <100.
- Orphan count drops from 31 → 0 after PR #5.

**Secondary signal — internal script (run on demand, pre-crawl).**
Add `scripts/audit-internal-links.mjs` that:

1. Builds the site (`next build`).
2. Parses every rendered HTML file under `.next/server/app/**/*.html` (or fetches from local dev server).
3. For each URL, counts inlinks by scraping `<a href>` from every other URL's HTML.
4. Emits a CSV: `url, dofollow_inlinks, nofollow_inlinks, is_orphan`.
5. Asserts median(dofollow_inlinks) ≥ 5 and orphan_count == 0. Fails CI if not.

This lets us verify locally before waiting a week for Ahrefs. Recommended to ship as part of PR #1 so Waves B/C have a feedback loop.

**Tertiary signal — Google Search Console.**
Impressions on BG shloka + Lalita name URLs should begin ticking up within 2–3 weeks as the mesh re-indexes. Not a Wave-A acceptance criterion (too slow), but a 30-day health check.

**Anti-metric (watch for regression):**

- Average page weight. Header/Footer add ~2KB HTML. Acceptable. If RelatedLinks adds >5KB on any page, the component is doing too much.
- Largest Contentful Paint. Should not regress by >100ms on sampled pages per CrUX.

---

## Open questions for the user

1. **Is the Lalita-sahasranama-name template missing Header/Footer intentional or a regression?** If intentional (e.g., stripped for verse-reading focus), Wave A needs a UX decision before merging. My read: it was an oversight during the stotra route refactor, but the user may have a reason I don't know.
2. **Do we want prev/next links on BG shlokas to span chapter boundaries?** (Verse 1.47 → 2.1, or should 1.47 be "end of chapter, return to hub"?) Affects the anchor copy in Wave A PR #1.
3. **Scope of "traditions" metadata.** `RelatedLinks` scoring weights "same tradition" at 1.5x. Are the current `tradition` tags on stotras (`shakta`, `vaishnava`, `shaiva`) reliable and complete, or do we need a seed pass first? If they're sparse, Wave B's cross-tradition links will look random — we'd need to seed before shipping B.

---

## What I did NOT change

No source files edited. No data files touched. No new configs. This document is pure proposal. Post-approval, each wave opens its own branch per the naming convention in §6.
