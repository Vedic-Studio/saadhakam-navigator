"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, ArrowRight, FileText } from "lucide-react";
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
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Faith Finder Quiz
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">
                Which of the<br />Four Yogas Fits You?
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
                The Bhagavad Gita describes four fundamental approaches to
                spiritual practice &mdash; Jnana (inquiry), Bhakti (devotion),
                Karma (action), and Raja (discipline).
              </p>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
                This quiz asks seven questions about how you respond to
                uncertainty, emotion, and meaning, then maps your answers to the
                path that fits your temperament.
              </p>
              <Button onClick={handleStartQuiz} size="lg" className="h-14 px-10 rounded-full text-lg bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-900/20 gap-2 transition-all hover:scale-105">
                Start the Quiz
                <ArrowRight className="w-5 h-5" />
              </Button>

              {/* Compact what-to-expect */}
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-500" />
                  7 questions
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  2 minutes
                </span>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-orange-500" />
                  Personalized report
                </span>
              </div>

              <p className="text-xs text-muted-foreground/60 mt-4">
                Based on the guna-temperament framework from Gita 17.2 and the
                classical path division in chapters 3&ndash;4 and 12.
              </p>
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
