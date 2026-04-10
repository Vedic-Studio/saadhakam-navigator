"use client";

import type { VedicClockResponse } from "@/lib/vedic-clock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const practiceByWindow: Record<string, string> = {
    "Brahma Muhurta": "Best for meditation, japa, and scriptural study.",
    "Pratah Sandhya": "Use for sandhyavandana, Gayatri japa, and breath-centered practice.",
    "Abhijit Muhurta": "Good for sankalpa, prayerful beginnings, and important dharmic tasks.",
    "Sayahna Sandhya": "Use for evening arati, japa, gratitude, and reflective closure.",
};

export function AuspiciousCards({ windows }: { windows: VedicClockResponse["clock"]["auspiciousWindows"] }) {
    return (
        <section className="space-y-4">
            <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">Auspicious windows</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Best times for practice</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {windows.map((window) => (
                    <Card key={window.name} className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent">
                        <CardHeader>
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <CardTitle className="text-xl">{window.name}</CardTitle>
                                    <CardDescription className="mt-1">{window.devanagari}</CardDescription>
                                </div>
                                <Badge variant="outline" className={window.isActive ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : window.isPast ? "border-border text-muted-foreground" : "border-orange-500/30 bg-orange-500/10 text-orange-300"}>
                                    {window.isActive ? "Active" : window.isPast ? "Past" : "Upcoming"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="font-mono text-sm text-foreground">{window.startTime} – {window.endTime}</p>
                            <p className="text-sm text-muted-foreground">{window.description}</p>
                            <p className="text-sm text-muted-foreground">{practiceByWindow[window.name] ?? "Use this window for calm, intentional practice."}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}