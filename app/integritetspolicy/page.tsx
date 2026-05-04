import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../_landing/StaticPage";

const SLUG = "integritetspolicy";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Integritetspolicy — Sverige TV (GDPR-kompatibel)";
const DESC =
  "Hur Sverige TV samlar in, använder och skyddar dina personuppgifter — i enlighet med GDPR och svensk dataskyddslagstiftning.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `/${SLUG}` },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <StaticPage
      slug={SLUG}
      pageTitle="Integritetspolicy"
      eyebrow="JURIDIK · GDPR"
      h1="Integritetspolicy"
      lastUpdated="4 maj 2026"
      jsonLd={[buildBreadcrumbJsonLd(SLUG, "Integritetspolicy")]}
      showCta={false}
      intro={
        <>
          Den här policyn beskriver hur Sverige TV samlar in, använder, lagrar
          och skyddar dina personuppgifter när du använder våra tjänster.
          Policyn följer EU:s allmänna dataskyddsförordning (GDPR / 2016/679)
          och svensk dataskyddslag (2018:218).
        </>
      }
    >
      <h2>1. Personuppgiftsansvarig</h2>
      <p>
        Sverige TV är personuppgiftsansvarig för behandlingen av dina
        personuppgifter inom ramen för tjänsten. Kontaktuppgifter:
      </p>
      <ul>
        <li><strong>Sverige TV</strong></li>
        <li>Org.nr: <em>[fylls i]</em></li>
        <li>Postadress: <em>[fylls i]</em></li>
        <li>WhatsApp: +44 7307 410 512</li>
        <li>E-post för dataskydd: <em>[fylls i, t.ex. dataskydd@premiumiptv.se]</em></li>
      </ul>

      <h2>2. Vilka personuppgifter vi samlar in</h2>
      <p>
        Vi samlar bara in det vi faktiskt behöver för att leverera tjänsten.
        I de flesta fall sker registrering via WhatsApp och vi behöver inget
        formellt konto.
      </p>
      <h3>2.1 Uppgifter du själv lämnar</h3>
      <ul>
        <li>WhatsApp-nummer (för support och leverans av M3U-länk).</li>
        <li>Namn (om du anger det).</li>
        <li>E-postadress (om du anger den, t.ex. för kvitto).</li>
        <li>Betalningsuppgifter (Swish-nr, Klarna-referens, etc. — vi sparar inte fullständiga kortnummer).</li>
        <li>Vald enhet (Firestick, Smart TV-modell etc.) för att kunna anpassa installationen.</li>
      </ul>
      <h3>2.2 Uppgifter som samlas in automatiskt</h3>
      <ul>
        <li>IP-adress (för att leverera streamen från närmaste edge-server).</li>
        <li>Enhetstyp och webbläsare (för att optimera bildkvalitet).</li>
        <li>Anonymiserad användningsstatistik (vilka funktioner som används, för att förbättra tjänsten).</li>
      </ul>
      <h3>2.3 Cookies och liknande tekniker</h3>
      <p>
        Sverige TV använder enbart funktionella cookies och local-storage som
        krävs för att tjänsten ska fungera (språkval, sessionshantering). Vi
        använder <strong>inte</strong> spårningscookies från tredje part och
        <strong>inte</strong> reklamspårning.
      </p>

      <h2>3. Rättslig grund för behandlingen</h2>
      <ul>
        <li><strong>Avtalsuppfyllelse (GDPR art. 6.1.b)</strong> — för att kunna leverera tjänsten du beställt.</li>
        <li><strong>Berättigat intresse (art. 6.1.f)</strong> — för säkerhets- och bedrägeriförebyggande loggar.</li>
        <li><strong>Rättslig förpliktelse (art. 6.1.c)</strong> — för bokföring och eventuella myndighetsförfrågningar.</li>
        <li><strong>Samtycke (art. 6.1.a)</strong> — för marknadsföringsutskick (om du uttryckligen godkänt det). Du kan när som helst återkalla samtycket.</li>
      </ul>

      <h2>4. Hur länge vi sparar uppgifterna</h2>
      <table>
        <thead><tr><th>Uppgift</th><th>Lagringstid</th></tr></thead>
        <tbody>
          <tr><td>WhatsApp-konversation</td><td>Så länge tjänsten är aktiv + 12 mån</td></tr>
          <tr><td>Beställningshistorik</td><td>7 år (svensk bokföringslag)</td></tr>
          <tr><td>IP-loggar</td><td>30 dagar</td></tr>
          <tr><td>Anonymiserad statistik</td><td>Obegränsat (kan inte kopplas till dig)</td></tr>
          <tr><td>Marknadsföringssamtycke</td><td>Tills du återkallar det</td></tr>
        </tbody>
      </table>

      <h2>5. Vem vi delar uppgifter med</h2>
      <p>Vi säljer aldrig dina uppgifter. Vi delar dem endast med:</p>
      <ul>
        <li><strong>Betalningsleverantörer</strong> (Swish, Klarna, PayPal, MobilePay) — för att hantera transaktionen.</li>
        <li><strong>Hostingleverantörer</strong> (Vercel, EU-baserade CDN-noder) — för att leverera tjänsten.</li>
        <li><strong>Myndigheter</strong> — endast om vi är skyldiga enligt svensk lag.</li>
      </ul>
      <p>
        Alla underleverantörer omfattas av personuppgiftsbiträdesavtal (DPA)
        i enlighet med GDPR art. 28.
      </p>

      <h2>6. Överföring utanför EU/EES</h2>
      <p>
        Sverige TV använder primärt EU-baserade servrar. Vissa edge-noder
        (för att leverera streamen utomlands) kan ligga i USA, UAE eller
        andra länder. När så sker använder vi Standard Contractual Clauses
        (SCC) eller motsvarande lagliga överföringsmekanismer enligt
        GDPR kapitel V.
      </p>

      <h2>7. Dina rättigheter enligt GDPR</h2>
      <ul>
        <li><strong>Rätt till tillgång (art. 15)</strong> — få veta vilka uppgifter vi har om dig.</li>
        <li><strong>Rätt till rättelse (art. 16)</strong> — få felaktiga uppgifter rättade.</li>
        <li><strong>Rätt till radering / "rätten att bli glömd" (art. 17)</strong> — få dina uppgifter raderade när det inte längre finns rättslig grund.</li>
        <li><strong>Rätt till begränsning (art. 18)</strong> — få behandlingen begränsad i specifika fall.</li>
        <li><strong>Rätt till dataportabilitet (art. 20)</strong> — få ut dina uppgifter i ett maskinläsbart format.</li>
        <li><strong>Rätt att invända (art. 21)</strong> — invända mot behandling som baseras på berättigat intresse.</li>
        <li><strong>Rätt att klaga till tillsynsmyndigheten</strong> — Integritetsskyddsmyndigheten (IMY), www.imy.se.</li>
      </ul>
      <p>
        För att utöva någon av dessa rättigheter, kontakta oss via WhatsApp
        eller e-post (se sektion 1). Vi svarar inom 30 dagar enligt GDPR
        art. 12.3.
      </p>

      <h2>8. Säkerhet</h2>
      <p>
        Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att
        skydda dina uppgifter mot otillbörlig åtkomst, förlust, ändring eller
        radering. Det inkluderar TLS-kryptering på all webbtrafik (HSTS,
        max-age 2 år), tvåfaktorsautentisering på adminkonton, och löpande
        säkerhetsuppdateringar.
      </p>

      <h2>9. Ändringar i policyn</h2>
      <p>
        Vi kan uppdatera den här policyn vid behov (t.ex. vid lagändringar
        eller när vi lägger till nya funktioner). Den senaste versionen
        publiceras alltid på den här sidan med ett uppdaterat datum.
        Väsentliga ändringar meddelas via WhatsApp om vi har ett aktivt
        kundförhållande med dig.
      </p>

      <h2>10. Kontakt</h2>
      <p>
        Frågor om dataskydd? Skicka ett WhatsApp-meddelande till{" "}
        <strong>+44 7307 410 512</strong> eller en e-post till{" "}
        <em>[dataskydd@premiumiptv.se]</em>. För klagomål vänd dig till
        Integritetsskyddsmyndigheten på <a href="https://www.imy.se" rel="noreferrer">www.imy.se</a>.
      </p>
    </StaticPage>
  );
}
