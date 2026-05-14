// components/shared/seo-schemas.ts
// Centralized JSON-LD schemas for maximum SEO surface.
// Import and inject these into app/page.tsx (and any landing page) inside <script type="application/ld+json">.
// Each export returns a plain object that you serialize with JSON.stringify.

import { SITE } from "./site";

const DOMAIN = SITE.domain;
const BRAND = SITE.brand;

// ───────────────────────────────────────────────────────────────────────────
// 1) Organization — root entity for the company / brand
// ───────────────────────────────────────────────────────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${DOMAIN}/#organization`,
  name: BRAND,
  alternateName: ["Sverige TV IPTV", "PremiumIPTV.se", "Sverige IPTV"],
  url: DOMAIN,
  logo: {
    "@type": "ImageObject",
    url: `${DOMAIN}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: `${DOMAIN}/og-image.jpg`,
  description:
    "Sveriges bästa IPTV-leverantör — 20 000+ kanaler i 4K UHD, 100 000+ filmer & serier, EPG på svenska. SVT, TV4, Allsvenskan, SHL, Premier League + ExYu, arabiska, turkiska, persiska och kurdiska kanaler.",
  foundingDate: "2020-01-01",
  areaServed: [
    { "@type": "Country", name: "Sweden" },
    { "@type": "Country", name: "Norway" },
    { "@type": "Country", name: "Denmark" },
    { "@type": "Country", name: "Finland" },
  ],
  knowsLanguage: ["sv", "en", "fr", "ar", "tr", "fa", "sr", "hr", "bs", "ku"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["Swedish", "English", "Arabic", "Turkish", "Persian", "Serbian", "Croatian", "Bosnian"],
      contactOption: "TollFree",
      telephone: "+44-7307-410512",
      url: "https://wa.me/447307410512",
    },
  ],
  sameAs: [
    "https://www.facebook.com/sverigetv",
    "https://twitter.com/sverigetv",
    "https://www.instagram.com/sverigetv",
    "https://www.youtube.com/@sverigetv",
    "https://www.tiktok.com/@sverigetv",
  ],
};

// ───────────────────────────────────────────────────────────────────────────
// 2) WebSite + SearchAction — enables Google sitelinks search box
// ───────────────────────────────────────────────────────────────────────────
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${DOMAIN}/#website`,
  url: DOMAIN,
  name: BRAND,
  description: "Sveriges bästa IPTV 2026 — 20 000+ kanaler i 4K UHD från 50 kr/mån.",
  inLanguage: ["sv-SE", "en-US", "fr-FR"],
  publisher: { "@id": `${DOMAIN}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${DOMAIN}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ───────────────────────────────────────────────────────────────────────────
// 3) BreadcrumbList — improves SERP snippet
// ───────────────────────────────────────────────────────────────────────────
export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Hem", item: DOMAIN },
    { "@type": "ListItem", position: 2, name: "IPTV Sverige", item: `${DOMAIN}/#offers` },
    { "@type": "ListItem", position: 3, name: "Kanaler", item: `${DOMAIN}/#channels` },
    { "@type": "ListItem", position: 4, name: "Priser", item: `${DOMAIN}/#offers` },
    { "@type": "ListItem", position: 5, name: "FAQ", item: `${DOMAIN}/#faq` },
  ],
};

// ───────────────────────────────────────────────────────────────────────────
// 4) FAQPage — wins featured snippets & "People also ask"
// ───────────────────────────────────────────────────────────────────────────
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Vad är bästa IPTV i Sverige 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sverige TV (premiumiptv.se) erbjuder 20 000+ live-kanaler i 4K UHD, 100 000+ filmer & serier, EPG på svenska, SVT, TV4, Allsvenskan, SHL, Premier League och alla stora internationella kanaler från endast 50 kr/månad.",
      },
    },
    {
      "@type": "Question",
      name: "Är IPTV lagligt i Sverige?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Att se på IPTV som privatperson är inte olagligt i Sverige. Vi rekommenderar dock att alltid välja en seriös leverantör. Sverige TV följer alla regler och betalar moms i EU.",
      },
    },
    {
      "@type": "Question",
      name: "Hur snabbt aktiveras IPTV-abonnemanget?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Aktiveringen sker på cirka 10 minuter via WhatsApp efter betalning. Du får M3U-länk, Xtream Codes-uppgifter samt installationsguide för din enhet.",
      },
    },
    {
      "@type": "Question",
      name: "Vilka enheter fungerar med Sverige TV IPTV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sverige TV fungerar på Amazon Firestick, Smart TV (Samsung, LG, Philips, Sony), Apple TV, iPhone, iPad, Android, Android Box, MAG, Formuler, Enigma2, Kodi, VLC, PC, Mac och alla enheter som stöder M3U eller Xtream Codes.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jag testa IPTV gratis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, vi erbjuder 24 timmars gratis testperiod helt utan kortuppgifter. Kontakta oss via WhatsApp på +44 7307 410512 så aktiverar vi din testlinje inom 10 minuter.",
      },
    },
    {
      "@type": "Question",
      name: "Vilka svenska kanaler ingår?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Alla stora svenska kanaler ingår: SVT1, SVT2, SVT24, SVT Play, TV3, TV4, TV4 Play, Kanal 5, Kanal 9, Kanal 11, TV6, TV7, TV8, TV10, TV12, Sjuan, Viaplay, Viaplay Sport, C More, Eurosport, Discovery, National Geographic m.fl.",
      },
    },
    {
      "@type": "Question",
      name: "Finns ExYu, arabiska, turkiska och persiska kanaler?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, vi har tusentals internationella kanaler: ExYu (Pink, RTS, HRT, Nova TV, Arena Sport), arabiska (MBC, Al Jazeera, OSN, beIN), turkiska (TRT, ATV, Show TV, Star TV, Kanal D), persiska (GEM TV, Manoto), kurdiska (Kurdistan TV, Rudaw), somaliska, afrikanska och många fler.",
      },
    },
    {
      "@type": "Question",
      name: "Hur mycket kostar IPTV per månad?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Priserna börjar från 50 kr/månad för månadsabonnemang. Vid 12-månaders abonnemang blir månadskostnaden ännu lägre. Ingen bindningstid, inga dolda avgifter.",
      },
    },
    {
      "@type": "Question",
      name: "Kan jag titta på flera enheter samtidigt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, vi erbjuder multi-connection där du kan streama på upp till 5 enheter samtidigt med ett familjeabonnemang.",
      },
    },
    {
      "@type": "Question",
      name: "Hur betalar jag?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vi accepterar Swish, PayPal, kort (Visa/Mastercard) och Klarna. Snabb och säker betalning.",
      },
    },
    {
      "@type": "Question",
      name: "Buffrar IPTV i 4K?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nej, vi använder anti-freeze-teknik och premium-servrar i Sverige och Europa. Med en internetanslutning från 25 Mbps streamar du smidigt i 4K UHD utan buffring.",
      },
    },
    {
      "@type": "Question",
      name: "Vad är skillnaden mellan Sverige TV och Viaplay/Netflix?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sverige TV kombinerar 20 000+ livekanaler från hela världen (sport, nyheter, film, barn) PLUS 100 000+ filmer och serier i en enda app — till bråkdelen av priset jämfört med att prenumerera på Viaplay, Netflix, HBO Max och Disney+ separat.",
      },
    },
  ],
};

// ───────────────────────────────────────────────────────────────────────────
// 5) Service — describes the IPTV service offered
// ───────────────────────────────────────────────────────────────────────────
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${DOMAIN}/#service`,
  serviceType: "IPTV Streaming Service",
  name: "Sverige TV — Premium IPTV Sverige",
  provider: { "@id": `${DOMAIN}/#organization` },
  areaServed: { "@type": "Country", name: "Sweden" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: DOMAIN,
    servicePhone: "+44-7307-410512",
    availableLanguage: ["sv", "en", "ar", "tr", "fa", "sr", "hr", "bs", "ku"],
  },
  category: "IPTV, Streaming, Live TV, VOD",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IPTV Abonnemang",
    itemListElement: [
      { "@type": "Offer", name: "1 månad", priceCurrency: "SEK", price: "99" },
      { "@type": "Offer", name: "3 månader", priceCurrency: "SEK", price: "249" },
      { "@type": "Offer", name: "6 månader", priceCurrency: "SEK", price: "449" },
      { "@type": "Offer", name: "12 månader", priceCurrency: "SEK", price: "699" },
    ],
  },
};

// ───────────────────────────────────────────────────────────────────────────
// 6) VideoObject — for the homepage demo / hero video (helps Google Video tab)
// ───────────────────────────────────────────────────────────────────────────
export const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Sverige TV IPTV — Demo & Installation på 10 minuter",
  description:
    "Se hur du aktiverar Sverige TV IPTV på 10 minuter och får tillgång till 20 000+ kanaler i 4K, SVT, TV4, Allsvenskan, SHL, Premier League och internationella kanaler.",
  thumbnailUrl: [`${DOMAIN}/og-image.jpg`],
  uploadDate: "2026-01-01T08:00:00+01:00",
  duration: "PT2M30S",
  contentUrl: `${DOMAIN}/demo.mp4`,
  embedUrl: `${DOMAIN}/#demo`,
  inLanguage: "sv-SE",
  publisher: { "@id": `${DOMAIN}/#organization` },
};

// ───────────────────────────────────────────────────────────────────────────
// 7) HowTo — step-by-step setup (great for SERP rich snippet)
// ───────────────────────────────────────────────────────────────────────────
export const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Så installerar du Sverige TV IPTV på 10 minuter",
  description:
    "Komplett guide för att aktivera Sverige TV IPTV på Firestick, Smart TV, iPhone, Android eller PC.",
  totalTime: "PT10M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "SEK", value: "0" },
  supply: [{ "@type": "HowToSupply", name: "Internetanslutning (minst 25 Mbps)" }],
  tool: [{ "@type": "HowToTool", name: "IPTV-spelare (Tivimate, Smarters Pro, IBO Player)" }],
  step: [
    { "@type": "HowToStep", name: "Beställ via WhatsApp", text: "Kontakta oss på WhatsApp +44 7307 410512 och välj abonnemang." },
    { "@type": "HowToStep", name: "Betala", text: "Betala säkert via Swish, PayPal, kort eller Klarna." },
    { "@type": "HowToStep", name: "Ta emot uppgifter", text: "Inom 10 minuter får du M3U-länk eller Xtream Codes." },
    { "@type": "HowToStep", name: "Installera IPTV-spelare", text: "Installera Tivimate, Smarters Pro eller IBO Player på din enhet." },
    { "@type": "HowToStep", name: "Logga in", text: "Ange dina Xtream-uppgifter och börja titta direkt i 4K." },
  ],
};

// ───────────────────────────────────────────────────────────────────────────
// 8) LocalBusiness placeholders — one per major Swedish city
// ───────────────────────────────────────────────────────────────────────────
const SWEDISH_CITIES = [
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Göteborg", lat: 57.7089, lon: 11.9746 },
  { name: "Malmö", lat: 55.6050, lon: 13.0038 },
  { name: "Uppsala", lat: 59.8586, lon: 17.6389 },
  { name: "Västerås", lat: 59.6099, lon: 16.5448 },
  { name: "Örebro", lat: 59.2753, lon: 15.2134 },
  { name: "Linköping", lat: 58.4108, lon: 15.6214 },
  { name: "Helsingborg", lat: 56.0465, lon: 12.6945 },
];
export const localBusinessSchemas = SWEDISH_CITIES.map((c) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${DOMAIN}/#business-${c.name.toLowerCase()}`,
  name: `Sverige TV IPTV — ${c.name}`,
  image: `${DOMAIN}/og-image.jpg`,
  url: DOMAIN,
  telephone: "+44-7307-410512",
  priceRange: "50 kr - 699 kr",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SE",
    addressLocality: c.name,
  },
  geo: { "@type": "GeoCoordinates", latitude: c.lat, longitude: c.lon },
  areaServed: { "@type": "City", name: c.name },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1200" },
}));

// ───────────────────────────────────────────────────────────────────────────
// 9) Helper to convert any schema to a script tag string (server-rendered)
// ───────────────────────────────────────────────────────────────────────────
export function jsonLdString(schema: unknown): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

// ───────────────────────────────────────────────────────────────────────────
// 10) Bundle export — convenient single import
// ───────────────────────────────────────────────────────────────────────────
export const ALL_SCHEMAS = {
  organization: organizationSchema,
  website: websiteSchema,
  breadcrumb: breadcrumbSchema,
  faq: faqSchema,
  service: serviceSchema,
  video: videoSchema,
  howTo: howToSchema,
  localBusinesses: localBusinessSchemas,
};
