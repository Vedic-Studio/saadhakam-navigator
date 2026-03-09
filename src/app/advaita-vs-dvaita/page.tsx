import { ArticleLayout } from "@/components/ArticleLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { Sparkles, ArrowRight, Quote } from "lucide-react";

export const metadata: Metadata = {
    title: "Advaita vs Dvaita Vedanta: The Core Debate of Non-Duality | Sadhaka",
    description: "Explore the profound differences between Advaita (Non-Duality) and Dvaita (Dualism). Understand Shankaracharya vs Madhvacharya and which path fits your temperament.",
    keywords: ["advaita vs dvaita", "vedanta", "non-duality", "dualism", "shankaracharya", "madhvacharya"],
    alternates: {
        canonical: "https://opensadhaka.com/advaita-vs-dvaita"
    }
};

export default function AdvaitaVsDvaitaPage() {
    const meta = {
        title: "Advaita vs Dvaita Vedanta",
        pillar: "ancient-wisdom" as const,
        publishDate: "2026-03-09",
        readingTime: 12
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-20">
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
                    <div className="max-w-4xl mx-auto relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8">
                            The Great Debate
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
                            Advaita <span className="text-muted-foreground font-light text-4xl md:text-5xl border-x px-4 mx-2">vs</span> Dvaita
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                            One reality or two? The question that divided India's greatest minds for a millennium
                            stems from how we experience the relationship between the Soul and the Divine.
                        </p>
                    </div>
                </section>

                <section className="px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-invert prose-orange max-w-none space-y-8">
                            <div className="bg-muted/30 p-8 rounded-3xl border border-border/50 mb-12">
                                <p className="text-lg leading-relaxed first-letter:text-5xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                                    At some point in your spiritual life, you encounter the question that has divided India's greatest minds for over a thousand years:
                                    <em>Is the universe One, or Two?</em> Is your innermost Self the same as God, or forever distinct from God? Your answer changes everything —
                                    your practice, your prayer, your understanding of suffering, and your vision of liberation.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 my-16">
                                <div className="space-y-6">
                                    <div className="h-1 w-20 bg-primary"></div>
                                    <h2 className="text-3xl font-display font-bold">Advaita: Non-Duality</h2>
                                    <p className="text-muted-foreground">
                                        Systematized by <strong>Adi Shankaracharya</strong> (8th century). Advaita means "not-two."
                                        It asserts that Brahman (Infinite Consciousness) is the only ultimate reality.
                                    </p>
                                    <blockquote className="border-l-4 border-primary/30 pl-6 italic">
                                        "Brahma satyam jagan mithya... Brahman is real, the world is an appearance."
                                    </blockquote>
                                </div>
                                <div className="space-y-6">
                                    <div className="h-1 w-20 bg-orange-500"></div>
                                    <h2 className="text-3xl font-display font-bold">Dvaita: Dualism</h2>
                                    <p className="text-muted-foreground">
                                        Pioneered by <strong>Madhvacharya</strong> (13th century). Dvaita asserts that God,
                                        souls, and matter are eternally distinct and real.
                                    </p>
                                    <blockquote className="border-l-4 border-orange-500/30 pl-6 italic">
                                        "Two shall never become One. The soul is a servant; God is the Master."
                                    </blockquote>
                                </div>
                            </div>

                            <h2 className="text-4xl font-display font-bold text-center mt-20 mb-12">Comparison Matrix</h2>
                            <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5">
                                            <th className="p-6 font-display text-lg">Aspect</th>
                                            <th className="p-6 font-display text-lg text-primary">Advaita (Shankara)</th>
                                            <th className="p-6 font-display text-lg text-orange-400">Dvaita (Madhva)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-muted-foreground">
                                        <tr>
                                            <td className="p-6 font-bold text-foreground">Ultimate Reality</td>
                                            <td className="p-6">Only Brahman is ultimately real</td>
                                            <td className="p-6">God, souls, and matter are all real</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-foreground">Nature of God</td>
                                            <td className="p-6">Attribute-less Absolute (Nirguna)</td>
                                            <td className="p-6">Personal God with infinite qualities (Saguna)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-foreground">The Soul</td>
                                            <td className="p-6">Identical to Brahman</td>
                                            <td className="p-6">Eternally distinct & dependent</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-foreground">Liberation</td>
                                            <td className="p-6">Recognition of non-separation</td>
                                            <td className="p-6">Eternal devotion in God's presence</td>
                                        </tr>
                                        <tr>
                                            <td className="p-6 font-bold text-foreground">Primary Path</td>
                                            <td className="p-6">Jnana (Self-inquiry)</td>
                                            <td className="p-6">Bhakti (Surrendered devotion)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-20">
                                <h2 className="text-3xl font-display font-bold mb-8">Which fits your nature?</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card className="bg-primary/5 border-primary/20 p-8 rounded-[2rem]">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                            Choose Advaita if...
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            You find that the deepest experience of meditation dissolves the sense of a separate self —
                                            if "I" and "the universe" collapse into pure, undivided awareness.
                                        </p>
                                    </Card>
                                    <Card className="bg-orange-500/5 border-orange-500/20 p-8 rounded-[2rem]">
                                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                            <Quote className="w-5 h-5 text-orange-400" />
                                            Choose Dvaita if...
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            Your deepest longing is love — if you want to adore God, serve God, and be in God's presence
                                            while remaining a distinct soul who can experience that love.
                                        </p>
                                    </Card>
                                </div>
                            </div>

                            <div className="mt-20 bg-muted/20 rounded-3xl p-12 text-center border border-white/5">
                                <h2 className="text-3xl font-display font-bold mb-6">Explore Your Path</h2>
                                <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
                                    Take the Faith Finder assessment to see which philosophical school aligns with your psychological temperament.
                                </p>
                                <a href="/faith-finder">
                                    <button className="bg-primary text-primary-foreground font-bold px-10 h-16 rounded-2xl hover:scale-105 transition-transform flex items-center mx-auto">
                                        Start Faith Finder <ArrowRight className="ml-2 w-5 h-5" />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
