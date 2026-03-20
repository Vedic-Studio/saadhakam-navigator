import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "What is Maya in Indian Philosophy? Illusion, Mithya, and Moksha",
    description:
        "Maya doesn't mean the world is fake. It means the world has conditional reality, not absolute reality. A precise guide to maya, mithya, and how moksha is achieved in Advaita Vedanta.",
    alternates: {
        canonical: "https://www.opensadhaka.com/what-is-maya",
    },
    openGraph: {
        title: "What is Maya in Indian Philosophy? The Vedantic Concept Explained",
        description:
            "Maya is the cosmic power that conceals Brahman and projects a world of apparent multiplicity. It is not a claim that fire doesn't burn. It is a claim about fire's ultimate ontological status.",
        url: "https://www.opensadhaka.com/what-is-maya",
        type: "article",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Article",
            headline: "What is Maya in Indian Philosophy? Illusion, Mithya, and Moksha",
            description:
                "Maya doesn't mean the world is fake. It means the world has conditional reality, not absolute reality. A precise guide to maya, mithya, and how moksha is achieved in Advaita Vedanta.",
            url: "https://www.opensadhaka.com/what-is-maya",
            datePublished: "2026-03-19",
            dateModified: "2026-03-19",
            author: { "@type": "Organization", name: "Opensadhaka" },
            publisher: {
                "@type": "Organization",
                name: "Opensadhaka",
                url: "https://www.opensadhaka.com",
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": "https://www.opensadhaka.com/what-is-maya" },
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "Does maya mean the world doesn't exist?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "No. Maya does not mean the world is non-existent or a hallucination. Shankara's Advaita uses the term mithya, a technical term meaning neither fully real (sat) nor non-existent (asat). The world has empirical reality (vyavaharika satta) within transactional experience. It lacks absolute metaphysical reality (paramarthika satta) when compared to Brahman. Scholar Paul Hacker noted that maya carried 'hardly any terminological weight' in Shankara's own writings; the strong illusion framing came from later commentators, particularly the 13th-century Vivarana school.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the rope-snake analogy for maya?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "In dim light, you mistake a rope for a snake. Your fear is real. Palms sweat, heart races. But the snake never existed. The fear arose from superimposing 'snake' onto 'rope.' Gaudapada used this analogy in the Mandukya Karika; Shankara made it canonical. Maya works identically: we superimpose a separate, permanent 'I' onto what is Brahman. Jnana (self-knowledge) functions as the torch. When it arrives, the snake vanishes and the rope is seen to have been the only thing present.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is the difference between maya and avidya?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Maya operates at the cosmic level, as the power of Ishvara, the lord. Avidya operates at the individual level, as the specific ignorance of each jiva. As the Internet Encyclopedia of Philosophy states: 'The cosmic aspect belongs to one Ishvara, and the individual aspect, avidya, belongs to many jivas.' They are related powers with different scopes. Both are dissolved by brahmavidya, knowledge of Brahman.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What is moksha and how is it achieved?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Moksha is liberation from samsara, the cycle of birth and death sustained by karma and identification with the body-mind. In Advaita Vedanta, moksha is not a future state created by action but a present recognition of one's true nature as Brahman, uncovered by removing ignorance (avidya). Bhagavad Gita 7.14 locates the means as surrender to Krishna: those who take refuge cross maya. Vivekachudamani verse 110 states that maya is destroyed by the realization of pure Brahman. Not by ritual, not by effort, but by knowledge.",
                    },
                },
            ],
        },
    ],
};

const faqs = [
    {
        question: "Does maya mean the world doesn't exist?",
        answer:
            "No. Maya does not mean the world is non-existent or a hallucination. Shankara's Advaita uses the term mithya, a technical term meaning neither fully real (sat) nor non-existent (asat). The world has empirical reality (vyavaharika satta) within transactional experience. It lacks absolute metaphysical reality (paramarthika satta) when compared to Brahman. Scholar Paul Hacker noted that maya carried 'hardly any terminological weight' in Shankara's own writings; the strong illusion framing came from later commentators, particularly the 13th-century Vivarana school.",
    },
    {
        question: "What is the rope-snake analogy for maya?",
        answer:
            "In dim light, you mistake a rope for a snake. Your fear is real. Palms sweat, heart races. But the snake never existed. The fear arose from superimposing 'snake' onto 'rope.' Gaudapada used this analogy in the Mandukya Karika; Shankara made it canonical. Maya works identically: we superimpose a separate, permanent 'I' onto what is Brahman. Jnana (self-knowledge) functions as the torch. When it arrives, the snake vanishes and the rope is seen to have been the only thing present.",
    },
    {
        question: "What is the difference between maya and avidya?",
        answer:
            "Maya operates at the cosmic level, as the power of Ishvara, the lord. Avidya operates at the individual level, as the specific ignorance of each jiva. As the Internet Encyclopedia of Philosophy states: 'The cosmic aspect belongs to one Ishvara, and the individual aspect, avidya, belongs to many jivas.' They are related powers with different scopes. Both are dissolved by brahmavidya, knowledge of Brahman.",
    },
    {
        question: "What is moksha and how is it achieved?",
        answer:
            "Moksha is liberation from samsara, the cycle of birth and death sustained by karma and identification with the body-mind. In Advaita Vedanta, moksha is not a future state created by action but a present recognition of one's true nature as Brahman, uncovered by removing ignorance (avidya). Bhagavad Gita 7.14 locates the means as surrender to Krishna: those who take refuge cross maya. Vivekachudamani verse 110 states that maya is destroyed by the realization of pure Brahman. Not by ritual, not by effort, but by knowledge.",
    },
];

export default function WhatIsMayaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContentPageTracker slug="what-is-maya" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Maya?", href: "/what-is-maya" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Seeing Through the <span className="text-orange-500 italic">Matrix</span>: What is Maya?
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Maya is the power by which Brahman appears as a world of separate names and forms. It does not mean the world is a hallucination. The world has empirical reality (vyavaharika satta): fire burns, karma operates, suffering is real. What the world lacks is absolute metaphysical reality (paramarthika satta). Moksha is the recognition of Brahman as the sole reality, achieved through self-knowledge that dissolves avidya, not through action or ritual construction.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Maya is not the claim that fire doesn&apos;t burn. It is the claim that the burning, the burned, and the burner share one source that itself is never touched.
                        </p>
                    </header>

                    <div className="space-y-14">

                        {/* Section 1: The Translators' Mistake */}
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Translators&apos; Mistake: Why Maya Isn&apos;t Exactly &ldquo;Illusion&rdquo;</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Sanskrit root of maya is <em>mā</em>, meaning "to measure" or "to create." Monier-Williams records an early semantic field of "wisdom and extraordinary power" that only shifted toward "illusion" in post-Vedic usage. The rendering "illusion" imports a Western epistemological assumption: either a thing is fully real or it is not real at all.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Shankara's Advaita rejects this binary. The world is <em>mithya</em>, a technical term meaning dependent reality, neither fully real (<em>sat</em>) nor non-existent (<em>asat</em>). Philosophers call this status <em>sadasadvilaksana</em> or <em>anirvacaniya</em>: indescribable in terms of either existence or non-existence. Swami Vivekananda: "To say the world is maya does not mean it is an illusion."
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Indologist Paul Hacker noted that for Shankara himself, "the word maya has hardly any terminological weight." The strong illusion-as-hallucination framing came from the 13th-century Vivarana school, especially Prakasatman, centuries after Shankara. Blaming Shankara for it is a historical error that the Stanford Encyclopedia of Philosophy's entry on Adi Shankara documents in detail.
                            </p>

                            <div className="mt-8 rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="font-bold text-lg mb-4 text-orange-400">Shankara&apos;s Formula</h3>
                                <p className="text-base text-muted-foreground leading-relaxed font-mono">
                                    <em>brahma satyam jagat mithya jivo brahmaiva naparah</em>
                                </p>
                                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                    Brahman alone is real. The world is mithya (dependent reality, not hallucination). The individual self (jiva) is none other than Brahman. Three propositions. Each precise. Together they constitute Advaita&apos;s entire metaphysics.
                                </p>
                            </div>
                        </section>

                        {/* Section 2: The Rope-Snake Analogy */}
                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">The Rope and the Snake Analogy</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                In dim light, you mistake a rope for a snake. Your fear is real. Palms sweat, heart races. But the snake never existed. It arose from <em>adhyāsa</em> (superimposition): projecting the properties of one thing onto another. Gaudapada deployed this analogy in the Mandukya Karika; Shankara made it canonical in his commentary tradition.
                            </p>
                            <div className="grid sm:grid-cols-3 gap-6 mb-8">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30 text-center">
                                    <div className="text-orange-400 font-bold text-lg mb-2">The Rope</div>
                                    <p className="text-sm text-muted-foreground">Brahman, the sole reality, always present, unchanged. The snake was never there; the rope always was.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30 text-center">
                                    <div className="text-orange-400 font-bold text-lg mb-2">The Snake</div>
                                    <p className="text-sm text-muted-foreground">The world of separate names and forms, the bounded ego-self. Convincing from within the superimposition. Gone with the torch of knowledge.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30 text-center">
                                    <div className="text-orange-400 font-bold text-lg mb-2">The Dim Light</div>
                                    <p className="text-sm text-muted-foreground">Avidya, the not-knowing of one's true nature. It does not create the snake. It creates the conditions for superimposition.</p>
                                </div>
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                Post-Shankara Advaita formalized three tiers of reality that map onto this analogy: <em>paramarthika</em> (absolute, Brahman, the rope), <em>vyavaharika</em> (empirical, the waking world, functional but sublatable), and <em>pratibhasika</em> (apparent, dreams, mirages, the snake). The Mandukya Upanishad (Atharvaveda, 12 verses) adds a further insight: its verse 7, the earliest documented use of the word <em>advaita</em>, identifies Turiya, the "Fourth," as the witness behind waking, dreaming, and deep sleep. The rope that was always the rope.
                            </p>
                        </section>

                        {/* Section 3: Two Powers of Maya */}
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Two Powers Maya Exercises</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Vivekachudamani verses 112–114 analyze maya through two operative forces. Both are sourced in Brahman's own power; neither touches Brahman itself, just as a cloud obscures the sun for the viewer without affecting the sun.
                            </p>
                            <div className="space-y-5 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">Āvaraṇa Śakti — The Concealing Power</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Tamo-guna in its cosmic function. Avarana veils Brahman from the perceiver. The infinite appears finite, the whole appears fragmented, the changeless appears as ever-becoming forms. Vivekachudamani verse 113 sources this: it is the power that makes the rope unrecognizable in dim light.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">Vikṣepa Śakti — The Projecting Power</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Rajo-guna in its cosmic function. Once avarana conceals, vikshepa projects a substitute: the world of <em>namarupa</em> (name-and-form), the ego-claim of separate selfhood, the belief that external objects can satisfy. Every desire and every fear rests on this projected superimposition.
                                    </p>
                                </div>
                            </div>

                            {/* Verse Card: Vivekachudamani 109 */}
                            <div className="bg-muted/40 rounded-2xl border border-orange-500/20 p-8">
                                <p className="text-sm text-orange-400 font-bold uppercase tracking-widest mb-4">Vivekachudamani 109 (Adi Shankaracharya)</p>
                                <p className="text-base text-foreground leading-relaxed font-mono mb-4">
                                    सन्नाप्यसन्नाप्युभयात्मिका नो भिन्नाप्यभिन्नाप्युभयात्मिका नो |<br />
                                    साङ्गाप्यनङ्गा ह्युभयात्मिका नो महाद्भुतानिर्वचनीयरूपा || 109 ||
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed italic">
                                    "Maya is neither existent nor non-existent nor both; neither the same nor different nor both; neither possessed of parts nor without parts nor both. She is of a wondrous and indescribable nature."
                                </p>
                                <p className="text-xs text-muted-foreground mt-3">
                                    Verse 110 adds: Maya is destroyed by the realization of pure Brahman. Not by action, not by merit, but by knowledge alone.
                                </p>
                            </div>
                        </section>

                        {/* Section 4: Cross-tradition */}
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How Other Schools Read Maya</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The mithya-maya doctrine is not universally accepted within the broader Vedantic tradition. Two major schools rejected it, each on precise philosophical grounds.
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-2">Ramanuja — Vishishtadvaita</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        Ramanuja's Sapta-vidha Anupapatti (seven-fold refutation) attacked anirvacaniya maya directly: an entity that is neither real nor unreal is a logical contradiction with no referent. For Ramanuja, the world is the real body of Brahman (Vishnu); souls retain individual identity after moksha.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-2">Madhva — Dvaita</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        Madhva rejected maya-as-illusion. Reality, in Dvaita, is irreducibly plural: God, souls, and matter are eternally distinct. Liberation (mukti) in Dvaita is eternal communion with Vishnu, not merger with Brahman. Dvaita remains the sharpest internal critique of Advaita's ontology.
                                    </p>
                                </div>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                These disagreements are not peripheral. Shankara, Ramanuja, and Madhva read the same Upanishads and the same Brahmasutras and reached opposing positions. The debate about maya's status is the debate about Indian metaphysics itself.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <Link href="/advaita-vs-dvaita" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Advaita vs Dvaita: The Core Debate <ArrowRight size={16} />
                                </Link>
                                <Link href="/advaita-vedanta-explained" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Advaita Vedanta Explained <ArrowRight size={16} />
                                </Link>
                            </div>
                        </section>

                        {/* Section 5: Moksha */}
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What is Moksha and How to Achieve It</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Samsara, the cycle of birth and death, runs on karma, and karma runs on avidya. Remove the avidya and the engine stops. Bhagavad Gita 7.14 names the mechanism for the Bhakti tradition:
                            </p>

                            {/* Verse Card: BG 7.14 */}
                            <div className="bg-muted/40 rounded-2xl border border-orange-500/20 p-8 mb-8">
                                <p className="text-sm text-orange-400 font-bold uppercase tracking-widest mb-4">Bhagavad Gita 7.14</p>
                                <p className="text-base text-foreground leading-relaxed font-mono mb-4">
                                    दैवी ह्येषा गुणमयी मम माया दुरत्यया ।<br />
                                    मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥ ७-१४॥
                                </p>
                                <p className="text-sm text-muted-foreground leading-relaxed italic">
                                    "This divine energy of Mine, consisting of the three modes of material nature, is difficult to overcome. But those who have surrendered unto Me cross over it easily."
                                </p>
                                <p className="text-xs text-muted-foreground mt-3">
                                    Krishna identifies maya as <em>daivi</em> (divine), <em>gunamayi</em> (constituted of the three gunas), and <em>mama</em> (his own energy), not an external adversary but the Lord's own creative power.
                                </p>
                            </div>

                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Advaita locates the mechanism in knowledge, not surrender. Vivekachudamani verse 108 states that maya is beginningless, made of the three gunas, the power of the Lord. Verse 110 states it is destroyed by realization of pure Brahman. The trajectory is: discrimination (viveka) identifies the real from the unreal; dispassion (vairagya) detaches from projected substitutes; self-inquiry (atma-vichara) removes avidya; recognition of Atman-Brahman identity is moksha.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Moksha is knowledge-based discovery of what was always present: the rope, not the snake.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/what-is-sanatan-dharma" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    What is Sanatan Dharma? <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-karma-dharma-work" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How Karma and Dharma Work <ArrowRight size={16} />
                                </Link>
                                <Link href="/fear-of-death-advaita-vedanta" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Fear of Death and Advaita <ArrowRight size={16} />
                                </Link>
                            </div>
                        </section>

                        {/* FAQs */}
                        <section className="mt-8">
                            <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight uppercase">Common Questions</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {faqs.map((faq) => (
                                    <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm">
                                        <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                        <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-orange-500/20">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Sources */}
                    <section className="mt-16 mb-20">
                        <h2 className="text-2xl font-display font-bold mb-8 text-muted-foreground uppercase tracking-wide">Sources &amp; Commentaries</h2>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a href="https://plato.stanford.edu/entries/shankara/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">
                                    Adi Shankara — Stanford Encyclopedia of Philosophy
                                </a>
                            </li>
                            <li>
                                <a href="https://iep.utm.edu/advaita-v/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">
                                    Advaita Vedanta — Internet Encyclopedia of Philosophy
                                </a>
                            </li>
                            <li>
                                <a href="https://www.wisdomlib.org/concept/maya" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">
                                    Maya — WisdomLib Concept Index
                                </a>
                            </li>
                            <li>
                                <a href="https://www.britannica.com/topic/maya-Indian-philosophy" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">
                                    Maya (Indian Philosophy) — Encyclopaedia Britannica
                                </a>
                            </li>
                            <li>
                                <span className="text-muted-foreground">
                                    Paul Hacker, <em>Vivarta: Studien zur Geschichte der illusionistischen Kosmologie und Erkenntnistheorie der Inder</em> — cited in Nicholson, <em>Unifying Hinduism</em> (Columbia University Press, 2010)
                                </span>
                            </li>
                            <li>
                                <span className="text-muted-foreground">
                                    Shankaracharya, <em>Vivekachudamani</em>, vv. 108–114 (Adi Shankaracharya, tr. Swami Madhavananda, Advaita Ashrama)
                                </span>
                            </li>
                        </ul>
                    </section>

                    {/* Footer CTA */}
                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Explore Non-Duality.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Maya is the core problem Advaita Vedanta diagnoses. Start with Advaita Vedanta explained, or go deeper into how Shankara, Ramanuja, and Madhva split on the question.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/advaita-vedanta-explained"
                                eventLabel="maya:footer:advaita"
                                trackPathName="advaita-vedanta-explained"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Advaita Vedanta Explained
                            </TrackedLink>
                            <TrackedLink
                                href="/advaita-vs-dvaita"
                                eventLabel="maya:footer:advaita-vs-dvaita"
                                trackPathName="advaita-vs-dvaita"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Advaita vs Dvaita
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
