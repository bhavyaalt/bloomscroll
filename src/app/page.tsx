"use client";

import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import Pricing from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { useAuth } from "@/components/AuthProvider";

export default function HomePage() {
  const { isAuthenticated, user, profile } = useAuth();
  const appHref = isAuthenticated ? "/app" : "/auth?redirect=/app";
  const displayName = profile?.fc_display_name || profile?.fc_username || user?.email?.split("@")[0] || null;

  return (
    <div
      className="bg-white text-slate-900 min-h-screen flex flex-col overflow-x-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navigation isAuthenticated={isAuthenticated} />
      <Hero ctaHref={appHref} isAuthenticated={isAuthenticated} displayName={displayName} />
      <SocialProof />
      <HowItWorks />
      <BeforeAfter />
      <Pricing />
      <FAQ />
      <CTA ctaHref={appHref} isAuthenticated={isAuthenticated} displayName={displayName} />
    </div>
  );
}
