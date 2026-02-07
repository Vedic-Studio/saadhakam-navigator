import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AncientCivilization() {
    return (
        <section className="relative py-24 overflow-hidden">
            <div className="container-padding mx-auto max-w-7xl">
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] group">
                    {/* Main Cinematic Image */}
                    <img
                        src="/assets/generated/ancient_civilization_abundance.png"
                        alt="Ancient Civilization Abundance"
                        className="w-full h-full object-cover transform transition-transform duration-[2000ms] group-hover:scale-105"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                    {/* Content Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
                                <span className="text-xs font-medium text-amber-400 uppercase tracking-widest">The Golden Age</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 shadow-lg">
                                History, Not Mythology
                            </h2>
                            <p className="text-lg text-white/80 leading-relaxed shadow-md">
                                Sanatan Dharma represents the accumulated wisdom of one of humanity's oldest continuous civilizations.
                                We bring this history to life — from the science of Sanskrit to the advanced governance of Ram Rajya.
                            </p>
                        </div>

                        <Button className="shrink-0 bg-white text-black hover:bg-white/90 h-14 px-8 rounded-full text-lg shadow-xl shadow-black/50">
                            Explore Our Heritage
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Stats Bar below image */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {[
                        { label: "Years of History", value: "5000+" },
                        { label: "Documented Texts", value: "10,000+" },
                        { label: "Living Lineages", value: "50+" },
                        { label: "Active Temples", value: "2M+" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-card/30 border border-white/5 rounded-2xl p-6 text-center hover:bg-card/50 transition-colors">
                            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
