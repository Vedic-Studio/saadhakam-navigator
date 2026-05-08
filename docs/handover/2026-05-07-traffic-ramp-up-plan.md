# Handover: Sadhaka Traffic Ramp-Up Plan

**Date:** 2026-05-07 · **Owner:** Ankit · **Status:** Plan saved, pre-execution

## What this session produced

Audited the current state of opensadhaka.com from SEO/AEO/GEO standpoint and created a 12-week ramp-up plan: [RAMP_UP_PLAN.md](../../RAMP_UP_PLAN.md).

The plan addresses the user's stated symptoms:
1. Traffic is minuscule despite registering across Google, DuckDuckGo, Yahoo, and ChatGPT referrals
2. High SERP impressions, very low CTR
3. Need to rank #1 for "sanatana", "sadhaka" and the canonical Vedanta / spiritual query set

## Critical findings (act on these first)

1. ~~**GSC service-account project (`#575787169950`) deleted by Google.**~~ ✅ **RESOLVED 2026-05-07.** Ramp-up Phase 0.1 done. New project `sadhaka-seo` created. Service-account path was abandoned (Google's GSC user-add UI rejected the new SA email even with valid IAM auth — known propagation issue with brand-new service accounts). Switched to **gcloud Application Default Credentials (user OAuth)** instead. Setup recorded below.
2. **/llms-full.txt returns HTTP 500.** Robots.txt advertises this URL — every AI crawler following the pointer hits an error. Production defect.
3. **/about has zero named editor / Person schema / founding date / stats.** This kills LLM entity disambiguation for "who is opensadhaka.com".
4. **Zero Wikipedia or Reddit footprint.** Confirmed via WebSearch. Wikipedia is the #1 LLM training corpus signal; Reddit drives 46.7% of Perplexity citations.
5. **38 of 77 editorial articles still missing AEO direct-answer blocks** (carryover from `2026-04-11-seo-optimization-phase1.md` §1G).
6. **2,368 pages with incomplete OG tags** (T7 carryover from Ahrefs remediation).
7. **31 orphan pages + 1,839 pages (73%) with only 1 dofollow inlink** (T10 Wave B carryover).

## What's already shipped (don't re-do)

- T1 (canonical regression), T2 (Place schema), T3 (sitemap integrity), T5 (privacy/terms), T6 (meta description length), T9 (ISR), T10 Wave A (hub→leaf cascade) — all merged
- ~1,175 pages with full schema bundles (Article + WebPage + Breadcrumb + FAQ)
- LLM Section 2: /llms.txt generation, /about schema, pSEO speakable
- AEO answer blocks added to 39 of 77 articles
- Schema builders consolidated in `src/lib/seo/index.ts`

## Architecture of the plan

**Phase 0 (Days 0–5):** Emergency + measurement restoration. GSC rebuild, llms-full.txt fix, llms.txt expansion to stotras + pSEO, Bing Webmaster setup, weekly snapshot script.

**Phase 1 (Weeks 1–3):** CTR + entity anchoring. Named editor + Person schema on /about, top-50 title/description rewrite via power-word templates, HowTo schema rollout, OG tag templating (T7), AEO blocks for the remaining 38 articles, internal linking cascade (T10 Wave B), IndexNow mass resubmit (T8).

**Phase 2 (Weeks 4–8):** Brand mention flywheel + content depth. Wikipedia editor reputation + 8 target paragraph edits, Reddit answer campaign (10/month), mass re-optimize 77 articles to GEO Citability ≥8/10, BG Ch 2–18 shloka analysis, podcast + press outreach, backlink outreach.

**Phase 3 (Weeks 9–12):** pSEO scaling 190→2,000+ + multi-modal launch. Sanskrit glossary 67→250, comparisons 58→200, mantras 33→150, deity ashtottara × 10 (1,080 pages), 50 festival pages + 730 panchang archive, HowTo schema → 100 pages, YouTube channel launch with 10 videos.

## Inputs that informed this plan (read these before continuing)

| Source | Relevance |
|---|---|
| `RAMP_UP_PLAN.md` | The plan itself |
| `docs/handover/2026-04-17-llm-traffic-sections-3-4.md` | Detailed prompts for re-optimize-77 + pSEO-2000 (Phase 2.3 + Phase 3) |
| `docs/handover/2026-04-17-ahrefs-audit-remediation-plan.md` | T1–T10 history + the T7 / T8 / T10-Wave-B carryovers |
| `docs/handover/2026-04-11-seo-optimization-phase1.md` | The 38-articles-missing-AEO list and Phase 1 schema work |
| `Ahfrens Audit/Priority-Task-Impact.csv` (in parent dir) | Original P0–P3 priority view |
| `~/.claude/projects/-Users-ankitmishra-Developer-Sadhaka/memory/MEMORY.md` | Voice rules, content collaboration rules, Sprint-1 article list, IKS knowledge base reference |
| `.claude/skills/seo-optimize/SKILL.md` | Citability scoring rubric, publish gates |

## Live audit data captured this session

- **seo-geo agent**: Full audit at agent ID `af2fc9beb283ce7c3` — 72/100 GEO readiness; identified llms-full.txt 500, /about gaps, zero Wikipedia/Reddit footprint, platform-by-platform scores (AIO 8/10, ChatGPT Search 6/10, Perplexity 6/10, Claude 7/10, Copilot 5/10).
- **seo-content + seo-technical agents**: spawned (`af68f42fba87c9134`, `a856f175d9a3900e3`) but didn't deliver final synthesis before token cutoff. Their tool work informed the plan but final reports weren't returned. Re-spawn with a tighter brief if needed.
- **Web research**: 2026 ranking factor data (Google→AI 77% correlation, Wikipedia + Reddit + YouTube weights, multi-modal preference, E-E-A-T criticality, power-word CTR uplift 20–40%).
- **WebFetch confirmations**: /llms-full.txt = 500, /about = no Person schema / no founder named / no stats.

## GSC API setup that landed (2026-05-07)

Service-account auth was abandoned. The project now uses **gcloud Application Default Credentials**.

**One-time setup (already done on Ankit's Mac):**
```bash
brew install --cask google-cloud-sdk
gcloud auth application-default login \
  --scopes=openid,https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/indexing
gcloud auth application-default set-quota-project sadhaka-seo
gcloud config set project sadhaka-seo
```

**Running the scripts:**
```bash
GSC_AUTH=adc node scripts/gsc-diagnose.mjs
GSC_AUTH=adc node scripts/gsc-submit-sitemaps.mjs
```

The `GSC_AUTH=adc` env var tells the scripts to skip the legacy service-account JSON (`/Users/ankitmishra/Developer/Sadhaka/.data/google-service-account.json` — now stale, will not work) and use the user's gcloud credentials. ADC reads `~/.config/gcloud/application_default_credentials.json`. Tokens auto-refresh.

The scripts also send `x-goog-user-project: sadhaka-seo` on each request — required when ADC user creds hit a metered API. Override with `GSC_QUOTA_PROJECT=...` if needed.

If a future session sees the API returning `searchconsole.googleapis.com` quota errors, run `gcloud auth application-default set-quota-project sadhaka-seo` to re-attach the quota project (it gets unset by re-login).

## Initial baseline captured (2026-05-07, last 28 days)

Saved at [docs/analytics-snapshots/2026-05-07-gsc-baseline.txt](analytics-snapshots/2026-05-07-gsc-baseline.txt). Headline numbers — confirms the user's diagnosis exactly:

**Top zero-click pages (high impressions, ZERO clicks at position 7–17):**
| Page | Impressions | Position |
|---|---|---|
| /advaita-vedanta-explained | 592 | 8.0 |
| / (homepage) | 457 | 9.2 |
| /how-karma-dharma-work | 372 | 8.9 |
| /how-to-start-japa | 362 | 10.4 |
| /philosophies | 313 | 8.8 |
| /learn/sanskrit/nirvana | 292 | 8.2 |
| /compare | 255 | 7.4 |
| /compare/atman-vs-brahman | 196 | 16.8 |
| /isha-foundation-sadhguru | 187 | 14.9 |
| /learn/sanskrit/karma | 179 | 12.7 |
| /how-to-read-upanishads-western-beginner | 171 | 8.5 |
| /practical-spiritual-practices | 150 | 11.0 |

**Top performing pages (have any clicks at all):**
- /10-powerful-sanskrit-mantras: 5 clicks / 448 impr / 1.1% CTR / pos 16
- /compare/ashtavakra-gita-vs-bhagavad-gita: 3 / 562 / 0.5% / 7.9
- /compare/psychology-vs-yoga-philosophy: 3 / 58 / 5.2% / 20.3

**Sitemaps**: 16 child sitemaps registered, 0 with errors.

**Diagnosis confirmed**: site is ranking on page 1 for many canonical queries (positions 7–10) but earning ~0% CTR. This is exactly the meta-title/description CTR problem the ramp-up plan's Phase 1.2 addresses. The 12 pages above are the immediate Phase 1.2b rewrite targets — together they have 3,266 impressions per 28 days with 1 total click (0.03% CTR). Doubling CTR = +12 clicks/month for free.

## Resume command for next session

```
Read RAMP_UP_PLAN.md and execute Phase 0.2 (fix /llms-full.txt 500). Phase 0.1 (GSC API) is already done — auth is via gcloud ADC, scripts run with GSC_AUTH=adc.

Plan is structured by phase + task ID. Every task has acceptance criteria, effort estimate, dependency graph in §5, and a resume prompt in §9.

Status as of 2026-05-07: Plan saved. Pre-execution. KPI baselines not yet captured (Phase 0.5 has to land first to get a working GSC export).

Don't write new content this week. Don't start Phase 1 until Phase 0 gates pass:
- GSC API live
- /llms-full.txt 200
- /llms.txt expanded with stotras + pSEO
- First weekly snapshot generated
```

## Open decisions for the user

1. **Wikipedia identity strategy** — use a personal account or a topic-area pseudonym? COI implications either way. Recommend pseudonym after 14-day reputation period; disclose if asked.
2. **YouTube launch — full effort or minimal viable?** Phase 3.7 budgets 10 videos; alternative is "5 evergreen explainer videos + delegate scaling later". Recommend full effort given the 0.737 correlation between YouTube mention and AI citation.
3. **Outreach voice** — should backlink + podcast outreach come from `editor@opensadhaka.com` (preserves brand abstraction) or from Ankit personally (warmer)? Phase 0.6 sets up either option.
4. **Editorial cadence during Phase 2 mass re-optimization** — 3–5 new articles/week and re-optimization in parallel risks voice drift. Alternative: pause new articles in Weeks 4–7, focus 100% on re-optimization, resume new article cadence in Week 8. Recommend pausing.
5. **`/plan-ceo-review` and `/plan-eng-review` before executing?** The plan covers a lot of ground. Worth running both review skills against RAMP_UP_PLAN.md before starting Phase 0.

## Known unknowns (worth answering before Phase 1)

- Current GSC baseline: total clicks, average CTR, average position. Cannot pull until 0.1 lands. Without this, "+50% CTR by W4" is a directional commitment, not a numeric one.
- Current top-CTR-bleed queries. Same dependency on 0.1.
- Whether any AI-referrer traffic exists today. GA4 has the data but we haven't pulled it this session.
- Bing's current indexed-page count + Bing-side issues. Phase 0.4 surfaces this.
- Vercel function memory limits — needed to size the llms-full.txt fix correctly.
