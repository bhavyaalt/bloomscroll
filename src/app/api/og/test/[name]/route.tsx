import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;

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
          fontSize: 48,
          fontWeight: 600,
          color: "#7B2CBF",
        }}
      >
        Hello {name}!
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
