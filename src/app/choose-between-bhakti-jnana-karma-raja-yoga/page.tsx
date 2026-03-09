import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "How to Choose Between Bhakti, Jnana, Karma, and Raja Yoga | Sadhaka",
    description:
        "A structured chooser guide for Bhakti, Jnana, Karma, and Raja Yoga, comparing each path by temperament, practice style, strengths, and beginner fit.",
    alternates: {
        canonical: "https://opensadhaka.com/choose-between-bhakti-jnana-karma-raja-yoga",
    },
    openGraph: {
        title: "Choose Between Bhakti, Jnana, Karma, and Raja Yoga",
        description:
            "Compare the four major yogic paths using a structured chooser framework for temperament, practice, and daily-life fit.",
        url: "https://opensadhaka.com/choose-between-bhakti-jnana-karma-raja-yoga",
        type: "article",
    },
};

const options = [
    {
        name: "Bhakti Yoga (The Path of Devotion)",
        chooser: "Choose this if your primary mode of engagement is emotional and relational. If you find peace in prayer, ritual, and a personal connection to the Divine, Bhakti allows you to transform your existing emotional energy into spiritual momentum.",
        strength: "Directly addresses the heart; requires no intellectual gymnastics.",
        challenge: "Vulnerability to emotional 'highs' and 'lows' without a stabilizing routine.",
        vedicConcept: "Ishta-Devata (Personal Deity)",
        primaryTool: "Mantra & Kirtan",
        href: "/inquiry-vs-devotion-path",
    },
    {
        name: "Jnana Yoga (The Path of Wisdom)",
        chooser: "Choose this if you are naturally analytical, skeptical, and driven to understand the ultimate nature of 'Self.' If you demand logical proof and are drawn to non-dual philosophy (Advaita), Jnana Yoga uses the intellect to transcend the intellect.",
        strength: "Provides absolute clarity and dismantles the root cause of suffering: ignorance.",
        challenge: "Risk of 'intellectual indigestion'—knowing the theory but lacking the experience.",
        vedicConcept: "Viveka (Discrimination)",
        primaryTool: "Self-Inquiry (Atma-Vichara)",
        href: "/what-is-vedanta",
    },
    {
        name: "Karma Yoga (The Path of Action)",
        chooser: "Choose this if you have significant worldly responsibilities and cannot retreat into solitude. If you thrive on being active and want to turn your daily work, parenting, or career into a spiritual practice, Karma Yoga is your primary vehicle.",
        strength: "Integrates spirituality into every second of the day; no retreat required.",
        challenge: "Difficult to maintain the 'witness' state during high-stress activities.",
        vedicConcept: "Nishkama Karma (Desireless Action)",
        primaryTool: "Duty (Dharma)",
        href: "/starting-spiritual-practice",
    },
    {
        name: "Raja Yoga (The Path of Discipline)",
        chooser: "Choose this if you love structure, scientific methodology, and internal exploration. If you want a step-by-step manual for mastering the mind through breath and meditation, Raja Yoga (Ashtanga) offers the most precise technical framework.",
        strength: "Builds immense mental focus and physiological regulation.",
        challenge: "Can become clinical or rigid without the 'juice' of devotion or wisdom.",
        vedicConcept: "Chitta-Vritti-Nirodha (Stillness of Mind)",
        primaryTool: "Eight-Fold Path (Ashtanga)",
        href: "/which-meditation-for-me",
    },
];

const references = [
    { label: "Bhagavad Gita — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/Bhagavad-Gita" },
    { label: "Yoga — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/yoga" },
    { label: "Bhakti — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/bhakti" },
    { label: "Vedanta — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/Vedanta" },
    { label: "Hindu Philosophy — Stanford Encyclopedia of Philosophy", href: "https://plato.stanford.edu/entries/hindu-philosophy/" },
];

const faqs = [
    {
        question: "Can I practice more than one path at once?",
        answer:
            "Yes. This is known as 'Yoga Synthesis' or Integral Yoga. Most practitioners use Karma Yoga during the day, Bhakti for emotional grounding, and Raja or Jnana for dedicated morning practice.",
    },
    {
        question: "Which path is the fastest for a beginner?",
        answer:
            "The 'fastest' path is the one you don't quit. For a restless person, Karma Yoga is fastest because they can start now. For a thinker, Jnana is fastest because it provides the map they need to begin.",
    },
    {
        question: "How do I deal with the 'dryness' of analytical paths?",
        answer:
            "Analytical paths like Jnana can feel dry if not balanced with Bhakti (devotion) or Karma (service). Spiritual growth requires both the 'light' of wisdom and the 'heat' of love.",
    },
    {
        question: "What if I don't believe in a personal God?",
        answer:
            "Raja and Jnana Yoga do not require belief in a personal deity. They are systems of psychological training and philosophical inquiry that can be practiced by anyone, regardless of religious background.",
    },
];

export default function ChooseBetweenYogaPathsPage() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Bhakti, Jnana, Karma, and Raja Yoga Options",
        itemListElement: options.map((option, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: option.name,
            description: option.chooser,
            url: `https://opensadhaka.com${option.href}`,
        })),
    };

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

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="choose-between-bhakti-jnana-karma-raja-yoga" pillar="seo-chooser" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Choose Between Bhakti, Jnana, Karma, and Raja Yoga", href: "/choose-between-bhakti-jnana-karma-raja-yoga" },
                        ]}
                    />

                    <header className="mb-12 mt-6">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight">The <span className="text-orange-500">Chooser's Guide</span> to the Four Yogas</h1>
                        <div className="grid md:grid-cols-3 gap-8 items-start">
                            <div className="md:col-span-2 space-y-6">
                                <p className="text-2xl text-foreground font-medium leading-tight">
                                    Spiritual progress is not about finding the "best" system, but the system that best matches your current psychological momentum.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    The four paths of Sanatan Dharma were not created by different religions; they were engineered by the same Vedic masters to accommodate the four primary human archetypes: the Lover (Bhakti), the Thinker (Jnana), the Doer (Karma), and the Disciplinarian (Raja).
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Below is a decision matrix designed to help you bypass the noise and identify the path that fits your innate structure (Svadharma).
                                </p>
                            </div>
                            <div className="bg-orange-600/10 border border-orange-500/20 rounded-2xl p-6 hidden md:block">
                                <h3 className="text-orange-400 font-bold mb-2 uppercase text-xs tracking-widest">The "Neti-Neti" Test</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    If you prefer logic over ritual, start with <strong>Jnana</strong>. If you value action over sitting, start with <strong>Karma</strong>.
                                </p>
                            </div>
                        </div>
                    </header>

                    <section className="mb-20 rounded-3xl border border-border/60 bg-muted/10 p-10 overflow-hidden relative">
                        <h2 className="font-display text-4xl font-bold mb-10 text-center">Master Decision Matrix</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[900px] relative z-10">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Path</th>
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Vedic Concept</th>
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Primary Tool</th>
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Core Strength</th>
                                        <th className="py-4 text-orange-400 font-bold uppercase tracking-widest text-xs">The Challenge</th>
                                    </tr>
                                </thead>
                                <tbody className="text-lg">
                                    {options.map((option) => (
                                        <tr key={option.name} className="border-b last:border-b-0 border-border/50 align-top">
                                            <td className="py-6 pr-6 font-bold">{option.name.split(' (')[0]}</td>
                                            <td className="py-6 pr-6 text-sm italic text-muted-foreground">{option.vedicConcept}</td>
                                            <td className="py-6 pr-6 text-sm font-medium">{option.primaryTool}</td>
                                            <td className="py-6 pr-6 text-sm text-muted-foreground">{option.strength}</td>
                                            <td className="py-6 text-sm text-muted-foreground">{option.challenge}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="font-display text-4xl font-bold mb-12 text-center">Pathway Deep Dives</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {options.map((option) => (
                                <article key={option.name} className="flex flex-col rounded-3xl border border-border/60 bg-card p-8 hover:border-orange-500/30 transition-all group shadow-sm hover:shadow-xl">
                                    <h3 className="text-3xl font-display font-bold mb-4">{option.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                                        {option.chooser}
                                    </p>
                                    <TrackedLink
                                        href={option.href}
                                        eventLabel={`chooser_option:choose-between-bhakti-jnana-karma-raja-yoga:${option.href}`}
                                        trackPathName={option.href.replace(/^\//, "")}
                                        className="inline-flex items-center text-orange-400 hover:text-orange-300 font-bold group-hover:translate-x-1 transition-transform"
                                    >
                                        Master {option.name.split(' (')[0]} <ArrowRight className="ml-2 w-5 h-5" />
                                    </TrackedLink>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mb-20 prose prose-invert max-w-none border-y border-border/40 py-20">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-display text-4xl font-bold mb-10 text-center">The Power of Synthesis</h2>
                            <p className="text-xl leading-relaxed mb-8">
                                While one path usually dominates your temperament, the Vedic tradition recommends a <strong>Synthesis of Yoga</strong> to ensure balanced growth.
                                Pure Jnana (Head) without Bhakti (Heart) leads to dry intellectualism. Pure Bhakti without Karma (Hands) leads to sentimental passivity.
                            </p>
                            <div className="bg-orange-600/5 border border-orange-500/20 p-8 rounded-3xl">
                                <h4 className="text-orange-400 font-bold mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                                    A Recommended "Beginner Stack"
                                </h4>
                                <ul className="space-y-4 text-muted-foreground m-0 list-none p-0">
                                    <li className="flex gap-4"><strong>07:00 AM:</strong> 15 mins of Raja Yoga (Meditation) to stabilize the day.</li>
                                    <li className="flex gap-4"><strong>09:00 AM - 05:00 PM:</strong> Karma Yoga (Mindful work) as your primary practice.</li>
                                    <li className="flex gap-4"><strong>08:00 PM:</strong> 10 mins of Bhakti Yoga (Mantra/Prayer) to vent emotional stress.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20 shadow-2xl overflow-hidden relative rounded-3xl border border-orange-900/40 bg-gradient-to-br from-orange-950/20 to-background p-12 text-center">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-display font-bold mb-4">Unsure about your dominant driver?</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                                The <strong>Faith Finder</strong> maps your personality to these four paths, giving you a custom starting plan designed for your specific "Vasanas" (latent tendencies).
                            </p>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="chooser_cta:choose-between-bhakti-jnana-karma-raja-yoga:faith-finder"
                                trackPathName="faith-finder"
                                className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-10 py-5 text-white font-bold text-xl transition-all"
                            >
                                Take the Assessment <ArrowRight className="ml-2 w-6 h-6" />
                            </TrackedLink>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="font-display text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm">
                                    <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed italic border-l-2 border-orange-500/30 pl-4">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-border/60 bg-muted/5 p-8">
                        <h2 className="font-display text-2xl font-bold mb-6">Authoritative references</h2>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {references.map((reference) => (
                                <li key={reference.href}>
                                    <a href={reference.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-400 font-medium transition-colors">
                                        {reference.label}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}