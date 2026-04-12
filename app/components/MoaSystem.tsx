"use client";
import{useState,useEffect,useCallback}from"react";

const WA="447307410512";
const MOA="data:image/jpeg;base64,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";

const MESSAGES=[
  {sv:"Hej! 👋 Jag hjälper dig hitta rätt paket.",fr:"Bonjour! 👋 Je vous aide à trouver le bon forfait.",en:"Hi! 👋 Let me help you find the right plan."},
  {sv:"Har du frågor? Jag svarar direkt! 💬",fr:"Des questions? Je réponds immédiatement! 💬",en:"Questions? I reply instantly! 💬"},
  {sv:"Testa gratis i 24h — inga risker 🎉",fr:"Essai gratuit 24h — aucun risque 🎉",en:"Free trial 24h — no risk 🎉"},
  {sv:"20 000+ kanaler, 4K, sport & film ✨",fr:"20 000+ chaînes, 4K, sport & films ✨",en:"20,000+ channels, 4K, sport & films ✨"},
  {sv:"Aktivering på 5 minuter ⚡",fr:"Activation en 5 minutes ⚡",en:"Activation in 5 minutes ⚡"},
];

function getLang():string{
  if(typeof window==="undefined")return"fr";
  const h=document.querySelector(".langBtn.active, button[class*=langBtn][style*=border]");
  return"fr";
}

function waLink(ref:string):string{
  const msgs:Record<string,string>={
    "essai-gratuit":"Bonjour Moa 👋 Je veux tester gratuitement Sverige TV pendant 24h",
    "voir-offres":"Bonjour Moa 👋 Je voudrais voir les offres et tarifs",
    "parler-moa":"Bonjour Moa 👋 J'ai besoin d'aide pour choisir",
    "paket-1":"Bonjour Moa 👋 Je suis intéressé par le forfait Basique",
    "paket-2":"Bonjour Moa 👋 Je suis intéressé par le forfait Standard",
    "paket-3":"Bonjour Moa 👋 Je suis intéressé par le forfait Premium",
    "firestick":"Bonjour Moa 👋 Je veux installer sur Firestick",
    "samsung":"Bonjour Moa 👋 Je veux installer sur Samsung Smart TV",
    "android":"Bonjour Moa 👋 Je veux installer sur Android",
    "iphone":"Bonjour Moa 👋 Je veux installer sur iPhone",
    "lg":"Bonjour Moa 👋 Je veux installer sur LG Smart TV",
    "tivimate":"Bonjour Moa 👋 Je veux utiliser TiviMate",
    "sport":"Bonjour Moa 👋 Je m'intéresse aux chaînes sport",
    "arabiska":"Bonjour Moa 👋 Je m'intéresse aux chaînes arabes",
    "svenska":"Bonjour Moa 👋 Je m'intéresse aux chaînes suédoises",
    "utomlands":"Bonjour Moa 👋 Je veux regarder la TV suédoise à l'étranger",
    "faq":"Bonjour Moa 👋 J'ai une question sur le service",
    "default":"Bonjour Moa 👋 Je suis intéressé par Sverige TV",
  };
  const msg=msgs[ref]||msgs.default;
  return`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
}

export default function MoaSystem(){
  const[msgIdx,setMsgIdx]=useState(0);
  const[isTyping,setIsTyping]=useState(false);
  const[visible,setVisible]=useState(true);
  const[pulse,setPulse]=useState(false);

  // Rotate Moa messages every 8 seconds
  useEffect(()=>{
    const interval=setInterval(()=>{
      setIsTyping(true);
      setTimeout(()=>{
        setMsgIdx(i=>(i+1)%MESSAGES.length);
        setIsTyping(false);
      },1500);
    },8000);
    return()=>clearInterval(interval);
  },[]);

  // Pulse every 12 seconds to attract attention
  useEffect(()=>{
    const interval=setInterval(()=>{
      setPulse(true);
      setTimeout(()=>setPulse(false),600);
    },12000);
    return()=>clearInterval(interval);
  },[]);

  // Track all CTA clicks and redirect to WhatsApp
  useEffect(()=>{
    const handler=(e:MouseEvent)=>{
      const target=e.target as HTMLElement;
      const el=target.closest("button,a,[data-wa]") as HTMLElement|null;
      if(!el)return;

      const text=(el.textContent||"").trim().toLowerCase();
      const href=(el as HTMLAnchorElement).href||"";
      const dataWa=el.getAttribute("data-wa")||"";

      // Skip if already a WhatsApp link
      if(href.includes("wa.me"))return;
      // Skip nav/language buttons
      if(el.classList.contains("langBtn"))return;
      if(href.startsWith("http")&&!href.includes(window.location.hostname))return;

      let ref="default";
      if(dataWa)ref=dataWa;
      else if(text.includes("essai")||text.includes("gratuit")||text.includes("testa gratis")||text.includes("trial"))ref="essai-gratuit";
      else if(text.includes("offre")||text.includes("paket")||text.includes("pricing")||text.includes("plan"))ref="voir-offres";
      else if(text.includes("moa")||text.includes("support")||text.includes("chat"))ref="parler-moa";
      else if(text.includes("firestick")||href.includes("firestick"))ref="firestick";
      else if(text.includes("samsung")||href.includes("samsung"))ref="samsung";
      else if(text.includes("android")||href.includes("android"))ref="android";
      else if(text.includes("iphone")||href.includes("iphone"))ref="iphone";
      else if(text.includes("lg ")||href.includes("lg-smart"))ref="lg";
      else if(text.includes("tivimate")||href.includes("tivimate"))ref="tivimate";
      else if(text.includes("sport")||href.includes("sport"))ref="sport";
      else if(text.includes("arab")||href.includes("arab"))ref="arabiska";
      else if(text.includes("svens")||href.includes("svenska"))ref="svenska";
      else if(text.includes("utomlands")||href.includes("utomlands"))ref="utomlands";
      else if(text.includes("faq")||href.includes("faq"))ref="faq";
      else if(text.includes("installation")||href.includes("installation"))ref="voir-offres";
      else return; // don't intercept random links

      e.preventDefault();
      e.stopPropagation();
      window.open(waLink(ref),"_blank","noopener");
    };
    document.addEventListener("click",handler,true);
    return()=>document.removeEventListener("click",handler,true);
  },[]);

  const msg=MESSAGES[msgIdx];
  const display=msg.fr;

  return(
    <div style={{position:"fixed",bottom:24,left:20,zIndex:9999,display:"flex",flexDirection:"column",alignItems:"flex-start",gap:8,maxWidth:"calc(100vw - 40px)"}}>
      {/* Message bubble */}
      {visible&&(
        <div style={{
          background:"#1a1a1f",
          border:"1px solid #2a2a2f",
          borderRadius:"16px 16px 16px 4px",
          padding:"10px 14px",
          maxWidth:260,
          boxShadow:"0 8px 32px rgba(0,0,0,0.6)",
          animation:"moaFadeIn 0.3s ease",
        }}>
          {isTyping?(
            <div style={{display:"flex",gap:4,alignItems:"center",padding:"4px 0"}}>
              {[0,1,2].map(i=>(
                <div key={i} style={{
                  width:6,height:6,borderRadius:"50%",background:"#c8a96e",
                  animation:`moaDot 1.2s ${i*0.2}s infinite`,
                }}/>
              ))}
            </div>
          ):(
            <p style={{margin:0,fontSize:13,color:"#e5e5e8",lineHeight:1.5}}>{display}</p>
          )}
        </div>
      )}

      {/* Moa avatar button */}
      <a
        href={waLink("parler-moa")}
        target="_blank"
        rel="noopener"
        onClick={()=>{}}
        style={{
          display:"flex",
          alignItems:"center",
          gap:10,
          background:"#1a1a1f",
          border:`2px solid ${pulse?"#c8a96e":"#2a2a2f"}`,
          borderRadius:50,
          padding:"8px 16px 8px 8px",
          cursor:"pointer",
          textDecoration:"none",
          boxShadow:pulse?"0 0 20px rgba(200,169,110,0.4)":"0 4px 16px rgba(0,0,0,0.5)",
          transition:"all 0.3s ease",
        }}
      >
        <div style={{position:"relative"}}>
          <img
            src={MOA}
            alt="Moa"
            style={{
              width:40,height:40,borderRadius:"50%",
              objectFit:"cover",
              border:"2px solid #c8a96e",
            }}
          />
          {/* Green online dot */}
          <div style={{
            position:"absolute",
            bottom:0,right:0,
            width:11,height:11,
            background:"#22c55e",
            borderRadius:"50%",
            border:"2px solid #1a1a1f",
          }}/>
        </div>
        <div>
          <div style={{color:"#f0eff0",fontWeight:700,fontSize:14,lineHeight:1.2}}>Moa</div>
          <div style={{color:"#22c55e",fontSize:11,fontWeight:600}}>● En ligne</div>
        </div>
        <div style={{
          background:"#22c55e",
          borderRadius:"50%",
          width:22,height:22,
          display:"flex",alignItems:"center",justifyContent:"center",
          marginLeft:4,
          fontSize:12,
        }}>💬</div>
      </a>

      <style>{`
        @keyframes moaFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes moaDot{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}
        @media(max-width:768px){
          .miliTeaser{display:none!important}
          .miliFab{display:none!important}
        }
      `}</style>
    </div>
  );
}
