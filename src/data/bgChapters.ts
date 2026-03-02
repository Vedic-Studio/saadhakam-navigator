export interface BgChapter {
  chapterNumber: number;
  nameSanskrit: string;
  nameEnglish: string;
  summary: string;
  keyThemes: string[];
  yogaPath: string;
  totalVerses: number;
}

export const bgChapters: BgChapter[] = [
  {
    chapterNumber: 1,
    nameSanskrit: "अर्जुनविषादयोग",
    nameEnglish: "The Yoga of Arjuna's Dejection (Arjuna Vishada Yoga)",
    summary:
      "Setting the scene on the battlefield of Kurukshetra, Arjuna is overcome with grief and compassion upon seeing his relatives, teachers, and friends arrayed for battle. He drops his weapons, unable to fight.",
    keyThemes: ["Duty", "Dilemma", "Attachment", "Grief"],
    yogaPath: "Preparation for Yoga",
    totalVerses: 47,
  },
  {
    chapterNumber: 2,
    nameSanskrit: "साङ्ख्ययोग",
    nameEnglish: "The Yoga of Knowledge (Sankhya Yoga)",
    summary:
      "Krishna begins his teachings by explaining the eternal nature of the soul (Atman) and the temporary nature of the body. He introduces Karma Yoga—acting without attachment to the results.",
    keyThemes: [
      "Immortality of the Soul",
      "Duty",
      "Equanimity",
      "Sthitaprajna (The person of steady wisdom)",
    ],
    yogaPath: "Jnana & Karma Yoga",
    totalVerses: 72,
  },
  {
    chapterNumber: 3,
    nameSanskrit: "कर्मयोग",
    nameEnglish: "The Yoga of Action (Karma Yoga)",
    summary:
      "Krishna explains why one must perform their prescribed duties. He clarifies that action is superior to inaction and that the world is bound by action unless it is performed as a sacrifice.",
    keyThemes: ["Sacrifice", "Duty", "Setting an Example", "Overcoming Desire"],
    yogaPath: "Karma Yoga",
    totalVerses: 43,
  },
  {
    chapterNumber: 4,
    nameSanskrit: "ज्ञानकर्मसंन्यासयोग",
    nameEnglish: "The Yoga of Knowledge and the Disciplines of Action",
    summary:
      "Krishna reveals the ancient history of this spiritual science and explains the nature of His divine descent (Avatar). He describes how transcendental knowledge burns away karmic reactions.",
    keyThemes: [
      "Avatara (Divine Descent)",
      "Transcendental Knowledge",
      "Spiritual Sacrifice",
    ],
    yogaPath: "Jnana & Karma Yoga",
    totalVerses: 42,
  },
  {
    chapterNumber: 5,
    nameSanskrit: "कर्मसंन्यासयोग",
    nameEnglish: "The Yoga of Renunciation of Action",
    summary:
      "Krishna resolves the apparent conflict between renouncing work and working with devotion, explaining that acting in inner detachment and dedicating fruits to God is true renunciation.",
    keyThemes: [
      "True Renunciation",
      "Detachment",
      "Action in Inaction",
      "Inner Peace",
    ],
    yogaPath: "Karma Sanyasa",
    totalVerses: 29,
  },
  {
    chapterNumber: 6,
    nameSanskrit: "ध्यानयोग",
    nameEnglish: "The Yoga of Meditation (Dhyana Yoga)",
    summary:
      "Krishna outlines the practical steps of meditation (Dhyana), including lifestyle, posture, and concentration. He assures Arjuna that efforts in spiritual practice are never lost, even across lifetimes.",
    keyThemes: [
      "Meditation",
      "Mind Control",
      "Balance",
      "Reincarnation of a Yogi",
    ],
    yogaPath: "Dhyana/Raja Yoga",
    totalVerses: 47,
  },
  {
    chapterNumber: 7,
    nameSanskrit: "ज्ञानविज्ञानयोग",
    nameEnglish: "The Yoga of Knowledge and Wisdom",
    summary:
      "Krishna describes His material and spiritual energies holding the universe together. He identifies four types of pious people who surrender to Him and discusses the illusion of Maya.",
    keyThemes: [
      "Material & Spiritual Energy",
      "Maya (Illusion)",
      "Surrender",
      "The Four Types of Seekers",
    ],
    yogaPath: "Bhakti & Jnana",
    totalVerses: 30,
  },
  {
    chapterNumber: 8,
    nameSanskrit: "अक्षरब्रह्मयोग",
    nameEnglish: "The Yoga of the Imperishable Brahman",
    summary:
      "Krishna explains the significance of one's thoughts at the time of death and how to remember the Divine unceasingly to attain the supreme, imperishable abode.",
    keyThemes: [
      "Brahman",
      "Death and the Afterlife",
      "Cycles of Creation",
      "Yogic Remembrance",
    ],
    yogaPath: "Bhakti & Raja Yoga",
    totalVerses: 28,
  },
  {
    chapterNumber: 9,
    nameSanskrit: "राजविद्याराजगुह्ययोग",
    nameEnglish: "The Yoga of the Sovereign Science and Sovereign Secret",
    summary:
      "A profound chapter revealing the supreme, hidden knowledge of Krishna's absolute, all-pervading nature, emphasizing that pure devotion (Bhakti) is the direct path to liberation.",
    keyThemes: [
      "The Sovereign Secret",
      "Divine Sovereignty",
      "Unconditional Devotion",
      "Universal Grace",
    ],
    yogaPath: "Bhakti Yoga",
    totalVerses: 34,
  },
  {
    chapterNumber: 10,
    nameSanskrit: "विभूतियोग",
    nameEnglish: "The Yoga of Divine Manifestations (Vibhuti Yoga)",
    summary:
      "Krishna describes His opulent manifestations, showing how all beauty, power, and wisdom in the universe are merely a spark of His infinite glory.",
    keyThemes: [
      "Divine Opulence",
      "Manifestations of God in Nature",
      "The Source of All",
    ],
    yogaPath: "Bhakti Yoga",
    totalVerses: 42,
  },
  {
    chapterNumber: 11,
    nameSanskrit: "विश्वरूपदर्शनयोग",
    nameEnglish: "The Yoga of the Vision of the Cosmic Form",
    summary:
      "At Arjuna's request, Krishna reveals His awe-inspiring Cosmic Form (Vishvarupa), encompassing the entire universe, terrifying time, and infinite expanses.",
    keyThemes: [
      "The Cosmic Form",
      "Time as the Destroyer",
      "Total Surrender",
      "Triumph of Devotion",
    ],
    yogaPath: "Bhakti Yoga",
    totalVerses: 55,
  },
  {
    chapterNumber: 12,
    nameSanskrit: "भक्तियोग",
    nameEnglish: "The Yoga of Devotion (Bhakti Yoga)",
    summary:
      "Krishna explains the path of loving devotion, comparing the worship of His personal form to the worship of the formless infinite. He lists the qualities of a devotee dear to Him.",
    keyThemes: [
      "Ways to Worship",
      "Qualities of a True Devotee",
      "Love and Equanimity",
    ],
    yogaPath: "Bhakti Yoga",
    totalVerses: 20,
  },
  {
    chapterNumber: 13,
    nameSanskrit: "क्षेत्रक्षेत्रज्ञविभागयोग",
    nameEnglish: "The Yoga of Distinction Between the Field and the Knower",
    summary:
      "Krishna introduces the concepts of the Field (the physical body/matter) and the Knower of the Field (the soul/Paramatman), distinguishing between material nature and consciousness.",
    keyThemes: [
      "Prakriti and Purusha",
      "The Field (Kshetra)",
      "The Knower (Kshetrajna)",
      "True Knowledge",
    ],
    yogaPath: "Jnana Yoga",
    totalVerses: 34,
  },
  {
    chapterNumber: 14,
    nameSanskrit: "गुणत्रयविभागयोग",
    nameEnglish: "The Yoga of the Division of the Three Gunas",
    summary:
      "An exploration of the three modes of material nature (Gunas): Sattva (goodness), Rajas (passion), and Tamas (ignorance), explaining how they bind the soul and how to transcend them.",
    keyThemes: [
      "The Three Gunas",
      "Sattva, Rajas, and Tamas",
      "Transcending Material Nature",
    ],
    yogaPath: "Jnana Yoga",
    totalVerses: 27,
  },
  {
    chapterNumber: 15,
    nameSanskrit: "पुरुषोत्तमयोग",
    nameEnglish: "The Yoga of the Supreme Person (Purushottama Yoga)",
    summary:
      "Using the metaphor of an inverted banyan tree, Krishna describes the material world and the process of detachment. He identifies Himself as the Supreme Being beyond the fallible and infallible.",
    keyThemes: [
      "The Cosmic Tree",
      "Detachment",
      "The Supreme Person (Purushottama)",
    ],
    yogaPath: "Jnana & Bhakti",
    totalVerses: 20,
  },
  {
    chapterNumber: 16,
    nameSanskrit: "दैवासुरसम्पद्विभागयोग",
    nameEnglish: "The Yoga of Division Between Divine and Demonic Endowments",
    summary:
      "Krishna lists the divine qualities that lead to liberation and the demonic or materialistic qualities that lead to bondage and suffering, urging adherence to scriptural guidance.",
    keyThemes: [
      "Divine Nature",
      "Demonic Nature",
      "The Gates to Hell (Lust, Anger, Greed)",
      "Scriptural Authority",
    ],
    yogaPath: "Preparation for Yoga",
    totalVerses: 24,
  },
  {
    chapterNumber: 17,
    nameSanskrit: "श्रद्धात्रयविभागयोग",
    nameEnglish: "The Yoga of the Threefold Division of Faith",
    summary:
      "Krishna explains how faith, food, sacrifices, austerities, and charity are categorized according to the three Gunas (Sattva, Rajas, Tamas). Includes the explanation of 'Om Tat Sat'.",
    keyThemes: [
      "Faith according to Gunas",
      "Food and Temperament",
      "Types of Austerity",
      "Om Tat Sat",
    ],
    yogaPath: "Jnana Yoga",
    totalVerses: 28,
  },
  {
    chapterNumber: 18,
    nameSanskrit: "मोक्षसंन्यासयोग",
    nameEnglish: "The Yoga of Liberation by Renunciation",
    summary:
      "The conclusion of the Gita, summarizing all previous teachings. Krishna defines true renunciation (Tyaga), explains the mechanics of action, and delivers His supreme instruction: surrender wholly to Him.",
    keyThemes: [
      "Renunciation vs. Relinquishment",
      "The Mechanics of Action",
      "Understanding Duty",
      "Supreme Surrender",
    ],
    yogaPath: "Karma, Jnana & Bhakti Fusion",
    totalVerses: 78,
  },
];

export function getBgChapterByNumber(
  chapterNumber: number,
): BgChapter | undefined {
  return bgChapters.find((c) => c.chapterNumber === chapterNumber);
}
