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
    etymology?: { wordByWord: { word: string; meaning: string }[]; overallMeaning: string };
    shastraContext?: string;
}

import { jyotishMantras } from "@/data/jyotishMantras";

const coreMantras: Mantra[] = [
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
                    "Yes. It is widely taught as a universal Shiva mantra and commonly used in beginner japa practice. Many teachers consider it an open mantra that does not require diksha for basic repetition.",
            },
            {
                question: "What is the best use of this mantra?",
                answer:
                    "It is especially effective for calming mental agitation, softening ego-reactivity, and cultivating devotional steadiness. Regular practice builds a baseline of inner stillness that supports deeper inquiry.",
            },
            {
                question: "What are the five syllables of Om Namah Shivaya?",
                answer:
                    "The panchakshari (five-syllable) form is Na-Mah-Shi-Va-Ya, each syllable traditionally mapped to one of the five elements: earth, water, fire, air, and ether. Om is added as the pranava prefix in the shadakshari (six-syllable) form.",
            },
            {
                question: "How does this mantra differ from Mahamrityunjaya?",
                answer:
                    "Om Namah Shivaya is devotional surrender to Shiva's presence, while Mahamrityunjaya addresses Shiva as the healer who conquers death and fear. The former cultivates steady devotion, the latter invokes protective and healing energy.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial sound representing absolute reality" },
                { word: "Namaḥ", meaning: "Salutation, bowing, surrender of ego" },
                { word: "Śivāya", meaning: "To Shiva, the auspicious one, pure consciousness" },
            ],
            overallMeaning: "I bow to Shiva, the auspicious inner consciousness that is my true nature.",
        },
        shastraContext:
            "The Panchakshari mantra (Na-Ma-Shi-Va-Ya) appears in the Yajurveda's Rudram and is central to Shaiva Siddhanta initiation. Each syllable maps to one of the pancha bhutas (five elements), making the mantra a sonic map of embodied existence offered back to its source. In Kashmir Shaivism, chanting this mantra is understood as vibrating with Shiva's own self-recognition (vimarsha).",
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
                    "Traditions vary. Many modern teachers share it openly, while some lineages still prefer formal initiation and guided pronunciation. The Arya Samaj movement notably opened the mantra to all seekers regardless of background.",
            },
            {
                question: "What does Gayatri develop in practice?",
                answer:
                    "Consistent chanting is associated with sharper discernment, mental brightness, and ethical clarity in daily action. The Vedic tradition holds that it purifies the buddhi (intellect) by aligning it with the solar principle of clear seeing.",
            },
            {
                question: "Why is correct pronunciation so important for Gayatri?",
                answer:
                    "Gayatri is composed in the Vedic gayatri meter (24 syllables across three padas), and its acoustic structure is considered integral to its effect. Mispronunciation disrupts the chandas (meter), which traditional understanding treats as the vehicle through which the mantra's meaning becomes operative.",
            },
            {
                question: "What is the connection between Gayatri and sandhyavandanam?",
                answer:
                    "Sandhyavandanam is the daily Vedic prayer performed at the three junction points (sandhya) of dawn, midday, and dusk. Gayatri japa forms the central practice within this ritual, making it not a standalone mantra but part of a structured daily discipline in orthodox Vedic life.",
            },
            {
                question: "Can women chant the Gayatri mantra?",
                answer:
                    "Historical restrictions varied by period and region. Most contemporary teachers and reform movements affirm that the mantra is universal and that gender-based restrictions reflect social convention rather than Vedic instruction.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial syllable" },
                { word: "Bhūr", meaning: "The physical plane (earth)" },
                { word: "Bhuvaḥ", meaning: "The intermediate plane (atmosphere, vital breath)" },
                { word: "Svaḥ", meaning: "The celestial plane (heaven, pure consciousness)" },
                { word: "Tat", meaning: "That (the absolute)" },
                { word: "Savitur", meaning: "Of Savitr, the solar creative force" },
                { word: "Vareṇyam", meaning: "Most excellent, worthy of worship" },
                { word: "Bhargo", meaning: "Radiance, luminous power" },
                { word: "Devasya", meaning: "Of the divine being" },
                { word: "Dhīmahi", meaning: "We meditate upon" },
                { word: "Dhiyo", meaning: "Intellects, discerning faculties" },
                { word: "Yo naḥ pracodayāt", meaning: "May that inspire and propel ours" },
            ],
            overallMeaning:
                "We meditate upon the supreme radiance of Savitr, the divine solar intelligence, and pray that it illumine and direct our intellects.",
        },
        shastraContext:
            "Rigveda 3.62.10 is attributed to the rishi Vishwamitra and composed in the gayatri chandas (24-syllable meter), which itself carries cosmological significance as the mother of all Vedic meters. The vyahritis (bhur, bhuvah, svah) preceding the mantra invoke three planes of existence and function as a preparatory tuning of awareness. In shabda-brahman theory, the Gayatri is considered the concentrated essence of the entire Veda, which is why it occupies the central position in sandhyavandanam.",
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
                    "No. It is also used for inner strength, fear regulation, and contemplative acceptance of impermanence. The mantra addresses mortality as a psychological and spiritual condition, not only a physical one.",
            },
            {
                question: "Can this mantra be chanted daily?",
                answer:
                    "Yes, many practitioners chant a short daily count (3, 9, or 11 repetitions) and use longer rounds of 108 during stressful periods. Daily use builds familiarity so the mantra is readily accessible when genuine crisis arises.",
            },
            {
                question: "What does the 'ripe fruit' metaphor in this mantra mean?",
                answer:
                    "The mantra asks for liberation from death 'as a cucumber is released from its vine' (urvarukam iva bandhanat). This imagery points to natural, timely release rather than violent separation. It frames spiritual freedom as organic ripening, not forced escape.",
            },
            {
                question: "Does this mantra require initiation?",
                answer:
                    "Some Shaiva lineages treat it as a diksha mantra requiring formal transmission. However, its presence in the Rigveda (7.59.12) makes it part of the shruti canon, and many teachers consider it accessible for sincere open practice.",
            },
            {
                question: "How does Mahamrityunjaya relate to Ayurvedic healing traditions?",
                answer:
                    "In traditional practice, the mantra is often recited alongside Ayurvedic treatments as a spiritual complement, not a replacement. The understanding is that physical remedies address the body while the mantra addresses the fear and attachment that compound suffering.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial syllable" },
                { word: "Tryambakam", meaning: "The three-eyed one (Shiva as Tryambaka)" },
                { word: "Yajāmahe", meaning: "We worship, we offer to" },
                { word: "Sugandhim", meaning: "The fragrant one, one whose presence pervades" },
                { word: "Puṣṭi-vardhanam", meaning: "Nourisher of vitality and growth" },
                { word: "Urvārukam iva", meaning: "Like a ripe cucumber (gourd)" },
                { word: "Bandhanāt", meaning: "From bondage, from the stem" },
                { word: "Mṛtyor", meaning: "From death" },
                { word: "Mukṣīya", meaning: "May I be freed, liberated" },
                { word: "Mā amṛtāt", meaning: "Not from immortality (may I not be cut off from the deathless)" },
            ],
            overallMeaning:
                "We worship the three-eyed Shiva who nourishes all beings. As a ripe fruit naturally separates from its vine, may we be freed from death and not from the deathless reality.",
        },
        shastraContext:
            "This mantra (Rigveda 7.59.12) is attributed to Rishi Markandeya, who according to Puranic tradition was saved from Yama (death) by Shiva's intervention. The mantra operates on the principle that confronting mortality through sacred sound dissolves the fear that contracts consciousness. In the Yajurveda's Rudram context, it sits within a broader liturgy addressing Shiva as both destroyer and healer, reflecting the Shaiva understanding that the force which dissolves also regenerates.",
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
                    "Both refer to the sustaining divine principle in Vaishnavism, but they carry different devotional emphasis. 'Narayana' stresses the cosmic sustainer aspect and is central to Sri Vaishnava theology, while 'Vishnu' is the broader Puranic name used across multiple Vaishnava lineages.",
            },
            {
                question: "Is this mantra suitable for anxious minds?",
                answer:
                    "Yes. Its repetitive rhythm and devotional focus often reduce mental restlessness. The eight syllables (Ashtakshari) create a steady cadence that naturally slows breathing and quiets mental chatter during sustained japa.",
            },
            {
                question: "Why is this called the Ashtakshari mantra?",
                answer:
                    "The term means 'eight-syllabled' (Na-Mo-Na-Ra-Ya-Na-Ya with Om as prefix). This eight-syllable structure is considered the essential Vaishnava mantra in Sri Vaishnavism, parallel to the Panchakshari of Shaivism. It is transmitted during Pancha Samskara initiation in the Sri Vaishnava tradition.",
            },
            {
                question: "What is the role of this mantra in Sri Vaishnavism?",
                answer:
                    "It is the primary mantra of the Sri Vaishnava sampradaya, transmitted during formal initiation (samasrayanam). Ramanuja and the Alvars placed it at the center of devotional practice, understanding it as the sonic form of complete surrender (prapatti) to Narayana.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial syllable" },
                { word: "Namo", meaning: "Salutation, bowing, surrender" },
                { word: "Nārāyaṇāya", meaning: "To Narayana, the one who is the abode and goal of all beings (nara = beings, ayana = abode/path)" },
            ],
            overallMeaning:
                "I bow to Narayana, the sustaining presence who is both the dwelling place and the ultimate destination of all beings.",
        },
        shastraContext:
            "The Ashtakshari mantra holds the same structural importance in Vaishnavism that the Panchakshari holds in Shaivism. Nammalvar's Tiruvaimozhi and Ramanuja's commentarial tradition treat it as the verbal expression of the jiva's essential relationship with Narayana. In shabda-brahman terms, the syllable 'Na' is understood to negate the jiva's independent existence, while 'Narayanaya' establishes its dependent relationship with the divine. The mantra thus encodes the entire Vishishtadvaita metaphysics in sonic form.",
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
                    "It is strongly associated with Krishna-Vasudeva devotion, though some practitioners use it as a broader Vishnu mantra. The Bhagavata Purana presents it as the mantra given by Narada to Dhruva, situating it within a wider Vaishnava context beyond any single lineage.",
            },
            {
                question: "Can I chant it mentally?",
                answer:
                    "Yes. The tradition recognizes three levels: vachika (spoken aloud), upamshu (whispered), and manasika (mental). Start audible if concentration is weak, then gradually internalize. Manasika japa is considered the most potent form once the practitioner can sustain focus.",
            },
            {
                question: "Why is this called the Dvadasakshari mantra?",
                answer:
                    "Dvadasakshari means 'twelve-syllabled' (Om-Na-Mo-Bha-Ga-Va-Te-Va-Su-De-Va-Ya). This twelve-syllable structure gives it a distinct rhythm in japa and is considered complete in itself, encoding the full relationship between devotee and Bhagavan in sonic form.",
            },
            {
                question: "What is the story of Dhruva and this mantra?",
                answer:
                    "In the Bhagavata Purana (Canto 4), the sage Narada gives this mantra to the child Dhruva, who performs intense tapas and achieves a direct vision of Vishnu. The story establishes this mantra's capacity to yield results even for very young or inexperienced practitioners when chanted with genuine resolve.",
            },
            {
                question: "How does this mantra differ from Om Namo Narayanaya?",
                answer:
                    "Om Namo Narayanaya (Ashtakshari) addresses the cosmic sustainer principle, while Om Namo Bhagavate Vasudevaya (Dvadasakshari) invokes the personal, accessible Bhagavan who dwells in all beings. The former leans toward awe and surrender; the latter toward intimate devotion and personal relationship.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial syllable" },
                { word: "Namo", meaning: "Salutation, bowing, surrender" },
                { word: "Bhagavate", meaning: "To Bhagavan, the one possessing six divine attributes (jnana, shakti, bala, aishvarya, virya, tejas)" },
                { word: "Vāsudevāya", meaning: "To Vasudeva, the all-pervading one; son of Vasudeva (Krishna); the indweller of all" },
            ],
            overallMeaning:
                "I bow to Bhagavan Vasudeva, the all-pervading divine presence who dwells within all beings as their innermost self.",
        },
        shastraContext:
            "The Dvadasakshari mantra is central to the Bhagavata tradition and appears prominently in the Bhagavata Purana's account of Dhruva's tapas (Canto 4). The name 'Vasudeva' carries a double resonance: it denotes both the historical Krishna (son of Vasudeva) and the metaphysical principle of the divine dwelling in all (vasu = dwelling, deva = divine). In mantra shastra, the twelve syllables are sometimes mapped to the twelve Adityas (solar principles), connecting the mantra to the cosmic cycle of time and sustenance.",
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
                    "Both. It is a mantra naturally synchronized with breath and used as a contemplative bridge into witness-awareness. Unlike mantras that require deliberate vocalization, Soham is understood as the sound the breath itself makes, which is why it is called the ajapa-japa (the unrecited recitation).",
            },
            {
                question: "Who should use Soham?",
                answer:
                    "It suits seekers drawn to inquiry-based or non-dual meditation styles, particularly those in the Advaita Vedanta or Nath Yoga traditions. Because it requires no vocalization and no deity focus, it is also useful for practitioners who prefer a direct, stripped-down contemplative approach.",
            },
            {
                question: "What is the relationship between Soham and Hamsa?",
                answer:
                    "They are the same mantra in reverse. The inhale sounds 'So' and the exhale 'Ham,' forming Soham (I am That). Read in reverse, Ham-Sa becomes Hamsa, the swan symbolizing the discriminating self. The Hamsa Upanishad explores this reversal as a contemplative technique for realizing the identity of individual and universal consciousness.",
            },
            {
                question: "How many repetitions does Soham require?",
                answer:
                    "Traditional texts state that every living being performs 21,600 Soham repetitions daily through the natural breathing cycle. Conscious practice simply means becoming aware of what is already happening. There is no fixed count; the practice is sustained awareness of breath-as-mantra for the duration of the sitting.",
            },
            {
                question: "Can Soham be combined with self-inquiry (atma-vichara)?",
                answer:
                    "Yes. Ramana Maharshi acknowledged Soham as a valid preliminary practice that naturally leads toward the question 'Who am I?' As identification with the breath-mantra deepens, the 'I' in 'I am That' itself becomes the object of inquiry.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Saḥ", meaning: "That (the absolute, brahman)" },
                { word: "Aham", meaning: "I (the individual self)" },
            ],
            overallMeaning:
                "I am That. The individual self is identical with the absolute reality.",
        },
        shastraContext:
            "Soham is classified as an ajapa-mantra (unrecited recitation) because it mirrors the natural sound of breathing without deliberate vocalization. The Vijnanabhairava Tantra (verse 155) and the Hamsa Upanishad both treat it as a means of recognizing the non-difference between the individual breath-self and universal consciousness. In Nath tradition, Soham practice is central to the Hamsa Vidya, where the practitioner traces the breath's movement between the muladhara and sahasrara to dissolve the sense of separation between jiva and Shiva.",
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
                    "The three repetitions address three categories of suffering (tapatraya): adhyatmika (disturbances from one's own body and mind), adhibhautika (disturbances from other beings), and adhidaivika (disturbances from natural or cosmic forces). Each 'Shanti' is an invocation of peace directed at a specific layer of potential affliction.",
            },
            {
                question: "Can Om Shanti be used outside ritual?",
                answer:
                    "Yes. It is one of the most universal and context-flexible mantras in the Hindu tradition. It serves as a closing invocation after study, meditation, or gatherings, and can be used independently as a brief centering practice during daily life.",
            },
            {
                question: "What is a shanti mantra versus Om Shanti?",
                answer:
                    "Shanti mantras are specific Upanishadic verses recited before and after Vedic study, each beginning and ending with 'Om Shanti Shanti Shanti.' Different shakhas (Vedic branches) have distinct shanti mantras. 'Om Shanti' as standalone practice is a distillation of this broader tradition into its simplest form.",
            },
            {
                question: "Which Upanishads have their own shanti mantras?",
                answer:
                    "Each Vedic branch has a designated shanti mantra. The Isha Upanishad uses 'Om purnamadah purnamidam,' the Kena uses 'Om apyayantu mamangani,' and the Taittiriya uses 'Om sham no mitrah.' These are recited before study to create an internal and external environment conducive to receiving the teaching.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial syllable encompassing all reality" },
                { word: "Śāntiḥ", meaning: "Peace, cessation of disturbance, deep stillness" },
            ],
            overallMeaning:
                "Om, peace. An invocation of stillness at the personal, interpersonal, and cosmic levels, repeated three times to address all sources of affliction.",
        },
        shastraContext:
            "The triple shanti invocation is rooted in the Vedic understanding of the three sources of suffering (tapatraya) that obstruct clear reception of sacred knowledge. Shanti mantras frame the beginning and end of Upanishadic study, functioning as a ritual boundary that separates ordinary mental activity from the contemplative state required for shruti. The sound 'shanti' itself is understood in shabda-brahman theory as the acoustic signature of a mind that has settled beyond the three gunas into its natural clarity.",
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
                    "Strictly it is a devotional hymn (stotra) composed of 40 chaupais plus introductory and closing dohas. However, in practical bhakti life, its repeated recitation functions similarly to mantra japa. The distinction matters less in lived practice than in technical classification.",
            },
            {
                question: "Can beginners recite it without perfect pronunciation?",
                answer:
                    "Yes. The Chalisa is composed in Awadhi Hindi, not Sanskrit, making it more phonetically accessible for Hindi speakers. Begin sincerely with whatever pronunciation you have, improve over time through listening and repetition, and prioritize steady rhythm over perfect diction.",
            },
            {
                question: "Who wrote the Hanuman Chalisa and when?",
                answer:
                    "It is attributed to Goswami Tulsidas (1532-1623 CE), the same poet-saint who composed the Ramcharitmanas. Tulsidas wrote in Awadhi, a dialect of Hindi, making his works accessible to ordinary devotees rather than restricting them to the Sanskrit-literate.",
            },
            {
                question: "Why do people recite it multiple times (7, 11, or 108)?",
                answer:
                    "Multiple recitations follow the same principle as extended mantra japa: sustained repetition deepens concentration and devotional absorption. The numbers 7, 11, and 108 carry traditional significance in Hindu numerology. Reciting 11 times is a common vrata practice, particularly on Tuesdays and Saturdays associated with Hanuman.",
            },
            {
                question: "What makes Hanuman Chalisa so widely popular across India?",
                answer:
                    "Three factors account for its reach: it is composed in a vernacular language rather than Sanskrit, it addresses fears and obstacles that are universally relatable, and Hanuman himself is a deity who cuts across caste and sectarian boundaries. It is recited by Shaivas, Vaishnavas, and non-sectarian practitioners alike.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Hanumān", meaning: "The one with a (broken) jaw; son of Vayu, devoted servant of Rama" },
                { word: "Chālīsā", meaning: "A composition of forty (chalis = 40) verses" },
            ],
            overallMeaning:
                "The Forty Verses of Hanuman: a devotional hymn of forty chaupais praising Hanuman's qualities, deeds, and protective power.",
        },
        shastraContext:
            "While not a mantra in the strict bija or Vedic sense, the Hanuman Chalisa operates on the devotional principle that concentrated recitation of a deity's qualities and deeds invokes that deity's presence and protection. Tulsidas drew from the Valmiki Ramayana, Adhyatma Ramayana, and regional Hanuman traditions to compose a text that functions as a complete upasana (worship) in forty verses. The Chalisa's opening doha invokes Guru and Ganapati before Hanuman, following the traditional invocation sequence that establishes the practitioner within a lineage of transmission.",
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
                answer:
                    "Yes. It is among the most beginner-friendly and widely used Sanskrit mantras. Ganesha mantras are traditionally recited at the beginning of any spiritual practice, study session, or new undertaking, making daily use natural and well-supported by tradition.",
            },
            {
                question: "When is this mantra most useful?",
                answer:
                    "Before initiating important actions where clarity and obstacle-reduction are needed. This includes starting a new business, beginning formal study, embarking on travel, or opening any ritual or spiritual practice. The principle is that invoking Ganesha first clears the path for what follows.",
            },
            {
                question: "What is the significance of the bija syllable 'Gam'?",
                answer:
                    "In mantra shastra, 'Gam' is the bija (seed syllable) specific to Ganesha. Bija syllables are considered concentrated sonic forms of a deity's energy, more potent than descriptive words. 'Gam' is understood to contain Ganesha's obstacle-removing power in its most compressed acoustic form.",
            },
            {
                question: "Why is Ganesha invoked before all other deities?",
                answer:
                    "The Mudgala Purana and Ganapati Atharvasirsha establish Ganesha as Vighnaharta (remover of obstacles) and the lord of beginnings. Hindu ritual convention places his invocation first so that subsequent practices proceed without disruption. This is why even Shaiva and Vaishnava rituals typically begin with a Ganesha invocation.",
            },
            {
                question: "Is this mantra connected to the Ganapati Atharvasirsha?",
                answer:
                    "Yes. The Ganapati Atharvasirsha is the primary Upanishadic text for Ganesha worship and contains the theological foundation for this mantra. It declares Ganesha as identical with Brahman and establishes the bija 'Gam' as his essential sonic form. This mantra is a practical distillation of that text's teaching.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial syllable" },
                { word: "Gaṁ", meaning: "The bija (seed syllable) of Ganesha, his concentrated sonic essence" },
                { word: "Gaṇapataye", meaning: "To Ganapati, lord of the ganas (Shiva's attendant hosts); lord of categories and groups" },
                { word: "Namaḥ", meaning: "Salutation, bowing, surrender" },
            ],
            overallMeaning:
                "Om, I invoke the seed-power of Ganesha and bow to the Lord of all categories, remover of obstacles and guardian of beginnings.",
        },
        shastraContext:
            "This mantra combines the structural elements of Vedic mantra construction: pranava (Om), bija (Gam), deity name in dative case (Ganapataye), and namah (salutation). The bija 'Gam' derives from the Ganapati Atharvasirsha, which identifies Ganesha with Brahman and establishes his primacy among the devatas. In tantric usage, 'Gam' activates the muladhara chakra, the base energy center associated with stability and groundedness, which aligns with Ganesha's role as the foundation upon which all other sadhana rests.",
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
                answer:
                    "No. Lakshmi represents eight forms of abundance (Ashta Lakshmi): wealth, food, courage, progeny, victory, knowledge, strength, and overall auspiciousness. Reducing her to financial gain misses the breadth of what 'Shri' signifies in Hindu thought.",
            },
            {
                question: "Can this mantra be chanted without initiation?",
                answer:
                    "Yes, this form is commonly used in open devotional practice. The bija 'Shreem' is widely taught as an accessible Lakshmi bija, unlike some Sri Vidya mantras that require formal diksha. For deeper tantric applications of 'Shreem,' guidance from a qualified teacher is recommended.",
            },
            {
                question: "What is the significance of the bija syllable 'Shreem'?",
                answer:
                    "In mantra shastra, 'Shreem' is the bija of Lakshmi and the sonic form of 'Shri' (auspiciousness, beauty, abundance). It is considered a seed of creative, nurturing, and sustaining energy. Within Sri Vidya tantra, 'Shreem' is one of the primary shakti bijas used in Lalita Tripurasundari worship as well.",
            },
            {
                question: "When is the best time to chant this mantra?",
                answer:
                    "Friday is traditionally associated with Lakshmi, and many practitioners chant during the evening lamp-lighting (sandhya deepam) when Lakshmi is ritually invited into the home. Navaratri (particularly the last three nights dedicated to Lakshmi) and Diwali are considered especially potent periods for this practice.",
            },
            {
                question: "What is the difference between Lakshmi mantras and Sri Vidya practice?",
                answer:
                    "Lakshmi mantras like this one address the Vaishnava form of the goddess as Vishnu's consort and sustaining power. Sri Vidya is a tantric system centered on Lalita Tripurasundari that uses 'Shreem' among other bijas in complex mantra structures. The bija overlaps, but the theological frameworks and practice contexts differ significantly.",
            },
        ],
        etymology: {
            wordByWord: [
                { word: "Om", meaning: "The pranava, primordial syllable" },
                { word: "Śrīṁ", meaning: "The bija (seed syllable) of Lakshmi, embodying auspiciousness and abundance" },
                { word: "Mahālakṣmyai", meaning: "To Mahalakshmi, the great goddess of prosperity, beauty, and sustaining grace" },
                { word: "Namaḥ", meaning: "Salutation, bowing, surrender" },
            ],
            overallMeaning:
                "Om, I invoke the seed-power of auspiciousness and bow to Mahalakshmi, the great goddess who sustains abundance in all its forms.",
        },
        shastraContext:
            "The bija 'Shreem' occupies a central position in both Vaishnava Lakshmi worship and the broader Sri Vidya tantric tradition. The Sri Sukta of the Rigveda Khilani is the earliest hymnic source for Lakshmi worship, establishing 'Shri' as a cosmic principle of nourishment and beauty rather than mere wealth. In mantra shastra, 'Shreem' functions as a shakti bija that activates the sustaining, nourishing, and harmonizing dimension of reality. The Lakshmi Tantra, a Pancharatra text, elaborates Lakshmi's metaphysical role as Vishnu's creative power (shakti), making this mantra an invocation of the dynamic, manifesting aspect of the divine.",
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
                answer: "Krim is associated with transformative Shakti -- cutting through inertia and inner contraction.",
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
    {
        id: "mantra-lokah-samastah-sukhino-bhavantu",
        slug: "lokah-samastah-sukhino-bhavantu",
        name: "Lokah Samastah Sukhino Bhavantu",
        devanagari: "लोकाः समस्ताः सुखिनो भवन्तु",
        transliteration: "lokāḥ samastāḥ sukhino bhavantu",
        oneLineMeaning: "May all beings everywhere be happy and free.",
        tradition: ["Vedic", "Universal"],
        purpose: ["universal peace", "compassion", "collective wellbeing"],
        source: ["Attributed to various Vedic texts", "Widely recited in global yoga communities"],
        practice: {
            bestTime: "End of practice, morning or evening",
            repetitions: "3 times or 108 repetitions",
            notes: [
                "Often chanted as a closing prayer after yoga or meditation.",
                "Pairs well with Om Shanti for a complete peace invocation.",
            ],
        },
        relatedMantras: ["om-shanti", "gayatri-mantra", "hari-om"],
        relatedLinks: [
            { text: "Daily Spiritual Routine", href: "/daily-spiritual-routine-beginners" },
            { text: "How to Start Meditating Daily", href: "/how-to-start-meditating-daily" },
        ],
        faq: [
            {
                question: "Is Lokah Samastah a Vedic mantra?",
                answer: "Its exact origin is debated. It draws on Vedic sentiment and is often attributed to ancient texts, but its widespread use comes primarily from modern yoga traditions.",
            },
            {
                question: "When should I chant this mantra?",
                answer: "It is most commonly used as a closing invocation after yoga, meditation, or group practice to extend goodwill beyond the self.",
            },
            {
                question: "Can this mantra be chanted by anyone regardless of tradition?",
                answer: "Yes. It carries no sectarian marker and is used across Hindu, Buddhist, and secular contemplative contexts.",
            },
        ],
    },
    {
        id: "mantra-asato-ma-sadgamaya",
        slug: "asato-ma-sadgamaya",
        name: "Asato Ma Sadgamaya (Pavamana Mantra)",
        devanagari: "असतो मा सद्गमय। तमसो मा ज्योतिर्गमय। मृत्योर्मा अमृतं गमय।",
        transliteration: "asato mā sadgamaya, tamaso mā jyotirgamaya, mṛtyormā amṛtaṁ gamaya",
        oneLineMeaning: "Lead me from the unreal to the real, from darkness to light, from death to immortality.",
        tradition: ["Vedic", "Upanishadic"],
        purpose: ["spiritual awakening", "knowledge", "liberation"],
        source: ["Brihadaranyaka Upanishad 1.3.28"],
        practice: {
            bestTime: "Morning meditation or beginning of study",
            repetitions: "3 times",
            notes: [
                "Each line addresses a distinct layer of ignorance: ontological, epistemic, and existential.",
                "Recite slowly with attention to meaning rather than speed.",
            ],
        },
        relatedMantras: ["gayatri-mantra", "om-shanti", "soham"],
        relatedLinks: [
            { text: "What is Vedanta?", href: "/what-is-vedanta" },
            { text: "Sacred Texts & Teachings", href: "/sacred-texts-teachings" },
        ],
        faq: [
            {
                question: "What does each line of Asato Ma mean?",
                answer: "The first line asks for discernment between appearance and reality. The second asks for knowledge over ignorance. The third asks for liberation from the fear of mortality.",
            },
            {
                question: "Is this mantra suitable for beginners?",
                answer: "Yes. It is one of the most accessible Upanishadic prayers and requires no initiation or prior training.",
            },
            {
                question: "Where does this mantra come from?",
                answer: "It appears in the Brihadaranyaka Upanishad (1.3.28), one of the oldest and most important principal Upanishads.",
            },
        ],
    },
    {
        id: "mantra-tvameva-mata",
        slug: "tvameva-mata",
        name: "Tvameva Mata",
        devanagari: "त्वमेव माता च पिता त्वमेव। त्वमेव बन्धुश्च सखा त्वमेव। त्वमेव विद्या द्रविणं त्वमेव। त्वमेव सर्वं मम देव देव॥",
        transliteration: "tvameva mātā ca pitā tvameva, tvameva bandhuśca sakhā tvameva, tvameva vidyā draviṇaṁ tvameva, tvameva sarvaṁ mama deva deva",
        oneLineMeaning: "You alone are my mother, father, friend, knowledge, wealth -- everything.",
        tradition: ["Devotional", "Pan-Hindu"],
        purpose: ["surrender", "devotion", "daily prayer"],
        source: ["Attributed to Adi Shankaracharya", "Widely used in temple worship across traditions"],
        practice: {
            bestTime: "Morning or evening prayer",
            repetitions: "1 to 3 times",
            notes: [
                "A complete surrender prayer that works with any ishta-devata.",
                "Often recited at the end of puja or aarti as a closing offering.",
            ],
        },
        relatedMantras: ["om-shanti", "om-namo-narayanaya", "om-namah-shivaya"],
        relatedLinks: [
            { text: "Adi Shankaracharya: Life & Legacy", href: "/adi-shankaracharya-life-teachings" },
            { text: "Daily Spiritual Routine", href: "/daily-spiritual-routine-beginners" },
        ],
        faq: [
            {
                question: "Who wrote Tvameva Mata?",
                answer: "It is widely attributed to Adi Shankaracharya, though the verse appears in various devotional compilations and its exact provenance is not definitively established.",
            },
            {
                question: "Can this prayer be directed to any deity?",
                answer: "Yes. It is tradition-neutral and used across Shaiva, Vaishnava, Shakta, and Smarta worship as a universal surrender prayer.",
            },
        ],
    },
];

export const mantras: Mantra[] = [...coreMantras, ...jyotishMantras];

export function getMantraBySlug(slug: string): Mantra | undefined {
    return mantras.find((mantra) => mantra.slug === slug);
}
