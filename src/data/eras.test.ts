import { describe, expect, it } from "vitest";
import {
  eras,
  getAllEras,
  getEraBySlug,
  type EraProfile,
} from "./eras";
import { sites } from "./sites";
import { evidenceItems } from "./evidence";
import { dynasties } from "./dynasties";
import { researchers } from "./researchers";

describe("eras data integrity", () => {
  // -------------------------------------------------------------------------
  // Schema shape tests
  // -------------------------------------------------------------------------
  describe("schema shape", () => {
    it("has at least 5 eras", () => {
      expect(eras.length).toBeGreaterThanOrEqual(5);
    });

    it("every era has required fields", () => {
      const required: (keyof EraProfile)[] = [
        "id",
        "name",
        "dateRange",
        "startYear",
        "endYear",
        "color",
        "description",
        "significance",
        "globalContext",
        "relatedSites",
        "relatedEvidence",
        "relatedDynasties",
        "relatedResearchers",
        "keyQuestions",
        "metaDescription",
      ];
      for (const era of eras) {
        for (const field of required) {
          expect(
            era[field],
            `Era "${era.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate era IDs", () => {
      const ids = eras.map((e) => e.id);
      expect(ids.length).toBe(new Set(ids).size);
    });
  });

  // -------------------------------------------------------------------------
  // Data quality tests
  // -------------------------------------------------------------------------
  describe("data quality", () => {
    it("name is non-empty for every era", () => {
      for (const era of eras) {
        expect(
          era.name.length,
          `Era "${era.id}" has empty name`
        ).toBeGreaterThan(0);
      }
    });

    it("description is non-empty for every era", () => {
      for (const era of eras) {
        expect(
          era.description.length,
          `Era "${era.id}" has empty description`
        ).toBeGreaterThan(0);
      }
    });

    it("significance is non-empty for every era", () => {
      for (const era of eras) {
        expect(
          era.significance.length,
          `Era "${era.id}" has empty significance`
        ).toBeGreaterThan(0);
      }
    });

    it("metaDescription is under 160 characters", () => {
      for (const era of eras) {
        expect(
          era.metaDescription.length,
          `Era "${era.id}" metaDescription is ${era.metaDescription.length} chars (max 160)`
        ).toBeLessThanOrEqual(160);
      }
    });

    it("every era has at least one globalContext entry", () => {
      for (const era of eras) {
        expect(
          era.globalContext.length,
          `Era "${era.id}" has no globalContext`
        ).toBeGreaterThan(0);
      }
    });

    it("globalContext entries have non-empty region and description", () => {
      for (const era of eras) {
        for (const ctx of era.globalContext) {
          expect(
            ctx.region.length,
            `Era "${era.id}" has a globalContext with empty region`
          ).toBeGreaterThan(0);
          expect(
            ctx.description.length,
            `Era "${era.id}" has a globalContext with empty description`
          ).toBeGreaterThan(0);
        }
      }
    });

    it("every era has at least one key question", () => {
      for (const era of eras) {
        expect(
          era.keyQuestions.length,
          `Era "${era.id}" has no keyQuestions`
        ).toBeGreaterThan(0);
      }
    });

    it("eras are ordered chronologically (oldest first)", () => {
      for (let i = 1; i < eras.length; i++) {
        expect(
          eras[i].startYear,
          `Era "${eras[i].id}" should come after "${eras[i - 1].id}"`
        ).toBeGreaterThanOrEqual(eras[i - 1].startYear);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Cross-reference integrity tests
  // -------------------------------------------------------------------------
  describe("cross-reference integrity", () => {
    it("relatedSites IDs exist in sites data", () => {
      const siteIds = new Set(sites.map((s) => s.id));
      for (const era of eras) {
        for (const sid of era.relatedSites) {
          expect(
            siteIds.has(sid),
            `Era "${era.id}" references unknown site "${sid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedEvidence IDs exist in evidence data", () => {
      const evidenceIds = new Set(evidenceItems.map((e) => e.id));
      for (const era of eras) {
        for (const eid of era.relatedEvidence) {
          expect(
            evidenceIds.has(eid),
            `Era "${era.id}" references unknown evidence "${eid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedDynasties IDs exist in dynasties data", () => {
      const dynastyIds = new Set(dynasties.map((d) => d.id));
      for (const era of eras) {
        for (const did of era.relatedDynasties) {
          expect(
            dynastyIds.has(did),
            `Era "${era.id}" references unknown dynasty "${did}"`
          ).toBe(true);
        }
      }
    });

    it("relatedResearchers IDs exist in researchers data", () => {
      const researcherIds = new Set(researchers.map((r) => r.id));
      for (const era of eras) {
        for (const rid of era.relatedResearchers) {
          expect(
            researcherIds.has(rid),
            `Era "${era.id}" references unknown researcher "${rid}"`
          ).toBe(true);
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Helper function tests
  // -------------------------------------------------------------------------
  describe("helper functions", () => {
    it("getAllEras returns the full array", () => {
      expect(getAllEras()).toBe(eras);
    });

    it("getEraBySlug returns correct era for known slug", () => {
      const era = getEraBySlug("vedic");
      expect(era).toBeDefined();
      expect(era?.name).toBe("Rigvedic Period");
    });

    it("getEraBySlug returns undefined for unknown slug", () => {
      expect(getEraBySlug("nonexistent")).toBeUndefined();
    });
  });
});
