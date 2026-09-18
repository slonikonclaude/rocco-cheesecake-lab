import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { IconCheck } from "@/components/icons";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos } from "@/lib/photos";

/**
 * «Para regalar» (DESIGN.md §7.4): тёмная полоса — какао цоколя фасада, чтобы
 * оранжевый коробок на фото горел. Факты: коробка с золотым логотипом, пакет
 * с лентами 0,60 € (тикет), тема «packaging» — 21 отзыв Google. Цитата — из
 * отзыва на языке страницы.
 */
export function Gift({ locale }: { locale: Locale }) {
  const g = getDictionary(locale).gift;

  return (
    <Section id="regalar" tone="dark" eyebrow={g.eyebrow} title={g.title}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
        <Reveal className="grid grid-cols-[1.25fr_1fr] gap-4">
          <div className="arch row-span-2 bg-cacao-soft">
            <Img photo={photos.bolsa} locale={locale} sizes="(min-width: 1024px) 30vw, 55vw" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-cacao-soft">
            <Img photo={photos.torreCajas} locale={locale} sizes="(min-width: 1024px) 22vw, 42vw" className="aspect-[4/5] h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl bg-cacao-soft">
            <Img photo={photos.piramide} locale={locale} sizes="(min-width: 1024px) 22vw, 42vw" className="aspect-[4/5] h-full w-full object-cover" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="max-w-[46ch] text-lg leading-relaxed text-on-dark-muted">{g.text}</p>
          <ul className="mt-8 grid gap-3">
            {g.points.map((pt) => (
              <li key={pt} className="flex gap-3 text-on-dark">
                <IconCheck width={19} height={19} className="mt-1 shrink-0 text-gold" />
                {pt}
              </li>
            ))}
          </ul>
          <figure className="mt-10 border-l-2 border-rocco pl-6">
            <blockquote className="font-display text-[1.6rem] leading-snug italic text-on-dark sm:text-[1.9rem]">
              <p>{locale === "es" ? `«${g.quote}»` : `“${g.quote}”`}</p>
            </blockquote>
            <figcaption className="mt-3 text-[0.92rem] text-on-dark-muted">{g.quoteAuthor}</figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
