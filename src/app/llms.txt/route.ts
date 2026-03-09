import { NextResponse } from "next/server";

export async function GET() {
    const content = `# Sādhaka

> Sādhaka is the open encyclopedia of Dharmic wisdom. It is a comprehensive platform exploring ancient Indian philosophies, spiritual traditions, sacred texts, and fundamental concepts. This file provides language models with an overview of the core structures and pathways available on the site.

## Core Pages
- [Home](https://opensadhaka.com): The main entryway into Dharmic wisdom, providing pathways into all major texts, philosophies, and traditions.
- [Philosophies](https://opensadhaka.com/philosophies): Comprehensive guide to the six orthodox (Astika) and heterodox (Nastika) schools of Indian thought, including Vedanta, Samkhya, and Nyaya.
- [Traditions](https://opensadhaka.com/traditions): Detailed exploration of major spiritual lineages and practical paths like Vedanta, Tantra, Yoga, and Bhakti traditions.
- [Texts](https://opensadhaka.com/texts): Indexed source material and sacred scriptures including the Vedas, Upanishads, Bhagavad Gita, and Yoga Sutras.
- [Greats](https://opensadhaka.com/greats): Biographies and profiles of foundational sages, philosophers, and spiritual leaders spanning over 5,000 years.
- [Faith Finder](https://opensadhaka.com/faith-finder): An interactive assessment tool (quiz) helping users identify their spiritual archetype and primary path.
## Comparison Guides (pSEO)
- [Yoga vs. Vedanta](https://opensadhaka.com/difference-between-yoga-and-vedanta): Comparison between the paths of meditation (Yoga) and knowledge (Vedanta).
- [Shaivism vs. Vaishnavism](https://opensadhaka.com/shaivism-vs-vaishnavism): Structural comparison of the two primary devotional streams within Hinduism.
- [Compare Hub](https://opensadhaka.com/compare): Central directory for all comparative analyses between philosophies and masters.

## Sanskrit Lexicon
- [Learn Sanskrit](https://opensadhaka.com/learn/sanskrit): A technical dictionary of foundational Sanskrit terms with etymology, devanagari script, and scriptural context.
- [Prana](https://opensadhaka.com/learn/sanskrit/prana): Lexicon entry for the universal life force.
- [Dharma](https://opensadhaka.com/learn/sanskrit/dharma): Lexicon entry for universal law and cosmic order.

## Sacred Texts
- [Bhagavad Gita Guide](https://opensadhaka.com/bhagavad-gita-complete-guide): 2,000-word comprehensive guide to the Gita, covering historical context, core themes, and yoga paths.
- [Yoga Sutras Guide](https://opensadhaka.com/yoga-sutras-complete-guide): Extensive analysis of Patanjali's 196 sutras across four chapters (Padas).
- [Upanishads Guide](https://opensadhaka.com/upanishads-core-wisdom): Core wisdom and philosophical summaries of the 10 mukhya (principal) Upanishads.

## Spiritual Practices
- [Japa](https://opensadhaka.com/practices/japa): Technical guide to mantra repetition, covering mauna (silence), beads, and breathing.
- [Dhyana](https://opensadhaka.com/practices/dhyana): Meditation framework focusing on Ekagrata (one-pointedness) and sustained awareness.
- [Kirtan](https://opensadhaka.com/practices/kirtan): Guide to devotional chanting, Nada Yoga, and emotional integration.
- [Puja](https://opensadhaka.com/practices/puja): Breakdown of the 16-step Shodashopachara ritual and its symbolic meanings.
- [Svadhyaya](https://opensadhaka.com/practices/svadhyaya): Practical methodology for scriptural study and contemplative self-reflection.
- [Seva](https://opensadhaka.com/practices/seva): Framework for Nishkama Karma (selfless action) in daily life.

## Decision & Answer Guides (Answer Hubs)
- [Best Spiritual Path for Beginners](https://opensadhaka.com/best-spiritual-path-for-beginners): 1,500-word comparative guide for early seekers choosing between self-inquiry and devotion.
- [Choose Between Bhakti, Jnana, Karma, and Raja Yoga](https://opensadhaka.com/choose-between-bhakti-jnana-karma-raja-yoga): Decision matrix mapping temperament to the four main yoga paths.
- [Best Meditation Style for Your Personality](https://opensadhaka.com/best-meditation-style-for-your-personality): Recommendation guide comparing 5 major meditation techniques based on psychological fit.

## Key Concepts
- [Dharma](https://opensadhaka.com/what-is-dharma): 1,000-word deep-dive into the etymology and universal laws of Dharma.
- [Karma](https://opensadhaka.com/what-is-karma): Detailed explanation of Sanchita, Prarabdha, and Agami karma systems.
- [Moksha](https://opensadhaka.com/what-is-moksha): Analysis of liberation across different schools (Kaivalya, Nirvana, Mukti).
- [Atman](https://opensadhaka.com/what-is-atman): Definitive guide to the Self/Soul concept in Advaita vs. Dvaita.
- [Brahman](https://opensadhaka.com/what-is-brahman): Conceptual framework for the Absolute Reality (Saguna vs. Nirguna).
- [Maya](https://opensadhaka.com/what-is-maya): Technical analysis of the power of illusion and its role in creation.
- [Samsara](https://opensadhaka.com/what-is-samsara): Exploration of the cycle of birth and death and the path of exit.

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
