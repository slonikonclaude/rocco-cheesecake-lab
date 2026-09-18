/**
 * Снимки из public/photos. Каждое имя есть в двух ширинах: <name>-800.webp и
 * <name>-1600.webp (scripts/optimize-photos.mjs; меньшие исходники не
 * растягиваются — фактическая ширина считается в srcFor). width/height —
 * размеры `_photos/<name>.jpg` из photo-manifest.json, против сдвига вёрстки.
 *
 * Откуда (DESIGN.md §1, §3):
 * - hero и торты в коробке — студийная съёмка владельца из их магазинов на
 *   Uber Eats (общий кадр 2880×2304, авельяна) и Glovo (остальные вкусы);
 * - зал, витрина, фасад, порция, пакет — фото гостей и владельца из карточки
 *   Google (номера в `_data/maps/all-photos.json`). Лиц и тикетов нет.
 * `position` — точка кадрирования для object-cover в арках и кругах.
 * alt описывает то, что видно.
 */

import { withBase } from "@/lib/basePath";

export type Photo = {
  name: string;
  width: number;
  height: number;
  alt: { es: string; en: string };
  position?: string;
};

const p = (name: string, width: number, height: number, es: string, en: string, position?: string): Photo => ({
  name,
  width,
  height,
  alt: { es, en },
  position,
});

export const photos = {
  hero: p(
    "hero",
    2400,
    1920,
    "Tartas de queso de ROCCO en sus cajas naranjas: clásica, pistacho y Lotus enteras, tartitas lisa, de pistacho, de chocolate y de avellana, y dos porciones",
    "ROCCO cheesecakes in their orange boxes: whole classic, pistachio and Lotus cakes, small plain, pistachio, chocolate and hazelnut ones, and two slices",
    "50% 40%",
  ),

  // La vitrina — tartas para 2–3 personas en su caja, foto de estudio
  clasica: p("clasica", 735, 733, "Tarta clásica en su caja naranja abierta", "Classic cheesecake in its open orange box", "62% 60%"),
  pistacho: p("pistacho", 731, 733, "Tarta de pistacho con pistacho picado y entero, en su caja", "Pistachio cheesecake with chopped and whole pistachios, in its box", "62% 60%"),
  lotus: p("lotus", 729, 734, "Tarta de Lotus con dulce de leche por encima, en su caja", "Lotus cheesecake topped with dulce de leche, in its box", "62% 60%"),
  fresa: p("fresa", 1280, 853, "Tarta de fresa cubierta de fresas troceadas, en su caja", "Strawberry cheesecake covered in chopped strawberries, in its box", "58% 55%"),
  arandanos: p("arandanos", 1280, 853, "Tarta de arándanos con su capa de arándanos, en su caja", "Blueberry cheesecake with its layer of blueberries, in its box", "58% 55%"),
  mango: p("mango", 1280, 853, "Tarta de mango con dados de mango, en su caja", "Mango cheesecake with diced mango, in its box", "58% 55%"),
  chocolate: p("chocolate", 727, 727, "Tarta de chocolate con virutas de chocolate negro, en su caja", "Chocolate cheesecake with dark chocolate curls, in its box", "62% 60%"),
  chocolateBlanco: p("chocolate-blanco", 1280, 853, "Tarta de chocolate blanco con virutas blancas, en su caja", "White chocolate cheesecake with white curls, in its box", "58% 55%"),
  avellana: p("avellana", 660, 440, "Tarta de avellana con avellana troceada, en su caja", "Hazelnut cheesecake with chopped hazelnuts, in its box", "58% 55%"),

  // Formatos
  porcion: p("porcion", 1080, 1440, "Una porción de tarta clásica sobre la bandeja naranja con el logo ROCCO", "A slice of classic cheesecake on the orange ROCCO tray", "50% 60%"),

  // Para regalar
  bolsa: p("bolsa", 1807, 2400, "Bolsa naranja de ROCCO The Cheesecake Lab con asas de cinta", "Orange ROCCO The Cheesecake Lab bag with ribbon handles", "50% 45%"),
  torreCajas: p("torre-cajas", 1800, 2400, "Tres cajas redondas naranjas apiladas en el mostrador", "Three round orange boxes stacked on the counter", "55% 70%"),
  piramide: p("piramide", 1800, 2400, "Pirámide de cajas naranjas con el logo dorado bajo el rótulo ROCCO", "A pyramid of orange boxes with the gold logo under the ROCCO sign", "50% 55%"),

  // La tienda
  fachada: p("fachada", 1800, 2400, "Fachada de ROCCO de noche: escaparate iluminado y puerta de cristal en Roger de Llòria", "ROCCO's façade at night: lit shop window and glass door on Roger de Llòria", "40% 60%"),
  escaparate: p("escaparate", 1800, 2400, "El escaparate: cajas naranjas colgadas de cuerdas y una pirámide de cajas sobre un pie dorado", "The shop window: orange boxes hanging from ropes and a pyramid of boxes on a gold stand", "50% 60%"),
  mostrador: p("mostrador", 1800, 2400, "El mostrador curvo con ROCCO en relieve y la hornacina en arco iluminada detrás", "The curved counter with ROCCO in relief and the lit arched niche behind it", "50% 55%"),
  tienda: p("tienda", 1800, 2400, "Interior: la pared de vitrinas con tartas en hornacinas iluminadas y el mostrador", "Inside: the wall of display fridges with cakes in lit niches, and the counter", "50% 55%"),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/**
 * srcset с фактическими ширинами: исходник 660 px не превращается в «1600w».
 * Снимки уже 800 px (студийные торты из приложений) существуют в одном файле -800.
 */
export function srcFor(photo: Photo) {
  const small = withBase(`/photos/${photo.name}-800.webp`);
  if (photo.width <= 800) return { src: small, srcSet: `${small} ${photo.width}w` };
  const large = withBase(`/photos/${photo.name}-1600.webp`);
  return { src: large, srcSet: `${small} 800w, ${large} ${Math.min(1600, photo.width)}w` };
}
