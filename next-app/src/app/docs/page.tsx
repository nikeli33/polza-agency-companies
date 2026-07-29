import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const siteUrl = "https://portal.nexusbots.ru";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Документация",
  description:
    "1000+ компаний загружены в PostgreSQL. 31 аномалия найдена и исправлена. 5 задач тестового задания для Polza Agency: ETL, Next.js 16, PostgreSQL, SEO/GEO-оптимизация, вайбкод.",
  alternates: {
    canonical: `${siteUrl}/docs`,
  },
  openGraph: {
    title: "Документация | Polza Agency Portal",
    description:
      "1000+ компаний, 31 аномалия, 5 технологий. Полная документация тестового задания для Polza Agency.",
    url: `${siteUrl}/docs`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Polza Agency Portal — Документация",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Документация | Polza Agency Portal",
    description:
      "1000+ компаний, 31 аномалия, 5 технологий. Полная документация тестового задания.",
    images: ["/og-image.png"],
  },
};

const tasks = [
  {
    number: "1",
    title: "Выгрузка → PostgreSQL",
    description:
      "Из data_pack.zip (page_001.json … page_020.json, ~1000 компаний) все записи загружены в PostgreSQL. Реализована дедупликация, проставлены индексы.",
    details: [
      "Скрипт загрузки: `scripts/load_data.ts` — читает JSON, дедуплицирует по названию, загружает в БД",
      "Схема: таблица `companies` с полями: id, name, category, city, address, rating, reviews_count, site, phone, created_at",
      "Индексы: на name (для поиска), city (для фильтрации), category (для группировок)",
      "Docker Compose: `docker-compose.yml` — PostgreSQL + приложение одной командой",
      "SQL-запросы в блоке ниже",
    ],
  },
  {
    number: "2",
    title: "Страница /companies",
    description:
      "Next.js App Router страница с серверным рендерингом. Таблица компаний из PostgreSQL с поиском по названию и фильтром по городу.",
    details: [
      "Server Component: `src/app/companies/page.tsx` — фетчит данные и города напрямую из БД",
      "Client Component: `CompaniesClient.tsx` — интерактивная таблица с поиском и фильтрацией",
      "Поиск через URL-параметры (?q=&city=) — работают навигация, рефреши и расшаривание результатов",
      "Адаптивный дизайн: колонки скрываются на мобильных устройствах",
    ],
  },
  {
    number: "3",
    title: "Данные с сюрпризом (review.csv)",
    description:
      "Анализ review.csv на аномалии. Все несоответствия задокументированы в ANOMALIES.md — 31 инцидент.",
    details: [
      "Найдены: невалидные рейтинги, битая кодировка (mojibake), дубликаты ID, сдвиг колонок, опечатки",
      "Полный отчёт с таблицами и цветовой кодировкой по severity",
    ],
  },
  {
    number: "4",
    title: "Вайбкод / LLM-стек",
    description: "Процесс разработки, инструменты, методология и архитектурные решения.",
    details: [
      "IDE: Claude Code + Cursor, агентские сценарии на живом репозитории",
      "Модели: Claude Sonnet 4.5 / DeepSeek V4 Flash — под задачу",
      "Подход: AI генерирует код, я проверяю каждый шаг, тестирую и коммичу",
      "Все изменения в git с осмысленными сообщениями, каждая фича в своей ветке",
    ],
  },
  {
    number: "5",
    title: "SEO-оптимизация",
    description:
      "Полный набор SEO-базовых мета-тегов, структурированных данных и файлов для индексации.",
    details: [
      "Open Graph / Twitter Cards на всех страницах с og:image 1200×630",
      "JSON-LD структурированные данные (Organization + BreadcrumbList)",
      "robots.txt + sitemap.xml + уникальные canonical URL",
      "Уникальные title/description для каждой страницы (главная, /companies, /privacy, /docs, /anomalies)",
      "favicon.svg + lang=\"ru\"",
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { position: 1, name: "Главная", href: "/" },
          { position: 2, name: "Документация" },
        ]}
      />
      <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8"
        >
          ← На главную
        </Link>

        <div className="flex gap-16">
          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-3xl">
        <h1 id="test-task" className="text-3xl font-semibold tracking-tight text-gray-900 mb-2">
          Тестовое задание
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          Polza Agency — Технический специалист / вайбкодер
        </p>

        {/* Tasks */}
        <div className="space-y-12">
          {tasks.map((task) => (
            <section key={task.number} id={`task-${task.number}`}>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-medium text-white">
                  {task.number}
                </span>
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-2">
                    {task.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-gray-600 mb-4">
                    {task.description}
                  </p>
                  <ul className="space-y-2">
                    {task.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Архитектурные решения */}
        <section id="architecture" className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-6">
            Архитектурные решения
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Почему Next.js + TypeScript, а не Python?
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                В ТЗ не было жёсткого требования по языку для ETL-скрипта, но вся платформа Polza Agency
                построена на <strong>Next.js + TypeScript + PostgreSQL</strong>. Выбор TypeScript для скрипта
                загрузки данных и всего приложения — это осознанное архитектурное решение:
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Единый стек</strong> — скрипты загрузки, сайт и API пишутся на одном языке. Не нужно переключать контекст между Python и TypeScript.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Типизация</strong> — TypeScript даёт статическую проверку типов на всём протяжении: от парсинга JSON до UI-компонентов.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Server Components</strong> — данные фетчатся напрямую в серверном компоненте, без отдельного API-слоя. Меньше кода, быстрее работа.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Docker Compose</strong> — и БД, и приложение поднимаются одной командой. Не нужно ставить Python, Node.js или настраивать окружение вручную.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Единый CI/CD</strong> — один набор зависимостей для всего проекта: npm install, npm run build, npm start.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Прочие важные моменты
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Безопасность</strong> — .env в .gitignore, секреты не попадают в репозиторий. Промпт-инъекции и SQL-инъекции проверены (не найдены).</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Воспроизводимость</strong> — docker-compose.yml поднимает PostgreSQL, скрипт load_data.ts загружает данные. README с командой запуска.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>Дедупликация</strong> — компании сопоставляются по названию, дубликаты исключаются на этапе загрузки.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" />
                  <span><strong>ETL-обработка аномалий</strong> — автоматическое выявление и исправление битой кодировки, нормализация городов, приведение типов.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SQL queries */}
        <section id="sql-queries" className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-6">
            SQL-запросы
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                1. Топ-5 категорий по числу компаний
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
{`SELECT category, COUNT(*) AS company_count
FROM companies
WHERE category IS NOT NULL
GROUP BY category
ORDER BY company_count DESC
LIMIT 5;`}
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                2. Средний рейтинг по городам (компании с 10+ отзывами)
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
{`SELECT city,
       ROUND(AVG(rating)::numeric, 2) AS avg_rating,
       COUNT(*)                       AS company_count
FROM companies
WHERE rating IS NOT NULL
  AND reviews_count >= 10
GROUP BY city
ORDER BY avg_rating DESC;`}
              </pre>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                3. Доля компаний с сайтом по категориям
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
{`SELECT category,
       COUNT(*)                                                              AS total,
       COUNT(*) FILTER (WHERE site IS NOT NULL)                              AS with_site,
       ROUND(100.0 * COUNT(*) FILTER (WHERE site IS NOT NULL) / COUNT(*), 1) AS pct_with_site
FROM companies
WHERE category IS NOT NULL
GROUP BY category
ORDER BY pct_with_site DESC;`}
              </pre>
            </div>
          </div>
        </section>

        {/* Q&A from employer */}
        <section id="qa" className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 mb-8">
            Вопрос-ответ
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                IDE и LLM модели — выбор и эволюция
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                <strong>Q:</strong> Твой выбор IDE и LLM моделей сейчас и как он менялся последние полгода.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>A:</strong> Сейчас основная IDE это VS Code. Для работы с кодом использую двух агентов: Claude Code (Sonnet 5) и OpenCode с бесплатными моделями DeepSeek V4 Flash и OpenCode Zen. Полгода назад в основном работал с бесплатными китайскими моделями DeepSeek, MiniMax, MiMo. Причина была не только в экономии. Бесплатные модели чаще требуют самостоятельно разбираться в архитектуре проекта, проверять предлагаемые решения и принимать инженерные решения самому. Для меня это было полезно, потому что позволяло лучше понимать код и технологии, а не просто принимать готовые ответы модели. Задачи стали серьезнее и я пришел к подписке Claude, но все ещё совмещаю.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Подписки на LLM сервисы
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                <strong>Q:</strong> Сколько и каких подписок в месяц тебе хватает для полноценной работы.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>A:</strong> Подписка Claude pro покрывает все задачи + иногда использую бесплатные модели в OpenCode на несущественных задачах (рутина, документация), где не стоит вопрос безопасности или критичного искажения данных.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Методология сравнения моделей
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                <strong>Q:</strong> Как сравниваешь две новые модели или инструмента — по ощущениям или на одинаковом наборе задач?
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>A:</strong> На одинаковом наборе задач, например, багфикс в существующем коде, миграция, рефакторинг. В первую очередь интересует не столько скорость сколько качество. Так же проверяю модели на больших задачах, но тут мы уже переходим в область ощущений часто. На больших задачах мы видим как модель справляется разово. Насколько четко нужно прописывать алгоритм словами либо модель способна сама безошибочно простроить всю цепочку от пункта А к пункту Б, насколько точно модель следует требованиям, понимает ли она существующую архитектуру проекта, не ломает ли код.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Тестирование новых функций
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                <strong>Q:</strong> Какие тесты ты потребуешь для новой функции?
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>A:</strong> Unit-тесты, валидность данных, отработка исключений и сообщения об ошибках, ручная проверка чтобы убедиться, что функция действительно работает так, как ожидается. + Безопасность ручного ввода с фронта (инъекции). Если это вход, то авторизация, права доступа, роли.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Разрешения для coding-агента
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                <strong>Q:</strong> Какие разрешения ты дашь coding-агенту, имеющему доступ к терминалу и базе?
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>A:</strong> Агент должен быть максимально ограничен в доступе к командам терминала и базы данных. В идеале агент должен работать под отдельной учетной записью с ограниченным набором прав. Если речь идет о базе данных, то по умолчанию ему достаточно доступа на чтение. Любые операции, которые могут изменить или удалить данные — с подтверждением от человека. В начале разработки допускаю большую свободу действий для моделей. Работающий проект — однозначно ограничения прав агента.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Автоматические тесты и CI/CD
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                <strong>Q:</strong> Пишешь ли ты автоматические тесты и включаешь ли их в CI/CD? Какие проверки должны обязательно пройти перед слиянием и деплоем.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>A:</strong> Сборка, линтинги, проверка зависимостей, аудиты безопасности.
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <div className="mt-16 border-t border-gray-100 pt-8">
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <span className="text-gray-400">Страницы:</span>
            <Link
              href="/companies"
              className="text-gray-900 hover:underline"
            >
              /companies
            </Link>
            <Link
              href="/anomalies"
              className="text-gray-900 hover:underline"
            >
              /anomalies
            </Link>
            <Link
              href="/privacy"
              className="text-gray-900 hover:underline"
            >
              /privacy
            </Link>
            <a
              href="https://github.com/nikeli33/polza-agency-companies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:underline"
            >
              GitHub
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/anomalies"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Отчёт об аномалиях
            </Link>
            <a
              href="/api/anomalies/download"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Скачать ANOMALIES.md
            </a>
          </div>
        </div>
      </div>

      {/* Sidebar — оглавление */}
      <aside className="hidden xl:block w-64 shrink-0">
        <nav className="sticky top-16">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-4">
            Оглавление
          </p>
          <div className="space-y-1">
            <a
              href="#test-task"
              className="block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors py-1"
            >
              Тестовое задание
            </a>
            <div className="ml-4 space-y-0.5">
              {tasks.slice(0, 4).map((task) => (
                <a
                  key={task.number}
                  href={`#task-${task.number}`}
                  className="block text-sm text-gray-500 hover:text-gray-900 transition-colors py-1"
                >
                  {task.number}. {task.title}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100 space-y-1">
            <a
              href="#architecture"
              className="block text-sm text-gray-500 hover:text-gray-900 transition-colors py-1"
            >
              Архитектурные решения
            </a>
            <a
              href="#sql-queries"
              className="block text-sm text-gray-500 hover:text-gray-900 transition-colors py-1"
            >
              SQL-запросы
            </a>
            <a
              href="#qa"
              className="block text-sm text-gray-500 hover:text-gray-900 transition-colors py-1"
            >
              Вопрос-ответ
            </a>
            <a
              href="/anomalies"
              className="block text-sm text-gray-500 hover:text-gray-900 transition-colors py-1"
            >
              Отчёты
            </a>
          </div>
        </nav>
      </aside>
      </div>
    </div>
    </main>
    </>
  );
}
