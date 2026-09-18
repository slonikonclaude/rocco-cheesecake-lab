/**
 * Иконки сайта: крышка их коробки — оранжевый круг с тонким золотым кольцом и
 * буквой «R» геометрическим гротеском (Century Gothic из системы — Jost в SVG-рендер
 * sharp не попадает). Запускается руками: `node scripts/make-icons.mjs`.
 */
import sharp from "sharp";

const svg = (size, pad) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  ${pad ? '<rect width="512" height="512" fill="#f5efe8"/>' : ""}
  <circle cx="256" cy="256" r="${pad ? 214 : 250}" fill="#e8582a"/>
  <circle cx="256" cy="256" r="${pad ? 190 : 222}" fill="none" stroke="#b08d57" stroke-width="7"/>
  <text x="256" y="${pad ? 330 : 342}" text-anchor="middle" font-family="Century Gothic, Futura, Jost, Segoe UI, Arial" font-size="${pad ? 230 : 262}" fill="#2a1b16">R</text>
</svg>`;

await sharp(Buffer.from(svg(512, false))).resize(64, 64).png().toFile("app/icon.png");
await sharp(Buffer.from(svg(512, true))).resize(180, 180).png().toFile("app/apple-icon.png");
await sharp(Buffer.from(svg(512, false))).png().toFile("_data/icon-preview.png");
console.log("icons ok");
