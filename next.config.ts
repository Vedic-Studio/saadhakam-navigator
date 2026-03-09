import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Allow serving static files from public/
    // Preserve existing image assets
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
    eslint: {
        ignoreDuringBuilds: true,
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
