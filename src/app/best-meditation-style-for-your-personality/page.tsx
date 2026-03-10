import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Best Meditation Style for Your Personality | Sadhaka",
    description:
        "Most meditation advice assumes there is only one type of mind. Compare Japa, breath-led meditation, silent Dhyana, and self-inquiry to find the best meditation style for your specific temperament and nervous system.",
    alternates: {
        canonical: "https://opensadhaka.com/best-meditation-style-for-your-personality",
    },
    openGraph: {
        title: "Best Meditation Style for Your Personality",
        description:
            "Most meditation advice assumes there is only one type of mind. Compare Japa, breath-led meditation, silent Dhyana, and self-inquiry to find the best meditation style for your specific temperament and nervous system.",
        url: "https://opensadhaka.com/best-meditation-style-for-your-personality",
        type: "article",
    },
};

const methods = [
    {
        name: "Japa (Mantra Repetition)",
        summary: "Japa involves the rhythmic repetition of a sacred sound or 'mantra' to anchor the wandering mind. In the Vedic tradition, the mantra is not just a word but a 'vibrational tool' designed to override the default mode network (DMN). By providing a concrete, repetitive task, Japa functions as a 'mental handrail' for those with overactive, high-velocity thought patterns. It is structurally the most robust starting point for practitioners who find silent sitting to be a source of increased anxiety rather than peace.",
        bestFor: "Noisy, high-chatter minds, beginners with high 'mental momentum,' and devotionally inclined temperaments.",
        firstStep: "Select a foundational mantra like 'Om Namah Shivaya' or 'So-Ham' and repeat for 108 counts using a mala.",
        href: "/how-to-start-japa",
    },
    {
        name: "Pranayama-led Meditation",
        summary: "This method prioritizes biological regulation over psychological stillness. By utilizing specific breathing ratios—such as the 1:2 exhale-to-inhale ratio—practitioners can directly stimulate the Vagus nerve and shift the nervous system from a sympathetic (fight-or-flight) to a parasympathetic (rest-and-digest) state. This is 'physiological meditation': you change the air, then the blood, and only then the mind. It is essential for those whose primary obstacle is physical restlessness or somatic tension.",
        bestFor: "High physical restlessness, bodily tension, and those requiring immediate stress reduction.",
        firstStep: "Engage in 5 minutes of 'Box Breathing' (4-4-4-4) before attempting to watch the mind.",
        href: "/yoga-sutras-complete-guide",
    },
    {
        name: "Dhyana (Witness Awareness)",
        summary: "Dhyana is the practice of resting as the 'Sakshi'—the silent witness. Unlike Japa or Pranayama, it provides no external or internal 'crutch.' You simply observe thoughts and sensations as they arise and dissolve, without interference. This requires a baseline of mental stability; if the mind is a storm, Dhyana is like trying to watch the waves from within the water. Once stability is achieved, this method leads directly to the core of classical Yoga and self-realization.",
        bestFor: "Intermediate practitioners, naturally steady temperaments, and those seeking pure observation.",
        firstStep: "Maintain an upright posture and observe the transition between each thought without label or judgment.",
        href: "/which-meditation-for-me",
    },
    {
        name: "Atma-Vichara (Self-Inquiry)",
        summary: "Self-Inquiry is a 'direct path' popularized by Sri Ramana Maharshi. Instead of focusing on an object (breath, sound, light), the attention is turned back on the subject itself. By asking 'To whom does this thought arise?' and tracking the 'I-thought' back to its source, the practitioner deconstructs the ego-identity in real-time. It is highly analytical yet entirely non-intellectual, making it the preferred method for the philosophically rigorous and those seeking the fastest exit from dualistic perception.",
        bestFor: "Analytical seekers, contemplative minds, and those prioritize Truth over comfort.",
        firstStep: "Turn attention to the feeling of 'I am' and ignore all arising mental content.",
        href: "/what-is-vedanta",
    },
];

const references = [
    { label: "Meditation — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/meditation" },
    { label: "Yoga — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/yoga" },
    { label: "Bhagavad Gita — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/Bhagavad-Gita" },
    { label: "Vedanta — Encyclopaedia Britannica", href: "https://www.britannica.com/topic/Vedanta" },
    { label: "Hindu Philosophy — Stanford Encyclopedia of Philosophy", href: "https://plato.stanford.edu/entries/hindu-philosophy/" },
];

const faqs = [
    {
        question: "What meditation style is best for beginners?",
        answer:
            "Most beginners fail because they start with silent meditation (Dhyana). For the modern, digital mind, Japa or Pranayama-led meditation is significantly more effective because both provide an immediate 'job' for the mind to do, reducing the frustration of initial failure.",
    },
    {
        question: "What meditation style is best for anxiety?",
        answer:
            "Anxiety is a physiological event. Therefore, Pranayama-led meditation is the direct antidote. By slowing the breath, you signal safety to the nervous system, which naturally collapses the psychological feedback loop of anxious thinking.",
    },
    {
        question: "How long should I practice a style before switching?",
        answer:
            "Commitment is more important than the specific style. We recommend a 40-day 'Mandala'—practicing one method consistently for 40 days to actually observe the neurological shifts before deciding if it's the right fit for your temperament.",
    },
    {
        question: "Can I combine more than one meditation style?",
        answer:
            "Yes. A common and effective sequence is: 5 minutes of Pranayama (to ground), 10 minutes of Japa (to focus), and 5 minutes of silent Dhyana (to rest in that focus).",
    },
];

export default function BestMeditationStylePage() {
    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Best Meditation Styles by Personality",
        itemListElement: methods.map((method, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: method.name,
            description: method.summary,
            url: `https://opensadhaka.com${method.href}`,
        })),
    };

    const faqSchema = {
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
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="best-meditation-style-for-your-personality" pillar="seo-chooser" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Best Meditation Style for Your Personality", href: "/best-meditation-style-for-your-personality" },
                        ]}
                    />

                    <header className="mb-12 mt-6">
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight">Best Meditation Style for <span className="text-orange-500">Your Personality</span></h1>
                        <div className="grid md:grid-cols-3 gap-8 items-start">
                            <div className="md:col-span-2 space-y-6">
                                <p className="text-lg text-foreground leading-relaxed">
                                    <strong>Direct answer:</strong> if your mind is noisy or anxious, start with Japa or breath-led meditation; if your mind is already steady, start with Dhyana; if your nature is analytical, begin with self-inquiry.
                                </p>
                                <p className="text-2xl text-foreground font-medium leading-tight">
                                    Most meditation advice fails because it assumes there is only one type of mind.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    If you tell a highly anxious person to sit in silent observation, you aren't teaching them to meditate—you are building a pressure cooker. Authentic spiritual practice recognizes that the path to stillness must match the current architecture of your nervous system and your innate mental tendencies (Vasanas).
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Below we categorize the four primary meditation methodologies of Sanatan Dharma by the specific temperaments they serve. One is not "better" than the other; they are different tools for different terrains.
                                </p>
                            </div>
                            <div className="bg-orange-600/10 border border-orange-500/20 rounded-2xl p-6 hidden md:block">
                                <h3 className="text-orange-400 font-bold mb-2 uppercase text-xs tracking-widest">The Core Insight</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    "Meditation is the art of giving the mind a job it likes, until it doesn't need a job anymore."
                                </p>
                            </div>
                        </div>
                    </header>

                    <section className="mb-16 rounded-2xl border border-border/60 bg-card/40 p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Best for / Not best for / Where to start</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong className="text-foreground">Best for:</strong> seekers who want a practical fit between temperament and meditation method instead of one-size-fits-all advice.</li>
                            <li><strong className="text-foreground">Not best for:</strong> people looking for a single "perfect" method that never changes with life stage or nervous-system condition.</li>
                            <li><strong className="text-foreground">Where to start:</strong> run one 40-day trial with a single method, then switch only if your attention, steadiness, and consistency are not improving.</li>
                        </ul>
                    </section>

                    <section className="mb-20">
                        <h2 className="font-display text-4xl font-bold mb-10 text-center">Pathways to Stillness</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {methods.map((method, index) => (
                                <article key={method.name} className="flex flex-col rounded-3xl border border-border/60 bg-card p-8 hover:border-orange-500/30 transition-all group shadow-sm hover:shadow-xl">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-600/10 flex items-center justify-center text-orange-500 font-bold mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all text-xl">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-3xl font-display font-bold mb-4">{method.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                                        {method.summary}
                                    </p>
                                    <div className="space-y-4 mb-8 pt-6 border-t border-border/40">
                                        <div>
                                            <span className="text-xs uppercase tracking-widest text-orange-400 font-bold block mb-1">Best For</span>
                                            <p className="text-sm text-foreground font-medium">{method.bestFor}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs uppercase tracking-widest text-orange-400 font-bold block mb-1">Starting Practice</span>
                                            <p className="text-sm text-foreground font-medium">{method.firstStep}</p>
                                        </div>
                                    </div>
                                    <TrackedLink
                                        href={method.href}
                                        eventLabel={`chooser_option:best-meditation-style-for-your-personality:${method.href}`}
                                        trackPathName={method.href.replace(/^\//, "")}
                                        className="inline-flex items-center text-orange-400 hover:text-orange-300 font-bold group-hover:translate-x-1 transition-transform"
                                    >
                                        Unlock This Method <ArrowRight className="ml-2 w-5 h-5" />
                                    </TrackedLink>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mb-20 prose prose-invert max-w-none border-y border-border/40 py-20">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="font-display text-4xl font-bold mb-10 text-center">The Biology of Stillness</h2>
                            <p className="text-xl leading-relaxed mb-8">
                                Modern neuroscience confirms what the Vedic masters taught thousands of years ago: the mind is an instrument tied to the breath (Prana).
                                When the nervous system is in a high-beta state (stress/anxiety), the cognitive ability to "just sit" is essentially offline.
                            </p>
                            <div className="grid md:grid-cols-2 gap-10 bg-muted/20 p-8 rounded-3xl border border-border/40 mb-10">
                                <div>
                                    <h4 className="text-orange-400 font-bold mb-2">The Scientific View</h4>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        Meditation activates the Anterior Cingulate Cortex (ACC) and the Prefrontal Cortex (PFC), while dampening the Amygdala. If the Amygdala is overactive, you must use breath or sound (mantra) to modulate it before cognitive stillness is possible.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-orange-400 font-bold mb-2">The Vedic View</h4>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        The mind (Manas) is like a mirror. If the dust of "Rajas" (activity/passion) is high, the mirror is obscured. You don't try to see the reflection; you first clean the dust using active practices like Kriya or Japa.
                                    </p>
                                </div>
                            </div>
                            <p className="text-lg text-muted-foreground leading-relaxed text-center italic">
                                "You don't fight the mind to reach stillness; you negotiate with the body to allow it."
                            </p>
                        </div>
                    </section>

                    <section className="mb-20 rounded-3xl bg-muted/10 border border-border/60 p-10 overflow-hidden relative">
                        <h2 className="font-display text-4xl font-bold mb-10 text-center">Quick Decision Matrix</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[760px] relative z-10">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Meditation style</th>
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Best for</th>
                                        <th className="py-4 pr-6 text-orange-400 font-bold uppercase tracking-widest text-xs">Difficulty</th>
                                        <th className="py-4 text-orange-400 font-bold uppercase tracking-widest text-xs">Starting Trigger</th>
                                    </tr>
                                </thead>
                                <tbody className="text-lg">
                                    <tr className="border-b border-border/50">
                                        <td className="py-6 pr-6 font-bold">Japa</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Overwhelmed/Loud minds</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Entry-Level</td>
                                        <td className="py-6 text-muted-foreground font-medium">Mantra repetition</td>
                                    </tr>
                                    <tr className="border-b border-border/50">
                                        <td className="py-6 pr-6 font-bold">Pranayama</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Physically restless</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Entry-Level</td>
                                        <td className="py-6 text-muted-foreground font-medium">Breath regulation</td>
                                    </tr>
                                    <tr className="border-b border-border/50">
                                        <td className="py-6 pr-6 font-bold">Dhyana</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Steady/Stable temperaments</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Intermediate</td>
                                        <td className="py-6 text-muted-foreground font-medium">Silent observation</td>
                                    </tr>
                                    <tr>
                                        <td className="py-6 pr-6 font-bold">Atma-Vichara</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Highly analytical/Skeptical</td>
                                        <td className="py-6 pr-6 text-muted-foreground">Advanced</td>
                                        <td className="py-6 text-muted-foreground font-medium">Investigating the "I"</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-20 grid md:grid-cols-2 gap-12 items-center rounded-3xl border border-orange-900/40 bg-orange-950/10 p-12">
                        <div>
                            <h2 className="font-display text-4xl font-bold mb-6">Match Your Nature</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Individual temperament is the single greatest predictor of spiritual success.
                                Our <strong>Faith Finder</strong> assessment maps your psychological profile to the specific lineages and practices that were engineered for your type.
                            </p>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="chooser_cta:best-meditation-style-for-your-personality:faith-finder"
                                trackPathName="faith-finder"
                                className="inline-flex items-center rounded-full bg-orange-600 hover:bg-orange-700 px-8 py-4 text-white font-bold text-lg transition-all"
                            >
                                Get Personalized Practice <ArrowRight className="ml-2 w-5 h-5" />
                            </TrackedLink>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted p-4 rounded-xl text-center"><span className="block text-2xl font-bold text-orange-500">4</span><span className="text-xs text-muted-foreground uppercase">Key Paths</span></div>
                            <div className="bg-muted p-4 rounded-xl text-center"><span className="block text-2xl font-bold text-orange-500">12+</span><span className="text-xs text-muted-foreground uppercase">Lineages</span></div>
                            <div className="bg-muted p-4 rounded-xl text-center"><span className="block text-2xl font-bold text-orange-500">100%</span><span className="text-xs text-muted-foreground uppercase">Neutral</span></div>
                            <div className="bg-muted p-4 rounded-xl text-center"><span className="block text-2xl font-bold text-orange-500">AI</span><span className="text-xs text-muted-foreground uppercase">Powered</span></div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="font-display text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm">
                                    <h3 className="text-xl font-bold mb-4">{faq.question}</h3>
                                    <p className="text-muted-foreground leading-relaxed italic border-l-2 border-orange-500/30 pl-4">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-border/60 bg-muted/5 p-8">
                        <h2 className="font-display text-2xl font-bold mb-6">Authoritative references</h2>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {references.map((reference) => (
                                <li key={reference.href}>
                                    <a href={reference.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-orange-400 font-medium transition-colors">
                                        {reference.label}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}