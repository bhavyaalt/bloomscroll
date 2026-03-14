"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export const Navigation = ({ isAuthenticated }: { isAuthenticated?: boolean }) => {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 absolute top-0 left-0 right-0 z-50" style={{ background: "transparent" }}>
      <Link href="/" className="flex items-center gap-2">
        <Logo size="md" />
      </Link>
      {isAuthenticated ? (
        <Link
          href="/app"
          className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
        >
          Open App →
        </Link>
      ) : (
        <Link
          href="/auth?redirect=/app"
          className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
        >
          Sign in
        </Link>
      )}
    </header>
  );
};
