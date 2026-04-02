# Content Agent Graceful Degradation Implementation Plan

This handover note captures the recommended implementation sequencing for graceful degradation when the content-agent backend is unavailable. The work clusters naturally into three implementation phases plus a final verification pass, with each phase creating a clean handoff boundary for the next agent.

## Save location

`docs/handover/2026-03-04-content-agent-graceful-degradation-plan.md`

## Overall implementation strategy

The correct dependency order is:

1. backend proxy contract
2. typed client error
3. UI consumers
4. metadata cleanup
5. tests, build, and manual verification

This ordering matters because UI agents should consume a single shared unavailable-state contract rather than inventing per-surface fallback logic before backend semantics are defined.

---

## Phase 1 — Backend contract + typed failure handling + unit tests

**Goal:** establish a single, explicit `BACKEND_UNAVAILABLE` path at the proxy/client boundary so all downstream UI can rely on one typed error contract.

### Files

- `src/lib/content-agent/backend.ts`
- `src/lib/pipelines/api.ts`
- `src/lib/content-agent/backend.test.ts`
- `src/lib/pipelines/api.test.ts`

### Why these belong together

These files define the backend-availability contract and error semantics used by every pipeline consumer. Doing them first minimizes rework in later UI phases.

### Session budget

- target: **45k–60k tokens**
- hard stop: **85k tokens**

### Exit criteria

- `isContentAgentConfigured()` added
- `proxyContentAgentJson()` returns synthetic 503 JSON instead of throwing on config/network failure
- `BackendUnavailableError` added and thrown by `parseResponse()` on 503 + `BACKEND_UNAVAILABLE`
- unit tests added for both behaviors

### Handover note to next agent

> Core contract is in place. Start from UI consumers of `@/lib/pipelines/api`. Assume `BackendUnavailableError` is the canonical signal for pipeline unavailability. Do not rework proxy semantics unless tests fail. Begin with `src/components/cms/editor-desk/QueuePage.tsx`, then `src/components/content-agent/GenerateWorkbench.tsx`, then `src/components/cms/editor-desk/PipelineReviewPage.tsx`.

---

## Phase 2 — Graceful-degradation UI across affected surfaces

**Goal:** keep CMS usable while pipeline features degrade clearly and non-destructively.

### Files

- `src/components/cms/editor-desk/QueuePage.tsx`
- `src/components/content-agent/GenerateWorkbench.tsx`
- `src/components/cms/editor-desk/PipelineReviewPage.tsx`
- reference helper surface: `src/components/cms/editor-desk/api.ts`

### Why these belong together

All three are front-end consumers of the new typed error and need aligned UX: amber status, partial rendering, disabled actions, and no cryptic red fetch failures.

### Session budget

- target: **50k–70k tokens**
- hard stop: **90k tokens**

### Exit criteria

- `QueuePage` uses `Promise.allSettled()`
- CMS queue renders even when pipeline queue fails
- separate `pipelineError` state added
- pipeline section shows amber unavailable state
- `GenerateWorkbench` detects backend unavailability, shows amber banner, disables create button, hides techniques list
- `PipelineReviewPage` shows amber unavailable state + back link when no detail is loaded

### Handover note to next agent

> UI degradation is implemented. Start with metadata cleanup and full regression verification. Focus on confirming that CMS paths still work when pipeline backend is absent, and that pipeline functionality remains intact when backend is present.

---

## Phase 3 — Metadata cleanup + verification/build pass

**Goal:** prevent indexing of internal tool pages and verify the full graceful-degradation flow.

### Files

- `src/app/content-agent/page.tsx`
- `src/app/content-agent/editor-desk/page.tsx`
- verification commands only after code changes

### Why these belong together

Both page metadata changes are small and should be shipped with the final QA/build pass rather than as a separate early edit.

### Session budget

- target: **20k–35k tokens**
- hard stop: **60k tokens**

### Exit criteria

- canonical alternates removed from both pages
- `robots: { index: false, follow: false }` added
- `npm run build` passes
- `npm run test:run` passes
- manual behavior checklist confirmed for backend-down and backend-up scenarios

### Handover note for final closer / deploy reviewer

> Implementation is complete. Review diff for only the scoped files above, confirm production env strategy (`CONTENT_AGENT_API_BASE`) is documented, and verify no API route changes were necessary because proxy behavior now degrades safely upstream.

---

## File-reference map

Include clickable/reference sections for the following files when reviewing or delegating work:

- `src/lib/content-agent/backend.ts`
- `src/lib/pipelines/api.ts`
- `src/components/cms/editor-desk/QueuePage.tsx`
- `src/components/content-agent/GenerateWorkbench.tsx`
- `src/components/cms/editor-desk/PipelineReviewPage.tsx`
- `src/app/content-agent/page.tsx`
- `src/app/content-agent/editor-desk/page.tsx`
- `src/components/cms/editor-desk/api.ts`

## Verification checklist

Use this final checklist once all phases are complete:

- backend-down path returns synthetic 503 JSON with `BACKEND_UNAVAILABLE`
- client throws `BackendUnavailableError` for that response shape
- CMS queue still renders when pipeline queue cannot load
- pipeline-dependent actions are visibly disabled rather than failing noisily
- unavailable states use clear amber messaging instead of generic red error states
- internal content-agent pages are noindexed
- test suite passes
- production build passes

## Notes on the provided file reference

The original handoff text referenced ``lib/pipelines/api` `` in one place, but the validated project path is:

- `src/lib/pipelines/api.ts`

Agents should use the `src/` path consistently when locating the shared pipeline client.