import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ohwtiwhbqsiwpktteaur.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9od3Rpd2hicXNpd3BrdHRlYXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDM0OTUsImV4cCI6MjA4NTMxOTQ5NX0.TmXl_O0GF8LksqFGh5R69R2iTQrbws_BBM-44ZiRv9A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Subscription types
export interface Subscription {
  id: string;
  wallet_address: string;
  email?: string;
  tx_hash: string;
  amount: string;
  started_at: string;
  expires_at: string;
  status: 'active' | 'expired' | 'cancelled';
}

// Check if a wallet has an active subscription
export async function checkSubscription(walletAddress: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .eq('status', 'active')
    .gte('expires_at', new Date().toISOString())
    .single();

  if (error || !data) {
    return false;
  }

  return true;
}

// Record a new subscription
export async function recordSubscription(
  walletAddress: string,
  txHash: string,
  amount: string,
  email?: string
): Promise<Subscription | null> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      wallet_address: walletAddress.toLowerCase(),
      email,
      tx_hash: txHash,
      amount,
      started_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      status: 'active'
    })
    .select()
    .single();

  if (error) {
    console.error('Error recording subscription:', error);
    return null;
  }

  return data;
}

// Get subscription details
export async function getSubscription(walletAddress: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}
