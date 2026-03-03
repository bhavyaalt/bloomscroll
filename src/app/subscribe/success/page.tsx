"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

function SuccessContent() {
  const { refreshProfile, isSubscribed } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Refresh profile to get updated subscription status
    const checkSubscription = async () => {
      await refreshProfile();
      setChecking(false);
    };

    // Poll for subscription update (webhook might take a moment)
    const interval = setInterval(async () => {
      await refreshProfile();
    }, 2000);

    checkSubscription();

    // Stop polling after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
      setChecking(false);
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshProfile]);

  return (
    <div className="min-h-screen bg-[#EACCD4] text-[#007A5E] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full mx-4 text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 bg-[#007A5E] rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl text-[#EACCD4]"
          >
            ✓
          </motion.span>
        </motion.div>

        <h1 className="font-impact text-4xl uppercase mb-4">
          Welcome to Pro!
        </h1>
        
        <p className="font-times italic text-xl mb-8 opacity-80">
          Your subscription is now active. Time to unlock your potential.
        </p>

        {checking ? (
          <div className="mb-8">
            <div className="animate-spin w-6 h-6 border-2 border-[#007A5E] border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm opacity-60">Verifying your subscription...</p>
          </div>
        ) : isSubscribed ? (
          <div className="mb-8 p-4 bg-[#007A5E]/10 rounded-xl">
            <p className="font-bold text-[#007A5E]">✅ Subscription confirmed!</p>
          </div>
        ) : (
          <div className="mb-8 p-4 bg-yellow-100 rounded-xl">
            <p className="text-yellow-800 text-sm">
              Payment received! Your subscription will be active shortly.
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Link
            href="/app"
            className="block w-full py-4 bg-[#007A5E] text-[#EACCD4] font-bold uppercase tracking-widest rounded-xl hover:bg-[#004a39] transition-all"
          >
            Start Reading →
          </Link>
          
          <Link
            href="/profile"
            className="block w-full py-4 border-2 border-[#007A5E] font-bold uppercase tracking-widest rounded-xl hover:bg-[#007A5E]/10 transition-all"
          >
            View Profile
          </Link>
        </div>

        <p className="text-xs opacity-60 mt-8">
          Questions? Contact support@bloomscroll.club
        </p>
      </motion.div>
    </div>
  );
}

export default function SubscribeSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#EACCD4] flex items-center justify-center">
          <div className="animate-pulse text-2xl font-bold text-[#007A5E]">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
