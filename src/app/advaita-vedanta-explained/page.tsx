import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, ExternalLink, Zap } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Advaita Vedanta Explained | The Philosophy of Non-Duality",
    description: "A comprehensive guide to Advaita Vedanta, the non-dual school of Hindu philosophy. Explore the teachings of Adi Shankara, atman, brahman, and maya.",
    alternates: {
        canonical: "https://opensadhaka.com/advaita-vedanta-explained",
    },
    openGraph: {
        title: "Advaita Vedanta Explained: The Ultimate Guide to Non-Duality",
        description: "Discover the core principles of Advaita Vedanta, from the rope-snake analogy to the realization of the absolute Self.",
        url: "https://opensadhaka.com/advaita-vedanta-explained",
        type: "article",
    },
};

const faqs = [
    {
        question: "Does Advaita Vedanta believe in a personal God?",
        answer: "Yes, but from a specific level of reality. Advaita distinguishes between Nirguna Brahman (the absolute, attribute-less reality) and Saguna Brahman (the personal God, or Ishvara) who oversees the empirical world. Devotion is seen as a necessary preparatory step for the final realization of non-duality."
    },
    {
        question: "Is the world an 'illusion' in Advaita?",
        answer: "The word 'Maya' is better translated as 'superimposition' or 'relative reality' rather than 'non-existence.' The world is not a total void; it is real as long as you are in it, but it is not the *ultimate* truth. Like a dream is real until you wake up, the world is real until you recognize its source in Brahman."
    },
    {
        question: "How is Advaita different from Buddhism?",
        answer: "While both seek liberation from suffering, Advaita asserts the existence of a permanent, eternal 'Self' (Atman), which is identical to the absolute (Brahman). Buddhism, particularly in its earlier forms, teaches 'Anatta' (No-Self), suggesting that there is no permanent core to the individual."
    }
];

const references = [
    { label: "Adi Shankara — Stanford Encyclopedia of Philosophy", href: "https://plato.stanford.edu/entries/shankara/" },
    { label: "Advaita Vedanta — Internet Encyclopedia of Philosophy", href: "https://iep.utm.edu/advaita-v/" },
    { label: "The Upanishads — Britannica", href: "https://www.britannica.com/topic/Upanishad" }
];

export default function AdvaitaVedantaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="advaita-vedanta-explained" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Advaita Vedanta Explained", href: "/advaita-vedanta-explained" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Beyond the <span className="text-orange-500 italic block mt-2">Binary Mind</span>
                        </h1>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Advaita Vedanta is the philosophical claim that the boundary between "you" and the "universe" is not a physical wall, but a persistent cognitive superimposition.
                        </p>
                    </header>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">The Non-Dual Equation</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    The word <strong className="text-foreground">Advaita</strong> literally translates to "not-two." Unlike dualistic systems that posit a fundamental separation between the Creator and the Created, Advaita asserts that ultimate reality is a singular, indivisible continuum of consciousness. In this framework, your individual soul (Atman) is not a "piece" of the divine, but is identical to the absolute totality (Brahman).
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    This realization is the central goal of the tradition. It suggests that liberation is not something to be "attained" in the future, but a recognition of a truth that is already present. We suffer because we fail to recognize this underlying unity, identifying instead with the temporary shells of body, ego, and circumstance.
                                </p>
                            </section>

                            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                                    <Zap className="text-orange-500 w-8 h-8" />
                                    The Rope-Snake Analogy
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Adi Shankara, the 8th-century master who systematized Advaita, used the analogy of a rope and a snake to explain our misperception of reality. If you see a coiled rope in dim light and mistake it for a snake, your fear is real. Your heart races, and you might run away. The snake, however, has no objective reality; it is a superimposition (Adhyasa) of your mind onto the rope.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-background/50 p-6 rounded-2xl border border-border/20">
                                        <h4 className="font-bold mb-2 uppercase text-xs tracking-widest text-orange-400">The Error</h4>
                                        <p className="text-sm text-muted-foreground italic">"I am a small, vulnerable individual separate from the world."</p>
                                    </div>
                                    <div className="bg-background/50 p-6 rounded-2xl border border-border/20">
                                        <h4 className="font-bold mb-2 uppercase text-xs tracking-widest text-green-400">The Correction</h4>
                                        <p className="text-sm text-muted-foreground italic">"I am the awareness in which the world and the individual appear."</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">The Two Tiers of Reality</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Advaita acknowledges that we live in a world of multiplicity while insisting on underlying unity. To resolve this tension, it establishes two levels of perspective: <strong className="text-foreground">Vyavaharika</strong> (Conventional Reality) and <strong className="text-foreground">Paramarthika</strong> (Absolute Reality).
                                </p>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start p-6 rounded-2xl border border-border/40 hover:bg-muted/20 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Conventional (The Map)</h4>
                                            <p className="text-muted-foreground">The realm of time, space, cause, and effect. Here, moral duties, rituals, and personal relationships are real and necessary for spiritual growth.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start p-6 rounded-2xl border border-border/40 hover:bg-muted/20 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Absolute (The Terrian)</h4>
                                            <p className="text-muted-foreground">The realization that only Brahman is ultimately real. From this height, all distinctions of 'me' and 'thee' dissolve into a singular field of being.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-8">
                            <div className="bg-card border border-border/60 rounded-3xl p-8 sticky top-28 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <BookOpen className="text-orange-500 w-6 h-6" />
                                    <h3 className="font-display font-bold text-xl uppercase tracking-tighter">Core Concepts</h3>
                                </div>
                                <ul className="space-y-6">
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Brahman</h4>
                                        <p className="text-sm text-muted-foreground">The infinite, changeless ground of all being.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Atman</h4>
                                        <p className="text-sm text-muted-foreground">The innermost witness-consciousness in every being.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Maya</h4>
                                        <p className="text-sm text-muted-foreground">The power of superimposition that makes the One appear as Many.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-bold text-orange-400 text-xs uppercase tracking-widest mb-1">Moksha</h4>
                                        <p className="text-sm text-muted-foreground">Liberation through the direct recognition of non-duality.</p>
                                    </li>
                                </ul>
                                <hr className="my-8 border-border/40" />
                                <div className="space-y-4">
                                    <p className="text-xs text-muted-foreground italic leading-relaxed uppercase tracking-wide">Ready to verify this in your own experience?</p>
                                    <TrackedLink
                                        href="/faith-finder"
                                        eventLabel="advaita_guide:sidebar:faith-finder"
                                        trackPathName="faith-finder"
                                        className="w-full inline-flex items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-white font-bold text-sm transition-all hover:bg-orange-700 shadow-md"
                                    >
                                        Take the Path Quiz <ArrowRight className="ml-2 w-4 h-4" />
                                    </TrackedLink>
                                </div>
                            </div>
                        </aside>
                    </div>

                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-bold mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq) => (
                                <div key={faq.question} className="rounded-2xl border border-border/40 bg-card/40 p-8 shadow-sm group hover:border-orange-500/20 transition-colors">
                                    <h3 className="text-xl font-bold mb-4 flex items-start gap-3">
                                        <span className="text-orange-500 font-serif italic flex-shrink-0">Q.</span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed pl-8 border-l border-border/40">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mb-20 rounded-3xl border border-border/60 bg-muted/5 p-10 text-center">
                        <h2 className="text-3xl font-display font-bold mb-6">Scientific & Philosophical Convergence</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
                            Modern physics, specifically in the realm of quantum field theory, increasingly mirrors the Vedantic view of a singular, underlying field from which all distinct particles arise. Similarly, neuroscience suggests that the "ego" is a modular construction of the brain rather than a permanent entity—a finding that directly supports the Advaitic distinction between the changing personality and the unchanging Witness.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {references.map((ref) => (
                                <a
                                    key={ref.href}
                                    href={ref.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 rounded-full bg-background border border-border/60 text-sm font-medium hover:border-orange-500/40 hover:text-orange-400 transition-all flex items-center gap-2"
                                >
                                    {ref.label} <ExternalLink className="w-3 h-3" />
                                </a>
                            ))}
                        </div>
                    </section>

                    <div className="rounded-3xl bg-orange-600 p-1 lg:p-12 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <BookOpen size={240} strokeWidth={1} />
                        </div>
                        <div className="relative z-10 bg-background/95 lg:bg-transparent p-8 lg:p-0 rounded-2xl flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h2 className="text-3xl lg:text-5xl font-display font-black mb-4 tracking-tight">The <span className="text-orange-600 lg:text-white">Final Departure</span> from Duality.</h2>
                            <p className="text-lg lg:text-xl text-muted-foreground lg:text-orange-50 max-w-2xl mb-10">
                                Advaita is not a set of beliefs to be adopted, but a reality to be recognized. Start your structured journey into non-duality today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <TrackedLink
                                    href="/what-is-vedanta"
                                    eventLabel="advaita_guide:footer:vedanta"
                                    trackPathName="what-is-vedanta"
                                    className="px-8 py-4 bg-orange-600 lg:bg-white lg:text-orange-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-center"
                                >
                                    Learn the Foundation
                                </TrackedLink>
                                <TrackedLink
                                    href="/adi-shankaracharya-life-teachings"
                                    eventLabel="advaita_guide:footer:shankara"
                                    trackPathName="adi-shankaracharya-life-teachings"
                                    className="px-8 py-4 bg-transparent border-2 border-orange-200/30 text-muted-foreground lg:text-white lg:border-white/30 font-bold rounded-xl hover:bg-white/10 transition-all text-center"
                                >
                                    The Story of Shankara
                                </TrackedLink>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
