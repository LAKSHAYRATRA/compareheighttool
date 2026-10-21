import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES_DATA } from "@/data/guides";
import { FaqJsonLd, BreadcrumbJsonLd, ArticleJsonLd } from "@/components/JsonLd";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { Clock, ArrowLeft, AlertTriangle } from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES_DATA.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = GUIDES_DATA.find((g) => g.slug === slug);
  if (!article) return {};

  const path = `/guides/${slug}`;

  return {
    title: article.title,
    description: article.metaDescription,
    keywords: [
      article.title,
      "human height guide",
      "growth and biology",
      "height facts",
      "scale height research",
    ],
    alternates: {
      canonical: getCanonicalUrl(path),
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      url: getCanonicalUrl(path),
      type: "article",
    },
  };
}

export default async function GuideSinglePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const article = GUIDES_DATA.find((g) => g.slug === slug);
  if (!article) notFound();

  const canonicalPath = `/guides/${slug}`;
  const breadcrumbs = [
    { name: "Home", url: SITE_CONFIG.canonicalBase },
    { name: "Guides", url: `${SITE_CONFIG.canonicalBase}/guides` },
    { name: article.title, url: getCanonicalUrl(canonicalPath) },
  ];

  return (
    <article className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <ArticleJsonLd
        title={article.title}
        description={article.metaDescription}
        url={getCanonicalUrl(canonicalPath)}
        publishedAt={article.publishedAt}
        author={article.author}
      />
      <FaqJsonLd faqs={article.faqs} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-blue-700 font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Research Guides
        </Link>

        {/* Title Header */}
        <header className="space-y-4 border-b border-stone-200/90 pb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {article.readTime}
            </span>
            <span>• By {article.author}</span>
          </div>

          <div className="p-4 bg-stone-100/70 border border-stone-200/80 rounded-xl text-stone-700 text-sm italic">
            {article.summary}
          </div>

          {article.medicalDisclaimer && (
            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5 text-xs text-amber-900 leading-relaxed">
              <div className="font-bold flex items-center gap-1.5 text-amber-800 uppercase tracking-wider text-[11px]">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Medical &amp; Research Disclaimer
              </div>
              <p>{article.medicalDisclaimer}</p>
            </div>
          )}
        </header>

        {/* Article Content Sections */}
        <div className="space-y-8 text-sm sm:text-base text-stone-700 leading-relaxed">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {section.heading}
              </h2>
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </section>
          ))}
        </div>

        {/* Article FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="pt-8 border-t border-stone-200/90 space-y-4">
            <h3 className="text-xl font-bold text-stone-900">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {article.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-stone-200/90 rounded-xl space-y-1.5 shadow-xs"
                >
                  <h4 className="text-sm font-semibold text-stone-900">
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

        {/* Bottom CTA to Tool */}
        <div className="p-6 bg-white border border-stone-200/90 rounded-xl text-center space-y-3 shadow-xs">
          <h3 className="text-lg font-bold text-stone-900">
            Compare Heights Side by Side
          </h3>
          <p className="text-xs text-stone-600 max-w-lg mx-auto">
            Place people, celebrities, and reference items side by side in real time directly in your browser.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            Open Height Visualizer
          </Link>
        </div>
      </div>
    </article>
  );
}
