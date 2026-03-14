"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";
import { useNotifications } from "@/components/NotificationProvider";
import { trackGrowthEvent } from "@/lib/analytics";

function SuccessContent() {
  const { user, refreshProfile, isSubscribed } = useAuth();
  const { notify } = useNotifications();
  const searchParams = useSearchParams();
  const [checking, setChecking] = useState(true);
  const activationAttempted = useRef(false);
  const hasNotifiedSuccess = useRef(false);
  const trackedConfirmation = useRef(false);

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

    // Fallback: After 5 seconds, if still not subscribed, try to activate via API
    const fallbackTimeout = setTimeout(async () => {
      if (!activationAttempted.current && user?.email) {
        activationAttempted.current = true;
        try {
          // Get billing cycle from URL or default to yearly
          const billingCycle = searchParams.get('billing') || 'yearly';
          
          const response = await fetch('/api/activate-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, billingCycle }),
          });
          
          if (response.ok) {
            console.log('Subscription activated via fallback');
            await refreshProfile();
          }
        } catch (error) {
          console.error('Fallback activation failed:', error);
        }
      }
    }, 5000);

    // Stop polling after 30 seconds
    setTimeout(() => {
      clearInterval(interval);
      setChecking(false);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimeout);
    };
  }, [refreshProfile, user, searchParams]);

  useEffect(() => {
    if (!isSubscribed || hasNotifiedSuccess.current) return;
    if (!trackedConfirmation.current) {
      trackedConfirmation.current = true;
      trackGrowthEvent({
        event: "subscription_confirmed",
        metadata: {
          billing_cycle: searchParams.get("billing") || "yearly",
          source: searchParams.get("source") || "unknown",
        },
      });
    }
    notify({
      title: "Pro unlocked",
      message: "Your subscription is active and premium features are ready.",
      tone: "success",
      duration: 3600,
    });
    hasNotifiedSuccess.current = true;
  }, [isSubscribed, notify, searchParams]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
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
          className="w-20 h-20 sm:w-24 sm:h-24 bg-brand rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl text-white"
          >
            ✓
          </motion.span>
        </motion.div>

        <h1 className="font-instrument-serif text-2xl sm:text-3xl font-medium text-slate-900 mb-4">
          Welcome to Pro!
        </h1>
        
        <p className="text-base sm:text-xl mb-6 sm:mb-8 text-slate-500">
          Your subscription is now active. Time to unlock your potential.
        </p>

        {checking ? (
          <div className="mb-8">
            <div className="animate-spin w-6 h-6 border-2 border-brand border-t-transparent rounded-full mx-auto mb-2"></div>
            <p className="text-sm opacity-60">Verifying your subscription...</p>
          </div>
        ) : isSubscribed ? (
          <div className="mb-8 p-4 bg-brand-light rounded-xl">
            <p className="font-medium text-brand">✅ Subscription confirmed!</p>
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
            className="block w-full py-4 bg-brand text-white font-medium rounded-xl hover:bg-brand-dark transition-all"
          >
            Start Reading →
          </Link>
          
          <Link
            href="/profile"
            className="block w-full py-4 border-2 border-brand text-brand font-medium rounded-xl hover:bg-brand-light transition-all"
          >
            View Profile
          </Link>
        </div>

        <p className="text-xs text-slate-400 mt-8">
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
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse text-2xl font-medium text-slate-900">Loading...</div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
