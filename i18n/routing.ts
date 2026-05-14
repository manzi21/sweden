import { defineRouting } from "next-intl/routing";

/**
 * Nordic i18n routing configuration.
 *
 * Default locale: `sv` (Sweden — our primary market, premiumiptv.se).
 * Other locales are served under `/no`, `/da`, `/fi`, `/en`.
 *
 * `localePrefix: "as-needed"` means the default locale (sv) is reachable
 * at the root path `/` (no `/sv` prefix), while other locales require their
 * prefix. This preserves the existing Swedish SEO that already lives at `/`.
 *
 * Country / locale matrix:
 *   sv (sv-SE) → Sverige 🇸🇪 (default, root)
 *   no (nb-NO) → Norge 🇳🇴 (priority #1 ROI — Vipps, NRK, Eliteserien)
 *   da (da-DK) → Danmark 🇩🇰 (priority #2 — MobilePay, DR, Superliga, håndbold)
 *   fi (fi-FI) → Suomi 🇫🇮 (priority #3 — Online banking, YLE, SM-Liiga)
 *   en        → International 🇬🇧 (fallback for non-nordic traffic)
 */
export const routing = defineRouting({
  locales: ["sv", "no", "da", "fi", "en"] as const,
  defaultLocale: "sv",
  localePrefix: "as-needed",
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];

/**
 * Country metadata used by the LocaleSwitcher, GeoBanner, JSON-LD schemas
 * and (in a future PR) the dynamic geo-pricing middleware.
 */
export const localeMeta: Record<
  Locale,
  {
    label: string;
    nativeLabel: string;
    flag: string;
    htmlLang: string;
    country: string;
    currency: "SEK" | "NOK" | "DKK" | "EUR";
    direction: "ltr";
  }
> = {
  sv: {
    label: "Swedish",
    nativeLabel: "Svenska",
    flag: "🇸🇪",
    htmlLang: "sv-SE",
    country: "SE",
    currency: "SEK",
    direction: "ltr",
  },
  no: {
    label: "Norwegian",
    nativeLabel: "Norsk",
    flag: "🇳🇴",
    htmlLang: "nb-NO",
    country: "NO",
    currency: "NOK",
    direction: "ltr",
  },
  da: {
    label: "Danish",
    nativeLabel: "Dansk",
    flag: "🇩🇰",
    htmlLang: "da-DK",
    country: "DK",
    currency: "DKK",
    direction: "ltr",
  },
  fi: {
    label: "Finnish",
    nativeLabel: "Suomi",
    flag: "🇫🇮",
    htmlLang: "fi-FI",
    country: "FI",
    currency: "EUR",
    direction: "ltr",
  },
  en: {
    label: "English",
    nativeLabel: "English",
    flag: "🇬🇧",
    htmlLang: "en",
    country: "INT",
    currency: "EUR",
    direction: "ltr",
  },
};

/**
 * Maps a geo country code (from `x-vercel-ip-country` or Accept-Language)
 * to the appropriate locale. Anything outside the nordic block falls
 * back to English (international).
 */
export const countryToLocale: Record<string, Locale> = {
  SE: "sv",
  NO: "no",
  DK: "da",
  FI: "fi",
};

export function resolveLocaleFromCountry(country: string | null | undefined): Locale {
  if (!country) return routing.defaultLocale;
  const upper = country.toUpperCase();
  return countryToLocale[upper] ?? "en";
}
