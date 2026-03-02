import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Brain, Heart, Sparkles, Zap, ArrowRight, Check } from "lucide-react";
import { QuizResult, pathMetadata } from "@/data/faithFinderQuiz";

interface ResultsPreviewProps {
    result: QuizResult;
    onContinue: () => void;
}

const pathIcons = {
    inquiry: Brain,
    devotion: Heart,
    ritual: Sparkles,
    discipline: Zap,
};

const pathColors = {
    inquiry: "bg-amber-500/10 border-amber-500/20 text-amber-600",
    devotion: "bg-rose-500/10 border-rose-500/20 text-rose-600",
    ritual: "bg-orange-500/10 border-orange-500/20 text-orange-600",
    discipline: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600",
};

export const ResultsPreview = ({ result, onContinue }: ResultsPreviewProps) => {
    const IconComponent = pathIcons[result.primaryPath];
    const metadata = pathMetadata[result.primaryPath];

    return (
        <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="text-center">
                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl ${pathColors[result.primaryPath]} border-2 border-current/20 mb-6 shadow-xl shadow-current/5`}>
                    <IconComponent className="w-12 h-12" />
                </div>
                <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-2">My Archetype</p>
                <h2 className="text-4xl font-bold text-foreground mb-2">
                    {metadata.name}
                </h2>
                <Badge variant="outline" className="text-md py-1 px-4 rounded-full border-current/30">
                    {metadata.archetype}
                </Badge>
            </div>

            <Card className="bg-muted/30 border-dashed border-2">
                <CardContent className="p-8">
                    <p className="text-xl italic text-foreground text-center leading-relaxed">
                        "{metadata.slogan}"
                    </p>
                    <Separator className="my-6" />
                    <p className="text-muted-foreground text-center leading-relaxed">
                        {metadata.longDescription.split('.')[0]}. {metadata.longDescription.split('.')[1]}.
                    </p>
                </CardContent>
            </Card>

            <div className="text-center bg-secondary/5 p-8 rounded-3xl border border-secondary/20">
                <p className="text-lg font-semibold text-foreground mb-4">
                    Your 12-Page Dharmic Architecture Report is Ready
                </p>
                <div className="grid grid-cols-2 gap-4 text-left text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        Dominant & Secondary Paths
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        Specific Practice Blockers
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        Recommended Lineages
                    </div>
                    <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        30-Day Launch Plan
                    </div>
                </div>
                <Button onClick={onContinue} size="lg" className="w-full h-14 rounded-full text-lg bg-foreground text-background hover:bg-foreground/90 gap-2">
                    Claim My Full Results
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
};
