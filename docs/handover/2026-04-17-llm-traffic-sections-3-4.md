# Hand-off: LLM traffic strategy — Sections 3 & 4

Owner: Ankit · Date: 2026-04-17 · Status: ready for delegation

Section 2 (technical foundation) has landed on `main`:

- `public/llms.txt` + `public/llms-full.txt` are generated from content via `npm run llms:generate`.
- `src/app/about/page.tsx` ships with Organization + AboutPage + BreadcrumbList JSON-LD and a linked editorial-standards section (`#editorial-standards`).
- `src/lib/seo/index.ts` exposes `buildOrganizationSchema` and `AEO_SPEAKABLE_ATTR`; the root layout now uses the shared helper so site-wide Organization signals stay in sync.
- pSEO templates (`concepts`, `deities`, `mantras`, `compare`) all emit Article + WebPage + Breadcrumb + FAQ JSON-LD and carry a `data-speakable` direct-answer paragraph.
- `scripts/check-cwv-pseo.mjs` (run via `npm run cwv:pseo`) samples CWV + INP + SEO scores per category and writes `docs/reports/cwv-pseo-YYYY-MM-DD-<strategy>.md`.

What follows are two **self-contained prompts**. Paste each one into a fresh session. They assume no memory of this work.

---

## Section 3 prompt — Mass re-optimise the 77 editorial articles

```
You are working in /Users/ankitmishra/Developer/Sadhaka on a Next.js 16 site,
opensadhaka.com, that publishes long-form editorial articles on Sanatan Dharma
philosophy and practice. There are 75+ articles registered in
`src/data/articles.ts`; each has a matching TSX page at `src/app/<slug>/page.tsx`
(or under `src/app/(editorial)/<slug>/page.tsx`).

Goal: put every editorial article through a publish-gate-grade AEO / GEO / SEO
pass so LLMs (ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews) are
more likely to cite us, and so existing search positions strengthen.

The optimisation skill is already defined:
- `.claude/skills/seo-optimize/SKILL.md` — read this first. Section 11.5
  describes the GEO Citability Score (required ≥8/10 before we call an article
  done).
- The voice skill is `~/.claude/skills/sadhaka-voice.md` v2.0 — prose edits
  must pass its five-dimension rubric.
- The publish gate is: Voice ≥35/50, AEO block PASS, Citability ≥8/10.

What to do, for each article:

1. Load the article page file and the article's entry in `src/data/articles.ts`.
2. Run the seo-optimize skill in full (meta titles/descriptions, JSON-LD
   schemas, FAQ audit, heading audit, internal links, E-E-A-T signals,
   Citability scoring).
3. Patch any gap the skill reports:
   - The opening paragraph must be a 60–100 word direct answer to the article's
     primary query. Keep it as a standalone, quotable unit. Wrap it in
     `<p data-speakable>…</p>` (or add `data-speakable` to the existing one)
     so the site-wide SpeakableSpecification selector picks it up.
   - Every claim made in the body that restates a sensational popular framing
     (e.g. a scripture "predicting" a modern scientific result) should cite a
     scoped claim file under `backend/app/knowledge/kb/claims/*.md`. If the
     claim is not yet seeded, add it to the backlog in
     `backend/app/knowledge/kb/INDEX.md` and create the claim file before
     editing the article.
   - Ensure the article has at least 3 standalone extractable passages: a
     definition block, a comparison or contrast, a numbered list, or a
     Q&A-style sub-section. Each must make sense out of context.
   - Ensure FAQPage JSON-LD is present with 4+ FAQs (hubs) or 3+ (spokes).
   - Ensure `datePublished` + `dateModified` are present in the Article
     schema and in `publishDate` / a `dateModified` field on `ArticleMeta`.
     If we're meaningfully revising the body, bump `dateModified` to today.
   - Ensure at least 2 internal links *in* to related hubs/spokes and at
     least 2 internal links *out* to related concepts or comparisons.
4. Re-score. Do not mark the article done until Citability ≥8/10, Voice
   ≥35/50, and AEO block PASSes.
5. Commit in batches of 5–8 articles with a clear message:
   `seo(aeo): re-optimize <n> articles to Citability ≥8 + AEO block PASS`.

Do NOT:
- rewrite the article wholesale — this is targeted patching, not regeneration.
- use em dashes, AI-slop phrases, or the word "Hindu" in place of "Sanatan
  Dharma" or a specific school. See `~/.claude/projects/-Users-ankitmishra-
  Developer-Sadhaka/memory/MEMORY.md` `feedback_sanatan_not_hindu.md` and
  `feedback_writing_style.md`.
- introduce invented citations. If a claim cannot be sourced, either cite an
  existing kb/claim, add a new kb/claim with primary sources, or remove the
  claim.

Working sequence:
- Start with the 10 Sprint-1 articles listed in
  `src/data/articles.ts` (hubs first: what-is-sanatan-dharma,
  vedas-upanishads-bhagavad-gita-guide; then spokes).
- After each batch, run `npm run build && npm run lint && npm run test:run`.
  Build must pass. Commit only with a green build.

Deliverable at the end of the run:
- Every article at or above the publish gate.
- `docs/reports/aeo-rerun-YYYY-MM-DD.md` summarising: starting Citability
  distribution, ending Citability distribution, articles that required kb
  claim additions, and a list of claims added to the backlog but not yet
  researched.

Begin with the Sprint-1 hubs. Report back after the first batch of 5 is
committed, then continue autonomously.
```

---

## Section 4 prompt — Scale pSEO from 190 to 2,000+ pages

```
You are working in /Users/ankitmishra/Developer/Sadhaka on opensadhaka.com
(Next.js 16, App Router, TypeScript, Tailwind). The site publishes
programmatic SEO pages driven by structured data in `src/data/*.ts`. Each
pSEO category has a shared dynamic template at
`src/app/<category>/[param]/page.tsx` or similar.

Goal: take pSEO coverage from ~190 pages to 2,000+ pages over six weeks,
with every new page emitting the same schema bundle as an editorial article
and passing the Citability ≥8/10 gate at the template level (one fix fixes
all pages in the category).

Current pSEO inventory (approximate):
| Category          | Route template                                    | Current count |
|-------------------|---------------------------------------------------|---------------|
| Concepts          | /what-is-<slug>                                   | 67            |
| Deities           | /deities/<slug>                                   | 47            |
| Mantras           | /mantras/<slug>                                   | 33            |
| Comparisons       | /compare/<slug>                                   | 58            |
| Practices         | /practices/<slug>                                 | 9             |
| Traditions        | /traditions/<slug>                                | 7             |
| Texts             | /texts/<slug>                                     | 4             |
| Greats            | /greats/<slug>                                    | 5             |
| Philosophies      | /philosophies/<slug>                              | 8             |
| Stotras           | /stotras/<slug>/                                  | 4             |
| BG chapters/shlokas | /texts/bhagavad-gita/<chapter>[/<shloka>]       | 18 ch, ~706 v |

Schema baseline (already implemented on concepts / deities / mantras /
compare): every template emits Article + WebPage + BreadcrumbList + FAQPage
JSON-LD and exposes a `<p data-speakable>` direct-answer opener. New
templates must match that bundle.

Priority expansion targets (in order):

1. **Glossary / concepts to 300.**
   Source list: `src/data/sanskritVocab.ts` has ~2,000 entries, of which
   ~67 are already concept pages. Promote 230 more high-search-volume
   Sanskrit terms to full concept pages. Work the list in descending order
   of search volume — pull volumes via DataForSEO if the MCP is connected,
   otherwise use a judgement-based ordering and note it.
2. **Comparisons to 200.**
   Current 58. Add 140 more "X vs Y" pages. Use `src/data/comparisons.ts`
   as the shape. Generation strategy: take every adjacent pair in
   philosophies, every deity/deity pair within the same tradition, every
   practice/practice pair. Seed with LLM-drafted TL;DRs and content blocks,
   then run the copy through the voice skill and Citability scorer before
   publishing.
3. **Mantras to 200.**
   Current 33. Use the `Mantra` interface in `src/data/mantras.ts`. Add
   canonical Vedic, Shaiva, Shakta, Vaishnava, and Navagraha mantras. Each
   needs Devanagari, transliteration, word-by-word etymology, shastra
   context, 4 FAQs.
4. **Deity ashtottara (108 names) pages.**
   For each of ~10 principal deities, expose the 108-name ashtottara as its
   own page at `/stotras/<deity>-ashtottara/<name-slug>`. Source data
   already exists in seeded form for Vishnu / Lalita sahasranama — extend
   the same pattern. Each name page: meaning, literary analysis,
   mythological context, philosophical analysis, related names, 3 FAQs.
5. **Festival / panchanga pages.**
   Build `/festivals/<slug>` for 50 principal festivals (Navaratri,
   Shivaratri, Diwali, Janmashtami, etc.) and `/panchang/daily/<date>` for
   generated daily panchanga (365 pages). Each needs temporally-relevant
   AEO answers and Article schema with fresh `datePublished` per day.
6. **How-to practice pages to 100.**
   Current 11. Add HowTo schema — this schema is cited aggressively by
   Google AI Overviews. Each page needs numbered steps, required materials,
   expected duration.
7. **BG shlokas complete analysis for Ch 2–18.**
   Ch 1 is done. Chapters 2–18 have ~706 verses seeded but analysis is
   partial; finish the analysis field across all of them.

Per-page non-negotiables (template-enforced):

- AEO direct-answer paragraph at top (60–100 words), wrapped in
  `<p data-speakable>`.
- Article + WebPage + BreadcrumbList + FAQPage JSON-LD (FAQ: 3+ questions
  for pSEO).
- 2+ internal links out to related hubs/concepts; 1+ hub link in via
  cross-reference on the hub page.
- Canonical URL set via `buildPageMetadata` (already wired).
- OG image where available.
- No text under 300 words — if the data object is too thin, enrich it first
  before generating the page. Thin content is an index-bloat risk.

Workflow:

1. For each category, audit the data file first. List which entries are
   complete enough to ship and which need enrichment.
2. Enrich data files in batches of 20–40 entries per session. Commit each
   batch. Do not stack multiple batches in one context (per
   `feedback_session_token_cap.md`).
3. After each data batch, run `npm run llms:generate` so llms.txt and
   llms-full.txt absorb the new entries; commit the updated public files
   in the same commit.
4. Run `npm run build && npm run lint && npm run test:run` after each batch.
5. After a category reaches its target, run
   `npm run cwv:pseo -- --strategy=mobile --limit=5` and verify the category
   still averages ≥80 performance. If performance dropped, diagnose the
   template, not individual pages.
6. After each category completes, add the hub (if new) to Header, Footer,
   Homepage DiscoverSection per `CLAUDE.md` navigation rule.

Anti-patterns to refuse:

- Publishing a page that's ≥70% templated text — it'll get flagged as
  doorway content.
- Registering a page in `articles.ts` when it's actually a pSEO entry
  (articles.ts is editorial-only).
- Skipping the kb claim workflow when making non-obvious doctrinal claims
  on pSEO pages. Even a "Who is X?" page needs sourced assertions.
- Generating content from scratch without a brief. User (content strategy
  lead) reviews positioning, audience, flow before writing — always
  present a short plan and wait for strategic input before expanding a
  category from N to N+K.

Deliverables at the end of each week:

- `docs/reports/pseo-progress-YYYY-MM-DD.md` with: pages shipped by
  category, Citability distribution, data quality notes, next-week plan.
- A running `PROJECT_MAP.md` update if the expansion adds new top-level
  routes.

Start with the glossary expansion (67 → 100 this week as a pilot) because
it has the clearest data source and the highest AEO leverage. Report back
after the first 33 concepts ship, then continue.
```

---

## Local context the two agents will need (already in memory)

- Sprint 1 hub + spoke list: `MEMORY.md` in the global memory dir.
- Voice rules, sanatan-not-hindu rule, modern-bridges rule: memory files
  linked from the same `MEMORY.md`.
- IKS kb schema: `backend/app/knowledge/kb/INDEX.md`.
- Publish gates and Citability rubric: `.claude/skills/seo-optimize/SKILL.md`.
- Navigation rule: `CLAUDE.md` "Navigation Registration (Mandatory)" section.
