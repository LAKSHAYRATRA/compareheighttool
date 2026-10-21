import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { GUIDES_DATA } from "@/data/guides";
import { getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { Clock, ArrowRight } from "lucide-react";
import { CollectionPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Height Research, Percentiles & Biomechanics Guides",
  description: "Evidence-based guides exploring global human height percentiles, optical perspective distortion in photography, and ergonomic standards.",
  keywords: [
    "height guides",
    "height percentiles",
    "growth plates facts",
    "how to increase height naturally",
    "height myths",
    "stadiometer measurement",
  ],
  alternates: {
    canonical: getCanonicalUrl("/guides"),
    languages: getAlternateLanguages("/guides"),
  },
};

export default function GuidesIndexPage() {
  const canonicalUrl = getCanonicalUrl("/guides");
  const guideItems = GUIDES_DATA.map((article) => ({
    name: article.title,
    url: getCanonicalUrl(`/guides/${article.slug}`),
    description: article.summary,
  }));

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <CollectionPageJsonLd
        url={canonicalUrl}
        name="Height Measurement & Perspective Guides - ScaleHeight"
        description="Evidence-based guides exploring global human height percentiles, optical perspective distortion in photography, and ergonomic standards."
        items={guideItems}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-3 text-center sm:text-left border-b border-stone-200/90 pb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Height Measurement &amp; Perspective Guides
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            In-depth analysis covering percentile statistics, the optical physics of height comparisons, and ergonomic architecture standards.
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
                <span>• {article.author}</span>
              </div>

              <h2 className="text-xl font-bold text-stone-900 hover:text-blue-600 transition-colors">
                <Link href={`/guides/${article.slug}`}>{article.title}</Link>
              </h2>

              <p className="text-sm text-stone-700 leading-relaxed">
                {article.summary}
              </p>

              <div className="pt-2">
                <Link
                  href={`/guides/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800 transition-colors"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
