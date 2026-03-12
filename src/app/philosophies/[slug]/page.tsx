import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPhilosophyBySlug, philosophies } from "@/data/philosophies";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Users,
  Play,
  Library,
} from "lucide-react";

export async function generateStaticParams() {
  return philosophies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const philosophy = getPhilosophyBySlug(slug);
  if (!philosophy) return {};

  return {
    title: `${philosophy.title} — Indian Philosophy Explained`,
    description: `${philosophy.summary} Explore key ideas, practices, and recommended texts for ${philosophy.title}.`,
    keywords: [
      philosophy.title.toLowerCase(),
      ...philosophy.tags,
      "indian philosophy",
      "sanatan dharma",
      "vedanta",
    ],
    alternates: {
      canonical: `https://opensadhaka.com/philosophies/${slug}`,
    },
    openGraph: {
      title: `${philosophy.title} | Sadhaka`,
      description: philosophy.summary,
      url: `https://opensadhaka.com/philosophies/${slug}`,
    },
  };
}

export default async function PhilosophyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const philosophy = getPhilosophyBySlug(slug);
  if (!philosophy) notFound();

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
        name: "Philosophies",
        item: "https://opensadhaka.com/philosophies",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: philosophy.title,
        item: `https://opensadhaka.com/philosophies/${slug}`,
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
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/philosophies"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Philosophies
              </Link>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {philosophy.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {philosophy.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {philosophy.tags.map((tag) => (
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

        {/* Content */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {/* Overview */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Overview
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.description}
                  </p>
                </CardContent>
              </Card>

              {/* Key Ideas */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Key Ideas
                  </h2>
                  <ul className="space-y-3">
                    {philosophy.keyIdeas.map((idea, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{idea}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Who It Suits */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Who It Suits
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.whoItSuits}
                  </p>
                </CardContent>
              </Card>

              {/* How to Start */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Play className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      How to Start
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {philosophy.howToStart}
                  </p>
                </CardContent>
              </Card>

              {/* Recommended Texts */}
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Library className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Recommended Reading
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {philosophy.recommendedTexts.map((text) => (
                      <span
                        key={text}
                        className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground"
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              {philosophy.slug === "advaita" && (
                <Card className="bg-card border-border/50">
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                      Western Bridge + Practice Links
                    </h2>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <Link href="/western-philosophy-and-vedanta" className="text-orange-400 hover:text-orange-300 transition-colors">
                        Indian vs Western Philosophy
                      </Link>
                      <Link href="/vedanta-vs-stoicism" className="text-orange-400 hover:text-orange-300 transition-colors">
                        Vedanta vs Stoicism
                      </Link>
                      <Link href="/deities/shiva" className="text-orange-400 hover:text-orange-300 transition-colors">
                        Who is Shiva?
                      </Link>
                      <Link href="/stotras/shiva-tandava-stotram" className="text-orange-400 hover:text-orange-300 transition-colors">
                        Shiva Tandava Stotram
                      </Link>
                      <Link href="/stotras/vishnu-sahasranama" className="text-orange-400 hover:text-orange-300 transition-colors">
                        Vishnu Sahasranama
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/faith-finder" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    Find Your Spiritual Path
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/philosophies" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    Explore Other Philosophies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
