import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getAnyCardById } from "@/lib/card-resolver";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ref = request.nextUrl.searchParams.get("ref");
  const card = getAnyCardById(id);

  if (!card) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#EACCD4",
            color: "#007A5E",
            fontSize: 48,
            fontWeight: "bold",
          }}
        >
          Card not found
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const displayQuote =
    card.quote.length > 180
      ? card.quote.slice(0, 180) + "..."
      : card.quote;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #EACCD4 0%, #d4a5b0 100%)",
          color: "#007A5E",
        }}
      >
        {/* Top: Topic badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "#007A5E",
              color: "#EACCD4",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: 18,
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {card.topic[0]}
          </div>
        </div>

        {/* Middle: Quote */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            &ldquo;{displayQuote}&rdquo;
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontSize: 28, fontWeight: "bold" }}>
              {card.author}
            </div>
            <div style={{ fontSize: 20, opacity: 0.7, fontStyle: "italic" }}>
              {card.book}
            </div>
          </div>
        </div>

        {/* Bottom: Branding + ref */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: 28 }}>🌱</span>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>
              Scrollbliss
            </span>
          </div>
          {ref && (
            <div style={{ fontSize: 18, opacity: 0.6 }}>
              Shared by @{ref}
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
