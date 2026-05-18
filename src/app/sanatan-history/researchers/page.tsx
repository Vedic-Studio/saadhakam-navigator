import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ContentPageTracker,
  TrackedLink,
} from "@/components/ContentAnalytics";
import { researchers } from "@/data/researchers";
import { buildBreadcrumbSchema } from "@/lib/seo";

const PAGE_URL = "https://www.opensadhaka.com/sanatan-history/researchers";

export const metadata: Metadata = {
  title: "Researchers of Sanatan History | Sadhaka",
  description:
    "Profiles of the scholars whose work shapes the evidence-based reconstruction of Sanatan history: archaeoastronomers, archaeologists, historians, and geneticists.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Researchers of Sanatan History | Sadhaka",
    description:
      "Scholars whose work shapes the evidence-based reconstruction of Indian civilizational history.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function ResearchersIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    {
      label: "Researchers",
      href: "/sanatan-history/researchers",
    },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Researchers of Sanatan History",
    description:
      "Index of scholars whose work underpins the evidence-based reconstruction of Sanatan history.",
    url: PAGE_URL,
    hasPart: researchers.map((r, i) => ({
      "@type": "Person",
      position: i + 1,
      name: r.name,
      jobTitle: r.title,
      affiliation: r.affiliation,
      url: `${PAGE_URL.replace("/researchers", "")}/researchers/${r.id}`,
      description: r.metaDescription,
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker
        slug="sanatan-history-researchers-index"
        pillar="history-hub"
      />
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
            <Link
              href="/sanatan-history"
              className="hover:text-primary transition-colors"
            >
              Sanatan History
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Researchers</span>
          </nav>

          <header className="mb-12 text-center">
            <div className="text-primary font-black uppercase tracking-widest text-xs mb-4">
              History Hub
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-orange-500">Researchers</span> of Sanatan
              History
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The scholars whose work -- archaeoastronomy, archaeology,
              historiography, genetics -- underpins the evidence-based
              reconstruction of Sanatan history.
            </p>
          </header>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-orange-500" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                All researchers ({researchers.length})
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mb-10">
              Each profile sets out the researcher&rsquo;s methodology, key
              claims, major works, and the archaeological sites and evidence
              that anchor their conclusions.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {researchers.map((r) => (
                <TrackedLink
                  key={r.id}
                  href={`/sanatan-history/researchers/${r.id}`}
                  eventLabel={`researchers_index:${r.id}`}
                  trackPathName={`researcher-${r.id}`}
                  className="group block h-full p-8 rounded-3xl border border-border/50 bg-card hover:border-orange-500/40 transition-all"
                >
                  <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-orange-400 transition-colors">
                    {r.name}
                  </h3>
                  <div className="text-sm text-muted-foreground mb-1">
                    {r.title}
                  </div>
                  <div className="text-xs text-muted-foreground/70 mb-5">
                    {r.affiliation}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {r.methodology}
                  </p>
                  <span className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold">
                    Read the profile
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
