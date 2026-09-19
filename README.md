# ROCCO The Cheesecake Lab — сайт тарталерии

Двуязычный лендинг ROCCO The Cheesecake Lab (C/ de Roger de Llòria, 20 — Ciutat
Vella, València): испанский в корне, английский в `/en/`. Next.js со статическим
экспортом, публикация на GitHub Pages через `.github/workflows/deploy.yml`.

Адрес: https://slonikonclaude.github.io/rocco-cheesecake-lab/

## Команды

```
npm run dev          # локально (в папке «Рестораны» — порт 3350, .claude/launch.json)
npm run build        # статический экспорт в out/
npm run photos       # _photos/ → WebP 800/1600 в public/photos
npm run check:menu   # сверка цен сайта с табличкой у кассы, листом на стойке и тикетом
```

## Где что лежит

- `DESIGN.md` — источники, расхождения (цены зала против приложений доставки, «8» против «6–8», турон), дизайн-решения
- `lib/restaurant.ts` — адрес, телефон, часы, рейтинг, гистограмма, темы отзывов, ссылки на доставку
- `lib/menu.ts` — 10 вкусов × 3 размера (порция, 2–3, 8 personas), цены tienda
- `lib/reviews.ts` — 6 испанских и 4 английских отзыва Google в оригинале
- `lib/photos.ts` — 18 снимков (студийные — из их магазинов Uber Eats и Glovo; зал — фото из карточки Google) и alt на двух языках
- `lib/dictionaries.ts` — все тексты интерфейса на двух языках
- `_data/maps/` — разобранная карточка Google Maps (18.09.2026), Instagram, ссылки на 287 фото и их EXIF-даты, обезличенный корпус 573 отзывов (`reviews-public.json`); сырые выгрузки с именами авторов — только локально
- `_data/web/` — разобранные меню Glovo (14 позиций) и Uber Eats (24 позиции, цены доставки)
- `_data/menu-text/prices.json` — прочтение таблички, печатного листа и тикета (источник `check:menu`)
- `_data/reviews-selected.json` — отбор отзывов для витрины
- `_data/scripts/` — скрипты сбора (Chrome по CDP), разбора Glovo/Uber Eats и съёмки страниц
