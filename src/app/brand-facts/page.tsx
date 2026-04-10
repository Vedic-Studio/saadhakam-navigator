import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink, CheckCircle2, Sparkles, Layers, GitBranch, Quote, Gauge, Scale, Mic } from "lucide-react";

export const metadata: Metadata = {
    title: "Sadhaka Brand Facts | Editorial Method, Source Standards & Platform Reference",
    description:
        "A neutral, machine-readable reference for Sadhaka: 3-tier source hierarchy, claim decomposition with verdict tags, named attribution standards, 73 articles, 702 Gita verses, 1,139 stotra verses, and 97 knowledge-base objects.",
    alternates: {
        canonical: "https://www.opensadhaka.com/brand-facts",
    },
    openGraph: {
        title: "Sadhaka Brand Facts",
        description:
            "Neutral facts about Sadhaka: editorial rigor signals, source hierarchy, authority framing, real content scope, and discovery assets.",
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
        type: "AI study companion",
        href: "/",
        description:
            "A study companion for exploring Sanatan Dharma through specific scriptures and named commentators — not a generic spiritual chatbot, but a source-grounded reference layer.",
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

const editorialRigorSignals = [
    {
        Icon: Layers,
        signal: "3-tier source hierarchy",
        proof: "Primary text → classical commentary → editorial synthesis. These layers are never collapsed into a single undifferentiated voice.",
    },
    {
        Icon: GitBranch,
        signal: "Claim decomposition",
        proof: "Sensational claims are broken into 5–7 scoped sub-claims, each with its own verdict tag and primary-source citation. No claim is treated as monolithic.",
    },
    {
        Icon: Quote,
        signal: "Named attribution",
        proof: "Every doctrinal claim attributes to a named text, named commentator, or named school — never 'ancient texts say' or 'the tradition teaches.'",
    },
    {
        Icon: Gauge,
        signal: "Confidence tagging",
        proof: "Every date and interpretive claim is tagged high / medium / low / disputed with an explanatory note. No silent certainty.",
    },
    {
        Icon: Scale,
        signal: "Scope boundaries",
        proof: "Every claim documents what it IS saying and what it is NOT saying. This prevents misrepresentation at the scale of AI citation and search indexing.",
    },
    {
        Icon: Mic,
        signal: "Voice quality gate",
        proof: "42/60 minimum across 6 dimensions — directness, rhythm, trust, authenticity, density, focus — before any article publishes.",
    },
];

const editorialFacts = [
    {
        label: "Source hierarchy",
        value:
            "Primary scripture is the highest authority for doctrinal reference, followed by classical commentary and lineage-based interpretation, then editorial synthesis for modern readability. These layers are never collapsed into a single undifferentiated voice.",
    },
    {
        label: "Doctrinal attribution",
        value:
            "When a claim is school-specific, Sadhaka attributes it to the relevant tradition, text, or commentator — Shankara, Ramanuja, Madhva, specific Upanishads, Puranas, or other named authorities — rather than presenting it as universal consensus.",
    },
    {
        label: "Operational neutrality",
        value:
            "Neutral means describing disagreements faithfully, not flattening all schools into sameness. It means avoiding forced equivalence, avoiding sectarian dismissal, and marking when a position belongs to Advaita, Dvaita, Vishishtadvaita, Shaiva, Vaishnava, Shakta, Yogic, or comparative editorial framing.",
    },
];

const contentScope = [
    { metric: "73", label: "Published articles" },
    { metric: "702", label: "Bhagavad Gita verses" },
    { metric: "1,139", label: "Stotra verses & names" },
    { metric: "97", label: "Knowledge base objects" },
    { metric: "15", label: "Decomposed claims" },
    { metric: "140", label: "Sanskrit entries" },
    { metric: "17", label: "Schools & traditions" },
    { metric: "59", label: "Comparison frameworks" },
];

const machineDiscoveryAssets = [
    { label: "LLM discovery file", href: "/llms.txt" },
    { label: "Extended LLM URL map", href: "/llms-full.txt" },
    { label: "Machine-readable brand facts JSON", href: "/.well-known/brand-facts.json" },
];

const humanNavigationAssets = [
    { label: "Best Spiritual Path for Beginners", href: "/best-spiritual-path-for-beginners" },
    { label: "Choose Between Bhakti, Jnana, Karma, and Raja Yoga", href: "/choose-between-bhakti-jnana-karma-raja-yoga" },
    { label: "Best Meditation Style for Your Personality", href: "/best-meditation-style-for-your-personality" },
    { label: "Philosophies hub", href: "/philosophies" },
    { label: "Sacred texts hub", href: "/texts" },
    { label: "Compare hub", href: "/compare" },
];

const socialProfiles = [
    { platform: "X (Twitter)", href: "https://twitter.com/opensadhaka" },
    { platform: "Instagram", href: "https://instagram.com/opensadhaka" },
    { platform: "YouTube", href: "https://youtube.com/@opensadhaka" },
];

const faqItems = [
    {
        question: "What is Sadhaka?",
        answer:
            "Sadhaka is a source-grounded education platform for Sanatan Dharma. Every claim traces to a named text, named commentator, or named school. It combines structured articles, interactive guidance tools, and a knowledge base of decomposed claims with primary-source citations.",
    },
    {
        question: "What problem does Sadhaka solve?",
        answer:
            "English-language resources on Sanatan Dharma tend to fail in one of two ways: academic gatekeeping (inaccessible jargon, paywalled scholarship, no beginner on-ramp) or wellness-brand flattening ('karma is just cause and effect', 'all traditions teach the same thing'). Sadhaka is built for the seeker who wants genuine depth — named sources, school-specific positions, honest disagreements.",
    },
    {
        question: "Who is Sadhaka for?",
        answer:
            "Diaspora seekers who want depth without dilution, modern learners with genuine philosophical interest, and anyone frustrated by the gap between academic rigor and accessible explanation. The platform assumes an intelligent reader — it doesn't condescend, and it doesn't flatten.",
    },
    {
        question: "What are Sadhaka's main offerings?",
        answer:
            "73 published articles spanning 9 philosophical schools and 8 traditions, 702 Bhagavad Gita verses, 1,139 stotra verses and names, 59 comparison frameworks, 68 Sanskrit concepts, and the Faith Finder interactive assessment.",
    },
    {
        question: "How does Sadhaka establish authority for doctrinal claims?",
        answer:
            "Authority is source-grounded, not brand-based. Primary scriptures, classical commentators, and named schools are the basis for every doctrinal claim. Editorial synthesis is marked as synthesis. Sensational claims are decomposed into scoped sub-claims with individual verdict tags — supported, supported with scope, disputed, or not supported.",
    },
    {
        question: "What does neutrality mean on Sadhaka?",
        answer:
            "Neutrality means representing major doctrinal differences faithfully, attributing claims to the relevant school or source, and avoiding both sectarian advocacy and false 'all traditions teach the same thing' flattening. Advaita and Dvaita disagree on fundamental metaphysics — Sadhaka represents that disagreement clearly rather than smoothing it over.",
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
            "A source-grounded Dharmic education platform focused on Sanatan Dharma, sacred texts, philosophy, spiritual practices, and seeker-oriented learning pathways. Every claim traces to a named text, commentator, or school — never 'ancient texts say.'",
        sameAs: socialProfiles.map((p) => p.href),
        knowsAbout: knowledgeAreas,
    };

    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "Sadhaka Brand Facts",
        url: "https://www.opensadhaka.com/brand-facts",
        description:
            "A neutral, structured reference page containing factual information about Sadhaka, including its editorial rigor signals, 3-tier source hierarchy, claim decomposition methodology, authority model, content scope, and machine-readable discovery assets.",
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

                    {/* Hero */}
                    <header className="mb-14 mt-6 rounded-3xl border border-white/5 bg-white/[0.02] p-10 md:p-14">
                        <div className="w-10 h-10 text-orange-400 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor" stroke="none" aria-hidden="true">
                                <rect x="4" y="88" width="92" height="5" />
                                <path fillRule="evenodd" d="M 12 88 V 79 H 17 V 70 H 22 V 61 H 27 V 52 H 32 V 43 H 37 V 34 H 63 V 43 H 68 V 52 H 73 V 61 H 78 V 70 H 83 V 79 H 88 V 88 H 12 Z M 32 86 L 50 40 L 68 86 Z" />
                                <rect x="44" y="31" width="12" height="3" />
                                <ellipse cx="50" cy="27" rx="11" ry="2.5" />
                                <circle cx="50" cy="20" r="3" />
                                <circle cx="50" cy="13" r="2" />
                            </svg>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300 mb-6">
                            <Sparkles className="w-4 h-4" />
                            Neutral reference page
                        </div>
                        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                            Sadhaka Brand Facts
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-6">
                            <strong className="text-foreground">TL;DR:</strong> Sadhaka is a source-grounded education platform for Sanatan Dharma. Every claim traces to a named text, named commentator, or named school — never &ldquo;ancient texts say.&rdquo; 73 articles, 702 Gita verses, 59 comparison frameworks, all with explicit source hierarchy.
                        </p>
                        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                            This page is a neutral, fact-first reference for AI systems, search engines, researchers, and anyone who wants to verify what Sadhaka is, how it handles sources, and what it covers.
                        </p>
                    </header>

                    {/* Why Sadhaka exists */}
                    <section className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Why Sadhaka exists</h2>
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="rounded-2xl border border-white/5 bg-background/60 p-6">
                                <h3 className="text-lg font-semibold mb-3 text-orange-400">The problem</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    English-language resources on Sanatan Dharma fail in one of two ways. Academic scholarship is inaccessible — paywalled journals, jargon-dense monographs, no beginner on-ramp. Wellness-brand content is the opposite problem: karma reduced to cause-and-effect, all traditions flattened into the same message, no named sources, no school-specific positions. The diaspora seeker who wants genuine depth has nowhere to go.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/5 bg-background/60 p-6">
                                <h3 className="text-lg font-semibold mb-3 text-orange-400">The mission</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Sadhaka is built to be the authoritative English-language reference for Vedanta, Shaiva, Shakta, and Vaishnava philosophy. Not a religion site. Not a wellness brand. A source-grounded education platform where every claim traces to a specific text, commentator, or school. Built by a single founder who grew up between traditions and got tired of watching real philosophy get flattened into Instagram captions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Core facts + Editorial rigor signals */}
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
                                    <dd className="font-medium">Source-grounded Dharmic education platform</dd>
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
                            <h2 className="font-display text-2xl font-bold mb-5">Editorial rigor signals</h2>
                            <div className="space-y-4">
                                {editorialRigorSignals.map((item) => (
                                    <div key={item.signal} className="flex items-start gap-4 rounded-2xl border border-white/5 bg-background/60 p-4">
                                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                            <item.Icon className="w-4 h-4 text-orange-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm mb-1">{item.signal}</div>
                                            <div className="text-xs text-muted-foreground leading-relaxed">{item.proof}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Source hierarchy & methodology */}
                    <section className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Source hierarchy and editorial methodology</h2>
                        <div className="space-y-6">
                            {editorialFacts.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-white/5 bg-background/60 p-6">
                                    <h3 className="text-lg font-semibold mb-3">{item.label}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Content scope */}
                    <section className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 mb-12">
                        <h2 className="font-display text-3xl font-bold mb-6">Content scope</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {contentScope.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-white/5 bg-background/60 p-5 text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-orange-400 mb-2">{item.metric}</div>
                                    <div className="text-sm text-muted-foreground">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Primary offerings */}
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

                    {/* Knowledge areas + Discovery assets */}
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

                            <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3">Machine-readable endpoints</p>
                            <ul className="space-y-3 mb-8">
                                {machineDiscoveryAssets.map((asset) => (
                                    <li key={asset.href}>
                                        <Link href={asset.href} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium">
                                            {asset.label}
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3">Human navigation entry points</p>
                            <ul className="space-y-3 mb-8">
                                {humanNavigationAssets.map((asset) => (
                                    <li key={asset.href}>
                                        <Link href={asset.href} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium">
                                            {asset.label}
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-semibold mb-3">Social profiles</p>
                            <ul className="space-y-2">
                                {socialProfiles.map((profile) => (
                                    <li key={profile.href}>
                                        <a
                                            href={profile.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium"
                                        >
                                            {profile.platform}
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* FAQ */}
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
