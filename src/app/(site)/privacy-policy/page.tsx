import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";
import { WebPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy (GDPR, CCPA & Cookies)",
  description: "ScaleHeight privacy policy. 100% client-side data guarantee, advertising disclosures, and cookie policies.",
  alternates: {
    canonical: getCanonicalUrl("/privacy-policy"),
    languages: getAlternateLanguages("/privacy-policy"),
  },
};

export default function PrivacyPolicyPage() {
  const canonicalUrl = getCanonicalUrl("/privacy-policy");

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <WebPageJsonLd
        url={canonicalUrl}
        name="Privacy Policy - ScaleHeight"
        description="ScaleHeight privacy policy. 100% client-side data guarantee, advertising disclosures, and cookie policies."
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3 border-b border-stone-200/90 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Privacy &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 • Effective immediately
          </p>
        </header>

        <section className="space-y-4 text-sm text-stone-700 leading-relaxed">
          <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
            <h2 className="font-semibold text-emerald-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-emerald-600" />
              The Client-Side Guarantee
            </h2>
            <p className="text-xs text-emerald-800 leading-relaxed">
              ScaleHeight does not collect, transmit, or store any personal height data, silhouette names, or comparison configurations on our servers. All interactive visual computations, canvas manipulations, and image exports execute strictly within your local browser runtime.
            </p>
          </div>

          <h2 className="text-lg font-bold text-stone-900 pt-2">1. Information We Collect Automatically</h2>
          <p>
            When you visit {SITE_CONFIG.name}, standard server access logs may temporarily record anonymous technical telemetry such as your IP address, browser user-agent, operating system, and referral headers. This information is utilized solely to defend against denial-of-service attacks and ensure operational stability.
          </p>

          <h2 className="text-lg font-bold text-stone-900 pt-2">2. Google AdSense &amp; Advertising Cookies</h2>
          <p>
            We may partner with third-party advertising vendors, including Google AdSense, to display non-intrusive advertisements when you visit our website.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-600">
            <li>Google, as a third-party vendor, uses cookies to serve ads on {SITE_CONFIG.domain}.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Google Ads Settings</a>.</li>
          </ul>

          <h2 className="text-lg font-bold text-stone-900 pt-2">3. GDPR &amp; CCPA Compliance</h2>
          <p>
            Under European (GDPR) and California (CCPA) privacy frameworks, visitors retain fundamental rights regarding the access, rectification, or deletion of their personal information. Because our application does not ingest or store personally identifiable data (PII) during your usage of the tool, there is no personal profiling record stored in our systems.
          </p>

          <h2 className="text-lg font-bold text-stone-900 pt-2">4. Contact Regarding Privacy Inquiries</h2>
          <p>
            If you have questions or concerns regarding our privacy practices or wish to exercise statutory data rights, please contact our privacy compliance officer via our <a href="/contact" className="text-blue-700 underline">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
