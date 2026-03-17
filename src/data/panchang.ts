export interface Vara {
    slug: string;
    name: string;
    sanskritName: string;
    weekdayNumber: number;
    rulingGraha: string;
    description: string;
    aeoBlock: string;
    practiceSlugs: string[];
    faq: Array<{ question: string; answer: string }>;
}

export interface Tithi {
    slug: string;
    name: string;
    paksha: "Shukla" | "Krishna";
    number: number;
    deity: string;
    meaning: string;
    description: string;
    aeoBlock: string;
    practiceSlugs: string[];
    faq: Array<{ question: string; answer: string }>;
}

const tithiBase = [
    ["Pratipada", "Agni", "First lunar day, suited to resetting rhythm and beginning deliberately."],
    ["Dvitiya", "Brahma", "Second lunar day, supportive for stable continuation and gentle balance."],
    ["Tritiya", "Gauri", "Third lunar day, linked with refinement, beauty, and graceful initiative."],
    ["Chaturthi", "Ganesha", "Fourth lunar day, linked with obstacle awareness and clean beginnings."],
    ["Panchami", "Nagas", "Fifth lunar day, tied to learning, healing, and subtle sensitivity."],
    ["Shashthi", "Kartikeya", "Sixth lunar day, linked with disciplined courage and protection."],
    ["Saptami", "Surya", "Seventh lunar day, associated with vitality, light, and renewal."],
    ["Ashtami", "Durga", "Eighth lunar day, associated with intensity, cleansing, and protection."],
    ["Navami", "Durga", "Ninth lunar day, linked with momentum, fierce grace, and resilience."],
    ["Dashami", "Dharma", "Tenth lunar day, good for integration, order, and responsible action."],
    ["Ekadashi", "Vishnu", "Eleventh lunar day, traditionally associated with fasting, restraint, and inward clarity."],
    ["Dvadashi", "Hari", "Twelfth lunar day, supportive for restoration, devotion, and soft re-entry."],
    ["Trayodashi", "Shiva", "Thirteenth lunar day, linked with purification, surrender, and twilight practice."],
    ["Chaturdashi", "Rudra", "Fourteenth lunar day, associated with austerity, release, and strong inner fire."],
    ["Purnima/Amavasya", "Chandra/Pitrs", "The culmination point of fullness or darkness, suited to reflection and observance."],
] as const;

export const varas: Vara[] = [
    {
        slug: "ravivara",
        name: "Ravivara",
        sanskritName: "रविवार",
        weekdayNumber: 0,
        rulingGraha: "surya",
        description: "Ravivara, Sunday, is the solar day associated with clarity, rhythm, vitality, and honoring light.",
        aeoBlock: "Ravivara is Sunday in the traditional vara cycle and is associated with Surya. On Sadhaka it is framed as a day for rhythm, clarity, gratitude, and life-ordering practices.",
        practiceSlugs: ["japa", "yoga-sadhana"],
        faq: [{ question: "What is Ravivara linked with?", answer: "Ravivara is linked with Surya, vitality, rhythm, and clarity." }],
    },
    {
        slug: "somavara",
        name: "Somavara",
        sanskritName: "सोमवार",
        weekdayNumber: 1,
        rulingGraha: "chandra",
        description: "Somavara, Monday, is the lunar day associated with mind, receptivity, softness, and emotional nourishment.",
        aeoBlock: "Somavara is Monday in the vara cycle and is associated with Chandra. On Sadhaka it is a day for emotional steadiness, gentle practice, and mindful nourishment.",
        practiceSlugs: ["dhyana", "puja"],
        faq: [{ question: "What is Somavara associated with?", answer: "Somavara is associated with Chandra, emotional tone, and receptive practice." }],
    },
    {
        slug: "mangalavara",
        name: "Mangalavara",
        sanskritName: "मङ्गलवार",
        weekdayNumber: 2,
        rulingGraha: "mangala",
        description: "Mangalavara, Tuesday, is the fiery day of disciplined courage, effort, and protection.",
        aeoBlock: "Mangalavara is Tuesday and is associated with Mangala. On Sadhaka it supports disciplined effort, clear boundaries, and action with integrity.",
        practiceSlugs: ["yoga-sadhana", "seva"],
        faq: [{ question: "What does Mangalavara support?", answer: "Mangalavara supports courage, effort, boundaries, and constructive use of energy." }],
    },
    {
        slug: "budhavara",
        name: "Budhavara",
        sanskritName: "बुधवार",
        weekdayNumber: 3,
        rulingGraha: "budha",
        description: "Budhavara, Wednesday, is the day of learning, speech, analysis, and communicative clarity.",
        aeoBlock: "Budhavara is Wednesday in the vara cycle and is associated with Budha. On Sadhaka it is ideal for study, journaling, writing, and careful speech.",
        practiceSlugs: ["svadhyaya", "japa"],
        faq: [{ question: "What is Budhavara good for?", answer: "Budhavara is good for learning, writing, reflection, and communication discipline." }],
    },
    {
        slug: "guruvara",
        name: "Guruvara",
        sanskritName: "गुरुवार",
        weekdayNumber: 4,
        rulingGraha: "brihaspati",
        description: "Guruvara, Thursday, is the day of wisdom, guidance, ethics, and honoring teachers.",
        aeoBlock: "Guruvara is Thursday in the vara cycle and is associated with Brihaspati. Sadhaka treats it as a day for learning, gratitude to teachers, and dharmic orientation.",
        practiceSlugs: ["svadhyaya", "puja"],
        faq: [{ question: "Why is Thursday called Guruvara?", answer: "Because it is associated with Brihaspati, the guru principle of wisdom and guidance." }],
    },
    {
        slug: "shukravara",
        name: "Shukravara",
        sanskritName: "शुक्रवार",
        weekdayNumber: 5,
        rulingGraha: "shukra",
        description: "Shukravara, Friday, is the day of beauty, harmony, devotion, relational grace, and value refinement.",
        aeoBlock: "Shukravara is Friday in the vara cycle and is associated with Shukra. On Sadhaka it supports beauty, gratitude, relational care, and devotional refinement.",
        practiceSlugs: ["puja", "japa"],
        faq: [{ question: "What is Shukravara linked with?", answer: "Shukravara is linked with beauty, harmony, relationality, and devotional refinement." }],
    },
    {
        slug: "shanivara",
        name: "Shanivara",
        sanskritName: "शनिवार",
        weekdayNumber: 6,
        rulingGraha: "shani",
        description: "Shanivara, Saturday, is the day of discipline, humility, consequence, repair, and service.",
        aeoBlock: "Shanivara is Saturday in the vara cycle and is associated with Shani. On Sadhaka it is treated as a day for service, honesty, simplification, and karmic maturity.",
        practiceSlugs: ["seva", "japa"],
        faq: [{ question: "How is Shanivara best used?", answer: "Through service, simplification, discipline, and humble repair of neglected responsibilities." }],
    },
];

export const tithis: Tithi[] = ["Shukla", "Krishna"].flatMap((paksha) =>
    tithiBase.map(([name, deity, meaning], index) => {
        const isEnd = index === 14;
        const resolvedName = isEnd ? (paksha === "Shukla" ? "Purnima" : "Amavasya") : name;
        const slug = `${paksha.toLowerCase()}-${resolvedName.toLowerCase().replace(/\//g, "-").replace(/\s+/g, "-")}`;

        return {
            slug,
            name: `${paksha} ${resolvedName}`,
            paksha: paksha as "Shukla" | "Krishna",
            number: index + 1,
            deity,
            meaning,
            description: `${paksha} ${resolvedName} is a tithi in the lunar calendar used in panchang reflection. On Sadhaka it is treated as a contemplative rhythm marker rather than predictive certainty.`,
            aeoBlock: `${paksha} ${resolvedName} is one of the lunar tithis in the panchang system. On Sadhaka, tithis are framed as reflective ritual timings and rhythm markers that can support practice, fasting, prayer, or contemplative emphasis.`,
            practiceSlugs: resolvedName === "Ekadashi" ? ["vrat", "japa"] : resolvedName === "Purnima" || resolvedName === "Amavasya" ? ["puja", "dhyana"] : ["japa", "svadhyaya"],
            faq: [
                {
                    question: `What is ${paksha} ${resolvedName}?`,
                    answer: `${paksha} ${resolvedName} is a lunar day in the traditional tithi cycle used for observance, reflection, and practice timing.`,
                },
            ],
        } satisfies Tithi;
    })
);

export const yogas = [
    "Vishkambha",
    "Priti",
    "Ayushman",
    "Saubhagya",
    "Shobhana",
    "Atiganda",
    "Sukarma",
    "Dhriti",
    "Shula",
    "Ganda",
    "Vriddhi",
    "Dhruva",
    "Vyaghata",
    "Harshana",
    "Vajra",
    "Siddhi",
    "Vyatipata",
    "Variyana",
    "Parigha",
    "Shiva",
    "Siddha",
    "Sadhya",
    "Shubha",
    "Shukla",
    "Brahma",
    "Indra",
    "Vaidhriti",
];

export const karanas = [
    "Bava",
    "Balava",
    "Kaulava",
    "Taitila",
    "Garija",
    "Vanija",
    "Vishti",
    "Shakuni",
    "Chatushpada",
    "Naga",
    "Kimstughna",
];

export function getVaraBySlug(slug: string): Vara | undefined {
    return varas.find((vara) => vara.slug === slug);
}

export function getTithiBySlug(slug: string): Tithi | undefined {
    return tithis.find((tithi) => tithi.slug === slug);
}