import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Heart, Sparkles, Zap, Share2, Mail, CheckCircle2 } from "lucide-react";
import { QuizResult, pathMetadata } from "@/data/faithFinderQuiz";
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

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
    const [copied, setCopied] = useState(false);
    const IconComponent = pathIcons[result.primaryPath];
    const colors = pathColors[result.primaryPath];

    const metadata = pathMetadata[result.primaryPath];

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
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Header */}
            <div className="text-center space-y-6">
                <div className={`inline-flex items-center justify-center w-28 h-28 rounded-[2rem] ${colors.bg} ${colors.border} border-2 shadow-2xl shadow-current/5`}>
                    <IconComponent className={`w-14 h-14 ${colors.text}`} />
                </div>
                <div>
                    <h1 className="text-5xl font-bold text-foreground mb-4">
                        The {metadata.name}
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
                                            <p className="text-sm italic">"{metadata.slogan}"</p>
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
                                    <span className="text-primary mt-1">•</span>
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
                                    <span className="text-primary mt-1">•</span>
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
                                    <span className="text-primary mt-1">•</span>
                                    <span className="text-muted-foreground">{philosophy}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Email Capture */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 mt-12 mb-8">
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
                                Receive your personalized guidance, recommended resources, and a spiritual journey plan directly in your inbox.
                            </p>
                        </div>
                        <EmailCaptureForm
                            result={result}
                            onSuccess={() => { }}
                        />
                    </div>
                </CardContent>
            </Card>

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
    );
};
