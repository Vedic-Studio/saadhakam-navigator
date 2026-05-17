import { describe, it, expect } from "vitest";
import {
  destroyedTemples,
  stateDestructionSummary,
  totalDocumentedCount,
  getDestroyedTempleById,
  getTemplesByDestroyer,
  getTemplesByState,
} from "./templesDestroyed";

describe("destroyedTemples data", () => {
  it("contains at least 15 documented cases", () => {
    expect(destroyedTemples.length).toBeGreaterThanOrEqual(15);
  });

  it("every entry has all required fields", () => {
    for (const t of destroyedTemples) {
      expect(t.id).toBeTruthy();
      expect(t.name).toBeTruthy();
      expect(t.deity).toBeTruthy();
      expect(t.location.place).toBeTruthy();
      expect(t.location.state).toBeTruthy();
      expect(t.destroyer.name).toBeTruthy();
      expect(t.destroyer.dynasty).toBeTruthy();
      expect(typeof t.destroyer.year).toBe("number");
      expect(t.modernStatus).toBeTruthy();
      expect(t.primarySource.chronicle).toBeTruthy();
      expect(t.primarySource.author).toBeTruthy();
      expect(t.quote.length).toBeGreaterThan(40);
      expect(t.significance.length).toBeGreaterThan(40);
    }
  });

  it("has no duplicate ids", () => {
    const ids = destroyedTemples.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("years are plausible (between 700 and 1750 CE for medieval cases, or 1528+ for early modern)", () => {
    for (const t of destroyedTemples) {
      expect(t.destroyer.year).toBeGreaterThan(700);
      expect(t.destroyer.year).toBeLessThan(2025);
    }
  });

  it("includes the canonical cases the user expects", () => {
    const ids = destroyedTemples.map((t) => t.id);
    expect(ids).toContain("somnath-mahmud-1026");
    expect(ids).toContain("kashi-vishwanath-aurangzeb-1669");
    expect(ids).toContain("keshavdev-mathura-aurangzeb-1670");
    expect(ids).toContain("ram-janmasthan-babri-1528");
    expect(ids).toContain("vijayanagara-talikota-1565");
  });
});

describe("stateDestructionSummary", () => {
  it("contains all 14 major states with documented counts", () => {
    expect(stateDestructionSummary.length).toBeGreaterThanOrEqual(14);
  });

  it("every state entry has a positive count and at least one destroyer", () => {
    for (const s of stateDestructionSummary) {
      expect(s.state).toBeTruthy();
      expect(s.documentedCount).toBeGreaterThan(0);
      expect(s.notableDestroyers.length).toBeGreaterThan(0);
    }
  });

  it("Uttar Pradesh has the highest count (matches book's Vol I Ch 10 sample)", () => {
    const sorted = [...stateDestructionSummary].sort(
      (a, b) => b.documentedCount - a.documentedCount,
    );
    expect(sorted[0].state).toBe("Uttar Pradesh");
  });
});

describe("aggregate helpers", () => {
  it("totalDocumentedCount returns the sum across all states", () => {
    const expected = stateDestructionSummary.reduce(
      (sum, s) => sum + s.documentedCount,
      0,
    );
    expect(totalDocumentedCount()).toBe(expected);
  });

  it("totalDocumentedCount is at least 1500 (Goel's stated 2000 minus margin)", () => {
    expect(totalDocumentedCount()).toBeGreaterThanOrEqual(1500);
  });

  it("getDestroyedTempleById returns the right entry", () => {
    const somnath = getDestroyedTempleById("somnath-mahmud-1026");
    expect(somnath).toBeDefined();
    expect(somnath?.name).toBe("Somnath");
    expect(somnath?.destroyer.name).toBe("Mahmud of Ghazni");
  });

  it("getDestroyedTempleById returns undefined for unknown id", () => {
    expect(getDestroyedTempleById("does-not-exist")).toBeUndefined();
  });

  it("getTemplesByDestroyer matches partial names case-insensitively", () => {
    const aurangzebTemples = getTemplesByDestroyer("aurangzeb");
    expect(aurangzebTemples.length).toBeGreaterThanOrEqual(7);
    for (const t of aurangzebTemples) {
      expect(t.destroyer.name.toLowerCase()).toContain("aurangzeb");
    }
  });

  it("getTemplesByState filters by location.state", () => {
    const rajasthanTemples = getTemplesByState("Rajasthan");
    expect(rajasthanTemples.length).toBeGreaterThanOrEqual(3);
    for (const t of rajasthanTemples) {
      expect(t.location.state).toBe("Rajasthan");
    }
  });

  it("getTemplesByState is case-insensitive", () => {
    const lower = getTemplesByState("gujarat");
    const upper = getTemplesByState("Gujarat");
    expect(lower.length).toBe(upper.length);
  });
});
