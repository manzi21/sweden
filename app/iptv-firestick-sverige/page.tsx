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

const SLUG = "iptv-firestick-sverige";
const SITE_URL = "https://premiumiptv.se";
const PAGE_TITLE = "IPTV Firestick Sverige";
const TITLE = "IPTV Firestick Sverige 2026 — Installation på 5 min | IPTV Smarters & TiviMate";
const DESC =
  "Installera IPTV på Amazon Fire TV Stick i Sverige — komplett steg-för-steg-guide för IPTV Smarters Pro, TiviMate och Smart IPTV. Funkar på Firestick Lite, 4K & 4K Max. Gratis test 24h.";

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
    q: "Vilken Firestick-modell är bäst för IPTV i Sverige?",
    a: "Amazon Fire TV Stick 4K Max (3:e generationen, 2023+) är vårt förstaval. Den har Wi-Fi 6E, snabb processor, 4K HDR10+ och Dolby Vision. För 1080p räcker Firestick Lite eller den vanliga 4K. Alla tre fungerar med Sverige TV.",
  },
  {
    q: "Behöver jag jailbreaka Firestick för att installera IPTV?",
    a: "Nej. Du sideloadar appar via Amazons egen Downloader-app — det är fullt tillåtet och kräver ingen jailbreak. Vi guidar dig steg för steg på under 5 minuter.",
  },
  {
    q: "Vilken IPTV-app rekommenderar ni för Firestick?",
    a: "TiviMate (premium, ~20 USD/år) är vårt förstaval för seriösa användare — den har bäst gränssnitt, snabbast EPG och stöd för flera spellistor. För enklare bruk fungerar IPTV Smarters Pro lika bra och är gratis. Bägge installeras via Downloader.",
  },
  {
    q: "Hur installerar jag IPTV Smarters Pro på Firestick?",
    a: "1) Aktivera 'Apps from Unknown Sources' i Firestick-inställningar. 2) Installera Downloader från Amazon Appstore. 3) Öppna Downloader och skriv in URL till IPTV Smarters APK. 4) Installera. 5) Vid första uppstart, välj 'Login with Xtream Codes API' och klistra in inloggningsuppgifterna vi skickar via WhatsApp.",
  },
  {
    q: "Hur installerar jag TiviMate på Firestick?",
    a: "TiviMate finns inte i Amazon Appstore — du måste sideloada. 1) Aktivera Unknown Sources. 2) Installera Downloader. 3) I Downloader, gå till tivimate.com och ladda ned APK. 4) Installera och öppna. 5) Lägg till spellistan via M3U-länk eller Xtream Codes API.",
  },
  {
    q: "Funkar 4K på Firestick 4K Max?",
    a: "Ja, helt. Firestick 4K Max stödjer 4K@60fps med HDR10+, Dolby Vision och Dolby Atmos. Sverige TV streamar 4K@50fps på utvalda sport- och filmkanaler. Du behöver minst 25 Mbit/s uppkoppling och en TV som stödjer 4K HDR.",
  },
  {
    q: "Buffring på Firestick — hur fixar jag det?",
    a: "Tre vanliga orsaker: 1) Wi-Fi-signal — placera router närmare eller använd Ethernet-adapter. 2) Annan trafik på nätet — pausa nedladdningar. 3) Server-routning — vi kan flytta dig till en närmare server. Skicka oss ett WhatsApp-meddelande så loggar vi in på din konfiguration och löser det inom 10 minuter.",
  },
  {
    q: "Måste jag använda VPN på Firestick?",
    a: "Inte nödvändigt, men rekommenderas. VPN ger extra integritet (din ISP ser inte vilka kanaler du tittar på) och kringgår eventuell ISP-throttling under helger. NordVPN, Surfshark och ProtonVPN har dedikerade Firestick-appar. Vi kan rekommendera baserat på din situation.",
  },
  {
    q: "Förlorar jag IPTV om Firestick startas om?",
    a: "Nej. Apparna och spellistan är permanent installerade. Du startar Firestick, öppnar IPTV Smarters / TiviMate, och allt är där. Skulle du återställa Firestick till fabriksinställningar måste du installera om — det tar samma 5 minuter.",
  },
];

const SECTIONS: Section[] = [
  {
    h2: "Förutsättningar",
    body: (
      <>
        <p>Innan du sätter igång behöver du:</p>
        <ul>
          <li>En Amazon Fire TV Stick (Lite, 4K, eller 4K Max — alla tre fungerar).</li>
          <li>Stabil internetuppkoppling (minst 10 Mbit/s för HD, 25 Mbit/s för 4K).</li>
          <li>Ett aktivt Sverige TV-abonnemang eller ett pågående gratis test 24h. <a href="/iptv-utan-bindning">Se prismodell utan bindning</a>.</li>
          <li>Cirka 5 minuter.</li>
        </ul>
        <p>
          Du behöver inte ha tekniska kunskaper. Vi guidar via WhatsApp om
          något fastnar och kan i de flesta fall fjärr-konfigurera ditt
          paket åt dig.
        </p>
      </>
    ),
  },
  {
    h2: "Steg 1 — aktivera installation från okända källor",
    body: (
      <>
        <p>
          Firestick kommer fabriksinställd för att bara installera appar från
          Amazon Appstore. För IPTV-appar måste du tillåta sideloading:
        </p>
        <ol>
          <li>Från startskärmen: <strong>Inställningar → Min Fire TV</strong>.</li>
          <li>Välj <strong>Utvecklaralternativ</strong>.</li>
          <li>Slå på <strong>Apps from Unknown Sources</strong> (ofta kallat "Installera okända appar" på svenska Firestick).</li>
          <li>Bekräfta varningen.</li>
        </ol>
        <p>
          På Firestick 4K Max (2023+) ligger inställningen ibland under
          <em> Installera okända appar</em> per app — då måste du senare
          tillåta Downloader specifikt.
        </p>
      </>
    ),
  },
  {
    h2: "Steg 2 — installera Downloader-appen",
    body: (
      <>
        <p>
          Downloader är en gratis app från Amazons egen butik som låter dig
          ladda ned APK-filer direkt:
        </p>
        <ol>
          <li>Gå till startsidan → <strong>sökikonen</strong> uppe till vänster.</li>
          <li>Sök efter <strong>"Downloader"</strong>.</li>
          <li>Välj appen från utvecklaren AFTVnews.</li>
          <li>Klicka <strong>Installera</strong> — det tar cirka 30 sekunder.</li>
        </ol>
      </>
    ),
  },
  {
    h2: "Steg 3 — installera IPTV-appen (välj en)",
    body: (
      <>
        <h3>Alternativ A — IPTV Smarters Pro (rekommenderas för nybörjare)</h3>
        <ol>
          <li>Öppna Downloader.</li>
          <li>I URL-fältet, skriv: <code>www.iptvsmarters.com</code> och tryck Go.</li>
          <li>Ladda ned senaste APK och installera.</li>
          <li>Vid första uppstart, välj <em>Login with Xtream Codes API</em>.</li>
          <li>Skriv in <strong>användarnamn, lösenord och server-URL</strong> (vi skickar dem via WhatsApp efter beställning).</li>
          <li>Spara — alla 20 000+ kanaler laddas in med EPG.</li>
        </ol>
        <h3>Alternativ B — TiviMate (premium, snyggare)</h3>
        <ol>
          <li>Öppna Downloader.</li>
          <li>I URL-fältet, skriv: <code>tivimate.com</code> och navigera till nedladdningssidan.</li>
          <li>Ladda ned APK och installera.</li>
          <li>Öppna TiviMate och välj <em>Add playlist → M3U playlist</em>.</li>
          <li>Klistra in M3U-länken vi skickar.</li>
          <li>Lägg till EPG-länk under Settings → EPG.</li>
        </ol>
        <p>
          TiviMate kostar cirka 20 USD/år för premiumversionen (krävs för fler
          spellistor och avancerad EPG). Gratisversionen räcker för en
          spellista.
        </p>
      </>
    ),
  },
  {
    h2: "Steg 4 — finjustera bildkvalitet och prestanda",
    body: (
      <>
        <p>När du är inloggad rekommenderar vi att aktivera följande:</p>
        <ul>
          <li><strong>Hardware decoder</strong> i app-inställningar (för 4K HEVC).</li>
          <li><strong>Auto-EPG-uppdatering</strong> var 6:e timme.</li>
          <li><strong>Buffer-storlek</strong>: 2 000–3 000 ms för stabil sport.</li>
          <li>Stäng av <strong>animationer</strong> i Firestick-inställningar för snabbare meny.</li>
          <li>Använd <strong>Ethernet-adapter</strong> (Amazon säljer en officiell för cirka 200 kr) om Wi-Fi är instabil.</li>
        </ul>
      </>
    ),
  },
  {
    h2: "Felsökning — om något inte funkar",
    body: (
      <>
        <h3>"Could not retrieve playlist"</h3>
        <p>
          Spellist-länken är fel eller har inte aktiverats än. Skicka oss
          ditt användarnamn på WhatsApp så kontrollerar vi din profil.
        </p>
        <h3>Buffring under live-sport</h3>
        <p>
          Vanligen Wi-Fi eller server-distance. Vi har servrar i Stockholm,
          Frankfurt och Amsterdam — vi flyttar din konfiguration till
          närmaste på begäran.
        </p>
        <h3>Appen kraschar vid 4K-kanal</h3>
        <p>
          Firestick Lite (1:a gen) saknar HEVC-stöd för 4K. Du behöver minst
          Firestick 4K eller 4K Max för 4K-uppspelning.
        </p>
        <h3>Fjärrkontrollen reagerar långsamt</h3>
        <p>
          Stäng appar i bakgrunden (Inställningar → Applikationer → Hantera
          installerade applikationer → tvinga stopp). Det frigör RAM på
          Firestick Lite/Standard.
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
    buildBreadcrumbJsonLd(SLUG, "IPTV Firestick Sverige"),
    buildFaqJsonLd(FAQS),
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Installera IPTV på Firestick i Sverige",
      description:
        "Steg-för-steg-guide för att installera Sverige TV på Amazon Fire TV Stick (Lite, 4K, 4K Max) med IPTV Smarters Pro eller TiviMate.",
      totalTime: "PT5M",
      tool: [
        { "@type": "HowToTool", name: "Amazon Fire TV Stick" },
        { "@type": "HowToTool", name: "Internetuppkoppling 10+ Mbit/s" },
      ],
      step: [
        { "@type": "HowToStep", name: "Aktivera okända källor", text: "Inställningar → Min Fire TV → Utvecklaralternativ → Apps from Unknown Sources." },
        { "@type": "HowToStep", name: "Installera Downloader", text: "Sök 'Downloader' i Amazon Appstore och installera." },
        { "@type": "HowToStep", name: "Ladda ned IPTV-app", text: "Öppna Downloader, ladda ned IPTV Smarters Pro eller TiviMate APK." },
        { "@type": "HowToStep", name: "Logga in med Xtream Codes", text: "Skriv in användarnamn, lösenord och server-URL från Sverige TV." },
        { "@type": "HowToStep", name: "Klart", text: "Alla 20 000+ kanaler laddas in med EPG. Total tid ca 5 minuter." },
      ],
    },
  ];

  return (
    <Landing
      slug={SLUG}
      pageTitle={PAGE_TITLE}
      eyebrow="IPTV FIRESTICK SVERIGE"
      h1="IPTV på Firestick i Sverige — installation på 5 minuter"
      lead="Komplett guide för IPTV på Amazon Fire TV Stick i Sverige. IPTV Smarters Pro & TiviMate, sideloading via Downloader, 4K-uppspelning, felsökning. Funkar på Firestick Lite, 4K & 4K Max."
      intro={
        <>
          Firestick är den enklaste och billigaste vägen till IPTV i Sverige
          — en gång installerad funkar den i flera år utan underhåll. Den här
          guiden tar dig från en oöppnad Firestick till 20 000+ kanaler på
          under 5 minuter.
        </>
      }
      sections={SECTIONS}
      faqs={FAQS}
      ctaPrimaryMsg="Hej! Jag vill installera Sverige TV på min Firestick — kan du guida mig?"
      ctaPrimaryLabel="Få Firestick-installation via WhatsApp"
      crossLinks={[
        CROSS_LINKS.smartTv,
        CROSS_LINKS.sport,
        CROSS_LINKS.utanBindning,
        CROSS_LINKS.home,
      ]}
      jsonLd={jsonLd}
    />
  );
}
