"use client";

// components/client/PWABar.tsx
// Two install bars: Android Chrome (beforeinstallprompt) + iOS Safari instructions

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PWABar() {
  const { lang } = useLanguage();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPWABar, setShowPWABar] = useState(false);
  const [showIOSBar, setShowIOSBar] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    const handleInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handleInstall);
    return () => window.removeEventListener("beforeinstallprompt", handleInstall);
  }, []);

  useEffect(() => {
    if (!installPrompt) return;
    const key = "pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const timer = window.setTimeout(() => setShowPWABar(true), 2600);
    return () => window.clearTimeout(timer);
  }, [installPrompt]);

  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const standalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (!isIOS || standalone) return;
    const key = "ios_pwa_dismissed_v1";
    try { if (localStorage.getItem(key)) return; } catch {}
    const timer = window.setTimeout(() => setShowIOSBar(true), 3500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    setShowPWABar(false);
    try { localStorage.removeItem("pwa_dismissed_v1"); } catch {}
    installPrompt.prompt();
    installPrompt.userChoice.then((c) => {
      if (c.outcome === "accepted") setInstallPrompt(null);
    });
  };
  const handlePWADismiss = () => {
    setShowPWABar(false);
    try { localStorage.setItem("pwa_dismissed_v1", "1"); } catch {}
  };
  const handleIOSDismiss = () => {
    setShowIOSBar(false);
    try { localStorage.setItem("ios_pwa_dismissed_v1", "1"); } catch {}
  };

  return (
    <>
      {showPWABar && (
        <div className="pwaBar" role="dialog" aria-label="Install app">
          <span className="pwaIcon" aria-hidden="true">📲</span>
          <div className="pwaText">
            <strong>
              {lang === "sv" ? "Installera som app" : lang === "en" ? "Install as app" : "Installer comme app"}
            </strong>
            <span>
              {lang === "sv"
                ? "Snabbare åtkomst, offline-support"
                : lang === "en"
                  ? "Faster access, offline support"
                  : "Accès rapide, hors-ligne"}
            </span>
          </div>
          <button className="pwaAccept" onClick={handleInstallClick} type="button">
            {lang === "sv" ? "Installera" : lang === "en" ? "Install" : "Installer"}
          </button>
          <button className="pwaDismiss" onClick={handlePWADismiss} aria-label="Stäng" type="button">✕</button>
        </div>
      )}
      {showIOSBar && (
        <div className="pwaBar pwaBarIOS" role="dialog" aria-label="Add to Home Screen">
          <span className="pwaIcon" aria-hidden="true">📲</span>
          <div className="pwaText">
            <strong>
              {lang === "sv"
                ? "Installera som app"
                : lang === "en"
                  ? "Add to Home Screen"
                  : "Ajouter à l'écran"}
            </strong>
            <span>
              {lang === "sv" ? "Tryck på" : lang === "en" ? "Tap" : "Appuyez sur"}{" "}
              <span className="iosShareIcon">⬆</span>{" "}
              {lang === "sv"
                ? 'sedan "Lägg till hemskärm"'
                : lang === "en"
                  ? 'then "Add to Home Screen"'
                  : "puis « Sur l'écran d'accueil »"}
            </span>
          </div>
          <button className="pwaDismiss" onClick={handleIOSDismiss} aria-label="Stäng" type="button">✕</button>
        </div>
      )}
    </>
  );
}
