import type { Metadata } from "next";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { Telescope, Star, Compass, Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Yoga vs. Vedanta: What's the Real Difference?",
    description: "Explore the relationship between Yoga and Vedanta. Learn how Yoga provides the practice and Vedanta provides the vision for spiritual liberation.",
    alternates: {
        canonical: "https://www.opensadhaka.com/difference-between-yoga-and-vedanta",
    },
    openGraph: {
        title: "Yoga vs. Vedanta: Practice vs. Vision",
        description: "Understanding the 'Telescope and the Stars' analogy of Indian philosophy.",
        url: "https://www.opensadhaka.com/difference-between-yoga-and-vedanta",
        type: "article",
    },
};

export default function YogaVsVedantaPage() {
    const schemas = {
        article: buildArticleSchema({
            headline: "Yoga vs. Vedanta: What's the Real Difference?",
            description: "Explore the relationship between Yoga and Vedanta. Learn how Yoga provides the practice and Vedanta provides the vision for spiritual liberation.",
            url: "https://www.opensadhaka.com/difference-between-yoga-and-vedanta",
            datePublished: "2026-03-20",
            section: "Ancient Wisdom",
        }),
        breadcrumb: buildBreadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Ancient Wisdom", href: "/ancient-wisdom-philosophies" },
            { label: "Yoga vs. Vedanta: What's the Real Difference?", href: "/difference-between-yoga-and-vedanta" },
        ]),
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="difference-between-yoga-and-vedanta" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Ancient Wisdom", href: "/ancient-wisdom-philosophies" },
                            { label: "Yoga vs Vedanta", href: "/difference-between-yoga-and-vedanta" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Practice <span className="text-blue-500 italic">&</span> Vision.
                        </h1>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-blue-500/30 pl-8 py-2">
                            Yoga is the method; Vedanta is the discovery. One prepares the instrument; the other reveals the Truth.
                        </p>
                    </header>

                    <section className="mb-20">
                        <div className="bg-muted/30 border border-border/50 rounded-3xl p-10 md:p-16">
                            <h2 className="text-3xl font-display font-bold mb-10 text-center">The Telescope and the Stars</h2>
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div className="space-y-6">
                                    <div className="p-6 bg-background rounded-2xl border border-border/20">
                                        <Telescope className="text-blue-500 mb-4 w-10 h-10" />
                                        <h3 className="text-xl font-bold mb-2">Yoga (The Instrument)</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Yoga is primarily <strong>Sadhana</strong> (practice). It focuses on the purification of the body, the regulation of energy (Prana), and the stillness of the mind. Its goal is to make the mind a perfectly clear, steady lens.
                                        </p>
                                    </div>
                                    <div className="p-6 bg-background rounded-2xl border border-border/20">
                                        <Star className="text-orange-500 mb-4 w-10 h-10" />
                                        <h3 className="text-xl font-bold mb-2">Vedanta (The Vision)</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Vedanta is <strong>Jnana</strong> (knowledge). It answers the questions: "Who am I?" and "What is real?" Once the mind is steady, Vedanta provides the vision to see that you were never the separate self you thought you were.
                                        </p>
                                    </div>
                                </div>
                                <div className="prose prose-lg dark:prose-invert">
                                    <p className="text-xl leading-relaxed italic text-muted-foreground">
                                        "If you have a dirty telescope, you can't see the stars. Yoga cleans the lens. But if you have a clean lens and never look at the stars, the telescope is useless. Vedanta is the act of looking."
                                    </p>
                                    <p className="text-muted-foreground">
                                        This synergy is why the two are almost always practiced together. Yoga provides the <strong>fit mind</strong> (Adhikari), and Vedanta provides the <strong>Self-knowledge</strong> (Atma-Jnana).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-bold mb-12">Core Distinctions</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-3xl border border-border/40 hover:bg-muted/10 transition-colors">
                                <Compass className="text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-foreground">Metaphysical Base</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Classical Yoga is based on <strong>Samkhya</strong> (Dualism). It sees a permanent separation between Consciousness (Purusha) and Matter (Prakriti). Vedanta is typically <strong>Non-Dual</strong> (Advaita), seeing only one reality.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl border border-border/40 hover:bg-muted/10 transition-colors">
                                <Shield className="text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-foreground">The Definition of Goal</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    The goal of Yoga is <strong>Kaivalya</strong> (Isolation)—separating consciousness from the clutter of nature. The goal of Vedanta is <strong>Moksha</strong> (Liberation)—the realization that you ARE the totality.
                                </p>
                            </div>
                            <div className="p-8 rounded-3xl border border-border/40 hover:bg-muted/10 transition-colors">
                                <Users className="text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-foreground">Primary Method</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Yoga's method is <strong>Nirodha</strong> (Cessation)—stopping the fluctuations of the mind. Vedanta's method is <strong>Vichara</strong> (Inquiry)—investigating the "I" until its false nature disappears.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-border/40 rounded-3xl overflow-hidden">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="p-6 font-bold text-foreground">Feature</th>
                                        <th className="p-6 font-bold text-blue-500 italic">Yoga</th>
                                        <th className="p-6 font-bold text-orange-500 italic">Vedanta</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">Focus</td>
                                        <td className="p-6 text-muted-foreground">The Mind-Body Complex</td>
                                        <td className="p-6 text-muted-foreground">The Absolute Reality</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">Problem</td>
                                        <td className="p-6 text-muted-foreground">Agitation (Chitta Vritti)</td>
                                        <td className="p-6 text-muted-foreground">Ignorance (Avidya)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">Solution</td>
                                        <td className="p-6 text-muted-foreground">Concentration & Stillness</td>
                                        <td className="p-6 text-muted-foreground">Correct Understanding</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">Nature</td>
                                        <td className="p-6 text-muted-foreground">Experimental / Practical</td>
                                        <td className="p-6 text-muted-foreground">Analytical / Cognitive</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="rounded-3xl bg-blue-600 p-12 text-center text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <Telescope size={400} className="rotate-45 -translate-x-32" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display font-black mb-6 relative z-10">Integrate Your Path.</h2>
                        <p className="text-xl text-blue-50 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
                            Don't choose between practice and vision. Use Yoga to quiet the noise, and Vedanta to hear the Truth.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <TrackedLink
                                href="/yoga-sutras-complete-guide"
                                eventLabel="yoga_vedanta:footer:yoga"
                                trackPathName="yoga-sutras"
                                className="px-10 py-5 bg-white text-blue-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Deepen Your Yoga
                            </TrackedLink>
                            <TrackedLink
                                href="/what-is-vedanta"
                                eventLabel="yoga_vedanta:footer:vedanta"
                                trackPathName="vedanta"
                                className="px-10 py-5 bg-blue-700 text-white border border-blue-400/30 font-bold rounded-2xl transition-all hover:bg-blue-800"
                            >
                                Explore Vedanta
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

import { Users } from "lucide-react";
