# Ahrefs Audit Remediation — Multi-Agent Workplan

**Source data:** `Ahfrens Audit/` (CSV exports, 13 Apr 2026)
**Diagnostic memo:** `Work/# Opensadhaka — Full SEO Audit Analysis.md` (Obsidian)
**Health score trajectory:** 95% → 94% → **34%** (23 Mar → 6 Apr → 13 Apr)
**Root incident:** A deployment between 6–13 Apr introduced ~3,000 broken internal links, rewrote canonical tags on 67 pages, and created a title-duplication bug. This is a single event, not gradual decay.

---

## How to run this plan

Each **Track** below is a self-contained brief. Paste the entire track into a fresh Claude Code session — it has all the context, file scope, and acceptance criteria needed to execute cold.

**Parallelism rules:**
- Tracks in the **same phase** touch disjoint files → run in parallel on separate branches.
- Tracks in a **later phase** must wait for named predecessors to merge.
- Each track lists `MUST NOT TOUCH` files to prevent collisions.

**Branch convention:** `fix/audit-T{n}-{slug}` (e.g., `fix/audit-T1-canonical-regression`). Each track = one PR into `main`.

**Before any track starts:** `git checkout main && git pull` — the plan assumes main is clean.

---

# PHASE 1 — STOP THE BLEEDING (parallel, ~1 day)

Four tracks run simultaneously. All are scoped to disjoint files. Goal: recover health score from 34% to 80%+.

## Track T1 — Canonical regression + title-dedup bug

**Why this matters:** 68 pages flagged "indexable → non-indexable" are NOT noindex'd — their canonical was rewritten to point away. Sample from [opensadhaka_13-apr-2026_indexable-page-became_2026-04-17_21-02-02.csv](Ahfrens%20Audit/opensadhaka_13-apr-2026_indexable-page-became_2026-04-17_21-02-02.csv):

```
URL:            /learn/sanskrit/seva
Canonical now:  /what-is-seva         ← points away
Canonical prev: /learn/sanskrit/seva  ← self-canonical
Is noindex:     false
```

Same 67-page cohort appears in "canonical URL changed" + "non-canonical in sitemap" CSVs. Single regression, triple symptom.

Separately, titles show double brand suffix: `"Seva in Sanskrit: ... | Sadhaka | Sadhaka"` — a template bug that also explains most "title too long" entries.

**Scope (may edit):**
- `src/lib/seo/index.ts`
- `src/app/learn/sanskrit/[word]/page.tsx`
- `src/app/layout.tsx` (only if title suffix logic lives here)
- Any shared metadata helper that stamps `canonical` or title suffix

**MUST NOT TOUCH:**
- `src/app/sanatan-history/**` (T2's scope)
- `src/app/sitemap*` (T3's scope)
- Any data file under `src/data/**`

**Steps:**
1. `git log --since="2026-04-05" --until="2026-04-14" -- src/lib/seo/ src/app/learn/` — find the commit that broke canonical.
2. Open `src/lib/seo/index.ts` — locate canonical/title generation. Identify:
   - Why `/learn/sanskrit/seva` emits canonical `/what-is-seva` (likely a map/redirect intended for migration leaked into canonical logic).
   - Why the title suffix concatenates `| Sadhaka` twice (likely page-level template already appends it + layout appends again).
3. Fix both. Canonical should be self-referential for leaf pages. Title suffix should append exactly once.
4. Add a Vitest spec: `src/lib/seo/index.test.ts` — verify `getCanonical('/learn/sanskrit/seva') === 'https://www.opensadhaka.com/learn/sanskrit/seva'` and title has exactly one ` | Sadhaka`.
5. `npm run build && npm run lint && npm run test:run` — all must pass.

**Acceptance:**
- All 68 URLs in the indexable-became-nonindexable CSV produce self-canonical tags.
- No page title in the build output contains `| Sadhaka | Sadhaka`.
- Test file exists and fails if either bug regresses.

**Resume prompt (paste into fresh session):**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T1 and execute it end-to-end. Branch `fix/audit-T1-canonical-regression`. Open a PR when done with a summary of root cause found in the git log.

---

## Track T2 — Place schema validation errors

**Why this matters:** 15 archaeological site pages fail Google rich-results validation. All use `BreadcrumbList + Organization + Place + WebSite`. The `Place` schema is missing required fields. See [opensadhaka_13-apr-2026_structured-data-has-s_2026-04-17_21-19-30.csv](Ahfrens%20Audit/opensadhaka_13-apr-2026_structured-data-has-s_2026-04-17_21-19-30.csv).

Affected URLs: Mehrgarh, Bhimbetka, Rakhigarhi, Karahan Tepe, Kalibangan, Mohenjo-daro, Gulf of Cambay, Sinauli, Hastinapura, Harappa, Lothal, Ayodhya, Göbekli Tepe, Dholavira, Underwater Dwarka.

**Scope (may edit):**
- `src/app/sanatan-history/sites/[slug]/page.tsx`
- `src/data/` — the sites data file (find it via `grep -r "mehrgarh" src/data/`)

**MUST NOT TOUCH:**
- `src/lib/seo/**` (T1's scope)
- `src/app/sitemap*` (T3's scope)
- Any other `src/app/sanatan-history/**` subroute

**Steps:**
1. Find the sites data file and the slug page component.
2. Extend each site entry with `geo: { latitude, longitude }` and `address: { addressLocality, addressCountry }`. Research the 15 coordinates from Wikipedia (one-time manual lookup, or ask the user to confirm batch).
3. Update the `Place` JSON-LD to emit `geo` and `address` when present.
4. Validate one URL via https://validator.schema.org/ or https://search.google.com/test/rich-results — include a screenshot/paste of the passing result in the PR description.
5. Add a test asserting every site in the data file has `geo` and `address`.

**Acceptance:**
- All 15 URLs pass schema.org validation.
- Data-file test enforces `geo`/`address` presence going forward.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T2 and execute it. Branch `fix/audit-T2-place-schema`. Before writing coordinates for all 15 sites, show me the batch and get confirmation.

---

## Track T3 — Sitemap index + stale redirect cleanup

**Why this matters:** 1,676 indexable pages absent from the crawler-visible sitemap. Evidence from [opensadhaka_13-apr-2026_indexable-page-not-in_2026-04-17_21-15-23.csv](Ahfrens%20Audit/opensadhaka_13-apr-2026_indexable-page-not-in_2026-04-17_21-15-23.csv): URLs *are* listed in child sitemaps (`sitemap/jyotish.xml`, `sitemap/practices.xml`, etc.) but Ahrefs flags them as "Is in sitemap: false". Likely cause: the sitemap *index* at `src/app/sitemap.xml/route.ts` isn't enumerating all children, OR child sitemap IDs aren't being served.

Separately: `/jyotish/today` (308 → `/panchang`) is in the jyotish sitemap. Google wastes crawl budget on redirected URLs in sitemaps.

**Scope (may edit):**
- `src/app/sitemap.xml/route.ts`
- `src/app/sitemap/[id]/route.ts`
- Any helper/data file the above two depend on

**MUST NOT TOUCH:**
- `src/lib/seo/**` (T1's scope)
- `src/app/sanatan-history/**` (T2's scope)

**Steps:**
1. Read the two sitemap routes. List every child ID the index emits vs. every child ID the dynamic route actually serves. Reconcile any gap.
2. Confirm the sitemap index is discoverable at `https://www.opensadhaka.com/sitemap.xml` and includes every child sitemap reported in the "Referenced in sitemaps" column of the CSV.
3. Exclude `/jyotish/today` from the jyotish sitemap (it's a server redirect, not a canonical URL). If the list is data-driven, add a filter skipping URLs that return 3xx.
4. Add a test: for each sitemap ID the dynamic route supports, assert it is referenced in the index.
5. After merge, run `npm run indexnow:submit:prod` to re-announce the corrected sitemap.

**Acceptance:**
- `curl https://www.opensadhaka.com/sitemap.xml` returns every child sitemap.
- `/jyotish/today` absent from all sitemaps.
- Test locks the index/child parity.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T3 and execute it. Branch `fix/audit-T3-sitemap-integrity`. Do not touch seo helpers or schema code — those are other tracks.

---

## Track T4 — Broken-link forensic (read-only investigation + triage)

**Why this matters:** Between 6 Apr and 13 Apr, pages with broken links went from 96 → 1,638 and total broken links from ~200 → 3,387. This is a single deployment event. Identifying *which commit* matters because the fix may be "revert the slug-generation change" rather than "patch 3,000 links by hand".

This track is **read-only forensic** — no code changes. Output is a triage report that later tracks (Phase 2) will act on.

**Scope (may edit):**
- `docs/handover/2026-04-17-ahrefs-audit-broken-links-triage.md` (new file, the deliverable)

**MUST NOT TOUCH:** any source code.

**Steps:**
1. `git log --since="2026-04-05" --until="2026-04-14" --stat` — list every commit in the window.
2. Parse [opensadhaka_13-apr-2026_links-target-4xx_2026-04-17_20-58-19.csv](Ahfrens%20Audit/opensadhaka_13-apr-2026_links-target-4xx_2026-04-17_20-58-19.csv). Group broken targets by URL prefix (`/texts/bhagavad-gita/*`, `/stotras/lalita-sahasranama/*`, `/learn/sanskrit/*`, etc.). Count per bucket.
3. For the top 3 buckets, sample 10 broken targets each. Check:
   - Does the target URL *ever* exist in the codebase (grep the slug)?
   - Is there a close slug that *does* exist? (likely rename/transliteration change)
4. Cross-reference the top bucket against commits in step 1. Identify the commit that introduced the pattern.
5. Write `docs/handover/2026-04-17-ahrefs-audit-broken-links-triage.md` with:
   - Summary: "N commits in window, M likely responsible"
   - Per-bucket table: bucket → count → likely cause → recommended fix (bulk rewrite / revert / generate missing pages)
   - Top 20 source URLs (high-PR pages that are leaking link equity to 404s)
   - Suggested Phase 2 tasks split into (a) bulk script-fixable, (b) requires new pages, (c) genuinely stale links to remove

**Acceptance:**
- Triage report exists and is concrete enough that a Phase 2 agent can act on any single bucket without re-reading the CSV.
- Root-cause commit (or "no single commit found") is named.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T4 and produce the triage report at the path specified. Branch `fix/audit-T4-broken-links-triage`. Do not modify any source code — output is the report only.

---

# PHASE 2 — SCALE THE WINS (parallel, starts after Phase 1 merges)

All Phase 2 tracks depend on Phase 1 merging cleanly to main. Within Phase 2, tracks are scoped to disjoint file sets and may run in parallel.

## Track T5 — Broken-link remediation (reads T4 output)

**Depends on:** T4 merged (triage report) + T1 merged (seo lib stable)

**Scope (may edit):** whichever page templates or data files T4 identifies as the bug source. Likely candidates:
- `src/data/bgShlokas.ts` + per-chapter files
- `content/stotras/*.json`
- `src/data/articles.ts`
- Article MD/TSX files under `src/app/[slug]/page.tsx`

**MUST NOT TOUCH:** `src/lib/seo/**`, sitemap routes.

**Steps:**
1. Read the triage report from T4.
2. For each "bulk script-fixable" bucket: write a Node script under `scripts/fix-broken-links-{bucket}.mjs` that reads the 4xx CSV, filters to the bucket, and applies the fix (slug rewrite, remove, redirect).
3. For "requires new pages": open a follow-up issue, do not attempt in this track.
4. For "genuinely stale": bulk-remove or convert to plain text.
5. Run the scripts. Commit the output. Verify by re-running internal link check or at least a spot-check of 20 previously-broken URLs.

**Acceptance:** broken-link count drops to <200 (pre-incident baseline) on next Ahrefs crawl. Verify by `npm run build` succeeding and a sampled URL check.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T5 and `docs/handover/2026-04-17-ahrefs-audit-broken-links-triage.md`. Execute T5. Branch `fix/audit-T5-broken-links-remediation`.

---

## Track T6 — Meta description bulk rewrite

**Depends on:** T1 merged.

**Why:** 1,122 too-short + 920 too-long = **2,042 pages** (81% of site) with broken meta. Pattern suggests a template auto-generating from first sentence OR from empty fallback.

**Scope (may edit):**
- The metadata helper in `src/lib/seo/index.ts` (if a template issue — only after checking with T1's PR)
- `src/data/**` — per-page descriptions where they're data-driven
- Page templates under `src/app/**` where descriptions are hard-coded

**MUST NOT TOUCH:** sitemap routes, schema JSON-LD emitters.

**Steps:**
1. Parse the two meta-description CSVs. Classify each URL by route pattern (BG shloka, Lalita verse, Sanskrit word, article, etc.).
2. For each route pattern, decide: is the description data-driven or template-generated?
3. For template cases: fix the template to produce 140–155 char descriptions from available fields (title + first H2 summary).
4. For data cases: generate descriptions in batches of 100 via Claude Haiku using a prompt like `"Write a 150-character meta description for a page titled '[title]' about '[summary]'. No quotes. No trailing period unless it completes a sentence."`. Write back to the data file. Run `npm run build` between batches to catch template errors early.
5. Add a test: every page in the sitemap emits a description 120–160 chars long.

**Acceptance:** Ahrefs meta-too-short + too-long counts drop below 100 combined. Test locks the invariant.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T6 and execute. Branch `fix/audit-T6-meta-descriptions`. Before bulk-generating 2,042 descriptions, show me the classification and get confirmation on the per-bucket approach.

---

## Track T7 — OG tag templating

**Depends on:** T1 merged.

**Why:** 2,368 pages have incomplete OG tags + 1,875 have OG URL ≠ canonical. Flat since 23 Mar (ignored for 3+ weeks).

**Scope (may edit):**
- Metadata helper in `src/lib/seo/index.ts` (coordinate with T1 author if still in flight)
- `src/app/layout.tsx` (root OG defaults only)
- `public/og/` (default images per content type)

**MUST NOT TOUCH:** data files, sitemap routes, schema JSON-LD.

**Steps:**
1. Inventory: `og:title`, `og:description`, `og:url`, `og:image`, `og:type`, `og:site_name` — which are missing per page type?
2. Build category-default OG images: one per content type (BG, Lalita, Shiva, Sanskrit, Article, History, Panchang). Can use an existing brand asset or generate via the `seo-image-gen` skill.
3. Update the metadata helper so `og:url = canonical` always, `og:image` falls back to category default, and `og:title`/`og:description` inherit from page metadata.
4. Test: 10 sampled pages emit all 6 OG tags with `og:url === canonical`.

**Acceptance:** OG-incomplete count drops to <100. OG-URL-mismatch count drops to 0.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T7 and execute. Branch `fix/audit-T7-og-tags`. If T1 is still open, wait for it to merge before editing `src/lib/seo/index.ts`.

---

## Track T8 — IndexNow batch resubmission

**Depends on:** T3 merged (sitemap clean) + T5 merged (broken links fixed).

**Scope (may edit):** `scripts/indexnow-*.mjs`, run logs under `.data/` if applicable.

**Steps:**
1. Parse [opensadhaka_13-apr-2026_pages-to-submit-to-in_2026-04-17_21-16-49.csv](Ahfrens%20Audit/opensadhaka_13-apr-2026_pages-to-submit-to-in_2026-04-17_21-16-49.csv).
2. Filter out any URL that's still broken (cross-reference with current state after T5).
3. Batch to 100/request, submit via `npm run indexnow:submit:prod`, log responses.
4. Same for Google Indexing API via `.data/google-service-account.json`.

**Acceptance:** IndexNow pending count drops below 500 in next crawl (baseline was 1,639).

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T8 and execute. Branch `fix/audit-T8-indexnow-resubmit`. Confirm T3 and T5 are merged first.

---

# PHASE 3 — STRUCTURAL (parallel, starts after Phase 2)

These are the long-term SEO levers. Can start after Phase 2 stabilizes.

## Track T9 — ISR for dynamic SSR routes

**Why:** TTFB 4,500–6,500ms on BG shlokas, Lalita verses, stotras (from [slow-page CSV](Ahfrens%20Audit/opensadhaka_13-apr-2026_slow-page_2026-04-17_21-12-11.csv)). Panchang at 1,074ms TTFB with PR 34 is prime ISR candidate.

**Scope (may edit):** `src/app/panchang/page.tsx`, BG/Lalita/Shiva route handlers, Next config if needed.

**Steps:**
1. Add `export const revalidate = 86400` (24h) to leaf pages that don't depend on per-request data.
2. Panchang: `revalidate = 3600` (1h is plenty; it's a daily page).
3. Verify TTFB drops below 500ms on deployed Vercel.
4. Measure with `scripts/check-cwv-pseo.mjs` before/after.

**Acceptance:** no page in slow-page CSV exceeds 1,500ms TTFB after deploy.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T9 and execute. Branch `fix/audit-T9-isr-static-generation`.

---

## Track T10 — Internal linking cascade (the big one)

**Why:** 1,839 pages (73% of site) have only 1 dofollow internal link. 31 orphans. Hub pages at PR 34-40 not passing equity downstream. This is the single biggest SEO lever.

**Scope (may edit):** hub page templates (Articles, BG index, Lalita index, Shiva index, Panchang), plus a new cross-concept link module.

**Steps:**
1. **Layer 1 — Hub → leaf cascade.** Every BG chapter page links to all its shlokas. Every stotra index links to all its verses. One edit per hub template.
2. **Layer 2 — Cross-concept links.** Build `src/lib/internal-links/map.ts` — a function `relatedLinks(pageSlug, topic, concepts)` that returns 3-5 internal links. Seed from `src/data/concepts.ts`, `src/data/sanskritVocab.ts`. Render at bottom of every leaf page.
3. **Layer 3 — Panchang daily engine.** Every day's Panchang page picks 3-5 deep links based on that day's tithi/nakshatra/deity. Pure data-driven lookup.
4. **Orphans (31).** For each orphan URL in [opensadhaka_13-apr-2026_orphan-page-(has-no-i_2026-04-17_21-04-29.csv](Ahfrens%20Audit/opensadhaka_13-apr-2026_orphan-page-%28has-no-i_2026-04-17_21-04-29.csv), identify the nearest hub and add a contextual link.

**Acceptance:** Median dofollow inlinks per leaf page ≥ 5 in next Ahrefs crawl. Orphan count = 0.

**Resume prompt:**
> Read `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` §T10. This track is large — before editing, produce a plan-ceo-review document proposing the linking strategy and get user approval.

---

# Orchestration summary

| Phase | Tracks | Run order | Target recovery |
|---|---|---|---|
| 1 | T1, T2, T3, T4 | All parallel | Health score 34% → 80%+ |
| 2 | T5, T6, T7, T8 | After Phase 1; T5/T6/T7 parallel, T8 after T5+T3 | Health score → 90%+ |
| 3 | T9, T10 | After Phase 2; parallel | Rankings + TTFB |

**Coordination:**
- Run `git log --oneline main` daily during Phase 1/2 to confirm no divergence.
- Each PR lists the track ID in its title: `fix(audit T1): canonical + title-dedup regression`.
- When a track merges, cross it off this file in a follow-up commit so the plan stays live.

---

# Appendix — Data sources

All audit data lives in `Ahfrens Audit/` (repo root, gitignored or to be gitignored — do not commit these CSVs):

| File | Use in |
|---|---|
| `Priority-Task-Impact.csv` | Overall priority view |
| `Issue-23Mar-6Apr-13Apr-Signal.csv` | Trend signal (what got worse) |
| `Metric-23Mar-6Apr-13Apr-Trend.csv` | Health score timeline |
| `opensadhaka_13-apr-2026_indexable-page-became_*.csv` | T1 — 68 canonical-regression URLs |
| `opensadhaka_13-apr-2026_canonical-url-changed_*.csv` | T1 — same 67-page cohort |
| `opensadhaka_13-apr-2026_non-canonical-page-in_*.csv` | T1/T3 — same cohort, sitemap angle |
| `opensadhaka_13-apr-2026_title-too-long_*.csv` | T1 — title-dedup evidence |
| `opensadhaka_13-apr-2026_links-target-4xx_*.csv` | T4/T5 — 3,387 broken links |
| `opensadhaka_13-apr-2026_page-has-links-to-bro_*.csv` | T4/T5 — source-side view |
| `opensadhaka_13-apr-2026_page-has-links-to-red_*.csv` | T5 — redirect chain cleanup |
| `opensadhaka_13-apr-2026_indexable-page-not-in_*.csv` | T3 — 1,676 missing-from-sitemap |
| `opensadhaka_13-apr-2026_3xx-redirect-in-sitem_*.csv` | T3 — /jyotish/today stale entry |
| `opensadhaka_13-apr-2026_404-page_*.csv` | T3 — 4xx-in-sitemap cleanup |
| `opensadhaka_13-apr-2026_meta-description-too_*.csv` (x2) | T6 |
| `opensadhaka_13-apr-2026_open-graph-tags-incom_*.csv` | T7 |
| `opensadhaka_13-apr-2026_open-graph-url-not-ma_*.csv` | T7 |
| `opensadhaka_13-apr-2026_slow-page_*.csv` | T9 |
| `opensadhaka_13-apr-2026_structured-data-has-s_*.csv` (x2) | T2 |
| `opensadhaka_13-apr-2026_orphan-page-*.csv` | T10 |
| `opensadhaka_13-apr-2026_page-has-only-one-dof_*.csv` | T10 |
| `opensadhaka_13-apr-2026_pages-to-submit-to-in_*.csv` | T8 |
