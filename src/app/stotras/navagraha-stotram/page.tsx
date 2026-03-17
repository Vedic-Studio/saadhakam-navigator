import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { loadStotra } from "@/lib/stotras";

export const metadata: Metadata = {
    title: "Navagraha Stotram: 9 Verses with Meaning",
    description: "The Navagraha Stotram presented as a contemplative nine-verse hymn honoring the grahas with translation and commentary.",
    alternates: {
        canonical: "https://www.opensadhaka.com/stotras/navagraha-stotram",
    },
};

export default function NavagrahaStotramPage() {
    const stotra = loadStotra("navagraha-stotram");

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Stotras", href: "/stotras/navagraha-stotram" },
                            { label: "Navagraha Stotram", href: "/stotras/navagraha-stotram" },
                        ]}
                    />
                    <header className="mb-12 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.9]">Navagraha Stotram</h1>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            This version of the Navagraha Stotram is presented as reflective devotional practice—an invitation to contemplate the grahas as sacred archetypes of rhythm, attention, karma, and inner discipline.
                        </p>
                    </header>

                    <div className="space-y-3">
                        {stotra.verses.map((verse) => (
                            <Link key={verse.slug} href={`/stotras/navagraha-stotram/${verse.slug}`} className="block rounded-2xl border border-border/40 bg-card/30 p-6 hover:border-orange-500/40 transition-all group">
                                <div className="flex items-start gap-5">
                                    <span className="text-orange-500/60 font-mono text-sm mt-1 min-w-[2.5rem]">{verse.verse.toString().padStart(2, "0")}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-serif text-lg text-foreground leading-relaxed mb-2 line-clamp-2">{verse.sanskritDevanagari.split("\n")[0]}</p>
                                        <p className="text-sm text-muted-foreground italic line-clamp-1">{verse.transliteration.split("\n")[0]}</p>
                                    </div>
                                    <span className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0">Read →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}