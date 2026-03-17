import { StarkZap, Amount, mainnetTokens, sepoliaTokens, fromAddress } from "starkzap";
import type { Token, Address } from "starkzap";

// ============================================
// STARKZAP CONFIGURATION
// ============================================

const NETWORK = process.env.NEXT_PUBLIC_STARKNET_NETWORK === "mainnet" ? "mainnet" : "sepolia";
const tokens = NETWORK === "mainnet" ? mainnetTokens : sepoliaTokens;

// Singleton SDK instance
let sdkInstance: StarkZap | null = null;

export function getStarkZapSDK(): StarkZap {
  if (!sdkInstance) {
    const paymasterUrl = process.env.NEXT_PUBLIC_AVNU_PAYMASTER_URL;
    sdkInstance = new StarkZap({
      network: NETWORK,
      paymaster: paymasterUrl ? { nodeUrl: paymasterUrl } : undefined,
    });
  }
  return sdkInstance;
}

// ============================================
// REWARD TOKENS
// ============================================

export const REWARD_TOKEN: Token = tokens.WBTC;
export const STRK_TOKEN: Token = tokens.STRK;

// Reward amounts in sats (1 sat = 0.00000001 BTC)
export const REWARDS = {
  CARD_READ: "0.00000010", // 10 sats per card
  STREAK_DAY: "0.00000100", // 100 sats per streak day
  STREAK_WEEK: "0.00001000", // 1000 sats for 7-day streak
  QUIZ_CORRECT: "0.00000050", // 50 sats per correct quiz answer
  FIRST_SHARE: "0.00000500", // 500 sats for first share
};

// ============================================
// WALLET TYPES
// ============================================

export interface StarkZapWallet {
  address: string;
  isConnected: boolean;
  balances: {
    btc: string;
    strk: string;
  };
}

export interface RewardEvent {
  type: keyof typeof REWARDS;
  amount: string;
  timestamp: number;
  txHash?: string;
}

// ============================================
// WALLET MANAGEMENT
// ============================================

let currentWallet: StarkZapWallet | null = null;

export async function connectWallet(): Promise<StarkZapWallet | null> {
  const sdk = getStarkZapSDK();

  try {
    const { wallet } = await sdk.onboard({
      strategy: "cartridge",
      deploy: "if_needed",
    });

    const btcBalance = await wallet.balanceOf(REWARD_TOKEN);
    const strkBalance = await wallet.balanceOf(STRK_TOKEN);

    currentWallet = {
      address: wallet.address as unknown as string,
      isConnected: true,
      balances: {
        btc: btcBalance.toFormatted(),
        strk: strkBalance.toFormatted(),
      },
    };

    return currentWallet;
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    return null;
  }
}

export async function disconnectWallet(): Promise<void> {
  currentWallet = null;
}

export function getWallet(): StarkZapWallet | null {
  return currentWallet;
}

export async function refreshBalances(): Promise<StarkZapWallet | null> {
  if (!currentWallet) return null;

  const sdk = getStarkZapSDK();

  try {
    const { wallet } = await sdk.onboard({
      strategy: "cartridge",
      deploy: "never",
    });

    const btcBalance = await wallet.balanceOf(REWARD_TOKEN);
    const strkBalance = await wallet.balanceOf(STRK_TOKEN);

    currentWallet = {
      ...currentWallet,
      balances: {
        btc: btcBalance.toFormatted(),
        strk: strkBalance.toFormatted(),
      },
    };

    return currentWallet;
  } catch (error) {
    console.error("Failed to refresh balances:", error);
    return currentWallet;
  }
}

// ============================================
// REWARD TRACKING (Client-side pending rewards)
// ============================================

const PENDING_REWARDS_KEY = "bloomscroll_pending_rewards";

export function getPendingRewards(): RewardEvent[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(PENDING_REWARDS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addPendingReward(type: keyof typeof REWARDS): void {
  if (typeof window === "undefined") return;

  const pending = getPendingRewards();
  pending.push({
    type,
    amount: REWARDS[type],
    timestamp: Date.now(),
  });

  localStorage.setItem(PENDING_REWARDS_KEY, JSON.stringify(pending));
}

export function clearPendingRewards(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PENDING_REWARDS_KEY);
}

export function getTotalPendingRewards(): string {
  const pending = getPendingRewards();
  const total = pending.reduce((sum, r) => sum + parseFloat(r.amount), 0);
  return total.toFixed(8);
}

// ============================================
// CLAIM REWARDS (Batch pending -> on-chain via API)
// ============================================

export async function claimPendingRewards(
  userAddress: string,
): Promise<{ success: boolean; txHash?: string; amount?: string; error?: string }> {
  const pending = getPendingRewards();

  if (pending.length === 0) {
    return { success: false, error: "No pending rewards" };
  }

  const totalAmount = getTotalPendingRewards();

  try {
    const response = await fetch("/api/rewards/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipientAddress: userAddress,
        amount: totalAmount,
        rewardCount: pending.length,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      return { success: false, error: result.error || "Claim failed" };
    }

    clearPendingRewards();
    return { success: true, txHash: result.txHash, amount: totalAmount };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Claim failed";
    console.error("Failed to claim rewards:", error);
    return { success: false, error: errorMessage };
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

export function formatSats(btcAmount: string): string {
  const sats = parseFloat(btcAmount) * 100_000_000;
  return `${Math.floor(sats).toLocaleString()} sats`;
}

export function satsToUsd(btcAmount: string, btcPriceUsd: number = 100000): string {
  const usd = parseFloat(btcAmount) * btcPriceUsd;
  return `$${usd.toFixed(4)}`;
}

export function toStarknetAddress(address: string): Address {
  return fromAddress(address);
}
