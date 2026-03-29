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
  title: "Sampradayas: The Transmission Lineages of Sanatan Dharma",
  description: "The major sampradayas (transmission lineages) of Sanatan Dharma: Shaivism, Vaishnavism, Shaktism, and Smartism. Each preserves a distinct philosophical reading of the Vedantic canon through unbroken guru-shishya parampara.",
  alternates: { canonical: "https://www.opensadhaka.com/traditions" },
  openGraph: {
    title: "Sampradayas: The Transmission Lineages of Sanatan Dharma",
    description: "Shaivism, Vaishnavism, Shaktism, and Smartism: the major lineages that transmit Dharmic philosophy from teacher to student.",
    url: "https://www.opensadhaka.com/traditions",
  },
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
              Sampra<span className="text-secondary italic">dayas</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight border-l-4 border-secondary/30 pl-8 py-2">
              A <strong>Sampradaya</strong> is a transmission lineage. Philosophical insight passes from teacher (Guru) to student (Shishya) through direct instruction, not just textual study. Each lineage preserves a distinct reading of the Vedantic canon.
            </p>
          </header>

          <section className="mb-20">
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12">
              Within Sanatan Dharma, multiple theological schools coexist as valid interpretations of the same scriptural canon. <strong>Shaivism</strong> identifies consciousness (Chit) as ultimate reality, as stated in Shiva Sutras 1.1: <em>Chaitanyam Atma</em>. <strong>Vaishnavism</strong> centers on devotion (Bhakti) to the personal absolute, following Ramanuja&apos;s reading of Brahma Sutra 1.1.1. <strong>Shaktism</strong> holds that dynamic creative power (Shakti) is inseparable from consciousness itself. <strong>Smartism</strong>, formalized by Adi Shankaracharya, synthesizes all deity forms as expressions of one non-dual Brahman.
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
            <div className="rounded-2xl border border-border/50 bg-card/40 p-6 md:p-8 mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                New: Devotional Stotra & Sahasranama Study
              </h2>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                Stotra and Sahasranama texts from each sampradaya, with structured verse-by-verse study,
                searchable name pages, and transliteration for recitation practice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TrackedLink href="/stotras/shiva-tandava-stotram" eventLabel="traditions:stotra:shiva-tandava" trackPathName="stotras">
                  <div className="rounded-xl border border-border/50 p-4 hover:border-secondary/40 transition-colors h-full">
                    <p className="font-semibold">Shiva Tandava Stotram</p>
                    <p className="text-sm text-muted-foreground mt-1">Shaiva hymn with 16 guided verse pages</p>
                  </div>
                </TrackedLink>
                <TrackedLink href="/stotras/vishnu-sahasranama" eventLabel="traditions:stotra:vishnu-sahasranama" trackPathName="stotras">
                  <div className="rounded-xl border border-border/50 p-4 hover:border-secondary/40 transition-colors h-full">
                    <p className="font-semibold">Vishnu Sahasranama</p>
                    <p className="text-sm text-muted-foreground mt-1">Vaishnava 1000-name corpus with individual entries</p>
                  </div>
                </TrackedLink>
                <TrackedLink href="/stotras/lalita-sahasranama" eventLabel="traditions:stotra:lalita-sahasranama" trackPathName="stotras">
                  <div className="rounded-xl border border-border/50 p-4 hover:border-secondary/40 transition-colors h-full">
                    <p className="font-semibold">Lalita Sahasranama</p>
                    <p className="text-sm text-muted-foreground mt-1">Shakta 1000 names for mantra and devotion study</p>
                  </div>
                </TrackedLink>
              </div>
            </div>

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
                  q: "How do I choose a tradition?",
                  a: "Traditional frameworks consider your innate disposition (svabhava, described in Bhagavad Gita 18.41-44) and your natural devotional attraction to a particular form of the Divine (Ishta Devata). A qualified teacher (Guru) in any tradition can help assess readiness and temperament. Many practitioners begin with the tradition of their family or region and deepen from there."
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
