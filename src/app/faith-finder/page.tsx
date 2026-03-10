"use client";

import type { Metadata } from "next";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { QuizContainer } from "@/components/faith-finder/QuizContainer";
import { ResultsPage } from "@/components/faith-finder/ResultsPage";
import type { QuizResult } from "@/data/faithFinderQuiz";

type QuizState = "intro" | "quiz" | "results";

export default function FaithFinderPage() {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleStartQuiz = () => setQuizState("quiz");
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
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Faith Finder Quiz
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                  Stop Guessing.<br />Start Practicing.
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                  Discover your **Dharmic Archetype** and the specific 5,000-year-old lineage that matches your modern temperament.
                </p>
                <Button onClick={handleStartQuiz} size="lg" className="h-14 px-10 rounded-full text-lg bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-900/20 gap-2 transition-all hover:scale-105">
                  Begin Your Discovery
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

              {/* What to expect */}
              <Card className="bg-muted/30 border-dashed mb-12">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-6">
                    What to Expect
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        n: 1,
                        title: "15 Questions",
                        desc: "Thoughtful questions about your preferences, tendencies, and what resonates with you.",
                      },
                      {
                        n: 2,
                        title: "Instant Results",
                        desc: "Discover your primary spiritual path and get personalized recommendations.",
                      },
                      {
                        n: 3,
                        title: "Detailed Report",
                        desc: "Get a detailed report with traditions, practices, and a spiritual journey plan.",
                      },
                    ].map(({ n, title, desc }) => (
                      <div className="text-center" key={n}>
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <span className="text-xl font-bold text-primary">
                            {n}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* The Four Paths */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
                  The Four Spiritual Paths
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      color: "amber",
                      icon: Compass,
                      title: "The Way of Inquiry",
                      desc: "For the Analysts of Reality. You don't want to just believe; you want to know. Driven by the fire of discrimination and deep philosophical investigation.",
                    },
                    {
                      color: "rose",
                      icon: Sparkles,
                      title: "The Way of Devotion",
                      desc: "For the Relational Seekers. You find the Divine in the pull of the heart, the sweetness of grace, and the power of sacred relationship.",
                    },
                    {
                      color: "orange",
                      icon: Sparkles,
                      title: "The Way of Action",
                      desc: "For the Alchemists of Action. You find peace in the preservation of sacred rhythms, duty, and the science of purposeful behavior.",
                    },
                    {
                      color: "indigo",
                      icon: RefreshCw,
                      title: "The Way of Practice",
                      desc: "For the Architects of Mind. You seek direct, silent experience through mastery over the inner mechanics of mind and energy.",
                    },
                  ].map(({ color, icon: Icon, title, desc }) => (
                    <Card
                      key={title}
                      className={`border-2 bg-${color}-500/5 border-${color}-500/20`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-${color}-500/10 flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className={`w-6 h-6 text-${color}-600`} />
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                              {title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {desc}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        {quizState === "quiz" && (
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <QuizContainer onComplete={handleQuizComplete} />
            </div>
          </div>
        )}

        {/* Results Section */}
        {quizState === "results" && result && (
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <ResultsPage result={result} onRestart={handleRestart} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
