# Ahrefs 4xx Triage — Broken Internal Links (13 Apr 2026)

**Source:** `Ahfrens Audit/opensadhaka_13-apr-2026_links-target-4xx_2026-04-17_20-58-19.csv`
**Total broken links:** 3,522 rows
**Unique broken targets:** 26
**Health-score impact:** the primary driver of the 95% → 34% crash (6 → 13 Apr)

## Headline finding

Of 3,522 broken links, **3,410 (96.8%)** point at just **two URLs**:

| Target | Occurrences | Exists? |
|---|---|---|
| `https://www.opensadhaka.com/privacy` | 1,705 | ❌ no page |
| `https://www.opensadhaka.com/terms` | 1,705 | ❌ no page |

Both are linked from `src/components/Footer.tsx:171-172`. The Footer renders on every page, so every one of ~1,700 indexable pages emits two broken links. That is the entire incident.

**Root-cause commit (high confidence):** `e824ecd8` — _"style: redesign footer component with updated theme, improved typography, and enhanced layout structure"_. The redesign added Privacy/Terms links; the target pages were never created.

## Full unique-target breakdown

| Target URL | Count | Category |
|---|---|---|
| `/privacy` | 1,705 | Footer link, no page |
| `/terms` | 1,705 | Footer link, no page |
| `/learn` | 66 | Hub link, no page (subroutes exist) |
| `/spiritual-practice-sequence` | 9 | Internal article link, no page |
| `/traditions/vedic` | 8 | Tradition hub, slug missing from `src/data/traditions.ts` |
| `/traditions/jyotisha` | 7 | Same — missing tradition slug |
| `/traditions/shri-vidya` | 2 | Same |
| `/traditions/rama-bhakti` | 2 | Same |
| `/traditions/yogic` | 1 | Same |
| `/traditions/nath` | 1 | Same |
| `/traditions/kaumara` | 1 | Same |
| `/traditions/dharmic-ethics` | 1 | Same |
| `/traditions/buddhism` | 1 | Same |
| `/mantras/tripura-bhairavi-mantra` | 1 | Mantra page, slug missing |
| `/mantras/shodashi-mantra` | 1 | Same |
| `/mantras/pitambara-mantra` | 1 | Same |
| `/mantras/panchadashi-mantra` | 1 | Same |
| `/mantras/om-hreem-streem-hum-phat` | 1 | Same |
| `/mantras/matangi-mantra` | 1 | Same |
| `/mantras/hreem-bija-mantra` | 1 | Same |
| `/mantras/dhumavati-mantra` | 1 | Same |
| (remaining 6 targets) | 6 | long tail of 1-count mantras |

**Traditions data** currently holds: `shaivism`, `shaktism`, `vaishnavism`, `smartism`, `tantra`, `bhakti-lineages`, `kashmir-shaivism`. The 9 missing traditions (`vedic`, `jyotisha`, `shri-vidya`, `rama-bhakti`, `yogic`, `nath`, `kaumara`, `dharmic-ethics`, `buddhism`) are referenced somewhere — likely a hub page's static link list — but the data entries were never added.

## Phase 2 action map

Three buckets, ordered by volume impact.

### Bucket A — Create /privacy and /terms pages (recovers 3,410 links, ~97%)

**Recommendation:** create the pages. Both are legally expected for any content site and are trivial to populate. Killing the footer links is not an acceptable alternative — users expect them and a Privacy Policy is a GDPR/CCPA requirement the moment the site drops a cookie (GA4 is active).

Scope:
- `src/app/privacy/page.tsx` — Privacy Policy (GA4 + cookies disclosed, email capture via `faith-finder`, no payments)
- `src/app/terms/page.tsx` — Terms of Use (content is informational / not spiritual advice; no liability for practice outcomes)
- Add both to `src/app/sitemap/[id]/route.ts` under the `core` case with `priority: 0.3, changeFrequency: "yearly"`

**Alternative if legal copy blocked:** remove the Footer links until pages ship. Acceptable interim move; restores the 3,410 broken links in one commit. The follow-up to actually publish the pages should then be tracked as a separate issue.

### Bucket B — Fix /learn hub + /spiritual-practice-sequence (recovers 75 links)

- `/learn` is referenced 66 times but has no root page — only `/learn/sanskrit/*` subroutes exist. Create a lightweight hub at `src/app/learn/page.tsx` listing Sanskrit lexicon, concept pages, and related hubs. Or change the source links to point at `/learn/sanskrit` which does exist.
- `/spiritual-practice-sequence` is referenced 9 times. Identify source pages via the CSV `Source URL` column and either rewrite to the closest existing page (`/starting-spiritual-practice`?) or create the page if it's a real gap.

### Bucket C — Missing traditions + tantric mantras (recovers 30 links)

Two sub-strategies:

1. **Seed data-driven pages.** Add the 9 missing slugs to `src/data/traditions.ts` (e.g., `vedic`, `jyotisha`, `shri-vidya`) and the 14 missing mantras to `src/data/mantras.ts`. Each becomes a page automatically via the dynamic `[slug]` routes. This is the strategically right move — these are real traditions/mantras that deserve pages and will earn long-tail traffic.
2. **If content not ready:** find the source pages linking to these missing slugs (grep the codebase for the specific strings) and remove the hrefs.

Prefer option 1 — the volume is small (23 entries total) and the routes already exist, so the marginal cost is only the content.

## What's already fixed on `fix/audit-phase-1`

- T1 — Sanskrit lexicon canonical regression (68 pages)
- T1 — `| Sadhaka | Sadhaka` title duplication (378+ pages)
- T3 — `/jyotish/today` (308 redirect) removed from sitemap
- T3 — `/panchang` now in sitemap (was absent)
- T2 — Place schema validation (removed `speakable`, added `address`, guarded `geo` against (0,0))
- T2 — `gulf-of-cambay` coordinates filled in

**None of T1/T2/T3 addresses the 3,410-link Footer leak.** That fix is Phase 2 Track T5 and is gated on a decision between _create_ or _remove_ for `/privacy` + `/terms`.

## Suggested T5 (Phase 2) resume prompt

> Read `docs/handover/2026-04-17-ahrefs-audit-broken-links-triage.md` and execute Bucket A. Default to _creating_ `/privacy` and `/terms` pages with conservative legal copy appropriate for an informational spiritual-content site (GA4 cookies, email capture, no medical or financial advice, no liability for practice outcomes). Register both in the core sitemap. Commit as `fix(audit T5): create privacy + terms to stop 3,410-link footer leak`. Then open follow-up issues for Buckets B and C.

## Diagnostic commands used

```sh
# CSV is UTF-16LE — convert first
iconv -f UTF-16LE -t UTF-8 "Ahfrens Audit/opensadhaka_13-apr-2026_links-target-4xx_2026-04-17_20-58-19.csv" > /tmp/4xx.tsv

# Unique targets, descending by count
awk -F'\t' 'NR>1 {print $5}' /tmp/4xx.tsv | sort | uniq -c | sort -rn

# Source pages (who's leaking)
awk -F'\t' 'NR>1 {print $3}' /tmp/4xx.tsv | sort | uniq -c | sort -rn

# Find root cause commit
git log --since="2026-04-01" --until="2026-04-14" --oneline -- src/components/Footer.tsx
```
