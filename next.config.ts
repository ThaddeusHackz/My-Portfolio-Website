import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // Keep bundling deterministic across sandbox and Render.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
