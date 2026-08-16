import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.watchOptions = {
      ignored: ["**/node_modules", "**/.git", "**/local.db*"],
    };
    return config;
  },
};

export default nextConfig;

