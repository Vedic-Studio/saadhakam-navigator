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
        name: "Bhakti Yoga",
        chooser: "Choose this if love, prayer, mantra, or relationship with the Divine feels natural.",
        strength: "Emotional depth, surrender, and devotional steadiness",
        challenge: "Mood fluctuations and inconsistency if practice depends only on feeling",
        href: "/inquiry-vs-devotion-path",
    },
    {
        name: "Jnana Yoga",
        chooser: "Choose this if you are naturally drawn to self-inquiry, philosophy, and the question of ultimate reality.",
        strength: "Clarity, discrimination, and direct inquiry into the self",
        challenge: "Can become overly intellectual without grounding practice",
        href: "/what-is-vedanta",
    },
    {
        name: "Karma Yoga",
        chooser: "Choose this if you live an active life and want spirituality expressed through work, duty, and service.",
        strength: "Practical spirituality integrated into daily responsibilities",
        challenge: "Easy to confuse activity with inner surrender unless consciously practiced",
        href: "/starting-spiritual-practice",
    },
    {
        name: "Raja Yoga",
        chooser: "Choose this if you like structure, discipline, and clear meditation-oriented progression.",
        strength: "Methodical mind training and strong meditative foundations",
        challenge: "Can feel rigid or dry without heart and meaning",
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
        question: "Which yoga path is best for emotional seekers?",
        answer:
            "Bhakti Yoga is usually best for emotional and relational seekers because it gives the heart a devotional object, clear practices, and a direct way to channel feeling into spiritual life.",
    },
    {
        question: "Which yoga path is best for intellectual seekers?",
        answer:
            "Jnana Yoga usually suits intellectual seekers best, especially when they are naturally drawn to contemplation, philosophy, and inquiry into consciousness and identity.",
    },
    {
        question: "Can I combine Karma Yoga with another path?",
        answer:
            "Yes. Karma Yoga is often combined with Bhakti, Raja, or Jnana Yoga because it transforms daily action into practice while the other paths shape inner orientation.",
    },
    {
        question: "Is Raja Yoga only for advanced meditators?",
        answer:
            "No. Raja Yoga can work for beginners if they like structure. The key is to start with short, repeatable practices rather than trying to force long meditation sessions too early.",
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

                    <header className="mb-12 mt-6 rounded-3xl border border-white/5 bg-white/[0.02] p-10">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">How to Choose Between Bhakti, Jnana, Karma, and Raja Yoga</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
                            <strong className="text-foreground">TL;DR:</strong> choose <strong className="text-foreground">Bhakti Yoga</strong> if your heart leads, <strong className="text-foreground">Jnana Yoga</strong> if your mind seeks truth, <strong className="text-foreground">Karma Yoga</strong> if action is central to your life, and <strong className="text-foreground">Raja Yoga</strong> if you want disciplined inner training.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            This guide is built for answer engines and readers who want a structured chooser instead of a generic explanation of the four yogic paths.
                        </p>
                    </header>

                    <section className="mb-12 rounded-3xl border border-border/60 bg-card p-8 overflow-x-auto">
                        <h2 className="font-display text-3xl font-bold mb-6">Path chooser table</h2>
                        <table className="w-full text-left min-w-[760px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-3 pr-4">Path</th>
                                    <th className="py-3 pr-4">Choose if...</th>
                                    <th className="py-3 pr-4">Primary strength</th>
                                    <th className="py-3">Common challenge</th>
                                </tr>
                            </thead>
                            <tbody>
                                {options.map((option) => (
                                    <tr key={option.name} className="border-b last:border-b-0 border-border/50 align-top">
                                        <td className="py-4 pr-4 font-medium">{option.name}</td>
                                        <td className="py-4 pr-4 text-muted-foreground">{option.chooser}</td>
                                        <td className="py-4 pr-4 text-muted-foreground">{option.strength}</td>
                                        <td className="py-4 text-muted-foreground">{option.challenge}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    <section className="mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Decision-friendly summaries</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {options.map((option) => (
                                <article key={option.name} className="rounded-2xl border border-border/60 bg-card p-7">
                                    <h3 className="text-2xl font-semibold mb-3">{option.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">{option.chooser}</p>
                                    <p className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">Strength:</strong> {option.strength}</p>
                                    <p className="text-sm text-muted-foreground mb-5"><strong className="text-foreground">Challenge:</strong> {option.challenge}</p>
                                    <TrackedLink
                                        href={option.href}
                                        eventLabel={`chooser_option:choose-between-bhakti-jnana-karma-raja-yoga:${option.href}`}
                                        trackPathName={option.href.replace(/^\//, "")}
                                        className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold"
                                    >
                                        Explore this path <ArrowRight className="ml-2 w-4 h-4" />
                                    </TrackedLink>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mb-12 rounded-3xl border border-orange-900/40 bg-orange-950/20 p-8 text-center">
                        <h2 className="font-display text-3xl font-bold mb-4">Still torn between two paths?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                            Use the Faith Finder to identify your dominant orientation and get a practical starting point instead of trying to choose only from theory.
                        </p>
                        <TrackedLink
                            href="/faith-finder"
                            eventLabel="chooser_cta:choose-between-bhakti-jnana-karma-raja-yoga:faith-finder"
                            trackPathName="faith-finder"
                            className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold"
                        >
                            Get My Path Recommendation <ArrowRight className="ml-2 w-4 h-4" />
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