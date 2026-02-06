import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Compass, Map, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const FEATURES = [
    {
        id: "pathfinder",
        step: "01",
        label: "Discover",
        title: "Find your path in seconds",
        description: "Answer a few deep questions about your nature (Samskaras) and let the Pathfinder algorithm suggest the philosophies and practices that align with your Svabhava.",
        icon: Compass,
        mockupImage: "/pathfinder-ui.jpg" // Placeholder
    },
    {
        id: "map",
        step: "02",
        label: "Explore",
        title: "Navigate the Map of Sanatan",
        description: "Visualize the connections between Schools (Darshanas), Deities, and Texts. See how Vedanta connects to Yoga, or how Bhakti flows through the Epics.",
        icon: Map,
        mockupImage: "/map-ui.jpg" // Placeholder
    },
    {
        id: "practice",
        step: "03",
        label: "Practice",
        title: "Turn wisdom into action",
        description: "Don't just read—do. Select daily Sadhanas, track your consistency, and move from intellectual understanding to direct experience.",
        icon: Activity,
        mockupImage: "/practice-ui.jpg" // Placeholder
    }
];

export function FeatureShowcase() {
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <section className="section-padding bg-background relative overflow-hidden">
            {/* Background radial gradient */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container-padding mx-auto max-w-7xl">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                        From theory to <span className="text-secondary">experience</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Saadhakam is not just an encyclopedia. It is a tool designed to close the gap between ancient wisdom and your daily life.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Interactive Steps */}
                    <div className="space-y-8">
                        {FEATURES.map((feature, index) => (
                            <div
                                key={feature.id}
                                onClick={() => setActiveFeature(index)}
                                className={`relative pl-8 border-l-2 transition-all duration-300 cursor-pointer group ${activeFeature === index
                                        ? "border-secondary py-4"
                                        : "border-border/50 py-4 opacity-60 hover:opacity-100 hover:border-secondary/50"
                                    }`}
                            >
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className={`text-sm font-bold tracking-widest uppercase ${activeFeature === index ? "text-secondary" : "text-muted-foreground"
                                        }`}>
                                        {feature.step}. {feature.label}
                                    </span>
                                </div>

                                <h3 className={`font-display text-2xl font-bold mb-3 transition-colors ${activeFeature === index ? "text-foreground" : "text-muted-foreground"
                                    }`}>
                                    {feature.title}
                                </h3>

                                <div className={`overflow-hidden transition-all duration-500 ${activeFeature === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {feature.description}
                                    </p>
                                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 font-medium">
                                        Try it now <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Floating Mockup */}
                    <div className="relative h-[500px] w-full items-center justify-center flex">
                        {/* Abstract device frame */}
                        <div className="relative w-full max-w-md aspect-[9/16] md:aspect-square bg-card border-8 border-muted/20 rounded-[2.5rem] shadow-2xl overflow-hidden glassmorphic-warm floating-card">

                            {/* Dynamic Content based on active state */}
                            <div className="absolute inset-0 bg-gradient-to-br from-background to-muted/50 p-6 flex flex-col">

                                {/* Fake UI Header */}
                                <div className="flex items-center justify-between mb-8 opacity-50">
                                    <div className="w-8 h-8 rounded-full bg-foreground/10" />
                                    <div className="w-24 h-3 rounded-full bg-foreground/10" />
                                </div>

                                {/* Transitioning Content */}
                                <div className="flex-1 flex items-center justify-center text-center p-6 relative">
                                    {FEATURES.map((feature, index) => (
                                        <div
                                            key={feature.id}
                                            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 transform ${activeFeature === index
                                                    ? "opacity-100 translate-y-0 scale-100"
                                                    : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                                                }`}
                                        >
                                            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-sm">
                                                <feature.icon size={40} />
                                            </div>
                                            <h4 className="font-display text-2xl font-bold text-foreground mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {feature.label} Mode Active
                                            </p>

                                            {/* Abstract UI Lines */}
                                            <div className="w-full mt-8 space-y-3 opacity-30">
                                                <div className="h-2 w-3/4 mx-auto bg-current rounded-full" />
                                                <div className="h-2 w-1/2 mx-auto bg-current rounded-full" />
                                                <div className="h-2 w-2/3 mx-auto bg-current rounded-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Fake UI FAB */}
                                <div className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-secondary shadow-lg shadow-secondary/20" />
                            </div>
                        </div>

                        {/* Floating Elements behind */}
                        <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl animate-pulse-soft" />
                        <div className="absolute -z-10 -bottom-10 -left-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
                    </div>

                </div>
            </div>
        </section>
    );
}
