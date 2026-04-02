import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getGreatBySlug, greats } from "@/data/greats";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Library,
} from "lucide-react";

export async function generateStaticParams() {
  return greats.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const great = getGreatBySlug(slug);
  if (!great) return {};

  return {
    title: `${great.name} — Life, Teachings & Legacy`,
    description: `${great.summary} Learn about ${great.name}'s key teachings, philosophical contributions, and recommended works.`,
    keywords: [
      great.name.toLowerCase(),
      ...great.tags,
      "spiritual master",
      "sanatan dharma",
      "indian philosophy",
    ],
    alternates: {
      canonical: `https://www.opensadhaka.com/greats/${slug}`,
    },
    openGraph: {
      title: `${great.name} | Sadhaka`,
      description: great.summary,
      url: `https://www.opensadhaka.com/greats/${slug}`,
    },
  };
}

export default async function GreatDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const great = getGreatBySlug(slug);
  if (!great) notFound();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.opensadhaka.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Spiritual Masters",
        item: "https://www.opensadhaka.com/greats",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: great.name,
        item: `https://www.opensadhaka.com/greats/${slug}`,
      },
    ],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: great.name,
    description: great.summary,
    jobTitle: great.title,
    knowsAbout: great.tags,
  };

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <main className="pt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary/20"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <nav aria-label="Breadcrumb" className="mb-12 flex justify-center">
              <Link
                href="/greats"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to the Acharyas and Sages
              </Link>
            </nav>
            <div className="mb-4 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
              {great.era}
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
              {great.name}
            </h1>
            <p className="text-2xl text-primary font-medium mb-8 italic">
              {great.title}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {great.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-background/50 backdrop-blur-sm border border-border/50 text-muted-foreground rounded-full text-sm font-medium hover:border-primary/30 hover:text-primary transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-4xl mx-auto grid gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
                <h2 className="font-display text-3xl font-bold text-foreground">
                  The Master's Journey
                </h2>
              </div>
              <div className="prose prose-invert prose-orange max-w-none">
                <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-6 py-2 mb-8">
                  {great.whatTheyClarified}
                </p>
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {great.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <Lightbulb className="w-64 h-64" />
              </div>
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Wisdom Pillars
                </h2>
              </div>
              <div className="grid gap-6 relative z-10">
                {great.keyTeachings.map((teaching, i) => (
                  <div key={i} className="flex gap-6 items-start bg-background/50 p-6 rounded-2xl border border-white/5 transition-all hover:border-primary/30">
                    <span className="text-4xl font-display font-bold text-primary/20">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="text-lg text-foreground font-medium mb-1">
                        {teaching.split('—')[0]}
                      </p>
                      {teaching.includes('—') && (
                        <p className="text-muted-foreground">
                          {teaching.split('—')[1]}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card border-border/50 p-6 rounded-3xl">
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Modern Relevance
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {great.relevanceToday}
                </p>
              </Card>

              <Card className="bg-card border-border/50 p-6 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <Library className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Canonical Works
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {great.recommendedWorks.map((work) => (
                    <span
                      key={work}
                      className="px-3 py-2 bg-primary/10 rounded-lg text-sm text-primary font-medium border border-primary/20"
                    >
                      {work}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

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
              <Link href="/greats" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  Explore More Masters
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
