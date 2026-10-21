import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";
import { ContactForm } from "@/components/ContactForm";
import { ContactPageJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

interface LocalizedContactProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SITE_CONFIG.locales
    .filter((loc) => loc !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedContactProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  return {
    title: `${t.contact} | ${SITE_CONFIG.name}`,
    description: t.subtitle,
    alternates: {
      canonical: getCanonicalUrl("/contact", loc),
      languages: getAlternateLanguages("/contact"),
    },
    openGraph: {
      title: `${t.contact} | ${SITE_CONFIG.name}`,
      description: t.subtitle,
      url: getCanonicalUrl("/contact", loc),
    },
  };
}

export default async function LocalizedContactPage({ params }: LocalizedContactProps) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <ContactPageJsonLd
        url={getCanonicalUrl("/contact", loc)}
        name={`${t.contact} - ${SITE_CONFIG.name}`}
        description={t.subtitle}
      />
      <OrganizationJsonLd />
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-3 border-b border-stone-200/90 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {t.contact} - {SITE_CONFIG.name}
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            {t.subtitle}
          </p>
          <p className="text-xs text-stone-500">
            Email: <a href="mailto:hello@compareheighttool.com" className="text-blue-700 hover:underline">hello@compareheighttool.com</a>
          </p>
        </header>

        <ContactForm currentLocale={loc} />
      </div>
    </div>
  );
}
