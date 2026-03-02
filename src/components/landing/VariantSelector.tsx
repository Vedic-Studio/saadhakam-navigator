import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Beaker, Heart, User, Star, Leaf, Zap } from "lucide-react";
import Link from "next/link";

interface Variant {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
}

const variants: Variant[] = [
    {
        id: "a",
        name: "Science Focus",
        description: "Master the psycho-acoustic science of mantra and ancient wisdom",
        icon: <Beaker className="w-5 h-5" />,
        path: "/variant-a",
        color: "from-cyan-500 to-blue-500"
    },
    {
        id: "b",
        name: "Sacred Focus",
        description: "Connect with the divine grace and sacred lineage",
        icon: <Heart className="w-5 h-5" />,
        path: "/variant-b",
        color: "from-rose-500 to-pink-500"
    },
    {
        id: "c",
        name: "Self-Empowerment",
        description: "Awaken the guru within and discover your inner wisdom",
        icon: <User className="w-5 h-5" />,
        path: "/variant-c",
        color: "from-emerald-500 to-teal-500"
    },
    {
        id: "d",
        name: "Guru Guidance",
        description: "Let the masters guide you on your spiritual journey",
        icon: <Star className="w-5 h-5" />,
        path: "/variant-d",
        color: "from-violet-500 to-purple-500"
    },
    {
        id: "e",
        name: "Healing Focus",
        description: "Find peace and emotional healing in a chaotic world",
        icon: <Leaf className="w-5 h-5" />,
        path: "/variant-e",
        color: "from-green-500 to-emerald-500"
    },
    {
        id: "f",
        name: "Power Focus",
        description: "Unlock your dormant potential and extraordinary abilities",
        icon: <Zap className="w-5 h-5" />,
        path: "/variant-f",
        color: "from-orange-500 to-red-500"
    }
];

export function VariantSelector() {
    const [selectedVariant, setSelectedVariant] = useState<string>("a");

    return (
        <div className="bg-background py-20">
            <div className="container-padding mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Choose Your Test Variant
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Select a landing page variant to test different messaging approaches for your A/B testing campaign
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {variants.map((variant) => (
                        <div
                            key={variant.id}
                            className={`relative group cursor-pointer transition-all duration-300 ${selectedVariant === variant.id
                                    ? "ring-2 ring-primary scale-105"
                                    : "hover:scale-105 hover:shadow-lg"
                                }`}
                            onClick={() => setSelectedVariant(variant.id)}
                        >
                            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${variant.color} p-2 flex items-center justify-center`}>
                                        {variant.icon}
                                    </div>
                                    {selectedVariant === variant.id && (
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                            <span className="text-white text-xs font-bold">✓</span>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold text-lg text-foreground mb-2">
                                    Variant {variant.id.toUpperCase()}: {variant.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {variant.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-muted-foreground/60">
                                        {variant.path}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:text-primary/80"
                                        asChild
                                    >
                                        <Link to={variant.path}>View</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                        Current selection: <span className="font-semibold text-foreground">
                            Variant {selectedVariant.toUpperCase()} - {variants.find(v => v.id === selectedVariant)?.name}
                        </span>
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setSelectedVariant("a")}
                            className="px-6"
                        >
                            Reset to Default
                        </Button>
                        <Button
                            onClick={() => alert(`Variant ${selectedVariant.toUpperCase()} selected for testing`)}
                            className="px-6"
                        >
                            Start Testing
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}