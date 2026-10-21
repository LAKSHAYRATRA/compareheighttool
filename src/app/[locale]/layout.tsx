import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Locale, SITE_CONFIG } from "@/config/site";
import { notFound } from "next/navigation";

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const currentLocale = locale as Locale;

  return (
    <div className="min-h-full flex flex-col bg-[#faf9f6] text-stone-900">
      <Navbar currentLocale={currentLocale} />
      <main className="flex-1">{children}</main>
      <Footer currentLocale={currentLocale} />
    </div>
  );
}
