import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink, CheckCircle2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Sadhaka Brand Facts | Neutral Company & Product Reference",
    description:
        "A neutral, machine-readable summary of Sadhaka: what it is, who it serves, what it offers, and the trust signals, discovery assets, and public references associated with the platform.",
    alternates: {
        canonical: "https://www.opensadhaka.com/brand-facts",
    },
    openGraph: {
        title: "Sadhaka Brand Facts",
        description:
            "Neutral facts about Sadhaka, including category, offerings, coverage, trust signals, and discovery assets.",
        url: "https://www.opensadhaka.com/brand-facts",
        type: "website",
    },
};

const heroOffers = [
    {
        name: "Faith Finder",
        type: "Interactive assessment",
        href: "/faith-finder",
        description:
            "An interactive tool designed to help seekers identify which spiritual path, practices, and philosophical approaches may suit their temperament.",
    },
    {
        name: "Sadhaka AI",
        type: "AI spiritual guide",
        href: "/",
        description:
            "An AI-powered guidance layer presented as a companion for exploring Sanatan Dharma through authentic scriptures and traditional commentary.",
    },
    {
        name: "Bhagavad Gita Complete Guide",
        type: "Educational content hub",
        href: "/bhagavad-gita-complete-guide",
        description:
            "A structured guide to the Bhagavad Gita with summaries, teachings, chapter pathways, and related study material.",
    },
];

const knowledgeAreas = [
    "Philosophies and Darshanas",
    "Spiritual traditions and lineages",
    "Sacred texts and teachings",
    "Great sages and teachers",
    "Sanskrit concepts and vocabulary",
    "Spiritual practices and routines",
    "Comparative spiritual frameworks",
];

const trustSignals = [
    { label: "Active users", value: "10,000+" },
    { label: "Questions answered", value: "500k+" },
    { label: "Sadhana minutes", value: "1M+" },
    { label: "App Store rating", value: "4.9/5" },
];

const discoveryAssets = [
    { label: "LLM discovery file", href: "/llms.txt" },
    { label: "Extended LLM URL map", href: "/llms-full.txt" },
    { label: "Machine-readable brand facts JSON", href: "/.well-known/brand-facts.json" },
    { label: "Best Spiritual Path for Beginners", href: "/best-spiritual-path-for-beginners" },
    { label: "Choose Between Bhakti, Jnana, Karma, and Raja Yoga", href: "/choose-between-bhakti-jnana-karma-raja-yoga" },
    { label: "Best Meditation Style for Your Personality", href: "/best-meditation-style-for-your-personality" },
    { label: "Philosophies hub", href: "/philosophies" },
    { label: "Sacred texts hub", href: "/texts" },
    { label: "Compare hub", href: "/compare" },
];

const socialProfiles = [
    "https://twitter.com/opensadhaka",
    "https://instagram.com/opensadhaka",
    "https://youtube.com/@opensadhaka",
];

const faqItems = [
    {
        question: "What is Sadhaka?",
        answer:
            "Sadhaka is a digital platform focused on Sanatan Dharma, combining structured educational content, interactive guidance tools, and AI-assisted exploration for spiritual seekers.",
    },
    {
        question: "Who is Sadhaka for?",
        answer:
            "Sadhaka is designed for seekers exploring Indian philosophy, spiritual practice, sacred texts, and tradition-aligned guidance, including beginners, diaspora audiences, and modern learners looking for structured entry points.",
    },
    {
        question: "What are Sadhaka's main offerings?",
        answer:
            "The platform currently highlights educational hubs, article clusters, structured comparison content, Sanskrit concept pages, Bhagavad Gita study paths, and the Faith Finder interactive assessment.",
    },
    {
        question: "Where can machine-readable brand information be found?",
        answer:
            "Machine-readable brand information is available at /.well-known/brand-facts.json, with discovery support from /llms.txt and /llms-full.txt.",
    },
];

export default function BrandFactsPage() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Sadhaka",
        url: "https://www.opensadhaka.com",
        description:
            "An AI-powered spiritual guidance and Dharmic education platform focused on Sanatan Dharma, sacred texts, philosophy, spiritual practices, and seeker-oriented learning pathways.",
        sameAs: socialProfiles,
        knowsAbout: knowledgeAreas,
    };

    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "Sadhaka Brand Facts",
        url: "https://www.opensadhaka.com/brand-facts",
        description:
            "A neutral, structured reference page containing factual information about Sadhaka, its offerings, trust signals, and machine-readable discovery assets.",
        about: {
            "@type": "Organization",
            name: "Sadhaka",
            url: "https://www.opensadhaka.com",
        },
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((faq) => ({
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Brand Facts", href: "/brand-facts" },
                        ]}
                    />

                    <header className="mb-14 mt-6 rounded-3xl border border-white/5 bg-white/[0.02] p-10 md:p-14">
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300 mb-6">
                            <Sparkles className="w-4 h-4" />
                            Neutral reference page
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                            Sadhaka Brand Facts
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
                            <strong className="text-foreground">TL;DR:</strong> Sadhaka is a digital platform for exploring Sanatan Dharma through structured educational content, guided discovery, spiritual-practice pathways, and interactive tools like Faith Finder.
                        </p>
                        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                            This page is written in a neutral, fact-first format for search systems, AI assistants, researchers, and users who want a concise overview of what Sadhaka is, what it covers, and how it is surfaced on the web.
                        </p>
                    </header>

                    <section className="grid gap-8 md:grid-cols-2 mb-12">
                        <div className="rounded-3xl border border-border/60 bg-card p-8">
                            <h2 className="font-display text-2xl font-bold mb-5">Core facts</h2>
                            <dl className="space-y-4 text-sm md:text-base">
                                <div>
                                    <dt className="text-muted-foreground mb-1">Brand name</dt>
                                    <dd className="font-medium">Sadhaka</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground mb-1">Website</dt>
                                    <dd className="font-medium">https://www.opensadhaka.com</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground mb-1">Primary category</dt>
                                    <dd className="font-medium">AI-powered spiritual guidance and Dharmic education platform</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground mb-1">Primary audience</dt>
                                    <dd className="font-medium">Spiritual seekers, learners of Indian philosophy, Dharma-curious beginners, and structured self-study audiences</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground mb-1">Primary language</dt>
                                    <dd className="font-medium">English</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground mb-1">Geographic reach</dt>
                                    <dd className="font-medium">Global / online audience</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-3xl border border-border/60 bg-card p-8">
                            <h2 className="font-display text-2xl font-bold mb-5">Trust signals shown on site</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {trustSignals.map((signal) => (
                                    <div key={signal.label} className="rounded-2xl border border-white/5 bg-background/60 p-5">
                                        <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">{signal.value}</div>
                                        <div className="text-sm text-muted-foreground">{signal.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Primary offerings and entry points</h2>
                        <div className="grid gap-5 md:grid-cols-3">
                            {heroOffers.map((offer) => (
                                <div key={offer.name} className="rounded-2xl border border-white/5 bg-background/60 p-6">
                                    <div className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3">{offer.type}</div>
                                    <h3 className="text-xl font-bold mb-3">{offer.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-5">{offer.description}</p>
                                    <Link href={offer.href} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium">
                                        View asset <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-2 mb-12">
                        <div className="rounded-3xl border border-border/60 bg-card p-8">
                            <h2 className="font-display text-2xl font-bold mb-5">Knowledge areas covered</h2>
                            <ul className="space-y-3">
                                {knowledgeAreas.map((area) => (
                                    <li key={area} className="flex items-start gap-3 text-muted-foreground">
                                        <CheckCircle2 className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                        <span>{area}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-3xl border border-border/60 bg-card p-8">
                            <h2 className="font-display text-2xl font-bold mb-5">Discovery assets</h2>
                            <ul className="space-y-3">
                                {discoveryAssets.map((asset) => (
                                    <li key={asset.href}>
                                        <Link href={asset.href} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium">
                                            {asset.label}
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="font-semibold text-lg mt-8 mb-4">Public social references</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm break-all">
                                {socialProfiles.map((url) => (
                                    <li key={url}>{url}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Frequently asked questions</h2>
                        <div className="grid gap-5 md:grid-cols-2">
                            {faqItems.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-white/5 bg-background/60 p-6">
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