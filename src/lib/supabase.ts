import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required');
    }
    supabaseInstance = createBrowserClient(url, key);
  }
  return supabaseInstance;
}

// Getter pattern for lazy initialization with proper method binding
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (client as any)[prop];
    // Bind functions to preserve `this` context
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});

// ============================================
// AUTH FUNCTIONS
// ============================================

// Sign in with OAuth provider (Google, Twitter)
export async function signInWithProvider(provider: 'google' | 'twitter') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

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
  const { error } = await supabase.auth.signOut({ scope: 'local' });
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
  display_name?: string;
  avatar_url?: string;
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

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function getProfileById(id: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile by id:', error);
    return null;
  }

  return data;
}

async function getProfileByEmail(email: string): Promise<UserProfile | null> {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;

  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .select('*')
    .ilike('email', normalizedEmail)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile by email:', error);
    return null;
  }

  return data;
}

function isProfileSubscriptionActive(profile: Pick<UserProfile, 'subscription_status' | 'subscription_expires_at'>) {
  if (profile.subscription_status !== 'active') return false;
  if (!profile.subscription_expires_at) return true;
  return new Date(profile.subscription_expires_at) >= new Date();
}

function pickCanonicalProfile(
  candidates: Array<UserProfile | null>,
  userId?: string,
  fid?: number
): UserProfile | null {
  const unique = candidates.filter((candidate): candidate is UserProfile => !!candidate)
    .filter((candidate, index, all) => all.findIndex((item) => item.id === candidate.id) === index);

  if (unique.length === 0) return null;

  unique.sort((left, right) => {
    const leftActive = isProfileSubscriptionActive(left) ? 1 : 0;
    const rightActive = isProfileSubscriptionActive(right) ? 1 : 0;
    if (leftActive !== rightActive) return rightActive - leftActive;

    const leftUserMatch = left.id === userId ? 1 : 0;
    const rightUserMatch = right.id === userId ? 1 : 0;
    if (leftUserMatch !== rightUserMatch) return rightUserMatch - leftUserMatch;

    const leftFidMatch = left.fid === fid ? 1 : 0;
    const rightFidMatch = right.fid === fid ? 1 : 0;
    if (leftFidMatch !== rightFidMatch) return rightFidMatch - leftFidMatch;

    return new Date(right.created_at || 0).getTime() - new Date(left.created_at || 0).getTime();
  });

  return unique[0];
}

async function updateResolvedProfile(
  profile: UserProfile,
  updates: Partial<UserProfile>
): Promise<UserProfile> {
  if (Object.keys(updates).length === 0) {
    return profile;
  }

  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .update(updates)
    .eq('id', profile.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating resolved profile:', error);
    return profile;
  }

  return data;
}

// Get or create user profile
export async function getOrCreateProfile(
  userId: string,
  email: string,
  metadata?: { displayName?: string; avatarUrl?: string },
  fcUser?: FarcasterUser
): Promise<UserProfile | null> {
  const normalizedEmail = normalizeEmail(email);
  const [byId, byEmail, byFid] = await Promise.all([
    getProfileById(userId),
    getProfileByEmail(normalizedEmail),
    fcUser?.fid ? getProfileByFid(fcUser.fid) : Promise.resolve(null),
  ]);

  const profile = pickCanonicalProfile([byId, byEmail, byFid], userId, fcUser?.fid);

  if (!profile) {
    const newProfile: Record<string, unknown> = {
      id: userId,
      email: normalizedEmail,
      subscription_status: 'free',
      daily_views_count: 0,
      daily_views_reset_at: new Date().toISOString(),
      auth_method: fcUser?.fid ? 'both' : 'email',
    };
    if (metadata?.displayName) newProfile.display_name = metadata.displayName;
    if (metadata?.avatarUrl) newProfile.avatar_url = metadata.avatarUrl;
    if (fcUser?.fid) {
      newProfile.fid = fcUser.fid;
      newProfile.fc_username = fcUser.username;
      newProfile.fc_display_name = fcUser.displayName;
      newProfile.fc_pfp_url = fcUser.pfpUrl;
      newProfile.wallet_address = fcUser.walletAddress?.toLowerCase();
    }

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

  const updates: Partial<UserProfile> = {};

  if (normalizedEmail && profile.email !== normalizedEmail) {
    updates.email = normalizedEmail;
  }

  if (metadata?.displayName && !profile.display_name) {
    updates.display_name = metadata.displayName;
  }

  if (metadata?.avatarUrl && !profile.avatar_url) {
    updates.avatar_url = metadata.avatarUrl;
  }

  if (fcUser?.fid && profile.fid !== fcUser.fid) {
    updates.fid = fcUser.fid;
  }

  if (fcUser?.username && profile.fc_username !== fcUser.username) {
    updates.fc_username = fcUser.username;
  }

  if (fcUser?.displayName && profile.fc_display_name !== fcUser.displayName) {
    updates.fc_display_name = fcUser.displayName;
  }

  if (fcUser?.pfpUrl && profile.fc_pfp_url !== fcUser.pfpUrl) {
    updates.fc_pfp_url = fcUser.pfpUrl;
  }

  if (fcUser?.walletAddress) {
    const normalizedWallet = fcUser.walletAddress.toLowerCase();
    if (profile.wallet_address !== normalizedWallet) {
      updates.wallet_address = normalizedWallet;
    }
  }

  const nextAuthMethod = fcUser?.fid ? 'both' : profile.auth_method || 'email';
  if (profile.auth_method !== nextAuthMethod) {
    updates.auth_method = nextAuthMethod;
  }

  return updateResolvedProfile(profile, updates);
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
  const profile = await getProfileByFid(fcUser.fid);

  if (!profile) {
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

  // Update profile with latest Farcaster info
  const updates: Partial<UserProfile> = {
    fc_username: fcUser.username,
    fc_display_name: fcUser.displayName,
    fc_pfp_url: fcUser.pfpUrl,
  };
  if (fcUser.walletAddress) {
    updates.wallet_address = fcUser.walletAddress.toLowerCase();
  }

  return updateResolvedProfile(profile, updates);
}

// Get profile by FID
export async function getProfileByFid(fid: number): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .select('*')
    .eq('fid', fid)
    .maybeSingle();

  if (error) {
    console.error('Error fetching profile by fid:', error);
    return null;
  }
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
      email: normalizeEmail(email),
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
  console.log('[checkSubscription] Checking for userId:', userId);
  
  const { data, error } = await supabase
    .from('bloomscroll_profiles')
    .select('subscription_status, subscription_expires_at')
    .eq('id', userId)
    .single();

  console.log('[checkSubscription] Result:', { data, error });

  if (error || !data) {
    console.log('[checkSubscription] No data or error, returning false');
    return false;
  }

  if (data.subscription_status !== 'active') {
    console.log('[checkSubscription] Status not active:', data.subscription_status);
    return false;
  }
  
  if (data.subscription_expires_at) {
    const expiresAt = new Date(data.subscription_expires_at);
    if (expiresAt < new Date()) {
      console.log('[checkSubscription] Subscription expired');
      // Subscription expired, update status
      await updateProfile(userId, { subscription_status: 'expired' });
      return false;
    }
  }

  console.log('[checkSubscription] User is subscribed!');
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

const FREE_DAILY_LIMIT = 15;

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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
  const now = new Date();
  const todayKey = getLocalDateKey(now);
  const resetKey = profile.daily_views_reset_at ? getLocalDateKey(new Date(profile.daily_views_reset_at)) : '';
  
  if (todayKey !== resetKey) {
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
    .select('daily_views_count, daily_views_reset_at')
    .eq('id', userId)
    .single();

  if (profile) {
    const now = new Date();
    const todayKey = getLocalDateKey(now);
    const resetKey = profile.daily_views_reset_at ? getLocalDateKey(new Date(profile.daily_views_reset_at)) : '';
    const nextCount = todayKey === resetKey ? profile.daily_views_count + 1 : 1;

    await updateProfile(userId, {
      daily_views_count: nextCount,
      daily_views_reset_at: now.toISOString(),
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
// ACTIVE TODAY TRACKING
// ============================================

export async function updateLastActive(userId: string) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  await supabase
    .from('bloomscroll_profiles')
    .update({ last_active_date: today })
    .eq('id', userId);
}

export async function getActiveTodayCount(): Promise<number> {
  const today = new Date().toISOString().split('T')[0];
  const { count, error } = await supabase
    .from('bloomscroll_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('last_active_date', today);

  if (error) {
    console.error('Error getting active count:', error);
    return 0;
  }
  return count || 0;
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
