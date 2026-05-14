// app/sitemap.ts
// Dynamic sitemap — Google reads this to discover & re-crawl pages.
// Includes all language variants, all key sections, all Swedish cities,
// device pages, sport pages, and international community pages.
// Maximum surface area for SEO discovery.

import type { MetadataRoute } from "next";

const SITE_URL = "https://premiumiptv.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 1) Homepage with hreflang alternates (Google sees the multilingual structure)
  const home: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "daily",
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
    { url: `${SITE_URL}/?lang=sv`, lastModified, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/?lang=en`, lastModified, changeFrequency: "weekly", priority: 0.95 },
    { url: `${SITE_URL}/?lang=fr`, lastModified, changeFrequency: "weekly", priority: 0.85 },
  ];

  // 2) Key on-page sections (anchors) — discoverable by Google & LLM crawlers
  const sections = [
    "offers", "channels", "countries", "international",
    "devices", "cities", "faq", "setup", "reviews", "vod",
    "compare", "trial", "pricing", "support",
  ];
  const sectionEntries: MetadataRoute.Sitemap = sections.map((s) => ({
    url: `${SITE_URL}/#${s}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 3) Swedish cities — long-tail local SEO
  const cities = [
    "stockholm","goteborg","malmo","uppsala","vasteras","orebro","linkoping",
    "helsingborg","jonkoping","norrkoping","lund","umea","gavle","boras",
    "eskilstuna","sodertalje","karlstad","vaxjo","halmstad","sundsvall",
    "lulea","trollhattan","ostersund","kalmar","kristianstad","falun",
    "skelleftea","karlskrona","skovde","uddevalla","motala","ornskoldsvik",
    "varberg","trelleborg","lidkoping","alingsas","piteå","sandviken",
    "nykoping","mariestad","ystad","kiruna","visby","hudiksvall",
  ];
  const cityEntries: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/iptv/${city}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
    alternates: {
      languages: {
        sv: `${SITE_URL}/iptv/${city}?lang=sv`,
        en: `${SITE_URL}/iptv/${city}?lang=en`,
        fr: `${SITE_URL}/iptv/${city}?lang=fr`,
      },
    },
  }));

  // 4) Device-specific landing anchors
  const devices = [
    "firestick","smart-tv","samsung","lg","philips","sony","apple-tv",
    "iphone","ipad","android","android-tv","android-box","mag","formuler",
    "enigma2","kodi","tivimate","smarters","pc","mac","windows","linux",
  ];
  const deviceEntries: MetadataRoute.Sitemap = devices.map((d) => ({
    url: `${SITE_URL}/iptv-${d}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 5) Sport landing pages — extremely high commercial intent
  const sports = [
    "allsvenskan","shl","hockeyallsvenskan","nhl","premier-league",
    "champions-league","europa-league","la-liga","bundesliga","serie-a",
    "ligue-1","formel-1","ufc","mma","boxning","tennis","golf",
    "nba","nfl","mlb","handboll","bandy","innebandy",
  ];
  const sportEntries: MetadataRoute.Sitemap = sports.map((s) => ({
    url: `${SITE_URL}/sport/${s}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  // 6) International community pages
  const communities = [
    "exyu","balkan","srpska","hrvatska","bosanska","arabiska","turkiska",
    "persiska","kurdiska","somaliska","afrikanska","polska","tyska",
    "engelska","spanska","franska","italienska","albanska","makedonska",
    "rumanska","bulgariska","grekiska","ryska","ukrainska","indiska",
    "pakistanska","filippinska","thailandska","vietnamesiska","kinesiska",
    "latino",
  ];
  const communityEntries: MetadataRoute.Sitemap = communities.map((c) => ({
    url: `${SITE_URL}/kanaler/${c}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // 7) Nordic country landing pages
  const nordic = ["norge","danmark","finland","island"];
  const nordicEntries: MetadataRoute.Sitemap = nordic.map((n) => ({
    url: `${SITE_URL}/iptv-${n}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 8) Plans / pricing variants
  const plans = ["1-manad","3-manader","6-manader","12-manader","24-manader","gratis-test","trial-24h"];
  const planEntries: MetadataRoute.Sitemap = plans.map((p) => ({
    url: `${SITE_URL}/abonnemang/${p}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // 9) Comparison & informational pages
  const compare = [
    "iptv-vs-viaplay","iptv-vs-netflix","iptv-vs-hbo","iptv-vs-tv4-play",
    "iptv-vs-svt-play","iptv-vs-skyshowtime","iptv-vs-boxer","iptv-vs-comhem",
    "iptv-vs-telia","ar-iptv-lagligt","basta-iptv-leverantor","iptv-guide-2026",
    "iptv-installation","iptv-felsokning","iptv-aterforsaljare","blogg",
    "om-oss","kontakt","villkor","integritetspolicy",
  ];
  const compareEntries: MetadataRoute.Sitemap = compare.map((c) => ({
    url: `${SITE_URL}/${c}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...home,
    ...sectionEntries,
    ...planEntries,
    ...cityEntries,
    ...sportEntries,
    ...communityEntries,
    ...deviceEntries,
    ...nordicEntries,
    ...compareEntries,
  ];
}
