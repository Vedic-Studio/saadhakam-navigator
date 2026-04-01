export type DateRange = {
    startDate: string;
    endDate: string;
};

export type GscDashboardData = {
    source: "gsc";
    siteUrl: string;
    range: DateRange;
    overview: {
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    };
    topQueries: Array<{
        query: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    topPages: Array<{
        page: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    trend: Array<{
        date: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
};

export type Ga4DashboardData = {
    source: "ga4";
    propertyId: string;
    range: DateRange;
    overview: {
        sessions: number;
        users: number;
        newUsers: number;
        engagementRate: number;
    };
    topPages: Array<{
        page: string;
        views: number;
        sessions: number;
    }>;
    events: Array<{
        eventName: string;
        eventCount: number;
    }>;
    trend: Array<{
        date: string;
        sessions: number;
        users: number;
    }>;
    quizFunnel: {
        start: number;
        complete: number;
        emailCapture: number;
        completionRate: number;
        emailCaptureRate: number;
    };
};

export type ContentAuditEventCounts = {
    quizComplete: number;
    emailCapture: number;
    resultView: number;
    resultShare: number;
    articleRead: number;
    ctaClick: number;
    pathExplore: number;
    pageView: number;
    appOpen: number;
};

export type ContentAuditBucket =
    | "double-down"
    | "improve-ctr-rank"
    | "improve-conversion-path"
    | "expand-cluster"
    | "deprioritize-or-contain"
    | "aeo-llm-repair"
    | "monitor";

export type IntentFit = "high" | "medium" | "mixed" | "low";

export type EditorialQueuePriority = "p1" | "p2" | "p3" | "hold";

export type EditorialQueueOwner = "editorial" | "seo" | "conversion" | "aeo" | "strategy";

export type ContentPerformanceRow = {
    route: string;
    title: string;
    pillar: string;
    routeFamily: string;
    publishDate: string | null;
    primaryKeyword: string | null;
    standardizedArticleSystem: boolean;
    hasAeoAnswer: boolean;
    ctaTarget: string | null;
    relatedLinkDepth: number;
    topQueries: string[];
    topCountries: Array<{ country: string; clicks: number }>;
    topSourceMediums: Array<{ sourceMedium: string; sessions: number }>;
    topReferrers: Array<{ referrer: string; sessions: number }>;
    gsc: {
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
        clicksDelta: number;
        impressionsDelta: number;
        ctrDelta: number;
        positionDelta: number;
    };
    ga4: {
        sessions: number;
        sessionsDelta: number;
        engagedSessions: number;
        engagementRate: number;
        averageEngagementTime: number;
        events: ContentAuditEventCounts;
    };
    icp: {
        score: number;
        intentFit: IntentFit;
        geoFit: number;
        behaviorFit: number;
        qualificationFit: number;
    };
    decisionBucket: ContentAuditBucket;
    aeoLlmFlags: string[];
};

export type EditorialQueueItem = {
    route: string;
    title: string;
    decisionBucket: ContentAuditBucket;
    priority: EditorialQueuePriority;
    owner: EditorialQueueOwner;
    targetWindow: "this-week" | "next-sprint" | "backlog" | "hold";
    proposedFix: string;
    icpScore: number;
    traffic: {
        clicks: number;
        impressions: number;
        sessions: number;
    };
    qualification: {
        quizComplete: number;
        emailCapture: number;
        qualifiedConversions: number;
    };
    aeoLlmFlags: string[];
};

export type PortfolioScorecardRow = {
    label: string;
    pages: number;
    clicks: number;
    sessions: number;
    qualifiedConversions: number;
    averageIcpScore: number;
};

export type ContentAuditData = {
    source: "content-audit";
    generatedAt: string;
    range: {
        current: DateRange;
        previous: DateRange;
    };
    executiveSummary: {
        overview: string[];
        biggestLeaks: string[];
        growthBets: string[];
    };
    methodology: {
        notes: string[];
        instrumentationCaveats: string[];
    };
    portfolioScorecard: {
        byPillar: PortfolioScorecardRow[];
        byRouteFamily: PortfolioScorecardRow[];
        byDecisionBucket: PortfolioScorecardRow[];
    };
    winners: ContentPerformanceRow[];
    rankingOpportunities: ContentPerformanceRow[];
    conversionLeaks: ContentPerformanceRow[];
    clusterExpansion: ContentPerformanceRow[];
    deprioritized: ContentPerformanceRow[];
    aeoLlmRepairs: ContentPerformanceRow[];
    topQueries: Array<{
        query: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
    }>;
    topCountries: Array<{
        country: string;
        clicks: number;
        impressions: number;
        ctr: number;
        position: number;
        priorityMarket: boolean;
    }>;
    topSourceMediums: Array<{
        sourceMedium: string;
        sessions: number;
        engagedSessions: number;
    }>;
    topReferrers: Array<{
        referrer: string;
        sessions: number;
        engagedSessions: number;
    }>;
    pageRows: ContentPerformanceRow[];
    citeabilityAudit: {
        articleLayoutCoverage: {
            usingArticleLayout: number;
            totalMappedArticles: number;
        };
        directAnswerCoverage: {
            pagesWithAeoAnswer: number;
            totalMappedArticles: number;
        };
        llmsFullIncludesEditorialBodies: boolean;
        brandFactsNeedsAuthorityUpgrade: boolean;
        priorities: string[];
    };
    editorialQueues: {
        p1: EditorialQueueItem[];
        p2: EditorialQueueItem[];
        p3: EditorialQueueItem[];
        hold: EditorialQueueItem[];
        byBucket: Array<{
            bucket: ContentAuditBucket;
            items: EditorialQueueItem[];
        }>;
    };
    actionPlan: {
        refreshNow: string[];
        buildNext: string[];
        internalLinkFixes: string[];
        aeoLlmInfraFixes: string[];
        instrumentationLater: string[];
    };
};