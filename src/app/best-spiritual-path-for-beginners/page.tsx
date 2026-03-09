import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Best Spiritual Path for Beginners? A Neutral Guide | Sadhaka",
    description:
        "Telling an emotional person to use pure logic creates dryness. Telling an active person to sit still creates frustration. Compare the four classical paths of Sanatan Dharma to find the one that matches your temperament.",
    alternates: {
        canonical: "https://opensadhaka.com/best-spiritual-path-for-beginners",
    },
    openGraph: {
        title: "Best Spiritual Path for Beginners?",
        description:
            "Telling an emotional person to use pure logic creates dryness. Telling an active person to sit still creates frustration. Compare the four paths of Sanatan Dharma to find the one that matches your temperament.",
        url: "https://opensadhaka.com/best-spiritual-path-for-beginners",
        type: "article",
    },
};

const paths = [
    {
        name: "Bhakti Yoga",
        summary: "The most accessible entry point if your primary mode of engaging the world is emotional. It does not require building a perfect philosophical framework; it requires directing existing emotional energy toward the Divine.",
        bestFor: "Heart-led seekers, devotional personalities, and those who need a tangible relational anchor.",
        firstStep: "Start with one daily mantra, one simple prayer, or a 10-minute dedicated devotional practice.",
        href: "/inquiry-vs-devotion-path",
    },
    {
        name: "Karma Yoga",
        summary: "The most practical path if you cannot abandon your daily responsibilities. Instead of retreating from action, you weaponize it. Every duty, when performed without attachment to the outcome, becomes the practice itself.",
        bestFor: "Busy professionals, householders, and action-oriented temperaments.",
        firstStep: "Choose one daily required responsibility and consciously perform it entirely without attachment to the result.",
        href: "/starting-spiritual-practice",
    },
    {
        name: "Raja Yoga",
        summary: "The path of systematic mental training. If you thrive on routine, structure, and verifiable physiological changes, this path relies on the precise regulation of breath and strict sequential meditation.",
        bestFor: "Structured learners, disciplined routines, and those seeking observable systemic progression.",
        firstStep: "Establish a non-negotiable daily routine of basic breath regulation and short seated meditation.",
        href: "/which-meditation-for-me",
    },
    {
        name: "Jnana Yoga",
        summary: "The path for those who demand logical rigor. It uses the intellect to dismantle its own false assumptions. It is the hardest to begin purely as an intellectual exercise, so it is best anchored with a stabilizing practice.",
        bestFor: "Analytical minds, contemplative seekers, and those driven by philosophical inquiry.",
        firstStep: "Begin foundational Vedanta study while sustaining a single stabilizing physical or meditative practice.",
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
            <ContentPageTracker slug="best-spiritual-path-for-beginners" pillar="seo-chooser" />
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
                            <strong className="text-foreground">TL;DR:</strong> The best spiritual path is the one you can sustain, not the one that sounds the most profound. If your primary mode is emotional, start with <strong className="text-foreground">Bhakti Yoga</strong>. If you are bound by heavy daily responsibilities, integrate <strong className="text-foreground">Karma Yoga</strong> into your actions. If you demand structured, step-by-step mental training, pursue <strong className="text-foreground">Raja Yoga</strong>. If you possess a highly analytical mind that requires logical deconstruction, begin with <strong className="text-foreground">Jnana Yoga</strong>.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            Telling a highly active, responsibility-bound person to sit in silent retreat for weeks is a recipe for frustration. Telling an intensely emotional person to dismantle their reality through pure logic creates dryness. The four classical paths of Sanatan Dharma were not designed to compete; they were designed specifically to match the four primary human temperaments. Choose the one that natively fits your current psychological structure.
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
                                    <TrackedLink
                                        href={path.href}
                                        eventLabel={`chooser_option:best-spiritual-path-for-beginners:${path.href}`}
                                        trackPathName={path.href.replace(/^\//, "")}
                                        className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold"
                                    >
                                        Explore this path <ArrowRight className="ml-2 w-4 h-4" />
                                    </TrackedLink>
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
                        <TrackedLink
                            href="/faith-finder"
                            eventLabel="chooser_cta:best-spiritual-path-for-beginners:faith-finder"
                            trackPathName="faith-finder"
                            className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold"
                        >
                            Take the Faith Finder <ArrowRight className="ml-2 w-4 h-4" />
                        </TrackedLink>
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