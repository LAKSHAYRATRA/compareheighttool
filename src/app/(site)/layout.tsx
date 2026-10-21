import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col bg-[#faf9f6] text-stone-900">
      <Navbar currentLocale="en" />
      <main className="flex-1">{children}</main>
      <Footer currentLocale="en" />
    </div>
  );
}
