// node parse-search-reviews.mjs — maps/search-reviews-es.json (raw card text) → maps/reviews-all.json
// Card text: "Author\n[Local Guide · N reseñas]\nReseña de\nGoogle\n5/5\n · Hace 2 meses\n<text>[ … Más]\n[Respuesta del propietario …]"
import fs from "node:fs";
const raw = JSON.parse(fs.readFileSync("../maps/search-reviews-es.json", "utf8"));
const out = raw.map((r) => {
  const lines = r.text.split("\n").map((s) => s.trim());
  const author = lines[0];
  const si = lines.findIndex((l) => /^\d\/5$/.test(l));
  const stars = si >= 0 ? Number(lines[si][0]) : null;
  const when = si >= 0 ? (lines[si + 1] || "").replace(/^·\s*/, "") : "";
  const rest = lines.slice(si + 2);
  const ri = rest.findIndex((l) => /^Respuesta del propietario|^Response from the owner/.test(l));
  const body = (ri >= 0 ? rest.slice(0, ri) : rest).join("\n").trim();
  const response = ri >= 0 ? rest.slice(ri).join("\n").trim() : "";
  const truncated = /…\s*Más$/.test(body) || /…\s*More$/.test(body);
  const meta = lines.slice(1, si).filter((l) => !/^Reseña de$|^Google$/.test(l)).join(" · ");
  return { id: r.id, author, meta, stars, when, text: body.replace(/\s*…\s*Más$/, "…"), truncated, response };
});
fs.writeFileSync("../maps/reviews-all.json", JSON.stringify(out, null, 1));
const hist = [1, 2, 3, 4, 5].map((s) => out.filter((r) => r.stars === s).length);
console.log("reviews", out.length, "hist 1..5", hist.join(","), "with text", out.filter((r) => r.text).length, "complete", out.filter((r) => r.text && !r.truncated).length, "owner replies", out.filter((r) => r.response).length);
