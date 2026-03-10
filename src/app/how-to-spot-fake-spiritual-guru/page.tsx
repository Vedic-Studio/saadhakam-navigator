import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "How to Spot a Fake Spiritual Guru: The Discernment Matrix",
    description:
        "A true guru removes ignorance. A fake guru collects followers. Learn the 6 red flags of false spiritual teachers, why scandals keep happening in yoga lineages, and how to find an authentic teacher.",
    alternates: {
        canonical: "https://opensadhaka.com/how-to-spot-fake-spiritual-guru",
    },
    openGraph: {
        title: "How to Spot a Fake Spiritual Guru",
        description:
            "Gu = darkness. Ru = remover. A genuine guru removes ignorance. Here are the 6 signs you're looking at its opposite.",
        url: "https://opensadhaka.com/how-to-spot-fake-spiritual-guru",
        type: "article",
    },
};

const faqs = [
    {
        question: "What makes someone a true guru in the Indian tradition?",
        answer:
            "In the classical definition, Guru = Gu (darkness) + Ru (remover). A true guru removes the fundamental ignorance (avidya) that causes suffering — not just teaching concepts, but producing a transformative shift in the student's actual experience of reality. Traditional qualifications include: Shrotriya (mastery of the scriptural tradition), Brahmanishtha (established in the direct experience of Brahman), and a life that completely matches their teachings in private. Most importantly: a genuine guru is not trying to collect followers. They are trying to make themselves unnecessary.",
    },
    {
        question: "Why do so many spiritual teachers get caught in scandal?",
        answer:
            "The most consistent pattern across guru scandals: a teacher with genuine spiritual gifts (real meditation experience, real teaching ability) who has not adequately worked through their own psychological material — particularly around power, sexuality, and money. Students in a surrendered devotional relationship create enormous power differentials. When the teacher has unresolved ego needs for adulation, control, or pleasure, that differential becomes exploitative. The solution the tradition prescribes is precisely what modern spiritual marketing ignores: years of solitary practice and purification before entering the teaching role.",
    },
    {
        question: "Is it okay to study with a teacher who isn't fully enlightened?",
        answer:
            "Yes — and practically speaking, this is almost all of us. The question is not whether your teacher has achieved final liberation but whether they are: honest about their level, not claiming more than they have realized, teaching from genuine practice rather than intellectual study alone, observing appropriate ethical boundaries, and growing themselves. A teacher who is 10 years ahead of you on the path and honest about their limitations is more valuable than someone claiming realization they haven't earned.",
    },
    {
        question: "Can I find a guru online or through social media?",
        answer:
            "The initial discovery can happen online — many genuine teachers now have online presence. But the guru-disciple relationship itself traditionally requires proximity and direct, energetic transmission that cannot be fully transmitted through a screen. A teacher who is only available online and never meets students in person, or who charges substantial fees for online 'initiation,' should be approached with significant caution. Genuine transmission (Shaktipat) has traditionally required the physical presence of both parties.",
    },
];

const redFlags = [
    {
        flag: "Financial Exploitation",
        detail: "Charging substantial fees for 'initiation,' making expensive programs prerequisites for basic teachings, or creating financial dependency. Note the distinction: it is legitimate to pay for a teacher's time and livelihood. Exploitation begins when the teaching is withheld behind an escalating price wall, or when the student&apos;s financial commitment is framed as a spiritual test.",
    },
    {
        flag: "Sexual Boundary Violation",
        detail: "Using the guru-disciple power dynamic for sexual access. This includes: 'tantric' teachings that require sexual contact with the teacher, framing sexual relationship as a form of initiation, and creating an environment where sexual involvement with the teacher is normalized or expected among inner-circle students.",
    },
    {
        flag: "Isolation from Outside Sources",
        detail: "Actively discouraging study of other teachers, other traditions, or outside perspectives. Creating an in-group identity where students outside the organization are subtly framed as less evolved, misguided, or spiritually dangerous. Healthy spiritual environments actively encourage students to read widely and question respectfully.",
    },
    {
        flag: "Grandiosity and Claimed Special Status",
        detail: "Claims of unique divine mission, unprecedented spiritual gifts, or direct appointment by a deity or cosmic force. While some genuine teachers do have unusual realizations, the combination of grandiosity + charisma + willingness to exploit is the consistent signature of the most harmful frauds in spiritual history.",
    },
    {
        flag: "Absolute Obedience Required",
        detail: "Framing any questioning of the teacher as evidence of the student&apos;s spiritual deficiency, ego attachment, or lack of readiness. Legitimate teachers welcome respectful questioning. The instruction to surrender to the guru is specifically about surrendering the ego&apos;s resistance to truth — not surrendering critical judgment to protect the teacher&apos;s comfort.",
    },
    {
        flag: "Missing or Fabricated Lineage",
        detail: "Claims of lineage that cannot be verified, or claims of 'self-realization' without any apparent engagement with the tradition&apos;s texts and methods. While genuine self-taught realization is theoretically possible, its rarity in spiritual history makes unverifiable lineage claims a significant warning sign. A genuine teacher can identify their teachers and their teachers' teachers.",
    },
];

export default function HowToSpotFakeSpiritualGuruPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="how-to-spot-fake-spiritual-guru" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "How to Spot a Fake Guru", href: "/how-to-spot-fake-spiritual-guru" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The <span className="text-orange-500 italic">Discernment</span> Matrix
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> A true guru (Gu = darkness, Ru = remover) removes ignorance — not collect followers. Red flags include financial exploitation, sexual boundary violations, isolation from outside sources, grandiosity, demand for absolute unquestioning obedience, and unverifiable lineage. To find a genuine teacher: look for transparency, verifiable lineage (Parampara), emphasis on your spiritual autonomy, and a private life that matches their public teachings completely.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            A genuine guru is trying to make themselves unnecessary. A false guru is trying to make themselves indispensable.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Teacher vs True Guru: A Real Distinction</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The word &quot;guru&quot; is widely used in the West as a synonym for expert or mentor. In the classical Indian understanding, the roles are categorically different:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-muted-foreground mb-3">A Teacher (Acharya / Shikshak)</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Imparts knowledge, technique, and understanding</li>
                                        <li>• Shines light on a subject</li>
                                        <li>• Professional relationship with ethical boundaries</li>
                                        <li>• Can have many students simultaneously</li>
                                        <li>• Teaches from study + personal practice</li>
                                        <li>• Relationship can end when the subject is learned</li>
                                    </ul>
                                </div>
                                <div className="bg-orange-500/5 rounded-2xl p-6 border border-orange-500/20">
                                    <h3 className="font-bold text-orange-400 mb-3">A True Guru (Sadguru)</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>• Transmits transformative grace (Shaktipat) directly</li>
                                        <li>• Burns down the ego-house through direct relationship</li>
                                        <li>• Operates beyond professional norms — rooted in dharma</li>
                                        <li>• Each relationship is singular and irreplaceable</li>
                                        <li>• Teaches from direct Brahman-experience</li>
                                        <li>• Relationship continues until the student is free</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Most modern yoga teachers and meditation instructors are Acharyas — and this is genuinely valuable. The problem occurs when a fitness instructor or meditation coach occupies the Sadguru role without the genuine transmission it requires, creating a power dynamic with no authentic spiritual basis.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">6 Red Flags in Spiritual Teachers</h2>
                            <div className="space-y-5">
                                {redFlags.map((rf, i) => (
                                    <div key={rf.flag} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                        <div className="flex items-start gap-4 mb-2">
                                            <span className="text-orange-500 font-black text-lg leading-none mt-0.5">{i + 1}.</span>
                                            <h3 className="font-bold text-foreground">{rf.flag}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground leading-relaxed pl-6" dangerouslySetInnerHTML={{ __html: rf.detail }} />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Why Scandals Keep Happening</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The pattern across decades of guru scandals — Rajneesh, Bikram Choudhury, Swami Satchidananda, Kripalu&apos;s Amrit Desai, Sivananda lineage scandals — is remarkably consistent:
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                A teacher with genuine gifts — real meditation experience, real ability to transmit peace, real teaching ability — who has not undergone adequate purification of their own psychological material, particularly around power and sexuality, meets students in a state of profound surrendered openness.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The traditional safeguards — decades of solitary practice before entering the teaching role, accountability to other senior teachers, transparent lifestyle, regular review by peers — are systematically absent in modern spiritual organizations because they slow the profitable scaling of the brand.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The student&apos;s vulnerability is not stupidity — it is the natural opening produced by genuine spiritual practice. The teacher&apos;s failure is not inevitable — it is the predictable result of assuming that meditation ability means ego purification. The two are related but not identical.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Find a Real Teacher</h2>
                            <div className="space-y-4 mb-8">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">1. Start with Texts, Not Personalities</h3>
                                    <p className="text-muted-foreground leading-relaxed">The Upanishads, Bhagavad Gita, Yoga Sutras, and other primary texts can serve as your initial teacher — what the tradition calls the Upa-guru (secondary teacher from all of life). Reading deeply from primary sources protects you from intellectual dependency on any individual teacher&apos;s interpretation before you have the discernment to evaluate it.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">2. Look for Lineage Transparency</h3>
                                    <p className="text-muted-foreground leading-relaxed">A genuine teacher can clearly identify their own teachers, their teachers&apos; teachers, and the tradition they work within. Ask directly: Who were your teachers? What text-based tradition do you work within? What is your daily practice? A teacher who deflects these questions with vague spiritual language is a red flag.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">3. Watch the Private Life</h3>
                                    <p className="text-muted-foreground leading-relaxed">The tradition&apos;s clearest standard: does the teacher&apos;s private conduct match their public teaching? This is not about perfection — teachers are human and make mistakes. It is about the basic integrity between what they teach and how they live when no one is watching. Former students and long-term community members are the most reliable source of this information.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-orange-400 mb-2">4. Notice Whether They Encourage Your Autonomy</h3>
                                    <p className="text-muted-foreground leading-relaxed">A genuine teacher is trying to produce independently functioning practitioners — not lifelong dependents. They should actively encourage you to question, to study widely, and to develop your own direct experience rather than substituting the teacher&apos;s authority for your own inner knowing. The goal is your liberation, not the teacher&apos;s following.</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/do-you-need-a-guru" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Do You Need a Guru? <ArrowRight size={16} />
                                </Link>
                                <Link href="/red-flags-yoga-studios" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Red Flags in Yoga Studios <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Discernment is a Practice.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The same inner clarity that helps you recognize genuine teachers is cultivated through daily practice. Start with the question every tradition points to.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/ramana-maharshi-who-am-i"
                                eventLabel="fake_guru:footer:ramana"
                                trackPathName="ramana-maharshi-who-am-i"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Ramana&apos;s &quot;Who Am I?&quot; Technique
                            </TrackedLink>
                            <TrackedLink
                                href="/do-you-need-a-guru"
                                eventLabel="fake_guru:footer:guru-needed"
                                trackPathName="do-you-need-a-guru"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Do You Need a Guru?
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
