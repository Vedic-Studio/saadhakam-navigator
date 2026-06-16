import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker } from "@/components/ContentAnalytics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Route } from "lucide-react";
import { learningPaths } from "@/components/path/paths";
import {
  buildBreadcrumbSchema,
  buildCollectionSchema,
  buildUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Learning Paths | Read the Tradition in Order | Sadhaka",
  description:
    "Guided reading paths through Sanatan philosophy. Start with the Six Darshanas Foundations: the six classical schools in the order they build on each other, each step linked to in-depth pages.",
  alternates: { canonical: "https://www.opensadhaka.com/path" },
  openGraph: {
    title: "Learning Paths | Sadhaka",
    description:
      "Guided reading paths through Sanatan philosophy. Begin with the Six Darshanas, read in pedagogical order.",
    url: "https://www.opensadhaka.com/path",
  },
};

export default function PathsIndexPage() {
  const pageUrl = buildUrl("/path");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Learning Paths", href: "/path" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const collectionSchema = buildCollectionSchema({
    name: "Learning Paths",
    description:
      "Guided, ordered reading paths through Sanatan philosophy and texts.",
    url: pageUrl,
    items: learningPaths.map((path) => ({
      name: path.title,
      url: buildUrl(`/path/${path.id}`),
      description: path.summary,
    })),
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="learning-paths" pillar="learning-paths" />
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
        <div className="container-padding max-w-5xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mb-14 mt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
              <Route className="h-3.5 w-3.5" />
              Learning Paths
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-[0.95]">
              Read the tradition in order
            </h1>
            <p
              data-speakable
              className="text-lg text-muted-foreground leading-relaxed max-w-3xl"
            >
              Most pages on this site can be read in any order. A learning path
              fixes the order for you. Each path is a short, numbered sequence
              that links to existing pages, with a progress bar that remembers
              where you stopped. Start at step one and the next step is always
              waiting.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {learningPaths.map((path) => (
              <Card
                key={path.id}
                className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
              >
                <CardContent className="p-7">
                  <div className="text-xs text-primary uppercase tracking-wider font-medium mb-3">
                    {path.steps.length} steps &middot; {path.estimate}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                    {path.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{path.summary}</p>
                  <p className="text-sm text-muted-foreground/80">
                    {path.audience}
                  </p>
                </CardContent>
                <CardFooter className="px-7 pb-7 pt-0">
                  <Link href={`/path/${path.id}`} className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full justify-between hover:text-primary"
                    >
                      Start this path
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
