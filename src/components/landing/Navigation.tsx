"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export const Navigation = () => {
  const { user, profile, isAuthenticated, signOut } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = profile?.fc_username
    ? `@${profile.fc_username}`
    : user?.email?.split("@")[0] || "User";

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-sage/30 px-6 md:px-20 lg:px-40 py-4 bg-bglight/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3">
        <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-bgdark">
          <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9ZM5.6 10.25c0 1.64 1.33 2.97 2.97 2.97h.86c1.97 0 3.56-1.6 3.56-3.57v-5.4C12.99 2.56 11.43 1 9.43 1c-2 0-3.56 1.56-3.56 3.56v5.4c0 .1 0 .2-.27.29ZM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9Z" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">BloomScroll</span>
      </Link>

      <div className="hidden md:flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">How it Works</a>
          <a href="#pricing" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-primary transition-colors"
              >
                <span className="size-8 bg-primary rounded-full flex items-center justify-center text-bgdark text-xs font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </span>
                <span className="hidden lg:inline">{displayName}</span>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-12 bg-white border border-sage/30 rounded-xl shadow-xl min-w-[180px] py-2">
                  <div className="px-4 py-2 text-xs text-slate-400 border-b border-slate-100">
                    {user?.email || profile?.fc_username}
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-sage/20 text-slate-700"
                    onClick={() => setShowMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/app"
                    className="block px-4 py-2 text-sm hover:bg-sage/20 text-slate-700"
                    onClick={() => setShowMenu(false)}
                  >
                    Continue Reading
                  </Link>
                  <button
                    onClick={async () => { await signOut(); setShowMenu(false); window.location.href = "/"; }}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-sage/20 text-slate-400"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/auth" className="text-sm font-medium text-slate-700 hover:text-primary transition-colors">
              Log in
            </Link>
          )}
          <Link
            href={isAuthenticated ? "/app" : "/auth?redirect=/app"}
            className="flex items-center justify-center rounded-full h-10 px-6 bg-primary text-bgdark text-sm font-bold transition-transform hover:scale-105 active:scale-95"
          >
            Start Reading
          </Link>
        </div>
      </div>

      <button className="md:hidden text-slate-700" onClick={() => setMobileOpen(!mobileOpen)}>
        <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-sage/30 shadow-lg md:hidden flex flex-col p-6 gap-4">
          <a href="#features" className="text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>How it Works</a>
          <a href="#pricing" className="text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>Pricing</a>
          <Link
            href={isAuthenticated ? "/app" : "/auth?redirect=/app"}
            className="flex items-center justify-center rounded-full h-10 px-6 bg-primary text-bgdark text-sm font-bold mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Start Reading
          </Link>
        </div>
      )}
    </header>
  );
};
