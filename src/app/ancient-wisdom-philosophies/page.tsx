import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, BookOpen, Brain, Compass, Infinity, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Ancient Wisdom & Philosophies of Sanatan Dharma | Sadhaka",
    description:
        "Explore the six orthodox schools of Hindu philosophy (Darshanas), Vedanta, Advaita, and the timeless existential wisdom of Sanatan Dharma.",
    alternates: {
        canonical: "https://opensadhaka.com/ancient-wisdom-philosophies",
    },
    openGraph: {
        title: "Ancient Wisdom & Philosophies of Sanatan Dharma | Sadhaka",
        description:
            "Explore Vedanta, non-duality, classical Darshanas, and the philosophical foundations of Sanatan Dharma.",
        url: "https://opensadhaka.com/ancient-wisdom-philosophies",
        type: "website",
    },
};

const featuredGuides = [
    {
        title: "What is Vedanta? A Complete Beginner's Guide",
        description:
            "Start with the big picture: Brahman, Atman, the Upanishads, and the three major schools of Vedanta.",
        href: "/what-is-vedanta",
    },
    {
        title: "Advaita Vedanta Explained Simply",
        description:
            "Understand non-duality without jargon: Maya, Self-inquiry, and why Advaita still shapes modern spirituality.",
        href: "/advaita-vedanta-explained",
    },
    {
        title: "Non-Duality vs Dualism",
        description:
            "Compare Advaita, Dvaita, and the middle positions that define India's deepest philosophical debates.",
        href: "/non-duality-vs-dualism",
    },
    {
        title: "Adi Shankaracharya: Life & Legacy",
        description:
            "Meet the philosopher who systematized Advaita and shaped the intellectual map of Sanatan Dharma.",
        href: "/adi-shankaracharya-life-teachings",
    },
];

const philosophies = [
    {
        title: "Vedanta (The End of Knowledge)",
        description:
            "The culminating philosophy of the Vedas, centered on Brahman, Atman, liberation, and the interpretive traditions of Advaita, Dvaita, and Vishishtadvaita.",
        icon: Infinity,
        href: "/what-is-vedanta",
    },
    {
        title: "Samkhya & Yoga",
        description:
            "The classical map of consciousness and matter, plus the practical yogic disciplines used to still the mind and separate the witness from experience.",
        icon: Brain,
        href: "/compare/samkhya-vs-yoga",
    },
    {
        title: "Nyaya & Vaisheshika",
        description:
            "The schools of logic, epistemology, and categorization that trained seekers to ask sharper questions about knowledge and reality.",
        icon: BookOpen,
        href: "/philosophies",
    },
    {
        title: "Purva Mimamsa",
        description:
            "The philosophy of Dharma, right action, and sacred order — the bridge between ritual precision, ethics, and daily life.",
        icon: Sparkles,
        href: "/topics/dharma",
    },
];

const learningPath = [
    {
        step: "Begin with the big frame",
        detail:
            "Read foundational overviews like What is Vedanta and Advaita Vedanta Explained before diving into technical debates.",
    },
    {
        step: "Compare schools, not slogans",
        detail:
            "Use comparison pages like Advaita vs Dvaita and Non-Duality vs Dualism to see exactly where traditions converge and diverge.",
    },
    {
        step: "Study teachers through their ideas",
        detail:
            "Biographies matter most when they illuminate doctrine, so pair Adi Shankaracharya with the core Advaita texts he commented on.",
    },
    {
        step: "Translate philosophy into practice",
        detail:
            "Ancient wisdom becomes transformative only when it changes how you meditate, inquire, relate, and live.",
    },
];

const faqs = [
    {
        question: "What should a beginner read first in Indian philosophy?",
        answer:
            "Most seekers should begin with Vedanta because it introduces the big questions clearly: What is the self? What is reality? What causes suffering? From there, comparisons with Samkhya, Yoga, and Bhakti traditions become much easier to understand.",
    },
    {
        question: "Is ancient Indian philosophy purely intellectual?",
        answer:
            "No. In Sanatan Dharma, philosophy is inseparable from liberation. The purpose of debate is not winning arguments; it is removing confusion so practice becomes precise and realization becomes possible.",
    },
    {
        question: "What is the difference between philosophy and tradition in Hinduism?",
        answer:
            "A philosophy explains reality at the level of concepts and metaphysics. A tradition translates those insights into worship, meditation, ethics, teacher lineages, and lived culture. The two are deeply connected but not identical.",
    },
    {
        question: "Why do Advaita and Dvaita both exist if they read the same scriptures?",
        answer:
            "Because the shared source texts — especially the Upanishads, Bhagavad Gita, and Brahma Sutras — are rich enough to support different interpretive emphases. Different acharyas draw out different relationships between God, soul, and world.",
    },
];

export default function AncientWisdomPage() {
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
        name: "Ancient Wisdom & Philosophies of Sanatan Dharma",
        description:
            "A pillar hub for Vedanta, non-duality, classical Darshanas, and beginner guides to Indian philosophy.",
        url: "https://opensadhaka.com/ancient-wisdom-philosophies",
        hasPart: featuredGuides.map((guide, index) => ({
            "@type": "Article",
            position: index + 1,
            name: guide.title,
            url: `https://opensadhaka.com${guide.href}`,
        })),
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
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
                            Sanatan Dharma is not a monolithic belief system. It is a vast architecture of insight,
                            argument, contemplation, and realization. At its core are the <strong>Shad-Darshanas</strong>
                            — the six orthodox schools of philosophy. “Darshana” literally means “a way of seeing,”
                            which is exactly what these traditions offer: not just beliefs, but lenses through which
                            reality, identity, and liberation are understood.
                        </p>
                        <p>
                            Unlike modern academic philosophy, which often ends in analysis, Indian philosophy is
                            designed to culminate in <em>Moksha</em> — freedom. Whether a school emphasizes logic,
                            ritual, meditation, devotion, or non-dual inquiry, the end goal is the same: removal of
                            ignorance and the realization of what is ultimately true.
                        </p>
                        <p>
                            If you are new, begin with <Link href="/what-is-vedanta">What is Vedanta?</Link>, then
                            move to <Link href="/advaita-vedanta-explained">Advaita Vedanta Explained</Link> and
                            <Link href="/non-duality-vs-dualism">Non-Duality vs Dualism</Link>. If you want the human
                            story behind the ideas, the life of <Link href="/adi-shankaracharya-life-teachings">Adi
                                Shankaracharya</Link> shows how philosophy in India was always tied to teaching,
                            debate, institution-building, and lived spiritual culture.
                        </p>
                    </div>

                    <section className="mb-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Compass className="w-6 h-6 text-orange-500" />
                            <h2 className="font-display text-3xl md:text-4xl font-bold">Start with these foundational guides</h2>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                            These are the highest-leverage entry points for this pillar. Read them in order if you
                            want a coherent path from basic Vedanta vocabulary to the great debates of Indian thought.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredGuides.map((guide) => (
                                <Link
                                    key={guide.href}
                                    href={guide.href}
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
                                </Link>
                            ))}
                        </div>
                    </section>

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

                    <section className="mb-24">
                        <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                                A practical roadmap for studying Indian philosophy
                            </h2>
                            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
                                The fastest way to get lost in ancient wisdom is to consume isolated ideas without a
                                sequence. Use this progression to move from orientation to depth without overwhelm.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {learningPath.map((item, index) => (
                                    <div
                                        key={item.step}
                                        className="rounded-2xl border border-white/5 bg-black/10 p-6"
                                    >
                                        <div className="text-orange-400 text-sm font-semibold uppercase tracking-wide mb-3">
                                            Step {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{item.step}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Deep Dive Section */}
                    <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-16 text-center mb-24">
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

                    <section className="pt-16 border-t border-border">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Common beginner questions about studying Vedanta, Darshanas, and the philosophical side of Sanatan Dharma.
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
