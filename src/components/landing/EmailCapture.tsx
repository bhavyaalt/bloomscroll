"use client";

import { useState } from "react";

export const EmailCapture = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-primary/30 bg-primary/5 p-4 rounded-xl text-center">
        <p className="font-bold text-slate-900">Welcome to BloomScroll!</p>
        <p className="text-sm text-slate-500 mt-1">Check your inbox for your first wisdom card.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="flex-1 bg-slate-100 border-none rounded-lg text-sm px-4 h-10 focus:ring-1 focus:ring-primary focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-primary text-bgdark px-4 rounded-lg font-bold text-xs hover:bg-primary/90 transition-colors disabled:opacity-50 h-10"
      >
        {status === "loading" ? "..." : "Join"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-500 mt-1 absolute">Try again</p>
      )}
    </form>
  );
};
