import { useStickyScroll } from "@/hooks/useStickyScroll";
import { cn } from "@/lib/utils";
import { BookOpen, Mic, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";

const CAPABILITIES = [
    {
        id: "study",
        step: "01",
        title: "Study the Shastras",
        description: "Ask Sutra about any verse from the Bhagavad Gita, Upanishads, or Puranas. Get word-by-word breakdowns with authentic commentary references.",
        icon: BookOpen,
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        id: "learn",
        step: "02",
        title: "Learn Shlokas",
        description: "Master pronunciation and memorization. Sutra listens to you recite and provides real-time feedback on your intonation and accuracy.",
        icon: Mic,
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        id: "practice",
        step: "03",
        title: "Guided Sadhana",
        description: "From simple breathwork (Pranayama) to complex Tantric meditations. Safe, structured, and customized to your level and lineage.",
        icon: Sparkles,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
    },
    {
        id: "progress",
        step: "04",
        title: "Track Progress",
        description: "A spiritual dashboard that tracks your consistency, insights gained, and texts completed. Watch your inner garden grow.",
        icon: TrendingUp,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    }
];

const StudyMockup = () => (
    <div className="space-y-6">
        <div className="bg-black/40 rounded-xl p-6 border border-white/10">
            <p className="font-sanskrit text-2xl text-center mb-2">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन</p>
            <p className="text-center text-muted-foreground text-sm">Chapter 2, Verse 47</p>
        </div>
        <div className="space-y-3">
            {[
                { sanskrit: "karmani", meaning: "In duty" },
                { sanskrit: "eva", meaning: "only" },
                { sanskrit: "adhikara", meaning: "right" },
                { sanskrit: "te", meaning: "your" }
            ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                    <span className="font-medium text-orange-200">{item.sanskrit}</span>
                    <span className="text-muted-foreground">{item.meaning}</span>
                </div>
            ))}
        </div>
    </div>
);

const LearnMockup = () => (
    <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-purple-500/30 flex items-center justify-center bg-purple-900/20">
                <Mic className="w-12 h-12 text-purple-400" />
            </div>
            <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-ping opacity-20" />
        </div>
        <div className="text-center space-y-2">
            <h4 className="text-xl font-medium text-white">Listening...</h4>
            <div className="flex items-center justify-center gap-2 text-green-400 bg-green-900/20 px-4 py-2 rounded-full border border-green-900/50">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm">Perfect intonation</span>
            </div>
        </div>
    </div>
);

const PracticeMockup = () => (
    <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-emerald-100">Nadi Shodhana</span>
            </div>
            <span className="text-xs bg-emerald-900/40 text-emerald-300 px-2 py-1 rounded border border-emerald-500/20">10:00</span>
        </div>
        <div className="h-40 flex items-end justify-center gap-1 opacity-80">
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="w-2 bg-emerald-500/40 rounded-t-sm"
                    style={{ height: `${30 + (i % 5) * 15}%` }}
                />
            ))}
        </div>
        <div className="p-4 bg-emerald-900/10 rounded-xl border border-emerald-500/10 text-center">
            <p className="text-emerald-100/80 italic text-sm">"Inhale deeply through the left nostril..."</p>
        </div>
    </div>
);

const ProgressMockup = () => (
    <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-500/20 flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold text-blue-100">12</span>
            <span className="text-xs text-blue-300/70 uppercase tracking-widest">Day Streak</span>
        </div>
        <div className="bg-blue-900/10 p-4 rounded-xl border border-blue-500/20 flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold text-blue-100">4</span>
            <span className="text-xs text-blue-300/70 uppercase tracking-widest">Texts Read</span>
        </div>
        <div className="col-span-2 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-5 rounded-xl border border-white/5">
            <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-white">Sadhana Intensity</span>
                <span className="text-xs text-muted-foreground">High</span>
            </div>
            <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full w-[75%]" />
            </div>
        </div>
    </div>
);

const MOCKUPS = [StudyMockup, LearnMockup, PracticeMockup, ProgressMockup];

export function SutraCapabilities() {
    const { containerRef, activeSection } = useStickyScroll({
        sectionCount: CAPABILITIES.length,
    });

    return (
        <section ref={containerRef} className="relative bg-background" style={{ height: '400vh' }}>
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-10">
                <div className="container-padding mx-auto w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-center h-full">

                    {/* LEFT: Navigation */}
                    <div className="flex flex-col justify-center h-full z-10">
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-12 leading-tight text-white">
                            Your Spiritual Journey, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Guided Step by Step</span>
                        </h2>

                        <div className="flex flex-col gap-6 relative pl-4">
                            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-white/10" />

                            {CAPABILITIES.map((cap, index) => {
                                const isActive = activeSection === index;
                                return (
                                    <div
                                        key={cap.id}
                                        className={cn(
                                            "flex items-center gap-6 relative z-10 transition-all duration-500",
                                            isActive ? "opacity-100 translate-x-2" : "opacity-40"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2 transition-all duration-300 bg-background shrink-0",
                                            isActive ? cn("border-transparent text-white shadow-lg scale-110", cap.bg) : "border-white/10 text-muted-foreground"
                                        )}>
                                            {isActive ? <cap.icon className="w-6 h-6" /> : cap.step}
                                        </div>

                                        <div className="pt-1">
                                            <h3 className={cn("text-2xl font-display font-medium", isActive ? "text-white" : "text-muted-foreground/80")}>
                                                {cap.title}
                                            </h3>
                                            {isActive && (
                                                <p className="text-sm text-muted-foreground mt-1 max-w-sm line-clamp-2 animate-fade-in">
                                                    {cap.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT: Mockup */}
                    <div className="z-10 h-[600px] w-full max-w-md mx-auto relative perspective-1000">
                        <div className="bg-card/20 border border-white/5 rounded-[2.5rem] p-4 h-full w-full shadow-2xl relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute inset-0 border-[8px] border-black/20 rounded-[2.5rem] pointer-events-none z-20" />
                            <div className="h-full w-full bg-background/50 rounded-[2rem] overflow-hidden relative">
                                {CAPABILITIES.map((cap, index) => {
                                    const isActive = activeSection === index;
                                    const MockupComponent = MOCKUPS[index];

                                    return (
                                        <div
                                            key={cap.id}
                                            className={cn(
                                                "absolute inset-0 flex flex-col p-8 transition-all duration-700 ease-in-out",
                                                isActive
                                                    ? "opacity-100 translate-y-0 scale-100"
                                                    : index < activeSection
                                                        ? "opacity-0 -translate-y-16 scale-95"
                                                        : "opacity-0 translate-y-16 scale-95"
                                            )}
                                            style={{
                                                zIndex: isActive ? 10 : 0,
                                                pointerEvents: isActive ? 'auto' : 'none',
                                                visibility: isActive || Math.abs(index - activeSection) <= 1 ? 'visible' : 'hidden'
                                            }}
                                        >
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", cap.bg, cap.color)}>
                                                    <cap.icon className="w-5 h-5" />
                                                </div>
                                                <span className="font-semibold text-lg text-white">{cap.title}</span>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <MockupComponent />
                                            </div>
                                            <div className="mt-8 flex justify-center opacity-30">
                                                <div className="w-12 h-1 bg-white rounded-full" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
