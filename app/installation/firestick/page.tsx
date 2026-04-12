import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Installera IPTV på Firestick Sverige — Steg-för-steg guide 2026",
  description: "Komplett guide för IPTV på Amazon Firestick. Installera TiviMate eller IPTV Smarters. Klar på 10 minuter med Sverige TV.",
};
export default function Page() {
  return (
    <main style={{maxWidth:800,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
      <nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}>
        <a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › <a href="/installation" style={{color:"#c8a96e",textDecoration:"none"}}>Installation</a> › Firestick
      </nav>
      <h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:12}}>IPTV på Firestick — Komplett Guide</h1>
      <p style={{color:"#9898a4",marginBottom:40,lineHeight:1.7}}>Amazon Firestick är det populäraste sättet att köra IPTV. Installationen tar under 10 minuter. Följ stegen nedan.</p>
      
      <h2 style={{fontSize:"1.3rem",fontWeight:800,margin:"0 0 20px"}}>Steg-för-steg installation</h2>
      {[
        ["Steg 1","Aktivera sideloading","Gå till Inställningar → Min Fire TV → Utvecklaralternativ → Appar från okända källor: PÅ"],
        ["Steg 2","Installera Downloader","Sök 'Downloader' i Amazon App Store och installera den gratis appen."],
        ["Steg 3","Ladda ner TiviMate","Öppna Downloader, ange URL: tivimate.com. Ladda ner och installera APK-filen."],
        ["Steg 4","Koppla till Sverige TV","Öppna TiviMate → Lägg till spellista → Xtream Codes. Ange server, användarnamn och lösenord från din välkomstepost."],
        ["Steg 5","Klart!","Dina kanaler laddas in. EPG (kanalguide) uppdateras automatiskt. Du är igång!"],
      ].map(([s,t,d],i) => (
        <div key={i} style={{display:"flex",gap:20,marginBottom:24,background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:12,padding:"20px"}}>
          <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#9a1830,#7c1326)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,flexShrink:0}}>{i+1}</div>
          <div><h3 style={{margin:"0 0 6px",fontSize:"1rem",fontWeight:800}}>{t}</h3><p style={{margin:0,color:"#9898a4",lineHeight:1.6,fontSize:14}}>{d}</p></div>
        </div>
      ))}

      <div style={{background:"#0d1a0d",border:"1px solid #16a34a",borderRadius:12,padding:"20px 24px",marginTop:40,marginBottom:40}}>
        <h3 style={{fontWeight:800,marginBottom:8,color:"#22c55e"}}>💡 Tips: TiviMate vs IPTV Smarters</h3>
        <p style={{margin:0,color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>TiviMate rekommenderas för bästa upplevelse med EPG-guide och snabb navigering. IPTV Smarters är enklare att installera och finns i Amazon App Store. Båda fungerar utmärkt med Sverige TV.</p>
      </div>

      <h2 style={{fontSize:"1.3rem",fontWeight:800,margin:"0 0 16px"}}>Vanliga frågor — Firestick</h2>
      {[
        ["Vilken Firestick-modell är bäst?","Firestick 4K Max (2023) ger bäst prestanda. Men alla modeller fungerar med Sverige TV — även äldre Fire Stick HD."],
        ["Behöver jag VPN?","Nej. Sverige TV kräver ingen VPN. En stabil internetanslutning på minst 10 Mbps räcker för HD-streaming."],
        ["Varför buffrar det?","Vanligaste orsaken är Wi-Fi-signal. Prova att använda en Ethernet-adapter (microUSB till RJ45) för stabil anslutning."],
      ].map(([q,a],i)=>(
        <details key={i} style={{background:"#0b0b0d",border:"1px solid #222",borderRadius:10,marginBottom:10,padding:"14px 18px"}}>
          <summary style={{fontWeight:700,cursor:"pointer"}}>{q}</summary>
          <p style={{marginTop:10,color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>{a}</p>
        </details>
      ))}

      <div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:14,padding:"28px",marginTop:40,textAlign:"center"}}>
        <h3 style={{fontWeight:900,marginBottom:8}}>Behöver du hjälp med installationen?</h3>
        <p style={{color:"#9898a4",marginBottom:20}}>Vår support guidar dig via WhatsApp — steg för steg, på din enhet.</p>
        <a href="https://wa.me/447307410512?text=Hej!+Jag+behöver+hjälp+med+Firestick+installation." target="_blank" rel="noreferrer" style={{background:"#22c55e",color:"#000",padding:"14px 28px",borderRadius:8,textDecoration:"none",fontWeight:800}}>💬 Få hjälp via WhatsApp</a>
      </div>
    </main>
  );
}
