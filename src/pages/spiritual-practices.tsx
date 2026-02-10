import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Clock } from "lucide-react";
import { SadhakaIntroduction } from "@/components/landing/SadhakaIntroduction";
import { PillarsSection } from "@/components/landing/PillarsSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { PracticesSection } from "@/components/landing/PracticesSection";

export default function SpiritualPractices() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Introduction */}
            <SadhakaIntroduction
                title="Practical Spiritual Practices"
                subtitle="Transform theory into experience through time-tested techniques"
                description="Ancient wisdom comes alive through daily practice. Explore these powerful techniques that have been refined over millennia to help you connect with your true nature."
            />

            {/* Pillars Section */}
            <PillarsSection
                title="Core Spiritual Practices"
                pillars={[
                    {
                        icon: Brain,
                        title: "Dhyana (Meditation)",
                        description: "Cultivate sustained, focused awareness through meditation"
                    },
                    {
                        icon: Heart,
                        title: "Japa (Mantra Chanting)",
                        description: "Repetitive chanting of sacred mantras for focus and connection"
                    },
                    {
                        icon: Clock,
                        title: "Daily Sadhana",
                        description: "Structured daily spiritual routine for consistent growth"
                    },
                    {
                        icon: ArrowRight,
                        title: "Self-Inquiry",
                        description: "Direct investigation into the nature of the self"
                    }
                ]}
            />

            {/* Practices Section */}
            <PracticesSection
                title="Essential Practices for Spiritual Growth"
                description="Discover the practices that have transformed countless lives"
            />

            {/* FAQ Section */}
            <FAQSection
                title="Frequently Asked Questions About Spiritual Practices"
                faqs={[
                    {
                        question: "What is the best practice for beginners?",
                        answer: "Start with simple meditation (dhyana) and mantra chanting (japa). These foundational practices build focus and create a solid base for deeper exploration."
                    },
                    {
                        question: "How much time should I dedicate to practice?",
                        answer: "Even 10-15 minutes daily can make a significant difference. Consistency is more important than duration. Start small and gradually increase as you build the habit."
                    },
                    {
                        question: "Do I need special equipment or setup?",
                        answer: "No special equipment is needed. A quiet space where you won't be disturbed is sufficient. The practices work with what you have and focus on the inner experience."
                    },
                    {
                        question: "How do I know if I'm making progress?",
                        answer: "Progress is often subtle and internal. Look for increased clarity, reduced stress, better focus, and a deeper sense of peace. The journey is personal and unfolds at its own pace."
                    }
                ]}
            />

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 py-16">
                <div className="container-padding max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">
                        Start Your Daily Spiritual Practice Today
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Choose a practice that resonates with you and begin your journey of self-discovery
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/practices/japa">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Learn Japa Meditation
                            </Button>
                        </Link>
                        <Link to="/practices/dhyana">
                            <Button variant="outline" size="lg">
                                Explore Meditation
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}