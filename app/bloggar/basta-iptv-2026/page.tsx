import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../../_landing/StaticPage";

const SLUG = "bloggar/basta-iptv-2026";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Bästa IPTV i Sverige 2026 — testat och rangordnat";
const DESC = "Vi testade 7 svenska IPTV-leverantörer på pris, stabilitet, kanalutbud och support 2026. Här är resultatet — och vad du ska titta efter när du väljer själv.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `/${SLUG}` },
  openGraph: { type: "article", url: `${SITE_URL}/${SLUG}`, title: TITLE, description: DESC, images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }] },
};

export default function Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/${SLUG}#post`,
    headline: TITLE,
    description: DESC,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: "2026-04-02",
    dateModified: "2026-04-02",
    author: { "@type": "Organization", name: "Sverige TV", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Sverige TV", logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${SLUG}` },
    inLanguage: "sv-SE",
    articleSection: "Tester",
    wordCount: 1300,
  };

  return (
    <StaticPage
      slug={SLUG}
      pageTitle="Bästa IPTV 2026"
      eyebrow="BLOGG · 7 MIN LÄSTID"
      h1="Bästa IPTV i Sverige 2026 — testat och rangordnat"
      lastUpdated="2 april 2026"
      jsonLd={[articleSchema, buildBreadcrumbJsonLd(SLUG, "Bästa IPTV 2026")]}
      intro={
        <>
          Vi sätter ett betyg på pris, stabilitet, kanalutbud, support och
          ärlighet. Ingen leverantör har betalat för att placeras högre.
          Sverige TV är vår egen tjänst — vi betygsätter oss därför sist
          och inkluderar de mest brutala kritiska punkterna också.
        </>
      }
    >
      <h2>Så här testade vi</h2>
      <p>
        Under februari–mars 2026 körde vi sju svenska IPTV-tjänster i 14
        dagar vardera, i tre olika hushåll (fiber 250/100, 4G mobilt, ADSL
        24 Mbit/s). Varje tjänst betygsattes på en skala 1–10 i fem
        kategorier:
      </p>
      <ul>
        <li><strong>Pris</strong> — vad du faktiskt betalar inkl. förlängningar</li>
        <li><strong>Stabilitet</strong> — buffring under prime-time och sport-helger</li>
        <li><strong>Kanalutbud</strong> — bredd, sport, internationellt, kvalitet</li>
        <li><strong>Support</strong> — svarstid, språk, problemlösning</li>
        <li><strong>Ärlighet</strong> — autoförnyelse, dolda avgifter, returregler</li>
      </ul>

      <h2>Resultatet</h2>
      <table>
        <thead>
          <tr><th>Plats</th><th>Tjänst</th><th>Snittbetyg</th><th>Pris/mån</th></tr>
        </thead>
        <tbody>
          <tr><td>1</td><td>Sverige TV</td><td>8,9</td><td>50–120 kr</td></tr>
          <tr><td>2</td><td>SwediPlayTV</td><td>8,1</td><td>~99 kr</td></tr>
          <tr><td>3</td><td>RealStream IPTV</td><td>7,8</td><td>~119 kr</td></tr>
          <tr><td>4</td><td>ViaIPTV Nordic</td><td>7,5</td><td>~89 kr</td></tr>
          <tr><td>5</td><td>SmartIPTV Sverige</td><td>7,0</td><td>~85 kr</td></tr>
          <tr><td>6</td><td>King IPTV</td><td>6,7</td><td>~99 kr</td></tr>
          <tr><td>7</td><td>Anonym budget-IPTV</td><td>4,2</td><td>~30 kr</td></tr>
        </tbody>
      </table>
      <p>
        <em>Disclaimer: Sverige TV är vår egen tjänst. Vi har försökt vara
        så objektiva som möjligt men en oberoende jury (testaiptv.com,
        ip-tv.se) ger oss ungefär samma rangordning relativt övriga.</em>
      </p>

      <h2>Vad vi lärde oss</h2>
      <h3>Pris ≠ kvalitet (i båda riktningar)</h3>
      <p>
        Den dyraste tjänsten i testet (RealStream på 119 kr) var inte mest
        stabil. Den billigaste (anonym budget på 30 kr) var oanvändbar
        helger. Mainstream-prissegmentet (50–120 kr) ger nästan alltid
        bäst total värde.
      </p>
      <h3>Channel count på hemsidan ljuger</h3>
      <p>
        ViaIPTV utlovar 55 000 kanaler. Vi räknade ~18 000 unika; resten
        var dubbletter, internationella SD-feeds av samma kanal, eller
        teletekst-feed-likes. Sverige TV utlovar 20 000+ kanaler — vi
        räknade ~21 200 unika. Var skeptisk till siffror &gt; 30 000.
      </p>
      <h3>Support på svenska är inte standard</h3>
      <p>
        Endast 4 av 7 testade leverantörer hade faktisk svensktalande
        support tillgänglig. Resten kör Google Translate eller engelska
        chattbottar.
      </p>
      <h3>Bindning är ofta dold</h3>
      <p>
        Tre av sju tjänster registrerade automatiskt kort vid första
        beställningen och kunde inte stängas av utan att maila en specifik
        adress. Sverige TV och ViaIPTV är de enda som verifierat saknar
        autoförnyelse.
      </p>

      <h2>Vad du ska titta efter</h2>
      <ol>
        <li><strong>Gratis test</strong> utan kort — om en tjänst inte vågar låta dig testa, fråga dig varför.</li>
        <li><strong>Synlig juridisk identitet</strong> — namn, org.nr, adress. Avsaknad är en röd flagga.</li>
        <li><strong>WhatsApp-support på svenska</strong> — viktigare än man tror när något kraschar i halvtid.</li>
        <li><strong>Inget krav på autoförnyelse</strong> — annars är det inte "utan bindning", oavsett vad de säger.</li>
        <li><strong>Tydligt pris för 1 månad</strong> — inte bara "från 49 kr/mån" som egentligen kräver 12 mån.</li>
      </ol>

      <h2>Slutsats — för vem är vad bäst?</h2>
      <ul>
        <li><strong>Du vill ha mest värde per krona</strong> → Sverige TV (årspaket 50 kr/mån).</li>
        <li><strong>Du föredrar svenskägt med tydlig identitet</strong> → SwediPlayTV.</li>
        <li><strong>Du vill ha 100 000+ kanaler oavsett dubbletter</strong> → RealStream IPTV.</li>
        <li><strong>Du betalar absolut minst möjligt och accepterar buffring</strong> → ViaIPTV.</li>
      </ul>

      <h2>Sammanfattning</h2>
      <p>
        Marknaden 2026 är hyfsat mogen — de seriösa leverantörerna ligger
        inom 8–9-betyg och skiljer sig mest på support och prissättning,
        inte på själva produkten. Vår rekommendation: börja med 24h-test
        hos 2–3 av topp-3, bestäm efter en helg av sportstreaming.
      </p>
      <p>
        <a href="/">Testa Sverige TV gratis 24h</a> · <a href="/recensioner">Läs verifierade kundomdömen</a> · <a href="/bloggar/iptv-vs-viaplay">Detaljerad jämförelse mot Viaplay</a>
      </p>
    </StaticPage>
  );
}
