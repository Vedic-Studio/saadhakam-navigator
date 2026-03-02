import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getTextBySlug, texts } from "@/data/texts";
import { ArrowLeft, ArrowRight, BookOpen, Scroll, Library } from "lucide-react";

export async function generateStaticParams() {
  return texts.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const text = getTextBySlug(slug);
  if (!text) return {};

  return {
    title: `${text.title} — ${text.sanskritTitle} | Complete Guide`,
    description: `${text.summary} Explore themes, key verses, and how to approach ${text.title}.`,
    keywords: [
      text.title.toLowerCase(),
      text.sanskritTitle,
      ...text.tags,
      "sacred texts",
      "sanatan dharma",
      "vedic wisdom",
    ],
    alternates: {
      canonical: `https://opensadhaka.com/texts/${slug}`,
    },
    openGraph: {
      title: `${text.title} | Sadhaka`,
      description: text.summary,
      url: `https://opensadhaka.com/texts/${slug}`,
    },
  };
}

export default async function TextDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const text = getTextBySlug(slug);
  if (!text) notFound();

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
        name: "Sacred Texts",
        item: "https://opensadhaka.com/texts",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: text.title,
        item: `https://opensadhaka.com/texts/${slug}`,
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
                href="/texts"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sacred Texts
              </Link>
            </nav>
            <div className="font-sanskrit text-2xl text-primary mb-2">
              {text.sanskritTitle}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              {text.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{text.summary}</p>
            <div className="flex flex-wrap gap-2">
              {text.tags.map((tag) => (
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
                  {text.overview}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Core Themes
                </h2>
                <ul className="space-y-2">
                  {text.themes.map((theme, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{theme}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {text.keyVerses.length > 0 && (
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Scroll className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Key Verses
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {text.keyVerses.map((verse, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-primary/30 pl-4"
                      >
                        <p className="font-sanskrit text-lg text-primary mb-1">
                          {verse.verse}
                        </p>
                        <p className="text-foreground font-medium mb-1 italic">
                          "{verse.translation}"
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {verse.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  Who It's For
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {text.whoItSuitsFor}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                  How to Approach
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {text.howToApproach}
                </p>
              </CardContent>
            </Card>

            {text.relatedTexts.length > 0 && (
              <Card className="bg-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Library className="w-5 h-5 text-secondary" />
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Related Texts
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {text.relatedTexts.map((relText) => (
                      <span
                        key={relText}
                        className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground"
                      >
                        {relText}
                      </span>
                    ))}
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
                  Find Your Spiritual Path{" "}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/texts" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  Explore More Texts
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
