import type { Product } from "@/lib/data/products";

const BASE_URL = "https://nilechic.com";

export function getOrganizationSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NileChic",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      locale === "ar"
        ? "ملابس داخلية فاخرة تحتفل بالأنوثة والثقة. تغليف سري ودفع عند الاستلام."
        : "Elegant lingerie designed to celebrate femininity and confidence. Discreet packaging, cash on delivery.",
    sameAs: ["https://www.instagram.com/nilechic"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic"],
    },
  };
}

export function getWebSiteSchema(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NileChic",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/${locale}/shop?category={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getProductSchema(product: Product, locale: string) {
  const name = locale === "ar" ? product.nameAr : product.name;
  const description = locale === "ar" ? product.descriptionAr : product.description;
  const url = `${BASE_URL}/${locale}/product/${product.id}/`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: product.images?.length ? product.images : [product.image],
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url,
    },
  };
}

export function getFAQSchema(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
