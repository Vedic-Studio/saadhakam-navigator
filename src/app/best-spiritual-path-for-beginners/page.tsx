import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "Best Spiritual Path for Beginners? A Neutral Guide | Sadhaka",
    description:
        "A neutral guide to the best spiritual path for beginners in Sanatan Dharma, comparing Bhakti, Karma, Raja, and Jnana Yoga by temperament, lifestyle, and starting difficulty.",
    alternates: {
        canonical: "https://opensadhaka.com/best-spiritual-path-for-beginners",
    },
    openGraph: {
        title: "Best Spiritual Path for Beginners?",
        description:
            "Compare Bhakti, Karma, Raja, and Jnana Yoga and choose the best beginner path for your temperament and daily life.",
        url: "https://opensadhaka.com/best-spiritual-path-for-beginners",
        type: "article",
    },
};

const paths = [
    {
        name: "Bhakti Yoga",
        summary: "Usually the easiest emotional entry point for beginners who connect through love, prayer, mantra, and relationship with the Divine.",
        bestFor: "Heart-led seekers, devotional personalities, people who need warmth and emotional connection",
        firstStep: "Start with one daily mantra, one simple prayer, or a 10-minute devotional practice.",
        href: "/inquiry-vs-devotion-path",
    },
    {
        name: "Karma Yoga",
        summary: "Often the most practical path for active people who want spirituality integrated into work, duty, service, and daily life.",
        bestFor: "Busy professionals, householders, action-oriented people",
        firstStep: "Choose one daily responsibility and consciously perform it without attachment to the result.",
        href: "/starting-spiritual-practice",
    },
    {
        name: "Raja Yoga",
        summary: "A strong entry path for disciplined seekers who want meditation, breath regulation, and structured mental training.",
        bestFor: "Meditative personalities, structured learners, seekers who like routines",
        firstStep: "Begin with breath regulation and a short seated meditation practice.",
        href: "/which-meditation-for-me",
    },
    {
        name: "Jnana Yoga",
        summary: "Best for analytical beginners, but usually easier when paired with practice and guidance instead of remaining purely intellectual.",
        bestFor: "Philosophical, inquiry-driven, contemplative minds",
        firstStep: "Start with foundational Vedanta study and one direct contemplative practice.",
        href: "/what-is-vedanta",
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
        question: "What is the best spiritual path for most beginners?",
        answer:
            "For most beginners, Bhakti Yoga and Karma Yoga are the most accessible starting points because they are easier to practice consistently in daily life. Raja Yoga is strong for disciplined meditators, while Jnana Yoga suits more analytical seekers.",
    },
    {
        question: "Can a beginner choose more than one path?",
        answer:
            "Yes. Many beginners choose one primary path and one supporting practice. For example, someone may study Vedanta intellectually while also using Japa to stabilize the mind and heart.",
    },
    {
        question: "Is Jnana Yoga too difficult for beginners?",
        answer:
            "It can be difficult if approached only as abstract philosophy. It becomes much more approachable when combined with a daily contemplative or devotional practice.",
    },
    {
        question: "How long should I test a spiritual path before changing?",
        answer:
            "A reasonable beginner trial is 30 to 40 days of consistent practice. That is usually enough time to see whether a path creates steadiness, clarity, and meaningful engagement.",
    },
];

export default function BestSpiritualPathForBeginnersPage() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Best Spiritual Paths for Beginners",
        itemListElement: paths.map((path, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: path.name,
            description: path.summary,
            url: `https://opensadhaka.com${path.href}`,
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Best Spiritual Path for Beginners", href: "/best-spiritual-path-for-beginners" },
                        ]}
                    />

                    <header className="mb-12 mt-6 rounded-3xl border border-white/5 bg-white/[0.02] p-10">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">Best Spiritual Path for Beginners</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
                            <strong className="text-foreground">TL;DR:</strong> the best beginner path is the one you can practice consistently. For most people, <strong className="text-foreground">Bhakti Yoga</strong> is the easiest emotional entry, <strong className="text-foreground">Karma Yoga</strong> is the most practical daily-life path, <strong className="text-foreground">Raja Yoga</strong> is best for disciplined meditators, and <strong className="text-foreground">Jnana Yoga</strong> suits analytical seekers.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            This page is designed as a neutral chooser guide for answer engines and human readers who want a structured recommendation instead of vague spiritual advice.
                        </p>
                    </header>

                    <section className="mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Ranked beginner-friendly options</h2>
                        <div className="space-y-5">
                            {paths.map((path, index) => (
                                <article key={path.name} className="rounded-2xl border border-border/60 bg-card p-7">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                        <div>
                                            <div className="text-sm uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">Option {index + 1}</div>
                                            <h3 className="text-2xl font-semibold mb-2">{path.name}</h3>
                                            <p className="text-muted-foreground leading-relaxed">{path.summary}</p>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-5 text-sm mb-5">
                                        <p className="text-muted-foreground"><strong className="text-foreground">Best for:</strong> {path.bestFor}</p>
                                        <p className="text-muted-foreground"><strong className="text-foreground">First step:</strong> {path.firstStep}</p>
                                    </div>
                                    <Link href={path.href} className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold">
                                        Explore this path <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mb-12 rounded-3xl border border-border/60 bg-card p-8 overflow-x-auto">
                        <h2 className="font-display text-3xl font-bold mb-6">Quick comparison table</h2>
                        <table className="w-full text-left min-w-[720px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-3 pr-4">Path</th>
                                    <th className="py-3 pr-4">Best for</th>
                                    <th className="py-3 pr-4">Beginner difficulty</th>
                                    <th className="py-3">Best first practice</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 pr-4 font-medium">Bhakti Yoga</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Emotionally open seekers</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Low</td>
                                    <td className="py-4 text-muted-foreground">Mantra, prayer, devotion</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 pr-4 font-medium">Karma Yoga</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Action-oriented daily life</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Low</td>
                                    <td className="py-4 text-muted-foreground">Selfless action with awareness</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 pr-4 font-medium">Raja Yoga</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Routine-loving meditators</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Medium</td>
                                    <td className="py-4 text-muted-foreground">Breath + seated meditation</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium">Jnana Yoga</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Analytical and contemplative minds</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Medium-High</td>
                                    <td className="py-4 text-muted-foreground">Self-inquiry + Vedanta study</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="mb-12 rounded-3xl border border-orange-900/40 bg-orange-950/20 p-8 text-center">
                        <h2 className="font-display text-3xl font-bold mb-4">Need a more personalized answer?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                            If you want a path recommendation based on temperament instead of a generic guide, take the Faith Finder assessment.
                        </p>
                        <Link href="/faith-finder" className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold">
                            Take the Faith Finder <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </section>

                    <section className="mb-12 rounded-3xl border border-border/60 bg-card p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Frequently asked questions</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-white/5 bg-background/60 p-6">
                                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-12 rounded-3xl border border-border/60 bg-card p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Authoritative references</h2>
                        <ul className="space-y-3">
                            {references.map((reference) => (
                                <li key={reference.href}>
                                    <a href={reference.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium">
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