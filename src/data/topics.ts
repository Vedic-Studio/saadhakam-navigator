export interface Topic {
    slug: string;
    name: string;
    summary: string;
    content: string;
    recommendedPractices: string[]; // practice slugs
    recommendedTraditions: string[]; // tradition slugs
}

export const topics: Topic[] = [
    {
        slug: 'meditation',
        name: 'Meditation & Dhyana',
        summary: 'The systematic practice of training the mind to achieve heightened states of awareness, inner peace, and spiritual realization.',
        content: 'Meditation in the Sanatan Dharma context goes beyond simple stress relief. Known as Dhyana, it is the seventh limb of Ashtanga Yoga and the core practice for directly experiencing the nature of consciousness. Rather than emptying the mind, it involves single-pointed concentration (Dharana) that matures into a continuous flow of awareness toward the object of meditation.',
        recommendedPractices: ['dhyana', 'japa', 'yoga-sadhana'],
        recommendedTraditions: ['yoga', 'vedanta', 'shaivism'],
    },
    {
        slug: 'devotion',
        name: 'Devotion & Bhakti',
        summary: 'The path of emotional transmutation, channeling human love into pure devotion to the Divine.',
        content: 'Bhakti is the path of love and devotion. It recognizes that human emotions are powerful forces that, rather than being suppressed, can be sublimated and directed toward the Divine. Through practices like Kirtan (chanting) and Puja (ritual worship), the practitioner cultivates a deeply personal relationship with the Supreme.',
        recommendedPractices: ['kirtan', 'puja', 'vrat', 'japa'],
        recommendedTraditions: ['vaishnavism', 'shaktism', 'shaivism'],
    },
    {
        slug: 'action',
        name: 'Selfless Action & Karma Yoga',
        summary: 'The path of dedicating the fruits of one\'s work to the Divine, eliminating the ego through constant service.',
        content: 'Karma Yoga, extensively detailed by Lord Krishna in the Bhagavad Gita, is the practice of performing one\'s duty (Dharma) without attachment to the results. By offering the fruits of action to the Divine, work itself becomes a form of worship, purifying the heart and reducing the egoistic sense of "I am the doer."',
        recommendedPractices: ['seva', 'yoga-sadhana', 'svadhyaya'],
        recommendedTraditions: ['vedanta', 'yoga'],
    },
    {
        slug: 'knowledge',
        name: 'Wisdom & Jnana Yoga',
        summary: 'The intellectual path of self-inquiry, using discernment to distinguish the real from the unreal.',
        content: 'Jnana Yoga is the path of knowledge and wisdom. It involves intense self-inquiry (Atma-Vichara) and the study of sacred scriptures to directly experience the truth of one\'s identity. The core practice is Viveka (discernment) between the eternal soul (Atman) and the temporary material world.',
        recommendedPractices: ['svadhyaya', 'dhyana'],
        recommendedTraditions: ['vedanta', 'samkhya'],
    }
];

export function getTopicBySlug(slug: string): Topic | undefined {
    return topics.find((t) => t.slug === slug);
}
