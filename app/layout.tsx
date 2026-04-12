import type{Metadata,Viewport}from"next";
import{Geist,Geist_Mono}from"next/font/google";
import{ThemeProvider}from"next-themes";
import"./globals.css";

const geistSans=Geist({variable:"--font-geist-sans",subsets:["latin"]});
const geistMono=Geist_Mono({variable:"--font-geist-mono",subsets:["latin"]});

export const viewport:Viewport={width:"device-width",initialScale:1,maximumScale:1,userScalable:false,viewportFit:"cover",themeColor:"#060407"};

export const metadata:Metadata={
  title:"Sverige TV — 20 000+ kanaler, 4K, Sport & Film",
  description:"Sveriges lagliga IPTV-tjänst. 20 000+ live-kanaler, 4K/UHD, sport, filmer och serier. Från 83 kr/mån. Testa gratis 24h.",
  manifest:"/manifest.json",
  appleWebApp:{capable:true,statusBarStyle:"black-translucent",title:"Sverige TV"},
  formatDetection:{telephone:false},
  icons:{icon:"/icon.svg"},
};

const footerLinks=[
  {heading:"Laglig IPTV",links:[
    {label:"Är IPTV lagligt?",href:"/ar-iptv-lagligt"},
    {label:"IPTV-lagen juli 2026",href:"/iptv-lag-2026"},
    {label:"Jämför tjänster",href:"/jamfor"},
    {label:"Om oss",href:"/om-oss"},
  ]},
  {heading:"Installation",links:[
    {label:"Alla enheter",href:"/installation"},
    {label:"Firestick",href:"/installation/firestick"},
    {label:"Samsung Smart TV",href:"/installation/samsung-smart-tv"},
    {label:"TiviMate",href:"/installation/tivimate"},
    {label:"Android",href:"/installation/android"},
    {label:"iPhone",href:"/installation/iphone"},
    {label:"LG Smart TV",href:"/installation/lg-smart-tv"},
  ]},
  {heading:"Kanaler",links:[
    {label:"Alla kanaler",href:"/kanaler"},
    {label:"Svenska kanaler",href:"/kanaler/svenska"},
    {label:"Sport kanaler",href:"/kanaler/sport"},
    {label:"Arabiska kanaler",href:"/kanaler/arabiska"},
    {label:"Svensk TV utomlands",href:"/svensk-tv-utomlands"},
  ]},
  {heading:"Info",links:[
    {label:"Integritetspolicy",href:"/integritetspolicy"},
    {label:"Användarvillkor",href:"/anvandarvillkor"},
  ]},
];

export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
  return(
    <html lang="sv" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
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
