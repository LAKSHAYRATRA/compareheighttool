import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES_DATA } from "@/data/guides";
import { FaqJsonLd, BreadcrumbJsonLd, ArticleJsonLd } from "@/components/JsonLd";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { Clock, ArrowLeft, AlertTriangle } from "lucide-react";

interface LocalizedGuidePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const nonEnglishLocales = SITE_CONFIG.locales.filter((loc) => loc !== "en");
  const paths: { locale: string; slug: string }[] = [];

  for (const locale of nonEnglishLocales) {
    for (const guide of GUIDES_DATA) {
      paths.push({ locale, slug: guide.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: LocalizedGuidePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const article = GUIDES_DATA.find((g) => g.slug === slug);
  if (!article) return {};

  const localizedData = article.translations?.[loc];
  const title = localizedData?.title || article.title;
  const description = localizedData?.metaDescription || article.metaDescription;
  const cleanPath = `/guides/${slug}`;

  const localizedGuideKeyword =
    loc === "es"
      ? "guía de estatura humana"
      : loc === "de"
      ? "ratgeber körpergröße"
      : loc === "fr"
      ? "guide taille humaine"
      : loc === "pt"
      ? "guia altura humana"
      : "身長 ガイド";

  return {
    title,
    description,
    keywords: [
      title,
      localizedGuideKeyword,
      "growth plates",
      "scale height research",
    ],
    alternates: {
      canonical: getCanonicalUrl(cleanPath, loc),
      languages: getAlternateLanguages(cleanPath),
    },
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(cleanPath, loc),
      type: "article",
    },
  };
}

export default async function LocalizedGuideSinglePage({ params }: LocalizedGuidePageProps) {
  const { locale, slug } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const article = GUIDES_DATA.find((g) => g.slug === slug);
  if (!article) notFound();

  const localizedData = article.translations?.[loc];
  const title = localizedData?.title || article.title;
  const metaDescription = localizedData?.metaDescription || article.metaDescription;
  const summary = localizedData?.summary || article.summary;
  const readTime = localizedData?.readTime || article.readTime;
  const sections = localizedData?.sections || article.sections;
  const faqs = localizedData?.faqs || article.faqs;
  const medicalDisclaimer = localizedData?.medicalDisclaimer || article.medicalDisclaimer;

  const canonicalPath = `/guides/${slug}`;

  const uiText: Record<string, { home: string; guides: string; back: string; disclaimer: string }> = {
    es: { home: "Inicio", guides: "Guías", back: "Volver a Guías", disclaimer: "Aviso Médico y de Investigación" },
    de: { home: "Startseite", guides: "Ratgeber", back: "Zurück zu den Ratgebern", disclaimer: "Medizinischer & Forschungshinweis" },
    fr: { home: "Accueil", guides: "Guides", back: "Retour aux Guides", disclaimer: "Avertissement Médical et Scientifique" },
    pt: { home: "Início", guides: "Guias", back: "Volver para os Guias", disclaimer: "Aviso Médico e de Pesquisa" },
    ja: { home: "ホーム", guides: "ガイド", back: "ガイド一覧に戻る", disclaimer: "医療および研究に関する免責事項" },
  };

  const labels = uiText[loc] || uiText.es;

  const breadcrumbs = [
    { name: labels.home, url: getCanonicalUrl("/", loc) },
    { name: labels.guides, url: `${SITE_CONFIG.canonicalBase}/${loc}/guides` },
    { name: title, url: getCanonicalUrl(canonicalPath, loc) },
  ];

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <ArticleJsonLd
        title={title}
        description={metaDescription}
        url={getCanonicalUrl(canonicalPath, loc)}
        publishedAt={article.publishedAt}
        author={article.author}
      />
      <FaqJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Back Link */}
        <Link
          href={`/${loc}/guides`}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {labels.back}
        </Link>

        {/* Header */}
        <header className="space-y-4 border-b border-stone-200/90 pb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {readTime}
            </span>
          </div>

          <div className="p-4 bg-stone-100/70 border border-stone-200/80 rounded-xl text-stone-700 text-sm italic">
            {summary}
          </div>

          {medicalDisclaimer && (
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5 text-xs text-amber-900 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 text-amber-800 uppercase tracking-wider text-[11px]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                {labels.disclaimer}
              </div>
              <p>{medicalDisclaimer}</p>
            </div>
          )}
        </header>

        {/* Body Sections */}
        <div className="space-y-8 text-sm sm:text-base text-stone-700 leading-relaxed">
          {sections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {sec.heading}
              </h2>
              {sec.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {/* Article FAQs */}
        {faqs && faqs.length > 0 && (
          <section className="pt-8 border-t border-stone-200/90 space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200/90 rounded-xl p-4 space-y-1.5 shadow-xs"
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
          </section>
        )}
      </div>
    </article>
  );
}
