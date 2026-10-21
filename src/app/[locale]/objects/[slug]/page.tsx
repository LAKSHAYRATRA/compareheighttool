import { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARISONS_DATA } from "@/data/comparisons";
import { ComparisonTemplate } from "@/components/ComparisonTemplate";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";

import { getComparisonTranslation } from "@/data/comparisons-translations";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const nonEnglishLocales = SITE_CONFIG.locales.filter((loc) => loc !== "en");
  const objectSlugs = COMPARISONS_DATA.filter((c) => c.category === "objects").map((c) => c.slug);

  const paths: { locale: string; slug: string }[] = [];
  for (const locale of nonEnglishLocales) {
    for (const slug of objectSlugs) {
      paths.push({ locale, slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "objects");
  if (!item) return {};

  const cleanPath = `/objects/${slug}`;
  const locTranslation = getComparisonTranslation(slug, loc);
  const title = locTranslation?.title || item.title;
  const description = locTranslation?.metaDescription || item.metaDescription;

  const localizedKeyword =
    loc === "es"
      ? "comparador de objetos y altura"
      : loc === "de"
      ? "größenvergleich objekte"
      : loc === "fr"
      ? "comparateur taille objets"
      : loc === "pt"
      ? "comparador de altura objetos"
      : "日常品 身長比較";

  return {
    title,
    description,
    keywords: [
      title,
      localizedKeyword,
      "reference object height scale",
      "visual scale chart",
    ],
    alternates: {
      canonical: getCanonicalUrl(cleanPath, loc),
      languages: getAlternateLanguages(cleanPath),
    },
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(cleanPath, loc),
    },
  };
}

export default async function LocalizedObjectPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "objects");
  if (!item) notFound();

  return (
    <ComparisonTemplate
      data={item}
      canonicalPath={`/objects/${slug}`}
      currentLocale={loc}
    />
  );
}
