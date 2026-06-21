import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Matikan eslint dan typescript check di sini
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;