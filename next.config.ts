import type { NextConfig } from "next";
import { concepts } from "./src/data/concepts";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pravatar.cc",
            },
        ],
    },
    trailingSlash: false,
    typescript: {
        ignoreBuildErrors: true,
    },
    async redirects() {
        const staticRedirects = [
            {
                source: "/download",
                destination: "/",
                permanent: true,
            },
            {
                source: "/downloads",
                destination: "/",
                permanent: true,
            },
            {
                source: "/philosophies/advaita-vedanta",
                destination: "/philosophies/advaita",
                permanent: true,
            },
            {
                source: "/philosophies/nyaya",
                destination: "/philosophies/nyaya-vaisheshika",
                permanent: true,
            },
            {
                source: "/philosophies/vaisheshika",
                destination: "/philosophies/nyaya-vaisheshika",
                permanent: true,
            },
            {
                source: "/compare/advaita-vs-dvaita",
                destination: "/advaita-vs-dvaita",
                permanent: true,
            },
            {
                source: "/compare/shaivism-vs-vaishnavism",
                destination: "/shaivism-vs-vaishnavism",
                permanent: true,
            },
            {
                source: "/compare/stoicism-vs-vedanta",
                destination: "/vedanta-vs-stoicism",
                permanent: true,
            },
            {
                source: "/compare/tantra-vs-vedanta",
                destination: "/vedanta-vs-tantra",
                permanent: true,
            },
            {
                source: "/compare/vedanta-vs-buddhism",
                destination: "/vedanta-vs-buddhism",
                permanent: true,
            },
        ];

        const dynamicRedirects = concepts.map((concept) => ({
            source: `/${concept.slug}-meaning`,
            destination: `/what-is-${concept.slug}`,
            permanent: true,
        }));

        return [...staticRedirects, ...dynamicRedirects];
    },
    async rewrites() {
        const indexNowKey = process.env.INDEXNOW_KEY;

        if (indexNowKey) {
            return [
                {
                    source: `/${indexNowKey}.txt`,
                    destination: '/api/indexnow',
                },
            ];
        }
        return [];
    },
};

export default nextConfig;
