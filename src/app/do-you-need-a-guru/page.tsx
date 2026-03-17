import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Do You Need a Guru for Enlightenment? The Ancient vs Modern View",
    description:
        "Traditional Indian philosophy says a guru is ultimately necessary — like a mirror is necessary to see your face. But the guru doesn't have to be a living person. A clear, balanced guide.",
    alternates: {
        canonical: "https://www.opensadhaka.com/do-you-need-a-guru",
    },
    openGraph: {
        title: "Do You Need a Guru for Enlightenment?",
        description:
            "The tradition says yes — but the guru doesn't have to be a living human. A balanced, honest look at the guru question for modern seekers.",
        url: "https://www.opensadhaka.com/do-you-need-a-guru",
        type: "article",
    },
};

const faqs = [
    {
        question: "What does the tradition say about needing a guru?",
        answer:
            "The classical tradition is unambiguous: a guru is considered necessary for final liberation (Moksha). The Mundaka Upanishad (1.2.12) specifically states: 'One who wishes to know the highest truth should approach a Guru, who is learned in the scriptures and established in Brahman.' The reasoning: the mind cannot diagnose its own blind spots. Just as the eye cannot see itself without a mirror, the ego cannot fully recognize its own illusions without someone already free of them.",
    },
    {
        question: "What is the difference between a guru and a teacher?",
        answer:
            "A teacher (Acharya) imparts knowledge — they illuminate a subject, transmit technique, and guide skill development. A Guru operates at a deeper level: they transmit the recognition of the practitioner's own true nature, not through information but through direct energetic influence (Shaktipat) and the unspoken transmission of realized awareness. The difference is the difference between being told that fire is hot and being burned. Both are valid; they serve different functions on the path.",
    },
    {
        question: "Can books serve as a guru?",
        answer:
            "Yes — and the tradition explicitly recognizes this. The concept of the Grantha-guru (text as teacher) acknowledges that the Upanishads, the Bhagavad Gita, and other primary texts carry genuine transformative power. Ramana Maharshi became self-realized through reading the Periya Puranam (a Tamil Shaiva text). However, even Ramana subsequently drew students to himself — because the direct transmission between persons eventually becomes important for the final stages of refinement.",
    },
    {
        question: "How do I know when I've found my guru?",
        answer:
            "The tradition describes it in a way that doesn't resolve the uncertainty for everyone: when you encounter your true guru, there is a recognition — not romantic excitement, but a quality of profound relief, as if something you were searching for has been found. More practically: you notice that the teacher's presence reduces the noise in your mind rather than increasing it; that spending time with them produces actual clarity, not dependency; and that their life demonstrably matches their teachings in circumstances where there is no performance benefit.",
    },
];

export default function DoYouNeedAGuruPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="do-you-need-a-guru" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How to Spot a Fake Guru", href: "/how-to-spot-fake-spiritual-guru" },
                            { label: "Do You Need a Guru?", href: "/do-you-need-a-guru" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Mirror You <span className="text-orange-500 italic">Cannot</span> Hold Yourself
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Traditional Indian philosophy says a guru is ultimately necessary for enlightenment — because the mind cannot fully diagnose its own blind spots, just as an eye cannot see itself without a mirror. However, the guru does not have to be a living human in a physical body. It can be the inner witness (Antaryamin), a sacred text (Grantha-guru), or the accumulated lineage of realized masters. For modern seekers, the safest path is to rely on primary texts and internal practice until a genuine living teacher appears naturally.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            A teacher shines light on a subject. A guru burns down the house the subject was living in.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">What the Tradition Actually Says</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The classical texts are consistent: a guru is considered essential for the final stages of liberation. The Mundaka Upanishad, the Katha Upanishad, and Shankaracharya&apos;s Vivekachudamani all state this explicitly. The reasoning given is not dogma — it is a practical epistemological argument:
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The obstacle to enlightenment is not lack of information but a fundamental misidentification: the ego&apos;s belief that it is the self, rather than a construct that appears in the self. This misidentification cannot be removed by the ego — because the ego is both the problem and the instrument of investigation. It&apos;s like asking a fever to diagnose itself.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                A genuine guru — someone already free of this misidentification — can recognize it in the student and point directly to what remains when the identification is seen through. This is the function that cannot be replaced by information, willpower, or solitary practice alone.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Forms the Guru Can Take</h2>
                            <div className="space-y-5">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Living Human Guru (Sadguru)</h3>
                                    <p className="text-muted-foreground leading-relaxed">The ideal and most potent form. A living teacher who is established in the direct experience of Brahman, rooted in authentic lineage, and whose life completely matches their teachings. Rare — and more likely to be found in obscurity than in celebrity. The best living teachers often resist visibility rather than cultivating it.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Text as Guru (Grantha-guru)</h3>
                                    <p className="text-muted-foreground leading-relaxed">The primary texts of the tradition — particularly the Upanishads, Bhagavad Gita, and Yoga Sutras — carry genuine transformative power when read with sincere intent and applied in practice. Many realized masters credit a specific text with catalyzing their awakening. Ramana Maharshi, Nisargadatta Maharaj, and Anandamayi Ma all attributed turning points to textual encounters.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Inner Witness (Antaryamin)</h3>
                                    <p className="text-muted-foreground leading-relaxed">The tradition also recognizes the guru within — the Atman itself as the ultimate teacher. The outer guru&apos;s function is to point to this inner witness, not to replace it. Ramana Maharshi&apos;s consistent teaching was that the real guru is the Atman — the outer teacher merely directs your attention to what is already present and complete.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Life as Guru (Upa-guru)</h3>
                                    <p className="text-muted-foreground leading-relaxed">The tradition recognizes that the universe itself is continuously teaching — through loss, through love, through the failures of external pursuits to produce lasting peace. A practitioner with clear intention and genuine inquiry will receive teaching from every encounter, every difficulty, and every moment of beauty. This does not replace the guru but works alongside all other forms.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Risk of DIY Spirituality</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The modern spiritual market celebrates autonomous self-direction — the idea that you can assemble your own path from books, podcasts, apps, and weekend retreats without any lineage or accountability structure. This has real benefits (accessibility, protection from bad gurus) and real costs:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-3">The Problem of Spiritual Bypassing</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">Without accountability, the ego can direct the &quot;spiritual path&quot; toward comfortable experiences and away from the genuine challenge of seeing through itself. A genuine teacher creates the specific friction — the pointing at the exact blind spot — that solo practice easily avoids.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-3">The Benefit of Accountability</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">A genuine teacher observes your practice over time, recognizes your specific patterns, and provides corrections that general teachings cannot. They see what you cannot see about yourself — precisely the function the tradition says is irreplaceable.</p>
                                </div>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The practical recommendation for modern seekers: maintain the autonomy and skepticism of the independent seeker while remaining genuinely open to authentic teaching relationships when they appear. Primary texts as foundation; living teacher sought but not forced.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/how-to-spot-fake-spiritual-guru" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How to Spot a Fake Guru <ArrowRight size={16} />
                                </Link>
                                <Link href="/ramana-maharshi-who-am-i" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Ramana&apos;s Self-Inquiry Technique <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Inner Guru is Always Present.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The deepest teaching: the guru you seek is not separate from the awareness that is already here. Ramana&apos;s self-inquiry is the most direct path to finding it.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/ramana-maharshi-who-am-i"
                                eventLabel="need_guru:footer:ramana"
                                trackPathName="ramana-maharshi-who-am-i"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                The &quot;Who Am I?&quot; Technique
                            </TrackedLink>
                            <TrackedLink
                                href="/advaita-vedanta-explained"
                                eventLabel="need_guru:footer:advaita"
                                trackPathName="advaita-vedanta-explained"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Advaita Vedanta Explained
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
