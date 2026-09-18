/**
 * Вкусы и цены ROCCO — как в tienda, а не в приложениях доставки (DESIGN.md §2.2).
 *
 * Источник цен — `_data/menu-text/prices.json`: табличка-арка у кассы (2–3 personas
 * и порции), печатный лист на стойке (8 personas, «*consultar disponibilidad»),
 * тикет 31.05.2026 (13,90 € за pequeña, пакет 0,60 €, IVA включён).
 * `npm run check:menu` сверяет цены здесь с этим файлом.
 *
 * Английские имена — с их же таблички (ES/EN); где табличка и лист расходятся,
 * решение в DESIGN.md §2.5. Описания: у clásica, pistacho, chocolate и lotus —
 * сокращённый текст владельца из Glovo/Uber Eats; у остальных — по тому, что
 * видно на студийном фото (DESIGN.md §2.3).
 */

import type { PhotoKey } from "@/lib/photos";

export type Flavour = {
  id: string;
  name: { es: string; en: string };
  /** Имя на табличке в другом языке — подпись мелким шрифтом. */
  boardName: { es: string; en: string };
  text: { es: string; en: string };
  photo: PhotoKey | null;
  /** «Cheesecake para 2-3 personas». */
  small: number;
  /** «Cheesecake para 8 personas». */
  large: number;
  /** «*consultar disponibilidad» у большого торта на листе. */
  largeOnRequest: boolean;
  /** Порция: clásica 4,90 €, «otros sabores» 5,90 €. */
  slice: number;
};

const f = (x: Flavour) => x;

/** Порядок — как на табличке у кассы. */
export const flavours: Flavour[] = [
  f({
    id: "clasica",
    name: { es: "Clásica", en: "Classic" },
    boardName: { es: "Classic", en: "Clásica" },
    text: {
      es: "La esencia de la casa: textura ultra cremosa, una cuidada selección de quesos y un horneado preciso.",
      en: "The essence of the house: an ultra-creamy texture, a careful selection of cheeses and precise baking.",
    },
    photo: "clasica",
    small: 13.9,
    large: 29.9,
    largeOnRequest: false,
    slice: 4.9,
  }),
  f({
    id: "pistacho",
    name: { es: "Pistacho", en: "Pistachio" },
    boardName: { es: "Pistachio", en: "Pistacho" },
    text: {
      es: "Una de sus creaciones más exclusivas: pistacho de alta calidad, intenso y aromático, y pistacho picado por encima.",
      en: "One of their most exclusive creations: high-quality pistachio, intense and aromatic, with chopped pistachio on top.",
    },
    photo: "pistacho",
    small: 14.9,
    large: 29.9,
    largeOnRequest: false,
    slice: 5.9,
  }),
  f({
    id: "lotus",
    name: { es: "Lotus con dulce de leche", en: "Biscoff with caramel" },
    boardName: { es: "Biscoff with caramel", en: "Lotus con dulce de leche" },
    text: {
      es: "La galleta Lotus caramelizada con la suavidad del dulce de leche. Pensada para los más golosos.",
      en: "Caramelised Lotus biscuit with smooth dulce de leche. Made for the sweetest tooth.",
    },
    photo: "lotus",
    small: 13.9,
    large: 29.9,
    largeOnRequest: false,
    slice: 5.9,
  }),
  f({
    id: "fresa",
    name: { es: "Fresa", en: "Strawberry" },
    boardName: { es: "Strawberry", en: "Fresa" },
    text: {
      es: "Coronada con fresas troceadas y glaseadas.",
      en: "Crowned with chopped, glazed strawberries.",
    },
    photo: "fresa",
    small: 13.9,
    large: 29.9,
    largeOnRequest: false,
    slice: 5.9,
  }),
  f({
    id: "arandanos",
    name: { es: "Arándanos", en: "Blueberry" },
    boardName: { es: "Blueberry", en: "Arándanos" },
    text: {
      es: "Con una capa brillante de arándanos por encima.",
      en: "With a glossy layer of blueberries on top.",
    },
    photo: "arandanos",
    small: 13.9,
    large: 29.9,
    largeOnRequest: false,
    slice: 5.9,
  }),
  f({
    id: "mango",
    name: { es: "Mango", en: "Mango" },
    boardName: { es: "Mango", en: "Mango" },
    text: {
      es: "Terminada con mango en dados.",
      en: "Finished with diced mango.",
    },
    photo: "mango",
    small: 13.9,
    large: 29.9,
    largeOnRequest: true,
    slice: 5.9,
  }),
  f({
    id: "chocolate",
    name: { es: "Chocolate negro", en: "Dark chocolate" },
    boardName: { es: "Dark chocolate", en: "Chocolate negro" },
    text: {
      es: "Intensa, sedosa y profundamente golosa: la suavidad del queso con la riqueza del cacao, y virutas de chocolate.",
      en: "Intense, silky and deeply indulgent: soft cheese meets rich cocoa, finished with chocolate curls.",
    },
    photo: "chocolate",
    small: 13.9,
    large: 29.9,
    largeOnRequest: true,
    slice: 5.9,
  }),
  f({
    id: "chocolate-blanco",
    name: { es: "Chocolate blanco", en: "White chocolate" },
    boardName: { es: "White chocolate", en: "Chocolate blanco" },
    text: {
      es: "Con virutas de chocolate blanco por encima.",
      en: "Topped with white chocolate curls.",
    },
    photo: "chocolateBlanco",
    small: 13.9,
    large: 29.9,
    largeOnRequest: true,
    slice: 5.9,
  }),
  f({
    id: "turron",
    name: { es: "Turrón", en: "Nougat" },
    boardName: { es: "Nougat", en: "Turrón" },
    text: {
      es: "El turrón, el dulce de almendra y miel de la tierra, hecho tarta de queso.",
      en: "Turrón, Spain’s almond-and-honey nougat, turned into cheesecake.",
    },
    photo: null,
    small: 13.9,
    large: 29.9,
    largeOnRequest: true,
    slice: 5.9,
  }),
  f({
    id: "avellana",
    name: { es: "Avellana", en: "Hazelnut" },
    boardName: { es: "Hazelnut", en: "Avellana" },
    text: {
      es: "Con avellana troceada por encima.",
      en: "Topped with chopped hazelnuts.",
    },
    photo: "avellana",
    small: 13.9,
    large: 29.9,
    largeOnRequest: true,
    slice: 5.9,
  }),
];

/** Три формата — как они продаются в tienda. «from» — самая низкая цена формата. */
export const formats = {
  slice: { from: 4.9, other: 5.9 },
  small: { from: 13.9, pistachio: 14.9, serves: "2–3" },
  large: { from: 29.9, serves: "8" },
} as const;

/** Пакет ROCCO — отдельной строкой тикета. */
export const bagPrice = 0.6;
