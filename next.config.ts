/** @type {import('next').NextConfig} */
const nextConfig = {
  // Matikan semuanya
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
