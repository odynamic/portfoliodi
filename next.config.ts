import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Menonaktifkan pengecekan ESLint saat proses build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;