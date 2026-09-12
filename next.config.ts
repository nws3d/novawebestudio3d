import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/novawebestudio3d",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
