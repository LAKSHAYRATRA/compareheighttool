import { MetadataRoute } from "next";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";
import { COMPARISONS_DATA } from "@/data/comparisons";
import { GUIDES_DATA } from "@/data/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date("2026-10-20T00:00:00.000Z");

  // Core Static URLs
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/guides",
  ];

  const staticEntries: MetadataRoute.Sitemap = [];
  
  staticRoutes.forEach((route) => {
    // English canonical entry
    staticEntries.push({
      url: getCanonicalUrl(route),
      lastModified: currentDate,
      changeFrequency: route === "" ? "daily" : "monthly",
      priority: route === "" ? 1.0 : 0.7,
      alternates: {
        languages: getAlternateLanguages(route),
      },
    });

    // Locales for static routes
    SITE_CONFIG.locales
      .filter((loc) => loc !== "en")
      .forEach((loc) => {
        staticEntries.push({
          url: getCanonicalUrl(route, loc),
          lastModified: currentDate,
          changeFrequency: route === "" ? "daily" : "monthly",
          priority: route === "" ? 0.9 : 0.65,
          alternates: {
            languages: getAlternateLanguages(route),
          },
        });
      });
  });

  // Programmatic Comparison Pages (English Base + Locales)
  const comparisonEntries: MetadataRoute.Sitemap = [];
  COMPARISONS_DATA.forEach((item) => {
    const route = `/${item.category === "celebrity" ? "celebrities" : item.category === "couples" ? "couples" : "objects"}/${item.slug}`;
    
    // English canonical
    comparisonEntries.push({
      url: getCanonicalUrl(route),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: {
        languages: getAlternateLanguages(route),
      },
    });

    // Locales
    SITE_CONFIG.locales
      .filter((loc) => loc !== "en")
      .forEach((loc) => {
        comparisonEntries.push({
          url: getCanonicalUrl(route, loc),
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: {
            languages: getAlternateLanguages(route),
          },
        });
      });
  });

  // Research Guides (English + Locales)
  const guideEntries: MetadataRoute.Sitemap = [];
  GUIDES_DATA.forEach((article) => {
    const route = `/guides/${article.slug}`;
    
    guideEntries.push({
      url: getCanonicalUrl(route),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: getAlternateLanguages(route),
      },
    });

    SITE_CONFIG.locales
      .filter((loc) => loc !== "en")
      .forEach((loc) => {
        guideEntries.push({
          url: getCanonicalUrl(route, loc),
          lastModified: new Date(article.publishedAt),
          changeFrequency: "monthly",
          priority: 0.7,
          alternates: {
            languages: getAlternateLanguages(route),
          },
        });
      });
  });

  return [
    ...staticEntries,
    ...comparisonEntries,
    ...guideEntries,
  ];
}
