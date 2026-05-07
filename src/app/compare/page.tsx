import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { comparisons } from "@/data/comparisons";
import { ArrowRight, MessageSquare, BookOpen, User, Zap, Globe, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "60+ Indian Philosophy Comparisons: Vedanta, Schools, Texts, Masters",
    description:
        "Side-by-side reference for Vedanta vs. Buddhism, Advaita vs. Dvaita, Shankara vs. Ramanuja, Bhagavad Gita vs. Ashtavakra Gita, and 60+ other philosophical pairings.",
    keywords: [
        "compare philosophies",
        "vedanta vs buddhism",
        "advaita vs dvaita",
        "shankara vs ramanuja",
        "spiritual paths comparison",
        "sacred texts comparison",
    ],
    alternates: {
        canonical: "https://www.opensadhaka.com/compare",
    },
    openGraph: {
        title: "Indian Philosophy Comparisons: 60+ Side-by-Side References",
        description:
            "From Vedanta vs. Buddhism to Atman vs. Brahman — the most-asked philosophical comparisons in Sanatan Dharma, each grounded in primary texts.",
        url: "https://www.opensadhaka.com/compare",
    },
};

const categoryIcons: Record<string, any> = {
    "Philosophy vs Philosophy": Globe,
    "Practice vs Practice": Zap,
    "Western vs Eastern": Globe,
    "Concept vs Concept": Sparkles,
    "Platform/Competitor": MessageSquare,
    "Path vs Path": BookOpen,
    "Teacher vs Teacher": User,
    "Text vs Text": BookOpen,
};

export default function CompareIndexPage() {
    // Group comparisons by category
    const categories = Array.from(new Set(comparisons.map((c) => c.category)));

    return (
        <div className="min-h-screen bg-background">
            <ContentPageTracker slug="compare" pillar="comparisons" />
            <Header />
            <main className="pt-20">
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">Structural Comparisons</Badge>
                            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                                Comparative Analysis
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                This hub is for side-by-side reading, not for flattening traditions into slogans. Each page compares two schools, practices, teachers, or texts by asking concrete questions: what each term means in its own tradition, where the categories overlap, where they diverge, and what historical or philosophical stakes are actually involved.
                            </p>
                            <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-4">
                                Use it when a pair looks superficially similar &mdash; Advaita and Buddhism, Samkhya and Yoga, mantra and prayer &mdash; or when two related traditions are often confused. The aim is clarity, attribution, and conceptual precision rather than ranking one side as the winner.
                            </p>
                        </div>

                        {categories.map((category) => {
                            const Icon = categoryIcons[category] || BookOpen;
                            const categoryComparisons = comparisons.filter((c) => c.category === category);

                            return (
                                <div key={category} className="mb-20">
                                    <div className="flex items-center gap-3 mb-8 border-b border-border pb-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                                            {category}
                                        </h2>
                                        <Badge variant="secondary" className="ml-2 bg-muted text-muted-foreground border-none">
                                            {categoryComparisons.length} Comparisons
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categoryComparisons.map((item) => (
                                            <Card
                                                key={item.slug}
                                                className="group bg-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col"
                                            >
                                                <CardContent className="p-6 flex-grow">
                                                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-0">
                                                        {item.tldr}
                                                    </p>
                                                </CardContent>
                                                <CardFooter className="px-6 pb-6 pt-0">
                                                    <TrackedLink
                                                        href={`/compare/${item.slug}`}
                                                        eventLabel={`compare_index:${item.slug}`}
                                                        trackPathName={item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                                                        className="w-full"
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full justify-between hover:bg-primary/5 group-hover:text-primary border border-transparent group-hover:border-primary/20"
                                                        >
                                                            Depth Analysis
                                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                        </Button>
                                                    </TrackedLink>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            "itemListElement": comparisons.map((c, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "url": `https://www.opensadhaka.com/compare/${c.slug}`,
                                "name": c.title
                            }))
                        })
                    }}
                />
            </main>
            <Footer />
        </div>
    );
}
