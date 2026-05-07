import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, Sun, Wind, Circle, BookOpen, Brain } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Daily Spiritual Routine for Beginners: 5-Step Morning Sequence (Patanjali to Sivananda)",
    description:
        "Most morning routines skip the order. The 5-step sequence — Brahma Muhurta, pranayama, japa, svadhyaya, meditation — sourced from Patanjali, Vagbhata, Sivananda, Chinmaya Mission.",
    alternates: {
        canonical: "https://www.opensadhaka.com/daily-spiritual-routine-beginners",
    },
    openGraph: {
        title: "Daily Spiritual Routine: 5-Step Sequence Beginners Get Wrong",
        description:
            "Pranayama before japa, japa before svadhyaya, svadhyaya before meditation. Each step primes the next. The canonical order with primary sources.",
        url: "https://www.opensadhaka.com/daily-spiritual-routine-beginners",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is Brahma Muhurta and when does it start?",
        answer:
            "Brahma Muhurta is the 14th muhurta of the night — a 48-minute window that begins 96 minutes before sunrise. Vagbhata prescribes it in Ashtanga Hridayam Sutrasthana 2.1 as the time a healthy person should rise. It falls in the Ayurvedic Vata period when sattva (mental clarity) peaks and tamas (dullness) is at its lowest.",
    },
    {
        question: "Why does pranayama come before japa in a spiritual routine?",
        answer:
            "Patanjali's Yoga Sutra 2.53 states that pranayama makes the mind 'fit for dharana' (concentration). The Sandhyavandana ritual embeds pranayama as a Purvanga (preliminary) before Gayatri Japa. Chinmaya Mission's 42 Sadhanas explicitly prescribe ten pranayamas before japa. Breath regulation clears the obstacle that japa needs absent: a scattered mind.",
    },
    {
        question: "What does svadhyaya actually mean?",
        answer:
            "In Yoga Sutra 2.32 and the Vedantic tradition, svadhyaya means Vedic recitation, scripture study, and mantra practice — not journaling or psychological self-reflection. Taittiriya Upanishad 1.9.1 states: 'Svadhyaya pravachanabhyam na pramaditavyam' — never neglect study and teaching.",
    },
    {
        question: "What if I cannot wake up at Brahma Muhurta?",
        answer:
            "The principle behind Brahma Muhurta is practicing before the day's impressions accumulate. If 4 AM is not realistic, practice before other obligations begin. The sequence (pranayama → japa → study → meditation) matters more than the clock. A routine at 6 AM in the correct order outperforms a routine at 4 AM in random order.",
    },
    {
        question: "Why is meditation the last step in a daily spiritual routine?",
        answer:
            "Meditation (dhyana) is the 7th of Patanjali's eight limbs — it presupposes pranayama (4th), pratyahara (5th), and dharana (6th). Sitting in silence without prior breath regulation and japa means attempting a sixth-limb practice with the fourth absent. Five clear minutes after japa are more productive than twenty vague minutes attempted cold.",
    },
    {
        question: "How long should a beginner's daily spiritual routine be?",
        answer:
            "Twenty to thirty minutes is enough to establish the full sequence. The minimum viable routine: ten pranayamas (4 min), one round of japa at 108 repetitions (8–10 min), one paragraph of scripture (5 min), five minutes of seated silence. That is under 25 minutes. Consistency matters more than duration.",
    },
];

const steps = [
    {
        num: "1",
        sanskrit: "ब्रह्ममुहूर्त",
        roman: "Brahma Muhurta",
        english: "Rise before dawn",
        icon: Sun,
        time: "96 min before sunrise",
    },
    {
        num: "2",
        sanskrit: "प्राणायाम",
        roman: "Pranayama",
        english: "Regulate breath",
        icon: Wind,
        time: "10–20 rounds",
    },
    {
        num: "3",
        sanskrit: "जप",
        roman: "Japa",
        english: "Mantra repetition",
        icon: Circle,
        time: "108+ repetitions",
    },
    {
        num: "4",
        sanskrit: "स्वाध्याय",
        roman: "Svadhyaya",
        english: "Scripture study",
        icon: BookOpen,
        time: "10–60 min",
    },
    {
        num: "5",
        sanskrit: "ध्यान",
        roman: "Dhyana",
        english: "Seated meditation",
        icon: Brain,
        time: "5–30 min",
    },
];

export default function DailySpiritualRoutineBeginnersPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="daily-spiritual-routine-beginners" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Daily Spiritual Routine", href: "/daily-spiritual-routine-beginners" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The <span className="text-orange-500 italic">Architecture</span> of Practice
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> A traditional daily spiritual routine follows five steps in a fixed order: rise at Brahma Muhurta (96 minutes before sunrise), regulate breath through pranayama, perform japa (mantra repetition), study scripture (svadhyaya), then sit in meditation. The order is not preference. Pranayama steadies the breath so japa can penetrate. Japa stills the mind so scripture lands. Scripture seeds contemplation so meditation deepens. Each step removes an obstacle the next step requires to be absent.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The order maps mental events, not personal preference. Traditions that disagree on everything else agree on this sequence.
                        </p>
                    </header>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-14">

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6 italic text-orange-400">
                                    A Routine Is Not a Playlist
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Most people treat a spiritual routine as a personal playlist: whatever feels meaningful in the morning, combined in whatever order seems natural. Traditional sources treat it as architecture. The practices have a canonical sequence. The sequence is not preference. Each step removes an obstacle the next step requires to be absent.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The five-step order appears across Shaiva, Vaishnava, Smarta, and Advaita lineages. The agreement among traditions that disagree on everything else indicates the sequence rests on observed phenomenology, not theological convention.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Bhagavad Gita 6.35 gives the logic: <em className="text-foreground">abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate</em> — by practice and by dispassion, the mind is restrained. Practice first. Dispassion follows.
                                </p>
                            </section>

                            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                                    <Sun className="text-orange-500 w-8 h-8" />
                                    The Canonical Sequence
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {steps.map((s) => (
                                        <div key={s.num} className="bg-background/60 rounded-2xl p-5 border border-border/30 flex items-start gap-4">
                                            <span className="text-3xl font-black text-orange-400 leading-none mt-1">{s.num}</span>
                                            <div>
                                                <div className="flex items-baseline gap-2 mb-1">
                                                    <span className="text-lg font-bold text-foreground">{s.roman}</span>
                                                    <span className="text-sm text-muted-foreground">({s.sanskrit})</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{s.english}</p>
                                                <p className="text-xs text-orange-400/80 mt-1">{s.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 1: Vagbhata and the Ashtanga Hridayam Prescription
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Vagbhata, the 7th-century Ayurvedic physician and author of the <em className="text-foreground">Ashtanga Hridayam</em>, opens his chapter on daily regimen with a single instruction: <em className="text-foreground">brāhme muhūrte uttiṣṭhet svastho rakṣārtham āyuṣaḥ</em> (Sutrasthana 2.1) — a healthy person should rise at Brahma Muhurta to protect their life. Brahma Muhurta is the 14th muhurta of the night: a 48-minute window that begins 96 minutes before sunrise.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The timing is not symbolic. The Ayurvedic and Vedantic traditions both hold that tamas (the quality of inertia and dullness) is highest in the early night hours and falls as Brahma Muhurta arrives. Sattva (clarity and luminosity) peaks at its daily maximum. The mind, not yet burdened by the day's impressions, is most permeable to practice.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Sivananda's prescribed morning sadhana begins at 4 AM, within Brahma Muhurta for most latitudes and seasons. The first acts after rising are ablutions and light movement, not screens or conversation. The body is being prepared for the breath. The breath will prepare the mind.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 2: Pranayama Before Mantra — Patanjali, Vyasa, and the Sandhyavandana
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Patanjali places pranayama as the fourth limb of Ashtanga Yoga, between Asana (3rd) and Pratyahara (5th). Yoga Sutra 2.52 states it destroys <em className="text-foreground">prakāśāvaraṇam</em> — the veil over knowledge. YS 2.53 follows: pranayama makes the mind fit for <em className="text-foreground">dhāraṇā</em> (sustained concentration). Patanjali's commentator Vyasa adds in the Yoga Bhashya (c. 600 CE): "There is no purificatory action higher than pranayama."
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Swatmarama's <em className="text-foreground">Hatha Yoga Pradipika</em> (2.2) states the mechanism: <em className="text-foreground">chale vāte chalaṃ cittaṃ niścale niścalaṃ bhavet</em> — when the breath wanders, the mind is unsteady; when the breath is still, the mind becomes still. The causal arrow runs from breath to mind. You steady the breath and receive concentration as the consequence.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The Sandhyavandana — the canonical Vedic ritual performed at the three daily transitions — embeds pranayama as a <em className="text-foreground">Pūrvāṅga</em> (preliminary). It appears before Gayatri Japa. Chinmaya Mission's 42 Sadhanas, compiled under Swami Chinmayananda (1916–1993), state the directive without ambiguity: ten pranayamas must precede the japa. Sivananda's sequence prescribes 20 rounds of pranayama before slokas, stotras, or any mantra repetition.
                                </p>
                                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 mb-6">
                                    <p className="mb-0 text-muted-foreground">
                                        <strong className="text-foreground">Pranayama is the step most often cut when the practitioner is short on time.</strong> It is also the step whose omission most degrades everything that follows. Chinmaya Mission's minimum (ten pranayamas) takes under four minutes. The cost of omitting it is disproportionate to the time saved.
                                    </p>
                                </div>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For the techniques themselves, see{" "}
                                    <TrackedLink href="/practices/pranayama" eventLabel="routine:body:pranayama-practice" trackPathName="pranayama" className="text-orange-400 hover:text-orange-300 font-semibold">
                                        Pranayama Practice
                                    </TrackedLink>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 3: Japa — The Pivot of the Sequence (Bhagavad Gita, Patanjali)
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Japa is the repetition of a sacred name or mantra — Vaikhari (audible), Upamshu (whispered), or Manasika (mental). Krishna identifies it in Bhagavad Gita 10.25 as the highest of all sacrifices: <em className="text-foreground">yajñānāṃ japa-yajño 'smi</em>. The practice works because it assigns the mind a specific, bounded task. But the task only penetrates if the instrument has been prepared by pranayama.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Patanjali's Yoga Sutra 1.28 adds the second condition: japa must be paired with contemplation of the mantra's meaning (<em className="text-foreground">tajjapas tadarthabhāvanam</em>). Repetition without meaning-attention is mechanical exercise. The prior breath regulation reduces the mind's tendency to drift. This allows meaning to register rather than being overrun by associative noise.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Sivananda prescribed 108 to 21,600 repetitions depending on level. Beginners start with one mala (108 repetitions). The Japa Mala is held in the right hand; each bead turned by the thumb and middle finger; the index finger must not touch the string (Hari Bhakti Vilasa 17.114). At the Meru bead, reverse direction rather than crossing over it.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Sivananda distinguishes two phases: <em className="text-foreground">Japa-Sahita-Dhyana</em> (meditation with japa, for beginners) and <em className="text-foreground">Japa-Rahita-Dhyana</em> (meditation without japa, for advanced practitioners). Japa is the training ground for dhyana, not a lesser practice. It is the bridge between breath and silence.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For mala technique, mantra selection, and the three levels of repetition, see{" "}
                                    <TrackedLink href="/how-to-start-japa" eventLabel="routine:body:start-japa" trackPathName="how-to-start-japa" className="text-orange-400 hover:text-orange-300 font-semibold">
                                        How to Start Japa
                                    </TrackedLink>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 4: Svadhyaya — What Scripture Study Means (Taittiriya Upanishad, Patanjali)
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    A common misconception flattens svadhyaya into journaling or self-reflection. In Yoga Sutra 2.32 and throughout the Vedantic tradition, its primary referent is Vedic recitation, scripture study, and mantra practice. Taittiriya Upanishad 1.9.1 states without ambiguity: <em className="text-foreground">svādhyāya pravachanābhyāṃ na pramaditavyam</em> — never neglect study and teaching. Not reflection. Not journaling. Study of what has been revealed.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Svadhyaya sits after japa because japa has already begun the work of stabilizing the mind. The Bhagavad Gita, an Upanishad, or Shankaracharya's commentary — these texts require a mind capable of holding a sustained line of thought without deflection. Japa builds that capacity; svadhyaya uses it. Scripture enters a prepared instrument, not a scattered one.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Sivananda prescribed 30 minutes to one hour for svadhyaya within his morning sequence. The content should be a primary text with commentary: Upanishads, Bhagavad Gita, Vivekachudamani, Yoga Vasistha. These texts deposit ideas that subsequent meditation can process in silence rather than inventing its own objects from ambient mental noise.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For where to begin in the primary texts, see{" "}
                                    <TrackedLink href="/vedas-upanishads-bhagavad-gita-guide" eventLabel="routine:body:vedas-guide" trackPathName="vedas-upanishads-bhagavad-gita-guide" className="text-orange-400 hover:text-orange-300 font-semibold">
                                        Vedas, Upanishads, and Bhagavad Gita Guide
                                    </TrackedLink>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 5: Dhyana — Why Meditation Is Last (Patanjali's Eight Limbs)
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Meditation is the last step because it requires what all prior steps have built: a body that has moved, a breath that is steady, a mind occupied and then settled by japa, an intellect seeded by scripture. Bhagavad Gita 6.35 states the logic: <em className="text-foreground">abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate</em> — by practice and by dispassion, the mind is restrained. Practice first.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Patanjali's eight limbs encode this accumulation. Asana (3rd limb) stabilizes the body. Pranayama (4th) penetrates the veil over knowledge. Pratyahara (5th) withdraws the senses from objects. Dharana (6th), Dhyana (7th), and Samadhi (8th) are deepening stages of the same inward movement — accessible after the prior limbs have cleared the ground. They are not separate techniques. They are consequences of correct preparation.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The practitioner who sits to meditate without prior pranayama and japa is not meditating badly. They are attempting a sixth-limb practice with the fourth and fifth absent. The results reflect the gap. Five clear minutes of dhyana after japa will be more productive than twenty vague minutes attempted cold.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For the method of seated meditation, see{" "}
                                    <TrackedLink href="/how-to-start-meditating-daily" eventLabel="routine:body:meditating-daily" trackPathName="how-to-start-meditating-daily" className="text-orange-400 hover:text-orange-300 font-semibold">
                                        How to Start Meditating Daily
                                    </TrackedLink>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Cross-Tradition Agreement: Shankaracharya and the Three Sandhyas
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The five-step logic is not the preference of one school. The Sandhyavandana tradition — three daily ritual observances prescribed across Shaiva, Vaishnava, and Smarta lineages — encodes the identical architecture. Pratahsandhya (dawn), Madhyahnika (noon), and Sayamsandhya (dusk) each begin with pranayama as Purvanga. Gayatri Japa follows. Shankaracharya's Panchayatana Puja systematization operates within this framework.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The structural agreement across traditions that disagree on metaphysics — Advaita and Dvaita, Shaiva and Vaishnava — signals that the sequence rests on observed facts about how the mind moves, not on theology. Breath steadies mind. Mantra focuses mind. Scripture seeds mind. Silence harvests what was seeded.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For a broader orientation to the tradition, see{" "}
                                    <TrackedLink href="/what-is-sanatan-dharma" eventLabel="routine:body:sanatan-dharma" trackPathName="what-is-sanatan-dharma" className="text-orange-400 hover:text-orange-300 font-semibold">
                                        What is Sanatan Dharma
                                    </TrackedLink>.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Three Errors That Dismantle the Sequence
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The first error is meditating first, then doing japa. Meditation requires a degree of concentration that japa builds. Beginning with dhyana on an unprepared mind produces what practitioners describe as "sitting with monkey mind." Patanjali's limb sequence exists to prevent this.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The second error is skipping pranayama when time is short. Pranayama is the step most often cut, and also the step whose omission most degrades what follows. Chinmaya Mission's prescribed minimum (ten pranayamas) takes under four minutes. The cost of omission is disproportionate to the time gained.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    The third error is treating svadhyaya as optional enrichment. Without scripture study, the mind in meditation defaults to replaying the day's concerns. The Taittiriya Upanishad's instruction — never neglect study — is a structural warning, not an academic aspiration. The quality of the object determines the quality of the absorption.
                                </p>
                            </section>

                            <section className="rounded-2xl border border-border/60 bg-card/40 p-8">
                                <h2 className="text-2xl font-display font-bold mb-4">Minimum Viable Sequence</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    On constrained days, the irreducible routine is:
                                </p>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold mt-0.5">1.</span>
                                        <span>Ten pranayamas (4 minutes)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold mt-0.5">2.</span>
                                        <span>One round of japa — 108 repetitions (8–10 minutes)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold mt-0.5">3.</span>
                                        <span>One paragraph of scripture (5 minutes)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold mt-0.5">4.</span>
                                        <span>Five minutes of seated silence</span>
                                    </li>
                                </ul>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    Under 25 minutes. A small routine practiced daily has more formative power than a long routine practiced twice a week.
                                </p>
                            </section>

                        </div>

                        <aside className="hidden lg:block space-y-8 self-start sticky top-28">
                            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Article Type</h3>
                                <p className="text-sm text-muted-foreground">Spoke — Practices Cluster</p>
                                <p className="text-xs text-muted-foreground/60 mt-1">~2,200 words · 10 min read</p>
                            </div>

                            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Key Sources</h3>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li>Ashtanga Hridayam 2.1 (Vagbhata)</li>
                                    <li>Yoga Sutras 2.52–53 (Patanjali)</li>
                                    <li>Hatha Yoga Pradipika 2.2</li>
                                    <li>Bhagavad Gita 6.35, 10.25</li>
                                    <li>Taittiriya Upanishad 1.9.1</li>
                                    <li>42 Sadhanas (Chinmaya Mission)</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Related Practices</h3>
                                <ul className="space-y-3">
                                    <li>
                                        <TrackedLink href="/how-to-start-japa" eventLabel="routine:sidebar:japa" trackPathName="how-to-start-japa" className="text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2">
                                            How to Start Japa <ArrowRight className="w-3 h-3" />
                                        </TrackedLink>
                                    </li>
                                    <li>
                                        <TrackedLink href="/how-to-start-meditating-daily" eventLabel="routine:sidebar:meditation" trackPathName="how-to-start-meditating-daily" className="text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2">
                                            How to Start Meditating Daily <ArrowRight className="w-3 h-3" />
                                        </TrackedLink>
                                    </li>
                                    <li>
                                        <TrackedLink href="/best-meditation-style-for-your-personality" eventLabel="routine:sidebar:style" trackPathName="best-meditation-style-for-your-personality" className="text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2">
                                            Best Meditation Style <ArrowRight className="w-3 h-3" />
                                        </TrackedLink>
                                    </li>
                                    <li>
                                        <TrackedLink href="/vedas-upanishads-bhagavad-gita-guide" eventLabel="routine:sidebar:vedas-guide" trackPathName="vedas-upanishads-bhagavad-gita-guide" className="text-sm text-orange-400 hover:text-orange-300 font-medium flex items-center gap-2">
                                            Vedas, Upanishads &amp; BG Guide <ArrowRight className="w-3 h-3" />
                                        </TrackedLink>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>

                    {/* FAQs */}
                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-black mb-10 tracking-tight">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sources */}
                    <section className="mb-20 rounded-2xl border border-border/40 bg-card/20 p-8">
                        <h2 className="text-2xl font-display font-bold mb-6">Sources &amp; Commentaries</h2>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <strong className="text-foreground">Ashtanga Hridayam</strong> — Vagbhata (c. 7th century CE). Sutrasthana Chapter 2: Dinacharya (Daily Regimen). The Brahma Muhurta prescription.
                            </li>
                            <li>
                                <strong className="text-foreground">Yoga Sutras of Patanjali</strong> — with Vyasa Bhashya (c. 600 CE). Sutras 1.12, 1.28, 2.29, 2.32, 2.52–53. The eight-limbed structure and pranayama's function.
                            </li>
                            <li>
                                <strong className="text-foreground">Hatha Yoga Pradipika</strong> — Swatmarama (c. 14th century). Chapter 2, Verse 2. The breath-mind causal relationship.
                            </li>
                            <li>
                                <strong className="text-foreground">Bhagavad Gita</strong> — Chapters 6 (verse 35: abhyasa and vairagya) and 10 (verse 25: japa-yajna). Krishna on practice and japa.
                            </li>
                            <li>
                                <strong className="text-foreground">Taittiriya Upanishad</strong> — 1.9.1: Svadhyaya as a central pursuit. Late Vedic period.
                            </li>
                            <li>
                                <strong className="text-foreground">Sivananda, Swami</strong> — "Twenty Important Spiritual Instructions" and <em>Japa Yoga</em>. Divine Life Society, Rishikesh. The explicit sadhana sequence.
                            </li>
                            <li>
                                <strong className="text-foreground">Chinmayananda, Swami</strong> — 42 Chinmaya Sadhanas. Chinmaya Mission. "Ten pranayamas must precede the japa."
                            </li>
                            <li>
                                <strong className="text-foreground">Hari Bhakti Vilasa</strong> — 17.114. Japa mala technique prescription.
                            </li>
                        </ul>
                    </section>

                    {/* CTA */}
                    <section className="rounded-3xl bg-gradient-to-br from-orange-600 to-orange-700 p-10 md:p-14 text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4">
                            The pivot of the sequence is Japa
                        </h2>
                        <p className="text-orange-100 text-lg max-w-2xl mx-auto mb-8">
                            Japa sits between breath regulation and meditation. It is the step that converts physical preparation into mental readiness. Start there.
                        </p>
                        <TrackedLink
                            href="/how-to-start-japa"
                            eventLabel="routine:footer:start-japa"
                            trackPathName="how-to-start-japa"
                            className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl hover:bg-orange-50 transition-colors text-lg"
                        >
                            How to Start Japa <ArrowRight className="w-5 h-5" />
                        </TrackedLink>
                    </section>
                </div>
            </main>

            <Footer />

            {/* JSON-LD: Article */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: "Daily Spiritual Routine for Beginners: 5-Step Morning Sequence (Patanjali to Sivananda)",
                        description:
                            "Rise at Brahma Muhurta, regulate breath, do japa, study scripture, then meditate. Each step prepares the mind for the next.",
                        url: "https://www.opensadhaka.com/daily-spiritual-routine-beginners",
                        datePublished: "2026-03-21",
                        dateModified: "2026-03-21",
                        author: {
                            "@type": "Organization",
                            name: "Open Sadhaka",
                            url: "https://www.opensadhaka.com",
                        },
                        publisher: {
                            "@type": "Organization",
                            name: "Open Sadhaka",
                            url: "https://www.opensadhaka.com",
                        },
                    }),
                }}
            />

            {/* JSON-LD: FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                    }),
                }}
            />
        </div>
    );
}
