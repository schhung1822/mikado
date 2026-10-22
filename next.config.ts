import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Ẩn nút chỉ báo "N" của chế độ dev — nó đè lên thanh điều khiển của trình xem.
  devIndicators: false,
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
