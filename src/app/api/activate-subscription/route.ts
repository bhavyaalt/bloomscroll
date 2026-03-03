import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// This endpoint allows the success page to activate a subscription
// as a fallback if the webhook didn't work
export async function POST(request: NextRequest) {
  try {
    const { email, billingCycle } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_KEY;

    if (!url || !serviceKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const supabase = createClient(url, serviceKey);

    // Find user by email
    const { data: profile, error: findError } = await supabase
      .from('bloomscroll_profiles')
      .select('id, subscription_status')
      .eq('email', email)
      .single();

    if (findError || !profile) {
      console.error('User not found:', email);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // If already active, just return success
    if (profile.subscription_status === 'active') {
      return NextResponse.json({ status: 'already_active' });
    }

    // Calculate expiration (1 year for yearly, 30 days for monthly)
    const expiresAt = new Date();
    if (billingCycle === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setDate(expiresAt.getDate() + 30);
    }

    // Update subscription
    const { error: updateError } = await supabase
      .from('bloomscroll_profiles')
      .update({
        subscription_status: 'active',
        subscription_expires_at: expiresAt.toISOString(),
      })
      .eq('id', profile.id);

    if (updateError) {
      console.error('Failed to activate subscription:', updateError);
      return NextResponse.json({ error: 'Failed to activate' }, { status: 500 });
    }

    console.log('Subscription activated via fallback for:', email);
    return NextResponse.json({ status: 'activated', expiresAt: expiresAt.toISOString() });
  } catch (error) {
    console.error('Activate subscription error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
