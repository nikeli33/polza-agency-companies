import type { Metadata } from 'next';
import { fetchCompanies, fetchCities, COMPANIES_PAGE_SIZE } from '@/lib/db';
import { CompaniesClient } from './CompaniesClient';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

const siteUrl = "https://portal.nexusbots.ru";

export const metadata: Metadata = {
  title: "Каталог компаний",
  description:
    "Поиск и фильтрация компаний из базы данных Polza Agency Portal. Просмотр рейтингов, контактов и категорий организаций.",
  alternates: {
    canonical: `${siteUrl}/companies`,
  },
  openGraph: {
    title: "Каталог компаний | Polza Agency Portal",
    description:
      "Поиск и фильтрация компаний из базы данных Polza Agency Portal.",
    url: `${siteUrl}/companies`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Polza Agency Portal — Каталог компаний",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Каталог компаний | Polza Agency Portal",
    description:
      "Поиск и фильтрация компаний из базы данных Polza Agency Portal.",
    images: ["/og-image.png"],
  },
};

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; city?: string; page?: string }>;
}) {
  const { q = '', city = '', page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [{ rows: companies, total }, cities] = await Promise.all([
    fetchCompanies({ q, city, page }),
    fetchCities(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / COMPANIES_PAGE_SIZE));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { position: 1, name: "Главная", href: "/" },
          { position: 2, name: "Каталог компаний" },
        ]}
      />
      <CompaniesClient
      companies={companies}
      cities={cities}
      currentQ={q}
      currentCity={city}
      currentPage={page}
      totalPages={totalPages}
      total={total}
    />
    </>
  );
}
