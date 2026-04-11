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
    title: "The Spiritual Antidote to Hustle Culture: Finding Purpose Without Achieving",
    description:
        "Hustle culture promises meaning through achievement. The Bhagavad Gita disagrees. How to find your life purpose spiritually, without needing to achieve anything first.",
    alternates: {
        canonical: "https://www.opensadhaka.com/spiritual-antidote-to-hustle-culture",
    },
    openGraph: {
        title: "The Spiritual Antidote to Hustle Culture",
        description:
            "Your purpose isn't a glamorous career. Svadharma says it's the duty directly in front of you, done with full attention. The Gita's antidote to achievement anxiety.",
        url: "https://www.opensadhaka.com/spiritual-antidote-to-hustle-culture",
        type: "article",
    },
};

const faqs = [
    {
        question: "What does the Bhagavad Gita say about finding your purpose?",
        answer:
            "The Gita does not promise a glamorous, externally validated 'life purpose.' It offers Svadharma, your own intrinsic nature and the duty that arises from it in your specific context. According to 3.35, it is better to perform one's own dharma imperfectly than another's dharma perfectly. Your purpose is found by asking: what is my actual nature, and what does this specific situation require of me?",
    },
    {
        question: "What is Svadharma and how do I find mine?",
        answer:
            "Svadharma (sva = own, dharma = duty) is the right path of action arising from your unique nature, capacities, and role. It is not a fixed destiny but a living responsiveness to who you are and what your circumstances actually require. To find it: subtract what you do purely for external approval. What remains, what you do because it feels genuinely aligned regardless of reward, contains your svadharma. The Gita consistently points toward quality of attention over scale of achievement.",
        },
    {
        question: "How do you detach from outcomes in practice?",
        answer:
            "Detachment from outcomes (Nishkama Karma) means caring deeply about the quality of your action while being internally free from the result's effect on your identity. Practically: before starting any task, briefly acknowledge that the outcome is not in your control. Then focus entirely on the process. After completing it, resist interpreting the result as a verdict on your worth as a person. Results inform your next action. They don't define your being.",
    },
    {
        question: "Can someone who has failed completely still have a meaningful life according to Indian philosophy?",
        answer:
            "Absolutely, and this is one of Vedanta's most radical claims. The Atman (true self) is unaffected by external success or failure. Failure, from the Gita's perspective, is simply information about the gap between your skills and the situation's demands, not a metaphysical verdict on your worth. Arjuna himself was on the verge of the greatest 'failure' imaginable (abandoning his duty). The entire Gita is Krishna's argument that even from complete breakdown, right action and liberation remain possible.",
    },
];

export default function SpiritualAntidoteHustleCulturePage() {
    const article = getArticleBySlug("spiritual-antidote-to-hustle-culture")!;
    const pillar = getPillarConfig(article.pillar);
    const schemas = buildArticleSchemas(article, pillar.label, pillar.href);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <ContentPageTracker slug="spiritual-antidote-to-hustle-culture" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Antidote to Hustle Culture", href: "/spiritual-antidote-to-hustle-culture" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Stop <span className="text-orange-500 italic">Finding</span> Your Purpose
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> The Gita rejects achievement as the source of meaning. Svadharma locates purpose in the duty directly in front of you, performed with full attention and reduced attachment to outcomes. Meaning is measured by action quality and inner alignment, not social visibility.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Hustle culture says meaning comes after you achieve enough. The Gita says meaning is available right now, in how you do what you're already doing.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Why Purpose-Seeking Creates Anxiety</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The modern productivity-spirituality complex has turned "finding your purpose" into an anxiety-amplifying project. Books, courses, and Instagram gurus promise that once you discover your "why," your life will finally make sense. This framework has several problems:
                            </p>
                            <ul className="space-y-4 mb-8 text-xl text-muted-foreground">
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black leading-none mt-1">1.</span>
                                    <span>It implies you don't have a purpose yet, creating a deficiency narrative that makes you feel permanently incomplete.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black leading-none mt-1">2.</span>
                                    <span>It links purpose to achievement, so ordinary, necessary, unglamorous work seems meaningless by definition.</span>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black leading-none mt-1">3.</span>
                                    <span>It externalizes purpose, making it something you <em>find</em> in the future rather than something you <em>embody</em> right now.</span>
                                </li>
                            </ul>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The Bhagavad Gita's framework is the precise inverse of this. Purpose is something you are, in each moment, either aligned with or violating.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Gita on Failure and Success</h2>
                            <blockquote className="border-l-4 border-orange-500 pl-8 py-4 mb-8 bg-background/40 rounded-r-2xl">
                                <p className="text-xl text-foreground italic leading-relaxed mb-2">
                                    "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty."
                                </p>
                                <cite className="text-muted-foreground text-sm">— Bhagavad Gita 2.47</cite>
                            </blockquote>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                This verse contains a complete psychology of performance that is the opposite of hustle culture. Shankaracharya's bhashya on this verse reads "ma phaleshu kadachana" as a categorical prohibition, not a suggestion.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Hustle Culture's Framework</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Your value = your output</li>
                                        <li>• Success validates effort; failure invalidates it</li>
                                        <li>• Rest is guilt-inducing</li>
                                        <li>• Achievement leads to happiness</li>
                                        <li>• You are the cause of your results</li>
                                    </ul>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Karma Yoga's Framework</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Your value = your awareness and effort</li>
                                        <li>• Results inform but don't define</li>
                                        <li>• Idleness is also a violation of dharma</li>
                                        <li>• Action quality leads to peace</li>
                                        <li>• You are a channel, not the sole cause</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What Svadharma Actually Means</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Svadharma (सवधर्म), "own duty," is the right path of action arising from your unique combination of nature, capacity, and circumstance. It carries no requirement that you change your career, move across the world, or become spiritually impressive.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Gita's most radical teaching on this (3.35): "Better is one's own Dharma, though imperfectly performed, than the Dharma of another well performed. Even death in one's own Dharma is bliss; to follow another's Dharma is fear-inducing." Shankaracharya's commentary explains that another's dharma produces fear precisely because it lacks alignment with one's intrinsic nature.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                A parent raising a child with genuine attention and love is following their svadharma. A craftsperson producing excellent work with care and commitment is following their svadharma. A nurse attending to a patient with full presence is following their svadharma. None of these require scale, recognition, or disruption.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The measure of svadharma is internal alignment: does this action arise from your genuine nature, or from fear, approval-seeking, and comparison?
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Finding Meaning in Deep Suffering</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Suffering has a particular role in Indian philosophy that runs counter to the modern impulse to optimize suffering away. The Gita says (4.38): "There is nothing in this world as purifying as knowledge." Krishna speaks this directly to Arjuna, a student paralyzed by grief and confusion, establishing that the teacher-student relationship itself is the vehicle through which wisdom travels. The path to knowledge is rarely comfortable.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Profound suffering, the kind that cannot be fixed by productivity hacks, relationship changes, or geographic relocations, forces the ego to look inward when external victories have demonstrably failed to produce lasting peace. This is the function of suffering in the Indian framework: not punishment, but redirection.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The person who has tried everything external and found it insufficient is, paradoxically, in the ideal position to begin genuine spiritual inquiry. They are not distracted by the belief that the next achievement will finally solve the underlying hunger.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Actually Detach From Outcomes</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Nishkama Karma (desireless action) is cultivated progressively through practice, not achieved through willpower or affirmations. Shankaracharya's commentary on BG 2.47 grounds this in the discipline of the intellect: the practitioner learns to act fully while holding the result lightly, a capacity developed through sustained effort over time.
                            </p>
                            <div className="space-y-5 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Step 1: Notice the Attachment</h3>
                                    <p className="text-muted-foreground leading-relaxed">Before any significant action, briefly notice: "What result am I craving here? What am I afraid of?" Simply seeing the attachment clearly reduces its grip. This is the beginning of Viveka (discrimination).</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Step 2: Consecrate the Action</h3>
                                    <p className="text-muted-foreground leading-relaxed">Before beginning, briefly offer the action: "This work is for something beyond my ego's agenda." This is a psychological reorientation that moves the center of the action from ego-gratification to contribution. Even a simple acknowledgment suffices.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Step 3: Separate Result from Worth</h3>
                                    <p className="text-muted-foreground leading-relaxed">After the result (whether success or failure), deliberately distinguish: "The result is information about this situation. It is not a verdict on my worth as a being." Results inform strategy; they don't determine identity.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                                <Link href="/midlife-crisis-spiritual-meaning" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Spiritual Meaning of Midlife Crisis <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-karma-dharma-work" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How Karma and Dharma Work <ArrowRight size={16} />
                                </Link>
                                <Link href="/dark-night-of-the-soul" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Dark Night of the Soul <ArrowRight size={16} />
                                </Link>
                                <Link href="/texts/bhagavad-gita" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Read the Bhagavad Gita <ArrowRight size={16} />
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

                    <section className="mt-16 mb-20">
                        <h2 className="text-2xl font-display font-bold mb-8 text-muted-foreground uppercase tracking-wide">Sources &amp; Commentaries</h2>
                        <ul className="space-y-3 text-sm">
                            <li><a href="https://www.britannica.com/topic/Bhagavadgita" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">Bhagavad Gita — Encyclopaedia Britannica</a></li>
                            <li><a href="https://plato.stanford.edu/entries/dharma/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">Dharma — Stanford Encyclopedia of Philosophy</a></li>
                            <li><a href="https://plato.stanford.edu/entries/karma/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">Karma — Stanford Encyclopedia of Philosophy</a></li>
                        </ul>
                    </section>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Gita Is the Manual.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The Bhagavad Gita was written for exactly this situation: a person of high ability, facing a difficult duty, paralyzed by anxiety about the outcome. It has not gone out of date.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/texts/bhagavad-gita"
                                eventLabel="hustle_culture:footer:gita"
                                trackPathName="texts/bhagavad-gita"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Read the Bhagavad Gita
                            </TrackedLink>
                            <TrackedLink
                                href="/starting-spiritual-practice"
                                eventLabel="hustle_culture:footer:practice"
                                trackPathName="starting-spiritual-practice"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Start a Spiritual Practice
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
