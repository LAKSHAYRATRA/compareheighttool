export const SITE_CONFIG = {
  name: "CompareHeightTool",
  domain: "www.compareheighttool.com",
  canonicalBase: "https://www.compareheighttool.com",
  author: "CompareHeightTool Team",
  description: "The ultimate 100% client-side height comparison tool. Compare celebrities, couples, everyday objects, and country averages with millimeter precision on CompareHeightTool.",
  defaultLocale: "en",
  locales: ["en", "es", "de", "pt", "fr", "ja"] as const,
  localeNames: {
    en: "English",
    es: "Español",
    de: "Deutsch",
    pt: "Português",
    fr: "Français",
    ja: "日本語",
  },
  keywords: [
    "compare height tool",
    "compareheighttool",
    "compare heights",
    "height comparison tool",
    "height comparison chart",
    "celebrity height comparison",
    "compare heights online",
    "height difference calculator",
    "height visualizer",
    "scale height",
    "couple height comparison",
    "visual height comparison",
  ],
};

export type Locale = (typeof SITE_CONFIG.locales)[number];

function sanitizePath(rawPath: string): string {
  let clean = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  // Strip any leading locale prefix if already present (e.g., /de/about or /de -> /about or /)
  for (const loc of SITE_CONFIG.locales) {
    if (clean === `/${loc}`) {
      clean = "/";
      break;
    }
    if (clean.startsWith(`/${loc}/`)) {
      clean = clean.slice(loc.length + 1);
      break;
    }
  }
  return clean;
}

export function getCanonicalUrl(path: string, locale: Locale = "en"): string {
  const cleanPath = sanitizePath(path);
  if (locale === "en") {
    // English is canonical base
    return `${SITE_CONFIG.canonicalBase}${cleanPath === "/" ? "" : cleanPath}`;
  }
  return `${SITE_CONFIG.canonicalBase}/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

export function getAlternateLanguages(path: string) {
  const cleanPath = sanitizePath(path);
  const alternates: Record<string, string> = {
    "x-default": `${SITE_CONFIG.canonicalBase}${cleanPath === "/" ? "" : cleanPath}`,
    en: `${SITE_CONFIG.canonicalBase}${cleanPath === "/" ? "" : cleanPath}`,
  };

  for (const loc of SITE_CONFIG.locales) {
    if (loc !== "en") {
      alternates[loc] = `${SITE_CONFIG.canonicalBase}/${loc}${cleanPath === "/" ? "" : cleanPath}`;
    }
  }

  return alternates;
}
