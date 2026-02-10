import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { quizQuestions } from "@/data/faithFinderQuiz";

interface QuestionRendererProps {
    question: number;
    selectedOption?: string;
    onAnswer: (optionId: string) => void;
}

export const QuestionRenderer = ({ question, selectedOption, onAnswer }: QuestionRendererProps) => {
    const questionData = quizQuestions.find(q => q.id === question);

    if (!questionData) {
        return <div>Question not found</div>;
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
                {questionData.question}
            </h2>

            <RadioGroup value={selectedOption} onValueChange={onAnswer}>
                <div className="space-y-3">
                    {questionData.options.map((option) => (
                        <div
                            key={option.id}
                            className={`relative flex items-start space-x-3 rounded-lg border-2 p-4 transition-all cursor-pointer ${selectedOption === option.id
                                    ? "border-primary bg-primary/5"
                                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                                }`}
                            onClick={() => onAnswer(option.id)}
                        >
                            <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                            <Label
                                htmlFor={option.id}
                                className="flex-1 cursor-pointer text-base leading-relaxed"
                            >
                                {option.text}
                            </Label>
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
};
