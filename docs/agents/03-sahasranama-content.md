# Agent: Sahasranama Content

**Scope**: Populating analysis content in sahasranama JSON files. The 1000-name structure is already seeded with `name`, `transliteration`, `meaning`, `slug`. Task is to add `analysis.mythological` and `analysis.philosophical` to each name.

---

## File Locations

```
content/stotras/
  vishnu-sahasranama.json    — 1000 names, Vaishnava tradition
  lalita-sahasranama.json    — 1000 names, Shakta tradition
```

---

## JSON Schema — SahasranamaName

```json
{
  "number": 1,
  "name": "विश्वम्",
  "transliteration": "viśvam",
  "meaning": "The Universe / The All",
  "slug": "name-001",
  "analysis": {
    "mythological": "Which Purana, story, avatar, event, or cosmic episode this name refers to. Which form of the deity. Cross-references to Mahabharata, Bhagavata Purana, Devi Mahatmyam, etc.",
    "philosophical": "What this name teaches — Advaita, Vishishtadvaita, Dvaita, Shakta Tantra, or cross-school interpretation. Connection to Upanishadic statements or Gita verses where relevant."
  }
}
```

---

## Content Standards

### `analysis.mythological`
- Connect the name to a specific story, avatar, cosmic event, or Puranic episode
- Name the Purana/source (Bhagavata Purana Book X, Devi Mahatmyam Chapter Y, Mahabharata Parva Z)
- For Vishnu Sahasranama: reference Vishnu's avatars, cosmic forms, key events (Samudra Manthan, Prahlada story, Kurmavatar, etc.)
- For Lalita Sahasranama: reference Devi's forms, battles (Mahishasura, Shumbha-Nishumbha), her cosmic geography (Shri Chakra, Mount Meru)
- If a name has no specific mythological referent (pure descriptive), note what quality it describes and where that quality appears in the tradition

### `analysis.philosophical`
- **Vishnu Sahasranama**: Vaishnava Vedanta lens primarily (Ramanuja's Vishishtadvaita, Madhva's Dvaita), with Advaita where the name points to pure Brahman
- **Lalita Sahasranama**: Shakta Tantra lens (Shri Vidya, Shri Chakra cosmology), with Kashmir Trika Shaivism connections where relevant
- Connect to a specific text/concept: Bhagavad Gita verse, Brahmasutra, Yoga Vasistha, Devi Bhagavata, Tripura Rahasya
- Minimum 2 sentences, maximum 5 — depth over breadth

---

## Work Chunking Strategy

The 1000 names of each sahasranama must be processed in chunks to stay within context limits. **Context rule**: Each chunk (e.g., VSN-A = names 1–100) is one agent session. Write the JSON, verify, commit, then exit. The next chunk starts with a fresh context — do not carry analysis from prior names forward.

Recommended chunk sizes:

### Vishnu Sahasranama Chunks
| Chunk | Names | Batch |
|-------|-------|-------|
| VSN-A | 1–100 | First 100 names |
| VSN-B | 101–200 | |
| VSN-C | 201–300 | |
| VSN-D | 301–400 | |
| VSN-E | 401–500 | |
| VSN-F | 501–600 | |
| VSN-G | 601–700 | |
| VSN-H | 701–800 | |
| VSN-I | 801–900 | |
| VSN-J | 901–1000 | |

### Lalita Sahasranama Chunks
Same pattern: LSN-A through LSN-J, 100 names each.

### How to Execute a Chunk
1. Load `content/stotras/vishnu-sahasranama.json` (or lalita)
2. Extract names `number` X through Y
3. For each name, generate `analysis.mythological` and `analysis.philosophical`
4. Write the updated chunk back — edit only the names in range, do not touch others
5. Validate JSON after writing

---

## Priority Order

1. **Vishnu Sahasranama VSN-A** (names 1–100) — highest traffic, most searched
2. **Lalita Sahasranama LSN-A** (names 1–100) — Shakta cluster completion
3. Continue both in parallel: VSN-B / LSN-B, etc.

---

## Reference Sources for Analysis

### Vishnu Sahasranama
- Primary commentary: Adi Shankaracharya's Vishnu Sahasranama Bhashya
- Secondary: Paramarthanugraha of Ramanuja
- Bhagavata Purana (especially Books 1, 2, 10, 11)
- Mahabharata Anushasana Parva (origin of the Sahasranama — Bhishma to Yudhishthira)
- Vishnu Purana

### Lalita Sahasranama
- Primary: Brahmanda Purana, Lalitopakhyana section
- Commentary: Bhaskaraya's Saubhagya Bhaskara
- Tripura Rahasya
- Soundarya Lahari (Adi Shankaracharya) — for many of the same names/concepts
- Devi Mahatmyam (Markandeya Purana)

---

## BG Shlokas Status

BG Shlokas are stored in `src/data/bgShlokas.ts` (not in content/stotras/). Each shloka needs `wordMeanings`, `translation`, `commentary`, `relatedConcepts`.

| Chapter | Status |
|---------|--------|
| Ch 1 | ✅ Complete |
| Ch 2 | ⬜ Partial (key verses only) |
| Ch 3, 5–8, 10, 12–13, 15–16 | ⬜ Partial |
| Ch 4, 9, 11, 14, 17, 18 | ⬜ Not started |

BG agent task: Load the relevant chapter's partial data → fill remaining shlokas → write back to `src/data/bgShlokas.ts` or the per-chapter file. Keep chunk size to one chapter per session.
