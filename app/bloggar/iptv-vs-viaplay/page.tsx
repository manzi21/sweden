import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../../_landing/StaticPage";

const SLUG = "bloggar/iptv-vs-viaplay";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "IPTV vs Viaplay 2026 — vilket sparar dig mest pengar?";
const DESC = "Viaplay Total kostar 329 kr/mån. Sverige TV kostar 50 kr/mån. Här jämförs kanalutbud, sport, kvalitet, support och bindning — utan PR-prat.";

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
    datePublished: "2026-04-15",
    dateModified: "2026-04-15",
    author: { "@type": "Organization", name: "Sverige TV", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Sverige TV", logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${SLUG}` },
    inLanguage: "sv-SE",
    articleSection: "Jämförelser",
    wordCount: 1200,
  };

  return (
    <StaticPage
      slug={SLUG}
      pageTitle="IPTV vs Viaplay"
      eyebrow="BLOGG · 6 MIN LÄSTID"
      h1="IPTV vs Viaplay 2026 — vilket sparar mest?"
      lastUpdated="15 april 2026"
      jsonLd={[articleSchema, buildBreadcrumbJsonLd(SLUG, "IPTV vs Viaplay")]}
      intro={
        <>
          Viaplay är den största streamingaktören i Norden, men priserna har
          drabbat svenska hushåll hårt sedan 2024. Vi jämför Viaplay Total
          (329 kr/mån) med Sverige TV (50 kr/mån i årspaket) på pris,
          kanalutbud, sport, kvalitet, support, och bindning.
        </>
      }
    >
      <h2>Snabbjämförelse</h2>
      <table>
        <thead>
          <tr><th></th><th>Viaplay Total</th><th>Sverige TV</th></tr>
        </thead>
        <tbody>
          <tr><td>Pris/mån</td><td>329 kr</td><td>50–120 kr</td></tr>
          <tr><td>Bindningstid</td><td>12 mån (för bästa pris)</td><td>0 mån</td></tr>
          <tr><td>Live-kanaler</td><td>~150</td><td>20 000+</td></tr>
          <tr><td>Allsvenskan</td><td>✅</td><td>✅</td></tr>
          <tr><td>SHL</td><td>❌ (kräver C More)</td><td>✅</td></tr>
          <tr><td>Premier League</td><td>✅</td><td>✅</td></tr>
          <tr><td>F1</td><td>✅</td><td>✅</td></tr>
          <tr><td>NHL alla matcher</td><td>❌</td><td>✅</td></tr>
          <tr><td>SVT, TV4 live</td><td>❌</td><td>✅</td></tr>
          <tr><td>Internationella kanaler</td><td>~10</td><td>20 000+</td></tr>
          <tr><td>4K/UHD</td><td>Vissa</td><td>Alla relevanta</td></tr>
          <tr><td>Support</td><td>Chat (svarstid: timmar)</td><td>WhatsApp (~8 min)</td></tr>
          <tr><td>Gratis test</td><td>❌</td><td>✅ 24h</td></tr>
        </tbody>
      </table>

      <h2>Pris — den enkla matten</h2>
      <p>
        Viaplay Total kostar 329 kr/mån × 12 = <strong>3 948 kr/år</strong>.
        Det inkluderar inte SHL, vilket kräver C More Sport (449 kr/mån × 12 = 5 388 kr/år).
        Tillsammans landar du på <strong>9 336 kr/år</strong> för en hyfsad sport-täckning.
      </p>
      <p>
        Sverige TV:s 12-månaderspaket kostar 600 kr totalt — under hälften
        av en månad med Viaplay + C More. Och du får dessutom 100 000+ filmer
        och serier on demand utan extra kostnad.
      </p>
      <p>
        Sparpotential: <strong>cirka 8 700 kr/år</strong> om du idag har
        Viaplay + C More. Det är en utlandssemester. Eller fyra månader hyra.
      </p>

      <h2>Kanalutbud — där Viaplay tappar mark</h2>
      <p>
        Viaplay är optimerad för deras egen produktion: nordiska serier,
        deras egen sportlicens, deras filmkatalog. Det är ett bra paket
        för den som vill ha "kuraterat innehåll".
      </p>
      <p>
        Sverige TV är motsatsen: <strong>maximal bredd</strong>. Du får
        SVT, TV4, Kanal 5, alla nordiska kanaler, Sky Sports, beIN Sports,
        ESPN, Eurosport, internationella nyheter, barnkanaler från 8 språk,
        arabiska, turkiska, indiska, persiska kanaler. För familjer med
        flerspråkig bakgrund finns det inget jämförbart från Viaplay.
      </p>

      <h2>Sport — den största enskilda skillnaden</h2>
      <p>
        Detta är där flest svenska hushåll spenderar för mycket pengar.
        Viaplay har Allsvenskan, Premier League och F1, men inte SHL eller
        all NHL. Sverige TV har <strong>allt</strong> — Allsvenskan, SHL,
        Premier League, Champions League, F1, MotoGP, NHL, NBA, NFL,
        boxning, MMA, tennis (alla 4 Grand Slam).
      </p>
      <p>
        Detaljerad genomgång på <a href="/iptv-sport-sverige">/iptv-sport-sverige</a>.
      </p>

      <h2>Kvalitet och stabilitet</h2>
      <p>
        Viaplay har egen CDN och stabil leverans i Sverige. Sverige TV
        använder distribuerade edge-servrar och är generellt likvärdig på
        bra fiber. På instabila uppkopplingar (4G, äldre ADSL) presterar
        Viaplay marginellt bättre tack vare deras adaptiva bitrate. På fiber
        spelar det ingen roll i praktiken.
      </p>

      <h2>Support — där skillnaden är tydligast</h2>
      <p>
        Viaplay erbjuder chat, men supporttiderna är begränsade och svaren
        kommer ofta efter timmar. Sverige TV använder WhatsApp med svensk
        support på 8 minuters genomsnittssvarstid, dygnet runt, alla dagar
        i veckan. För många kunder är det den största förändringen vid byte.
      </p>

      <h2>Bindning — den dolda kostnaden</h2>
      <p>
        Viaplay Total är 329 kr/mån utan bindning, eller billigare med 12
        månaders bindning. Det betyder att om du bara vill se Premier
        League under säsongen (aug–maj) betalar du för 11 månader du
        knappt använder.
      </p>
      <p>
        Sverige TV är <strong>aldrig</strong> bundet. Du betalar för 1, 3,
        6 eller 12 månader, och perioden löper ut automatiskt. Vill du
        pausa under sommaren? Bara att inte förlänga.
      </p>

      <h2>När Viaplay vinner</h2>
      <p>
        Var ärliga: Viaplay vinner i två specifika scenarier:
      </p>
      <ul>
        <li>Du vill ha Viaplays egna originalproduktioner (Threesome, Fartblinda, etc.).</li>
        <li>Du vill ha en helt mainstream produkt utan att tänka på M3U-länkar och appar.</li>
      </ul>
      <p>
        För allt annat — sport, kanalutbud, internationellt innehåll, pris —
        är Sverige TV en uppenbart bättre affär.
      </p>

      <h2>Slutsats</h2>
      <p>
        Om du har Viaplay + C More + DAZN och betalar runt 1 000 kr/mån för
        sport, är bytet till Sverige TV en av de enklaste besparingarna du
        kan göra 2026. Testa <strong>gratis 24h</strong> först innan du
        avslutar Viaplay — om något inte fungerar för dig kostar testet
        ingenting.
      </p>
      <p>
        <a href="/">Se Sverige TV:s paket</a> · <a href="/iptv-utan-bindning">Mer om "utan bindning"</a> · <a href="/recensioner">Läs kundrecensioner</a>
      </p>
    </StaticPage>
  );
}
