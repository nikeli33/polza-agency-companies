import Script from "next/script";

const siteUrl = "https://portal.nexusbots.ru";

interface BreadcrumbItem {
  position: number;
  name: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: Props) {
  const itemListElement = items.map((item) => ({
    "@type": "ListItem",
    position: item.position,
    name: item.name,
    ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
  }));

  return (
    <Script
      id="schema-breadcrumb"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
