"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/components/AuthProvider";

// Map of known scopes to human-readable descriptions
const SCOPE_LABELS: Record<string, { label: string; description: string }> = {
  "openid": { label: "Basic identity", description: "Verify your identity" },
  "profile": { label: "Profile info", description: "Your name and profile picture" },
  "email": { label: "Email address", description: "Your email address" },
  "read:profile": { label: "Read profile", description: "View your Bloomscroll profile and preferences" },
  "read:progress": { label: "Reading progress", description: "View your streaks, stats, and daily progress" },
  "read:saved": { label: "Saved cards", description: "View your saved wisdom cards and collections" },
  "read:subscription": { label: "Subscription status", description: "View your subscription status" },
};

function ConsentContent() {
  const searchParams = useSearchParams();
  const { user, profile, loading } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse OAuth params
  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const responseType = searchParams.get("response_type") || "code";
  const scope = searchParams.get("scope") || "openid profile email";
  const state = searchParams.get("state");
  const codeChallenge = searchParams.get("code_challenge");
  const codeChallengeMethod = searchParams.get("code_challenge_method");

  const scopes = scope.split(/[\s+]/).filter(Boolean);

  // Redirect to auth if not logged in (preserve all OAuth params)
  useEffect(() => {
    if (!loading && !user) {
      const currentUrl = window.location.href;
      const loginUrl = `/auth?redirect=${encodeURIComponent(currentUrl.replace(window.location.origin, ""))}`;
      window.location.href = loginUrl;
    }
  }, [loading, user]);

  // Validate required params
  const missingParams = !clientId || !redirectUri;

  const handleDeny = () => {
    if (!redirectUri) return;
    const url = new URL(redirectUri);
    url.searchParams.set("error", "access_denied");
    url.searchParams.set("error_description", "The user denied the authorization request");
    if (state) url.searchParams.set("state", state);
    window.location.href = url.toString();
  };

  const handleAllow = async () => {
    if (!redirectUri || !clientId) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/oauth/consent/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          redirect_uri: redirectUri,
          response_type: responseType,
          scope,
          state,
          code_challenge: codeChallenge,
          code_challenge_method: codeChallengeMethod,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authorization failed. Please try again.");
        setSubmitting(false);
        return;
      }

      // Redirect to the redirect_uri with the authorization code
      window.location.href = data.redirect_url;
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  // Loading state
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-2xl font-medium text-slate-900">Loading...</div>
      </div>
    );
  }

  // Missing params error
  if (missingParams) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <header>
          <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
            <Link href="/" className="flex items-center">
              <span className="font-instrument-serif italic text-xl text-slate-900">BloomScroll</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="size-8 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="font-instrument-serif text-2xl font-medium mb-4">Invalid Authorization Request</h1>
            <p className="text-sm opacity-70 mb-8">
              This authorization request is missing required parameters. Please go back to the application and try again.
            </p>
            <Link href="/" className="text-sm font-medium text-brand hover:text-brand-dark underline">
              Go to Bloomscroll
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Header */}
      <header>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center">
            <span className="font-instrument-serif italic text-xl text-slate-900">BloomScroll</span>
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
          {/* Consent Card */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 shadow-sm">
            {/* App icon + arrow + Bloomscroll icon */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center">
                <svg className="size-7 text-slate-900/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <svg className="size-5 text-slate-900/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <div className="w-14 h-14 bg-brand-light rounded-xl flex items-center justify-center">
                <span className="font-instrument-serif italic text-xl text-slate-900">B</span>
              </div>
            </div>

            <h1 className="font-instrument-serif text-2xl font-medium tracking-tight text-center mb-2">
              Authorize Access
            </h1>
            <p className="text-sm text-center opacity-60 mb-1">
              <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded">{clientId}</span>
            </p>
            <p className="text-sm text-center opacity-70 mb-6">
              wants to access your Bloomscroll account
            </p>

            {/* Signed in as */}
            <div className="bg-slate-100 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-light rounded-full flex items-center justify-center text-sm font-medium">
                {(profile?.fc_display_name || user.email || "?")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {profile?.fc_display_name || user.email}
                </p>
                {profile?.fc_username && (
                  <p className="text-xs opacity-50">@{profile.fc_username}</p>
                )}
              </div>
            </div>

            {/* Scopes */}
            <div className="mb-8">
              <p className="text-xs font-medium opacity-50 mb-3">
                This will allow the application to:
              </p>
              <div className="space-y-2">
                {scopes.map((s) => {
                  const info = SCOPE_LABELS[s];
                  return (
                    <div key={s} className="flex items-start gap-3 py-2">
                      <svg className="size-5 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">{info?.label || s}</p>
                        {info?.description && (
                          <p className="text-xs opacity-50">{info.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAllow}
                disabled={submitting}
                className="w-full py-4 rounded-full font-medium transition-all bg-brand text-white hover:bg-brand-dark shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⟳</span>
                    Authorizing...
                  </span>
                ) : (
                  "Allow Access"
                )}
              </button>

              <button
                onClick={handleDeny}
                disabled={submitting}
                className="w-full py-4 rounded-full font-medium transition-all bg-white text-slate-900 border-2 border-slate-200 hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Deny
              </button>
            </div>
          </div>

          <p className="text-xs text-center opacity-40 mt-6 px-4">
            By authorizing, you allow this application to access the listed information from your Bloomscroll account. You can revoke access at any time from your settings.
          </p>
        </motion.div>
      </main>
    </div>
  );
}

export default function OAuthConsentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="animate-pulse text-2xl font-medium text-slate-900">Loading...</div>
        </div>
      }
    >
      <ConsentContent />
    </Suspense>
  );
}
