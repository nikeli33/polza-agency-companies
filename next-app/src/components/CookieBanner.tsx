'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Небольшая задержка, чтобы баннер появился после монтирования
      const timer = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 text-sm text-gray-600">
            <p>
              Этот сайт использует только технические файлы cookies для корректной работы.
              Нажимая «Ок», вы соглашаетесь с обработкой
              {' '}персональных данных в соответствии с{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Политикой конфиденциальности
              </a>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleReject}
              className="rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Отклонить
            </button>
            <button
              onClick={handleAccept}
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Ок
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
