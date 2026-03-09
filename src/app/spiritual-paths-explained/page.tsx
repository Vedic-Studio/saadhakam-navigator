import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Compass, Heart, Brain, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Spiritual Paths Explained: A Beginner-Friendly Guide | Sadhaka",
    description:
        "Understand the major spiritual paths in Sanatan Dharma—Inquiry, Devotion, Ritual, and Discipline—and discover which one matches your temperament.",
    alternates: {
        canonical: "https://opensadhaka.com/spiritual-paths-explained",
    },
};

const paths = [
    {
        title: "Path of Inquiry",
        icon: Brain,
        description:
            "For seekers who ask deep questions about self, reality, and consciousness. Rooted in Vedanta and direct self-inquiry.",
        href: "/what-is-vedanta",
    },
    {
        title: "Path of Devotion",
        icon: Heart,
        description:
            "For seekers drawn to love, surrender, and relationship with the Divine through mantra, prayer, and bhakti.",
        href: "/shaivism-vs-vaishnavism",
    },
    {
        title: "Path of Ritual",
        icon: Sparkles,
        description:
            "For seekers who connect through sacred structure, daily observances, offerings, and symbolic embodied practice.",
        href: "/spiritual-traditions-paths",
    },
    {
        title: "Path of Discipline",
        icon: Compass,
        description:
            "For seekers who progress through methodical training of body, breath, and mind in structured stages.",
        href: "/yoga-sutras-complete-guide",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "How do I know which spiritual path is right for me?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The right path usually matches your natural temperament: analytical minds lean toward inquiry, emotional hearts toward devotion, structure-loving minds toward ritual, and process-oriented minds toward discipline.",
            },
        },
        {
            "@type": "Question",
            name: "Can I follow more than one spiritual path?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Most mature practitioners integrate multiple paths over time. It helps to choose one primary path first, then add supporting practices from others.",
            },
        },
        {
            "@type": "Question",
            name: "What is the best spiritual path for beginners?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The best beginner path is the one you can practice consistently. Start with one daily practice for 10–20 minutes and build depth gradually.",
            },
        },
    ],
};

export default function SpiritualPathsExplainedPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <main className="flex-grow pt-28 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <header className="text-center mb-16">
                        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            Spiritual Paths <span className="text-orange-500">Explained</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Not everyone starts spirituality in the same way. This guide helps you
                            understand the four primary entry paths and choose one that fits how
                            you naturally think, feel, and act.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-7 mb-14">
                        {paths.map((path) => (
                            <article
                                key={path.title}
                                className="rounded-2xl border border-border/60 bg-card p-7 hover:border-orange-500/40 transition-colors"
                            >
                                <path.icon className="w-8 h-8 text-orange-500 mb-4" />
                                <h2 className="text-2xl font-semibold mb-3">{path.title}</h2>
                                <p className="text-muted-foreground mb-6 leading-relaxed">{path.description}</p>
                                <Link
                                    href={path.href}
                                    className="inline-flex items-center text-orange-400 font-semibold hover:text-orange-300"
                                >
                                    Explore this path <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </article>
                        ))}
                    </div>

                    <section className="rounded-2xl border border-orange-900/40 bg-orange-950/20 p-8 text-center">
                        <h2 className="text-3xl font-display font-bold mb-3">Want a personalized answer?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                            Take the Faith Finder Quiz to discover your dominant spiritual path,
                            recommended traditions, and practices to start right now.
                        </p>
                        <Link
                            href="/faith-finder"
                            className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold"
                        >
                            Take the Faith Finder <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
