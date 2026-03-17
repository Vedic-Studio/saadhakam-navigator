import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight } from "lucide-react";
import { ContentPageTracker, TrackedLink } from "@/components/ContentAnalytics";

export const metadata: Metadata = {
    title: "Paramahansa Yogananda's Core Teachings: Kriya Yoga, Self-Realization, and the Science of God",
    description:
        "Yogananda introduced Kriya Yoga to the West in the 1920s. Learn his core teachings on the scientific approach to God-realization, the spine as the highway of consciousness, and how his work compares to Art of Living's Sudarshan Kriya.",
    alternates: {
        canonical: "https://www.opensadhaka.com/paramahansa-yogananda-teachings",
    },
    openGraph: {
        title: "Paramahansa Yogananda's Core Teachings",
        description:
            "The monk who brought Kriya Yoga West. His teachings on the spine, prana, and the scientific approach to God-experience — and how modern breathwork traditions compare.",
        url: "https://www.opensadhaka.com/paramahansa-yogananda-teachings",
        type: "article",
    },
};

const faqs = [
    {
        question: "What is Paramahansa Yogananda's most important teaching?",
        answer:
            "Yogananda's central teaching is that God-realization — the direct, experiential recognition of one's identity with infinite consciousness — is achievable by any sincere human being, regardless of religion, nationality, or circumstance. He insisted that this was not a matter of faith but of science: just as a physicist uses specific instruments and methods to access the nature of matter, the yogi uses specific techniques (primarily Kriya Yoga) to access the nature of consciousness. His contribution was the marriage of Eastern yogic technology with Western scientific temperament.",
    },
    {
        question: "What is 'Autobiography of a Yogi' and why is it significant?",
        answer:
            "Published in 1946, 'Autobiography of a Yogi' is Yogananda's account of his life, his training under his guru Sri Yukteswar Giri, his travels in India among remarkable spiritual figures, and his mission to bring yoga to the West. It was the first book Steve Jobs placed on his iPad and the only book he had downloaded (he left specific instructions for it to be distributed at his memorial). It has been continuously in print since 1946 and is widely considered one of the most influential spiritual texts of the 20th century.",
    },
    {
        question: "What is the difference between Yogananda's Kriya Yoga and Sri Sri Ravi Shankar's Sudarshan Kriya?",
        answer:
            "They operate on different levels. Yogananda's Kriya Yoga is a precise internal energy technique focused on moving prana in the spinal channel — it is quiet, interiorized, and traditionally described as producing profound stillness. Sudarshan Kriya (from Art of Living) uses cyclical breathing rhythms in three stages (slow, medium, and fast) to create cathartic physiological release of accumulated stress — it is active, involves strong movement of breath, and produces emotional release as its primary mechanism. Both work with prana; they use opposite approaches. Kriya Yoga deepens through stillness; Sudarshan Kriya releases through rhythmic activation.",
    },
    {
        question: "How do I access Yogananda's teachings?",
        answer:
            "The primary path is through Self-Realization Fellowship (SRF) — the organization Yogananda founded in Los Angeles in 1920 and which continues to administer his lineage. SRF offers a structured Lessons program (home study correspondence course) that introduces preparatory meditation techniques and leads, after approximately 18 months, to initiation into Kriya Yoga. The Lessons are the only authentic source of the full Kriya initiation in Yogananda's lineage. Many of his books (Autobiography of a Yogi, Inner Peace, Scientific Healing Affirmations) are freely available through SRF's publications.",
    },
];

export default function ParamahansaYoganandaTeachingsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <ContentPageTracker slug="paramahansa-yogananda-teachings" pillar="spiritual-traditions" />
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="container-padding max-w-4xl mx-auto">
                    <Breadcrumbs
                        items={[
                            { label: "Home", href: "/" },
                            { label: "What is Kriya Yoga?", href: "/what-is-kriya-yoga" },
                            { label: "Yogananda's Teachings", href: "/paramahansa-yogananda-teachings" },
                        ]}
                    />

                    <header className="mb-16 mt-8">
                        <h1 className="font-display text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.9]">
                            The Monk Who Brought Yoga <span className="text-orange-500 italic">West</span>
                        </h1>
                        <p className="text-lg text-foreground leading-relaxed max-w-3xl mb-4">
                            <strong>Direct answer:</strong> Paramahansa Yogananda introduced Kriya Yoga to the West in 1920, teaching that God-realization is a science — achievable through exact techniques, not faith alone. His core teaching: the spine is the highway of consciousness; Kriya Yoga moves prana up this highway to accelerate spiritual evolution. His legacy continues through Self-Realization Fellowship (SRF), the only organization that offers authentic initiation in his lineage.
                        </p>
                        <p className="text-2xl md:text-3xl text-muted-foreground font-medium leading-tight max-w-3xl border-l-4 border-orange-500/30 pl-8 py-2">
                            Religion is the science of the soul. Just as a laboratory scientist uses instruments to access physical reality, the yogi uses techniques to access the reality of consciousness.
                        </p>
                    </header>

                    <div className="space-y-14">
                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Yogananda&apos;s Life and Mission</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Mukunda Lal Ghosh was born in 1893 in Gorakhpur, Uttar Pradesh, into a devout Bengali family. From childhood, he experienced unusual mystical states and felt a powerful drive toward renunciation and God-realization. After years of search, he found his guru — Sri Yukteswar Giri — a rigorous, highly trained master in Puri, Odisha.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Sri Yukteswar spent nearly a decade preparing Yogananda for his specific mission: to bring the science of Kriya Yoga to the West and demonstrate that original Christianity and original Yoga taught the same truths through different cultural forms. In 1920, Yogananda traveled to the United States and never returned to India to live permanently.
                            </p>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                He founded the Self-Realization Fellowship in Los Angeles, lectured to tens of thousands across America and Europe, established the Lake Shrine temple in Pacific Palisades, and wrote prolifically. He entered Mahasamadhi (conscious death) in 1952 — his body reportedly showing no signs of decay for 20 days, a phenomenon documented by the mortuary director Harry T. Rowe.
                            </p>
                        </section>

                        <section className="bg-muted/30 rounded-3xl p-10 border border-border/50">
                            <h2 className="text-3xl font-display font-bold mb-8">Core Teachings: The Scientific Approach to God</h2>
                            <div className="space-y-5">
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">God-Realization as Science</h3>
                                    <p className="text-muted-foreground leading-relaxed">Yogananda&apos;s most radical contribution to Western spirituality: insisting that the experience of God is not a matter of belief or grace but of technique. &quot;I will reason, I will will, I will act; but guide Thou my reason, will, and activity to the right path in everything.&quot; This is not passive faith — it is active collaboration between human effort and divine intelligence, mediated by specific practices.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Spine as Highway of Consciousness</h3>
                                    <p className="text-muted-foreground leading-relaxed">Yogananda taught that the 24 vertebrae of the spine correspond to the 24 hours of the cosmic day, and that the seven chakras are the seven spiritual centers through which consciousness must ascend for liberation. Kriya Yoga works directly on this system — moving life-force energy up and down the spine to gradually dissolve the ego-veils at each chakra level, revealing the infinite consciousness that was always present behind them.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">The Harmony of Christ and Krishna</h3>
                                    <p className="text-muted-foreground leading-relaxed">Yogananda consistently taught that Jesus Christ and Krishna were both fully God-realized avatars who taught the same essential truth through different cultural vocabularies. He offered parallel interpretations of the Bible and the Bhagavad Gita, arguing that the mystical cores of Christianity and Yoga are identical. This ecumenical positioning allowed millions of Western Christians to engage with yoga without feeling they were abandoning their faith.</p>
                                </div>
                                <div className="bg-background/60 rounded-2xl p-6 border border-border/30">
                                    <h3 className="font-bold text-orange-400 mb-2">Healing Through Energy</h3>
                                    <p className="text-muted-foreground leading-relaxed">Yogananda was a significant figure in the development of what would later become energy medicine in the West. His &quot;Scientific Healing Affirmations&quot; and energy healing techniques drew on the yogic understanding that physical disease begins as disruption in the astral (energy) body before manifesting physically. While these teachings are not mainstream science, they anticipated elements of the mind-body medicine movement by decades.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display font-bold mb-6">Yogananda vs Sri Sri Ravi Shankar: Breath as the Ultimate Tool</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                                Both Paramahansa Yogananda and Sri Sri Ravi Shankar (founder of Art of Living) identify breath as the primary instrument of spiritual transformation. But their approaches are notably different:
                            </p>
                            <div className="overflow-x-auto rounded-2xl border border-border/30 mb-8">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-background/50 text-left">
                                            <th className="p-4 font-bold text-foreground">Dimension</th>
                                            <th className="p-4 font-bold text-orange-400">Yogananda&apos;s Kriya Yoga</th>
                                            <th className="p-4 font-bold text-muted-foreground">Sri Sri&apos;s Sudarshan Kriya</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20 text-muted-foreground">
                                        <tr>
                                            <td className="p-4">Mechanism</td>
                                            <td className="p-4 text-foreground">Internal energy movement in the spine (Sushumna Nadi)</td>
                                            <td className="p-4">Cyclical breathing rhythms producing physiological release</td>
                                        </tr>
                                        <tr className="bg-muted/10">
                                            <td className="p-4">Quality</td>
                                            <td className="p-4 text-foreground">Quiet, interiorized, produces profound stillness</td>
                                            <td className="p-4">Active, dynamic, produces cathartic emotional release</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Prerequisite</td>
                                            <td className="p-4 text-foreground">18+ months of preparatory lessons + formal initiation</td>
                                            <td className="p-4">2-day Art of Living course (no prerequisite)</td>
                                        </tr>
                                        <tr className="bg-muted/10">
                                            <td className="p-4">Best for</td>
                                            <td className="p-4 text-foreground">Deep spiritual seeking, long-term transformation</td>
                                            <td className="p-4">Stress release, emotional processing, accessible entry point</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                These are not competing systems — they serve different practitioners at different stages. Sudarshan Kriya&apos;s accessibility makes it an excellent entry point for practitioners who haven&apos;t yet built the preparation required for Yogananda&apos;s Kriya. The depth trajectories differ significantly.
                            </p>

                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/what-is-kriya-yoga" className="inline-flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                                    What is Kriya Yoga? <ArrowRight size={16} />
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
                        <h2 className="text-4xl lg:text-5xl font-display font-black mb-6">The Science of the Soul.</h2>
                        <p className="text-xl text-orange-50 max-w-2xl mx-auto mb-10 font-medium">
                            Yogananda&apos;s essential teaching: God-realization is not belief — it is experience. Begin with Kriya Yoga or start a daily practice.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <TrackedLink
                                href="/what-is-kriya-yoga"
                                eventLabel="yogananda:footer:kriya"
                                trackPathName="what-is-kriya-yoga"
                                className="px-10 py-5 bg-white text-orange-600 font-bold rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                            >
                                What is Kriya Yoga?
                            </TrackedLink>
                            <TrackedLink
                                href="/how-to-start-meditating-daily"
                                eventLabel="yogananda:footer:meditate"
                                trackPathName="how-to-start-meditating-daily"
                                className="px-10 py-5 bg-orange-700 text-white border border-orange-400/30 font-bold rounded-2xl transition-all hover:bg-orange-800"
                            >
                                Start Meditating Daily
                            </TrackedLink>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
