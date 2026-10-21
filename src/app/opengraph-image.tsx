import { ImageResponse } from "next/og";

export const alt = "CompareHeightTool - Free Visual Height Comparison";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf9f6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            C
          </div>
          <span
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#1c1917",
              letterSpacing: "-0.02em",
            }}
          >
            CompareHeightTool
          </span>
        </div>

        <div
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "#1c1917",
            textAlign: "center",
            maxWidth: "960px",
            lineHeight: 1.15,
            marginBottom: "24px",
          }}
        >
          Visual Height Comparison Tool
        </div>

        <div
          style={{
            fontSize: "24px",
            color: "#57534e",
            textAlign: "center",
            maxWidth: "840px",
            lineHeight: 1.4,
          }}
        >
          Compare heights of people, celebrities, couples, and everyday objects side by side with millimeter precision.
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "#ffffff",
              border: "2px solid #e7e5e4",
              fontSize: "18px",
              fontWeight: "600",
              color: "#2563eb",
            }}
          >
            Instant Metric & Imperial
          </div>
          <div
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "#ffffff",
              border: "2px solid #e7e5e4",
              fontSize: "18px",
              fontWeight: "600",
              color: "#059669",
            }}
          >
            100% Private Client Calculation
          </div>
          <div
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "#ffffff",
              border: "2px solid #e7e5e4",
              fontSize: "18px",
              fontWeight: "600",
              color: "#d97706",
            }}
          >
            High-Res PNG Export
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
