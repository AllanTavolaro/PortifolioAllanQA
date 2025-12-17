import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/PortifolioAllanQA",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
