import { ComputedPanchanga, getComputedPanchanga, getLahiriAyanamsha } from "./astronomy";
import { formatLocalDateTime, formatMinutes } from "./interactive";

export interface LimbTransition {
    currentName: string;
    currentIndex: number;
    endsAt: string;
    endsAtDateTime: string;
    nextName: string;
    nextIndex: number;
}

export interface PanchangTransitions {
    tithi: LimbTransition;
    nakshatra: LimbTransition;
    yoga: LimbTransition;
    karana: LimbTransition;
}

const STEP_MINUTES = 60;
// We look ahead up to 2 days to find the next change
const MAX_MINUTES = 2880;

function formatLocalTimeParts(dateUtc: Date, timeZone: string) {
    const formatter = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    });

    const parts = formatter.formatToParts(dateUtc);
    const year = Number(parts.find(p => p.type === "year")?.value || 0);
    const month = Number(parts.find(p => p.type === "month")?.value || 0);
    const day = Number(parts.find(p => p.type === "day")?.value || 0);
    const hour = Number(parts.find(p => p.type === "hour")?.value || 0);
    const minute = Number(parts.find(p => p.type === "minute")?.value || 0);

    return {
        year, month, day, hour, minute,
        localTime: formatMinutes(hour * 60 + minute),
        localDateTime: formatLocalDateTime({ year, month, day, hour, minute })
    };
}

export function findNextTransition(
    observationDate: Date,
    timeZone: string,
    getIndex: (panchanga: ComputedPanchanga) => number,
    getName: (index: number) => string,
    ayanamsha?: number
): LimbTransition {
    const activeAyanamsha = ayanamsha ?? getLahiriAyanamsha(observationDate);
    const basePanchanga = getComputedPanchanga(observationDate, activeAyanamsha);
    const currentIndex = getIndex(basePanchanga);
    
    let lowMinutes = 0;
    let highMinutes = 0;
    let foundShiftChunk = false;

    // Step forward by 30 minutes to find the chunk where the change occurs
    for (let m = STEP_MINUTES; m <= MAX_MINUTES; m += STEP_MINUTES) {
        const testDate = new Date(observationDate.getTime() + m * 60000);
        const testPanchanga = getComputedPanchanga(testDate, activeAyanamsha);
        if (getIndex(testPanchanga) !== currentIndex) {
            lowMinutes = m - STEP_MINUTES;
            highMinutes = m;
            foundShiftChunk = true;
            break;
        }
    }

    // Binary search within that 30 min chunk to 1 min precision
    let shiftMinutes = MAX_MINUTES; 
    if (foundShiftChunk) {
        while (lowMinutes <= highMinutes) {
            const mid = Math.floor((lowMinutes + highMinutes) / 2);
            const testDate = new Date(observationDate.getTime() + mid * 60000);
            const testPanchanga = getComputedPanchanga(testDate, activeAyanamsha);
            if (getIndex(testPanchanga) !== currentIndex) {
                shiftMinutes = mid;
                highMinutes = mid - 1; // Look for earlier shift
            } else {
                lowMinutes = mid + 1; // It's still the current index
            }
        }
    }

    const endDate = new Date(observationDate.getTime() + shiftMinutes * 60000);
    const endPanchanga = getComputedPanchanga(endDate, activeAyanamsha);
    const nextIndex = getIndex(endPanchanga);
    
    // We want the time it ends, so technically the minute before next index begins, 
    // but presenting the exact minute of transition or the time up to transition.
    // E.g. "ends at 15:42" means 15:42 is still the limb, and 15:43 is next.
    // Above search finds the *first minute of the next limb*.
    // So the end of current limb is `endDate - 1 minute`.
    const lastValidDate = new Date(endDate.getTime() - 60000);
    const { localTime, localDateTime } = formatLocalTimeParts(lastValidDate, timeZone);

    return {
        currentName: getName(currentIndex),
        currentIndex: currentIndex,
        endsAt: localTime,
        endsAtDateTime: localDateTime,
        nextName: getName(nextIndex),
        nextIndex: nextIndex,
    };
}
