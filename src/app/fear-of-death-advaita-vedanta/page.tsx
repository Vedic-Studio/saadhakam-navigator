import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Overcoming the Fear of Death Through Advaita Vedanta",
    description:
        "The fear of death in Eastern philosophy stems from a case of mistaken identity. Advaita Vedanta teaches that you are not the body. What is not born cannot die.",
    alternates: {
        canonical: "https://www.opensadhaka.com/fear-of-death-advaita-vedanta",
    },
    openGraph: {
        title: "Overcoming Fear of Death: The Advaita Vedanta Perspective",
        description:
            "You are not the body that dies. You are the consciousness that witnesses the body. A clear, practical guide to Advaita's answer to mortality.",
        url: "https://www.opensadhaka.com/fear-of-death-advaita-vedanta",
        type: "article",
    },
};

const faqs = [
    {
        question: "Does Advaita Vedanta believe in an afterlife?",
        answer:
            "Not in the conventional religious sense. Advaita does not primarily focus on what happens after death to a personal soul, because its deeper claim is that the personal soul (as a separate entity) was never real to begin with. What persists is not an individual 'you' going to a heaven or being reborn. It is the infinite consciousness (Brahman) that was always the only reality, now unobscured by the illusion of separateness. The fear of death is the fear of a wave worrying about crashing into the ocean.",
    },
    {
        question: "What is the Vedic view of what happens when you die?",
        answer:
            "The broader Vedic tradition (beyond strictly Advaita) holds that the subtle body (Sukshma Sharira), carrying the impressions of karma and the tendencies of mind, persists after the physical body dissolves and takes rebirth according to accumulated karma. Liberation (Moksha) means the dissolution of the subtle body's sense of separateness, ending the cycle. Advaita's more radical view is that this cycle was always a superimposition. Liberation is recognition, not a future event.",
    },
    {
        question: "How does Eastern philosophy deal with grief differently from Western approaches?",
        answer:
            "Western grief models focus primarily on the psychological process of 'accepting loss,' moving through stages toward a resolution where life goes on without the deceased. Eastern philosophy, particularly Vedanta, honors the grief as genuine while simultaneously offering a philosophical framework: the person you loved is not permanently gone. They have returned to the infinite source from which all forms arise. The grief is valid; the 'permanent loss' is the additional suffering added by the illusion of complete separation.",
    },
    {
        question: "Can philosophical understanding actually help with the fear of death?",
        answer:
            "Yes, but only if it becomes a living practice rather than an intellectual exercise. Reading about non-duality helps intellectually. The practice that actually reduces the fear of death is daily meditation, a kind of 'dying' to the ego-sense every day in a controlled, voluntary way. Each meditation session is a micro-rehearsal: you release the grip of the day's identity and rest in pure awareness. Over time, this makes the larger release (physical death) far less terrifying.",
    },
];

export default function FearOfDeathAdvaitaPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="fear-of-death-advaita-vedanta" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Overcoming Fear of Death", href: "/fear-of-death-advaita-vedanta" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            What Happens When the <span className="text-orange-500 italic">Wave</span> Breaks
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Advaita locates fear of death in mistaken identity: taking body and ego to be the self. What is born and dies is the body-mind complex. The witnessing awareness (Atman) is not produced at birth and is not destroyed at death.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            A wave crashing into the ocean does not destroy the water. It simply returns to what it always was.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Root of All Fear</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Taittiriya Upanishad contains one of the most radical statements in human thought: <em>"From fear of Brahman, the wind blows. From fear of Brahman, the sun rises. From fear of Brahman, fire burns."</em> Fear, at its deepest level, is the structural energy of a finite thing in the presence of the infinite.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The fear of death as most of us experience it is a different and more limited thing: it is the ego's terror of its own non-existence. The ego is a construction, a bundle of memories, habits, preferences, and social roles that forms a coherent sense of "me." This construction knows, at some level, that it is temporary. That knowledge is the source of an ambient anxiety that colors much of human experience.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Advaita's answer is to investigate whether the ego was ever what you actually are.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Ocean and the Wave</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Vedanta's most powerful teaching tool for the fear of death is the ocean-wave analogy. Consider:
                            </p>
                            <ul className="space-y-5 mb-8">
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black text-2xl leading-none mt-0.5">◆</span>
                                    <p className="text-muted-foreground leading-relaxed">A wave arises from the ocean, takes a particular shape, travels, and crashes back. From the wave's perspective, if it had one, crashing back into the ocean would feel like death, the end of that particular form and identity.</p>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black text-2xl leading-none mt-0.5">◆</span>
                                    <p className="text-muted-foreground leading-relaxed">From the ocean's perspective, nothing died. The water that was the wave is still water. It simply returned to the undifferentiated mass from which it arose.</p>
                                </li>
                                <li className="flex gap-4">
                                    <span className="text-orange-500 font-black text-2xl leading-none mt-0.5">◆</span>
                                    <p className="text-muted-foreground leading-relaxed">Advaita says: you have been identifying with the wave (the individual ego-body-mind). You are actually the ocean (Brahman, infinite consciousness). The wave was a temporary expression of the ocean, not a separate entity. Shankaracharya develops this point at length in the <em>Vivekachudamani</em>.</p>
                                </li>
                            </ul>
                            <p className="text-base text-muted-foreground leading-relaxed italic border-l-4 border-orange-500/30 pl-6">
                                The pot and the space: when a clay pot is made, the space inside it seems separate from the space outside. When the pot breaks, the "inner space" and "outer space" merge, but no space was destroyed. Only the pot (the boundary, the ego) dissolved. This is the Ghata-Akasha analogy from the Chandogya Upanishad. You are the space, not the pot.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Bhagavad Gita on Death and the Soul</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The second chapter of the Bhagavad Gita is the most sustained philosophical treatment of death in world literature. Krishna's opening salvo to Arjuna, who is paralyzed with grief at the prospect of his teachers and relatives dying in battle, is ontology:
                            </p>
                            <blockquote className="border-l-4 border-orange-500 pl-8 py-4 my-8 bg-muted/20 rounded-r-2xl">
                                <p className="text-xl text-foreground italic leading-relaxed mb-2">
                                    "The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain."
                                </p>
                                <cite className="text-muted-foreground text-sm">— Bhagavad Gita 2.20</cite>
                            </blockquote>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Shankaracharya's commentary on Bhagavad Gita 2.20 establishes that the eternality argument here applies to the Atman as pure awareness, not to the empirical self. Krishna then offers the clothes analogy (2.22): just as a person discards worn-out garments and takes new ones, the soul discards worn-out bodies and takes new ones. Death is a change of clothes. Katha Upanishad 1.2.18-19 reinforces this through Nachiketa's direct dialogue with Yama, where the god of death himself confirms what survives the body's dissolution.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                This is not offered as a comfort to avoid grief. Krishna explicitly tells Arjuna that grief over what is inevitable is a sign of confusion (avidya), not sensitivity. The goal is to see more clearly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Grief and the Illusion of Separation</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Vedanta does not invalidate grief. Grief is a valid, human response to the loss of a beloved form, the specific face, voice, presence, and relationship that existed in the world. The loss of that form is real. The pain is real.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                What Vedanta questions is the additional layer of suffering: the belief that the person is <em>permanently and completely gone</em>, that the consciousness that was them has been utterly annihilated and can never be known again. This belief, that death equals total, permanent non-existence, is the philosophical claim that creates the particular anguish of bereavement. As Shankaracharya argues in his bhashya on Bhagavad Gita 2.20, the one who grieves and the one grieved for share the same underlying Atman.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The Vedantic counter is the claim that consciousness itself, the aware, experiencing presence that was your loved one, cannot be created or destroyed. It arose from Brahman. It returns to Brahman. Brahman is what you are. The separation is the illusion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Practices to Prepare for Death</h2>
                            <div className="space-y-5">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Daily Meditation as Micro-Death</h3>
                                    <p className="text-muted-foreground leading-relaxed">Each deep meditation session is a voluntary rehearsal: you release the grip of the day's identity, rest in pure awareness, and return. Over years of practice, this makes the larger release, physical death, familiar rather than terrifying.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Marana Smarana — Contemplating Death Daily</h3>
                                    <p className="text-muted-foreground leading-relaxed">Stoic memento mori and Vedic Marana Smarana share the same logic: briefly contemplate your mortality each day. With the clarity it brings, everything that feels urgent and permanent in the current moment reveals itself as temporary. What remains non-negotiable after that contemplation is what matters.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Self-Inquiry: Who Is Afraid?</h3>
                                    <p className="text-muted-foreground leading-relaxed">When the fear of death arises, ask: who exactly is afraid? Trace the fear back to its source. What is the "I" that fears non-existence? You will find a bundle of thoughts and sensations, but under that bundle, a silent, unwavering witness that is observing the fear but is not itself afraid. That witness is the Atman.</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/midlife-crisis-spiritual-meaning" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Spiritual Meaning of Midlife Crisis <ArrowRight size={16} />
                                </Link>
                                <Link href="/advaita-vedanta-explained" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Advaita Vedanta Explained <ArrowRight size={16} />
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
                            <li><a href="https://plato.stanford.edu/entries/shankara/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">Adi Shankara — Stanford Encyclopedia of Philosophy</a></li>
                            <li><a href="https://www.britannica.com/topic/Bhagavadgita" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">Bhagavad Gita — Encyclopaedia Britannica</a></li>
                            <li><a href="https://www.britannica.com/topic/Upanishad" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">The Upanishads — Encyclopaedia Britannica</a></li>
                            <li><a href="https://iep.utm.edu/advaita-v/" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline transition-colors">Advaita Vedanta — Internet Encyclopedia of Philosophy</a></li>
                        </ul>
                    </section>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Explore Non-Duality.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The fear of death dissolves when you understand what you actually are. Advaita Vedanta is the most direct path to that understanding.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/advaita-vedanta-explained"
                                eventLabel="fear_death:footer:advaita"
                                trackPathName="advaita-vedanta-explained"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Advaita Vedanta Explained
                            </TrackedLink>
                            <TrackedLink
                                href="/what-is-maya"
                                eventLabel="fear_death:footer:maya"
                                trackPathName="what-is-maya"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                What is Maya?
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
