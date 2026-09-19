// node maps-review-search.mjs "<query>" [hl=es] — Maps place → «Reseñas» → «Buscar reseñas» → full texts of matching reviews.
// Работает и в limited view: поиск по отзывам там остаётся. Результат → ../maps/review-search-<query>.json
import { launch, attach, sleep, save } from "./cdp.mjs";
const [q = "plástico", hl = "es"] = process.argv.slice(2);
const PORT = 9872;
const URL_PLACE = `https://www.google.com/maps/place/ROCCO+The+Cheesecake+Lab/@39.4690594,-0.3734898,17z/data=!3m1!4b1!4m6!3m5!1s0xd6049ee7e4703d9:0x3e9cd42b3296e7c6!8m2!3d39.4690594!4d-0.3734898!16s%2Fg%2F11x5p7kd4p?hl=${hl}`;
await launch({ port: PORT, profile: "chrome-profile-rs" });
const c = await attach(PORT);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
await c.navigate(URL_PLACE, 6000);
if ((await c.evaluate("location.href")).includes("consent.google")) {
  await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Rechazar todo|Reject all/.test(b.innerText))?.click()`);
  await sleep(4000);
  await c.navigate(URL_PLACE, 7000);
}
const title = await c.evaluate("document.title");
if (!/ROCCO/.test(title)) { console.log("WRONG PLACE", title); process.exit(1); }
await c.evaluate(`[...document.querySelectorAll('button[role=tab]')].find(b=>/Reseñas|Reviews/.test(b.getAttribute('aria-label')||b.innerText))?.click()`);
await sleep(3500);
const opened = await c.evaluate(`(() => { const b=[...document.querySelectorAll('button')].find(b=>/Buscar reseñas|Search reviews/.test(b.getAttribute('aria-label')||'')); if(!b) return false; b.click(); return true })()`);
console.log("search button", opened);
await sleep(1500);
// У поля нет aria-label: берём видимое текстовое поле внутри панели места ([role=main]), а не общую строку поиска Maps.
const typed = await c.evaluate(`(() => { const ins=[...document.querySelectorAll('input[type=text]')].filter(i=>i.offsetParent && i.closest('[role=main]')); const i=ins[ins.length-1]; if(!i) return false; i.focus(); i.value=''; return ins.length })()`);
console.log("input", typed);
await c.send("Input.insertText", { text: q });
await sleep(400);
await c.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
await c.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
await sleep(4500);
for (let i = 0; i < 4; i++) {
  await c.evaluate(`document.querySelectorAll('div[data-review-id] button').forEach(b=>{ if(/^(Más|More|Ver más|See more)$/.test((b.innerText||b.getAttribute('aria-label')||'').trim())) b.click() })`);
  await sleep(900);
}
const reviews = await c.evaluate(`(() => [...document.querySelectorAll('div[data-review-id].jftiEf')].map(r => ({
  id: r.getAttribute('data-review-id'),
  author: r.querySelector('.d4r55')?.innerText,
  stars: r.querySelector('.kvMYJc')?.getAttribute('aria-label') || '',
  time: r.querySelector('.rsqaWe')?.innerText || '',
  text: r.querySelector('.MyEned .wiI7pd')?.innerText || '',
  photos: [...r.querySelectorAll('button.Tya61d')].map(b => (b.style.backgroundImage.match(/url\\("?([^")]+)/)||[])[1]).filter(Boolean).map(u=>u.split('=')[0]),
  response: r.querySelector('.CDe7pd')?.innerText || '',
})))()`);
save(`../maps/review-search-${q.replace(/[^\wáéíóúñ]+/gi, "_")}.json`, reviews);
console.log("found", reviews.length);
for (const r of reviews) console.log("---", r.stars, r.time, "| photos", r.photos.length, "\n", r.text.slice(0, 900), r.response ? "\n  RESP: " + r.response.slice(0, 300) : "");
c.close();
process.exit(0);
