import { Img } from "@/components/Img";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconCheck } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { formatCount, formatPriceRange } from "@/lib/format";
import { photos } from "@/lib/photos";
import { restaurant } from "@/lib/restaurant";

/**
 * «La tienda» (DESIGN.md §7.5): четыре кадра зала с подписью под каждым (подпись
 * и есть описание — у самого <img> alt пустой, чтобы диктор не читал дважды) и
 * короткий список «Bueno saber». Факты — атрибут доступности карточки Google,
 * оплата картой (тикет), парковка (детали отзывов), чек по оценкам Google.
 */
export function Shop({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const s = dict.shop;
  const { from, to, reports } = restaurant.pricePerPerson;

  const shots = [photos.escaparate, photos.mostrador, photos.tienda, photos.fachada];
  const facts = [
    s.facts.wheelchair,
    s.facts.card,
    s.facts.parking,
    s.facts.price(formatPriceRange(from, to, locale), formatCount(reports, locale)),
  ];

  return (
    <Section id="tienda" tone="light" eyebrow={s.eyebrow} title={s.title}>
      <div className="grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted">{s.text}</p>
          <h3 className="eyebrow mt-10 text-rocco-deep">{s.factsTitle}</h3>
          <ul className="mt-4 grid gap-3 text-cacao">
            {facts.map((f) => (
              <li key={f} className="tabular flex gap-3">
                <IconCheck width={19} height={19} className="mt-1 shrink-0 text-rocco-deep" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        <RevealGroup as="ul" className="grid grid-cols-2 gap-4 sm:gap-5">
          {shots.map((ph, i) => (
            <RevealItem as="li" key={ph.name} className={i % 2 === 1 ? "sm:mt-12" : ""}>
              <figure>
                <div className={`${i === 0 ? "arch" : "overflow-hidden rounded-2xl"} bg-sand`}>
                  <Img photo={ph} locale={locale} decorative sizes="(min-width: 1024px) 26vw, 46vw" className="aspect-[3/4] h-full w-full object-cover" />
                </div>
                <figcaption className="mt-3 text-[0.88rem] leading-snug text-muted">{ph.alt[locale]}</figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
