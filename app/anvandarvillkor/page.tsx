import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../_landing/StaticPage";

const SLUG = "anvandarvillkor";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Användarvillkor — Sverige TV";
const DESC =
  "Villkor för att använda Sverige TV — IPTV-tjänsten med 20 000+ kanaler. Tydliga, korta villkor utan dolda klausuler.";

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
      pageTitle="Användarvillkor"
      eyebrow="JURIDIK · CGU"
      h1="Användarvillkor"
      lastUpdated="4 maj 2026"
      jsonLd={[buildBreadcrumbJsonLd(SLUG, "Användarvillkor")]}
      showCta={false}
      intro={
        <>
          Genom att använda Sverige TV godkänner du dessa villkor. Vi har
          medvetet hållit dem korta, läsbara och utan juridiska bakdörrar.
          Är något oklart? Skicka oss ett WhatsApp-meddelande så förklarar vi.
        </>
      }
    >
      <h2>1. Vad Sverige TV är</h2>
      <p>
        Sverige TV är en streamingtjänst (IPTV) som ger dig tillgång till
        20 000+ live-kanaler, 100 000+ filmer och serier samt elektronisk
        kanalguide (EPG). Tjänsten levereras via internet och fungerar på
        Smart TV, Fire TV Stick, Android, iPhone, iPad, MAG-box och
        PC/Mac.
      </p>

      <h2>2. Beställning och betalning</h2>
      <p>
        Beställning sker via WhatsApp till <strong>+44 7307 410 512</strong>.
        Betalning sker i förskott via Swish, Klarna, MobilePay, Apple Pay,
        Google Pay, banköverföring, PayPal eller krypto. Tjänsten aktiveras
        normalt inom 10 minuter efter mottagen betalning.
      </p>
      <p>
        Pris för respektive period framgår på <a href="/">startsidan</a> och
        på <a href="/iptv-utan-bindning">/iptv-utan-bindning</a>. Priserna
        är inkl. moms.
      </p>

      <h2>3. Ingen bindning, ingen automatisk förnyelse</h2>
      <p>
        Sverige TV förlänger sig <strong>aldrig</strong> automatiskt. När den
        period du betalat löper ut upphör tjänsten — inget kort dras, inget
        nytt kvitto skickas. Vill du fortsätta beställer du en ny period via
        WhatsApp.
      </p>

      <h2>4. Användning av tjänsten</h2>
      <ul>
        <li>Tjänsten får användas på upp till <strong>3 enheter</strong> samtidigt om inte annat avtalats.</li>
        <li>Du får inte dela ditt M3U-länk eller dina inloggningsuppgifter med tredje part.</li>
        <li>Du får inte använda tjänsten för att vidaresälja innehåll eller bygga konkurrerande tjänster.</li>
        <li>Du får inte spela in, distribuera eller offentligt visa innehållet utöver privat bruk.</li>
      </ul>
      <p>
        Brott mot dessa regler kan leda till att tjänsten stängs av utan
        återbetalning.
      </p>

      <h2>5. Tjänstens tillgänglighet</h2>
      <p>
        Vi siktar på <strong>99,5 % tillgänglighet</strong> på årsbasis. Korta
        avbrott kan förekomma vid:
      </p>
      <ul>
        <li>Underhåll (oftast nattetid, max 30 min/månad).</li>
        <li>Problem hos våra leverantörer (vi felsöker direkt).</li>
        <li>Problem hos din internetleverantör eller ditt nätverk (utanför vår kontroll).</li>
      </ul>
      <p>
        Vid längre driftstörningar (&gt; 24 h) kompenserar vi med
        förlängd prenumeration motsvarande den dubbla tiden.
      </p>

      <h2>6. Support</h2>
      <p>
        Support sker via WhatsApp på svenska, engelska, franska och arabiska.
        Vi svarar i snitt inom 8 minuter dygnet runt. Tekniska problem löses
        normalt inom 1–2 timmar.
      </p>

      <h2>7. Ångerrätt och återbetalning</h2>
      <p>
        Du har rätt att ångra ditt köp i enlighet med svensk distansavtalslag
        och Sverige TV:s nöjd-kund-garanti. Se{" "}
        <a href="/angerratt-och-aterbetalning">
          /angerratt-och-aterbetalning
        </a>{" "}
        för fullständiga villkor.
      </p>

      <h2>8. Personuppgifter</h2>
      <p>
        Vi behandlar dina personuppgifter enligt GDPR. Se vår{" "}
        <a href="/integritetspolicy">integritetspolicy</a> för detaljer.
      </p>

      <h2>9. Ansvarsbegränsning</h2>
      <p>
        Sverige TV ansvarar inte för:
      </p>
      <ul>
        <li>Avbrott orsakade av din internetuppkoppling eller ditt nätverk.</li>
        <li>Inkompatibilitet med specifika appar eller enheter (vi listar de vi stödjer på <a href="/iptv-smart-tv-sverige">/iptv-smart-tv-sverige</a> och <a href="/iptv-firestick-sverige">/iptv-firestick-sverige</a>).</li>
        <li>Innehåll som tillfälligt försvinner från en tredjepartskanal av legala skäl utanför vår kontroll.</li>
        <li>Indirekta skador (t.ex. förlorad arbetstid).</li>
      </ul>
      <p>
        Vårt totala ansvar gentemot dig är begränsat till det belopp du
        betalat under de senaste 12 månaderna.
      </p>

      <h2>10. Ändringar i villkoren</h2>
      <p>
        Vi kan uppdatera dessa villkor från tid till annan. Den senaste
        versionen publiceras alltid på den här sidan. Väsentliga ändringar
        meddelas via WhatsApp om du har en aktiv prenumeration.
      </p>

      <h2>11. Tvistlösning</h2>
      <p>
        Tvister regleras av svensk lag. I första hand försöker vi alltid
        lösa allt direkt via WhatsApp. Om det inte räcker kan du vända dig
        till{" "}
        <a href="https://www.arn.se" rel="noreferrer">
          Allmänna Reklamationsnämnden (ARN)
        </a>{" "}
        eller till svensk domstol.
      </p>

      <h2>12. Kontakt</h2>
      <p>
        WhatsApp: <strong>+44 7307 410 512</strong> · E-post:{" "}
        <em>[fylls i]</em> · Org.nr: <em>[fylls i]</em>
      </p>
    </StaticPage>
  );
}
