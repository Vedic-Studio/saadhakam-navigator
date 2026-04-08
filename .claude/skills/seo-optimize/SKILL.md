---
name: seo-optimize
description: Post-write SEO/GEO/AEO optimization for opensadhaka.com articles. Generates meta tags, JSON-LD schemas, AI citation blocks, heading audit, internal linking, and E-E-A-T checks tailored for spiritual/philosophical content.
user_invocable: true
arguments:
  - name: slug
    description: "Article slug to optimize (e.g., 'what-is-vedanta', 'advaita-vs-dvaita')"
    required: true
---

# Sadhaka SEO Optimizer

You generate SEO metadata, structured data, and AI-citation-ready content for opensadhaka.com articles. You do NOT modify the article prose — you produce metadata and optimization recommendations that wrap around it.

**Pipeline position**: Runs AFTER `/write-article`, BEFORE publish/commit.

---

## Before You Begin

1. **Read the article**: `src/app/{slug}/page.tsx` — the full article content
2. **Read the articles.ts entry**: `src/data/articles.ts` — find the entry for this slug. Note: primaryKeyword, aeoAnswer, faqs, relatedLinks
3. **Read existing articles**: Scan all entries in `src/data/articles.ts` to identify internal linking candidates and hub-spoke topology
4. **Read learnings**: If `.claude/skills/debrief/learnings/seo-optimize/` exists, read the 5 most recent. Skip if empty or missing.

---

## What You Generate

### 1. Meta Title

- Under 60 characters
- Contains the primary keyword
- Different from the article H1 (optimized for search, not readers)
- Front-load the keyword
- For spiritual content: include the tradition or school name when possible ("Advaita Vedanta: ..." not just "Understanding Non-Duality")

### 2. Meta Description

- Under 160 characters
- Contains the primary keyword naturally
- Includes a value proposition or hook (why click?)
- Not a summary — a reason to read
- For spiritual content: signal depth and specificity ("With verse citations from Mandukya Upanishad and Shankara's commentary" beats "A comprehensive guide to...")

### 3. JSON-LD Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[article H1]",
  "description": "[meta description]",
  "datePublished": "[ISO date from articles.ts]",
  "dateModified": "[ISO date]",
  "author": {
    "@type": "Organization",
    "name": "Open Sadhaka",
    "url": "https://opensadhaka.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Open Sadhaka",
    "url": "https://opensadhaka.com"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://opensadhaka.com/[slug]"
  }
}
```

### 4. JSON-LD BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://opensadhaka.com"},
    {"@type": "ListItem", "position": 2, "name": "[Pillar Name]", "item": "https://opensadhaka.com/[pillar-slug]"},
    {"@type": "ListItem", "position": 3, "name": "[Article Title]"}
  ]
}
```

### 5. FAQ Schema Audit + Enhancement (AEO Play)

**Audit existing FAQs** from the articles.ts entry:
- Does each FAQ answer a real search query variant someone would type into a search engine or ask an AI?
- Is each answer 2-4 sentences, specific, with no filler?
- Does each answer contain at least one named source (text, commentator, verse number)?
- Is each answer self-contained (makes sense without reading the full article)?

**Grade each FAQ**: STRONG / NEEDS REWRITE / WEAK

**Propose 2-3 additional FAQs** based on:
- Related queries from "People Also Ask" patterns for this topic
- Questions an AI engine (ChatGPT, Perplexity) would be asked about this topic
- Cross-tradition comparison questions ("How does X differ in Advaita vs Dvaita?")

FAQ answers must be:
- 2-4 sentences each
- Self-contained (extractable by AI engines without article context)
- Factual and specific (include named texts, commentators, verse numbers)
- Written in declarative prose (no bullets, no hedging)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[2-4 sentence answer with named source]"
      }
    }
  ]
}
```

### 6. Key Takeaways (AI Citation Block)

3-5 bullet points designed to be cited by AI engines (ChatGPT, Perplexity, Claude, Gemini). Each must be:
- A complete, standalone factual sentence
- Include specific data (named texts, verse numbers, commentator names, school affiliations)
- Not opinion — verifiable claims traceable to primary sources
- Written in third person, present tense
- Formatted for extraction: clear subject-verb-object, no dependent clauses that require context

**Example for spiritual content:**
- "Mandukya Upanishad consists of 12 verses and is the shortest of the principal Upanishads, yet Shankaracharya's Mandukya Karika commentary on it runs to 215 verses across four prakaranas."
- "Advaita Vedanta defines maya not as illusion but as the power of Brahman that makes the one appear as many, per Shankara's commentary on Brahmasutra 2.1.14."

### 7. Heading Structure Audit (AEO Extractability)

AI engines chunk documents at headings. Evaluate every H2/H3:

**Score each heading**: EXTRACTABLE / WEAK / GENERIC

- **EXTRACTABLE**: The heading + its section content could be extracted as a standalone answer by an AI engine. Example: "What Is Turiya According to Mandukya Upanishad"
- **WEAK**: Partially descriptive but needs sharpening. Example: "The Fourth State" → rewrite to "What Is Turiya According to Mandukya Upanishad"
- **GENERIC**: Fails AEO. Example: "Overview", "Background", "Key Concepts" → rewrite to match the specific content

Propose rewrites for all WEAK and GENERIC headings.

### 8. Internal Linking Analysis (Hub-Spoke Topology)

Analyze the hub-spoke structure from articles.ts:

For each suggestion:
- **Target article**: slug and title
- **Recommended anchor text**: the text to hyperlink (must describe the destination's content)
- **Placement**: which section of the current article it fits in
- **Rationale**: how this link strengthens the cluster topology
- **Direction**: hub→spoke, spoke→hub, spoke→spoke (cross-link), or external cluster

**Minimum thresholds:**
- Hub article: 4-6 internal links
- Spoke article: 3-4 internal links
- At least 1 link must point to the parent hub (if this is a spoke)
- At least 1 link must point to a spoke in a DIFFERENT cluster (cross-pollination)

### 9. E-E-A-T Audit (YMYL-Adjacent)

Religious and philosophical content is YMYL-adjacent — Google applies elevated E-E-A-T scrutiny. Check:

- [ ] Every doctrinal claim in the article attributes to a named source?
- [ ] Named commentators have correct school affiliation?
- [ ] External sources section present with credible links (university press, sacred-texts.com, wisdomlib.org, Britannica)?
- [ ] Author/publisher schema includes relevant credentials or organizational authority?
- [ ] No school conflation (Advaita position mistakenly attributed to Dvaita, etc.)?

Flag any E-E-A-T gaps with specific fix recommendations.

### 10. AEO Block Quality Grade (Opening Paragraph)

Grade the existing AEO direct-answer block (the `aeoAnswer` in articles.ts). This grades the 60–100 word opening paragraph only — the body-level citability audit lives in §11.5 below.

| Criterion | Pass/Fail |
|-----------|-----------|
| Length: 60-100 words | |
| First sentence = direct answer to primary query | |
| No hedging ("may", "could", "arguably") | |
| No bullets or formatting | |
| Contains at least one named source | |
| Self-contained (extractable without context) | |

If any criterion fails: write a replacement block.

### 11. Seasonality & Timing Signals

Check if the article topic connects to Hindu calendar events:
- Navratri, Diwali, Maha Shivaratri, Guru Purnima, Ganesh Chaturthi, Rama Navami, Krishna Janmashtami, Makara Sankranti
- If yes: suggest optimal `datePublished` timing (2-3 weeks before the event for SEO indexing lead time)
- If yes: suggest `dateModified` update timing (1 week before the event to signal freshness)
- If evergreen: note that no timing optimization is needed

### 11.5 GEO Citability Assessment (Body-Level Extractability)

Score the article's readiness for LLM citation. This is NOT the FAQ schema or the AEO block — it's whether the article *body* is structured for AI engines to lift atomic claims out of it.

**Publish gate**: Citability Score must be **≥ 8/10** to publish. Articles below 8 need restructuring before they ship. This sits alongside the voice-dimension gate (35/50) from `sadhaka-voice.md`.

**Citability Score (1–10)** computed from the four checks below. Start at 10, subtract for each failure.

**Check A — Atomic Claims**
Scan each paragraph. A citable paragraph contains ONE clear claim + supporting evidence. Multi-claim paragraphs are invisible to LLMs — they can't extract cleanly from them.

- List 2–3 sections that are already well-chunked (cite by H2/H3)
- List 2–3 sections that bundle multiple claims and need splitting — for each, name the claims that should become their own paragraphs

*Subtract 1 point per multi-claim section found (max -3).*

**Check B — Trust Signals** *(Sadhaka-specific thresholds)*
Count the following across the full article body:

| Signal | What counts |
|---|---|
| Named text + verse | "Mandukya Upanishad 2", "Brahmasutra 1.1.1", "Bhagavad Gita 2.47" — specific locations, not "the Upanishads say" |
| Named commentator | "Shankara's bhashya on...", "Ramanuja in Sri Bhashya...", "Madhva's Brahmasutrabhashya..." — with school affiliation visible |
| Cross-source agreement | Same doctrinal claim supported by 2+ independent sources (e.g., Upanishad + commentator, or Shruti + Smriti) |
| Scholarly/expert attribution | Modern scholar with institutional affiliation, university press source, or named translator (Olivelle, Doniger, Ganganath Jha, etc.) |

**Benchmark: ≥ 7 trust signals per 500 words.** Sadhaka's citation culture is stronger than generic content — the bar is higher than typical AEO guidance.

Report: `[X] trust signals across [Y] words. Density: [X/Y × 500] per 500 words. [PASS ≥7 / FAIL]`

*Subtract 2 points if density is below 7 per 500 words; subtract 3 if below 5.*

**Check C — Answer-Ready Blocks**
Identify 3–5 passages in the article body that directly answer an implicit question an LLM would receive. For each:

- **Implicit question** (the natural-language query someone would ask ChatGPT/Perplexity)
- **Passage reference** (H2/H3 or paragraph locator)
- **Self-contained: yes/no** (does the passage make sense without the surrounding context?)

If fewer than 3 self-contained answer blocks exist, the article isn't citable — propose where to add or restructure.

*Subtract 1 point per missing answer block below 3 (max -3).*

**Check D — Comparison Table Recommendation**
Sadhaka's highest-leverage structured data is cross-school doctrinal comparison. LLMs strongly prefer tables over prose for comparative facts. Check:

- Does the article contain a comparison table already? If yes, verify it has named-source columns (not just "Advaita / Dvaita" labels but "Brahmasutra bhashya position", "Primary text citation", etc.)
- If no table but the content compares 2+ schools/texts/positions: recommend a specific table with column headers. Examples:
  - Advaita vs Vishishtadvaita vs Dvaita on: brahman, atman-brahman relation, moksha definition, path
  - Purva vs Uttara Mimamsa on: pramana, purpose of Veda, role of karma
  - Shaiva vs Vaishnava on: supreme deity, scriptural authority, liberation model
- If the article is single-subject (one text, one deity, one practice) with no natural comparison: note "single-subject — no table needed"

*Subtract 1 point if a comparison is possible but not present (max -1).*

**Output format for this section:**
```markdown
## GEO Citability Assessment

**Citability Score**: [X]/10 — [PASS ≥8 / FAIL <8]

### Check A — Atomic Claims
- Well-chunked: [section refs]
- Needs splitting: [section ref] → [claims to separate]

### Check B — Trust Signals
[X] signals / [Y] words → [X/Y × 500] per 500 words — [PASS / FAIL]
- Named text+verse: [count]
- Named commentator: [count]
- Cross-source agreement: [count]
- Scholarly attribution: [count]

### Check C — Answer-Ready Blocks
1. Q: "[implicit question]" → [section ref] — self-contained: [yes/no]
2. ...

### Check D — Comparison Table
[Table present — STRONG / Table present — WEAK columns / Missing — recommend: [specific columns] / Single-subject — N/A]
```

---

### 12. Entity Markup Suggestions

For articles that heavily feature specific persons or texts, suggest additional schema:

**For named acharyas/scholars** (when 3+ paragraphs discuss their position):
```json
{
  "@type": "Person",
  "name": "Adi Shankaracharya",
  "description": "8th-century Indian philosopher and theologian, principal exponent of Advaita Vedanta"
}
```

**For named texts** (when the text is the article's primary subject):
```json
{
  "@type": "Book",
  "name": "Mandukya Upanishad",
  "description": "One of the principal Upanishads, consisting of 12 verses on the nature of consciousness and the syllable Om"
}
```

Only suggest entity markup when it adds genuine semantic value — not for every mention.

---

## Output Format

Present to the user:

```markdown
# SEO Package: [Article Title]

## Meta
- **Title**: [meta title] ([char count])
- **Description**: [meta description] ([char count])
- **Primary Keyword**: [keyword]

## Publish Gates
- **AEO Block Grade** (opening paragraph): [PASS / NEEDS REWRITE]
- **GEO Citability Score** (body): [X]/10 — [PASS ≥8 / FAIL <8]
- **Voice Score** (if scored separately): [X]/50 — [PASS ≥35 / FAIL <35]

{If AEO block needs rewrite: show replacement block}

## Structured Data

### Article Schema
[JSON-LD block]

### Breadcrumb Schema
[JSON-LD block]

### FAQ Schema
**Existing FAQ Audit:**
| # | Question | Grade | Notes |
|---|----------|-------|-------|
| 1 | [question] | STRONG / NEEDS REWRITE | [note] |

**Proposed Additional FAQs:**
[JSON-LD block with new FAQs]

### Entity Markup (if applicable)
[JSON-LD blocks for persons/texts]

## Key Takeaways (AI Citation)
1. [takeaway]
2. [takeaway]
3. [takeaway]

## Heading Audit
| Current Heading | Grade | Proposed Rewrite |
|----------------|-------|-----------------|
| [heading] | EXTRACTABLE / WEAK / GENERIC | [rewrite if needed] |

## Internal Links
| Target | Anchor Text | Placement | Direction | Rationale |
|--------|-------------|-----------|-----------|-----------|
| [slug] | [text] | [section] | hub→spoke | [why] |

## E-E-A-T Check
- [x] Doctrinal claims attributed: [count] of [total]
- [ ] Missing attribution in section: [section name]
- [x] External sources present: [count] credible links

## Seasonality
[Timing recommendation or "Evergreen — no timing optimization needed"]

## GEO Citability Assessment
**Citability Score**: [X]/10 — [PASS ≥8 / FAIL <8]
[Atomic claims, trust signal density, answer-ready blocks, comparison table recommendation]

## Priority Actions (in order of impact)
1. [Most impactful optimization]
2. [Second]
3. [Third]
```

---

## Applying Changes

After presenting the SEO package, ask: "Should I apply these changes to the article and articles.ts now?"

If yes:
1. Update the `articles.ts` entry with: revised meta description, revised/new FAQs, revised aeoAnswer (if rewritten)
2. Update the article's JSON-LD schema in the TSX file
3. Add any proposed internal links to the article body using TrackedLink components
4. Update heading text if rewrites were approved
5. Run `npm run build` to verify

---

## Feedback Capture

After the user reviews and approves/modifies the SEO package:

1. **Compare** your output against what the user approved
2. **If substantive changes** (FAQs rewritten, headings changed, links rejected):
   - Ask: "Should I save this as a learning for future SEO optimization?"
   - If yes, save to `.claude/skills/debrief/learnings/seo-optimize/` with date, article slug, and lesson
3. **If small edits** (meta description tweak, anchor text change): save silently
