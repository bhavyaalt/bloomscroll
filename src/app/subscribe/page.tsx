"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
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

export default function SubscribePage() {
  const router = useRouter();
  const { user, profile, loading, isSubscribed, isAuthenticated } = useAuth();
  
  const [region, setRegion] = useState<Region>('OTHER');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [detectingRegion, setDetectingRegion] = useState(true);
  const [showRegionSelector, setShowRegionSelector] = useState(false);

  // Detect region on mount
  useEffect(() => {
    detectRegionClient().then(detectedRegion => {
      setRegion(detectedRegion);
      setDetectingRegion(false);
    });
  }, []);

  // Redirect if not authenticated
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

  const pricing = PRICING[region];
  const plan = pricing[billingCycle];
  const savings = calculateYearlySavings(region);

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl(plan.productId, user?.email || undefined);
    window.location.href = checkoutUrl;
  };

  if (loading || detectingRegion) {
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
            <span className="font-impact text-2xl uppercase tracking-tighter">Bloom</span>
            <span className="font-times italic text-2xl">scroll</span>
          </Link>
          <Link href="/app" className="text-sm font-bold uppercase hover:opacity-70">
            Back to App
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block py-1 px-3 border border-[#007A5E] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            Pro Membership
          </span>
          <h1 className="font-impact text-5xl md:text-6xl uppercase mb-4">
            Unlock Your Potential
          </h1>
          <p className="font-times italic text-xl opacity-80 max-w-md mx-auto">
            Unlimited wisdom, ad-free experience, and exclusive features.
          </p>
          {user && (
            <p className="text-sm opacity-60 mt-4">
              Logged in as {user.email}
            </p>
          )}
        </motion.div>

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
            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl md:text-7xl font-impact">
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

            {/* CTA Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-widest text-lg hover:bg-[#004a39] transition-all hover:scale-[1.02] rounded-xl shadow-lg"
            >
              Get Pro Now
            </button>

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
      </main>

      {/* Footer */}
      <footer className="border-t border-[#007A5E]/20 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm opacity-60">
          <p>Questions? Reach out to support@bloomscroll.club</p>
        </div>
      </footer>
    </div>
  );
}
