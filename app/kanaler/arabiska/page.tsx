import type{Metadata}from"next";
export const metadata:Metadata={title:"Arabiska Kanaler IPTV Sverige — MBC, Al Jazeera, Rotana | Sverige TV",description:"Titta på arabiska TV-kanaler i Sverige. MBC, Al Jazeera, Rotana, beIN Sports och 500+ kanaler. Laglig IPTV från 83 kr/mån."};
const channels=[{name:"MBC 1",cat:"Underhållning"},{name:"MBC Drama",cat:"Drama"},{name:"MBC 4",cat:"Familj"},{name:"Al Jazeera",cat:"Nyheter"},{name:"Al Arabiya",cat:"Nyheter"},{name:"Rotana Cinema",cat:"Film"},{name:"Rotana Khalijiya",cat:"Musik"},{name:"beIN Sports",cat:"Sport"},{name:"Al Hayat",cat:"Underhållning"},{name:"OSN",cat:"Premium"},{name:"LBC",cat:"Libanon"},{name:"Dubai TV",cat:"UAE"}];
export default function Page(){return(<main style={{maxWidth:860,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
<nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › <a href="/kanaler" style={{color:"#c8a96e",textDecoration:"none"}}>Kanaler</a> › Arabiska</nav>
<h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:12}}>🌍 Arabiska Kanaler i Sverige</h1>
<p style={{color:"#9898a4",marginBottom:16,lineHeight:1.7}}>Sverige TV erbjuder 500+ arabiska kanaler — allt från nyheter och sport till drama och musik. Perfekt för arabisktalande familjer i Sverige som vill hålla kontakten med sina hemländer.</p>
<div style={{background:"#0d1a0d",border:"1px solid #16a34a",borderRadius:12,padding:"16px 20px",marginBottom:40}}>
<b style={{color:"#22c55e"}}>✅ Ingår i alla paket</b> — inga extra avgifter för arabiska kanaler
</div>
<h2 style={{fontSize:"1.2rem",fontWeight:800,margin:"0 0 20px"}}>Populära arabiska kanaler</h2>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12,marginBottom:48}}>
{channels.map(c=>(<div key={c.name} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:10,padding:"16px",textAlign:"center"}}>
<div style={{fontWeight:700,marginBottom:4,fontSize:15}}>{c.name}</div>
<div style={{color:"#7a7a86",fontSize:12}}>{c.cat}</div>
</div>))}
</div>
<div style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:14,padding:"24px",marginBottom:40}}>
<h3 style={{fontWeight:800,marginBottom:16,fontSize:"1.1rem"}}>Varför välja Sverige TV för arabiska kanaler?</h3>
{[["Störst utbud","500+ arabiska kanaler vs 10-20 hos svenska operatörer"],["Alltid live","Inga fördröjningar — se nyheter och sport i realtid"],["Utan VPN","Fungerar direkt i Sverige, Finland, Norge och resten av världen"],["Stöd på arabiska","Vår support kan kommunicera på arabiska vid behov"]].map(([t,d])=>(<div key={t} style={{display:"flex",gap:12,marginBottom:12,fontSize:14}}><span style={{color:"#c8a96e",fontWeight:800,minWidth:8}}>✓</span><div><b>{t}</b><span style={{color:"#7a7a86"}}> — {d}</span></div></div>))}
</div>
<div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:16,padding:"32px",textAlign:"center"}}>
<h3 style={{fontWeight:900,marginBottom:10}}>Testa alla arabiska kanaler gratis i 24h</h3>
<p style={{color:"#9898a4",marginBottom:24}}>Inget kreditkort. Aktivering på 5 minuter.</p>
<a href="https://wa.me/447307410512?text=Hej!+Jag+vill+testa+arabiska+kanaler." target="_blank" rel="noreferrer" style={{background:"#22c55e",color:"#000",padding:"14px 28px",borderRadius:8,textDecoration:"none",fontWeight:800,marginRight:12}}>💬 Starta test via WhatsApp</a>
</div>
</main>);}
