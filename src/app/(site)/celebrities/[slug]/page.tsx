import { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARISONS_DATA } from "@/data/comparisons";
import { ComparisonTemplate } from "@/components/ComparisonTemplate";
import { getCanonicalUrl, getAlternateLanguages } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPARISONS_DATA.filter((c) => c.category === "celebrity").map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "celebrity");
  if (!item) return {};

  const path = `/celebrities/${slug}`;

  return {
    title: item.title,
    description: item.metaDescription,
    keywords: [
      item.title,
      ...item.entities.map((e) => e.name),
      "celebrity height comparison",
      "height difference chart",
      "visual scale comparison",
    ],
    alternates: {
      canonical: getCanonicalUrl(path),
      languages: getAlternateLanguages(path),
    },
    openGraph: {
      title: item.title,
      description: item.metaDescription,
      url: getCanonicalUrl(path),
    },
  };
}

export default async function CelebrityPage({ params }: PageProps) {
  const { slug } = await params;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "celebrity");
  if (!item) notFound();

  return <ComparisonTemplate data={item} canonicalPath={`/celebrities/${slug}`} />;
}
