import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { sanskritVocab } from "@/data/sanskritVocab";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Languages } from "lucide-react";

export const metadata: Metadata = {
    title: "Sanskrit Lexicon for Seekers | Meanings, Etymology, and Usage | Sadhaka",
    description:
        "Explore core Sanskrit spiritual terms with etymology, pronunciation, scriptural usage, and practical context for modern seekers.",
    alternates: {
        canonical: "https://opensadhaka.com/learn/sanskrit",
    },
    openGraph: {
        title: "Sanskrit Lexicon for Seekers | Sadhaka",
        description:
            "A growing lexicon of Sanskrit words with meaning, pronunciation, and scriptural context.",
        url: "https://opensadhaka.com/learn/sanskrit",
    },
};

export default function SanskritIndexPage() {
    const words = [...sanskritVocab].sort((a, b) =>
        a.wordEnglish.localeCompare(b.wordEnglish)
    );

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="sanskrit-lexicon" pillar="sanskrit-lexicon" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-6xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Sanskrit Lexicon", href: "/learn/sanskrit" },
                        ]}
                    />

                    <header className="mt-8 mb-12 border-b border-border/40 pb-10">
                        <div className="text-secondary font-black uppercase tracking-widest text-xs mb-4">
                            Learning Sanskrit
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-6">
                            Sanskrit Lexicon
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                            Build conceptual clarity with precise Sanskrit terms from Vedanta, Yoga,
                            Tantra, and Bhakti traditions. Start with the words that shape your daily
                            study and practice.
                        </p>
                    </header>

                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {words.map((word) => (
                            <TrackedLink
                                key={word.slug}
                                href={`/learn/sanskrit/${word.slug}`}
                                eventLabel={`sanskrit_index:${word.slug}`}
                                trackPathName={word.slug}
                                className="group rounded-2xl border border-border/40 bg-card/50 p-6 hover:border-primary/40 transition-all"
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        <div className="font-sanskrit text-xl text-primary mb-1">
                                            {word.wordDevanagari}
                                        </div>
                                        <h2 className="font-display text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                                            {word.wordEnglish}
                                        </h2>
                                    </div>
                                    <Languages className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>

                                <Badge
                                    variant="secondary"
                                    className="mb-4 uppercase tracking-widest font-black text-[10px]"
                                >
                                    {word.transliteration}
                                </Badge>

                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                    {word.summary}
                                </p>

                                <div className="mt-4 text-sm font-semibold text-primary inline-flex items-center gap-2">
                                    Read entry <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </TrackedLink>
                        ))}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}