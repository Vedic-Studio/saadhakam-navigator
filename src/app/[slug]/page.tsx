import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getConceptBySlug, getAllConcepts } from "@/data/concepts";
import {
    ArrowRight,
    BookOpen,
    Lightbulb,
    Target,
    BookMarked,
    Share2,
} from "lucide-react";

export async function generateStaticParams() {
    const concepts = getAllConcepts();
    const params: { slug: string }[] = [];

    concepts.forEach((concept) => {
        params.push({ slug: `what-is-${concept.slug}` });
        params.push({ slug: `${concept.slug}-meaning` });
    });

    return params;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    let conceptSlug = "";
    let pageType: "what-is" | "meaning" | null = null;

    if (slug.startsWith("what-is-")) {
        conceptSlug = slug.replace("what-is-", "");
        pageType = "what-is";
    } else if (slug.endsWith("-meaning")) {
        conceptSlug = slug.replace("-meaning", "");
        pageType = "meaning";
    }

    if (!pageType || !conceptSlug) return {};

    const concept = getConceptBySlug(conceptSlug);
    if (!concept) return {};

    const isWhatIs = pageType === "what-is";
    const title = isWhatIs
        ? `What is ${concept.sanskritWord.split(" ")[0]}? | Meaning, Principles & Usage`
        : `${concept.sanskritWord.split(" ")[0]} Meaning: Deep Dive into ${concept.englishTranslation}`;

    const description = isWhatIs
        ? `Discover what ${concept.sanskritWord.split(" ")[0]} truly means in Sanatan Dharma. Read about its key principles, historical context, and practical applications.`
        : `Explore the profound meaning of ${concept.sanskritWord.split(" ")[0]} (${concept.englishTranslation}). Understand its origins, definition, and role in philosophy.`;

    return {
        title,
        description,
        keywords: [
            conceptSlug,
            concept.sanskritWord.split(" ")[0].toLowerCase(),
            "meaning",
            "definition",
            "sanatan dharma",
            "hindu philosophy",
            "sanskrit words",
            ...concept.tags,
        ],
        alternates: {
            canonical: `https://opensadhaka.com/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://opensadhaka.com/${slug}`,
        },
    };
}

export default async function PseoConceptPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let conceptSlug = "";
    let pageType: "what-is" | "meaning" | null = null;

    if (slug.startsWith("what-is-")) {
        conceptSlug = slug.replace("what-is-", "");
        pageType = "what-is";
    } else if (slug.endsWith("-meaning")) {
        conceptSlug = slug.replace("-meaning", "");
        pageType = "meaning";
    }

    if (!pageType || !conceptSlug) notFound();

    const concept = getConceptBySlug(conceptSlug);
    if (!concept) notFound();

    const isWhatIs = pageType === "what-is";
    const sanskritOnly = concept.sanskritWord.split(" ")[0]; // Just the Sanskrit string if "कर्म (Karma)"

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://opensadhaka.com",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Concepts",
                item: "https://opensadhaka.com/learn",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: isWhatIs ? `What is ${sanskritOnly}` : `${sanskritOnly} Meaning`,
                item: `https://opensadhaka.com/${slug}`,
            },
        ],
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: `What is the short definition of ${sanskritOnly}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: concept.shortDefinition,
                },
            },
            {
                "@type": "Question",
                name: `What is the English translation of ${sanskritOnly}?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: concept.englishTranslation,
                },
            },
            {
                "@type": "Question",
                name: `How does ${sanskritOnly} apply practically?`,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: concept.practicalApplication,
                },
            },
        ],
    };

    return (
        <div className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <main className="pt-20">
                {/* Hero Section */}
                <section className="bg-muted/30 py-16 px-4 sm:px-6 lg:px-8 border-b">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-4 text-sm text-primary font-medium uppercase tracking-wider">
                            Sanskrit & Philosophy Explorer
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                            {isWhatIs ? `What is ${sanskritOnly}?` : `${sanskritOnly} Meaning`}
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary font-medium mb-4">
                            {concept.sanskritWord} — {concept.englishTranslation}
                        </p>
                        <p className="text-lg text-muted-foreground mx-auto max-w-2xl">
                            {concept.shortDefinition}
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-12 px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Deep Dive Definition */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <h2 className="flex items-center gap-3 text-3xl font-display text-foreground font-bold mb-6">
                                <BookOpen className="text-primary w-8 h-8" />
                                {isWhatIs ? "Understanding It Deeply" : "Origin and Context"}
                            </h2>
                            <p className="leading-relaxed text-muted-foreground">
                                {concept.longDescription}
                            </p>
                            <p className="leading-relaxed text-muted-foreground mt-4">
                                {concept.roleInPhilosophy}
                            </p>
                        </div>

                        {/* Two Column Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Lightbulb className="w-6 h-6 text-secondary" />
                                        <h3 className="font-display text-2xl font-semibold text-foreground">
                                            Core Principles
                                        </h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {concept.keyPrinciples.map((principle, index) => (
                                            <li key={index} className="flex gap-4 items-start">
                                                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                                                    {index + 1}
                                                </span>
                                                <span className="text-muted-foreground leading-snug">
                                                    {principle}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Target className="w-6 h-6 text-secondary" />
                                        <h3 className="font-display text-2xl font-semibold text-foreground">
                                            Practical Application
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {concept.practicalApplication}
                                    </p>

                                    <div className="mt-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <BookMarked className="w-5 h-5 text-secondary" />
                                            <h4 className="font-sans font-semibold text-foreground">
                                                Found In Texts
                                            </h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {concept.sourceTexts.map((text) => (
                                                <span
                                                    key={text}
                                                    className="px-3 py-1.5 bg-muted rounded-md text-sm text-foreground font-medium"
                                                >
                                                    {text}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Internal Linking & Next Steps */}
                        <div className="pt-8 border-t border-border/50">
                            <h3 className="text-2xl font-bold font-display text-foreground mb-6">
                                Keep Exploring
                            </h3>
                            <div className="flex flex-wrap gap-4 mb-8">
                                {concept.relatedConcepts.map((relatedConcept) => (
                                    <Link
                                        key={relatedConcept}
                                        href={`/what-is-${relatedConcept}`}
                                        className="inline-flex items-center gap-2 group"
                                    >
                                        <span className="px-5 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors text-foreground font-medium shadow-sm flex items-center gap-2">
                                            <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                            What is {relatedConcept}?
                                        </span>
                                    </Link>
                                ))}
                            </div>

                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div>
                                        <h4 className="text-xl font-bold font-display text-foreground mb-2">
                                            Discover Your Spiritual Path
                                        </h4>
                                        <p className="text-muted-foreground">
                                            Take our 2-minute Faith Finder assessment to find which philosophies and practices align with you.
                                        </p>
                                    </div>
                                    <Link href="/faith-finder" className="shrink-0">
                                        <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
                                            Take Assessment <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
