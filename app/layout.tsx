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

/**
 * CTR title hypotheses — three Swedish-first variants (kept here so
 * marketing can swap quickly). Variant A is shipped; B/C are documented
 * for A/B testing via Vercel rewrites or Edge config.
 *
 *  A. "IPTV Sverige 2026 — 20 000+ kanaler i 4K | Gratis test 24h"
 *  B. "Bästa IPTV i Sverige 2026 — SVT, TV4 & Allsvenskan från 83 kr/mån"
 *  C. "IPTV utan bindning — Testa Sverige TV gratis 24h | Aktivering 10 min"
 *
 * All three lead with the head-term "IPTV Sverige" / "IPTV i Sverige", carry
 * the year (recency cue), one concrete number (channels OR price OR time)
 * and a benefit anchor (gratis test / utan bindning). Stick the variant in
 * the X-CTR-Variant cookie via middleware to bucket users consistently.
 */
const TITLE = "IPTV Sverige 2026 — 20 000+ kanaler i 4K | Gratis test 24h";
const DESCRIPTION =
  "IPTV i Sverige från 83 kr/mån. SVT, TV4, Allsvenskan, SHL och 20 000+ kanaler i 4K. Gratis test 24h, ingen bindning, aktivering på 10 min via WhatsApp. Funkar på Firestick, Smart TV, iPhone & Android.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Sverige TV",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    // ── Swedish head-terms (highest intent) ─────────────────────────────
    "iptv sverige",
    "iptv i sverige",
    "bästa iptv sverige",
    "bästa iptv 2026",
    "iptv 2026",
    "iptv test",
    "iptv gratis test",
    "iptv gratis test 24h",
    "iptv sverige gratis test",
    "iptv utan bindning",
    "iptv utan bindning sverige",
    "iptv abonnemang sverige",
    "svensk iptv",
    "köp iptv sverige",
    "iptv köp",
    "iptv prenumeration",
    "premium iptv sverige",
    "stabil iptv sverige",

    // ── Device-based long-tail ──────────────────────────────────────────
    "iptv firestick sverige",
    "iptv smart tv sverige",
    "iptv samsung tv",
    "iptv lg tv sverige",
    "iptv android sverige",
    "iptv iphone sverige",
    "iptv mag box sverige",
    "iptv android tv box",

    // ── Sport long-tail ─────────────────────────────────────────────────
    "iptv sport sverige",
    "bästa iptv sport sverige",
    "allsvenskan iptv",
    "allsvenskan stream",
    "shl stream",
    "premier league sverige iptv",
    "champions league iptv",
    "viaplay alternativ",
    "c more alternativ",

    // ── Channel-based ───────────────────────────────────────────────────
    "svt utomlands",
    "tv4 iptv",
    "svt play live",
    "svenska kanaler iptv",
    "svenska kanaler utomlands",
    "kanal 5 iptv",
    "tv3 iptv",

    // ── Apps & tech ─────────────────────────────────────────────────────
    "tivimate sverige",
    "iptv smarters sverige",
    "m3u sverige",
    "iptv epg sverige",
    "4k iptv sverige",

    // ── Worldwide / expat ───────────────────────────────────────────────
    "svensk tv utomlands",
    "svensk tv dubai",
    "swedish tv abroad",
    "swedish iptv",
    "watch svt outside sweden",
    "nordic iptv",
    "nordic streaming",
    "swedish channels worldwide",
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
    // OG title is what shows on Facebook/LinkedIn/iMessage previews —
    // keep it punchier than the SERP title.
    title: "IPTV Sverige 2026 — 20 000+ kanaler i 4K. Gratis test 24h.",
    description:
      "SVT, TV4, Allsvenskan, SHL & 20 000+ kanaler i 4K. Från 83 kr/mån. Gratis test 24h. Ingen bindning. Aktivering på 10 min via WhatsApp. Funkar på Firestick, Smart TV, iPhone & Android.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sverige TV — IPTV i Sverige med 20 000+ kanaler i 4K",
        type: "image/jpeg",
      },
    ],
    countryName: "Sweden",
  },
  twitter: {
    card: "summary_large_image",
    site: "@premiumiptv",
    creator: "@premiumiptv",
    title: "IPTV Sverige 2026 — 20 000+ kanaler i 4K. Gratis test 24h.",
    description:
      "SVT, TV4, Allsvenskan & 20 000+ kanaler i 4K. Från 83 kr/mån. Aktivering 10 min via WhatsApp.",
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
