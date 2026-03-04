"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PRICING, detectRegionClient, Region } from "@/lib/pricing";
import { useAuth } from "@/components/AuthProvider";

export function PricingSection() {
  const { isAuthenticated } = useAuth();
  const [region, setRegion] = useState<Region>("US");
  const [loading, setLoading] = useState(true);
  const freeHref = isAuthenticated ? "/app" : "/auth?redirect=/app";
  const freeLabel = isAuthenticated ? "Start Reading" : "Sign In to Start";

  useEffect(() => {
    detectRegionClient().then((r) => {
      setRegion(r);
      setLoading(false);
    });
  }, []);

  const pricing = PRICING[region];
  const monthlyPrice = pricing.monthly.price;
  const monthlyOriginal = pricing.monthly.originalPrice;
  const yearlyPrice = pricing.yearly.price;
  const yearlyOriginal = pricing.yearly.originalPrice;
  const symbol = pricing.symbol;
  const discountPercent = pricing.discountPercent;

  return (
    <section id="pricing" className="px-6 md:px-20 lg:px-40 py-24">
      <div className="text-center flex flex-col gap-3 mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Choose Your Path to Growth</h2>
        <p className="text-slate-500">Flexible plans to support your wisdom journey.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full gap-8">
        {/* Free */}
        <div className="flex flex-col p-8 rounded-3xl border-2 border-sage bg-white relative overflow-hidden">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-slate-900">Seedling Plan</h3>
              <p className="text-slate-500 text-sm">Everything you need to start blooming.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">{symbol}0</span>
              <span className="text-slate-400 font-medium">/forever</span>
            </div>
            <ul className="flex flex-col gap-4 mt-4 flex-grow">
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-primary text-lg">✓</span>
                15 daily wisdom cards
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-primary text-lg">✓</span>
                Daily streak tracking
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-primary text-lg">✓</span>
                Save &amp; share cards
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="text-slate-300 text-lg">✕</span>
                Unlimited access
              </li>
            </ul>
            <Link
              href={freeHref}
              className="w-full py-4 rounded-xl border-2 border-sage font-bold text-center hover:bg-sage/10 transition-colors mt-8 text-slate-700 block"
            >
              {freeLabel}
            </Link>
          </div>
        </div>

        {/* Pro */}
        <div className="flex flex-col p-8 rounded-3xl border-2 border-primary bg-bglight shadow-2xl shadow-primary/10 relative overflow-hidden transform md:scale-105 z-10">
          {/* Discount badge */}
          <div className="absolute top-0 right-0 bg-primary text-bgdark font-bold text-[10px] uppercase tracking-widest px-6 py-2 rounded-bl-xl flex items-center gap-2">
            <span className="bg-white/20 px-2 py-0.5 rounded">{discountPercent}% OFF</span>
          </div>
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-slate-900">Pro Garden</h3>
              <p className="text-slate-500 text-sm">Unlock the full power of daily wisdom.</p>
            </div>
            
            {/* Price with discount */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2">
                {loading ? (
                  <span className="text-4xl font-black text-primary animate-pulse">...</span>
                ) : (
                  <>
                    <span className="text-4xl font-black text-primary">
                      {symbol}{monthlyPrice}
                    </span>
                    <span className="text-slate-400 font-medium">/month</span>
                  </>
                )}
              </div>
              {!loading && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 line-through">
                    {symbol}{monthlyOriginal}/mo
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                    Save {symbol}{(monthlyOriginal - monthlyPrice).toFixed(region === "IN" ? 0 : 2)}
                  </span>
                </div>
              )}
            </div>

            {/* Yearly option */}
            {!loading && (
              <div className="bg-primary/10 rounded-xl p-3 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-700">Or yearly: </span>
                    <span className="font-bold text-primary">{symbol}{yearlyPrice}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">{symbol}{yearlyOriginal}</span>
                  </div>
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded-full font-bold">
                    {pricing.yearly.savings}
                  </span>
                </div>
              </div>
            )}

            <ul className="flex flex-col gap-4 mt-4 flex-grow">
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                <span className="text-primary text-lg font-bold">✓</span>
                Unlimited wisdom cards
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                <span className="text-primary text-lg font-bold">✓</span>
                Spaced repetition learning
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                <span className="text-primary text-lg font-bold">✓</span>
                All 8 curated collections
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                <span className="text-primary text-lg font-bold">✓</span>
                Advanced quiz &amp; stats
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-900">
                <span className="text-primary text-lg font-bold">✓</span>
                Achievements &amp; leaderboard
              </li>
            </ul>
            <Link
              href="/subscribe"
              className="w-full py-4 rounded-xl bg-primary text-bgdark font-black shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all mt-8 text-center block"
            >
              Grow Now →
            </Link>
          </div>
        </div>
      </div>

      {/* Region indicator */}
      {!loading && (
        <p className="text-center text-xs text-slate-400 mt-6">
          Prices shown in {pricing.currency} • Detected region: {region === "IN" ? "🇮🇳 India" : region === "US" ? "🇺🇸 United States" : "🌍 International"}
        </p>
      )}
    </section>
  );
}
