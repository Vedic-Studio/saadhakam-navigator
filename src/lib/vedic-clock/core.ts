import { getNakshatraBySlug, getTithiBySlug, getVaraBySlug } from "@/lib/jyotish";
import { tithis, yogas } from "@/data/panchang";
import { nakshatras } from "@/data/nakshatras";
import { getPresetCityById } from "@/lib/vedic-clock/presets";
import type { VedicClockQuery, VedicClockResponse } from "@/lib/vedic-clock/schema";
import { getAstronomicalSunWindow, getComputedPanchanga, getTimeZoneOffsetMinutes } from "@/lib/vedic-clock/astronomy";
import {
    buildMuhurtaSegments,
    buildKalaSegments,
    formatLocalDateTime,
    formatMinutes,
    getCycleProgress,
    getElapsedSinceSunrise,
    getMuhurtaIndex,
    parseLocalDate,
    parseLocalDateTime,
} from "@/lib/vedic-clock/interactive";

function getLocalDateParts(now: Date, timeZone: string) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const parts = formatter.formatToParts(now);
    const year = parts.find((part) => part.type === "year")?.value;
    const month = parts.find((part) => part.type === "month")?.value;
    const day = parts.find((part) => part.type === "day")?.value;

    return {
        isoDate: `${year}-${month}-${day}`,
        year: Number(year),
        month: Number(month),
        day: Number(day),
    };
}

function getLocalMinutes(now: Date, timeZone: string) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
    const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");

    return hour * 60 + minute;
}

function getTithiSlugFromIndex(index: number) {
    return tithis[index]?.slug ?? tithis[0].slug;
}

function getNakshatraSlugFromIndex(index: number) {
    return nakshatras[index]?.slug ?? nakshatras[0].slug;
}

function getKaranaNameFromHalfTithiIndex(index: number) {
    if (index === 0) {
        return "Kimstughna";
    }

    if (index >= 57) {
        return ["Shakuni", "Chatushpada", "Naga"][index - 57] ?? "Kimstughna";
    }

    const repeating = ["Bava", "Balava", "Kaulava", "Taitila", "Garija", "Vanija", "Vishti"];
    return repeating[(index - 1) % repeating.length];
}

function buildObservationDate(
    queryDate: string | undefined,
    queryDateTime: string | undefined,
    now: Date,
    timeZone: string,
    currentLocalMinutes: number,
) {
    if (queryDateTime) {
        const { year, month, day, hour, minute } = parseLocalDateTime(queryDateTime);
        const offsetMinutes = getTimeZoneOffsetMinutes(year, month, day, timeZone);
        return new Date(Date.UTC(year, month - 1, day, hour, minute, 0) - offsetMinutes * 60000);
    }

    if (!queryDate) {
        return now;
    }

    const { year, month, day } = parseLocalDate(queryDate);
    const offsetMinutes = getTimeZoneOffsetMinutes(year, month, day, timeZone);
    return new Date(Date.UTC(year, month - 1, day, 0, currentLocalMinutes, 0) - offsetMinutes * 60000);
}

function buildMuhurtas(sunriseMinutes: number, currentLocalMinutes: number) {
    // Compute how far into the sunrise-anchored 24-hour cycle the current
    // local moment sits. `currentLocalMinutes` is always a time-of-day in
    // [0, 1440). The cycle starts at `sunriseMinutes` and wraps around once.
    const elapsedSinceSunrise = getElapsedSinceSunrise(sunriseMinutes, currentLocalMinutes);

    const muhurtas = buildMuhurtaSegments(sunriseMinutes, currentLocalMinutes);

    return {
        muhurtas,
        currentMuhurtaIndex: getMuhurtaIndex(elapsedSinceSunrise),
        minutesSinceSunrise: elapsedSinceSunrise,
    };
}

const weekdayMap = [
    "ravivara",
    "somavara",
    "mangalavara",
    "budhavara",
    "guruvara",
    "shukravara",
    "shanivara",
] as const;

export function buildVedicClockResponse(query: VedicClockQuery, now = new Date()): VedicClockResponse {
    const preset = query.cityId ? getPresetCityById(query.cityId) : undefined;
    if (query.cityId && !preset) {
        throw new Error(`Unknown preset city: ${query.cityId}`);
    }

    const timezone = preset?.timezone ?? query.timezone;
    if (!timezone) {
        throw new Error("Vedic Clock requires either a preset city or latitude/longitude/timezone coordinates");
    }

    const currentLocalMinutes = query.datetime
        ? (() => {
            const { hour, minute } = parseLocalDateTime(query.datetime);
            return hour * 60 + minute;
        })()
        : getLocalMinutes(now, timezone);
    const observationDate = buildObservationDate(query.date, query.datetime, now, timezone, currentLocalMinutes);
    const localDate = query.datetime
        ? (() => {
            const { year, month, day } = parseLocalDateTime(query.datetime);
            return { isoDate: query.datetime.slice(0, 10), year, month, day };
        })()
        : query.date
            ? (() => {
                const { year, month, day } = parseLocalDate(query.date);
                return { isoDate: query.date, year, month, day };
            })()
            : getLocalDateParts(observationDate, timezone);
    const weekday = new Date(`${localDate.isoDate}T12:00:00Z`).getUTCDay();
    const vara = getVaraBySlug(weekdayMap[weekday]);
    const latitude = preset?.latitude ?? query.latitude;
    const longitude = preset?.longitude ?? query.longitude;
    if (latitude === undefined || longitude === undefined) {
        throw new Error("Vedic Clock requires latitude and longitude when no preset city is selected");
    }

    const region = preset?.region ?? null;
    const locationName = preset?.name ?? "Current coordinates";
    const computedPanchanga = getComputedPanchanga(observationDate);
    const tithi = getTithiBySlug(getTithiSlugFromIndex(computedPanchanga.tithiIndex));
    const nakshatra = getNakshatraBySlug(getNakshatraSlugFromIndex(computedPanchanga.nakshatraIndex));
    const yoga = yogas[computedPanchanga.yogaIndex] ?? yogas[0];
    const karana = getKaranaNameFromHalfTithiIndex(computedPanchanga.karanaIndex);
    const { sunriseMinutes, sunsetMinutes, dayLengthMinutes } = getAstronomicalSunWindow(
        localDate.year,
        localDate.month,
        localDate.day,
        latitude,
        longitude,
        timezone,
    );
    const { muhurtas, currentMuhurtaIndex, minutesSinceSunrise } = buildMuhurtas(sunriseMinutes, currentLocalMinutes);
    const kalaSegments = buildKalaSegments(sunriseMinutes, sunsetMinutes, currentLocalMinutes);
    const currentKalaIndex = kalaSegments.find((segment) => segment.isActive)?.index ?? 1;
    const currentLocalDateTime = query.datetime
        ? query.datetime
        : formatLocalDateTime({
            year: localDate.year,
            month: localDate.month,
            day: localDate.day,
            hour: Math.floor(currentLocalMinutes / 60),
            minute: currentLocalMinutes % 60,
        });

    return {
        requestedDate: localDate.isoDate,
        requestedDateTime: currentLocalDateTime,
        location: {
            kind: preset ? "preset" : "coordinates",
            name: locationName,
            region,
            latitude,
            longitude,
            timezone,
        },
        panchanga: {
            vara: {
                slug: vara?.slug ?? "unknown",
                name: vara?.name ?? "Unknown vara",
                sanskritName: vara?.sanskritName ?? null,
                summary: vara?.description ?? "Weekday mapping is not available for this date.",
            },
            tithi: {
                slug: tithi?.slug ?? "unknown",
                name: tithi?.name ?? "Unknown tithi",
                sanskritName: null,
                summary: tithi?.meaning ?? "Tithi data is not yet available.",
            },
            nakshatra: {
                slug: nakshatra?.slug ?? "unknown",
                name: nakshatra?.name ?? "Unknown nakshatra",
                sanskritName: nakshatra?.sanskritName ?? null,
                summary: nakshatra?.description ?? "Nakshatra data is not yet available.",
            },
            yoga,
            karana,
        },
        clock: {
            mode: "fixed-48-minute",
            currentLocalTime: formatMinutes(currentLocalMinutes),
            currentLocalDateTime,
            sunriseTime: formatMinutes(sunriseMinutes),
            sunsetTime: formatMinutes(sunsetMinutes),
            dayLengthMinutes,
            minutesSinceSunrise,
            cycleProgress: getCycleProgress(sunriseMinutes, currentLocalMinutes),
            currentMuhurtaIndex,
            currentKalaIndex,
            muhurtas,
            kalaSegments,
        },
        provenance: [
            {
                label: "Clock mode",
                value: "Fixed 48-minute muhūrta MVP",
                detail: "Week one uses equal 48-minute segments and does not yet model variable day-night muhūrta lengths.",
            },
            {
                label: "Pañchānga source",
                value: "Ephemeris-backed Lahiri sidereal model",
                detail: "Tithi, nakshatra, yoga, and karana are derived from Astronomy Engine solar and lunar positions, then converted through a Lahiri Citra/Spica sidereal anchor inside the app.",
            },
            {
                label: "Sunrise model",
                value: "Ephemeris rise/set search",
                detail: "Sunrise and sunset now come from Astronomy Engine rise-set event searches for the requested observer coordinates instead of the earlier approximation.",
            },
            {
                label: "Current longitudes",
                value: `Sun ${computedPanchanga.longitudes.solarLongitude.toFixed(2)}°, Moon ${computedPanchanga.longitudes.lunarLongitude.toFixed(2)}°`,
                detail: `Angular separation ${computedPanchanga.longitudes.angularDifference.toFixed(2)}° drives the computed tithi and karana for this moment.`,
            },
        ],
    };
}
