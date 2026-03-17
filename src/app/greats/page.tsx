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
  title: "Legacy of Light: The Great Masters of Sanatan Dharma | Sadhaka",
  description:
    "Meet the sages, philosophers, and saints who preserved the flame of Dharma through the ages. From Adi Shankaracharya to Swami Vivekananda.",
  keywords: [
    "spiritual masters",
    "gurus",
    "saints",
    "shankaracharya",
    "vivekananda",
    "sanatan dharma",
    "ancient wisdom",
  ],
  alternates: { canonical: "https://www.opensadhaka.com/greats" },
  openGraph: {
    title: "Spiritual Masters of Sanatan Dharma | Sadhaka",
    description:
      "Explore the greatest saints, philosophers, and gurus of Sanatan Dharma.",
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
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                The Heritage of Wisdom
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
                Legacy of <span className="text-primary italic">Light</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Meet the sages, philosophers, and saints who preserved the flame of Dharma
                through the ages. Ancient wisdom, transmitted through a living lineage
                of realized masters.
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
                    Deep dives into the unique styles and teachings of history's greatest gurus.
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
