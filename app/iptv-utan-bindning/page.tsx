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

const SLUG = "iptv-utan-bindning";
const SITE_URL = "https://premiumiptv.se";
const PAGE_TITLE = "IPTV utan bindning";
const TITLE = "IPTV utan bindning Sverige 2026 — Månadsvis från 83 kr | Gratis test 24h";
const DESC =
  "IPTV utan bindning i Sverige — månadsvis betalning från 83 kr. Inget kontrakt, ingen automatisk förnyelse, ingen kreditkortsregistrering. Gratis test 24h via WhatsApp. Aktivering på 10 min.";

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
    q: "Vad menas med 'IPTV utan bindning'?",
    a: "Att du inte sitter fast i ett 12-månaders abonnemang. Du betalar för en period (1, 3, 6 eller 12 månader), och när den går ut händer ingenting automatiskt — inget kort dras, inget förlängs. Vill du fortsätta hör du av dig och förlänger manuellt.",
  },
  {
    q: "Behöver jag registrera ett kreditkort?",
    a: "Nej. Sverige TV använder inte återkommande betalningar. Du betalar via Swish, banköverföring, Klarna, MobilePay, Apple Pay eller krypto — en gång, för vald period. Inga kortuppgifter sparas.",
  },
  {
    q: "Kan jag avbryta när jag vill?",
    a: "Du behöver inte avbryta — det finns ingenting att avbryta. När din betalda period tar slut upphör tjänsten automatiskt. Vill du sluta tidigare? Du behöver bara stänga av appen.",
  },
  {
    q: "Vilken är den minsta perioden jag kan köpa?",
    a: "1 månad — 120 kr (cirka 4 kr/dag). Du kan också välja 3 månader (250 kr), 6 månader (350 kr) eller 12 månader (600 kr / 50 kr/mån). Längre period = lägre pris/månad, men ingen är låst.",
  },
  {
    q: "Vad händer efter mitt 24h-gratistest?",
    a: "Ingenting. Testet är 100 % gratis utan kort, utan registrering. Efter 24 timmar slutar streamen fungera automatiskt — du behöver inte säga upp någonting. Vill du fortsätta beställer du ett paket via WhatsApp.",
  },
  {
    q: "Är prissättningen verkligen densamma utan bindning?",
    a: "Ja. Vi rabatterar bara baserat på period (3, 6, 12 mån) — inte på bindning. Andra svenska tjänster (Viaplay, C More) ger prisrabatt mot 12 månaders bindning. Sverige TV gör inte det.",
  },
  {
    q: "Hur ångrar jag mig om tjänsten inte funkar?",
    a: "Vi har 24 timmars nöjd-kund-garanti. Om något inte fungerar inom första dygnet återbetalar vi utan diskussion. Kontakta oss på WhatsApp så hanterar vi återbetalningen direkt — ingen ångerblankett, ingen retur.",
  },
  {
    q: "Räknas Sverige TV som ett 'abonnemang' enligt distansavtalslagen?",
    a: "Sverige TV är en digital tjänst, inte ett återkommande abonnemang i juridisk mening. Du har 14 dagars ångerrätt vid köp av digitalt innehåll i Sverige (om tjänsten inte påbörjats). Sverige TV förlänger sig inte automatiskt — det enda som tickar är den period du betalat för.",
  },
];

const SECTIONS: Section[] = [
  {
    h2: "Varför svenska tittare väljer IPTV utan bindning",
    body: (
      <>
        <p>
          Den största frustrationen med traditionella streamingtjänster i
          Sverige är inte priset i sig — det är låsningen. Viaplay Total kostar
          329 kr/månad bara om du binder dig 12 månader. C More gör samma sak.
          Du upptäcker att du betalar 11 månader för Premier League du inte ens
          tittar på efter den första matchdagen.
        </p>
        <p>
          IPTV utan bindning vänder på modellen: du betalar bara för det du
          använder, du kan testa gratis först, och du kan stänga av tjänsten
          utan att jaga en kundtjänstchatt eller skriva uppsägningsbrev.
        </p>
        <h3>Vad "utan bindning" betyder konkret hos Sverige TV</h3>
        <ul>
          <li><strong>Inget kontrakt</strong> — du undertecknar ingenting.</li>
          <li><strong>Ingen automatisk förnyelse</strong> — inget dras från ditt konto.</li>
          <li><strong>Inga uppsägningsregler</strong> — det finns inget att säga upp.</li>
          <li><strong>Inget kreditkort sparas</strong> — engångsbetalning via Swish/Klarna/banköverföring.</li>
          <li><strong>Inga dolda avgifter</strong> — priset du ser är priset du betalar.</li>
        </ul>
      </>
    ),
  },
  {
    h2: "Prismodell — vad du betalar och när",
    body: (
      <>
        <p>
          Vi har medvetet valt en enkel prismodell utan tilläggsavgifter eller
          steg-för-steg-uppgraderingar:
        </p>
        <ul>
          <li><strong>1 månad</strong> — 120 kr totalt. Bra för att testa längre eller för en specifik händelse (VM, EM, ett mästerskap).</li>
          <li><strong>3 månader</strong> — 250 kr totalt (~83 kr/mån). Mest populärt valet.</li>
          <li><strong>6 månader</strong> — 350 kr totalt (~58 kr/mån).</li>
          <li><strong>12 månader</strong> — 600 kr totalt (50 kr/mån). Bästa pris/månad.</li>
        </ul>
        <p>
          Alla paket innehåller exakt samma 20 000+ kanaler, samma 100 000+
          filmer & serier, samma 4K-kvalitet, samma WhatsApp-support. Skillnaden
          är bara hur länge tjänsten är aktiv.
        </p>
        <p>
          Det finns ingen "Premium-uppgradering" eller "Sport-tillägg" som
          plötsligt drar upp priset. Allt är inkluderat från första dagen.
        </p>
      </>
    ),
  },
  {
    h2: "Hur 24-timmars gratis test fungerar",
    body: (
      <>
        <p>
          Vi vet att "gratis test" kan kännas misstänkt — många tjänster
          använder det som krok för automatiska kortdebiteringar. Vårt test är
          annorlunda:
        </p>
        <ol>
          <li>Du skickar ett WhatsApp-meddelande: <em>"Hej, jag vill testa Sverige TV gratis 24h"</em>.</li>
          <li>Vi svarar inom minuter med din temporära M3U-länk.</li>
          <li>Du installerar i din IPTV-app (på Smart TV, Firestick, telefon — välj själv).</li>
          <li>Du tittar i 24 timmar.</li>
          <li>Efter 24 timmar slutar streamen fungera automatiskt. Inget kort, ingen registrering, inget mejl.</li>
        </ol>
        <p>
          Om du gillar det köper du ett paket. Om du inte gör det, händer
          ingenting. Det är så det ska vara.
        </p>
      </>
    ),
  },
  {
    h2: "Jämförelse — Sverige TV vs. svenska bindningsabonnemang",
    body: (
      <>
        <p>
          Här är vad du faktiskt jämför med när du letar efter IPTV utan
          bindning i Sverige:
        </p>
        <ul>
          <li><strong>Viaplay Total</strong> — 329 kr/mån, 12 mån bindning för bästa pris. Ingen gratis test.</li>
          <li><strong>C More Everything</strong> — 279 kr/mån, autoförnyelse, kort krävs.</li>
          <li><strong>Netflix Standard</strong> — 179 kr/mån, månadsvis men ingen sport, ingen Allsvenskan, inga svenska sportkanaler.</li>
          <li><strong>SVT Play</strong> — gratis men endast offentlig service-innehåll, ingen sport från privata kanaler.</li>
          <li><strong>Sverige TV</strong> — från 50 kr/mån (årspaket) eller 120 kr/mån, 20 000+ kanaler, ingen bindning, gratis 24h-test.</li>
        </ul>
        <p>
          Den enda riktiga "kostnaden" med IPTV utan bindning är att du själv
          måste komma ihåg att förlänga när perioden går ut. Vi skickar en
          påminnelse via WhatsApp 7 dagar innan, så det är knappast ett
          problem.
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
    buildBreadcrumbJsonLd(SLUG, "IPTV utan bindning"),
    buildFaqJsonLd(FAQS),
  ];

  return (
    <Landing
      slug={SLUG}
      pageTitle={PAGE_TITLE}
      eyebrow="IPTV UTAN BINDNING"
      h1="IPTV utan bindning i Sverige — månadsvis från 83 kr"
      lead="Inget kontrakt, ingen automatisk förnyelse, inget kreditkort. Betala för 1, 3, 6 eller 12 månader — när perioden tar slut, slutar tjänsten. Punkt slut. Gratis test 24h, 20 000+ kanaler i 4K."
      intro={
        <>
          Sverige TV är byggt på en princip: du ska aldrig sitta fast i ett
          abonnemang du inte vill ha. Allt är engångsbetalningar, allt är
          månadsbaserat, och allt löper ut automatiskt — inget krav, ingen
          uppsägning, ingen automatisk debitering.
        </>
      }
      sections={SECTIONS}
      faqs={FAQS}
      ctaPrimaryMsg="Hej! Jag vill ha IPTV utan bindning. Vilket paket passar mig bäst?"
      ctaPrimaryLabel="Beställ utan bindning via WhatsApp"
      crossLinks={[
        CROSS_LINKS.sport,
        CROSS_LINKS.smartTv,
        CROSS_LINKS.firestick,
        CROSS_LINKS.home,
      ]}
      jsonLd={jsonLd}
    />
  );
}
