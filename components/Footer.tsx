import { Logo } from "@/components/Logo";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";
import { hrefFor } from "@/lib/site";

/** Подвал: адрес, часы, телефон, ссылки (Instagram, Google Maps, доставка, другой язык), источники данных. */
export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const f = dict.footer;
  const a = restaurant.address;
  const opens = restaurant.hours[0].shifts[0].opens;
  const link = "inline-flex min-h-11 items-center text-on-dark-muted underline-offset-4 transition-colors duration-200 hover:text-on-dark hover:underline";

  return (
    <footer className="tone-dark">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo size={30} className="text-on-dark" />
          <p className="mt-6 max-w-[34ch] text-on-dark-muted">{f.tagline}</p>
        </div>
        <div className="flex flex-col gap-1 text-[0.97rem] text-on-dark">
          <p>{a.street}</p>
          <p>
            {a.district}, {a.postalCode} {a.city}
          </p>
          <p className="tabular mt-3">{dict.hero.open(opens)}</p>
          <a href={`tel:${restaurant.phone.tel}`} className={`tabular ${link}`}>
            {restaurant.phone.display}
          </a>
        </div>
        <nav aria-label={f.links} className="flex flex-col text-[0.97rem]">
          <a href={restaurant.instagram.url} target="_blank" rel="noopener" className={link}>
            Instagram · @{restaurant.instagram.handle}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={restaurant.googleMapsUrl} target="_blank" rel="noopener" className={link}>
            Google Maps
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={restaurant.delivery.glovo[locale]} target="_blank" rel="noopener" className={link}>
            Glovo
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={restaurant.delivery.uberEats[locale]} target="_blank" rel="noopener" className={link}>
            Uber Eats
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
          <a href={hrefFor(dict.otherLocale.code)} hrefLang={dict.otherLocale.code} lang={dict.otherLocale.code} className={link}>
            {dict.otherLocale.code === "en" ? "English" : "Español"}
          </a>
        </nav>
      </div>
      <div className="border-t border-cacao-line">
        <p className="mx-auto max-w-7xl px-5 py-6 text-[0.82rem] text-on-dark-muted sm:px-8">{f.sources}</p>
      </div>
    </footer>
  );
}
