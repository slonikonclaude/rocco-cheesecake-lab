import { Img } from "@/components/Img";
import { Lid } from "@/components/Logo";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatPrice } from "@/lib/format";
import { flavours, formats } from "@/lib/menu";
import { photos } from "@/lib/photos";

/**
 * «Formatos y precios» (DESIGN.md §7.3). Цены tienda — табличка у кассы, лист
 * на стойке и тикет (lib/menu.ts); про приложения доставки — одна строка в
 * подводке. Три формата: порция — фото подноса, тарты — крышки разного
 * размера (соотношение кругов условное, сантиметров в источниках нет).
 * Затем полная таблица: <table> с <th scope>, цены табличными цифрами.
 */
export function Prices({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.prices;
  const p = (v: number) => formatPrice(v, locale);

  const cards = [
    {
      key: "slice",
      name: t.slice.name,
      serves: t.slice.serves,
      price: t.slice.price(p(formats.slice.from), p(formats.slice.other)),
      text: t.slice.text,
      visual: (
        <span className="arch block aspect-square w-28 bg-sand sm:w-32">
          <Img photo={photos.porcion} locale={locale} sizes="128px" className="h-full w-full object-cover" />
        </span>
      ),
    },
    {
      key: "small",
      name: t.small.name,
      serves: t.small.serves,
      price: t.small.price(p(formats.small.from), p(formats.small.pistachio)),
      text: t.small.text,
      visual: <Lid size={84} label={false} />,
    },
    {
      key: "large",
      name: t.large.name,
      serves: t.large.serves,
      price: t.large.price(p(formats.large.from)),
      text: t.large.text,
      visual: <Lid size={128} />,
    },
  ];

  return (
    <Section id="precios" tone="deep" eyebrow={t.eyebrow} title={t.title} note={t.note}>
      <RevealGroup as="ul" className="grid gap-4 lg:grid-cols-3">
        {cards.map((c) => (
          <RevealItem as="li" key={c.key} className="flex flex-col rounded-2xl border border-line bg-cream p-6 sm:p-8">
            <div className="flex h-32 items-end">{c.visual}</div>
            <p className="eyebrow mt-7 text-rocco-deep">{c.serves}</p>
            <h3 className="mt-2 font-display text-[1.9rem] leading-tight text-cacao">{c.name}</h3>
            <p className="tabular mt-3 text-[1.15rem] font-medium text-cacao">{c.price}</p>
            <p className="mt-2 text-muted">{c.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14">
        <div className="relative overflow-x-auto rounded-2xl border border-line bg-cream">
          <table className="tabular w-full border-collapse text-left text-[0.88rem] sm:text-base">
            <caption className="px-3 pb-2 pt-6 text-left font-display text-[1.5rem] text-cacao sm:px-8">{t.tableCaption}</caption>
            <thead>
              <tr className="border-b border-line text-[0.82rem] text-muted sm:text-[0.9rem]">
                <th scope="col" className="py-3 pl-3 pr-1.5 font-medium sm:pl-8 sm:pr-2">
                  {t.colFlavour}
                </th>
                <th scope="col" className="px-1.5 py-3 text-right font-medium sm:px-2">
                  {t.colSlice}
                </th>
                <th scope="col" className="px-1.5 py-3 text-right font-medium sm:px-2">
                  {t.colSmall}
                </th>
                <th scope="col" className="py-3 pl-1.5 pr-3 text-right font-medium sm:pl-2 sm:pr-8">
                  {t.colLarge}
                </th>
              </tr>
            </thead>
            <tbody>
              {flavours.map((fl) => (
                <tr key={fl.id} className="border-b border-line last:border-b-0">
                  <th scope="row" className="py-3 pl-3 pr-1.5 font-normal text-cacao sm:pl-8 sm:pr-2">
                    {fl.name[locale]}
                  </th>
                  <td className="whitespace-nowrap px-1.5 py-3 text-right text-cacao sm:px-2">{p(fl.slice)}</td>
                  <td className="whitespace-nowrap px-1.5 py-3 text-right text-cacao sm:px-2">{p(fl.small)}</td>
                  <td className="whitespace-nowrap py-3 pl-1.5 pr-3 text-right text-cacao sm:pl-2 sm:pr-8">
                    {p(fl.large)}
                    {fl.largeOnRequest ? (
                      <>
                        <span aria-hidden="true">*</span>
                        <span className="sr-only"> ({t.onRequestMark})</span>
                      </>
                    ) : (
                      <span aria-hidden="true" className="invisible">
                        *
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 grid gap-1.5 text-[0.92rem] text-muted">
          {t.footnotes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
