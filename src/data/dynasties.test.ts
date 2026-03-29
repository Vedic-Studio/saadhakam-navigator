import { describe, expect, it } from "vitest";
import {
  dynasties,
  getAllDynasties,
  getDynastyBySlug,
  getDynastiesByBranch,
  type DynastyProfile,
} from "./dynasties";
import { sites } from "./sites";
import { eras } from "./eras";

describe("dynasties data integrity", () => {
  // -------------------------------------------------------------------------
  // Schema shape tests
  // -------------------------------------------------------------------------
  describe("schema shape", () => {
    it("has at least 10 dynasties", () => {
      expect(dynasties.length).toBeGreaterThanOrEqual(10);
    });

    it("every dynasty has required fields", () => {
      const required: (keyof DynastyProfile)[] = [
        "id",
        "name",
        "branch",
        "dateRange",
        "startYear",
        "endYear",
        "keyRulers",
        "description",
        "significance",
        "relatedSites",
        "relatedEras",
        "relatedDynasties",
        "dynastyNodeIds",
        "metaDescription",
      ];
      for (const d of dynasties) {
        for (const field of required) {
          expect(
            d[field],
            `Dynasty "${d.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate dynasty IDs", () => {
      const ids = dynasties.map((d) => d.id);
      expect(ids.length).toBe(new Set(ids).size);
    });
  });

  // -------------------------------------------------------------------------
  // Data quality tests
  // -------------------------------------------------------------------------
  describe("data quality", () => {
    it("name is non-empty for every dynasty", () => {
      for (const d of dynasties) {
        expect(
          d.name.length,
          `Dynasty "${d.id}" has empty name`
        ).toBeGreaterThan(0);
      }
    });

    it("description is non-empty for every dynasty", () => {
      for (const d of dynasties) {
        expect(
          d.description.length,
          `Dynasty "${d.id}" has empty description`
        ).toBeGreaterThan(0);
      }
    });

    it("significance is non-empty for every dynasty", () => {
      for (const d of dynasties) {
        expect(
          d.significance.length,
          `Dynasty "${d.id}" has empty significance`
        ).toBeGreaterThan(0);
      }
    });

    it("metaDescription is under 160 characters", () => {
      for (const d of dynasties) {
        expect(
          d.metaDescription.length,
          `Dynasty "${d.id}" metaDescription is ${d.metaDescription.length} chars (max 160)`
        ).toBeLessThanOrEqual(160);
      }
    });

    it("branch is from valid set", () => {
      const valid = ["solar", "lunar", "historical"];
      for (const d of dynasties) {
        expect(
          valid,
          `Dynasty "${d.id}" has invalid branch "${d.branch}"`
        ).toContain(d.branch);
      }
    });

    it("every dynasty has at least one key ruler", () => {
      for (const d of dynasties) {
        expect(
          d.keyRulers.length,
          `Dynasty "${d.id}" has no keyRulers`
        ).toBeGreaterThan(0);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Cross-reference integrity tests
  // -------------------------------------------------------------------------
  describe("cross-reference integrity", () => {
    it("relatedSites IDs exist in sites data", () => {
      const siteIds = new Set(sites.map((s) => s.id));
      for (const d of dynasties) {
        for (const sid of d.relatedSites) {
          expect(
            siteIds.has(sid),
            `Dynasty "${d.id}" references unknown site "${sid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedEras IDs exist in eras data", () => {
      const eraIds = new Set(eras.map((e) => e.id));
      for (const d of dynasties) {
        for (const eraId of d.relatedEras) {
          expect(
            eraIds.has(eraId),
            `Dynasty "${d.id}" references unknown era "${eraId}"`
          ).toBe(true);
        }
      }
    });

    it("relatedDynasties IDs exist in dynasties data", () => {
      const dynastyIds = new Set(dynasties.map((d) => d.id));
      for (const d of dynasties) {
        for (const did of d.relatedDynasties) {
          expect(
            dynastyIds.has(did),
            `Dynasty "${d.id}" references unknown dynasty "${did}"`
          ).toBe(true);
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Helper function tests
  // -------------------------------------------------------------------------
  describe("helper functions", () => {
    it("getAllDynasties returns the full array", () => {
      expect(getAllDynasties()).toBe(dynasties);
    });

    it("getDynastyBySlug returns correct dynasty for known slug", () => {
      const d = getDynastyBySlug("suryavansha");
      expect(d).toBeDefined();
      expect(d?.name).toBe("Solar Dynasty (Suryavansha)");
    });

    it("getDynastyBySlug returns undefined for unknown slug", () => {
      expect(getDynastyBySlug("nonexistent")).toBeUndefined();
    });

    it("getDynastiesByBranch returns correct subset", () => {
      const solar = getDynastiesByBranch("solar");
      expect(solar.length).toBeGreaterThan(0);
      for (const d of solar) {
        expect(d.branch).toBe("solar");
      }
    });

    it("getDynastiesByBranch returns items in all branches", () => {
      expect(getDynastiesByBranch("solar").length).toBeGreaterThan(0);
      expect(getDynastiesByBranch("lunar").length).toBeGreaterThan(0);
      expect(getDynastiesByBranch("historical").length).toBeGreaterThan(0);
    });
  });
});
