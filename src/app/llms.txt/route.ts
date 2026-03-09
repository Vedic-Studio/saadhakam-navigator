import { NextResponse } from "next/server";

export async function GET() {
    const content = `# Sādhaka

> Sādhaka is the open encyclopedia of Dharmic wisdom. It is a comprehensive platform exploring ancient Indian philosophies, spiritual traditions, sacred texts, and fundamental concepts. This file provides language models with an overview of the core structures and pathways available on the site.

## Core Pages
- [Home](https://opensadhaka.com): The main entryway into Dharmic wisdom
- [Philosophies](https://opensadhaka.com/philosophies): The six orthodox (Astika) and heterodox (Nastika) schools of Indian thought
- [Traditions](https://opensadhaka.com/traditions): Major spiritual lineages like Vedanta, Tantra, Yoga, and Bhakti
- [Texts](https://opensadhaka.com/texts): Sacred scriptures including the Vedas, Upanishads, Bhagavad Gita, and Yoga Sutras
- [Greats](https://opensadhaka.com/greats): Profiles of foundational sages, philosophers, and spiritual leaders
- [Faith Finder](https://opensadhaka.com/faith-finder): An assessment tool helping users find their spiritual archetype
- [Compare](https://opensadhaka.com/compare): Comparative analysis between different Dharmic paths and philosophies

## Sacred Texts
- [Bhagavad Gita Guide](https://opensadhaka.com/bhagavad-gita-complete-guide): Complete guide to the Bhagavad Gita
- [Yoga Sutras Guide](https://opensadhaka.com/yoga-sutras-complete-guide): Complete guide to Patanjali's Yoga Sutras
- [Upanishads Guide](https://opensadhaka.com/upanishads-core-wisdom): Core wisdom of the major Upanishads

## Spiritual Practices
- [Japa](https://opensadhaka.com/practices/japa): Mantra repetition
- [Dhyana](https://opensadhaka.com/practices/dhyana): Meditation
- [Kirtan](https://opensadhaka.com/practices/kirtan): Devotional chanting
- [Puja](https://opensadhaka.com/practices/puja): Ritual worship
- [Svadhyaya](https://opensadhaka.com/practices/svadhyaya): Self-study and study of texts
- [Seva](https://opensadhaka.com/practices/seva): Selfless service

## Key Concepts
- [Dharma](https://opensadhaka.com/what-is-dharma): Righteousness, duty, and cosmic order
- [Karma](https://opensadhaka.com/what-is-karma): Action and its consequences
- [Moksha](https://opensadhaka.com/what-is-moksha): Liberation from the cycle of rebirth
- [Atman](https://opensadhaka.com/what-is-atman): The true, eternal self
- [Brahman](https://opensadhaka.com/what-is-brahman): The ultimate, unchanging reality
- [Maya](https://opensadhaka.com/what-is-maya): The illusion of the phenomenal world
- [Samsara](https://opensadhaka.com/what-is-samsara): The cycle of birth, death, and rebirth

## Optional
- [Full Sitemap URL List](https://opensadhaka.com/llms-full.txt): Detailed list of all URLs for full context
`;

    return new NextResponse(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
        },
    });
}
