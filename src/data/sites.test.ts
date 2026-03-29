import { describe, expect, it } from "vitest";
import {
  sites,
  getAllSites,
  getSiteBySlug,
  getSitesByRegion,
  getSitesByEvidence,
  type ArchaeologicalSite,
} from "./sites";
import { researchers } from "./researchers";
import { evidenceItems } from "./evidence";
import { eras } from "./eras";

describe("sites data integrity", () => {
  // -------------------------------------------------------------------------
  // Schema shape tests
  // -------------------------------------------------------------------------
  describe("schema shape", () => {
    it("has at least 15 sites", () => {
      expect(sites.length).toBeGreaterThanOrEqual(15);
    });

    it("every site has required fields", () => {
      const required: (keyof ArchaeologicalSite)[] = [
        "id",
        "name",
        "location",
        "region",
        "dateRange",
        "startYear",
        "endYear",
        "keyFindings",
        "significance",
        "evidenceType",
        "description",
        "relatedResearchers",
        "relatedEvidence",
        "relatedEras",
        "metaDescription",
      ];
      for (const site of sites) {
        for (const field of required) {
          expect(
            site[field],
            `Site "${site.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate site IDs", () => {
      const ids = sites.map((s) => s.id);
      expect(ids.length).toBe(new Set(ids).size);
    });
  });

  // -------------------------------------------------------------------------
  // Data quality tests
  // -------------------------------------------------------------------------
  describe("data quality", () => {
    it("name is non-empty for every site", () => {
      for (const site of sites) {
        expect(
          site.name.length,
          `Site "${site.id}" has empty name`
        ).toBeGreaterThan(0);
      }
    });

    it("description is non-empty for every site", () => {
      for (const site of sites) {
        expect(
          site.description.length,
          `Site "${site.id}" has empty description`
        ).toBeGreaterThan(0);
      }
    });

    it("significance is non-empty for every site", () => {
      for (const site of sites) {
        expect(
          site.significance.length,
          `Site "${site.id}" has empty significance`
        ).toBeGreaterThan(0);
      }
    });

    it("metaDescription is under 160 characters", () => {
      for (const site of sites) {
        expect(
          site.metaDescription.length,
          `Site "${site.id}" metaDescription is ${site.metaDescription.length} chars (max 160)`
        ).toBeLessThanOrEqual(160);
      }
    });

    it("evidenceType is from valid set", () => {
      const valid = ["confirmed", "strong", "open"];
      for (const site of sites) {
        expect(
          valid,
          `Site "${site.id}" has invalid evidenceType "${site.evidenceType}"`
        ).toContain(site.evidenceType);
      }
    });

    it("region is from valid set", () => {
      const valid = ["south-asia", "west-asia", "global"];
      for (const site of sites) {
        expect(
          valid,
          `Site "${site.id}" has invalid region "${site.region}"`
        ).toContain(site.region);
      }
    });

    it("every site has at least one key finding", () => {
      for (const site of sites) {
        expect(
          site.keyFindings.length,
          `Site "${site.id}" has no keyFindings`
        ).toBeGreaterThan(0);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Cross-reference integrity tests
  // -------------------------------------------------------------------------
  describe("cross-reference integrity", () => {
    it("relatedResearchers IDs exist in researchers data", () => {
      const researcherIds = new Set(researchers.map((r) => r.id));
      for (const site of sites) {
        for (const rid of site.relatedResearchers) {
          expect(
            researcherIds.has(rid),
            `Site "${site.id}" references unknown researcher "${rid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedEvidence IDs exist in evidence data", () => {
      const evidenceIds = new Set(evidenceItems.map((e) => e.id));
      for (const site of sites) {
        for (const eid of site.relatedEvidence) {
          expect(
            evidenceIds.has(eid),
            `Site "${site.id}" references unknown evidence "${eid}"`
          ).toBe(true);
        }
      }
    });

    it("relatedEras IDs exist in eras data", () => {
      const eraIds = new Set(eras.map((e) => e.id));
      for (const site of sites) {
        for (const eraId of site.relatedEras) {
          expect(
            eraIds.has(eraId),
            `Site "${site.id}" references unknown era "${eraId}"`
          ).toBe(true);
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Helper function tests
  // -------------------------------------------------------------------------
  describe("helper functions", () => {
    it("getAllSites returns the full array", () => {
      expect(getAllSites()).toBe(sites);
    });

    it("getSiteBySlug returns correct site for known slug", () => {
      const site = getSiteBySlug("mehrgarh");
      expect(site).toBeDefined();
      expect(site?.name).toBe("Mehrgarh");
    });

    it("getSiteBySlug returns undefined for unknown slug", () => {
      expect(getSiteBySlug("nonexistent")).toBeUndefined();
    });

    it("getSitesByRegion returns correct subset", () => {
      const westAsia = getSitesByRegion("west-asia");
      expect(westAsia.length).toBeGreaterThan(0);
      for (const site of westAsia) {
        expect(site.region).toBe("west-asia");
      }
    });

    it("getSitesByEvidence returns correct subset", () => {
      const confirmed = getSitesByEvidence("confirmed");
      expect(confirmed.length).toBeGreaterThan(0);
      for (const site of confirmed) {
        expect(site.evidenceType).toBe("confirmed");
      }
    });
  });
});
