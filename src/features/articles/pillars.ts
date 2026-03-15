import type { ArticlePillar } from "@/data/articles";

export interface ArticlePillarConfig {
    key: ArticlePillar;
    label: string;
    href: string;
    shortLabel: string;
}

export const pillarConfig: Record<ArticlePillar, ArticlePillarConfig> = {
    "ancient-wisdom": {
        key: "ancient-wisdom",
        label: "Ancient Wisdom",
        shortLabel: "Ancient Wisdom",
        href: "/ancient-wisdom-philosophies",
    },
    "practical-practices": {
        key: "practical-practices",
        label: "Practical Practices",
        shortLabel: "Practical Practices",
        href: "/practical-spiritual-practices",
    },
    "sacred-texts": {
        key: "sacred-texts",
        label: "Sacred Texts",
        shortLabel: "Sacred Texts",
        href: "/sacred-texts-teachings",
    },
    "spiritual-traditions": {
        key: "spiritual-traditions",
        label: "Spiritual Traditions",
        shortLabel: "Spiritual Traditions",
        href: "/spiritual-traditions-paths",
    },
};

export function getPillarConfig(pillar: ArticlePillar): ArticlePillarConfig {
    return pillarConfig[pillar];
}