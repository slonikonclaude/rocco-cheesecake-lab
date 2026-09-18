import { Img } from "@/components/Img";
import { Stars } from "@/components/Stars";
import { IconClock, IconDirections } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatCount, formatPrice, formatRating } from "@/lib/format";
import { formats } from "@/lib/menu";
import { photos } from "@/lib/photos";
import { restaurant } from "@/lib/restaurant";

/**
 * Первый экран (DESIGN.md §7.1). Слева вордмарк и их бренд-строка из Instagram,
 * справа студийный кадр тортов в арке — форма их ниш у кассы. На телефоне арка
 * под текстом, ниже первого экрана не уходит главное: имя, строка, кнопки.
 *
 * Без скролловой анимации: первый экран и так в кадре, а `opacity:0` из SSR
 * держал бы h1 и кнопки невидимыми до гидратации (и откладывал LCP).
 * `data-hero` — для временного CSS при съёмке headless.
 */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const h = dict.hero;
  const opens = restaurant.hours[0].shifts[0].opens;

  return (
    <section data-hero="" aria-labelledby="hero-title" className="tone-light relative overflow-hidden pt-18">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pt-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-20">
        <div className="max-w-xl">
          <p className="eyebrow flex items-center gap-3 text-rocco-deep">
            <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-rocco" />
            {h.eyebrow}
          </p>

          <h1 id="hero-title" className="mt-7 flex flex-col leading-none text-cacao">
            <span className="wordmark text-[3.6rem] sm:text-[5.4rem] lg:text-[6.4rem]">Rocco</span>
            <span className="mt-3 text-[1.05rem] tracking-[0.12em] sm:text-[1.3rem]">The Cheesecake Lab</span>
          </h1>

          <p className="balance mt-9 font-display text-[1.9rem] leading-[1.15] italic text-cacao sm:text-[2.4rem]">{h.claim}</p>
          <p className="mt-5 max-w-[46ch] text-[1.08rem] leading-relaxed text-muted">{h.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sabores"
              className="inline-flex min-h-13 items-center justify-center rounded-full bg-rocco px-8 text-base font-medium text-cacao transition-colors duration-200 hover:bg-rocco-soft"
            >
              {dict.cta.seeFlavours}
            </a>
            <a
              href={restaurant.directionsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-cacao/30 px-8 text-base font-medium text-cacao transition-colors duration-200 hover:border-cacao"
            >
              <IconDirections width={18} height={18} />
              {dict.cta.directions}
              <span className="sr-only"> {dict.cta.newTab}</span>
            </a>
          </div>

          <dl className="mt-10 grid gap-2.5 border-t border-line pt-6 text-[0.97rem] text-muted">
            <div>
              <dt className="sr-only">Google</dt>
              <dd className="tabular flex items-center gap-2.5">
                <Stars value={restaurant.rating.value} idPrefix="hero" size={15} className="text-rocco" />
                {h.rating(formatRating(restaurant.rating.value, locale), formatCount(restaurant.rating.count, locale))}
              </dd>
            </div>
            <div className="flex items-center gap-2.5">
              <dt className="sr-only">{dict.visit.hours}</dt>
              <dd className="tabular flex items-center gap-2.5">
                <IconClock width={17} height={17} className="text-rocco-deep" />
                {h.open(opens)}
              </dd>
            </div>
            <div>
              <dt className="sr-only">{dict.prices.slice.name}</dt>
              <dd className="tabular flex items-center gap-2.5">
                <span aria-hidden="true" className="ml-0.5 inline-block h-3.5 w-3.5 rounded-full border-2 border-rocco" />
                {h.from(formatPrice(formats.slice.from, locale))}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <div className="niche arch aspect-[4/5] w-full bg-sand">
            <Img
              photo={photos.hero}
              locale={locale}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 92vw"
              priority
              className="h-full w-full object-cover"
              style={{ objectPosition: photos.hero.position }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
