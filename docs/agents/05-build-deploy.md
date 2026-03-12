# Agent: Build & Deploy

**Scope**: Build hygiene, git cleanliness, Vercel deployment checks, and pre-commit validation. Does not write content.

---

## Commands

```bash
npm run dev            # local dev — http://localhost:3000
npm run build          # production build (Next.js) — ALWAYS run before committing
npm run lint           # ESLint — fix all errors before committing
npm run test           # vitest unit tests
npm run start          # serve the production build locally
```

---

## Pre-Commit Checklist

Run these in order before every commit:

```bash
# 1. Build
npm run build

# 2. Lint (no errors allowed)
npm run lint

# 3. Check git status — nothing unwanted staged
git status
```

### Files That Must NEVER Be Committed
These are in `.gitignore` — if they appear in `git status`, something is wrong:

```
.next/
node_modules/
dist/
temp_cache/
tsconfig.tsbuildinfo
*.env
.env.local
.env.production
```

If `temp_cache/` appears dirty: it means something wrote to it during dev. Run `git checkout -- temp_cache/` to discard or ensure it's in `.gitignore`.

**Current known issue**: `temp_cache/` files appear in git status as modified even though `.gitignore` includes it. Check `.gitignore` is correctly excluding `temp_cache/` — it may need `temp_cache/**` instead of `temp_cache/`.

---

## TypeScript Config

- `typescript.ignoreBuildErrors: true` in `next.config.ts` — the build succeeds with TS errors
- This does NOT mean TS errors are acceptable — fix them when found
- Run `npx tsc --noEmit` to check for type errors without building

---

## Vercel Deployment

- Auto-deploys on every push to `main` branch
- Preview deploys on every PR (any branch)
- Environment: `NEXT_PUBLIC_SITE_URL`, `INDEXNOW_KEY` must be set in Vercel dashboard
- Build command on Vercel: `npm run build`
- Output directory: `.next`

### Checking a Deployment
- Vercel dashboard: https://vercel.com/dashboard
- After deploy: verify the new page at `https://www.opensadhaka.com/<slug>`
- Check that canonical URL on the live page matches the slug

---

## next.config.ts Notes

Current config:
- `trailingSlash: false` — important: canonical URLs must NOT have trailing slash
- `typescript.ignoreBuildErrors: true` — build won't fail on TS errors
- `redirects()` — auto-generates redirects from `src/data/concepts.ts` (`/<concept>-meaning` → `/what-is-<concept>`)
- `rewrites()` — maps IndexNow key file URL to `/api/indexnow`

**Before adding a new slug**: check `redirects()` — a concept slug might already redirect FROM your new slug pattern.

---

## Branch Strategy

- `main` — production, auto-deploys to Vercel. Only merge clean, tested code.
- Feature branches: `feat/<description>` for significant additions
- Content branches: `content/<sprint-or-batch>` for bulk content additions
- Do NOT commit directly to main for large changes — use a PR

**Known issue (as of 2026-03-12)**: There has been branch mixup with AG (agentic) workflows creating merge conflicts. When using agentic workflows:
- Always branch from the latest `main`
- Do not let agent sessions push directly to `main`
- Merge manually after reviewing the diff

---

## .gitignore Maintenance

Current `.gitignore` is modified (per git status). Verify it includes:

```
.next/
node_modules/
dist/
temp_cache/
temp_cache/**
*.tsbuildinfo
.env*.local
```

If `temp_cache/` content keeps appearing as modified: add `temp_cache/**/*` to `.gitignore` or delete the directory entirely if it is not needed.

---

## vercel.json

Current `vercel.json` is modified. Check that it has:
- Correct headers (Cache-Control for static assets)
- No broken redirects (these conflict with `next.config.ts` redirects — don't duplicate)
- If both `vercel.json` redirects and `next.config.ts` redirects exist for the same path, Vercel uses `vercel.json` first

---

## Task Chunks

**Chunk BUILD-A**: Fix `.gitignore` to properly exclude `temp_cache/` and `tsconfig.tsbuildinfo`
**Chunk BUILD-B**: Run full build audit — `npm run build` + `npm run lint` + `npx tsc --noEmit` — document all errors
**Chunk BUILD-C**: Review and reconcile `vercel.json` vs `next.config.ts` redirects/rewrites for conflicts
