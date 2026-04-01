import { describe, expect, it, vi } from "vitest";

const fetchGa4DashboardData = vi.fn();

vi.mock("@/lib/analytics/google", () => ({
    fetchGa4DashboardData,
}));

describe("GET /api/analytics/ga4", () => {
    it("returns dashboard data", async () => {
        fetchGa4DashboardData.mockResolvedValue({
            source: "ga4",
            propertyId: "123456",
            range: { startDate: "2026-03-01", endDate: "2026-03-28" },
            overview: { sessions: 1500, users: 1000, newUsers: 700, engagementRate: 0.62 },
            topPages: [],
            events: [],
            trend: [],
            quizFunnel: {
                start: 200,
                complete: 120,
                emailCapture: 40,
                completionRate: 0.6,
                emailCaptureRate: 0.333,
            },
        });

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(response.headers.get("Cache-Control")).toBe("no-store, max-age=0");
        expect(body.source).toBe("ga4");
        expect(body.overview.sessions).toBe(1500);
    });

    it("returns a 500 response when the data layer throws", async () => {
        fetchGa4DashboardData.mockRejectedValue(new Error("GA4 unavailable"));

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body).toEqual({ error: "GA4 unavailable" });
    });
});