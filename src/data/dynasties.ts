// =============================================================================
// Dynasty Profiles — Standalone pSEO-ready data file
// =============================================================================
// Derived from the DynastyNode tree in history.ts. Groups nodes into meaningful
// dynasty profiles that each get their own page at /dynasties/[slug].
// Source: docs/research/ancient-indian-timeline-research.md
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface DynastyProfile {
  id: string;
  name: string;
  branch: "solar" | "lunar" | "historical";
  dateRange: string;
  startYear: number; // negative = BCE
  endYear: number;
  capital?: string;
  keyRulers: string[];
  description: string; // 200-500 word narrative for pSEO page
  significance: string; // 1-2 sentence summary
  relatedSites: string[]; // site IDs
  relatedEras: string[]; // era IDs
  relatedDynasties: string[]; // other dynasty IDs for cross-linking
  dynastyNodeIds: string[]; // IDs from the original DynastyNode tree (for filtering the tree component)
  metaDescription: string; // SEO meta
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export const dynasties: DynastyProfile[] = [
  // -- Solar branch --
  {
    id: "suryavansha",
    name: "Solar Dynasty (Suryavansha)",
    branch: "solar",
    dateRange: "~12,209 — 362 BCE",
    startYear: -12209,
    endYear: -362,
    capital: "Ayodhya",
    keyRulers: [
      "Ikshvaku",
      "Mandhatri",
      "Dilipa",
      "Raghu",
      "Dasharatha",
      "Rama",
      "Sumitra",
    ],
    description:
      "The Suryavansha — the Solar Dynasty — traces its origin to Surya (the Sun) through Vaivasvata Manu, the progenitor of humanity in this cosmic cycle. Manu's son Ikshvaku founded the kingdom of Kosala with its capital at Ayodhya, establishing a royal lineage that the Puranas record as lasting over eighty generations. The dynasty's most celebrated monarch is Rama, placed as the 64th or 81st king depending on the Puranic recension consulted. In the Oak-Bhaty archaeoastronomical framework, Rama's coronation dates to 12,209 BCE — a figure derived from planetary and stellar observations encoded in the Valmiki Ramayana. Between Ikshvaku and Rama, the lineage produced rulers who became archetypes of dharmic governance: Mandhatri the conqueror, Harishchandra the truth-keeper, Dilipa the cow-protector, and Raghu whose fame inspired Kalidasa's Raghuvamsha. Ayodhya as a capital functioned as the political and spiritual center of the Kosala kingdom for millennia. The dynasty continued long after Rama, though the post-Ramayana rulers receive less literary attention. The Puranas list a succession extending to Sumitra, who was defeated by Mahapadma Nanda around 362 BCE — bringing the Solar Dynasty's political sovereignty to an end. Mahapadma Nanda's conquest of the remnant solar kingdoms marks the transition from Puranic genealogies to firmly historical chronology. The gap between the literary tradition's deep antiquity and the archaeological record at Ayodhya (which confirms occupation from the 7th century BCE) remains one of the defining questions of Indian chronological studies.",
    significance:
      "The longest-attested royal lineage in Indian tradition, spanning from Surya through Rama to the Nanda conquest. Foundational to the Ramayana epic and the Kosala kingdom.",
    relatedSites: ["ayodhya"],
    relatedEras: ["vedic", "ramayana"],
    relatedDynasties: ["ikshvaku", "chandravansha"],
    dynastyNodeIds: ["surya", "manu", "ikshvaku", "rama", "sumitra"],
    metaDescription:
      "The Solar Dynasty (Suryavansha): from Surya through Ikshvaku to Rama and beyond. The longest royal lineage in Indian tradition, ruling from Ayodhya.",
  },
  {
    id: "ikshvaku",
    name: "Ikshvaku Line",
    branch: "solar",
    dateRange: "~12,209 BCE and earlier",
    startYear: -13000,
    endYear: -12000,
    capital: "Ayodhya",
    keyRulers: [
      "Ikshvaku",
      "Mandhatri",
      "Harishchandra",
      "Dilipa",
      "Raghu",
      "Aja",
      "Dasharatha",
    ],
    description:
      "The Ikshvaku line represents the core sequence of Solar Dynasty rulers between the founder Ikshvaku and his most famous descendant, Rama. This segment of the genealogy contains some of the most celebrated names in Indian literary and philosophical tradition. Ikshvaku himself is named in the Bhagavad Gita (4.1) as the first king to whom the science of yoga was transmitted — Krishna tells Arjuna that this knowledge passed from Vivasvan (Surya) to Manu to Ikshvaku, establishing the royal lineage as a vehicle for dharmic transmission. Mandhatri expanded the kingdom through conquest and is described as a chakravartin — a universal sovereign. Harishchandra became the archetype of truth-keeping through his willingness to sacrifice everything rather than break a promise, a story retold across the Puranas and in Vishvamitra-related narratives. Dilipa's devotion to the divine cow Nandini, as narrated in Kalidasa's Raghuvamsha, established the template for righteous kingship through service. Raghu, the dynasty's namesake in Kalidasa's poem, conducted a digvijaya (conquest of all directions) and then distributed his entire treasury to Brahmins — embodying the Kshatriya ideal of conquest followed by renunciation. Aja, Raghu's grandson, is known for his grief at the death of his wife Indumati — a rare portrayal of royal emotional vulnerability in Sanskrit literature. The lineage culminates in Dasharatha, whose sacrifice of personal happiness for the sake of a promise leads directly to Rama's exile and the events of the Ramayana.",
    significance:
      "The intermediary rulers between Ikshvaku and Rama whose stories define the ideals of dharmic kingship. Celebrated in Kalidasa's Raghuvamsha as models of righteous sovereignty.",
    relatedSites: ["ayodhya"],
    relatedEras: ["vedic", "ramayana"],
    relatedDynasties: ["suryavansha"],
    dynastyNodeIds: ["ikshvaku", "rama"],
    metaDescription:
      "The Ikshvaku Line: from the founder of Ayodhya to Rama. Mandhatri, Harishchandra, Dilipa, Raghu — rulers who defined dharmic kingship in Indian tradition.",
  },

  // -- Lunar branch --
  {
    id: "chandravansha",
    name: "Lunar Dynasty (Chandravansha)",
    branch: "lunar",
    dateRange: "Pre-Mahabharata era",
    startYear: -8000,
    endYear: -5500,
    capital: "Pratishthana (near Prayaga)",
    keyRulers: ["Pururavas", "Nahusha", "Yayati"],
    description:
      "The Chandravansha — the Lunar Dynasty — traces its origin to Chandra (the Moon) through a lineage that converges with the Solar Dynasty at a critical juncture. Chandra's son Budha married Ila, daughter of Vaivasvata Manu, creating a bridge between the solar and lunar lines. Their son Pururavas is the effective founder of the Lunar Dynasty as a distinct political entity. Pururavas is famous in Sanskrit literature for his love affair with the apsara Urvashi — a story dramatized by Kalidasa in Vikramorvashiyam. The dynasty's capital was Pratishthana, near modern Prayagraj (Allahabad), at the confluence of the Ganga, Yamuna, and the subterranean Saraswati. The lineage from Pururavas to Yayati spans several generations of rulers who expanded Chandravansha power across northern India. Nahusha, Yayati's father, briefly held the throne of Indra in heaven before being cast down for arrogance — a Puranic narrative encoding the dangers of unchecked royal power. Yayati himself is the pivotal figure: his five sons — Yadu, Turvasu, Druhyu, Anu, and Puru — founded the five great lineages of the Lunar Dynasty. Yayati cursed four of his sons with premature old age when they refused to take his aging upon themselves; only Puru accepted, and was rewarded with the kingdom. The Yadava and Kuru dynasties, which dominate the Mahabharata, both descend from Yayati's branching — Yadu founding the Yadava line and Puru the Kuru line. This branching point is the single most important genealogical event in the Mahabharata tradition.",
    significance:
      "The parent dynasty from which the Yadava and Kuru lines descend through Yayati's five sons. Origin of both Krishna's and the Pandavas' lineages.",
    relatedSites: [],
    relatedEras: ["vedic"],
    relatedDynasties: ["suryavansha", "yadava", "kuru", "pandava"],
    dynastyNodeIds: ["chandra", "budha", "pururavas", "yayati"],
    metaDescription:
      "The Lunar Dynasty (Chandravansha): from Chandra through Pururavas to Yayati. Parent lineage of the Yadava and Kuru dynasties of the Mahabharata.",
  },
  {
    id: "yadava",
    name: "Yadava Dynasty",
    branch: "lunar",
    dateRange: "~5,561 BCE (Mahabharata era)",
    startYear: -6000,
    endYear: -5525,
    capital: "Mathura, then Dwarka",
    keyRulers: ["Yadu", "Sahasrajit", "Shurasena", "Vasudeva", "Krishna"],
    description:
      "The Yadava dynasty descends from Yadu, eldest son of Yayati, who was denied the primary succession in favor of his younger brother Puru. The Yadavas established their power base at Mathura in the Yamuna region, where the lineage continued through Shurasena (whose name survives in the ancient region of Surasena around Mathura) to Vasudeva, father of Krishna. Krishna's life marks the apex and the end of Yadava power. Born at Mathura, he defeated his tyrannical uncle Kamsa and later led the Yadavas to a new capital at Dwarka on the Gujarat coast — a strategic maritime relocation that placed the Yadavas at the center of Indian Ocean trade routes. Krishna's role in the Mahabharata War (5,561 BCE in the Oak chronology) as Arjuna's charioteer and the speaker of the Bhagavad Gita makes him the most consequential figure in the entire dynasty. After the war, a fratricidal conflict among the Yadavas (the Mausala Parva) destroyed the clan. Krishna departed the mortal world, and Dwarka was submerged by the sea — an event that S.R. Rao's underwater archaeology off the Gujarat coast has partially corroborated. The submersion date in the Oak-Bhaty framework is approximately 5,525 BCE, 36 years after the Mahabharata War. The Yadava identity persisted in later Indian history through various claimant dynasties, but the original Dwarka-based Yadava power ended with Krishna's era.",
    significance:
      "Krishna's dynasty. Ruled from Mathura and Dwarka until the post-Mahabharata fratricidal war and Dwarka's submersion (~5,525 BCE).",
    relatedSites: ["dwarka-underwater"],
    relatedEras: ["mahabharata"],
    relatedDynasties: ["chandravansha", "kuru", "pandava"],
    dynastyNodeIds: ["yadu", "krishna"],
    metaDescription:
      "The Yadava Dynasty: from Yadu to Krishna. Ruled from Mathura and Dwarka, ending with the post-Mahabharata fratricidal war and Dwarka's submersion.",
  },
  {
    id: "kuru",
    name: "Kuru Dynasty",
    branch: "lunar",
    dateRange: "~5,561 BCE (Mahabharata era)",
    startYear: -6000,
    endYear: -5500,
    capital: "Hastinapura, later Indraprastha",
    keyRulers: [
      "Puru",
      "Bharata",
      "Hastin",
      "Kuru",
      "Shantanu",
      "Dhritarashtra",
      "Pandu",
    ],
    description:
      "The Kuru dynasty descends from Puru, the youngest and most favored son of Yayati, and represents the primary line of Lunar Dynasty succession. Puru's descendant Bharata gave his name to the Indian subcontinent (Bharatavarsha), establishing the dynasty's foundational claim to sovereignty over the entire land. Hastin built Hastinapura on the Ganga, which became the capital and the principal setting of the Mahabharata. The eponymous Kuru consolidated the dynasty's identity, and the Kuru-Panchala region (roughly modern Haryana, Delhi, and western UP) became the cultural heartland of Vedic civilization. The dynasty's final generations produced the Mahabharata's central conflict: Shantanu married Ganga (producing Bhishma) and later Satyavati. Satyavati's line gave rise to Dhritarashtra (father of the hundred Kauravas) and Pandu (father of the five Pandavas). The succession crisis between these cousins drove the 18-day Kurukshetra War. Archaeologically, Hastinapura was excavated by B.B. Lal in 1950-52. The Painted Grey Ware layer corresponds to mainstream archaeology's dating of the Kuru-Panchala period (~1,200-600 BCE), though the Oak chronology places the Mahabharata War at 5,561 BCE. A flood deposit between the PGW and NBPW layers matches the Puranic account of a catastrophic flood that forced King Nichaksu to relocate the capital to Kaushambi. The Kuru dynasty's legacy extends beyond politics — the Kuru-Panchala region is where the Vedic ritual system was codified, Brahmana literature composed, and the foundations of classical Hinduism laid.",
    significance:
      "The dynasty of the Mahabharata. From Bharata (who named the subcontinent) through Kuru to the Pandava-Kaurava conflict at Kurukshetra.",
    relatedSites: ["hastinapura"],
    relatedEras: ["mahabharata"],
    relatedDynasties: ["chandravansha", "yadava", "pandava", "brihadratha"],
    dynastyNodeIds: [
      "puru",
      "bharata",
      "kuru",
      "pandavas-kauravas",
      "parikshit",
    ],
    metaDescription:
      "The Kuru Dynasty: from Puru and Bharata to the Pandavas and Kauravas. The dynasty behind the Mahabharata, ruling from Hastinapura.",
  },
  {
    id: "pandava",
    name: "The Pandavas",
    branch: "lunar",
    dateRange: "~5,561 BCE (Mahabharata War)",
    startYear: -5600,
    endYear: -5500,
    capital: "Indraprastha, then Hastinapura",
    keyRulers: [
      "Yudhishthira",
      "Bhima",
      "Arjuna",
      "Nakula",
      "Sahadeva",
      "Parikshit",
    ],
    description:
      "The five Pandavas — Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva — are the protagonists of the Mahabharata and the sons of Pandu, though each was fathered by a different deity: Dharma, Vayu, Indra, and the Ashvini Kumaras respectively. Their story is the central narrative of Indian civilization: exile, loss, war, victory, and ultimately renunciation. After being cheated of their kingdom in a rigged dice game, the Pandavas endured thirteen years of exile before demanding the return of their lands. When Duryodhana refused to yield even five villages, the eighteen-day war at Kurukshetra became inevitable. The war, dated to 5,561 BCE in the Oak chronology based on 150+ astronomical references in the text, resulted in catastrophic casualties on both sides. The Bhagavad Gita — Krishna's teaching to Arjuna on the battlefield — emerged from this conflict and became the most widely read Hindu scripture. After victory, Yudhishthira was crowned king at Hastinapura. The Pandavas ruled for 36 years before renouncing the throne and walking toward the Himalayas in the Mahaprasthana — a final journey from which none returned except Yudhishthira, who entered heaven in his mortal body. Parikshit, Arjuna's grandson through Abhimanyu and Uttara, succeeded to the throne and continued the Kuru line. His son Janamejaya conducted the Sarpa Satra (snake sacrifice) during which the Mahabharata itself was first narrated by Vaishampyana — making the text a story told within its own future.",
    significance:
      "The five brothers who are the Mahabharata's protagonists. Their war at Kurukshetra and Krishna's teaching to Arjuna (Bhagavad Gita) define the epic's legacy.",
    relatedSites: ["hastinapura"],
    relatedEras: ["mahabharata"],
    relatedDynasties: ["kuru", "yadava", "brihadratha"],
    dynastyNodeIds: ["pandavas-kauravas", "parikshit"],
    metaDescription:
      "The Pandavas: Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva. The Mahabharata's protagonists and the 18-day war at Kurukshetra.",
  },

  // -- Historical branch --
  {
    id: "brihadratha",
    name: "Brihadratha Dynasty",
    branch: "historical",
    dateRange: "~1,700 — 682 BCE",
    startYear: -1700,
    endYear: -682,
    capital: "Rajagriha (Rajgir)",
    keyRulers: ["Brihadratha", "Jarasandha", "Sahadeva", "Ripunjaya"],
    description:
      "The Brihadratha dynasty represents the transition from Puranic genealogy to proto-historical Magadha. Founded by Brihadratha, a descendant of the Kuru line through Parikshit's successors, the dynasty established its capital at Rajagriha (modern Rajgir) in the Magadha region of Bihar. Rajagriha's natural fortification — five hills forming a defensive ring — made it an ideal seat of power. The dynasty's most famous ruler is Jarasandha, who appears in the Mahabharata as a formidable antagonist. Jarasandha's military power was such that he imprisoned 86 kings for sacrifice and could only be defeated through Krishna's stratagem of sending Bhima to challenge him to a wrestling match. Bhima killed Jarasandha by tearing him apart along the axis of his conjoined birth — a narrative that modern readers may interpret as political allegory for splitting a powerful confederation. The Puranas list 21 Brihadratha kings ruling for a total period that bridges the gap between the Mahabharata era and the historically verified Haryanka dynasty. The last Brihadratha king, Ripunjaya, was overthrown by his minister's son, who established (or enabled) the Haryanka dynasty around 682 BCE. This transition marks the point where Indian political history becomes independently verifiable through Buddhist and Jain records, which name specific Magadhan kings as contemporaries of the Buddha and Mahavira. The Brihadratha period covers the centuries during which Magadha transformed from a peripheral Vedic region into the subcontinent's dominant political center.",
    significance:
      "The bridge dynasty between Puranic genealogy and historical Magadha. Includes Jarasandha of Mahabharata fame. 21 kings ruling from Rajagriha.",
    relatedSites: [],
    relatedEras: ["transition"],
    relatedDynasties: ["kuru", "pandava", "haryanka"],
    dynastyNodeIds: ["brihadratha"],
    metaDescription:
      "The Brihadratha Dynasty: 21 kings of early Magadha (~1,700–682 BCE). From the Mahabharata's Jarasandha to the rise of the Haryanka dynasty.",
  },
  {
    id: "haryanka",
    name: "Haryanka Dynasty",
    branch: "historical",
    dateRange: "~544 — 413 BCE",
    startYear: -544,
    endYear: -413,
    capital: "Rajagriha (Rajgir)",
    keyRulers: ["Bimbisara", "Ajatashatru", "Udayin"],
    description:
      "The Haryanka dynasty is the first Indian royal house whose existence is independently verified through multiple non-Indian literary traditions and through Buddhist and Jain canonical texts. Bimbisara (r. ~544-492 BCE) is the dynasty's founder in most reckonings — a contemporary and patron of both Gautama Buddha and Mahavira. Buddhist texts describe Bimbisara attending the Buddha's teachings, donating the Veluvana (Bamboo Grove) monastery, and maintaining a sophisticated administrative system with organized taxation and road networks. His kingdom of Magadha, with its capital at Rajagriha, controlled the rich iron ore and agricultural resources of the Gangetic plain. Ajatashatru, Bimbisara's son, seized the throne by imprisoning and (in some accounts) starving his father to death. Despite this parricide, Ajatashatru became an effective ruler who expanded Magadha's power through wars against the Vajjian confederacy and the Kosala kingdom. He is credited with developing two military innovations: the rathamusala (a scythed chariot) and the mahashilakantaka (a stone-hurling catapult). Ajatashatru convened the First Buddhist Council at Rajagriha after the Buddha's death. The dynasty continued through several rulers after Ajatashatru but declined rapidly — Udayin, the last significant Haryanka, founded Pataliputra (modern Patna) as a fort on the Ganga before the dynasty was overthrown by the Shishunaga dynasty around 413 BCE.",
    significance:
      "First historically verified Indian dynasty. Bimbisara and Ajatashatru were contemporaries of the Buddha and Mahavira, anchoring Indian chronology.",
    relatedSites: [],
    relatedEras: ["historical"],
    relatedDynasties: ["brihadratha", "nanda"],
    dynastyNodeIds: ["haryanka"],
    metaDescription:
      "The Haryanka Dynasty (~544–413 BCE): India's first historically verified royal house. Bimbisara and Ajatashatru, contemporaries of the Buddha.",
  },
  {
    id: "nanda",
    name: "Nanda Dynasty",
    branch: "historical",
    dateRange: "~345 — 322 BCE",
    startYear: -345,
    endYear: -322,
    capital: "Pataliputra",
    keyRulers: ["Mahapadma Nanda", "Dhana Nanda"],
    description:
      "The Nanda dynasty was a short-lived but transformative power that reshaped the political landscape of ancient India. Mahapadma Nanda, the founder, is described in the Puranas as the 'destroyer of all Kshatriyas' — a reference to his systematic elimination of the remaining Kshatriya dynasties, including the last Solar Dynasty ruler Sumitra of Ayodhya. This makes Mahapadma the historical terminus of the Suryavansha's political sovereignty. His origins are debated: Buddhist sources describe him as the son of a barber, while Puranic texts call him a Shudra king — either way, his rise represents a break from the Kshatriya monopoly on sovereignty that had characterized Indian political theory. The Nanda dynasty's wealth was legendary. Greek sources (Diodorus, Curtius) describe a Nanda army of 200,000 infantry, 20,000 cavalry, 2,000 chariots, and 3,000-6,000 war elephants — numbers that reportedly deterred Alexander's army from advancing beyond the Beas River in 326 BCE. Magadha's economic power rested on iron mining, Gangetic agriculture, and control of trade routes. The last ruler, Dhana Nanda, was overthrown by Chandragupta Maurya with the guidance of Chanakya (Kautilya) around 322 BCE. Chanakya's Arthashastra — the treatise on statecraft composed to enable this overthrow — became one of the foundational texts of Indian political science. The Nanda-to-Maurya transition is the hinge on which Indian history pivots from regional kingdoms to subcontinental empire.",
    significance:
      "Mahapadma Nanda ended the last Solar Dynasty remnant. The Nanda wealth and army deterred Alexander. Overthrown by Chandragupta Maurya in 322 BCE.",
    relatedSites: [],
    relatedEras: ["historical"],
    relatedDynasties: ["suryavansha", "haryanka", "maurya"],
    dynastyNodeIds: ["nanda"],
    metaDescription:
      "The Nanda Dynasty (~345–322 BCE): Mahapadma Nanda destroyed the last Kshatriya kingdoms. Their wealth deterred Alexander. Overthrown by Chandragupta Maurya.",
  },
  {
    id: "maurya",
    name: "Maurya Empire",
    branch: "historical",
    dateRange: "~322 — 184 BCE",
    startYear: -322,
    endYear: -184,
    capital: "Pataliputra",
    keyRulers: ["Chandragupta Maurya", "Bindusara", "Ashoka"],
    description:
      "The Maurya Empire was the first political entity to unite most of the Indian subcontinent under a single administration. Chandragupta Maurya, guided by his minister Chanakya, overthrew the Nanda dynasty around 322 BCE and rapidly expanded Maurya territory. His synchronism with Alexander the Great's invasion (327-325 BCE) provides the foundational chronological anchor for all of Indian historical dating — Chandragupta's meeting with Seleucus Nicator and the subsequent treaty are recorded in both Indian and Greek sources. Megasthenes, Seleucus's ambassador to Pataliputra, described a sophisticated urban administration with a six-board municipal government. Chandragupta's grandson Ashoka (r. ~268-232 BCE) transformed the empire's character after the devastating Kalinga War. His rock and pillar edicts — the oldest decipherable Indian inscriptions — record the adoption of dhamma (righteous governance) as state policy and the dispatching of Buddhist missionaries across Asia. The Ashokan pillars, with their polished sandstone and lion capitals, represent the peak of Mauryan material culture. The lion capital from Sarnath became independent India's national emblem. Ashoka's edicts in Brahmi script, deciphered by James Prinsep in 1837, unlocked the entire field of Indian epigraphy. The empire's administrative apparatus — described in Kautilya's Arthashastra and corroborated by Megasthenes's Indica — included a spy network, standardized coinage, a maintained road system, and provincial governors. The Maurya Empire declined after Ashoka, with the last ruler Brihadratha assassinated by his general Pushyamitra Shunga in 184 BCE.",
    significance:
      "First pan-subcontinental empire. Chandragupta's synchronism with Alexander anchors Indian chronology. Ashoka's edicts are India's oldest readable inscriptions.",
    relatedSites: [],
    relatedEras: ["historical"],
    relatedDynasties: ["nanda", "gupta"],
    dynastyNodeIds: ["maurya-node"],
    metaDescription:
      "The Maurya Empire (~322–184 BCE): Chandragupta, Bindusara, and Ashoka. India's first pan-subcontinental empire, anchoring historical chronology.",
  },
  {
    id: "gupta",
    name: "Gupta Empire",
    branch: "historical",
    dateRange: "~320 — 550 CE",
    startYear: 320,
    endYear: 550,
    capital: "Pataliputra",
    keyRulers: [
      "Chandragupta I",
      "Samudragupta",
      "Chandragupta II (Vikramaditya)",
      "Kumaragupta I",
    ],
    description:
      "The Gupta Empire presided over what historians call the 'Golden Age' of Indian civilization — a period of extraordinary achievement in mathematics, astronomy, literature, art, and philosophy. Chandragupta I (r. ~320-335 CE) established the dynasty through a strategic marriage alliance with the Lichchhavi princess Kumaradevi, gaining legitimacy and territory in the Gangetic heartland. His son Samudragupta (r. ~335-375 CE) was among India's most accomplished military commanders, with the Prayaga Prashasti (composed by the court poet Harishena) recording his conquest of nearly the entire subcontinent. Chandragupta II, identified by many scholars with the legendary Vikramaditya, extended Gupta power to its maximum territorial extent and patronized a court that included Kalidasa (widely regarded as Sanskrit literature's greatest poet), the astronomer-mathematician Aryabhata, and the polymath Varahamihira. It was during the Gupta period that Aryabhata calculated the Earth's circumference to remarkable accuracy, proposed a heliocentric model, and articulated the concept of zero as a mathematical placeholder. Nalanda University, though predating the Guptas, reached its zenith as an international center of Buddhist and secular learning under Gupta patronage. The temple architecture of this period — particularly the Dashavatara Temple at Deogarh — established the formal vocabulary of Hindu temple design. Fa-Xian, the Chinese Buddhist pilgrim who visited India during Chandragupta II's reign, described a prosperous and well-governed empire. The Gupta Empire declined in the 5th-6th centuries under pressure from Hunic invasions, fragmenting into regional successor states.",
    significance:
      "The 'Golden Age' of Indian civilization. Achievements in mathematics (zero, Aryabhata), literature (Kalidasa), and art under Gupta patronage defined classical Indian culture.",
    relatedSites: [],
    relatedEras: [],
    relatedDynasties: ["maurya"],
    dynastyNodeIds: [],
    metaDescription:
      "The Gupta Empire (~320–550 CE): India's Golden Age. Aryabhata, Kalidasa, Nalanda, and the foundations of classical Indian civilization.",
  },
  {
    id: "chola",
    name: "Chola Dynasty",
    branch: "historical",
    dateRange: "~300 BCE — 1279 CE",
    startYear: -300,
    endYear: 1279,
    capital: "Thanjavur",
    keyRulers: [
      "Karikala Chola",
      "Vijayalaya Chola",
      "Rajaraja Chola I",
      "Rajendra Chola I",
      "Kulottunga Chola I",
    ],
    description:
      "The Chola dynasty is one of the longest-ruling dynasties in world history, with origins mentioned in Ashoka's rock edicts (3rd century BCE) and a political presence extending to 1279 CE. The early Cholas, known primarily through Sangam literature, ruled from Uraiyur and produced rulers like Karikala Chola, who built the Grand Anicut (Kallanai) across the Kaveri — one of the oldest surviving dams in the world. After a period of eclipse, Vijayalaya Chola revived the dynasty in the 9th century by capturing Thanjavur, inaugurating the Imperial Chola period. Rajaraja Chola I (r. 985-1014 CE) built the Brihadeshwara Temple at Thanjavur — a UNESCO World Heritage Site and an engineering marvel with a 66-meter vimana (tower) capped by an 80-ton granite block raised without modern machinery. His son Rajendra Chola I achieved what no Indian ruler before him had: a naval empire spanning the Bay of Bengal. Rajendra's maritime expedition to Sri Vijaya (modern Indonesia and Malaysia) in 1025 CE projected Chola power across Southeast Asia, securing trade routes and establishing diplomatic relations with Song Dynasty China. The Chola administrative system — with its village-level self-governance documented in the Uttaramerur inscriptions — is one of the earliest recorded democratic institutions. The inscription describes an election process with eligibility criteria, disqualification rules, and selection by lot. Chola bronze sculpture, particularly the Nataraja (dancing Shiva), represents the pinnacle of Indian metalwork and has become an icon of Indian art worldwide. The dynasty declined in the 13th century, eventually absorbed by the Pandya dynasty in 1279 CE.",
    significance:
      "Maritime empire spanning Southeast Asia. Rajendra Chola's naval expeditions, the Brihadeshwara Temple, and village-level democracy in the Uttaramerur inscriptions.",
    relatedSites: [],
    relatedEras: [],
    relatedDynasties: [],
    dynastyNodeIds: [],
    metaDescription:
      "The Chola Dynasty (~300 BCE – 1279 CE): maritime empire across Southeast Asia. Brihadeshwara Temple, Rajendra Chola's naval conquests, and village democracy.",
  },
];

// -----------------------------------------------------------------------------
// Helper getters
// -----------------------------------------------------------------------------

export function getAllDynasties(): DynastyProfile[] {
  return dynasties;
}

export function getDynastyBySlug(slug: string): DynastyProfile | undefined {
  return dynasties.find((d) => d.id === slug);
}

export function getDynastiesByBranch(
  branch: DynastyProfile["branch"],
): DynastyProfile[] {
  return dynasties.filter((d) => d.branch === branch);
}

// -----------------------------------------------------------------------------
// Lookup helpers
// -----------------------------------------------------------------------------

export function getDynastyById(id: string): DynastyProfile | undefined {
  return dynasties.find((d) => d.id === id);
}
