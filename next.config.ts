/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ini akan menonaktifkan ESLint selama proses build di Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ini juga akan menonaktifkan pemeriksaan tipe TypeScript yang ketat
    ignoreBuildErrors: true,
  },
};

export default nextConfig;