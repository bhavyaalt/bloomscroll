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
          alignItems: "center",
          justifyContent: "center",
          background: "#FFF5FE",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            background: "#7B2CBF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {initial}
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: "#7B2CBF", marginBottom: 8 }}>
          {displayName} Garden
        </div>
        <div style={{ fontSize: 24, color: "#9B4ED8", marginBottom: 16 }}>
          Wisdom collection
        </div>
        <div style={{ fontSize: 20, color: "#7B2CBF", opacity: 0.8 }}>
          bloomscroll.club
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
