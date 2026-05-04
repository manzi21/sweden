import type { MetadataRoute } from "next";

const SITE_URL = "https://premiumiptv.se";

/**
 * Sitemap — only include real, indexable URLs.
 *
 * NOTE: We removed previous "/#offers", "/#faq" entries because Google
 * does NOT treat fragment URLs as separate documents. Anchor entries
 * dilute the sitemap and can confuse crawlers — they belong in HTML
 * navigation, not the sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Core marketing pages (one canonical URL per page).
  const main: MetadataRoute.Sitemap = [
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

  // Keyword-targeted landing pages (Phase 12).
  const landingSlugs = [
    "iptv-sport-sverige",
    "iptv-smart-tv-sverige",
    "iptv-utan-bindning",
    "iptv-firestick-sverige",
  ];
  const landingPages: MetadataRoute.Sitemap = landingSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...main, ...landingPages];
}
