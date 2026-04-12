import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Är IPTV Lagligt i Sverige 2026? Juridisk Guide | Sverige TV",
  description: "Komplett guide om IPTV-lagstiftning Sverige 2026. SOU 2025:100 förklarad. Undvik böter – välj laglig IPTV med Sverige TV.",
};

const S = { page: { maxWidth: 860, margin: "0 auto", padding: "60px 20px", color: "#f0eff0", fontFamily: "system-ui,sans-serif", background: "#060407", minHeight: "100vh" } as React.CSSProperties };

export default function Page() {
  return (
    <main style={S.page}>
      <div style={{ marginBottom: 24, fontSize: 13, color: "#7a7a86" }}>
        <a href="/" style={{ color: "#c8a96e", textDecoration: "none" }}>Sverige TV</a> › Är IPTV Lagligt?
      </div>

      <h1 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 900, marginBottom: 12, lineHeight: 1.1 }}>
        Är IPTV Lagligt i Sverige 2026?
      </h1>
      <p style={{ color: "#c8a96e", fontWeight: 700, marginBottom: 32, fontSize: 13 }}>Uppdaterad april 2026 | Källa: SOU 2025:100</p>

      <div style={{ background: "#0d1a0d", border: "1px solid #16a34a", borderRadius: 12, padding: "20px 24px", marginBottom: 40 }}>
        <b style={{ color: "#22c55e" }}>✅ Kort svar:</b>
        <p style={{ margin: "8px 0 0", lineHeight: 1.7 }}>IPTV-tekniken är laglig. Det avgörande är om leverantören har licenser. Sverige TV är en laglig tjänst med innehållsavtal. Pirat-IPTV utan licenser kan ge böter från 1 juli 2026.</p>
      </div>

      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "40px 0 14px" }}>Ny lag juli 2026 — SOU 2025:100</h2>
      <p style={{ lineHeight: 1.8, color: "#d4d4d8", marginBottom: 20 }}>
        Utredningen SOU 2025:100 föreslår att det från <strong>1 juli 2026</strong> blir straffbart för privatpersoner att använda olaglig IPTV. Straffet: <strong>böter</strong> för konsumenter, upp till <strong>6 års fängelse</strong> för distributörer. Ca 700 000 svenska hushåll (15%) berörs.
      </p>

      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "40px 0 14px" }}>Lagligt vs Olagligt — 5 kriterier</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginBottom: 40 }}>
        <thead>
          <tr style={{ background: "#0b0b0d" }}>
            <th style={{ padding: "12px 14px", textAlign: "left", color: "#c8a96e", borderBottom: "1px solid #333" }}>Kriterium</th>
            <th style={{ padding: "12px 14px", textAlign: "center", color: "#22c55e", borderBottom: "1px solid #333" }}>✅ Laglig</th>
            <th style={{ padding: "12px 14px", textAlign: "center", color: "#ef4444", borderBottom: "1px solid #333" }}>❌ Olaglig</th>
          </tr>
        </thead>
        <tbody>
          {[["Licenser","Avtal med TV-bolagen","Inga rättigheter"],["Företagsinfo","Org.nr, adress synlig","Helt anonymt"],["Pris","150–400 kr/mån","Under 60 kr/mån"],["Support","Svenska, officiell","Telegram/anonym"],["Stabilitet","SLA garanterat","Kan stängas ner"],].map(([k,v1,v2],i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
              <td style={{ padding: "11px 14px", fontWeight: 600 }}>{k}</td>
              <td style={{ padding: "11px 14px", textAlign: "center", color: "#a3e635" }}>{v1}</td>
              <td style={{ padding: "11px 14px", textAlign: "center", color: "#f87171" }}>{v2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: "40px 0 14px" }}>Vanliga frågor</h2>
      {[
        ["Är IPTV-boxar olagliga?","Nej. Firestick, Android box och MAG är laglig hårdvara. Det är tjänsten du väljer som avgör."],
        ["Kan jag straffas som privatperson?","Från 1 juli 2026 riskerar du böter om du medvetet använder olaglig IPTV. Lagliga tjänster som Sverige TV ger ingen risk."],
        ["Behöver jag VPN?","Nej för lagliga tjänster i Sverige. VPN kan hjälpa om du tittar från utlandet."],
        ["Hur vet jag att Sverige TV är laglig?","Vi är registrerade i Sverige med org.nr och licensavtal. Kontakta oss via WhatsApp för dokumentation."],
      ].map(([q,a],i) => (
        <details key={i} style={{ background: "#0b0b0d", border: "1px solid #222", borderRadius: 10, marginBottom: 10, padding: "14px 18px" }}>
          <summary style={{ fontWeight: 700, cursor: "pointer", fontSize: 15 }}>{q}</summary>
          <p style={{ marginTop: 10, color: "#d4d4d8", lineHeight: 1.7 }}>{a}</p>
        </details>
      ))}

      <div style={{ background: "linear-gradient(135deg,#1a0409,#0a0005)", border: "1px solid #7c1326", borderRadius: 16, padding: "32px", marginTop: 48, textAlign: "center" }}>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 900, marginBottom: 10 }}>Välj laglig IPTV — testa gratis 24h</h3>
        <p style={{ color: "#9898a4", marginBottom: 22 }}>Inga böter. Stabil streaming. WhatsApp-support.</p>
        <a href="/" style={{ background: "linear-gradient(135deg,#9a1830,#7c1326)", color: "white", padding: "14px 32px", borderRadius: 8, textDecoration: "none", fontWeight: 800 }}>Se våra paket →</a>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org","@type":"FAQPage",
        "mainEntity":[
          {"@type":"Question","name":"Är IPTV lagligt i Sverige?","acceptedAnswer":{"@type":"Answer","text":"IPTV-tekniken är laglig. Lagliga tjänster med rätt licenser är tillåtna. Pirat-IPTV utan licenser är olagligt."}},
          {"@type":"Question","name":"Vad händer med IPTV-lagen juli 2026?","acceptedAnswer":{"@type":"Answer","text":"SOU 2025:100 föreslår böter för privatpersoner som använder olaglig IPTV från 1 juli 2026."}},
        ]
      })}} />
    </main>
  );
}
