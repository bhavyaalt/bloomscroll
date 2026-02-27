"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { pay, getPaymentStatus } from "@base-org/account";
import { useAuth } from "@/components/AuthProvider";
import { useFarcaster } from "@/components/FarcasterProvider";
import { recordSubscription } from "@/lib/supabase";

// Your receiving wallet address (bhavyagor.eth)
const PAYMENT_ADDRESS = "0x13aD115e356Cbcb7438CD114d8b182347B338738";
const SUBSCRIPTION_AMOUNT = "5.00"; // $5 USDC
const IS_TESTNET = true; // Set to false for mainnet

type PaymentStatus = "idle" | "pending" | "verifying" | "success" | "error";

export default function SubscribePage() {
  const router = useRouter();
  const { user, profile, loading, isSubscribed, isAuthenticated, refreshProfile } = useAuth();
  const { isInFrame, walletAddress: fcWallet, username, displayName, pfpUrl, requestWallet } = useFarcaster();
  
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"base" | "farcaster">("base");

  // Redirect if not authenticated (email or Farcaster)
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth?redirect=/subscribe");
    }
  }, [isAuthenticated, loading, router]);

  // Redirect if already subscribed
  useEffect(() => {
    if (isSubscribed) {
      router.push("/app");
    }
  }, [isSubscribed, router]);

  const handlePayment = async () => {
    if (!profile) return;
    
    setStatus("pending");
    setError(null);

    try {
      // Trigger Base Pay
      const payment = await pay({
        amount: SUBSCRIPTION_AMOUNT,
        to: PAYMENT_ADDRESS,
        testnet: IS_TESTNET,
        payerInfo: {
          requests: [
            { type: "onchainAddress" }
          ]
        }
      });

      console.log("Payment initiated:", payment);
      setTxHash(payment.id);
      setStatus("verifying");

      // Get wallet from payment response
      const walletAddress = payment.payerInfoResponses?.onchainAddress || "unknown";

      // Poll for payment completion
      let attempts = 0;
      const maxAttempts = 30;
      
      while (attempts < maxAttempts) {
        const { status: paymentStatus } = await getPaymentStatus({
          id: payment.id,
          testnet: IS_TESTNET
        });

        if (paymentStatus === "completed") {
          // Record subscription in database
          const success = await recordSubscription(
            profile.id,
            walletAddress,
            payment.id,
            SUBSCRIPTION_AMOUNT
          );

          if (success) {
            await refreshProfile();
            setStatus("success");
          } else {
            throw new Error("Failed to record subscription");
          }
          return;
        }

        if (paymentStatus === "failed") {
          throw new Error("Payment failed");
        }

        // Wait 2 seconds before next check
        await new Promise((resolve) => setTimeout(resolve, 2000));
        attempts++;
      }

      throw new Error("Payment verification timed out");
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "Payment failed. Please try again.");
      setStatus("error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EACCD4] flex items-center justify-center">
        <div className="animate-pulse font-impact text-4xl text-[#007A5E]">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EACCD4] text-[#007A5E]">
      {/* Header */}
      <header className="border-b border-[#007A5E]/20">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-baseline">
            <span className="font-impact text-2xl uppercase tracking-tighter">Scroll</span>
            <span className="font-times italic text-2xl">bliss</span>
          </Link>
          <Link href="/app" className="text-sm font-bold uppercase hover:opacity-70">
            Back to App
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-6 py-16">
        {status === "success" ? (
          // Success State
          <div className="text-center">
            <div className="w-20 h-20 bg-[#007A5E] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-[#EACCD4]">✓</span>
            </div>
            <h1 className="font-impact text-4xl uppercase mb-4">Welcome to Scrollbliss Pro!</h1>
            <p className="font-times italic text-xl mb-8 opacity-80">
              Your subscription is now active.
            </p>
            {txHash && (
              <p className="text-xs opacity-60 mb-8 break-all">
                Transaction: {txHash}
              </p>
            )}
            <Link
              href="/app"
              className="inline-block px-8 py-4 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-wide hover:bg-[#004a39] transition-colors"
            >
              Start Reading →
            </Link>
          </div>
        ) : (
          // Payment Form
          <>
            <div className="text-center mb-12">
              <span className="inline-block py-1 px-3 border border-[#007A5E] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Membership
              </span>
              <h1 className="font-impact text-5xl uppercase mb-4">
                Unlock Scrollbliss Pro
              </h1>
              <p className="font-times italic text-xl opacity-80">
                Infinite wisdom for the price of a coffee.
              </p>
              {user && (
                <p className="text-sm opacity-60 mt-4">
                  Logged in as {user.email}
                </p>
              )}
              {!user && isInFrame && (displayName || username) && (
                <p className="text-sm opacity-60 mt-4">
                  Connected as @{username || displayName}
                </p>
              )}
            </div>

            {/* Pricing Card */}
            <div className="bg-white border border-[#007A5E] p-1 shadow-[8px_8px_0px_0px_rgba(0,122,94,1)] mb-8">
              <div className="border border-[#007A5E] p-8 bg-[#EACCD4]">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-impact">$5</span>
                  <span className="font-times italic text-xl opacity-70">/ month</span>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#007A5E]/60 mb-6">
                  Paid in USDC on Base
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#007A5E] text-[#EACCD4] text-xs">✓</span>
                    <span className="font-bold">Unlimited Daily Reads</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#007A5E] text-[#EACCD4] text-xs">✓</span>
                    <span className="font-bold">Full Archive (136+ Ideas)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#007A5E] text-[#EACCD4] text-xs">✓</span>
                    <span className="font-bold">Sync Across Devices</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 flex items-center justify-center bg-[#007A5E] text-[#EACCD4] text-xs">✓</span>
                    <span className="font-bold">No Ads, Ever</span>
                  </li>
                </ul>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}

                {/* Payment Button */}
                {status === "idle" || status === "error" ? (
                  <div className="space-y-4">
                    {/* Farcaster User Info */}
                    {isInFrame && (displayName || username) && (
                      <div className="flex items-center gap-3 p-3 bg-[#007A5E]/10 rounded-lg mb-4">
                        {pfpUrl && (
                          <img src={pfpUrl} alt="" className="w-10 h-10 rounded-full" />
                        )}
                        <div>
                          <p className="font-bold">{displayName || username}</p>
                          {fcWallet && (
                            <p className="text-xs opacity-60">
                              {fcWallet.slice(0, 6)}...{fcWallet.slice(-4)}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Payment Method Tabs - only show if in Farcaster */}
                    {isInFrame && (
                      <div className="flex gap-2 mb-4">
                        <button
                          onClick={() => setPaymentMethod("farcaster")}
                          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                            paymentMethod === "farcaster"
                              ? "bg-[#855DCD] text-white"
                              : "bg-white/50 text-[#007A5E]"
                          }`}
                        >
                          🟣 Farcaster Wallet
                        </button>
                        <button
                          onClick={() => setPaymentMethod("base")}
                          className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all ${
                            paymentMethod === "base"
                              ? "bg-[#0052FF] text-white"
                              : "bg-white/50 text-[#007A5E]"
                          }`}
                        >
                          🔵 Base Pay
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handlePayment}
                      className="w-full py-4 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-widest hover:bg-[#004a39] transition-all hover:scale-[1.02] shadow-lg"
                    >
                      Pay $5 USDC
                    </button>
                    <p className="text-xs text-center opacity-60">
                      {isInFrame && paymentMethod === "farcaster" 
                        ? "Pay with your connected Farcaster wallet"
                        : "Powered by Base Pay • Gas-free checkout"
                      }
                    </p>
                  </div>
                ) : status === "pending" ? (
                  <div className="text-center py-4">
                    <div className="animate-spin w-8 h-8 border-2 border-[#007A5E] border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="font-bold">Waiting for wallet...</p>
                    <p className="text-sm opacity-60">Confirm the transaction in your wallet</p>
                  </div>
                ) : status === "verifying" ? (
                  <div className="text-center py-4">
                    <div className="animate-pulse">
                      <div className="w-8 h-8 bg-[#007A5E] rounded-full mx-auto mb-4"></div>
                    </div>
                    <p className="font-bold">Verifying payment...</p>
                    <p className="text-sm opacity-60">This may take a few seconds</p>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex justify-center gap-8 opacity-50">
              <div className="flex items-center gap-2 text-sm font-bold">
                <div className="w-5 h-5 rounded-full bg-[#007A5E]"></div>
                BASE
              </div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <div className="w-5 h-5 border-2 border-[#007A5E] rounded-full flex items-center justify-center text-xs">$</div>
                USDC
              </div>
            </div>

            {/* Testnet Notice */}
            {IS_TESTNET && (
              <div className="mt-8 p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-800 text-sm">
                <strong>🧪 Testnet Mode:</strong> This is using Base Sepolia testnet. Get test USDC from{" "}
                <a
                  href="https://faucet.circle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Circle Faucet
                </a>{" "}
                (select "Base Sepolia").
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#007A5E]/20 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm opacity-60">
          <p>Cancel anytime. 100% money-back guarantee.</p>
        </div>
      </footer>
    </div>
  );
}
