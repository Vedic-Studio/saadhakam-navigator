# Insights & Actionables — opensadhaka.com (2026-05-05)

**TL;DR:** Latest data pull is blocked because the service account's home GCP project has been deleted. This report draws from the 2026-04-09 GSC baseline (26 days old) — at ~25 clicks/month the underlying signal is still substantively valid. The credential takes ~15 minutes to fix and the new pull pipeline is wired and ready (`npm run analytics:snapshot:gsc`, `npm run analytics:snapshot:ga4`). Five actionables below; only one is gated on the fix.

---

## 0. Status — Why You're Reading 26-Day-Old Numbers

The service account `sadhaka-seo-reporting@sadhaka-ai.iam.gserviceaccount.com` (project `sadhaka-ai`, project number `575787169950`) is dead because the GCP project was deleted. Every Google API call now returns:

```
403 PERMISSION_DENIED — Project #575787169950 has been deleted.
```

This kills GSC, GA4, and Admin API alike. The credential at [.data/google-service-account.json](.data/google-service-account.json) needs to be replaced before any future pull can run.

### Fix path (~15 minutes, do this once)

1. Open <https://console.cloud.google.com> → create a new project (or pick an existing live one) → note the project ID.
2. Enable the three APIs in that project:
   - **Search Console API** (`searchconsole.googleapis.com`)
   - **Google Analytics Data API** (`analyticsdata.googleapis.com`)
   - **Google Analytics Admin API** (`analyticsadmin.googleapis.com`)
3. **IAM & Admin → Service Accounts → Create service account** → name `sadhaka-seo-reporting` → no roles needed (access is granted on each property, not via IAM).
4. **Keys → Add Key → JSON** → save. Move the downloaded file to overwrite [/Users/ankitmishra/Developer/Sadhaka/.data/google-service-account.json](/Users/ankitmishra/Developer/Sadhaka/.data/google-service-account.json) (keep the same path; the worktree's [.env.local](.env.local) already points to it).
5. Grant per-property access (this is the part that's easy to miss):
   - **GSC**: <https://search.google.com/search-console> → property `sc-domain:opensadhaka.com` → Settings → Users and permissions → Add user → paste the new service account email → permission `Restricted`.
   - **GA4**: <https://analytics.google.com> → Admin → Property Access Management → property `526473437` → Add users → paste the same email → role `Viewer`.
6. Sanity check: `node scripts/ga4-pull-snapshot.mjs --check` should print the property name + timezone.

After step 6, the rest of this report's actionables can be re-measured with one command per window.

---

## 1. Headline Numbers (2026-04-09 pull, window 2026-03-10 → 2026-04-06)

| Metric | Value | Interpretation |
|---|---|---|
| Clicks | **25** / 28 days | <1/day |
| Impressions | **4,911** | ~175/day — the audience exists |
| CTR | **0.51%** | far below any healthy benchmark; rank-driven |
| Avg position | **16.5** | mostly page 2 |
| Rich-result / AI-Overview impressions | **0** | not competing on the visibility layer at all |

The full prior diagnostic with per-page breakdowns lives at [docs/analytics-snapshots/2026-04-09-ctr-analysis.md](docs/analytics-snapshots/2026-04-09-ctr-analysis.md). I won't restate it here — this report is action-layer.

---

## 2. Insights

### 2.1 The bottleneck is rank, not CTR

Most pages that get impressions sit at position 15+. CTR work cannot rescue position-2-of-Google traffic — the click-curve at that depth is already 1.5%. Pages at pos 7-10 with 0% CTR are the only true CTR-fixable rows; everything else is a rank problem dressed up as a CTR problem.

### 2.2 Zero AI Overview / rich-result impressions in 28 days is the loudest finding

Sadhaka has the structural plumbing (`/llms.txt`, `aeoAnswer` blocks, JSON-LD) but is not actually being cited by Google's AI Overview model. That layer of the SERP is where informational-query traffic is moving; absence here caps the upside no matter how good the snippets get.

### 2.3 ~42 missed clicks are sitting in 10 top-10-ranked, zero-CTR pages

This is the highest-confidence, lowest-effort win in the dataset: pages already ranking in spots 5-10 where **the title or meta description is failing the snippet beauty contest**. Snippet rewrites alone — no rank work, no content work — would 2.7× current monthly traffic.

The full list (from [2026-04-09-gsc-ctr-audit-minimpr25.json](docs/analytics-snapshots/2026-04-09-gsc-ctr-audit-minimpr25.json)):

| Page | Pos | Impr | Clicks | Missed |
|---|---|---|---|---|
| `/daily-spiritual-routine-beginners` | 5.7 | 171 | 0 | ~12 |
| `/mantras/om-bram-brim-braum-sah-budhaya-namah` | 8.2 | 311 | 2 | ~7 |
| `/how-to-start-japa` | 8.5 | 227 | 3 | ~4 |
| `/learn/sanskrit/bhakti` | 7.2 | 109 | 0 | ~4 |
| `/what-is-prasad` | 10.4 | 199 | 1 | ~4 |
| `/compare/adi-shankaracharya-vs-ramanuja` | 7.8 | 66 | 0 | ~3 |
| `/practical-spiritual-practices` | 7.0 | 55 | 0 | ~2 |
| `/ramana-maharshi-who-am-i` | 7.8 | 56 | 0 | ~2 |
| `/how-to-read-upanishads-western-beginner` | 8.3 | 68 | 0 | ~2 |
| `/jyotish/panchang/tithis/shukla-panchami` | 9.0 | 115 | 1 | ~2 |

### 2.4 The brand-term anomaly is real and free to fix

Query `sadhaka` → 270 impressions, **0 clicks**, position 8.4. The word is a common Sanskrit noun ("seeker"), so most searchers are looking for the *definition*, not the website, and Wiktionary owns the SERP slots above us. Today the homepage snippet doesn't disambiguate. Two homepage edits (title + meta description, ~1 hour) capture the 5-10% of that volume that *is* looking for a website.

### 2.5 `/learn/sanskrit/*` vs `/what-is-*` is cannibalizing itself

`/learn/sanskrit/mantra` (pos 37.9) and `/what-is-mantra` (pos 68.0) are competing for the same intent and both losing. Same pattern across `/learn/sanskrit/{prakriti,moksha,samskara,…}`. Pick canonical, 301 the other, consolidate link equity.

---

## 3. Actionables (Prioritized by Impact ÷ Effort)

| # | Priority | Action | Effort | Impact | Gated On |
|---|---|---|---|---|---|
| 1 | **P0** | Recreate service account credential (§0 above) | 15 min | Unblocks all future measurement | — |
| 2 | **P1** | Rewrite `<title>` + meta description for the 10 pages in §2.3 | ~4 h | +30-40 clicks/mo (~2.7× current) | none — do today |
| 3 | **P1** | Homepage brand-term disambiguation snippet | ~1 h | Captures 5-10% of 270 impr/mo | none |
| 4 | **P2** | Run `/seo-optimize` GEO Citability pass on the top-10 ranking pages | ~8 h | Unblocks AI Overview presence (true ceiling) | none |
| 5 | **P2** | Cannibalization audit: `/learn/sanskrit/*` vs `/what-is-*` — declare canonical, 301 redirects | ~4 h | Consolidates link equity, frees rank ceiling | none |
| 6 | **P3** | Rank work on the page-2 rankers (`/what-is-mantra` pos 68, `/learn/sanskrit/mantra` pos 38, `/10-powerful-sanskrit-mantras` pos 21) | multi-week | The biggest long-term lever | None — but measure-blind until #1 |

### Specific snippet rewrite suggestions for action #2

These match the patterns that the 2026-04-09 analysis identified. Apply pattern-by-page; copy is a starting draft, refine in the editor.

- **`/daily-spiritual-routine-beginners`** — current title is likely slug-echo. Rewrite to:
  - Title: `A 20-Minute Daily Sadhana for Beginners (Morning + Evening Split)`
  - Description: `Build a morning japa and evening svadhyaya routine in 20 minutes. Step-by-step, rooted in Upanishadic sources.`
- **`/mantras/om-bram-brim-braum-sah-budhaya-namah`** — title should lead with *meaning + use*, not the transliteration:
  - Title: `Budha Beej Mantra: Meaning, Pronunciation, and When to Chant`
  - Description: `The full meaning of Om Bram Brim Braum Sah Budhaya Namah, the Mercury planetary mantra, and the four occasions traditionally prescribed for it.`
- **`/compare/adi-shankaracharya-vs-ramanuja`** — comparison pages need a verdict tone:
  - Title: `Shankara vs Ramanuja: Seven Real Disagreements (Not the Generic Ones)`
- **`/learn/sanskrit/bhakti`** — fighting Wiktionary; needs to promise *more* than a definition:
  - Title: `Bhakti: Not "Devotion" in the Western Sense (Shankara vs Ramanuja)`
- **`/what-is-prasad`** — same pattern; lead with the surprising claim:
  - Title: `What Is Prasad? The Sanskrit Word for Grace, Not Food`

The remaining five follow the same playbook: lead with the unexpected angle, drop the slug-echo, write the description in second-person with a concrete promise + a primary-source credential.

### Specific homepage brand-term fix for action #3

- Title: `Sadhaka (opensadhaka.com) — The Living Library of Vedanta and Classical Sadhana`
- Description: `Sadhaka (Sanskrit: a practitioner). Also the open library for Vedanta, Upanishad study, stotras, and daily sadhana — free to read.`
- Verify `Organization` schema with `sameAs` → Wikidata profile to unlock SERP sitelinks long-term.

---

## 4. What Was Built This Run (Stays in the Repo)

Two new scripts and an env file, ready to run as soon as the credential is restored:

| Path | Purpose |
|---|---|
| [scripts/gsc-pull-snapshot.mjs](scripts/gsc-pull-snapshot.mjs) | Fresh GSC snapshot at any window (`--days 28` or `--days 90`). Emits overview + CTR audit at minimpr 25 and 50. Uses manual JWT (no `googleapis` dep). |
| [scripts/ga4-pull-snapshot.mjs](scripts/ga4-pull-snapshot.mjs) | Fresh GA4 snapshot at any window. Includes the AI-engine referrer breakdown (chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com, you.com, phind.com) that the existing dashboard does not have. |
| [.env.local](.env.local) (gitignored) | Holds `GA4_PROPERTY_ID=526473437` and `GOOGLE_SERVICE_ACCOUNT_FILE` path. |
| `package.json` scripts | `npm run analytics:snapshot:gsc -- --days N` and `analytics:snapshot:ga4`. |

### One-shot runs after the credential is fixed

```bash
node scripts/ga4-pull-snapshot.mjs --check                       # sanity-check property
npm run analytics:snapshot:gsc -- --days 28
npm run analytics:snapshot:gsc -- --days 90
npm run analytics:snapshot:ga4 -- --days 28
npm run analytics:snapshot:ga4 -- --days 90
node scripts/gsc-diagnose.mjs > docs/analytics-snapshots/$(date +%Y-%m-%d)-gsc-diagnose.txt
```

Each run writes dated JSON to `docs/analytics-snapshots/`. The 28d files are the diff target for period-over-period; the 90d files smooth out the small-sample noise inherent to a ~25-clicks/month site.

### Recommended cadence

- **Weekly** GSC pull (`--days 28`) → Monday morning, ~30 seconds. Trend lines emerge after 4-6 weeks.
- **Bi-weekly** GA4 pull (`--days 28`) → captures AI-engine referrer growth without overcollecting.
- **Monthly** 90d run → for clean trend slides.

This can be a Vercel Cron when production is unbroken, or a local cron / GitHub Action triggered from this repo. Don't wire the cron yet — fix the credential, run by hand for 2-3 weeks, then automate once the output is stable.

---

## 5. About the "Google MCP"

You asked whether Google now ships an MCP. They ship Calendar, Drive, and Gmail MCPs (visible in your deferred-tool list) but **no GSC or GA4 MCP** as of today. Until that lands, the local-script approach above is the right path: it's read-only, JWT-signed, and produces version-controllable JSON snapshots.

If a community/Anthropic GSC or GA4 MCP ships later, the existing scripts can be deprecated cleanly — the JSON snapshot format would be the contract that doesn't change.

---

## 6. Do This Week

1. **Today** — fix the service account credential (§0). 15 minutes. Everything below is gated on this for measurement, but actions 2-5 can be done in parallel.
2. **Today / tomorrow** — rewrite snippets for the 10 pages in §2.3. Use the patterns in §3.
3. **Tomorrow** — rewrite the homepage title + description (§3 action #3). One file.
4. **This week** — re-run `npm run analytics:snapshot:gsc -- --days 28` and confirm the new snapshot lands at `docs/analytics-snapshots/2026-05-XX-gsc-overview-28d.json`. The numbers will not change much in 7 days; the value is having the pipeline confirmed working.
5. **Next week** — run `/seo-optimize` GEO Citability on `/daily-spiritual-routine-beginners` first (the single highest-priority page: pos 5.7, 171 impr, 0 clicks). Use the result as the template for the other nine.

After two weekly runs of the new GSC pull script, the period-over-period snippet-rewrite impact will be measurable.

---

## Appendix — Source Files

- Stale baseline: [2026-04-09-ctr-analysis.md](docs/analytics-snapshots/2026-04-09-ctr-analysis.md)
- Stale raw: [2026-04-09-gsc-ctr-audit-minimpr25.json](docs/analytics-snapshots/2026-04-09-gsc-ctr-audit-minimpr25.json), [-50.json](docs/analytics-snapshots/2026-04-09-gsc-ctr-audit-minimpr50.json)
- New scripts: [gsc-pull-snapshot.mjs](scripts/gsc-pull-snapshot.mjs), [ga4-pull-snapshot.mjs](scripts/ga4-pull-snapshot.mjs)
- Existing: [gsc-diagnose.mjs](scripts/gsc-diagnose.mjs), [src/lib/analytics/google.ts](src/lib/analytics/google.ts)
