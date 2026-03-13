import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #FFF5FE 0%, #F3EAFA 100%)",
          fontSize: 48,
          fontWeight: 600,
          color: "#7B2CBF",
        }}
      >
        OG Test Works! 🌱
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
