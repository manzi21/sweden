import type { MetadataRoute } from "next";

const SITE_URL = "https://sverigetv.se";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1) Mainstream search engines — full access (preserves SEO)
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Slurp", allow: "/" },
      { userAgent: "Applebot", allow: "/" },

      // 2) AI training & scraping crawlers — blocked
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ChatGPT-User", disallow: "/" },
      { userAgent: "OAI-SearchBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "PerplexityBot", disallow: "/" },
      { userAgent: "Perplexity-User", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "FacebookBot", disallow: "/" },
      { userAgent: "Meta-ExternalAgent", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "YouBot", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
      { userAgent: "Diffbot", disallow: "/" },
      { userAgent: "ImagesiftBot", disallow: "/" },

      // 3) SEO competitor scrapers — blocked
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "BLEXBot", disallow: "/" },

      // 4) Default — allow with crawl-delay (soft rate limit hint)
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"], crawlDelay: 5 },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
