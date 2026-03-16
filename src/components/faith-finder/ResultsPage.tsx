import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
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
import { Brain, Heart, Sparkles, Zap, Share2, CheckCircle2, Mail } from "lucide-react";
import { QuizResult, QuizScore, pathMetadata } from "@/data/faithFinderQuiz";
import { EmailCaptureForm } from "./EmailCaptureForm";

interface ResultsPageProps {
    result: QuizResult;
    onRestart: () => void;
}

const pathIcons = {
    inquiry: Brain,
    devotion: Heart,
    ritual: Sparkles,
    discipline: Zap,
};

const pathColors = {
    inquiry: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-600",
        gradient: "from-amber-500 to-orange-600"
    },
    devotion: {
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        text: "text-rose-600",
        gradient: "from-rose-500 to-pink-600"
    },
    ritual: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-600",
        gradient: "from-orange-500 to-amber-600"
    },
    discipline: {
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
        text: "text-indigo-600",
        gradient: "from-indigo-500 to-purple-600"
    },
};

function toRadarData(scores: QuizScore) {
    return [
        { axis: "Inquiry", value: scores.inquiry },
        { axis: "Devotion", value: scores.devotion },
        { axis: "Action", value: scores.ritual },
        { axis: "Practice", value: scores.discipline },
    ];
}

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
    const [copied, setCopied] = useState(false);
    const [showEmailOverlay, setShowEmailOverlay] = useState(true);
    const [emailCaptured, setEmailCaptured] = useState(false);

    const IconComponent = pathIcons[result.primaryPath];
    const colors = pathColors[result.primaryPath];
    const metadata = pathMetadata[result.primaryPath];

    const radarData = useMemo(() => toRadarData(result.scores), [result.scores]);

    const handleShare = async () => {
        const shareText = `I discovered my spiritual path is ${metadata.name}! Take the Faith Finder Quiz to discover yours.`;
        const shareUrl = window.location.href;

        if (typeof window !== "undefined" && typeof window.sadhaka?.shareResult === "function") {
            window.sadhaka.shareResult(result.primaryPath, "results_page");
        }

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Spiritual Path',
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Share failed:', err);
            }
        } else {
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleEmailSuccess = () => {
        setEmailCaptured(true);
        setShowEmailOverlay(false);
    };

    return (
        <>
            {/* Email capture overlay */}
            <Dialog open={showEmailOverlay && !emailCaptured} onOpenChange={setShowEmailOverlay}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.bg} ${colors.border} border-2`}>
                                <IconComponent className={`w-8 h-8 ${colors.text}`} />
                            </div>
                        </div>
                        <DialogTitle className="text-center text-2xl">
                            Your path: {metadata.name}
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Enter your email to unlock your full Dharmic Architecture report, personalized practice plan, and a 6-part guidance series.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <EmailCaptureForm
                            result={result}
                            onSuccess={handleEmailSuccess}
                            inline={false}
                        />
                        <button
                            onClick={() => setShowEmailOverlay(false)}
                            className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors"
                        >
                            Skip for now
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Full results page */}
            <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                {/* Header */}
                <div className="text-center space-y-6">
                    <div className={`inline-flex items-center justify-center w-28 h-28 rounded-[2rem] ${colors.bg} ${colors.border} border-2 shadow-2xl shadow-current/5`}>
                        <IconComponent className={`w-14 h-14 ${colors.text}`} />
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold text-foreground mb-4">
                            {metadata.name}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Badge className={`text-lg py-1 px-5 rounded-full bg-gradient-to-r ${colors.gradient} text-white border-0`}>
                                {metadata.archetype}
                            </Badge>
                            {result.secondaryPath && (
                                <Badge variant="outline" className="text-lg py-1 px-5 rounded-full">
                                    Sub-path: {pathMetadata[result.secondaryPath].name}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Radar Chart */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Lineage Mirror</CardTitle>
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

                {/* Main Result Card */}
                <Card className={`border-2 ${colors.border} bg-card/50 backdrop-blur-sm overflow-hidden`}>
                    <div className={`h-2 bg-gradient-to-r ${colors.gradient}`} />
                    <CardContent className="p-10">
                        <div className="grid lg:grid-cols-[1fr,300px] gap-12">
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-6">Your Dharmic Architecture</h3>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    {metadata.longDescription}
                                </p>

                                <Separator className="my-8" />

                                <h3 className="text-xl font-bold text-foreground mb-6">Lineage Affinity Breakdown</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                    {Object.entries(result.scores).map(([path, score]) => {
                                        const PathIcon = pathIcons[path as keyof typeof pathIcons];
                                        const pathMeta = pathMetadata[path as keyof typeof pathMetadata];
                                        const isActive = path === result.primaryPath;
                                        const pathCol = pathColors[path as keyof typeof pathColors];
                                        return (
                                            <div
                                                key={path}
                                                className={`p-5 rounded-2xl border-2 transition-all ${isActive
                                                    ? `${pathCol.bg} ${pathCol.border} scale-105 shadow-lg`
                                                    : 'bg-muted/10 border-border opacity-60 hover:opacity-100'
                                                    }`}
                                            >
                                                <PathIcon className={`w-8 h-8 mx-auto mb-3 ${isActive ? pathCol.text : 'text-muted-foreground'}`} />
                                                <div className="text-3xl font-bold text-foreground">{score}</div>
                                                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">{pathMeta.name.replace('The Way of ', '')}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card className="bg-secondary/5 border-secondary/20 h-full">
                                    <CardContent className="p-6">
                                        <h4 className="font-bold text-foreground mb-4">Dominant Trait</h4>
                                        <div className="space-y-4">
                                            <div className="p-4 rounded-xl bg-background border border-border">
                                                <p className="text-sm italic">&ldquo;{metadata.slogan}&rdquo;</p>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                Your high score in {metadata.name} suggests a deep-seated need for {result.primaryPath === 'inquiry' ? 'rational proof' : result.primaryPath === 'devotion' ? 'emotional connection' : result.primaryPath === 'ritual' ? 'structured order' : 'direct experience'}.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recommendations */}
                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recommended Traditions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {result.recommendations.traditions.map((tradition) => (
                                    <li key={tradition} className="flex items-start gap-2 text-sm">
                                        <span className="text-primary mt-1">&bull;</span>
                                        <span className="text-muted-foreground">{tradition}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recommended Practices</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {result.recommendations.practices.map((practice) => (
                                    <li key={practice} className="flex items-start gap-2 text-sm">
                                        <span className="text-primary mt-1">&bull;</span>
                                        <span className="text-muted-foreground">{practice}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Philosophies to Explore</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {result.recommendations.philosophies.map((philosophy) => (
                                    <li key={philosophy} className="flex items-start gap-2 text-sm">
                                        <span className="text-primary mt-1">&bull;</span>
                                        <span className="text-muted-foreground">{philosophy}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Email CTA (for users who skipped the overlay) */}
                {!emailCaptured && (
                    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Mail className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-xl font-semibold text-foreground mb-2">
                                        Get Your Complete Report
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Receive your personalized guidance, recommended resources, and a 6-part spiritual journey series.
                                    </p>
                                </div>
                                <EmailCaptureForm
                                    result={result}
                                    onSuccess={handleEmailSuccess}
                                    inline
                                />
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={handleShare} variant="outline" className="gap-2">
                        {copied ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Share2 className="w-4 h-4" />
                                Share Results
                            </>
                        )}
                    </Button>
                    <Button onClick={onRestart} variant="outline" className="gap-2">
                        Retake Quiz
                    </Button>
                </div>
            </div>
        </>
    );
};
