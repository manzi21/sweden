"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */
const SITE = {
  domain: "https://sverigetv.se",
  brand: "Sverige TV",
  whatsappPhone: "447307410512",
  currencyLabel: "kr",
};

const plans = [
  { key: "p1", price: 120, months: 1, currency: "SEK", priceValidUntil: "2027-12-31" },
  { key: "p3", price: 250, months: 3, currency: "SEK", highlight: true, priceValidUntil: "2027-12-31" },
  { key: "p6", price: 350, months: 6, currency: "SEK", priceValidUntil: "2027-12-31" },
  { key: "p12", price: 600, months: 12, currency: "SEK", priceValidUntil: "2027-12-31" },
];

const channelPreview = [
  { country: "🇸🇪 Sverige", channels: ["SVT 1 HD", "SVT 2 HD", "TV4 HD", "Kanal 5 HD", "TV3 HD", "C More Sport", "Viasat Premier", "TV4 Sport", "SVT Play Live", "Kanal 9"] },
  { country: "🌍 Norden", channels: ["NRK 1 (Norge)", "NRK Sport", "DR1 (Danmark)", "Yle TV1 (Finland)", "TV 2 Norge", "TV2 Danmark", "MTV Finland", "SVT World"] },
  { country: "⚽ Sport & Film", channels: ["Sky Sports HD", "beIN Sports 4K", "ESPN HD", "Eurosport 4K", "Canal+ 4K", "HBO Max", "Discovery+", "Nat Geo Wild"] },
  { country: "🌐 International", channels: ["BBC One HD", "TF1 France", "NBC USA", "Al Jazeera", "DW News", "CNBC", "CNN International", "Disney Channel"] },
];

const DEVICE_LIST = [
  { name: "Smart TV", icon: "📺", desc: "Samsung, LG, Sony" },
  { name: "Firestick", icon: "🔥", desc: "Fire TV & Stick" },
  { name: "iPhone & iPad", icon: "📱", desc: "iOS 14+" },
  { name: "Android", icon: "🤖", desc: "Telefon & Surfplatta" },
  { name: "PC & Mac", icon: "💻", desc: "Windows & macOS" },
  { name: "Android TV Box", icon: "📦", desc: "Nvidia, Xiaomi" },
  { name: "MAG Box", icon: "📡", desc: "MAG 250+" },
];

const COUNTRIES = [
  { slug:"arabisk",flag:"🇸🇦",name:"عربي",sub:"MBC, Al Jazeera, beIN Sports",desc:"Fullständigt arabiskt kanalpaket — MBC, Al Jazeera, beIN Sports 4K, OSN, Rotana.",wa:"Hej! Jag vill ha arabiska kanaler i Sverige.",channels:[{n:"MBC 1",c:"🎬"},{n:"MBC 2",c:"🎬"},{n:"MBC Drama",c:"📺"},{n:"Al Jazeera",c:"📰"},{n:"Al Arabiya",c:"📰"},{n:"beIN Sports 1 4K",c:"⚽"},{n:"beIN Sports 2",c:"⚽"},{n:"OSN Sports",c:"⚽"},{n:"Rotana Cinema",c:"🎬"},{n:"Rotana Drama",c:"📺"},{n:"Dubai TV",c:"🎬"},{n:"Abu Dhabi TV",c:"📰"},{n:"Saudi 1",c:"🎬"},{n:"LBC Lebanon",c:"🎬"},{n:"BBC Arabic",c:"📰"},{n:"France 24 عربي",c:"📰"},{n:"Nile Drama",c:"📺"},{n:"MTV Lebanon",c:"🎵"}]},
  { slug:"turkisk",flag:"🇹🇷",name:"Türkçe",sub:"TRT, Show TV, Kanal D",desc:"Alla turkiska favoritkanaler — TRT, Show TV, Kanal D, diziler och sport.",wa:"Hej! Jag vill ha turkiska kanaler i Sverige.",channels:[{n:"TRT 1",c:"🎬"},{n:"TRT Haber",c:"📰"},{n:"TRT Spor",c:"⚽"},{n:"Show TV",c:"🎬"},{n:"Kanal D",c:"🎬"},{n:"Star TV",c:"🎬"},{n:"ATV",c:"🎬"},{n:"FOX Türkiye",c:"🎬"},{n:"Habertürk",c:"📰"},{n:"CNN Türk",c:"📰"},{n:"beIN Sports TR",c:"⚽"},{n:"A Spor",c:"⚽"}]},
  { slug:"exyu",flag:"🇧🇦",name:"ExYu",sub:"Pink, RTS, HRT, Arena Sport",desc:"Bosniska, serbiska, kroatiska kanaler — sport, serier, nyheter.",wa:"Hej! Jag vill ha ExYu kanaler i Sverige.",channels:[{n:"Pink 1",c:"🎬"},{n:"RTS 1 Srbija",c:"🎬"},{n:"HRT 1 Hrvatska",c:"🎬"},{n:"FTV BiH",c:"🎬"},{n:"Arena Sport 1 HD",c:"⚽"},{n:"Arena Sport 2 HD",c:"⚽"},{n:"Prva TV",c:"🎬"},{n:"N1 Balkan",c:"📰"}]},
  { slug:"somalisk",flag:"🇸🇴",name:"Somali",sub:"Universal TV, Horn Cable",desc:"Somaliska kanaler — Universal TV, Horn Cable TV, SBC.",wa:"Hej! Jag vill ha somaliska kanaler i Sverige.",channels:[{n:"Universal TV",c:"🎬"},{n:"Horn Cable TV",c:"📰"},{n:"SBC Somalia",c:"🎬"},{n:"Goobjoog TV",c:"📰"},{n:"BBC Somali",c:"📰"}]},
  { slug:"persisk",flag:"🇮🇷",name:"فارسی",sub:"Manoto, GEM TV, VOA",desc:"Iranska kanaler — Manoto, GEM TV, Iran International.",wa:"Hej! Jag vill ha persiska kanaler i Sverige.",channels:[{n:"Manoto TV",c:"🎬"},{n:"GEM TV",c:"🎬"},{n:"VOA Persian",c:"📰"},{n:"Iran International",c:"📰"},{n:"BBC Persian",c:"📰"},{n:"Farsi1",c:"🎬"}]},
  { slug:"kurdisk",flag:"🏳️",name:"Kurdî",sub:"Rudaw, Kurdistan 24, NRT",desc:"Kurdiska TV-kanaler — Rudaw, Kurdistan 24, NRT, K24.",wa:"Hej! Jag vill ha kurdiska kanaler i Sverige.",channels:[{n:"Rudaw",c:"📰"},{n:"Kurdistan 24",c:"📰"},{n:"NRT TV",c:"🎬"},{n:"K24",c:"📰"},{n:"KTV Kurdistan",c:"🎬"}]},
  { slug:"polsk",flag:"🇵🇱",name:"Polski",sub:"TVP, Polsat, TVN",desc:"Polska TV-kanaler — TVP, Polsat, TVN, Canal+.",wa:"Hej! Jag vill ha polska kanaler i Sverige.",channels:[{n:"TVP 1",c:"🎬"},{n:"TVP 2",c:"🎬"},{n:"Polsat",c:"🎬"},{n:"TVN",c:"🎬"},{n:"TVN 24",c:"📰"},{n:"Canal+ Sport PL",c:"⚽"}]},
  { slug:"finsk",flag:"🇫🇮",name:"Suomi",sub:"Yle, MTV3, Nelonen",desc:"Finska TV-kanaler — Yle, MTV3, Nelonen, Sub.",wa:"Hej! Jag vill ha finska kanaler i Sverige.",channels:[{n:"Yle TV1",c:"🎬"},{n:"Yle TV2",c:"🎬"},{n:"MTV3",c:"🎬"},{n:"Nelonen",c:"🎬"},{n:"C More Sport FI",c:"⚽"}]},
  { slug:"indisk",flag:"🇮🇳",name:"हिंदी",sub:"Star Plus, Zee TV, Sony",desc:"Indiska kanaler — Star Plus, Zee TV, Sony, Colors.",wa:"Hej! Jag vill ha indiska kanaler i Sverige.",channels:[{n:"Star Plus HD",c:"🎬"},{n:"Zee TV HD",c:"🎬"},{n:"Sony Entertainment",c:"🎬"},{n:"Colors TV",c:"🎬"},{n:"Star Sports 1",c:"⚽"},{n:"Aaj Tak",c:"📰"}]},
  { slug:"afrikansk",flag:"🌍",name:"Afrique",sub:"Canal+, RTS, TFM",desc:"Afrikanska kanaler — Canal+, RTS Sénégal, TFM, Nollywood.",wa:"Hej! Jag vill ha afrikanska kanaler i Sverige.",channels:[{n:"Canal+ Afrique",c:"🎬"},{n:"RTS 1 Sénégal",c:"🎬"},{n:"TFM Sénégal",c:"🎬"},{n:"AFROTV",c:"🎬"},{n:"Africa 24",c:"📰"},{n:"SuperSport Africa",c:"⚽"}]},
  { slug:"spansk",flag:"🇪🇸",name:"Español",sub:"TVE, Antena 3, Univision",desc:"Spanska kanaler — TVE, Antena 3, Univision, LaLiga.",wa:"Hej! Jag vill ha spanska kanaler i Sverige.",channels:[{n:"TVE 1",c:"🎬"},{n:"Antena 3",c:"🎬"},{n:"Telecinco",c:"🎬"},{n:"Univision",c:"🌎"},{n:"Canal+ LaLiga",c:"⚽"}]},
  { slug:"grekisk",flag:"🇬🇷",name:"Ελληνικά",sub:"ERT, MEGA, ANT1",desc:"Grekiska kanaler — ERT, MEGA, ANT1, Nova Sports.",wa:"Hej! Jag vill ha grekiska kanaler i Sverige.",channels:[{n:"ERT 1",c:"🎬"},{n:"MEGA Channel",c:"🎬"},{n:"ANT1",c:"🎬"},{n:"Nova Sports GR",c:"⚽"}]},
];

/* ═══════════════════════════════════════════════════════════════════════════
   UTILS
   ═══════════════════════════════════════════════════════════════════════════ */
function isMobileUA(ua) {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}
function waLink(message, ua, ref) {
  const suffix = ref ? ` | Ref: ${ref}` : "";
  const text = encodeURIComponent(message + suffix);
  return isMobileUA(ua)
    ? `https://wa.me/${SITE.whatsappPhone}?text=${text}`
    : `https://api.whatsapp.com/send?phone=${SITE.whatsappPhone}&text=${text}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL REVEAL HOOK
   ═══════════════════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════════════════════════════════
   COUNTDOWN — real deadline, not fake
   ═══════════════════════════════════════════════════════════════════════════ */
function useCountdown(targetDate) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return left;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO
   ═══════════════════════════════════════════════════════════════════════════ */
function SverigeLogo({ size = 36, showText = true }) {
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
      </g>
      {showText && (
        <>
          <text x="50" y="19" fontFamily="'Playfair Display', Georgia, serif" fontWeight="800" fontSize="13" letterSpacing="2.5" fill="#f5f0f5">SVERIGE</text>
          <line x1="50" y1="23" x2="205" y2="23" stroke="url(#lgCrown)" strokeWidth="0.7" opacity="0.6"/>
          <text x="50" y="35" fontFamily="'Playfair Display', Georgia, serif" fontWeight="900" fontSize="11" letterSpacing="6" fill="url(#lgCrown)">TV</text>
        </>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CINEMATIC INTRO — refined
   ═══════════════════════════════════════════════════════════════════════════ */
function CinematicIntro({ onDone }) {
  const [exiting, setExiting] = useState(false);
  const skip = useCallback(() => {
    setExiting(true);
    setTimeout(onDone, 420);
  }, [onDone]);

  useEffect(() => {
    const t = setTimeout(skip, 2800);
    return () => clearTimeout(t);
  }, [skip]);

  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: (i * 97 + 13) % 100,
    size: 1 + (i * 31) % 3,
    delay: ((i * 137) % 400) / 100,
    dur: 4 + ((i * 73) % 300) / 100,
  }));

  return (
    <div className={`cin ${exiting ? "cin--exit" : ""}`} onClick={skip}>
      <div className="cin__bg" />
      <div className="cin__vignette" />
      <div className="cin__particles" aria-hidden="true">
        {particles.map(p => (
          <span key={p.id} className="cin__p" style={{
            left: `${p.left}%`, bottom: "-4px",
            width: `${p.size}px`, height: `${p.size}px`,
            animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          }} />
        ))}
      </div>
      <div className="cin__content">
        <svg className="cin__shield" viewBox="0 0 200 200" width="160" height="160">
          <defs>
            <filter id="cg" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <path className="cin__shieldFill" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="#005A8E"/>
          <path className="cin__shieldBorder" d="M 16 16 L 184 16 L 184 118 Q 184 160 100 186 Q 16 160 16 118 Z" fill="none" stroke="#FECC02" strokeWidth="3.5" filter="url(#cg)" strokeLinecap="round" strokeLinejoin="round"/>
          {[[60,74],[140,74],[100,148]].map(([x,y],i) => (
            <g key={i} className={`cin__crown cin__crown--${i+1}`} transform={`translate(${x},${y})`}>
              <path d="M -22 16 L -22 2 L -17 2 L -17 -6 L -9 2 L 0 -16 L 9 2 L 17 -6 L 17 2 L 22 2 L 22 16 Z" fill="#FECC02" filter="url(#cg)"/>
              <circle cx="0" cy="-16" r="3.5" fill="#FECC02"/>
              <circle cx="-17" cy="-6" r="2.5" fill="#FECC02"/>
              <circle cx="17" cy="-6" r="2.5" fill="#FECC02"/>
            </g>
          ))}
        </svg>
        <h1 className="cin__title">SVERIGE TV</h1>
        <div className="cin__line" />
        <p className="cin__tag">20 000+ kanaler • 4K/UHD • EPG</p>
      </div>
      <button className="cin__skip" type="button">Hoppa över ›</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COUNTDOWN BAR
   ═══════════════════════════════════════════════════════════════════════════ */
function CountdownBar() {
  const left = useCountdown("2026-06-30T23:59:59");
  return (
    <div className="cbar">
      <div className="cbar__inner">
        <span className="cbar__label">🎁 Lanseringspris slutar om</span>
        <div className="cbar__digits">
          {[
            [left.d, "d"], [left.h, "h"], [left.m, "m"], [left.s, "s"]
          ].map(([v, u]) => (
            <span key={u} className="cbar__unit">
              <span className="cbar__num">{String(v).padStart(2, "0")}</span>
              <span className="cbar__u">{u}</span>
            </span>
          ))}
        </div>
        <a className="cbar__cta" href="#offers">Se paket →</a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOCIAL PROOF TICKER — real review snippets, scrolling
   ═══════════════════════════════════════════════════════════════════════════ */
const PROOF_ITEMS = [
  "⭐⭐⭐⭐⭐ Erik L. — Stockholm: \"Sparar 250 kr/mån jämfört med Viaplay\"",
  "⭐⭐⭐⭐⭐ Fatima A. — Göteborg: \"Utmärkt kvalitet, alla arabiska kanaler\"",
  "⭐⭐⭐⭐⭐ Mohammed K. — Malmö: \"4K på Firestick utan buffring\"",
  "⭐⭐⭐⭐⭐ Lars P. — Västerås: \"Allsvenskan, Premier League, NHL — allt!\"",
  "⭐⭐⭐⭐⭐ Sofia N. — Stockholm: \"Perfekt på Samsung TV och iPhone\"",
  "🧪 1 200+ nöjda kunder i Sverige",
  "⚡ Genomsnittlig aktivering: 8 minuter",
];

function ProofTicker() {
  return (
    <div className="ticker">
      <div className="ticker__track">
        {[...PROOF_ITEMS, ...PROOF_ITEMS].map((t, i) => (
          <span key={i} className="ticker__item">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════════════════ */
function Hero({ ua }) {
  const [ref, vis] = useReveal(0.1);
  return (
    <section className="hero" ref={ref}>
      <div className="hero__glow" />
      <div className={`hero__content ${vis ? "vis" : ""}`}>
        <div className="hero__logo"><SverigeLogo size={52} showText={false} /></div>
        <div className="hero__pill">WhatsApp-support • 4K/UHD • 20 000+ kanaler • EPG</div>
        <h1 className="hero__title">
          Sveriges <span className="hero__num">#1</span> TV-tjänst
          <br />
          <span className="hero__accent">Snabbt. Stabilt. Enkelt.</span>
        </h1>
        <p className="hero__lead">
          Sluta betala för dyra Viaplay- och C More-abonnemang. 
          Få tillgång till <strong>20 000+ kanaler</strong>, sport, filmer och 100 000+ serier — allt från <strong>83 kr/mån</strong>.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--lg" href="#offers">
            Se våra paket
            <span className="btn__arrow">→</span>
          </a>
          <a className="btn btn--wa btn--lg" href={waLink("Hej! Jag vill testa Sverige TV gratis i 24 timmar.", ua, "Hero-Trial")} target="_blank" rel="noreferrer">
            <span className="btn__waIcon">💬</span>
            Gratis test 24h
          </a>
        </div>
        <div className="hero__trust">
          <div className="hero__trustStars">⭐⭐⭐⭐⭐</div>
          <span>4,9/5 från 1 200+ kunder</span>
          <span className="hero__sep">•</span>
          <span>Nöjd-kund-garanti</span>
          <span className="hero__sep">•</span>
          <span>Gratis test 24h</span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST STRIP (quick trust signals)
   ═══════════════════════════════════════════════════════════════════════════ */
function TrustStrip() {
  const items = [
    { icon: "🧪", label: "Gratis test 24h" },
    { icon: "⚡", label: "Aktiv på < 10 min" },
    { icon: "💬", label: "WhatsApp-support" },
    { icon: "🛡️", label: "Nöjd-kund-garanti" },
    { icon: "📺", label: "4K på alla paket" },
    { icon: "🌐", label: "Optimerat för SE" },
  ];
  return (
    <div className="tstrip">
      {items.map(it => (
        <div key={it.label} className="tstrip__item">
          <span className="tstrip__icon">{it.icon}</span>
          <span className="tstrip__label">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRICING SECTION — conversion-optimized
   ═══════════════════════════════════════════════════════════════════════════ */
function Pricing({ ua }) {
  const [ref, vis] = useReveal(0.08);
  return (
    <section id="offers" className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">Paket & Priser</span>
        <h2>Välj ditt paket</h2>
        <p>Alla paket inkluderar 20 000+ kanaler, VOD, EPG och WhatsApp-support.<br/>Beställ direkt via WhatsApp — aktivering på under 10 minuter.</p>
      </div>
      <div className={`pricing ${vis ? "vis" : ""}`}>
        {plans.map((p, idx) => {
          const ppm = Math.round(p.price / p.months);
          const saving = Math.round((1 - ppm / 120) * 100);
          const perks = {
            p1: ["20 000+ live-kanaler", "4K/UHD kvalitet", "EPG kanalguide", "WhatsApp-support", "Ingen bindningstid"],
            p3: ["Populäraste valet", "20 000+ live-kanaler", "100 000+ filmer & serier", "Prioriterad support", "Guidad installation"],
            p6: ["Mycket prisvärd", "20 000+ live-kanaler", "Multi-enhet stöd", "EPG + Catch-up TV", "Alla kanaler ingår"],
            p12: ["Bästa värdet", "Premium VIP-åtkomst", "20 000+ kanaler", "VIP-support 24/7", "Gratis uppgradering"],
          }[p.key];
          return (
            <article key={p.key} className={`pcard ${p.highlight ? "pcard--hi" : ""}`} style={{ animationDelay: `${idx * 0.1}s` }}>
              {p.highlight && <div className="pcard__ribbon">BÄSTSÄLJARE</div>}
              {saving > 0 && <div className="pcard__save">SPARA {saving}%</div>}
              <h3 className="pcard__name">
                {({ p1: "1 Månad", p3: "3 Månader", p6: "6 Månader", p12: "12 Månader" })[p.key]}
              </h3>
              <div className="pcard__price">
                <span className="pcard__cur">{SITE.currencyLabel}</span>
                <span className="pcard__big">{ppm}</span>
                <span className="pcard__per">/mån</span>
              </div>
              <div className="pcard__billed">
                {p.price} {SITE.currencyLabel}{p.months > 1 ? " engångskostnad" : ""}
              </div>
              <ul className="pcard__perks">
                {perks.map(pk => <li key={pk}><span className="pcard__check">✓</span>{pk}</li>)}
              </ul>
              <a
                className={`btn ${p.highlight ? "btn--primary" : "btn--outline"} btn--full`}
                href={waLink(`Hej! Jag vill beställa ${({ p1: "1 Månad", p3: "3 Månader", p6: "6 Månader", p12: "12 Månader" })[p.key]} (${p.price} ${SITE.currencyLabel}). Kan du hjälpa mig komma igång?`, ua, `Plan-${p.key}`)}
                target="_blank" rel="noreferrer"
              >
                Beställ via WhatsApp
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VOD STATS
   ═══════════════════════════════════════════════════════════════════════════ */
function VodStats() {
  const [ref, vis] = useReveal();
  const stats = [
    { value: "100 000+", label: "Filmer & serier", icon: "🎬" },
    { value: "20 000+", label: "Live-kanaler", icon: "📡" },
    { value: "4K/UHD", label: "Maximal kvalitet", icon: "✨" },
    { value: "< 10 min", label: "Aktiveringstid", icon: "⚡" },
  ];
  return (
    <section className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">On Demand</span>
        <h2>100 000+ filmer & serier</h2>
        <p>Nytt innehåll läggs till varje vecka. Titta när du vill, på valfri enhet.</p>
      </div>
      <div className={`stats ${vis ? "vis" : ""}`}>
        {stats.map((s, i) => (
          <div key={s.label} className="stat" style={{ animationDelay: `${i * 0.1}s` }}>
            <span className="stat__icon">{s.icon}</span>
            <div className="stat__val">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPARE TABLE
   ═══════════════════════════════════════════════════════════════════════════ */
function CompareTable() {
  const [ref, vis] = useReveal();
  const rows = [
    { service: "Viaplay Total", price: "329 kr", live: "~150", vod: true, hd4k: true, support: "Chat" },
    { service: "C More", price: "279 kr", live: "~80", vod: true, hd4k: false, support: "Chat" },
    { service: "Netflix", price: "179 kr", live: "0", vod: true, hd4k: true, support: "Chat" },
    { service: "Sverige TV", price: "från 83 kr", live: "20 000+", vod: true, hd4k: true, support: "WhatsApp", highlight: true },
  ];
  return (
    <section className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">Jämförelse</span>
        <h2>Varför välja Sverige TV?</h2>
        <p>Se skillnaden mot traditionella streamingtjänster</p>
      </div>
      <div className={`compare ${vis ? "vis" : ""}`}>
        <table className="ctable">
          <thead>
            <tr>
              {["Tjänst", "Pris/mån", "Live", "VOD", "4K", "Support"].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.service} className={r.highlight ? "ctable__hi" : ""}>
                <td className="ctable__name">{r.highlight && <span className="ctable__tag">★ </span>}{r.service}</td>
                <td className={r.highlight ? "ctable__gold" : ""}>{r.price}</td>
                <td>{r.live}</td>
                <td>{r.vod ? <span className="ctable__yes">✓</span> : <span className="ctable__no">✗</span>}</td>
                <td>{r.hd4k ? <span className="ctable__yes">✓</span> : <span className="ctable__no">✗</span>}</td>
                <td>{r.support}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHANNEL EXPLORER
   ═══════════════════════════════════════════════════════════════════════════ */
function ChannelExplorer() {
  const [tab, setTab] = useState(0);
  const [ref, vis] = useReveal();
  return (
    <section id="channels" className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">Kanaler</span>
        <h2>Utforska kanalutbudet</h2>
        <p>Välj region och se vad som ingår</p>
      </div>
      <div className={`explorer ${vis ? "vis" : ""}`}>
        <div className="explorer__tabs">
          {channelPreview.map((item, i) => (
            <button key={i} className={`explorer__tab ${tab === i ? "active" : ""}`} onClick={() => setTab(i)}>
              {item.country}
            </button>
          ))}
        </div>
        <div className="explorer__list">
          {channelPreview[tab].channels.map(ch => (
            <div key={ch} className="explorer__ch">
              <span className="explorer__dot" />
              {ch}
            </div>
          ))}
          <div className="explorer__more">…och 20 000+ kanaler till</div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COUNTRIES
   ═══════════════════════════════════════════════════════════════════════════ */
function Countries({ ua }) {
  const [sel, setSel] = useState(null);
  const [ref, vis] = useReveal();

  useEffect(() => {
    document.body.style.overflow = sel ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sel]);

  return (
    <>
      <section id="countries" className="sec" ref={ref}>
        <div className={`sec__head ${vis ? "vis" : ""}`}>
          <span className="sec__badge">Internationellt</span>
          <h2>TV på ditt språk i Sverige</h2>
          <p>Klicka på ditt land — se alla kanaler och beställ direkt via WhatsApp</p>
        </div>
        <div className={`cgrid ${vis ? "vis" : ""}`}>
          {COUNTRIES.map((c, i) => (
            <button key={c.slug} className="ccard" onClick={() => setSel(c)} style={{ animationDelay: `${i * 0.04}s` }}>
              <span className="ccard__flag">{c.flag}</span>
              <div className="ccard__info">
                <div className="ccard__name">{c.name}</div>
                <div className="ccard__sub">{c.sub}</div>
              </div>
              <span className="ccard__arrow">›</span>
            </button>
          ))}
        </div>
      </section>

      {sel && (
        <div className="cmodal" onClick={(e) => { if (e.target.classList.contains("cmodal")) setSel(null); }}>
          <div className="cmodal__box">
            <div className="cmodal__head">
              <span className="cmodal__flag">{sel.flag}</span>
              <div className="cmodal__titleBlock">
                <h2>{sel.name}</h2>
                <p>{sel.desc}</p>
              </div>
              <button className="cmodal__close" onClick={() => setSel(null)}>✕</button>
            </div>
            <div className="cmodal__body">
              <div className="cmodal__sec">
                <div className="cmodal__secTitle">📺 Kanaler ({sel.channels.length}+)</div>
                <div className="cmodal__chGrid">
                  {sel.channels.map(ch => (
                    <div key={ch.n} className="cmodal__chip">
                      <span>{ch.n}</span>
                      <span>{ch.c}</span>
                    </div>
                  ))}
                  <div className="cmodal__chip cmodal__chip--gold">
                    <span style={{ color: "#C9A84C" }}>+ 100s fler</span>
                    <span>💬</span>
                  </div>
                </div>
              </div>
              <div className="cmodal__priceBox">
                <span style={{ fontSize: 24 }}>💰</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>Från 83 kr/mån</div>
                  <div style={{ fontSize: 12, color: "#9898a4" }}>Alla kanaler ingår • Gratis test 24h</div>
                </div>
              </div>
            </div>
            <div className="cmodal__footer">
              <a className="btn btn--wa btn--full" href={waLink(sel.wa, ua, `Country-${sel.slug}`)} target="_blank" rel="noreferrer">
                💬 Beställ {sel.name} — WhatsApp
              </a>
              <a className="btn btn--outline btn--full" href={waLink(`Hej! Jag vill testa ${sel.name} kanaler gratis 24h.`, ua, `Trial-${sel.slug}`)} target="_blank" rel="noreferrer">
                🧪 Testa 24h gratis
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DEVICES
   ═══════════════════════════════════════════════════════════════════════════ */
function Devices({ ua }) {
  const [ref, vis] = useReveal();
  return (
    <section id="devices" className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">Enheter</span>
        <h2>Fungerar på alla dina enheter</h2>
        <p>Installera på upp till 3 enheter. Vi guidar dig hela vägen via WhatsApp.</p>
      </div>
      <div className={`devgrid ${vis ? "vis" : ""}`}>
        {DEVICE_LIST.map((d, i) => (
          <div key={d.name} className="devcard" style={{ animationDelay: `${i * 0.07}s` }}>
            <span className="devcard__icon">{d.icon}</span>
            <span className="devcard__name">{d.name}</span>
            <span className="devcard__desc">{d.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   REVIEWS — carousel-style
   ═══════════════════════════════════════════════════════════════════════════ */
const REVIEWS = [
  { name: "Erik L.", city: "Stockholm", stars: 5, plan: "3 månader", text: "Installationen gick på 10 minuter med hjälp från support. SVT, TV4 och alla sportkanaler fungerar perfekt. Sparar 250 kr i månaden jämfört med Viaplay." },
  { name: "Fatima A.", city: "Göteborg", stars: 5, plan: "6 månader", text: "Äntligen borta från dyra abonnemang. Alla svenska kanaler finns, plus arabiska kanaler för familjen. Utmärkt kvalitet och snabb support." },
  { name: "Mohammed K.", city: "Malmö", stars: 5, plan: "12 månader", text: "TiviMate fungerade direkt. 4K-kvalitet på Firestick utan buffring. Bästa IPTV-tjänsten jag provat på 3 år." },
  { name: "Anna B.", city: "Uppsala", stars: 4, plan: "3 månader", text: "Lite osäker i början men supportteamet var professionellt och hjälpte mig igenom installationen steg för steg. Väldigt nöjd." },
  { name: "Lars P.", city: "Västerås", stars: 5, plan: "12 månader", text: "Testade gratis i 24 timmar och köpte direkt årsabonnemanget. Allsvenskan, Premier League och NHL — allt på ett ställe." },
  { name: "Sofia N.", city: "Stockholm", stars: 5, plan: "6 månader", text: "Fungerar perfekt på min Samsung Smart TV och min iPhone. Barn-kanalerna är ett extra plus för familjen." },
];

function Reviews() {
  const [ref, vis] = useReveal();
  return (
    <section className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">Omdömen</span>
        <h2>Vad våra kunder säger</h2>
        <p>Omdömen från svenska kunder</p>
      </div>
      <div className={`reviews ${vis ? "vis" : ""}`}>
        {REVIEWS.map((r, i) => (
          <article key={i} className="rcard" style={{ animationDelay: `${i * 0.08}s` }}>
            <div className="rcard__stars">{"⭐".repeat(r.stars)}</div>
            <p className="rcard__text">"{r.text}"</p>
            <div className="rcard__meta">
              <span className="rcard__name">{r.name}</span>
              <span className="rcard__city">— {r.city}</span>
              <span className="rcard__plan">{r.plan}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   QUICK SETUP
   ═══════════════════════════════════════════════════════════════════════════ */
function Setup({ ua }) {
  const [ref, vis] = useReveal();
  const steps = [
    { n: "1", icon: "💬", text: "Kontakta oss på WhatsApp — berätta vilken enhet du har." },
    { n: "2", icon: "💳", text: "Välj ditt paket och slutför betalningen via Swish eller bankoverföring." },
    { n: "3", icon: "📺", text: "Få din M3U-länk och installationsguide — börja titta inom 10 minuter." },
  ];
  return (
    <section id="setup" className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">Kom igång</span>
        <h2>Snabb installation — 10 minuter</h2>
        <p>Fungerar på Firestick, Smart TV, iPhone, Android och mer.</p>
      </div>
      <div className={`stepsgrid ${vis ? "vis" : ""}`}>
        {steps.map((s, i) => (
          <div key={s.n} className="scard" style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="scard__num">{s.icon}</div>
            <div className="scard__step">Steg {s.n}</div>
            <p className="scard__text">{s.text}</p>
          </div>
        ))}
      </div>
      <div className="sec__cta">
        <a className="btn btn--wa btn--lg" href={waLink("Hej! Jag behöver hjälp med installationen.", ua, "Setup-CTA")} target="_blank" rel="noreferrer">
          💬 Få installationshjälp nu
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════════════════════════════ */
const FAQ_ITEMS = [
  { q: "Kan jag titta på SVT, TV4 och svenska kanaler?", a: "Ja, alla stora svenska kanaler ingår: SVT1, SVT2, TV4, Kanal 5, TV3, SVT Play Live och fler — alla i HD-kvalitet." },
  { q: "Fungerar det med TiviMate och IPTV Smarters?", a: "Ja. Vi stöder TiviMate, IPTV Smarters, GSE Smart IPTV och alla vanliga M3U-appar. Vi skickar M3U-länken direkt via WhatsApp." },
  { q: "Vilka enheter stöds?", a: "Firestick, Smart TV (Samsung/LG/Sony), Android, iPhone, iPad, Android TV Box, MAG Box och PC/Mac." },
  { q: "Hur snabbt aktiveras det?", a: "Vanligtvis inom 5–10 minuter efter beställning via WhatsApp, även på helger." },
  { q: "Ingår EPG (kanalguide)?", a: "Ja. Fullständig EPG ingår i alla paket." },
  { q: "Kan jag titta på flera skärmar samtidigt?", a: "Standardpaketet inkluderar en anslutning. Kontakta oss på WhatsApp om du vill ha multi-skärm." },
  { q: "Behöver jag VPN?", a: "Inte nödvändigt, men vi rekommenderar VPN för extra integritet." },
  { q: "Hur betalar jag?", a: "Vi accepterar Swish, bankoverföring och andra betalningsmetoder via WhatsApp." },
  { q: "Kan jag se Allsvenskan och svensk sport?", a: "Ja! Svenska sportkanaler ingår — Allsvenskan, SHL, VM, EM och all internationell sport." },
  { q: "Kan jag avbryta?", a: "Ingen bindningstid. Du betalar en gång och tjänsten löper ut automatiskt." },
];

function FAQ() {
  const [ref, vis] = useReveal();
  const [openIdx, setOpenIdx] = useState(-1);
  return (
    <section id="faq" className="sec" ref={ref}>
      <div className={`sec__head ${vis ? "vis" : ""}`}>
        <span className="sec__badge">FAQ</span>
        <h2>Vanliga frågor</h2>
      </div>
      <div className={`faq ${vis ? "vis" : ""}`}>
        {FAQ_ITEMS.map((f, i) => (
          <div key={i} className={`faq__item ${openIdx === i ? "faq__item--open" : ""}`}>
            <button className="faq__q" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
              <span>{f.q}</span>
              <span className="faq__toggle">{openIdx === i ? "−" : "+"}</span>
            </button>
            {openIdx === i && <div className="faq__a">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FINAL CTA SECTION — push to convert
   ═══════════════════════════════════════════════════════════════════════════ */
function FinalCTA({ ua }) {
  const [ref, vis] = useReveal();
  return (
    <section className="sec" ref={ref}>
      <div className={`finalcta ${vis ? "vis" : ""}`}>
        <div className="finalcta__glow" />
        <h2>Redo att börja?</h2>
        <p>Prova gratis i 24 timmar — inget kreditkort krävs.<br/>Aktivering på under 10 minuter via WhatsApp.</p>
        <div className="finalcta__actions">
          <a className="btn btn--wa btn--xl" href={waLink("Hej! Jag vill testa Sverige TV gratis i 24 timmar.", ua, "Final-CTA")} target="_blank" rel="noreferrer">
            💬 Starta gratis test nu
          </a>
          <a className="btn btn--outline btn--xl" href="#offers">
            Se alla paket →
          </a>
        </div>
        <div className="finalcta__note">Ingen bindningstid • Inget automatiskt köp • Nöjd-kund-garanti</div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STICKY MOBILE CTA
   ═══════════════════════════════════════════════════════════════════════════ */
function StickyMobileCTA({ ua }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="stickyCta">
      <a className="stickyCta__btn" href={waLink("Hej! Jag vill testa Sverige TV gratis i 24 timmar.", ua, "Sticky-Mobile")} target="_blank" rel="noreferrer">
        💬 Gratis test 24h
      </a>
      <a className="stickyCta__btn stickyCta__btn--sec" href="#offers">
        Se paket
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MOA CHAT (improved)
   ═══════════════════════════════════════════════════════════════════════════ */
function MoaChat({ ua }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [greeted, setGreeted] = useState(false);
  const endRef = useRef(null);

  const quickReplies = ["Visa priser 💰", "Gratis test 24h 🧪", "Firestick-hjälp 🔥", "Vilka kanaler? 📺"];

  const pushBot = async (text, delay = 800) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, delay));
    setMsgs(prev => [...prev, { from: "bot", text }]);
    setIsTyping(false);
  };

  useEffect(() => {
    if (msgs.length > 0) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, isTyping]);

  useEffect(() => { if (open) setUnread(0); }, [open]);

  useEffect(() => {
    if (greeted) return;
    const t = setTimeout(() => {
      pushBot("Hej! 👋 Jag heter Moa.", 0)
        .then(() => pushBot("Jag kan hjälpa dig med paket, gratis test eller installation. Vad undrar du?", 1000));
      setUnread(2);
      setGreeted(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [greeted]);

  const getBotReply = (q) => {
    const l = q.toLowerCase();
    if (/pris|price|kost|paket|plan|💰/.test(l)) return ["Vi har paket från 83 kr/mån — 1, 3, 6 eller 12 månader. Alla inkluderar 20 000+ kanaler och EPG.", "Vill du se paketen direkt, eller testa gratis i 24h först?"];
    if (/firestick|install|setup|enhet|device|smart tv|🔥/.test(l)) return ["Firestick och Smart TV är populärast — installationen tar 10 minuter.", "Jag skickar installationshjälp direkt på WhatsApp!"];
    if (/test|trial|gratis|free|🧪/.test(l)) return ["Absolut! Vi erbjuder 24 timmars gratis test — inget kreditkort krävs.", "Klicka nedan så skickar jag testlänken direkt via WhatsApp."];
    if (/kanal|channel|svt|tv4|📺/.test(l)) return ["Vi har 20 000+ kanaler — SVT, TV4, sport, film och internationella kanaler.", "Vill du se hela listan?"];
    return ["Jag kan hjälpa dig med paket, gratis test, installation och kompatibilitet.", "Snabbast hjälp får du på WhatsApp — klicka nedan!"];
  };

  const doSend = async (val) => {
    if (!val.trim() || isTyping) return;
    setMsgs(prev => [...prev, { from: "user", text: val }]);
    setInput("");
    const replies = getBotReply(val);
    for (const r of replies) await pushBot(r, 700);
    setTimeout(() => {
      window.open(waLink(`Moa-chatt: ${val}`, ua, "Moa-Chat"), "_blank");
    }, 1500);
  };

  return (
    <>
      <button className="moa__fab" onClick={() => setOpen(v => !v)} aria-label="Chatta med Moa">
        <span className="moa__fabPulse" />
        <span className="moa__fabIcon">💬</span>
        <span className="moa__fabText">Support</span>
        {unread > 0 && !open && <span className="moa__badge">{unread}</span>}
      </button>
      {open && (
        <div className="moa__box">
          <div className="moa__header">
            <div className="moa__headerInfo">
              <div className="moa__headerName">Moa <span className="moa__headerDot" /> Online</div>
              <div className="moa__headerSub">{isTyping ? "Moa skriver..." : "Svarar på < 1 min"}</div>
            </div>
            <button className="moa__close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="moa__msgs">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "bot" ? "moa__msgBot" : "moa__msgUser"}>{m.text}</div>
            ))}
            {isTyping && <div className="moa__typing"><span/><span/><span/></div>}
            <div ref={endRef} />
          </div>
          {!isTyping && msgs.length >= 2 && (
            <div className="moa__quick">
              {quickReplies.map(q => (
                <button key={q} className="moa__qr" onClick={() => doSend(q)}>{q}</button>
              ))}
            </div>
          )}
          <div className="moa__input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && doSend(input)}
              placeholder="Skriv här..."
            />
            <button onClick={() => doSend(input)}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Page() {
  const [showIntro, setShowIntro] = useState(true);
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {showIntro && <CinematicIntro onDone={() => setShowIntro(false)} />}

      <div className="app">
        <div className="app__bg" />

        {/* COUNTDOWN BAR */}
        <CountdownBar />

        {/* HEADER */}
        <header className="hdr">
          <nav className="hdr__nav">
            <a href="#" className="hdr__brand"><SverigeLogo size={32} showText={true} /></a>
            <div className="hdr__links">
              {[
                ["#offers", "Paket"],
                ["#channels", "Kanaler"],
                ["#countries", "TV-länder"],
                ["#devices", "Enheter"],
                ["#faq", "FAQ"],
                ["#setup", "Installation"],
              ].map(([href, label]) => (
                <a key={href} href={href}>{label}</a>
              ))}
            </div>
            <a className="btn btn--wa btn--sm hdr__cta" href={waLink("Hej! Jag behöver hjälp med Sverige TV.", ua, "Header")} target="_blank" rel="noreferrer">
              💬 WhatsApp
            </a>
          </nav>
        </header>

        {/* PROOF TICKER */}
        <ProofTicker />

        <main className="main">
          <Hero ua={ua} />
          <TrustStrip />
          <Pricing ua={ua} />
          <VodStats />
          <CompareTable />
          <ChannelExplorer />
          <Countries ua={ua} />
          <Devices ua={ua} />
          <Reviews />
          <Setup ua={ua} />
          <FAQ />
          <FinalCTA ua={ua} />
        </main>

        <footer className="ftr">
          <div className="ftr__logo"><SverigeLogo size={28} showText={true} /></div>
          <p>© {new Date().getFullYear()} {SITE.brand}. Alla rättigheter förbehållna.</p>
          <p>Optimerat för snabb och stabil streaming i Sverige.</p>
          <div className="ftr__links">
            <a href="#faq">Juridisk information</a>
            <a href="#faq">Integritetspolicy</a>
            <a href="#faq">Användarvillkor</a>
          </div>
        </footer>

        <StickyMobileCTA ua={ua} />
        <MoaChat ua={ua} />

        <style>{`
/* ═══════════════════════════════════════════════════════════════════
   CSS — ENHANCED LANDING PAGE
   ═══════════════════════════════════════════════════════════════════ */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #050308;
  --card: #0c0a10;
  --card-hi: #12101a;
  --accent: #7c1326;
  --accent-hi: #9a1830;
  --accent-glow: rgba(124,19,38,0.35);
  --fg: #f0eff0;
  --muted: #78788a;
  --border: rgba(255,255,255,0.07);
  --gold: #c8a96e;
  --gold-bright: #e8c97a;
  --green: #22c55e;
  --radius: 14px;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--bg); overflow-x: hidden; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--font-body); -webkit-font-smoothing: antialiased; line-height: 1.6; }

.app { position: relative; min-height: 100vh; }
.app__bg {
  position: fixed; inset: 0; z-index: -1;
  background:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,19,38,0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 50%),
    var(--bg);
}

.main { max-width: 1120px; margin: 0 auto; padding: 0 20px 80px; }

/* ── ANIMATIONS ── */
@keyframes fadeUp { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
@keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes tickerScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

.vis > *, .vis { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

/* ── BUTTONS ── */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-body); font-weight: 700; font-size: 14px;
  padding: 12px 28px; border-radius: 10px;
  text-decoration: none; border: none; cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1);
  white-space: nowrap; line-height: 1.2;
}
.btn--primary {
  background: linear-gradient(135deg, var(--accent-hi), var(--accent));
  color: #fff;
  box-shadow: 0 4px 20px var(--accent-glow);
}
.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--accent-glow);
  background: linear-gradient(135deg, var(--gold), var(--accent-hi));
}
.btn--wa {
  background: var(--green); color: #000;
  box-shadow: 0 4px 16px rgba(34,197,94,0.3);
}
.btn--wa:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(34,197,94,0.4); background: #16a34a; }
.btn--outline {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
}
.btn--outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.25); }
.btn--lg { padding: 16px 36px; font-size: 15px; }
.btn--xl { padding: 18px 44px; font-size: 16px; border-radius: 12px; }
.btn--sm { padding: 8px 18px; font-size: 13px; border-radius: 8px; }
.btn--full { width: 100%; justify-content: center; text-align: center; }
.btn__arrow { transition: transform 0.2s; }
.btn:hover .btn__arrow { transform: translateX(4px); }

/* ── COUNTDOWN BAR ── */
.cbar {
  background: linear-gradient(90deg, rgba(124,19,38,0.2), rgba(200,169,110,0.1), rgba(124,19,38,0.2));
  border-bottom: 1px solid rgba(124,19,38,0.3);
  padding: 10px 0;
  position: relative; z-index: 101;
}
.cbar__inner {
  max-width: 1120px; margin: 0 auto; padding: 0 20px;
  display: flex; align-items: center; justify-content: center;
  gap: 16px; flex-wrap: wrap; font-size: 13px;
}
.cbar__label { color: var(--gold-bright); font-weight: 700; }
.cbar__digits { display: flex; gap: 6px; }
.cbar__unit { display: flex; align-items: baseline; gap: 2px; }
.cbar__num {
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
  padding: 3px 7px; border-radius: 6px; font-weight: 800; font-size: 14px;
  font-variant-numeric: tabular-nums; color: #fff; min-width: 28px; text-align: center;
}
.cbar__u { font-size: 10px; color: var(--muted); font-weight: 600; text-transform: uppercase; }
.cbar__cta { color: var(--green); font-weight: 800; text-decoration: none; font-size: 13px; }
.cbar__cta:hover { text-decoration: underline; }

/* ── HEADER ── */
.hdr {
  position: sticky; top: 0; z-index: 100;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: rgba(5,3,8,0.88);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.hdr__nav {
  max-width: 1120px; margin: 0 auto; padding: 12px 20px;
  display: flex; align-items: center; gap: 20px;
}
.hdr__brand { text-decoration: none; flex-shrink: 0; }
.hdr__links {
  flex: 1; display: flex; gap: 24px; justify-content: center;
  font-size: 13px; font-weight: 600;
}
.hdr__links a { color: var(--muted); text-decoration: none; transition: color 0.2s; }
.hdr__links a:hover { color: #fff; }
.hdr__cta { flex-shrink: 0; }

/* ── PROOF TICKER ── */
.ticker {
  overflow: hidden; background: rgba(0,0,0,0.4);
  border-bottom: 1px solid rgba(255,255,255,0.03);
  padding: 8px 0;
}
.ticker__track {
  display: flex; gap: 60px; white-space: nowrap;
  animation: tickerScroll 45s linear infinite;
  width: max-content;
}
.ticker__item { font-size: 12px; color: var(--muted); font-weight: 500; }

/* ── HERO ── */
.hero { padding: 80px 0 40px; text-align: center; position: relative; }
.hero__glow {
  position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
  width: 600px; height: 400px;
  background: radial-gradient(ellipse, rgba(124,19,38,0.15) 0%, transparent 70%);
  pointer-events: none;
}
.hero__content { max-width: 800px; margin: 0 auto; position: relative; }
.hero__logo { margin-bottom: 20px; filter: drop-shadow(0 0 24px rgba(139,23,40,0.5)); }
.hero__pill {
  display: inline-block; padding: 6px 18px;
  border: 1px solid rgba(200,169,110,0.25);
  color: var(--gold); background: rgba(200,169,110,0.06);
  border-radius: 99px; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 28px;
}
.hero__title {
  font-family: var(--font-display); font-size: clamp(2.4rem, 6vw, 4.5rem);
  font-weight: 900; line-height: 1.05; margin: 0 0 24px; letter-spacing: -1px;
}
.hero__num {
  background: linear-gradient(135deg, var(--gold-bright), var(--gold));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero__accent {
  background: linear-gradient(135deg, #fff 20%, var(--gold) 60%, #fff 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease infinite;
}
.hero__lead { color: var(--muted); font-size: 1.1rem; max-width: 640px; margin: 0 auto 36px; line-height: 1.7; }
.hero__lead strong { color: #fff; font-weight: 700; }
.hero__actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
.hero__trust { display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap; font-size: 13px; color: var(--muted); }
.hero__trustStars { font-size: 14px; }
.hero__sep { opacity: 0.3; }

/* ── TRUST STRIP ── */
.tstrip {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 8px;
  padding: 40px 0 60px; max-width: 900px; margin: 0 auto;
}
.tstrip__item {
  display: flex; align-items: center; gap: 8px;
  background: rgba(255,255,255,0.03); border: 1px solid var(--border);
  padding: 10px 18px; border-radius: 99px;
  transition: all 0.2s;
}
.tstrip__item:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); transform: translateY(-1px); }
.tstrip__icon { font-size: 18px; }
.tstrip__label { font-size: 13px; font-weight: 600; color: #ccc; }

/* ── SECTIONS ── */
.sec { margin-bottom: 100px; }
.sec__head { text-align: center; margin-bottom: 48px; }
.sec__head h2 { font-family: var(--font-display); font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800; margin: 0 0 12px; }
.sec__head p { color: var(--muted); max-width: 560px; margin: 0 auto; font-size: 15px; }
.sec__badge {
  display: inline-block; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1.5px;
  color: var(--gold); margin-bottom: 12px;
}
.sec__cta { display: flex; justify-content: center; margin-top: 36px; }

/* ── PRICING ── */
.pricing {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
.pcard {
  position: relative; background: var(--card); border: 1px solid var(--border);
  padding: 32px 24px; border-radius: 18px;
  display: flex; flex-direction: column;
  transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
}
.pcard:hover { transform: translateY(-6px); border-color: rgba(124,19,38,0.35); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
.pcard--hi {
  border-color: rgba(124,19,38,0.45);
  background: linear-gradient(180deg, rgba(124,19,38,0.12) 0%, var(--card) 100%);
  box-shadow: 0 0 50px rgba(124,19,38,0.12);
}
.pcard__ribbon {
  position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, var(--accent-hi), var(--accent));
  color: #fff; font-size: 10px; font-weight: 800; padding: 5px 18px;
  border-radius: 0 0 10px 10px; letter-spacing: 0.8px;
}
.pcard__save {
  position: absolute; top: 14px; right: 14px;
  background: rgba(200,169,110,0.12); border: 1px solid rgba(200,169,110,0.3);
  color: var(--gold); font-size: 10px; font-weight: 800; padding: 3px 10px;
  border-radius: 6px;
}
.pcard__name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; margin: 14px 0 20px; }
.pcard__price { display: flex; align-items: baseline; justify-content: center; gap: 2px; margin-bottom: 8px; }
.pcard__cur { font-size: 1.1rem; color: var(--muted); }
.pcard__big { font-size: 3.6rem; font-weight: 900; letter-spacing: -2px; line-height: 1; }
.pcard__per { font-size: 1rem; color: var(--muted); }
.pcard__billed { text-align: center; font-size: 13px; color: var(--muted); margin-bottom: 24px; }
.pcard__perks { list-style: none; padding: 0; margin: 0 0 24px; flex: 1; }
.pcard__perks li {
  padding: 8px 0; font-size: 14px; color: #d4d4d8;
  display: flex; align-items: center; gap: 10px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.pcard__perks li:last-child { border-bottom: none; }
.pcard__check { color: var(--gold); font-weight: 700; flex-shrink: 0; }

/* ── STATS ── */
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 16px; }
.stat {
  background: var(--card); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 28px 20px; text-align: center;
  transition: all 0.3s;
}
.stat:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-3px); }
.stat__icon { font-size: 28px; display: block; margin-bottom: 10px; }
.stat__val { font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: #fff; }
.stat__label { font-size: 13px; color: var(--muted); margin-top: 4px; }

/* ── COMPARE ── */
.compare { overflow-x: auto; border-radius: var(--radius); border: 1px solid var(--border); }
.ctable { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 520px; }
.ctable thead tr { background: rgba(255,255,255,0.03); }
.ctable th { padding: 14px 16px; text-align: left; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--muted); border-bottom: 1px solid var(--border); }
.ctable td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.03); color: #bbb; }
.ctable__hi { background: rgba(124,19,38,0.1); }
.ctable__hi td { color: #fff; font-weight: 600; }
.ctable__name { font-weight: 600; color: #fff; }
.ctable__gold { color: var(--gold) !important; font-weight: 800 !important; }
.ctable__tag { color: var(--green); }
.ctable__yes { color: var(--green); font-weight: 700; }
.ctable__no { color: #ef4444; }

/* ── EXPLORER ── */
.explorer {
  background: var(--card); border-radius: 18px; overflow: hidden;
  border: 1px solid var(--border);
}
.explorer__tabs {
  display: flex; background: rgba(0,0,0,0.3);
  border-bottom: 1px solid var(--border); overflow-x: auto;
}
.explorer__tab {
  flex: 1; padding: 16px 12px; background: none; border: none;
  color: var(--muted); cursor: pointer; font-weight: 600; font-size: 13px;
  font-family: var(--font-body); min-width: 100px; white-space: nowrap;
  transition: all 0.2s; border-bottom: 2px solid transparent;
}
.explorer__tab.active { color: #fff; border-bottom-color: var(--accent-hi); background: rgba(255,255,255,0.03); }
.explorer__list {
  padding: 24px; display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 14px;
}
.explorer__ch { font-size: 13px; color: #ccc; display: flex; align-items: center; gap: 8px; }
.explorer__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); flex-shrink: 0; }
.explorer__more { color: var(--muted); font-style: italic; font-size: 13px; }

/* ── COUNTRIES ── */
.cgrid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;
}
.ccard {
  background: var(--card); border: 1px solid var(--border); border-radius: 12px;
  padding: 14px 16px; display: flex; align-items: center; gap: 11px;
  cursor: pointer; transition: all 0.2s; text-align: left; width: 100%;
  font-family: var(--font-body);
}
.ccard:hover { transform: translateY(-2px); border-color: rgba(200,169,110,0.4); background: var(--card-hi); box-shadow: 0 6px 24px rgba(0,0,0,0.4); }
.ccard__flag { font-size: 22px; flex-shrink: 0; }
.ccard__info { flex: 1; min-width: 0; }
.ccard__name { font-weight: 700; font-size: 14px; }
.ccard__sub { font-size: 11px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ccard__arrow { color: rgba(200,169,110,0.4); font-size: 18px; flex-shrink: 0; transition: 0.2s; }
.ccard:hover .ccard__arrow { transform: translateX(4px); color: var(--gold); }

/* COUNTRY MODAL */
.cmodal {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.82); backdrop-filter: blur(8px);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.2s ease; padding: 20px;
}
.cmodal__box {
  background: #0d0a12; border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px; width: 100%; max-width: 640px; max-height: 88vh;
  display: flex; flex-direction: column; overflow: hidden;
  animation: slideUp 0.3s ease;
}
.cmodal__head { padding: 20px; display: flex; align-items: flex-start; gap: 14px; }
.cmodal__flag { font-size: 40px; flex-shrink: 0; }
.cmodal__titleBlock { flex: 1; min-width: 0; }
.cmodal__titleBlock h2 { font-family: var(--font-display); font-size: 20px; margin: 0 0 4px; }
.cmodal__titleBlock p { font-size: 13px; color: var(--muted); margin: 0; }
.cmodal__close {
  background: rgba(255,255,255,0.08); border: none; border-radius: 50%;
  width: 36px; height: 36px; color: var(--muted); font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
}
.cmodal__close:hover { background: rgba(255,255,255,0.15); color: #fff; }
.cmodal__body { overflow-y: auto; padding: 0 20px 20px; flex: 1; }
.cmodal__sec { margin-bottom: 20px; }
.cmodal__secTitle { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(200,169,110,0.6); margin-bottom: 10px; }
.cmodal__chGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 6px; }
.cmodal__chip {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px; padding: 8px 12px;
  display: flex; align-items: center; justify-content: space-between; gap: 6px;
  font-size: 13px; font-weight: 600;
}
.cmodal__chip--gold { background: rgba(200,169,110,0.06); border-color: rgba(200,169,110,0.2); }
.cmodal__priceBox {
  background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2);
  border-radius: 12px; padding: 14px 16px;
  display: flex; align-items: center; gap: 12px;
}
.cmodal__footer {
  padding: 14px 20px 20px; border-top: 1px solid var(--border);
  display: flex; flex-direction: column; gap: 8px;
}

/* ── DEVICES ── */
.devgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 14px; }
.devcard {
  background: var(--card); border: 1px solid var(--border); border-radius: 14px;
  padding: 22px 14px; display: flex; flex-direction: column; align-items: center;
  gap: 8px; text-align: center; transition: all 0.3s;
}
.devcard:hover { border-color: rgba(255,255,255,0.2); transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.devcard__icon { font-size: 30px; }
.devcard__name { font-size: 13px; font-weight: 700; }
.devcard__desc { font-size: 11px; color: var(--muted); }

/* ── REVIEWS ── */
.reviews { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
.rcard {
  background: var(--card); border: 1px solid var(--border); border-radius: 16px;
  padding: 24px; display: flex; flex-direction: column; gap: 12px;
  transition: all 0.3s;
}
.rcard:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-3px); }
.rcard__stars { font-size: 14px; }
.rcard__text { margin: 0; font-size: 14px; color: #d4d4d8; line-height: 1.7; font-style: italic; flex: 1; }
.rcard__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 12px; }
.rcard__name { font-weight: 700; color: #fff; }
.rcard__city { color: var(--muted); }
.rcard__plan {
  margin-left: auto;
  background: rgba(124,19,38,0.1); border: 1px solid rgba(124,19,38,0.2);
  color: var(--gold); padding: 2px 8px; border-radius: 4px;
  font-size: 11px; font-weight: 600;
}

/* ── SETUP ── */
.stepsgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
.scard {
  background: var(--card); border: 1px solid var(--border); border-radius: 16px;
  padding: 28px 24px; text-align: center; transition: all 0.3s;
}
.scard:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-3px); }
.scard__num { font-size: 32px; margin-bottom: 8px; }
.scard__step { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--gold); font-weight: 700; margin-bottom: 10px; }
.scard__text { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.6; }

/* ── FAQ ── */
.faq { max-width: 720px; margin: 0 auto; }
.faq__item {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 12px; margin-bottom: 10px; overflow: hidden;
  transition: all 0.2s;
}
.faq__item--open { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.02); }
.faq__q {
  width: 100%; padding: 18px 20px; background: none; border: none;
  color: #fff; font-size: 15px; font-weight: 600;
  display: flex; justify-content: space-between; align-items: center;
  cursor: pointer; font-family: var(--font-body); text-align: left;
}
.faq__toggle { color: var(--muted); font-size: 20px; flex-shrink: 0; }
.faq__a { padding: 0 20px 18px; color: var(--muted); font-size: 14px; line-height: 1.7; }

/* ── FINAL CTA ── */
.finalcta {
  position: relative; text-align: center;
  background: linear-gradient(180deg, rgba(124,19,38,0.1) 0%, var(--card) 100%);
  border: 1px solid rgba(124,19,38,0.25);
  border-radius: 24px; padding: 60px 30px;
  overflow: hidden;
}
.finalcta__glow {
  position: absolute; top: -80px; left: 50%; transform: translateX(-50%);
  width: 400px; height: 200px;
  background: radial-gradient(ellipse, rgba(124,19,38,0.2) 0%, transparent 70%);
  pointer-events: none;
}
.finalcta h2 { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.8rem); margin: 0 0 16px; position: relative; }
.finalcta p { color: var(--muted); max-width: 480px; margin: 0 auto 32px; position: relative; }
.finalcta__actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
.finalcta__note { margin-top: 20px; font-size: 12px; color: var(--muted); opacity: 0.7; position: relative; }

/* ── FOOTER ── */
.ftr {
  padding: 60px 20px; text-align: center; color: #444;
  font-size: 13px; border-top: 1px solid var(--border); margin-top: 40px;
}
.ftr__logo { display: flex; justify-content: center; margin-bottom: 16px; opacity: 0.7; }
.ftr p { margin: 4px 0; }
.ftr__links { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 14px; }
.ftr__links a { color: #444; text-decoration: none; font-size: 12px; transition: color 0.2s; }
.ftr__links a:hover { color: var(--muted); }

/* ── MOA CHAT ── */
.moa__fab {
  position: fixed; bottom: 20px; left: 20px;
  background: #111; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 999px; padding: 10px 20px 10px 14px;
  display: flex; align-items: center; gap: 10px;
  cursor: pointer; z-index: 1000;
  box-shadow: 0 8px 30px rgba(0,0,0,0.5);
  transition: transform 0.2s;
}
.moa__fab:hover { transform: scale(1.05); }
.moa__fabPulse {
  width: 8px; height: 8px; background: var(--green);
  border-radius: 50%; box-shadow: 0 0 8px var(--green);
  animation: pulseLive 2s infinite; flex-shrink: 0;
}
@keyframes pulseLive { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
.moa__fabIcon { font-size: 18px; }
.moa__fabText { font-weight: 700; font-size: 13px; color: #fff; }
.moa__badge {
  position: absolute; top: -6px; right: -6px;
  background: var(--accent-hi); color: #fff;
  font-weight: 900; font-size: 11px;
  padding: 2px 7px; border-radius: 999px;
}
.moa__box {
  position: fixed; bottom: 80px; left: 20px;
  width: 340px; max-height: 70vh;
  background: #18181b; border: 1px solid var(--border);
  border-radius: 18px; z-index: 1000; overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  display: flex; flex-direction: column;
}
.moa__header {
  padding: 16px 18px; background: #222;
  display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.moa__headerName { font-weight: 800; font-size: 14px; display: flex; align-items: center; gap: 8px; }
.moa__headerDot { width: 8px; height: 8px; background: var(--green); border-radius: 50%; display: inline-block; }
.moa__headerSub { font-size: 11px; color: var(--green); font-weight: 600; margin-top: 2px; }
.moa__headerInfo { flex: 1; }
.moa__close {
  background: none; border: 1px solid rgba(255,255,255,0.1); color: #fff;
  width: 32px; height: 32px; border-radius: 8px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.moa__msgs {
  flex: 1; overflow-y: auto; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
}
.moa__msgBot {
  align-self: flex-start; background: #333; color: #fff;
  padding: 10px 14px; border-radius: 14px 14px 14px 2px;
  font-size: 14px; max-width: 85%; line-height: 1.5;
}
.moa__msgUser {
  align-self: flex-end; background: var(--accent-hi); color: #fff;
  padding: 10px 14px; border-radius: 14px 14px 2px 14px;
  font-size: 14px; max-width: 85%;
}
.moa__typing { padding: 4px 16px; display: flex; gap: 4px; }
.moa__typing span {
  width: 6px; height: 6px; background: #555; border-radius: 50%;
  animation: blink 1.4s infinite both;
}
.moa__typing span:nth-child(2) { animation-delay: 0.2s; }
.moa__typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
.moa__quick { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px 14px 0; }
.moa__qr {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  color: #fff; padding: 6px 12px; border-radius: 20px;
  font-size: 12px; cursor: pointer; font-family: var(--font-body);
  transition: 0.15s;
}
.moa__qr:hover { background: rgba(255,255,255,0.12); }
.moa__input {
  display: flex; padding: 12px 14px; border-top: 1px solid rgba(255,255,255,0.08);
  background: #222; gap: 8px;
}
.moa__input input {
  flex: 1; background: #18181b; border: 1px solid #3f3f46;
  border-radius: 20px; padding: 8px 14px; color: #fff;
  outline: none; font-size: 14px; font-family: var(--font-body);
}
.moa__input button {
  background: none; border: none; color: var(--gold);
  font-weight: 700; font-size: 18px; cursor: pointer;
}

/* ── STICKY MOBILE CTA ── */
.stickyCta {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(5,3,8,0.95); backdrop-filter: blur(16px);
  border-top: 1px solid rgba(124,19,38,0.3);
  padding: 10px 16px; z-index: 999;
  display: none;
  gap: 10px;
  padding-bottom: max(10px, env(safe-area-inset-bottom, 0px));
}
.stickyCta__btn {
  flex: 1; text-align: center; padding: 14px 16px;
  border-radius: 10px; font-weight: 800; font-size: 14px;
  text-decoration: none; transition: 0.2s;
  background: var(--green); color: #000;
}
.stickyCta__btn--sec {
  background: rgba(255,255,255,0.08); color: #fff;
  border: 1px solid rgba(255,255,255,0.12);
}

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .hdr__links { display: none; }
  .hdr__cta { display: none; }
}
@media (max-width: 640px) {
  .main { padding: 0 16px 120px; }
  .sec { margin-bottom: 64px; }
  .hero { padding: 50px 0 30px; }
  .hero__title { font-size: clamp(2rem, 9vw, 3rem); }
  .hero__actions { flex-direction: column; align-items: center; }
  .hero__actions .btn { width: 100%; max-width: 340px; justify-content: center; }
  .hero__trust { font-size: 11px; }
  .cbar__inner { font-size: 11px; gap: 8px; }
  .cbar__cta { display: none; }
  .tstrip { gap: 6px; }
  .tstrip__item { padding: 8px 12px; }
  .tstrip__label { font-size: 11px; }
  .pricing { grid-template-columns: 1fr; }
  .pcard__big { font-size: 3rem; }
  .stats { grid-template-columns: repeat(2, 1fr); }
  .cgrid { grid-template-columns: repeat(2, 1fr); }
  .devgrid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .devcard { padding: 14px 8px; }
  .devcard__icon { font-size: 24px; }
  .devcard__name { font-size: 11px; }
  .devcard__desc { display: none; }
  .reviews { grid-template-columns: 1fr; }
  .stepsgrid { grid-template-columns: 1fr; }
  .finalcta { padding: 40px 20px; }
  .finalcta__actions { flex-direction: column; align-items: center; }
  .finalcta__actions .btn { width: 100%; max-width: 320px; justify-content: center; }
  .stickyCta { display: flex; }
  .moa__fab { bottom: 70px; left: auto; right: 16px; padding: 10px 14px; gap: 6px; }
  .moa__fabText { display: none; }
  .moa__box { bottom: 130px; left: 12px; right: 12px; width: auto; }
  .cmodal { padding: 0; align-items: flex-end; }
  .cmodal__box { border-radius: 20px 20px 0 0; max-height: 90vh; }
}
@media (hover: none) {
  .btn, .explorer__tab, .faq__q, .ccard { min-height: 48px; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }
  .cin { display: none !important; }
}

/* ── CINEMATIC INTRO ── */
.cin {
  position: fixed; inset: 0; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}
.cin--exit { animation: cinFadeOut 0.42s ease forwards; }
@keyframes cinFadeOut { to { opacity: 0; transform: scale(1.03); } }
.cin__bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 40%, #001830 0%, #000810 55%, #000 100%);
}
.cin__vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse, transparent 30%, rgba(0,0,0,0.85) 100%);
}
.cin__particles { position: absolute; inset: 0; pointer-events: none; }
.cin__p {
  position: absolute; border-radius: 50%; background: #FECC02;
  animation: cinFloat linear infinite; opacity: 0;
}
@keyframes cinFloat {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  8% { opacity: 0.5; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-105vh) scale(0.4); opacity: 0; }
}
.cin__content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.cin__shield { margin-bottom: 24px; position: relative; }
.cin__shieldFill { opacity: 0; animation: fadeIn 0.3s ease 0.8s forwards; }
.cin__shieldBorder {
  stroke-dasharray: 700; stroke-dashoffset: 700;
  animation: cinDraw 0.8s cubic-bezier(0.4,0,0.2,1) 0.15s forwards;
}
@keyframes cinDraw { to { stroke-dashoffset: 0; } }
.cin__crown { opacity: 0; transform-origin: center bottom; }
.cin__crown--1 { animation: cinPop 0.3s cubic-bezier(0.34,1.56,0.64,1) 1.1s forwards; }
.cin__crown--2 { animation: cinPop 0.3s cubic-bezier(0.34,1.56,0.64,1) 1.3s forwards; }
.cin__crown--3 { animation: cinPop 0.3s cubic-bezier(0.34,1.4,0.64,1) 1.5s forwards; }
@keyframes cinPop {
  0% { opacity: 0; transform: scale(0) translateY(4px); }
  60% { opacity: 1; }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
.cin__title {
  font-family: var(--font-display); font-size: clamp(2.4rem, 8vw, 4.5rem);
  font-weight: 900; letter-spacing: 0.3em; color: #FECC02;
  text-shadow: 0 0 32px rgba(254,204,2,0.7);
  margin: 0 0 10px; opacity: 0;
  animation: cinTitle 0.5s cubic-bezier(0.16,1,0.3,1) 1.7s forwards;
}
@keyframes cinTitle {
  from { opacity: 0; letter-spacing: 0.6em; filter: blur(6px); }
  to { opacity: 1; letter-spacing: 0.3em; filter: blur(0); }
}
.cin__line {
  height: 1px; width: 0; margin: 0 auto 14px;
  background: linear-gradient(90deg, transparent, #FECC02, transparent);
  animation: cinLine 0.4s ease 2s forwards;
}
@keyframes cinLine { to { width: 200px; } }
.cin__tag {
  font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(254,204,2,0.5); margin: 0; opacity: 0;
  animation: fadeUp 0.3s ease 2.2s forwards;
}
.cin__skip {
  position: absolute; bottom: 28px; right: 20px;
  background: rgba(0,0,0,0.3); border: 1px solid rgba(254,204,2,0.2);
  color: rgba(254,204,2,0.4); font-size: 12px; padding: 8px 18px;
  border-radius: 20px; cursor: pointer; z-index: 10;
  opacity: 0; animation: fadeIn 0.3s ease 0.6s forwards;
  transition: all 0.2s;
}
.cin__skip:hover { border-color: #FECC02; color: #FECC02; }
        `}</style>
      </div>
    </>
  );
        }
