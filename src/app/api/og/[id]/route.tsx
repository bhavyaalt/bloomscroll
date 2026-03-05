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
            background: "#FFF5FE",
            color: "#7B2CBF",
            fontSize: 48,
            fontWeight: 500,
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
          background: "linear-gradient(135deg, #FFF5FE 0%, #F3EAFA 100%)",
          color: "#7B2CBF",
        }}
      >
        {/* Top: Topic badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              background: "#7B2CBF",
              color: "white",
              padding: "8px 20px",
              borderRadius: "20px",
              fontSize: 18,
              fontWeight: 500,
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
            <div style={{ fontSize: 28, fontWeight: 500 }}>
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
            <span style={{ fontSize: 24, fontWeight: 500 }}>
              BloomScroll
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
