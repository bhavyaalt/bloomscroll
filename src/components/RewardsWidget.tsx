"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStarkZap } from "@/hooks/useStarkZap";

export function RewardsWidget() {
  const {
    wallet,
    isConnecting,
    isConnected,
    connect,
    disconnect,
    totalPendingSats,
    pendingRewards,
    claimRewards,
    isClaiming,
  } = useStarkZap();

  const [showDetails, setShowDetails] = useState(false);
  const [claimResult, setClaimResult] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleClaim = async () => {
    const result = await claimRewards();
    if (result.success && result.txHash) {
      setClaimResult({ success: true, message: `Claimed! Check your wallet.` });
    } else {
      setClaimResult({ success: false, message: result.error || "Claim failed" });
    }
    setTimeout(() => setClaimResult(null), 3000);
  };

  if (!isConnected) {
    return (
      <motion.button
        onClick={connect}
        disabled={isConnecting}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isConnecting ? (
          <>
            <span className="animate-spin">⏳</span>
            Connecting...
          </>
        ) : (
          <>
            <span>₿</span>
            Connect to Earn
          </>
        )}
      </motion.button>
    );
  }

  return (
    <div className="relative">
      {/* Main Widget */}
      <motion.div
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full font-bold text-sm shadow-lg cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-lg">₿</span>
        <div className="flex flex-col items-start">
          <span className="text-xs opacity-80">Pending</span>
          <span className="text-sm font-bold">{totalPendingSats}</span>
        </div>
        <motion.span
          animate={{ rotate: showDetails ? 180 : 0 }}
          className="text-xs"
        >
          ▼
        </motion.span>
      </motion.div>

      {/* Details Dropdown */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-80">Your Wallet</p>
                  <p className="font-mono text-sm">
                    {wallet?.address.slice(0, 6)}...{wallet?.address.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    disconnect();
                  }}
                  className="text-xs bg-white/20 px-2 py-1 rounded-full hover:bg-white/30"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {/* Balances */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">BTC Balance</span>
                <span className="font-bold text-gray-900">{wallet?.balances.btc || "0"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">STRK Balance</span>
                <span className="font-bold text-gray-900">{wallet?.balances.strk || "0"}</span>
              </div>
            </div>

            {/* Pending Rewards */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-gray-900">Pending Rewards</span>
                <span className="text-orange-500 font-bold">{totalPendingSats}</span>
              </div>
              
              {pendingRewards.length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {pendingRewards.slice(-5).map((reward, i) => (
                    <div key={i} className="flex justify-between text-xs text-gray-600">
                      <span>{reward.type.replace(/_/g, " ")}</span>
                      <span className="text-orange-500">+{(parseFloat(reward.amount) * 100_000_000).toFixed(0)} sats</span>
                    </div>
                  ))}
                  {pendingRewards.length > 5 && (
                    <p className="text-xs text-gray-400 text-center">
                      +{pendingRewards.length - 5} more
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-2">
                  Read cards to earn sats! ₿
                </p>
              )}
            </div>

            {/* Claim Button */}
            <div className="p-4">
              {claimResult ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center py-2 rounded-xl text-sm font-bold ${
                    claimResult.success
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {claimResult.message}
                </motion.div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClaim();
                  }}
                  disabled={isClaiming || pendingRewards.length === 0}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  {isClaiming ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Claiming...
                    </span>
                  ) : pendingRewards.length === 0 ? (
                    "No Rewards to Claim"
                  ) : (
                    `Claim ${totalPendingSats}`
                  )}
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <p className="text-xs text-center text-gray-400">
                Powered by StarkZap • Gasless transactions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
