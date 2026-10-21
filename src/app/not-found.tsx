import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, Compass, BookOpen } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900">
      <Navbar currentLocale="en" />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 border border-stone-300 text-stone-700 text-xs font-semibold">
            <Search className="w-3.5 h-3.5 text-blue-600" /> Error 404
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-serif text-stone-900 tracking-tight">
            Comparison Not Found
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-md mx-auto">
            The measurement, comparison, or page you were looking for doesn&apos;t exist or has moved.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Scale Visualizer
            </Link>
            <Link
              href="/guides"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 font-medium text-xs shadow-xs transition-all"
            >
              <BookOpen className="w-4 h-4 text-stone-500" /> Browse Research Guides
            </Link>
          </div>

          <div className="pt-8 border-t border-stone-200/80 text-left">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" /> Popular Comparison Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Link
                href="/celebrities/the-rock-vs-kevin-hart"
                className="p-2.5 rounded-lg bg-white border border-stone-200/80 hover:border-blue-400 text-stone-800 transition-colors block"
              >
                The Rock vs Kevin Hart
              </Link>
              <Link
                href="/couples/5-2-and-6-0-height-difference"
                className="p-2.5 rounded-lg bg-white border border-stone-200/80 hover:border-blue-400 text-stone-800 transition-colors block"
              >
                5&apos;2&quot; and 6&apos;0&quot; Height Gap
              </Link>
              <Link
                href="/celebrities/taylor-swift-vs-travis-kelce"
                className="p-2.5 rounded-lg bg-white border border-stone-200/80 hover:border-blue-400 text-stone-800 transition-colors block"
              >
                Taylor Swift vs Travis Kelce
              </Link>
              <Link
                href="/objects/door-frame-vs-person-height"
                className="p-2.5 rounded-lg bg-white border border-stone-200/80 hover:border-blue-400 text-stone-800 transition-colors block"
              >
                Door Frame vs Person Height
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer currentLocale="en" />
    </div>
  );
}
