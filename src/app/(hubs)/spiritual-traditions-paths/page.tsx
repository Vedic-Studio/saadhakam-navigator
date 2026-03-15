import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Compass, Droplets, Flame, MountainSnow, Shield } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Spiritual Traditions & Paths | Sadhaka",
    description:
        "Explore the major traditions (Sampradayas) of Sanatan Dharma including Shaivism, Vaishnavism, Shaktism, and Smartism.",
    alternates: {
        canonical: "https://opensadhaka.com/spiritual-traditions-paths",
    },
    openGraph: {
        title: "Spiritual Traditions & Paths | Sadhaka",
        description:
            "Learn the differences between Shaiva, Vaishnava, Shakta, and other spiritual paths within Sanatan Dharma.",
        url: "https://opensadhaka.com/spiritual-traditions-paths",
        type: "website",
    },
};

const featuredGuides = [
    {
        title: "Shaivism vs Vaishnavism",
        description:
            "The fastest way to understand how two of the largest Hindu traditions differ in devotion, theology, and liberation.",
        href: "/shaivism-vs-vaishnavism",
    },
    {
        title: "Spiritual Paths Explained",
        description:
            "A higher-level introduction to the major routes seekers follow across knowledge, devotion, meditation, and action.",
        href: "/spiritual-paths-explained",
    },
    {
        title: "Inquiry vs Devotion",
        description:
            "Compare the Jnana-oriented path of investigation with the Bhakti-oriented path of surrender and love.",
        href: "/inquiry-vs-devotion-path",
    },
    {
        title: "Which Meditation is Right for Me?",
        description:
            "Use temperament as your guide when choosing among stillness, mantra, devotion, self-inquiry, and embodied practice.",
        href: "/which-meditation-for-me",
    },
    {
        title: "Mantras Library",
        description:
            "Find mantra pathways by deity, intention, and practice style across Shaiva, Vaishnava, and universal traditions.",
        href: "/mantras",
    },
];

const traditions = [
    {
        title: "Shaivism",
        description: "The worship of Shiva as the Supreme Being. Emphasizes asceticism, yoga, and Tantric practices. Prominent in Kashmir and South India.",
        icon: MountainSnow,
        href: "/shaivism-vs-vaishnavism",
    },
    {
        title: "Vaishnavism",
        description: "The worship of Vishnu (and avatars like Krishna and Rama) as the Supreme Lord. Strongly emphasizes Bhakti (devotion) and grace.",
        icon: Droplets,
        href: "/shaivism-vs-vaishnavism",
    },
    {
        title: "Shaktism",
        description: "The worship of the divine feminine (Devi or Shakti) as the absolute, ultimate reality. Deeply intertwined with Tantra and mantra practice.",
        icon: Flame,
        href: "/spiritual-paths-explained",
    },
    {
        title: "Smartism",
        description: "A liberal, non-sectarian tradition founded by Adi Shankaracharya that worships five deities (Panchayatana puja) as equal manifestations of the one Brahman.",
        icon: Shield,
        href: "/inquiry-vs-devotion-path",
    },
];

const decisionPath = [
    {
        title: "Notice your deepest draw",
        description:
            "Some seekers are called by silence and inquiry, others by devotion and relationship, others by ritual, mantra, or embodied sacred energy.",
    },
    {
        title: "Match theology with practice",
        description:
            "A tradition is more than ideas. It includes preferred mantras, deities, texts, teachers, disciplines, and emotional tone.",
    },
    {
        title: "Use comparison before commitment",
        description:
            "Read tradition-to-tradition comparisons so your path is chosen with clarity rather than mood or aesthetics alone.",
    },
    {
        title: "Let practice confirm resonance",
        description:
            "The right path becomes clear through lived experience — what steadies your mind, opens your heart, and deepens sincerity over time.",
    },
];

const faqs = [
    {
        question: "What is a Sampradaya?",
        answer:
            "A Sampradaya is a living spiritual lineage — a tradition that carries teachings, rituals, mantras, interpretations, and methods from teacher to student across generations.",
    },
    {
        question: "Do I need to choose one Hindu tradition forever?",
        answer:
            "Not at the beginning. Early exploration is natural. Over time, most seekers benefit from depth in one coherent path rather than collecting disconnected practices from many traditions at once.",
    },
    {
        question: "Can someone honor both Shiva and Vishnu?",
        answer:
            "Yes. Many practitioners do, and traditions like Smartism explicitly frame multiple deities as valid manifestations of one ultimate reality. The difference is often one of devotional center, not mutual exclusion.",
    },
    {
        question: "How do I know whether inquiry or devotion suits me?",
        answer:
            "Ask what feels most alive: investigating the nature of the self, or cultivating loving relationship with the Divine. Most seekers contain both, but one usually acts as the primary doorway.",
    },
];

export default function SpiritualTraditionsPage() {
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
        name: "Spiritual Traditions & Paths",
        description:
            "A pillar hub for Shaivism, Vaishnavism, Shaktism, Smartism, and the major path choices within Sanatan Dharma.",
        url: "https://opensadhaka.com/spiritual-traditions-paths",
        hasPart: featuredGuides.map((guide, index) => ({
            "@type": "Article",
            position: index + 1,
            name: guide.title,
            url: `https://opensadhaka.com${guide.href}`,
        })),
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-orange-500/30 selection:text-orange-100 flex flex-col">
            <ContentPageTracker slug="spiritual-traditions-paths" pillar="pillar-hub" />
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
                            Spiritual <span className="text-orange-500">Traditions</span> & Paths
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Sanatan Dharma is a tapestry of distinct, ancient lineages (Sampradayas).
                            Each offers a unique theological lens, set of practices, and path to liberation.
                        </p>
                    </header>

                    {/* Intro Content */}
                    <div className="prose prose-invert prose-orange max-w-4xl mx-auto mb-24 prose-lg">
                        <p>
                            While Western religions are often strictly monotheistic and exclusive, Sanatan Dharma
                            is deeply pluralistic. The <em>Rig Veda</em> famously declares:
                            <strong>"Truth is One, but the sages call it by many names."</strong>
                        </p>
                        <p>
                            This realization gave birth to distinct traditions (Sampradayas). Some seekers are drawn
                            to the ascetic, world-renouncing energy of Shiva. Others are drawn to the colorful,
                            protective, and loving energy of Vishnu. Others worship the fierce, dynamic power of the
                            Divine Mother (Shakti). All are valid rivers flowing into the same infinite ocean.
                        </p>
                        <p>
                            If you are deciding where to begin, read <Link href="/shaivism-vs-vaishnavism">Shaivism vs
                                Vaishnavism</Link>, then compare <Link href="/inquiry-vs-devotion-path">Inquiry vs Devotion</Link>
                            and <Link href="/which-meditation-for-me">Which Meditation is Right for Me?</Link>. These
                            pages help translate abstract tradition names into the actual psychological and spiritual
                            experience of following them.
                        </p>
                    </div>

                    <section className="mb-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Compass className="w-6 h-6 text-orange-500" />
                            <h2 className="font-display text-3xl md:text-4xl font-bold">Start with these path guides</h2>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                            These pages are designed to help seekers move from vague attraction to a more grounded sense of fit.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredGuides.map((guide) => (
                                <TrackedLink
                                    key={guide.href}
                                    href={guide.href}
                                    eventLabel={`pillar_featured_guide:spiritual-traditions-paths:${guide.href}`}
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
                        {traditions.map((tradition) => (
                            <div
                                key={tradition.title}
                                className="glass-card p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <tradition.icon className="w-32 h-32" />
                                </div>
                                <tradition.icon className="w-10 h-10 text-orange-500 mb-6" />
                                <h3 className="text-2xl font-bold mb-3 font-display">{tradition.title}</h3>
                                <p className="text-muted-foreground mb-8 text-lg relative z-10">
                                    {tradition.description}
                                </p>
                                <TrackedLink
                                    href={tradition.href}
                                    eventLabel={`pillar_cluster_link:spiritual-traditions-paths:${tradition.href}`}
                                    trackPathName={tradition.href.replace(/^\//, "")}
                                    className="inline-flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                                >
                                    Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </TrackedLink>
                            </div>
                        ))}
                    </div>

                    <section className="mb-24">
                        <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">How to identify your natural path</h2>
                            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
                                Tradition choice becomes simpler when you focus on your real temperament rather than what sounds impressive.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {decisionPath.map((item, index) => (
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



                    <section className="mb-24">
                        <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Deity and epic bridge cluster</h2>
                            <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
                                New Cluster 11 bridge pages connect tradition-level orientation to deity literacy and Ramayana context for western readers.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <TrackedLink href="/deities" eventLabel="pillar_bridge:traditions:deities" trackPathName="deities" className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors">Hindu Deities Hub</TrackedLink>
                                <TrackedLink href="/hindu-goddess-explained" eventLabel="pillar_bridge:traditions:hindu-goddess-explained" trackPathName="hindu-goddess-explained" className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors">Hindu Goddess Explained</TrackedLink>
                                <TrackedLink href="/deities/shiva" eventLabel="pillar_bridge:traditions:deities-shiva" trackPathName="deities/shiva" className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors">Who is Shiva?</TrackedLink>
                                <TrackedLink href="/deities/vishnu" eventLabel="pillar_bridge:traditions:deities-vishnu" trackPathName="deities/vishnu" className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors">Who is Vishnu?</TrackedLink>
                                <TrackedLink href="/ramayana-explained" eventLabel="pillar_bridge:traditions:ramayana-explained" trackPathName="ramayana-explained" className="rounded-2xl border border-white/10 p-5 hover:border-orange-500/40 transition-colors">Ramayana Explained</TrackedLink>
                            </div>
                        </div>
                    </section>
                    <section className="pt-16 border-t border-border">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Common questions from seekers exploring Shaiva, Vaishnava, Shakta, and other Dharmic paths.
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
