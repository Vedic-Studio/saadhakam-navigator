import { describe, expect, it, vi } from "vitest";

const fetchGscDashboardData = vi.fn();

vi.mock("@/lib/analytics/google", () => ({
    fetchGscDashboardData,
}));

describe("GET /api/analytics/gsc", () => {
    it("returns dashboard data", async () => {
        fetchGscDashboardData.mockResolvedValue({
            source: "gsc",
            overview: { clicks: 100, impressions: 2000, ctr: 0.05, position: 11.2 },
            topQueries: [],
            topPages: [],
            trend: [],
            range: { startDate: "2026-03-01", endDate: "2026-03-28" },
            siteUrl: "sc-domain:opensadhaka.com",
        });

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(response.headers.get("Cache-Control")).toBe("no-store, max-age=0");
        expect(body.source).toBe("gsc");
        expect(body.overview.clicks).toBe(100);
    });

    it("returns a 500 response when the data layer throws", async () => {
        fetchGscDashboardData.mockRejectedValue(new Error("GSC unavailable"));

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body).toEqual({ error: "GSC unavailable" });
    });
});