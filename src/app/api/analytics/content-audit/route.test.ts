import { describe, expect, it, vi } from "vitest";

const fetchContentAuditData = vi.fn();

vi.mock("@/lib/analytics/content-audit", () => ({
    fetchContentAuditData,
}));

describe("GET /api/analytics/content-audit", () => {
    it("returns joined content audit data", async () => {
        fetchContentAuditData.mockResolvedValue({
            source: "content-audit",
            generatedAt: "2026-04-01T00:00:00.000Z",
            range: {
                current: { startDate: "2026-01-01", endDate: "2026-03-31" },
                previous: { startDate: "2025-10-03", endDate: "2025-12-31" },
            },
            executiveSummary: { overview: [], biggestLeaks: [], growthBets: [] },
            methodology: { notes: [], instrumentationCaveats: [] },
            portfolioScorecard: { byPillar: [], byRouteFamily: [], byDecisionBucket: [] },
            winners: [],
            rankingOpportunities: [],
            conversionLeaks: [],
            clusterExpansion: [],
            deprioritized: [],
            aeoLlmRepairs: [],
            topQueries: [],
            topCountries: [],
            topSourceMediums: [],
            topReferrers: [],
            pageRows: [],
            citeabilityAudit: {
                articleLayoutCoverage: { usingArticleLayout: 1, totalMappedArticles: 1 },
                directAnswerCoverage: { pagesWithAeoAnswer: 1, totalMappedArticles: 1 },
                llmsFullIncludesEditorialBodies: false,
                brandFactsNeedsAuthorityUpgrade: true,
                priorities: [],
            },
            editorialQueues: {
                p1: [],
                p2: [],
                p3: [],
                hold: [],
                byBucket: [],
            },
            actionPlan: {
                refreshNow: [],
                buildNext: [],
                internalLinkFixes: [],
                aeoLlmInfraFixes: [],
                instrumentationLater: [],
            },
        });

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(response.headers.get("Cache-Control")).toBe("no-store, max-age=0");
        expect(body.source).toBe("content-audit");
        expect(body.range.current.startDate).toBe("2026-01-01");
        expect(body.editorialQueues).toEqual({
            p1: [],
            p2: [],
            p3: [],
            hold: [],
            byBucket: [],
        });
    });

    it("returns a 500 response when the content audit layer throws", async () => {
        fetchContentAuditData.mockRejectedValue(new Error("Content audit unavailable"));

        const { GET } = await import("./route");
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(500);
        expect(body).toEqual({ error: "Content audit unavailable" });
    });
});