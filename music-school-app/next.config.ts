import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
  // Turbopack has a path-resolution bug on Windows when the username contains '#'.
  // It corrupts paths by inserting null bytes at the '#' position.
  // Force webpack until upstream fixes this.
  bundlePagesRouterDependencies: false,
  output: "standalone",
};

export default nextConfig;
