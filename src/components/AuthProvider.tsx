"use client";

import { createContext, useContext, useEffect, useEffectEvent, useRef, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import {
  supabase,
  UserProfile,
  getOrCreateProfile,
  getOrCreateFarcasterProfile,
  canViewContent,
  linkFarcasterToProfile,
  linkEmailToFarcasterProfile,
  linkWallet,
  updateLastActive,
  FarcasterUser,
} from "@/lib/supabase";
import { useFarcaster } from "./FarcasterProvider";
import { useNotifications } from "./NotificationProvider";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isSubscribed: boolean;
  viewsRemaining: number;
  isAuthenticated: boolean;
  authMethod: "email" | "farcaster" | "both" | null;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
  linkFarcaster: () => Promise<boolean>;
  linkEmail: (email: string) => Promise<boolean>;
  updateWallet: (walletAddress: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  isSubscribed: false,
  viewsRemaining: 15,
  isAuthenticated: false,
  authMethod: null,
  refreshProfile: async () => {},
  signOut: async () => {},
  linkFarcaster: async () => false,
  linkEmail: async () => false,
  updateWallet: async () => false,
});

const FREE_VIEWS = 15;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [viewsRemaining, setViewsRemaining] = useState(FREE_VIEWS);

  const { isSDKLoaded, isInFrame, fid, username, displayName, pfpUrl, walletAddress } = useFarcaster();
  const { notify, notifyAcrossNavigation } = useNotifications();
  const requestVersionRef = useRef(0);
  const mountedRef = useRef(true);
  const lastNotifiedSignInUserRef = useRef<string | null>(null);

  const isAuthenticated = !!user || (isInFrame && !!fid);
  const authMethod = profile?.auth_method || (user ? "email" : fid ? "farcaster" : null);

  const getFarcasterUser = (): FarcasterUser | null => {
    if (!fid) return null;
    return {
      fid,
      username: username || undefined,
      displayName: displayName || undefined,
      pfpUrl: pfpUrl || undefined,
      walletAddress: walletAddress || undefined,
    };
  };

  const resetProfileState = () => {
    setProfile(null);
    setIsSubscribed(false);
    setViewsRemaining(FREE_VIEWS);
  };

  const applyResolvedProfile = async (resolvedProfile: UserProfile | null, requestVersion: number) => {
    if (!mountedRef.current || requestVersion !== requestVersionRef.current) return;

    setProfile(resolvedProfile);

    if (!resolvedProfile) {
      setIsSubscribed(false);
      setViewsRemaining(FREE_VIEWS);
      return;
    }

    const { remaining, isSubscribed: subscribed } = await canViewContent(resolvedProfile.id);

    if (!mountedRef.current || requestVersion !== requestVersionRef.current) return;

    setIsSubscribed(subscribed);
    setViewsRemaining(remaining);
    updateLastActive(resolvedProfile.id).catch(() => {});
  };

  const loadAuthStateInternal = async (nextSession?: Session | null) => {
    const requestVersion = ++requestVersionRef.current;
    const activeSession = nextSession === undefined
      ? (await supabase.auth.getSession()).data.session
      : nextSession;

    if (!mountedRef.current || requestVersion !== requestVersionRef.current) return;

    setSession(activeSession);
    setUser(activeSession?.user ?? null);

    if (activeSession?.user) {
      const meta = activeSession.user.user_metadata;
      const resolvedProfile = await getOrCreateProfile(
        activeSession.user.id,
        activeSession.user.email || "",
        {
          displayName: meta?.full_name || meta?.name,
          avatarUrl: meta?.avatar_url || meta?.picture,
        },
        getFarcasterUser() || undefined
      );
      await applyResolvedProfile(resolvedProfile, requestVersion);
      return;
    }

    const farcasterUser = getFarcasterUser();
    if (farcasterUser) {
      const resolvedProfile = await getOrCreateFarcasterProfile(farcasterUser);
      await applyResolvedProfile(resolvedProfile, requestVersion);
      return;
    }

    resetProfileState();
  };

  const loadAuthState = useEffectEvent(async (nextSession?: Session | null) => {
    await loadAuthStateInternal(nextSession);
  });

  const refreshProfile = async () => {
    await loadAuthStateInternal(session);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      requestVersionRef.current += 1;
    };
  }, []);

  useEffect(() => {
    if (!isSDKLoaded) return;

    loadAuthState().finally(() => {
      if (mountedRef.current) {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
      loadAuthState(nextSession).finally(() => {
        if (mountedRef.current) {
          setLoading(false);
        }
      });

      if (event === "SIGNED_IN" && nextSession?.user) {
        if (lastNotifiedSignInUserRef.current !== nextSession.user.id) {
          lastNotifiedSignInUserRef.current = nextSession.user.id;
          notify({
            title: "Signed in",
            message: "Your progress and subscription are now synced.",
            tone: "success",
          });
        }
      }

      if (event === "SIGNED_OUT") {
        lastNotifiedSignInUserRef.current = null;
      }
    });

    return () => subscription.unsubscribe();
  }, [isSDKLoaded, fid, username, displayName, notify, pfpUrl, walletAddress]);

  const handleSignOut = async () => {
    const requestVersion = ++requestVersionRef.current;

    setUser(null);
    setSession(null);
    resetProfileState();

    try {
      notifyAcrossNavigation({
        title: "Signed out",
        message: "You have been logged out successfully.",
        tone: "info",
      });
      await supabase.auth.signOut({ scope: "local" });
    } catch (err) {
      console.error("Sign out error:", err);
      notify({
        title: "Log out failed",
        message: "We could not complete sign out cleanly.",
        tone: "error",
      });
    }

    if (!mountedRef.current || requestVersion !== requestVersionRef.current) return;

    if (getFarcasterUser()) {
      await loadAuthStateInternal(null);
    }
  };

  const linkFarcaster = async (): Promise<boolean> => {
    if (!user || !fid) return false;
    const updated = await linkFarcasterToProfile(user.id, getFarcasterUser() as FarcasterUser);
    if (!updated) return false;
    setProfile(updated);
    await applyResolvedProfile(updated, requestVersionRef.current);
    return true;
  };

  const linkEmail = async (email: string): Promise<boolean> => {
    if (!fid) return false;
    const updated = await linkEmailToFarcasterProfile(fid, email);
    if (!updated) return false;
    setProfile(updated);
    await applyResolvedProfile(updated, requestVersionRef.current);
    return true;
  };

  const updateWallet = async (nextWalletAddress: string): Promise<boolean> => {
    if (!profile) return false;
    try {
      const updated = await linkWallet(profile.id, nextWalletAddress);
      if (!updated) return false;
      setProfile(updated);
      return true;
    } catch (err) {
      console.error("Error updating wallet:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isSubscribed,
        viewsRemaining,
        isAuthenticated,
        authMethod,
        refreshProfile,
        signOut: handleSignOut,
        linkFarcaster,
        linkEmail,
        updateWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
