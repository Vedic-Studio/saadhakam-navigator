import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, Circle, Volume2, Wind } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "How to Start Japa: The Complete Practice Guide (Mala, Mantra, Timing)",
    description:
        "Japa meditation gives the restless mind a specific job: 108 repetitions of a sacred sound. BG 10.25 calls it the highest sacrifice. Here is how to begin correctly.",
    alternates: {
        canonical: "https://www.opensadhaka.com/how-to-start-japa",
    },
    openGraph: {
        title: "How to Start Japa: Mala, Mantra, Timing, and the Three Levels of Practice",
        description:
            "Krishna calls japa the highest of all sacrifices (BG 10.25). Patanjali's Yoga Sutra 1.28 adds: repeat it and contemplate its meaning. Here is the full practice guide.",
        url: "https://www.opensadhaka.com/how-to-start-japa",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is Japa meditation?",
        answer:
            "Japa is the repetition of a sacred name, syllable, or mantra — either audibly, in a whisper, or mentally. The Bhagavad Gita (10.25) declares Japa to be the highest of all sacrifices. The practice works because it gives the restless mind a single, specific task that interrupts its ordinary pattern of associative noise.",
    },
    {
        question: "How many times should I repeat a mantra?",
        answer:
            "The traditional count is 108 repetitions, which is why a Japa Mala (rosary) has 108 beads. One full round of the Mala equals one cycle of 108 repetitions. Beginners can start with one round per sitting and add rounds as the mind steadies.",
    },
    {
        question: "What is the best mantra for beginners?",
        answer:
            "Om Namah Shivaya, Om Namo Narayanaya, and So'ham (I am That) are widely recommended for beginners. The best mantra is one that resonates with your temperament. Bija mantras (Aim, Hrim, Klim) from the Shakta tradition require diksha (formal initiation) before use.",
    },
    {
        question: "When is the best time to practice Japa?",
        answer:
            "Brahma Muhurta — the 48-minute period approximately 90 minutes before sunrise — is considered the most potent time for Japa, per Ashtanga Hridayam (Sutrasthana 2.1). At minimum, a consistent time each day builds the practice's momentum through habit reinforcement.",
    },
    {
        question: "What is the difference between Vaikhari, Upanshu, and Manasika Japa?",
        answer:
            "Vaikhari is audible japa — sound fully voiced. Upamshu is whispered — lips move, breath carries the syllables just below audible speech. Manasika is entirely mental — no movement, no sound. Vivekananda in Raja Yoga classifies these in ascending order: the verbal is the lowest, the mental is the highest, because the mental requires sustained inner concentration.",
    },
    {
        question: "Can I do Japa without a teacher?",
        answer:
            "Yes. Universal mantras such as Om and So'ham do not require initiation. Sivananda of the Divine Life Society recommended them openly for householders in Kaliyuga. Bija mantras specific to a deity's siddha lineage benefit from a qualified teacher's transmission.",
    },
    {
        question: "What is a Japa Mala?",
        answer:
            "A Japa Mala is a rosary of 108 beads plus one Meru (summit) bead. Hold it in the right hand, turning each bead with the thumb and middle finger. The index finger must not touch the string (Hari Bhakti Vilasa 17.114). At the Meru bead, reverse direction instead of crossing over it.",
    },
    {
        question: "How long does it take to see results from Japa?",
        answer:
            "Traditional texts use a 40-day consistent practice as a baseline threshold for noticeable shift in mental texture. The Purascharana formula in the Tantric tradition is more demanding: syllables multiplied by 100,000 repetitions for mantra siddhi. For practical modern use, Sivananda recommends 200 malas (21,600 repetitions) daily for serious sadhana.",
    },
];

const japaLevels = [
    {
        sanskrit: "वाचिक",
        roman: "Vaikhari",
        english: "Audible",
        icon: Volume2,
        detail:
            "Mantra voiced aloud. The sound vibrates in the throat and chest. Most beginners start here. Vivekananda in Raja Yoga calls this the lowest level, meaning it requires the least concentration — not that it is without value.",
    },
    {
        sanskrit: "उपांशु",
        roman: "Upamshu",
        english: "Whispered",
        icon: Wind,
        detail:
            "Lips move, breath carries the syllables just below hearing. The practice turns inward without demanding the full mental steadiness that silent japa requires. A reliable intermediate step.",
    },
    {
        sanskrit: "मानसिक",
        roman: "Manasika",
        english: "Mental / Silent",
        icon: Circle,
        detail:
            "No sound, no movement. Mantra arises and dissolves entirely within awareness. Vivekananda identifies this as the highest form because it demands — and builds — unbroken inner attention.",
    },
];

export default function HowToStartJapaPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline: "How to Start Japa: The Complete Practice Guide (Mala, Mantra, Timing)",
                description:
                    "Japa meditation gives the restless mind a specific job: 108 repetitions of a sacred sound. BG 10.25 calls it the highest sacrifice. Here is how to begin correctly.",
                url: "https://www.opensadhaka.com/how-to-start-japa",
                datePublished: "2026-03-20",
                dateModified: "2026-03-20",
                publisher: {
                    "@type": "Organization",
                    name: "OpenSadhaka",
                    url: "https://www.opensadhaka.com",
                },
                author: {
                    "@type": "Organization",
                    name: "OpenSadhaka Editorial",
                },
            },
            {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                    },
                })),
            },
        ],
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContentPageTracker slug="how-to-start-japa" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How to Start Japa", href: "/how-to-start-japa" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            How to Start{" "}
                            <span className="text-orange-500 italic">Japa</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Japa is the repetition of a sacred name or mantra — audibly, in a whisper, or mentally. It works because it assigns the restless mind a specific task: 108 repetitions of a single sound. The mind, occupied with that task, stops generating its usual associative noise. Krishna identifies japa as the highest of all sacrifices in Bhagavad Gita 10.25. Patanjali adds in Yoga Sutra 1.28 that the repetition must be paired with contemplation of the mantra&rsquo;s meaning.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            108 repetitions of one sound, repeated daily, is enough to change the texture of a mind.
                        </p>
                    </header>

                    {/* Quick-start orientation */}
                    <section className="mb-14 rounded-2xl border border-border/60 bg-card/40 p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Before You Begin</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li>
                                <strong className="text-foreground">This guide is for:</strong> anyone who wants a structured daily mantra practice grounded in traditional sources — from first-time practitioners to meditators who want to understand why japa works.
                            </li>
                            <li>
                                <strong className="text-foreground">What you need to start:</strong> a mantra, a Japa Mala (optional but useful), and a fixed time each day. No teacher required for universal mantras.
                            </li>
                            <li>
                                <strong className="text-foreground">Prerequisite reading:</strong>{" "}
                                <Link
                                    href="/how-to-start-meditating-daily"
                                    className="text-orange-400 hover:text-orange-300 transition-colors underline underline-offset-4"
                                >
                                    How to Start Meditating Daily
                                </Link>{" "}
                                covers the foundational sitting posture, breath awareness, and session structure that makes japa significantly easier.
                            </li>
                        </ul>
                    </section>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-14">

                            {/* Why Japa Works */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6 italic text-orange-400">
                                    Why Japa Works: The Mechanism
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The mind produces thoughts involuntarily. Left to itself, it generates chains of association — memory triggering worry, worry triggering planning, planning triggering more memory. Japa does not try to stop this process by force. It assigns the mind a replacement task specific enough to occupy it.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Swami Chinmayananda&rsquo;s commentary on BG 10.25 makes this explicit: japa involves &ldquo;the continuous turning of awareness toward the divine name, making it a practice of unbroken remembrance.&rdquo; Each bead on the mala marks one completed repetition. The count is not about accumulation — it is about maintaining the thread of attention.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Krishna names japa as the highest among sacrifices: <em>yajñānāṁ japa-yajño &apos;smi</em>. A yajna (sacrifice) is an offering that transforms both the giver and what is offered. In japa, the offering is attention itself.
                                </p>

                                {/* BG 10.25 card */}
                                <div className="bg-muted/30 rounded-3xl p-10 border border-border/50 mt-8">
                                    <p className="text-sm text-orange-400 font-bold uppercase tracking-wider mb-4">Bhagavad Gita 10.25</p>
                                    <p className="text-lg text-foreground font-medium italic leading-relaxed mb-4">
                                        maharṣīṇāṁ bhṛgur ahaṁ girām asmy ekam akṣaram /<br />
                                        yajñānāṁ japa-yajño &apos;smi sthāvarāṇāṁ himālayaḥ
                                    </p>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        &ldquo;Of great sages I am Bhrigu; of vibrations I am the transcendental Om; of sacrifices I am japa; of immovable things I am the Himalayas.&rdquo;
                                    </p>
                                </div>
                            </section>

                            {/* Step 1: Choose a Mantra */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 1: Choose a Mantra
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The tradition distinguishes two categories. Nama Japa uses a divine name — Rama, Om Namah Shivaya, Om Namo Narayanaya — and is open to all without formal initiation. Mantra Japa uses an initiated formula, typically a bija (seed syllable) such as Aim, Hrim, or Klim from the Shakta tradition, and requires diksha from a qualified teacher.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    For beginners without a teacher, Sivananda of the Divine Life Society recommended four options: Om Namah Shivaya (Shaiva, Panchakshara — five syllables, from the Yajurveda); Om Namo Narayanaya (Vaishnava, Ashtakshari — eight syllables); So&apos;ham (Vedanta/Yoga, the breath mantra); or plain Om. Chaitanya Mahaprabhu (1486–1534) elevated the divine name above initiation requirements, citing the Bhagavata Purana: &ldquo;In Kaliyuga, the divine name alone is sufficient for liberation.&rdquo;
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Pick one mantra. Stay with it. Switching mantras before a practice is established is the most common structural error.
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href="/how-to-choose-a-mantra"
                                        className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
                                    >
                                        Full guide: How to Choose a Mantra <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </section>

                            {/* Step 2: The Three Levels */}
                            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-8">
                                    Step 2: Know the Three Levels of Japa
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                    Vivekananda classifies japa in ascending order of concentration required in <em>Raja Yoga</em>. Start at the level where your attention can actually sustain — moving too quickly to mental japa before the mind is steady produces drift without discipline.
                                </p>
                                <div className="space-y-6">
                                    {japaLevels.map((level) => {
                                        const Icon = level.icon;
                                        return (
                                            <div
                                                key={level.roman}
                                                className="bg-background/60 rounded-2xl p-6 border border-border/30 flex gap-5"
                                            >
                                                <div className="mt-1 shrink-0">
                                                    <Icon className="text-orange-400 w-6 h-6" />
                                                </div>
                                                <div>
                                                    <div className="flex items-baseline gap-3 mb-2">
                                                        <span className="text-xl font-bold text-orange-400">{level.roman}</span>
                                                        <span className="text-sm text-muted-foreground italic">
                                                            {level.sanskrit} — {level.english}
                                                        </span>
                                                    </div>
                                                    <p className="text-base text-muted-foreground leading-relaxed">{level.detail}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-base text-muted-foreground mt-8 italic border-l-4 border-orange-500/30 pl-6">
                                    Vivekananda: &ldquo;The verbal or audible is the lowest, and the inaudible is the highest of all.&rdquo; Begin audible. Move to whispered when the count is effortless. Move to mental when the whispered practice is stable.
                                </p>
                            </section>

                            {/* Step 3: Use the Mala Correctly */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 3: Use the Mala Correctly
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    A Japa Mala has 108 beads plus one Meru (summit) bead. The Meru marks the start and end of each round — it is never counted as a repetition. Hold the mala in the right hand, draped over the middle finger, turned bead by bead with the thumb. The index finger must not touch the string: the Hari Bhakti Vilasa (17.114) specifies <em>tarjjanya na sprset sutram</em> — &ldquo;do not touch the string with the index finger.&rdquo;
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    At the Meru bead, reverse direction. Crossing over the Meru is considered a break in the practice&rsquo;s continuity. The reversal keeps the energetic circuit unbroken and signals the mind that another round is beginning.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Mala material carries tradition-specific weight: Rudraksha for Shaiva japa, Tulsi for Vaishnava japa. For Vedantic or breath-mantra practice, either is acceptable.
                                </p>
                            </section>

                            {/* Step 4: Timing — Brahma Muhurta */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 4: Set the Time — What Brahma Muhurta Actually Means
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Brahma Muhurta is not fixed at 4 AM. The Ashtanga Hridayam (Sutrasthana 2.1) defines it as the 48-minute period beginning approximately 96 minutes before sunrise. It shifts with the season and latitude. On most days in most climates it falls between 4:30 and 5:30 AM.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The Ayurvedic reasoning is that Vata — the quality of movement and clarity — dominates this period. The mind has not yet accumulated the day&rsquo;s sensory input. Japa during Brahma Muhurta meets less resistance than japa practiced in the evening, when the mind carries the full weight of the day&rsquo;s activity.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    If Brahma Muhurta is not yet accessible, Sivananda&rsquo;s practical instruction stands: a fixed time each day, kept without exception, builds far more power than an ideal time kept sporadically.
                                </p>
                            </section>

                            {/* Step 5: Patanjali — Meaning, Not Just Repetition */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Step 5: Contemplate the Meaning (Patanjali YS 1.28)
                                </h2>

                                {/* YS 1.28 card */}
                                <div className="bg-muted/30 rounded-3xl p-10 border border-border/50 mb-8">
                                    <p className="text-sm text-orange-400 font-bold uppercase tracking-wider mb-4">Yoga Sutra 1.28</p>
                                    <p className="text-lg text-foreground font-medium italic leading-relaxed mb-4">
                                        tajjapas tadarthabhāvanam
                                    </p>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        &ldquo;Repeat it and contemplate upon its meaning.&rdquo;
                                    </p>
                                </div>

                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Patanjali&rsquo;s instruction is specific: japa without meaning-contemplation is incomplete. The sutras preceding 1.28 establish Om as the sound of Ishvara (the Lord); 1.28 then says that repetition of Om should be paired with sustained awareness of what Om points to — the ground of consciousness, the presence behind all mental activity.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    This applies to any mantra. Om Namah Shivaya is not merely five syllables — it means &ldquo;salutation to Shiva,&rdquo; the auspicious ground of reality. So&apos;ham means &ldquo;I am That.&rdquo; Repeating So&apos;ham while holding awareness of &ldquo;That&rdquo; — infinite, undivided consciousness — is the intended practice.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Before beginning each round, briefly recall what the mantra means. The meaning does not need to be verbalized. Hold it as an orientation — a direction of awareness — as the repetition proceeds.
                                </p>
                            </section>

                            {/* So'ham and Ajapa Japa */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    The Breath Mantra: So&apos;ham and Ajapa Japa
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    So&apos;ham is the only mantra the body performs spontaneously. &ldquo;So&rdquo; coordinates with inhalation, &ldquo;Ham&rdquo; with exhalation. The Shiva Svarodaya (v.51) and the Vijnanabhairava Tantra (v.24) both document this: the breath repeats So&apos;ham approximately 21,600 times per day whether the practitioner is aware of it or not.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Prolonged deliberate japa practice can give way to Ajapa Japa — japa that happens without the practitioner initiating it. The mantra begins to repeat spontaneously in the background of awareness, even during other activities. This is not a spiritual goal to pursue. It is an indication that the repetition has deepened into the nervous system.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Sivananda describes this in <em>Japa Yoga</em> as the transition from deliberate practice to sahaja (natural) repetition. It takes sustained daily practice over months before this occurs reliably.
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href="/meditation-for-anxiety-overthinking"
                                        className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
                                    >
                                        Using mantra to address anxiety and overthinking <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </section>

                            {/* Common Mistakes */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Common Mistakes That Undermine the Practice
                                </h2>

                                <div className="space-y-5">
                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-foreground mb-2">1. Switching mantras before establishing one</h3>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            Each mantra carries a specific charge that accumulates through repetition. Switching because another mantra &ldquo;feels more powerful&rdquo; resets that accumulation. Choose one and keep it for at minimum 40 consecutive days before evaluating.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-foreground mb-2">2. Mechanical repetition without meaning</h3>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            Patanjali&rsquo;s YS 1.28 is explicit. Japa practiced as pure phonetic counting has value but misses the deeper mechanism. Meaning-awareness is what transforms the repetition from a counting exercise into an act of orientation toward the divine.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-foreground mb-2">3. Forcing mental japa before readiness</h3>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            A beginner moving immediately to silent mantra often produces only mental drift — the mind wanders and the count is lost after a few beads. Vaikhari japa anchors attention through sound and physical sensation. Build from audible to whispered to mental across weeks, not days.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-foreground mb-2">4. Pushing through fatigue</h3>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            Vivekananda is direct: &ldquo;One gets tired of Japa for two reasons. Sometimes one&rsquo;s brain is fatigued, sometimes it is the result of idleness. If the former, then one should give up Japa for the time being.&rdquo; Fatigue is not a spiritual obstacle to overcome. It is information.
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-foreground mb-2">5. Bija mantras without initiation</h3>
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            Aim, Hrim, and Klim carry specific resonances within Shakta sadhana. Using them without transmission from a qualified teacher can produce instability, particularly in the early stages when the practitioner lacks the context to interpret the effects. Stick with Nama Japa until initiation is available.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Mantras by tradition */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Mantras by Tradition: A Reference
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The tradition you resonate with determines the most natural starting mantra. These are the established Nama Japa options across the four main streams:
                                </p>

                                <div className="overflow-x-auto rounded-2xl border border-border/40 mb-6">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-muted/50 text-left">
                                                <th className="p-4 font-bold text-foreground">Tradition</th>
                                                <th className="p-4 font-bold text-orange-400">Mantra</th>
                                                <th className="p-4 font-bold text-muted-foreground">Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border/20">
                                            <tr>
                                                <td className="p-4 text-muted-foreground">Shaiva</td>
                                                <td className="p-4 text-foreground font-medium">Om Namah Shivaya</td>
                                                <td className="p-4 text-muted-foreground">Panchakshara (5 syllables), Yajurveda. Rudraksha mala.</td>
                                            </tr>
                                            <tr className="bg-muted/10">
                                                <td className="p-4 text-muted-foreground">Vaishnava</td>
                                                <td className="p-4 text-foreground font-medium">Om Namo Narayanaya</td>
                                                <td className="p-4 text-muted-foreground">Ashtakshari (8 syllables). Tulsi mala.</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-muted-foreground">Vaishnava (Gaudiya)</td>
                                                <td className="p-4 text-foreground font-medium">Hare Krishna Mahamantra</td>
                                                <td className="p-4 text-muted-foreground">16 names, 32 syllables. Chaitanya Mahaprabhu&rsquo;s primary recommendation.</td>
                                            </tr>
                                            <tr className="bg-muted/10">
                                                <td className="p-4 text-muted-foreground">Shakta</td>
                                                <td className="p-4 text-muted-foreground italic">Bija mantras (Aim, Hrim, Klim)</td>
                                                <td className="p-4 text-muted-foreground">Requires diksha. Not for use without initiation.</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 text-muted-foreground">Yoga / Vedanta</td>
                                                <td className="p-4 text-foreground font-medium">Om, So&apos;ham, Aham Brahmasmi</td>
                                                <td className="p-4 text-muted-foreground">Universal. No initiation required.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                    <Link
                                        href="/what-is-sanatan-dharma"
                                        className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
                                    >
                                        Understanding the traditions behind these mantras <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </section>

                            {/* Building a Sustainable Practice */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Building a Sustainable Practice
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Sivananda&rsquo;s prescription in <em>Japa Yoga</em> for serious practitioners is 200 malas (21,600 repetitions) per day — equal to the body&rsquo;s daily breath count, a deliberate parallel to So&apos;ham. For a beginning practitioner, one to three malas (108 to 324 repetitions) per sitting is a realistic and productive starting point.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The Purascharana formula from Tantric texts sets a threshold for mantra siddhi (proficiency): syllables in the mantra multiplied by 100,000 total repetitions. A five-syllable mantra like Om Namah Shivaya requires 500,000 repetitions. At one mala per day (108 repetitions), that is approximately 12.7 years. At five malas per day, approximately 2.5 years. These numbers are not discouraging — they explain why daily consistency over sustained time is the actual structure of the practice.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Consistency matters more than quantity. One mala every day for 40 consecutive days produces a more stable foundation than ten malas practiced three days per week.
                                </p>

                                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                    <Link
                                        href="/daily-spiritual-routine-beginners"
                                        className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
                                    >
                                        How to build a complete daily spiritual routine <ArrowRight size={16} />
                                    </Link>
                                    <Link
                                        href="/meditation-for-burnout"
                                        className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors"
                                    >
                                        Japa and burnout recovery <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </section>

                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
                            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="font-display text-lg font-bold mb-4 uppercase tracking-wide text-orange-400">Key Terms</h3>
                                <dl className="space-y-4 text-sm">
                                    <div>
                                        <dt className="font-bold text-foreground">Japa</dt>
                                        <dd className="text-muted-foreground mt-1">Repetition of a sacred name or mantra. From Sanskrit root <em>jap</em>: to mutter, to whisper.</dd>
                                    </div>
                                    <div>
                                        <dt className="font-bold text-foreground">Mala</dt>
                                        <dd className="text-muted-foreground mt-1">Prayer rosary of 108 beads + 1 Meru bead. Tracks repetition count without breaking attention.</dd>
                                    </div>
                                    <div>
                                        <dt className="font-bold text-foreground">Diksha</dt>
                                        <dd className="text-muted-foreground mt-1">Formal initiation. Required for bija mantras; not required for Nama Japa or universal mantras.</dd>
                                    </div>
                                    <div>
                                        <dt className="font-bold text-foreground">Brahma Muhurta</dt>
                                        <dd className="text-muted-foreground mt-1">The 48-minute pre-sunrise period. Defined in Ashtanga Hridayam (Sutrasthana 2.1), not fixed at 4 AM.</dd>
                                    </div>
                                    <div>
                                        <dt className="font-bold text-foreground">Ajapa Japa</dt>
                                        <dd className="text-muted-foreground mt-1">Spontaneous repetition: the mantra continues without deliberate effort. The endpoint of sustained practice.</dd>
                                    </div>
                                    <div>
                                        <dt className="font-bold text-foreground">Purascharana</dt>
                                        <dd className="text-muted-foreground mt-1">Syllables x 100,000 repetitions. The Tantric formula for mantra siddhi (proficiency).</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="font-display text-lg font-bold mb-4 uppercase tracking-wide">Sources Used</h3>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li><strong className="text-foreground">BG 10.25</strong> — yajñānāṁ japa-yajño &apos;smi</li>
                                    <li><strong className="text-foreground">YS 1.28</strong> — tajjapas tadarthabhāvanam</li>
                                    <li><strong className="text-foreground">Vivekananda</strong> — Raja Yoga (1896)</li>
                                    <li><strong className="text-foreground">Sivananda</strong> — Japa Yoga, Divine Life Society</li>
                                    <li><strong className="text-foreground">Chinmayananda</strong> — BG 10.25 commentary</li>
                                    <li><strong className="text-foreground">Hari Bhakti Vilasa</strong> — 17.114 (mala rules)</li>
                                    <li><strong className="text-foreground">Ashtanga Hridayam</strong> — Sutrasthana 2.1</li>
                                    <li><strong className="text-foreground">Vijnanabhairava Tantra</strong> — v.24</li>
                                    <li><strong className="text-foreground">Shiva Svarodaya</strong> — v.51</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="font-display text-lg font-bold mb-4 uppercase tracking-wide">Related Practices</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href="/how-to-start-meditating-daily" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                                            <ArrowRight size={12} />
                                            How to Start Meditating Daily
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/best-meditation-style-for-your-personality" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                                            <ArrowRight size={12} />
                                            Best Meditation Style for You
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/daily-spiritual-routine-beginners" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                                            <ArrowRight size={12} />
                                            Daily Spiritual Routine
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/advaita-vedanta-explained" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-2">
                                            <ArrowRight size={12} />
                                            Advaita Vedanta Explained
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>

                    {/* FAQs */}
                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight uppercase">
                            Common Questions
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl border border-border/40 bg-card/30 p-6"
                                >
                                    <h3 className="font-bold text-foreground mb-3 text-base leading-snug">
                                        {faq.question}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sources */}
                    <section className="mb-20">
                        <h2 className="text-2xl font-display font-bold mb-8 text-muted-foreground uppercase tracking-wide">
                            Sources &amp; Commentaries
                        </h2>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li>
                                <strong className="text-foreground">Bhagavad Gita 10.25</strong> — maharṣīṇāṁ bhṛgur ahaṁ... yajñānāṁ japa-yajño &apos;smi. Krishna&rsquo;s self-identification with japa as the highest sacrifice.
                            </li>
                            <li>
                                <strong className="text-foreground">Patanjali, Yoga Sutra 1.28</strong> — tajjapas tadarthabhāvanam. The instruction that japa must be paired with meaning-contemplation.
                            </li>
                            <li>
                                <strong className="text-foreground">Swami Vivekananda, Raja Yoga (1896)</strong> — Classification of Vaikhari, Upamshu, and Manasika japa; on fatigue in japa practice.
                            </li>
                            <li>
                                <strong className="text-foreground">Swami Sivananda, Japa Yoga</strong> — Divine Life Society. On japa as the primary sadhana for Kaliyuga; practical prescriptions for daily practice.
                            </li>
                            <li>
                                <strong className="text-foreground">Swami Chinmayananda, BG 10.25 Commentary</strong> — Chinmaya Mission. &ldquo;Japa involves the continuous turning of awareness toward the divine name.&rdquo;
                            </li>
                            <li>
                                <strong className="text-foreground">Hari Bhakti Vilasa 17.114</strong> — tarjjanya na sprset sutram. On correct mala technique: index finger prohibition.
                            </li>
                            <li>
                                <strong className="text-foreground">Ashtanga Hridayam, Sutrasthana 2.1</strong> — Brahma Muhurta defined as the period beginning 96 minutes before sunrise.
                            </li>
                            <li>
                                <strong className="text-foreground">Vijnanabhairava Tantra, v.24</strong> — So&apos;ham breath mantra. The inhalation carries &ldquo;So,&rdquo; exhalation &ldquo;Ham.&rdquo;
                            </li>
                            <li>
                                <strong className="text-foreground">Shiva Svarodaya, v.51</strong> — 21,600 breaths per day as the natural Ajapa Japa count.
                            </li>
                            <li>
                                <strong className="text-foreground">Bhagavata Purana</strong> — &ldquo;Kalau nama-matra eva moksha-dayakam.&rdquo; The divine name alone is sufficient in Kaliyuga, per Chaitanya Mahaprabhu&rsquo;s reading.
                            </li>
                        </ul>
                    </section>

                    {/* CTA */}
                    <div className="bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-3xl" />
                        <div className="relative">
                            <h2 className="text-3xl md:text-4xl font-display font-black mb-4 tracking-tight">
                                Build the full daily practice
                            </h2>
                            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                                Japa fits inside a broader morning routine that includes pranayama, seated meditation, and study. The combination is more stable than any single practice alone.
                            </p>
                            <TrackedLink
                                href="/how-to-start-meditating-daily"
                                eventLabel="japa:footer:meditating-daily"
                                trackPathName="how-to-start-meditating-daily"
                                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl hover:bg-orange-50 transition-colors text-lg"
                            >
                                How to Start Meditating Daily <ArrowRight size={20} />
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
