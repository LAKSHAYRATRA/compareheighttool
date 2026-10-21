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
  const celebritySlugs = COMPARISONS_DATA.filter((c) => c.category === "celebrity").map((c) => c.slug);

  const paths: { locale: string; slug: string }[] = [];
  for (const locale of nonEnglishLocales) {
    for (const slug of celebritySlugs) {
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
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "celebrity");
  if (!item) return {};

  const cleanPath = `/celebrities/${slug}`;
  const locTranslation = getComparisonTranslation(slug, loc);
  const title = locTranslation?.title || item.title;
  const description = locTranslation?.metaDescription || item.metaDescription;

  const localizedKeyword =
    loc === "es"
      ? "comparador de estatura famosos"
      : loc === "de"
      ? "promi größenvergleich"
      : loc === "fr"
      ? "comparateur taille célébrités"
      : loc === "pt"
      ? "comparador de altura famosos"
      : "芸能人 身長比較";

  return {
    title,
    description,
    keywords: [
      title,
      ...item.entities.map((e) => e.name),
      localizedKeyword,
      "height comparison",
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

export default async function LocalizedCelebrityPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "celebrity");
  if (!item) notFound();

  return (
    <ComparisonTemplate
      data={item}
      canonicalPath={`/celebrities/${slug}`}
      currentLocale={loc}
    />
  );
}
