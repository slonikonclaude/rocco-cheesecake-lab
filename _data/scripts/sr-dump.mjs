// Attach to the open Search-panel tab (port 9871) and dump every review card: walk up from [data-review-id]
// to the largest ancestor that holds only that review.
import { attach, save } from "./cdp.mjs";
const hl = process.argv[2] || "es";
const c = await attach(9871);
const cards = await c.evaluate(`(() => {
  const bg = (x) => { const s = x.style && x.style.backgroundImage; if (!s || s.indexOf('url(') < 0) return null; return s.slice(s.indexOf('url(') + 4).replace(/["')]/g, ''); };
  const out = [];
  for (const m of document.querySelectorAll('[data-review-id]')) {
    let e = m;
    while (e.parentElement && e.parentElement.querySelectorAll('[data-review-id]').length === 1) e = e.parentElement;
    const starEl = e.querySelector('[aria-label*="estrellas"],[aria-label*="stars"],[aria-label*="Valoración"],[aria-label*="Rated"]');
    const photos = [...e.querySelectorAll('[style*="background-image"], img')]
      .map((x) => x.currentSrc || x.src || bg(x))
      .filter((u) => u && u.indexOf('googleusercontent') >= 0);
    out.push({ id: m.getAttribute('data-review-id'), stars: starEl ? starEl.getAttribute('aria-label') : null, text: e.innerText, photos });
  }
  return out;
})()`);
save(`../maps/search-reviews-${hl}.json`, cards);
console.log("saved", cards.length, "with stars", cards.filter((x) => x.stars).length);
console.log(JSON.stringify(cards.slice(0, 3), null, 1).slice(0, 2500));
c.close();
process.exit(0);
