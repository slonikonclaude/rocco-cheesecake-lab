// node reviews.mjs <hl> <sort: relevant|newest> <max>
import { launch, attach, sleep, save, SCRATCH } from "./cdp.mjs";
const [hl = "es", sort = "newest", max = "400"] = process.argv.slice(2);
const PORT = 9762;
const URL_R = `https://www.google.com/maps/place/ROCCO+The+Cheesecake+Lab/@39.4690594,-0.3734898,17z/data=!4m8!3m7!1s0xd6049ee7e4703d9:0x3e9cd42b3296e7c6!8m2!3d39.4690594!4d-0.3734898!9m1!1b1!16s%2Fg%2F11x5p7kd4p?hl=${hl}`;

await launch({ port: PORT, profile: "chrome-profile2" });
const c = await attach(PORT);
await c.send("Page.enable");
await c.send("Page.bringToFront");
await c.send("Emulation.setFocusEmulationEnabled", { enabled: true });
await c.navigate(URL_R, 6000);
if ((await c.evaluate("location.href")).includes("consent.google")) {
  await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Rechazar todo|Reject all/.test(b.innerText))?.click()`);
  await sleep(4000);
  await c.navigate(URL_R, 7000);
}
const name = await c.evaluate("document.title + ' ' + ([...document.querySelectorAll('[role=main]')].map(m=>m.getAttribute('aria-label')).join(' '))");
console.log("place:", name);
if (!/ROCCO/.test(name)) { console.log("WRONG PLACE"); process.exit(1); }

if (sort === "newest") {
  await c.evaluate(`[...document.querySelectorAll('button')].find(b=>/Ordenar|Sort/.test(b.getAttribute('aria-label')||b.innerText))?.click()`);
  await sleep(1500);
  const ok = await c.evaluate(`(() => { const m=[...document.querySelectorAll('[role=menuitemradio]')]; const it=m.find(x=>/recientes|Newest/.test(x.innerText)); it?.click(); return m.map(x=>x.innerText) })()`);
  console.log("sort menu", ok);
  await sleep(3500);
}

let last = 0, stable = 0;
for (let i = 0; i < 1500 && stable < 12; i++) {
  const n = await c.evaluate(`(() => {
    const els=document.querySelectorAll('div[data-review-id].jftiEf');
    const scs=[...document.querySelectorAll('div')].filter(d=>d.scrollHeight>d.clientHeight+100 && /auto|scroll/.test(getComputedStyle(d).overflowY) && d.querySelector('div[data-review-id]'));
    scs.forEach(sc=>sc.scrollTop=sc.scrollHeight);
    return els.length;
  })()`);
  if (n === last) stable++; else stable = 0;
  last = n;
  if (i % 20 === 0) console.log("reviews loaded", n);
  if (n >= Number(max)) break;
  await sleep(stable ? 2000 : 1400);
}
// expand all «Más»
await c.evaluate(`document.querySelectorAll('button.w8nwRe, button[aria-label="Ver más"], button[aria-label="See more"]').forEach(b=>b.click())`);
await sleep(2500);
const reviews = await c.evaluate(`(() => [...document.querySelectorAll('div[data-review-id].jftiEf')].map(r => {
  const q=(s)=>r.querySelector(s);
  const stars=q('.kvMYJc')?.getAttribute('aria-label')||q('.fzvQIb')?.innerText||'';
  const photos=[...r.querySelectorAll('button.Tya61d')].map(b=>(b.style.backgroundImage.match(/url\\("?([^")]+)/)||[])[1]).filter(Boolean);
  return {
    id: r.getAttribute('data-review-id'),
    author: q('.d4r55')?.innerText,
    authorInfo: q('.RfnDt')?.innerText,
    stars, time: q('.rsqaWe')?.innerText || q('.xRkPPb')?.innerText,
    text: q('.MyEned .wiI7pd')?.innerText || '',
    details: [...r.querySelectorAll('.PBK6be')].map(d=>d.innerText),
    response: q('.CDe7pd')?.innerText || '',
    photos,
  };
}))()`);
save(`${SCRATCH}/reviews-${hl}-${sort}.json`, reviews);
console.log("saved", reviews.length, "with text", reviews.filter((r) => r.text).length);
c.close();
process.exit(0);
