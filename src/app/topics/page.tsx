import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { topics } from "@/data/topics";
import { buildBreadcrumbSchema } from "@/lib/seo";

const PAGE_URL = "https://www.opensadhaka.com/topics";

export const metadata: Metadata = {
  title: "Topics: Core Themes in Sanatan Dharma | Sadhaka",
  description:
    "Browse the central themes of Sanatan Dharma -- meditation, devotion, action, knowledge, and dharma -- with the practices and traditions that explore each.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Topics: Core Themes in Sanatan Dharma | Sadhaka",
    description:
      "Explore the foundational topics of Sanatan Dharma -- meditation, devotion, action, knowledge, dharma.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function TopicsIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Topics", href: "/topics" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Topics in Sanatan Dharma",
    description:
      "Index of core topics in Sanatan Dharma with linked hubs of practices and traditions.",
    url: PAGE_URL,
    hasPart: topics.map((t, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: t.name,
      url: `${PAGE_URL}/${t.slug}`,
      description: t.summary,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="topics-index" pillar="topics-hub" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Header />

      <main className="flex-grow pt-32 pb-16">
        <div className="container-padding max-w-5xl mx-auto">
          <nav className="text-sm mb-8 text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Topics</span>
          </nav>

          <header className="mb-12 text-center">
            <div className="text-primary font-black uppercase tracking-widest text-xs mb-4">
              Thematic Hubs
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Topics in <span className="text-orange-500">Sanatan Dharma</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The classical themes that organise Indian spiritual life --
              meditation, devotion, selfless action, knowledge, dharma. Each
              topic links to the practices and traditions that develop it.
            </p>
          </header>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-6 h-6 text-orange-500" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Explore the topics
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mb-10">
              These are not abstract categories. They are the doors traditional
              Indian thought uses to bring a seeker to direct experience.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {topics.map((topic) => (
                <TrackedLink
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  eventLabel={`topics_index:${topic.slug}`}
                  trackPathName={`topic-${topic.slug}`}
                  className="group block h-full p-8 rounded-3xl border border-border/50 bg-card hover:border-orange-500/40 transition-all"
                >
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {topic.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {topic.summary}
                  </p>
                  <span className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold">
                    Open the topic hub
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Not sure which topic fits you?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              The Faith Finder asks a few questions about how you process the
              world and recommends the topics, practices, and traditions most
              likely to take root in your life.
            </p>
            <Link
              href="/faith-finder"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Take the Faith Finder
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
