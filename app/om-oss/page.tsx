import type{Metadata}from"next";
export const metadata:Metadata={title:"Om Oss — Sverige TV | Laglig IPTV Tjänst",description:"Sverige TV är en registrerad svensk IPTV-tjänst med licensierat innehåll. Lär känna oss, vår historia och vårt team."};
export default function Page(){return(<main style={{maxWidth:800,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
<nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › Om Oss</nav>
<h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:16}}>Om Sverige TV</h1>
<p style={{color:"#d4d4d8",lineHeight:1.8,marginBottom:32,fontSize:16}}>Sverige TV är en laglig IPTV-tjänst grundad för att ge svenska hushåll och utlandsboende ett prisvärt, stabilt och lagligt alternativ till dyra kabel- och satellitabonnemang.</p>

<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:48}}>
{[["4 200+","Aktiva prenumeranter"],["4,9/5","Genomsnittligt betyg"],["99,5%","Uptime senaste 30 dagarna"],["< 10 min","Genomsnittlig aktiveringstid"]].map(([v,l])=>(<div key={l} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:12,padding:"20px",textAlign:"center"}}><div style={{fontSize:"2rem",fontWeight:900,color:"#c8a96e",marginBottom:6}}>{v}</div><div style={{color:"#7a7a86",fontSize:14}}>{l}</div></div>))}</div>

<h2 style={{fontSize:"1.3rem",fontWeight:800,margin:"0 0 16px"}}>Vår verksamhet</h2>
<p style={{color:"#d4d4d8",lineHeight:1.8,marginBottom:24}}>Vi är ett registrerat bolag som levererar IPTV-tjänster med licensierade innehållsavtal. Alla kanaler vi distribuerar sker inom ramen för gällande upphovsrättslagstiftning. Vi är transparent med vår verksamhet och väljer bort anonymitet som är vanlig i branschen.</p>
<div style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:12,padding:"24px",marginBottom:40}}>
{[["Bolagsnamn","Sverige TV AB"],["Tjänst","Laglig IPTV-leverantör"],["Support","WhatsApp, vardagar 08:00–23:00"],["Betalning","Swish, bankoverföring"],["Grundat","2023"]].map(([k,v])=>(<div key={k} style={{display:"flex",gap:16,padding:"10px 0",borderBottom:"1px solid #1a1a1a",fontSize:14}}><span style={{color:"#7a7a86",minWidth:140}}>{k}:</span><span style={{color:"#fff",fontWeight:600}}>{v}</span></div>))}</div>

<h2 style={{fontSize:"1.3rem",fontWeight:800,margin:"0 0 16px"}}>Varför välja oss?</h2>
{[["Laglig och transparent","Vi är ett registrerat bolag med licensavtal — inte en anonym sida på internet."],["WhatsApp-support på svenska","Vår support svarar direkt och hjälper dig på svenska."],["Stabilt och pålitligt","Redundant serverinfrastruktur med 99,5% uptime. Ingen kund lämnas utan hjälp."],["Inget kreditkort krävs","Testa gratis i 24 timmar utan att lämna kortuppgifter."]].map(([t,d],i)=>(<div key={i} style={{display:"flex",gap:16,marginBottom:20,padding:"20px",background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:12}}><div style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#9a1830,#7c1326)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✓</div><div><b style={{display:"block",marginBottom:4}}>{t}</b><span style={{color:"#9898a4",fontSize:14,lineHeight:1.6}}>{d}</span></div></div>))}

<div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:16,padding:"32px",marginTop:40,textAlign:"center"}}><h3 style={{fontWeight:900,marginBottom:10}}>Kontakta oss</h3><p style={{color:"#9898a4",marginBottom:20}}>Har du frågor? Kontakta oss via WhatsApp — vi svarar direkt.</p><a href="https://wa.me/447307410512" target="_blank" rel="noreferrer" style={{background:"#22c55e",color:"#000",padding:"14px 28px",borderRadius:8,textDecoration:"none",fontWeight:800}}>💬 Skicka meddelande</a></div>
</main>);}
