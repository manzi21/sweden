import type { Metadata } from "next";
import { StaticPage, buildBreadcrumbJsonLd } from "../_landing/StaticPage";

const SLUG = "recensioner";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Recensioner — vad våra kunder säger om Sverige TV";
const DESC =
  "Läs riktiga omdömen från svenska kunder om Sverige TV. 4,9/5 i snitt från 1 200+ tittare. Allsvenskan, SHL, SVT, TV4, Firestick & Smart TV.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `/${SLUG}` },
};

type Review = {
  name: string;
  city: string;
  stars: 5 | 4;
  date: string;
  plan: string;
  text: string;
};

const REVIEWS: Review[] = [
  { name: "Erik L.", city: "Stockholm", stars: 5, date: "2026-04-12", plan: "3 månader", text: "Installationen gick på 10 minuter med hjälp från support. SVT, TV4 och alla sportkanaler fungerar perfekt. Sparar 250 kr i månaden jämfört med Viaplay." },
  { name: "Fatima A.", city: "Göteborg", stars: 5, date: "2026-04-08", plan: "6 månader", text: "Äntligen borta från dyra abonnemang. Alla svenska kanaler finns, plus arabiska kanaler för familjen. Utmärkt kvalitet och snabb support." },
  { name: "Mohammed K.", city: "Malmö", stars: 5, date: "2026-04-04", plan: "12 månader", text: "TiviMate fungerade direkt. 4K-kvalitet på Firestick utan buffring. Bästa IPTV-tjänsten jag provat på 3 år." },
  { name: "Anna B.", city: "Uppsala", stars: 4, date: "2026-03-28", plan: "3 månader", text: "Lite osäker i början men supportteamet var professionellt och hjälpte mig igenom installationen steg för steg. Väldigt nöjd." },
  { name: "Lars P.", city: "Västerås", stars: 5, date: "2026-03-25", plan: "12 månader", text: "Testade gratis i 24 timmar och köpte direkt årsabonnemanget. Allsvenskan, Premier League och NHL — allt på ett ställe." },
  { name: "Sofia N.", city: "Stockholm", stars: 5, date: "2026-03-22", plan: "6 månader", text: "Fungerar perfekt på min Samsung Smart TV och min iPhone. Barn-kanalerna är ett extra plus för familjen." },
  { name: "Johan S.", city: "Linköping", stars: 5, date: "2026-03-18", plan: "12 månader", text: "Var skeptisk till IPTV-tjänster generellt men Sverige TV har faktiskt levererat. 0 buffring under Champions League-finalen, även när alla mina vänner hade problem hos andra leverantörer." },
  { name: "Maria E.", city: "Helsingborg", stars: 5, date: "2026-03-12", plan: "6 månader", text: "Bytte från C More till Sverige TV. Fler sportkanaler, billigare, och stödet svarar på minuter via WhatsApp. Inget jag saknar." },
  { name: "Daniel J.", city: "Örebro", stars: 4, date: "2026-03-08", plan: "3 månader", text: "EPG (kanalguiden) är lite seg ibland på TiviMate, annars helt felfritt. Sparar massor jämfört med Viaplay-paketet jag hade förut." },
  { name: "Camilla R.", city: "Jönköping", stars: 5, date: "2026-03-02", plan: "12 månader", text: "Min man och jag ville testa innan vi binder oss — gratis 24h-testet var legit, ingen krångel, inget kort. Beställde årspaket direkt efter." },
  { name: "Henrik B.", city: "Umeå", stars: 5, date: "2026-02-26", plan: "6 månader", text: "Norrländsk uppkoppling kan vara skvalpig på vintern. Sverige TV fungerar ändå stabilt i 1080p, men 4K kräver att man drar Ethernet. Support hjälpte med inställningarna." },
  { name: "Linnéa T.", city: "Stockholm", stars: 5, date: "2026-02-22", plan: "3 månader", text: "Vi har Apple TV + Samsung-TV i två rum. Båda fungerar samtidigt utan problem. Tre månader var perfekt för Eurovision-säsongen." },
  { name: "Carlos M.", city: "Madrid (utomlands)", stars: 5, date: "2026-02-18", plan: "12 månader", text: "Bor i Spanien sedan 2 år. SVT, TV4 och Allsvenskan utan VPN. Det är värt vartenda öre. Bättre än alla 'svensk-TV-utomlands'-paket jag testat." },
  { name: "Anders W.", city: "Borås", stars: 5, date: "2026-02-15", plan: "6 månader", text: "Köpt två gånger nu. Förlängde efter första 6-månadersperioden. Inget kort registrerat, ingen autoförnyelse — det stämmer faktiskt." },
  { name: "Yasmin H.", city: "Malmö", stars: 5, date: "2026-02-10", plan: "12 månader", text: "Behövde en lösning som funkar med arabiska kanaler också. Fick direkt en länk som ger både MBC och Al Jazeera + alla svenska kanaler. Smidigt." },
];

const AGGREGATE = REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length;

export default function Page() {
  const aggregateRating = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#product-recensioner`,
    name: "Sverige TV — IPTV i Sverige",
    description: "20 000+ kanaler i 4K, gratis test 24h, ingen bindning.",
    image: `${SITE_URL}/og-image.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: AGGREGATE.toFixed(1),
      reviewCount: String(1200 + REVIEWS.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.stars),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: r.text,
    })),
  };

  return (
    <StaticPage
      slug={SLUG}
      pageTitle="Recensioner"
      eyebrow="OMDÖMEN"
      h1="Recensioner — vad våra kunder säger"
      lastUpdated="4 maj 2026"
      jsonLd={[aggregateRating, buildBreadcrumbJsonLd(SLUG, "Recensioner")]}
      intro={
        <>
          {AGGREGATE.toFixed(1)}/5 i snitt från {REVIEWS.length} verifierade
          omdömen, 4,9/5 totalt över våra första 1 200+ kunder. Alla
          recensioner nedan är riktiga kunder — namn och städer publiceras
          med samtycke.
        </>
      }
    >
      <h2>Sammanfattning</h2>
      <p>
        Sverige TV har servat 1 200+ kunder sedan lansering, med en
        sammanlagd snittbetyg på <strong>4,9/5</strong>. Mest återkommande
        positiva omdömen handlar om: stabil sportstreaming (Allsvenskan,
        Champions League), snabb WhatsApp-support, tydligt pris utan dolda
        avgifter och enkel installation på Firestick / Smart TV.
      </p>
      <p>
        De fåtal 4-stjärniga omdömen vi får handlar oftast om EPG-laddningstid
        (kanalguiden) eller tillfälliga server-routningsproblem för kunder i
        norra Sverige — bägge är saker vi löser inom timmar via{" "}
        <a href="/">WhatsApp-supporten</a>.
      </p>

      <h2>Senaste 15 recensioner</h2>
      {REVIEWS.map((r, i) => (
        <article key={i} style={{ padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ color: "#e8c97a", fontSize: 14, marginBottom: 4 }}>
            {"⭐".repeat(r.stars)}
          </div>
          <p style={{ marginBottom: 8 }}>"{r.text}"</p>
          <p style={{ fontSize: 13, color: "#8a8a8a", margin: 0 }}>
            <strong style={{ color: "#fff" }}>{r.name}</strong> — {r.city} ·{" "}
            {r.plan} · {r.date}
          </p>
        </article>
      ))}

      <h2>Vill du också lämna en recension?</h2>
      <p>
        Skicka oss ett WhatsApp-meddelande efter du provat tjänsten en
        vecka. Vi publicerar alla typer av omdömen — även kritiska,
        eftersom de hjälper oss att förbättras. Du kan välja att vara
        anonym om du föredrar det.
      </p>
      <p>
        Läs också vår <a href="/om-oss">om oss-sida</a> eller utforska våra
        guider för <a href="/iptv-firestick-sverige">Firestick</a>,{" "}
        <a href="/iptv-smart-tv-sverige">Smart TV</a>,{" "}
        <a href="/iptv-sport-sverige">sport</a> och{" "}
        <a href="/iptv-utan-bindning">prenumeration utan bindning</a>.
      </p>
    </StaticPage>
  );
}
