import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  
  let displayName = username.charAt(0).toUpperCase() + username.slice(1);
  let pinCount = 0;
  
  // Try to fetch real data
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (url && key) {
      const supabase = createClient(url, key);
      
      // Find profile
      const { data: profile } = await supabase
        .from("bloomscroll_profiles")
        .select("id, email, fc_username, fc_display_name")
        .or(`fc_username.eq.${username},email.ilike.${username}@%`)
        .limit(1)
        .maybeSingle();
      
      if (profile) {
        displayName = profile.fc_display_name || profile.fc_username || profile.email?.split("@")[0] || displayName;
        
        // Get pin count
        const { count } = await supabase
          .from("bloomscroll_pinned_cards")
          .select("*", { count: "exact", head: true })
          .eq("user_id", profile.id);
        
        pinCount = count || 0;
      }
    }
  } catch {
    // Use defaults
  }

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
          background: "#FFF5FE",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            background: "#7B2CBF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 48,
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          {initial}
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: "#7B2CBF", marginBottom: 8 }}>
          {displayName} Garden
        </div>
        <div style={{ fontSize: 24, color: "#9B4ED8", marginBottom: 16 }}>
          {pinCount > 0 ? `${pinCount} quotes planted` : "Wisdom collection"}
        </div>
        <div style={{ fontSize: 20, color: "#7B2CBF", opacity: 0.8 }}>
          bloomscroll.club
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
