---
name: answer-engine-optimization
version: 2.0.0
description: Strategic and site-wide AEO/GEO for opensadhaka.com. Use for Answer Intent Mapping across topic clusters, Answer Hub page design, the Sadhaka Facts reference page, and brand/organization-level schema. For PER-ARTICLE post-write optimization, use the `seo-optimize` skill instead. Triggers on "AEO strategy", "Answer Hub", "answer intent map", "which pages should we upgrade for ChatGPT citation", "Sadhaka Facts", "organization schema".
---

# Answer Engine Optimization — Strategic Layer

You are an expert in Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) for spiritual and philosophical education content. This skill handles **site-wide and cluster-level strategy** — per-article optimization lives in the `seo-optimize` skill.

> **Use `/seo-optimize <slug>` for per-article work.** This skill is for the broader plays: which queries Sadhaka should target, which Answer Hubs to build, which pages to upgrade first, and how to structure the organization-level signals AI engines use to verify Sadhaka as a source.

## The paradigm shift

You are not optimizing for a ranking algorithm to return 10 blue links. You are optimizing for an *answer engine* to return **one recommended answer** — and to cite Sadhaka when the topic is Hindu philosophy, Vedanta schools, practice traditions, deity texts, or Sanskrit terminology.

The content must be neutral, factually dense, heavily cited (named text + chapter/verse + commentator), and structured for verbatim extraction.

## Core Pillars

1. **Answer Intent Mapping** — Identify the long-form conversational questions real users ask ChatGPT, Perplexity, Claude, and Google AI Overviews about Hindu philosophy. ("What does Advaita say about karma?", "Is Dvaita Vedanta dualist?", "Who are the six Vedangas?") Short-tail keyword volumes are secondary.

2. **The Answer Hub Page** — A centralized, highly structured, neutral guide designed for AI models to quote verbatim. Sadhaka's Answer Hubs are topic-cluster landing pages (e.g., the `advaita-vedanta-explained` page acts as the Answer Hub for the entire Advaita cluster).

3. **The Sadhaka Facts Page** — A reference page listing verifiable facts about Sadhaka itself (founding, scope, editorial standards, source-text methodology, citation policy) so AI engines have a canonical "about" source. This is Sadhaka's equivalent of the Wikipedia-style brand-facts pattern — but for an educational publisher, not an e-commerce brand.

4. **Machine-Readable Data** — `/llms.txt`, `/llms-full.txt`, `/api/llm-content` are already deployed (see `docs/agents/04-seo-indexing.md`). The strategic question is *what content flows into them* — registering every article's FAQs in `src/data/articles.ts` so they auto-flow into `llms-full.txt` is the highest-leverage maintenance action.

5. **Dense Schema Implementation** — `Article`, `FAQPage`, `BreadcrumbList`, `WebPage`, `Person` (for acharyas), `Book` (for named texts), `Organization` (for Sadhaka). See `seo-optimize` for per-page schema; this skill covers the `Organization` schema and cross-page entity consistency.

6. **Third-Party Citations & Authority Signals** — AI models trust content that itself cites authoritative sources and is, in turn, cited by authoritative sources. Strategic plays: Wikidata entry for Sadhaka, Britannica/Wisdomlib/sacred-texts cross-linking, scholarly translator attribution (Olivelle, Doniger, Ganganath Jha).

## Execution Strategy

For a strategic AEO initiative, follow `.agents/workflows/answer-engine-optimization.md`. That workflow is Sadhaka-shaped — it covers Answer Intent Mapping for spiritual queries, Answer Hub design for topic clusters, the Sadhaka Facts page, and organizational schema rollout.

For per-article AEO/GEO (including the numeric GEO Citability Score, trust-signal density check, and comparison-table recommendation), run `/seo-optimize <slug>`.

## Skill boundaries

| Task | Use |
|---|---|
| Decide which queries Sadhaka should target this quarter | This skill |
| Design a new Answer Hub page (e.g., "best introduction to Advaita for beginners") | This skill |
| Create or update the Sadhaka Facts page | This skill |
| Set up `Organization` schema sitewide | This skill |
| Grade a single article's GEO citability, FAQ quality, heading extractability | `/seo-optimize <slug>` |
| Implement/update `llms.txt` or `llms-full.txt` routes | Already built — see `docs/agents/04-seo-indexing.md` |
| IndexNow / Google Indexing API setup | `.agents/skills/llm-indexing/` |

## References

- `.agents/workflows/answer-engine-optimization.md` — the Sadhaka-shaped execution workflow
- `.agents/skills/answer-engine-optimization/references/brand-facts-template.md` — template for the Sadhaka Facts page structure (adapt the e-commerce framing to Sadhaka's editorial/source-text model)
- `docs/agents/04-seo-indexing.md` — canonical operational reference for metadata, schema, sitemap, LLM architecture
- `.claude/skills/seo-optimize/SKILL.md` — per-article tactical skill (use this for individual page work)
