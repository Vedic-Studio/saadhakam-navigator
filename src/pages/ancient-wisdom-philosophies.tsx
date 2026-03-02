import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, Compass, Scroll, Users } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function AncientWisdomPhilosophies() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Introduction */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Ancient Wisdom & Philosophies: The Perennial Path to Truth
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Explore the profound philosophical traditions that have guided humanity toward liberation and enlightenment
                        </p>
                        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            The great philosophies of the East offer timeless insights into the nature of reality, consciousness, and our place in the cosmos. From non-dualism to bhakti traditions, these teachings remain as relevant today as they were thousands of years ago—providing practical wisdom for navigating life's deepest questions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Philosophies Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Core Philosophical Traditions</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Link to="/what-is-vedanta" className="no-underline">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lightbulb className="w-8 h-8 text-amber-600" />
                                    <h3 className="text-xl font-semibold">What is Vedanta?</h3>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    The philosophical conclusion of the Vedas—understanding the nature of Brahman and Atman
                                </p>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Ultimate reality and consciousness</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Foundation of Hindu philosophy</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Key to liberation and self-realization</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/advaita-vedanta-explained" className="no-underline">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <Compass className="w-8 h-8 text-amber-600" />
                                    <h3 className="text-xl font-semibold">Advaita Vedanta Explained</h3>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    The non-dual philosophy of pure consciousness and the illusory nature of separation
                                </p>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Non-duality and the dissolution of ego</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Maya and the nature of illusion</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Path to immediate self-knowledge</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/non-duality-vs-dualism" className="no-underline">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <Scroll className="w-8 h-8 text-amber-600" />
                                    <h3 className="text-xl font-semibold">Non-Duality vs Dualism</h3>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    Understanding the fundamental differences between Advaita and Dvaita perspectives
                                </p>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Non-duality: one ultimate reality</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Dualism: God and soul as eternal distinctions</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Different paths, same ultimate goal</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/shaivism-vs-vaishnavism" className="no-underline">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-8 h-8 text-amber-600" />
                                    <h3 className="text-xl font-semibold">Shaivism vs Vaishnavism</h3>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    The major Hindu traditions focused on Shiva and Vishnu as ultimate reality
                                </p>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Shaivism: Shiva as the supreme consciousness</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Vaishnavism: Vishnu and Krishna devotion</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Rich traditions of practice and experience</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/adi-shankaracharya-life-teachings" className="no-underline">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lightbulb className="w-8 h-8 text-amber-600" />
                                    <h3 className="text-xl font-semibold">Adi Shankaracharya</h3>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    The life and teachings of the great philosopher who systematized Advaita Vedanta
                                </p>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Founder of non-dual philosophy</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Life of renunciation and spiritual mastery</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Enduring legacy for seekers worldwide</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <Link to="/vedanta-guide" className="no-underline">
                            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-full cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <Compass className="w-8 h-8 text-amber-600" />
                                    <h3 className="text-xl font-semibold">Vedanta Guide</h3>
                                </div>
                                <p className="text-muted-foreground mb-4">
                                    A comprehensive guide to Vedantic philosophy for practitioners and seekers
                                </p>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Core teachings and key concepts</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Practical methods for self-inquiry</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ArrowRight className="w-4 h-4 text-amber-600" />
                                        <span>Integration into daily life</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Thinkers Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Featured Philosophers</h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            Meet the great minds who shaped the philosophical traditions of the East
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-foreground mb-2">Adi Shankaracharya</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                8th-9th century philosopher who systematized Advaita Vedanta and revived Hindu traditions
                            </p>
                            <p className="text-xs text-amber-600 font-medium">Non-dualism</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-foreground mb-2">Nagarjuna</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Buddhist philosopher who developed the theory of Sunyata (emptiness) and middle way
                            </p>
                            <p className="text-xs text-amber-600 font-medium">Buddhist Philosophy</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-foreground mb-2">Laozi</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Chinese philosopher credited with founding Daoism and authoring the Tao Te Ching
                            </p>
                            <p className="text-xs text-amber-600 font-medium">Daoism</p>
                        </div>

                        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                            <h3 className="text-xl font-semibold text-foreground mb-2">Ramanuja</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Hindu philosopher who systematized Vishishtadvaita (qualified non-dualism) and devotional practice
                            </p>
                            <p className="text-xs text-amber-600 font-medium">Bhakti Philosophy</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Frequently Asked Questions About Ancient Philosophies
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">What is the difference between Vedanta and other Hindu philosophies?</h3>
                            <p className="text-muted-foreground">
                                Vedanta is the concluding portion of the Vedas and focuses on understanding the ultimate nature of reality. Other Hindu philosophies like Samkhya, Yoga, Nyaya, and Vaisheshika have different approaches but all aim at liberation (moksha). Vedanta, particularly Advaita, emphasizes direct knowledge of Brahman as the path to freedom.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Is non-duality just an intellectual concept?</h3>
                            <p className="text-muted-foreground">
                                While non-duality is initially understood intellectually, the goal is direct experiential realization. The teachings are meant to guide you beyond concepts to the living truth of your own consciousness. Meditation, self-inquiry, and the guidance of a teacher help transform intellectual understanding into lived reality.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Can I practice these philosophies without a spiritual teacher?</h3>
                            <p className="text-muted-foreground">
                                While self-study is valuable, the guidance of a qualified teacher is traditionally considered essential. A teacher helps clarify misunderstandings, guides practice, and points directly to truth. In modern times, a combination of study, practice, community, and when possible, guidance from an experienced teacher works well.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">How do these ancient philosophies apply to modern challenges?</h3>
                            <p className="text-muted-foreground">
                                These philosophies address fundamental aspects of human existence—suffering, meaning, purpose, and freedom—which are timeless. Whether dealing with stress, relationships, or existential questions, the wisdom provides practical perspectives and practices that help navigate modern life with greater clarity and equanimity.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">What is the relationship between different Eastern philosophies?</h3>
                            <p className="text-muted-foreground">
                                While they use different language and frameworks, many Eastern philosophies point to similar truths about the nature of consciousness and reality. Daoism, Buddhism, and Hindu philosophies all value direct experience, non-attachment, and harmony with the natural flow of existence. They are different paths up the same mountain.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
                <div className="container-padding max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Discover Your Philosophical Path
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Explore deeper wisdom traditions and find practices that resonate with your spiritual nature
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/philosophies">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Explore All Philosophies
                            </Button>
                        </Link>
                        <Link to="/faith-finder">
                            <Button variant="outline" size="lg">
                                Take the Faith Finder
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
