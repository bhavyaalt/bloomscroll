"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FrameContext = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FarcasterSDK = any;

interface FarcasterContextType {
  isSDKLoaded: boolean;
  isInFrame: boolean;
  context: FrameContext | null;
  walletAddress: string | null;
  fid: number | null;
  username: string | null;
  displayName: string | null;
  pfpUrl: string | null;
  requestWallet: () => Promise<string | null>;
  ready: () => void;
}

const FarcasterContext = createContext<FarcasterContextType>({
  isSDKLoaded: false,
  isInFrame: false,
  context: null,
  walletAddress: null,
  fid: null,
  username: null,
  displayName: null,
  pfpUrl: null,
  requestWallet: async () => null,
  ready: () => {},
});

export function useFarcaster() {
  return useContext(FarcasterContext);
}

interface FarcasterProviderProps {
  children: ReactNode;
}

export function FarcasterProvider({ children }: FarcasterProviderProps) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isInFrame, setIsInFrame] = useState(false);
  const [context, setContext] = useState<FrameContext | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const sdkRef = useRef<FarcasterSDK | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        // Dynamic import to avoid SSR/browser compatibility issues
        const { default: sdk } = await import("@farcaster/miniapp-sdk");
        sdkRef.current = sdk;
        
        // Check if we're in a mini app context
        const inMiniApp = await sdk.isInMiniApp();
        if (inMiniApp) {
          const ctx = await sdk.context;
          setContext(ctx);
          setIsInFrame(true);
          
          // Try to get wallet address
          try {
            const provider = sdk.wallet.ethProvider;
            const accounts = await provider.request({ method: "eth_accounts" }) as string[];
            if (accounts && accounts.length > 0) {
              setWalletAddress(accounts[0]);
            }
          } catch {
            // Wallet not connected yet, that's fine
          }
        }
      } catch (e) {
        console.log("Not in Farcaster frame context or SDK unavailable");
      }
      setIsSDKLoaded(true);
    };
    
    load();
  }, []);

  const requestWallet = useCallback(async (): Promise<string | null> => {
    if (!isInFrame || !sdkRef.current) return null;
    
    try {
      // Request wallet connection through Farcaster
      const provider = await sdkRef.current.wallet.ethProvider;
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        return accounts[0];
      }
    } catch (e) {
      console.error("Failed to request wallet:", e);
    }
    
    return null;
  }, [isInFrame]);

  const ready = useCallback(() => {
    if (isInFrame && sdkRef.current) {
      sdkRef.current.actions.ready();
    }
  }, [isInFrame]);

  // Auto-ready when SDK loads in frame context
  useEffect(() => {
    if (isSDKLoaded && isInFrame && sdkRef.current) {
      sdkRef.current.actions.ready();
    }
  }, [isSDKLoaded, isInFrame]);

  const value: FarcasterContextType = {
    isSDKLoaded,
    isInFrame,
    context,
    walletAddress,
    fid: context?.user?.fid ?? null,
    username: context?.user?.username ?? null,
    displayName: context?.user?.displayName ?? null,
    pfpUrl: context?.user?.pfpUrl ?? null,
    requestWallet,
    ready,
  };

  return (
    <FarcasterContext.Provider value={value}>
      {children}
    </FarcasterContext.Provider>
  );
}
