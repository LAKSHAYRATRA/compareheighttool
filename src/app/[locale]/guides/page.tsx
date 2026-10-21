import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES_DATA } from "@/data/guides";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";
import { Clock, ArrowRight } from "lucide-react";
import { CollectionPageJsonLd } from "@/components/JsonLd";

interface LocalizedGuidesProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SITE_CONFIG.locales
    .filter((loc) => loc !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedGuidesProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  const localizedKeywords: Record<Locale, string[]> = {
    en: SITE_CONFIG.keywords,
    es: ["guías de estatura", "percentiles de altura", "crecimiento óseo", "mitos de estatura", "estadiómetro casero"],
    de: ["ratgeber körpergröße", "größenperzentile", "wachstumsfugen fakten", "größer werden natürlich", "stadiometer messung"],
    fr: ["guides taille humaine", "percentiles de taille", "cartilages de croissance", "grandir naturellement", "mesure stadiomètre"],
    pt: ["guias de altura", "percentis de estatura", "cartilagens de crescimento", "como aumentar a altura", "medição stadiômetro"],
    ja: ["身長 ガイド", "身長パーセンタイル", "骨端線 成長期", "身長を伸ばす方法", "身長 正確な測り方"],
  };

  return {
    title: t.guides,
    description: t.subtitle,
    keywords: localizedKeywords[loc] || SITE_CONFIG.keywords,
    alternates: {
      canonical: getCanonicalUrl("/guides", loc),
      languages: getAlternateLanguages("/guides"),
    },
    openGraph: {
      title: `${t.guides} | ${SITE_CONFIG.name}`,
      description: t.subtitle,
      url: getCanonicalUrl("/guides", loc),
    },
  };
}

export default async function LocalizedGuidesPage({ params }: LocalizedGuidesProps) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  const canonicalUrl = getCanonicalUrl("/guides", loc);
  const guideItems = GUIDES_DATA.map((article) => ({
    name: article.translations?.[loc]?.title || article.title,
    url: getCanonicalUrl(`/guides/${article.slug}`, loc),
    description: article.translations?.[loc]?.summary || article.summary,
  }));

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <CollectionPageJsonLd
        url={canonicalUrl}
        name={`${t.guides} - ${SITE_CONFIG.name}`}
        description={t.subtitle}
        items={guideItems}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center sm:text-left border-b border-stone-200/90 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {t.guides} - {SITE_CONFIG.name}
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {GUIDES_DATA.map((article) => (
            <article
              key={article.slug}
              className="p-6 bg-white border border-stone-200/90 rounded-2xl hover:border-stone-300 transition-all shadow-xs space-y-3"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold text-stone-900 hover:text-blue-600 transition-colors">
                <Link href={`/${loc}/guides/${article.slug}`}>
                  {article.translations?.[loc]?.title || article.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {article.translations?.[loc]?.metaDescription || article.metaDescription}
              </p>

              <div className="pt-2">
                <Link
                  href={`/${loc}/guides/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
                >
                  <span>{t.viewFullAnalysis}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
