import { describe, it, expect } from "vitest";
import { CTR_SURGERY_PRIORITY_URLS } from "./google-indexing-priority.mjs";

describe("CTR_SURGERY_PRIORITY_URLS", () => {
  it("matches the count of pages rewritten in PR #20", () => {
    expect(CTR_SURGERY_PRIORITY_URLS).toHaveLength(14);
  });

  it("uses the production www origin (not the apex)", () => {
    for (const url of CTR_SURGERY_PRIORITY_URLS) {
      expect(url.startsWith("https://www.opensadhaka.com")).toBe(true);
    }
  });

  it("contains no duplicates", () => {
    const unique = new Set(CTR_SURGERY_PRIORITY_URLS);
    expect(unique.size).toBe(CTR_SURGERY_PRIORITY_URLS.length);
  });

  it("respects the project trailingSlash:false convention (homepage exempted)", () => {
    for (const url of CTR_SURGERY_PRIORITY_URLS) {
      const path = new URL(url).pathname;
      if (path === "/") continue;
      expect(path.endsWith("/")).toBe(false);
    }
  });

  it("includes each of the explicitly named PR #20 pages", () => {
    const expectedPaths = [
      "/",
      "/what-is-maya",
      "/advaita-vedanta-explained",
      "/compare/ashtavakra-gita-vs-bhagavad-gita",
      "/compare",
      "/learn/sanskrit/karma",
      "/learn/sanskrit/moksha",
      "/learn/sanskrit/nirvana",
      "/compare/atman-vs-brahman",
      "/philosophies",
      "/how-to-start-japa",
      "/daily-spiritual-routine-beginners",
      "/can-i-chant-a-mantra-without-initiation",
      "/how-karma-dharma-work",
    ];
    const actual = CTR_SURGERY_PRIORITY_URLS.map((u) => new URL(u).pathname);
    expect(new Set(actual)).toEqual(new Set(expectedPaths));
  });
});
