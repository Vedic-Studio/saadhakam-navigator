// =============================================================================
// Archaeological Sites — Standalone pSEO-ready data file
// =============================================================================
// Extracted from history.ts and expanded with research dossier data.
// Source: docs/research/ancient-indian-timeline-research.md
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface SiteMediaRef {
  description: string;
  url: string;
  source: string;
  license?: string;
}

export interface ArchaeologicalSite {
  id: string;
  name: string;
  location: string;
  region: "south-asia" | "west-asia" | "global";
  coordinates?: { lat: number; lng: number };
  dateRange: string;
  startYear: number; // negative = BCE
  endYear: number;
  keyFindings: string[];
  significance: string;
  evidenceType: "confirmed" | "strong" | "open";
  description: string; // 200-500 word expanded description for the pSEO page
  relatedResearchers: string[]; // researcher IDs
  relatedEvidence: string[]; // evidence IDs
  relatedEras: string[]; // era IDs
  mediaRefs?: SiteMediaRef[];
  mapEmbedUrl?: string;
  metaDescription: string; // SEO meta description
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export const sites: ArchaeologicalSite[] = [
  // -- South Asian sites --
  {
    id: "bhimbetka",
    name: "Bhimbetka Rock Shelters",
    location: "Madhya Pradesh, India",
    region: "south-asia",
    coordinates: { lat: 22.9375, lng: 77.6111 },
    dateRange: "100,000+ years",
    startYear: -100000,
    endYear: -500,
    keyFindings: [
      "750+ rock shelters with paintings spanning 100,000 years",
      "Cupules dated to 200,000+ years old — among oldest art on Earth",
      "Continuous human occupation from Paleolithic to medieval period",
      "Paintings depict hunting scenes, battle formations, religious symbols, and daily life",
    ],
    significance:
      "Among the oldest continuously occupied sites on Earth. UNESCO World Heritage Site since 2003. Demonstrates unbroken human presence in the Indian subcontinent across every major climatic epoch.",
    evidenceType: "confirmed",
    description:
      "Bhimbetka lies in the Vindhyan foothills south of Bhopal. The 750+ rock shelters contain paintings spanning the entire arc of human prehistory — from Acheulean hand-axes through Mesolithic hunting scenes to medieval cavalry. Cupules carved into sandstone surfaces are among the oldest known art anywhere, predating European cave art by tens of thousands of years. The site was discovered by V.S. Wakankar in 1957. Its continuous occupation record demolishes the idea that the Indian subcontinent was sparsely populated before the Neolithic. Painted scenes include communal hunts, animal domestication, battle formations with riders, religious symbols, and geometric patterns. The Auditorium Rock features large cupules that some researchers date beyond 200,000 years, making Bhimbetka a serious contender for the world's oldest art site.",
    relatedResearchers: [],
    relatedEvidence: ["bhimbetka-evidence"],
    relatedEras: ["vedic"],
    metaDescription:
      "Bhimbetka Rock Shelters in Madhya Pradesh: 750+ shelters with paintings spanning 100,000+ years. UNESCO site with the world's oldest known art.",
  },
  {
    id: "mehrgarh",
    name: "Mehrgarh",
    location: "Balochistan, Pakistan",
    region: "south-asia",
    coordinates: { lat: 29.3833, lng: 67.6167 },
    dateRange: "~7,000 — 5,250 BCE",
    startYear: -7000,
    endYear: -5250,
    keyFindings: [
      "One of the world's earliest farming settlements",
      "Independent agricultural origin — wheat, barley, cattle domestication",
      "Mud-brick architecture predating the Indus cities by millennia",
      "Evidence of early dentistry — drilled teeth from 7,000 BCE",
    ],
    significance:
      "Proves the Indian subcontinent had its own independent Neolithic revolution — not a backwater of Near Eastern farming.",
    evidenceType: "confirmed",
    description:
      "Mehrgarh is a Neolithic settlement on the Kacchi plain in Balochistan, excavated by Jean-François Jarrige from 1974 to 2000. It provides the earliest evidence of farming and pastoralism in South Asia, with domesticated wheat, barley, and cattle appearing independently of the Near Eastern Neolithic. The site spans seven occupation periods from ~7,000 to 2,500 BCE, showing a continuous trajectory from mud-brick village to proto-urban center. Period I already shows mud-brick houses, granaries, and sophisticated burial practices. Mehrgarh's dentistry evidence — teeth drilled with flint-tipped bows — is among the oldest surgical evidence anywhere. The site's ceramic sequence and craft traditions show direct cultural continuity into the Indus-Saraswati Civilization, challenging the idea that IVC urbanism was imported.",
    relatedResearchers: [],
    relatedEvidence: ["mehrgarh-evidence"],
    relatedEras: ["younger-dryas-gap", "indus-saraswati"],
    metaDescription:
      "Mehrgarh: one of the world's earliest farming settlements (~7,000 BCE). Independent agricultural origin with wheat, barley, cattle domestication.",
  },
  {
    id: "rakhigarhi",
    name: "Rakhigarhi",
    location: "Haryana, India",
    region: "south-asia",
    coordinates: { lat: 29.2833, lng: 76.1167 },
    dateRange: "4,600 — 1,900 BCE",
    startYear: -4600,
    endYear: -1900,
    keyFindings: [
      "Largest IVC site at 350 hectares — larger than Mohenjo-daro",
      "2019 ancient DNA: no Steppe ancestry in 2,500 BCE individual",
      "Genetic profile is the primary ancestry source in South Asia today",
      "Sophisticated urban planning with drainage, granaries, and craft workshops",
    ],
    significance:
      "Ancient DNA evidence published in Cell and Science (2019) reshaping the Aryan Migration debate. The largest Indus-Saraswati site by area.",
    evidenceType: "confirmed",
    description:
      "Rakhigarhi in Haryana is the largest known site of the Indus-Saraswati Civilization, spanning 350 hectares across seven mounds. Excavations since 1969 (Suraj Bhan, then Amarendra Nath, then Vasant Shinde) have revealed sophisticated urban planning, drainage systems, granaries, and craft workshops. The site's fame rests on the 2019 ancient DNA study led by Vasant Shinde and David Reich's lab, which extracted DNA from a female skeleton dated to ~2,500 BCE. The results showed no Steppe pastoralist ancestry and no Iranian farmer ancestry — her genetic profile represents the primary ancestry source for modern South Asians. This finding is a data point in the Aryan Migration debate: Shinde interprets it as disproving AIT, while co-author Nick Patterson argues it's consistent with later Steppe migration after IVC decline. The larger study (Narasimhan et al., 523 individuals across Central and South Asia) shows Steppe-related ancestry spreading southward between 2,300 and 1,500 BCE.",
    relatedResearchers: [],
    relatedEvidence: ["rakhigarhi-dna", "ivc-vedic-continuity"],
    relatedEras: ["indus-saraswati"],
    metaDescription:
      "Rakhigarhi: the largest Indus Valley site (350 hectares). 2019 ancient DNA showed no Steppe ancestry, reshaping the Aryan Migration debate.",
  },
  {
    id: "dholavira",
    name: "Dholavira",
    location: "Gujarat, India",
    region: "south-asia",
    coordinates: { lat: 23.886, lng: 70.212 },
    dateRange: "3rd — mid-2nd millennium BCE",
    startYear: -3000,
    endYear: -1500,
    keyFindings: [
      "World's earliest known signboard — 10 Indus script characters",
      "Giant water reservoirs showing advanced hydraulic engineering",
      "Multi-layered fortification with citadel, middle town, and lower town",
      "Seven cultural stages spanning the entire IVC lifecycle",
    ],
    significance:
      "UNESCO World Heritage Site. Demonstrates sophisticated urban planning, water management, and the world's earliest known public inscription.",
    evidenceType: "confirmed",
    description:
      "Dholavira sits on Khadir Island in the Great Rann of Kachchh, excavated by R.S. Bisht from 1990 to 2005. The site reveals seven cultural stages from pre-Harappan to Late Harappan, making it one of the most complete records of IVC urban evolution. Its most striking feature is the hydraulic engineering: a network of reservoirs, channels, and dams that harvested every drop of seasonal rainfall. The famous 'signboard' — a wooden board with ten large Indus script characters set in gypsum — is the largest known Indus inscription and may be the world's first public sign. The city had a three-part layout (citadel, middle town, lower town) with massive fortification walls, a stadium-like structure, and evidence of precious-stone manufacturing. Dholavira's water management system is especially relevant given its arid location, showing engineering sophistication comparable to Roman aqueducts millennia later.",
    relatedResearchers: [],
    relatedEvidence: [],
    relatedEras: ["indus-saraswati"],
    metaDescription:
      "Dholavira: UNESCO World Heritage IVC site in Gujarat. Home to the world's earliest signboard and sophisticated water harvesting systems.",
  },
  {
    id: "lothal",
    name: "Lothal",
    location: "Gujarat, India",
    region: "south-asia",
    coordinates: { lat: 22.5216, lng: 72.2494 },
    dateRange: "~2,400 — 1,900 BCE",
    startYear: -2400,
    endYear: -1900,
    keyFindings: [
      "World's earliest known dock for maritime trade",
      "Bead-making factory with specialized lapidary craftwork",
      "Rice husk evidence suggesting early rice cultivation",
      "Sophisticated water control mechanism connecting dock to river",
    ],
    significance:
      "Evidence of sophisticated maritime trade networks spanning the Arabian Sea to Mesopotamia. Discovered by S.R. Rao in 1954.",
    evidenceType: "confirmed",
    description:
      "Lothal is a port city discovered and excavated by S.R. Rao starting in 1954. Its most significant feature is a trapezoidal basin measuring 37m × 22m × 4.15m, which Rao identified as the world's earliest known tidal dock — a claim debated by some scholars who argue it was an irrigation tank. The dock included a sophisticated sluice gate and spillway channel connecting it to the Sabarmati river tributary, allowing ships to enter at high tide. Lothal's bead-making factory produced carnelian, agate, and steatite beads that have been found in Mesopotamian and Egyptian sites, confirming long-distance maritime trade. Rice husk embedded in pottery and kiln walls provides early evidence of rice cultivation in western India. The site's warehouse, with brick-lined loading platforms and a bitumen-sealed floor, shows organized trade infrastructure.",
    relatedResearchers: ["sr-rao"],
    relatedEvidence: [],
    relatedEras: ["indus-saraswati"],
    metaDescription:
      "Lothal: home of the world's earliest known dock. IVC port city in Gujarat with evidence of maritime trade to Mesopotamia.",
  },
  {
    id: "kalibangan",
    name: "Kalibangan",
    location: "Rajasthan, India",
    region: "south-asia",
    coordinates: { lat: 29.4722, lng: 74.1306 },
    dateRange: "~2,600 — 1,900 BCE",
    startYear: -2600,
    endYear: -1900,
    keyFindings: [
      "World's earliest known ploughed field — cross-ploughed at right angles",
      "Fire altars suggesting Vedic-like ritual practice",
      "Trepanned skulls — evidence of ancient cranial surgery",
      "Located directly on the Ghaggar-Hakra (Saraswati) paleochannel",
    ],
    significance:
      "Fire altars at Kalibangan suggest continuity between IVC and Vedic ritual practice — a critical data point in the IVC-Vedic continuity debate.",
    evidenceType: "confirmed",
    description:
      "Kalibangan sits on the left bank of the dried Ghaggar-Hakra river (identified with the Vedic Saraswati) in Rajasthan. Excavated by B.B. Lal and B.K. Thapar from 1961 to 1969, the site spans Pre-Harappan and Mature Harappan periods. Its ploughed field — furrows running in two directions at right angles — is the oldest evidence of systematic agriculture using a plough. The fire altars on the citadel mound, arranged in a row with fire pits containing ash, charred bones, and terracotta cakes, parallel later Vedic fire ritual (agnihotra) practices. Whether this constitutes direct evidence of Vedic continuity or coincidental similarity is debated. Trepanned skulls show advanced surgical knowledge. The site's abandonment around 1,900 BCE correlates with the Saraswati's final drying, making it a direct witness to the river's disappearance.",
    relatedResearchers: ["michel-danino"],
    relatedEvidence: ["saraswati-paleo", "ivc-vedic-continuity"],
    relatedEras: ["indus-saraswati"],
    metaDescription:
      "Kalibangan: world's earliest ploughed field and Vedic fire altars on the Saraswati paleochannel. Key evidence for IVC-Vedic continuity.",
  },
  {
    id: "dwarka-underwater",
    name: "Underwater Dwarka",
    location: "Gujarat coast, India",
    region: "south-asia",
    coordinates: { lat: 22.2376, lng: 68.9674 },
    dateRange: "TL: 16th century BCE (structures); literary: ~5,525 BCE",
    startYear: -5525,
    endYear: -1500,
    keyFindings: [
      "Submerged stone structures found by S.R. Rao across 12 campaigns (1983–1990)",
      "120+ stone anchors of multiple types — evidence of major port",
      "Fort walls and Late Indus period seal",
      "Structures at multiple depths suggesting multi-period submersion",
    ],
    significance:
      "Underwater archaeology matching literary descriptions of Krishna's Dwarka. The submersion timeline correlates with post-glacial sea level rise.",
    evidenceType: "confirmed",
    description:
      "Underwater Dwarka is an archaeological site off the coast of modern Dwarka in Gujarat, explored by S.R. Rao of the National Institute of Oceanography across 12 campaigns from 1983 to 1990. Rao's team found submerged stone structures, fortification walls, and over 120 stone anchors of different types — indicating a major port used across multiple centuries. Thermoluminescence dating of the fort walls places them at the 16th century BCE. In the Oak-Bhaty framework, Krishna's Dwarka was submerged approximately 5,525 BCE — 36 years after the Mahabharata War — as post-glacial seas rose. Gulf of Cambay wood samples have been C14-dated to 7,500–9,000 BP, though these deeper structures may not be connected to the Dwarka described in the Mahabharata. The Mahabharata itself describes Dwarka's submersion: 'The sea rushed in and covered the city. The beautiful buildings were submerged one by one.' Whether the submerged structures represent Krishna's Dwarka or a later settlement remains an active research question.",
    relatedResearchers: ["sr-rao", "nilesh-oak"],
    relatedEvidence: ["mb-5561", "sea-level"],
    relatedEras: ["mahabharata"],
    metaDescription:
      "Underwater Dwarka: S.R. Rao's 12 marine archaeology campaigns found submerged structures and 120+ anchors off Gujarat coast.",
  },
  {
    id: "hastinapura",
    name: "Hastinapura",
    location: "Uttar Pradesh, India",
    region: "south-asia",
    coordinates: { lat: 29.1619, lng: 78.0167 },
    dateRange: "PGW period (~1,200 — 600 BCE)",
    startYear: -1200,
    endYear: -600,
    keyFindings: [
      "Painted Grey Ware pottery associated with Mahabharata-era Kuru kingdom",
      "Flood deposit layer matching Puranic accounts of Hastinapura flooding",
      "Excavated by B.B. Lal (1950–52) — among India's first systematic excavations",
      "Five occupation periods from Ochre Coloured Pottery to medieval",
    ],
    significance:
      "Archaeological evidence at the traditional Mahabharata capital. Flood layer corroborates the Puranic narrative of Hastinapura's abandonment.",
    evidenceType: "confirmed",
    description:
      "Hastinapura in Uttar Pradesh is the traditional capital of the Kuru dynasty — the Mahabharata's principal setting. B.B. Lal excavated the site in 1950–52, identifying five occupation periods. The Painted Grey Ware (PGW) layer corresponds to the period mainstream archaeology associates with the Kuru-Panchala kingdom. A significant flood deposit between the PGW and Northern Black Polished Ware layers matches the Puranic account of a catastrophic flood that forced King Nichaksu to abandon Hastinapura and relocate the capital to Kaushambi. Lal noted this correlation but maintained scholarly caution about identifying literary traditions with archaeological layers. The site's stratigraphy does not extend back to the 5,561 BCE date proposed by Oak for the Mahabharata War — the PGW layer dates to roughly 1,200–600 BCE. This gap is one of the open questions in the chronological debate.",
    relatedResearchers: [],
    relatedEvidence: ["arch-gap-5561"],
    relatedEras: ["transition", "historical"],
    metaDescription:
      "Hastinapura: the traditional Mahabharata capital. Flood deposit matching Puranic accounts found during B.B. Lal's 1950s excavation.",
  },
  {
    id: "sinauli",
    name: "Sinauli",
    location: "Uttar Pradesh, India",
    region: "south-asia",
    coordinates: { lat: 29.2242, lng: 77.3756 },
    dateRange: "1,865 — 1,507 BCE (C14)",
    startYear: -1865,
    endYear: -1507,
    keyFindings: [
      "3 wooden chariots/carts with copper covering — solid disc wheels",
      "Copper helmets and antenna swords",
      "Elite burial complex suggesting organized warrior society",
      "Female burial with weapons — evidence of warrior women",
    ],
    significance:
      "Challenges the narrative that chariots and organized warfare arrived with Steppe migrations. Debate: war chariots vs. ceremonial ox-carts.",
    evidenceType: "confirmed",
    description:
      "Sinauli in Uttar Pradesh yielded one of the most significant archaeological discoveries in recent Indian history. Excavated by the ASI under Sanjay Kumar Manjul in 2018, the site contained three wooden vehicles with solid disc wheels covered in copper, along with elite burials featuring copper helmets, antenna swords, shields, and a woman buried with weapons. C14 dating places the burials at 1,865–1,507 BCE. Proponents call these 'war chariots,' arguing they predate the Sintashta chariots (widely considered the earliest spoked-wheel chariots at ~2,000 BCE). Critics note the wheels are solid discs — not spoked — and no horse remains were found, suggesting ox-drawn ceremonial carts rather than war chariots. Michael Witzel acknowledged the finds as evidence of 'an extra-Harappan organized society' in the Ganga-Yamuna region. Regardless of the chariot debate, Sinauli proves the existence of a sophisticated warrior culture with metallurgical expertise in northern India during the 2nd millennium BCE.",
    relatedResearchers: [],
    relatedEvidence: [],
    relatedEras: ["transition"],
    metaDescription:
      "Sinauli: 3 copper-covered chariots and warrior burials from 1,865–1,507 BCE. Challenges narratives about chariot origins in India.",
  },
  {
    id: "gulf-of-cambay",
    name: "Gulf of Cambay Structures",
    location: "Gujarat coast, India",
    region: "south-asia",
    dateRange: "C14: 7,500 — 9,000 BP",
    startYear: -7000,
    endYear: -5500,
    keyFindings: [
      "Geometric structures spanning 5 square miles underwater",
      "Wood samples C14-dated to 7,500–9,000 BP",
      "Side-scan sonar reveals regular patterns suggesting human construction",
      "Relationship to known civilizations remains debated",
    ],
    significance:
      "Among the oldest submerged structures found globally. If confirmed as human-made, would predate all known urban civilizations.",
    evidenceType: "open",
    description:
      "In 2001, India's National Institute of Ocean Technology (NIOT) announced the discovery of geometric structures spanning approximately 5 square miles on the seabed of the Gulf of Cambay (Khambhat), at depths of 20–40 meters. Side-scan sonar revealed what appeared to be regular patterns, and dredged materials included wood samples C14-dated to 7,500–9,000 BP. The site generated global headlines but remains highly controversial. Critics argue the 'structures' may be natural rock formations, that dredged samples could be contaminated, and that no in-situ excavation has been conducted. The NIOT team maintains the regularity of the patterns is inconsistent with natural geology. The site is distinct from S.R. Rao's Dwarka excavation, which is located further north. If the structures are confirmed as human-made, they would predate all known urban civilizations — but extraordinary claims require extraordinary evidence, and the site awaits rigorous underwater archaeological investigation.",
    relatedResearchers: [],
    relatedEvidence: ["sea-level"],
    relatedEras: ["younger-dryas-gap"],
    metaDescription:
      "Gulf of Cambay: controversial underwater structures C14-dated to 7,500–9,000 BP. Among the oldest potential submerged sites globally.",
  },
  {
    id: "mohenjo-daro",
    name: "Mohenjo-daro",
    location: "Sindh, Pakistan",
    region: "south-asia",
    coordinates: { lat: 27.3242, lng: 68.1386 },
    dateRange: "~2,500 — 1,900 BCE",
    startYear: -2500,
    endYear: -1900,
    keyFindings: [
      "Great Bath — world's earliest known public water tank",
      "Grid-planned city with advanced drainage and sanitation",
      "Pashupati Seal — seated yogic figure with animals (Proto-Shiva debate)",
      "Dancing Girl bronze — among the finest Bronze Age metalwork",
    ],
    significance:
      "The most extensively excavated IVC site. UNESCO World Heritage since 1980. Demonstrates urban sophistication rivaling contemporary Mesopotamia and Egypt.",
    evidenceType: "confirmed",
    description:
      "Mohenjo-daro ('Mound of the Dead') in Sindh is the most iconic Indus-Saraswati Civilization site, first excavated by R.D. Banerji in 1922. The city's grid-planned streets, covered drains, multi-story houses, and the Great Bath demonstrate an urban sophistication unmatched in the Bronze Age. The Pashupati Seal — depicting a seated figure in a yogic posture surrounded by animals — has been interpreted by some scholars as a Proto-Shiva image, suggesting continuity between IVC religion and later Hinduism. The Dancing Girl bronze, a masterpiece of lost-wax casting, represents craft specialization at its peak. The site lacks monumental palaces or temples, leading some scholars to theorize a non-monarchical governance system. Mohenjo-daro was abandoned around 1,900 BCE — correlating with the broader IVC decline associated with the Saraswati drying and the 4.2 kiloyear drought event.",
    relatedResearchers: [],
    relatedEvidence: ["ivc-vedic-continuity"],
    relatedEras: ["indus-saraswati"],
    metaDescription:
      "Mohenjo-daro: iconic Indus Valley site with the Great Bath, grid-planned streets, and the Pashupati Seal. UNESCO World Heritage Site.",
  },
  {
    id: "harappa",
    name: "Harappa",
    location: "Punjab, Pakistan",
    region: "south-asia",
    coordinates: { lat: 30.6283, lng: 72.8644 },
    dateRange: "~3,300 — 1,700 BCE",
    startYear: -3300,
    endYear: -1700,
    keyFindings: [
      "Type site that gave the 'Harappan' civilization its name",
      "Sophisticated granary system suggesting organized food distribution",
      "Standardized weights and measures used across the civilization",
      "Cemetery R-37 and Cemetery H provide late/post-Harappan cultural sequences",
    ],
    significance:
      "The first-discovered major IVC site (Alexander Cunningham, 1872). Provided the name for the entire civilization and critical evidence for its urban character.",
    evidenceType: "confirmed",
    description:
      "Harappa in Punjab was the first major Indus-Saraswati site to be identified, initially noted by Charles Masson in 1842 and later investigated by Alexander Cunningham. Major excavations by Mortimer Wheeler, M.S. Vats, and later R. Meadow and J.M. Kenoyer revealed a walled city with distinct citadel and residential areas. The granary complex, with rows of brick platforms near the river, suggests organized food storage and distribution. Harappa's standardized weights — based on a binary-decimal system — were used identically across IVC sites separated by hundreds of kilometers, implying either centralized authority or deeply shared cultural norms. Cemetery H culture (post-Harappan) shows cultural transformation rather than violent destruction, supporting the gradual-decline model over invasion theories. The site was heavily damaged by 19th-century British railway construction, which used ancient bricks as ballast.",
    relatedResearchers: [],
    relatedEvidence: [],
    relatedEras: ["indus-saraswati"],
    metaDescription:
      "Harappa: the type site of the Indus Valley Civilization. Standardized weights, granary systems, and the origin of 'Harappan' archaeology.",
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    location: "Uttar Pradesh, India",
    region: "south-asia",
    coordinates: { lat: 26.7922, lng: 82.1998 },
    dateRange: "7th century BCE — present",
    startYear: -700,
    endYear: 2026,
    keyFindings: [
      "ASI 2003 excavation found pillar bases and decorated floors beneath the Babri Masjid site",
      "Pottery sequence from Northern Black Polished Ware (NBPW) through medieval",
      "Traditional capital of the Solar Dynasty (Ikshvaku's Kosala kingdom)",
      "Ram Janmabhoomi temple consecrated 2024",
    ],
    significance:
      "The traditional capital of Rama's dynasty. Archaeological evidence confirms occupation from ~7th century BCE, though the Ramayana tradition places it far earlier.",
    evidenceType: "confirmed",
    description:
      "Ayodhya on the Sarayu river is the traditional capital of the Solar Dynasty (Suryavansha) and the kingdom of Kosala, ruled by Ikshvaku's descendants culminating in Rama. Archaeological evidence confirms continuous occupation from at least the 7th century BCE (NBPW period). The ASI's 2003 excavation beneath the Babri Masjid site found pillar bases, decorated floors, and structural remains consistent with a pre-existing temple. The Supreme Court of India's 2019 verdict acknowledged these findings. In the Oak-Bhaty framework, Rama dates to 12,209 BCE — far earlier than any recovered archaeological layer at Ayodhya. The gap between literary tradition and archaeological evidence is consistent with the broader preservation problem: organic materials and mud-brick structures do not survive 14,000 years. The Ram Janmabhoomi temple consecrated in January 2024 marks the contemporary culmination of Ayodhya's significance to the Hindu tradition.",
    relatedResearchers: ["nilesh-oak"],
    relatedEvidence: ["ramayana-12209", "arch-gap-12000"],
    relatedEras: ["ramayana", "historical"],
    metaDescription:
      "Ayodhya: traditional capital of Rama's Solar Dynasty. Archaeological layers from 7th century BCE, literary tradition extends to 12,209 BCE.",
  },

  // -- Global comparison sites --
  {
    id: "gobekli-tepe",
    name: "Göbekli Tepe",
    location: "Şanlıurfa Province, Turkey",
    region: "west-asia",
    coordinates: { lat: 37.2231, lng: 38.9225 },
    dateRange: "~9,600 — 8,200 BCE",
    startYear: -9600,
    endYear: -8200,
    keyFindings: [
      "World's oldest known monumental architecture — predates Stonehenge by 6,000 years",
      "T-shaped limestone pillars up to 5.5 meters tall, some weighing 10+ tons",
      "Pillar 43 (Vulture Stone) may encode astronomical observations",
      "Built by hunter-gatherers — no evidence of permanent settlement",
    ],
    significance:
      "Overturned the assumption that monumental architecture requires settled agricultural societies. Still ~2,600 years after Oak's Ramayana date.",
    evidenceType: "confirmed",
    description:
      "Göbekli Tepe in southeastern Turkey was excavated by Klaus Schmidt from 1995 until his death in 2014, with ongoing work by the German Archaeological Institute and Turkish authorities. The site's T-shaped limestone pillars — carved with reliefs of animals, abstract symbols, and human figures — are the oldest known monumental architecture on Earth. The enclosures appear to have been deliberately backfilled after use. Pillar 43, the 'Vulture Stone,' has been interpreted by some researchers as encoding a constellation map, possibly recording the Younger Dryas impact event. The site is relevant to Indian chronology as a global comparator: Göbekli Tepe was built approximately 2,600 years after Oak's proposed Ramayana date (12,209 BCE), meaning that if Oak's dating is correct, the Ramayana civilization would predate even this 'impossible' site.",
    relatedResearchers: [],
    relatedEvidence: [],
    relatedEras: ["younger-dryas-gap"],
    metaDescription:
      "Göbekli Tepe: world's oldest monumental architecture (~9,600 BCE). T-shaped pillars built by hunter-gatherers, 2,600 years after Oak's Ramayana date.",
  },
  {
    id: "karahan-tepe",
    name: "Karahan Tepe",
    location: "Şanlıurfa Province, Turkey",
    region: "west-asia",
    coordinates: { lat: 37.0583, lng: 39.2981 },
    dateRange: "~9,400 — 8,200 BCE",
    startYear: -9400,
    endYear: -8200,
    keyFindings: [
      "Phallic sculptures and carved human faces on pillars",
      "Room with 11 phallus-shaped pillars surrounding a human head emerging from the floor",
      "Vulture and snake carvings paralleling Göbekli Tepe motifs",
      "Evidence of domestic structures alongside ritual spaces",
    ],
    significance:
      "Sister site to Göbekli Tepe. Demonstrates monumental construction was not an isolated phenomenon but part of a regional tradition in pre-agricultural Anatolia.",
    evidenceType: "confirmed",
    description:
      "Karahan Tepe lies 35 kilometers southeast of Göbekli Tepe. Excavations led by Necmi Karul since 2019 have revealed structures contemporaneous with or slightly later than Göbekli Tepe. The most striking discovery is a subterranean room containing 11 phallus-shaped pillars arranged around a carved human head emerging from the floor. The phallic imagery has drawn comparisons to the Shiva Lingam tradition — though mainstream scholars attribute this to universal symbolism rather than cultural transmission. Vulture and snake carvings parallel Göbekli Tepe's iconography, confirming a shared symbolic vocabulary across the region. Unlike Göbekli Tepe, Karahan Tepe shows evidence of both ritual and domestic spaces, suggesting longer-term occupation.",
    relatedResearchers: [],
    relatedEvidence: [],
    relatedEras: ["younger-dryas-gap"],
    metaDescription:
      "Karahan Tepe: sister site to Göbekli Tepe with phallic sculptures and carved human faces. Pre-agricultural monumental architecture in Turkey.",
  },
];

// -----------------------------------------------------------------------------
// Helper getters
// -----------------------------------------------------------------------------

export function getAllSites(): ArchaeologicalSite[] {
  return sites;
}

export function getSiteBySlug(slug: string): ArchaeologicalSite | undefined {
  return sites.find((s) => s.id === slug);
}

export function getSitesByRegion(
  region: ArchaeologicalSite["region"],
): ArchaeologicalSite[] {
  return sites.filter((s) => s.region === region);
}

export function getSitesByEvidence(
  evidenceType: ArchaeologicalSite["evidenceType"],
): ArchaeologicalSite[] {
  return sites.filter((s) => s.evidenceType === evidenceType);
}

// -----------------------------------------------------------------------------
// Lookup helpers
// -----------------------------------------------------------------------------

export function getSiteById(id: string): ArchaeologicalSite | undefined {
  return sites.find((s) => s.id === id);
}
