import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPageTracker } from "@/components/ContentAnalytics";
import { Flame, Heart } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
    title: "Shaivism vs. Vaishnavism | The Two Great Paths Compared",
    description: "Comparing the two largest traditions of Sanatan Dharma: Shaivism (Shiva) and Vaishnavism (Vishnu). Explore their philosophies, practices, and goals.",
    alternates: { canonical: "https://www.opensadhaka.com/shaivism-vs-vaishnavism" },
};

export default function ShaivismVsVaishnavismPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="shaivism-vs-vaishnavism" pillar="traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-5xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Traditions", href: "/traditions" },
                            { label: "Shaivism vs Vaishnavism", href: "/shaivism-vs-vaishnavism" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
                            Two <span className="text-primary italic text-6xl md:text-7xl">Great</span> Streams.
                        </h1>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight border-l-4 border-primary/30 pl-8 py-2">
                            The path of Shiva and the path of Vishnu: two distinct cosmologies, two emotional modes, one ultimate destination.
                        </p>
                    </header>

                    <section className="mb-20">
                        <div className="bg-muted/30 border border-border/40 rounded-3xl p-10 md:p-16">
                            <h2 className="text-3xl font-display font-bold mb-10 text-center">Core Temperaments</h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="p-8 bg-background rounded-2xl border border-border/20 group hover:border-orange-500/50 transition-colors">
                                        <Flame className="text-orange-500 mb-4 w-10 h-10" />
                                        <h3 className="text-2xl font-bold mb-3">Shaivism (The Yogi)</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Centered on Shiva as the Supreme. The path of <strong>Asceticism</strong>, inner silence, and the dissolution of the ego into pure consciousness.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-8 bg-background rounded-2xl border border-border/20 group hover:border-blue-500/50 transition-colors">
                                        <Heart className="text-blue-500 mb-4 w-10 h-10" />
                                        <h3 className="text-2xl font-bold mb-3">Vaishnavism (The Bhakta)</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            Centered on Vishnu and his avatars (Krishna/Rama). The path of <strong>Devotion</strong>, relationship, and the preservation of cosmic order (Dharma).
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-bold mb-12">Comparison Matrix</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-border/40 rounded-3xl overflow-hidden">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="p-6 font-bold text-foreground">Feature</th>
                                        <th className="p-6 font-bold text-orange-500 italic">Shaivism</th>
                                        <th className="p-6 font-bold text-blue-500 italic">Vaishnavism</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">View of Reality</td>
                                        <td className="p-6 text-muted-foreground">Typically Non-Dual (Advaita)</td>
                                        <td className="p-6 text-muted-foreground">Typically Qualified or Dual (Dvaita)</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">Goal of Soul</td>
                                        <td className="p-6 text-muted-foreground">Identity with the Absolute</td>
                                        <td className="p-6 text-muted-foreground">Eternal Relationship with God</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">Primary Sadhana</td>
                                        <td className="p-6 text-muted-foreground">Meditation & Yoga</td>
                                        <td className="p-6 text-muted-foreground">Bhakti & Service</td>
                                    </tr>
                                    <tr>
                                        <td className="p-6 font-bold text-foreground">Symbolism</td>
                                        <td className="p-6 text-muted-foreground">The Linga (Unmanifest)</td>
                                        <td className="p-6 text-muted-foreground">The Murti (Manifest Avatars)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-20">
                        <h2 className="text-4xl font-display font-bold mb-12">Beyond Selection</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                            <p>
                                The debate between Shaivism and Vaishnavism is not a conflict of "right vs. wrong," but a choice of temperament. Historical synthesis, such as the <strong>Harihara</strong> form (half Shiva, half Vishnu), reminds us that these are two lenses looking at the same source.
                            </p>
                            <p>
                                The Smarta tradition, stabilized by Adi Shankaracharya, explicitly worships both—alongside Devi, Ganesha, and Surya—as manifestations of the one Brahman.
                            </p>
                        </div>
                    </section>

                    <section className="mt-20 pt-20 border-t border-border/40 max-w-3xl mx-auto">
                        <h2 className="text-4xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {[
                                {
                                    q: "Is Shiva or Vishnu higher?",
                                    a: "In their respective traditions, each is seen as the Supreme. In the synthesizing Smarta tradition and Advaita Vedanta, they are seen as equal manifestations of the one formless Brahman."
                                },
                                {
                                    q: "What is the difference in liberation?",
                                    a: "Shaivism often views liberation as 'Sayujya' (merging) or recognition of identity. Vaishnavism often views it as 'Salokya' (living in the same realm) or 'Samipya' (nearness) to the Divine, preserving the soul's ability to love God."
                                },
                                {
                                    q: "Can I practice both?",
                                    a: "Yes. Many Hindus worship both Shiva and Vishnu. The choice of a 'primary' deity (Ishta Devata) is simply a way to deepen focus, not to exclude other divine forms."
                                }
                            ].map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`} className="border-border/40 px-4">
                                    <AccordionTrigger className="text-lg font-bold hover:text-primary transition-colors text-left">{faq.q}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed text-base">{faq.a}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}