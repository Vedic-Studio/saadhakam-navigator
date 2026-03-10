// @ts-nocheck

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Quote, Lightbulb } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function SacredTexts() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Introduction */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Sacred Texts: Timeless Wisdom for Modern Life
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Discover the ancient scriptures that have guided seekers for millennia
                        </p>
                        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            The sacred texts of Sanatan Dharma offer profound insights into the nature of reality, consciousness, and the path to liberation. These timeless teachings continue to inspire and transform lives today.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pillars Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">Core Sacred Texts</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Book className="w-8 h-8 text-amber-600" />
                                <h3 className="text-xl font-semibold">Bhagavad Gita</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                The divine conversation on duty, yoga, and liberation
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>18 chapters of profound wisdom</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Synthesizes karma, jnana, bhakti, raja yoga</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Timeless guidance for modern life</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Quote className="w-8 h-8 text-amber-600" />
                                <h3 className="text-xl font-semibold">Upanishads</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                The philosophical foundation of Vedanta and self-knowledge
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>12 major Upanishads</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Explores consciousness and reality</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Source of "Tat Tvam Asi" and other mahavakyas</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <Lightbulb className="w-8 h-8 text-amber-600" />
                                <h3 className="text-xl font-semibold">Vedas</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                The ancient hymns and rituals of the Vedic tradition
                            </p>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Four ancient collections</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Rig, Sama, Yajur, Atharva Vedas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4 text-amber-600" />
                                    <span>Foundation of Sanatan Dharma</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Frequently Asked Questions About Sacred Texts
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Which text should I start with?</h3>
                            <p className="text-muted-foreground">
                                For beginners, the Bhagavad Gita is an excellent starting point as it presents comprehensive wisdom in an accessible format. The Upanishads are deeper and can be explored after gaining some familiarity with the Gita.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">How should I approach reading sacred texts?</h3>
                            <p className="text-muted-foreground">
                                Read with an open mind and heart. Don't just intellectualize - reflect on the teachings and see how they apply to your life. It's often helpful to read with a commentary from a qualified teacher.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Do I need to know Sanskrit to understand these texts?</h3>
                            <p className="text-muted-foreground">
                                While knowing Sanskrit is valuable, excellent translations are available in many languages. The key is to connect with the essence of the teachings rather than getting lost in linguistic details.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">How can I apply these ancient teachings to modern life?</h3>
                            <p className="text-muted-foreground">
                                The wisdom is timeless and applicable to all aspects of life - relationships, work, purpose, and self-understanding. The texts provide practical guidance for navigating life's challenges with wisdom and equanimity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
                <div className="container-padding max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Begin Your Journey Through Sacred Wisdom
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Start with the Bhagavad Gita and discover the timeless teachings that have inspired seekers for centuries
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/texts/bhagavad-gita">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Explore Bhagavad Gita
                            </Button>
                        </Link>
                        <Link to="/texts/vedanta">
                            <Button variant="outline" size="lg">
                                Discover Upanishads
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}