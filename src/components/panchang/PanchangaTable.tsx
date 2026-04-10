"use client";

import Link from "next/link";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function PanchangaTable({ payload }: { payload: VedicClockResponse }) {
    const rows = [
        {
            limb: "Vara",
            devanagari: "वार",
            value: payload.panchanga.vara.name,
            detail: payload.panchanga.vara.summary,
            href: `/jyotish/panchang/varas/${payload.panchanga.vara.slug}`,
        },
        {
            limb: "Tithi",
            devanagari: "तिथि",
            value: payload.panchanga.tithi.name,
            detail: payload.panchanga.tithi.summary,
            href: `/jyotish/panchang/tithis/${payload.panchanga.tithi.slug}`,
        },
        {
            limb: "Nakshatra",
            devanagari: "नक्षत्र",
            value: payload.panchanga.nakshatra.name,
            detail: payload.panchanga.nakshatra.summary,
        },
        { limb: "Yoga", devanagari: "योग", value: payload.panchanga.yoga, detail: "Daily combination quality in classical panchang." },
        { limb: "Karana", devanagari: "करण", value: payload.panchanga.karana, detail: "Half-tithi action texture used in ritual timing." },
        { limb: "Sunrise", devanagari: "सूर्योदय", value: payload.clock.sunriseTime, detail: "Local sunrise for this observer." },
        { limb: "Solar noon", devanagari: "मध्यान्ह", value: payload.clock.solarNoonTime, detail: "Local solar midpoint of the day." },
        { limb: "Sunset", devanagari: "सूर्यास्त", value: payload.clock.sunsetTime, detail: "Local sunset for this observer." },
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
                        <TableHead className="hidden md:table-cell">Meaning</TableHead>
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