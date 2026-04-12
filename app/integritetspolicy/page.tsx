import type{Metadata}from"next";
export const metadata:Metadata={title:"Integritetspolicy — Sverige TV",description:"Läs om hur Sverige TV hanterar dina personuppgifter enligt GDPR."};
export default function Page(){const s={h2:{fontSize:"1.2rem",fontWeight:800,margin:"32px 0 12px",color:"#c8a96e"} as React.CSSProperties,p:{color:"#d4d4d8",lineHeight:1.8,marginBottom:16,fontSize:15} as React.CSSProperties};
return(<main style={{maxWidth:800,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
<nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › Integritetspolicy</nav>
<h1 style={{fontSize:"2rem",fontWeight:900,marginBottom:8}}>Integritetspolicy</h1>
<p style={{color:"#7a7a86",fontSize:13,marginBottom:40}}>Senast uppdaterad: April 2026</p>
<h2 style={s.h2}>1. Personuppgiftsansvarig</h2>
<p style={s.p}>Sverige TV AB ansvarar för behandlingen av dina personuppgifter. Kontakt: support via WhatsApp +447307410512.</p>
<h2 style={s.h2}>2. Vilka uppgifter samlar vi in?</h2>
<p style={s.p}>Vi samlar in: e-postadress (för kontohantering), betalningsinformation (behandlas av betalningsleverantör), IP-adress (för teknisk felsökning), och användningsdata (för att förbättra tjänsten).</p>
<h2 style={s.h2}>3. Hur används dina uppgifter?</h2>
<p style={s.p}>Dina uppgifter används för att leverera och administrera din IPTV-tjänst, hantera betalningar, ge teknisk support och förbättra vår tjänst. Vi säljer aldrig dina uppgifter till tredje part.</p>
<h2 style={s.h2}>4. Rättslig grund (GDPR)</h2>
<p style={s.p}>Behandlingen baseras på avtalets fullgörande (Art. 6.1.b GDPR) för leverans av tjänsten, och berättigat intresse (Art. 6.1.f GDPR) för säkerhet och felsökning.</p>
<h2 style={s.h2}>5. Dina rättigheter</h2>
<p style={s.p}>Du har rätt att begära tillgång till, rättelse eller radering av dina personuppgifter. Du kan även invända mot behandling eller begära begränsning. Kontakta oss via WhatsApp för att utöva dina rättigheter.</p>
<h2 style={s.h2}>6. Datalagring</h2>
<p style={s.p}>Vi lagrar dina uppgifter så länge ditt konto är aktivt, plus 12 månader för bokföringsändamål enligt svensk lagstiftning.</p>
<h2 style={s.h2}>7. Kontakt</h2>
<p style={s.p}>Frågor om denna policy? Kontakta oss via <a href="https://wa.me/447307410512" style={{color:"#c8a96e"}}>WhatsApp</a>. Du kan även klaga till Integritetsskyddsmyndigheten (IMY) på imy.se.</p>
</main>);}
