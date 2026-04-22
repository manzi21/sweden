import type{Metadata,Viewport}from"next";
import{Geist,Geist_Mono}from"next/font/google";
import{ThemeProvider}from"next-themes";
import MoaSystem from"./components/MoaSystem";
import"./globals.css";

const geistSans=Geist({variable:"--font-geist-sans",subsets:["latin"]});
const geistMono=Geist_Mono({variable:"--font-geist-mono",subsets:["latin"]});

export const viewport:Viewport={
  width:"device-width",initialScale:1,maximumScale:5,userScalable:true,viewportFit:"cover",themeColor:"#060407",
};
export const metadata:Metadata={
  title:"Sverige TV — 20 000+ kanaler, 4K, Sport & Film",
  description:"Sveriges lagliga IPTV-tjänst. 20 000+ live-kanaler, 4K/UHD, sport, filmer och serier. Från 83 kr/mån. Testa gratis 24h.",
  manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"Sverige TV"},
  formatDetection:{telephone:false},
  metadataBase:new URL("https://premiumiptv.se"),icons:{icon:[{url:"/icon.svg",type:"image/svg+xml"},{url:"/logo.svg",sizes:"512x512",type:"image/svg+xml"}],apple:"/logo.svg",shortcut:"/logo.svg"},openGraph:{type:"website",siteName:"Sverige TV",locale:"sv_SE",url:"https://premiumiptv.se",title:"Sverige TV — Premium IPTV Sverige",description:"20 000+ kanaler · 4K · Sport · Film — 83 kr/mån",images:[{url:"/og-image.svg",width:1200,height:630,alt:"Sverige TV"}]},twitter:{card:"summary_large_image",title:"Sverige TV",description:"Premium IPTV · 20 000+ kanaler",images:["/og-image.svg"]},alternates:{canonical:"https://premiumiptv.se"},robots:{index:true,follow:true},
};

const MOA_IMG="data:image/jpeg;base64,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";

const CSS=`
*,*::before,*::after{box-sizing:border-box}
html{overflow-x:hidden!important;max-width:100%!important;overscroll-behavior-x:none!important;-webkit-text-size-adjust:100%!important;}
body{overflow-x:hidden!important;max-width:100%!important;overscroll-behavior-x:none!important;position:relative!important;min-height:100dvh!important;}
.ue-sidebar-container{display:none!important;width:0!important;height:0!important;overflow:hidden!important;visibility:hidden!important;pointer-events:none!important;left:-9999px!important;clip:rect(0,0,0,0)!important;}
img.miliTeaserAvatar{content:url("MOA_PH");border-radius:50%;object-fit:cover;width:22px!important;height:22px!important;}
img.fabAvatar{content:url("MOA_PH");border-radius:50%;object-fit:cover;width:35px!important;height:35px!important;}
@media(max-width:768px){
  nav{max-width:100%!important;padding-left:16px!important;padding-right:16px!important;}
  header{width:100%!important;contain:layout paint!important;}
  section,.section{width:100%!important;max-width:100vw!important;overflow:hidden!important;padding-left:max(16px,env(safe-area-inset-left,16px))!important;padding-right:max(16px,env(safe-area-inset-right,16px))!important;}
  .hero{width:100%!important;max-width:100vw!important;overflow:hidden!important;padding-left:max(16px,env(safe-area-inset-left,16px))!important;padding-right:max(16px,env(safe-area-inset-right,16px))!important;}
  .hero h1{font-size:clamp(1.6rem,8vw,2.5rem)!important;line-height:1.15!important;}
  .hero h2,.hero p{word-break:normal!important;overflow-wrap:break-word!important;}
  [class*="card"],[class*="Card"]{width:100%!important;max-width:100%!important;min-width:0!important;}
  [class*="grid"],[class*="plans"]{grid-template-columns:1fr!important;}
  .liveBadge{right:16px!important;left:auto!important;}
  .miliTeaser,.miliFab{display:none!important;}
  img,video{max-width:100%!important;height:auto!important;}
  button,[role="button"]{min-height:44px!important;touch-action:manipulation!important;}
  .mobileLangSwitch{display:flex!important;gap:8px!important;padding:16px 0 100px!important;}
  .mobileLangSwitch button{display:inline-flex!important;min-height:48px!important;min-width:52px!important;pointer-events:all!important;}
  .mobileMenu{padding-bottom:120px!important;overflow-y:auto!important;}
  [class*="dropdown"],[class*="Dropdown"],[class*="select"],[class*="Select"],[class*="menu"],[class*="popup"]{word-break:normal!important;white-space:normal!important;overflow-wrap:normal!important;}
}
`;

const footerLinks=[
  {heading:"Laglig IPTV",links:[{label:"Är IPTV lagligt?",href:"/ar-iptv-lagligt"},{label:"IPTV-lagen juli 2026",href:"/iptv-lag-2026"},{label:"Jämför tjänster",href:"/jamfor"},{label:"Om oss",href:"/om-oss"}]},
  {heading:"Installation",links:[{label:"Alla enheter",href:"/installation"},{label:"Firestick",href:"/installation/firestick"},{label:"Samsung Smart TV",href:"/installation/samsung-smart-tv"},{label:"TiviMate",href:"/installation/tivimate"},{label:"Android",href:"/installation/android"},{label:"iPhone",href:"/installation/iphone"},{label:"LG Smart TV",href:"/installation/lg-smart-tv"}]},
  {heading:"Kanaler",links:[{label:"Alla kanaler",href:"/kanaler"},{label:"Svenska kanaler",href:"/kanaler/svenska"},{label:"Sport kanaler",href:"/kanaler/sport"},{label:"Arabiska kanaler",href:"/kanaler/arabiska"},{label:"Svensk TV utomlands",href:"/svensk-tv-utomlands"}]},
  {heading:"Info",links:[{label:"Integritetspolicy",href:"/integritetspolicy"},{label:"Användarvillkor",href:"/anvandarvillkor"}]},
];

export default function RootLayout(<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://premiumiptv.se/#organization","name":"Sverige TV","alternateName":"Premium IPTV Sverige","url":"https://premiumiptv.se","logo":{"@type":"ImageObject","url":"https://premiumiptv.se/logo.svg","width":512,"height":512},"image":"https://premiumiptv.se/og-image.svg","description":"Premium IPTV Sverige med 20 000+ kanaler, 4K, sport, film","areaServed":{"@type":"Country","name":"Sweden"},"contactPoint":[{"@type":"ContactPoint","telephone":"+447307410512","contactType":"customer service","areaServed":["SE","EU"],"availableLanguage":["Swedish","English","Arabic","Kurdish","Persian","Somali","Turkish"]}],"slogan":"20 000+ kanaler · 4K · Snabb. Stabil. Enkel."},{"@type":"WebSite","@id":"https://premiumiptv.se/#website","url":"https://premiumiptv.se","name":"Sverige TV","publisher":{"@id":"https://premiumiptv.se/#organization"},"inLanguage":"sv-SE"}]})}}/>{children}:Readonly<{children:React.ReactNode}>){
  const css=CSS.replace(/MOA_PH/g,MOA_IMG);
  return(
    <html lang="sv" suppressHydrationWarning>
      <head><style dangerouslySetInnerHTML={{__html:css}}/></head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <MoaSystem/>
          <footer style={{background:"#060407",borderTop:"1px solid #1a1a1a",padding:"48px 20px 32px",marginTop:64}}>
            <div style={{maxWidth:1100,margin:"0 auto"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:32,marginBottom:40}}>
                {footerLinks.map(section=>(
                  <div key={section.heading}>
                    <h3 style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"#c8a96e",marginBottom:14}}>{section.heading}</h3>
                    <ul style={{listStyle:"none",padding:0,margin:0}}>
                      {section.links.map(link=>(
                        <li key={link.href} style={{marginBottom:8}}>
                          <a href={link.href} style={{color:"#7a7a86",textDecoration:"none",fontSize:14,lineHeight:1.5}}>{link.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div style={{borderTop:"1px solid #1a1a1a",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                <span style={{color:"#4a4a56",fontSize:13}}>© 2026 Sverige TV — Laglig IPTV-tjänst</span>
                <a href="https://wa.me/447307410512" target="_blank" rel="noreferrer" style={{color:"#22c55e",textDecoration:"none",fontSize:13,fontWeight:700}}>💬 WhatsApp-support</a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
    }
