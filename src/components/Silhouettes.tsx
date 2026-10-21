import React from "react";
import { SilhouetteType } from "@/types/comparison";

interface SilhouetteProps {
  type: SilhouetteType;
  color: string;
  width: number;
  height: number;
}

export function Silhouette({ type, color, width, height }: SilhouetteProps) {
  switch (type) {
    case "male":
      return (
        <svg
          viewBox="0 0 100 240"
          width={width}
          height={height}
          fill={color}
          className="transition-all duration-300 drop-shadow-md select-none"
        >
          {/* Head */}
          <ellipse cx="50" cy="22" rx="14" ry="17" />
          {/* Neck */}
          <path d="M44 38 L56 38 L58 48 L42 48 Z" />
          {/* Torso & Shoulders */}
          <path d="M22 52 C22 47, 40 46, 50 46 C60 46, 78 47, 78 52 L73 118 C73 124, 66 127, 50 127 C34 127, 27 124, 27 118 Z" />
          {/* Left Arm */}
          <path d="M22 53 C18 65, 14 90, 13 118 C12 126, 17 130, 20 122 C23 110, 26 80, 28 65 Z" />
          {/* Right Arm */}
          <path d="M78 53 C82 65, 86 90, 87 118 C88 126, 83 130, 80 122 C77 110, 74 80, 72 65 Z" />
          {/* Pelvis & Legs */}
          {/* Left Leg */}
          <path d="M30 125 L47 125 L43 234 C43 238, 32 238, 32 234 L30 170 Z" />
          {/* Right Leg */}
          <path d="M53 125 L70 125 L68 170 L68 234 C68 238, 57 238, 57 234 Z" />
          {/* Feet */}
          <ellipse cx="36" cy="237" rx="9" ry="3" />
          <ellipse cx="64" cy="237" rx="9" ry="3" />
        </svg>
      );

    case "female":
      return (
        <svg
          viewBox="0 0 100 240"
          width={width}
          height={height}
          fill={color}
          className="transition-all duration-300 drop-shadow-md select-none"
        >
          {/* Head & Hair */}
          <ellipse cx="50" cy="22" rx="13" ry="16" />
          <path d="M33 22 C33 9, 67 9, 67 22 C67 36, 62 48, 59 52 C57 40, 43 40, 41 52 C38 48, 33 36, 33 22 Z" opacity="0.9" />
          {/* Neck */}
          <path d="M45 37 L55 37 L56 46 L44 46 Z" />
          {/* Torso (slimmer waist, wider hips) */}
          <path d="M28 49 C33 47, 43 46, 50 46 C57 46, 67 47, 72 49 L67 85 C64 94, 60 100, 68 114 C73 123, 67 127, 50 127 C33 127, 27 123, 32 114 C40 100, 36 94, 33 85 Z" />
          {/* Left Arm */}
          <path d="M28 50 C24 64, 21 86, 20 114 C19 120, 24 122, 26 116 C28 102, 31 78, 33 62 Z" />
          {/* Right Arm */}
          <path d="M72 50 C76 64, 79 86, 80 114 C81 120, 76 122, 74 116 C72 102, 69 78, 67 62 Z" />
          {/* Legs */}
          <path d="M34 126 L48 126 L45 234 C45 237, 36 237, 36 234 L34 175 Z" />
          <path d="M52 126 L66 126 L64 175 L64 234 C64 237, 55 237, 55 234 Z" />
          {/* Feet */}
          <ellipse cx="40" cy="237" rx="7" ry="3" />
          <ellipse cx="60" cy="237" rx="7" ry="3" />
        </svg>
      );

    case "door":
      return (
        <svg
          viewBox="0 0 100 240"
          width={width}
          height={height}
          className="transition-all duration-300 drop-shadow-md select-none"
        >
          {/* Outer Frame */}
          <rect x="10" y="5" width="80" height="235" fill="#451a03" rx="2" />
          {/* Door Slab */}
          <rect x="15" y="10" width="70" height="230" fill={color} rx="1" />
          {/* Panels */}
          <rect x="22" y="20" width="24" height="45" fill="#000000" fillOpacity="0.1" rx="1" />
          <rect x="54" y="20" width="24" height="45" fill="#000000" fillOpacity="0.1" rx="1" />
          <rect x="22" y="75" width="24" height="55" fill="#000000" fillOpacity="0.1" rx="1" />
          <rect x="54" y="75" width="24" height="55" fill="#000000" fillOpacity="0.1" rx="1" />
          <rect x="22" y="140" width="24" height="85" fill="#000000" fillOpacity="0.1" rx="1" />
          <rect x="54" y="140" width="24" height="85" fill="#000000" fillOpacity="0.1" rx="1" />
          {/* Doorknob */}
          <circle cx="21" cy="125" r="3.5" fill="#facc15" stroke="#713f12" strokeWidth="0.8" />
        </svg>
      );

    case "refrigerator":
      return (
        <svg
          viewBox="0 0 100 240"
          width={width}
          height={height}
          className="transition-all duration-300 drop-shadow-md select-none"
        >
          {/* Main Body */}
          <rect x="12" y="10" width="76" height="230" fill={color} rx="4" />
          {/* Top Freezer Divider */}
          <line x1="12" y1="85" x2="88" y2="85" stroke="#334155" strokeWidth="2.5" />
          {/* Handles */}
          <rect x="76" y="30" width="4" height="38" fill="#94a3b8" rx="1.5" />
          <rect x="76" y="98" width="4" height="50" fill="#94a3b8" rx="1.5" />
          {/* Water Dispenser */}
          <rect x="24" y="110" width="20" height="28" fill="#1e293b" rx="2" />
        </svg>
      );

    case "basketball_hoop":
      return (
        <svg
          viewBox="0 0 100 240"
          width={width}
          height={height}
          className="transition-all duration-300 drop-shadow-md select-none"
        >
          {/* Pole */}
          <rect x="20" y="25" width="8" height="215" fill="#334155" rx="2" />
          {/* Support arms */}
          <path d="M26 40 L60 30 L60 45 Z" fill="#475569" />
          {/* Backboard */}
          <rect x="58" y="10" width="5" height="48" fill="#ffffff" stroke="#000000" strokeWidth="1" rx="1" />
          <rect x="58.5" y="24" width="4" height="18" fill="none" stroke="#ef4444" strokeWidth="1.2" />
          {/* Rim / Hoop */}
          <rect x="63" y="38" width="24" height="3" fill="#ea580c" rx="1" />
          {/* Net */}
          <path d="M64 41 L68 62 L82 62 L86 41 Z" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2,2" />
        </svg>
      );

    default:
      // Generic silhouette
      return (
        <svg
          viewBox="0 0 100 240"
          width={width}
          height={height}
          fill={color}
          className="transition-all duration-300 drop-shadow-md select-none"
        >
          <ellipse cx="50" cy="25" rx="15" ry="18" />
          <rect x="35" y="48" width="30" height="90" rx="4" />
          <rect x="35" y="140" width="13" height="96" rx="3" />
          <rect x="52" y="140" width="13" height="96" rx="3" />
        </svg>
      );
  }
}
