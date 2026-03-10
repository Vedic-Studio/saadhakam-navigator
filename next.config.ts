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
        return concepts.map((concept) => ({
            source: `/${concept.slug}-meaning`,
            destination: `/what-is-${concept.slug}`,
            permanent: true,
        }));
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
