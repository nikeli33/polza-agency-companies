<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:polza-portal-context -->
# Polza Agency Portal — тестовое задание

## Контекст
Тестовое задание на позицию «Технический специалист / вайбкодер» в Polza Agency.
Заказчик: @nerkhov (Telegram).
Домен: portal.nexusbots.ru (реальный сервер).

## Стек
- **Next.js 16.2.12** (App Router) — есть breaking changes (см. выше)
- **TypeScript 5.x**
- **Tailwind CSS 4** (PostCSS конфиг)
- **PostgreSQL** — через Docker (docker-compose.yml)
- **Библиотеки**: pg, csv-parse, iconv-lite, sharp (через Next.js)

## Структура проекта (важные файлы)
```
D:\WORK\
├── next-app/              # Next.js приложение
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx        # Root layout с SEO-метатегами
│   │   │   ├── page.tsx          # Главная — Polza Agency Portal
│   │   │   ├── companies/
│   │   │   │   ├── page.tsx       # Server Component /companies
│   │   │   │   └── CompaniesClient.tsx  # Client Component с таблицей
│   │   │   ├── privacy/page.tsx   # Политика конфиденциальности
│   │   │   ├── docs/page.tsx      # Документация тестового задания
│   │   │   ├── anomalies/page.tsx # Отчёт об аномалиях (вёрстка)
│   │   │   ├── sitemap.ts         # Динамическая карта сайта
│   │   │   └── api/anomalies/download/route.ts  # Скачивание ANOMALIES.md
│   │   ├── components/
│   │   │   ├── Footer.tsx
│   │   │   ├── CookieBanner.tsx
│   │   │   └── icons.tsx          # Feather-style SVG иконки
│   │   └── lib/
│   │       └── db.ts              # fetchCompanies, fetchCities
│   ├── public/
│   │   ├── robots.txt
│   │   ├── favicon.svg
│   │   ├── og-image.png
│   │   └── (статика create-next-app)
│   ├── .env.example
│   └── AGENTS.md (этот файл)
├── scripts/
│   ├── load_data.ts       # ETL-скрипт загрузки данных в PostgreSQL
│   └── package.json
├── data_pack/             # Исходные JSON-файлы (page_*.json)
├── db/                    # Скрипты SQL
├── docker-compose.yml     # PostgreSQL + приложение
└── ANOMALIES.md           # Отчёт об аномалиях (31 инцидент)
```

## Маршруты
| Путь | Тип | Описание |
|---|---|---|
| `/` | Static | Главная (Polza Agency Portal) |
| `/companies` | Dynamic | Таблица компаний (q?, city?) |
| `/privacy` | Static | Политика конфиденциальности |
| `/docs` | Static | Документация тестового задания |
| `/anomalies` | Static | Отчёт об аномалиях |
| `/sitemap.xml` | Static | Карта сайта |
| `/api/anomalies/download` | Dynamic | Скачать ANOMALIES.md |

## SEO (уже сделано)
- layout.tsx: Open Graph, Twitter Cards, canonical, metadataBase
- Уникальные meta на каждой странице
- JSON-LD: Organization + BreadcrumbList
- robots.txt + sitemap.xml
- favicon.svg + og-image.png (1200×630, sharp)
- lang="ru"

## Деплой
- Сервер: свой, домен portal.nexusbots.ru
- Команда: `npx next build && npx next start`
- База: PostgreSQL в Docker на том же сервере

## Важные архитектурные решения
- TypeScript везде (включая ETL), а не Python — единый стек с платформой Polza
- Server Components — данные напрямую из БД, без лишнего API-слоя
- Docker Compose — БД и приложение одной командой
- Дедупликация компаний по названию на этапе загрузки
- Автоматическое исправление mojibake (UTF-8 → CP1251) через iconv-lite
<!-- END:polza-portal-context -->
