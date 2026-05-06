// components/shared/site.ts
// Centralized site configuration

export const SITE = {
  domain: "https://premiumiptv.se",
  brand: "Sverige TV",
  whatsappPhone: "447307410512",
  currencyLabel: "kr",
  defaultLocale: "sv",
  supportedLocales: ["sv", "en", "fr"] as const,
} as const;
