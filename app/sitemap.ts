import type { MetadataRoute } from "next";

const SITE_URL = "https://premiumiptv.se";

/**
 * Sitemap — only real, indexable URLs.
 *
 * Anchor URLs (#offers, #faq, etc.) are NOT included because Google does
 * not treat fragment URLs as separate documents.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // ── Home ───────────────────────────────────────────────────────────
  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          sv: `${SITE_URL}/?lang=sv`,
          en: `${SITE_URL}/?lang=en`,
          fr: `${SITE_URL}/?lang=fr`,
          "x-default": SITE_URL,
        },
      },
    },
  ];

  // ── Keyword-targeted landing pages ─────────────────────────────────
  const landingSlugs = [
    "iptv-sport-sverige",
    "iptv-smart-tv-sverige",
    "iptv-utan-bindning",
    "iptv-firestick-sverige",
  ];
  const landings: MetadataRoute.Sitemap = landingSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // ── E-E-A-T / legal / static ───────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/om-oss`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recensioner`, lastModified, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/integritetspolicy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/anvandarvillkor`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/angerratt-och-aterbetalning`, lastModified, changeFrequency: "yearly", priority: 0.4 },
  ];

  // ── Blog hub + posts ───────────────────────────────────────────────
  const blogPosts = [
    "vad-ar-iptv",
    "iptv-vs-viaplay",
    "basta-iptv-2026",
  ];
  const blog: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/bloggar`, lastModified, changeFrequency: "weekly", priority: 0.6 },
    ...blogPosts.map((slug) => ({
      url: `${SITE_URL}/bloggar/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];

  return [...home, ...landings, ...staticPages, ...blog];
}
