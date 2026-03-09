import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Brain, Heart } from "lucide-react";

export const metadata: Metadata = {
    title: "Inquiry vs Devotion Path: Which One Fits You? | Sadhaka",
    description:
        "Compare the Inquiry and Devotion spiritual paths in Sanatan Dharma. Learn how each works and choose the right starting point for your temperament.",
    alternates: {
        canonical: "https://opensadhaka.com/inquiry-vs-devotion-path",
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is the Inquiry path in spirituality?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The Inquiry path is centered on self-knowledge through contemplation and direct investigation of consciousness. It is strongly associated with Jnana Yoga and Vedanta.",
            },
        },
        {
            "@type": "Question",
            name: "What is the Devotion path in spirituality?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The Devotion path is centered on love, surrender, and relationship with the Divine through prayer, mantra, and bhakti practices.",
            },
        },
        {
            "@type": "Question",
            name: "Can I combine Inquiry and Devotion?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Many practitioners begin with one dominant path and then integrate the other. Inquiry gives clarity; devotion gives emotional depth and surrender.",
            },
        },
    ],
};

export default function InquiryVsDevotionPathPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <main className="flex-grow pt-28 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <header className="text-center mb-14">
                        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                            Inquiry vs <span className="text-orange-500">Devotion</span> Path
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Two of the most powerful entry points in Sanatan Dharma. One starts
                            with clarity of mind. The other starts with openness of heart.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-7 mb-12">
                        <article className="rounded-2xl border border-border/60 bg-card p-8">
                            <Brain className="w-8 h-8 text-orange-500 mb-4" />
                            <h2 className="text-2xl font-semibold mb-3">Path of Inquiry (Jnana)</h2>
                            <p className="text-muted-foreground leading-relaxed mb-5">
                                Best for analytical seekers who ask: “Who am I?” and “What is real?”
                                Practices include self-inquiry, scripture study, and contemplative silence.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
                                <li>Primary strength: discrimination and clarity</li>
                                <li>Core practices: self-inquiry, contemplation, Vedanta study</li>
                                <li>Common challenge: staying in the head without embodied integration</li>
                            </ul>
                            <Link href="/what-is-vedanta" className="inline-flex items-center text-orange-400 font-semibold">
                                Explore Inquiry path <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </article>

                        <article className="rounded-2xl border border-border/60 bg-card p-8">
                            <Heart className="w-8 h-8 text-orange-500 mb-4" />
                            <h2 className="text-2xl font-semibold mb-3">Path of Devotion (Bhakti)</h2>
                            <p className="text-muted-foreground leading-relaxed mb-5">
                                Best for relational seekers who feel drawn to mantra, prayer, and
                                loving surrender to the Divine in personal form.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5 mb-6">
                                <li>Primary strength: emotional depth and surrender</li>
                                <li>Core practices: japa, kirtan, puja, devotional reading</li>
                                <li>Common challenge: emotional fluctuation and inconsistency</li>
                            </ul>
                            <Link href="/shaivism-vs-vaishnavism" className="inline-flex items-center text-orange-400 font-semibold">
                                Explore Devotion path <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </article>
                    </div>

                    <section className="rounded-2xl border border-orange-900/40 bg-orange-950/20 p-8 text-center">
                        <h2 className="text-3xl font-display font-bold mb-3">Still unsure which one is yours?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                            Take the Faith Finder and get a clear primary path, plus traditions and
                            practices you can start this week.
                        </p>
                        <Link
                            href="/faith-finder"
                            className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold"
                        >
                            Find My Path <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
