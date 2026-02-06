import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ohwtiwhbqsiwpktteaur.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3Rpd2hicXNpd3BrdHRlYXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDM0OTUsImV4cCI6MjA4NTMxOTQ5NX0.TmXl_O0GF8LksqFGh5R69R2iTQrbws_BBM-44ZiRv9A';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error("Auth callback error:", error);
      return NextResponse.redirect(`${origin}/auth?error=Could not authenticate`);
    }
  }

  // Redirect to the app after successful authentication
  return NextResponse.redirect(`${origin}/app`);
}
