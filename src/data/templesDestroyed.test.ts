import { describe, it, expect } from "vitest";
import {
  destroyedTemples,
  stateDestructionSummary,
  totalDocumentedCount,
  getDestroyedTempleById,
  getTemplesByDestroyer,
  getTemplesByState,
  getTemplesByRegion,
  getTemplesByDistrict,
  getTemplesBySourceTier,
  TEMPLE_REGIONS,
} from "./templesDestroyed";

const ALLOWED_TIERS = new Set(["A-primary", "B-corroborated", "C-listed"]);
const ALLOWED_REGIONS = new Set(TEMPLE_REGIONS);

describe("destroyedTemples data", () => {
  it("contains at least 75 documented cases", () => {
    expect(destroyedTemples.length).toBeGreaterThanOrEqual(75);
  });

  it("every entry has all required core fields", () => {
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

  it("every entry has district and region populated", () => {
    for (const t of destroyedTemples) {
      expect(
        t.location.district,
        `${t.id} is missing location.district`,
      ).toBeTruthy();
      expect(
        t.location.region,
        `${t.id} is missing location.region`,
      ).toBeTruthy();
    }
  });

  it("every region value is in the allowed enum", () => {
    for (const t of destroyedTemples) {
      expect(
        t.location.region && ALLOWED_REGIONS.has(t.location.region),
        `${t.id} has invalid region: ${t.location.region}`,
      ).toBe(true);
    }
  });

  it("every entry has a sourceTier of A-primary | B-corroborated | C-listed", () => {
    for (const t of destroyedTemples) {
      expect(
        ALLOWED_TIERS.has(t.sourceTier),
        `${t.id} has invalid sourceTier: ${t.sourceTier}`,
      ).toBe(true);
    }
  });

  it("primarySource.chronicle and primarySource.author are non-empty on every entry", () => {
    for (const t of destroyedTemples) {
      expect(t.primarySource.chronicle.trim().length, `${t.id} chronicle is empty`).toBeGreaterThan(0);
      expect(t.primarySource.author.trim().length, `${t.id} author is empty`).toBeGreaterThan(0);
    }
  });

  it("when coordinates are present, lat/lng are sensible numbers", () => {
    for (const t of destroyedTemples) {
      if (!t.location.coordinates) continue;
      const { lat, lng } = t.location.coordinates;
      expect(typeof lat).toBe("number");
      expect(typeof lng).toBe("number");
      expect(lat).toBeGreaterThan(5);
      expect(lat).toBeLessThan(40);
      expect(lng).toBeGreaterThan(65);
      expect(lng).toBeLessThan(100);
    }
  });

  it("has no duplicate ids", () => {
    const ids = destroyedTemples.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("years are plausible (between 700 and 2025 CE)", () => {
    for (const t of destroyedTemples) {
      expect(t.destroyer.year).toBeGreaterThan(700);
      expect(t.destroyer.year).toBeLessThan(2025);
    }
  });

  it("ids are kebab-case (lowercase letters, digits, hyphens only)", () => {
    const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    for (const t of destroyedTemples) {
      expect(kebab.test(t.id), `${t.id} is not kebab-case`).toBe(true);
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

  it("includes the Vol II Ch 6 epigraphic-evidence cases", () => {
    const ids = destroyedTemples.map((t) => t.id);
    expect(ids).toContain("srikakulam-sher-muhammad-1641");
    expect(ids).toContain("nuh-sainthali-bahadur-khan-1400");
    expect(ids).toContain("balasore-sri-chandi-1668");
    expect(ids).toContain("tadpatri-mahmud-1695");
    expect(ids).toContain("ritpur-aurangzeb-1878");
    expect(ids).toContain("patna-patthar-masjid-parwiz-1626");
  });

  it("covers at least the 14 major states from the state summary", () => {
    const states = new Set(destroyedTemples.map((t) => t.location.state));
    // J&K, Telangana (Maisaram) and West Bengal (Navadvipa) appear in addition.
    expect(states.size).toBeGreaterThanOrEqual(14);
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

  it("getTemplesByRegion returns at least one entry for every populated region", () => {
    const regionsInData = new Set(
      destroyedTemples
        .map((t) => t.location.region)
        .filter((r): r is NonNullable<typeof r> => Boolean(r)),
    );
    for (const region of regionsInData) {
      const matches = getTemplesByRegion(region);
      expect(matches.length).toBeGreaterThan(0);
    }
  });

  it("getTemplesByDistrict is case-insensitive and returns matches when known", () => {
    const lower = getTemplesByDistrict("varanasi");
    const upper = getTemplesByDistrict("Varanasi");
    expect(lower.length).toBe(upper.length);
    expect(lower.length).toBeGreaterThan(0);
  });

  it("getTemplesBySourceTier filters correctly and the three tiers all have entries", () => {
    const aTier = getTemplesBySourceTier("A-primary");
    const bTier = getTemplesBySourceTier("B-corroborated");
    const cTier = getTemplesBySourceTier("C-listed");
    expect(aTier.length).toBeGreaterThan(0);
    expect(bTier.length).toBeGreaterThan(0);
    expect(cTier.length).toBeGreaterThan(0);
    expect(aTier.length + bTier.length + cTier.length).toBe(
      destroyedTemples.length,
    );
  });
});
