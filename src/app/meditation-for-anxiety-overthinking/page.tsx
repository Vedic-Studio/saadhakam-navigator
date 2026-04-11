import type { Metadata } from "next";
import { getArticleBySlug, getPillarConfig } from "@/features/articles";
import { buildArticleSchemas } from "@/lib/seo";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";

export const metadata: Metadata = {
    title: "Meditation for Severe Anxiety and Overthinking | When Silence Makes It Worse",
    description:
        "Standard silence-based meditation can worsen anxiety loops. Learn which techniques actually calm the nervous system for overthinkers — and what the ancient tradition says about it.",
    alternates: {
        canonical: "https://www.opensadhaka.com/meditation-for-anxiety-overthinking",
    },
    openGraph: {
        title: "Meditation for Severe Anxiety: When Silence Makes It Worse",
        description:
            "For severe anxiety, emptying your mind is terrible advice. Here's what actually works — grounded in both neuroscience and Vedic practice.",
        url: "https://www.opensadhaka.com/meditation-for-anxiety-overthinking",
        type: "article",
    },
};

const faqs = [
    {
        question: "Why does meditation sometimes make anxiety worse?",
        answer:
            "Standard silent meditation — closing your eyes and watching an unanchored mind — can create a rebound effect for anxious people. Without a specific task, the anxious mind spirals freely into worst-case scenarios. Additionally, some anxiety is rooted in trauma, and inward focus without appropriate support can activate the nervous system rather than calm it. The solution is not to avoid meditation but to choose techniques that give the anxious mind a specific, manageable task.",
    },
    {
        question: "How does meditation calm the nervous system physiologically?",
        answer:
            "Meditation activates the parasympathetic nervous system (rest-and-digest) and suppresses the sympathetic (fight-or-flight). Specifically: slow, deliberate breathing stimulates the vagus nerve, which directly lowers heart rate and cortisol. Extended exhalations (as in 4-7-8 breathing) trigger the body's own calming response. Regular practice literally restructures the brain — studies show increased gray matter in the prefrontal cortex (rational regulation) and decreased amygdala reactivity (fear response).",
    },
    {
        question: "What is the best meditation for overthinking?",
        answer:
            "For overthinking specifically, mantra-based Japa meditation is often the most effective — because the mantra gives the verbal, analytical mind something specific to do rather than leaving it to run narratives unsupervised. The rhythm of mantra repetition is hypnotic and naturally interrupts ruminative loops. Breathing-anchored practices (coherent breathing, 4-7-8) are faster-acting for acute anxiety. Both complement each other.",
    },
    {
        question: "Can severe anxiety be treated with meditation alone?",
        answer:
            "For mild-to-moderate anxiety, consistent daily meditation practice can be highly effective as a primary or adjunct tool. For severe anxiety disorders (GAD, panic disorder, PTSD-related anxiety), meditation is best used as one component of a comprehensive approach that includes professional mental health support. Meditation is not a substitute for therapy or medication when those are clinically indicated — it is a powerful complement.",
    },
];

export default function MeditationForAnxietyPage() {
    const article = getArticleBySlug("meditation-for-anxiety-overthinking")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="meditation-for-anxiety-overthinking" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How to Start Meditating", href: "/how-to-start-meditating-daily" },
                            { label: "Meditation for Anxiety", href: "/meditation-for-anxiety-overthinking" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            When Silence Makes It <span className="text-orange-500 italic">Worse</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> For severe anxiety and overthinking, traditional silent meditation can worsen the panic loop by leaving the mind too open. Instead, active techniques — anchoring to a physical sensation, practicing coherent breathing, or repeating a mantra (Japa) — give the anxious mind a specific task, interrupting the catastrophic thought cycle. The nervous system calms through action, not through forced emptiness.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Trying to empty an anxious mind is like telling someone who is drowning to relax. What they need is something to hold onto.
                        </p>
                    </header>

                    <LongformContent className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How Meditation Actually Calms the Nervous System</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The anxiety response is a function of the sympathetic nervous system — the ancient fight-or-flight mechanism that floods the body with cortisol and adrenaline when the brain perceives threat. For chronic overthinkers, this system has been hijacked by thought itself: the brain treats imagined worst-case scenarios as if they were actual physical dangers.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Meditation works on anxiety through three primary physiological pathways:
                            </p>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-5 flex gap-4">
                                    <span className="text-orange-500 font-black text-xl leading-none mt-0.5">1</span>
                                    <div>
                                        <strong className="text-foreground">Vagal Stimulation via Slow Breathing</strong>
                                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">The vagus nerve runs from the brainstem through the torso and is the highway of the parasympathetic (calming) system. Slow, deliberate breathing — particularly extended exhalations — directly stimulates the vagus nerve, signaling "safe" to the entire system. This is not metaphor; it is physiology.</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-5 flex gap-4">
                                    <span className="text-orange-500 font-black text-xl leading-none mt-0.5">2</span>
                                    <div>
                                        <strong className="text-foreground">Cortisol Reduction via Consistent Practice</strong>
                                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">A single meditation session produces a measurable cortisol dip. Eight weeks of consistent daily practice produces structural changes in the brain — reduced amygdala (fear center) volume and increased prefrontal cortex (rational regulation) activity. The system literally learns to worry less.</p>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-5 flex gap-4">
                                    <span className="text-orange-500 font-black text-xl leading-none mt-0.5">3</span>
                                    <div>
                                        <strong className="text-foreground">Thought Interruption via an Anchor</strong>
                                        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">Rumination is a loop — the same thought generating the same fear generating the same thought. An anchor (breath, mantra, physical sensation) gives the mind an alternative track. Once the loop is interrupted, the nervous system has a window to downregulate.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Why "Emptying Your Mind" Is Terrible Advice for Overthinkers</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The suppression rebound effect is well-documented in psychology: the more you try to not think about something, the more prominently it appears. Telling an anxious person to "just empty their mind" and sit in silence is essentially inviting all their anxious thoughts to emerge without any competing anchor or structure.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Vedic tradition understood this intuitively, which is why Japa (mantra repetition) has been the primary meditative technique for the majority of practitioners for thousands of years. The mantra is not a spiritual decoration — it is a cognitive technology that gives the verbal, analytical mind a continuous task, preventing it from generating anxious narratives.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The goal is not forced emptiness. The goal is a different kind of fullness — an attention so absorbed in the present-moment anchor that the catastrophic thought loops simply don't have space to run.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">3 Grounding Techniques to Stop Overthinking</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-bold text-xl text-orange-400 mb-3">1. Coherent Breathing (4-7-8 or Box Breathing)</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        The fastest physiological intervention for acute anxiety. The extended exhalation is key — it is neurologically impossible to maintain high cortisol levels while breathing slowly with a long out-breath.
                                    </p>
                                    <div className="bg-background/60 rounded-2xl p-5 border border-border/30">
                                        <p className="text-sm font-bold text-foreground mb-3">4-7-8 Technique:</p>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Inhale for <strong className="text-foreground">4 counts</strong></li>
                                            <li>• Hold for <strong className="text-foreground">7 counts</strong></li>
                                            <li>• Exhale slowly for <strong className="text-foreground">8 counts</strong></li>
                                            <li>• Repeat 4–6 cycles. Use this whenever an anxiety spike begins.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-xl text-orange-400 mb-3">2. Yoga Nidra Body Scan</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        Moving attention systematically through the body removes it from the thought-stream without requiring forced emptiness. Because anxiety lives in the future (what might happen), directing attention to present-moment physical sensation breaks the temporal loop.
                                    </p>
                                    <div className="bg-background/60 rounded-2xl p-5 border border-border/30">
                                        <p className="text-sm font-bold text-foreground mb-3">Simple 5-minute version:</p>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Sit or lie down. Close eyes.</li>
                                            <li>• Move attention to feet — observe any sensation (temperature, pressure, tingling) without trying to change it.</li>
                                            <li>• Slowly move up: calves, knees, thighs, hips, abdomen, chest, arms, hands, neck, face, crown.</li>
                                            <li>• When the mind wanders to thought, return to wherever you were in the body — no self-judgment.</li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-xl text-orange-400 mb-3">3. Japa Mantra Repetition</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        For ongoing overthinking (as opposed to acute panic), daily Japa is the most powerful long-term intervention. The mantra occupies the verbal mind's tendency to generate narratives and, over weeks of practice, creates a default state of greater calm.
                                    </p>
                                    <div className="bg-background/60 rounded-2xl p-5 border border-border/30">
                                        <p className="text-sm font-bold text-foreground mb-3">For anxiety specifically:</p>
                                        <ul className="text-sm text-muted-foreground space-y-2">
                                            <li>• Use <strong className="text-foreground">So'ham</strong> (So on inhale, Ham on exhale) — means "I am That" — the breath itself becomes the mantra.</li>
                                            <li>• Or simply repeat <strong className="text-foreground">Om</strong> with each exhale at whatever pace is natural.</li>
                                            <li>• 10–15 minutes daily produces measurable anxiety reduction within 4–6 weeks.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Vedic Understanding of Anxiety</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Bhagavad Gita (chapter 6) addresses anxiety with surgical precision. Krishna tells Arjuna: <em>"For one who has conquered the mind, the mind is the best of friends. For one who has failed to do so, the mind is the greatest enemy."</em> (6.6)
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                This framing is radically different from the modern therapeutic view: the mind is not a neutral processor generating thoughts randomly. It is an instrument that can be trained, and an untrained mind naturally produces anxiety because it defaults to threat-scanning — one of its core evolutionary functions.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Yoga's answer to anxiety is not to reduce the mind's activity but to increase its focus. A diffuse, restless mind generates anxiety. A concentrated mind — whether through mantra, breath, or one-pointed study — naturally produces a state of calm and clarity. The practices above are not relaxation techniques. They are concentration training.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/how-to-start-meditating-daily" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Full Beginner's Guide to Meditation <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-to-start-japa" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How to Start Japa Properly <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Build the Practice That Actually Helps.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The best meditation for anxiety is the one you will actually do every day. Start simple, stay consistent.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/how-to-start-japa"
                                eventLabel="anxiety_meditation:footer:japa"
                                trackPathName="how-to-start-japa"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Start Japa Practice
                            </TrackedLink>
                            <TrackedLink
                                href="/daily-spiritual-routine-beginners"
                                eventLabel="anxiety_meditation:footer:routine"
                                trackPathName="daily-spiritual-routine-beginners"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Daily Spiritual Routine
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
