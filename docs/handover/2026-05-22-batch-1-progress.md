# Batch 1 Progress — Article mentions + wordCount backfill

**Date**: 2026-05-22
**Branch**: `claude/amazing-meitner-40ec5c` (rebased onto PR #35's branch `claude/objective-meninsky-9fdf41`)
**Commit**: `32b6e892` — data(seo): populate mentions + wordCount for batch 1

## Completed

10 Sprint 1 articles populated with `wordCount` + `mentions`:

| # | Slug | Mentions | wordCount |
|---|---|---:|---:|
| 1 | what-is-sanatan-dharma | 7 | 2200 |
| 2 | how-karma-dharma-work | 6 | 1800 |
| 3 | vedas-upanishads-bhagavad-gita-guide | 7 | 2600 |
| 4 | what-is-maya | 7 | 1500 |
| 5 | midlife-crisis-spiritual-meaning | 7 | 2000 |
| 6 | fear-of-death-advaita-vedanta | 8 | 1800 |
| 7 | dark-night-of-the-soul | 8 | 2000 |
| 8 | spiritual-antidote-to-hustle-culture | 7 | 1800 |
| 9 | advaita-vedanta-explained | 8 | 2200 |
| 10 | advaita-vs-dvaita | 8 | 2600 |

**Unique entities used**: 39 (de-duplicated). Wikipedia URLs all return 200 OK.

## Quality gates (all passed)

- `npm run test:run -- src/lib/seo` → 79/79 pass (mention emission tests exercised)
- All 39 Wikipedia `sameAs` URLs curl-verified 200 OK
- All internal `url:` paths cross-checked against concepts.ts, philosophies.ts,
  texts.ts, deities.ts, articles.ts slug catalogs
- `npm run lint` → only the 7 pre-existing errors from variant landing pages
  and PlanetOrbit; **no new errors** on articles.ts
- Each article has 3–8 mentions, each entity verified named in the article body

## Branch state

This worktree was originally based on `main` (which doesn't yet have PR #35's
`ArticleMention` + `wordCount` infrastructure). I rebased onto
`claude/objective-meninsky-9fdf41` (PR #35) so the data could land on top of
the schema. The branch is now:

```
32b6e892 data(seo): populate mentions + wordCount for batch 1   ← this session
52f54830 fix(seo): rewrite homepage title and meta for brand-term CTR
191ee941 docs(handover): article mentions + wordCount backfill plan   ← from PR #35
cebc533e feat(seo): cross-link Article schemas to sitewide entity nodes   ← from PR #35
... (main lineage)
```

Once PR #35 merges, this branch needs `git rebase main` before PR; the
batch-1 commit will then sit directly on top of main.

## Remaining

Batches 2–6 from `docs/handover/2026-05-22-article-mentions-backfill.md`:

- **Batch 2** — Sacred texts pillar (10 articles)
- **Batch 3** — Ancient wisdom pillar / Vedanta + bridges (15 articles)
- **Batch 4** — Practical practices pillar (14 articles)
- **Batch 5** — Traditions, places, teachers (13 articles)
- **Batch 6** — India travel + sacred sites + meta (13 articles)

Total remaining: ~65 articles across 5 sessions. Per the 100k token cap rule,
don't bundle batches in a single session.

## Resume prompt for batch 2

Paste this in a fresh session:

```
I'm continuing the article mentions + wordCount backfill from PR #35.

Read docs/handover/2026-05-22-article-mentions-backfill.md first — it has the
schema contract, type values, URL conventions, and quality criteria.

Work on Batch 2 (sacred texts pillar):
  bhagavad-gita-complete-guide, bhagavad-gita-chapter-1, bhagavad-gita-chapter-2,
  what-are-the-upanishads, vedas-vs-upanishads-explained,
  how-to-read-upanishads-western-beginner,
  best-bhagavad-gita-translation-for-beginners, yoga-sutras-complete-guide,
  ramayana-explained, bhagavad-gita-vs-bible

The branch is already rebased onto PR #35. Add wordCount + mentions to each
article entry in src/data/articles.ts (after featuredImage, or after faqs if
no featuredImage — see advaita-vs-dvaita for the no-image pattern).

Reuse the entity catalog established in batch 1 where it overlaps (Bhagavad
Gita, Upanishads, Vedas, Adi Shankaracharya, Krishna, etc. all have verified
Wikipedia URLs and internal urls). Run `npm run test:run -- src/lib/seo` and
`npm run lint` before committing.

Commit message: `data(seo): populate mentions + wordCount for batch 2`
```

## Known gotchas for next sessions

1. **Some articles have no `featuredImage`** (e.g. advaita-vs-dvaita). For
   those, insert wordCount + mentions immediately after the closing `]` of
   the `faqs` array, before the entry's closing `},`.

2. **`/philosophies/advaita-vedanta` redirects to `/philosophies/advaita`** —
   use the latter (the data-driven canonical) in `url:` fields.

3. **No `/texts/vedas` route** — for the Vedas as an entity, use Wikipedia
   `sameAs` only (no internal `url`). Same for Mahabharata, Rigveda,
   Vivekachudamani, Brahma Sutras, Manusmriti, Katha Upanishad.

4. **Atman Wikipedia title**: use the ASCII form
   `https://en.wikipedia.org/wiki/Atman_(Hinduism)` — it resolves directly
   (not just via redirect), and avoids JSON-LD encoding ambiguity with the
   macron form.

5. **KB cross-reference for batch 2**: `backend/app/knowledge/kb/texts/`
   has files for `principal-upanishads`, `rigveda`, `atharvaveda`,
   `yoga-sutras`, `brahma-sutras`. Read those before writing batch 2's
   `mentions` to make sure framing matches Sadhaka's editorial line. KB
   files don't have public URLs yet — don't set `url:` to a kb path.
