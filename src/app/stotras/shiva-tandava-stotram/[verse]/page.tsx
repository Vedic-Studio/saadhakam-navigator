import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  shivaTandavaVerses,
  getShivaTandavaVerseBySlug,
  getAdjacentShivaTandavaVerses,
} from "@/data/shivaTandavaStotram";

export function generateStaticParams() {
  return shivaTandavaVerses.map((v) => ({ verse: v.slug }));
}

export function generateMetadata({ params }: { params: { verse: string } }): Metadata {
  const verse = getShivaTandavaVerseBySlug(params.verse);
  if (!verse) return { title: "Verse Not Found" };
  return {
    title: `Shiva Tandava Stotram Verse ${verse.verse} | Sanskrit, Transliteration, Meaning`,
    description: verse.translation,
    alternates: {
      canonical: `https://opensadhaka.com/stotras/shiva-tandava-stotram/${verse.slug}`,
    },
  };
}

export default function ShivaTandavaVersePage({ params }: { params: { verse: string } }) {
  const verse = getShivaTandavaVerseBySlug(params.verse);
  if (!verse) notFound();

  const adjacent = getAdjacentShivaTandavaVerses(verse.verse);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Stotras", href: "/stotras/shiva-tandava-stotram" },
              { label: `Verse ${verse.verse}`, href: `/stotras/shiva-tandava-stotram/${verse.slug}` },
            ]}
          />

          <h1 className="font-display text-4xl md:text-6xl font-black mb-10 mt-8 tracking-tighter">
            Shiva Tandava Stotram — Verse {verse.verse}
          </h1>

          <section className="space-y-8">
            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
              <h2 className="font-semibold mb-3">Sanskrit</h2>
              <p className="whitespace-pre-wrap font-serif text-lg">{verse.sanskritDevanagari}</p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
              <h2 className="font-semibold mb-3">Transliteration</h2>
              <p className="whitespace-pre-wrap italic">{verse.transliteration}</p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
              <h2 className="font-semibold mb-3">Word Meanings</h2>
              <p>{verse.wordMeanings}</p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
              <h2 className="font-semibold mb-3">Translation</h2>
              <p>{verse.translation}</p>
            </div>

            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
              <h2 className="font-semibold mb-3">Commentary</h2>
              <p>{verse.commentary}</p>
            </div>
          </section>

          <div className="mt-12 flex justify-between gap-4">
            {adjacent.prev ? (
              <Link href={`/stotras/shiva-tandava-stotram/${adjacent.prev.slug}`} className="text-sm hover:underline">
                ← Verse {adjacent.prev.verse}
              </Link>
            ) : <span />}
            {adjacent.next ? (
              <Link href={`/stotras/shiva-tandava-stotram/${adjacent.next.slug}`} className="text-sm hover:underline">
                Verse {adjacent.next.verse} →
              </Link>
            ) : <span />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
