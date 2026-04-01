# Content Quality & Generation Rules

This document outlines the strict quality and formatting requirements for all programmatic SEO (pSEO) pages generated for opensadhaka.com. These rules must be enforced manually and algorithmically (via CI/CD or pre-commit hooks) to maintain high E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) and avoid Google penalties for thin or duplicate content.

## 1. Template Requirements by Page Type

### 1.1 Topic Hub Pages (`/topics/{topic}`)
- **Minimum Word Count**: 800 words
- **Required Sections**:
  1. Topic overview (clear, encyclopedic definition + cultural context)
  2. Recommended practices (with internal links)
  3. Recommended traditions/lineages
  4. Curated reading/guides list
  5. Call-to-action (Faith Finder or related pathway)

### 1.2 Combinatorial Pages (`/practices/{practice}/for/{goal}`)
- **Minimum Word Count**: 1,200 words
- **Required Sections**:
  1. Practice definition and historical origins
  2. **Core alignment**: Detailed, specific explanation of *why* this practice aligns with the specific goal (THIS section must be highly unique per page)
  3. Step-by-step instructions
  4. Contraindications / Safety notes (must adhere strictly to `exclusions.md`)
  5. Related practices for this goal

### 1.3 Sacred Texts (Chapter & Shloka Pages)
- **Chapter Pages Min. Word Count**: 2,500 words
- **Shloka Pages Min. Word Count**: 1,500 words
- **Required Sections**:
  1. Original Sanskrit text (Devanagari) + IAST transliteration
  2. Word-by-word literal translation (Anvaya)
  3. Complete English translation (public domain / fair use only)
  4. Multi-tradition commentary synthesis
  5. Modern practical application
  6. 5-10 FAQ Schema questions

### 1.4 Sanskrit Lexicon (`/learn/sanskrit/{word}`)
- **Minimum Word Count**: 1,000 words
- **Required Sections**:
  1. Devanagari + IAST + phonetic pronunciation
  2. Etymology (Sanskrit root/dhatu + suffix)
  3. Denotative and connotative meanings
  4. Usage examples in major texts
  5. Western philosophical equivalents (if applicable)

## 2. Uniqueness & Anti-Cannibalization Rules

1. **No "Find-and-Replace" pSEO**: Generating pages where only the target keyword/variable is swapped while the surrounding text remains identical is strictly prohibited. At least 40% of the text on combinatorial pages must be unique to that specific practice×goal combination.
2. **Canonical Mapping**: Every target concept must map directly to ONE canonical URL managed in `linkMap.json`. If "Karma Meaning" designates `/learn/sanskrit/karma` as canonical, do not build a separate `/what-is-karma` page without canonicalizing it.

## 3. SEO Formatting & Schema Standards

1. **Visual Hierarchy**: 
   - Exactly one `<h1>` per page.
   - Use `<h2>` and `<h3>` tags logically for subtopics. Must not skip heading levels.
2. **Schema Markup**: 
   - All informational and guide pages must include `Article` schema.
   - All pages featuring Q&A structures must include valid `FAQPage` schema.
   - Breadcrumb navigation must be implemented visibly and via `BreadcrumbList` schema.
3. **Internal Linking**: 
   - Every pSEO page must include at least 3 internal links to other nodes within the Sādhaka entity graph.
   - Anchor text must be descriptive (avoid "click here" or generic read mores).

## 4. Source & Citation Requirements (High E-E-A-T)

1. **Primary Texts**: Always cite the original shloka, sutra, or chapter when referencing scriptural claims.
2. **Plato Principle**: For comparative philosophy pages, present the strongest possible version of opposing traditional views before resolving them. Be objective.
3. **Attribution**: Clearly attribute translations to their respective authors (e.g., Swami Gambhirananda, Eknath Easwaran) and adhere to copyright and fair use constraints detailed in `exclusions.md`.
