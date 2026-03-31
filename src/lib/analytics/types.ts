export type GscDashboardData = {
    source: "gsc";
    siteUrl: string;
    range: {
        startDate: string;
        endDate: string;
    };
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
    range: {
        startDate: string;
        endDate: string;
    };
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