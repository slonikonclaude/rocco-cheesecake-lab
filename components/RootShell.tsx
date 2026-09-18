import { Bodoni_Moda, Jost } from "next/font/google";
import type { ReactNode } from "react";
import { getDictionary, type Locale } from "@/lib/dictionaries";

/**
 * Общая оболочка для обоих корневых layout-ов ((es) и (en)): у каждого языка
 * свой <html lang>, поэтому layout-ов два, а шрифты и body описаны один раз.
 *
 * Шрифты (DESIGN.md §6): Bodoni Moda — заголовки и названия вкусов (с курсивом);
 * Jost — текст, кнопки, цены и вордмарк «ROCCO», геометрия их логотипа.
 * Subset latin: в нём все знаки испанского.
 */

const display = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export function RootShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const dict = getDictionary(locale);

  return (
    <html lang={dict.htmlLang} className={`${display.variable} ${sans.variable} h-full`}>
      <head>
        {/* Без JS motion не снимает свой inline opacity:0 — блоки возвращаются на место (DESIGN.md §8). */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
