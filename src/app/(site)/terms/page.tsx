import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { FileText, AlertTriangle, ShieldCheck } from "lucide-react";
import { WebPageJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Terms of Service & Medical Disclaimer",
  description: "Terms of service, medical disclaimer, and acceptable usage policies for the ScaleHeight application.",
  alternates: {
    canonical: getCanonicalUrl("/terms"),
    languages: getAlternateLanguages("/terms"),
  },
};

export default function TermsPage() {
  const canonicalUrl = getCanonicalUrl("/terms");

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <WebPageJsonLd
        url={canonicalUrl}
        name="Terms of Service & Medical Disclaimer - ScaleHeight"
        description="Terms of service, medical disclaimer, and acceptable usage policies for the ScaleHeight application."
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3 border-b border-stone-200/90 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-blue-600" /> Legal Terms &amp; Medical Disclaimers
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: October 2026 • Please read carefully before using ScaleHeight
          </p>
        </header>

        {/* High-Priority Medical & Research Disclaimer Callout */}
        <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-3 text-amber-900 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-amber-800 font-bold uppercase tracking-wider text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Medical &amp; Scientific Research Disclaimer
          </div>
          <p>
            <strong className="text-amber-950">All content, tools, calculators, visual simulations, educational guides, and articles published on {SITE_CONFIG.name} ({SITE_CONFIG.domain}) are provided solely for general educational, historical research, and visual reference purposes.</strong>
          </p>
          <p>
            Nothing contained on this website is scientifically or medically proven to diagnose, treat, prevent, or increase adult human height. Human height is predominantly governed by polygenic genetics and biological epiphyseal growth plate status. No exercise program, stretching technique, diet, or supplement featured or referenced on this site can guarantee physical height increase.
          </p>
          <p className="font-semibold text-amber-950">
            You must always conduct your own independent research and consult a licensed physician, pediatrician, endocrinologist, or qualified healthcare provider before beginning any dietary changes, supplement regimens, physical exercise programs, or postural routines. ScaleHeight expressly disclaims any liability for reliance placed on any information or tool outputs.
          </p>
        </div>

        <section className="space-y-4 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-lg font-bold text-stone-900">1. Acceptance of Terms</h2>
          <p>
            By accessing, browsing, or utilizing {SITE_CONFIG.name} ({SITE_CONFIG.domain}), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service. If you do not agree to these terms or the Medical Disclaimer above, you must immediately discontinue use of this site.
          </p>

          <h2 className="text-lg font-bold text-stone-900 pt-2">2. Description of Service &amp; Visual Approximations</h2>
          <p>
            {SITE_CONFIG.name} provides interactive, client-side visual approximations of heights, silhouette proportions, and physical scale comparisons. The figures, charts, and calculations provided are mathematical models intended solely for visual comparison. They should not be relied upon for clinical diagnostic, architectural life-safety, or contractual engineering applications.
          </p>

          <h2 className="text-lg font-bold text-stone-900 pt-2">3. Research-Based Informational Content (Not Medical Advice)</h2>
          <p>
            Our guides covering growth plates, human height percentiles, and ergonomics synthesize publicly available research from organizations such as the World Health Organization (WHO), the Centers for Disease Control and Prevention (CDC), and academic peer-reviewed anthropometric literature.
          </p>
          <p>
            This editorial synthesis does not constitute individualized medical, nutritional, or orthopedic advice. Users are strictly advised to consult qualified healthcare professionals regarding any medical conditions, growth concerns in children, or developmental inquiries.
          </p>

          <h2 className="text-lg font-bold text-stone-900 pt-2">4. 100% Client-Side Processing &amp; User Privacy</h2>
          <p>
            ScaleHeight executes all vector computations and graphics rendering locally inside your web browser sandbox. We do not transmit or store your custom comparison entries or biometric numbers on any remote server.
          </p>

          <h2 className="text-lg font-bold text-stone-900 pt-2">5. Intellectual Property &amp; Image Export License</h2>
          <p>
            All custom vector graphics, silhouette models, application UI design, and written editorial content on {SITE_CONFIG.domain} are the proprietary intellectual property of {SITE_CONFIG.name}. You are granted a non-exclusive, revocable license to generate and export PNG comparison images for personal, educational, and fair-use social media commentary, provided that ScaleHeight branding and attribution watermarks remain intact.
          </p>

          <h2 className="text-lg font-bold text-stone-900 pt-2">6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, {SITE_CONFIG.name}, its creators, and operators shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of, or inability to use, this application or reliance upon any research content published herein.
          </p>
        </section>
      </div>
    </div>
  );
}
