import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Lightbulb, Users } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function AdvaitaVedantaExplained() {
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
                            Advaita Vedanta Explained Simply
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Non-dual philosophy teaching that individual self and universal consciousness are one
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>For those drawn to radical inquiry</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" />
                                <span>Clear, accessible explanation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container-padding max-w-4xl mx-auto">
                    <div className="prose prose-lg prose-amber mx-auto">
                        <h2 className="text-3xl font-bold text-foreground mb-6">What is Advaita Vedanta?</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            Advaita Vedanta is a non-dual philosophy systematized by Adi Shankaracharya that teaches the apparent multiplicity of existence is ultimately illusory, and only Brahman—pure consciousness—truly exists. The individual atman is identical with Brahman.
                        </p>

                        <div className="bg-amber-50 rounded-lg p-8 mb-8">
                            <h3 className="text-2xl font-bold text-foreground mb-4">The Core Principle</h3>
                            <p className="text-muted-foreground mb-4">
                                <strong className="text-foreground">"Brahman alone is real; the world is apparent."</strong> This is the fundamental teaching of Advaita Vedanta. The world we perceive through our senses is not ultimately real but is a manifestation of Brahman, appearing due to ignorance (avidya).
                            </p>
                            <blockquote className="italic text-lg text-muted-foreground border-l-4 border-amber-400 pl-6">
                                "The individual self (atman) is Brahman, obscured by ignorance. When ignorance is removed, the truth is revealed: I am Brahman."
                            </blockquote>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6">Key Concepts of Advaita Vedanta</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Brahman: The Ultimate Reality</h4>
                                <p className="text-muted-foreground mb-4">
                                    Brahman is the unchanging, infinite consciousness that underlies all existence. It is beyond time, space, attributes, and qualities.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Brahman is pure awareness</li>
                                    <li>Brahman is the source of all creation</li>
                                    <li>Brahman is identical with the true self</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Atman: The Individual Self</h4>
                                <p className="text-muted-foreground mb-4">
                                    Atman refers to the individual soul or self. In Advaita, the atman is not separate from Brahman but is identical with it.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Atman is eternal and unchanging</li>
                                    <li>Atman is pure consciousness</li>
                                    <li>Atman is the true nature of every being</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Maya: The Illusion</h4>
                                <p className="text-muted-foreground mb-4">
                                    Maya is the power that creates the illusion of multiplicity and separation in the universe. It makes the one Brahman appear as many individual beings and objects.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Maya is not false in itself</li>
                                    <li>Maya is temporary and illusory</li>
                                    <li>Understanding Maya leads to liberation</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Avidya: Ignorance</h4>
                                <p className="text-muted-foreground mb-4">
                                    Avidya is the fundamental ignorance that causes us to perceive the world as real and separate from Brahman. It is the root cause of suffering.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Avidya creates the sense of "I" and "mine"</li>
                                    <li>Avidya causes attachment and aversion</li>
                                    <li>Avidya is removed through knowledge (jnana)</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6">The Four Mahavakyas: Core Statements</h3>
                        <div className="space-y-6">
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">1. "Tat Tvam Asi" - You Are That</h4>
                                <p className="text-muted-foreground mb-4">
                                    This is perhaps the most famous statement in Advaita Vedanta. It directly reveals the identity of the individual self (tvam) with the ultimate reality (tat).
                                </p>
                                <blockquote className="italic text-muted-foreground border-l-4 border-amber-400 pl-6">
                                    "Tat Tvam Asi" - "You are That" (Chandogya Upanishad)
                                </blockquote>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">2. "Aham Brahmasmi" - I Am Brahman</h4>
                                <p className="text-muted-foreground mb-4">
                                    This statement affirms the identity of the individual self (aham) with Brahman. It's a direct realization of one's true nature.
                                </p>
                                <blockquote className="italic text-muted-foreground border-l-4 border-amber-400 pl-6">
                                    "Aham Brahmasmi" - "I am Brahman" (Brhadaranyaka Upanishad)
                                </blockquote>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">3. "Prajnanam Brahma" - Consciousness is Brahman</h4>
                                <p className="text-muted-foreground mb-4">
                                    This statement identifies consciousness (prajnanam) with Brahman, emphasizing that the ultimate reality is pure awareness.
                                </p>
                                <blockquote className="italic text-muted-foreground border-l-4 border-amber-400 pl-6">
                                    "Prajnanam Brahma" - "Consciousness is Brahman" (Aitareya Upanishad)
                                </blockquote>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">4. "Ayam Atma Brahma" - This Self is Brahman</h4>
                                <p className="text-muted-foreground mb-4">
                                    This statement points to the identity of the individual self (atma) with Brahman, emphasizing the universality of this truth.
                                </p>
                                <blockquote className="italic text-muted-foreground border-l-4 border-amber-400 pl-6">
                                    "Ayam Atma Brahma" - "This Self is Brahman" (Mandukya Upanishad)
                                </blockquote>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">How Advaita Differs from Other Philosophies</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">vs. Dvaita (Dualism)</h4>
                                <p className="text-muted-foreground mb-4">
                                    Dvaita teaches that God, souls, and the world are eternally distinct. Advaita teaches they are ultimately one.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Dvaita: God, souls, world are separate</li>
                                    <li>Advaita: God, souls, world are one in essence</li>
                                    <li>Dvaita: Liberation through devotion</li>
                                    <li>Advaita: Liberation through knowledge</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-amber-200 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">vs. Vishishtadvaita</h4>
                                <p className="text-muted-foreground mb-4">
                                    Vishishtadvaita teaches qualified non-dualism - the world and souls are real modifications of Brahman.
                                </p>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Vishishtadvaita: World and souls are real</li>
                                    <li>Advaita: World and souls are apparent</li>
                                    <li>Vishishtadvaita: Individuality is real</li>
                                    <li>Advaita: Individuality is illusory</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Practical Applications of Advaita</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Self-Inquiry</h4>
                                    <p className="text-muted-foreground">
                                        Advaita encourages the practice of self-inquiry (atma-vichara) - asking "Who am I?" to discover the true nature beyond the ego.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Detachment</h4>
                                    <p className="text-muted-foreground">
                                        Understanding the illusory nature of the world helps develop detachment from material possessions and relationships.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Inner Peace</h4>
                                    <p className="text-muted-foreground">
                                        Realizing the unity of all existence brings profound peace and freedom from the fear of loss and change.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                    <Lightbulb className="w-4 h-4 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Compassion</h4>
                                    <p className="text-muted-foreground">
                                        Seeing the unity in all beings fosters genuine compassion and love for others as extensions of the self.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Getting Started with Advaita</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">1. Study the Upanishads</h4>
                                <p className="text-muted-foreground mb-4">
                                    Begin with the foundational texts that contain the core teachings of Advaita.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li><strong>Mandukya Upanishad</strong> - Focuses on the nature of consciousness</li>
                                    <li><strong>Chandogya Upanishad</strong> - Contains the "Tat Tvam Asi" teaching</li>
                                    <li><strong>Brhadaranyaka Upanishad</strong> - Explores the nature of the self</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">2. Read Shankaracharya's Works</h4>
                                <p className="text-muted-foreground mb-4">
                                    The great master's commentaries and original works provide clear explanations.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li><strong>Vivekachudamani</strong> - "The Crest-Jewel of Discrimination"</li>
                                    <li><strong>Atma Bodha</strong> - "Self-Knowledge"</li>
                                    <li><strong>Drg-Drsya-Viveka</strong> - "Discrimination between Seer and Seen"</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">3. Practice Self-Inquiry</h4>
                                <p className="text-muted-foreground mb-4">
                                    Regular meditation and self-inquiry help reveal the true nature beyond the ego.
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Ask "Who am I?" throughout the day</li>
                                    <li>Observe thoughts and emotions without identification</li>
                                    <li>Practice detachment from the changing world</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
                <div className="container-padding max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Ready to Explore Non-Dual Wisdom?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Dive deeper into Advaita Vedanta and discover the path to self-realization
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