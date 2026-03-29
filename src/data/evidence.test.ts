import { describe, expect, it } from "vitest";
import {
  evidenceItems,
  getAllEvidence,
  getEvidenceBySlug,
  getEvidenceByConfidence,
  type EvidenceItem,
} from "./evidence";
import { researchers } from "./researchers";
import { sites } from "./sites";

describe("evidence data integrity", () => {
  // -------------------------------------------------------------------------
  // Schema shape tests
  // -------------------------------------------------------------------------
  describe("schema shape", () => {
    it("has at least 29 evidence items", () => {
      expect(evidenceItems.length).toBeGreaterThanOrEqual(29);
    });

    it("every item has required fields", () => {
      const required: (keyof EvidenceItem)[] = [
        "id",
        "claim",
        "status",
        "evidence",
        "notes",
        "fullDescription",
        "methodology",
        "relatedResearchers",
        "relatedSites",
        "metaDescription",
      ];
      for (const item of evidenceItems) {
        for (const field of required) {
          expect(
            item[field],
            `Evidence "${item.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate evidence IDs", () => {
      const ids = evidenceItems.map((e) => e.id);
      expect(ids.length).toBe(new Set(ids).size);
    });
  });

  // -------------------------------------------------------------------------
  // Data quality tests
  // -------------------------------------------------------------------------
  describe("data quality", () => {
    it("claim is non-empty for every item", () => {
      for (const item of evidenceItems) {
        expect(
          item.claim.length,
          `Evidence "${item.id}" has empty claim`
        ).toBeGreaterThan(0);
      }
    });

    it("fullDescription is non-empty for every item", () => {
      for (const item of evidenceItems) {
        expect(
          item.fullDescription.length,
          `Evidence "${item.id}" has empty fullDescription`
        ).toBeGreaterThan(0);
      }
    });

    it("metaDescription is under 160 characters", () => {
      for (const item of evidenceItems) {
        expect(
          item.metaDescription.length,
          `Evidence "${item.id}" metaDescription is ${item.metaDescription.length} chars (max 160)`
        ).toBeLessThanOrEqual(160);
      }
    });

    it("status is from valid set", () => {
      const valid = ["confirmed", "strong", "open"];
      for (const item of evidenceItems) {
        expect(
          valid,
          `Evidence "${item.id}" has invalid status "${item.status}"`
        ).toContain(item.status);
      }
    });

    it("has items in all three status categories", () => {
      expect(getEvidenceByConfidence("confirmed").length).toBeGreaterThan(0);
      expect(getEvidenceByConfidence("strong").length).toBeGreaterThan(0);
      expect(getEvidenceByConfidence("open").length).toBeGreaterThan(0);
    });
  });

  // -------------------------------------------------------------------------
  // Cross-reference integrity tests
  // -------------------------------------------------------------------------
  describe("cross-reference integrity", () => {
    it("relatedResearchers IDs exist in researchers data", () => {
      const researcherIds = new Set(researchers.map((r) => r.id));
      for (const item of evidenceItems) {
        for (const rid of item.relatedResearchers) {
          expect(
            researcherIds.has(rid),
            `Evidence "${item.id}" references unknown researcher "${rid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedSites IDs exist in sites data", () => {
      const siteIds = new Set(sites.map((s) => s.id));
      for (const item of evidenceItems) {
        for (const sid of item.relatedSites) {
          expect(
            siteIds.has(sid),
            `Evidence "${item.id}" references unknown site "${sid}"`
          ).toBe(true);
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Helper function tests
  // -------------------------------------------------------------------------
  describe("helper functions", () => {
    it("getAllEvidence returns the full array", () => {
      expect(getAllEvidence()).toBe(evidenceItems);
    });

    it("getEvidenceBySlug returns correct item for known slug", () => {
      const item = getEvidenceBySlug("av-observation");
      expect(item).toBeDefined();
      expect(item?.status).toBe("confirmed");
    });

    it("getEvidenceBySlug returns undefined for unknown slug", () => {
      expect(getEvidenceBySlug("nonexistent")).toBeUndefined();
    });

    it("getEvidenceByConfidence returns correct subset", () => {
      const confirmed = getEvidenceByConfidence("confirmed");
      expect(confirmed.length).toBeGreaterThan(0);
      for (const item of confirmed) {
        expect(item.status).toBe("confirmed");
      }
    });
  });
});
