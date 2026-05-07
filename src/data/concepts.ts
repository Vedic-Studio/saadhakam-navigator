import { conceptsBatch1 } from "./conceptsBatch1";
import { conceptsBatch2 } from "./conceptsBatch2";
import { conceptsBatch3 } from "./conceptsBatch3";
import type { ContentImage } from "@/types/images";

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
  featuredImage?: ContentImage;
  /**
   * Optional SEO overrides for the SERP snippet on `/what-is-<slug>`.
   * When omitted, the page falls back to `What is ${conceptName}? Meaning & Vedic Context | Sadhaka`
   * and `shortDefinition`. Override these when GSC shows below-expected CTR for a specific concept.
   */
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export const concepts: Concept[] = [
  {
    slug: "karma",
    sanskritWord: "कर्म (Karma)",
    englishTranslation: "Action / Deed / Cause and Effect",
    shortDefinition:
      "The universal principle of cause and effect, action and reaction, which governs all consciousness.",
    longDescription:
      "Karma literally means 'action' or 'doing'. In the spiritual and philosophical sense, it refers to the spiritual principle of cause and effect where intent and actions of an individual (cause) influence the future of that individual (effect). Good intent and good deeds contribute to good karma and happier rebirths, while bad intent and bad deeds contribute to bad karma and bad rebirths.",
    keyPrinciples: [
      "Every action creates a corresponding reaction",
      "Sanchita Karma (accumulated karma from the past)",
      "Prarabdha Karma (karma bearing fruit in the present)",
      "Agami Karma (future karma being created now)",
    ],
    roleInPhilosophy:
      "Karma provides a rational explanation for the inequities in life and forms the basis for moral responsibility in dharmic traditions. It is deeply tied to the concepts of Samsara (cycle of rebirth) and Moksha (liberation).",
    practicalApplication:
      "Understanding karma encourages mindful action, ethical behavior, and taking responsibility for one's life. The practice of Karma Yoga—acting without attachment to the results—is a direct application of this principle to attain spiritual growth.",
    relatedConcepts: ["dharma", "samsara", "moksha", "niskama-karma"],
    sourceTexts: ["Bhagavad Gita", "Upanishads", "Yoga Sutras"],
    tags: ["ethics", "action", "universal-law", "foundational"],
  },
  {
    slug: "dharma",
    sanskritWord: "धर्म (Dharma)",
    englishTranslation: "Righteousness / Duty / Cosmic Order",
    shortDefinition:
      "The underlying order in nature and human life and behavior considered to be in accord with that order.",
    longDescription:
      "Dharma is a complex concept with multiple meanings depending on the context. At a cosmic level, it refers to the eternal laws that maintain the harmony of the universe (Sanatana Dharma). At an individual level, it means one's righteous duty, virtue, and right way of living. It is what upholds, supports, or maintains the regulatory order of the universe.",
    keyPrinciples: [
      "Sva-dharma: personal duty based on one's nature and stage of life",
      "Sanatana-dharma: eternal, universal laws and values",
      "Action aligned with cosmic harmony",
      "The foundation of ethical living",
    ],
    roleInPhilosophy:
      "Dharma is the first of the four Purusharthas (aims of human life), preceding Artha (wealth), Kama (desire), and Moksha (liberation). It provides the ethical framework within which the other aims should be pursued.",
    practicalApplication:
      "Practicing dharma means acting with integrity, compassion, and truth. It involves fulfilling one's responsibilities to family, society, and the universe, aligning personal choices with the greater good.",
    relatedConcepts: ["karma", "purushartha", "rta", "moksha"],
    sourceTexts: ["Dharmashastras", "Mahabharata", "Ramayana"],
    tags: ["duty", "ethics", "order", "foundational"],
  },
  {
    slug: "moksha",
    sanskritWord: "मोक्ष (Moksha)",
    englishTranslation: "Liberation / Emancipation",
    shortDefinition:
      "Freedom from the cycle of birth and death (samsara) and the realization of one's true nature.",
    longDescription:
      "Moksha is the ultimate spiritual goal in Sanatan Dharma. It refers to emancipation, liberation, or release from the cycle of death and rebirth (samsara). Escaping this cycle involves the realization of the absolute truth, overcoming ignorance (avidya), and understanding the identity of the individual soul (Atman) with the universal absolute (Brahman).",
    keyPrinciples: [
      "Liberation from the cycle of samsara",
      "Overcoming ignorance (avidya) through knowledge (jnana)",
      "Realization of the unity of Atman and Brahman",
      "A state of infinite bliss, peace, and pure consciousness",
    ],
    roleInPhilosophy:
      "Moksha is the highest of the four Purusharthas (aims of human life). Different philosophical schools debate whether it is achieved solely through knowledge (Advaita), devotion/grace (Dvaita/Vishishtadvaita), or a combination of paths.",
    practicalApplication:
      "While moksha is the ultimate goal, it is approached through paths like Karma Yoga (action), Bhakti Yoga (devotion), Jnana Yoga (knowledge), and Raja Yoga (meditation). The practical aspect involves detaching oneself from worldly desires and cultivating spiritual awareness.",
    relatedConcepts: ["samsara", "atman", "brahman", "samadhi"],
    sourceTexts: ["Upanishads", "Brahma Sutras", "Bhagavad Gita"],
    tags: ["liberation", "ultimate-goal", "spiritual", "transcendence"],
  },
  {
    slug: "samsara",
    sanskritWord: "संसार (Samsara)",
    englishTranslation: "The Cycle of Rebirth / Worldly Existence",
    shortDefinition:
      "The continuous cycle of birth, life, death, and reincarnation.",
    longDescription:
      "Samsara refers to the wandering or passing through a succession of states. It is the continuous cycle of birth, life, death, and rebirth (reincarnation) that all souls undergo due to their karma and ignorance (avidya) of their true nature. It is often depicted as a wheel or a vast ocean from which one seeks liberation.",
    keyPrinciples: [
      "Driven by karma (actions and their consequences)",
      "Characterized by change, transience, and eventual suffering (duhkha)",
      "Ignorance (avidya) keeps the soul bound to the cycle",
      "Liberation (moksha) is the exit from samsara",
    ],
    roleInPhilosophy:
      "Samsara is the problem for which moksha is the solution. It provides the context for human existence and the necessity for spiritual practice across all dharmic traditions.",
    practicalApplication:
      "Understanding samsara helps cultivate detachment (vairagya) from transient worldly pleasures and pains, motivating the seeker to pursue lasting spiritual truth and liberation.",
    relatedConcepts: ["karma", "moksha", "maya", "jiva"],
    sourceTexts: ["Upanishads", "Puranas", "Bhagavad Gita"],
    tags: ["cycle", "rebirth", "existence", "foundational"],
  },
  {
    slug: "maya",
    sanskritWord: "माया (Maya)",
    englishTranslation: "Illusion / Measurable Power",
    shortDefinition:
      "The cosmic illusion that conceals the true nature of reality and projects the apparent multiplicity of the world.",
    longDescription:
      "In Advaita Vedanta, Maya refers to the power of Brahman that gives rise to the perception of the phenomenal world. It is the illusory power that makes the singular, infinite Brahman appear as the diverse, finite universe. From a relative standpoint, Maya is the creative power of God; from an absolute standpoint, it is the ignorance (avidya) that obscures truth.",
    keyPrinciples: [
      "Avarana-shakti: the power that conceals the absolute reality",
      "Vikshepa-shakti: the power that projects the illusion of multiplicity",
      "It is neither completely real (like Brahman) nor completely unreal (like a square circle)",
      "It binds the soul in ignorance but is transcended through spiritual knowledge",
    ],
    roleInPhilosophy:
      "Maya is a central concept in non-dual (Advaita) philosophy to explain how an unchanging, singular reality (Brahman) can appear as a changing, pluralistic world. In theistic schools, it is seen as the real, creative power of God.",
    practicalApplication:
      "Recognizing maya involves practicing discrimination (viveka) between the eternal and the transient, realizing that what is perceived by the senses is not the ultimate truth, thereby reducing attachment to worldly outcomes.",
    relatedConcepts: ["brahman", "avidya", "advaita", "samsara"],
    sourceTexts: ["Upanishads", "Brahma Sutras", "Vivekachudamani"],
    tags: ["illusion", "creation", "perception", "non-dual"],
  },
  {
    slug: "atman",
    sanskritWord: "आत्मन् (Atman)",
    englishTranslation: "Self / Soul / Spirit",
    shortDefinition: "The innermost, eternal core of a person; the true self.",
    longDescription:
      "Atman is the spiritual life principle of the universe, especially when regarded as inherent in the real self of the individual. It is the eternal, unchanging, unmanifested core of conscious being, distinct from the mind, intellect, ego, and physical body. In Vedanta, recognizing the Atman is the key to liberation.",
    keyPrinciples: [
      "Eternal, unborn, and unchanging",
      "Distinct from the body, mind, and ego (ahamkara)",
      "Pure consciousness, witness to all experience",
      "Depending on the philosophy, either identical to (Advaita) or eternally a part of (Vishishtadvaita/Dvaita) Brahman",
    ],
    roleInPhilosophy:
      "Understanding Atman is the core of Upanishadic teaching. The profound realization 'Aham Brahmasmi' (I am Brahman) points to the fundamental unity of the individual self (Atman) and the universal reality (Brahman).",
    practicalApplication:
      "Spiritual practice involves Neti Neti (Not this, not this) or Atma-vichara (Self-inquiry) to peel away the layers of false identification (body, mind, emotions) and rest in the pure awareness of the Atman.",
    relatedConcepts: ["brahman", "jiva", "ahamkara", "moksha"],
    sourceTexts: ["Upanishads", "Bhagavad Gita", "Brahma Sutras"],
    tags: ["self", "soul", "consciousness", "core"],
  },
  {
    slug: "brahman",
    sanskritWord: "ब्रह्मन् (Brahman)",
    englishTranslation: "The Absolute / Supreme Reality",
    shortDefinition:
      "The transcendent and immanent ultimate reality, supreme cosmic spirit.",
    longDescription:
      "Brahman is the highest universal principle, the ultimate reality in the universe. In major schools of Hindu philosophy, it is the material, efficient, formal and final cause of all that exists. It is the pervasive, infinite, eternal truth and bliss which does not change, yet is the cause of all changes.",
    keyPrinciples: [
      "Sat-Chit-Ananda: Existence, Consciousness, and Bliss Absolute",
      "Nirguna Brahman: The Absolute without qualities or form",
      "Saguna Brahman: The Absolute with qualities, often worshipped as God (Ishvara)",
      "The underlying thread of unity in diverse existence",
    ],
    roleInPhilosophy:
      "The nature of Brahman and its relationship with the individual soul (Atman) and the physical world is the central subject of the Upanishads and the primary point of debate among the Vedanta sub-schools.",
    practicalApplication:
      "Meditation on Brahman aims at shifting one's identification from the limited ego to the universal consciousness. Devotion (Bhakti) often focuses on Saguna Brahman, while Knowledge (Jnana) tends to focus on Nirguna Brahman.",
    relatedConcepts: ["atman", "ishvara", "maya", "advaita"],
    sourceTexts: ["Upanishads", "Brahma Sutras", "Bhagavad Gita"],
    tags: ["absolute", "ultimate-reality", "divine", "core"],
  },
  {
    slug: "yoga",
    sanskritWord: "योग (Yoga)",
    englishTranslation: "Union / Yoke / Discipline",
    shortDefinition:
      "Physical, mental, and spiritual practices or disciplines which originated in ancient India.",
    longDescription:
      "Derived from the Sanskrit root 'yuj', meaning 'to yoke' or 'to unite', Yoga refers to the methods or disciplines used to achieve union of the individual self with the divine or ultimate reality. Beyond physical postures, it encompasses a wide range of contemplative and ethical practices aimed at spiritual liberation.",
    keyPrinciples: [
      "Cessation of mental fluctuations (Yoga chitta vritti nirodha)",
      "Union of the individual consciousness with the universal consciousness",
      "Four main paths: Karma (action), Bhakti (devotion), Jnana (knowledge), Raja (meditation)",
      "A systematic approach to self-realization",
    ],
    roleInPhilosophy:
      "Yoga is one of the six orthodox (astika) schools of Hindu philosophy. It provides the practical methodology to experience the truths described in philosophical theories like Samkhya and Vedanta.",
    practicalApplication:
      "Yoga is applied through various limbs (as in Patanjali's Ashtanga Yoga) including ethical codes (Yamas/Niyamas), physical postures (Asanas), breath control (Pranayama), and progressive stages of meditation (Dharana, Dhyana, Samadhi).",
    relatedConcepts: ["samadhi", "pranayama", "raja-yoga", "karma-yoga"],
    sourceTexts: [
      "Yoga Sutras of Patanjali",
      "Bhagavad Gita",
      "Hatha Yoga Pradipika",
    ],
    tags: ["practice", "union", "discipline", "meditation"],
  },
  {
    slug: "ahimsa",
    sanskritWord: "अहिंसा (Ahimsa)",
    englishTranslation: "Non-violence / Harmlessness",
    shortDefinition:
      "The ethical principle of not causing harm to other living beings.",
    longDescription:
      "Ahimsa means 'not to injure' and 'compassion'. It is a multidimensional concept inspired by the premise that all living beings have the spark of the divine spiritual energy; therefore, to hurt another being is to hurt oneself. Ahimsa encompasses thoughts, words, and actions.",
    keyPrinciples: [
      "Non-injury in thought, word, and deed",
      "Active compassion and love for all beings",
      "The highest duty (Ahimsa Paramo Dharma)",
      "Rooted in the understanding of the unity of all life",
    ],
    roleInPhilosophy:
      "Ahimsa is the first and foremost of the five Yamas (ethical restraints) in Patanjali's Yoga Sutras. It is considered a fundamental virtue across Hindu, Jain, and Buddhist traditions.",
    practicalApplication:
      "Practicing ahimsa involves cultivating a peaceful mind, resolving conflicts amicably, adopting a non-harming diet (often vegetarianism), and practicing empathy and kindness in daily interactions.",
    relatedConcepts: ["dharma", "yoga", "karma", "seva"],
    sourceTexts: ["Mahabharata", "Yoga Sutras", "Upanishads"],
    tags: ["ethics", "virtue", "non-violence", "foundational"],
  },
  {
    slug: "guru",
    sanskritWord: "गुरु (Guru)",
    englishTranslation: "Teacher / Remover of Darkness",
    shortDefinition:
      "A personal spiritual teacher or guide who leads the student from ignorance to enlightenment.",
    longDescription:
      "A guru in Sanatan Dharma is more than a teacher of skills; they are a revered figure who serves as a living embodiment of spiritual truth. The word 'gu' means darkness, and 'ru' means dispeller; hence, a guru is one who dispels the darkness of spiritual ignorance. The guru-shishya (teacher-student) parampara (lineage) is central to the transmission of spiritual knowledge.",
    keyPrinciples: [
      "Dispels ignorance and transmits experiential knowledge",
      "Serves as an exemplar of the teachings",
      "Initiates the student (diksha) into an authentic lineage",
      "The relationship requires profound trust and surrender from the student",
    ],
    roleInPhilosophy:
      "Many texts state that ultimate spiritual knowledge—especially the subtle truths of the Upanishads—cannot be grasped merely through independent study; it requires the grace and guidance of an enlightened guru.",
    practicalApplication:
      "A seeker approaches a guru with humility and service to receive instruction. The practice of Guru Bhakti (devotion to the teacher) and following their specific instructions (sadhana) are key aspects of the spiritual journey.",
    relatedConcepts: ["bhakti", "jnana", "seva", "ishvara"],
    sourceTexts: ["Upanishads", "Guru Gita", "Bhagavad Gita"],
    tags: ["lineage", "teacher", "guidance", "spiritual-path"],
  },
  {
    slug: "bhakti",
    sanskritWord: "भक्ति (Bhakti)",
    englishTranslation: "Devotion / Loving Participation in the Divine",
    shortDefinition:
      "The path of loving devotion, surrender, and heartfelt relationship with the Divine.",
    longDescription:
      "Bhakti comes from the root bhaj, meaning to share, partake, or belong. In spiritual life it refers to loving participation in the life of the Divine through remembrance, prayer, mantra, worship, and surrender. Bhakti is not merely emotionalism; it is a disciplined orientation of the whole being toward God, transforming the heart from self-centeredness to love, trust, and reverence.",
    keyPrinciples: [
      "Supreme love for the Divine as the center of life",
      "Remembrance through prayer, mantra, kirtan, and puja",
      "Surrender of ego and fruits of action",
      "Accessible to all regardless of scholarship or status",
    ],
    roleInPhilosophy:
      "Bhakti is one of the major yogic paths taught across the Bhagavad Gita, Puranic traditions, and devotional schools of Vedanta. In many traditions it is considered the most direct and grace-filled path because it dissolves separation through relationship rather than abstract analysis alone.",
    practicalApplication:
      "Bhakti becomes practical through daily chanting, prayer, offering food, gratitude, temple worship, and treating all work as service to the Divine. It softens the heart, reduces anxiety born of ego-control, and helps transform ordinary routines into sacred participation.",
    relatedConcepts: ["ishvara", "seva", "guru", "moksha"],
    sourceTexts: ["Bhagavad Gita", "Narada Bhakti Sutras", "Srimad Bhagavatam"],
    tags: ["devotion", "love", "yoga", "surrender"],
  },
  {
    slug: "jnana",
    sanskritWord: "ज्ञान (Jnana)",
    englishTranslation: "Spiritual Knowledge / Wisdom",
    shortDefinition:
      "Direct spiritual knowledge that reveals the difference between the real and the unreal.",
    longDescription:
      "Jnana is not mere information or intellectual opinion. It is liberating insight into the nature of the Self, the world, and ultimate reality. In Vedantic practice, Jnana matures through hearing the teachings, reflecting on them, and deeply meditating until knowledge becomes lived realization. It is the fire that burns ignorance and exposes the eternal beneath changing appearances.",
    keyPrinciples: [
      "Knowledge must mature into realization, not remain conceptual",
      "Discrimination between Self and non-Self",
      "Ignorance is removed through insight, inquiry, and contemplation",
      "Wisdom culminates in freedom from false identification",
    ],
    roleInPhilosophy:
      "Jnana is central to the Upanishads and Advaita Vedanta, where liberation is achieved through recognizing the true nature of Atman and Brahman. It also supports other paths by clarifying the metaphysical foundation beneath devotion, practice, and ethics.",
    practicalApplication:
      "Jnana is practiced through scripture study, contemplation, questioning assumptions, self-inquiry, and remaining aware of the witness behind thoughts and emotions. It helps reduce confusion, attachment, and fear by orienting life around what is enduring rather than temporary.",
    relatedConcepts: ["atman", "brahman", "viveka", "avidya"],
    sourceTexts: ["Upanishads", "Bhagavad Gita", "Vivekachudamani"],
    tags: ["wisdom", "knowledge", "vedanta", "liberation"],
  },
  {
    slug: "viveka",
    sanskritWord: "विवेक (Viveka)",
    englishTranslation: "Discernment / Discrimination",
    shortDefinition:
      "The faculty of discerning the eternal from the transient and the real from the unreal.",
    longDescription:
      "Viveka is the subtle capacity to distinguish between what changes and what remains, between passing appearances and abiding truth. It is a central requirement in Vedanta because the seeker is constantly faced with misleading identifications: body as self, pleasure as fulfillment, opinion as truth, and change as permanence. Viveka cuts through these confusions and points awareness toward the eternal.",
    keyPrinciples: [
      "Discerning the eternal from the temporary",
      "Seeing through surface appearances and emotional reactivity",
      "Separating Self from mind, body, and roles",
      "Supporting wise action and inward freedom",
    ],
    roleInPhilosophy:
      "Viveka is the gateway to Jnana and one of the foundational qualifications of a serious Vedantic seeker. Without discernment, even spiritual practice can become ego-driven, sentimental, or confused.",
    practicalApplication:
      "In daily life, Viveka means pausing before reaction, asking what is actually true, and refusing to build identity on temporary success, pain, praise, or blame. It strengthens clarity in relationships, work, and sadhana by continually orienting attention toward what matters most.",
    relatedConcepts: ["vairagya", "jnana", "maya", "atman"],
    sourceTexts: ["Vivekachudamani", "Upanishads", "Bhagavad Gita"],
    tags: ["discernment", "clarity", "vedanta", "practice"],
  },
  {
    slug: "vairagya",
    sanskritWord: "वैराग्य (Vairagya)",
    englishTranslation: "Dispassion / Non-Attachment",
    shortDefinition:
      "Freedom from compulsive attachment to pleasure, possession, and identity in the transient world.",
    longDescription:
      "Vairagya does not mean indifference, suppression, or rejection of life. It means the fading of false dependence on external things for inner fulfillment. When the seeker sees clearly that all worldly experiences are temporary, the grip of craving loosens naturally. Vairagya creates spaciousness, dignity, and steadiness, allowing one to participate in life without bondage.",
    keyPrinciples: [
      "Non-attachment without apathy",
      "Freedom from craving and fear of loss",
      "Inner sufficiency rooted in truth rather than circumstance",
      "Essential support for meditation and liberation",
    ],
    roleInPhilosophy:
      "Vairagya is paired with practice in the Yoga Sutras and with Viveka in Vedanta. It is the practical counterpart to discernment: once the transient is seen clearly, attachment to it naturally weakens.",
    practicalApplication:
      "Vairagya can be practiced by observing desire without obeying it, accepting change gracefully, simplifying life, and doing one's duties without psychological dependence on results. It brings resilience, less reactivity, and more freedom in relationships and work.",
    relatedConcepts: ["viveka", "samsara", "moksha", "yoga"],
    sourceTexts: ["Yoga Sutras", "Bhagavad Gita", "Vedantic texts"],
    tags: ["detachment", "discipline", "freedom", "meditation"],
  },
  {
    slug: "samadhi",
    sanskritWord: "समाधि (Samadhi)",
    englishTranslation: "Absorption / Perfect Integration",
    shortDefinition:
      "A state of profound meditative absorption in which the ordinary sense of separateness falls away.",
    longDescription:
      "Samadhi is the culmination of deep yogic concentration and meditation. It refers to complete absorption in the object of contemplation, and in its highest form, transcendence of the ordinary subject-object split. While often spoken of as mystical, it is also presented systematically in the yogic tradition as the matured fruit of ethics, discipline, concentration, and sustained meditative practice.",
    keyPrinciples: [
      "Deep absorption beyond ordinary mental fluctuation",
      "Emerges from sustained Dharana and Dhyana",
      "Ranges from object-based absorption to formless realization",
      "Can become a doorway to liberating knowledge",
    ],
    roleInPhilosophy:
      "Samadhi is central to the Yoga Sutras and appears across Hindu and Buddhist contemplative traditions as the apex of meditative stabilization. In Vedantic interpretation, it supports or reveals direct knowledge of the Self.",
    practicalApplication:
      "Though advanced Samadhi is rare, its practical movement begins with simpler habits: regular meditation, ethical living, sensory restraint, focused attention, and patient inner stillness. Even partial glimpses reduce compulsive thought, deepen peace, and reorient life around presence rather than noise.",
    relatedConcepts: ["yoga", "atman", "brahman", "moksha"],
    sourceTexts: ["Yoga Sutras", "Bhagavad Gita", "Upanishads"],
    tags: ["meditation", "absorption", "yoga", "realization"],
  },
  {
    slug: "seva",
    sanskritWord: "सेवा (Seva)",
    englishTranslation: "Selfless Service",
    shortDefinition:
      "Action performed in a spirit of service without egoic expectation of reward or recognition.",
    longDescription:
      "Seva is the expression of spiritual understanding through action. It is service offered to the Divine, the Guru, the community, or any being in need, without self-centered calculation. While it can look outwardly simple, its inner power lies in reducing ego, softening self-importance, and transforming work into offering.",
    keyPrinciples: [
      "Service without egoic transaction",
      "Seeing the Divine in others",
      "Action as offering rather than possession",
      "Humility, responsibility, and compassion in practice",
    ],
    roleInPhilosophy:
      "Seva is closely tied to Karma Yoga and Bhakti. It translates abstract ideals such as Dharma, devotion, and non-attachment into lived conduct and is widely honored across Hindu, Sikh, and service-oriented spiritual traditions.",
    practicalApplication:
      "Seva can take the form of helping family without resentment, volunteering, serving teachers and communities, or doing professional work with integrity and contribution in mind. It purifies motivation and makes ordinary life part of spiritual practice.",
    relatedConcepts: ["karma", "bhakti", "dharma", "guru"],
    sourceTexts: ["Bhagavad Gita", "Bhakti literature", "Sikh teachings"],
    tags: ["service", "karma-yoga", "devotion", "practice"],
  },
  {
    slug: "avidya",
    sanskritWord: "अविद्या (Avidya)",
    englishTranslation: "Ignorance / Misapprehension",
    shortDefinition:
      "Fundamental spiritual ignorance that obscures true reality and causes mistaken identity.",
    longDescription:
      "Avidya is not simply lack of data; it is existential mis-knowing. It is the root confusion by which the eternal Self is mistaken for body, mind, role, and story. From Avidya arise fear, attachment, egoism, and the entire structure of bondage. In both Yoga and Vedanta, liberation is impossible until this fundamental ignorance is weakened and dissolved.",
    keyPrinciples: [
      "Mistaking the non-Self for the Self",
      "The root of suffering, bondage, and confusion",
      "Supports ego, craving, fear, and false identification",
      "Removed through insight, discipline, and realization",
    ],
    roleInPhilosophy:
      "Avidya is a foundational obstacle in the Yoga Sutras and a core explanatory principle in Vedanta. It explains why beings remain trapped in Samsara despite their essential spiritual nature.",
    practicalApplication:
      "Practically, confronting Avidya means noticing unconscious identifications—'I am my job', 'I am my anxiety', 'I am my status'—and bringing awareness, inquiry, and spiritual study to them. This gradually frees the seeker from automatic delusion.",
    relatedConcepts: ["maya", "jnana", "moksha", "samsara"],
    sourceTexts: ["Upanishads", "Yoga Sutras", "Vedanta texts"],
    tags: ["ignorance", "bondage", "vedanta", "yoga"],
  },
  {
    slug: "ishvara",
    sanskritWord: "ईश्वर (Ishvara)",
    englishTranslation: "Lord / Personal God / Supreme Ruler",
    shortDefinition:
      "The personal dimension of the Divine understood as Lord, ruler, or supreme guiding intelligence.",
    longDescription:
      "Ishvara refers to the Divine as personal, knowable, and related to the world. While Brahman may describe the absolute in its impersonal or metaphysical aspect, Ishvara points to God as creator, sustainer, and guide. Devotional traditions approach Ishvara through form, name, and relationship, while yogic traditions may focus on Ishvara as the ideal of pure consciousness untouched by affliction and karma.",
    keyPrinciples: [
      "The Divine as personal and relational",
      "Creator, sustainer, and guide of the cosmos",
      "Accessible through devotion, surrender, and remembrance",
      "A bridge between metaphysical truth and lived spirituality",
    ],
    roleInPhilosophy:
      "Ishvara occupies a central place in devotional schools, the Bhagavad Gita, and Patanjali's Yoga. It helps seekers relate to the Divine not only as abstract reality but as presence, grace, intelligence, and refuge.",
    practicalApplication:
      "In practice, Ishvara can be approached through prayer, surrender, mantra, temple worship, or simply offering daily actions to a higher intelligence. This reduces ego-burden and fosters trust, humility, and steadiness.",
    relatedConcepts: ["brahman", "bhakti", "guru", "dharma"],
    sourceTexts: ["Bhagavad Gita", "Yoga Sutras", "Puranas"],
    tags: ["god", "divine", "devotion", "theism"],
  },
  {
    slug: "jiva",
    sanskritWord: "जीव (Jiva)",
    englishTranslation: "Individual Soul / Living Being",
    shortDefinition:
      "The individual embodied being that experiences life through mind, body, karma, and rebirth.",
    longDescription:
      "Jiva refers to the individual living self as it appears within embodied existence. It is the soul conditioned by ignorance, karma, mind, and identification with body and world. Philosophical schools differ on the exact relationship between Jiva and Atman or Brahman, but all agree that the ordinary human condition involves the Jiva being bound within Samsara until deeper realization dawns.",
    keyPrinciples: [
      "The soul as individual experiencer within worldly life",
      "Bound by karma, ignorance, and embodiment",
      "Distinctly discussed from Atman in many practical contexts",
      "Capable of liberation through realization or grace",
    ],
    roleInPhilosophy:
      "Jiva is a crucial concept for explaining rebirth, moral consequence, spiritual striving, and the apparent individuality of beings. It allows traditions to discuss bondage and liberation without collapsing all experience into abstraction.",
    practicalApplication:
      "Reflecting on Jiva helps a seeker understand why life feels limited, reactive, and conditioned—and why spiritual practice matters. It encourages humility, patience, and responsibility while pointing beyond the surface self.",
    relatedConcepts: ["atman", "samsara", "karma", "moksha"],
    sourceTexts: ["Upanishads", "Bhagavad Gita", "Vedanta texts"],
    tags: ["soul", "individuality", "rebirth", "bondage"],
  },
  {
    slug: "karma-yoga",
    sanskritWord: "कर्म योग (Karma Yoga)",
    englishTranslation: "The Yoga of Selfless Action",
    shortDefinition:
      "A path of spiritual growth through action performed without attachment to personal reward.",
    longDescription:
      "Karma Yoga transforms ordinary action into spiritual practice. Rather than escaping work, it changes the inner relationship to work: action is done as duty, offering, and participation in Dharma rather than as ego-driven acquisition. By giving up clinging to the fruits of action, the seeker reduces anxiety, self-centeredness, and karmic entanglement.",
    keyPrinciples: [
      "Action without attachment to results",
      "Duty performed in alignment with Dharma",
      "Offering work to the Divine or greater good",
      "Purification of ego through responsible engagement",
    ],
    roleInPhilosophy:
      "Karma Yoga is a central teaching of the Bhagavad Gita and one of the most important bridges between spiritual life and worldly responsibility. It makes liberation relevant to householders and active people rather than only renunciates.",
    practicalApplication:
      "Karma Yoga is practiced by doing one's work well, serving without self-obsession, accepting outcomes with equanimity, and refusing to make identity depend on praise, recognition, or success. It is especially relevant for modern professional and family life.",
    relatedConcepts: ["karma", "dharma", "yoga", "seva"],
    sourceTexts: ["Bhagavad Gita", "Vedantic commentaries"],
    tags: ["action", "duty", "yoga", "selfless-service"],
  },
  {
    slug: "raja-yoga",
    sanskritWord: "राज योग (Raja Yoga)",
    englishTranslation: "The Royal Path of Meditation",
    shortDefinition:
      "The disciplined path of mastering mind and consciousness through meditative and psychological training.",
    longDescription:
      "Raja Yoga is often called the royal path because it systematically addresses the inner architecture of consciousness. Commonly associated with Patanjali's Yoga Sutras, it emphasizes ethics, posture, breath, concentration, meditation, and absorption as an integrated route to stilling the mind and realizing the Self. It is less about belief and more about direct inner method.",
    keyPrinciples: [
      "Mastery of mind through systematic inner discipline",
      "Ethics and concentration as prerequisites for deep meditation",
      "Progression from outward control to inward absorption",
      "Direct experiential realization over speculation",
    ],
    roleInPhilosophy:
      "Raja Yoga is the contemplative core of the classical yoga tradition and often serves as the practical complement to philosophical systems such as Samkhya and Vedanta. It provides a tested methodology for transforming consciousness.",
    practicalApplication:
      "Raja Yoga becomes practical through daily meditation, breath regulation, ethical restraint, attention training, and disciplined inner observation. It is particularly valuable for seekers drawn to direct experience, psychological clarity, and steady contemplative depth.",
    relatedConcepts: ["yoga", "samadhi", "atman", "moksha"],
    sourceTexts: ["Yoga Sutras", "Bhagavad Gita", "Hatha Yoga literature"],
    tags: ["meditation", "mind", "yoga", "discipline"],
  },
  {
    slug: "purushartha",
    sanskritWord: "पुरुषार्थ (Purushartha)",
    englishTranslation: "Aims of Human Life",
    shortDefinition:
      "The four classical aims of human life: Dharma, Artha, Kama, and Moksha.",
    longDescription:
      "Purushartha is the Vedic framework for a complete human life. It recognizes that spirituality does not reject worldly life but seeks to order it properly. Dharma provides ethical alignment, Artha supports material stability, Kama acknowledges desire and enjoyment, and Moksha points beyond all limitation to liberation. This framework integrates human life rather than splitting it into sacred versus secular.",
    keyPrinciples: [
      "Human life has multiple legitimate aims",
      "Dharma must guide the pursuit of wealth and desire",
      "Moksha remains the highest liberating horizon",
      "Balance, order, and maturity define a wholesome life",
    ],
    roleInPhilosophy:
      "Purushartha is a foundational ethical and civilizational framework in Sanatan Dharma. It helps explain how worldly responsibility and spiritual aspiration can coexist without contradiction.",
    practicalApplication:
      "Practically, Purushartha helps modern seekers evaluate whether their life is balanced: Are actions ethical? Is livelihood stable? Are desires conscious rather than compulsive? Is there any movement toward inner freedom? It offers a powerful lens for life design.",
    relatedConcepts: ["dharma", "moksha", "karma-yoga", "bhakti"],
    sourceTexts: ["Dharmashastra literature", "Mahabharata", "Bhagavad Gita"],
    tags: ["life-purpose", "ethics", "framework", "foundational"],
  },
  {
    slug: "advaita",
    sanskritWord: "अद्वैत (Advaita)",
    englishTranslation: "Non-Duality / Not-Two",
    shortDefinition:
      "The philosophical view that ultimate reality is one without a second and that separation is only apparent.",
    longDescription:
      "Advaita means 'not two' and is most famously associated with Advaita Vedanta. It teaches that Brahman alone is ultimately real, while the world of multiplicity is conditionally experienced through Maya. The individual self is not truly separate from the absolute; liberation comes through realizing this non-dual truth directly rather than merely believing it intellectually.",
    keyPrinciples: [
      "Ultimate reality is one without a second",
      "Atman and Brahman are fundamentally non-different",
      "Multiplicity appears through ignorance and Maya",
      "Liberation is recognition of what already is",
    ],
    roleInPhilosophy:
      "Advaita is one of the most influential schools of Indian philosophy and a defining interpretive lens for the Upanishads, Bhagavad Gita, and Brahma Sutras. It shapes the language of non-dual realization, self-inquiry, and liberation across modern spirituality as well.",
    practicalApplication:
      "Practically, Advaita encourages inquiry into the witness of all experience, loosening identification with roles, thoughts, and body. It helps seekers respond to life with greater spaciousness because the underlying truth is not fragmentation but unity.",
    relatedConcepts: ["brahman", "atman", "maya", "jnana"],
    sourceTexts: ["Upanishads", "Brahma Sutras", "Vivekachudamani"],
    tags: ["non-dual", "vedanta", "philosophy", "realization"],
  },
  {
    slug: "ahamkara",
    sanskritWord: "अहंकार (Ahamkara)",
    englishTranslation: "Ego-Maker / Sense of I",
    shortDefinition:
      "The principle that constructs the egoic sense of individuality and identification.",
    longDescription:
      "Ahamkara literally means the 'I-maker'. It is the aspect of mind that appropriates experience and says 'I am this body', 'I am this role', or 'this is mine'. In itself it is a functional aspect of embodied life, but when mistaken for the true Self it becomes the core of bondage, defensiveness, pride, fear, and separation.",
    keyPrinciples: [
      "Builds personal identity around body, mind, and role",
      "Necessary for ordinary functioning but not ultimate identity",
      "Strengthens attachment, fear, and comparison when unchecked",
      "Must be understood and purified rather than merely hated",
    ],
    roleInPhilosophy:
      "Ahamkara is important in Samkhya, Yoga, and Vedanta because it explains how pure consciousness becomes entangled in individuality. It is often treated as a subtle but central obstacle on the spiritual path.",
    practicalApplication:
      "Watching Ahamkara in daily life means noticing defensiveness, self-image maintenance, and the need to control outcomes. This awareness makes humility, service, and self-inquiry more natural and reduces unnecessary suffering.",
    relatedConcepts: ["atman", "avidya", "karma", "vairagya"],
    sourceTexts: ["Bhagavad Gita", "Samkhya teachings", "Vedanta texts"],
    tags: ["ego", "identity", "mind", "bondage"],
  },
  {
    slug: "niskama-karma",
    sanskritWord: "निष्काम कर्म (Niskama Karma)",
    englishTranslation: "Desireless Action / Action Without Attachment",
    shortDefinition:
      "Acting fully and responsibly without attachment to personal gain or the fruits of action.",
    longDescription:
      "Niskama Karma is one of the most practical and transformative teachings of the Bhagavad Gita. It does not mean passive action or lack of care. Rather, it means giving oneself completely to right action while relinquishing egoic insistence on reward, control, and outcome. This transforms work from a source of bondage into a path of purification.",
    keyPrinciples: [
      "Act fully without clinging to results",
      "Duty matters more than egoic reward",
      "Reduces karmic entanglement and anxiety",
      "Turns ordinary work into spiritual discipline",
    ],
    roleInPhilosophy:
      "Niskama Karma is the operational heart of Karma Yoga. It bridges ethics, action, and liberation by showing how worldly responsibility can become a vehicle for inner freedom.",
    practicalApplication:
      "It is applied by focusing on process over praise, service over self-display, and integrity over guaranteed outcomes. Professionals, parents, creators, and leaders can all practice Niskama Karma by acting diligently without making identity depend on success or failure.",
    relatedConcepts: ["karma", "karma-yoga", "dharma", "seva"],
    sourceTexts: ["Bhagavad Gita", "Vedantic commentaries"],
    tags: ["action", "detachment", "gita", "practice"],
  },
  {
    slug: "pranayama",
    sanskritWord: "प्राणायाम (Pranayama)",
    englishTranslation: "Breath Regulation / Expansion of Vital Energy",
    shortDefinition:
      "The yogic discipline of regulating breath to steady mind, energy, and awareness.",
    longDescription:
      "Pranayama is far more than breathing exercise. It is the disciplined regulation, refinement, and expansion of pranic force through inhalation, exhalation, retention, and subtle awareness. Because breath and mind are intimately linked, Pranayama is a direct bridge between physical life and contemplative life.",
    keyPrinciples: [
      "Breath and mind influence one another directly",
      "Prana can be regulated through disciplined breath practice",
      "Supports concentration, steadiness, and subtle purification",
      "Functions as a bridge from posture to meditation",
    ],
    roleInPhilosophy:
      "Pranayama is a core limb of classical Yoga and appears in many yogic and tantric traditions as a crucial method for balancing the subtle body. It plays a foundational role in preparing the seeker for Dharana, Dhyana, and Samadhi.",
    practicalApplication:
      "Simple practices such as lengthened exhale, alternate nostril breathing, and breath awareness can reduce agitation, sharpen focus, and build emotional regulation. More advanced forms should be approached with guidance and gradual progression.",
    relatedConcepts: ["yoga", "raja-yoga", "samadhi", "karma-yoga"],
    sourceTexts: ["Yoga Sutras", "Hatha Yoga Pradipika", "Gheranda Samhita"],
    tags: ["breath", "energy", "yoga", "meditation"],
  },
  {
    slug: "rta",
    sanskritWord: "ऋत (Rta)",
    englishTranslation: "Cosmic Order / Sacred Rhythm",
    shortDefinition:
      "The primordial cosmic order that sustains truth, harmony, and right relation in the universe.",
    longDescription:
      "Rta is one of the oldest Vedic ideas and refers to the deep order by which the cosmos is sustained. It precedes and grounds later ethical concepts like Dharma. Rta is not merely law in a mechanical sense; it is the sacred rhythm, truth, and rightness woven into existence itself. To live against it is to create disorder; to live with it is to participate in harmony.",
    keyPrinciples: [
      "The universe is sustained by an underlying sacred order",
      "Truth and right action reflect alignment with Rta",
      "Dharma can be understood as lived participation in this order",
      "Human ethics are linked to cosmic harmony",
    ],
    roleInPhilosophy:
      "Rta is foundational in the Vedic worldview and helps explain how ethics, ritual, truth, nature, and spiritual order belong to a single integrated vision rather than separate categories.",
    practicalApplication:
      "Reflecting on Rta encourages alignment with truth, natural rhythm, responsibility, and reverence. It helps modern seekers see that spiritual life is not an isolated interior hobby but a matter of living in accord with reality itself.",
    relatedConcepts: ["dharma", "karma", "purushartha", "niskama-karma"],
    sourceTexts: ["Rig Veda", "Brahmanas", "early Vedic literature"],
    tags: ["vedic", "order", "cosmic-law", "foundational"],
  },
  {
    slug: "mantra",
    sanskritWord: "मन्त्र (Mantra)",
    englishTranslation: "Sacred Sound / Instrument of the Mind",
    shortDefinition:
      "A sacred sound, phrase, or syllable used to focus the mind, refine consciousness, and invoke a specific spiritual force or divine presence.",
    longDescription:
      "Mantra comes from roots that suggest both mind and instrument. In practice, a mantra is not just a meaningful sentence to repeat. It is a disciplined sound-form that carries psychological, devotional, and sometimes initiatory power. In Vedic and yogic traditions, mantras are used to gather a scattered mind, align inner energy, and tune the seeker toward a deeper layer of awareness than ordinary thought can reach.",
    keyPrinciples: [
      "A mantra works through repetition, attention, and inner receptivity",
      "Sound is treated as a carrier of consciousness, not merely information",
      "Different mantras support different aims such as clarity, devotion, protection, or awakening",
      "The value of mantra deepens with sincerity, steadiness, and correct relationship to practice",
    ],
    roleInPhilosophy:
      "Mantra occupies a central place across Vedic ritual, Tantra, Bhakti, and Yoga. It bridges language and transcendence by treating sound as a direct medium of transformation rather than only a vehicle for conceptual meaning.",
    practicalApplication:
      "A seeker may use mantra in daily japa, meditation, prayer, or breath-linked repetition. The practical effect is simple but profound: the mind gets a sacred object to return to, emotional turbulence softens, and ordinary attention begins to take on devotional or contemplative depth.",
    relatedConcepts: ["japa", "om", "bhakti", "dhyana"],
    sourceTexts: ["Mandukya Upanishad", "Rig Veda", "Bhagavad Gita"],
    tags: ["sound", "practice", "devotion", "meditation"],
  },
  {
    slug: "japa",
    sanskritWord: "जप (Japa)",
    englishTranslation: "Repetition of Sacred Sound",
    shortDefinition:
      "The repeated chanting or inward repetition of a mantra as a focused spiritual practice.",
    longDescription:
      "Japa is one of the most accessible and durable practices in the Hindu spiritual world. Rather than asking the seeker to master abstract philosophy at the beginning, it gives the mind a simple sacred rhythm: repeat, return, repeat again. This repetition gradually reduces distraction, purifies emotional habit, and builds a living relationship with the divine name or mantra being repeated.",
    keyPrinciples: [
      "Japa trains attention through repetition rather than force",
      "It can be practiced aloud, softly, or entirely mentally",
      "Consistency matters more than dramatic intensity",
      "Over time the mantra begins to shape mood, memory, and identity from within",
    ],
    roleInPhilosophy:
      "Japa is praised in Bhakti, Tantra, and Yoga as a practice that unites devotion and concentration. It is especially important because it works for householders and beginners as well as for advanced practitioners.",
    practicalApplication:
      "In daily life, japa can be done with a mala, during a morning sit, on a walk, or in silent pauses throughout the day. It is especially effective for seekers who struggle with restless thought, emotional noise, or the need for a simple daily anchor.",
    relatedConcepts: ["mantra", "bhakti", "sadhana", "dhyana"],
    sourceTexts: ["Bhagavad Gita", "Bhakti literature", "Mantra Shastra"],
    tags: ["practice", "chanting", "devotion", "daily-discipline"],
  },
  {
    slug: "dhyana",
    sanskritWord: "ध्यान (Dhyana)",
    englishTranslation: "Meditation / Sustained Contemplation",
    shortDefinition:
      "A state of continuous meditative flow in which attention rests steadily on its object without frequent interruption.",
    longDescription:
      "Dhyana is usually translated as meditation, but classical usage is more precise. It is not the first moment of trying to concentrate. It is what happens when attention becomes more continuous, less jerky, and less entangled in side-thoughts. In this sense, Dhyana is not merely relaxation. It is disciplined interior steadiness that allows deeper perception and eventually opens toward absorption and insight.",
    keyPrinciples: [
      "Dhyana follows concentration but is more continuous and effortless",
      "It stabilizes awareness by reducing fragmentation of attention",
      "Meditation is not escape but clearer contact with reality",
      "Sustained practice turns brief calm into a repeatable inner capacity",
    ],
    roleInPhilosophy:
      "Dhyana is central to the Yoga tradition and also essential across Vedantic, Buddhist, and tantric contemplative systems. It marks the maturation of inward practice from effortful focus to lived meditative continuity.",
    practicalApplication:
      "A practitioner develops Dhyana through posture, breath, mantra, and regular sitting. In ordinary life, its fruits show up as less reactivity, cleaner attention, deeper listening, and the ability to remain inwardly steady without going numb.",
    relatedConcepts: ["dharana", "samadhi", "mantra", "raja-yoga"],
    sourceTexts: ["Yoga Sutras", "Bhagavad Gita", "Upanishads"],
    tags: ["meditation", "attention", "yoga", "contemplation"],
  },
  {
    slug: "sadhana",
    sanskritWord: "साधना (Sadhana)",
    englishTranslation: "Spiritual Practice / Disciplined Path",
    shortDefinition:
      "The intentional, repeated spiritual discipline through which a seeker turns aspiration into lived transformation.",
    longDescription:
      "Sadhana is the difference between admiring spiritual ideas and actually letting them shape a life. It refers to the disciplined pattern of practice by which the seeker works on mind, heart, body, and conduct. A sadhana can include meditation, mantra, prayer, study, service, ritual, ethical restraint, and teacher-guided observances. What matters is not complexity but repeatability and sincerity.",
    keyPrinciples: [
      "Sadhana converts inspiration into structure",
      "Small daily discipline usually outruns occasional intensity",
      "A true practice shapes conduct, not only inner states",
      "The right sadhana fits temperament, stage of life, and spiritual aim",
    ],
    roleInPhilosophy:
      "Across Yoga, Bhakti, Vedanta, and Tantra, Sadhana is the operational side of spiritual life. Philosophy provides orientation; sadhana provides the means by which that orientation becomes real.",
    practicalApplication:
      "For most seekers, sadhana means choosing a manageable daily rhythm: perhaps morning mantra, short meditation, scripture reflection, and one act of conscious service. The practice becomes a container strong enough to hold growth even when motivation fluctuates.",
    relatedConcepts: ["japa", "tapas", "dhyana", "seva"],
    sourceTexts: ["Bhagavad Gita", "Yoga texts", "Tantric manuals"],
    tags: ["practice", "discipline", "path", "transformation"],
  },
  {
    slug: "om",
    sanskritWord: "ॐ (Om)",
    englishTranslation: "Primordial Sound / Sacred Syllable",
    shortDefinition:
      "The primordial sacred syllable that symbolizes total reality and serves as a sonic gateway to meditation and divine remembrance.",
    longDescription:
      "Om is treated in Hindu traditions as far more than an opening sound before prayer. It is a condensed symbol of the whole field of existence: waking, dreaming, deep sleep, and the silence beyond them. Because of that, Om functions both philosophically and practically. It is a teaching about reality, and it is a practice that can steady the mind, refine breath, and reorient awareness toward what is fundamental.",
    keyPrinciples: [
      "Om symbolizes totality rather than one isolated object or deity",
      "Its sound-form and silence are both significant",
      "It can be used as a mantra, meditative anchor, and philosophical symbol",
      "The value of Om lies in reverent attention, not mechanical chanting alone",
    ],
    roleInPhilosophy:
      "The Mandukya Upanishad makes Om one of the most philosophically dense symbols in the Hindu world, linking it directly with consciousness and Brahman. Yogic traditions also use it as a direct support for meditative inwardness.",
    practicalApplication:
      "A seeker may chant Om at the start of meditation, link it with exhalation, or contemplate its meaning as a way to shift from mental noise toward interior spaciousness. It is especially helpful when practice needs a simple, universal, and non-complex entry point.",
    relatedConcepts: ["mantra", "brahman", "dhyana", "ishvara"],
    sourceTexts: ["Mandukya Upanishad", "Yoga Sutras", "Upanishads"],
    tags: ["sound", "symbol", "meditation", "absolute"],
  },
  {
    slug: "guna",
    sanskritWord: "गुण (Guna)",
    englishTranslation: "Qualities of Nature / Constituent Forces",
    shortDefinition:
      "The three foundational qualities of material nature—Sattva, Rajas, and Tamas—that shape mind, behavior, and experience.",
    longDescription:
      "The doctrine of the Gunas gives Hindu philosophy one of its most practical psychological maps. Rather than treating every mood as personal destiny, it shows that experience is often a moving mixture of clarity, activity, and inertia. Sattva illumines, Rajas agitates, and Tamas obscures. Everything from food and habits to work style and spiritual practice can be understood through these shifting proportions.",
    keyPrinciples: [
      "Sattva brings clarity, harmony, and lightness",
      "Rajas drives movement, ambition, and restlessness",
      "Tamas creates heaviness, dullness, and resistance",
      "Spiritual growth often begins by observing these forces instead of identifying with them",
    ],
    roleInPhilosophy:
      "The Gunas are central in Samkhya and deeply integrated into the Bhagavad Gita's account of psychology, ethics, and spiritual evolution. They explain why the same world produces very different forms of action, motivation, and consciousness.",
    practicalApplication:
      "A practitioner uses the Guna framework to adjust food, sleep, study, work, company, and practice. The aim is not perfection but movement toward more Sattva—because a clearer inner instrument makes wisdom, devotion, and steadier action easier.",
    relatedConcepts: ["yoga", "karma", "maya", "tapas"],
    sourceTexts: ["Bhagavad Gita", "Samkhya teachings", "Ayurvedic literature"],
    tags: ["psychology", "nature", "ethics", "self-observation"],
  },
  {
    slug: "avatara",
    sanskritWord: "अवतार (Avatara)",
    englishTranslation: "Divine Descent / Incarnation",
    shortDefinition:
      "A manifestation of the Divine that descends into the world to restore order, protect Dharma, and guide beings toward truth.",
    longDescription:
      "Avatara literally suggests a descent. In Hindu thought, it refers to the Divine taking accessible form within history rather than remaining only transcendent. This is not merely a mythic device. It expresses a philosophical conviction that reality is not indifferent to disorder. When confusion, adharma, or imbalance becomes severe, the Divine can become visible, relational, and historically active.",
    keyPrinciples: [
      "An avatara appears in response to moral and spiritual imbalance",
      "The divine descent is compassionate, not accidental",
      "Avatara theology makes the transcendent personally accessible",
      "The form may be historical, symbolic, cosmic, or devotional depending on tradition",
    ],
    roleInPhilosophy:
      "The concept is especially important in Vaishnava traditions and in the Bhagavad Gita, where Krishna presents divine manifestation as a recurring response to the decline of Dharma. It links theology, ethics, and devotion in a single idea.",
    practicalApplication:
      "For practitioners, Avatara is not only a doctrine about past events. It shapes devotion, trust, and moral courage. If the Divine can enter history, then spiritual life is not abstract; guidance, grace, and intervention remain possible within ordinary human struggle.",
    relatedConcepts: ["dharma", "bhakti", "ishvara", "lila"],
    sourceTexts: ["Bhagavad Gita", "Puranas", "Vaishnava literature"],
    tags: ["theology", "devotion", "divine", "dharma"],
  },
  {
    slug: "tapas",
    sanskritWord: "तपस् (Tapas)",
    englishTranslation: "Austerity / Spiritual Heat / Discipline",
    shortDefinition:
      "The purifying heat generated by disciplined effort, restraint, and voluntary acceptance of constructive difficulty.",
    longDescription:
      "Tapas is often misunderstood as harsh self-denial. More accurately, it is the willingness to bear useful friction for the sake of inner refinement. The word carries the sense of heat, and that image matters: just as heat can purify metal, disciplined effort can burn through laziness, compulsion, indulgence, and inner softness that keeps practice shallow. Tapas is intensity governed by purpose, not punishment.",
    keyPrinciples: [
      "Tapas means chosen discipline, not self-harm",
      "Growth often requires friction that comfort alone cannot provide",
      "It strengthens will, steadiness, and ethical seriousness",
      "When balanced well, tapas clarifies rather than hardens the practitioner",
    ],
    roleInPhilosophy:
      "Tapas appears across Yoga, Vedic, and ascetic traditions as a force of purification and spiritual potency. In the Yoga Sutras it is one of the key personal observances that helps prepare the seeker for deeper realization.",
    practicalApplication:
      "Modern tapas may look like waking for practice when the mind resists, keeping speech truthful under pressure, reducing indulgent habits, or maintaining consistency when enthusiasm drops. Its test is simple: does the discipline make the person clearer, kinder, and stronger?",
    relatedConcepts: ["sadhana", "vairagya", "guna", "yoga"],
    sourceTexts: ["Yoga Sutras", "Bhagavad Gita", "Vedic literature"],
    tags: ["discipline", "practice", "purification", "willpower"],
  },
  {
    slug: "dharana",
    sanskritWord: "धारणा (Dharana)",
    englishTranslation: "Concentration / Mental Holding",
    shortDefinition:
      "The disciplined act of holding the mind steadily on one chosen object, point, or field of attention.",
    longDescription:
      "Dharana is often translated as concentration, but in the yogic context it means more than trying hard to focus. It is the deliberate binding of attention to a chosen locus so the mind stops leaking energy into distraction. If Dhyana is the unbroken flow of meditation, Dharana is the threshold practice that makes that flow possible. It trains the mind to remain where it is placed rather than running after every impulse, image, or memory.",
    keyPrinciples: [
      "Dharana gathers scattered attention into one intentional stream",
      "It is effortful at first because the ordinary mind has momentum toward distraction",
      "The object may be breath, mantra, image, chakra, or subtle inquiry",
      "Steady concentration becomes the basis for deeper meditation and inner absorption",
    ],
    roleInPhilosophy:
      "In classical Yoga, Dharana is the sixth limb of the eightfold path and marks the shift from outer preparation to serious inner practice. It shows that liberation is not merely a matter of belief, but of training consciousness to become stable, subtle, and available to truth.",
    practicalApplication:
      "A modern seeker practices Dharana by returning again and again to one object without drama: one mantra, one breath pattern, one visual point, one field of prayer. Over time this strengthens attention, reduces compulsive mental switching, and makes meditation less vague and more real.",
    relatedConcepts: ["dhyana", "samadhi", "mantra", "pranayama"],
    sourceTexts: ["Yoga Sutras", "Bhagavad Gita", "Tantric texts"],
    tags: ["concentration", "attention", "yoga", "meditation"],
  },
  {
    slug: "lila",
    sanskritWord: "लीला (Lila)",
    englishTranslation: "Divine Play / Cosmic Playfulness",
    shortDefinition:
      "The vision of creation and divine activity as a spontaneous play of consciousness rather than a mechanical act of necessity.",
    longDescription:
      "Lila is one of the most beautiful ideas in Hindu thought because it changes the emotional texture of metaphysics. Instead of imagining reality as a dead machine or a burdened moral system alone, Lila suggests that existence also has a dimension of play, expression, and creative freedom. In devotional traditions, the stories of Krishna and other divine manifestations are not just events to analyze. They are revelations of how the Divine delights in relationship, beauty, love, and participation.",
    keyPrinciples: [
      "Creation can be understood as expression, not only obligation or mechanism",
      "Divine play does not deny suffering, but reframes existence as more than suffering",
      "Lila invites devotion because it makes the Divine relational and living",
      "The seeker is not outside the play but already participating in it",
    ],
    roleInPhilosophy:
      "Lila is especially powerful in Bhakti and Vaishnava theology, but its influence reaches further. It softens purely abstract metaphysics and gives spiritual life aesthetic, relational, and existential warmth. The world may still involve Maya, karma, and struggle, yet Lila reminds the seeker that reality is not exhausted by problem-language alone.",
    practicalApplication:
      "Practically, Lila helps loosen the ego's grim seriousness. A seeker can still fulfill duty, endure suffering, and pursue liberation, but with less hardness and self-importance. The frame shifts from 'I must control everything' to 'I must participate sincerely in a reality larger, wiser, and more alive than my private plans.'",
    relatedConcepts: ["bhakti", "avatara", "maya", "ishvara"],
    sourceTexts: ["Bhagavata Purana", "Brahma Sutras", "Bhakti literature"],
    tags: ["divine-play", "devotion", "theology", "cosmos"],
  },
  ...conceptsBatch1,
  ...conceptsBatch2,
  ...conceptsBatch3,
];

export function getConceptBySlug(slug: string): Concept | undefined {
  return concepts.find((c) => c.slug === slug);
}

export function getAllConcepts(): Concept[] {
  return concepts;
}
