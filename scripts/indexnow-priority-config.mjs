export const MAX_URLS_PER_REQUEST = 50;

export function getSiteOrigin() {
    return process.env.NEXT_PUBLIC_SITE_URL || "https://opensadhaka.com";
}

export function getPriorityGroups() {
    return {
        pillarHubs: [
            "/ancient-wisdom-philosophies",
            "/practical-spiritual-practices",
            "/sacred-texts-teachings",
            "/spiritual-traditions-paths",
            "/philosophies",
            "/traditions",
            "/texts",
            "/greats",
        ],
        knowledgeHubs: [
            "/compare",
            "/learn/sanskrit",
        ],
        chooserGuides: [
            "/best-spiritual-path-for-beginners",
            "/choose-between-bhakti-jnana-karma-raja-yoga",
            "/best-meditation-style-for-your-personality",
            "/spiritual-paths-explained",
            "/inquiry-vs-devotion-path",
            "/which-meditation-for-me",
            "/starting-spiritual-practice",
        ],
        concepts: [
            "/what-is-brahman",
            "/what-is-atman",
            "/what-is-dharma",
            "/what-is-karma",
            "/what-is-moksha",
            "/what-is-samsara",
            "/what-is-maya",
            "/what-is-bhakti",
            "/what-is-jnana",
            "/what-is-viveka",
            "/what-is-vairagya",
            "/what-is-samadhi",
            "/what-is-seva",
            "/what-is-guru",
            "/what-is-ishvara",
            "/what-is-avidya",
            "/what-is-jiva",
            "/what-is-karma-yoga",
            "/what-is-raja-yoga",
            "/what-is-advaita",
            "/what-is-niskama-karma",
            "/what-is-pranayama",
            "/what-is-mantra",
            "/what-is-japa",
            "/what-is-dhyana",
            "/what-is-dharana",
            "/what-is-sadhana",
            "/what-is-om",
            "/what-is-guna",
            "/what-is-avatara",
            "/what-is-tapas",
            "/what-is-lila",
            "/what-is-vedanta",
        ],
        sanskritLexicon: [
            "/learn/sanskrit/brahman",
            "/learn/sanskrit/atman",
            "/learn/sanskrit/dharma",
            "/learn/sanskrit/karma",
            "/learn/sanskrit/moksha",
            "/learn/sanskrit/prana",
            "/learn/sanskrit/mantra",
            "/learn/sanskrit/japa",
            "/learn/sanskrit/dhyana",
            "/learn/sanskrit/dharana",
            "/learn/sanskrit/sadhana",
            "/learn/sanskrit/om",
            "/learn/sanskrit/guna",
            "/learn/sanskrit/avatara",
            "/learn/sanskrit/tapas",
            "/learn/sanskrit/lila",
        ],
        comparisons: [
            "/difference-between-yoga-and-vedanta",
            "/shaivism-vs-vaishnavism",
            "/compare/advaita-vs-dvaita",
            "/compare/karma-vs-dharma",
            "/compare/atman-vs-brahman",
            "/compare/japa-vs-dhyana",
        ],
        prioritizedArticles: [
            "/what-is-vedanta",
            "/bhagavad-gita-complete-guide",
            "/yoga-sutras-complete-guide",
            "/advaita-vedanta-explained",
            "/how-to-start-japa",
            "/how-to-choose-a-mantra",
            "/daily-spiritual-routine-beginners",
            "/can-i-practice-vedanta-without-converting",
            "/can-i-chant-a-mantra-without-initiation",
            "/what-are-the-upanishads",
            "/best-bhagavad-gita-translation-for-beginners",
        ],
        scripture: [
            "/texts/bhagavad-gita",
            "/texts/yoga-sutras",
            "/texts/bhagavad-gita/chapter-1",
        ],
        trackBStotras: [
            "/stotras/shiva-tandava-stotram",
            "/stotras/shiva-tandava-stotram/verse-1",
            "/stotras/shiva-tandava-stotram/verse-2",
            "/stotras/shiva-tandava-stotram/verse-8",
            "/stotras/shiva-tandava-stotram/verse-16",
            "/stotras/vishnu-sahasranama",
            "/stotras/lalita-sahasranama",
        ],
    };
}

export function getPriorityUrls(siteOrigin = getSiteOrigin()) {
    const groups = getPriorityGroups();
    const paths = Array.from(new Set(Object.values(groups).flat()));
    return {
        groups,
        paths,
        urls: paths.map((path) => `${siteOrigin}${path}`),
    };
}

export function splitIntoBatches(urls, size = MAX_URLS_PER_REQUEST) {
    const batches = [];
    for (let index = 0; index < urls.length; index += size) {
        batches.push(urls.slice(index, index + size));
    }
    return batches;
}
