import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  output: "export",
  reactCompiler: true
};

export default nextConfig;