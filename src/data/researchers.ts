// =============================================================================
// Researcher Profiles — Standalone pSEO-ready data file
// =============================================================================
// Extracted from history.ts and expanded with research dossier content.
// Source: docs/research/ancient-indian-timeline-research.md
// =============================================================================

// -----------------------------------------------------------------------------
// Interfaces
// -----------------------------------------------------------------------------

export interface ResearcherKeyTalk {
  title: string;
  url?: string;
  platform?: string;
}

export interface Researcher {
  id: string;
  name: string;
  title: string;
  affiliation: string;
  methodology: string;
  keyClaims: string[];
  majorWorks: string[];
  icon: string; // Lucide icon name
  blogUrl?: string;
  keyTalks?: ResearcherKeyTalk[];
  relatedSites: string[]; // site IDs
  relatedEvidence: string[]; // evidence IDs
  description: string; // 200-400 word expanded bio for pSEO page
  metaDescription: string; // SEO meta description
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export const researchers: Researcher[] = [
  {
    id: "nilesh-oak",
    name: "Nilesh Nilkanth Oak",
    title: "Archaeoastronomer",
    affiliation:
      "Adjunct Faculty, Institute of Advanced Sciences, Dartmouth, MA",
    methodology:
      "Extracts 200+ astronomical references from Sanskrit texts, simulates them in Voyager 4.5 / Stellarium, applies multi-constraint falsification.",
    keyClaims: [
      "Mahabharata war: 5561 BCE (215+ observations)",
      "Ramayana war: 12,209 BCE (345+ observations)",
      "Rigveda oldest mandalas: 22,000+ years ago",
      "Arundhati-Vasishtha observation eliminates all post-4508 BCE dates",
    ],
    majorWorks: [
      "When Did the Mahabharata War Happen? (2011)",
      "The Historic Rama (2014)",
      "Bhishma Nirvana (2018)",
      "Sugriva's Atlas (2024)",
    ],
    icon: "Telescope",
    blogUrl: "https://nileshoak.wordpress.com/",
    keyTalks: [
      {
        title: "Dating the Mahabharata War",
        platform: "Sangam Talks",
      },
      {
        title: "Archaeoastronomy and Ancient Indian Chronology",
        platform: "TEDxSCAC Pune",
      },
      {
        title: "When Did the Mahabharata Happen?",
        platform: "BeerBiceps / The Ranveer Show (TRS 393)",
      },
      {
        title: "Scientific Dating of the Ramayana & Mahabharata",
        platform: "BeerBiceps / The Ranveer Show (TRS 404)",
      },
      {
        title: "Archaeoastronomy of Ancient India",
        platform: "IIT Bombay",
      },
      {
        title: "Dating Ancient Indian Texts Using Astronomy",
        platform: "IIT Madras",
      },
    ],
    relatedSites: ["dwarka-underwater", "ayodhya", "hastinapura"],
    relatedEvidence: [
      "av-observation",
      "mb-5561",
      "ramayana-12209",
      "arch-gap-5561",
      "arch-gap-12000",
    ],
    description:
      "Nilesh Nilkanth Oak is an archaeoastronomer whose work has fundamentally reshaped the debate around ancient Indian chronology. A former technology professional, Oak turned to full-time research after recognizing that Sanskrit epics contain hundreds of precise astronomical observations that can be tested against the known mechanics of the solar system. His method is straightforward in principle and demanding in execution: extract every astronomical reference from a text, simulate the sky for candidate dates using planetarium software, and identify the date that satisfies the maximum number of observations simultaneously. His first book, When Did the Mahabharata War Happen? (2011), tested 215+ observations and proposed 5561 BCE — anchored by the Arundhati-Vasishtha observation, which mathematically eliminates all dates after 4508 BCE. The Historic Rama (2014) extended the method to the Valmiki Ramayana, testing 345+ references and proposing 12,209 BCE. Bhishma Nirvana (2018) added 300+ observations from the Bhishma Parva alone. His most recent work, Sugriva's Atlas (2024), analyzes 600+ geographic and astronomical observations from the Kishkindha Kanda, mapping Sugriva's search instructions onto real-world geography spanning from South America to the Alps. Oak's work is distinguished by its falsifiability: every claimed date can be checked by anyone with planetarium software. Critics who engage with the method must contend with the cumulative weight of hundreds of simultaneous observations rather than cherry-picking individual references. His collaboration with Rupa Bhaty on the Surya Siddhanta has extended the approach to India's oldest astronomical text.",
    metaDescription:
      "Nilesh Oak: archaeoastronomer who dated the Mahabharata to 5561 BCE and Ramayana to 12,209 BCE using 500+ astronomical observations from Sanskrit texts.",
  },
  {
    id: "rupa-bhaty",
    name: "Rupa Bhaty",
    title: "Archaeoastronomer, Architect",
    affiliation:
      "Adjunct Asst. Professor, School of Indic Studies, INADS",
    methodology:
      "Surya Siddhanta epoch analysis, IVC script research via ancient place-name encoding, Canopus pole position dating.",
    keyClaims: [
      "Multiple Surya Siddhanta update epochs identified (with Oak)",
      "IVC seals encode ancient place names using Sanskrit-based phonetics",
      "Agastya-Vindhya lore dates to 19,000–21,000 BCE",
      "Hora/weekday naming system originated in India",
    ],
    majorWorks: [
      "Ancient Updates to Surya-siddhanta (with Oak)",
      "Deciphering the Indus Script (2025)",
      "Tale of Three Cities (forthcoming)",
      "The Agastya Code (forthcoming)",
    ],
    icon: "Star",
    blogUrl: "https://rupabhaty.home.blog/",
    keyTalks: [
      {
        title: "Surya Siddhanta: Ancient Astronomical Updates",
        platform: "Sangam Talks",
      },
      {
        title: "Deciphering the Indus Script",
        platform: "Sangam Talks",
      },
      {
        title: "The Agastya Code and Canopus",
        platform: "IHAR Conference",
      },
    ],
    relatedSites: ["kalibangan", "dholavira", "rakhigarhi"],
    relatedEvidence: [
      "av-observation",
      "mb-5561",
      "ivc-vedic-continuity",
      "saraswati-paleo",
    ],
    description:
      "Rupa Bhaty is an archaeoastronomer and architect whose research spans the Surya Siddhanta, the Indus Valley script, and the astronomical encoding of ancient Indian lore. Trained as an architect, Bhaty brings a spatial-analytical sensibility to textual and archaeological evidence. Her collaboration with Nilesh Oak on the Surya Siddhanta identified multiple update epochs embedded within the text — timestamps where specific astronomical parameters (pole star positions, Earth's obliquity, planetary periods) were simultaneously satisfied. This work demonstrates that the Surya Siddhanta is not a single-author document but a living astronomical handbook updated across millennia. Bhaty's independent contribution to archaeoastronomy centers on the star Agastya (Canopus). The Vedic and Puranic lore about sage Agastya crossing the Vindhya mountains encodes the astronomical phenomenon of Canopus becoming visible above the Vindhya range from northern India — an event she dates to 19,000–21,000 BCE based on the star's changing declination due to precession. Her most ambitious work is Deciphering the Indus Script (2025), which proposes that Indus Valley seals encode ancient place names using a Sanskrit-based phonetic system. If validated, this would resolve one of archaeology's great unsolved problems while establishing linguistic continuity between the Indus-Saraswati Civilization and the Vedic tradition. She has also argued that the Hora system (the 24-hour division of the day named after planetary bodies) and the weekday naming convention originated in India rather than in Hellenistic Babylon, based on internal evidence in the Surya Siddhanta. Her forthcoming works, Tale of Three Cities and The Agastya Code, promise to extend her research into new territory.",
    metaDescription:
      "Rupa Bhaty: archaeoastronomer researching Surya Siddhanta epochs, Indus script decipherment, and the Agastya-Canopus dating framework (19,000–21,000 BCE).",
  },
  {
    id: "sr-rao",
    name: "S.R. Rao",
    title: "Marine Archaeologist",
    affiliation: "National Institute of Oceanography (NIO)",
    methodology:
      "Underwater archaeology. 12 campaigns at Dwarka (1983–1990). Discoverer of Lothal.",
    keyClaims: [
      "Submerged structures at Dwarka with 120+ stone anchors",
      "Fort walls TL-dated to 16th century BCE",
      "Lothal: world's earliest known dock",
    ],
    majorWorks: ["The Lost City of Dwaraka (1999)"],
    icon: "Anchor",
    relatedSites: ["dwarka-underwater", "lothal"],
    relatedEvidence: ["mb-5561", "sea-level"],
    description:
      "S.R. Rao was India's pioneering marine archaeologist and one of the most consequential figures in the archaeology of the Indus-Saraswati Civilization. His career spanned two landmark discoveries. In 1954, he discovered Lothal in Gujarat — a port city of the Indus-Saraswati Civilization featuring what he identified as the world's earliest known tidal dock. The trapezoidal basin, with its sluice gate and spillway channel, demonstrated that IVC engineers had mastered hydraulic design for maritime trade across the Arabian Sea to Mesopotamia. The bead-making workshops at Lothal confirmed long-distance craft specialization. Rao's second major contribution was the underwater exploration of Dwarka. Between 1983 and 1990, he led 12 campaigns off the coast of modern Dwarka in Gujarat, discovering submerged stone structures, fortification walls, and over 120 stone anchors of varying types — evidence of a major port used across centuries. Thermoluminescence dating of the fort walls placed them at the 16th century BCE, though the literary tradition associates Dwarka with Krishna and the Mahabharata era. His book The Lost City of Dwaraka (1999) synthesized the findings from these campaigns. Rao's work earned the First World Ship Trust Award for maritime archaeology. The structures at Dwarka remain the most extensively documented underwater archaeological site in India and a key data point in the debate over the historicity of the Mahabharata narrative. His discoveries at both Lothal and Dwarka demonstrated that the Indian subcontinent's maritime capabilities were far more sophisticated and ancient than previously assumed.",
    metaDescription:
      "S.R. Rao: marine archaeologist who discovered Lothal's ancient dock and led 12 underwater campaigns at Dwarka finding submerged structures and 120+ anchors.",
  },
  {
    id: "michel-danino",
    name: "Michel Danino",
    title: "Historian, Padma Shri (2017)",
    affiliation: "IIT Gandhinagar",
    methodology:
      "ISRO satellite imagery, isotope dating, and geology to trace the Saraswati river.",
    keyClaims: [
      "Traced Saraswati paleochannel from Shivalik foothills to Rann of Kachchh",
      "1,500+ Harappan sites along the dried Ghaggar-Hakra course",
      "IVC should be called 'Indus-Saraswati Civilization'",
    ],
    majorWorks: [
      "The Lost River: On the Trail of the Sarasvati (Penguin, 2010)",
    ],
    icon: "MapPin",
    relatedSites: ["kalibangan", "rakhigarhi", "dholavira"],
    relatedEvidence: ["saraswati-paleo", "ivc-vedic-continuity"],
    description:
      "Michel Danino is a French-born Indian historian and author who has made the Saraswati river question the center of his scholarly work. Born in France, Danino moved to India in 1977 and became an Indian citizen. His approach combines ISRO satellite imagery, geological field surveys, isotope dating, and literary analysis to build a comprehensive case for the existence and course of the Vedic Saraswati. His landmark book, The Lost River: On the Trail of the Sarasvati (Penguin, 2010), traces the Saraswati's paleochannel from its source in the Shivalik foothills through Haryana, Rajasthan, and Gujarat to the Rann of Kachchh. Danino documents over 1,500 Harappan-era sites along this dried riverbed — more than along the Indus itself — arguing that the civilization should be renamed the 'Indus-Saraswati Civilization' to reflect its actual geographic center of gravity. This is not merely a naming dispute: it bears directly on the question of whether the Rigvedic Saraswati descriptions refer to a real river known to the composers, which in turn constrains the date of Rigvedic composition to before the river's final drying around 1900 BCE. Danino was awarded the Padma Shri in 2017 for his contributions to literature and education. He has taught at IIT Gandhinagar and written extensively on Indian civilization, technology, and cultural continuity. His work is characterized by careful synthesis of multiple evidence streams — satellite data, geological surveys, archaeological distribution patterns, and textual references — rather than reliance on any single method.",
    metaDescription:
      "Michel Danino: Padma Shri historian who traced the Saraswati paleochannel using ISRO imagery. Author of The Lost River (Penguin, 2010).",
  },
  {
    id: "raj-vedam",
    name: "Raj Vedam",
    title: "Researcher, Educator",
    affiliation:
      "Co-founder IHAR (Indian History Awareness and Research), Houston. Faculty, Hindu University of America.",
    methodology:
      "Cross-civilizational evidence synthesis. 200+ public talks on ancient Indian contributions to sciences and mathematics.",
    keyClaims: [
      "Ancient Indian contributions to sciences/math impacted civilizations globally",
      "Standard chronological framework for Indian history is distorted",
    ],
    majorWorks: [
      "Indian Civilization: The Untold Story (Sangam Talks)",
    ],
    icon: "Globe",
    relatedSites: [],
    relatedEvidence: ["ivc-vedic-continuity"],
    description:
      "Raj Vedam is a researcher, educator, and co-founder of the Indian History Awareness and Research (IHAR) organization based in Houston. He also serves as faculty at the Hindu University of America. Vedam's primary contribution is the synthesis of evidence from multiple civilizations to demonstrate the global impact of ancient Indian knowledge systems. Through over 200 public talks and presentations, he has documented how Indian contributions to mathematics, astronomy, metallurgy, medicine, and navigation influenced civilizations across Asia, the Middle East, and Europe — contributions that he argues have been systematically downplayed or misattributed in the standard historical narrative. His most widely circulated work is the Sangam Talks series 'Indian Civilization: The Untold Story,' which presents a comprehensive counter-narrative to the colonial-era chronological framework that still dominates Indian history textbooks. Vedam argues that this framework, constructed largely by 18th- and 19th-century European scholars working with limited data and significant cultural biases, compressed Indian chronology to fit within a Biblical timeline and attributed Indian achievements to external sources wherever possible. His method draws on archaeological, textual, genetic, astronomical, and linguistic evidence from Indian, Chinese, Greek, Roman, and Islamic sources. Rather than focusing on a single dating question (as Oak does with archaeoastronomy), Vedam builds a broad evidentiary mosaic that challenges the coherence of the standard narrative across multiple domains simultaneously. His work through IHAR has also focused on education and community engagement, making academic research accessible to the Indian diaspora.",
    metaDescription:
      "Raj Vedam: co-founder of IHAR Houston, researcher documenting ancient Indian contributions to global science and challenging distorted chronological frameworks.",
  },
  {
    id: "sanjeev-sanyal",
    name: "Sanjeev Sanyal",
    title: "Economist, Rhodes Scholar",
    affiliation: "Principal Economic Adviser to Government of India",
    methodology:
      "Complex Adaptive System framework applied to Indian Ocean civilizational history. Geographic and economic lens.",
    keyClaims: [
      "Indian Ocean as a connected civilizational system",
      "Geographic/economic factors drove civilizational development patterns",
    ],
    majorWorks: [
      "Land of the Seven Rivers (2013)",
      "The Ocean of Churn (2017)",
    ],
    icon: "BookMarked",
    relatedSites: ["lothal", "dwarka-underwater"],
    relatedEvidence: ["saraswati-paleo", "sea-level"],
    description:
      "Sanjeev Sanyal is an economist, Rhodes Scholar, and Principal Economic Adviser to the Government of India whose popular history books have brought the geographic and economic dimensions of Indian civilization to a wide readership. His approach differs fundamentally from the text-centered or archaeology-centered methods of other researchers on this list: Sanyal applies the framework of Complex Adaptive Systems — borrowed from economics and ecology — to understand how civilizations develop, interact, and evolve over millennia. His first history book, Land of the Seven Rivers (2013), reframes Indian history through its geography. The 'seven rivers' of the title (the sapta sindhava of the Rigveda) provide the backbone for a narrative that traces how river systems, monsoon patterns, coastlines, and mountain passes shaped settlement, trade, and cultural development from the earliest times through the colonial period. The book treats the Saraswati question seriously, drawing on geological evidence for the river's paleochannel and its implications for the dating of Rigvedic composition. The Ocean of Churn (2017) expands the lens to the entire Indian Ocean rim, arguing that this body of water functioned as a connected civilizational system — not a barrier between separate cultures. Sanyal traces maritime trade networks from Lothal and Dwarka through the Arabian Sea, the East African coast, Southeast Asia, and China, showing how goods, ideas, genes, and technologies circulated continuously across this network for millennia. His writing is accessible and energetic, aimed at the general reader rather than the academic specialist, which has earned both a wide audience and criticism from those who find his treatment of complex topics insufficiently nuanced.",
    metaDescription:
      "Sanjeev Sanyal: economist applying Complex Adaptive Systems to Indian Ocean history. Author of Land of the Seven Rivers and The Ocean of Churn.",
  },
  {
    id: "pv-vartak",
    name: "P.V. Vartak",
    title: "Pioneer in Astronomical Dating",
    affiliation: "Independent Researcher, Pune",
    methodology:
      "Precession of equinoxes, tithi calculations, nakshatra positions, and planetary configurations to date epic events.",
    keyClaims: [
      "First to propose 5561 BCE for the Mahabharata War",
      "Rama's birth date: 7323 BCE (December 4)",
      "Pioneered the multi-observation falsification approach later refined by Oak",
    ],
    majorWorks: [
      "The Scientific Dating of the Mahabharata War (1st ed. Pune, revised 2004)",
    ],
    icon: "Award",
    relatedSites: ["hastinapura"],
    relatedEvidence: ["mb-5561", "av-observation"],
    description:
      "P.V. Vartak is the pioneer who first proposed 5561 BCE as the date for the Mahabharata War — the same date that Nilesh Oak later validated, refined, and brought to a global audience through rigorous multi-observation testing. Working in Pune decades before planetarium software made astronomical simulation accessible, Vartak used manual calculations of precession, tithi (lunar day) sequences, nakshatra (lunar mansion) positions, and planetary configurations to test dates against the astronomical observations embedded in the Mahabharata text. His book, The Scientific Dating of the Mahabharata War, first published in Pune and revised in 2004, laid the foundational methodology that the next generation of archaeoastronomers would build upon. Vartak also proposed 7323 BCE (December 4) as Rama's birth date based on astronomical references in the Valmiki Ramayana, though Oak's later and more comprehensive analysis of 345+ observations yielded the date 12,209 BCE. The difference illustrates the progression of the field: Vartak worked with a smaller set of observations and without computerized simulation, yet arrived at dates within the same deep-antiquity framework. His contribution is not diminished by subsequent refinement — it is the foundation upon which the entire modern archaeoastronomical dating project rests. Oak has publicly acknowledged Vartak's pioneering role and the intellectual debt owed to his work. In the history of Indian chronological research, Vartak occupies the position of the trailblazer who demonstrated that astronomical dating of Sanskrit epics was a viable scientific program, not merely speculation.",
    metaDescription:
      "P.V. Vartak: pioneer who first proposed 5561 BCE for the Mahabharata War using astronomical calculations. Foundation for modern archaeoastronomical dating.",
  },
  {
    id: "bn-achar",
    name: "B.N. Narahari Achar",
    title: "Physicist",
    affiliation: "University of Memphis (deceased)",
    methodology:
      "Planetarium software (SkyMap Pro) simulation of astronomical references. Focus on eclipse patterns and planetary positions.",
    keyClaims: [
      "Mahabharata War: 3067 BCE (based on triple eclipse pattern)",
      "Triple eclipses: lunar Sep 29, solar Oct 14, lunar Oct 28, 3067 BCE",
      "Bhishma's Nirvana: January 17, 3066 BCE",
    ],
    majorWorks: [
      "Date of the Mahabharata War Based on Simulations Using Planetarium Software (2003)",
    ],
    icon: "Calculator",
    relatedSites: ["hastinapura"],
    relatedEvidence: ["mb-5561", "av-observation"],
    description:
      "B.N. Narahari Achar was a physicist at the University of Memphis who applied planetarium software to the dating of the Mahabharata War — one of the earliest researchers to use computerized astronomical simulation for this purpose. Using SkyMap Pro, Achar identified a triple eclipse pattern in the Mahabharata text and found a match at 3067 BCE: a lunar eclipse on September 29, a solar eclipse on October 14, and a second lunar eclipse on October 28. He proposed this date as the Mahabharata War and placed Bhishma's Nirvana on January 17, 3066 BCE. Achar's work is significant both for its method and for the date it produced. The 3067 BCE date falls outside the Arundhati-Vasishtha (AV) observation window identified by Oak. The AV observation — Alcor walking ahead of Mizar — occurred only between 11,091 and 4,508 BCE. Since 3067 BCE is after this window closes, Oak argues that Achar's date is falsified by this single observation, regardless of how well it matches other references. Achar's response was to question the interpretation of the AV verse, arguing that it does not necessarily describe the astronomical phenomenon Oak claims. This disagreement illustrates a key methodological divide: Oak insists on satisfying all observations simultaneously (multi-constraint approach), while Achar prioritized a smaller set of what he considered the most reliable references. Achar's 3067 BCE date remains the most prominent alternative to Oak's 5561 BCE within the astronomical dating community and is often cited in academic discussions of the question. His use of computerized simulation also helped establish the methodological standard that subsequent researchers, including Oak, would adopt and extend.",
    metaDescription:
      "B.N. Narahari Achar: physicist who proposed 3067 BCE for the Mahabharata War using SkyMap Pro eclipse simulations. Key alternative to Oak's 5561 BCE date.",
  },
  {
    id: "rn-iyengar",
    name: "R.N. Iyengar",
    title: "Structural Engineer, Historian of Indian Astronomy",
    affiliation: "Indian Institute of Science, Bangalore",
    methodology:
      "Systematic double-eclipse verification across 2,500-year windows. Rigorous filtering of astronomical references against textual reliability criteria.",
    keyClaims: [
      "Mahabharata War: 1493–1443 BCE range",
      "Systematic double eclipse verification for all candidates 501–3000 BCE",
      "Identifies textual interpolation as a confounding factor in astronomical dating",
    ],
    majorWorks: [
      "Internal Consistency of Eclipses and Planetary Positions in Mahabharata (IJHS, 2003)",
    ],
    icon: "Search",
    relatedSites: ["hastinapura"],
    relatedEvidence: ["mb-5561", "av-observation", "arch-gap-5561"],
    description:
      "R.N. Iyengar is a structural engineer and historian of Indian astronomy at the Indian Institute of Science, Bangalore, whose work on Mahabharata dating represents the most methodologically cautious approach among the astronomical daters. His 2003 paper in the Indian Journal of History of Science, 'Internal Consistency of Eclipses and Planetary Positions in Mahabharata,' systematically tested every pair of eclipses described in the text against computed eclipse data for the window 501–3000 BCE. His conclusion — a date range of 1493–1443 BCE — is far more recent than both Oak's 5561 BCE and Achar's 3067 BCE. Iyengar's approach differs from Oak's in a critical respect: he applies textual-critical filters before astronomical testing. Where Oak treats the Mahabharata's astronomical references as a unified dataset to be tested simultaneously, Iyengar argues that the text as we have it contains interpolations — later additions and modifications accumulated over centuries of transmission. He therefore restricts his analysis to references he considers textually reliable, discarding those that may be later insertions. This methodological choice dramatically narrows the dataset and yields correspondingly different dates. From Oak's perspective, Iyengar's approach is flawed because it introduces subjective textual judgments that pre-filter the evidence before testing. From Iyengar's perspective, Oak's approach is flawed because it treats an edited, multi-layered text as if every astronomical reference were original to a single composition. The disagreement between these two approaches illuminates a fundamental challenge in using astronomical methods on ancient texts: the results are only as good as the assumptions about textual integrity. Iyengar's date range aligns more closely with mainstream archaeological chronology, which is either a point in its favor or a sign that it has been constrained by the same assumptions it should be testing.",
    metaDescription:
      "R.N. Iyengar: IISc researcher proposing 1493-1443 BCE for the Mahabharata via systematic eclipse verification. Textual-critical astronomical dating.",
  },
  {
    id: "graham-hancock",
    name: "Graham Hancock",
    title: "Author, Journalist",
    affiliation: "Independent Author, UK",
    methodology:
      "Archaeological anomalies, myth analysis, catastrophism framework. Cross-cultural comparison of flood myths and megalithic traditions.",
    keyClaims: [
      "Advanced pre-Ice Age civilization existed and was destroyed by cataclysm",
      "Dwarka and Kumari Kandam represent submerged evidence of this civilization",
      "Mainstream archaeology systematically ignores anomalous evidence",
      "Younger Dryas impact event destroyed a sophisticated global civilization",
    ],
    majorWorks: [
      "Fingerprints of the Gods (1995)",
      "Underworld: The Mysterious Origins of Civilization (2002)",
      "Magicians of the Gods (2015)",
      "America Before (2019)",
      "Ancient Apocalypse (Netflix, 2022–2024)",
    ],
    icon: "Search",
    relatedSites: ["dwarka-underwater", "gulf-of-cambay", "gobekli-tepe"],
    relatedEvidence: ["sea-level", "arch-gap-12000"],
    description:
      "Graham Hancock is a British author and journalist whose books on lost civilizations have sold millions of copies and sparked intense debate between alternative history proponents and mainstream archaeologists. His relevance to the Indian chronology discussion centers on Underworld: The Mysterious Origins of Civilization (2002), which dedicated substantial chapters to Dwarka, the Gulf of Cambay structures, and the Tamil tradition of Kumari Kandam — a landmass said to have been submerged south of India. Hancock dove with marine archaeologists at Dwarka and explored submerged sites along the Indian coast, bringing global attention to S.R. Rao's underwater discoveries. His broader thesis — that an advanced civilization existed before the Younger Dryas catastrophe and was largely destroyed by the resulting floods — resonates with the deep dates proposed by Oak and Bhaty, though the methodologies are fundamentally different. Oak's approach is astronomical and falsifiable: specific observations yield specific dates that anyone can verify with planetarium software. Hancock's approach relies on pattern recognition across myths, megalithic anomalies, and geological evidence — compelling as narrative but difficult to falsify in the same way. His Netflix series Ancient Apocalypse (2022–2024) brought these ideas to a massive audience and drew sharp criticism from academic archaeologists, particularly the Society for American Archaeology. For the Indian chronology researcher, Hancock provides useful global context — his documentation of post-glacial sea level rise and its implications for coastal archaeology is directly relevant — but his claims operate at a lower evidentiary standard than the astronomical dating methods used by the Indian researchers on this list.",
    metaDescription:
      "Graham Hancock: author of Fingerprints of the Gods and Underworld. Covered Dwarka and Indian submerged sites in his lost civilization thesis.",
  },
  {
    id: "robert-schoch",
    name: "Robert Schoch",
    title: "Geologist",
    affiliation: "PhD Geology, Yale University. Faculty, Boston University.",
    methodology:
      "Geological and seismic analysis of ancient monuments. Water erosion patterns, seismic surveys, comparative weathering analysis.",
    keyClaims: [
      "Great Sphinx enclosure shows water erosion, not wind erosion",
      "Sphinx dates to minimum 9700 BCE based on erosion patterns",
      "Seismic surveys confirm deeper weathering than Khafre-era construction allows",
    ],
    majorWorks: [
      "Voices of the Rocks: A Scientist Looks at Catastrophes and Ancient Civilizations (1999)",
      "Forgotten Civilization: The Role of Solar Outbursts in Our Past and Future (2012)",
    ],
    icon: "Mountain",
    relatedSites: ["gobekli-tepe"],
    relatedEvidence: ["sea-level"],
    description:
      "Robert Schoch is a geologist with a PhD from Yale University and a faculty position at Boston University whose re-dating of the Great Sphinx has made him one of the most prominent figures in the debate over pre-dynastic civilizations. In 1990, Schoch conducted a geological and seismic survey of the Sphinx enclosure at Giza and concluded that the erosion patterns on the walls were caused by water — specifically, prolonged rainfall — rather than wind and sand. Since Egypt's climate shifted from wet to arid around 5000 BCE (and was significantly wetter before 9000 BCE), Schoch argued that the Sphinx enclosure must have been carved no later than 9700 BCE and possibly earlier. His seismic surveys found deeper subsurface weathering than would be expected if the enclosure were carved during Khafre's reign (circa 2500 BCE). The mainstream counter-argument, advanced most prominently by Egyptologist Mark Lehner, holds that the archaeological sequencing at Giza does not permit a pre-Khafre date for the Sphinx, and that the erosion patterns can be explained by other mechanisms including salt weathering and poor-quality limestone. Schoch's relevance to Indian chronology research is as a global comparator. If the Sphinx genuinely dates to 9700 BCE or earlier, it provides an independent data point for the existence of sophisticated construction capabilities in the pre-Younger Dryas world — the same period in which Oak places the Ramayana (12,209 BCE). Schoch does not work on Indian sites, but his geological approach and willingness to challenge established chronologies parallel the methodological stance of the Indian archaeoastronomers. His later work on solar outbursts and their role in civilizational disruption also connects to the Younger Dryas catastrophism framework.",
    metaDescription:
      "Robert Schoch: Yale geologist who re-dated the Great Sphinx to 9700+ BCE based on water erosion evidence. Global comparator for deep Indian chronology.",
  },
  {
    id: "manogna-sastry",
    name: "Manogna Sastry",
    title: "Astrophysicist",
    affiliation: "Team Leader Research, Infinity Foundation India",
    methodology:
      "Systematic chronological analysis of Indian history through three key problems: the Aryan Question, Buddha's date, and China-Bharata connections.",
    keyClaims: [
      "ABC of Indian Chronology: Aryan Problem, Buddha's Date, China-Bharata connections",
      "Buddha's date as terminus ante quem at 546 BCE constrains all upstream dating",
      "Chinese sources corroborate Indian chronological claims independently",
    ],
    majorWorks: [
      "ABC of Indian Chronology (Infinity Foundation India research series)",
    ],
    icon: "Atom",
    relatedSites: [],
    relatedEvidence: ["ivc-vedic-continuity"],
    description:
      "Manogna Sastry is an astrophysicist serving as Team Leader for Research at Infinity Foundation India, the research organization founded by Rajiv Malhotra. Her work focuses on what she calls the 'ABC of Indian Chronology' — three interconnected problems whose resolution determines the entire framework of Indian historical dating. The 'A' is the Aryan Problem: the question of whether Indo-Aryan languages and culture originated within the Indian subcontinent or were brought by migrants from the Central Asian steppes. The resolution of this question determines whether the Vedic period is placed before or after the Indus-Saraswati Civilization. The 'B' is Buddha's Date: the dating of Gautama Buddha's life, which Sastry argues serves as a terminus ante quem (latest possible date) for all earlier Indian history. If Buddha lived around 546 BCE, as the long chronology suggests, then the entire sequence of dynasties, texts, and events upstream must fit before that date — a constraint that compresses or expands depending on which Buddha date is accepted. The short chronology (483 BCE) gives less room; the long chronology (546 BCE) gives more. The 'C' is China-Bharata Connections: the independent corroboration of Indian historical claims through Chinese sources. Chinese pilgrims (Faxian, Xuanzang, Yijing) recorded Indian dynasties, institutions, and geographic details that provide external verification for the Indian tradition's internal chronology. Sastry's contribution is methodological rather than site-specific: she provides the logical framework within which individual dating claims (Oak's astronomical dates, Rao's underwater archaeology, Danino's Saraswati evidence) either cohere or conflict. Her astrophysics training brings quantitative rigor to what is often treated as a purely historical or literary question.",
    metaDescription:
      "Manogna Sastry: astrophysicist at Infinity Foundation India researching ABC of Indian Chronology -- Aryan problem, Buddha's date, China-Bharata links.",
  },
];

// -----------------------------------------------------------------------------
// Helper getters
// -----------------------------------------------------------------------------

export function getAllResearchers(): Researcher[] {
  return researchers;
}

export function getResearcherBySlug(
  slug: string,
): Researcher | undefined {
  return researchers.find((r) => r.id === slug);
}

// -----------------------------------------------------------------------------
// Lookup helpers
// -----------------------------------------------------------------------------

export function getResearcherById(id: string): Researcher | undefined {
  return researchers.find((r) => r.id === id);
}
