"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Locale = "sv" | "en" | "fr";
type PlanKey = "p1" | "p3" | "p6" | "p12";
type Msg = { from: "bot" | "user"; text: string };
type Plan = { key: PlanKey; price: number; months: number; currency: "SEK"; highlight?: boolean; priceValidUntil: string };
type FAQItem = { q: string; a: string };
type ReviewItem = { name: string; city: string; stars: number; text: string; plan: string };

type Copy = {
  brand: string;
  top: { status: string; urgency: string };
  nav: { offers: string; channels: string; faq: string; setup: string; whatsapp: string; install: string; cities: string; devices: string };
  hero: { pill: string; titleA: string; titleB: string; lead: string; ctaPrices: string; ctaAdvisor: string; trust: string };
  trial: { badge: string; title: string; sub: string; cta: string; note: string };
  offers: { title: string; sub: string; order: string; billedOnce: string; perMonth: string; save: string; bestSeller: string; totalLabel: string };
  planNames: Record<PlanKey, string>;
  planPerks: Record<PlanKey, string[]>;
  channels: { title: string; sub: string; more: string };
  devices: { title: string; sub: string; list: { name: string; icon: string }[] };
  vod: { title: string; sub: string; stats: { value: string; label: string }[] };
  compare: { title: string; sub: string; headers: string[]; rows: { service: string; price: string; live: string; vod: boolean; hd4k: boolean; support: string; highlight?: boolean }[] };
  reviews: { title: string; sub: string; items: ReviewItem[] };
  trust: { title: string; items: { icon: string; title: string; desc: string }[] };
  faq: { title: string; items: FAQItem[] };
  cities: { title: string; sub: string; button: string; items: { name: string; text: string }[] };
  setup: { title: string; sub: string; button: string; steps: { step: string; text: string }[] };
  footer: { rights: string; note: string; legal: string; privacy: string; terms: string; refund: string };
  whatsapp: { generic: string; trial: string; orderMessage: (p: string, pr: number, c: string) => string };
  bot: { greeting1: string; greeting2: string; price1: string; price2: string; install1: string; install2: string; trial1: string; trial2: string; default1: string; default2: string; quick: string[] };
};

const SITE = { domain: "https://sverigetv.se", brand: "Sverige TV", whatsappPhone: "447307410512", currencyLabel: "kr" } as const;

const plans: Plan[] = [
  { key: "p1", price: 120, months: 1, currency: "SEK", priceValidUntil: "2027-12-31" },
  { key: "p3", price: 250, months: 3, currency: "SEK", highlight: true, priceValidUntil: "2027-12-31" },
  { key: "p6", price: 350, months: 6, currency: "SEK", priceValidUntil: "2027-12-31" },
  { key: "p12", price: 600, months: 12, currency: "SEK", priceValidUntil: "2027-12-31" },
];

const channelPreview = [
  { country: "Sverige", channels: ["SVT 1 HD", "SVT 2 HD", "TV4 HD", "Kanal 5 HD", "TV3 HD", "C More Sport", "Viasat Premier", "TV4 Sport", "SVT Play Live", "Kanal 9"] },
  { country: "Norden", channels: ["NRK 1 (Norge)", "NRK Sport", "DR1 (Danmark)", "Yle TV1 (Finland)", "TV 2 Norge", "TV2 Danmark", "MTV Finland", "SVT World"] },
  { country: "Sport & Film", channels: ["Sky Sports HD", "beIN Sports 4K", "ESPN HD", "Eurosport 4K", "Canal+ 4K", "HBO Max", "Discovery+", "Nat Geo Wild"] },
  { country: "International", channels: ["BBC One HD", "TF1 France", "NBC USA", "Al Jazeera", "DW News", "CNBC", "CNN International", "Disney Channel"] },
] as const;

const DEVICE_LIST = [
  { name: "Smart TV", icon: "📺" },
  { name: "Firestick / Fire TV", icon: "🔥" },
  { name: "iPhone & iPad", icon: "📱" },
  { name: "Android", icon: "🤖" },
  { name: "PC & Mac", icon: "💻" },
  { name: "Android TV Box", icon: "📦" },
  { name: "MAG Box", icon: "📡" },
];

// ─── COUNTRIES DATA (from code 2) ─────────────────────────────────────────────

type CountryChannel = { n: string; c: string };
type Country = {
  slug: string;
  flag: string;
  name: string;
  sub: string;
  desc: string;
  wa: string;
  keywords: [string, string][];
  channels: CountryChannel[];
};

const COUNTRIES: Country[] = [
  { slug:"arabisk",flag:"🇸🇦",name:"عربي",sub:"MBC, Al Jazeera, beIN Sports",desc:"Fullständigt arabiskt kanalpaket — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.",wa:"Hej! Jag vill ha arabiska kanaler i Sverige.",keywords:[["arabisk IPTV Sverige","1 200/mån"],["MBC Sverige","890/mån"],["beIN Sports Sverige","720/mån"],["arabiska kanaler","650/mån"]],channels:[{n:"MBC 1",c:"🎬"},{n:"MBC 2",c:"🎬"},{n:"MBC Drama",c:"📺"},{n:"MBC Action",c:"💥"},{n:"Al Jazeera",c:"📰"},{n:"Al Arabiya",c:"📰"},{n:"beIN Sports 1 4K",c:"⚽"},{n:"beIN Sports 2",c:"⚽"},{n:"beIN Sports 3",c:"⚽"},{n:"OSN Sports",c:"⚽"},{n:"Rotana Cinema",c:"🎬"},{n:"Rotana Drama",c:"📺"},{n:"Dubai TV",c:"🎬"},{n:"Abu Dhabi TV",c:"📰"},{n:"Saudi 1",c:"🎬"},{n:"LBC Lebanon",c:"🎬"},{n:"BBC Arabic",c:"📰"},{n:"France 24 عربي",c:"📰"},{n:"Nile Drama",c:"📺"},{n:"MTV Lebanon",c:"🎵"}]},
  { slug:"turkisk",flag:"🇹🇷",name:"Türkçe",sub:"TRT, Show TV, Kanal D",desc:"Alla turkiska favoritkanaler — TRT, Show TV, Kanal D, diziler och sport.",wa:"Hej! Jag vill ha turkiska kanaler i Sverige.",keywords:[["turkisk IPTV Sverige","980/mån"],["turkiska kanaler","740/mån"],["TRT Sverige","520/mån"],["türk dizi Sverige","480/mån"]],channels:[{n:"TRT 1",c:"🎬"},{n:"TRT Haber",c:"📰"},{n:"TRT Spor",c:"⚽"},{n:"Show TV",c:"🎬"},{n:"Kanal D",c:"🎬"},{n:"Star TV",c:"🎬"},{n:"ATV",c:"🎬"},{n:"FOX Türkiye",c:"🎬"},{n:"Habertürk",c:"📰"},{n:"CNN Türk",c:"📰"},{n:"beIN Sports TR",c:"⚽"},{n:"A Spor",c:"⚽"},{n:"TV8",c:"🎬"},{n:"Teve 2",c:"🎬"},{n:"TRT 2",c:"🎭"}]},
  { slug:"exyu",flag:"🇧🇦",name:"ExYu",sub:"Pink, RTS, HRT, Arena Sport",desc:"Bosniska, serbiska, kroatiska kanaler — sport, serier, nyheter.",wa:"Hej! Jag vill ha ExYu kanaler i Sverige.",keywords:[["exyu IPTV Sverige","560/mån"],["balkanska kanaler","430/mån"],["Pink TV Sverige","380/mån"],["Arena Sport Sverige","290/mån"]],channels:[{n:"Pink 1",c:"🎬"},{n:"Pink 2",c:"🎬"},{n:"RTS 1 Srbija",c:"🎬"},{n:"HRT 1 Hrvatska",c:"🎬"},{n:"FTV BiH",c:"🎬"},{n:"BHT1",c:"📰"},{n:"Arena Sport 1 HD",c:"⚽"},{n:"Arena Sport 2 HD",c:"⚽"},{n:"Prva TV",c:"🎬"},{n:"Nova S Srbija",c:"🎬"},{n:"Hayat TV",c:"🎬"},{n:"N1 Balkan",c:"📰"}]},
  { slug:"somalisk",flag:"🇸🇴",name:"Somali",sub:"Universal TV, Horn Cable",desc:"Somaliska kanaler — Universal TV, Horn Cable TV, SBC.",wa:"Hej! Jag vill ha somaliska kanaler i Sverige.",keywords:[["somalisk IPTV Sverige","340/mån"],["Universal TV Sverige","280/mån"],["somaliska kanaler","210/mån"]],channels:[{n:"Universal TV",c:"🎬"},{n:"Horn Cable TV",c:"📰"},{n:"SBC Somalia",c:"🎬"},{n:"Goobjoog TV",c:"📰"},{n:"Mustaqbal TV",c:"🎬"},{n:"VOA Somali",c:"📰"},{n:"BBC Somali",c:"📰"}]},
  { slug:"persisk",flag:"🇮🇷",name:"فارسی",sub:"Manoto, GEM TV, VOA Persian",desc:"Iranska kanaler — Manoto, GEM TV, Iran International.",wa:"Hej! Jag vill ha persiska kanaler i Sverige.",keywords:[["persisk IPTV Sverige","420/mån"],["Manoto Sverige","350/mån"],["GEM TV Sverige","290/mån"]],channels:[{n:"Manoto TV",c:"🎬"},{n:"GEM TV",c:"🎬"},{n:"VOA Persian",c:"📰"},{n:"Iran International",c:"📰"},{n:"BBC Persian",c:"📰"},{n:"Farsi1",c:"🎬"},{n:"Varzesh TV",c:"⚽"}]},
  { slug:"kurdisk",flag:"🏳️",name:"Kurdî",sub:"Rudaw, Kurdistan 24, NRT",desc:"Kurdiska TV-kanaler — Rudaw, Kurdistan 24, NRT, K24.",wa:"Hej! Jag vill ha kurdiska kanaler i Sverige.",keywords:[["kurdisk IPTV Sverige","380/mån"],["Rudaw Sverige","290/mån"],["Kurdistan 24","240/mån"]],channels:[{n:"Rudaw",c:"📰"},{n:"Kurdistan 24",c:"📰"},{n:"NRT TV",c:"🎬"},{n:"K24",c:"📰"},{n:"KTV Kurdistan",c:"🎬"},{n:"Zagros TV",c:"🎬"}]},
  { slug:"polsk",flag:"🇵🇱",name:"Polski",sub:"TVP, Polsat, TVN, Canal+",desc:"Polska TV-kanaler — TVP, Polsat, TVN, Canal+.",wa:"Hej! Jag vill ha polska kanaler i Sverige.",keywords:[["polska IPTV Sverige","310/mån"],["polska kanaler","260/mån"],["TVP Sverige","200/mån"]],channels:[{n:"TVP 1",c:"🎬"},{n:"TVP 2",c:"🎬"},{n:"TVP Info",c:"📰"},{n:"Polsat",c:"🎬"},{n:"TVN",c:"🎬"},{n:"TVN 24",c:"📰"},{n:"Canal+ Sport PL",c:"⚽"},{n:"TVP Sport",c:"⚽"}]},
  { slug:"finsk",flag:"🇫🇮",name:"Suomi",sub:"Yle, MTV3, Nelonen",desc:"Finska TV-kanaler — Yle, MTV3, Nelonen, Sub.",wa:"Hej! Jag vill ha finska kanaler i Sverige.",keywords:[["finsk IPTV Sverige","280/mån"],["finska kanaler","220/mån"],["Yle Sverige","180/mån"]],channels:[{n:"Yle TV1",c:"🎬"},{n:"Yle TV2",c:"🎬"},{n:"MTV3",c:"🎬"},{n:"Nelonen",c:"🎬"},{n:"Sub",c:"🎬"},{n:"C More Sport FI",c:"⚽"}]},
  { slug:"indisk",flag:"🇮🇳",name:"हिंदी",sub:"Star Plus, Zee TV, Sony",desc:"Indiska kanaler — Star Plus, Zee TV, Sony, Colors och Bollywood.",wa:"Hej! Jag vill ha indiska kanaler i Sverige.",keywords:[["indisk IPTV Sverige","320/mån"],["Star Plus Sverige","280/mån"],["hindi TV Sverige","210/mån"]],channels:[{n:"Star Plus HD",c:"🎬"},{n:"Zee TV HD",c:"🎬"},{n:"Sony Entertainment",c:"🎬"},{n:"Colors TV",c:"🎬"},{n:"Star Sports 1",c:"⚽"},{n:"Aaj Tak",c:"📰"},{n:"Zee Cinema",c:"🎬"},{n:"Star Gold",c:"🎬"}]},
  { slug:"afrikansk",flag:"🌍",name:"Afrique",sub:"Canal+, RTS, TFM, AFROTV",desc:"Afrikanska kanaler — Canal+, RTS Sénégal, TFM, Nollywood.",wa:"Hej! Jag vill ha afrikanska kanaler i Sverige.",keywords:[["afrikansk IPTV Sverige","260/mån"],["Canal+ Africa Sverige","190/mån"],["afrikanska kanaler","170/mån"]],channels:[{n:"Canal+ Afrique",c:"🎬"},{n:"RTS 1 Sénégal",c:"🎬"},{n:"TFM Sénégal",c:"🎬"},{n:"AFROTV",c:"🎬"},{n:"NTA Nigeria",c:"📰"},{n:"Africa 24",c:"📰"},{n:"Nollywood TV",c:"🎬"},{n:"SuperSport Africa",c:"⚽"}]},
  { slug:"kinesisk",flag:"🇨🇳",name:"中文",sub:"CCTV, Phoenix, TVB",desc:"Kinesiska kanaler — CCTV, Phoenix, TVB, mandarin.",wa:"Hej! Jag vill ha kinesiska kanaler i Sverige.",keywords:[["kinesisk IPTV Sverige","240/mån"],["CCTV Sverige","190/mån"],["Phoenix TV Sverige","160/mån"]],channels:[{n:"CCTV 1",c:"🎬"},{n:"CCTV 4 Int",c:"🎬"},{n:"Phoenix InfoNews",c:"📰"},{n:"Phoenix Chinese",c:"🎬"},{n:"TVB Jade",c:"🎬"},{n:"CCTV Sport",c:"⚽"}]},
  { slug:"spansk",flag:"🇪🇸",name:"Español",sub:"TVE, Antena 3, Univision",desc:"Spanska kanaler — TVE, Antena 3, Univision, LaLiga.",wa:"Hej! Jag vill ha spanska kanaler i Sverige.",keywords:[["spansk IPTV Sverige","190/mån"],["TVE Sverige","160/mån"],["Antena 3 Sverige","130/mån"]],channels:[{n:"TVE 1",c:"🎬"},{n:"TVE 2",c:"🎬"},{n:"Antena 3",c:"🎬"},{n:"Telecinco",c:"🎬"},{n:"Univision",c:"🌎"},{n:"Canal+ LaLiga",c:"⚽"},{n:"ESPN Latin",c:"⚽"}]},
  { slug:"grekisk",flag:"🇬🇷",name:"Ελληνικά",sub:"ERT, MEGA, ANT1",desc:"Grekiska kanaler — ERT, MEGA, ANT1, Nova Sports.",wa:"Hej! Jag vill ha grekiska kanaler i Sverige.",keywords:[["grekisk IPTV Sverige","180/mån"],["ERT Sverige","150/mån"],["MEGA TV Sverige","120/mån"]],channels:[{n:"ERT 1",c:"🎬"},{n:"MEGA Channel",c:"🎬"},{n:"ANT1",c:"🎬"},{n:"SKAI TV",c:"📰"},{n:"Nova Sports GR",c:"⚽"}]},
  { slug:"portugisisk",flag:"🇵🇹",name:"Português",sub:"RTP, SIC, TVI, Globo",desc:"Portugisiska och brasilianska kanaler — RTP, SIC, Globo Brasil.",wa:"Hej! Jag vill ha portugisiska kanaler i Sverige.",keywords:[["portugisisk IPTV Sverige","160/mån"],["RTP Sverige","130/mån"],["brasiliansk TV Sverige","110/mån"]],channels:[{n:"RTP 1",c:"🎬"},{n:"RTP Internacional",c:"🎬"},{n:"SIC Portugal",c:"🎬"},{n:"TVI Portugal",c:"🎬"},{n:"Globo Brasil",c:"🎬"},{n:"SporTV",c:"⚽"}]},
  { slug:"thai",flag:"🇹🇭",name:"ภาษาไทย",sub:"Thai PBS, ONE31, GMM25",desc:"Thailändska kanaler — Thai PBS, ONE31, GMM25, CH3.",wa:"Hej! Jag vill ha thailändska kanaler i Sverige.",keywords:[["thai IPTV Sverige","140/mån"],["thailändska kanaler","110/mån"]],channels:[{n:"Thai PBS",c:"🎬"},{n:"ONE31",c:"🎬"},{n:"GMM25",c:"🎬"},{n:"CH3 Thailand",c:"🎬"},{n:"True Sport",c:"⚽"}]},
  { slug:"vietnamesisk",flag:"🇻🇳",name:"Tiếng Việt",sub:"VTV, HTV, SCTV",desc:"Vietnamesiska kanaler — VTV, HTV, SCTV.",wa:"Hej! Jag vill ha vietnamesiska kanaler i Sverige.",keywords:[["vietnamesisk IPTV Sverige","130/mån"],["VTV Sverige","100/mån"]],channels:[{n:"VTV1",c:"🎬"},{n:"VTV3",c:"🎬"},{n:"HTV7",c:"🎬"},{n:"SCTV",c:"🎬"}]},
];

// ─── DICTIONARY ──────────────────────────────────────────────────────────────

const dict: Record<Locale, Copy> = {
  sv: {
    brand: SITE.brand,
    top: {
      status: "Systemstatus: Online • Support svarar direkt via WhatsApp",
      urgency: "🎁 Lanseringspris garanterat till 30 juni — Testa gratis 24h",
    },
    nav: { offers: "Paket", channels: "Kanaler", faq: "FAQ", setup: "Installation", whatsapp: "WhatsApp", install: "Installera App", cities: "Städer", devices: "Enheter" },
    hero: {
      pill: "WhatsApp-support • 4K/UHD • 20 000+ kanaler • EPG ingår",
      titleA: "Sveriges #1 TV-tjänst",
      titleB: "Snabbt. Stabilt. Enkelt.",
      lead: "Sluta betala för dyra Viaplay- och C More-abonnemang. Få tillgång till 20 000+ kanaler, sport, filmer och 100 000+ serier — allt för från 83 kr/mån.",
      ctaPrices: "Se våra paket",
      ctaAdvisor: "Prata med Moa",
      trust: "⭐⭐⭐⭐⭐ 4,9/5 från 1 200+ kunder • Nöjd-kund-garanti • Gratis test 24h",
    },
    trial: {
      badge: "Gratis test",
      title: "Prova gratis i 24 timmar",
      sub: "Inget kreditkort krävs. Kontakta oss på WhatsApp och testa tjänsten direkt på din enhet — Firestick, Smart TV, Android eller iPhone.",
      cta: "Begär gratis test nu",
      note: "Ingen bindningstid. Inget automatiskt köp.",
    },
    offers: {
      title: "Välj ditt paket",
      sub: "Alla paket inkluderar 20 000+ kanaler, VOD, EPG och WhatsApp-support. Beställ direkt via WhatsApp.",
      order: "Beställ via WhatsApp",
      billedOnce: "Debiteras",
      perMonth: "/mån",
      save: "SPARA",
      bestSeller: "BÄSTSÄLJARE",
      totalLabel: "engångskostnad",
    },
    planNames: { p1: "1 Månad", p3: "3 Månader", p6: "6 Månader", p12: "12 Månader" },
    planPerks: {
      p1: ["20 000+ live-kanaler", "4K/UHD kvalitet", "EPG kanalguide ingår", "WhatsApp-support", "Ingen bindningstid"],
      p3: ["Populäraste valet", "20 000+ live-kanaler", "100 000+ filmer & serier", "Prioriterad support", "Guidad installation"],
      p6: ["Väldigt prisvärd", "20 000+ live-kanaler", "Multi-enhet stöd", "EPG + Catch-up TV", "Alla kanaler ingår"],
      p12: ["Bästa värdet", "Premium VIP-åtkomst", "20 000+ kanaler", "VIP-support 24/7", "Gratis uppgradering"],
    },
    channels: { title: "Utforska kanalutbudet", sub: "Välj region och se vad som ingår", more: "…och 20 000+ kanaler till" },
    devices: {
      title: "Fungerar på alla dina enheter",
      sub: "Installera på upp till 3 enheter. Vi guidar dig igenom installationen via WhatsApp — oavsett enhet.",
      list: DEVICE_LIST,
    },
    vod: {
      title: "100 000+ filmer & serier on demand",
      sub: "Nytt innehåll läggs till varje vecka. Titta när du vill, på valfri enhet.",
      stats: [
        { value: "100 000+", label: "Filmer & serier" },
        { value: "20 000+", label: "Live-kanaler" },
        { value: "4K/UHD", label: "Maximal kvalitet" },
        { value: "< 10 min", label: "Aktiveringstid" },
      ],
    },
    compare: {
      title: "Varför välja Sverige TV?",
      sub: "Jämförelse med traditionella streamingtjänster",
      headers: ["Tjänst", "Pris/mån", "Live-kanaler", "VOD", "4K", "Support"],
      rows: [
        { service: "Viaplay Total", price: "329 kr", live: "~150", vod: true, hd4k: true, support: "Chat" },
        { service: "C More Everything", price: "279 kr", live: "~80", vod: true, hd4k: false, support: "Chat" },
        { service: "Netflix Standard", price: "179 kr", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Sverige TV", price: "från 83 kr", live: "20 000+", vod: true, hd4k: true, support: "WhatsApp direkt", highlight: true },
      ],
    },
    reviews: {
      title: "Vad våra kunder säger",
      sub: "Omdömen från svenska kunder",
      items: [
        { name: "Erik L.", city: "Stockholm", stars: 5, plan: "3 månader", text: "Installationen gick på 10 minuter med hjälp från support. SVT, TV4 och alla sportkanaler fungerar perfekt. Sparar 250 kr i månaden jämfört med Viaplay." },
        { name: "Fatima A.", city: "Göteborg", stars: 5, plan: "6 månader", text: "Äntligen borta från dyra abonnemang. Alla svenska kanaler finns, plus arabiska kanaler för familjen. Utmärkt kvalitet och snabb support." },
        { name: "Mohammed K.", city: "Malmö", stars: 5, plan: "12 månader", text: "TiviMate fungerade direkt. 4K-kvalitet på Firestick utan buffring. Bästa IPTV-tjänsten jag provat på 3 år." },
        { name: "Anna B.", city: "Uppsala", stars: 4, plan: "3 månader", text: "Lite osäker i början men supportteamet var professionellt och hjälpte mig igenom installationen steg för steg. Väldigt nöjd." },
        { name: "Lars P.", city: "Västerås", stars: 5, plan: "12 månader", text: "Testade gratis i 24 timmar och köpte direkt årsabonnemanget. Allsvenskan, Premier League och NHL — allt på ett ställe." },
        { name: "Sofia N.", city: "Stockholm", stars: 5, plan: "6 månader", text: "Fungerar perfekt på min Samsung Smart TV och min iPhone. Barn-kanalerna är ett extra plus för familjen." },
      ],
    },
    trust: {
      title: "Trygg och enkel handel",
      items: [
        { icon: "🧪", title: "Gratis test 24h", desc: "Prova utan kreditkort. Ingen risk." },
        { icon: "⚡", title: "Aktivering < 10 min", desc: "Vi aktiverar direkt via WhatsApp." },
        { icon: "💬", title: "WhatsApp-support", desc: "Svarar direkt alla dagar." },
        { icon: "🛡️", title: "Nöjd-kund-garanti", desc: "Hör av dig inom 24h om du inte är nöjd." },
        { icon: "📺", title: "4K på alla paket", desc: "Ingen extraavgift för kvalitet." },
        { icon: "🌐", title: "Optimerat för Sverige", desc: "Fungerar med alla svenska internetleverantörer." },
      ],
    },
    faq: {
      title: "Vanliga frågor",
      items: [
        { q: "Kan jag titta på SVT, TV4 och svenska kanaler?", a: "Ja, alla stora svenska kanaler ingår: SVT1, SVT2, TV4, Kanal 5, TV3, SVT Play Live och fler — alla i HD-kvalitet." },
        { q: "Fungerar det med TiviMate och IPTV Smarters?", a: "Ja. Vi stöder TiviMate, IPTV Smarters, GSE Smart IPTV och alla vanliga M3U-appar. Vi skickar M3U-länken direkt via WhatsApp." },
        { q: "Vilka enheter stöds?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box och PC/Mac. Vi guidar dig igenom installationen på din specifika enhet." },
        { q: "Hur snabbt aktiveras det?", a: "Vanligtvis inom 5–10 minuter efter beställning via WhatsApp, även på helger." },
        { q: "Ingår EPG (kanalguide)?", a: "Ja. En fullständig elektronisk kanalguide (EPG) ingår i alla paket, så du alltid ser vad som visas och vad som kommer." },
        { q: "Kan jag titta på flera skärmar samtidigt?", a: "Standardpaketet inkluderar en anslutning. Kontakta oss på WhatsApp om du vill ha multi-skärm — vi har lösningar för hela hushåll." },
        { q: "Behöver jag VPN?", a: "Inte nödvändigt, men vi rekommenderar VPN för extra integritet. Vi kan ge råd om vilken VPN som passar bäst." },
        { q: "Fungerar tjänsten utomlands?", a: "Ja, tjänsten fungerar i de flesta länder. För bästa resultat utomlands rekommenderar vi VPN." },
        { q: "Hur betalar jag?", a: "Betalning sker via WhatsApp. Vi accepterar Swish, bankoverföring och andra betalningsmetoder. Kontakta oss för mer info." },
        { q: "Vad händer om tjänsten slutar fungera?", a: "Kontakta oss direkt på WhatsApp. Vi löser tekniska problem vanligtvis inom 1–2 timmar. Ingen kund lämnas utan hjälp." },
        { q: "Kan jag se Allsvenskan och svensk sport?", a: "Ja! Svenska sportkanaler ingår — du kan följa Allsvenskan, SHL, VM, EM och all annan svensk och internationell sport." },
        { q: "Kan jag avbryta abonnemanget?", a: "Det finns ingen bindningstid. Du betalar en gång och tjänsten löper ut automatiskt efter vald period." },
      ],
    },
    cities: {
      title: "TV i hela Sverige",
      sub: "Sveriges bästa TV-tjänst — optimerat för alla hushåll.",
      button: "Kontakta oss",
      items: [
        { name: "Stockholm", text: "Perfekt för Stockholms-hushåll som vill ersätta Viaplay eller C More med stabil och prisvärd IPTV. SVT, sport och internationella kanaler i ett paket." },
        { name: "Göteborg", text: "Optimerat för hushåll i Göteborg. Följ IFK Göteborg och alla svenska sportsändningar, plus internationella kanaler på alla enheter." },
        { name: "Malmö", text: "Bra för Malmö-användare som söker arabiska, turkiska eller internationella kanaler utöver de svenska." },
        { name: "Uppsala", text: "Passar studenter och familjer i Uppsala. Ingen bindningstid — fungerar på laptop, mobil och TV." },
        { name: "Västerås", text: "Stabil IPTV-lösning för Västerås med enkel installation via WhatsApp och full support på svenska." },
      ],
    },
    setup: {
      title: "Snabb installation — 10 minuter",
      sub: "Fungerar på Firestick, Smart TV, iPhone, Android och mer. Vi guidar dig hela vägen.",
      button: "Få installationshjälp nu",
      steps: [
        { step: "1", text: "Kontakta oss på WhatsApp — berätta vilken enhet du har." },
        { step: "2", text: "Välj ditt paket och slutför betalningen via Swish eller bankoverföring." },
        { step: "3", text: "Få din M3U-länk och installationsguide direkt — börja titta inom 10 minuter." },
      ],
    },
    footer: { rights: "Alla rättigheter förbehållna.", note: "Optimerat för snabb och stabil streaming i Sverige.", legal: "Juridisk information", privacy: "Integritetspolicy", terms: "Användarvillkor", refund: "Nöjd-kund-policy" },
    whatsapp: {
      generic: "Hej! Jag behöver hjälp med Sverige TV.",
      trial: "Hej! Jag vill testa Sverige TV gratis i 24 timmar. Kan du hjälpa mig?",
      orderMessage: (p, pr, c) => `Hej! Jag vill beställa ${p} (${pr} ${c}). Kan du hjälpa mig komma igång?`,
    },
    bot: {
      greeting1: "Hej! 👋 Jag heter Moa.",
      greeting2: "Jag kan hjälpa dig med paket, gratis test eller installation. Vad undrar du?",
      price1: "Vi har paket från 83 kr/mån — 1, 3, 6 eller 12 månader. Alla inkluderar 20 000+ kanaler och EPG.",
      price2: "Vill du se paketen direkt, eller testa gratis i 24h först?",
      install1: "Firestick och Smart TV är våra populäraste enheter — installationen tar 10 minuter.",
      install2: "Jag skickar installationshjälp direkt på WhatsApp!",
      trial1: "Absolut! Vi erbjuder 24 timmars gratis test — inget kreditkort krävs.",
      trial2: "Klicka nedan så skickar jag testlänken direkt via WhatsApp.",
      default1: "Jag kan hjälpa dig med paket, gratis test, installation och kompatibilitet.",
      default2: "Snabbast hjälp får du på WhatsApp — klicka nedan!",
      quick: ["Visa priser 💰", "Gratis test 24h 🧪", "Firestick-hjälp 🔥", "Vilka kanaler? 📺"],
    },
  },
  en: {
    brand: SITE.brand,
    top: {
      status: "Status: Online • Instant WhatsApp Support",
      urgency: "🎁 Launch price guaranteed until June 30 — Free 24h trial available",
    },
    nav: { offers: "Plans", channels: "Channels", faq: "FAQ", setup: "Setup", whatsapp: "WhatsApp", install: "Install App", cities: "Cities", devices: "Devices" },
    hero: {
      pill: "WhatsApp support • 4K/UHD • 20,000+ channels • EPG included",
      titleA: "Sweden's #1 Premium TV",
      titleB: "Fast. Stable. Simple.",
      lead: "Stop overpaying for Viaplay, C More or cable. Get 20,000+ channels, live sports, movies & 100,000+ series — from just 83 kr/month.",
      ctaPrices: "See Pricing",
      ctaAdvisor: "Chat with Moa",
      trust: "⭐⭐⭐⭐⭐ 4.9/5 from 1,200+ customers • Satisfaction guarantee • Free 24h trial",
    },
    trial: {
      badge: "Free trial",
      title: "Try free for 24 hours",
      sub: "No credit card required. Contact us on WhatsApp and test the service on your device — Firestick, Smart TV, Android or iPhone.",
      cta: "Request free trial now",
      note: "No contract. No automatic charge.",
    },
    offers: {
      title: "Choose your plan",
      sub: "All plans include 20,000+ channels, VOD, EPG and WhatsApp support. Order directly via WhatsApp.",
      order: "Order via WhatsApp",
      billedOnce: "Billed",
      perMonth: "/mo",
      save: "SAVE",
      bestSeller: "BEST SELLER",
      totalLabel: "one-time payment",
    },
    planNames: { p1: "1 Month", p3: "3 Months", p6: "6 Months", p12: "12 Months" },
    planPerks: {
      p1: ["20,000+ live channels", "4K/UHD quality", "EPG guide included", "WhatsApp support", "No contract"],
      p3: ["Most popular choice", "20,000+ live channels", "100,000+ movies & series", "Priority support", "Guided setup"],
      p6: ["Best value", "20,000+ live channels", "Multi-device support", "EPG + Catch-up TV", "All channels included"],
      p12: ["Ultimate value", "Premium VIP access", "20,000+ channels", "VIP 24/7 support", "Free upgrade"],
    },
    channels: { title: "Explore channels", sub: "Choose a region to preview what's included", more: "…and 20,000+ more" },
    devices: {
      title: "Works on all your devices",
      sub: "Install on up to 3 devices. No special app needed — we guide you on WhatsApp.",
      list: DEVICE_LIST,
    },
    vod: {
      title: "100,000+ movies & series on demand",
      sub: "New content added weekly. Watch anytime, on any device.",
      stats: [
        { value: "100,000+", label: "Movies & series" },
        { value: "20,000+", label: "Live channels" },
        { value: "4K/UHD", label: "Max quality" },
        { value: "< 10 min", label: "Activation time" },
      ],
    },
    compare: {
      title: "Why choose Sverige TV?",
      sub: "Comparison with traditional streaming services",
      headers: ["Service", "Price/mo", "Live channels", "VOD", "4K", "Support"],
      rows: [
        { service: "Viaplay Total", price: "329 kr", live: "~150", vod: true, hd4k: true, support: "Chat" },
        { service: "C More Everything", price: "279 kr", live: "~80", vod: true, hd4k: false, support: "Chat" },
        { service: "Netflix Standard", price: "179 kr", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Sverige TV", price: "from 83 kr", live: "20,000+", vod: true, hd4k: true, support: "WhatsApp direct", highlight: true },
      ],
    },
    reviews: {
      title: "What our customers say",
      sub: "Reviews from customers in Sweden",
      items: [
        { name: "Erik L.", city: "Stockholm", stars: 5, plan: "3 months", text: "Setup took 10 minutes with support's help. SVT, TV4 and all sports channels work perfectly. Saving 250 kr/month compared to Viaplay." },
        { name: "Fatima A.", city: "Gothenburg", stars: 5, plan: "6 months", text: "Finally free from expensive subscriptions. All Swedish channels included, plus Arabic channels for the family. Excellent quality." },
        { name: "Mohammed K.", city: "Malmö", stars: 5, plan: "12 months", text: "TiviMate worked straight away. 4K quality on Firestick with zero buffering. Best IPTV service I've tried in 3 years." },
        { name: "Anna B.", city: "Uppsala", stars: 4, plan: "3 months", text: "Was a little nervous at first but the support team was professional and walked me through every step. Very happy." },
        { name: "Lars P.", city: "Västerås", stars: 5, plan: "12 months", text: "Tested free for 24 hours and immediately bought the annual plan. Allsvenskan, Premier League and NHL — all in one place." },
        { name: "Sofia N.", city: "Stockholm", stars: 5, plan: "6 months", text: "Works perfectly on my Samsung Smart TV and iPhone. The kids' channels are a great bonus for the family." },
      ],
    },
    trust: {
      title: "Safe & simple",
      items: [
        { icon: "🧪", title: "Free 24h trial", desc: "Test without a credit card. Zero risk." },
        { icon: "⚡", title: "Activated in < 10 min", desc: "We activate instantly via WhatsApp." },
        { icon: "💬", title: "WhatsApp support", desc: "Fast response, every day." },
        { icon: "🛡️", title: "Satisfaction guarantee", desc: "Not happy? Contact us within 24h." },
        { icon: "📺", title: "4K on all plans", desc: "No surcharge for quality." },
        { icon: "🌐", title: "Optimized for Sweden", desc: "Works with all major Swedish ISPs." },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Can I watch SVT, TV4 and Swedish channels?", a: "Yes, all major Swedish channels are included: SVT1, SVT2, TV4, Kanal 5, TV3, SVT Play Live and more — all in HD quality." },
        { q: "Compatible with TiviMate and IPTV Smarters?", a: "Yes. We support TiviMate, IPTV Smarters, GSE Smart IPTV and all standard M3U apps. We send the M3U link directly via WhatsApp." },
        { q: "Which devices are supported?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box and PC/Mac. We guide you through setup on your specific device." },
        { q: "How quickly is the service activated?", a: "Usually within 5–10 minutes after ordering via WhatsApp, even on weekends." },
        { q: "Is EPG (channel guide) included?", a: "Yes. A full Electronic Programme Guide (EPG) is included with all plans so you always know what's on and what's coming up." },
        { q: "Can I watch on multiple screens at the same time?", a: "The standard plan includes one connection. Contact us on WhatsApp for multi-screen household solutions." },
        { q: "Do I need a VPN?", a: "Not required, but we recommend VPN for extra privacy. We can advise on the best option for your setup." },
        { q: "Does it work abroad?", a: "Yes, the service works in most countries. We recommend a VPN for best performance outside Sweden." },
        { q: "How do I pay?", a: "Payment is made via WhatsApp. We accept Swish, bank transfer and other methods. Contact us for details." },
        { q: "What if the service stops working?", a: "Contact us directly on WhatsApp. We resolve technical issues usually within 1–2 hours. No customer is left without help." },
        { q: "Can I watch Swedish football (Allsvenskan)?", a: "Yes! Swedish sports channels are included — you can follow Allsvenskan, SHL, and all other Swedish and international sports." },
        { q: "Can I cancel my subscription?", a: "There's no contract. You pay once and the service expires automatically after the chosen period." },
      ],
    },
    cities: {
      title: "TV & Streaming i hela Sverige",
      sub: "Optimized for Swedish households wherever you live.",
      button: "Contact us",
      items: [
        { name: "Stockholm", text: "Perfect for Stockholm households looking to replace Viaplay or C More with stable, affordable IPTV. Swedish, sports and international channels in one package." },
        { name: "Gothenburg", text: "Optimized for households in Gothenburg. Follow IFK Göteborg and all Swedish sports, plus international channels on all devices." },
        { name: "Malmö", text: "Great for Malmö users seeking Arabic, Turkish or international channels alongside Swedish content." },
        { name: "Uppsala", text: "Ideal for students and families in Uppsala. No contract, works on laptop, phone and TV." },
        { name: "Västerås", text: "Stable IPTV for Västerås with easy setup via WhatsApp and full support." },
      ],
    },
    setup: {
      title: "Quick setup — 10 minutes",
      sub: "Works on Firestick, Smart TV, iPhone, Android and more. We guide you every step of the way.",
      button: "Get setup help now",
      steps: [
        { step: "1", text: "Contact us on WhatsApp — tell us which device you have." },
        { step: "2", text: "Choose your plan and complete payment via Swish or bank transfer." },
        { step: "3", text: "Receive your M3U link and setup guide — start watching within 10 minutes." },
      ],
    },
    footer: { rights: "All rights reserved.", note: "Optimized for fast and stable streaming in Sweden.", legal: "Legal", privacy: "Privacy Policy", terms: "Terms of Use", refund: "Satisfaction Policy" },
    whatsapp: {
      generic: "Hi! I need help with Sverige TV.",
      trial: "Hi! I'd like to try Sverige TV free for 24 hours. Can you help me?",
      orderMessage: (p, pr, c) => `Hi! I want to order ${p} (${pr} ${c}). Can you help me get started?`,
    },
    bot: {
      greeting1: "Hi! 👋 I'm Moa.",
      greeting2: "I can help with plans, free trial, or setup. What would you like to know?",
      price1: "We have plans from 83 kr/month — 1, 3, 6 or 12 months. All include 20,000+ channels and EPG.",
      price2: "Want me to guide you to the right plan, or try free for 24h first?",
      install1: "Firestick and Smart TV are our most popular devices — setup takes 10 minutes.",
      install2: "I'll send you step-by-step setup instructions directly on WhatsApp!",
      trial1: "Absolutely! We offer a 24-hour free trial — no credit card needed.",
      trial2: "Click below and I'll send the trial link directly on WhatsApp.",
      default1: "I can help with plans, free trial, setup and compatibility.",
      default2: "For the fastest help — reach out on WhatsApp!",
      quick: ["See prices 💰", "Free 24h trial 🧪", "Firestick help 🔥", "Which channels? 📺"],
    },
  },
  fr: {
    brand: SITE.brand,
    top: {
      status: "Serveurs : Opérationnels • Support WhatsApp immédiat",
      urgency: "🎁 Prix de lancement garanti jusqu'au 30 juin — Essai gratuit 24h disponible",
    },
    nav: { offers: "Offres", channels: "Chaînes", faq: "FAQ", setup: "Installation", whatsapp: "WhatsApp", install: "Installer l'App", cities: "Villes", devices: "Appareils" },
    hero: {
      pill: "Support WhatsApp • 4K/UHD • 20 000+ chaînes • EPG inclus",
      titleA: "La TV #1 en Suède",
      titleB: "Rapide. Stable. Simple.",
      lead: "Arrêtez de surpayer Viaplay, C More ou le câble. Accédez à 20 000+ chaînes, sport, films et 100 000+ séries — à partir de 83 kr/mois.",
      ctaPrices: "Voir les offres",
      ctaAdvisor: "Parler à Moa",
      trust: "⭐⭐⭐⭐⭐ 4,9/5 de 1 200+ clients • Garantie satisfaction • Essai gratuit 24h",
    },
    trial: {
      badge: "Essai gratuit",
      title: "Essayez gratuitement pendant 24h",
      sub: "Aucune carte bancaire requise. Contactez-nous sur WhatsApp et testez le service sur votre appareil — Firestick, Smart TV, Android ou iPhone.",
      cta: "Demander l'essai gratuit",
      note: "Sans engagement. Sans achat automatique.",
    },
    offers: {
      title: "Choisissez votre offre",
      sub: "Toutes les offres incluent 20 000+ chaînes, VOD, EPG et support WhatsApp. Commandez directement sur WhatsApp.",
      order: "Commander via WhatsApp",
      billedOnce: "Facturé",
      perMonth: "/mois",
      save: "ÉCO",
      bestSeller: "POPULAIRE",
      totalLabel: "paiement unique",
    },
    planNames: { p1: "1 mois", p3: "3 mois", p6: "6 mois", p12: "12 mois" },
    planPerks: {
      p1: ["20 000+ chaînes live", "Qualité 4K/UHD", "Guide EPG inclus", "Support WhatsApp", "Sans engagement"],
      p3: ["Choix le plus populaire", "20 000+ chaînes live", "100 000+ films & séries", "Support prioritaire", "Installation guidée"],
      p6: ["Meilleur rapport qualité/prix", "20 000+ chaînes live", "Multi-appareils", "EPG + Catch-up TV", "Toutes les chaînes incluses"],
      p12: ["Valeur ultime", "Accès VIP premium", "20 000+ chaînes", "Support VIP 24/7", "Mise à jour gratuite"],
    },
    channels: { title: "Aperçu des chaînes", sub: "Choisissez une région pour voir ce qui est inclus", more: "…et 20 000+ autres chaînes" },
    devices: {
      title: "Compatible avec tous vos appareils",
      sub: "Installez sur jusqu'à 3 appareils. Nous vous guidons via WhatsApp pour n'importe quel appareil.",
      list: DEVICE_LIST,
    },
    vod: {
      title: "100 000+ films & séries à la demande",
      sub: "Nouveau contenu ajouté chaque semaine. Regardez quand vous voulez, sur n'importe quel appareil.",
      stats: [
        { value: "100 000+", label: "Films & séries" },
        { value: "20 000+", label: "Chaînes live" },
        { value: "4K/UHD", label: "Qualité maximale" },
        { value: "< 10 min", label: "Délai d'activation" },
      ],
    },
    compare: {
      title: "Pourquoi choisir Sverige TV ?",
      sub: "Comparaison avec les services de streaming traditionnels",
      headers: ["Service", "Prix/mois", "Chaînes live", "VOD", "4K", "Support"],
      rows: [
        { service: "Viaplay Total", price: "329 kr", live: "~150", vod: true, hd4k: true, support: "Chat" },
        { service: "C More Everything", price: "279 kr", live: "~80", vod: true, hd4k: false, support: "Chat" },
        { service: "Netflix Standard", price: "179 kr", live: "0", vod: true, hd4k: true, support: "Chat" },
        { service: "Sverige TV", price: "dès 83 kr", live: "20 000+", vod: true, hd4k: true, support: "WhatsApp direct", highlight: true },
      ],
    },
    reviews: {
      title: "Ce que disent nos clients",
      sub: "Avis de clients en Suède",
      items: [
        { name: "Erik L.", city: "Stockholm", stars: 5, plan: "3 mois", text: "L'installation a pris 10 minutes avec l'aide du support. SVT, TV4 et toutes les chaînes sport fonctionnent parfaitement. J'économise 250 kr/mois vs Viaplay." },
        { name: "Fatima A.", city: "Göteborg", stars: 5, plan: "6 mois", text: "Enfin libérée des abonnements chers. Toutes les chaînes suédoises plus les chaînes arabes pour la famille. Excellente qualité." },
        { name: "Mohammed K.", city: "Malmö", stars: 5, plan: "12 mois", text: "TiviMate a fonctionné immédiatement. Qualité 4K sur Firestick sans aucun buffering. Meilleur service IPTV testé en 3 ans." },
        { name: "Anna B.", city: "Uppsala", stars: 4, plan: "3 mois", text: "Un peu hésitante au début mais l'équipe support était professionnelle et m'a guidée pas à pas. Très satisfaite." },
        { name: "Lars P.", city: "Västerås", stars: 5, plan: "12 mois", text: "Testé gratuitement 24h et immédiatement pris l'abonnement annuel. Allsvenskan, Premier League et NHL — tout au même endroit." },
        { name: "Sofia N.", city: "Stockholm", stars: 5, plan: "6 mois", text: "Fonctionne parfaitement sur mon Samsung Smart TV et mon iPhone. Les chaînes pour enfants sont un plus pour la famille." },
      ],
    },
    trust: {
      title: "Commerce sûr et simple",
      items: [
        { icon: "🧪", title: "Essai gratuit 24h", desc: "Testez sans carte bancaire. Zéro risque." },
        { icon: "⚡", title: "Activation < 10 min", desc: "Activation immédiate via WhatsApp." },
        { icon: "💬", title: "Support WhatsApp", desc: "Réponse rapide, tous les jours." },
        { icon: "🛡️", title: "Garantie satisfaction", desc: "Pas satisfait ? Contactez-nous sous 24h." },
        { icon: "📺", title: "4K sur toutes les offres", desc: "Sans supplément pour la qualité." },
        { icon: "🌐", title: "Optimisé pour la Suède", desc: "Compatible avec tous les FAI suédois." },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        { q: "Puis-je regarder SVT, TV4 et les chaînes suédoises ?", a: "Oui, toutes les grandes chaînes suédoises sont incluses : SVT1, SVT2, TV4, Kanal 5, TV3, SVT Play Live et plus — toutes en qualité HD." },
        { q: "Compatible avec TiviMate et IPTV Smarters ?", a: "Oui. Nous supportons TiviMate, IPTV Smarters, GSE Smart IPTV et toutes les applications M3U standard. Nous envoyons le lien M3U directement via WhatsApp." },
        { q: "Quels appareils sont supportés ?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box et PC/Mac. Nous vous guidons pour votre appareil spécifique." },
        { q: "Combien de temps prend l'activation ?", a: "Généralement 5 à 10 minutes après la commande via WhatsApp, même le week-end." },
        { q: "Le guide EPG est-il inclus ?", a: "Oui. Un guide électronique des programmes (EPG) complet est inclus dans toutes les offres, pour savoir toujours ce qui passe." },
        { q: "Puis-je regarder sur plusieurs écrans simultanément ?", a: "L'offre standard inclut une connexion. Contactez-nous sur WhatsApp pour des solutions multi-écrans pour le foyer." },
        { q: "Ai-je besoin d'un VPN ?", a: "Ce n'est pas obligatoire, mais nous recommandons un VPN pour plus de confidentialité. Nous pouvons vous conseiller sur le meilleur choix." },
        { q: "Ça fonctionne à l'étranger ?", a: "Oui, le service fonctionne dans la plupart des pays. Nous recommandons un VPN pour de meilleures performances hors de Suède." },
        { q: "Comment puis-je payer ?", a: "Le paiement s'effectue via WhatsApp. Nous acceptons Swish, virement bancaire et d'autres méthodes. Contactez-nous pour les détails." },
        { q: "Que se passe-t-il si le service ne fonctionne pas ?", a: "Contactez-nous directement sur WhatsApp. Nous résolvons les problèmes techniques généralement en 1 à 2 heures." },
        { q: "Puis-je regarder le football suédois (Allsvenskan) ?", a: "Oui ! Les chaînes sport suédoises sont incluses — Allsvenskan, SHL, Coupe du monde et toutes les compétitions internationales." },
        { q: "Puis-je annuler mon abonnement ?", a: "Il n'y a aucun engagement. Vous payez une fois et le service expire automatiquement après la période choisie." },
      ],
    },
    cities: {
      title: "TV partout en Suède",
      sub: "Optimisé pour les foyers suédois où que vous soyez.",
      button: "Nous contacter",
      items: [
        { name: "Stockholm", text: "Parfait pour les foyers stockholmois souhaitant remplacer Viaplay ou C More. Chaînes suédoises, sport et contenu international en un seul abonnement." },
        { name: "Göteborg", text: "Optimisé pour les foyers de Göteborg. Suivez IFK Göteborg et tout le sport suédois, plus des chaînes internationales sur tous vos appareils." },
        { name: "Malmö", text: "Idéal pour les utilisateurs de Malmö cherchant des chaînes arabes, turques ou internationales en plus du contenu suédois." },
        { name: "Uppsala", text: "Parfait pour les étudiants et les familles à Uppsala. Sans engagement, fonctionne sur laptop, téléphone et TV." },
        { name: "Västerås", text: "Solution IPTV stable pour Västerås avec installation facile via WhatsApp et support complet." },
      ],
    },
    setup: {
      title: "Installation rapide — 10 minutes",
      sub: "Fonctionne sur Firestick, Smart TV, iPhone, Android et plus. Nous vous guidons à chaque étape.",
      button: "Obtenir de l'aide maintenant",
      steps: [
        { step: "1", text: "Contactez-nous sur WhatsApp — indiquez votre appareil." },
        { step: "2", text: "Choisissez votre offre et effectuez le paiement (Swish/virement)." },
        { step: "3", text: "Recevez votre lien M3U et guide d'installation — commencez à regarder en 10 minutes." },
      ],
    },
    footer: { rights: "Tous droits réservés.", note: "Optimisé pour un streaming rapide et stable en Suède.", legal: "Mentions légales", privacy: "Politique de confidentialité", terms: "Conditions d'utilisation", refund: "Politique de satisfaction" },
    whatsapp: {
      generic: "Bonjour ! J'ai besoin d'aide avec Sverige TV.",
      trial: "Bonjour ! Je voudrais tester Sverige TV gratuitement pendant 24h. Pouvez-vous m'aider ?",
      orderMessage: (p, pr, c) => `Bonjour ! Je veux commander ${p} (${pr} ${c}). Pouvez-vous m'aider ?`,
    },
    bot: {
      greeting1: "Bonjour ! 👋 Je suis Moa.",
      greeting2: "Je peux vous aider avec les offres, l'essai gratuit ou l'installation. Que souhaitez-vous savoir ?",
      price1: "Nos offres vont de 83 kr/mois — 1, 3, 6 ou 12 mois. Toutes incluent 20 000+ chaînes et EPG.",
      price2: "Voulez-vous voir les offres, ou essayer gratuitement 24h d'abord ?",
      install1: "Firestick et Smart TV sont nos appareils les plus populaires — l'installation prend 10 minutes.",
      install2: "Je vous envoie un guide d'installation étape par étape directement sur WhatsApp !",
      trial1: "Absolument ! Nous offrons un essai gratuit de 24 heures — sans carte bancaire.",
      trial2: "Cliquez ci-dessous et je vous envoie le lien d'essai directement sur WhatsApp.",
      default1: "Je peux aider avec les offres, l'essai gratuit, l'installation et la compatibilité.",
      default2: "Pour une aide rapide — contactez-moi sur WhatsApp !",
      quick: ["Voir les prix 💰", "Essai gratuit 24h 🧪", "Aide Firestick 🔥", "Quelles chaînes ? 📺"],
    },
  },
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────

type LangCtx = { lang: Locale; setLang: (l: Locale) => void };
const LanguageContext = createContext<LangCtx | null>(null);
function useLanguage(): LangCtx {
  const v = useContext(LanguageContext);
  if (!v) throw new Error("useLanguage must be used inside provider");
  return v;
}

// ─── UTILITIES ────────────────────────────────────────────────────────────────

function isMobileUA(ua: string): boolean {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}
function generateWhatsAppLink(message: string, ua: string, ref?: string): string {
  const suffix = ref ? ` | Ref: ${ref}` : "";
  const text = encodeURIComponent(message + suffix);
  return isMobileUA(ua)
    ? `https://wa.me/${SITE.whatsappPhone}?text=${text}`
    : `https://api.whatsapp.com/send?phone=${SITE.whatsappPhone}&text=${text}`;
}
function normalizeLocale(raw: string): Locale {
  const l = raw.toLowerCase().replace("_", "-").trim();
  const base = l.split("-")[0] as Locale;
  return base === "sv" || base === "en" || base === "fr" ? base : "sv";
}
function detectLangClient(): Locale {
  if (typeof window === "undefined") return "sv";
  const params = new URLSearchParams(window.location.search);
  const qp = params.get("lang");
  if (qp) return normalizeLocale(qp);
  const navLangs = ((navigator.languages?.length ? navigator.languages : [navigator.language]) as string[]).filter(Boolean);
  for (const nl of navLangs) { const n = normalizeLocale(nl); if (dict[n]) return n; }
  try { const s = window.localStorage.getItem("lang"); if (s) return normalizeLocale(s); } catch {}
  return "sv";
}
function getISOWeekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return h >>> 0;
}
function makePRNG(seed: number) {
  let s = seed >>> 0;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s >>>= 0; s ^= s << 5; s >>>= 0; return (s >>> 0) / 4294967296; };
}
function clamp(n: number, a: number, b: number) { return Math.max(a, Math.min(b, n)); }
function timeAgoLabel(from: Date, now: Date) {
  const sec = Math.max(1, Math.floor((now.getTime() - from.getTime()) / 1000));
  const min = Math.floor(sec / 60);
  if (min <= 0) return "nyss";
  if (min === 1) return "1 min sedan";
  if (min < 60) return `${min} min sedan`;
  const h = Math.floor(min / 60);
  return h === 1 ? "1 timme sedan" : `${h} h sedan`;
}

// ─── BOT LOGIC ────────────────────────────────────────────────────────────────

function getBotReply(input: string, lang: Locale): string[] {
  const b = dict[lang].bot;
  const q = input.toLowerCase();
  if (q.includes("pris") || q.includes("price") || q.includes("prix") || q.includes("paket") || q.includes("plan") || q.includes("offre") || q.includes("kost") || q.includes("💰")) {
    return [b.price1, b.price2];
  }
  if (q.includes("firestick") || q.includes("install") || q.includes("setup") || q.includes("enhet") || q.includes("device") || q.includes("appareil") || q.includes("smart tv") || q.includes("🔥")) {
    return [b.install1, b.install2];
  }
  if (q.includes("test") || q.includes("trial") || q.includes("essai") || q.includes("gratis") || q.includes("free") || q.includes("gratuit") || q.includes("🧪")) {
    return [b.trial1, b.trial2];
  }
  if (q.includes("kanal") || q.includes("channel") || q.includes("chaîne") || q.includes("svt") || q.includes("tv4") || q.includes("📺")) {
    return ["Vi har 20 000+ kanaler — SVT, TV4, sport, film och internationella kanaler. Vill du se hela listan?", b.default2];
  }
  return [b.default1, b.default2];
}

// ─── LIVE ACTIVITY WIDGET ────────────────────────────────────────────────────

function LiveActivityWidget({ userAgent }: { userAgent: string }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [data, setData] = useState<{ viewing: number; updatedLabel: string } | null>(null);

  useEffect(() => {
    const now = new Date();
    const weekKey = getISOWeekKey(now);
    const weekSeed = hash32(`${SITE.domain}|${weekKey}`);
    const rndWeek = makePRNG(weekSeed);
    const viewingBase = 3 + Math.floor(rndWeek() * 8);
    let lastUpdate = new Date();
    const tick = () => {
      const t = new Date();
      const minuteKey = `${weekKey}|${t.getUTCHours()}:${t.getUTCMinutes()}`;
      const rnd = makePRNG(hash32(`${SITE.domain}|${minuteKey}`));
      const jitter = () => (rnd() < 0.33 ? -1 : rnd() < 0.66 ? 0 : 1);
      const viewing = clamp(viewingBase + jitter(), 3, 18);
      if (rnd() < 0.25) lastUpdate = t;
      setData({ viewing, updatedLabel: timeAgoLabel(lastUpdate, t) });
    };
    tick();
    const id = window.setInterval(tick, 12000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const k = "live_toast_v3";
    try { if (sessionStorage.getItem(k) === "1") return; } catch {}
    const onScroll = () => {
      const el = document.getElementById("offers");
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.7) {
        window.removeEventListener("scroll", onScroll);
        try { sessionStorage.setItem(k, "1"); } catch {}
        setToast(true);
        window.setTimeout(() => setToast(false), 5000);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {toast && data && (
        <div className="liveToast" role="status" aria-live="polite">
          <span className="liveDot" />
          <div className="liveToastText">
            <div className="liveToastTitle">Just nu 🔥</div>
            <div className="liveToastSub">{data.viewing} besökare tittar på erbjudandena.</div>
          </div>
          <button className="liveToastBtn" onClick={() => setOpen(true)}>Se</button>
        </div>
      )}
      <button className="liveBadge" onClick={() => setOpen(v => !v)} aria-label="Se live aktivitet">
        <span className="liveDot" />
        <span className="liveBadgeText">{data ? `${data.viewing} live` : "Live"}</span>
      </button>
      {open && data && (
        <div className="livePanel">
          <div className="liveHead">
            <div style={{ fontWeight: 900 }}>Live 🇸🇪</div>
            <div className="liveSub">Uppdaterad {data.updatedLabel}</div>
          </div>
          <div className="liveStats">
            <div className="liveRow"><span>Besökare just nu</span><b>{data.viewing}</b></div>
            <div className="liveRow"><span>Support</span><b style={{ color: "#22c55e" }}>Online</b></div>
          </div>
          <button className="liveCta" onClick={() => window.open(generateWhatsAppLink("Hej! Jag vill beställa.", userAgent, "Live-Widget"), "_blank")}>
            Starta WhatsApp
          </button>
        </div>
      )}
    </>
  );
}

// ─── MOA CHAT ────────────────────────────────────────────────────────────────

function MoaChat({ userAgent }: { userAgent: string }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showQuick, setShowQuick] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement | null>(null);
  const avatarUrl = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iYyI+PGNpcmNsZSBjeD0iODAiIGN5PSI4MCIgcj0iODAiLz48L2NsaXBQYXRoPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJiZyIgY3g9IjUwJSIgY3k9IjEwMCUiIHI9IjkwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTBjMTIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwNTA3Ii8+CiAgICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==";

  const pushBot = async (text: string, delay = 900) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setMsgs(prev => [...prev, { from: "bot", text }]);
    setIsTyping(false);
  };

  useEffect(() => {
    try { if (localStorage.getItem("chatDismissed") === "true") setDismissed(true); } catch {}
  }, []);

  useEffect(() => {
    if (msgs.length > 0) msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (msgs.filter(m => m.from === "bot").length >= 2) setShowQuick(true);
  }, [msgs, isTyping]);

  useEffect(() => { if (open) setUnread(0); }, [open]);

  useEffect(() => {
    if (dismissed || msgs.length > 0) return;
    const b = dict[lang].bot;
    const t = window.setTimeout(() => {
      pushBot(b.greeting1, 0).then(() => pushBot(b.greeting2, 1200));
      setUnread(2);
    }, 3500);
    return () => window.clearTimeout(t);
  }, [dismissed, msgs.length, lang]);

  const handleOpen = () => { setOpen(true); setDismissed(false); try { localStorage.removeItem("chatDismissed"); } catch {} };
  const handleClose = () => { setOpen(false); setDismissed(true); try { localStorage.setItem("chatDismissed", "true"); } catch {} };
  const handleToggle = () => open ? handleClose() : handleOpen();

  const doSend = async (val: string) => {
    if (!val.trim() || isTyping) return;
    setMsgs(prev => [...prev, { from: "user", text: val }]);
    setInput("");
    setShowQuick(false);
    const replies = getBotReply(val, lang);
    for (const r of replies) await pushBot(r, 700);
    window.setTimeout(() => {
      window.open(generateWhatsAppLink(`${dict[lang].bot.greeting1.replace("👋 ", "")} ${val}`, userAgent, "Moa-Chat"), "_blank");
    }, 1200);
  };

  const handleSend = () => doSend(input);
  const handleQuick = (q: string) => doSend(q);

  const teaserMsgs = useMemo(() => {
    const bots = msgs.filter(m => m.from === "bot");
    return bots.slice(Math.max(0, bots.length - 3));
  }, [msgs]);

  const fallbackSrc = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = "/icon-192.png";
  };

  return (
    <>
      {!open && !dismissed && teaserMsgs.length > 0 && (
        <button className="miliTeaser" onClick={handleOpen} aria-label="Öppna chatten">
          <div className="miliTeaserHead">
            <img src={avatarUrl} alt="Moa" className="miliTeaserAvatar" loading="lazy" width="22" height="22" onError={fallbackSrc} />
            <span className="miliTeaserTitle">Moa • Support</span>
            {unread > 0 && <span className="miliBadge">{unread}</span>}
          </div>
          <div className="miliTeaserLines">
            {teaserMsgs.map((m, i) => <div key={i} className="miliTeaserLine">{m.text}</div>)}
          </div>
        </button>
      )}
      <button className="miliFab" onClick={handleToggle} aria-label="Chatta med Moa">
        <div className="fabContent">
          <img src={avatarUrl} alt="Moa" className="fabAvatar" loading="lazy" width="35" height="35" onError={fallbackSrc} />
          <span className="fabPulse"></span>
          <span className="fabText">Support</span>
          {unread > 0 && <span className="miliBadge miliBadgeFab">{unread}</span>}
        </div>
      </button>
      {open && (
        <div className="miliBox" role="dialog" aria-label="Chat med Moa">
          <div className="miliHeader">
            <div className="headerAvatarWrapper">
              <img src={avatarUrl} alt="Moa" className="headerAvatar" width="40" height="40" onError={fallbackSrc} />
              <span className="onlineIndicator"></span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: "14px" }}>Moa • Support</div>
              <div style={{ fontSize: "11px", color: "#25d366", fontWeight: 600 }}>
                {isTyping ? "Moa skriver..." : "Svarar snabbt"}
              </div>
            </div>
            <button className="miliClose" onClick={handleClose} aria-label="Stäng chatten">✕</button>
          </div>
          <div className="miliBody">
            <div className="miliMsgs">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === "bot" ? "miliMsgBot" : "miliMsgUser"}>{m.text}</div>
              ))}
              <div ref={msgsEndRef} />
            </div>
            {isTyping && (
              <div className="typingIndicator"><span>.</span><span>.</span><span>.</span></div>
            )}
            {showQuick && !isTyping && (
              <div className="quickReplies">
                {dict[lang].bot.quick.map(q => (
                  <button key={q} className="quickReply" onClick={() => handleQuick(q)}>{q}</button>
                ))}
              </div>
            )}
            <div className="miliInputRow">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Skriv här..."
              />
              <button onClick={handleSend}>→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── CHANNEL EXPLORER ────────────────────────────────────────────────────────

function ChannelExplorer() {
  const { lang } = useLanguage();
  const t = dict[lang];
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section id="channels" className="section">
      <div className="sectionHead">
        <h2>{t.channels.title}</h2>
        <p>{t.channels.sub}</p>
      </div>
      <div className="explorerBox">
        <div className="tabs">
          {channelPreview.map((item, i) => (
            <button key={i} className={`tabBtn ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>
              {item.country}
            </button>
          ))}
        </div>
        <div className="channelList">
          {channelPreview[activeTab].channels.map(ch => (
            <div key={ch} className="channelItem">▶ {ch}</div>
          ))}
          <div className="channelItem more">{t.channels.more}</div>
        </div>
      </div>
    </section>
  );
}

// ─── COUNTRIES SECTION (from code 2) ─────────────────────────────────────────

function CountriesSection({ ua }: { ua: string }) {
  const [selected, setSelected] = useState<Country | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const closeModal = () => setSelected(null);

  return (
    <>
      <section id="countries" className="section">
        <div className="sectionHead">
          <h2>TV på ditt språk i Sverige</h2>
          <p>Klicka på ditt land — se alla kanaler och beställ direkt via WhatsApp</p>
          <p style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600, marginTop: 6 }}>👆 Tryck på ett land för att se kanalerna</p>
        </div>
        <div className="countriesGrid">
          {COUNTRIES.map(c => (
            <button key={c.slug} className="countryCard" onClick={() => setSelected(c)}>
              <span className="ctryFlag">{c.flag}</span>
              <div className="ctryInfo">
                <div className="ctryName">{c.name}</div>
                <div className="ctrySub">{c.sub}</div>
              </div>
              <span className="ctryArrow">›</span>
            </button>
          ))}
        </div>
        <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
          <a className="btnSecondary" href={generateWhatsAppLink("Hej! Jag söker kanaler på mitt språk i Sverige.", ua, "Countries-NotFound")} target="_blank" rel="noreferrer">
            💬 Mitt språk ingår inte — fråga oss
          </a>
        </div>
      </section>

      {selected && (
        <div className="countryModalOverlay" onClick={(e) => { if ((e.target as HTMLElement).classList.contains("countryModalOverlay")) closeModal(); }} role="dialog" aria-modal="true" aria-label={selected.name}>
          <div className="countryModalBox">
            {/* Header */}
            <div className="countryModalHd">
              <span className="countryModalFlag">{selected.flag}</span>
              <div className="countryModalTb">
                <h2>{selected.name}</h2>
                <p>{selected.desc}</p>
              </div>
              <button className="countryModalClose" onClick={closeModal} aria-label="Stäng">✕</button>
            </div>

            {/* Body */}
            <div className="countryModalBd">
              {/* Channels */}
              <div className="countryModalSec">
                <div className="countryModalSecTitle">📺 Kanaler som ingår ({selected.channels.length}+)</div>
                <div className="countryChGrid">
                  {selected.channels.map(ch => (
                    <div key={ch.n} className="countryChChip">
                      <div className="countryChName">{ch.n}</div>
                      <div className="countryChIcon">{ch.c}</div>
                    </div>
                  ))}
                  <div className="countryChChip countryChChipGold">
                    <div className="countryChName" style={{ color: "#C9A84C" }}>+ 100s fler</div>
                    <div className="countryChIcon">💬</div>
                  </div>
                </div>
              </div>

              {/* Keywords */}
              <div className="countryModalSec">
                <div className="countryModalSecTitle">🔍 Vad folk söker på Google</div>
                <div className="countryKwWrap">
                  {selected.keywords.map(([kw, vol]) => (
                    <div key={kw} className="countryKwPill">
                      <span className="countryKwText">{kw}</span>
                      <span className="countryKwVol">{vol}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>Volym = månatliga sökningar i Sverige</p>
              </div>

              {/* Price box */}
              <div className="countryPriceBox">
                <span style={{ fontSize: 26, flexShrink: 0 }}>💰</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 3 }}>Pris: från 83 kr/mån</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Alla kanaler ingår • Gratis test 24h • Ingen bindningstid</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="countryModalFt">
              <a className="trialCta" style={{ flex: 1, minWidth: 140, textAlign: "center", fontSize: 14, padding: "13px 18px" }} href={generateWhatsAppLink(selected.wa, ua, `Country-${selected.slug}`)} target="_blank" rel="noreferrer">
                💬 Beställ {selected.name} — WhatsApp
              </a>
              <a className="btnSecondary" style={{ flex: 1, minWidth: 130, textAlign: "center", fontSize: 13, padding: "13px 14px" }} href={generateWhatsAppLink(`Hej! Jag vill testa ${selected.name} kanaler gratis 24h.`, ua, `Trial-${selected.slug}`)} target="_blank" rel="noreferrer">
                🧪 Testa 24h gratis
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── DEVICE SECTION ───────────────────────────────────────────────────────────

function DeviceSection({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section id="devices" className="section">
      <div className="sectionHead">
        <h2>{t.devices.title}</h2>
        <p>{t.devices.sub}</p>
      </div>
      <div className="deviceGrid">
        {t.devices.list.map(d => (
          <div key={d.name} className="deviceCard">
            <span className="deviceIcon">{d.icon}</span>
            <span className="deviceName">{d.name}</span>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap" style={{ marginTop: 28 }}>
        <a className="btnSecondary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Device-Section")} target="_blank" rel="noreferrer">
          {t.setup.button}
        </a>
      </div>
    </section>
  );
}

// ─── TRIAL BANNER ────────────────────────────────────────────────────────────

function TrialBanner({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <div className="trialBanner">
      <span className="trialBadge">{t.trial.badge}</span>
      <div className="trialContent">
        <h3>{t.trial.title}</h3>
        <p>{t.trial.sub}</p>
        <p className="trialNote">{t.trial.note}</p>
      </div>
      <a className="trialCta" href={generateWhatsAppLink(t.whatsapp.trial, ua, "Trial-Banner")} target="_blank" rel="noreferrer">
        {t.trial.cta}
      </a>
    </div>
  );
}

// ─── VOD SECTION ──────────────────────────────────────────────────────────────

function VODSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section vodSection">
      <div className="sectionHead">
        <h2>{t.vod.title}</h2>
        <p>{t.vod.sub}</p>
      </div>
      <div className="statsGrid">
        {t.vod.stats.map(s => (
          <div key={s.label} className="statCard">
            <div className="statValue">{s.value}</div>
            <div className="statLabel">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── COMPARE SECTION ──────────────────────────────────────────────────────────

function CompareSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{t.compare.title}</h2>
        <p>{t.compare.sub}</p>
      </div>
      <div className="compareWrap">
        <table className="compareTable">
          <thead>
            <tr>{t.compare.headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {t.compare.rows.map(row => (
              <tr key={row.service} className={row.highlight ? "highlightRow" : ""}>
                <td className="serviceName">{row.highlight && <span className="bestTag">✓ </span>}{row.service}</td>
                <td className={row.highlight ? "accentPrice" : ""}>{row.price}</td>
                <td>{row.live}</td>
                <td style={{ color: row.vod ? "#22c55e" : "#ef4444" }}>{row.vod ? "✓" : "✗"}</td>
                <td style={{ color: row.hd4k ? "#22c55e" : "#ef4444" }}>{row.hd4k ? "✓" : "✗"}</td>
                <td>{row.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── REVIEWS SECTION ─────────────────────────────────────────────────────────

function ReviewsSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section">
      <div className="sectionHead">
        <h2>{t.reviews.title}</h2>
        <p>{t.reviews.sub}</p>
      </div>
      <div className="reviewsGrid">
        {t.reviews.items.map((r, i) => (
          <article key={i} className="reviewCard">
            <div className="reviewStars">{"⭐".repeat(r.stars)}</div>
            <p className="reviewText">"{r.text}"</p>
            <div className="reviewMeta">
              <span className="reviewName">{r.name}</span>
              <span className="reviewCity">— {r.city}</span>
              <span className="reviewPlan">{r.plan}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── TRUST SECTION ────────────────────────────────────────────────────────────

function TrustSection() {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section className="section trustSection">
      <div className="sectionHead"><h2>{t.trust.title}</h2></div>
      <div className="trustGrid">
        {t.trust.items.map(item => (
          <div key={item.title} className="trustCard">
            <span className="trustIcon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── SWEDEN CITIES ────────────────────────────────────────────────────────────

function SwedenCities({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section id="cities" className="section">
      <div className="sectionHead">
        <h2>{t.cities.title}</h2>
        <p>{t.cities.sub}</p>
      </div>
      <div className="grid">
        {t.cities.items.map(city => (
          <article key={city.name} className="card">
            <div className="cardHeader"><h3>{city.name}</h3></div>
            <p className="cityText">{city.text}</p>
            <a className="btnPlan" href={generateWhatsAppLink(`${t.whatsapp.generic.replace("!", `! IPTV ${city.name}:`)}`, ua, `${city.name}-City`)} target="_blank" rel="noreferrer">
              {t.cities.button} — {city.name}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─── QUICK SETUP ─────────────────────────────────────────────────────────────

function QuickSetup({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <section id="setup" className="section">
      <div className="sectionHead">
        <h2>{t.setup.title}</h2>
        <p>{t.setup.sub}</p>
      </div>
      <div className="stepsGrid">
        {t.setup.steps.map(item => (
          <div key={item.step} className="stepCard">
            <div className="stepNumber">{item.step}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <div className="stepsCtaWrap">
        <a className="btnPrimary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Setup-CTA")} target="_blank" rel="noreferrer">
          {t.setup.button}
        </a>
      </div>
    </section>
  );
}

// ─── LOGO SVG ─────────────────────────────────────────────────────────────────

function SverigeLogo({ size = 36, showText = true }: { size?: number; showText?: boolean }) {
  const h = size;
  const w = showText ? size * 5.2 : size;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${showText ? 208 : 40} 40`} xmlns="http://www.w3.org/2000/svg" aria-label="Sverige TV">
      <defs>
        <linearGradient id="lgCrown" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8C97A"/>
          <stop offset="50%" stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#9A7830"/>
        </linearGradient>
        <linearGradient id="lgShield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9a1830"/>
          <stop offset="100%" stopColor="#5c0e1c"/>
        </linearGradient>
        <filter id="lgGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z" fill="url(#lgShield)" stroke="#7c1326" strokeWidth="0.8"/>
      <path d="M 3 3 L 37 3 L 37 26 Q 37 36 20 39 Q 3 36 3 26 Z" fill="none" stroke="url(#lgCrown)" strokeWidth="1.2" filter="url(#lgGlow)"/>
      <g filter="url(#lgGlow)">
        <path d="M 8 28 L 8 20 L 12 20 L 12 14 L 16 20 L 20 10 L 24 20 L 28 14 L 28 20 L 32 20 L 32 28 Z" fill="url(#lgCrown)"/>
        <circle cx="20" cy="9" r="2.2" fill="#E8C97A"/>
        <circle cx="12" cy="13.5" r="1.6" fill="#C9A84C"/>
        <circle cx="28" cy="13.5" r="1.6" fill="#C9A84C"/>
        <ellipse cx="16" cy="23" rx="3" ry="1.2" fill="rgba(255,220,120,0.18)"/>
      </g>
      {showText && (
        <>
          <text x="50" y="19" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontWeight="800" fontSize="13" letterSpacing="2.5" fill="#f5f0f5">SVERIGE</text>
          <line x1="50" y1="23" x2="205" y2="23" stroke="url(#lgCrown)" strokeWidth="0.7" opacity="0.6"/>
          <text x="50" y="35" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontWeight="900" fontSize="11" letterSpacing="6" fill="url(#lgCrown)">TV</text>
        </>
      )}
    </svg>
  );
}

// ─── CINEMATIC INTRO ─────────────────────────────────────────────────────────

function CinematicIntro({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  const skip = () => {
    setExiting(true);
    window.setTimeout(onDone, 420);
  };

  useEffect(() => {
    const t = window.setTimeout(skip, 3000);
    return () => window.clearTimeout(t);
  }, []);

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: (i * 97 + 13) % 100,
    size: 1 + (i * 31) % 3,
    delay: ((i * 137) % 400) / 100,
    dur: 4 + ((i * 73) % 300) / 100,
  }));

  return (
    <div className={`cinWrap${exiting ? " cinExit" : ""}`}>
      <div className="cinBg" />
      <div className="cinVignette" />
      <div className="cinParticles" aria-hidden="true">
        {particles.map(p => (
          <span key={p.id} className="cinParticle" style={{
            left: `${p.left}%`, bottom: "-4px",
            width: `${p.size}px`, height: `${p.size}px`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
            opacity: 0,
          }} />
        ))}
      </div>
      <div className="cinLensFlare" aria-hidden="true" />
      <div className="cinContent">
        <div className="cinEmblemWrap">
          <div className="cinEmblemGlow" />
          <svg className="cinSvg" viewBox="0 0 200 200" width="200" height="200" aria-label="Sveriges tre kronor">
            <defs>
              <filter id="cglow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="cglow2" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="10" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <path className="cinShieldFill" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="#005A8E"/>
            <path className="cinShieldFill" d="M 22 22 L 178 22 L 178 117 Q 178 155 100 180 Q 22 155 22 117 Z" fill="none" stroke="rgba(0,20,50,0.5)" strokeWidth="6"/>
            <path className="cinShieldBorder" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="none" stroke="#FECC02" strokeWidth="3.5" filter="url(#cglow)" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="cinShieldBorderGlow" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="none" stroke="rgba(254,204,2,0.2)" strokeWidth="12"/>
            <g className="cinCrown cinCrown1" transform="translate(60,74)">
              <path d="M -22 16 L -22 2 L -17 2 L -17 -6 L -9 2 L 0 -16 L 9 2 L 17 -6 L 17 2 L 22 2 L 22 16 Z" fill="#FECC02" filter="url(#cglow)"/>
              <circle cx="0" cy="-16" r="3.5" fill="#FECC02"/>
              <circle cx="-17" cy="-6" r="2.5" fill="#FECC02"/>
              <circle cx="17" cy="-6" r="2.5" fill="#FECC02"/>
            </g>
            <g className="cinCrown cinCrown2" transform="translate(140,74)">
              <path d="M -22 16 L -22 2 L -17 2 L -17 -6 L -9 2 L 0 -16 L 9 2 L 17 -6 L 17 2 L 22 2 L 22 16 Z" fill="#FECC02" filter="url(#cglow)"/>
              <circle cx="0" cy="-16" r="3.5" fill="#FECC02"/>
              <circle cx="-17" cy="-6" r="2.5" fill="#FECC02"/>
              <circle cx="17" cy="-6" r="2.5" fill="#FECC02"/>
            </g>
            <g className="cinCrown cinCrown3" transform="translate(100,148)">
              <path d="M -22 16 L -22 2 L -17 2 L -17 -6 L -9 2 L 0 -16 L 9 2 L 17 -6 L 17 2 L 22 2 L 22 16 Z" fill="#FECC02" filter="url(#cglow)"/>
              <circle cx="0" cy="-16" r="3.5" fill="#FECC02"/>
              <circle cx="-17" cy="-6" r="2.5" fill="#FECC02"/>
              <circle cx="17" cy="-6" r="2.5" fill="#FECC02"/>
            </g>
          </svg>
        </div>
        <div className="cinTitleWrap">
          <h1 className="cinTitle">SVERIGE TV</h1>
          <div className="cinTitleLine" />
        </div>
        <p className="cinTagline">Framtidens television i Sverige</p>
        <p className="cinSub">20&nbsp;000+ kanaler&nbsp;•&nbsp;4K/UHD&nbsp;•&nbsp;EPG&nbsp;•&nbsp;WhatsApp-support</p>
      </div>
      <button className="cinSkip" onClick={skip} type="button">Hoppa över ›</button>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [lang, setLang] = useState<Locale>("sv");
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showPWABar, setShowPWABar] = useState(false);
  const [showIOSBar, setShowIOSBar] = useState(false);

  useEffect(() => {
    const cover = document.getElementById("__next_cover");
    if (cover) {
      cover.style.transition = "opacity 0.25s ease";
      cover.style.opacity = "0";
      setTimeout(() => cover.parentNode?.removeChild(cover), 260);
    }
    setShowIntro(true);
    const detected = detectLangClient();
    setLang(detected);
    try { localStorage.setItem("lang", detected); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = detected;
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    const handleInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleInstall);
  }, []);

  useEffect(() => {
    if (!installPrompt) return;
    const key = "pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const show = () => setShowPWABar(true);
    const timer = window.setTimeout(show, 2600);
    return () => window.clearTimeout(timer);
  }, [installPrompt]);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isInStandalone = (window.navigator as any).standalone === true;
    if (!isIOS || isInStandalone) return;
    const key = "ios_pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const timer = window.setTimeout(() => setShowIOSBar(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    setShowPWABar(false);
    try { localStorage.removeItem("pwa_dismissed_v1"); } catch {}
    installPrompt.prompt();
    installPrompt.userChoice.then((c: any) => { if (c.outcome === "accepted") setInstallPrompt(null); });
  };
  const handlePWADismiss = () => {
    setShowPWABar(false);
    try { localStorage.setItem("pwa_dismissed_v1", "1"); } catch {}
  };
  const handleIOSDismiss = () => {
    setShowIOSBar(false);
    try { localStorage.setItem("ios_pwa_dismissed_v1", "1"); } catch {}
  };

  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const t = dict[lang];

  const seller = {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.domain,
  };
  const shippingDetails = {
    "@type": "OfferShippingDetails",
    shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "SEK" },
    shippingDestination: { "@type": "DefinedRegion", addressCountry: "SE" },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "MIN" },
      transitTime:  { "@type": "QuantitativeValue", minValue: 0, maxValue: 10, unitCode: "MIN" },
    },
  };
  const returnPolicy = {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "SE",
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 1,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.domain}/#product`,
    name: "Sverige TV — Streaming & IPTV Sverige",
    brand: { "@type": "Brand", name: SITE.brand },
    description: "Sverige TV — 20 000+ live-kanaler, 100 000+ filmer & serier, EPG, 4K/UHD. Aktivering på 10 minuter via WhatsApp. Fungerar på Firestick, Smart TV, iPhone, Android och PC.",
    image: `${SITE.domain}/og-image.jpg`,
    url: SITE.domain,
    sku: "SVTV-STREAM-SE",
    mpn: "SVTV-2025",
    category: "Streaming / IPTV",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Erik L." },
        reviewBody: "Installationen gick på 10 minuter. SVT, TV4 och alla sportkanaler fungerar perfekt. Sparar 250 kr i månaden.",
        datePublished: "2025-11-01",
      },
      {
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        author: { "@type": "Person", name: "Lars P." },
        reviewBody: "Testade gratis 24h och köpte direkt årsabonnemanget. Allsvenskan, Premier League och NHL på ett ställe.",
        datePublished: "2025-12-15",
      },
    ],
    offers: plans.map(p => ({
      "@type": "Offer",
      "@id": `${SITE.domain}/#offer-${p.key}`,
      name: t.planNames[p.key],
      description: `Sverige TV ${t.planNames[p.key]} — 20 000+ kanaler, 4K/UHD, EPG ingår.`,
      price: String(p.price),
      priceCurrency: "SEK",
      priceValidUntil: p.priceValidUntil,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      url: SITE.domain,
      seller,
      shippingDetails,
      hasMerchantReturnPolicy: returnPolicy,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineBusiness",
    "@id": `${SITE.domain}/#business`,
    name: SITE.brand,
    url: SITE.domain,
    logo: `${SITE.domain}/og-image.jpg`,
    image: `${SITE.domain}/og-image.jpg`,
    description: "Sverige TV — 20 000+ kanaler, 4K/UHD, sport, filmer & serier. Streaming-tjänst för Sverige.",
    foundingDate: "2024",
    areaServed: [
      { "@type": "Country", name: "Sverige" },
      { "@type": "City", name: "Stockholm" },
      { "@type": "City", name: "Göteborg" },
      { "@type": "City", name: "Malmö" },
      { "@type": "City", name: "Uppsala" },
      { "@type": "City", name: "Västerås" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "SE",
      addressRegion: "Sverige",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${SITE.whatsappPhone}`,
      availableLanguage: ["Swedish", "English", "French"],
      contactOption: "https://schema.org/TollFree",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "08:00",
        closes: "23:00",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1200",
      bestRating: "5",
    },
    sameAs: [`https://wa.me/${SITE.whatsappPhone}`],
    priceRange: "83-600 SEK",
    currenciesAccepted: "SEK",
    paymentAccepted: "Swish, Bank Transfer",
  };

  const navLinks = [
    { href: "#offers", label: t.nav.offers },
    { href: "#channels", label: t.nav.channels },
    { href: "#countries", label: "TV-länder" },
    { href: "#devices", label: t.nav.devices },
    { href: "#cities", label: t.nav.cities },
    { href: "#faq", label: t.nav.faq },
    { href: "#setup", label: t.nav.setup },
  ];

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {showIntro && <CinematicIntro onDone={() => setShowIntro(false)} />}
      <div id="__next_cover" style={{
        position:"fixed",inset:0,background:"#060407",
        zIndex:99997,display:"flex",alignItems:"center",justifyContent:"center",
        pointerEvents:"none"
      }} />
      <div className="app">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <meta property="og:title" content="Sverige TV — 20 000+ kanaler, 4K & Sport" />
        <meta property="og:description" content="Sveriges #1 TV-tjänst. 20 000+ kanaler, 100 000+ filmer & serier. Från 83 kr/mån. Aktivering på 10 min via WhatsApp." />
        <meta property="og:image" content="https://sverigetv.se/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://sverigetv.se" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Sverige TV" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sverige TV — 20 000+ kanaler" />
        <meta name="twitter:description" content="Sveriges #1 TV-tjänst. Från 83 kr/mån." />
        <meta name="twitter:image" content="https://sverigetv.se/og-image.jpg" />
        <title>Sverige TV — 20 000+ kanaler, 4K, Sport &amp; Film</title>
        <meta name="description" content="Sveriges #1 TV-tjänst. 20 000+ live-kanaler, 4K/UHD, sport, filmer och serier. Aktivering på 10 min via WhatsApp. Fungerar på Firestick, Smart TV, iPhone och Android." />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#060407" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Sverige TV" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        <div className="bg" />

        {/* TOP BAR */}
        <div className="topBar">
          <div className="topBarInner">
            <span><span className="greenDot" /> {t.top.status}</span>
            <span className="urgency">{t.top.urgency}</span>
          </div>
        </div>

        {/* HEADER */}
        <header className="header">
          <nav className="nav">
            <a href="#" className="brand"><SverigeLogo size={34} showText={true} /></a>
            <div className="links">
              {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
              <div className="langSwitch">
                {(["sv", "en", "fr"] as Locale[]).map(l => (
                  <button key={l} className={`langBtn ${lang === l ? "active" : ""}`} onClick={() => setLang(l)} type="button">
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              {installPrompt && (
                <button onClick={handleInstallClick} className="installBtn" type="button">📲 {t.nav.install}</button>
              )}
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Meny" type="button">
              {menuOpen ? "✕" : "☰"}
            </button>
          </nav>
        </header>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobileMenu" onClick={() => setMenuOpen(false)}>
            <div className="mobileMenuLogo"><SverigeLogo size={40} showText={true} /></div>
            {navLinks.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
            <div className="mobileLangSwitch">
              {(["sv", "en", "fr"] as Locale[]).map(l => (
                <button key={l} className={`langBtn ${lang === l ? "active" : ""}`} onClick={e => { e.stopPropagation(); setLang(l); setMenuOpen(false); }} type="button">
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a className="btnPrimary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Mobile-Menu")} target="_blank" rel="noreferrer" style={{ textAlign: "center", marginTop: 8 }}>
              💬 WhatsApp
            </a>
          </div>
        )}

        <main className="main">
          {/* HERO */}
          <section className="hero">
            <div className="heroContent">
              <div className="heroLogo"><SverigeLogo size={52} showText={false} /></div>
              <p className="pill">{t.hero.pill}</p>
              <h1>
                {t.hero.titleA}<br />
                <span className="accent">{t.hero.titleB}</span>
              </h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="actions">
                <a className="btnPrimary" href="#offers">{t.hero.ctaPrices}</a>
                <a className="btnSecondary" href={generateWhatsAppLink(t.whatsapp.generic, ua, "Hero-Generic")} target="_blank" rel="noreferrer">
                  {t.hero.ctaAdvisor}
                </a>
              </div>
              <div className="heroTrust">{t.hero.trust}</div>
            </div>
          </section>

          {/* TRIAL BANNER */}
          <TrialBanner ua={ua} />

          {/* TRUST SECTION */}
          <TrustSection />

          {/* OFFERS */}
          <section id="offers" className="section">
            <div className="sectionHead">
              <h2>{t.offers.title}</h2>
              <p>{t.offers.sub}</p>
            </div>
            <div className="grid">
              {plans.map(p => {
                const pricePerMonth = Math.round(p.price / p.months);
                const saving = Math.round((1 - pricePerMonth / 120) * 100);
                return (
                  <article key={p.key} className={`card ${p.highlight ? "highlight" : ""}`}>
                    {saving > 0 && (
                      <div className="saveBadge">{t.offers.save} {saving}%</div>
                    )}
                    <div className="cardHeader">
                      <h3>{t.planNames[p.key]}</h3>
                      {p.highlight && <span className="bestSellerBadge">{t.offers.bestSeller}</span>}
                    </div>
                    <div className="priceLockup">
                      <span className="currency">{SITE.currencyLabel}</span>
                      <span className="bigNumber">{pricePerMonth}</span>
                      <span className="perMonth">{t.offers.perMonth}</span>
                    </div>
                    <div className="billedInfo">
                      {t.offers.billedOnce} {p.price} {SITE.currencyLabel}{p.months > 1 && ` (${t.offers.totalLabel})`}
                    </div>
                    <ul className="perks">
                      {t.planPerks[p.key].map(perk => (
                        <li key={perk}><span className="check">✓</span> {perk}</li>
                      ))}
                    </ul>
                    <a className="btnPlan" href={generateWhatsAppLink(t.whatsapp.orderMessage(t.planNames[p.key], p.price, SITE.currencyLabel), ua, `Plan-${p.key}`)} target="_blank" rel="noreferrer">
                      {t.offers.order}
                    </a>
                  </article>
                );
              })}
            </div>
          </section>

          {/* VOD STATS */}
          <VODSection />

          {/* COMPARE */}
          <CompareSection />

          {/* CHANNEL EXPLORER */}
          <ChannelExplorer />

          {/* COUNTRIES SECTION — NEW from code 2 */}
          <CountriesSection ua={ua} />

          {/* DEVICE SECTION */}
          <DeviceSection ua={ua} />

          {/* REVIEWS */}
          <ReviewsSection />

          {/* CITIES */}
          <SwedenCities ua={ua} />

          {/* QUICK SETUP */}
          <QuickSetup ua={ua} />

          {/* FAQ */}
          <section id="faq" className="section">
            <div className="sectionHead"><h2>{t.faq.title}</h2></div>
            <div className="faq">
              {t.faq.items.map((f, i) => (
                <details key={i} className="faqItem">
                  <summary className="faqSummary">{f.q}</summary>
                  <p className="faqAnswer">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footerLogo"><SverigeLogo size={32} showText={true} /></div>
          <p>© {new Date().getFullYear()} {SITE.brand}. {t.footer.rights}</p>
          <p style={{ marginTop: 6 }}>{t.footer.note}</p>
          <div className="footerLinks">
            <a href="#faq">{t.footer.legal}</a>
            <a href="#faq">{t.footer.privacy}</a>
            <a href="#faq">{t.footer.terms}</a>
            <a href="#faq">{t.footer.refund}</a>
          </div>
        </footer>

        {showPWABar && (
          <div className="pwaBar">
            <span className="pwaIcon">📲</span>
            <div className="pwaText">
              <strong>{lang === "sv" ? "Installera som app" : lang === "en" ? "Install as app" : "Installer comme app"}</strong>
              <span>{lang === "sv" ? "Snabbare åtkomst, offline-support" : lang === "en" ? "Faster access, offline support" : "Accès rapide, hors-ligne"}</span>
            </div>
            <button className="pwaAccept" onClick={handleInstallClick}>
              {lang === "sv" ? "Installera" : lang === "en" ? "Install" : "Installer"}
            </button>
            <button className="pwaDismiss" onClick={handlePWADismiss} aria-label="Stäng">✕</button>
          </div>
        )}
        {showIOSBar && (
          <div className="pwaBar pwaBarIOS">
            <span className="pwaIcon">📲</span>
            <div className="pwaText">
              <strong>{lang === "sv" ? "Installera som app" : lang === "en" ? "Add to Home Screen" : "Ajouter à l'écran"}</strong>
              <span>
                {lang === "sv" ? 'Tryck på' : lang === "en" ? 'Tap' : 'Appuyez sur'}{' '}
                <span className="iosShareIcon">⬆</span>{' '}
                {lang === "sv" ? 'sedan "Lägg till hemskärm"' : lang === "en" ? 'then "Add to Home Screen"' : "puis \"Sur l\u2019\u00e9cran d\u2019accueil\""}
              </span>
            </div>
            <button className="pwaDismiss" onClick={handleIOSDismiss} aria-label="Stäng">✕</button>
          </div>
        )}
        <LiveActivityWidget userAgent={ua} />
        <MoaChat userAgent={ua} />

        <style jsx global>{`
          :root {
            --bg: #020202;
            --card: #0b0b0d;
            --card-hi: #111114;
            --accent: #7c1326;
            --accent-hi: #9a1830;
            --accent-glow: rgba(124,19,38,0.38);
            --accent-faint: rgba(124,19,38,0.08);
            --fg: #f0eff0;
            --muted: #7a7a86;
            --muted-hi: #9898a4;
            --border: rgba(255,255,255,0.07);
            --border-hi: rgba(255,255,255,0.14);
            --border-accent: rgba(124,19,38,0.35);
            --gold: #c8a96e;
          }
          html {
            scroll-behavior: smooth;
            -webkit-text-size-adjust: 100%;
            background: #060407;
            overflow-x: hidden;
          }
          body {
            margin: 0;
            background: #060407;
            color: #f5f0f5;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            overscroll-behavior-y: contain;
          }
          *, *::before, *::after { box-sizing: border-box; }
          #__next_cover::after {
            content: "";
            width: 26px; height: 26px;
            border: 2px solid rgba(139,23,40,0.2);
            border-top-color: #7c1326;
            border-radius: 50%;
            animation: __spin 0.65s linear infinite;
          }
          @keyframes __spin { to { transform: rotate(360deg); } }
          .bg {
            position: fixed; inset: 0; z-index: -1;
            background:
              radial-gradient(ellipse 80% 40% at 50% -5%, #1a0409 0%, transparent 60%),
              radial-gradient(ellipse 100% 60% at 50% 100%, #0a0008 0%, transparent 70%),
              #020202;
          }
          .main { max-width: 1100px; margin: 0 auto; padding: 0 20px 80px; }
          .section { margin-bottom: 80px; }
          .sectionHead { text-align: center; margin-bottom: 40px; }
          .sectionHead h2 { font-size: 2rem; margin: 0 0 10px; }
          .sectionHead p { color: var(--muted); }

          /* TOP BAR */
          .topBar { background: #020103; font-size: 12px; border-bottom: 1px solid rgba(139,23,40,0.2); padding: 8px 0; }
          .topBarInner { max-width: 1100px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
          .greenDot { display: inline-block; width: 6px; height: 6px; background: #22c55e; border-radius: 50%; margin-right: 6px; box-shadow: 0 0 5px #22c55e; }
          .urgency { color: #fbbf24; font-weight: 700; }

          /* HEADER */
          .header { position: sticky; top: 0; z-index: 100; backdrop-filter: blur(16px) saturate(180%); -webkit-backdrop-filter: blur(16px) saturate(180%); background: rgba(6,4,7,0.92); border-bottom: 1px solid rgba(139,23,40,0.15); }
          .nav { max-width: 1100px; margin: 0 auto; padding: 15px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
          .brand { font-weight: 900; font-size: 1.2rem; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 8px; letter-spacing: -0.5px; transition: opacity 0.2s; }
          .brand:hover { opacity: 0.85; }
          .heroLogo { display: flex; justify-content: center; margin-bottom: 20px; filter: drop-shadow(0 0 18px rgba(139,23,40,0.5)); }
          .footerLogo { display: flex; justify-content: center; margin-bottom: 16px; opacity: 0.8; }
          .mobileMenuLogo { padding: 16px 0 8px; border-bottom: 1px solid rgba(255,255,255,0.06); margin-bottom: 8px; }
          .links { display: flex; gap: 18px; font-weight: 500; font-size: 14px; align-items: center; flex-wrap: wrap; justify-content: flex-end; }
          .links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
          .links a:hover { color: #fff; }
          .langSwitch { display: flex; align-items: center; gap: 8px; }
          .langBtn { background: none; border: 1px solid var(--border); cursor: pointer; padding: 4px 8px; border-radius: 6px; color: #fff; font-size: 12px; transition: 0.2s; }
          .langBtn.active { border-color: var(--accent-hi); background: rgba(139,23,40,0.18); }
          .installBtn { background: rgba(255,255,255,0.1); border: 1px solid var(--accent); color: #fff; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 700; }

          /* HAMBURGER */
          .hamburger { display: none; background: none; border: 1px solid var(--border); color: #fff; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-size: 16px; }
          .mobileMenu { position: fixed; inset: 0; background: rgba(6, 4, 7, 0.99); z-index: 99; display: flex; flex-direction: column; padding: 78px 24px max(40px, env(safe-area-inset-bottom, 40px)); gap: 4px; overflow-y: auto; -webkit-overflow-scrolling: touch; }
          .mobileMenu a { font-size: 18px; color: #fff; text-decoration: none; padding: 14px 0; border-bottom: 1px solid var(--border); display: block; }
          .mobileLangSwitch { display: flex; gap: 10px; padding: 16px 0; border-bottom: 1px solid var(--border); }

          /* HERO */
          .hero { padding: 80px 0 60px; text-align: center; }
          .heroContent { max-width: 780px; margin: 0 auto; }
          .pill { display: inline-block; padding: 6px 16px; border: 1px solid var(--border-accent); color: var(--gold); background: rgba(139,23,40,0.07); border-radius: 99px; font-size: 12px; font-weight: 700; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.5px; }
          h1 { font-size: clamp(2.2rem, 6vw, 4.2rem); line-height: 1.05; font-weight: 800; margin: 0 0 24px; letter-spacing: -1px; }
          .accent { background: linear-gradient(135deg, #f5f0f5 0%, var(--gold) 60%, #e0d0d0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .lead { color: var(--muted); font-size: 1.1rem; max-width: 620px; margin: 0 auto 32px; line-height: 1.6; }
          .actions { display: flex; gap: 12px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
          .btnPrimary { background: linear-gradient(135deg, var(--accent-hi) 0%, var(--accent) 100%); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 700; transition: transform 0.2s, box-shadow 0.2s; border: none; cursor: pointer; display: inline-block; letter-spacing: 0.01em; }
          .btnPrimary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px -6px var(--accent-glow); background: linear-gradient(135deg, var(--gold) 0%, var(--accent-hi) 100%); }
          .btnSecondary { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: background 0.2s; display: inline-block; }
          .btnSecondary:hover { background: rgba(255,255,255,0.1); }
          .heroTrust { color: var(--muted); font-size: 13px; font-weight: 500; line-height: 1.6; }

          /* TRIAL BANNER */
          .trialBanner { background: linear-gradient(135deg, rgba(139,23,40,0.1), rgba(100,10,25,0.05)); border: 1px solid rgba(139,23,40,0.28); border-radius: 16px; padding: 32px; margin-bottom: 80px; display: flex; gap: 24px; align-items: flex-start; flex-wrap: wrap; }
          .trialBadge { display: inline-flex; align-items: center; padding: 6px 14px; background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: #fff; font-size: 11px; font-weight: 800; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; flex-shrink: 0; height: fit-content; margin-top: 4px; }
          .trialContent { flex: 1; min-width: 220px; }
          .trialContent h3 { margin: 0 0 8px; font-size: 1.3rem; font-weight: 800; }
          .trialContent p { margin: 0 0 6px; color: var(--muted); font-size: 14px; line-height: 1.6; }
          .trialNote { font-size: 12px !important; opacity: 0.6; }
          .trialCta { display: inline-flex; align-items: center; background: #22c55e; color: #000; font-weight: 800; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-size: 14px; white-space: nowrap; transition: 0.2s; align-self: center; flex-shrink: 0; }
          .trialCta:hover { background: #16a34a; transform: translateY(-1px); }

          /* TRUST SECTION */
          .trustSection { margin-bottom: 80px; }
          .trustGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
          .trustCard { background: var(--card); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; text-align: center; transition: 0.2s; }
          .trustCard:hover { border-color: rgba(255,255,255,0.25); }
          .trustIcon { font-size: 28px; display: block; margin-bottom: 10px; }
          .trustCard h4 { margin: 0 0 6px; font-size: 13px; font-weight: 700; }
          .trustCard p { margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5; }

          /* OFFERS */
          .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; }
          .card { position: relative; background: var(--card); border: 1px solid rgba(255,255,255,0.06); padding: 32px 24px; border-radius: 16px; display: flex; flex-direction: column; transition: transform 0.3s, border-color 0.3s; }
          .card:hover { transform: translateY(-5px); border-color: rgba(139,23,40,0.3); box-shadow: 0 8px 30px rgba(100,10,25,0.15); }
          .card.highlight { border: 1px solid var(--border-accent); box-shadow: 0 0 40px rgba(139,23,40,0.14), 0 0 1px rgba(200,40,60,0.3); background: linear-gradient(180deg, rgba(139,23,40,0.09) 0%, rgba(14,11,15,0) 100%); }
          .saveBadge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: white; font-weight: 800; font-size: 11px; padding: 6px 14px; border-radius: 20px; box-shadow: 0 4px 14px rgba(139,23,40,0.5); z-index: 2; }
          .cardHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 10px; }
          .cardHeader h3 { margin: 0; font-size: 1.1rem; }
          .bestSellerBadge { font-size: 10px; background: #fbbf24; color: #000; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
          .priceLockup { display: flex; align-items: baseline; justify-content: center; line-height: 1; margin-bottom: 8px; }
          .currency { font-size: 1.2rem; font-weight: 500; margin-right: 4px; color: var(--muted); }
          .bigNumber { font-size: 3.8rem; font-weight: 800; letter-spacing: -2px; }
          .perMonth { font-size: 1rem; color: var(--muted); margin-left: 6px; }
          .billedInfo { text-align: center; color: var(--muted); font-size: 13px; margin-bottom: 24px; font-weight: 500; }
          .perks { list-style: none; padding: 0; margin: 0 0 24px 0; flex-grow: 1; }
          .perks li { padding: 8px 0; font-size: 14px; color: #e5e5e5; display: flex; gap: 10px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); }
          .perks li:last-child { border-bottom: none; }
          .check { color: var(--gold); font-weight: bold; }
          .btnPlan { display: block; width: 100%; text-align: center; background: #fff; color: #000; font-weight: 800; padding: 14px; border-radius: 8px; text-decoration: none; transition: 0.2s; }
          .btnPlan:hover { background: #e5e5e5; transform: scale(1.02); }
          .highlight .btnPlan { background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: white; box-shadow: 0 4px 18px rgba(139,23,40,0.45); }
          .highlight .btnPlan:hover { background: linear-gradient(135deg, var(--gold), var(--accent-hi)); }

          /* VOD STATS */
          .statsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; }
          .statCard { background: var(--card); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 28px 20px; text-align: center; }
          .statValue { font-size: 2rem; font-weight: 800; color: #fff; letter-spacing: -1px; }
          .statLabel { font-size: 13px; color: var(--muted); margin-top: 6px; }

          /* COMPARE TABLE */
          .compareWrap { overflow-x: auto; border-radius: 14px; border: 1px solid var(--border); }
          .compareTable { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 560px; }
          .compareTable thead tr { background: rgba(255,255,255,0.04); }
          .compareTable th { padding: 14px 16px; text-align: left; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); border-bottom: 1px solid var(--border); }
          .compareTable td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #ccc; }
          .highlightRow { background: rgba(139,23,40,0.1); }
          .highlightRow td { color: #fff; font-weight: 600; border-bottom: 1px solid rgba(139,23,40,0.2); }
          .accentPrice { color: var(--gold) !important; font-weight: 800 !important; font-size: 15px; }
          .serviceName { font-weight: 600; color: #fff; }
          .bestTag { color: #4ade80; font-weight: 900; }
          .compareTable tr:last-child td { border-bottom: none; }

          /* CHANNELS */
          .explorerBox { background: var(--card); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); }
          .tabs { display: flex; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); overflow-x: auto; }
          .tabBtn { flex: 1; padding: 16px; background: none; border: none; color: var(--muted); cursor: pointer; font-weight: 600; font-size: 14px; min-width: 100px; white-space: nowrap; }
          .tabBtn.active { color: white; background: rgba(255,255,255,0.04); border-bottom: 2px solid var(--accent-hi); }
          .channelList { padding: 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
          .channelItem { font-size: 13px; color: #ccc; display: flex; align-items: center; gap: 8px; }
          .more { color: var(--muted); font-style: italic; }

          /* ── COUNTRIES SECTION (NEW) ── */
          .countriesGrid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
          }
          .countryCard {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 11px;
            cursor: pointer;
            transition: all 0.2s;
            text-align: left;
            width: 100%;
            -webkit-tap-highlight-color: rgba(201,168,76,0.2);
          }
          .countryCard:hover {
            transform: translateY(-2px) translateX(2px);
            border-color: rgba(201,168,76,0.5);
            background: #130d18;
            box-shadow: 0 6px 24px rgba(0,0,0,0.5);
          }
          .countryCard:active { transform: scale(0.97); }
          .ctryFlag { font-size: 22px; flex-shrink: 0; }
          .ctryInfo { flex: 1; min-width: 0; overflow: hidden; }
          .ctryName { font-weight: 700; font-size: 14px; color: #f0ecf5; }
          .ctrySub { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
          .ctryArrow { color: rgba(201,168,76,0.5); font-size: 18px; flex-shrink: 0; transition: transform 0.2s; }
          .countryCard:hover .ctryArrow { transform: translateX(4px); color: #C9A84C; }

          /* COUNTRY MODAL */
          .countryModalOverlay {
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(0,0,0,0.82);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: flex-end;
            justify-content: center;
            animation: fadeIn 0.2s ease;
            overflow: hidden;
          }
          @media (min-width: 640px) {
            .countryModalOverlay { align-items: center; padding: 20px; }
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .countryModalBox {
            background: #0d0a12;
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 20px 20px 0 0;
            width: 100%;
            max-width: 680px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            animation: slideUp 0.3s ease;
          }
          @media (min-width: 640px) {
            .countryModalBox { border-radius: 20px; max-height: 88vh; }
          }
          .countryModalHd {
            padding: 20px 20px 0;
            display: flex;
            align-items: flex-start;
            gap: 14px;
            flex-shrink: 0;
            min-width: 0;
            overflow: hidden;
}
          .countryModalFlag { font-size: 44px; line-height: 1; flex-shrink: 0; }
          .countryModalTb { flex: 1; min-width: 0; overflow: hidden; overflow-wrap: break-word; }
          .countryModalTb h2 { font-size: 22px; font-weight: 800; color: #fff; margin: 0 0 4px; word-break: break-word; overflow-wrap: break-word; }
          .countryModalTb p { font-size: 13px; color: var(--muted); line-height: 1.5; margin: 0; word-break: break-word; overflow-wrap: break-word; white-space: normal; }
          .countryModalClose {
            background: rgba(255,255,255,0.08);
            border: none;
            border-radius: 50%;
            width: 36px; height: 36px;
            color: var(--muted);
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            cursor: pointer;
            transition: 0.15s;
          }
          .countryModalClose:hover { background: rgba(255,255,255,0.15); color: #f0ecf5; }
          .countryModalBd {
            overflow-y: auto;
            padding: 16px 20px 24px;
            flex: 1;
            min-width: 0;
            overflow-x: hidden;
          }
          .countryModalBd::-webkit-scrollbar { width: 4px; }
          .countryModalBd::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
          .countryModalSec { margin-bottom: 24px; }
          .countryModalSecTitle {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(201,168,76,0.7);
            margin-bottom: 12px;
          }
          .countryChGrid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 7px;
          }
          .countryChChip {
            background: #130d18;
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 8px;
            padding: 8px 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
          }
          .countryChChipGold {
            background: rgba(201,168,76,0.06);
            border-color: rgba(201,168,76,0.2);
          }
          .countryChName { font-size: 13px; font-weight: 600; color: #f0ecf5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
          .countryChIcon { font-size: 14px; }
          .countryKwWrap { display: flex; flex-wrap: wrap; gap: 7px; max-width: 100%; overflow: hidden; }
          .countryKwPill {
            background: rgba(0,106,167,0.1);
            border: 1px solid rgba(0,106,167,0.25);
            border-radius: 20px;
            padding: 5px 12px;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .countryKwText { font-size: 12px; color: rgba(240,236,245,0.75); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
          .countryKwVol { font-size: 11px; color: #4AB4E8; font-weight: 700; }
          .countryPriceBox {
            background: rgba(61,190,122,0.06);
            border: 1px solid rgba(61,190,122,0.2);
            border-radius: 12px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .countryModalFt {
            padding: 14px 20px 20px;
            border-top: 1px solid rgba(255,255,255,0.07);
            flex-shrink: 0;
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
          }
          /* ── END COUNTRIES ── */

          /* DEVICES */
          .deviceGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 16px; }
          .deviceCard { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px 12px; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: 0.2s; text-align: center; }
          .deviceCard:hover { border-color: rgba(255,255,255,0.25); transform: translateY(-3px); }
          .deviceIcon { font-size: 32px; }
          .deviceName { font-size: 13px; font-weight: 600; color: #ccc; }

          /* REVIEWS */
          .reviewsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
          .reviewCard { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 24px; display: flex; flex-direction: column; gap: 12px; }
          .reviewStars { font-size: 14px; letter-spacing: 1px; }
          .reviewText { margin: 0; font-size: 14px; color: #d4d4d8; line-height: 1.6; font-style: italic; flex: 1; }
          .reviewMeta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; }
          .reviewName { font-weight: 700; color: #fff; }
          .reviewCity { color: var(--muted); }
          .reviewPlan { margin-left: auto; background: rgba(139,23,40,0.12); border: 1px solid rgba(139,23,40,0.25); color: var(--gold); padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }

          /* CITIES */
          .cityText { color: var(--muted); line-height: 1.6; margin-bottom: 20px; }

          /* SETUP */
          .stepsGrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; }
          .stepCard { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
          .stepNumber { width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-hi), var(--accent)); display: flex; align-items: center; justify-content: center; font-weight: 800; margin-bottom: 14px; }
          .stepCard p { margin: 0; color: var(--muted); line-height: 1.6; }
          .stepsCtaWrap { display: flex; justify-content: center; margin-top: 24px; }

          /* FAQ */
          .faqItem { background: var(--card); border: 1px solid var(--border); border-radius: 12px; margin-bottom: 12px; }
          .faqItem[open] { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.2); }
          .faqSummary { padding: 18px; font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; font-size: 15px; }
          .faqSummary::-webkit-details-marker { display: none; }
          .faqSummary::after { content: "+"; font-size: 18px; color: var(--muted); }
          .faqItem[open] .faqSummary::after { content: "−"; }
          .faqAnswer { padding: 0 18px 18px; margin: 0; color: var(--muted); line-height: 1.6; font-size: 14px; }

          /* FOOTER */
          .footer { padding: 60px 20px; text-align: center; color: #555; font-size: 13px; border-top: 1px solid var(--border); margin-top: 80px; }
          .footerLinks { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
          .footerLinks a { color: #555; text-decoration: none; font-size: 12px; transition: color 0.2s; }
          .footerLinks a:hover { color: var(--muted); }

          /* CHAT FAB */
          .miliFab { position: fixed; bottom: 25px; left: 25px; background: #000; border: 1px solid rgba(255,255,255,0.2); padding: 0; border-radius: 30px; cursor: pointer; z-index: 1000; box-shadow: 0 10px 30px rgba(0,0,0,0.5); overflow: hidden; transition: transform 0.2s; }
          .miliFab:hover { transform: scale(1.05); }
          .fabContent { display: flex; align-items: center; padding: 6px 16px 6px 6px; gap: 12px; position: relative; }
          .fabAvatar { border-radius: 50%; border: 2px solid #3dbe7a; object-fit: cover; object-position: top center; background: #130810; }
          .fabText { font-weight: 700; font-size: 13px; color: #fff; }
          .fabPulse { position: absolute; top: 8px; left: 32px; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid #000; }
          .miliTeaser { position: fixed; bottom: 95px; left: 25px; width: 300px; background: rgba(20,20,20,0.95); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 10px 12px; z-index: 999; cursor: pointer; box-shadow: 0 12px 30px rgba(0,0,0,0.45); text-align: left; }
          .miliTeaserHead { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
          .miliTeaserAvatar { border-radius: 50%; object-fit: cover; object-position: top center; background: #130810; }
          .miliTeaserTitle { font-weight: 800; font-size: 12px; color: #fff; }
          .miliTeaserLines { display: flex; flex-direction: column; gap: 5px; }
          .miliTeaserLine { font-size: 12px; color: #d4d4d8; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .miliBadge { background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: #fff; font-weight: 900; font-size: 11px; padding: 2px 7px; border-radius: 999px; margin-left: auto; }
          .miliBadgeFab { position: absolute; top: -6px; right: -6px; margin-left: 0; }
          .miliBox { position: fixed; bottom: 85px; left: 25px; width: 320px; max-height: 75vh; background: #18181b; border: 1px solid var(--border); border-radius: 16px; z-index: 1000; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5); animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; }
          @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          .miliHeader { padding: 16px; background: #27272a; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .miliClose { background: none; border: 1px solid rgba(255,255,255,0.12); color: #fff; width: 34px; height: 34px; border-radius: 10px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
          .headerAvatarWrapper { position: relative; }
          .headerAvatar { border-radius: 50%; object-fit: cover; object-position: top center; background: #130810; }
          .onlineIndicator { position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; border: 2px solid #27272a; }
          .miliBody { display: flex; flex-direction: column; min-height: 0; flex: 1; }
          .miliMsgs { flex: 1; min-height: 0; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
          .miliMsgBot { align-self: flex-start; background: #3f3f46; color: #fff; padding: 10px 14px; border-radius: 12px 12px 12px 2px; font-size: 14px; line-height: 1.4; max-width: 85%; }
          .miliMsgUser { align-self: flex-end; background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: white; padding: 10px 14px; border-radius: 12px 12px 2px 12px; font-size: 14px; max-width: 85%; }
          .quickReplies { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 12px 0; }
          .quickReply { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 6px 12px; border-radius: 16px; font-size: 12px; cursor: pointer; transition: 0.15s; white-space: nowrap; }
          .quickReply:hover { background: rgba(255,255,255,0.14); }
          .miliInputRow { display: flex; padding: 12px; border-top: 1px solid rgba(255,255,255,0.1); background: #27272a; gap: 8px; }
          .miliInputRow input { flex: 1; background: #18181b; border: 1px solid #3f3f46; border-radius: 20px; padding: 8px 12px; color: white; outline: none; font-size: 14px; }
          .miliInputRow button { background: none; border: none; color: var(--gold); font-weight: bold; font-size: 18px; cursor: pointer; padding: 0; }
          .typingIndicator { padding: 0 16px 8px; font-size: 20px; color: #666; display: flex; gap: 2px; line-height: 10px; }
          .typingIndicator span { animation: blink 1.4s infinite both; }
          .typingIndicator span:nth-child(2) { animation-delay: 0.2s; }
          .typingIndicator span:nth-child(3) { animation-delay: 0.4s; }
          @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }

          /* LIVE BADGE */
          .liveBadge { position: fixed; bottom: 25px; right: 25px; background: rgba(255,255,255,0.08); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 99px; color: #fff; cursor: pointer; z-index: 1000; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
          .liveBadge:hover { background: rgba(255,255,255,0.15); }
          .liveDot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; animation: pulseLive 2s infinite; flex-shrink: 0; }
          @keyframes pulseLive { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
          .liveBadgeText { font-weight: 700; font-size: 13px; }
          .livePanel { position: fixed; bottom: 80px; right: 25px; width: 260px; background: #18181b; border: 1px solid var(--border); border-radius: 16px; padding: 16px; z-index: 1000; animation: slideUp 0.3s; }
          .liveHead { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-bottom: 10px; }
          .liveSub { font-size: 11px; color: var(--muted); margin-top: 3px; }
          .liveStats { margin-bottom: 12px; }
          .liveRow { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; color: #e4e4e7; }
          .liveCta { width: 100%; background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 700; cursor: pointer; }
          .liveToast { position: fixed; bottom: 85px; right: 25px; background: rgba(20,20,20,0.97); backdrop-filter: blur(12px); border: 1px solid var(--border-accent); border-left: 4px solid var(--accent-hi); padding: 14px 16px; border-radius: 8px; display: flex; align-items: center; gap: 12px; z-index: 1100; animation: slideLeft 0.4s cubic-bezier(0.175,0.885,0.32,1.275); width: 300px; }
          @keyframes slideLeft { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          .liveToastTitle { font-weight: 800; font-size: 13px; color: #fff; margin-bottom: 2px; }
          .liveToastSub { font-size: 12px; color: #ccc; }
          .liveToastBtn { margin-left: auto; background: rgba(255,255,255,0.1); border: none; color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; cursor: pointer; }

          /* ── RESPONSIVE ── */
          @media (max-width: 900px) {
            .links a { display: none; }
            .langSwitch { display: none; }
            .installBtn { display: none; }
            .hamburger { display: flex; }
          }
          @media (max-width: 640px) {
            .main { padding: 0 16px env(safe-area-inset-bottom, 100px); padding-bottom: max(120px, env(safe-area-inset-bottom, 0px) + 100px); }
            .section { margin-bottom: 52px; }
            .sectionHead { margin-bottom: 28px; }
            .sectionHead h2 { font-size: 1.55rem; }
            .topBarInner { flex-direction: column; gap: 4px; font-size: 11px; }
            .urgency { font-size: 11px; }
            .nav { padding: 12px 16px; }
            .brand { font-size: 1rem; }
            .hero { padding: 44px 0 36px; }
            h1 { font-size: clamp(1.9rem, 9vw, 2.8rem); letter-spacing: -0.5px; margin-bottom: 16px; }
            .pill { font-size: 10px; padding: 5px 12px; margin-bottom: 16px; }
            .lead { font-size: 0.95rem; margin-bottom: 24px; }
            .actions { gap: 10px; flex-direction: column; align-items: center; }
            .btnPrimary, .btnSecondary { width: 100%; max-width: 320px; padding: 16px 24px; font-size: 15px; text-align: center; }
            .heroTrust { font-size: 11px; padding: 0 8px; }
            .trialBanner { flex-direction: column; align-items: stretch; padding: 20px 16px; gap: 16px; }
            .trialCta { text-align: center; justify-content: center; padding: 16px 20px; font-size: 15px; }
            .trustGrid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
            .trustCard { padding: 14px 10px; }
            .trustIcon { font-size: 22px; margin-bottom: 7px; }
            .trustCard h4 { font-size: 12px; }
            .trustCard p { font-size: 11px; }
            .grid { grid-template-columns: 1fr; gap: 20px; }
            .card { padding: 24px 18px; }
            .bigNumber { font-size: 3.2rem; }
            .statsGrid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
            .statCard { padding: 20px 14px; }
            .statValue { font-size: 1.7rem; }
            .compareWrap { border-radius: 10px; }
            .compareTable { font-size: 11px; min-width: 420px; }
            .compareTable th, .compareTable td { padding: 10px 8px; }
            .tabBtn { font-size: 12px; padding: 12px 10px; min-width: 80px; }
            .channelList { padding: 16px; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
            /* Countries mobile — FIXED */
            .countriesGrid { grid-template-columns: repeat(2, 1fr); }
            .countryModalFlag { font-size: 32px; }
            .countryModalHd { gap: 10px; padding: 16px 16px 0; }
            .countryModalTb h2 { font-size: 18px; }
            .countryModalTb p { font-size: 12px; }
            .countryModalClose { width: 32px; height: 32px; font-size: 15px; }
            .countryModalBd { padding: 12px 16px 20px; }
            .countryChGrid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
            .countryChChip { padding: 7px 10px; }
            .countryChName { font-size: 12px; }
            .countryPriceBox { padding: 12px 14px; gap: 10px; }
            .countryModalFt { flex-direction: column; padding: 12px 16px 16px; }
            .countryModalFt a { min-width: unset; width: 100%; }
            .deviceGrid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
            .deviceCard { padding: 14px 8px; gap: 6px; }
            .deviceIcon { font-size: 24px; }
            .deviceName { font-size: 11px; }
            .reviewsGrid { grid-template-columns: 1fr; gap: 14px; }
            .reviewCard { padding: 18px; }
            .stepsGrid { grid-template-columns: 1fr; gap: 14px; }
            .faqSummary { padding: 15px; font-size: 14px; }
            .footer { padding: 40px 16px; }
            .footerLinks { gap: 14px; }
            .liveBadge { display: none; }
            .liveToast { bottom: max(16px, env(safe-area-inset-bottom, 0px)); left: 12px; right: 12px; width: auto; }
            .miliFab { bottom: max(16px, env(safe-area-inset-bottom, 0px)); left: auto; right: 16px; border-radius: 999px; }
            .miliTeaser { bottom: max(88px, env(safe-area-inset-bottom, 0px) + 72px); left: auto; right: 16px; width: min(300px, calc(100vw - 32px)); }
            .miliBox { bottom: max(88px, env(safe-area-inset-bottom, 0px) + 72px); left: 12px; right: 12px; width: auto; max-height: 72vh; }
            .fabText { display: none; }
            .fabContent { padding: 8px; gap: 0; }
            .pwaBar { left: 12px; right: 12px; bottom: max(12px, env(safe-area-inset-bottom, 0px)); width: auto; }
          }
          @media (hover: none) {
            .btnPrimary, .btnSecondary, .btnPlan, .trialCta,
            .tabBtn, .faqSummary, .quickReply, .hamburger,
            .countryCard { min-height: 48px; }
          }
          @media (prefers-reduced-motion: reduce) {
            .miliBox, .liveToast, .miliFab, .liveDot, .urgency, .installBtn,
            .countryModalBox, .countryModalOverlay { animation: none; transition: none; }
            .typingIndicator span { animation: none; }
          }

          /* ── CINEMATIC INTRO ── */
          .cinWrap { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; flex-direction: column; overflow: hidden; }
          .cinWrap.cinExit { animation: cinFadeOut 0.42s cubic-bezier(0.4,0,1,1) forwards; }
          @keyframes cinFadeOut { to { opacity: 0; transform: scale(1.04); } }
          .cinBg { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 40%, #001830 0%, #000810 55%, #000000 100%); }
          .cinVignette { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%); pointer-events: none; }
          .cinParticles { position: absolute; inset: 0; pointer-events: none; }
          .cinParticle { position: absolute; border-radius: 50%; background: #FECC02; animation: cinFloat linear infinite; }
          @keyframes cinFloat { 0% { transform: translateY(0) scale(1); opacity: 0; } 8% { opacity: 0.55; } 90% { opacity: 0.3; } 100% { transform: translateY(-105vh) scale(0.4); opacity: 0; } }
          .cinLensFlare { position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(254,204,2,0.04), rgba(254,204,2,0.09), rgba(254,204,2,0.04), transparent); animation: cinLens 0.7s ease-out 1.0s forwards; pointer-events: none; }
          @keyframes cinLens { to { left: 140%; } }
          .cinEmblemWrap { position: relative; margin-bottom: 28px; }
          .cinEmblemGlow { position: absolute; inset: -30px; border-radius: 50%; background: radial-gradient(ellipse, rgba(254,204,2,0.18) 0%, transparent 70%); animation: cinGlowPulse 2s ease-in-out 1.1s infinite; }
          @keyframes cinGlowPulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
          .cinSvg { position: relative; z-index: 1; }
          .cinShieldFill { opacity: 0; animation: cinFadeIn 0.3s ease 0.88s forwards; }
          .cinShieldBorder { stroke-dasharray: 700; stroke-dashoffset: 700; animation: cinDraw 0.82s cubic-bezier(0.4,0,0.2,1) 0.15s forwards; }
          .cinShieldBorderGlow { opacity: 0; animation: cinFadeIn 0.25s ease 0.88s forwards; }
          @keyframes cinDraw { to { stroke-dashoffset: 0; } }
          @keyframes cinFadeIn { to { opacity: 1; } }
          .cinCrown { opacity: 0; transform-origin: center bottom; }
          .cinCrown1 { animation: cinCrownPop 0.32s cubic-bezier(0.34,1.56,0.64,1) 1.18s forwards; }
          .cinCrown2 { animation: cinCrownPop 0.32s cubic-bezier(0.34,1.56,0.64,1) 1.38s forwards; }
          .cinCrown3 { animation: cinCrownPop 0.32s cubic-bezier(0.34,1.4,0.64,1) 1.55s forwards; }
          @keyframes cinCrownPop { 0% { opacity: 0; transform: scale(0) translateY(4px) rotate(-6deg); } 60% { opacity: 1; } 100% { opacity: 1; transform: scale(1) translateY(0) rotate(0); } }
          .cinContent { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0; }
          .cinTitleWrap { margin-bottom: 14px; }
          .cinTitle { font-size: clamp(2.4rem, 8vw, 5rem); font-weight: 900; letter-spacing: 0.32em; color: #FECC02; text-shadow: 0 0 32px rgba(254,204,2,0.7), 0 0 64px rgba(254,204,2,0.28); margin: 0 0 8px; opacity: 0; animation: cinTitleIn 0.48s cubic-bezier(0.16,1,0.3,1) 1.72s forwards; }
          @keyframes cinTitleIn { 0% { opacity: 0; letter-spacing: 0.6em; transform: scale(1.04); filter: blur(6px); } 65% { filter: blur(0); } 100% { opacity: 1; letter-spacing: 0.32em; transform: scale(1); filter: blur(0); } }
          .cinTitleLine { height: 1px; background: linear-gradient(90deg, transparent, #FECC02, transparent); width: 0; margin: 0 auto; animation: cinLineExpand 0.38s ease 2.02s forwards; }
          @keyframes cinLineExpand { to { width: 220px; } }
          .cinTagline { font-size: 0.88rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.62); font-weight: 400; margin: 0 0 8px; opacity: 0; animation: cinFadeUp 0.35s ease 2.2s forwards; }
          .cinSub { font-size: 11px; letter-spacing: 0.08em; color: rgba(254,204,2,0.5); margin: 0; opacity: 0; animation: cinFadeUp 0.3s ease 2.42s forwards; }
          @keyframes cinFadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          .cinSkip { position: absolute; bottom: 28px; right: 20px; background: rgba(0,0,0,0.35); border: 1px solid rgba(254,204,2,0.2); color: rgba(254,204,2,0.45); font-size: 12px; letter-spacing: 0.08em; padding: 8px 18px; border-radius: 20px; cursor: pointer; transition: border-color 0.18s, color 0.18s, background 0.18s; z-index: 10; min-height: 40px; opacity: 0; animation: cinFadeIn 0.3s ease 0.6s forwards; }
          .cinSkip:hover { border-color: #FECC02; color: #FECC02; background: rgba(254,204,2,0.06); }
          @media (prefers-reduced-motion: reduce) { .cinWrap { display: none !important; } }

          /* ── PWA INSTALL BAR ── */
          .pwaBar { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); width: min(460px, calc(100vw - 32px)); background: var(--card-hi); border: 1px solid var(--border-accent); border-radius: 14px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; z-index: 1050; box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 1px rgba(139,23,40,0.4); animation: pwaSlideUp 0.4s cubic-bezier(0.16,1,0.3,1); }
          @keyframes pwaSlideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
          .pwaIcon { font-size: 24px; flex-shrink: 0; }
          .pwaText { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
          .pwaText strong { font-size: 13px; font-weight: 700; color: var(--fg); }
          .pwaText span { font-size: 11px; color: var(--muted); }
          .pwaAccept { background: linear-gradient(135deg, var(--accent-hi), var(--accent)); color: #fff; border: none; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: 0.15s; }
          .pwaAccept:hover { background: linear-gradient(135deg, var(--gold), var(--accent-hi)); }
          .pwaDismiss { background: none; border: none; color: var(--muted); font-size: 14px; cursor: pointer; padding: 4px 6px; flex-shrink: 0; transition: color 0.15s; }
          .pwaDismiss:hover { color: var(--fg); }
          .pwaBarIOS { bottom: max(80px, env(safe-area-inset-bottom, 0px) + 70px); }
          .iosShareIcon { display: inline-block; background: rgba(254,204,2,0.15); border: 1px solid rgba(254,204,2,0.3); border-radius: 4px; padding: 1px 5px; font-size: 11px; color: #FECC02; margin: 0 1px; vertical-align: middle; }
        `}</style>
      </div>
    </LanguageContext.Provider>
  );
}
