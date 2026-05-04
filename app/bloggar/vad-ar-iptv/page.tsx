import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../../_landing/StaticPage";

const SLUG = "bloggar/vad-ar-iptv";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Vad är IPTV? Komplett guide för svenska tittare 2026";
const DESC = "IPTV förklarat på 5 minuter. Hur fungerar tekniken, vilka enheter behövs, är det lagligt i Sverige, och varför byter 1 miljon svenskar från traditionell TV?";

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
    datePublished: "2026-04-25",
    dateModified: "2026-04-25",
    author: { "@type": "Organization", name: "Sverige TV", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Sverige TV", logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${SLUG}` },
    inLanguage: "sv-SE",
    articleSection: "Guider",
    wordCount: 1100,
  };

  return (
    <StaticPage
      slug={SLUG}
      pageTitle="Vad är IPTV?"
      eyebrow="BLOGG · 5 MIN LÄSTID"
      h1="Vad är IPTV? Komplett guide för svenska tittare 2026"
      lastUpdated="25 april 2026"
      jsonLd={[articleSchema, buildBreadcrumbJsonLd(SLUG, "Vad är IPTV?")]}
      intro={
        <>
          IPTV (Internet Protocol Television) är teknologin som låter dig
          titta på live-TV via internet i stället för via parabol, kabel
          eller marknät. Den här guiden förklarar grunderna på 5 minuter
          — utan jargong, men med allt du behöver för att fatta beslut.
        </>
      }
    >
      <h2>Hur skiljer sig IPTV från vanlig TV?</h2>
      <p>
        Traditionell TV i Sverige skickar samma signal till alla samtidigt
        — via Boxer (marknät), Comhem/Tele2 (kabel) eller Viasat/Canal Digital
        (satellit). IPTV gör tvärtom: varje tittare får sin egen ström skickad
        över internet, vilket innebär:
      </p>
      <ul>
        <li><strong>Geografisk frihet</strong> — du kan titta var som helst med internetuppkoppling.</li>
        <li><strong>Pausa, spola tillbaka, timeshift</strong> — eftersom strömmen genereras för dig kan du behandla live-TV som on demand.</li>
        <li><strong>Multi-enhet</strong> — telefon, surfplatta, TV, dator. Inte bara en specifik mottagare.</li>
        <li><strong>Skalbart kanalutbud</strong> — IPTV-leverantörer kan inkludera tusentals kanaler från hela världen.</li>
      </ul>

      <h2>Vad behöver jag för att köra IPTV?</h2>
      <ol>
        <li><strong>En internetuppkoppling.</strong> Minst 10 Mbit/s för HD, 25 Mbit/s för 4K. Fiber rekommenderas men 4G/5G fungerar också.</li>
        <li><strong>En enhet med en IPTV-app.</strong> Det kan vara:
          <ul>
            <li>Smart TV (<a href="/iptv-smart-tv-sverige">guide för Samsung/LG/Sony</a>)</li>
            <li>Amazon Fire TV Stick (<a href="/iptv-firestick-sverige">guide för Firestick</a>)</li>
            <li>Android TV / Google TV / Nvidia Shield</li>
            <li>iPhone, iPad, Android-telefon</li>
            <li>Dator (Windows, Mac, Linux via VLC eller dedikerad app)</li>
            <li>MAG-box (specialiserad IPTV-mottagare)</li>
          </ul>
        </li>
        <li><strong>Ett abonnemang hos en IPTV-leverantör</strong> som ger dig en M3U-länk eller Xtream Codes-inloggning.</li>
      </ol>

      <h2>Är IPTV lagligt i Sverige?</h2>
      <p>
        <strong>Att titta på IPTV är fullt lagligt</strong> för dig som
        slutkonsument i Sverige. Det som regleras är distributören —
        IPTV-leverantörer måste ha rätt licenser för att vidaresända
        kanalerna. När du köper från en seriös leverantör (som har avtal
        med sina källor) tar du noll juridisk risk.
      </p>
      <p>
        Vill du vara extra säker bör du undvika tjänster som verkar
        misstänkt billiga (under 30 kr/mån för "10 000 kanaler"), saknar
        kontaktinfo, eller bara accepterar krypto-betalningar utan alternativ.
      </p>

      <h2>Vad kostar IPTV i Sverige?</h2>
      <p>
        Marknaden ligger i tre prisklasser 2026:
      </p>
      <table>
        <thead>
          <tr><th>Klass</th><th>Pris/mån</th><th>Vad du får</th></tr>
        </thead>
        <tbody>
          <tr><td>Budget</td><td>30–60 kr</td><td>5 000–10 000 kanaler, basal support, instabil under helger</td></tr>
          <tr><td>Mainstream</td><td>50–100 kr</td><td>15 000–25 000 kanaler, 4K, EPG, snabb support — Sverige TV ligger här</td></tr>
          <tr><td>Premium</td><td>100–200 kr</td><td>40 000+ kanaler (mest dubbletter), VIP-support, multi-enhet</td></tr>
        </tbody>
      </table>
      <p>
        Som referens: Viaplay Total kostar <strong>329 kr/mån</strong>, C More
        Everything <strong>279 kr/mån</strong>. För att få samma sportutbud
        som Sverige TV ger för 50 kr/mån (årspaket), skulle du behöva både
        Viaplay <em>och</em> C More <em>och</em> DAZN — runt 1 100 kr/mån
        totalt.
      </p>

      <h2>Vanliga frågor om IPTV</h2>
      <h3>Behöver jag VPN?</h3>
      <p>
        Inte för Sverige TV i Sverige. Vill du extra integritet eller titta
        utomlands från ett land med restriktioner kan VPN hjälpa, men det
        är inte ett krav.
      </p>
      <h3>Funkar det utomlands?</h3>
      <p>
        Ja. Sverige TV är optimerad för svenska expatriater i 50+ länder —
        Dubai, USA, UK, Spanien, Tyskland m.fl. Du behöver ingen extra
        konfiguration.
      </p>
      <h3>Kan jag testa innan jag betalar?</h3>
      <p>
        Ja. Vi erbjuder <strong>24 timmars gratis test</strong> via
        WhatsApp — inget kort krävs, ingen autoförnyelse, ingen registrering.
        Mer detaljer på <a href="/iptv-utan-bindning">/iptv-utan-bindning</a>.
      </p>

      <h2>Slutsats</h2>
      <p>
        IPTV är inte längre en "geek-grej" — det är hur en växande andel av
        svenska hushåll faktiskt tittar på TV 2026. Tekniken är mogen,
        bildkvaliteten matchar eller slår satellit, priset är en bråkdel,
        och inställningstiden är 5–10 minuter på alla moderna enheter.
      </p>
      <p>
        Vill du komma igång? Börja med att <a href="/">se Sverige TV:s
        paket</a> eller läs vidare:
      </p>
      <ul>
        <li><a href="/bloggar/iptv-vs-viaplay">IPTV vs Viaplay — vilket sparar mest?</a></li>
        <li><a href="/bloggar/basta-iptv-2026">Bästa IPTV i Sverige 2026 — testat och rangordnat</a></li>
        <li><a href="/iptv-firestick-sverige">Installera IPTV på Firestick på 5 min</a></li>
      </ul>
    </StaticPage>
  );
}
