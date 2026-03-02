import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Book, Flame, ScrollText, Library } from "lucide-react";

export const metadata: Metadata = {
    title: "Sacred Texts & Teachings of Sanatan Dharma | Sadhaka",
    description:
        "Discover the foundational scriptures of Hinduism: The Vedas, Upanishads, Bhagavad Gita, Puranas, and Itihasas (Ramayana & Mahabharata).",
    alternates: {
        canonical: "https://opensadhaka.com/sacred-texts-teachings",
    },
};

const textGroups = [
    {
        title: "Shruti: The Revealed Texts",
        description: "That which is heard. The eternal, unauthored truths heard by ancient Rishis in deep meditation. This represents the four Vedas and their concluding philosophical section, the Upanishads.",
        icon: Flame,
        href: "/texts",
    },
    {
        title: "Smriti: The Remembered Texts",
        description: "That which is remembered. Texts authored by sages designed to expand upon and apply Vedic principles to daily life and changing times, including the Dharma Shastras.",
        icon: ScrollText,
        href: "/texts",
    },
    {
        title: "Itihasa: The Great Epics",
        description: "The historical epics—the Ramayana and the Mahabharata—which teach profound Dharma through complex narrative, heroics, and profound ethical dilemmas.",
        icon: Library,
        href: "/texts",
    },
    {
        title: "The Bhagavad Gita",
        description: "The crown jewel of Indian scripture. Spoken on a battlefield, this 700-verse dialogue between Krishna and Arjuna synthesizes all paths of Yoga and philosophy.",
        icon: Book,
        href: "/texts/bhagavad-gita",
    },
];

export default function SacredTextsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    {/* Header Section */}
                    <header className="mb-20 text-center">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Sacred Texts & <span className="text-orange-500">Teachings</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Sanatan Dharma boasts the largest, most continuous body of spiritual and philosophical
                            literature in human history. Explore the scriptures that map the human soul.
                        </p>
                    </header>

                    {/* Intro Content */}
                    <div className="prose prose-invert prose-orange max-w-4xl mx-auto mb-24 prose-lg">
                        <p>
                            Unlike traditions with a single holy book, Sanatan Dharma comprises an entire library
                            of literature, constantly evolving over thousands of years to meet the needs of humanity
                            in different eras (Yugas). The texts are traditionally divided into two main categories:
                            <strong>Shruti</strong> (what is heard/revealed) and <strong>Smriti</strong> (what is remembered/authored).
                        </p>
                        <p>
                            The Vedas stand as the ultimate authority, but practically, works like the
                            <em>Bhagavad Gita</em> and the <em>Ramayana</em> serve as the living heartbeat of
                            the tradition for billions of people today.
                        </p>
                    </div>

                    {/* Hub Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        {textGroups.map((group) => (
                            <div
                                key={group.title}
                                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <group.icon className="w-32 h-32" />
                                </div>
                                <group.icon className="w-10 h-10 text-orange-500 mb-6" />
                                <h3 className="text-2xl font-bold mb-3 font-display">{group.title}</h3>
                                <p className="text-muted-foreground mb-8 text-lg relative z-10">
                                    {group.description}
                                </p>
                                <Link
                                    href={group.href}
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
