// =============================================================================
// Civilization Comparisons — Standalone pSEO-ready data file
// =============================================================================
// Global comparative timeline data for ancient civilization comparison pages.
// Source: docs/research/ancient-indian-timeline-research.md
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface ComparisonPoint {
  dateRange: string;
  india: string;
  other: string;
  context?: string;
}

export interface CivilizationComparison {
  id: string;
  title: string;
  entityA: string;
  entityB: string;
  metaDescription: string;
  description: string;
  comparisonPoints: ComparisonPoint[];
  keyInsight: string;
  relatedSites: string[];
  relatedEras: string[];
  relatedEvidence: string[];
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export const civilizationComparisons: CivilizationComparison[] = [
  // -- Bilateral comparisons --
  {
    id: "india-vs-mesopotamia",
    title: "Ancient India vs Mesopotamia",
    entityA: "Ancient India",
    entityB: "Ancient Mesopotamia",
    metaDescription:
      "Compare the Indus-Saraswati Civilization with Sumerian, Akkadian, and Babylonian Mesopotamia. Urban planning, writing, trade, and religion side by side.",
    description:
      "The Indus-Saraswati Civilization and Mesopotamia were not isolated worlds. Indus carnelian beads have been found in Ur's Royal Cemetery. Mesopotamian cuneiform tablets reference 'Meluhha' — almost certainly the Indus region — as a source of exotic goods: carnelian, lapis lazuli, ivory, and timber. A Mesopotamian seal from Failaka Island depicts a humped bull, an animal native to South Asia but absent from the Near East. Trade routes connected the two civilizations through the Persian Gulf, with the island of Dilmun (modern Bahrain) serving as an intermediary. Yet the two civilizations developed radically different urban philosophies. Mesopotamian cities grew organically around temple complexes, with ziggurats dominating the skyline and kings claiming divine sanction. Indus cities were planned on grids, with covered drains running beneath streets and no identifiable palaces or monumental temples. Mohenjo-daro's Great Bath suggests ritual bathing, not divine kingship. Mesopotamia produced cuneiform — the world's first fully developed writing system — used for everything from epic poetry to grain receipts. The Indus script remains undeciphered, with roughly 4,200 known inscriptions averaging fewer than five signs each. Whether this represents a full writing system, a proto-writing notation, or something else entirely is one of archaeology's great open questions. The contrast extends to governance. Mesopotamian city-states had visible hierarchies: kings, priests, slaves, and elaborate legal codes like Hammurabi's. The Indus cities show remarkably little evidence of inequality — no grand tombs, no obvious palaces, no depictions of warfare. Some scholars interpret this as a merchant republic or council-based governance; others argue the evidence is simply incomplete. What is clear is that two of the Bronze Age's greatest urban experiments took fundamentally different approaches to the same problems of scale, sanitation, trade, and social organization.",
    comparisonPoints: [
      {
        dateRange: "~7,000-5,000 BCE",
        india:
          "Mehrgarh: independent agricultural origin with wheat, barley, cattle domestication, mud-brick houses, and early dentistry evidence",
        other:
          "Eridu and early Ubaid settlements forming along the Tigris-Euphrates. Irrigation agriculture beginning",
        context:
          "Both regions developing farming independently. Mehrgarh's dentistry predates any known surgical evidence in Mesopotamia",
      },
      {
        dateRange: "~3,300-2,600 BCE",
        india:
          "Early Harappan phase: Rakhigarhi, Kalibangan, and Dholavira transitioning from villages to planned towns. Standardized weights emerging",
        other:
          "Sumerian city-states (Uruk, Ur, Lagash) fully urban. Cuneiform writing developed ~3,200 BCE. Ziggurats under construction",
        context:
          "Mesopotamia urbanized slightly earlier, but both regions independently developed sophisticated urban systems within centuries of each other",
      },
      {
        dateRange: "~2,600-2,300 BCE",
        india:
          "Mature IVC at peak: Mohenjo-daro, Harappa, Dholavira with grid-planned streets, Great Bath, covered drainage, standardized weights across 1,500 km",
        other:
          "Akkadian Empire under Sargon unifies Mesopotamian city-states. First known empire in history. Extensive cuneiform literature",
        context:
          "Active trade via Persian Gulf. Indus seals found in Mesopotamia. 'Meluhha' referenced in Akkadian trade records",
      },
      {
        dateRange: "~2,300-1,900 BCE",
        india:
          "Late Mature IVC. Lothal dock operational for maritime trade. Dholavira's water harvesting at full capacity. Signs of stress appearing by 2,000 BCE",
        other:
          "Ur III dynasty: bureaucratic peak with tens of thousands of cuneiform tablets. Gudea of Lagash imports timber and stone from 'Meluhha'",
        context:
          "Peak of bilateral trade. Indus carnelian beads in Ur's Royal Cemetery. Mesopotamian cylinder seals found at IVC sites",
      },
      {
        dateRange: "~1,900-1,500 BCE",
        india:
          "IVC decline and deurbanization. Saraswati river drying. Population shifts eastward. Late Harappan and Cemetery H cultures",
        other:
          "Old Babylonian period. Hammurabi's law code (~1,754 BCE). Mesopotamian urban tradition continues without interruption",
        context:
          "4.2 kiloyear drought event impacts both regions. Mesopotamia recovers; IVC does not return to urban scale for centuries",
      },
    ],
    keyInsight:
      "The deepest contrast is not technological but political. Mesopotamia's visible hierarchies — kings, ziggurats, law codes, slave records — have no counterpart in the Indus cities. Mohenjo-daro housed 40,000 people with uniform house sizes, no palace, and no depictions of rulers. Either the Indus civilization achieved large-scale urban coordination without centralized kingship, or its power structures used materials that did not survive. Both possibilities are extraordinary.",
    relatedSites: [
      "mohenjo-daro",
      "harappa",
      "lothal",
      "dholavira",
      "mehrgarh",
    ],
    relatedEras: ["indus-saraswati"],
    relatedEvidence: ["ivc-vedic-continuity"],
  },
  {
    id: "india-vs-egypt",
    title: "Ancient India vs Ancient Egypt",
    entityA: "Ancient India",
    entityB: "Ancient Egypt",
    metaDescription:
      "Compare the Indus-Saraswati and Vedic civilizations with Old, Middle, and New Kingdom Egypt. Pyramids, IVC peak, trade, mathematics, and afterlife beliefs.",
    description:
      "Ancient India and Egypt were connected by maritime trade routes that predated both civilizations' urban phases. The Red Sea and Arabian Sea formed a continuous corridor, and evidence of contact appears in both archaeological and textual records. Egyptian faience beads have been found at Harappan sites, while Indian teak and ivory appear in Egyptian contexts. The two civilizations peaked at roughly the same time — the IVC's Mature Phase (2,600-1,900 BCE) overlaps with Egypt's Old and Middle Kingdoms — yet their approaches to civilization could hardly be more different. Egypt concentrated power in a divine pharaoh, expressed permanence through stone pyramids, and devoted enormous cultural energy to the afterlife. The IVC built in fired brick, left no monumental tombs, and appears to have focused civic energy on water management and sanitation rather than death rituals. Egypt's hieroglyphic writing is fully deciphered, giving us access to literature, administrative records, and religious texts spanning three millennia. The Indus script remains locked, leaving the civilization's intellectual life invisible. Both civilizations achieved remarkable things in mathematics and measurement. Egypt developed practical geometry for pyramid construction and Nile surveying. The IVC created a standardized weight system based on a binary-decimal progression that was uniform across sites separated by 1,500 kilometers — a feat of measurement standardization not matched in Egypt until the Ptolemaic period. Both civilizations collapsed or transformed around the same period. The IVC deurbanized after 1,900 BCE; Egypt's Old Kingdom had already fractured during the First Intermediate Period (~2,180 BCE), partly driven by the same climatic disruption. The 4.2 kiloyear drought event links both collapses to a single global cause.",
    comparisonPoints: [
      {
        dateRange: "~3,100-2,700 BCE",
        india:
          "Early Harappan phase: proto-urban settlements at Rakhigarhi, Kalibangan, Kot Diji. Standardized brick ratios emerging",
        other:
          "Unification of Upper and Lower Egypt under Narmer (~3,100 BCE). Early Dynastic period. First hieroglyphic writing",
        context:
          "Both civilizations transitioning from pre-urban to urban at roughly the same time, on opposite sides of the Arabian Sea",
      },
      {
        dateRange: "~2,700-2,200 BCE",
        india:
          "Mature IVC cities at peak: Mohenjo-daro, Harappa, Dholavira, Lothal. Great Bath, grid streets, covered drainage, world's earliest dock",
        other:
          "Old Kingdom: Great Pyramids of Giza (~2,560 BCE), Sphinx. Centralized pharaonic state. Pyramid Texts — oldest religious literature",
        context:
          "Both civilizations at their peak simultaneously. Egypt built upward (pyramids); IVC built outward (planned cities with drainage)",
      },
      {
        dateRange: "~2,200-1,900 BCE",
        india:
          "Late Mature IVC showing signs of stress. Some sites abandoned. Saraswati river flow diminishing",
        other:
          "First Intermediate Period: Old Kingdom collapse. Regional fragmentation. Famine texts. Then Middle Kingdom reunification (~2,050 BCE)",
        context:
          "4.2 kiloyear drought event disrupts both civilizations. Egypt recovers into the Middle Kingdom; IVC begins irreversible decline",
      },
      {
        dateRange: "~1,900-1,500 BCE",
        india:
          "IVC deurbanization. Cemetery H culture at Harappa. Population dispersal eastward to Ganga plain. Late/post-Harappan cultures",
        other:
          "Middle Kingdom prosperity, then Second Intermediate Period. Hyksos rule in the Delta. Bronze Age trade networks active",
        context:
          "Egypt maintains urban continuity through political disruption; Indian urban tradition enters a gap that lasts several centuries",
      },
      {
        dateRange: "~1,500-1,000 BCE",
        india:
          "Vedic period: Painted Grey Ware, iron working beginning, Rigvedic hymns composed. No cities but sophisticated oral literature",
        other:
          "New Kingdom at peak: Ramesses II, Valley of the Kings, Karnak Temple. Egypt controls Nubia and campaigns into the Levant",
        context:
          "Stark divergence. Egypt in its most monumental phase; India in a non-urban, textually productive phase. Both creating foundational religious literature",
      },
    ],
    keyInsight:
      "The pyramids and the Great Bath represent two opposite philosophies of monumental construction. Egypt directed its greatest engineering toward death — tombs for divine kings meant to last eternity. The IVC directed equivalent engineering skill toward daily life — water management, sanitation, and urban planning for living people. Neither approach is inherently superior, but the contrast reveals fundamentally different civilizational priorities: permanence through death in Egypt, quality of life in the IVC.",
    relatedSites: ["mohenjo-daro", "dholavira", "lothal", "harappa"],
    relatedEras: ["indus-saraswati", "transition"],
    relatedEvidence: [],
  },
  {
    id: "india-vs-china",
    title: "Ancient India vs Ancient China",
    entityA: "Ancient India",
    entityB: "Ancient China",
    metaDescription:
      "Compare Indus-Saraswati and Vedic traditions with Xia, Shang, and Zhou China. Writing, bronze, philosophy, and astronomy across Asia's great civilizations.",
    description:
      "India and China — the two civilizations that between them account for roughly half of all humans who have ever lived — developed in parallel yet in near-total isolation from each other for millennia. The Himalayas and the Tibetan Plateau formed a barrier so complete that the first documented cultural exchange (Buddhism's transmission to China) did not occur until the 1st century CE, thousands of years after both civilizations had reached urban maturity. This isolation makes their parallels all the more striking. Both developed sophisticated cosmological systems, decimal mathematics, and philosophical traditions that grappled with consciousness, ethics, and the nature of reality. Both faced the same fundamental question — how should a large, diverse agricultural society organize itself? — and arrived at radically different answers. China chose centralization: a unified script, a bureaucratic state, and political philosophies (Legalism, Confucianism) oriented toward hierarchy and social harmony. India chose decentralization: multiple scripts, fragmented polities, and philosophical traditions (Vedanta, Samkhya, Nyaya) oriented toward individual liberation and metaphysical inquiry. China's Shang dynasty developed oracle bone script — a fully functional writing system used for divination — around 1,200 BCE. The Indus script (~2,600-1,900 BCE) is older but undeciphered and may not represent full literacy. Brahmi script, the ancestor of all modern Indian scripts, appears around the 3rd century BCE. Both civilizations excelled at bronze working, but at different scales: Shang ritual bronzes are among the most impressive metalwork in human history, while the IVC's bronze work (the Dancing Girl of Mohenjo-daro) shows equal artistry at smaller scale. The philosophical flowering occurred at roughly the same time in both civilizations: the Upanishads and early Buddhism in India (~800-500 BCE), Confucius and Laozi in China (~6th-5th century BCE). Karl Jaspers called this convergence the 'Axial Age' — though whether it represents independent discovery or some as-yet-unidentified transmission mechanism remains debated.",
    comparisonPoints: [
      {
        dateRange: "~5,000-3,000 BCE",
        india:
          "Mehrgarh mature phases. Early Harappan villages transitioning to towns. Copper working. Independent wheat/barley agriculture",
        other:
          "Yangshao culture: millet farming, painted pottery, village settlements along the Yellow River. Pig and dog domestication",
        context:
          "Both regions in Neolithic-to-Chalcolithic transition. Independent agricultural origins on opposite sides of the Himalayas",
      },
      {
        dateRange: "~2,600-1,900 BCE",
        india:
          "Mature IVC: Mohenjo-daro, Harappa, Dholavira. Grid-planned cities, standardized weights, Indus script, maritime trade to Mesopotamia",
        other:
          "Longshan culture transitioning to Erlitou (proto-Xia). Jade working, scapulimancy, walled settlements. No writing yet",
        context:
          "India urbanized significantly earlier than China. IVC cities at peak while China still pre-urban. No known contact between the two",
      },
      {
        dateRange: "~1,600-1,050 BCE",
        india:
          "Post-IVC deurbanization. Early Vedic period. Rigvedic hymns composed orally. Iron Age beginning in some regions",
        other:
          "Shang dynasty: oracle bone script, massive ritual bronze vessels, chariot warfare, Anyang as capital. First Chinese writing",
        context:
          "Divergent trajectories: China entering its first literate urban dynasty as India passes through a non-urban, orally creative phase",
      },
      {
        dateRange: "~1,050-500 BCE",
        india:
          "Late Vedic to Upanishadic period. Mahajanapadas forming. Iron Age urbanization (second urbanization). Early Buddhism and Jainism",
        other:
          "Western Zhou then Eastern Zhou (Spring and Autumn period). Confucius (~551-479 BCE), Laozi, Hundred Schools of Thought",
        context:
          "Axial Age: both civilizations produce their foundational philosophical traditions simultaneously, with no known contact",
      },
      {
        dateRange: "~500-250 BCE",
        india:
          "Maurya Empire under Chandragupta and Ashoka. Arthashastra. Ashoka's edicts in Brahmi and Kharosthi. Buddhism spreading",
        other:
          "Warring States period, then Qin unification (221 BCE). Legalism, standardized script, Great Wall construction begins",
        context:
          "Both civilizations achieve imperial unification within decades of each other. Ashoka rules ~268-232 BCE; Qin Shi Huang rules 221-210 BCE",
      },
    ],
    keyInsight:
      "The Axial Age parallel is the most intellectually provocative feature of the India-China comparison. Between 800 and 400 BCE, both civilizations — separated by the highest mountain range on Earth, with no documented contact — independently produced philosophical traditions questioning the nature of self, ethics, and cosmic order. The Upanishads and Confucius arrived at the same historical moment through entirely separate paths. Whether this represents convergent cultural evolution or some deeper pattern in civilizational development remains one of the great unanswered questions in world history.",
    relatedSites: ["mohenjo-daro", "harappa", "mehrgarh"],
    relatedEras: ["indus-saraswati", "transition", "historical"],
    relatedEvidence: [],
  },
  {
    id: "india-vs-greece",
    title: "Ancient India vs Ancient Greece",
    entityA: "Ancient India",
    entityB: "Ancient Greece",
    metaDescription:
      "Compare Vedic and Classical Indian thought with Ancient Greek philosophy, mathematics, drama, and governance. Vedanta vs Plato, dharmic order vs democracy.",
    description:
      "The comparison between ancient India and Greece is the comparison between the two civilizations that most shaped the philosophical vocabulary of the modern world. Greek philosophy gave the West its framework for logic, metaphysics, and political theory. Indian philosophy gave the East (and increasingly the global) tradition its frameworks for consciousness, liberation, and the relationship between self and cosmos. The two traditions met directly when Alexander reached the Indus in 326 BCE, and Greek accounts of that encounter reveal mutual fascination. Plutarch records that Indian 'gymnosophists' (naked philosophers) debated with Alexander and impressed the Greeks with their indifference to death. Pyrrho of Elis, who accompanied Alexander, returned to Greece and founded Pyrrhonism — a skeptical philosophy that bears striking resemblance to Madhyamaka Buddhist arguments. Whether Pyrrho was influenced by Indian thought or arrived at similar conclusions independently is debated. The parallels predate Alexander. Plato's theory of Forms and Shankara's Advaita Vedanta both posit that the everyday world is a shadow or projection of a higher reality. Greek atomic theory (Democritus, ~460 BCE) and Indian atomic theory (Vaisheshika school, ~6th century BCE) developed independently. Both traditions produced sophisticated grammar: Panini's Ashtadhyayi (~4th century BCE) is the most rigorous grammatical analysis in the ancient world — a formal system that anticipates modern linguistics. The divergence is equally instructive. Greece developed democracy, tragedy, and a political philosophy centered on the polis. India developed dharma, moksha, and a philosophical tradition centered on individual consciousness. Greece asked: how should we live together? India asked: what is the nature of the self that lives? Both questions remain unanswered and urgent.",
    comparisonPoints: [
      {
        dateRange: "~1,500-1,200 BCE",
        india:
          "Early Vedic period: Rigvedic hymns composed. Complex ritual system. Astronomical observations embedded in texts",
        other:
          "Mycenaean Greece: Linear B script, palatial centers at Mycenae and Tiryns. Trojan War (~1,200 BCE if historical",
        context:
          "Both civilizations in their early heroic/literary phase. Vedic hymns and Homeric epics share structural parallels as Indo-European traditions",
      },
      {
        dateRange: "~800-500 BCE",
        india:
          "Upanishadic revolution: Brahman-Atman identity, karma, moksha. Early Buddhism and Jainism. Panini's grammar (~4th century BCE)",
        other:
          "Pre-Socratic philosophers: Thales, Heraclitus, Parmenides, Democritus. Greek colonies across Mediterranean. Olympic Games",
        context:
          "Axial Age: both traditions simultaneously asking fundamental questions about reality, consciousness, and ethics",
      },
      {
        dateRange: "~500-300 BCE",
        india:
          "Mahajanapadas and early Maurya Empire. Arthashastra. Six darshanas crystallizing. Nalanda and Taxila as learning centers",
        other:
          "Classical Athens: Socrates, Plato, Aristotle. Parthenon built. Athenian democracy. Peloponnesian War. Alexander's conquests",
        context:
          "Peak philosophical output in both civilizations. Taxila (Takshashila) was India's equivalent of the Athenian Academy",
      },
      {
        dateRange: "~326-250 BCE",
        india:
          "Alexander reaches the Indus (326 BCE). Chandragupta defeats Seleucus. Maurya Empire at peak under Ashoka. Buddhism spreading",
        other:
          "Hellenistic period: Seleucid Empire, Ptolemaic Egypt. Greek culture spreading across Near East. Stoicism, Epicureanism",
        context:
          "Direct contact: Megasthenes at Pataliputra. Indo-Greek kingdoms. Gandhara art fuses Greek and Indian aesthetics",
      },
      {
        dateRange: "~250 BCE — 200 CE",
        india:
          "Shunga, Satavahana, Kushan dynasties. Mahayana Buddhism. Bhagavad Gita composed. Indian mathematics (zero, decimal place value)",
        other:
          "Roman Republic then Empire absorbs Greek culture. Greco-Roman philosophy: Neoplatonism, Stoicism. Library of Alexandria",
        context:
          "Indo-Roman trade peaks. Tamil Sangam poetry references Roman trade. Indian pepper in Roman markets. Philosophical influence debated",
      },
    ],
    keyInsight:
      "The most underappreciated parallel is grammatical. Panini's Ashtadhyayi (~4th century BCE) formalized Sanskrit grammar with roughly 4,000 rules using a metalanguage, recursion, and null elements — techniques that modern linguistics and computer science would not reinvent for over two millennia. Aristotle's contemporary Greek grammatical work, while foundational for the Western tradition, did not approach this level of formal rigor. The fact that the world's most sophisticated ancient grammar was Indian, not Greek, inverts the common assumption that analytical precision was a uniquely Western achievement.",
    relatedSites: ["hastinapura"],
    relatedEras: ["transition", "historical"],
    relatedEvidence: [],
  },
  {
    id: "indus-vs-sumeria",
    title: "Indus-Saraswati vs Sumerian Civilization",
    entityA: "Indus-Saraswati Civilization",
    entityB: "Sumerian Civilization",
    metaDescription:
      "Focused comparison of the two great Bronze Age river civilizations. Urban planning, governance, writing systems, and the trade routes that connected them.",
    description:
      "The Indus-Saraswati Civilization and Sumer were the two largest urban systems of the 3rd millennium BCE, and they knew each other. Sumerian texts mention 'Meluhha' as a distant land of exotic goods: carnelian, lapis lazuli, timber, and ivory. Indus seals and etched carnelian beads have been found at Ur, Kish, and other Mesopotamian sites. A Sumerian text describes a 'Meluhhan village' in Akkad, suggesting not just trade but permanent diaspora communities. The Gulf trade route ran through Dilmun (Bahrain) and Magan (Oman), with Lothal's dock on the Indian side and Ur's harbors on the Mesopotamian side. Yet these two trading partners built their cities on opposite principles. Sumerian cities grew organically around temple precincts, with narrow winding streets and ziggurats towering over the skyline. Indus cities were planned on precise grids, with straight streets intersecting at right angles and covered drains running beneath every major road. Sumer was monarchical: kings claimed divine mandate, waged wars of conquest, and built palaces rivaling temples. The Indus cities show no palaces, no obvious royal burials, and no depictions of warfare or conquest. The Great Bath at Mohenjo-daro and the fire altars at Kalibangan suggest ritual life oriented toward purification and fire ceremony rather than royal display. Sumer produced cuneiform — a writing system so versatile it was adopted by Akkadians, Babylonians, Hittites, and others. The Indus script, with its short inscriptions averaging under five signs, may have served a completely different communicative purpose. Whether the Indus people had full literacy expressed in perishable media, or whether their script was a limited notation system, remains unknown. The contrast illuminates a fundamental question: can a large-scale civilization achieve coordination without centralized kingship and monumental propaganda?",
    comparisonPoints: [
      {
        dateRange: "~3,500-3,000 BCE",
        india:
          "Early Harappan: Kot Diji, Amri, early Rakhigarhi. Villages coalescing into towns. Standardized brick ratios appearing",
        other:
          "Uruk period: world's first cities. Cuneiform proto-writing on clay tablets. Monumental temple architecture. Cylinder seals",
        context:
          "Sumer urbanized roughly 300-500 years before the Indus region, making it the earliest urban civilization by most reckonings",
      },
      {
        dateRange: "~2,600-2,300 BCE",
        india:
          "Mature IVC at peak: Mohenjo-daro (40,000+ people), Harappa, Dholavira. Grid planning, Great Bath, standardized weights, Indus script on seals",
        other:
          "Early Dynastic Sumer: Ur, Lagash, Umma. Royal Tombs of Ur with gold, lapis, and carnelian. King lists. Constant city-state warfare",
        context:
          "Both civilizations at urban peak simultaneously. Indus carnelian beads already appearing in Sumerian royal graves",
      },
      {
        dateRange: "~2,300-2,100 BCE",
        india:
          "Mature IVC continues. Lothal dock operational. Maritime trade through Dilmun and Magan. Indus weights found at Gulf sites",
        other:
          "Akkadian Empire under Sargon: first known empire. Sargon's inscriptions mention trade with Meluhha. Naram-Sin's campaigns",
        context:
          "Peak bilateral trade. Sargon boasts that ships of Meluhha dock at Akkad's quays. A 'Meluhhan village' exists in Mesopotamia",
      },
      {
        dateRange: "~2,100-1,900 BCE",
        india:
          "Late Mature IVC. Dholavira's signboard — largest known Indus inscription. Signs of environmental stress. Some sites shrinking",
        other:
          "Ur III dynasty: administrative peak. Tens of thousands of cuneiform tablets. Gudea of Lagash imports Meluhhan goods. Ziggurat of Ur",
        context:
          "Final flourishing of bilateral trade. Ur III bureaucratic records are the most detailed trade documentation of the Bronze Age",
      },
      {
        dateRange: "~1,900-1,700 BCE",
        india:
          "IVC decline: Saraswati drying, cities abandoned, population dispersing. Cemetery H culture at Harappa. Trade networks breaking down",
        other:
          "Old Babylonian period: Hammurabi unifies Mesopotamia. Law code. Mathematical tablets. Mesopotamian urban tradition continues",
        context:
          "The Indus-Meluhha trade ceases. Mesopotamia maintains urban continuity; the Indus region enters a centuries-long deurbanization",
      },
    ],
    keyInsight:
      "The Indus-Sumer comparison poses a question that remains unanswered: how did the IVC coordinate a civilization spanning 1.5 million square kilometers — with standardized weights, uniform brick ratios, and identical urban planning principles — without the visible state apparatus that Sumer used? Sumer needed kings, armies, law codes, and a bureaucratic writing system to manage far smaller territories. The IVC achieved equal or greater standardization across a far larger area with none of these visible mechanisms. Either the Indus state apparatus existed in forms that did not survive, or the civilization discovered a mode of large-scale coordination that we do not yet understand.",
    relatedSites: [
      "mohenjo-daro",
      "harappa",
      "dholavira",
      "lothal",
      "kalibangan",
    ],
    relatedEras: ["indus-saraswati"],
    relatedEvidence: ["ivc-vedic-continuity"],
  },

  // -- Global context pages --
  {
    id: "india-at-12000-bce",
    title: "What Was India Like at 12,000 BCE?",
    entityA: "India at 12,000 BCE",
    entityB: "The World at 12,000 BCE",
    metaDescription:
      "What was happening in India and around the world at 12,000 BCE — the date proposed by Nilesh Oak for the Ramayana? Global context for an extraordinary claim.",
    description:
      "If the Ramayana occurred around 12,209 BCE, as Nilesh Oak proposes based on astronomical references in the text, what kind of world would it have been set in? The honest answer is: a world that looks nothing like the Ramayana's description of cities, palaces, and organized kingdoms. At 12,000 BCE, India was in the Mesolithic period. The subcontinent's inhabitants used microlithic tools — tiny stone blades set into bone or wood handles. They lived in rock shelters (Bhimbetka's paintings from this period show hunting scenes) and seasonal camps. There were no permanent settlements, no agriculture, and no metalworking. The global picture was similar. Göbekli Tepe, often cited as evidence that pre-agricultural societies could build monumental structures, would not begin for another 2,400 years (~9,600 BCE). The Natufians in the Levant were among the most advanced people on Earth at this date — semi-settled villagers harvesting wild cereals — and they had nothing resembling cities. The Americas were populated by Clovis-culture hunter-gatherers pursuing megafauna. Europe's Magdalenian cave painters were producing their final masterworks. The Younger Dryas catastrophe was about to strike — a sudden return to glacial conditions around 12,800-11,500 BP that would devastate ecosystems worldwide. Oak acknowledges the archaeological gap but argues that absence of evidence is not evidence of absence, particularly for a civilization that may have built with perishable materials in an era of dramatic sea-level change. The 120-meter post-glacial sea-level rise submerged the coastlines of 12,000 BCE, and with them any coastal settlements. The Gulf of Cambay structures, if confirmed as human-made and correctly dated to 7,500-9,000 BP, would at least prove that the Indian Ocean conceals significant archaeological surprises. The gap between Oak's astronomical dating and the archaeological record remains the central unresolved tension in the early Indian chronology debate.",
    comparisonPoints: [
      {
        dateRange: "~12,000 BCE — India",
        india:
          "Mesolithic: microlithic tools, rock shelter habitation at Bhimbetka and similar sites, hunting-gathering economy, no permanent settlements",
        other:
          "Oak's proposed Ramayana date (12,209 BCE) implies cities, kingdoms, organized armies, and sophisticated culture",
        context:
          "The archaeological record shows no urban or even agricultural activity in India at this date. This is the core challenge to early dating proposals",
      },
      {
        dateRange: "~12,000 BCE — Anatolia/Levant",
        india:
          "Same Mesolithic period across South Asia. Seasonal camps, wild-food foraging, cave and rock shelter use",
        other:
          "Natufians: semi-settled villages in the Levant, harvesting wild cereals. Göbekli Tepe still 2,400 years away (~9,600 BCE)",
        context:
          "The most advanced societies on Earth at this date were semi-settled foragers. No one, anywhere, had agriculture or cities",
      },
      {
        dateRange: "~12,000 BCE — Americas",
        india:
          "Bhimbetka paintings from this era depict communal hunting scenes with bows and dogs",
        other:
          "Clovis culture: hunting megafauna (mammoth, mastodon) with distinctive fluted spear points across North America",
        context:
          "Both regions had hunter-gatherer populations with sophisticated tool traditions but no permanent architecture",
      },
      {
        dateRange: "~12,000 BCE — Europe",
        india:
          "Microliths found across the Deccan and central India. Shell middens on coasts (now submerged coastlines)",
        other:
          "Magdalenian culture ending: final cave paintings at Lascaux, Altamira. Upper Paleolithic toolkit at its most refined",
        context:
          "Europe's cave art tradition — 30,000+ years of accumulated skill — was ending. Both regions show sophisticated symbolic culture without urbanism",
      },
      {
        dateRange: "~12,800-11,500 BP — Global",
        india:
          "Younger Dryas impact on South Asian monsoon patterns. Possible disruption to coastal settlements now submerged",
        other:
          "Younger Dryas catastrophe: sudden return to glacial conditions. Megafauna extinctions in Americas. Widespread ecosystem collapse",
        context:
          "This global catastrophe would have affected any civilization existing at this date. Some researchers link it to cultural memory of 'great floods' across traditions",
      },
    ],
    keyInsight:
      "The 12,000 BCE dating forces a binary choice: either the archaeological record is fundamentally incomplete for this period (plausible given 120 meters of sea-level rise since the Last Glacial Maximum), or the astronomical references in the Ramayana do not indicate a historical date. There is no middle ground. No archaeological site anywhere on Earth shows urban civilization at 12,000 BCE. If Oak is correct, the Ramayana civilization existed in a form that left no surviving trace — which is possible but currently unfalsifiable.",
    relatedSites: ["bhimbetka", "gobekli-tepe", "gulf-of-cambay"],
    relatedEras: ["ramayana", "younger-dryas-gap"],
    relatedEvidence: ["ramayana-12209", "arch-gap-12000", "sea-level"],
  },
  {
    id: "india-at-5561-bce",
    title: "What Was India Like at 5,561 BCE?",
    entityA: "India at 5,561 BCE",
    entityB: "The World at 5,561 BCE",
    metaDescription:
      "What was happening in India and globally at 5,561 BCE -- Oak's proposed Mahabharata War date? Archaeological context for a contested chronology.",
    description:
      "Nilesh Oak's astronomical analysis places the Mahabharata War at 5,561 BCE. What does the archaeological record show for this date? In India, the most relevant site is Mehrgarh in Balochistan — a small farming village with mud-brick houses, grain storage, and evidence of cattle domestication. It is a genuine Neolithic settlement, but it is a village of perhaps a few hundred people, not the vast kingdoms described in the Mahabharata. There is no evidence of urban centers, organized armies, chariots, or metalworking anywhere in South Asia at this date. The global picture provides calibration. Mesopotamia was in its Ubaid period — Eridu, the oldest Sumerian city, was settled but pre-urban, a temple town of modest size. Egypt was in its pre-dynastic phase: farming villages along the Nile with no pyramids, no pharaohs, and no writing. China's Yangshao culture was producing painted pottery and farming millet in settled villages. Writing did not exist anywhere on Earth — the first writing systems (Sumerian cuneiform, Egyptian hieroglyphs) would not appear for another 2,200 years, around 3,350-3,200 BCE. The Mahabharata describes a civilization with iron weapons, chariots, elaborate cities, sophisticated diplomacy, and a war involving millions of soldiers. None of these elements have archaeological attestation at 5,561 BCE. Oak and supporters argue that the Saraswati river's existence as a mighty river at this date (confirmed by geological evidence) supports the dating, since the Mahabharata describes the Saraswati as flowing. They also point to the 120-meter post-glacial sea-level rise and the Saraswati's subsequent drying as explanations for why settlements on its banks have not survived. Critics counter that Mehrgarh's small farming village is the actual archaeological reality of 6th-millennium-BCE South Asia — and the gap between that reality and the Mahabharata's descriptions is too large to bridge with arguments from absence.",
    comparisonPoints: [
      {
        dateRange: "~5,561 BCE — India",
        india:
          "Mehrgarh: small Neolithic farming village with mud-brick houses, grain storage, cattle. No urban centers, no metalworking, no writing",
        other:
          "Oak's proposed Mahabharata date implies kingdoms spanning the subcontinent, iron weapons, chariots, elaborate cities, and massive armies",
        context:
          "The gap between archaeological evidence and textual description is smaller than at 12,000 BCE but still very large",
      },
      {
        dateRange: "~5,561 BCE — Mesopotamia",
        india:
          "Mehrgarh Period II-III: expanded village with multi-room houses, wheel-made pottery beginning, and cotton cultivation evidence",
        other:
          "Ubaid period: Eridu settled as a temple town. Pre-urban. Irrigation agriculture along Tigris-Euphrates. No writing, no cities",
        context:
          "The most advanced Near Eastern settlement was a temple village. Urbanization was still 2,000+ years away everywhere",
      },
      {
        dateRange: "~5,561 BCE — Egypt",
        india:
          "Balochistan and Indus region: scattered farming settlements, Neolithic tool traditions, early craft specialization",
        other:
          "Badarian/early Naqada cultures: Nile farming villages, simple pottery, stone tools. No pyramids, no pharaohs, no hieroglyphs",
        context:
          "Egypt at this date looked much like India: small agricultural villages. The civilization we associate with 'Ancient Egypt' was 2,500+ years in the future",
      },
      {
        dateRange: "~5,561 BCE — China",
        india:
          "Possible early rice cultivation evidence in eastern India (Koldihwa, contested dating). Fishing and farming along rivers",
        other:
          "Yangshao culture: millet farming, painted pottery, pit houses along the Yellow River. Banpo village with 500+ residents",
        context:
          "China's Yangshao villages were comparable in scale to Mehrgarh. Neither region had anything resembling urban civilization",
      },
      {
        dateRange: "~5,561 BCE — Europe and Americas",
        india:
          "Mesolithic-to-Neolithic transition in parts of the subcontinent. Wild-food foraging still dominant in most regions",
        other:
          "Europe: early Neolithic spreading from Anatolia. Goseck Circle (~4,900 BCE) still centuries away. Americas: archaic hunter-gatherers",
        context:
          "No civilization on Earth had writing, cities, or metalworking at this date. The first writing is ~2,200 years in the future",
      },
    ],
    keyInsight:
      "The 5,561 BCE date is more defensible than the Ramayana dating because the Saraswati river was genuinely flowing at this time — geological evidence confirms it. The Mahabharata repeatedly describes the Saraswati as a mighty river, which it was in the 6th millennium BCE but was not by 1,900 BCE. This is a real data point. However, a flowing river does not prove urban civilization on its banks. The question is whether absence of evidence (no cities, no metal, no writing found at 5,561 BCE) constitutes evidence of absence, or whether the specific conditions of the Saraswati basin — drying, burial under desert sands, alluvial deposition — could plausibly have destroyed all traces of a Bronze Age-level civilization.",
    relatedSites: ["mehrgarh", "kalibangan", "dwarka-underwater"],
    relatedEras: ["mahabharata", "younger-dryas-gap"],
    relatedEvidence: ["mb-5561", "saraswati-paleo", "arch-gap-5561"],
  },
  {
    id: "ivc-bronze-age",
    title: "The Indus Valley Among Bronze Age Civilizations",
    entityA: "Indus-Saraswati Civilization",
    entityB: "Bronze Age World",
    metaDescription:
      "The Indus Valley Civilization compared with Egypt, Mesopotamia, China, and Minoan Crete. What the IVC achieved that no other Bronze Age civilization did.",
    description:
      "The Indus-Saraswati Civilization is routinely listed alongside Egypt, Mesopotamia, and China as one of the four great Bronze Age civilizations — yet it remains the least understood and, in many textbooks, the least discussed. This disparity is not a function of the civilization's importance. At its peak (~2,600-1,900 BCE), the IVC was the largest of the four by area, covering approximately 1.5 million square kilometers — larger than Egypt and Mesopotamia combined. Its population has been estimated at 5 million, comparable to Egypt and exceeding Mesopotamia. It contained the world's most advanced urban sanitation, the earliest known dock, the earliest known ploughed field, the earliest known signboard, and a weight standardization system that functioned uniformly across a territory stretching from Afghanistan to Gujarat. What it apparently lacked — monumental tombs, visible kings, a deciphered writing system, and a tradition of self-glorifying inscriptions — is precisely what makes other civilizations easy to narrate. Egypt has pyramids and pharaohs. Mesopotamia has ziggurats and Gilgamesh. China has oracle bones and dynastic records. The IVC has drains, weights, and an unreadable script. This is not a reflection of civilizational inferiority but of radically different priorities. Minoan Crete, the fifth member of the Bronze Age club, provides an instructive parallel: also a civilization without obvious military display, with sophisticated palace complexes, advanced plumbing, and a script (Linear A) that remains undeciphered. The Minoans are celebrated despite these gaps. The IVC deserves the same status — and arguably more, given its larger scale and more impressive engineering. The Bronze Age comparison reveals that the IVC was not a lesser civilization that happened to exist alongside the 'real' great cultures. It was the largest, most urbanized, and in many ways most technically sophisticated of its contemporaries. Its relative obscurity is a failure of historical narrative, not of historical achievement.",
    comparisonPoints: [
      {
        dateRange: "~2,600-2,500 BCE",
        india:
          "Mature IVC emerging: Mohenjo-daro, Harappa, Dholavira reaching full urban scale. Grid planning, covered drains, standardized weights",
        other:
          "Egypt: Old Kingdom, Great Pyramid of Khufu (~2,560 BCE). Mesopotamia: Early Dynastic III, Royal Tombs of Ur. China: Longshan culture, pre-urban",
        context:
          "IVC, Egypt, and Mesopotamia all at urban peak simultaneously. China still 1,000 years from its first cities",
      },
      {
        dateRange: "~2,500-2,300 BCE",
        india:
          "IVC at full maturity: Lothal dock, Kalibangan ploughed field, Dholavira signboard. 1,500+ known sites. Standardized brick ratio (4:2:1) across entire civilization",
        other:
          "Egypt: later Old Kingdom, solar temples. Mesopotamia: Akkadian Empire. Minoan Crete: early palatial period beginning",
        context:
          "IVC covers 1.5 million sq km — larger than Egypt and Mesopotamia combined. Yet no visible king or centralized military",
      },
      {
        dateRange: "~2,300-2,100 BCE",
        india:
          "IVC trade networks at peak: carnelian, lapis, copper, shell. Lothal trading with Mesopotamia via Gulf route. Indus seals found from Oman to Uzbekistan",
        other:
          "Egypt: First Intermediate Period (collapse). Mesopotamia: Gutian interregnum, then Ur III. Minoan Crete: expanding palace centers",
        context:
          "Egypt collapses while IVC continues at peak. The 4.2 kiloyear event begins to disrupt all Bronze Age civilizations",
      },
      {
        dateRange: "~2,100-1,900 BCE",
        india:
          "IVC showing stress: some sites abandoned, population shifting, Saraswati flow diminishing. Still functional but contracting",
        other:
          "Egypt: Middle Kingdom reunification. Mesopotamia: Ur III bureaucratic peak, then collapse. China: Erlitou culture (proto-Xia). Crete: first palaces",
        context:
          "Global climatic disruption (4.2 kiloyear event) affects all civilizations differently. Egypt and Mesopotamia recover; IVC does not",
      },
      {
        dateRange: "~1,900-1,700 BCE",
        india:
          "IVC collapse/transformation: major cities abandoned, deurbanization, Cemetery H culture. Population disperses eastward",
        other:
          "Egypt: strong Middle Kingdom. Mesopotamia: Old Babylonian, Hammurabi. China: Erlitou/early Shang. Crete: palatial peak, Linear A",
        context:
          "IVC is the only major Bronze Age civilization that does not recover. The others continue or transform. The reason remains debated",
      },
      {
        dateRange: "Unique IVC achievements",
        india:
          "World's earliest dock (Lothal), earliest ploughed field (Kalibangan), earliest signboard (Dholavira), most advanced urban drainage, standardized weights across 1.5M sq km",
        other:
          "Egypt: pyramids, hieroglyphs. Mesopotamia: cuneiform, law codes. China: oracle bones, ritual bronzes. Crete: palatial architecture, frescoes",
        context:
          "Each civilization excelled in different domains. IVC's strengths — sanitation, standardization, egalitarian urbanism — are less photogenic but equally remarkable",
      },
    ],
    keyInsight:
      "The IVC held four 'world firsts' that no other Bronze Age civilization matched: the earliest known dock (Lothal), the earliest known ploughed agricultural field (Kalibangan), the earliest known public signboard (Dholavira), and the most advanced urban drainage system in the ancient world (Mohenjo-daro). These achievements share a common thread — they are all practical, civic, and oriented toward the quality of daily life rather than royal glorification or afterlife preparation. The IVC's priorities were mundane in the best sense: clean water, efficient agriculture, functioning trade, and livable cities. That these priorities have made the civilization harder to narrate than pyramid-building Egypt says more about our narrative preferences than about civilizational achievement.",
    relatedSites: [
      "mohenjo-daro",
      "harappa",
      "dholavira",
      "lothal",
      "kalibangan",
      "rakhigarhi",
    ],
    relatedEras: ["indus-saraswati"],
    relatedEvidence: ["ivc-vedic-continuity"],
  },
];

// -----------------------------------------------------------------------------
// Helper getters
// -----------------------------------------------------------------------------

export function getAllCivilizationComparisons(): CivilizationComparison[] {
  return civilizationComparisons;
}

export function getCivilizationBySlug(
  slug: string,
): CivilizationComparison | undefined {
  return civilizationComparisons.find((c) => c.id === slug);
}
