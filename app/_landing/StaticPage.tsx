import Link from "next/link";
import type { ReactNode } from "react";

const SITE_URL = "https://premiumiptv.se";
const WHATSAPP_PHONE = "447307410512";

export function whatsappLink(message: string, ref: string): string {
  const text = encodeURIComponent(message + ` | Ref: ${ref}`);
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`;
}

export function buildBreadcrumbJsonLd(slug: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}/${slug}` },
    ],
  };
}

export type StaticPageProps = {
  slug: string;
  pageTitle: string;
  eyebrow: string;
  h1: string;
  lastUpdated: string;
  intro: ReactNode;
  children: ReactNode;
  jsonLd?: object[];
  showCta?: boolean;
};

const FOOTER_LEGAL_LINKS = [
  { href: "/om-oss", label: "Om oss" },
  { href: "/integritetspolicy", label: "Integritetspolicy" },
  { href: "/anvandarvillkor", label: "Användarvillkor" },
  { href: "/angerratt-och-aterbetalning", label: "Ångerrätt & återbetalning" },
];

export function StaticPage(props: StaticPageProps) {
  const { pageTitle, eyebrow, h1, lastUpdated, intro, children, jsonLd = [], showCta = true } = props;
  const ctaHref = whatsappLink("Hej! Jag har en fråga om Sverige TV.", `Static-${props.slug}`);

  return (
    <main className="sp">
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <header className="spTopBar">
        <Link href="/" className="spBack">← Sverige TV</Link>
        {showCta && (
          <a className="spTopCta" href={ctaHref} target="_blank" rel="noreferrer">
            💬 WhatsApp
          </a>
        )}
      </header>

      <section className="spHero">
        <p className="spEyebrow">{eyebrow}</p>
        <h1 className="spH1">{h1}</h1>
        <p className="spMeta">Senast uppdaterad: {lastUpdated}</p>
      </section>

      <section className="spIntro">{intro}</section>

      <article className="spArticle">{children}</article>

      <footer className="spFooter">
        <nav aria-label="Juridisk information">
          {FOOTER_LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <p>
          © {new Date().getFullYear()} Sverige TV ({pageTitle}).{" "}
          <Link href="/">Tillbaka till startsidan</Link>
        </p>
      </footer>

      <style>{`
        .sp { max-width: 780px; margin: 0 auto; padding: 0 22px 96px; color: #f0f0f0; line-height: 1.7; }
        .spTopBar { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 28px; }
        .spBack { color: #c8a96e; text-decoration: none; font-weight: 700; }
        .spBack:hover { text-decoration: underline; }
        .spTopCta { background: #c4001d; color: #fff; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 14px; }
        .spHero { padding: 24px 0 12px; }
        .spEyebrow { color: #e8c97a; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 14px; }
        .spH1 { font-size: clamp(1.8rem, 4.4vw, 2.6rem); line-height: 1.15; font-weight: 900; margin: 0 0 12px; letter-spacing: -0.02em; }
        .spMeta { color: #8a8a8a; font-size: 13px; margin: 0; }
        .spIntro { margin: 24px 0; padding: 18px 22px; background: rgba(196,0,29,0.04); border-left: 3px solid #c4001d; border-radius: 6px; color: #d8d8d8; font-size: 1.02rem; }
        .spArticle h2 { font-size: clamp(1.25rem, 2.8vw, 1.55rem); font-weight: 800; margin: 36px 0 14px; letter-spacing: -0.01em; color: #fff; }
        .spArticle h3 { font-size: 1.1rem; font-weight: 700; margin: 26px 0 10px; color: #fff; }
        .spArticle p { margin: 0 0 16px; color: #d8d8d8; }
        .spArticle ul, .spArticle ol { padding-left: 22px; margin: 0 0 18px; color: #d8d8d8; }
        .spArticle li { margin-bottom: 8px; }
        .spArticle strong { color: #fff; }
        .spArticle a { color: #e8c97a; text-decoration: underline; text-underline-offset: 2px; }
        .spArticle a:hover { color: #fff; }
        .spArticle table { width: 100%; border-collapse: collapse; font-size: 14.5px; margin: 16px 0 24px; }
        .spArticle th, .spArticle td { border-bottom: 1px solid rgba(255,255,255,0.08); padding: 10px 12px; text-align: left; }
        .spArticle th { color: #c8a96e; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; }
        .spArticle blockquote { border-left: 3px solid #c8a96e; margin: 18px 0; padding: 10px 18px; color: #b8b8b8; font-style: italic; background: rgba(255,255,255,0.02); border-radius: 0 6px 6px 0; }
        .spFooter { margin-top: 64px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); color: #8a8a8a; font-size: 13.5px; text-align: center; }
        .spFooter nav { display: flex; gap: 18px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }
        .spFooter nav a { color: #c8a96e; text-decoration: none; font-weight: 600; }
        .spFooter nav a:hover { text-decoration: underline; }
        .spFooter > p > a { color: #c8a96e; }
      `}</style>
    </main>
  );
}
