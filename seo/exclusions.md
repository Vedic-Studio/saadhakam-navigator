# Sādhaka SEO & pSEO Exclusions Policy

This document acts as the supreme truth for content safety, legal compliance, and SEO risk mitigation for all pages on opensadhaka.com. Any programmatic SEO generator, LLM prompt, or human writer must check their content against this list *before* publishing. 

**Generators must fail-closed if they detect violations in this document.**

## 1. Medical & Health Claims (STRICT ZERO-TOLERANCE)

No page on Sādhaka is permitted to make definitive medical, curative, or psychiatric claims. 

### 🚫 Disallowed Keywords & Claim Patterns
- "Cures [disease/condition]"
- "Treats [disease/condition]"
- "Heals [disease/condition]"
- "Replaces therapy/medication"
- "Proven to stop..."

### ✅ Acceptable Framing
- "May support emotional well-being"
- "Traditionally used to cultivate calmness"
- "Many practitioners report increased focus"
- "Complements a holistic lifestyle"

### Sensitive Goals (Require Human QA)
Any combinatorial page targeting goals like `anxiety`, `depression`, `trauma`, `insomnia`, or `stress` must include a clear, non-intrusive medical disclaimer: *"Sādhaka provides traditional spiritual perspectives and practices. This content is for educational purposes and is not a substitute for professional medical or mental health advice."*

## 2. Tantra & Esoteric Practices

"Tantra" is a highly misunderstood topic with significant reputational risk.

### 🚫 Disallowed Topics
- "Sexual tantra" or neo-tantric sexual practices
- Left-hand path (Vamachara) rituals involving breaking societal taboos (unless strictly in an academic/historical context, unassociated with "how-to" practices)
- Occult practices framed as "magic" or "supernatural powers" (Siddhis) as goals to be chased

### ✅ Acceptable Framing
- Classical Tantra (Trika, Shaiva-Shakta philosophy)
- Mantra, Yantra, and deity yoga
- The theology of recognition (Pratyabhijna)

## 3. Copyright & Intellectual Property

Sādhaka must respect the copyrights of publishing trusts and lineages.

### 🚫 Disallowed Actions
- Reproducing the entirety of copyrighted contemporary translations or purports (e.g., A.C. Bhaktivedanta Swami Prabhupada's "Bhagavad-gita As It Is" purports, or recent translations by living authors) verbatim without written permission.
- Scraping and republishing paywalled content from competitors (Yoga International, Tantra Illuminated).

### ✅ Acceptable Framing
- **Fair Use**: Quoting short sentences or single paragraphs from copyrighted commentaries for the purpose of analysis, review, or comparison, accompanied by proper citation.
- **Public Domain**: Using historical translations (e.g., early 1900s translations) or creating original translations of original Sanskrit text.
- Creating **unique summaries and syntheses** of traditional commentaries (Shankara, Ramanuja, Madhva) based on public domain or widely understood interpretations.

## 4. Defamation, Sectarianism, & "Cult" Accusations

Sanatan Dharma encompasses many diverse traditions, some of which disagree fundamentally (e.g., Advaita vs. Dvaita). Sādhaka remains a neutral companion.

### 🚫 Disallowed Tactics
- Using "cult", "scam", or defamatory language toward any established lineage, organization, or guru.
- Taking sectarian sides in philosophical debates (e.g., stating "Advaita is the only true philosophy and Dvaita is wrong").
- Generating aggressive comparative pages targeting living gurus (e.g., "Sadhguru vs Sri Sri Ravi Shankar").

### ✅ Acceptable Framing
- Academic, respectful comparisons mapping the historical arguments (e.g., "How Shankara and Ramanuja differ on the nature of Brahman").
- Highlighting the unique strengths and historical context of each path.

## 5. Implementation in CI/CD & Generators

For any programmatic page generation script:
1. Load these exclusions.
2. Scan generated output against an array of disallowed regex patterns (e.g., `/cures?\s+(anxiety|depression|cancer|disease)/i`).
3. If a match is found, the script must **abort** generation for that specific permutation, log an error, and require manual human review.
