import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "How Was the Kailasa Temple Built? The Ellora Cave 16 Mystery",
    description:
        "The Kailasa Temple at Ellora is the largest monolithic structure in the world — carved top-down from a single basalt cliff face. How ancient Indian engineers achieved this remains astonishing.",
    alternates: {
        canonical: "https://www.opensadhaka.com/kailasa-temple-ellora",
    },
    openGraph: {
        title: "Kailasa Temple Ellora: The Impossible Architecture",
        description:
            "400,000 tons of rock removed by hand. No scaffold, no ground-up construction. The Kailasa Temple defies explanation — and does not need aliens to do so.",
        url: "https://www.opensadhaka.com/kailasa-temple-ellora",
        type: "article",
    },
};

const faqs = [
    {
        question: "How was the Kailasa Temple actually built?",
        answer:
            "Kailasa was carved top-down — engineers first cut three deep trenches into the basalt cliff to isolate a single rock mass, then sculpted downward and inward. Unlike normal construction, nothing could be added, only removed. Every column, courtyard, and elephant was revealed from solid cliff. Approximately 400,000 tons of rock were removed using iron chisels and wedges.",
    },
    {
        question: "Did aliens build the Kailasa Temple?",
        answer:
            "No. The Rashtrakuta dynasty's records attribute Kailasa to King Krishna I in the 8th century CE. The rock-cut tradition at Ajanta predates it by centuries, and dozens of smaller Deccan shrines demonstrate the same technique at smaller scale. The alien hypothesis requires ignoring all this evidence while underestimating the administrative and technical capacity of one of medieval India's most powerful empires.",
    },
    {
        question: "What is the best time to visit Ellora Caves?",
        answer:
            "November through February, when Maharashtra's climate is cool and dry. Avoid April–June (temperatures regularly exceed 40°C). The caves are open all days except Tuesday. Hiring an ASI-certified guide is strongly recommended — most sculptures carry layered iconographic meaning that is invisible without context.",
    },
    {
        question: "How is Cave 16 different from the other Ellora Caves?",
        answer:
            "The Ellora complex has 34 caves representing Buddhist, Hindu, and Jain traditions. Cave 16 (Kailasa) is not a cave at all — it is a freestanding temple complex with courtyard, elephant sculptures, and multi-story shrines, all excavated from the cliff. No other ancient structure was built using this complete top-down monolithic method at this scale.",
    },
];

export default function KailasaTempleElloraPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="kailasa-temple-ellora" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Kailasa Temple Ellora", href: "/kailasa-temple-ellora" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The <span className="text-orange-500 italic">Impossible</span> Temple
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> The Kailasa Temple at Ellora (Cave 16) is the largest monolithic structure ever carved — excavated entirely top-down from a single basalt cliff face by the Rashtrakuta dynasty in the 8th century CE. Engineers removed an estimated 400,000 tons of rock using iron chisels, with no possibility of error or addition. The temple represents Mount Kailash on earth. The alien hypothesis, while popular online, ignores both the historical record and the extensive tradition of rock-cut architecture that preceded it.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            To build Kailasa, you could not make mistakes. Every chisel stroke was permanent.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">The Top-Down Method: Engineering Without Precedent</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Most construction works from the ground up. Kailasa worked from the top down. The Rashtrakuta engineers first cut three deep trenches into the basalt cliff face, isolating a single rectangular rock mass approximately 84 meters long, 47 meters wide, and 30 meters tall. Only then did the sculpting begin — working downward through the rock to reveal courtyards, shrines, galleries, columns, and life-sized stone elephants, all from what had been solid cliff face.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The design replicates Mount Kailash — Lord Shiva&apos;s Himalayan abode — in stone. The central Shikhara tower rises over 30 meters above the courtyard floor. Two free-standing victory columns flank the entrance. Panels depicting scenes from the Ramayana, Mahabharata, and Puranas cover nearly every surface. All of this was planned before a single chisel touched the rock face, because once work began, the architect could only reveal what was already there in his mind.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Construction likely spanned multiple generations — some estimates suggest 150 years of continuous work. Rashtrakuta inscriptions describe the architect exclaiming in wonder at his own creation upon completion. The empire&apos;s capacity to sustain such a project across generations represents as great a feat as the stone engineering itself. {/* EXPAND */}
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-6">Why the Alien Theory Undermines Ancient Indian Genius</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                The alien hypothesis for Kailasa follows a predictable pattern: take something impressive, strip out all historical context, and declare it beyond human capability. The problem is that Kailasa is not isolated. The Buddhist caves at Ajanta predate it by centuries. The Elephanta Caves near Mumbai demonstrate the same sculptural tradition. Dozens of smaller rock-cut shrines across the Deccan plateau show the technique evolving across centuries before it culminated at Ellora.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                The Rashtrakuta dynasty that commissioned Kailasa was one of the most powerful empires of the medieval world — administratively sophisticated, artistically advanced, and capable of sustaining multi-generational projects. Ancient Indians did not need extraterrestrial help. They had something arguably rarer: mastery, patience, and the theological motivation to make earth mirror heaven. The real story is more remarkable than the alien alternative, not less. {/* EXPAND */}
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
                    </div>

                    <div className="mt-20 bg-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">Explore India&apos;s Sacred Architecture.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            From Ellora&apos;s rock-cut temples to Tamil Nadu&apos;s tower temples — India&apos;s sacred architecture encodes theology in stone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/kailasa-vs-ajanta-caves"
                                eventLabel="kailasa_ellora:footer:ajanta"
                                trackPathName="kailasa-vs-ajanta-caves"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                Kailasa vs Ajanta Caves
                            </TrackedLink>
                            <TrackedLink
                                href="/south-india-temple-architecture"
                                eventLabel="kailasa_ellora:footer:south-india"
                                trackPathName="south-india-temple-architecture"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                South India Temple Architecture
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
