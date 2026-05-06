"use client";

// components/client/InternationalSection.tsx
// Targets Swedish & Nordic expats worldwide. SEO long-tail anchor.

import { useLanguage } from "./LanguageProvider";
import { generateWhatsAppLink } from "../shared/utils";
import type { Locale } from "../shared/types";

const EXPAT_COUNTRIES: { flag: string; code: string; name: string; en: string; sv: string; fr: string }[] = [
  { flag: "🇦🇪", code: "ae", name: "UAE / Dubai", en: "Watch Swedish TV in Dubai & UAE — low latency, 4K stable.", sv: "Svensk TV i Dubai — stabil 4K-stream, låg latens.", fr: "TV suédoise à Dubaï — 4K stable, faible latence." },
  { flag: "🇺🇸", code: "us", name: "USA", en: "Swedish & Nordic channels for expats across the United States.", sv: "Svenska & nordiska kanaler för svenskar i USA.", fr: "Chaînes suédoises pour expatriés aux États-Unis." },
  { flag: "🇬🇧", code: "gb", name: "United Kingdom", en: "Watch SVT, TV4 & Allsvenskan in London, Manchester or anywhere in the UK.", sv: "Se SVT, TV4 & Allsvenskan från London eller hela UK.", fr: "Regardez SVT, TV4 & Allsvenskan depuis tout le Royaume-Uni." },
  { flag: "🇩🇪", code: "de", name: "Deutschland", en: "Schwedisches Fernsehen in Deutschland — SVT, TV4, Sport in 4K.", sv: "Svensk TV i Tyskland — SVT, TV4 & sport i 4K.", fr: "TV suédoise en Allemagne — SVT, TV4 & sport en 4K." },
  { flag: "🇪🇸", code: "es", name: "España", en: "Swedish TV in Spain — perfect for Swedish snowbirds & retirees on Costa del Sol.", sv: "Svensk TV i Spanien — för pensionärer och permanentboende på Costa del Sol.", fr: "TV suédoise en Espagne — idéal pour retraités sur la Costa del Sol." },
  { flag: "🇳🇴", code: "no", name: "Norge", en: "Nordic streaming — Norwegian, Swedish & Danish channels in HD.", sv: "Nordisk streaming — norska, svenska & danska kanaler i HD.", fr: "Streaming nordique — chaînes norvégiennes, suédoises et danoises HD." },
  { flag: "🇩🇰", code: "dk", name: "Danmark", en: "Danish & Swedish channels — DR1, TV2 Danmark, SVT and more.", sv: "Danska och svenska kanaler — DR1, TV2 Danmark, SVT med fler.", fr: "Chaînes danoises et suédoises — DR1, TV2 Danmark, SVT et plus." },
  { flag: "🇫🇮", code: "fi", name: "Suomi", en: "Finnish & Swedish — Yle, MTV3, SVT and Nordic channels in one package.", sv: "Finska & svenska — Yle, MTV3, SVT och nordiska kanaler i ett paket.", fr: "Finlandais & suédois — Yle, MTV3, SVT et chaînes nordiques en un pack." },
  { flag: "🇨🇭", code: "ch", name: "Schweiz", en: "Swedish TV in Switzerland — ideal for cross-border expats.", sv: "Svensk TV i Schweiz — perfekt för svenskar i Schweiz.", fr: "TV suédoise en Suisse — idéal pour expatriés transfrontaliers." },
  { flag: "🇸🇦", code: "sa", name: "Saudi Arabia", en: "Watch Swedish & Nordic channels across Saudi Arabia.", sv: "Se svenska & nordiska kanaler i Saudiarabien.", fr: "Regardez les chaînes suédoises et nordiques en Arabie Saoudite." },
  { flag: "🇨🇦", code: "ca", name: "Canada", en: "Swedish IPTV across Canada — Toronto, Vancouver, Montréal.", sv: "Svensk IPTV i Kanada — Toronto, Vancouver, Montréal.", fr: "IPTV suédoise au Canada — Toronto, Vancouver, Montréal." },
  { flag: "🇦🇺", code: "au", name: "Australia", en: "Swedish channels Down Under — built to handle the latency.", sv: "Svenska kanaler i Australien — anpassad för långa avstånd.", fr: "Chaînes suédoises en Australie — optimisé pour la latence." },
];

const EXPAT_COPY: Record<Locale, {
  title: string;
  sub: string;
  tagline: string;
  benefitsTitle: string;
  benefits: { icon: string; title: string; desc: string }[];
  cta: string;
  ctaSecondary: string;
  eyebrow: string;
}> = {
  sv: {
    eyebrow: "GLOBAL TÄCKNING",
    title: "Sverige TV — för svenskar och nordbor i hela världen",
    sub: "20 000+ live-kanaler i 4K. Optimerat för svenska och nordiska expatriater i Dubai, USA, UK, Tyskland, Spanien och hela världen. Inga geo-blockeringar. SVT, TV4, Allsvenskan och SHL var du än är.",
    tagline: "Klicka på ditt land — vi optimerar streamen för din region.",
    benefitsTitle: "Varför 1 200+ svenskar utomlands väljer Sverige TV",
    benefits: [
      { icon: "🌍", title: "Fungerar i 50+ länder", desc: "Lågt-latensservrar i Europa, USA, Mellanöstern och Asien. Stabil 4K oavsett kontinent." },
      { icon: "📺", title: "Alla svenska kanaler", desc: "SVT 1, SVT 2, TV4, Kanal 5, TV3, Kanal 9, SVT Play Live + Allsvenskan, SHL och C More Sport." },
      { icon: "⚡", title: "Inga geo-blockeringar", desc: "Tjänsten fungerar utan VPN. Du behöver inget extra abonnemang för att se SVT utomlands." },
      { icon: "💬", title: "Support på svenska", desc: "WhatsApp-support på svenska 7 dagar i veckan, oavsett tidszon." },
    ],
    cta: "Beställ via WhatsApp",
    ctaSecondary: "Mitt land finns inte här",
  },
  en: {
    eyebrow: "WORLDWIDE COVERAGE",
    title: "Sverige TV — Swedish & Nordic streaming for expats worldwide",
    sub: "20,000+ live channels in 4K. Built for Swedish and Nordic expatriates living in Dubai, the United States, the UK, Germany, Spain and beyond. No geo-blocking. Watch SVT, TV4, Allsvenskan and SHL from anywhere.",
    tagline: "Tap your country — we route the stream through the closest low-latency edge.",
    benefitsTitle: "Why 1,200+ Swedish expats trust Sverige TV abroad",
    benefits: [
      { icon: "🌍", title: "Works in 50+ countries", desc: "Low-latency edge servers across Europe, the US, the Middle East and Asia. Reliable 4K wherever you are." },
      { icon: "📺", title: "Every Swedish channel", desc: "SVT 1, SVT 2, TV4, Kanal 5, TV3, Kanal 9, SVT Play Live + Allsvenskan, SHL and C More Sport — included." },
      { icon: "⚡", title: "No geo-blocking", desc: "The service works without a VPN. You don't need a separate Swedish subscription to watch SVT abroad." },
      { icon: "💬", title: "English & Swedish support", desc: "WhatsApp support 7 days a week, in English, Swedish, French and Arabic." },
    ],
    cta: "Order via WhatsApp",
    ctaSecondary: "My country isn't listed",
  },
  fr: {
    eyebrow: "COUVERTURE MONDIALE",
    title: "Sverige TV — streaming suédois et nordique pour expatriés du monde entier",
    sub: "20 000+ chaînes live en 4K. Conçu pour les expatriés suédois et nordiques à Dubaï, aux États-Unis, au Royaume-Uni, en Allemagne, en Espagne et partout ailleurs. Sans géo-blocage. Regardez SVT, TV4, Allsvenskan et SHL où que vous soyez.",
    tagline: "Choisissez votre pays — on optimise le stream via le serveur le plus proche.",
    benefitsTitle: "Pourquoi 1 200+ expatriés suédois choisissent Sverige TV",
    benefits: [
      { icon: "🌍", title: "Fonctionne dans 50+ pays", desc: "Serveurs edge basse latence en Europe, USA, Moyen-Orient et Asie. 4K stable sur tous les continents." },
      { icon: "📺", title: "Toutes les chaînes suédoises", desc: "SVT 1, SVT 2, TV4, Kanal 5, TV3, Kanal 9, SVT Play Live + Allsvenskan, SHL et C More Sport — inclus." },
      { icon: "⚡", title: "Sans géo-blocage", desc: "Le service fonctionne sans VPN. Pas besoin d'abonnement supplémentaire pour regarder SVT à l'étranger." },
      { icon: "💬", title: "Support en français", desc: "Assistance WhatsApp 7 j/7 en français, anglais, suédois et arabe." },
    ],
    cta: "Commander via WhatsApp",
    ctaSecondary: "Mon pays n'est pas listé",
  },
};

export function InternationalSection({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const c = EXPAT_COPY[lang];
  const buildMsg = (countryName: string) => {
    if (lang === "sv") return `Hej! Jag bor i ${countryName} och vill ha Sverige TV.`;
    if (lang === "fr") return `Bonjour ! Je vis à ${countryName} et je veux Sverige TV.`;
    return `Hi! I'm based in ${countryName} and I'd like Sverige TV.`;
  };
  const notListed =
    lang === "sv"
      ? "Hej! Mitt land är inte i listan — kan jag använda Sverige TV?"
      : lang === "fr"
        ? "Bonjour ! Mon pays n'est pas listé — Sverige TV est-il disponible ?"
        : "Hi! My country isn't listed — is Sverige TV available there?";

  return (
    <section id="international" className="section">
      <div className="sectionHead">
        <span className="intlEyebrow">{c.eyebrow}</span>
        <h2>{c.title}</h2>
        <p>{c.sub}</p>
      </div>

      <p className="intlTagline">{c.tagline}</p>

      <div className="intlGrid" role="list">
        {EXPAT_COUNTRIES.map((country) => {
          const desc = country[lang];
          return (
            <a
              key={country.code}
              role="listitem"
              className="intlCard"
              href={generateWhatsAppLink(buildMsg(country.name), ua, `Intl-${country.code}`)}
              target="_blank"
              rel="noreferrer"
              aria-label={`${country.name} — ${desc}`}
            >
              <span className="intlFlag" aria-hidden="true">{country.flag}</span>
              <div className="intlBody">
                <h3 className="intlName">{country.name}</h3>
                <p className="intlDesc">{desc}</p>
              </div>
              <span className="intlArrow" aria-hidden="true">›</span>
            </a>
          );
        })}
      </div>

      <div className="intlBenefits">
        <h3 className="intlBenefitsTitle">{c.benefitsTitle}</h3>
        <div className="intlBenefitsGrid">
          {c.benefits.map((b) => (
            <div key={b.title} className="intlBenefit">
              <span className="intlBenefitIcon" aria-hidden="true">{b.icon}</span>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="stepsCtaWrap" style={{ marginTop: 28, flexDirection: "column", gap: 10 }}>
        <a
          className="btnPrimary"
          href={generateWhatsAppLink(buildMsg("[your country]"), ua, "Intl-Generic")}
          target="_blank"
          rel="noreferrer"
        >
          {c.cta}
        </a>
        <a
          className="btnSecondary"
          href={generateWhatsAppLink(notListed, ua, "Intl-NotListed")}
          target="_blank"
          rel="noreferrer"
        >
          {c.ctaSecondary}
        </a>
      </div>
    </section>
  );
}
