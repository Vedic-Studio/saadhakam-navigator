import { describe, it, expect } from "vitest";
import { dynasties, getDynastyById } from "@/data/dynasties";
import { eras, getEraById } from "@/data/eras";
import { sites, getSiteById } from "@/data/sites";
import { researchers, getResearcherById } from "@/data/researchers";
import { evidenceItems, getEvidenceById } from "@/data/evidence";
import {
  archaeologicalSites,
  researchers as hubResearchers,
  evidenceItems as hubEvidence,
} from "@/data/history";

// =============================================================================
// Cross-reference validation between standalone history data files
// =============================================================================

describe("dynasties cross-references", () => {
  it("relatedSites resolve to sites.ts entries", () => {
    for (const dynasty of dynasties) {
      for (const siteId of dynasty.relatedSites) {
        expect(
          getSiteById(siteId),
          `Dynasty "${dynasty.name}" (${dynasty.id}) references site "${siteId}" which doesn't exist in sites.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedEras resolve to eras.ts entries", () => {
    for (const dynasty of dynasties) {
      for (const eraId of dynasty.relatedEras) {
        expect(
          getEraById(eraId),
          `Dynasty "${dynasty.name}" (${dynasty.id}) references era "${eraId}" which doesn't exist in eras.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedDynasties resolve to dynasties.ts entries", () => {
    for (const dynasty of dynasties) {
      for (const dynastyId of dynasty.relatedDynasties) {
        expect(
          getDynastyById(dynastyId),
          `Dynasty "${dynasty.name}" (${dynasty.id}) references dynasty "${dynastyId}" which doesn't exist in dynasties.ts`
        ).toBeDefined();
      }
    }
  });
});

describe("eras cross-references", () => {
  it("relatedSites resolve to sites.ts entries", () => {
    for (const era of eras) {
      for (const siteId of era.relatedSites) {
        expect(
          getSiteById(siteId),
          `Era "${era.name}" (${era.id}) references site "${siteId}" which doesn't exist in sites.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedEvidence resolve to evidence.ts entries", () => {
    for (const era of eras) {
      for (const evidenceId of era.relatedEvidence) {
        expect(
          getEvidenceById(evidenceId),
          `Era "${era.name}" (${era.id}) references evidence "${evidenceId}" which doesn't exist in evidence.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedDynasties resolve to dynasties.ts entries", () => {
    for (const era of eras) {
      for (const dynastyId of era.relatedDynasties) {
        expect(
          getDynastyById(dynastyId),
          `Era "${era.name}" (${era.id}) references dynasty "${dynastyId}" which doesn't exist in dynasties.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedResearchers resolve to researchers.ts entries", () => {
    for (const era of eras) {
      for (const researcherId of era.relatedResearchers) {
        expect(
          getResearcherById(researcherId),
          `Era "${era.name}" (${era.id}) references researcher "${researcherId}" which doesn't exist in researchers.ts`
        ).toBeDefined();
      }
    }
  });
});

describe("sites cross-references", () => {
  it("relatedResearchers resolve to researchers.ts entries", () => {
    for (const site of sites) {
      for (const researcherId of site.relatedResearchers) {
        expect(
          getResearcherById(researcherId),
          `Site "${site.name}" (${site.id}) references researcher "${researcherId}" which doesn't exist in researchers.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedEvidence resolve to evidence.ts entries", () => {
    for (const site of sites) {
      for (const evidenceId of site.relatedEvidence) {
        expect(
          getEvidenceById(evidenceId),
          `Site "${site.name}" (${site.id}) references evidence "${evidenceId}" which doesn't exist in evidence.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedEras resolve to eras.ts entries", () => {
    for (const site of sites) {
      for (const eraId of site.relatedEras) {
        expect(
          getEraById(eraId),
          `Site "${site.name}" (${site.id}) references era "${eraId}" which doesn't exist in eras.ts`
        ).toBeDefined();
      }
    }
  });
});

describe("evidenceItems cross-references", () => {
  it("relatedResearchers resolve to researchers.ts entries", () => {
    for (const evidence of evidenceItems) {
      for (const researcherId of evidence.relatedResearchers) {
        expect(
          getResearcherById(researcherId),
          `Evidence "${evidence.claim}" (${evidence.id}) references researcher "${researcherId}" which doesn't exist in researchers.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedSites resolve to sites.ts entries", () => {
    for (const evidence of evidenceItems) {
      for (const siteId of evidence.relatedSites) {
        expect(
          getSiteById(siteId),
          `Evidence "${evidence.claim}" (${evidence.id}) references site "${siteId}" which doesn't exist in sites.ts`
        ).toBeDefined();
      }
    }
  });
});

describe("researchers cross-references", () => {
  it("relatedSites resolve to sites.ts entries", () => {
    for (const researcher of researchers) {
      for (const siteId of researcher.relatedSites) {
        expect(
          getSiteById(siteId),
          `Researcher "${researcher.name}" (${researcher.id}) references site "${siteId}" which doesn't exist in sites.ts`
        ).toBeDefined();
      }
    }
  });

  it("relatedEvidence resolve to evidence.ts entries", () => {
    for (const researcher of researchers) {
      for (const evidenceId of researcher.relatedEvidence) {
        expect(
          getEvidenceById(evidenceId),
          `Researcher "${researcher.name}" (${researcher.id}) references evidence "${evidenceId}" which doesn't exist in evidence.ts`
        ).toBeDefined();
      }
    }
  });
});

// =============================================================================
// Hub-to-standalone ID mapping (history.ts -> standalone files)
// =============================================================================

describe("hub-to-standalone ID mapping", () => {
  it("every hub archaeologicalSite ID exists in standalone sites.ts", () => {
    for (const hubSite of archaeologicalSites) {
      expect(
        getSiteById(hubSite.id),
        `Hub site "${hubSite.name}" (${hubSite.id}) from history.ts has no matching entry in sites.ts`
      ).toBeDefined();
    }
  });

  it("every hub researcher ID exists in standalone researchers.ts", () => {
    for (const hubResearcher of hubResearchers) {
      expect(
        getResearcherById(hubResearcher.id),
        `Hub researcher "${hubResearcher.name}" (${hubResearcher.id}) from history.ts has no matching entry in researchers.ts`
      ).toBeDefined();
    }
  });

  it("every hub evidence ID exists in standalone evidence.ts", () => {
    for (const hubEvidenceItem of hubEvidence) {
      expect(
        getEvidenceById(hubEvidenceItem.id),
        `Hub evidence "${hubEvidenceItem.claim}" (${hubEvidenceItem.id}) from history.ts has no matching entry in evidence.ts`
      ).toBeDefined();
    }
  });
});
