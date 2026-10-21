import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/:locale(es|de|fr|pt|ja)/privacy",
        destination: "/:locale/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/:locale(es|de|fr|pt|ja)/terms-of-service",
        destination: "/:locale/terms",
        permanent: true,
      },
      {
        source: "/tos",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/:locale(es|de|fr|pt|ja)/tos",
        destination: "/:locale/terms",
        permanent: true,
      },
    ];
  },
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
