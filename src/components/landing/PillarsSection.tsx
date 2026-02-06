import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Scroll, History, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// TODO: Replace with actual images from assets/generated images
const PILLARS = [
    {
        id: 1,
        number: "01",
        title: "Wisdom of the Ancient Civilization",
        description: "Sanatan Dharma is not just a religion, but the accumulated wisdom of one of humanity's oldest continuous civilizations. It offers a sophisticated framework for understanding the universe and our place within it.",
        icon: History,
        color: "bg-amber-100 text-amber-600",
        image: "/assets/generated/ancient_temple_shiva_1770394209985.png"
    },
    {
        id: 2,
        number: "02",
        title: "Sanskrit: An Advanced Language",
        description: "Discover the precision of Sanskrit. More than a language, it is a perfectly structured system of sound and vibration designed to resonate with the laws of nature and consciousness.",
        icon: Scroll,
        color: "bg-indigo-100 text-indigo-600",
        image: "/assets/generated/sanskrit_scroll_v2_1770394373001.png"
    },
    {
        id: 3,
        number: "03",
        title: "History, Not Mythology",
        description: "We honor the Itihasa—Ramayana and Mahabharata—as historical records of great epochs, kings, and civilizations. These are accounts of our ancestors, full of practical governance, strategy, and dharma.",
        icon: BookOpen,
        color: "bg-emerald-100 text-emerald-600",
        image: "/assets/generated/history_warrior_v2_1770394411156.png"
    },
    {
        id: 4,
        number: "04",
        title: "Living the Wisdom",
        description: "Philosophy must be lived. Through Shlokas, Sadhana, and connection to authentic Lineages (Sampradayas), we transform intellectual knowledge into realized experience.",
        icon: Sparkles,
        color: "bg-rose-100 text-rose-600",
        image: "/assets/generated/meditating_sage_v2_1770394394352.png"
    }
];

export function PillarsSection() {
    return (
        <section className="section-padding bg-muted/30 relative overflow-hidden">
            <div className="container-padding mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
                        Our Foundation
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Four Pillars of <span className="text-gold">Saadhakam</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A grounded approach to exploring the depths of Sanatan Dharma, moving beyond misconceptions to the core of the tradition.
                    </p>
                </div>

                <div className="space-y-24 md:space-y-32">
                    {PILLARS.map((pillar, index) => (
                        <div key={pillar.id} className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Text Content */}
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="numbered-heading text-8xl md:text-9xl opacity-20 select-none absolute -translate-y-12 -translate-x-6 z-0">
                                        {pillar.number}
                                    </span>
                                    <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center relative z-10 shadow-sm`}>
                                        <pillar.icon className="w-6 h-6" />
                                    </div>
                                </div>

                                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground relative z-10">
                                    {pillar.title}
                                </h3>

                                <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
                                    {pillar.description}
                                </p>

                                <div className="pt-4 relative z-10">
                                    <Button variant="link" className="text-primary p-0 h-auto font-semibold group">
                                        Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>

                            {/* Image/Visual Content */}
                            <div className="flex-1 w-full">
                                <div className="relative group perspective-1000">
                                    {/* Decorative backdrop */}
                                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl transform rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-500`} />

                                    {/* Main Image Container */}
                                    <div className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl floating-card bg-card border border-white/20">
                                        <img
                                            src={pillar.image}
                                            alt={pillar.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
