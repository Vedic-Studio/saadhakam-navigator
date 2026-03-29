# Handover: Sanatan History Hub — SEO/GEO/AEO Audit

## What Was Built

A new hub page at `/sanatan-history` — an evidence-based timeline of Sanatan civilization (22,000+ BCE to Maurya Empire). Committed and deployed: `4ba90fb0`.

### Page Structure (Current)
1. **Hero** — H1 "Sanatan History", subtitle, AEO direct-answer block (orange box, 60-word summary)
2. **Anchor nav** — 6 pill-style links (Timeline, Sites, Dynasties, Evidence, Researchers, FAQ)
3. **Interactive Timeline** — 7 eras, 12 expandable event cards (client component, framer-motion)
4. **Archaeological Sites** — 10 cards in 3-col grid (Bhimbetka, Mehrgarh, Rakhigarhi, Dholavira, Lothal, Kalibangan, Dwarka, Hastinapura, Sinauli, Gulf of Cambay)
5. **Dynasty Tree** — collapsible Suryavansha/Chandravansha lineage tree (client component)
6. **Evidence Assessment** — 3 categories: Confirmed (6), Strong (3), Open (3) — card grid
7. **Key Researchers** — 6 researcher cards (Oak, Bhaty, S.R. Rao, Danino, Raj Vedam, Sanjeev Sanyal)
8. **FAQ** — 4 questions with FAQPage JSON-LD schema
9. **CTA** — links to Spiritual Traditions, Sacred Texts, Deities

### JSON-LD Schemas Present
- FAQPage (4 Q&As)
- BreadcrumbList (Home → Sanatan History)
- CollectionPage (title + description only, no `hasPart` items yet)

### Navigation Placement
- Header: primary `navLinks` as "History"
- Footer: Explore column as "Sanatan History"
- Homepage: Discover section card with Clock icon

### Data File
- `src/data/history.ts` — all content as typed TypeScript arrays (TimelineEra, ArchaeologicalSite, DynastyNode, Researcher, EvidenceItem, HistoryFaq)
- `src/data/history.test.ts` — 31 data integrity tests (all passing)

### Research Source
- `docs/research/ancient-indian-timeline-research.md` — the full 550-line research dossier with citations, competing timelines, genetic evidence, cross-cultural validation, etc. Much richer than what's currently on the page.

---

## What the SEO Audit Should Cover

### 1. Keyword & Topic Strategy
- **Primary target**: "sanatan history", "ancient indian history timeline", "history of sanatan dharma"
- **Long-tail**: "mahabharata date evidence", "ramayana 12000 bce", "nilesh oak mahabharata", "indus valley civilization timeline", "rakhigarhi dna results", "saraswati river evidence"
- Decide: is this page a **pillar hub** (linking to future spoke pages) or a **standalone authority page**? Current build is standalone but the data model supports sub-pages.
- Check search volume and competition for target keywords. The Oak/Bhaty framework terms may have low competition but high intent.

### 2. Content Gaps (vs. Research Source)
The research doc has much more than what's on the page. Key content NOT yet surfaced:
- **IVC Script Decipherment** section (5 competing approaches, Bhaty's 2025 paper)
- **Geological & River Evidence** (Saraswati drying timeline with 5 dated events, sea level data)
- **Genetic Evidence** (Rakhigarhi DNA details, Narasimhan et al. 523-individual study, ANI/ASI model)
- **Global Comparative Timeline** (4 detailed tables showing what was happening worldwide at 12,000 / 5,561 / 3,100 / 1,500 BCE)
- **Cross-Cultural Validation** (flood myths table, precessional numbers, trade routes, linguistic connections)
- **Post-Mahabharata Empire Continuum** (Maurya → Gupta → Chola → Mughal comparative table)
- **Criticisms and Responses** (Raja Ram Mohan Roy, Jayasree Saranathan, Nityananda Misra)
- **Lost Civilization Thesis** (Hancock connections, Dwarka/Kumari Kandam, YDIH status)
- Decide which of these should be on-page sections vs. separate spoke articles.

### 3. On-Page SEO Issues to Audit
- **Title tag**: currently "Sanatan History: Evidence-Based Timeline of Ancient India | Sadhaka | Sadhaka" — double "Sadhaka" suffix (likely a `buildPageMetadata` + layout.tsx stacking issue). Fix the duplication.
- **H-tag hierarchy**: H1 is "Sanatan History". H2s are section headers. Verify no H-tag skipping. The timeline era names are H3s — good.
- **Word count**: the page is component-heavy but text-light for a pillar page. Most content is inside expandable cards (hidden from crawlers?). Audit whether Googlebot sees the expanded content or just the collapsed view. If collapsed = hidden from crawl, the page has very thin visible content.
- **Internal linking**: currently links OUT to 3 pages (Traditions, Texts, Deities) in CTA. No internal links IN to this page from other articles/hubs yet. Needs backlinks from related content.
- **Meta description**: check length (currently 257 chars — may be truncated). Tighten to 155 chars.
- **Canonical**: verify `https://www.opensadhaka.com/sanatan-history` (no trailing slash, www)

### 4. AEO/GEO Optimization
- The AEO block exists but is styled as a visual box, not as direct-answer prose in the main content flow. Consider whether AI engines will pick it up or if it needs to be the first paragraph of the page body.
- Add `speakable` schema markup for the AEO block.
- Key questions AI engines will ask about this topic — ensure they're answered clearly on-page:
  - "When did the Mahabharata war happen?"
  - "What is the Arundhati-Vasishtha observation?"
  - "How old is the Ramayana?"
  - "What does Rakhigarhi DNA show?"
  - "Who is Nilesh Oak?"
- Consider adding a structured "Key Facts" or "At a Glance" section that AI engines can extract.

### 5. Structured Data Enhancements
- **CollectionPage schema** has no `hasPart` items — should list the major sections or future spoke pages
- Consider **Article schema** if positioning as an editorial pillar
- Consider **Timeline schema** (Schema.org doesn't have one, but Event or ItemList with dates can approximate)
- **SiteNavigationElement** for the anchor nav
- **Person schema** for each researcher
- **Place schema** for archaeological sites (with coordinates — already in the data)

### 6. Rendering & Crawlability
- **Critical**: InteractiveTimeline and DynastyTree are client components (`"use client"`). The expandable content inside them may not be in the initial SSR HTML. Test with:
  - `curl https://www.opensadhaka.com/sanatan-history | grep "Mahabharata"` — does the event content appear?
  - Google's URL Inspection tool in GSC — check rendered HTML
  - If expandable content is JS-only, consider rendering it as `<details>/<summary>` HTML elements instead of framer-motion AnimatePresence (crawlable by default, progressive enhancement)
- The page is built as static (`○` in build output), so Next.js should pre-render it. But verify the client components' initial state includes all text content.

### 7. Page Speed & Core Web Vitals
- framer-motion bundle for timeline + dynasty tree adds JS weight. Check if it impacts LCP/FID.
- 10 site cards + 12 evidence cards + 6 researcher cards = lots of DOM nodes. Consider lazy loading below-fold sections.
- No images on the page currently — consider adding a hero image or OG image for social sharing.

### 8. Internal Link Architecture
Pages that should link TO `/sanatan-history`:
- `/what-is-sanatan-dharma` (Sprint 1 article — natural fit)
- `/vedas-upanishads-bhagavad-gita-guide` (texts hub)
- `/deities` hub (Rama, Krishna are in the dynasty tree)
- `/greats` (researchers overlap)
- Any future Mahabharata or Ramayana content

Pages that `/sanatan-history` should link TO:
- Individual deity pages (`/deities/rama`, `/deities/krishna`)
- Concept pages (`/what-is-dharma`, `/what-is-karma`)
- Future spoke articles (e.g., `/mahabharata-date-evidence`, `/saraswati-river-history`)

### 9. Spoke Article Opportunities (Future)
High-potential articles that could link back to this hub:
- "When Did the Mahabharata War Happen? The Evidence" (long-tail, high intent)
- "Rakhigarhi DNA: What Ancient Genetics Tell Us" (newsworthy, cited)
- "The Saraswati River: Satellite Evidence for a Lost River" (visual, compelling)
- "Archaeological Sites of Ancient India: A Complete Guide" (pSEO potential)
- "Nilesh Oak's Archaeoastronomy: Method and Findings" (researcher spotlight)
- "Ramayana: History or Mythology?" (controversy-driven traffic)

### 10. GSC Submission
After audit fixes are deployed:
- Run `npm run indexnow:submit:prod` to submit the URL
- Use `scripts/gsc-submit-sitemaps.mjs` to refresh sitemaps
- Monitor in GSC: URL Inspection → request indexing for `/sanatan-history`

---

## Key Files
| File | Purpose |
|------|---------|
| `src/app/sanatan-history/page.tsx` | Hub page (server component) |
| `src/data/history.ts` | All data + interfaces |
| `src/data/history.test.ts` | 31 integrity tests |
| `src/components/history/*.tsx` | 5 components (Timeline, DynastyTree, SiteCard, EvidenceCard, ResearcherCard) |
| `docs/research/ancient-indian-timeline-research.md` | Full research source (550 lines) |
| `src/lib/seo/index.ts` | SEO utility functions |
| `src/components/Header.tsx` | Nav links |
| `src/components/Footer.tsx` | Footer links |
| `src/components/landing/DiscoverSection.tsx` | Homepage cards |

## Resume Command
```
Load docs/handover/2026-03-28-sanatan-history-seo-audit.md. Run /seo-optimize on /sanatan-history, then audit crawlability of client components (InteractiveTimeline, DynastyTree) — verify SSR includes all text content. Fix title tag duplication. Add internal links from existing articles. Submit to GSC.
```
