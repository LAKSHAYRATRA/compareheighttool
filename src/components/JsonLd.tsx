import React from "react";
import { SITE_CONFIG } from "@/config/site";

interface WebAppSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function WebAppJsonLd({ name, description, url }: WebAppSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "Measurement & Scale Visualizer",
    operatingSystem: "All",
    browserRequirements: "Requires HTML5 Canvas and JavaScript support",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1840",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Millimeter-accurate visual silhouette scaling",
      "Instant Metric (cm) and Imperial (ft/in) toggling",
      "Zero data collection, 100% browser-only client calculation",
      "High-resolution PNG export with watermark-free scale grid",
      "Celebrity, couple, and reference object presets",
    ],
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalBase,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  author: string;
}

export function ArticleJsonLd({
  title,
  description,
  url,
  publishedAt,
  author,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalBase,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqSchemaProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

export function FaqJsonLd({ faqs }: FaqSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: {
    name: string;
    url: string;
  }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.canonicalBase,
    logo: `${SITE_CONFIG.canonicalBase}/android-chrome-512x512.png`,
    description: SITE_CONFIG.description,
    foundingDate: "2024",
    email: "hello@compareheighttool.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@compareheighttool.com",
      availableLanguage: ["English", "Spanish", "German", "French", "Portuguese", "Japanese"],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.canonicalBase,
    description: SITE_CONFIG.description,
    inLanguage: ["en", "es", "de", "fr", "pt", "ja"],
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalBase,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AboutPageJsonLd({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalBase,
      description: SITE_CONFIG.description,
      email: "hello@compareheighttool.com",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ContactPageJsonLd({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalBase,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@compareheighttool.com",
        availableLanguage: ["English", "Spanish", "German", "French", "Portuguese", "Japanese"],
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CollectionPageJsonLd({
  url,
  name,
  description,
  items,
}: {
  url: string;
  name: string;
  description: string;
  items: { name: string; url: string; description: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: item.url,
        name: item.name,
        description: item.description,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebPageJsonLd({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.canonicalBase,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

