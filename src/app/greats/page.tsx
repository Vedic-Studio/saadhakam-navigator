import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Badge } from "@/components/ui/badge";
import { greats } from "@/data/greats";
import { comparisons } from "@/data/comparisons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "The Acharyas and Sages of Sanatan Dharma | Sadhaka",
  description:
    "An orientation to major acharyas, commentators, and literary figures in Sanatan Dharma, with emphasis on lineage, commentary tradition, and philosophical contribution.",
  keywords: [
    "acharyas",
    "shankaracharya",
    "abhinavagupta",
    "vivekananda",
    "aurobindo",
    "kalidasa",
    "sanatan dharma",
    "vedanta",
    "bhashya",
  ],
  alternates: { canonical: "https://www.opensadhaka.com/greats" },
  openGraph: {
    title: "The Acharyas and Sages of Sanatan Dharma | Sadhaka",
    description:
      "An orientation to major acharyas, commentators, and literary figures in Sanatan Dharma, with emphasis on lineage, commentary tradition, and philosophical contribution.",
    url: "https://www.opensadhaka.com/greats",
  },
};

export default function GreatsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContentPageTracker slug="greats" pillar="greats" />
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 px-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                Acharyas & Sages
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
                The Acharyas and Sages
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                The teachers, commentators, and literary figures who shaped how
                major schools of Sanatan Dharma are studied, interpreted, and
                transmitted.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-16 space-y-4 text-muted-foreground leading-relaxed px-4">
              <p>
                In many Sanskrit traditions, authority is not carried by slogans
                but by commentary, debate, and transmission. The Vedantic schools
                are a clear example. Shankara, Ramanuja, and Madhva each wrote
                major bhashyas on the Brahma Sutras and related scriptural corpus,
                and those commentaries became the basis for distinct metaphysical
                and soteriological systems. To study an acharya is therefore to
                study how a lineage reads scripture, defines valid knowledge, and
                argues for liberation.
              </p>
              <p>
                This page is an orientation, not a hall of fame. It highlights
                figures whose work changed the vocabulary of Indian philosophy,
                theology, poetics, or practice. Some are system builders.
                Some are exegetes. Some translate inherited doctrine into a new
                historical setting. What matters here is contribution: what they
                wrote, what they clarified, what lineage they influenced, and why
                later readers still return to them.
              </p>
              <p>
                The figures listed below should be read in context. Shankaracharya
                is central for Advaita Vedanta and the commentary tradition around
                the Prasthanatrayi. Abhinavagupta is indispensable for Kashmir
                Shaiva philosophy and aesthetics. Vivekananda and Aurobindo matter
                for modern reinterpretations of Vedanta and yoga. Kalidasa belongs
                here because Sanskrit literary culture and philosophical culture are
                historically intertwined, not separate worlds.
              </p>
              <p className="text-sm italic text-muted-foreground/70">
                This is not an exhaustive list. Ramanuja, Madhva, Vallabha, Patanjali,
                and many others are not yet covered. The selection reflects current
                coverage, not a ranking.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {greats.map((great) => (
                <Card
                  key={great.slug}
                  className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="text-xs text-primary uppercase tracking-wider font-medium mb-2">
                      {great.era}
                    </div>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-1">
                      {great.name}
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium mb-3">
                      {great.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {great.summary}
                    </p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <TrackedLink
                      href={`/greats/${great.slug}`}
                      eventLabel={`greats_index:${great.slug}`}
                      trackPathName={great.slug}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:text-primary"
                      >
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Button>
                    </TrackedLink>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-24 pt-16 border-t border-border">
              <div className="rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8 mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  New: Stotra & Sahasranama Archive
                </h2>
                <p className="text-muted-foreground mb-6 max-w-3xl">
                  Study the sacred hymns and name traditions honored by many of the masters on this page,
                  with structured navigation for chanting, memorization, and reflective inquiry.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <TrackedLink href="/stotras/shiva-tandava-stotram" eventLabel="greats:stotra:shiva-tandava" trackPathName="stotras">
                    <div className="rounded-xl border border-border/50 p-4 hover:border-primary/40 transition-colors h-full">
                      <p className="font-semibold">Shiva Tandava Stotram</p>
                      <p className="text-sm text-muted-foreground mt-1">Powerful Shaiva stotra across 16 verse pages</p>
                    </div>
                  </TrackedLink>
                  <TrackedLink href="/stotras/vishnu-sahasranama" eventLabel="greats:stotra:vishnu-sahasranama" trackPathName="stotras">
                    <div className="rounded-xl border border-border/50 p-4 hover:border-primary/40 transition-colors h-full">
                      <p className="font-semibold">Vishnu Sahasranama</p>
                      <p className="text-sm text-muted-foreground mt-1">1000 names with dedicated study pages</p>
                    </div>
                  </TrackedLink>
                  <TrackedLink href="/stotras/lalita-sahasranama" eventLabel="greats:stotra:lalita-sahasranama" trackPathName="stotras">
                    <div className="rounded-xl border border-border/50 p-4 hover:border-primary/40 transition-colors h-full">
                      <p className="font-semibold">Lalita Sahasranama</p>
                      <p className="text-sm text-muted-foreground mt-1">Devi-centered sahasranama for bhakti practice</p>
                    </div>
                  </TrackedLink>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    Compare the Masters
                  </h2>
                  <p className="text-muted-foreground">
                    Comparative pages on differences in doctrine, method, and emphasis.
                  </p>
                </div>
                <TrackedLink
                  href="/compare"
                  eventLabel="greats:compare_index"
                  trackPathName="comparisons"
                >
                  <Button variant="outline" className="gap-2">
                    View all comparisons <ArrowRight className="w-4 h-4" />
                  </Button>
                </TrackedLink>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comparisons
                  .filter((c) => c.category === "Teacher vs Teacher")
                  .slice(0, 4)
                  .map((item) => (
                    <TrackedLink
                      key={item.slug}
                      href={`/compare/${item.slug}`}
                      eventLabel={`greats:comparison:${item.slug}`}
                      trackPathName="teacher-vs-teacher"
                    >
                      <div className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all group h-full">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider mb-2 opacity-70 group-hover:opacity-100">
                          {item.category}
                        </Badge>
                        <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </TrackedLink>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
