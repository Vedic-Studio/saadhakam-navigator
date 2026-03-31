import type { Metadata } from "next";
import type { ContentAuditData, Ga4DashboardData, GscDashboardData } from "@/lib/analytics/types";

import AnalyticsDashboard from "./AnalyticsDashboard";
import { fetchContentAuditData } from "@/lib/analytics/content-audit";
import { fetchGa4DashboardData, fetchGscDashboardData } from "@/lib/analytics/google";

export const metadata: Metadata = {
    title: "Internal Analytics Dashboard",
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default async function AnalyticsPage() {
    const [gscResult, ga4Result, contentAuditResult] = await Promise.allSettled([
        fetchGscDashboardData(),
        fetchGa4DashboardData(),
        fetchContentAuditData(),
    ]);

    const errors: string[] = [];
    let gscData: GscDashboardData | null = null;
    let ga4Data: Ga4DashboardData | null = null;
    let contentAuditData: ContentAuditData | null = null;

    if (gscResult.status === "fulfilled") {
        gscData = gscResult.value;
    } else {
        errors.push(gscResult.reason instanceof Error ? gscResult.reason.message : "Failed to load Search Console data.");
    }

    if (ga4Result.status === "fulfilled") {
        ga4Data = ga4Result.value;
    } else {
        errors.push(ga4Result.reason instanceof Error ? ga4Result.reason.message : "Failed to load GA4 data.");
    }

    if (contentAuditResult.status === "fulfilled") {
        contentAuditData = contentAuditResult.value;
    } else {
        errors.push(contentAuditResult.reason instanceof Error ? contentAuditResult.reason.message : "Failed to load content audit data.");
    }

    return <AnalyticsDashboard gscData={gscData} ga4Data={ga4Data} contentAuditData={contentAuditData} errors={errors} />;
}