import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase-server";
import crypto from "crypto";

// In-memory store for authorization codes (replace with Redis/DB in production)
// Codes expire after 10 minutes
const authorizationCodes = new Map<
  string,
  {
    userId: string;
    clientId: string;
    redirectUri: string;
    scope: string;
    codeChallenge?: string;
    codeChallengeMethod?: string;
    expiresAt: number;
  }
>();

// Clean up expired codes periodically
function cleanupExpiredCodes() {
  const now = Date.now();
  for (const [code, data] of authorizationCodes) {
    if (data.expiresAt < now) {
      authorizationCodes.delete(code);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      client_id,
      redirect_uri,
      response_type,
      scope,
      state,
      code_challenge,
      code_challenge_method,
    } = body;

    // Validate required fields
    if (!client_id || !redirect_uri) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Validate response_type
    if (response_type !== "code") {
      return NextResponse.json(
        { error: "Unsupported response_type. Only 'code' is supported." },
        { status: 400 }
      );
    }

    // Validate redirect_uri (must be HTTPS in production, allow localhost for dev)
    const redirectUrl = new URL(redirect_uri);
    const isLocalhost =
      redirectUrl.hostname === "localhost" ||
      redirectUrl.hostname === "127.0.0.1";
    if (!isLocalhost && redirectUrl.protocol !== "https:") {
      return NextResponse.json(
        { error: "redirect_uri must use HTTPS" },
        { status: 400 }
      );
    }

    // Clean up old codes
    cleanupExpiredCodes();

    // Generate authorization code
    const code = crypto.randomBytes(32).toString("hex");

    // Store the code with metadata (10-minute expiry)
    authorizationCodes.set(code, {
      userId: user.id,
      clientId: client_id,
      redirectUri: redirect_uri,
      scope: scope || "openid profile email",
      codeChallenge: code_challenge,
      codeChallengeMethod: code_challenge_method,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Build redirect URL with code and state
    const url = new URL(redirect_uri);
    url.searchParams.set("code", code);
    if (state) url.searchParams.set("state", state);

    return NextResponse.json({ redirect_url: url.toString() });
  } catch (err) {
    console.error("OAuth consent approve error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Token exchange endpoint — exchange authorization code for user info
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  cleanupExpiredCodes();

  const codeData = authorizationCodes.get(code);
  if (!codeData) {
    return NextResponse.json(
      { error: "Invalid or expired authorization code" },
      { status: 400 }
    );
  }

  // Code is single-use — delete after retrieval
  authorizationCodes.delete(code);

  // Return the authorization metadata (for internal verification)
  return NextResponse.json({
    user_id: codeData.userId,
    client_id: codeData.clientId,
    scope: codeData.scope,
  });
}
