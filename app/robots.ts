import type { MetadataRoute } from "next";

const SITE_URL = "https://premiumiptv.se";

/**
 * robots.ts — strategy:
 *
 *  1. Mainstream search engines: full access.
 *  2. AI **search assistants** (Perplexity, ChatGPT, OAI-Search, AppleBot-Extended):
 *     ALLOWED. These crawlers serve answers to live user queries and are
 *     a fast-growing referral source — blocking them costs traffic and
 *     does not protect content (the user already gave the LLM the page).
 *  3. AI **training-only** crawlers (GPTBot, ClaudeBot, Google-Extended,
 *     CCBot, Bytespider, Amazonbot): BLOCKED. These pull bulk data for
 *     model training with no traffic in return.
 *  4. Aggressive SEO scrapers (Ahrefs, Semrush, MJ12, Dot, Petal, BLEX):
 *     BLOCKED to reduce server load.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1) Mainstream search engines
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: "/" },
      { userAgent: "Googlebot-News", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "DuckDuckBot", allow: "/" },
      { userAgent: "Slurp", allow: "/" },
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "YandexBot", allow: "/" },

      // 2) AI search assistants — ALLOWED (referral traffic source)
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Meta-ExternalFetcher", allow: "/" },

      // 3) AI training-only crawlers — BLOCKED
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
      { userAgent: "Claude-Web", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "Meta-ExternalAgent", disallow: "/" },
      { userAgent: "FacebookBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "YouBot", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
      { userAgent: "Diffbot", disallow: "/" },
      { userAgent: "ImagesiftBot", disallow: "/" },

      // 4) SEO scrapers — BLOCKED (reduce load, no SEO upside)
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "BLEXBot", disallow: "/" },

      // 5) Default — allow with crawl-delay (soft rate limit hint)
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
        crawlDelay: 5,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
