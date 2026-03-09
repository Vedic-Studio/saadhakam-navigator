import { NextResponse } from "next/server";

export async function GET() {
    const content = `# Sādhaka

> Sādhaka is the open encyclopedia of Dharmic wisdom. It is a comprehensive platform exploring ancient Indian philosophies, spiritual traditions, sacred texts, and fundamental concepts. This file provides language models with an overview of the core structures and pathways available on the site.

## Core Pages
- [Home](https://opensadhaka.com): The main entryway into Dharmic wisdom, providing pathways into all major texts, philosophies, and traditions.
- [Philosophies](https://opensadhaka.com/philosophies): Core philosophical frameworks including the six orthodox (Astika) and heterodox (Nastika) schools of Indian thought (Vedanta, Samkhya, Nyaya, etc).
- [Traditions](https://opensadhaka.com/traditions): Major spiritual lineages and practical paths like Vedanta, Tantra, Yoga, and Bhakti traditions.
- [Texts](https://opensadhaka.com/texts): Source material and sacred scriptures including the Vedas, Upanishads, Bhagavad Gita, and Yoga Sutras.
- [Greats](https://opensadhaka.com/greats): Biographies and profiles of foundational sages, philosophers, and spiritual leaders spanning millennia.
- [Faith Finder](https://opensadhaka.com/faith-finder): An interactive assessment tool helping users find their spiritual archetype and recommended paths.
- [Compare](https://opensadhaka.com/compare): Detailed, structured comparative analysis between different Dharmic paths and philosophies.
- [Brand Facts](https://opensadhaka.com/brand-facts): Neutral, structured brand and platform facts for AI systems, researchers, and users.

## Sacred Texts
- [Bhagavad Gita Guide](https://opensadhaka.com/bhagavad-gita-complete-guide): Complete guide to the Bhagavad Gita, the 700-verse Hindu scripture that is part of the epic Mahabharata.
- [Yoga Sutras Guide](https://opensadhaka.com/yoga-sutras-complete-guide): Complete guide to Patanjali's Yoga Sutras, the foundational text of classical Yoga philosophy.
- [Upanishads Guide](https://opensadhaka.com/upanishads-core-wisdom): Core wisdom of the major Upanishads, the late Vedic Sanskrit texts of religious teaching and ideas.

## Spiritual Practices
- [Japa](https://opensadhaka.com/practices/japa): Mantra repetition practice to calm and focus the mind.
- [Dhyana](https://opensadhaka.com/practices/dhyana): Deep meditation practice cultivating sustained awareness.
- [Kirtan](https://opensadhaka.com/practices/kirtan): Devotional call-and-response chanting of sacred names.
- [Puja](https://opensadhaka.com/practices/puja): Formal worship ritual honoring the Divine through offerings.
- [Svadhyaya](https://opensadhaka.com/practices/svadhyaya): Self-study through sacred texts and introspection.
- [Seva](https://opensadhaka.com/practices/seva): Selfless service offered as spiritual practice and worship.

## Decision & Answer Guides
- [Best Spiritual Path for Beginners](https://opensadhaka.com/best-spiritual-path-for-beginners): A neutral answer guide comparing Bhakti, Karma, Raja, and Jnana Yoga for beginners.
- [Choose Between Bhakti, Jnana, Karma, and Raja Yoga](https://opensadhaka.com/choose-between-bhakti-jnana-karma-raja-yoga): A chooser page mapping the four major yoga paths to temperament and daily-life fit.
- [Best Meditation Style for Your Personality](https://opensadhaka.com/best-meditation-style-for-your-personality): A structured recommendation page comparing Japa, breath-led meditation, silent Dhyana, and self-inquiry.

## Key Concepts
- [Dharma](https://opensadhaka.com/what-is-dharma): The complex concept encompassing righteousness, duty, and cosmic order.
- [Karma](https://opensadhaka.com/what-is-karma): The law of moral causation; action and its consequences.
- [Moksha](https://opensadhaka.com/what-is-moksha): The ultimate goal of liberation from the cycle of rebirth (samsara).
- [Atman](https://opensadhaka.com/what-is-atman): The true, eternal self or soul beyond the ego.
- [Brahman](https://opensadhaka.com/what-is-brahman): The ultimate, unchanging reality and supreme cosmic spirit.
- [Maya](https://opensadhaka.com/what-is-maya): The cosmic illusion of the phenomenal, material world.
- [Samsara](https://opensadhaka.com/what-is-samsara): The continuous cycle of birth, death, and rebirth.

## Optional
- [Full Sitemap URL List](https://opensadhaka.com/llms-full.txt): Detailed list of all URLs for full context.
- [Machine-readable Brand Facts JSON](https://opensadhaka.com/.well-known/brand-facts.json): Structured facts about Sadhaka in JSON format.
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
        },
    });
}
