import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Search, Heart, Flame, Dumbbell, Share2, Download, Mail, CheckCircle2, Copy } from "lucide-react";
import { QuizResult, getResultDescription } from "@/data/faithFinderQuiz";
import { EmailCaptureForm } from "./EmailCaptureForm";

interface ResultsPageProps {
    result: QuizResult;
    onRestart: () => void;
}

const pathIcons = {
    inquiry: Search,
    devotion: Heart,
    ritual: Flame,
    discipline: Dumbbell,
};

const pathColors = {
    inquiry: {
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20",
        text: "text-indigo-600",
        gradient: "from-indigo-500 to-purple-600"
    },
    devotion: {
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        text: "text-rose-600",
        gradient: "from-rose-500 to-pink-600"
    },
    ritual: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-600",
        gradient: "from-amber-500 to-orange-600"
    },
    discipline: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-600",
        gradient: "from-emerald-500 to-teal-600"
    },
};

const pathTitles = {
    inquiry: "Inquiry-led Path",
    devotion: "Devotion-led Path",
    ritual: "Ritual-led Path",
    discipline: "Discipline-led Path",
};

const pathDescriptions = {
    inquiry: "Your spiritual journey is guided by deep inquiry and contemplation. You seek to understand the nature of reality, consciousness, and the self through philosophical exploration and self-inquiry.",
    devotion: "Your spiritual journey flows from the heart. You feel a natural love for the Divine and find meaning in worship, surrender, and sacred relationship. Your practice is rooted in love and emotional connection.",
    ritual: "Your spiritual journey honors tradition and sacred action. You find power in precise ritual performance, ceremony, and the structured observance of spiritual rites. Your practice connects you to ancient wisdom.",
    discipline: "Your spiritual journey is one of methodical cultivation. You're drawn to systematic practice, training the mind and body through structured approaches. Your practice emphasizes self-mastery and consistent effort.",
};

export const ResultsPage = ({ result, onRestart }: ResultsPageProps) => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);
    const IconComponent = pathIcons[result.primaryPath];
    const colors = pathColors[result.primaryPath];

    const handleShare = async () => {
        const shareText = `I discovered my spiritual path is ${pathTitles[result.primaryPath]}! Take the Faith Finder Quiz to discover yours.`;
        const shareUrl = window.location.href;

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

    const handleDownload = () => {
        // In a real implementation, this would generate and download a PDF
        alert('PDF download feature coming soon! Enter your email to receive your report.');
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl ${colors.bg} ${colors.border} border-2`}>
                    <IconComponent className={`w-12 h-12 ${colors.text}`} />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                        Your Spiritual Path
                    </h1>
                    <h2 className={`text-2xl font-semibold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                        {pathTitles[result.primaryPath]}
                    </h2>
                    {result.secondaryPath && (
                        <Badge variant="secondary" className="mt-2">
                            Also influenced by: {pathTitles[result.secondaryPath]}
                        </Badge>
                    )}
                </div>
            </div>

            {/* Main Result Card */}
            <Card className={`border-2 ${colors.border}`}>
                <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Your Path</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        {pathDescriptions[result.primaryPath]}
                    </p>

                    <Separator className="my-6" />

                    <h3 className="text-xl font-semibold text-foreground mb-4">Your Scores</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(result.scores).map(([path, score]) => {
                            const PathIcon = pathIcons[path as keyof typeof pathIcons];
                            const isActive = path === result.primaryPath;
                            return (
                                <div
                                    key={path}
                                    className={`p-4 rounded-lg border-2 text-center ${isActive
                                            ? `${colors.bg} ${colors.border}`
                                            : 'bg-muted/30 border-border'
                                        }`}
                                >
                                    <PathIcon className={`w-6 h-6 mx-auto mb-2 ${isActive ? colors.text : 'text-muted-foreground'}`} />
                                    <div className="text-2xl font-bold text-foreground">{score}</div>
                                    <div className="text-xs text-muted-foreground capitalize">{path}</div>
                                </div>
                            );
                        })}
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
            {!emailSubmitted && (
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
                                    Receive a detailed PDF report with personalized guidance, resources, and a 30-day spiritual journey plan.
                                </p>
                            </div>
                            <EmailCaptureForm
                                result={result}
                                onSuccess={() => setEmailSubmitted(true)}
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {emailSubmitted && (
                <Card className="bg-green-500/10 border-green-500/20">
                    <CardContent className="p-6 text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Report Sent!
                        </h3>
                        <p className="text-muted-foreground">
                            Check your email for your complete spiritual path report.
                        </p>
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
                <Button onClick={handleDownload} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                </Button>
                <Button onClick={onRestart} variant="outline" className="gap-2">
                    Retake Quiz
                </Button>
            </div>
        </div>
    );
};
