"use client";

import Link from "next/link";
import { tithis } from "@/data/panchang";
import { getPracticeBySlug } from "@/data/practices";
import { cn } from "@/lib/utils";

export function TithiDeityCalendar({ activeTithiSlug }: { activeTithiSlug: string }) {
    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="mb-5">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Tithi reference</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Thirty lunar days and their deities</h3>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {tithis.map((tithi) => {
                    const practices = tithi.practiceSlugs.map(getPracticeBySlug).filter(Boolean);
                    const isActive = tithi.slug === activeTithiSlug;

                    return (
                        <Link
                            key={tithi.slug}
                            href={`/jyotish/panchang/tithis/${tithi.slug}`}
                            className={cn(
                                "rounded-2xl border p-4 transition-colors",
                                isActive
                                    ? "border-orange-500/50 bg-orange-500/10"
                                    : "border-border/60 bg-background hover:border-orange-500/30 hover:bg-orange-500/5",
                            )}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="font-display text-lg font-semibold text-foreground">{tithi.name}</p>
                                    <p className="text-sm text-muted-foreground">{tithi.deity}</p>
                                </div>
                                <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                                    {tithi.number}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{tithi.meaning}</p>
                            {practices.length > 0 ? (
                                <p className="mt-3 text-xs text-muted-foreground">
                                    Practices: {practices.map((practice) => practice?.title).join(", ")}
                                </p>
                            ) : null}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}