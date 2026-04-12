import type{MetadataRoute}from"next";
export default function robots():MetadataRoute.Robots{
  return{
    rules:{userAgent:"*",allow:"/",disallow:["/api/"]},
    sitemap:"https://premiumiptv.se/sitemap.xml",
    host:"https://premiumiptv.se",
  };
}
