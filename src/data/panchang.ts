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
    /**
     * Optional per-vara SEO overrides, mirroring the tithi pattern. When omitted
     * the page falls back to the templated `${name} Vara` title and a description
     * composed from `description`. `seoFacts` is an on-page answer block surfaced
     * under a dedicated H2 for varas whose GSC CTR is below expectation.
     */
    seoTitle?: string;
    seoDescription?: string;
    seoFacts?: { heading: string; body: string };
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
    /**
     * Optional per-tithi SEO overrides. When omitted the page falls back to the
     * templated `${name} Tithi` title and a description composed from
     * `description`. Override these for individual tithis whose GSC CTR is below
     * expectation. `seoFacts` is an on-page answer block surfacing the tithi's
     * unique associations under a dedicated H2.
     */
    seoTitle?: string;
    seoDescription?: string;
    seoFacts?: { heading: string; body: string };
}

/**
 * Per-tithi SEO overrides keyed by generated slug. Tithis are generated
 * programmatically from `tithiBase`, so static, hand-authored SERP copy and
 * on-page answer blocks for individual tithis live here and are merged in
 * during generation. Only seed an entry when a specific tithi needs it.
 */
const tithiSeoOverrides: Record<
    string,
    { seoTitle: string; seoDescription: string; seoFacts: { heading: string; body: string } }
> = {
    "shukla-panchami": {
        seoTitle: "Shukla Panchami: What This Tithi Means (Nagas, Day 5)",
        seoDescription:
            "Shukla Panchami is the 5th waxing lunar day, presided by the Nagas and tied to learning, healing, and sensitivity. What it supports and how to observe it.",
        seoFacts: {
            heading: "What Is Shukla Panchami and What Is It For?",
            body: "Shukla Panchami is the fifth lunar day (tithi) of the waxing fortnight (Shukla Paksha), counted from the new moon toward the full moon. Its presiding powers are the Nagas, the serpent deities, which links the day to subtlety, healing, and heightened sensitivity. Traditionally it favours learning, study, and recovery, and it underlies well-known observances: Nag Panchami, when the Nagas are honoured, and Vasant Panchami, the Shukla Panchami of Magha associated with Saraswati and the first stirrings of spring. On Sadhaka, the tithi is treated as a contemplative rhythm marker for learning and gentle repair rather than a predictive forecast.",
        },
    },
    "shukla-ekadashi": {
        seoTitle: "Shukla Ekadashi: The Fasting Tithi (Vishnu, Day 11)",
        seoDescription:
            "Shukla Ekadashi is the 11th waxing lunar day, sacred to Vishnu and the traditional day of Ekadashi fasting (vrata). What it is, why it is observed, and how.",
        seoFacts: {
            heading: "What Is Shukla Ekadashi and Why Is It a Fasting Day?",
            body: "Shukla Ekadashi is the eleventh lunar day (tithi) of the waxing fortnight, sacred to Vishnu. It is the best known fasting tithi in the Vaishnava calendar: practitioners keep the Ekadashi vrata, abstaining from grains and pulses, to steady the body and turn attention inward. Each Ekadashi carries its own name and story, such as Nirjala Ekadashi (the waterless fast of Jyeshtha) and Devshayani Ekadashi (when Vishnu is said to begin his cosmic rest). On Sadhaka, Ekadashi is presented as a recurring rhythm of restraint and clarity rather than a guaranteed outcome.",
        },
    },
    "krishna-ekadashi": {
        seoTitle: "Krishna Ekadashi: The Waning Fasting Tithi (Vishnu)",
        seoDescription:
            "Krishna Ekadashi is the 11th waning lunar day, sacred to Vishnu and observed with the Ekadashi fast. What distinguishes it from the waxing Ekadashi.",
        seoFacts: {
            heading: "What Is Krishna Ekadashi and How Is It Observed?",
            body: "Krishna Ekadashi is the eleventh lunar day of the waning fortnight (Krishna Paksha), counted from the full moon toward the new moon, and is also sacred to Vishnu. Like its waxing counterpart it is a fasting tithi: the Ekadashi vrata is kept twice each lunar month, once in each fortnight. Named observances on this side of the month include Utpanna Ekadashi (Margashirsha) and Saphala Ekadashi (Pausha). On Sadhaka, both Ekadashis are framed as a fortnightly cadence of restraint and inward focus, not as predictive timing.",
        },
    },
    "shukla-chaturthi": {
        seoTitle: "Shukla Chaturthi: The Ganesha Tithi (Day 4)",
        seoDescription:
            "Shukla Chaturthi is the 4th waxing lunar day, presided by Ganesha and tied to clean beginnings. Its observances, including Vinayaka Chaturthi, explained.",
        seoFacts: {
            heading: "What Is Shukla Chaturthi and What Is It For?",
            body: "Shukla Chaturthi is the fourth lunar day of the waxing fortnight, presided by Ganesha, the remover of obstacles. It is observed as Vinayaka Chaturthi each month, and the Shukla Chaturthi of Bhadrapada is Ganesh Chaturthi, the festival marking Ganesha's appearance. The day is associated with clearing obstacles and beginning work deliberately. On Sadhaka, Chaturthi is read as a rhythm marker for clean starts and obstacle awareness rather than a forecast of success.",
        },
    },
    "krishna-chaturthi": {
        seoTitle: "Krishna Chaturthi: Sankashti Chaturthi (Ganesha)",
        seoDescription:
            "Krishna Chaturthi is the 4th waning lunar day, observed as Sankashti Chaturthi in honour of Ganesha. What the day means and how it is kept.",
        seoFacts: {
            heading: "What Is Krishna Chaturthi and What Is Sankashti Chaturthi?",
            body: "Krishna Chaturthi is the fourth lunar day of the waning fortnight, also presided by Ganesha. It is observed as Sankashti Chaturthi, a fast kept until moonrise and dedicated to the removal of difficulties (sankashti means distress or crisis). The Krishna Chaturthi of Magha is Angaraki Sankashti when it falls on a Tuesday, considered especially significant. On Sadhaka, the day is presented as a recurring contemplative marker for releasing obstruction, not as predictive certainty.",
        },
    },
    "krishna-trayodashi": {
        seoTitle: "Krishna Trayodashi: Pradosh Tithi (Shiva, Day 13)",
        seoDescription:
            "Krishna Trayodashi is the 13th waning lunar day, sacred to Shiva and observed at twilight as Pradosh. What Pradosh Vrat is and when it falls.",
        seoFacts: {
            heading: "What Is Krishna Trayodashi and What Is Pradosh?",
            body: "Krishna Trayodashi is the thirteenth lunar day of the waning fortnight, sacred to Shiva. It underlies Pradosh Vrat, observed in the twilight window (pradosha kala) around sunset when Trayodashi is current. The vrata is kept on both the waxing and waning Trayodashi, and a Saturday Pradosh is called Shani Pradosh. On Sadhaka, Trayodashi is framed as a twilight rhythm of purification and surrender rather than a deterministic prediction.",
        },
    },
    "shukla-purnima": {
        seoTitle: "Purnima: The Full Moon Tithi (Shukla Day 15)",
        seoDescription:
            "Purnima is the full-moon lunar day that closes the waxing fortnight, tied to Chandra. The major Purnima observances and how the day is used.",
        seoFacts: {
            heading: "What Is Purnima (Full Moon) and What Is It For?",
            body: "Purnima is the fifteenth lunar day of the waxing fortnight, the full moon, when the lunar disc is complete and the moon is associated with Chandra. It is among the most observed tithis: Guru Purnima honours teachers, Sharad Purnima falls in autumn, Kartik Purnima and Buddha Purnima mark major occasions, and many keep a Purnima fast or perform Satyanarayan puja. The full moon is traditionally treated as a high point for reflection, gratitude, and observance. On Sadhaka, Purnima is a monthly culmination marker for contemplative practice, not a predictive event.",
        },
    },
    "krishna-amavasya": {
        seoTitle: "Amavasya: The New Moon Tithi (Krishna Day 15)",
        seoDescription:
            "Amavasya is the new-moon lunar day that closes the waning fortnight, tied to the Pitrs. Its observances, including ancestral rites, explained.",
        seoFacts: {
            heading: "What Is Amavasya (New Moon) and What Is It For?",
            body: "Amavasya is the fifteenth lunar day of the waning fortnight, the new moon, when the moon is not visible. It is traditionally associated with the Pitrs (ancestors) and is the principal day for ancestral remembrance and tarpana. Named observances include Mauni Amavasya (a day of silence in Magha), Mahalaya Amavasya (the close of the fortnight for the ancestors), and Diwali, which falls on the Amavasya of Kartik. The new moon is treated as a quiet, inward turn of the cycle. On Sadhaka, Amavasya is a monthly marker for stillness and remembrance rather than a forecast.",
        },
    },
    "shukla-ashtami": {
        seoTitle: "Shukla Ashtami: The Durga Tithi (Day 8)",
        seoDescription:
            "Shukla Ashtami is the 8th waxing lunar day, associated with Durga and observed as Durga Ashtami. What the day signifies and how it is kept.",
        seoFacts: {
            heading: "What Is Shukla Ashtami and What Is Durga Ashtami?",
            body: "Shukla Ashtami is the eighth lunar day of the waxing fortnight, associated with Durga and the intense, cleansing pole of the lunar cycle. During Navaratri the Shukla Ashtami of Ashvina is Maha Ashtami, one of the most significant days for honouring the Goddess. Monthly Durga Ashtami and Masik Durgashtami are also kept on this tithi. On Sadhaka, Ashtami is read as a recurring marker for intensity, protection, and inner cleansing rather than as predictive timing.",
        },
    },
};

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
        seoTitle: "Somavara (Monday): Chandra, Shiva, and the Lunar Day",
        seoDescription:
            "Somavara is Monday in the vara cycle, ruled by Chandra and traditionally devoted to Shiva. What the day is associated with and how it is observed.",
        seoFacts: {
            heading: "What Is Somavara (Monday) and What Is It For?",
            body: "Somavara is Monday, the second day of the seven-day vara cycle, ruled by Chandra (the Moon) and named from Soma, a lunar name. In devotional practice Monday is widely kept for Shiva: many observe a Somavara vrat, and the Mondays of the month of Shravana are considered especially significant for Shiva worship. The lunar association links the day to mind, mood, and receptivity. On Sadhaka, Somavara is framed as a weekly marker for emotional steadiness and gentle practice rather than predictive timing.",
        },
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
        seoTitle: "Mangalavara (Tuesday): Mangala, Hanuman, and Effort",
        seoDescription:
            "Mangalavara is Tuesday in the vara cycle, ruled by Mangala and traditionally devoted to Hanuman. What the day is associated with and how it is observed.",
        seoFacts: {
            heading: "What Is Mangalavara (Tuesday) and What Is It For?",
            body: "Mangalavara is Tuesday, the third day of the vara cycle, ruled by Mangala (Mars), the graha of energy, courage, and discipline. In devotional practice Tuesday is widely kept for Hanuman, and many also direct the day toward Mangala remedies and the Goddess in her protective forms. The Mars association links the day to effort, boundaries, and constructive use of force. On Sadhaka, Mangalavara is framed as a weekly marker for disciplined action and protection rather than predictive timing.",
        },
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
        seoTitle: "Guruvara (Thursday): Brihaspati, the Guru, and Vishnu",
        seoDescription:
            "Guruvara is Thursday in the vara cycle, ruled by Brihaspati and traditionally devoted to the guru and to Vishnu. What the day means and how it is observed.",
        seoFacts: {
            heading: "What Is Guruvara (Thursday) and What Is It For?",
            body: "Guruvara, also called Brihaspativara, is Thursday, the fifth day of the vara cycle, ruled by Brihaspati (Jupiter), the guru among the grahas. The day is widely devoted to one's teacher and to Vishnu, and Sai Baba devotees in particular keep Thursday observances. The Jupiter association links the day to wisdom, ethics, and dharmic orientation. On Sadhaka, Guruvara is framed as a weekly marker for study and gratitude to teachers rather than predictive timing.",
        },
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
        seoTitle: "Shukravara (Friday): Shukra, Lakshmi, and the Goddess",
        seoDescription:
            "Shukravara is Friday in the vara cycle, ruled by Shukra and traditionally devoted to the Goddess and Lakshmi. What the day means and how it is observed.",
        seoFacts: {
            heading: "What Is Shukravara (Friday) and What Is It For?",
            body: "Shukravara is Friday, the sixth day of the vara cycle, ruled by Shukra (Venus), the graha of beauty, value, and relationship. The day is widely devoted to the Goddess in her forms, including Lakshmi and Durga, and Santoshi Maa observances are kept on Fridays. The Venus association links the day to harmony, devotion, and relational care. On Sadhaka, Shukravara is framed as a weekly marker for gratitude and devotional refinement rather than predictive timing.",
        },
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
        seoTitle: "Shanivara (Saturday): Shani, Hanuman, and Discipline",
        seoDescription:
            "Shanivara is Saturday in the vara cycle, ruled by Shani and traditionally devoted to Shani and Hanuman. What the day means and how it is observed.",
        seoFacts: {
            heading: "What Is Shanivara (Saturday) and What Is It For?",
            body: "Shanivara is Saturday, the seventh day of the vara cycle, ruled by Shani (Saturn), the graha of discipline, consequence, and patient labour. The day is widely devoted to Shani and to Hanuman, who is invoked for relief during difficult Saturn periods, and many keep a Saturday fast. The Saturn association links the day to honesty, simplification, and service. On Sadhaka, Shanivara is framed as a weekly marker for humble repair and karmic maturity rather than predictive timing.",
        },
    },
];

export const tithis: Tithi[] = ["Shukla", "Krishna"].flatMap((paksha) =>
    tithiBase.map(([name, deity, meaning], index) => {
        const isEnd = index === 14;
        const resolvedName = isEnd ? (paksha === "Shukla" ? "Purnima" : "Amavasya") : name;
        const slug = `${paksha.toLowerCase()}-${resolvedName.toLowerCase().replace(/\//g, "-").replace(/\s+/g, "-")}`;

        const seoOverride = tithiSeoOverrides[slug];

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
            ...(seoOverride ?? {}),
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

/**
 * Resolves the SERP title and description for a tithi page. Returns the
 * per-tithi `seoTitle`/`seoDescription` overrides when present; otherwise the
 * generic templated title and a description built from the tithi's narrative.
 * Pure function, safe to unit test in isolation.
 */
export function resolveTithiSeo(tithi: Tithi): { title: string; description: string } {
    return {
        title: tithi.seoTitle ?? `${tithi.name} Tithi`,
        description: tithi.seoDescription ?? tithi.description,
    };
}

/**
 * Resolves the SERP title and description for a vara page. Returns the per-vara
 * `seoTitle`/`seoDescription` overrides when present; otherwise the generic
 * templated title and the vara's narrative description. Mirrors
 * `resolveTithiSeo`. Pure function, safe to unit test in isolation.
 */
export function resolveVaraSeo(vara: Vara): { title: string; description: string } {
    return {
        title: vara.seoTitle ?? `${vara.name} Vara`,
        description: vara.seoDescription ?? vara.description,
    };
}