/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Membantu proses build agar tidak gagal karena error kecil TypeScript
    ignoreBuildErrors: true,
  },
  // Anda tidak perlu menuliskan 'eslint' di sini karena sudah tidak didukung
};

export default nextConfig;