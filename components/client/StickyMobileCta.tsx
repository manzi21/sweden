"use client";

// components/client/StickyMobileCta.tsx
// Bottom sticky mobile CTA — biggest mobile conversion lever

import { useLanguage } from "./LanguageProvider";
import { dict } from "../shared/dict";
import { generateWhatsAppLink } from "../shared/utils";

export function StickyMobileCta({ ua }: { ua: string }) {
  const { lang } = useLanguage();
  const t = dict[lang];
  return (
    <a
      className="stickyMobileCta"
      href={generateWhatsAppLink(t.whatsapp.trial, ua, "Sticky-Mobile")}
      target="_blank"
      rel="noreferrer"
      aria-label={lang === "sv" ? "Testa 24h gratis" : lang === "fr" ? "Essai gratuit 24h" : "Try 24h free"}
    >
      ★ {lang === "sv" ? "Testa 24h gratis" : lang === "fr" ? "Essai gratuit 24h" : "Try 24h free"} →
    </a>
  );
}
