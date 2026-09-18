/**
 * Факты о ROCCO The Cheesecake Lab (C/ de Roger de Llòria, 20).
 * Источники: карточка Google Maps (`0xd6049ee7e4703d9:0x3e9cd42b3296e7c6`, снята
 * 18.09.2026 → `_data/maps/`), панель Google Поиска, их Instagram и страницы
 * Glovo / Uber Eats (→ `_data/web/`). Ничего не выдумано: если поля в источнике
 * нет, его нет и здесь. Расхождения решены в DESIGN.md §2–3.
 */

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const DAYS: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export type Shift = { opens: string; closes: string };

/** Недельная таблица карточки (`[203]`): 11:00–22:00, пятница и суббота до 23:00. Uber Eats показывает те же часы. */
export const venueHours: { day: DayKey; shifts: Shift[] }[] = DAYS.map((day) => ({
  day,
  shifts: [{ opens: "11:00", closes: day === "fri" || day === "sat" ? "23:00" : "22:00" }],
}));

export const restaurant = {
  name: "ROCCO",
  /** Как в карточке Google и на их тикете. */
  fullName: "ROCCO The Cheesecake Lab",
  tagline: "The Cheesecake Lab",

  address: {
    street: "C/ de Roger de Llòria, 20",
    district: "Ciutat Vella",
    postalCode: "46002",
    city: "València",
    region: "Comunitat Valenciana",
    country: "ES",
  },

  geo: { lat: 39.4690594, lng: -0.3734898 },
  plusCode: "8CFXFJ9G+JJ",

  /** Карточка Google: «Confirmado por teléfono hace 12 semanas». */
  phone: { display: "641 15 46 98", tel: "+34641154698" },

  instagram: { handle: "roccocheesecake", url: "https://www.instagram.com/roccocheesecake/", followers: "18,9" },

  /** «Pedir online» карточки Google ведёт на Glovo; Uber Eats — ссылка из их Instagram. */
  delivery: {
    glovo: { es: "https://glovoapp.com/es/es/valencia/stores/rocco-the-cheesecake-lab-valencia", en: "https://glovoapp.com/en/es/valencia/stores/rocco-the-cheesecake-lab-valencia" },
    uberEats: { es: "https://www.ubereats.com/es/store/rocco-the-cheesecake-lab/yLa2mH0FVMm1ThC5hgb-uQ", en: "https://www.ubereats.com/es-en/store/rocco-the-cheesecake-lab/yLa2mH0FVMm1ThC5hgb-uQ" },
  },

  /** Короткая ссылка — та, что прислал заказчик; ведёт на эту карточку (place id ChIJ2QNHfu5JYA0RxueWMivUnD4). */
  googleMapsUrl: "https://maps.app.goo.gl/4QP6qnPyMKxS6R7Z8",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=ROCCO+The+Cheesecake+Lab%2C+C%2F+de+Roger+de+Ll%C3%B2ria+20%2C+46002+Val%C3%A8ncia&destination_place_id=ChIJ2QNHfu5JYA0RxueWMivUnD4",
  googleMapsEmbedQuery: "ROCCO+The+Cheesecake+Lab,+C/+de+Roger+de+Ll%C3%B2ria,+20,+46002+Val%C3%A8ncia",

  rating: {
    value: 4.8,
    count: 575,
    /** Распределение звёзд из карточки (`[175][3]`, там 1★→5★), здесь от 5 к 1. */
    histogram: [
      { stars: 5, count: 521 },
      { stars: 4, count: 21 },
      { stars: 3, count: 13 },
      { stars: 2, count: 7 },
      { stars: 1, count: 13 },
    ],
  },

  /** Темы отзывов Google (`[153]`) с числом упоминаний — все десять, как есть. */
  topics: [
    { key: "flavour", count: 68 },
    { key: "pistachio", count: 43 },
    { key: "packaging", count: 21 },
    { key: "creamy", count: 17 },
    { key: "texture", count: 12 },
    { key: "strawberry", count: 9 },
    { key: "minimalist", count: 8 },
    { key: "lotus", count: 8 },
    { key: "turron", count: 8 },
    { key: "mango", count: 7 },
  ],

  /** Панель Google Поиска: «Precio por persona: 10-20 € · Notificado por 228 personas». */
  pricePerPerson: { from: 10, to: 20, reports: 228 },

  /** Атрибут карточки `[100]`: «Acceso para sillas de ruedas» = да; «Aparcamiento adaptado» = нет. */
  wheelchairEntrance: true,

  hours: venueHours,
} as const;

export type TopicKey = (typeof restaurant.topics)[number]["key"];
