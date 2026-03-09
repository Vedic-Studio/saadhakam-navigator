import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getConceptBySlug, getAllConcepts } from "@/data/concepts";
import { getSanskritWordBySlug } from "@/data/sanskritVocab";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import {
  ArrowRight,
  BookOpen,
  Lightbulb,
  Target,
  BookMarked,
  Share2,
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
  const canonicalPath = `/what-is-${concept.slug}`;
  const title = `What is ${conceptName}? Meaning, Definition & Vedic Context`;
  const description = `Learn what ${conceptName} means in Sanatan Dharma, including its definition, philosophical role, practical application, related concepts, and scriptural context.`;

  return {
    title,
    description,
    keywords: [
      conceptSlug,
      conceptName.toLowerCase(),
      `what is ${conceptName.toLowerCase()}`,
      `${conceptName.toLowerCase()} meaning`,
      `${conceptName.toLowerCase()} definition`,
      "definition",
      "sanatan dharma",
      "hindu philosophy",
      ...concept.tags,
    ],
    alternates: {
      canonical: `https://opensadhaka.com${canonicalPath}`,
    },
    robots: pageType === "meaning" ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: `https://opensadhaka.com${canonicalPath}`,
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
  const sanskritOnly = concept.sanskritWord.split(" ")[0];
  const conceptName = getConceptDisplayName(concept.sanskritWord, concept.slug);
  const sanskritEntry = getSanskritWordBySlug(concept.slug);
  const relatedConceptEntries = concept.relatedConcepts
    .map((relatedSlug) => getConceptBySlug(relatedSlug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getConceptBySlug>>[];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://opensadhaka.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Concepts",
        item: "https://opensadhaka.com/learn",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: isWhatIs ? `What is ${sanskritOnly}` : `${sanskritOnly} Meaning`,
        item: `https://opensadhaka.com/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the short definition of ${sanskritOnly}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: concept.shortDefinition,
        },
      },
      {
        "@type": "Question",
        name: `What is the English translation of ${sanskritOnly}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: concept.englishTranslation,
        },
      },
      {
        "@type": "Question",
        name: `How does ${sanskritOnly} apply practically?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: concept.practicalApplication,
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `What is ${conceptName}?`,
    description: concept.shortDefinition,
    url: `https://opensadhaka.com/what-is-${concept.slug}`,
    mainEntityOfPage: `https://opensadhaka.com/what-is-${concept.slug}`,
    author: { "@type": "Organization", name: "Sadhaka" },
    publisher: { "@type": "Organization", name: "Sadhaka" },
    about: [
      {
        "@type": "Thing",
        name: conceptName,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <ContentPageTracker slug={concept.slug} pillar="concepts" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 px-4 sm:px-6 lg:px-8 border-b">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4 text-sm text-primary font-medium uppercase tracking-wider">
              Sanskrit & Philosophy Explorer
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              {isWhatIs ? `What is ${conceptName}?` : `${conceptName} Meaning`}
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-medium mb-4">
              {concept.sanskritWord} — {concept.englishTranslation}
            </p>
            <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
              {concept.shortDefinition}
            </p>
            <p className="text-sm text-muted-foreground mx-auto max-w-2xl mt-4">
              This is the philosophical explainer for {conceptName}: use this page for
              meaning, Vedic context, and practical understanding. For etymology,
              transliteration, and textual usage, use the Sanskrit lexicon entry.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Deep Dive Definition */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="flex items-center gap-3 text-3xl font-display text-foreground font-bold mb-6">
                <BookOpen className="text-primary w-8 h-8" />
                {isWhatIs ? "Understanding It Deeply" : "Origin and Context"}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {concept.longDescription}
              </p>
              <p className="leading-relaxed text-muted-foreground mt-4">
                {concept.roleInPhilosophy}
              </p>
            </div>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-6 h-6 text-secondary" />
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      Core Principles
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {concept.keyPrinciples.map((principle, index) => (
                      <li key={index} className="flex gap-4 items-start">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground leading-snug">
                          {principle}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="w-6 h-6 text-secondary" />
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      Practical Application
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {concept.practicalApplication}
                  </p>

                  <div className="mt-8">
                    <div className="flex items-center gap-3 mb-4">
                      <BookMarked className="w-5 h-5 text-secondary" />
                      <h4 className="font-sans font-semibold text-foreground">
                        Found In Texts
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {concept.sourceTexts.map((text) => (
                        <span
                          key={text}
                          className="px-3 py-1.5 bg-muted rounded-md text-sm text-foreground font-medium"
                        >
                          {text}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Internal Linking & Next Steps */}
            <div className="pt-8 border-t border-border/50">
              <h3 className="text-2xl font-bold font-display text-foreground mb-6">
                Keep Exploring
              </h3>
              <div className="flex flex-wrap gap-4 mb-8">
                {relatedConceptEntries.map((relatedConcept) => (
                  <TrackedLink
                    key={relatedConcept.slug}
                    href={`/what-is-${relatedConcept.slug}`}
                    eventLabel={`concept_related_link:${concept.slug}:${relatedConcept.slug}`}
                    trackPathName={relatedConcept.slug}
                    className="inline-flex items-center gap-2 group"
                  >
                    <span className="px-5 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-foreground font-medium shadow-sm flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      What is {humanizeSlug(relatedConcept.slug)}?
                    </span>
                  </TrackedLink>
                ))}
              </div>

              {sanskritEntry && (
                <Card className="mb-8 bg-secondary/5 border-secondary/20">
                  <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-1">
                        Need the linguistic and etymology angle?
                      </h4>
                      <p className="text-muted-foreground">
                        Read the Sanskrit lexicon entry for {conceptName} to explore transliteration, root meaning, and scriptural usage.
                      </p>
                    </div>
                    <TrackedLink
                      href={`/learn/sanskrit/${concept.slug}`}
                      eventLabel={`concept_to_lexicon:${concept.slug}`}
                      trackPathName={concept.slug}
                      className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary/10 transition-colors"
                    >
                      Open Sanskrit entry
                      <ArrowRight className="w-4 h-4" />
                    </TrackedLink>
                  </CardContent>
                </Card>
              )}

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-bold font-display text-foreground mb-2">
                      Discover Your Spiritual Path
                    </h4>
                    <p className="text-muted-foreground">
                      Take our 2-minute Faith Finder assessment to find which
                      philosophies and practices align with you.
                    </p>
                  </div>
                  <TrackedLink
                    href="/faith-finder"
                    eventLabel={`concept_cta:${concept.slug}:faith-finder`}
                    trackPathName={concept.slug}
                    className="shrink-0"
                  >
                    <Button
                      size="lg"
                      className="shadow-lg hover:shadow-xl transition-all"
                    >
                      Take Assessment <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </TrackedLink>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
