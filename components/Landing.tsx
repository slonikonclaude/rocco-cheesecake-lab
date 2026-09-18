import { CtaBand } from "@/components/CtaBand";
import { Flavours } from "@/components/Flavours";
import { Footer } from "@/components/Footer";
import { Gift } from "@/components/Gift";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Prices } from "@/components/Prices";
import { Reviews } from "@/components/Reviews";
import { Shop } from "@/components/Shop";
import { Visit } from "@/components/Visit";
import type { Locale } from "@/lib/dictionaries";

/**
 * Порядок секций — DESIGN.md §7; тон чередуется: крем, песок, какао, оранжевый
 * в конце. Обе языковые страницы собираются из одного компонента.
 */
export function Landing({ locale }: { locale: Locale }) {
  return (
    <>
      <JsonLd locale={locale} />
      <Header locale={locale} />
      <main id="contenido" className="flex-1">
        <Hero locale={locale} />
        <Flavours locale={locale} />
        <Prices locale={locale} />
        <Gift locale={locale} />
        <Shop locale={locale} />
        <Reviews locale={locale} />
        <Visit locale={locale} />
        <CtaBand locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
