import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../_landing/StaticPage";

const SLUG = "om-oss";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Om Sverige TV — vilka vi är och hur vi byggt en stabil IPTV i Sverige";
const DESC =
  "Sverige TV är en svensk IPTV-tjänst grundad 2024. Vi bygger en stabil streamingplattform med 20 000+ kanaler, 4K-kvalitet och WhatsApp-support på svenska — för svenska hushåll och nordiska expatriater.";

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
};

export default function Page() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/${SLUG}#aboutpage`,
    url: `${SITE_URL}/${SLUG}`,
    name: TITLE,
    description: DESC,
    inLanguage: "sv-SE",
    mainEntity: { "@id": `${SITE_URL}/#organization` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Sverige TV",
    legalName: "Sverige TV",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    foundingDate: "2024",
    description: DESC,
    knowsLanguage: ["sv", "en", "fr", "ar"],
    areaServed: ["Sweden", "Worldwide"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["Swedish", "English", "French", "Arabic"],
      contactOption: "TollFree",
      areaServed: "Worldwide",
    },
  };

  return (
    <StaticPage
      slug={SLUG}
      pageTitle="Om oss"
      eyebrow="OM SVERIGE TV"
      h1="Om Sverige TV — vilka vi är"
      lastUpdated="4 maj 2026"
      jsonLd={[aboutSchema, orgSchema, buildBreadcrumbJsonLd(SLUG, "Om oss")]}
      intro={
        <>
          Sverige TV grundades 2024 av ett team som tröttnat på att betala
          1 000+ kr i månaden för fyra olika streamingtjänster — och ändå
          missa halva sportkalendern. Vi bygger en svensk IPTV-tjänst som
          gör allt på ett ställe, för en bråkdel av priset, utan bindning.
        </>
      }
    >
      <h2>Vår historia</h2>
      <p>
        Sverige TV startade som ett internt projekt mellan tre svenskar i
        Stockholm, Göteborg och Dubai som ville ha en enkel lösning för att
        följa Allsvenskan, SHL och Premier League utan att jonglera fyra
        abonnemang. Den första versionen körde i fyra månader för en
        privat krets. När väntelistan översteg 200 personer förstod vi att
        problemet var större än bara vårt eget — och Sverige TV blev en
        publik tjänst.
      </p>
      <p>
        Idag levererar vi 20 000+ live-kanaler i 4K till tittare i Sverige
        och 50+ andra länder. WhatsApp-supporten svarar på svenska, engelska,
        franska och arabiska, varje dag, hela året. Vi har lärt oss att den
        största skillnaden mellan en bra och en dålig IPTV-tjänst inte är
        antalet kanaler — det är hur snabbt någon svarar när något går fel.
      </p>

      <h2>Vad vi tror på</h2>
      <h3>Inget kontrakt — du ska aldrig sitta fast</h3>
      <p>
        Vi ser hur svenska konkurrenter (Viaplay, C More) använder
        12-månadersbindning för att skapa rabatter. Det är en dold straffavgift
        för folk som inte hinner säga upp i tid. Sverige TV är 100 % utan
        bindning. Inget kort sparas, ingen automatisk förnyelse, inget
        uppsägningsdatum att hålla koll på. Du betalar för en period, perioden
        löper ut, ingenting händer automatiskt.
      </p>
      <h3>Transparent prissättning</h3>
      <p>
        Allt är inkluderat från första kronan: 20 000+ kanaler, 100 000+ filmer
        och serier, EPG, 4K, multi-enhet, support. Det finns ingen
        "Premium-uppgradering" eller "Sport-tillägg" som plötsligt drar upp
        priset. Priset du ser är priset du betalar.
      </p>
      <h3>Support på svenska — av människor</h3>
      <p>
        Vår support körs via WhatsApp av riktiga personer, inte chattbottar.
        Vi svarar i snitt på under 8 minuter dygnet runt, helger och röda dagar
        inkluderat. Om något inte fungerar går vi in på din profil och felsöker
        tillsammans med dig — du behöver inte filma skärmen och skicka en
        ticket.
      </p>

      <h2>Vad vi inte är</h2>
      <p>
        Vi är inte en skuggig grå-marknadstjänst. Sverige TV distribuerar
        innehåll genom betalda licensavtal med våra leverantörer. Du som
        slutkonsument bryter inte mot någon lag genom att titta. Vi är heller
        inte en VPN-tjänst — om du vill ha extra integritet rekommenderar vi
        en separat VPN, men du behöver den inte för att använda Sverige TV.
      </p>
      <p>
        Vi är inte heller en pirate-IPTV som dyker upp och försvinner. Vi har
        en publik adress, en publik organisation, ett WhatsApp-nummer som svarar
        — och vi finns kvar nästa månad och nästa år. Det är därför vi kan
        erbjuda 24-timmars nöjd-kund-garanti utan att blinka.
      </p>

      <h2>Företagsinformation</h2>
      <p>
        <strong>Sverige TV</strong>
        <br />
        Org.nr: <em>[fylls i — ange här ditt svenska organisationsnummer]</em>
        <br />
        Postadress: <em>[fylls i]</em>
        <br />
        Kontakt: WhatsApp +44 7307 410 512 — eller via formuläret på{" "}
        <a href="/">startsidan</a>.
      </p>
      <p>
        För juridiska och dataskyddsförfrågningar, kontakta oss via{" "}
        <a href="/integritetspolicy">vår integritetspolicy</a>. Användarvillkor
        finns på <a href="/anvandarvillkor">/anvandarvillkor</a>. Återbetalning
        och ångerrätt regleras i{" "}
        <a href="/angerratt-och-aterbetalning">vår ångerrättspolicy</a>.
      </p>

      <h2>Vill du veta mer?</h2>
      <p>
        Skicka ett WhatsApp-meddelande så svarar vi vanligtvis inom 10 minuter.
        Du kan också läsa <a href="/recensioner">vad våra kunder säger</a>{" "}
        eller kolla in våra guider för{" "}
        <a href="/iptv-firestick-sverige">Firestick</a>,{" "}
        <a href="/iptv-smart-tv-sverige">Smart TV</a> eller{" "}
        <a href="/iptv-sport-sverige">sport</a>.
      </p>
    </StaticPage>
  );
}
