import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";
import { LongformContent } from "@/components/LongformContent";

export const metadata: Metadata = {
    title: "How Karma and Dharma Actually Work | Beyond Punishment and Reward",
    description:
        "Karma is not cosmic punishment — it is the physics of cause and effect for the soul. Dharma is your right action in context. Learn how both actually work in Indian philosophy.",
    alternates: {
        canonical: "https://opensadhaka.com/how-karma-dharma-work",
    },
    openGraph: {
        title: "How Karma Actually Works: Beyond Punishment and Reward",
        description:
            "A clear, modern explanation of karma and dharma — what they mean, how they differ, and how to use them to navigate your life.",
        url: "https://opensadhaka.com/how-karma-dharma-work",
        type: "article",
    },
};

const faqs = [
    {
        question: "Is karma real, or is it just a metaphor?",
        answer:
            "In Indian philosophy, karma is presented as an objective law — as real as gravity — not a metaphor or a moral fairy tale. Just as a physical action produces a physical reaction, every mental and physical action leaves an impression (Samskara) on the subtle body that shapes future experience. Whether you interpret this literally or psychologically, the practical insight is the same: your habitual actions shape your character, which shapes your life.",
    },
    {
        question: "What is the difference between dharma and karma?",
        answer:
            "Dharma is the path — the action that is right for you in your specific context, given your nature and duties. Karma is the consequence — the seeds your actions plant that ripen into future circumstances. Following your Dharma produces clean, non-binding karma. Violating your Dharma — acting out of selfishness, fear, or greed — creates binding karma that you must eventually work out.",
    },
    {
        question: "Can karma from a past life affect my current life?",
        answer:
            "In the Hindu framework, yes. Prarabdha karma refers to the portion of accumulated karma from past lives that is 'ripe' and actively expressing itself in your current life — your birth circumstances, body type, and life tendencies. However, Agami karma — new karma you generate through present choices — can modify future circumstances, and Kriya Yoga (action without attachment) gradually dissolves accumulated karma.",
    },
    {
        question: "What does 'nishkama karma' mean?",
        answer:
            "Nishkama Karma means 'desireless action' or 'action without attachment to results.' The Bhagavad Gita (2.47) teaches that you have a right to your actions but not to their fruits. When you act without craving the result, the action produces no binding karma. This is the central practice of Karma Yoga — doing your duty with total excellence while being inwardly free of the outcome.",
    },
];

const karmaTypes = [
    {
        name: "Sanchita Karma",
        sanskrit: "सञ्चित",
        description:
            "The entire accumulated store of all karmas from all past lives — the 'warehouse' of unresolved causes waiting to ripen. Most of this remains latent and unexperienced in any single lifetime.",
    },
    {
        name: "Prarabdha Karma",
        sanskrit: "प्रारब्ध",
        description:
            "The portion of Sanchita karma that has been 'released' to express itself in your current life. This determines your birth circumstances, body, family, and early life tendencies. It cannot be avoided — only lived through with wisdom.",
    },
    {
        name: "Agami Karma",
        sanskrit: "आगामि",
        description:
            "The new karma you are generating right now through your present choices, actions, and intentions. This is where free will operates. By acting without selfish attachment, you create Agami karma that leads toward liberation rather than further bondage.",
    },
];

export default function HowKarmaDharmaWorkPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="how-karma-dharma-work" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How Karma and Dharma Work", href: "/how-karma-dharma-work" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Physics of the <span className="text-orange-500 italic">Soul</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Karma is the universal law of cause and effect applied to the soul — every action plants a seed that eventually ripens as a future experience. Dharma is the path of right action appropriate to your specific nature and circumstances. Karma is the consequence of whatever you do; Dharma is the quality of what you should do.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Karma is not cosmic punishment. It is physics for the soul — as objective and impersonal as gravity.
                        </p>
                    </header>

                    <LongformContent className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What Karma Is (And Isn't)</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Western pop-culture version of karma — "you were mean to me so bad things will happen to you" — is a vast oversimplification. In Sanskrit, <em>karma</em> simply means "action." The law of karma is a law of causality: every intentional action, whether physical, verbal, or mental, produces an effect. Some effects ripen quickly (within this lifetime), others slowly (across multiple lifetimes).
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Crucially, karma is <strong className="text-foreground">not judgment</strong>. There is no cosmic judge assigning rewards and punishments. The system is mechanical, not moral, in the way a thermostat is mechanical: you set the temperature with your actions, and the universe responds accordingly. A person who consistently acts selfishly does not get punished by an external force — they create the internal conditions (habits, perceptions, mental tendencies) that generate suffering.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The Bhagavad Gita introduces a liberating refinement: <strong className="text-foreground">it is not action but attachment to the result of action that binds.</strong> Act fully, act excellently — but let go of the fruits. This is Karma Yoga, and it is the central teaching of chapter 3 through 6 of the Gita.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Three Types of Karma</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Classical Indian philosophy distinguishes three categories of karma, which together explain why some tendencies feel deeply ingrained while others feel freshly chosen:
                            </p>
                            <div className="space-y-6">
                                {karmaTypes.map((k) => (
                                    <div key={k.name} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                        <div className="flex items-baseline gap-3 mb-3">
                                            <h3 className="font-bold text-xl text-foreground">{k.name}</h3>
                                            <span className="text-orange-400 italic text-sm">{k.sanskrit}</span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{k.description}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-base text-muted-foreground mt-8 leading-relaxed italic border-l-4 border-orange-500/30 pl-6">
                                Spiritual practice (meditation, selfless action, ethical living) works primarily on Agami karma — stopping the creation of new binding karma — while gradually burning through Sanchita karma over time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What Dharma Is</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                If karma is the consequence of your actions, dharma is the quality of the actions themselves. The Sanskrit root of <em>dharma</em> is <em>dhri</em> — "to hold" or "to sustain." Dharma is literally "that which holds everything in balance." It operates at several levels:
                            </p>
                            <ul className="space-y-5 mb-8">
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black text-xl leading-none mt-1.5">◆</span>
                                    <div>
                                        <strong className="text-foreground">Universal Dharma (Rita/Sadharana Dharma)</strong>
                                        <p className="text-muted-foreground mt-1 leading-relaxed">The ethical principles that apply to everyone regardless of circumstance: non-violence, truthfulness, non-stealing, non-exploitation. These are the minimum floor of right living.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black text-xl leading-none mt-1.5">◆</span>
                                    <div>
                                        <strong className="text-foreground">Personal Dharma (Svadharma)</strong>
                                        <p className="text-muted-foreground mt-1 leading-relaxed">The specific duty arising from your unique nature, role, and life circumstances. The dharma of a parent is to protect and educate a child. The dharma of a teacher is to transmit knowledge clearly. The dharma of a citizen is to contribute to community well-being. Your svadharma changes with life stages.</p>
                                    </div>
                                </li>
                            </ul>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Bhagavad Gita contains one of the most radical statements about svadharma: <em>"Better is one's own Dharma, though imperfectly performed, than the Dharma of another well performed. Even death in one's own Dharma is bliss; to follow another's Dharma is fear-inducing."</em> (3.35)
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                This verse is not tribal — it is psychological. When you abandon your authentic path to imitate someone else's greatness, you generate the particular suffering of inauthenticity: performing well at something that is not truly you. Your own imperfect path, lived authentically, is more liberating than someone else's perfection.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Difference Between Dharma and Karma</h2>
                            <div className="overflow-x-auto rounded-2xl border border-border/40 mb-8">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-muted/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Concept</th>
                                            <th className="p-4 font-bold text-orange-400">Dharma</th>
                                            <th className="p-4 font-bold text-orange-400">Karma</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20">
                                        <tr><td className="p-4 text-muted-foreground">What it is</td><td className="p-4">The path of right action</td><td className="p-4">The consequence of action taken</td></tr>
                                        <tr className="bg-muted/10"><td className="p-4 text-muted-foreground">Operates in</td><td className="p-4">The present moment (choice)</td><td className="p-4">Time (future ripening)</td></tr>
                                        <tr><td className="p-4 text-muted-foreground">Nature</td><td className="p-4">Contextual — changes by role and stage</td><td className="p-4">Mechanical — action causes reaction</td></tr>
                                        <tr className="bg-muted/10"><td className="p-4 text-muted-foreground">Freedom involved</td><td className="p-4">Yes — you choose whether to follow it</td><td className="p-4">Partially — Agami karma is free; Prarabdha is not</td></tr>
                                        <tr><td className="p-4 text-muted-foreground">Liberation path</td><td className="p-4">Following svadharma reduces future suffering</td><td className="p-4">Nishkama karma stops new binding karma</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Dharma and Karma in Modern Life</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                These are not abstract ancient concepts. They have direct applications in career, relationships, and daily decisions.
                            </p>
                            <div className="space-y-5">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">At Work: Karma Yoga in Practice</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        When you work for the paycheck alone, you create anxiety whenever the paycheck feels threatened. When you work for the quality of the work itself — with the paycheck as a natural byproduct — you find both better performance and greater peace. This is exactly what BG 2.47 describes: do your work with full commitment, but don't let your identity hinge on the result.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">In Relationships: Dharma as Role Clarity</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Most relational suffering comes from role confusion — expecting others to fulfill needs that aren't theirs to fulfill, or failing to meet the actual needs of your role. Dharmic thinking asks: given who I am in this relationship and what this person actually needs from me right now, what is the right action? Not the most comfortable, or the most emotionally gratifying — the right one.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">In Ethical Dilemmas: Universal vs Personal Dharma</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        When your svadharma (personal duty) seems to conflict with sadharana dharma (universal ethics), the framework suggests: universal ethics take priority, but context matters enormously. Arjuna's dilemma in the Gita is exactly this — his personal reluctance vs his warrior duty vs the larger dharmic order of upholding righteousness. There are no easy algorithms. Wisdom is needed.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link href="/what-is-sanatan-dharma" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                What is Sanatan Dharma? <ArrowRight size={16} />
                            </Link>
                            <Link href="/what-is-maya" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                What is Maya (Illusion)? <ArrowRight size={16} />
                            </Link>
                            <Link href="/texts/bhagavad-gita" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Read the Bhagavad Gita <ArrowRight size={16} />
                            </Link>
                        </div>

                    </LongformContent>

                    <section className="mt-16">
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

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Apply It Starting Today.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Understanding karma and dharma is one thing. Practicing Karma Yoga — acting without attachment — is another. The Bhagavad Gita is the manual.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/texts/bhagavad-gita"
                                eventLabel="karma_dharma:footer:gita"
                                trackPathName="texts/bhagavad-gita"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Explore the Bhagavad Gita
                            </TrackedLink>
                            <TrackedLink
                                href="/what-is-sanatan-dharma"
                                eventLabel="karma_dharma:footer:sanatan"
                                trackPathName="what-is-sanatan-dharma"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                What is Sanatan Dharma?
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
