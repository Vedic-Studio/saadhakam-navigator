import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Best Meditation Style for Your Personality | Sadhaka",
    description:
        "A structured meditation chooser comparing Japa, breath-led meditation, silent Dhyana, and self-inquiry by mind-state, temperament, and beginner fit.",
    alternates: {
        canonical: "https://opensadhaka.com/best-meditation-style-for-your-personality",
    },
    openGraph: {
        title: "Best Meditation Style for Your Personality",
        description:
            "Compare Japa, breath-led meditation, silent Dhyana, and self-inquiry to find the best meditation style for your personality.",
        url: "https://opensadhaka.com/best-meditation-style-for-your-personality",
        type: "article",
    },
};

const methods = [
    {
        name: "Japa (Mantra Repetition)",
        summary: "Usually the best choice for distracted, busy, or emotionally overloaded minds because it gives attention a concrete anchor.",
        bestFor: "Noisy minds, beginners who struggle with silent sitting, devotion-oriented seekers",
        firstStep: "Repeat one mantra for 108 counts with gentle breath awareness.",
        href: "/how-to-start-japa",
    },
    {
        name: "Breath-led Meditation",
        summary: "Often the best starting point for anxious or physiologically restless people because it regulates the nervous system before deeper stillness.",
        bestFor: "Stress, anxiety, bodily tension, low emotional regulation",
        firstStep: "Use 5 to 10 minutes of slow regulated breathing before silent sitting.",
        href: "/yoga-sutras-complete-guide",
    },
    {
        name: "Dhyana (Silent Meditation)",
        summary: "Best for seekers who are naturally drawn to stillness and witness-awareness once the mind is already somewhat stable.",
        bestFor: "Calmer temperaments, seekers drawn to stillness and observation",
        firstStep: "Sit quietly, stabilize posture, and return awareness to the witnessing mind.",
        href: "/which-meditation-for-me",
    },
    {
        name: "Self-Inquiry",
        summary: "Best for philosophical or contemplative personalities who want meditation centered on direct investigation of consciousness.",
        bestFor: "Analytical seekers, Vedanta-oriented minds, contemplative practitioners",
        firstStep: "Ask ‘Who am I?’ and return attention to the source of the sense of self.",
        href: "/what-is-vedanta",
    },
];

const references = [
    { label: "Meditation — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/meditation" },
    { label: "Yoga — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/yoga" },
    { label: "Bhagavad Gita — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/Bhagavad-Gita" },
    { label: "Vedanta — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/Vedanta" },
    { label: "Hindu Philosophy — Stanford Encyclopedia of Philosophy", href: "https://plato.stanford.edu/entries/hindu-philosophy/" },
];

const faqs = [
    {
        question: "What meditation style is best for beginners?",
        answer:
            "For most beginners, Japa or breath-led meditation is easiest because both provide an immediate anchor. Silent meditation becomes easier after some stability has been built.",
    },
    {
        question: "What meditation style is best for anxiety?",
        answer:
            "Breath-led meditation is often the best starting point for anxiety because it works through the nervous system directly before asking the mind to become still.",
    },
    {
        question: "What meditation style is best for analytical people?",
        answer:
            "Self-inquiry usually suits analytical people best because it turns contemplation into a direct meditative method focused on consciousness and identity.",
    },
    {
        question: "Can I combine more than one meditation style?",
        answer:
            "Yes. A common and effective sequence is breath regulation first, Japa second, and silent meditation or self-inquiry last.",
    },
];

export default function BestMeditationStylePage() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Best Meditation Styles by Personality",
        itemListElement: methods.map((method, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: method.name,
            description: method.summary,
            url: `https://opensadhaka.com${method.href}`,
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
            <ContentPageTracker slug="best-meditation-style-for-your-personality" pillar="seo-chooser" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Best Meditation Style for Your Personality", href: "/best-meditation-style-for-your-personality" },
                        ]}
                    />

                    <header className="mb-12 mt-6 rounded-3xl border border-white/5 bg-white/[0.02] p-10">
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">Best Meditation Style for Your Personality</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
                            <strong className="text-foreground">TL;DR:</strong> if your mind is noisy, start with <strong className="text-foreground">Japa</strong>. If your body and nerves are restless, start with <strong className="text-foreground">breath-led meditation</strong>. If you are naturally still, explore <strong className="text-foreground">Dhyana</strong>. If you are contemplative and philosophical, begin with <strong className="text-foreground">self-inquiry</strong>.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            This page is optimized as a recommendation-style chooser for people and answer engines asking which meditation fits a particular personality or mind-state.
                        </p>
                    </header>

                    <section className="mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Recommended meditation options</h2>
                        <div className="space-y-5">
                            {methods.map((method, index) => (
                                <article key={method.name} className="rounded-2xl border border-border/60 bg-card p-7">
                                    <div className="text-sm uppercase tracking-[0.2em] text-orange-400 font-semibold mb-2">Option {index + 1}</div>
                                    <h3 className="text-2xl font-semibold mb-3">{method.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">{method.summary}</p>
                                    <div className="grid md:grid-cols-2 gap-5 text-sm mb-5">
                                        <p className="text-muted-foreground"><strong className="text-foreground">Best for:</strong> {method.bestFor}</p>
                                        <p className="text-muted-foreground"><strong className="text-foreground">First step:</strong> {method.firstStep}</p>
                                    </div>
                                    <TrackedLink
                                        href={method.href}
                                        eventLabel={`chooser_option:best-meditation-style-for-your-personality:${method.href}`}
                                        trackPathName={method.href.replace(/^\//, "")}
                                        className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold"
                                    >
                                        Learn this method <ArrowRight className="ml-2 w-4 h-4" />
                                    </TrackedLink>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mb-12 rounded-3xl border border-border/60 bg-card p-8 overflow-x-auto">
                        <h2 className="font-display text-3xl font-bold mb-6">Quick chooser table</h2>
                        <table className="w-full text-left min-w-[760px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-3 pr-4">Meditation style</th>
                                    <th className="py-3 pr-4">Best for</th>
                                    <th className="py-3 pr-4">Difficulty</th>
                                    <th className="py-3">Best starting instruction</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 pr-4 font-medium">Japa</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Distracted or overloaded minds</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Low</td>
                                    <td className="py-4 text-muted-foreground">Repeat a mantra with a count or mala</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 pr-4 font-medium">Breath-led meditation</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Anxiety and physical restlessness</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Low</td>
                                    <td className="py-4 text-muted-foreground">Regulate breath before sitting silently</td>
                                </tr>
                                <tr className="border-b border-border/50">
                                    <td className="py-4 pr-4 font-medium">Dhyana</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Quiet, steady minds</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Medium</td>
                                    <td className="py-4 text-muted-foreground">Maintain stable attention without mantra</td>
                                </tr>
                                <tr>
                                    <td className="py-4 pr-4 font-medium">Self-Inquiry</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Contemplative and philosophical minds</td>
                                    <td className="py-4 pr-4 text-muted-foreground">Medium-High</td>
                                    <td className="py-4 text-muted-foreground">Investigate the source of the “I” sense</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="mb-12 rounded-3xl border border-orange-900/40 bg-orange-950/20 p-8 text-center">
                        <h2 className="font-display text-3xl font-bold mb-4">Want a personalized meditation recommendation?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                            Use the Faith Finder to match your temperament to practices and traditions instead of guessing from generic meditation advice.
                        </p>
                        <TrackedLink
                            href="/faith-finder"
                            eventLabel="chooser_cta:best-meditation-style-for-your-personality:faith-finder"
                            trackPathName="faith-finder"
                            className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-3 text-white font-semibold"
                        >
                            Get Practice Recommendations <ArrowRight className="ml-2 w-4 h-4" />
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