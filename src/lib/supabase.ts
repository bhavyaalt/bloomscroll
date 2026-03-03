import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ohwtiwhbqsiwpktteaur.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3Rpd2hicXNpd3BrdHRlYXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDM0OTUsImV4cCI6MjA4NTMxOTQ5NX0.TmXl_O0GF8LksqFGh5R69R2iTQrbws_BBM-44ZiRv9A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// AUTH FUNCTIONS
// ============================================

// Sign in with magic link
export async function signInWithEmail(email: string) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// Get session
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

// ============================================
// USER PROFILE FUNCTIONS
// ============================================

export interface UserProfile {
  id: string;
  email?: string;
  wallet_address?: string;
  preferences?: {
    topics: string[];
    goals: string[];
  };
  subscription_status: 'free' | 'active' | 'expired';
  subscription_expires_at?: string;
  daily_views_count: number;
  daily_views_reset_at: string;
  created_at: string;
  // Farcaster fields
  fid?: number;
  fc_username?: string;
  fc_display_name?: string;
  fc_pfp_url?: string;
  auth_method?: 'email' | 'farcaster' | 'both';
}

// Get or create user profile
export async function getOrCreateProfile(userId: string, email: string): Promise<UserProfile | null> {
  // Try to get existing profile
  let { data: profile, error } = await supabase
    .from('bloomscroll_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // Profile doesn't exist, create it
    const newProfile = {
      id: userId,
      email,
      subscription_status: 'free',
      daily_views_count: 0,
      daily_views_reset_at: new Date().toISOString(),
    };

    const { data: created, error: createError } = await supabase
      .from('bloomscroll_profiles')
      .insert(newProfile)
      .select()
      .single();

    if (createError) {
      console.error('Error creating profile:', createError);
      return null;
    }
    return created;
  }

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return profile;
}

// Update user profile
export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// FARCASTER AUTH FUNCTIONS
// ============================================

export interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
  walletAddress?: string;
}

// Get or create profile by Farcaster ID
export async function getOrCreateFarcasterProfile(fcUser: FarcasterUser): Promise<UserProfile | null> {
  // Try to get existing profile by FID
  let { data: profile, error } = await supabase
    .from('bloomscroll_profiles')
    .select('*')
    .eq('fid', fcUser.fid)
    .single();

  if (error && error.code === 'PGRST116') {
    // Profile doesn't exist, create it
    const newProfile = {
      id: `fc_${fcUser.fid}`, // Use fc_ prefix for Farcaster-only users
      fid: fcUser.fid,
      fc_username: fcUser.username,
      fc_display_name: fcUser.displayName,
      fc_pfp_url: fcUser.pfpUrl,
      wallet_address: fcUser.walletAddress?.toLowerCase(),
      auth_method: 'farcaster' as const,
      subscription_status: 'free' as const,
      daily_views_count: 0,
      daily_views_reset_at: new Date().toISOString(),
    };

    const { data: created, error: createError } = await supabase
      .from('bloomscroll_profiles')
      .insert(newProfile)
      .select()
      .single();

    if (createError) {
      console.error('Error creating Farcaster profile:', createError);
      return null;
    }
    return created;
  }

  if (error) {
    console.error('Error fetching Farcaster profile:', error);
    return null;
  }

  // Update profile with latest Farcaster info
  if (profile) {
    const updates: Partial<UserProfile> = {
      fc_username: fcUser.username,
      fc_display_name: fcUser.displayName,
      fc_pfp_url: fcUser.pfpUrl,
    };
    if (fcUser.walletAddress) {
      updates.wallet_address = fcUser.walletAddress.toLowerCase();
    }
    await supabase.from('bloomscroll_profiles').update(updates).eq('fid', fcUser.fid);
  }

  return profile;
}

// Get profile by FID
export async function getProfileByFid(fid: number): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .select('*')
    .eq('fid', fid)
    .single();

  if (error) return null;
  return data;
}

// Link Farcaster to existing email account
export async function linkFarcasterToProfile(userId: string, fcUser: FarcasterUser): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .update({
      fid: fcUser.fid,
      fc_username: fcUser.username,
      fc_display_name: fcUser.displayName,
      fc_pfp_url: fcUser.pfpUrl,
      wallet_address: fcUser.walletAddress?.toLowerCase(),
      auth_method: 'both',
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error linking Farcaster:', error);
    return null;
  }
  return data;
}

// Link email to existing Farcaster account
export async function linkEmailToFarcasterProfile(fid: number, email: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .update({
      email,
      auth_method: 'both',
    })
    .eq('fid', fid)
    .select()
    .single();

  if (error) {
    console.error('Error linking email:', error);
    return null;
  }
  return data;
  return data;
}

// Link wallet to profile
export async function linkWallet(userId: string, walletAddress: string) {
  return updateProfile(userId, { wallet_address: walletAddress.toLowerCase() });
}

// ============================================
// SUBSCRIPTION FUNCTIONS
// ============================================

export interface Subscription {
  id: string;
  user_id: string;
  wallet_address: string;
  tx_hash: string;
  amount: string;
  started_at: string;
  expires_at: string;
  status: 'active' | 'expired' | 'cancelled';
}

// Check if user has active subscription
export async function checkSubscription(userId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .select('subscription_status, subscription_expires_at')
    .eq('id', userId)
    .single();

  if (error || !data) return false;

  if (data.subscription_status !== 'active') return false;
  
  if (data.subscription_expires_at) {
    const expiresAt = new Date(data.subscription_expires_at);
    if (expiresAt < new Date()) {
      // Subscription expired, update status
      await updateProfile(userId, { subscription_status: 'expired' });
      return false;
    }
  }

  return true;
}

// Record a new subscription payment
export async function recordSubscription(
  userId: string,
  walletAddress: string,
  txHash: string,
  amount: string
): Promise<boolean> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  // Update profile with subscription
  const { error } = await supabase
    .from('bloomscroll_profiles')
    .update({
      wallet_address: walletAddress.toLowerCase(),
      subscription_status: 'active',
      subscription_expires_at: expiresAt.toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Error recording subscription:', error);
    return false;
  }

  // Also record in subscriptions table for history
  await supabase.from('bloomscroll_subscriptions').insert({
    user_id: userId,
    wallet_address: walletAddress.toLowerCase(),
    tx_hash: txHash,
    amount,
    started_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    status: 'active',
  });

  return true;
}

// ============================================
// CONTENT GATING FUNCTIONS
// ============================================

const FREE_DAILY_LIMIT = 5;

// Check if user can view more content
export async function canViewContent(userId: string): Promise<{ allowed: boolean; remaining: number; isSubscribed: boolean }> {
  const isSubscribed = await checkSubscription(userId);
  
  if (isSubscribed) {
    return { allowed: true, remaining: -1, isSubscribed: true }; // Unlimited
  }

  // Check daily views for free users
  const { data: profile, error } = await supabase
    .from('bloomscroll_profiles')
    .select('daily_views_count, daily_views_reset_at')
    .eq('id', userId)
    .single();

  if (error || !profile) {
    return { allowed: true, remaining: FREE_DAILY_LIMIT, isSubscribed: false };
  }

  // Check if we need to reset the daily count
  const resetAt = new Date(profile.daily_views_reset_at);
  const now = new Date();
  
  if (now.toDateString() !== resetAt.toDateString()) {
    // New day, reset count
    await updateProfile(userId, {
      daily_views_count: 0,
      daily_views_reset_at: now.toISOString(),
    });
    return { allowed: true, remaining: FREE_DAILY_LIMIT, isSubscribed: false };
  }

  const remaining = FREE_DAILY_LIMIT - profile.daily_views_count;
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    isSubscribed: false,
  };
}

// Increment view count
export async function incrementViewCount(userId: string) {
  const { data: profile } = await supabase
    .from('bloomscroll_profiles')
    .select('daily_views_count')
    .eq('id', userId)
    .single();

  if (profile) {
    await updateProfile(userId, {
      daily_views_count: profile.daily_views_count + 1,
    });
  }
}

// ============================================
// SAVED CARDS (synced to cloud)
// ============================================

export async function getSavedCards(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('bloomscroll_saved_cards')
    .select('card_id')
    .eq('user_id', userId);

  if (error) return [];
  return data.map(d => d.card_id);
}

export async function saveCard(userId: string, cardId: string) {
  const { error } = await supabase
    .from('bloomscroll_saved_cards')
    .upsert({ user_id: userId, card_id: cardId });
  
  if (error) console.error('Error saving card:', error);
}

export async function unsaveCard(userId: string, cardId: string) {
  const { error } = await supabase
    .from('bloomscroll_saved_cards')
    .delete()
    .eq('user_id', userId)
    .eq('card_id', cardId);
  
  if (error) console.error('Error unsaving card:', error);
}

// ============================================
// FEEDBACK FUNCTIONS
// ============================================

export interface PaywallFeedback {
  id?: string;
  user_id?: string;
  reason: string;
  other_text?: string;
  cards_viewed: number;
  created_at?: string;
}

export async function submitPaywallFeedback(feedback: PaywallFeedback): Promise<boolean> {
  const { error } = await supabase
    .from('bloomscroll_paywall_feedback')
    .insert({
      user_id: feedback.user_id || null,
      reason: feedback.reason,
      other_text: feedback.other_text || null,
      cards_viewed: feedback.cards_viewed,
      created_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
  return true;
}
