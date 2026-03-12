# Agent: Stotra Content

**Scope**: Creating and populating stotra JSON files. Does not touch page components (see `07-data-schema.md` for type changes, see page files directly for component work).

---

## Where Files Live

```
content/stotras/
  shiva-tandava-stotram.json     ← complete (16 verses, full analysis)
  vishnu-sahasranama.json        ← names only, no verse analysis needed
  lalita-sahasranama.json        ← names only, no verse analysis needed
```

**Loader**: `src/lib/stotras.ts` — reads JSON at build time via `fs.readFileSync`. No database. No API. JSON is the single source of truth.

---

## JSON Schema — Stotra (type: "stotra")

```json
{
  "id": "slug-of-stotra",
  "title": "Full Title",
  "slug": "slug-of-stotra",
  "type": "stotra",
  "author": "Ravana",
  "tradition": "Shaiva",
  "deity": "Shiva",
  "language": "Sanskrit",
  "verseCount": 16,
  "description": "One sentence description for meta/SEO.",
  "verses": [ ...StotraVerse[] ]
}
```

### StotraVerse Schema

```json
{
  "verse": 1,
  "slug": "verse-1",
  "sanskritDevanagari": "जटाटवीगलज्जल...",
  "transliteration": "jaṭāṭavīgalajjala...",
  "wordMeanings": "jaṭā—matted hair; kaṭāha—basin...",
  "translation": "Direct/literal translation, clause by clause.",
  "translationFlow": "Flowing literary rendering — reads like prose-poetry, not word-for-word. Captures spirit, imagery, emotional tone. 2–4 sentences.",
  "analysis": {
    "literary": "Meter, Sanskrit wordplay, onomatopoeia, structural notes, compound analysis. What makes this verse work as poetry.",
    "mythological": "Specific Puranas, events, deity relationships, cross-text references (cite chapter/parva/khanda). Which stories are encoded in each image.",
    "philosophical": "Shaiva/Tantric/Vedantic depth. Kashmir Shaivism, Advaita, Bhakti. Connections to Gita, Upanishads, Agamas. What the verse teaches beyond its surface."
  }
}
```

---

## Content Standards Per Field

### `translationFlow`
- NOT a word-for-word gloss — that is `translation`
- English should flow naturally as prose-poetry
- Preserve the imagery sequence (don't collapse images)
- Aim: a reader who knows no Sanskrit should feel the verse viscerally
- Length: 2–5 sentences

### `analysis.literary`
- Identify the Sanskrit meter (Jagatī, Anushtubh, Shalinī, etc.)
- Call out onomatopoeia (ḍamaḍ, dhagad, dhimid) and what they mimic
- Note significant compound structures (samāsa types if relevant)
- Note any wordplay, double meanings (śleṣa), or deliberate paradox
- Note structural features (pivot points, accumulating epithets, etc.)

### `analysis.mythological`
- Name the specific Purana, Parva, Samhita, or chapter
- Name the characters involved and their relationship to the story
- Cross-reference: if a story appears in multiple texts, note both
- If an epithet encodes an event, unpack the event fully
- Avoid vague references like "a Shiva story" — be specific

### `analysis.philosophical`
- Identify the school: Kashmir Shaivism (Trika/Spanda), Advaita Vedanta, Shaiva Siddhanta, Bhakti, Tantra
- Connect to a named concept or text (Spanda-karikas, Vijnanabhairava, Bhagavad Gita verse, Upanishadic statement)
- Depth over breadth — one well-developed philosophical reading > three shallow ones
- The analysis should teach something, not just label things

---

## How to Add a New Stotra

1. **Create** `content/stotras/<slug>.json` following the schema above
2. **Verify** the loader works: `src/lib/stotras.ts` `loadStotra("<slug>")` requires the file at that exact path
3. **Update** `src/app/sitemap.ts` — add the stotra slug to the stotras list
4. **Verify** route exists: `src/app/stotras/<slug>/page.tsx` (index) and `src/app/stotras/<slug>/[verse]/page.tsx` (verse detail)
5. After merging to main: run `npm run indexnow:submit:prod`

---

## Stotra Backlog

| Stotra | Verses | Status | Notes |
|--------|--------|--------|-------|
| Shiva Tandava Stotram | 16 | ✅ Complete | All fields populated |
| Devi Mahatmyam (Mahishasura Mardini) | 21 | ⬜ Not started | High priority — Durga/Shakta |
| Purusha Suktam | 16 | ⬜ Not started | Vedic — high search volume |
| Shri Suktam | 15 | ⬜ Not started | Lakshmi — high search volume |
| Hanuman Chalisa | 40 | ⬜ Not started | Highest search volume of all |
| Shivashtakam | 8 | ⬜ Not started | Short, good for testing schema |
| Nirvana Shatakam | 6 | ⬜ Not started | Adi Shankaracharya, Advaita |

### Priority Order for Next Agent
1. Hanuman Chalisa (40 verses, massive search volume)
2. Nirvana Shatakam (6 verses, perfect Advaita content, short)
3. Shivashtakam (8 verses, extends Shiva cluster)
4. Purusha Suktam (16 verses, Vedic — fills a gap)

---

## Verse `slug` Convention

- `verse-1`, `verse-2`, ... `verse-16`
- For sahasranamas (names, not verses): `name-001`, `name-002` ... `name-1000`

---

## Quality Check Before Committing

- [ ] Every verse has all 7 fields: `verse`, `slug`, `sanskritDevanagari`, `transliteration`, `wordMeanings`, `translation`, `translationFlow`
- [ ] Every verse has `analysis` with all 3 sub-fields: `literary`, `mythological`, `philosophical`
- [ ] `verseCount` in metadata matches actual verse array length
- [ ] JSON is valid (run `node -e "require('./content/stotras/<slug>.json')"` to check)
- [ ] No verse has empty string `""` for any field — use placeholder text if content is pending
