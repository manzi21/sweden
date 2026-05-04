import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../_landing/StaticPage";

const SLUG = "angerratt-och-aterbetalning";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Ångerrätt & återbetalning — Sverige TV (24h nöjd-kund-garanti)";
const DESC =
  "Sverige TV:s 24-timmars nöjd-kund-garanti och svensk ångerrätt enligt distansavtalslagen. Inga frågor, ingen byråkrati — om något inte fungerar betalar vi tillbaka.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `/${SLUG}` },
  robots: { index: true, follow: true },
};

export default function Page() {
  const merchantReturnSchema = {
    "@context": "https://schema.org",
    "@type": "MerchantReturnPolicy",
    "@id": `${SITE_URL}/${SLUG}#policy`,
    name: "Sverige TV — Ångerrätt & återbetalning",
    applicableCountry: "SE",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 1,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    inStoreReturnsOffered: false,
  };

  return (
    <StaticPage
      slug={SLUG}
      pageTitle="Ångerrätt & återbetalning"
      eyebrow="JURIDIK · NÖJD-KUND-GARANTI"
      h1="Ångerrätt och återbetalning"
      lastUpdated="4 maj 2026"
      jsonLd={[buildBreadcrumbJsonLd(SLUG, "Ångerrätt och återbetalning"), merchantReturnSchema]}
      showCta={false}
      intro={
        <>
          Sverige TV erbjuder två separata skydd: <strong>24-timmars
          nöjd-kund-garanti</strong> som fångar tekniska problem direkt, och
          <strong> 14 dagars ångerrätt</strong> enligt svensk distansavtalslag
          (om tjänsten inte påbörjats). Båda gäller utan frågor.
        </>
      }
    >
      <h2>1. 24-timmars nöjd-kund-garanti</h2>
      <p>
        Om du beställt Sverige TV och tjänsten inte fungerar som utlovat
        — bildkvalitet, kanalutbud, kompatibilitet med din enhet — kontaktar
        du oss på WhatsApp inom <strong>24 timmar</strong> efter aktivering.
      </p>
      <p>Vi gör då ett av tre:</p>
      <ol>
        <li><strong>Felsöker direkt</strong> via WhatsApp (löser ~80 % av fallen inom 30 minuter).</li>
        <li><strong>Byter dig till en annan server</strong> om problemet är routning eller geografisk latens.</li>
        <li><strong>Återbetalar 100 %</strong> av köpet om vi inte kan lösa problemet.</li>
      </ol>
      <p>
        Återbetalningen sker via samma betalmetod du använde (Swish, Klarna,
        bank, etc.), normalt inom 24–72 timmar.
      </p>

      <h2>2. Lagstadgad ångerrätt — 14 dagar</h2>
      <p>
        Enligt <strong>distansavtalslagen (2005:59)</strong> har du som
        konsument 14 dagars ångerrätt vid köp av digitalt innehåll i
        Sverige.
      </p>
      <p>
        Det finns dock ett viktigt undantag: ångerrätten upphör när tjänsten
        påbörjats <strong>med ditt uttryckliga samtycke</strong>. Eftersom
        Sverige TV aktiveras direkt efter beställning via WhatsApp (och du
        ger ditt samtycke genom att skicka beställningen), är leveransen
        påbörjad och ångerrätten enligt distansavtalslagen är förbrukad
        så fort tjänsten är aktiverad.
      </p>
      <p>
        <strong>Vi tillämpar ändå vår 24-timmars nöjd-kund-garanti
        utöver lagen</strong> — så även när den lagstadgade ångerrätten
        inte längre gäller får du tillbaka pengarna om något inte fungerar.
      </p>

      <h2>3. När pengarna inte återbetalas</h2>
      <p>
        Vi återbetalar inte i följande fall:
      </p>
      <ul>
        <li>Om mer än 24 timmar har gått sedan aktivering och tjänsten har fungerat normalt.</li>
        <li>Om problemet beror på din internetleverantör eller ditt nätverk (vi hjälper ändå att felsöka).</li>
        <li>Om du brutit mot <a href="/anvandarvillkor">användarvillkoren</a> (delat M3U med tredje part, etc.).</li>
        <li>Om du beställt med tydlig avsikt att utnyttja garantin upprepade gånger.</li>
      </ul>

      <h2>4. Hur du begär återbetalning</h2>
      <ol>
        <li>Skicka ett WhatsApp-meddelande till <strong>+44 7307 410 512</strong>.</li>
        <li>Ange ditt beställningsnummer eller telefon-/e-postadress du beställde med.</li>
        <li>Beskriv kort vad som inte fungerade.</li>
        <li>Vi bekräftar inom 1 timme och påbörjar återbetalningen samma dag.</li>
      </ol>
      <p>
        Du behöver inte fylla i något formulär, ringa något kundtjänstnummer,
        eller skicka ett rekommenderat brev. WhatsApp räcker.
      </p>

      <h2>5. Klagomål</h2>
      <p>
        Är du missnöjd med hur vi hanterat ditt ärende kan du vända dig till
        Allmänna Reklamationsnämnden (ARN) på{" "}
        <a href="https://www.arn.se" rel="noreferrer">www.arn.se</a> eller
        Konsumentverket på{" "}
        <a href="https://www.konsumentverket.se" rel="noreferrer">
          www.konsumentverket.se
        </a>.
      </p>

      <h2>6. Tvister inom EU</h2>
      <p>
        Är du bosatt i ett annat EU-land kan du även använda EU-kommissionens
        plattform för tvistlösning online (ODR):{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>7. Kontakt</h2>
      <p>
        Frågor om ångerrätt eller återbetalning? Skicka WhatsApp till{" "}
        <strong>+44 7307 410 512</strong>. Se även våra{" "}
        <a href="/anvandarvillkor">användarvillkor</a> och vår{" "}
        <a href="/integritetspolicy">integritetspolicy</a>.
      </p>
    </StaticPage>
  );
}
