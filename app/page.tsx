// app/page.tsx
// SERVER COMPONENT — this is the SEO indexable content.
// All JSON-LD structured data is server-rendered → Google sees it immediately.
// Interactive parts are isolated in "use client" islands.
// NO "use client" at the top — this is intentional.

import { headers } from "next/headers";
import { dict } from "../components/shared/dict";
import { plans } from "../components/shared/plans";
import { SITE } from "../components/shared/site";

import { LanguageProvider } from "../components/client/LanguageProvider";
import { HeaderNav } from "../components/client/HeaderNav";
import { CinematicIntroController } from "../components/client/CinematicIntroController";
import {
  TopBar,
  Hero,
  TrialBanner,
  TrustSection,
  Offers,
  VODSection,
  CompareSection,
  ReviewsSection,
  DeviceSection,
  SwedenCities,
  QuickSetup,
  FaqSection,
  FooterSection,
} from "../components/client/LocalizedSections";
import { ChannelExplorer } from "../components/client/ChannelExplorer";
import { CountriesSection } from "../components/client/CountriesSection";
import { InternationalSection } from "../components/client/InternationalSection";
import { MoaChat } from "../components/client/MoaChat";
import { LiveActivity } from "../components/client/LiveActivity";
import { PWABar } from "../components/client/PWABar";
import { StickyMobileCta } from "../components/client/StickyMobileCta";

export default async function Page() {
  // Read user agent server-side to generate WhatsApp URLs without hydration mismatch
  const h = await headers();
  const ua = h.get("user-agent") ?? "";
  const t = dict.sv; // Swedish is the default for SSR (matches metadataBase locale)

  // ─── JSON-LD SCHEMAS — all generated server-side ──────────────────────────
  // These are critical for SEO: Google reads them directly from the HTML.

  const seller = {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.domain,
  };

  const shippingDetails = {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "SEK" },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "SE" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "MIN" },
      transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 10, unitCode: "MIN" },
    },
  };

  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "SE",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 1,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.domain}/#product`,
    name: "Sverige TV — Bästa IPTV Sverige 2026",
    brand: { "@type": "Brand", name: SITE.brand },
    description:
      "Sverige TV — 20 000+ live-kanaler, 100 000+ filmer & serier, EPG på svenska, 4K/UHD. SVT, TV4, Allsvenskan, SHL plus ExYu, arabiska, turkiska, persiska och kurdiska kanaler. Aktivering på 10 minuter via WhatsApp. Fungerar på Firestick, Smart TV, iPhone, Android och PC.",
    image: `${SITE.domain}/og-image.jpg`,
    url: SITE.domain,
    sku: "SVTV-STREAM-SE",
    mpn: "SVTV-2026",
    category: "Streaming / IPTV",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Erik L." },
        reviewBody:
          "Installationen gick på 10 minuter. SVT, TV4 och alla sportkanaler fungerar perfekt. Sparar 250 kr i månaden.",
        datePublished: "2026-01-12",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Lars P." },
        reviewBody:
          "Testade gratis 24h och köpte direkt årsabonnemanget. Allsvenskan, Premier League och NHL på ett ställe.",
        datePublished: "2026-02-08",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Dragan P." },
        reviewBody:
          "Konačno sve ExYu kanale na jednom mestu! Pink, RTS, HRT, Arena Sport — sve radi savršeno u 4K.",
        datePublished: "2026-03-20",
      },
    ],
    offers: plans.map((p) => ({
      "@type": "Offer",
      "@id": `${SITE.domain}/#offer-${p.key}`,
      name: t.planNames[p.key],
      description: `Sverige TV ${t.planNames[p.key]} — 20 000+ kanaler, 4K/UHD, EPG ingår.`,
      price: String(p.price),
      priceCurrency: "SEK",
      priceValidUntil: p.priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: SITE.domain,
      seller,
      shippingDetails,
      hasMerchantReturnPolicy: returnPolicy,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    "@id": `${SITE.domain}/#business`,
    name: SITE.brand,
    url: SITE.domain,
    logo: `${SITE.domain}/og-image.jpg`,
    image: `${SITE.domain}/og-image.jpg`,
    description:
      "Sverige TV — 20 000+ kanaler, 4K/UHD, sport, filmer & serier. Streaming-tjänst för Sverige med ExYu, arabiska, turkiska, persiska, kurdiska kanaler.",
    foundingDate: "2024",
    areaServed: [
      { "@type": "Country", name: "Sverige" },
      { "@type": "City", name: "Stockholm" },
      { "@type": "City", name: "Göteborg" },
      { "@type": "City", name: "Malmö" },
      { "@type": "City", name: "Uppsala" },
      { "@type": "City", name: "Västerås" },
      { "@type": "City", name: "Linköping" },
      { "@type": "City", name: "Örebro" },
      { "@type": "City", name: "Helsingborg" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressRegion: "Sverige",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${SITE.whatsappPhone}`,
      availableLanguage: ["Swedish", "English", "French", "Arabic"],
      contactOption: "https://schema.org/TollFree",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "23:00",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
      bestRating: "5",
    },
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
    priceRange: "50-600 SEK",
    currenciesAccepted: "SEK",
    paymentAccepted: "Swish, BankID, Klarna, Bank Transfer, PayPal, Apple Pay, Google Pay",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.domain}/#organization`,
    name: SITE.brand,
    legalName: "Sverige TV",
    url: SITE.domain,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.domain}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    image: `${SITE.domain}/og-image.jpg`,
    description:
      "Sverige TV — premium streaming-tjänst med 20 000+ live-kanaler, 100 000+ filmer & serier. Trusted by Swedish & Nordic expats worldwide. ExYu, arabiska, turkiska kanaler också tillgängliga.",
    foundingDate: "2024",
    areaServed: [
      "Sweden", "Norway", "Denmark", "Finland", "United Kingdom",
      "Germany", "Spain", "France", "United States", "United Arab Emirates",
      "Worldwide",
    ],
    knowsLanguage: ["sv", "en", "fr", "ar", "tr", "bs", "sr", "hr", "fa", "ku"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: `+${SITE.whatsappPhone}`,
        availableLanguage: ["Swedish", "English", "French", "Arabic"],
        contactOption: "TollFree",
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${SITE.whatsappPhone}`,
        availableLanguage: ["Swedish", "English", "French"],
        areaServed: "Worldwide",
      },
    ],
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.domain}/#website`,
    url: SITE.domain,
    name: SITE.brand,
    description:
      "Premium IPTV streaming for Sweden & Nordic expats worldwide — 20 000+ channels in 4K. ExYu, Arabic, Turkish channels available.",
    inLanguage: ["sv-SE", "en-US", "fr-FR"],
    publisher: { "@id": `${SITE.domain}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.domain}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
      { "@type": "ListItem", position: 2, name: "Plans", item: `${SITE.domain}/#offers` },
      { "@type": "ListItem", position: 3, name: "Channels", item: `${SITE.domain}/#channels` },
      { "@type": "ListItem", position: 4, name: "Countries", item: `${SITE.domain}/#countries` },
      { "@type": "ListItem", position: 5, name: "International", item: `${SITE.domain}/#international` },
      { "@type": "ListItem", position: 6, name: "Setup", item: `${SITE.domain}/#setup` },
      { "@type": "ListItem", position: 7, name: "FAQ", item: `${SITE.domain}/#faq` },
    ],
  };

  // Service schema — additional E-E-A-T signal for streaming category
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.domain}/#service`,
    name: "IPTV Sverige — Premium Streaming",
    description:
      "20 000+ live-kanaler, 100 000+ filmer & serier, 4K UHD, EPG på svenska. SVT, TV4, Allsvenskan, SHL, ExYu (Pink, RTS, HRT, Arena Sport), arabiska (MBC, Al Jazeera, beIN Sports), turkiska (TRT, Show TV) och 19 andra språk.",
    provider: { "@id": `${SITE.domain}/#organization` },
    serviceType: "IPTV Streaming Service",
    areaServed: { "@type": "Country", name: "Sverige" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sverige TV-paket",
      itemListElement: plans.map((p) => ({
        "@type": "Offer",
        name: t.planNames[p.key],
        price: String(p.price),
        priceCurrency: "SEK",
      })),
    },
    audience: {
      "@type": "Audience",
      audienceType: "Swedish households, Nordic expats, ExYu/Arabic/Turkish/Persian/Kurdish communities in Sweden",
    },
  };

  return (
    <LanguageProvider initial="sv">
      {/* Cinematic intro — desktop first visit only */}
      <CinematicIntroController />

      <div className="app">
        {/* JSON-LD structured data — server-rendered for Google + LLM crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />

        <div className="bg" />

        <TopBar />
        <HeaderNav ua={ua} />

        <main className="main">
          <Hero ua={ua} />

          {/* SEO INDEXABLE TEXT — visible to Google immediately, no JS needed */}
          {/* This block is hidden from users but readable by crawlers, providing
              a Swedish-first content baseline even before client hydration. */}
          <div
            style={{
              position: "absolute",
              left: -10000,
              width: 1,
              height: 1,
              overflow: "hidden",
            }}
            aria-hidden="true"
          >
            <h2>Bästa IPTV Sverige 2026 — 20 000+ kanaler från 50 kr/mån</h2>
            <p>
              Sverige TV är Sveriges ledande IPTV-tjänst 2026 med 20 000+ live-kanaler,
              100 000+ filmer & serier, 4K UHD-kvalitet och svensk WhatsApp-support 24/7.
              Vi erbjuder alla svenska kanaler (SVT1, SVT2, TV4, Kanal 5, TV3, TV6, TV8,
              Sjuan, Kanal 9, SVT Play Live), nordiska kanaler (NRK, DR1, Yle), sport
              (Allsvenskan, SHL, Premier League, La Liga, Champions League, NHL, NBA, NFL,
              Formel 1) plus dedikerade paket för ExYu (Pink, RTS, HRT, Arena Sport),
              arabiska (MBC, Al Jazeera, beIN Sports), turkiska (TRT, Show TV, Kanal D),
              persiska (Manoto, GEM TV), kurdiska (Rudaw, Kurdistan 24), somaliska,
              polska, finska och 12+ andra språk. Aktivering på 10 minuter via WhatsApp.
              Gratis 24h test utan kreditkort. Servrar i Stockholm och Helsingfors för
              minimal buffring. Kompatibelt med Firestick, Samsung Smart TV, LG, iPhone,
              iPad, Android, Android TV Box, MAG Box, Apple TV och PC/Mac. Stöder TiviMate,
              IPTV Smarters Pro, GSE Smart IPTV, Smart IPTV, XCIPTV och Kodi. Betalning via
              Swish, BankID, Klarna, MobilePay, PayPal, Apple Pay, Google Pay, Visa,
              Mastercard, Bitcoin. Optimerat för Telia, Bahnhof, Com Hem, Tele2.
              Ingen bindningstid, nöjd-kund-garanti, 99,9% uptime.
            </p>
            <p>
              Best IPTV Sweden 2026: Sverige TV offers premium IPTV streaming with 20,000+
              live channels in 4K UHD, including SVT, TV4, Allsvenskan, SHL, plus ExYu,
              Arabic, Turkish, Persian, Kurdish, Somali and more language packages.
              Activated in 10 minutes via WhatsApp. Free 24-hour trial without credit card.
              No commitment. Works on Firestick, Smart TV, iPhone, Android, MAG Box.
              Worldwide service for Swedish & Nordic expats in Dubai, USA, UK, Germany,
              Spain, Saudi Arabia, Canada, Australia.
            </p>
          </div>

          <TrialBanner ua={ua} />
          <TrustSection />
          <Offers ua={ua} />
          <VODSection />
          <CompareSection />
          <ChannelExplorer />
          <CountriesSection ua={ua} />
          <InternationalSection ua={ua} />
          <DeviceSection ua={ua} />
          <ReviewsSection />
          <SwedenCities ua={ua} />
          <QuickSetup ua={ua} />
          <FaqSection />
        </main>

        <FooterSection />

        {/* Floating UI elements */}
        <PWABar />
        <StickyMobileCta ua={ua} />
        <LiveActivity ua={ua} />
        <MoaChat ua={ua} />
      </div>
    </LanguageProvider>
  );
}
