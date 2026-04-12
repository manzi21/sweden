import type{Metadata}from"next";
export const metadata:Metadata={
  title:"Svenska Kanaler IPTV — SVT, TV4, Kanal 5 och mer | Sverige TV",
  description:"Se alla svenska TV-kanaler via IPTV. SVT1, SVT2, TV4, Kanal 5, TV3, TV6, TV8 och alla regionala kanaler. Laglig streaming från 83 kr/mån.",
};
const channels=[
  {name:"SVT 1",cat:"Public service",desc:"Nyheter, sport, drama och underhållning"},
  {name:"SVT 2",cat:"Public service",desc:"Dokumentärer, kultur och fördjupning"},
  {name:"SVT24",cat:"Nyheter",desc:"Nyheter och samhälle dygnet runt"},
  {name:"TV4",cat:"Kommersiell",desc:"Nyheter, Melodifestivalen, sport"},
  {name:"TV4 Film",cat:"Film",desc:"Svenska och internationella filmer"},
  {name:"Kanal 5",cat:"Underhållning",desc:"Reality, serier och underhållning"},
  {name:"TV3",cat:"Underhållning",desc:"Sport, reality och drama"},
  {name:"TV6",cat:"Film & sport",desc:"Action, sport och underhållning"},
  {name:"TV8",cat:"Livsstil",desc:"Mat, livsstil och reality"},
  {name:"TV10",cat:"Film",desc:"Film och underhållning"},
  {name:"Kunskapskanalen",cat:"Utbildning",desc:"SVT:s utbildningskanal"},
  {name:"Barnkanalen",cat:"Barn",desc:"SVT:s kanal för barn"},
];
export default function Page(){return(
  <main style={{maxWidth:860,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
    <nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}>
      <a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> ›{" "}
      <a href="/kanaler" style={{color:"#c8a96e",textDecoration:"none"}}>Kanaler</a> › Svenska
    </nav>
    <h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:12}}>🇸🇪 Svenska Kanaler</h1>
    <p style={{color:"#9898a4",marginBottom:16,lineHeight:1.7}}>
      Alla svenska TV-kanaler ingår i ditt Sverige TV-abonnemang. SVT, TV4, Kanal 5, TV3 och alla regionala kanaler — live och i HD.
    </p>
    <div style={{background:"#0d1a0d",border:"1px solid #16a34a",borderRadius:12,padding:"16px 20px",marginBottom:40}}>
      <b style={{color:"#22c55e"}}>✅ Alla svenska kanaler ingår</b> — inga extra avgifter, ingen VPN behövs
    </div>
    <h2 style={{fontSize:"1.2rem",fontWeight:800,margin:"0 0 20px"}}>Tillgängliga svenska kanaler</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12,marginBottom:48}}>
      {channels.map(c=>(
        <div key={c.name} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:10,padding:"16px"}}>
          <div style={{fontWeight:700,marginBottom:4,fontSize:15}}>{c.name}</div>
          <div style={{color:"#c8a96e",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>{c.cat}</div>
          <div style={{color:"#7a7a86",fontSize:13,lineHeight:1.5}}>{c.desc}</div>
        </div>
      ))}
    </div>
    <div style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:14,padding:"24px",marginBottom:40}}>
      <h3 style={{fontWeight:800,marginBottom:16,fontSize:"1.1rem"}}>Regionala kanaler ingår också</h3>
      <p style={{color:"#d4d4d8",lineHeight:1.7,fontSize:14,margin:0}}>
        Utöver rikskanalerna ingår SVT:s regionala sändningar — SVT Malmö, SVT Göteborg, SVT Stockholm och alla övriga regioner. Du missar aldrig lokala nyheter.
      </p>
    </div>
    {[
      ["Kan jag se SVT Play via Sverige TV?","Du ser SVT:s kanaler live via Sverige TV. SVT Play är SVTs egna on-demand-tjänst. Sverige TV inkluderar live-sändningarna samt catch-up för de flesta program."],
      ["Sänds Melodifestivalen live?","Ja! Melodifestivalen och alla andra stora SVT-event sänds live i realtid via Sverige TV."],
      ["Kan jag se svenska kanaler utomlands?","Ja — Sverige TV fungerar globalt utan VPN. Du ser SVT1, TV4 och alla svenska kanaler var du än befinner dig."],
    ].map(([q,a],i)=>(
      <details key={i} style={{background:"#0b0b0d",border:"1px solid #222",borderRadius:10,marginBottom:10,padding:"14px 18px"}}>
        <summary style={{fontWeight:700,cursor:"pointer"}}>{q}</summary>
        <p style={{marginTop:10,color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>{a}</p>
      </details>
    ))}
    <div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:16,padding:"32px",marginTop:40,textAlign:"center"}}>
      <h3 style={{fontWeight:900,marginBottom:10}}>Testa alla svenska kanaler gratis i 24h</h3>
      <p style={{color:"#9898a4",marginBottom:24}}>Aktivering på 5 minuter. Inget kreditkort.</p>
      <a href="/" style={{background:"linear-gradient(135deg,#9a1830,#7c1326)",color:"white",padding:"14px 32px",borderRadius:8,textDecoration:"none",fontWeight:800,display:"inline-block"}}>Se paket och priser →</a>
    </div>
  </main>
);}
