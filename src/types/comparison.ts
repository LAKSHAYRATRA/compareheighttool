import { Locale } from "@/config/site";

export type SilhouetteType =
  | "male"
  | "female"
  | "boy"
  | "girl"
  | "door"
  | "refrigerator"
  | "car"
  | "bed"
  | "basketball_hoop";

export type UnitMode = "metric" | "imperial";

export interface ComparisonEntity {
  id: string;
  name: string;
  heightCm: number; // Single source of truth in centimeters
  type: SilhouetteType;
  color: string;
  gender?: "male" | "female";
  category?: "person" | "object" | "celebrity";
  description?: string;
  xOffset?: number; // Horizontal draggable position in pixels
  opacity?: number; // For overlapping visibility
}

export interface LocalizedComparisonContent {
  title: string;
  h1: string;
  metaDescription: string;
  differenceDescription: string;
  keyInsights: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ProgrammaticPageData {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  category: "celebrity" | "couples" | "objects" | "countries";
  entities: ComparisonEntity[];
  analysis: {
    differenceCm: number;
    differenceInches: number;
    differenceDescription: string;
    keyInsights: string[];
    visualSummary: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
  translations?: Partial<Record<Locale, LocalizedComparisonContent>>;
}
