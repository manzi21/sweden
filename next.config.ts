import type { NextConfig } from "next";

// CSP — designed for Sverige TV marketing site:
// - Allows JSON-LD inline scripts (dangerouslySetInnerHTML) via 'unsafe-inline'
// - Allows styled-jsx inline styles via 'unsafe-inline'
// - Allows Google Fonts (Geist via next/font)
// - Allows WhatsApp links (wa.me, api.whatsapp.com)
// - Blocks framing (clickjacking) and object embedding
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://wa.me https://api.whatsapp.com",
  "media-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=(), midi=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: csp },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  /**
   * 301 redirects — recover authority from the legacy WordPress URLs that
   * Google still has in its index. Without these, every Google referral
   * to the old WP slugs returns 404 and bleeds ranking signal.
   *
   * Strategy: map each old slug to the closest matching new page
   * (landing page > section anchor > home).
   */
  async redirects() {
    return [
      // Old IPTV pricing/subscription pages → new offers section / pricing pages
      {
        source: "/iptv-abonnemang/1-manad",
        destination: "/iptv-utan-bindning",
        permanent: true,
      },
      {
        source: "/iptv-abonnemang/3-manader",
        destination: "/iptv-utan-bindning",
        permanent: true,
      },
      {
        source: "/iptv-abonnemang/6-manader",
        destination: "/iptv-utan-bindning",
        permanent: true,
      },
      {
        source: "/iptv-abonnemang/12-manader",
        destination: "/iptv-utan-bindning",
        permanent: true,
      },
      {
        source: "/iptv-abonnemang/:slug*",
        destination: "/iptv-utan-bindning",
        permanent: true,
      },
      {
        source: "/iptv-abonnemang",
        destination: "/iptv-utan-bindning",
        permanent: true,
      },

      // Old blog posts → topic-matched landing pages (preserve intent)
      {
        source: "/bloggar-iptv/vad-ar-iptv",
        destination: "/bloggar/vad-ar-iptv",
        permanent: true,
      },
      {
        source: "/bloggar/topp-10-iptv-kanaler-sport-sverige",
        destination: "/iptv-sport-sverige",
        permanent: true,
      },
      {
        source: "/bloggar/basta-iptv-leverantorer-2024",
        destination: "/bloggar/basta-iptv-2026",
        permanent: true,
      },
      {
        source: "/bloggar-iptv/iptv-i-sverige-en-ny-vaerld-av-underhallning-foer-hela-familjen",
        destination: "/bloggar/vad-ar-iptv",
        permanent: true,
      },
      {
        source: "/bloggar-iptv/iptv-i-sverige-erfarenhet-2025",
        destination: "/bloggar/iptv-vs-viaplay",
        permanent: true,
      },
      // Generic blog catch-all (anything we haven't mapped explicitly)
      {
        source: "/bloggar-iptv/:slug*",
        destination: "/bloggar",
        permanent: true,
      },

      // Static legal/about pages — both old WP URLs already match the new
      // pages by slug, so these are safety nets in case Google ever indexed
      // a www.* variant or a trailing-slash variant.
      {
        source: "/om-oss/",
        destination: "/om-oss",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/anvandarvillkor",
        permanent: true,
      },
      {
        source: "/terms/",
        destination: "/anvandarvillkor",
        permanent: true,
      },
      {
        source: "/recensioner/",
        destination: "/recensioner",
        permanent: true,
      },

      // Force apex domain (drop www.* if anyone hits it).
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.premiumiptv.se" }],
        destination: "https://premiumiptv.se/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // sitemap & robots — keep crawlable, no extra headers that might cause issues
        source: "/(sitemap.xml|robots.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" },
        ],
      },
      {
        // Long cache for static assets
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
