// app/layout.tsx
// Server Component — generates ALL metadata server-side for Google.
// Merges your existing layout (perfect Tailwind setup) with Swedish-first
// SEO keywords prioritized for the Sverige TV niche.

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://premiumiptv.se";
const SITE_NAME = "Sverige TV";
const OG_IMAGE = SITE_URL + "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Hyper-clickable Swedish title for SERP — high CTR, keyword-loaded
    default:
      "Bästa IPTV Sverige 2026 — 20 000+ Kanaler, 4K, från 50 kr/mån | Sverige TV",
    template: "%s | Sverige TV",
  },
  description:
    "🇸🇪 Sveriges bästa IPTV 2026 — 20 000+ kanaler i 4K UHD. SVT, TV4, Allsvenskan, SHL + ExYu, arabiska, turkiska, persiska kanaler. Aktivering på 10 min via WhatsApp. Gratis 24h test utan kort. Från 50 kr/mån. Ingen bindning. ★ 4,9/5 av 1 200+ kunder.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    // ── SVENSKA HIGH-VOLUME (priority 1) ────────────────────────────────────
    "IPTV Sverige",
    "bästa IPTV Sverige",
    "bästa IPTV Sverige 2026",
    "IPTV abonnemang Sverige",
    "billig IPTV Sverige",
    "stabil IPTV Sverige",
    "svensk IPTV",
    "svenska IPTV-tjänster",
    "IPTV test gratis",
    "IPTV 24h gratis",
    "Sverige TV",
    "premiumiptv",
    // ── SVENSKA KANALER ─────────────────────────────────────────────────────
    "SVT IPTV",
    "TV4 IPTV",
    "SVT Play live",
    "svenska kanaler IPTV",
    "Kanal 5 IPTV",
    "TV3 stream",
    "Allsvenskan stream",
    "Allsvenskan IPTV",
    "SHL stream",
    "SHL IPTV",
    "C More alternativ",
    "Viaplay alternativ",
    "Viaplay alternativ billigare",
    // ── ENHETER (Sverige söker) ──────────────────────────────────────────────
    "Firestick Sverige IPTV",
    "Smart TV IPTV Sverige",
    "TiviMate Sverige",
    "IPTV Smarters Sverige",
    "MAG Box Sverige",
    "iPhone IPTV Sverige",
    "Android TV box Sverige",
    // ── EXYU (HÖG PRIORITET — användarkrav) ─────────────────────────────────
    "ExYu IPTV Sverige",
    "balkanska kanaler Sverige",
    "Pink TV Sverige",
    "RTS Sverige",
    "HRT Sverige",
    "Arena Sport Sverige",
    "bosanska TV Sverige",
    "srpski kanali Švedska",
    "hrvatska TV Švedska",
    "ExYu kanali Švedska",
    "Nova S Sverige",
    "Sport Klub Sverige",
    // ── ARABISKA ────────────────────────────────────────────────────────────
    "arabisk IPTV Sverige",
    "MBC Sverige",
    "Al Jazeera Sverige",
    "beIN Sports Sverige",
    "OSN Sverige",
    "arabiska kanaler",
    "قنوات عربية السويد",
    // ── TURKISKA ─────────────────────────────────────────────────────────────
    "turkisk IPTV Sverige",
    "TRT Sverige",
    "Show TV Sverige",
    "Kanal D Sverige",
    "türk dizi Sverige",
    "İsveç türk TV",
    // ── PERSISKA / KURDISKA / SOMALISKA ─────────────────────────────────────
    "persisk IPTV Sverige",
    "Manoto Sverige",
    "GEM TV Sverige",
    "kurdisk IPTV Sverige",
    "Rudaw Sverige",
    "somalisk IPTV Sverige",
    "Universal TV Sverige",
    // ── ANDRA SPRÅK ──────────────────────────────────────────────────────────
    "polska IPTV Sverige",
    "finsk IPTV Sverige",
    "indisk IPTV Sverige",
    "spansk IPTV Sverige",
    // ── STÄDER ──────────────────────────────────────────────────────────────
    "IPTV Stockholm",
    "IPTV Göteborg",
    "IPTV Malmö",
    "IPTV Uppsala",
    "IPTV Västerås",
    "IPTV Linköping",
    "IPTV Örebro",
    "IPTV Helsingborg",
    // ── ENGLISH (för engelsktalande i Sverige + expats) ─────────────────────
    "Swedish TV abroad",
    "Swedish IPTV",
    "watch SVT outside Sweden",
    "Swedish channels worldwide",
    "Nordic IPTV",
    "Nordic streaming",
    "Swedish streaming USA",
    "Swedish channels Dubai",
    "Swedish TV expat",
    "best IPTV service 2026",
    "premium IPTV Europe",
    "international IPTV",
    "watch Allsvenskan abroad",
    "Swedish TV in UK",
    "Swedish TV in Germany",
    "Swedish TV in Spain",
    "Swedish TV in USA",
    "Swedish TV in UAE",
    "IPTV with EPG",
    "4K IPTV worldwide",
    "Premier League streaming Europe",
    "Nordic channels worldwide",
    // ── LONG-TAIL (lågt brus, hög konverteringsavsikt) ──────────────────────
    "IPTV svenska kanaler 4K",
    "IPTV Allsvenskan SHL",
    "IPTV med Swish betalning",
    "IPTV BankID Sverige",
    "IPTV Klarna Sverige",
    "IPTV utan bindning Sverige",
    "IPTV gratis test 24 timmar",
    "IPTV ingen kreditkort",
    "IPTV Firestick Sverige",
    "IPTV Samsung Smart TV Sverige",
    "IPTV Bahnhof",
    "IPTV Telia",
    "IPTV Com Hem",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "sv-SE": SITE_URL + "/?lang=sv",
      sv: SITE_URL + "/?lang=sv",
      "en-US": SITE_URL + "/?lang=en",
      "en-GB": SITE_URL + "/?lang=en",
      "en-AE": SITE_URL + "/?lang=en",
      en: SITE_URL + "/?lang=en",
      "fr-FR": SITE_URL + "/?lang=fr",
      fr: SITE_URL + "/?lang=fr",
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    alternateLocale: ["en_US", "en_GB", "fr_FR", "ar_AE"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Bästa IPTV Sverige 2026 — 20 000+ Kanaler i 4K | Sverige TV",
    description:
      "Sveriges bästa IPTV-tjänst — SVT, TV4, Allsvenskan, SHL, ExYu, arabiska, turkiska och 20 000+ internationella kanaler i 4K. Aktivering på 10 minuter. Gratis 24h test.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sverige TV — Bästa IPTV Sverige 2026",
        type: "image/jpeg",
      },
    ],
    countryName: "Sweden",
  },
  twitter: {
    card: "summary_large_image",
    site: "@premiumiptv",
    creator: "@premiumiptv",
    title: "Bästa IPTV Sverige 2026 — 20 000+ Kanaler, 4K",
    description:
      "Premium streaming Sverige — SVT, TV4, Allsvenskan + ExYu, arabiska, turkiska. Aktivering på 10 min. Gratis 24h test.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "streaming",
  classification: "Streaming Service, IPTV, Live Television, Entertainment",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
    shortcut: "/icon-192.png",
  },
  other: {
    "geo.region": "SE",
    "geo.placename": "Sverige",
    "geo.position": "59.3293;18.0686",
    ICBM: "59.3293, 18.0686",
    language: "Swedish, English, French",
    rating: "general",
    distribution: "global",
    coverage: "worldwide",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sv"
      dir="ltr"
      className={geistSans.variable + " h-full antialiased"}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
