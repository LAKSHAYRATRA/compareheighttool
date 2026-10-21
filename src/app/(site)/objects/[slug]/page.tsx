import { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARISONS_DATA } from "@/data/comparisons";
import { ComparisonTemplate } from "@/components/ComparisonTemplate";
import { getCanonicalUrl, getAlternateLanguages } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPARISONS_DATA.filter((c) => c.category === "objects").map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "objects");
  if (!item) return {};

  const path = `/objects/${slug}`;

  return {
    title: item.title,
    description: item.metaDescription,
    keywords: [
      item.title,
      "reference object height scale",
      "visual height comparison",
      "scale chart",
      "everyday object comparison",
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

export default async function ObjectPage({ params }: PageProps) {
  const { slug } = await params;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "objects");
  if (!item) notFound();

  return <ComparisonTemplate data={item} canonicalPath={`/objects/${slug}`} />;
}
