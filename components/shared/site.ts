// components/shared/site.ts
// Centralized site configuration — Nordic expansion 2026

export const SITE = {
    domain: "https://premiumiptv.se",
    brand: "Sverige TV",
    brandNordic: "Nordic IPTV",
    whatsappPhone: "447307410512",
    currencyLabel: "kr",
    defaultLocale: "sv",
    supportedLocales: ["sv", "no", "da", "fi", "en", "fr"] as const,
    // Nordic country configs
    nordic: {
          se: { currency: "SEK", symbol: "kr", domain: "https://premiumiptv.se", lang: "sv", name: "Sverige" },
          no: { currency: "NOK", symbol: "kr", domain: "https://premiumiptv.se", lang: "no", name: "Norge" },
          dk: { currency: "DKK", symbol: "kr", domain: "https://premiumiptv.se", lang: "da", name: "Danmark" },
          fi: { currency: "EUR", symbol: "€", domain: "https://premiumiptv.se", lang: "fi", name: "Suomi" },
          is: { currency: "ISK", symbol: "kr", domain: "https://premiumiptv.se", lang: "is", name: "Ísland" },
    },
    // SEO keywords per Nordic country
    nordicSeoKeywords: {
          se: ["bästa IPTV Sverige", "IPTV Sverige 2026", "köpa IPTV Sverige", "SVT IPTV", "Allsvenskan IPTV"],
          no: ["beste IPTV Norge", "IPTV Norge 2026", "kjøpe IPTV Norge", "NRK IPTV", "Eliteserien IPTV"],
          dk: ["bedste IPTV Danmark", "IPTV Danmark 2026", "købe IPTV Danmark", "DR IPTV", "Superliga IPTV"],
          fi: ["paras IPTV Suomi", "IPTV Suomi 2026", "ostaa IPTV Suomi", "Yle IPTV", "Liiga IPTV"],
          is: ["besta IPTV Ísland", "IPTV Ísland 2026", "RÚV IPTV", "Ísland IPTV straumur"],
    },
} as const;
