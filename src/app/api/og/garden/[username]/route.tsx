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
          backgroundColor: "#FFF5FE",
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50px",
            backgroundColor: "#7B2CBF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "48px",
            fontWeight: "bold",
          }}
        >
          {initial}
        </div>
        <div style={{ marginTop: "20px", fontSize: "44px", fontWeight: "bold", color: "#7B2CBF" }}>
          {displayName} Garden
        </div>
        <div style={{ marginTop: "8px", fontSize: "24px", color: "#9B4ED8" }}>
          Wisdom collection
        </div>
        <div style={{ marginTop: "20px", fontSize: "20px", color: "#7B2CBF" }}>
          bloomscroll.club
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
