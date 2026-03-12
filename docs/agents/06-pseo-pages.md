# Agent: Programmatic SEO Pages

**Scope**: Creating and maintaining pSEO (programmatic SEO) page routes. Each pSEO category has a data file + a shared dynamic `[param]/page.tsx` component.

---

## pSEO Pattern

```
src/data/<category>.ts          ← data file (array of items)
src/app/<category>/             ← route directory
  page.tsx                      ← index/listing page
  [slug]/                       ← dynamic route
    page.tsx                    ← individual item page
```

The dynamic `[slug]` page reads its item from the data file at build time via `generateStaticParams()` (Next.js static generation).

---

## Current pSEO Routes

| Category | Data File | Route | Status |
|----------|-----------|-------|--------|
| Concepts | `src/data/concepts.ts` | `/what-is-[slug]` | ✅ Live |
| BG Shlokas | `src/data/bgShlokas.ts` | `/bhagavad-gita-chapter-[chapter]` | ✅ Live |
| Sanskrit Vocab | `src/data/sanskritVocab.ts` | `/learn/[slug]` | ✅ Live |
| Comparisons | `src/data/comparisons.ts` | `/compare/[slug]` | ✅ Live |
| Philosophies | `src/data/philosophies.ts` | `/philosophies/[slug]` | ✅ Live |
| Traditions | `src/data/traditions.ts` | `/traditions/[slug]` | ✅ Live |
| Texts | `src/data/texts.ts` | `/texts/[slug]` | ✅ Live |
| Greats | `src/data/greats.ts` | `/greats/[slug]` | ✅ Live |
| Practices | `src/data/practices.ts` | `/practices/[slug]` | ✅ Live |
| Stotras | `content/stotras/*.json` | `/stotras/[slug]` | ✅ Live |
| Topics | — | `/topics/[slug]` | ✅ Live |

---

## How to Add a New pSEO Category

1. **Create the data file**: `src/data/<category>.ts`
   - Export an array of typed objects
   - Each item must have a `slug` field (kebab-case, unique)
   - See `src/data/concepts.ts` as the canonical example

2. **Create the route directory**: `src/app/<category>/[slug]/`

3. **Create `generateStaticParams()`** in the `[slug]/page.tsx`:
   ```typescript
   export async function generateStaticParams() {
     return items.map(item => ({ slug: item.slug }));
   }
   ```

4. **Create the index page**: `src/app/<category>/page.tsx` — listing of all items

5. **Check for redirect conflicts**: the `concepts.ts` data drives auto-redirects in `next.config.ts` — a new category's slugs should not clash with `/<concept>-meaning` patterns

6. **Update sitemap**: add the new category's URLs to `src/app/sitemap.ts`

---

## Adding Items to Existing pSEO Categories

Simply add new objects to the data file. The static params generation picks them up automatically on next build.

**After adding items**:
1. Run `npm run build` to verify static params generate without error
2. Check the new pages load at their expected URLs in local dev
3. Add new URLs to IndexNow config (`scripts/indexnow-priority-config.mjs`)
4. After deploy: run `npm run indexnow:submit:prod`

---

## Data Item Schema Conventions

All pSEO items should follow this baseline:

```typescript
{
  id: string;         // same as slug, used for lookups
  slug: string;       // URL-safe, kebab-case, no special chars
  title: string;      // display title
  description: string; // 1–2 sentences, used for meta description
  // ...category-specific fields
}
```

---

## Page Component Standards

Each `[slug]/page.tsx` must have:
- `export const metadata` or `export async function generateMetadata()` for dynamic metadata
- `generateStaticParams()` for SSG
- AEO block (see `docs/agents/04-seo-indexing.md`)
- Correct canonical URL using `buildCanonicalUrl()`
- Breadcrumb JSON-LD: `Home > Category > Item`
- Internal links to related items in the same category and across categories

---

## Planned New pSEO Categories

| Category | Data Source | Priority |
|----------|-------------|----------|
| Mantras | `src/data/mantras.ts` | High — `/mantras/[slug]` |
| Deities | `src/data/deities.ts` | High — `/deities/[slug]` |
| Sacred Sites | `src/data/sacredSites.ts` | Medium — `/sacred-sites/[slug]` |
| Yoga Poses | `src/data/yogaPoses.ts` | Low |

### Task: Add Mantras pSEO

1. Create `src/data/mantras.ts` — start with 50 high-traffic mantras (Gayatri, Mahamrityunjaya, Om Namah Shivaya, etc.)
2. Schema per mantra: `{ id, slug, name, devanagari, transliteration, meaning, tradition, deity, benefits: string[], analysis: { literary, mythological, philosophical } }`
3. Create `src/app/mantras/[slug]/page.tsx`
4. Create `src/app/mantras/page.tsx` (index)
5. Update sitemap
6. Seed with content for top 20 mantras

---

## pSEO Schema Spec

Full schema spec is in `Sadhaka_pSEO_Schema_Spec.json` at project root. Refer to this when creating new pSEO data types — it was the original planning document for the programmatic content architecture.
