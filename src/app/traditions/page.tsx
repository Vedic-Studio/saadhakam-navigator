import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Badge } from "@/components/ui/badge";
import { traditions } from "@/data/traditions";
import { comparisons } from "@/data/comparisons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Spiritual Traditions & Lineages of Sanatan Dharma",
  description:
    "Explore the major spiritual traditions and sampradayas of Sanatan Dharma—Shaivism, Vaishnavism, Shaktism, and more. Find your path.",
  keywords: [
    "spiritual traditions",
    "sampradaya",
    "shaivism",
    "vaishnavism",
    "shaktism",
    "sanatan dharma",
  ],
  alternates: { canonical: "https://opensadhaka.com/traditions" },
  openGraph: {
    title: "Spiritual Traditions of Sanatan Dharma | Sadhaka",
    description:
      "Explore Shaivism, Vaishnavism, Shaktism, and other sacred lineages.",
    url: "https://opensadhaka.com/traditions",
  },
};

export default function TraditionsPage() {
  const faqs = [
    {
      question: "What is a Sampradaya?",
      answer: "A Sampradaya is a traditional lineage of spiritual teaching in Sanatan Dharma. It involves a succession of masters and disciples (parampara) that preserves and transmits a specific theology, set of rituals, and interpretation of the scriptures."
    },
    {
      question: "What are the four main denominations of Hinduism?",
      answer: "The four largest denominations are Vaishnavism (worship of Vishnu/Krishna), Shaivism (worship of Shiva), Shaktism (worship of the Divine Mother/Devi), and Smartism (which treats five or six major deities as equal manifestations of the one Brahman)."
    },
    {
      question: "Can I follow multiple traditions?",
      answer: "Yes. Historically, the Smart tradition was founded by Adi Shankaracharya explicitly to synthesize the worship of multiple deities. Even outside of Smartism, many Hindus worship deities across sectarian lines, though they may have a primary 'Ishta Devata' (chosen deity)."
    },
    {
      question: "What is the difference between Shaivism and Vaishnavism?",
      answer: "Philosophically, many Shaiva schools lean toward non-dualism (Advaita), viewing liberation as the recognition of one's identity with Shiva. Many Vaishnava schools lean toward dualism (Dvaita) or qualified non-dualism, viewing liberation as the eternal, devoted relationship between the individual soul and Vishnu."
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
      <ContentPageTracker slug="traditions" pillar="traditions" />
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
                Spiritual Traditions — Paths to the Divine
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Philosophy in the East was never meant to remain purely academic. A philosophy must be lived, and a <strong>Sampradaya</strong> (tradition/lineage) is the living ecosystem that turns abstract truth into a walkable path. It provides the rituals, the mantras, the ethical boundaries, and the succession of realized teachers (Parampara).
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                While Western religions often split over theological disagreements into separate religions entirely, Sanatan Dharma expanded to contain its diversity. Explore the major spiritual rivers of India—from the devotional ecstasy of <strong>Vaishnavism</strong>, to the mystical depths of <strong>Shaivism</strong>, the fierce power of <strong>Shaktism</strong>, and the synthesizing logic of <strong>Smartism</strong>.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {traditions.map((tradition) => (
                <Card
                  key={tradition.slug}
                  className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                      {tradition.title}
                    </h2>
                    <p className="text-muted-foreground">{tradition.summary}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <TrackedLink
                      href={`/traditions/${tradition.slug}`}
                      eventLabel={`traditions_index:${tradition.slug}`}
                      trackPathName={tradition.slug}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:text-primary"
                      >
                        Explore <ArrowRight className="w-4 h-4" />
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
                    Compare Traditions
                  </h2>
                  <p className="text-muted-foreground">
                    Deep dives into the relationships between major spiritual paths and schools.
                  </p>
                </div>
                <TrackedLink
                  href="/compare"
                  eventLabel="traditions:compare_index"
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
                  .slice(4, 8)
                  .map((item) => (
                    <TrackedLink
                      key={item.slug}
                      href={`/compare/${item.slug}`}
                      eventLabel={`traditions:comparison:${item.slug}`}
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
                  Understanding the spiritual lineages and paths of India.
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
