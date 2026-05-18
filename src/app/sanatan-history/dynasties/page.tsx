import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitBranch } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ContentPageTracker,
  TrackedLink,
} from "@/components/ContentAnalytics";
import { dynasties, type DynastyProfile } from "@/data/dynasties";
import { buildBreadcrumbSchema } from "@/lib/seo";

const PAGE_URL = "https://www.opensadhaka.com/sanatan-history/dynasties";

export const metadata: Metadata = {
  title: "Dynasties of Sanatan History | Sadhaka",
  description:
    "Index of solar (Suryavansha), lunar (Chandravansha), and historical Indian dynasties -- from Ikshvaku through the Mauryas and Cholas.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Dynasties of Sanatan History | Sadhaka",
    description:
      "Full index of Indian dynasties across solar, lunar, and historical branches.",
    url: PAGE_URL,
    type: "website",
  },
};

const branchLabels: Record<DynastyProfile["branch"], string> = {
  solar: "Solar (Suryavansha)",
  lunar: "Lunar (Chandravansha)",
  historical: "Historically Verified",
};

export default function DynastiesIndexPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { label: "Home", href: "/" },
    { label: "Sanatan History", href: "/sanatan-history" },
    {
      label: "Dynasties",
      href: "/sanatan-history/dynasties",
    },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Dynasties of Sanatan History",
    description:
      "Index of solar, lunar, and historical Indian dynasties with linked profiles.",
    url: PAGE_URL,
    hasPart: dynasties.map((d, i) => ({
      "@type": "CreativeWork",
      position: i + 1,
      name: d.name,
      url: `${PAGE_URL.replace("/dynasties", "")}/dynasties/${d.id}`,
      description: d.significance,
    })),
  };

  // Group dynasties by branch for clearer skim-reading.
  const branchOrder: DynastyProfile["branch"][] = [
    "solar",
    "lunar",
    "historical",
  ];
  const grouped = branchOrder.map((branch) => ({
    branch,
    label: branchLabels[branch],
    items: dynasties.filter((d) => d.branch === branch),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker
        slug="sanatan-history-dynasties-index"
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
            <span className="text-foreground">Dynasties</span>
          </nav>

          <header className="mb-12 text-center">
            <div className="text-primary font-black uppercase tracking-widest text-xs mb-4">
              History Hub
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-orange-500">Dynasties</span> of Sanatan
              History
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The solar (Suryavansha), lunar (Chandravansha), and historically
              verified dynasties that structured Indian political and dharmic
              life across millennia.
            </p>
          </header>

          {grouped.map((group) =>
            group.items.length === 0 ? null : (
              <section key={group.branch} className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <GitBranch className="w-6 h-6 text-orange-500" />
                  <h2 className="font-display text-3xl md:text-4xl font-bold">
                    {group.label}
                    <span className="text-base font-normal text-muted-foreground ml-3">
                      ({group.items.length})
                    </span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {group.items.map((d) => (
                    <TrackedLink
                      key={d.id}
                      href={`/sanatan-history/dynasties/${d.id}`}
                      eventLabel={`dynasties_index:${d.id}`}
                      trackPathName={`dynasty-${d.id}`}
                      className="group block h-full p-8 rounded-3xl border border-border/50 bg-card hover:border-orange-500/40 transition-all"
                    >
                      <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-orange-400 transition-colors">
                        {d.name}
                      </h3>
                      <div className="text-xs uppercase tracking-widest text-orange-400/80 mb-4">
                        {d.dateRange}
                        {d.capital ? ` -- ${d.capital}` : ""}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {d.significance}
                      </p>
                      <span className="inline-flex items-center gap-2 text-orange-400 text-sm font-semibold">
                        Open the dynasty profile
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </TrackedLink>
                  ))}
                </div>
              </section>
            ),
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
