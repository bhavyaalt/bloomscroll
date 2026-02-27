"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
  FarcasterUser
} from "@/lib/supabase";
import { useFarcaster } from "./FarcasterProvider";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isSubscribed: boolean;
  viewsRemaining: number;
  isAuthenticated: boolean;
  authMethod: 'email' | 'farcaster' | 'both' | null;
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
  viewsRemaining: 5,
  isAuthenticated: false,
  authMethod: null,
  refreshProfile: async () => {},
  signOut: async () => {},
  linkFarcaster: async () => false,
  linkEmail: async () => false,
  updateWallet: async () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [viewsRemaining, setViewsRemaining] = useState(5);

  // Get Farcaster context
  const { isSDKLoaded, isInFrame, fid, username, displayName, pfpUrl, walletAddress } = useFarcaster();

  // Determine if user is authenticated (either email or Farcaster)
  const isAuthenticated = !!user || (isInFrame && !!fid);
  const authMethod = profile?.auth_method || (user ? 'email' : (fid ? 'farcaster' : null));

  const refreshProfile = async () => {
    if (user) {
      // Email-authenticated user
      const userProfile = await getOrCreateProfile(user.id, user.email || "");
      setProfile(userProfile);
      if (userProfile) {
        const { remaining, isSubscribed: subStatus } = await canViewContent(userProfile.id);
        setIsSubscribed(subStatus);
        setViewsRemaining(remaining);
      }
    } else if (fid) {
      // Farcaster-authenticated user
      const fcUser: FarcasterUser = {
        fid,
        username: username || undefined,
        displayName: displayName || undefined,
        pfpUrl: pfpUrl || undefined,
        walletAddress: walletAddress || undefined,
      };
      const userProfile = await getOrCreateFarcasterProfile(fcUser);
      setProfile(userProfile);
      if (userProfile) {
        const { remaining, isSubscribed: subStatus } = await canViewContent(userProfile.id);
        setIsSubscribed(subStatus);
        setViewsRemaining(remaining);
      }
    }
  };

  // Handle Supabase auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        getOrCreateProfile(session.user.id, session.user.email || "").then((p) => {
          setProfile(p);
          if (p) {
            canViewContent(p.id).then(({ remaining, isSubscribed: subStatus }) => {
              setIsSubscribed(subStatus);
              setViewsRemaining(remaining);
            });
          }
        });
      }
      // Only set loading false if not waiting for Farcaster SDK
      if (!isInFrame) {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userProfile = await getOrCreateProfile(session.user.id, session.user.email || "");
          setProfile(userProfile);
          if (userProfile) {
            const { remaining, isSubscribed: subStatus } = await canViewContent(userProfile.id);
            setIsSubscribed(subStatus);
            setViewsRemaining(remaining);
          }
        } else if (!fid) {
          // Only clear if no Farcaster identity either
          setProfile(null);
          setIsSubscribed(false);
          setViewsRemaining(5);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Handle Farcaster auth - auto-login when in frame with FID
  useEffect(() => {
    if (isSDKLoaded && isInFrame && fid && !user) {
      // In Farcaster frame, auto-create/fetch profile
      const fcUser: FarcasterUser = {
        fid,
        username: username || undefined,
        displayName: displayName || undefined,
        pfpUrl: pfpUrl || undefined,
        walletAddress: walletAddress || undefined,
      };
      getOrCreateFarcasterProfile(fcUser).then((p) => {
        setProfile(p);
        if (p) {
          canViewContent(p.id).then(({ remaining, isSubscribed: subStatus }) => {
            setIsSubscribed(subStatus);
            setViewsRemaining(remaining);
          });
        }
        setLoading(false);
      });
    } else if (isSDKLoaded) {
      setLoading(false);
    }
  }, [isSDKLoaded, isInFrame, fid, username, displayName, pfpUrl, walletAddress, user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    // Keep Farcaster profile if in frame
    if (!isInFrame) {
      setProfile(null);
      setIsSubscribed(false);
      setViewsRemaining(5);
    }
  };

  // Link Farcaster to existing email account
  const linkFarcaster = async (): Promise<boolean> => {
    if (!user || !fid) return false;
    const fcUser: FarcasterUser = {
      fid,
      username: username || undefined,
      displayName: displayName || undefined,
      pfpUrl: pfpUrl || undefined,
      walletAddress: walletAddress || undefined,
    };
    const updated = await linkFarcasterToProfile(user.id, fcUser);
    if (updated) {
      setProfile(updated);
      return true;
    }
    return false;
  };

  // Link email to existing Farcaster account
  const linkEmail = async (email: string): Promise<boolean> => {
    if (!fid) return false;
    const updated = await linkEmailToFarcasterProfile(fid, email);
    if (updated) {
      setProfile(updated);
      return true;
    }
    return false;
  };

  // Update wallet address
  const updateWallet = async (walletAddress: string): Promise<boolean> => {
    if (!profile) return false;
    try {
      const updated = await linkWallet(profile.id, walletAddress);
      if (updated) {
        setProfile(updated);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating wallet:', err);
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
