import { useStickyScroll } from "@/hooks/useStickyScroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Map, Activity, Check } from "lucide-react";

const FEATURES = [
    {
        id: "pathfinder",
        title: "The Pathfinder",
        headline: <>Discover your <span className="text-rose-400">True Path</span></>,
        description: "Not sure where to start? Answer 7 simple questions about your nature (Samskaras) and life stage. Our algorithm recommends the perfect path for you, from Bhakti to Jnana.",
        icon: Compass,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
    },
    {
        id: "map",
        title: "Knowledge Map",
        headline: <>Navigate the <span className="text-cyan-400">Infinite</span></>,
        description: "Navigate the vast ocean of Sanatan Dharma. Visualize connections between 6 Philosophies, 4 Traditions, and thousands of texts. See how Vedanta connects to Yoga, or how Bhakti flows through the Epics.",
        icon: Map,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
    },
    {
        id: "practice",
        title: "Practice Tracker",
        headline: <>Turn Wisdom into <span className="text-emerald-400">Action</span></>,
        description: "Don't just read—do. Select daily Sadhanas, track your consistency, and move from intellectual understanding to direct experience. Build your streak and watch your inner garden bloom.",
        icon: Activity,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
    }
];

const PathfinderMockup = () => (
    <div className="w-full max-w-sm bg-card border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-orange-500" />
        <div className="mb-6">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Question 3 of 7</span>
            <h4 className="text-xl font-medium mt-2 leading-snug text-white">When you feel most connected to the divine, is it through...</h4>
        </div>
        <div className="space-y-3">
            {["Deep intellectual inquiry", "Emotional devotion & surrender", "Selfless service to others", "Disciplined meditation"].map((opt, i) => (
                <div key={i} className={cn("p-4 rounded-xl border cursor-pointer transition-all hover:bg-white/5", i === 1 ? "border-rose-500 bg-rose-500/10" : "border-white/10")}>
                    <div className="flex items-center gap-3">
                        <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", i === 1 ? "border-rose-500 bg-rose-500 text-white" : "border-gray-500")}>
                            {i === 1 && <Check className="w-3 h-3" />}
                        </div>
                        <span className={cn("text-sm", i === 1 ? "text-rose-100" : "text-muted-foreground")}>{opt}</span>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-6 flex justify-end">
            <Button size="sm" className="rounded-full bg-rose-600 hover:bg-rose-700">Next <ArrowRight className="ml-1 w-3 h-3" /></Button>
        </div>
    </div>
);

const KnowledgeMapMockup = () => (
    <div className="w-full max-w-sm aspect-square bg-card border border-white/10 rounded-2xl p-4 shadow-2xl relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-cyan-900/30 border border-cyan-500/50 flex items-center justify-center z-10 animate-pulse">
            <span className="font-bold text-cyan-200">Dharma</span>
        </div>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/50"
                style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translate(80px) rotate(-${deg}deg)` }}
            />
        ))}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <circle cx="50%" cy="50%" r="80" fill="none" stroke="currentColor" strokeDasharray="4 4" className="text-cyan-500" />
        </svg>
        <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md rounded-lg p-3 border border-white/10 text-xs">
            <span className="font-bold text-cyan-400 block mb-1">Vedanta</span>
            <span className="text-white/90">The end of the Vedas; one of the six orthodox schools of Hindu philosophy.</span>
        </div>
    </div>
);

const TrackerMockup = () => {
    const pattern = [1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 3, 1, 2];
    return (
        <div className="w-full max-w-sm bg-card border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest">Your Streak</span>
                    <div className="text-4xl font-bold text-white mt-1">12 <span className="text-lg font-normal text-emerald-400">Days</span></div>
                </div>
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Activity className="w-5 h-5" />
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 mb-6">
                {pattern.map((level, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-full aspect-square rounded-sm",
                            level === 1 ? "bg-white/5" : level === 2 ? "bg-emerald-500/20" : "bg-emerald-500/60"
                        )}
                    />
                ))}
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs text-white">AM</div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-white">Morning Chanting</div>
                        <div className="text-xs text-muted-foreground">15 mins • Completed</div>
                    </div>
                    <Check className="w-4 h-4 text-emerald-500" />
                </div>
            </div>
        </div>
    );
};

const MOCKUPS = [PathfinderMockup, KnowledgeMapMockup, TrackerMockup];

export function FeatureShowcase() {
    const { containerRef, activeSection } = useStickyScroll({
        sectionCount: FEATURES.length,
    });

    return (
        <section ref={containerRef} className="relative bg-background" style={{ height: '300vh' }}>
            <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-10">
                <div className="container-padding mx-auto w-full max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-24 items-center h-full py-20">

                    {/* LEFT: Text Content */}
                    <div className="flex flex-col justify-center h-full order-2 lg:order-1 relative z-10">
                        {FEATURES.map((feature, index) => {
                            const isActive = activeSection === index;
                            return (
                                <div
                                    key={feature.id}
                                    className={cn(
                                        "transition-all duration-500 max-w-lg",
                                        isActive
                                            ? "opacity-100 translate-y-0"
                                            : "opacity-0 translate-y-8 absolute pointer-events-none"
                                    )}
                                    style={{
                                        position: isActive ? 'relative' : 'absolute',
                                        zIndex: isActive ? 20 : 0,
                                        visibility: isActive ? 'visible' : 'hidden'
                                    }}
                                >
                                    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6", feature.bg, feature.color, "border-white/10")}>
                                        <feature.icon className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{feature.title}</span>
                                    </div>

                                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                                        {feature.headline}
                                    </h2>

                                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                                        {feature.description}
                                    </p>

                                    <Button variant="outline" size="lg" className="rounded-full border-white/10 hover:bg-white/5 text-white">
                                        Explore {feature.title} <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            );
                        })}
                    </div>

                    {/* RIGHT: Mockups */}
                    <div className="order-1 lg:order-2 flex items-center justify-center relative h-full z-10">
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                            <div className={cn(
                                "absolute inset-0 blur-[100px] transition-colors duration-1000",
                                FEATURES[activeSection]?.bg.replace("/10", "/30") || "bg-rose-500/30"
                            )} />

                            {FEATURES.map((feature, index) => {
                                const isActive = activeSection === index;
                                const MockupComponent = MOCKUPS[index];
                                return (
                                    <div
                                        key={feature.id}
                                        className={cn(
                                            "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out transform",
                                            isActive
                                                ? "opacity-100 scale-100 rotate-0"
                                                : index < activeSection
                                                    ? "opacity-0 scale-95 -rotate-6"
                                                    : "opacity-0 scale-95 rotate-6"
                                        )}
                                        style={{
                                            zIndex: isActive ? 20 : 0,
                                            pointerEvents: isActive ? 'auto' : 'none',
                                            visibility: isActive || Math.abs(index - activeSection) <= 1 ? 'visible' : 'hidden'
                                        }}
                                    >
                                        <MockupComponent />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
