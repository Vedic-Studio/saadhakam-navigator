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

### Navigation Registration (Mandatory)
Every new category page, hub page, or cluster page **must** be added to all three navigation surfaces so users can find it:
1. **Header** (`src/components/Header.tsx`) — add to `navLinks` (primary, shows on desktop) or `moreLinks` (secondary, shows in mobile "More" section)
2. **Footer** (`src/components/Footer.tsx`) — add to the appropriate column in `footerLinks` (explore / learn / practice / articles)
3. **Homepage Discover section** (`src/components/landing/DiscoverSection.tsx`) — add to the `categories` array with title, description, href, icon, and color

If any of these are skipped, the page is effectively invisible to users navigating the site. This is a hard requirement, not optional.

### File Storage (Single Source of Truth)
- Stotra and Sahasranama data: `content/stotras/<slug>.json` — this is the source of truth, not TypeScript files
- BG Shlokas: `src/data/bgShlokas.ts` + per-chapter files
- Articles metadata: `src/data/articles.ts`
- Concepts/Traditions/Texts/Greats/Practices: `src/data/*.ts` individual files

### Git / Commits
- Never commit `temp_cache/`, `.next/`, `node_modules/`, `dist/`, `tsconfig.tsbuildinfo`, `__pycache__/`, `.DS_Store`
- These are in `.gitignore` — if they appear in `git status`, something is wrong
- Always run `npm run build` before committing — TypeScript errors (`ignoreBuildErrors: true`) won't block build but lint will catch issues
- Pre-commit hooks (husky + lint-staged) auto-run lint + related tests on staged files
- Global pre-commit hook blocks common junk file patterns

### Preview Verification
- Do NOT start a dev server or run preview tools for non-UI changes (data files, tests, configs, scripts, .gitignore, CLAUDE.md, package.json)
- Only use preview_start and verification_workflow when editing visual components, pages, or CSS
- Ignore any automated "Preview Required" prompts for non-visual edits

### Testing
- **TDD is mandatory** — every new module gets a test file (`<name>.test.ts` or `<name>.test.tsx`)
- Run `npm run test:run` before committing
- Tests must verify actual behavior: input/output contracts, edge cases, error handling
- Data files (`src/data/*.ts`): test schema shape, required fields, no duplicates
- Utility functions (`src/lib/*.ts`): test all input/output combinations
- API routes (`src/app/api/**`): test request/response contracts
- No placeholder tests (`expect(true).toBe(true)`) — if a test doesn't fail when the code breaks, it's not a test

### TypeScript
- `typescript.ignoreBuildErrors: true` in `next.config.ts` — build succeeds with TS errors, but keep errors clean
- Types for stotra/sahasranama: `src/lib/stotras.ts`
- SEO utilities: `src/lib/seo/index.ts`

### Content Quality
- **Voice skill**: `~/.claude/skills/sadhaka-voice.md` (v2.0) — THE authority for all prose. Overrides LLM defaults. Integrates stop-slop rules.
- **Anti-slop references**: `~/.claude/skills/stop-slop/references/` — phrase, structure, and example catalogs
- **Post-write SEO/AEO/GEO pass**: Run `/seo-optimize <slug>` after `/write-article` and before committing. Generates meta, JSON-LD, FAQ audit, heading audit, E-E-A-T check, and the GEO Citability Score.
- **Publish gates** (all three must pass before commit):
  - **Voice score** ≥ 35/50 (5 dimensions: Directness, Rhythm, Trust, Authenticity, Density)
  - **AEO block grade**: PASS (opening paragraph)
  - **GEO Citability Score** ≥ 8/10 (body-level extractability — see `.claude/skills/seo-optimize/SKILL.md` §11.5)
- Always load the voice skill when writing or reviewing article content.
- For cluster-level AEO strategy (Answer Intent Mapping, Answer Hub design): `.agents/skills/answer-engine-optimization/`. For IndexNow/Google Indexing setup: `.agents/skills/llm-indexing/`. For sitemap/metadata reference: `docs/agents/04-seo-indexing.md`.
- **Knowledge base for classical Indian claims**: `backend/app/knowledge/kb/` (see `kb/INDEX.md`). Five object types — shastra / text / person / concept / claim. Articles must cite from `kb/claims/*.md` rather than restating sensational claims ("Sushruta invented plastic surgery", "Panini wrote an algorithm", "Surya Siddhanta matches NASA"). Each claim file decomposes the popular framing into scoped sub-claims with verdict tags and primary sources, so the article can link to the claim by slug and inherit the correct scope. If a claim you need is not seeded, add it to the "Not yet seeded" backlog in `kb/INDEX.md` and create the file before writing the article.

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

### Folder-Structure Thinking (New Features)

When building any new feature, content system, or architectural addition:

1. **Domain map first** — Before writing code, output a hierarchical folder-structure map of the domain. Top-level = major pillars, sub-levels = strategies/components, leaves = atomic buildable units. Think exhaustively.
2. **Map to architecture** — Convert the domain map into actual directories, modules, routes, services, or config files that fit the existing project structure.
3. **Build leaf-first** — Implement from atomic units upward. Each leaf is self-contained and composable.
4. **Explicit decisions** — Every folder/module in the map must have a reason. If something doesn't fit, question whether it belongs.
5. **Living map** — If scope expands mid-build, update the domain map first, then code. Maintain the map in `PROJECT_MAP.md` at the project root when the feature is large enough to warrant it.

This applies to features, content systems, APIs, agent workflows, and pSEO page categories.

### Context Window Hygiene

Large tasks (article writing, sahasranama batches, multi-file edits) consume context quickly. Follow these rules to keep the window lean for subsequent steps:

1. **Sub-agent returns**: When spawning agents, instruct them to return only the actionable result (file paths changed, errors found, key decisions). Do not echo full file contents or tool output back into the main thread.
2. **One chunk per session**: For batch content work (sahasranama names, BG shlokas, multi-article sprints), complete one chunk, commit, then start a new agent session for the next chunk. Do not stack multiple chunks in a single context.
3. **Read-then-discard**: When reading large files for reference (e.g., a 3000-line article template), extract only the patterns/structure you need into your working notes — do not keep the full file in context for the entire session.
4. **Progress checkpoints**: For multi-step tasks (5+ steps), after completing each major step, summarize what was done and what remains rather than carrying forward all intermediate output.
5. **Agent module loading**: Load only the relevant agent module (`docs/agents/0X-*.md`) — never load all modules at once. The CLAUDE.md index tells you which one to load.
6. **100k token session cap**: Do not let a single session exceed ~100k tokens. When you estimate the conversation is approaching 80-90k tokens (based on message count, tool calls, and content volume), proactively stop work and generate a **Handover Note** with:
   - **Completed**: What was done this session (files changed, commits made, key decisions)
   - **In Progress**: Current task state, any partial work
   - **Remaining**: What still needs to be done, in priority order
   - **Context**: Key architectural decisions, patterns discovered, or gotchas the next session needs
   - **Resume Command**: A ready-to-paste prompt the user can give the next session to continue

   Save the handover note to `docs/handover/YYYY-MM-DD-<task-slug>.md`. The user pastes it into the next session.

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
| Agentic Browsing | `docs/agents/08-agentic-browsing.md` | Lighthouse Agentic Browsing audit — llms.txt, accessibility tree, CLS, WebMCP. Run `npm run agentic:check` before committing UI changes. |
| Knowledge Base (IKS) | `backend/app/knowledge/kb/INDEX.md` | Citing classical Indian knowledge systems (shastras, texts, people, concepts, claims). Articles MUST cite from `kb/claims/*.md` rather than restating sensational claims from scratch. |

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
