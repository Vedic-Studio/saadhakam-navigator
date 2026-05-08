# content/x-strategy/

Sadhaka X (Twitter) brand strategy artifacts. These three files govern X content for the Sadhaka brand account, distinct from Ankit's personal `@ankit_pfc` account (which lives under `~/.claude/skills/write-x/`).

## Files

| File | Role | Loaded by |
|---|---|---|
| [`sadhaka-x-strategy.md`](./sadhaka-x-strategy.md) | Pillars, cadence, voice, hard rules, north-star metrics | Always loaded by `write-x-sadhaka` skill |
| [`peer-patterns.md`](./peer-patterns.md) | 14 peer accounts profiled with format and voice signatures | Loaded when generating drafts to inform format selection |
| [`format-catalog.md`](./format-catalog.md) | Templates for each of the 8 Sadhaka post formats | Loaded when drafting a specific format |

## Source provenance

`peer-patterns.md` was extracted from `Sanatan : Sadhaka X (Twitter) Content Creator Knowledge Base.rtf` (May 2026 live profile analysis). The RTF source was truncated mid-account 14; accounts 15-22 listed in the backlog need manual scanning.

## Where things go from here

These three files are Phase 1 of a 6-phase build:

1. ✅ **Phase 1**: Strategy + peer patterns + format catalog (this folder).
2. **Phase 2**: `.claude/skills/write-x-sadhaka/` skill that uses these files to draft posts.
3. **Phase 3**: `.claude/skills/x-queue-manage/` skill + `content/x-queue/` data layout.
4. **Phase 4**: `scripts/x/generate-batch.mjs` driving xAI Grok or Claude for bulk drafts.
5. **Phase 5**: `scripts/x/post-queue.mjs` posting via X API + Vercel cron.
6. **Phase 6**: Metrics pull + debrief X-mode.

See `sadhaka-x-strategy.md` § 9 for status and decision points.

## How to update these files

- **`sadhaka-x-strategy.md`**: change only when pillars, cadence, voice rules, or hard rules change. Bump the "Last updated" date and note the change.
- **`peer-patterns.md`**: refresh every 60-90 days. Add new accounts as they're profiled. Re-rank format adoption table when patterns shift.
- **`format-catalog.md`**: change when a new format is introduced or when an existing template's failure modes evolve. The format catalog should stabilize quickly and change rarely.

## Related references

- Voice rules and anti-slop: `~/.claude/skills/sadhaka-voice/`, `~/.claude/skills/stop-slop/`
- Site-wide copy rules: `/CLAUDE.md` (project root)
- IKS knowledge base for claim attribution: `backend/app/knowledge/kb/INDEX.md`
- Personal X (Ankit): `~/.claude/skills/write-x/`
