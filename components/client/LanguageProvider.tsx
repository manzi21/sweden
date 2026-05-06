"use client";

// components/client/LanguageProvider.tsx
// Wraps interactive parts to share locale state. Locale detection happens
// client-side after hydration so the SEO server-render keeps the default locale.

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale, LangCtx } from "../shared/types";
import { dict } from "../shared/dict";
import { normalizeLocale } from "../shared/utils";

const LanguageContext = createContext<LangCtx | null>(null);

export function useLanguage(): LangCtx {
  const v = useContext(LanguageContext);
  if (!v) throw new Error("useLanguage must be used inside LanguageProvider");
  return v;
}

function detectLangClient(): Locale {
  if (typeof window === "undefined") return "sv";
  // 1) URL query parameter wins (e.g. ?lang=en for hreflang routing)
  const params = new URLSearchParams(window.location.search);
  const qp = params.get("lang");
  if (qp) return normalizeLocale(qp);
  // 2) Browser languages
  const navLangs = ((navigator.languages?.length ? navigator.languages : [navigator.language]) as string[]).filter(Boolean);
  for (const nl of navLangs) {
    const n = normalizeLocale(nl);
    if (dict[n]) return n;
  }
  // 3) Persisted preference
  try {
    const s = window.localStorage.getItem("lang");
    if (s) return normalizeLocale(s);
  } catch {}
  return "sv";
}

export function LanguageProvider({
  children,
  initial = "sv",
}: {
  children: ReactNode;
  initial?: Locale;
}) {
  const [lang, setLang] = useState<Locale>(initial);

  useEffect(() => {
    const detected = detectLangClient();
    if (detected !== lang) setLang(detected);
    try { localStorage.setItem("lang", detected); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = detected;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
