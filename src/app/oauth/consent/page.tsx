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
      <div className="min-h-screen bg-bglight flex items-center justify-center">
        <div className="animate-pulse text-2xl font-bold text-bgdark">Loading...</div>
      </div>
    );
  }

  // Missing params error
  if (missingParams) {
    return (
      <div className="min-h-screen bg-bglight text-bgdark flex flex-col">
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
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="size-8 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold uppercase mb-4">Invalid Authorization Request</h1>
            <p className="text-sm opacity-70 mb-8">
              This authorization request is missing required parameters. Please go back to the application and try again.
            </p>
            <Link href="/" className="text-sm font-bold text-primary hover:text-primary/80 underline">
              Go to Bloomscroll
            </Link>
          </div>
        </main>
      </div>
    );
  }

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
          {/* Consent Card */}
          <div className="bg-white rounded-2xl border-2 border-sage p-8 shadow-sm">
            {/* App icon + arrow + Bloomscroll icon */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-14 h-14 bg-sage/50 rounded-xl flex items-center justify-center">
                <svg className="size-7 text-bgdark/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
              <svg className="size-5 text-bgdark/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                <svg className="size-7 text-bgdark" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-center mb-2">
              Authorize Access
            </h1>
            <p className="text-sm text-center opacity-60 mb-1">
              <span className="font-mono text-xs bg-sage/50 px-2 py-0.5 rounded">{clientId}</span>
            </p>
            <p className="text-sm text-center opacity-70 mb-6">
              wants to access your Bloomscroll account
            </p>

            {/* Signed in as */}
            <div className="bg-sage/30 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold">
                {(profile?.fc_display_name || user.email || "?")[0].toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">
                  {profile?.fc_display_name || user.email}
                </p>
                {profile?.fc_username && (
                  <p className="text-xs opacity-50">@{profile.fc_username}</p>
                )}
              </div>
            </div>

            {/* Scopes */}
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-wide opacity-50 mb-3">
                This will allow the application to:
              </p>
              <div className="space-y-2">
                {scopes.map((s) => {
                  const info = SCOPE_LABELS[s];
                  return (
                    <div key={s} className="flex items-start gap-3 py-2">
                      <svg className="size-5 text-primary mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
                className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all bg-primary text-bgdark hover:bg-primary/90 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="w-full py-4 rounded-full font-bold uppercase tracking-widest transition-all bg-white text-bgdark border-2 border-sage hover:border-bgdark disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="min-h-screen bg-bglight flex items-center justify-center">
          <div className="animate-pulse text-2xl font-bold text-bgdark">Loading...</div>
        </div>
      }
    >
      <ConsentContent />
    </Suspense>
  );
}
