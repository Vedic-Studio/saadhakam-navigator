import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "What is Maya in Indian Philosophy? | Illusion, Reality, and Moksha",
    description:
        "Maya doesn't mean the world is fake — it means the world is not what you think it is. A clear explanation of maya in Vedanta and how seeing through it leads to moksha.",
    alternates: {
        canonical: "https://www.opensadhaka.com/what-is-maya",
    },
    openGraph: {
        title: "What is Maya? The Vedantic Concept of Illusion Explained",
        description:
            "Maya is not 'the world is fake.' It is the cosmic force that conceals the true nature of reality and projects a finite world from infinite consciousness.",
        url: "https://www.opensadhaka.com/what-is-maya",
        type: "article",
    },
};

const faqs = [
    {
        question: "Does maya mean the world doesn't exist?",
        answer:
            "No. Maya does not mean the world is non-existent or a hallucination. It means the world as we ordinarily experience it — as fundamentally separate, permanent, and ultimately satisfying — is a superimposition over the true nature of reality (Brahman). The world appears real but is not the ultimate reality. Like a movie is real as an experience but doesn't contain the people it depicts, the world is real at one level but not at the deepest level.",
    },
    {
        question: "What is the rope-and-snake analogy for maya?",
        answer:
            "This is the classic Vedantic illustration: You are walking in dim light and mistake a rope lying on the ground for a snake. Your fear is real — you jump back, your heart races. But the snake never existed. The fear arose from superimposing a 'snake' onto the 'rope.' Maya works the same way: we superimpose a separate, permanent 'me' onto what is actually pure, undivided consciousness. Self-knowledge (Jnana) removes the darkness — and the snake disappears.",
    },
    {
        question: "Is maya the same as ignorance (avidya)?",
        answer:
            "They are related but distinct. Avidya (ignorance) is the root cause — the fundamental not-knowing of your true nature as Brahman. Maya is the consequence of avidya — the cosmic power that projects the appearance of multiplicity, separation, and change onto what is actually one undivided reality. Avidya is the cause, maya is the projected effect.",
    },
    {
        question: "What is moksha and how does seeing through maya lead to it?",
        answer:
            "Moksha (liberation) is freedom from the cycle of birth and death (Samsara) driven by unfulfilled karma. Samsara is sustained by maya — by identifying with the body, ego, and the permanent appearance of the world. When self-knowledge (Jnana) removes this identification, the seeker recognizes their true nature as Brahman — infinite, unchanging consciousness. This recognition is Moksha. It is not a future state to be earned but the removal of a present misunderstanding.",
    },
];

export default function WhatIsMayaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="what-is-maya" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Maya?", href: "/what-is-maya" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Seeing Through the <span className="text-orange-500 italic">Matrix</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Maya is the power by which Brahman appears as a world of separate names and forms. It does not mean "nothing exists." It means what appears is conditionally real, not absolutely real. Moksha is recognition of the underlying non-dual reality.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Maya is not the claim that fire doesn't burn. It is the insight that fire's burning — and your fear of it — arises from one infinite source that itself is never burned.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Translators' Mistake</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                When Western scholars first encountered Advaita Vedanta's concept of Maya, they translated it as "illusion" — and then criticized Vedanta for being nihilistic, world-denying, or irrational. "How can you live in the world if you believe it isn't real?" they asked.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                But this is a mistranslation — or at least a gross oversimplification. The Sanskrit word Maya comes from the root <em>ma</em> — "to measure" or "to create." Maya is the creative power by which the unlimited appears to become limited. It does not erase the world; it describes the status of the world in relation to ultimate reality.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Adi Shankaracharya, the great codifier of Advaita, used the word <em>mithya</em> to describe the world's ontological status. Mithya does not mean "unreal" — it means "neither absolutely real nor absolutely unreal." The world has <em>practical reality</em> (vyavaharika) within everyday experience, but it is not <em>absolute reality</em> (paramarthika) when compared to Brahman, the unchanging ground of all existence.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Rope and the Snake</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                The most famous Vedantic analogy for maya is the rope mistaken for a snake in dim light. Examine it carefully — it contains the entire teaching:
                            </p>
                            <div className="grid sm:grid-cols-3 gap-6 mb-8">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30 text-center">
                                    <div className="text-orange-400 font-bold text-lg mb-2">The Rope</div>
                                    <p className="text-sm text-muted-foreground">= Brahman, the true nature of reality — always present, unchanged, simply there.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30 text-center">
                                    <div className="text-orange-400 font-bold text-lg mb-2">The Snake</div>
                                    <p className="text-sm text-muted-foreground">= The world of separate objects, the ego-self, the sense of being a bounded individual. Never truly there — only superimposed.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30 text-center">
                                    <div className="text-orange-400 font-bold text-lg mb-2">The Dim Light</div>
                                    <p className="text-sm text-muted-foreground">= Avidya (ignorance) — the not-knowing of our true nature that makes the superimposition possible.</p>
                                </div>
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                The fear you feel when you mistake the rope for a snake is completely real — your palms sweat, your heart races. But the fear has no real cause, because there was never a snake. When someone brings a torch (knowledge/Jnana), the snake vanishes instantly. The rope remains, exactly as it always was. This is the structure of spiritual awakening in Advaita: the snake of separateness disappears, the rope of Brahman is seen to have been the reality all along.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How Maya Actually Works</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Vedantic analysis identifies two powers operating within Maya:
                            </p>
                            <div className="space-y-5 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">Avarana Shakti — The Power to Conceal</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Maya's first function is to <em>cover</em> the true nature of Brahman — to make the infinite appear finite, the whole appear fragmented, the changeless appear as ever-changing forms. You are always Brahman, but avidya (ignorance sustained by maya) veils this recognition.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">Vikshepa Shakti — The Power to Project</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Having concealed the truth, Maya's second function is to <em>project</em> a substitute reality: the world of separate names and forms (Namarupa), the ego-sense of being a bounded individual, the belief that external objects can bring lasting happiness. Every craving and fear rests on this projected superimposition.
                                    </p>
                                </div>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Spiritual practice in Advaita works to reverse these two operations: first by removing the projection (through discrimination between the real and unreal — Viveka), and then by revealing what was concealed (through meditation and self-inquiry).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Maya and the Three States of Consciousness</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Vedanta uses a subtle and irrefutable argument for maya: the three states of consciousness you already experience every day — waking, dreaming, and deep sleep — demonstrate that no single state is the ultimate reality.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                In the waking state, the physical world seems completely real. In the dream state, an entirely different world seems completely real — until you wake up, at which point it vanishes. In deep dreamless sleep, even the sense of being an individual disappears — yet something remains aware that you slept well. That unchanging witness behind all three states — what Vedanta calls the <em>Turiya</em> (Fourth) — is your true nature as pure consciousness. The world perceived in waking is, from this perspective, structurally identical to the world perceived in dreaming: convincingly real within the state, empty when that state ends.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What is Moksha and How to Achieve It</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                If Maya is the problem — the mistaking of limited forms for ultimate reality — Moksha is the solution: the recognition that there is no separation between the individual self (Atman) and the infinite ground (Brahman). Not a state to be created, but a truth to be uncovered.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Vedanta offers four classical escape routes from Maya — the four Yogas:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-5 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Jnana Yoga</h3>
                                    <p className="text-sm text-muted-foreground">The path of knowledge and direct inquiry. "Neti, neti" (not this, not this) — systematically removing all false identifications until only the unchanging witness remains.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Bhakti Yoga</h3>
                                    <p className="text-sm text-muted-foreground">The path of total surrender and devotion to the divine — dissolving the ego's claim to separateness through love rather than analysis.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Karma Yoga</h3>
                                    <p className="text-sm text-muted-foreground">The path of selfless action — acting without attachment to results, which stops the creation of new karma and gradually dissolves the ego's projections.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Raja Yoga</h3>
                                    <p className="text-sm text-muted-foreground">The path of meditation and mental mastery — quieting the mind so completely that its tendency to project separateness is seen and released.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <Link href="/western-philosophy-and-vedanta" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Indian vs Western Philosophy <ArrowRight size={16} />
                                </Link>
                                <Link href="/vedanta-vs-stoicism" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Vedanta vs Stoicism <ArrowRight size={16} />
                                </Link>
                                <Link href="/advaita-vedanta-explained" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Advaita Vedanta Explained <ArrowRight size={16} />
                                </Link>
                                <Link href="/deities/shiva" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Who is Shiva? <ArrowRight size={16} />
                                </Link>
                                <Link href="/what-is-sanatan-dharma" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    What is Sanatan Dharma? <ArrowRight size={16} />
                                </Link>
                                <Link href="/how-karma-dharma-work" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How Karma Works <ArrowRight size={16} />
                                </Link>
                            </div>
                        </section>

                        <section className="mt-8">
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Explore Non-Duality.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Maya is the core problem Advaita Vedanta solves. Start with Advaita Vedanta explained, or take the Faith Finder to find your path.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/advaita-vedanta-explained"
                                eventLabel="maya:footer:advaita"
                                trackPathName="advaita-vedanta-explained"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Advaita Vedanta Explained
                            </TrackedLink>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="maya:footer:faith-finder"
                                trackPathName="faith-finder"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Find Your Spiritual Path
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
