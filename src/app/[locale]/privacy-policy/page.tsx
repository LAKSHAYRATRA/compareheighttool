import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";
import { ShieldCheck, EyeOff } from "lucide-react";
import { WebPageJsonLd } from "@/components/JsonLd";

interface LocalizedPrivacyProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SITE_CONFIG.locales
    .filter((loc) => loc !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedPrivacyProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  return {
    title: `${t.privacy} | ${SITE_CONFIG.name}`,
    description: t.subtitle,
    alternates: {
      canonical: getCanonicalUrl("/privacy-policy", loc),
      languages: getAlternateLanguages("/privacy-policy"),
    },
    openGraph: {
      title: `${t.privacy} | ${SITE_CONFIG.name}`,
      description: t.subtitle,
      url: getCanonicalUrl("/privacy-policy", loc),
    },
  };
}

export default async function LocalizedPrivacyPolicyPage({ params }: LocalizedPrivacyProps) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <WebPageJsonLd
        url={getCanonicalUrl("/privacy-policy", loc)}
        name={`${t.privacy} - ${SITE_CONFIG.name}`}
        description={t.subtitle}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3 border-b border-stone-200/90 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t.features.feature1Title}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.privacy} - {SITE_CONFIG.name}
          </h1>
          <p className="text-xs text-stone-500">
            {t.subtitle}
          </p>
        </header>

        <section className="space-y-4 text-sm text-stone-700 leading-relaxed">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
            <h2 className="font-semibold text-emerald-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-600" />
              {t.features.feature1Title}
            </h2>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {t.features.feature1Desc}
            </p>
          </div>

          <h2 className="text-lg font-bold text-stone-900 pt-2">100% Client-Side Architecture</h2>
          <p>
            {SITE_CONFIG.name} operates completely within the client sandbox. All rendering, SVG math calculations, and graphic exports are performed on your local computer or phone.
          </p>
        </section>
      </div>
    </div>
  );
}
