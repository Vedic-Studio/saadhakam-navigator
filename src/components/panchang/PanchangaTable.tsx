"use client";

import Link from "next/link";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PanchangaTable({ payload }: { payload: VedicClockResponse }) {
    const { panchanga, transitions } = payload;
    const rows = [
        {
            limb: "Vara",
            devanagari: "वार",
            value: panchanga.vara.name,
            detail: "Whole day",
            href: `/jyotish/panchang/varas/${panchanga.vara.slug}`,
        },
        {
            limb: "Tithi",
            devanagari: "तिथि",
            value: panchanga.tithi.name,
            detail: transitions.tithi.endsAt ? `upto ${transitions.tithi.endsAt}, then ${transitions.tithi.nextName}` : panchanga.tithi.summary,
            href: `/jyotish/panchang/tithis/${panchanga.tithi.slug}`,
        },
        {
            limb: "Nakshatra",
            devanagari: "नक्षत्र",
            value: panchanga.nakshatra.name,
            detail: transitions.nakshatra.endsAt ? `upto ${transitions.nakshatra.endsAt}, then ${transitions.nakshatra.nextName}` : panchanga.nakshatra.summary,
        },
        {
            limb: "Yoga",
            devanagari: "योग",
            value: panchanga.yoga.name,
            detail: transitions.yoga.endsAt ? `upto ${transitions.yoga.endsAt}, then ${transitions.yoga.nextName}` : panchanga.yoga.summary,
        },
        {
            limb: "Karana",
            devanagari: "करण",
            value: panchanga.karana.name,
            detail: transitions.karana.endsAt ? `upto ${transitions.karana.endsAt}, then ${transitions.karana.nextName}` : panchanga.karana.summary,
        },
        {
            limb: "Rashi",
            devanagari: "राशि",
            value: panchanga.rashi.name,
            detail: `${panchanga.rashi.lunarLongitude.toFixed(2)}°`,
        },
    ];

    return (
        <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
            <div className="mb-4">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">Panchanga table</p>
                <h3 className="mt-1 font-display text-2xl font-bold">Five limbs for the day</h3>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Limb</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="hidden md:table-cell">Transition / Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.limb}>
                            <TableCell>
                                <div className="font-medium text-foreground">{row.limb}</div>
                                <div className="text-xs text-muted-foreground">{row.devanagari}</div>
                            </TableCell>
                            <TableCell>
                                {row.href ? (
                                    <Link href={row.href} className="font-medium text-orange-400 hover:underline">
                                        {row.value}
                                    </Link>
                                ) : (
                                    <span className="font-medium text-foreground">{row.value}</span>
                                )}
                            </TableCell>
                            <TableCell className="hidden text-muted-foreground md:table-cell">{row.detail}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}