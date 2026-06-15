import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildWebPageSchema, buildUrl } from "@/lib/seo";
import { composeMetaDescription } from "@/lib/seo/metaDescription";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SanskritTypewriter } from "@/components/visuals/SanskritTypewriter";
import {
  loadSahasranama,
  getSahasranamaVerseBySlug,
  getAdjacentSahasranamaVerses,
  findVerseByNameSlug,
} from "@/lib/stotras";

const SLUG = "vishnu-sahasranama";

export const revalidate = 86400;

export function generateStaticParams() {
  const sahasranama = loadSahasranama(SLUG);
  return sahasranama.verses.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sahasranama = loadSahasranama(SLUG);
  const verse = getSahasranamaVerseBySlug(sahasranama, slug);
  if (!verse) {
    // Check for old name slug redirect
    const parentVerse = findVerseByNameSlug(sahasranama, slug);
    if (parentVerse) {
      return {
        title: `Vishnu Sahasranama Shloka ${parentVerse.verse}`,
        alternates: {
          canonical: `https://www.opensadhaka.com/stotras/${SLUG}/${parentVerse.slug}`,
        },
      };
    }
    return { title: "Shloka Not Found" };
  }
  const firstN = verse.names[0]?.number;
  const lastN = verse.names[verse.names.length - 1]?.number;
  return {
    title: `Vishnu Sahasranama Shloka ${verse.verse} (Names ${firstN}–${lastN}) | Sanskrit & Meaning`,
    description: composeMetaDescription(
      [
        `Vishnu Sahasranama shloka ${verse.verse} — Sanskrit, transliteration, and meaning for names ${firstN}–${lastN}`,
        verse.names.slice(0, 3).map((n) => n.transliteration).join(", "),
      ],
      {
        fallback:
          "Read the full verse with Devanagari, IAST, and devotional commentary on Sadhaka.",
      },
    ),
    alternates: {
      canonical: `https://www.opensadhaka.com/stotras/${SLUG}/${verse.slug}`,
    },
  };
}

export default async function VishnuSahasranamaVersePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sahasranama = loadSahasranama(SLUG);
  const verse = getSahasranamaVerseBySlug(sahasranama, slug);

  if (!verse) {
    // Old name slug → redirect to parent verse
    const parentVerse = findVerseByNameSlug(sahasranama, slug);
    if (parentVerse) {
      permanentRedirect(`/stotras/${SLUG}/${parentVerse.slug}`);
    }
    notFound();
  }

  const adjacent = getAdjacentSahasranamaVerses(sahasranama, verse.verse);
  const firstN = verse.names[0]?.number;
  const lastN = verse.names[verse.names.length - 1]?.number;

  const pagePath = `/stotras/${SLUG}/${verse.slug}`;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Vishnu Sahasranama", href: `/stotras/${SLUG}` },
    { label: `Shloka ${verse.verse}`, href: pagePath },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const webPageSchema = buildWebPageSchema({
    name: `Vishnu Sahasranama — Shloka ${verse.verse}`,
    description: `Shloka ${verse.verse} of the Vishnu Sahasranama with Sanskrit, transliteration, and meaning for names ${firstN}–${lastN}.`,
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
              { label: "Vishnu Sahasranama", href: `/stotras/${SLUG}` },
              { label: `Shloka ${verse.verse}`, href: `/stotras/${SLUG}/${verse.slug}` },
            ]}
          />

          <ScrollReveal>
            <p className="text-sm text-blue-400/70 font-medium mt-8 mb-2">
              Shloka {verse.verse} of {sahasranama.verseCount} &middot; Names {firstN}–{lastN}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-10 tracking-tighter">
              Vishnu Sahasranama — Shloka {verse.verse}
            </h1>
          </ScrollReveal>

          <section className="space-y-8">
            {/* Sanskrit */}
            <ScrollReveal>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-3 text-blue-400/80">Sanskrit</h2>
                <p className="whitespace-pre-wrap font-serif text-xl md:text-2xl leading-loose">
                  <SanskritTypewriter text={verse.sanskritDevanagari} speed={40} />
                </p>
              </div>
            </ScrollReveal>

            {/* Transliteration */}
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-3 text-blue-400/80">Transliteration</h2>
                <p className="whitespace-pre-wrap italic text-lg">{verse.transliteration}</p>
              </div>
            </ScrollReveal>

            {/* Names in this Shloka */}
            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                <h2 className="font-semibold mb-4 text-blue-400/80">
                  Names in this Shloka ({verse.names.length})
                </h2>
                <div className="space-y-4">
                  {verse.names.map((name) => (
                    <div
                      key={name.number}
                      className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-blue-500/50 font-mono text-xs min-w-[2rem]">
                          #{name.number}
                        </span>
                        <span className="font-serif text-xl">{name.name}</span>
                        <span className="text-muted-foreground italic text-sm">
                          {name.transliteration}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/80 ml-[calc(2rem+0.75rem)]">
                        {name.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Prev / Next Navigation */}
          <div className="mt-12 flex justify-between gap-4">
            {adjacent.prev ? (
              <Link
                href={`/stotras/${SLUG}/${adjacent.prev.slug}`}
                className="text-sm hover:underline text-blue-400"
              >
                ← Shloka {adjacent.prev.verse}
              </Link>
            ) : (
              <span />
            )}
            {adjacent.next ? (
              <Link
                href={`/stotras/${SLUG}/${adjacent.next.slug}`}
                className="text-sm hover:underline text-blue-400"
              >
                Shloka {adjacent.next.verse} →
              </Link>
            ) : (
              <span />
            )}
          </div>

          <Link
            href={`/stotras/${SLUG}`}
            className="inline-block mt-8 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Vishnu Sahasranama
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
