import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ini yang akan mengabaikan error TypeScript saat proses build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;