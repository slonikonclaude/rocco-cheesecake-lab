import { getDictionary, type Locale } from "@/lib/dictionaries";
import { photos } from "@/lib/photos";
import { restaurant } from "@/lib/restaurant";

/**
 * schema.org/Bakery. Без aggregateRating: рейтинг Google на собственном сайте
 * заведения — «self-serving review», Google такую разметку не принимает.
 * Часы — из карточки Google (DESIGN.md §1).
 */
const DAY = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" } as const;

export function JsonLd({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "";
  const rawBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const base = rawBase === "/" ? "" : rawBase.replace(/\/+$/, "");
  const abs = (path: string) => (siteUrl ? `${siteUrl}${base}${path}` : `${base}${path}`);
  const a = restaurant.address;

  const data = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: restaurant.fullName,
    description: dict.meta.description,
    url: abs(locale === "es" ? "/" : "/en/"),
    image: [abs(`/photos/${photos.hero.name}-1600.webp`), abs(`/photos/${photos.tienda.name}-1600.webp`)],
    telephone: restaurant.phone.tel,
    priceRange: `${restaurant.pricePerPerson.from}–${restaurant.pricePerPerson.to} €`,
    servesCuisine: ["Cheesecake", "Desserts"],
    hasMenu: abs(`${locale === "es" ? "/" : "/en/"}#precios`),
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      postalCode: a.postalCode,
      addressRegion: a.region,
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: restaurant.geo.lat, longitude: restaurant.geo.lng },
    openingHoursSpecification: restaurant.hours.flatMap((d) =>
      d.shifts.map((s) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAY[d.day]}`, opens: s.opens, closes: s.closes })),
    ),
    sameAs: [restaurant.instagram.url, restaurant.googleMapsUrl],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
