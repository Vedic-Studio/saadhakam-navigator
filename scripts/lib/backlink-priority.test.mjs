import { describe, it, expect } from "vitest";
import {
  linkWeight,
  scoreTarget,
  rankTargets,
  groupByTier,
  LINK_WEIGHT,
  DEFAULT_LINK_WEIGHT,
} from "./backlink-priority.mjs";

describe("linkWeight", () => {
  it("returns the configured weight for known link types", () => {
    expect(linkWeight("dofollow")).toBe(LINK_WEIGHT.dofollow);
    expect(linkWeight("nofollow")).toBe(LINK_WEIGHT.nofollow);
    expect(linkWeight("unconfirmed")).toBe(LINK_WEIGHT.unconfirmed);
  });

  it("falls back to the default weight for unknown types", () => {
    expect(linkWeight(undefined)).toBe(DEFAULT_LINK_WEIGHT);
    expect(linkWeight("sponsored")).toBe(DEFAULT_LINK_WEIGHT);
  });
});

describe("scoreTarget", () => {
  it("multiplies DR by relevance by link weight", () => {
    expect(scoreTarget({ dr: 80, relevance: 5, link_type: "dofollow" })).toBe(400);
    expect(scoreTarget({ dr: 50, relevance: 4, link_type: "unconfirmed" })).toBe(120);
  });

  it("discounts nofollow heavily so a high-DR profile cannot dominate", () => {
    const nofollowProfile = scoreTarget({ dr: 98, relevance: 2, link_type: "nofollow" });
    const dofollowNiche = scoreTarget({ dr: 50, relevance: 5, link_type: "dofollow" });
    expect(dofollowNiche).toBeGreaterThan(nofollowProfile);
  });

  it("defaults missing dr to 0 and missing relevance to 1", () => {
    expect(scoreTarget({})).toBe(0);
    expect(scoreTarget({ dr: 50, relevance: 3 })).toBe(90); // default link weight 0.6
  });
});

describe("rankTargets", () => {
  const targets = [
    { platform: "Done", dr: 90, relevance: 5, link_type: "dofollow", tier: "authority", status: "submitted" },
    { platform: "Low", dr: 30, relevance: 1, link_type: "nofollow", tier: "foundational", status: "not_started" },
    { platform: "High", dr: 80, relevance: 5, link_type: "dofollow", tier: "authority", status: "not_started" },
  ];

  it("excludes already-won targets by default", () => {
    expect(rankTargets(targets).map((t) => t.platform)).toEqual(["High", "Low"]);
  });

  it("includes done targets when asked", () => {
    expect(rankTargets(targets, { includeDone: true })).toHaveLength(3);
  });

  it("sorts by score descending and attaches the score", () => {
    const ranked = rankTargets(targets);
    expect(ranked[0].platform).toBe("High");
    expect(ranked[0].score).toBe(400);
  });

  it("breaks score ties toward the authority tier", () => {
    const tied = [
      { platform: "Found", dr: 100, relevance: 1, link_type: "dofollow", tier: "foundational", status: "not_started" },
      { platform: "Auth", dr: 100, relevance: 1, link_type: "dofollow", tier: "authority", status: "not_started" },
    ];
    expect(rankTargets(tied).map((t) => t.platform)).toEqual(["Auth", "Found"]);
  });
});

describe("groupByTier", () => {
  it("buckets targets by tier and isolates untagged ones", () => {
    const groups = groupByTier([
      { tier: "authority" },
      { tier: "foundational" },
      { tier: "foundational" },
      {},
    ]);
    expect(groups.authority).toHaveLength(1);
    expect(groups.foundational).toHaveLength(2);
    expect(groups.untagged).toHaveLength(1);
  });
});
