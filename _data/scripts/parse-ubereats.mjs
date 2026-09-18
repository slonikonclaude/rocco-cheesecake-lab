// node parse-ubereats.mjs <ubereats.html> <out.json> — catalog from __REACT_QUERY_STATE__.
import fs from "node:fs";
const html = fs.readFileSync(process.argv[2], "utf8");
const m = html.match(/<script[^>]*id="__REACT_QUERY_STATE__"[^>]*>([\s\S]*?)<\/script>/);
if (!m) throw new Error("no __REACT_QUERY_STATE__");
let s = m[1].trim();
s = s.split("\\u0022").join('"').split("%5C").join("\\");
let state;
try { state = JSON.parse(s); } catch (e) { fs.writeFileSync(process.argv[3] + ".raw.txt", s); throw e; }
const out = { store: null, sections: [] };
for (const q of state.queries || []) {
  const d = q.state && q.state.data;
  if (!d || !d.catalogSectionsMap) continue;
  out.store = { title: d.title, heroImageUrls: d.heroImageUrls, location: d.location, rating: d.rating, hours: d.hours, phone: d.phoneNumber, sectionsMeta: d.sections };
  for (const [sid, arr] of Object.entries(d.catalogSectionsMap)) {
    for (const sec of arr) {
      const p = sec.payload && sec.payload.standardItemsPayload;
      if (!p) continue;
      out.sections.push({
        sid, title: p.title && p.title.text,
        items: p.catalogItems.map((it) => ({ uuid: it.uuid, title: it.title, price: it.price / 100, desc: it.itemDescription, img: it.imageUrl, soldOut: it.isSoldOut })),
      });
    }
  }
}
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
for (const sec of out.sections) {
  console.log("##", sec.title, sec.items.length);
  for (const it of sec.items) console.log("  ", it.price.toFixed(2), "|", it.title, "|", (it.desc || "").replace(/\s+/g, " ").slice(0, 120));
}
console.log(JSON.stringify(out.store && { title: out.store.title, hours: out.store.hours, hero: out.store.heroImageUrls }, null, 0).slice(0, 1500));
