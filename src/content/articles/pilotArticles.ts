import { getArticleBySlug } from "@/data/articles";

export type RichTextPart =
    | string
    | { type: "strong"; text: string }
    | { type: "em"; text: string }
    | { type: "link"; text: string; href: string };

export type RichText = RichTextPart[];

export type ArticleBlock =
    | {
        type: "lead";
        content: RichText;
    }
    | {
        type: "paragraph";
        content: RichText;
    }
    | {
        type: "heading";
        level: 2 | 3;
        content: RichText;
    }
    | {
        type: "list";
        items: RichText[];
    }
    | {
        type: "quote";
        content: RichText;
        cite?: string;
    }
    | {
        type: "callout";
        tone?: "insight" | "practice" | "warning";
        title?: string;
        content: RichText;
    }
    | {
        type: "separator";
    };

export interface PilotArticleContent {
    slug: string;
    pillarLabel: string;
    pillarHref: string;
    blocks: ArticleBlock[];
}

export const pilotArticleContents: Record<string, PilotArticleContent> = {
    "what-is-vedanta": {
        slug: "what-is-vedanta",
        pillarLabel: "Ancient Wisdom",
        pillarHref: "/ancient-wisdom-philosophies",
        blocks: [
            {
                type: "lead",
                content: [
                    "There is a question that surfaces in every spiritually curious person at some point: ",
                    {
                        type: "em",
                        text: "Is there something real beneath all this noise — beneath the ambitions, the grief, the fleeting pleasures and fears that make up ordinary life?",
                    },
                    " Vedanta is the tradition that takes this question with absolute seriousness.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The word itself is a compound: ",
                    { type: "strong", text: "Veda" },
                    " (knowledge) + ",
                    { type: "strong", text: "Anta" },
                    " (end, conclusion). Vedanta is literally \"the culmination of knowledge\" — the philosophical crown of the vast Vedic tradition. It refers primarily to the ",
                    { type: "em", text: "Upanishads" },
                    ", the innermost teachings at the end of the Vedas, and to the school of thought that systematized and developed those insights over 2,000+ years.",
                ],
            },
            {
                type: "callout",
                tone: "insight",
                title: "In one line",
                content: [
                    "Vedanta asks a radical question: if your identity is deeper than body and mind, what happens to fear, suffering, and meaning?",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["What Problem Does Vedanta Solve?"],
            },
            {
                type: "paragraph",
                content: [
                    "Before grasping Vedanta's answers, you need to understand what problem it is addressing. The Vedantic diagnosis of the human condition is precise: we suffer because we are confused about who we are.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Specifically, we mistake the body-mind complex — the personality, the history, the accumulation of memories and desires — for our true self. This fundamental misidentification (called ",
                    { type: "strong", text: "Avidya" },
                    ", or ignorance) is the root of all fear, craving, and suffering. We protect the ego because we think it is us. We fear death because we identify with what will die.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Vedanta's response: ",
                    { type: "em", text: "What if you are not what you think you are?" },
                    " What if beneath the personality is something unchanging, undying, and completely free?",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Three Core Texts (Prasthanatrayi)"],
            },
            {
                type: "paragraph",
                content: [
                    "All three schools of Vedanta ground their arguments in three canonical texts:",
                ],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "The Upanishads" },
                        " — 108 philosophical dialogues between sages and students, many dating to 800–200 BCE. These are the primary source. The core teaching: \"Tat Tvam Asi\" — That Thou Art.",
                    ],
                    [
                        { type: "strong", text: "The Bhagavad Gita" },
                        " — 700 verses from the Mahabharata in which Krishna instructs Arjuna on the battlefield. A practical manual on how to live Vedanta.",
                    ],
                    [
                        { type: "strong", text: "The Brahma Sutras" },
                        " — 555 aphorisms by Badarayana, systematizing the Upanishadic teachings into a logical sequence. Every Vedanta teacher writes a commentary on these.",
                    ],
                ],
            },
            {
                type: "separator",
            },
            {
                type: "heading",
                level: 2,
                content: ["The Three Schools of Vedanta"],
            },
            {
                type: "paragraph",
                content: [
                    "Vedanta is not a single doctrine but a family of philosophical positions that share the same source texts but reach dramatically different conclusions about the relationship between the individual soul, the world, and ultimate reality.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["1. Advaita Vedanta — Non-Dualism (Adi Shankaracharya, 8th c.)"],
            },
            {
                type: "paragraph",
                content: [
                    "The most internationally known school. Its central claim: Brahman (infinite, pure consciousness) is the only reality. The individual soul (Atman) is not separate from Brahman — it appears separate the way waves appear separate from the ocean. Remove the wave's name and form, and there is only water. Remove your personality, and there is only consciousness.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The world's apparent multiplicity? That is ",
                    { type: "strong", text: "Maya" },
                    " — not \"illusion\" in the sense of nonexistence, but superimposition. We see the world the way a person in dim light sees a snake on what is actually a rope. Liberation in Advaita is the direct recognition: ",
                    { type: "em", text: "Aham Brahmasmi" },
                    " — I am Brahman.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["2. Dvaita Vedanta — Dualism (Madhvacharya, 13th c.)"],
            },
            {
                type: "paragraph",
                content: [
                    "Madhvacharya's counter-tradition. His position: God (Vishnu) and the individual soul are eternally distinct. They can never merge. Liberation is not the dissolution of the self into the Divine — it is the eternal joyful relationship between a devotee soul and a personal God. This view underpins much of Bhakti devotionalism.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["3. Vishishtadvaita — Qualified Non-Dualism (Ramanujacharya, 11th c.)"],
            },
            {
                type: "paragraph",
                content: [
                    "The middle position. Brahman is ultimately one — but this oneness is not simple. Souls and the material world are real, but they constitute Brahman's \"body.\" Like how cells are real within a body but inseparable from it. Liberation is eternal blissful relationship with God, where the soul retains its distinct identity.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Four Mahavakyas (Great Sayings)"],
            },
            {
                type: "paragraph",
                content: [
                    "The Upanishads are distilled in four declarations, one from each of the four Vedas:",
                ],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Prajnanam Brahma" },
                        " — \"Consciousness is Brahman\" (Aitareya Upanishad, Rig Veda)",
                    ],
                    [
                        { type: "strong", text: "Aham Brahmasmi" },
                        " — \"I am Brahman\" (Brihadaranyaka Upanishad, Yajur Veda)",
                    ],
                    [
                        { type: "strong", text: "Tat Tvam Asi" },
                        " — \"That Thou Art\" (Chandogya Upanishad, Sama Veda)",
                    ],
                    [
                        { type: "strong", text: "Ayam Atma Brahma" },
                        " — \"This Self is Brahman\" (Mandukya Upanishad, Atharva Veda)",
                    ],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "These are not merely philosophical propositions — they are contemplative seeds. A student is given a Mahavakya and asked to meditate on it until it is a living reality, not a mental concept.",
                ],
            },
            {
                type: "quote",
                content: [{ type: "em", text: "Tat Tvam Asi" }, " — That Thou Art."],
                cite: "Chandogya Upanishad",
            },
            {
                type: "heading",
                level: 2,
                content: ["The Practice: How Does One \"Do\" Vedanta?"],
            },
            {
                type: "paragraph",
                content: [
                    "Vedanta is not purely abstract philosophy. It prescribes specific preparation and practice. Adi Shankaracharya outlined four qualifications (Sadhana Chatustaya) for a Vedantic student:",
                ],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Viveka" },
                        " — Discrimination between the real (Brahman) and the unreal (everything temporary)",
                    ],
                    [
                        { type: "strong", text: "Vairagya" },
                        " — Dispassion toward temporary pleasures, here and hereafter",
                    ],
                    [
                        { type: "strong", text: "Shatsampat" },
                        " — Six virtues: mental calmness (Shama), sense control (Dama), withdrawal (Uparati), endurance (Titiksha), faith (Shraddha), and meditative concentration (Samadhana)",
                    ],
                    [
                        { type: "strong", text: "Mumukshutva" },
                        " — Burning desire for liberation",
                    ],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The primary practice is ",
                    { type: "strong", text: "Shravana" },
                    " (listening to scripture from a qualified teacher), ",
                    { type: "strong", text: "Manana" },
                    " (reflecting deeply until no doubts remain), and ",
                    { type: "strong", text: "Nididhyasana" },
                    " (meditation on the truth until it becomes direct experience).",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Vedanta in Modern Life"],
            },
            {
                type: "paragraph",
                content: [
                    "Swami Vivekananda's lectures at the Parliament of World Religions in 1893 introduced Vedanta to the West. His message: Vedanta is not the property of any religion — it is a universal science of consciousness. The Atman in you is the same as the Atman in the stranger you pass on the street. Prejudice, cruelty, and exploitation are philosophically unjustifiable once this is truly understood.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Practically, Vedanta offers a framework that reduces the existential anxiety of modern life. If your fundamental nature is not the body (which will die), not the career (which will end), not the relationships (which will change), then none of those can threaten what you really are. This is not escapism — it is the deepest source of equanimity.",
                ],
            },
        ],
    },
    "advaita-vedanta-explained": {
        slug: "advaita-vedanta-explained",
        pillarLabel: "Ancient Wisdom",
        pillarHref: "/ancient-wisdom-philosophies",
        blocks: [
            {
                type: "lead",
                content: [
                    "Imagine discovering that the boundary between yourself and everything else is not a wall — it is a thought. A deeply conditioned, thoroughly believed, entirely convincing thought. But a thought nonetheless. This is the central claim of Advaita Vedanta, and it changes everything.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The word ",
                    { type: "strong", text: "Advaita" },
                    " (Sanskrit: अद्वैत) means \"not-two.\" It is the philosophical and spiritual tradition systematized by Adi Shankaracharya in 8th-century India — and it remains the most internationally influential school of Indian philosophy. Figures from Ramana Maharshi to Swami Vivekananda to Alan Watts have drawn from its well.",
                ],
            },
            { type: "heading", level: 2, content: ["The Central Claim"] },
            {
                type: "paragraph",
                content: [
                    "Reality — what truly is — is singular. Not \"one thing among many things,\" but the very ground of being from which all apparent multiplicity arises. This ultimate reality, Advaita calls ",
                    { type: "strong", text: "Brahman" },
                    ": infinity, pure consciousness, the screen on which all experience appears.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Your innermost self — the witness at the core of every experience, the awareness that never changes even as thoughts, emotions, and sensations constantly change — is not separate from Brahman. This is what the Upanishad means when it says: ",
                    { type: "em", text: "Aham Brahmasmi" },
                    " — \"I am Brahman.\" Not the personality. Not the body. The pure awareness beneath.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "If this is true, then the separation you feel — the isolation, the existential loneliness, the sense of being a small vulnerable self in a vast indifferent universe — is based on a fundamental misidentification. You have confused the wave for the ocean.",
                ],
            },
            {
                type: "quote",
                content: [{ type: "em", text: "Aham Brahmasmi" }, " — I am Brahman."],
                cite: "Brihadaranyaka Upanishad",
            },
            {
                type: "heading",
                level: 2,
                content: ["Maya: What Advaita Actually Means by \"Illusion\""],
            },
            {
                type: "paragraph",
                content: [
                    "The word that trips up Western readers most is ",
                    { type: "strong", text: "Maya" },
                    ", usually translated as \"illusion.\" The immediate reaction: \"If the world is illusion, should I ignore suffering? Stop paying bills?\"",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This is a translation problem. Maya does not mean the world doesn't exist. It means the world is ",
                    { type: "em", text: "not what you think it is" },
                    ". The Advaita example: a rope in dim light appears to be a snake. The fear the snake causes is real. Your heartbeat is real. The snake is not. But the rope is completely real — you just misidentified it.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Applied to existence: the world is real (it is Brahman), but your interpretation of it — as fundamentally material, as composed of genuinely separate objects, as the ultimate reality — is the error. You are seeing Brahman and calling it \"mere matter.\"",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Maya has two powers: ",
                    { type: "strong", text: "Avarana Shakti" },
                    " (the power to conceal Brahman's true nature from us) and ",
                    { type: "strong", text: "Vikshepa Shakti" },
                    " (the power to project a false appearance onto Brahman). Liberation comes when Avarana is removed — when the concealment lifts and you see the rope for what it is.",
                ],
            },
            {
                type: "callout",
                tone: "warning",
                title: "Common pitfall",
                content: [
                    "Advaita does not teach indifference to life; it teaches clearer seeing within life. Confusing this leads to spiritual bypassing.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Shankaracharya: The Philosopher Who Shaped a Continent"],
            },
            {
                type: "paragraph",
                content: [
                    "Adi Shankaracharya (788–820 CE) is one of the most formidable intellectual figures in world history. Mastering the four Vedas by age 8. Taking sannyasa (renunciation) at 12. Traversing the entire Indian subcontinent on foot, debating scholars of every school. Establishing four monastic centers (Mathas) that continue to this day. Composing philosophical masterworks at an age when most scholars are still in training. He died at 32.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "His commentaries on the Upanishads, Bhagavad Gita, and Brahma Sutras remain definitive after 1,200 years. His independent texts — Vivekachudamani (The Crest Jewel of Discrimination), Upadeshasahasri, Atma Bodha — are still assigned in Sanskrit philosophy programs.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Shankaracharya's achievement was not the invention of Advaita — its roots are in the Upanishads themselves, which long predate him — but its systematization into a coherent philosophy that could withstand any logical challenge.",
                ],
            },
            { type: "heading", level: 2, content: ["The Two Levels of Reality"] },
            {
                type: "paragraph",
                content: [
                    "Advaita operates with two tiers of reality, which is why \"the world is illusion\" is a misreading:",
                ],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Paramarthika Satta" },
                        " (Absolute Reality) — Brahman alone. Non-dual, changeless, infinite. Only Brahman is ultimately real.",
                    ],
                    [
                        { type: "strong", text: "Vyavaharika Satta" },
                        " (Conventional Reality) — The world of everyday experience. Tables, trees, people, cause and effect. Real within its own domain, like a dream is real within the dream.",
                    ],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The Advaitic sage does not walk through walls or ignore human suffering. They function completely in the conventional realm — they eat, speak, relate, die. But they are not fooled by it into thinking it is the final word on reality.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Practice: Atma Vichara (Self-Inquiry)"],
            },
            {
                type: "paragraph",
                content: [
                    "Ramana Maharshi (1879–1950), the greatest modern exemplar of Advaita, gave a remarkably simple method: ",
                    { type: "strong", text: "Atma Vichara" },
                    ", or Self-Inquiry. Not years of complex ritual or physical austerity — just one question, held with total sincerity:",
                ],
            },
            {
                type: "paragraph",
                content: [{ type: "em", text: "Who am I?" }],
            },
            {
                type: "paragraph",
                content: [
                    "Not as a conceptual puzzle to be solved by the mind — but as a direct investigation. Every time a thought arises, ask: to whom does this thought arise? I am anxious. Who is this \"I\" that is anxious? Trace the sense of \"I\" back to its source. What you find — the tradition insists — is not a fixed self, but open, transparent awareness.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Shankaracharya's preparation for this inquiry requires four qualities: Viveka (discriminating between real and unreal), Vairagya (dispassion toward impermanent things), Shatsampat (six virtues including equanimity and faith), and Mumukshutva (intense longing for liberation).",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Three Common Misunderstandings About Advaita"],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Advaita is not nihilism." },
                        " It does not say nothing is real. It says the world is real, but not in the separate and absolute way we ordinarily imagine.",
                    ],
                    [
                        { type: "strong", text: "Advaita is not anti-devotion." },
                        " Many Advaitins use Bhakti, prayer, and mantra as essential preparation. Even Shankaracharya wrote deeply devotional hymns.",
                    ],
                    [
                        { type: "strong", text: "Advaita is not a slogan." },
                        " Saying “all is one” is easy. Removing the lived sense of separation through inquiry, discrimination, and practice is the actual work.",
                    ],
                ],
            },
            {
                type: "separator",
            },
            {
                type: "heading",
                level: 2,
                content: ["A Beginner's Reading Path for Advaita"],
            },
            {
                type: "paragraph",
                content: [
                    "If this teaching resonates, do not stop at a single article. Begin with ",
                    {
                        type: "link",
                        text: "What is Vedanta?",
                        href: "/what-is-vedanta",
                    },
                    " for the broader map, then read ",
                    {
                        type: "link",
                        text: "Non-Duality vs Dualism",
                        href: "/non-duality-vs-dualism",
                    },
                    " to understand the major alternatives, and study ",
                    {
                        type: "link",
                        text: "Adi Shankaracharya's life and legacy",
                        href: "/adi-shankaracharya-life-teachings",
                    },
                    " to see how Advaita became a durable intellectual and spiritual tradition. For a wider overview, the ",
                    {
                        type: "link",
                        text: "Ancient Wisdom & Philosophies hub",
                        href: "/ancient-wisdom-philosophies",
                    },
                    " connects this article to the larger ecosystem of Darshanas.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Why Advaita Speaks to the Western Mind"],
            },
            {
                type: "paragraph",
                content: [
                    "Modern physics points to a universe where solid objects, at the quantum level, are fields of probability. Neuroscience tells us the unified, stable self we experience is a construction. Cognitive science reveals that perception is an active interpretation, not a passive recording.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Advaita arrived at similar conclusions millennia earlier — through philosophical investigation and meditative direct experience rather than laboratory instruments. This convergence is why Schopenhauer studied the Upanishads with reverence, why physicists like Erwin Schrödinger wrote about Vedanta, and why those in contemplative practice often find Advaita the most precise map of their inner experience.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The practical benefit: when you understand that your fundamental nature is not under threat — that what you truly are cannot be damaged by failure, loss, or death — existential anxiety loses its grip. Not through denial, but through recognition.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Advaita vs Other Schools"],
            },
            {
                type: "paragraph",
                content: [
                    "Advaita is not the only Vedanta school. Madhvacharya's Dvaita (Dualism) argues that God and soul are eternally distinct — a position that inspires deep devotional Bhakti. Ramanujacharya's Vishishtadvaita holds that souls and world are real parts of Brahman's \"body,\" dissolving Advaita's critique of devotion.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "These are not mere academic disputes. Your natural temperament — philosophical-investigative vs. devotional-relational — will determine which school resonates. A Jnani arrives at liberation through the fire of inquiry. A Bhakta arrives through the ocean of surrendered love. The Gita says both paths arrive at the same summit.",
                ],
            },
        ],
    },
    "how-to-start-japa": {
        slug: "how-to-start-japa",
        pillarLabel: "Practical Practices",
        pillarHref: "/practical-spiritual-practices",
        blocks: [
            {
                type: "lead",
                content: [
                    { type: "strong", text: "Direct answer:" },
                    " start Japa with one simple mantra, one fixed daily time, and one round of 108 repetitions for 40 days before you optimize anything.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The mind is never still. Even when the body rests, the mind generates an unbroken stream of thoughts — plans, memories, worries, fragments of conversation. Most meditation instruction tells you to \"quiet the mind,\" which to a beginner feels like being told to stop the ocean.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Japa solves this problem elegantly. Instead of fighting the mind's tendency to cling to something, Japa gives it something sacred to cling to. You don't silence the mind by force — you redirect it like a river into a new channel. Over time, that channel becomes deep, clear, and naturally flowing.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The Bhagavad Gita's 10th chapter (verse 25) has Krishna say: ",
                    { type: "em", text: '"Among sacrifices, I am Japa."' },
                    " Among all spiritual offerings, the repetition of the Divine name holds the highest place. This is not metaphor — it is the experiential finding of centuries of practitioners.",
                ],
            },
            {
                type: "quote",
                content: ["\"Among sacrifices, I am Japa.\""],
                cite: "Bhagavad Gita 10.25",
            },
            {
                type: "heading",
                level: 2,
                content: ["Best for / Not best for / Where to start"],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Best for:" },
                        " beginners with restless or noisy minds who need a concrete anchor for attention.",
                    ],
                    [
                        { type: "strong", text: "Not best for:" },
                        " seekers expecting instant silence without repetition, discipline, or consistency.",
                    ],
                    [
                        { type: "strong", text: "Where to start:" },
                        " choose one universal mantra (like Om or So'ham), do one mala round daily, and review results after 40 days.",
                    ],
                ],
            },
            { type: "heading", level: 2, content: ["What is Japa?"] },
            {
                type: "paragraph",
                content: [
                    { type: "strong", text: "Japa" },
                    " (Sanskrit: जप) comes from the root ",
                    { type: "em", text: "jap" },
                    ", meaning \"to utter in a low voice\" or \"to mutter.\" It is the practice of repeating a mantra — a sacred syllable, name, or phrase — with full attention, either audibly, as a whisper, or silently in the mind.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Japa is not mere repetition in the mechanical sense. Done correctly, each repetition is an act of attention — a return of the mind to the sacred. When the mind wanders (and it will), you notice, and return. This act of noticing-and-returning is itself the practice. Over thousands of repetitions, the mind develops a natural orientation toward the mantra, then toward the silence beneath the mantra.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Four Forms of Japa"],
            },
            {
                type: "paragraph",
                content: ["Traditional texts describe four types, from gross to subtle:"],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Vaikhari Japa" },
                        " — Audible chanting, lips moving, mantra fully vocalized. Best for beginners — the sound anchors the mind through multiple senses.",
                    ],
                    [
                        { type: "strong", text: "Upanshu Japa" },
                        " — Whispered, only the practitioner can hear it. More subtle than Vaikhari; recommended once audible chanting is established.",
                    ],
                    [
                        { type: "strong", text: "Manasika Japa" },
                        " — Purely mental repetition. No movement of lips. Considered the most powerful form, as it requires and develops the deepest concentration.",
                    ],
                    [
                        { type: "strong", text: "Likhita Japa" },
                        " — Writing the mantra. Highly recommended for beginners as it engages the hands and eyes alongside the mind, reducing distraction.",
                    ],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The tradition is clear: Manasika Japa is 1,000 times more effective than audible chanting — but only if you have the concentration to sustain it. Start with Vaikhari. Graduate as your practice deepens.",
                ],
            },
            {
                type: "callout",
                tone: "practice",
                title: "40-day baseline",
                content: [
                    "Pick one mantra and one daily time for 40 days. Avoid switching mantras mid-cycle unless guided by a qualified teacher.",
                ],
            },
            { type: "heading", level: 2, content: ["Choosing Your Mantra"] },
            {
                type: "paragraph",
                content: [
                    "The mantra is the vehicle, and not all vehicles suit all temperament. General guidance:",
                ],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Devotees of Shiva:" },
                        " Om Namah Shivaya (the Panchakshara mantra — five syllables that represent the five elements)",
                    ],
                    [
                        { type: "strong", text: "Devotees of Vishnu/Krishna:" },
                        " Om Namo Narayanaya, or the Hare Krishna Mahamantra",
                    ],
                    [
                        { type: "strong", text: "Universal (Jnana path):" },
                        " So'ham (I am That), Aham Brahmasmi, or the simple Pranava Om",
                    ],
                    [
                        { type: "strong", text: "Gayatri Mantra:" },
                        " The foundational Vedic mantra for all seekers of light and wisdom",
                    ],
                    [
                        { type: "strong", text: "Mahamrityunjaya:" },
                        " For healing, protection, and transcendence of fear",
                    ],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Ideally, receive a mantra from a qualified teacher (Diksha, or initiation). The initiated mantra carries the energetic imprint of the lineage. But if no teacher is available, begin with Om or So'ham — these are universal and require no special initiation.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Japa Mala: How to Use a Rosary"],
            },
            {
                type: "paragraph",
                content: [
                    "A ",
                    { type: "strong", text: "Japa Mala" },
                    " (rosary) has 108 beads plus one larger \"Meru\" bead (the anchor). Hold the Mala in the right hand. Starting from the bead next to the Meru, use the thumb to move each bead toward you as you repeat one mantra per bead. When you reach the Meru again, do not cross it — reverse direction for the next round.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    { type: "strong", text: "Why 108?" },
                    " Numerous explanations exist: 108 Upanishads, 108 sacred sites in India, the ratio of the Sun's distance to its diameter, 1 (unity) × 0 (void) × 8 (infinity). The number itself has been consecrated by millennia of use.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Traditional materials for Mala: Rudraksha (for Shiva devotees), Tulsi wood (for Vaishnava devotees), crystal or sandalwood (for all purposes). Do not wear a Japa Mala used in practice as jewelry — keep it clean and set apart from ordinary use.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["When and How Long to Practice"],
            },
            {
                type: "paragraph",
                content: [
                    { type: "strong", text: "Brahma Muhurta" },
                    " — the 96 minutes before sunrise — is the traditionally recommended time. The mind is naturally quiet before the day's activity has begun. Sattvic (pure, balanced) energy is at its peak.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "If Brahma Muhurta isn't possible, choose any fixed time each day. Consistency of time matters more than the hour itself. The mind begins to prepare itself for practice when the time approaches — like salivating before a meal.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Duration: begin with one round of 108 repetitions (approximately 10–15 minutes for audible Japa). Build to three rounds. The classic prescription for establishing a practice is 40 consecutive days without a break.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Creating Your Practice Space"],
            },
            {
                type: "paragraph",
                content: [
                    "A dedicated space for Japa changes the quality dramatically. Even a small corner with a clean mat, a candle, and an image of your chosen deity creates a field of Sattva that supports practice. The body recognizes the space and begins to settle before you even sit down.",
                ],
            },
            {
                type: "list",
                items: [
                    ["Face East or North during practice (traditional orientations for morning worship)"],
                    [
                        "Sit with spine erect — not rigid, but alert. Slouching invites dullness.",
                    ],
                    [
                        "Close the eyes or keep them at half-mast, gaze cast slightly downward",
                    ],
                    ["Keep the Mala at heart level, not swinging freely"],
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["What to Expect: The Stages of Japa"],
            },
            {
                type: "paragraph",
                content: [
                    "Week 1–2: The mind wanders constantly. This is normal. The practice is noticing and returning.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Week 3–6: Attention improves. There are periods of genuine absorption. The mantra begins to arise spontaneously during daily activity.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Month 2–3: The mantra becomes a background hum — a constant companion. Mental noise decreases. A quality of inner quiet enters daily life between practice sessions.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Over time: The mantra transitions from effort to effortlessness. You don't chant the mantra — the mantra chants itself. At this point, Japa is transitioning into Dhyana (meditation) organically.",
                ],
            },
            {
                type: "separator",
            },
        ],
    },
    "daily-spiritual-routine-beginners": {
        slug: "daily-spiritual-routine-beginners",
        pillarLabel: "Practical Practices",
        pillarHref: "/practical-spiritual-practices",
        blocks: [
            {
                type: "lead",
                content: [
                    { type: "strong", text: "Direct answer:" },
                    " the best beginner spiritual routine is a short, repeatable daily sequence (breath + mantra + silence) you can sustain for at least 30–40 days.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Most people encounter spirituality as an event — a retreat, a powerful book, a meaningful conversation — and then return to daily life unchanged. The reason is not lack of sincerity. It is lack of structure. Insight without practice fades within days.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The Sanskrit word for daily spiritual practice is ",
                    { type: "strong", text: "Sadhana" },
                    " — from the root ",
                    { type: "em", text: "sadh" },
                    ", \"to accomplish, to reach the goal.\" A Sadhana is not a routine in the flat sense of brushing teeth. It is a daily act of orientation — a deliberate turning of the mind toward what is real, luminous, and permanent, before the day's noise takes over.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This guide gives you a practical Sadhana framework drawn from the Vedic tradition, adapted for modern practitioners — even those with busy schedules and no background in formal practice.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Best for / Not best for / Where to start"],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Best for:" },
                        " beginners who need a practical daily structure instead of occasional motivational spikes.",
                    ],
                    [
                        { type: "strong", text: "Not best for:" },
                        " people trying to stack too many rituals before building consistency with one stable rhythm.",
                    ],
                    [
                        { type: "strong", text: "Where to start:" },
                        " a 20-minute morning routine: 3 minutes breath, 10 minutes Japa, 5 minutes silence, 2 minutes intention-setting.",
                    ],
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Principle: Why Daily Practice?"],
            },
            {
                type: "paragraph",
                content: [
                    "The Yoga Sutras of Patanjali define practice as \"the effort to remain in a state of stillness\" — and immediately add that this practice acquires firm ground only when it is done ",
                    { type: "em", text: "continuously for a long time, without interruption, with devotion" },
                    " (YS 1.14).",
                ],
            },
            {
                type: "quote",
                content: ["Practice becomes firmly grounded when done for a long time, without interruption, and with devotion."],
                cite: "Yoga Sutras 1.14",
            },
            {
                type: "paragraph",
                content: [
                    "The operative words are \"continuously\" and \"without interruption.\" Sporadic bursts of spiritual enthusiasm don't build the neural (and subtler) pathways that daily, consistent practice does. Think of it like water on stone — one massive downpour leaves puddles; daily gentle flow cuts channels through rock.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Brahma Muhurta: The Sacred Hour"],
            },
            {
                type: "paragraph",
                content: [
                    "Traditional Sadhana begins in ",
                    { type: "strong", text: "Brahma Muhurta" },
                    " — the \"hour of Brahma,\" approximately 96 minutes before local sunrise.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Why this time? The mind emerges from deep sleep without yet having accumulated the day's agitation. Sattva (the quality of clarity and purity) is at its peak in both the environment and the mind. Distractions — family, notifications, work demands — have not yet arisen.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The tradition holds that practices done in Brahma Muhurta are four times as effective as those done at other times. Whether or not you accept the metaphysical claim, the experiential reality is consistent: early morning practice is qualitatively different. Try it for a week and compare with an evening practice.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Core Framework: Morning Sadhana"],
            },
            {
                type: "heading",
                level: 3,
                content: ["Step 1: Awakening with Intention (5 minutes)"],
            },
            {
                type: "paragraph",
                content: [
                    "Before picking up your phone or speaking, lie still for 2-3 minutes after waking. Traditional practice: bring the palms together and recite the morning prayer (",
                    { type: "em", text: "Kara Darshanam" },
                    " — viewing the hands): ",
                    {
                        type: "em",
                        text: '"In the front of the hand is Lakshmi, in the middle is Saraswati, at the base is Govinda. In the morning, I look at my hands."',
                    },
                    " Then place the feet on the floor with the right foot first, acknowledging the earth.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["Step 2: Physical Purification (10-15 minutes)"],
            },
            {
                type: "paragraph",
                content: [
                    "Brush teeth, bathe or wash face and hands, and if possible wear clean, loose clothing dedicated to practice. Physical cleanliness is not merely hygienic — it shifts the internal state. The Sanskrit term is ",
                    { type: "strong", text: "Shaucha" },
                    " (purity) — the first of Patanjali's Niyamas (personal observances).",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["Step 3: Pranayama — Breathwork (10-15 minutes)"],
            },
            {
                type: "paragraph",
                content: [
                    "Before mantra or meditation, pranayama prepares the system. The breath (Prana) directly controls the mind (Chitta). Simple practices for beginners:",
                ],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Nadi Shodhana" },
                        " (Alternate Nostril Breathing): 10 rounds. Balances the hemispheres, calms the nervous system.",
                    ],
                    [
                        { type: "strong", text: "Brahmari" },
                        " (Humming Bee Breath): 5-10 rounds. Directly activates the vagus nerve and parasympathetic state.",
                    ],
                    [
                        { type: "strong", text: "Ujjayi" },
                        " (Ocean Breath): 20 breaths. Generates inner heat and concentration.",
                    ],
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["Step 4: Japa — Mantra Repetition (20-30 minutes)"],
            },
            {
                type: "paragraph",
                content: [
                    "The heart of the practice. Choose one mantra and sit with a Japa Mala. One full round = 108 repetitions. Begin with audible chanting, graduate to whisper, then to mental repetition as concentration deepens.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Recommended mantras: Om Namah Shivaya, Gayatri Mantra, So'ham, or a mantra received from a teacher. Consistency of mantra matters far more than variety.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["Step 5: Meditation (10-20 minutes)"],
            },
            {
                type: "paragraph",
                content: [
                    "After Japa, simply sit in silence. Do not introduce another technique — just observe what arises. The Japa creates a groove; meditation allows you to settle into it. When thoughts arise, you can gently return to the mantra as an anchor, or simply rest in open awareness.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["Step 6: Svadhyaya — Study (10-15 minutes)"],
            },
            {
                type: "paragraph",
                content: [
                    "Read one or two pages of a primary text: Bhagavad Gita, Yoga Sutras, Upanishads, Vivekachudamani. Slow, contemplative reading — not information acquisition, but assimilation. Re-read the same passage multiple times until it opens up.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The Minimal Version: For Busy Lives"],
            },
            {
                type: "paragraph",
                content: ["If the full framework isn't yet possible, the irreducible minimum is:"],
            },
            {
                type: "list",
                items: [
                    ["Wake up 30 minutes earlier than normal"],
                    ["3 minutes of slow diaphragmatic breathing"],
                    [
                        "One round of Japa (108 repetitions) — approximately 10-12 minutes",
                    ],
                    ["5 minutes of sitting in silence"],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This 20-minute practice, done consistently every day, will produce measurable transformation within 40 days. Do not underestimate consistency over intensity.",
                ],
            },
            {
                type: "callout",
                tone: "practice",
                title: "Consistency beats complexity",
                content: [
                    "If your routine breaks repeatedly, reduce duration before reducing frequency. Daily continuity is the primary lever.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Two Realistic Daily Templates"],
            },
            {
                type: "heading",
                level: 3,
                content: ["The 20-Minute Beginner Routine"],
            },
            {
                type: "list",
                items: [
                    ["2 minutes: sit, breathe, and settle"],
                    ["10 minutes: one round of Japa or guided mantra repetition"],
                    ["5 minutes: silent sitting after the mantra"],
                    ["3 minutes: set the intention for the day"],
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["The 60-Minute Deepening Routine"],
            },
            {
                type: "list",
                items: [
                    ["10 minutes: purification and preparation"],
                    ["10 minutes: pranayama"],
                    ["20 minutes: Japa"],
                    ["15 minutes: meditation"],
                    ["5 minutes: scripture reading or journaling"],
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Three Mistakes That Break Sadhana"],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Changing techniques too often." },
                        " Depth comes from repetition, not constant novelty.",
                    ],
                    [
                        { type: "strong", text: "Making the routine too ambitious." },
                        " A perfect plan that lasts three days is weaker than a modest plan sustained for months.",
                    ],
                    [
                        { type: "strong", text: "Waiting for the ideal mood." },
                        " Real Sadhana is what you do even when inspiration is low and life is noisy.",
                    ],
                ],
            },
            { type: "heading", level: 2, content: ["The Evening Practice"] },
            {
                type: "paragraph",
                content: [
                    "Traditional Indian life includes ",
                    { type: "strong", text: "Sandhyavandanam" },
                    " at sunset — a twilight practice acknowledging the transition between day and night. A modern equivalent:",
                ],
            },
            {
                type: "list",
                items: [
                    ["Light a lamp or candle at sunset"],
                    ["5 minutes of Japa"],
                    [
                        "Brief review of the day: where was I aligned with my values? where was I not?",
                    ],
                    ["One page of scripture before sleep"],
                ],
            },
            {
                type: "separator",
            },
            { type: "heading", level: 2, content: ["The 40-Day Commitment"] },
            {
                type: "paragraph",
                content: [
                    "The tradition consistently prescribes 40 consecutive days as the minimum period to establish a Sadhana. This comes from both Yogic and Vedic traditions, and modern habit research supports it — neural pathways require sustained repetition to become defaults.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "If you miss a day: do not restart the count in shame. Simply return the next day. If you miss more than a week, restart. The path is not a performance — it is a relationship with yourself.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "If you need support building the routine, start with ",
                    {
                        type: "link",
                        text: "How to Start Japa Meditation",
                        href: "/how-to-start-japa",
                    },
                    ", refine your sound practice with ",
                    {
                        type: "link",
                        text: "How to Choose a Mantra",
                        href: "/how-to-choose-a-mantra",
                    },
                    ", and use ",
                    {
                        type: "link",
                        text: "Starting Spiritual Practice",
                        href: "/starting-spiritual-practice",
                    },
                    " or the ",
                    {
                        type: "link",
                        text: "Practical Spiritual Practices hub",
                        href: "/practical-spiritual-practices",
                    },
                    " for the bigger context.",
                ],
            },
        ],
    },
};

export const ampPilotSlugs = Object.keys(pilotArticleContents);

export function getPilotArticleContent(slug: string) {
    return pilotArticleContents[slug];
}

export function getPilotArticleWithMeta(slug: string) {
    const content = getPilotArticleContent(slug);
    const meta = getArticleBySlug(slug);

    if (!content || !meta) {
        return null;
    }

    return { meta, content };
}