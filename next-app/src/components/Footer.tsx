import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-400">
          {/* Реквизиты */}
          <div className="space-y-1">
            <p className="text-gray-500 font-medium text-xs">ИП Акулинин Николай Владимирович</p>
            <p>ИНН: 772603180960 · ОГРНИП: 322774600709243 · РКН: 77-26-554007</p>
            <p>ОКВЭД: 62.01 (основной), 62.02, 62.09 · г. Москва</p>
            <p>
              <a
                href="mailto:nexusbots.studio@gmail.com"
                className="text-gray-900 hover:underline"
              >
                nexusbots.studio@gmail.com
              </a>
              {' · '}
              <a
                href="https://nexusbots.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:underline"
              >
                nexusbots.ru
              </a>
            </p>
          </div>

          {/* Ссылки */}
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/privacy"
              className="text-gray-900 hover:underline"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/companies"
              className="text-gray-900 hover:underline"
            >
              Companies Directory
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
