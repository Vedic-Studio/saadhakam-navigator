export const KALA_SEGMENTS = [
    { name: "Prātaḥ", devanagari: "प्रातःकाल", phase: "day" as const },
    { name: "Madhyāhna", devanagari: "मध्याह्न", phase: "day" as const },
    { name: "Sāyam", devanagari: "सायंकाल", phase: "night" as const },
    { name: "Niśītha", devanagari: "निशीथ", phase: "night" as const },
] as const;

export function timeToMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
}

export function formatMinutes(minutes: number) {
    const normalized = ((minutes % 1440) + 1440) % 1440;
    const hour = Math.floor(normalized / 60);
    const minute = normalized % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function getElapsedSinceSunrise(sunriseMinutes: number, currentLocalMinutes: number) {
    return ((currentLocalMinutes - sunriseMinutes) % 1440 + 1440) % 1440;
}

export function getCycleProgress(sunriseMinutes: number, currentLocalMinutes: number) {
    return getElapsedSinceSunrise(sunriseMinutes, currentLocalMinutes) / 1440;
}

export function getMuhurtaIndex(minutesSinceSunrise: number) {
    return Math.floor(minutesSinceSunrise / 48) + 1;
}

export function buildMuhurtaSegments(sunriseMinutes: number, currentLocalMinutes: number) {
    const minutesSinceSunrise = getElapsedSinceSunrise(sunriseMinutes, currentLocalMinutes);

    return Array.from({ length: 30 }, (_, index) => {
        const segmentStart = index * 48;
        const segmentEnd = segmentStart + 48;

        return {
            index: index + 1,
            label: `Muhūrta ${String(index + 1).padStart(2, "0")}`,
            phase: index < 15 ? ("day" as const) : ("night" as const),
            startTime: formatMinutes(sunriseMinutes + segmentStart),
            endTime: formatMinutes(sunriseMinutes + segmentEnd),
            isActive: minutesSinceSunrise >= segmentStart && minutesSinceSunrise < segmentEnd,
        };
    });
}

export function parseLocalDateTime(localDateTime: string) {
    const match = localDateTime.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
    if (!match) {
        throw new Error(`Invalid local datetime: ${localDateTime}`);
    }

    const [, year, month, day, hour, minute] = match;
    const parsed = {
        year: Number(year),
        month: Number(month),
        day: Number(day),
        hour: Number(hour),
        minute: Number(minute),
    };

    if (!isValidLocalDate(parsed.year, parsed.month, parsed.day) || parsed.hour > 23 || parsed.minute > 59) {
        throw new Error(`Invalid local datetime: ${localDateTime}`);
    }

    return parsed;
}

export function isValidLocalDate(year: number, month: number, day: number) {
    if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
        return false;
    }

    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    const candidate = new Date(Date.UTC(year, month - 1, day));
    return (
        candidate.getUTCFullYear() === year &&
        candidate.getUTCMonth() === month - 1 &&
        candidate.getUTCDate() === day
    );
}

export function parseLocalDate(localDate: string) {
    const match = localDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) {
        throw new Error(`Invalid local date: ${localDate}`);
    }

    const [, year, month, day] = match;
    const parsed = {
        year: Number(year),
        month: Number(month),
        day: Number(day),
    };

    if (!isValidLocalDate(parsed.year, parsed.month, parsed.day)) {
        throw new Error(`Invalid local date: ${localDate}`);
    }

    return {
        year: parsed.year,
        month: parsed.month,
        day: parsed.day,
    };
}

export function formatLocalDateTime(parts: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}) {
    return `${String(parts.year).padStart(4, "0")}-${String(parts.month).padStart(2, "0")}-${String(parts.day).padStart(2, "0")}T${String(parts.hour).padStart(2, "0")}:${String(parts.minute).padStart(2, "0")}`;
}

export function shiftLocalDateTime(localDateTime: string, deltaMinutes: number) {
    const parts = parseLocalDateTime(localDateTime);
    const shifted = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute + deltaMinutes));

    return formatLocalDateTime({
        year: shifted.getUTCFullYear(),
        month: shifted.getUTCMonth() + 1,
        day: shifted.getUTCDate(),
        hour: shifted.getUTCHours(),
        minute: shifted.getUTCMinutes(),
    });
}

export function withDateAndTime(date: string, time: string) {
    return `${date}T${time}`;
}

export function getDatePart(localDateTime: string) {
    return localDateTime.slice(0, 10);
}

export function getTimePart(localDateTime: string) {
    return localDateTime.slice(11, 16);
}

export function buildDateTimeFromCycleOffset(requestedDate: string, sunriseTime: string, offsetMinutes: number) {
    const sunriseMinutes = timeToMinutes(sunriseTime);
    const absoluteMinutes = sunriseMinutes + offsetMinutes;
    const dayOffset = Math.floor(absoluteMinutes / 1440);
    const clockTime = formatMinutes(absoluteMinutes);
    const base = new Date(`${requestedDate}T00:00:00.000Z`);
    base.setUTCDate(base.getUTCDate() + dayOffset);

    return withDateAndTime(base.toISOString().slice(0, 10), clockTime);
}

export function buildKalaSegments(sunriseMinutes: number, sunsetMinutes: number, currentLocalMinutes: number) {
    let daylightMinutes = sunsetMinutes - sunriseMinutes;
    if (daylightMinutes <= 0) daylightMinutes += 1440;

    const nightMinutes = 1440 - daylightMinutes;
    const boundaries = [0, daylightMinutes / 2, daylightMinutes, daylightMinutes + nightMinutes / 2, 1440];
    const minutesSinceSunrise = getElapsedSinceSunrise(sunriseMinutes, currentLocalMinutes);

    return KALA_SEGMENTS.map((segment, index) => {
        const startCycleMinute = boundaries[index]!;
        const endCycleMinute = boundaries[index + 1]!;
        const isActive = minutesSinceSunrise >= startCycleMinute && minutesSinceSunrise < endCycleMinute;

        return {
            index: index + 1,
            name: segment.name,
            devanagari: segment.devanagari,
            phase: segment.phase,
            startTime: formatMinutes(sunriseMinutes + startCycleMinute),
            endTime: formatMinutes(sunriseMinutes + endCycleMinute),
            startCycleMinute,
            endCycleMinute,
            isActive,
        };
    });
}