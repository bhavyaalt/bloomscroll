import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { StarkZap, Amount, mainnetTokens, sepoliaTokens, StarkSigner, fromAddress } from "starkzap";
import type { Token } from "starkzap";

// ============================================
// CONFIGURATION
// ============================================

const NETWORK = process.env.STARKNET_NETWORK === "mainnet" ? "mainnet" : "sepolia";
const tokens = NETWORK === "mainnet" ? mainnetTokens : sepoliaTokens;
const REWARD_TOKEN: Token = tokens.WBTC;
const TREASURY_PRIVATE_KEY = process.env.STARKZAP_TREASURY_KEY;

// Rate limiting: max claims per hour per user
const CLAIMS_PER_HOUR = 10;
const claimCounts = new Map<string, { count: number; resetAt: number }>();

// Clean up expired rate limit entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of claimCounts) {
    if (value.resetAt < now) claimCounts.delete(key);
  }
}, 600_000);

// ============================================
// HELPERS
// ============================================

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey);
}

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const userLimit = claimCounts.get(userId);

  if (!userLimit || userLimit.resetAt < now) {
    claimCounts.set(userId, { count: 1, resetAt: now + 3600000 });
    return true;
  }

  if (userLimit.count >= CLAIMS_PER_HOUR) {
    return false;
  }

  userLimit.count++;
  return true;
}

// ============================================
// API ROUTE
// ============================================

export async function POST(request: NextRequest) {
  try {
    // Authenticate via Supabase session
    const authHeader = request.headers.get("authorization");
    const supabase = getSupabaseAdmin();
    let authenticatedUserId: string | null = null;

    if (supabase && authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const { data: { user } } = await supabase.auth.getUser(token);
      authenticatedUserId = user?.id ?? null;
    }

    // For hackathon: allow unauthenticated claims but with stricter rate limiting
    const body = await request.json();
    const { recipientAddress, amount, rewardCount } = body;

    // Validate inputs
    if (!recipientAddress || typeof recipientAddress !== "string") {
      return NextResponse.json(
        { success: false, error: "Invalid recipient address" },
        { status: 400 }
      );
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Max claim limit: 0.0001 BTC (10,000 sats) per transaction
    if (parseFloat(amount) > 0.0001) {
      return NextResponse.json(
        { success: false, error: "Amount exceeds maximum claim limit" },
        { status: 400 }
      );
    }

    // Rate limit by authenticated user or by recipient address
    const rateLimitKey = authenticatedUserId || recipientAddress;
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Try again later." },
        { status: 429 }
      );
    }

    // Check treasury configuration
    if (!TREASURY_PRIVATE_KEY) {
      console.error("STARKZAP_TREASURY_KEY not configured");
      return NextResponse.json(
        { success: false, error: "Rewards system not configured" },
        { status: 500 }
      );
    }

    // Initialize SDK
    const paymasterUrl = process.env.AVNU_PAYMASTER_URL;
    const sdk = new StarkZap({
      network: NETWORK,
      paymaster: paymasterUrl ? { nodeUrl: paymasterUrl } : undefined,
    });

    // Connect treasury wallet
    const { wallet: treasury } = await sdk.onboard({
      strategy: "signer",
      account: {
        signer: new StarkSigner(TREASURY_PRIVATE_KEY),
      },
      deploy: "never",
    });

    // Check treasury balance
    const balance = await treasury.balanceOf(REWARD_TOKEN);
    const rewardAmount = Amount.parse(amount, REWARD_TOKEN);

    if (balance.lt(rewardAmount)) {
      console.error("Insufficient treasury balance");
      return NextResponse.json(
        { success: false, error: "Rewards pool temporarily empty" },
        { status: 503 }
      );
    }

    // Transfer reward to user
    const tx = await treasury.transfer(REWARD_TOKEN, [
      {
        to: fromAddress(recipientAddress),
        amount: rewardAmount,
      },
    ]);

    await tx.wait();

    console.log(`Reward distributed: ${amount} BTC (${rewardCount} events) to ${recipientAddress}, tx: ${tx.hash}, user: ${authenticatedUserId || "anonymous"}`);

    return NextResponse.json({
      success: true,
      txHash: tx.hash,
      amount,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to process reward claim";
    console.error("Reward claim failed:", error);

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    network: NETWORK,
    treasuryConfigured: !!TREASURY_PRIVATE_KEY,
  });
}
