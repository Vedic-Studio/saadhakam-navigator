import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { greats } from "@/data/greats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Spiritual Masters & Gurus | Saints of Sanatan Dharma",
    description:
        "Explore the greatest spiritual masters, saints, and philosophers of Sanatan Dharma. Learn from Adi Shankaracharya, Swami Vivekananda, Sri Aurobindo, and more.",
    keywords: ["spiritual masters", "gurus", "saints", "shankaracharya", "vivekananda", "sanatan dharma"],
    alternates: { canonical: "https://opensadhaka.com/greats" },
    openGraph: {
        title: "Spiritual Masters of Sanatan Dharma | Sadhaka",
        description: "Explore the greatest saints, philosophers, and gurus of Sanatan Dharma.",
        url: "https://opensadhaka.com/greats",
    },
};

export default function GreatsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-20">
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                                Spiritual Masters of Sanatan Dharma
                            </h1>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                From Adi Shankaracharya's non-dual genius to Vivekananda's
                                practical Vedanta — learn from the teachers who shaped the tradition.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {greats.map((great) => (
                                <Card key={great.slug} className="bg-card border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/10 hover:shadow-lg">
                                    <CardContent className="p-6">
                                        <div className="text-xs text-primary uppercase tracking-wider font-medium mb-2">{great.era}</div>
                                        <h2 className="font-display text-xl font-semibold text-foreground mb-1">{great.name}</h2>
                                        <p className="text-sm text-muted-foreground font-medium mb-3">{great.title}</p>
                                        <p className="text-muted-foreground text-sm">{great.summary}</p>
                                    </CardContent>
                                    <CardFooter className="px-6 pb-6 pt-0">
                                        <Link href={`/greats/${great.slug}`} className="w-full">
                                            <Button variant="ghost" className="w-full justify-between hover:text-primary">
                                                Learn More <ArrowRight className="w-4 h-4" />
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
