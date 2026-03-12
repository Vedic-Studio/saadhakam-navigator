# Agent: Article Content

**Scope**: Writing and updating editorial blog articles (static TSX files). Does not create routes or modify data schemas.

---

## Article Architecture

Every article is a **static TSX page** at `src/app/<slug>/page.tsx`.

**Reference implementation** (quality template): `src/app/what-is-vedanta/page.tsx` — read this first before writing any new article.

**Must also update**: `src/data/articles.ts` — add a metadata entry for every article. This feeds the sitemap, internal linking, and content indexes.

---

## Article Types

### Hub Post (2500+ words)
- Broad topic that links out to 4–6 related spokes
- 4 FAQs minimum
- AEO direct-answer block at the very top (60–100 words, plain prose, answers the primary question immediately)
- Internal links to: at least 4 spoke articles, 1–2 concept pages, 1–2 stotra/text pages if relevant

### Spoke Post (1500+ words)
- Focused subtopic, links back to its hub and 2–3 laterals
- 3 FAQs minimum
- AEO block at the top
- Internal links: hub + 2–3 other relevant pages

---

## Page Structure (TSX)

```tsx
// 1. export const metadata — Next.js Metadata object
// 2. JSON-LD schema (Article or FAQPage schema)
// 3. AEO block — <section> with direct answer, 60-100 words
// 4. Body sections with h2/h3 hierarchy
// 5. FAQ section — minimum 3 (spoke) or 4 (hub) items
// 6. Internal links section or woven throughout

export const metadata: Metadata = {
  title: "...",
  description: "...", // 150-160 chars
  openGraph: { ... },
  alternates: { canonical: "https://www.opensadhaka.com/<slug>" },
};
```

Use `src/lib/seo/index.ts` helpers (`buildArticleMetadata`, `buildCanonicalUrl`) — do not hand-roll metadata.

---

## Content Standards

### AEO Block (AI Engine Optimization)
- Position: immediately after the hero/title, before any section
- Length: 60–100 words
- Format: plain declarative prose, no bullets
- Answers: "What is X?" or the primary search intent directly
- Written for: AI engines (ChatGPT, Perplexity, Claude) to cite as a direct answer
- Do NOT use first-person, marketing language, or hedging

### Body
- H2 for major sections, H3 for subsections
- No keyword stuffing — write for the reader
- Every factual claim about a text/story: name the source (Purana, Upanishad, Gita chapter)
- Sanskrit terms: always include IAST transliteration on first use, then English equivalent
- Prose-first — use bullets/lists sparingly (only for genuine lists, not padded content)

### FAQs
- Each FAQ must answer a real search query variant
- Answer: 2–4 sentences, specific, no fluff
- Use `<details>/<summary>` pattern OR the FAQ component in `src/components/`
- Add FAQ schema JSON-LD: include all FAQs in the FAQPage schema on the page

### Internal Links
- Hub → spokes by topic
- All spokes link back to their hub
- Link to stotra pages when the article discusses that text
- Link to concept pages (`/philosophies/`, `/traditions/`, `/texts/`) where relevant
- Do NOT link to external sites in the body (only in "further reading" if needed)

---

## articles.ts Entry Format

```typescript
{
  id: "unique-kebab-id",
  slug: "exact-url-slug",         // must match the directory name in src/app/
  title: "Full H1 Title",
  description: "150-160 char meta description. Includes primary keyword.",
  category: "philosophy",         // philosophy | practices | texts | traditions | travel | comparisons
  type: "hub" | "spoke",
  hub: "parent-hub-slug",         // for spokes only
  publishedAt: "2026-03-12",
  updatedAt: "2026-03-12",
  wordCount: 2800,
  readingTime: 11,                // Math.ceil(wordCount / 250)
  featured: false,
}
```

---

## Sprint Backlog

### Sprint 1 (Highest Priority — SEO foundation)
| # | Slug | Type | Status |
|---|------|------|--------|
| 1 | `what-is-sanatan-dharma` | Hub | ✅ Done |
| 2 | `advaita-vedanta-explained` | Spoke | ✅ Done |
| 3 | `advaita-vs-dvaita` | Spoke | ✅ Done |
| 4 | `how-karma-dharma-work` | Spoke | ✅ Done |
| 5 | `vedas-upanishads-bhagavad-gita-guide` | Hub | ✅ Done |
| 6 | `what-is-maya` | Spoke | ✅ Done |
| 7 | `midlife-crisis-spiritual-meaning` | Hub | ✅ Done |
| 8 | `fear-of-death-advaita-vedanta` | Spoke | ✅ Done |
| 9 | `dark-night-of-the-soul` | Spoke | ✅ Done |
| 10 | `spiritual-antidote-to-hustle-culture` | Spoke | ✅ Done |

### Sprint 2 (Practices cluster)
| # | Slug | Type | Status |
|---|------|------|--------|
| 1 | `how-to-start-meditating-daily` | Hub | ✅ Done |
| 2 | `how-to-start-japa` | Spoke | ✅ Done |
| 3 | `best-meditation-style-for-your-personality` | Spoke | ✅ Done |
| 4 | `meditation-for-anxiety-overthinking` | Spoke | ✅ Done |
| 5 | `meditation-for-burnout` | Spoke | ✅ Done |
| 6 | `daily-spiritual-routine-beginners` | Spoke | ✅ Done |
| 7 | `practical-spiritual-practices` | Hub | ⬜ Pending |
| 8 | `difference-between-yoga-and-vedanta` | Spoke | ⬜ Pending |

### Sprint 3 (Texts & Traditions cluster)
| # | Slug | Type | Status |
|---|------|------|--------|
| 1 | `bhagavad-gita-complete-guide` | Hub | ⬜ Pending |
| 2 | `what-are-the-upanishads` | Hub | ⬜ Pending |
| 3 | `yoga-sutras-complete-guide` | Hub | ⬜ Pending |
| 4 | `shaivism-vs-vaishnavism` | Spoke | ⬜ Pending |
| 5 | `vedanta-vs-tantra` | Spoke | ⬜ Pending |
| 6 | `ramana-maharshi-who-am-i` | Spoke | ⬜ Pending |
| 7 | `adi-shankaracharya-life-teachings` | Spoke | ⬜ Pending |

### Sprint 4 (Comparison & Seeker intent cluster)
| # | Slug | Type | Status |
|---|------|------|--------|
| 1 | `choose-between-bhakti-jnana-karma-raja-yoga` | Hub | ⬜ Pending |
| 2 | `do-you-need-a-guru` | Spoke | ⬜ Pending |
| 3 | `best-spiritual-path-for-beginners` | Spoke | ⬜ Pending |
| 4 | `can-i-practice-vedanta-without-converting` | Spoke | ⬜ Pending |
| 5 | `inquiry-vs-devotion-path` | Spoke | ⬜ Pending |
| 6 | `how-to-spot-fake-spiritual-guru` | Spoke | ⬜ Pending |

---

## Task Chunks for Agent Execution

Each chunk is a single agent session. Load this file + the relevant article context only.

**Chunk A**: Write Sprint 3 articles 1–3 (BG guide, Upanishads hub, Yoga Sutras hub) — three hubs, ~2500 words each
**Chunk B**: Write Sprint 3 articles 4–7 (tradition spokes) — four spokes, ~1500 words each
**Chunk C**: Write Sprint 4 articles 1–3 (comparison/seeker hubs + spokes)
**Chunk D**: Write Sprint 4 articles 4–6 (seeker intent spokes)
**Chunk E**: Update `articles.ts` entries for any completed articles missing entries

---

## Slug → File Path Mapping

Slug `foo-bar` → `src/app/foo-bar/page.tsx`

Check first: does `src/app/<slug>/` already exist? If yes, read the existing file before editing.
