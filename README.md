# Sverige TV — premiumiptv.se

Marketing site for **Sverige TV**, a premium IPTV service for Sweden and the Nordic diaspora worldwide.

- **Stack**: Next.js 16 (App Router), React 19, Tailwind 4, TypeScript
- **Deployed on**: Vercel — https://premiumiptv.se
- **Markets**: Sweden + Nordic expats in 50+ countries
- **Locales**: Swedish (default), English, French

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build & lint

```bash
npm run build
npm run lint
```

## Project layout

| Path | Purpose |
|---|---|
| `app/page.tsx` | Single-page site (hero, plans, channels, countries, FAQ, etc.) |
| `app/layout.tsx` | Metadata (title, description, OG, JSON-LD wiring) |
| `app/sitemap.ts` | Sitemap generation |
| `app/robots.ts` | robots.txt rules |
| `next.config.ts` | CSP + security headers |
| `public/` | Static assets (icons, og-image, support photo) |

## SEO

All structured data (Product, FAQPage, Organization, WebSite, BreadcrumbList,
LocalBusiness) is server-rendered as JSON-LD inside `app/page.tsx`. Hreflang
alternates (sv/en/fr/x-default) are set in `app/layout.tsx`.
