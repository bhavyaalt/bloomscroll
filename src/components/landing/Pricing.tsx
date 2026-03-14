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
  const [cycle, setCycle] = useState<"monthly" | "yearly">("yearly");
  const freeHref = isAuthenticated ? "/app" : "/auth?redirect=/app";
  const freeLabel = isAuthenticated ? "Get Started" : "Get Started";

  useEffect(() => {
    detectRegionClient().then((r) => {
      setRegion(r);
      setLoaded(true);
    });
  }, []);

  const pricing = PRICING[region];
  const plan = cycle === "monthly" ? pricing.monthly : pricing.yearly;
  const cycleLabel = cycle === "monthly" ? "/mo" : "/year";

  return (
    <section id="pricing" className="px-6 md:px-20 lg:px-40 py-16 md:py-24 bg-white">
      <div className="text-center flex flex-col gap-3 mb-10">
        <h2 className="font-instrument-serif text-2xl md:text-5xl font-medium text-slate-900">
          Simple{" "}
          <span className="font-instrument-serif italic text-brand font-normal">
            Pricing
          </span>
        </h2>
        <p className="text-slate-500">
          Choose the plan that&apos;s right for you.
        </p>
        {loaded && region !== "OTHER" && (
          <p className="text-xs text-slate-400">
            Prices shown for {REGION_NAMES[region]}
          </p>
        )}
      </div>

      {/* Cycle toggle */}
      <div className="flex flex-col items-center gap-3 mb-10">
        <div className="relative">
          <span className="text-xs font-medium text-white bg-green-600 rounded-full px-3 py-1 block">
            Get 2 months free
          </span>
          <div className="absolute right-6 -bottom-1.5 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-green-600" />
        </div>
        <div className="flex items-center bg-slate-100 rounded-full p-1">
          <button
            onClick={() => setCycle("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              cycle === "monthly"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setCycle("yearly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              cycle === "yearly"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto w-full gap-6">
        {/* Free */}
        <div className="flex flex-col p-5 sm:p-8 rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-1">
              <h3 className="font-instrument-serif text-lg font-medium text-slate-900">Seedling Plan</h3>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-medium text-slate-900">
                {pricing.symbol}0
              </span>
              <span className="text-slate-400 font-medium">/forever</span>
            </div>
            <p className="text-sm text-slate-500">
              Free
            </p>
            <p className="text-sm text-slate-500">
              Everything you need to start blooming.
            </p>
            <ul className="flex flex-col gap-3 mt-2 flex-grow">
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-brand">&#10003;</span>
                5 daily wisdom cards
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-brand">&#10003;</span>
                Daily streak tracking
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-brand">&#10003;</span>
                Save & share cards
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <span className="text-slate-300">&#10005;</span>
                No Unlimited Access
              </li>
            </ul>
            <Link
              href={freeHref}
              className="w-full py-3 rounded-xl border border-slate-200 font-medium text-center hover:bg-slate-50 transition-colors mt-6 text-slate-700 block text-sm"
            >
              {freeLabel}
            </Link>
          </div>
        </div>

        {/* Pro */}
        <div className="flex flex-col p-5 sm:p-8 rounded-2xl border-2 border-brand bg-white shadow-lg shadow-brand-light relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white bg-brand rounded-full px-4 py-1 whitespace-nowrap">
            Recommended
          </span>
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-1">
              <h3 className="font-instrument-serif text-lg font-medium text-slate-900">Pro Garden</h3>
            </div>
            <div className="flex items-baseline gap-2">
              {plan.originalPrice !== plan.price && (
                <span className="text-lg line-through text-slate-400">
                  {pricing.symbol}{plan.originalPrice}
                </span>
              )}
              <span className="text-4xl font-medium text-brand">
                {pricing.symbol}{plan.price}
              </span>
              <span className="text-slate-400 font-medium">{cycleLabel}</span>
            </div>
            {pricing.yearly.savings && (
              <p className="text-xs text-brand font-medium">
                {pricing.yearly.savings}
              </p>
            )}
            <p className="text-sm text-slate-500">
              Unlock the full power of daily wisdom.
            </p>
            <ul className="flex flex-col gap-3 mt-2 flex-grow">
              <li className="flex items-center gap-3 text-sm font-medium text-slate-900">
                <span className="text-brand font-medium">&#10003;</span>
                Unlimited wisdom cards
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-slate-900">
                <span className="text-brand font-medium">&#10003;</span>
                Spaced repetition learning
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-slate-900">
                <span className="text-brand font-medium">&#10003;</span>
                All 8 curated collections
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-slate-900">
                <span className="text-brand font-medium">&#10003;</span>
                Offline reading mode
              </li>
            </ul>
            <Link
              href="/subscribe"
              className="w-full py-3 rounded-xl bg-brand text-white font-medium shadow-md shadow-brand/20 hover:bg-brand-dark transition-all mt-6 text-center block text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
