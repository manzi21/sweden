// components/shared/utils.ts
// Server-safe utilities (no window/document references at module level)

import { SITE } from "./site";
import type { Locale } from "./types";

export function isMobileUA(ua: string): boolean {
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

export function generateWhatsAppLink(message: string, ua: string, ref?: string): string {
  const suffix = ref ? ` | Ref: ${ref}` : "";
  const text = encodeURIComponent(message + suffix);
  return isMobileUA(ua)
    ? `https://wa.me/${SITE.whatsappPhone}?text=${text}`
    : `https://api.whatsapp.com/send?phone=${SITE.whatsappPhone}&text=${text}`;
}

export function normalizeLocale(raw: string): Locale {
  const l = raw.toLowerCase().replace("_", "-").trim();
  const base = l.split("-")[0] as Locale;
  return base === "sv" || base === "en" || base === "fr" ? base : "sv";
}

export function getISOWeekKey(d = new Date()): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

export function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function makePRNG(seed: number) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >>> 17; s >>>= 0;
    s ^= s << 5; s >>>= 0;
    return (s >>> 0) / 4294967296;
  };
}

export function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function timeAgoLabel(from: Date, now: Date) {
  const sec = Math.max(1, Math.floor((now.getTime() - from.getTime()) / 1000));
  const min = Math.floor(sec / 60);
  if (min <= 0) return "nyss";
  if (min === 1) return "1 min sedan";
  if (min < 60) return `${min} min sedan`;
  const h = Math.floor(min / 60);
  return h === 1 ? "1 timme sedan" : `${h} h sedan`;
}
