---
date: 2026-05-07
session: cool-hugle-c50cdb (worktree)
ramp-up-phase: Phase 0 → Phase 1 transition
---

# Handover — `/llms-full.txt` 500 fix landed; next is Phase 1.2 CTR rescue

## Completed this session

### Phase 0.2 — `/llms-full.txt` 500 fix
PR: [#19](https://github.com/Vedic-Studio/saadhakam-navigator/pull/19) (branch `claude/cool-hugle-c50cdb`).

- Root cause: `vishnu-sahasranama.json` migrated from a flat `names: [...]` shape to a verse-based `verses: [{ names: [...] }]` shape, but `src/app/(system)/llms-full.txt/route.ts` was still iterating `vishnuSahasranama.names` directly. That became `undefined` after the migration → `TypeError` on every request → HTTP 500.
- Fix: use `getAllSahasranamaNames()` helper for both Vishnu and Lalita; add per-article try/catch around CMS reads; convert route to `dynamic = "force-static"` + `revalidate = 86400` so this class of bug surfaces at build time, not request time.
- Regression test in `route.test.ts` (4 cases — status, all 11 section headers, Vishnu names present, Lalita names present).
- Verified: HTTP 200, 2.12 MB body, 905 ms — well under Vercel's 4.5 MB serverless cap. Build manifest now shows `○ /llms-full.txt 1d 1y` (Static, 1-day revalidate).
- Tests: 601/601 pass.

### State of Phase 0 gate (RAMP_UP_PLAN §3, "Phase 0 gate: GSC API live + llms-full.txt 200 + first snapshot generated")
- ✅ GSC API live (last session — ADC + `x-goog-user-project` quota header)
- ✅ `/llms-full.txt` will return 200 once PR #19 merges and Vercel redeploys
- 🟡 First snapshot saved at `docs/analytics-snapshots/2026-05-07-gsc-baseline.txt` in worktree `affectionate-colden-6d7750`, but **not committed** to main. Either commit it from there, or treat the next-session weekly-snapshot run as the authoritative one.

## Recommended next task — Phase 1.2a + 1.2b: CTR rescue (single highest-leverage 1-day intervention)

### Why this next
The 2026-05-07 GSC baseline shows the exact symptom RAMP_UP_PLAN §0 names: high impressions × ~0% CTR on a small set of high-rank pages. **7 pages alone hold 2,643 impressions at position 7–10 with zero clicks last 28 days.** Lifting these from 0% to even 2% CTR adds ~50 clicks/month immediately, and each rewrite is a 5-minute task.

The plan calls for this in two steps:
- **Phase 1.2a** — script the CTR-bleed audit (sort by `impressions × (1 − CTR)`)
- **Phase 1.2b** — rewrite the top 50 titles + descriptions using the CTR template library in §7.1 of the plan

### Top 7 zero-click candidates (from baseline)

| Page | Impr | Pos | Source of `<title>` |
|---|---|---|---|
| `/advaita-vedanta-explained` | 592 | 8.0 | static page metadata |
| `/` (homepage) | 457 | 9.2 | `src/app/page.tsx` / layout |
| `/how-karma-dharma-work` | 372 | 8.9 | static page metadata |
| `/how-to-start-japa` | 362 | 10.4 | static page metadata |
| `/philosophies` | 313 | 8.8 | `src/app/philosophies/page.tsx` |
| `/learn/sanskrit/nirvana` | 292 | 8.2 | pSEO template `src/app/learn/sanskrit/[word]/page.tsx` |
| `/compare` | 255 | 7.4 | `src/app/compare/page.tsx` |

Total: 2,643 impressions / 0 clicks. Worst-CTR-bleed page on the entire site is `/advaita-vedanta-explained` — already at position 8 (page 1 of Google) and getting zero clicks.

### Two routes to take this from here

**Option A — Manual rewrites first (fastest impact, ~60 min).** Open each of the 7 pages, rewrite the `<title>` and meta description applying RAMP_UP_PLAN §7.1 CTR-template rules (power word ≥1, query exact-match, 50–60 chars, year qualifier if evergreen, benefit framing, no `| Sadhaka` suffix bloat), commit in one PR. Submit to IndexNow after merge. Re-measure in 14 days via the same `gsc-diagnose.mjs`.

**Option B — Codify Phase 0.5 first (1 PR, then automated weekly).** Build `scripts/weekly-snapshot.mjs` that pulls top 200 queries by impressions and top 200 pages by CTR, writes `docs/analytics-snapshots/YYYY-MM-DD-snapshot.md` with the CTR-bleed sort already applied. Schedule via `/loop` or cron. *Then* do Option A using the script's output. Adds ~3h vs Option A but every future iteration is automatic.

**Recommendation: Option A first.** The 7 pages above are already identified, the data won't get materially better in a week, and 50+ monthly clicks is hard to leave on the table while we tool. Add Option B as a follow-up the same day or next.

### Reference material the next session needs
- `RAMP_UP_PLAN.md` §1.2 (Phase 1.2a/b deliverables) and §7.1 (CTR power templates) — both live at the worktree `affectionate-colden-6d7750/RAMP_UP_PLAN.md`
- `docs/analytics-snapshots/2026-05-07-gsc-baseline.txt` (worktree `affectionate-colden-6d7750`) — full top-20 + zero-click + queries list
- Voice skill at `~/.claude/skills/sadhaka-voice.md` — must apply to descriptions
- Sanatan-not-Hindu rule and modern-bridges rule — both apply to title rewrites

### Resume command (paste into next session)
```
Phase 1.2b — manual CTR rewrite pass for the 7 zero-click high-impression pages identified
in docs/handover/2026-05-07-llms-full-fix-and-next.md. For each page below, rewrite the
<title> and meta description per RAMP_UP_PLAN §7.1 CTR power templates. Commit in one PR
titled "perf(ctr): rewrite titles + descriptions for 7 zero-click high-impression pages".
After merge, run `npm run indexnow:submit:prod` and note the date so we can re-measure in 14 days.

Pages (from 2026-05-07 GSC baseline, 28-day window):
1. /advaita-vedanta-explained — 592 impr, pos 8.0
2. /                          — 457 impr, pos 9.2
3. /how-karma-dharma-work     — 372 impr, pos 8.9
4. /how-to-start-japa         — 362 impr, pos 10.4
5. /philosophies              — 313 impr, pos 8.8
6. /learn/sanskrit/nirvana    — 292 impr, pos 8.2
7. /compare                   — 255 impr, pos 7.4

Constraints: ≥1 power word, query exact-match in title, 50–60 chars title / 120–160 chars
description, year qualifier where evergreen, benefit framing, NO "| Sadhaka" suffix bloat,
voice skill applied to description. Sanatan-not-Hindu language. No em dashes.
```

## Optional follow-ups (not blocking next phase)

1. **Commit the 2026-05-07 baseline** from worktree `affectionate-colden-6d7750` to main so it has a permanent home.
2. **Phase 0.5 weekly-snapshot script** — codify the manual `gsc-diagnose` baseline into `scripts/weekly-snapshot.mjs` + schedule. Closes the third Phase 0 gate.
3. **Watch PR #19 deploy.** After it merges, verify production with:
   ```
   curl -sS -o /dev/null -w "%{http_code} %{size_download}\n" https://www.opensadhaka.com/llms-full.txt
   # Expect: 200 ~2.1MB
   ```
