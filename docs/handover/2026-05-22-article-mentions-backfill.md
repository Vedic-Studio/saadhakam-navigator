# Handover — Article `mentions` + `wordCount` backfill

**Created**: 2026-05-22
**Predecessor**: PR #35 (`feat(seo): cross-link Article schemas to sitewide entity nodes`)
**Status**: Infrastructure shipped; data backfill not started

---

## Context (read this before doing anything)

Google's May 2026 AI Overviews update uses `mentions` cross-links in Article schema to build entity graphs and surface deep guides in "Explore New Angles". PR #35 added the infrastructure:

- `ArticleMeta` gained two optional fields: `wordCount?: number` and `mentions?: ArticleMention[]`
- `buildArticleSchemas` already emits these into the per-article JSON-LD when present
- Schema ships `mentions: [{ "@type": "Thing", name, sameAs, url }]` and `wordCount` when populated; omits both when absent
- All 75 articles currently have neither field — that's the work this note hands off

The shape lives at [src/data/articles.ts:38-62](src/data/articles.ts:38). Schema emission lives at [src/lib/seo/index.ts:194-216](src/lib/seo/index.ts:194) and [src/lib/seo/index.ts:419-446](src/lib/seo/index.ts:419).

## Why this is editorial work, not mechanical

Selecting `mentions` for an article is a positioning call:

- A piece on "How karma and dharma work" could mention any of: Karma, Dharma, Bhagavad Gita, Vedanta, Mimamsa, Patanjali, Krishna, Yajnavalkya, Vedic ritual, samsara, moksha. The right answer is 3–8 entities the article *foregrounds substantively*, not every entity it brushes past in prose.
- Wrong selection inflates the entity graph with weak signals. AI engines weight `mentions` by how authoritatively the article treats each entity; over-claiming dilutes the citation lift.
- Per `feedback_content_collaboration.md` in memory, content positioning needs strategic input — don't bulk-generate without per-article judgment.

This is why PR #35 deliberately left the population step out of scope.

## Schema shape (the exact contract)

```typescript
// src/data/articles.ts
export interface ArticleMention {
    /** Entity name as it appears in primary sources. */
    name: string;
    /** Canonical external URL (Wikipedia, Wikidata, official site). */
    sameAs?: string;
    /** Internal Sadhaka page that defines the entity, if one exists. */
    url?: string;
    /** Schema.org type. Defaults to "Thing". */
    type?: string;
}
```

### Worked example — `/what-is-sanatan-dharma`

```typescript
{
    slug: "what-is-sanatan-dharma",
    // ...existing fields...
    wordCount: 2800,
    mentions: [
        { name: "Sanatan Dharma", sameAs: "https://en.wikipedia.org/wiki/Sanatana_Dharma" },
        { name: "Vedas", sameAs: "https://en.wikipedia.org/wiki/Vedas", url: "/what-is-vedanta" },
        { name: "Bhagavad Gita", sameAs: "https://en.wikipedia.org/wiki/Bhagavad_Gita", type: "Book" },
        { name: "Upanishads", sameAs: "https://en.wikipedia.org/wiki/Upanishads", url: "/what-are-the-upanishads" },
        { name: "Dharma", sameAs: "https://en.wikipedia.org/wiki/Dharma" },
    ],
}
```

### Type values to use

| Entity kind | `type` value | Example |
|---|---|---|
| Philosophical school / concept | `"Thing"` (default — omit) | Advaita Vedanta, Maya, Karma |
| Sacred text / book | `"Book"` | Bhagavad Gita, Yoga Sutras |
| Historical person / teacher | `"Person"` | Shankaracharya, Ramana Maharshi |
| Deity (treat as a Person entity in schema) | `"Person"` | Krishna, Shiva — schema.org has no `Deity` type |
| Sacred place | `"Place"` | Mount Kailash, Varanasi |

## URL conventions

1. **`sameAs`**: prefer English Wikipedia. If a Wikidata Q-number exists and the Wikipedia article is thin, use `https://www.wikidata.org/wiki/Qxxxxxxx` instead. **Verify the URL resolves** before committing — Wikipedia title casing matters (`Bhagavad_Gita` not `Bhagavad_gita`).
2. **`url`**: only set when a defining Sadhaka page exists. Use the relative path (e.g. `/what-is-vedanta`, `/philosophies/advaita`, `/deities/shiva`). The schema builder calls `buildUrl()` on this internally — don't pre-resolve to the absolute URL.
3. **Internal KB linking**: if the entity is in `backend/app/knowledge/kb/{concepts,texts,people,shastras,claims}/<slug>.md`, that's the canonical Sadhaka treatment — but the KB files don't have public URLs yet (see memory's `project_traffic_diagnostic_may19.md` — "kb/claims not yet publicly routed"). Don't set `url:` to a KB path until the routing exists. Use the public Sadhaka page instead.

## Available KB entities (cite for accuracy)

The KB at `backend/app/knowledge/kb/` is the editorial source of truth for these specific entities — read the file before writing the mention to make sure the framing matches Sadhaka's editorial line:

- **Texts (21)**: arthashastra, aryabhatiya, ashtadhyayi, atharvaveda, brahma-sutras, brahmasphutasiddhanta, chandas-sutra, charaka-samhita, lilavati, manusmriti, mimamsa-sutras, natya-shastra, nyaya-sutras, principal-upanishads, rigveda, samkhya-karika, surya-siddhanta, sushruta-samhita, vaisheshika-sutras, vedanga-jyotisha, yoga-sutras
- **People (26)**: aryabhata, bharata-muni, bhaskara-ii, brahmagupta, cardona, charaka, ganeri, gautama-akshapada, halayudha, hemachandra, jaimini, kanada, kautilya, kumarila-bhatta, lagadha, madhava-sangamagrama, matilal, olivelle, panini, patanjali, pingala, plofker, shamasastry, virahanka, wujastyk, zysk
- **Concepts (16)**: aksha-sukta-addiction, anumana, apaurusheyatva, chandas-binary-patterns, darshanas-framework, dharmayuddha-vs-kutayuddha, guna-theory, meru-prastara, padarthas, panini-meta-rules, prakriti-dosha, pramana-epistemology, shruti-vs-smriti, upavedas-framework, vaisheshika-anu, vedangas-framework
- **Shastras (16)**, **Claims (15)** — see `backend/app/knowledge/kb/INDEX.md`

**Note**: Vedanta-specific entities (Advaita, Dvaita, Shankara, Ramanuja, Madhva, the Bhagavad Gita itself) are *not* in the KB yet. For those, use Wikipedia `sameAs` + internal Sadhaka `url` where the article exists.

## Quality criteria

Per article, the mention list must satisfy:

1. **3–8 entries**. Fewer than 3 means the article isn't substantively about anything specific. More than 8 dilutes the signal.
2. **Each entity is named in the article body**, not just the title. Skim the prose and confirm.
3. **`sameAs` URLs resolve to a real, on-topic article** — verify with `curl -sI <url>` or a browser.
4. **Internal `url` points at the canonical Sadhaka definer page** for that entity, if one exists. Don't fabricate routes — check the existing slug list in this file.
5. **Order matters loosely** — most-foregrounded entity first. Schema doesn't enforce ordering but LLMs read sequentially.
6. **`wordCount` is approximate** — round to nearest 100. Don't spend time counting; read the article's `readingTime` field (minutes) and multiply by ~220 wpm as a baseline, then sanity-check by skimming.

## Batching plan

**Don't try to do all 75 in one session** (per CLAUDE.md token cap rules).

Suggested batches (each ~10–15 articles, one session each):

### Batch 1 — Sprint 1 hubs/spokes (highest traffic, do first)
From memory's Sprint 1 list — these are the priority targets in the traffic ramp-up plan:

1. what-is-sanatan-dharma
2. advaita-vedanta-explained
3. advaita-vs-dvaita
4. how-karma-dharma-work
5. vedas-upanishads-bhagavad-gita-guide
6. what-is-maya
7. midlife-crisis-spiritual-meaning
8. fear-of-death-advaita-vedanta
9. dark-night-of-the-soul
10. spiritual-antidote-to-hustle-culture

### Batch 2 — Sacred texts pillar
bhagavad-gita-complete-guide, bhagavad-gita-chapter-1, bhagavad-gita-chapter-2, what-are-the-upanishads, vedas-vs-upanishads-explained, how-to-read-upanishads-western-beginner, best-bhagavad-gita-translation-for-beginners, yoga-sutras-complete-guide, ramayana-explained, bhagavad-gita-vs-bible

### Batch 3 — Ancient wisdom pillar (Vedanta + bridges)
what-is-vedanta, western-philosophy-and-vedanta, vedanta-vs-stoicism, vedanta-vs-buddhism, vedanta-vs-tantra, platos-cave-and-maya, nietzsche-and-vedanta, existentialism-and-vedanta, carl-jung-and-vedanta, consciousness-hard-problem-vedanta, christian-mysticism-and-vedanta, sufi-mysticism-and-vedanta, non-duality-vs-dualism, inquiry-vs-devotion-path, difference-between-yoga-and-vedanta

### Batch 4 — Practical practices pillar
how-to-start-japa, how-to-start-meditating-daily, daily-spiritual-routine-beginners, spiritual-practice-sequence, practical-spiritual-practices, how-to-choose-a-mantra, 10-powerful-sanskrit-mantras, which-meditation-for-me, meditation-for-anxiety-overthinking, meditation-for-burnout, meditation-for-trauma-survivors, neuroscience-of-meditation-hinduism, what-is-kriya-yoga, kundalini-awakening

### Batch 5 — Traditions, places, teachers
spiritual-paths-explained, what-is-tantra, hindu-goddess-explained, shaivism-vs-vaishnavism, adi-shankaracharya-life-teachings, ramana-maharshi-who-am-i, paramahansa-yogananda-teachings, isha-foundation-sadhguru, do-you-need-a-guru, how-to-spot-fake-spiritual-guru, red-flags-yoga-studios, can-i-practice-vedanta-without-converting, can-i-chant-a-mantra-without-initiation

### Batch 6 — India travel + sacred sites + meta
spiritual-travel-india-guide, rishikesh-vs-dharamshala, silent-meditation-retreats-india, indian-ashram-etiquette-packing, sacred-sites-india, kailasa-temple-ellora, kailasa-vs-ajanta-caves, south-india-temple-architecture, most-powerful-shiva-temples-india, how-to-study-indian-philosophy-home, online-yoga-teacher-training-worth-it, how-to-learn-sanskrit, celebrity-spiritual-courses-review

## Resume prompt (paste into a fresh session for a batch)

```
I'm continuing the article `mentions` + `wordCount` backfill from PR #35.

Read these first:
- docs/handover/2026-05-22-article-mentions-backfill.md (this note — full context)
- src/data/articles.ts (where the fields go; ArticleMention interface at top)
- src/lib/seo/index.ts (schema emission, search for "mentions")

Work on Batch <N> from the handover note. For each article slug in the batch:

1. Locate the article body. Most live at src/app/<slug>/page.tsx; some use CMS
   content loaded via getPublishedCmsContent (check src/lib/cms/storage.ts).
   For pilot articles, also check src/content/articles/pilotArticles/.

2. Read the body. Identify 3–8 entities the article foregrounds substantively
   (not just mentions in passing). Cross-reference the KB at
   backend/app/knowledge/kb/{texts,people,concepts}/ — if a KB file exists for
   the entity, read it to make sure the framing matches Sadhaka's editorial line.

3. For each entity, find the canonical Wikipedia URL. Verify it resolves
   (curl -sI). For deities, use type: "Person". For texts, type: "Book". For
   philosophical concepts, default Thing (omit type).

4. If a defining Sadhaka page exists for the entity, set `url:` to the relative
   path. Check against the slug list in articles.ts — don't fabricate routes.

5. Estimate wordCount from readingTime * ~220 wpm, sanity-check by skimming,
   round to nearest 100.

6. Edit src/data/articles.ts to add `wordCount` and `mentions` to each
   article's entry, immediately after the `featuredImage` field.

Quality gates before committing:
- All sameAs URLs resolve (200 OK)
- All internal `url` paths exist in the slug catalog
- Each article has 3–8 mentions, each named in the article body
- Run: npm run test:run -- src/lib/seo (must stay green)
- Run: npm run lint (no NEW errors on articles.ts)

When done with the batch, commit:
  git commit -m "data(seo): populate mentions + wordCount for batch <N>"

Then stop and write a brief progress note. Do NOT continue to the next batch
in the same session — context cap rules.
```

## Alternative: scripted per-article workflow

If batching feels too coarse, the existing `/seo-optimize <slug>` skill could be extended to emit a `mentions` proposal per article that you then review and commit. That would push entity selection to the same pass that does the GEO citability score. Not done in PR #35 — that's a separate change to the skill at `.claude/skills/seo-optimize/`.

## Verification after each batch

```bash
# Run schema tests — they exercise the mention emission path
npm run test:run -- src/lib/seo/index.test.ts

# Spot-check a populated article's emitted JSON-LD
npm run dev
# Then curl https://localhost:3000/what-is-sanatan-dharma | grep "mentions"
```

For a live AI-citation sanity check, paste the article URL into Perplexity or ChatGPT search and confirm the source attribution surfaces "Sadhaka" — though this signal takes weeks to propagate after schema changes ship.

## Pointers

- Predecessor PR: https://github.com/Vedic-Studio/saadhakam-navigator/pull/35
- Schema utility: [src/lib/seo/index.ts:194-216](src/lib/seo/index.ts:194), [src/lib/seo/index.ts:419-446](src/lib/seo/index.ts:419)
- Data shape: [src/data/articles.ts:38-62](src/data/articles.ts:38)
- KB: [backend/app/knowledge/kb/INDEX.md](backend/app/knowledge/kb/INDEX.md)
- Memory: `project_seo_geo_strategy.md`, `feedback_content_collaboration.md`, `project_iks_knowledge_base.md`
