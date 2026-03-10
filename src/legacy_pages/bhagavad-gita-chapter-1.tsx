// @ts-nocheck

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Quote } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function BhagavadGitaChapter1() {
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
                            <span className="text-xs font-medium text-amber-200 uppercase tracking-widest">Sacred Texts</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Bhagavad Gita Chapter 1: Arjuna's Dilemma Explained
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            The setting: On the battlefield of Kurukshetra, Arjuna faces a crisis of conscience
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Quote className="w-4 h-4" />
                                <span>Understanding the foundation of the Gita's teachings</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-amber-600">•</span>
                                <span>For beginners and returning students</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container-padding max-w-4xl mx-auto">
                    <div className="prose prose-lg prose-amber mx-auto">
                        <h2 className="text-3xl font-bold text-foreground mb-6">The Setting: Kurukshetra Battlefield</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            The Bhagavad Gita begins on the battlefield of Kurukshetra, where the Pandava prince Arjuna is faced with the prospect of fighting against his own kinsmen, teachers, and elders in the great war between the Pandavas and Kauravas. This chapter sets the stage for Krishna's profound teachings on duty, action, and the nature of reality.
                        </p>

                        <h3 className="text-2xl font-bold text-foreground mb-6">Arjuna's Crisis of Conscience</h3>
                        <div className="bg-amber-50 rounded-lg p-8 mb-8">
                            <h4 className="text-xl font-semibold text-foreground mb-4">The Dilemma</h4>
                            <p className="text-muted-foreground mb-4">
                                Arjuna, seeing his relatives and respected elders arrayed against him, is overwhelmed by grief and confusion. He drops his bow and declares his inability to fight:
                            </p>
                            <blockquote className="border-l-4 border-amber-400 pl-6 italic text-lg text-muted-foreground">
                                "Arjuna said: Krishna, seeing my kinsmen standing arrayed, with affection for them, my limbs fail and my mouth is parched. My body trembles and my hair stands on end; my bow Gandiva slips from my hand, and my skin burns."
                            </blockquote>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6">Key Themes of Chapter 1</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">The Nature of Duty</h4>
                                <p className="text-muted-foreground mb-4">
                                    Arjuna's dilemma raises fundamental questions about duty (dharma) versus personal feelings and relationships.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>What is the right action when faced with conflicting duties?</li>
                                    <li>How do we balance personal relationships with larger responsibilities?</li>
                                    <li>What is the nature of true courage and righteousness?</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">The Human Condition</h4>
                                <p className="text-muted-foreground mb-4">
                                    Arjuna's reaction represents the universal human experience of facing difficult choices and moral dilemmas.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Fear and uncertainty in the face of challenging decisions</li>
                                    <li>The conflict between emotion and duty</li>
                                    <li>The search for guidance and clarity</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">The Role of the Teacher</h4>
                                <p className="text-muted-foreground mb-4">
                                    Krishna's appearance as Arjuna's charioteer and guide sets up the teacher-student dynamic that will unfold throughout the Gita.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>The importance of a wise guide in times of crisis</li>
                                    <li>The teacher as a source of wisdom and perspective</li>
                                    <li>The transformational power of spiritual guidance</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">The Battlefield of Life</h4>
                                <p className="text-muted-foreground mb-4">
                                    Kurukshetra symbolizes the battlefield of life where we all face challenges and must make difficult choices.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Life's challenges as opportunities for growth</li>
                                    <li>The inner and outer battles we all fight</li>
                                    <li>The importance of clarity and purpose</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6">Arjuna's Arguments Against Fighting</h3>
                        <div className="space-y-6">
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">1. Attachment to Family</h4>
                                <p className="text-muted-foreground mb-4">
                                    Arjuna expresses his deep love and attachment to his relatives, making it difficult to fight against them.
                                </p>
                                <blockquote className="italic text-muted-foreground">
                                    "How shall I strike my grandfather, Bhishma, or my uncle, or either of my brother's sons? How shall I strike them who are worthy of my worship, with arrows in my belly?"
                                </blockquote>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">2. Fear of Sin</h4>
                                <p className="text-muted-foreground mb-4">
                                    Arjuna is concerned about the karmic consequences of killing his own kinsmen.
                                </p>
                                <blockquote className="italic text-muted-foreground">
                                    "We do not know what is better—whether we should conquer them or they should conquer us. Even if these sons of Dhritarashtra, armed, slay us, we would not wish to live after killing our noble-minded relatives."
                                </blockquote>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">3. Loss of Reputation</h4>
                                <p className="text-muted-foreground mb-4">
                                    Arjuna is concerned about how he will be perceived if he abandons his duty as a warrior.
                                </p>
                                <blockquote className="italic text-muted-foreground">
                                    "I would be untrue to my duty and bring myself infamy if I were to slay my relatives, for the sake of enjoying kingdoms, O Krishna."
                                </blockquote>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Krishna's Response and the Gita's Purpose</h3>
                        <p className="text-lg text-muted-foreground mb-6">
                            While Chapter 1 ends with Arjuna's declaration of inability to fight, it sets the stage for Krishna's profound teachings in the subsequent chapters. The Gita will address:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">The Nature of the Self</h4>
                                <p className="text-muted-foreground">
                                    Krishna will explain that the true self is eternal and beyond birth and death, helping Arjuna understand that killing the body doesn't kill the soul.
                                </p>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">Duty and Action</h4>
                                <p className="text-muted-foreground">
                                    The importance of performing one's duty without attachment to results, and how this applies to Arjuna's situation.
                                </p>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">Different Paths to Liberation</h4>
                                <p className="text-muted-foreground">
                                    Krishna will present the various yogas (paths) that lead to spiritual realization, including karma yoga, jnana yoga, and bhakti yoga.
                                </p>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">The Cosmic Perspective</h4>
                                <p className="text-muted-foreground">
                                    Understanding the larger cosmic order and how individual actions fit into the grand scheme of creation and destruction.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Why This Chapter Matters</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Quote className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Relatable Human Dilemma</h4>
                                    <p className="text-muted-foreground">
                                        Arjuna's crisis resonates with everyone who has faced difficult moral choices and the conflict between duty and personal feelings.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Quote className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Foundation for Gita's Teachings</h4>
                                    <p className="text-muted-foreground">
                                        Understanding Chapter 1 provides essential context for comprehending the profound wisdom that follows in the remaining chapters.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Quote className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Practical Wisdom</h4>
                                    <p className="text-muted-foreground">
                                        The lessons from Arjuna's dilemma offer practical guidance for navigating life's challenges with clarity and purpose.
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
                        Continue Your Journey Through the Bhagavad Gita
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Explore the complete teachings and discover how they apply to your life
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/texts/bhagavad-gita">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Read Full Bhagavad Gita
                            </Button>
                        </Link>
                        <Link to="/texts/vedanta">
                            <Button variant="outline" size="lg">
                                Explore Upanishads
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}