import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAllConcepts } from "@/data/concepts";
import {
  buildBreadcrumbSchema,
  buildCollectionSchema,
  buildUrl,
} from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Concepts of Sanatan Dharma Explained | Sadhaka",
  description:
    "An A-to-Z reference of core concepts in Sanatan Dharma, from karma, dharma, and moksha to maya, atman, and Brahman, each with a clear definition and scriptural context.",
  keywords: [
    "sanatan dharma concepts",
    "karma",
    "dharma",
    "moksha",
    "maya",
    "atman",
    "brahman",
    "vedanta concepts",
    "hindu philosophy terms",
  ],
  alternates: { canonical: "https://www.opensadhaka.com/concepts" },
  openGraph: {
    title: "Concepts of Sanatan Dharma Explained | Sadhaka",
    description:
      "An A-to-Z reference of core concepts in Sanatan Dharma, from karma, dharma, and moksha to maya, atman, and Brahman, each with a clear definition and scriptural context.",
    url: "https://www.opensadhaka.com/concepts",
  },
};

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

export default function ConceptsPage() {
  const concepts = getAllConcepts();
  const pageUrl = buildUrl("/concepts");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Concepts", href: "/concepts" },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const collectionSchema = buildCollectionSchema({
    name: "Concepts of Sanatan Dharma",
    description:
      "Core concepts in Sanatan Dharma, each with a clear definition and scriptural context.",
    url: pageUrl,
    items: concepts.map((concept) => ({
      name: getConceptDisplayName(concept.sanskritWord, concept.slug),
      url: buildUrl(`/what-is-${concept.slug}`),
      description: concept.shortDefinition,
    })),
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="concepts" pillar="concepts" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="text-center mb-16 mt-8 px-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
              Concept Explorer
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
              Concepts of Sanatan Dharma
            </h1>
            <p
              data-speakable
              className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light"
            >
              The vocabulary of Sanatan Dharma, defined plainly and placed in
              scriptural context. Start with foundational ideas such as karma,
              dharma, and moksha, then follow the threads into atman, Brahman,
              and the practices that bring each concept to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {concepts.map((concept) => {
              const conceptName = getConceptDisplayName(
                concept.sanskritWord,
                concept.slug
              );
              return (
                <Card
                  key={concept.slug}
                  className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="text-xs text-primary uppercase tracking-wider font-medium mb-2">
                      {concept.englishTranslation}
                    </div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                      {conceptName}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {concept.shortDefinition}
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <TrackedLink
                      href={`/what-is-${concept.slug}`}
                      eventLabel={`concepts_index:${concept.slug}`}
                      trackPathName={concept.slug}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:text-primary"
                      >
                        What is {conceptName}?{" "}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </TrackedLink>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
