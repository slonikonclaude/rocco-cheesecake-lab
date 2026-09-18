/**
 * Сверка цен сайта (lib/menu.ts) с источником (_data/menu-text/prices.json —
 * табличка у кассы, печатный лист, тикет). `npm run check:menu`.
 *
 * Проверяет по каждому вкусу: цену 2–3 personas (табличка и лист), 8 personas и
 * звёздочку «consultar disponibilidad» (лист), цену порции (табличка: clásica
 * 4,90, остальные 5,90), а также что вкусов ровно столько, сколько строк.
 */
import fs from "node:fs";
import { flavours, formats, bagPrice } from "../lib/menu.ts";

const src = JSON.parse(fs.readFileSync(new URL("../_data/menu-text/prices.json", import.meta.url), "utf8"));

const norm = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ*]/g, "")
    .replace(/s$/, "")
    .trim();
const key = { clasica: "clasica", pistacho: "pistacho", lotus: "lotus con dulce de leche", fresa: "fresa", arandanos: "arandano", mango: "mango", chocolate: "chocolate", "chocolate-blanco": "chocolate blanco", turron: "turron", avellana: "avellana" };
const sheetKey = { ...key, chocolate: "chocolate negro" };

let errors = 0;
const fail = (m) => {
  errors++;
  console.log("✗", m);
};

if (flavours.length !== src.board.small.length) fail(`вкусов ${flavours.length}, на табличке ${src.board.small.length}`);

for (const fl of flavours) {
  const b = src.board.small.find((r) => norm(r[0]) === key[fl.id]);
  const s = src.sheet.small.find((r) => norm(r[0]) === sheetKey[fl.id]);
  const l = src.sheet.large.find((r) => norm(r[0]) === sheetKey[fl.id]);
  if (!b || !s || !l) {
    fail(`${fl.id}: нет строки в источнике (табличка ${!!b}, лист ${!!s}, лист 8p ${!!l})`);
    continue;
  }
  if (fl.small !== b[2]) fail(`${fl.id}: 2–3p ${fl.small} ≠ табличка ${b[2]}`);
  if (fl.small !== s[2]) fail(`${fl.id}: 2–3p ${fl.small} ≠ лист ${s[2]}`);
  if (fl.large !== l[2]) fail(`${fl.id}: 8p ${fl.large} ≠ лист ${l[2]}`);
  if (fl.largeOnRequest !== l[3]) fail(`${fl.id}: «consultar disponibilidad» ${fl.largeOnRequest} ≠ лист ${l[3]}`);
  const slice = fl.id === "clasica" ? src.board.portion[0][2] : src.board.portion[1][2];
  if (fl.slice !== slice) fail(`${fl.id}: порция ${fl.slice} ≠ табличка ${slice}`);
  // Английское имя на сайте — с таблички или с листа («Dark chocolate» — с листа, чтобы не путать с белым).
  if (![b[1], s[1]].some((n) => n.toLowerCase() === fl.name.en.toLowerCase())) fail(`${fl.id}: EN «${fl.name.en}» нет ни на табличке («${b[1]}»), ни на листе («${s[1]}»)`);
}

if (formats.slice.from !== src.board.portion[0][2] || formats.slice.other !== src.board.portion[1][2]) fail("formats.slice ≠ табличка");
if (formats.small.from !== Math.min(...src.board.small.map((r) => r[2]))) fail("formats.small.from ≠ минимум таблички");
if (formats.small.pistachio !== src.board.small.find((r) => r[0] === "PISTACHO")[2]) fail("formats.small.pistachio ≠ табличка");
if (formats.large.from !== Math.min(...src.sheet.large.map((r) => r[2]))) fail("formats.large.from ≠ минимум листа");
if (bagPrice !== src.ticket.lines.find((r) => /Bolsa/.test(r[0]))[1]) fail("bagPrice ≠ тикет");
const pequena = src.ticket.lines.find((r) => /Pequeña/.test(r[0]))[1];
if (flavours.find((f) => f.id === "lotus").small !== pequena) fail("тикет «Pequeña Dulce de Leche» ≠ lotus 2–3p");

console.log(errors ? `\n${errors} расхождений` : `✓ ${flavours.length} вкусов × 3 размера, форматы, пакет и тикет совпадают с источником`);
process.exit(errors ? 1 : 0);
