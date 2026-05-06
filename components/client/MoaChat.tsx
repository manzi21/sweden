"use client";

// components/client/MoaChat.tsx
// Chat widget — only mounts after first idle tick (perf-conscious).

import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { useLanguage } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink } from "../shared/utils";
import type { Locale, Msg } from "../shared/types";

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
    return [
      lang === "sv"
        ? "Vi har 20 000+ kanaler — SVT, TV4, sport, film, ExYu, arabiska, turkiska. Vill du se hela listan?"
        : lang === "fr"
          ? "Nous avons 20 000+ chaînes — SVT, TV4, sport, ExYu, arabe, turc. Voulez-vous la liste complète ?"
          : "We have 20,000+ channels — SVT, TV4, sports, ExYu, Arabic, Turkish. Want the full list?",
      b.default2,
    ];
  }
  return [b.default1, b.default2];
}

export function MoaChat({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showQuick, setShowQuick] = useState(false);
  const msgsEndRef = useRef<HTMLDivElement | null>(null);
  const avatarUrl = "/support-agent.jpg";

  const pushBot = async (text: string, delay = 900) => {
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, delay));
    setMsgs((prev) => [...prev, { from: "bot", text }]);
    setIsTyping(false);
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("chatDismissed") === "true") setDismissed(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (msgs.length > 0) msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (msgs.filter((m) => m.from === "bot").length >= 2) setShowQuick(true);
  }, [msgs, isTyping]);

  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  useEffect(() => {
    if (dismissed || msgs.length > 0) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return; // skip auto-greet on mobile
    try {
      if (sessionStorage.getItem("svtv_chat_greeted") === "1") return;
    } catch {}
    const b = dict[lang].bot;
    const t = window.setTimeout(() => {
      pushBot(b.greeting1, 0).then(() => pushBot(b.greeting2, 1200));
      setUnread(2);
      try { sessionStorage.setItem("svtv_chat_greeted", "1"); } catch {}
    }, 4500);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed, msgs.length, lang]);

  const handleOpen = () => {
    setOpen(true);
    setDismissed(false);
    try { localStorage.removeItem("chatDismissed"); } catch {}
  };
  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
    try { localStorage.setItem("chatDismissed", "true"); } catch {}
  };
  const handleToggle = () => (open ? handleClose() : handleOpen());

  const doSend = async (val: string) => {
    if (!val.trim() || isTyping) return;
    setMsgs((prev) => [...prev, { from: "user", text: val }]);
    setInput("");
    setShowQuick(false);
    const replies = getBotReply(val, lang);
    for (const r of replies) await pushBot(r, 700);
    window.setTimeout(() => {
      window.open(
        generateWhatsAppLink(`${dict[lang].bot.greeting1.replace("👋 ", "")} ${val}`, ua, "Moa-Chat"),
        "_blank"
      );
    }, 1200);
  };

  const handleSend = () => doSend(input);
  const handleQuick = (q: string) => doSend(q);

  const teaserMsgs = useMemo(() => {
    const bots = msgs.filter((m) => m.from === "bot");
    return bots.slice(Math.max(0, bots.length - 3));
  }, [msgs]);

  const fallbackSrc = (e: SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = "/icon-192.png";
  };

  return (
    <>
      {!open && !dismissed && teaserMsgs.length > 0 && (
        <button className="miliTeaser" onClick={handleOpen} aria-label="Öppna chatten" type="button">
          <div className="miliTeaserHead">
            <img
              src={avatarUrl}
              alt="Moa"
              className="miliTeaserAvatar"
              loading="lazy"
              width="22"
              height="22"
              onError={fallbackSrc}
            />
            <span className="miliTeaserTitle">Moa • Support</span>
            {unread > 0 && <span className="miliBadge">{unread}</span>}
          </div>
          <div className="miliTeaserLines">
            {teaserMsgs.map((m, i) => (
              <div key={i} className="miliTeaserLine">{m.text}</div>
            ))}
          </div>
        </button>
      )}
      <button
        className="miliFab"
        onClick={handleToggle}
        aria-label="Chatta med Moa"
        type="button"
      >
        <div className="fabContent">
          <img
            src={avatarUrl}
            alt="Moa"
            className="fabAvatar"
            loading="lazy"
            width="35"
            height="35"
            onError={fallbackSrc}
          />
          <span className="fabPulse" />
          <span className="fabText">Support</span>
          {unread > 0 && <span className="miliBadge miliBadgeFab">{unread}</span>}
        </div>
      </button>
      {open && (
        <div className="miliBox" role="dialog" aria-label="Chat med Moa">
          <div className="miliHeader">
            <div className="headerAvatarWrapper">
              <img
                src={avatarUrl}
                alt="Moa"
                className="headerAvatar"
                width="40"
                height="40"
                onError={fallbackSrc}
              />
              <span className="onlineIndicator" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: "14px" }}>Moa • Support</div>
              <div style={{ fontSize: "11px", color: "#25d366", fontWeight: 600 }}>
                {isTyping
                  ? lang === "sv" ? "Moa skriver..." : lang === "fr" ? "Moa écrit..." : "Moa is typing..."
                  : lang === "sv" ? "Svarar snabbt" : lang === "fr" ? "Répond vite" : "Replies fast"}
              </div>
            </div>
            <button className="miliClose" onClick={handleClose} aria-label="Stäng chatten" type="button">✕</button>
          </div>
          <div className="miliBody">
            <div className="miliMsgs">
              {msgs.map((m, i) => (
                <div key={i} className={m.from === "bot" ? "miliMsgBot" : "miliMsgUser"}>
                  {m.text}
                </div>
              ))}
              <div ref={msgsEndRef} />
            </div>
            {isTyping && (
              <div className="typingIndicator"><span>.</span><span>.</span><span>.</span></div>
            )}
            {showQuick && !isTyping && (
              <div className="quickReplies">
                {dict[lang].bot.quick.map((q) => (
                  <button key={q} className="quickReply" onClick={() => handleQuick(q)} type="button">
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div className="miliInputRow">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={lang === "sv" ? "Skriv här..." : lang === "fr" ? "Écrivez ici..." : "Type here..."}
                aria-label="Message"
              />
              <button onClick={handleSend} type="button" aria-label="Send">→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
