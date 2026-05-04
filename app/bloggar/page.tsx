import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage, buildBreadcrumbJsonLd } from "../_landing/StaticPage";

const SLUG = "bloggar";
const SITE_URL = "https://premiumiptv.se";
const TITLE = "Sverige TV-bloggen — guider, jämförelser & nyheter om IPTV i Sverige";
const DESC =
  "Guider, jämförelser och praktiska tips kring IPTV i Sverige. Från 'Vad är IPTV?' till 'IPTV vs Viaplay' och uppdaterade rankings för 2026.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `/${SLUG}` },
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  datePublished: string;
};

const POSTS: Post[] = [
  {
    slug: "vad-ar-iptv",
    title: "Vad är IPTV? Komplett guide för svenska tittare 2026",
    excerpt: "IPTV förklarat på 5 minuter. Hur fungerar tekniken, vad behöver du för att titta, och varför har 1 miljon svenskar bytt från traditionell TV?",
    datePublished: "2026-04-25",
  },
  {
    slug: "iptv-vs-viaplay",
    title: "IPTV vs Viaplay 2026 — vilket sparar dig mest pengar?",
    excerpt: "Viaplay Total kostar 329 kr/mån. Sverige TV kostar 50 kr/mån i årspaket. Här jämför vi kanalutbud, sport, kvalitet och support — utan PR-snack.",
    datePublished: "2026-04-15",
  },
  {
    slug: "basta-iptv-2026",
    title: "Bästa IPTV i Sverige 2026 — testat och rangordnat",
    excerpt: "Vi testade 7 svenska IPTV-leverantörer på pris, stabilitet, kanalutbud och support. Här är resultatet — och vad du ska titta efter när du väljer själv.",
    datePublished: "2026-04-02",
  },
];

export default function Page() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/${SLUG}#blog`,
    url: `${SITE_URL}/${SLUG}`,
    name: "Sverige TV-bloggen",
    description: DESC,
    inLanguage: "sv-SE",
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: POSTS.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/${SLUG}/${p.slug}#post`,
      headline: p.title,
      datePublished: p.datePublished,
      url: `${SITE_URL}/${SLUG}/${p.slug}`,
      author: { "@type": "Organization", name: "Sverige TV" },
    })),
  };

  return (
    <StaticPage
      slug={SLUG}
      pageTitle="Bloggen"
      eyebrow="GUIDER & JÄMFÖRELSER"
      h1="Sverige TV-bloggen"
      lastUpdated="4 maj 2026"
      jsonLd={[blogSchema, buildBreadcrumbJsonLd(SLUG, "Bloggen")]}
      showCta={false}
      intro={
        <>
          Praktiska guider för dig som funderar på IPTV, redan kör IPTV, eller
          vill jämföra tjänster innan du byter. Inget partnerskaps-snack —
          bara vad vi själva hade velat veta innan vi byggde Sverige TV.
        </>
      }
    >
      <h2>Senaste artiklarna</h2>
      <div style={{ display: "grid", gap: 18 }}>
        {POSTS.map((p) => (
          <article key={p.slug} style={{ padding: "20px 22px", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10 }}>
            <Link href={`/bloggar/${p.slug}`} style={{ color: "#fff", textDecoration: "none" }}>
              <h3 style={{ margin: "0 0 8px", color: "#fff", fontSize: "1.2rem", fontWeight: 800 }}>{p.title}</h3>
              <p style={{ color: "#b8b8b8", margin: "0 0 10px" }}>{p.excerpt}</p>
              <div style={{ color: "#c8a96e", fontSize: 13, fontWeight: 600 }}>
                Läs mer → · publicerad {p.datePublished}
              </div>
            </Link>
          </article>
        ))}
      </div>

      <h2>Mer från Sverige TV</h2>
      <ul>
        <li><Link href="/iptv-sport-sverige">IPTV Sport Sverige — Allsvenskan, SHL & Premier League</Link></li>
        <li><Link href="/iptv-smart-tv-sverige">IPTV på Smart TV — Samsung, LG, Sony</Link></li>
        <li><Link href="/iptv-firestick-sverige">IPTV Firestick — installation på 5 minuter</Link></li>
        <li><Link href="/iptv-utan-bindning">IPTV utan bindning — månadsvis från 83 kr</Link></li>
        <li><Link href="/recensioner">Recensioner — 1 200+ omdömen</Link></li>
        <li><Link href="/om-oss">Om oss — vilka vi är</Link></li>
      </ul>
    </StaticPage>
  );
}
