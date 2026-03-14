import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "The Spiritual Meaning of a Midlife Crisis (And How to Actually Fix It)",
    description:
        "A midlife crisis is not a psychological defect — it is a natural spiritual transition. The Vedic system's four life stages (Ashramas) map exactly why it happens and what to do instead.",
    alternates: {
        canonical: "https://opensadhaka.com/midlife-crisis-spiritual-meaning",
    },
    openGraph: {
        title: "The Spiritual Meaning of a Midlife Crisis",
        description:
            "The Vedic Ashrama system understood midlife crisis 3000 years ago. Here's the map — and the way through.",
        url: "https://opensadhaka.com/midlife-crisis-spiritual-meaning",
        type: "article",
    },
};

const faqs = [
    {
        question: "Why does a midlife crisis happen spiritually?",
        answer:
            "In Vedic philosophy, midlife is the natural transition from the Grihastha (Householder) stage — focused on accumulation, family, and career — to the Vanaprastha (Forest Dweller/Retiree) stage, focused on legacy, detachment, and deeper purpose. The 'crisis' occurs when you feel the pull of this transition but society tells you to ignore it and double down on consumption instead. The dissonance between your soul's actual stage and your social role is what creates the suffering.",
    },
    {
        question: "What are the four Vedic stages of life (Ashramas)?",
        answer:
            "The four Ashramas are: Brahmacharya (Student, ages 0–25) — learning, discipline, and the development of character; Grihastha (Householder, ages 25–50) — family, career, and fulfilling legitimate desires; Vanaprastha (Forest Dweller, ages 50–75) — gradual withdrawal from attachment to roles and possessions, focus on legacy and teaching; Sannyasa (Renunciate, age 75+) — complete renunciation of outcomes, dwelling in pure awareness. Most midlife crises occur at the Grihastha-to-Vanaprastha transition.",
    },
    {
        question: "Is a midlife crisis the same as a spiritual awakening?",
        answer:
            "They overlap significantly. Both involve the collapse of a previous identity structure. The difference is direction: a midlife crisis that is responded to with materialism (sports car, affair, status anxiety) goes sideways. A midlife crisis responded to with honest inquiry — asking 'what actually matters?' — can become a genuine awakening. The Vedic framework treats this transition as an invitation, not a problem.",
    },
    {
        question: "How does Vedanta deal with the fear of aging?",
        answer:
            "Vedanta's core insight is that you are not your body. The Atman — the witnessing consciousness behind all experience — does not age, wrinkle, slow down, or die. The body is a temporary vehicle. Aging is the loosening grip of the ego on its material identity, which, from the Vedantic view, is actually a gift: as the body's grip weakens, the formless awareness that was always there becomes easier to recognize.",
    },
];

const ashramas = [
    {
        name: "Brahmacharya",
        meaning: "Studentship",
        ages: "0–25",
        focus: "Learning, self-discipline, and the formation of character. Sexual energy is directed toward mental development. The primary task is becoming ready for the world.",
        shadow: "When skipped: adults with no self-discipline, no direction, living perpetually in adolescence.",
    },
    {
        name: "Grihastha",
        meaning: "Householder",
        ages: "25–50",
        focus: "Family, career, legitimate wealth-building, and fulfilling one's place in society. This is the stage the Vedas celebrate most — worldly engagement done with integrity.",
        shadow: "When clung to past its time: the 55-year-old still measuring his worth by promotions and car brands.",
    },
    {
        name: "Vanaprastha",
        meaning: "Forest Dweller",
        ages: "50–75",
        focus: "Gradual withdrawal from attachment to roles and possessions. Mentoring. Teaching. Asking: what do I want to leave behind? The transition from accumulation to distribution.",
        shadow: "When denied: the midlife crisis. Clinging to Grihastha identity when Vanaprastha is calling.",
    },
    {
        name: "Sannyasa",
        meaning: "Renunciate",
        ages: "75+",
        focus: "Complete detachment from outcomes. Living in pure awareness without any role to protect. Preparation for the final transition. Death met without fear.",
        shadow: "When feared: the terror of becoming irrelevant, the desperate clinging to identity that makes aging so painful.",
    },
];

export default function MidlifeCrisisSpiritualMeaningPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="midlife-crisis-spiritual-meaning" pillar="ancient-wisdom" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Spiritual Meaning of Midlife Crisis", href: "/midlife-crisis-spiritual-meaning" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Soul's <span className="text-orange-500 italic">Invitation</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> A midlife crisis is often a stage-transition problem, not a defect. Vedic thought frames it as movement from Grihastha (householder) to Vanaprastha (withdrawal and mentoring). Distress rises when inner priorities change but life remains organized around status, accumulation, and comparison.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The midlife crisis is the soul correctly signaling that the first half of life's operating system was never meant to run the second half.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Why the Western Response to Midlife Doesn't Work</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The standard Western cultural response to midlife crisis involves one of three moves: purchase something expensive (sports car, second home, renovated kitchen), pursue something forbidden (affair, extreme adventure, sudden career change), or suppress everything and hope the feeling passes.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                None of these address the actual source of the distress. You are not unhappy because you have the wrong car. You are unhappy because your entire value system — built around achievement, accumulation, and social approval — has reached its natural limit. The ladder you have been climbing is leaning against the wrong wall.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The Vedic tradition diagnosed this problem with remarkable precision. The four Ashramas are not a neat sociological taxonomy — they are a genuine map of how consciousness naturally evolves through a lifetime. Ignoring the map does not change the territory.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">The Four Ashramas: The Vedic Life Map</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                The Ashrama system divides a human lifetime into four roughly equal stages, each with its own appropriate focus, values, and way of being:
                            </p>
                            <div className="space-y-6">
                                {ashramas.map((a, i) => (
                                    <div key={a.name} className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                        <div className="flex items-baseline gap-4 mb-3">
                                            <span className="text-orange-400 font-black text-2xl">{i + 1}</span>
                                            <div>
                                                <span className="font-bold text-xl text-foreground">{a.name}</span>
                                                <span className="text-muted-foreground text-sm ml-3">({a.meaning}, {a.ages})</span>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed mb-3">{a.focus}</p>
                                        <p className="text-xs text-orange-400/70 italic border-l-2 border-orange-500/20 pl-3">{a.shadow}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Grihastha Trap</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The Grihastha stage (Householder) is the engine of civilization. It is the stage of building careers, raising families, creating communities, and accumulating the resources needed for a dignified life. The Vedas explicitly celebrate this stage — unlike certain ascetic traditions that view worldly engagement as inherently problematic, Sanatan Dharma affirms that legitimate prosperity (Artha) and wholesome pleasure (Kama) are genuine goals of human life.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The problem arises when Grihastha values are extended indefinitely beyond their natural expiration. When a 55-year-old continues to measure their worth entirely by career status, social comparison, and consumption, they are applying a 35-year-old's operating system to a life that has genuinely moved beyond those needs. The soul knows. The crisis is the signal.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Vanaprastha — literally "going to the forest" — does not mean literally abandoning your family and moving into the woods. Metaphorically, it means beginning the internal work of detachment: less accumulation, more distribution. Less identity from roles, more identity from awareness. Less investment in what the world thinks, more investment in what is true.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">How to Work Through the Transition</h2>
                            <div className="space-y-5">
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">1. Name What Stage You're In</h3>
                                    <p className="text-muted-foreground leading-relaxed">Honestly assess: are you still genuinely in Grihastha, or are you clinging to it because Vanaprastha feels like loss? The transition to the next stage is not a failure of the previous one — it is its natural completion.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">2. Begin the Audit of Identity</h3>
                                    <p className="text-muted-foreground leading-relaxed">List everything you are identified with: job title, social status, physical appearance, relationship roles, achievements. Then ask: if I lost each of these, what would remain? That remainder — the aware, witnessing presence — is the Atman. This is Vanaprastha work.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">3. Shift from Accumulation to Distribution</h3>
                                    <p className="text-muted-foreground leading-relaxed">What can you give away — knowledge, mentorship, resources, attention? The Vanaprastha orientation moves from "what can I get?" to "what can I contribute?" This shift is not sacrifice; it is the natural maturation of desire.</p>
                                </div>
                                <div className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                    <h3 className="font-bold text-lg mb-3 text-orange-400">4. Begin a Contemplative Practice</h3>
                                    <p className="text-muted-foreground leading-relaxed">Vanaprastha is traditionally accompanied by increased time for spiritual practice — meditation, study of texts, time in nature. Even 20 minutes daily of genuine contemplation begins building the internal resources that carry you through the second half of life.</p>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/fear-of-death-advaita-vedanta" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Overcoming the Fear of Death <ArrowRight size={16} />
                                </Link>
                                <Link href="/dark-night-of-the-soul" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Dark Night of the Soul <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Second Half Can Be Better.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            The Vedic tradition offers a complete map for navigating the second half of life with depth rather than desperation. Start with understanding the fear of death — or find your spiritual path.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/fear-of-death-advaita-vedanta"
                                eventLabel="midlife:footer:fear-death"
                                trackPathName="fear-of-death-advaita-vedanta"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Overcoming the Fear of Death
                            </TrackedLink>
                            <TrackedLink
                                href="/faith-finder"
                                eventLabel="midlife:footer:faith-finder"
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
