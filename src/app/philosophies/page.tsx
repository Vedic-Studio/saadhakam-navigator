import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Infinity, Eye, Heart, Crown, Layers, Focus, Flame, Scale, BookOpen } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { philosophies } from "@/data/philosophies";
import { comparisons } from "@/data/comparisons";

export const metadata: Metadata = {
  title: "The Six Darshanas | Systems of Indian Philosophy",
  description: "Explore the six orthodox schools of Hindu philosophy (Darshanas): Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta. A guide to the vision of reality.",
  alternates: {
    canonical: "https://opensadhaka.com/philosophies",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Infinity, Eye, Heart, Crown, Layers, Focus, Flame, Scale,
};

export default function PhilosophiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ContentPageTracker slug="philosophies" pillar="philosophies" />
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="container-padding max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Philosophies", href: "/philosophies" },
            ]}
          />

          <header className="mb-16 mt-8 max-w-4xl">
            <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              The Vision <span className="text-primary italic">of</span> Reality.
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight border-l-4 border-primary/30 pl-8 py-2">
              In Sanskrit, philosophy is called <strong className="text-foreground italic">Darshana</strong>—not just a love of wisdom, but a direct "vision" of the Truth.
            </p>
          </header>

          <section className="mb-20">
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12">
              The Six Orthodox Schools (Shad Darshanas) form the intellectual bedrock of Sanatan Dharma. While they range from strict logic to absolute non-dualism, all six are <strong>soteriological</strong>: they exist for the sole purpose of ending human suffering and achieving Moksha.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {philosophies.map((philosophy) => {
                const IconComponent = iconMap[philosophy.icon] || Infinity;
                return (
                  <Card key={philosophy.slug} className="group overflow-hidden border-border/40 hover:border-primary/40 transition-all bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                        {philosophy.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {philosophy.summary}
                      </p>
                      <div className="p-4 bg-muted/30 rounded-xl border border-border/20">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 block mb-1">Key Question</span>
                        <p className="text-sm font-medium italic text-foreground leading-snug">"{philosophy.keyQuestion}"</p>
                      </div>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 pt-0">
                      <TrackedLink href={`/philosophies/${philosophy.slug}`} eventLabel={`philosophies_index:${philosophy.slug}`} trackPathName={philosophy.slug} className="w-full">
                        <Button className="w-full h-12 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          Explore System
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </TrackedLink>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </section>

          <section className="mb-20 pt-20 border-t border-border/40">
            <div className="rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8 mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                New: Mantra & Stotra Practice Library
              </h2>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                Move from philosophy into practice with curated stotra and sahasranama collections,
                including verse-by-verse and name-by-name study pages.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TrackedLink href="/stotras/shiva-tandava-stotram" eventLabel="philosophies:stotra:shiva-tandava" trackPathName="stotras">
                  <div className="rounded-xl border border-border/50 p-4 hover:border-primary/40 transition-colors h-full">
                    <p className="font-semibold">Shiva Tandava Stotram</p>
                    <p className="text-sm text-muted-foreground mt-1">Non-dual depth through a classical Shaiva hymn</p>
                  </div>
                </TrackedLink>
                <TrackedLink href="/stotras/vishnu-sahasranama" eventLabel="philosophies:stotra:vishnu-sahasranama" trackPathName="stotras">
                  <div className="rounded-xl border border-border/50 p-4 hover:border-primary/40 transition-colors h-full">
                    <p className="font-semibold">Vishnu Sahasranama</p>
                    <p className="text-sm text-muted-foreground mt-1">1000 divine names for bhakti and contemplation</p>
                  </div>
                </TrackedLink>
                <TrackedLink href="/stotras/lalita-sahasranama" eventLabel="philosophies:stotra:lalita-sahasranama" trackPathName="stotras">
                  <div className="rounded-xl border border-border/50 p-4 hover:border-primary/40 transition-colors h-full">
                    <p className="font-semibold">Lalita Sahasranama</p>
                    <p className="text-sm text-muted-foreground mt-1">Shakta metaphysics expressed in sacred names</p>
                  </div>
                </TrackedLink>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="max-w-xl">
                <h2 className="text-4xl font-display font-bold mb-4">Comparative Logic</h2>
                <p className="text-muted-foreground">Deep analysis of how these systems intersect, conflict, and complement one another.</p>
              </div>
              <TrackedLink href="/compare" eventLabel="philosophies:compare_index" trackPathName="comparisons">
                <Button variant="outline" className="h-12 rounded-xl border-dashed">View Comparison Hub</Button>
              </TrackedLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {comparisons
                .filter((c) => c.category === "Philosophy vs Philosophy" || c.category === "Path vs Path")
                .slice(0, 4)
                .map((item) => (
                  <TrackedLink key={item.slug} href={`/compare/${item.slug}`} eventLabel={`philosophies:comparison:${item.slug}`} trackPathName="compare">
                    <div className="p-6 rounded-2xl border border-border/40 bg-card hover:border-primary/40 transition-all h-full flex flex-col justify-between group">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                      <div className="mt-4 flex items-center text-xs font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                        Compare <ArrowRight className="ml-2 w-3 h-3" />
                      </div>
                    </div>
                  </TrackedLink>
                ))}
            </div>
          </section>

          <section className="mt-20 pt-20 border-t border-border/40 max-w-3xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "What are the 6 Darshanas?",
                  a: "The six orthodox schools (Astika) are Nyaya (logic), Vaisheshika (atomism), Samkhya (dualism), Yoga (practice), Mimamsa (ritual), and Vedanta (inquiry). They differ in method but all accept Vedic authority."
                },
                {
                  q: "What is the goal of Indian philosophy?",
                  a: "Unlike Western philosophy, which is often purely academic, Indian philosophy is soteriological. Its goal is Moksha—liberation from the cycle of rebirth and the ending of human suffering."
                },
                {
                  q: "What is the difference between Samkhya and Vedanta?",
                  a: "Samkhya is dualistic, seeing consciousness (Purusha) and matter (Prakriti) as separate. Vedanta is non-dualistic (Advaita), seeing all of existence as a single manifestation of one consciousness (Brahman)."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40 px-4">
                  <AccordionTrigger className="text-lg font-bold hover:text-primary transition-colors text-left">{faq.q}</AccordionTrigger>
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
