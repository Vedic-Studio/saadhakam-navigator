# SEO Optimization Phase 1 — Handover Note

**Date**: 2026-04-11
**Task**: pSEO/SEO optimization + new content creation plan
**Plan file**: `/Users/ankitmishra/.claude/plans/serene-gliding-koala.md`

---

## Completed

### 1A. Root-Level Article JSON-LD (39 pages)
- Added Article + FAQPage + BreadcrumbList schemas to **36 pages** registered in `articles.ts` using `buildArticleSchemas()` from `@/lib/seo`
- Added Article + Breadcrumb schemas to **3 unregistered pages** (`difference-between-yoga-and-vedanta`, `vedanta-vs-tantra`, `yoga-sutras-complete-guide`) using manual `buildArticleSchema()` + `buildBreadcrumbSchema()`
- Pattern: import `getArticleBySlug` + `getPillarConfig` from `@/features/articles`, call `buildArticleSchemas()`, inject 3 `<script type="application/ld+json">` tags before `<Header />`

### 1B. Stotra Verse Page JSON-LD (4 templates, ~1130 pages)
- **Shiva Tandava** `[verse]/page.tsx`: Added WebPage + Breadcrumb schemas + OpenGraph tags to `generateMetadata`
- **Navagraha** `[verse]/page.tsx`: Same treatment — WebPage + Breadcrumb + OG tags
- **Vishnu Sahasranama** `[slug]/page.tsx`: Refactored hand-crafted breadcrumb → `buildBreadcrumbSchema()`, added WebPage schema
- **Lalita Sahasranama** `[slug]/page.tsx`: Added WebPage + Breadcrumb schemas

### 1C. Landing Page (homepage)
- Created `src/data/homepage-faqs.ts` — shared FAQ data file (extracted from client component `FAQSection.tsx`)
- Updated `FAQSection.tsx` to import from shared data file (eliminated duplication)
- Added WebPage + FAQPage schemas to `src/app/page.tsx`

### 1D. Vedic Clock
- Added WebPage + Breadcrumb schemas to `src/app/vedic-clock/page.tsx`

### 1E. Faith Finder
- Added SoftwareApplication + WebPage + Breadcrumb schemas to `src/app/faith-finder/layout.tsx` using `buildToolSchemas()`

### 1F. Hub Page Breadcrumbs
- Added BreadcrumbList schema to all 3 hub pages:
  - `(hubs)/ancient-wisdom-philosophies/page.tsx`
  - `(hubs)/sacred-texts-teachings/page.tsx`
  - `(hubs)/spiritual-traditions-paths/page.tsx`

### Build Status
- `npm run build` passes clean — 2470 static pages, zero errors
- All changes are **uncommitted** in the working tree

---

## In Progress

### 1G. AEO Block + articles.ts Audit
**Audit completed, fixes not started.** Key findings from the programmatic audit:

- **38/72 articles missing `aeoAnswer`** — these are the Sprint 2+ articles that never got AEO blocks populated. Full list:
  - vedanta-vs-stoicism, hindu-goddess-explained, vedas-upanishads-bhagavad-gita-guide, midlife-crisis-spiritual-meaning, fear-of-death-advaita-vedanta, dark-night-of-the-soul, spiritual-antidote-to-hustle-culture, meditation-for-anxiety-overthinking, meditation-for-burnout, meditation-for-trauma-survivors, what-is-kriya-yoga, kundalini-awakening, what-is-tantra, red-flags-yoga-studios, how-to-spot-fake-spiritual-guru, do-you-need-a-guru, ramana-maharshi-who-am-i, isha-foundation-sadhguru, paramahansa-yogananda-teachings, spiritual-travel-india-guide, rishikesh-vs-dharamshala, silent-meditation-retreats-india, indian-ashram-etiquette-packing, sacred-sites-india, kailasa-temple-ellora, kailasa-vs-ajanta-caves, south-india-temple-architecture, most-powerful-shiva-temples-india, how-to-study-indian-philosophy-home, online-yoga-teacher-training-worth-it, how-to-learn-sanskrit, celebrity-spiritual-courses-review, advaita-vedanta-explained, 10-powerful-sanskrit-mantras, adi-shankaracharya-life-teachings, how-to-choose-a-mantra, inquiry-vs-devotion-path, which-meditation-for-me
- **1 article with 0 FAQs**: `advaita-vs-dvaita`
- **2 articles with < 3 related links**: `kailasa-vs-ajanta-caves` (2), `how-to-learn-sanskrit` (2)
- **3 pages not registered in articles.ts at all**: `difference-between-yoga-and-vedanta`, `vedanta-vs-tantra`, `yoga-sutras-complete-guide`

**Action needed**: Write quality AEO answer blocks (2-4 sentences each, grounded in primary sources) for the 38 articles. This is a content writing task — use the voice skill and ensure no AI slop. Batch in groups of ~10 per session.

---

## Remaining (Priority Order)

### Phase 1 Optimization (continue)
1. **1G execution** — Write AEO blocks for 38 articles in `articles.ts`. Use `/seo-optimize` on 5-10 highest-traffic articles after populating.
2. **1H** — Internal linking audit: verify hub→spoke connections, fix 2 articles with < 3 related links, identify orphan pages.

### Phase 2 New Creation
3. **2A** — Complete Sprint 2 (2 pending articles: `practical-spiritual-practices`, `difference-between-yoga-and-vedanta`)
4. **2B** — Sprint 3 articles (7 articles — BG guide, Upanishads hub, Yoga Sutras hub, tradition spokes)
5. **2C** — Sprint 4 articles (6 seeker-intent articles)
6. **2D** — Sacred Sites pSEO category (`/sacred-sites/[slug]`)
7. **2E** — AEO strategic infra (Sadhaka Facts page, Answer Hubs, LLM directory submissions)
8. **2F** — Google Indexing API setup

---

## Context

- **SEO library**: `src/lib/seo/index.ts` has all schema builders. All were already defined — this session wired them up to the pages that were missing them.
- **ArticleLayout vs manual injection**: 26 `(editorial)` pages get schemas automatically from `ArticleLayout.tsx` via `buildArticleSchemas()`. The 39 root-level pages now use the same function but inject schemas directly in their own components.
- **3 unregistered pages**: `difference-between-yoga-and-vedanta`, `vedanta-vs-tantra`, `yoga-sutras-complete-guide` have Article + Breadcrumb schemas but no FAQ schema (no articles.ts entry = no FAQs to build from). Registering them in articles.ts with proper FAQs and AEO blocks is part of 1G/2A.
- **Homepage FAQ data**: Extracted to `src/data/homepage-faqs.ts` (shared between server page and client `FAQSection`).
- **No commits made** — all changes are in the working tree. Commit before starting new work.

---

## Resume Command

```
Continue the SEO optimization from the handover at docs/handover/2026-04-11-seo-optimization-phase1.md

1G is next: write AEO answer blocks for the 38 articles missing them in src/data/articles.ts. Each aeoAnswer must be 2-4 sentences, grounded in named primary sources (specific texts, verses, commentators), zero AI slop. Use the voice skill. Batch 10 at a time.

After 1G, do 1H (internal linking audit), then move to Phase 2 new content creation starting with 2A (Sprint 2 completion).

First: commit all the uncommitted Phase 1 schema work from the previous session.
```
