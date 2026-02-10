import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { QuizQuestion, QuizResult, calculateScore, determineResult } from "@/data/faithFinderQuiz";
import { QuestionRenderer } from "./QuestionRenderer";
import { ResultsPreview } from "./ResultsPreview";

interface QuizContainerProps {
    onComplete: (result: QuizResult) => void;
}

export const QuizContainer = ({ onComplete }: QuizContainerProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [showPreview, setShowPreview] = useState(false);

    const totalQuestions = 15;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    const handleAnswer = (optionId: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion + 1]: optionId
        }));
    };

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            // Quiz complete
            const scores = calculateScore(answers);
            const result = determineResult(scores);
            setShowPreview(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleComplete = () => {
        const scores = calculateScore(answers);
        const result = determineResult(scores);
        onComplete(result);
    };

    const currentAnswer = answers[currentQuestion + 1];

    if (showPreview) {
        const scores = calculateScore(answers);
        const result = determineResult(scores);
        return <ResultsPreview result={result} onContinue={handleComplete} />;
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            {/* Progress bar */}
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

            {/* Question card */}
            <Card className="border-2">
                <CardContent className="p-8">
                    <QuestionRenderer
                        question={currentQuestion + 1}
                        selectedOption={currentAnswer}
                        onAnswer={handleAnswer}
                    />
                </CardContent>
            </Card>

            {/* Navigation */}
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
