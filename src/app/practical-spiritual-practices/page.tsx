import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Flower2, HandHeart, Activity, Eye } from "lucide-react";

export const metadata: Metadata = {
    title: "Practical Spiritual Practices | Sadhaka",
    description:
        "Learn the practical techniques of Sanatan Dharma including Meditation (Dhyana), Mantra Japa, Yoga Asanas, Puja, and Self-Inquiry.",
    alternates: {
        canonical: "https://opensadhaka.com/practical-spiritual-practices",
    },
};

const practices = [
    {
        title: "Meditation (Dhyana)",
        description: "The systematic process of silencing the mind to experience the true nature of the self. From basic mindfulness to deep absorption (Samadhi).",
        icon: Eye,
        href: "/compare/japa-vs-dhyana",
    },
    {
        title: "Mantra Japa",
        description: "The repetition of sacred sonic formulas (Mantras) to focus the mind, alter psychological patterns, and tune into divine frequencies. Using malas and sound.",
        icon: Activity,
        href: "/learn/sanskrit/mantra",
    },
    {
        title: "Bhakti & Puja",
        description: "The path of radical love. Through ritual worship (Puja), chanting (Kirtan), and surrender, the heart is purified and the ego is dissolved in devotion.",
        icon: HandHeart,
        href: "/practices/puja",
    },
    {
        title: "Hatha & Ashtanga Yoga",
        description: "The physical and energetic disciplines (Asana, Pranayama) designed to purify the body's channels (Nadis) to safely handle higher states of consciousness.",
        icon: Flower2,
        href: "/practices/yoga",
    },
];

export default function SpiritualPracticesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    {/* Header Section */}
                    <header className="mb-20 text-center">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Practical Spiritual <span className="text-orange-500">Practices</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Philosophy without practice is just intellectual entertainment.
                            Sanatan Dharma is rooted in the laboratory of the self—discover the methodologies of awakening.
                        </p>
                    </header>

                    {/* Intro Content */}
                    <div className="prose prose-invert prose-orange max-w-4xl mx-auto mb-24 prose-lg">
                        <p>
                            In the East, theology is secondary; realization is primary. Sanatan Dharma prescribes
                            specific, replicable <em>technologies</em> to alter human consciousness. Depending on your
                            temperament—intellectual, active, or emotional—there is a specific toolkit designed for you.
                        </p>
                        <p>
                            This is the concept of <strong>Sadhana</strong> (spiritual exertion or practice). A person
                            engaged in Sadhana is a <strong>Sadhaka</strong>. Below you will find the dominant practices
                            utilized by yogis and householders alike for thousands of years.
                        </p>
                    </div>

                    {/* Hub Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        {practices.map((practice) => (
                            <div
                                key={practice.title}
                                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 group relative overflow-hidden"
                            >
                                {/* Fallback for icon missing in lucide-react (EyeO might not exist, mapping it safely) */}
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <practice.icon className="w-32 h-32" />
                                </div>
                                <practice.icon className="w-10 h-10 text-orange-500 mb-6" />
                                <h3 className="text-2xl font-bold mb-3 font-display">{practice.title}</h3>
                                <p className="text-muted-foreground mb-8 text-lg relative z-10">
                                    {practice.description}
                                </p>
                                <Link
                                    href={practice.href}
                                    className="inline-flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                                >
                                    Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
