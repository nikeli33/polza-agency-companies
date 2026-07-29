import sharp from "sharp";

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <text x="600" y="280" font-family="system-ui, sans-serif" font-size="72" font-weight="700" fill="#ffffff" text-anchor="middle" letter-spacing="2">Polza Agency Portal</text>
  <text x="600" y="360" font-family="system-ui, sans-serif" font-size="28" fill="#888888" text-anchor="middle">Каталог компаний · Next.js + PostgreSQL</text>
  <rect x="420" y="400" width="360" height="2" rx="1" fill="#333333"/>
  <text x="600" y="450" font-family="system-ui, sans-serif" font-size="16" fill="#555555" text-anchor="middle">portal.nexusbots.ru</text>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(width, height)
  .png()
  .toFile("../next-app/public/og-image.png");

console.log("✅ og-image.png created");
