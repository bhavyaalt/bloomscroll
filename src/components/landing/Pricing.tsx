"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PRICING,
  REGION_NAMES,
  Region,
  detectRegionClient,
} from "@/lib/pricing";
import { useAuth } from "@/components/AuthProvider";

export default function Pricing() {
  const { isAuthenticated } = useAuth();
  const [region, setRegion] = useState<Region>("OTHER");
  const [loaded, setLoaded] = useState(false);
  const freeHref = isAuthenticated ? "/app" : "/auth?redirect=/app";
  const freeLabel = isAuthenticated ? "Start Reading" : "Sign In to Start";

  useEffect(() => {
    detectRegionClient().then((r) => {
      setRegion(r);
      setLoaded(true);
    });
  }, []);

  const pricing = PRICING[region];
  const monthly = pricing.monthly;

  return (
    <section id="pricing" className="px-6 md:px-20 lg:px-40 py-24">
      <div className="text-center flex flex-col gap-3 mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900">
          Choose Your Path to Growth
        </h2>
        <p className="text-slate-500">
          Flexible plans to support your wisdom journey.
        </p>
        {loaded && region !== "OTHER" && (
          <p className="text-xs text-slate-400">
            Prices shown for {REGION_NAMES[region]}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto w-full gap-8">
        {/* Free */}
        <div className="flex flex-col p-8 rounded-3xl border-2 border-sage bg-white relative overflow-hidden">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-slate-900">
                Seedling Plan
              </h3>
              <p className="text-slate-500 text-sm">
                Everything you need to start blooming.
              </p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">
                {pricing.symbol}0
              </span>
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
          <div className="absolute top-0 right-0 bg-red-500 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-bl-xl">
            {pricing.discountPercent}% OFF
          </div>
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold text-slate-900">Pro Garden</h3>
              <p className="text-slate-500 text-sm">
                Unlock the full power of daily wisdom.
              </p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl line-through text-slate-400">
                {pricing.symbol}
                {monthly.originalPrice}
              </span>
              <span className="text-4xl font-black text-primary">
                {pricing.symbol}
                {monthly.price}
              </span>
              <span className="text-slate-400 font-medium">/month</span>
            </div>
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
                Offline reading mode
              </li>
            </ul>
            <Link
              href="/subscribe"
              className="w-full py-4 rounded-xl bg-primary text-bgdark font-black shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all mt-8 text-center block"
            >
              Grow Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
