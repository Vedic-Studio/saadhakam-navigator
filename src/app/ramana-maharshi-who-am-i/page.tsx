import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Ramana Maharshi's 'Who Am I?' Technique: A Guide to Self-Inquiry",
    description:
        "Ramana Maharshi's Atma Vichara (Self-Inquiry) is the most direct path to recognizing the Atman. Learn the exact practice, common mistakes, and how Eckhart Tolle's 'Power of Now' maps to Advaita Vedanta.",
    alternates: {
        canonical: "https://www.opensadhaka.com/ramana-maharshi-who-am-i",
    },
    openGraph: {
        title: "Ramana Maharshi's 'Who Am I?' Technique",
        description:
            "Not an intellectual question — a direction to look. Atma Vichara is the most direct path in the Advaita tradition. A step-by-step guide.",
        url: "https://www.opensadhaka.com/ramana-maharshi-who-am-i",
        type: "article",
    },
};

const faqs = [
    {
        question: "Who was Ramana Maharshi?",
        answer:
            "Sri Ramana Maharshi (1879–1950) was a Tamil sage who experienced spontaneous self-realization at age 16, triggered by a sudden fear of death. He spent the rest of his life at Arunachala mountain in Tiruvannamalai, South India, rarely traveling and almost never formally initiating students — yet drawing seekers from across the world through the power of his silent presence. His primary teaching was Atma Vichara (Self-Inquiry), and his primary text was 'Who Am I?' (Nan Yar?) — a short work of thirty questions and answers about the nature of the self.",
    },
    {
        question: "Is 'Who Am I?' an intellectual question to answer?",
        answer:
            "Emphatically not — and this is the most important thing to understand about the practice. 'Who am I?' is not a question to be answered with concepts ('I am consciousness,' 'I am Brahman'). These answers are from the mind and reinforce the very thinking that obscures the Atman. The question is a direction of attention — pointing inward toward the source of the 'I' sense itself. The practice is not thinking about the answer but looking for who is asking.",
    },
    {
        question: "What is the connection between Ramana Maharshi and Eckhart Tolle?",
        answer:
            "Eckhart Tolle's 'The Power of Now' and 'A New Earth' draw heavily from the Advaita Vedanta framework that Ramana Maharshi represents, though Tolle rarely names this connection explicitly. Key concepts in Tolle's work — the 'witnessing presence,' the distinction between the thinking mind and the underlying awareness, the 'pain body,' and 'presence as the gateway' — are direct translations of Advaita concepts into contemporary psychological language. Tolle's emphasis on resting in the 'I Am' before it becomes 'I am this or that' is precisely Ramana's core pointing.",
    },
    {
        question: "How long should I practice Atma Vichara each day?",
        answer:
            "Ramana's own guidance was that Atma Vichara should ultimately become continuous — a background current of self-attention that persists throughout all activities, not just during formal meditation. For beginners, starting with 20–30 minutes of dedicated practice daily is sufficient. The quality of attention matters more than duration. A practitioner who genuinely inquires for 10 minutes will benefit more than one who intellectually rehearses the concepts for an hour.",
    },
];

const steps = [
    {
        step: "1",
        title: "Notice a thought or emotion",
        detail: "A thought arises: 'I am anxious.' An emotion surfaces: 'I am angry.' A desire appears: 'I want this.' You don't need to manufacture anything — the practice works with whatever is naturally present.",
    },
    {
        step: "2",
        title: "Ask: 'To whom does this occur?'",
        detail: "Rather than following the content of the thought or trying to suppress it, turn the attention to its apparent owner. 'This thought occurs to me. To whom does it occur?' The answer is: 'To me.' This is not a conclusion — it is the beginning of the inquiry.",
    },
    {
        step: "3",
        title: "Ask: 'Who am I?'",
        detail: "Now look for this 'I' that the thought appeared to. Not with thoughts, but with attention itself. What is this 'I'? Is it a body? A mind? A collection of memories? Look directly — don't answer with concepts. Ramana's instruction: trace the 'I-thought' back to its source.",
    },
    {
        step: "4",
        title: "Rest at the source",
        detail: "When you trace the 'I-thought' far enough inward, it dissolves — not into nothing, but into a prior awareness that was always there. This awareness is not blank: it is clear, still, and present. Rest here. This is the Atman — not a conclusion but a direct recognition.",
    },
    {
        step: "5",
        title: "When the mind re-engages, begin again",
        detail: "Another thought will arise. When it does, return immediately to the question: 'To whom does this thought occur?' Each return is not a failure — it is the practice. Ramana compared the repeated return to repeatedly fanning a fire; each inquiry fans the recognition of awareness.",
    },
];

export default function RamanaMaharshiWhoAmIPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="ramana-maharshi-who-am-i" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How to Spot a Fake Guru", href: "/how-to-spot-fake-spiritual-guru" },
                            { label: "Ramana Maharshi: Who Am I?", href: "/ramana-maharshi-who-am-i" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Question That <span className="text-orange-500 italic">Dissolves</span> the Questioner
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Ramana Maharshi&apos;s Atma Vichara (Self-Inquiry) is a meditation practice in which the practitioner traces the sense of &quot;I&quot; back to its source. It is not an intellectual question to be answered — it is a direction of attention. When a thought arises, ask: &quot;To whom does this occur?&quot; Then: &quot;Who am I?&quot; Following the &quot;I-thought&quot; inward until it dissolves reveals the silent, prior awareness that was always here.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            You are not looking for a new experience. You are looking at the one who has always been looking.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Who Was Sri Ramana Maharshi?</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                In 1896, a 16-year-old boy named Venkataraman Iyer sat alone in a room in Madurai, Tamil Nadu, and felt a sudden, overwhelming certainty that he was about to die. Rather than panic, he lay down, made himself rigid, held his breath, and — with remarkable equanimity — investigated the experience directly: &quot;If the body dies, who dies? Who am I?&quot;
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                What followed was a spontaneous recognition that consciousness — the witnessing presence behind the body and mind — was not the body that appeared to be dying. The &quot;death&quot; of the ego occurred; the awareness remained, unaffected. The boy was awakened in a matter of hours, without a guru, without years of preparation, through the sheer force of sincere direct investigation.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                He became Sri Ramana Maharshi, made his way to the sacred hill Arunachala (which he described as his true guru), and remained there until his death in 1950. His primary gift to the world was the simplest and most direct teaching in the Advaita tradition: Atma Vichara — Self-Inquiry.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">How to Practice: Step by Step</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Ramana was clear: this is not a new practice you add to your life. It is a continuous, background inquiry that gradually becomes the primary orientation of your attention:
                            </p>
                            <div className="space-y-5">
                                {steps.map((s) => (
                                    <div key={s.step} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                        <div className="flex items-start gap-4">
                                            <span className="text-orange-500 font-black text-2xl leading-none mt-0.5">{s.step}</span>
                                            <div>
                                                <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Common Mistakes in Atma Vichara</h2>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Trying to Answer the Question with a Concept</h3>
                                    <p className="text-muted-foreground leading-relaxed">The most common error: upon asking &quot;Who am I?&quot;, the mind immediately supplies an answer — &quot;I am pure consciousness,&quot; &quot;I am Brahman,&quot; &quot;I am the witness.&quot; These answers are thoughts. Following them is not self-inquiry; it is thinking about self-inquiry. The practice requires moving attention away from content toward the source of the sense of &quot;I&quot; itself.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Expecting a Dramatic Experience</h3>
                                    <p className="text-muted-foreground leading-relaxed">Many practitioners expect the recognition to arrive as a dramatic experience — a blinding light, an explosion of bliss, or a cosmic realization. For some, first recognition comes quietly — simply as a momentary clear seeing that the &quot;I-thought&quot; has no independent existence. The initial glimpses are often subtle. The error is dismissing them as &quot;not the real thing&quot; because they weren&apos;t dramatic.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">Practicing Only During Formal Meditation</h3>
                                    <p className="text-muted-foreground leading-relaxed">Ramana was emphatic: the inquiry should extend into all activities. While washing dishes, commuting, or in conversation — the question &quot;To whom does this appear?&quot; can run as a background thread. The deepening comes through continuous application, not through perfecting a 30-minute sitting practice alone.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Eckhart Tolle Connection</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Eckhart Tolle&apos;s &quot;The Power of Now&quot; (1997) introduced millions of Western readers to a set of ideas that are, at their philosophical core, direct translations of Advaita Vedanta — specifically in the lineage of Ramana Maharshi and Nisargadatta Maharaj.
                            </p>
                            <div className="overflow-x-auto rounded-2xl border border-border/30 mb-8">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Tolle&apos;s Language</th>
                                            <th className="p-4 font-bold text-orange-400">Advaita / Ramana&apos;s Language</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                                        <tr>
                                            <td className="p-4">The witnessing presence</td>
                                            <td className="p-4 text-foreground">The Atman / Sakshi (witness)</td>
                                        </tr>
                                        <tr className="bg-muted/10">
                                            <td className="p-4">The thinking mind vs underlying awareness</td>
                                            <td className="p-4 text-foreground">The mind (Manas) vs Chit (pure consciousness)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">The pain body</td>
                                            <td className="p-4 text-foreground">Samskaras (accumulated impressions)</td>
                                        </tr>
                                        <tr className="bg-muted/10">
                                            <td className="p-4">Resting in &apos;I Am&apos; before thought</td>
                                            <td className="p-4 text-foreground">Tracing the &apos;I-thought&apos; to its source</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">The Now as the only reality</td>
                                            <td className="p-4 text-foreground">Turiya — the fourth state, beyond past/future</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                For Tolle readers who have found his work helpful: reading Ramana Maharshi&apos;s &quot;Be As You Are&quot; (compiled by David Godman), or the primary text &quot;Nan Yar? (Who Am I?)&quot;, provides access to the original source material in its undiluted form.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/advaita-vedanta-explained" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Advaita Vedanta Explained <ArrowRight size={16} />
                                </Link>
                                <Link href="/do-you-need-a-guru" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Do You Need a Guru? <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Direct Path.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Ramana&apos;s self-inquiry is the most direct route in the Advaita tradition. No ritual, no lineage required — only sincere attention turned inward.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/advaita-vedanta-explained"
                                eventLabel="ramana:footer:advaita"
                                trackPathName="advaita-vedanta-explained"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Advaita Vedanta Explained
                            </TrackedLink>
                            <TrackedLink
                                href="/how-to-start-meditating-daily"
                                eventLabel="ramana:footer:meditate"
                                trackPathName="how-to-start-meditating-daily"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Start Your Practice
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
