"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { signInWithProvider } from "@/lib/supabase";
import {
  PRICING,
  REGION_NAMES,
  Region,
  BillingCycle,
  detectRegionClient,
  formatPrice,
  getCheckoutUrl,
  calculateYearlySavings
} from "@/lib/pricing";

function SubscribeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoCheckout = searchParams.get('auto_checkout') === '1';
  const autoCheckoutFiredRef = useRef(false);
  const { user, profile, loading, isSubscribed, isAuthenticated } = useAuth();

  const [region, setRegion] = useState<Region>('OTHER');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [detectingRegion, setDetectingRegion] = useState(true);
  const [showRegionSelector, setShowRegionSelector] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Detect region on mount
  useEffect(() => {
    detectRegionClient().then(detectedRegion => {
      setRegion(detectedRegion);
      setDetectingRegion(false);
    });
  }, []);

  // Auto-checkout after OAuth redirect
  useEffect(() => {
    if (!loading && isAuthenticated && autoCheckout && !autoCheckoutFiredRef.current) {
      autoCheckoutFiredRef.current = true;
      const successUrl = `${window.location.origin}/subscribe/success`;
      const pricing = PRICING[region];
      const plan = pricing[billingCycle];
      const checkoutUrl = getCheckoutUrl(plan.productId, user?.email || undefined, successUrl);
      window.location.href = checkoutUrl;
    }
  }, [loading, isAuthenticated, autoCheckout, region, billingCycle, user]);

  // Show message if already subscribed
  const alreadySubscribed = !loading && isSubscribed;

  const pricing = PRICING[region];
  const plan = pricing[billingCycle];
  const savings = calculateYearlySavings(region);

  const handleSocialSignIn = async (provider: 'google' | 'twitter') => {
    setSocialLoading(provider);
    setAuthError(null);
    try {
      document.cookie = `auth_redirect=/subscribe?auto_checkout=1; path=/; max-age=600; SameSite=Lax`;
      await signInWithProvider(provider);
    } catch {
      setAuthError(`Could not sign in with ${provider === 'google' ? 'Google' : 'X'}. Please try again.`);
      setSocialLoading(null);
    }
  };

  const handleCheckout = () => {
    const successUrl = `${window.location.origin}/subscribe/success`;
    const checkoutUrl = getCheckoutUrl(plan.productId, user?.email || undefined, successUrl);
    window.location.href = checkoutUrl;
  };

  if (detectingRegion) {
    return (
      <div className="min-h-screen bg-bglight flex items-center justify-center">
        <div className="animate-pulse text-4xl font-bold text-bgdark">
          Loading...
        </div>
      </div>
    );
  }

  // Auto-checkout redirect screen
  if (!loading && isAuthenticated && autoCheckout) {
    return (
      <div className="min-h-screen bg-bglight flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⟳</div>
          <p className="font-bold text-xl text-bgdark">Taking you to checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bglight text-bgdark">
      {/* Header */}
      <header className="border-b border-sage">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-baseline">
            <span className="font-impact text-xl sm:text-2xl uppercase tracking-tighter">Bloom</span>
            <span className="font-times italic text-xl sm:text-2xl">scroll</span>
          </Link>
          <Link href="/app" className="text-xs sm:text-sm font-bold uppercase hover:opacity-70">
            Back to App
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {alreadySubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 p-8 bg-[#007A5E]/10 border border-[#007A5E]/20 rounded-2xl"
          >
            <span className="text-4xl mb-4 block">🌿</span>
            <h2 className="font-impact text-3xl uppercase mb-2 text-[#007A5E]">
              You&apos;re Already Pro!
            </h2>
            <p className="opacity-70 mb-6">
              You have full access to all premium features.
            </p>
            <Link
              href="/app"
              className="inline-block px-8 py-3 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-widest rounded-xl hover:bg-[#004a39] transition-all"
            >
              Back to App
            </Link>
          </motion.div>
        )}

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mb-8 sm:mb-12 ${alreadySubscribed ? "hidden" : ""}`}
        >
          <span className="inline-block py-1 px-3 border border-[#007A5E] rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4">
            Pro Membership
          </span>
          <h1 className="font-impact text-3xl sm:text-5xl md:text-6xl uppercase mb-3 sm:mb-4">
            Unlock Your Potential
          </h1>
          <p className="font-times italic text-base sm:text-xl opacity-80 max-w-md mx-auto">
            Unlimited wisdom, ad-free experience, and exclusive features.
          </p>
          {user && (
            <p className="text-xs sm:text-sm opacity-60 mt-3 sm:mt-4 truncate px-4">
              Logged in as {user.email}
            </p>
          )}
        </motion.div>

        {!alreadySubscribed && <>
        {/* Region & Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Region indicator */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowRegionSelector(!showRegionSelector)}
              className="flex items-center gap-2 text-sm opacity-60 hover:opacity-100 transition-opacity"
            >
              <span>{REGION_NAMES[region]}</span>
              <span className="text-xs">▼</span>
            </button>
          </div>

          {/* Region selector dropdown */}
          {showRegionSelector && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-2 mb-4"
            >
              {(Object.keys(REGION_NAMES) as Region[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRegion(r);
                    setShowRegionSelector(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    region === r
                      ? 'bg-[#007A5E] text-[#EACCD4]'
                      : 'bg-white/50 hover:bg-white'
                  }`}
                >
                  {REGION_NAMES[r]}
                </button>
              ))}
            </motion.div>
          )}

          {/* Billing cycle toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white/50 rounded-full p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#007A5E] text-[#EACCD4]'
                    : 'hover:bg-white/50'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                  billingCycle === 'yearly'
                    ? 'bg-[#007A5E] text-[#EACCD4]'
                    : 'hover:bg-white/50'
                }`}
              >
                Yearly
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  billingCycle === 'yearly'
                    ? 'bg-[#EACCD4] text-[#007A5E]'
                    : 'bg-[#007A5E] text-[#EACCD4]'
                }`}>
                  Save {savings.percentage}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border-2 border-[#007A5E] rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,122,94,1)] mb-8"
        >
          <div className="p-8 md:p-10">
            {/* Discount Badge */}
            <div className="flex justify-center mb-4">
              <span className="bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {pricing.discountPercent}% OFF
              </span>
            </div>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl line-through opacity-40">
                  {pricing.symbol}{plan.originalPrice}
                </span>
                <span className="text-6xl md:text-7xl font-impact text-[#007A5E]">
                  {pricing.symbol}{plan.price}
                </span>
                <span className="font-times italic text-xl opacity-70">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-sm opacity-60 mt-2">
                  That's just {pricing.symbol}{Math.round(plan.price / 12)}/month
                </p>
              )}
              <p className="text-xs uppercase tracking-widest opacity-40 mt-2">
                Billed in {pricing.currency}
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {[
                { icon: "∞", text: "Unlimited Daily Reads" },
                { icon: "📚", text: "Full Archive (136+ Ideas)" },
                { icon: "📖", text: "Full Chapter Deep Dives" },
                { icon: "🔄", text: "Sync Across Devices" },
                { icon: "🚫", text: "No Ads, Ever" },
                { icon: "⚡", text: "Early Access to New Features" },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-10 h-10 flex items-center justify-center bg-[#007A5E]/10 rounded-xl text-xl">
                    {feature.icon}
                  </span>
                  <span className="font-bold">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button — conditional on auth state */}
            {isAuthenticated ? (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full py-4 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-widest text-lg hover:bg-[#004a39] transition-all hover:scale-[1.02] rounded-xl shadow-lg disabled:opacity-50"
              >
                {loading ? "Loading..." : "Get Pro Now"}
              </button>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialSignIn("google")}
                  disabled={!!socialLoading}
                  className="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all bg-white text-bgdark border-2 border-sage hover:border-bgdark flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "google" ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <svg className="size-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  Sign in with Google
                </button>

                <button
                  onClick={() => handleSocialSignIn("twitter")}
                  disabled={!!socialLoading}
                  className="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all bg-black text-white border-2 border-black hover:bg-black/90 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "twitter" ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  Sign in with X
                </button>

                {authError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {authError}
                  </div>
                )}
              </div>
            )}

            <p className="text-xs text-center opacity-60 mt-4">
              Secure checkout powered by Dodo Payments
            </p>
          </div>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-sm opacity-60 mb-12"
        >
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <span>↩️</span>
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💬</span>
            <span>24/7 Support</span>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="font-impact text-2xl uppercase text-center mb-6">
            Common Questions
          </h2>

          {[
            {
              q: "Can I cancel anytime?",
              a: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit/debit cards, UPI (for India), and various local payment methods through our payment partner."
            },
            {
              q: "Is there a free trial?",
              a: "We offer a generous free tier with 5 cards per day. Try it out before subscribing!"
            },
            {
              q: "Can I switch between monthly and yearly?",
              a: "Yes, you can switch your billing cycle at any time. Changes will apply at your next billing date."
            },
          ].map((faq, i) => (
            <details key={i} className="group bg-white/50 rounded-xl">
              <summary className="flex items-center justify-between p-4 cursor-pointer font-bold">
                {faq.q}
                <span className="transform group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="px-4 pb-4 opacity-70">{faq.a}</p>
            </details>
          ))}
        </motion.div>
        </>}
      </main>

      {/* Footer */}
      <footer className="border-t border-sage py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm opacity-60">
          <p>Questions? Reach out to support@bloomscroll.club</p>
        </div>
      </footer>
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bglight flex items-center justify-center">
        <div className="animate-pulse text-4xl font-bold text-bgdark">
          Loading...
        </div>
      </div>
    }>
      <SubscribeContent />
    </Suspense>
  );
}
