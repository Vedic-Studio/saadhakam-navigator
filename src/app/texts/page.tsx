import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { texts } from "@/data/texts";
import { ArrowRight, BookOpen, Scroll, Star } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Navigate the Ocean of Wisdom — Sacred Texts
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The Vedas, Upanishads, and Gita form the eternal foundation of
                Sanatan Dharma. Each text is a doorway to a different facet of
                the infinite.
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
                    <Link href={`/texts/${text.slug}`} className="w-full">
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:text-primary"
                      >
                        Explore Text <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
