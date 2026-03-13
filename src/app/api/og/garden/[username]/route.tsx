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
          background: "linear-gradient(145deg, #FFF5FE 0%, #F3EAFA 50%, #E8D5F5 100%)",
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
            marginBottom: 24,
          }}
        >
          {initial}
        </div>
        <div style={{ fontSize: 44, fontWeight: 600, color: "#7B2CBF", marginBottom: 12 }}>
          {displayName} Garden
        </div>
        <div style={{ fontSize: 26, color: "#9B4ED8", marginBottom: 24 }}>
          Wisdom Collection
        </div>
        <div style={{ fontSize: 22, color: "#7B2CBF" }}>
          bloomscroll.club
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
