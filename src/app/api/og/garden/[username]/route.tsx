import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const displayName = username.charAt(0).toUpperCase() + username.slice(1);
  const initial = displayName.charAt(0).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FFF5FE",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            background: "#7B2CBF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 56,
            fontWeight: 600,
          }}
        >
          {initial}
        </div>
        <div style={{ fontSize: 48, fontWeight: 600, color: "#7B2CBF" }}>
          {displayName} Garden
        </div>
        <div style={{ fontSize: 28, color: "#9B4ED8" }}>
          Wisdom Collection
        </div>
        <div style={{ fontSize: 24, color: "#7B2CBF", marginTop: 20 }}>
          bloomscroll.club
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
