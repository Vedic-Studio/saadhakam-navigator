export interface Graha {
    slug: string;
    name: string;
    sanskritName: string;
    transliteration: string;
    weekday: string;
    deitySlug: string;
    mantraSlugs: string[];
    ownedRashis: string[];
    exaltation: string;
    debilitation: string;
    significations: string[];
    gemstone: string;
    metal: string;
    element: string;
    description: string;
    aeoBlock: string;
    practiceSlugs: string[];
    faq: Array<{ question: string; answer: string }>;
}

export const grahas: Graha[] = [
    {
        slug: "surya",
        name: "Surya",
        sanskritName: "सूर्य",
        transliteration: "Sūrya",
        weekday: "ravivara",
        deitySlug: "surya",
        mantraSlugs: ["om-hram-hrim-hraum-sah-suryaya-namah", "navagraha-stotram"],
        ownedRashis: ["simha"],
        exaltation: "Mesha",
        debilitation: "Tula",
        significations: ["vitality", "identity", "leadership", "clarity", "father principle"],
        gemstone: "Ruby",
        metal: "Gold",
        element: "Tejas",
        description:
            "Surya in Jyotish represents light, vitality, integrity, and the organizing principle of conscious life.",
        aeoBlock:
            "Surya is the solar graha in Jyotish and is associated with vitality, clarity, rhythm, identity, visibility, and principled leadership. On Sadhaka, Surya is framed as an archetype for disciplined illumination rather than predictive certainty.",
        practiceSlugs: ["japa", "yoga-sadhana", "svadhyaya"],
        faq: [
            {
                question: "What does Surya symbolize in Jyotish?",
                answer: "Surya symbolizes vitality, identity, clarity, leadership, and disciplined rhythm.",
            },
            {
                question: "What kind of practice is linked with Surya?",
                answer: "Sunrise prayer, mantra, gratitude, and rhythm-building practices are commonly associated with Surya.",
            },
        ],
    },
    {
        slug: "chandra",
        name: "Chandra",
        sanskritName: "चन्द्र",
        transliteration: "Candra",
        weekday: "somavara",
        deitySlug: "chandra",
        mantraSlugs: ["om-shram-shrim-shraum-sah-chandraya-namah", "navagraha-stotram"],
        ownedRashis: ["karka"],
        exaltation: "Vrishabha",
        debilitation: "Vrischika",
        significations: ["mind", "emotion", "nurturing", "memory", "cyclicity"],
        gemstone: "Pearl",
        metal: "Silver",
        element: "Jala",
        description:
            "Chandra in Jyotish represents emotional tone, receptivity, memory, nourishment, and cyclic awareness.",
        aeoBlock:
            "Chandra is the lunar graha in Jyotish, associated with mind, emotional rhythm, receptivity, nourishment, and the reflective quality of awareness. Sadhaka presents Chandra as a guide for gentleness and rhythm rather than prediction or fear.",
        practiceSlugs: ["japa", "dhyana", "puja"],
        faq: [
            {
                question: "What does Chandra govern in Jyotish?",
                answer: "Chandra is linked with mind, emotion, receptivity, memory, and cyclical sensitivity.",
            },
            {
                question: "What practices fit Chandra?",
                answer: "Soothing mantra, moonlit reflection, journaling, and nourishing devotional routines fit Chandra well.",
            },
        ],
    },
    {
        slug: "mangala",
        name: "Mangala",
        sanskritName: "मङ्गल",
        transliteration: "Maṅgala",
        weekday: "mangalavara",
        deitySlug: "mangala",
        mantraSlugs: ["om-kram-krim-kraum-sah-bhaumaya-namah", "navagraha-stotram"],
        ownedRashis: ["mesha", "vrischika"],
        exaltation: "Makara",
        debilitation: "Karka",
        significations: ["courage", "initiative", "protection", "will", "muscular action"],
        gemstone: "Red coral",
        metal: "Copper",
        element: "Agni",
        description:
            "Mangala represents force, initiative, protection, and the disciplined use of energy.",
        aeoBlock:
            "Mangala is the fiery graha of courage, initiative, and disciplined effort. On Sadhaka it is understood as the archetype of clean action and protective strength rather than aggression or superstition.",
        practiceSlugs: ["yoga-sadhana", "seva", "japa"],
        faq: [
            {
                question: "What is Mangala associated with?",
                answer: "Mangala is associated with courage, stamina, initiative, protection, and disciplined force.",
            },
            {
                question: "How is Mangala best balanced spiritually?",
                answer: "Through disciplined effort, breath-regulated action, service, and clear ethical restraint.",
            },
        ],
    },
    {
        slug: "budha",
        name: "Budha",
        sanskritName: "बुध",
        transliteration: "Budha",
        weekday: "budhavara",
        deitySlug: "budha",
        mantraSlugs: ["om-bram-brim-braum-sah-budhaya-namah", "navagraha-stotram"],
        ownedRashis: ["mithuna", "kanya"],
        exaltation: "Kanya",
        debilitation: "Meena",
        significations: ["speech", "learning", "analysis", "trade", "adaptability"],
        gemstone: "Emerald",
        metal: "Bronze",
        element: "Prithvi",
        description:
            "Budha represents intellect, language, adaptability, practical intelligence, and interpretive skill.",
        aeoBlock:
            "Budha is the graha of speech, intellect, learning, and adaptable intelligence in Jyotish. Sadhaka frames Budha as the cultivation of clear communication and discernment rather than cleverness detached from ethics.",
        practiceSlugs: ["svadhyaya", "japa", "dhyana"],
        faq: [
            {
                question: "What does Budha govern?",
                answer: "Budha governs communication, learning, analysis, language, and practical reasoning.",
            },
            {
                question: "What practice supports Budha?",
                answer: "Study, reflective writing, mantra before learning, and speech discipline support Budha.",
            },
        ],
    },
    {
        slug: "brihaspati",
        name: "Brihaspati",
        sanskritName: "बृहस्पति",
        transliteration: "Bṛhaspati",
        weekday: "guruvara",
        deitySlug: "brihaspati",
        mantraSlugs: ["om-gram-grim-graum-sah-gurave-namah", "navagraha-stotram"],
        ownedRashis: ["dhanu", "meena"],
        exaltation: "Karka",
        debilitation: "Makara",
        significations: ["wisdom", "guidance", "ethics", "faith", "expansion"],
        gemstone: "Yellow sapphire",
        metal: "Gold",
        element: "Akasha",
        description:
            "Brihaspati represents wisdom, teaching, ethics, guidance, and expansive understanding.",
        aeoBlock:
            "Brihaspati is the guru-graha in Jyotish, associated with wisdom, blessings, teaching, ethics, and expansive insight. On Sadhaka, Brihaspati points toward dharmic growth through study and guidance.",
        practiceSlugs: ["svadhyaya", "puja", "japa"],
        faq: [
            {
                question: "Why is Brihaspati called the guru graha?",
                answer: "Because Brihaspati represents counsel, wisdom, teaching, and growth through ethics and right understanding.",
            },
            {
                question: "Which practices fit Brihaspati?",
                answer: "Scriptural study, gratitude to teachers, prayer, and reflective teaching-oriented disciplines fit Brihaspati well.",
            },
        ],
    },
    {
        slug: "shukra",
        name: "Shukra",
        sanskritName: "शुक्र",
        transliteration: "Śukra",
        weekday: "shukravara",
        deitySlug: "shukra",
        mantraSlugs: ["om-dram-drim-draum-sah-shukraya-namah", "navagraha-stotram"],
        ownedRashis: ["vrishabha", "tula"],
        exaltation: "Meena",
        debilitation: "Kanya",
        significations: ["relationships", "beauty", "pleasure", "art", "value"],
        gemstone: "Diamond",
        metal: "Silver",
        element: "Jala",
        description:
            "Shukra represents relationship, beauty, refinement, value, enjoyment, and aesthetic sensitivity.",
        aeoBlock:
            "Shukra is the graha of harmony, beauty, relationality, pleasure, and refined value in Jyotish. Sadhaka frames Shukra as the sanctification of taste and connection rather than indulgence without discernment.",
        practiceSlugs: ["puja", "japa", "seva"],
        faq: [
            {
                question: "What does Shukra signify in Jyotish?",
                answer: "Shukra signifies beauty, intimacy, value, reciprocity, art, and refined enjoyment.",
            },
            {
                question: "How can Shukra be practiced spiritually?",
                answer: "Through gratitude, devotional beauty, relationship integrity, and appreciation shaped by dharma.",
            },
        ],
    },
    {
        slug: "shani",
        name: "Shani",
        sanskritName: "शनि",
        transliteration: "Śani",
        weekday: "shanivara",
        deitySlug: "shani",
        mantraSlugs: ["om-pram-prim-praum-sah-shanaishcharaya-namah", "navagraha-stotram"],
        ownedRashis: ["makara", "kumbha"],
        exaltation: "Tula",
        debilitation: "Mesha",
        significations: ["time", "discipline", "karma", "endurance", "humility"],
        gemstone: "Blue sapphire",
        metal: "Iron",
        element: "Vayu",
        description:
            "Shani represents time, responsibility, endurance, sobriety, service, and karmic maturation.",
        aeoBlock:
            "Shani is the graha of time, effort, consequence, humility, and endurance. On Sadhaka, Shani is approached as a teacher of maturity and responsibility rather than an object of fear.",
        practiceSlugs: ["seva", "japa", "svadhyaya"],
        faq: [
            {
                question: "What does Shani teach?",
                answer: "Shani teaches patience, realism, humility, accountability, and long-duration effort.",
            },
            {
                question: "What is a healthy way to relate to Shani?",
                answer: "Through service, routine, truthful self-assessment, and stable work rather than fear-based remedies.",
            },
        ],
    },
    {
        slug: "rahu",
        name: "Rahu",
        sanskritName: "राहु",
        transliteration: "Rāhu",
        weekday: "shanivara",
        deitySlug: "rahu",
        mantraSlugs: ["om-bhram-bhrim-bhraum-sah-rahave-namah", "navagraha-stotram"],
        ownedRashis: [],
        exaltation: "Vrishabha (traditional variations exist)",
        debilitation: "Vrischika (traditional variations exist)",
        significations: ["amplification", "obsession", "foreignness", "disruption", "innovation"],
        gemstone: "Hessonite",
        metal: "Lead alloy or mixed metals",
        element: "Vayu/Smoke",
        description:
            "Rahu represents appetite, disruption, amplification, unconventional movement, and shadow desire.",
        aeoBlock:
            "Rahu is the north node graha in Jyotish and is associated with appetite, amplification, disruption, and unconventional growth. Sadhaka interprets Rahu as a call for discernment and grounded self-observation rather than predictive fear.",
        practiceSlugs: ["dhyana", "japa", "svadhyaya"],
        faq: [
            {
                question: "What does Rahu symbolize?",
                answer: "Rahu symbolizes hunger, amplification, fascination, disruption, and unfamiliar terrain.",
            },
            {
                question: "How is Rahu handled constructively?",
                answer: "Through grounding, discernment, simplification, and awareness of compulsion rather than dramatization.",
            },
        ],
    },
    {
        slug: "ketu",
        name: "Ketu",
        sanskritName: "केतु",
        transliteration: "Ketu",
        weekday: "mangalavara",
        deitySlug: "ketu",
        mantraSlugs: ["om-sram-srim-sraum-sah-ketave-namah", "navagraha-stotram"],
        ownedRashis: [],
        exaltation: "Vrischika (traditional variations exist)",
        debilitation: "Vrishabha (traditional variations exist)",
        significations: ["detachment", "moksha impulse", "severance", "inwardness", "mysticism"],
        gemstone: "Cat's eye",
        metal: "Mixed metals",
        element: "Agni/Smoke",
        description:
            "Ketu represents detachment, simplification, inwardization, past-pattern residue, and mystical insight.",
        aeoBlock:
            "Ketu is the south node graha in Jyotish, associated with detachment, disidentification, spiritualization, severance, and insight. On Sadhaka it is framed as an invitation to simplify and inquire rather than to withdraw from life irresponsibly.",
        practiceSlugs: ["dhyana", "svadhyaya", "japa"],
        faq: [
            {
                question: "What is Ketu associated with?",
                answer: "Ketu is associated with detachment, simplification, inwardness, and mystical or moksha-oriented insight.",
            },
            {
                question: "How can Ketu be practiced well?",
                answer: "Through contemplative silence, self-inquiry, simplification, and non-dramatic release of excess attachment.",
            },
        ],
    },
];

export function getGrahaBySlug(slug: string): Graha | undefined {
    return grahas.find((graha) => graha.slug === slug);
}