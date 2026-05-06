"use client";

// components/client/HeaderNav.tsx
// Header navigation with mobile menu, language switcher, PWA install button

import React, { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink } from "../shared/utils";
import { SverigeLogo } from "../shared/SverigeLogo";
import type { Locale } from "../shared/types";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function HeaderNav({ ua }: { ua: string }) {
  const { lang, setLang } = useLanguage();
  const t = dict[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleInstall);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    installPrompt.userChoice.then((c) => {
      if (c.outcome === "accepted") setInstallPrompt(null);
    });
  };

  const navLinks = [
    { href: "#offers", label: t.nav.offers },
    { href: "#channels", label: t.nav.channels },
    { href: "#countries", label: lang === "sv" ? "TV-länder" : lang === "fr" ? "Pays TV" : "Countries" },
    { href: "#international", label: lang === "sv" ? "Världen" : lang === "fr" ? "Monde" : "Worldwide" },
    { href: "#devices", label: t.nav.devices },
    { href: "#cities", label: t.nav.cities },
    { href: "#faq", label: t.nav.faq },
    { href: "#setup", label: t.nav.setup },
  ];

  return (
    <>
      <header className="header">
        <nav className="nav">
          <a href="#" className="brand" aria-label="Sverige TV — Hem">
            <SverigeLogo size={34} showText={true} />
          </a>
          <div className="links">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            <div className="langSwitch">
              {(["sv", "en", "fr"] as Locale[]).map((l) => (
                <button
                  key={l}
                  className={`langBtn ${lang === l ? "active" : ""}`}
                  onClick={() => setLang(l)}
                  type="button"
                  aria-label={`Switch to ${l.toUpperCase()}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {installPrompt && (
              <button onClick={handleInstallClick} className="installBtn" type="button">
                📲 {t.nav.install}
              </button>
            )}
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Meny"
            aria-expanded={menuOpen}
            type="button"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobileMenu" onClick={() => setMenuOpen(false)}>
          <div className="mobileMenuLogo">
            <SverigeLogo size={40} showText={true} />
          </div>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <div className="mobileLangSwitch">
            {(["sv", "en", "fr"] as Locale[]).map((l) => (
              <button
                key={l}
                className={`langBtn ${lang === l ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLang(l);
                  setMenuOpen(false);
                }}
                type="button"
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            className="btnPrimary"
            href={generateWhatsAppLink(t.whatsapp.generic, ua, "Mobile-Menu")}
            target="_blank"
            rel="noreferrer"
            style={{ textAlign: "center", marginTop: 8 }}
          >
            💬 WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
