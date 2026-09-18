import { Reveal } from "@/components/Reveal";
import { IconDirections } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";

/**
 * Последний экран перед подвалом — плоскость оранжевого коробки с текстом
 * какао (4,6:1). Одно главное действие («Cómo llegar») и звонок вторым.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const opens = restaurant.hours[0].shifts[0].opens;

  return (
    <section aria-labelledby="cta-title" className="tone-accent">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="cta-title" className="balance font-display text-[2.1rem] leading-tight text-cacao sm:text-[2.6rem]">
            {restaurant.address.street}
          </h2>
          <p className="tabular mt-2 text-[1.05rem] text-cacao">{dict.hero.open(opens)}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href={restaurant.directionsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-cacao px-8 text-base font-medium text-on-dark transition-colors duration-200 hover:bg-cacao-soft"
          >
            <IconDirections width={18} height={18} />
            {dict.cta.directions}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a
            href={`tel:${restaurant.phone.tel}`}
            className="tabular inline-flex min-h-13 items-center justify-center rounded-full border border-cacao/40 px-8 text-base font-medium text-cacao transition-colors duration-200 hover:border-cacao"
          >
            {dict.cta.callLong(restaurant.phone.display)}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
