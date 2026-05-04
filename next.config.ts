import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hygraph-studio-editor",
  assetPrefix: "/hygraph-studio-editor/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
