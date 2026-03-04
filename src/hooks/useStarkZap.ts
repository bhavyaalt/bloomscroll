"use client";

import { useState, useEffect, useCallback } from "react";
import {
  connectWallet,
  disconnectWallet,
  getWallet,
  refreshBalances,
  addPendingReward,
  getPendingRewards,
  getTotalPendingRewards,
  claimPendingRewards,
  formatSats,
  type StarkZapWallet,
  type RewardEvent,
  REWARDS,
} from "@/lib/starkzap";

export interface UseStarkZapReturn {
  // Wallet state
  wallet: StarkZapWallet | null;
  isConnecting: boolean;
  isConnected: boolean;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refresh: () => Promise<void>;
  
  // Rewards
  pendingRewards: RewardEvent[];
  totalPending: string;
  totalPendingSats: string;
  earnReward: (type: keyof typeof REWARDS) => void;
  claimRewards: () => Promise<{ success: boolean; txHash?: string; error?: string }>;
  isClaiming: boolean;
}

export function useStarkZap(): UseStarkZapReturn {
  const [wallet, setWallet] = useState<StarkZapWallet | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [pendingRewards, setPendingRewards] = useState<RewardEvent[]>([]);

  // Load wallet state on mount
  useEffect(() => {
    const existingWallet = getWallet();
    if (existingWallet) {
      setWallet(existingWallet);
    }
    setPendingRewards(getPendingRewards());
  }, []);

  // Refresh pending rewards periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPendingRewards(getPendingRewards());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const connectedWallet = await connectWallet();
      setWallet(connectedWallet);
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await disconnectWallet();
    setWallet(null);
  }, []);

  const refresh = useCallback(async () => {
    const refreshedWallet = await refreshBalances();
    if (refreshedWallet) {
      setWallet(refreshedWallet);
    }
  }, []);

  const earnReward = useCallback((type: keyof typeof REWARDS) => {
    addPendingReward(type);
    setPendingRewards(getPendingRewards());
  }, []);

  const claimRewards = useCallback(async () => {
    if (!wallet?.address) {
      return { success: false, error: "Wallet not connected" };
    }

    setIsClaiming(true);
    try {
      const result = await claimPendingRewards(wallet.address);
      if (result.success) {
        setPendingRewards([]);
        await refresh();
      }
      return result;
    } finally {
      setIsClaiming(false);
    }
  }, [wallet, refresh]);

  const totalPending = getTotalPendingRewards();

  return {
    wallet,
    isConnecting,
    isConnected: !!wallet?.isConnected,
    connect,
    disconnect,
    refresh,
    pendingRewards,
    totalPending,
    totalPendingSats: formatSats(totalPending),
    earnReward,
    claimRewards,
    isClaiming,
  };
}
