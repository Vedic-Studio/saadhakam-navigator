import { Header } from "@/components/Header";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import { Sparkles, ArrowRight, Flame, Eye } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Vedanta vs Tantra: Escape vs Transformation | Sadhaka",
    description: "Understand the two major frameworks of Indian spiritual practice. Is the world an illusion to be transcended (Vedanta) or a power to be harnessed (Tantra)?",
    keywords: ["vedanta vs tantra", "advaita", "tantra", "shakti", "brahman", "spiritual path"],
    alternates: {
        canonical: "https://www.opensadhaka.com/vedanta-vs-tantra"
    }
};

export default function VedantaVsTantraPage() {
    const schemas = {
        article: buildArticleSchema({
            headline: "Vedanta vs Tantra: Escape vs Transformation",
            description: "Understand the two major frameworks of Indian spiritual practice. Is the world an illusion to be transcended (Vedanta) or a power to be harnessed (Tantra)?",
            url: "https://www.opensadhaka.com/vedanta-vs-tantra",
            datePublished: "2026-03-20",
            section: "Ancient Wisdom",
        }),
        breadcrumb: buildBreadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Ancient Wisdom", href: "/ancient-wisdom-philosophies" },
            { label: "Vedanta vs Tantra: Escape vs Transformation", href: "/vedanta-vs-tantra" },
        ]),
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }} />
            <Header />
            <main className="pt-24 pb-20">
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                        <Flame className="w-96 h-96 text-primary" />
                    </div>
                    <div className="max-w-4xl mx-auto relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-8">
                            Philosophical Deep-Dive
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                            Vedanta <span className="text-muted-foreground font-light text-4xl md:text-5xl border-x px-4 mx-2">vs</span> Tantra
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
                            Do we transcend the world by looking away, or by diving in? One sees the world
                            as a veil (Maya); the other sees it as a mother (Shakti).
                        </p>
                    </div>
                </section>

                <section className="px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-invert prose-orange max-w-none space-y-12">
                            <div className="bg-muted/30 p-8 rounded-3xl border border-border/50">
                                <p className="text-lg leading-relaxed italic">
                                    "Vedanta and Tantra are the two lungs of the Indian spiritual body. One inhales the Absolute;
                                    the other exhales the world as Divine Play. To understand them is to understand the
                                    fundamental choice every seeker makes: Escape or Transformation?"
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 mt-16">
                                <div className="space-y-6">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <Eye className="w-6 h-6 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold">Vedanta: The Path of Inquiry</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Classical Vedanta (especially Advaita) operates on the logic of <strong>Nivritti</strong> — withdrawal.
                                        The world is <em>Maya</em>, a superimposition on the truth. Like waking from a dream,
                                        the goal is to recognize the dreamer and realize the dream was never ultimately real.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex gap-2"><span>•</span> Method: Neti-Neti (Not this, not that)</li>
                                        <li className="flex gap-2"><span>•</span> View: World is apparent/unreal</li>
                                        <li className="flex gap-2"><span>•</span> Goal: Pure Awareness (Brahman)</li>
                                    </ul>
                                </div>

                                <div className="space-y-6">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                                        <Flame className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h2 className="text-3xl font-display font-bold">Tantra: The Path of Alchemy</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Tantra operates on the logic of <strong>Pravritti</strong> — engagement. The world is
                                        not an illusion to be discarded, but <em>Shakti</em> (Divine Power) to be harnessed.
                                        Every desire, every emotion, and every sensation is a doorway to the Absolute.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex gap-2"><span>•</span> Method: Transformation of energy</li>
                                        <li className="flex gap-2"><span>•</span> View: World is Divine expression</li>
                                        <li className="flex gap-2"><span>•</span> Goal: Union of Shiva & Shakti</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="my-20">
                                <h2 className="text-4xl font-display font-bold text-center mb-12">Comparative Framework</h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                        <h3 className="font-bold text-primary mb-2">Attitude to the Body</h3>
                                        <p className="text-sm text-muted-foreground"><strong>Vedanta:</strong> An instrument to be transcended; eventually a burden. <br /><strong>Tantra:</strong> A temple; the microcosm of the universe.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                        <h3 className="font-bold text-primary mb-2">Role of Desire</h3>
                                        <p className="text-sm text-muted-foreground"><strong>Vedanta:</strong> An obstacle to be overcome (Vairagya). <br /><strong>Tantra:</strong> Fuel to be refined into spiritual fire.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                                        <h3 className="font-bold text-primary mb-2">Practice Focus</h3>
                                        <p className="text-sm text-muted-foreground"><strong>Vedanta:</strong> Stillness, reading, and mental inquiry. <br /><strong>Tantra:</strong> Ritual, mantra, visualization, and energy work (Kriya).</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-primary/5 rounded-[2.5rem] p-12 border border-primary/20">
                                <h2 className="text-3xl font-display font-bold mb-6">The Synthesis</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                    Modern seekers often find that they need both. Without Vedanta's clarity, Tantra can become
                                    a chase for "experiences" and powers (Siddhis). Without Tantra's vitality, Vedanta can
                                    become dry, intellectual, and disconnected from the body.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-4 py-2 bg-background border border-border/50 rounded-xl text-sm font-medium">
                                        Kashmir Shaivism
                                    </div>
                                    <div className="px-4 py-2 bg-background border border-border/50 rounded-xl text-sm font-medium">
                                        Integral Yoga
                                    </div>
                                    <div className="px-4 py-2 bg-background border border-border/50 rounded-xl text-sm font-medium">
                                        Shakta Advaita
                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 text-center">
                                <h2 className="text-3xl font-display font-bold mb-6">Which Path Is Yours?</h2>
                                <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
                                    Your temperament (Guna) and current life stage (Ashrama) determine whether the path of
                                    withdrawal or the path of engagement will bear fruit for you.
                                </p>
                                <Link href="/faith-finder">
                                    <button className="bg-orange-500 text-white font-bold px-10 h-16 rounded-2xl hover:scale-105 transition-transform flex items-center mx-auto shadow-xl shadow-orange-500/20">
                                        Discovery Your Path <ArrowRight className="ml-2 w-5 h-5" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
