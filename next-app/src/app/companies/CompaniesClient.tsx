'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import type { Company } from '@/lib/db';
import {
  SearchIcon,
  ChevronIcon,
  BuildingIcon,
  StarIcon,
  GlobeIcon,
  PhoneIcon,
} from '@/components/icons';

interface Props {
  companies: Company[];
  cities: string[];
  currentQ: string;
  currentCity: string;
  currentPage: number;
  totalPages: number;
  total: number;
}

export function CompaniesClient({
  companies,
  cities,
  currentQ,
  currentCity,
  currentPage,
  totalPages,
  total,
}: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState(currentQ);

  const buildHref = useCallback(
    (q: string, city: string, page?: number) => {
      const params = new URLSearchParams();
      if (q) params.set('q', q);
      if (city) params.set('city', city);
      if (page && page > 1) params.set('page', String(page));
      const qs = params.toString();
      return `/companies${qs ? `?${qs}` : ''}`;
    },
    [],
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      router.push(buildHref(searchValue, currentCity));
    },
    [searchValue, currentCity, router, buildHref],
  );

  const handleCityChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      router.push(buildHref(currentQ, e.target.value));
    },
    [currentQ, router, buildHref],
  );

  const handleRowClick = useCallback((_id: string) => {
    // В будущем можно сделать переход на карточку компании
    // router.push(`/companies/${_id}`);
  }, []);

  const isFiltered = currentQ || currentCity;

  return (
    <main className="min-h-screen bg-white">
      {/* Notion-style header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <BuildingIcon className="text-gray-400" />
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Каталог компаний
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-9">
            {total} {total === 1 ? 'компания' : total >= 2 && total <= 4 ? 'компании' : 'компаний'}
            {isFiltered ? ' найдено' : ' в базе'}
          </p>
          <nav className="mt-4 ml-9">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              ← На главную
            </Link>
          </nav>
        </div>
      </header>

      {/* Filters bar */}
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative flex-1 min-w-[200px] max-w-sm">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Поиск по названию…"
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-0 transition-colors"
            />
          </form>

          {/* City filter */}
          <div className="relative min-w-[180px]">
            <select
              value={currentCity}
              onChange={handleCityChange}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2 pl-3 pr-10 text-sm text-gray-900 focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-0 transition-colors cursor-pointer"
            >
                <option value="">Все города</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          {/* Clear filters */}
          {isFiltered && (
            <button
              type="button"
              onClick={() => router.push('/companies')}
              className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Сбросить
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mx-auto max-w-7xl px-6 pb-12">
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <Th>Название</Th>
                <Th className="hidden sm:table-cell">Категория</Th>
                <Th className="hidden md:table-cell">Город</Th>
                <Th>Рейтинг</Th>
                <Th className="hidden md:table-cell">Сайт</Th>
                <Th className="hidden lg:table-cell">Телефон</Th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-sm text-gray-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <BuildingIcon className="text-gray-300" />
                      <span>Компании не найдены</span>
                    </div>
                  </td>
                </tr>
              ) : (
                companies.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => handleRowClick(c.id)}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-default"
                  >
                    <Td>
                      <span className="font-medium text-gray-900">
                        {c.name}
                      </span>
                    </Td>
                    <Td className="hidden sm:table-cell">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {c.category || '—'}
                      </span>
                    </Td>
                    <Td className="hidden md:table-cell text-gray-600">
                      {c.city || '—'}
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1">
                        <StarIcon
                          className={
                            c.rating && c.rating >= 4
                              ? 'text-amber-400'
                              : c.rating && c.rating >= 3
                                ? 'text-amber-300'
                                : 'text-gray-300'
                          }
                        />
                        <span className="text-sm tabular-nums text-gray-700">
                          {c.rating ? c.rating.toFixed(1) : '—'}
                        </span>
                        {c.reviews_count != null && (
                          <span className="text-xs text-gray-400 ml-1">
                            ({c.reviews_count})
                          </span>
                        )}
                      </div>
                    </Td>
                    <Td className="hidden md:table-cell">
                      {c.site ? (
                        <a
                          href={c.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <GlobeIcon />
                          <span className="truncate max-w-[140px]">
                            {c.site.replace(/^https?:\/\//, '')}
                          </span>
                        </a>
                      ) : (
                        <span className="text-sm text-gray-300">—</span>
                      )}
                    </Td>
                    <Td className="hidden lg:table-cell">
                      {c.phone ? (
                        <a
                          href={`tel:${c.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <PhoneIcon />
                          <span>{c.phone}</span>
                        </a>
                      ) : (
                        <span className="text-sm text-gray-300">—</span>
                      )}
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <PageLink
              href={buildHref(currentQ, currentCity, currentPage - 1)}
              disabled={currentPage <= 1}
            >
              ← Назад
            </PageLink>
            <span className="text-sm text-gray-500">
              Страница {currentPage} из {totalPages}
            </span>
            <PageLink
              href={buildHref(currentQ, currentCity, currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              Вперёд →
            </PageLink>
          </div>
        )}
      </div>
    </main>
  );
}

function PageLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="rounded-lg border border-gray-100 px-4 py-2 text-sm text-gray-300">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
    >
      {children}
    </Link>
  );
}

// Table helpers
function Th({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-6 py-4 text-sm ${className}`}>{children}</td>
  );
}
