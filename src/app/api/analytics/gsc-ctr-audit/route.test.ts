import { describe, expect, it, vi } from "vitest";

const fetchGscCtrAudit = vi.fn();

vi.mock("@/lib/analytics/google", () => ({
    fetchGscCtrAudit,
}));

describe("GET /api/analytics/gsc-ctr-audit", () => {
    it("forwards query parameters as lib options", async () => {
        fetchGscCtrAudit.mockResolvedValue({
            source: "gsc-ctr-audit",
            siteUrl: "sc-domain:opensadhaka.com",
            range: { startDate: "2026-03-01", endDate: "2026-03-28" },
            thresholds: { minImpressions: 50, queryRowLimit: 100, pageRowLimit: 100, pairRowLimit: 200 },
            overview: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
            searchAppearance: [],
            queryCtrOpportunities: [],
            pageCtrOpportunities: [],
            queryPageOpportunities: [],
        });

        const { GET } = await import("./route");
        const response = await GET(
            new Request(
                "https://example.com/api/analytics/gsc-ctr-audit?minImpressions=50&queryRowLimit=100&pageRowLimit=100&pairRowLimit=200",
            ),
        );

        expect(response.status).toBe(200);
        expect(fetchGscCtrAudit).toHaveBeenCalledWith({
            minImpressions: 50,
            queryRowLimit: 100,
            pageRowLimit: 100,
            pairRowLimit: 200,
        });
    });

    it("returns defaults when query params are missing", async () => {
        fetchGscCtrAudit.mockResolvedValue({
            source: "gsc-ctr-audit",
            siteUrl: "sc-domain:opensadhaka.com",
            range: { startDate: "2026-03-01", endDate: "2026-03-28" },
            thresholds: { minImpressions: 100, queryRowLimit: 500, pageRowLimit: 500, pairRowLimit: 1000 },
            overview: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
            searchAppearance: [],
            queryCtrOpportunities: [],
            pageCtrOpportunities: [],
            queryPageOpportunities: [],
        });

        const { GET } = await import("./route");
        await GET(new Request("https://example.com/api/analytics/gsc-ctr-audit"));

        expect(fetchGscCtrAudit).toHaveBeenCalledWith({
            minImpressions: 100,
            queryRowLimit: 500,
            pageRowLimit: 500,
            pairRowLimit: 1000,
        });
    });

    it("returns a 500 response when the data layer throws", async () => {
        fetchGscCtrAudit.mockRejectedValue(new Error("GSC request failed (403): Forbidden"));

        const { GET } = await import("./route");
        const response = await GET(new Request("https://example.com/api/analytics/gsc-ctr-audit"));
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body).toEqual({ error: "GSC request failed (403): Forbidden" });
    });
});
