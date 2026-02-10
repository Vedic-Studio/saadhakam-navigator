import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Leaf } from "lucide-react";

export function ConversionSectionVariantE() {
    return (
        <section className="relative py-32 overflow-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-900/5 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-glow opacity-50 pointer-events-none" />

            {/* Decorative Circles */}
            <div className="absolute top-1/2 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
            <div className="absolute top-1/2 right-10 w-64 h-64 bg-green-900/10 rounded-full blur-[80px]" />

            <div className="container-padding mx-auto max-w-4xl relative z-10 text-center">
                <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-400">Find Peace in a Chaotic World</span>
                </h2>

                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                    Start your journey with <span className="text-foreground font-semibold">Sadhaka</span> today.
                    <br className="hidden md:block" />
                    Discover the ancient practices that bring inner peace and emotional healing.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/pathfinder">
                        <Button size="lg" className="h-16 px-10 rounded-full text-lg bg-green-600 text-green-50 hover:bg-green-700 shadow-2xl shadow-green-900/20 hover:scale-105 transition-transform duration-300">
                            Find Inner Peace
                            <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </Link>

                    <Link to="/download">
                        <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg border-white/10 hover:bg-white/5 hover:text-foreground text-muted-foreground transition-colors">
                            <Download className="mr-2 w-5 h-5" />
                            Download App
                        </Button>
                    </Link>
                </div>

                <p className="mt-8 text-sm text-muted-foreground/60">
                    Free forever for seekers. Premium features available.
                </p>

                {/* Healing Trust Indicators */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
                    <div className="flex items-center gap-3">
                        <Leaf className="w-6 h-6 text-green-400" />
                        <span className="text-sm font-medium text-green-200">Emotional Healing</span>
                    </div>
                    <div className="w-px h-6 bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-3">
                        <span className="text-xl">😌</span>
                        <span className="text-sm font-medium text-green-200">Mental Clarity</span>
                    </div>
                    <div className="w-px h-6 bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-3">
                        <span className="text-xl">🧘</span>
                        <span className="text-sm font-medium text-green-200">Stress Reduction</span>
                    </div>
                </div>
            </div>
        </section>
    );
}