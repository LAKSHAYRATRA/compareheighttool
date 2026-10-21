import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { ContactPageJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us: Feedback, Data Corrections & Suggestions",
  description: "Get in touch with the ScaleHeight team. Suggest new celebrities or objects, report measurement corrections, or send feedback.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
    languages: getAlternateLanguages("/contact"),
  },
  openGraph: {
    title: "Contact Us | ScaleHeight",
    description: "Get in touch with the ScaleHeight team. We read and respond to every inquiry.",
    url: getCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  const canonicalUrl = getCanonicalUrl("/contact");

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <ContactPageJsonLd
        url={canonicalUrl}
        name={`Contact Us - ${SITE_CONFIG.name}`}
        description={`Get in touch with the ${SITE_CONFIG.name} team. Suggest new celebrities or objects, report measurement corrections, or send feedback.`}
      />
      <OrganizationJsonLd />

      <div className="max-w-2xl mx-auto space-y-8">
        <header className="space-y-3 border-b border-stone-200/90 pb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 tracking-tight">
            Contact Us
          </h1>
          <p className="text-sm text-stone-600 max-w-md mx-auto">
            Got an idea for a reference object, spotted an inaccurate measurement, or want to report a bug? We read every message.
          </p>
          <p className="text-xs text-stone-500">
            Direct email: <a href="mailto:hello@compareheighttool.com" className="text-blue-700 hover:underline">hello@compareheighttool.com</a>
          </p>
        </header>

        <ContactForm currentLocale="en" />
      </div>
    </div>
  );
}

