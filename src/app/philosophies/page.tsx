import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  title: "The 6 Darshanas: Sanatan Philosophy's 6 Schools (2026)",
  description:
    "Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta: the six classical schools side-by-side, with foundational sutras, paired relations, and paths to Moksha.",
  alternates: {
    canonical: "https://www.opensadhaka.com/philosophies",
  },
  openGraph: {
    title: "The 6 Darshanas: Sanatan Philosophy Systems Compared",
    description:
      "The six orthodox schools of Indian philosophy in a single reference: sutras, founders, and how each one defines liberation.",
    url: "https://www.opensadhaka.com/philosophies",
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
              The Six <span className="text-primary italic">Darshanas</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight border-l-4 border-primary/30 pl-8 py-2">
              The word <strong className="text-foreground italic">darshana</strong> (from the Sanskrit root <em>drsh</em>, &ldquo;to see&rdquo;) means a way of seeing. In Indian philosophy, a darshana is not just an opinion but a disciplined view of reality, knowledge, bondage, and liberation.
            </p>
          </header>

          <section className="mb-20">
            <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed mb-12">
              <p>
                The six orthodox schools (<em>shad-darshanas</em>) are usually named as
                Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta. They are
                called &ldquo;orthodox&rdquo; here in the classical sense that they accept the
                authority of the Veda, even when they disagree sharply on what the
                Veda means, what counts as valid knowledge, and what liberation
                finally is.
              </p>
              <p>
                Classical doxographies often group them as three working pairs:
                Nyaya&ndash;Vaisheshika for logic and categories of reality,
                Samkhya&ndash;Yoga for metaphysical analysis and disciplined practice,
                and Mimamsa&ndash;Vedanta for Vedic interpretation in its ritual and
                metaphysical dimensions. The pairing is heuristic rather than
                absolute, but it helps a new reader see how schools developed in
                conversation rather than isolation.
              </p>
              <p>
                Each school is anchored in foundational texts and commentarial
                traditions: Gautama&rsquo;s <em>Nyaya Sutra</em> opens with its subjects of
                inquiry (<em>pramana-prameya-samsaya...</em>, 1.1.1); Kanada&rsquo;s
                <em> Vaisheshika Sutra</em> begins by defining dharma and the categories
                of inquiry (1.1.1&ndash;4); Jaimini opens the <em>Mimamsa Sutra</em> with
                <em>athato dharma jijnasa</em> (1.1.1); Badarayana opens the
                <em> Brahma Sutra</em> with <em>athato brahma jijnasa</em> (1.1.1); and
                Patanjali defines Yoga in <em>Yoga Sutra</em> 1.2 as
                <em>yogas chitta-vritti-nirodhah</em>. Samkhya is classically represented
                for many readers through Ishvarakrishna&rsquo;s <em>Samkhya Karika</em>, though
                the school is older than that text.
              </p>
              <div className="rounded-2xl border border-border/40 bg-muted/20 p-6">
                <h2 className="text-lg font-bold text-foreground mb-3">How to read this hub</h2>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li>
                    <strong className="text-foreground">If your question is epistemic</strong> &mdash; how do we know what is true? &mdash; start with Nyaya-Vaisheshika.
                  </li>
                  <li>
                    <strong className="text-foreground">If your question is psychological or practical</strong> &mdash; why does mind bind us, and how is it disciplined? &mdash; start with Samkhya and Yoga.
                  </li>
                  <li>
                    <strong className="text-foreground">If your question is scriptural or theological</strong> &mdash; what do the Vedas finally teach? &mdash; start with Mimamsa and Vedanta.
                  </li>
                  <li>
                    Use the comparison hub alongside the school pages if you want to understand how later Vedantic, Shaiva, or Bhakti traditions inherit, revise, or reject these older frameworks.
                  </li>
                </ul>
              </div>
              <p className="text-xs text-muted-foreground/80">
                Citations above refer to the opening passages of the foundational texts commonly used to introduce each school. This page is a navigation hub, not a substitute for the sutras, karikas, and bhashyas themselves.
              </p>
            </div>

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
                  a: "The six classical astika schools are Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta. They differ on metaphysics, method, and liberation, but are grouped together because they accept Vedic authority within the classical Indian classification."
                },
                {
                  q: "Why are some schools presented in pairs?",
                  a: "Because later tradition often reads them as historically adjacent conversations: Nyaya with Vaisheshika, Samkhya with Yoga, and Mimamsa with Vedanta. The pairing highlights shared concerns, but each school remains independently substantial and should not be reduced to its partner."
                },
                {
                  q: "How should a beginner study the darshanas?",
                  a: "Start with the school that matches your actual question, then read the primary source with commentary: Nyaya for knowledge claims, Samkhya-Yoga for mind and liberation practice, Mimamsa for Vedic duty, and Vedanta for Brahman and Atman. Comparative reading is useful, but only after each school is first understood on its own terms."
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
