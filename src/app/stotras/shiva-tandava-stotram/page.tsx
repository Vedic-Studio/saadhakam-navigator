import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { shivaTandavaVerses } from "@/data/shivaTandavaStotram";

export const metadata: Metadata = {
    title: "Shiva Tandava Stotram: All 16 Verses with Sanskrit, Transliteration & Meaning",
    description:
        "The Shiva Tandava Stotram composed by Ravana — all 16 verses in Sanskrit Devanagari with IAST transliteration, English translation, and commentary. The great hymn to Shiva's cosmic dance.",
    alternates: {
        canonical: "https://opensadhaka.com/stotras/shiva-tandava-stotram",
    },
    openGraph: {
        title: "Shiva Tandava Stotram: Complete Text with Meaning",
        description:
            "16 verses composed by Ravana in praise of Shiva's cosmic Tandava dance. Sanskrit, transliteration, translation, and commentary on every verse.",
        url: "https://opensadhaka.com/stotras/shiva-tandava-stotram",
        type: "article",
    },
};

export default function ShivaTandavaStotramPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Stotras", href: "/stotras/shiva-tandava-stotram" },
                            { label: "Shiva Tandava Stotram", href: "/stotras/shiva-tandava-stotram" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Shiva Tandava <span className="text-orange-500 italic">Stotram</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>About this text:</strong> The Shiva Tandava Stotram was composed by Ravana, the great scholar-king of Lanka, in reverence to Lord Shiva. Despite being the antagonist of the Ramayana, Ravana was a supreme devotee of Shiva and an accomplished Vedic scholar. The 16 verses describe Shiva&apos;s cosmic Tandava dance with extraordinary poetic power — cascading Ganga, blazing third eye, crescent moon, and the ḍamaru drum whose beat is the rhythm of creation itself.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Even the most powerful among men composed this as a song of surrender.
                        </p>
                    </header>

                    <div className="space-y-3">
                        {shivaTandavaVerses.map((verse) => (
                            <Link
                                key={verse.verse}
                                href={`/stotras/shiva-tandava-stotram/${verse.slug}`}
                                className="block rounded-2xl border border-border/40 bg-card/30 p-6 hover:border-orange-500/40 hover:bg-card/50 transition-all group"
                            >
                                <div className="flex items-start gap-5">
                                    <span className="text-orange-500/60 font-mono text-sm mt-1 min-w-[2.5rem]">
                                        {verse.verse.toString().padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-serif text-lg text-foreground leading-relaxed mb-2 line-clamp-2">
                                            {verse.sanskritDevanagari.split("\n")[0]}
                                        </p>
                                        <p className="text-sm text-muted-foreground italic line-clamp-1">
                                            {verse.transliteration.split("\n")[0]}
                                        </p>
                                    </div>
                                    <span className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0">
                                        Read →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16 p-8 bg-muted/30 rounded-3xl border border-border/50">
                        <h2 className="text-2xl font-display font-bold mb-4">About the Composition</h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Ravana composed this stotram after he tried to uproot Mount Kailash — Shiva&apos;s abode — to carry it to Lanka. When Shiva pressed the mountain down with his toe, trapping Ravana beneath it, Ravana composed this hymn with his ten heads and twenty arms as an act of surrender. Pleased by the composition, Shiva released him and granted him great boons.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            The meter is Jagatī (12 syllables per quarter), one of the most demanding Sanskrit meters. Ravana&apos;s command of this meter while under a mountain demonstrates both his extraordinary learning and the power of genuine bhakti. The stotram is traditionally recited during Pradosha time and on Shivaratri.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
