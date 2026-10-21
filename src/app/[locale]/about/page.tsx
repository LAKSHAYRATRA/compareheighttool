import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG, Locale, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";
import { AlertTriangle } from "lucide-react";
import { AboutPageJsonLd, OrganizationJsonLd } from "@/components/JsonLd";

interface LocalizedAboutProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SITE_CONFIG.locales
    .filter((loc) => loc !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedAboutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    return {};
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];

  return {
    title: `${t.about} | ${SITE_CONFIG.name}`,
    description: t.subtitle,
    alternates: {
      canonical: getCanonicalUrl("/about", loc),
      languages: getAlternateLanguages("/about"),
    },
    openGraph: {
      title: `${t.about} | ${SITE_CONFIG.name}`,
      description: t.subtitle,
      url: getCanonicalUrl("/about", loc),
    },
  };
}

const ABOUT_LOCALIZED_SECTIONS: Record<
  Locale,
  {
    sourcesHeading: string;
    sourcesIntro: string;
    whoTitle: string;
    cdcTitle: string;
    ncdTitle: string;
    teamHeading: string;
    teamBody: string;
    disclaimerHeading: string;
    disclaimerBody: string;
  }
> = {
  en: {
    sourcesHeading: "Authoritative Demographic Data Sources",
    sourcesIntro: "Our statistical benchmarks and percentile tables are drawn from peer-reviewed public anthropometric datasets:",
    whoTitle: "World Health Organization (WHO): Multicentre Growth Reference Study standards.",
    cdcTitle: "Centers for Disease Control and Prevention (CDC): National Health and Nutrition Examination Survey (NHANES).",
    ncdTitle: "NCD Risk Factor Collaboration (NCD-RisC): Worldwide secular height trends published in The Lancet.",
    teamHeading: "Engineering & Editorial Team",
    teamBody: "ScaleHeight is maintained by developers and data analysts committed to privacy-first, zero-compute web utilities.",
    disclaimerHeading: "Important Research Notice",
    disclaimerBody: "All content is provided for educational and visual comparison purposes only. Consult medical specialists for health assessments.",
  },
  de: {
    sourcesHeading: "Wissenschaftliche Datenquellen & Methodik",
    sourcesIntro: "Unsere statistischen Benchmarks und Perzentiltabellen basieren auf anerkannten anthropometrischen Forschungsdaten:",
    whoTitle: "Weltgesundheitsorganisation (WHO): Wachstums- und Entwicklungsstandards (MGRS).",
    cdcTitle: "Centers for Disease Control (CDC): NHANES-Erhebungen zu Durchschnittsgrößen.",
    ncdTitle: "NCD Risk Factor Collaboration: Globale Langzeitstudien zur Größenentwicklung in The Lancet.",
    teamHeading: "Entwickler- & Redaktionsteam",
    teamBody: "ScaleHeight wird von Ingenieuren und Datenanalysten betrieben, die sich für datenschutzfreundliche Webanwendungen ohne Server-Tracking einsetzen.",
    disclaimerHeading: "Wichtiger Forschungshinweis",
    disclaimerBody: "Alle Vergleiche und Analysen dienen ausschließlich Bildungs- und Unterhaltungszwecken und stellen keine medizinische Beratung dar.",
  },
  es: {
    sourcesHeading: "Fuentes de Datos Científicos y Metodología",
    sourcesIntro: "Nuestros percentiles y datos antropométricos provienen de fuentes públicas revisadas por expertos:",
    whoTitle: "Organización Mundial de la Salud (OMS): Patrones de crecimiento infantil MGRS.",
    cdcTitle: "Centros para el Control y Prevención de Enfermedades (CDC): Estudios NHANES.",
    ncdTitle: "NCD Risk Factor Collaboration: Análisis global de estatura publicado en The Lancet.",
    teamHeading: "Equipo de Desarrollo",
    teamBody: "ScaleHeight es mantenido por programadores y analistas comprometidos con la privacidad del usuario.",
    disclaimerHeading: "Aviso de Investigación",
    disclaimerBody: "Toda la información es para fines educativos y comparativos visuales. Consulte a médicos para valoraciones de salud.",
  },
  pt: {
    sourcesHeading: "Metodologia e Fontes Científicas",
    sourcesIntro: "Nossas tabelas estatísticas baseiam-se em levantamentos antropométricos internacionais:",
    whoTitle: "Organização Mundial da Saúde (OMS): Padrões de desenvolvimento MGRS.",
    cdcTitle: "Centros de Controle de Doenças (CDC): Dados biométricos oficiais do NHANES.",
    ncdTitle: "NCD-RisC: Levantamentos populacionais publicados na revista The Lancet.",
    teamHeading: "Nossa Equipe",
    teamBody: "Equipe especializada em ferramentas web de alta performance com privacidade garantida no navegador.",
    disclaimerHeading: "Nota de Pesquisa",
    disclaimerBody: "Os comparativos destinam-se exclusivamente a fins educativos e ilustrativos. Não substituem diagnósticos médicos.",
  },
  fr: {
    sourcesHeading: "Méthodologie et Sources de Données",
    sourcesIntro: "Nos repères statistiques s'appuient sur des données anthropométriques officielles :",
    whoTitle: "Organisation Mondiale de la Santé (OMS) : Normes de croissance MGRS.",
    cdcTitle: "Centers for Disease Control (CDC) : Enquêtes biométriques nationales NHANES.",
    ncdTitle: "NCD Risk Factor Collaboration : Évolution mondiale de la stature humaine dans The Lancet.",
    teamHeading: "Notre Équipe",
    teamBody: "Développeurs et passionnés de biomécanique engagés pour un web sans collecte de données personnelles.",
    disclaimerHeading: "Avis Éducatif",
    disclaimerBody: "Les outils et données sont fournis pour référence visuelle. Consultez un professionnel de santé pour tout diagnostic.",
  },
  ja: {
    sourcesHeading: "信頼性の高い統計データソースと算出根拠",
    sourcesIntro: "当ツールの統計データおよびパーセンタイル比較表は、公的機関の人体測定データに基づいています：",
    whoTitle: "世界保健機関 (WHO)：多国籍成長基準研究（MGRS）データ。",
    cdcTitle: "米国疾病予防管理センター (CDC)：国民健康栄養調査（NHANES）統計。",
    ncdTitle: "NCDリスク因子共同研究（NCD-RisC）：学術誌『ランセット』掲載の世界身長推移データ。",
    teamHeading: "開発・運営チーム",
    teamBody: "ScaleHeightは、ブラウザ完結型のプライバシー保護と高精度な幾何学シミュレーションを追求するエンジニアによって運営されています。",
    disclaimerHeading: "学術的調査に関する注意事項",
    disclaimerBody: "すべてのシミュレーターと数値は視覚的比較および教育目的のものです。健康や成長に関する相談は必ず専門医にご相談ください。",
  },
};

export default async function LocalizedAboutPage({ params }: LocalizedAboutProps) {
  const { locale } = await params;
  if (!SITE_CONFIG.locales.includes(locale as Locale) || locale === "en") {
    notFound();
  }
  const loc = locale as Locale;
  const t = TRANSLATIONS[loc];
  const info = ABOUT_LOCALIZED_SECTIONS[loc] || ABOUT_LOCALIZED_SECTIONS.en;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 py-12 px-4 sm:px-6 lg:px-8">
      <AboutPageJsonLd
        url={getCanonicalUrl("/about", loc)}
        name={`${t.about} - ${SITE_CONFIG.name}`}
        description={t.subtitle}
      />
      <OrganizationJsonLd />
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="space-y-3 border-b border-stone-200/90 pb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            {t.about} - {SITE_CONFIG.name}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.subtitle}
          </p>
        </header>

        {/* Core Principles */}
        <section className="space-y-4 text-sm text-stone-700 leading-relaxed">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-5 bg-white border border-stone-200/90 rounded-xl space-y-2 shadow-xs">
              <h3 className="font-semibold text-stone-900">
                {t.features.feature1Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.features.feature1Desc}
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200/90 rounded-xl space-y-2 shadow-xs">
              <h3 className="font-semibold text-stone-900">
                {t.features.feature2Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.features.feature2Desc}
              </p>
            </div>

            <div className="p-5 bg-white border border-stone-200/90 rounded-xl space-y-2 shadow-xs">
              <h3 className="font-semibold text-stone-900">
                {t.features.feature3Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.features.feature3Desc}
              </p>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="space-y-3 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900">
            {info.sourcesHeading}
          </h2>
          <p>{info.sourcesIntro}</p>
          <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600 pl-4 list-disc">
            <li>{info.whoTitle}</li>
            <li>{info.cdcTitle}</li>
            <li>{info.ncdTitle}</li>
          </ul>
        </section>

        {/* Team */}
        <section className="space-y-2 text-sm text-stone-700 leading-relaxed">
          <h2 className="text-xl font-bold text-stone-900">
            {info.teamHeading}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">{info.teamBody}</p>
        </section>

        {/* Disclaimer */}
        <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xl space-y-1.5 text-xs text-amber-900 leading-relaxed">
          <div className="font-semibold text-amber-950 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            {info.disclaimerHeading}
          </div>
          <p>{info.disclaimerBody}</p>
        </div>
      </div>
    </div>
  );
}
