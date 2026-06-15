import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { QuizResult, calculateScore, determineResult, quizQuestions } from "@/data/faithFinderQuiz";
import { QuestionRenderer } from "./QuestionRenderer";

interface QuizContainerProps {
    onComplete: (result: QuizResult) => void;
    /**
     * Canonical `source_template` of the page that sent the reader here, read
     * from the `?src=` query param on /faith-finder. Forwarded to quizStart so
     * faith_finder_quiz_start carries source_template attribution.
     */
    sourceTemplate?: string;
}

export const QuizContainer = ({ onComplete, sourceTemplate }: QuizContainerProps) => {
    type Step = "question" | "calculating";

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [step, setStep] = useState<Step>("question");

    const totalQuestions = quizQuestions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const scores = useMemo(() => calculateScore(answers), [answers]);
    const result = useMemo(() => determineResult(scores), [scores]);

    useEffect(() => {
        const quizStart = typeof window !== "undefined" ? window.sadhaka?.quizStart : undefined;
        if (typeof quizStart === "function") {
            quizStart({
                pageArchetype: "conversion-bridge",
                pageTemplate: "/faith-finder",
                bridgeType: "faith-finder-quiz",
            }, sourceTemplate as Parameters<NonNullable<typeof quizStart>>[1]);
        }

    }, [sourceTemplate]);

    const handleAnswer = (optionId: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion + 1]: optionId
        }));
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            if (typeof window !== "undefined" && typeof window.sadhaka?.quizComplete === "function") {
                window.sadhaka.quizComplete(result.primaryPath, scores, {
                    primaryPath: result.primaryPath,
                    pageArchetype: "conversion-bridge",
                    pageTemplate: "/faith-finder",
                    bridgeType: "faith-finder-quiz",
                });
            }
            setStep("calculating");
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const currentAnswer = answers[currentQuestion + 1];

    useEffect(() => {
        if (step !== "calculating") return;

        const t = setTimeout(() => {
            onComplete(result);
        }, 1400);

        return () => clearTimeout(t);
    }, [step, onComplete, result]);

    if (step === "calculating") {
        return (
            <div className="w-full max-w-3xl mx-auto">
                <Card className="border-2">
                    <CardContent className="p-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-600/10 mb-6">
                            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                            Interpreting your responses
                        </h2>
                        <p className="text-muted-foreground">
                            Calculating your relative score across the four yoga-based categories.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                        Question {currentQuestion + 1} of {totalQuestions}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                        {Math.round(progress)}%
                    </span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card className="border-2">
                <CardContent className="p-8">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -24 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            <QuestionRenderer
                                question={currentQuestion + 1}
                                selectedOption={currentAnswer}
                                onAnswer={handleAnswer}
                            />
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
            </Card>

            <div className="flex justify-between mt-6">
                <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className="gap-2"
                >
                    {currentQuestion === totalQuestions - 1 ? (
                        <>
                            <Check className="w-4 h-4" />
                            See Results
                        </>
                    ) : (
                        <>
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};
