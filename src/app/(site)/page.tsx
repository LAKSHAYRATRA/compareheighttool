import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { HeightCanvas } from "@/components/HeightCanvas";
import { WebAppJsonLd, FaqJsonLd, OrganizationJsonLd, WebSiteJsonLd } from "@/components/JsonLd";
import { COMPARISONS_DATA } from "@/data/comparisons";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Height Comparison Tool - Visual Scale Chart",
  description: "Compare heights of people, celebrities, couples, and everyday objects side by side. Accurate silhouette proportions with instant Metric (cm) and Imperial (ft/in) calculation.",
  keywords: [
    "height comparison",
    "height comparison tool",
    "height comparison chart",
    "celebrity height comparison",
    "visual height comparison",
    "compare heights online",
    "height difference calculator",
    "height visualizer",
    "scale height",
    "couple height comparison",
    "human height simulator",
  ],
  alternates: {
    canonical: getCanonicalUrl("/"),
    languages: getAlternateLanguages("/"),
  },
  openGraph: {
    title: "Height Comparison Tool - Free Online Visual Scale Chart",
    description: "Compare heights of people, celebrities, couples, and everyday objects side by side with millimeter precision.",
    url: SITE_CONFIG.canonicalBase,
    siteName: SITE_CONFIG.name,
  },
};

export default function Home() {
  const homeFaqs = [
    {
      question: "How accurate is this visual height comparison tool?",
      answer: "Our visualizer uses true millimeter-to-pixel SVG aspect ratios, ensuring that whether you compare a 5'2\" person to a 6'0\" partner, or a 7'1\" basketball player to a standard door frame, proportions match true physical geometry.",
    },
    {
      question: "Does this tool upload or store my height data or photos?",
      answer: "No. CompareHeightTool operates 100% on the client side in your web browser. No measurements, custom names, or comparisons are ever uploaded to a server or recorded in any database.",
    },
    {
      question: "How do I switch between Centimeters and Feet/Inches?",
      answer: "Simply click the 'Feet & Inches' or 'Metric (cm)' buttons at the top left of the visualizer workspace. All measurements and differences will update dynamically in real time.",
    },
    {
      question: "Can I export or save my height comparison chart?",
      answer: "Yes! Click the 'Export PNG' button in the toolbar to immediately generate a high-resolution, watermark-credited comparison graphic ready for social media, messaging, or presentations.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 flex flex-col">
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      <WebAppJsonLd
        name={SITE_CONFIG.name}
        description={SITE_CONFIG.description}
        url={SITE_CONFIG.canonicalBase}
      />
      <FaqJsonLd faqs={homeFaqs} />

      {/* Hero Header Section */}
      <section className="pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 max-w-3xl mx-auto leading-tight">
          Visual Height Comparison Tool
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Compare heights of people, celebrities, couples, and everyday objects side by side. Accurate silhouette proportions with instant Metric and Imperial conversion.
        </p>
      </section>

      {/* Main Interactive Workspace (Above the Fold) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pb-12">
        <HeightCanvas />
      </section>

      {/* Programmatic Comparison Hubs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-8 border-t border-stone-200/90">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Popular Pre-Configured Comparisons
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Explore instant side-by-side scale charts for famous figures, relationship gaps, and everyday items.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISONS_DATA.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.category === "celebrity" ? "celebrities" : item.category === "couples" ? "couples" : "objects"}/${item.slug}`}
              className="group p-5 bg-white hover:bg-stone-50/50 border border-stone-200 hover:border-stone-300 rounded-xl transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-stone-900 font-semibold">
                    Δ {item.analysis.differenceCm} cm ({item.analysis.differenceInches}&quot;)
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                  {item.metaDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-blue-700 font-medium">
                <span>View Full Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature & Privacy Highlights */}
      <section className="bg-white border-y border-stone-200/90 py-12 px-4 sm:px-6 lg:px-8 mt-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-stone-900">Private &amp; Browser-Only</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Calculations and graphic generation happen directly on your device. We do not store your custom measurements, names, or comparisons on any server.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-stone-900">Geometric Silhouette Scale</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Silhouettes are mapped strictly to physical millimeters, avoiding the wide-angle camera distortion common in celebrity red carpet photos.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-stone-900">Instant Metric &amp; Imperial</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Toggle between centimeters and feet &amp; inches at any time without rounding errors or needing to re-enter your figures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational & Editorial Content */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 space-y-8 text-stone-700 text-sm leading-relaxed">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-stone-900">
            Understanding Height Differences in Everyday Life
          </h2>
          <p>
            Height is one of the first physical characteristics people notice, but judging it from photographs is notoriously misleading. Camera lenses, footwear, posture, and head-to-shoulder proportions all distort perceived scale. CompareHeightTool removes those variables by placing silhouettes on a flat, neutral ground plane with consistent head-to-body ratios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl border border-stone-200/90 shadow-xs">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-900">
              Average Male Stature by Country
            </h3>
            <ul className="space-y-1 text-xs text-stone-600">
              <li>Netherlands: 183.8 cm (6&apos;0.4&quot;)</li>
              <li>Germany: 181.0 cm (5&apos;11.2&quot;)</li>
              <li>United Kingdom: 177.5 cm (5&apos;9.9&quot;)</li>
              <li>United States: 175.3 cm (5&apos;9.0&quot;)</li>
              <li>Japan: 172.0 cm (5&apos;7.7&quot;)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-stone-900">
              Average Female Stature by Country
            </h3>
            <ul className="space-y-1 text-xs text-stone-600">
              <li>Netherlands: 170.4 cm (5&apos;7.1&quot;)</li>
              <li>Germany: 166.0 cm (5&apos;5.3&quot;)</li>
              <li>United Kingdom: 164.4 cm (5&apos;4.7&quot;)</li>
              <li>United States: 161.8 cm (5&apos;3.7&quot;)</li>
              <li>Japan: 158.0 cm (5&apos;2.2&quot;)</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-stone-900">
            Eye Lines and Visual Scale
          </h3>
          <p>
            When two people talk face-to-face, perceived height depends far more on pupil position than the very top of the head. In adults, the human eye line sits approximately 10 to 12 centimeters (4 to 4.7 inches) below the crown of the skull.
          </p>
          <p className="text-stone-600 text-xs leading-relaxed">
            A small difference of 2 to 3 inches is easily masked in daily life by boots, sneakers, or a slight slouch. At a 6 to 7 inch difference, one person&apos;s gaze lands directly at the other person&apos;s chin or mouth, allowing natural eye contact without tilting the head. Once a height gap reaches 10 inches or more, the shorter person&apos;s eye level falls below shoulder height, creating an unmistakable contrast in standing posture.
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full py-12 border-t border-stone-200/90">
        <div className="space-y-1.5 mb-8">
          <h2 className="text-2xl font-bold text-stone-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-stone-500">
            Common questions about scale measurements, silhouettes, and accuracy.
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-stone-200/90 rounded-xl p-5 space-y-1.5 shadow-xs"
            >
              <h3 className="text-sm font-semibold text-stone-900">{faq.question}</h3>
              <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

