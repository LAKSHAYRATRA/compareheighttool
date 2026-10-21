import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          borderRadius: "40px",
          padding: "24px",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Vertical ruler line */}
          <line x1="4" y1="5" x2="4" y2="27" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="8" x2="8" y2="8" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="16" x2="8" y2="16" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="24" x2="8" y2="24" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />

          {/* Left figure */}
          <rect x="11" y="14" width="7" height="13" rx="2" fill="#93c5fd" />
          <circle cx="14.5" cy="10" r="2.5" fill="#93c5fd" />

          {/* Right figure */}
          <rect x="21" y="8" width="7" height="19" rx="2" fill="#ffffff" />
          <circle cx="24.5" cy="4.5" r="2.5" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
