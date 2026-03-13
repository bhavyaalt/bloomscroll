import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAnyCardById } from "@/lib/card-resolver";

// Using serverless instead of edge to avoid size limits
export const runtime = "nodejs";

// Direct Supabase client for serverless context
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;
    const supabase = getSupabase();

    // Find profile by fc_username or email prefix
    let profile = null;
    
    const { data: fcProfile } = await supabase
      .from("bloomscroll_profiles")
      .select("*")
      .eq("fc_username", username)
      .single();

    if (fcProfile) {
      profile = fcProfile;
    } else {
      const { data: profiles } = await supabase
        .from("bloomscroll_profiles")
        .select("*")
        .like("email", `${username}@%`);
      profile = profiles?.[0] || null;
    }

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

    // Get pinned cards
    const { data: pins } = await supabase
      .from("bloomscroll_pinned_cards")
      .select("*")
      .eq("user_id", profile.id)
      .order("sort_order", { ascending: true });

    const pinnedCards = pins || [];
    const displayName =
      profile.fc_display_name ||
      profile.fc_username ||
      profile.email?.split("@")[0] ||
      "A Reader";

    // Get first 3 pin quotes for preview
    const previewQuotes: string[] = [];
    for (const pin of pinnedCards.slice(0, 3)) {
      const card = getAnyCardById(pin.card_id);
      if (card) {
        const quote = card.quote.length > 80 ? card.quote.slice(0, 77) + "..." : card.quote;
        previewQuotes.push(quote);
      }
    }

    const initial = displayName.charAt(0).toUpperCase();
    const avatarUrl = profile.fc_pfp_url || profile.avatar_url;

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 50,
            background: "linear-gradient(145deg, #FFF5FE 0%, #F3EAFA 50%, #E8D5F5 100%)",
            position: "relative",
          }}
        >
          {/* Top: Avatar + Name + Stats */}
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                width={90}
                height={90}
                style={{
                  borderRadius: 45,
                  border: "4px solid rgba(123, 44, 191, 0.2)",
                }}
              />
            ) : (
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 45,
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
                }}
              >
                🌱 {pinnedCards.length} quote{pinnedCards.length !== 1 ? "s" : ""} planted
              </div>
            </div>
          </div>

          {/* Middle: Quote previews */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              flex: 1,
              justifyContent: "center",
              maxWidth: "80%",
            }}
          >
            {previewQuotes.length > 0 ? (
              previewQuotes.map((quote, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    borderRadius: 16,
                    padding: "18px 24px",
                    fontSize: 18,
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    color: "#4A2875",
                    borderLeft: "4px solid #7B2CBF",
                  }}
                >
                  &quot;{quote}&quot;
                </div>
              ))
            ) : (
              <div
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderRadius: 16,
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
                gap: 12,
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
                borderRadius: 20,
              }}
            >
              Swipe smarter. Grow wiser.
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (error) {
    console.error("OG Image generation error:", error);
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
            fontSize: 36,
            fontWeight: 500,
          }}
        >
          BloomScroll Garden
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
