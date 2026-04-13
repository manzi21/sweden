import type{Metadata}from"next";
export const metadata:Metadata={
  title:"Film & Serier IPTV — 100 000+ titlar via Sverige TV",
  description:"Se 100 000+ filmer och serier via IPTV. Netflix-innehåll, HBO, Disney+, Bollywood och mer — utan extra abonnemang. Från 83 kr/mån.",
};
const cats=[
  {icon:"🎬",name:"Hollywood",desc:"De senaste blockbusters och klassiker"},
  {icon:"🎭",name:"Svenska filmer",desc:"Svensk film och TV-serier"},
  {icon:"📺",name:"HBO Serier",desc:"Game of Thrones, Succession och mer"},
  {icon:"🦁",name:"Disney & Animation",desc:"Familjefilmer och animationer"},
  {icon:"🌍",name:"Bollywood",desc:"Indiska filmer och serier"},
  {icon:"🎪",name:"Turkiska serier",desc:"Populära turkiska dramaseriedirigt"},
  {icon:"🎌",name:"Anime",desc:"Japansk animation och serier"},
  {icon:"🏃",name:"Action & Thriller",desc:"Actionfilmer och spänningsserier"},
];
export default function Page(){return(
  <main style={{maxWidth:860,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
    <nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}>
      <a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> ›{" "}
      <a href="/kanaler" style={{color:"#c8a96e",textDecoration:"none"}}>Kanaler</a> › Film & Serier
    </nav>
    <h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:12}}>🎬 Film & Serier</h1>
    <p style={{color:"#9898a4",marginBottom:32,lineHeight:1.7}}>
      Med Sverige TV får du tillgång till 100 000+ filmer och serier. Allt från de senaste Hollywood-produktionerna till klassiska svenska filmer — ingår i ditt abonnemang.
    </p>
    <div style={{background:"#0d1a0d",border:"1px solid #16a34a",borderRadius:12,padding:"16px 20px",marginBottom:40}}>
      <b style={{color:"#22c55e"}}>✅ 100 000+ titlar ingår</b> — uppdateras dagligen med nytt innehåll
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:48}}>
      {cats.map(c=>(
        <div key={c.name} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:10,padding:"18px"}}>
          <div style={{fontSize:28,marginBottom:8}}>{c.icon}</div>
          <div style={{fontWeight:700,marginBottom:4}}>{c.name}</div>
          <div style={{color:"#7a7a86",fontSize:13,lineHeight:1.5}}>{c.desc}</div>
        </div>
      ))}
    </div>
    {[
      {q:"Kan jag se filmer on-demand?",a:"Ja. Sverige TV inkluderar VOD (Video on Demand) med 100 000+ titlar du kan se när du vill, inte bara live-TV."},
      {q:"Uppdateras filmbiblioteket?",a:"Ja, biblioteket uppdateras dagligen. Nya filmer och serier läggs till kontinuerligt."},
      {q:"Finns det svenska undertexter?",a:"De flesta filmer och serier har stöd för flera språk och textning, inklusive svenska."},
    ].map(({q,a},i)=>(
      <details key={i} style={{background:"#0b0b0d",border:"1px solid #222",borderRadius:10,marginBottom:10,padding:"14px 18px"}}>
        <summary style={{fontWeight:700,cursor:"pointer"}}>{q}</summary>
        <p style={{marginTop:10,color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>{a}</p>
      </details>
    ))}
    <div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:16,padding:"32px",marginTop:40,textAlign:"center"}}>
      <h3 style={{fontWeight:900,marginBottom:10}}>Börja titta på film & serier idag</h3>
      <p style={{color:"#9898a4",marginBottom:24}}>Testa gratis 24h — inget kreditkort krävs</p>
      <a href="/" style={{background:"linear-gradient(135deg,#9a1830,#7c1326)",color:"white",padding:"14px 32px",borderRadius:8,textDecoration:"none",fontWeight:800,display:"inline-block"}}>Se alla paket →</a>
    </div>
  </main>
);}
