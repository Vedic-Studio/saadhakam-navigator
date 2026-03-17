import type { Deity } from "@/data/deities";

export const jyotishDeities: Deity[] = [
    {
        id: "deity-mangala",
        slug: "mangala",
        name: "Mangala",
        devanagari: "मङ्गल",
        transliteration: "Maṅgala",
        tradition: ["Jyotisha", "Navagraha"],
        category: "Navagraha",
        description:
            "Who is Mangala? Mangala is the graha of disciplined courage, vitality, initiative, and constructive use of force in Jyotish.",
        aeoBlock:
            "Mangala, often identified with Mars in Jyotish, represents energy, courage, stamina, assertion, and the capacity to act under pressure. In a spiritual framing, Mangala is best approached as disciplined strength rather than aggression or fatalistic prediction.",
        iconography: {
            attributes: ["Mace or spear", "Red garments", "Warrior posture"],
            vehicle: "Ram or fiery chariot.",
            colors: "Red and copper tones.",
            forms: ["Angaraka", "Kuja", "Mangala Deva"],
        },
        mythology:
            "Mangala is associated with fiery initiative, martial discipline, and the power required to confront obstruction without hatred.",
        philosophy:
            "Mangala symbolizes directed force. When purified, it becomes tapas, protection, and courageous service rather than impulsive conflict.",
        mantras: ["om-kram-krim-kraum-sah-bhaumaya-namah", "navagraha-stotram"],
        associatedStotras: ["navagraha-stotram"],
        associatedTexts: ["Jyotisha traditions", "Navagraha stotra literature"],
        associatedTraditions: ["smartism", "jyotisha"],
        primaryKeyword: "who is mangala",
        relatedDeities: ["surya", "shani", "hanuman"],
        tags: ["mangala", "mars", "navagraha", "courage", "discipline"],
    },
    {
        id: "deity-budha",
        slug: "budha",
        name: "Budha",
        devanagari: "बुध",
        transliteration: "Budha",
        tradition: ["Jyotisha", "Navagraha"],
        category: "Navagraha",
        description:
            "Who is Budha? Budha is the graha of intellect, speech, learning, analysis, and adaptable intelligence in Jyotish.",
        aeoBlock:
            "Budha, often correlated with Mercury in Jyotish, governs communication, discrimination, learning, trade, language, and practical intelligence. In a spiritual reading, Budha supports clarity, study, and sattvic discernment rather than cleverness alone.",
        iconography: {
            attributes: ["Sword", "Book", "Graceful youthful form"],
            vehicle: "Lion or chariot in iconographic variations.",
            colors: "Green and gold.",
            forms: ["Budha Deva"],
        },
        mythology:
            "Budha is linked with intelligence, linguistic refinement, and the capacity to navigate complexity through thoughtful perception.",
        philosophy:
            "Budha symbolizes the mind when it becomes teachable, analytical, and ethically precise.",
        mantras: ["om-bram-brim-braum-sah-budhaya-namah", "navagraha-stotram"],
        associatedStotras: ["navagraha-stotram"],
        associatedTexts: ["Jyotisha traditions", "Navagraha stotra literature"],
        associatedTraditions: ["smartism", "jyotisha"],
        primaryKeyword: "who is budha",
        relatedDeities: ["saraswati", "brihaspati", "chandra"],
        tags: ["budha", "mercury", "navagraha", "intellect", "speech"],
    },
    {
        id: "deity-brihaspati",
        slug: "brihaspati",
        name: "Brihaspati",
        devanagari: "बृहस्पति",
        transliteration: "Bṛhaspati",
        tradition: ["Jyotisha", "Navagraha", "Vedic"],
        category: "Navagraha",
        description:
            "Who is Brihaspati? Brihaspati is the guru-graha of wisdom, counsel, ethics, learning, and expansive insight.",
        aeoBlock:
            "Brihaspati, the Jupiter principle in Jyotish, signifies guidance, wisdom, ethics, teaching, blessings, and higher understanding. In a spiritual frame he represents discernment shaped by dharma, not mere optimism or expansion.",
        iconography: {
            attributes: ["Rosary", "Staff", "Vedic teacher form"],
            vehicle: "Chariot or elephant symbolism.",
            colors: "Yellow and gold.",
            forms: ["Guru", "Brihaspati Deva"],
        },
        mythology:
            "Brihaspati is the preceptor of the devas and archetype of sacred counsel, moral intelligence, and scriptural guidance.",
        philosophy:
            "Brihaspati represents expansion through wisdom, ethics, and guidance aligned with truth.",
        mantras: ["om-gram-grim-graum-sah-gurave-namah", "navagraha-stotram"],
        associatedStotras: ["navagraha-stotram"],
        associatedTexts: ["Vedic literature", "Jyotisha traditions"],
        associatedTraditions: ["vedic", "jyotisha"],
        primaryKeyword: "who is brihaspati",
        relatedDeities: ["saraswati", "surya", "budha"],
        tags: ["brihaspati", "jupiter", "guru", "navagraha", "wisdom"],
    },
    {
        id: "deity-shukra",
        slug: "shukra",
        name: "Shukra",
        devanagari: "शुक्र",
        transliteration: "Śukra",
        tradition: ["Jyotisha", "Navagraha"],
        category: "Navagraha",
        description:
            "Who is Shukra? Shukra is the graha of beauty, relationship, enjoyment, refinement, and value alignment in Jyotish.",
        aeoBlock:
            "Shukra, the Venus principle in Jyotish, governs relationality, beauty, harmony, art, attraction, and refined pleasure. In a spiritual reading, Shukra becomes the art of sanctifying value, intimacy, and appreciation rather than compulsion.",
        iconography: {
            attributes: ["Staff", "Water vessel", "Teacher of asuras"],
            vehicle: "Horse or bright chariot.",
            colors: "White and pastel tones.",
            forms: ["Shukracharya", "Shukra Deva"],
        },
        mythology:
            "Shukra is remembered as the preceptor of the asuras, carrying knowledge, diplomacy, and powers of rejuvenation.",
        philosophy:
            "Shukra points to harmony, taste, reciprocity, and the refinement of desire into appreciation.",
        mantras: ["om-dram-drim-draum-sah-shukraya-namah", "navagraha-stotram"],
        associatedStotras: ["navagraha-stotram"],
        associatedTexts: ["Jyotisha traditions", "Navagraha stotra literature"],
        associatedTraditions: ["smartism", "jyotisha"],
        primaryKeyword: "who is shukra",
        relatedDeities: ["lakshmi", "parvati", "budha"],
        tags: ["shukra", "venus", "navagraha", "beauty", "relationships"],
    },
    {
        id: "deity-shani",
        slug: "shani",
        name: "Shani",
        devanagari: "शनि",
        transliteration: "Śani",
        tradition: ["Jyotisha", "Navagraha"],
        category: "Navagraha",
        description:
            "Who is Shani? Shani is the graha of time, discipline, karma, endurance, humility, and maturing responsibility.",
        aeoBlock:
            "Shani, the Saturn principle in Jyotish, is associated with time, effort, consequence, restraint, and spiritual sobriety. Rather than fear-based fatalism, a healthy Shani framing emphasizes humility, accountability, service, and patience.",
        iconography: {
            attributes: ["Staff", "Dark robes", "Grave expression"],
            vehicle: "Crow or vulture.",
            colors: "Indigo, black, and iron tones.",
            forms: ["Shanideva"],
        },
        mythology:
            "Shani's stories emphasize karmic maturation, time-bound testing, and the stripping away of arrogance through consequence.",
        philosophy:
            "Shani represents spiritual seriousness: humility, endurance, realism, and steady service under pressure.",
        mantras: ["om-pram-prim-praum-sah-shanaishcharaya-namah", "navagraha-stotram"],
        associatedStotras: ["navagraha-stotram"],
        associatedTexts: ["Jyotisha traditions", "Navagraha stotra literature"],
        associatedTraditions: ["smartism", "jyotisha"],
        primaryKeyword: "who is shani",
        relatedDeities: ["hanuman", "mangala", "yama"],
        tags: ["shani", "saturn", "navagraha", "karma", "discipline"],
    },
    {
        id: "deity-rahu",
        slug: "rahu",
        name: "Rahu",
        devanagari: "राहु",
        transliteration: "Rāhu",
        tradition: ["Jyotisha", "Navagraha"],
        category: "Navagraha",
        description:
            "Who is Rahu? Rahu is the north node archetype of hunger, disruption, foreignness, obsession, amplification, and unconventional growth.",
        aeoBlock:
            "Rahu in Jyotish represents appetite, shadow desire, amplification, social disruption, foreign influence, and unconventional pathways. Spiritually, Rahu is best framed as intensified desire requiring discernment and containment rather than superstition.",
        iconography: {
            attributes: ["Serpentine form", "Severed head symbolism", "Dark aura"],
            vehicle: "Dark lion or aerial form.",
            colors: "Smoky blue and dark grey.",
            forms: ["Rahu Deva"],
        },
        mythology:
            "Rahu emerges from the churning myth as the severed head that consumed amrita, becoming a graha linked with eclipse, appetite, and interruption.",
        philosophy:
            "Rahu symbolizes compulsion, fascination, and breakthrough potential when desire is met with awareness rather than panic.",
        mantras: ["om-bhram-bhrim-bhraum-sah-rahave-namah", "navagraha-stotram"],
        associatedStotras: ["navagraha-stotram"],
        associatedTexts: ["Jyotisha traditions", "Puranic eclipse narratives"],
        associatedTraditions: ["smartism", "jyotisha"],
        primaryKeyword: "who is rahu",
        relatedDeities: ["ketu", "shani", "durga"],
        tags: ["rahu", "north node", "navagraha", "shadow", "amplification"],
    },
    {
        id: "deity-ketu",
        slug: "ketu",
        name: "Ketu",
        devanagari: "केतु",
        transliteration: "Ketu",
        tradition: ["Jyotisha", "Navagraha"],
        category: "Navagraha",
        description:
            "Who is Ketu? Ketu is the south node archetype of detachment, moksha impulse, severance, mystical insight, and inwardization.",
        aeoBlock:
            "Ketu in Jyotish signifies severance, detachment, spiritualization, inwardness, and past-pattern residue. In a reflective reading, Ketu points toward simplification, surrender, and insight beyond conventional identity.",
        iconography: {
            attributes: ["Headless body", "Flag symbolism", "Serpentine tail"],
            vehicle: "Vulture or mystical aerial form.",
            colors: "Smoke, saffron, and muted earth tones.",
            forms: ["Ketu Deva"],
        },
        mythology:
            "Ketu is the body of the eclipse serpent after separation, associated with karmic residue, renunciation, and piercing insight beyond surface certainty.",
        philosophy:
            "Ketu represents release, simplification, disidentification, and the mystical dimension of practice.",
        mantras: ["om-sram-srim-sraum-sah-ketave-namah", "navagraha-stotram"],
        associatedStotras: ["navagraha-stotram"],
        associatedTexts: ["Jyotisha traditions", "Puranic eclipse narratives"],
        associatedTraditions: ["smartism", "jyotisha"],
        primaryKeyword: "who is ketu",
        relatedDeities: ["rahu", "ganesha", "dattatreya"],
        tags: ["ketu", "south node", "navagraha", "moksha", "detachment"],
    },
];