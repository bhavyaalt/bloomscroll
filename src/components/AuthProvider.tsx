"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase, UserProfile, getOrCreateProfile, canViewContent } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  isSubscribed: boolean;
  viewsRemaining: number;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  isSubscribed: false,
  viewsRemaining: 5,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [viewsRemaining, setViewsRemaining] = useState(5);

  const refreshProfile = async () => {
    if (!user) return;
    
    const userProfile = await getOrCreateProfile(user.id, user.email || "");
    setProfile(userProfile);

    // Check subscription status
    const { allowed, remaining, isSubscribed: subStatus } = await canViewContent(user.id);
    setIsSubscribed(subStatus);
    setViewsRemaining(remaining);
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        getOrCreateProfile(session.user.id, session.user.email || "").then(setProfile);
        canViewContent(session.user.id).then(({ remaining, isSubscribed: subStatus }) => {
          setIsSubscribed(subStatus);
          setViewsRemaining(remaining);
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userProfile = await getOrCreateProfile(session.user.id, session.user.email || "");
          setProfile(userProfile);
          
          const { remaining, isSubscribed: subStatus } = await canViewContent(session.user.id);
          setIsSubscribed(subStatus);
          setViewsRemaining(remaining);
        } else {
          setProfile(null);
          setIsSubscribed(false);
          setViewsRemaining(5);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsSubscribed(false);
    setViewsRemaining(5);
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
        refreshProfile,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
