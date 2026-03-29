import { describe, expect, it } from "vitest";
import {
  civilizationComparisons,
  getAllCivilizationComparisons,
  getCivilizationBySlug,
  type CivilizationComparison,
} from "./civilizations";
import { sites } from "./sites";
import { eras } from "./eras";
import { evidenceItems } from "./evidence";

describe("civilizations data integrity", () => {
  // -------------------------------------------------------------------------
  // Schema shape tests
  // -------------------------------------------------------------------------
  describe("schema shape", () => {
    it("has at least 6 civilization comparisons", () => {
      expect(civilizationComparisons.length).toBeGreaterThanOrEqual(6);
    });

    it("every comparison has required fields", () => {
      const required: (keyof CivilizationComparison)[] = [
        "id",
        "title",
        "entityA",
        "entityB",
        "metaDescription",
        "description",
        "comparisonPoints",
        "keyInsight",
        "relatedSites",
        "relatedEras",
        "relatedEvidence",
      ];
      for (const c of civilizationComparisons) {
        for (const field of required) {
          expect(
            c[field],
            `Civilization "${c.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate civilization IDs", () => {
      const ids = civilizationComparisons.map((c) => c.id);
      expect(ids.length).toBe(new Set(ids).size);
    });
  });

  // -------------------------------------------------------------------------
  // Data quality tests
  // -------------------------------------------------------------------------
  describe("data quality", () => {
    it("title is non-empty for every comparison", () => {
      for (const c of civilizationComparisons) {
        expect(
          c.title.length,
          `Civilization "${c.id}" has empty title`
        ).toBeGreaterThan(0);
      }
    });

    it("description is non-empty for every comparison", () => {
      for (const c of civilizationComparisons) {
        expect(
          c.description.length,
          `Civilization "${c.id}" has empty description`
        ).toBeGreaterThan(0);
      }
    });

    it("metaDescription is under 160 characters", () => {
      for (const c of civilizationComparisons) {
        expect(
          c.metaDescription.length,
          `Civilization "${c.id}" metaDescription is ${c.metaDescription.length} chars (max 160)`
        ).toBeLessThanOrEqual(160);
      }
    });

    it("keyInsight is non-empty for every comparison", () => {
      for (const c of civilizationComparisons) {
        expect(
          c.keyInsight.length,
          `Civilization "${c.id}" has empty keyInsight`
        ).toBeGreaterThan(0);
      }
    });

    it("every comparison has at least one comparison point", () => {
      for (const c of civilizationComparisons) {
        expect(
          c.comparisonPoints.length,
          `Civilization "${c.id}" has no comparisonPoints`
        ).toBeGreaterThan(0);
      }
    });

    it("every comparison point has india and other fields", () => {
      for (const c of civilizationComparisons) {
        for (const point of c.comparisonPoints) {
          expect(
            point.india.length,
            `Civilization "${c.id}" has a comparison point with empty india field`
          ).toBeGreaterThan(0);
          expect(
            point.other.length,
            `Civilization "${c.id}" has a comparison point with empty other field`
          ).toBeGreaterThan(0);
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Cross-reference integrity tests
  // -------------------------------------------------------------------------
  describe("cross-reference integrity", () => {
    it("relatedSites IDs exist in sites data", () => {
      const siteIds = new Set(sites.map((s) => s.id));
      for (const c of civilizationComparisons) {
        for (const sid of c.relatedSites) {
          expect(
            siteIds.has(sid),
            `Civilization "${c.id}" references unknown site "${sid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedEras IDs exist in eras data", () => {
      const eraIds = new Set(eras.map((e) => e.id));
      for (const c of civilizationComparisons) {
        for (const eraId of c.relatedEras) {
          expect(
            eraIds.has(eraId),
            `Civilization "${c.id}" references unknown era "${eraId}"`
          ).toBe(true);
        }
      }
    });

    it("relatedEvidence IDs exist in evidence data", () => {
      const evidenceIds = new Set(evidenceItems.map((e) => e.id));
      for (const c of civilizationComparisons) {
        for (const eid of c.relatedEvidence) {
          expect(
            evidenceIds.has(eid),
            `Civilization "${c.id}" references unknown evidence "${eid}"`
          ).toBe(true);
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Helper function tests
  // -------------------------------------------------------------------------
  describe("helper functions", () => {
    it("getAllCivilizationComparisons returns the full array", () => {
      expect(getAllCivilizationComparisons()).toBe(civilizationComparisons);
    });

    it("getCivilizationBySlug returns correct item for known slug", () => {
      const c = getCivilizationBySlug("india-vs-mesopotamia");
      expect(c).toBeDefined();
      expect(c?.title).toBe("Ancient India vs Mesopotamia");
    });

    it("getCivilizationBySlug returns undefined for unknown slug", () => {
      expect(getCivilizationBySlug("nonexistent")).toBeUndefined();
    });
  });
});
