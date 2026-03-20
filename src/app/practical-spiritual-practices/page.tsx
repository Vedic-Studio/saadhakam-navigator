import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, GraduationCap, Layers } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Practical Spiritual Practices: The Graded Curriculum from the Gita, Yoga Sutras & Shankara",
    description:
        "Indian spiritual practice is a graded curriculum, not a buffet. The Gita, Yoga Sutras, and Shankara's sadhana chatushtaya prescribe practices in order of readiness. Learn the sequence.",
    alternates: {
        canonical: "https://www.opensadhaka.com/practical-spiritual-practices",
    },
    openGraph: {
        title: "Practical Spiritual Practices: The Graded Curriculum from the Gita, Yoga Sutras & Shankara",
        description:
            "The Bhagavad Gita, Patanjali's Yoga Sutras, and Shankaracharya's Vivekachudamani all prescribe practices in a specific sequence tied to the practitioner's readiness. Here is the complete framework.",
        url: "https://www.opensadhaka.com/practical-spiritual-practices",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is sadhana chatushtaya?",
        answer:
            "Sadhana chatushtaya is Shankaracharya's four-fold qualification for Vedanta study: viveka (discrimination between the eternal and the temporary), vairagya (dispassion toward sense objects), shamadi-shatka-sampatti (six inner disciplines — calmness, control, withdrawal, forbearance, faith, and single-pointedness), and mumukshutva (intense longing for liberation). Vivekachudamani verses 18-19 state these are necessary conditions, not optional preparations. Without them, the teaching does not produce the fruit.",
    },
    {
        question: "Can I practice Karma Yoga and Jnana Yoga at the same time?",
        answer:
            "Shankara's Bhashya on Bhagavad Gita 3.3 is explicit: 'From no point of view whatsoever can there be a combination of Knowledge and action.' The two paths address different stages of inner readiness. Karma Yoga purifies the mind so that Jnana Yoga becomes possible. Attempting Jnana Yoga before the purification is complete produces intellectual understanding but not liberating knowledge.",
    },
    {
        question: "What are the eight limbs of yoga in order?",
        answer:
            "Patanjali's Yoga Sutra 2.29 lists eight limbs in sequence: yama (ethical restraints), niyama (observances), asana (steady posture), pranayama (breath regulation), pratyahara (withdrawal of senses), dharana (concentration), dhyana (meditation), and samadhi (absorption). Yoga Sutra 2.28 specifies that the progressive practice of these limbs destroys impurity and leads to discriminative wisdom. The sequence is deliberate — outer disciplines precede inner ones.",
    },
    {
        question: "What does adhikari-bheda mean?",
        answer:
            "Adhikari-bheda is the classical doctrine that different teachings are appropriate for different levels of readiness. The word adhikari means 'one who has the qualification.' The Bhagavad Gita encodes this in 17.2, where Krishna explains that a person's innate faith (shraddha) is shaped by their guna constitution — sattvic, rajasic, or tamasic. The teacher's task is to identify the student's level and prescribe accordingly, not to offer every practice to everyone simultaneously.",
    },
    {
        question: "Is Vivekananda's four-yoga framework traditional?",
        answer:
            "No. Vivekananda's equal-footing synthesis of Karma, Bhakti, Raja, and Jnana Yoga as four parallel paths for four personality types was formulated in the 1890s and published in Raja Yoga (1896). Classical texts assign the paths a sequential rather than parallel relationship. The Gita's 18 chapters, divided by Madhusudana Sarasvati into Karma Yoga (Ch. 1-6), Bhakti Yoga (Ch. 7-12), and Jnana Yoga (Ch. 13-18), present them as stages.",
    },
    {
        question: "How do I know which practice to start with?",
        answer:
            "Chinmayananda's BMI chart offers one diagnostic: if your problem is mala (mental impurity — restlessness, distraction, compulsive action), begin with Karma Yoga. If it is vikshepa (fickleness, emotional instability), begin with Bhakti Yoga. If it is avarana (the veil of ignorance despite mental steadiness), begin with Jnana Yoga. These are entry points, not permanent assignments.",
    },
];

const chatushtayaItems = [
    {
        sanskrit: "विवेक",
        roman: "Viveka",
        english: "Discrimination",
        detail:
            "The ability to distinguish between the eternal (nitya) and the temporary (anitya). Without this, every teaching gets absorbed into the same worldview it was meant to correct.",
    },
    {
        sanskrit: "वैराग्य",
        roman: "Vairagya",
        english: "Dispassion",
        detail:
            "Absence of craving for sense objects, both seen and unseen (including heavenly rewards). Vairagya is not depression. It is the result of viveka applied to consequences.",
    },
    {
        sanskrit: "शमादि षट्क सम्पत्ति",
        roman: "Shamadi-Shatka-Sampatti",
        english: "Six Disciplines",
        detail:
            "Shama (calmness of mind), dama (control of sense organs), uparati (withdrawal), titiksha (forbearance), shraddha (faith in the texts and teacher), and samadhana (single-pointedness).",
    },
    {
        sanskrit: "मुमुक्षुत्व",
        roman: "Mumukshutva",
        english: "Longing for Liberation",
        detail:
            "Intense desire for moksha. Not casual curiosity about non-duality. The Vivekachudamani specifies this must be strong enough to eclipse every other desire.",
    },
];

const gitaStages = [
    {
        chapters: "Ch. 1–6",
        yoga: "Karma Yoga",
        target: "The arurukshu — the seeker still needing action to purify the mind",
        key: "BG 6.3: arurukshu uses action as the means",
    },
    {
        chapters: "Ch. 7–12",
        yoga: "Bhakti Yoga",
        target: "The seeker whose mind is steady enough for devotion and surrender",
        key: "BG 12.8-12: descending ladder of practice based on capacity",
    },
    {
        chapters: "Ch. 13–18",
        yoga: "Jnana Yoga",
        target: "The yogarudha — established enough for the path of cessation",
        key: "BG 6.3: yogarudha uses shama (cessation) as the means",
    },
];

export default function PracticalSpiritualPracticesPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Article",
                headline:
                    "Practical Spiritual Practices: The Graded Curriculum from the Gita, Yoga Sutras & Shankara",
                description:
                    "Indian spiritual practice is a graded curriculum, not a buffet. The Gita, Yoga Sutras, and Shankara's sadhana chatushtaya prescribe practices in order of readiness.",
                url: "https://www.opensadhaka.com/practical-spiritual-practices",
                datePublished: "2026-03-21",
                dateModified: "2026-03-21",
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
                    acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
            <ContentPageTracker slug="practical-spiritual-practices" pillar="practical-practices" />
            <Header />
            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            {
                                label: "Practical Spiritual Practices",
                                href: "/practical-spiritual-practices",
                            },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The{" "}
                            <span className="text-orange-500 italic">Graded</span> Curriculum
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Indian spiritual practice is a graded
                            curriculum. The Bhagavad Gita, Patanjali&apos;s Yoga Sutras, and
                            Shankaracharya&apos;s Vivekachudamani each prescribe practices in a
                            specific sequence tied to the practitioner&apos;s inner readiness (guna
                            constitution, stage of purification, degree of dispassion). The practice
                            must match the practitioner&apos;s current capacity, not their
                            preference. Three texts written centuries apart converge on this
                            principle.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Three major texts, written centuries apart, agree on the same diagnostic
                            principle: the practice must match the practitioner, not the
                            practitioner&apos;s taste.
                        </p>
                    </header>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-14">

                            {/* Section 1 */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6 italic text-orange-400">
                                    The Error Modern Seekers Make
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Western wellness culture absorbed Indian practices through a
                                    commercial filter. Yoga became a fitness class. Meditation became
                                    a stress app. Mantras became affirmations. What got lost in that
                                    translation was the underlying logic: each practice belongs to a
                                    specific stage of inner development, and assigning it out of
                                    sequence produces little or nothing.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The classical sources are not subtle about this. Bhagavad Gita
                                    3.3 opens with Krishna establishing two distinct{" "}
                                    <em>nishthas</em> (orientations): jnana-yoga for the{" "}
                                    <em>sankhya</em> (the one who has achieved discrimination) and
                                    karma-yoga for the <em>yogin</em> (the one who is still acting
                                    in the world). Shankara&apos;s Bhashya on this verse leaves no
                                    ambiguity: &ldquo;From no point of view whatsoever can there be
                                    a combination of Knowledge and action.&rdquo; These are not two
                                    options for the same practitioner at the same time. They are two
                                    stages for the same practitioner at different times.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The doctrine encoding this is called{" "}
                                    <strong className="text-foreground">adhikari-bheda</strong>{" "}
                                    (qualification-differentiation). It holds that different seekers
                                    require different teachings based on their inner readiness. The
                                    Bhagavad Gita 17.2 states that a person&apos;s innate
                                    faith (<em>shraddha</em>) reflects their guna constitution —
                                    sattvic, rajasic, or tamasic — and that practices must align
                                    with that constitution:
                                </p>
                                <div className="bg-muted/30 rounded-3xl p-10 border border-border/50 mb-6">
                                    <p className="font-mono text-sm text-orange-400 mb-3 tracking-wide">
                                        BG 17.2
                                    </p>
                                    <p className="text-lg font-medium text-foreground italic mb-4 leading-relaxed">
                                        tri-vidhā bhavati śhraddhā dehināṁ sā svabhāva-jā |
                                        sāttvikī rājasī chaiva tāmasī cheti tāṁ śhṛiṇu ||
                                    </p>
                                    <p className="text-muted-foreground text-base">
                                        &ldquo;The faith of embodied beings, born of their own
                                        nature, is of three kinds — sattvic, rajasic, and tamasic.
                                        Hear about it from Me.&rdquo;
                                    </p>
                                </div>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    A practice chosen for its cultural prestige, aesthetic appeal, or
                                    social proof operates independently of this framework. The texts
                                    are not interested in what you prefer. They are interested in
                                    what your current constitution can metabolize.
                                </p>
                            </section>

                            {/* Section 2 — The Gita's Three-Stage Architecture */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    The Gita&apos;s Three-Stage Architecture
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Madhusudana Sarasvati, the 16th-century Advaita commentator,
                                    divided the Bhagavad Gita&apos;s 18 chapters into an explicit
                                    curriculum: Chapters 1-6 teach Karma Yoga, Chapters 7-12 teach
                                    Bhakti Yoga, and Chapters 13-18 teach Jnana Yoga. This is not a
                                    modern interpretive gloss. It reflects the text&apos;s own
                                    internal logic.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Bhagavad Gita 6.3 names the hinge between the first and second
                                    stages with precision:
                                </p>
                                <div className="bg-muted/30 rounded-3xl p-10 border border-border/50 mb-6">
                                    <p className="font-mono text-sm text-orange-400 mb-3 tracking-wide">
                                        BG 6.3
                                    </p>
                                    <p className="text-lg font-medium text-foreground italic mb-4 leading-relaxed">
                                        ārurukṣor muner yogaṁ karma kāraṇam ucyate |
                                        yogārūḍhasya tasyaiva śamaḥ kāraṇam ucyate ||
                                    </p>
                                    <p className="text-muted-foreground text-base">
                                        &ldquo;For the sage who is aspiring to yoga, action is said
                                        to be the means. For that same sage who has attained yoga,
                                        cessation (shama) is said to be the means.&rdquo;
                                    </p>
                                </div>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    The <em>arurukshu</em> (one ascending toward yoga) needs
                                    disciplined action to burn through accumulated impressions. The{" "}
                                    <em>yogarudha</em> (one established in yoga) needs to stop acting
                                    and rest in stillness. The same outer practice — say, service or
                                    ritual — has opposite effects on these two people. Applied at the
                                    wrong stage, it obstructs progress.
                                </p>

                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6 mb-8">
                                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                        <Layers className="text-orange-500 w-5 h-5" />
                                        Madhusudana Sarasvati&apos;s Division of the Gita
                                    </h3>
                                    <div className="space-y-4">
                                        {gitaStages.map((stage) => (
                                            <div
                                                key={stage.chapters}
                                                className="bg-background/50 rounded-xl p-5 border border-border/20"
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-widest">
                                                        {stage.chapters}
                                                    </span>
                                                    <span className="font-bold text-foreground">
                                                        {stage.yoga}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    {stage.target}
                                                </p>
                                                <p className="text-xs text-orange-400/80 italic">
                                                    {stage.key}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The Gita also encodes what to do when the highest practice is
                                    not yet accessible. Bhagavad Gita 12.8-12 presents a descending
                                    ladder for seekers who cannot fix the mind on Krishna directly:
                                    fix it through abhyasa-yoga (practice); if that fails, work
                                    solely for Krishna; if that fails, renounce the fruits of action.
                                    Each rung is a fallback, not an equal alternative.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Vivekananda&apos;s popular presentation of Karma, Bhakti, Raja,
                                    and Jnana Yoga as four parallel tracks for four personality types
                                    — formulated in his 1896 Raja Yoga lectures — departs from this
                                    sequential framework. The classical texts assign these paths a
                                    stage relationship, not a personality-type relationship. That
                                    distinction matters practically: if the paths are parallel, you
                                    choose based on temperament. If they are sequential, your
                                    constitution determines where you enter, but the direction of
                                    travel is fixed.
                                </p>
                            </section>

                            {/* Section 3 — Patanjali's Eight Limbs */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    Patanjali&apos;s Eight Limbs: Why the Order Is Not Arbitrary
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The Yoga Sutras of Patanjali present the most technically precise
                                    version of the graded curriculum in the entire tradition.
                                    Sutras 2.28-2.29 state both the principle and the sequence
                                    together:
                                </p>
                                <div className="bg-muted/30 rounded-3xl p-10 border border-border/50 mb-6">
                                    <p className="font-mono text-sm text-orange-400 mb-3 tracking-wide">
                                        YS 2.29
                                    </p>
                                    <p className="text-lg font-medium text-foreground italic mb-4 leading-relaxed">
                                        yama niyama āsana prāṇāyāma pratyāhāra dhāraṇā dhyāna
                                        samādhayo&apos;ṣṭāvaṅgāni ||
                                    </p>
                                    <p className="text-muted-foreground text-base">
                                        &ldquo;Yama, niyama, asana, pranayama, pratyahara,
                                        dharana, dhyana, and samadhi are the eight limbs.&rdquo;
                                    </p>
                                </div>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Yoga Sutra 2.28 specifies that the progressive practice of these
                                    limbs destroys impurity (<em>klesha</em>) and leads to
                                    discriminative wisdom (<em>viveka-khyati</em>). The sequence
                                    moves from outer to inner: ethical conduct before
                                    posture, posture before breath, breath before withdrawal of
                                    senses, withdrawal before concentration. Each limb creates the
                                    conditions that make the next one possible.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Patanjali also specifies prerequisite work before the eight-limb
                                    path. Yoga Sutra 2.1 introduces{" "}
                                    <strong className="text-foreground">Kriya Yoga</strong> — tapas
                                    (austerity), svadhyaya (self-study), and Ishvara pranidhana
                                    (surrender to the Lord) — as the preparatory yoga that makes a
                                    person fit to enter the eight-limbed path at all. Yoga Sutra
                                    1.20 gives the sequential prerequisites for samadhi itself:
                                    shraddha (faith), virya (energy), smriti (memory or retention),
                                    samadhi (absorption), and prajna (wisdom). Each state generates
                                    the next. You cannot manufacture samadhi without the prior states
                                    having matured.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Modern asana practice begins at the third limb and
                                    works inward from there, treating yama and niyama as optional
                                    philosophy. Patanjali&apos;s framework treats this as entering a
                                    building through a window rather than the door. The structure
                                    holds, but the trajectory is off.{" "}
                                    <TrackedLink
                                        href="/what-is-kriya-yoga"
                                        eventLabel="practical-practices:body:kriya-yoga"
                                        trackPathName="what-is-kriya-yoga"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        What is Kriya Yoga
                                    </TrackedLink>{" "}
                                    examines Patanjali&apos;s preparatory system in full.
                                </p>
                            </section>

                            {/* Section 4 — Shankara's Four Qualifications */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6 italic text-orange-400">
                                    Shankaracharya&apos;s Four Qualifications: Prerequisites, Not
                                    Recommendations
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    For Advaita Vedanta, Shankaracharya codified the
                                    prerequisite qualifications in his Vivekachudamani. Verses 18-19
                                    make the status of these qualifications explicit:
                                </p>
                                <div className="bg-muted/30 rounded-3xl p-10 border border-border/50 mb-6">
                                    <p className="font-mono text-sm text-orange-400 mb-3 tracking-wide">
                                        Vivekachudamani 18
                                    </p>
                                    <p className="text-lg font-medium text-foreground italic mb-4 leading-relaxed">
                                        sādhanānyatra catvāri kathitāni manīṣibhiḥ |
                                        yeṣu satsveva sanniṣṭhā yadabhāve na sidhyati ||
                                    </p>
                                    <p className="text-muted-foreground text-base">
                                        &ldquo;The wise have declared four qualifications elsewhere.
                                        Firm establishment in Vedanta is possible only when these
                                        are present. In their absence, it fails.&rdquo;
                                    </p>
                                </div>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                    The phrase &ldquo;in their absence, it fails&rdquo; (
                                    <em>yadabhāve na sidhyati</em>) is a technical claim, not
                                    encouragement. Shankara is specifying the boundary conditions for
                                    the teaching to produce its result. The four qualifications arise
                                    causally in sequence: viveka produces vairagya, vairagya enables
                                    the six disciplines, and the six disciplines culminate in
                                    mumukshutva.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {chatushtayaItems.map((item) => (
                                        <div
                                            key={item.roman}
                                            className="rounded-2xl border border-border/40 bg-card/30 p-6"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="min-w-[80px]">
                                                    <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-widest block mb-1">
                                                        {item.roman}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {item.english}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {item.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The practical implication: if a student of Advaita Vedanta finds
                                    the teaching producing no inner shift, Shankara&apos;s diagnosis
                                    is not that the teaching is wrong. It is that the prerequisites
                                    are absent. The corrective is not a different teacher or a
                                    different text. It is generating the missing qualifications
                                    through Karma Yoga and Bhakti Yoga first.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Ramana Maharshi acknowledged the same principle. He described
                                    self-inquiry as the direct path but noted that for most
                                    practitioners it &ldquo;does not carry conviction&rdquo; at the
                                    start, and that other practices are often necessary
                                    &ldquo;as a last resort&rdquo; before self-inquiry becomes
                                    effective. The direct path is direct only for those already at
                                    the threshold.
                                </p>
                            </section>

                            {/* Section 5 — What This Means in Practice */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    What This Means for a Practitioner Today
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Three modern teachers translated this graded framework into
                                    practical diagnostic tools worth knowing. Chinmayananda&apos;s
                                    BMI chart maps the three primary obstacles to the appropriate
                                    path: mala (impurity) responds to Karma Yoga, vikshepa
                                    (fickleness) responds to Bhakti Yoga, avarana (the veil of
                                    ignorance) responds to Jnana Yoga. The chart is a triage tool,
                                    not a personality test.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Sivananda&apos;s 20 Spiritual Instructions encode the same
                                    principle in daily schedule form: rise at 4am, practice asana,
                                    pranayama, and japa in the morning, and perform karma yoga
                                    throughout the day. The sequence places purificatory practice
                                    (japa, pranayama) before contemplative practice, and active
                                    service (karma yoga) as the container holding everything else.
                                    You do not begin with contemplation and add service later. The
                                    structure runs the other direction.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The Taittiriya Aranyaka 2.10.1 specifies the Pancha Mahayajna
                                    — five daily obligatory duties toward the gods, ancestors,
                                    teachers, fellow humans, and all living beings. These are not
                                    optional additions to the spiritual life. They are the ethical
                                    substructure that makes interior practice stable. Karma Yoga is
                                    not the spiritually inferior track. It is the ground floor.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    For a practitioner beginning from scratch, the sequence the
                                    tradition prescribes is consistent across sources: establish
                                    ethical conduct and daily service (yama, niyama, Pancha
                                    Mahayajna), stabilize the body and breath (asana, pranayama),
                                    develop the capacity for withdrawal and concentration
                                    (pratyahara, dharana), and only then approach the higher
                                    practices of meditation and jnana. This is not a slow path. It
                                    is the path that does not waste effort by attempting practices
                                    for which the inner conditions are not yet present.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For specifics on building the early stages, see{" "}
                                    <TrackedLink
                                        href="/daily-spiritual-routine-beginners"
                                        eventLabel="practical-practices:body:daily-routine"
                                        trackPathName="daily-spiritual-routine-beginners"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        Daily Spiritual Routine for Beginners
                                    </TrackedLink>
                                    ,{" "}
                                    <TrackedLink
                                        href="/how-to-start-japa"
                                        eventLabel="practical-practices:body:japa"
                                        trackPathName="how-to-start-japa"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        How to Start Japa
                                    </TrackedLink>
                                    , and{" "}
                                    <TrackedLink
                                        href="/how-to-start-meditating-daily"
                                        eventLabel="practical-practices:body:meditation"
                                        trackPathName="how-to-start-meditating-daily"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        How to Start Meditating Daily
                                    </TrackedLink>
                                    . Those pages cover method; this article provides the framework
                                    that tells you when each method applies.
                                </p>
                            </section>

                            {/* Section 6 — Why Mixing Paths Fails */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6 italic text-orange-400">
                                    Why Mixing Paths Fails
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Shankara&apos;s commentary on BG 3.3 argues that the verse
                                    exists to prevent confusion between the two nishthas, because
                                    mixing them destroys both. A sankhya who takes up action when
                                    knowledge is already arising reactivates the conditioning he is
                                    trying to see through. A yogin who attempts pure jnana before
                                    the mind is purified builds on unstable ground.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Bhakti Yoga, as Madhusudana Sarasvati frames it in Chapters
                                    7-12, serves as the bridge between karma and jnana. It softens
                                    the ego in ways that karma yoga alone cannot achieve in all
                                    practitioners. But it occupies a specific position in the
                                    sequence. It does not replace the stages on either side of it.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For the full diagnostic framework,{" "}
                                    <TrackedLink
                                        href="/choose-between-bhakti-jnana-karma-raja-yoga"
                                        eventLabel="practical-practices:body:choose-yoga"
                                        trackPathName="choose-between-bhakti-jnana-karma-raja-yoga"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        Choose Between Bhakti, Jnana, Karma, Raja Yoga
                                    </TrackedLink>{" "}
                                    covers the practical decision in detail.
                                </p>
                            </section>

                            {/* Section 7 — Summary Framework */}
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">
                                    The Unified Framework Across Three Sources
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Three sources written in three different centuries produce the
                                    same map:
                                </p>

                                <div className="rounded-2xl border border-border/40 bg-card/30 p-8 mb-8">
                                    <div className="space-y-6">
                                        <div className="border-l-4 border-orange-500/40 pl-6">
                                            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                                <BookOpen className="text-orange-500 w-4 h-4" />
                                                Bhagavad Gita (Vyasa / Krishna, via Madhusudana
                                                Sarasvati&apos;s division)
                                            </h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Karma Yoga (Ch. 1-6) purifies the mind. Bhakti Yoga
                                                (Ch. 7-12) stabilizes it through surrender. Jnana
                                                Yoga (Ch. 13-18) produces liberating knowledge.
                                                BG 6.3 identifies the exact transition point between
                                                stages one and three.
                                            </p>
                                        </div>
                                        <div className="border-l-4 border-orange-500/40 pl-6">
                                            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                                <BookOpen className="text-orange-500 w-4 h-4" />
                                                Yoga Sutras (Patanjali)
                                            </h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Kriya Yoga (YS 2.1) prepares for the eight-limbed
                                                path. Eight limbs (YS 2.29) run from outer ethics
                                                inward to samadhi. Five sequential prerequisites
                                                (YS 1.20) govern the highest states. Each stage
                                                enables the next.
                                            </p>
                                        </div>
                                        <div className="border-l-4 border-orange-500/40 pl-6">
                                            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                                <BookOpen className="text-orange-500 w-4 h-4" />
                                                Vivekachudamani (Shankaracharya)
                                            </h4>
                                            <p className="text-muted-foreground text-sm leading-relaxed">
                                                Four qualifications (sadhana chatushtaya) arise in
                                                causal sequence. Verses 18-19: the teaching fails
                                                without them. These qualifications are produced by
                                                Karma Yoga and Bhakti Yoga — the stages the student
                                                must complete before Jnana Yoga becomes effective.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The convergence is not coincidental. All three sources draw on
                                    the same understanding of how the mind operates: it cannot
                                    receive knowledge it is not prepared to hold. Karma Yoga removes
                                    obstruction. Bhakti Yoga provides the orientation. Jnana Yoga
                                    delivers the knowledge that ends the search.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    For the metaphysical foundation these practices are preparing
                                    the practitioner for, see{" "}
                                    <TrackedLink
                                        href="/advaita-vedanta-explained"
                                        eventLabel="practical-practices:body:advaita"
                                        trackPathName="advaita-vedanta-explained"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        Advaita Vedanta Explained
                                    </TrackedLink>{" "}
                                    and{" "}
                                    <TrackedLink
                                        href="/what-is-vedanta"
                                        eventLabel="practical-practices:body:vedanta"
                                        trackPathName="what-is-vedanta"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        What is Vedanta
                                    </TrackedLink>
                                    . The{" "}
                                    <TrackedLink
                                        href="/vedas-upanishads-bhagavad-gita-guide"
                                        eventLabel="practical-practices:body:texts-guide"
                                        trackPathName="vedas-upanishads-bhagavad-gita-guide"
                                        className="text-orange-400 hover:text-orange-300 transition-colors"
                                    >
                                        Vedas, Upanishads, Bhagavad Gita Guide
                                    </TrackedLink>{" "}
                                    covers the textual sources from which the curriculum derives.
                                </p>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
                            <div className="bg-card border border-border/60 rounded-3xl p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <GraduationCap className="text-orange-500 w-6 h-6" />
                                    <h3 className="font-display font-bold text-xl uppercase tracking-tighter">
                                        Key Terms
                                    </h3>
                                </div>
                                <ul className="space-y-5">
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">
                                            Adhikari-bheda
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            The doctrine of qualification-differentiation: different
                                            teachings for different levels of readiness.
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">
                                            Arurukshu
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            The seeker ascending toward yoga. Action (karma) is the
                                            means. BG 6.3.
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">
                                            Yogarudha
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            The seeker established in yoga. Cessation (shama) is the
                                            means. BG 6.3.
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">
                                            Nishtha
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Firm orientation or path. BG 3.3 names two: jnana-nishtha
                                            and karma-nishtha.
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">
                                            Mala / Vikshepa / Avarana
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Chinmayananda&apos;s three obstacles: impurity, fickleness,
                                            and the veil of ignorance. Each calls for a different
                                            practice.
                                        </p>
                                    </li>
                                </ul>
                                <hr className="my-6 border-border/40" />
                                <TrackedLink
                                    href="/difference-between-yoga-and-vedanta"
                                    eventLabel="practical-practices:sidebar:yoga-vedanta"
                                    trackPathName="difference-between-yoga-and-vedanta"
                                    className="w-full inline-flex items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-white font-bold text-sm transition-all hover:bg-orange-700 shadow-md"
                                >
                                    Yoga vs Vedanta <ArrowRight className="ml-2 w-4 h-4" />
                                </TrackedLink>
                            </div>

                            <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">
                                    Related Reading
                                </h3>
                                <ul className="space-y-3">
                                    <li>
                                        <TrackedLink
                                            href="/how-karma-dharma-work"
                                            eventLabel="practical-practices:sidebar:karma-dharma"
                                            trackPathName="how-karma-dharma-work"
                                            className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                                        >
                                            <ArrowRight size={12} />
                                            How Karma and Dharma Work
                                        </TrackedLink>
                                    </li>
                                    <li>
                                        <TrackedLink
                                            href="/best-meditation-style-for-your-personality"
                                            eventLabel="practical-practices:sidebar:meditation-style"
                                            trackPathName="best-meditation-style-for-your-personality"
                                            className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                                        >
                                            <ArrowRight size={12} />
                                            Best Meditation Style for Your Personality
                                        </TrackedLink>
                                    </li>
                                    <li>
                                        <TrackedLink
                                            href="/what-is-sanatan-dharma"
                                            eventLabel="practical-practices:sidebar:sanatan-dharma"
                                            trackPathName="what-is-sanatan-dharma"
                                            className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                                        >
                                            <ArrowRight size={12} />
                                            What is Sanatan Dharma
                                        </TrackedLink>
                                    </li>
                                    <li>
                                        <TrackedLink
                                            href="/meditation-for-burnout"
                                            eventLabel="practical-practices:sidebar:burnout"
                                            trackPathName="meditation-for-burnout"
                                            className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                                        >
                                            <ArrowRight size={12} />
                                            Meditation for Burnout
                                        </TrackedLink>
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
                            {faqs.map((faq) => (
                                <div
                                    key={faq.question}
                                    className="rounded-2xl border border-border/40 bg-card/30 p-6"
                                >
                                    <h3 className="text-lg font-bold mb-4">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed text-sm pl-4 border-l-2 border-orange-500/20">
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
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li>
                                <strong className="text-foreground">Bhagavad Gita</strong> — verses
                                3.3, 6.3, 12.8-12, 17.2. Translation and commentary: Shankara&apos;s
                                Bhashya (tr. Gambhirananda, Advaita Ashrama).
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Vivekachudamani (Shankaracharya)
                                </strong>{" "}
                                — verses 18-19. Translation: Swami Madhavananda (Advaita Ashrama,
                                1921).
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Yoga Sutras of Patanjali
                                </strong>{" "}
                                — sutras 1.20, 2.1, 2.28-2.29. Commentary: Vyasa&apos;s
                                Bhashya; tr. Swami Vivekananda in <em>Raja Yoga</em> (1896).
                            </li>
                            <li>
                                <strong className="text-foreground">Madhusudana Sarasvati</strong>{" "}
                                — division of the Gita&apos;s 18 chapters into three yogas, in his
                                Gudhartha Dipika commentary.
                            </li>
                            <li>
                                <strong className="text-foreground">Chinmayananda, Swami</strong>{" "}
                                — BMI chart and commentary on Bhagavad Gita, Chinmaya Publications.
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Sivananda, Swami (Divine Life Society)
                                </strong>{" "}
                                — 20 Spiritual Instructions; <em>Bliss Divine</em>.
                            </li>
                            <li>
                                <strong className="text-foreground">Ramana Maharshi</strong> —
                                Talks with Sri Ramana Maharshi (Sri Ramanasramam, 1955); on
                                self-inquiry as direct path vs. preparatory practices.
                            </li>
                            <li>
                                <strong className="text-foreground">
                                    Taittiriya Aranyaka 2.10.1
                                </strong>{" "}
                                — Pancha Mahayajna (five obligatory daily duties).
                            </li>
                            <li>
                                <a
                                    href="https://www.wisdomlib.org/hinduism/book/vivekachudamani"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-400 hover:text-orange-300 transition-colors"
                                >
                                    Vivekachudamani — Wisdom Library
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://iep.utm.edu/yoga/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-400 hover:text-orange-300 transition-colors"
                                >
                                    Yoga — Internet Encyclopedia of Philosophy
                                </a>
                            </li>
                        </ul>
                    </section>

                    {/* CTA */}
                    <div className="bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent rounded-3xl" />
                        <div className="relative">
                            <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">
                                Know Which Stage You Are In.
                            </h2>
                            <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                                The curriculum is clear. The question is where you enter it.
                                Build the first stage correctly and the rest follows.
                            </p>
                            <TrackedLink
                                href="/daily-spiritual-routine-beginners"
                                eventLabel="practical-practices:footer:daily-routine"
                                trackPathName="daily-spiritual-routine-beginners"
                                className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-8 py-4 rounded-2xl hover:bg-orange-50 transition-colors text-lg"
                            >
                                Start With the Daily Routine{" "}
                                <ArrowRight size={20} />
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
