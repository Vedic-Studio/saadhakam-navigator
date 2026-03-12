export interface Mantra {
    id: string;
    slug: string;
    name: string;
    devanagari?: string;
    transliteration: string;
    oneLineMeaning: string;
    tradition: string[];
    deityFocus?: string;
    purpose: string[];
    source: string[];
    practice: {
        bestTime: string;
        repetitions: string;
        notes: string[];
    };
    relatedMantras: string[];
    relatedLinks: { text: string; href: string }[];
    faq: { question: string; answer: string }[];
}

export const mantras: Mantra[] = [
    {
        id: "mantra-om-namah-shivaya",
        slug: "om-namah-shivaya",
        name: "Om Namah Shivaya",
        devanagari: "ॐ नमः शिवाय",
        transliteration: "oṁ namaḥ śivāya",
        oneLineMeaning: "I bow to Shiva, the auspicious inner consciousness.",
        tradition: ["Shaivism", "Smarta"],
        deityFocus: "Shiva",
        purpose: ["inner stillness", "ego-softening", "grounded detachment"],
        source: ["Yajurveda tradition", "Shaiva mantra streams"],
        practice: {
            bestTime: "Brahma muhurta or sunset",
            repetitions: "108 repetitions (1 mala)",
            notes: [
                "Keep breath natural; avoid forceful chanting.",
                "Useful for stabilizing mind before self-inquiry.",
            ],
        },
        relatedMantras: ["mahamrityunjaya-mantra", "soham", "om-shanti"],
        relatedLinks: [
            { text: "Who is Shiva?", href: "/deities/shiva" },
            { text: "How to Start Japa", href: "/how-to-start-japa" },
        ],
        faq: [
            {
                question: "Can beginners chant Om Namah Shivaya without initiation?",
                answer:
                    "Yes. It is widely taught as a universal Shiva mantra and commonly used in beginner japa practice.",
            },
            {
                question: "What is the best use of this mantra?",
                answer:
                    "It is especially effective for calming mental agitation, softening ego-reactivity, and cultivating devotional steadiness.",
            },
        ],
    },
    {
        id: "mantra-gayatri-mantra",
        slug: "gayatri-mantra",
        name: "Gayatri Mantra",
        devanagari: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं...",
        transliteration: "oṁ bhūr bhuvaḥ svaḥ tat savitur vareṇyaṁ...",
        oneLineMeaning: "May the divine light illumine our intellect.",
        tradition: ["Vedic", "Smarta"],
        deityFocus: "Savitr (solar intelligence)",
        purpose: ["clarity", "intellect purification", "daily sandhya practice"],
        source: ["Rigveda 3.62.10"],
        practice: {
            bestTime: "Sunrise and sunset",
            repetitions: "9, 27, or 108 repetitions",
            notes: [
                "Pronunciation matters; learn carefully.",
                "Traditionally integrated with sandhyavandanam.",
            ],
        },
        relatedMantras: ["om-shanti", "hari-om", "soham"],
        relatedLinks: [
            { text: "Sacred Texts & Teachings", href: "/sacred-texts-teachings" },
            { text: "10 Powerful Sanskrit Mantras", href: "/10-powerful-sanskrit-mantras" },
        ],
        faq: [
            {
                question: "Is Gayatri only for initiated practitioners?",
                answer:
                    "Traditions vary. Many modern teachers share it openly, while some lineages still prefer formal initiation and guided pronunciation.",
            },
            {
                question: "What does Gayatri develop in practice?",
                answer:
                    "Consistent chanting is associated with sharper discernment, mental brightness, and ethical clarity in daily action.",
            },
        ],
    },
    {
        id: "mantra-mahamrityunjaya",
        slug: "mahamrityunjaya-mantra",
        name: "Maha Mrityunjaya Mantra",
        devanagari: "ॐ त्र्यम्बकं यजामहे...",
        transliteration: "oṁ tryambakaṁ yajāmahe...",
        oneLineMeaning: "May we be liberated from fear and mortality, like a ripe fruit released from its stem.",
        tradition: ["Shaivism", "Vedic"],
        deityFocus: "Shiva (Tryambaka)",
        purpose: ["healing support", "fear of death", "resilience in crisis"],
        source: ["Rigveda 7.59.12", "Yajurveda tradition"],
        practice: {
            bestTime: "Early morning or during difficult phases",
            repetitions: "108 repetitions, or 3/9 repetitions daily",
            notes: [
                "Use as spiritual support, not medical replacement.",
                "Traditionally recited for wellbeing and courage.",
            ],
        },
        relatedMantras: ["om-namah-shivaya", "om-shanti", "ram-ram-ram"],
        relatedLinks: [
            { text: "Who is Shiva?", href: "/deities/shiva" },
            { text: "Fear of Death Through Advaita", href: "/fear-of-death-advaita-vedanta" },
        ],
        faq: [
            {
                question: "Is this mantra only for illness?",
                answer:
                    "No. It is also used for inner strength, fear regulation, and contemplative acceptance of impermanence.",
            },
            {
                question: "Can this mantra be chanted daily?",
                answer:
                    "Yes, many practitioners chant a short daily count and use longer rounds during stressful periods.",
            },
        ],
    },
    {
        id: "mantra-om-namo-narayanaya",
        slug: "om-namo-narayanaya",
        name: "Om Namo Narayanaya",
        devanagari: "ॐ नमो नारायणाय",
        transliteration: "oṁ namo nārāyaṇāya",
        oneLineMeaning: "I bow to Narayana, the sustaining divine presence.",
        tradition: ["Vaishnavism"],
        deityFocus: "Narayana (Vishnu)",
        purpose: ["devotion", "emotional steadiness", "surrender"],
        source: ["Vaishnava mantra traditions", "Narayana upasana streams"],
        practice: {
            bestTime: "Morning or evening puja",
            repetitions: "108 repetitions",
            notes: [
                "Combine with heart-centered attention.",
                "Useful in bhakti-oriented daily routines.",
            ],
        },
        relatedMantras: ["om-namo-bhagavate-vasudevaya", "hari-om", "om-shanti"],
        relatedLinks: [
            { text: "Who is Vishnu?", href: "/deities/vishnu" },
            { text: "Spiritual Traditions & Paths", href: "/spiritual-traditions-paths" },
        ],
        faq: [
            {
                question: "What is the difference between Narayana and Vishnu mantra forms?",
                answer:
                    "Both refer to the sustaining Vaishnava divine principle; specific wording reflects lineage preference and devotional mood.",
            },
            {
                question: "Is this mantra suitable for anxious minds?",
                answer:
                    "Yes. Its repetitive rhythm and devotional focus often reduce mental restlessness.",
            },
        ],
    },
    {
        id: "mantra-om-namo-bhagavate-vasudevaya",
        slug: "om-namo-bhagavate-vasudevaya",
        name: "Om Namo Bhagavate Vasudevaya",
        devanagari: "ॐ नमो भगवते वासुदेवाय",
        transliteration: "oṁ namo bhagavate vāsudevāya",
        oneLineMeaning: "I bow to Bhagavan Vasudeva, the indwelling Lord.",
        tradition: ["Vaishnavism", "Bhakti"],
        deityFocus: "Krishna/Vasudeva",
        purpose: ["devotional absorption", "mind purification", "surrender"],
        source: ["Bhagavata Purana traditions", "Vaishnava mantra lineages"],
        practice: {
            bestTime: "Morning japa or evening devotional practice",
            repetitions: "108 repetitions",
            notes: [
                "Can be used as steady long-term ishta-mantra.",
                "Works well with kirtan or silent japa.",
            ],
        },
        relatedMantras: ["om-namo-narayanaya", "hari-om", "ram-ram-ram"],
        relatedLinks: [
            { text: "Who is Krishna?", href: "/deities/krishna" },
            { text: "Bhagavad Gita Complete Guide", href: "/bhagavad-gita-complete-guide" },
        ],
        faq: [
            {
                question: "Is this mantra specific to Krishna bhakti?",
                answer:
                    "It is strongly associated with Krishna-Vasudeva devotion, though some practitioners use it as a broader Vishnu mantra.",
            },
            {
                question: "Can I chant it mentally?",
                answer:
                    "Yes. Start audible or whisper-level if needed, then gradually move toward manasika (mental) japa.",
            },
        ],
    },
    {
        id: "mantra-soham",
        slug: "soham",
        name: "Soham",
        devanagari: "सोऽहम्",
        transliteration: "so'ham",
        oneLineMeaning: "I am That.",
        tradition: ["Vedanta", "Yoga"],
        purpose: ["self-inquiry support", "breath-linked meditation", "non-dual remembrance"],
        source: ["Upanishadic contemplative tradition", "Hamsa mantra streams"],
        practice: {
            bestTime: "Any seated meditation window",
            repetitions: "Breath-synchronized (So on inhale, Ham on exhale)",
            notes: [
                "Ideal for subtle, non-devotional contemplation.",
                "Avoid strain; let mantra follow natural breath.",
            ],
        },
        relatedMantras: ["om-namah-shivaya", "om-shanti", "hari-om"],
        relatedLinks: [
            { text: "Advaita Vedanta Explained", href: "/advaita-vedanta-explained" },
            { text: "What is Vedanta?", href: "/what-is-vedanta" },
        ],
        faq: [
            {
                question: "Is Soham a breathing technique or mantra?",
                answer:
                    "Both. It is a mantra naturally synchronized with breath and used as a contemplative bridge into witness-awareness.",
            },
            {
                question: "Who should use Soham?",
                answer:
                    "It suits seekers drawn to inquiry-based or non-dual meditation styles.",
            },
        ],
    },
    {
        id: "mantra-om-shanti",
        slug: "om-shanti",
        name: "Om Shanti",
        devanagari: "ॐ शान्तिः शान्तिः शान्तिः",
        transliteration: "oṁ śāntiḥ śāntiḥ śāntiḥ",
        oneLineMeaning: "Invocation of peace at personal, relational, and cosmic levels.",
        tradition: ["Vedic", "Universal"],
        purpose: ["peace cultivation", "closing practice", "conflict softening"],
        source: ["Upanishadic shanti mantras", "Vedic chanting tradition"],
        practice: {
            bestTime: "Start or end of meditation, study, or gatherings",
            repetitions: "3, 9, or 27 repetitions",
            notes: [
                "Traditionally repeated three times for layered peace invocation.",
                "Excellent transition mantra after stressful work blocks.",
            ],
        },
        relatedMantras: ["soham", "gayatri-mantra", "hari-om"],
        relatedLinks: [
            { text: "Daily Spiritual Routine", href: "/daily-spiritual-routine-beginners" },
            { text: "How to Start Meditating Daily", href: "/how-to-start-meditating-daily" },
        ],
        faq: [
            {
                question: "Why is Shanti repeated three times?",
                answer:
                    "Traditionally it addresses disturbances from internal, external, and cosmic/environmental layers.",
            },
            {
                question: "Can Om Shanti be used outside ritual?",
                answer:
                    "Yes. It is one of the most universal and context-flexible mantras.",
            },
        ],
    },
    {
        id: "mantra-hanuman-chalisa",
        slug: "hanuman-chalisa",
        name: "Hanuman Chalisa",
        transliteration: "hanumān cālīsā",
        oneLineMeaning: "Forty-verse devotional hymn invoking Hanuman's courage and protection.",
        tradition: ["Rama Bhakti", "North Indian devotional"],
        deityFocus: "Hanuman",
        purpose: ["courage", "devotional strength", "obstacle navigation"],
        source: ["Tulsidas (Awadhi bhakti tradition)"],
        practice: {
            bestTime: "Tuesday/Saturday or daily evening recitation",
            repetitions: "1 full recitation (or 3/7/11 times in vrata contexts)",
            notes: [
                "Technically a stotra rather than a bija-style mantra.",
                "Commonly used for emotional courage and protection.",
            ],
        },
        relatedMantras: ["ram-ram-ram", "hari-om", "om-shanti"],
        relatedLinks: [
            { text: "Who is Hanuman?", href: "/deities/hanuman" },
            { text: "Spiritual Traditions & Paths", href: "/spiritual-traditions-paths" },
        ],
        faq: [
            {
                question: "Is Hanuman Chalisa a mantra?",
                answer:
                    "Strictly it is a devotional hymn, but in practical bhakti life it functions similarly to mantra through repeated recitation.",
            },
            {
                question: "Can beginners recite it without perfect pronunciation?",
                answer:
                    "Yes. Begin sincerely, improve pronunciation over time, and keep rhythm steady.",
            },
        ],
    },
    {
        id: "mantra-ram-ram-ram",
        slug: "ram-ram-ram",
        name: "Ram Ram Ram",
        devanagari: "राम राम राम",
        transliteration: "rām rām rām",
        oneLineMeaning: "Repetition of Rama-nama for purification and devotional steadiness.",
        tradition: ["Rama Bhakti", "Bhakti"],
        deityFocus: "Rama",
        purpose: ["heart-centering", "grief support", "ethical focus"],
        source: ["Ram bhakti lineage traditions", "Nama japa streams"],
        practice: {
            bestTime: "Anytime japa, especially while walking or during stress",
            repetitions: "108 repetitions or continuous nama-japa",
            notes: [
                "Simple structure makes it highly repeatable.",
                "Often paired with Hanuman devotion.",
            ],
        },
        relatedMantras: ["hanuman-chalisa", "om-namo-bhagavate-vasudevaya", "hari-om"],
        relatedLinks: [
            { text: "Who is Rama?", href: "/deities/rama" },
            { text: "How to Start Japa", href: "/how-to-start-japa" },
        ],
        faq: [
            {
                question: "Is Rama nama suitable for continuous repetition through the day?",
                answer:
                    "Yes. Its brevity and rhythm make it ideal for informal ongoing remembrance.",
            },
            {
                question: "What is the psychological effect of Rama japa?",
                answer:
                    "Practitioners commonly report emotional steadiness, reduced mental noise, and a stronger sense of moral direction.",
            },
        ],
    },
    {
        id: "mantra-hari-om",
        slug: "hari-om",
        name: "Hari Om",
        devanagari: "हरि ॐ",
        transliteration: "hari oṁ",
        oneLineMeaning: "Invocation of the divine as remover and harmonizer of suffering.",
        tradition: ["Vaishnava", "Universal yoga usage"],
        deityFocus: "Hari (Vishnu principle)",
        purpose: ["centering", "group chanting", "daily closure"],
        source: ["Bhakti and kirtan traditions"],
        practice: {
            bestTime: "Morning invocation or end of meditation/yoga",
            repetitions: "11, 27, or 108 repetitions",
            notes: [
                "Simple and accessible for group chanting.",
                "Can be used as a transition mantra between tasks.",
            ],
        },
        relatedMantras: ["om-namo-narayanaya", "om-shanti", "soham"],
        relatedLinks: [
            { text: "Who is Vishnu?", href: "/deities/vishnu" },
            { text: "Practical Spiritual Practices", href: "/practical-spiritual-practices" },
        ],
        faq: [
            {
                question: "Is Hari Om sectarian?",
                answer:
                    "It has Vaishnava roots but is widely used in cross-tradition yoga and mantra practice contexts.",
            },
            {
                question: "Can Hari Om be used as a beginner mantra?",
                answer:
                    "Yes. It is one of the easiest starting points for regular chanting.",
            },
        ],
    },
    {
        id: "mantra-om-gam-ganapataye-namah",
        slug: "om-gam-ganapataye-namah",
        name: "Om Gam Ganapataye Namah",
        devanagari: "ॐ गं गणपतये नमः",
        transliteration: "oṁ gaṁ gaṇapataye namaḥ",
        oneLineMeaning: "I bow to Ganesha, remover of obstacles and lord of wise beginnings.",
        tradition: ["Ganapatya", "Smarta"],
        deityFocus: "Ganesha",
        purpose: ["new beginnings", "obstacle clearing", "study focus"],
        source: ["Ganesha upasana traditions"],
        practice: {
            bestTime: "Before starting major tasks or morning practice",
            repetitions: "21 or 108 repetitions",
            notes: [
                "Useful before exams, new projects, and travel.",
                "Chant with steady pace and clear pronunciation of 'Gam'.",
            ],
        },
        relatedMantras: ["om-shanti", "hari-om", "gayatri-mantra"],
        relatedLinks: [
            { text: "Who is Ganesha?", href: "/deities/ganesha" },
            { text: "How to Choose a Mantra", href: "/how-to-choose-a-mantra" },
        ],
        faq: [
            {
                question: "Can I chant this mantra daily as a beginner?",
                answer: "Yes. It is among the most beginner-friendly and widely used Sanskrit mantras.",
            },
            {
                question: "When is this mantra most useful?",
                answer: "Before initiating important actions where clarity and obstacle-reduction are needed.",
            },
        ],
    },
    {
        id: "mantra-om-shreem-mahalakshmyai-namah",
        slug: "om-shreem-mahalakshmyai-namah",
        name: "Om Shreem Mahalakshmyai Namah",
        devanagari: "ॐ श्रीं महालक्ष्म्यै नमः",
        transliteration: "oṁ śrīṁ mahālakṣmyai namaḥ",
        oneLineMeaning: "I bow to Mahalakshmi, source of auspicious abundance and harmony.",
        tradition: ["Vaishnavism", "Shakta"],
        deityFocus: "Lakshmi",
        purpose: ["prosperity with dharma", "household harmony", "gratitude"],
        source: ["Lakshmi upasana traditions", "Sri Vidya streams"],
        practice: {
            bestTime: "Friday mornings or evening lamp-lighting",
            repetitions: "108 repetitions",
            notes: [
                "Frame prosperity as stewardship, not greed.",
                "Pair with gratitude and ethical action.",
            ],
        },
        relatedMantras: ["om-shanti", "hari-om", "gayatri-mantra"],
        relatedLinks: [
            { text: "Who is Lakshmi?", href: "/deities/lakshmi" },
            { text: "Practical Spiritual Practices", href: "/practical-spiritual-practices" },
        ],
        faq: [
            {
                question: "Is this mantra only for money?",
                answer: "No. Traditionally it invokes holistic abundance: clarity, nourishment, relationship harmony, and ethical prosperity.",
            },
            {
                question: "Can this mantra be chanted without initiation?",
                answer: "Yes, this form is commonly used in open devotional practice.",
            },
        ],
    },
    {
        id: "mantra-om-aim-saraswatyai-namah",
        slug: "om-aim-saraswatyai-namah",
        name: "Om Aim Saraswatyai Namah",
        devanagari: "ॐ ऐं सरस्वत्यै नमः",
        transliteration: "oṁ aiṁ saraswatyai namaḥ",
        oneLineMeaning: "I bow to Saraswati, goddess of wisdom, speech, and learning.",
        tradition: ["Smarta", "Shakta"],
        deityFocus: "Saraswati",
        purpose: ["learning", "clarity in speech", "creative expression"],
        source: ["Saraswati mantra traditions"],
        practice: {
            bestTime: "Before study, writing, or teaching",
            repetitions: "27 or 108 repetitions",
            notes: [
                "Particularly useful for students and educators.",
                "Keep pronunciation soft and refined.",
            ],
        },
        relatedMantras: ["gayatri-mantra", "om-shanti", "soham"],
        relatedLinks: [
            { text: "Who is Saraswati?", href: "/deities/saraswati" },
            { text: "Sacred Texts & Teachings", href: "/sacred-texts-teachings" },
        ],
        faq: [
            {
                question: "Who should chant this mantra?",
                answer: "Anyone seeking support in study, communication, music, writing, and disciplined learning.",
            },
            {
                question: "Is this a good exam mantra?",
                answer: "Yes, many students use it to steady attention and reduce exam anxiety.",
            },
        ],
    },
    {
        id: "mantra-om-dum-durgayei-namah",
        slug: "om-dum-durgayei-namah",
        name: "Om Dum Durgayei Namah",
        devanagari: "ॐ दुं दुर्गायै नमः",
        transliteration: "oṁ duṁ durgāyei namaḥ",
        oneLineMeaning: "I bow to Durga, protective force who removes fear and adversity.",
        tradition: ["Shakta"],
        deityFocus: "Durga",
        purpose: ["protection", "courage", "boundary strength"],
        source: ["Durga upasana", "Devi traditions"],
        practice: {
            bestTime: "Morning or during difficult life phases",
            repetitions: "108 repetitions",
            notes: [
                "Useful when emotional boundaries feel weak.",
                "Best practiced with calm, grounded breathing.",
            ],
        },
        relatedMantras: ["mahamrityunjaya-mantra", "om-shanti", "ram-ram-ram"],
        relatedLinks: [
            { text: "Who is Durga?", href: "/deities/durga" },
            { text: "Starting Spiritual Practice", href: "/starting-spiritual-practice" },
        ],
        faq: [
            {
                question: "Is this mantra only for Navaratri?",
                answer: "No. It is commonly used year-round as a protective and strengthening practice.",
            },
            {
                question: "Can this mantra help with fear?",
                answer: "Traditionally yes; it is often used to cultivate inner stability under pressure.",
            },
        ],
    },
    {
        id: "mantra-krim-kalikayai-namah",
        slug: "krim-kalikayai-namah",
        name: "Krim Kalikayai Namah",
        devanagari: "क्रीं कालिकायै नमः",
        transliteration: "krīṁ kālikāyai namaḥ",
        oneLineMeaning: "I bow to Kali, transformative power that dissolves fear and false identity.",
        tradition: ["Shakta", "Tantric"],
        deityFocus: "Kali",
        purpose: ["deep transformation", "fear release", "ego softening"],
        source: ["Kali upasana traditions"],
        practice: {
            bestTime: "Dusk or disciplined evening practice",
            repetitions: "27 or 108 repetitions",
            notes: [
                "Beginners should keep practice simple and grounded.",
                "If intense emotions arise, reduce count and add Om Shanti.",
            ],
        },
        relatedMantras: ["om-shanti", "soham", "om-namah-shivaya"],
        relatedLinks: [
            { text: "Who is Kali?", href: "/deities/kali" },
            { text: "Can I Chant a Mantra Without Initiation?", href: "/can-i-chant-a-mantra-without-initiation" },
        ],
        faq: [
            {
                question: "Is Kali mantra too advanced for beginners?",
                answer: "This form can be practiced gently by beginners, but intensity should be moderated with stable routine and guidance where possible.",
            },
            {
                question: "What does Krim represent?",
                answer: "Krim is associated with transformative Shakti — cutting through inertia and inner contraction.",
            },
        ],
    },
    {
        id: "mantra-om-hanumate-namah",
        slug: "om-hanumate-namah",
        name: "Om Hanumate Namah",
        devanagari: "ॐ हनुमते नमः",
        transliteration: "oṁ hanumate namaḥ",
        oneLineMeaning: "I bow to Hanuman, embodiment of courage, devotion, and service.",
        tradition: ["Rama Bhakti", "Vaishnavism"],
        deityFocus: "Hanuman",
        purpose: ["courage", "focus", "service mindset"],
        source: ["Hanuman bhakti traditions"],
        practice: {
            bestTime: "Tuesday, Saturday, or before challenging tasks",
            repetitions: "108 repetitions",
            notes: [
                "Can be paired with Hanuman Chalisa.",
                "Useful for overcoming hesitation and fear.",
            ],
        },
        relatedMantras: ["hanuman-chalisa", "ram-ram-ram", "hari-om"],
        relatedLinks: [
            { text: "Who is Hanuman?", href: "/deities/hanuman" },
            { text: "How to Start Japa", href: "/how-to-start-japa" },
        ],
        faq: [
            {
                question: "Is this different from Hanuman Chalisa?",
                answer: "Yes. This is a short nama-mantra, while Hanuman Chalisa is a longer devotional hymn.",
            },
            {
                question: "Can this mantra support confidence?",
                answer: "Traditionally yes; it is widely used to build courage and disciplined effort.",
            },
        ],
    },
    {
        id: "mantra-swamiye-sharanam-ayyappa",
        slug: "swamiye-sharanam-ayyappa",
        name: "Swamiye Sharanam Ayyappa",
        transliteration: "swāmiyē śaraṇaṁ ayyappā",
        oneLineMeaning: "I take refuge in Lord Ayyappa.",
        tradition: ["Bhakti", "South Indian"],
        deityFocus: "Ayyappa",
        purpose: ["surrender", "discipline", "pilgrimage support"],
        source: ["Ayyappa pilgrimage traditions"],
        practice: {
            bestTime: "During vrata periods or daily devotional windows",
            repetitions: "108 repetitions or continuous nama-japa",
            notes: [
                "Commonly used during Sabarimala vrata.",
                "Emphasizes humility and surrender.",
            ],
        },
        relatedMantras: ["hari-om", "om-shanti", "ram-ram-ram"],
        relatedLinks: [
            { text: "Who is Ayyappa?", href: "/deities/ayyappa" },
            { text: "Daily Spiritual Routine", href: "/daily-spiritual-routine-beginners" },
        ],
        faq: [
            {
                question: "Is this mantra only for pilgrims?",
                answer: "No. It is also used in regular devotional practice for surrender and discipline.",
            },
            {
                question: "Can beginners chant this mantra?",
                answer: "Yes. It is simple, devotional, and widely used in community practice.",
            },
        ],
    },
    {
        id: "mantra-kaal-bhairav-ashtakam",
        slug: "kaal-bhairav-ashtakam",
        name: "Kaal Bhairav Ashtakam",
        transliteration: "kāla bhairava aṣṭakam",
        oneLineMeaning: "A devotional hymn invoking Bhairava's protective and time-transcending grace.",
        tradition: ["Shaivism", "Tantric"],
        deityFocus: "Bhairava",
        purpose: ["fearlessness", "protection", "clarity under pressure"],
        source: ["Traditionally attributed to Adi Shankaracharya"],
        practice: {
            bestTime: "Evening or during challenging transitions",
            repetitions: "1 full recitation",
            notes: [
                "A stotra format, often used like mantra recitation.",
                "Maintain respectful, non-performative pace.",
            ],
        },
        relatedMantras: ["om-namah-shivaya", "mahamrityunjaya-mantra", "om-shanti"],
        relatedLinks: [
            { text: "Who is Bhairava?", href: "/deities/bhairava" },
            { text: "Adi Shankaracharya: Life & Legacy", href: "/adi-shankaracharya-life-teachings" },
        ],
        faq: [
            {
                question: "Is this a mantra or stotra?",
                answer: "Technically a stotra (hymn), but many practitioners use it as structured mantra-style recitation.",
            },
            {
                question: "When should one use this chant?",
                answer: "During periods of fear, uncertainty, or when cultivating disciplined courage.",
            },
        ],
    },
    {
        id: "mantra-shantakaram-bhujagashayanam",
        slug: "shantakaram-bhujagashayanam",
        name: "Shantakaram Bhujagashayanam",
        transliteration: "śāntākāraṁ bhujagaśayanaṁ",
        oneLineMeaning: "A Vishnu dhyana verse invoking serenity, protection, and cosmic steadiness.",
        tradition: ["Vaishnavism", "Smarta"],
        deityFocus: "Vishnu",
        purpose: ["calmness", "devotional centering", "mental steadiness"],
        source: ["Vishnu dhyana shloka traditions"],
        practice: {
            bestTime: "Morning prayer or before sleep",
            repetitions: "3, 9, or 27 recitations",
            notes: [
                "Works well as an opening invocation before study.",
                "Can be combined with Om Namo Narayanaya.",
            ],
        },
        relatedMantras: ["om-namo-narayanaya", "hari-om", "om-shanti"],
        relatedLinks: [
            { text: "Who is Vishnu?", href: "/deities/vishnu" },
            { text: "Bhagavad Gita Complete Guide", href: "/bhagavad-gita-complete-guide" },
        ],
        faq: [
            {
                question: "Can this be used as a daily calming chant?",
                answer: "Yes. It is frequently used for devotional calm and mental regulation.",
            },
            {
                question: "Is this a full mantra or verse?",
                answer: "It is a devotional verse used in mantra-style repetition in many households.",
            },
        ],
    },
    {
        id: "mantra-nirvana-shatakam",
        slug: "nirvana-shatakam",
        name: "Nirvana Shatakam (Mano Buddhyahankara)",
        transliteration: "mano buddhyahaṅkāra cittāni nāham",
        oneLineMeaning: "A non-dual contemplative chant declaring identity beyond body-mind and ego.",
        tradition: ["Advaita Vedanta", "Shaivism"],
        purpose: ["self-inquiry", "identity deconstruction", "non-dual contemplation"],
        source: ["Adi Shankaracharya"],
        practice: {
            bestTime: "Morning contemplation or post-meditation reflection",
            repetitions: "1 full recitation",
            notes: [
                "Best used with reflective attention rather than fast chanting.",
                "Pair with Soham or silent witness practice.",
            ],
        },
        relatedMantras: ["soham", "om-namah-shivaya", "om-shanti"],
        relatedLinks: [
            { text: "Advaita Vedanta Explained", href: "/advaita-vedanta-explained" },
            { text: "Who is Shiva?", href: "/deities/shiva" },
        ],
        faq: [
            {
                question: "Is Nirvana Shatakam suitable for beginners?",
                answer: "Yes, if approached slowly with translation and contemplation.",
            },
            {
                question: "Is this devotional or philosophical?",
                answer: "Primarily contemplative-philosophical, though often recited devotionally as well.",
            },
        ],
    },
];

export function getMantraBySlug(slug: string): Mantra | undefined {
    return mantras.find((mantra) => mantra.slug === slug);
}
