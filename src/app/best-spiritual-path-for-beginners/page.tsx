import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
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
        name: "Bhakti Yoga (The Relational Path)",
        summary: "Bhakti Yoga is the most accessible entry point for those whose primary mode of engaging the world is through emotion and relationship. In the Vedic framework, it is defined as 'Paranuraktir-ishware'—supreme attachment to the Divine. It does not require complex philosophical training; instead, it transforms existing emotional energy (Kama) into devotional love (Preman). By directing one's innate capacity for love toward a personal form of the Divine, the practitioner bypasses the dryness of pure logic and achieves steady mental peace through surrender (Prapatti).",
        bestFor: "Heart-led seekers, relational personalities, and those who find comfort in ritual and mantra.",
        firstStep: "Begin with a daily 10-minute Japa practice or devotional reading of the Bhagavad Gita Chapter 12.",
        href: "/inquiry-vs-devotion-path",
    },
    {
        name: "Karma Yoga (The Active Path)",
        summary: "Karma Yoga is the essential path for those deeply embedded in the world of action and responsibility. It is defined in the Bhagavad Gita as 'Yogaḥ karmasu kauśalam'—excellence in action. Rather than retreating from life, the practitioner weaponizes their daily duties. By performing every task with total focus but zero attachment to the personal result, the actor dissolves the ego through the act itself. This is the primary path for modern professionals and householders who cannot afford long retreats but seek immediate spiritual integration.",
        bestFor: "Action-oriented individuals, busy professionals, and those with significant family/social duties.",
        firstStep: "Identify one repetitive chore and perform it with 100% presence, offering the result to the Absolute.",
        href: "/starting-spiritual-practice",
    },
    {
        name: "Raja Yoga (The Systematic Path)",
        summary: "Raja Yoga is the 'Royal Path' of systematic mental control, codified by Patanjali. It is designed for those who thrive on structure, routine, and verifiable results. This path treats the mind as a laboratory, using breath regulation (Pranayama) and sensory withdrawal (Pratyahara) to reach deep states of concentration (Samadhi). If your temperament is disciplined and you seek a step-by-step methodology for mastering consciousness, Raja Yoga provides the most precise psychological manual ever written.",
        bestFor: "Disciplined personalities, routine-lovers, and those interested in the 'science' of meditation.",
        firstStep: "Commit to a fixed daily time for 10 minutes of Nadi Shodhana (alternate nostril breathing).",
        href: "/which-meditation-for-me",
    },
    {
        name: "Jnana Yoga (The Analytical Path)",
        summary: "Jnana Yoga is the sharpest tool in the spiritual shed, intended for highly analytical and contemplative minds. It is the path of direct inquiry into the nature of reality. Using the technique of 'Neti-Neti' (Not this, Not that), the practitioner deconstructs every layer of false identity until only the underlying witness-consciousness remains. Because it relies on deep discrimination (Viveka), it is often considered the most difficult path to start, but it offers the most direct and rapid route to ultimate realization for the philosophically rigorous.",
        bestFor: "Highly analytical seekers, contemplatives, and those who require logical proof before practice.",
        firstStep: "Begin studying the 'Tattva Bodha' or foundational Upanishadic texts with a focus on 'Who am I?'.",
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
        question: "How do I know which of the four paths is mine?",
        answer:
            "Look at your strongest natural tendency. If you are emotional, Bhakti is yours. If you are restless for action, Karma is yours. If you are routine-driven, Raja is yours. If you are analytical, Jnana is yours. Most people are a 'cocktail' of all four, with one dominant path.",
    },
    {
        question: "Is one path 'higher' or more advanced than others?",
        answer:
            "No. The Bhagavad Gita teaches that all four paths lead to the same peak. The 'highest' path is simply the one you can practice most consistently without force or inner conflict.",
    },
    {
        question: "Can I combine these paths as a beginner?",
        answer:
            "Yes. In fact, a synthesis is often recommended. A common 'beginner stack' is Karma Yoga during work hours, Bhakti Yoga for emotional stability, and Raja Yoga for 15 minutes of seated meditation daily.",
    },
    {
        question: "How long should I test a path before deciding if it works?",
        answer:
            "We recommend a 40-day 'Mandala.' It takes roughly 40 days for the nervous system and subconscious habits (Samskaras) to begin realigning with a new spiritual practice.",
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

                    <header className="mb-12 mt-6">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight">Best Spiritual Path for <span className="text-orange-500">Beginners</span></h1>
                        <div className="grid md:grid-cols-3 gap-8 items-start">
                            <div className="md:col-span-2 space-y-6">
                                <p className="text-lg text-foreground leading-relaxed">
                                    <strong>Direct answer:</strong> the best spiritual path for beginners is the one you can sustain daily with low friction — Bhakti for heart-led people, Karma for action-led people, Raja for discipline-led people, and Jnana for inquiry-led people.
                                </p>
                                <p className="text-2xl text-foreground font-medium leading-tight italic border-l-4 border-orange-500 pl-6">
                                    "The best spiritual path is the one you can sustain, not the one that sounds the most profound."
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Most seekers fail in the first 90 days because they adopt a practice that contradicts their innate nature (Svadharma). Telling a highly active person to sit in silent retreat is a recipe for frustration; telling an analytical mind to accept dogma creates resentment.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    The four classical paths of Sanatan Dharma—Bhakti, Karma, Raja, and Jnana—were engineered specifically to match the four primary human temperaments. Your job isn't to change your personality to fit a path, but to choose the path that leverages your existing momentum.
                                </p>
                            </div>
                            <div className="bg-muted p-8 rounded-3xl border border-border/60">
                                <h3 className="text-orange-400 font-bold uppercase text-xs tracking-[0.2em] mb-4">Quick Diagnostic</h3>
                                <ul className="space-y-4 text-sm">
                                    <li className="flex gap-2"><span>❤️</span> <strong>Emotional?</strong> <span>Try Bhakti</span></li>
                                    <li className="flex gap-2"><span>🏗️</span> <strong>Active?</strong> <span>Try Karma</span></li>
                                    <li className="flex gap-2"><span>📏</span> <strong>Disciplined?</strong> <span>Try Raja</span></li>
                                    <li className="flex gap-2"><span>💡</span> <strong>Analytical?</strong> <span>Try Jnana</span></li>
                                </ul>
                            </div>
                        </div>
                    </header>

                    <section className="mb-16 rounded-2xl border border-border/60 bg-card/40 p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Best for / Not best for / Where to start</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong className="text-foreground">Best for:</strong> beginners who want one clear path matched to temperament.</li>
                            <li><strong className="text-foreground">Not best for:</strong> seekers trying to copy someone else's path without testing fit.</li>
                            <li><strong className="text-foreground">Where to start:</strong> pick one path below and commit for 40 days before switching.</li>
                        </ul>
                    </section>

                    <section className="mb-20">
                        <h2 className="font-display text-4xl font-bold mb-12 text-center">The Four Foundational Paths</h2>
                        <div className="space-y-8">
                            {paths.map((path, index) => (
                                <article key={path.name} className="group rounded-3xl border border-border/60 bg-card p-10 hover:border-orange-500/30 transition-all shadow-sm">
                                    <div className="flex flex-col md:flex-row md:items-start gap-8">
                                        <div className="md:w-1/3">
                                            <div className="text-sm uppercase tracking-[0.2em] text-orange-400 font-bold mb-2">Primary Option {index + 1}</div>
                                            <h3 className="text-3xl font-display font-bold mb-4">{path.name}</h3>
                                            <div className="space-y-4 text-sm mb-6">
                                                <div className="bg-muted/50 p-4 rounded-xl border border-border/40">
                                                    <strong className="text-orange-400 block mb-1 uppercase text-[10px] tracking-widest">Ideal Temperament</strong>
                                                    {path.bestFor}
                                                </div>
                                                <div className="bg-muted/50 p-4 rounded-xl border border-border/40">
                                                    <strong className="text-orange-400 block mb-1 uppercase text-[10px] tracking-widest">Immediate Goal</strong>
                                                    {path.firstStep}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:w-2/3 flex flex-col justify-between">
                                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                                {path.summary}
                                            </p>
                                            <TrackedLink
                                                href={path.href}
                                                eventLabel={`chooser_option:best-spiritual-path-for-beginners:${path.href}`}
                                                trackPathName={path.href.replace(/^\//, "")}
                                                className="mt-auto inline-flex items-center text-orange-400 hover:text-orange-300 font-bold text-lg group-hover:translate-x-1 transition-transform"
                                            >
                                                Deep Dive into {path.name.split(' (')[0]} <ArrowRight className="ml-2 w-5 h-5" />
                                            </TrackedLink>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mb-20 prose prose-invert max-w-none border-y border-border/40 py-20">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-display text-4xl font-bold mb-10 text-center">The Philosophy of Temperament</h2>
                            <p className="text-xl leading-relaxed mb-8">
                                In Sanatan Dharma, the concept of <strong>Gunas</strong> (the three qualities of nature) explains why one path works for you while another fails.
                                We are all composed of <em>Sattva</em> (clarity), <em>Rajas</em> (activity), and <em>Tamas</em> (inertia) in varying proportions.
                            </p>
                            <ul className="space-y-6 list-none p-0">
                                <li className="bg-muted/20 p-6 rounded-2xl border border-border/40">
                                    <strong className="text-orange-400 block text-lg mb-2">Rajasic Minds</strong>
                                    <p className="text-muted-foreground">Driven by ambition and energy. Karma Yoga provides the perfect outlet, using that energy for selfless service instead of personal gain.</p>
                                </li>
                                <li className="bg-muted/20 p-6 rounded-2xl border border-border/40">
                                    <strong className="text-orange-400 block text-lg mb-2">Sattvic Minds</strong>
                                    <p className="text-muted-foreground">Naturally calm and reflective. These seekers thrive in Jnana Yoga, where they can use their existing clarity to pierce through illusion.</p>
                                </li>
                            </ul>
                            <p className="text-lg text-muted-foreground leading-relaxed mt-10 italic text-center">
                                The path you choose is not a destination; it's the vehicle you use to move toward the same ultimate peak.
                            </p>
                        </div>
                    </section>

                    <section className="mb-20 rounded-3xl bg-muted/10 border border-border/60 p-10 overflow-hidden relative">
                        <h2 className="font-display text-4xl font-bold mb-10 text-center">Path Comparison</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[720px] relative z-10">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Spiritual Path</th>
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Primary Driver</th>
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Difficulty</th>
                                        <th className="py-4 text-orange-400 font-bold uppercase tracking-widest text-xs">Best Initial Practice</th>
                                    </tr>
                                </thead>
                                <tbody className="text-lg">
                                    <tr className="border-b border-border/50">
                                        <td className="py-6 pr-6 font-bold">Bhakti</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Emotion/Love</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Low</td>
                                        <td className="py-6 text-muted-foreground font-medium">Mantra & Prayer</td>
                                    </tr>
                                    <tr className="border-b border-border/50">
                                        <td className="py-6 pr-6 font-bold">Karma</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Responsibility/Duty</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Low</td>
                                        <td className="py-6 text-muted-foreground font-medium">Detached Action</td>
                                    </tr>
                                    <tr className="border-b border-border/50">
                                        <td className="py-6 pr-6 font-bold">Raja</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Concentration/System</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Medium</td>
                                        <td className="py-6 text-muted-foreground font-medium">Breath & Meditation</td>
                                    </tr>
                                    <tr>
                                        <td className="py-6 pr-6 font-bold">Jnana</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Discrimination/Logic</td>
                                        <td className="py-6 pr-6 text-muted-foreground">High</td>
                                        <td className="py-6 text-muted-foreground font-medium">Scriptural Inquiry</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-20 shadow-2xl overflow-hidden relative rounded-3xl border border-orange-900/40 bg-gradient-to-br from-orange-950/20 to-background p-12 text-center">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-display font-bold mb-4">Want a recommendation for your type?</h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                                Don't guess with your spiritual life. Take the <strong>Faith Finder</strong> and map your specific psychological architectural to the traditions engineered for your nature.
                            </p>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="chooser_cta:best-spiritual-path-for-beginners:faith-finder"
                                trackPathName="faith-finder"
                                className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-10 py-5 text-white font-bold text-xl shadow-lg hover:shadow-orange-500/20 transition-all active:scale-95"
                            >
                                Discover My Path <ArrowRight className="ml-2 w-6 h-6" />
                            </TrackedLink>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="font-display text-4xl font-bold mb-10 text-center">Frequently asked questions</h2>
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
                                    <div className="inline-flex items-center text-muted-foreground font-medium">
                                        {reference.label}
                                    </div>
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