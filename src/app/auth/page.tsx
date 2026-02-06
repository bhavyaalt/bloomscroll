"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { signInWithEmail, getSession } from "@/lib/supabase";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/app";
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  // Check if already logged in
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push(redirectTo);
      }
    });
  }, [router, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      await signInWithEmail(email);
      setStatus("sent");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#EACCD4] text-[#007A5E] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#007A5E]/20">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-baseline">
            <span className="font-impact text-2xl uppercase tracking-tighter">Bloom</span>
            <span className="font-times italic text-2xl">scroll</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {status === "sent" ? (
            // Success state - check email
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-[#007A5E] rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-4xl text-[#EACCD4]">✉️</span>
              </motion.div>
              <h1 className="font-impact text-4xl uppercase mb-4">Check your email!</h1>
              <p className="font-times italic text-xl mb-2">
                We sent a magic link to:
              </p>
              <p className="font-bold text-lg mb-8">{email}</p>
              <p className="text-sm opacity-70 mb-8">
                Click the link in the email to sign in. It expires in 1 hour.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm font-bold uppercase text-[#007A5E]/70 hover:text-[#007A5E]"
              >
                Use a different email
              </button>
            </div>
          ) : (
            // Sign in form
            <>
              <div className="text-center mb-8">
                <h1 className="font-impact text-4xl uppercase mb-4">Sign in to Bloomscroll</h1>
                <p className="font-times italic text-xl opacity-80">
                  No password needed. We&apos;ll email you a magic link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wide mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-4 rounded-xl border-2 border-[#007A5E]/30 focus:border-[#007A5E] outline-none transition-colors bg-white/50 text-lg"
                  />
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className={`w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all ${
                    status === "loading" || !email
                      ? "bg-[#007A5E]/50 text-[#EACCD4]/70 cursor-not-allowed"
                      : "bg-[#007A5E] text-[#EACCD4] hover:bg-[#004a39] shadow-lg"
                  }`}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⟳</span>
                      Sending...
                    </span>
                  ) : (
                    "Send Magic Link"
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm opacity-60">
                  By signing in, you agree to our{" "}
                  <a href="#" className="underline">Terms</a> and{" "}
                  <a href="#" className="underline">Privacy Policy</a>.
                </p>
              </div>

              {/* Benefits */}
              <div className="mt-12 pt-8 border-t border-[#007A5E]/20">
                <h3 className="text-sm font-bold uppercase tracking-wide text-center mb-6 opacity-60">
                  Why create an account?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#007A5E]/10 rounded-full flex items-center justify-center">
                      💾
                    </span>
                    <span className="text-sm">Sync saved cards across devices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#007A5E]/10 rounded-full flex items-center justify-center">
                      🎯
                    </span>
                    <span className="text-sm">Personalized recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#007A5E]/10 rounded-full flex items-center justify-center">
                      📊
                    </span>
                    <span className="text-sm">Track your learning progress</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#EACCD4] flex items-center justify-center">
        <div className="animate-pulse font-impact text-4xl text-[#007A5E]">
          Loading...
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
