import type{Metadata}from"next";
export const metadata:Metadata={title:"Sport Kanaler IPTV Sverige — Allsvenskan, Premier League, NHL | Sverige TV",description:"Se all sport live med Sverige TV. Allsvenskan, Premier League, Champions League, NHL, SHL och mer. Utan Viaplay. Från 83 kr/mån."};
const sports=[{icon:"⚽",name:"Allsvenskan",desc:"Alla matcher live, säsong 2026"},
{icon:"🏆",name:"Champions League",desc:"Alla CL-matcher hela säsongen"},
{icon:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",name:"Premier League",desc:"Alla 380 matcher per säsong"},
{icon:"🏒",name:"SHL Hockey",desc:"Svensk hockey live"},
{icon:"🏒",name:"NHL",desc:"Alla nordamerikanska NHL-matcher"},
{icon:"🎾",name:"Tennis",desc:"Grand Slam och ATP/WTA-tour"},
{icon:"🏋️",name:"UFC / MMA",desc:"Alla UFC-galor live"},
{icon:"🏎️",name:"Formel 1",desc:"Alla F1-race säsong 2026"},
{icon:"⛳",name:"Golf",desc:"Masters, Open Championship och mer"},
{icon:"🏀",name:"NBA",desc:"Alla NBA-matcher"}];
export default function Page(){return(<main style={{maxWidth:860,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
<nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › <a href="/kanaler" style={{color:"#c8a96e",textDecoration:"none"}}>Kanaler</a> › Sport</nav>
<h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:12}}>⚽ Sport Kanaler — All Sport Live</h1>
<p style={{color:"#9898a4",marginBottom:16,lineHeight:1.7}}>Sluta betala 699 kr/mån för Viaplay. Med Sverige TV får du all sport live — Allsvenskan, Premier League, NHL, Champions League och mycket mer — för 83 kr/mån.</p>
<div style={{background:"#1a0a10",border:"1px solid #9a1830",borderRadius:12,padding:"16px 20px",marginBottom:40,display:"flex",gap:16,alignItems:"center",flexWrap:"wrap"}}>
<span style={{color:"#ef4444",textDecoration:"line-through",fontSize:18,fontWeight:700}}>Viaplay 699 kr/mån</span>
<span style={{color:"#7a7a86"}}>→</span>
<span style={{color:"#c8a96e",fontSize:22,fontWeight:900}}>Sverige TV från 83 kr/mån</span>
<span style={{background:"#22c55e",color:"#000",padding:"4px 10px",borderRadius:6,fontWeight:800,fontSize:13}}>Spara 600+ kr</span>
</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14,marginBottom:48}}>
{sports.map(s=>(<div key={s.name} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:12,padding:"18px"}}>
<div style={{fontSize:28,marginBottom:8}}>{s.icon}</div>
<h3 style={{fontWeight:800,marginBottom:4,fontSize:"0.95rem"}}>{s.name}</h3>
<p style={{color:"#7a7a86",fontSize:13,margin:0,lineHeight:1.5}}>{s.desc}</p>
</div>))}
</div>
{[["Kan jag se Allsvenskan utan Viaplay?","Ja! Allsvenskan ingår fullt ut i alla Sverige TV-paket. Alla matcher live, höjdpunkter och reprisering."],["Fungerar sport i 4K?","Ja — de flesta sportkanaler levereras i Full HD och 4K beroende på originalutsändning."],["Kan jag se sport utomlands?","Ja! Sverige TV fungerar globalt utan VPN. Se Allsvenskan från Spanien, Thailand eller var du än befinner dig."]].map(([q,a],i)=>(<details key={i} style={{background:"#0b0b0d",border:"1px solid #222",borderRadius:10,marginBottom:10,padding:"14px 18px"}}><summary style={{fontWeight:700,cursor:"pointer"}}>{q}</summary><p style={{marginTop:10,color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>{a}</p></details>))}
<div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:16,padding:"32px",marginTop:40,textAlign:"center"}}><h3 style={{fontWeight:900,marginBottom:10}}>Testa all sport gratis i 24h</h3><p style={{color:"#9898a4",marginBottom:20}}>Inget kreditkort. Aktivering på 5 minuter via WhatsApp.</p><a href="https://wa.me/447307410512?text=Hej!+Jag+vill+testa+sport-kanaler." target="_blank" rel="noreferrer" style={{background:"#22c55e",color:"#000",padding:"14px 28px",borderRadius:8,textDecoration:"none",fontWeight:800}}>💬 Starta test nu</a></div>
</main>);}
