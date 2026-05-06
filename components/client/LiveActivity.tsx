"use client";

// components/client/LiveActivity.tsx
// Live visitor count widget — uses week-seeded PRNG so numbers stay consistent
// during a session but appear "live"

import { useEffect, useState } from "react";
import { SITE } from "../shared/site";
import {
  clamp,
  generateWhatsAppLink,
  getISOWeekKey,
  hash32,
  makePRNG,
  timeAgoLabel,
} from "../shared/utils";
import { useLanguage } from "./LanguageProvider";

export function LiveActivity({ ua }: { ua: string }) {
  const { lang } = useLanguage();
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
    try {
      if (sessionStorage.getItem(k) === "1") return;
    } catch {}
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

  const labels = {
    now: lang === "sv" ? "Just nu" : lang === "fr" ? "Maintenant" : "Right now",
    visitorsViewing:
      lang === "sv"
        ? "besökare tittar på erbjudandena."
        : lang === "fr"
          ? "visiteurs regardent les offres."
          : "visitors viewing the offers.",
    see: lang === "sv" ? "Se" : lang === "fr" ? "Voir" : "See",
    live: lang === "sv" ? "live" : "live",
    updated: lang === "sv" ? "Uppdaterad" : lang === "fr" ? "Mis à jour" : "Updated",
    visitorsRow:
      lang === "sv" ? "Besökare just nu" : lang === "fr" ? "Visiteurs maintenant" : "Visitors now",
    support: lang === "sv" ? "Support" : "Support",
    online: lang === "sv" ? "Online" : "Online",
    startWa: lang === "sv" ? "Starta WhatsApp" : lang === "fr" ? "Ouvrir WhatsApp" : "Start WhatsApp",
  };

  return (
    <>
      {toast && data && (
        <div className="liveToast" role="status" aria-live="polite">
          <span className="liveDot" />
          <div className="liveToastText">
            <div className="liveToastTitle">{labels.now} 🔥</div>
            <div className="liveToastSub">{data.viewing} {labels.visitorsViewing}</div>
          </div>
          <button className="liveToastBtn" onClick={() => setOpen(true)} type="button">
            {labels.see}
          </button>
        </div>
      )}
      <button
        className="liveBadge"
        onClick={() => setOpen((v) => !v)}
        aria-label="Live activity"
        type="button"
      >
        <span className="liveDot" />
        <span className="liveBadgeText">{data ? `${data.viewing} ${labels.live}` : labels.live}</span>
      </button>
      {open && data && (
        <div className="livePanel">
          <div className="liveHead">
            <div style={{ fontWeight: 900 }}>Live 🇸🇪</div>
            <div className="liveSub">
              {labels.updated} {data.updatedLabel}
            </div>
          </div>
          <div className="liveStats">
            <div className="liveRow">
              <span>{labels.visitorsRow}</span>
              <b>{data.viewing}</b>
            </div>
            <div className="liveRow">
              <span>{labels.support}</span>
              <b style={{ color: "#22c55e" }}>{labels.online}</b>
            </div>
          </div>
          <button
            className="liveCta"
            onClick={() =>
              window.open(generateWhatsAppLink("Hej! Jag vill beställa.", ua, "Live-Widget"), "_blank")
            }
            type="button"
          >
            {labels.startWa}
          </button>
        </div>
      )}
    </>
  );
}
