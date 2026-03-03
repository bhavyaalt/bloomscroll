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
    <div className="min-h-screen bg-bglight text-bgdark flex flex-col">
      {/* Header */}
      <header className="border-b border-sage">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="size-7 flex items-center justify-center bg-primary rounded-lg">
              <svg className="size-4 text-bgdark" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-bgdark">BloomScroll</span>
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
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="size-8 text-bgdark" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </motion.div>
              <h1 className="text-4xl font-bold tracking-tight uppercase mb-4">Check your email!</h1>
              <p className="italic text-xl mb-2">
                We sent a magic link to:
              </p>
              <p className="font-bold text-lg mb-8">{email}</p>
              <p className="text-sm opacity-70 mb-8">
                Click the link in the email to sign in. It expires in 1 hour.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm font-bold uppercase text-bgdark/70 hover:text-bgdark"
              >
                Use a different email
              </button>
            </div>
          ) : (
            // Sign in form
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight uppercase mb-4">Sign in to Bloomscroll</h1>
                <p className="italic text-xl opacity-80">
                  Sign in to sync your progress across devices.
                </p>
              </div>

              {/* Social Login Buttons */}
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
                  className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all bg-white text-bgdark border-2 border-sage hover:border-bgdark flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Continue with Google
                </button>

                <button
                  onClick={async () => {
                    setSocialLoading("twitter");
                    try {
                      await signInWithProvider("twitter");
                    } catch {
                      setError("Could not sign in with X. Please try again.");
                      setSocialLoading(null);
                    }
                  }}
                  disabled={!!socialLoading}
                  className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all bg-black text-white border-2 border-black hover:bg-black/90 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {socialLoading === "twitter" ? (
                    <span className="animate-spin">⟳</span>
                  ) : (
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  Continue with X
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-sage" />
                <span className="text-sm uppercase tracking-wide opacity-50 font-bold">or continue with email</span>
                <div className="flex-1 h-px bg-sage" />
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
                    className="w-full px-4 py-4 rounded-xl border-2 border-sage focus:border-bgdark outline-none transition-colors bg-white/50 text-lg"
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
                      ? "bg-primary/50 text-bgdark/70 cursor-not-allowed"
                      : "bg-primary text-bgdark hover:bg-primary/90 shadow-lg"
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
              <div className="mt-12 pt-8 border-t border-sage">
                <h3 className="text-sm font-bold uppercase tracking-wide text-center mb-6 opacity-60">
                  Why create an account?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="size-4 text-bgdark" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                      </svg>
                    </span>
                    <span className="text-sm">Sync saved cards across devices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="size-4 text-bgdark" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <span className="text-sm">Personalized recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <svg className="size-4 text-bgdark" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                    </span>
                    <span className="text-sm">Track your learning progress</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/app"
                  className="text-sm font-bold text-bgdark/70 hover:text-bgdark underline"
                >
                  Continue without signing in →
                </Link>
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
      <div className="min-h-screen bg-bglight flex items-center justify-center">
        <div className="animate-pulse text-4xl font-bold text-bgdark">
          Loading...
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
