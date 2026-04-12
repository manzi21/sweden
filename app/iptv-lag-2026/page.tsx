import type{Metadata}from"next";
export const metadata:Metadata={
  title:"IPTV-lagen 2026 Sverige — SOU 2025:100 förklarad | Sverige TV",
  description:"Allt om den nya IPTV-lagen som träder i kraft juli 2026. SOU 2025:100, vad är lagligt, vad är olagligt och hur Sverige TV följer lagen. Uppdaterat 2026.",
};
const faqs=[
  {q:"Vad är SOU 2025:100?",a:"SOU 2025:100 är den statliga utredning som lade grunden för den nya IPTV-lagen som träder i kraft den 1 juli 2026. Den ger Justitiekanslern rätt att stänga av illegala streamtjänster och ålägger internetleverantörer att blockera piratservrar."},
  {q:"Vad är olagligt enligt lagen 2026?",a:"Det är olagligt att distribuera TV-kanaler utan licens från kanalägarna, att sälja IPTV med piratinnehåll, och att medvetet använda tjänster som bryter mot upphovsrätten. Konsumenter som köper lagliga tjänster berörs inte."},
  {q:"Är Sverige TV lagligt 2026?",a:"Ja. Sverige TV är en laglig IPTV-tjänst med korrekt licensiering. Vi distribuerar enbart kanaler och innehåll vi har avtalsmässig rätt att visa. Vår verksamhet uppfyller alla krav i den nya lagen."},
  {q:"Vad händer om man använder olaglig IPTV?",a:"Enligt den nya lagen kan konsumenter som medvetet använder piratstreaming få en varning. Upprepade brott kan leda till böter. Leverantörer av olagliga tjänster riskerar fängelse upp till 2 år."},
  {q:"Hur vet jag om min IPTV-tjänst är laglig?",a:"En laglig tjänst har tydliga kontaktuppgifter, ett registrerat företag, kundtjänst och licensavtal. Sverige TV uppfyller alla dessa krav och är transparent med vår verksamhet."},
];
export default function Page(){
  const jsonld={
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":faqs.map(f=>({
      "@type":"Question",
      "name":f.q,
      "acceptedAnswer":{"@type":"Answer","text":f.a}
    }))
  };
  return(
    <main style={{maxWidth:860,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonld)}}/>
      <nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}>
        <a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › IPTV-lagen 2026
      </nav>
      <div style={{background:"#0d1a0d",border:"1px solid #16a34a",borderRadius:12,padding:"14px 20px",marginBottom:32,fontSize:14}}>
        <b style={{color:"#22c55e"}}>✅ Uppdaterat april 2026</b> — baserat på SOU 2025:100 och gällande lagstiftning
      </div>
      <h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:16}}>⚖️ IPTV-lagen 2026 — Vad gäller i Sverige?</h1>
      <p style={{color:"#d4d4d8",lineHeight:1.8,marginBottom:32}}>
        Den 1 juli 2026 träder en ny lag i kraft som kraftigt förändrar spelreglerna för streaming i Sverige. Baserad på SOU 2025:100 ger lagen myndigheter nya verktyg för att bekämpa piratstreaming — och klargör exakt vad som är lagligt.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16,marginBottom:48}}>
        {[
          {icon:"📋",title:"SOU 2025:100",desc:"Statlig utredning som lade grunden"},
          {icon:"📅",title:"1 juli 2026",desc:"Datum då lagen träder i kraft"},
          {icon:"🔒",title:"ISP-blockering",desc:"Internetleverantörer kan tvingas blockera"},
          {icon:"⚠️",title:"Böter & fängelse",desc:"Upp till 2 år för leverantörer"},
        ].map((c,i)=>(
          <div key={i} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:12,padding:"20px"}}>
            <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
            <div style={{fontWeight:800,marginBottom:4}}>{c.title}</div>
            <div style={{color:"#7a7a86",fontSize:14}}>{c.desc}</div>
          </div>
        ))}
      </div>
      <h2 style={{fontSize:"1.4rem",fontWeight:800,marginBottom:16}}>Lagens tre huvuddelar</h2>
      <div style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:14,padding:"24px",marginBottom:32}}>
        {[
          {n:"1",t:"Blockering av piratservrar","d":"Internetleverantörer (Telia, Comviq, Tre etc.) kan tvingas av domstol att blockera IP-adresser och domäner som används för olaglig streaming."},
          {n:"2",t:"Ansvar för leverantörer","d":"Företag som distribuerar TV-kanaler utan licens kan åtalas. Straffet är böter eller fängelse upp till 2 år."},
          {n:"3",t:"Konsumentskydd","d":"Konsumenter som i god tro använder en tjänst de tror är laglig skyddas. Lagen riktar sig primärt mot distributörer, inte slutanvändare."},
        ].map((p,i)=>(
          <div key={i} style={{display:"flex",gap:16,marginBottom:i<2?24:0,paddingBottom:i<2?24:0,borderBottom:i<2?"1px solid #1e1e1e":"none"}}>
            <div style={{background:"#9a1830",color:"white",borderRadius:"50%",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,flexShrink:0}}>{p.n}</div>
            <div><div style={{fontWeight:700,marginBottom:4}}>{p.t}</div><div style={{color:"#d4d4d8",fontSize:14,lineHeight:1.7}}>{p.d}</div></div>
          </div>
        ))}
      </div>
      <h2 style={{fontSize:"1.4rem",fontWeight:800,marginBottom:24}}>Vanliga frågor om IPTV-lagen 2026</h2>
      {faqs.map((f,i)=>(
        <details key={i} style={{background:"#0b0b0d",border:"1px solid #222",borderRadius:10,marginBottom:10,padding:"16px 20px"}}>
          <summary style={{fontWeight:700,cursor:"pointer",fontSize:15}}>{f.q}</summary>
          <p style={{marginTop:12,color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>{f.a}</p>
        </details>
      ))}
      <div style={{background:"#0d1a0d",border:"1px solid #16a34a",borderRadius:14,padding:"24px",margin:"40px 0"}}>
        <h3 style={{fontWeight:800,marginBottom:8,color:"#22c55e"}}>✅ Sverige TV — Laglig och licensierad</h3>
        <p style={{color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>Vi drivs som ett registrerat företag med korrekt licensiering. Du kan använda Sverige TV utan oro — vi uppfyller alla krav i den nya lagen. Osäker? Kontakta oss via WhatsApp så svarar vi direkt.</p>
        <a href="/" style={{display:"inline-block",marginTop:16,background:"linear-gradient(135deg,#9a1830,#7c1326)",color:"white",padding:"12px 28px",borderRadius:8,textDecoration:"none",fontWeight:800}}>Se lagliga paket →</a>
      </div>
    </main>
  );
}
