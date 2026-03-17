import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Kundalini Awakening: Symptoms, Risks, and How to Navigate It Safely",
    description:
        "Kundalini awakening produces intense physical and emotional symptoms that can resemble psychosis. Learn the real difference, the risks of forced awakening, and the safe path forward.",
    alternates: {
        canonical: "https://www.opensadhaka.com/kundalini-awakening",
    },
    openGraph: {
        title: "Kundalini Awakening: Evolutionary Leap or Medical Emergency?",
        description:
            "Heat, tremors, emotional floods, perceptual shifts — kundalini awakening is real, intense, and requires careful navigation. A grounded, non-woo guide.",
        url: "https://www.opensadhaka.com/kundalini-awakening",
        type: "article",
    },
};

const faqs = [
    {
        question: "Is kundalini awakening real, or is it psychosis?",
        answer:
            "Both are real, and they can overlap. Key distinguishing factors: In genuine kundalini awakening, there is typically an underlying sense of expansion and meaning even amid the intensity; symptoms tend to improve over time with proper support; and the person retains insight into the unusual nature of the experience. In psychosis, there is typically fragmentation, deteriorating function, and the person loses the capacity to distinguish internal from external reality. If you are unsure, seek both psychiatric and spiritual evaluation — not either/or.",
    },
    {
        question: "What are the physical symptoms of kundalini awakening?",
        answer:
            "Common physical symptoms include: intense heat rising up the spine, involuntary muscle movements (kriyas), tremors or shaking during meditation, spontaneous mudras (hand gestures), changes in breathing patterns, altered sleep (profound relaxation or insomnia), heightened sensory sensitivity, and temporary changes in appetite or sexual drive. Not all of these occur in every awakening, and their intensity varies enormously from person to person.",
    },
    {
        question: "Can you force a kundalini awakening?",
        answer:
            "You can force the opening of energy channels before the system is prepared to handle it — and this is precisely what creates kundalini syndrome (unstabilized awakening). Intensive unguided breathwork, extreme fasting, isolation retreats without proper preparation, or psychedelics can precipitate an awakening for which the practitioner has no framework or support. The traditional recommendation is emphatically against forcing: build the foundation first, and kundalini rises naturally as a byproduct.",
    },
    {
        question: "How long does a kundalini awakening last?",
        answer:
            "The initial intensity of a spontaneous awakening may last days to weeks. The full integration — the process of stabilizing the expanded awareness and clearing the samskaras it surfaces — typically takes 1–7 years. This is not a problem to be solved quickly. Experienced guides consistently report that the practitioners who try to 'fix' or 'complete' the process rapidly create more difficulty than those who simply support the process with stable practice and good self-care.",
    },
];

const symptoms = [
    {
        category: "Physical",
        items: [
            "Intense heat or cold moving up the spine",
            "Involuntary movements (kriyas) during meditation",
            "Trembling or shaking",
            "Spontaneous pranayama (breath changes)",
            "Heightened sensitivity to light, sound, or touch",
        ],
    },
    {
        category: "Emotional",
        items: [
            "Sudden, intense releases of old grief, anger, or fear",
            "Waves of unconditional love or bliss (ananda)",
            "Periods of profound emotional emptiness",
            "Old relational patterns surfacing with unusual intensity",
            "Increased sensitivity to others' emotions",
        ],
    },
    {
        category: "Perceptual",
        items: [
            "Visual phenomena (inner light, colors, geometric patterns)",
            "Auditory phenomena (inner sounds — nada)",
            "Sense of expansion beyond the body boundary",
            "Time distortions during deep meditation",
            "Heightened intuition and synchronicity",
        ],
    },
];

export default function KundaliniAwakeningPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="kundalini-awakening" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Kriya Yoga?", href: "/what-is-kriya-yoga" },
                            { label: "Kundalini Awakening", href: "/kundalini-awakening" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Evolutionary Leap or <span className="text-orange-500 italic">Emergency?</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Kundalini awakening is the rising of dormant evolutionary energy (Kundalini Shakti) from the base of the spine through the crown. Physical symptoms include heat, tremors, and intense emotional releases. It can overlap with — but is distinct from — psychiatric crisis. A genuine awakening leads to greater clarity over time; psychosis leads to fragmentation. Safe navigation requires the right foundation, not forcing, and qualified support.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Kundalini is not a technique you do. It is a process that happens to you — when the system is ready. Your job is to prepare the system.
                        </p>
                    </header>

                    <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6 mb-12">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            <strong className="text-orange-400">Note:</strong> If you are experiencing intense, uncontrolled symptoms — severe anxiety, dissociation, inability to function, or concern about your mental state — please consult both a mental health professional and, if possible, a teacher experienced in kundalini integration. This guide is educational, not a substitute for qualified support.
                        </p>
                    </div>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What is Kundalini Energy?</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The word &quot;Kundalini&quot; comes from the Sanskrit root kundala, meaning &quot;coiled.&quot; In the tantric and yogic framework, it refers to the primordial, evolutionary energy that resides dormant at the base of the spine (Muladhara chakra), coiled three and a half times like a serpent.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                This energy is not metaphorical. The tradition is quite specific: when awakened, it rises through the central spinal channel (Sushumna Nadi), passing through each chakra and progressively dissolving the veils of ego-identification at each level. The culmination — kundalini reaching the crown chakra (Sahasrara) — is described as the direct experiential recognition of unity with Brahman (Samadhi).
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The serpent metaphor is precise: coiled implies potential, not danger. The danger lies in forcing the energy upward before the channels are purified and the practitioner has built adequate psychological and ethical foundation to integrate what arises.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Kundalini Awakening Symptoms</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Symptoms vary dramatically by individual, intensity of the awakening, and whether the rising is gradual (common with long-term meditation practice) or sudden (spontaneous or precipitated by intense retreat):
                            </p>
                            <div className="grid sm:grid-cols-3 gap-6">
                                {symptoms.map((s) => (
                                    <div key={s.category} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                        <h3 className="font-bold text-orange-400 mb-3">{s.category}</h3>
                                        <ul className="space-y-2">
                                            {s.items.map((item) => (
                                                <li key={item} className="text-sm text-muted-foreground flex gap-2">
                                                    <span className="text-orange-500 mt-0.5">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Real Awakening vs Spiritual Emergency</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The most practically important question for anyone experiencing intense kundalini symptoms is the differential diagnosis: is this a genuine awakening that needs integration support, or a psychological crisis that needs clinical intervention?
                            </p>
                            <div className="overflow-x-auto rounded-2xl border border-border/30 mb-8">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Indicator</th>
                                            <th className="p-4 font-bold text-orange-400">Kundalini Awakening</th>
                                            <th className="p-4 font-bold text-muted-foreground">Psychiatric Crisis</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                                        <tr>
                                            <td className="p-4">Trajectory</td>
                                            <td className="p-4 text-foreground">Intensity stabilizes and integrates over time</td>
                                            <td className="p-4">Function deteriorates; fragmentation increases</td>
                                        </tr>
                                        <tr className="bg-muted/10">
                                            <td className="p-4">Insight</td>
                                            <td className="p-4 text-foreground">Retains awareness that experience is unusual</td>
                                            <td className="p-4">Loses capacity to distinguish internal from external</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Underlying tone</td>
                                            <td className="p-4 text-foreground">Often a sense of expansion or meaning amid intensity</td>
                                            <td className="p-4">Pure terror, persecution, or flat meaninglessness</td>
                                        </tr>
                                        <tr className="bg-muted/10">
                                            <td className="p-4">Context</td>
                                            <td className="p-4 text-foreground">Often follows intensive practice or life transition</td>
                                            <td className="p-4">May have no clear trigger or prior spiritual context</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                These are not mutually exclusive. Kundalini awakening and psychiatric conditions can co-exist. When in doubt, seek evaluation from both a mental health professional and a teacher experienced with spiritual emergencies. Getting psychiatric support does not negate the spiritual dimension, and ignoring the spiritual dimension does not solve the problem.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Safely Awaken Kundalini (The Gradual Path)</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The unanimous verdict of every genuine tradition that works with kundalini: do not force it. The goal is to purify and strengthen the system so that kundalini rises naturally — as a byproduct of sincere practice, not as an achievement you pursue directly.
                            </p>
                            <div className="space-y-4">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">1. Ethical Foundation First</h3>
                                    <p className="text-muted-foreground leading-relaxed">The Yamas and Niyamas of Patanjali&apos;s system are not moral rules for their own sake — they are the purification of the energy channels that kundalini must pass through. Unresolved anger, dishonesty, or sexual imbalance creates obstructions that, when kundalini energy encounters them forcibly, produce the crisis scenarios. Clean the pipe before increasing the pressure.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">2. Gradual Pranayama (Not Advanced Techniques First)</h3>
                                    <p className="text-muted-foreground leading-relaxed">Begin with Nadi Shodhana (alternate nostril breathing) and basic rhythmic breathing — not advanced Kumbhaka (retention) or Bhastrika (bellows breath). Allow 6–12 months of basic pranayama before introducing anything more intensive. Respect the progression that traditional systems have mapped.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">3. Consistent Practice Over Intensity</h3>
                                    <p className="text-muted-foreground leading-relaxed">Daily 20–30 minutes of practice for years produces far more stable results than intensive weekend retreats followed by no practice. The system builds capacity incrementally. The goal is the gradual, sustainable raising of your energetic baseline — not a dramatic one-time experience.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">4. Grounding Practices Are Not Optional</h3>
                                    <p className="text-muted-foreground leading-relaxed">Physical exercise, time in nature, adequate sleep, regular meals, and stable relationships are not obstacles to kundalini practice — they are its necessary foundation. The spiritual emergency most often befalls practitioners who abandon ordinary life in pursuit of transcendence while neglecting basic grounding.</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/what-is-kriya-yoga" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    What is Kriya Yoga? <ArrowRight size={16} />
                                </Link>
                                <Link href="/what-is-tantra" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    What is Tantra? <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Prepare the Ground.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Kundalini rises naturally in a system that is ready. Start with the foundational practice — Kriya Yoga — or find your path.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/what-is-kriya-yoga"
                                eventLabel="kundalini:footer:kriya"
                                trackPathName="what-is-kriya-yoga"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                What is Kriya Yoga?
                            </TrackedLink>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="kundalini:footer:faith-finder"
                                trackPathName="faith-finder"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Find Your Path
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
