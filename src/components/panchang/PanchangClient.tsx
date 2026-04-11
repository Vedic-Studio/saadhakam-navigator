"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { VedicClockResponse } from "@/lib/vedic-clock";
import { buildSadhanaGuidance } from "@/lib/panchang-guidance";
import { getDatePart, shiftLocalDateTime } from "@/lib/vedic-clock/interactive";
import { Button } from "@/components/ui/button";
import { CitySelector, PANCHANG_CITY_STORAGE_KEY } from "@/components/panchang/CitySelector";
import { SadhanaOverview } from "@/components/panchang/SadhanaOverview";
import { DayTimeline } from "@/components/panchang/DayTimeline";
import { PanchangaTable } from "@/components/panchang/PanchangaTable";
import { TithiDeityCalendar } from "@/components/panchang/TithiDeityCalendar";
import { PanchangAtAGlance } from "./PanchangAtAGlance";
import { SunMoonPanel } from "./SunMoonPanel";
import { DailyTimingGuide } from "./DailyTimingGuide";

const LIVE_TICK_INTERVAL_MS = 1000;
const LIVE_RESYNC_INTERVAL_MS = 5 * 60 * 1000;

type RequestSource =
    | { cityId: string; latitude?: never; longitude?: never; timezone?: never }
    | { cityId?: never; latitude: string; longitude: string; timezone: string };

interface PanchangClientProps {
    initialPayload: VedicClockResponse;
}

function shiftIsoDate(date: string, offsetDays: number) {
    const [year, month, day] = date.split("-").map(Number);
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    utcDate.setUTCDate(utcDate.getUTCDate() + offsetDays);
    return utcDate.toISOString().slice(0, 10);
}

function buildQuery(source: RequestSource, date?: string) {
    const params = new URLSearchParams();
    if (source.cityId) {
        params.set("cityId", source.cityId);
    } else {
        params.set("latitude", source.latitude);
        params.set("longitude", source.longitude);
        params.set("timezone", source.timezone);
    }
    if (date) params.set("date", date);
    return params;
}

export function PanchangClient({ initialPayload }: PanchangClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [requestSource, setRequestSource] = useState<RequestSource>({ cityId: initialPayload.location.kind === "preset" ? "varanasi" : undefined as never });
    const [payload, setPayload] = useState(initialPayload);
    const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("ready");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLiveNow, setIsLiveNow] = useState(initialPayload.requestedDate === getDatePart(initialPayload.requestedDateTime));
    const [liveTickMs, setLiveTickMs] = useState(() => Date.now());
    const lastSyncRef = useRef(Date.now());

    const activeDate = searchParams.get("date") ?? payload.requestedDate;

    const fetchPayload = useCallback(async (source: RequestSource, date?: string) => {
        setStatus("loading");
        setErrorMessage(null);
        try {
            const response = await fetch(`/api/vedic-clock?${buildQuery(source, date).toString()}`, { cache: "no-store" });
            const nextPayload = await response.json() as VedicClockResponse | { error?: string };
            if (!response.ok || !("clock" in nextPayload)) {
                throw new Error(("error" in nextPayload && nextPayload.error) || "Unable to load panchang");
            }
            setPayload(nextPayload);
            setStatus("ready");
            lastSyncRef.current = Date.now();
            return nextPayload;
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Unable to load panchang");
            return null;
        }
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const storedCityId = window.localStorage.getItem(PANCHANG_CITY_STORAGE_KEY);
        if (storedCityId && storedCityId !== (requestSource.cityId ?? "")) {
            const nextSource: RequestSource = { cityId: storedCityId };
            setRequestSource(nextSource);
            void fetchPayload(nextSource, activeDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const interval = window.setInterval(() => setLiveTickMs(Date.now()), LIVE_TICK_INTERVAL_MS);
        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isLiveNow) return;
        if (Date.now() - lastSyncRef.current >= LIVE_RESYNC_INTERVAL_MS) {
            void fetchPayload(requestSource, activeDate);
        }
    }, [activeDate, fetchPayload, isLiveNow, liveTickMs, requestSource]);

    const displayDateTime = useMemo(() => {
        if (!isLiveNow) return payload.requestedDateTime;
        const elapsedMinutes = Math.max(0, Math.floor((liveTickMs - lastSyncRef.current) / 60_000));
        return shiftLocalDateTime(payload.requestedDateTime, elapsedMinutes);
    }, [isLiveNow, liveTickMs, payload.requestedDateTime]);

    const derivedPayload = useMemo(() => ({
        ...payload,
        requestedDateTime: displayDateTime,
        clock: {
            ...payload.clock,
            currentLocalDateTime: displayDateTime,
        },
    }), [displayDateTime, payload]);

    const guidance = useMemo(() => buildSadhanaGuidance(derivedPayload), [derivedPayload]);

    const navigateDate = useCallback(async (offsetDays: number) => {
        setIsLiveNow(false);
        const nextDate = shiftIsoDate(activeDate, offsetDays);
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.set("date", nextDate);
        router.replace(`${pathname}?${nextParams.toString()}`);
        await fetchPayload(requestSource, nextDate);
    }, [activeDate, fetchPayload, pathname, requestSource, router, searchParams]);

    const handleCityChange = useCallback(async (cityId: string) => {
        const nextSource: RequestSource = { cityId };
        setRequestSource(nextSource);
        if (typeof window !== "undefined") {
            window.localStorage.setItem(PANCHANG_CITY_STORAGE_KEY, cityId);
        }
        await fetchPayload(nextSource, activeDate);
    }, [activeDate, fetchPayload]);

    const handleUseMyLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setStatus("error");
            setErrorMessage("Geolocation is not supported in this browser.");
            return;
        }
        setStatus("loading");
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const nextSource: RequestSource = {
                    latitude: String(position.coords.latitude),
                    longitude: String(position.coords.longitude),
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                };
                setRequestSource(nextSource);
                await fetchPayload(nextSource, activeDate);
            },
            (error) => {
                setStatus("error");
                setErrorMessage(error.message || "Location access denied.");
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
        );
    }, [activeDate, fetchPayload]);

    return (
        <div className="space-y-8">
            <section className="rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
                {/* 2A. Header / Hero */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-orange-400">Panchang</p>
                        <h1 className="mt-2 font-display text-4xl font-black tracking-tight lg:text-5xl">
                            {derivedPayload.hinduCalendar.monthName} {derivedPayload.hinduCalendar.paksha} {derivedPayload.panchanga.tithi.name.split(" ").slice(1).join(" ")}, {derivedPayload.hinduCalendar.samvatName}
                        </h1>
                        <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3 text-base text-muted-foreground">
                            <span>{new Date(derivedPayload.requestedDate).toLocaleDateString((typeof navigator !== 'undefined' ? navigator.language : 'en-US'), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="hidden md:inline">·</span>
                            <div className="flex items-center gap-2">
                                <CitySelector
                                    cityId={requestSource.cityId}
                                    cityName={derivedPayload.location.name}
                                    onCityChange={(cityId) => void handleCityChange(cityId)}
                                    onUseMyLocation={handleUseMyLocation}
                                    disabled={status === "loading"}
                                    compact
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 self-start lg:self-auto">
                        <Button type="button" variant="outline" size="icon" aria-label="Previous day" onClick={() => void navigateDate(-1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="outline" onClick={() => { setIsLiveNow(true); void fetchPayload(requestSource); }}>
                            Now
                        </Button>
                        <Button type="button" variant="outline" size="icon" aria-label="Next day" onClick={() => void navigateDate(1)}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {status === "loading" ? (
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" /> Updating panchang…
                    </div>
                ) : null}
                {errorMessage ? <p className="mt-4 text-sm text-red-400">{errorMessage}</p> : null}
            </section>

            {/* 2B. At a Glance */}
            <PanchangAtAGlance payload={derivedPayload} />
            
            {/* 2C. Sun & Moon Panel */}
            <SunMoonPanel payload={derivedPayload} />

            {/* 2F. Sadhana Overview */}
            <SadhanaOverview guidance={guidance} />
            
            {/* 2G. Day Timeline */}
            <DayTimeline payload={derivedPayload} />

            {/* 2D. Daily Timing Guide */}
            <DailyTimingGuide payload={derivedPayload} />

            {/* 2E. Panchanga Table */}
            <PanchangaTable payload={derivedPayload} />
            
            {/* 2H. Tithi-Deity Calendar */}
            <TithiDeityCalendar activeTithiSlug={derivedPayload.panchanga.tithi.slug} />
        </div>
    );
}