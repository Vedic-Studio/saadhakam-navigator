import { describe, expect, it } from "vitest";
import {
  researchers,
  getAllResearchers,
  getResearcherBySlug,
  type Researcher,
} from "./researchers";
import { sites } from "./sites";
import { evidenceItems } from "./evidence";

describe("researchers data integrity", () => {
  // -------------------------------------------------------------------------
  // Schema shape tests
  // -------------------------------------------------------------------------
  describe("schema shape", () => {
    it("has at least 10 researchers", () => {
      expect(researchers.length).toBeGreaterThanOrEqual(10);
    });

    it("every researcher has required fields", () => {
      const required: (keyof Researcher)[] = [
        "id",
        "name",
        "title",
        "affiliation",
        "methodology",
        "keyClaims",
        "majorWorks",
        "icon",
        "relatedSites",
        "relatedEvidence",
        "description",
        "metaDescription",
      ];
      for (const r of researchers) {
        for (const field of required) {
          expect(
            r[field],
            `Researcher "${r.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate researcher IDs", () => {
      const ids = researchers.map((r) => r.id);
      expect(ids.length).toBe(new Set(ids).size);
    });
  });

  // -------------------------------------------------------------------------
  // Data quality tests
  // -------------------------------------------------------------------------
  describe("data quality", () => {
    it("name is non-empty for every researcher", () => {
      for (const r of researchers) {
        expect(
          r.name.length,
          `Researcher "${r.id}" has empty name`
        ).toBeGreaterThan(0);
      }
    });

    it("description is non-empty for every researcher", () => {
      for (const r of researchers) {
        expect(
          r.description.length,
          `Researcher "${r.id}" has empty description`
        ).toBeGreaterThan(0);
      }
    });

    it("metaDescription is under 160 characters", () => {
      for (const r of researchers) {
        expect(
          r.metaDescription.length,
          `Researcher "${r.id}" metaDescription is ${r.metaDescription.length} chars (max 160)`
        ).toBeLessThanOrEqual(160);
      }
    });

    it("every researcher has at least one key claim", () => {
      for (const r of researchers) {
        expect(
          r.keyClaims.length,
          `Researcher "${r.id}" has no keyClaims`
        ).toBeGreaterThan(0);
      }
    });

    it("every researcher has at least one major work", () => {
      for (const r of researchers) {
        expect(
          r.majorWorks.length,
          `Researcher "${r.id}" has no majorWorks`
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
      for (const r of researchers) {
        for (const sid of r.relatedSites) {
          expect(
            siteIds.has(sid),
            `Researcher "${r.id}" references unknown site "${sid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedEvidence IDs exist in evidence data", () => {
      const evidenceIds = new Set(evidenceItems.map((e) => e.id));
      for (const r of researchers) {
        for (const eid of r.relatedEvidence) {
          expect(
            evidenceIds.has(eid),
            `Researcher "${r.id}" references unknown evidence "${eid}"`
          ).toBe(true);
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Helper function tests
  // -------------------------------------------------------------------------
  describe("helper functions", () => {
    it("getAllResearchers returns the full array", () => {
      expect(getAllResearchers()).toBe(researchers);
    });

    it("getResearcherBySlug returns correct researcher for known slug", () => {
      const r = getResearcherBySlug("nilesh-oak");
      expect(r).toBeDefined();
      expect(r?.name).toBe("Nilesh Nilkanth Oak");
    });

    it("getResearcherBySlug returns undefined for unknown slug", () => {
      expect(getResearcherBySlug("nonexistent")).toBeUndefined();
    });
  });
});
