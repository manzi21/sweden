import type{Metadata}from"next";
export const metadata:Metadata={title:"Användarvillkor — Sverige TV",description:"Läs Sveriges TV:s användarvillkor. Abonnemangsvillkor, betalning, ångerrätt och ansvarsbegränsning."};
export default function Page(){const s={h2:{fontSize:"1.2rem",fontWeight:800,margin:"32px 0 12px",color:"#c8a96e"} as React.CSSProperties,p:{color:"#d4d4d8",lineHeight:1.8,marginBottom:16,fontSize:15} as React.CSSProperties};
return(<main style={{maxWidth:800,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
<nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › Användarvillkor</nav>
<h1 style={{fontSize:"2rem",fontWeight:900,marginBottom:8}}>Användarvillkor</h1>
<p style={{color:"#7a7a86",fontSize:13,marginBottom:40}}>Senast uppdaterad: April 2026</p>
<h2 style={s.h2}>1. Tjänsten</h2>
<p style={s.p}>Sverige TV tillhandahåller en IPTV-streamingtjänst med licensierat innehåll. Tjänsten levereras via internet och kräver en stabil internetanslutning (minst 10 Mbps för HD).</p>
<h2 style={s.h2}>2. Abonnemang och betalning</h2>
<p style={s.p}>Abonnemang tecknas månadsvis eller längre perioder. Betalning sker i förskott. Vi accepterar Swish och banköverföring. Priser anges inklusive moms.</p>
<h2 style={s.h2}>3. Ångerrätt</h2>
<p style={s.p}>Enligt distansavtalslagen har du 14 dagars ångerrätt. Observera att ångerrätten upphör när du börjar använda tjänsten aktivt. Vår 24h-testperiod påverkar inte ångerrätten för ett betalt abonnemang.</p>
<h2 style={s.h2}>4. Tillåten användning</h2>
<p style={s.p}>Abonnemanget är personligt och får endast användas av abonnenten och dennes hushåll. Vidaresäljning, delning av inloggningsuppgifter utanför hushållet eller kommersiell användning är förbjuden.</p>
<h2 style={s.h2}>5. Tjänstens tillgänglighet</h2>
<p style={s.p}>Vi strävar efter 99,5% uptime. Planerat underhåll meddelas i förväg. Vi ansvarar inte för driftstörningar orsakade av din internetleverantör eller force majeure.</p>
<h2 style={s.h2}>6. Uppsägning</h2>
<p style={s.p}>Du kan säga upp ditt abonnemang när som helst via WhatsApp. Uppsägning gäller från nästa faktureringsperiod. Inget abonnemang förnyas automatiskt utan ditt godkännande.</p>
<h2 style={s.h2}>7. Ansvarsbegränsning</h2>
<p style={s.p}>Sverige TV ansvarar inte för indirekta skador eller utebliven vinst. Vårt ansvar begränsas till det belopp du betalat under de senaste 3 månaderna.</p>
<h2 style={s.h2}>8. Kontakt</h2>
<p style={s.p}>Frågor om dessa villkor? Kontakta oss via <a href="https://wa.me/447307410512" style={{color:"#c8a96e"}}>WhatsApp</a> eller se vår <a href="/integritetspolicy" style={{color:"#c8a96e"}}>integritetspolicy</a>.</p>
</main>);}
