import Link from "next/link";
import type { ReactNode } from "react";

const SITE_URL = "https://premiumiptv.se";
const WHATSAPP_PHONE = "447307410512";

export type FAQ = { q: string; a: string };
export type Section = { h2: string; body: ReactNode };
export type CrossLink = { href: string; label: string; desc: string };

export const CROSS_LINKS: Record<string, CrossLink> = {
  sport: {
    href: "/iptv-sport-sverige",
    label: "IPTV Sport Sverige — Allsvenskan, SHL & Premier League",
    desc: "Hela utbudet av sportkanaler i 4K — Allsvenskan, SHL, Premier League, Champions League, F1.",
  },
  smartTv: {
    href: "/iptv-smart-tv-sverige",
    label: "IPTV Smart TV Sverige — Samsung, LG & Sony",
    desc: "Installation av IPTV på Samsung, LG WebOS och Sony Bravia. Steg-för-steg.",
  },
  utanBindning: {
    href: "/iptv-utan-bindning",
    label: "IPTV utan bindning — månadsvis & gratis test 24h",
    desc: "Inget kontrakt, ingen automatisk förnyelse. Bara månadsvis IPTV.",
  },
  firestick: {
    href: "/iptv-firestick-sverige",
    label: "IPTV Firestick Sverige — installation 5 min",
    desc: "Komplett guide för Amazon Fire TV Stick & 4K Max. IPTV Smarters + TiviMate.",
  },
  home: {
    href: "/",
    label: "Sverige TV — IPTV i Sverige från 83 kr/mån",
    desc: "20 000+ kanaler i 4K, gratis test 24h, ingen bindning, aktivering på 10 min.",
  },
};

export function whatsappLink(message: string, ref: string): string {
  // api.whatsapp.com works on both desktop and mobile (mobile auto-redirects).
  // Used here because landing pages are server components — no UA detection.
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

export function buildFaqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildArticleJsonLd(opts: {
  slug: string;
  headline: string;
  description: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/${opts.slug}#article`,
    headline: opts.headline,
    description: opts.description,
    image: `${SITE_URL}/og-image.jpg`,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    author: {
      "@type": "Organization",
      name: "Sverige TV",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Sverige TV",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${opts.slug}` },
    inLanguage: "sv-SE",
  };
}

export type LandingProps = {
  slug: string;
  pageTitle: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro: ReactNode;
  sections: Section[];
  faqs: FAQ[];
  ctaPrimaryMsg: string;
  ctaPrimaryLabel: string;
  crossLinks: CrossLink[];
  jsonLd: object[];
};

export function Landing(props: LandingProps) {
  const {
    pageTitle,
    eyebrow,
    h1,
    lead,
    intro,
    sections,
    faqs,
    ctaPrimaryMsg,
    ctaPrimaryLabel,
    crossLinks,
    jsonLd,
  } = props;

  const primaryHref = whatsappLink(ctaPrimaryMsg, `Landing-${props.slug}`);
  const trialHref = whatsappLink(
    `Hej! Jag vill testa Sverige TV gratis 24h (${pageTitle}).`,
    `Trial-${props.slug}`,
  );

  return (
    <main className="lp">
      {jsonLd.map((obj, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
        />
      ))}

      <header className="lpTopBar">
        <Link href="/" className="lpBack" aria-label="Tillbaka till Sverige TV">
          ← Sverige TV
        </Link>
        <a className="lpTopCta" href={primaryHref} target="_blank" rel="noreferrer">
          💬 WhatsApp
        </a>
      </header>

      <section className="lpHero">
        <p className="lpEyebrow">{eyebrow}</p>
        <h1 className="lpH1">{h1}</h1>
        <p className="lpLead">{lead}</p>
        <div className="lpActions">
          <a className="lpBtnPrimary" href={primaryHref} target="_blank" rel="noreferrer">
            {ctaPrimaryLabel}
          </a>
          <a className="lpBtnSecondary" href={trialHref} target="_blank" rel="noreferrer">
            🧪 Gratis test 24h
          </a>
        </div>
        <p className="lpTrust">
          ★ 4,9/5 av 1 200+ kunder &middot; Aktivering på 10 min &middot; Ingen
          bindning &middot; Funkar i 50+ länder
        </p>
      </section>

      <section className="lpIntro">{intro}</section>

      {sections.map((s, i) => (
        <section key={i} className="lpSection">
          <h2 className="lpH2">{s.h2}</h2>
          <div className="lpBody">{s.body}</div>
        </section>
      ))}

      <section className="lpSection lpFaq">
        <h2 className="lpH2">Vanliga frågor — {pageTitle}</h2>
        {faqs.map((f, i) => (
          <details key={i} className="lpFaqItem">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <section className="lpSection lpCtaBox">
        <h2 className="lpH2">Kom igång på 10 minuter</h2>
        <p>
          Kontakta oss på WhatsApp så aktiverar vi ditt abonnemang direkt.
          Inget kreditkort krävs för att testa.
        </p>
        <div className="lpActions">
          <a className="lpBtnPrimary" href={primaryHref} target="_blank" rel="noreferrer">
            {ctaPrimaryLabel}
          </a>
          <a className="lpBtnSecondary" href={trialHref} target="_blank" rel="noreferrer">
            🧪 Gratis test 24h
          </a>
        </div>
      </section>

      <section className="lpSection lpCross">
        <h2 className="lpH2">Läs också</h2>
        <ul className="lpCrossList">
          {crossLinks.map((cl) => (
            <li key={cl.href}>
              <Link href={cl.href}>
                <strong>{cl.label}</strong>
                <span>{cl.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="lpFooter">
        <p>
          © {new Date().getFullYear()} Sverige TV. Optimerat för snabb och
          stabil streaming i Sverige.
        </p>
        <p>
          <Link href="/">Tillbaka till startsidan</Link>
        </p>
      </footer>

      <a
        className="lpStickyCta"
        href={primaryHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Kontakta Sverige TV på WhatsApp"
      >
        💬 {ctaPrimaryLabel}
      </a>

      <style>{`
        .lp { max-width: 880px; margin: 0 auto; padding: 0 20px 120px; color: #f5f5f5; line-height: 1.6; min-height: 100vh; }
        .lpTopBar { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 24px; }
        .lpBack { color: #c8a96e; text-decoration: none; font-weight: 700; }
        .lpBack:hover { text-decoration: underline; }
        .lpTopCta { background: #c4001d; color: #fff; padding: 8px 16px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 14px; }
        .lpHero { padding: 32px 0 20px; }
        .lpEyebrow { color: #e8c97a; font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 14px; }
        .lpH1 { font-size: clamp(1.9rem, 4.6vw, 3rem); line-height: 1.1; font-weight: 900; margin: 0 0 18px; letter-spacing: -0.02em; }
        .lpLead { font-size: 1.1rem; color: #b8b8b8; max-width: 720px; margin: 0 0 24px; }
        .lpActions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
        .lpBtnPrimary { background: #c4001d; color: #fff; padding: 14px 28px; border-radius: 4px; text-decoration: none; font-weight: 700; font-size: 15px; box-shadow: 0 8px 22px -8px rgba(196,0,29,0.5); }
        .lpBtnPrimary:hover { background: #e60914; }
        .lpBtnSecondary { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18); color: #fff; padding: 13px 26px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14.5px; }
        .lpBtnSecondary:hover { background: rgba(255,255,255,0.12); }
        .lpTrust { color: #8a8a8a; font-size: 13px; margin: 16px 0 0; }
        .lpIntro { font-size: 1.05rem; color: #d8d8d8; margin: 28px 0 12px; padding: 18px 22px; background: rgba(196,0,29,0.04); border-left: 3px solid #c4001d; border-radius: 6px; }
        .lpSection { margin: 48px 0; }
        .lpH2 { font-size: clamp(1.4rem, 3.4vw, 1.85rem); font-weight: 800; margin: 0 0 18px; letter-spacing: -0.01em; }
        .lpBody { color: #d8d8d8; }
        .lpBody p { margin: 0 0 16px; }
        .lpBody h3 { font-size: 1.15rem; font-weight: 700; margin: 28px 0 10px; color: #fff; }
        .lpBody ul, .lpBody ol { padding-left: 22px; margin: 0 0 18px; }
        .lpBody li { margin-bottom: 8px; }
        .lpBody strong { color: #fff; }
        .lpBody a { color: #e8c97a; text-decoration: underline; text-underline-offset: 2px; }
        .lpBody a:hover { color: #fff; }
        .lpFaq summary { cursor: pointer; font-weight: 700; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.08); list-style: none; position: relative; padding-right: 30px; }
        .lpFaq summary::-webkit-details-marker { display: none; }
        .lpFaq summary::after { content: "+"; position: absolute; right: 8px; top: 12px; font-size: 22px; color: #c8a96e; }
        .lpFaq details[open] summary::after { content: "−"; }
        .lpFaqItem p { color: #b8b8b8; padding: 6px 0 18px; margin: 0; }
        .lpCtaBox { background: linear-gradient(180deg, rgba(196,0,29,0.08) 0%, rgba(0,0,0,0) 100%); border: 1px solid rgba(196,0,29,0.45); border-radius: 12px; padding: 28px 24px; }
        .lpCtaBox h2 { margin-top: 0; }
        .lpCrossList { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
        .lpCrossList a { display: block; padding: 16px 18px; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; color: #fff; text-decoration: none; transition: border-color 0.18s ease, transform 0.18s ease; }
        .lpCrossList a:hover { border-color: #c8a96e; transform: translateX(2px); }
        .lpCrossList strong { display: block; color: #fff; margin-bottom: 4px; font-weight: 700; }
        .lpCrossList span { color: #8a8a8a; font-size: 13.5px; }
        .lpFooter { margin-top: 64px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); color: #8a8a8a; font-size: 13.5px; text-align: center; }
        .lpFooter a { color: #c8a96e; }
        .lpStickyCta {
          position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
          background: #c4001d; color: #fff; padding: 14px 24px; border-radius: 99px;
          text-decoration: none; font-weight: 800; font-size: 14.5px; z-index: 100;
          box-shadow: 0 12px 30px -8px rgba(196,0,29,0.6);
          white-space: nowrap; max-width: calc(100% - 32px);
          overflow: hidden; text-overflow: ellipsis;
        }
        @media (min-width: 720px) {
          .lpStickyCta { bottom: 24px; right: 24px; left: auto; transform: none; }
        }
      `}</style>
    </main>
  );
}
