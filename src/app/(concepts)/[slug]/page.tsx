import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getConceptBySlug, getAllConcepts } from "@/data/concepts";
import { getSanskritWordBySlug } from "@/data/sanskritVocab";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  BookMarked,
  Share2,
  Telescope,
  Compass,
} from "lucide-react";

function resolveConceptRoute(slug: string) {
  if (slug.startsWith("what-is-")) {
    return {
      conceptSlug: slug.replace("what-is-", ""),
      pageType: "what-is" as const,
    };
  }

  if (slug.endsWith("-meaning")) {
    return {
      conceptSlug: slug.replace("-meaning", ""),
      pageType: "meaning" as const,
    };
  }

  return {
    conceptSlug: "",
    pageType: null,
  };
}

function getConceptDisplayName(sanskritWord: string, fallbackSlug: string) {
  const transliterationMatch = sanskritWord.match(/\(([^)]+)\)/);
  if (transliterationMatch?.[1]) {
    return transliterationMatch[1];
  }

  return fallbackSlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const concepts = getAllConcepts();
  return concepts.map((concept) => ({ slug: `what-is-${concept.slug}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { conceptSlug, pageType } = resolveConceptRoute(slug);
  if (!pageType || !conceptSlug) return {};

  const concept = getConceptBySlug(conceptSlug);
  if (!concept) return {};

  const conceptName = getConceptDisplayName(concept.sanskritWord, concept.slug);
  const title = `What is ${conceptName}? Meaning & Vedic Context | Sadhaka`;
  const description = concept.shortDefinition;

  return {
    title,
    description,
    alternates: {
      canonical: `https://opensadhaka.com/what-is-${concept.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://opensadhaka.com/what-is-${concept.slug}`,
    },
  };
}

export default async function PseoConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { conceptSlug, pageType } = resolveConceptRoute(slug);

  if (!pageType || !conceptSlug) notFound();

  const concept = getConceptBySlug(conceptSlug);
  if (!concept) notFound();

  if (pageType === "meaning") {
    permanentRedirect(`/what-is-${concept.slug}`);
  }

  const isWhatIs = pageType === "what-is";
  const conceptName = getConceptDisplayName(concept.sanskritWord, concept.slug);
  const sanskritEntry = getSanskritWordBySlug(concept.slug);
  const relatedConceptEntries = concept.relatedConcepts
    .map((relatedSlug) => getConceptBySlug(relatedSlug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getConceptBySlug>>[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the spiritual definition of ${conceptName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: concept.shortDefinition,
        },
      },
      {
        "@type": "Question",
        name: `How is ${conceptName} applied in spiritual practice?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: concept.practicalApplication,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug={concept.slug} pillar="concepts" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Concepts", href: "/learn" },
              { label: conceptName, href: `/what-is-${concept.slug}` },
            ]}
          />

          <header className="mb-16 mt-8">
            <div className="text-primary font-black uppercase tracking-widest text-xs mb-4">Concept Explorer</div>
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              {isWhatIs ? `What is ` : ""}<span className="text-primary italic">{conceptName}</span>?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-4 leading-relaxed max-w-3xl border-l-4 border-primary/30 pl-8 py-2">
              {concept.sanskritWord} — {concept.englishTranslation}
            </p>
            <div className="text-lg text-muted-foreground max-w-2xl mt-8">
              {concept.shortDefinition}
            </div>
          </header>

          <section className="mb-20">
            <div className="bg-muted/30 border border-border/40 rounded-3xl p-10 md:p-16">
              <h2 className="flex items-center gap-4 text-3xl font-display font-bold mb-10">
                <BookOpen className="text-primary w-10 h-10" />
                Deep Understanding
              </h2>
              <LongformContent>
                <p className="mb-6">{concept.longDescription}</p>
                <p className="italic border-l-2 border-primary/20 pl-6 py-2">{concept.roleInPhilosophy}</p>
              </LongformContent>
            </div>
          </section>

          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="rounded-3xl border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <Lightbulb className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-display font-bold">Core Principles</h3>
                </div>
                <ul className="space-y-6">
                  {concept.keyPrinciples.map((p, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">{i + 1}</span>
                      <span className="text-muted-foreground font-medium leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <Target className="w-8 h-8 text-secondary" />
                  <h3 className="text-2xl font-display font-bold">In Practice</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-10 font-medium">
                  {concept.practicalApplication}
                </p>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Foundational Texts</div>
                  <div className="flex flex-wrap gap-2">
                    {concept.sourceTexts.map(t => (
                      <Badge key={t} variant="outline" className="px-4 py-2 rounded-xl text-foreground/80 border-border/40">{t}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="mb-20 pt-20 border-t border-border/40">
            <h2 className="text-3xl font-display font-bold mb-10">Keep Exploring</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedConceptEntries.map((related) => (
                <TrackedLink key={related.slug} href={`/what-is-${related.slug}`} eventLabel={`concept_related:${concept.slug}`} trackPathName={related.slug}>
                  <div className="p-6 rounded-2xl border border-border/40 bg-card hover:border-primary/40 transition-all flex items-center justify-between group h-full">
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">What is {humanizeSlug(related.slug)}?</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </TrackedLink>
              ))}
            </div>
          </section>

          {sanskritEntry && (
            <div className="rounded-3xl bg-neutral-900 p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group mb-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-display font-black mb-6">Need the linguistic angle?</h3>
                  <p className="text-xl text-neutral-400 max-w-xl font-medium leading-relaxed">
                    Explore the Sanskrit root etymology, transliteration, and precise scriptural usage for <span className="text-primary">{conceptName}</span> in our lexicon.
                  </p>
                </div>
                <TrackedLink href={`/learn/sanskrit/${concept.slug}`} eventLabel={`concept_to_lexicon:${concept.slug}`} trackPathName={concept.slug}>
                  <Button size="lg" className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-neutral-200 font-black shadow-xl">
                    Open Sanskrit Entry
                  </Button>
                </TrackedLink>
              </div>
            </div>
          )}

          <div className="rounded-3xl bg-primary p-12 text-center text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <Compass size={400} className="rotate-12 -translate-x-32" />
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black mb-6 relative z-10 italic">Your Path Awaits.</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
              Take our 2-minute assessment to find which philosophies and practices align with your temperament.
            </p>
            <TrackedLink href="/faith-finder" eventLabel="concept_footer:cta" trackPathName="faith-finder" className="relative z-10 inline-block px-12 py-6 bg-white text-primary font-black rounded-2xl shadow-xl hover:scale-105 transition-transform active:scale-95">
              Find My Path <ArrowRight className="inline-block ml-2 w-5 h-5" />
            </TrackedLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
