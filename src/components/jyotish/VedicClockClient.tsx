"use client";

import { useEffect, useState } from "react";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { vedicClockPresetCities } from "@/lib/vedic-clock";
import { muhurtaNames, getMuhurtaName } from "@/lib/vedic-clock/muhurta-names";
import { VedicMuhurtaDial } from "@/components/jyotish/visuals/VedicMuhurtaDial";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin, Navigation, Sunrise, Sunset, Compass, Sparkles } from "lucide-react";

type LoadState =
    | { kind: "idle" | "loading" }
    | { kind: "error"; message: string }
    | { kind: "ready"; payload: VedicClockResponse };

async function fetchClock(query: URLSearchParams) {
    const response = await fetch(`/api/vedic-clock?${query.toString()}`, { cache: "no-store" });
    const payload = (await response.json()) as VedicClockResponse | { error?: string };

    if (!response.ok || !("clock" in payload)) {
        throw new Error(("error" in payload && payload.error) || "Vedic clock request failed");
    }

    return payload;
}

export function VedicClockClient() {
    const [state, setState] = useState<LoadState>({ kind: "idle" });
    const [activeCityId, setActiveCityId] = useState<string>("varanasi");

    useEffect(() => {
        if (!activeCityId) return;
        const query = new URLSearchParams({ cityId: activeCityId });
        setState({ kind: "loading" });

        fetchClock(query)
            .then((payload) => setState({ kind: "ready", payload }))
            .catch((error: unknown) =>
                setState({
                    kind: "error",
                    message: error instanceof Error ? error.message : "Unable to load the Vedic clock.",
                }),
            );
    }, [activeCityId]);

    async function useMyLocation() {
        if (!navigator.geolocation) {
            setState({ kind: "error", message: "Geolocation is not supported in this browser." });
            return;
        }

        setState({ kind: "loading" });

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const query = new URLSearchParams({
                        latitude: String(position.coords.latitude),
                        longitude: String(position.coords.longitude),
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    });
                    const payload = await fetchClock(query);
                    setActiveCityId("");
                    setState({ kind: "ready", payload });
                } catch (error) {
                    setState({
                        kind: "error",
                        message: error instanceof Error ? error.message : "Unable to use your current location.",
                    });
                }
            },
            (error) => {
                setState({ kind: "error", message: error.message || "Location access was denied." });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
        );
    }

    const payload = state.kind === "ready" ? state.payload : null;
    const activeMuhurta = payload ? getMuhurtaName(payload.clock.currentMuhurtaIndex) : null;

    return (
        <div className="space-y-10">
            {/* Location picker — framed as a traditional yantra header */}
            <section className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#17122c]/90 via-[#0f0b1e]/90 to-[#1a0f24]/90 p-6 md:p-8 backdrop-blur-xl">
                <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_60%)]"
                />
                <div
                    aria-hidden
                    className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
                />
                <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/5 px-3 py-1">
                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
                                Sthāna · स्थान
                            </p>
                        </div>
                        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-amber-50 md:text-3xl">
                            Anchor the clock to your observer
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-amber-100/60">
                            Muhūrtas are computed from the local horizon. Pick a sacred city or grant the
                            browser a single geolocation read — the dial realigns to your sunrise.
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="gap-2 self-start border-amber-400/40 bg-amber-500/5 text-amber-100 hover:bg-amber-500/15 hover:text-amber-50"
                        onClick={useMyLocation}
                    >
                        <Navigation className="h-4 w-4" />
                        Use my location
                    </Button>
                </div>
                <div className="relative mt-6 flex flex-wrap gap-2.5">
                    {vedicClockPresetCities.map((city) => {
                        const isActive = activeCityId === city.id;
                        return (
                            <button
                                key={city.id}
                                type="button"
                                onClick={() => setActiveCityId(city.id)}
                                className={cn(
                                    "rounded-full border px-4 py-1.5 text-sm transition-all duration-300",
                                    isActive
                                        ? "border-amber-300/80 bg-gradient-to-r from-amber-500/30 to-orange-500/20 text-amber-50 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
                                        : "border-amber-500/15 bg-white/[0.02] text-amber-100/70 hover:border-amber-400/40 hover:bg-amber-500/5 hover:text-amber-50",
                                )}
                            >
                                {city.name}
                            </button>
                        );
                    })}
                </div>
            </section>

            {state.kind === "loading" && !payload && (
                <section className="rounded-3xl border border-amber-500/15 bg-[#0f0b1e]/80 p-10 text-center">
                    <div className="inline-block h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    <p className="mt-3 text-sm text-amber-100/60">Aligning muhūrta wheel to your horizon…</p>
                </section>
            )}

            {state.kind === "error" && (
                <section className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6">
                    <p className="text-sm text-red-200">{state.message}</p>
                </section>
            )}

            {payload && (
                <>
                    {/* The dial — full-width hero centerpiece */}
                    <section className="relative overflow-hidden rounded-[2rem] border border-amber-500/20 bg-gradient-to-b from-[#0a0616] via-[#050210] to-[#0a0616] px-4 py-8 sm:px-6 md:px-10 md:py-12">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15),transparent_55%)]"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(147,51,234,0.1),transparent_40%)]"
                        />

                        {/* Compact metadata strip above the dial */}
                        <div className="relative flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-amber-100/70">
                            <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-amber-300" />
                                <span className="font-display text-sm font-semibold text-amber-50">
                                    {payload.location.name}
                                </span>
                                {payload.location.region && (
                                    <span className="text-amber-100/40">· {payload.location.region}</span>
                                )}
                            </span>
                            <span className="hidden h-3 w-px bg-amber-500/20 sm:block" />
                            <span className="inline-flex items-center gap-1.5">
                                <Sunrise className="h-3.5 w-3.5 text-amber-300" />
                                <span className="font-mono text-amber-50">{payload.clock.sunriseTime}</span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-amber-300/60">
                                    Sūryodaya
                                </span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <Sunset className="h-3.5 w-3.5 text-indigo-300" />
                                <span className="font-mono text-amber-50">{payload.clock.sunsetTime}</span>
                                <span className="text-[10px] uppercase tracking-[0.18em] text-indigo-300/60">
                                    Sūryāsta
                                </span>
                            </span>
                            <span className="hidden h-3 w-px bg-amber-500/20 sm:block" />
                            <span className="inline-flex items-center gap-1.5">
                                <span className="text-[10px] uppercase tracking-[0.18em] text-amber-300/60">
                                    Ahorātra
                                </span>
                                <span className="font-mono text-amber-50">
                                    {Math.floor(payload.clock.dayLengthMinutes / 60)}h{" "}
                                    {payload.clock.dayLengthMinutes % 60}m
                                </span>
                            </span>
                            <span className="hidden h-3 w-px bg-amber-500/20 sm:block" />
                            <span className="font-mono text-amber-100/50">{payload.requestedDate}</span>
                        </div>

                        {/* Dial — the hero */}
                        <div className="relative mx-auto mt-6 w-full max-w-[820px] md:mt-8">
                            <VedicMuhurtaDial
                                muhurtas={payload.clock.muhurtas}
                                currentLocalTime={payload.clock.currentLocalTime}
                                sunriseTime={payload.clock.sunriseTime}
                                sunsetTime={payload.clock.sunsetTime}
                                currentMuhurtaIndex={payload.clock.currentMuhurtaIndex}
                                muhurtaNames={muhurtaNames}
                            />
                        </div>

                        {/* Active muhūrta + Pañchāṅga cards below the dial */}
                        <div className="relative mx-auto mt-8 grid w-full max-w-5xl gap-4 md:mt-10 md:grid-cols-2 md:gap-5">
                            {activeMuhurta && (
                                <div className="rounded-2xl border border-amber-400/40 bg-gradient-to-br from-amber-500/15 via-orange-500/5 to-transparent p-5 shadow-[0_0_30px_rgba(251,191,36,0.12)] md:p-6">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300/80">
                                        Current · Vartamāna
                                    </p>
                                    <div className="mt-3 flex items-end justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="font-sanskrit text-3xl font-semibold text-amber-100 md:text-4xl">
                                                {activeMuhurta.devanagari}
                                            </p>
                                            <p className="mt-1 font-display text-xl font-bold text-amber-50 md:text-2xl">
                                                {activeMuhurta.name}
                                            </p>
                                            <p className="mt-1 text-xs text-amber-100/60">
                                                Presided by{" "}
                                                <span className="text-amber-100/90">{activeMuhurta.deity}</span>
                                            </p>
                                        </div>
                                        <div className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-right">
                                            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-300/70">
                                                Muhūrta
                                            </p>
                                            <p className="font-display text-2xl font-bold text-amber-50">
                                                {String(payload.clock.currentMuhurtaIndex).padStart(2, "0")}
                                            </p>
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-amber-300/60">
                                                of 30
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="rounded-2xl border border-amber-500/15 bg-white/[0.02] p-5 md:p-6">
                                <div className="flex items-center gap-2">
                                    <Compass className="h-4 w-4 text-amber-300" />
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-amber-300/70">
                                        Pañchāṅga
                                    </p>
                                </div>
                                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                                    <PanchangaRow
                                        label="Vāra"
                                        devanagari="वार"
                                        value={payload.panchanga.vara.name}
                                        sub={payload.panchanga.vara.sanskritName}
                                    />
                                    <PanchangaRow
                                        label="Tithi"
                                        devanagari="तिथि"
                                        value={payload.panchanga.tithi.name}
                                        sub={payload.panchanga.tithi.sanskritName}
                                    />
                                    <PanchangaRow
                                        label="Nakshatra"
                                        devanagari="नक्षत्र"
                                        value={payload.panchanga.nakshatra.name}
                                        sub={payload.panchanga.nakshatra.sanskritName}
                                    />
                                    <PanchangaRow
                                        label="Yoga"
                                        devanagari="योग"
                                        value={payload.panchanga.yoga}
                                    />
                                    <PanchangaRow
                                        label="Karaṇa"
                                        devanagari="करण"
                                        value={payload.panchanga.karana}
                                    />
                                    <PanchangaRow
                                        label="Date"
                                        devanagari="दिनांक"
                                        value={payload.requestedDate}
                                    />
                                </dl>
                            </div>
                        </div>
                    </section>

                    {/* Muhūrta ledger — linear list below the dial */}
                    <section className="rounded-3xl border border-amber-500/15 bg-gradient-to-b from-[#0f0b1e]/80 to-[#080512]/80 p-6 md:p-8">
                        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
                                    Muhūrta-krama · मुहूर्त-क्रम
                                </p>
                                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-amber-50 md:text-3xl">
                                    Thirty segments from sunrise
                                </h3>
                                <p className="mt-1 text-sm text-amber-100/60">
                                    Each muhūrta is a 48-minute window with its own presiding devatā.
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-amber-100/50">
                                <span className="inline-flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-amber-400" /> Day
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-indigo-400" /> Night
                                </span>
                            </div>
                        </div>

                        <ol className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                            {payload.clock.muhurtas.map((muhurta) => {
                                const meta = getMuhurtaName(muhurta.index);
                                const isDay = muhurta.phase === "day";
                                return (
                                    <li
                                        key={muhurta.index}
                                        className={cn(
                                            "group relative overflow-hidden rounded-2xl border p-3.5 transition-all duration-300",
                                            muhurta.isActive
                                                ? "border-amber-400/70 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent shadow-[0_0_30px_rgba(251,191,36,0.18)]"
                                                : isDay
                                                    ? "border-amber-500/10 bg-amber-500/[0.03] hover:border-amber-400/30 hover:bg-amber-500/[0.06]"
                                                    : "border-indigo-400/10 bg-indigo-500/[0.03] hover:border-indigo-400/30 hover:bg-indigo-500/[0.06]",
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p
                                                    className={cn(
                                                        "font-sanskrit text-lg leading-none",
                                                        muhurta.isActive ? "text-amber-100" : "text-amber-200/60",
                                                    )}
                                                >
                                                    {meta.devanagari}
                                                </p>
                                                <p
                                                    className={cn(
                                                        "mt-1 font-display text-sm font-bold tracking-tight",
                                                        muhurta.isActive ? "text-amber-50" : "text-amber-100/80",
                                                    )}
                                                >
                                                    {meta.name}
                                                </p>
                                                <p className="text-[10px] uppercase tracking-[0.18em] text-amber-100/40">
                                                    {meta.deity}
                                                </p>
                                            </div>
                                            <span
                                                className={cn(
                                                    "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
                                                    muhurta.isActive
                                                        ? "border-amber-300/60 bg-amber-400/15 text-amber-100"
                                                        : isDay
                                                            ? "border-amber-500/20 bg-amber-500/5 text-amber-200/50"
                                                            : "border-indigo-400/20 bg-indigo-500/5 text-indigo-200/60",
                                                )}
                                            >
                                                {String(muhurta.index).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <p
                                            className={cn(
                                                "mt-2.5 font-mono text-[11px] tracking-wider",
                                                muhurta.isActive
                                                    ? "text-amber-100/80"
                                                    : "text-amber-100/45",
                                            )}
                                        >
                                            {muhurta.startTime} → {muhurta.endTime}
                                        </p>
                                    </li>
                                );
                            })}
                        </ol>
                    </section>

                    {/* Provenance — traditional manuscript footer */}
                    <section className="rounded-3xl border border-amber-500/15 bg-[#0a0616]/80 p-6 md:p-8">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">
                                Pramāṇa · प्रमाण
                            </p>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                        </div>
                        <p className="mt-3 text-center text-xs text-amber-100/50">
                            Visible provenance — every field traces to its source
                        </p>
                        <div className="mt-6 grid gap-4 lg:grid-cols-2">
                            {payload.provenance.map((entry) => (
                                <div
                                    key={entry.label}
                                    className="rounded-2xl border border-amber-500/10 bg-white/[0.02] p-5"
                                >
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-300/70">
                                        {entry.label}
                                    </p>
                                    <p className="mt-2 font-display text-sm font-semibold text-amber-50">
                                        {entry.value}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-amber-100/55">{entry.detail}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

interface PanchangaRowProps {
    label: string;
    devanagari: string;
    value: string;
    sub?: string | null;
}

function PanchangaRow({ label, devanagari, value, sub }: PanchangaRowProps) {
    return (
        <div className="flex items-start justify-between gap-3 border-b border-amber-500/10 pb-3 last:border-0 last:pb-0">
            <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-300/60">
                    {label}
                </p>
                <p className="mt-0.5 font-sanskrit text-[13px] text-amber-200/60">{devanagari}</p>
            </div>
            <div className="min-w-0 text-right">
                <p className="truncate font-display text-sm font-semibold text-amber-50">{value}</p>
                {sub ? <p className="truncate text-[11px] text-amber-200/50">{sub}</p> : null}
            </div>
        </div>
    );
}
