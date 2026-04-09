import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/lib/google-auth", () => ({
    getGoogleAccessToken: vi.fn().mockResolvedValue("test-token"),
}));

import {
    ctrOpportunityScore,
    expectedCtrForPosition,
    fetchGscCtrAudit,
} from "./google";

describe("expectedCtrForPosition", () => {
    it("returns highest benchmark CTR for position 1", () => {
        expect(expectedCtrForPosition(1)).toBeGreaterThan(0.25);
    });

    it("decreases monotonically as position grows", () => {
        const p1 = expectedCtrForPosition(1);
        const p3 = expectedCtrForPosition(3);
        const p7 = expectedCtrForPosition(7);
        const p15 = expectedCtrForPosition(15);
        expect(p1).toBeGreaterThan(p3);
        expect(p3).toBeGreaterThan(p7);
        expect(p7).toBeGreaterThan(p15);
    });

    it("returns a small non-zero benchmark for deep positions", () => {
        expect(expectedCtrForPosition(50)).toBeGreaterThan(0);
        expect(expectedCtrForPosition(50)).toBeLessThan(0.01);
    });

    it("returns 0 for invalid positions", () => {
        expect(expectedCtrForPosition(0)).toBe(0);
        expect(expectedCtrForPosition(-3)).toBe(0);
        expect(expectedCtrForPosition(Number.NaN)).toBe(0);
    });

    it("handles decimal positions via bucket bounds", () => {
        // 2.4 should still fall into the position-2 bucket (maxPosition 2.5)
        expect(expectedCtrForPosition(2.4)).toBeGreaterThan(expectedCtrForPosition(3));
    });
});

describe("ctrOpportunityScore", () => {
    it("computes gap and opportunity from impressions × (expected - actual)", () => {
        const result = ctrOpportunityScore({ impressions: 1000, ctr: 0.01, position: 3 });
        expect(result.expectedCtr).toBeGreaterThan(0.1);
        expect(result.ctrGap).toBeCloseTo(result.expectedCtr - 0.01, 5);
        expect(result.opportunityScore).toBe(Math.round(1000 * result.ctrGap));
    });

    it("returns zero opportunity when actual CTR exceeds benchmark", () => {
        const result = ctrOpportunityScore({ impressions: 500, ctr: 0.5, position: 2 });
        expect(result.ctrGap).toBe(0);
        expect(result.opportunityScore).toBe(0);
    });

    it("scales opportunity with impressions", () => {
        const low = ctrOpportunityScore({ impressions: 100, ctr: 0.01, position: 4 });
        const high = ctrOpportunityScore({ impressions: 10000, ctr: 0.01, position: 4 });
        expect(high.opportunityScore).toBeGreaterThan(low.opportunityScore * 50);
    });
});

describe("fetchGscCtrAudit", () => {
    const fetchMock = vi.fn();

    beforeEach(() => {
        fetchMock.mockReset();
        vi.stubGlobal("fetch", fetchMock);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    function mockGscSequence(responses: Array<{ rows?: unknown[] }>) {
        for (const body of responses) {
            fetchMock.mockResolvedValueOnce({
                ok: true,
                status: 200,
                text: () => Promise.resolve(JSON.stringify(body)),
            } as unknown as Response);
        }
    }

    it("issues the five expected GSC queries with correct dimensions", async () => {
        mockGscSequence([
            { rows: [{ clicks: 500, impressions: 12000, ctr: 0.0416, position: 14.2 }] },
            { rows: [{ keys: ["AI_OVERVIEW"], clicks: 5, impressions: 900, ctr: 0.0055, position: 1 }] },
            { rows: [{ keys: ["vedanta vs buddhism"], clicks: 10, impressions: 1200, ctr: 0.0083, position: 6.4 }] },
            { rows: [{ keys: ["/advaita-vedanta-explained"], clicks: 40, impressions: 2500, ctr: 0.016, position: 7.1 }] },
            {
                rows: [
                    {
                        keys: ["what is moksha", "https://www.opensadhaka.com/what-is-moksha"],
                        clicks: 8,
                        impressions: 900,
                        ctr: 0.0088,
                        position: 3.2,
                    },
                ],
            },
        ]);

        const result = await fetchGscCtrAudit({ minImpressions: 100 });

        expect(fetchMock).toHaveBeenCalledTimes(5);

        const bodies = fetchMock.mock.calls.map((call) => {
            const init = call[1] as RequestInit;
            return JSON.parse((init.body as string) ?? "{}") as Record<string, unknown>;
        });
        expect(bodies[0].rowLimit).toBe(1);
        expect(bodies[1].dimensions).toEqual(["searchAppearance"]);
        expect(bodies[2].dimensions).toEqual(["query"]);
        expect(bodies[3].dimensions).toEqual(["page"]);
        expect(bodies[4].dimensions).toEqual(["query", "page"]);
    });

    it("filters rows below minImpressions threshold", async () => {
        mockGscSequence([
            { rows: [{ clicks: 500, impressions: 12000, ctr: 0.04, position: 14 }] },
            { rows: [] },
            {
                rows: [
                    { keys: ["high volume"], clicks: 10, impressions: 1500, ctr: 0.0066, position: 5 },
                    { keys: ["low volume"], clicks: 1, impressions: 50, ctr: 0.02, position: 3 },
                ],
            },
            { rows: [] },
            { rows: [] },
        ]);

        const result = await fetchGscCtrAudit({ minImpressions: 100 });

        expect(result.queryCtrOpportunities).toHaveLength(1);
        expect(result.queryCtrOpportunities[0].query).toBe("high volume");
    });

    it("normalizes page URLs and attaches opportunity score to query×page rows", async () => {
        mockGscSequence([
            { rows: [{ clicks: 0, impressions: 0, ctr: 0, position: 0 }] },
            { rows: [] },
            { rows: [] },
            { rows: [] },
            {
                rows: [
                    {
                        keys: ["q1", "https://www.opensadhaka.com/foo"],
                        clicks: 5,
                        impressions: 1000,
                        ctr: 0.005,
                        position: 3.5,
                    },
                    {
                        keys: ["q2", "https://www.opensadhaka.com/bar"],
                        clicks: 10,
                        impressions: 2000,
                        ctr: 0.005,
                        position: 7.0,
                    },
                ],
            },
        ]);

        const result = await fetchGscCtrAudit({ minImpressions: 100 });

        expect(result.queryPageOpportunities[0].page).toBe("/foo");
        // q1 is at position 3.5 with impressions 1000; q2 is at position 7 with impressions 2000.
        // Both have CTR 0.5%, but position 3.5 has a much larger gap, so q1 may still dominate.
        // The strict assertion we care about: rows are sorted descending by opportunityScore.
        expect(result.queryPageOpportunities[0].opportunityScore).toBeGreaterThanOrEqual(
            result.queryPageOpportunities[1].opportunityScore,
        );
        for (const row of result.queryPageOpportunities) {
            expect(row.expectedCtr).toBeGreaterThan(0);
            expect(row.ctrGap).toBeGreaterThanOrEqual(0);
        }
    });

    it("maps searchAppearance rows onto the appearance field", async () => {
        mockGscSequence([
            { rows: [{ clicks: 0, impressions: 0, ctr: 0, position: 0 }] },
            {
                rows: [
                    { keys: ["AI_OVERVIEW"], clicks: 2, impressions: 400, ctr: 0.005, position: 1 },
                    { keys: ["RICHCARD"], clicks: 30, impressions: 800, ctr: 0.0375, position: 4 },
                ],
            },
            { rows: [] },
            { rows: [] },
            { rows: [] },
        ]);

        const result = await fetchGscCtrAudit();

        expect(result.searchAppearance.map((r) => r.appearance)).toEqual(["AI_OVERVIEW", "RICHCARD"]);
        expect(result.searchAppearance[0].clicks).toBe(2);
    });

    it("propagates thresholds into the returned payload", async () => {
        mockGscSequence([
            { rows: [{ clicks: 0, impressions: 0, ctr: 0, position: 0 }] },
            { rows: [] },
            { rows: [] },
            { rows: [] },
            { rows: [] },
        ]);

        const result = await fetchGscCtrAudit({
            minImpressions: 50,
            queryRowLimit: 100,
            pageRowLimit: 100,
            pairRowLimit: 200,
        });

        expect(result.thresholds).toEqual({
            minImpressions: 50,
            queryRowLimit: 100,
            pageRowLimit: 100,
            pairRowLimit: 200,
        });
    });

    it("surfaces GSC API errors with status code", async () => {
        // All five concurrent fetches need a response — mock a failing one for each.
        fetchMock.mockResolvedValue({
            ok: false,
            status: 403,
            text: () => Promise.resolve("Forbidden"),
        } as unknown as Response);

        await expect(fetchGscCtrAudit()).rejects.toThrow(/GSC request failed \(403\)/);
    });
});
