import React from "react";
import Link from "next/link";
import { ProgrammaticPageData } from "@/types/comparison";
import { HeightCanvas } from "@/components/HeightCanvas";
import { WebAppJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl } from "@/config/site";
import { ArrowRight } from "lucide-react";

import { getComparisonTranslation } from "@/data/comparisons-translations";
import { TRANSLATIONS } from "@/data/translations";

interface ComparisonTemplateProps {
  data: ProgrammaticPageData;
  canonicalPath: string;
  currentLocale?: import("@/config/site").Locale;
}

export function ComparisonTemplate({
  data,
  canonicalPath,
  currentLocale = "en",
}: ComparisonTemplateProps) {
  const getLocalePath = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (currentLocale === "en") return cleanPath;
    return `/${currentLocale}${cleanPath === "/" ? "" : cleanPath}`;
  };

  const locTranslation = getComparisonTranslation(data.slug, currentLocale);
  const title = locTranslation?.title || data.title;
  const h1 = locTranslation?.h1 || data.h1;
  const metaDescription = locTranslation?.metaDescription || data.metaDescription;
  const differenceDescription = locTranslation?.differenceDescription || data.analysis.differenceDescription;
  const keyInsights = locTranslation?.keyInsights || data.analysis.keyInsights;
  const faqs = locTranslation?.faqs || data.faqs;

  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;

  const categoryLabels: Record<string, Record<string, string>> = {
    celebrity: {
      en: "Celebrities",
      es: "Famosos",
      de: "Promis",
      fr: "Célébrités",
      pt: "Famosos",
      ja: "有名人",
    },
    couples: {
      en: "Couples",
      es: "Parejas",
      de: "Paare",
      fr: "Couples",
      pt: "Casais",
      ja: "カップル",
    },
    objects: {
      en: "Objects",
      es: "Objetos",
      de: "Objekte",
      fr: "Objets",
      pt: "Objetos",
      ja: "日用品",
    },
  };

  const uiLabels: Record<string, Record<string, string>> = {
    home: { en: "Home", es: "Inicio", de: "Startseite", fr: "Accueil", pt: "Início", ja: "ホーム" },
    breakdown: {
      en: "Difference Breakdown",
      es: "Desglose de Diferencia",
      de: "Größenunterschied im Detail",
      fr: "Analyse de la Différence",
      pt: "Diferença Detalhada",
      ja: "身長差の詳細分析",
    },
    observations: {
      en: "Visual & Standing Scale Observations",
      es: "Observaciones de Escala y Postura Visual",
      de: "Visuelle Beobachtungen & Einblicke",
      fr: "Observations Visuelles et Échelle",
      pt: "Observações Visuais de Escala",
      ja: "視覚的なスケールと身長差の特徴",
    },
    exploreMore: {
      en: "Explore More Comparisons",
      es: "Explorar Más Comparaciones",
      de: "Weitere Vergleiche Entdecken",
      fr: "Découvrir D'autres Comparaisons",
      pt: "Explorar Mais Comparações",
      ja: "他の身長比較を見る",
    },
  };

  const categoryName = categoryLabels[data.category]?.[currentLocale] || data.category;
  const homeLabel = uiLabels.home[currentLocale] || "Home";
  const breakdownLabel = uiLabels.breakdown[currentLocale] || "Difference Breakdown";
  const observationsLabel = uiLabels.observations[currentLocale] || "Visual & Standing Scale Observations";
  const exploreMoreLabel = uiLabels.exploreMore[currentLocale] || "Explore More Comparisons";

  const breadcrumbs = [
    { name: homeLabel, url: getCanonicalUrl("/", currentLocale) },
    {
      name: categoryName,
      url: `${SITE_CONFIG.canonicalBase}${getLocalePath(
        data.category === "celebrity"
          ? "/celebrities"
          : data.category === "couples"
          ? "/couples"
          : "/objects"
      )}`,
    },
    { name: title, url: getCanonicalUrl(canonicalPath, currentLocale) },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col">
      {/* Structured Schemas */}
      <WebAppJsonLd
        name={title}
        description={metaDescription}
        url={getCanonicalUrl(canonicalPath, currentLocale)}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      {/* Header & Breadcrumb Bar */}
      <div className="border-b border-stone-200/90 bg-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-stone-500 flex items-center space-x-2">
          <Link href={getLocalePath("/")} className="hover:text-blue-600 transition-colors">
            {homeLabel}
          </Link>
          <span>/</span>
          <span className="capitalize">{categoryName}</span>
          <span>/</span>
          <span className="text-stone-800 font-medium truncate max-w-xs sm:max-w-md">
            {h1}
          </span>
        </div>
      </div>

      {/* Hero Title */}
      <section className="pt-8 pb-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-3">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 max-w-3xl mx-auto leading-tight">
          {h1}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto">
          {metaDescription}
        </p>
      </section>

      {/* Interactive Tool Workspace */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-8">
        <HeightCanvas
          initialEntities={data.entities}
          title={data.h1}
          unitDefault={currentLocale === "en" ? "imperial" : "metric"}
          showToolbarControls={true}
          currentLocale={currentLocale}
        />
      </section>

      {/* Detailed Statistical Analysis */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-6 space-y-6">
        {/* Metric Comparison Card */}
        <div className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <h2 className="text-base font-bold text-stone-900">
              {breakdownLabel}
            </h2>
            <div className="text-right">
              <span className="text-xl font-mono font-bold text-stone-900">
                {data.analysis.differenceCm} cm
              </span>
              <span className="text-xs text-stone-500 ml-2 font-mono">
                ({data.analysis.differenceInches} in)
              </span>
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed">
            {differenceDescription}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {data.entities.map((ent) => {
              const feet = Math.floor(ent.heightCm / 2.54 / 12);
              const inches = Math.round((ent.heightCm / 2.54) % 12);
              return (
                <div
                  key={ent.id}
                  className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-stone-900 block">
                      {ent.name}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {ent.description || `${ent.type.toUpperCase()}`}
                    </span>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-sm font-semibold text-blue-700">
                      {feet}&apos;{inches}&quot;
                    </div>
                    <div className="text-xs text-stone-500">
                      {Math.round(ent.heightCm)} cm
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Observations / Perspective Insights */}
        <div className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-stone-900">
            {observationsLabel}
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-700 pl-4 list-disc">
            {keyInsights.map((insight, idx) => (
              <li key={idx} className="leading-relaxed">
                {insight}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        {faqs && faqs.length > 0 && (
          <div className="bg-white border border-stone-200/90 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900">
              {t.faqTitle}
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 space-y-1.5"
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-stone-900">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Comparisons Link Cluster */}
        <div className="pt-4">
          <h3 className="text-xs font-semibold text-stone-500 mb-3 uppercase tracking-wider">
            {exploreMoreLabel}
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.relatedSlugs.map((relSlug) => {
              const relCategory =
                relSlug.includes("vs") && !relSlug.includes("person") && !relSlug.includes("hoop")
                  ? "celebrities"
                  : relSlug.includes("height-difference")
                  ? "couples"
                  : "objects";
              return (
                <Link
                  key={relSlug}
                  href={getLocalePath(`/${relCategory}/${relSlug}`)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-stone-300 hover:text-stone-900 text-stone-700 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <span>{relSlug.replace(/-/g, " ")}</span>
                  <ArrowRight className="w-3 h-3 text-stone-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
