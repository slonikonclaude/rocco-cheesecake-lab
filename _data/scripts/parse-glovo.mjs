// node parse-glovo.mjs <glovo.html> <out.json> — pull products out of Glovo's Next.js RSC flight payload.
import fs from "node:fs";
const html = fs.readFileSync(process.argv[2], "utf8");
const chunks = [...html.matchAll(/self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g)].map((m) => JSON.parse('"' + m[1] + '"'));
const flight = chunks.join("");
fs.writeFileSync(process.argv[2].replace(".html", "-flight.txt"), flight);
// find every JSON object that looks like a product: has "name" and "price" and "id"
const products = new Map();
for (let i = flight.indexOf("{"); i !== -1; i = flight.indexOf("{", i + 1)) {
  // quick filter
  const head = flight.slice(i, i + 400);
  if (!/"(name|title)"/.test(head)) continue;
  // try to parse a balanced object starting at i
  let depth = 0, inStr = false, esc = false, j = i;
  for (; j < flight.length; j++) {
    const ch = flight[j];
    if (inStr) { if (esc) esc = false; else if (ch === "\\") esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true;
    else if (ch === "{") depth++;
    else if (ch === "}") { depth--; if (depth === 0) break; }
    if (j - i > 20000) break;
  }
  if (depth !== 0) continue;
  let o;
  try { o = JSON.parse(flight.slice(i, j + 1)); } catch { continue; }
  if (o && (o.name || o.title) && (o.price !== undefined || o.priceInfo) && o.id) {
    const key = String(o.id);
    if (!products.has(key)) products.set(key, o);
  }
}
const list = [...products.values()];
fs.writeFileSync(process.argv[3], JSON.stringify(list, null, 1));
console.log("products", list.length);
for (const p of list) console.log(p.id, "|", p.name || p.title, "|", JSON.stringify(p.priceInfo || p.price), "|", (p.description || "").slice(0, 90));
