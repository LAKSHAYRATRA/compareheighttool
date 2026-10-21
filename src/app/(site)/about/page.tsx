import React from "react";
import { Metadata } from "next";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { AlertTriangle } from "lucide-react";
import { AboutPageJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "About Us: Mission, Methodology & Editorial Standards",
  description: "Discover why we built ScaleHeight: a clean, browser-only visual height tool based on real anthropometric geometry and public datasets.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
    languages: getAlternateLanguages("/about"),
  },
};

export default function AboutPage() {
  const canonicalUrl = getCanonicalUrl("/about");

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <AboutPageJsonLd
        url={canonicalUrl}
        name={`About ${SITE_CONFIG.name}: Mission, Methodology & Editorial Standards`}
        description="Discover why we built ScaleHeight: a clean, browser-only visual height tool based on real anthropometric geometry and public datasets."
      />
      <OrganizationJsonLd />
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="space-y-3 border-b border-stone-200/90 pb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            About {SITE_CONFIG.name}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            A fast, private visual comparison tool designed to show true physical proportions without ads, lag, or guessing.
          </p>
        </header>

        {/* Why We Built This */}
        <section className="space-y-3 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900">Why We Built ScaleHeight</h2>
          <p>
            Most online height comparison tools feel like they have not been updated since 2008. They are slow, cluttered with intrusive pop-up ads, and force you to reload the whole page every time you change someone&apos;s height by an inch.
          </p>
          <p>
            We built {SITE_CONFIG.name} because we wanted something fast, clean, and honest. Whether you are curious about a height difference between partners, wondering how you would look standing next to a 6&apos;7&quot; athlete, or sizing a piece of furniture against a doorway, you should be able to see it in real time with zero hassle.
          </p>
        </section>

        {/* How We Calculate Scale */}
        <section className="space-y-3 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900">How the Math Works</h2>
          <p>
            There is no guesswork or visual distortion here. We map real physical dimensions directly to pixel coordinates:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-600 pl-4 list-disc">
            <li>
              <strong className="text-stone-900">Direct millimeter scaling:</strong> Every centimeter or inch corresponds to an exact vertical pixel scale on our canvas, ensuring proportions stay true whether comparing two people or an everyday object.
            </li>
            <li>
              <strong className="text-stone-900">Anthropometric silhouettes:</strong> Our human silhouettes follow standard biological proportions, reflecting realistic shoulder widths, head-to-body ratios, and eye levels rather than stretched generic icons.
            </li>
            <li>
              <strong className="text-stone-900">Standard reference items:</strong> Reference objects (like a standard 80-inch residential door frame or a 10-foot regulation basketball rim) match official building codes and athletic standards.
            </li>
          </ul>
        </section>

        {/* Where Our Data Comes From */}
        <section className="space-y-3 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900">Our Data Sources</h2>
          <p>
            For global population averages, percentile distributions, and growth stages, we rely exclusively on peer-reviewed, publicly available datasets:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-stone-600 pl-4 list-disc">
            <li><strong className="text-stone-900">World Health Organization (WHO):</strong> Child Growth Standards and Multicentre Growth Reference Study.</li>
            <li><strong className="text-stone-900">Centers for Disease Control and Prevention (CDC):</strong> National Health and Nutrition Examination Survey (NHANES) anthropometric datasets.</li>
            <li><strong className="text-stone-900">NCD Risk Factor Collaboration (NCD-RisC):</strong> Century-long global height secular trends published in <em>The Lancet</em>.</li>
          </ul>
          <p className="text-xs text-stone-500 pt-1">
            Celebrity heights are verified against confirmed medical records, agency drafts (such as the NBA combine), and red-carpet footage alongside known fixed standards.
          </p>
        </section>

        {/* Privacy by Design */}
        <section className="space-y-3 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900">Privacy by Design</h2>
          <p>
            ScaleHeight runs entirely inside your web browser. When you enter a custom name or height, that information never leaves your device. We do not require accounts, we do not set tracking cookies for biometric data, and we do not maintain a database of what you compare.
          </p>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5 text-xs text-amber-900 leading-relaxed">
          <div className="font-semibold text-amber-950 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            General Reference Notice
          </div>
          <p>
            All comparisons, percentiles, and guide articles on ScaleHeight are provided for educational and visual reference only. They do not constitute medical, pediatric, or clinical growth advice.
          </p>
        </div>
      </div>
    </div>
  );
}
