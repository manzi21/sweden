import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "IPTV Samsung Smart TV Sverige — Guide 2026 | Sverige TV",
  description: "Installera IPTV på Samsung Smart TV. Steg-för-steg guide via Smart Hub eller Firestick. Fungerar på alla Samsung-modeller.",
};
export default function Page() {
  return (
    <main style={{maxWidth:800,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
      <nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}>
        <a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › <a href="/installation" style={{color:"#c8a96e",textDecoration:"none"}}>Installation</a> › Samsung Smart TV
      </nav>
      <h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:12}}>IPTV på Samsung Smart TV</h1>
      <p style={{color:"#9898a4",marginBottom:40,lineHeight:1.7}}>Det finns två metoder för Samsung Smart TV. Välj den som passar din modell bäst.</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20,marginBottom:40}}>
        <div style={{background:"#0b0b0d",border:"2px solid #c8a96e",borderRadius:14,padding:"24px"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,color:"#c8a96e",marginBottom:12}}>Metod 1 — Via Smart Hub</h2>
          <p style={{color:"#9898a4",fontSize:14,lineHeight:1.6,marginBottom:16}}>Fungerar på Samsung-modeller 2016 och nyare med Tizen OS.</p>
          {["Tryck på Home-knappen → Apps → Sök","Sök efter 'Smart IPTV' eller 'SS IPTV'","Installera appen gratis","Öppna appen och ange din M3U-länk från Sverige TV","Klart — kanalerna laddas in automatiskt"].map((s,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:8,fontSize:14}}><span style={{color:"#c8a96e",fontWeight:800,minWidth:20}}>{i+1}.</span><span style={{color:"#d4d4d8"}}>{s}</span></div>))}
        </div>
        <div style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:14,padding:"24px"}}>
          <h2 style={{fontSize:"1.1rem",fontWeight:800,marginBottom:12}}>Metod 2 — Via Firestick (Rekommenderas)</h2>
          <p style={{color:"#9898a4",fontSize:14,lineHeight:1.6,marginBottom:16}}>Bästa upplevelsen. Anslut en Firestick 4K till HDMI-porten.</p>
          {["Koppla in Firestick i Samsung TV:ns HDMI-port","Byt inmatningskälla till HDMI","Installera TiviMate på Firestick","Koppla till ditt Sverige TV-konto","Njut av full 4K IPTV med EPG-guide"].map((s,i)=>(<div key={i} style={{display:"flex",gap:10,marginBottom:8,fontSize:14}}><span style={{color:"#c8a96e",fontWeight:800,minWidth:20}}>{i+1}.</span><span style={{color:"#d4d4d8"}}>{s}</span></div>))}
        </div>
      </div>

      <div style={{background:"#0d1a0d",border:"1px solid #16a34a",borderRadius:12,padding:"20px 24px",marginBottom:32}}>
        <b style={{color:"#22c55e"}}>💡 Rekommendation:</b>
        <p style={{margin:"8px 0 0",color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>Firestick-metoden ger överlägset bättre upplevelse — TiviMate är snabbare, har bättre EPG och stöder 4K. En Firestick 4K Max kostar ca 500 kr och är värt varje krona.</p>
      </div>

      {[["Min Samsung TV hittar inte IPTV-appar","Äldre Samsung-modeller (pre-2016) stöder inte tredjepartsappar. Använd då Firestick eller Android box via HDMI."],["Kan jag installera TiviMate direkt på Samsung?","Nej — Samsung Tizen OS stöder inte Android APK. TiviMate kräver Firestick eller Android TV box."],["Hur anger jag M3U-länken?","I Smart IPTV eller SS IPTV: gå till inställningar → lägg till spellista → klistra in din M3U-URL från Sverige TV."]].map(([q,a],i)=>(
        <details key={i} style={{background:"#0b0b0d",border:"1px solid #222",borderRadius:10,marginBottom:10,padding:"14px 18px"}}>
          <summary style={{fontWeight:700,cursor:"pointer"}}>{q}</summary>
          <p style={{marginTop:10,color:"#d4d4d8",lineHeight:1.7,fontSize:14}}>{a}</p>
        </details>
      ))}

      <div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:14,padding:"28px",marginTop:40,textAlign:"center"}}>
        <h3 style={{fontWeight:900,marginBottom:8}}>Behöver du hjälp med Samsung-installation?</h3>
        <p style={{color:"#9898a4",marginBottom:20}}>Vår support guidar dig steg för steg via WhatsApp.</p>
        <a href="https://wa.me/447307410512?text=Hej!+Jag+behöver+hjälp+med+IPTV+på+Samsung+Smart+TV." target="_blank" rel="noreferrer" style={{background:"#22c55e",color:"#000",padding:"14px 28px",borderRadius:8,textDecoration:"none",fontWeight:800}}>💬 WhatsApp-support</a>
      </div>
    </main>
  );
}
