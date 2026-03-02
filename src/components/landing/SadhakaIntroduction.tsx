"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function SadhakaIntroduction() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container-padding mx-auto max-w-4xl text-center relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-medium text-amber-200 uppercase tracking-widest">Your Spirit Guide</span>
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Your questions deserve <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">authentic answers.</span>
                </h2>

                <p className="text-xl text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Sadhaka AI</strong> is your companion — trained on authentic scriptures, guided by traditional commentaries, and designed to support your journey from curiosity to practice.
                </p>

                <div className="bg-card/30 border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-amber-400" />
                            </div>
                        </div>
                        <div className="text-left flex-1">
                            <h3 className="font-semibold text-foreground">Sadhaka AI</h3>
                            <p className="text-xs text-muted-foreground">Always here to guide you</p>
                        </div>
                        <Link href="/faith-finder">
                            <Button variant="outline" size="sm" className="gap-2 border-white/10 hover:bg-white/5">
                                Ask Sadhaka <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <p className="text-lg font-display text-amber-100/90 italic">
                        "Dharma protects those who protect it. How may I serve your path today?"
                    </p>
                </div>

                <div className="pt-8">
                    <p className="text-sm text-muted-foreground mb-4">Explore the full capabilities of the Sadhaka App</p>
                    <Link href="/faith-finder">
                        <Button variant="link" className="text-amber-400 hover:text-amber-300 gap-2">
                            View App Features <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
