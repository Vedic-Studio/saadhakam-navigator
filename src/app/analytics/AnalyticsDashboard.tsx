"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowRight, Gauge, MousePointerClick, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type {
    ContentAuditBucket,
    ContentAuditData,
    ContentPerformanceRow,
    EditorialQueueItem,
    EditorialQueuePriority,
    Ga4DashboardData,
    GscDashboardData,
} from "@/lib/analytics/types";
import { cn } from "@/lib/utils";

type AnalyticsDashboardProps = {
    gscData: GscDashboardData | null;
    ga4Data: Ga4DashboardData | null;
    contentAuditData: ContentAuditData | null;
    errors: string[];
};

type DashboardTab = "operational" | "strategic";

const performanceChartConfig = {
    clicks: {
        label: "Clicks",
        color: "hsl(var(--chart-1))",
    },
    sessions: {
        label: "Sessions",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const eventsChartConfig = {
    eventCount: {
        label: "Event count",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

function formatNumber(value?: number, maximumFractionDigits = 0) {
    if (value === undefined || value === null || Number.isNaN(value)) return "—";
    return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

function formatPercent(value?: number) {
    if (value === undefined || value === null || Number.isNaN(value)) return "—";
    return `${(value * 100).toFixed(1)}%`;
}

function formatDateLabel(value: string) {
    if (!value) return "";

    if (/^\d{8}$/.test(value)) {
        const year = value.slice(0, 4);
        const month = value.slice(4, 6);
        const day = value.slice(6, 8);
        return new Date(`${year}-${month}-${day}T00:00:00Z`).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            timeZone: "UTC",
        });
    }

    return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
}

function formatDuration(seconds?: number) {
    if (seconds === undefined || seconds === null || Number.isNaN(seconds)) return "—";
    if (seconds < 60) return `${formatNumber(seconds)}s`;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
}

function formatDelta(value?: number, maximumFractionDigits = 1, inverse = false) {
    if (value === undefined || value === null || Number.isNaN(value) || value === 0) return "Flat";

    const improving = inverse ? value < 0 : value > 0;
    const label = `${improving ? "+" : ""}${new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value)}`;
    return improving ? `${label} improving` : `${label} softening`;
}

function formatBucketLabel(bucket: ContentAuditBucket) {
    return bucket.replace(/-/g, " ").replace(/\b\w/g, (match) => match.toUpperCase());
}

function formatPriorityLabel(priority: EditorialQueuePriority) {
    switch (priority) {
        case "p1":
            return "P1 now";
        case "p2":
            return "P2 next";
        case "p3":
            return "P3 later";
        case "hold":
            return "Hold";
    }
}

function priorityTone(priority: EditorialQueuePriority) {
    switch (priority) {
        case "p1":
            return "bg-rose-500/15 text-rose-200 border-rose-500/20";
        case "p2":
            return "bg-amber-500/15 text-amber-200 border-amber-500/20";
        case "p3":
            return "bg-sky-500/15 text-sky-200 border-sky-500/20";
        case "hold":
            return "bg-muted text-muted-foreground border-border";
    }
}

function mergeTopPages(gscPages: GscDashboardData["topPages"] = [], ga4Pages: Ga4DashboardData["topPages"] = []) {
    const byPage = new Map<
        string,
        {
            page: string;
            clicks: number;
            impressions: number;
            position: number;
            sessions: number;
            views: number;
        }
    >();

    for (const page of gscPages) {
        byPage.set(page.page, {
            page: page.page,
            clicks: page.clicks,
            impressions: page.impressions,
            position: page.position,
            sessions: 0,
            views: 0,
        });
    }

    for (const page of ga4Pages) {
        const current = byPage.get(page.page) || {
            page: page.page,
            clicks: 0,
            impressions: 0,
            position: 0,
            sessions: 0,
            views: 0,
        };

        byPage.set(page.page, {
            ...current,
            sessions: page.sessions,
            views: page.views,
        });
    }

    return [...byPage.values()].sort((a, b) => b.clicks + b.sessions - (a.clicks + a.sessions)).slice(0, 10);
}

function mergeTrendData(gscTrend: GscDashboardData["trend"] = [], ga4Trend: Ga4DashboardData["trend"] = []) {
    const rows = new Map<string, { date: string; clicks: number; sessions: number }>();

    for (const item of gscTrend) {
        rows.set(item.date, {
            date: item.date,
            clicks: item.clicks,
            sessions: 0,
        });
    }

    for (const item of ga4Trend) {
        const normalizedDate = /^\d{8}$/.test(item.date)
            ? `${item.date.slice(0, 4)}-${item.date.slice(4, 6)}-${item.date.slice(6, 8)}`
            : item.date;
        const current = rows.get(normalizedDate) || { date: normalizedDate, clicks: 0, sessions: 0 };
        rows.set(normalizedDate, {
            ...current,
            sessions: item.sessions,
        });
    }

    return [...rows.values()].sort((a, b) => a.date.localeCompare(b.date));
}

function bucketTone(bucket: ContentAuditBucket) {
    switch (bucket) {
        case "double-down":
            return "bg-emerald-500/15 text-emerald-200 border-emerald-500/20";
        case "improve-ctr-rank":
            return "bg-sky-500/15 text-sky-200 border-sky-500/20";
        case "improve-conversion-path":
            return "bg-amber-500/15 text-amber-200 border-amber-500/20";
        case "expand-cluster":
            return "bg-violet-500/15 text-violet-200 border-violet-500/20";
        case "aeo-llm-repair":
            return "bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/20";
        case "deprioritize-or-contain":
            return "bg-rose-500/15 text-rose-200 border-rose-500/20";
        case "monitor":
            return "bg-muted text-muted-foreground border-border";
    }
}

function KpiCard({
    title,
    value,
    description,
    icon: Icon,
}: {
    title: string;
    value: string;
    description: string;
    icon: typeof Search;
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div>
                    <CardDescription>{title}</CardDescription>
                    <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
                </div>
                <div className="rounded-full border border-border/60 bg-muted/30 p-2 text-muted-foreground">
                    <Icon className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}

function StrategicKpiCard({ title, value, description }: { title: string; value: string; description: string }) {
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}

function StrategicTable({
    title,
    description,
    rows,
}: {
    title: string;
    description: string;
    rows: ContentPerformanceRow[];
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead className="text-right">ICP</TableHead>
                            <TableHead className="text-right">Clicks</TableHead>
                            <TableHead className="text-right">Sessions</TableHead>
                            <TableHead className="text-right">Qualified</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => {
                                const qualified = row.ga4.events.quizComplete + row.ga4.events.emailCapture;

                                return (
                                    <TableRow key={row.route}>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="font-medium">{row.title}</div>
                                                <div className="text-xs text-muted-foreground">{row.route}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">{formatNumber(row.icp.score, 1)}</TableCell>
                                        <TableCell className="text-right">{formatNumber(row.gsc.clicks)}</TableCell>
                                        <TableCell className="text-right">{formatNumber(row.ga4.sessions)}</TableCell>
                                        <TableCell className="text-right">{formatNumber(qualified)}</TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    No rows available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function EditorialQueueTable({ title, description, rows }: { title: string; description: string; rows: EditorialQueueItem[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead className="text-right">ICP</TableHead>
                            <TableHead className="text-right">Qualified</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length > 0 ? (
                            rows.map((row) => (
                                <TableRow key={`${row.priority}-${row.route}`}>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="font-medium">{row.title}</div>
                                            <div className="text-xs text-muted-foreground">{row.route}</div>
                                            <div className="text-xs text-muted-foreground">{row.proposedFix}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="uppercase text-muted-foreground">{row.owner}</TableCell>
                                    <TableCell className="text-muted-foreground">{row.targetWindow}</TableCell>
                                    <TableCell className="text-right">{formatNumber(row.icpScore, 1)}</TableCell>
                                    <TableCell className="text-right">{formatNumber(row.qualification.qualifiedConversions)}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    No queue items available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function AnalyticsDashboard({ gscData, ga4Data, contentAuditData, errors }: AnalyticsDashboardProps) {
    const [activeTab, setActiveTab] = useState<DashboardTab>("operational");
    const trendData = mergeTrendData(gscData?.trend, ga4Data?.trend);
    const topPages = mergeTopPages(gscData?.topPages, ga4Data?.topPages);
    const funnelSteps = [
        {
            label: "Quiz starts",
            value: ga4Data?.quizFunnel.start ?? 0,
            percent: 1,
        },
        {
            label: "Quiz completes",
            value: ga4Data?.quizFunnel.complete ?? 0,
            percent: ga4Data?.quizFunnel.completionRate ?? 0,
        },
        {
            label: "Email captures",
            value: ga4Data?.quizFunnel.emailCapture ?? 0,
            percent: ga4Data?.quizFunnel.start ? ga4Data.quizFunnel.emailCapture / ga4Data.quizFunnel.start : 0,
        },
    ];

    const strategicSummary = useMemo(() => {
        if (!contentAuditData) return null;

        const totalQualified = contentAuditData.pageRows.reduce(
            (sum, row) => sum + row.ga4.events.quizComplete + row.ga4.events.emailCapture,
            0,
        );
        const averageIcp =
            contentAuditData.pageRows.length > 0
                ? contentAuditData.pageRows.reduce((sum, row) => sum + row.icp.score, 0) / contentAuditData.pageRows.length
                : 0;

        return {
            totalPages: contentAuditData.pageRows.length,
            totalQualified,
            averageIcp,
            bucketRows: contentAuditData.portfolioScorecard.byDecisionBucket,
            spotlight: contentAuditData.pageRows[0] ?? null,
        };
    }, [contentAuditData]);

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <div className="space-y-3">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Internal analytics</p>
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Search + product performance dashboard</h1>
                            <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
                                Operational monitoring for 28-day GSC + GA4 performance, plus a strategic 90-day content audit for editorial prioritization.
                            </p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                            <div>
                                {gscData?.range.startDate || ga4Data?.range.startDate} → {gscData?.range.endDate || ga4Data?.range.endDate}
                            </div>
                            {contentAuditData ? (
                                <div className="mt-1">
                                    Audit: {contentAuditData.range.current.startDate} → {contentAuditData.range.current.endDate}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="inline-flex w-fit rounded-lg border border-border/70 bg-muted/30 p-1">
                    {([
                        ["operational", "Operational view"],
                        ["strategic", "Strategic content audit"],
                    ] as const).map(([value, label]) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setActiveTab(value)}
                            className={cn(
                                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                                activeTab === value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {errors.length > 0 ? (
                    <div className="grid gap-3">
                        {errors.map((error) => (
                            <div key={error} className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                                {error}
                            </div>
                        ))}
                    </div>
                ) : null}

                {activeTab === "operational" ? (
                    <>
                        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <KpiCard
                                title="Clicks"
                                value={formatNumber(gscData?.overview.clicks)}
                                description="Organic clicks from Search Console."
                                icon={MousePointerClick}
                            />
                            <KpiCard
                                title="Impressions"
                                value={formatNumber(gscData?.overview.impressions)}
                                description="Total search impressions over the last 28 days."
                                icon={Search}
                            />
                            <KpiCard
                                title="Avg Position"
                                value={formatNumber(gscData?.overview.position, 1)}
                                description={`CTR ${formatPercent(gscData?.overview.ctr)} across ranking queries.`}
                                icon={Gauge}
                            />
                            <KpiCard
                                title="Sessions"
                                value={formatNumber(ga4Data?.overview.sessions)}
                                description={`Users ${formatNumber(ga4Data?.overview.users)} · Engagement ${formatPercent(ga4Data?.overview.engagementRate)}`}
                                icon={Activity}
                            />
                        </section>

                        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">28-day performance trend</CardTitle>
                                    <CardDescription>Organic clicks from GSC against GA4 sessions.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {trendData.length > 0 ? (
                                        <ChartContainer className="h-[320px] w-full" config={performanceChartConfig}>
                                            <LineChart data={trendData} margin={{ left: 12, right: 12, top: 8 }}>
                                                <CartesianGrid vertical={false} />
                                                <XAxis dataKey="date" tickFormatter={formatDateLabel} tickLine={false} axisLine={false} minTickGap={24} />
                                                <YAxis yAxisId="left" tickLine={false} axisLine={false} width={40} />
                                                <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} width={40} />
                                                <ChartTooltip content={<ChartTooltipContent labelFormatter={(label) => formatDateLabel(String(label || ""))} />} />
                                                <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="var(--color-clicks)" strokeWidth={2.5} dot={false} />
                                                <Line yAxisId="right" type="monotone" dataKey="sessions" stroke="var(--color-sessions)" strokeWidth={2.5} dot={false} />
                                            </LineChart>
                                        </ChartContainer>
                                    ) : (
                                        <div className="flex h-[320px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                            No trend data available yet.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Quiz funnel</CardTitle>
                                    <CardDescription>Using live event names from the Faith Finder analytics bridge.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {funnelSteps.map((step, index) => (
                                        <div key={step.label} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">{step.label}</span>
                                                <span className="font-medium">
                                                    {formatNumber(step.value)}
                                                    {index > 0 ? ` · ${formatPercent(step.percent)}` : ""}
                                                </span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full rounded-full bg-primary transition-all"
                                                    style={{ width: `${Math.max(step.percent * 100, step.value > 0 ? 8 : 0)}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <div className="grid gap-3 rounded-lg border bg-muted/20 p-4 text-sm md:grid-cols-2">
                                        <div>
                                            <p className="text-muted-foreground">Start → Complete</p>
                                            <p className="mt-1 text-lg font-semibold">{formatPercent(ga4Data?.quizFunnel.completionRate)}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Complete → Email</p>
                                            <p className="mt-1 text-lg font-semibold">{formatPercent(ga4Data?.quizFunnel.emailCaptureRate)}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Top queries</CardTitle>
                                    <CardDescription>Highest-visibility search terms from Search Console.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Query</TableHead>
                                                <TableHead className="text-right">Clicks</TableHead>
                                                <TableHead className="text-right">Impr.</TableHead>
                                                <TableHead className="text-right">CTR</TableHead>
                                                <TableHead className="text-right">Pos.</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {(gscData?.topQueries ?? []).length > 0 ? (
                                                gscData?.topQueries.map((row) => (
                                                    <TableRow key={row.query}>
                                                        <TableCell className="max-w-[320px] truncate font-medium">{row.query}</TableCell>
                                                        <TableCell className="text-right">{formatNumber(row.clicks)}</TableCell>
                                                        <TableCell className="text-right">{formatNumber(row.impressions)}</TableCell>
                                                        <TableCell className="text-right">{formatPercent(row.ctr)}</TableCell>
                                                        <TableCell className="text-right">{formatNumber(row.position, 1)}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                        No query data available.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Events</CardTitle>
                                    <CardDescription>Most frequent GA4 events across the period.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {(ga4Data?.events ?? []).length > 0 ? (
                                        <ChartContainer className="h-[320px] w-full" config={eventsChartConfig}>
                                            <BarChart data={ga4Data?.events} layout="vertical" margin={{ left: 8, right: 8 }}>
                                                <CartesianGrid horizontal={false} />
                                                <XAxis type="number" tickLine={false} axisLine={false} />
                                                <YAxis
                                                    type="category"
                                                    dataKey="eventName"
                                                    tickLine={false}
                                                    axisLine={false}
                                                    width={130}
                                                    tickFormatter={(value) => String(value).replace(/^faith_finder_/, "ff_")}
                                                />
                                                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                                <Bar dataKey="eventCount" fill="var(--color-eventCount)" radius={6} />
                                            </BarChart>
                                        </ChartContainer>
                                    ) : (
                                        <div className="flex h-[320px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                                            No GA4 event data available yet.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </section>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Top pages</CardTitle>
                                <CardDescription>Search Console and GA4 page-level performance combined into one internal view.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Page</TableHead>
                                            <TableHead className="text-right">Clicks</TableHead>
                                            <TableHead className="text-right">Impr.</TableHead>
                                            <TableHead className="text-right">Sessions</TableHead>
                                            <TableHead className="text-right">Views</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {topPages.length > 0 ? (
                                            topPages.map((row) => (
                                                <TableRow key={row.page}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <span className="max-w-[520px] truncate font-medium">{row.page}</span>
                                                            {row.clicks > 0 && row.sessions > 0 ? (
                                                                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                                                            ) : null}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">{formatNumber(row.clicks)}</TableCell>
                                                    <TableCell className="text-right">{formatNumber(row.impressions)}</TableCell>
                                                    <TableCell className="text-right">{formatNumber(row.sessions)}</TableCell>
                                                    <TableCell className="text-right">{formatNumber(row.views)}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                    No page data available.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </>
                ) : contentAuditData && strategicSummary ? (
                    <>
                        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <StrategicKpiCard
                                title="Mapped articles"
                                value={formatNumber(strategicSummary.totalPages)}
                                description="Total article rows included in the joined 90-day audit layer."
                            />
                            <StrategicKpiCard
                                title="Average ICP"
                                value={formatNumber(strategicSummary.averageIcp, 1)}
                                description="Portfolio mean across intent, geo, behavior, and qualification fit."
                            />
                            <StrategicKpiCard
                                title="Qualified conversions"
                                value={formatNumber(strategicSummary.totalQualified)}
                                description="Quiz completions + email captures across the mapped content portfolio."
                            />
                            <StrategicKpiCard
                                title="Direct-answer coverage"
                                value={`${formatNumber(contentAuditData.citeabilityAudit.directAnswerCoverage.pagesWithAeoAnswer)}/${formatNumber(contentAuditData.citeabilityAudit.directAnswerCoverage.totalMappedArticles)}`}
                                description="Pages with direct-answer metadata ready for citeability and AEO work."
                            />
                        </section>

                        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Executive summary</CardTitle>
                                    <CardDescription>Portfolio-level readout from the strategic audit layer.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Overview</p>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {contentAuditData.executiveSummary.overview.map((item) => (
                                                <li key={item} className="rounded-md border border-border/60 bg-muted/20 p-3">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Biggest leaks</p>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {contentAuditData.executiveSummary.biggestLeaks.length > 0 ? (
                                                contentAuditData.executiveSummary.biggestLeaks.map((item) => (
                                                    <li key={item} className="rounded-md border border-border/60 bg-muted/20 p-3">
                                                        {item}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="rounded-md border border-dashed p-3">No leak summaries generated yet.</li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium">Growth bets</p>
                                        <ul className="space-y-2 text-sm text-muted-foreground">
                                            {contentAuditData.executiveSummary.growthBets.length > 0 ? (
                                                contentAuditData.executiveSummary.growthBets.map((item) => (
                                                    <li key={item} className="rounded-md border border-border/60 bg-muted/20 p-3">
                                                        {item}
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="rounded-md border border-dashed p-3">No growth bets surfaced yet.</li>
                                            )}
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Citeability panel</CardTitle>
                                    <CardDescription>AEO and LLM readiness signals surfaced directly in the audit.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="rounded-lg border bg-muted/20 p-4">
                                            <p className="text-sm text-muted-foreground">ArticleLayout coverage</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                {formatNumber(contentAuditData.citeabilityAudit.articleLayoutCoverage.usingArticleLayout)}/
                                                {formatNumber(contentAuditData.citeabilityAudit.articleLayoutCoverage.totalMappedArticles)}
                                            </p>
                                        </div>
                                        <div className="rounded-lg border bg-muted/20 p-4">
                                            <p className="text-sm text-muted-foreground">Direct answers</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                {formatNumber(contentAuditData.citeabilityAudit.directAnswerCoverage.pagesWithAeoAnswer)}/
                                                {formatNumber(contentAuditData.citeabilityAudit.directAnswerCoverage.totalMappedArticles)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>
                                            llms-full.txt editorial body exposure: {contentAuditData.citeabilityAudit.llmsFullIncludesEditorialBodies ? "ready" : "not yet exposed"}
                                        </p>
                                        <p>
                                            Brand facts authority framing: {contentAuditData.citeabilityAudit.brandFactsNeedsAuthorityUpgrade ? "needs upgrade" : "healthy"}
                                        </p>
                                    </div>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {contentAuditData.citeabilityAudit.priorities.map((item) => (
                                            <li key={item} className="rounded-md border border-border/60 bg-muted/20 p-3">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Decision bucket summary</CardTitle>
                                    <CardDescription>Counts and qualified conversions grouped by recommended action.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {strategicSummary.bucketRows.map((row) => (
                                            <div key={row.label} className="rounded-lg border border-border/70 bg-muted/20 p-4">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="font-medium">{formatBucketLabel(row.label as ContentAuditBucket)}</p>
                                                        <p className="mt-1 text-sm text-muted-foreground">
                                                            {formatNumber(row.pages)} pages · {formatNumber(row.qualifiedConversions)} qualified
                                                        </p>
                                                    </div>
                                                    <span
                                                        className={cn(
                                                            "rounded-full border px-2.5 py-1 text-xs font-medium",
                                                            bucketTone(row.label as ContentAuditBucket),
                                                        )}
                                                    >
                                                        ICP {formatNumber(row.averageIcpScore, 1)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Portfolio scorecards</CardTitle>
                                    <CardDescription>Best-performing pillars and route families from the audit model.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    <div>
                                        <p className="mb-2 text-sm font-medium">By pillar</p>
                                        <div className="space-y-2">
                                            {contentAuditData.portfolioScorecard.byPillar.slice(0, 5).map((row) => (
                                                <div
                                                    key={row.label}
                                                    className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm"
                                                >
                                                    <span>{row.label}</span>
                                                    <span className="text-muted-foreground">
                                                        {formatNumber(row.pages)} pages · ICP {formatNumber(row.averageIcpScore, 1)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-medium">By route family</p>
                                        <div className="space-y-2">
                                            {contentAuditData.portfolioScorecard.byRouteFamily.slice(0, 5).map((row) => (
                                                <div
                                                    key={row.label}
                                                    className="flex items-center justify-between rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-sm"
                                                >
                                                    <span>{row.label}</span>
                                                    <span className="text-muted-foreground">
                                                        {formatNumber(row.sessions)} sessions · {formatNumber(row.qualifiedConversions)} qualified
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        <section className="grid gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Phase 3 editorial queues</CardTitle>
                                    <CardDescription>Actionable workboard derived from decision buckets, qualification gaps, and citeability signals.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                                        {([
                                            ["p1", contentAuditData.editorialQueues.p1, "Highest-priority work for this week."],
                                            ["p2", contentAuditData.editorialQueues.p2, "Strong candidates for the next sprint."],
                                            ["p3", contentAuditData.editorialQueues.p3, "Useful backlog items after higher-impact fixes."],
                                            ["hold", contentAuditData.editorialQueues.hold, "Low-investment or containment-only pages."],
                                        ] as const).map(([priority, items, description]) => (
                                            <div key={priority} className="rounded-lg border border-border/70 bg-muted/20 p-4">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="font-medium">{formatPriorityLabel(priority)}</p>
                                                        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                                                    </div>
                                                    <span
                                                        className={cn(
                                                            "rounded-full border px-2.5 py-1 text-xs font-medium",
                                                            priorityTone(priority),
                                                        )}
                                                    >
                                                        {formatNumber(items.length)} items
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid gap-6 xl:grid-cols-2">
                                        <EditorialQueueTable
                                            title="P1 now"
                                            description="Immediate editorial, conversion, and AEO repairs to ship first."
                                            rows={contentAuditData.editorialQueues.p1}
                                        />
                                        <EditorialQueueTable
                                            title="P2 next"
                                            description="Next-sprint opportunities with strong upside once P1 work is moving."
                                            rows={contentAuditData.editorialQueues.p2}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        <section className="grid gap-6 xl:grid-cols-2">
                            <StrategicTable title="Winners" description="Pages to expand, refresh, and amplify." rows={contentAuditData.winners} />
                            <StrategicTable
                                title="CTR / rank opportunities"
                                description="Pages with visibility that deserve title, meta, and intro tuning."
                                rows={contentAuditData.rankingOpportunities}
                            />
                            <StrategicTable
                                title="Conversion leaks"
                                description="Pages with attention but weak downstream qualification."
                                rows={contentAuditData.conversionLeaks}
                            />
                            <StrategicTable
                                title="AEO / LLM repairs"
                                description="Pages missing direct-answer, citeability, or supporting structure."
                                rows={contentAuditData.aeoLlmRepairs}
                            />
                        </section>

                        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Action plan</CardTitle>
                                    <CardDescription>Immediate operational queues derived from the strategic content audit.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    {([
                                        ["Refresh now", contentAuditData.actionPlan.refreshNow],
                                        ["Build next", contentAuditData.actionPlan.buildNext],
                                        ["Internal-link fixes", contentAuditData.actionPlan.internalLinkFixes],
                                        ["AEO / infra fixes", contentAuditData.actionPlan.aeoLlmInfraFixes],
                                        ["Instrumentation later", contentAuditData.actionPlan.instrumentationLater],
                                    ] as const).map(([title, items]) => (
                                        <div key={title} className="space-y-2 rounded-lg border border-border/70 bg-muted/20 p-4">
                                            <p className="font-medium">{title}</p>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                {items.length > 0 ? items.map((item) => <li key={item}>{item}</li>) : <li>No items yet.</li>}
                                            </ul>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">Priority article spotlight</CardTitle>
                                    <CardDescription>Top-scoring article row from the audit for fast review.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {strategicSummary.spotlight ? (
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between gap-3">
                                                    <h3 className="text-lg font-semibold">{strategicSummary.spotlight.title}</h3>
                                                    <span
                                                        className={cn(
                                                            "rounded-full border px-2.5 py-1 text-xs font-medium",
                                                            bucketTone(strategicSummary.spotlight.decisionBucket),
                                                        )}
                                                    >
                                                        {formatBucketLabel(strategicSummary.spotlight.decisionBucket)}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-muted-foreground">{strategicSummary.spotlight.route}</p>
                                            </div>
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div className="rounded-lg border bg-muted/20 p-3">
                                                    <p className="text-sm text-muted-foreground">ICP score</p>
                                                    <p className="mt-1 text-2xl font-semibold">{formatNumber(strategicSummary.spotlight.icp.score, 1)}</p>
                                                </div>
                                                <div className="rounded-lg border bg-muted/20 p-3">
                                                    <p className="text-sm text-muted-foreground">Avg engagement time</p>
                                                    <p className="mt-1 text-2xl font-semibold">
                                                        {formatDuration(strategicSummary.spotlight.ga4.averageEngagementTime)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid gap-2 text-sm text-muted-foreground">
                                                <p>
                                                    Clicks: {formatNumber(strategicSummary.spotlight.gsc.clicks)} · {formatDelta(strategicSummary.spotlight.gsc.clicksDelta)}
                                                </p>
                                                <p>
                                                    Sessions: {formatNumber(strategicSummary.spotlight.ga4.sessions)} · {formatDelta(strategicSummary.spotlight.ga4.sessionsDelta)}
                                                </p>
                                                <p>
                                                    Position delta: {formatDelta(strategicSummary.spotlight.gsc.positionDelta, 1, true)}
                                                </p>
                                                <p>
                                                    Top queries: {strategicSummary.spotlight.topQueries.join(", ") || "No query matches yet."}
                                                </p>
                                            </div>
                                            {strategicSummary.spotlight.aeoLlmFlags.length > 0 ? (
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    {strategicSummary.spotlight.aeoLlmFlags.map((flag) => (
                                                        <li key={flag} className="rounded-md border border-border/60 bg-muted/20 p-3">
                                                            {flag}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : null}
                                        </div>
                                    ) : (
                                        <div className="text-sm text-muted-foreground">No audit rows available yet.</div>
                                    )}
                                </CardContent>
                            </Card>
                        </section>
                    </>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Strategic content audit unavailable</CardTitle>
                            <CardDescription>The operational dashboard is still available while the audit layer is unavailable.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Check the content audit service or credentials, then reload this page.
                        </CardContent>
                    </Card>
                )}

                <div className={cn("text-xs text-muted-foreground")}>
                    This page is intentionally internal-only and marked noindex/nofollow.
                </div>
            </div>
        </main>
    );
}
