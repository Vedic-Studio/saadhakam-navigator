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

### Opening Hook (first paragraph after the AEO block)
The first body paragraph must open with one of the following — never a generic "In today's world…" or "X is an important topic…" opener:
- A contrarian reframing of the question ("Most people asking this are actually asking…")
- A correction of a common Western misreading of the tradition, backed by the primary source
- A surprising or non-obvious claim from the texts (with citation)
- A juxtaposition between what the tradition actually says vs. the popular assumption

### Structure: Match User Intent First
Before choosing section headings, identify the query type and structure accordingly:

| Query type | Structure |
|------------|-----------|
| Definitional (`what is X`) | AEO → conceptual breakdown → schools/types/forms → application/practice |
| How-to (`how to start japa`) | AEO → start with the process steps → then context/background → common mistakes |
| Comparison (`advaita vs dvaita`) | AEO → lead with the key difference → then elaborate each side → practical implications |
| Problem/seeker intent (`fear of death`) | AEO → name the symptom/problem → diagnosis from the tradition → the teaching → practice |

Do NOT use generic Wikipedia-style headings ("What is X", "Why X Matters", "Benefits of X", "Conclusion"). Use specific, descriptive headings that reflect the actual content of each section.

### E-E-A-T: Source Fidelity and Credibility Signals
Every doctrinal or philosophical claim must be grounded in a named primary source:
- Cite the specific Upanishad (e.g., "Mandukya Upanishad 2"), Gita chapter/verse, Purana, or Sutra
- When a claim reflects a school's position, name the commentator (e.g., "Adi Shankaracharya in his Brahmasutra Bhashya", "Ramanujacharya's Vishishtadvaita reading")
- Distinguish clearly between: (a) what the primary text says, (b) what the traditional commentary says, (c) what the article is drawing as an implication
- Avoid sourcing claims to "Hinduism" or "Vedanta" as a monolith — name the specific tradition/text/teacher

Every article must include a `references` array and render a "Sources & Commentaries" section at the bottom linking to authoritative external sources (Britannica, IEP, university press, Chinmaya/Ramakrishna Mission). This signals editorial rigor to search engines.

### Original Angle: Sadhaka's Unique POV
Every article must include at least one of the following — this is what differentiates Sadhaka from averaged AI content:
- **Correction of a common Western misreading**: identify something widely misunderstood in English-language spiritual content and correct it from the primary source (e.g., karma ≠ simple cause-and-effect; maya ≠ illusion in the Western sense)
- **Cross-tradition comparison**: show how two schools (e.g., Advaita vs. Dvaita, Shaiva vs. Vaishnava) answer the same question differently, citing each
- **Practical implication drawn from doctrine**: make the philosophical point land in lived experience ("this is what it means for your Tuesday afternoon") — not motivational fluff, but a specific behavioral/perceptual implication

### Body
- H2 for major sections, H3 for subsections
- No keyword stuffing — write for the reader; use synonyms and semantically related terms naturally
- **Paragraph length: maximum 3 sentences per paragraph** in body sections — break up long prose
- Every factual claim about a text/story: name the source (Purana, Upanishad, Gita chapter)
- Sanskrit terms: always include IAST transliteration on first use, then English equivalent
- Prose-first — use bullets/lists sparingly (only for genuine lists, not padded content)
- **Visual breaks**: include at least one callout block (Sanskrit verse in a styled card, pull-quote, or key-term definition box) every 400–500 words to break up text

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

## Voice & Tone

This section is mandatory. Read it before writing or rewriting any prose. It takes precedence over any default behavior from content-writing skills.

### Forbidden Phrases (hardban list)

Do not use any of the following in article prose. If you find them in existing content, rewrite:

```
— used as dramatic flourish mid-sentence ("this teaching — like all great teachings —")
ultimately  (except in direct quotes from primary sources)
journey  (as spiritual metaphor: "your spiritual journey", "this journey", "one's journey")
navigate  (as metaphor: "navigate life", "navigate the darkness", "navigate complexity")
tapestry  ("rich tapestry of", "tapestry of traditions")
landscape  ("spiritual landscape", "philosophical landscape", "vast landscape")
holistic
testament to
at its core
in essence
it is worth noting
it is important to note
delve into
moreover / furthermore  (as paragraph openers)
arguably  (as a hedge)
notably  (as a hedge: "notably different", "notably via")
```

**Em dashes**: parenthetical grammar use is fine (replacing brackets). The ban is on em dashes used for dramatic effect or stylistic flourish.

---

### Voice Principles (with counter-examples)

**Principle 1: Write with conviction, not hedging.**
- ❌ "Vedanta arguably offers one of the most holistic frameworks for understanding consciousness."
- ✅ "Vedanta is not a framework. It is the direct investigation of the one who is asking."

**Principle 2: Diagnose before teaching.**
- ❌ "Fear of death is a common human experience. Advaita Vedanta offers several insights…"
- ✅ "The fear most of us call 'fear of death' is not fear of death. It is the ego's dread of its own non-existence — and the ego is the only part of you that is actually temporary."

**Principle 3: Specificity over abstraction. Name the source, school, or commentator.**
- ❌ "Ancient texts speak of the importance of self-inquiry."
- ✅ "Mandukya Upanishad verse 7 defines turiya not as a fourth state but as the witness of the other three — Shankaracharya's commentary calls it 'the ever-present background.'"

**Principle 4: Short declarative sentences over long compound ones.**
- ❌ "Sanatan Dharma, which is the eternal cosmic order that sustains reality itself, is not merely a religion but rather a comprehensive philosophical and spiritual framework that encompasses all aspects of existence."
- ✅ "Sanatan Dharma is not a religion. It is a description of the structure of reality — how it holds itself together, and how you fit inside it."

**Principle 5: Never motivate. Inform.**
- ❌ "Start your journey into non-duality today — you have everything you need."
- ✅ "Where to start: Mandukya Upanishad (12 verses, the shortest Upanishad) with Shankaracharya's Mandukya Karika commentary. Read it once. Then read it again with the commentary."

---

### Tonal Reference

Calibrate voice against these published models:

- **Directness**: *I Am That* (Nisargadatta Maharaj transcripts) — clipped, no ceremony, no warmth-padding
- **Precision**: *The Economist* — every sentence earns its place, no throat-clearing
- **Authority**: University press monograph — every claim sourced, no popularist hedging

NOT: Yoga Journal, Chopra Center, Sounds True, or any wellness publication register. If your prose sounds like it belongs in a morning newsletter with a Sanskrit quote header, rewrite it.

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
