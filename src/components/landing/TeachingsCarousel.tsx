"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const TEACHINGS = [
    {
        title: "The Vedas",
        subtitle: "The Source of All Knowledge",
        description: "The timeless revelations (Shruti) heard by the Rishis. The foundation of Dharma, rituals, and cosmic order.",
        image: "/assets/generated/sanskrit_scroll_v2_1770394373001.png",
        color: "from-amber-600/80 to-orange-900/80"
    },
    {
        title: "The Upanishads",
        subtitle: "The Inner Wisdom",
        description: "The philosophical essence of the Vedas. Exploring the nature of the Self (Atman) and the Ultimate Reality (Brahman).",
        image: "/assets/generated/meditating_sage_v2_1770394394352.png",
        color: "from-indigo-600/80 to-purple-900/80"
    },
    {
        title: "The Itihasas",
        subtitle: "History, Not Mythology",
        description: "The Ramayana and Mahabharata. Epic histories that teach Dharma through the lives of Avatars and great kings.",
        image: "/assets/generated/history_warrior_v2_1770394411156.png",
        color: "from-rose-600/80 to-red-900/80"
    },
    {
        title: "The Puranas",
        subtitle: "The Cosmic Narratives",
        description: "Vast encyclopedias of history, cosmology, lineage, and devotion. Bringing the abstract truths of Vedas to the masses.",
        image: "/assets/generated/ancient_civilization_abundance.png",
        color: "from-emerald-600/80 to-green-900/80"
    },
    {
        title: "The Agamas",
        subtitle: "The Tantric Path",
        description: "Manuals of worship, temple construction, and yoga. The practical application of spirituality in daily life.",
        image: "/assets/generated/ancient_temple_shiva_1770394209985.png",
        color: "from-cyan-600/80 to-blue-900/80"
    }
];

export function TeachingsCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <section className="py-24 bg-background relative border-t border-white/5">
            <div className="container-padding mx-auto max-w-7xl mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-secondary mb-2 block">The Scriptures</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                        Navigate the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">Ocean of Wisdom</span>
                    </h2>
                </div>
                <p className="text-muted-foreground max-w-md text-right hidden md:block">
                    From the primal sounds of the Vedas to the devotional songs of the Bhakti movement.
                </p>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar px-6 md:px-0"
                style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
            >
                <div className="flex gap-6 mx-auto">
                    {TEACHINGS.map((teaching, index) => (
                        <Link
                            href="/texts"
                            key={index}
                            className="relative group min-w-[300px] md:min-w-[400px] h-[500px] rounded-3xl overflow-hidden snap-center cursor-pointer transition-all duration-500 hover:scale-[1.02] block"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={teaching.image}
                                    alt={teaching.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${teaching.color} opacity-90 group-hover:opacity-80 transition-opacity duration-500`} />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest mb-2 block">{teaching.subtitle}</span>
                                    <h3 className="font-display text-3xl font-bold text-white mb-4">{teaching.title}</h3>
                                    <div className="w-12 h-1 bg-white/30 mb-4 rounded-full group-hover:w-20 transition-all duration-500" />
                                    <p className="text-white/90 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {teaching.description}
                                    </p>
                                    <div className="mt-6 flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        Explore Texts <ArrowRight className="ml-2 w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {/* Padding for last item */}
                    <div className="w-6 md:w-0 shrink-0" />
                </div>
            </div>
        </section>
    );
}
