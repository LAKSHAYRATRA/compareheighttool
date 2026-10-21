import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";
import { FileText, AlertTriangle } from "lucide-react";
import { WebPageJsonLd } from "@/components/JsonLd";

interface LocalizedTermsProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SITE_CONFIG.locales
    .filter((loc) => loc !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedTermsProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  return {
    title: `${t.terms} | ${SITE_CONFIG.name}`,
    description: t.subtitle,
    alternates: {
      canonical: getCanonicalUrl("/terms", loc),
      languages: getAlternateLanguages("/terms"),
    },
    openGraph: {
      title: `${t.terms} | ${SITE_CONFIG.name}`,
      description: t.subtitle,
      url: getCanonicalUrl("/terms", loc),
    },
  };
}

const DISCLAIMER_COPY: Record<Locale, { title: string; body1: string; body2: string; body3: string }> = {
  en: {
    title: "Medical & Scientific Research Disclaimer",
    body1: "All content, tools, calculators, visual simulations, educational guides, and articles published on ScaleHeight are provided solely for general educational, historical research, and visual reference purposes.",
    body2: "Nothing on this website is scientifically or medically proven to diagnose, treat, prevent, or increase adult human height. Human height is predominantly governed by polygenic genetics and epiphyseal growth plate closure.",
    body3: "Always conduct your own independent research and consult a licensed medical doctor, pediatrician, or endocrinologist before starting any diet, supplement, stretching routine, or health program.",
  },
  de: {
    title: "Medizinischer & Wissenschaftlicher Forschungshinweis",
    body1: "Sämtliche Inhalte, Werkzeuge, Rechner, visuellen Simulationen und Ratgeberartikel auf ScaleHeight dienen ausschließlich allgemeinen Bildungs-, Forschungs- und visuellen Vergleichszwecken.",
    body2: "Nichts auf dieser Website ist medizinisch oder klinisch erprobt, um die Körpergröße von Erwachsenen zu verändern oder Diagnosen zu stellen. Die Körpergröße unterliegt im Wesentlichen genetischen Faktoren und dem biologischen Verschluss der Wachstumsfugen.",
    body3: "Führen Sie stets eigene Recherchen durch und konsultieren Sie einen approbierten Arzt oder Facharzt, bevor Sie Ernährungsumstellungen, Nahrungsergänzungsmittel oder Trainingsprogramme beginnen.",
  },
  es: {
    title: "Aviso de Investigación Médica y Científica",
    body1: "Todo el contenido, herramientas, calculadoras y guías publicadas en ScaleHeight se ofrecen exclusivamente con fines educativos, de investigación y referencia visual.",
    body2: "Nada en este sitio web está médica ni científicamente probado para diagnosticar o modificar la estatura adulta. La altura está determinada por la genética y el cierre de las placas de crecimiento.",
    body3: "Realice siempre su propia investigación y consulte a un médico certificado antes de iniciar cualquier dieta, suplemento o rutina de ejercicios físicos.",
  },
  pt: {
    title: "Aviso Médico e Científico",
    body1: "Todo o conteúdo, ferramentas e guias informativos do ScaleHeight são disponibilizados unicamente para fins educativos e de referência visual.",
    body2: "Nenhuma informação deste site é comprovada clinicamente para aumentar a estatura adulta ou tratar condições médicas. A altura é regulada geneticamente pelo fechamento das cartilagens de crescimento.",
    body3: "Pesquise por conta própria e consulte sempre um médico ou endocrinologista antes de adotar qualquer rotina física, suplementação ou plano nutricional.",
  },
  fr: {
    title: "Avertissement Médical et Scientifique",
    body1: "L'ensemble des contenus, simulateurs et articles publiés sur ScaleHeight sont fournis à titre strictement informatif et éducatif.",
    body2: "Aucune information de ce site n'est médicalement prouvée pour augmenter la taille d'un adulte. La taille dépend principalement de facteurs génétiques et de la calcification des cartilages de conjugaison.",
    body3: "Consultez systématiquement un médecin qualifié avant de commencer tout programme sportif, complément alimentaire ou changement de mode de vie.",
  },
  ja: {
    title: "医学・科学研究に関する重要免責事項",
    body1: "ScaleHeight上に掲載されているすべてのシミュレーター、計算ツール、記事およびビジュアルコンテンツは、一般的な教育、学術研究、および視覚的参照のみを目的として提供されています。",
    body2: "当サイトの内容は成人の身長を伸ばす、あるいは病気の診断や治療を行うことを医学的・臨床的に証明したものではありません。身長は遺伝および骨端線の閉鎖状況によって主に決定されます。",
    body3: "いかなる運動、食事療法、サプリメントの摂取を開始する前にも、ご自身で十分な調査を行い、必ず医師や専門家にご相談ください。",
  },
};

export default async function LocalizedTermsPage({ params }: LocalizedTermsProps) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];
  const disclaimer = DISCLAIMER_COPY[loc] || DISCLAIMER_COPY.en;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <WebPageJsonLd
        url={getCanonicalUrl("/terms", loc)}
        name={`${t.terms} - ${SITE_CONFIG.name}`}
        description={t.subtitle}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3 border-b border-stone-200/90 pb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-blue-600" /> {t.terms}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.terms} - {SITE_CONFIG.name}
          </h1>
          <p className="text-xs text-stone-500">
            {t.subtitle}
          </p>
        </header>

        {/* Localized Medical Disclaimer Box */}
        <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-3 text-amber-900 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-amber-800 font-bold uppercase tracking-wider text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            {disclaimer.title}
          </div>
          <p>
            <strong className="text-amber-950">{disclaimer.body1}</strong>
          </p>
          <p>{disclaimer.body2}</p>
          <p className="font-semibold text-amber-950">{disclaimer.body3}</p>
        </div>

        <section className="space-y-4 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-lg font-bold text-stone-900">1. Service Usage &amp; Acceptance</h2>
          <p>
            By using {SITE_CONFIG.name}, you agree to use our client-side utility responsibly. All silhouettes and visual comparison outputs are provided free of charge.
          </p>
          <h2 className="text-lg font-bold text-stone-900 pt-2">2. Accuracy &amp; Proportions</h2>
          <p>
            Our silhouettes use millimeter-to-pixel geometric scaling designed for visual reference, education, and entertainment. They do not constitute medical or architectural engineering certifications.
          </p>
          <h2 className="text-lg font-bold text-stone-900 pt-2">3. Zero-Server Privacy Guarantee</h2>
          <p>
            {t.features.feature1Title}: {t.features.feature1Desc}
          </p>
        </section>
      </div>
    </div>
  );
}
