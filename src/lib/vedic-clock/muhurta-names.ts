/**
 * Traditional 30 muhūrta names, as used on the Vikram Vaidika Ghaṭi (Vedic Ghadi)
 * at Kashi / Ujjain. Day muhūrtas 1–15 begin at local sunrise; night
 * muhūrtas 16–30 begin at sunset. Deities attributed from the Yājñavalkya-smṛti
 * /Atharva-Veda muhūrta lists (there is more than one attested ordering;
 * this follows the Kashi clock face).
 */

export interface MuhurtaName {
    name: string;
    devanagari: string;
    deity: string;
}

export const muhurtaNames: MuhurtaName[] = [
    // Day muhūrtas (1–15) — sunrise onward
    { name: "Rudra", devanagari: "रुद्र", deity: "Rudra" },
    { name: "Ahi", devanagari: "आहि", deity: "Serpent" },
    { name: "Mitra", devanagari: "मित्र", deity: "Mitra" },
    { name: "Pitra", devanagari: "पित्र्य", deity: "Pitṛs" },
    { name: "Vasu", devanagari: "वसु", deity: "Vasus" },
    { name: "Varaha", devanagari: "वराह", deity: "Varāha" },
    { name: "Vishvedeva", devanagari: "विश्वेदेव", deity: "Viśvedevas" },
    { name: "Vidhi", devanagari: "विधि", deity: "Brahmā" },
    { name: "Sutamukhi", devanagari: "सुतमुखी", deity: "Sarasvatī" },
    { name: "Puruhuta", devanagari: "पुरुहूत", deity: "Indra" },
    { name: "Vahini", devanagari: "वाहिनी", deity: "Agni" },
    { name: "Naktanakara", devanagari: "नक्तनकर", deity: "Yama" },
    { name: "Varuna", devanagari: "वरुण", deity: "Varuṇa" },
    { name: "Aryaman", devanagari: "अर्यमन्", deity: "Aryaman" },
    { name: "Bhaga", devanagari: "भग", deity: "Bhaga" },

    // Night muhūrtas (16–30) — sunset onward
    { name: "Girisha", devanagari: "गिरीश", deity: "Śiva" },
    { name: "Ajapada", devanagari: "अजपाद", deity: "Aja Ekapāda" },
    { name: "Ahirbudhnya", devanagari: "अहिर्बुध्न्य", deity: "Ahirbudhnya" },
    { name: "Pushya", devanagari: "पुष्य", deity: "Pūṣan" },
    { name: "Ashvini", devanagari: "अश्विनी", deity: "Aśvinī" },
    { name: "Yama", devanagari: "यम", deity: "Yama" },
    { name: "Agni", devanagari: "अग्नि", deity: "Agni" },
    { name: "Vidhatri", devanagari: "विधातृ", deity: "Vidhātṛ" },
    { name: "Kanda", devanagari: "कण्ड", deity: "Kaṇḍa" },
    { name: "Aditi", devanagari: "अदिति", deity: "Aditi" },
    { name: "Jiva", devanagari: "जीव", deity: "Amṛta" },
    { name: "Vishnu", devanagari: "विष्णु", deity: "Viṣṇu" },
    { name: "Dyumadgadyuti", devanagari: "द्युमद्गद्युति", deity: "Dyumat" },
    { name: "Brahma", devanagari: "ब्रह्म", deity: "Brahmā" },
    { name: "Samudra", devanagari: "समुद्र", deity: "Samudra" },
];

export function getMuhurtaName(index: number): MuhurtaName {
    return muhurtaNames[(index - 1) % 30] ?? muhurtaNames[0];
}
