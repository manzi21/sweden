import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogg — guider och nyheter om TV i Sverige",
  description: "Guider, jämförelser och nyheter om IPTV, Smart TV, Allsvenskan, Champions League och TV på modersmål i Sverige.",
  alternates: { canonical: "https://premiumiptv.se/blogg" },
  openGraph: {
    title: "Blogg — Sverige TV",
    description: "Guider, jämförelser och nyheter om TV i Sverige.",
    url: "https://premiumiptv.se/blogg",
    siteName: "Sverige TV",
    type: "website",
    locale: "sv_SE"
  }
};

const ld1 = {"@context": "https://schema.org", "@type": "Blog", "url": "https://premiumiptv.se/blogg", "name": "Sverige TV Blogg", "inLanguage": "sv-SE", "blogPost": [{"@type": "BlogPosting", "headline": "Bästa IPTV i Sverige 2026 — komplett guide för svenska familjer", "url": "https://premiumiptv.se/blogg/basta-iptv-sverige-2026", "datePublished": "2026-04-21", "author": {"@type": "Person", "name": "Anders Berg"}}, {"@type": "BlogPosting", "headline": "IPTV vs Viaplay vs Netflix — vilken är bäst för svenska familjer 2026?", "url": "https://premiumiptv.se/blogg/iptv-vs-viaplay-vilken-ar-bast", "datePublished": "2026-04-21", "author": {"@type": "Person", "name": "Anders Berg"}}, {"@type": "BlogPosting", "headline": "IPTV på Smart TV — så installerar du på Samsung, LG och Sony", "url": "https://premiumiptv.se/blogg/iptv-pa-smart-tv-installation", "datePublished": "2026-04-21", "author": {"@type": "Person", "name": "Anders Berg"}}]};
const ld2 = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Hem", "item": "https://premiumiptv.se"}, {"@type": "ListItem", "position": 2, "name": "Blogg", "item": "https://premiumiptv.se/blogg"}]};

const CSS = `:root{--bg:#060407;--card:#0b0b0d;--accent:#7c1326;--gold:#c8a96e;--fg:#f0eff0;--muted:#7a7a86;--border:rgba(255,255,255,0.07);--green:#22c55e}*{box-sizing:border-box;margin:0;padding:0}body{background:var(--bg);color:var(--fg);font-family:var(--font-geist-sans),'Inter',system-ui,sans-serif;line-height:1.65}h1,h2,h3,h4{font-family:var(--font-geist-sans),system-ui,sans-serif;line-height:1.2;font-weight:800}a{color:inherit;text-decoration:none}.bc{max-width:1100px;margin:0 auto;padding:14px 20px;font-size:12px;color:var(--muted)}.bc a{color:var(--muted)}.bc a:hover{color:var(--gold)}.hero{max-width:1100px;margin:0 auto;padding:48px 20px 32px;text-align:center}.flag{font-size:54px;margin-bottom:12px;display:block}.hero h1{font-size:clamp(1.9rem,5vw,3.4rem);margin-bottom:8px;letter-spacing:-1px}.hero h1 .gold{color:var(--gold)}.hero .sub{font-size:1.2rem;color:var(--gold);margin-bottom:20px;font-weight:600}.hero .lead{font-size:1.05rem;color:#c8c8d4;max-width:720px;margin:0 auto 28px}.hero .lead-native{font-size:1rem;color:#a8a8b8;max-width:720px;margin:8px auto 28px;font-style:italic}.cta-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:8px}.cta{display:inline-flex;align-items:center;gap:10px;padding:14px 28px;border-radius:8px;font-weight:700;font-size:14px;transition:transform .15s ease}.cta:hover{transform:translateY(-1px)}.cta-primary{background:var(--green);color:#000}.cta-secondary{background:transparent;color:var(--gold);border:1px solid rgba(200,169,110,.4)}.cta-secondary:hover{background:rgba(200,169,110,.08)}section{max-width:1100px;margin:0 auto;padding:32px 20px}section.tight{max-width:780px}h2.section-title{font-size:1.8rem;text-align:center;margin-bottom:8px;color:var(--gold)}.section-sub{text-align:center;color:var(--muted);margin-bottom:32px;font-size:.95rem}.narrative p{margin-bottom:18px;color:#c8c8d4;font-size:1rem}.narrative p strong{color:#fff}.narrative-native{margin:24px 0;padding:24px;background:var(--card);border:1px solid var(--border);border-radius:12px;color:#c8c8d4;font-size:.98rem;white-space:pre-wrap}.grid{display:grid;gap:16px}.grid-3{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}.grid-4{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}.cat{background:var(--card);border:1px solid var(--border);padding:20px;border-radius:12px;transition:border-color .2s}.cat:hover{border-color:rgba(200,169,110,.4)}.cat-label-native{font-size:1.05rem;font-weight:700;color:var(--gold);margin-bottom:4px}.cat-label-sv{font-size:.78rem;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px}.cat-desc{font-size:.92rem;color:#c8c8d4;margin-bottom:10px;line-height:1.55}.cat-examples{font-size:.78rem;color:var(--muted)}.faq details{background:var(--card);border:1px solid var(--border);border-radius:10px;margin-bottom:10px;overflow:hidden}.faq summary{padding:16px 20px;cursor:pointer;font-weight:600;font-size:.98rem;list-style:none;display:flex;align-items:center;gap:10px}.faq summary::-webkit-details-marker{display:none}.faq summary::before{content:"▸";color:var(--gold);transition:transform .2s;display:inline-block}.faq details[open] summary::before{transform:rotate(90deg)}.faq details[open] summary{color:var(--gold)}.faq .answer{padding:0 20px 18px}.faq .answer p{color:#c8c8d4;font-size:.95rem;line-height:1.6}.faq .answer .native{margin-top:10px;padding:12px;background:rgba(200,169,110,.04);border-left:2px solid rgba(200,169,110,.3);border-radius:4px;font-size:.88rem;color:#a8a8b8}.faq .answer .native strong{color:var(--gold);display:block;margin-bottom:4px}.testimonial-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}.testimonial{background:var(--card);border:1px solid var(--border);padding:22px;border-radius:12px}.stars{color:var(--gold);margin-bottom:10px;font-size:.9rem}.quote{font-style:italic;color:#d4d4e0;margin-bottom:12px;font-size:.95rem;line-height:1.55}.author{font-size:.82rem;color:var(--muted)}.tags{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:18px}.tag{display:inline-block;padding:8px 16px;background:var(--card);border:1px solid var(--border);border-radius:99px;font-size:.85rem;color:#c8c8d4;transition:all .2s}.tag:hover{border-color:var(--gold);color:var(--gold)}.cta-block{max-width:780px;margin:32px auto 64px;padding:36px 24px;background:linear-gradient(135deg,var(--card),rgba(124,19,38,.15));border:1px solid rgba(200,169,110,.25);border-radius:14px;text-align:center}.cta-block h2{font-size:1.5rem;margin-bottom:8px;color:#fff}.cta-block p{color:var(--muted);margin-bottom:20px}.related-links{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin-top:18px}[dir="rtl"]{font-family:'Noto Naskh Arabic','Vazirmatn',serif}@media(max-width:640px){.hero{padding:32px 16px 24px}.hero h1{font-size:1.8rem}.grid-3,.grid-4{grid-template-columns:1fr}}`;

export default function Page() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld1) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld2) }} />
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav className="bc"><a href="/">Hem</a> / <span>Blogg</span></nav>

      <header className="hero">
        <h1><span className="gold">Blogg</span></h1>
        <p className="lead">Guider, jämförelser och nyheter om IPTV, Smart TV, Allsvenskan, Champions League och TV på modersmål i Sverige.</p>
      </header>

      <section>
        <div className="grid grid-3">
          <a href="/blogg/basta-iptv-sverige-2026" className="cat"><div className="cat-label-native">Bästa IPTV i Sverige 2026 — komplett guide för svenska familjer</div><div className="cat-desc">Vad du ska titta efter när du väljer IPTV i Sverige 2026 — kanalantal, 4K, EPG, support, betalning, lagligheten. Rangord…</div><div className="cat-examples">Av Anders Berg · 12 min läsning</div></a>
          <a href="/blogg/iptv-vs-viaplay-vilken-ar-bast" className="cat"><div className="cat-label-native">IPTV vs Viaplay vs Netflix — vilken är bäst för svenska familjer 2026?</div><div className="cat-desc">Ärlig jämförelse mellan IPTV, Viaplay och Netflix. När varje är bäst, vem vinner på pris, kanaler, sport, barn och inter…</div><div className="cat-examples">Av Anders Berg · 9 min läsning</div></a>
          <a href="/blogg/iptv-pa-smart-tv-installation" className="cat"><div className="cat-label-native">IPTV på Smart TV — så installerar du på Samsung, LG och Sony</div><div className="cat-desc">Steg-för-steg-guide för att installera IPTV på Samsung Smart TV, LG webOS och Sony Bravia. App-rekommendationer, vanliga…</div><div className="cat-examples">Av Anders Berg · 14 min läsning</div></a>
        </div>
      </section>
    </div>
  );
}
