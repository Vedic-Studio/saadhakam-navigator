import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame, Heart, Compass } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function SpiritualTraditions() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Introduction */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Spiritual Traditions & Paths
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Explore the diverse paths of Sanatan Dharma and find what resonates with your heart
                        </p>
                        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            Sanatan Dharma offers multiple paths to the same truth, each with its unique approach, practices, and philosophy. Discover the rich tapestry of spiritual traditions that have evolved over millennia.
                        </p>
                    </div>
                </div>
            </section>

            {/* Traditions Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Core Spiritual Traditions</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Flame className="w-8 h-8 text-amber-600" />
                                <h3 className="text-xl font-semibold">Shaivism</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Worship of Shiva as the supreme reality, encompassing diverse paths from devotion to tantra
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Shiva as supreme consciousness</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Five acts: creation, preservation, destruction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Liberation through Shiva's grace</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Heart className="w-8 h-8 text-amber-600" />
                                <h3 className="text-xl font-semibold">Shaktism</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Worship of the Divine Feminine as the supreme creative power of the universe
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Shakti as supreme reality</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Goddess in myriad forms</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Sacred feminine as gateway to liberation</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Compass className="w-8 h-8 text-amber-600" />
                                <h3 className="text-xl font-semibold">Vaishnavism</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                Devotion to Vishnu and his avatars, particularly Krishna and Rama
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Bhakti yoga: path of devotion</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Vishnu as preserver of dharma</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Surrender and love as path to liberation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Path Selection Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Which Path is Right for You?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Understanding the different approaches to spiritual realization
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Karma Yoga</h3>
                            <p className="text-muted-foreground mb-4">
                                The path of selfless action and duty. Focus on performing actions without attachment to results, seeing work as an offering to the divine.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Best for: Active, practical individuals</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Focus: Duty, responsibility, service</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Practice: Performing actions with detachment</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Bhakti Yoga</h3>
                            <p className="text-muted-foreground mb-4">
                                The path of devotion and love. Focus on developing a loving relationship with the divine through prayer, worship, and surrender.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Best for: Emotional, devotional individuals</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Focus: Love, devotion, surrender</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Practice: Prayer, chanting, worship</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Jnana Yoga</h3>
                            <p className="text-muted-foreground mb-4">
                                The path of knowledge and wisdom. Focus on intellectual understanding and self-inquiry to realize the true nature of reality.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Best for: Intellectual, analytical individuals</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Focus: Knowledge, self-inquiry, wisdom</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Practice: Study, meditation, self-reflection</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-4">Raja Yoga</h3>
                            <p className="text-muted-foreground mb-4">
                                The path of meditation and mental control. Focus on controlling the mind through various techniques and practices.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Best for: Disciplined, focused individuals</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Focus: Mind control, meditation, concentration</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-600">•</span>
                                    <span>Practice: Ashtanga yoga, meditation techniques</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
                <div className="container-padding max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Explore Your Spiritual Path
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Discover the tradition and path that resonates with your unique spiritual journey
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/traditions/shaivism">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Learn About Shaivism
                            </Button>
                        </Link>
                        <Link to="/traditions/shaktism">
                            <Button variant="outline" size="lg">
                                Explore Shaktism
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}