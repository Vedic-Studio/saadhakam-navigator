"use client";
import { useMemo, useState } from "react";

import Link from "next/link";
import { tithis } from "@/data/panchang";
import { getPracticeBySlug } from "@/data/practices";
import { cn } from "@/lib/utils";
import { Info, ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

interface TithiDeityCalendarProps {
    activeTithiSlug: string;
}

export function TithiDeityCalendar({ activeTithiSlug }: TithiDeityCalendarProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    // Split tithis by paksha
    const shuklaTithis = useMemo(() => tithis.filter((t) => t.paksha === "Shukla"), []);
    const krishnaTithis = useMemo(() => tithis.filter((t) => t.paksha === "Krishna"), []);

    const activeTithi = useMemo(() => tithis.find((t) => t.slug === activeTithiSlug), [activeTithiSlug]);

    const TithiCard = ({
        tithi,
        isActive,
    }: {
        tithi: (typeof tithis)[0];
        isActive: boolean;
    }) => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link
                        href={`/jyotish/panchang/tithis/${tithi.slug}`}
                        className={cn(
                            "group flex flex-col items-center justify-center rounded-xl border p-2 xs:p-3 transition-all duration-300",
                            isActive
                                ? "border-orange-500/50 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.1)] ring-1 ring-orange-500/50"
                                : "border-border/40 bg-card hover:border-orange-500/30 hover:bg-orange-500/5",
                        )}
                    >
                        <div
                            className={cn(
                                "flex h-8 w-8 xs:h-10 xs:w-10 items-center justify-center rounded-full text-sm xs:text-base font-bold",
                                isActive ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground group-hover:bg-orange-500/20 group-hover:text-orange-500",
                            )}
                        >
                            {tithi.number}
                        </div>
                        <div className="mt-2 text-center">
                            <div className={cn("text-[10px] xs:text-xs font-medium uppercase tracking-wider", isActive ? "text-orange-500" : "text-muted-foreground")}>
                                {tithi.name.split(" ")[1]}
                            </div>
                            <div className="mt-0.5 text-[10px] xs:text-xs opacity-80">{tithi.deity}</div>
                        </div>
                    </Link>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs space-y-1 p-3">
                    <p className="font-semibold text-orange-400">
                        {tithi.name} · {tithi.deity}
                    </p>
                    <p className="text-xs text-muted-foreground">{tithi.meaning}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    return (
        <section className="rounded-3xl border border-border/60 bg-card p-4 sm:p-6 shadow-sm">
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Tithi deities</p>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold">The Lunar Month Cycle</h3>
                        <p className="text-sm text-muted-foreground mt-1 text-balance">
                           30 Tithis — {activeTithi?.name.split(" ").slice(1).join(" ")} is active today.
                        </p>
                    </div>
                    <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto self-start">
                            {isOpen ? (
                                <>
                                    <ChevronUp className="mr-2 h-4 w-4" />
                                    Hide Tithi Calendar
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="mr-2 h-4 w-4" />
                                    Show Tithi Calendar
                                </>
                            )}
                        </Button>
                    </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="space-y-8 mt-6">
                    {/* Shukla Paksha */}
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h4 className="font-semibold text-foreground">Shukla Paksha (Waxing Phase)</h4>
                            <div className="text-xs text-muted-foreground">Bright fortnight</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-15">
                            {shuklaTithis.map((tithi) => (
                                <TithiCard key={tithi.slug} tithi={tithi} isActive={tithi.slug === activeTithiSlug} />
                            ))}
                        </div>
                    </div>

                    {/* Krishna Paksha */}
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h4 className="font-semibold text-foreground">Krishna Paksha (Waning Phase)</h4>
                            <div className="text-xs text-muted-foreground">Dark fortnight</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-15">
                            {krishnaTithis.map((tithi) => (
                                <TithiCard key={tithi.slug} tithi={tithi} isActive={tithi.slug === activeTithiSlug} />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex items-start gap-2 rounded-xl bg-orange-500/5 p-4 text-sm text-foreground">
                        <Info className="h-5 w-5 shrink-0 text-orange-500" />
                        <p className="leading-relaxed">
                            Each tithi (lunar day) is governed by a distinct deity, setting a specific archetypal tone for the day. While standard panchang focuses on astrological timing, Sadhaka uses tithis as daily signposts for aligning study and practice.
                        </p>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </section>
    );
}