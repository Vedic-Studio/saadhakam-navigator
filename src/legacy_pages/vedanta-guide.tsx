// @ts-nocheck

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Lightbulb } from "lucide-react";
import { SadhakaIntroduction } from "@/components/landing/SadhakaIntroduction";
import { PillarsSection } from "@/components/landing/PillarsSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { GreatsSection } from "@/components/landing/GreatsSection";
import { PhilosophyGrid as PhilosophiesSection } from "@/components/landing/PhilosophyGrid";

export default function VedantaGuide() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Introduction */}
            <SadhakaIntroduction
                title="Vedanta: The Culmination of Vedic Wisdom"
                subtitle="Explore the profound philosophy that answers life's deepest questions about consciousness, reality, and liberation"
                description="Vedanta represents the philosophical conclusions drawn from the Upanishads, forming the most influential school of Hindu philosophy. It addresses fundamental questions about consciousness, reality, and liberation."
            />

            {/* Pillars Section */}
            <PillarsSection
                title="Core Pillars of Vedanta"
                pillars={[
                    {
                        icon: BookOpen,
                        title: "Brahman as Ultimate Reality",
                        description: "The unchanging, infinite consciousness that underlies all existence"
                    },
                    {
                        icon: Users,
                        title: "Atman and Brahman",
                        description: "The individual self (atman) and its relationship to the universal consciousness (brahman)"
                    },
                    {
                        icon: Lightbulb,
                        title: "Maya and Illusion",
                        description: "The nature of perceived reality and how it obscures our true nature"
                    },
                    {
                        icon: ArrowRight,
                        title: "Moksha: Liberation",
                        description: "The ultimate goal of human life - freedom from ignorance and suffering"
                    }
                ]}
            />

            {/* Greats Section */}
            <GreatsSection
                title="Vedanta Masters Through the Ages"
                description="Learn from the great sages who have illuminated the path of self-realization"
            />

            {/* Philosophies Section */}
            <PhilosophiesSection
                title="Key Vedanta Philosophies"
                description="Explore the different schools of thought within Vedanta"
            />

            {/* FAQ Section */}
            <FAQSection
                title="Frequently Asked Questions About Vedanta"
                faqs={[
                    {
                        question: "What is Vedanta in simple terms?",
                        answer: "Vedanta is the philosophical conclusion of the Vedas, exploring the nature of ultimate reality and the self. It teaches that the individual soul (atman) is identical with the universal consciousness (brahman)."
                    },
                    {
                        question: "How is Vedanta different from other philosophies?",
                        answer: "Vedanta offers a systematic approach to understanding consciousness and reality, focusing on direct experience rather than belief. It provides practical methods for self-inquiry and liberation."
                    },
                    {
                        question: "Who can benefit from studying Vedanta?",
                        answer: "Anyone seeking deeper understanding of consciousness, reality, and their true nature. It's particularly valuable for those comfortable with abstract concepts and philosophical inquiry."
                    },
                    {
                        question: "What are the main schools of Vedanta?",
                        answer: "The three main schools are Advaita (non-dual), Vishishtadvaita (qualified non-dual), and Dvaita (dual). Each offers a different perspective on the relationship between individual and universal consciousness."
                    }
                ]}
            />

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
                <div className="container-padding max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Ready to Begin Your Vedanta Journey?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Start with the foundational texts and guided practices that have transformed millions of lives
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/texts/vedanta">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Explore Vedanta Texts
                            </Button>
                        </Link>
                        <Link to="/practices/meditation">
                            <Button variant="outline" size="lg">
                                Start Your Practice
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}