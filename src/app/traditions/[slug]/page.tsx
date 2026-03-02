import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTraditionBySlug, traditions } from "@/data/traditions";
import { ArrowLeft, ArrowRight, BookOpen, Users, Play } from "lucide-react";

export async function generateStaticParams() {
  return traditions.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tradition = getTraditionBySlug(slug);
  if (!tradition) return {};

  return {
    title: `${tradition.title} — Practices, Philosophy & Path`,
    description: `${tradition.summary} Explore key practices, ideas, and how to begin ${tradition.title}.`,
    keywords: [
      tradition.title.toLowerCase(),
      ...tradition.tags,
      "sanatan dharma",
      "spiritual tradition",
    ],
    alternates: { canonical: `https://opensadhaka.com/traditions/${slug}` },
    openGraph: {
      title: `${tradition.title} | Sadhaka`,
      description: tradition.summary,
      url: `https://opensadhaka.com/traditions/${slug}`,
    },
  };
}

export default async function TraditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tradition = getTraditionBySlug(slug);
  if (!tradition) notFound();

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
        name: "Traditions",
        item: "https://opensadhaka.com/traditions",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tradition.title,
        item: `https://opensadhaka.com/traditions/${slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/traditions"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Traditions
              </Link>
            </nav>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {tradition.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {tradition.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {tradition.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto grid gap-8">
            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-secondary" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Overview
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {tradition.description}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Key Ideas
                </h2>
                <ul className="space-y-3">
                  {tradition.keyIdeas.map((idea, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{idea}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  Primary Practices
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tradition.primaryPractices.map((p) => (
                    <span
                      key={p}
                      className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-secondary" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Who It Suits
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {tradition.whoItSuits}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-5 h-5 text-secondary" />
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    How to Start
                  </h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {tradition.howToStart}
                </p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/faith-finder" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Find Your Spiritual Path{" "}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/traditions" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  Explore All Traditions
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
