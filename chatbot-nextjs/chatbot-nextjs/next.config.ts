import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Desactiva ESLint solo durante next build
  },
};

export default nextConfig;