import type { MetadataRoute } from "next";

const SITE_URL = "https://premiumiptv.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Pages principales avec alternates hreflang
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
    {
      url: `${SITE_URL}/?lang=sv`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/?lang=en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/?lang=fr`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Sections-clés (anchors) — utiles pour Google et LLM crawlers
  const sections = [
    "offers",
    "channels",
    "countries",
    "international",
    "devices",
    "cities",
    "faq",
    "setup",
  ];

  const sectionEntries: MetadataRoute.Sitemap = sections.map((section) => ({
    url: `${SITE_URL}/#${section}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...main, ...sectionEntries];
}
