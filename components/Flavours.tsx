import { Img } from "@/components/Img";
import { Lid } from "@/components/Logo";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatPrice } from "@/lib/format";
import { flavours } from "@/lib/menu";
import { photos } from "@/lib/photos";

/**
 * «La vitrina» (DESIGN.md §7.2): десять вкусов в нишах-арках, как торты в
 * подсвеченных нишах их стены-витрины. Номер N.º 01–10 — «образцы» лаборатории.
 * У турона студийного фото нет — в нише крышка коробки (DESIGN.md §3).
 * Сетка 2 → 5 колонок: 10 карточек ложатся без дыр (при 3 колонках десятая оставалась бы одна).
 */
export function Flavours({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.flavours;
  const other = locale === "es" ? "en" : "es";

  return (
    <Section id="sabores" tone="light" eyebrow={t.eyebrow} title={t.title} note={t.note}>
      <RevealGroup as="ol" className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-5">
        {flavours.map((fl, i) => {
          const photo = fl.photo ? photos[fl.photo] : null;
          return (
            <RevealItem as="li" key={fl.id} className="flex min-w-0 flex-col">
              <div className="niche arch flex aspect-[3/4] w-full items-center justify-center bg-sand">
                {photo ? (
                  <Img
                    photo={photo}
                    locale={locale}
                    sizes="(min-width: 1280px) 230px, (min-width: 1024px) 18vw, 46vw"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <Lid size={120} />
                    <span className="sr-only">{t.noPhoto}</span>
                  </>
                )}
              </div>

              <p className="tabular eyebrow mt-5 text-rocco-deep">{t.number(i + 1)}</p>
              <h3 className="mt-2 font-display text-[1.45rem] leading-[1.1] text-cacao sm:text-[1.6rem]">{fl.name[locale]}</h3>
              <p lang={other} className="mt-1 text-[0.9rem] italic text-muted">
                {fl.boardName[locale]}
              </p>
              <p className="mb-4 mt-3 text-[0.95rem] leading-relaxed text-muted">{fl.text[locale]}</p>

              <dl className="tabular mt-auto grid gap-1 border-t border-line pt-3 text-[0.84rem] sm:text-[0.9rem]">
                <div className="flex items-baseline gap-2">
                  <dt className="flex flex-1 items-baseline gap-2 text-muted">
                    <span className="whitespace-nowrap">{t.small}</span>
                    <span aria-hidden="true" className="leader" />
                  </dt>
                  <dd className="font-medium text-cacao">{formatPrice(fl.small, locale)}</dd>
                </div>
                <div className="flex items-baseline gap-2">
                  <dt className="flex flex-1 items-baseline gap-2 text-muted">
                    <span className="whitespace-nowrap">{t.large}</span>
                    <span aria-hidden="true" className="leader" />
                  </dt>
                  <dd className="font-medium text-cacao">
                    {formatPrice(fl.large, locale)}
                    {fl.largeOnRequest ? (
                      <>
                        <span aria-hidden="true">*</span>
                        <span className="sr-only"> ({t.onRequest})</span>
                      </>
                    ) : null}
                  </dd>
                </div>
              </dl>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <p className="mt-10 text-[0.9rem] text-muted">{dict.prices.footnotes[0]}</p>
    </Section>
  );
}
