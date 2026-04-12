import type{Metadata}from"next";
export const metadata:Metadata={title:"Kanaler — Sverige TV | Svenska, Sport, Arabiska och mer",description:"Utforska Sveriges TV-kanaler. Svenska kanaler, sport, arabiska, turkiska, polska och mycket mer. 20 000+ kanaler i ett abonnemang."};
const cats=[{icon:"🇸🇪",name:"Svenska kanaler",slug:"svenska",desc:"SVT, TV4, Kanal 5, TV3, TV6 och alla regionala kanaler"},
{icon:"⚽",name:"Sport",slug:"sport",desc:"Allsvenskan, Premier League, NHL, Champions League och mer"},
{icon:"🌍",name:"Arabiska kanaler",slug:"arabiska",desc:"MBC, Al Jazeera, rotana och 500+ arabiska kanaler"},
{icon:"🇹🇷",name:"Turkiska kanaler",slug:"turkiska",desc:"TRT, Kanal D, ATV och populära turkiska kanaler"},
{icon:"🇵🇱",name:"Polska kanaler",slug:"polska",desc:"TVP, Polsat, TVN och alla polska kanaler"},
{icon:"🎬",name:"Film och serier",slug:"film",desc:"100 000+ filmer och serier på begäran"}];
export default function Page(){return(<main style={{maxWidth:900,margin:"0 auto",padding:"60px 20px",color:"#f0eff0",fontFamily:"system-ui,sans-serif",background:"#060407",minHeight:"100vh"}}>
<nav style={{marginBottom:24,fontSize:13,color:"#7a7a86"}}><a href="/" style={{color:"#c8a96e",textDecoration:"none"}}>Sverige TV</a> › Kanaler</nav>
<h1 style={{fontSize:"clamp(1.8rem,5vw,2.8rem)",fontWeight:900,marginBottom:12}}>Alla Kanaler</h1>
<p style={{color:"#9898a4",marginBottom:48,lineHeight:1.7}}>Med Sverige TV får du tillgång till 20 000+ live-kanaler från hela världen — allt i ett abonnemang utan extra kostnad.</p>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18}}>
{cats.map(c=>(<a key={c.slug} href={"/kanaler/"+c.slug} style={{background:"#0b0b0d",border:"1px solid #1e1e1e",borderRadius:14,padding:"24px 20px",textDecoration:"none",color:"inherit",display:"block"}}>
<div style={{fontSize:36,marginBottom:12}}>{c.icon}</div>
<h2 style={{fontSize:"1.05rem",fontWeight:800,marginBottom:8,color:"#fff"}}>{c.name}</h2>
<p style={{color:"#7a7a86",fontSize:14,lineHeight:1.6,margin:0}}>{c.desc}</p>
<span style={{color:"#c8a96e",fontSize:13,fontWeight:700,display:"block",marginTop:14}}>Se kanaler →</span>
</a>))}
</div>
<div style={{background:"#1a0a10",border:"1px solid #7c1326",borderRadius:14,padding:"28px",marginTop:48,textAlign:"center"}}>
<h3 style={{fontWeight:900,marginBottom:8}}>Alla kanaler ingår — från 83 kr/mån</h3>
<a href="/" style={{background:"linear-gradient(135deg,#9a1830,#7c1326)",color:"white",padding:"14px 32px",borderRadius:8,textDecoration:"none",fontWeight:800,display:"inline-block",marginTop:16}}>Se paket och priser →</a>
</div>
</main>);}
