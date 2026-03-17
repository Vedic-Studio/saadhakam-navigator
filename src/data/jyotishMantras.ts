import type { Mantra } from "@/data/mantras";

export const jyotishMantras: Mantra[] = [
    {
        id: "mantra-surya-graha",
        slug: "om-hram-hrim-hraum-sah-suryaya-namah",
        name: "Om Hram Hrim Hraum Sah Suryaya Namah",
        devanagari: "ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः",
        transliteration: "oṁ hrāṁ hrīṁ hrauṁ saḥ sūryāya namaḥ",
        oneLineMeaning: "I bow to Surya, source of clarity, vitality, and illumining discipline.",
        tradition: ["Jyotisha", "Vedic"],
        deityFocus: "Surya",
        purpose: ["clarity", "vitality", "rhythm"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Sunday sunrise or morning sun practice",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Face the morning light if possible.",
                "Use for steadiness and disciplined renewal, not prediction.",
            ],
        },
        relatedMantras: ["gayatri-mantra", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Surya?", href: "/deities/surya" },
            { text: "Surya Graha Guide", href: "/jyotish/grahas/surya" },
        ],
        faq: [
            {
                question: "When is Surya mantra usually practiced?",
                answer: "Traditionally at sunrise or on Sunday, with emphasis on clarity, gratitude, and disciplined routine.",
            },
        ],
    },
    {
        id: "mantra-chandra-graha",
        slug: "om-shram-shrim-shraum-sah-chandraya-namah",
        name: "Om Shram Shrim Shraum Sah Chandraya Namah",
        devanagari: "ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः",
        transliteration: "oṁ śrāṁ śrīṁ śrauṁ saḥ candrāya namaḥ",
        oneLineMeaning: "I bow to Chandra, cooling mind and emotional rhythm.",
        tradition: ["Jyotisha", "Vedic"],
        deityFocus: "Chandra",
        purpose: ["emotional steadiness", "soothing", "reflection"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Monday evening or calm twilight",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Useful when the mind feels over-agitated or emotionally scattered.",
                "Pair with gentle breathing rather than forceful chanting.",
            ],
        },
        relatedMantras: ["soham", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Chandra?", href: "/deities/chandra" },
            { text: "Chandra Graha Guide", href: "/jyotish/grahas/chandra" },
        ],
        faq: [
            {
                question: "What is Chandra mantra used for?",
                answer: "It is commonly used for calming, emotional regulation, and reflective steadiness.",
            },
        ],
    },
    {
        id: "mantra-mangala-graha",
        slug: "om-kram-krim-kraum-sah-bhaumaya-namah",
        name: "Om Kram Krim Kraum Sah Bhaumaya Namah",
        devanagari: "ॐ क्रां क्रीं क्रौं सः भौमाय नमः",
        transliteration: "oṁ krāṁ krīṁ krauṁ saḥ bhaumāya namaḥ",
        oneLineMeaning: "I bow to Mangala, source of disciplined courage and directed energy.",
        tradition: ["Jyotisha", "Navagraha"],
        deityFocus: "Mangala",
        purpose: ["discipline", "courage", "constructive action"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Tuesday morning",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Keep posture upright and breath steady.",
                "Frame practice around courageous service, not domination.",
            ],
        },
        relatedMantras: ["om-hanumate-namah", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Mangala?", href: "/deities/mangala" },
            { text: "Mangala Graha Guide", href: "/jyotish/grahas/mangala" },
        ],
        faq: [
            {
                question: "What is Mangala mantra good for?",
                answer: "It is used for channeling energy into disciplined effort, courage, and clean action.",
            },
        ],
    },
    {
        id: "mantra-budha-graha",
        slug: "om-bram-brim-braum-sah-budhaya-namah",
        name: "Om Bram Brim Braum Sah Budhaya Namah",
        devanagari: "ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः",
        transliteration: "oṁ brāṁ brīṁ brauṁ saḥ budhāya namaḥ",
        oneLineMeaning: "I bow to Budha, source of speech, learning, and discrimination.",
        tradition: ["Jyotisha", "Navagraha"],
        deityFocus: "Budha",
        purpose: ["study", "speech", "clarity"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Wednesday morning before study or work",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Good before writing, teaching, or planning.",
                "Keep pronunciation careful and unhurried.",
            ],
        },
        relatedMantras: ["om-aim-saraswatyai-namah", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Budha?", href: "/deities/budha" },
            { text: "Budha Graha Guide", href: "/jyotish/grahas/budha" },
        ],
        faq: [
            {
                question: "Who should use Budha mantra?",
                answer: "It suits students, teachers, writers, and anyone wanting steadier speech and thought.",
            },
        ],
    },
    {
        id: "mantra-brihaspati-graha",
        slug: "om-gram-grim-graum-sah-gurave-namah",
        name: "Om Gram Grim Graum Sah Gurave Namah",
        devanagari: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः",
        transliteration: "oṁ grāṁ grīṁ grauṁ saḥ gurave namaḥ",
        oneLineMeaning: "I bow to Brihaspati, the guru principle of wisdom and counsel.",
        tradition: ["Jyotisha", "Navagraha"],
        deityFocus: "Brihaspati",
        purpose: ["wisdom", "guidance", "ethical intelligence"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Thursday morning",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Useful before teaching, mentoring, or scriptural study.",
                "Approach with humility rather than acquisition mentality.",
            ],
        },
        relatedMantras: ["gayatri-mantra", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Brihaspati?", href: "/deities/brihaspati" },
            { text: "Brihaspati Graha Guide", href: "/jyotish/grahas/brihaspati" },
        ],
        faq: [
            {
                question: "What is Brihaspati mantra for?",
                answer: "It is associated with guidance, wisdom, ethics, and benefic expansion rooted in dharma.",
            },
        ],
    },
    {
        id: "mantra-shukra-graha",
        slug: "om-dram-drim-draum-sah-shukraya-namah",
        name: "Om Dram Drim Draum Sah Shukraya Namah",
        devanagari: "ॐ द्रां द्रीं द्रौं सः शुक्राय नमः",
        transliteration: "oṁ drāṁ drīṁ drauṁ saḥ śukrāya namaḥ",
        oneLineMeaning: "I bow to Shukra, source of refinement, harmony, and balanced enjoyment.",
        tradition: ["Jyotisha", "Navagraha"],
        deityFocus: "Shukra",
        purpose: ["harmony", "relationship balance", "refinement"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Friday at dawn or evening lamp-lighting",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Useful for gratitude, beauty, and relational steadiness.",
                "Keep practice clean and sattvic rather than indulgent.",
            ],
        },
        relatedMantras: ["om-shreem-mahalakshmyai-namah", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Shukra?", href: "/deities/shukra" },
            { text: "Shukra Graha Guide", href: "/jyotish/grahas/shukra" },
        ],
        faq: [
            {
                question: "What does Shukra mantra support?",
                answer: "It is traditionally used for harmony, beauty, relational grace, and value alignment.",
            },
        ],
    },
    {
        id: "mantra-shani-graha",
        slug: "om-pram-prim-praum-sah-shanaishcharaya-namah",
        name: "Om Pram Prim Praum Sah Shanaishcharaya Namah",
        devanagari: "ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः",
        transliteration: "oṁ prāṁ prīṁ prauṁ saḥ śanaiścarāya namaḥ",
        oneLineMeaning: "I bow to Shani, teacher of time, discipline, humility, and karmic responsibility.",
        tradition: ["Jyotisha", "Navagraha"],
        deityFocus: "Shani",
        purpose: ["discipline", "humility", "endurance"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Saturday morning or twilight",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Pair with seva or practical responsibility.",
                "Approach Shani as a teacher of maturity, not fear.",
            ],
        },
        relatedMantras: ["om-hanumate-namah", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Shani?", href: "/deities/shani" },
            { text: "Shani Graha Guide", href: "/jyotish/grahas/shani" },
        ],
        faq: [
            {
                question: "Why is Shani mantra practiced on Saturday?",
                answer: "Saturday is associated with Shani and is often used for humility, discipline, and service-oriented practice.",
            },
        ],
    },
    {
        id: "mantra-rahu-graha",
        slug: "om-bhram-bhrim-bhraum-sah-rahave-namah",
        name: "Om Bhram Bhrim Bhraum Sah Rahave Namah",
        devanagari: "ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः",
        transliteration: "oṁ bhrāṁ bhrīṁ bhrauṁ saḥ rāhave namaḥ",
        oneLineMeaning: "I bow to Rahu, asking for discernment amidst obsession, disruption, and intensity.",
        tradition: ["Jyotisha", "Navagraha"],
        deityFocus: "Rahu",
        purpose: ["discernment", "containment", "shadow work"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Saturday evening or during reflective practice",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Keep framing grounded and non-superstitious.",
                "Useful for clarifying appetite, anxiety, and over-amplification.",
            ],
        },
        relatedMantras: ["om-dum-durgayei-namah", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Rahu?", href: "/deities/rahu" },
            { text: "Rahu Graha Guide", href: "/jyotish/grahas/rahu" },
        ],
        faq: [
            {
                question: "How should Rahu mantra be approached?",
                answer: "With grounding and discernment. Rahu is best treated as an invitation to contain intensity rather than dramatize it.",
            },
        ],
    },
    {
        id: "mantra-ketu-graha",
        slug: "om-sram-srim-sraum-sah-ketave-namah",
        name: "Om Sram Srim Sraum Sah Ketave Namah",
        devanagari: "ॐ स्रां स्रीं स्रौं सः केतवे नमः",
        transliteration: "oṁ srāṁ srīṁ srauṁ saḥ ketave namaḥ",
        oneLineMeaning: "I bow to Ketu, the force of detachment, simplification, and inward insight.",
        tradition: ["Jyotisha", "Navagraha"],
        deityFocus: "Ketu",
        purpose: ["detachment", "inner clarity", "simplification"],
        source: ["Navagraha mantra traditions"],
        practice: {
            bestTime: "Tuesday dawn or contemplative silence",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Good alongside self-inquiry, journaling, or simplified routine.",
                "Use to support release and inwardization rather than withdrawal from responsibility.",
            ],
        },
        relatedMantras: ["soham", "navagraha-stotram"],
        relatedLinks: [
            { text: "Who is Ketu?", href: "/deities/ketu" },
            { text: "Ketu Graha Guide", href: "/jyotish/grahas/ketu" },
        ],
        faq: [
            {
                question: "What does Ketu mantra emphasize?",
                answer: "Detachment, inwardness, simplification, and a more reflective orientation to spiritual practice.",
            },
        ],
    },
    {
        id: "mantra-navagraha-stotram",
        slug: "navagraha-stotram",
        name: "Navagraha Stotram",
        transliteration: "navagraha stotram",
        oneLineMeaning: "A nine-verse hymn honoring the Navagraha as archetypal forces of rhythm, karma, and spiritual reflection.",
        tradition: ["Jyotisha", "Smarta"],
        deityFocus: "Navagraha",
        purpose: ["integrative practice", "rhythm", "reflection"],
        source: ["Navagraha stotra traditions"],
        practice: {
            bestTime: "Morning, especially before weekly graha-oriented observances",
            repetitions: "1 full recitation",
            notes: [
                "Use as a non-predictive devotional reflection on the nine grahas.",
                "Can be paired with one focused graha mantra depending on the weekday.",
            ],
        },
        relatedMantras: [
            "om-hram-hrim-hraum-sah-suryaya-namah",
            "om-shram-shrim-shraum-sah-chandraya-namah",
            "om-pram-prim-praum-sah-shanaishcharaya-namah",
        ],
        relatedLinks: [
            { text: "Navagraha Stotram", href: "/stotras/navagraha-stotram" },
            { text: "Jyotish Hub", href: "/jyotish" },
        ],
        faq: [
            {
                question: "Is the Navagraha Stotram predictive astrology?",
                answer: "No. On Sadhaka it is framed as reflective devotional practice oriented toward rhythm, discipline, and self-observation.",
            },
        ],
    },
];