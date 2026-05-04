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

const SLUG = "iptv-sport-sverige";
const SITE_URL = "https://premiumiptv.se";
const PAGE_TITLE = "IPTV Sport Sverige";
const TITLE = "IPTV Sport Sverige 2026 — Allsvenskan, SHL, Premier League i 4K";
const DESC =
  "Bästa IPTV för sport i Sverige: Allsvenskan, SHL, Premier League, Champions League, NHL & F1 i äkta 4K. Från 83 kr/mån. Gratis test 24h, ingen bindning, aktivering på 10 min via WhatsApp.";

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
    q: "Kan jag se Allsvenskan via IPTV i Sverige?",
    a: "Ja. Sverige TV inkluderar svenska sportkanaler där Allsvenskan, Superettan och cupmatcher sänds — TV4, C More Sport och liknande. Du följer hela serien live i HD eller 4K, från premiären i april till slutomgången i november.",
  },
  {
    q: "Ingår SHL och hockey i IPTV-paketet?",
    a: "Ja. SHL, HockeyAllsvenskan och internationell hockey (NHL, KHL, VM och OS) finns i Sverige TV:s sportpaket. Du behöver inget separat C More-abonnemang för att se hockey.",
  },
  {
    q: "Vilka utländska sportkanaler ingår?",
    a: "Premier League, La Liga, Serie A, Bundesliga, Champions League, Europa League, NBA, NFL, MLB, Formel 1, MotoGP, UFC och boxning ingår. Totalt över 600 dedikerade sportkanaler i HD och 4K, inklusive Sky Sports, beIN Sports, ESPN, Eurosport och DAZN.",
  },
  {
    q: "Hur stabil är streamen under matcher med hög belastning?",
    a: "Vi använder dedikerade sportservrar med adaptiv bitrate. På derby- och Champions League-matcher mäter vi <0,5 % buffring i snitt. Bandbredd som rekommenderas: 25 Mbit/s för 4K, 10 Mbit/s för HD.",
  },
  {
    q: "Funkar IPTV för F1 och MotoGP-helger?",
    a: "Ja. Hela F1-helgen ingår — träning, kval och race — på Sky Sports F1, Viaplay Xtra och internationella feeds. Samma för MotoGP via DAZN och beIN Sports.",
  },
  {
    q: "Kan jag spola tillbaka eller pausa en pågående match?",
    a: "Ja, vi inkluderar Catch-up TV (timeshift) på alla sportkanaler i 7 dagar. Missade du straffen? Spola tillbaka, pausa, fortsätt. Funkar i TiviMate, IPTV Smarters och alla M3U-spelare.",
  },
  {
    q: "Vilken enhet är bäst för IPTV sport?",
    a: "För 4K-sport rekommenderar vi Amazon Fire TV Stick 4K Max eller Nvidia Shield. På Smart TV (Samsung/LG) funkar det också men 4K kräver att TV:n stödjer HEVC. Vi guidar dig på WhatsApp utifrån din enhet.",
  },
  {
    q: "Är det lagligt att titta på sport via IPTV i Sverige?",
    a: "Sverige TV är en streamingtjänst med betald distribution från sina leverantörer. Du som slutkonsument bryter inte mot någon lag genom att titta. Vi rekommenderar dock VPN för extra integritet, särskilt på publika nät.",
  },
];

const SECTIONS: Section[] = [
  {
    h2: "Vad ingår i Sverige TV:s sportpaket",
    body: (
      <>
        <p>
          Sverige TV är byggt för svenska sportfans som vill slippa bygga ihop
          fyra olika abonnemang — Viaplay för Allsvenskan, C More för hockey,
          Sky Sports för Premier League och DAZN för boxningen. Allt finns på
          ett ställe, för en bråkdel av kostnaden.
        </p>
        <h3>Svensk sport</h3>
        <ul>
          <li><strong>Allsvenskan</strong> — alla matcher live, från premiär till final.</li>
          <li><strong>Superettan & Damallsvenskan</strong> — fullständig sändning.</li>
          <li><strong>SHL & HockeyAllsvenskan</strong> — alla rundor live + Slutspel.</li>
          <li><strong>Svenska Cupen</strong> i fotboll och hockey.</li>
          <li><strong>Landslagsmatcher</strong> — herr- och damlandslagen.</li>
        </ul>
        <h3>Internationell sport</h3>
        <ul>
          <li><strong>Fotboll</strong>: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Europa League, Conference League, VM-kval.</li>
          <li><strong>Hockey</strong>: NHL (alla matcher), KHL, VM, OS.</li>
          <li><strong>Motorsport</strong>: F1 (alla pass), MotoGP, WRC, IndyCar, NASCAR.</li>
          <li><strong>Tennis</strong>: ATP, WTA, alla 4 Grand Slam (Australian Open, French Open, Wimbledon, US Open).</li>
          <li><strong>Amerikansk sport</strong>: NBA, NFL (Sunday Night, Monday Night, RedZone), MLB, NCAA.</li>
          <li><strong>Kampsport</strong>: UFC, Bellator, ONE Championship, boxning (DAZN, ESPN+).</li>
          <li><strong>Övrigt</strong>: golf (PGA, LIV, Ryder Cup), cykel (Tour de France, Giro, Vuelta), e-sport.</li>
        </ul>
      </>
    ),
  },
  {
    h2: "Vad det kostar — och vad du sparar",
    body: (
      <>
        <p>
          För att få samma sportutbud via traditionella abonnemang i Sverige
          behöver du normalt fyra till fem tjänster:
        </p>
        <ul>
          <li>Viaplay Total — 329 kr/mån (Allsvenskan, Premier League, F1)</li>
          <li>C More Sport — 449 kr/mån (SHL, hockey-VM)</li>
          <li>TV4 Play Premium — 159 kr/mån</li>
          <li>DAZN Sweden — 269 kr/mån (boxning, MMA)</li>
          <li>Eurosport / discovery+ — 109 kr/mån</li>
        </ul>
        <p>
          Total: <strong>1 315 kr/mån</strong>, eller cirka 15 780 kr/år. Sverige
          TV:s årspaket landar på <strong>600 kr</strong> totalt — du sparar över
          15 000 kr per år och får dessutom 20 000+ kanaler från resten av världen
          plus 100 000+ filmer och serier on demand.
        </p>
      </>
    ),
  },
  {
    h2: "Bildkvalitet, EPG och timeshift",
    body: (
      <>
        <p>
          Sportkanalerna sänds i upp till <strong>4K HDR med 50 fps</strong> där
          källan tillåter det (Premier League, Champions League, F1, NFL, NBA).
          Övriga kanaler är 1080p HD med adaptiv bitrate som matchar din
          uppkoppling.
        </p>
        <p>
          Den elektroniska programguiden (EPG) ingår och täcker 7 dagar framåt
          med matchstart, lagavataren, kommentatorer och kanalbyte. Catch-up TV
          låter dig spola tillbaka upp till 7 dagar — perfekt om du missar en
          målfest.
        </p>
      </>
    ),
  },
  {
    h2: "Bästa enhet för IPTV-sport",
    body: (
      <>
        <p>
          Vi rekommenderar dessa enheter för IPTV-sport i Sverige, baserat på
          1 200+ kunders setup:
        </p>
        <ol>
          <li><strong>Amazon Fire TV Stick 4K Max</strong> (~600 kr) — bästa pris/prestanda. Se vår <a href="/iptv-firestick-sverige">Firestick-guide</a>.</li>
          <li><strong>Nvidia Shield TV Pro</strong> — för seriösa 4K-användare med HDR/Dolby Vision.</li>
          <li><strong>Samsung & LG Smart TV</strong> (modell 2020+) — funkar utan extra hårdvara via Smart IPTV-app. <a href="/iptv-smart-tv-sverige">Se Smart TV-guide</a>.</li>
          <li><strong>Android TV Box</strong> — bra om du vill ha TiviMate Premium.</li>
          <li><strong>iPhone & iPad</strong> — för att titta på matcher i farten.</li>
        </ol>
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
    buildBreadcrumbJsonLd(SLUG, "IPTV Sport Sverige"),
    buildFaqJsonLd(FAQS),
  ];

  return (
    <Landing
      slug={SLUG}
      pageTitle={PAGE_TITLE}
      eyebrow="IPTV SPORT SVERIGE"
      h1="IPTV Sport i Sverige — Allsvenskan, SHL & Premier League i 4K"
      lead="Allt sport på ett ställe — Allsvenskan, SHL, Premier League, Champions League, F1, NFL & boxning. 600+ sportkanaler i 4K. Från 83 kr/mån. Gratis test 24h, ingen bindning."
      intro={
        <>
          Sverige TV samlar all sport som svenska tittare faktiskt vill se i
          ett enda paket. Du slipper jonglera Viaplay, C More, DAZN och Sky
          Sports — och du betalar mindre än för ett enskilt premiumabonnemang.
        </>
      }
      sections={SECTIONS}
      faqs={FAQS}
      ctaPrimaryMsg="Hej! Jag vill ha IPTV med sport (Allsvenskan, SHL, Premier League). Kan du hjälpa mig komma igång?"
      ctaPrimaryLabel="Beställ sportpaket via WhatsApp"
      crossLinks={[
        CROSS_LINKS.firestick,
        CROSS_LINKS.smartTv,
        CROSS_LINKS.utanBindning,
        CROSS_LINKS.home,
      ]}
      jsonLd={jsonLd}
    />
  );
}
