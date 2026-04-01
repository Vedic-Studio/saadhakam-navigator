import { describe, expect, it } from "vitest";

import {
    buildEditorialQueueItem,
    decideBucket,
    proposedFixForRow,
    queueOwnerForBucket,
    queuePriorityForRow,
    queueTargetWindowForPriority,
} from "./content-audit";
import type { ContentAuditBucket, ContentPerformanceRow } from "./types";

function buildRow(overrides: Partial<ContentPerformanceRow> = {}): ContentPerformanceRow {
    return {
        route: "/test-route",
        title: "Test Article",
        pillar: "philosophy",
        routeFamily: "test",
        publishDate: null,
        primaryKeyword: "vedanta basics",
        standardizedArticleSystem: true,
        hasAeoAnswer: true,
        ctaTarget: "/faith-finder",
        relatedLinkDepth: 5,
        topQueries: [],
        topCountries: [],
        topSourceMediums: [],
        topReferrers: [],
        gsc: {
            clicks: 10,
            impressions: 150,
            ctr: 0.04,
            position: 8,
            clicksDelta: 0,
            impressionsDelta: 0,
            ctrDelta: 0,
            positionDelta: 0,
        },
        ga4: {
            sessions: 10,
            sessionsDelta: 0,
            engagedSessions: 6,
            engagementRate: 0.6,
            averageEngagementTime: 90,
            events: {
                quizComplete: 0,
                emailCapture: 0,
                resultView: 0,
                resultShare: 0,
                articleRead: 1,
                ctaClick: 1,
                pathExplore: 0,
                pageView: 10,
                appOpen: 0,
            },
        },
        icp: {
            score: 60,
            intentFit: "high",
            geoFit: 70,
            behaviorFit: 50,
            qualificationFit: 20,
        },
        decisionBucket: "monitor",
        aeoLlmFlags: [],
        ...overrides,
    };
}

describe("content audit editorial queue helpers", () => {
    it("classifies rows into the expected decision buckets", () => {
        expect(
            decideBucket(
                buildRow({
                    icp: { score: 75, intentFit: "high", geoFit: 70, behaviorFit: 60, qualificationFit: 40 },
                    gsc: { clicks: 24, impressions: 180, ctr: 0.05, position: 6, clicksDelta: 0, impressionsDelta: 0, ctrDelta: 0, positionDelta: 0 },
                    ga4: {
                        sessions: 25,
                        sessionsDelta: 0,
                        engagedSessions: 15,
                        engagementRate: 0.6,
                        averageEngagementTime: 100,
                        events: { quizComplete: 1, emailCapture: 0, resultView: 0, resultShare: 0, articleRead: 1, ctaClick: 1, pathExplore: 0, pageView: 10, appOpen: 0 },
                    },
                }),
            ),
        ).toBe("double-down");

        expect(
            decideBucket(
                buildRow({
                    icp: { score: 66, intentFit: "high", geoFit: 70, behaviorFit: 40, qualificationFit: 20 },
                    gsc: { clicks: 12, impressions: 220, ctr: 0.02, position: 9, clicksDelta: 0, impressionsDelta: 0, ctrDelta: 0, positionDelta: 0 },
                }),
            ),
        ).toBe("improve-ctr-rank");

        expect(
            decideBucket(
                buildRow({
                    gsc: { clicks: 25, impressions: 120, ctr: 0.04, position: 5, clicksDelta: 0, impressionsDelta: 0, ctrDelta: 0, positionDelta: 0 },
                    ga4: {
                        sessions: 24,
                        sessionsDelta: 0,
                        engagedSessions: 12,
                        engagementRate: 0.6,
                        averageEngagementTime: 90,
                        events: { quizComplete: 0, emailCapture: 0, resultView: 0, resultShare: 0, articleRead: 2, ctaClick: 1, pathExplore: 0, pageView: 10, appOpen: 0 },
                    },
                }),
            ),
        ).toBe("improve-conversion-path");

        expect(decideBucket(buildRow({ icp: { score: 61, intentFit: "high", geoFit: 70, behaviorFit: 40, qualificationFit: 15 }, relatedLinkDepth: 2 }))).toBe(
            "expand-cluster",
        );

        expect(decideBucket(buildRow({ icp: { score: 45, intentFit: "mixed", geoFit: 60, behaviorFit: 35, qualificationFit: 10 }, aeoLlmFlags: ["Missing direct-answer metadata"] }))).toBe(
            "aeo-llm-repair",
        );

        expect(
            decideBucket(
                buildRow({
                    icp: { score: 30, intentFit: "low", geoFit: 20, behaviorFit: 20, qualificationFit: 0 },
                    ga4: {
                        sessions: 4,
                        sessionsDelta: 0,
                        engagedSessions: 1,
                        engagementRate: 0.2,
                        averageEngagementTime: 20,
                        events: { quizComplete: 0, emailCapture: 0, resultView: 0, resultShare: 0, articleRead: 0, ctaClick: 0, pathExplore: 0, pageView: 3, appOpen: 0 },
                    },
                }),
            ),
        ).toBe("deprioritize-or-contain");

        expect(decideBucket(buildRow())).toBe("monitor");
    });

    it("maps decision buckets to queue owners", () => {
        const cases: Array<[ContentAuditBucket, ReturnType<typeof queueOwnerForBucket>]> = [
            ["double-down", "editorial"],
            ["expand-cluster", "editorial"],
            ["improve-ctr-rank", "seo"],
            ["improve-conversion-path", "conversion"],
            ["aeo-llm-repair", "aeo"],
            ["deprioritize-or-contain", "strategy"],
            ["monitor", "strategy"],
        ];

        for (const [bucket, owner] of cases) {
            expect(queueOwnerForBucket(bucket)).toBe(owner);
        }
    });

    it("assigns queue priorities and target windows from row context", () => {
        expect(
            queuePriorityForRow(
                buildRow({
                    decisionBucket: "improve-conversion-path",
                }),
            ),
        ).toBe("p1");
        expect(
            queuePriorityForRow(
                buildRow({
                    decisionBucket: "double-down",
                    icp: { score: 76, intentFit: "high", geoFit: 70, behaviorFit: 50, qualificationFit: 30 },
                }),
            ),
        ).toBe("p1");
        expect(queuePriorityForRow(buildRow({ decisionBucket: "improve-ctr-rank" }))).toBe("p2");
        expect(
            queuePriorityForRow(
                buildRow({
                    decisionBucket: "double-down",
                    icp: { score: 72, intentFit: "high", geoFit: 70, behaviorFit: 50, qualificationFit: 30 },
                    ga4: {
                        sessions: 20,
                        sessionsDelta: 0,
                        engagedSessions: 10,
                        engagementRate: 0.5,
                        averageEngagementTime: 80,
                        events: { quizComplete: 1, emailCapture: 0, resultView: 0, resultShare: 0, articleRead: 1, ctaClick: 0, pathExplore: 0, pageView: 10, appOpen: 0 },
                    },
                }),
            ),
        ).toBe("p2");
        expect(queuePriorityForRow(buildRow({ decisionBucket: "monitor" }))).toBe("p3");
        expect(queuePriorityForRow(buildRow({ decisionBucket: "deprioritize-or-contain" }))).toBe("hold");

        expect(queueTargetWindowForPriority("p1")).toBe("this-week");
        expect(queueTargetWindowForPriority("p2")).toBe("next-sprint");
        expect(queueTargetWindowForPriority("p3")).toBe("backlog");
        expect(queueTargetWindowForPriority("hold")).toBe("hold");
    });

    it("builds editorial queue items with derived priority, owner, target window, and qualification totals", () => {
        const row = buildRow({
            route: "/advaita-explained",
            title: "Advaita Explained",
            decisionBucket: "aeo-llm-repair",
            aeoLlmFlags: ["Missing direct-answer metadata", "Thin related-link support"],
            icp: { score: 58, intentFit: "high", geoFit: 65, behaviorFit: 45, qualificationFit: 25 },
            gsc: { clicks: 14, impressions: 300, ctr: 0.03, position: 7, clicksDelta: 0, impressionsDelta: 0, ctrDelta: 0, positionDelta: 0 },
            ga4: {
                sessions: 18,
                sessionsDelta: 0,
                engagedSessions: 12,
                engagementRate: 0.66,
                averageEngagementTime: 110,
                events: { quizComplete: 2, emailCapture: 1, resultView: 0, resultShare: 0, articleRead: 3, ctaClick: 2, pathExplore: 1, pageView: 20, appOpen: 0 },
            },
        });

        expect(proposedFixForRow(row)).toContain("direct-answer blocks");

        expect(buildEditorialQueueItem(row)).toEqual({
            route: "/advaita-explained",
            title: "Advaita Explained",
            decisionBucket: "aeo-llm-repair",
            priority: "p1",
            owner: "aeo",
            targetWindow: "this-week",
            proposedFix: proposedFixForRow(row),
            icpScore: 58,
            traffic: {
                clicks: 14,
                impressions: 300,
                sessions: 18,
            },
            qualification: {
                quizComplete: 2,
                emailCapture: 1,
                qualifiedConversions: 3,
            },
            aeoLlmFlags: ["Missing direct-answer metadata", "Thin related-link support"],
        });
    });
});