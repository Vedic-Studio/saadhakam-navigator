import type { Metadata } from "next";
import { getArticleBySlug, getPillarConfig } from "@/features/articles";
import { buildArticleSchemas } from "@/lib/seo";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "What Exactly is Kriya Yoga? The Complete Guide (And Why Not YouTube)",
    description:
        "Kriya Yoga is not stretching — it's an ancient science of moving prana up the spine to accelerate spiritual evolution. Learn the real mechanics, the dangers of unguided practice, and how to learn authentically.",
    alternates: {
        canonical: "https://www.opensadhaka.com/what-is-kriya-yoga",
    },
    openGraph: {
        title: "What is Kriya Yoga? The Complete Guide",
        description:
            "Kriya Yoga accelerates spiritual growth by working directly with spinal energy. A clear, honest guide to the mechanics, risks, and authentic learning paths.",
        url: "https://www.opensadhaka.com/what-is-kriya-yoga",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is the difference between Kriya Yoga and regular yoga?",
        answer:
            "Regular yoga (Hatha/Asana) works primarily with the physical body through postures for health, flexibility, and preliminary energy management. Kriya Yoga bypasses the physical level entirely and works directly with prana (life-force energy) in the astral body — specifically in the spinal channel (Sushumna Nadi). It is an internal, energetic discipline aimed at rapid spiritual evolution, not physical fitness.",
    },
    {
        question: "Is Kriya Yoga dangerous to practice alone?",
        answer:
            "Advanced Kriya pranayama techniques carry real risks when practiced without proper initiation and guidance. The primary dangers include: hyperventilation leading to hypocapnia, nervous system dysregulation (kundalini syndrome), intense emotional releases without adequate grounding, and energetic imbalances that can produce anxiety, insomnia, or psycho-spiritual crisis. The traditional insistence on initiation (Diksha) from a qualified teacher is not dogma — it is a safety protocol.",
    },
    {
        question: "How do I learn Kriya Yoga authentically?",
        answer:
            "The primary authentic lineage in the West is Self-Realization Fellowship (SRF), founded by Paramahansa Yogananda. SRF offers a structured home-study correspondence course that prepares students over 18+ months before initiating them into Kriya. Other established organizations include Yogoda Satsanga Society (India), Ananda Sangha (founded by Swami Kriyananda), and direct disciples of Lahiri Mahasaya. Avoid YouTube tutorials, weekend workshops, or self-styled 'Kriya teachers' without verifiable lineage.",
    },
    {
        question: "What does Kriya Yoga have to do with Patanjali's Yoga Sutras?",
        answer:
            "Patanjali briefly but significantly mentions Kriya Yoga in Chapter 2, Verse 1: 'Tapas, Svadhyaya, and Ishvara Pranidhana — this is Kriya Yoga.' Yogananda's tradition interprets the broader Kriya techniques as the practical implementation of what Patanjali described systematically. The deep pranayama of Kriya practice is the direct application of Pratyahara, Dharana, and Dhyana stages outlined in the Sutras.",
    },
];

const comparisonRows = [
    {
        dimension: "Focus",
        hatha: "Physical postures (asanas) for flexibility, strength, and basic prana regulation",
        kriya: "Direct manipulation of prana in the spinal channel to accelerate consciousness evolution",
    },
    {
        dimension: "Primary tool",
        hatha: "The physical body — muscles, joints, breath",
        kriya: "The astral body — nadis, chakras, the Sushumna channel",
    },
    {
        dimension: "Entry requirement",
        hatha: "None — can begin immediately",
        kriya: "Prerequisite ethical foundation + formal initiation (Diksha) from qualified teacher",
    },
    {
        dimension: "Timeline",
        hatha: "Physical benefits in weeks; energetic effects over months",
        kriya: "Traditionally described as 'one Kriya = one year of natural evolution'",
    },
    {
        dimension: "Risk level",
        hatha: "Physical injury risk if postures are forced",
        kriya: "Nervous system and psychological risks if practiced without guidance",
    },
];

export default function WhatIsKriyaYogaPage() {
    const article = getArticleBySlug("what-is-kriya-yoga")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="what-is-kriya-yoga" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Kriya Yoga?", href: "/what-is-kriya-yoga" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Yoga for the <span className="text-orange-500 italic">Spine</span>, Not the Studio
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Kriya Yoga is an ancient science of moving prana (life-force energy) directly up and down the spine through precise pranayama techniques, rapidly accelerating spiritual evolution. It is not posture-based yoga. Described in Patanjali&apos;s Yoga Sutras (2.1) and popularized in the West by Paramahansa Yogananda, Kriya is an internal, energetic discipline that requires formal initiation — practicing advanced techniques without guidance carries real neurological and psychological risks.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            One Kriya pranayama, practiced correctly, is said to be equivalent to one year of natural spiritual evolution. The price of this acceleration is absolute respect for the technique.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Kriya Yoga vs Regular Yoga: A Real Comparison</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                The word &quot;yoga&quot; now refers to a vast ecosystem of practices — from hot Vinyasa flow to Yin restorative to athletic Ashtanga. Kriya Yoga is not on this spectrum. It operates at a completely different level of the human system:
                            </p>
                            <div className="overflow-x-auto rounded-2xl border border-border/30 mb-8">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Dimension</th>
                                            <th className="p-4 font-bold text-muted-foreground">Hatha / Asana Yoga</th>
                                            <th className="p-4 font-bold text-orange-400">Kriya Yoga</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                                        {comparisonRows.map((row) => (
                                            <tr key={row.dimension}>
                                                <td className="p-4 font-medium text-foreground">{row.dimension}</td>
                                                <td className="p-4">{row.hatha}</td>
                                                <td className="p-4 text-foreground">{row.kriya}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                This is not to diminish Hatha Yoga — it is excellent preparation for Kriya. The postures, basic pranayama, and ethical foundations of Hatha practice build the foundation that makes Kriya safe and effective. Most Kriya lineages require 1–2 years of Hatha/basic meditation practice as preparation.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Mechanics of Kriya</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                The central teaching of Kriya Yoga is that the spine is the &quot;highway of consciousness.&quot; The specific anatomy involved:
                            </p>
                            <div className="space-y-5">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Sushumna Nadi</h3>
                                    <p className="text-muted-foreground leading-relaxed">The central channel running through the spinal column. In most people, energy flows primarily through the Ida (lunar, left) and Pingala (solar, right) channels. Kriya techniques awaken and activate the Sushumna, allowing consciousness to move vertically — upward toward higher centers, downward to ground the experience.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Six Chakras</h3>
                                    <p className="text-muted-foreground leading-relaxed">From Muladhara (base) to Ajna (third eye), each chakra corresponds to a level of consciousness. Kriya pranayama moves prana through these centers systematically, clearing the impressions (samskaras) stored at each level. This is the mechanism by which Kriya accelerates what would otherwise take many lifetimes.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Breath-Consciousness Link</h3>
                                    <p className="text-muted-foreground leading-relaxed">Yogananda taught that the direct cause of most mental suffering is the agitation of prana — and that the most direct route to controlling prana is through the breath. The specific Kriya pranayama techniques create a state of deep interiorization that activates the prefrontal cortex while quieting the amygdala — which is why experienced practitioners can remain calm in circumstances that would overwhelm ordinary nervous systems.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Is Kriya Yoga Dangerous?</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Honest answer: advanced Kriya pranayama is not trivially safe. The tradition&apos;s insistence on preparation and initiation is not gatekeeping — it is a functional safety requirement. The risks of improperly practiced advanced pranayama include:
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Nervous System Dysregulation</h3>
                                    <p className="text-muted-foreground leading-relaxed">Intense pranayama techniques alter the balance of oxygen and carbon dioxide in the blood, affecting neural firing patterns. Without proper guidance on pacing, retention, and grounding, practitioners can experience: severe anxiety, dissociation, insomnia, and in rare cases, precipitating a kundalini syndrome that requires months of stabilization.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Premature Energetic Opening</h3>
                                    <p className="text-muted-foreground leading-relaxed">Advanced Kriya can awaken dormant kundalini energy before the practitioner has built the ethical and psychological foundation to integrate it. This produces experiences of heat, involuntary movements, emotional floods, or perceptual changes that are genuinely disorienting without proper context and support.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">The YouTube Problem</h3>
                                    <p className="text-muted-foreground leading-relaxed">Most online &quot;Kriya Yoga&quot; content teaches either simplified breathwork (safe but not actual Kriya) or, worse, actual advanced techniques without the preparation context. The latter creates genuine risk. The traditional safeguard — a teacher who knows the student and can monitor their practice — cannot be replicated through a screen.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Learn Kriya Yoga Authentically</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Authentic Kriya Yoga transmission requires three things: preparation, lineage, and formal initiation (Diksha). Here are the established pathways:
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Self-Realization Fellowship (SRF)</h3>
                                    <p className="text-muted-foreground leading-relaxed">Founded by Yogananda himself. Offers a structured home-study correspondence course (Lessons) that prepares students over 18+ months in preparatory meditation and yoga before initiating them into Kriya. The most rigorous and widely accessible pathway for Western practitioners. Visit srf.org.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Yogoda Satsanga Society (YSS — India)</h3>
                                    <p className="text-muted-foreground leading-relaxed">The Indian counterpart of SRF. Same teachings, same Lessons program, but operating specifically in India with additional centers and retreats. For Indian practitioners, YSS is the primary authentic source.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Lahiri Mahasaya&apos;s Grihasta Lineage</h3>
                                    <p className="text-muted-foreground leading-relaxed">Lahiri Mahasaya (Yogananda&apos;s param-guru) specifically taught Kriya to householders — people living ordinary lives with careers and families. His descendants and students in Varanasi continue this tradition. This is the original transmission point of the lineage Yogananda brought West.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/kundalini-awakening" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Kundalini Awakening Guide <ArrowRight size={16} />
                                </Link>
                                <Link href="/paramahansa-yogananda-teachings" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Yogananda&apos;s Teachings <ArrowRight size={16} />
                                </Link>
                                <Link href="/do-you-need-a-guru" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Do You Need a Guru? <ArrowRight size={16} />
                                </Link>
                            </div>
                        </section>

                        <section>
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

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Science of the Spine.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Kriya Yoga is one of the most potent spiritual technologies ever developed. Learn the teacher who brought it West — and whether you need a guru to begin.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/paramahansa-yogananda-teachings"
                                eventLabel="kriya_yoga:footer:yogananda"
                                trackPathName="paramahansa-yogananda-teachings"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Yogananda&apos;s Teachings
                            </TrackedLink>
                            <TrackedLink
                                href="/do-you-need-a-guru"
                                eventLabel="kriya_yoga:footer:guru"
                                trackPathName="do-you-need-a-guru"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Do You Need a Guru?
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
