import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const secureHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // img-src vercel.com needed for deploy button,
  // script-src va.vercel-scripts.com for analytics/vercel scripts
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; connect-src 'self'; child-src; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; img-src 'self' https://vercel.com;",
  },
];

const imageRemotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "8080",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "*.zitadel.*",
    port: "",
    pathname: "/**",
  },
];

if (process.env.ZITADEL_API_URL) {
  imageRemotePatterns.push({
    protocol: "https",
    hostname: process.env.ZITADEL_API_URL?.replace("https://", "") || "",
    port: "",
    pathname: "/**",
  });
  imageRemotePatterns.push({
    protocol: "https",
    hostname: process.env.ZITADEL_API_URL?.replace("https://", "") || "",
    port: "443",
    pathname: "/**",
  });
}

const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  output: process.env.NEXT_OUTPUT_MODE || undefined,
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    dynamicIO: true,
  },
  images: {
    remotePatterns: imageRemotePatterns,
    domains:[process.env.ZITADEL_API_URL?.replace("https://", "") || ""],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: secureHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
