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
    // Trailing slashes for consistency
    trailingSlash: false,
};

export default nextConfig;
