/**
 * Pure learning-path progress logic + SSR-safe localStorage persistence.
 *
 * This lives in the FEATURE territory (not the foundation user-state store).
 * It mirrors the foundation's patterns deliberately: a versioned storage key, a
 * `typeof window` guard on every DOM access, try/catch around storage (private
 * mode / quota must never break navigation), and pure update functions that the
 * React layer composes inside effects/handlers. Nothing here runs at import time
 * and nothing should be called during render.
 *
 * Shape: progress is a map from pathId -> the set of completed step numbers
 * (1-indexed, matching the `path_step_complete` event's `step_n`). Steps are
 * stored as a de-duplicated, ascending array so the persisted blob is stable and
 * order-independent. The foundation store is NOT touched.
 */

/** Versioned storage key owned by this feature module. */
export const PATH_PROGRESS_STORAGE_KEY = "sadhaka_path_progress_v1";

/** Completed step numbers per path id. Keys are path ids, values are 1-indexed step numbers. */
export type PathProgress = Record<string, number[]>;

/** A fresh, empty progress blob. */
export function createInitialPathProgress(): PathProgress {
  return {};
}

/**
 * Coerce an arbitrary set of step numbers into a clean, ascending, de-duplicated
 * list of positive integers. Drops non-finite, non-positive, and non-integer
 * values so corrupt storage can never produce an out-of-range step.
 */
function normalizeSteps(stored: unknown): number[] {
  if (!Array.isArray(stored)) {
    return [];
  }
  const seen = new Set<number>();
  for (const item of stored) {
    if (typeof item !== "number" || !Number.isFinite(item)) {
      continue;
    }
    const step = Math.floor(item);
    if (step < 1) {
      continue;
    }
    seen.add(step);
  }
  return [...seen].sort((a, b) => a - b);
}

/**
 * Coerce arbitrary parsed JSON into a valid PathProgress. Exported so the pure
 * normalisation is unit-testable without touching the DOM. Non-object blobs and
 * non-string keys are dropped; each path's steps are normalised; paths that end
 * up with no completed steps are omitted to keep the blob minimal.
 */
export function normalizePathProgress(stored: unknown): PathProgress {
  if (!stored || typeof stored !== "object" || Array.isArray(stored)) {
    return createInitialPathProgress();
  }
  const result: PathProgress = {};
  for (const [pathId, value] of Object.entries(stored as Record<string, unknown>)) {
    if (typeof pathId !== "string" || pathId.length === 0) {
      continue;
    }
    const steps = normalizeSteps(value);
    if (steps.length > 0) {
      result[pathId] = steps;
    }
  }
  return result;
}

/** True when `stepN` is recorded complete for `pathId`. */
export function isStepComplete(
  progress: PathProgress,
  pathId: string,
  stepN: number,
): boolean {
  return (progress[pathId] ?? []).includes(stepN);
}

/** Number of completed steps recorded for `pathId`. */
export function completedCount(progress: PathProgress, pathId: string): number {
  return (progress[pathId] ?? []).length;
}

/**
 * Goal-gradient progress percentage (0..100), rounded to a whole number. Returns
 * 0 when `totalSteps` is not a positive number, so a malformed path can never
 * divide by zero. The result is clamped to 100 in case stored steps somehow
 * exceed the path length.
 */
export function progressPct(
  progress: PathProgress,
  pathId: string,
  totalSteps: number,
): number {
  if (typeof totalSteps !== "number" || !Number.isFinite(totalSteps) || totalSteps <= 0) {
    return 0;
  }
  const done = completedCount(progress, pathId);
  return Math.min(100, Math.round((done / totalSteps) * 100));
}

/**
 * Mark `stepN` complete for `pathId`. Pure and idempotent: if the step is already
 * recorded the same blob reference is returned unchanged (so callers can skip a
 * needless write). Steps are kept ascending and de-duplicated. A non-positive or
 * non-integer `stepN` is ignored (returns the blob unchanged).
 */
export function markStepComplete(
  progress: PathProgress,
  pathId: string,
  stepN: number,
): PathProgress {
  if (!Number.isFinite(stepN) || stepN < 1) {
    return progress;
  }
  const step = Math.floor(stepN);
  const current = progress[pathId] ?? [];
  if (current.includes(step)) {
    return progress;
  }
  const nextSteps = [...current, step].sort((a, b) => a - b);
  return { ...progress, [pathId]: nextSteps };
}

/**
 * Unmark `stepN` for `pathId`. Pure: returns the same blob reference unchanged
 * when the step was not recorded. When a path drops to zero completed steps its
 * key is removed entirely, keeping the persisted blob minimal.
 */
export function unmarkStep(
  progress: PathProgress,
  pathId: string,
  stepN: number,
): PathProgress {
  const current = progress[pathId];
  if (!current || !current.includes(stepN)) {
    return progress;
  }
  const nextSteps = current.filter((s) => s !== stepN);
  const next = { ...progress };
  if (nextSteps.length === 0) {
    delete next[pathId];
  } else {
    next[pathId] = nextSteps;
  }
  return next;
}

/**
 * Toggle `stepN` for `pathId`: mark complete when absent, unmark when present.
 * Pair with `isStepComplete` on the result to know which way it went (and whether
 * to fire the analytics event, which should only fire on a completion).
 */
export function toggleStep(
  progress: PathProgress,
  pathId: string,
  stepN: number,
): PathProgress {
  if (isStepComplete(progress, pathId, stepN)) {
    return unmarkStep(progress, pathId, stepN);
  }
  return markStepComplete(progress, pathId, stepN);
}

/**
 * Read the persisted path progress. Returns a clean empty blob on the server, in
 * private mode, or when the stored value is missing or corrupt. Never throws.
 */
export function readPathProgress(): PathProgress {
  if (typeof window === "undefined") {
    return createInitialPathProgress();
  }
  try {
    const raw = window.localStorage.getItem(PATH_PROGRESS_STORAGE_KEY);
    if (!raw) {
      return createInitialPathProgress();
    }
    return normalizePathProgress(JSON.parse(raw));
  } catch {
    return createInitialPathProgress();
  }
}

/**
 * Persist the path progress. Best-effort: silently no-ops on the server and on
 * any storage failure (private mode, quota). Never throws.
 */
export function writePathProgress(progress: PathProgress): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      PATH_PROGRESS_STORAGE_KEY,
      JSON.stringify(progress),
    );
  } catch {
    // no-op: persistence is best-effort.
  }
}
