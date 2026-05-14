// scripts/generate-icons.mjs
// Generates all PNG icons from the two source SVG files in /public.
// Runs automatically before `next build` via the "prebuild" npm script.
//
// Requirements: sharp (devDependency)
// Inputs:
//   public/favicon.svg  → Lightning Stream + subtle premium star (favicon family)
//   public/logo.svg     → Broadcast Star (logo / OG image source)
// Outputs (all in /public):
//   favicon-16x16.png, favicon-32x32.png
//   apple-touch-icon.png (180x180)
//   icon-192.png, icon-512.png
//   icon-maskable-192.png, icon-maskable-512.png (logo on full-bleed safe area)
//   og-image.png (1200x630 with Broadcast Star logo + Swedish flag corner accent)

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

const FAVICON_SVG = join(PUBLIC, "favicon.svg");
const LOGO_SVG = join(PUBLIC, "logo.svg");

async function exists(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function fromFaviconSvg(size, outFile) {
  const buf = await readFile(FAVICON_SVG);
  await sharp(buf, { density: Math.max(72, size * 4) })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outFile);
  console.log(`  ✓ ${outFile}  (${size}x${size})`);
}

async function fromLogoSvg(size, outFile, { padding = 0, background = null } = {}) {
  const buf = await readFile(LOGO_SVG);
  const inner = size - padding * 2;
  const logoBuf = await sharp(buf, { density: Math.max(72, inner * 4) })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const bg = background ?? { r: 0, g: 0, b: 0, alpha: 0 };
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logoBuf, top: padding, left: padding }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(outFile);
  console.log(`  ✓ ${outFile}  (${size}x${size}, padding=${padding})`);
}

async function generateOgImage() {
  // 1200x630 — Swedish-flag-blue gradient background with logo on the left, text overlay
  const W = 1200, H = 630;
  const out = join(PUBLIC, "og-image.png");

  // Background SVG with gradient + flag accent stripe on the right
  const bgSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0A4A7E"/>
          <stop offset="60%" stop-color="#006AA7"/>
          <stop offset="100%" stop-color="#00345A"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#bg)"/>
      <!-- Swedish flag cross accent (subtle) -->
      <g opacity="0.18">
        <rect x="0" y="280" width="${W}" height="70" fill="#FECC00"/>
        <rect x="380" y="0"   width="70" height="${H}" fill="#FECC00"/>
      </g>
      <text x="540" y="280" font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="78" font-weight="800" fill="#FFFFFF">Sverige TV</text>
      <text x="540" y="345" font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="36" font-weight="600" fill="#FECC00">Bästa IPTV Sverige 2026</text>
      <text x="540" y="395" font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="28" font-weight="500" fill="#FFFFFF" opacity="0.92">20 000+ Kanaler · 4K UHD · från 50 kr/mån</text>
      <text x="540" y="445" font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="22" font-weight="400" fill="#FFFFFF" opacity="0.75">SVT · TV4 · Viaplay · Allsvenskan · SHL · Premier League</text>
      <text x="540" y="478" font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="22" font-weight="400" fill="#FFFFFF" opacity="0.75">+ ExYu · arabiska · turkiska · persiska · kurdiska kanaler</text>
      <text x="540" y="540" font-family="Inter, Helvetica, Arial, sans-serif"
            font-size="20" font-weight="600" fill="#FECC00">🟢 Gratis 24h test · Aktivering 10 min via WhatsApp</text>
    </svg>
  `);

  const logoBuf = await sharp(await readFile(LOGO_SVG), { density: 600 })
    .resize(400, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(bgSvg)
    .composite([{ input: logoBuf, top: 115, left: 90 }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(out);
  console.log(`  ✓ ${out}  (${W}x${H})`);
}

async function main() {
  console.log("→ Generating PNG icons from SVG sources…");

  if (!(await exists(FAVICON_SVG))) throw new Error("Missing public/favicon.svg");
  if (!(await exists(LOGO_SVG))) throw new Error("Missing public/logo.svg");

  await ensureDir(PUBLIC);

  // Favicon family (Lightning Stream)
  await fromFaviconSvg(16,  join(PUBLIC, "favicon-16x16.png"));
  await fromFaviconSvg(32,  join(PUBLIC, "favicon-32x32.png"));
  await fromFaviconSvg(180, join(PUBLIC, "apple-touch-icon.png"));
  await fromFaviconSvg(192, join(PUBLIC, "icon-192.png"));
  await fromFaviconSvg(512, join(PUBLIC, "icon-512.png"));

  // Maskable icons (full-bleed safe area: 20% padding on solid Swedish blue)
  const flagBlue = { r: 0, g: 106, b: 167, alpha: 1 };
  await fromLogoSvg(192, join(PUBLIC, "icon-maskable-192.png"), { padding: 38, background: flagBlue });
  await fromLogoSvg(512, join(PUBLIC, "icon-maskable-512.png"), { padding: 102, background: flagBlue });

  // Open Graph image (Broadcast Star + text)
  await generateOgImage();

  console.log("✓ All icons generated.");
}

main().catch((err) => {
  console.error("✗ generate-icons failed:", err);
  process.exit(1);
});
