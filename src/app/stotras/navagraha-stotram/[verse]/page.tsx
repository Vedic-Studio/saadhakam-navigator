import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAdjacentVerses, getStotraVerseBySlug, loadStotra } from "@/lib/stotras";

export function generateStaticParams() {
    const stotra = loadStotra("navagraha-stotram");
    return stotra.verses.map((verse) => ({ verse: verse.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ verse: string }> }): Promise<Metadata> {
    const { verse: verseSlug } = await params;
    const stotra = loadStotra("navagraha-stotram");
    const verse = getStotraVerseBySlug(stotra, verseSlug);
    if (!verse) return {};
    return {
        title: `Navagraha Stotram Verse ${verse.verse}`,
        description: verse.translation,
        alternates: {
            canonical: `https://www.opensadhaka.com/stotras/navagraha-stotram/${verse.slug}`,
        },
    };
}

export default async function NavagrahaVersePage({ params }: { params: Promise<{ verse: string }> }) {
    const { verse: verseSlug } = await params;
    const stotra = loadStotra("navagraha-stotram");
    const verse = getStotraVerseBySlug(stotra, verseSlug);
    if (!verse) notFound();
    const adjacent = getAdjacentVerses(stotra, verse.verse);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Stotras", href: "/stotras/navagraha-stotram" },
                            { label: `Verse ${verse.verse}`, href: `/stotras/navagraha-stotram/${verse.slug}` },
                        ]}
                    />

                    <h1 className="font-display text-4xl md:text-6xl font-black mb-10 mt-8 tracking-tighter">Navagraha Stotram — Verse {verse.verse}</h1>
                    <section className="space-y-8">
                        <div className="rounded-2xl border border-border/40 bg-card/30 p-6"><h2 className="font-semibold mb-3">Sanskrit</h2><p className="whitespace-pre-wrap font-serif text-lg">{verse.sanskritDevanagari}</p></div>
                        <div className="rounded-2xl border border-border/40 bg-card/30 p-6"><h2 className="font-semibold mb-3">Transliteration</h2><p className="whitespace-pre-wrap italic">{verse.transliteration}</p></div>
                        <div className="rounded-2xl border border-border/40 bg-card/30 p-6"><h2 className="font-semibold mb-3">Word Meanings</h2><p>{verse.wordMeanings}</p></div>
                        <div className="rounded-2xl border border-border/40 bg-card/30 p-6"><h2 className="font-semibold mb-3">Translation</h2><p>{verse.translation}</p></div>
                        <div className="rounded-2xl border border-border/40 bg-card/30 p-6"><h2 className="font-semibold mb-3">Commentary</h2><p>{verse.commentary}</p></div>
                    </section>

                    <div className="mt-12 flex justify-between gap-4">
                        {adjacent.prev ? <Link href={`/stotras/navagraha-stotram/${adjacent.prev.slug}`} className="text-sm hover:underline">← Verse {adjacent.prev.verse}</Link> : <span />}
                        {adjacent.next ? <Link href={`/stotras/navagraha-stotram/${adjacent.next.slug}`} className="text-sm hover:underline">Verse {adjacent.next.verse} →</Link> : <span />}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}