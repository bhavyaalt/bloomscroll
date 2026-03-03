import { createRouteHandlerClient } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  // Get redirect URL from cookie (set during auth page)
  const cookieStore = await cookies();
  const redirectTo = cookieStore.get("auth_redirect")?.value || "/app";

  if (code) {
    const supabase = await createRouteHandlerClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(`${origin}/auth?error=Could not authenticate`);
    }
  }

  // Clear the redirect cookie and redirect to the intended destination
  const response = NextResponse.redirect(`${origin}${redirectTo}`);
  response.cookies.delete("auth_redirect");
  return response;
}
