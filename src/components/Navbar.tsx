import React from "react";
import Link from "next/link";
import { Globe } from "lucide-react";
import { SITE_CONFIG, Locale } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";
import { Logo } from "@/components/Logo";

interface NavbarProps {
  currentLocale?: Locale;
}

export function Navbar({ currentLocale = "en" }: NavbarProps) {
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;

  const getLocalePath = (path: string, loc: Locale = currentLocale) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    if (loc === "en") {
      return cleanPath;
    }
    return `/${loc}${cleanPath === "/" ? "" : cleanPath}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200/90 bg-[#faf9f6]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={getLocalePath("/", currentLocale)}
          className="flex items-center space-x-2.5 group hover:opacity-90 transition-opacity"
        >
          <Logo size="md" />
        </Link>

        {/* Navigation Links (Localized) */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-stone-600">
          <Link
            href={getLocalePath("/celebrities/the-rock-vs-kevin-hart", currentLocale)}
            className="hover:text-blue-600 transition-colors"
          >
            {t.celebrities}
          </Link>
          <Link
            href={getLocalePath("/couples/5-2-and-6-0-height-difference", currentLocale)}
            className="hover:text-blue-600 transition-colors"
          >
            {t.couples}
          </Link>
          <Link
            href={getLocalePath("/objects/door-frame-vs-person-height", currentLocale)}
            className="hover:text-blue-600 transition-colors"
          >
            {t.everydayObjects}
          </Link>
          <Link
            href={getLocalePath("/guides", currentLocale)}
            className="hover:text-blue-600 transition-colors"
          >
            {t.guides}
          </Link>
        </nav>

        {/* Language selector */}
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg cursor-pointer hover:border-stone-300 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span className="uppercase font-bold">{currentLocale}</span>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-36 py-1 bg-white border border-stone-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {SITE_CONFIG.locales.map((loc) => (
                <Link
                  key={loc}
                  href={getLocalePath("/", loc)}
                  className={`block px-3 py-1.5 text-xs transition-colors ${
                    currentLocale === loc
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-stone-700 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  {SITE_CONFIG.localeNames[loc]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

