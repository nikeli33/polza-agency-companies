import Image from "next/image";
import Link from "next/link";
import { BuildingIcon, GithubIcon } from "@/components/icons";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <BreadcrumbSchema items={[{ position: 1, name: "Главная" }]} />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-white">
        {/* SVG волна в шапке */}
        <div className="absolute top-0 left-0 right-0 z-0 overflow-hidden" aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1920"
            height="620"
            viewBox="0 0 1920 620"
            fill="none"
            className="w-full h-auto max-h-[300px] opacity-40"
            preserveAspectRatio="none"
          >
            <g opacity="0.4">
              <path d="M0 1C53.3611 103.392 260.536 300.646 662.345 270.531C1164.61 232.887 983.012 19.0691 1920 1" stroke="#17C8F0" strokeWidth="2" />
              <path d="M0 246.94C57.3632 340.13 256.734 542.772 595.31 607.821C1018.53 689.132 1103.57 304.661 1423.74 171.652C1679.87 65.245 1861.3 43.997 1920 46.6739" stroke="#2287FC" strokeWidth="2" />
              <path d="M0 8.84376C27.66 61.3801 97.0788 140.369 213.107 198.931C331.837 258.012 481.938 286.191 686.649 267.368C1181.05 227.529 1011.05 19.8581 1920 2.45117" stroke="#17C6F0" strokeWidth="2" />
              <path d="M0 17.0722C28.6875 71.0149 102.602 154.281 226.329 213.068C355.593 272.918 503.443 286.821 712.148 264.048C1198.31 221.907 1040.46 20.6848 1920 3.97266" stroke="#18C4F1" strokeWidth="2" />
              <path d="M0 25.6873C29.7633 81.1024 108.384 168.847 240.171 227.869C380.462 288.524 525.956 287.482 738.843 260.574C1216.38 216.021 1071.25 21.5512 1920 5.56641" stroke="#18C2F1" strokeWidth="2" />
              <path d="M0 34.6891C30.8872 91.6424 114.425 184.066 254.633 243.333C406.445 304.829 549.478 288.174 766.733 256.945C1235.25 209.874 1103.43 22.4572 1920 7.23242" stroke="#18BFF2" strokeWidth="2" />
              <path d="M0 44.0756C32.0593 102.633 120.725 199.936 269.714 259.459C433.542 321.832 574.007 288.894 795.818 253.16C1254.93 203.461 1136.98 23.4011 1920 8.96875" stroke="#19BDF2" strokeWidth="2" />
              <path d="M0 53.8487C33.2795 114.076 127.284 216.459 285.416 276.248C461.752 339.535 599.545 289.645 826.099 249.219C1275.43 196.786 1171.91 24.3846 1920 10.7773" stroke="#19BAF3" strokeWidth="2" />
              <path d="M0 64.0065C34.5479 125.97 134.101 233.633 301.737 293.699C491.075 357.936 626.09 290.424 857.575 245.123C1296.73 189.847 1208.21 25.4059 1920 12.6562" stroke="#1AB8F3" strokeWidth="2" />
              <path d="M0 74.551C35.8645 138.317 141.178 251.46 318.678 311.814C521.513 377.036 653.644 291.234 890.246 240.871C1318.84 182.645 1245.9 26.4669 1920 14.6074" stroke="#1AB5F4" strokeWidth="2" />
              <path d="M0 85.4802C37.2292 151.114 148.514 269.495 336.292 330.595C535.705 394.757 681.586 291.669 924.362 236.28C1340.39 176.34 1275.45 27.3709 1920 16.6152" stroke="#1BB3F4" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Логотип Polza Agency — по центру */}
        <div className="relative z-10 px-6 pt-6 flex justify-center">
          <Image
            src="/polza.png"
            alt="Polza Agency"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
        </div>
      <div className="relative z-10 mx-auto flex-1 flex flex-col items-center justify-center max-w-2xl px-6 py-32 text-center">

        {/* Заголовок */}
        <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Polza Agency Portal
        </h1>

        {/* Подзаголовок */}
        <p className="mt-4 text-lg leading-8 text-gray-500">
          Тестовое задание для Polza Agency. Каталог компаний с поиском,
          фильтрацией и полным набором SEO/GEO-оптимизаций на Next.js + PostgreSQL.
        </p>

        {/* Статистика (GEO: +37% visibility) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <AnimatedCounter value={1000} suffix="+" className="font-semibold text-gray-900 text-lg tabular-nums" />
            <span className="text-gray-500">компаний</span>
          </div>
          <div className="flex items-center gap-2">
            <AnimatedCounter value={31} className="font-semibold text-gray-900 text-lg tabular-nums" />
            <span className="text-gray-500">аномалия</span>
          </div>
          <div className="flex items-center gap-2">
            <AnimatedCounter value={5} className="font-semibold text-gray-900 text-lg tabular-nums" />
            <span className="text-gray-500">технологий</span>
          </div>
          <div className="flex items-center gap-2">
            <AnimatedCounter value={100} suffix="%" className="font-semibold text-gray-900 text-lg tabular-nums" />
            <span className="text-gray-500">open source</span>
          </div>
        </div>

        {/* Кнопки */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/companies"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-gray-900 px-6 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            <BuildingIcon className="text-gray-400" />
            Каталог компаний
            <span aria-hidden="true" className="text-gray-400">→</span>
          </Link>

          <Link
            href="/privacy"
            className="inline-flex h-12 items-center rounded-xl border border-gray-200 px-6 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Политика конфиденциальности
          </Link>

          <Link
            href="/docs"
            className="inline-flex h-12 items-center rounded-xl border border-gray-200 px-6 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Документация
          </Link>
        </div>

        {/* Дополнительные ссылки */}
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
          <Link
            href="/anomalies"
            className="hover:text-gray-600 transition-colors"
          >
            Отчёт об аномалиях
          </Link>
          <span aria-hidden="true">·</span>
          <a
            href="https://github.com/nikeli33/polza-agency-companies"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-800 hover:text-gray-800 hover:underline transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>

        {/* Технические детали */}
        <div className="mt-10 border-t border-gray-100 pt-8">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                label: "Стек",
                value: "Next.js 16 · TypeScript · Tailwind CSS",
              },
              {
                label: "База данных",
                value: "PostgreSQL · Docker",
              },
              {
                label: "Статус",
                value: "Демо · portal.nexusbots.ru · Polza Agency",
              },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm text-gray-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
    </>
  );
}
