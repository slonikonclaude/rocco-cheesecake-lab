/**
 * Иконки — свои SVG, один набор: штрих 1.6, скругление round, сетка 24.
 * Эмодзи вместо иконок нет: они зависят от шрифта системы и не красятся токенами.
 *
 * Все иконки декоративные: рядом всегда есть видимый текст, поэтому
 * aria-hidden и focusable="false" зашиты внутрь. Если иконка останется одна,
 * текстовая альтернатива ставится на месте использования.
 */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base: P = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export const IconPin = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconClock = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

export const IconStar = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z" />
  </svg>
);

/** Частично залитая звезда — для дробного рейтинга 4,7 (`ratio` 0…1). Градиент с уникальным id,
 *  иначе при нескольких рядах звёзд на странице id бы совпадали. */
export const IconStarHalf = ({ gradientId = "halfStar", ratio = 0.5, ...p }: P & { gradientId?: string; ratio?: number }) => (
  <svg {...base} {...p}>
    <defs>
      <linearGradient id={gradientId}>
        <stop offset={`${ratio * 100}%`} stopColor="currentColor" />
        <stop offset={`${ratio * 100}%`} stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="m12 3.6 2.5 5.2 5.7.8-4.1 4 1 5.7-5.1-2.7-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.6Z"
      fill={`url(#${gradientId})`}
      stroke="currentColor"
      strokeWidth={1.2}
    />
  </svg>
);

export const IconArrow = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconExternal = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 5h5v5M19 5l-7.5 7.5" />
    <path d="M18 13.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V7.5A1.5 1.5 0 0 1 6 6h4.5" />
  </svg>
);

export const IconMenuBars = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const IconCheck = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.2 4L19 7" />
  </svg>
);

/** Instagram — контур камеры, без логотипа бренда. */
export const IconInstagram = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

/** Направление — стрелка-указатель для «Cómo llegar». */
export const IconDirections = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 21.2 12 12 21.2 2.8 12 12 2.8Z" />
    <path d="M9.5 14v-2.2a1.3 1.3 0 0 1 1.3-1.3h4.2M13.2 8.5 15 10.5l-1.8 2" />
  </svg>
);

/** Чашка — для «как заказать». */
export const IconCup = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 9h12v5.5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9Z" />
    <path d="M16.5 10.5h1.2a2.3 2.3 0 0 1 0 4.6h-1.4M8.5 3.5c-.6 1 .6 1.8 0 3M12 3.5c-.6 1 .6 1.8 0 3" />
  </svg>
);

/** Лапа — «perros bienvenidos». */
export const IconPaw = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 12.5c-2.8 0-5 2.6-5 4.6 0 1.6 1.2 2.4 2.6 2.4 1 0 1.5-.5 2.4-.5s1.4.5 2.4.5c1.4 0 2.6-.8 2.6-2.4 0-2-2.2-4.6-5-4.6Z" />
    <ellipse cx="7" cy="9.5" rx="1.6" ry="2.1" />
    <ellipse cx="10.2" cy="6" rx="1.6" ry="2.1" />
    <ellipse cx="13.8" cy="6" rx="1.6" ry="2.1" />
    <ellipse cx="17" cy="9.5" rx="1.6" ry="2.1" />
  </svg>
);

/** Лист — «opción vegana». */
export const IconLeaf = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 19c0-8 5-13.5 14-14-.3 9-5.8 14-14 14Z" />
    <path d="M5 19c3-3.5 6-6 9.5-8.5" />
  </svg>
);

export const IconPhone = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h3.2l1.6 4.2-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2L20 15.8V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z" />
  </svg>
);

export const IconCalendar = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
    <path d="M8 14h2M14 14h2M8 17h2" />
  </svg>
);

export const IconGlass = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 4h12l-1.2 5.4A4.9 4.9 0 0 1 12 13.2a4.9 4.9 0 0 1-4.8-3.8Z" />
    <path d="M12 13.2V20M8.5 20h7" />
    <path d="M6.7 7.5h10.6" />
  </svg>
);

export const IconTree = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21v-6" />
    <path d="M12 15c-4 0-6.5-2.3-6.5-5.3A5 5 0 0 1 9 5a4.4 4.4 0 0 1 6 0 5 5 0 0 1 3.5 4.7c0 3-2.5 5.3-6.5 5.3Z" />
  </svg>
);

export const IconPlate = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="6" />
    <path d="M3 4v5a2 2 0 0 0 2 2v9M5 4v4M21 4c-1.7 0-3 2-3 5s1.3 3 3 3v8" />
  </svg>
);

export const IconSandwich = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 10.5C4 8 7.6 6 12 6s8 2 8 4.5c0 .8-.7 1.5-1.5 1.5h-13C4.7 12 4 11.3 4 10.5Z" />
    <path d="M4 15h16M5.5 12l1 3M18.5 12l-1 3M4.5 18h15" />
  </svg>
);

export const IconUsers = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
    <circle cx="16.5" cy="9.5" r="2.4" />
    <path d="M15.8 14.3c2.3.1 4 1.7 4.7 4.2" />
  </svg>
);



export const IconWhatsapp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.2 18.4z" />
    <path d="M9.2 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.4 0 .5a6 6 0 0 0 2.4 2.3c.2.1.4.1.5 0l.6-.6c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.3.3.5 0 .5-.2 1.2-.9 1.5-.6.3-1.4.4-2.5-.1a9 9 0 0 1-4.3-4.2c-.5-1.1-.5-2.1-.2-2.7z" />
  </svg>
);
