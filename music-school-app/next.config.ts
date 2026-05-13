import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    turbo: {
      // Turbopack has a path-resolution bug with '#' in Windows usernames.
      // Keeping this object empty forces the webpack compiler for now.
    },
  },
};

export default nextConfig;
