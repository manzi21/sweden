import type{Metadata}from"next";
export const metadata:Metadata={title:"Jämför IPTV vs Viaplay, C More, Netflix — Sverige TV",description:"Jämförelse av Sverige TV mot Viaplay, C More och Netflix. Pris, kanaler, sport och bildkvalitet. Spara 200-600 kr per månad."};
const rows=[{s:"Viaplay Total",p:"329 kr/mån",live:"~150",v:true,k:true,sup:"Chat"},
{s:"C More Everything",p:"279 kr/mån",live:"~80",v:true,k:false,sup:"Chat"},
{s:"Netflix Standard",p:"179 kr/mån",live:"0",v:true,k:true,sup:"Chat"},
{s:"Sverige TV 3 mån",p:"83 kr/mån",live:"20 000+",v:true,k:true,sup:"WhatsApp direkt",hi:true}];
export default function Page(){return(<main style={{maxWidth:900,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
<nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › Jämförelse</nav>
<h1 style={{fontSize:"clamp(1.8rem,5vw,3rem)",fontWeight:900,marginBottom:12}}>Sverige TV vs Viaplay, C More &amp; Netflix</h1>
<p style={{color:"#9898a4",marginBottom:40,lineHeight:1.7}}>Betalar du för mycket för streaming? Se hur Sverige TV jämförs med de stora tjänsterna.</p>
<div style={{overflowX:"auto",marginBottom:48}}>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:15,minWidth:600}}>
<thead><tr style={{background:"#0b0b0d"}}>{["Tjänst","Pris/mån","Live-kanaler","VOD","4K","Support"].map(h=>(<th key={h} style={{padding:"14px 16px",textAlign:"left",color:"#c8a96e",borderBottom:"1px solid #333",fontWeight:700,fontSize:13,textTransform:"uppercase"}}>{h}</th>))}</tr></thead>
<tbody>{rows.map(r=>(<tr key={r.s} style={{background:r.hi?"rgba(124,19,38,0.12)":"transparent",borderBottom:"1px solid #1a1a1a"}}>
<td style={{padding:"14px 16px",fontWeight:r.hi?800:600,color:r.hi?"#c8a96e":"#fff"}}>{r.hi&&"✓ "}{r.s}</td>
<td style={{padding:"14px 16px",color:r.hi?"#c8a96e":"#ccc",fontWeight:r.hi?800:400}}>{r.p}</td>
<td style={{padding:"14px 16px",color:r.hi?"#c8a96e":"#ccc"}}>{r.live}</td>
<td style={{padding:"14px 16px",color:r.v?"#22c55e":"#ef4444"}}>{r.v?"✓":"✗"}</td>
<td style={{padding:"14px 16px",color:r.k?"#22c55e":"#ef4444"}}>{r.k?"✓":"✗"}</td>
<td style={{padding:"14px 16px",color:r.hi?"#22c55e":"#ccc"}}>{r.sup}</td>
</tr>))}</tbody></table></div>
<div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:16,padding:"32px",marginBottom:40}}>
<h2 style={{fontSize:"1.3rem",fontWeight:900,marginBottom:16}}>Varför välja Sverige TV?</h2>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
{[["130x fler kanaler","20 000+ live-kanaler vs 150 i Viaplay"],["75% billigare","83 kr/mån vs 329 kr för Viaplay Total"],["Ingen bindningstid","Betala per månad, avsluta när du vill"],["WhatsApp-support","Direkt hjälp — inte ett callcenter"]].map(([t,d])=>(<div key={t} style={{background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"16px"}}><b style={{display:"block",marginBottom:4,color:"#c8a96e"}}>{t}</b><span style={{color:"#9898a4",fontSize:14}}>{d}</span></div>))}</div></div>
<div style={{textAlign:"center"}}><a href="/" style={{background:"linear-gradient(135deg,#9a1830,#7c1326)",color:"white",padding:"16px 40px",borderRadius:8,textDecoration:"none",fontWeight:800,fontSize:16,display:"inline-block"}}>Testa gratis 24h — inget kreditkort →</a></div>
</main>);}
