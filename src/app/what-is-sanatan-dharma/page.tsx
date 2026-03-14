import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, Compass, Flame } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "The True Meaning of Sanatan Dharma (And How It Differs from Hinduism)",
    description:
        "Sanatan Dharma means 'the eternal order' — a universal philosophy of dharma, karma, and moksha predating the geographical label 'Hinduism.' Learn what it actually means and how to live it.",
    alternates: {
        canonical: "https://opensadhaka.com/what-is-sanatan-dharma",
    },
    openGraph: {
        title: "The True Meaning of Sanatan Dharma: Why It Is Not Just 'Hinduism'",
        description:
            "Sanatan Dharma is not a religion with a single founder or book — it is the eternal cosmic order that sustains reality itself. A complete explainer.",
        url: "https://opensadhaka.com/what-is-sanatan-dharma",
        type: "article",
    },
};

const faqs = [
    {
        question: "What does 'Sanatan Dharma' literally mean?",
        answer:
            "Sanatan (सनातन) means 'eternal' or 'that which has no beginning and no end.' Dharma (धर्म) means 'that which upholds' — the order, duty, and cosmic law that sustains all existence. Together, Sanatan Dharma means 'the eternal order' or 'the timeless way of right living.'",
    },
    {
        question: "Is Sanatan Dharma the same as Hinduism?",
        answer:
            "Not exactly. 'Hinduism' is a geographical label coined by Persian and later British observers for the diverse spiritual practices found east of the Indus (Sindhu) River. Sanatan Dharma is the internal, philosophical name that practitioners use for themselves — a universal cosmic framework independent of geography, ethnicity, or political identity.",
    },
    {
        question: "Does Sanatan Dharma have a founder, prophet, or central holy book?",
        answer:
            "No — and this is one of its most distinctive features. Unlike Abrahamic religions, Sanatan Dharma has no single founder, no single prophet, and no single canonical text. The Vedas, Upanishads, Bhagavad Gita, and Puranas are all authoritative, but no one text is 'the only book.' This makes it one of the most intellectually diverse spiritual traditions on earth.",
    },
    {
        question: "What are the core concepts of Sanatan Dharma?",
        answer:
            "The four foundational pillars are: Dharma (one's duty and right action), Artha (legitimate material prosperity), Kama (wholesome desire and aesthetic fulfillment), and Moksha (liberation from the cycle of birth and death). All four are considered valid goals of human life — Sanatan Dharma is not otherworldly escapism but a complete framework for living.",
    },
];

const pillars = [
    {
        sanskrit: "धर्म",
        roman: "Dharma",
        english: "Right Duty",
        detail:
            "Your intrinsic nature and context-specific duty. Not a rigid rule system, but a living responsiveness to what each situation actually requires.",
    },
    {
        sanskrit: "अर्थ",
        roman: "Artha",
        english: "Legitimate Prosperity",
        detail:
            "Material wealth, security, and power acquired through honest means. Sanatan Dharma does not reject worldly success — it contextualizes it within ethical limits.",
    },
    {
        sanskrit: "काम",
        roman: "Kama",
        english: "Wholesome Desire",
        detail:
            "Pleasure, beauty, aesthetic experience, and love. Desire is not sinful — it is a natural part of being human, to be engaged wisely, not suppressed.",
    },
    {
        sanskrit: "मोक्ष",
        roman: "Moksha",
        english: "Liberation",
        detail:
            "Freedom from the cycle of birth, death, and rebirth (Samsara). The ultimate goal — not after death, but the recognition of one's true nature as pure consciousness right now.",
    },
];

export default function WhatIsSanatanDharmaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="what-is-sanatan-dharma" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Sanatan Dharma?", href: "/what-is-sanatan-dharma" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The <span className="text-orange-500 italic">Eternal</span> Order
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Sanatan Dharma means "the eternal order." It names the laws and duties that sustain life, mind, and society. It is older than the label "Hinduism," has no single founder, and is expressed through many texts and lineages.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Hinduism is what outsiders called the people living east of the Indus River. Sanatan Dharma is what those people called the truth they were living.
                        </p>
                    </header>

                    <section className="mb-14 rounded-2xl border border-border/60 bg-card/40 p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Best for / Not best for / Where to start</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <strong className="text-foreground">Best for:</strong> anyone who wants to understand the philosophical backbone of Indian spirituality before exploring specific practices or texts.
                            </li>
                            <li>
                                <strong className="text-foreground">Not best for:</strong> seekers looking for a checklist of beliefs to adopt — Sanatan Dharma is not dogmatic and deliberately resists rigid definition.
                            </li>
                            <li>
                                <strong className="text-foreground">Where to start:</strong> read the Bhagavad Gita for the practical ethics, and the Upanishads for the metaphysical foundation. Begin with daily self-inquiry and one simple ethical practice.
                            </li>
                        </ul>
                    </section>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-14">

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6 italic text-orange-400">
                                    The Naming Problem
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Most people asking "What is Sanatan Dharma?" are actually asking a naming question. The term "Hindu" does not appear in the Vedas, Upanishads, or Bhagavad Gita. It emerged as a geographical label from "Sindhu," then became a civilizational umbrella in Persian, Greek, and British usage.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Practitioners described their framework as <strong className="text-foreground">Sanatan Dharma</strong>, the eternal order. This was not an ethnic slogan. It was a claim that reality has a lawful structure, just as gravity is lawful whether you name it or not.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    The distinction is not semantic. "Hinduism" functions as a historical and sociological category. "Sanatan Dharma" refers to metaphysics, ethics, and liberation.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Is Hinduism a Religion or a Way of Life?
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Western definitions of religion often assume one founder, one revealed book, one authority structure, and one binding creed. Sanatan Dharma does not follow that model. It supports multiple sampradayas (lineages), commentarial traditions, and methods of practice under one civilizational framework.
                                </p>
                                <div className="overflow-x-auto rounded-2xl border border-border/40 mb-8">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-muted/50 text-left">
                                                <th className="p-4 font-bold text-foreground">Feature</th>
                                                <th className="p-4 font-bold text-orange-400">Sanatan Dharma</th>
                                                <th className="p-4 font-bold text-muted-foreground">Abrahamic Religions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/20">
                                            <tr>
                                                <td className="p-4 text-muted-foreground">Single Founder</td>
                                                <td className="p-4 text-foreground font-medium">None — beginningless</td>
                                                <td className="p-4 text-muted-foreground">Yes (Abraham, Jesus, Muhammad)</td>
                                            </tr>
                                            <tr className="bg-muted/10">
                                                <td className="p-4 text-muted-foreground">Single Holy Book</td>
                                                <td className="p-4 text-foreground font-medium">None — Vedas, Upanishads, Gita, Puranas all valid</td>
                                                <td className="p-4 text-muted-foreground">Yes (Bible, Quran, Torah)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-muted-foreground">Central Authority</td>
                                                <td className="p-4 text-foreground font-medium">Decentralized — countless lineages</td>
                                                <td className="p-4 text-muted-foreground">Pope, Imams, Rabbis</td>
                                            </tr>
                                            <tr className="bg-muted/10">
                                                <td className="p-4 text-muted-foreground">Conversion Required</td>
                                                <td className="p-4 text-foreground font-medium">No — universal truths available to all</td>
                                                <td className="p-4 text-muted-foreground">Often yes</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-muted-foreground">Heresy / Apostasy</td>
                                                <td className="p-4 text-foreground font-medium">No concept — philosophical debate encouraged</td>
                                                <td className="p-4 text-muted-foreground">Yes, in most traditions</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Sanatan Dharma includes strongly theistic schools such as Vaishnavism, non-dual schools such as Advaita Vedanta, and ritual-philosophical schools such as Purva Mimamsa. A Vishnu bhakta and a non-dual jnani disagree on key points, yet both sit inside the same scriptural ecosystem. The pluralism is intentional, not accidental.
                                </p>
                            </section>

                            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                    <Flame className="text-orange-500 w-8 h-8" />
                                    The Four Pillars: Purushartha
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    Instead of a single creed, Sanatan Dharma organizes life through the four purusharthas (human aims). They define what a complete life includes and how those aims are ordered:
                                </p>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {pillars.map((p) => (
                                        <div key={p.roman} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                            <div className="flex items-baseline gap-3 mb-2">
                                                <span className="text-2xl font-bold text-orange-400">{p.sanskrit}</span>
                                                <span className="text-sm text-muted-foreground italic">{p.roman} — {p.english}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-base text-muted-foreground mt-8 leading-relaxed italic border-l-4 border-orange-500/30 pl-6">
                                    Sanatan Dharma does not reject wealth or pleasure. It places both inside dharma and points them toward moksha (liberation). The question is not renunciation first; it is right ordering first.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">The Cosmic Laws: What Dharma Actually Means</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The word <em>Dharma</em> comes from the Sanskrit root <em>dhr</em>, "to uphold." In the Mahabharata and Dharmashastra traditions, dharma means what sustains order and prevents collapse. It operates at multiple levels:
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex gap-4">
                                        <span className="text-orange-500 font-black text-2xl leading-none mt-1">1</span>
                                        <div>
                                            <strong className="text-foreground">Rita (Cosmic Order)</strong>
                                            <p className="text-muted-foreground mt-1">The Vedic idea of cosmic order: seasons, cycles, causality, and lawful recurrence. Life becomes coherent when human conduct aligns with this order instead of fighting it.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-orange-500 font-black text-2xl leading-none mt-1">2</span>
                                        <div>
                                            <strong className="text-foreground">Sadharana Dharma (Universal Ethics)</strong>
                                            <p className="text-muted-foreground mt-1">Ethical duties valid across role and era: ahimsa (non-harm), satya (truthfulness), asteya (non-stealing), brahmacharya (discipline), and aparigraha (non-grasping). Patanjali lists them as yamas in Yoga Sutra 2.30.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-orange-500 font-black text-2xl leading-none mt-1">3</span>
                                        <div>
                                            <strong className="text-foreground">Svadharma (Personal Duty)</strong>
                                            <p className="text-muted-foreground mt-1">Duty shaped by your role, capacity, and situation. The Bhagavad Gita frames this through Arjuna's crisis: role-duty cannot be borrowed from someone else's life script.</p>
                                        </div>
                                    </li>
                                </ul>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    The Gita's tension is practical, not abstract. Arjuna refuses battle; Krishna redirects him to svadharma and intention. The teaching is not "violence is fine" but "role-duty without egoic attachment is higher than paralysis."
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">Karma and Samsara: The Engine of Rebirth</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Two ideas are inseparable here: <strong className="text-foreground">karma</strong> and <strong className="text-foreground">samsara</strong>. Karma is not divine reward and punishment. It is moral causation: action, speech, and intention leave samskaras (impressions) that condition future experience.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Samsara is the cycle of birth and death conditioned by unresolved karma and desire. The aim is not a better rebirth. The aim is moksha: release from compulsory rebirth through knowledge, discipline, and non-attachment.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    This is why Karma Yoga matters in the Gita (2.47, 3.19). Action without clinging to outcomes weakens karmic binding. Practice does not erase causality; it changes your relationship to causality.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/how-karma-dharma-work"
                                        className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
                                    >
                                        Deep Dive: How Karma Actually Works <ArrowRight size={16} />
                                    </Link>
                                    <Link
                                        href="/what-is-maya"
                                        className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
                                    >
                                        What is Maya (Illusion)? <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">How to Practice Sanatan Dharma in the Modern World</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Sanatan Dharma is not restricted to temple ritual or inherited identity. Its disciplines apply in ordinary roles: family life, professional life, civic life, contemplative life. You do not need monastic status to practice dharma, karma yoga, or self-inquiry.
                                </p>
                                <div className="space-y-6 mb-8">
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">1. Clarify Your Svadharma</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Identify your present role-duty with precision: parent, manager, student, caregiver, citizen. Then perform that duty without making your self-worth depend on the outcome. That is Karma Yoga in practical terms.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">2. Study One Primary Text</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Choose one text and one commentary tradition. The Bhagavad Gita with a reliable bhashya is a practical starting point. Slow, repeated reading with notes is better than broad, shallow sampling.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">3. Practice One of the Four Yogas</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            The classical pathways are Jnana Yoga, Bhakti Yoga, Karma Yoga, and Raja Yoga. Temperament determines emphasis; discipline determines results. Pick one primary mode and practice it consistently for months, not days.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">4. Begin the Yamas</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Before advanced practice, stabilize conduct through the yamas in Yoga Sutra 2.30. Start with ahimsa in speech and satya in self-reporting. Ethical instability distorts every higher practice.
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-4">Recommended Texts and Where to Start</h3>
                                <div className="flex flex-col gap-3">
                                    <Link href="/texts/bhagavad-gita" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-400 transition-colors">
                                        <BookOpen size={16} className="text-orange-500 flex-shrink-0" />
                                        <span>The Bhagavad Gita — practical ethics and psychology of selfless action</span>
                                    </Link>
                                    <Link href="/what-are-the-upanishads" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-400 transition-colors">
                                        <BookOpen size={16} className="text-orange-500 flex-shrink-0" />
                                        <span>The Upanishads — the philosophical source: consciousness, self, and reality</span>
                                    </Link>
                                    <Link href="/what-is-vedanta" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-400 transition-colors">
                                        <BookOpen size={16} className="text-orange-500 flex-shrink-0" />
                                        <span>What is Vedanta? — the systematic philosophy built on the Upanishads</span>
                                    </Link>
                                    <Link href="/philosophies/yoga-darshana" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-400 transition-colors">
                                        <BookOpen size={16} className="text-orange-500 flex-shrink-0" />
                                        <span>Yoga Darshana — Patanjali's systematic path to mental liberation</span>
                                    </Link>
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-card border border-border/60 rounded-3xl p-8 sticky top-28 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <Compass className="text-orange-500 w-6 h-6" />
                                    <h3 className="font-display font-bold text-xl uppercase tracking-tighter">Key Terms</h3>
                                </div>
                                <ul className="space-y-5">
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Dharma</h4>
                                        <p className="text-sm text-muted-foreground">The cosmic order and your personal duty within it. Not rules — responsiveness to what a situation requires.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Karma</h4>
                                        <p className="text-sm text-muted-foreground">The law of cause and effect for the soul. Every action plants a seed. Selfless action creates no binding karma.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Samsara</h4>
                                        <p className="text-sm text-muted-foreground">The cycle of birth, death, and rebirth driven by unfulfilled karma and unresolved desires.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Moksha</h4>
                                        <p className="text-sm text-muted-foreground">Liberation. Freedom from Samsara through the realization of one's true nature as pure, eternal consciousness.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Atman</h4>
                                        <p className="text-sm text-muted-foreground">The individual self — the witness behind all thoughts, emotions, and sensations. In Advaita, identical with Brahman.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Brahman</h4>
                                        <p className="text-sm text-muted-foreground">The ultimate, all-pervading reality. Not a personal God in the Western sense, but the ground of all existence.</p>
                                    </li>
                                </ul>
                                <hr className="my-8 border-border/40" />
                                <div className="space-y-4">
                                    <p className="text-xs text-muted-foreground italic leading-relaxed uppercase tracking-wide">Which path fits your temperament?</p>
                                    <TrackedLink
                                        href="/faith-finder"
                                        eventLabel="sanatan_dharma:sidebar:faith-finder"
                                        trackPathName="faith-finder"
                                        className="w-full inline-flex items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-white font-bold text-sm transition-all hover:bg-orange-700 shadow-md"
                                    >
                                        Find Your Path <ArrowRight className="ml-2 w-4 h-4" />
                                    </TrackedLink>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* FAQs */}
                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight uppercase">Common Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm transition-transform hover:-translate-y-1">
                                    <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-orange-500/20">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none grayscale brightness-200">
                            <Flame size={480} className="translate-y-20 translate-x-20" />
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-display font-black mb-6 relative z-10">Go Deeper Into the Texts.</h2>
                        <p className="text-xl lg:text-2xl text-orange-50 max-w-2xl mx-auto mb-10 relative z-10 font-medium">
                            Sanatan Dharma is best understood through its primary sources. Start with the Bhagavad Gita or explore the philosophy of Vedanta.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <TrackedLink
                                href="/texts/bhagavad-gita"
                                eventLabel="sanatan_dharma:footer:gita"
                                trackPathName="texts/bhagavad-gita"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Explore the Bhagavad Gita
                            </TrackedLink>
                            <TrackedLink
                                href="/what-is-vedanta"
                                eventLabel="sanatan_dharma:footer:vedanta"
                                trackPathName="what-is-vedanta"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                What is Vedanta?
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
