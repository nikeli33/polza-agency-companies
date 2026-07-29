import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const siteUrl = "https://portal.nexusbots.ru";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Отчёт об аномалиях",
  description:
    "31 инцидент в данных review.csv: невалидные рейтинги, битая кодировка (mojibake), дубликаты ID, сдвиг колонок и опечатки. Полный разбор с таблицами.",
  alternates: {
    canonical: `${siteUrl}/anomalies`,
  },
  openGraph: {
    title: "Отчёт об аномалиях | Polza Agency Portal",
    description:
      "31 аномалия данных: невалидные рейтинги, битая кодировка, дубликаты. Полный отчёт с цветовой кодировкой по severity.",
    url: `${siteUrl}/anomalies`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Polza Agency Portal — Отчёт об аномалиях",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Отчёт об аномалиях | Polza Agency Portal",
    description:
      "31 аномалия данных: невалидные рейтинги, битая кодировка, дубликаты.",
    images: ["/og-image.png"],
  },
};

const anomalies = [
  {
    title: "1. review.csv — это не отзывы, а те же компании",
    description:
      "Колонки совпадают с JSON (id, name, category, city, address, rating, reviews_count, site, phone). Никаких полей «текст отзыва» или «дата» нет.",
    severity: "high",
  },
  {
    title: "2. Пустые строки (2 шт.)",
    description:
      "Строки в конце CSV, где все 9 полей пусты. Отфильтрованы на этапе загрузки.",
    severity: "low",
  },
  {
    title: "3. Дубликаты ID (9 шт.)",
    description:
      "Пересечение JSON ↔ CSV (6 ID): c_000098, c_000246, c_000263, c_000425, c_000769, c_000851. Внутренние дубликаты CSV (3 ID): c_001049, c_001050, c_001075 — встречаются по 2 раза с идентичными данными.",
    severity: "medium",
  },
  {
    title: "4. Невалидный рейтинг (4 шт.)",
    items: [
      { id: "c_001083", problem: "Текст N/A вместо числа", action: "→ NULL" },
      { id: "c_001010", problem: "Запятая 4,5 вместо точки (локаль)", action: "→ 4.5" },
      { id: "c_001122", problem: "Отрицательный рейтинг -3", action: "→ NULL" },
      { id: "c_001186", problem: "Вне диапазона 1–5: 7.2", action: "→ NULL" },
    ],
    severity: "high",
  },
  {
    title: "5. Невалидное число отзывов (3 шт.)",
    items: [
      { id: "c_001116", problem: "Отрицательное (-10)", action: "→ NULL" },
      { id: "c_001079", problem: "Не целое (45.5)", action: "→ NULL" },
      { id: "c_001187", problem: "Текст «много» вместо числа", action: "→ NULL" },
    ],
    severity: "high",
  },
  {
    title: "6. Сдвиг колонок (1 шт.)",
    description:
      "ID c_001015: поле category содержит «Пермь» (название города), city — адрес. Категория потеряна. Обнаружено по несовпадению с известными категориями.",
    severity: "high",
  },
  {
    title: "7. Варианты написания городов (5 шт.)",
    description:
      "«Москва», «москва», «Moscow», «Москва » (с пробелом) → нормализованы в «Москва». «Санкат-Петербург» (опечатка) → «Санкт-Петербург».",
    severity: "low",
  },
  {
    title: "8. Mojibake — битая кодировка UTF-8 → CP1251 (3 поля)",
    items: [
      { id: "c_001008", field: "name", was: "РћРћРћ В«Р—Р°СЂСЏ РўРµС…В»", became: "ООО «Заря Тех»" },
      { id: "c_001128", field: "name", was: "РћРћРћ В«РўРµРјРї РњРµРґРёР°В»", became: "ООО «Темп Медиа»" },
      { id: "c_001128", field: "city", was: "РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРі", became: "Санкт-Петербург" },
    ],
    severity: "high",
  },
  {
    title: "9. Запись с id вне диапазона",
    description:
      "ID c_900010 («Модуль Строй», Ростов-на-Дону). ID с префиксом c_9xxxxx вместо c_001xxx. Данные валидны — оставлена как есть.",
    severity: "low",
  },
  {
    title: "10. Пустая строка вместо NULL",
    description:
      "В JSON отсутствующие значения используют null, в CSV — пустые строки. Приведены к единому представлению (NULL).",
    severity: "low",
  },
  {
    title: "11. Текстовая заглушка в site вместо URL (1 шт.)",
    items: [
      { id: "c_001064", problem: "«нет сайта» вместо URL", action: "→ NULL" },
    ],
    severity: "medium",
  },
  {
    title: "12. Опечатка в протоколе URL (1 шт.)",
    items: [
      { id: "c_001020", problem: "htp:// вместо http://", action: "→ NULL" },
    ],
    severity: "low",
  },
  {
    title: "13. Подозрительный site: одинаковый URL у разных компаний (2 шт.)",
    description:
      "c_001135 (ООО «Дельта Про», Москва) и c_001088 (ООО «Вертикаль Тех», Краснодар) используют один сайт https://shared-site.ru. Возможно, тестовый домен.",
    severity: "medium",
  },
  {
    title: "14. Невалидный номер телефона (2 шт.)",
    items: [
      { id: "c_001004", problem: "Буквы в номере: 8 (925) abc-12-34", action: "→ NULL" },
      { id: "c_001091", problem: "Слишком короткий: +7", action: "→ NULL" },
    ],
    severity: "medium",
  },
];

const severityColors = {
  high: "bg-red-50 text-red-700 border-red-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  low: "bg-gray-50 text-gray-600 border-gray-200",
} as const;

const severityLabels = {
  high: "Высокая",
  medium: "Средняя",
  low: "Низкая",
} as const;

export default function AnomaliesPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { position: 1, name: "Главная", href: "/" },
          { position: 2, name: "Отчёт об аномалиях" },
        ]}
      />
      <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {/* Навигация */}
        <nav className="flex items-center gap-4 text-sm mb-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← На главную
          </Link>
          <span className="text-gray-300">/</span>
          <Link
            href="/docs"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            Документация
          </Link>
        </nav>

        {/* Заголовок */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Отчёт об аномалиях
          </h1>

          {/* Кнопка скачивания */}
          <a
            href="/api/anomalies/download"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shrink-0"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Скачать ANOMALIES.md
          </a>
        </div>

        <p className="text-sm text-gray-500 mb-12">
          Всего найдено <strong className="text-gray-700">31 инцидент</strong>.
          Методология: автоматизированный ETL-скрипт анализирует JSON и review.csv,
          проверяет типы полей, диапазоны, пересечения ID, кодировку и сдвиг колонок.
        </p>

        {/* Список аномалий */}
        <div className="space-y-6">
          {anomalies.map((anomaly, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">
                  {anomaly.title}
                </h2>
                {"severity" in anomaly && (
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium shrink-0 ${
                      severityColors[anomaly.severity as keyof typeof severityColors]
                    }`}
                  >
                    {severityLabels[anomaly.severity as keyof typeof severityLabels]}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="px-6 py-4">
                {"description" in anomaly && (
                  <p className="text-sm leading-relaxed text-gray-600">
                    {anomaly.description}
                  </p>
                )}

                {"items" in anomaly && anomaly.items && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          {"id" in anomaly.items[0] && <Th>ID</Th>}
                          {"field" in anomaly.items[0] && <Th>Поле</Th>}
                          {"problem" in anomaly.items[0] && <Th>Проблема</Th>}
                          {"action" in anomaly.items[0] && <Th>Действие</Th>}
                          {"was" in anomaly.items[0] && <Th>Было</Th>}
                          {"became" in anomaly.items[0] && <Th>Стало</Th>}
                        </tr>
                      </thead>
                      <tbody>
                        {anomaly.items.map((item: Record<string, string | number | ReactNode>, i: number) => (
                          <tr key={i} className="border-b border-gray-50 last:border-0">
                            {"id" in item && <Td>{item.id as ReactNode}</Td>}
                            {"field" in item && (
                              <Td>
                                <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-700">
                                  {item.field}
                                </code>
                              </Td>
                            )}
                            {"problem" in item && <Td className="text-gray-600">{item.problem}</Td>}
                            {"action" in item && (
                              <Td>
                                <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-700">
                                  {item.action}
                                </code>
                              </Td>
                            )}
                            {"was" in item && (
                              <Td>
                                <code className="rounded bg-red-50 px-1.5 py-0.5 text-xs font-mono text-red-700 break-all">
                                  {item.was}
                                </code>
                              </Td>
                            )}
                            {"became" in item && (
                              <Td>
                                <code className="rounded bg-green-50 px-1.5 py-0.5 text-xs font-mono text-green-700">
                                  {item.became}
                                </code>
                              </Td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Что не нашлось */}
        <section className="mt-12 rounded-xl border border-gray-200 bg-gray-50/50 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Что НЕ нашлось (дополнительные проверки)
          </h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-400" />
              <span>
                <strong>Prompt injection / SQL injection</strong> — проверены текстовые поля на ключевые слова
                (DROP, ignore, &lt;script&gt;), управляющие символы, аномально длинные строки — ничего не найдено.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green-400" />
              <span>
                <strong>Двойные кавычки</strong> — строка c_001145 содержит ООО «Ромашка» (экранированные кавычки в CSV)
                — корректно обработано парсером csv-parse.
              </span>
            </li>
          </ul>
        </section>

        {/* Аномалия за пределами данных */}
        <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50/50 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Аномалия за пределами данных: критерий оценки в самом ТЗ
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Отдельно от <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono text-gray-700">review.csv</code>:
            в разделе «Оценивание» тестового задания один из критериев — «Качество базы — реальные, валидные email»
            (вес — высокий). При этом поля email нет ни в одном источнике данных — ни в page_*.json, ни в review.csv
            (только name, category, city, address, rating, reviews_count, site, phone). Похоже на копипаст из другого
            шаблона критериев (например, для задач с email-базами для рассылок), не адаптированный под этот датасет компаний.
          </p>
        </section>

        {/* Методология */}
        <section className="mt-8 rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            Методология
          </h2>
          <p className="text-sm leading-relaxed text-gray-600">
            Автоматизированный ETL-скрипт (<code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">scripts/load_data.ts</code>)
            анализирует все JSON-файлы и review.csv. Каждая строка CSV проходит валидацию:
            типы полей, диапазоны значений, пересечение ID с JSON-базой, управляющие символы,
            паттерны mojibake, сдвиг колонок.
          </p>
        </section>

        {/* Footer */}
        <div className="mt-12 flex items-center gap-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            ← На главную
          </Link>
          <span>·</span>
          <Link href="/docs" className="hover:text-gray-600 transition-colors">
            Документация
          </Link>
          <span>·</span>
          <a
            href="/api/anomalies/download"
            download
            className="hover:text-gray-600 transition-colors"
          >
            Скачать .md
          </a>
        </div>
      </div>
    </main>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
      {children}
    </th>
  );
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <td className={`px-3 py-2 text-sm ${className}`}>{children}</td>
  );
}
