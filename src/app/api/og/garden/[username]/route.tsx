import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getProfileByUsername, getPinnedCards } from "@/lib/pinned-cards";
import { getAnyCardById } from "@/lib/card-resolver";
import { UserProfile } from "@/lib/supabase";

// Using serverless instead of edge to avoid size limits
export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const profile = (await getProfileByUsername(username)) as UserProfile | null;

  if (!profile) {
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
          Garden not found
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }

  const pins = await getPinnedCards(profile.id);
  const displayName =
    profile.fc_display_name ||
    profile.fc_username ||
    profile.email?.split("@")[0] ||
    "A Reader";

  // Get first 4 pin quotes for preview
  const previewQuotes = pins.slice(0, 4).map((pin) => {
    const card = getAnyCardById(pin.card_id);
    if (!card) return "...";
    return card.quote.length > 60 ? card.quote.slice(0, 57) + "..." : card.quote;
  });

  const initial = displayName.charAt(0).toUpperCase();

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
        {/* Top: Avatar + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#7B2CBF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 36,
              fontWeight: 500,
            }}
          >
            {initial}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 500 }}>
              {displayName}&apos;s Garden
            </div>
            <div
              style={{
                fontSize: 20,
                opacity: 0.7,
                marginTop: 4,
              }}
            >
              {pins.length} quote{pins.length !== 1 ? "s" : ""} planted
            </div>
          </div>
        </div>

        {/* Middle: 2x2 quote previews */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          {previewQuotes.map((quote, i) => (
            <div
              key={i}
              style={{
                width: "46%",
                background: "rgba(255,255,255,0.5)",
                borderRadius: "16px",
                padding: "20px",
                fontSize: 16,
                fontStyle: "italic",
                lineHeight: 1.4,
              }}
            >
              &ldquo;{quote}&rdquo;
            </div>
          ))}
        </div>

        {/* Bottom: Branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 500 }}>BloomScroll</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
