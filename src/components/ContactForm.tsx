"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Locale } from "@/config/site";
import { TRANSLATIONS } from "@/data/translations";

export function ContactForm({ currentLocale = "en" }: { currentLocale?: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  const t = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 bg-white border border-emerald-300 rounded-2xl text-center space-y-3 shadow-sm">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
        <h2 className="text-xl font-bold text-stone-900">Message Received!</h2>
        <p className="text-xs text-stone-600 max-w-sm mx-auto">
          Thank you for reaching out. We will review your message shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white border border-stone-200/90 rounded-2xl shadow-sm space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700">{t.name}</label>
        <input
          type="text"
          required
          placeholder="Name"
          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700">Email</label>
        <input
          type="email"
          required
          placeholder="you@example.com"
          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-stone-700">Message</label>
        <textarea
          rows={5}
          required
          placeholder="Your message or suggestion..."
          className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm text-stone-900 focus:outline-none focus:bg-white focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
      >
        <Send className="w-3.5 h-3.5" /> {t.contact}
      </button>
    </form>
  );
}
