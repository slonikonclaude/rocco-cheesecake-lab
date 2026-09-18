import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { Stars } from "@/components/Stars";
import { IconExternal } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatCount, formatMonth, formatRating } from "@/lib/format";
import { restaurant } from "@/lib/restaurant";
import { reviews } from "@/lib/reviews";

/**
 * «Opiniones» (DESIGN.md §7.6). Сводка честная: рейтинг, вся гистограмма звёзд
 * (включая 13 единиц) и десять тем Google с числом упоминаний. Витрина — отзывы
 * на языке страницы, в оригинале (lib/reviews.ts), без переводов.
 */
export function Reviews({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const r = dict.reviews;
  const { value, count, histogram } = restaurant.rating;
  const max = Math.max(...histogram.map((h) => h.count));

  return (
    <Section id="opiniones" tone="deep" eyebrow={r.eyebrow} title={r.title}>
      <div className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-10">
          <div>
            <p className="flex items-end gap-3">
              <span className="tabular font-display text-[5.2rem] leading-[0.85] text-cacao">{formatRating(value, locale)}</span>
              <span className="pb-1 text-muted">{r.outOf}</span>
            </p>
            <Stars value={value} idPrefix="reviews" size={20} className="mt-4 text-rocco" />
            <p className="tabular mt-2 text-muted">{r.basedOn(formatCount(count, locale))}</p>
          </div>

          <div>
            <h3 className="eyebrow text-cacao">{r.histogram}</h3>
            <dl className="mt-4 flex flex-col gap-2">
              {histogram.map((h) => (
                <div key={h.stars} className="grid grid-cols-[5rem_1fr_3rem] items-center gap-3 text-[0.9rem]">
                  <dt className="text-muted">{r.starsLabel(h.stars)}</dt>
                  <dd aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-cream">
                    <span className="block h-full rounded-full bg-rocco" style={{ width: `${Math.max(1.5, (h.count / max) * 100)}%` }} />
                  </dd>
                  <dd className="tabular text-right text-cacao">{formatCount(h.count, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="eyebrow text-cacao">{r.topicsTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {restaurant.topics.map((t) => (
                <li key={t.key} className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3 py-1.5 text-[0.9rem] text-cacao">
                  {r.topics[t.key]}
                  <span aria-hidden="true" className="tabular text-muted">
                    {formatCount(t.count, locale)}
                  </span>
                  <span className="sr-only">, {r.topicCount(formatCount(t.count, locale))}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div>
          <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2">
            {reviews[locale].map((rv) => (
              <RevealItem as="li" key={rv.id}>
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6 sm:p-7">
                  <Stars value={rv.stars} idPrefix={`rv-${rv.id.slice(-10)}`} size={15} className="text-rocco" />
                  <span className="sr-only">{r.stars(rv.stars)}</span>
                  <blockquote lang={locale} className="mt-4 flex-1 leading-relaxed whitespace-pre-line text-cacao">
                    <p>{rv.text}</p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-baseline justify-between gap-3 border-t border-line pt-4 text-[0.92rem]">
                    <span className="font-medium text-cacao">{rv.author}</span>
                    <span className="text-muted">{formatMonth(rv.month, locale)}</span>
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 font-medium text-cacao underline decoration-rocco underline-offset-4 hover:decoration-2"
            >
              {r.readAll}
              <IconExternal width={15} height={15} />
              <span className="sr-only"> {dict.cta.newTab}</span>
            </a>
            <p className="text-[0.88rem] text-muted">{r.googleNote}</p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
