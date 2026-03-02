import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { philosophies } from "@/data/philosophies";
import { comparisons } from "@/data/comparisons";
import {
  ArrowRight,
  Infinity,
  Eye,
  Heart,
  Crown,
  Layers,
  Focus,
  Flame,
  Scale,
} from "lucide-react";


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
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                The Six Darshanas — Schools of Indian Philosophy
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The six orthodox schools (darshanas) and their offshoots form
                the philosophical foundation. Each offers a unique lens for
                understanding reality, self, and liberation.
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
                      <Link
                        href={`/philosophies/${philosophy.slug}`}
                        className="w-full"
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-between hover:text-primary"
                        >
                          Read more
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
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
                <Link href="/compare">
                  <Button variant="outline" className="gap-2">
                    View all comparisons <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comparisons
                  .filter((c) => c.category === "Philosophy vs Philosophy" || c.category === "Path vs Path")
                  .slice(0, 4)
                  .map((item) => (
                    <Link key={item.slug} href={`/compare/${item.slug}`}>
                      <div className="p-4 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all group h-full">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider mb-2 opacity-70 group-hover:opacity-100">
                          {item.category}
                        </Badge>
                        <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
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
