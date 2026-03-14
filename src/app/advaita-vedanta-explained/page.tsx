import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, Zap } from "lucide-react";
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
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Advaita Vedanta says your deepest Self is not separate from ultimate reality; practice is about removing false identification, not creating a new belief system.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Advaita Vedanta states that the boundary between "you" and "the world" is not ontological. It is a cognitive superimposition (adhyasa) corrected through inquiry.
                        </p>
                    </header>

                    <section className="mb-14 rounded-2xl border border-border/60 bg-card/40 p-8">
                        <h2 className="font-display text-3xl font-bold mb-6">Best for / Not best for / Where to start</h2>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><strong className="text-foreground">Best for:</strong> analytically inclined seekers who want rigorous inquiry into identity, consciousness, and suffering.</li>
                            <li><strong className="text-foreground">Not best for:</strong> people expecting instant emotional relief without disciplined reflection and contemplative practice.</li>
                            <li><strong className="text-foreground">Where to start:</strong> learn core terms (Atman, Brahman, Maya), read an accessible Vedanta primer, then apply daily self-inquiry in real situations.</li>
                        </ul>
                        <div className="mt-8 flex flex-wrap gap-4 text-sm">
                            <Link href="/western-philosophy-and-vedanta" className="text-orange-400 hover:text-orange-300 transition-colors">
                                Indian vs Western Philosophy
                            </Link>
                            <Link href="/vedanta-vs-stoicism" className="text-orange-400 hover:text-orange-300 transition-colors">
                                Vedanta vs Stoicism
                            </Link>
                            <Link href="/deities/shiva" className="text-orange-400 hover:text-orange-300 transition-colors">
                                Who is Shiva?
                            </Link>
                        </div>
                    </section>

                    <div className="grid lg:grid-cols-3 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h2 className="text-3xl font-display font-bold mb-6">The Non-Dual Equation</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                    Most readers think Advaita says, "the world is fake." The primary claim is different: Brahman alone is absolutely real, and the perceived separation between jiva (individual self) and Brahman is due to ignorance (avidya). The Mahavakya "Tat Tvam Asi" (Chandogya Upanishad 6.8.7) is read as identity, not resemblance.
                                </p>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Realization in Advaita is recognition, not acquisition. Shankara's commentaries describe moksha as knowledge that removes error, the way light removes confusion about a rope seen in dim conditions. Suffering persists when identity is fixed on body, role, and thought rather than witness-consciousness.
                                </p>
                            </section>

                            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                                <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
                                    <Zap className="text-orange-500 w-8 h-8" />
                                    The Rope-Snake Analogy
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Adi Shankara uses the rope-snake example to explain adhyasa (superimposition). In low light, a rope is misread as a snake; fear, pulse, and avoidance are experientially real, but the snake is not independently real. In the same way, ego-separateness appears compelling while the substrate remains Brahman.
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
                                    Advaita does not deny ordinary experience; it classifies it. Shankara distinguishes <strong className="text-foreground">vyavaharika</strong> (transactional reality) from <strong className="text-foreground">paramarthika</strong> (absolute reality) so ethical action and non-dual metaphysics can both be true at their own level.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-start p-6 rounded-2xl border border-border/40 hover:bg-muted/20 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold shrink-0">1</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Conventional (The Map)</h4>
                                            <p className="text-muted-foreground">The realm of time, causation, relation, and obligation. Dharma, ritual discipline, and moral responsibility operate fully at this level.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start p-6 rounded-2xl border border-border/40 hover:bg-muted/20 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold shrink-0">2</div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">Absolute (The Terrain)</h4>
                                            <p className="text-muted-foreground">The standpoint where Brahman alone is real and non-dual. Distinctions between knower, known, and knowing collapse in direct knowledge.</p>
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
                            Modern analogies from quantum theory and neuroscience can be suggestive, but they are not pramana (valid means of scriptural knowledge) in Vedanta. Use them as heuristic parallels only. Advaita's claims stand on Upanishadic revelation, reasoning, and contemplative verification.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {references.map((ref) => (
                                <div
                                    key={ref.href}
                                    className="px-6 py-3 rounded-full bg-background border border-border/60 text-sm font-medium text-muted-foreground"
                                >
                                    {ref.label}
                                </div>
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
                                Advaita is not a belief package. It is a method of removing error in self-identity through sravana, manana, and nididhyasana.
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
