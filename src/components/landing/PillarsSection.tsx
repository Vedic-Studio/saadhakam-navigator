import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Scroll, History, Sparkles } from "lucide-react";

// Using verified asset paths from previous search
const PILLARS = [
    {
        id: 1,
        number: "01",
        title: "Wisdom of Ancient Civilization",
        description: "Sanatan Dharma is not just a religion, but the accumulated wisdom of one of humanity's oldest continuous civilizations. It offers a sophisticated framework for understanding the universe, from atomic theory (Vaisheshika) to the nature of consciousness (Vedanta).",
        icon: History,
        color: "bg-amber-500/10 text-amber-500",
        image: "/assets/generated/ancient_temple_shiva_1770394209985.png"
    },
    {
        id: 2,
        number: "02",
        title: "Sanskrit: The Perfect Language",
        description: "Discover the precision of Sanskrit. More than a language, it is a perfectly structured system of sound and vibration designed to resonate with the laws of nature. Every syllable has a precise effect on the mind and body.",
        icon: Scroll,
        color: "bg-indigo-500/10 text-indigo-400",
        image: "/assets/generated/sanskrit_scroll_v2_1770394373001.png"
    },
    {
        id: 3,
        number: "03",
        title: "History, Not Mythology",
        description: "We honor the Itihasa—Ramayana and Mahabharata—as historical records of great epochs. These are not mere stories, but accounts of our ancestors, full of practical governance, military strategy, and dharmic leadership.",
        icon: BookOpen,
        color: "bg-emerald-500/10 text-emerald-500",
        image: "/assets/generated/history_warrior_v2_1770394411156.png"
    },
    {
        id: 4,
        number: "04",
        title: "Living the Wisdom",
        description: "Philosophy must be lived. Through Shlokas, Sadhana, and connection to authentic Lineages (Sampradayas), we transform intellectual knowledge into realized experience. This is the path of the Sadhaka.",
        icon: Sparkles,
        color: "bg-rose-500/10 text-rose-500",
        image: "/assets/generated/meditating_sage_v2_1770394394352.png"
    }
];

export function PillarsSection() {
    return (
        <section className="section-padding bg-background relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-background to-background pointer-events-none" />

            <div className="container-padding mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-24 md:mb-32">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/5">
                        Our Foundation
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                        Four Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">Sadhaka</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-6" />
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A grounded approach to exploring the depths of Sanatan Dharma, moving beyond misconceptions to the core of the tradition.
                    </p>
                </div>

                <div className="space-y-32 md:space-y-40">
                    {PILLARS.map((pillar, index) => (
                        <div key={pillar.id} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                            {/* Image/Visual Content - Large & Cinematic */}
                            <div className="flex-1 w-full relative group perspective-1000">
                                <div className={`absolute inset-0 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 rounded-3xl transform ${index % 2 === 0 ? '-rotate-2' : 'rotate-2'} scale-105 group-hover:scale-110 transition-transform duration-700 blur-xl opacity-50`} />

                                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-2xl border border-white/10 group-hover:shadow-amber-900/20 transition-all duration-500">
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
                                    <Button variant="link" className="text-amber-400 hover:text-amber-300 p-0 h-auto text-lg font-medium group">
                                        Discover more <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
