import { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMPARISONS_DATA } from "@/data/comparisons";
import { ComparisonTemplate } from "@/components/ComparisonTemplate";
import { getCanonicalUrl, getAlternateLanguages } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPARISONS_DATA.filter((c) => c.category === "couples").map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "couples");
  if (!item) return {};

  const path = `/couples/${slug}`;

  return {
    title: item.title,
    description: item.metaDescription,
    keywords: [
      item.title,
      "couple height difference",
      "height comparison visualizer",
      "dating height difference",
      "scale chart",
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

export default async function CouplePage({ params }: PageProps) {
  const { slug } = await params;
  const item = COMPARISONS_DATA.find((c) => c.slug === slug && c.category === "couples");
  if (!item) notFound();

  return <ComparisonTemplate data={item} canonicalPath={`/couples/${slug}`} />;
}
