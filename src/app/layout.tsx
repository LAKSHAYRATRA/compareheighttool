import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG, getCanonicalUrl, getAlternateLanguages } from "@/config/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.canonicalBase),
  title: {
    default: `${SITE_CONFIG.name} - Free Online Visual Height Comparison Tool`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  alternates: {
    canonical: getCanonicalUrl("/"),
    languages: getAlternateLanguages("/"),
  },
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.canonicalBase }],
  creator: SITE_CONFIG.author,
  publisher: SITE_CONFIG.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.canonicalBase,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} - Visual Height Comparison Tool`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.canonicalBase}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Visual Height Comparison Tool`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} - Visual Height Comparison Tool`,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.canonicalBase}/opengraph-image`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${newsreader.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf9f6] text-stone-900 selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}

