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
const OG_IMAGE = SITE_URL + "/og-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Bästa IPTV Sverige 2026 — 20 000+ Kanaler, 4K, från 50 kr/mån | Sverige TV",
    template: "%s | Sverige TV",
  },
  description:
    "🇸🇪 Sveriges bästa IPTV 2026 — 20 000+ kanaler i 4K UHD.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
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
                                          gtag('config', 'G-EPKZXE858L');
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
