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

  // Get first 3 pin quotes for preview
  const previewQuotes = pins.slice(0, 3).map((pin) => {
    const card = getAnyCardById(pin.card_id);
    if (!card) return "...";
    return card.quote.length > 80 ? card.quote.slice(0, 77) + "..." : card.quote;
  });

  const initial = displayName.charAt(0).toUpperCase();
  const avatarUrl = profile.fc_pfp_url || profile.avatar_url;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(145deg, #FFF5FE 0%, #F3EAFA 50%, #E8D5F5 100%)",
        }}
      >
        {/* Background chair image - positioned right */}
        <img
          src="https://bloomscroll.club/landing/center-chair.svg"
          width={500}
          height={500}
          style={{
            position: "absolute",
            right: -50,
            bottom: -50,
            opacity: 0.15,
          }}
        />

        {/* Main content */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "50px 60px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top: Avatar + Name + Stats */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  width={90}
                  height={90}
                  style={{
                    borderRadius: "50%",
                    border: "4px solid rgba(123, 44, 191, 0.2)",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #7B2CBF 0%, #9B4ED8 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: 40,
                    fontWeight: 600,
                  }}
                >
                  {initial}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 42, fontWeight: 600, color: "#7B2CBF" }}>
                  {displayName}&apos;s Garden
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: "#9B4ED8",
                    marginTop: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: 24 }}>🌱</span>
                  {pins.length} quote{pins.length !== 1 ? "s" : ""} planted
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Quote previews as elegant cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              flex: 1,
              justifyContent: "center",
              maxWidth: "75%",
            }}
          >
            {previewQuotes.length > 0 ? (
              previewQuotes.map((quote, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    borderRadius: "16px",
                    padding: "18px 24px",
                    fontSize: 18,
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    color: "#4A2875",
                    boxShadow: "0 4px 20px rgba(123, 44, 191, 0.08)",
                    borderLeft: "4px solid #7B2CBF",
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </div>
              ))
            ) : (
              <div
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderRadius: "16px",
                  padding: "24px 32px",
                  fontSize: 20,
                  color: "#9B4ED8",
                  textAlign: "center",
                }}
              >
                Start planting wisdom in your garden ✨
              </div>
            )}
          </div>

          {/* Bottom: Branding */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700, color: "#7B2CBF" }}>
                BloomScroll
              </span>
              <span style={{ fontSize: 20, color: "#9B4ED8" }}>
                · bloomscroll.club
              </span>
            </div>
            <div
              style={{
                fontSize: 18,
                color: "#9B4ED8",
                background: "rgba(123, 44, 191, 0.1)",
                padding: "8px 16px",
                borderRadius: "20px",
              }}
            >
              Swipe smarter. Grow wiser.
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
