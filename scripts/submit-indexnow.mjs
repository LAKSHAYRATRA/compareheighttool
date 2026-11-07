/**
 * IndexNow Batch Submission Script for CompareHeightTool
 * 
 * Submits all production canonical URLs (Static, Programmatic Comparisons, Guides, and Multilingual variants)
 * directly to Microsoft Bing / IndexNow API.
 */

const INDEXNOW_KEY = "cf3549831a1052071df3e8c4c45887dc";
const HOST = "www.compareheighttool.com";
const BASE_URL = `https://${HOST}`;
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;

const LOCALES = ["es", "de", "pt", "fr", "ja"];

// Static core routes
const STATIC_ROUTES = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/guides",
];

// Pre-configured comparisons
const COMPARISONS = [
  { category: "celebrities", slug: "the-rock-vs-kevin-hart" },
  { category: "celebrities", slug: "taylor-swift-vs-travis-kelce" },
  { category: "celebrities", slug: "zendaya-vs-tom-holland" },
  { category: "celebrities", slug: "shaquille-oneal-vs-kevin-hart" },
  { category: "celebrities", slug: "lionel-messi-vs-cristiano-ronaldo" },
  { category: "couples", slug: "5-2-and-6-0-height-difference" },
  { category: "couples", slug: "5-4-and-5-11-height-difference" },
  { category: "couples", slug: "5-0-and-6-2-height-difference" },
  { category: "couples", slug: "5-6-and-6-0-height-difference" },
  { category: "objects", slug: "door-frame-vs-person-height" },
  { category: "objects", slug: "refrigerator-vs-person-height" },
  { category: "objects", slug: "basketball-hoop-vs-human-height" },
];

// Research Guides
const GUIDES = [
  "how-to-measure-height-accurately-at-home",
  "average-human-height-by-country-demographics",
  "why-height-changes-between-morning-and-evening",
  "couples-height-difference-visual-dynamics-and-perspective",
  "celebrity-height-measurement-myths-and-red-carpet-posture",
];

function buildAllUrls() {
  const urls = new Set();

  // 1. Static Routes
  for (const route of STATIC_ROUTES) {
    urls.add(`${BASE_URL}${route}`);
    for (const locale of LOCALES) {
      urls.add(`${BASE_URL}/${locale}${route}`);
    }
  }

  // 2. Comparison Pages
  for (const item of COMPARISONS) {
    const route = `/${item.category}/${item.slug}`;
    urls.add(`${BASE_URL}${route}`);
    for (const locale of LOCALES) {
      urls.add(`${BASE_URL}/${locale}${route}`);
    }
  }

  // 3. Guide Pages
  for (const slug of GUIDES) {
    const route = `/guides/${slug}`;
    urls.add(`${BASE_URL}${route}`);
    for (const locale of LOCALES) {
      urls.add(`${BASE_URL}/${locale}${route}`);
    }
  }

  return Array.from(urls);
}

async function submitToIndexNow() {
  const urlList = buildAllUrls();
  console.log(`[IndexNow] Found ${urlList.length} unique URLs across all locales.`);
  console.log(`[IndexNow] Key Location: ${KEY_LOCATION}`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList,
  };

  try {
    console.log("[IndexNow] Submitting batch to https://api.indexnow.org/indexnow ...");
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`[IndexNow] SUCCESS! Status: ${response.status} (${response.statusText})`);
      console.log(`[IndexNow] All ${urlList.length} URLs submitted to Bing, Yandex, and participating search engines.`);
    } else {
      const text = await response.text();
      console.warn(`[IndexNow] Response: ${response.status} ${response.statusText}`);
      console.warn(`[IndexNow] Details: ${text}`);
      if (response.status === 422) {
        console.warn("[IndexNow] Note: 422 usually indicates the key verification file has not yet been fetched on production. Ensure changes are pushed and live on Vercel first.");
      }
    }
  } catch (error) {
    console.error("[IndexNow] Network Error:", error.message);
  }
}

submitToIndexNow();
