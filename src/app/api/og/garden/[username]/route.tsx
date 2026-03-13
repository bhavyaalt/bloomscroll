import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!url || !key) {
      return new ImageResponse(
        (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF5FE", color: "#7B2CBF", fontSize: 36 }}>
            Config error
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    const supabase = createClient(url, key);

    // Try fc_username first
    let profile = null;
    const { data: fcProfile } = await supabase
      .from("bloomscroll_profiles")
      .select("id, email, fc_username, fc_display_name, fc_pfp_url")
      .eq("fc_username", username)
      .maybeSingle();

    if (fcProfile) {
      profile = fcProfile;
    } else {
      // Try email prefix match
      const { data: emailProfiles } = await supabase
        .from("bloomscroll_profiles")
        .select("id, email, fc_username, fc_display_name, fc_pfp_url")
        .ilike("email", `${username}@%`)
        .limit(1);
      
      profile = emailProfiles?.[0] || null;
    }

    if (!profile) {
      return new ImageResponse(
        (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF5FE", color: "#7B2CBF", fontSize: 48, fontWeight: 500 }}>
            Garden not found
          </div>
        ),
        { width: 1200, height: 630 }
      );
    }

    // Get pin count
    const { count } = await supabase
      .from("bloomscroll_pinned_cards")
      .select("*", { count: "exact", head: true })
      .eq("user_id", profile.id);

    const displayName = profile.fc_display_name || profile.fc_username || profile.email?.split("@")[0] || "Reader";
    const pinCount = count || 0;
    const initial = displayName.charAt(0).toUpperCase();

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(145deg, #FFF5FE 0%, #F3EAFA 50%, #E8D5F5 100%)",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              background: "linear-gradient(135deg, #7B2CBF 0%, #9B4ED8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 56,
              fontWeight: 600,
            }}
          >
            {initial}
          </div>
          <div style={{ fontSize: 48, fontWeight: 600, color: "#7B2CBF" }}>
            {displayName}&apos;s Garden
          </div>
          <div style={{ fontSize: 28, color: "#9B4ED8", display: "flex", alignItems: "center", gap: 8 }}>
            🌱 {pinCount} quotes planted
          </div>
          <div style={{ fontSize: 24, color: "#7B2CBF", marginTop: 20 }}>
            bloomscroll.club
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (err) {
    console.error("OG garden error:", err);
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFF5FE", color: "#7B2CBF", fontSize: 36 }}>
          BloomScroll Garden
        </div>
      ),
      { width: 1200, height: 630 }
    );
  }
}
