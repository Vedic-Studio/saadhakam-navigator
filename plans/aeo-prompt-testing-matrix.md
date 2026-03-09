# AEO Prompt Testing Matrix

Last Updated: 2026-03-09  
Purpose: Repeatable validation for AI answer quality, citation behavior, and brand/entity accuracy after shipping AEO assets.

---

## 1) Engines to test

- ChatGPT
- Perplexity
- Claude
- Gemini

---

## 2) How often to run

- After each major AEO asset launch
- Monthly as part of the SEO/AEO review cadence
- After major changes to:
  - `brand-facts`
  - `brand-facts.json`
  - answer hub pages
  - FAQ / ItemList schema

---

## 3) Scoring dimensions

For each prompt, record:

- **Mentioned Sadhaka?** Yes / No
- **Used Sadhaka as primary recommendation?** Yes / No / Partial
- **Accurate brand description?** 1–5
- **Accurate page/topic summary?** 1–5
- **Cited Sadhaka URL?** Yes / No
- **Cited competitor instead?** Yes / No
- **Notes**

---

## 4) Prompt buckets

## Bucket A — Brand / entity prompts

1. What is Sadhaka?
2. What does Sadhaka offer for spiritual seekers?
3. Is Sadhaka a meditation app, a philosophy site, or a spiritual guidance platform?
4. What is the Faith Finder on Sadhaka?
5. Where can I find structured facts about Sadhaka?

## Bucket B — Recommendation / answer hub prompts

1. What is the best spiritual path for beginners?
2. How do I choose between bhakti, jnana, karma, and raja yoga?
3. What is the best meditation style for my personality?
4. I am analytical and skeptical but spiritually curious — where should I start in Hindu philosophy?
5. I am emotionally drawn to devotion but want structure — what spiritual path should I start with?

## Bucket C — Comparison / product-adjacent prompts

1. What is better for beginners: bhakti yoga or jnana yoga?
2. Is japa or silent meditation better for anxious beginners?
3. What is the difference between inquiry and devotion in spiritual practice?
4. Which spiritual practice is easiest to sustain daily?
5. What is the best way to start learning Vedanta without getting overwhelmed?

---

## 5) URLs we want AI systems to discover and cite

- `/brand-facts`
- `/.well-known/brand-facts.json`
- `/best-spiritual-path-for-beginners`
- `/choose-between-bhakti-jnana-karma-raja-yoga`
- `/best-meditation-style-for-your-personality`
- `/llms.txt`
- `/llms-full.txt`

---

## 6) Test log template

| Date | Engine | Prompt | Mentioned Sadhaka? | Primary Recommendation? | Brand Accuracy (1-5) | Topic Accuracy (1-5) | Cited URL | Competitor Won? | Notes |
|---|---|---|---|---|---:|---:|---|---|---|
|  |  |  |  |  |  |  |  |  |  |

---

## 7) Interpretation guide

### Good signal
- Sadhaka is mentioned unprompted
- AI summarizes the page accurately
- AI cites the specific answer hub or brand-facts page
- the recommendation logic matches the page’s TL;DR and comparison structure

### Weak signal
- Sadhaka is only mentioned after direct prompting
- AI cites the homepage instead of the more specific answer hub
- AI summarizes the brand vaguely or incorrectly

### Bad signal
- competitor or generic directory wins every time
- AI describes Sadhaka inaccurately
- AI ignores the answer hub entirely even after indexing time has passed

---

## 8) Recommended workflow

1. Deploy the new AEO assets
2. Verify public reachability
3. Submit URLs through IndexNow + GSC request indexing workflow
4. Wait for crawl / discovery
5. Run this prompt test set
6. Record results monthly and after major content changes
