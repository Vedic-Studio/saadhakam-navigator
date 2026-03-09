import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Scroll, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { texts } from "@/data/texts";
import { comparisons } from "@/data/comparisons";

export const metadata: Metadata = {
  title:
    "Sacred Hindu Texts | Vedas, Upanishads, Bhagavad Gita | Complete Guide",
  description:
    "Explore Vedas, Upanishads, Bhagavad Gita, Puranas, and Agamas. Complete Sanskrit texts with translations, commentaries, and word-by-word breakdown.",
  keywords: [
    "vedas",
    "upanishads",
    "bhagavad gita",
    "sacred texts",
    "puranas",
    "agamas",
    "sanskrit texts",
  ],
  alternates: { canonical: "https://opensadhaka.com/texts" },
  openGraph: {
    title: "Sacred Hindu Texts | Sadhaka",
    description:
      "Explore Vedas, Upanishads, Bhagavad Gita, and more sacred texts with translations.",
    url: "https://opensadhaka.com/texts",
  },
};

export default function TextsPage() {
  const faqs = [
    {
      question: "What is the difference between Shruti and Smriti texts?",
      answer: "Shruti means 'that which is heard.' It refers to the Vedas and Upanishads, which are considered eternal truths directly revealed to ancient seers (Rishis). Smriti means 'that which is remembered.' It includes texts like the Bhagavad Gita, the Epics (Ramayana and Mahabharata), and the Puranas, which are of human authorship and designed to explain Shruti concepts to the masses."
    },
    {
      question: "Which Hindu text should a beginner read first?",
      answer: "The Bhagavad Gita is universally recommended as the starting point. It synthesizes the profound philosophy of the Upanishads into a practical, 700-verse dialogue about duty, action, and devotion, making it highly accessible for modern readers."
    },
    {
      question: "Are the Upanishads part of the Vedas?",
      answer: "Yes. The Upanishads form the final section of the Vedas, known as Vedanta (the end of the Veda). While the early parts of the Vedas focus on rituals and hymns (Karma Kanda), the Upanishads focus entirely on philosophical inquiry and self-knowledge (Jnana Kanda)."
    },
    {
      question: "How many Puranas are there?",
      answer: "There are 18 Maha Puranas (Major Puranas) and 18 Upa Puranas (Minor Puranas). They are vast encylopedic texts containing mythology, cosmology, genealogies of gods and kings, and detailed geographical info, with the Srimad Bhagavatam being the most famous."
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
      <ContentPageTracker slug="texts" pillar="sacred-texts" />
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
                Navigate the Ocean of Wisdom — Sacred Texts
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                The library of Sanatan Dharma is vast, categorized fundamentally into two branches: <strong>Shruti</strong> (revelation) and <strong>Smriti</strong> (tradition). Unlike Western religions centered around a single historical book, the Dharmic tradition relies on an interconnected ecosystem of texts mapping out philosophy, ritual, psychology, and devotion.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                From the rigorous metaphysical inquiry of the <strong>Upanishads</strong> to the battlefield pragmatism of the <strong>Bhagavad Gita</strong>, each text serves a different spiritual temperament. Explore the foundational scriptures below to find the entry point that resonates with your path.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {texts.map((text) => (
                <Card
                  key={text.slug}
                  className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        {text.spotlight && (
                          <div className="flex items-center gap-1 text-xs text-amber-400 font-medium mb-2 uppercase tracking-wider">
                            <Star className="w-3 h-3" /> Essential Reading
                          </div>
                        )}
                        <div className="font-sanskrit text-primary text-lg mb-1">
                          {text.sanskritTitle}
                        </div>
                        <h2 className="font-display text-xl font-semibold text-foreground">
                          {text.title}
                        </h2>
                      </div>
                      <BookOpen className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    </div>
                    <p className="text-muted-foreground mb-4">{text.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {text.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <TrackedLink
                      href={`/texts/${text.slug}`}
                      eventLabel={`texts_index:${text.slug}`}
                      trackPathName={text.slug}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:text-primary"
                      >
                        Explore Text <ArrowRight className="w-4 h-4" />
                      </Button>
                    </TrackedLink>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-24 pt-16 border-t border-border">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    Compare Sacred Texts
                  </h2>
                  <p className="text-muted-foreground">
                    Deep dives into the philosophical connections and differences between key scriptures.
                  </p>
                </div>
                <TrackedLink
                  href="/compare"
                  eventLabel="texts:compare_index"
                  trackPathName="comparisons"
                >
                  <Button variant="outline" className="gap-2">
                    View all comparisons <ArrowRight className="w-4 h-4" />
                  </Button>
                </TrackedLink>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comparisons
                  .filter((c) => c.category === "Text vs Text")
                  .slice(0, 4)
                  .map((item) => (
                    <TrackedLink
                      key={item.slug}
                      href={`/compare/${item.slug}`}
                      eventLabel={`texts:comparison:${item.slug}`}
                      trackPathName="text-vs-text"
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
                  Common questions regarding the structure and origins of Sanatan Dharma texts.
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
