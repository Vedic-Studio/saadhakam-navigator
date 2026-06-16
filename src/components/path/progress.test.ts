import { describe, it, expect, beforeEach } from "vitest";
import {
  PATH_PROGRESS_STORAGE_KEY,
  createInitialPathProgress,
  normalizePathProgress,
  isStepComplete,
  completedCount,
  progressPct,
  markStepComplete,
  unmarkStep,
  toggleStep,
  readPathProgress,
  writePathProgress,
  type PathProgress,
} from "./progress";

const PATH = "darshanas-foundations";

describe("createInitialPathProgress", () => {
  it("returns an empty object", () => {
    expect(createInitialPathProgress()).toEqual({});
  });
});

describe("normalizePathProgress", () => {
  it("returns empty for non-objects, arrays, and null", () => {
    expect(normalizePathProgress(null)).toEqual({});
    expect(normalizePathProgress(undefined)).toEqual({});
    expect(normalizePathProgress("nope")).toEqual({});
    expect(normalizePathProgress(42)).toEqual({});
    expect(normalizePathProgress([1, 2, 3])).toEqual({});
  });

  it("de-duplicates, sorts ascending, and floors step numbers", () => {
    expect(normalizePathProgress({ [PATH]: [3, 1, 2, 2, 3] })).toEqual({
      [PATH]: [1, 2, 3],
    });
    expect(normalizePathProgress({ [PATH]: [2.9, 1.2] })).toEqual({
      [PATH]: [1, 2],
    });
  });

  it("drops non-numeric, non-finite, and non-positive step values", () => {
    expect(
      normalizePathProgress({
        [PATH]: [1, "2", null, NaN, Infinity, 0, -3, 4],
      }),
    ).toEqual({ [PATH]: [1, 4] });
  });

  it("omits paths whose steps normalize to empty, and drops empty keys", () => {
    expect(
      normalizePathProgress({ [PATH]: [1], empty: [], "": [9], bad: "x" }),
    ).toEqual({ [PATH]: [1] });
  });

  it("keeps multiple valid paths independent", () => {
    expect(normalizePathProgress({ a: [1, 2], b: [5] })).toEqual({
      a: [1, 2],
      b: [5],
    });
  });
});

describe("isStepComplete / completedCount", () => {
  const progress: PathProgress = { [PATH]: [1, 3] };

  it("reports membership correctly", () => {
    expect(isStepComplete(progress, PATH, 1)).toBe(true);
    expect(isStepComplete(progress, PATH, 2)).toBe(false);
    expect(isStepComplete(progress, PATH, 3)).toBe(true);
  });

  it("is false for an unknown path", () => {
    expect(isStepComplete(progress, "other", 1)).toBe(false);
  });

  it("counts completed steps, 0 for unknown path", () => {
    expect(completedCount(progress, PATH)).toBe(2);
    expect(completedCount(progress, "other")).toBe(0);
  });
});

describe("progressPct (goal-gradient)", () => {
  it("computes a rounded percentage of total steps", () => {
    expect(progressPct({ [PATH]: [1] }, PATH, 6)).toBe(17); // 16.67 -> 17
    expect(progressPct({ [PATH]: [1, 2, 3] }, PATH, 6)).toBe(50);
    expect(progressPct({ [PATH]: [1, 2, 3, 4, 5, 6] }, PATH, 6)).toBe(100);
  });

  it("is 0 when no steps are done", () => {
    expect(progressPct({}, PATH, 6)).toBe(0);
  });

  it("returns 0 (never divides by zero) for a non-positive total", () => {
    expect(progressPct({ [PATH]: [1] }, PATH, 0)).toBe(0);
    expect(progressPct({ [PATH]: [1] }, PATH, -4)).toBe(0);
    expect(progressPct({ [PATH]: [1] }, PATH, NaN)).toBe(0);
  });

  it("clamps to 100 if stored steps exceed the path length", () => {
    expect(progressPct({ [PATH]: [1, 2, 3, 4] }, PATH, 2)).toBe(100);
  });
});

describe("markStepComplete", () => {
  it("adds a step and keeps the list ascending", () => {
    const next = markStepComplete({ [PATH]: [3] }, PATH, 1);
    expect(next[PATH]).toEqual([1, 3]);
  });

  it("creates the path entry when first marking a step", () => {
    expect(markStepComplete({}, PATH, 2)).toEqual({ [PATH]: [2] });
  });

  it("is idempotent and returns the same reference when already complete", () => {
    const progress: PathProgress = { [PATH]: [1, 2] };
    expect(markStepComplete(progress, PATH, 2)).toBe(progress);
  });

  it("ignores non-positive / non-integer steps (returns unchanged ref)", () => {
    const progress: PathProgress = { [PATH]: [1] };
    expect(markStepComplete(progress, PATH, 0)).toBe(progress);
    expect(markStepComplete(progress, PATH, -1)).toBe(progress);
    expect(markStepComplete(progress, PATH, NaN)).toBe(progress);
  });

  it("does not mutate the input blob", () => {
    const progress: PathProgress = { [PATH]: [1] };
    markStepComplete(progress, PATH, 2);
    expect(progress).toEqual({ [PATH]: [1] });
  });
});

describe("unmarkStep", () => {
  it("removes a completed step", () => {
    expect(unmarkStep({ [PATH]: [1, 2, 3] }, PATH, 2)).toEqual({
      [PATH]: [1, 3],
    });
  });

  it("removes the path key entirely when the last step is unmarked", () => {
    expect(unmarkStep({ [PATH]: [2] }, PATH, 2)).toEqual({});
  });

  it("returns the same reference when the step was not completed", () => {
    const progress: PathProgress = { [PATH]: [1] };
    expect(unmarkStep(progress, PATH, 5)).toBe(progress);
    expect(unmarkStep(progress, "other", 1)).toBe(progress);
  });
});

describe("toggleStep", () => {
  it("marks complete when absent then unmarks when present (round trip)", () => {
    const after1 = toggleStep({}, PATH, 4);
    expect(isStepComplete(after1, PATH, 4)).toBe(true);
    const after2 = toggleStep(after1, PATH, 4);
    expect(isStepComplete(after2, PATH, 4)).toBe(false);
    expect(after2).toEqual({});
  });
});

describe("readPathProgress / writePathProgress (jsdom localStorage)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns empty when nothing is stored", () => {
    expect(readPathProgress()).toEqual({});
  });

  it("round-trips a write then a read", () => {
    writePathProgress({ [PATH]: [1, 2] });
    expect(readPathProgress()).toEqual({ [PATH]: [1, 2] });
  });

  it("returns empty (never throws) on corrupt JSON", () => {
    window.localStorage.setItem(PATH_PROGRESS_STORAGE_KEY, "{not valid json");
    expect(readPathProgress()).toEqual({});
  });

  it("normalizes corrupt-but-parseable stored shapes on read", () => {
    window.localStorage.setItem(
      PATH_PROGRESS_STORAGE_KEY,
      JSON.stringify({ [PATH]: [3, 1, "2", -5], junk: "x" }),
    );
    expect(readPathProgress()).toEqual({ [PATH]: [1, 3] });
  });

  it("persists under the versioned key", () => {
    writePathProgress({ [PATH]: [1] });
    expect(
      window.localStorage.getItem(PATH_PROGRESS_STORAGE_KEY),
    ).toBe(JSON.stringify({ [PATH]: [1] }));
  });
});
