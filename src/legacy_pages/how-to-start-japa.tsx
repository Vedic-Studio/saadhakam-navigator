import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Circle, Heart, Clock } from "lucide-react";
import { HeroSection } from "@/components/landing/HeroSection";

export default function HowToStartJapa() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <HeroSection />

            {/* Article Header */}
            <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
                <div className="container-padding">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
                            <Heart className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-medium text-amber-200 uppercase tracking-widest">Meditation Practice</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                            How to Start Japa Meditation: Complete Guide
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Repetitive chanting of sacred mantras, often with a mala (prayer beads)
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>10-30 minutes daily</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Circle className="w-4 h-4" />
                                <span>For beginners and advanced practitioners</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-white">
                <div className="container-padding max-w-4xl mx-auto">
                    <div className="prose prose-lg prose-amber mx-auto">
                        <h2 className="text-3xl font-bold text-foreground mb-6">What is Japa Meditation?</h2>
                        <p className="text-lg text-muted-foreground mb-6">
                            Japa is the meditative repetition of a mantra or divine name. Using a mala of 108 beads, practitioners count repetitions while focusing the mind on the sacred sound. It can be done aloud (vaikhari), whispered (upamshu), or mentally (manasika).
                        </p>

                        <h3 className="text-2xl font-bold text-foreground mb-6">Why Practice Japa?</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Calms and Focuses the Mind</h4>
                                <p className="text-muted-foreground">
                                    The repetitive nature of japa helps quiet the mental chatter and brings the mind to a state of focused awareness.
                                </p>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Deepens Connection with the Divine</h4>
                                <p className="text-muted-foreground">
                                    Chanting sacred mantras creates a direct connection with the divine energy and consciousness.
                                </p>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Purifies Subtle Energies</h4>
                                <p className="text-muted-foreground">
                                    The vibration of sacred sounds helps purify the mind, body, and subtle energy fields.
                                </p>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-xl font-semibold text-foreground mb-3">Creates Meditative Momentum</h4>
                                <p className="text-muted-foreground">
                                    Regular japa practice builds momentum for deeper meditation and spiritual growth.
                                </p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6">Getting Started: Step by Step</h3>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">Step 1: Choose Your Mantra</h4>
                                <p className="text-muted-foreground mb-4">
                                    Select a mantra that resonates with you. Common choices include:
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-amber-200 rounded-lg p-4">
                                        <h5 className="font-semibold text-amber-700 mb-2">Om Namah Shivaya</h5>
                                        <p className="text-sm text-muted-foreground">
                                            "I bow to Shiva" - For purification and transformation
                                        </p>
                                    </div>
                                    <div className="bg-white border border-amber-200 rounded-lg p-4">
                                        <h5 className="font-semibold text-amber-700 mb-2">Om</h5>
                                        <p className="text-sm text-muted-foreground">
                                            The primordial sound - For universal consciousness
                                        </p>
                                    </div>
                                    <div className="bg-white border border-amber-200 rounded-lg p-4">
                                        <h5 className="font-semibold text-amber-700 mb-2">So Ham</h5>
                                        <p className="text-sm text-muted-foreground">
                                            "I am that" - For self-realization
                                        </p>
                                    </div>
                                    <div className="bg-white border border-amber-200 rounded-lg p-4">
                                        <h5 className="font-semibold text-amber-700 mb-2">Ram</h5>
                                        <p className="text-sm text-muted-foreground">
                                            Name of Rama - For peace and devotion
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">Step 2: Prepare Your Space</h4>
                                <p className="text-muted-foreground mb-4">
                                    Create a peaceful environment conducive to meditation:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Find a quiet place where you won't be disturbed</li>
                                    <li>Sit comfortably on a chair or cushion</li>
                                    <li>Have your mala (prayer beads) ready</li>
                                    <li>Set a timer for your practice session</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">Step 3: Set Up Your Mala</h4>
                                <p className="text-muted-foreground mb-4">
                                    Learn how to use your japa mala properly:
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">1.</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                Hold the mala in your right hand, with the meru (main bead) between your index finger and thumb
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">2.</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                Start from the bead next to the meru and move one bead per repetition
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">3.</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                When you reach the meru, turn the mala around and continue in the opposite direction
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">4.</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                Complete 108 repetitions (one round) or as many as you're comfortable with
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">Step 4: Begin Your Practice</h4>
                                <p className="text-muted-foreground mb-4">
                                    Follow these steps to start your japa meditation:
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">•</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                <strong>Position:</strong> Sit upright with a straight spine, hands resting on your lap
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">•</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                <strong>Breathing:</strong> Take a few deep breaths to center yourself
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">•</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                <strong>Chanting:</strong> Begin chanting your mantra, moving one bead per repetition
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">•</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                <strong>Focus:</strong> Keep your attention on the mantra and the feeling it creates
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-amber-600 font-semibold">•</span>
                                        <div>
                                            <p className="text-muted-foreground">
                                                <strong>Duration:</strong> Start with 10-15 minutes and gradually increase
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xl font-semibold text-foreground mb-4">Step 5: Establish a Routine</h4>
                                <p className="text-muted-foreground mb-4">
                                    Consistency is key to experiencing the benefits of japa meditation:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Practice at the same time each day (morning is ideal)</li>
                                    <li>Start with shorter sessions and gradually increase duration</li>
                                    <li>Be patient and don't force results - let the practice unfold naturally</li>
                                    <li>Keep a journal to track your experiences and progress</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Tips for Successful Japa Practice</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">For Beginners</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Start with 1-2 rounds (108-216 repetitions)</li>
                                    <li>Choose a simple, meaningful mantra</li>
                                    <li>Focus on the feeling rather than perfect pronunciation</li>
                                    <li>Be consistent rather than intense</li>
                                </ul>
                            </div>

                            <div className="bg-amber-50 rounded-lg p-6">
                                <h4 className="text-lg font-semibold text-foreground mb-3">Advanced Practices</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                    <li>Increase to 5-10 rounds gradually</li>
                                    <li>Try different speeds and intensities</li>
                                    <li>Combine with breath awareness</li>
                                    <li>Practice in silence for deeper focus</li>
                                </ul>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-foreground mb-6 mt-12">Common Challenges and Solutions</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-red-600 text-sm font-semibold">!</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Mind Wandering</h4>
                                    <p className="text-muted-foreground">
                                        Gently bring your attention back to the mantra without judgment. This is normal and part of the process.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-red-600 text-sm font-semibold">!</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Physical Discomfort</h4>
                                    <p className="text-muted-foreground">
                                        Adjust your posture. Use cushions or chairs if needed. Comfort is important for maintaining focus.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-red-600 text-sm font-semibold">!</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground mb-2">Impatience</h4>
                                    <p className="text-muted-foreground">
                                        Trust the process. Japa is a lifetime practice, not a quick fix. Enjoy the journey of consistent effort.
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
                        Ready to Begin Your Japa Journey?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Start your daily meditation practice and experience the transformative power of mantra chanting
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/practices/japa">
                            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white">
                                Learn More About Japa
                            </Button>
                        </Link>
                        <Link to="/practices/meditation">
                            <Button variant="outline" size="lg">
                                Explore Other Practices
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}