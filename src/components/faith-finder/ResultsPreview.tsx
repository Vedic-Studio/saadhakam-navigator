import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Search, Heart, Flame, Dumbbell } from "lucide-react";
import { QuizResult, getResultDescription } from "@/data/faithFinderQuiz";

interface ResultsPreviewProps {
    result: QuizResult;
    onContinue: () => void;
}

const pathIcons = {
    inquiry: Search,
    devotion: Heart,
    ritual: Flame,
    discipline: Dumbbell,
};

const pathColors = {
    inquiry: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600",
    devotion: "bg-rose-500/10 border-rose-500/20 text-rose-600",
    ritual: "bg-amber-500/10 border-amber-500/20 text-amber-600",
    discipline: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600",
};

const pathTitles = {
    inquiry: "Inquiry-led Path",
    devotion: "Devotion-led Path",
    ritual: "Ritual-led Path",
    discipline: "Discipline-led Path",
};

export const ResultsPreview = ({ result, onContinue }: ResultsPreviewProps) => {
    const IconComponent = pathIcons[result.primaryPath];

    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${pathColors[result.primaryPath]} mb-4`}>
                    <IconComponent className={`w-10 h-10 ${pathColors[result.primaryPath].split(' ').pop()}`} />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                    Your Path: {pathTitles[result.primaryPath]}
                </h2>
                {result.secondaryPath && (
                    <Badge variant="secondary" className="mb-4">
                        Also influenced by: {pathTitles[result.secondaryPath]}
                    </Badge>
                )}
            </div>

            <Card className="bg-muted/30">
                <CardContent className="p-6">
                    <p className="text-muted-foreground text-center leading-relaxed">
                        {getResultDescription(result.primaryPath)}
                    </p>
                </CardContent>
            </Card>

            <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                    Get your complete personalized report with:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 mb-6 max-w-md mx-auto">
                    <li>✓ Detailed explanation of your path</li>
                    <li>✓ Recommended traditions and practices</li>
                    <li>✓ Personalized next steps</li>
                    <li>✓ Resources to begin your journey</li>
                </ul>
                <Button onClick={onContinue} className="gap-2">
                    View Full Results
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
