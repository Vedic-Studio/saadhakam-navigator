import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, MessageSquare, Heart } from "lucide-react";

export function HeroSectionVariantB() {
    return (
        <section className="relative min-h-screen flex items-center bg-background overflow-hidden pt-20">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/40 via-background to-background" />

            {/* Ambient glow */}
            <div className="absolute top-20 left-[10%] w-72 h-72 bg-secondary/5 rounded-full blur-[100px] animate-pulse-slow" />
            <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-float" />

            <div className="container-padding relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-12">

                {/* LEFT: Text Content */}
                <div className="space-y-8 text-center lg:text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in">
                        <Heart className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-medium text-rose-200 uppercase tracking-widest">Divine Grace</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight animate-fade-up">
                        Connect with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-400 to-rose-200">Divine Grace</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                        Invasions came. Empires fell. Libraries burned. Yet this wisdom survived — because it was never just written. It was lived. Practiced. Transmitted from Guru to Shishya through the unbroken chain of Divine Grace.
                    </p>

                    {/* Call to Action */}
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
                        <Link href="/faith-finder">
                            <Button size="lg" className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white border-0 h-14 px-8 rounded-full text-lg font-medium shadow-lg shadow-rose-900/20 transition-all hover:scale-105">
                                Experience the Grace
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-white/10 hover:bg-white/5 text-foreground hover:text-white backdrop-blur-sm">
                            Learn More
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 opacity-60 animate-fade-in" style={{ animationDelay: "0.6s" }}>
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🙏</span>
                            <span className="text-sm font-medium uppercase tracking-wider">Divine Connection</span>
                        </div>
                        <div className="w-px h-6 bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🕉️</span>
                            <span className="text-sm font-medium uppercase tracking-wider">Sacred Lineage</span>
                        </div>
                        <div className="w-px h-6 bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2">
                            <span className="text-xl">✨</span>
                            <span className="text-sm font-medium uppercase tracking-wider">Grace Transmission</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Heritage Image + Chat Window Overlay */}
                <div className="relative hidden lg:block animate-fade-up" style={{ animationDelay: "0.3s" }}>
                    {/* Background Heritage Image */}
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/10">
                        <img
                            src="/assets/generated/media__1770391240353.png"
                            alt="Divine Grace Visualization"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />

                        {/* Chat Window Overlay */}
                        <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-5 border border-white/10 bg-black/60 backdrop-blur-xl animate-float">
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-rose-400" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">Sadhaka AI</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online • Divine Guide
                                    </p>
                                </div>
                            </div>

                            {/* Chat Message */}
                            <div className="space-y-3">
                                <div className="bg-white/5 text-white rounded-xl rounded-tl-sm py-3 px-4 border border-white/5">
                                    <p className="text-xs text-rose-300/80 mb-1 font-sanskrit">श्री गुरुभ्यो नमः</p>
                                    <p className="text-sm leading-relaxed opacity-90">
                                        "The Guru is not just a teacher, but the living embodiment of the Divine Grace that flows through the unbroken lineage. When you connect with the lineage, you connect with the source of all wisdom."
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-2">— Sacred Transmission</p>
                                </div>
                            </div>

                            {/* Input Mockup */}
                            <div className="mt-4 flex items-center gap-2">
                                <div className="flex-1 bg-white/5 rounded-full py-2.5 px-4 text-sm text-muted-foreground border border-white/5">
                                    Ask about Divine Grace or sacred lineage...
                                </div>
                                <Button size="icon" className="rounded-full bg-rose-600 hover:bg-rose-700 shrink-0">
                                    <MessageSquare className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Background glow */}
                    <div className="absolute inset-0 bg-rose-500/10 blur-[80px] -z-10 translate-y-8" />
                </div>

            </div>
        </section>
    );
}