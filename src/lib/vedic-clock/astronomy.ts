import { Body, DefineStar, EclipticLongitude, Observer, SearchRiseSet, SunPosition } from "astronomy-engine";

export interface AstronomicalSunWindow {
    sunriseMinutes: number;
    sunsetMinutes: number;
    dayLengthMinutes: number;
}

export interface ComputedPanchanga {
    tithiIndex: number;
    nakshatraIndex: number;
    yogaIndex: number;
    karanaIndex: number;
    longitudes: {
        solarLongitude: number;
        lunarLongitude: number;
        angularDifference: number;
    };
}

const SPICA_J2000_RA_HOURS = 13 + 25 / 60 + 11.58118 / 3600;
const SPICA_J2000_DEC_DEGREES = -(11 + 9 / 60 + 40.7514 / 3600);
const LAHIRI_SPICA_TARGET_DEGREES = 179 + 58 / 60 + 58 / 3600;
const SPICA_DISTANCE_LIGHT_YEARS = 250;

let starInitialized = false;

export function normalizeDegrees(degrees: number) {
    return ((degrees % 360) + 360) % 360;
}

function ensureSpicaDefined() {
    if (starInitialized) {
        return;
    }

    DefineStar(Body.Star1, SPICA_J2000_RA_HOURS, SPICA_J2000_DEC_DEGREES, SPICA_DISTANCE_LIGHT_YEARS);
    starInitialized = true;
}

function normalizeMinutes(minutes: number) {
    return ((minutes % 1440) + 1440) % 1440;
}

export function parseTimeZoneOffsetMinutes(offset: string) {
    if (offset === "GMT") {
        return 0;
    }

    const match = offset.match(/^GMT([+-])(\d{1,2})(?::?(\d{2}))?$/);
    if (!match) {
        throw new Error(`Unsupported timezone offset format: ${offset}`);
    }

    const [, sign, hours, minutes] = match;
    const totalMinutes = Number(hours) * 60 + Number(minutes ?? "0");
    return sign === "-" ? -totalMinutes : totalMinutes;
}

export function getTimeZoneOffsetMinutes(year: number, month: number, day: number, timeZone: string) {
    const probe = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "shortOffset",
        hour: "2-digit",
    });
    const offset = formatter.formatToParts(probe).find((part) => part.type === "timeZoneName")?.value;

    if (!offset) {
        throw new Error(`Unable to resolve timezone offset for ${timeZone}`);
    }

    return parseTimeZoneOffsetMinutes(offset);
}

function buildLocalMidnightUtc(year: number, month: number, day: number, timeZone: string) {
    const offsetMinutes = getTimeZoneOffsetMinutes(year, month, day, timeZone);
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0) - offsetMinutes * 60000);
}

function getMinutesInTimeZone(date: Date, timeZone: string) {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
    const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
    return normalizeMinutes(hour * 60 + minute);
}

export function getAstronomicalSunWindow(
    year: number,
    month: number,
    day: number,
    latitude: number,
    longitude: number,
    timeZone: string,
): AstronomicalSunWindow {
    const observer = new Observer(latitude, longitude, 0);
    const startDate = buildLocalMidnightUtc(year, month, day, timeZone);
    const sunrise = SearchRiseSet(Body.Sun, observer, +1, startDate, 2);
    const sunset = SearchRiseSet(Body.Sun, observer, -1, startDate, 2);

    if (!sunrise || !sunset) {
        return {
            sunriseMinutes: 360,
            sunsetMinutes: 1080,
            dayLengthMinutes: 720,
        };
    }

    const sunriseMinutes = getMinutesInTimeZone(sunrise.date, timeZone);
    const sunsetMinutes = getMinutesInTimeZone(sunset.date, timeZone);
    const normalizedSunsetMinutes = sunsetMinutes < sunriseMinutes ? sunsetMinutes + 1440 : sunsetMinutes;

    return {
        sunriseMinutes,
        sunsetMinutes,
        dayLengthMinutes: normalizedSunsetMinutes - sunriseMinutes,
    };
}

export function getLahiriAyanamsha(date: Date) {
    ensureSpicaDefined();
    return normalizeDegrees(EclipticLongitude(Body.Star1, date) - LAHIRI_SPICA_TARGET_DEGREES);
}

export function getSiderealLongitudes(observationDate: Date) {
    const ayanamsha = getLahiriAyanamsha(observationDate);
    const solarLongitude = normalizeDegrees(SunPosition(observationDate).elon - ayanamsha);
    const lunarLongitude = normalizeDegrees(EclipticLongitude(Body.Moon, observationDate) - ayanamsha);

    return {
        solarLongitude,
        lunarLongitude,
    };
}

export function getComputedPanchanga(observationDate: Date): ComputedPanchanga {
    const { solarLongitude, lunarLongitude } = getSiderealLongitudes(observationDate);
    const angularDifference = normalizeDegrees(lunarLongitude - solarLongitude);

    return {
        tithiIndex: Math.floor(angularDifference / 12),
        nakshatraIndex: Math.floor(lunarLongitude / (360 / 27)),
        yogaIndex: Math.floor(normalizeDegrees(lunarLongitude + solarLongitude) / (360 / 27)),
        karanaIndex: Math.floor(angularDifference / 6),
        longitudes: {
            solarLongitude,
            lunarLongitude,
            angularDifference,
        },
    };
}
