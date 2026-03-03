import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseAdmin = any;

// Lazily create supabase client to avoid build-time crash when env vars are missing
function getSupabase(): SupabaseAdmin {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !serviceKey) {
    throw new Error('Missing SUPABASE_SERVICE_KEY or NEXT_PUBLIC_SUPABASE_URL');
  }
  return createClient(url, serviceKey);
}

// Verify Dodo webhook signature
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const payload = await request.text();
    const signature = request.headers.get('x-dodo-signature') || '';
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET;

    // Verify signature in production
    if (webhookSecret && process.env.NODE_ENV === 'production') {
      if (!verifyWebhookSignature(payload, signature, webhookSecret)) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(payload);
    console.log('Dodo webhook received:', event.type);

    switch (event.type) {
      case 'subscription.active':
      case 'subscription.created':
        await handleSubscriptionCreated(supabase, event.data);
        break;

      case 'subscription.updated':
        await handleSubscriptionUpdated(supabase, event.data);
        break;

      case 'subscription.cancelled':
      case 'subscription.expired':
        await handleSubscriptionCancelled(supabase, event.data);
        break;

      case 'payment.succeeded':
      case 'payment.completed':
      case 'payment_intent.succeeded':
      case 'checkout.completed':
        await handlePaymentSucceeded(supabase, event.data);
        break;

      case 'payment.failed':
        await handlePaymentFailed(event.data);
        break;

      default:
        console.log('Unhandled event type:', event.type, 'Data:', JSON.stringify(event.data).slice(0, 500));
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(supabase: SupabaseAdmin, data: any) {
  const { customer, subscription, product } = data;

  // Find user by email
  const { data: profile, error: findError } = await supabase
    .from('bloomscroll_profiles')
    .select('id')
    .eq('email', customer.email)
    .single();

  if (findError || !profile) {
    console.error('User not found for email:', customer.email);
    return;
  }

  // Update profile with subscription info
  const { error: updateError } = await supabase
    .from('bloomscroll_profiles')
    .update({
      subscription_status: 'active',
      subscription_expires_at: subscription.current_period_end,
    })
    .eq('id', profile.id);

  if (updateError) {
    console.error('Failed to update subscription:', updateError);
    return;
  }

  // Record in subscriptions table
  await supabase.from('bloomscroll_subscriptions').insert({
    user_id: profile.id,
    tx_hash: subscription.id,
    amount: String(product.price || 0),
    started_at: new Date().toISOString(),
    expires_at: subscription.current_period_end,
    status: 'active',
  });

  console.log('Subscription created for user:', profile.id);
}

async function handleSubscriptionUpdated(supabase: SupabaseAdmin, data: any) {
  const { subscription, customer } = data;

  // Find by email since we don't store dodo subscription IDs
  const { data: profile } = await supabase
    .from('bloomscroll_profiles')
    .select('id')
    .eq('email', customer?.email)
    .single();

  if (!profile) return;

  const { error } = await supabase
    .from('bloomscroll_profiles')
    .update({
      subscription_status: subscription.status === 'active' ? 'active' : 'expired',
      subscription_expires_at: subscription.current_period_end,
    })
    .eq('id', profile.id);

  if (error) {
    console.error('Failed to update subscription:', error);
  }
}

async function handleSubscriptionCancelled(supabase: SupabaseAdmin, data: any) {
  const { customer } = data;

  const { data: profile } = await supabase
    .from('bloomscroll_profiles')
    .select('id')
    .eq('email', customer?.email)
    .single();

  if (!profile) return;

  const { error } = await supabase
    .from('bloomscroll_profiles')
    .update({
      subscription_status: 'expired',
    })
    .eq('id', profile.id);

  if (error) {
    console.error('Failed to cancel subscription:', error);
  }
}

async function handlePaymentSucceeded(supabase: SupabaseAdmin, data: any) {
  // Try to extract email from various possible data structures
  const email = data.customer?.email || data.email || data.metadata?.email || data.billing?.email;
  const productId = data.product?.id || data.product_id || data.metadata?.product_id;
  
  console.log('Payment succeeded - raw data:', JSON.stringify(data).slice(0, 1000));
  console.log('Extracted email:', email, 'productId:', productId);
  
  if (!email) {
    console.error('No email found in payment data');
    return;
  }

  // Find user by email
  const { data: profile, error: findError } = await supabase
    .from('bloomscroll_profiles')
    .select('id')
    .eq('email', email)
    .single();

  if (findError || !profile) {
    console.error('User not found for email:', email, findError);
    return;
  }

  // Determine subscription duration based on product (yearly = 365 days, monthly = 30 days)
  const isYearly = productId?.includes('Yearly') || productId?.includes('yearly') || 
                   data.metadata?.billing_cycle === 'yearly' ||
                   String(productId).includes('Oc') || String(productId).includes('Oo'); // yearly product IDs contain these
  
  const expiresAt = new Date();
  if (isYearly) {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  } else {
    expiresAt.setDate(expiresAt.getDate() + 30);
  }

  // Update profile with subscription info
  const { error: updateError } = await supabase
    .from('bloomscroll_profiles')
    .update({
      subscription_status: 'active',
      subscription_expires_at: expiresAt.toISOString(),
    })
    .eq('id', profile.id);

  if (updateError) {
    console.error('Failed to update subscription:', updateError);
    return;
  }

  console.log('Subscription activated via payment for user:', profile.id, 'expires:', expiresAt);
}

async function handlePaymentFailed(data: any) {
  const { payment, customer } = data;
  console.error('Payment failed:', payment.id, 'for', customer.email);
}
