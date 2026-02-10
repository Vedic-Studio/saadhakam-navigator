import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { QuizContainer } from "@/components/faith-finder/QuizContainer";
import { ResultsPage } from "@/components/faith-finder/ResultsPage";
import { QuizResult } from "@/data/faithFinderQuiz";

type QuizState = "intro" | "quiz" | "results";

const FaithFinder = () => {
    const [quizState, setQuizState] = useState<QuizState>("intro");
    const [result, setResult] = useState<QuizResult | null>(null);

    const handleStartQuiz = () => {
        setQuizState("quiz");
    };

    const handleQuizComplete = (quizResult: QuizResult) => {
        setResult(quizResult);
        setQuizState("results");
    };

    const handleRestart = () => {
        setQuizState("intro");
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-20">
                {/* Intro Section */}
                {quizState === "intro" && (
                    <div className="section-padding">
                        <div className="container-padding mx-auto max-w-4xl">
                            {/* Hero */}
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    Faith Finder Quiz
                                </div>
                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                    Discover Your Spiritual Path
                                </h1>
                                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                                    Your spiritual path isn't random—it emerges from your nature, tendencies, and how you naturally approach the sacred.
                                    Take this 2-minute quiz to discover which direction calls to you.
                                </p>
                                <Button onClick={handleStartQuiz} size="lg" className="gap-2">
                                    Start the Quiz
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* What to expect */}
                            <Card className="bg-muted/30 border-dashed mb-12">
                                <CardContent className="p-8">
                                    <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-6">
                                        What to Expect
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                                <span className="text-xl font-bold text-primary">1</span>
                                            </div>
                                            <h3 className="font-semibold text-foreground mb-2">15 Questions</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Thoughtful questions about your preferences, tendencies, and what resonates with you.
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                                <span className="text-xl font-bold text-primary">2</span>
                                            </div>
                                            <h3 className="font-semibold text-foreground mb-2">Instant Results</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Discover your primary spiritual path and get personalized recommendations.
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                                                <span className="text-xl font-bold text-primary">3</span>
                                            </div>
                                            <h3 className="font-semibold text-foreground mb-2">Detailed Report</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Get a complete PDF with traditions, practices, and a 30-day journey plan.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* The Four Paths */}
                            <div className="mb-12">
                                <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
                                    The Four Spiritual Paths
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="border-2 bg-indigo-500/5 border-indigo-500/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                                    <Compass className="w-6 h-6 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                                                        Inquiry-led Path
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        For those who question deeply. Drawn to understanding reality, consciousness, and self through investigation and contemplation.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-2 bg-rose-500/5 border-rose-500/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                                                    <Sparkles className="w-6 h-6 text-rose-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                                                        Devotion-led Path
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        For those whose hearts overflow. Natural love for the Divine, finding meaning in worship, surrender, and sacred relationship.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-2 bg-amber-500/5 border-amber-500/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                                    <Sparkles className="w-6 h-6 text-amber-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                                                        Ritual-led Path
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        For those who honor tradition. Finding power in sacred action, ceremony, and the precise performance of spiritual rites.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="border-2 bg-emerald-500/5 border-emerald-500/20">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                    <RefreshCw className="w-6 h-6 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                                                        Discipline-led Path
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        For those who cultivate methodically. Drawn to systematic practice, training the mind and body through structured approaches.
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quiz Section */}
                {quizState === "quiz" && (
                    <div className="section-padding">
                        <div className="container-padding mx-auto">
                            <div className="max-w-3xl mx-auto">
                                <QuizContainer onComplete={handleQuizComplete} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {quizState === "results" && result && (
                    <div className="section-padding">
                        <div className="container-padding mx-auto">
                            <ResultsPage result={result} onRestart={handleRestart} />
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default FaithFinder;
