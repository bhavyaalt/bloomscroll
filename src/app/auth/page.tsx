"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { signInWithEmail, signInWithProvider, getSession } from "@/lib/supabase";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/app";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  useEffect(() => {
    document.cookie = `auth_redirect=${redirectTo}; path=/; max-age=600; SameSite=Lax`;
  }, [redirectTo]);

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.push(redirectTo);
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 md:px-10 h-16 flex items-center absolute top-0 left-0 right-0 z-10">
        <Link href="/" className="flex items-center">
          <span className="font-instrument-serif italic text-xl text-slate-900">BloomScroll</span>
        </Link>
      </header>

      {/* Split layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left: Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-24 lg:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            {status === "sent" ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="size-7 text-brand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </motion.div>
                <h1 className="font-instrument-serif text-3xl font-medium mb-3">Check your email</h1>
                <p className="text-slate-500 mb-1">We sent a magic link to</p>
                <p className="font-medium text-slate-900 mb-6">{email}</p>
                <p className="text-sm text-slate-400 mb-8">
                  Click the link in the email to sign in. It expires in 1 hour.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-medium text-brand hover:text-brand-dark transition-colors"
                >
                  Use a different email
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="font-instrument-serif text-3xl md:text-4xl font-medium mb-3">
                    Welcome back
                  </h1>
                  <p className="text-slate-500">
                    Sign in to sync your progress and pick up where you left off.
                  </p>
                </div>

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                  <button
                    onClick={async () => {
                      setSocialLoading("google");
                      try {
                        await signInWithProvider("google");
                      } catch {
                        setError("Could not sign in with Google. Please try again.");
                        setSocialLoading(null);
                      }
                    }}
                    disabled={!!socialLoading}
                    className="w-full py-3.5 rounded-xl font-medium transition-all bg-white text-slate-900 border border-slate-200 hover:border-slate-400 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {socialLoading === "google" ? (
                      <span className="animate-spin text-slate-400">&#8635;</span>
                    ) : (
                      <svg className="size-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    )}
                    Continue with Google
                  </button>

                </div>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span className="text-xs text-slate-400">or</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand/20 outline-none transition-all bg-white text-base"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className={`w-full py-3.5 rounded-xl font-medium transition-all ${
                      status === "loading" || !email
                        ? "bg-brand/40 text-white cursor-not-allowed"
                        : "bg-brand text-white hover:bg-brand-dark"
                    }`}
                  >
                    {status === "loading" ? "Sending..." : "Send magic link"}
                  </button>
                </form>

                <p className="mt-6 text-xs text-slate-400 text-center">
                  By signing in, you agree to our{" "}
                  <a href="#" className="underline">Terms</a> and{" "}
                  <a href="#" className="underline">Privacy Policy</a>.
                </p>

                <div className="mt-6 text-center">
                  <Link
                    href="/app"
                    className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    Skip for now →
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Right: Visual panel (hidden on mobile) */}
        <div className="hidden lg:flex flex-1 relative overflow-hidden items-end justify-center" style={{ background: "linear-gradient(180deg, #ECF0F8 0%, #F1F3F9 40%, #F5F5FA 100%)" }}>
          {/* Decorative quote */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10 text-center px-10 max-w-md">
            <p className="font-instrument-serif italic text-2xl text-slate-700 leading-relaxed">
              &ldquo;Turn your scroll time into grow time&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="flex -space-x-2">
                {["B", "Y", "M"].map((l) => (
                  <div key={l} className="size-6 rounded-full bg-white/60 border border-white flex items-center justify-center text-[9px] font-medium text-slate-500">
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-xs text-slate-400">100+ readers growing daily</span>
            </div>
          </div>

          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/landing/hero-bg.svg"
            alt="Person reading in nature"
            className="w-full h-[65%] object-cover object-top"
          />
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: "35%", height: "30%", background: "linear-gradient(180deg, #F5F5FA 0%, rgba(245,245,250,0) 100%)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse font-instrument-serif italic text-2xl text-slate-400">
          Loading...
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
