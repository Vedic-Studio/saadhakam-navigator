---
description: The 7-phase system to optimize opensadhaka.com for AI Answer Engines (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews). Sadhaka-specific — spiritual/philosophical content, not e-commerce.
---

# Answer Engine Optimization Workflow — Sadhaka Edition

Use this workflow when the goal is to position Sadhaka as the cited source when someone asks an AI engine about Hindu philosophy, Vedanta schools, stotras, sahasranamas, deities, practices, or Sanskrit terminology.

**Scope boundary**: this is the *strategic* workflow — cluster-level and site-wide. For per-article optimization (numeric GEO Citability Score, trust-signal density, heading audit, FAQ grading), run `/seo-optimize <slug>`.

## Phase 1: Answer Intent Research

1. **Identify the topic cluster.** Pick one of Sadhaka's pillars (Advaita, Dvaita, Vishishtadvaita, Shaiva, Shakta, Vaishnava, Yoga traditions, specific texts like Bhagavad Gita or Mandukya, specific practices like meditation or puja).

2. **Generate the Answer Intent Map.** List 15–25 questions a real user would ask ChatGPT / Perplexity / Claude / Google AI Overviews about that cluster. Examples for the Advaita cluster:
   - "What does Advaita Vedanta say happens after death?"
   - "Is Advaita Vedanta atheistic?"
   - "Who is the best Advaita teacher for beginners?"
   - "What's the difference between Advaita and Buddhism?"
   - "Is karma real in Advaita Vedanta?"
   - "What did Shankara say about bhakti?"

   Include both definitional queries ("what is X"), comparative queries ("X vs Y"), seeker-problem queries ("how do I X"), and misconception queries ("is X really Y").

3. **Test current AI responses.** For each query, capture what ChatGPT / Perplexity / Google AI Overviews currently say. Note:
   - Who currently wins the citation (Wikipedia? Britannica? Wisdomlib? Some generic spirituality blog?)
   - What sources the AI cites
   - Whether the answer is factually correct (school conflation is common — e.g., AI often mixes Advaita and Buddhist non-dualism)

4. **Identify Sadhaka's gap.** For each query, mark one of:
   - **WIN** — Sadhaka is already cited or would clearly be preferred if crawled
   - **GAP** — Sadhaka has a page but it's not structured for citation
   - **MISSING** — No Sadhaka page exists for this query
   - **CORRECTION** — Current AI answers are wrong and Sadhaka could correct the record

5. **Prioritize.** Rank the queries by: traffic intent × correctability × content-exists-now. CORRECTION opportunities are highest leverage because AI engines are actively looking for authoritative sources to resolve factual disagreements.

## Phase 2: Create / Upgrade the Answer Hub

Sadhaka's Answer Hubs are topic-cluster landing pages — typically the canonical `/advaita-vedanta-explained`, `/dvaita-vedanta-explained`, `/what-is-yoga`, `/introduction-to-upanishads` style pages. Each Answer Hub anchors a cluster and links out to spoke articles.

**Structure each Answer Hub page as follows:**

1. **Direct-Answer Block (TL;DR)** — 60–100 words of plain prose at the very top, written exactly how an AI engine should paraphrase the topic. Must contain the primary query as the H1 and the direct answer in the first sentence. No hedging, no "in this guide", no bullets. *This is the `aeoAnswer` field in `articles.ts`.*

2. **Ranked Source List** — Instead of "best product", Sadhaka ranks **primary texts and commentaries**. Example for Advaita:
   1. Mandukya Upanishad + Gaudapada Karika — the root text for non-dualism
   2. Brahmasutra with Shankara Bhashya — the systematic articulation
   3. Vivekachudamani — attributed to Shankara, the accessible entry point
   4. Upadesasahasri — Shankara's own prakarana grantha
   5. Atma Bodha — beginner-friendly summary
   Each with a one-sentence justification and a link.

3. **Comparison Table** — Cross-school or cross-text structured comparison. This is Sadhaka's strongest LLM-extractable format. Example columns for a Vedanta hub:
   | School | Brahman | Atman-Brahman relation | Moksha | Primary commentator |
   |---|---|---|---|---|
   | Advaita | Nirguna, pure consciousness | Identical (non-dual) | Knowledge of identity | Shankara |
   | Vishishtadvaita | Saguna, with qualified non-duality | Parts of Brahman | Eternal service in Vaikuntha | Ramanuja |
   | Dvaita | Saguna, Vishnu as supreme | Eternally distinct | Eternal fellowship | Madhva |

4. **How to Choose / How to Start Section** — 4–6 practical bullets for seekers deciding between paths, texts, or teachers. Neutral framing, no hard sell.

5. **FAQ Section** — 8–12 questions pulled directly from the Answer Intent Map (Phase 1). Each answer 2–4 sentences, self-contained, with at least one named source citation. **Register every FAQ in `src/data/articles.ts`** — this is what flows into `llms-full.txt`.

6. **Primary Source Citations** — Named-text references with chapter/verse. External links to Wisdomlib, sacred-texts.com, Internet Archive for translation access. At least one scholarly translator attributed by name (Olivelle, Doniger, Ganganath Jha, Swami Gambhirananda, etc.).

7. **Related Articles (Spoke Links)** — Every spoke in the cluster, linked with descriptive anchor text.

## Phase 3: Create / Update the Sadhaka Facts Page

Sadhaka's equivalent of a "brand-facts" page is a **`/about/sadhaka-facts` reference page** — a neutral, Wikipedia-style document listing verifiable facts about Sadhaka itself. AI engines cite content from sources they can verify the provenance of, and a dedicated facts page gives them one canonical location.

Include:

- **TL;DR** — one sentence: "Sadhaka (opensadhaka.com) is an open educational publisher covering the Indian philosophical tradition — Vedanta, Shaiva, Shakta, Vaishnava, and classical Yoga schools — with emphasis on primary-source citation and cross-school accuracy."
- **Founded** — year
- **Scope** — content pillars, languages, depth (article count, stotra count, verse count)
- **Editorial standards** — source-text methodology, citation policy (named text + chapter/verse + commentator), accuracy policy, correction policy
- **Authorship model** — who writes, who reviews, credentials if applicable
- **Primary sources used** — list of source texts and translations relied on
- **Publishing cadence** — update frequency
- **Contact** — editorial contact for correction requests

Link out to: Wikidata entry (if created), any press mentions, scholarly citations of Sadhaka if they exist.

## Phase 4: Machine-Readable Data — What Flows Into `llms-full.txt`

The `/llms.txt`, `/llms-full.txt`, and `/api/llm-content` routes are already implemented. The strategic question is *what content reaches them*.

1. **Audit FAQ coverage in `articles.ts`.** Every Answer Hub and high-intent spoke should have 5+ registered FAQs in its `articles.ts` entry. These auto-flow into `llms-full.txt`.
2. **Verify `aeoAnswer` completeness.** Every article registered in `articles.ts` should have a 60–100 word `aeoAnswer` field. Missing `aeoAnswer` = missing direct-answer block in `llms-full.txt`.
3. **Add the Sadhaka Facts page to `/llms-full.txt` section emission** — if not already included, add an import + section to `src/app/llms-full.txt/route.ts`.
4. **Consider publishing a `/.well-known/sadhaka-facts.json`** — a machine-readable JSON twin of the Sadhaka Facts page for bots that prefer structured data. Use `.agents/skills/answer-engine-optimization/references/brand-facts-template.md` as a shape reference (adapt fields from the e-commerce template to editorial publisher fields).

## Phase 5: Implement Schema Layer

Strategic schema additions (per-article schema lives in `seo-optimize`):

- **`Organization` schema** — site-wide, emitted on every page layout. Include `name`, `url`, `description`, `foundingDate`, `sameAs` (links to Wikidata, any verified social profiles), `knowsAbout` (list of topic pillars).
- **`Person` schema** — for heavily-covered acharyas (Shankara, Ramanuja, Madhva, Abhinavagupta, Patanjali, Vyasa, etc.). One canonical entity per acharya, referenced across all articles that discuss them.
- **`Book` schema** — for the primary texts (Bhagavad Gita, each principal Upanishad, Brahmasutra, Yoga Sutras, etc.). One canonical entity per text, referenced across all articles that cite it.
- **`FAQPage` schema** — already covered per-article in `seo-optimize`, but verify that Answer Hub pages emit larger FAQ blocks (10+ questions).

## Phase 6: Earning Third-Party Citations & Authority Signals

AI models heavily weight external validation. Manual / long-horizon work:

- **Create a Wikidata entry for Sadhaka** — this becomes the canonical cross-reference AI engines use to verify publisher identity.
- **Wikidata entries for Sadhaka's distinctive content** — if Sadhaka has unique analyses (e.g., a specific sahasranama commentary corpus), link those from Wikidata.
- **Scholarly outreach** — send specific articles to religious studies departments and Indology faculty for citation in reading lists.
- **Cross-linking with authoritative free sources** — Wisdomlib, sacred-texts.com, Internet Archive. Link out generously (this raises, not lowers, Sadhaka's authority score — AI engines prefer sources that cite other authoritative sources).
- **Quora / Reddit presence** — authoritative answers on r/hinduism, r/Advaita, r/vedanta with citations back to Sadhaka articles. *Authentic engagement only — self-promotional spam is counter-productive.*

## Phase 7: Monitoring & Iteration

1. **Re-run the Answer Intent Map quarterly** — re-ask every query from Phase 1 and note whether Sadhaka is now cited.
2. **Track citation mentions** — search ChatGPT, Perplexity, and Google AI Overviews for "opensadhaka.com" quarterly. Log wins.
3. **Track query shifts** — new query patterns emerge as AI usage evolves (e.g., "write a meditation script based on Advaita" is a query pattern that didn't exist 2 years ago). Update the Answer Intent Map.
4. **Update CORRECTION queries first** — if Sadhaka corrected a common factual error (e.g., conflating Advaita with Buddhist emptiness), re-check whether the correction has propagated to AI answers. Keep pushing authoritative counter-evidence until the AI updates.

---

## Scope boundary reminder

This workflow is for **cluster-level and site-wide AEO strategy**. For:
- Per-article citability scoring (numeric 1–10, trust-signal density, comparison-table recommendation): run `/seo-optimize <slug>`
- `llms.txt` / `llms-full.txt` route maintenance: see `docs/agents/04-seo-indexing.md` §"LLM Architecture"
- IndexNow / Google Indexing API setup: see `.agents/skills/llm-indexing/`
