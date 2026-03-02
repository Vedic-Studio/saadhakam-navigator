"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AncientCivilization() {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
            {/* Full-width Background Image with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/generated/ancient_civilization_abundance.png"
                    alt="Ancient Civilization Abundance"
                    className="w-full h-full object-cover transform scale-105 animate-pan-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-transparent mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
            </div>

            <div className="container-padding mx-auto max-w-7xl relative z-10 w-full h-full flex flex-col justify-end pb-24 lg:pb-32">
                <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-xs font-medium text-amber-200 uppercase tracking-widest">The Golden Age</span>
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                        History, Not Mythology
                    </h2>

                    <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-lg max-w-2xl mx-auto">
                        We bring this history to life — from the science of Sanskrit to the advanced governance of Ram Rajya.
                    </p>

                    <Link href="/traditions">
                        <Button className="bg-white text-black hover:bg-white/90 h-16 px-10 rounded-full text-lg font-medium shadow-2xl shadow-amber-900/40 transition-transform hover:scale-105">
                            Explore Our Heritage
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-white/10 pt-12 max-w-5xl mx-auto w-full">
                    {[
                        { label: "Years of History", value: "5000+" },
                        { label: "Documented Texts", value: "10,000+" },
                        { label: "Living Lineages", value: "50+" },
                        { label: "Active Temples", value: "2M+" }
                    ].map((stat, i) => (
                        <div key={i} className="text-center group cursor-default">
                            <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-2 group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
                            <div className="text-sm font-medium text-white/60 uppercase tracking-widest group-hover:text-amber-200 transition-colors">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
