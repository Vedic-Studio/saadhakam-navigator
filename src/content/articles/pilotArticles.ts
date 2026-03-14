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
    "bhagavad-gita-complete-guide": {
        slug: "bhagavad-gita-complete-guide",
        pillarLabel: "Sacred Texts",
        pillarHref: "/sacred-texts-teachings",
        blocks: [
            {
                type: "lead",
                content: [
                    "Many modern introductions make the Bhagavad Gita sound like a vague self-help manual or a simple defense of warfare. Both readings miss the text. The Gita begins in moral collapse because its real subject is not violence. It is the crisis of action when every available choice carries suffering.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The Bhagavad Gita appears in the Bhishma Parva of the ",
                    { type: "em", text: "Mahabharata" },
                    ". Its 700 verses are a dialogue between Arjuna and Krishna on the field of Kurukshetra. The setting is historical and epic. The power of the text is philosophical and existential. Arjuna's paralysis becomes the doorway through which Krishna teaches dharma, yoga, self-knowledge, devotion, renunciation, and liberation.",
                ],
            },
            {
                type: "callout",
                tone: "insight",
                title: "The simplest way to frame it",
                content: [
                    "The Bhagavad Gita teaches how to act without inner fragmentation. It does not tell you to escape the world. It tells you how to move through duty, conflict, and uncertainty without being owned by them.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["What the Gita is, and what it is not"],
            },
            {
                type: "paragraph",
                content: [
                    "The Gita is not a standalone scripture floating without context. It is part of the Mahabharata, one of India's two great ",
                    { type: "em", text: "Itihasa" },
                    " texts. That matters because Krishna's teaching is delivered inside a lived crisis, not in a monastery or abstract classroom. The seeker is not removed from history. He is inside it.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "It is also not a single-path manual. Readers who reduce it to only Jnana, only Bhakti, or only Karma Yoga flatten a deliberately synthetic text. In Chapter 3 Krishna insists on action. In Chapter 6 he outlines meditation. In Chapter 12 he praises devotion. In Chapter 18 he integrates them into a mature spiritual psychology.",
                ],
            },
            {
                type: "quote",
                content: ["You have a right to action alone, not to its fruits."],
                cite: "Bhagavad Gita 2.47",
            },
            {
                type: "heading",
                level: 2,
                content: ["Why Chapter 1 matters more than beginners expect"],
            },
            {
                type: "paragraph",
                content: [
                    "Western readers often rush past Arjuna's collapse to get to the famous verses. That is a mistake. Chapter 1 is not filler. It names the condition that makes spiritual instruction necessary. Arjuna sees teachers, cousins, elders, and friends on both sides of the war. His body shakes. His bow slips. His moral vocabulary stops working.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This is why the first chapter is called ",
                    { type: "strong", text: "Arjuna Vishada Yoga" },
                    ". Vishada means grief, despondency, collapse. The tradition does not hide this state. It calls it yoga because honest breakdown can become the threshold of right seeing. False certainty has to crack before living instruction lands.",
                ],
            },
            {
                type: "callout",
                tone: "practice",
                title: "Read Chapter 1 as diagnosis",
                content: [
                    "If you have ever known what the right principle is but still felt unable to act, you already understand why Arjuna matters. The Gita begins where moral slogans fail.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The structure of the 18 chapters"],
            },
            {
                type: "paragraph",
                content: [
                    "A useful beginner map divides the Gita into three movements. First, Krishna reframes the Self and duty. Then he deepens the disciplines of action, knowledge, and meditation. Finally, he reveals the devotional and theological culmination of the teaching.",
                ],
            },
            {
                type: "list",
                items: [
                    [
                        { type: "strong", text: "Chapters 1–6" },
                        " establish the crisis, the immortality of the Self, Karma Yoga, renunciation, and meditation.",
                    ],
                    [
                        { type: "strong", text: "Chapters 7–12" },
                        " expand Krishna's nature, the reality of devotion, and the cosmic vision of the Divine.",
                    ],
                    [
                        { type: "strong", text: "Chapters 13–18" },
                        " analyze matter, consciousness, the gunas, faith, duty, and final surrender.",
                    ],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "That three-part framing is not absolute, but it helps beginners avoid random verse-picking. The text has its own architecture. If you ignore that architecture, you read the Gita as a quote bank rather than a progressive teaching.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The four teachings most readers need first"],
            },
            {
                type: "heading",
                level: 3,
                content: ["1. The Self is not reducible to the body"],
            },
            {
                type: "paragraph",
                content: [
                    "Krishna's earliest instruction in Chapter 2 is ontological before it is ethical. The Self is unborn, undying, and not destroyed when the body is destroyed. This is not motivational language. It is the metaphysical basis for courage. If identity is wrongly placed, action becomes fear-driven.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["2. Duty must be performed without egoic ownership"],
            },
            {
                type: "paragraph",
                content: [
                    "Karma Yoga does not mean emotional numbness or productivity worship. It means right action without psychological bondage to outcome. Krishna does not tell Arjuna to stop caring. He tells him to stop deriving identity from success, failure, praise, or blame.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["3. Knowledge without discipline collapses"],
            },
            {
                type: "paragraph",
                content: [
                    "The Gita repeatedly warns that the senses can overrun the intellect. This is why meditation, dietary moderation, conduct, and disciplined attention matter. Chapter 6 is clear that yoga is not possible for one who lives in extremes.",
                ],
            },
            {
                type: "heading",
                level: 3,
                content: ["4. Devotion is not anti-intellectual"],
            },
            {
                type: "paragraph",
                content: [
                    "Modern readers often split devotion and knowledge into opposing camps. The Gita does not. Its Bhakti is not sentimental excess. It is a reorientation of the whole person toward the Divine source. The mature reader sees that devotion can stabilize what dry philosophy cannot.",
                ],
            },
            {
                type: "quote",
                content: ["Fix your mind on Me, be devoted to Me, sacrifice to Me, bow to Me."],
                cite: "Bhagavad Gita 18.65",
            },
            {
                type: "heading",
                level: 2,
                content: ["A chapter map for first-time readers"],
            },
            {
                type: "paragraph",
                content: [
                    "If you do not want to read 18 chapters in a single pass, start strategically. Read ",
                    { type: "link", text: "Bhagavad Gita Chapter 1", href: "/bhagavad-gita-chapter-1" },
                    " to feel the crisis, then move to Chapter 2 for the central philosophy, Chapter 3 for Karma Yoga, Chapter 12 for Bhakti, and Chapter 18 for Krishna's synthesis. That path gives you the spine of the text before you return to the rest.",
                ],
            },
            {
                type: "callout",
                tone: "warning",
                title: "Do not start by collecting famous verses",
                content: [
                    "Popular excerpts can inspire you, but they can also distort the teaching when removed from argument, speaker, and chapter context. Read verse clusters, not isolated slogans.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["How the Gita relates to the Upanishads and Vedanta"],
            },
            {
                type: "paragraph",
                content: [
                    "The Gita is often called the practical expression of Upanishadic truth. The Upanishads ask what the Self is. The Gita asks how one lives after hearing that teaching while still embedded in family, polity, responsibility, and action. For this reason it became one of the three canonical Vedanta sources, alongside the Upanishads and Brahma Sutras.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Shankara, Ramanuja, and Madhva all wrote commentaries on the Gita because the text supports multiple theological emphases while still retaining its authority. If you want the larger philosophical map, read ",
                    { type: "link", text: "What is Vedanta?", href: "/what-is-vedanta" },
                    ". If you want help choosing an edition, use ",
                    { type: "link", text: "Best Bhagavad Gita Translation for Beginners", href: "/best-bhagavad-gita-translation-for-beginners" },
                    ".",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Primary-source anchors every beginner should know"],
            },
            {
                type: "list",
                items: [
                    ["2.13 for the changing body and continuing Self"],
                    ["2.47 for action without attachment to fruits"],
                    ["3.19 for selfless action"],
                    ["6.16–17 for moderation in yoga"],
                    ["11 for the universal form revelation"],
                    ["12 for the devotional path"],
                    ["18.66 for surrender as culmination"],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "These verses are not the whole Gita. They are reliable anchor points for orientation. Study them with a commentary, not just in meme form.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["What the Gita corrects in modern life"],
            },
            {
                type: "paragraph",
                content: [
                    "Modern ambition teaches that identity is built from outcomes. The Gita says that is precisely why action becomes bondage. Modern avoidance teaches that if life is complex, one should retreat from responsibility. The Gita rejects that too. Krishna does not reward paralysis simply because it is emotionally sincere.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Its correction is demanding: know the Self, purify motive, act according to dharma, and surrender outcome. That is harder than hustle culture and more honest than passive spirituality. It is also why the Gita has lasted.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "For deeper comparison work, continue into ",
                    { type: "link", text: "Bhagavad Gita vs Bible", href: "/bhagavad-gita-vs-bible" },
                    " or the wider ",
                    { type: "link", text: "Sacred Texts hub", href: "/sacred-texts-teachings" },
                    ". To connect reading with practice, pair this guide with ",
                    { type: "link", text: "Daily Spiritual Routine for Beginners", href: "/daily-spiritual-routine-beginners" },
                    ".",
                ],
            },
        ],
    },
    "spiritual-paths-explained": {
        slug: "spiritual-paths-explained",
        pillarLabel: "Spiritual Traditions",
        pillarHref: "/spiritual-traditions-paths",
        blocks: [
            {
                type: "lead",
                content: [
                    "One of the biggest beginner mistakes is assuming there is a single correct spiritual personality. There is not. Traditions become confusing when every seeker is handed the same vocabulary, the same practices, and the same promises regardless of temperament.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Sanatan Dharma has always worked with plurality. The Bhagavad Gita, the Upanishadic tradition, and later sampradayas recognize that seekers differ in mental style, emotional orientation, life-stage, and readiness. That is why some are pulled toward inquiry, others toward devotion, others toward disciplined method, and others toward ritual participation.",
                ],
            },
            {
                type: "callout",
                tone: "insight",
                title: "The fast answer",
                content: [
                    "A path is not just a belief system. It is the kind of practice that can keep you sincere over time. The right path makes steadiness more likely, not theatrics more impressive.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Why the 'best path' question is usually framed badly"],
            },
            {
                type: "paragraph",
                content: [
                    "People often ask which path is highest. That sounds spiritual, but it usually hides a status question. The real issue is not abstract hierarchy. The real issue is which form of practice reduces self-deception and increases continuity. A path you cannot sustain is not higher for you. It is simply more flattering to your imagination.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The Gita itself resists simplification here. Krishna teaches Jnana, Karma, Dhyana, and Bhakti. The point is not that all differences vanish. The point is that the spiritual life matures through integration, even if one emphasis becomes primary for a given seeker.",
                ],
            },
            {
                type: "quote",
                content: ["However men approach Me, even so do I accept them."],
                cite: "Bhagavad Gita 4.11",
            },
            {
                type: "heading",
                level: 2,
                content: ["Path one: Inquiry"],
            },
            {
                type: "paragraph",
                content: [
                    "The path of inquiry asks what is real, who the self is, and what remains when thoughts, roles, and identities are examined carefully. Its classical expressions include Vedanta, especially Advaita, and practices such as self-inquiry, contemplative scriptural study, and sustained discrimination between the changing and the unchanging.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This path suits seekers who are naturally drawn to metaphysical precision. They need conceptual clarity, not because ideas alone liberate, but because confusion blocks contemplation. If you keep asking what consciousness is, why suffering persists, and who is aware of experience, you are probably inquiry-shaped. Start with ",
                    { type: "link", text: "What is Vedanta?", href: "/what-is-vedanta" },
                    ".",
                ],
            },
            {
                type: "callout",
                tone: "warning",
                title: "Shadow side of inquiry",
                content: [
                    "Unlived inquiry becomes spiritual abstraction. If every insight stays verbal and no practice changes your reactions, the path has become an identity project.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Path two: Devotion"],
            },
            {
                type: "paragraph",
                content: [
                    "The path of devotion centers relationship. Here the seeker approaches the Divine through love, surrender, mantra, kirtan, prayer, pilgrimage, and service. Bhakti does not begin from the question, 'What is reality in the abstract?' It begins from the ache to offer oneself fully.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This path often expresses itself through Vaishnava and Shaiva traditions, deity devotion, and repeated name remembrance. If you feel more transformed by chanting than by metaphysical argument, devotion is not a lesser option. It may be the most honest route available to you. See ",
                    { type: "link", text: "Shaivism vs Vaishnavism", href: "/shaivism-vs-vaishnavism" },
                    " for the major devotional families.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Path three: Discipline and method"],
            },
            {
                type: "paragraph",
                content: [
                    "Some seekers trust a path more when its stages are concrete. They need posture, breath, sequence, schedule, vow, and repetition. This is the orientation behind many forms of yoga, meditative training, and daily sadhana systems. The person is not uninterested in truth. They simply approach it through methodical shaping of body, breath, and mind.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Such seekers usually do best with a stable routine before they chase visionary experiences. A small daily sequence works better than occasional intensity. Use ",
                    { type: "link", text: "Daily Spiritual Routine for Beginners", href: "/daily-spiritual-routine-beginners" },
                    " and ",
                    { type: "link", text: "How to Start Japa", href: "/how-to-start-japa" },
                    " as starting points.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Path four: Ritual and sacred pattern"],
            },
            {
                type: "paragraph",
                content: [
                    "Modern readers often underrate ritual because they assume it is empty formalism. In the traditional setting, ritual is embodied theology. It trains attention, reverence, rhythm, and symbolic literacy. Lighting a lamp, offering flowers, reciting stotra, observing fasts, and participating in temple life are not merely cultural leftovers. They shape consciousness through repeated sacred pattern.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This path helps seekers who need form, beauty, gesture, and communal rhythm to stabilize the heart. It can also serve as a support path for people whose primary orientation is inquiry or devotion but who need bodily participation to avoid spiritual over-intellectualization.",
                ],
            },
            {
                type: "quote",
                content: ["Whatever you do, whatever you eat, whatever you offer or give, do that as an offering to Me."],
                cite: "Bhagavad Gita 9.27",
            },
            {
                type: "heading",
                level: 2,
                content: ["How to tell which path is primary for you right now"],
            },
            {
                type: "list",
                items: [
                    ["If clarity pulls you forward, inquiry is likely primary."],
                    ["If love, prayer, and surrender pull you forward, devotion is likely primary."],
                    ["If routine and method pull you forward, discipline is likely primary."],
                    ["If symbol, beauty, and sacred action pull you forward, ritual is likely primary."],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The key phrase is ",
                    { type: "em", text: "right now" },
                    ". Paths can shift. A person may begin in devotion, deepen through disciplined mantra practice, and later enter serious inquiry. Another may begin in philosophy and discover that only devotion softens the ego enough for insight to become real.",
                ],
            },
            {
                type: "callout",
                tone: "practice",
                title: "Simple diagnostic",
                content: [
                    "Ask which practice you still return to on a difficult day. That answer is usually more trustworthy than the persona you would like to have.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The role of scripture in choosing a path"],
            },
            {
                type: "paragraph",
                content: [
                    "The Bhagavad Gita remains the best cross-path introduction because it refuses to isolate human beings into one method. The Upanishads lean more strongly toward inquiry. Puranic and bhakti literature more openly nourishes devotional life. Ritual manuals and temple liturgies structure sacred participation. A good beginner studies one primary source that stabilizes orientation rather than reading everything at once.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "If you are stuck between options, do not keep comparing in abstraction. Try one stable practice for 30 to 40 days. Read a small amount of aligned scripture. Notice what becomes more honest, more grounded, and more sustainable.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["What not to do"],
            },
            {
                type: "list",
                items: [
                    ["Do not build your path around aesthetics alone."],
                    ["Do not keep switching methods weekly because boredom feels like discernment."],
                    ["Do not imitate advanced non-dual language if your actual practice is unstable."],
                    ["Do not treat devotion as childish or inquiry as cold. Both caricatures are false."],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "If you want a guided next step, use ",
                    { type: "link", text: "Faith Finder", href: "/faith-finder" },
                    ". If you already know you are practice-oriented, continue into ",
                    { type: "link", text: "Daily Spiritual Routine for Beginners", href: "/daily-spiritual-routine-beginners" },
                    ". If you suspect inquiry is your home base, begin with ",
                    { type: "link", text: "What is Vedanta?", href: "/what-is-vedanta" },
                    ".",
                ],
            },
        ],
    },
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
    "vedanta-vs-buddhism": {
        slug: "vedanta-vs-buddhism",
        pillarLabel: "Ancient Wisdom",
        pillarHref: "/ancient-wisdom-philosophies",
        blocks: [
            {
                type: "lead",
                content: [
                    "Vedanta and Buddhism are often merged into a single bucket called 'Eastern spirituality.' That shortcut creates false clarity. These traditions share extraordinary depth, but they are not saying the same thing with different accents.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The confusion happens because both traditions critique ego-identity, both value contemplative discipline, and both diagnose suffering as rooted in misperception. Yet once you move from broad mood to doctrinal precision, real differences emerge around selfhood, ultimate reality, scripture, method, and liberation.",
                ],
            },
            {
                type: "callout",
                tone: "insight",
                title: "The shortest honest comparison",
                content: [
                    "Advaita Vedanta says the deepest Self is real and identical with Brahman. Many Buddhist schools deny any permanent self and treat clinging to such essence as a root error. That is not a minor wording issue. It changes the entire map.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Where they genuinely overlap"],
            },
            {
                type: "paragraph",
                content: [
                    "Both traditions are serious about suffering. Neither is satisfied with superficial moral improvement alone. Both insist that ordinary perception is compromised by ignorance, habit, craving, and mistaken identification. Both also value direct insight over inherited opinion.",
                ],
            },
            {
                type: "list",
                items: [
                    ["Both train attention and non-reactivity."],
                    ["Both require ethical preparation, not just metaphysical talk."],
                    ["Both see ignorance as central to bondage."],
                    ["Both hold that liberation requires transformation of perception, not mere belief."],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This overlap explains why comparative readers feel an immediate resonance. It does not justify collapsing the traditions. Convergence at the level of practice psychology does not erase divergence at the level of ontology.",
                ],
            },
            {
                type: "quote",
                content: ["As a man casts off worn-out garments and puts on new ones, so the embodied self casts off worn-out bodies."],
                cite: "Bhagavad Gita 2.22",
            },
            {
                type: "heading",
                level: 2,
                content: ["The central difference: Atman and Anatman"],
            },
            {
                type: "paragraph",
                content: [
                    "Vedanta, especially Advaita, grounds itself in Upanishadic mahavakyas such as ",
                    { type: "em", text: "Tat Tvam Asi" },
                    " and ",
                    { type: "em", text: "Aham Brahmasmi" },
                    ". The underlying claim is that the deepest self, Atman, is not the ego or personality but pure consciousness itself. Liberation comes through recognizing that Atman is not separate from Brahman.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Classical Buddhism, by contrast, is famous for ",
                    { type: "strong", text: "Anatman" },
                    " or non-self. The Buddha's teaching in texts such as the ",
                    { type: "em", text: "Anatta-lakkhana Sutta" },
                    " examines body, feeling, perception, formations, and consciousness and denies that any of them can be claimed as a permanent self. Later Buddhist traditions interpret this with sophistication, but the anti-essentialist thrust remains decisive.",
                ],
            },
            {
                type: "callout",
                tone: "warning",
                title: "Common comparison error",
                content: [
                    "Saying 'Buddhist emptiness and Vedantic Brahman are basically the same' may feel harmonizing, but it usually means the two traditions have not been read carefully enough on their own terms.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Brahman and Sunyata are not interchangeable"],
            },
            {
                type: "paragraph",
                content: [
                    "Vedanta's ultimate reality language points toward Brahman, the absolute, infinite, non-dual ground. Buddhist Madhyamaka uses ",
                    { type: "strong", text: "Sunyata" },
                    " or emptiness to deny inherent independent existence. These may converge experientially in some contemplative reports, but doctrinally they arise from different argumentative worlds.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "A Vedantin can accuse Buddhism of collapsing the real into negation. A Buddhist can accuse Vedanta of smuggling back metaphysical essence under the name Brahman. Those critiques are not modern internet inventions. They reflect long histories of debate on the Indian subcontinent.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["How the paths differ in practice emphasis"],
            },
            {
                type: "paragraph",
                content: [
                    "Vedanta often centers scriptural hearing, reflection, and contemplation. The classical triad is ",
                    { type: "strong", text: "Shravana, Manana, Nididhyasana" },
                    ". Buddhism frequently foregrounds mindfulness, concentration, ethical discipline, dependent origination analysis, and direct observation of impermanence and non-self. These are not exclusive categories, but they reveal distinct pedagogical instincts.",
                ],
            },
            {
                type: "list",
                items: [
                    ["Vedanta asks: who is the witness of experience?"],
                    ["Buddhism often asks: what in experience can actually be owned as self?"],
                    ["Vedanta leans toward recognition of an already-real absolute."],
                    ["Buddhism often leans toward deconstruction of clinging and fabricated identity."],
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Why people still compare them"],
            },
            {
                type: "paragraph",
                content: [
                    "The comparison remains useful because each tradition sharpens the reader against lazy assumptions. Vedanta prevents consciousness from being reduced to surface psychology. Buddhism prevents metaphysical language from becoming subtle ego reinforcement. Studied together carefully, they can produce intellectual humility and contemplative seriousness.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "But the order matters. Learn a tradition internally before making bridges. Start with ",
                    { type: "link", text: "What is Vedanta?", href: "/what-is-vedanta" },
                    " and ",
                    { type: "link", text: "Advaita Vedanta Explained", href: "/advaita-vedanta-explained" },
                    ". Then compare it with Buddhist thought. Precision protects depth.",
                ],
            },
        ],
    },
    "non-duality-vs-dualism": {
        slug: "non-duality-vs-dualism",
        pillarLabel: "Ancient Wisdom",
        pillarHref: "/ancient-wisdom-philosophies",
        blocks: [
            {
                type: "lead",
                content: [
                    "The most important philosophical difference on the spiritual path is often hidden under vague language about oneness. Do you approach reality as a final unity or as an eternal relationship between self and God? That distinction shapes practice, theology, and even the emotional texture of liberation.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "In Indian philosophy, the great fault line is between non-duality and dualism. The names most readers meet are ",
                    { type: "strong", text: "Advaita" },
                    " and ",
                    { type: "strong", text: "Dvaita" },
                    ". Yet the dispute is not just historical. It reaches into prayer, meditation, ethics, and what liberation itself means.",
                ],
            },
            {
                type: "callout",
                tone: "insight",
                title: "Quick distinction",
                content: [
                    "Non-duality says ultimate reality is not finally divided. Dualism says difference between God, soul, and world is real and enduring. The spiritual consequences are enormous.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["What Advaita means by 'not-two'"],
            },
            {
                type: "paragraph",
                content: [
                    "Advaita does not simply say 'everything is one' in a sentimental sense. It says that Brahman alone is ultimately real and that the apparent multiplicity of self and world is a superimposition. The Upanishadic declarations ",
                    { type: "em", text: "Tat Tvam Asi" },
                    " and ",
                    { type: "em", text: "Aham Brahmasmi" },
                    " become the core contemplative claims.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "In Shankara's articulation, bondage is caused by ignorance, ",
                    { type: "strong", text: "Avidya" },
                    ". Liberation is not the production of a new state. It is the removal of a false identification. The classic rope-snake analogy from Advaita helps here. The error lies in mis-seeing what is already present.",
                ],
            },
            {
                type: "quote",
                content: ["That thou art."],
                cite: "Chandogya Upanishad 6.8.7",
            },
            {
                type: "heading",
                level: 2,
                content: ["What Dvaita protects"],
            },
            {
                type: "paragraph",
                content: [
                    "Madhvacharya's Dvaita rejects the non-dual collapse of difference. God and soul are not ultimately identical. They are eternally distinct. This difference is not a temporary stage of ignorance. It is built into the structure of reality.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "Why does this matter? Because if difference is real, devotion becomes metaphysically stable. Love of God is not a provisional tool to be discarded after realization. It is a permanent relation. Liberation means proximity, surrender, delight, and right dependence, not dissolution of individuality into an impersonal absolute.",
                ],
            },
            {
                type: "list",
                items: [
                    ["God and individual soul are distinct."],
                    ["God and matter are distinct."],
                    ["Soul and matter are distinct."],
                    ["Souls are distinct from one another."],
                    ["Material entities remain distinct from one another."],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "These five distinctions, the ",
                    { type: "strong", text: "Panchabheda" },
                    ", are central to Madhva's vision. They protect the grammar of devotion and the reality of relational existence.",
                ],
            },
            {
                type: "callout",
                tone: "warning",
                title: "Do not caricature dualism",
                content: [
                    "Dualism is not philosophical immaturity. It has its own rigor, scriptural grounding, and spiritual sophistication. Reducing it to 'beginner religion' is a category mistake.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["The middle position: Vishishtadvaita"],
            },
            {
                type: "paragraph",
                content: [
                    "Ramanuja's Vishishtadvaita is essential because it shows the debate is not simply two camps yelling past each other. He agrees that Brahman is ultimate, but insists that souls and matter are real attributes or modes of Brahman rather than pure illusion. The common analogy is body and soul. Distinct, yes. Separate, no.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "For many seekers, this middle path feels existentially truer than either pure identity or radical separation. It preserves devotion without abandoning metaphysical unity.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["How these views change practice"],
            },
            {
                type: "paragraph",
                content: [
                    "Non-dual practice typically leans toward inquiry, discrimination, and witness-consciousness. Dualist practice often leans toward prayer, name repetition, surrender, and service to a personal Lord. These are not rigid boundaries, but they are real tendencies. Your metaphysics shapes what feels spiritually intelligible.",
                ],
            },
            {
                type: "list",
                items: [
                    ["If you seek recognition of identity with the absolute, non-dual methods will feel coherent."],
                    ["If you seek loving relation with the Divine, dualist methods will feel coherent."],
                    ["If both seem partly true, qualified non-dual approaches may offer a bridge."],
                ],
            },
            {
                type: "paragraph",
                content: [
                    "This is why it helps to read ",
                    { type: "link", text: "Advaita Vedanta Explained", href: "/advaita-vedanta-explained" },
                    ", ",
                    { type: "link", text: "Adi Shankaracharya", href: "/adi-shankaracharya-life-teachings" },
                    ", and the larger ",
                    { type: "link", text: "What is Vedanta?", href: "/what-is-vedanta" },
                    " guide together rather than in isolation.",
                ],
            },
            {
                type: "heading",
                level: 2,
                content: ["Which one is true?"],
            },
            {
                type: "paragraph",
                content: [
                    "Traditions answer that differently, obviously. But the better beginner question is often: which view exposes your current blind spot? If you are spiritually proud, devotion may humble you. If you are emotionally dependent on religious imagery, inquiry may mature you. If you are abstracted from embodied devotion, ritual may ground you. If you are chaotic, discipline may save your practice before philosophy even begins.",
                ],
            },
            {
                type: "paragraph",
                content: [
                    "The debate matters because metaphysics is never just theoretical. It determines whether liberation is recognition, relation, or both. It determines what the word 'God' can mean without contradiction. It determines whether the self is finally dissolved, fulfilled, or offered.",
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