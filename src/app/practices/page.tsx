import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { practices } from "@/data/practices";
import { buildBreadcrumbSchema } from "@/lib/seo";

const PAGE_URL = "https://www.opensadhaka.com/practices";

export const metadata: Metadata = {
  title: "Spiritual Practices: Japa, Dhyana, Kirtan, Puja & More | Sadhaka",
  description:
    "Browse the full library of Sanatan Dharma spiritual practices: japa, dhyana, kirtan, puja, seva, svadhyaya, pranayama, yoga sadhana, and vrat -- each with a dedicated hub.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Spiritual Practices: Japa, Dhyana, Kirtan, Puja & More | Sadhaka",
    description:
      "Full library of Sanatan Dharma practices with intent-specific guides.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function PracticesIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Practices", href: "/practices" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Spiritual Practices Library",
    description:
      "Index of Sanatan Dharma spiritual practices, each linking to a dedicated hub.",
    url: PAGE_URL,
    hasPart: practices.map((p, i) => ({
      "@type": "CreativeWork",
      position: i + 1,
      name: `${p.title} (${p.sanskritName})`,
      url: `${PAGE_URL}/${p.slug}`,
      description: p.summary,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="practices-index" pillar="practice-hub" />
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
            <span className="text-foreground">Practices</span>
          </nav>

          <header className="mb-12 text-center">
            <div className="text-primary font-black uppercase tracking-widest text-xs mb-4">
              Practice Library
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Spiritual <span className="text-orange-500">Practices</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The toolkit of Sanatan Dharma. Each practice has a dedicated hub
              with the mechanics, who it suits, how to begin, and
              intent-specific protocols.
            </p>
          </header>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-orange-500" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Practice families
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mb-10">
              Pick one. Stay with it long enough that it stops feeling foreign.
              Then layer in a second.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {practices.map((practice) => (
                <TrackedLink
                  key={practice.slug}
                  href={`/practices/${practice.slug}`}
                  eventLabel={`practices_index:${practice.slug}`}
                  trackPathName={`practice-${practice.slug}`}
                  className="group block h-full p-8 rounded-3xl border border-border/50 bg-card hover:border-orange-500/40 transition-all"
                >
                  <div className="text-sm font-sanskrit text-muted-foreground mb-2">
                    {practice.sanskritName}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-orange-400 transition-colors">
                    {practice.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {practice.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {practice.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-muted/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold">
                    Open the practice hub
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Need a recommendation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
              The Faith Finder asks a few questions and recommends the practice
              most likely to take root in your particular life and temperament.
            </p>
            <Link
              href="/faith-finder"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Find your path
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
