// components/shared/types.ts
// All shared TypeScript types for Sverige TV

export type Locale = "sv" | "en" | "fr";
export type PlanKey = "p1" | "p3" | "p6" | "p12";
export type Msg = { from: "bot" | "user"; text: string };

export type Plan = {
  key: PlanKey;
  price: number;
  months: number;
  currency: "SEK";
  highlight?: boolean;
  priceValidUntil: string;
};

export type FAQItem = { q: string; a: string };
export type ReviewItem = { name: string; city: string; stars: number; text: string; plan: string };

export type Copy = {
  brand: string;
  top: { status: string; urgency: string };
  nav: {
    offers: string; channels: string; faq: string; setup: string;
    whatsapp: string; install: string; cities: string; devices: string;
  };
  hero: {
    pill: string; titleA: string; titleB: string; lead: string;
    ctaPrices: string; ctaAdvisor: string; trust: string;
  };
  trial: { badge: string; title: string; sub: string; cta: string; note: string };
  offers: {
    title: string; sub: string; order: string; billedOnce: string;
    perMonth: string; save: string; bestSeller: string; totalLabel: string;
  };
  planNames: Record<PlanKey, string>;
  planPerks: Record<PlanKey, string[]>;
  channels: { title: string; sub: string; more: string };
  devices: { title: string; sub: string; list: { name: string; icon: string }[] };
  vod: { title: string; sub: string; stats: { value: string; label: string }[] };
  compare: {
    title: string; sub: string; headers: string[];
    rows: { service: string; price: string; live: string; vod: boolean; hd4k: boolean; support: string; highlight?: boolean }[];
  };
  reviews: { title: string; sub: string; items: ReviewItem[] };
  trust: { title: string; items: { icon: string; title: string; desc: string }[] };
  faq: { title: string; items: FAQItem[] };
  cities: { title: string; sub: string; button: string; items: { name: string; text: string }[] };
  setup: { title: string; sub: string; button: string; steps: { step: string; text: string }[] };
  footer: { rights: string; note: string; legal: string; privacy: string; terms: string; refund: string };
  whatsapp: {
    generic: string; trial: string;
    orderMessage: (p: string, pr: number, c: string) => string;
  };
  bot: {
    greeting1: string; greeting2: string;
    price1: string; price2: string;
    install1: string; install2: string;
    trial1: string; trial2: string;
    default1: string; default2: string;
    quick: string[];
  };
};

export type CountryChannel = { n: string; c: string };
export type Country = {
  slug: string;
  flag: string;
  name: string;
  sub: string;
  desc: string;
  wa: string;
  keywords: [string, string][];
  channels: CountryChannel[];
};

export type LangCtx = { lang: Locale; setLang: (l: Locale) => void };
