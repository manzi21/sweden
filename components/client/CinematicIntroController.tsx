"use client";

// components/client/CinematicIntroController.tsx
// Decides whether to render the intro (desktop, first visit per session only).
// Lazy-loads the actual animation to keep initial bundle small.

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CinematicIntro = dynamic(
  () => import("./CinematicIntro").then((m) => ({ default: m.CinematicIntro })),
  { ssr: false }
);

export function CinematicIntroController() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    let alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem("svtv_intro_v1") === "1"; } catch {}
    if (alreadySeen) return;
    try { sessionStorage.setItem("svtv_intro_v1", "1"); } catch {}
    setShow(true);
  }, []);

  if (!show) return null;
  return <CinematicIntro onDone={() => setShow(false)} />;
}
