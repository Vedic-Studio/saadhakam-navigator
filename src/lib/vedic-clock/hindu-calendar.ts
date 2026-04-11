export interface HinduCalendarContext {
    monthName: string;
    monthSanskrit: string;
    paksha: "Shukla" | "Krishna";
    samvatYear: number;
    samvatName: string;
}

const hinduMonths = [
    { name: "Vaishakha", sanskritName: "वैशाख" },       // 0: Sun in Aries (0 - 30)
    { name: "Jyeshtha", sanskritName: "ज्येष्ठ" },         // 1: Sun in Taurus (30 - 60)
    { name: "Ashadha", sanskritName: "आषाढ" },           // 2: Sun in Gemini (60 - 90)
    { name: "Shravana", sanskritName: "श्रावण" },         // 3: Sun in Cancer (90 - 120)
    { name: "Bhadrapada", sanskritName: "भाद्रपद" },       // 4: Sun in Leo (120 - 150)
    { name: "Ashvina", sanskritName: "आश्विन" },           // 5: Sun in Virgo (150 - 180)
    { name: "Kartika", sanskritName: "कार्तिक" },         // 6: Sun in Libra (180 - 210)
    { name: "Margashirsha", sanskritName: "मार्गशीर्ष" },   // 7: Sun in Scorpio (210 - 240)
    { name: "Pausha", sanskritName: "पौष" },              // 8: Sun in Sagittarius (240 - 270)
    { name: "Magha", sanskritName: "माघ" },               // 9: Sun in Capricorn (270 - 300)
    { name: "Phalguna", sanskritName: "फाल्गुन" },          // 10: Sun in Aquarius (300 - 330)
    { name: "Chaitra", sanskritName: "चैत्र" },             // 11: Sun in Pisces (330 - 360)
];

export function getHinduCalendarContext(
    observationDate: Date,
    solarLongitude: number,
    tithiIndex: number
): HinduCalendarContext {
    // 1. Month name from solar longitude
    const rashiIndex = Math.floor(solarLongitude / 30);
    const month = hinduMonths[rashiIndex] || hinduMonths[0];

    // 2. Paksha from tithiIndex
    const paksha: "Shukla" | "Krishna" = tithiIndex < 15 ? "Shukla" : "Krishna";

    // 3. Vikram Samvat logic: roughly Gregorian + 57 (or + 56 before mid-April/Chaitra)
    const year = observationDate.getUTCFullYear();
    const monthIndex = observationDate.getUTCMonth(); // 0 = Jan, 11 = Dec
    
    // Simplistic heuristic: January to March uses +56, April to Dec uses +57
    const offset = monthIndex < 3 ? 56 : 57;
    const samvatYear = year + offset;

    return {
        monthName: month.name,
        monthSanskrit: month.sanskritName,
        paksha,
        samvatYear,
        samvatName: `Vikram Samvat ${samvatYear}`
    };
}
