"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { signInWithProvider } from "@/lib/supabase";
import { trackGrowthEvent } from "@/lib/analytics";
import {
  PRICING,
  REGION_NAMES,
  Region,
  BillingCycle,
  detectRegionClient,
  getCheckoutUrl,
  calculateYearlySavings,
} from "@/lib/pricing";

const SOURCE_COPY: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  save_limit: {
    eyebrow: "Unlimited Library",
    title: "Keep Every Quote Worth Revisiting",
    subtitle: "Turn your saved cards into a permanent library and review system.",
  },
  pin_limit: {
    eyebrow: "Grow Your Garden",
    title: "Build A Garden You Actually Keep",
    subtitle: "Pin every quote that matters and turn your garden into your public wisdom board.",
  },
  saved_cards_view: {
    eyebrow: "Library Upgrade",
    title: "Your Best Quotes Should Not Expire",
    subtitle: "Pro keeps your full library, review queue, and deeper reading tools together.",
  },
  profile_review_preview: {
    eyebrow: "Remember What You Read",
    title: "Turn Reading Into Memory",
    subtitle: "Use review mode to keep ideas alive instead of letting them vanish after one scroll.",
  },
  profile_book_preview: {
    eyebrow: "Go Deeper By Book",
    title: "Stop Reading Randomly",
    subtitle: "Browse by book, listen in audio mode, and follow ideas all the way through.",
  },
  feed_controls: {
    eyebrow: "Upgrade Your Ritual",
    title: "Listen, Review, And Go Deeper",
    subtitle: "Pro turns the feed into a complete daily learning system.",
  },
};

export default function SubscribeContent({ initialRegion }: { initialRegion: Region }) {
  const searchParams = useSearchParams();
  const autoCheckout = searchParams.get("auto_checkout") === "1";
  const source = searchParams.get("source") || "default";
  const autoCheckoutFiredRef = useRef(false);
  const trackedViewRef = useRef(false);
  const { user, loading, isSubscribed, isAuthenticated } = useAuth();

  const [region, setRegion] = useState<Region>(initialRegion);
  const [regionResolved, setRegionResolved] = useState(initialRegion !== "OTHER");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  const pricing = PRICING[region];
  const plan = pricing[billingCycle];
  const savings = calculateYearlySavings(region);
  const sourceCopy = SOURCE_COPY[source] || {
    eyebrow: "Pro Membership",
    title: "Unlock Your Potential",
    subtitle: "Unlimited wisdom, ad-free experience, and exclusive features.",
  };

  useEffect(() => {
    if (initialRegion !== "OTHER") return;

    let cancelled = false;

    detectRegionClient().then((detectedRegion) => {
      if (cancelled) return;

      if (detectedRegion !== "OTHER") {
        setRegion(detectedRegion);
      }

      setRegionResolved(true);
    });

    return () => {
      cancelled = true;
    };
  }, [initialRegion]);

  useEffect(() => {
    if (!regionResolved) return;
    if (!loading && isAuthenticated && autoCheckout && !autoCheckoutFiredRef.current) {
      autoCheckoutFiredRef.current = true;
      const successUrl = `${window.location.origin}/subscribe/success?billing=${billingCycle}&source=${encodeURIComponent(source)}`;
      const checkoutUrl = getCheckoutUrl(plan.productId, user?.email || undefined, successUrl);
      window.location.href = checkoutUrl;
    }
  }, [autoCheckout, billingCycle, isAuthenticated, loading, plan.productId, regionResolved, source, user]);

  useEffect(() => {
    if (trackedViewRef.current) return;
    trackedViewRef.current = true;
    trackGrowthEvent({
      event: "subscribe_page_viewed",
      metadata: { source, is_authenticated: isAuthenticated, region },
    });
  }, [isAuthenticated, region, source]);

  const handleSocialSignIn = async (provider: "google" | "twitter") => {
    setSocialLoading(provider);
    setAuthError(null);
    try {
      trackGrowthEvent({
        event: "subscribe_auth_started",
        metadata: { provider, source, region },
      });
      document.cookie = `auth_redirect=/subscribe?auto_checkout=1&source=${encodeURIComponent(source)}; path=/; max-age=600; SameSite=Lax`;
      await signInWithProvider(provider);
    } catch {
      setAuthError(`Could not sign in with ${provider === "google" ? "Google" : "X"}. Please try again.`);
      setSocialLoading(null);
    }
  };

  const handleCheckout = () => {
    trackGrowthEvent({
      event: "checkout_started",
      metadata: {
        source,
        billing_cycle: billingCycle,
        region,
        authenticated: isAuthenticated,
      },
    });
    const successUrl = `${window.location.origin}/subscribe/success?billing=${billingCycle}&source=${encodeURIComponent(source)}`;
    const checkoutUrl = getCheckoutUrl(plan.productId, user?.email || undefined, successUrl);
    window.location.href = checkoutUrl;
  };

  const alreadySubscribed = !loading && isSubscribed;

  if ((!regionResolved) || (!loading && isAuthenticated && autoCheckout)) {
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
    <div className="min-h-screen bg-gradient-to-b from-[#102219] to-[#0a1610] text-white">
      <header className="border-b border-white/5 bg-[#102219]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-7 flex items-center justify-center bg-primary rounded-lg text-[#102219]">
              <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-primary">BloomScroll</span>
          </Link>
          <Link href="/app" className="text-xs sm:text-sm font-bold uppercase text-white/55 hover:text-white/80">
            Back to App
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {alreadySubscribed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center mb-12 p-8 bg-white/5 border border-white/10 rounded-3xl"
          >
            <span className="text-4xl mb-4 block text-primary">🌿</span>
            <h2 className="font-impact text-3xl uppercase mb-2 text-primary">You&apos;re Already Pro!</h2>
            <p className="text-white/60 mb-6">You have full access to all premium features.</p>
            <Link
              href="/app"
              className="inline-block px-8 py-3 bg-primary text-[#102219] font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all"
            >
              Back to App
            </Link>
          </motion.div>
        )}

        {!alreadySubscribed && (
          <>
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                <span className="inline-flex py-1 px-3 border border-primary/30 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 text-primary bg-primary/10">
                  {sourceCopy.eyebrow}
                </span>
                <h1 className="font-impact text-4xl sm:text-6xl uppercase mb-4 text-primary leading-none">
                  {sourceCopy.title}
                </h1>
                <p className="font-times italic text-lg sm:text-2xl text-white/75 max-w-xl">
                  {sourceCopy.subtitle}
                </p>
                {user && (
                  <p className="text-xs sm:text-sm text-white/45 mt-4 truncate">
                    Logged in as {user.email}
                  </p>
                )}

                <div className="mt-8 grid gap-3">
                  {[
                    {
                      title: "Unlimited reading",
                      copy: "No daily cap. Keep the session going when you are in flow.",
                      icon: (
                        <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 6.75h-1.5a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 01-4.5 4.5H6m0 0H4.5m1.5 0v1.5a4.5 4.5 0 004.5 4.5h1.5m6-16.5h1.5m-1.5 0v-1.5a4.5 4.5 0 00-4.5-4.5h-1.5m6 16.5v1.5a4.5 4.5 0 01-4.5 4.5h-1.5" />
                        </svg>
                      ),
                    },
                    {
                      title: "Remember what you read",
                      copy: "Turn saved quotes into a review queue that actually sticks.",
                      icon: (
                        <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                        </svg>
                      ),
                    },
                    {
                      title: "Grow a real garden",
                      copy: "Pin, organize, and keep the quotes you want to return to.",
                      icon: (
                        <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C9.243 2 7 4.243 7 7c0 2.475 2.5 6.225 4.35 8.75a.812.812 0 001.3 0C14.5 13.225 17 9.475 17 7c0-2.757-2.243-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      ),
                    },
                    {
                      title: "Go deeper by book",
                      copy: "Browse books, unlock audio mode, and open premium reading views.",
                      icon: (
                        <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      ),
                    },
                  ].map((feature) => (
                    <div key={feature.title} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 rounded-xl bg-primary/12 p-2 text-primary">{feature.icon}</div>
                        <div>
                          <p className="font-semibold text-white">{feature.title}</p>
                          <p className="mt-1 text-sm text-white/50">{feature.copy}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[30px] border border-white/10 bg-[#13261d] p-5 shadow-2xl shadow-black/25"
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">Choose plan</p>
                    <p className="text-sm text-white/45 mt-1">Secure checkout powered by Dodo Payments</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/70">
                    {REGION_NAMES[region]}
                  </div>
                </div>

                <div className="inline-flex w-full rounded-full bg-[#0c1913] p-1 mb-5">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                      billingCycle === "monthly" ? "bg-primary text-[#102219]" : "text-white/55 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("yearly")}
                    className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-all ${
                      billingCycle === "yearly" ? "bg-primary text-[#102219]" : "text-white/55 hover:text-white"
                    }`}
                  >
                    Yearly
                  </button>
                </div>

                <div className="rounded-[28px] bg-[#EACCD4] p-6 text-[#007A5E]">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#007A5E]/60">
                        {billingCycle === "yearly" ? `Save ${savings.percentage}` : `${pricing.discountPercent}% off`}
                      </p>
                      <h2 className="font-impact text-4xl mt-2">
                        {pricing.symbol}
                        {plan.price}
                        <span className="ml-2 text-lg text-[#007A5E]/55">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      </h2>
                      <p className="mt-1 text-sm text-[#007A5E]/55">
                        {billingCycle === "yearly"
                          ? `Just ${pricing.symbol}${Math.round(plan.price / 12)}/month billed yearly`
                          : `Renews monthly in ${pricing.currency}`}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/55 px-3 py-2 text-right">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#007A5E]/55">Was</div>
                      <div className="text-xl line-through text-[#007A5E]/40">
                        {pricing.symbol}
                        {plan.originalPrice}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      "Unlimited daily reads",
                      "Unlimited library and garden",
                      "Review mode that helps memory stick",
                      "Book browsing, audio mode, and premium reading",
                      "Streak shield and premium growth tools",
                    ].map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 rounded-full bg-[#007A5E]/10 p-1">
                          <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        <span className="font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isAuthenticated ? (
                    <button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full py-4 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-widest text-lg hover:bg-[#004a39] transition-all rounded-xl shadow-lg disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Get Pro Now"}
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => handleSocialSignIn("google")}
                        disabled={!!socialLoading}
                        className="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all bg-white text-[#102219] border border-white/40 hover:bg-white/90 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all bg-[#102219] text-white border border-[#102219] hover:bg-[#0b1711] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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

                  <p className="text-xs text-center text-[#007A5E]/55 mt-4">Secure checkout powered by Dodo Payments</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              {[
                { label: "Secure checkout", copy: "Encrypted billing through Dodo Payments." },
                { label: "Cancel anytime", copy: "Access stays active until your billing period ends." },
                { label: "Real support", copy: "Questions go to support@bloomscroll.club." },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-primary">{item.label}</p>
                  <p className="mt-1 text-sm text-white/50">{item.copy}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 space-y-4"
            >
              <h2 className="font-impact text-2xl uppercase text-center text-primary mb-6">Common Questions</h2>

              {[
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. You can cancel whenever you want and keep access until the current billing period ends.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "Cards, UPI in India, and local payment methods supported by Dodo Payments.",
                },
                {
                  q: "Is there a free trial?",
                  a: "There is a free plan, but reading now starts after sign-in so your library and progress stay attached to your account.",
                },
                {
                  q: "Can I switch between monthly and yearly?",
                  a: "Yes. You can change plans later from the billing portal.",
                },
              ].map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-white/8 bg-white/5">
                  <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-white">
                    {faq.q}
                    <span className="transform group-open:rotate-180 transition-transform text-primary">▼</span>
                  </summary>
                  <p className="px-4 pb-4 text-white/55">{faq.a}</p>
                </details>
              ))}
            </motion.div>
          </>
        )}
      </main>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm text-white/35">
          <p>Questions? Reach out to support@bloomscroll.club</p>
        </div>
      </footer>
    </div>
  );
}
