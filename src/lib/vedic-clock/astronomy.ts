import { Body, DefineStar, EclipticLongitude, SunPosition, SearchRiseSet, Observer } from "astronomy-engine";

export interface AstronomicalSunWindow {
    sunriseMinutes: number;
    sunsetMinutes: number;
    dayLengthMinutes: number;
    solarNoonMinutes: number;
}

export interface SolarEventReference {
    utcDate: Date;
    localDate: string;
    localTime: string;
    localDateTime: string;
    minutes: number;
}

export interface SunriseDayWindow {
    sunriseToday: SolarEventReference;
    sunsetToday: SolarEventReference;
    solarNoonToday: SolarEventReference;
    previousSunrise: SolarEventReference;
    nextSunrise: SolarEventReference;
    sunriseDayStart: SolarEventReference;
    sunriseDayEnd: SolarEventReference;
    dayLengthMinutes: number;
    sunriseModel: "noaa-90.833";
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
const NOAA_ZENITH_DEGREES = 90.833;
const MINUTES_PER_DAY = 1440;

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
    return ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}

function formatMinutes(minutes: number) {
    const normalized = normalizeMinutes(minutes);
    const hour = Math.floor(normalized / 60);
    const minute = normalized % 60;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatIsoDate(year: number, month: number, day: number) {
    return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function shiftIsoDate(isoDate: string, deltaDays: number) {
    const shifted = new Date(`${isoDate}T00:00:00.000Z`);
    shifted.setUTCDate(shifted.getUTCDate() + deltaDays);
    return shifted.toISOString().slice(0, 10);
}

function getDayOfYear(year: number, month: number, day: number) {
    const start = Date.UTC(year, 0, 1);
    const current = Date.UTC(year, month - 1, day);
    return Math.floor((current - start) / 86400000) + 1;
}

function toRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
}

function toDegrees(radians: number) {
    return (radians * 180) / Math.PI;
}

function getNoaaSolarDeclinationAndEquationOfTime(year: number, month: number, day: number) {
    const dayOfYear = getDayOfYear(year, month, day);
    const gamma = (2 * Math.PI / 365) * (dayOfYear - 1);
    const equationOfTime = 229.18 * (
        0.000075
        + 0.001868 * Math.cos(gamma)
        - 0.032077 * Math.sin(gamma)
        - 0.014615 * Math.cos(2 * gamma)
        - 0.040849 * Math.sin(2 * gamma)
    );
    const solarDeclination =
        0.006918
        - 0.399912 * Math.cos(gamma)
        + 0.070257 * Math.sin(gamma)
        - 0.006758 * Math.cos(2 * gamma)
        + 0.000907 * Math.sin(2 * gamma)
        - 0.002697 * Math.cos(3 * gamma)
        + 0.00148 * Math.sin(3 * gamma);

    return { equationOfTime, solarDeclination };
}

function getLocalDateParts(date: Date, timeZone: string) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const parts = formatter.formatToParts(date);
    const year = Number(parts.find((part) => part.type === "year")?.value ?? "0");
    const month = Number(parts.find((part) => part.type === "month")?.value ?? "0");
    const day = Number(parts.find((part) => part.type === "day")?.value ?? "0");

    return {
        year,
        month,
        day,
        isoDate: formatIsoDate(year, month, day),
    };
}

function buildEventReference(year: number, month: number, day: number, minutes: number, timeZone: string): SolarEventReference {
    const localDate = formatIsoDate(year, month, day);
    const roundedMinutes = Math.round(minutes);
    const offsetMinutes = getTimeZoneOffsetMinutes(year, month, day, timeZone);
    const utcDate = new Date(Date.UTC(year, month - 1, day, 0, roundedMinutes, 0) - offsetMinutes * 60000);

    return {
        utcDate,
        localDate,
        localTime: formatMinutes(roundedMinutes),
        localDateTime: `${localDate}T${formatMinutes(roundedMinutes)}`,
        minutes: normalizeMinutes(roundedMinutes),
    };
}

function getNoaaSolarWindow(year: number, month: number, day: number, latitude: number, longitude: number, timeZone: string) {
    const { equationOfTime, solarDeclination } = getNoaaSolarDeclinationAndEquationOfTime(year, month, day);
    const latitudeRadians = toRadians(latitude);
    const solarDeclinationRadians = solarDeclination;
    const zenithRadians = toRadians(NOAA_ZENITH_DEGREES);
    const hourAngleCosine =
        (Math.cos(zenithRadians) / (Math.cos(latitudeRadians) * Math.cos(solarDeclinationRadians)))
        - Math.tan(latitudeRadians) * Math.tan(solarDeclinationRadians);

    if (hourAngleCosine < -1 || hourAngleCosine > 1) {
        throw new Error("NOAA sunrise model does not support this latitude/date combination");
    }

    const hourAngleDegrees = toDegrees(Math.acos(hourAngleCosine));
    const timeZoneOffsetHours = getTimeZoneOffsetMinutes(year, month, day, timeZone) / 60;
    const solarNoonMinutes = 720 - 4 * longitude - equationOfTime + timeZoneOffsetHours * 60;
    const sunriseMinutes = solarNoonMinutes - hourAngleDegrees * 4;
    const sunsetMinutes = solarNoonMinutes + hourAngleDegrees * 4;
    const normalizedSunrise = Math.round(sunriseMinutes);
    const normalizedSunset = Math.round(sunsetMinutes);
    const normalizedSolarNoon = Math.round(solarNoonMinutes);
    const sunsetMinutesAdjusted = normalizedSunset < normalizedSunrise ? normalizedSunset + MINUTES_PER_DAY : normalizedSunset;

    return {
        sunriseMinutes: normalizeMinutes(normalizedSunrise),
        sunsetMinutes: normalizeMinutes(normalizedSunset),
        solarNoonMinutes: normalizeMinutes(normalizedSolarNoon),
        dayLengthMinutes: sunsetMinutesAdjusted - normalizeMinutes(normalizedSunrise),
    };
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

export function getAstronomicalSunWindow(
    year: number,
    month: number,
    day: number,
    latitude: number,
    longitude: number,
    timeZone: string,
): AstronomicalSunWindow {
    return getNoaaSolarWindow(year, month, day, latitude, longitude, timeZone);
}

export function getSunriseDayWindow(observationDate: Date, latitude: number, longitude: number, timeZone: string): SunriseDayWindow {
    const localDate = getLocalDateParts(observationDate, timeZone);
    const today = getNoaaSolarWindow(localDate.year, localDate.month, localDate.day, latitude, longitude, timeZone);
    const yesterdayIso = shiftIsoDate(localDate.isoDate, -1);
    const tomorrowIso = shiftIsoDate(localDate.isoDate, 1);
    const yesterdayDate = new Date(`${yesterdayIso}T00:00:00.000Z`);
    const tomorrowDate = new Date(`${tomorrowIso}T00:00:00.000Z`);
    const yesterday = getNoaaSolarWindow(
        yesterdayDate.getUTCFullYear(),
        yesterdayDate.getUTCMonth() + 1,
        yesterdayDate.getUTCDate(),
        latitude,
        longitude,
        timeZone,
    );
    const tomorrow = getNoaaSolarWindow(
        tomorrowDate.getUTCFullYear(),
        tomorrowDate.getUTCMonth() + 1,
        tomorrowDate.getUTCDate(),
        latitude,
        longitude,
        timeZone,
    );

    const sunriseToday = buildEventReference(localDate.year, localDate.month, localDate.day, today.sunriseMinutes, timeZone);
    const sunsetToday = buildEventReference(localDate.year, localDate.month, localDate.day, today.sunsetMinutes, timeZone);
    const solarNoonToday = buildEventReference(localDate.year, localDate.month, localDate.day, today.solarNoonMinutes, timeZone);
    const previousSunrise = buildEventReference(
        yesterdayDate.getUTCFullYear(),
        yesterdayDate.getUTCMonth() + 1,
        yesterdayDate.getUTCDate(),
        yesterday.sunriseMinutes,
        timeZone,
    );
    const nextSunrise = buildEventReference(
        tomorrowDate.getUTCFullYear(),
        tomorrowDate.getUTCMonth() + 1,
        tomorrowDate.getUTCDate(),
        tomorrow.sunriseMinutes,
        timeZone,
    );
    const sunriseDayStart = observationDate < sunriseToday.utcDate ? previousSunrise : sunriseToday;
    const sunriseDayEnd = observationDate < sunriseToday.utcDate ? sunriseToday : nextSunrise;

    return {
        sunriseToday,
        sunsetToday,
        solarNoonToday,
        previousSunrise,
        nextSunrise,
        sunriseDayStart,
        sunriseDayEnd,
        dayLengthMinutes: today.dayLengthMinutes,
        sunriseModel: "noaa-90.833",
    };
}

export function getMoonEvents(observationDate: Date, latitude: number, longitude: number, timeZone: string): {
    moonrise: SolarEventReference | null;
    moonset: SolarEventReference | null;
} {
    const observer = new Observer(latitude, longitude, 0);
    const localDate = getLocalDateParts(observationDate, timeZone);
    
    // We look for events starting from the localized midnight.
    const offsetMinutes = getTimeZoneOffsetMinutes(localDate.year, localDate.month, localDate.day, timeZone);
    const midnightUtc = new Date(Date.UTC(localDate.year, localDate.month - 1, localDate.day, 0, 0, 0) - offsetMinutes * 60000);
    
    // We look for events within the next 24 hours of local time
    const searchMoonrise = SearchRiseSet(Body.Moon, observer, 1, midnightUtc, 1);
    const searchMoonset = SearchRiseSet(Body.Moon, observer, -1, midnightUtc, 1);
    
    let moonrise: SolarEventReference | null = null;
    let moonset: SolarEventReference | null = null;
    
    // Process moonrise
    if (searchMoonrise) {
        const riseDate = searchMoonrise.date;
        const riseMinutesLocal = (riseDate.getTime() - midnightUtc.getTime()) / 60000;
        if (riseMinutesLocal >= 0 && riseMinutesLocal < 1440) {
            moonrise = buildEventReference(localDate.year, localDate.month, localDate.day, riseMinutesLocal, timeZone);
        }
    }
    
    // Process moonset
    if (searchMoonset) {
        const setDate = searchMoonset.date;
        const setMinutesLocal = (setDate.getTime() - midnightUtc.getTime()) / 60000;
        if (setMinutesLocal >= 0 && setMinutesLocal < 1440) {
            moonset = buildEventReference(localDate.year, localDate.month, localDate.day, setMinutesLocal, timeZone);
        }
    }

    return { moonrise, moonset };
}

export function getLahiriAyanamsha(date: Date) {
    ensureSpicaDefined();
    return normalizeDegrees(EclipticLongitude(Body.Star1, date) - LAHIRI_SPICA_TARGET_DEGREES);
}

export function getSiderealLongitudes(observationDate: Date, ayanamsha?: number) {
    const activeAyanamsha = ayanamsha ?? getLahiriAyanamsha(observationDate);
    const solarLongitude = normalizeDegrees(SunPosition(observationDate).elon - activeAyanamsha);
    const lunarLongitude = normalizeDegrees(EclipticLongitude(Body.Moon, observationDate) - activeAyanamsha);

    return {
        solarLongitude,
        lunarLongitude,
    };
}

export function getComputedPanchanga(observationDate: Date, ayanamsha?: number): ComputedPanchanga {
    const { solarLongitude, lunarLongitude } = getSiderealLongitudes(observationDate, ayanamsha);
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
