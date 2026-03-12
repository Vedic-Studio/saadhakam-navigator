# Agent: Data Schema & TypeScript Types

**Scope**: Modifying data file structures and TypeScript type definitions. This is the ground truth layer — changes here cascade to pages, loaders, and content.

---

## Data File Map

| File | Type | Used By |
|------|------|---------|
| `src/data/articles.ts` | Article metadata registry | Sitemap, content indexes, internal linking |
| `src/data/bgShlokas.ts` | BG shloka data (all chapters) | `/bhagavad-gita-chapter-[n]` pages |
| `src/data/concepts.ts` | Vedantic/Hindu concepts | `/what-is-[slug]` pages + `next.config.ts` redirects |
| `src/data/sanskritVocab.ts` | 2000+ Sanskrit words | `/learn/[slug]` pages |
| `src/data/comparisons.ts` | Side-by-side comparisons | `/compare/[slug]` pages |
| `src/data/philosophies.ts` | Philosophy entries | `/philosophies/[slug]` pages |
| `src/data/traditions.ts` | Tradition entries | `/traditions/[slug]` pages |
| `src/data/texts.ts` | Sacred text entries | `/texts/[slug]` pages |
| `src/data/greats.ts` | Sage/teacher entries | `/greats/[slug]` pages |
| `src/data/practices.ts` | Spiritual practice entries | `/practices/[slug]` pages |
| `content/stotras/*.json` | Stotra and Sahasranama data | `/stotras/[slug]/` pages — loaded by `src/lib/stotras.ts` |

---

## Stotra/Sahasranama Types

Source: `src/lib/stotras.ts`

### Current Type Tree
```typescript
VerseAnalysis {
  literary: string
  mythological: string
  philosophical: string
}

StotraVerse {
  verse: number
  slug: string
  sanskritDevanagari: string
  transliteration: string
  wordMeanings: string
  translation: string          // literal
  translationFlow: string      // literary rendering
  analysis: VerseAnalysis
}

NameAnalysis {
  mythological: string
  philosophical: string
}

SahasranamaName {
  number: number
  name: string
  transliteration: string
  meaning: string
  slug: string
  analysis?: NameAnalysis      // optional, populated over time
}

StotraFile {
  id, title, slug, type: "stotra", author, tradition, deity,
  language, verseCount, description, verses: StotraVerse[]
}

SahasranamaFile {
  id, title, slug, type: "sahasranama", author, tradition, deity,
  language, nameCount, description, names: SahasranamaName[]
}
```

### Loader Functions (src/lib/stotras.ts)
```typescript
loadStotra(slug: string): StotraFile
loadSahasranama(slug: string): SahasranamaFile
getStotraVerseBySlug(stotra, slug): StotraVerse | undefined
getAdjacentVerses(stotra, verseNum): { prev, next }
getSahasranamaNameBySlug(sahasranama, slug): SahasranamaName | undefined
```

---

## How to Modify a Type

1. Edit the interface in `src/lib/stotras.ts` (for stotra types) or the relevant data file
2. Update all JSON files in `content/stotras/` that implement the interface
3. Update all page components that consume the type
4. Run `npx tsc --noEmit` to check for type errors
5. Run `npm run build` to confirm build passes

**Rule**: never add a required field to a type without simultaneously adding that field to ALL existing data files that implement it. Use optional (`?`) for fields being rolled out incrementally.

---

## articles.ts Entry Schema

```typescript
interface ArticleEntry {
  id: string;              // unique, same as slug
  slug: string;            // URL path segment (root level)
  title: string;           // H1 / og:title
  description: string;     // meta description, 150-160 chars
  category: "philosophy" | "practices" | "texts" | "traditions" | "travel" | "comparisons";
  type: "hub" | "spoke";
  hub?: string;            // slug of parent hub (for spokes only)
  publishedAt: string;     // ISO date "YYYY-MM-DD"
  updatedAt: string;       // ISO date "YYYY-MM-DD"
  wordCount: number;
  readingTime: number;     // Math.ceil(wordCount / 250)
  featured?: boolean;
}
```

---

## concepts.ts — Special Behavior

`src/data/concepts.ts` exports `concepts: Concept[]`. This array is imported in `next.config.ts` to auto-generate redirects:

```typescript
// next.config.ts — auto-generated for EVERY concept
{ source: `/${concept.slug}-meaning`, destination: `/what-is-${concept.slug}`, permanent: true }
```

**Consequence**: if you add a new concept with `slug: "karma"`, a redirect from `/karma-meaning` → `/what-is-karma` is automatically created. Check this won't conflict with any other existing routes.

---

## Adding a New Data Category

1. Create `src/data/<category>.ts` — define and export the type + array
2. Create `src/app/<category>/[slug]/page.tsx` — dynamic page (see `docs/agents/06-pseo-pages.md`)
3. Add to `src/app/sitemap.ts`
4. Do NOT add to `next.config.ts` redirects unless explicitly needed (concepts is the only category that auto-generates redirects)

---

## Data Migration Checklist

When changing an existing type (e.g., adding a field):

- [ ] Type updated in `src/lib/stotras.ts` or data file
- [ ] New field is `optional` if not backfilling all existing records immediately
- [ ] All JSON/TS data files updated or confirmed compatible
- [ ] Page components updated to use new field (or gracefully handle its absence)
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] Any new fields that are strings: confirm no field has empty string `""` as a placeholder — use `null` or omit the optional field instead

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| File slugs | kebab-case | `shiva-tandava-stotram` |
| Verse slugs | `verse-N` | `verse-1`, `verse-16` |
| Name slugs (sahasranama) | `name-NNN` | `name-001`, `name-1000` |
| TypeScript interfaces | PascalCase | `StotraVerse`, `VerseAnalysis` |
| Data arrays | camelCase | `concepts`, `bgShlokas` |
| JSON file names | kebab-case | `vishnu-sahasranama.json` |
