/**
 * Все тексты интерфейса на двух языках. Факты (цифры, часы, адрес, цены) сюда не
 * пишутся — они в lib/restaurant.ts и lib/menu.ts и подставляются функциями.
 * Каждое утверждение опирается на источник из DESIGN.md §1.
 */

import type { DayKey, TopicKey } from "@/lib/restaurant";

export type Locale = "es" | "en";

const es = {
  htmlLang: "es",
  otherLocale: { code: "en" as Locale, label: "EN", aria: "English version" },

  meta: {
    title: "ROCCO The Cheesecake Lab · Tartas de queso artesanas en Valencia",
    description:
      "Diez sabores de tarta de queso artesana en C/ de Roger de Llòria, 20 (Ciutat Vella): porciones desde 4,90 €, tartas para 2–3 personas desde 13,90 € y para 8 desde 29,90 €. Abierto todos los días desde las 11:00.",
  },

  nav: {
    skipToContent: "Saltar al contenido",
    home: "ROCCO The Cheesecake Lab, inicio",
    sections: "Secciones",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    flavours: "Sabores",
    prices: "Precios",
    gift: "Para regalar",
    shop: "La tienda",
    reviews: "Opiniones",
    visit: "Visítanos",
  },

  cta: {
    directions: "Cómo llegar",
    seeFlavours: "Ver sabores y precios",
    callLong: (n: string) => `Llamar al ${n}`,
    order: "Pedir a domicilio",
    newTab: "(se abre en otra pestaña)",
  },

  hero: {
    eyebrow: "Tienda de tartas de queso · Valencia",
    claim: "Cheesecake artesanal elevada a la alta pastelería.",
    lead: "Diez sabores, del clásico al pistacho, en tarta para compartir o en porción. En Ciutat Vella, a un paseo de la plaza del Ayuntamiento.",
    rating: (v: string, n: string) => `${v} de 5 · ${n} reseñas en Google`,
    open: (from: string) => `Todos los días desde las ${from}`,
    from: (price: string) => `Porciones desde ${price}`,
  },

  flavours: {
    eyebrow: "La vitrina · 10 sabores",
    title: "Del clásico al pistacho",
    note: "Cada sabor se vende en tarta para 2–3 personas, en porción y, según disponibilidad, en tarta para 8. Las fotos son de su estudio: en la tienda los verás en las vitrinas iluminadas de la pared.",
    number: (n: number) => `N.º ${String(n).padStart(2, "0")}`,
    small: "2–3 pers.",
    large: "8 pers.",
    onRequest: "consultar disponibilidad",
    noPhoto: "Sin foto de estudio",
  },

  prices: {
    eyebrow: "Formatos y precios",
    title: "Tres tamaños, precios de tienda",
    note: "La carta del mostrador, con IVA incluido, tal como se ve en mayo y junio de 2026. En Glovo y Uber Eats los precios son los de cada aplicación.",
    slice: {
      name: "Porción",
      serves: "Para uno",
      price: (classic: string, other: string) => `Clásica ${classic} · otros sabores ${other}`,
      text: "Servida en su bandeja naranja con el logo.",
    },
    small: {
      name: "Tarta pequeña",
      serves: "Para 2–3 personas",
      price: (from: string, pistachio: string) => `${from} · pistacho ${pistachio}`,
      text: "La más pequeña de la tienda: una tarta entera para compartir.",
    },
    large: {
      name: "Tarta grande",
      serves: "Para 8 personas",
      price: (from: string) => `${from} todos los sabores`,
      text: "Para celebraciones. Algunos sabores, según disponibilidad.",
    },
    tableCaption: "Precio por sabor y tamaño",
    colFlavour: "Sabor",
    colSlice: "Porción",
    colSmall: "2–3 personas",
    colLarge: "8 personas",
    onRequestMark: "Consultar disponibilidad",
    footnotes: [
      "* Tarta para 8 personas: consultar disponibilidad.",
      "Bolsa ROCCO: 0,60 €.",
      "Precios de la tabla del mostrador (mayo de 2026), de su hoja de precios y de un ticket (mayo y junio de 2026); pueden cambiar. Si vas a por una tarta grande, llama antes.",
    ],
  },

  gift: {
    eyebrow: "Para regalar",
    title: "La caja naranja ya es medio regalo",
    text: "La caja redonda naranja con el logo en dorado es el sello de la casa. El packaging sale en 21 reseñas de Google.",
    quote: "Ideal para hacer un regalo dulce.",
    quoteAuthor: "J. V., en Google",
    points: [
      "Caja redonda naranja con el logo en dorado: si es para regalo, pídela al comprar",
      "Bolsa de la casa con asas de cinta, 0,60 €",
      "Tartas para 2–3 personas, listas para llevar; la de 8, según disponibilidad",
    ],
  },

  shop: {
    eyebrow: "La tienda",
    title: "Un laboratorio de tartas en Ciutat Vella",
    text: "Paredes color arena, una hornacina en arco iluminada tras el mostrador y una pared de vitrinas en la que cada tarta tiene su nicho. En el escaparate, cajas naranjas cuelgan de cuerdas sobre una pirámide de cajas: se reconoce desde la acera.",
    factsTitle: "Bueno saber",
    facts: {
      takeaway: "Es una tienda para llevar: no hay mesas",
      wheelchair: "Entrada accesible en silla de ruedas",
      card: "Se paga con tarjeta",
      parking: "Aparcar es difícil: mejor a pie o en un parking de pago cercano",
      price: (range: string, n: string) => `${range} por persona, según ${n} personas en Google`,
    },
  },

  reviews: {
    eyebrow: "Opiniones",
    title: "Lo que dicen de sus tartas",
    outOf: "de 5",
    basedOn: (n: string) => `${n} reseñas en Google`,
    histogram: "Reparto de estrellas",
    starsLabel: (n: number) => (n === 1 ? "1 estrella" : `${n} estrellas`),
    stars: (n: number) => `${n} de 5 estrellas`,
    topicsTitle: "Lo más mencionado",
    topicCount: (n: string) => `mencionado en ${n} reseñas`,
    topics: {
      flavour: "sabor",
      pistachio: "pistacho",
      packaging: "packaging",
      creamy: "cremosa",
      texture: "textura",
      strawberry: "fresa",
      minimalist: "minimalista",
      lotus: "Lotus",
      turron: "turrón",
      mango: "mango",
    } satisfies Record<TopicKey, string>,
    readAll: "Leer todas en Google",
    googleNote: "Reseñas de Google en su idioma original, sin editar.",
  },

  visit: {
    eyebrow: "Visítanos",
    title: "Ven a por la tuya",
    near: "En Ciutat Vella, a un paseo de la plaza del Ayuntamiento.",
    hours: "Horario",
    today: "Hoy",
    openNow: (until: string) => `Abierto ahora · hasta las ${until}`,
    closedNow: (from: string) => `Cerrado ahora · abre a las ${from}`,
    closedUntilTomorrow: (from: string) => `Cerrado ahora · abre mañana a las ${from}`,
    days: { mon: "Lunes", tue: "Martes", wed: "Miércoles", thu: "Jueves", fri: "Viernes", sat: "Sábado", sun: "Domingo" } satisfies Record<DayKey, string>,
    contact: "Dirección y contacto",
    delivery: "A domicilio",
    deliveryNote: "También están en Glovo y Uber Eats, con la carta y los precios de cada aplicación.",
    instagram: (handle: string, n: string) => `@${handle} · ${n} mil seguidores`,
    loadMap: "Cargar el mapa",
    mapConsent: "Al cargar el mapa, Google puede instalar cookies.",
    mapTitle: "Mapa de ROCCO The Cheesecake Lab",
    openMaps: "Abrir en Google Maps",
  },

  footer: {
    tagline: "Tartas de queso artesanas en el centro de Valencia.",
    links: "Enlaces",
    sources:
      "Datos: ficha de Google Maps, carta del mostrador, su Instagram y sus tiendas en Glovo y Uber Eats (consultados en septiembre de 2026). Fotos: ROCCO y clientes en Google.",
  },

  notFound: {
    title: "Esta página no existe",
    home: "Volver al inicio",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  htmlLang: "en",
  otherLocale: { code: "es", label: "ES", aria: "versión en español" },

  meta: {
    title: "ROCCO The Cheesecake Lab · Artisan cheesecake in Valencia",
    description:
      "Ten flavours of artisan cheesecake at C/ de Roger de Llòria, 20 (Ciutat Vella): slices from €4.90, cakes for 2–3 from €13.90 and for 8 from €29.90. Open every day from 11:00.",
  },

  nav: {
    skipToContent: "Skip to content",
    home: "ROCCO The Cheesecake Lab, home",
    sections: "Sections",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    flavours: "Flavours",
    prices: "Prices",
    gift: "Gifting",
    shop: "The shop",
    reviews: "Reviews",
    visit: "Visit",
  },

  cta: {
    directions: "Get directions",
    seeFlavours: "See flavours & prices",
    callLong: (n: string) => `Call ${n}`,
    order: "Order delivery",
    newTab: "(opens in a new tab)",
  },

  hero: {
    eyebrow: "Cheesecake shop · Valencia",
    claim: "Artisan cheesecake, raised to fine pâtisserie.",
    lead: "Ten flavours, from classic to pistachio, as a cake to share or by the slice. In Ciutat Vella, a short stroll from Plaza del Ayuntamiento.",
    rating: (v: string, n: string) => `${v} out of 5 · ${n} Google reviews`,
    open: (from: string) => `Open every day from ${from}`,
    from: (price: string) => `Slices from ${price}`,
  },

  flavours: {
    eyebrow: "The display case · 10 flavours",
    title: "From classic to pistachio",
    note: "Every flavour comes as a cake for 2–3, by the slice and, subject to availability, as a cake for 8. The photos are their studio shots; in the shop you’ll find them in the lit display fridges along the wall.",
    number: (n: number) => `No. ${String(n).padStart(2, "0")}`,
    small: "For 2–3",
    large: "For 8",
    onRequest: "ask for availability",
    noPhoto: "No studio photo",
  },

  prices: {
    eyebrow: "Sizes & prices",
    title: "Three sizes, in-store prices",
    note: "The counter menu, VAT included, as seen in May and June 2026. On Glovo and Uber Eats each app sets its own prices.",
    slice: {
      name: "Slice",
      serves: "For one",
      price: (classic: string, other: string) => `Classic ${classic} · other flavours ${other}`,
      text: "Served on its orange logo tray.",
    },
    small: {
      name: "Small cake",
      serves: "Serves 2–3",
      price: (from: string, pistachio: string) => `${from} · pistachio ${pistachio}`,
      text: "The smallest in the shop: a whole cake to share.",
    },
    large: {
      name: "Large cake",
      serves: "Serves 8",
      price: (from: string) => `${from} every flavour`,
      text: "For celebrations. Some flavours subject to availability.",
    },
    tableCaption: "Price by flavour and size",
    colFlavour: "Flavour",
    colSlice: "Slice",
    colSmall: "Serves 2–3",
    colLarge: "Serves 8",
    onRequestMark: "Ask for availability",
    footnotes: [
      "* Cake for 8: ask for availability.",
      "ROCCO bag: €0.60.",
      "Prices from the counter board (May 2026), their price sheet and a receipt (May and June 2026); subject to change. Going for a large cake? Call ahead.",
    ],
  },

  gift: {
    eyebrow: "To give",
    title: "The orange box is half the gift",
    text: "The round orange box with the logo in gold is the house signature. The packaging comes up in 21 Google reviews.",
    quote: "Drawn in first by the shop’s strikingly elegant packaging…",
    quoteAuthor: "Alex L., on Google",
    points: [
      "Round orange box with the logo in gold: if it’s a gift, ask for it when you buy",
      "House bag with ribbon handles, €0.60",
      "Cakes for 2–3 ready to take away; the one for 8 subject to availability",
    ],
  },

  shop: {
    eyebrow: "The shop",
    title: "A cheesecake lab in Ciutat Vella",
    text: "Sand-coloured walls, a lit arched niche behind the counter and a wall of display fridges where every cake has its own alcove. In the window, orange boxes hang from ropes above a pyramid of boxes — you can’t miss it from the pavement.",
    factsTitle: "Good to know",
    facts: {
      takeaway: "It’s a takeaway shop: there are no tables",
      wheelchair: "Wheelchair-accessible entrance",
      card: "Card payments accepted",
      parking: "Parking is hard: walk, or use a nearby paid car park",
      price: (range: string, n: string) => `${range} per person, according to ${n} people on Google`,
    },
  },

  reviews: {
    eyebrow: "Reviews",
    title: "What people say about the cakes",
    outOf: "out of 5",
    basedOn: (n: string) => `${n} Google reviews`,
    histogram: "Star breakdown",
    starsLabel: (n: number) => (n === 1 ? "1 star" : `${n} stars`),
    stars: (n: number) => `${n} out of 5 stars`,
    topicsTitle: "Most mentioned",
    topicCount: (n: string) => `mentioned in ${n} reviews`,
    topics: {
      flavour: "flavour",
      pistachio: "pistachio",
      packaging: "packaging",
      creamy: "creamy",
      texture: "texture",
      strawberry: "strawberry",
      minimalist: "minimalist",
      lotus: "Lotus",
      turron: "turrón",
      mango: "mango",
    },
    readAll: "Read them all on Google",
    googleNote: "Google reviews in their original language, unedited.",
  },

  visit: {
    eyebrow: "Visit",
    title: "Come and pick yours",
    near: "In Ciutat Vella, a short stroll from Plaza del Ayuntamiento.",
    hours: "Opening hours",
    today: "Today",
    openNow: (until: string) => `Open now · until ${until}`,
    closedNow: (from: string) => `Closed now · opens at ${from}`,
    closedUntilTomorrow: (from: string) => `Closed now · opens tomorrow at ${from}`,
    days: { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" },
    contact: "Address & contact",
    delivery: "Delivery",
    deliveryNote: "They’re also on Glovo and Uber Eats, with each app’s own menu and prices.",
    instagram: (handle: string, n: string) => `@${handle} · ${n.replace(",", ".")}K followers`,
    loadMap: "Load the map",
    mapConsent: "Loading the map lets Google set cookies.",
    mapTitle: "Map of ROCCO The Cheesecake Lab",
    openMaps: "Open in Google Maps",
  },

  footer: {
    tagline: "Artisan cheesecake in the centre of Valencia.",
    links: "Links",
    sources:
      "Data: Google Maps listing, the counter menu, their Instagram and their Glovo and Uber Eats stores (checked in September 2026). Photos: ROCCO and customers on Google.",
  },

  notFound: {
    title: "This page doesn’t exist",
    home: "Back to home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export const getDictionary = (locale: Locale) => dictionaries[locale];
