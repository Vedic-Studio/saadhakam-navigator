import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Infinity, Eye, Heart, Crown, Layers, Focus, Flame, Scale } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { philosophies } from "@/data/philosophies";
import { comparisons } from "@/data/comparisons";


export const metadata: Metadata = {
  title: "Six Darshanas of Hindu Philosophy | Vedanta, Yoga, Samkhya",
  description:
    "Explore the six schools of Hindu philosophy (Darshanas): Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta. Complete guide to Indian philosophical systems.",
  keywords: [
    "six darshanas",
    "hindu philosophy",
    "vedanta",
    "yoga philosophy",
    "samkhya",
    "nyaya",
    "indian philosophy",
    "darshana",
  ],
  alternates: {
    canonical: "https://opensadhaka.com/philosophies",
  },
  openGraph: {
    title: "Six Darshanas of Hindu Philosophy | Sadhaka",
    description:
      "Explore the six schools of Hindu philosophy: Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta.",
    url: "https://opensadhaka.com/philosophies",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Infinity,
  Eye,
  Heart,
  Crown,
  Layers,
  Focus,
  Flame,
  Scale,
};

export default function PhilosophiesPage() {
  const faqs = [
    {
      question: "What are the 6 Darshanas in Indian philosophy?",
      answer: "The six orthodox (Astika) schools of Hindu philosophy are Nyaya (logic), Vaisheshika (atomism), Samkhya (dualism), Yoga (practice), Mimamsa (ritualism), and Vedanta (non-dualism/inquiry). All six accept the authority of the Vedas."
    },
    {
      question: "What is the difference between Vedanta and Samkhya?",
      answer: "Samkhya is strictly dualistic, asserting that the universe consists of two independent eternal realities: Purusha (pure consciousness) and Prakriti (matter). Vedanta asserts that there is ultimately only one reality (Brahman), and everything else is either an expression or an illusion of that singular source."
    },
    {
      question: "Is Yoga a religion or a philosophy?",
      answer: "Yoga is one of the six classical Darshanas (philosophical schools) of India, systematized by Patanjali. While it is deeply spiritual, it operates as a practical, experiential science of the mind rather than a belief-based religion. Its primary goal is Chitta Vritti Nirodha (stilling the fluctuations of the mind)."
    },
    {
      question: "What does 'Orthodox' (Astika) mean in Indian philosophy?",
      answer: "In the context of ancient Indian philosophy, 'Astika' simply means a school that accepts the epistemic authority of the Vedas as a valid source of knowledge. 'Nastika' schools (like Buddhism, Jainism, and Charvaka materialism) rejected Vedic authority, though they often shared similar goals like liberation (Moksha)."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-background">
      <ContentPageTracker slug="philosophies" pillar="philosophies" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                The Six Darshanas — Schools of Indian Philosophy
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                The Sanskrit word for philosophy is <strong>Darshana</strong>, which means "vision" or "a way of seeing."
                Unlike Western philosophy, which historically prioritized intellectual consistency, Indian philosophy has always been soteriological—its ultimate goal is <strong>Moksha (liberation)</strong> from human suffering.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                The <strong>Six Orthodox Schools (Shad Darshanas)</strong>—Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta—form the intellectual bedrock of Sanatan Dharma. Though they differ radically in their metaphysics, ranging from strict dualism to absolute monism, they all accept the foundational authority of the Vedas and offer a rigorous, tested pathway to self-realization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {philosophies.map((philosophy) => {
                const IconComponent = iconMap[philosophy.icon] || Infinity;
                return (
                  <Card
                    key={philosophy.slug}
                    className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-lg"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                        {philosophy.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">
                        {philosophy.summary}
                      </p>
                      <div className="bg-muted/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                          Key Question
                        </p>
                        <p className="text-sm font-medium text-foreground italic">
                          "{philosophy.keyQuestion}"
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 pb-6 pt-0">
                      <TrackedLink
                        href={`/philosophies/${philosophy.slug}`}
                        eventLabel={`philosophies_index:${philosophy.slug}`}
                        trackPathName={philosophy.slug}
                        className="w-full"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-between hover:text-primary"
                        >
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </TrackedLink>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            <div className="mt-24 pt-16 border-t border-border">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    Comparative Perspectives
                  </h2>
                  <p className="text-muted-foreground">
                    Deep dives into how these schools of thought relate to each other and other traditions.
                  </p>
                </div>
                <TrackedLink
                  href="/compare"
                  eventLabel="philosophies:compare_index"
                  trackPathName="comparisons"
                >
                  <Button variant="outline" className="gap-2">
                    View all comparisons <ArrowRight className="w-4 h-4" />
                  </Button>
                </TrackedLink>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comparisons
                  .filter((c) => c.category === "Philosophy vs Philosophy" || c.category === "Path vs Path")
                  .slice(0, 4)
                  .map((item) => (
                    <TrackedLink
                      key={item.slug}
                      href={`/compare/${item.slug}`}
                      eventLabel={`philosophies:comparison:${item.slug}`}
                      trackPathName={item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
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

            {/* SEo / FAQ Section */}
            <div className="mt-24 pt-16 border-t border-border">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Common questions regarding the fundamental schools of Indian philosophy.
                </p>
              </div>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
