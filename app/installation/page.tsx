import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "IPTV Installation Sverige — Firestick, Samsung, Android, iPhone | Sverige TV",
  description: "Installera IPTV steg för steg. Guider för Firestick, Samsung Smart TV, LG, Android, iPhone. Igång på 10 minuter.",
};
const devices = [
  { name:"Amazon Firestick",icon:"🔥",slug:"firestick",desc:"Populäraste valet. Installera via Downloader-appen på 10 min." },
  { name:"Samsung Smart TV",icon:"📺",slug:"samsung-smart-tv",desc:"Via Smart Hub eller koppla in en Firestick via HDMI." },
  { name:"TiviMate Guide",icon:"📡",slug:"tivimate",desc:"Bästa IPTV-appen för Android med elegant EPG." },
  { name:"Android TV Box",icon:"🤖",slug:"android",desc:"Installera TiviMate eller IPTV Smarters direkt." },
  { name:"iPhone och iPad",icon:"📱",slug:"iphone",desc:"IPTV Smarters Pro finns i App Store." },
  { name:"LG Smart TV",icon:"🖥️",slug:"lg-smart-tv",desc:"Använd SS IPTV från LG Content Store." },
];
export default function Page() {
  return (
    <main style={{maxWidth:900,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
      <nav style={{marginBottom:28,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › Installation</nav>
      <h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:14}}>IPTV Installation — Alla Enheter</h1>
      <p style={{color:"#9898a4",marginBottom:48,lineHeight:1.7}}>Välj din enhet nedan. Du är igång på under 10 minuter. Behöver du hjälp? WhatsApp-support svarar direkt.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:18,marginBottom:60}}>
        {devices.map(d=>(
          <a key={d.slug} href={"/installation/"+d.slug} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:14,padding:"24px 20px",textDecoration:"none",color:"inherit",display:"block"}}>
            <div style={{fontSize:34,marginBottom:12}}>{d.icon}</div>
            <h2 style={{fontSize:"1.05rem",fontWeight:800,marginBottom:8,color:"#fff"}}>{d.name}</h2>
            <p style={{color:"#7a7a86",fontSize:14,lineHeight:1.6,margin:0}}>{d.desc}</p>
            <span style={{color:"#c8a96e",fontSize:13,fontWeight:700,display:"block",marginTop:14}}>Se guide →</span>
          </a>
        ))}
      </div>
      <div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:14,padding:"28px 32px",textAlign:"center"}}>
        <h3 style={{fontWeight:900,marginBottom:8}}>Behöver du personlig hjälp?</h3>
        <p style={{color:"#9898a4",marginBottom:20}}>Vi guidar dig via WhatsApp oavsett enhet.</p>
        <a href="https://wa.me/447307410512?text=Hej!+Jag+behöver+hjälp+med+IPTV-installation." target="_blank" rel="noreferrer" style={{background:"#22c55e",color:"#000",padding:"14px 28px",borderRadius:8,textDecoration:"none",fontWeight:800}}>💬 WhatsApp-support</a>
      </div>
    </main>
  );
}
