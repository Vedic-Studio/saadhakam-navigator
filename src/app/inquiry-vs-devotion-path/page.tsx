import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
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
            <ContentPageTracker slug="inquiry-vs-devotion-path" pillar="seo-chooser" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <Header />
            <main className="flex-grow pt-28 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <header className="text-center mb-16">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Inquiry vs <span className="text-orange-500">Devotion</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Two of the most powerful entry points in Sanatan Dharma. One starts
                            with radical clarity of mind; the other with total openness of heart.
                            Understanding which one fits your current temperament is the first real step on the path.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <article className="rounded-2xl border border-border/60 bg-card p-10 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <Brain className="w-10 h-10 text-orange-500" />
                                <h2 className="text-3xl font-display font-bold">Path of Inquiry</h2>
                            </div>
                            <div className="space-y-4 mb-8 flex-grow">
                                <p className="text-lg leading-relaxed text-foreground">
                                    The Path of Inquiry (Jnana Yoga) is built on the foundation of <strong>Viveka</strong>—the sharp discrimination between the eternal and the transient. It is the architect's path to truth.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Best for analytical seekers who naturally ask "Who am I?" and refuse to accept answers on faith alone. This path prioritizes direct investigation into the nature of consciousness through self-inquiry (Atma-Vichara), study of foundational texts like the Brahma Sutras, and the cultivation of deep, contemplative silence.
                                </p>
                            </div>
                            <ul className="space-y-3 text-sm text-muted-foreground mb-8 bg-muted/30 p-6 rounded-xl border border-border/40">
                                <li className="flex gap-2"><strong>Strength:</strong> <span>Intellectual clarity and rapid deconstruction of ego-illusions.</span></li>
                                <li className="flex gap-2"><strong>Practice:</strong> <span>Self-inquiry, Upanishadic study, and meditation on the Void.</span></li>
                                <li className="flex gap-2"><strong>Pitfall:</strong> <span>"Dry intellect"—becoming a scholar of the path without walking it.</span></li>
                            </ul>
                            <TrackedLink
                                href="/what-is-vedanta"
                                eventLabel="inquiry_vs_devotion:inquiry:/what-is-vedanta"
                                trackPathName="inquiry"
                                className="mt-auto inline-flex items-center text-orange-400 font-bold hover:text-orange-300 transition-colors"
                            >
                                Master the Path of Inquiry <ArrowRight className="ml-2 w-5 h-5" />
                            </TrackedLink>
                        </article>

                        <article className="rounded-2xl border border-border/60 bg-card p-10 flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <Heart className="w-10 h-10 text-orange-500" />
                                <h2 className="text-3xl font-display font-bold">Path of Devotion</h2>
                            </div>
                            <div className="space-y-4 mb-8 flex-grow">
                                <p className="text-lg leading-relaxed text-foreground">
                                    The Path of Devotion (Bhakti Yoga) is the art of <strong>Prapatti</strong>—total surrender. It transforms human emotion into a direct vehicle for transcendence.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Best for relational seekers who feel a natural pull toward a personal relationship with the Divine. It is the most accessible path for the modern era, focusing on the heart's yearning rather than intellectual gymnastics. Primary practices include Japa (mantra repetition), Kirtan (devotional song), and the study of the Srimad Bhagavatam.
                                </p>
                            </div>
                            <ul className="space-y-3 text-sm text-muted-foreground mb-8 bg-muted/30 p-6 rounded-xl border border-border/40">
                                <li className="flex gap-2"><strong>Strength:</strong> <span>Emotional depth and the ability to find the Divine in all relations.</span></li>
                                <li className="flex gap-2"><strong>Practice:</strong> <span>Mantra, ritual worship (Puja), and selfless service (Seva).</span></li>
                                <li className="flex gap-2"><strong>Pitfall:</strong> <span>Emotional volatility—getting lost in the highs and lows of feeling.</span></li>
                            </ul>
                            <TrackedLink
                                href="/shaivism-vs-vaishnavism"
                                eventLabel="inquiry_vs_devotion:devotion:/shaivism-vs-vaishnavism"
                                trackPathName="devotion"
                                className="mt-auto inline-flex items-center text-orange-400 font-bold hover:text-orange-300 transition-colors"
                            >
                                Master the Path of Devotion <ArrowRight className="ml-2 w-5 h-5" />
                            </TrackedLink>
                        </article>
                    </div>

                    <section className="mb-16 prose prose-invert max-w-none border-t border-border/40 pt-16">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-display text-4xl font-bold mb-8 text-center">The Tension: Head vs Heart</h2>
                            <p className="text-xl leading-relaxed mb-6">
                                Modern seekers often feel they must choose: be a cold intellectual or a blind believer. Sanatan Dharma rejects this false dichotomy.
                                While one path may dominate your current temperament, they are ultimately two wings of the same bird.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Inquiry without devotion leads to intellectual arrogance—a map-reader who never visits the ocean.
                                Devotion without inquiry leads to sentimentalism—a lover who doesn't know who they are loving.
                                True spiritual maturity is the "Inquiry of the Heart" and the "Devotion of the Intellect."
                            </p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-orange-900/40 bg-gradient-to-br from-orange-950/20 to-background p-12 text-center shadow-2xl overflow-hidden relative">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-display font-bold mb-4">Unsure where to begin?</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                                Our <strong>Faith Finder</strong> assessment is designed to map your unique psychological profile to the most effective spiritual traditions and practices.
                                Don't guess. Discover what was built for your nature.
                            </p>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="inquiry_vs_devotion:cta:faith-finder"
                                trackPathName="seo-chooser"
                                className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-8 py-4 text-white font-bold text-lg shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95"
                            >
                                Take the Faith Finder <ArrowRight className="ml-2 w-5 h-5" />
                            </TrackedLink>
                        </div>
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
