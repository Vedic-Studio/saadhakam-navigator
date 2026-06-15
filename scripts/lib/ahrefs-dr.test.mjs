import { describe, it, expect } from "vitest";
import {
  normalizeDomain,
  buildDrUrl,
  parseDrResponse,
  checkFairUse,
  fetchDomainRating,
  mergeHistory,
  computeDeltas,
  renderSnapshotMarkdown,
  ATTRIBUTION,
  FAIR_USE_LIMIT,
  DR_ENDPOINT,
} from "./ahrefs-dr.mjs";

describe("normalizeDomain", () => {
  it("strips protocol, path, and www, and lowercases", () => {
    expect(normalizeDomain("https://www.Example.com/foo/bar")).toBe("example.com");
  });

  it("accepts a bare host", () => {
    expect(normalizeDomain("Sadhguru.org")).toBe("sadhguru.org");
  });

  it("strips a leading www on a bare host", () => {
    expect(normalizeDomain("www.foo.org")).toBe("foo.org");
  });

  it("throws on empty input", () => {
    expect(() => normalizeDomain("")).toThrow(/Empty domain/);
  });

  it("throws when there is no dot", () => {
    expect(() => normalizeDomain("localhost")).toThrow(/Invalid domain/);
  });

  it("throws on embedded whitespace", () => {
    expect(() => normalizeDomain("bad domain.com")).toThrow(/Invalid domain/);
  });
});

describe("buildDrUrl", () => {
  it("targets the free public endpoint with the normalized domain and json output", () => {
    const url = buildDrUrl("https://www.Example.com/x");
    expect(url.startsWith(DR_ENDPOINT)).toBe(true);
    expect(url).toContain("target=example.com");
    expect(url).toContain("output=json");
  });
});

describe("parseDrResponse", () => {
  it("extracts dr and license from a well-formed payload", () => {
    expect(
      parseDrResponse({ domain_rating: { domain_rating: 77, license: "L" } }),
    ).toEqual({ dr: 77, license: "L" });
  });

  it("defaults license to null when absent", () => {
    expect(parseDrResponse({ domain_rating: { domain_rating: 0 } }).license).toBeNull();
  });

  it("throws when the domain_rating node is missing", () => {
    expect(() => parseDrResponse({})).toThrow(/Malformed DR response/);
  });

  it("throws when the rating is not a number", () => {
    expect(() => parseDrResponse({ domain_rating: { domain_rating: "77" } })).toThrow(
      /Malformed DR response/,
    );
  });
});

describe("checkFairUse", () => {
  it("returns null at or below the ceiling", () => {
    expect(checkFairUse(FAIR_USE_LIMIT)).toBeNull();
  });

  it("warns above the ceiling", () => {
    expect(checkFairUse(FAIR_USE_LIMIT + 1)).toMatch(/fair-use ceiling/);
  });
});

describe("fetchDomainRating", () => {
  const ok = (dr) => ({
    status: 200,
    ok: true,
    json: async () => ({ domain_rating: { domain_rating: dr, license: "L" } }),
  });
  const noop = async () => {};

  it("returns the normalized domain and DR on success", async () => {
    const res = await fetchDomainRating("https://www.Sadhguru.org/", {
      fetchImpl: async () => ok(77),
      sleep: noop,
    });
    expect(res).toEqual({ target: "https://www.Sadhguru.org/", domain: "sadhguru.org", dr: 77, license: "L" });
  });

  it("retries on 429 then succeeds", async () => {
    let calls = 0;
    const res = await fetchDomainRating("foo.com", {
      sleep: noop,
      fetchImpl: async () => {
        calls += 1;
        return calls === 1 ? { status: 429, ok: false, json: async () => ({}) } : ok(42);
      },
    });
    expect(calls).toBe(2);
    expect(res.dr).toBe(42);
  });

  it("throws after exhausting retries on persistent 429", async () => {
    await expect(
      fetchDomainRating("foo.com", {
        retries: 1,
        sleep: noop,
        fetchImpl: async () => ({ status: 429, ok: false, json: async () => ({}) }),
      }),
    ).rejects.toThrow(/Rate limited \(429\)/);
  });

  it("throws on a non-429 error status", async () => {
    await expect(
      fetchDomainRating("foo.com", {
        sleep: noop,
        fetchImpl: async () => ({ status: 500, ok: false, json: async () => ({}) }),
      }),
    ).rejects.toThrow(/HTTP 500/);
  });

  it("propagates a malformed-payload error", async () => {
    await expect(
      fetchDomainRating("foo.com", {
        sleep: noop,
        fetchImpl: async () => ({ status: 200, ok: true, json: async () => ({}) }),
      }),
    ).rejects.toThrow(/Malformed DR response/);
  });
});

describe("mergeHistory", () => {
  it("seeds a fresh history from null", () => {
    const h = mergeHistory(null, { date: "2026-06-15", ratings: { "a.com": 10 } });
    expect(h.schema).toBe(1);
    expect(h.attribution).toBe(ATTRIBUTION);
    expect(h.snapshots).toHaveLength(1);
  });

  it("appends a later snapshot in date order", () => {
    const h1 = mergeHistory(null, { date: "2026-06-15", ratings: { "a.com": 10 } });
    const h2 = mergeHistory(h1, { date: "2026-07-15", ratings: { "a.com": 12 } });
    expect(h2.snapshots.map((s) => s.date)).toEqual(["2026-06-15", "2026-07-15"]);
  });

  it("replaces a same-date snapshot rather than duplicating it", () => {
    const h1 = mergeHistory(null, { date: "2026-06-15", ratings: { "a.com": 10 } });
    const h2 = mergeHistory(h1, { date: "2026-06-15", ratings: { "a.com": 11 } });
    expect(h2.snapshots).toHaveLength(1);
    expect(h2.snapshots[0].ratings["a.com"]).toBe(11);
  });

  it("does not mutate the input history", () => {
    const h1 = mergeHistory(null, { date: "2026-06-15", ratings: { "a.com": 10 } });
    mergeHistory(h1, { date: "2026-07-15", ratings: { "a.com": 12 } });
    expect(h1.snapshots).toHaveLength(1);
  });
});

describe("computeDeltas", () => {
  it("returns an empty array for empty history", () => {
    expect(computeDeltas({ snapshots: [] })).toEqual([]);
  });

  it("reports null deltas and sorts by current DR when there is no prior snapshot", () => {
    const h = mergeHistory(null, { date: "2026-06-15", ratings: { "low.com": 10, "high.com": 80 } });
    const deltas = computeDeltas(h);
    expect(deltas.map((d) => d.domain)).toEqual(["high.com", "low.com"]);
    expect(deltas.every((d) => d.delta === null)).toBe(true);
  });

  it("computes up/down deltas and flags newly added domains as null", () => {
    let h = mergeHistory(null, { date: "2026-06-15", ratings: { "a.com": 10, "b.com": 50 } });
    h = mergeHistory(h, { date: "2026-07-15", ratings: { "a.com": 12, "b.com": 48, "c.com": 30 } });
    const byDomain = Object.fromEntries(computeDeltas(h).map((d) => [d.domain, d]));
    expect(byDomain["a.com"].delta).toBe(2);
    expect(byDomain["b.com"].delta).toBe(-2);
    expect(byDomain["c.com"].delta).toBeNull();
  });
});

describe("renderSnapshotMarkdown", () => {
  const deltas = [
    { domain: "high.com", current: 80, previous: 78, delta: 2 },
    { domain: "us.com", current: 5, previous: null, delta: null },
    { domain: "down.com", current: 40, previous: 45, delta: -5 },
  ];

  it("includes the required attribution", () => {
    expect(renderSnapshotMarkdown({ date: "2026-06-15", ownDomain: "us.com", deltas })).toContain(
      ATTRIBUTION,
    );
  });

  it("bolds the owned domain row", () => {
    const md = renderSnapshotMarkdown({ date: "2026-06-15", ownDomain: "us.com", deltas });
    expect(md).toContain("**us.com**");
  });

  it("formats positive, negative, and new deltas", () => {
    const md = renderSnapshotMarkdown({ date: "2026-06-15", ownDomain: "us.com", deltas });
    expect(md).toContain("| +2 |");
    expect(md).toContain("| -5 |");
    expect(md).toContain("| — |");
  });
});
