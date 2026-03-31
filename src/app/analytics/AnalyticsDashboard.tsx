"use client";

import { Activity, ArrowRight, Gauge, MousePointerClick, Search } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Ga4DashboardData, GscDashboardData } from "@/lib/analytics/types";

type AnalyticsDashboardProps = {
    gscData: GscDashboardData | null;
    ga4Data: Ga4DashboardData | null;
    errors: string[];
};

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

export default function AnalyticsDashboard({ gscData, ga4Data, errors }: AnalyticsDashboardProps) {
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
            percent: ga4Data?.quizFunnel.start ? (ga4Data.quizFunnel.emailCapture / ga4Data.quizFunnel.start) : 0,
        },
    ];

    return (
        <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <div className="space-y-3">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Internal analytics</p>
                    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Search + product performance dashboard</h1>
                            <p className="mt-2 max-w-3xl text-sm text-muted-foreground md:text-base">
                                28-day view across Google Search Console and GA4 for search visibility, traffic quality, and the Faith Finder quiz funnel.
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {gscData?.range.startDate || ga4Data?.range.startDate} → {gscData?.range.endDate || ga4Data?.range.endDate}
                        </div>
                    </div>
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
                                        <span className="font-medium">{formatNumber(step.value)}{index > 0 ? ` · ${formatPercent(step.percent)}` : ""}</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.max(step.percent * 100, step.value > 0 ? 8 : 0)}%` }} />
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
                                                    {row.clicks > 0 && row.sessions > 0 ? <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /> : null}
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

                <div className={cn("text-xs text-muted-foreground")}>This page is intentionally internal-only and marked noindex/nofollow.</div>
            </div>
        </main>
    );
}