export interface Concept {
    slug: string;
    sanskritWord: string;
    englishTranslation: string;
    shortDefinition: string;
    longDescription: string;
    keyPrinciples: string[];
    roleInPhilosophy: string;
    practicalApplication: string;
    relatedConcepts: string[]; // slugs
    sourceTexts: string[];
    tags: string[];
}

export const concepts: Concept[] = [
    {
        slug: "karma",
        sanskritWord: "कर्म (Karma)",
        englishTranslation: "Action / Deed / Cause and Effect",
        shortDefinition: "The universal principle of cause and effect, action and reaction, which governs all consciousness.",
        longDescription: "Karma literally means 'action' or 'doing'. In the spiritual and philosophical sense, it refers to the spiritual principle of cause and effect where intent and actions of an individual (cause) influence the future of that individual (effect). Good intent and good deeds contribute to good karma and happier rebirths, while bad intent and bad deeds contribute to bad karma and bad rebirths.",
        keyPrinciples: [
            "Every action creates a corresponding reaction",
            "Sanchita Karma (accumulated karma from the past)",
            "Prarabdha Karma (karma bearing fruit in the present)",
            "Agami Karma (future karma being created now)"
        ],
        roleInPhilosophy: "Karma provides a rational explanation for the inequities in life and forms the basis for moral responsibility in dharmic traditions. It is deeply tied to the concepts of Samsara (cycle of rebirth) and Moksha (liberation).",
        practicalApplication: "Understanding karma encourages mindful action, ethical behavior, and taking responsibility for one's life. The practice of Karma Yoga—acting without attachment to the results—is a direct application of this principle to attain spiritual growth.",
        relatedConcepts: ["dharma", "samsara", "moksha", "niskama-karma"],
        sourceTexts: ["Bhagavad Gita", "Upanishads", "Yoga Sutras"],
        tags: ["ethics", "action", "universal-law", "foundational"]
    },
    {
        slug: "dharma",
        sanskritWord: "धर्म (Dharma)",
        englishTranslation: "Righteousness / Duty / Cosmic Order",
        shortDefinition: "The underlying order in nature and human life and behavior considered to be in accord with that order.",
        longDescription: "Dharma is a complex concept with multiple meanings depending on the context. At a cosmic level, it refers to the eternal laws that maintain the harmony of the universe (Sanatana Dharma). At an individual level, it means one's righteous duty, virtue, and right way of living. It is what upholds, supports, or maintains the regulatory order of the universe.",
        keyPrinciples: [
            "Sva-dharma: personal duty based on one's nature and stage of life",
            "Sanatana-dharma: eternal, universal laws and values",
            "Action aligned with cosmic harmony",
            "The foundation of ethical living"
        ],
        roleInPhilosophy: "Dharma is the first of the four Purusharthas (aims of human life), preceding Artha (wealth), Kama (desire), and Moksha (liberation). It provides the ethical framework within which the other aims should be pursued.",
        practicalApplication: "Practicing dharma means acting with integrity, compassion, and truth. It involves fulfilling one's responsibilities to family, society, and the universe, aligning personal choices with the greater good.",
        relatedConcepts: ["karma", "purushartha", "rta", "moksha"],
        sourceTexts: ["Dharmashastras", "Mahabharata", "Ramayana"],
        tags: ["duty", "ethics", "order", "foundational"]
    },
    {
        slug: "moksha",
        sanskritWord: "मोक्ष (Moksha)",
        englishTranslation: "Liberation / Emancipation",
        shortDefinition: "Freedom from the cycle of birth and death (samsara) and the realization of one's true nature.",
        longDescription: "Moksha is the ultimate spiritual goal in Sanatan Dharma. It refers to emancipation, liberation, or release from the cycle of death and rebirth (samsara). Escaping this cycle involves the realization of the absolute truth, overcoming ignorance (avidya), and understanding the identity of the individual soul (Atman) with the universal absolute (Brahman).",
        keyPrinciples: [
            "Liberation from the cycle of samsara",
            "Overcoming ignorance (avidya) through knowledge (jnana)",
            "Realization of the unity of Atman and Brahman",
            "A state of infinite bliss, peace, and pure consciousness"
        ],
        roleInPhilosophy: "Moksha is the highest of the four Purusharthas (aims of human life). Different philosophical schools debate whether it is achieved solely through knowledge (Advaita), devotion/grace (Dvaita/Vishishtadvaita), or a combination of paths.",
        practicalApplication: "While moksha is the ultimate goal, it is approached through paths like Karma Yoga (action), Bhakti Yoga (devotion), Jnana Yoga (knowledge), and Raja Yoga (meditation). The practical aspect involves detaching oneself from worldly desires and cultivating spiritual awareness.",
        relatedConcepts: ["samsara", "atman", "brahman", "nirvana"],
        sourceTexts: ["Upanishads", "Brahma Sutras", "Bhagavad Gita"],
        tags: ["liberation", "ultimate-goal", "spiritual", "transcendence"]
    },
    {
        slug: "samsara",
        sanskritWord: "संसार (Samsara)",
        englishTranslation: "The Cycle of Rebirth / Worldly Existence",
        shortDefinition: "The continuous cycle of birth, life, death, and reincarnation.",
        longDescription: "Samsara refers to the wandering or passing through a succession of states. It is the continuous cycle of birth, life, death, and rebirth (reincarnation) that all souls undergo due to their karma and ignorance (avidya) of their true nature. It is often depicted as a wheel or a vast ocean from which one seeks liberation.",
        keyPrinciples: [
            "Driven by karma (actions and their consequences)",
            "Characterized by change, transience, and eventual suffering (duhkha)",
            "Ignorance (avidya) keeps the soul bound to the cycle",
            "Liberation (moksha) is the exit from samsara"
        ],
        roleInPhilosophy: "Samsara is the problem for which moksha is the solution. It provides the context for human existence and the necessity for spiritual practice across all dharmic traditions.",
        practicalApplication: "Understanding samsara helps cultivate detachment (vairagya) from transient worldly pleasures and pains, motivating the seeker to pursue lasting spiritual truth and liberation.",
        relatedConcepts: ["karma", "moksha", "maya", "jiva"],
        sourceTexts: ["Upanishads", "Puranas", "Bhagavad Gita"],
        tags: ["cycle", "rebirth", "existence", "foundational"]
    },
    {
        slug: "maya",
        sanskritWord: "माया (Maya)",
        englishTranslation: "Illusion / Measurable Power",
        shortDefinition: "The cosmic illusion that conceals the true nature of reality and projects the apparent multiplicity of the world.",
        longDescription: "In Advaita Vedanta, Maya refers to the power of Brahman that gives rise to the perception of the phenomenal world. It is the illusory power that makes the singular, infinite Brahman appear as the diverse, finite universe. From a relative standpoint, Maya is the creative power of God; from an absolute standpoint, it is the ignorance (avidya) that obscures truth.",
        keyPrinciples: [
            "Avarana-shakti: the power that conceals the absolute reality",
            "Vikshepa-shakti: the power that projects the illusion of multiplicity",
            "It is neither completely real (like Brahman) nor completely unreal (like a square circle)",
            "It binds the soul in ignorance but is transcended through spiritual knowledge"
        ],
        roleInPhilosophy: "Maya is a central concept in non-dual (Advaita) philosophy to explain how an unchanging, singular reality (Brahman) can appear as a changing, pluralistic world. In theistic schools, it is seen as the real, creative power of God.",
        practicalApplication: "Recognizing maya involves practicing discrimination (viveka) between the eternal and the transient, realizing that what is perceived by the senses is not the ultimate truth, thereby reducing attachment to worldly outcomes.",
        relatedConcepts: ["brahman", "avidya", "advaita", "samsara"],
        sourceTexts: ["Upanishads", "Brahma Sutras", "Vivekachudamani"],
        tags: ["illusion", "creation", "perception", "non-dual"]
    },
    {
        slug: "atman",
        sanskritWord: "आत्मन् (Atman)",
        englishTranslation: "Self / Soul / Spirit",
        shortDefinition: "The innermost, eternal core of a person; the true self.",
        longDescription: "Atman is the spiritual life principle of the universe, especially when regarded as inherent in the real self of the individual. It is the eternal, unchanging, unmanifested core of conscious being, distinct from the mind, intellect, ego, and physical body. In Vedanta, recognizing the Atman is the key to liberation.",
        keyPrinciples: [
            "Eternal, unborn, and unchanging",
            "Distinct from the body, mind, and ego (ahamkara)",
            "Pure consciousness, witness to all experience",
            "Depending on the philosophy, either identical to (Advaita) or eternally a part of (Vishishtadvaita/Dvaita) Brahman"
        ],
        roleInPhilosophy: "Understanding Atman is the core of Upanishadic teaching. The profound realization 'Aham Brahmasmi' (I am Brahman) points to the fundamental unity of the individual self (Atman) and the universal reality (Brahman).",
        practicalApplication: "Spiritual practice involves Neti Neti (Not this, not this) or Atma-vichara (Self-inquiry) to peel away the layers of false identification (body, mind, emotions) and rest in the pure awareness of the Atman.",
        relatedConcepts: ["brahman", "jiva", "ahamkara", "moksha"],
        sourceTexts: ["Upanishads", "Bhagavad Gita", "Brahma Sutras"],
        tags: ["self", "soul", "consciousness", "core"]
    },
    {
        slug: "brahman",
        sanskritWord: "ब्रह्मन् (Brahman)",
        englishTranslation: "The Absolute / Supreme Reality",
        shortDefinition: "The transcendent and immanent ultimate reality, supreme cosmic spirit.",
        longDescription: "Brahman is the highest universal principle, the ultimate reality in the universe. In major schools of Hindu philosophy, it is the material, efficient, formal and final cause of all that exists. It is the pervasive, infinite, eternal truth and bliss which does not change, yet is the cause of all changes.",
        keyPrinciples: [
            "Sat-Chit-Ananda: Existence, Consciousness, and Bliss Absolute",
            "Nirguna Brahman: The Absolute without qualities or form",
            "Saguna Brahman: The Absolute with qualities, often worshipped as God (Ishvara)",
            "The underlying thread of unity in diverse existence"
        ],
        roleInPhilosophy: "The nature of Brahman and its relationship with the individual soul (Atman) and the physical world is the central subject of the Upanishads and the primary point of debate among the Vedanta sub-schools.",
        practicalApplication: "Meditation on Brahman aims at shifting one's identification from the limited ego to the universal consciousness. Devotion (Bhakti) often focuses on Saguna Brahman, while Knowledge (Jnana) tends to focus on Nirguna Brahman.",
        relatedConcepts: ["atman", "ishvara", "maya", "advaita"],
        sourceTexts: ["Upanishads", "Brahma Sutras", "Bhagavad Gita"],
        tags: ["absolute", "ultimate-reality", "divine", "core"]
    },
    {
        slug: "yoga",
        sanskritWord: "योग (Yoga)",
        englishTranslation: "Union / Yoke / Discipline",
        shortDefinition: "Physical, mental, and spiritual practices or disciplines which originated in ancient India.",
        longDescription: "Derived from the Sanskrit root 'yuj', meaning 'to yoke' or 'to unite', Yoga refers to the methods or disciplines used to achieve union of the individual self with the divine or ultimate reality. Beyond physical postures, it encompasses a wide range of contemplative and ethical practices aimed at spiritual liberation.",
        keyPrinciples: [
            "Cessation of mental fluctuations (Yoga chitta vritti nirodha)",
            "Union of the individual consciousness with the universal consciousness",
            "Four main paths: Karma (action), Bhakti (devotion), Jnana (knowledge), Raja (meditation)",
            "A systematic approach to self-realization"
        ],
        roleInPhilosophy: "Yoga is one of the six orthodox (astika) schools of Hindu philosophy. It provides the practical methodology to experience the truths described in philosophical theories like Samkhya and Vedanta.",
        practicalApplication: "Yoga is applied through various limbs (as in Patanjali's Ashtanga Yoga) including ethical codes (Yamas/Niyamas), physical postures (Asanas), breath control (Pranayama), and progressive stages of meditation (Dharana, Dhyana, Samadhi).",
        relatedConcepts: ["samadhi", "pranayama", "meditation", "karma-yoga"],
        sourceTexts: ["Yoga Sutras of Patanjali", "Bhagavad Gita", "Hatha Yoga Pradipika"],
        tags: ["practice", "union", "discipline", "meditation"]
    },
    {
        slug: "ahimsa",
        sanskritWord: "अहिंसा (Ahimsa)",
        englishTranslation: "Non-violence / Harmlessness",
        shortDefinition: "The ethical principle of not causing harm to other living beings.",
        longDescription: "Ahimsa means 'not to injure' and 'compassion'. It is a multidimensional concept inspired by the premise that all living beings have the spark of the divine spiritual energy; therefore, to hurt another being is to hurt oneself. Ahimsa encompasses thoughts, words, and actions.",
        keyPrinciples: [
            "Non-injury in thought, word, and deed",
            "Active compassion and love for all beings",
            "The highest duty (Ahimsa Paramo Dharma)",
            "Rooted in the understanding of the unity of all life"
        ],
        roleInPhilosophy: "Ahimsa is the first and foremost of the five Yamas (ethical restraints) in Patanjali's Yoga Sutras. It is considered a fundamental virtue across Hindu, Jain, and Buddhist traditions.",
        practicalApplication: "Practicing ahimsa involves cultivating a peaceful mind, resolving conflicts amicably, adopting a non-harming diet (often vegetarianism), and practicing empathy and kindness in daily interactions.",
        relatedConcepts: ["dharma", "yoga", "karma", "compassion"],
        sourceTexts: ["Mahabharata", "Yoga Sutras", "Upanishads"],
        tags: ["ethics", "virtue", "non-violence", "foundational"]
    },
    {
        slug: "guru",
        sanskritWord: "गुरु (Guru)",
        englishTranslation: "Teacher / Remover of Darkness",
        shortDefinition: "A personal spiritual teacher or guide who leads the student from ignorance to enlightenment.",
        longDescription: "A guru in Sanatan Dharma is more than a teacher of skills; they are a revered figure who serves as a living embodiment of spiritual truth. The word 'gu' means darkness, and 'ru' means dispeller; hence, a guru is one who dispels the darkness of spiritual ignorance. The guru-shishya (teacher-student) parampara (lineage) is central to the transmission of spiritual knowledge.",
        keyPrinciples: [
            "Dispels ignorance and transmits experiential knowledge",
            "Serves as an exemplar of the teachings",
            "Initiates the student (diksha) into an authentic lineage",
            "The relationship requires profound trust and surrender from the student"
        ],
        roleInPhilosophy: "Many texts state that ultimate spiritual knowledge—especially the subtle truths of the Upanishads—cannot be grasped merely through independent study; it requires the grace and guidance of an enlightened guru.",
        practicalApplication: "A seeker approaches a guru with humility and service to receive instruction. The practice of Guru Bhakti (devotion to the teacher) and following their specific instructions (sadhana) are key aspects of the spiritual journey.",
        relatedConcepts: ["shishya", "parampara", "vidya", "diksha"],
        sourceTexts: ["Upanishads", "Guru Gita", "Bhagavad Gita"],
        tags: ["lineage", "teacher", "guidance", "spiritual-path"]
    }
];

export function getConceptBySlug(slug: string): Concept | undefined {
    return concepts.find(c => c.slug === slug);
}

export function getAllConcepts(): Concept[] {
    return concepts;
}
