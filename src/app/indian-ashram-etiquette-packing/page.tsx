import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Indian Ashram Etiquette, Packing List, and Temple Rules",
    description:
        "Visiting an Indian ashram or Hindu temple requires knowing the unspoken rules: dress modestly, remove shoes, accept prasad with the right hand, observe silence. The complete practical guide.",
    alternates: {
        canonical: "https://opensadhaka.com/indian-ashram-etiquette-packing",
    },
    openGraph: {
        title: "Indian Ashram Etiquette and Packing Guide",
        description:
            "Don't arrive unprepared. The dress code, temple etiquette, pranam protocol, and complete packing list for an Indian ashram stay.",
        url: "https://opensadhaka.com/indian-ashram-etiquette-packing",
        type: "article",
    },
};

const faqs = [
    {
        question: "What should I wear at an Indian ashram?",
        answer:
            "Loose, modest cotton clothing — full coverage of shoulders and knees is the minimum standard. For women: salwar kameez (traditional Indian tunic and trousers), modest maxi skirts, or loose linen trousers with long tops. Avoid tight synthetic athletic gear (yoga leggings, compression tops) which is considered immodest in traditional ashram environments despite being standard in Western yoga studios. Men: kurta pajama sets or loose cotton trousers with a shirt. White or light colors are generally appropriate; avoid black, which carries specific cultural associations.",
    },
    {
        question: "What is prasad and how should I accept it?",
        answer:
            "Prasad is food that has been offered to a deity and then distributed to devotees — it is considered blessed and carries spiritual significance. Always accept prasad with the right hand (or both hands, never the left alone). The left hand is considered impure in Indian cultural tradition, associated with bathroom functions. To refuse prasad is considered rude unless you have a genuine allergy or restriction — in which case a respectful namaste gesture accompanied by 'no thank you' is acceptable. Prasad is typically sweets, fruit, or small amounts of food.",
    },
    {
        question: "What is pranam and when should I do it?",
        answer:
            "Pranam is a Sanskrit word meaning 'to bow completely' — it is the act of bowing or prostrating in front of a teacher, deity, or elder as a gesture of reverence and humility. In an ashram context, students typically perform a respectful pranam to the teacher at the beginning and end of teachings. The full prostration (sashtanga pranam) — lying face-down — is reserved for the most revered teachers; a simple namaste bow or kneeling pranam is appropriate for most occasions. You are not required to prostrate; genuine respect expressed in your own way is always acceptable.",
    },
    {
        question: "What should I NOT bring to an Indian ashram?",
        answer:
            "Most traditional ashrams prohibit or strongly discourage: meat, fish, and eggs (most ashrams are strictly vegetarian); alcohol and tobacco; revealing or tight clothing; loud music; strong perfumes (some teacher-led environments are fragrance-free for energetic reasons); and unnecessary technology. While smartphones are generally permitted in common areas, they are often restricted or frowned upon in meditation halls, during teachings, and in certain sacred spaces. When in doubt, observe what those around you are doing and follow their lead.",
    },
];

const packingList = [
    {
        category: "Clothing",
        items: [
            "3–4 sets of loose cotton salwar kameez or kurta pajama",
            "Light cotton shawl or dupatta (for temple visits and cool evenings)",
            "Slip-on sandals or chappals (flip-flops — for easy removal at temples)",
            "Modest swimwear if swimming is available (not bikinis/speedos)",
            "Lightweight rain jacket (if monsoon season)",
        ],
    },
    {
        category: "Health Essentials",
        items: [
            "Probiotics (start 3–4 weeks before travel)",
            "Oral rehydration salts (ORS packets)",
            "Anti-diarrheal medication (for transit emergencies)",
            "Water purification tablets or portable filter",
            "Insect repellent (DEET or natural alternatives)",
            "Sunscreen (SPF 50+)",
            "Any prescription medications in original packaging with prescriptions",
        ],
    },
    {
        category: "Practice Items",
        items: [
            "Meditation cushion or zafu (some ashrams provide these)",
            "Lightweight yoga mat (ashrams often have communal mats but bringing your own is appreciated)",
            "Small journal and pen (for notes during teachings)",
            "Study texts (your chosen translation of the Bhagavad Gita, Upanishads, etc.)",
            "Headlamp or small torch (useful for early morning practice in dark grounds)",
        ],
    },
    {
        category: "Practical Logistics",
        items: [
            "Passport and visa copies (keep originals secure)",
            "Small amount of rupee cash (ashram gift shops and local markets are cash-based)",
            "Padlock (for shared accommodation lockers)",
            "Ear plugs (ashrams begin early; you may want protection from 4am bells)",
            "Small daypack for excursions",
        ],
    },
];

const templeRules = [
    { rule: "Remove shoes", detail: "Always remove footwear before entering a temple. Leave shoes at the entrance or in designated shoe storage areas. This is non-negotiable." },
    { rule: "Right hand for offerings and prasad", detail: "When accepting prasad, making offerings, or passing anything to a priest, always use the right hand. The left hand alone is considered inauspicious." },
    { rule: "Dress modestly", detail: "Shoulders and knees covered at minimum. Many temples provide wraps at the entrance for visitors who arrive in shorts or sleeveless tops." },
    { rule: "Silence or quiet voice during rituals", detail: "During aarti (fire ritual), puja, or any active ceremony, observe quiet. Talking loudly, taking flash photography, or moving around disruptively is disrespectful." },
    { rule: "Do not turn your back to the deity", detail: "When backing away from a deity or leaving a shrine room, either bow and turn at the doorway or walk sideways — do not simply turn your back and walk away." },
    { rule: "Do not point feet at a deity or teacher", detail: "In Indian tradition, the feet are considered the least sacred part of the body; pointing them at something sacred is considered disrespectful. Sit cross-legged or with feet tucked under when facing a shrine." },
    { rule: "No leather in some temples", detail: "Some temples (particularly Jain temples and certain Hindu temples) prohibit leather goods entirely — including belts, shoes, and bags. Check the specific temple&apos;s rules before visiting." },
];

export default function IndianAshramEtiquettePackingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="indian-ashram-etiquette-packing" pillar="practical-practices" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Spiritual Travel India Guide", href: "/spiritual-travel-india-guide" },
                            { label: "Ashram Etiquette & Packing", href: "/indian-ashram-etiquette-packing" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Unspoken <span className="text-orange-500 italic">Rules</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Ashrams and temples in India expect: modestly covered shoulders and knees (loose cotton, not yoga leggings), shoes removed before entering sacred spaces, prasad (blessed food) accepted with the right hand only, respectful silence during rituals, and feet never pointed toward deities or teachers. Pack cotton clothing, probiotics, a meditation cushion, and slip-on sandals.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            The way you dress and move in a sacred space is itself a practice. Your body&apos;s behavior signals your intention more clearly than your words.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Temple Etiquette Rules</h2>
                            <div className="space-y-4">
                                {templeRules.map((r) => (
                                    <div key={r.rule} className="bg-background/60 rounded-2xl p-5 border border-border/30 flex gap-4">
                                        <span className="text-orange-500 font-black text-lg leading-none mt-0.5">•</span>
                                        <div>
                                            <p className="font-bold text-foreground mb-1">{r.rule}</p>
                                            <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: r.detail }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Clothing: What to Wear (And Not Wear)</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                This is the most common area where Western visitors unknowingly create friction. The context: Indian ashrams are not Western yoga studios. What is standard in a Lululemon boutique (tight synthetic leggings, sports bras, form-fitting tops) is considered immodest in a traditional Indian spiritual environment and can signal disrespect regardless of your intention.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The solution is inexpensive and locally available: loose cotton salwar kameez (traditional tunic and trousers) can be purchased in any Indian city for 300–800 rupees ($4–10 USD). They are cool, practical, culturally appropriate, and quickly become the preferred clothing for most long-term India travelers anyway.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                For yoga asana practice in an ashram, loose-fitting yoga trousers and a modest top are appropriate. For meditation, aarti, or temple visits, standard Indian salwar kameez or kurta is ideal. A cotton shawl is useful in multiple contexts: warmth in air-conditioned spaces, modesty when needed, and as a sitting cloth for outdoor meditation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-8">The Complete Packing List</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {packingList.map((cat) => (
                                    <div key={cat.category} className="rounded-2xl border border-border/40 bg-card/30 p-6">
                                        <h3 className="font-bold text-orange-400 mb-3">{cat.category}</h3>
                                        <ul className="space-y-2">
                                            {cat.items.map((item) => (
                                                <li key={item} className="text-sm text-muted-foreground flex gap-2">
                                                    <span className="text-orange-500/60 mt-0.5">✓</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Understanding Seva (Service)</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Most traditional ashrams incorporate seva — voluntary service — as a core element of the daily schedule. Cooking, cleaning, gardening, maintenance, and administration are all forms of seva. In the ashram framework, seva is understood as karma yoga in practice: the purification of the ego through non-attached action in service of the community.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Approach seva without resistance or entitlement. You are not a hotel guest performing unpaid labor — you are a practitioner engaged in one of the most direct forms of spiritual practice available. The specific task (washing dishes, sweeping, chopping vegetables) is irrelevant. The quality of presence you bring to it is the practice.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/spiritual-travel-india-guide" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Full India Travel Guide <ArrowRight size={16} />
                                </Link>
                                <Link href="/rishikesh-vs-dharamshala" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    Rishikesh vs Dharamshala <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Prepared Is Respectful.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Arriving prepared is itself an act of respect — to the tradition, the community, and your own practice. Choose your destination.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/rishikesh-vs-dharamshala"
                                eventLabel="etiquette:footer:rishikesh"
                                trackPathName="rishikesh-vs-dharamshala"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Rishikesh or Dharamshala?
                            </TrackedLink>
                            <TrackedLink
                                href="/sacred-sites-india"
                                eventLabel="etiquette:footer:sacred-sites"
                                trackPathName="sacred-sites-india"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Sacred Sites in India
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
