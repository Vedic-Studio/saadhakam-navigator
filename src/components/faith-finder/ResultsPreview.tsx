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

const pathGradients = {
    inquiry: "from-amber-500/10 to-orange-500/5",
    devotion: "from-rose-500/10 to-pink-500/5",
    ritual: "from-orange-500/10 to-amber-500/5",
    discipline: "from-indigo-500/10 to-purple-500/5",
};

const pathIconColors = {
    inquiry: "bg-amber-500/15 text-amber-600 border-amber-500/20",
    devotion: "bg-rose-500/15 text-rose-600 border-rose-500/20",
    ritual: "bg-orange-500/15 text-orange-600 border-orange-500/20",
    discipline: "bg-indigo-500/15 text-indigo-600 border-indigo-500/20",
};

const pathSpecificTeasers: Record<string, string[]> = {
    inquiry: [
        "Why your mind seeks proof over faith",
        "The Advaita lineage aligned to your temperament",
        "A self-inquiry practice sequence for your first 30 days",
        "Texts and teachers curated for the analytical seeker",
    ],
    devotion: [
        "Why your heart is your strongest spiritual instrument",
        "The Bhakti lineage that matches your devotional style",
        "A japa and kirtan practice plan for your first 30 days",
        "Saints and songs curated for the relational seeker",
    ],
    ritual: [
        "Why sacred structure grounds your spiritual life",
        "The Karma Yoga lineage aligned to your temperament",
        "A daily puja and ritual plan for your first 30 days",
        "Ceremonies and traditions curated for the alchemist of action",
    ],
    discipline: [
        "Why systematic practice is your natural entry point",
        "The Raja Yoga lineage aligned to your temperament",
        "A pranayama and meditation plan for your first 30 days",
        "Methods and masters curated for the architect of mind",
    ],
};

export const ResultsPreview = ({ result, onContinue }: ResultsPreviewProps) => {
    const IconComponent = pathIcons[result.primaryPath];
    const metadata = pathMetadata[result.primaryPath];
    const teasers = pathSpecificTeasers[result.primaryPath];
    const secondaryMeta = result.secondaryPath ? pathMetadata[result.secondaryPath] : null;

    return (
        <div className={`space-y-8 animate-in fade-in zoom-in duration-500 rounded-3xl bg-gradient-to-br ${pathGradients[result.primaryPath]} p-1`}>
            <div className="bg-background rounded-[calc(1.5rem-4px)] p-8 space-y-8">
                <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl ${pathIconColors[result.primaryPath]} border-2 mb-6 shadow-xl`}>
                        <IconComponent className="w-12 h-12" />
                    </div>
                    <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-2">Your Archetype</p>
                    <h2 className="text-4xl font-bold text-foreground mb-2">
                        {metadata.name}
                    </h2>
                    <Badge variant="outline" className="text-md py-1 px-4 rounded-full border-current/30">
                        {metadata.archetype}
                    </Badge>
                    {secondaryMeta && (
                        <p className="text-sm text-muted-foreground mt-3">
                            With strong echoes of <span className="font-medium text-foreground">{secondaryMeta.name}</span>
                        </p>
                    )}
                </div>

                <Card className="bg-muted/30 border-dashed border-2">
                    <CardContent className="p-8">
                        <p className="text-xl italic text-foreground text-center leading-relaxed">
                            &ldquo;{metadata.slogan}&rdquo;
                        </p>
                        <Separator className="my-6" />
                        <p className="text-muted-foreground text-center leading-relaxed">
                            {metadata.longDescription.split('.')[0]}. {metadata.longDescription.split('.')[1]}.
                        </p>
                    </CardContent>
                </Card>

                <div className="text-center bg-secondary/5 p-8 rounded-3xl border border-secondary/20">
                    <p className="text-lg font-semibold text-foreground mb-4">
                        Your Dharmic Architecture Report is Ready
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-sm text-muted-foreground mb-8">
                        {teasers.map((teaser) => (
                            <div key={teaser} className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {teaser}
                            </div>
                        ))}
                    </div>
                    <Button onClick={onContinue} size="lg" className="w-full h-14 rounded-full text-lg bg-foreground text-background hover:bg-foreground/90 gap-2">
                        Claim My Full Results
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};
