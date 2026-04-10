"use client";

import type { VedicClockResponse } from "@/lib/vedic-clock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function getStatusLabel(period: VedicClockResponse["clock"]["inauspiciousKalas"][number], currentTime: string) {
    if (period.isActive) return "Active";
    return period.endTime < currentTime ? "Past" : "Upcoming";
}

export function InauspiciousPeriods({ periods, currentTime }: { periods: VedicClockResponse["clock"]["inauspiciousKalas"]; currentTime: string }) {
    return (
        <section className="space-y-4">
            <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-red-400">Avoid periods</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Caution windows</h3>
            </div>
            <div className="grid gap-4">
                {periods.map((period) => {
                    const status = getStatusLabel(period, currentTime);
                    return (
                        <Card key={period.name} className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0">
                                <div>
                                    <CardTitle className="text-lg">{period.name}</CardTitle>
                                    <p className="mt-1 text-sm text-muted-foreground">{period.devanagari}</p>
                                </div>
                                <Badge variant="outline" className={status === "Active" ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-border text-muted-foreground"}>
                                    {status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="font-mono text-sm text-foreground">{period.startTime} – {period.endTime}</p>
                                <p className="mt-2 text-sm text-muted-foreground">Prefer mantra, pause, or non-initiatory work during this band when possible.</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}