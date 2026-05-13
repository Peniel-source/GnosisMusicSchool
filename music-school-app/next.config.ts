import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Turbopack has a path-resolution bug on Windows when the username contains '#'.
  // It corrupts paths by inserting null bytes at the '#' position.
  // Force webpack until upstream fixes this.
  bundlePagesRouterDependencies: false,
};

export default nextConfig;
