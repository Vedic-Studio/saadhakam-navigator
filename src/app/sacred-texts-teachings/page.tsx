import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Book, Compass, Flame, Library, ScrollText } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Sacred Texts & Teachings of Sanatan Dharma | Sadhaka",
    description:
        "Discover the foundational scriptures of Hinduism: The Vedas, Upanishads, Bhagavad Gita, Puranas, and Itihasas (Ramayana & Mahabharata).",
    alternates: {
        canonical: "https://opensadhaka.com/sacred-texts-teachings",
    },
    openGraph: {
        title: "Sacred Texts & Teachings of Sanatan Dharma | Sadhaka",
        description:
            "A beginner-friendly guide to the Bhagavad Gita, Upanishads, Vedas, epics, and Sanskrit wisdom traditions.",
        url: "https://opensadhaka.com/sacred-texts-teachings",
        type: "website",
    },
};

const featuredGuides = [
    {
        title: "Bhagavad Gita Complete Guide",
        description:
            "A broad entry point into the Gita, its structure, key themes, and why it remains the most practical scripture for modern seekers.",
        href: "/bhagavad-gita-complete-guide",
    },
    {
        title: "Bhagavad Gita Chapter 1: Arjuna's Dilemma",
        description:
            "Understand why the Gita begins with collapse, grief, and moral confusion rather than immediate enlightenment.",
        href: "/bhagavad-gita-chapter-1",
    },
    {
        title: "10 Powerful Sanskrit Mantras",
        description:
            "Explore how sacred sound functions as living scripture in the form of memorized, repeated, embodied speech.",
        href: "/10-powerful-sanskrit-mantras",
    },
    {
        title: "How to Start Japa Meditation",
        description:
            "Bridge textual study and lived practice by learning how scriptural mantras enter daily spiritual discipline.",
        href: "/how-to-start-japa",
    },
];

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

const readingPath = [
    {
        title: "Start with the Bhagavad Gita",
        description:
            "It is the most accessible bridge between philosophy, action, devotion, and real human conflict.",
    },
    {
        title: "Use epics to understand Dharma in motion",
        description:
            "Texts like the Mahabharata and Ramayana teach through characters, dilemmas, and consequence rather than abstract theory alone.",
    },
    {
        title: "Approach the Upanishads after orientation",
        description:
            "They are dense, luminous, and transformative — but far easier once you know the basic vocabulary of Atman, Brahman, Karma, and Dharma.",
    },
    {
        title: "Let practice interpret the text",
        description:
            "Mantra, meditation, and reflection turn scriptural ideas from concepts into insight.",
    },
];

const faqs = [
    {
        question: "What Hindu scripture should a beginner read first?",
        answer:
            "The Bhagavad Gita is usually the best starting point because it combines philosophy, ethics, devotion, and practice in one text. It speaks directly to the dilemmas of ordinary life.",
    },
    {
        question: "What is the difference between Shruti and Smriti?",
        answer:
            "Shruti refers to the revealed texts, especially the Vedas and Upanishads. Smriti refers to remembered or authored texts such as epics, Puranas, and law or commentary traditions that apply Vedic insight to lived life.",
    },
    {
        question: "Why are there so many sacred texts in Sanatan Dharma?",
        answer:
            "Because the tradition grew across thousands of years, different regions, teacher lineages, and spiritual needs. Instead of one final book, it preserves a living library suited to different temperaments and stages of practice.",
    },
    {
        question: "Do I need Sanskrit to benefit from these texts?",
        answer:
            "No, but learning a few key terms dramatically improves understanding. Even simple words like Dharma, Karma, Atman, and Moksha carry meanings that are richer than their common English approximations.",
    },
];

export default function SacredTextsPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Sacred Texts & Teachings of Sanatan Dharma",
        description:
            "A pillar hub for the Bhagavad Gita, Upanishads, Vedas, Sanskrit mantras, and scriptural study guides.",
        url: "https://opensadhaka.com/sacred-texts-teachings",
        hasPart: featuredGuides.map((guide, index) => ({
            "@type": "Article",
            position: index + 1,
            name: guide.title,
            url: `https://opensadhaka.com${guide.href}`,
        })),
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <ContentPageTracker slug="sacred-texts-teachings" pillar="pillar-hub" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
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
                        <p>
                            If you are unsure where to begin, start with the <Link href="/bhagavad-gita-complete-guide">Bhagavad
                                Gita Complete Guide</Link>, then go chapter-by-chapter beginning with <Link href="/bhagavad-gita-chapter-1">Arjuna’s
                                    Dilemma</Link>. Pair that study with sound-based practice through <Link href="/10-powerful-sanskrit-mantras">Sanskrit
                                        mantras</Link> or <Link href="/how-to-start-japa">Japa meditation</Link> so the texts become
                            experiential, not merely intellectual.
                        </p>
                    </div>

                    <section className="mb-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Compass className="w-6 h-6 text-orange-500" />
                            <h2 className="font-display text-3xl md:text-4xl font-bold">Start with these study paths</h2>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                            These pages turn a massive scriptural tradition into a practical, beginner-friendly reading sequence.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredGuides.map((guide) => (
                                <TrackedLink
                                    key={guide.href}
                                    href={guide.href}
                                    eventLabel={`pillar_featured_guide:sacred-texts-teachings:${guide.href}`}
                                    trackPathName={guide.href.replace(/^\//, "")}
                                    className="glass-card rounded-3xl border border-white/5 p-8 hover:border-orange-500/30 transition-all duration-300 group"
                                >
                                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-orange-300 transition-colors">
                                        {guide.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg mb-6">{guide.description}</p>
                                    <span className="inline-flex items-center text-orange-400 font-semibold">
                                        Read guide
                                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </TrackedLink>
                            ))}
                        </div>
                    </section>

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
                                <TrackedLink
                                    href={group.href}
                                    eventLabel={`pillar_cluster_link:sacred-texts-teachings:${group.href}`}
                                    trackPathName={group.href.replace(/^\//, "")}
                                    className="inline-flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                                >
                                    Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </TrackedLink>
                            </div>
                        ))}
                    </div>

                    <section className="mb-24">
                        <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">How to read these texts without overwhelm</h2>
                            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
                                The goal is not to read everything. The goal is to let the right texts shape your understanding, practice, and inner life.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {readingPath.map((item, index) => (
                                    <div key={item.title} className="rounded-2xl border border-white/5 bg-black/10 p-6">
                                        <div className="text-orange-400 text-sm font-semibold uppercase tracking-wide mb-3">
                                            Step {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="pt-16 border-t border-border">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Common beginner questions about reading Hindu scriptures and approaching sacred knowledge responsibly.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/60 bg-card p-6">
                                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </main>

            <Footer />
        </div>
    );
}
