import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "IPTV Sport Sverige 2026 – Allsvenskan, Premier League & 4K",
  description: "IPTV sport Sverige — Allsvenskan, Premier League, Champions League, NHL och 500+ sportkanaler i 4K. Från 83 kr/mån.",
  alternates: { canonical: "https://sverigetv.se/iptv-sverige-sport" },
  openGraph: { title: "IPTV Sport Sverige 2026 – Allsvenskan, Premier League & 4K", description: "IPTV sport Sverige — Allsvenskan, Premier League, Champions League, NHL och 500+ sportkanaler i 4K. Från 83 kr/mån.", url: "https://sverigetv.se/iptv-sverige-sport", type: "article", images: ["https://sverigetv.se/og-image.jpg"] },
  twitter: { card: "summary_large_image", title: "IPTV Sport Sverige 2026 – Allsvenskan, Premier League & 4K", description: "IPTV sport Sverige — Allsvenskan, Premier League, Champions League, NHL och 500+ sportkanaler i 4K. Från 83 kr/mån." },
};
const ld1 = {"@context":"https://schema.org","@type":"Article","headline":"IPTV Sport Sverige 2026 – Allsvenskan, Premier League & 4K","description":"IPTV sport Sverige — Allsvenskan, Premier League, Champions League, NHL och 500+ sportkanaler i 4K. Från 83 kr/mån.","author":{"@type":"Organization","name":"Sverige TV","url":"https://sverigetv.se"},"dateModified":"2026-04-14"};
const ld2 = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Kan jag titta på Allsvenskan via IPTV?","acceptedAnswer":{"@type":"Answer","text":"Ja! C More Sport och TV4 Sport ingår — alla matcher live i HD."}},{"@type":"Question","name":"Ingår Premier League?","acceptedAnswer":{"@type":"Answer","text":"Ja, alla 380 matcher via Sky Sports HD och Viasat."}},{"@type":"Question","name":"Ingår NHL och NBA?","acceptedAnswer":{"@type":"Answer","text":"Ja, via ESPN och Sportsnet. Alla nattens matcher live."}},{"@type":"Question","name":"Ingår Champions League?","acceptedAnswer":{"@type":"Answer","text":"Ja, alla matcher och finalen via C More och Viasat Sport."}},{"@type":"Question","name":"Kan jag pausa och spola tillbaka?","acceptedAnswer":{"@type":"Answer","text":"Ja, catch-up TV ingår på de flesta kanaler."}}]};
export default function Page() {
  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld1)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld2)}} />
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
    <style dangerouslySetInnerHTML={{__html:`:root{--bg:#060407;--card:#0b0b0d;--accent:#7c1326;--gold:#c8a96e;--fg:#f0eff0;--muted:#7a7a86;--border:rgba(255,255,255,0.07);--green:#22c55e}
*{box-sizing:border-box;margin:0;padding:0}body{background:var(--bg);color:var(--fg);font-family:'Inter',system-ui,sans-serif;line-height:1.65}
h1,h2,h3,h4{font-family:'Syne',sans-serif;line-height:1.15}
.nw{position:sticky;top:0;z-index:100;background:rgba(6,4,7,.95);backdrop-filter:blur(16px);border-bottom:1px solid rgba(139,23,40,.15)}
.nav{max-width:1100px;margin:0 auto;padding:14px 20px;display:flex;align-items:center;justify-content:space-between}
.brand{color:var(--gold);font-family:'Syne',sans-serif;font-weight:800;font-size:18px;text-decoration:none}
.nl{display:flex;gap:20px;align-items:center}
.nl a{color:var(--muted);text-decoration:none;font-size:13px}
.nc{background:var(--green);color:#000!important;font-weight:700!important;padding:8px 18px;border-radius:6px}
.bc{max-width:1100px;margin:0 auto;padding:12px 20px;font-size:12px;color:var(--muted)}
.bc a{color:var(--muted);text-decoration:none}
.hero{max-width:1100px;margin:0 auto;padding:60px 20px 48px}
.badge{display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:var(--green);font-size:11px;font-weight:700;padding:6px 14px;border-radius:99px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:20px}
.badge::before{content:"";width:7px;height:7px;background:var(--green);border-radius:50%;animation:pulse 2s infinite;display:inline-block}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.hero h1{font-size:clamp(2rem,5vw,3.6rem);font-weight:800;margin-bottom:20px;letter-spacing:-1px}
.hero h1 span{color:var(--gold)}
.lead{font-size:1.1rem;color:#c8c8d4;max-width:680px;margin-bottom:32px}
.hmeta{display:flex;flex-wrap:wrap;gap:16px;font-size:13px;color:var(--muted);margin-bottom:36px}
.hmeta strong{color:#fff}
.cw{display:inline-flex;align-items:center;gap:10px;background:var(--green);color:#000;font-weight:800;padding:16px 32px;border-radius:10px;text-decoration:none;font-size:15px;transition:transform .2s}
.cw:hover{transform:translateY(-2px)}
.cs{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid var(--border);color:#fff;font-weight:600;padding:14px 24px;border-radius:10px;text-decoration:none;font-size:14px}
.cr{display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.trust{display:flex;flex-wrap:wrap;gap:20px;margin-top:20px;font-size:12px;color:var(--muted)}
.trust span::before{content:"✓ ";color:var(--green);font-weight:700}
.cnt{max-width:1100px;margin:0 auto;padding:0 20px;display:grid;grid-template-columns:1fr 320px;gap:40px;align-items:start}
@media(max-width:900px){.cnt{grid-template-columns:1fr}.sb{display:none}}
.art h2{font-size:1.6rem;font-weight:700;margin:48px 0 16px;padding-top:48px;border-top:1px solid var(--border)}
.art h2:first-of-type{border-top:none;padding-top:0;margin-top:0}
.art h3{font-size:1.15rem;font-weight:700;margin:24px 0 10px;color:var(--gold)}
.art p{color:#c8c8d4;margin-bottom:16px;font-size:15px}
.art ul,.art ol{padding-left:22px;margin-bottom:20px}
.art li{color:#c8c8d4;font-size:15px;margin-bottom:8px}
.art strong{color:#fff}.art a{color:var(--gold);text-decoration:none}
.cm{background:linear-gradient(135deg,rgba(139,23,40,.12),rgba(100,10,25,.06));border:1px solid rgba(139,23,40,.3);border-radius:16px;padding:32px;margin:48px 0;text-align:center}
.cm h3{font-size:1.4rem;margin-bottom:10px}
.cm p{color:var(--muted);margin-bottom:24px;font-size:14px}
.tw{overflow-x:auto;margin:24px 0;border-radius:12px;border:1px solid var(--border)}
table{width:100%;border-collapse:collapse;font-size:14px;min-width:400px}
thead tr{background:rgba(255,255,255,.04)}
th{padding:12px 16px;text-align:left;font-size:12px;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border);font-weight:700}
td{padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.03);color:#ccc}
tr:last-child td{border-bottom:none}
.hl{background:rgba(139,23,40,.1)}.hl td{color:#fff;font-weight:600}
.g{color:var(--green)}.r{color:#ef4444}.go{color:var(--gold)}
.steps{list-style:none;padding:0;margin:24px 0}
.steps li{display:flex;gap:16px;align-items:flex-start;padding:16px 0;border-bottom:1px solid var(--border)}
.steps li:last-child{border-bottom:none}
.sn{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--accent),#5a0e1c);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;flex-shrink:0}
.st strong{display:block;color:#fff;margin-bottom:4px}.st span{font-size:14px;color:var(--muted)}
.faq{margin:24px 0}
.faq details{background:var(--card);border:1px solid var(--border);border-radius:10px;margin-bottom:10px}
.faq summary{padding:16px 18px;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;font-size:14px}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:"+";font-size:18px;color:var(--muted)}
.faq details[open] summary::after{content:"−"}
.faq p{padding:0 18px 18px;color:var(--muted);font-size:14px;line-height:1.6}
.ib{background:rgba(200,169,110,.07);border:1px solid rgba(200,169,110,.2);border-radius:12px;padding:20px 24px;margin:24px 0}
.ib strong{color:var(--gold);font-size:13px;text-transform:uppercase;letter-spacing:.5px;display:block;margin-bottom:8px}
.ib p{color:#c8c8d4;margin:0;font-size:14px}
.sb{position:sticky;top:80px}
.sc{background:var(--card);border:1px solid rgba(139,23,40,.25);border-radius:16px;padding:24px;margin-bottom:20px}
.sc h4{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;margin-bottom:14px;color:var(--gold);text-transform:uppercase;letter-spacing:.5px}
.spec{list-style:none;padding:0}
.spec li{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px}
.spec li:last-child{border-bottom:none}
.spec .v{color:var(--green);font-weight:700}
.rl{list-style:none;padding:0}
.rl li{padding:6px 0;border-bottom:1px solid var(--border)}
.rl li:last-child{border-bottom:none}
.rl a{color:#c8c8d4;text-decoration:none;font-size:13px}
.rl a::before{content:"→ ";color:var(--muted)}
footer{max-width:1100px;margin:80px auto 0;padding:40px 20px;text-align:center;color:var(--muted);font-size:13px;border-top:1px solid var(--border)}
footer a{color:var(--muted);text-decoration:none;margin:0 10px}
@media(max-width:640px){.hero{padding:40px 16px 32px}.hero h1{font-size:clamp(1.8rem,8vw,2.5rem)}.cw,.cs{width:100%;justify-content:center}.cr{flex-direction:column}.cnt{padding:0 16px}}`}} />
    <div className="nw"><nav className="nav"><a className="brand" href="/">🇸🇪 Sverige TV</a><div className="nl"><a href="/#offers">Paket</a><a href="/#channels">Kanaler</a><a href="/#faq">FAQ</a><a className="nc" href="https://api.whatsapp.com/send?phone=447307410512&text=Hej!%20Info%20Sverige%20TV.%20Ref%3A%20Nav" target="_blank" rel="noreferrer">💬 WhatsApp</a></div></nav></div>
    <nav className="bc"><a href="/">Hem</a> › <span>⚽ Sport Guide 2026</span></nav>
    <section className="hero">
      <div className="badge">⚽ Sport Guide 2026</div>
      <h1 dangerouslySetInnerHTML={{__html:`IPTV Sport Sverige 2026 –<br><span>Allsvenskan, Premier League & 4K</span>`}} />
      <p className="lead">Titta på all sport du vill — Allsvenskan, Premier League, NHL, VM, EM och 500+ sportkanaler i 4K/UHD. Allt ingår i Sverige TV från 83 kr/mån.</p>
      <div className="hmeta"><span><strong>⚽ 500+ sportkanaler</strong></span><span><strong>📺 4K/UHD</strong></span><span><strong>⚡ Live — ingen fördröjning</strong></span></div>
      <div className="cr">
        <a className="cw" href="https://api.whatsapp.com/send?phone=447307410512&text=Hej!%20Testa%20IPTV%20Sverige%20gratis%2024h.%20Ref%3A%20Trial-iptv-sverige-sport" target="_blank" rel="noreferrer">💬 Testa gratis 24h</a>
        <a className="cs" href="/#offers">Se alla paket</a>
      </div>
      <div className="trust"><span>Gratis test 24h</span><span>Ingen bindningstid</span><span>Aktivering under 10 min</span><span>WhatsApp-support</span></div>
    </section>
    <div className="cnt">
      <article className="art" dangerouslySetInnerHTML={{__html:`<h2>500+ sportkanaler ingår</h2>
<div class="tw"><table><thead><tr><th>Kanal</th><th>Sport</th><th>Kvalitet</th></tr></thead><tbody>
<tr><td>C More Sport 1–4</td><td>Allsvenskan, Premier League</td><td class="g">4K/HD</td></tr>
<tr><td>TV4 Sport</td><td>Allsvenskan, Tennis</td><td class="g">HD</td></tr>
<tr><td>Eurosport 4K</td><td>Cykling, OS, Tennis</td><td class="g">4K</td></tr>
<tr><td>Sky Sports HD (x8)</td><td>Premier League, Golf</td><td class="g">HD</td></tr>
<tr><td>beIN Sports (1–5)</td><td>LaLiga, Serie A, Champions</td><td class="g">4K/HD</td></tr>
<tr class="hl"><td>ESPN / ESPN+</td><td>NBA, NHL, NFL, MLB</td><td class="g">HD</td></tr>
</tbody></table></div>
<h2>Allsvenskan via IPTV Sverige</h2>
<p>Allsvenskan ingår i sin helhet. TV4 Sport och C More Sport ingår — du behöver inga separata sportsabonnemang. IFK Göteborg, Malmö FF, AIK, Djurgården — alla lag live varje omgång.</p>
<div class="cm"><h3>⚽ Testa sport gratis</h3><p>Se om Allsvenskan och Premier League fungerar — gratis i 24 timmar.</p>
<a class="cw" href="https://api.whatsapp.com/send?phone=447307410512&text=Hej!%20Testa%20IPTV%20sport%2024h" target="_blank" rel="noreferrer">💬 Starta sporttest</a></div>
<h2>Internationell toppfotboll</h2>
<ul>
<li><strong>Premier League:</strong> Alla 380 matcher via Sky Sports och Viasat</li>
<li><strong>Champions League:</strong> Alla matcher inkl. finalen</li>
<li><strong>LaLiga, Serie A, Bundesliga:</strong> Hela säsongen</li>
<li><strong>NBA & NHL:</strong> ESPN och Sportsnet ingår</li>
</ul>
<h2>IPTV sport vs. traditionella paket</h2>
<div class="tw"><table><thead><tr><th>Tjänst</th><th>Pris/mån</th><th>Sportkanaler</th><th>Allsvenskan</th></tr></thead><tbody>
<tr><td>Viaplay Total</td><td>329 kr</td><td>~20</td><td class="g">✓</td></tr>
<tr><td>C More Allt</td><td>279 kr</td><td>~15</td><td class="g">✓</td></tr>
<tr class="hl"><td>Sverige TV IPTV</td><td class="go">från 83 kr</td><td class="g">500+</td><td class="g">✓</td></tr>
</tbody></table></div>
<h2>Vanliga frågor</h2>
<div class="faq">
<details><summary>Kan jag titta på Allsvenskan via IPTV?</summary><p>Ja! Alla matcher via C More Sport och TV4 Sport — ingår utan extra kostnad.</p></details>
<details><summary>Ingår Premier League och Champions League?</summary><p>Ja, båda ingår via Sky Sports HD och Viasat Sport. Alla matcher täcks.</p></details>
</div>
<p style="margin-top:48px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.07)"><strong>Se även:</strong> <a href="/iptv-sverige-4k">IPTV 4K</a> · <a href="/iptv-sverige-test">Gratis test</a> · <a href="/iptv-sverige-smart-tv">Smart TV</a></p>`}} />
      <aside className="sb">
        <div className="sc"><h4>⭐ Specifikationer</h4><ul className="spec"><li><span>Sportkanaler</span><span className="v">500+</span></li>
<li><span>Allsvenskan</span><span className="v">✓</span></li>
<li><span>Premier League</span><span className="v">✓</span></li>
<li><span>Champions League</span><span className="v">✓</span></li>
<li><span>NHL / NBA</span><span className="v">✓</span></li>
<li><span>Från</span><span className="v">83 kr/mån</span></li></ul>
          <a className="cw" style={{width:"100%",justifyContent:"center",marginTop:"16px",fontSize:"14px",padding:"14px"}} href="https://api.whatsapp.com/send?phone=447307410512&text=Hej!%20Testa%20IPTV%20Sverige%20gratis%2024h.%20Ref%3A%20Trial-iptv-sverige-sport" target="_blank" rel="noreferrer">🧪 Testa gratis 24h</a>
        </div>
        <div className="sc"><h4>🔗 Relaterat</h4><ul className="rl"><li><a href="/iptv-sverige-test">IPTV Test</a></li>
<li><a href="/iptv-sverige-4k">IPTV 4K</a></li>
<li><a href="/iptv-sverige-smart-tv">Smart TV</a></li>
<li><a href="/iptv-sverige-pris">IPTV Pris</a></li>
<li><a href="/basta-iptv-leverantor-sverige">Bästa leverantör</a></li></ul></div>
      </aside>
    </div>
    <footer><p>© 2026 Sverige TV. Alla rättigheter förbehållna.</p><p style={{marginTop:"10px"}}><a href="/">Hem</a><a href="/iptv-sverige-test">Test</a><a href="/iptv-sverige-pris">Pris</a><a href="/iptv-sverige-lagligt">Lagligt</a><a href="/iptv-sverige-firestick">Firestick</a><a href="/basta-iptv-leverantor-sverige">Bästa</a><a href="/iptv-sverige-smart-tv">Smart TV</a><a href="/iptv-sverige-sport">Sport</a><a href="/iptv-sverige-4k">4K</a><a href="/iptv-sverige-arabisk">Arabisk</a><a href="/iptv-abonnemang-sverige">Abonnemang</a></p></footer>
  </>);
}
