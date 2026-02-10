import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Scroll, History, Sparkles, Star, Compass, Trophy } from "lucide-react";

// Using verified asset paths from previous search
const PILLARS = [
    {
        id: 1,
        number: "01",
        title: "Master Guidance",
        description: "Connect with the wisdom of enlightened masters who have walked this path. Their guidance can accelerate your spiritual journey and help you avoid common pitfalls.",
        icon: Star,
        color: "bg-violet-500/10 text-violet-500",
        image: "/assets/generated/media__1770391240368.png"
    },
    {
        id: 2,
        number: "02",
        title: "Lineage Wisdom",
        description: "The unbroken chain of transmission from the Rishis to today. Each master in the lineage carries the accumulated wisdom of thousands of years of practice.",
        icon: Compass,
        color: "bg-purple-500/10 text-purple-400",
        image: "/assets/generated/media__1770391240370.png"
    },
    {
        id: 3,
        number: "03",
        title: "Divine Transmission",
        description: "The masters are not just teachers, but channels for divine energy. Their guidance can awaken dormant potentials and accelerate your spiritual growth.",
        icon: Trophy,
        color: "bg-indigo-500/10 text-indigo-500",
        image: "/assets/generated/meditating_sage_v2_1770394394352.png"
    },
    {
        id: 4,
        number: "04",
        title: "Accelerated Path",
        description: "With proper guidance, you can progress much faster on your spiritual journey. The masters provide the roadmap and support for your transformation.",
        icon: Sparkles,
        color: "bg-blue-500/10 text-blue-500",
        image: "/assets/generated/ancient_temple_shiva_1770394209985.png"
    }
];

export function PillarsSectionVariantD() {
    return (
        <section className="section-padding bg-background relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-950/20 via-background to-background pointer-events-none" />

            <div className="container-padding mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-24 md:mb-32">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-violet-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/5">
                        Master Guidance Foundation
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-400">Path of the Masters</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent mx-auto mb-6" />
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Journey with the guidance of enlightened masters who have already walked this path and achieved realization.
                    </p>
                </div>

                <div className="space-y-32 md:space-y-40">
                    {PILLARS.map((pillar, index) => (
                        <div key={pillar.id} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Image/Visual Content - Large & Cinematic */}
                            <div className="flex-1 w-full relative group perspective-1000">
                                <div className={`absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-3xl transform ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'} scale-105 group-hover:scale-110 transition-transform duration-700 blur-xl opacity-50`} />

                                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-2xl border border-white/10 group-hover:shadow-violet-900/20 transition-all duration-500">
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
                                    <Button variant="link" className="text-violet-400 hover:text-violet-300 p-0 h-auto text-lg font-medium group">
                                        Connect with Masters <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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