"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const REASONS = [
  {
    id: "too_expensive",
    label: "Too expensive",
    insight: "Pro replaces scattered reading with one focused habit, and your current access stays active until the billing period ends.",
  },
  {
    id: "not_using_enough",
    label: "Not using it enough",
    insight: "You do not lose access immediately after cancelling. You can keep reading until the current cycle ends.",
  },
  {
    id: "missing_features",
    label: "Missing features",
    insight: "Tell us what is missing. Feature requests from paying members are the clearest input for what we build next.",
  },
  {
    id: "bugs_or_quality",
    label: "Bugs or quality issues",
    insight: "If the product is failing you, say where. That is the fastest path for us to fix it.",
  },
  {
    id: "temporary_break",
    label: "Taking a break",
    insight: "You can finish the current paid period, keep your garden, and return later without losing your account.",
  },
  {
    id: "other",
    label: "Other",
    insight: "Add context so we understand the real reason behind the cancellation.",
  },
] as const;

interface CancelSubscriptionModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: (payload: { reason: string; details: string }) => Promise<void>;
}

export default function CancelSubscriptionModal({
  isOpen,
  loading,
  onClose,
  onConfirm,
}: CancelSubscriptionModalProps) {
  const [reason, setReason] = useState<string>("too_expensive");
  const [details, setDetails] = useState("");

  const selectedReason = useMemo(
    () => REASONS.find((item) => item.id === reason) || REASONS[0],
    [reason]
  );

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={(event) => event.stopPropagation()}
        className="mx-auto mt-8 max-h-[calc(100vh-4rem)] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white shadow-2xl"
      >
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-medium text-brand">
                Manage Membership
              </p>
              <h2 className="text-3xl font-instrument-serif font-medium text-slate-900">
                Before you cancel Pro
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-500">
                If something is off, tell us first. You will still be able to cancel in Dodo after this step.
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>

        <div className="grid gap-6 px-6 py-6 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-instrument-serif font-medium text-slate-900">What is the main reason?</h3>
              <div className="mt-4 grid gap-2">
                {REASONS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setReason(item.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition-all ${
                      reason === item.id
                        ? "border-brand bg-brand/10 text-slate-900"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-instrument-serif font-medium text-slate-900">Anything you want us to know?</h3>
              <p className="mt-1 text-sm text-slate-500">
                Optional, but useful if you want us to improve something specific.
              </p>
              <textarea
                value={details}
                onChange={(event) => setDetails(event.target.value.slice(0, 500))}
                rows={5}
                placeholder="Tell us what pushed you to cancel..."
                className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand"
              />
              <div className="mt-2 text-right text-xs text-slate-400">{details.length}/500</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-brand p-6 text-white shadow-lg">
              <p className="text-[11px] font-medium text-white/70">
                Keep In Mind
              </p>
              <p className="mt-3 text-lg font-medium">{selectedReason.insight}</p>
              <div className="mt-5 space-y-2 text-sm text-white/70">
                <p>Unlimited reading stays active until your billing period ends.</p>
                <p>Your garden, account, and reading history stay attached to your profile.</p>
                <p>You can still cancel after this screen. This step just helps us understand why.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-lg font-instrument-serif font-medium text-slate-900">Want to keep Pro?</h3>
              <p className="mt-2 text-sm text-slate-500">
                Keep your unlimited feed, streak shield, and full garden features without interruption.
              </p>
              <div className="mt-4 space-y-3">
                <Link
                  href="/app"
                  onClick={onClose}
                  className="block rounded-full bg-brand px-5 py-3 text-center text-sm font-medium text-white transition-transform hover:scale-[1.01]"
                >
                  Keep my membership
                </Link>
                <button
                  onClick={() => onConfirm({ reason, details: details.trim() })}
                  disabled={loading}
                  className={`w-full rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
                    loading
                      ? "cursor-not-allowed border-slate-200 text-slate-300"
                      : "border-red-300 text-red-500 hover:bg-red-50"
                  }`}
                >
                  {loading ? "Opening cancellation..." : "Continue to cancellation"}
                </button>
              </div>
              <p className="mt-3 text-xs text-slate-400">
                Cancellation is completed in Dodo&apos;s secure customer portal.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
