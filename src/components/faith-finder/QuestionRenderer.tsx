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
        <div className="space-y-8 animate-in fade-in slide-in-from-right-5 duration-500">
            <div className="space-y-2">
                <span className="text-sm font-medium text-orange-600/70 uppercase tracking-widest">Contemplation</span>
                <h2 className="text-3xl font-display font-bold text-foreground leading-tight">
                    {questionData.question}
                </h2>
            </div>

            <RadioGroup value={selectedOption} onValueChange={onAnswer}>
                <div className="grid gap-4">
                    {questionData.options.map((option) => (
                        <div
                            key={option.id}
                            className={`group relative flex items-center space-x-4 rounded-2xl border-2 p-6 transition-all cursor-pointer ${selectedOption === option.id
                                ? "border-orange-600 bg-orange-600/5 shadow-md shadow-orange-900/5"
                                : "border-border hover:border-foreground/20 hover:bg-muted/30"
                                }`}
                            onClick={() => onAnswer(option.id)}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === option.id ? "border-orange-600" : "border-border group-hover:border-foreground/30"}`}>
                                {selectedOption === option.id && <div className="w-3 h-3 rounded-full bg-orange-600" />}
                            </div>
                            <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                            <Label
                                htmlFor={option.id}
                                className="flex-1 cursor-pointer text-lg font-medium text-foreground/90 leading-snug"
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
