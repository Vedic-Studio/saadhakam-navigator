import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Flower2, HandHeart, Activity, Eye, Compass } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Practical Spiritual Practices | Sadhaka",
    description:
        "Learn the practical techniques of Sanatan Dharma including Meditation (Dhyana), Mantra Japa, Yoga Asanas, Puja, and Self-Inquiry.",
    alternates: {
        canonical: "https://www.opensadhaka.com/practical-spiritual-practices",
    },
    openGraph: {
        title: "Practical Spiritual Practices | Sadhaka",
        description:
            "Learn Japa, meditation, daily Sadhana, mantra practice, and beginner-friendly spiritual routines rooted in Sanatan Dharma.",
        url: "https://www.opensadhaka.com/practical-spiritual-practices",
        type: "website",
    },
};

const featuredGuides = [
    {
        title: "How to Start Japa Meditation",
        description:
            "A step-by-step guide to mantra repetition, using a Mala, choosing a mantra, and building consistency.",
        href: "/how-to-start-japa",
    },
    {
        title: "Daily Spiritual Routine for Beginners",
        description:
            "A realistic beginner Sadhana that fits modern life while keeping the spirit of traditional practice intact.",
        href: "/daily-spiritual-routine-beginners",
    },
    {
        title: "How to Choose a Mantra",
        description:
            "Match mantra, temperament, and intention so your practice becomes focused instead of scattered.",
        href: "/how-to-choose-a-mantra",
    },
    {
        title: "10 Powerful Sanskrit Mantras",
        description:
            "A curated list of classic mantras with meanings, use-cases, and suggestions for daily repetition.",
        href: "/10-powerful-sanskrit-mantras",
    },
    {
        title: "Mantras Library",
        description:
            "Browse mantra options by intention, deity focus, and practice format to choose a sustainable daily anchor.",
        href: "/mantras",
    },
    {
        title: "Neuroscience of Meditation in Hindu Practice",
        description:
            "Connect traditional meditation and mantra disciplines with modern findings on attention, stress, and neuroplasticity.",
        href: "/neuroscience-of-meditation-hinduism",
    },
];

const practices = [
    {
        title: "Meditation (Dhyana)",
        description: "The systematic process of silencing the mind to experience the true nature of the self. From basic mindfulness to deep absorption (Samadhi).",
        icon: Eye,
        href: "/practices/dhyana",
    },
    {
        title: "Mantra Japa",
        description: "The repetition of sacred sonic formulas (Mantras) to focus the mind, alter psychological patterns, and tune into divine frequencies. Using malas and sound.",
        icon: Activity,
        href: "/practices/japa",
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
        href: "/practices/yoga-sadhana",
    },
];

export default function SpiritualPracticesPage() {
    const faqs = [
        {
            question: "What is Sadhana?",
            answer: "Sadhana is the Sanskrit word for daily spiritual practice. It translates roughly to 'the means of accomplishing something.' Unlike attending a weekly service, Sadhana implies a disciplined, daily effort (like meditation, Japa, or yoga) undertaken to purify the mind and achieve self-realization."
        },
        {
            question: "How long should I meditate each day?",
            answer: "For beginners, the ancient texts recommend consistency over duration. Starting with just 10-15 minutes a day during 'Brahma Muhurta' (the quiet hours before dawn) is highly effective. 40 continuous days of a short practice builds a much stronger neural and spiritual foundation than sporadic hours of intense meditation."
        },
        {
            question: "Do I need a Guru to start a spiritual practice?",
            answer: "While a qualified Guru is traditionally considered essential for advanced initiation (Diksha) and navigating the profound depths of consciousness, it is absolutely not required to begin. Foundational practices like mindfulness, basic Mantra Japa (like Om), and Karma Yoga can and should be started immediately by anyone."
        },
        {
            question: "What is the best spiritual practice for a busy person?",
            answer: "Karma Yoga (the yoga of action) intertwined with simple Mantra Japa. By mentally offering the results of your daily work to the Divine, and repeating a mantra during idle moments (like commuting or cooking), you turn your entire busy life into a continuous spiritual practice without needing extra hours."
        }
    ];

    const learningPath = [
        {
            title: "Stabilize your schedule first",
            body:
                "A short daily practice beats an occasional intense one. Fix a time, a seat, and a minimum duration before you optimize technique.",
        },
        {
            title: "Choose one anchor practice",
            body:
                "For most beginners that means Japa, breath-led meditation, or a short daily routine that can survive a busy week.",
        },
        {
            title: "Add meaning, not just mechanics",
            body:
                "Learn what your mantra, prayer, or method is doing philosophically. Understanding deepens attention and protects against mechanical repetition.",
        },
        {
            title: "Expand only after consistency",
            body:
                "When the practice feels stable, add scripture study, longer sits, kirtan, puja, or comparison reading like Japa vs Dhyana.",
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Practical Spiritual Practices",
        description:
            "A pillar hub for Japa, meditation, daily Sadhana, mantra practice, and beginner-friendly spiritual routines.",
        url: "https://www.opensadhaka.com/practical-spiritual-practices",
        hasPart: featuredGuides.map((guide, index) => ({
            "@type": "Article",
            position: index + 1,
            name: guide.title,
            url: `https://www.opensadhaka.com${guide.href}`,
        })),
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="practical-spiritual-practices" pillar="pillar-hub" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                        <p>
                            If you want a practical starting sequence, begin with <Link href="/how-to-start-japa">How to
                                Start Japa Meditation</Link>, pair it with a simple <Link href="/daily-spiritual-routine-beginners">daily
                                    spiritual routine</Link>, and then refine your focus with <Link href="/how-to-choose-a-mantra">How
                                        to Choose a Mantra</Link>. For many beginners, that combination is enough to create a real,
                            sustainable practice within two weeks.
                        </p>
                    </div>

                    <section className="mb-24">
                        <div className="flex items-center gap-3 mb-6">
                            <Compass className="w-6 h-6 text-orange-500" />
                            <h2 className="font-display text-3xl md:text-4xl font-bold">Your practical starting set</h2>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-3xl mb-10">
                            These guides are designed to help a modern seeker move from curiosity to actual daily Sadhana.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredGuides.map((guide) => (
                                <TrackedLink
                                    key={guide.href}
                                    href={guide.href}
                                    eventLabel={`pillar_featured_guide:practical-spiritual-practices:${guide.href}`}
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
                                <TrackedLink
                                    href={practice.href}
                                    eventLabel={`pillar_cluster_link:practical-spiritual-practices:${practice.href}`}
                                    trackPathName={practice.href.replace(/^\//, "")}
                                    className="inline-flex items-center text-orange-400 font-semibold group-hover:text-orange-300 transition-colors"
                                >
                                    Explore <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </TrackedLink>
                            </div>
                        ))}
                    </div>

                    <section className="mb-24">
                        <div className="bg-gradient-to-br from-orange-950/20 to-background border border-orange-900/30 rounded-3xl p-10 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">How to build a practice that lasts</h2>
                            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
                                The biggest practical mistake beginners make is trying to master too many practices at once.
                                Use this progression to build depth before variety.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                {learningPath.map((item, index) => (
                                    <div key={item.title} className="rounded-2xl border border-white/5 bg-black/10 p-6">
                                        <div className="text-orange-400 text-sm font-semibold uppercase tracking-wide mb-3">
                                            Principle {index + 1}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SEO / FAQ Section */}
                    <div className="pt-16 border-t border-border mt-8">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Common questions about building a daily spiritual practice (Sadhana).
                            </p>
                        </div>
                        <div className="max-w-3xl mx-auto mb-20 text-left">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
