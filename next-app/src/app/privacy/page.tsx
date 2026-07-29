import type { Metadata } from 'next';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

const siteUrl = "https://portal.nexusbots.ru";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика обработки персональных данных пользователей сайта Polza Agency Portal. Узнайте, какие данные собираются, как хранятся и какие права есть у пользователей.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Политика конфиденциальности | Polza Agency Portal",
    description:
      "Политика обработки персональных данных пользователей сайта Polza Agency Portal.",
    url: `${siteUrl}/privacy`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Polza Agency Portal — Политика конфиденциальности",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Политика конфиденциальности | Polza Agency Portal",
    description:
      "Политика обработки персональных данных пользователей сайта Polza Agency Portal.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { position: 1, name: "Главная", href: "/" },
          { position: 2, name: "Политика конфиденциальности" },
        ]}
      />
      <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-8">
          Политика обработки персональных данных
        </h1>
        <p className="text-sm text-gray-400 mb-8">Дата последнего обновления: 29 июля 2026 г.</p>

        <div className="prose prose-gray max-w-none space-y-6 text-sm leading-relaxed text-gray-700">

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">1. Общие положения</h2>
            <p>
              1.1. Настоящая Политика обработки персональных данных (далее — Политика) определяет порядок
              обработки персональных данных пользователей сайта <strong>Polza Agency Portal</strong>,
              расположенного по адресу <strong>portal.nexusbots.ru</strong> (далее — Сайт).
            </p>
            <p>
              1.2. Оператором, осуществляющим обработку персональных данных, является:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-2 mb-4 text-sm">
              <p><strong>ИП Акулинин Николай Владимирович</strong></p>
              <p>ИНН: 772603180960</p>
              <p>ОГРНИП: 322774600709243</p>
              <p>РКН: 77-26-554007</p>
              <p>ОКВЭД: 62.01 (основной), 62.02, 62.09</p>
              <p>г. Москва</p>
              <p>Email: nexusbots.studio@gmail.com</p>
              <p>Сайт: <a href="https://nexusbots.ru" className="text-gray-900 hover:underline">nexusbots.ru</a></p>
            </div>
            <p>
              1.3. Используя Сайт, Пользователь выражает свое безоговорочное согласие с условиями настоящей Политики.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">2. Какие данные собираются</h2>
            <p>2.1. Сайт автоматически собирает следующие данные:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>IP-адрес</li>
              <li>Тип браузера и версия</li>
              <li>Cookies (строго необходимые для функционирования сайта)</li>
              <li>Дата и время посещения</li>
              <li>Путь движения по сайту</li>
            </ul>
            <p className="mt-3">
              2.2. Сайт <strong>не собирает</strong> и не обрабатывает персональные данные посетителей
              (имя, телефон, email) через формы ввода — такие формы на Сайте отсутствуют.
            </p>
            <p>
              2.3. Данные о компаниях, отображаемые на Сайте, являются общедоступными сведениями
              о юридических лицах и не относятся к персональным данным физических лиц.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">3. Цели сбора данных</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Обеспечение работоспособности Сайта</li>
              <li>Анализ посещаемости и улучшение пользовательского опыта</li>
              <li>Предотвращение технических сбоев и атак</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">4. Правовые основания обработки</h2>
            <p>
              Обработка осуществляется на основании:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Согласия Пользователя (ст. 6 ч. 1 п. 1 152-ФЗ)</li>
              <li>Законного интереса Оператора (ст. 6 ч. 1 п. 7 152-ФЗ)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">5. Использование cookies</h2>
            <p>
              5.1. Сайт использует файлы cookies исключительно для обеспечения корректной работы
              и сохранения настроек пользователя (в частности, статуса согласия на обработку данных).
            </p>
            <p>
              5.2. Пользователь может отключить cookies в настройках браузера. Однако это может
              повлиять на корректную работу Сайта.
            </p>
            <p>
              5.3. Сайт <strong>не использует</strong> сторонние трекеры (Google Analytics, Яндекс.Метрика,
              Facebook Pixel и аналоги).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">6. Хранение и локализация данных</h2>
            <p>
              6.1. Данные хранятся на серверах, расположенных на территории Российской Федерации
              (локальный Docker-контейнер PostgreSQL).
            </p>
            <p>
              6.2. Трансграничная передача персональных данных не осуществляется.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">7. Сроки хранения</h2>
            <p>
              Данные хранятся до момента достижения целей обработки либо до отзыва согласия
              Пользователем. После этого данные подлежат уничтожению.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">8. Права пользователя</h2>
            <p>Пользователь имеет право:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Получить информацию об обработке его данных</li>
              <li>Отозвать согласие на обработку в любой момент</li>
              <li>Требовать уточнения, блокирования или уничтожения данных</li>
              <li>Обжаловать действия Оператора в Роскомнадзоре</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">9. Контактная информация</h2>
            <div className="bg-gray-50 rounded-lg p-4 mt-2 text-sm">
              <p><strong>ИП Акулинин Николай Владимирович</strong></p>
              <p>Email: <a href="mailto:nexusbots.studio@gmail.com" className="text-gray-900 hover:underline">nexusbots.studio@gmail.com</a></p>
              <p>Сайт: <a href="https://nexusbots.ru" className="text-gray-900 hover:underline">nexusbots.ru</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">10. Изменение Политики</h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику.
              Актуальная версия всегда доступна на Сайте.
            </p>
          </section>

        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <a
            href="/companies"
            className="text-sm text-gray-900 hover:underline"
          >
            ← Вернуться к каталогу компаний
          </a>
        </div>
      </div>
    </main>
    </>
  );
}
