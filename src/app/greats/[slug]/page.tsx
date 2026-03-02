import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getGreatBySlug, greats } from "@/data/greats";
import { ArrowLeft, ArrowRight, BookOpen, Lightbulb, Library } from "lucide-react";

export async function generateStaticParams() {
    return greats.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const great = getGreatBySlug(slug);
    if (!great) return {};

    return {
        title: `${great.name} — Life, Teachings & Legacy`,
        description: `${great.summary} Learn about ${great.name}'s key teachings, philosophical contributions, and recommended works.`,
        keywords: [
            great.name.toLowerCase(),
            ...great.tags,
            "spiritual master",
            "sanatan dharma",
            "indian philosophy",
        ],
        alternates: {
            canonical: `https://opensadhaka.com/greats/${slug}`,
        },
        openGraph: {
            title: `${great.name} | Sadhaka`,
            description: great.summary,
            url: `https://opensadhaka.com/greats/${slug}`,
        },
    };
}

export default async function GreatDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const great = getGreatBySlug(slug);
    if (!great) notFound();

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://opensadhaka.com" },
            { "@type": "ListItem", position: 2, name: "Spiritual Masters", item: "https://opensadhaka.com/greats" },
            { "@type": "ListItem", position: 3, name: great.name, item: `https://opensadhaka.com/greats/${slug}` },
        ],
    };

    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: great.name,
        description: great.summary,
        jobTitle: great.title,
        knowsAbout: great.tags,
    };

    return (
        <div className="min-h-screen bg-background">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
            <Header />
            <main className="pt-20">
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <Link href="/greats" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-4 h-4" />Back to Spiritual Masters
                            </Link>
                        </nav>
                        <div className="mb-2 text-sm text-primary font-medium uppercase tracking-wider">{great.era}</div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">{great.name}</h1>
                        <p className="text-xl text-secondary font-medium mb-4">{great.title}</p>
                        <p className="text-lg text-muted-foreground mb-6">{great.summary}</p>
                        <div className="flex flex-wrap gap-2">
                            {great.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{tag}</span>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-8 px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-4xl mx-auto grid gap-8">
                        <Card className="bg-card border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <BookOpen className="w-5 h-5 text-secondary" />
                                    <h2 className="font-display text-xl font-semibold text-foreground">Biography</h2>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{great.description}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lightbulb className="w-5 h-5 text-secondary" />
                                    <h2 className="font-display text-xl font-semibold text-foreground">Key Teachings</h2>
                                </div>
                                <ul className="space-y-3">
                                    {great.keyTeachings.map((teaching, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-medium">{i + 1}</span>
                                            <span className="text-muted-foreground">{teaching}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border/50">
                            <CardContent className="p-6">
                                <h2 className="font-display text-xl font-semibold text-foreground mb-3">Relevance Today</h2>
                                <p className="text-muted-foreground leading-relaxed">{great.relevanceToday}</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-card border-border/50">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Library className="w-5 h-5 text-secondary" />
                                    <h2 className="font-display text-xl font-semibold text-foreground">Recommended Works</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {great.recommendedWorks.map((work) => (
                                        <span key={work} className="px-3 py-2 bg-muted rounded-lg text-sm text-foreground">{work}</span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/faith-finder" className="flex-1">
                                <Button size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                    Find Your Spiritual Path <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                            <Link href="/greats" className="flex-1">
                                <Button size="lg" variant="outline" className="w-full">Explore More Masters</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
