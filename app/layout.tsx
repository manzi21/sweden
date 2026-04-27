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
    default:
      "Sverige TV - Premium Streaming Worldwide | 20 000+ Channels in 4K",
    template: "%s | Sverige TV",
  },
  description:
    "Sverige TV - premium streaming platform built in Sweden, available worldwide. 20,000+ live channels in 4K, 100,000+ films & series. Activated in 10 minutes via WhatsApp. Trusted by viewers and expats in 50+ countries.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Sverige TV",
    "IPTV Sverige",
    "svenska kanaler",
    "SVT utomlands",
    "TV4 IPTV",
    "Allsvenskan stream",
    "Viaplay alternativ",
    "C More alternativ",
    "streaming Sverige",
    "live TV Sverige",
    "svensk IPTV",
    "Firestick Sverige",
    "IPTV med EPG",
    "4K IPTV Sverige",
    "svensk TV Dubai",
    "svensk TV utomlands",
    "Allsvenskan utomlands",
    "SHL stream",
    "SVT Play utomlands",
    "Nordiska kanaler",
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
    title: "Sverige TV - Premium Streaming Worldwide. 20,000+ Channels in 4K.",
    description:
      "Built in Sweden. Available worldwide. SVT, TV4, Allsvenskan and 20,000+ international channels in 4K. Trusted by viewers and expats in 50+ countries. Activated in 10 minutes.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sverige TV - Premium Streaming Worldwide",
        type: "image/jpeg",
      },
    ],
    countryName: "Sweden",
  },
  twitter: {
    card: "summary_large_image",
    site: "@premiumiptv",
    creator: "@premiumiptv",
    title: "Sverige TV - 20,000+ Channels, 4K, Worldwide",
    description:
      "Premium streaming built in Sweden. Available worldwide. Activated in 10 minutes.",
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
