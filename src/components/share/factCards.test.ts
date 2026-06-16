import { describe, expect, it } from "vitest";
import {
  factCards,
  getFactCardById,
  getFactCardByHref,
  shareUrlFor,
  type FactConfidence,
} from "./factCards";
import { evidenceItems } from "@/data/evidence";
import { sites } from "@/data/sites";
import { dynasties } from "@/data/dynasties";
import { SITE_URL } from "@/lib/seo/index";

const VALID_CONFIDENCE: FactConfidence[] = ["confirmed", "strong", "open"];

describe("factCards data integrity", () => {
  it("seeds exactly the four civilizational facts plus the DNA companion", () => {
    // Brief requires four cards (Rakhigarhi size flagship, Dwarka, Mahabharata,
    // one dynasty). The Rakhigarhi DNA card is an extra companion that also
    // repairs the DNA evidence page. Guard the set so it can't silently drift.
    const ids = factCards.map((c) => c.id).sort();
    expect(ids).toEqual(
      [
        "brihadratha-dynasty",
        "dwarka-underwater",
        "mahabharata-5561-bce",
        "rakhigarhi-dna",
        "rakhigarhi-vs-mohenjo-daro",
      ].sort(),
    );
  });

  it("has unique ids", () => {
    const ids = factCards.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique art paths so two cards never share one image", () => {
    const art = factCards.map((c) => c.art);
    expect(new Set(art).size).toBe(art.length);
  });

  for (const card of factCards) {
    describe(`card: ${card.id}`, () => {
      it("has all required, non-empty fields", () => {
        expect(card.headline.trim().length).toBeGreaterThan(0);
        expect(card.fact.trim().length).toBeGreaterThan(0);
        expect(card.context.trim().length).toBeGreaterThan(0);
        // A citation is mandatory: a share-as-evidence card with no source is
        // exactly what we must not ship.
        expect(card.citation.trim().length).toBeGreaterThan(0);
        expect(card.sourceNote.trim().length).toBeGreaterThan(0);
      });

      it("uses a valid confidence label", () => {
        expect(VALID_CONFIDENCE).toContain(card.confidence);
      });

      it("links to a real sanatan-history page (root-relative, no trailing slash)", () => {
        expect(card.href.startsWith("/sanatan-history/")).toBe(true);
        expect(card.href.endsWith("/")).toBe(false);
      });

      it("points art at an SVG under /assets/fact-cards/", () => {
        expect(card.href).not.toContain(" ");
        expect(card.art).toMatch(/^\/assets\/fact-cards\/[\w-]+\.svg$/);
      });

      it("the fact carries at least one concrete number (it's the quotable payload)", () => {
        expect(/\d/.test(card.fact)).toBe(true);
      });

      it("has at least one hashtag and none start with '#'", () => {
        expect(card.hashtags.length).toBeGreaterThan(0);
        for (const tag of card.hashtags) {
          expect(tag.startsWith("#")).toBe(false);
          expect(tag.trim().length).toBeGreaterThan(0);
        }
      });
    });
  }

  it("every href resolves to an existing evidence / site / dynasty record", () => {
    const evidenceHrefs = new Set(
      evidenceItems.map((e) => `/sanatan-history/evidence/${e.id}`),
    );
    const siteHrefs = new Set(
      sites.map((s) => `/sanatan-history/sites/${s.id}`),
    );
    const dynastyHrefs = new Set(
      dynasties.map((d) => `/sanatan-history/dynasties/${d.id}`),
    );

    for (const card of factCards) {
      const exists =
        evidenceHrefs.has(card.href) ||
        siteHrefs.has(card.href) ||
        dynastyHrefs.has(card.href);
      expect(exists, `${card.id} -> ${card.href} must resolve`).toBe(true);
    }
  });

  it("the flagship card targets the Rakhigarhi-vs-Mohenjo-daro size evidence", () => {
    const flagship = getFactCardById("rakhigarhi-vs-mohenjo-daro");
    expect(flagship?.href).toBe(
      "/sanatan-history/evidence/rakhigarhi-largest-site",
    );
    // The defining number gap must be present and correct.
    expect(flagship?.fact).toContain("350");
    expect(flagship?.fact).toContain("250");
  });

  it("the Dwarka repair card is keyed to the dwarka-underwater site page", () => {
    const dwarka = getFactCardByHref(
      "/sanatan-history/sites/dwarka-underwater",
    );
    expect(dwarka?.id).toBe("dwarka-underwater");
    // Confidence stays 'open' — we must not over-claim it is Krishna's Dwarka.
    expect(dwarka?.confidence).toBe("open");
  });

  it("the Mahabharata card is labelled a proposal (status strong), matching mb-5561", () => {
    const mb = getFactCardById("mahabharata-5561-bce");
    const onPage = evidenceItems.find((e) => e.id === "mb-5561");
    expect(mb?.confidence).toBe("strong");
    expect(onPage?.status).toBe("strong");
    // Numbers must match the on-page source verbatim.
    expect(mb?.fact).toContain("5,561 BCE");
    expect(mb?.fact).toContain("215+");
  });
});

describe("shareUrlFor", () => {
  it("builds an absolute URL on the canonical www origin", () => {
    const card = factCards[0];
    expect(shareUrlFor(card)).toBe(`${SITE_URL}${card.href}`);
    expect(shareUrlFor(card).startsWith("https://www.opensadhaka.com/")).toBe(
      true,
    );
  });
});
