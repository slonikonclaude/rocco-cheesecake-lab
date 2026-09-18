"use client";

import { useEffect, useState } from "react";
import { getDictionary, type Locale } from "@/lib/dictionaries";
import { DAYS, restaurant, type DayKey } from "@/lib/restaurant";

/**
 * Часы работы с выделением сегодняшнего дня и строкой «abierto ahora».
 * Время — Europe/Madrid, а не часы посетителя: турист из другого пояса должен
 * видеть, открыто ли в Валенсии. На сервере (статический экспорт) «сегодня»
 * неизвестно, поэтому выделение появляется только после монтирования — так
 * HTML сервера и первый рендер клиента совпадают.
 */

const WEEKDAY: Record<string, DayKey> = { Mon: "mon", Tue: "tue", Wed: "wed", Thu: "thu", Fri: "fri", Sat: "sat", Sun: "sun" };

function madridNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { day: WEEKDAY[get("weekday")], minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function HoursTable({ locale }: { locale: Locale }) {
  const v = getDictionary(locale).visit;
  const [now, setNow] = useState<{ day: DayKey; minutes: number } | null>(null);

  useEffect(() => {
    const tick = () => setNow(madridNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  let status: string | null = null;
  let isOpen = false;
  if (now) {
    const today = restaurant.hours.find((d) => d.day === now.day)!.shifts[0];
    isOpen = now.minutes >= toMinutes(today.opens) && now.minutes < toMinutes(today.closes);
    if (isOpen) status = v.openNow(today.closes);
    else if (now.minutes < toMinutes(today.opens)) status = v.closedNow(today.opens);
    else {
      // После закрытия — открытие завтрашнего дня, и в тексте это «завтра», а не «сегодня в 11:00».
      const next = restaurant.hours.find((d) => d.day === DAYS[(DAYS.indexOf(now.day) + 1) % 7])!.shifts[0];
      status = v.closedUntilTomorrow(next.opens);
    }
  }

  return (
    <div>
      <p className="tabular min-h-7 font-medium text-cacao">
        {status ? (
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${isOpen ? "bg-rocco" : "border-2 border-muted"}`} />
            {status}
          </span>
        ) : null}
      </p>
      <table className="mt-3 w-full max-w-sm text-[0.98rem]">
        <caption className="sr-only">{v.hours}</caption>
        <tbody>
          {restaurant.hours.map((d) => {
            const isToday = now?.day === d.day;
            return (
              <tr key={d.day} className="border-b border-line">
                <th scope="row" className={`py-2.5 text-left ${isToday ? "font-medium text-cacao" : "font-normal text-cacao"}`}>
                  {v.days[d.day]}{" "}
                  {isToday ? <span className="ml-2 rounded-full bg-rocco px-2 py-0.5 text-[0.75rem] font-medium text-cacao">{v.today}</span> : null}
                </th>
                <td className={`tabular py-2.5 text-right ${isToday ? "font-medium text-cacao" : "text-cacao"}`}>
                  {d.shifts.map((s) => `${s.opens}–${s.closes}`).join(", ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
