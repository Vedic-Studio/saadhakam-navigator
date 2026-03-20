# Handover: Sprint 2-4 Article Production

**Date**: 2026-03-21
**Sessions completed**: 2 (Batch 1 across two sessions)

---

## Completed

### Batch 1 — Both articles done, committed, pushed to remote

1. **`how-to-start-japa`** (Spoke, Cluster 02)
   - File: `src/app/how-to-start-japa/page.tsx` (~664 lines)
   - Score: 52/60
   - Commit: `dd3c3ea7` — pushed to `main`

2. **`daily-spiritual-routine-beginners`** (Spoke, Cluster 02)
   - File: `src/app/daily-spiritual-routine-beginners/page.tsx` (~380 lines)
   - Score: 54/60
   - **NOT YET COMMITTED** — build passes, page verified in dev server, ready to commit
   - Old `(editorial)` version at `src/app/(editorial)/daily-spiritual-routine-beginners/` was deleted
   - `articles.ts` entry already updated by the draft agent (line ~2566)

### Key decisions made
- Sprint 1 direct TSX pattern is the standard (Header/Footer/Breadcrumbs), NOT the `ArticleLayout` pattern from `(editorial)` route group
- TrackedLink props: `href`, `eventLabel`, `trackPathName` (NOT `slug`/`linkId`)
- Articles go at root: `src/app/<slug>/page.tsx`, not under `(editorial)/`

---

## In Progress

**`daily-spiritual-routine-beginners` needs commit + push.** The file is written, build passes, dev server verified. Run:

```bash
git add src/app/daily-spiritual-routine-beginners/page.tsx src/data/articles.ts
git status  # verify the (editorial) deletion is staged too
git add -u  # to pick up the deletion
git commit -m "feat: add Daily Spiritual Routine for Beginners article (Sprint 2, Spoke)"
git push origin main
```

---

## Remaining — 14 articles across Batches 2-11

Full plan at: `/Users/ankitmishra/.claude/plans/swirling-wondering-candle.md`

### Batch 2 (next session) — Solo Hub
- `practical-spiritual-practices` (Hub, 2500+ words, Cluster 02)
- Finishes Sprint 2
- Run: `/write-article practical-spiritual-practices`

### Batch 3 — Solo Hub
- `bhagavad-gita-complete-guide` (Hub, Cluster 01)

### Batch 4 — Solo Hub
- `what-are-the-upanishads` (Hub, Cluster 01)

### Batch 5 — Solo Hub
- `yoga-sutras-complete-guide` (Hub, Cluster 03)

### Batch 6 — Two Spokes
- `shaivism-vs-vaishnavism` + `adi-shankaracharya-life-teachings` (Cluster 01)

### Batch 7 — Two Spokes
- `vedanta-vs-tantra` + `ramana-maharshi-who-am-i` (Clusters 03/04)

### Batch 8 — Solo Hub
- `choose-between-bhakti-jnana-karma-raja-yoga` (Cluster 08, starts Sprint 4)

### Batch 9 — Two Spokes
- `do-you-need-a-guru` + `how-to-spot-fake-spiritual-guru` (Cluster 04)

### Batch 10 — Two Spokes
- `best-spiritual-path-for-beginners` + `can-i-practice-vedanta-without-converting` (Cluster 08)

### Batch 11 — Solo Spoke
- `inquiry-vs-devotion-path` (Cluster 04/08)

---

## Context for Next Session

### Resume command
```
Commit the pending daily-spiritual-routine-beginners article (build already passes), push to main, then start Batch 2: /write-article practical-spiritual-practices
```

### Critical patterns to follow
- **Page pattern**: Sprint 1 direct TSX — `import { Header, Footer, Breadcrumbs, ContentPageTracker, TrackedLink }` with full page wrapper
- **Reference template**: `src/app/what-is-sanatan-dharma/page.tsx`
- **Most recent article**: `src/app/how-to-start-japa/page.tsx` (best example of current standard)
- **TrackedLink**: `href`, `eventLabel` (format: `"slug:location:target"`), `trackPathName`
- **Quality gates**: Score >= 42/60, zero em dashes for dramatic effect, min 3 named persons + 3 text citations (spoke), zero hardban phrases
- **articles.ts**: Must update entry for every new article
- **Build before commit**: Always `npm run build` before committing

### Gotchas discovered
1. Draft agent sometimes writes to `(editorial)/` route group — always move to root `src/app/<slug>/`
2. Draft agent sometimes uses wrong TrackedLink props (`slug`/`linkId` instead of `eventLabel`/`trackPathName`) — verify during Opus review
3. Check for duplicate articles.ts entries — draft agent may add new entry while old one still exists
4. The `(editorial)` route group uses `ArticleLayout`/`requireArticleMeta` — do NOT use this pattern for new articles

### After all 16 articles are done
- Run `npm run indexnow:submit:prod` to submit new URLs to search engines
- Update the sprint backlog status in `docs/agents/02-article-content.md`
