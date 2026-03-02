import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { traditions } from "@/data/traditions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Spiritual Traditions — Paths to the Divine
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Sanatan Dharma encompasses diverse living traditions, each
                offering a complete path to liberation through its own
                practices, teachers, and sacred lineages.
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
                    <Link
                      href={`/traditions/${tradition.slug}`}
                      className="w-full"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between hover:text-primary"
                      >
                        Explore <ArrowRight className="w-4 h-4" />
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
