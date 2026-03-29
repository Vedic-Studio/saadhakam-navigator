# Session 1: Copy Audit & Quality Gate Pass

## Context

Session 2 (structural redesign) is complete. The landing page has been restructured from 10 sections to 8. Five old components were deleted, three new ones created. The page now follows this arc:

```
Hero → AiTutorTeaser → KnowledgeFoundation → ProofOfDepth → WesternBridge → DiscoverSection → ConversionSection (EarlyAccess) → FAQ
```

**This session's job:** Fix all remaining copy issues across the surviving and new components. No structural changes, no new files, no deletions. Pure text editing + quality gate enforcement.

---

## Data Cross-Reference Cheat Sheet

Every number MUST trace to one of these verified counts. No aspirational rounding.

| What | Count | Source File |
|------|-------|-------------|
| Articles | 73 | `src/data/articles.ts` |
| Comparisons | 51 | `src/data/comparisons.ts` |
| Deities | 42 | `src/data/deities.ts` + jyotishDeities |
| Sanskrit terms | 357 | `src/data/sanskritVocab.ts` |
| Traditions | 7 | `src/data/traditions.ts` |
| Darshanas | 6 | PhilosophyGrid data |
| Gita chapters | 18 | `src/data/bgShlokas.ts` |
| Sahasranama names | 1000+ | Vishnu (1000) + Lalita (1000) JSONs |
| Eras | 15+ | `src/data/eras.ts` |
| Archaeological sites | 9 | `src/data/sites.ts` |
| Earliest date | 22,000 BCE | `src/data/eras.ts` (Rigvedic Period) |
| Stotras | 4 | Shiva Tandava, Vishnu Sahasranama, Lalita Sahasranama, Navagraha |

## Copy Quality Gates (apply to ALL copy changes)

- **Dash Gate**: Zero prose em dashes. Split into two sentences instead.
- **Polarity Gate**: No strawman negations ("not X, but Y" where X was never the reader's assumption). State the positive claim directly.
- **Slop Scan**: Zero hardban phrases — no "journey", "navigate", "tapestry", "landscape", "dive deeper", "ancient wisdom and modern technology", "Your Spirit Guide", "ocean of wisdom", "start your journey", "begin your path"
- **Attribution Gate**: Any doctrinal claim must cite source text + named person, or be reframed as non-doctrinal
- **Target**: 42+/60 on 6-dimension rubric (Directness, Rhythm, Trust, Authenticity, Density, Focus)

---

## Task List

### 1. HeroSection.tsx — COMPLETE REWRITE NEEDED

**File:** `src/components/landing/HeroSection.tsx`

This is the biggest task. The hero is still entirely the old v1 copy. It needs to lead with the AI tutor vision (matching AiTutorTeaser below it) while driving users to explore the content library first.

**Current problems (line numbers):**
- L25: `"Sanatan Dharma • The Eternal Truth"` — "Eternal Truth" is dogmatic for philosophy-seekers. Replace with `"AI Spiritual Tutor • Coming Soon"` or similar
- L30: `"The Only Standing Dharma After 10,000 Years"` — WRONG. Eras.ts says 22,000 BCE. Also: headline should sell the product, not the religion. Rewrite to position the AI tutor.
- L35: `"Invasions came. Empires fell..."` — em dash ("survived —"), insider language ("Guru to Shishya"). Rewrite to describe what the tutor/platform does.
- L40-49: CTAs go to `/faith-finder` and `/texts`. Should be `"Explore the Knowledge"` → `/philosophies` (primary) and `"Join the Waitlist"` → `/app` (secondary)
- L55-68: Trust indicators say "One Dharma / 5000+ Years / 50+ Lineages" — ALL fabricated/unanchored. Replace with verified content stats: "6 Darshanas / 18 Gita Chapters / 51 Comparisons" (from cheat sheet)
- L97-100: Chat mockup says `"Online • Your Dharma Guide"` with green pulse — implies a live product. Change to `"Preview"` label (matching AiTutorTeaser's approach)
- L99: Remove `animate-pulse` from the green dot (implies live status)

**Direction for new headline:** Something that positions the PRODUCT and its promise. The AiTutorTeaser section below already uses "An AI Tutor That Actually Knows the Texts" — the hero should complement, not repeat. Options:
- Focus on what the user gets: "The philosophy that predates Greek thought by 3,000 years. Now with a tutor that actually studied it."
- Focus on the problem solved: "Every answer you've found online is a summary of a summary. This is different."
- Focus on the knowledge base: "Six philosophical schools. Eighteen chapters of the Gita. One AI tutor trained on all of it."

### 2. PillarsSection.tsx (KnowledgeFoundation) — MINOR NUMBER FIXES

**File:** `src/components/landing/PillarsSection.tsx`

S2 already reworked this well. Two numbers are slightly off:
- L28: `number: "50"` for Comparisons → should be `"51"` (verified: 51 in comparisons.ts)
- L39: `number: "41"` for Deities → should be `"42"` (verified: 35 core + 7 jyotish = 42)

### 3. AiTutorTeaser.tsx — COPY QUALITY CHECK

**File:** `src/components/landing/AiTutorTeaser.tsx`

S2 created this. The copy is strong. One issue:
- L59: `"Not another chatbot summarizing Wikipedia."` — passes polarity gate (this IS a genuine misconception to correct, and the contrast is concrete). KEEP.
- Verify all claims in persona descriptions are accurate:
  - L9: "Socratic questioning across all six darshanas" — accurate (6 darshanas exist in data)
  - L17: "Cites Yoga Sutras, Bhagavad Gita, and traditional commentaries" — accurate (these are in the content library)
  - L25: "Compare how Shankara, Ramanuja, and Madhva interpret the same Upanishadic passage" — accurate (all three are cited in comparison data)
- L118: Vivekachudamani verse 20 citation — VERIFY this is the correct verse for Shankara's maya definition. If uncertain, change to a vaguer but safe citation.

### 4. ProofOfDepth.tsx — MINOR NUMBER FIX

**File:** `src/components/landing/ProofOfDepth.tsx`

S2 created this well. One number issue:
- L83: `"One of 50 comparisons."` → should be `"One of 51 comparisons."`

### 5. WesternBridge.tsx — NUMBER FIX + SLUG VERIFICATION

**File:** `src/components/landing/WesternBridge.tsx`

S2 created this. Issues:
- L99: `"Explore all 50 comparisons"` → should be `"Explore all 51 comparisons"`
- **CRITICAL: Verify all 5 comparison slugs actually exist in `src/data/comparisons.ts`:**
  - `stoicism-vs-vedanta`
  - `mindfulness-vs-dhyana`
  - `psychology-vs-yoga-philosophy`
  - `freud-vs-patanjali`
  - `sin-vs-karma`
  If any slug doesn't exist, the link will 404. Either add the missing comparison to the data file, or swap the card for a comparison that does exist.

### 6. DiscoverSection.tsx — MINOR COPY CHECK

**File:** `src/components/landing/DiscoverSection.tsx`

S2 consolidated this well. Check:
- L51: `"50 side-by-side analyses"` → should be `"51 side-by-side analyses"`
- Verify `/articles` route exists (L51 in old version had it, new version links to it via PillarsSection)

### 7. ConversionSection.tsx (EarlyAccess) — MINOR NUMBER FIXES

**File:** `src/components/landing/ConversionSection.tsx`

S2 reworked this into waitlist. Numbers slightly off:
- L9: `"50 comparisons"` → `"51 comparisons"`
- L11: `"41 deities"` → `"42 deities"`

### 8. FAQSection.tsx — COMPLETE REWRITE NEEDED

**File:** `src/components/landing/FAQSection.tsx`

Still has the old defensive FAQs. Complete rewrite:

**Remove:**
- FAQ #1 "Is Sadhaka a religious conversion tool?" — defensive lead
- FAQ #2 "designed for Western seekers" — patronizing framing
- FAQ #6 vague differentiation from Wikipedia

**New FAQs (5 total):**

```
Q1: "Who writes this content?"
A: Content is sourced from primary texts (Vedas, Upanishads, Bhagavad Gita, Yoga Sutras) and traditional commentaries by Shankara, Ramanuja, Madhva, and other established acharyas. We distinguish between schools of thought rather than presenting a homogenized version. External sources link to academic references (Stanford Encyclopedia of Philosophy, Britannica, university press publications).

Q2: "How deep does the analysis go?"
A: Every Bhagavad Gita verse has word-by-word Sanskrit analysis. Philosophical comparisons (like Advaita vs Dvaita) cover six dimensions with named commentators. The Vishnu Sahasranama and Lalita Sahasranama cover 1000 names each with etymology and philosophical context. This is reference-grade material, not surface summaries.

Q3: "What will the AI tutor do that ChatGPT can't?"
A: ChatGPT draws from the general internet. The Sadhaka tutor is trained on curated primary texts and traditional commentaries. It distinguishes between Advaita, Dvaita, and Vishishtadvaita positions rather than conflating them. It cites specific verses with chapter and verse numbers. It adapts recommendations to your chosen philosophical school and practice level.

Q4: "Can I explore this alongside my existing tradition?"
A: Yes. The content covers multiple philosophical frameworks (six darshanas, four yogic paths, seven major traditions) without requiring commitment to any single one. Many users come from Buddhist, Stoic, Christian contemplative, or secular philosophical backgrounds and find the comparative analyses particularly useful.

Q5: "When does the AI tutor launch?"
A: The tutor is in development. Join the waitlist above to get early access when it launches. The full knowledge library (73 articles, 51 comparisons, 42 deities, 18 Gita chapters) is live and browsable right now.
```

### 9. page.tsx metadata — REWRITE

**File:** `src/app/page.tsx`

- L15: Title still says `"Sadhaka | AI-Powered Sanatan Dharma Spiritual Companion"` — the AI isn't live. Change to something like `"Sadhaka | Indian Philosophy Encyclopedia & AI Tutor (Coming Soon)"`
- L17: Description still says `"Explore 10,000 years of Vedic wisdom with Sadhaka AI"` — "10,000 years" is wrong (22,000 BCE per eras.ts), "Sadhaka AI" implies a live product. Rewrite to be honest about what's live and what's coming.

---

## Verification Checklist

After all edits, run these checks:

1. `npm run build` — must pass
2. `npm run lint` — must pass
3. Grep all `src/components/landing/*.tsx` + `src/app/page.tsx` for these patterns (ALL must return zero matches):
   - `i.pravatar.cc`
   - `10,000` (should be 22,000 BCE or removed)
   - `500k`
   - `1M+`
   - `4.9/5`
   - `50+ ` (the old "50+ Lineages" — note: "50" as a count for comparisons is also wrong, should be 51)
   - `2000+` (old Sanskrit count)
   - `Ocean of Wisdom`
   - `Spirit Guide`
   - `dive deeper` (case insensitive)
   - `Eternal Truth`
   - `Begin Your Path`
   - `Guru to Shishya`
   - `our ancestors`
4. Verify the 5 comparison slugs in WesternBridge.tsx resolve to actual entries in `src/data/comparisons.ts`
5. Verify every number on the page matches the cheat sheet

## Files Modified (this session)

```
src/components/landing/HeroSection.tsx (complete rewrite of copy)
src/components/landing/PillarsSection.tsx (fix 2 numbers: 50→51, 41→42)
src/components/landing/AiTutorTeaser.tsx (verify citations, minor if any)
src/components/landing/ProofOfDepth.tsx (fix 1 number: 50→51)
src/components/landing/WesternBridge.tsx (fix 1 number + verify 5 slugs)
src/components/landing/DiscoverSection.tsx (fix 1 number: 50→51)
src/components/landing/ConversionSection.tsx (fix 2 numbers: 50→51, 41→42)
src/components/landing/FAQSection.tsx (complete rewrite)
src/app/page.tsx (metadata rewrite)
```

## Files Created: None
## Files Deleted: None
