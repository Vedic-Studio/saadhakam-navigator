# Phase 3 Editorial Queue Operating Model

This note defines the v1 operating model for **Phase 3: content operations follow-up** on top of the strategic content-audit layer.

## Goal

Turn the strategic audit from a reporting surface into an editorial work queue that can be used weekly without manual spreadsheet reshaping.

## Queue contract

The audit payload now exposes `editorialQueues` with four priority lanes:

- `p1` — do now / this week
- `p2` — commit in next sprint planning
- `p3` — backlog candidates, not yet committed
- `hold` — contain, defer, or revisit only if strategy changes

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

The queue should be treated as the **operating layer of the audit**, not as a separate spreadsheet system. The weekly review starts from `editorialQueues`, then converts the selected items into concrete work assignments.

## Default owner mapping

- `double-down` / `expand-cluster` → `editorial`
- `improve-ctr-rank` → `seo`
- `improve-conversion-path` → `conversion`
- `aeo-llm-repair` → `aeo`
- `deprioritize-or-contain` / `monitor` → `strategy`

This owner mapping is the first routing layer, not the final assignee model. It answers **which function owns the next move**.

### Owner responsibilities by lane

- `editorial`
  - refresh, expand, consolidate, or build adjacent content
  - increase related-link depth and cluster completeness
  - prepare copy and brief requirements for sprint commitment
- `seo`
  - rewrite title tags, meta descriptions, intros, and search framing
  - isolate impression-heavy / low-CTR pages for ranking tests
  - confirm whether a page needs copy changes, snippet changes, or internal-link support
- `conversion`
  - repair CTA placement, bridge copy, quiz-path alignment, and reader progression
  - review pages that attract readers but fail to qualify them
  - define the minimum conversion fix before further traffic scaling
- `aeo`
  - backfill direct-answer blocks, citeability cues, schema-adjacent answer clarity, and LLM-facing structure
  - identify pages where answer quality is the blocker rather than traffic or conversion
- `strategy`
  - decide what remains on hold, what gets monitored, and what should be reactivated
  - arbitrate cross-functional prioritization when multiple teams want the same sprint capacity
  - keep the queue aligned with current ICP and business goals

## Default priority logic

- `p1`: conversion leaks, AEO repairs, and highest-conviction double-down pages
- `p2`: CTR/rank opportunities, cluster expansion, and second-order growth pages
- `p3`: lower-confidence monitor/backlog items
- `hold`: deprioritized/contain pages

## Operational meaning of each lane

### `p1` — this week

`p1` is the weekly execution queue. These items should be small enough or urgent enough to begin immediately.

Typical `p1` work:

- conversion leaks on pages already getting meaningful traffic
- AEO / LLM repairs on strategically important pages
- highest-conviction `double-down` pages where the upside is already visible

Rule: if a team cannot explain why a `p1` item should start this week, it probably belongs in `p2`.

### `p2` — next sprint

`p2` is the committed candidate set for the next sprint planning discussion.

Typical `p2` work:

- impression-rich CTR/rank opportunities
- cluster expansion briefs and adjacent spoke planning
- non-urgent but high-value refreshes

Rule: `p2` is not parking-lot work. It should contain items that are likely to be staffed in the next sprint if capacity permits.

### `p3` — backlog

`p3` is a real backlog, not an implied promise.

Typical `p3` work:

- monitor pages with directional promise but insufficient evidence
- lower-confidence opportunities that need another analytics cycle
- pages worth revisiting only after higher-value work is complete

Rule: do not overload sprint planning with `p3` items unless `p1` and `p2` are already resourced.

### `hold` — contain or defer

`hold` is the containment lane for pages that should not consume active editorial capacity right now.

Typical `hold` work:

- pages with weak ICP fit and no qualification signal
- pages to maintain lightly but not expand
- pages waiting on strategic changes, product changes, or new evidence

Rule: `hold` is reviewed for changes in status, not for routine sprint commitment.

## Target windows

This v1 uses relative operating windows instead of pretending exact project-management assignments exist in code:

- `this-week`
- `next-sprint`
- `backlog`
- `hold`

## Weekly editorial queue ritual

Use the content audit as the weekly editorial work queue in the following sequence.

### 1. Pull the fresh audit

At the start of the week, review:

- `editorialQueues.p1`
- `editorialQueues.p2`
- `editorialQueues.p3`
- `editorialQueues.hold`
- `editorialQueues.byBucket`

The team should begin from queue output, not from ad hoc page opinions.

### 2. Review `p1` as the weekly execution board

For each `p1` item, confirm:

- owner still makes sense
- proposed fix still makes sense
- the page still deserves immediate attention
- whether the job is a quick fix, a refresh, or a deeper rebuild

Expected outcome:

- a short, actually executable list for the current week
- explicit owner for every selected item
- any blockers called out before work starts

### 3. Review `p2` as the next sprint candidate pool

For each `p2` item, decide one of four outcomes:

- promote to sprint commitment
- keep in `p2`
- demote to `p3`
- reroute to `hold`

Expected outcome:

- a clean shortlist for sprint planning rather than a noisy opportunity dump

### 4. Sweep `p3` and `hold` for status changes

Use these lanes only to identify:

- new evidence that upgrades a page
- strategic shifts that reactivate a page
- pages that should remain intentionally untouched

Expected outcome:

- no silent backlog bloat
- no accidental revival of low-value work

### 5. Convert the queue into assignments

After the review, convert selected items into an execution board with:

- route
- bucket
- priority lane
- owner
- work type
- sprint status
- expected deliverable

Suggested work types:

- refresh
- SEO test
- conversion fix
- AEO repair
- cluster brief
- hold / monitor

## Sprint planning connection

The queue should feed sprint planning directly.

### Weekly review vs sprint planning

- **Weekly review** decides what should move now.
- **Sprint planning** decides what the team will actually staff and ship.

Use the following rule:

- `p1` = candidates for current-week execution
- `p2` = candidates for next sprint commitment
- `p3` = backlog only
- `hold` = excluded from sprint scope unless strategy explicitly changes

### Suggested sprint-capacity split

As a v1 planning heuristic:

- ~50% of editorial capacity on `p1`
- ~30% on top `p2` items that are approved into the next sprint
- ~20% reserved for overflow, production risk, or strategic exceptions

This prevents the sprint from becoming either fully reactive or fully speculative.

### Sprint board fields

Every item pulled from the audit into sprint planning should carry:

- route
- title
- decision bucket
- queue priority
- owner
- target window
- proposed fix
- ICP score
- clicks / impressions / sessions snapshot
- qualified conversions snapshot
- AEO / LLM flags
- sprint status
- notes / blocker

## Bucket-to-owner-to-sprint mapping

Use this as the default handoff matrix.

| Decision bucket | Default owner | Default queue lane | Default sprint action |
|---|---|---|---|
| `double-down` | editorial | `p1` if very high conviction, otherwise `p2` | refresh, expand, internal-link amplification |
| `improve-ctr-rank` | seo | `p2` | title/meta/intro test in next sprint |
| `improve-conversion-path` | conversion | `p1` | CTA, bridge copy, and path alignment fix this week |
| `expand-cluster` | editorial | `p2` | brief and schedule adjacent spoke content |
| `aeo-llm-repair` | aeo | `p1` | direct-answer and citeability repair this week |
| `monitor` | strategy | `p3` | observe for another cycle unless evidence improves |
| `deprioritize-or-contain` | strategy | `hold` | no sprint commitment; revisit only with new reason |

## Definition of done for queue operations

The editorial queue is working correctly when all of the following are true each week:

- `p1` has named owners and active work, not just labels
- `p2` is clean enough to drive sprint planning without manual spreadsheet cleanup
- `p3` remains a controlled backlog instead of a shadow commitment list
- `hold` items are intentionally deferred, not forgotten by accident
- sprint commitments can be traced back to audit evidence
- each owner can explain why their committed items were selected

## What remains out of scope for Phase 3

Deferred to later phases:

- exact assignee sync with an external PM tool
- explicit calendar due dates
- stronger article-to-quiz attribution
- richer template/archetype analytics markers

## Recommended usage pattern

1. Review `p1` weekly as the immediate execution queue.
2. Assign each selected `p1` item to the functional owner named by the queue.
3. Pull `p2` into the next editorial sprint planning session.
4. Keep `p3` as backlog candidates, not mandatory commitments.
5. Revisit `hold` only when strategy changes or new evidence appears.
6. Trace every sprint commitment back to the audit row, bucket, and proposed fix.