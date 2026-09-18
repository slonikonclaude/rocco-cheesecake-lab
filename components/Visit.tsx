import { HoursTable } from "@/components/HoursTable";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconDirections, IconExternal, IconInstagram, IconPhone, IconPin } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { restaurant } from "@/lib/restaurant";

/**
 * «Visítanos» (DESIGN.md §7.7): часы (Google), адрес и контакты, доставка
 * (Glovo — ссылка «Pedir online» из карточки, Uber Eats — из их Instagram),
 * карта Google по клику (components/MapEmbed.tsx).
 */
export function Visit({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const v = dict.visit;
  const a = restaurant.address;
  const outline =
    "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-cacao/30 px-6 font-medium text-cacao transition-colors duration-200 hover:border-cacao";

  return (
    <Section id="visitanos" tone="light" eyebrow={v.eyebrow} title={v.title} note={v.near}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal className="flex flex-col gap-10">
          <div>
            <h3 className="eyebrow text-rocco-deep">{v.hours}</h3>
            <div className="mt-4">
              <HoursTable locale={locale} />
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-rocco-deep">{v.contact}</h3>
            <address className="mt-4 flex flex-col gap-3 not-italic text-cacao">
              <span className="flex items-start gap-3">
                <IconPin width={19} height={19} className="mt-1 shrink-0 text-rocco-deep" />
                <span>
                  {a.street}
                  <br />
                  {a.district}, {a.postalCode} {a.city}
                </span>
              </span>
              <a href={`tel:${restaurant.phone.tel}`} className="tabular inline-flex min-h-11 items-center gap-3 underline decoration-line underline-offset-4 hover:decoration-rocco">
                <IconPhone width={19} height={19} className="shrink-0 text-rocco-deep" />
                {restaurant.phone.display}
              </a>
              <a
                href={restaurant.instagram.url}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-11 items-center gap-3 underline decoration-line underline-offset-4 hover:decoration-rocco"
              >
                <IconInstagram width={19} height={19} className="shrink-0 text-rocco-deep" />
                {v.instagram(restaurant.instagram.handle, restaurant.instagram.followers)}
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
            </address>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={restaurant.directionsUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-rocco px-6 font-medium text-cacao transition-colors duration-200 hover:bg-rocco-soft"
              >
                <IconDirections width={18} height={18} />
                {dict.cta.directions}
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
              <a href={`tel:${restaurant.phone.tel}`} className={`tabular ${outline}`}>
                <IconPhone width={17} height={17} />
                {dict.cta.callLong(restaurant.phone.display)}
              </a>
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-rocco-deep">{v.delivery}</h3>
            <p className="mt-3 max-w-[46ch] text-muted">{v.deliveryNote}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={restaurant.delivery.glovo[locale]} target="_blank" rel="noopener" className={outline}>
                Glovo
                <IconExternal width={15} height={15} />
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
              <a href={restaurant.delivery.uberEats[locale]} target="_blank" rel="noopener" className={outline}>
                Uber Eats
                <IconExternal width={15} height={15} />
                <span className="sr-only"> {dict.cta.newTab}</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-4">
          <MapEmbed locale={locale} />
          <a
            href={restaurant.googleMapsUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center gap-2 self-start font-medium text-cacao underline decoration-rocco underline-offset-4 hover:decoration-2"
          >
            <IconExternal width={16} height={16} />
            {v.openMaps}
            <span className="sr-only"> {dict.cta.newTab}</span>
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
