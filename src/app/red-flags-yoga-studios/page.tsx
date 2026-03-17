import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "5 Red Flags in Modern Yoga Studios (And How to Protect Yourself)",
    description:
        "Not all yoga instruction is safe or authentic. Unguided pranayama, guru dynamics, and cult-like environments create real harm. Learn the red flags and which styles are genuinely therapeutic.",
    alternates: {
        canonical: "https://www.opensadhaka.com/red-flags-yoga-studios",
    },
    openGraph: {
        title: "Red Flags in Modern Yoga Studios",
        description:
            "As yoga globalizes, distinguishing safe, authentic instruction from harmful environments is vital. Here are the red flags — and the styles that actually help mental health.",
        url: "https://www.opensadhaka.com/red-flags-yoga-studios",
        type: "article",
    },
};

const faqs = [
    {
        question: "What are the dangers of unguided pranayama?",
        answer:
            "Pranayama alters the balance of oxygen and CO2 in the blood, directly affecting the nervous system. Specific dangers of unguided practice include: hyperventilation (hypocapnia) producing tetany (involuntary muscle contractions), psychological disorientation, intense anxiety, and in people with cardiovascular conditions, cardiac arrhythmia. Advanced techniques like extended Kumbhaka (breath retention) or Bhastrika (rapid bellows breath) require prerequisite training in basic pranayama and should not be taught to absolute beginners.",
    },
    {
        question: "Which types of yoga are best for mental health?",
        answer:
            "Research consistently supports slower, alignment-focused practices for mental health benefits. Iyengar yoga (precision alignment, use of props) reduces anxiety and depression with minimal injury risk. Yin yoga (long-held passive poses, fascia release) activates the parasympathetic nervous system. Restorative yoga (fully supported poses held for 5–20 minutes) is specifically therapeutic for burnout and nervous system dysregulation. Fast-paced styles (power yoga, hot yoga, competitive Vinyasa) can increase arousal in already-dysregulated nervous systems.",
    },
    {
        question: "What is the difference between a yoga teacher and a spiritual guru?",
        answer:
            "A yoga teacher imparts physical technique, alignment, and basic pranayama. They have professional liability and operate within the bounds of a structured curriculum. A spiritual guru operates in a different register entirely — claiming to transmit not just knowledge but transformative grace (Shaktipat). The problem in modern yoga studios is when fitness instructors occupy the guru role without the genuine transmission, authentic lineage, or the deep personal practice it requires — creating a power dynamic with no spiritual basis.",
    },
    {
        question: "Is hot yoga safe?",
        answer:
            "For most healthy adults without cardiovascular conditions, properly conducted hot yoga (Bikram or heated Vinyasa) is physically safe. The primary risks include dehydration, heat exhaustion, and overstretching of warmed ligaments. The deeper concern is that the heat-induced endorphin release can mask pain signals and create a false sense of competence, encouraging practitioners to push beyond healthy limits. It is not recommended for people with blood pressure issues, heart conditions, or chronic inflammation.",
    },
];

const redFlags = [
    {
        number: "01",
        flag: "The Guru of the Gym",
        description: "The teacher demands devotional-level loyalty — expects students to treat them as a spiritual master rather than a professional instructor. Signs include: speaking of their own enlightenment, creating an inner circle of favorite students, discouraging practitioners from studying with other teachers, and framing criticism of the teacher as evidence of the student&apos;s spiritual deficiency.",
        consequence: "Creates unhealthy dependency, discourages critical thinking, and creates the conditions for abuse of the power differential.",
    },
    {
        number: "02",
        flag: "Teaching Advanced Pranayama to Beginners",
        description: "Offering Kapalabhati, extended Kumbhaka, or Bhastrika to students without any prerequisite training in basic breathing, basic yoga, or body awareness. Some studios include intensive breathwork sequences in general or beginner classes.",
        consequence: "Real physiological risk: hyperventilation, nervous system dysregulation, severe anxiety, and in rare cases fainting or cardiac events in vulnerable practitioners.",
    },
    {
        number: "03",
        flag: "Pain as Spiritual Practice",
        description: "Instructions to &quot;push through&quot; pain as evidence of dedication or spiritual advancement. Framing physical discomfort as the ego resisting. Shaming students who modify poses or rest. The first ethical principle of yoga is Ahimsa — non-violence. Violence toward your own body is still violence.",
        consequence: "Yoga-related injuries are now a documented public health concern. Spinal injuries (especially cervical) are the most common and most preventable.",
    },
    {
        number: "04",
        flag: "Isolation from Outside Sources",
        description: "Active discouragement of reading other teachers, other traditions, or any perspective that doesn&apos;t come from the studio&apos;s approved material. Combined with an in-group/out-group dynamic where students outside the studio are subtly framed as less evolved or less safe.",
        consequence: "Classic cult-formation mechanism. Healthy spiritual environments encourage students to read widely, question respectfully, and maintain outside relationships.",
    },
    {
        number: "05",
        flag: "Financial Pressure Under Spiritual Framing",
        description: "Expensive teacher trainings presented as essential for spiritual development, not professional certification. Pressure to purchase multiple memberships, retreats, and specialty workshops. Framing financial commitment as &quot;investing in your practice&quot; or &quot;showing up for yourself.&quot;",
        consequence: "Financial exploitation wrapped in spiritual language. Genuine teachings are not made more powerful by their price. Many of the world&apos;s greatest spiritual masters taught freely.",
    },
];

const mentalHealthYogaStyles = [
    {
        style: "Iyengar Yoga",
        best: "Anxiety, depression, chronic pain",
        why: "Precision alignment with props reduces performance anxiety. Long holds build concentration and parasympathetic activation. Research-backed.",
    },
    {
        style: "Yin Yoga",
        best: "Stress, hyperarousal, emotional tension",
        why: "Long passive holds release fascial tension. Activates the rest-digest nervous system. Emotion surfacing in long holds is normal and therapeutic.",
    },
    {
        style: "Restorative Yoga",
        best: "Burnout, nervous system dysregulation, trauma (with modification)",
        why: "Fully supported poses held 5–20 minutes. No effort required. The body learns to rest without vigilance.",
    },
    {
        style: "Hatha (classical)",
        best: "General mental health, beginners",
        why: "Moderate pace, clear alignment focus, basic pranayama. Builds body awareness without competitive pressure.",
    },
];

export default function RedFlagsYogaStudiosPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="red-flags-yoga-studios" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Red Flags in Yoga Studios", href: "/red-flags-yoga-studios" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Ahimsa Begins at <span className="text-orange-500 italic">Home</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> As yoga industrializes globally, not all instruction is safe or authentic. Key red flags include teachers demanding guru-level devotion, unguided advanced pranayama in beginner classes, &quot;push through pain&quot; culture, isolation from outside perspectives, and financial pressure framed spiritually. The safest yoga styles for mental health are Iyengar, Yin, and Restorative — not competitive flow or hot yoga.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The first principle of yoga is Ahimsa — non-violence. Any instruction that asks you to violate Ahimsa toward yourself is not yoga.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-8">5 Red Flags to Watch For</h2>
                            <div className="space-y-6">
                                {redFlags.map((rf) => (
                                    <div key={rf.number} className="rounded-2xl border border-border/40 bg-card/30 p-8">
                                        <div className="flex items-start gap-6">
                                            <span className="text-4xl font-black text-orange-500/30 font-display leading-none">{rf.number}</span>
                                            <div>
                                                <h3 className="text-xl font-bold mb-3 text-foreground">{rf.flag}</h3>
                                                <p className="text-muted-foreground leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: rf.description }} />
                                                <p className="text-xs text-orange-400/70 italic border-l-2 border-orange-500/20 pl-3">
                                                    <strong>Why it matters:</strong> {rf.consequence}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Dangers of Unguided Pranayama</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Breathwork is not just breathing — it directly alters neurochemistry. The specific physiology:
                            </p>
                            <div className="space-y-5">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Hyperventilation and Hypocapnia</h3>
                                    <p className="text-muted-foreground leading-relaxed">Rapid breathing (Kapalabhati, Bhastrika) rapidly depletes CO2 in the blood. The paradox: CO2 is the primary signal that triggers breathing — it is also essential for oxygen delivery to tissues. Low CO2 causes vasoconstriction, reducing blood flow to the brain, and can produce: dizziness, visual changes, tingling, involuntary muscle contractions, and psychological dissociation.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Vagal Overstimulation</h3>
                                    <p className="text-muted-foreground leading-relaxed">Extended breath retention activates the vagus nerve powerfully. For most healthy practitioners, this produces relaxation. For those with cardiovascular conditions, dysautonomia, or vasovagal syncope tendency, it can produce dangerously slow heart rate or fainting. Advanced techniques are contraindicated for these populations regardless of yoga experience level.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Psychological Destabilization</h3>
                                    <p className="text-muted-foreground leading-relaxed">For practitioners with unprocessed trauma, PTSD, or anxiety disorders, certain pranayama techniques can trigger panic attacks, dissociation, or trauma flashbacks. This is not because the practice &quot;is working&quot; — it is a contraindication signal requiring modification or medical consultation before continuing.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-8">Best Types of Yoga for Mental Health</h2>
                            <div className="overflow-x-auto rounded-2xl border border-border/30">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Style</th>
                                            <th className="p-4 font-bold text-orange-400">Best For</th>
                                            <th className="p-4 font-bold text-muted-foreground">Why It Works</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                                        {mentalHealthYogaStyles.map((s) => (
                                            <tr key={s.style}>
                                                <td className="p-4 font-medium text-foreground">{s.style}</td>
                                                <td className="p-4 text-foreground">{s.best}</td>
                                                <td className="p-4">{s.why}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/how-to-spot-fake-spiritual-guru" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    How to Spot a Fake Guru <ArrowRight size={16} />
                                </Link>
                                <Link href="/meditation-for-burnout" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Meditation for Burnout <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Find What Actually Works.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The yoga tradition is vast and genuinely transformative — when practiced safely with qualified guidance. Start here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/how-to-start-meditating-daily"
                                eventLabel="yoga_red_flags:footer:meditate"
                                trackPathName="how-to-start-meditating-daily"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Start Meditating Safely
                            </TrackedLink>
                            <TrackedLink
                                href="/how-to-spot-fake-spiritual-guru"
                                eventLabel="yoga_red_flags:footer:guru"
                                trackPathName="how-to-spot-fake-spiritual-guru"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Guru Discernment Guide
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
