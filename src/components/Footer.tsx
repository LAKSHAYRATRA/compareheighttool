import React from "react";
import Link from "next/link";
import { SITE_CONFIG, Locale } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";
import { Logo } from "@/components/Logo";

interface FooterProps {
  currentLocale?: Locale;
}

export function Footer({ currentLocale = "en" }: FooterProps) {
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;

  const getLocalePath = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (currentLocale === "en") {
      return cleanPath;
    }
    return `/${currentLocale}${cleanPath === "/" ? "" : cleanPath}`;
  };

  return (
    <footer className="w-full bg-[#f4f2ee] border-t border-stone-200 text-stone-600 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Zero-Server guarantee */}
          <div className="space-y-3 md:col-span-1">
            <Logo size="sm" />
            <p className="text-stone-500 text-[11px] leading-relaxed">
              All calculations run directly in your browser. No biometric data or custom inputs are stored on any server.
            </p>
          </div>

          {/* Col 2: Popular Comparisons */}
          <div className="space-y-2.5">
            <h4 className="text-stone-900 font-semibold uppercase tracking-wider text-[11px]">
              {t.celebrities}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href={getLocalePath("/celebrities/the-rock-vs-kevin-hart")}
                  className="hover:text-blue-600 transition-colors"
                >
                  The Rock vs Kevin Hart
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/celebrities/taylor-swift-vs-travis-kelce")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Taylor Swift vs Travis Kelce
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/celebrities/zendaya-vs-tom-holland")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Zendaya vs Tom Holland
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/celebrities/shaquille-oneal-vs-kevin-hart")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Shaq vs Kevin Hart
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Couples & Reference Scale */}
          <div className="space-y-2.5">
            <h4 className="text-stone-900 font-semibold uppercase tracking-wider text-[11px]">
              {t.couples} &amp; {t.everydayObjects}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href={getLocalePath("/couples/5-2-and-6-0-height-difference")}
                  className="hover:text-blue-600 transition-colors"
                >
                  5&apos;2&quot; &amp; 6&apos;0&quot; Height Difference
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/couples/5-4-and-5-11-height-difference")}
                  className="hover:text-blue-600 transition-colors"
                >
                  5&apos;4&quot; &amp; 5&apos;11&quot; Height Difference
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/objects/door-frame-vs-person-height")}
                  className="hover:text-blue-600 transition-colors"
                >
                  Door Frame vs Person Height
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/objects/basketball-hoop-vs-human-height")}
                  className="hover:text-blue-600 transition-colors"
                >
                  10ft Basketball Hoop vs Human
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & AdSense Compliance */}
          <div className="space-y-2.5">
            <h4 className="text-stone-900 font-semibold uppercase tracking-wider text-[11px]">
              {t.about} &amp; Legal
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href={getLocalePath("/about")}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.about}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/guides")}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.guides}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/privacy-policy")}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/terms")}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={getLocalePath("/contact")}
                  className="hover:text-blue-600 transition-colors"
                >
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© 2026 {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="text-stone-500">Visual estimates and silhouettes are for reference purposes only.</p>
        </div>
      </div>
    </footer>
  );
}

