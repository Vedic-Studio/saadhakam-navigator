import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Scroll, History, Sparkles, Beaker, Brain, ChartLine } from "lucide-react";

// Using verified asset paths from previous search
const PILLARS = [
    {
        id: 1,
        number: "01",
        title: "The Science of Sanskrit",
        description: "Sanskrit is not just a language—it's a perfectly structured system of sound and vibration designed to resonate with the laws of nature. Each syllable has a precise effect on the mind and body, validated by modern psycho-acoustic research.",
        icon: Beaker,
        color: "bg-cyan-500/10 text-cyan-500",
        image: "/assets/generated/media__1770391152595.png"
    },
    {
        id: 2,
        number: "02",
        title: "Cymatics & Mantra",
        description: "Discover how ancient mantras create visible patterns in water and sand (Cymatics). The same principles that govern sound waves in the universe are encoded in the sacred syllables of the Vedas.",
        icon: ChartLine,
        color: "bg-blue-500/10 text-blue-400",
        image: "/assets/generated/media__1770391152605.png"
    },
    {
        id: 3,
        number: "03",
        title: "Neuroscience of Meditation",
        description: "Modern brain imaging shows that practices like mantra meditation and pranayama create measurable changes in brain structure and function. The ancient Rishis discovered what science is only now validating.",
        icon: Brain,
        color: "bg-indigo-500/10 text-indigo-400",
        image: "/assets/generated/media__1770391152610.png"
    },
    {
        id: 4,
        number: "04",
        title: "Quantum Consciousness",
        description: "Explore how the principles of quantum physics align with Vedic concepts of consciousness. The ancient understanding of reality as vibration and energy is now being confirmed by cutting-edge science.",
        icon: Sparkles,
        color: "bg-purple-500/10 text-purple-500",
        image: "/assets/generated/media__1770391240351.png"
    }
];

export function PillarsSectionVariantA() {
    return (
        <section className="section-padding bg-background relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-background to-background pointer-events-none" />

            <div className="container-padding mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-24 md:mb-32">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-cyan-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/5">
                        Scientific Foundation
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">Science of Dharma</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mb-6" />
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Grounded in ancient wisdom and validated by modern science. Explore the measurable effects of spiritual practice.
                    </p>
                </div>

                <div className="space-y-32 md:space-y-40">
                    {PILLARS.map((pillar, index) => (
                        <div key={pillar.id} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Image/Visual Content - Large & Cinematic */}
                            <div className="flex-1 w-full relative group perspective-1000">
                                <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl transform ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'} scale-105 group-hover:scale-110 transition-transform duration-700 blur-xl opacity-50`} />

                                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-2xl border border-white/10 group-hover:shadow-cyan-900/20 transition-all duration-500">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                    <img
                                        src={pillar.image}
                                        alt={pillar.title}
                                        className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 space-y-8">
                                <div className="flex items-center gap-6 mb-4">
                                    <span className="font-display text-6xl md:text-8xl font-bold text-white/5 select-none absolute -translate-y-8 -translate-x-8 z-0">
                                        {pillar.number}
                                    </span>
                                    <div className={`w-16 h-16 rounded-2xl ${pillar.color} flex items-center justify-center relative z-10 shadow-lg border border-white/5 backdrop-blur-sm`}>
                                        <pillar.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground relative z-10 leading-tight">
                                        {pillar.title}
                                    </h3>
                                </div>

                                <p className="text-xl text-muted-foreground leading-relaxed relative z-10 pl-2 border-l-2 border-white/10">
                                    {pillar.description}
                                </p>

                                <div className="pt-6 relative z-10">
                                    <Button variant="link" className="text-cyan-400 hover:text-cyan-300 p-0 h-auto text-lg font-medium group">
                                        Explore the research <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}