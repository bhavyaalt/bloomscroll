import { NextResponse } from "next/server";
import { getActiveTodayCount } from "@/lib/supabase";

export async function GET() {
  const count = await getActiveTodayCount();
  return NextResponse.json(
    { count },
    {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    }
  );
}
