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
                            <strong>Direct answer:</strong> Sanatan Dharma means "the eternal order" — the universal cosmic framework of duty, karma, and liberation that predates the geographical label "Hinduism" by millennia. It has no single founder, no single prophet, and no single book. It is a way of understanding reality itself.
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
                                    The word "Hindu" appears nowhere in the sacred texts of India. It is a geographical term — a Persian and Arabic corruption of "Sindhu," the Sanskrit name for the Indus River. When Persian, Greek, and later British observers encountered the vast diversity of spiritual practices in the Indian subcontinent, they grouped them all under the umbrella label "Hinduism" for administrative and taxonomic convenience.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The people practicing these traditions, however, did not call themselves Hindus. They called their framework <strong className="text-foreground">Sanatan Dharma</strong> — the eternal, unchanging order of the cosmos. This was not nationalism or tribalism; it was a claim about the nature of reality itself. Just as the laws of physics operate independently of which country you are born in, Sanatan Dharma was understood as a universal structure that predated all human civilizations.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    This distinction matters enormously. "Hinduism" is a political and sociological category. "Sanatan Dharma" is a philosophical and spiritual one. Conflating them is like confusing the map with the territory.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Is Hinduism a Religion or a Way of Life?
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Western definitions of "religion" typically require a founding prophet, a canonical holy book, a centralized church, and a defined set of beliefs that members must accept. By every one of these criteria, Sanatan Dharma does not qualify as a "religion" in the Western sense.
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
                                    Sanatan Dharma contains traditions that are intensely theistic (like Vaishnavism), non-theistic (like Advaita Vedanta), and agnostic-philosophical (like certain schools of Mimamsa). It has room for the devotional bhakta who worships Vishnu and the non-dualist jnani who insists there is only formless consciousness. This is not contradiction — it is deliberate philosophical pluralism.
                                </p>
                            </section>

                            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                    <Flame className="text-orange-500 w-8 h-8" />
                                    The Four Pillars: Purushartha
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    Instead of commandments or articles of faith, Sanatan Dharma organizes human life around four legitimate goals (<em>Purusharthas</em>) — a map of what it means to live fully and well:
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
                                    Notice that Sanatan Dharma does not reject wealth, pleasure, or desire — it integrates them within a larger framework where liberation (Moksha) is the final, ultimate aim. This is radically different from traditions that treat the material world as inherently sinful.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">The Cosmic Laws: What Dharma Actually Means</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The word <em>Dharma</em> comes from the Sanskrit root <em>dhri</em> — "to hold" or "to uphold." Dharma is that which sustains the universe in balance. It operates at multiple levels simultaneously:
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex gap-4">
                                        <span className="text-orange-500 font-black text-2xl leading-none mt-1">1</span>
                                        <div>
                                            <strong className="text-foreground">Rita (Cosmic Order)</strong>
                                            <p className="text-muted-foreground mt-1">The natural laws governing the physical universe — the rhythms of seasons, the orbits of planets, the cycle of day and night. Reality has an inherent order, and living in alignment with it rather than against it is the beginning of wisdom.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-orange-500 font-black text-2xl leading-none mt-1">2</span>
                                        <div>
                                            <strong className="text-foreground">Sadharana Dharma (Universal Ethics)</strong>
                                            <p className="text-muted-foreground mt-1">Moral principles applicable to all humans regardless of religion, caste, or era: non-violence (Ahimsa), truthfulness (Satya), non-stealing (Asteya), self-restraint (Brahmacharya), and non-possessiveness (Aparigraha). These are the Yamas of Yoga, the universal ethical floor.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-orange-500 font-black text-2xl leading-none mt-1">3</span>
                                        <div>
                                            <strong className="text-foreground">Svadharma (Personal Duty)</strong>
                                            <p className="text-muted-foreground mt-1">Your specific duty arising from your unique nature, role, and circumstances. The duty of a parent differs from that of a student. The duty of a warrior in the battlefield — as Krishna explains to Arjuna in the Bhagavad Gita — differs from the duty of a monk in a monastery. Context is everything.</p>
                                        </div>
                                    </li>
                                </ul>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    The Bhagavad Gita's central tension is precisely this: Arjuna does not want to fight his relatives. Krishna's answer is not to overcome sentimentality with logic — it is to remind Arjuna of his Svadharma. A warrior who abandons his duty at the critical moment creates worse karma than a warrior who fights with compassion.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">Karma and Samsara: The Engine of Rebirth</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Two concepts are inseparable from Sanatan Dharma: <strong className="text-foreground">Karma</strong> and <strong className="text-foreground">Samsara</strong>. Karma is not cosmic reward-and-punishment — it is the law of cause and effect applied to the soul. Every action, word, and even intention leaves an impression (Samskara) on the subtle body that shapes future circumstances.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Samsara is the cycle of birth, death, and rebirth that the soul undergoes as it works out its accumulated karma. The goal of Sanatan Dharma is not to earn a comfortable afterlife but to step off the wheel entirely — to achieve Moksha, liberation from the cycle altogether.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    This is why Sanatan Dharma places such emphasis on selfless action (Karma Yoga): when you act without attachment to results, you stop accumulating new karma. Over time, existing karma burns away through spiritual practice, and liberation becomes possible.
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
                                    Sanatan Dharma is not a museum piece or a heritage label. Its core principles are as applicable in a 21st-century office as they were in a Vedic ashram three thousand years ago. The path does not require you to become a monk, move to India, or adopt a new identity.
                                </p>
                                <div className="space-y-6 mb-8">
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">1. Clarify Your Svadharma</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Ask honestly: what is your actual duty right now — as a parent, professional, citizen, or seeker? Then do that thing with total commitment and zero attachment to the result. This is Karma Yoga in daily life.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">2. Study One Primary Text</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Don't try to read everything at once. Choose one text — the Bhagavad Gita is the most practical starting point — and read it slowly, with a good commentary. Ten minutes a day of real study is worth more than 200 pages of casual skimming.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">3. Practice One of the Four Yogas</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Sanatan Dharma offers four main paths to Moksha: Jnana Yoga (the path of knowledge and inquiry), Bhakti Yoga (the path of devotion and love), Karma Yoga (the path of selfless action), and Raja Yoga (the path of meditation and mental discipline). Pick the one that matches your temperament and apply it consistently.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-lg mb-3 text-orange-400">4. Begin the Yamas</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Before any advanced practice, Patanjali's Yoga Sutras insist on ethical grounding. Start with Ahimsa (non-violence in thought, speech, and action) and Satya (truthfulness, especially with yourself). These two alone, taken seriously, will transform your life.
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
