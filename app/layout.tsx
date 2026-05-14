// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://premiumiptv.se";
const SITE_NAME = "Sverige TV";
const OG_IMAGE = SITE_URL + "/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Bästa IPTV Sverige 2026 — 20 000+ Kanaler, 4K UHD, från 50 kr/mån | Sverige TV",
    template: "%s | Sverige TV",
  },
  description:
    "🇸🇪 Sveriges bästa IPTV 2026 — 20 000+ live-kanaler i 4K UHD, 100 000+ filmer & serier (VOD), EPG på svenska. SVT, TV4, Kanal 5, Viaplay, Allsvenskan, SHL, Premier League, NHL, Champions League. Plus ExYu, arabiska, turkiska, persiska, kurdiska, somaliska och afrikanska kanaler. Aktivering på 10 minuter via WhatsApp. Fungerar på Firestick, Smart TV (Samsung, LG, Philips), Apple TV, iPhone, iPad, Android, MAG, Formuler och PC. Gratis 24h test. Från endast 50 kr/mån.",
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "IPTV Sverige","IPTV 2026","bästa IPTV Sverige","bästa IPTV 2026","billig IPTV Sverige","premium IPTV Sverige","svensk IPTV","IPTV svenska kanaler","IPTV abonnemang","IPTV prenumeration","IPTV köpa","IPTV test","IPTV test 24h","IPTV gratis test","IPTV trial","IPTV pris","IPTV billigt","IPTV 50 kr","IPTV månadsabonnemang","IPTV årsabonnemang","IPTV utan bindningstid","IPTV reseller","IPTV återförsäljare","premiumiptv.se","Sverige TV","Sverige TV IPTV",
    "IPTV 4K","IPTV UHD","IPTV 4K UHD","IPTV HD","IPTV FHD","IPTV 8K","IPTV utan buffring","stabil IPTV","snabb IPTV",
    "SVT IPTV","SVT1","SVT2","SVT24","SVT Play","TV4","TV4 Play","TV3","Kanal 5","Kanal 9","Kanal 11","TV6","TV7","TV8","TV10","TV12","Sjuan","Viaplay","Viaplay Sport","Viaplay Total","C More","TV4 Fotboll","TV4 Hockey","Eurosport Sverige","Discovery Sverige","National Geographic Sverige","Disney Channel Sverige","Nickelodeon Sverige","Cartoon Network Sverige",
    "Allsvenskan stream","Allsvenskan IPTV","Allsvenskan live","SHL stream","SHL IPTV","SHL live","HockeyAllsvenskan","NHL Sverige","NHL stream","Premier League Sverige","Premier League stream","Champions League stream","Europa League stream","La Liga stream","Bundesliga stream","Serie A stream","Ligue 1 stream","Formel 1 stream","F1 stream Sverige","MMA stream","UFC stream","Boxning stream","Tennis stream","Golf stream","NBA stream","NFL stream","MLB stream","Handboll stream","Bandy stream","Innebandy stream",
    "VOD svenska","filmer på svenska","serier på svenska","Netflix alternativ","HBO Max alternativ","Disney Plus alternativ","Viaplay alternativ","SkyShowtime alternativ","Apple TV Plus alternativ","Amazon Prime alternativ","streaming alternativ Sverige","filmer 4K","serier 4K","100000 filmer","20000 kanaler",
    "ExYu IPTV","ExYu kanaler","ExYu TV Sverige","Balkan IPTV","srpska TV","hrvatska TV","bosanska TV","Pink TV","RTS","HRT","Nova TV","Arena Sport","arabiska kanaler","arabisk IPTV","MBC","Al Jazeera","OSN","beIN Sports arabiska","turkiska kanaler","turkisk IPTV","TRT","ATV","Show TV","Star TV","Kanal D","persiska kanaler","persisk IPTV","iransk TV","GEM TV","Manoto","kurdiska kanaler","kurdisk IPTV","Kurdistan TV","Rudaw","somaliska kanaler","somalisk IPTV","afrikanska kanaler","afrikansk IPTV","polska kanaler","polsk IPTV","tyska kanaler","engelska kanaler","spanska kanaler","franska kanaler","italienska kanaler","albanska kanaler","makedonska kanaler","rumänska kanaler","bulgariska kanaler","grekiska kanaler","ryska kanaler","ukrainska kanaler","indiska kanaler","pakistanska kanaler","filippinska kanaler","thailändska kanaler","vietnamesiska kanaler","kinesiska kanaler","latino IPTV",
    "IPTV Firestick","IPTV Fire TV","IPTV Amazon Firestick","IPTV Smart TV","IPTV Samsung Smart TV","IPTV LG Smart TV","IPTV Philips Smart TV","IPTV Sony Smart TV","IPTV Hisense","IPTV TCL","IPTV Android","IPTV Android TV","IPTV Android Box","IPTV iPhone","IPTV iPad","IPTV Apple TV","IPTV MacBook","IPTV Mac","IPTV PC","IPTV Windows","IPTV Linux","IPTV MAG","IPTV MAG box","IPTV Formuler","IPTV Formuler Z","IPTV Enigma2","IPTV Dreambox","IPTV Kodi","IPTV VLC","IPTV Tivimate","IPTV Smarters","IPTV Smarters Pro","IPTV IBO Player","IPTV GSE","IPTV Perfect Player","IPTV XCIPTV","IPTV Xtream Codes","Xtream IPTV","M3U IPTV","M3U lista","M3U8 lista",
    "IPTV aktivering 10 minuter","IPTV WhatsApp","IPTV köpa med Swish","IPTV Swish","IPTV PayPal","IPTV kort","IPTV Klarna","IPTV installation","IPTV guide","IPTV setup",
    "IPTV Stockholm","IPTV Göteborg","IPTV Malmö","IPTV Uppsala","IPTV Västerås","IPTV Örebro","IPTV Linköping","IPTV Helsingborg","IPTV Jönköping","IPTV Norrköping","IPTV Lund","IPTV Umeå","IPTV Gävle","IPTV Borås","IPTV Eskilstuna","IPTV Södertälje","IPTV Karlstad","IPTV Växjö","IPTV Halmstad","IPTV Sundsvall","IPTV Luleå","IPTV Trollhättan","IPTV Östersund","IPTV Kalmar",
    "IPTV Norge","IPTV Danmark","IPTV Finland","IPTV Island","IPTV Norden","IPTV Scandinavia",
    "EPG svenska","TV-guide IPTV","Catch-up TV","Replay TV","Timeshift IPTV","PVR IPTV","Anti-freeze IPTV","Multi connection IPTV","5 enheter samtidigt","familje IPTV","IPTV för hela familjen",
    "bästa IPTV leverantören i Sverige","var köper man IPTV i Sverige","är IPTV lagligt i Sverige","IPTV recension Sverige","IPTV omdöme","IPTV reviews Sverige","byta från Boxer till IPTV","byta från Comhem till IPTV","byta från Telia till IPTV","IPTV istället för Viaplay","spara pengar på TV","billigast TV-abonnemang"
  ],
  authors: [{ name: "Sverige TV", url: SITE_URL }],
  creator: "Sverige TV",
  publisher: "Sverige TV",
  category: "Streaming & Entertainment",
  classification: "IPTV, Streaming, Live TV, VOD",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "sv-SE": SITE_URL,
      "en-US": SITE_URL + "/en",
      "fr-FR": SITE_URL + "/fr",
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Bästa IPTV Sverige 2026 — 20 000+ Kanaler i 4K UHD från 50 kr/mån",
    description:
      "🇸🇪 Sveriges bästa IPTV — 20 000+ kanaler i 4K UHD, 100 000+ filmer & serier, EPG på svenska, SVT, TV4, Allsvenskan, SHL, Premier League, ExYu, arabiska, turkiska, persiska och kurdiska kanaler. Aktivering på 10 min via WhatsApp. Gratis 24h test.",
    url: SITE_URL,
    locale: "sv_SE",
    alternateLocale: ["en_US","fr_FR","ar_SA","tr_TR","fa_IR","sr_RS","hr_HR","bs_BA"],
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sverige TV — Bästa IPTV i Sverige 2026, 20 000+ kanaler i 4K UHD",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sverigetv",
    creator: "@sverigetv",
    title: "Bästa IPTV Sverige 2026 — 20 000+ Kanaler i 4K UHD från 50 kr/mån",
    description:
      "🇸🇪 20 000+ live-kanaler, 100 000+ filmer & serier, EPG svenska, SVT, TV4, Allsvenskan, SHL, Premier League + ExYu, arabiska, turkiska, persiska & kurdiska kanaler. Aktivering 10 min via WhatsApp. Gratis 24h test.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.svg"],
    other: [
      { rel: "mask-icon", url: "/favicon.svg", color: "#006AA7" },
    ],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    yandex: "REPLACE_WITH_YANDEX_TOKEN",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_TOKEN",
      "facebook-domain-verification": "REPLACE_WITH_FB_TOKEN",
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
  other: {
    "geo.region": "SE",
    "geo.placename": "Sverige",
    "geo.position": "62.0;15.0",
    ICBM: "62.0, 15.0",
    "revisit-after": "1 days",
    rating: "general",
    distribution: "global",
    language: "Swedish",
  },
};

export const viewport: Viewport = {
  themeColor: "#006AA7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
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
      <head>
        {/* Favicon & icons — explicit links for maximum browser/SERP compatibility */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#006AA7" />
        <meta name="theme-color" content="#006AA7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#003E66" media="(prefers-color-scheme: dark)" />

        {/* Preconnects for performance & SEO */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Google Tag Manager */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];
              w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N6FW87MZ');
            `,
          }}
        />
        <Script
          id="ga4-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-EPKZXE858L"
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EPKZXE858L', { 'anonymize_ip': true });
            `,
          }}
        />
      </head>

      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N6FW87MZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
