// components/shared/plans.ts
// Plans + channel preview data — server-safe, no React

import type { Plan } from "./types";

export const plans: Plan[] = [
  { key: "p1", price: 120, months: 1, currency: "SEK", priceValidUntil: "2027-12-31" },
  { key: "p3", price: 250, months: 3, currency: "SEK", highlight: true, priceValidUntil: "2027-12-31" },
  { key: "p6", price: 350, months: 6, currency: "SEK", priceValidUntil: "2027-12-31" },
  { key: "p12", price: 600, months: 12, currency: "SEK", priceValidUntil: "2027-12-31" },
];

export const channelPreview = [
  { country: "Sverige", channels: ["SVT 1 HD", "SVT 2 HD", "TV4 HD", "Kanal 5 HD", "TV3 HD", "C More Sport", "Viasat Premier", "TV4 Sport", "SVT Play Live", "Kanal 9"] },
  { country: "Norden", channels: ["NRK 1 (Norge)", "NRK Sport", "DR1 (Danmark)", "Yle TV1 (Finland)", "TV 2 Norge", "TV2 Danmark", "MTV Finland", "SVT World"] },
  { country: "Sport & Film", channels: ["Sky Sports HD", "beIN Sports 4K", "ESPN HD", "Eurosport 4K", "Canal+ 4K", "HBO Max", "Discovery+", "Nat Geo Wild"] },
  { country: "International", channels: ["BBC One HD", "TF1 France", "NBC USA", "Al Jazeera", "DW News", "CNBC", "CNN International", "Disney Channel"] },
] as const;

export const DEVICE_LIST = [
  { name: "Smart TV", icon: "📺" },
  { name: "Firestick / Fire TV", icon: "🔥" },
  { name: "iPhone & iPad", icon: "📱" },
  { name: "Android", icon: "🤖" },
  { name: "PC & Mac", icon: "💻" },
  { name: "Android TV Box", icon: "📦" },
  { name: "MAG Box", icon: "📡" },
];
