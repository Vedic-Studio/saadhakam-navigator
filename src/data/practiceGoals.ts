export interface PracticeGoal {
    slug: string;
    name: string;
    summary: string;
    description: string;
}

export const practiceGoals: PracticeGoal[] = [
    {
        slug: 'anxiety',
        name: 'Anxiety Relief',
        summary: 'Approaches to calm an overactive mind and find sustained inner peace.',
        description: 'While not a medical treatment, many spiritual practices help regulate the nervous system and shift the practitioner into a state of present-moment awareness, reducing the mind\'s tendency to dwell on anxious futures.',
    },
    {
        slug: 'focus',
        name: 'Deep Focus & Concentration',
        summary: 'Techniques to build single-pointed attention (dharana) and mental clarity.',
        description: 'Cultivating single-pointed attention is the foundation of advanced meditation and leads to improved mental clarity and efficiency in daily life.',
    },
    {
        slug: 'spiritual-growth',
        name: 'Spiritual Growth',
        summary: 'Practices aimed directly at self-realization and deep inner transformation.',
        description: 'For seekers looking to deepen their connection with the Divine and understand their true spiritual nature.',
    },
    {
        slug: 'devotion',
        name: 'Cultivating Devotion',
        summary: 'Opening the heart center and developing a sweet, tender relationship with the divine.',
        description: 'Devotion (Bhakti) softens the intellectual mind, allowing the seeker to experience profound spiritual bliss and surrender.',
    },
    {
        slug: 'sleep',
        name: 'Restful Sleep',
        summary: 'Practices that prepare the mind and body for deep, restorative rest.',
        description: 'Certain calming practices done before bed help in detaching from the day\'s activities and settling the mind\'s thought waves (vrittis).',
    }
];

export function getPracticeGoalBySlug(slug: string): PracticeGoal | undefined {
    return practiceGoals.find(g => g.slug === slug);
}
