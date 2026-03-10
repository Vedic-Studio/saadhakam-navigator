// @ts-nocheck

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Lightbulb, Users } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function WhatIsVedanta() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Article Header */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                            <BookOpen className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-medium text-amber-200 uppercase tracking-widest">Vedanta Philosophy</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            What is Vedanta? A Complete Beginner's Guide
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            The culmination of Vedic wisdom exploring the nature of ultimate reality and the self
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>For seekers of deeper understanding</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" />
                                <span>Beginner-friendly introduction</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container-padding max-w-4xl mx-auto">
                    <div className="prose prose-lg prose-amber mx-auto">
                        <h2 className="text-3xl font-bold text-foreground mb-6">Introduction to Vedanta</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            Vedanta represents the philosophical conclusions drawn from the Upanishads, forming the most influential school of Hindu philosophy. It addresses fundamental questions about consciousness, reality, and liberation. The term "Vedanta" literally means "the end of the Vedas," signifying the culmination of Vedic wisdom.
                        </p>

                        <h3 className="text-2xl font-bold text-foreground mb-4">Core Concepts of Vedanta</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-2">Brahman: The Ultimate Reality</h4>
                                <p className="text-muted-foreground mb-4">
                                    Brahman is the unchanging, infinite consciousness that underlies all existence. It is the ultimate reality, beyond time, space, and causation. Everything in the universe is a manifestation of Brahman.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Brahman is pure consciousness</li>
                                    <li>Brahman is beyond attributes and qualities</li>
                                    <li>Brahman is the source and sustainer of all creation</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-2">Atman: The Individual Self</h4>
                                <p className="text-muted-foreground mb-4">
                                    Atman refers to the individual soul or self. Vedanta teaches that the individual atman is not separate from Brahman but is identical with it. The apparent separation is due to ignorance (avidya).
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Atman is the true nature of every individual</li>
                                    <li>Atman is eternal and unchanging</li>
                                    <li>Realization of atman leads to liberation</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-2">Maya: The Illusion</h4>
                                <p className="text-muted-foreground mb-4">
                                    Maya is the power that creates the illusion of multiplicity and separation in the universe. It makes the one Brahman appear as many individual beings and objects. Maya is not false in itself but obscures the true nature of reality.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Maya creates the world of names and forms</li>
                                    <li>Maya is temporary and illusory</li>
                                    <li>Understanding Maya leads to liberation</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-2">Moksha: Liberation</h4>
                                <p className="text-muted-foreground mb-4">
                                    Moksha is the ultimate goal of human life in Vedanta - freedom from the cycle of birth and death, and from the illusion of separation. It is the realization of one's true nature as Brahman.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Moksha is liberation from suffering</li>
                                    <li>Moksha is the end of ignorance</li>
                                    <li>Moksha is the realization of oneness</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Key Schools of Vedanta</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Advaita Vedanta</h4>
                                <p className="text-muted-foreground mb-4">
                                    Non-dual philosophy teaching that individual self and universal consciousness are one. Systematized by Adi Shankaracharya.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Brahman alone is real; the world is apparent</li>
                                    <li>The jiva (individual) is Brahman, obscured by ignorance</li>
                                    <li>Liberation comes through knowledge (jnana), not action</li>
                                </ul>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Vishishtadvaita</h4>
                                <p className="text-muted-foreground mb-4">
                                    Qualified non-dualism teaching that the individual souls and the world are real modifications of Brahman.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Brahman is the supreme reality with attributes</li>
                                    <li>Individual souls are real but dependent on Brahman</li>
                                    <li>Liberation is through devotion and grace</li>
                                </ul>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Dvaita</h4>
                                <p className="text-muted-foreground mb-4">
                                    Dualism teaching that God, souls, and the world are eternally distinct.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>God (Vishnu) is supreme and independent</li>
                                    <li>Souls are dependent on God but eternally distinct</li>
                                    <li>Liberation is through devotion and God's grace</li>
                                </ul>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Shuddhadvaita</h4>
                                <p className="text-muted-foreground mb-4">
                                    Pure non-dualism teaching that the world and souls are real and identical with Brahman.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Brahman is pure consciousness with attributes</li>
                                    <li>The world is real and a manifestation of Brahman</li>
                                    <li>Liberation is through devotion and self-surrender</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">How to Start with Vedanta</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-3">1. Study the Upanishads</h4>
                                <p className="text-muted-foreground mb-4">
                                    Begin with the Mandukya Upanishad and its Karika, then explore the Brahma Sutras with accessible commentaries.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Start with the shorter, more accessible Upanishads</li>
                                    <li>Read with a qualified teacher or commentary</li>
                                    <li>Focus on understanding the core teachings</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-3">2. Read Key Texts</h4>
                                <p className="text-muted-foreground mb-4">
                                    Explore foundational texts that explain Vedanta in clear terms.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li><strong>Vivekachudamani</strong> by Adi Shankaracharya</li>
                                    <li><strong>Atma Bodha</strong> by Adi Shankaracharya</li>
                                    <li><strong>Drg-Drsya-Viveka</strong> by Adi Shankaracharya</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-3">3. Practice Self-Inquiry</h4>
                                <p className="text-muted-foreground mb-4">
                                    Vedanta is not just theoretical knowledge but a practical path to self-realization.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Practice "Who am I?" self-inquiry</li>
                                    <li>Meditate on the nature of consciousness</li>
                                    <li>Reflect on the teachings in daily life</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Why Vedanta Matters Today</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Answers Life's Deepest Questions</h4>
                                    <p className="text-muted-foreground">
                                        Vedanta provides a coherent framework for understanding consciousness, reality, and the purpose of human existence.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Timeless Wisdom</h4>
                                    <p className="text-muted-foreground">
                                        The teachings of Vedanta have been refined over thousands of years and remain relevant in the modern world.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Practical Application</h4>
                                    <p className="text-muted-foreground">
                                        Vedanta offers practical guidance for living a meaningful life, managing relationships, and finding inner peace.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
                <div className="container-padding max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Ready to Dive Deeper into Vedanta?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Continue your journey with more advanced topics and practices
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/vedanta-guide">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Explore Vedanta Guide
                            </Button>
                        </Link>
                        <Link to="/texts/vedanta">
                            <Button variant="outline" size="lg">
                                Read Upanishads
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}