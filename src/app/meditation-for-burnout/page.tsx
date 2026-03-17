import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";

export const metadata: Metadata = {
    title: "Healing Corporate Burnout: The Spiritual Approach to Exhaustion",
    description:
        "Corporate burnout is a spiritual crisis caused by misaligned karma and dharma — not just overwork. Discover what meditation and Karma Yoga actually do for deep exhaustion.",
    alternates: {
        canonical: "https://www.opensadhaka.com/meditation-for-burnout",
    },
    openGraph: {
        title: "Meditation for Corporate Burnout: The Spiritual Approach to Exhaustion",
        description:
            "Burnout is a crisis of meaning, not just rest. The Bhagavad Gita diagnosed it 3000 years ago. Here's the spiritual approach that actually addresses the root.",
        url: "https://www.opensadhaka.com/meditation-for-burnout",
        type: "article",
    },
};

const faqs = [
    {
        question: "Is burnout a spiritual problem or a work problem?",
        answer:
            "Both — but solving it only at the work level (quitting, vacation, reassignment) usually provides temporary relief because it doesn't address the root. Burnout in the Vedic framework is a crisis of misalignment: you are performing actions whose fruits you are intensely attached to, in a context that conflicts with your svadharma (authentic nature and duty). The work itself may be the wrong work, or the relationship to the work may be unsustainable — and only honest self-inquiry can distinguish the two.",
    },
    {
        question: "What is Karma Yoga and how does it help with burnout?",
        answer:
            "Karma Yoga is the Bhagavad Gita's path of acting without attachment to results. Instead of working for external validation (promotion, praise, salary) as the primary fuel, Karma Yoga reorients your energy source to the quality of the action itself. This doesn't mean you stop caring about your work — it means you stop staking your psychological well-being on its outcome. The result is paradoxical: better performance with less suffering.",
    },
    {
        question: "Can meditation fix burnout if I'm still in the same job?",
        answer:
            "Meditation alone doesn't resolve a fundamentally misaligned work situation. But it does two important things: it makes the current situation more bearable by reducing cortisol and reactivity, and it creates the internal clarity needed to make wise decisions about what needs to change. Meditation is not a coping mechanism that helps you endure an intolerable situation indefinitely — it is a clarity tool that helps you see the situation accurately and act accordingly.",
    },
    {
        question: "What is Yoga Nidra and does it help with burnout?",
        answer:
            "Yoga Nidra is a guided meditation practice that induces the hypnagogic state — the threshold between waking and sleep — producing profound physical rest. Studies show that 30 minutes of Yoga Nidra produces rest equivalent to 2–3 hours of regular sleep in terms of cortisol reduction and nervous system recovery. For burnout, Yoga Nidra is one of the most effective immediate interventions because it addresses the physical exhaustion layer without requiring you to 'meditate well.'",
    },
];

export default function MeditationForBurnoutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="meditation-for-burnout" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How to Start Meditating", href: "/how-to-start-meditating-daily" },
                            { label: "Meditation for Burnout", href: "/meditation-for-burnout" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Burnout Is a Crisis of <span className="text-orange-500 italic">Meaning</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Corporate burnout is not simply overwork — it is a spiritual crisis caused by misalignment between your daily actions (karma) and your authentic nature and duty (dharma). When you perform actions solely for external rewards — approval, salary, status — exhaustion is inevitable. The spiritual approach addresses the root: reorienting your relationship to work through Karma Yoga and recovering your nervous system through practices like Yoga Nidra.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            A two-week vacation doesn't fix burnout if the operating system running your relationship to work is still broken.
                        </p>
                    </header>

                    <LongformContent className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What Burnout Actually Is</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The World Health Organization now classifies burnout as an occupational phenomenon characterized by three dimensions: exhaustion, cynicism/detachment, and reduced professional efficacy. But the clinical definition misses the deeper structure.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Burnout is what happens when you have invested enormous energy into an activity whose fruits you were intensely attached to — and those fruits have either not materialized, or materialized and turned out to be empty. The promotion came, and the relief lasted three weeks. The recognition arrived, and the hunger returned immediately. You worked hard for a result that didn't fill the void it was supposed to fill.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                This is precisely what the Bhagavad Gita calls Sakama Karma — action with intense attachment to its fruits. The Gita is explicit: this is the source of bondage and suffering, not merely a management problem.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Concept of Karma Yoga in the Workplace</h2>
                            <blockquote className="border-l-4 border-orange-500 pl-8 py-4 mb-8 bg-background/40 rounded-r-2xl">
                                <p className="text-xl text-foreground italic leading-relaxed mb-2">
                                    "Let right deeds be thy motive, not the fruit which comes from them."
                                </p>
                                <cite className="text-muted-foreground text-sm">— Bhagavad Gita 2.47 (Arnold translation)</cite>
                            </blockquote>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Karma Yoga does not mean working less or caring less. It means shifting the energy source of your work from outcome-dependence to process-excellence. The practical difference:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="bg-background/60 rounded-2xl p-5 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3 text-sm uppercase tracking-widest">Outcome-Dependent Work</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Energy rises and falls with approval/results</li>
                                        <li>• Identity staked on the deliverable</li>
                                        <li>• Failure feels existential</li>
                                        <li>• No result satisfies for long</li>
                                        <li>• Leads to burnout reliably over time</li>
                                    </ul>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-5 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-3 text-sm uppercase tracking-widest">Karma Yoga Approach</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Energy comes from the quality of effort</li>
                                        <li>• Identity is not the deliverable</li>
                                        <li>• Failure is information, not condemnation</li>
                                        <li>• Process itself is the satisfying thing</li>
                                        <li>• Sustainable over decades</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">3 Spiritual Practices for Deep Exhaustion</h2>
                            <div className="space-y-6">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-xl text-orange-400 mb-3">1. Digital Fasting (Pratyahara)</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-3">
                                        Pratyahara — withdrawal of the senses from external stimulation — is the fifth of Patanjali's eight limbs of yoga. In practical terms for modern burnout: a deliberate, scheduled withdrawal from digital input. The nervous system cannot recover while continuously being stimulated.
                                    </p>
                                    <p className="text-sm text-muted-foreground italic border-l-2 border-orange-500/20 pl-4">
                                        Practice: one 24-hour digital fast per week, or at minimum, the first 60 minutes and last 60 minutes of each day completely device-free.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-xl text-orange-400 mb-3">2. Yoga Nidra (Non-Sleep Deep Rest)</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-3">
                                        Yoga Nidra induces the hypnagogic state — the threshold between waking and sleep — producing profound physical rest without full unconsciousness. Unlike regular sleep, Yoga Nidra maintains a thread of awareness while the body undergoes deep recovery. For burnout, it is the most efficient recovery tool available because it directly addresses the nervous system exhaustion layer.
                                    </p>
                                    <p className="text-sm text-muted-foreground italic border-l-2 border-orange-500/20 pl-4">
                                        Practice: 20–30 minutes guided Yoga Nidra in the early afternoon (not immediately before bed, as it is not designed to replace sleep). Consistency is more important than session length.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-xl text-orange-400 mb-3">3. Redefining Success Through Svadharma</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-3">
                                        This is the deeper, structural work. Burnout is often a symptom of living by someone else's definition of success — the external metrics imposed by career culture, parental expectations, or social comparison. Svadharma asks: what kind of work is genuinely aligned with my nature, independent of how impressive it looks?
                                    </p>
                                    <p className="text-sm text-muted-foreground italic border-l-2 border-orange-500/20 pl-4">
                                        Practice: journal for 20 minutes on "What would I do with equal commitment if nobody was watching and there was no external reward?" The answer typically contains your svadharma.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">An End-of-Day Transition Ritual</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                One of the most practical interventions for burnout is a deliberate end-of-day ritual that signals to the nervous system: work is over. Without this, the modern worker's nervous system never fully disengages — it continues processing work anxiety through evenings, weekends, and sleep.
                            </p>
                            <div className="rounded-2xl border border-border/40 bg-muted/20 p-8">
                                <h3 className="font-bold text-lg mb-5">A Simple 10-Minute Transition Practice</h3>
                                <ol className="space-y-4">
                                    <li className="flex gap-3 text-muted-foreground">
                                        <span className="text-orange-500 font-bold text-lg leading-none mt-0.5 flex-shrink-0">1.</span>
                                        <span><strong className="text-foreground">Symbolic closure (1 minute):</strong> Close all work applications deliberately. Write down tomorrow's top three priorities — this offloads them from working memory so the mind can rest.</span>
                                    </li>
                                    <li className="flex gap-3 text-muted-foreground">
                                        <span className="text-orange-500 font-bold text-lg leading-none mt-0.5 flex-shrink-0">2.</span>
                                        <span><strong className="text-foreground">Body reset (3 minutes):</strong> 10 slow deliberate breaths. Let the exhalation be longer than the inhalation. Place both palms on your knees and feel the physical contact — grounding attention in the body after hours of mental abstraction.</span>
                                    </li>
                                    <li className="flex gap-3 text-muted-foreground">
                                        <span className="text-orange-500 font-bold text-lg leading-none mt-0.5 flex-shrink-0">3.</span>
                                        <span><strong className="text-foreground">Offering (1 minute):</strong> Briefly acknowledge: "I did what I could today. The results belong to something larger than me." This is Karma Yoga made into a daily micro-practice — consciously releasing outcome attachment at the day's end.</span>
                                    </li>
                                    <li className="flex gap-3 text-muted-foreground">
                                        <span className="text-orange-500 font-bold text-lg leading-none mt-0.5 flex-shrink-0">4.</span>
                                        <span><strong className="text-foreground">Reentry (5 minutes):</strong> Step outside, even briefly. Natural light and physical movement signal a genuine context shift to the nervous system in a way that simply walking from your desk to your couch does not.</span>
                                    </li>
                                </ol>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/spiritual-antidote-to-hustle-culture" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Spiritual Antidote to Hustle Culture <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-karma-dharma-work" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How Karma and Dharma Work <ArrowRight size={16} />
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
                    </LongformContent>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Address the Root.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Burnout requires both nervous system recovery and a philosophical reorientation to work. The Bhagavad Gita provides the second. Your daily practice provides the first.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/texts/bhagavad-gita"
                                eventLabel="burnout:footer:gita"
                                trackPathName="texts/bhagavad-gita"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Read the Bhagavad Gita
                            </TrackedLink>
                            <TrackedLink
                                href="/how-to-start-meditating-daily"
                                eventLabel="burnout:footer:meditate"
                                trackPathName="how-to-start-meditating-daily"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Start Meditating Daily
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
