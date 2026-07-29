import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://portal.nexusbots.ru";
const siteName = "Polza Agency Portal";

export const metadata: Metadata = {
  title: {
    default: `${siteName} — каталог компаний и демо-приложение`,
    template: `%s | ${siteName}`,
  },
    description:
      "Polza Agency Portal — каталог компаний с поиском, фильтрацией и демонстрацией стека Next.js + PostgreSQL.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description:
      "1000+ компаний, 31 аномалия данных, 5 технологий. Polza Agency Portal — каталог с поиском, фильтрацией и полным стеком Next.js + PostgreSQL.",
    url: siteUrl,
    locale: "ru_RU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "1000+ компаний | Next.js + PostgreSQL | SEO/GEO. Polza Agency Portal — демонстрационное приложение с поиском и фильтрацией.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer />
        <CookieBanner />

        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Polza Agency",
              url: "https://portal.nexusbots.ru",
              logo: "https://portal.nexusbots.ru/og-image.png",
              description:
                "Polza Agency Portal — каталог компаний с поиском и фильтрацией.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "nexusbots.studio@gmail.com",
                contactType: "customer service",
              },
            }),
          }}
        />

        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Polza Agency Portal",
              url: "https://portal.nexusbots.ru",
              description:
                "Polza Agency Portal — каталог компаний с поиском, фильтрацией и демонстрацией стека Next.js + PostgreSQL.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://portal.nexusbots.ru/companies?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: [
                  "h1",
                  ".hero-description",
                ],
              },
            }),
          }}
        />

        {/* BreadcrumbSchema добавляется индивидуально на каждую страницу */}

        <Script
          id="schema-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Что такое Polza Agency Portal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Polza Agency Portal — это демонстрационное веб-приложение на Next.js 16 + PostgreSQL, разработанное в рамках тестового задания для Polza Agency. Содержит каталог из 1000+ компаний с поиском, фильтрацией по городам и рейтингами.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Какие технологии используются в проекте?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Проект построен на Next.js 16 (App Router), TypeScript 5, Tailwind CSS 4 и PostgreSQL. Сервер работает на Node.js, база данных — в Docker. Для загрузки данных используется ETL-скрипт на TypeScript с дедупликацией и автоматическим исправлением битой кодировки.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Сколько компаний в каталоге и как их искать?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "В каталоге более 1000 компаний из 20 JSON-файлов. Доступен поиск по названию, фильтрация по городу, сортировка по рейтингу. Каждая компания содержит категорию, адрес, сайт, телефон и количество отзывов.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Какие SEO-оптимизации применены?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "На сайте реализованы: Open Graph и Twitter Cards на всех страницах, JSON-LD структурированные данные (Organization, WebSite, BreadcrumbList, FAQPage), robots.txt с доступом для AI-ботов, динамическая sitemap.xml, уникальные canonical URL, favicon.svg и og-image.png 1200×630.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Кто разработал Polza Agency Portal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Проект разработан Николаем Акулининым (ИП Акулинин Николай Владимирович) в рамках тестового задания для Polza Agency на позицию технического специалиста / вайбкодера. Разработка велась с использованием Claude Code, Cursor и DeepSeek V4 Flash.",
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
