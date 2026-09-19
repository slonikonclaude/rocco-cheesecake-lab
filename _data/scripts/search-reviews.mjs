// node search-reviews.mjs <hl> — Google Search place panel → «Ver todas las reseñas» → «Más reseñas» loop; dump review cards.
import { launch, attach, sleep, save, SCRATCH } from "./cdp.mjs";
const hl = process.argv[2] || "es";
const PORT = 9871;
const URL_S = `https://search.google.com/local/reviews?placeid=ChIJ2QNHfu5JYA0RxueWMivUnD4&hl=${hl}&gl=ES`;
await launch({ port: PORT, profile: "chrome-profile-sr" });
const c = await attach(PORT);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
await c.navigate(URL_S, 7000);
let href = await c.evaluate("location.href");
if (/Antes de ir a Google|Before you continue/.test(await c.evaluate("document.body.innerText"))) {
  await c.evaluate(`[...document.querySelectorAll('button,div[role=button]')].find(b=>/^(Rechazar todo|Reject all)$/.test(b.innerText.trim()))?.click()`);
  await sleep(4000);
  await c.navigate(href, 7000);
}
console.log("at", (await c.evaluate("location.href")).slice(0, 140));
// The redirect usually opens the reviews dialog directly; if not, click «Ver todas las reseñas».
const opened = await c.evaluate(`(() => { const b=[...document.querySelectorAll('a,span,div[role=button],button')].find(x=>/^(Ver todas las reseñas|See all reviews|Reseñas de Google|Google reviews)$/.test((x.innerText||'').trim())); if(b){b.click(); return true} return false })()`);
console.log("opened", opened);
await sleep(5000);
let last = 0, stable = 0;
for (let i = 0; i < 400 && stable < 10; i++) {
  const n = await c.evaluate(`(() => {
    const more=[...document.querySelectorAll('div[role=button],button,span')].find(x=>/^(Más reseñas de usuarios|More user reviews|Más reseñas|More reviews)$/.test((x.innerText||'').trim()));
    if (more) { more.scrollIntoView(); more.click(); }
    const scs=[...document.querySelectorAll('div')].filter(d=>d.scrollHeight>d.clientHeight+100 && /auto|scroll/.test(getComputedStyle(d).overflowY));
    scs.forEach(s=>s.scrollTop=s.scrollHeight);
    return document.querySelectorAll('[data-review-id], .bwb7ce, .gws-localreviews__google-review').length;
  })()`);
  if (n === last) stable++; else stable = 0;
  last = n;
  if (i % 10 === 0) console.log("step", i, "cards", n);
  await sleep(stable ? 1800 : 1200);
}
const cards = await c.evaluate(`(() => {
  const els=[...document.querySelectorAll('[data-review-id], .bwb7ce, .gws-localreviews__google-review')];
  const seen=new Set(); const out=[];
  for (const e of els) { const t=e.innerText; if(!t||seen.has(t)) continue; seen.add(t); out.push({id:e.getAttribute('data-review-id'), text:t, stars:(e.querySelector('[aria-label*="estrella"],[aria-label*="star"],[aria-label*="Valoración"],[aria-label*="Rated"]')||{}).getAttribute?.('aria-label')||null}); }
  return out;
})()`);
save(`../maps/search-reviews-${hl}.json`, cards);
console.log("saved", cards.length);
c.close();
process.exit(0);
