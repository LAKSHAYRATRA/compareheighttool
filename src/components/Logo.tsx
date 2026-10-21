import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", iconOnly = false, size = "md" }: LogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Custom Vector Icon */}
      <div
        className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-1.5 shadow-xs border border-blue-500/20 shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Vertical ruler scale markings */}
          <line x1="4" y1="6" x2="8" y2="6" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="11" x2="6" y2="11" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          <line x1="4" y1="16" x2="8" y2="16" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="21" x2="6" y2="21" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
          <line x1="4" y1="26" x2="8" y2="26" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4" y1="5" x2="4" y2="27" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />

          {/* Left figure (Person 1 - soft cyan/blue) */}
          <rect x="11" y="14" width="6.5" height="13" rx="2" fill="#93c5fd" />
          <circle cx="14.25" cy="10" r="2.5" fill="#93c5fd" />

          {/* Right figure (Person 2 - crisp white, taller) */}
          <rect x="20.5" y="8" width="6.5" height="19" rx="2" fill="#ffffff" />
          <circle cx="23.75" cy="4.5" r="2.5" fill="#ffffff" />

          {/* Precision Delta height bracket */}
          <path
            d="M 14.25 7.5 L 14.25 4.5 L 20 4.5"
            stroke="#fbbf24"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1.5 1.5"
          />
        </svg>
      </div>

      {!iconOnly && (
        <span className={`font-serif font-bold tracking-tight text-stone-900 ${textSizes[size]}`}>
          CompareHeight<span className="text-blue-600 font-sans font-semibold">Tool</span>
        </span>
      )}
    </div>
  );
}
