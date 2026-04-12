import type{MetadataRoute}from"next";
export default function sitemap():MetadataRoute.Sitemap{
  const base="https://premiumiptv.se";
  const now=new Date();
  const pages=[
    {url:"/",priority:1.0,changeFrequency:"weekly"},
    {url:"/ar-iptv-lagligt",priority:0.9,changeFrequency:"monthly"},
    {url:"/iptv-lag-2026",priority:0.9,changeFrequency:"monthly"},
    {url:"/svensk-tv-utomlands",priority:0.9,changeFrequency:"monthly"},
    {url:"/jamfor",priority:0.8,changeFrequency:"monthly"},
    {url:"/installation",priority:0.8,changeFrequency:"monthly"},
    {url:"/installation/firestick",priority:0.8,changeFrequency:"monthly"},
    {url:"/installation/samsung-smart-tv",priority:0.8,changeFrequency:"monthly"},
    {url:"/installation/tivimate",priority:0.8,changeFrequency:"monthly"},
    {url:"/installation/android",priority:0.7,changeFrequency:"monthly"},
    {url:"/installation/iphone",priority:0.7,changeFrequency:"monthly"},
    {url:"/installation/lg-smart-tv",priority:0.7,changeFrequency:"monthly"},
    {url:"/kanaler",priority:0.8,changeFrequency:"monthly"},
    {url:"/kanaler/arabiska",priority:0.8,changeFrequency:"monthly"},
    {url:"/kanaler/sport",priority:0.8,changeFrequency:"monthly"},
    {url:"/kanaler/svenska",priority:0.7,changeFrequency:"monthly"},
    {url:"/om-oss",priority:0.6,changeFrequency:"yearly"},
    {url:"/integritetspolicy",priority:0.3,changeFrequency:"yearly"},
    {url:"/anvandarvillkor",priority:0.3,changeFrequency:"yearly"},
  ] as const;
  return pages.map(p=>({
    url:base+p.url,
    lastModified:now,
    changeFrequency:p.changeFrequency,
    priority:p.priority,
  }));
}
