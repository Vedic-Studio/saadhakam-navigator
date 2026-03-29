import { describe, expect, it } from "vitest";
import {
  timelineEras,
  archaeologicalSites,
  dynastyNodes,
  researchers,
  evidenceItems,
  historyFaqs,
  getAllTimelineEvents,
  getSiteById,
  getResearcherById,
  getEvidenceByStatus,
  getDynastyNodeById,
  type TimelineEra,
  type ArchaeologicalSite,
  type Researcher,
  type EvidenceItem,
  type DynastyNode,
} from "./history";

describe("history data integrity", () => {
  // -------------------------------------------------------------------------
  // Timeline Eras
  // -------------------------------------------------------------------------
  describe("timelineEras", () => {
    it("has at least 5 eras", () => {
      expect(timelineEras.length).toBeGreaterThanOrEqual(5);
    });

    it("every era has required fields", () => {
      const required: (keyof TimelineEra)[] = [
        "id",
        "name",
        "dateRange",
        "startYear",
        "endYear",
        "color",
        "events",
      ];
      for (const era of timelineEras) {
        for (const field of required) {
          expect(
            era[field],
            `Era "${era.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate era IDs", () => {
      const ids = timelineEras.map((e) => e.id);
      expect(ids.length).toBe(new Set(ids).size);
    });

    it("every era has at least one event", () => {
      for (const era of timelineEras) {
        expect(
          era.events.length,
          `Era "${era.id}" has no events`
        ).toBeGreaterThan(0);
      }
    });

    it("event IDs are unique across all eras", () => {
      const allEvents = getAllTimelineEvents();
      const ids = allEvents.map((e) => e.id);
      expect(ids.length).toBe(new Set(ids).size);
    });

    it("events have valid evidenceType", () => {
      const valid = ["confirmed", "strong", "open"];
      for (const event of getAllTimelineEvents()) {
        expect(
          valid,
          `Event "${event.id}" has invalid evidenceType "${event.evidenceType}"`
        ).toContain(event.evidenceType);
      }
    });

    it("eras are ordered chronologically (oldest first)", () => {
      for (let i = 1; i < timelineEras.length; i++) {
        expect(
          timelineEras[i].startYear,
          `Era "${timelineEras[i].id}" should come after "${timelineEras[i - 1].id}"`
        ).toBeGreaterThanOrEqual(timelineEras[i - 1].startYear);
      }
    });
  });

  // -------------------------------------------------------------------------
  // Archaeological Sites
  // -------------------------------------------------------------------------
  describe("archaeologicalSites", () => {
    it("has at least 8 sites", () => {
      expect(archaeologicalSites.length).toBeGreaterThanOrEqual(8);
    });

    it("every site has required fields", () => {
      const required: (keyof ArchaeologicalSite)[] = [
        "id",
        "name",
        "location",
        "dateRange",
        "keyFindings",
        "significance",
        "evidenceType",
      ];
      for (const site of archaeologicalSites) {
        for (const field of required) {
          expect(
            site[field],
            `Site "${site.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate site IDs", () => {
      const ids = archaeologicalSites.map((s) => s.id);
      expect(ids.length).toBe(new Set(ids).size);
    });

    it("every site has at least one key finding", () => {
      for (const site of archaeologicalSites) {
        expect(
          site.keyFindings.length,
          `Site "${site.id}" has no keyFindings`
        ).toBeGreaterThan(0);
      }
    });

    it("getSiteById returns correct site", () => {
      const site = getSiteById("mehrgarh");
      expect(site).toBeDefined();
      expect(site?.name).toBe("Mehrgarh");
    });

    it("getSiteById returns undefined for unknown ID", () => {
      expect(getSiteById("nonexistent")).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Dynasty Nodes
  // -------------------------------------------------------------------------
  describe("dynastyNodes", () => {
    it("has at least 15 nodes", () => {
      expect(dynastyNodes.length).toBeGreaterThanOrEqual(15);
    });

    it("every node has required fields", () => {
      const required: (keyof DynastyNode)[] = [
        "id",
        "name",
        "branch",
        "children",
      ];
      for (const node of dynastyNodes) {
        for (const field of required) {
          expect(
            node[field],
            `Node "${node.id}" missing field "${field}"`
          ).toBeDefined();
        }
      }
    });

    it("has no duplicate node IDs", () => {
      const ids = dynastyNodes.map((n) => n.id);
      expect(ids.length).toBe(new Set(ids).size);
    });

    it("children reference valid node IDs", () => {
      const allIds = new Set(dynastyNodes.map((n) => n.id));
      for (const node of dynastyNodes) {
        for (const childId of node.children) {
          expect(
            allIds.has(childId),
            `Node "${node.id}" references unknown child "${childId}"`
          ).toBe(true);
        }
      }
    });

    it("parent references valid node IDs", () => {
      const allIds = new Set(dynastyNodes.map((n) => n.id));
      for (const node of dynastyNodes) {
        if (node.parent) {
          expect(
            allIds.has(node.parent),
            `Node "${node.id}" references unknown parent "${node.parent}"`
          ).toBe(true);
        }
      }
    });

    it("has exactly one root node (no parent)", () => {
      const roots = dynastyNodes.filter((n) => !n.parent);
      expect(roots.length).toBe(1);
      expect(roots[0].id).toBe("brahma");
    });

    it("getDynastyNodeById works", () => {
      expect(getDynastyNodeById("rama")?.name).toBe("Rama");
      expect(getDynastyNodeById("nonexistent")).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Researchers
  // -------------------------------------------------------------------------
  describe("researchers", () => {
    it("has at least 4 researchers", () => {
      expect(researchers.length).toBeGreaterThanOrEqual(4);
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

    it("getResearcherById works", () => {
      expect(getResearcherById("nilesh-oak")?.name).toBe(
        "Nilesh Nilkanth Oak"
      );
      expect(getResearcherById("nonexistent")).toBeUndefined();
    });
  });

  // -------------------------------------------------------------------------
  // Evidence Items
  // -------------------------------------------------------------------------
  describe("evidenceItems", () => {
    it("has at least 29 items", () => {
      expect(evidenceItems.length).toBeGreaterThanOrEqual(29);
    });

    it("every item has required fields", () => {
      const required: (keyof EvidenceItem)[] = [
        "id",
        "claim",
        "status",
        "evidence",
        "notes",
        "category",
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

    it("has items in all three status tiers", () => {
      expect(getEvidenceByStatus("confirmed").length).toBeGreaterThan(0);
      expect(getEvidenceByStatus("strong").length).toBeGreaterThan(0);
      expect(getEvidenceByStatus("open").length).toBeGreaterThan(0);
    });

    it("every item has a valid category", () => {
      const validCategories = [
        "astronomical",
        "geological",
        "genetic",
        "archaeological",
        "cross-cultural",
        "historiographical",
      ];
      for (const item of evidenceItems) {
        expect(
          validCategories,
          `Evidence "${item.id}" has invalid category "${item.category}"`
        ).toContain(item.category);
      }
    });
  });

  // -------------------------------------------------------------------------
  // FAQs
  // -------------------------------------------------------------------------
  describe("historyFaqs", () => {
    it("has at least 10 FAQs", () => {
      expect(historyFaqs.length).toBeGreaterThanOrEqual(10);
    });

    it("every FAQ has question and answer", () => {
      for (const faq of historyFaqs) {
        expect(faq.question.length).toBeGreaterThan(0);
        expect(faq.answer.length).toBeGreaterThan(0);
      }
    });

    it("every question ends with a question mark", () => {
      for (const faq of historyFaqs) {
        expect(
          faq.question.endsWith("?"),
          `FAQ "${faq.question}" doesn't end with ?`
        ).toBe(true);
      }
    });
  });
});
