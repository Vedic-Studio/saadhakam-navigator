"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Radar,
    RadarChart,
    PolarAngleAxis,
    PolarGrid,
    ResponsiveContainer,
} from "recharts";
import {
    QuizResult,
    QuizScore,
    pathMetadata,
} from "@/data/faithFinderQuiz";
import { ArrowLeft, Share2 } from "lucide-react";

type ApiResponse = {
    id: string;
    createdAt: string;
    result: QuizResult;
};

function toRadarData(scores: QuizScore) {
    return [
        { axis: "Inquiry", value: scores.inquiry },
        { axis: "Devotion", value: scores.devotion },
        { axis: "Action", value: scores.ritual },
        { axis: "Practice", value: scores.discipline },
    ];
}

export default function FaithFinderResultsPage() {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<QuizResult | null>(null);

    const radarData = useMemo(() => {
        if (!result) return [];
        return toRadarData(result.scores);
    }, [result]);

    useEffect(() => {
        if (!id) return;

        let cancelled = false;
        const run = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`/api/faith-finder/result/${id}`);
                if (!res.ok) {
                    throw new Error(`Failed to load results (${res.status})`);
                }
                const data = (await res.json()) as ApiResponse;
                if (cancelled) return;

                setResult(data.result);

                // analytics (optional)
                if (
                    typeof window !== "undefined" &&
                    typeof window.sadhaka?.quizResultView === "function"
                ) {
                    window.sadhaka.quizResultView(data.result.primaryPath, "share_page");
                }
            } catch (e) {
                if (cancelled) return;
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                if (cancelled) return;
                setLoading(false);
            }
        };

        run();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const handleShare = async () => {
        const url = window.location.href;
        const title = "Faith Finder Result";
        const text = result
            ? `My Faith Finder result points toward ${pathMetadata[result.primaryPath].name}. Review the quiz here:`
            : "Take the Faith Finder quiz:";

        if (
            result &&
            typeof window !== "undefined" &&
            typeof window.sadhaka?.shareResult === "function"
        ) {
            window.sadhaka.shareResult(result.primaryPath, "share_button");
        }

        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
                return;
            } catch {
                // ignore and fallback to clipboard
            }
        }
        await navigator.clipboard.writeText(url);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-20">
                <div className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <div className="flex items-center justify-between gap-4">
                            <Button asChild variant="ghost" className="gap-2">
                                <Link href="/faith-finder">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back
                                </Link>
                            </Button>
                            <Button variant="outline" className="gap-2" onClick={handleShare}>
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                        </div>

                        {loading && (
                            <Card>
                                <CardHeader>
                                    <Skeleton className="h-8 w-56" />
                                    <Skeleton className="h-5 w-72" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-[320px] w-full" />
                                </CardContent>
                            </Card>
                        )}

                        {!loading && error && (
                            <Card className="border-destructive/30">
                                <CardHeader>
                                    <CardTitle>Couldn&apos;t load your results</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{error}</p>
                                </CardContent>
                            </Card>
                        )}

                        {!loading && !error && result && (
                            <>
                                <div className="text-center space-y-3">
                                    <Badge variant="outline">Faith Finder Results</Badge>
                                    <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                                        {pathMetadata[result.primaryPath].name}
                                    </h1>
                                    <p className="text-muted-foreground max-w-2xl mx-auto">
                                        A present-tense orientation based on your answers, not a fixed identity.
                                    </p>
                                </div>

                                <Card className="border-2">
                                    <CardHeader>
                                        <CardTitle>Score Breakdown</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-[320px] sm:h-[380px]">
                                            <ChartContainer
                                                config={{
                                                    value: {
                                                        label: "Affinity",
                                                        color: "hsl(var(--primary))",
                                                    },
                                                }}
                                            >
                                                <ResponsiveContainer>
                                                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                                                        <ChartTooltip content={<ChartTooltipContent />} />
                                                        <PolarGrid />
                                                        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 14 }} />
                                                        <Radar
                                                            dataKey="value"
                                                            stroke="var(--color-value)"
                                                            fill="var(--color-value)"
                                                            fillOpacity={0.25}
                                                        />
                                                    </RadarChart>
                                                </ResponsiveContainer>
                                            </ChartContainer>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Your Path Profile</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {pathMetadata[result.primaryPath].longDescription}
                                            </p>
                                            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                                                The chart reflects relative weighting inside this quiz only. It does not measure attainment, commitment, or formal lineage affiliation.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">Recommendations</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        Traditions
                                                    </p>
                                                    <p className="text-sm text-foreground">
                                                        {result.recommendations.traditions.join(" · ")}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        Practices
                                                    </p>
                                                    <p className="text-sm text-foreground">
                                                        {result.recommendations.practices.join(" · ")}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                        Philosophies
                                                    </p>
                                                    <p className="text-sm text-foreground">
                                                        {result.recommendations.philosophies.join(" · ")}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
