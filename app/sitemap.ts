import type {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://premiumiptv.se";
  const now = new Date();
  const pages = [
    // Homepage
    {url: "/", priority: 1.0, changeFrequency: "weekly"},
    
    // Existing legal/info pages
    {url: "/ar-iptv-lagligt", priority: 0.9, changeFrequency: "monthly"},
    {url: "/iptv-lag-2026", priority: 0.9, changeFrequency: "monthly"},
    {url: "/svensk-tv-utomlands", priority: 0.9, changeFrequency: "monthly"},
    {url: "/jamfor", priority: 0.8, changeFrequency: "monthly"},
    {url: "/om-oss", priority: 0.6, changeFrequency: "yearly"},
    {url: "/integritetspolicy", priority: 0.3, changeFrequency: "yearly"},
    {url: "/anvandarvillkor", priority: 0.3, changeFrequency: "yearly"},
    
    // Existing installation pages
    {url: "/installation", priority: 0.8, changeFrequency: "monthly"},
    {url: "/installation/firestick", priority: 0.8, changeFrequency: "monthly"},
    {url: "/installation/samsung-smart-tv", priority: 0.8, changeFrequency: "monthly"},
    {url: "/installation/tivimate", priority: 0.8, changeFrequency: "monthly"},
    {url: "/installation/android", priority: 0.7, changeFrequency: "monthly"},
    {url: "/installation/iphone", priority: 0.7, changeFrequency: "monthly"},
    {url: "/installation/lg-smart-tv", priority: 0.7, changeFrequency: "monthly"},
    
    // Existing channel pages
    {url: "/kanaler", priority: 0.8, changeFrequency: "monthly"},
    {url: "/kanaler/arabiska", priority: 0.8, changeFrequency: "monthly"},
    {url: "/kanaler/sport", priority: 0.8, changeFrequency: "monthly"},
    {url: "/kanaler/svenska", priority: 0.7, changeFrequency: "monthly"},
    
    // Existing diaspora & topic pages
    {url: "/iptv-sverige-arabisk", priority: 0.9, changeFrequency: "weekly"},
    {url: "/iptv-sverige-smart-tv", priority: 0.8, changeFrequency: "monthly"},
    {url: "/iptv-sverige-sport", priority: 0.8, changeFrequency: "weekly"},
    {url: "/iptv-sverige-4k", priority: 0.7, changeFrequency: "monthly"},
    {url: "/iptv-abonnemang-sverige", priority: 0.9, changeFrequency: "weekly"},
    
    // NEW diaspora pages
    {url: "/iptv-sverige-kurdisk", priority: 0.9, changeFrequency: "weekly"},
    {url: "/iptv-sverige-persisk", priority: 0.9, changeFrequency: "weekly"},
    {url: "/iptv-sverige-somalisk", priority: 0.9, changeFrequency: "weekly"},
    {url: "/iptv-sverige-turkisk", priority: 0.9, changeFrequency: "weekly"},
    
    // NEW city pages
    {url: "/iptv-stockholm", priority: 0.85, changeFrequency: "weekly"},
    {url: "/iptv-goteborg", priority: 0.85, changeFrequency: "weekly"},
    {url: "/iptv-malmo", priority: 0.85, changeFrequency: "weekly"},
    {url: "/iptv-uppsala", priority: 0.8, changeFrequency: "weekly"},
    {url: "/iptv-vasteras", priority: 0.8, changeFrequency: "weekly"},
    
    // NEW blog
    {url: "/blogg", priority: 0.8, changeFrequency: "daily"},
    {url: "/blogg/basta-iptv-sverige-2026", priority: 0.7, changeFrequency: "monthly"},
    {url: "/blogg/iptv-vs-viaplay-vilken-ar-bast", priority: 0.7, changeFrequency: "monthly"},
    {url: "/blogg/iptv-pa-smart-tv-installation", priority: 0.7, changeFrequency: "monthly"},
  ] as const;
  
  return pages.map(p => ({
    url: base + p.url,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
