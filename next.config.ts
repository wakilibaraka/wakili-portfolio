import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/wakili-portfolio',
  images: {
    unoptimized: true, // Required for static export
  }
};

export default nextConfig;
