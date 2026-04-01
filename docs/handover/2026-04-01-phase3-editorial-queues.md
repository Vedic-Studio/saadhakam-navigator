# Phase 3 Editorial Queue Operating Model

This note defines the v1 operating model for **Phase 3: content operations follow-up** on top of the strategic content-audit layer.

## Goal

Turn the strategic audit from a reporting surface into an editorial work queue that can be used weekly without manual spreadsheet reshaping.

## Queue contract

The audit payload now exposes `editorialQueues` with four priority lanes:

- `p1` — do now / this week
- `p2` — next sprint
- `p3` — backlog
- `hold` — contain or defer

Each queue item includes:

- route
- title
- decision bucket
- priority
- owner
- target window
- proposed fix
- ICP score
- traffic snapshot
- qualification snapshot
- AEO / LLM flags

## Default owner mapping

- `double-down` / `expand-cluster` → `editorial`
- `improve-ctr-rank` → `seo`
- `improve-conversion-path` → `conversion`
- `aeo-llm-repair` → `aeo`
- `deprioritize-or-contain` / `monitor` → `strategy`

## Default priority logic

- `p1`: conversion leaks, AEO repairs, and highest-conviction double-down pages
- `p2`: CTR/rank opportunities, cluster expansion, and second-order growth pages
- `p3`: lower-confidence monitor/backlog items
- `hold`: deprioritized/contain pages

## Target windows

This v1 uses relative operating windows instead of pretending exact project-management assignments exist in code:

- `this-week`
- `next-sprint`
- `backlog`
- `hold`

## What remains out of scope for Phase 3

Deferred to later phases:

- exact assignee sync with an external PM tool
- explicit calendar due dates
- stronger article-to-quiz attribution
- richer template/archetype analytics markers

## Recommended usage pattern

1. Review `p1` weekly as the immediate execution queue.
2. Pull `p2` into the next editorial sprint planning session.
3. Keep `p3` as backlog candidates, not mandatory commitments.
4. Revisit `hold` only when strategy changes or new evidence appears.