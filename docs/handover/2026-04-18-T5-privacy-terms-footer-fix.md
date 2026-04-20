# T5 — Footer link bleed fix (Phase 2, next up)

**Priority:** highest of remaining audit work — 3,410 broken internal links (~97% of the 3,522 the 13 Apr Ahrefs crawl flagged) all resolve to `/privacy` and `/terms`, two Footer targets that do not exist.
**Source of truth:** [docs/handover/2026-04-17-ahrefs-audit-broken-links-triage.md](docs/handover/2026-04-17-ahrefs-audit-broken-links-triage.md) — read the headline table first.
**Root-cause commit:** `e824ecd8` (footer redesign, 2026-03-13). Links were added, target pages never were.
**Expected Ahrefs impact on next crawl:** broken-link count ~3,522 → ~110, health score recovery of 30–40 points.

---

## Paste-ready brief

> Read `docs/handover/2026-04-18-T5-privacy-terms-footer-fix.md` and execute it end-to-end. Branch `fix/audit-T5-footer-link-bleed`, one PR titled `fix(audit T5): create privacy + terms pages (recovers 3,410 broken links)`. Before writing legal copy, skim `src/app/about/page.tsx` to match voice and metadata style. Verify with build + tests before committing.

---

## Scope (what to edit)

### New files
- `src/app/privacy/page.tsx` — Privacy Policy, static TSX, uses `buildPageMetadata` from `@/lib/seo`. Include: what data is collected (GA4 cookies, email via Faith Finder), how it's used, cookie disclosure, contact email, last-updated date.
- `src/app/terms/page.tsx` — Terms of Use, static TSX. Include: content is informational / not spiritual, medical, financial, or legal advice; no liability for outcomes of practices described; user responsibility clause; IP/copyright; contact; last-updated date.
- (Optional but recommended) `src/app/privacy/page.test.tsx` and `src/app/terms/page.test.tsx` — assert the page renders, contains the required legal headings (H1, "Last updated", contact section) and is registered in the core sitemap.

### Edits
- `src/app/sitemap/[id]/route.ts` — in the `"core"` case, add two entries:
  ```ts
  { url: `${baseUrl}/privacy`, lastModified: contentDate, changeFrequency: "yearly", priority: 0.3 },
  { url: `${baseUrl}/terms`,   lastModified: contentDate, changeFrequency: "yearly", priority: 0.3 },
  ```
  Then extend `src/app/sitemap/[id]/route.test.ts` with a test asserting both URLs appear in the `core` sitemap.

### Must not touch
- Anything under `src/app/sanatan-history/**`, `src/lib/seo/**` (Phase 1 just shipped — leave it cooling).
- Other uncommitted work on main: `src/app/(concepts)/[slug]/page.tsx`, `src/app/compare/[slug]/page.tsx`, `src/components/Footer.tsx`, `src/components/Header.tsx`, `src/data/articles.ts`, `package.json`, `public/llms*.txt`, `scripts/generate-llms-txt.mjs`, `src/app/about/` — these belong to the in-flight E-E-A-T / LLMs.txt track and will conflict if touched.

## Content guidance

The site is a spiritual-education resource. It does not:
- Sell products or take payments
- Make medical, legal, or financial claims
- Process sensitive personal data beyond email (Faith Finder quiz capture) + cookie-level analytics (GA4)

Keep both pages terse (600–1,000 words each). Match the tone of the existing `src/app/about/page.tsx` — plainspoken, not templated. Cite GA4 explicitly. Reference [this editorial standards anchor](src/app/about/page.tsx) as `#editorial-standards` in Privacy's "Third parties" section if that anchor exists.

**If you need legal precision beyond what a reasonable informational site requires** (e.g., you're about to add payments, EU operations, or health claims), stop and flag it — don't improvise legal boilerplate beyond the site's actual footprint.

## Acceptance criteria

1. `curl -sSI https://<preview>/privacy` returns 200. Same for `/terms`. (Or, locally: `npm run build && npm start`, then `curl`.)
2. `src/app/sitemap/[id]/route.test.ts` has a new assertion for both URLs in the `core` sitemap and passes.
3. Page metadata: canonical self-referential, title contains "| Sadhaka" exactly once (verify via `getStaticProps`-style rendering or the existing `buildPageMetadata` helper — same pattern as `src/app/about/page.tsx`).
4. `npm run build && npm run test:run && npm run lint` all green.
5. Commit message names the metric: `fix(audit T5): create privacy + terms pages (recovers 3,410 broken links)`.

## After merge

- Submit the two new URLs via `npm run indexnow:submit:prod` so Google picks them up immediately. Don't wait for the next weekly crawl.
- Open a follow-up for **Bucket B** (`/learn` hub + `/spiritual-practice-sequence`, 75 links) and **Bucket C** (9 missing tradition slugs + 14 mantra slugs, ~35 links). Both are described in the T4 triage doc.

## Context the next session won't otherwise have

- Phase 1 shipped 2026-04-18 via PR #10, merged commit `05f09bcb`. Includes T1 canonical+title, T2 Place schema, T3 sitemap — all verified green.
- The parallel `fix/audit-T9-isr-static-generation` branch is open and held by a different session. Don't rebase on it; branch from `main`.
- The remaining Phase 2 tracks (T6 meta descriptions, T7 OG tags, T8 IndexNow) are described in [docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md](docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md). T5 is gating nothing but itself — pick whichever next after this lands.
