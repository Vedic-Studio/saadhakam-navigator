# Sadhaka — Project Intelligence

## What This Is
**opensadhaka.com** — a spiritual education platform for the Indian/Hindu philosophical tradition. Goal: become the authoritative English-language reference for Vedanta, Shaiva, Shakta, and Vaishnava philosophy, texts, and practices. SEO-first, AI-citation-first.

## Stack
- **Framework**: Next.js 16, App Router, React 19, TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Hosting**: Vercel (auto-deploy from `main` branch)
- **Analytics**: GA4 (G-S3DHYPPG9R)
- **Package manager**: npm (use `npm`, not bun or yarn)

## Dev Commands
```bash
npm run dev          # local dev server
npm run build        # production build (always run before committing)
npm run lint         # ESLint
npm run test         # vitest unit tests
npm run indexnow:submit:prod   # submit URLs to search engines after publishing
```

## Critical Conventions

### Routing
- `trailingSlash: false` — never add trailing slashes to links or canonical URLs
- Article slugs live at `/<slug>` (root level), not under any prefix
- Stotra pages: `/stotras/<stotra-slug>/` (index) and `/stotras/<stotra-slug>/<verse-slug>` (verse)
- Sahasranama: same pattern under `/stotras/<sahasranama-slug>/`
- pSEO pages: each category has `src/app/<category>/[param]/page.tsx`

### Content Registration
- **Every new article** must get an entry in `src/data/articles.ts` (id, slug, title, category, description, publishedAt, updatedAt, wordCount, readingTime)
- **Before finalising any slug**, check `next.config.ts` `redirects()` for conflicts

### File Storage (Single Source of Truth)
- Stotra and Sahasranama data: `content/stotras/<slug>.json` — this is the source of truth, not TypeScript files
- BG Shlokas: `src/data/bgShlokas.ts` + per-chapter files
- Articles metadata: `src/data/articles.ts`
- Concepts/Traditions/Texts/Greats/Practices: `src/data/*.ts` individual files

### Git / Commits
- Never commit `temp_cache/`, `.next/`, `node_modules/`, `dist/`, `tsconfig.tsbuildinfo`
- These are in `.gitignore` — if they appear in `git status`, something is wrong
- Always run `npm run build` before committing — TypeScript errors (`ignoreBuildErrors: true`) won't block build but lint will catch issues

### TypeScript
- `typescript.ignoreBuildErrors: true` in `next.config.ts` — build succeeds with TS errors, but keep errors clean
- Types for stotra/sahasranama: `src/lib/stotras.ts`
- SEO utilities: `src/lib/seo/index.ts`

### gstack Workflow Tools
- Use `/browse` for all web browsing — never use `mcp__claude-in-chrome__*` tools
- Available skills:
  - `/browse` — structured web browsing with Playwright
  - `/plan-ceo-review` — high-level business/strategy review
  - `/plan-eng-review` — technical/engineering review
  - `/review` — general code/content review
  - `/ship` — production deployment & release checklist
  - `/retro` — project retrospective & lessons learned

**Team Setup**: Run `./scripts/setup-gstack.sh` to install gstack and all linked skills locally.

---

## Agent Module Index

Each module below is a self-contained instruction set for a focused agent task. Load only the module relevant to your task.

| Module | File | When to Use |
|--------|------|-------------|
| Stotra Content | `docs/agents/01-stotra-content.md` | Adding/populating stotra JSON files, verse analysis |
| Article Content | `docs/agents/02-article-content.md` | Writing or updating editorial blog articles |
| Sahasranama Content | `docs/agents/03-sahasranama-content.md` | Populating name analysis in sahasranama JSONs |
| SEO & Indexing | `docs/agents/04-seo-indexing.md` | IndexNow submission, sitemap, metadata |
| Build & Deploy | `docs/agents/05-build-deploy.md` | Build checks, Vercel, git hygiene |
| pSEO Pages | `docs/agents/06-pseo-pages.md` | Creating programmatic SEO page routes |
| Data Schema | `docs/agents/07-data-schema.md` | Modifying data files and TypeScript types |

---

## Content Status (2026-03-12)

### Track A — Editorial Articles
- Sprint 1 (10 articles): mostly complete
- Sprints 2–4: pending — see `docs/agents/02-article-content.md`

### Track B — Stotras & Sahasranamas
- **Shiva Tandava Stotram**: 16 verses complete with full `translationFlow` + `analysis` (literary/mythological/philosophical)
- **Vishnu Sahasranama**: 1000 names seeded (meaning only, analysis pending)
- **Lalita Sahasranama**: 1000 names seeded (meaning only, analysis pending)
- BG Shlokas: Ch1 fully seeded; Ch2–18 partially seeded — see `docs/agents/03-sahasranama-content.md`
