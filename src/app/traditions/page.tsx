import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Badge } from "@/components/ui/badge";
import { traditions } from "@/data/traditions";
import { comparisons } from "@/data/comparisons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Compass, Shield, Users, Heart, Flame, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Spiritual Traditions & Sampradayas | Paths of Sanatan Dharma",
  description: "Explore the major spiritual traditions (Sampradayas) of India: Shaivism, Vaishnavism, Shaktism, and Smartism. Find the path that fits your temperament.",
  alternates: { canonical: "https://opensadhaka.com/traditions" },
};

export default function TraditionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="traditions" pillar="traditions" />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Traditions", href: "/traditions" },
            ]}
          />

          <header className="mb-16 mt-8 max-w-4xl">
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              The Rivers <span className="text-secondary italic">to the</span> Ocean.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight border-l-4 border-secondary/30 pl-8 py-2">
              A <strong>Sampradaya</strong> is a living ecosystem—a lineage that turns abstract philosophy into a walkable, breathing path.
            </p>
          </header>

          <section className="mb-20">
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12">
              While Western religions often split over theology, Sanatan Dharma expanded to contain it. Whether you are drawn to the meditative silence of <strong>Shaivism</strong>, the devotional ecstasy of <strong>Vaishnavism</strong>, or the fierce power of <strong>Shaktism</strong>, every tradition is a valid river flowing to the same ultimate ocean.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {traditions.map((tradition) => (
                <Card key={tradition.slug} className="group overflow-hidden border-border/40 hover:border-secondary/40 transition-all bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {tradition.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {tradition.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tradition.slug === 'shaivism' && <Badge variant="secondary">Monistic</Badge>}
                      {tradition.slug === 'vaishnavism' && <Badge variant="secondary">Devotional</Badge>}
                      {tradition.slug === 'shaktism' && <Badge variant="secondary">Energetic</Badge>}
                    </div>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-0">
                    <TrackedLink href={`/traditions/${tradition.slug}`} eventLabel={`traditions_index:${tradition.slug}`} trackPathName={tradition.slug} className="w-full">
                      <Button className="w-full h-12 rounded-xl group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                        Explore Lineage <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </TrackedLink>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-20 pt-20 border-t border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-display font-bold mb-4">Path Comparison</h2>
                <p className="text-muted-foreground">Understanding the nuances, overlaps, and historical debates between major sampradayas.</p>
              </div>
              <TrackedLink href="/compare" eventLabel="traditions:compare_index" trackPathName="comparisons">
                <Button variant="outline" className="h-12 rounded-xl border-dashed">View Comparison Hub</Button>
              </TrackedLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparisons
                .filter((c) => c.category === "Philosophy vs Philosophy" || c.category === "Path vs Path")
                .slice(4, 8)
                .map((item) => (
                  <TrackedLink key={item.slug} href={`/compare/${item.slug}`} eventLabel={`traditions:comparison:${item.slug}`} trackPathName="compare">
                    <div className="p-6 rounded-2xl border border-border/40 bg-card hover:border-secondary/40 transition-all h-full flex flex-col justify-between group">
                      <h3 className="font-bold text-foreground group-hover:text-secondary transition-colors">{item.title}</h3>
                      <div className="mt-4 flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                        Compare <ArrowRight className="ml-2 w-3 h-3" />
                      </div>
                    </div>
                  </TrackedLink>
                ))}
            </div>
          </section>

          <section className="mt-20 pt-20 border-t border-border/40 max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">Essential Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "What is a Sampradaya?",
                  a: "A Sampradaya is a living lineage of spiritual teaching. It ensures that wisdom is not just read from books, but transmitted from a realized teacher (Guru) to a dedicated student (Shishya) in an unbroken chain (Parampara)."
                },
                {
                  q: "Can I follow more than one tradition?",
                  a: "Yes. In Sanatan Dharma, it is common to have a 'primary' tradition (Nishta) while respecting and occasionally practicing the rituals of others. The Smarta tradition explicitly synthesizes multiple paths."
                },
                {
                  q: "How do I choose a path?",
                  a: "Traditional guidance suggests checking your 'Varna' (temperament) and 'Ishta Devata' (the form of the Divine that naturally attracts you). The Faith Finder assessment can help identify these natural leanings."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40 px-4">
                  <AccordionTrigger className="text-lg font-bold hover:text-secondary transition-colors text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
