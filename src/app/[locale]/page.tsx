import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeightCanvas } from "@/components/HeightCanvas";
import { WebAppJsonLd, FaqJsonLd, OrganizationJsonLd } from "@/components/JsonLd";
import { COMPARISONS_DATA } from "@/data/comparisons";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { ArrowRight } from "lucide-react";

interface LocalePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  // Only non-default locales go under /[locale]
  return SITE_CONFIG.locales
    .filter((loc) => loc !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];
  const path = "/";

  const localizedKeywords: Record<Locale, string[]> = {
    en: SITE_CONFIG.keywords,
    es: [
      "comparador de estatura",
      "comparador de altura",
      "comparar estaturas",
      "tabla de altura visual",
      "diferencia de altura famosos",
      "medidor de altura online",
      "escala de altura",
      "comparador de altura parejas",
    ],
    de: [
      "größenvergleich",
      "körpergröße vergleich",
      "größenunterschied berechnen",
      "promi größenvergleich",
      "menschen größenvergleich",
      "größen visualisierer",
      "online größenvergleich chart",
    ],
    fr: [
      "comparateur de taille",
      "comparer les tailles",
      "simulateur de taille humaine",
      "différence de taille couple",
      "comparateur taille célébrités",
      "tableau comparatif de taille",
    ],
    pt: [
      "comparador de altura",
      "comparar alturas",
      "simulador de altura",
      "diferença de altura casal",
      "comparador de estatura famosos",
      "tabela de altura visual",
    ],
    ja: [
      "身長比較",
      "身長比較ツール",
      "身長差 比較",
      "芸能人 身長比較",
      "カップル 身長差 計算",
      "身長シミュレーター",
      "身長 比較 画像",
    ],
  };

  return {
    title: t.siteTitle.replace("CompareHeightTool - ", ""),
    description: t.subtitle,
    keywords: localizedKeywords[loc] || SITE_CONFIG.keywords,
    alternates: {
      canonical: getCanonicalUrl(path, loc),
      languages: getAlternateLanguages("/"),
    },
    openGraph: {
      title: t.siteTitle,
      description: t.subtitle,
      url: getCanonicalUrl(path, loc),
    },
  };
}

export default async function LocalizedHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col">
      <OrganizationJsonLd />
      <WebAppJsonLd
        name={t.siteTitle}
        description={t.subtitle}
        url={getCanonicalUrl("/", loc)}
      />
      <FaqJsonLd faqs={t.faqs} />

      {/* Hero Header */}
      <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 max-w-3xl mx-auto leading-tight">
          {t.siteTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </section>

      {/* Main Interactive Workspace (Defaulting to Metric for ES, DE, FR, PT, JA) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12">
        <HeightCanvas unitDefault="metric" currentLocale={loc} />
      </section>

      {/* Programmatic Comparison Hubs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-8 border-t border-stone-200/90">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.popularComparisons}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {t.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISONS_DATA.map((item) => (
            <Link
              key={item.slug}
              href={`/${loc}/${item.category === "celebrity" ? "celebrities" : item.category === "couples" ? "couples" : "objects"}/${item.slug}`}
              className="group p-5 bg-white hover:bg-stone-50/50 border border-stone-200 hover:border-stone-300 rounded-xl transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-stone-900 font-semibold">
                    Δ {item.analysis.differenceCm} cm ({item.analysis.differenceInches}&quot;)
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {item.metaDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-blue-700 font-medium">
                <span>{t.viewFullAnalysis}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature & Privacy Highlights */}
      <section className="bg-white border-y border-stone-200/90 py-12 px-4 sm:px-6 lg:px-8 mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-stone-900">{t.features.feature1Title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.features.feature1Desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-stone-900">{t.features.feature2Title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.features.feature2Desc}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-stone-900">{t.features.feature3Title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.features.feature3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational & Editorial Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 space-y-8 text-stone-700 text-sm leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-stone-900">
            {t.educational.title}
          </h2>
          <p>
            {t.educational.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-stone-200/90 shadow-xs">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-900">
              {t.educational.maleBenchmarksTitle}
            </h3>
            <ul className="space-y-1 text-xs text-stone-600">
              {t.educational.maleBenchmarks.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-900">
              {t.educational.femaleBenchmarksTitle}
            </h3>
            <ul className="space-y-1 text-xs text-stone-600">
              {t.educational.femaleBenchmarks.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-stone-900">
            {t.educational.eyeLevelTitle}
          </h3>
          <p>
            {t.educational.eyeLevelIntro}
          </p>
          <div className="space-y-2 text-xs text-stone-600 pt-2">
            <p>{t.educational.milestone1}</p>
            <p>{t.educational.milestone2}</p>
            <p>{t.educational.milestone3}</p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-12 border-t border-stone-200/90">
        <div className="space-y-1.5 mb-8">
          <h2 className="text-2xl font-bold text-stone-900">
            {t.faqTitle}
          </h2>
          <p className="text-xs text-stone-500">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {t.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-stone-200/90 rounded-xl p-5 space-y-1.5 shadow-xs"
            >
              <h3 className="text-sm font-semibold text-stone-900">{faq.question}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
