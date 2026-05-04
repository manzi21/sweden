import type { Metadata } from "next";
import {
  Landing,
  CROSS_LINKS,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  type FAQ,
  type Section,
} from "../_landing/Landing";

const SLUG = "iptv-smart-tv-sverige";
const SITE_URL = "https://premiumiptv.se";
const PAGE_TITLE = "IPTV Smart TV Sverige";
const TITLE = "IPTV Smart TV Sverige 2026 — Samsung, LG & Sony Installation";
const DESC =
  "IPTV på Smart TV i Sverige — komplett guide för Samsung, LG WebOS, Sony Bravia & Philips. Smart IPTV, IPTV Smarters Pro, M3U-installation. Aktivering på 10 min, gratis test 24h.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `/${SLUG}` },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/${SLUG}`,
    title: TITLE,
    description: DESC,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const FAQS: FAQ[] = [
  {
    q: "Funkar Sverige TV på alla Smart TV-modeller?",
    a: "Ja, vi stödjer Samsung Tizen (2017+), LG WebOS (3.5+), Sony Bravia Android TV, Philips Saphi/Android TV, Hisense VIDAA och Toshiba. Äldre modeller kan kräva en HDMI-tillbehörsenhet som Firestick eller Android TV Box.",
  },
  {
    q: "Vilken app använder jag på Samsung Smart TV?",
    a: "Smart IPTV (SIPTV) eller IPTV Smarters Pro. Smart IPTV är gratis i 7 dagar och kostar sedan en engångsavgift på cirka 5 EUR. Vi guidar dig genom installationen via WhatsApp och skickar M3U-länken direkt.",
  },
  {
    q: "Vilken app fungerar på LG WebOS?",
    a: "LG-användare kan välja mellan IPTV Smarters Pro (rekommenderas), Smart IPTV, eller SS IPTV. IPTV Smarters Pro är mest stabil på WebOS 4.0 och nyare och stödjer 4K-uppspelning, EPG och favoritlistor.",
  },
  {
    q: "Behöver jag installera apk eller sideloada?",
    a: "Nej, inte på Samsung eller LG. Apparna finns direkt i deras officiella appbutiker (Samsung App Store / LG Content Store). Sideloading behövs bara på äldre Android TV och Firestick.",
  },
  {
    q: "Hur lång tid tar installationen på Samsung TV?",
    a: "Cirka 5 minuter. Du installerar Smart IPTV från Samsung App Store, hittar din enhets MAC-adress, registrerar M3U-länken på siptv.app, och vips — alla 20 000+ kanaler laddas in med EPG.",
  },
  {
    q: "Kan jag använda Smart IPTV för 4K på Samsung?",
    a: "Ja, om TV:n är från 2018 eller senare och stödjer HEVC. Sverige TV streamar i 4K@50fps på utvalda sport- och filmkanaler. Du behöver minst 25 Mbit/s uppkoppling för stabil 4K.",
  },
  {
    q: "Min Smart TV är 8 år gammal — funkar det?",
    a: "Möjligen, men prestandan blir begränsad. Säkrast är att koppla in en Amazon Fire TV Stick (~600 kr) i HDMI-porten. Då får du modern hårdvara, snabb meny och 4K-stöd oavsett TV-ålder. Se vår Firestick-guide.",
  },
  {
    q: "Funkar EPG (kanalguide) på Smart TV?",
    a: "Ja. Vi skickar både M3U-länken och EPG-länken (XMLTV-format) som klistras in i appens inställningar. Då ser du programtablå 7 dagar framåt på alla kanaler.",
  },
  {
    q: "Får jag tillbaka pengarna om det inte funkar på min TV?",
    a: "Ja. Vi har 24-timmars nöjd-kund-garanti. Hör av dig på WhatsApp inom första dygnet om något inte fungerar — vi felsöker tillsammans eller återbetalar utan diskussion.",
  },
];

const SECTIONS: Section[] = [
  {
    h2: "Smart TV-modeller vi stödjer (2026)",
    body: (
      <>
        <p>
          IPTV på Smart TV är den enklaste lösningen för svenska hushåll: ingen
          extra hårdvara, ingen kabel, bara en app i den Smart TV du redan
          köpt. Sverige TV är optimerat för dessa plattformar:
        </p>
        <ul>
          <li><strong>Samsung Tizen</strong> (modell 2017 och nyare) — Smart IPTV (SIPTV) eller IPTV Smarters Pro.</li>
          <li><strong>LG WebOS</strong> (3.5+) — IPTV Smarters Pro, Smart IPTV, SS IPTV.</li>
          <li><strong>Sony Bravia Android TV / Google TV</strong> — IPTV Smarters Pro, TiviMate.</li>
          <li><strong>Philips Saphi & Philips Android TV</strong> — IPTV Smarters Pro.</li>
          <li><strong>Hisense VIDAA</strong> — IPTV Smarters Lite (rekommenderas).</li>
          <li><strong>Toshiba & TCL Google TV</strong> — TiviMate, IPTV Smarters.</li>
        </ul>
        <p>
          Har du en äldre modell utan dessa appar? Den enklaste lösningen är en
          <a href="/iptv-firestick-sverige"> Amazon Fire TV Stick</a> i
          HDMI-porten. Då blir vilken som helst gammal TV en modern Smart TV
          för cirka 600 kr.
        </p>
      </>
    ),
  },
  {
    h2: "Installation på Samsung Smart TV — 5 minuter",
    body: (
      <>
        <p>
          Stegvis guide för Samsung Tizen (2017–2026):
        </p>
        <ol>
          <li>Öppna <strong>Samsung App Store</strong> (Smart Hub-knappen → Apps).</li>
          <li>Sök efter <strong>"Smart IPTV"</strong> och installera (gratis).</li>
          <li>Starta appen — den visar en URL och en MAC-adress.</li>
          <li>Skicka MAC-adressen till oss på WhatsApp.</li>
          <li>Vi länkar din M3U-spellista och EPG på vår sida — klart inom 2 minuter.</li>
          <li>Starta om appen. Alla 20 000+ kanaler laddas in med EPG och kategorier.</li>
        </ol>
        <p>
          För Samsung 2024-modeller med ny Tizen rekommenderar vi istället
          IPTV Smarters Pro — den hanterar HEVC/4K bättre.
        </p>
      </>
    ),
  },
  {
    h2: "Installation på LG WebOS Smart TV",
    body: (
      <>
        <p>
          Stegvis guide för LG WebOS 3.5–24:
        </p>
        <ol>
          <li>Öppna <strong>LG Content Store</strong>.</li>
          <li>Sök efter <strong>"IPTV Smarters Pro"</strong> och installera.</li>
          <li>Vid första uppstart, välj <em>Login with Xtream Codes API</em> eller <em>Load M3U URL</em>.</li>
          <li>Klistra in M3U-länken vi skickar via WhatsApp.</li>
          <li>Klistra in EPG-länken (XMLTV).</li>
          <li>Spara och starta om — kanalerna grupperas automatiskt (Sverige, Sport, Film, Internationellt).</li>
        </ol>
      </>
    ),
  },
  {
    h2: "Vanliga problem och hur du löser dem",
    body: (
      <>
        <h3>Smart IPTV säger "Trial expired"</h3>
        <p>
          Smart IPTV är gratis i 7 dagar. Efter det kostar det cirka 5 EUR (engångsavgift) som du
          betalar direkt till siptv.app. Det är en separat avgift från Sverige
          TV — själva kanalerna kostar inget extra.
        </p>
        <h3>Buffring på sportkanaler</h3>
        <p>
          Kontrollera Wi-Fi-styrkan vid TV:n. Om signalen är svag, byt till
          Ethernet-kabel eller flytta routern närmare. För 4K-sport behöver du
          minst 25 Mbit/s konstant. Vi kan också byta din server-region om vi
          ser att routningen är dålig från din ISP.
        </p>
        <h3>Inga svenska kanaler i appen</h3>
        <p>
          Det är ofta en M3U-cachning. Logga ut, ta bort spellistan och
          lägg in den igen — eller skicka oss ett WhatsApp-meddelande, vi
          aktiverar din enhet manuellt på under 10 minuter.
        </p>
      </>
    ),
  },
];

export default function Page() {
  const jsonLd = [
    buildArticleJsonLd({
      slug: SLUG,
      headline: TITLE,
      description: DESC,
      datePublished: "2026-05-04",
    }),
    buildBreadcrumbJsonLd(SLUG, "IPTV Smart TV Sverige"),
    buildFaqJsonLd(FAQS),
  ];

  return (
    <Landing
      slug={SLUG}
      pageTitle={PAGE_TITLE}
      eyebrow="IPTV SMART TV SVERIGE"
      h1="IPTV på Smart TV i Sverige — Samsung, LG, Sony & Philips"
      lead="Komplett installationsguide för IPTV på Smart TV i Sverige. Funkar med Samsung Tizen, LG WebOS, Sony Bravia, Philips, Hisense och Toshiba. Aktivering på 5–10 minuter, gratis test 24h."
      intro={
        <>
          Du behöver ingen extra box för att titta på 20 000+ kanaler — om din
          Smart TV är från 2017 eller nyare räcker den. Den här guiden visar
          exakt hur du kommer igång på Samsung, LG och Sony, och vad du gör
          om något inte fungerar direkt.
        </>
      }
      sections={SECTIONS}
      faqs={FAQS}
      ctaPrimaryMsg="Hej! Jag vill installera Sverige TV på min Smart TV — kan du hjälpa mig?"
      ctaPrimaryLabel="Få Smart TV-installation via WhatsApp"
      crossLinks={[
        CROSS_LINKS.firestick,
        CROSS_LINKS.sport,
        CROSS_LINKS.utanBindning,
        CROSS_LINKS.home,
      ]}
      jsonLd={jsonLd}
    />
  );
}
