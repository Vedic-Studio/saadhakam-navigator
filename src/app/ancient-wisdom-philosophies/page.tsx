import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Sparkles, Infinity } from "lucide-react";

export const metadata: Metadata = {
    title: "Ancient Wisdom & Philosophies of Sanatan Dharma | Sadhaka",
    description:
        "Explore the six orthodox schools of Hindu philosophy (Darshanas), Vedanta, Advaita, and the timeless existential wisdom of Sanatan Dharma.",
    alternates: {
        canonical: "https://opensadhaka.com/ancient-wisdom-philosophies",
    },
};

const philosophies = [
    {
        title: "Vedanta (The End of Knowledge)",
        description: "The peak of Vedic thought, exploring the nature of Brahman (ultimate reality) and Atman (the self). Includes Advaita, Dvaita, and Vishishtadvaita.",
        icon: Infinity,
        href: "/compare/advaita-vs-dvaita",
    },
    {
        title: "Samkhya & Yoga",
        description: "The ancient dualistic framework of consciousness (Purusha) and matter (Prakriti), and the practical methodology to separate them.",
        icon: Brain,
        href: "/compare/samkhya-vs-yoga",
    },
    {
        title: "Nyaya & Vaisheshika",
        description: "The rigorous schools of logic, epistemology, and atomistic physics that formed the rational basis of ancient Indian debate.",
        icon: BookOpen,
        href: "/topics/karma",
    },
    {
        title: "Purva Mimamsa",
        description: "The philosophy of action, duty, and the mechanics of Dharma as expressed through cosmic ritual and ethical living.",
        icon: Sparkles,
        href: "/topics/dharma",
    },
];

export default function AncientWisdomPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    {/* Header Section */}
                    <header className="mb-20 text-center">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Ancient <span className="text-orange-500">Wisdom</span> & Philosophies
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            For over 5,000 years, the sages of the Indian subcontinent have rigorously
                            investigated the nature of reality, consciousness, and the self. Explore the
                            profound philosophical frameworks of Sanatan Dharma.
                        </p>
                    </header>

                    {/* Intro Content */}
                    <div className="prose prose-invert prose-orange max-w-4xl mx-auto mb-24 prose-lg">
                        <p>
                            Sanatan Dharma is not a monolithic belief system. It is an open-source architecture
                            for spiritual and intellectual exploration. At its core are the <strong>Shad-Darshanas</strong>—the
                            six orthodox schools of philosophy. "Darshana" translates literally to "a way of seeing."
                        </p>
                        <p>
                            Unlike Western philosophy, which often separates intellectual inquiry from daily life,
                            ancient Indian philosophy is intrinsically tied to <em>Moksha</em> (liberation).
                            The ultimate goal of every school—whether it focuses on logic, atomic theory, or
                            pure non-dual consciousness—is the permanent cessation of suffering and the realization
                            of absolute truth.
                        </p>
                    </div>

                    {/* Hub Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        {philosophies.map((phil) => (
                            <div
                                key={phil.title}
                                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <phil.icon className="w-32 h-32" />
                                </div>
                                <phil.icon className="w-10 h-10 text-orange-500 mb-6" />
                                <h3 className="text-2xl font-bold mb-3 font-display">{phil.title}</h3>
                                <p className="text-muted-foreground mb-8 text-lg relative z-10">
                                    {phil.description}
                                </p>
                                <Link
                                    href={phil.href}
                                    className="inline-flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                                >
                                    Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Deep Dive Section */}
                    <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-16 text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Explore Key Concepts</h2>
                        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                            Dive into the foundational concepts that span across all schools of Hindu thought.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['Karma', 'Dharma', 'Moksha', 'Maya', 'Atman', 'Brahman'].map((concept) => (
                                <Link
                                    key={concept}
                                    href={`/learn/sanskrit/${concept.toLowerCase()}`}
                                    className="px-6 py-3 rounded-full bg-secondary/20 hover:bg-orange-500/20 border border-white/5 hover:border-orange-500/50 transition-all font-medium"
                                >
                                    {concept}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
