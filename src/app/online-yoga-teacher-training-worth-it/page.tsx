import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Is an Online Yoga Teacher Training (YTT) Actually Worth It?",
    description:
        "Online YTT is worth it for deepening personal practice, learning yoga history, and anatomy study on a budget. Not ideal for studio teaching physical adjustments. Honest breakdown of 200hr vs 500hr YTT.",
    alternates: {
        canonical: "https://www.opensadhaka.com/online-yoga-teacher-training-worth-it",
    },
    openGraph: {
        title: "Is Online Yoga Teacher Training Worth It?",
        description:
            "Personal practice vs teaching career: an honest breakdown. The 200hr vs 500hr difference. What makes a YTT legitimate. The oversaturated yoga teaching market explained.",
        url: "https://www.opensadhaka.com/online-yoga-teacher-training-worth-it",
        type: "article",
    },
};

const faqs = [
    {
        question: "Is a 200-hour YTT enough to teach yoga professionally?",
        answer:
            "A 200-hour Yoga Alliance-certified YTT is the minimum credential for most yoga studios. It covers foundational postures, anatomy, sequencing, and the philosophy of Patanjali&apos;s Yoga Sutras. However, teaching complex physical adjustments safely — especially inversions and backbends — requires hands-on practice that online training cannot fully provide. Many graduates of online 200hr programs begin teaching gentle or beginner classes before advancing to more physically demanding styles.",
    },
    {
        question: "What is Yoga Alliance and does it matter?",
        answer:
            "Yoga Alliance is a US-based registry organization (not a government certification body) that sets minimum standards for YTT programs (200hr and 500hr) and registers individual teachers. Most yoga studios require Yoga Alliance registration to hire teachers. The organization has faced criticism for low standards and commercial orientation, but its RYT (Registered Yoga Teacher) credential remains the de facto industry standard worldwide for studio employment.",
    },
    {
        question: "What is the difference between a 200hr and 500hr YTT?",
        answer:
            "A 200hr YTT covers foundations: postures, anatomy, basic philosophy, and beginning sequencing. A 500hr YTT builds on that foundation with advanced sequencing, therapeutic modifications (yoga for injuries, special populations), specialized pranayama, and deeper philosophical study. The 500hr is not one training — it typically consists of a 200hr foundation plus 300 additional hours of advanced training, often in a specific style or specialization.",
    },
];

export default function OnlineYogaTeacherTrainingWorthItPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="online-yoga-teacher-training-worth-it" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Study Indian Philosophy", href: "/how-to-study-indian-philosophy-home" },
                            { label: "Online YTT Worth It?", href: "/online-yoga-teacher-training-worth-it" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Do It for <span className="text-orange-500 italic">Practice</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> An online Yoga Teacher Training (YTT) is worth it if your goal is deepening your own practice, studying yoga history, anatomy, and philosophy on a budget, or preparing for in-person teaching later. It is not the right choice if you want to immediately teach complex physical adjustments in a studio — that requires hands-on training. A Yoga Alliance-certified online 200hr YTT typically costs $500–$1,500 versus $2,000–$5,000 for in-person. The credential is the same; the physical teaching experience is not.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Most people who do a YTT don&apos;t go on to teach. They practice differently forever afterward.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Brutal Truth About Teaching Yoga Professionally</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The yoga teaching market is saturated. In most Western cities, there are far more 200hr certified teachers than available studio positions, and studio teaching pays poorly — most yoga teachers in major US cities earn $30–$50 per class, requiring 20+ classes per week to reach a livable income. Building a private clientele takes years. The financial case for doing a YTT as a career investment is weak unless you have an existing student base, a specific niche, or an online teaching platform.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                This does not mean YTT is not worth doing. Most experienced yoga practitioners who complete a 200hr training report that it fundamentally transformed their personal practice — the anatomy knowledge alone changes how you experience every posture. The philosophy curriculum introduces Patanjali&apos;s Yoga Sutras and the Bhagavad Gita in an applied context. If that is your primary goal, the cost-benefit of an online 200hr is excellent. {/* EXPAND */}
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">What Makes an Online YTT Legitimate?</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The difference between a legitimate online YTT and a certificate mill is live instruction and individualized feedback. High-quality online YTTs combine pre-recorded content modules with live Zoom sessions where your alignment and teaching sequences are actually observed and corrected. Programs that offer only pre-recorded video with an automated quiz at the end are not providing teacher training — they are selling a certificate. Yoga Alliance requires a minimum contact hours but does not audit the quality of those hours.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Evaluating any YTT: check who the lead teachers are and study their teaching backgrounds. Prioritize programs from established schools with in-person programs (not digital-only companies). Look for explicit anatomy modules — a YTT without serious anatomy instruction is incomplete. Read actual graduate reviews, not testimonials on the school&apos;s own website. If a program promises you will be &quot;ready to teach anywhere&quot; entirely online, approach with skepticism. {/* EXPAND */}
                            </p>
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

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/how-to-study-indian-philosophy-home" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Study Indian Philosophy at Home <ArrowRight size={16} />
                            </Link>
                            <Link href="/how-to-learn-sanskrit" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                Learn Sanskrit for Yoga <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Go Deeper Than the Certificate.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The YTT is a doorway, not a destination. The real curriculum begins after the training ends.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/how-to-study-indian-philosophy-home"
                                eventLabel="ytt:footer:philosophy"
                                trackPathName="how-to-study-indian-philosophy-home"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Study Indian Philosophy
                            </TrackedLink>
                            <TrackedLink
                                href="/what-is-kriya-yoga"
                                eventLabel="ytt:footer:kriya"
                                trackPathName="what-is-kriya-yoga"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                What Is Kriya Yoga?
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
