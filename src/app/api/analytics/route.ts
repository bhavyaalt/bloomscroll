import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const event = typeof body.event === "string" ? body.event.slice(0, 120) : "";
    const metadata = body.metadata && typeof body.metadata === "object" ? body.metadata : {};

    if (!event) {
      return NextResponse.json({ error: "Event required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ ok: true });
    }

    const forwardedFor = request.headers.get("x-forwarded-for");
    const userAgent = request.headers.get("user-agent");

    const { error } = await supabase
      .from("bloomscroll_growth_events")
      .insert({
        event_name: event,
        metadata,
        path: request.headers.get("referer") || null,
        ip_address: forwardedFor?.split(",")[0]?.trim() || null,
        user_agent: userAgent || null,
      });

    if (error) {
      console.error("Growth event insert failed:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Growth event route failed:", error);
    return NextResponse.json({ ok: true });
  }
}
