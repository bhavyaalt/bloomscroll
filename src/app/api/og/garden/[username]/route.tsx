import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFF5FE",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 600, color: "#7B2CBF" }}>
          {displayName} Garden
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
