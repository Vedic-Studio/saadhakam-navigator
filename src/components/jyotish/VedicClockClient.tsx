"use client";

import { useEffect, useState } from "react";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { vedicClockPresetCities } from "@/lib/vedic-clock";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin, Navigation, Clock3 } from "lucide-react";

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

    return (
        <div className="space-y-8">
            <section className="rounded-3xl border border-border/60 bg-card/60 p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Week One Scope</p>
                        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">One page, one route, one clock mode</h2>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                            This shell locks the API and UI around preset cities, browser geolocation, fixed 48-minute muhūrtas, core pañchānga fields, and explicit provenance.
                        </p>
                    </div>
                    <Button type="button" variant="outline" className="gap-2 self-start" onClick={useMyLocation}>
                        <Navigation className="h-4 w-4" />
                        Use my location
                    </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                    {vedicClockPresetCities.map((city) => (
                        <button
                            key={city.id}
                            type="button"
                            onClick={() => setActiveCityId(city.id)}
                            className={cn(
                                "rounded-full border px-4 py-2 text-sm transition-colors",
                                activeCityId === city.id
                                    ? "border-orange-500 bg-orange-500 text-white"
                                    : "border-border bg-background hover:border-orange-500/60",
                            )}
                        >
                            {city.name}
                        </button>
                    ))}
                </div>
            </section>

            {state.kind === "loading" && (
                <section className="rounded-3xl border border-border/60 bg-card p-8">
                    <p className="text-sm text-muted-foreground">Loading current pañchānga and muhūrta data…</p>
                </section>
            )}

            {state.kind === "error" && (
                <section className="rounded-3xl border border-red-500/30 bg-red-500/5 p-8">
                    <p className="text-sm text-red-200">{state.message}</p>
                </section>
            )}

            {payload && (
                <>
                    <section className="grid gap-4 lg:grid-cols-[1.35fr_0.95fr]">
                        <div className="rounded-3xl border border-border/60 bg-card p-6 md:p-8">
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="inline-flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {payload.location.name}
                                    {payload.location.region ? `, ${payload.location.region}` : ""}
                                </span>
                                <span>{payload.location.timezone}</span>
                                <span>{payload.requestedDate}</span>
                            </div>
                            <div className="mt-5 flex items-end gap-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Current local time</p>
                                    <p className="mt-1 text-5xl font-display font-bold tracking-tight">{payload.clock.currentLocalTime}</p>
                                </div>
                                <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-orange-400">Active segment</p>
                                    <p className="mt-1 text-lg font-semibold">Muhūrta {String(payload.clock.currentMuhurtaIndex).padStart(2, "0")}</p>
                                </div>
                            </div>
                            <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Mode</p>
                                    <p className="mt-2 text-sm font-medium">{payload.clock.mode}</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sunrise</p>
                                    <p className="mt-2 text-sm font-medium">{payload.clock.sunriseTime}</p>
                                </div>
                                <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Sunset</p>
                                    <p className="mt-2 text-sm font-medium">{payload.clock.sunsetTime}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border/60 bg-card p-6 md:p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Pañchānga</p>
                            <div className="mt-4 space-y-4">
                                {[
                                    { label: "Vāra", field: payload.panchanga.vara },
                                    { label: "Tithi", field: payload.panchanga.tithi },
                                    { label: "Nakshatra", field: payload.panchanga.nakshatra },
                                ].map((item) => (
                                    <div key={item.label} className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                                        <p className="mt-1 text-base font-semibold">{item.field.name}</p>
                                        {item.field.sanskritName ? <p className="text-sm text-orange-400">{item.field.sanskritName}</p> : null}
                                        <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.field.summary}</p>
                                    </div>
                                ))}
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Yoga</p>
                                        <p className="mt-1 text-sm font-medium">{payload.panchanga.yoga}</p>
                                    </div>
                                    <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Karana</p>
                                        <p className="mt-1 text-sm font-medium">{payload.panchanga.karana}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-border/60 bg-card p-6 md:p-8">
                        <div className="flex items-center gap-2">
                            <Clock3 className="h-5 w-5 text-orange-400" />
                            <h3 className="text-xl font-semibold">30 fixed muhūrtas from local sunrise</h3>
                        </div>
                        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {payload.clock.muhurtas.map((muhurta) => (
                                <div
                                    key={muhurta.index}
                                    className={cn(
                                        "rounded-2xl border p-4 transition-colors",
                                        muhurta.isActive
                                            ? "border-orange-500 bg-orange-500/10"
                                            : "border-border/60 bg-background/70",
                                    )}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold">{muhurta.label}</p>
                                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{muhurta.phase}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {muhurta.startTime} to {muhurta.endTime}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6 md:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Visible provenance</p>
                        <div className="mt-4 grid gap-4 lg:grid-cols-3">
                            {payload.provenance.map((entry) => (
                                <div key={entry.label} className="rounded-2xl border border-orange-500/15 bg-background/70 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{entry.label}</p>
                                    <p className="mt-2 text-sm font-semibold">{entry.value}</p>
                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{entry.detail}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
