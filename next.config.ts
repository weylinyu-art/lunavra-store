import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开发时不用 output: export，以便 middleware 生效（/ 重定向到 /en）
  // 构建时使用 static export，用于 Cloudflare Pages 部署
  ...(process.env.NODE_ENV === "production" && { output: "export" as const }),
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;
