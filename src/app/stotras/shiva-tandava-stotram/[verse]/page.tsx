import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildWebPageSchema, buildUrl } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SanskritTypewriter } from "@/components/visuals/SanskritTypewriter";
import { loadStotra, getStotraVerseBySlug, getAdjacentVerses } from "@/lib/stotras";

export const revalidate = 86400;

export function generateStaticParams() {
  const stotra = loadStotra("shiva-tandava-stotram");
  return stotra.verses.map((v) => ({ verse: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ verse: string }> }): Promise<Metadata> {
  const { verse: verseSlug } = await params;
  const stotra = loadStotra("shiva-tandava-stotram");
  const verse = getStotraVerseBySlug(stotra, verseSlug);
  if (!verse) return { title: "Verse Not Found" };
  const title = `Shiva Tandava Stotram Verse ${verse.verse} | Sanskrit, Transliteration, Meaning`;
  const description = verse.translation;
  const canonical = `https://www.opensadhaka.com/stotras/shiva-tandava-stotram/${verse.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function ShivaTandavaVersePage({ params }: { params: Promise<{ verse: string }> }) {
  const { verse: verseSlug } = await params;
  const stotra = loadStotra("shiva-tandava-stotram");
  const verse = getStotraVerseBySlug(stotra, verseSlug);
  if (!verse) notFound();

  const adjacent = getAdjacentVerses(stotra, verse.verse);

  const pagePath = `/stotras/shiva-tandava-stotram/${verse.slug}`;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shiva Tandava Stotram", href: "/stotras/shiva-tandava-stotram" },
    { label: `Verse ${verse.verse}`, href: pagePath },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: `Shiva Tandava Stotram — Verse ${verse.verse}`,
    description: verse.translation,
    url: buildUrl(pagePath),
    breadcrumbItems,
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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

          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-10 mt-8 tracking-tighter">
              Shiva Tandava Stotram — Verse {verse.verse}
            </h1>
          </ScrollReveal>

          <section className="space-y-8">
            <ScrollReveal>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-3">Sanskrit</h2>
                <p className="whitespace-pre-wrap font-serif text-lg">
                  <SanskritTypewriter text={verse.sanskritDevanagari} speed={40} />
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-3">Transliteration</h2>
                <p className="whitespace-pre-wrap italic">{verse.transliteration}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-3">Word Meanings</h2>
                <p>{verse.wordMeanings}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-3">Translation</h2>
                <p>{verse.translation}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-3">Commentary</h2>
                <p>{verse.commentary}</p>
              </div>
            </ScrollReveal>
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
